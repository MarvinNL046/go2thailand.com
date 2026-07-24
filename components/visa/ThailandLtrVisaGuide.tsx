import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BadgeDollarSign,
  BriefcaseBusiness,
  CalendarClock,
  Check,
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

const BOI_LTR = 'https://ltr.boi.go.th/';
const BOI_ISSUANCE = 'https://ltr.boi.go.th/page/visa-issuance-info.html';
const BOI_BROCHURE = 'https://ltr.boi.go.th/documents/BOI-brochure%202025-LTR.pdf';
const BOI_APPLICATION = 'https://visa.boi.go.th/';
const EMBASSY_CATEGORIES = 'https://hague.thaiembassy.org/th/publicservice/e-visa-categories-required-documents/';
const EMBASSY_FEES = 'https://hague.thaiembassy.org/th/content/%E0%B8%9B%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%AD%E0%B8%B1%E0%B8%95%E0%B8%A3%E0%B8%B2%E0%B8%84%E0%B8%B2%E0%B8%98%E0%B8%A3%E0%B8%A3%E0%B8%A1%E0%B9%80%E0%B8%99%E0%B8%B5%E0%B8%A2%E0%B8%A1%E0%B8%94%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%81%E0%B8%87%E0%B8%AA%E0%B8%B8%E0%B8%A5-2567';

const sectionNav = [
  { href: '#route' as const, label: 'Kwalificatie', icon: Route },
  { href: '#bewijs' as const, label: 'Bewijs', icon: FileCheck2 },
  { href: '#vijf-plus-vijf' as const, label: '5 + 5 jaar', icon: CalendarClock },
  { href: '#voordelen' as const, label: 'Voordelen', icon: ShieldCheck },
  { href: '#aanvragen' as const, label: 'Aanvragen', icon: PlaneTakeoff },
  { href: '#vragen' as const, label: 'Vragen', icon: CircleAlert },
];

type LtrRouteKey = 'wealth' | 'pension' | 'remote' | 'skilled';

