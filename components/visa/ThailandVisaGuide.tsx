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
  MapPinned,
  MonitorCheck,
  PlaneTakeoff,
  RefreshCw,
  Route,
  ShieldCheck,
  Smartphone,
  Users,
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

const sectionNav = [
  { href: '#kort-antwoord' as const, label: 'Nu geldig', icon: ShieldCheck },
  { href: '#keuzehulp' as const, label: 'Keuzehulp', icon: CalendarClock },
  { href: '#documenten' as const, label: 'Documenten', icon: FileCheck2 },
  { href: '#tdac' as const, label: 'TDAC', icon: Smartphone },
  { href: '#visumroutes' as const, label: 'Visumroutes', icon: Route },
  { href: '#vragen' as const, label: 'Vragen', icon: CircleAlert },
];

type DurationKey = 'short' | 'medium' | 'extended' | 'longstay';

const durationOptions: Array<{
  key: DurationKey;
  label: string;
  eyebrow: string;
  title: string;
  verdict: string;
  detail: string;
  steps: string[];
  link?: { href: string; label: string };
}> = [
  {
    key: 'short',
    label: '1–30 dagen',
    eyebrow: 'Robuuste vakantieroute',
    title: 'Geen visum vooraf voor een Nederlands paspoort.',
    verdict: 'Deze reisduur past zowel binnen de huidige 60-dagenvrijstelling als binnen de aangekondigde 30-dagenroute.',
    detail: 'Je hebt wel een geldig paspoort, bewijs van vertrek en voor iedere binnenkomst een nieuwe TDAC nodig. De immigratieambtenaar beslist uiteindelijk over toelating.',
    steps: ['Paspoort minimaal 6 maanden geldig bij aankomst', 'Retour- of doorreisticket beschikbaar', 'TDAC binnen het toegestane driedagenvenster'],
  },
  {
    key: 'medium',
    label: '31–60 dagen',
    eyebrow: 'Controlepunt vóór boeken',
    title: 'Nu visumvrij; aangekondigde wijziging kan dit raken.',
    verdict: 'NederlandWereldwijd vermeldt bij onze broncontrole nog maximaal 60 dagen zonder visum voor een Nederlands paspoort.',
    detail: 'Thailand heeft een terugkeer naar 30 dagen goedgekeurd, maar koppelt de ingangsdatum aan publicatie in de Royal Gazette. Controleer de live regel vlak vóór ticketing én vertrek.',
    steps: ['Open NederlandWereldwijd opnieuw', 'Controleer de Thaise ambassade in Den Haag', 'Kies zo nodig tijdig de toeristenvisumroute'],
    link: { href: '/visa/tourist-visa/', label: 'Bekijk het toeristenvisum' },
  },
  {
    key: 'extended',
    label: '61–90 dagen',
    eyebrow: 'Geen standaard vakantievrijstelling',
    title: 'Plan vooraf een visum- of verlengingsroute.',
    verdict: 'Ga niet uit van “60 dagen plus automatisch 30”. Een verlenging is een aanvraag en blijft ter beoordeling van immigratie.',
    detail: 'Een toeristenvisum kan beter passen dan vertrekken met de hoop later te verlengen. Controleer categorie, bewijsstukken en geldigheid via het officiële e-Visa-systeem.',
    steps: ['Selecteer een passend visum vóór vertrek', 'Vraag alleen aan vanuit het land waar je verblijft', 'Bewaar toelating en uiterste vertrekdatum afzonderlijk'],
    link: { href: '/visa/tourist-visa/', label: 'Vergelijk toeristenvisa' },
  },
  {
    key: 'longstay',
    label: 'Werk of lang verblijf',
    eyebrow: 'Doel bepaalt de categorie',
    title: 'Gebruik geen toeristenvrijstelling als verblijfsstrategie.',
    verdict: 'Remote werk, studie, pensioen en langdurig verblijf hebben ieder een eigen bewijs- en visumroute.',
    detail: 'Start bij je echte reisdoel. Vergelijk daarna pas DTV, Education, Non-Immigrant of LTR. Go2Thailand is geen visumdienst en garandeert geen toelating.',
    steps: ['Omschrijf doel en verblijfsduur', 'Open de officiële e-Visa-keuzehulp', 'Controleer financiële en documentvereisten per categorie'],
    link: { href: '/visa/digital-nomad-visa/', label: 'Bekijk DTV als vertrekpunt' },
  },
];

