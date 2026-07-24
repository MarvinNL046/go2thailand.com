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

const THAI_E_VISA = 'https://www.thaievisa.go.th/';

const sectionNav = [
  { href: '#kort' as const, label: 'Kort antwoord', icon: ShieldCheck },
  { href: '#route' as const, label: 'Jouw route', icon: Route },
  { href: '#duur' as const, label: 'Duur', icon: CalendarClock },
  { href: '#bewijs' as const, label: 'Bewijs', icon: FileCheck2 },
  { href: '#aanvragen' as const, label: 'Aanvragen', icon: Laptop },
  { href: '#vragen' as const, label: 'Vragen', icon: CircleAlert },
];

type DtvRouteKey = 'workcation' | 'softpower' | 'dependent';

const routeOptions: Array<{
  key: DtvRouteKey;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  evidence: string[];
  caution: string;
}> = [
  {
    key: 'workcation',
    label: 'Remote werk / freelance',
    eyebrow: 'DTV1 · Workcation',
    title: 'Je bewijs moet jouw buitenlandse werkpraktijk laten zien.',
    description: 'Deze route is bedoeld voor digitale nomaden, remote workers, buitenlandse talenten en freelancers. De categorie is niet hetzelfde als lokale arbeid voor een Thaise werkgever.',
    evidence: ['Paspoort-biodatapagina en recente foto', 'Bewijs dat je je tijdens de aanvraag in Nederland bevindt', 'Financieel bewijs van minimaal 500.000 THB', 'Arbeidscontract of werkgeversverklaring óf een overtuigend professioneel portfolio'],
    caution: 'Laat functie, opdrachtgever, werkvorm en buitenlandse context logisch op elkaar aansluiten. De ambassade kan aanvullende stukken of een interview vragen.',
  },
  {
    key: 'softpower',
    label: 'Muay Thai / cursus / zorg',
    eyebrow: 'DTV2 · Thai soft power',
    title: 'De activiteit en organisator vormen de kern van je dossier.',
    description: 'De officiële categorie noemt onder meer Muay Thai, Thaise kooktraining en medische behandeling. Een losse vakantieactiviteit is geen bewijs van een langdurig programma.',
    evidence: ['Paspoort-biodatapagina en recente foto', 'Bewijs van huidige locatie', 'Financieel bewijs van minimaal 500.000 THB', 'Bevestiging van de organisator of afspraakbrief van ziekenhuis/medisch centrum'],
    caution: 'Controleer duur, aanbieder, locatie en planning voordat je betaalt. Go2Thailand beoordeelt geen opleiders of medische instellingen voor visumgeschiktheid.',
  },
  {
    key: 'dependent',
    label: 'Partner / kind',
    eyebrow: 'DTV3 · Afhankelijk gezinslid',
    title: 'Ieder gezinslid krijgt een eigen aanvraag met relatiebewijs.',
    description: 'De route geldt voor een echtgenoot of echtgenote en kinderen jonger dan 20 jaar van een DTV-houder. De hoofd-DTV vervangt de eigen aanvraag niet.',
    evidence: ['Paspoort-biodatapagina en recente foto', 'Bewijs van huidige locatie', 'Financieel bewijs van minimaal 500.000 THB', 'DTV van de hoofdhouder plus huwelijks-, geboorte- of adoptiebewijs'],
    caution: 'Buitenlandse aktes en vertalingen kunnen aanvullende eisen hebben. Gebruik de actuele checklist in het e-Visa-systeem voor jouw exacte dossier.',
  },
];

const quickFacts = [
  { icon: CalendarClock, label: 'Visumgeldigheid', value: '5 jaar', text: 'Multiple entry vanaf de afgiftedatum; niet vijf jaar onafgebroken verblijf.' },
  { icon: PlaneTakeoff, label: 'Per binnenkomst', value: 'Tot 180 dagen', text: 'De immigratiestempel bepaalt de concrete toegestane verblijfstermijn.' },
  { icon: WalletCards, label: 'Financieel bewijs', value: '500.000 THB', text: 'Minimumbedrag in de officiële DTV-checklist; de bron noemt onder meer bankafschriften.' },
  { icon: BadgeEuro, label: 'Aanvraag in NL', value: '€ 350', text: 'Officiële Haagse tarieflijst; betaald dossiergeld is niet terugbetaalbaar.' },
];

