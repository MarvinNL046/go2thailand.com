import Image from 'next/image';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  Award,
  BookOpenText,
  CalendarDays,
  Check,
  Compass,
  Eye,
  HeartPulse,
  Languages,
  Plane,
  ShieldCheck,
  Ship,
  Users,
  Waves,
} from 'lucide-react';
import type { DiveGuideData, DiveGuideIcon } from '../../data/diving/types';
import { KLOOK_GENERIC, withPlacementSubId } from '../../lib/affiliates';
import { normalizeEnInternalHref } from '../../lib/en-route-owners';
import { normalizeNlInternalHref } from '../../lib/nl-route-owners';
import FeedbackForm from '../FeedbackForm';
import SEOHead from '../SEOHead';
import { EditorialHero, type EditorialHeroAction } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav, type PageSectionNavItem } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SourceMethodSection } from '../design/SourceMethodSection';

interface DiveGuideTemplateProps {
  data: DiveGuideData;
}

const iconMap: Record<DiveGuideIcon, LucideIcon> = {
  badge: Award,
  book: BookOpenText,
  calendar: CalendarDays,
  compass: Compass,
  eye: Eye,
  heart: HeartPulse,
  language: Languages,
  plane: Plane,
  shield: ShieldCheck,
  ship: Ship,
  users: Users,
  waves: Waves,
};

