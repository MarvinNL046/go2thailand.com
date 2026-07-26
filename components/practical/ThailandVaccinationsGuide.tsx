import Image from 'next/image';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  CalendarClock,
  Check,
  CircleHelp,
  ExternalLink,
  FileCheck2,
  HeartPulse,
  Hospital,
  MapPinned,
  PackageCheck,
  PawPrint,
  PhoneCall,
  Route,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Syringe,
  WalletCards,
} from 'lucide-react';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav, type PageSectionNavItem } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';

const PAGE_URL = 'https://go2-thailand.com/nl/practical-info/health-vaccinations/';
const PAGE_TITLE = 'Vaccinaties Thailand: wat heb je nodig?';
const PAGE_DESCRIPTION =
  'Welke vaccinaties heb je nodig voor Thailand? Bekijk DTP, hepatitis A, malaria, dengue, rabiës, voorbereidingstijd en kosten per reisplan.';
const HERO_IMAGE = '/images/redesign/thailand-vaccinations-hero.webp';

const sectionNav: PageSectionNavItem[] = [
  { href: '#kort-antwoord', label: 'Kort antwoord', icon: BadgeCheck },
  { href: '#prikplan', label: 'Prikplan', icon: Syringe },
  { href: '#muggen', label: 'Muggen', icon: ShieldCheck },
  { href: '#rabies', label: 'Dierenbeet', icon: PawPrint },
  { href: '#reisapotheek', label: 'Reisapotheek', icon: PackageCheck },
  { href: '#kosten', label: 'Kosten', icon: WalletCards },
  { href: '#vragen', label: 'Vragen', icon: CircleHelp },
];

interface AdviceLane {
  icon: LucideIcon;
  number: string;
  title: string;
  lead: string;
  points: string[];
}

const adviceLanes: AdviceLane[] = [
  {
    icon: BookOpenCheck,
    number: '01',
    title: 'Wat staat er al in je dossier?',
    lead: 'Begin bij je vaccinatiegeschiedenis, niet bij een online boodschappenlijst.',
    points: [
      'Neem je vaccinatieboekje of digitaal overzicht mee.',
      'Meld eerdere reacties en ontbrekende gegevens.',
      'Laat een professional beoordelen wat nog geldig of passend is.',
    ],
  },
  {
    icon: MapPinned,
    number: '02',
    title: 'Waar kom je precies?',
    lead: 'Bangkok, een eilandroute en een lang verblijf langs grensgebieden zijn niet hetzelfde gezondheidsprofiel.',
    points: [
      'Noteer regio’s, tussenstops en buurlanden.',
      'Maak onderscheid tussen stad, kust, platteland en grensgebied.',
      'Controleer malaria- en muggenadvies opnieuw als je route verandert.',
    ],
  },
  {
    icon: Route,
    number: '03',
    title: 'Hoe reis je?',
    lead: 'Duur, seizoen, accommodatie en activiteiten bepalen mede welk advies relevant wordt.',
    points: [
      'Benoem langere verblijven en veel buitenovernachtingen.',
      'Noem dierencontact, vrijwilligerswerk en afgelegen trekkings.',
      'Bespreek zwangerschap, leeftijd, medicatie of afweerproblemen.',
    ],
  },
  {
    icon: Stethoscope,
    number: '04',
    title: 'Laat het persoonlijk beoordelen',
    lead: 'De GGD koppelt je route en gezondheid aan de actuele landelijke adviezen.',
    points: [
      'Plan bij voorkeur zodra je reis vaststaat.',
      'Vraag ook bij een lastminutereis nog om advies.',
      'Bewaar het noodnummer van je verzekeraar en je medische gegevens offline.',
    ],
  },
];

const vaccineGroups = [
  {
    label: 'Vaak de basis',
    title: 'DTP en hepatitis A',
    text: 'De GGD noemt DTP en hepatitis A als aanbevolen vaccinaties voor Thailand. Of jij een prik of herhaling nodig hebt, hangt onder meer af van je eerdere vaccinaties en gezondheid.',
    accent: true,
  },
  {
    label: 'Persoonsgebonden',
    title: 'Je gezondheid telt mee',
    text: 'Leeftijd, zwangerschap, afweer, medicijngebruik, eerdere vaccinaties en mogelijke reacties kunnen het advies veranderen. Deel die informatie tijdens het consult.',
  },
  {
    label: 'Routegebonden',
    title: 'Niet iedere reis is gelijk',
    text: 'Bij een lange of landelijke reis, veel dierencontact of verblijf in specifieke gebieden kunnen onder andere hepatitis B, rabiës of Japanse encefalitis worden besproken.',
  },
  {
    label: 'Inreisregel',
    title: 'Gele koorts is een routevraag',
    text: 'Voor een rechtstreekse reis vanuit Nederland geldt geen algemene gelekoortsplicht. Een eis kan wel ontstaan door recent verblijf of transit in een risicoland; controleer daarom je volledige route.',
  },
];

