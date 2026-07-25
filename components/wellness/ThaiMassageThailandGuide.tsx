import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  BadgeCheck,
  Check,
  CircleAlert,
  CircleHelp,
  Clock3,
  Droplets,
  ExternalLink,
  Footprints,
  Hand,
  HeartHandshake,
  Leaf,
  MapPin,
  MessageCircle,
  ScanLine,
  ShieldCheck,
  Shirt,
  Sparkles,
  ThermometerSun,
  WalletCards,
} from 'lucide-react';
import { KLOOK_GENERIC, withPlacementSubId } from '../../lib/affiliates';
import { useSubId } from '../../lib/useSubId';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav, type PageSectionNavItem } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';

const PAGE_URL = 'https://go2-thailand.com/nl/blog/thai-massage-guide-types-prices/';
const HERO_IMAGE = '/images/redesign/thai-massage-hero.webp';
const PAGE_TITLE = 'Thaise massage in Thailand: soorten, prijs en etiquette';
const PAGE_DESCRIPTION = 'Kies een Thaise massage die bij je past. Vergelijk traditioneel, olie, voet en kruidenkompres, met actuele prijscheck, kleding, consent en veiligheid.';

const navItems: PageSectionNavItem[] = [
  { href: '#kiezen', label: 'Kiezen', icon: BadgeCheck },
  { href: '#soorten', label: 'Soorten', icon: Hand },
  { href: '#prijs', label: 'Prijs', icon: WalletCards },
  { href: '#vooraf', label: 'Vooraf', icon: Shirt },
  { href: '#consent', label: 'Consent', icon: HeartHandshake },
  { href: '#veiligheid', label: 'Veiligheid', icon: ShieldCheck },
  { href: '#vragen', label: 'Vragen', icon: CircleHelp },
];

const massageChoices: Array<{
  icon: LucideIcon;
  title: string;
  cue: string;
  description: string;
  expect: string;
  chooseWhen: string;
}> = [
  {
    icon: Shirt,
    title: 'Traditioneel Thai',
    cue: 'Gekleed · zonder olie',
    description: 'Je ligt meestal op een mat in losse kleding. De behandelaar gebruikt handen, duimen en lichaamsgewicht en kan je in ondersteunde rekposities brengen.',
    expect: 'Actiever dan een rustige oliemassage; druk en rek horen bespreekbaar en aanpasbaar te blijven.',
    chooseWhen: 'Je kleding wilt aanhouden en nieuwsgierig bent naar druk plus beweging.',
  },
  {
    icon: Droplets,
    title: 'Thaise oliemassage',
    cue: 'Draping · glijdende beweging',
    description: 'Olie wordt op delen van de huid gebruikt terwijl andere delen bedekt horen te blijven. De stijl en intensiteit verschillen sterk per spa en gekozen menu.',
    expect: 'Doorgaans minder kleding en minder uitgesproken rek, maar “olie” is geen garantie voor zachte druk.',
    chooseWhen: 'Je vooral wilt ontspannen en vooraf duidelijke afspraken over bedekking maakt.',
  },
  {
    icon: Footprints,
    title: 'Voetmassage',
    cue: 'Zittend of liggend · lokaal',
    description: 'De focus ligt op voeten en onderbenen. Vraag of de sessie ook stevig drukwerk, een stokje, balsem of een korte schoudermassage omvat.',
    expect: 'Minder volledige lichaamsbeweging, maar gevoelige voeten kunnen intens reageren op druk.',
    chooseWhen: 'Je een overzichtelijke eerste sessie wilt of weinig tijd hebt.',
  },
  {
    icon: Leaf,
    title: 'Kruidenkompres',
    cue: 'Warmte · vaak als aanvulling',
    description: 'Gestoomde bundels met kruiden worden op of langs het lichaam gebruikt. Samenstelling, temperatuur en combinatie met massage verschillen per aanbieder.',
    expect: 'Warmte moet comfortabel blijven; vraag eerst om een test en meld verminderde gevoeligheid.',
    chooseWhen: 'Je warmte prettig vindt en vooraf controleert wat precies in het pakket zit.',
  },
];