const requiredItems = [
  { icon: BookOpenCheck, title: 'Geldig paspoort', text: 'Voor Nederlandse reizigers minimaal zes maanden geldig bij aankomst en niet beschadigd.' },
  { icon: PlaneTakeoff, title: 'Bewijs van vertrek', text: 'Zorg dat je kunt aantonen dat je Thailand binnen je toegestane verblijfsduur weer verlaat.' },
  { icon: Hotel, title: 'Eerste verblijfsadres', text: 'Hotel- of accommodatieadres klaarzetten voor je TDAC en aankomst.' },
  { icon: Smartphone, title: 'Nieuwe TDAC per binnenkomst', text: 'Ook voor kinderen; alleen niet nodig bij transit zonder immigratie te passeren.' },
];

const visaRoutes = [
  { icon: PlaneTakeoff, eyebrow: 'Vakantie of meerdere entrees', title: 'Tourist Visa', text: 'Voor een langer toeristisch verblijf of wanneer je vooraf duidelijkheid wilt over je toegestane route.', href: '/visa/tourist-visa/' },
  { icon: BriefcaseBusiness, eyebrow: 'Remote werk & soft power', title: 'Destination Thailand Visa', text: 'Een langverblijfroute met eigen toelatingsvoorwaarden; geen vrijbrief voor ieder soort werk.', href: '/visa/digital-nomad-visa/' },
  { icon: GraduationCap, eyebrow: 'Studie', title: 'Education Visa', text: 'Voor erkende onderwijsdoelen met bewijs van de onderwijsinstelling en bijbehorende voorwaarden.', href: '/visa/education-visa/' },
  { icon: Users, eyebrow: 'Pensioen of familie', title: 'Non-Immigrant routes', text: 'Leeftijd, relatie, financiële eisen en verzekeringsvoorwaarden verschillen per subcategorie.', href: '/visa/retirement-visa/' },
];

const faqs = [
  { question: 'Heb ik een visum nodig voor Thailand?', answer: 'Bij de broncontrole op 24 juli 2026 vermeldt NederlandWereldwijd dat je met een Nederlands paspoort voor maximaal 60 dagen geen visum nodig hebt. Thailand heeft een wijziging naar 30 dagen goedgekeurd, maar die wordt pas van kracht na de vereiste formele publicatie en termijn. Controleer daarom vlak voor vertrek opnieuw de live bron.' },
  { question: 'Hoe lang mag je in Thailand verblijven zonder visum?', answer: 'Voor Nederlandse paspoorthouders vermeldt de actuele Nederlandse overheidsbron bij onze controle maximaal 60 dagen. De stempel bij aankomst bevat je uiterste vertrekdatum. Een aangekondigde terugkeer naar 30 dagen is nog geen reden om zelf een ingangsdatum te verzinnen; de officiële publicatie is leidend.' },
  { question: 'Welke documenten heb je nodig om naar Thailand te reizen?', answer: 'Neem een onbeschadigd Nederlands paspoort mee dat bij aankomst nog minimaal zes maanden geldig is. Je moet je vertrek binnen de toegestane periode kunnen aantonen en je vult binnen drie dagen inclusief de aankomstdag een TDAC in. Kinderen hebben een eigen paspoort en TDAC nodig.' },
  { question: 'Hoe lang van tevoren kun je de TDAC invullen?', answer: 'De officiële TDAC-FAQ zegt dat indienen kan binnen drie dagen vóór aankomst, waarbij de aankomstdag meetelt. “Vijf tot zeven dagen vooraf” is dus onjuist. Verzamel je paspoort-, vlucht- en adresgegevens eerder, maar dien pas in wanneer het officiële venster open is.' },
  { question: 'Is de TDAC gratis?', answer: 'Ja. Gebruik uitsluitend het officiële domein tdac.immigration.go.th. De TDAC is een aankomstformulier, geen visum, en je hebt voor iedere nieuwe binnenkomst een nieuwe kaart nodig.' },
  { question: 'Wat zijn de nieuwe visumregels voor Thailand?', answer: 'Thailand keurde op 19 mei 2026 een herziening goed waarbij de brede 60-dagenvrijstelling wordt vervangen door nieuwe categorieën, waaronder 30 dagen voor Nederland. De Thaise publicatie vermeldt dat dit pas ingaat vijftien dagen na publicatie van de uitvoeringsregels in de Royal Gazette. Tot die formele ingangsdatum blijft de actuele reisbron leidend.' },
];