const timeline = [
  {
    label: 'Na het boeken',
    title: 'Zet je route op één pagina',
    text: 'Noteer landen, regio’s, reisduur, activiteiten en medische bijzonderheden. De GGD adviseert bij voorkeur al een afspraak te maken zodra je reis vaststaat.',
  },
  {
    label: 'Liefst 6–8 weken vooraf',
    title: 'Plan het reisconsult',
    text: 'Het Instituut voor Tropische Geneeskunde adviseert deze marge. Sommige trajecten vragen tijd, maar ook later vertrekken is geen reden om niets meer te vragen.',
  },
  {
    label: 'Na je consult',
    title: 'Volg je persoonlijke plan',
    text: 'Houd afspraken, eventuele vervolgacties en bijsluiterinstructies bij. Gebruik geen schema uit een blog als vervanging voor het professionele advies.',
  },
  {
    label: 'Vlak voor vertrek',
    title: 'Controleer route en documenten',
    text: 'Is er een extra land, lange transit of andere regio bijgekomen? Laat dan controleren of je eerdere plan nog aansluit.',
  },
];

const mosquitoQuestions = [
  {
    question: 'Waar slaap je en hoe lang blijf je?',
    answer: 'Het actuele malariarisico verschilt per gebied, seizoen en reisvorm. Gebruik daarom de landenkaart van je reisadviesorganisatie en laat je route beoordelen.',
  },
  {
    question: 'Ben je ook overdag beschermd?',
    answer: 'De mug die dengue overdraagt kan overdag steken. Bedekkende kleding, een geschikt insectenwerend middel en een klamboe of hor waar nodig blijven dus ook buiten de avond relevant.',
  },
  {
    question: 'Verandert je route onderweg?',
    answer: 'Een spontane grensregio, trekking of landelijke overnachting kan je risicoprofiel veranderen. Controleer dan opnieuw het actuele advies in plaats van uit te gaan van je oorspronkelijke stadsroute.',
  },
];

const biteSteps = [
  {
    title: 'Was direct 15 minuten',
    text: 'Spoel en was de beet, krab of lik op beschadigde huid minstens 15 minuten met zeep en stromend water.',
  },
  {
    title: 'Ontsmet de wond',
    text: 'Gebruik volgens het RIVM jodium of alcohol van 70% wanneer dat beschikbaar is.',
  },
  {
    title: 'Zoek snel medische hulp',
    text: 'Neem zo snel mogelijk—bij voorkeur binnen 24 uur—contact op met een arts en de alarmcentrale van je reisverzekeraar.',
  },
  {
    title: 'Ook na een eerdere vaccinatie',
    text: 'Een preventieve rabiësvaccinatie neemt de noodzaak van behandeling na mogelijke blootstelling niet weg.',
  },
];

const packItems = [
  'Je vaccinatiebewijs of digitaal overzicht',
  'Voldoende eigen medicatie plus medicijnverklaring indien nodig',
  'ORS, eenvoudige wondverzorging en een thermometer',
  'Een insectenwerend middel dat past bij het officiële advies',
  'Lichte bedekkende kleding en zonbescherming',
  'Polisnummer, alarmcentrale en medische noodinformatie offline',
];