const faqs = [
  {
    question: 'Wat gebeurt er tijdens een Thaise massage?',
    answer: 'Bij een traditionele Thaise massage blijf je meestal gekleed in losse kleding en lig je op een mat. De behandelaar gebruikt ritmische druk en kan armen of benen in ondersteunde rekposities bewegen. Een intake, drukcheck en toestemming voor iedere techniek horen onderdeel van een professionele sessie te zijn. De precieze aanpak verschilt per opleiding, behandelaar en gekozen menu.',
  },
  {
    question: 'Wat is het verschil tussen een Thaise massage en een oliemassage?',
    answer: 'Traditionele Thaise massage gebeurt meestal gekleed, zonder olie en met meer actieve druk en ondersteunde beweging. Bij oliemassage wordt olie op ontblote huid gebruikt en hoort de rest van het lichaam zorgvuldig bedekt te blijven. Een oliemassage kan zacht zijn, maar de naam zegt niet automatisch iets over intensiteit: spreek druk en grenzen vooraf af.',
  },
  {
    question: 'Wat draag je bij een Thaise massage?',
    answer: 'Voor traditioneel Thai krijg je vaak een losse broek en top van de aanbieder, of draag je zelf schone, soepele kleding. Bij olie trek je alleen uit waar jij je comfortabel bij voelt en hoort een handdoek of laken voor bedekking te zorgen. Vraag vóór de sessie wat de procedure is; je mag kleding aanhouden of een behandeling weigeren.',
  },
  {
    question: 'Doet een Thaise massage pijn?',
    answer: 'Stevige druk of rek kan intens voelen, maar scherpe, uitstralende of toenemende pijn is geen bewijs dat de massage “werkt”. Vraag direct om minder druk of stop de techniek. Een behandelaar hoort daarop te reageren. Heb je klachten, een recente blessure of twijfel over wat veilig is, bespreek dat eerst met een arts en de behandelaar.',
  },
  {
    question: 'Is Thaise massage veilig?',
    answer: 'Massage heeft volgens NCCIH doorgaans een laag risico wanneer ze passend wordt uitgevoerd door een opgeleide behandelaar, maar zeldzame ernstige complicaties zijn gemeld. Persoonlijke geschiktheid hangt af van je gezondheid en de techniek. Vraag medisch advies bij onder meer zwangerschap, bloedverdunners, recente operatie of breuk, stollingsproblemen, ernstige osteoporose, infectie, koorts of onverklaarde klachten.',
  },
  {
    question: 'Welke massage is het beste bij een hernia of tijdens zwangerschap?',
    answer: 'Een reisgids kan geen persoonlijk massagetype voorschrijven voor een hernia, zwangerschap of andere medische situatie. Vraag de arts of verloskundige die je situatie kent wat je moet vermijden en deel die informatie vóór de boeking met de aanbieder. Kies alleen een behandelaar met relevante opleiding en stop wanneer een techniek klachten uitlokt.',
  },
  {
    question: 'Wat kost een Thaise massage in Thailand?',
    answer: 'Er bestaat geen betrouwbare landelijke standaardprijs: stad, locatie, duur, type en serviceniveau maken veel verschil. Als controleerbaar voorbeeld vermeldde Wat Pho op 25 juli 2026 voor Thai massage 340 THB voor 30 minuten, 520 THB voor 60 minuten en 1.040 THB voor 120 minuten. Zie dit niet als marktgemiddelde en controleer altijd de actuele menukaart, duur en toeslagen.',
  },
  {
    question: 'Hoeveel fooi geef je voor een massage in Thailand?',
    answer: 'Fooi is een vrijwillige waardering en geen vervanging voor een duidelijke prijs of fatsoenlijke betaling. Er is geen bedrag dat in elke salon, spa of hotelsetting juist is. Betaal eerst de afgesproken rekening en geef alleen extra als je dat zelf wilt. Laat lijstjes met vaste bedragen niet zwaarder wegen dan lokale aanwijzingen en je eigen ervaring.',
  },
  {
    question: 'Is een erectie tijdens een massage normaal?',
    answer: 'Een lichamelijke reactie kan onwillekeurig ontstaan en betekent geen toestemming of uitnodiging. Blijf respectvol; een professionele behandelaar hoort professioneel te blijven. Voel jij of de behandelaar zich ongemakkelijk, pauzeer of beëindig de sessie. Een reguliere massage is geen seksuele dienstverlening en grenzen gelden altijd voor beide personen.',
  },
  {
    question: 'Wat moet je na een Thaise massage niet doen?',
    answer: 'Er is geen universele medische nazorglijst voor iedere gezonde reiziger. Sta rustig op, drink naar behoefte en let op hoe je je voelt. Plan niet automatisch een extreem intensieve activiteit wanneer je duizelig of gevoelig bent. Aanhoudende of ernstige klachten, zwakte, gevoelloosheid, benauwdheid of andere alarmerende symptomen vragen om medische beoordeling.',
  },
];

const sources = [
  {
    title: 'Nuad Thai, traditional Thai massage',
    creator: 'UNESCO Intangible Cultural Heritage',
    url: 'https://ich.unesco.org/en/RL/nuad-thai-traditional-thai-massage-01384?RL=01384',
    note: 'Primaire bron voor de opname van Nuad Thai op de representatieve erfgoedlijst in 2019 en de culturele context.',
  },
  {
    title: 'Plan your visit — massage services',
    creator: 'Wat Pho',
    url: 'https://watpho.com/index.php/en/contact/plan',
    note: 'Officiële, gedateerde prijs- en tijdsreferentie; gebruikt als venuevoorbeeld en nadrukkelijk niet als landelijk gemiddelde.',
  },
  {
    title: 'Thai massage service-provider registration',
    creator: 'Government of Thailand',
    url: 'https://www.thailand.go.th/public/useful-information-detail/001_07_005-2-2',
    note: 'Juridische context voor registratie en kwalificatie van serviceproviders binnen health establishments.',
  },
  {
    title: 'Choose a safe massage establishment',
    creator: 'Government of Thailand',
    url: 'https://www.thailand.go.th/public/issue-focus-detail/-----89',
    note: 'Praktische controlepunten rond vergunning, HSS-kenmerken, opleiding en voorzichtigheid bij risicofactoren.',
  },
  {
    title: 'Massage Therapy: What You Need To Know',
    creator: 'NCCIH',
    url: 'https://www.nccih.nih.gov/health/massage-therapy-what-you-need-to-know',
    note: 'Bron voor de genuanceerde veiligheidscontext, zeldzame ernstige effecten en het advies medische zorg niet uit te stellen.',
  },
];