const ltrRoutes: Array<{
  key: LtrRouteKey;
  short: string;
  label: string;
  threshold: string;
  title: string;
  intro: string;
  proof: string[];
  note: string;
}> = [
  {
    key: 'wealth', short: 'LTR-W', label: 'Wealthy Global Citizen', threshold: 'USD 1 mln vermogen + USD 500k Thai investering',
    title: 'Vermogen én een bestaande investering in Thailand.',
    intro: 'Sinds de BOI-update van 2025 geldt voor deze route geen afzonderlijke inkomenseis meer. Wel moet je aantoonbaar minstens USD 1 miljoen aan persoonlijke activa bezitten en vóór de aanvraag USD 500.000 op een kwalificerende manier in Thailand hebben geïnvesteerd.',
    proof: ['Persoonlijke wereldwijde activa van minstens USD 1 miljoen', 'Minstens USD 500.000 in Thaise obligaties, bedrijf of vastgoed', 'Investering op eigen naam en al aanwezig vóór aanvraag', 'Verzekering, Thaise social security of USD 100.000 bankdeposito'],
    note: 'De kwalificerende investering moet gedurende de visumperiode in stand blijven. Een woning kopen geeft op zichzelf geen LTR; de volledige vermogens- en investeringsroute blijft gelden.',
  },
  {
    key: 'pension', short: 'LTR-P', label: 'Wealthy Pensioner', threshold: '50+ en USD 80k passief · of USD 40k + 250k',
    title: 'Alleen passief inkomen telt voor de pensioendrempel.',
    intro: 'Je bent minimaal 50 jaar. Optie één is minstens USD 80.000 passief inkomen per jaar. Bij USD 40.000 tot 80.000 combineer je dat met minstens USD 250.000 aan kwalificerende Thaise investering.',
    proof: ['Leeftijd van minimaal 50 jaar', 'Pensioen, huur, gerealiseerde winst, dividend of rente', 'Bij lagere inkomensoptie: USD 250.000 Thai investering', 'Verzekering, social security of USD 100.000 bankdeposito'],
    note: 'Salaris en actief arbeidsinkomen tellen volgens BOI niet mee als passief inkomen voor deze route. Vergelijk ook de lagere-drempel pensioenvisa op de afzonderlijke gids.',
  },
  {
    key: 'remote', short: 'LTR-T', label: 'Work-from-Thailand Professional', threshold: 'USD 80k · of USD 40k + extra kwalificatie',
    title: 'Niet alleen jouw inkomen: ook de buitenlandse werkgever kwalificeert.',
    intro: 'Je werkt op afstand voor een beursgenoteerde onderneming of een private onderneming die minstens drie jaar bestaat en samen USD 50 miljoen omzet behaalde in de laatste drie jaar. Een volledige dochter kan onder voorwaarden de cijfers van de moeder gebruiken.',
    proof: ['Gemiddeld USD 80.000 inkomen per jaar over twee jaar', 'Of USD 40.000 plus master, intellectueel eigendom of Series A-financiering', 'Arbeidscontract met kwalificerende buitenlandse werkgever', 'Verzekering, social security of USD 100.000 bankdeposito'],
    note: 'BOI geeft voor LTR-T geen Thaise work permit af: deze route is juist voor werken op afstand voor een buitenlandse werkgever, niet voor een Thaise baan.',
  },
  {
    key: 'skilled', short: 'LTR-H', label: 'Highly Skilled Professional', threshold: 'Doelsector + USD 80k · of USD 40k + STEM-master',
    title: 'Werk of expertise in een BOI-doelsector is de ingang.',
    intro: 'Je werkt bij een kwalificerende organisatie in een aangewezen sector of onderbouwt erkende expertise. De inkomensroute is USD 80.000 gemiddeld over twee jaar, of USD 40.000 met een master of hoger in wetenschap en technologie; werk voor Thaise overheidsinstanties kent een uitzondering.',
    proof: ['Contract of expertise in een BOI-doelsector', 'Inkomen over de laatste twee jaar of relevante uitzondering', 'Bij USD 40.000-route: STEM-master of hoger', 'Verzekering, social security of USD 100.000 bankdeposito'],
    note: 'Het 17%-tarief voor persoonlijk inkomen wordt door BOI specifiek bij Highly Skilled Professionals genoemd. Laat de toepassing op jouw inkomen door een Thaise fiscalist beoordelen.',
  },
];

const quickFacts = [
  { icon: CalendarClock, label: 'Werkelijke structuur', value: '5 + 5 jaar', text: 'Eerst maximaal vijf jaar; daarna herbeoordeling voor de tweede periode.' },
  { icon: WalletCards, label: 'Afgifte in Thailand', value: '50.000 THB', text: 'Per persoon bij TIESC; BOI rekent geen fee voor endorsement.' },
  { icon: BadgeDollarSign, label: 'Afgifte in Den Haag', value: '€1.750', text: 'Actuele Haagse tarieflijst voor een LTR multiple entry van tien jaar.' },
  { icon: HeartPulse, label: 'Gezondheidsdekking', value: 'USD 50.000', text: 'Of volledige Thaise social security of een lang aangehouden deposito.' },
];