const applicationSteps = [
  { icon: Route, label: 'Eerst', title: 'Kies de echte DTV-route', text: 'Workcation, soft power en dependent hebben elk een ander beslissend bewijsstuk.' },
  { icon: FileCheck2, label: 'Daarna', title: 'Bouw één consistent dossier', text: 'Paspoort, huidige locatie, financiën en routebewijs moeten hetzelfde verhaal vertellen.' },
  { icon: Laptop, label: 'Online', title: 'Vraag aan vanuit Nederland', text: 'De Haagse ambassade behandelt e-Visas van mensen die tijdens het proces in Nederland verblijven.' },
  { icon: MailCheck, label: 'Na controle', title: 'Download de e-Visa', text: 'Controleer de e-mail en print of bewaar het bevestigingsdocument voor airline en immigratie.' },
];

const faqs = [
  { question: 'Wat is een DTV visa Thailand?', answer: 'Het Destination Thailand Visa is een vijf jaar geldig multiple-entryvisum voor drie officiële routes: workcation voor digitale nomaden, remote workers, buitenlands talent en freelancers; geselecteerde Thai soft power-activiteiten; en echtgenoten of kinderen jonger dan 20 van een DTV-houder. Per binnenkomst is het toegestane verblijf maximaal 180 dagen.' },
  { question: 'Hoe vraag je een DTV aan in Nederland?', answer: 'Vraag online aan via thaievisa.go.th terwijl je in Nederland verblijft. Kies de juiste DTV-categorie, upload je paspoort, recente foto, bewijs van huidige locatie, financieel bewijs en het routespecifieke bewijs. De Thaise ambassade in Den Haag vermeldt dat je gedurende het hele aanvraagproces in Nederland moet zijn.' },
  { question: 'Hoeveel geld heb je nodig voor een DTV Thailand?', answer: 'De officiële categoriechecklist noemt financieel bewijs van minimaal 500.000 THB voor DTV1, DTV2 en DTV3. Dit bedrag is een toelatingseis voor het dossier en staat los van de aanvraagkosten. De ambassade kan aanvullende documenten vragen.' },
  { question: 'Hoeveel kost het DTV-visum in Nederland?', answer: 'De officiële tarieflijst van de Royal Thai Embassy in Den Haag vermeldt €350 voor het vijfjarige multiple-entry DTV. Controleer het live bedrag in het e-Visa-systeem voordat je betaalt. De algemene voorwaarden vermelden dat betaalde aanvraagkosten niet worden terugbetaald bij annulering of afwijzing.' },
  { question: 'Mag je met een DTV voor een Thais bedrijf werken?', answer: 'De officiële DTV1-omschrijving is workcation voor digitale nomaden, remote workers, buitenlandse talenten en freelancers. Behandel dit niet als automatische toestemming voor een lokale Thaise baan. Voor werk bij een Thaise entiteit kunnen andere visum- en werkvergunningsregels gelden; laat je specifieke situatie officieel of professioneel beoordelen.' },
  { question: 'Kun je een DTV in Thailand aanvragen?', answer: 'Niet via de e-Visa-route van de Thaise ambassade in Den Haag. Die vermeldt dat een visum voor toegang wordt afgegeven aan aanvragers buiten Thailand en dat Nederlandse aanvragers tijdens het hele proces in Nederland moeten verblijven.' },
];