export default function ThailandVisaGuide() {
  const [duration, setDuration] = useState<DurationKey>('short');
  const selected = useMemo(() => durationOptions.find((item) => item.key === duration) ?? durationOptions[0], [duration]);
  const tripHref = withPlacementSubId(TRIP_GENERIC, 'nl-thailand-visa', 'first-stay-address');
  const transportHref = withPlacementSubId(TWELVEGO_GENERIC, 'nl-thailand-visa', 'onward-travel');

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
  };
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Visum Thailand voor Nederlanders: actuele regels en TDAC',
    description: 'Beslisgids voor Nederlandse reizigers over visumvrij verblijf, paspoort, TDAC, bewijs van vertrek en langere visumroutes.',
    url: 'https://go2-thailand.com/nl/visa/',
    inLanguage: 'nl-NL',
    dateModified: '2026-07-24',
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://go2-thailand.com/nl/' },
      { '@type': 'ListItem', position: 2, name: 'Visum Thailand', item: 'https://go2-thailand.com/nl/visa/' },
    ],
  };

  return (
    <>
      <SEOHead
        title="Visum Thailand: regels voor Nederlanders | Go2Thailand"
        description="Heb je een visum nodig voor Thailand? Bekijk de actuele regel voor Nederlanders, paspoorteisen, TDAC, bewijs van vertrek en langere visumroutes."
        ogImage="https://go2-thailand.com/images/redesign/thailand-visa-hero.webp"
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </SEOHead>

      <main className="bg-canvas text-charcoal">
        <EditorialHero
          image="/images/redesign/thailand-visa-hero.webp"
          imageAlt="Reiziger controleert telefoon en reisdocumenten voor vertrek naar Thailand"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Visum & inreisregels' }]}
          eyebrow="Controleer de regel, dan je documenten"
          title={<>Visum voor<br /><span className="text-saffron">Thailand?</span></>}
          subtitle="Voor Nederlanders nu tot 60 dagen visumvrij. Maar er is een wijziging aangekondigd."
          description="Bekijk eerst wat formeel geldt op jouw vertrekdatum. Regel daarna paspoort, bewijs van vertrek en TDAC — in die volgorde."
          actions={[
            { label: 'Doe de reisduurcheck', href: '#keuzehulp', kind: 'primary' },
            { label: 'Bekijk de huidige regel', href: '#kort-antwoord', kind: 'secondary' },
          ]}
          minHeightClassName="min-h-[720px] lg:min-h-[710px]"
          titleClassName="max-w-[650px] text-[4.25rem] leading-[0.84] !text-white sm:text-[5.6rem] lg:text-[6.25rem]"
          subtitleClassName="max-w-[650px] !text-white"
          descriptionClassName="mt-4 max-w-[590px] text-sm leading-7 !text-white/80"
          imageClassName="object-cover object-[70%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(4,42,34,0.2)_0%,rgba(4,42,34,0.46)_44%,rgba(4,42,34,0.97)_100%)] lg:bg-[linear-gradient(90deg,rgba(4,42,34,0.99)_0%,rgba(4,42,34,0.94)_42%,rgba(4,42,34,0.14)_67%,rgba(4,42,34,0.02)_100%)]"
          contentClassName="max-w-[700px] [&_nav]:!text-white/60 [&_nav_span]:!text-white/75"
          sideCard={
            <div className="absolute bottom-8 right-[max(2rem,calc((100vw-1280px)/2))] z-10 hidden w-[320px] rounded-2xl border border-white/25 bg-jade/80 p-5 text-white shadow-editorial-card backdrop-blur-lg xl:block">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">Broncontrole · 24 juli 2026</p>
              <p className="mt-3 font-display text-2xl font-semibold leading-tight">Nu: 60 dagen. Aangekondigd: 30 dagen, ingangsdatum nog formeel te bevestigen.</p>
              <div className="mt-4 flex items-center gap-3 border-t border-white/12 pt-4 text-[10px] font-semibold text-white/58"><RefreshCw size={16} className="text-saffron-light" />Controleer opnieuw vóór boeken en vertrek.</div>
            </div>
          }
        />

        <PageSectionNav items={sectionNav} />

        <section id="kort-antwoord" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom">
            <SectionHeading
              eyebrow="Voor een Nederlands paspoort"
              title="Dit moet nu op vier punten kloppen."
              description="De toelating blijft altijd een beslissing van de Thaise immigratiedienst. Deze vier punten vormen wel je praktische basis."
            />
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {requiredItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                    <div className="flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/30 bg-canvas text-jade"><Icon size={20} /></span>
                      <span className="font-display text-4xl font-semibold text-jade/10">0{index + 1}</span>
                    </div>
                    <h2 className="mt-5 font-display text-[1.8rem] font-semibold text-jade">{item.title}</h2>
                    <p className="mt-3 text-xs font-medium leading-5 text-charcoal/60">{item.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-16 lg:py-24">
          <div className="container-custom">
            <div className="relative min-h-[650px] overflow-hidden rounded-[30px] shadow-editorial-lift lg:min-h-[610px]">
              <Image
                src="/images/redesign/thailand-visa-rule-watch.webp"
                alt="Twee reisroutes in een Thaise aankomsthal: de huidige regel en een aangekondigde wijziging"
                fill
                sizes="100vw"
                className="object-cover object-[66%_center] lg:object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-jade via-jade/45 to-transparent lg:bg-gradient-to-r lg:from-jade lg:via-jade/72 lg:to-transparent" />
              <div className="absolute inset-x-6 bottom-7 max-w-[620px] text-white sm:inset-x-10 sm:bottom-10 lg:inset-y-0 lg:left-12 lg:flex lg:w-[46%] lg:items-center">
                <div>
                  <p className="eyebrow !text-saffron-light">Regelstatus, geen nieuwskop</p>
                  <h2 className="font-display text-[3.2rem] font-semibold leading-[0.88] tracking-[-0.035em] sm:text-[4rem]">Wat geldt en wat is alleen aangekondigd?</h2>
                  <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    <article className="rounded-2xl border border-white/18 bg-white/[0.09] p-5 backdrop-blur-md">
                      <span className="inline-flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-light"><Check size={14} /> Nu gepubliceerd</span>
                      <p className="mt-3 text-sm font-extrabold leading-5">NederlandWereldwijd: maximaal 60 dagen visumvrij voor een Nederlands paspoort.</p>
                    </article>
                    <article className="rounded-2xl border border-saffron/35 bg-jade/74 p-5 backdrop-blur-md">
                      <span className="inline-flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-light"><CalendarClock size={14} /> Wel goedgekeurd</span>
                      <p className="mt-3 text-sm font-extrabold leading-5">Terug naar 30 dagen, maar pas effectief na formele publicatie en de genoemde termijn.</p>
                    </article>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <a href="https://www.nederlandwereldwijd.nl/reisadvies/thailand" target="_blank" rel="noopener noreferrer" className="btn-cream">Controleer de actuele NL-bron <ExternalLink size={15} /></a>
                    <a href="https://www.mfa.go.th/en/content/summary-press-briefing-190526" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-4 py-3 text-xs font-extrabold text-white transition hover:bg-white/10">Lees de Thaise aankondiging <ExternalLink size={14} /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="keuzehulp" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading
              eyebrow="Kies je echte verblijfsduur"
              title="Welke inreisroute past bij jouw plan?"
              description="De keuzehulp gebruikt een Nederlands paspoort en toeristisch vertrek als uitgangspunt. Voor een andere nationaliteit, werkdoel of verblijfsland controleer je de officiële route afzonderlijk."
            />
            <div className="mt-10 overflow-hidden rounded-[30px] border border-jade/10 bg-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
                <div className="bg-jade p-6 text-white sm:p-9">
                  <p className="eyebrow !text-saffron-light">Jouw reisduur</p>
                  <div className="mt-6 grid gap-2">
                    {durationOptions.map((option) => {
                      const active = duration === option.key;
                      return (
                        <button
                          key={option.key}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setDuration(option.key)}
                          className={`flex min-h-14 items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-extrabold transition ${active ? 'border-saffron/60 bg-white text-jade' : 'border-white/12 bg-white/[0.05] text-white hover:bg-white/10'}`}
                        >
                          {option.label}
                          <ArrowRight size={16} className={active ? 'text-saffron' : 'text-white/45'} />
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-6 border-t border-white/12 pt-5 text-[10px] font-medium leading-5 text-white/55">Geen persoonlijk juridisch of immigratieadvies. De officiële bron en immigratiebeslissing blijven leidend.</p>
                </div>
                <div className="p-6 sm:p-9 lg:p-11" aria-live="polite">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">{selected.eyebrow}</p>
                  <h2 className="mt-3 max-w-3xl font-display text-[2.8rem] font-semibold leading-[0.92] tracking-[-0.035em] text-jade sm:text-[3.6rem]">{selected.title}</h2>
                  <p className="mt-6 rounded-2xl border border-saffron/25 bg-canvas p-5 text-sm font-extrabold leading-6 text-jade">{selected.verdict}</p>
                  <p className="mt-5 max-w-3xl text-sm font-medium leading-7 text-charcoal/65">{selected.detail}</p>
                  <div className="mt-7 grid gap-3 sm:grid-cols-3">
                    {selected.steps.map((step, index) => (
                      <div key={step} className="rounded-xl border border-jade/10 bg-mist/45 p-4">
                        <span className="grid h-7 w-7 place-items-center rounded-full bg-jade font-display text-sm font-semibold text-white">{index + 1}</span>
                        <p className="mt-3 text-[11px] font-extrabold leading-5 text-jade">{step}</p>
                      </div>
                    ))}
                  </div>
                  {selected.link && <Link href={selected.link.href} className="mt-7 inline-flex items-center gap-2 text-xs font-extrabold text-jade">{selected.link.label} <ArrowRight size={14} className="text-saffron" /></Link>}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="documenten" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading
              eyebrow="Eén set vóór je incheckt"
              title="Leg paspoort, vertrek en eerste adres naast elkaar."
              description="Zo voorkom je dat een hoteladres, vluchtnummer of afwijkende schrijfwijze pas tijdens het TDAC-formulier boven water komt."
            />
            <div className="mt-10 overflow-hidden rounded-[30px] border border-jade/10 bg-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
                <div className="relative min-h-[520px] lg:min-h-[620px]">
                  <Image
                    src="/images/redesign/thailand-entry-documents.webp"
                    alt="Paspoort, telefoon, reisbewijs en eerste hoteladres als voorbereide documentenset"
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover object-[35%_center]"
                  />
                </div>
                <div className="bg-jade p-7 text-white sm:p-10 lg:p-12">
                  <p className="eyebrow !text-saffron-light">De aankomstmap</p>
                  <h2 className="font-display text-[3.4rem] font-semibold leading-[0.88] tracking-[-0.035em]">Vier gegevens, één consistente reis.</h2>
                  <div className="mt-7 grid gap-3">
                    {[
                      'Naam exact zoals in het paspoort',
                      'Aankomstdatum en vlucht- of voertuignummer',
                      'Adres van je eerste verblijf in Thailand',
                      'Bewijs van retour of doorreis binnen je termijn',
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-xl border border-white/14 bg-white/[0.06] px-4 py-3">
                        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-saffron text-jade"><Check size={13} /></span>
                        <span className="text-xs font-extrabold leading-5">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    <a href={tripHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-xl border border-white/18 bg-white/[0.08] p-4 transition hover:bg-white/[0.12]"><Hotel size={18} className="text-saffron-light" /><strong className="mt-3 block text-xs">Eerste verblijf vergelijken</strong><span className="mt-1 block text-[10px] text-white/55">Via Trip.com</span></a>
                    <a href={transportHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-xl border border-white/18 bg-white/[0.08] p-4 transition hover:bg-white/[0.12]"><PlaneTakeoff size={18} className="text-saffron-light" /><strong className="mt-3 block text-xs">Echte doorreis plannen</strong><span className="mt-1 block text-[10px] text-white/55">Via 12Go</span></a>
                  </div>
                  <AffiliateDisclosure className="mt-4 !border-white/12 !bg-white/[0.05] !text-white/55">Trip.com en 12Go zijn affiliate-links. Gebruik alleen echte boekingen die bij je reisplan passen; Go2Thailand verkoopt geen visum- of onward-ticketconstructies.</AffiliateDisclosure>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="tdac" className="section-divider-bottom scroll-mt-24 bg-mist py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="Aankomstkaart, geen visum"
                title="TDAC: gratis en pas binnen drie dagen invullen."
                description="De officiële termijn omvat de aankomstdag. Verzamel je gegevens eerder, maar trap niet in betaalde tussenpartijen of adviezen om vijf tot zeven dagen vooraf in te dienen."
              />
              <a href="https://tdac.immigration.go.th/" target="_blank" rel="noopener noreferrer" className="btn-jade mt-7">Open alleen de officiële TDAC <ExternalLink size={15} className="text-saffron-light" /></a>
              <Link href="/visa/digital-arrival-card/" className="mt-4 inline-flex items-center gap-2 text-xs font-extrabold text-jade">Bekijk de volledige invulgids <ArrowRight size={14} className="text-saffron" /></Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: CalendarClock, label: 'Wanneer', title: 'Binnen drie dagen', text: 'De aankomstdag telt mee. Het formulier is niet bedoeld om weken vooraf in te dienen.' },
                { icon: Users, label: 'Voor wie', title: 'Iedere niet-Thaise reiziger', text: 'Ook kinderen en baby’s hebben een eigen TDAC-record nodig.' },
                { icon: RefreshCw, label: 'Hoe vaak', title: 'Iedere binnenkomst opnieuw', text: 'Een eerdere kaart opnieuw gebruiken kan niet; de verwachte aankomstdatum hoort bij die ene entry.' },
                { icon: MonitorCheck, label: 'Uitzondering', title: 'Transit zonder immigratie', text: 'Passeer je immigratie niet, dan vermeldt de officiële FAQ dat TDAC niet nodig is.' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                    <div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/30 bg-canvas text-jade"><Icon size={20} /></span><span className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{item.label}</span></div>
                    <h2 className="mt-5 font-display text-[1.8rem] font-semibold leading-tight text-jade">{item.title}</h2>
                    <p className="mt-3 text-xs font-medium leading-5 text-charcoal/60">{item.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="visumroutes" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading
              eyebrow="Langer blijven of ander reisdoel"
              title="Begin bij je doel, niet bij de populairste visumnaam."
              description="De detailpagina’s helpen vergelijken; de Thaise e-Visa-keuze en ambassadevoorwaarden bepalen welke categorie je daadwerkelijk kunt aanvragen."
            />
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {visaRoutes.map((route) => {
                const Icon = route.icon;
                return (
                  <Link key={route.title} href={route.href} className="group flex min-h-[310px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card transition hover:-translate-y-1 hover:shadow-editorial-lift">
                    <div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/30 bg-canvas text-jade"><Icon size={20} /></span><ArrowRight size={16} className="text-saffron transition group-hover:translate-x-1" /></div>
                    <p className="mt-6 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{route.eyebrow}</p>
                    <h2 className="mt-2 font-display text-[1.85rem] font-semibold leading-tight text-jade">{route.title}</h2>
                    <p className="mt-3 text-xs font-medium leading-5 text-charcoal/60">{route.text}</p>
                    <span className="mt-auto pt-6 text-[10px] font-extrabold text-jade">Bekijk voorwaarden</span>
                  </Link>
                );
              })}
            </div>
            <a href="https://thaievisa.go.th/" target="_blank" rel="noopener noreferrer" className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-jade/10 bg-jade px-5 py-4 text-white shadow-editorial-card">
              <span><strong className="block text-sm">Gebruik de officiële Thai e-Visa-route</strong><span className="mt-1 block text-[10px] font-medium text-white/55">Controleer categorie, aanvraaglocatie en documentlijst op de overheidswebsite.</span></span>
              <ExternalLink size={17} className="shrink-0 text-saffron-light" />
            </a>
          </div>
        </section>

        <section className="section-divider-bottom bg-tonal py-16 lg:py-24">
          <div className="container-custom grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <SectionHeading
              eyebrow="Voor vertrek in de juiste volgorde"
              title="Een korte planning zonder schijnzekerheid."
              description="Begin vroeg met de categorie, maar laat tijdgevoelige handelingen zoals TDAC juist wachten tot het officiële venster."
            />
            <div className="relative grid gap-4 sm:grid-cols-3">
              <div className="pointer-events-none absolute left-[8%] right-[8%] top-8 hidden border-t-2 border-dotted border-saffron/55 sm:block" />
              {[
                { icon: MapPinned, label: 'Zodra je reisplan staat', title: 'Controleer duur en doel', text: 'Kies visumvrij of een passende e-Visa-categorie en controleer de actuele regel.' },
                { icon: FileCheck2, label: 'Voor ticketing en aanvraag', title: 'Maak bewijs consistent', text: 'Paspoort, vertrek, verblijfsadres en aanvraagdocumenten moeten hetzelfde reisverhaal tonen.' },
                { icon: Smartphone, label: 'Binnen drie dagen', title: 'Dien TDAC in', text: 'Download de bevestiging en bewaar hem ook offline voor je aankomst.' },
              ].map((step, index) => {
                const Icon = step.icon;
                return (
                  <article key={step.title} className="relative rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                    <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border-4 border-tonal bg-jade text-white"><Icon size={19} /></span>
                    <p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">0{index + 1} · {step.label}</p>
                    <h2 className="mt-2 font-display text-2xl font-semibold text-jade">{step.title}</h2>
                    <p className="mt-3 text-xs font-medium leading-5 text-charcoal/60">{step.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <FaqSplitSection
          id="vragen"
          eyebrow="Echte Nederlandse zoekvragen"
          title="Veelgestelde vragen over visum en inreisregels"
          description="De vragen komen uit vier actuele Nederlandse DataForSEO-SERP’s. Tijdgevoelige antwoorden verwijzen terug naar officiële bronnen en noemen de controledatum."
          items={faqs}
        />

        <RelatedGuidesSection
          eyebrow="Verder voorbereiden"
          title="Regel alleen wat jouw reis echt nodig heeft"
          guides={[
            { title: 'TDAC invulgids', description: 'Veld voor veld, inclusief fouten herstellen en reizen met kinderen.', href: '/visa/digital-arrival-card/', image: '/images/redesign/thailand-entry-documents.webp', imageAlt: 'Documentenset voor de Thailand Digital Arrival Card' },
            { title: 'Veilig reizen', description: 'Actueel reisadvies, vervoer, scams en noodnummers in één beslisgids.', href: '/is-thailand-safe/', image: '/images/redesign/thailand-safety-hero.webp', imageAlt: 'Reizigers controleren hun route in Bangkok' },
            { title: 'Thailand-route kiezen', description: 'Stem je verblijfsduur af op een haalbare route en beperkt aantal transfers.', href: '/thailand-itinerary/', image: '/images/redesign/thailand-route-hero.webp', imageAlt: 'Reisroute door Thailand' },
          ]}
        />

        <SourceMethodSection
          eyebrow="Bronnen & regelstatus"
          title="Een visumpagina moet verschil maken tussen nu, aangekondigd en ingegaan."
          description="DataForSEO-zoektermen, concurrenten en echte PAA-vragen zijn op 24 juli 2026 voor Nederland onderzocht. Voor actuele regels gebruikt Go2Thailand alleen officiële Nederlandse en Thaise bronnen; aankondigingen krijgen geen zelfbedachte ingangsdatum."
          sources={[
            { title: 'Reisadvies Thailand', creator: 'Ministerie van Buitenlandse Zaken · NederlandWereldwijd', url: 'https://www.nederlandwereldwijd.nl/reisadvies/thailand', note: 'Actuele Nederlandse bron voor paspoortgeldigheid, huidige visumvrije termijn, bewijs van vertrek en TDAC.' },
            { title: 'Revision of visa exemption schemes', creator: 'Ministry of Foreign Affairs Thailand · 19 mei 2026', url: 'https://www.mfa.go.th/en/content/summary-press-briefing-190526', note: 'Primaire bron voor de goedgekeurde wijziging en de voorwaarde dat deze na Royal Gazette-publicatie en de formele termijn ingaat.' },
            { title: 'E-Visa General Conditions', creator: 'Royal Thai Embassy The Hague', url: 'https://hague.thaiembassy.org/th/publicservice/e-visa-general-conditions/', note: 'Officiële route voor wie vanuit Nederland een Thais e-Visa wil aanvragen en voor aanvraaglocatie en categorievoorwaarden.' },
            { title: 'TDAC Official FAQ', creator: 'Thailand Immigration Bureau', url: 'https://tdac.immigration.go.th/manual/en/faq.html', note: 'Primaire bron voor termijn, kosten, kinderen, transit, herhaalde binnenkomsten, benodigde gegevens en correcties.' },
          ]}
        />
      </main>
    </>
  );
}