const faqs = [
  { question: 'Wat is een LTR-visum in Thailand?', answer: 'Het Long-Term Resident Visa is een BOI-programma voor vier groepen: Wealthy Global Citizens, Wealthy Pensioners, Work-from-Thailand Professionals en Highly Skilled Professionals. Het visum wordt als tienjarig programma afgegeven, maar de verblijfsperiode bestaat uit maximaal vijf jaar plus een herbeoordeling voor nog eens vijf jaar.' },
  { question: 'Hoeveel kost een Thailand LTR Visa?', answer: 'BOI noemt 50.000 THB per persoon voor afgifte bij TIESC in Bangkok en rekent geen fee voor de voorafgaande kwalificatie-endorsement. Voor afgifte via de Thaise ambassade in Den Haag noemt de actuele tarieflijst €1.750. Betaalde aanvraag- of afgiftekosten zijn niet terugbetaalbaar.' },
  { question: 'Hoe lang duurt een LTR-aanvraag?', answer: 'De BOI-brochure noemt 20 werkdagen voor de documentbeoordeling vanaf het moment dat alle gevraagde stukken compleet zijn. Na goedkeuring is de endorsementletter 60 dagen geldig om de daadwerkelijke visumafgifte te regelen. Aanvullende vragen kunnen de totale doorlooptijd verlengen.' },
  { question: 'Betaal je met een LTR-visum altijd 17% belasting?', answer: 'Nee. BOI noemt het 17%-tarief specifiek voor Highly Skilled Professionals. BOI vermeldt daarnaast een vrijstelling voor buitenlands inkomen als programma-voordeel, maar belastingheffing hangt af van categorie, fiscale woonplaats, inkomensbron en actuele Thaise regels. Laat dit individueel beoordelen.' },
  { question: 'Kan een remote werknemer een digitale work permit krijgen?', answer: 'Niet onder LTR-T voor Work-from-Thailand Professionals. BOI zegt expliciet dat deze categorie voor een buitenlandse werkgever op afstand werkt en daarom geen Thaise work permit krijgt. LTR-houders die voor een Thaise entiteit werken, moeten de toepasselijke digitale work-permitroute volgen.' },
  { question: 'Kun je een LTR-visum krijgen door een huis te kopen?', answer: 'Niet alleen door een huis te kopen. Bij LTR-W kan Thais vastgoed meetellen in de vereiste USD 500.000 investering, maar daarnaast geldt minstens USD 1 miljoen aan persoonlijke activa en de gemeenschappelijke gezondheidsdekking. Bij LTR-P kan vastgoed deel zijn van de USD 250.000-investering in de lagere passieve-inkomensroute.' },
  { question: 'Wat is het verschil tussen LTR en Thailand Privilege?', answer: 'LTR toetst hoge, categoriegebonden financiële of professionele kwalificaties en biedt BOI-voordelen. Thailand Privilege is een betaald lidmaatschapsprogramma met eigen verblijfs- en servicetiers. LTR is dus geen goedkopere versie van Privilege; het is een andere juridische en bewijsroute.' },
  { question: 'Kunnen gezinsleden mee op een LTR-visum?', answer: 'De BOI-updatebrochure van 2025 breidt dependents uit naar ouders en wettelijke afhankelijken en noemt geen maximum, terwijl oudere BOI-webtekst nog echtgenoot en kinderen onder 20 met maximaal vier noemt. Controleer daarom de live dependent-checklist in het aanvraagportaal voordat je gezinskosten of planning vastlegt.' },
];