export default function ThailandDtvGuide() {
  const [route, setRoute] = useState<DtvRouteKey>('workcation');
  const selected = useMemo(() => routeOptions.find((item) => item.key === route) ?? routeOptions[0], [route]);
  const hotelHref = withPlacementSubId(TRIP_GENERIC, 'nl-dtv-visa', 'first-month-base');
  const esimHref = withPlacementSubId(SAILY_GENERIC, 'nl-dtv-visa', 'arrival-connectivity');

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
  };
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'DTV visa Thailand aanvragen vanuit Nederland',
    description: 'Beslis- en aanvraaggids voor het Destination Thailand Visa met officiële categorieën, duur, financiële eis en Nederlandse e-Visa-route.',
    url: 'https://go2-thailand.com/nl/visa/digital-nomad-visa/',
    inLanguage: 'nl-NL',
    dateModified: '2026-07-24',
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://go2-thailand.com/nl/' },
      { '@type': 'ListItem', position: 2, name: 'Visum Thailand', item: 'https://go2-thailand.com/nl/visa/' },
      { '@type': 'ListItem', position: 3, name: 'DTV visa Thailand', item: 'https://go2-thailand.com/nl/visa/digital-nomad-visa/' },
    ],
  };

  return (
    <>
      <SEOHead
        title="DTV visa Thailand aanvragen vanuit Nederland | Go2Thailand"
        description="DTV visa Thailand aanvragen? Vergelijk workcation, soft power en gezinsroutes, plus 180 dagen verblijf, €350 kosten en 500.000 THB bewijs."
        ogImage="https://go2-thailand.com/images/redesign/thailand-dtv-hero.webp"
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </SEOHead>

      <main className="bg-canvas text-charcoal">
        <EditorialHero
          image="/images/redesign/thailand-dtv-hero.webp"
          imageAlt="Remote professional werkt vanuit een Thaise kustomgeving met paspoort en bewijsmap"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Visum', href: '/visa/' }, { label: 'DTV' }]}
          eyebrow="Workcation · soft power · gezin"
          title={<>DTV Thailand.<br /><span className="text-saffron">Welke route past?</span></>}
          subtitle="Vijf jaar geldig is niet hetzelfde als vijf jaar onafgebroken blijven."
          description="Kies eerst jouw officiële categorie. Bouw daarna pas het bewijsdossier en vraag online aan terwijl je in Nederland verblijft."
          actions={[
            { label: 'Doe de routecheck', href: '#route', kind: 'primary' },
            { label: 'Open officiële e-Visa', href: THAI_E_VISA, kind: 'secondary', newTab: true },
          ]}
          minHeightClassName="min-h-[735px] lg:min-h-[710px]"
          titleClassName="max-w-[720px] text-[3.8rem] leading-[0.88] !text-white sm:text-[5.05rem] lg:text-[5.75rem]"
          subtitleClassName="max-w-[650px] !text-white"
          descriptionClassName="mt-4 max-w-[580px] text-sm leading-7 !text-white/80"
          imageClassName="object-cover object-[68%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(4,42,34,0.18)_0%,rgba(4,42,34,0.52)_44%,rgba(4,42,34,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(4,42,34,0.99)_0%,rgba(4,42,34,0.95)_44%,rgba(4,42,34,0.14)_70%,rgba(4,42,34,0.01)_100%)]"
          contentClassName="max-w-[740px] [&_nav]:!text-white/60 [&_nav_span]:!text-white/75"
          sideCard={
            <div className="absolute bottom-8 right-[max(2rem,calc((100vw-1280px)/2))] z-10 hidden w-[320px] rounded-2xl border border-white/25 bg-jade/82 p-5 text-white shadow-editorial-card backdrop-blur-lg xl:block">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">De twee klokken</p>
              <div className="mt-4 grid grid-cols-2 gap-3"><div><strong className="font-display text-4xl">5 jaar</strong><span className="mt-1 block text-[9px] font-bold text-white/55">visum geldig</span></div><div className="border-l border-white/15 pl-4"><strong className="font-display text-4xl">180</strong><span className="mt-1 block text-[9px] font-bold text-white/55">dagen per entry</span></div></div>
              <p className="mt-4 border-t border-white/12 pt-4 text-[10px] font-semibold leading-5 text-white/58">Controleer bij iedere binnenkomst de stempel en uiterste vertrekdatum.</p>
            </div>
          }
        />

        <PageSectionNav items={sectionNav} />

        <section id="kort" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom">
            <SectionHeading eyebrow="Het DTV in vier getallen" title="Eerst de structuur. Dan pas de aanvraag." description="Deze waarden komen uit de officiële Thaise categoriechecklist en de tarieflijst van de ambassade in Den Haag. Een aanvraag blijft altijd onder voorbehoud van beoordeling." />
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {quickFacts.map((fact) => {
                const Icon = fact.icon;
                return <article key={fact.label} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/30 bg-canvas text-jade"><Icon size={20} /></span><span className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{fact.label}</span></div><h2 className="mt-5 font-display text-[1.85rem] font-semibold leading-tight text-jade">{fact.value}</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/60">{fact.text}</p></article>;
              })}
            </div>
          </div>
        </section>

        <section id="route" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading eyebrow="Niet ieder DTV-dossier is hetzelfde" title="Welke bewijsroute hoort bij jouw echte doel?" description="Klik je situatie aan. De basis is gelijk, maar het beslissende bewijs verschilt sterk tussen werk, activiteit en gezin." />
            <div className="mt-10 overflow-hidden rounded-[30px] border border-jade/10 bg-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[0.68fr_1.32fr]">
                <div className="bg-jade p-6 text-white sm:p-9">
                  <p className="eyebrow !text-saffron-light">Jouw categorie</p>
                  <div className="mt-6 grid gap-2">
                    {routeOptions.map((option) => {
                      const active = route === option.key;
                      return <button key={option.key} type="button" aria-pressed={active} onClick={() => setRoute(option.key)} className={`flex min-h-14 items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-extrabold transition ${active ? 'border-saffron/60 bg-white text-jade' : 'border-white/12 bg-white/[0.05] text-white hover:bg-white/10'}`}>{option.label}<ArrowRight size={16} className={active ? 'text-saffron' : 'text-white/45'} /></button>;
                    })}
                  </div>
                  <p className="mt-6 border-t border-white/12 pt-5 text-[10px] font-medium leading-5 text-white/55">De e-Visa-checklist en eventuele aanvullende vraag van de ambassade zijn leidend. Go2Thailand is geen visumdienst.</p>
                </div>
                <div className="p-7 sm:p-10 lg:p-12" aria-live="polite">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">{selected.eyebrow}</p>
                  <h2 className="mt-3 max-w-3xl font-display text-[2.75rem] font-semibold leading-[0.94] tracking-[-0.035em] text-jade sm:text-[3.5rem]">{selected.title}</h2>
                  <p className="mt-5 max-w-3xl text-sm font-medium leading-7 text-charcoal/65">{selected.description}</p>
                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    {selected.evidence.map((item, index) => <div key={item} className="flex items-start gap-3 rounded-xl border border-jade/10 bg-mist/45 p-4"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-jade font-display text-sm font-semibold text-white">{index + 1}</span><p className="text-[11px] font-extrabold leading-5 text-jade">{item}</p></div>)}
                  </div>
                  <p className="mt-6 rounded-2xl border border-saffron/25 bg-canvas p-5 text-xs font-extrabold leading-6 text-jade">{selected.caution}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="duur" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <SectionHeading eyebrow="Geldigheid versus verblijfsduur" title="Twee tijdlijnen die je niet mag verwisselen." description="Het visum kan vijf jaar voor meerdere binnenkomsten worden gebruikt. Iedere binnenkomst krijgt een eigen toegestane verblijfstermijn." />
            <div className="rounded-[30px] border border-jade/10 bg-jade p-7 text-white shadow-editorial-lift sm:p-10">
              <div className="grid gap-8">
                <div><div className="flex items-end justify-between gap-4"><span><span className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-light">Visumklok</span><strong className="mt-1 block font-display text-3xl">5 jaar multiple entry</strong></span><RefreshCw size={22} className="text-saffron-light" /></div><div className="mt-5 flex gap-1">{Array.from({ length: 5 }).map((_, index) => <div key={index} className="flex-1"><div className="h-3 rounded-full bg-saffron" /><span className="mt-2 block text-center text-[9px] font-extrabold text-white/45">Jaar {index + 1}</span></div>)}</div></div>
                <div className="border-t border-white/12 pt-8"><div className="flex items-end justify-between gap-4"><span><span className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-light">Verblijfsklok per entry</span><strong className="mt-1 block font-display text-3xl">Tot 180 dagen</strong></span><PlaneTakeoff size={22} className="text-saffron-light" /></div><div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3"><div className="rounded-xl border border-white/15 bg-white/[0.07] p-4 text-center"><strong className="font-display text-2xl">Entry</strong><span className="mt-1 block text-[9px] font-bold text-white/45">stempel controleren</span></div><ArrowRight size={18} className="text-saffron-light" /><div className="rounded-xl border border-saffron/35 bg-saffron/10 p-4 text-center"><strong className="font-display text-2xl">Max. 180</strong><span className="mt-1 block text-[9px] font-bold text-white/45">toegestaan verblijf</span></div></div></div>
              </div>
              <div className="mt-7 rounded-2xl border border-white/14 bg-white/[0.06] p-5"><strong className="text-xs">Een verlenging is geen automatisch tweede blok.</strong><p className="mt-2 text-[10px] font-medium leading-5 text-white/55">De officiële maatregel noemt één mogelijke verlenging tot maximaal 180 dagen via Immigration Bureau. Beoordeling en actuele bewijsstukken blijven leidend; vertrek en opnieuw binnenkomen is een andere handeling.</p></div>
            </div>
          </div>
        </section>

        <section id="bewijs" className="section-divider-bottom scroll-mt-24 bg-mist py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading eyebrow="De bewijsmap" title="Drie routes, één gemeenschappelijke onderlaag." description="Maak geen dossier uit losse screenshots. Zorg dat locatie, financiën en routespecifiek bewijs dezelfde persoon en periode beschrijven." />
            <div className="mt-10 overflow-hidden rounded-[30px] border border-jade/10 bg-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
                <div className="relative min-h-[470px] lg:min-h-[640px]"><Image src="/images/redesign/thailand-dtv-proof-routes.webp" alt="DTV-bewijsroutes voor remote werk, Thaise activiteiten en gezinsleden" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" /></div>
                <div className="bg-jade p-7 text-white sm:p-10 lg:p-12">
                  <p className="eyebrow !text-saffron-light">Wat altijd terugkomt</p>
                  <h2 className="font-display text-[3.25rem] font-semibold leading-[0.9] tracking-[-0.035em]">Basisbewijs eerst. Categorie-bewijs daarna.</h2>
                  <div className="mt-7 grid gap-3">
                    {[
                      'Biodatapagina van je paspoort',
                      'Recente pasfoto volgens uploadvereisten',
                      'Bewijs dat je je tijdens de aanvraag in Nederland bevindt',
                      'Financieel bewijs van minimaal 500.000 THB',
                      'Eén routespecifieke bewijsset uit de keuzehulp',
                    ].map((item) => <div key={item} className="flex items-start gap-3 rounded-xl border border-white/14 bg-white/[0.06] px-4 py-3"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-saffron text-jade"><Check size={13} /></span><span className="text-xs font-extrabold leading-5">{item}</span></div>)}
                  </div>
                  <a href="https://hague.thaiembassy.org/th/publicservice/e-visa-categories-required-documents/" target="_blank" rel="noopener noreferrer" className="btn-cream mt-7">Open de officiële categoriechecklist <ExternalLink size={15} /></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="aanvragen" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading eyebrow="Van Nederland naar e-Visa" title="Vier stappen, met de locatiecheck vóór alles." description="De Thaise ambassade in Den Haag verwerkt de aanvraag volledig online, maar alleen wanneer je tijdens het proces in Nederland verblijft." />
            <div className="relative mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="pointer-events-none absolute left-[7%] right-[7%] top-8 hidden border-t-2 border-dotted border-saffron/55 xl:block" />
              {applicationSteps.map((step, index) => {
                const Icon = step.icon;
                return <article key={step.title} className="relative rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border-4 border-canvas bg-jade text-white"><Icon size={19} /></span><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">0{index + 1} · {step.label}</p><h2 className="mt-2 font-display text-2xl font-semibold leading-tight text-jade">{step.title}</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/60">{step.text}</p></article>;
              })}
            </div>
            <div className="mt-5 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
              <div className="rounded-2xl border border-saffron/25 bg-tonal p-6"><div className="flex items-start gap-4"><CalendarClock size={22} className="mt-1 shrink-0 text-saffron-dark" /><div><strong className="font-display text-2xl font-semibold text-jade">Plan ruim, maar niet onbeperkt vroeg.</strong><p className="mt-2 text-xs font-medium leading-6 text-charcoal/62">De Haagse algemene voorwaarden noemen voor de meeste complete aanvragen doorgaans 5–10 werkdagen. Ze adviseren minimaal één maand vóór vertrek aan te vragen, maar niet langer dan twee maanden vooraf. Controleer altijd de actuele instructie en ambassadevakanties.</p></div></div></div>
              <a href={THAI_E_VISA} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-4 rounded-2xl bg-jade p-6 text-white shadow-editorial-card"><span><strong className="block text-sm">Start alleen via Thai e-Visa</strong><span className="mt-1 block text-[10px] font-medium text-white/55">Officieel platform van het Thaise ministerie.</span></span><ExternalLink size={18} className="shrink-0 text-saffron-light" /></a>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom bg-tonal py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.74fr_1.26fr] lg:items-start">
            <SectionHeading eyebrow="Na goedkeuring" title="Je DTV is nog niet je volledige aankomstmap." description="De e-Visa opent de route. Voor vertrek en iedere nieuwe binnenkomst blijven aanvullende praktische stappen nodig." />
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: MailCheck, label: 'E-Visa', title: 'Bewaar de bevestiging', text: 'Print of download het document voor airline en immigratie.' },
                { icon: Smartphone, label: 'Binnen 3 dagen', title: 'Vul een nieuwe TDAC in', text: 'De aankomstkaart is gratis en geldt apart voor iedere binnenkomst.' },
                { icon: PlaneTakeoff, label: 'Bij entry', title: 'Controleer je stempel', text: 'Noteer de concrete uiterste vertrekdatum van deze binnenkomst.' },
              ].map((item) => {
                const Icon = item.icon;
                return <article key={item.title} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/30 bg-canvas text-jade"><Icon size={20} /></span><span className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-saffron-dark">{item.label}</span></div><h2 className="mt-5 font-display text-[1.65rem] font-semibold leading-tight text-jade">{item.title}</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/60">{item.text}</p></article>;
              })}
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-16 lg:py-24">
          <div className="container-custom">
            <div className="overflow-hidden rounded-[30px] bg-jade text-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
                <div className="p-8 sm:p-11"><p className="eyebrow !text-saffron-light">DTV versus nomadenleven</p><h2 className="font-display text-[3.2rem] font-semibold leading-[0.9] tracking-[-0.035em]">Het visum kiest niet jouw stad, budget of werkplek.</h2><p className="mt-5 text-sm font-medium leading-7 text-white/60">DTV-voorwaarden blijven hier. Wijken, internet, coworking en maandkosten horen bij de afzonderlijke digital-nomad-index.</p><Link href="/thailand-index/digital-nomad/" className="btn-cream mt-7">Vergelijk nomadensteden <ArrowRight size={15} /></Link></div>
                <div className="grid gap-3 bg-white/[0.055] p-7 sm:grid-cols-2 sm:p-10">
                  <a href={hotelHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-2xl border border-white/14 bg-white/[0.07] p-5"><Hotel size={20} className="text-saffron-light" /><strong className="mt-4 block text-sm">Flexibele eerste maand</strong><span className="mt-1 block text-[10px] text-white/50">Verblijf vergelijken via Trip.com</span></a>
                  <a href={esimHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-2xl border border-white/14 bg-white/[0.07] p-5"><Smartphone size={20} className="text-saffron-light" /><strong className="mt-4 block text-sm">Data bij aankomst</strong><span className="mt-1 block text-[10px] text-white/50">eSIM vergelijken via Saily</span></a>
                  <AffiliateDisclosure className="sm:col-span-2 !border-white/12 !bg-white/[0.04] !text-white/55">Trip.com en Saily zijn affiliate-links voor je praktische aankomst. Ze spelen geen rol in de beoordeling van je DTV-aanvraag.</AffiliateDisclosure>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FaqSplitSection id="vragen" eyebrow="Echte DTV-zoekvragen" title="Veelgestelde vragen over het DTV-visum" description="De vragen komen uit de actuele Nederlandse DataForSEO-SERP. Antwoorden gebruiken officiële Thaise categorie-, tarief- en aanvraagbronnen en beloven nooit goedkeuring." items={faqs} />

        <RelatedGuidesSection
          eyebrow="Verder voor lang verblijf"
          title="Houd visum, aankomst en leefkeuze uit elkaar"
          guides={[
            { title: 'Visum Thailand', description: 'Vergelijk de actuele visumvrije route met toeristen- en langverblijfopties.', href: '/visa/', image: '/images/redesign/thailand-visa-hero.webp', imageAlt: 'Reisdocumenten voor Thailand' },
            { title: 'TDAC invullen', description: 'Bereken het juiste indienmoment en leg je aankomstgegevens klaar.', href: '/visa/digital-arrival-card/', image: '/images/redesign/thailand-tdac-hero.webp', imageAlt: 'Digitale aankomstkaart voor Thailand' },
            { title: 'Digital Nomad Index', description: 'Vergelijk steden op praktische leef- en werkfactoren.', href: '/thailand-index/digital-nomad/', image: '/images/redesign/thailand-dtv-hero.webp', imageAlt: 'Remote werken vanuit Thailand' },
          ]}
        />

        <SourceMethodSection
          eyebrow="Bronnen & onderzoek"
          title="Een DTV-dossier begint bij de officiële categorie, niet bij een bemiddelaar."
          description="DataForSEO-onderzoek voor Nederland omvat 82 clusterkeywords, een live SERP met zes echte PAA-vragen, drie concurrentiebronnen en ranking- en backlinkchecks. Vereisten, duur, tarief en aanvraaglocatie zijn gecontroleerd via Thaise overheids- en ambassadebronnen."
          sources={[
            { title: 'E-Visa Categories and Required Documents', creator: 'Royal Thai Embassy The Hague · checklist 18 juni 2025', url: 'https://hague.thaiembassy.org/th/publicservice/e-visa-categories-required-documents/', note: 'Primaire bron voor DTV1, DTV2 en DTV3, vijf jaar multiple entry, 500.000 THB financieel bewijs en routespecifieke stukken.' },
            { title: 'E-Visa General Conditions', creator: 'Royal Thai Embassy The Hague', url: 'https://hague.thaiembassy.org/th/publicservice/e-visa-general-conditions/', note: 'Primaire bron voor aanvraag vanuit Nederland, online proces, niet-terugbetaalbare kosten, indicatieve verwerking en aanvraagmoment.' },
            { title: 'Revised Fees for Consular Services', creator: 'Royal Thai Embassy The Hague', url: 'https://hague.thaiembassy.org/th/content/%E0%B8%9B%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%AD%E0%B8%B1%E0%B8%95%E0%B8%A3%E0%B8%B2%E0%B8%84%E0%B8%B2%E0%B8%98%E0%B8%A3%E0%B8%A3%E0%B8%A1%E0%B9%80%E0%B8%99%E0%B8%B5%E0%B8%A2%E0%B8%A1%E0%B8%94%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%81%E0%B8%87%E0%B8%AA%E0%B8%B8%E0%B8%A5-2567', note: 'Officiële Nederlandse tarieflijst met €350 voor het vijfjarige multiple-entry Destination Thailand Visa.' },
            { title: 'Thailand New Visa Measures', creator: 'Department of Consular Affairs · Thailand MFA', url: 'https://image.mfa.go.th/mfa/0/4a5AsMHake/%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%8A%E0%B8%B2%E0%B8%AA%E0%B8%B1%E0%B8%A1%E0%B8%9E%E0%B8%B1%E0%B8%99%E0%B8%98%E0%B9%8C_%E0%B8%9A%E0%B8%97%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1/%E0%B8%A1%E0%B8%B2%E0%B8%95%E0%B8%A3%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%95%E0%B8%A3%E0%B8%A7%E0%B8%88%E0%B8%A5%E0%B8%87%E0%B8%95%E0%B8%A3%E0%B8%B2_Visa_%E0%B8%AD%E0%B8%B1%E0%B8%9E%E0%B9%80%E0%B8%94%E0%B8%95/New_Measures_as_of_29_May_2024_-_1955.pdf', note: 'Primaire bron voor maximaal 180 dagen per entry en één mogelijke verlenging tot maximaal 180 dagen.' },
          ]}
        />
      </main>
    </>
  );
}
