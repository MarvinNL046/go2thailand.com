import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  CalendarDays,
  Check,
  CircleHelp,
  Clock3,
  ExternalLink,
  Eye,
  Hotel,
  Map,
  MapPin,
  PackageCheck,
  Scale,
  ShieldCheck,
  ShoppingBasket,
  Sparkles,
  Sprout,
  TrainFront,
  Utensils,
} from 'lucide-react';
import { TRIP_GENERIC, withPlacementSubId } from '../../lib/affiliates';
import { useSubId } from '../../lib/useSubId';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav, type PageSectionNavItem } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';

const PAGE_URL = 'https://go2-thailand.com/nl/blog/durian-season-thailand-2026-where-to-eat-buy-guide/';
const HERO_IMAGE = '/images/redesign/durian-season-hero.webp';
const PAGE_TITLE = 'Durian in Thailand: seizoen, soorten en waar proeven';
const PAGE_DESCRIPTION = 'Plan je eerste durian in Thailand met een regionale seizoenskalender, cultivar- en rijpheidskeuze, koopcheck, Bangkok-opties en boomgaardroute.';

const navItems: PageSectionNavItem[] = [
  { href: '#seizoen', label: 'Seizoen', icon: CalendarDays },
  { href: '#soorten', label: 'Soorten', icon: Sparkles },
  { href: '#kopen', label: 'Kopen', icon: ShoppingBasket },
  { href: '#proeven', label: 'Proeven', icon: Utensils },
  { href: '#boomgaard', label: 'Boomgaard', icon: Sprout },
  { href: '#regels', label: 'Regels', icon: ShieldCheck },
  { href: '#vragen', label: 'Vragen', icon: CircleHelp },
];

const cultivars = [
  {
    name: 'Monthong',
    thai: 'Gouden kussen',
    profile: 'Vaak zacht van geur, glad en geel vruchtvlees, doorgaans minder uitgesproken zoet dan rijpere Chanee.',
    ask: 'Vraag stevig of romig',
    firstTry: 'Logische, maar niet verplichte eerste keuze',
  },
  {
    name: 'Chanee',
    thai: 'Gibbon',
    profile: 'Donkerder geel en bij verdere rijping zachter, romiger en krachtiger van geur en zoete indruk.',
    ask: 'Vraag hoe rijp de portie is',
    firstTry: 'Voor wie meer intensiteit wil',
  },
  {
    name: 'Kradum',
    thai: 'Knoop',
    profile: 'Meestal kleiner; rijp vruchtvlees kan zacht en zoet worden. Handig om als kleine portie te vergelijken.',
    ask: 'Vraag naar openingsmoment',
    firstTry: 'Klein formaat, grote rijpheidsinvloed',
  },
  {
    name: 'Kanyao',
    thai: 'Lange steel',
    profile: 'Bekende premiumcultivar met ronde vruchtvorm en een andere balans van zoetheid, geur en textuur.',
    ask: 'Vraag cultivar én herkomst',
    firstTry: 'Prijs is geen objectieve smaakscore',
  },
];