function createSchemas() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${PAGE_URL}#article`,
      headline: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      image: `https://go2-thailand.com${HERO_IMAGE}`,
      datePublished: '2026-03-21',
      dateModified: '2026-07-25',
      inLanguage: 'nl-NL',
      mainEntityOfPage: PAGE_URL,
      author: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
      publisher: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/nl/' },
        { '@type': 'ListItem', position: 2, name: 'Reisgids', item: 'https://go2-thailand.com/nl/travel-guides/' },
        { '@type': 'ListItem', position: 3, name: 'Thaise massage', item: PAGE_URL },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Vier veelvoorkomende massagekeuzes in Thailand',
      itemListElement: massageChoices.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.title,
        description: item.description,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'Zo kies je een professionele Thaise massage',
      description: 'Een korte controle vóór je een massagesessie in Thailand boekt.',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Kies het type', text: 'Bepaal of je gekleed wilt blijven, olie wilt, rek prettig vindt en warmte wilt.' },
        { '@type': 'HowToStep', position: 2, name: 'Controleer de aanbieder', text: 'Bekijk vergunning, HSS-kenmerken, prijslijst, hygiëne en intakeprocedure.' },
        { '@type': 'HowToStep', position: 3, name: 'Bespreek grenzen', text: 'Noem relevante gezondheidsinformatie en spreek druk, bedekking en stopmomenten af.' },
        { '@type': 'HowToStep', position: 4, name: 'Blijf communiceren', text: 'Vraag om aanpassing of stop direct wanneer iets niet goed voelt.' },
      ],
    },
  ];
}

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="font-extrabold text-jade underline decoration-saffron/55 underline-offset-4 transition hover:text-saffron-dark">{children}</Link>;
}