const localeCopy = {
  nl: {
    nav: ['Cursus kiezen', 'Schoolcheck', 'Cursusverloop', 'Duikprofielen', 'Vliegbuffer'],
    breadcrumb: 'Duiken',
    primaryAction: 'Kies je cursus',
    secondaryAction: 'Bekijk wateruitjes',
    disclosure: 'De wateruitjesknop is een affiliatelink. Bij een boeking ontvangen wij mogelijk een commissie; jij betaalt niets extra.',
    itemList: (destination: string) => `Duikmogelijkheden op ${destination}`,
    activitiesLink: 'Bekijk ook de complete activiteitenroute',
    choicesEyebrow: 'Vier verschillende uitkomsten',
    choicesTitle: 'Welke duikroute past bij jou?',
    choicesIntro: 'Begin bij wat je na afloop wilt kunnen. Een proefduik, brevetcursus, fun dive en vervolgopleiding zijn geen varianten van hetzelfde product.',
    time: 'Tijd',
    outcome: 'Uitkomst',
    bestFor: 'Past bij:',
    klookEyebrow: 'Activiteiten via Klook',
    klookTitle: 'Vergelijk wateruitjes pas nadat cursusvorm en veiligheidsvragen helder zijn.',
    klookAction: 'Bekijk wateruitjes',
    affiliateNote: 'Affiliatelink — wij kunnen commissie ontvangen zonder dat jouw prijs verandert.',
    ask: 'Vraag:',
    padiRegister: 'Controleer PADI-centra in het officiële register',
    agenciesEyebrow: 'PADI, SSI of iets anders?',
    agenciesTitle: 'Het logo is maar één onderdeel van de keuze',
    agenciesIntro: 'Een erkend opleidingssysteem geeft structuur. De dagelijkse kwaliteit ontstaat nog steeds bij het concrete centrum, de instructeur en de tijd die je krijgt om vaardigheden te beheersen.',
    profilesEyebrow: 'Niet elke site is voor elke dag',
    profilesTitle: (destination: string) => `Vier duikprofielen rond ${destination}`,
    profilesIntro: 'De voorbeelden helpen een gesprek met de operator voeren. De uiteindelijke sitekeuze hoort altijd bij brevet, recente ervaring, weer, stroming en operationele planning.',
    medicalBoundary: 'Medische grens:',
    bookingEyebrow: 'Voor je reserveert',
    bookingTitle: 'Vier checks die in je bevestiging horen',
    faqEyebrow: 'Echte vragen uit de zoekresultaten',
    faqTitle: (destination: string) => `Veelgestelde vragen over duiken op ${destination}`,
    faqDescription: 'De vragen komen uit de Nederlandse People Also Ask-resultaten van DataForSEO. Medische en opleidingsantwoorden verwijzen bewust naar primaire organisaties; persoonlijke geschiktheid hoort bij arts en duikprofessional.',
    relatedTitle: (destination: string) => `Bouw je ${destination}-reis rond je duikplan`,
    relatedSide: 'Wateruitjes via Klook',
    relatedDisclosure: 'Klook is een affiliatepartner. Een eventuele commissie verandert jouw prijs niet.',
    sourceTitle: 'Hoe is deze duikgids samengesteld?',
    sourceDescription: 'We combineren Nederlandse DFS-zoekdata met officiële opleidings-, medische, lokale bestemmings- en duikveiligheidsbronnen. De pagina rangschikt geen school op betaalde plaatsing en publiceert geen vaste cursusprijs die morgen verouderd kan zijn.',
  },
  en: {
    nav: ['Choose a course', 'Check a school', 'Course flow', 'Dive profiles', 'Preflight buffer'],
    breadcrumb: 'Diving',
    primaryAction: 'Choose your course',
    secondaryAction: 'Check water activities',
    disclosure: 'The water-activities button is an affiliate link. We may receive a commission after a booking, at no extra cost to you.',
    itemList: (destination: string) => `Diving options in ${destination}`,
    activitiesLink: 'See the complete activity route too',
    choicesEyebrow: 'Four different outcomes',
    choicesTitle: 'Which diving route fits you?',
    choicesIntro: 'Start with what you want to be able to do afterwards. A supervised introduction, certification course, fun dive and continuing course are not versions of the same product.',
    time: 'Time',
    outcome: 'Outcome',
    bestFor: 'Best for:',
    klookEyebrow: 'Activities via Klook',
    klookTitle: 'Compare current water activities only after the course type and safety questions are clear.',
    klookAction: 'Check activities',
    affiliateNote: 'Affiliate link — we may receive a commission after a booking, at no extra cost to you.',
    ask: 'Ask:',
    padiRegister: 'Check PADI centres in the official register',
    agenciesEyebrow: 'PADI, SSI or another agency?',
    agenciesTitle: 'The logo is only one part of the decision',
    agenciesIntro: 'A recognised training system provides structure. Daily quality still comes from the actual centre, instructor and time available to master each skill.',
    profilesEyebrow: 'Not every site fits every day',
    profilesTitle: (destination: string) => `Four dive profiles around ${destination}`,
    profilesIntro: 'Use these profiles to have a better operator conversation. The final choice must still match certification, recent experience, weather, current and the operational plan.',
    medicalBoundary: 'Medical boundary:',
    bookingEyebrow: 'Before you book',
    bookingTitle: 'Four checks that belong in the confirmation',
    faqEyebrow: 'Real questions from current search results',
    faqTitle: (destination: string) => `Frequently asked questions about diving in ${destination}`,
    faqDescription: 'These questions were captured from current UK-English People Also Ask results through DataForSEO. Medical and training answers deliberately rely on primary organisations; personal fitness belongs with a qualified clinician and dive professional.',
    relatedTitle: (destination: string) => `Build your ${destination} trip around the dive plan`,
    relatedSide: 'Water activities via Klook',
    relatedDisclosure: 'Klook is an affiliate partner. Any commission does not change your price.',
    sourceTitle: 'How was this diving guide built?',
    sourceDescription: 'We combine independent UK-English DFS research with primary training, medical and dive-safety sources plus current local operator examples. No school receives a paid ranking, and we do not publish a fixed course price that may already be stale.',
  },
};