const faqs = [
  {
    question: 'Wanneer is het durianseizoen in Thailand?',
    answer: 'Thailand heeft geen enkel landelijk venster dat ieder jaar en in elke regio gelijk is. Voor Chanthaburi verwachtte het Department of Agriculture in 2026 aanvoer van februari tot juli, met het grootste volume in mei. TAT noemt mei tot juli als sterke periode voor boomgaardtoerisme in Chanthaburi en Rayong. Weer, provincie en cultivar verschuiven de oogst; controleer voor een fruitreis altijd de actuele provinciale kalender.',
  },
  {
    question: 'Welke maand is het beste voor durian in Thailand?',
    answer: 'Voor een reis naar Oost-Thailand is mei vaak de sterkste eerste gok: officiële 2026-data plaatsten de Chanthaburi-piek daar en TAT positioneert mei–juli als fruitboomgaardperiode. “Beste” hangt echter af van cultivar, rijpheid, herkomst en je reisregio. In Bangkok kan aanvoer uit meerdere regio’s het aanbod verlengen zonder dat ieder bakje dezelfde oogstkwaliteit heeft.',
  },
  {
    question: 'Waar kan ik durian kopen in Thailand?',
    answer: 'In het seizoen vind je durian bij fruitmarkten, gespecialiseerde verkopers, supermarkten en boomgaarden. In Bangkok is Or Tor Kor naast MRT Kamphaeng Phet een overzichtelijke start, maar niet automatisch de goedkoopste of beste kraam. Vraag altijd cultivar, herkomst, prijsbasis en rijpheid. Een geopende kleine portie is voor een eerste proefmoment praktischer dan een hele vrucht.',
  },
  {
    question: 'Is er durian te vinden in Bangkok?',
    answer: 'Ja. Bangkok ontvangt fruit uit meerdere Thaise productieregio’s en heeft tijdens sterke aanvoer ruime keuze op markten en in supermarkten. Zie Bangkok als koop- en proefplek, niet als bewijs van een lokaal oogstseizoen. Or Tor Kor, grotere versmarkten en supermarkten zijn bruikbare opties; assortiment, cultivar en rijpheid kunnen per dag verschillen.',
  },
  {
    question: 'Wat kost durian in Thailand?',
    answer: 'Een los bedrag zonder eenheid is niet bruikbaar. Hele vruchten kunnen per kilogram mét schil worden geprijsd, terwijl een geopend bakje alleen eetbaar vruchtvlees bevat. Cultivar, rijpheid, kwaliteit, herkomst, seizoen en verkooppunt beïnvloeden de prijs. Vraag daarom “per kilo of per bakje?”, laat het gewicht zien en bevestig het totaal voordat de vrucht wordt geopend.',
  },
  {
    question: 'Welke durian is de beste in Thailand?',
    answer: 'Er is geen objectief beste cultivar. Monthong is voor veel beginners toegankelijk door de vaak mildere geur en gladde textuur; rijpere Chanee kan zoeter, zachter en krachtiger zijn. Kanyao heeft een premiumreputatie, maar een hogere prijs garandeert niet dat jij de smaak lekkerder vindt. Vergelijk kleine porties op dezelfde rijpheid.',
  },
  {
    question: 'Waar proeft durian naar?',
    answer: 'De ervaring combineert romig, zoet, hartig en aromatisch, maar taal schiet snel tekort. Cultivar en rijpheid maken veel uit: stevig vruchtvlees kan droger en beheerster overkomen, terwijl verder rijpe durian zachter, zoeter en intenser ruikt. Proef een kleine hap zonder koude drank of sterk gekruid eten ertussen en vorm je eigen oordeel.',
  },
  {
    question: 'Welk deel van de durian eet je?',
    answer: 'Je eet het zachte vruchtvlees rond de grote zaden. De harde stekelige schil eet je niet en de rauwe zaden laat je liggen. Laat een verkoper de vrucht openen; zelf snijden met een reismes is onnodig en de stekels en naden maken dat onhandig. Geef schil, zaden en verpakking terug aan de verkoper als daar een afvalpunt voor is.',
  },
  {
    question: 'Mag durian mee in de BTS of naar je hotel?',
    answer: 'BTS-regel 39 verbiedt voorwerpen die een slechte of aanstootgevende geur afgeven; neem geopende of sterk ruikende durian dus niet mee het BTS-systeem in. Hotel-, MRT-, taxi-, bus- en luchtvaartregels kunnen per aanbieder verschillen. Vraag vóór aankoop expliciet wat mag en ga niet uit van verpakking als automatische toestemming.',
  },
  {
    question: 'Is durian gezond?',
    answer: 'Durian is fruit en levert voedingsstoffen, maar “gezond” hangt af van hoeveelheid, totaal eetpatroon en persoonlijke gezondheid. Een reisgids maakt er geen behandeling of superfood van. Proef een kleine portie, zeker als je het zware, romige vruchtvlees niet kent. Heb je een medische reden om suiker, kalium, energie-inname of voeding te beperken, vraag persoonlijk advies aan een zorgprofessional.',
  },
];

const sources = [
  {
    title: 'Thailand commences the 2026 tropical fruit season',
    creator: 'Government of Thailand',
    url: 'https://www.thailand.go.th/issue-focus-detail/thailand-officially-commences-2026-tropical-fruit-season-strategic-integration-of-gastronomy-soft-power-to-accelerate-grassroots-economic-growth',
    note: 'Primaire 2026-context voor de meipiek, agritoerisme en de rol van Chanthaburi en Trat.',
  },
  {
    title: 'Eastern durian production and quality measures 2026',
    creator: 'Thailand Department of Agriculture',
    url: 'https://www.doa.go.th/th/news_release/106997/',
    note: 'Officiële Chanthaburi-prognose: aanvoer februari–juli 2026, grootste volume in mei en cultivarafhankelijke oogstdata.',
  },
  {
    title: 'Chanthaburi–Rayong fruit route',
    creator: 'Tourism Authority of Thailand',
    url: 'https://thai.tourismthailand.org/Articles/chanthaburi-rayong-th',
    note: 'Bron voor mei–juli als sterke fruitboomgaardperiode en het vooraf controleren van geopende boomgaarden.',
  },
  {
    title: 'The Beginner’s Guide to Thai Durians',
    creator: 'Royal Thai Embassy, Shanghai',
    url: 'https://thaishanghai.thaiembassy.org/th/content/the-beginner-s-guide-to-thai-durians?cate=5f0d67e59cc17760ab1a99d2',
    note: 'Cultivarprofielen voor Monthong, Kradum, Chanee, Kanyao en Puangmanee; oude prijzen uit de bron zijn niet overgenomen.',
  },
  {
    title: 'BTS announcement and regulations',
    creator: 'BTS SkyTrain',
    url: 'https://www.bts.co.th/eng/service/AnnouncementandRegulations.html',
    note: 'Primaire bron voor het verbod op eten in betaald gebied en voorwerpen die slechte of aanstootgevende geuren afgeven.',
  },
];