export function ThaiMassageThailandGuide() {
  const subId = useSubId();
  const wellnessHref = withPlacementSubId(KLOOK_GENERIC, subId, 'thai-massage-related-wellness');
  const schemas = createSchemas();

  return (
    <>
      <SEOHead title={PAGE_TITLE} description={PAGE_DESCRIPTION} ogImage={`https://go2-thailand.com${HERO_IMAGE}`}>
        <meta name="keywords" content="thaise massage thailand, wat is thaise massage, traditionele thaise massage, thaise massage soorten, thaise massage prijs thailand, massage etiquette thailand" />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content="2026-03-21" />
        <meta property="article:modified_time" content="2026-07-25" />
        {schemas.map((schema, index) => <script key={`${schema['@type']}-${index}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      </SEOHead>

      <main className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          image={HERO_IMAGE}
          imageAlt="Professionele Thaise massagetherapeut bereidt een rustige behandelruimte voor"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Reisgids', href: '/travel-guides/' }, { label: 'Thaise massage' }]}
          eyebrow="Kies op gevoel én grenzen"
          title={<>Thaise massage.<br />Jouw tempo.</>}
          subtitle={<>Ontspanning begint vóór de eerste aanraking.</>}
          description={<>Traditioneel, olie, voet of kruidenwarmte? Vergelijk wat er werkelijk gebeurt, wat je draagt en welke vragen je vooraf stelt — zonder wellnessbeloften of ongemakkelijke verrassingen.</>}
          actions={[
            { label: 'Vind jouw type', href: '#kiezen', kind: 'primary' },
            { label: 'Doe de veiligheidscheck', href: '#veiligheid', kind: 'secondary' },
          ]}
          minHeightClassName="min-h-[810px] lg:min-h-[700px]"
          contentClassName="max-w-[680px]"
          titleClassName="max-w-[630px] text-[3.75rem] leading-[0.84] sm:text-[4.8rem] lg:text-[5.15rem]"
          subtitleClassName="max-w-[570px] text-[1.6rem] leading-[0.98] text-saffron-dark sm:text-[1.95rem]"
          imageClassName="object-cover object-[66%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.04)_0%,rgba(252,250,246,0.73)_46%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.99)_0%,rgba(252,250,246,0.92)_39%,rgba(252,250,246,0.18)_68%,rgba(18,63,54,0.08)_100%)]"
          sideCard={(
            <aside className="absolute bottom-8 right-[max(2rem,calc((100vw-1240px)/2))] z-10 hidden w-[340px] overflow-hidden rounded-2xl border border-white/60 bg-white/[0.92] shadow-editorial-lift backdrop-blur-xl xl:block">
              <div className="flex items-center justify-between border-b border-jade/10 px-5 py-4"><p className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-saffron-dark">Voor je een tijdslot kiest</p><MessageCircle size={18} className="text-jade" /></div>
              <dl className="grid grid-cols-[92px_1fr] gap-x-4 gap-y-3 p-5 text-[11px]">
                <dt className="text-charcoal/46">Kleding</dt><dd className="font-extrabold text-jade">Gekleed of draping?</dd>
                <dt className="text-charcoal/46">Techniek</dt><dd className="font-extrabold text-jade">Druk, rek, olie, warmte?</dd>
                <dt className="text-charcoal/46">Grenzen</dt><dd className="font-extrabold text-jade">Wat wil je niet?</dd>
                <dt className="text-charcoal/46">Gezondheid</dt><dd className="font-extrabold text-jade">Is overleg nodig?</dd>
              </dl>
              <p className="border-t border-jade/10 px-5 py-4 text-[10px] font-medium leading-4 text-charcoal/62">Een hogere prijs bewijst geen geschiktheid; heldere intake en respect voor je antwoord zeggen meer.</p>
            </aside>
          )}
        />

        <PageSectionNav items={navItems} />

        <section id="kiezen" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-end">
              <SectionHeading
                eyebrow="In zestig seconden kiezen"
                title={<>Niet de “beste”.<br />Wel jouw beste start.</>}
                description={<>Begin niet bij een viral salon of een belofte over “herstel”, maar bij de ervaring die je wilt. In <InlineLink href="/city/bangkok/">Bangkok</InlineLink> is de keuze enorm; in <InlineLink href="/city/chiang-mai/">Chiang Mai</InlineLink> net zo. Het beslismodel blijft in beide steden hetzelfde.</>}
              />
              <p className="max-w-3xl text-sm font-medium leading-7 text-charcoal/66">De naam op een menukaart is geen strak protocol. Vraag dus niet alleen “Thai of olie?”, maar ook hoeveel rek, welke lichaamsdelen, welke kleding en welke temperatuur de sessie inhoudt. Zo vergelijk je een echte werkwijze in plaats van vier losse marketinglabels.</p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {massageChoices.map(({ icon: Icon, title, cue, description, expect, chooseWhen }, index) => (
                <article key={title} className={`flex min-h-[440px] flex-col rounded-2xl border p-6 ${index === 0 ? 'border-saffron/40 bg-[#fff4df] shadow-editorial-card' : 'border-jade/10 bg-white'}`}>
                  <div className="flex items-start justify-between gap-4"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-saffron/25 bg-canvas text-jade"><Icon size={22} strokeWidth={1.45} /></span><span className="max-w-[132px] text-right text-[9px] font-extrabold uppercase leading-4 tracking-[0.12em] text-saffron-dark">{cue}</span></div>
                  <h2 className="mt-6 font-display text-[1.7rem] font-semibold leading-none text-jade">{title}</h2>
                  <p className="mt-4 text-xs font-medium leading-6 text-charcoal/66">{description}</p>
                  <div className="mt-5 border-t border-jade/10 pt-4"><p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-jade/48">Verwachting</p><p className="mt-2 text-[11px] font-medium leading-5 text-charcoal/64">{expect}</p></div>
                  <p className="mt-auto pt-5 text-[11px] font-extrabold leading-5 text-jade"><Check size={14} className="mr-2 inline text-saffron" />{chooseWhen}</p>
                </article>
              ))}
            </div>
            <div className="mt-6 grid gap-5 rounded-2xl border border-jade/10 bg-white p-6 sm:p-7 lg:grid-cols-[0.34fr_0.66fr] lg:items-center">
              <div><p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">Ontspanning of behandeling?</p><h2 className="mt-2 font-display text-[1.75rem] font-semibold leading-tight text-jade">Houd die twee doelen uit elkaar.</h2></div>
              <p className="text-xs font-medium leading-6 text-charcoal/66">Een reiziger kan een massage kiezen omdat de setting, aandacht of rustige tijd prettig lijkt. Dat is iets anders dan een behandeling voor een aandoening. Laat een menuwoord als “therapeutisch”, “detox” of “energieherstel” je niet verleiden om klachten zelf te diagnosticeren. Vraag bij een gezondheidsvraag eerst passend medisch advies; bespreek daarna met de aanbieder welke aanrakingen en bewegingen binnen dat advies passen. Zo blijft de boeking een bewuste wellnesskeuze en geen vervanging voor zorg.</p>
            </div>
          </div>
        </section>

        <section id="soorten" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[1.03fr_0.97fr] lg:items-center">
            <div className="relative min-h-[500px] overflow-hidden rounded-[28px] shadow-editorial-lift sm:min-h-[620px]">
              <Image src="/images/redesign/thai-massage-choices.webp" alt="Losse massagekleding, massageolie, voetbad en Thaise kruidenkompressen" fill sizes="(max-width: 1024px) 100vw, 52vw" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-jade/92 via-jade/52 to-transparent p-7 pt-32 text-white">
                <p className="eyebrow !text-saffron-light">Lees het menu als ingrediëntenlijst</p>
                <h2 className="max-w-xl font-display text-[3rem] font-semibold leading-[0.9] tracking-[-0.04em]">Kleding, olie, beweging en warmte bepalen de ervaring.</h2>
              </div>
            </div>
            <div>
              <SectionHeading
                eyebrow="De vier assen"
                title="Een naam vertelt maar de helft"
                description="Twee salons kunnen onder dezelfde naam een andere behandeling aanbieden. Gebruik vier concrete assen om vóór de boeking door te vragen."
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  [Shirt, 'Kleding', 'Traditioneel is meestal volledig gekleed. Bij olie bepaal jij hoeveel je uittrekt en hoort professionele bedekking vanzelfsprekend te zijn.'],
                  [Droplets, 'Product', 'Vraag welke olie, balsem of kruiden worden gebruikt wanneer je allergieën, parfumgevoeligheid of huidproblemen hebt.'],
                  [Hand, 'Druk & rek', '“Medium” is subjectief. Benoem liever wat je wilt vermijden en geef tijdens de sessie direct feedback.'],
                  [ThermometerSun, 'Warmte', 'Een kompres of verwarmde doek hoort eerst getest te worden, zeker bij verminderde gevoeligheid of kwetsbare huid.'],
                ].map(([Icon, title, text]) => {
                  const CardIcon = Icon as LucideIcon;
                  return <article key={String(title)} className="rounded-2xl border border-jade/10 bg-white p-5"><CardIcon size={20} strokeWidth={1.45} className="text-saffron-dark" /><h3 className="mt-4 font-display text-[1.45rem] font-semibold text-jade">{String(title)}</h3><p className="mt-2 text-xs font-medium leading-6 text-charcoal/66">{String(text)}</p></article>;
                })}
              </div>
              <div className="mt-6 rounded-2xl border border-saffron/25 bg-[#fff4df] p-6">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">De nuttigste boekingszin</p>
                <p className="mt-3 font-display text-[1.65rem] font-semibold leading-tight text-jade">“Kunt u uitleggen wat ik draag, hoeveel rek u gebruikt en hoe ik stop zeg?”</p>
                <p className="mt-3 text-xs font-medium leading-6 text-charcoal/64">Een betrouwbare uitleg is waardevoller dan een lange lijst vermeende voordelen.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-16 lg:py-20">
          <div className="container-custom">
            <div className="overflow-hidden rounded-[30px] bg-jade text-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[0.7fr_1.3fr]">
                <div className="p-8 sm:p-10 lg:p-12">
                  <p className="eyebrow !text-saffron-light">Erfgoed, geen wondermiddel</p>
                  <h2 className="font-display text-[3.25rem] font-semibold leading-[0.88] tracking-[-0.04em]">Nuad Thai is levende Thaise kennis.</h2>
                  <p className="mt-6 text-sm font-medium leading-7 text-white/70">UNESCO nam Nuad Thai in 2019 op als immaterieel cultureel erfgoed. Dat erkent de overdracht, praktijk en maatschappelijke betekenis — niet iedere gezondheidsclaim op een spa-menu.</p>
                </div>
                <div className="grid gap-px bg-white/10 sm:grid-cols-3">
                  {[
                    ['01', 'Traditie', 'Binnen de traditie wordt gewerkt met zogenoemde sen-lijnen. Beschrijf die als cultureel systeem, niet als bewezen moderne anatomie.'],
                    ['02', 'Opleiding', 'Kennis wordt via families, scholen, instellingen en beroepspraktijk doorgegeven. Vraag naar de relevante opleiding van jouw behandelaar.'],
                    ['03', 'Grenzen', 'Cultureel erfgoed maakt een techniek niet automatisch passend voor ieder lichaam. Jouw gezondheid en toestemming blijven leidend.'],
                  ].map(([number, title, text]) => (
                    <article key={number} className="flex min-h-[330px] flex-col bg-jade p-7 sm:py-10">
                      <p className="font-display text-4xl font-semibold text-saffron-light">{number}</p>
                      <h3 className="mt-6 font-display text-[1.7rem] font-semibold leading-none">{title}</h3>
                      <p className="mt-4 text-xs font-medium leading-6 text-white/64">{text}</p>
                      <Sparkles size={18} className="mt-auto text-saffron-light" />
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="prijs" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <SectionHeading
              eyebrow="Prijs zonder schijnzekerheid"
              title="Vergelijk een concrete sessie, niet “Thailand gemiddeld”"
              description={<>Een straatsalon, tempelschool, hotelspa en wellnessresort verkopen niet hetzelfde product. Locatie en luxe veranderen de prijs, maar zeggen op zichzelf niets over wat medisch passend is. Combineer een sessie in Bangkok eventueel met onze <InlineLink href="/blog/wat-pho-bangkok-reclining-buddha/">praktische Wat Pho-gids</InlineLink>.</>}
            />
            <div>
              <div className="overflow-hidden rounded-[28px] border border-jade/10 bg-white shadow-editorial-card">
                <div className="grid md:grid-cols-[0.42fr_0.58fr]">
                  <div className="bg-jade p-7 text-white sm:p-9">
                    <p className="eyebrow !text-saffron-light">Officieel voorbeeld</p>
                    <h3 className="font-display text-[2.65rem] font-semibold leading-[0.9]">Wat Pho op 25 juli 2026</h3>
                    <p className="mt-5 text-xs font-medium leading-6 text-white/64">De officiële bezoekpagina vermeldde voor Thai massage én foot massage dezelfde drie duurprijzen. Controleer ze opnieuw op je reisdag.</p>
                    <a href="https://watpho.com/index.php/en/contact/plan" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-white">Bekijk de actuele bron <ExternalLink size={14} className="text-saffron-light" /></a>
                  </div>
                  <div className="grid divide-y divide-jade/10 p-7 sm:p-9">
                    {[['30 minuten', '340 THB'], ['60 minuten', '520 THB'], ['120 minuten', '1.040 THB']].map(([duration, price]) => (
                      <div key={duration} className="flex items-center justify-between gap-4 py-5 first:pt-0 last:pb-0"><span className="text-sm font-extrabold text-jade">{duration}</span><span className="font-display text-[1.8rem] font-semibold text-saffron-dark">{price}</span></div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {[
                  ['Vóór je boekt', 'Type, duur en kleding'],
                  ['Vóór je start', 'Toeslagen en producten'],
                  ['Vóór je betaalt', 'Eindbedrag en betaalwijze'],
                ].map(([title, text], index) => <article key={title} className="rounded-2xl border border-jade/10 bg-white p-5"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#fff0d5] text-xs font-extrabold text-saffron-dark">0{index + 1}</span><h3 className="mt-4 text-sm font-extrabold text-jade">{title}</h3><p className="mt-2 text-xs font-medium leading-5 text-charcoal/62">{text}</p></article>)}
              </div>
              <p className="mt-5 text-[11px] font-medium leading-5 text-charcoal/56">Wat Pho is hier een transparant prijsanker, geen aanbeveling voor jouw gezondheid en geen landelijk prijsplafond. Valutawaarde, menu’s, promoties en beschikbaarheid kunnen veranderen.</p>
            </div>
          </div>
        </section>

        <section id="vooraf" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.66fr_1.34fr] lg:items-end">
              <SectionHeading eyebrow="Van deur tot mat" title="De sessie begint met drie controles" description="Een goede ervaring ontstaat niet doordat je stil afwacht. Geef relevante informatie, vraag wat er gaat gebeuren en houd tijdens de sessie dezelfde zeggenschap." />
              <p className="max-w-3xl text-sm font-medium leading-7 text-charcoal/66">Kom op tijd, vermijd een heel zware maaltijd vlak ervoor en laat sieraden veilig achter. Belangrijker: vertel over gevoeligheden, recente ingrepen en bewegingen die je niet wilt. Een korte intake is geen formaliteit, maar het moment waarop de behandelaar het plan hoort aan te passen.</p>
            </div>
            <div className="relative mt-10">
              <div className="pointer-events-none absolute left-[7%] right-[7%] top-9 hidden border-t-2 border-dashed border-saffron/55 lg:block" />
              <div className="relative grid gap-5 lg:grid-cols-3">
                {[
                  [MessageCircle, 'Vooraf', 'Noem relevante gezondheid, gewenste druk en lichaamsdelen die niet behandeld mogen worden.', 'Vraag: wat gaat u doen?'],
                  [Hand, 'Tijdens', 'Controleer na de eerste druk en rek. Zeg “lighter”, “stop” of wijs aan wat niet goed voelt.', 'Pijn is geen prestatietest'],
                  [Clock3, 'Na afloop', 'Sta rustig op en beoordeel hoe je je voelt voordat je verkeer, hitte of een intensieve activiteit ingaat.', 'Ernstige klachten = hulp'],
                ].map(([Icon, title, text, cue], index) => {
                  const CardIcon = Icon as LucideIcon;
                  return (
                    <article key={String(title)} className="relative min-h-[300px] rounded-2xl border border-jade/10 bg-white p-7 shadow-editorial-card">
                      <span className="relative z-10 grid h-[72px] w-[72px] place-items-center rounded-full border border-saffron/35 bg-canvas text-jade"><CardIcon size={28} strokeWidth={1.35} /></span>
                      <p className="mt-6 text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">Stap 0{index + 1}</p>
                      <h3 className="mt-2 font-display text-[1.8rem] font-semibold leading-none text-jade">{String(title)}</h3>
                      <p className="mt-4 text-xs font-medium leading-6 text-charcoal/66">{String(text)}</p>
                      <p className="mt-5 border-t border-jade/10 pt-4 text-[10px] font-extrabold text-jade">{String(cue)}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-end">
              <SectionHeading
                eyebrow="Laat je reisritme meebeslissen"
                title="Het juiste moment is persoonlijker dan het juiste menu"
                description="Dezelfde sessie kan op een rustige middag prettig voelen en vlak na een lange vlucht, in grote hitte of vóór een volle excursiedag te veel zijn. Plan rond je energie en bewegingsruimte, niet rond de eerste vrije boekingsknop."
              />
              <p className="max-w-3xl text-sm font-medium leading-7 text-charcoal/66">Geef jezelf na afloop ruimte om rustig op te staan, je spullen te verzamelen en te beoordelen hoe je je voelt. Boek geen krappe aansluiting met luchthavenvervoer, een boot of een intensieve activiteit. Daarmee maak je geen gezondheidsclaim; je voorkomt simpelweg dat ontspanning verandert in logistieke haast.</p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                [MapPin, 'Eerste keer', 'Kies een duidelijke, kortere sessie met zichtbare menukaart en echte intake. Begin liever beheerst dan meteen met de stevigste optie.', 'Rust om te leren'],
                [Clock3, 'Na aankomst', 'Vermoeidheid, warmte en weinig drinken kunnen beïnvloeden hoe je je voelt. Eet licht, hydrateer normaal en kies geen gehaaste afspraak.', 'Geen jetlag-oplossing'],
                [Footprints, 'Na veel lopen', 'Een voetmassage klinkt logisch, maar gevoelige voeten of een verse blaar vragen eerst om uitleg en mogelijk een andere keuze.', 'Lokale druk blijft druk'],
                [ShieldCheck, 'Voor een actieve dag', 'Plan voldoende tijd tussen massage en klimmen, duiken, lange ritten of een training. Beoordeel eerst je eigen comfort en bewegingsgevoel.', 'Marge in je planning'],
              ].map(([Icon, title, text, cue]) => {
                const CardIcon = Icon as LucideIcon;
                return (
                  <article key={String(title)} className="flex min-h-[315px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#eef2ed] text-jade"><CardIcon size={20} strokeWidth={1.45} /></span>
                    <h3 className="mt-6 font-display text-[1.6rem] font-semibold leading-none text-jade">{String(title)}</h3>
                    <p className="mt-4 text-xs font-medium leading-6 text-charcoal/66">{String(text)}</p>
                    <p className="mt-auto border-t border-jade/10 pt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{String(cue)}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="consent" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="relative min-h-[480px] overflow-hidden rounded-[28px] shadow-editorial-lift sm:min-h-[610px]">
              <Image src="/images/redesign/thai-massage-consent.webp" alt="Reiziger en Thaise massagetherapeut bespreken druk en wensen vóór de sessie" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-jade/90 via-jade/48 to-transparent p-7 pt-28 text-white"><p className="eyebrow !text-saffron-light">Geen taaltoets nodig</p><h2 className="font-display text-[2.85rem] font-semibold leading-[0.9]">Drie korte zinnen geven genoeg richting.</h2></div>
            </div>
            <div>
              <SectionHeading eyebrow="Plan flexibel" title="Consent blijft de hele sessie actief" description="Een eerdere ‘ja’ geldt niet automatisch voor meer druk, een nieuwe lichaamszone, extra rek of minder bedekking. Jij én de behandelaar mogen op ieder moment pauzeren of stoppen." />
              <div className="mt-8 space-y-4">
                {[
                  ['“Light pressure, please.”', 'Begin lichter. Je kunt later altijd vragen of iets steviger mag.'],
                  ['“No stretching here.”', 'Wijs de plek aan en laat twijfel niet oplossen met méér druk.'],
                  ['“Stop, please.”', 'Een volledige zin of uitleg is niet nodig. Stop betekent direct stoppen.'],
                ].map(([phrase, meaning], index) => <article key={phrase} className="grid grid-cols-[46px_1fr] gap-4 rounded-2xl border border-jade/10 bg-white p-5"><span className="grid h-11 w-11 place-items-center rounded-full bg-jade font-display text-lg font-semibold text-saffron-light">{index + 1}</span><div><h3 className="text-sm font-extrabold text-jade">{phrase}</h3><p className="mt-2 text-xs font-medium leading-5 text-charcoal/64">{meaning}</p></div></article>)}
              </div>
              <p className="mt-6 rounded-2xl border border-saffron/25 bg-[#fff4df] p-5 text-xs font-medium leading-6 text-charcoal/70"><strong className="text-jade">Professionele grens:</strong> een gewone massage is geen seksuele dienst. Een onwillekeurige lichamelijke reactie verandert niets aan toestemming, gedrag of het recht van beide personen om de sessie te beëindigen.</p>
            </div>
          </div>
        </section>

        <section id="veiligheid" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.64fr_1.36fr] lg:items-start">
              <SectionHeading
                eyebrow="Gezondheid vóór wellness"
                title="Wanneer eerst overleggen — en wanneer stoppen"
                description={<>Massage is geen vervanging voor diagnose of behandeling. Wie een reis rond rust en beweging wil bouwen, vindt in onze <InlineLink href="/blog/best-wellness-retreats-thailand-2026/">gids voor wellnessretreats</InlineLink> bredere context, maar ook daar blijft persoonlijke medische beoordeling apart nodig.</>}
              />
              <div className="grid gap-5 md:grid-cols-2">
                <article className="rounded-[24px] border border-jade/10 bg-white p-7 shadow-editorial-card">
                  <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#eef2ed] text-jade"><MessageCircle size={21} /></span><h3 className="font-display text-[1.75rem] font-semibold text-jade">Bespreek vooraf</h3></div>
                  <ul className="mt-6 space-y-3 text-xs font-medium leading-5 text-charcoal/68">
                    {['Zwangerschap of recente bevalling', 'Bloedverdunners of stollingsproblemen', 'Recente operatie, breuk of acuut letsel', 'Ernstige osteoporose of kwetsbare botten', 'Koorts, infectie, huidprobleem of open wond', 'Onverklaarde pijn, zwakte of gevoelloosheid'].map((item) => <li key={item} className="flex gap-3"><CircleAlert size={16} className="mt-0.5 shrink-0 text-saffron-dark" />{item}</li>)}
                  </ul>
                  <p className="mt-6 border-t border-jade/10 pt-5 text-[11px] font-medium leading-5 text-charcoal/58">Deze lijst is niet volledig. Vraag een arts die jouw situatie kent wat passend is en deel het advies met de behandelaar.</p>
                </article>
                <article className="rounded-[24px] bg-jade p-7 text-white shadow-editorial-lift">
                  <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-saffron-light"><ShieldCheck size={21} /></span><h3 className="font-display text-[1.75rem] font-semibold">Stop tijdens de sessie</h3></div>
                  <ul className="mt-6 space-y-3 text-xs font-medium leading-5 text-white/72">
                    {['Scherpe of uitstralende pijn', 'Nieuwe tinteling of gevoelloosheid', 'Duizeligheid of misselijkheid', 'Benauwdheid of pijn op de borst', 'Een techniek of aanraking waarvoor je geen toestemming geeft', 'Een behandelaar die je stop- of drukverzoek negeert'].map((item) => <li key={item} className="flex gap-3"><Check size={16} className="mt-0.5 shrink-0 text-saffron-light" />{item}</li>)}
                  </ul>
                  <p className="mt-6 border-t border-white/12 pt-5 text-[11px] font-medium leading-5 text-white/62">Zoek bij ernstige of aanhoudende klachten passende medische hulp. Wacht niet op een volgende massagesessie om een alarmsymptoom te laten beoordelen.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading eyebrow="Kies de professional, niet het decor" title="Zes signalen vóór je binnenstapt" description={<>Een marmeren lobby bewijst geen vakbekwaamheid en een eenvoudige ruimte is niet automatisch onprofessioneel. De Thaise overheid koppelt health establishments en serviceproviders aan formele eisen. Combineer die controle met normale reisalertheid en onze <InlineLink href="/practical-info/etiquette-culture/">Thaise etiquettegids</InlineLink>.</>} />
              <a href="https://www.thailand.go.th/public/issue-focus-detail/-----89" target="_blank" rel="noopener noreferrer" className="btn-cream shrink-0 px-6 text-saffron-dark">Bekijk overheidscheck <ExternalLink size={15} /></a>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {[
                [BadgeCheck, 'Vergunning zichtbaar', 'Zoek de vestigingsvergunning en controleer of naam en locatie bij de zaak horen.'],
                [ScanLine, 'HSS-kenmerk controleerbaar', 'Een kwaliteitskenmerk of QR hoort controleerbaar te zijn; alleen een sticker is geen bewijs.'],
                [WalletCards, 'Menu vóór de sessie', 'Type, duur, prijs en eventuele extra’s zijn duidelijk voordat je omkleedt of begint.'],
                [MessageCircle, 'Echte intake', 'De behandelaar vraagt naar voorkeuren, klachten en contra-indicaties en reageert inhoudelijk.'],
                [Sparkles, 'Schone werkwijze', 'Linnen, kleding, oppervlakken en producten ogen verzorgd; handen en hulpmiddelen worden passend gebruikt.'],
                [HeartHandshake, 'Grenzen zonder discussie', 'Een verzoek om minder druk, meer bedekking of stoppen wordt direct en professioneel gevolgd.'],
              ].map(([Icon, title, text]) => {
                const CardIcon = Icon as LucideIcon;
                return <article key={String(title)} className="rounded-2xl border border-jade/10 bg-white p-6"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/25 bg-canvas text-jade"><CardIcon size={20} strokeWidth={1.45} /></span><h3 className="mt-5 font-display text-[1.55rem] font-semibold text-jade">{String(title)}</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/64">{String(text)}</p></article>;
              })}
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-16 lg:py-20">
          <div className="container-custom">
            <div className="overflow-hidden rounded-[28px] border border-jade/10 bg-white shadow-editorial-card">
              <div className="grid lg:grid-cols-[0.7fr_1.3fr]">
                <div className="bg-[#fff4df] p-8 sm:p-10">
                  <p className="eyebrow">Kleine etiquette, groot verschil</p>
                  <h2 className="font-display text-[3rem] font-semibold leading-[0.9] tracking-[-0.04em] text-jade">Rustig, schoon en duidelijk.</h2>
                  <p className="mt-5 text-sm font-medium leading-7 text-charcoal/66">Douche indien praktisch, kom enkele minuten vroeg en zet je telefoon stil. Behandel de therapeut als professional; foto’s, aanrakingen en grappen vragen dezelfde grenzen als in iedere andere dienstverleningssituatie.</p>
                </div>
                <div className="grid sm:grid-cols-2">
                  {[
                    ['Kleding', 'Draag of accepteer losse, schone kleding bij traditioneel Thai. Bij olie bepaal jij wat uitgaat; vraag om passende bedekking.'],
                    ['Communicatie', 'Zeg vóór de sessie wat je niet wilt en wacht niet tot ongemak ondraaglijk wordt. Kort en direct is beleefd genoeg.'],
                    ['Fooi', 'Fooi is vrijwillig. Laat een vast internetbedrag niet belangrijker worden dan een duidelijke rekening en je eigen keuze.'],
                    ['Privacy', 'Maak geen foto of video zonder expliciete toestemming. Deel ook geen herkenbare beelden van andere klanten of personeel.'],
                  ].map(([title, text], index) => <article key={title} className={`min-h-[230px] border-jade/10 p-7 ${index % 2 === 0 ? 'sm:border-r' : ''} ${index < 2 ? 'border-b' : ''}`}><p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">0{index + 1}</p><h3 className="mt-4 font-display text-[1.65rem] font-semibold text-jade">{title}</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/64">{text}</p></article>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom bg-tonal py-14 lg:py-20">
          <div className="container-custom">
            <div className="rounded-[28px] bg-jade p-8 text-white shadow-editorial-lift sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-12">
              <div className="max-w-3xl">
                <p className="eyebrow !text-saffron-light">Wil je vooraf vergelijken?</p>
                <h2 className="font-display text-[2.8rem] font-semibold leading-[0.92] tracking-[-0.035em]">Bekijk wellness-ervaringen, maar controleer de aanbieder zelf.</h2>
                <p className="mt-4 text-sm font-medium leading-7 text-white/68">Klook kan handig zijn om locatie, duur, voorwaarden en recente reizigersreviews naast elkaar te zetten. Een vermelding is geen medische aanbeveling en vervangt de vergunning-, intake- en veiligheidscheck hierboven niet.</p>
              </div>
              <a href={wellnessHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-cream mt-7 shrink-0 px-7 text-saffron-dark lg:mt-0">Vergelijk op Klook <ExternalLink size={15} /></a>
            </div>
            <AffiliateDisclosure className="mt-3">Affiliate-link: boek je via deze link, dan kan Go2Thailand commissie ontvangen zonder extra kosten voor jou. Controleer aanbieder, actuele inhoud, prijs, annuleringsvoorwaarden en geschiktheid vóór je boekt.</AffiliateDisclosure>
          </div>
        </section>

        <FaqSplitSection
          id="vragen"
          eyebrow="Echte vragen uit de zoekresultaten"
          title="Veelgestelde vragen over Thaise massage"
          description="De antwoorden zijn praktisch en bewust voorzichtig. Ze helpen je een sessie kiezen en communiceren, maar vervangen geen persoonlijk medisch advies."
          items={faqs}
        />

        <RelatedGuidesSection
          eyebrow="Maak er een rustige reisdag van"
          title="Plan context rond je sessie"
          guides={[
            { title: 'Wat Pho in Bangkok', description: 'Tempelcontext, bezoekplanning en actuele aandachtspunten rond de bekende massageschool.', href: '/blog/wat-pho-bangkok-reclining-buddha/', image: '/images/blog/wat-pho-bangkok-reclining-buddha.webp' },
            { title: 'Wellnessretreats in Thailand', description: 'Vergelijk een losse behandeling met een meerdaagse wellnessreis.', href: '/blog/best-wellness-retreats-thailand-2026/', image: '/images/blog/best-wellness-retreats-thailand-2026.webp' },
            { title: 'Bangkok rustig plannen', description: 'Bouw vervoer, wijken en rustmomenten rond je dag zonder onnodig heen en weer reizen.', href: '/city/bangkok/', image: '/images/redesign/destination-bangkok.webp' },
          ]}
        />

        <SourceMethodSection
          title="Bronnen die erfgoed, prijs en veiligheid uit elkaar houden"
          description="DFS stuurde de zoekintentie, concurrentiegaten en letterlijke PAA. Voor veranderlijke of health-adjacent claims gebruikten we primaire instanties. Prijzen zijn gedateerd; traditionele begrippen worden als traditie beschreven en niet als bewezen behandeling. Laatst inhoudelijk gecontroleerd: 25 juli 2026."
          sources={sources}
        />
      </main>
    </>
  );
}