const faqItems = [
  {
    question: 'Welke vaccinaties zijn nodig in Thailand?',
    answer: 'De GGD noemt DTP en hepatitis A als aanbevolen basis voor Thailand. Wat jij daarnaast nodig hebt, hangt af van je vaccinatiegeschiedenis, route, reisduur, activiteiten en gezondheid. Laat daarom je volledige reisplan persoonlijk beoordelen; een algemene lijst is geen individueel vaccinatieadvies.',
  },
  {
    question: 'Welke vaccinaties zijn verplicht voor Thailand?',
    answer: 'Bij een rechtstreekse reis vanuit Nederland zijn er volgens de GGD geen algemeen verplichte vaccinaties. Voor gele koorts kan een bewijs wel relevant worden als je kort voor aankomst in een land met gelekoortsrisico bent geweest of daar een bepaalde transit had. Controleer je volledige route bij een officiële reisvaccinatieorganisatie.',
  },
  {
    question: 'Kan ik naar Thailand reizen zonder vaccinatie?',
    answer: 'De afwezigheid van een algemene inreisverplichting is niet hetzelfde als de afwezigheid van gezondheidsrisico. DTP en hepatitis A worden doorgaans aanbevolen. Bespreek je route en persoonlijke situatie met de GGD of een andere erkende reisvaccinatieprofessional.',
  },
  {
    question: 'Hoe lang van tevoren vaccinaties voor Thailand?',
    answer: 'Maak je afspraak liefst zodra je reis vaststaat. Het Instituut voor Tropische Geneeskunde noemt 6–8 weken voor vertrek als goede marge. Vertrek je sneller, neem dan alsnog contact op: wat nog zinvol of haalbaar is, moet persoonlijk worden beoordeeld.',
  },
  {
    question: 'Hoeveel kosten vaccinaties voor Thailand?',
    answer: 'De totaalprijs hangt af van het consult, je bestaande vaccinaties, de gekozen aanbieder en wat je zorgverzekering vergoedt. Vraag vóór de afspraak naar consult- en vaccinkosten en controleer je aanvullende verzekering. We tonen bewust geen vast totaalbedrag, omdat tarieven en vergoeding veranderen.',
  },
  {
    question: 'Heb ik malariapillen nodig als ik naar Thailand ga?',
    answer: 'Dat hangt af van je route, reisperiode, verblijfsduur en persoonlijke situatie. Het risico is niet overal in Thailand gelijk en advieszones kunnen wijzigen. Laat je exacte overnachtingsplaatsen beoordelen en volg de actuele malariakaart van je reisvaccinatieorganisatie.',
  },
  {
    question: 'Hoe groot is de kans op dengue in Thailand?',
    answer: 'Een betrouwbaar persoonlijk percentage is zonder plaats, seizoen en actuele uitbraken niet te geven. Dengue komt in Thailand voor en wordt overgedragen door muggen die ook overdag steken. Voorkom beten en bespreek vaccinatie alleen met een arts of reisvaccinatieprofessional.',
  },
  {
    question: 'Is dengue vaccinatie nodig?',
    answer: 'Niet automatisch voor iedere reiziger. Het RIVM adviseert om een eventuele denguevaccinatie met een huisarts of deskundige reizigersvaccinatieorganisatie te bespreken. Je medische voorgeschiedenis, eerdere dengue-infectie en reisprofiel zijn daarbij relevant.',
  },
  {
    question: 'Wat is de kans op rabiës in Thailand?',
    answer: 'Rabiës komt in Thailand voor, maar een persoonlijk risico is niet in één algemeen percentage te vangen. Vermijd contact met honden, katten, apen en vleermuizen. Bespreek preventieve vaccinatie bij langer verblijf, afgelegen reizen of verwacht dierencontact.',
  },
  {
    question: 'Hoe snel krijg je een rabiësvaccin na een beet?',
    answer: 'Wacht niet af. Was de wond 15 minuten met zeep en stromend water, ontsmet haar en zoek zo snel mogelijk medische hulp—het RIVM noemt bij voorkeur binnen 24 uur. Ook wie vooraf gevaccineerd is, moet na mogelijke blootstelling medisch worden beoordeeld.',
  },
];

const sources = [
  {
    title: 'Vaccinaties Thailand',
    creator: 'GGD Reisvaccinaties',
    url: 'https://www.ggdreisvaccinaties.nl/land/thailand',
    note: 'Landadvies, aanbevolen vaccinaties, afspraakmoment en route-afhankelijk malaria-advies.',
  },
  {
    title: 'Thailand — gezondheidsadvies',
    creator: 'Wanda / Instituut voor Tropische Geneeskunde',
    url: 'https://www.wanda.be/nl/landen/thailand',
    note: 'Aanvullende controle voor voorbereidingstijd, gele koorts en geografisch wisselend malariarisico.',
  },
  {
    title: 'Dengue',
    creator: 'RIVM',
    url: 'https://www.rivm.nl/dengue',
    note: 'Overdracht, muggenpreventie, alarmsignalen en de noodzaak van medisch advies over vaccinatie.',
  },
  {
    title: 'Rabiës',
    creator: 'RIVM',
    url: 'https://www.rivm.nl/rabies',
    note: 'Preventie en directe stappen na een beet, krab of lik op beschadigde huid.',
  },
  {
    title: 'Reisadvies Thailand',
    creator: 'NederlandWereldwijd',
    url: 'https://www.nederlandwereldwijd.nl/reisadvies/thailand',
    note: 'Actuele reiscontext en officiële lokale noodnummers. Controleer dit advies opnieuw vlak voor vertrek.',
  },
];

function jsonLd() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      image: [`https://go2-thailand.com${HERO_IMAGE}`],
      mainEntityOfPage: PAGE_URL,
      inLanguage: 'nl-NL',
      dateModified: '2026-07-26',
      author: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
      publisher: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/nl/' },
        { '@type': 'ListItem', position: 2, name: 'Praktische informatie', item: 'https://go2-thailand.com/nl/practical-info/' },
        { '@type': 'ListItem', position: 3, name: 'Vaccinaties Thailand', item: PAGE_URL },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'Zo bereid je een persoonlijk vaccinatieadvies voor Thailand voor',
      description: 'Een praktische voorbereiding voor je afspraak bij een erkende reisvaccinatieprofessional.',
      step: adviceLanes.map((item, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: item.title,
        text: `${item.lead} ${item.points.join(' ')}`,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Onderwerpen voor je Thailand-vaccinatieconsult',
      itemListElement: vaccineGroups.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.title,
        description: item.text,
      })),
    },
  ];
}