export default function ThailandLtrVisaGuide() {
  const [route, setRoute] = useState<LtrRouteKey>('remote');
  const selected = useMemo(() => ltrRoutes.find((item) => item.key === route) ?? ltrRoutes[0], [route]);
  const hotelHref = withPlacementSubId(TRIP_GENERIC, 'nl-ltr-visa', 'first-month');
  const esimHref = withPlacementSubId(SAILY_GENERIC, 'nl-ltr-visa', 'arrival');
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) };
  const webPageSchema = { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Thailand LTR Visa vanuit Nederland', description: 'Kwalificatiegids voor LTR-W, LTR-P, LTR-T en LTR-H met 2025-criteria, 5+5 jaar en afgiftekosten.', url: 'https://go2-thailand.com/nl/visa/ltr-visa/', inLanguage: 'nl-NL', dateModified: '2026-07-24' };
  const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://go2-thailand.com/nl/' },
    { '@type': 'ListItem', position: 2, name: 'Visum Thailand', item: 'https://go2-thailand.com/nl/visa/' },
    { '@type': 'ListItem', position: 3, name: 'LTR Visa Thailand', item: 'https://go2-thailand.com/nl/visa/ltr-visa/' },
  ] };

  return <>
    <SEOHead title="Thailand LTR Visa: eisen, 5+5 jaar en kosten" description="Thailand LTR Visa aanvragen? Vergelijk LTR-W, LTR-P, LTR-T en LTR-H, de actuele 2025-eisen, 5+5 jaar, 50.000 THB of €1.750 kosten en BOI-proces." ogImage="https://go2-thailand.com/images/redesign/thailand-ltr-visa-hero.webp">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </SEOHead>
    <main className="bg-canvas text-charcoal">
      <EditorialHero image="/images/redesign/thailand-ltr-visa-hero.webp" imageAlt="Internationale professionals bespreken hun langverblijf vanuit een woning in Bangkok" breadcrumbs={[{label:'Thailand',href:'/'},{label:'Visum',href:'/visa/'},{label:'LTR Visa'}]} eyebrow="LTR-W · LTR-P · LTR-T · LTR-H" title={<>Thailand LTR Visa.<br/><span className="text-saffron">Kwalificeer je echt?</span></>} subtitle="Tien jaar begint met vier strenge bewijsroutes." description="Vermogen, passief inkomen, een buitenlandse werkgever of expertise in een doelsector: jouw route bepaalt wat BOI controleert. Vergelijk eerst de drempels en bouw daarna pas je dossier." actions={[{label:'Vergelijk de vier routes',href:'#route',kind:'primary'},{label:'Open officiële BOI-check',href:BOI_LTR,kind:'secondary',newTab:true}]} minHeightClassName="min-h-[760px] lg:min-h-[720px]" titleClassName="max-w-[880px] text-[3.35rem] leading-[0.88] !text-white sm:text-[4.7rem] lg:text-[5.2rem]" subtitleClassName="max-w-[650px] !text-white" descriptionClassName="mt-4 max-w-[590px] text-sm leading-7 !text-white opacity-72" imageClassName="object-cover object-[73%_center] lg:object-center" gradientClassName="bg-[linear-gradient(180deg,rgba(4,42,34,0.18)_0%,rgba(4,42,34,0.6)_46%,rgba(4,42,34,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(4,42,34,0.99)_0%,rgba(4,42,34,0.96)_44%,rgba(4,42,34,0.17)_70%,rgba(4,42,34,0.02)_100%)]" contentClassName="max-w-[900px] [&_nav]:!text-white/60 [&_nav_span]:!text-white/75" sideCard={<div className="absolute bottom-8 right-[max(2rem,calc((100vw-1280px)/2))] z-10 hidden w-[315px] rounded-2xl border border-white/22 bg-jade/82 p-5 text-white shadow-editorial-card backdrop-blur-lg xl:block"><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">De echte looptijd</p><strong className="mt-3 block font-display text-3xl font-semibold">5 jaar + hercheck + 5 jaar</strong><p className="mt-3 text-[10px] font-semibold leading-5 text-white/58">Vermogen, investering, werk en verzekering moeten tijdens het programma blijven kloppen.</p></div>} />
      <PageSectionNav items={sectionNav}/>

      <section className="section-divider-bottom py-14 lg:py-20"><div className="container-custom"><SectionHeading eyebrow="Eerst het prijs- en tijdsverschil" title="BOI-kwalificatie, visumafgifte en verblijf zijn drie stappen." description="De endorsement zelf is gratis. Pas na kwalificatie kies je waar het visum wordt afgegeven en begint de eerste verblijfsperiode."/><div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{quickFacts.map((fact)=>{const Icon=fact.icon;return <article key={fact.label} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/30 bg-canvas text-jade"><Icon size={20}/></span><span className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{fact.label}</span></div><h2 className="mt-5 font-display text-[1.65rem] font-semibold leading-tight text-jade">{fact.value}</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/62">{fact.text}</p></article>;})}</div><div className="mt-5 flex flex-col gap-4 rounded-2xl border border-saffron/25 bg-tonal p-6 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-start gap-4"><RefreshCw size={22} className="mt-1 shrink-0 text-saffron-dark"/><div><strong className="font-display text-2xl font-semibold text-jade">De 2025-update maakt veel oude LTR-artikelen onbetrouwbaar.</strong><p className="mt-2 text-xs font-medium leading-6 text-charcoal/64">We gebruiken de BOI-brochure voor de vernieuwde vermogens-, werkgever- en dependentcriteria en markeren waar oudere BOI-webtekst nog afwijkt.</p></div></div><a href={BOI_BROCHURE} target="_blank" rel="noopener noreferrer" className="btn-jade shrink-0">Bekijk 2025-update <ExternalLink size={15}/></a></div></div></section>

      <section id="route" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"><div className="container-custom"><SectionHeading eyebrow="Vier doelgroepen, vier harde drempels" title="Kies niet op beroepstitel. Kies op bewijsbaarheid." description="Klik de route die het dichtst bij je situatie komt. De combinatie van inkomen, vermogen, investering, werkgever en sector bepaalt of verder verzamelen zinvol is."/><div className="mt-10 overflow-hidden rounded-[30px] border border-jade/10 bg-white shadow-editorial-lift"><div className="grid lg:grid-cols-[0.72fr_1.28fr]"><div className="bg-jade p-6 text-white sm:p-9"><p className="eyebrow !text-saffron-light">Vergelijk LTR-routes</p><div className="mt-6 grid gap-2">{ltrRoutes.map((item)=>{const active=route===item.key;return <button key={item.key} type="button" aria-pressed={active} onClick={()=>setRoute(item.key)} className={`flex min-h-[74px] items-center justify-between rounded-xl border px-4 py-3 text-left transition ${active?'border-saffron/60 bg-white text-jade':'border-white/12 bg-white/[0.05] text-white hover:bg-white/10'}`}><span><strong className="block text-sm">{item.label}</strong><span className={`mt-1 block text-[9px] leading-4 ${active?'text-jade/55':'text-white/45'}`}>{item.short} · {item.threshold}</span></span><ArrowRight size={16} className={active?'text-saffron':'text-white/40'}/></button>;})}</div><p className="mt-6 border-t border-white/12 pt-5 text-[10px] font-medium leading-5 text-white/55">Dit is een routecheck, geen BOI-goedkeuring, fiscale beoordeling of financieel advies. Reken USD-bedragen met de door BOI gebruikte actuele wisselkoers.</p></div><div className="p-7 sm:p-10 lg:p-12" aria-live="polite"><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">{selected.short} · {selected.threshold}</p><h2 className="mt-3 max-w-3xl font-display text-[2.65rem] font-semibold leading-[0.94] tracking-[-0.035em] text-jade sm:text-[3.4rem]">{selected.title}</h2><p className="mt-5 max-w-3xl text-sm font-medium leading-7 text-charcoal/66">{selected.intro}</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{selected.proof.map((item,index)=><div key={item} className="flex items-start gap-3 rounded-xl border border-jade/10 bg-mist/45 p-4"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-jade font-display text-sm font-semibold text-white">{index+1}</span><p className="text-[11px] font-extrabold leading-5 text-jade">{item}</p></div>)}</div><p className="mt-6 rounded-2xl border border-saffron/25 bg-canvas p-5 text-xs font-extrabold leading-6 text-jade">{selected.note}</p><a href={BOI_LTR} target="_blank" rel="noopener noreferrer" className="btn-jade mt-6">Start officiële eligibility-check <ExternalLink size={15}/></a></div></div></div></div></section>

      <section id="bewijs" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"><div className="container-custom"><SectionHeading eyebrow="Vier bewijsstromen, één onderhoudsplicht" title="Je dossier eindigt niet wanneer het visum is afgegeven." description="BOI verlangt dat de bepalende voorwaarden tijdens de looptijd blijven bestaan. De vijfjaarscheck kijkt daarom opnieuw naar de route waarop je bent toegelaten."/><div className="mt-10 overflow-hidden rounded-[30px] border border-jade/10 bg-white shadow-editorial-lift"><div className="grid lg:grid-cols-[1.12fr_0.88fr]"><div className="relative min-h-[390px] lg:min-h-[610px]"><Image src="/images/redesign/thailand-ltr-visa-routes.webp" alt="Vier LTR-bewijsroutes voor vermogen, pensioen, remote werk en specialistische expertise" fill sizes="(max-width:1024px) 100vw,56vw" className="object-cover"/></div><div className="bg-jade p-7 text-white sm:p-10 lg:p-12"><p className="eyebrow !text-saffron-light">Bewaar de onderbouwing</p><h2 className="font-display text-[3.05rem] font-semibold leading-[0.9] tracking-[-0.035em]">Eén wijziging kan je kwalificatie raken.</h2><div className="mt-7 grid gap-3">{[
        ['Investering','Verkoop of waardedaling kan de LTR-W- of LTR-P-route onder de drempel brengen.'],['Werkgever','Een andere werkgever moet bij LTR-T of LTR-H opnieuw aan de routevoorwaarden passen.'],['Verzekering','Dekking, social security of deposito moet aantoonbaar doorlopen.'],['Doel','Wijziging van verblijfsdoel kan meldings- of herkwalificatiegevolgen hebben.'],
      ].map(([label,text])=><div key={label} className="rounded-xl border border-white/14 bg-white/[0.06] p-4"><div className="flex items-center gap-3"><span className="grid h-7 w-7 place-items-center rounded-full bg-saffron text-jade"><Check size={14}/></span><strong className="text-sm">{label}</strong></div><p className="mt-2 pl-10 text-[10px] font-medium leading-5 text-white/56">{text}</p></div>)}</div><a href={BOI_ISSUANCE} target="_blank" rel="noopener noreferrer" className="btn-cream mt-7">Lees afgifte en hercheck <ExternalLink size={15}/></a></div></div></div></div></section>

      <section id="vijf-plus-vijf" className="section-divider-bottom scroll-mt-24 bg-mist py-16 lg:py-24"><div className="container-custom grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center"><SectionHeading eyebrow="Tien jaar is geen blanco cheque" title="Twee verblijfsperioden met een kwalificatiecheck ertussen." description="De visumstatus wordt voor tien jaar ingericht, maar de eerste permission to stay is maximaal vijf jaar of korter als je paspoort eerder verloopt."/><div className="rounded-[30px] bg-jade p-7 text-white shadow-editorial-lift sm:p-10"><div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr]"><article className="rounded-2xl border border-white/14 bg-white/[0.06] p-6"><span className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-light">Periode één</span><strong className="mt-4 block font-display text-4xl">Max. 5 jaar</strong><p className="mt-3 text-xs leading-6 text-white/58">Of tot de eerdere vervaldatum van je paspoort.</p></article><div className="grid place-items-center"><span className="grid h-12 w-12 place-items-center rounded-full bg-saffron text-jade"><RefreshCw size={19}/></span></div><article className="rounded-2xl border border-white/14 bg-white/[0.06] p-6"><span className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-light">Na herbeoordeling</span><strong className="mt-4 block font-display text-4xl">Nog max. 5 jaar</strong><p className="mt-3 text-xs leading-6 text-white/58">Alleen als routevoorwaarden opnieuw aantoonbaar kloppen.</p></article></div><p className="mt-5 rounded-2xl border border-saffron/30 bg-saffron/10 p-5 text-xs font-extrabold leading-6">Bewaar bronstukken doorlopend en plan de hercheck ruim vóór het einde van de eerste periode.</p></div></div></section>

      <section id="voordelen" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"><div className="container-custom"><SectionHeading eyebrow="Voordelen met voorwaarden" title="Niet ieder voordeel geldt op dezelfde manier voor iedere route." description="BOI bundelt immigratie-, luchthaven-, rapportage-, werk- en fiscale voordelen. De toepassing blijft categorie- en situatiegebonden."/><div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{[
        {icon:CalendarClock,title:'Jaarmelding',text:'De gewone 90-dagenmelding wordt voor LTR-houders een éénjaarsmelding na een aaneengesloten jaar.'},
        {icon:PlaneTakeoff,title:'Meervoudige toegang',text:'Multiple re-entry en fast-track op aangewezen internationale luchthavens.'},
        {icon:BriefcaseBusiness,title:'Werkroute',text:'Digitale work permit voor toepasselijke Thaise arbeid; niet voor LTR-T remote werk voor buitenland.'},
        {icon:Landmark,title:'Belasting',text:'17% wordt specifiek voor LTR-H genoemd. Laat buitenlands inkomen en residentie individueel toetsen.'},
      ].map((item)=>{const Icon=item.icon;return <article key={item.title} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="grid h-12 w-12 place-items-center rounded-xl bg-jade text-white"><Icon size={20}/></span><h2 className="mt-5 font-display text-2xl font-semibold text-jade">{item.title}</h2><p className="mt-3 text-xs font-medium leading-6 text-charcoal/62">{item.text}</p></article>;})}</div><p className="mt-5 rounded-2xl border border-saffron/25 bg-tonal p-6 text-xs font-extrabold leading-6 text-jade">Een visumpagina kan geen persoonlijke belastinganalyse vervangen. Controleer actuele Thaise wetgeving, je fiscale woonplaats, belastingverdrag en inkomensbron met een gekwalificeerde adviseur.</p></div></section>

      <section id="aanvragen" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"><div className="container-custom"><SectionHeading eyebrow="BOI eerst, visumafgifte daarna" title="Vier fases met een harde 60-dagentermijn na endorsement." description="BOI beoordeelt je kwalificatie. De Thaise ambassade of TIESC verzorgt daarna de daadwerkelijke afgifte tegen het lokaal geldende tarief."/><div className="relative mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4"><div className="pointer-events-none absolute left-[7%] right-[7%] top-8 hidden border-t-2 border-dotted border-saffron/55 xl:block"/>{[
        {icon:Route,label:'01',title:'Kies één route',text:'Toets alle drempels en kies de bewijsroute die volledig aansluit.'},
        {icon:FileCheck2,label:'02',title:'Vraag endorsement aan',text:'Dien rechtstreeks in bij BOI; BOI rekent hiervoor geen kwalificatiefee.'},
        {icon:CalendarClock,label:'03',title:'Wacht op documentcheck',text:'BOI noemt 20 werkdagen vanaf een compleet dossier.'},
        {icon:PlaneTakeoff,label:'04',title:'Regel afgifte binnen 60 dagen',text:'Kies TIESC in Thailand of e-Visa via een ambassade en betaal daar de afgiftefee.'},
      ].map((step)=>{const Icon=step.icon;return <article key={step.title} className="relative rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border-4 border-tonal bg-jade text-white"><Icon size={19}/></span><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">Stap {step.label}</p><h2 className="mt-2 font-display text-2xl font-semibold leading-tight text-jade">{step.title}</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/62">{step.text}</p></article>;})}</div><div className="mt-5 grid gap-4 lg:grid-cols-2"><a href={BOI_APPLICATION} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-4 rounded-2xl bg-jade p-6 text-white"><span><strong className="block text-sm">Rechtstreeks naar BOI</strong><span className="mt-1 block text-[10px] text-white/52">Geen endorsementfee</span></span><ExternalLink size={18} className="text-saffron-light"/></a><a href={EMBASSY_CATEGORIES} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-4 rounded-2xl border border-jade/12 bg-white p-6 text-jade"><span><strong className="block text-sm">Haagse e-Visa-afgifte</strong><span className="mt-1 block text-[10px] text-charcoal/52">BOI-letter is 60 dagen geldig</span></span><ExternalLink size={18} className="text-saffron-dark"/></a></div></div></section>

      <section className="section-divider-bottom py-16 lg:py-24"><div className="container-custom"><div className="overflow-hidden rounded-[30px] bg-jade text-white shadow-editorial-lift"><div className="grid lg:grid-cols-[0.82fr_1.18fr]"><div className="p-8 sm:p-11"><p className="eyebrow !text-saffron-light">Na kwalificatie, vóór langdurig huren</p><h2 className="font-display text-[3.05rem] font-semibold leading-[0.9] tracking-[-0.035em]">Test Bangkok alsof je er werkt en woont.</h2><p className="mt-5 text-sm font-medium leading-7 text-white/60">Gebruik een flexibele eerste maand om woonwijk, reistijd, zorg en dagelijkse routine te toetsen voordat je langdurige verplichtingen aangaat.</p><Link href="/best-hotels/bangkok/" className="btn-cream mt-7">Vergelijk Bangkok-wijken <ArrowRight size={15}/></Link></div><div className="grid gap-3 bg-white/[0.055] p-7 sm:grid-cols-2 sm:p-10"><a href={hotelHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-2xl border border-white/14 bg-white/[0.07] p-5"><Home size={20} className="text-saffron-light"/><strong className="mt-4 block text-sm">Flexibele eerste maand</strong><span className="mt-1 block text-[10px] text-white/50">Verblijven via Trip.com</span></a><a href={esimHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-2xl border border-white/14 bg-white/[0.07] p-5"><Smartphone size={20} className="text-saffron-light"/><strong className="mt-4 block text-sm">Bereikbaar bij aankomst</strong><span className="mt-1 block text-[10px] text-white/50">eSIM vergelijken via Saily</span></a><AffiliateDisclosure className="sm:col-span-2 !border-white/12 !bg-white/[0.04] !text-white/55">Trip.com en Saily zijn affiliate-links voor praktisch verblijf en bereikbaarheid. Ze hebben geen invloed op BOI-kwalificatie of visumafgifte.</AffiliateDisclosure></div></div></div></div></section>

      <FaqSplitSection id="vragen" eyebrow="Echte LTR-zoekvragen" title="Veelgestelde vragen over Thailand LTR Visa" description="De vragen komen uit twee actuele Nederlandse DataForSEO-SERP’s. Antwoorden gebruiken de BOI-criteria van 2025 en benoemen zichtbaar waar oudere officiële webteksten nog achterlopen." items={faqs}/>
      <RelatedGuidesSection eyebrow="Vergelijk langverblijfsroutes" title="Kies op kwalificatie, niet op de langste looptijd" guides={[
        {title:'Pensioenvisum Thailand',description:'Vergelijk Non-O, O-A en O-X als de LTR-P-drempel niet past.',href:'/visa/retirement-visa/',image:'/images/redesign/thailand-retirement-visa-hero.webp',imageAlt:'Pensioenroute voor Thailand'},
        {title:'DTV Thailand',description:'Bekijk de vijfjarige workcationroute voor remote werk en soft power.',href:'/visa/digital-nomad-visa/',image:'/images/redesign/thailand-dtv-hero.webp',imageAlt:'Remote werken vanuit Thailand'},
        {title:'Visum Thailand',description:'Zet LTR naast kort verblijf en andere visumroutes.',href:'/visa/',image:'/images/redesign/thailand-visa-hero.webp',imageAlt:'Thaise visumdocumenten op een bureau'},
      ]}/>
      <SourceMethodSection eyebrow="Bronnen & onderzoek" title="BOI-criteria zijn belangrijker dan oude agentartikelen." description="DataForSEO-onderzoek voor Nederland omvatte drie keywordsets, twee live SERP’s, twaalf PAA-vragen, vier concurrentieparses en ranking- en backlinkchecks. Criteria, 2025-wijzigingen, 5+5-jaarstructuur, afgifteproces en tarieven zijn gecontroleerd bij BOI en de Thaise ambassade in Den Haag." sources={[
        {title:'LTR Visa Thailand · criteria and benefits',creator:'Thailand Board of Investment',url:BOI_LTR,note:'Primaire bron voor de vier routes, inkomens- en investeringsdrempels, verzekering en programma-voordelen.'},
        {title:'LTR 2025 criteria update',creator:'Thailand Board of Investment · brochure 2025',url:BOI_BROCHURE,note:'Primaire bron voor geen inkomenseis bij LTR-W, USD 50 miljoen werkgeversdrempel, dependentupdate, 20 werkdagen en 5+5 jaar.'},
        {title:'LTR Visa issuance information',creator:'Thailand Board of Investment',url:BOI_ISSUANCE,note:'Primaire bron voor endorsement van 60 dagen, 50.000 THB bij TIESC, e-Visa-afgifte, herbeoordeling en work-permitverschillen.'},
        {title:'Revised Fees for Consular Services',creator:'Royal Thai Embassy The Hague',url:EMBASSY_FEES,note:'Primaire Nederlandse bron voor €1.750 afgiftekosten van een tienjarig LTR multiple-entryvisum.'},
      ]}/>
    </main>
  </>;
}