function createSchemas() {
  return [
    {
      '@context': 'https://schema.org', '@type': 'Article', '@id': `${PAGE_URL}#article`, headline: PAGE_TITLE,
      description: PAGE_DESCRIPTION, image: `https://go2-thailand.com${HERO_IMAGE}`, datePublished: '2026-03-23', dateModified: '2026-07-25',
      inLanguage: 'nl-NL', mainEntityOfPage: PAGE_URL,
      author: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
      publisher: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
    },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/nl/' },
        { '@type': 'ListItem', position: 2, name: 'Eten en drinken', item: 'https://go2-thailand.com/nl/food/' },
        { '@type': 'ListItem', position: 3, name: 'Durian in Thailand', item: PAGE_URL },
      ],
    },
    { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Thaise duriancultivars voor reizigers', itemListElement: cultivars.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, description: item.profile })) },
    {
      '@context': 'https://schema.org', '@type': 'HowTo', name: 'Zo koop en proef je voor het eerst durian in Thailand',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Kies een kleine portie', text: 'Laat voor een eerste proefmoment geen hele vrucht openen.' },
        { '@type': 'HowToStep', position: 2, name: 'Vraag cultivar en rijpheid', text: 'Kies zowel een soort als de gewenste stevige of romige rijpheid.' },
        { '@type': 'HowToStep', position: 3, name: 'Bevestig prijs en eenheid', text: 'Controleer per kilogram of per bakje, het getoonde gewicht en het totaal.' },
        { '@type': 'HowToStep', position: 4, name: 'Eet bij de verkoper', text: 'Proef direct waar geur en afval kunnen worden afgehandeld.' },
      ],
    },
  ];
}

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="font-extrabold text-jade underline decoration-saffron/55 underline-offset-4 transition hover:text-saffron-dark">{children}</Link>;
}