export default function ThailandVaccinationsGuide() {
  return (
    <>
      <SEOHead title={PAGE_TITLE} description={PAGE_DESCRIPTION} ogImage={HERO_IMAGE}>
        {jsonLd().map((schema, index) => (
          <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}
      </SEOHead>

      <div className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          image={HERO_IMAGE}
          imageAlt="Reizigers bespreken hun Thailand-route tijdens een reisgezondheidsconsult"
          breadcrumbs={[
            { label: 'Thailand', href: '/' },
            { label: 'Praktische info', href: '/practical-info/' },
            { label: 'Vaccinaties' },
          ]}
          eyebrow="Gezond voorbereid op reis"
          title={<>Vaccinaties Thailand.<br />Eerst je route,<br />dan je prikplan.</>}
          description={<>DTP en hepatitis A vormen vaak de basis, maar je route, reisduur en gezondheid bepalen het echte advies. Bouw hier je vragenlijst en laat die persoonlijk controleren.</>}
          actions={[
            { label: 'Bouw je gezondheidscheck', href: '#prikplan', kind: 'primary' },
            { label: 'Open het GGD-landadvies', href: 'https://www.ggdreisvaccinaties.nl/land/thailand', kind: 'secondary', newTab: true, icon: <ExternalLink size={15} /> },
          ]}
          sideCard={
            <div className="absolute bottom-8 right-[4vw] z-10 hidden w-[260px] rounded-2xl border border-white/65 bg-white/82 p-5 shadow-editorial-lift backdrop-blur-md xl:block">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">Geen online prikrecept</p>
              <p className="mt-2 font-display text-[1.55rem] font-semibold leading-none text-jade">Vier gegevens sturen je advies</p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-[10px] font-bold text-charcoal/66">
                <span className="rounded-lg bg-mist px-3 py-2">Route</span>
                <span className="rounded-lg bg-mist px-3 py-2">Reisduur</span>
                <span className="rounded-lg bg-mist px-3 py-2">Activiteiten</span>
                <span className="rounded-lg bg-mist px-3 py-2">Gezondheid</span>
              </div>
            </div>
          }
          minHeightClassName="min-h-[760px] lg:min-h-[690px]"
          imageClassName="object-cover object-[72%_center] lg:object-center"
          titleClassName="max-w-[690px] text-[3.65rem] leading-[0.87] sm:text-[4.9rem] lg:text-[5.65rem]"
        />

        <PageSectionNav items={sectionNav} />

        <section id="kort-antwoord" className="section-divider-bottom scroll-mt-24 bg-tonal py-12 lg:py-16">
          <div className="container-custom grid gap-9 lg:grid-cols-[0.68fr_1.32fr] lg:items-center">
            <div>
              <p className="eyebrow">Het korte antwoord</p>
              <h2 className="font-display text-[3rem] font-semibold leading-[0.9] tracking-[-0.04em] text-jade">Aanbevolen is niet hetzelfde als verplicht.</h2>
            </div>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-jade/10 bg-jade/10 sm:grid-cols-3">
              <div className="bg-white p-6">
                <FileCheck2 size={24} strokeWidth={1.35} className="text-saffron-dark" />
                <p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">Inreisregel</p>
                <h3 className="mt-2 font-display text-[1.55rem] font-semibold leading-none text-jade">Geen algemene prikplicht</h3>
                <p className="mt-3 text-xs font-medium leading-5 text-charcoal/64">Bij een rechtstreekse reis vanuit Nederland. Je eerdere landen en transits kunnen wel tellen.</p>
              </div>
              <div className="bg-white p-6">
                <ShieldCheck size={24} strokeWidth={1.35} className="text-jade" />
                <p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">Gezondheidsadvies</p>
                <h3 className="mt-2 font-display text-[1.55rem] font-semibold leading-none text-jade">DTP + hepatitis A</h3>
                <p className="mt-3 text-xs font-medium leading-5 text-charcoal/64">Dit zijn de vaccinaties die de GGD voor Thailand als aanbevolen basis noemt.</p>
              </div>
              <div className="bg-white p-6">
                <MapPinned size={24} strokeWidth={1.35} className="text-jade" />
                <p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">Persoonlijk plan</p>
                <h3 className="mt-2 font-display text-[1.55rem] font-semibold leading-none text-jade">Je route maakt verschil</h3>
                <p className="mt-3 text-xs font-medium leading-5 text-charcoal/64">Grensgebied, dierencontact, lang verblijf en gezondheid kunnen extra advies opleveren.</p>
              </div>
            </div>
          </div>
          <div className="container-custom mt-8">
            <div className="flex gap-3 rounded-xl border border-saffron/20 bg-saffron/[0.07] p-4 text-xs font-medium leading-6 text-charcoal/70">
              <AlertTriangle size={18} className="mt-0.5 shrink-0 text-saffron-dark" />
              <p><strong className="text-jade">Medische grens:</strong> deze pagina helpt je een consult voorbereiden en vervangt geen persoonlijk medisch advies, diagnose, vaccinatieschema of actuele malariakaart.</p>
            </div>
          </div>
        </section>

        <section id="prikplan" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <SectionHeading eyebrow="Vier beslissingen" title="Bouw je prikplan vanaf je echte reis" description="Het sterkste consult begint met context. Loop deze vier banen langs en neem de uitkomst mee naar je afspraak." />
              <p className="max-w-2xl text-sm font-medium leading-7 text-charcoal/65 lg:justify-self-end">Zoekmachines tonen graag één antwoord op “welke vaccinaties Thailand?”. In werkelijkheid volgt een bruikbaar advies uit je dossier, route, reisstijl en gezondheid samen.</p>
            </div>

            <div className="relative mt-10 grid gap-5 lg:grid-cols-4">
              <div aria-hidden="true" className="absolute left-[8%] right-[8%] top-12 hidden border-t-2 border-dashed border-saffron/50 lg:block" />
              {adviceLanes.map(({ icon: Icon, number, title, lead, points }) => (
                <article key={number} className="relative flex flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-full border border-saffron/35 bg-canvas text-saffron-dark"><Icon size={22} strokeWidth={1.4} /></span>
                    <span className="font-display text-[2.4rem] font-semibold text-jade/10">{number}</span>
                  </div>
                  <h3 className="mt-6 font-display text-[1.85rem] font-semibold leading-[0.98] text-jade">{title}</h3>
                  <p className="mt-3 text-xs font-semibold leading-5 text-charcoal/68">{lead}</p>
                  <ul className="mt-5 space-y-3 border-t border-jade/10 pt-5">
                    {points.map((point) => <li key={point} className="flex gap-2 text-[11px] font-medium leading-5 text-charcoal/62"><Check size={13} className="mt-0.5 shrink-0 text-saffron-dark" />{point}</li>)}
                  </ul>
                </article>
              ))}
            </div>

            <div className="mt-14 grid gap-10 lg:grid-cols-[0.65fr_1.35fr]">
              <div>
                <p className="eyebrow">Vaccinatiekompas</p>
                <h2 className="font-display text-[3rem] font-semibold leading-[0.9] tracking-[-0.04em] text-jade">Vier vakken.<br />Geen universele checklist.</h2>
                <p className="mt-5 max-w-md text-sm font-medium leading-7 text-charcoal/65">De vakken helpen je betere vragen stellen. Alleen een bevoegde zorgprofessional kan bepalen wat voor jou wordt aanbevolen en wanneer.</p>
              </div>
              <div className="grid gap-px overflow-hidden rounded-2xl border border-jade/10 bg-jade/10 sm:grid-cols-2">
                {vaccineGroups.map((group) => (
                  <article key={group.title} className={`${group.accent ? 'bg-jade text-white' : 'bg-white text-charcoal'} p-7`}>
                    <p className={`text-[9px] font-extrabold uppercase tracking-[0.14em] ${group.accent ? 'text-saffron-light' : 'text-saffron-dark'}`}>{group.label}</p>
                    <h3 className={`mt-2 font-display text-[1.8rem] font-semibold leading-none ${group.accent ? 'text-white' : 'text-jade'}`}>{group.title}</h3>
                    <p className={`mt-4 text-xs font-medium leading-6 ${group.accent ? 'text-white/68' : 'text-charcoal/64'}`}>{group.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom bg-tonal py-14 lg:py-20">
          <div className="container-custom">
            <SectionHeading eyebrow="Wanneer beginnen?" title="Van boeking naar vertrek" description="Vroeg beginnen geeft ruimte, maar een korte voorbereiding is geen reden om een consult over te slaan." />
            <ol className="mt-10 grid gap-0 border-l border-jade/15 lg:grid-cols-4 lg:border-l-0 lg:border-t">
              {timeline.map((item, index) => (
                <li key={item.title} className="relative pl-8 pb-9 lg:pb-0 lg:pl-0 lg:pr-7 lg:pt-9">
                  <span className="absolute -left-[7px] top-1 h-3.5 w-3.5 rounded-full border-[3px] border-canvas bg-saffron lg:-top-[7px] lg:left-0" />
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">{index + 1}. {item.label}</p>
                  <h3 className="mt-2 font-display text-[1.65rem] font-semibold leading-none text-jade">{item.title}</h3>
                  <p className="mt-3 text-xs font-medium leading-6 text-charcoal/62">{item.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="relative mx-auto min-h-[360px] max-w-[1500px] overflow-hidden rounded-[26px] bg-jade text-white shadow-editorial-lift">
            <Image src="/images/redesign/thailand-vaccinations-trail.webp" alt="Goed voorbereide reizigers op een groene route in Thailand" fill sizes="(max-width: 1500px) 100vw, 1500px" className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-jade via-jade/78 to-transparent" />
            <div className="relative z-10 flex min-h-[360px] max-w-xl flex-col justify-center p-8 sm:p-12 lg:p-16">
              <p className="eyebrow !text-saffron-light">Route gewijzigd?</p>
              <h2 className="font-display text-[3.2rem] font-semibold leading-[0.88] tracking-[-0.04em]">Laat je gezondheidsplan meebewegen.</h2>
              <p className="mt-5 max-w-md text-sm font-medium leading-7 text-white/72">Een extra grensovergang, trekking of lange landelijke stop kan relevant zijn. Controleer je advies opnieuw zodra je route wezenlijk verandert.</p>
              <a href="https://www.ggdreisvaccinaties.nl/land/thailand" target="_blank" rel="noopener noreferrer" className="btn-cream mt-7 w-fit text-saffron-dark">Controleer het actuele landadvies <ExternalLink size={15} /></a>
            </div>
          </div>
        </section>

        <section id="muggen" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom grid gap-12 lg:grid-cols-[0.74fr_1.26fr]">
            <div>
              <SectionHeading eyebrow="Malaria & dengue" title="Eén muggenplan, twee verschillende vragen" description="Malaria-advies is sterk routegebonden. Denguepreventie blijft ook overdag relevant. Controleer beide onderwerpen afzonderlijk." />
              <div className="mt-8 rounded-2xl bg-jade p-7 text-white">
                <HeartPulse size={24} className="text-saffron-light" />
                <h3 className="mt-5 font-display text-[2rem] font-semibold leading-none">Koorts tijdens of na je reis?</h3>
                <p className="mt-4 text-xs font-medium leading-6 text-white/70">Laat je medisch beoordelen en vertel waar en wanneer je in Thailand was. Diagnoseer malaria of dengue niet zelf via een symptomenlijst.</p>
                <a href="https://www.nederlandwereldwijd.nl/reisadvies/thailand" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-saffron-light">Actueel reisadvies en noodhulp <ExternalLink size={13} /></a>
              </div>
            </div>
            <div>
              <div className="grid gap-px overflow-hidden rounded-2xl border border-jade/10 bg-jade/10 sm:grid-cols-2">
                <article className="bg-white p-7">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">Malaria</p>
                  <h3 className="mt-2 font-display text-[2rem] font-semibold leading-none text-jade">De kaart, route en persoon bepalen het advies</h3>
                  <p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">Risico verschilt binnen Thailand. Gebruik geen oude lijst met “veilige eilanden” of vaste pillenzones als eindantwoord; laat alle overnachtingsplaatsen beoordelen.</p>
                </article>
                <article className="bg-mist p-7">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">Dengue</p>
                  <h3 className="mt-2 font-display text-[2rem] font-semibold leading-none text-jade">Bescherm je ook overdag tegen beten</h3>
                  <p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">De Aedes-mug kan overdag steken. Draag bedekkende kleding en volg officieel advies over een geschikt insectenwerend middel en eventuele vaccinatie.</p>
                </article>
              </div>
              <div className="mt-5 divide-y divide-jade/10 border-y border-jade/10">
                {mosquitoQuestions.map((item, index) => (
                  <div key={item.question} className="grid gap-2 py-5 sm:grid-cols-[42px_0.72fr_1.28fr] sm:items-start">
                    <span className="font-display text-[1.6rem] font-semibold text-saffron-dark">0{index + 1}</span>
                    <h3 className="text-sm font-extrabold text-jade">{item.question}</h3>
                    <p className="text-xs font-medium leading-6 text-charcoal/64">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="rabies" className="section-divider-bottom scroll-mt-24 bg-[#0a332d] py-14 text-white lg:py-20">
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[0.74fr_1.26fr] lg:items-end">
              <div>
                <p className="eyebrow !text-saffron-light">Na een beet of krab</p>
                <h2 className="font-display text-[3.4rem] font-semibold leading-[0.88] tracking-[-0.04em]">Niet afwachten.<br />Wel vier stappen.</h2>
              </div>
              <p className="max-w-2xl text-sm font-medium leading-7 text-white/66 lg:justify-self-end">Apen, honden, katten en vleermuizen zijn geen fotoprops. Houd afstand en behandel iedere mogelijke blootstelling serieus—ook als je vóór vertrek tegen rabiës bent gevaccineerd.</p>
            </div>
            <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-white/12 lg:grid-cols-4">
              {biteSteps.map((step, index) => (
                <li key={step.title} className="bg-white/[0.055] p-7">
                  <div className="flex items-center justify-between"><PawPrint size={22} className="text-saffron-light" /><span className="font-display text-[2rem] font-semibold text-white/15">0{index + 1}</span></div>
                  <h3 className="mt-7 font-display text-[1.7rem] font-semibold leading-none">{step.title}</h3>
                  <p className="mt-4 text-xs font-medium leading-6 text-white/64">{step.text}</p>
                </li>
              ))}
            </ol>
            <div className="mt-7 flex flex-col gap-3 rounded-xl border border-saffron/25 bg-saffron/[0.08] p-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs font-semibold leading-6 text-white/76"><strong className="text-saffron-light">In Thailand:</strong> medische ambulance 1669; in Bangkok ook 1646. Bel bij twijfel daarnaast de alarmcentrale van je verzekeraar.</p>
              <a href="https://www.rivm.nl/rabies" target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 text-xs font-extrabold text-saffron-light">RIVM-rabiësadvies <ExternalLink size={13} /></a>
            </div>
          </div>
        </section>

        <section id="reisapotheek" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
            <div className="relative min-h-[470px] overflow-hidden rounded-[24px] shadow-editorial-lift">
              <Image src="/images/redesign/thailand-vaccinations-kit.webp" alt="Reisapotheek en lichte beschermende kleding voor Thailand" fill sizes="(max-width: 1024px) 100vw, 44vw" className="object-cover" />
              <div className="absolute inset-x-5 bottom-5 rounded-xl border border-white/45 bg-white/82 p-4 backdrop-blur-md">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">Slim inpakken</p>
                <p className="mt-1 text-xs font-semibold leading-5 text-jade">Stem medicijnen en middelen af met arts, apotheek en officiële productinstructies.</p>
              </div>
            </div>
            <div>
              <SectionHeading eyebrow="Reisapotheek" title="Wat neem je mee zonder halve apotheek?" description="Pak voor concrete reissituaties. Noteer persoonlijke medicatie apart en laat twijfelgevallen vóór vertrek controleren." />
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {packItems.map((item) => <li key={item} className="flex gap-3 border-b border-jade/10 pb-3 text-xs font-semibold leading-5 text-charcoal/68"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-jade text-white"><Check size={12} /></span>{item}</li>)}
              </ul>
              <div className="mt-8 rounded-2xl bg-jade p-7 text-white">
                <div className="flex items-start justify-between gap-4"><div><p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-light">Functionele reisgear</p><h3 className="mt-2 font-display text-[2rem] font-semibold leading-none">Twee producten, geen medische belofte</h3></div><Sparkles size={22} className="shrink-0 text-saffron-light" /></div>
                <p className="mt-4 text-xs font-medium leading-6 text-white/65">Deze items helpen met bedekking en schaduw. Ze voorkomen of behandelen geen ziekte. Controleer maat, materiaal, productinstructies en lokale beschikbaarheid zelf.</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <a href="/go/hovsiyla-quick-dry-shirt/" target="_blank" rel="noopener noreferrer nofollow sponsored" className="group flex min-h-20 items-center justify-between gap-3 rounded-xl border border-white/14 bg-white/[0.065] px-4 py-3 text-xs font-extrabold transition hover:border-saffron/45 hover:bg-white/[0.1]">Bekijk een sneldrogend shirt <ExternalLink size={14} className="shrink-0 text-saffron-light" /></a>
                  <a href="/go/sun-cube-wide-brim-hat/" target="_blank" rel="noopener noreferrer nofollow sponsored" className="group flex min-h-20 items-center justify-between gap-3 rounded-xl border border-white/14 bg-white/[0.065] px-4 py-3 text-xs font-extrabold transition hover:border-saffron/45 hover:bg-white/[0.1]">Bekijk een brede zonnehoed <ExternalLink size={14} className="shrink-0 text-saffron-light" /></a>
                </div>
                <AffiliateDisclosure className="mt-4 !text-white/54">Amazon-affiliatelinks via onze centrale <strong className="text-white/72">/go/</strong>-router. Als Amazon-partner verdienen wij aan in aanmerking komende aankopen, zonder extra kosten voor jou. OneLink kan je naar een lokale Amazon-winkel sturen; product, prijs, verkoper en beschikbaarheid verschillen per land.</AffiliateDisclosure>
              </div>
            </div>
          </div>
        </section>

        <section id="kosten" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <SectionHeading eyebrow="Kosten & dekking" title="Vraag om de rekensom vóór je afspraak" description="Consulttarieven, vaccinkosten en vergoedingen veranderen. Daarom is een vaste totaalprijs op een reisblog zelden bruikbaar." />
            <div className="grid gap-px overflow-hidden rounded-2xl border border-jade/10 bg-jade/10 sm:grid-cols-2">
              <article className="bg-white p-7">
                <WalletCards size={25} strokeWidth={1.35} className="text-jade" />
                <h3 className="mt-5 font-display text-[2rem] font-semibold leading-none text-jade">Controleer drie bedragen</h3>
                <ol className="mt-5 space-y-3 text-xs font-medium leading-6 text-charcoal/66">
                  <li><strong className="text-jade">1. Consult:</strong> eerste afspraak en eventuele vervolgafspraak.</li>
                  <li><strong className="text-jade">2. Vaccins:</strong> alleen wat na beoordeling voor jou wordt geadviseerd.</li>
                  <li><strong className="text-jade">3. Vergoeding:</strong> vraag je verzekeraar wat je aanvullende pakket werkelijk dekt.</li>
                </ol>
              </article>
              <article className="bg-jade p-7 text-white">
                <ShieldCheck size={25} strokeWidth={1.35} className="text-saffron-light" />
                <h3 className="mt-5 font-display text-[2rem] font-semibold leading-none">Lees je reisverzekering als een routekaart</h3>
                <p className="mt-5 text-xs font-medium leading-6 text-white/67">Controleer medische kosten, bestaande aandoeningen, repatriëring, activiteiten, scootergebruik, eigen risico en de procedure voor hulp. Een polisnaam alleen zegt te weinig.</p>
                <Link href="/travel-insurance/" className="btn-cream mt-6 w-fit text-saffron-dark">Open de reisverzekeringsgids <ArrowRight size={14} /></Link>
              </article>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-14 lg:py-20">
          <div className="container-custom grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[24px] border border-jade/10 bg-white p-8 shadow-editorial-card sm:p-10">
              <p className="eyebrow">Hulp ter plaatse</p>
              <h2 className="font-display text-[3rem] font-semibold leading-[0.9] tracking-[-0.04em] text-jade">Leg je noodroute klaar vóór je haar nodig hebt.</h2>
              <div className="mt-8 grid gap-5 sm:grid-cols-3">
                <div><PhoneCall size={21} className="text-saffron-dark" /><p className="mt-3 text-[9px] font-extrabold uppercase tracking-[0.14em] text-charcoal/46">Medische ambulance</p><p className="mt-1 font-display text-[2rem] font-semibold text-jade">1669</p></div>
                <div><Hospital size={21} className="text-saffron-dark" /><p className="mt-3 text-[9px] font-extrabold uppercase tracking-[0.14em] text-charcoal/46">Bangkok medisch</p><p className="mt-1 font-display text-[2rem] font-semibold text-jade">1646</p></div>
                <div><ShieldCheck size={21} className="text-saffron-dark" /><p className="mt-3 text-[9px] font-extrabold uppercase tracking-[0.14em] text-charcoal/46">Tourist Police</p><p className="mt-1 font-display text-[2rem] font-semibold text-jade">1155</p></div>
              </div>
              <p className="mt-7 border-t border-jade/10 pt-5 text-xs font-medium leading-6 text-charcoal/60">Sla ook het polisnummer en de alarmcentrale van je verzekeraar offline op. Nummers en omstandigheden kunnen veranderen; verifieer ze vlak voor vertrek via NederlandWereldwijd.</p>
            </div>
            <aside className="flex flex-col justify-between rounded-[24px] bg-saffron p-8 text-jade sm:p-10">
              <div><CalendarClock size={26} /><p className="eyebrow mt-7 !text-jade/65">Laatste controle</p><h2 className="font-display text-[2.7rem] font-semibold leading-[0.9]">Drie minuten voor vertrek.</h2><p className="mt-5 text-sm font-medium leading-7 text-jade/72">Landadvies, route, medicatie, documenten en noodnummers: één korte check voorkomt dat oude informatie met je meereist.</p></div>
              <a href="https://www.nederlandwereldwijd.nl/reisadvies/thailand" target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 text-xs font-extrabold">Open officieel reisadvies <ExternalLink size={14} /></a>
            </aside>
          </div>
        </section>

        <FaqSplitSection id="vragen" eyebrow="Echte zoekvragen" title="Veelgestelde vragen over vaccinaties voor Thailand" description="Deze vragen zijn letterlijk uit de Nederlandse zoekresultaten opgehaald. De antwoorden zijn gecontroleerd tegen officiële gezondheidsbronnen." items={faqItems} />

        <RelatedGuidesSection
          eyebrow="Gezond verder plannen"
          title="Van voorbereiding naar een veilige reisroute"
          guides={[
            { title: 'Zorg en ziekenhuizen', description: 'Een aparte gids voor medische hulp, ziekenhuizen en zorg tijdens je reis.', href: '/travel-guides/health-hospitals-thailand/', image: '/images/redesign/thailand-vaccinations-hero.webp' },
            { title: 'Reisverzekering Thailand', description: 'Vergelijk dekking op medische kosten, activiteiten, repatriëring en uitsluitingen.', href: '/travel-insurance/', image: '/images/blog/travel-insurance-thailand-guide.webp' },
            { title: 'Thailand paklijst', description: 'Bouw je bagage per reistaak en neem alleen mee wat je werkelijk gebruikt.', href: '/travel-gear/', image: '/images/redesign/travel-gear-hero.webp' },
          ]}
          sideLink={{ label: 'Alle praktische informatie', href: '/practical-info/' }}
        />

        <SourceMethodSection
          title="Actuele bronnen, persoonlijke grens"
          description="Laatst inhoudelijk gecontroleerd op 26 juli 2026. We combineerden Nederlandse zoekdata en echte PAA-vragen met officiële gezondheidsbronnen. Omdat risicozones, toegangseisen en medische adviezen wijzigen, verwijzen we voor de beslissing altijd door naar een erkende reisvaccinatieprofessional."
          sources={sources}
        />
      </div>
    </>
  );
}