export function DiveGuideTemplate({ data }: DiveGuideTemplateProps) {
  const labels = localeCopy[data.locale];
  const localePrefix = data.locale === 'nl' ? '/nl' : '';
  const normalizeHref = data.locale === 'nl' ? normalizeNlInternalHref : normalizeEnInternalHref;
  const sectionNavItems: PageSectionNavItem[] = [
    { href: '#kiezen', label: labels.nav[0], icon: Compass },
    { href: '#school', label: labels.nav[1], icon: ShieldCheck },
    { href: '#verloop', label: labels.nav[2], icon: BookOpenText },
    { href: '#duikprofielen', label: labels.nav[3], icon: Waves },
    { href: '#vlucht', label: labels.nav[4], icon: Plane },
  ];
  const klookHref = withPlacementSubId(KLOOK_GENERIC, `${data.slug}-diving`);
  const parentGuideHref = normalizeHref(data.parentGuideHref);
  const activitiesGuideHref = normalizeHref(data.activitiesGuideHref);
  const parentGuideUrl = `https://go2-thailand.com${localePrefix}${parentGuideHref}`;
  const heroActions: EditorialHeroAction[] = [
    { label: labels.primaryAction, href: '#kiezen', kind: 'primary' },
    { label: labels.secondaryAction, href: klookHref, kind: 'secondary', newTab: true, affiliate: true },
  ];
  const breadcrumbs = [
    { label: 'Thailand', href: '/' },
    { label: data.destinationName, href: parentGuideHref },
    { label: labels.breadcrumb },
  ];
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: labels.itemList(data.destinationName),
    numberOfItems: data.courseChoices.length,
    itemListElement: data.courseChoices.map((choice, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: choice.title,
      description: choice.bestFor,
      url: `${data.pageUrl}#${choice.slug}`,
    })),
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Thailand', item: `https://go2-thailand.com${localePrefix}/` },
      { '@type': 'ListItem', position: 2, name: data.destinationName, item: parentGuideUrl },
      { '@type': 'ListItem', position: 3, name: labels.breadcrumb, item: data.pageUrl },
    ],
  };
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${data.pageUrl}#webpage`,
    url: data.pageUrl,
    name: data.pageTitle,
    description: data.pageDescription,
    inLanguage: data.locale === 'nl' ? 'nl-NL' : 'en',
    dateModified: data.dateModified,
  };

  return (
    <>
      <SEOHead title={data.pageTitle} description={data.pageDescription} ogImage={`https://go2-thailand.com${data.hero.image}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      </SEOHead>

      <div className="bg-canvas text-charcoal">
        <EditorialHero
          image={data.hero.image}
          imageAlt={data.hero.imageAlt}
          breadcrumbs={breadcrumbs}
          eyebrow={data.hero.eyebrow}
          title={<>{data.hero.title} <span className="mt-2 block text-[2.65rem] leading-none text-saffron-dark sm:text-[4rem] lg:text-[4.7rem]">{data.hero.accent}</span></>}
          titleClassName="max-w-[620px] text-[4rem] leading-[0.85] sm:text-[5.4rem] lg:text-[6rem]"
          subtitle={data.hero.subtitle}
          subtitleClassName="max-w-[620px] text-[1.45rem] leading-[1.1] sm:text-[1.75rem]"
          description={data.hero.description}
          actions={heroActions}
          disclosure={labels.disclosure}
          minHeightClassName="min-h-[760px] lg:min-h-[650px]"
          imageClassName={data.hero.imageClassName || 'object-cover object-center'}
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.1)_0%,rgba(252,250,246,0.48)_45%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.99)_0%,rgba(252,250,246,0.9)_37%,rgba(252,250,246,0.2)_65%,rgba(18,63,54,0.05)_100%)]"
        />

        <PageSectionNav items={sectionNavItems} />

        <section className="section-divider-bottom py-14 lg:py-20">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.9fr_1.25fr] lg:items-center">
            <div>
              <p className="eyebrow">{data.quickAnswer.eyebrow}</p>
              <h2 className="heading-redesign">{data.quickAnswer.title}</h2>
              <p className="mt-5 max-w-xl text-sm font-medium leading-7 text-charcoal/70">{data.quickAnswer.description}</p>
              <Link href={activitiesGuideHref} className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-jade transition hover:text-saffron-dark">{labels.activitiesLink} <ArrowRight size={14} /></Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {data.quickAnswer.stats.map((stat) => { const Icon = iconMap[stat.icon]; return <div key={stat.label} className="rounded-2xl border border-jade/10 bg-white p-5 shadow-[0_8px_28px_rgba(18,63,54,0.05)]"><Icon size={26} strokeWidth={1.45} className="text-saffron-dark" /><p className="mt-6 text-[9px] font-extrabold uppercase tracking-[0.15em] text-charcoal/42">{stat.label}</p><p className="mt-1 font-display text-2xl font-semibold text-jade">{stat.value}</p></div>; })}
            </div>
          </div>
        </section>

        <section id="kiezen" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom">
            <div className="max-w-3xl"><p className="eyebrow">{labels.choicesEyebrow}</p><h2 className="heading-redesign">{labels.choicesTitle}</h2><p className="mt-5 text-sm font-medium leading-7 text-charcoal/68">{labels.choicesIntro}</p></div>
            <div className="mt-9 grid gap-5 lg:grid-cols-2">
              {data.courseChoices.map((choice, index) => { const Icon = iconMap[choice.icon]; return <article id={choice.slug} key={choice.slug} className="scroll-mt-24 rounded-2xl border border-jade/10 bg-white p-6 shadow-[0_10px_36px_rgba(18,63,54,0.055)] sm:p-7"><div className="flex items-start justify-between gap-4"><span className="grid h-12 w-12 place-items-center rounded-xl border border-saffron/25 bg-tonal text-jade"><Icon size={23} strokeWidth={1.45} /></span><span className="text-[10px] font-extrabold tracking-[0.18em] text-saffron-dark">0{index + 1}</span></div><p className="mt-6 text-[9px] font-extrabold uppercase tracking-[0.17em] text-saffron-dark">{choice.kicker}</p><h3 className="mt-2 font-display text-[2rem] font-semibold leading-none text-jade">{choice.title}</h3><div className="mt-5 grid gap-3 rounded-xl bg-tonal p-4 sm:grid-cols-2"><div><p className="text-[8px] font-extrabold uppercase tracking-[0.15em] text-charcoal/42">{labels.time}</p><p className="mt-1 text-xs font-bold text-jade">{choice.duration}</p></div><div><p className="text-[8px] font-extrabold uppercase tracking-[0.15em] text-charcoal/42">{labels.outcome}</p><p className="mt-1 text-xs font-bold text-jade">{choice.outcome}</p></div></div><p className="mt-5 flex gap-2 text-xs leading-5 text-charcoal/65"><Check size={14} className="mt-0.5 shrink-0 text-saffron-dark" /><span><strong className="text-jade">{labels.bestFor}</strong> {choice.bestFor}</span></p><p className="mt-3 border-l-2 border-saffron/40 pl-4 text-xs leading-5 text-charcoal/60">{choice.tradeoff}</p></article>; })}
            </div>
            <div className="mt-7 flex flex-col items-start justify-between gap-5 rounded-2xl bg-jade px-6 py-6 text-white sm:flex-row sm:items-center lg:px-8"><div><p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-saffron-light">{labels.klookEyebrow}</p><p className="mt-2 max-w-2xl font-display text-2xl font-semibold">{labels.klookTitle}</p></div><a href={klookHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-cream shrink-0">{labels.klookAction} <ArrowRight size={14} className="text-saffron-dark" /></a></div>
            <p className="mt-2 text-[9px] text-charcoal/45">{labels.affiliateNote}</p>
          </div>
        </section>

        <section id="school" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
          <div className="container-custom grid overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-[0_16px_50px_rgba(18,63,54,0.07)] lg:grid-cols-[0.82fr_1.18fr]">
            <div className="relative min-h-[420px] overflow-hidden lg:min-h-full"><Image src={data.schoolDecision.image} alt={data.schoolDecision.imageAlt} fill sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-jade-dark/90 via-jade/10 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-7 text-white"><p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-saffron-light">{data.schoolDecision.eyebrow}</p><h2 className="mt-3 font-display text-[2.65rem] font-semibold leading-[0.92]">{data.schoolDecision.title}</h2><p className="mt-4 max-w-md text-xs leading-5 text-white/76">{data.schoolDecision.description}</p></div></div>
            <div className="p-6 sm:p-8 lg:p-10"><div className="grid gap-4 sm:grid-cols-2">{data.schoolDecision.checks.map((check) => { const Icon = iconMap[check.icon]; return <article key={check.title} className="rounded-xl border border-jade/10 bg-canvas p-5"><Icon size={25} strokeWidth={1.4} className="text-saffron-dark" /><h3 className="mt-4 font-display text-xl font-semibold leading-none text-jade">{check.title}</h3><p className="mt-3 text-[10px] font-bold leading-4 text-jade">{labels.ask} {check.ask}</p><p className="mt-2 text-[10px] leading-4 text-charcoal/58">{check.why}</p></article>; })}</div><a href="https://www.padi.com/dive-shops/koh-tao/" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-jade hover:text-saffron-dark">{labels.padiRegister} <ArrowRight size={14} /></a></div>
          </div>
        </section>

        <section className="section-divider-bottom py-14 lg:py-20">
          <div className="container-custom">
            <div className="max-w-3xl"><p className="eyebrow">{labels.agenciesEyebrow}</p><h2 className="heading-redesign">{labels.agenciesTitle}</h2><p className="mt-5 text-sm font-medium leading-7 text-charcoal/68">{labels.agenciesIntro}</p></div>
            <div className="mt-9 grid gap-5 lg:grid-cols-3">{data.agencies.map((agency, index) => <article key={agency.name} className="flex min-h-[315px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-[0_8px_28px_rgba(18,63,54,0.045)]"><span className="grid h-11 w-11 place-items-center rounded-full bg-jade text-xs font-extrabold text-white">{index + 1}</span><p className="mt-6 text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-dark">{agency.label}</p><h3 className="mt-2 font-display text-[2rem] font-semibold leading-none text-jade">{agency.name}</h3><p className="mt-4 text-xs leading-5 text-charcoal/64">{agency.description}</p><p className="mt-auto border-t border-jade/10 pt-4 text-[10px] font-bold leading-4 text-jade">{agency.decision}</p></article>)}</div>
          </div>
        </section>

        <section id="verloop" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom">
            <div className="max-w-3xl"><p className="eyebrow">{data.timeline.eyebrow}</p><h2 className="heading-redesign">{data.timeline.title}</h2><p className="mt-5 text-sm font-medium leading-7 text-charcoal/68">{data.timeline.description}</p></div>
            <div className="relative mt-10 grid gap-4 lg:grid-cols-5"><div aria-hidden="true" className="absolute left-[8%] right-[8%] top-7 hidden border-t-2 border-dashed border-saffron/55 lg:block" />{data.timeline.steps.map((step, index) => <article key={step.label} className="relative rounded-2xl border border-jade/10 bg-white p-5 shadow-[0_8px_28px_rgba(18,63,54,0.045)]"><span className="relative z-10 grid h-14 w-14 place-items-center rounded-full border-4 border-canvas bg-saffron text-sm font-extrabold text-white">{index + 1}</span><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-dark">{step.label}</p><h3 className="mt-2 font-display text-xl font-semibold leading-none text-jade">{step.title}</h3><p className="mt-3 text-[10px] leading-4 text-charcoal/60">{step.description}</p></article>)}</div>
          </div>
        </section>

        <section className="section-divider-bottom bg-jade py-14 text-white lg:py-20">
          <div className="container-custom grid gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="relative min-h-[470px] overflow-hidden rounded-2xl"><Image src={data.responsibleFeature.image} alt={data.responsibleFeature.imageAlt} fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-jade-dark/90 via-transparent to-transparent" /><div className="absolute inset-x-0 bottom-0 p-7"><p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-saffron-light">{data.responsibleFeature.eyebrow}</p><h2 className="mt-3 max-w-lg font-display text-[3rem] font-semibold leading-[0.9]">{data.responsibleFeature.title}</h2><p className="mt-4 max-w-lg text-xs leading-5 text-white/74">{data.responsibleFeature.description}</p></div></div>
            <div className="divide-y divide-white/12 border-y border-white/12">{data.responsibleFeature.points.map((point, index) => <div key={point.title} className="grid gap-3 py-5 sm:grid-cols-[3rem_1fr]"><span className="grid h-10 w-10 place-items-center rounded-full border border-saffron/35 text-xs font-extrabold text-saffron-light">0{index + 1}</span><div><h3 className="font-display text-2xl font-semibold text-white">{point.title}</h3><p className="mt-2 text-xs leading-5 text-white/65">{point.description}</p></div></div>)}</div>
          </div>
        </section>

        <section id="duikprofielen" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom">
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"><div><p className="eyebrow">{labels.profilesEyebrow}</p><h2 className="heading-redesign">{labels.profilesTitle(data.destinationName)}</h2></div><p className="max-w-2xl text-sm font-medium leading-7 text-charcoal/66 lg:justify-self-end">{labels.profilesIntro}</p></div>
            <div className="mt-9 grid gap-5 md:grid-cols-2">{data.diveProfiles.map((profile, index) => <article key={profile.title} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-[0_8px_28px_rgba(18,63,54,0.045)]"><div className="flex items-center justify-between gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-tonal text-xs font-extrabold text-jade">0{index + 1}</span><span className="rounded-lg border border-saffron/25 px-3 py-1.5 text-[8px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">{profile.level}</span></div><h3 className="mt-6 font-display text-[2rem] font-semibold leading-none text-jade">{profile.title}</h3><p className="mt-3 text-[10px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">{profile.examples}</p><p className="mt-4 text-xs leading-5 text-charcoal/64">{profile.description}</p><p className="mt-4 border-l-2 border-saffron/40 pl-4 text-[10px] leading-4 text-charcoal/58">{profile.tradeoff}</p></article>)}</div>
          </div>
        </section>

        <section id="vlucht" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
          <div className="container-custom">
            <div className="max-w-4xl"><p className="eyebrow">{data.flightBuffer.eyebrow}</p><h2 className="heading-redesign">{data.flightBuffer.title}</h2><p className="mt-5 max-w-3xl text-sm font-medium leading-7 text-charcoal/68">{data.flightBuffer.description}</p></div>
            <div className="relative mt-9 grid gap-5 lg:grid-cols-3"><div aria-hidden="true" className="absolute left-[14%] right-[14%] top-8 hidden border-t-2 border-dashed border-saffron/55 lg:block" />{data.flightBuffer.intervals.map((interval, index) => <article key={interval.label} className="relative rounded-2xl border border-jade/10 bg-white p-6 shadow-[0_8px_28px_rgba(18,63,54,0.045)]"><span className="grid h-16 w-16 place-items-center rounded-full border-4 border-tonal bg-jade font-display text-xl font-semibold text-white">{index + 1}</span><p className="mt-6 text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">{interval.label}</p><p className="mt-2 font-display text-[3rem] font-semibold leading-none text-jade">{interval.value}</p><p className="mt-4 text-xs leading-5 text-charcoal/62">{interval.description}</p></article>)}</div>
            <p className="mt-6 rounded-xl border border-saffron/30 bg-white px-5 py-4 text-xs font-medium leading-5 text-charcoal/66"><strong className="text-jade">{labels.medicalBoundary}</strong> {data.flightBuffer.caveat}</p>
          </div>
        </section>

        <section className="section-divider-bottom py-14 lg:py-20">
          <div className="container-custom"><div><p className="eyebrow">{labels.bookingEyebrow}</p><h2 className="heading-redesign">{labels.bookingTitle}</h2></div><div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{data.bookingChecklist.map((item) => { const Icon = iconMap[item.icon]; return <article key={item.title} className="rounded-2xl border border-jade/10 bg-white p-6"><Icon size={36} strokeWidth={1.35} className="text-jade" /><h3 className="mt-5 font-display text-[1.55rem] font-semibold leading-none text-jade">{item.title}</h3><p className="mt-3 text-xs leading-5 text-charcoal/63">{item.description}</p></article>; })}</div></div>
        </section>

        <FaqSplitSection eyebrow={labels.faqEyebrow} title={labels.faqTitle(data.destinationName)} description={labels.faqDescription} items={data.faqs} />

        <RelatedGuidesSection title={labels.relatedTitle(data.destinationName)} guides={data.relatedGuides.map(guide => ({ ...guide, href: normalizeHref(guide.href) }))} sideLink={{ label: labels.relatedSide, href: klookHref, affiliate: true }} disclosure={labels.relatedDisclosure} />

        <SourceMethodSection title={labels.sourceTitle} description={labels.sourceDescription} sources={data.sources} />

        <section className="py-10 lg:py-12"><div className="container-custom"><FeedbackForm pageTitle={data.pageTitle} pageUrl={data.pageUrl} /></div></section>
      </div>
    </>
  );
}