export function DurianThailandGuide() {
  const subId = useSubId();
  const hotelHref = withPlacementSubId(TRIP_GENERIC, subId, 'durian-chanthaburi-stay');
  const schemas = createSchemas();

  return (
    <>
      <SEOHead title={PAGE_TITLE} description={PAGE_DESCRIPTION} ogImage={`https://go2-thailand.com${HERO_IMAGE}`}>
        <meta name="keywords" content="durian thailand, durian seizoen thailand, durian soorten thailand, durian bangkok, durian kopen thailand, monthong chanee" />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content="2026-03-23" />
        <meta property="article:modified_time" content="2026-07-25" />
        {schemas.map((schema, index) => <script key={`${schema['@type']}-${index}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      </SEOHead>

      <main className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          image={HERO_IMAGE}
          imageAlt="Thaise fruitverkoper opent durian in een boomgaard in Oost-Thailand"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Eten', href: '/food/' }, { label: 'Durian' }]}
          eyebrow="Proef het seizoen, niet de hype"
          title={<>Durian.<br />Op het juiste moment.</>}
          subtitle={<>Kies herkomst, cultivar én rijpheid.</>}
          description={<>De koning der vruchten heeft geen nationale aan-knop. Met deze regionale kalender, koopcheck en eerste-proefroute vind je een goede portie zonder prijs- of seizoensmythes.</>}
          actions={[
            { label: 'Bekijk het seizoen', href: '#seizoen', kind: 'primary' },
            { label: 'Kies je eerste portie', href: '#proeven', kind: 'secondary' },
          ]}
          minHeightClassName="min-h-[820px] lg:min-h-[700px]"
          contentClassName="max-w-[690px]"
          titleClassName="max-w-[680px] text-[4rem] leading-[0.84] sm:text-[5rem] lg:text-[5.55rem]"
          subtitleClassName="max-w-[610px] text-[1.7rem] leading-[0.98] text-saffron-dark sm:text-[2.2rem]"
          imageClassName="object-cover object-[70%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.04)_0%,rgba(252,250,246,0.69)_48%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.99)_0%,rgba(252,250,246,0.91)_39%,rgba(252,250,246,0.14)_67%,rgba(18,63,54,0.06)_100%)]"
          sideCard={(
            <aside className="absolute bottom-8 right-[max(2rem,calc((100vw-1240px)/2))] z-10 hidden w-[340px] overflow-hidden rounded-2xl border border-white/60 bg-white/[0.92] shadow-editorial-lift backdrop-blur-xl xl:block">
              <div className="flex items-center justify-between border-b border-jade/10 px-5 py-4"><p className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-saffron-dark">2026 Oost-Thailand</p><CalendarDays size={18} className="text-jade" /></div>
              <dl className="grid grid-cols-[92px_1fr] gap-x-4 gap-y-3 p-5 text-[11px]">
                <dt className="text-charcoal/46">Aanvoer</dt><dd className="font-extrabold text-jade">Februari–juli</dd>
                <dt className="text-charcoal/46">Piekvolume</dt><dd className="font-extrabold text-jade">Mei in Chanthaburi</dd>
                <dt className="text-charcoal/46">Boomgaarden</dt><dd className="font-extrabold text-jade">Mei–juli plannen</dd>
                <dt className="text-charcoal/46">Controle</dt><dd className="font-extrabold text-jade">Jaar + provincie</dd>
              </dl>
              <p className="border-t border-jade/10 px-5 py-4 text-[10px] font-medium leading-4 text-charcoal/62">Officiële 2026-referentie voor Chanthaburi; geen garantie voor iedere regio, cultivar, kraam of reisdatum.</p>
            </aside>
          )}
        />

        <PageSectionNav items={navItems} />

        <section id="seizoen" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:items-end">
              <SectionHeading eyebrow="Eén vrucht, meerdere kalenders" title={<>Wanneer is durian<br />in seizoen?</>} description={<>Plan op regio en jaartal. Voor een complete weersafweging combineer je deze oogstlogica met onze <InlineLink href="/blog/best-time-to-visit-thailand/">beste reistijd voor Thailand</InlineLink>; fruitpiek en droogste reisweer zijn niet automatisch hetzelfde.</>} />
              <p className="max-w-3xl text-sm font-medium leading-7 text-charcoal/66">De hardste actuele referentie is Chanthaburi 2026: het Department of Agriculture verwachtte product van februari tot juli, met 43% van de provinciale oogst in mei. TAT noemt mei–juli als sterke periode voor boomgaardbezoek in Chanthaburi en Rayong. Gebruik dat als planningsvenster, niet als universele natuurwet.</p>
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-4">
              {[
                ['Feb–apr', 'Vroege Oost-aanvoer', 'Cultivars komen niet tegelijk. Officiële minimumoogstdata in Chanthaburi liepen in 2026 uiteen van maart tot april.', 'Meer variatie per week'],
                ['Mei', 'Hoogste 2026-volume', 'Chanthaburi verwachtte het grootste volume in mei. Dat vergroot keuze, maar maakt niet ieder stuk automatisch perfect rijp.', 'Sterkste eerste gok'],
                ['Jun–jul', 'Boomgaardvenster', 'TAT noemt mei–juli voor fruitroutes in Chanthaburi en Rayong. Openstelling en voorraad blijven per tuin verschillend.', 'Vooraf reserveren'],
                ['Daarna', 'Vraag naar herkomst', 'Bangkok kan fruit uit andere regio’s en gekoelde ketens aanbieden. Laat aanwezigheid niet hetzelfde betekenen als lokale piek.', 'Geen nationaal “uit”'],
              ].map(([period, title, text, cue], index) => (
                <article key={period} className={`flex min-h-[330px] flex-col rounded-2xl border p-6 ${index === 1 ? 'border-saffron/40 bg-[#fff4df] shadow-editorial-card' : 'border-jade/10 bg-white'}`}>
                  <p className="font-display text-[2rem] font-semibold text-saffron-dark">{period}</p>
                  <h3 className="mt-5 font-display text-[1.55rem] font-semibold leading-none text-jade">{title}</h3>
                  <p className="mt-4 text-xs font-medium leading-6 text-charcoal/66">{text}</p>
                  <p className="mt-auto border-t border-jade/10 pt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-jade/55">{cue}</p>
                </article>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-saffron/25 bg-[#fff4df] p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-4xl text-xs font-medium leading-6 text-charcoal/70"><strong className="text-jade">Festivalcheck:</strong> gebruik nooit een oude blogdatum als reisanker. Het officiële Rayong Fruit Festival 2026 vond bijvoorbeeld 21–24 mei plaats; een volgende editie kan andere data en locatie hebben. Zoek de provinciale of TAT-aankondiging van jouw reisjaar vóór je boekt.</p>
              <a href="https://thai.tourismthailand.org/Articles/fruits-festival-rayong-2026" target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 text-xs font-extrabold text-jade">2026-bron <ExternalLink size={14} className="text-saffron-dark" /></a>
            </div>
          </div>
        </section>

        <section id="soorten" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:items-end">
              <SectionHeading eyebrow="Cultivar × rijpheid" title="De soort is maar de helft van de smaak" description="Vraag nooit alleen om ‘de beste durian’. Dezelfde cultivar verandert van stevig en beheerst naar zachter, zoeter en aromatischer naarmate hij rijper wordt." />
              <div className="grid gap-3 sm:grid-cols-2">
                {['Mildere geur', 'Krachtiger aroma', 'Steviger vruchtvlees', 'Zachter en romiger'].map((label, index) => <div key={label} className="flex items-center gap-3 rounded-xl border border-jade/10 bg-white px-5 py-4"><span className={`h-3 w-3 rounded-full ${index % 2 ? 'bg-saffron' : 'bg-jade'}`} /><span className="text-xs font-extrabold text-jade">{label}</span></div>)}
              </div>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {cultivars.map((cultivar, index) => (
                <article key={cultivar.name} className="flex min-h-[390px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                  <div className="flex items-start justify-between gap-4"><span className="grid h-11 w-11 place-items-center rounded-full bg-jade font-display text-lg font-semibold text-saffron-light">0{index + 1}</span><span className="text-right text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{cultivar.thai}</span></div>
                  <h2 className="mt-6 font-display text-[1.8rem] font-semibold text-jade">{cultivar.name}</h2>
                  <p className="mt-4 text-xs font-medium leading-6 text-charcoal/66">{cultivar.profile}</p>
                  <div className="mt-auto space-y-3 border-t border-jade/10 pt-5"><p className="text-[10px] font-extrabold text-jade"><Check size={14} className="mr-2 inline text-saffron" />{cultivar.ask}</p><p className="text-[10px] font-medium leading-5 text-charcoal/55">{cultivar.firstTry}</p></div>
                </article>
              ))}
            </div>
            <div className="mt-8 grid gap-5 lg:grid-cols-[0.58fr_1.42fr] lg:items-stretch">
              <div className="rounded-2xl bg-jade p-7 text-white">
                <p className="eyebrow !text-saffron-light">De rijpheidsladder</p>
                <h2 className="font-display text-[2.6rem] font-semibold leading-[0.92]">Vraag hoe je het wilt voelen — niet alleen hoe het heet.</h2>
                <p className="mt-5 text-xs font-medium leading-6 text-white/68">Rijpheidstaal verschilt per verkoper. Laat daarom één compartiment openen of vraag om een bestaande portie voordat je een hele vrucht koopt.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  ['Steviger', 'Duidelijk gevormde partjes en een drogere beet. Het aroma kan beheerster voelen. “Stevig” is niet automatisch onrijp; vraag of de verkoper dit als eetrijp verkoopt.', 'Voor textuurzoekers'],
                  ['Romig', 'Zachter vruchtvlees dat gemakkelijker meegeeft en een vollere zoete indruk kan hebben. Dit is voor veel beginners een bruikbare middenkeuze.', 'Balans als start'],
                  ['Zeer rijp', 'Veel zachter, sterker geurend en vaak intenser zoet of hartig. Kies dit bewust en eet het direct; het is geen bewijs van hogere kwaliteit.', 'Voor intensiteit'],
                ].map(([title, text, cue], index) => <article key={title} className={`flex min-h-[280px] flex-col rounded-2xl border p-6 ${index === 1 ? 'border-saffron/35 bg-[#fff4df]' : 'border-jade/10 bg-white'}`}><p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">Niveau 0{index + 1}</p><h3 className="mt-4 font-display text-[1.65rem] font-semibold text-jade">{title}</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/66">{text}</p><p className="mt-auto border-t border-jade/10 pt-4 text-[9px] font-extrabold uppercase tracking-[0.12em] text-jade/50">{cue}</p></article>)}
              </div>
            </div>
          </div>
        </section>

        <section id="kopen" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div className="relative min-h-[500px] overflow-hidden rounded-[28px] shadow-editorial-lift sm:min-h-[640px]">
              <Image src="/images/redesign/durian-buying-guide.webp" alt="Fruitverkoper en reiziger vergelijken kleine porties durian op een markt" fill sizes="(max-width: 1024px) 100vw, 54vw" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-jade/94 via-jade/55 to-transparent p-7 pt-32 text-white"><p className="eyebrow !text-saffron-light">Laat eerst één vak openen</p><h2 className="max-w-xl font-display text-[3rem] font-semibold leading-[0.9] tracking-[-0.04em]">Een goede verkoper helpt je rijpheid kiezen.</h2></div>
            </div>
            <div>
              <SectionHeading eyebrow="Vijf checks aan de kraam" title="Koop wat je begrijpt" description={<>In Bangkok is <InlineLink href="/blog/chatuchak-weekend-market-food-guide/">Chatuchak voor eten</InlineLink> een brede marktbeleving; voor een overzichtelijke fruitkeuze ligt Or Tor Kor direct naast MRT Kamphaeng Phet. Geen markt garandeert vanzelf de beste prijs of perfecte portie.</>} />
              <ol className="mt-8 space-y-5">
                {[
                  ['Cultivar', 'Laat de naam aanwijzen of opschrijven; “premium” is geen cultivar.'],
                  ['Rijpheid', 'Vraag stevig, romig of zeer rijp en laat de verkoper beschrijven wat je krijgt.'],
                  ['Eenheid', 'Controleer hele vrucht per kilo of bakje met alleen vruchtvlees.'],
                  ['Gewicht', 'Kijk mee op de weegschaal en bevestig het totaal vóór openen.'],
                  ['Moment', 'Vraag wanneer de vrucht is geopend en eet een verse portie passend gekoeld of direct.'],
                ].map(([title, text], index) => <li key={title} className="grid grid-cols-[46px_1fr] gap-4"><span className="grid h-11 w-11 place-items-center rounded-full bg-[#fff0d5] text-sm font-extrabold text-saffron-dark">0{index + 1}</span><div><h3 className="text-sm font-extrabold text-jade">{title}</h3><p className="mt-1 text-xs font-medium leading-5 text-charcoal/64">{text}</p></div></li>)}
              </ol>
              <div className="mt-7 rounded-2xl border border-jade/10 bg-white p-5"><p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">Prijscheck in één zin</p><p className="mt-3 font-display text-[1.6rem] font-semibold leading-tight text-jade">“Is dit bedrag voor de hele vrucht, per kilo of voor dit bakje vruchtvlees?”</p></div>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:items-end">
              <SectionHeading
                eyebrow="Waar kopen in Bangkok?"
                title="Kies eerst de koopcontext"
                description={<>Bangkok geeft je keuze zonder boomgaardrit. Gebruik onze <InlineLink href="/blog/bangkok-public-transport-bts-mrt-tourist-guide-2026/">BTS- en MRT-gids</InlineLink> om de route te plannen, maar koop pas wanneer je weet waar je de portie mag opeten en hoe je daarna verder reist.</>}
              />
              <p className="max-w-3xl text-sm font-medium leading-7 text-charcoal/66">Geen verkooppunt wint op iedere vraag. Een versmarkt geeft gesprek en keuze, een supermarkt geeft vaak een duidelijk etiket en koeling, en een gespecialiseerde verkoper kan rijpheid beter toelichten. Vergelijk de concrete portie, niet alleen de reputatie van de plek.</p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                [MapPin, 'Or Tor Kor', 'Overzichtelijke versmarkt naast MRT Kamphaeng Phet, bruikbaar om meerdere fruitverkopers te vergelijken. Vraag per kraam dezelfde vier dingen: cultivar, rijpheid, prijsbasis en herkomst.', 'Beste voor vergelijken'],
                [ShoppingBasket, 'Lokale fruitverkoper', 'Sterk wanneer de verkoper een portie voor je opent en rijpheid kan afstemmen. Een drukke kraam is een signaal van omloop, geen automatische kwaliteitsgarantie.', 'Beste voor uitleg'],
                [PackageCheck, 'Supermarkt', 'Voorverpakte porties maken netto-inhoud en bewaren vaak duidelijker. Controleer verpakkingsmoment, koeling, beschadiging en waar je de durian daadwerkelijk mag eten.', 'Beste voor gemak'],
                [Sprout, 'Boomgaard', 'De meest directe herkomstervaring, maar alleen na bevestiging van opening, proefopzet, beschikbare cultivars en vervoer. Een “fruitbuffet” is niet iedere dag hetzelfde.', 'Beste voor context'],
              ].map(([Icon, title, text, cue]) => {
                const CardIcon = Icon as LucideIcon;
                return <article key={String(title)} className="flex min-h-[330px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#eef2ed] text-jade"><CardIcon size={20} strokeWidth={1.45} /></span><h3 className="mt-6 font-display text-[1.55rem] font-semibold leading-none text-jade">{String(title)}</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/66">{String(text)}</p><p className="mt-auto border-t border-jade/10 pt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{String(cue)}</p></article>;
              })}
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <SectionHeading eyebrow="Prijs zonder oud bedrag" title="Normaliseer vóór je vergelijkt" description="Een hele vrucht lijkt soms goedkoper omdat schil en zaden in het gewicht zitten. Een bakje vruchtvlees lijkt duurder per kilo, maar je betaalt voor openen, selectie en alleen het eetbare deel. Beide kunnen een logische keuze zijn." />
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                [Scale, 'Hele vrucht', 'Noteer prijs per kilogram, totaalgewicht en of de verkoper na openen iets doet wanneer het vruchtvlees niet aan de afgesproken rijpheid voldoet.', 'Schil telt mee'],
                [PackageCheck, 'Geopend bakje', 'Controleer netto-inhoud, cultivar, verpakkingsmoment en koeling. Vergelijk twee bakjes alleen wanneer de gewichten echt gelijk zijn.', 'Gemak kost mee'],
                [Clock3, 'Proeverij of buffet', 'Vergelijk duur, inbegrepen cultivars, openingsuren, reservering en verspillingregels. “Onbeperkt” zegt niets over wat die dag oogstrijp is.', 'Ervaring als prijs'],
              ].map(([Icon, title, text, cue], index) => {
                const CardIcon = Icon as LucideIcon;
                return <article key={String(title)} className={`flex min-h-[310px] flex-col rounded-2xl border p-6 ${index === 1 ? 'border-saffron/35 bg-[#fff4df]' : 'border-jade/10 bg-white'}`}><CardIcon size={22} strokeWidth={1.45} className="text-jade" /><h3 className="mt-6 font-display text-[1.6rem] font-semibold text-jade">{String(title)}</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/66">{String(text)}</p><p className="mt-auto border-t border-jade/10 pt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{String(cue)}</p></article>;
              })}
            </div>
          </div>
        </section>

        <section id="proeven" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="overflow-hidden rounded-[30px] bg-jade text-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[0.58fr_1.42fr]">
                <div className="p-8 sm:p-10 lg:p-12"><p className="eyebrow !text-saffron-light">Eerste keer?</p><h2 className="font-display text-[3.35rem] font-semibold leading-[0.88] tracking-[-0.04em]">Proef klein. Vergelijk eerlijk.</h2><p className="mt-6 text-sm font-medium leading-7 text-white/68">Begin met één of twee partjes, niet een hele vrucht of buffet. Je ontdekt sneller of je vooral textuur, zoetheid of aroma waardeert — en voorkomt dat “koning der vruchten” een eetopdracht wordt.</p></div>
                <div className="grid gap-px bg-white/10 sm:grid-cols-4">
                  {[
                    [PackageCheck, 'Klein bakje', 'Bestel een portie die je ter plekke kunt opeten.'],
                    [Eye, 'Kijk eerst', 'Vergelijk kleur en structuur zonder ze als kwaliteitsgarantie te zien.'],
                    [Utensils, 'Eén hap', 'Laat de smaak even staan vóór een tweede cultivar.'],
                    [ShoppingBasket, 'Afval terug', 'Gebruik het afvalpunt van de verkoper voor schil en zaden.'],
                  ].map(([Icon, title, text]) => {
                    const CardIcon = Icon as LucideIcon;
                    return <article key={String(title)} className="flex min-h-[310px] flex-col bg-jade p-6 sm:py-9"><CardIcon size={23} strokeWidth={1.4} className="text-saffron-light" /><h3 className="mt-6 font-display text-[1.55rem] font-semibold leading-none">{String(title)}</h3><p className="mt-4 text-xs font-medium leading-6 text-white/64">{String(text)}</p><ArrowRight size={16} className="mt-auto text-saffron-light" /></article>;
                  })}
                </div>
              </div>
            </div>
            <div className="mt-8 grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">
              <article className="rounded-2xl border border-saffron/25 bg-[#fff4df] p-7"><p className="eyebrow">Smaak zonder clichés</p><h3 className="font-display text-[2rem] font-semibold leading-tight text-jade">Niet “lekker of vies”, maar romig, zoet, hartig en aromatisch.</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/66">Vraag jezelf af welke eigenschap je proeft. Dat maakt een vergelijking nuttiger dan het populaire spelletje om de geur zo extreem mogelijk te beschrijven.</p></article>
              <article className="rounded-2xl border border-jade/10 bg-white p-7"><p className="text-sm font-extrabold text-jade">Niet meenemen als souvenir zonder controle</p><p className="mt-3 text-xs font-medium leading-6 text-charcoal/66">Vers fruit kan onder regels van hotel, vervoerder, luchtvaartmaatschappij én bestemmingsland vallen. Verwerkte chips of snoep zijn logistiek eenvoudiger, maar controleer ingrediënten, verpakking en invoerregels. Koop geen vers fruit voor je koffer op basis van alleen een verkopersbelofte.</p></article>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-end">
              <SectionHeading
                eyebrow="Van openen tot laatste hap"
                title="Maak versheid zichtbaar, niet mystiek"
                description={<>Een geurtest of perfecte kleur kan voedselveiligheid niet bewijzen. Gebruik dezelfde nuchtere keuzes als bij andere verse producten. Onze <InlineLink href="/blog/thai-street-food-guide-2026/">Thaise streetfoodgids</InlineLink> geeft de bredere context voor omloop, temperatuur en schone bereiding.</>}
              />
              <p className="max-w-3xl text-sm font-medium leading-7 text-charcoal/66">Een hele vrucht beschermt het vruchtvlees totdat ze wordt geopend; daarna worden tijd, temperatuur en hantering belangrijk. Koop daarom niet vroeg op de dag een bakje dat uren in hitte of bagage blijft. Proef wanneer je echt kunt eten, kies een verkooppunt met passende koeling voor voorverpakt fruit en laat twijfel niet oplossen door alleen harder te ruiken.</p>
            </div>
            <div className="relative mt-10">
              <div className="pointer-events-none absolute left-[7%] right-[7%] top-9 hidden border-t-2 border-dashed border-saffron/55 lg:block" />
              <div className="relative grid gap-4 lg:grid-cols-4">
                {[
                  ['01', 'Kies', 'Beslis cultivar, rijpheid en portiegrootte voordat een hele vrucht speciaal voor jou wordt geopend.'],
                  ['02', 'Kijk mee', 'Controleer een schone werkplek, intact vruchtvlees, het afgesproken gewicht en de uiteindelijke prijs.'],
                  ['03', 'Eet direct', 'Gebruik een tasting pick of schone handen en deel alleen wanneer iedereen dezelfde hygiëneafspraak volgt.'],
                  ['04', 'Laat achter', 'Lever schil, zaden en verpakking in bij het aangewezen afvalpunt; neem geur en afval niet mee je volgende rit in.'],
                ].map(([number, title, text]) => <article key={number} className="min-h-[270px] rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="grid h-[72px] w-[72px] place-items-center rounded-full border border-saffron/35 bg-canvas font-display text-xl font-semibold text-jade">{number}</span><h3 className="mt-6 font-display text-[1.55rem] font-semibold text-jade">{title}</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/66">{text}</p></article>)}
              </div>
            </div>
          </div>
        </section>

        <section id="boomgaard" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="relative overflow-hidden rounded-[30px] bg-jade shadow-editorial-lift">
              <div className="relative min-h-[360px] sm:min-h-[420px]"><Image src="/images/redesign/durian-orchard-route.webp" alt="Natte landweg langs fruitboomgaarden en een durianstalletje in Chanthaburi" fill sizes="100vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-jade/94 via-jade/62 to-transparent" /></div>
              <div className="absolute inset-0 flex max-w-[660px] flex-col justify-center p-8 text-white sm:p-12">
                <p className="eyebrow !text-saffron-light">Van Bangkok naar de bron</p>
                <h2 className="font-display text-[3.2rem] font-semibold leading-[0.88] tracking-[-0.04em] sm:text-[4rem]">Maak van Chanthaburi geen gehaaste dagtrip.</h2>
                <p className="mt-5 max-w-xl text-sm font-medium leading-7 text-white/72">De rit, boomgaarduren en tropische regen verdienen marge. Combineer één vooraf bevestigde tuin met stad, markt of kust en blijf overnachten als fruit de hoofdreden voor je reis is.</p>
                <Link href="/city/chanthaburi/" className="btn-jade btn-jade-pattern mt-7 w-fit border border-white/20 px-6">Plan Chanthaburi <ArrowRight size={16} className="text-saffron" /></Link>
              </div>
            </div>
            <div className="mt-8 grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">
              <SectionHeading eyebrow="Twee dagen, één goede proefsessie" title="Fruitroute met ademruimte" description={<>Gebruik onze gids voor <InlineLink href="/city/chanthaburi/food/">eten in Chanthaburi</InlineLink> als lokale basis; bel of bericht een boomgaard altijd vooraf over opening, cultivar, proefformule en taal.</>} />
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ['Dag 1', 'Aankomst & markt', 'Reis zonder vroege boomgaarddeadline. Verken Chanthaburi, vergelijk fruit bij een markt en noteer welke cultivar en rijpheid je morgen wilt proberen.'],
                  ['Dag 2', 'Boomgaard & vertrek', 'Ga vroeg naar één bevestigde tuin, proef beheerst en plan een droge reserveactiviteit. Vertrek pas wanneer je geen geopende durian hoeft mee te nemen.'],
                ].map(([day, title, text]) => <article key={day} className="rounded-2xl border border-jade/10 bg-white p-7 shadow-editorial-card"><p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">{day}</p><h3 className="mt-3 font-display text-[1.75rem] font-semibold text-jade">{title}</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/66">{text}</p></article>)}
              </div>
            </div>
          </div>
        </section>

        <section id="regels" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-start">
            <SectionHeading eyebrow="Geur reist verder dan jij" title="Controleer de volgende deur vóór je koopt" description="‘Durian is overal verboden’ is te grof. Eén regel kunnen we hard onderbouwen: BTS verbiedt voorwerpen die een slechte of aanstootgevende geur afgeven. Voor de rest controleer je de specifieke aanbieder." />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                [TrainFront, 'BTS', 'Neem geen geopende of sterk ruikende durian mee in het systeem; eten is in betaald gebied eveneens verboden.', 'Officiële regel'],
                [Hotel, 'Hotel', 'Vraag receptie vóór aankoop. Een afgesloten bakje kan nog steeds tegen het huisreglement ingaan.', 'Per accommodatie'],
                [Map, 'Taxi, bus, MRT', 'Vraag de chauffeur of operator en volg borden. Verpak geur niet als argument dat meenemen automatisch mag.', 'Per vervoerder'],
                [PackageCheck, 'Vlucht & grens', 'Controleer airline, luchthaven en invoerland voor vers of verwerkt fruit. Regels kunnen routeafhankelijk zijn.', 'Per route'],
              ].map(([Icon, title, text, cue]) => {
                const CardIcon = Icon as LucideIcon;
                return <article key={String(title)} className="flex min-h-[320px] flex-col rounded-2xl border border-jade/10 bg-white p-6"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#eef2ed] text-jade"><CardIcon size={20} strokeWidth={1.45} /></span><h3 className="mt-6 font-display text-[1.55rem] font-semibold text-jade">{String(title)}</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">{String(text)}</p><p className="mt-auto border-t border-jade/10 pt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{String(cue)}</p></article>;
              })}
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-14 lg:py-20">
          <div className="container-custom">
            <div className="rounded-[28px] bg-jade p-8 text-white shadow-editorial-lift sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-12">
              <div className="max-w-3xl"><p className="eyebrow !text-saffron-light">Blijf je slapen in Chanthaburi?</p><h2 className="font-display text-[2.8rem] font-semibold leading-[0.92] tracking-[-0.035em]">Vergelijk locatie op je boomgaardroute, niet alleen op kamerprijs.</h2><p className="mt-4 text-sm font-medium leading-7 text-white/68">Controleer reistijd naar je bevestigde tuin, parkeren of transfer, en het durianbeleid van de accommodatie vóór je fruit koopt. Een overnachting maakt de route rustiger; ze is niet noodzakelijk als Bangkok je enige proefplek is.</p></div>
              <a href={hotelHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-cream mt-7 shrink-0 px-7 text-saffron-dark lg:mt-0">Vergelijk hotels via Trip.com <ExternalLink size={15} /></a>
            </div>
            <AffiliateDisclosure className="mt-3">Affiliate-link: boek je via deze link, dan kan Go2Thailand commissie ontvangen zonder extra kosten voor jou. Controleer locatie, actuele prijs, voorwaarden en het fruit-/geurbeleid rechtstreeks bij de accommodatie.</AffiliateDisclosure>
          </div>
        </section>

        <FaqSplitSection id="vragen" eyebrow="Echte vragen uit de zoekresultaten" title="Veelgestelde vragen over durian in Thailand" description="De antwoorden scheiden actuele regionale feiten van smaak, prijs en beleid dat je aan de kraam of bij de vervoerder moet controleren." items={faqs} />

        <RelatedGuidesSection
          eyebrow="Bouw je fruitreis verder"
          title="Van markt naar Oost-Thailand"
          guides={[
            { title: 'Chanthaburi compleet', description: 'Plan stad, fruit, kust en vervoer als één rustige destinationroute.', href: '/city/chanthaburi/', image: '/images/redesign/chanthaburi-hero.webp' },
            { title: 'Fruit & eten in Chanthaburi', description: 'Plan lokale markten, fruitcontext en andere regionale smaken rond je boomgaarddag.', href: '/city/chanthaburi/food/', image: '/images/redesign/chanthaburi-fruit-food.webp' },
            { title: 'Eten op Chatuchak', description: 'Combineer marktbezoek met een foodroute en de nabijgelegen Or Tor Kor-zone.', href: '/blog/chatuchak-weekend-market-food-guide/', image: '/images/redesign/chatuchak-food-hero.webp' },
          ]}
        />

        <SourceMethodSection
          title="Regionale data boven een universele kalender"
          description="DFS bepaalde de Nederlandse zoekvragen, PAA en SERP-gaten. Seizoen, cultivar en BTS-regels zijn teruggebracht naar Thaise overheids-, ambassade-, TAT- en operatorbronnen. Oude bronprijzen en ongeverifieerde festivals of buffetten zijn niet overgenomen. Laatst gecontroleerd: 25 juli 2026."
          sources={sources}
        />
      </main>
    </>
  );
}
