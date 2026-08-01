import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarCheck2,
  Check,
  CircleAlert,
  Clock3,
  ExternalLink,
  FileCheck2,
  Gem,
  Landmark,
  Plane,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UsersRound,
  WalletCards,
  X,
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

const OFFICIAL_HOME = 'https://www.thailandprivilege.co.th/home';
const OFFICIAL_COMPARE = 'https://www.thailandprivilege.co.th/why-thailand/compare-thailand-privilege-card-membership-packages-find-the-perfect-fit-for-you';
const OFFICIAL_RULES = 'https://www.thailandprivilege.co.th/living-in-thailand';
const OFFICIAL_APPLICATION = 'https://www.thailandprivilege.co.th/online/registration';
const OFFICIAL_APPLICATION_FEE = 'https://www.thailandprivilege.co.th/news/membership-application-fee-of-50-000-baht';
const OFFICIAL_GOLD_TERMS = 'https://cms.thailandprivilege.co.th/stocks/download/o0x0/zx/kc/4fmozxkcj8t/661009_Gold-%28New-member%29.pdf';

type TierId = 'bronze' | 'gold' | 'platinum' | 'diamond' | 'reserve';

const tiers: Array<{
  id: TierId;
  name: string;
  fee: number;
  years: number;
  validity: string;
  points: string;
  family: string;
  character: string;
  accent: string;
}> = [
  { id: 'bronze', name: 'Bronze', fee: 650000, years: 5, validity: '5 jaar', points: '0 punten', family: 'Geen reguliere Next Member-route', character: 'De laagste instap, zonder jaarlijks puntenbudget. Officieel als beperkte aanbieding vermeld.', accent: 'bg-[#a96235]' },
  { id: 'gold', name: 'Gold', fee: 900000, years: 5, validity: '5 jaar', points: '20 per jaar', family: 'Geen reguliere Next Member-route', character: 'Dezelfde looptijd als Bronze, maar met jaarlijks puntenbudget en meer privilegekeuze.', accent: 'bg-[#bd8c2f]' },
  { id: 'platinum', name: 'Platinum', fee: 1500000, years: 10, validity: '10 jaar', points: '35 per jaar', family: 'Supplementary-optie kan tijdelijk gelden', character: 'Langere basisduur en meer punten; interessanter wanneer tien jaar werkelijk bij je plan past.', accent: 'bg-[#9da3a3]' },
  { id: 'diamond', name: 'Diamond', fee: 2500000, years: 15, validity: '15 jaar', points: '55 per jaar', family: 'Supplementary-optie kan tijdelijk gelden', character: 'Een lange horizon met meer jaarlijks privilegebudget, maar ook aanzienlijk meer vooruitbetaling.', accent: 'bg-[#39454a]' },
  { id: 'reserve', name: 'Reserve', fee: 5000000, years: 20, validity: '20+ jaar', points: '120 per jaar', family: 'Supplementary-optie kan tijdelijk gelden', character: 'Alleen op uitnodiging. Beoordeel dit als premium lidmaatschap, niet als financieel rendement.', accent: 'bg-jade' },
];

const quickFacts = [
  { icon: WalletCards, label: 'Instap volgens actuele kaart', value: '650.000 THB', detail: 'Bronze · beperkte aanbieding' },
  { icon: Clock3, label: 'Achtergrondcontrole', value: 'Circa 4–8 weken', detail: 'Official guidance varieert per moment' },
  { icon: Plane, label: 'PE-verblijfsstempel', value: '1 jaar per binnenkomst', detail: 'Controleer iedere aankomststempel' },
  { icon: BriefcaseBusiness, label: 'Werk of studie', value: 'Niet inbegrepen', detail: 'Andere status kan nodig zijn' },
];

const faqs = [
  { question: 'Wie komt in aanmerking voor een Thailand Elite Visa?', answer: 'De actuele Gold-voorwaarden noemen een buitenlands paspoort, legale toelating tot Thailand, geen relevante gevangenisstraf, geen faillietverklaring en geen juridische onbekwaamheid. Alle leeftijden zijn mogelijk. De achtergrondcontrole en actuele voorwaarden blijven beslissend; een betaalde aanvraag garandeert geen toelating.' },
  { question: 'Hoeveel kost de Thailand Privilege Card?', answer: 'De officiële vergelijking noemt 650.000 THB voor Bronze, 900.000 THB voor Gold, 1.500.000 THB voor Platinum, 2.500.000 THB voor Diamond en 5.000.000 THB voor Reserve. Bronze en familieaanbiedingen kunnen tijdelijk zijn. De aanvraag start daarnaast met 50.000 THB; bij goedkeuring wordt dit volgens de officiële aankondiging verrekend met de lidmaatschapsprijs.' },
  { question: 'Is Thailand Privilege het geld waard?', answer: 'Dat hangt vooral af van werkelijk gebruik. Deel niet alleen de prijs door het aantal jaren, maar waardeer ook hoeveel aankomsten, liaisonservices en punten je echt benut. Wie kwalificeert voor LTR of DTV kan voor veel minder geld verblijfsrecht krijgen, maar koopt daarmee niet hetzelfde servicepakket.' },
  { question: 'Mag ik werken met Thailand Privilege?', answer: 'Nee, het Privilege Entry-visum geeft op zichzelf geen werk- of studierecht. De officiële aanbieder waarschuwt dit bij alle tiers. Laat remote work, een Thaise werkgever of studie vooraf toetsen binnen de juiste visum- en werkvergunningsroute.' },
  { question: 'Moet ik nog een 90-dagenmelding of jaarverlenging doen?', answer: 'Ja. De 90-dagenmelding blijft de verantwoordelijkheid van de houder; ondersteuning hangt af van tier, punten, quota en servicegebied. Een PE-houder krijgt één jaar per binnenkomst en kan lokaal verlengen. De officiële regels noemen fysieke aanwezigheid, foto/vingerafdruk en 1.900 THB voor de verblijfsverlenging.' },
  { question: 'Is Thailand Privilege hetzelfde als permanent verblijf?', answer: 'Nee. Het is een betaald lidmaatschap met een Privilege Entry-visum voor tijdelijk verblijf. Het is geen permanent residence, nationaliteit, automatisch belastingvoordeel, werkvergunning of eigendomsrecht.' },
  { question: 'Kan mijn partner of gezin mee op hetzelfde lidmaatschap?', answer: 'Iedere persoon heeft een eigen goedgekeurde status nodig. De actuele officiële informatie noemt tijdelijke supplementary/Next Member-opties voor Platinum, Diamond en Reserve. Prijs, verwantschapseis en actieperiode veranderen; controleer daarom de live voorwaarden vóór betaling.' },
];

const sectionNav = [
  { href: '#pakketten' as const, label: 'Pakketten', icon: Gem },
  { href: '#werkelijkheid' as const, label: 'Wat koop je?', icon: BadgeCheck },
  { href: '#kalender' as const, label: 'Verblijfsklok', icon: CalendarCheck2 },
  { href: '#vergelijk' as const, label: 'Alternatieven', icon: Landmark },
  { href: '#aanvragen' as const, label: 'Aanvragen', icon: FileCheck2 },
  { href: '#vragen' as const, label: 'Vragen', icon: CircleAlert },
];

function formatThb(value: number) {
  return new Intl.NumberFormat('nl-NL').format(value);
}

export default function ThailandPrivilegeGuide() {
  const [activeTierId, setActiveTierId] = useState<TierId>('bronze');
  const activeTier = useMemo(() => tiers.find((tier) => tier.id === activeTierId) || tiers[0], [activeTierId]);
  const annualised = Math.round(activeTier.fee / activeTier.years);
  const hotelHref = withPlacementSubId(TRIP_GENERIC, 'nl-thailand-privilege', 'first-month');
  const esimHref = withPlacementSubId(SAILY_GENERIC, 'nl-thailand-privilege', 'arrival');

  const faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) };
  const webPageJsonLd = { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Thailand Privilege Card: actuele kosten en eerlijke vergelijking', description: 'Vergelijk Bronze, Gold, Platinum, Diamond en Reserve, de werkelijke verblijfsregels, aanvraag en alternatieven.', url: 'https://go2-thailand.com/nl/visa/thailand-elite-visa/', inLanguage: 'nl-NL', dateModified: '2026-07-26' };
  const breadcrumbJsonLd = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/nl/' },
    { '@type': 'ListItem', position: 2, name: 'Visum', item: 'https://go2-thailand.com/nl/visa/' },
    { '@type': 'ListItem', position: 3, name: 'Thailand Privilege Card', item: 'https://go2-thailand.com/nl/visa/thailand-elite-visa/' },
  ] };

  return (
    <>
      <SEOHead
        title="Thailand Elite Visa: Privilege kosten & pakketten"
        description="Thailand Privilege Card vergelijken? Bekijk actuele Bronze–Reserve-prijzen, kosten per jaar, 90-dagenmelding, werkrecht, aanvraag en alternatieven."
        ogImage="https://go2-thailand.com/images/redesign/thailand-privilege-hero.webp"
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      </SEOHead>

      <EditorialHero
        image="/images/redesign/thailand-privilege-hero.webp"
        imageAlt="Internationaal stel arriveert met koffers in Bangkok voor een lang verblijf"
        breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Visum', href: '/visa/' }, { label: 'Thailand Privilege' }]}
        eyebrow="Voorheen Thailand Elite Visa"
        title={<>Thailand Privilege.<br /><span className="text-saffron">Wat koop je écht?</span></>}
        subtitle="Een duur lidmaatschap is nog geen zorgeloos verblijfsplan."
        description="Vergelijk de vijf tiers op totale prijs, prijs per basisjaar, servicepunten én de immigratietaken die gewoon blijven bestaan."
        actions={[{ label: 'Vergelijk de vijf tiers', href: '#pakketten', kind: 'primary' }, { label: 'Open officiële pakketten', href: OFFICIAL_HOME, kind: 'secondary', newTab: true }]}
        minHeightClassName="min-h-[760px] lg:min-h-[720px]"
        titleClassName="max-w-[900px] text-[3.25rem] leading-[0.88] !text-white sm:text-[4.65rem] lg:text-[5.15rem]"
        subtitleClassName="max-w-[650px] !text-white"
        descriptionClassName="mt-4 max-w-[590px] text-sm leading-7 !text-white opacity-72"
        imageClassName="object-cover object-[72%_center] lg:object-center"
        gradientClassName="bg-[linear-gradient(180deg,rgba(4,42,34,0.2)_0%,rgba(4,42,34,0.65)_46%,rgba(4,42,34,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(4,42,34,0.995)_0%,rgba(4,42,34,0.96)_44%,rgba(4,42,34,0.16)_72%,rgba(4,42,34,0.03)_100%)]"
        contentClassName="max-w-[900px] [&_nav]:!text-white/60 [&_nav_span]:!text-white/75"
        sideCard={<div className="absolute bottom-8 right-[max(2rem,calc((100vw-1280px)/2))] z-10 hidden w-[315px] rounded-2xl border border-white/22 bg-jade/82 p-5 text-white shadow-editorial-card backdrop-blur-lg xl:block"><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">Belangrijkste nuance</p><strong className="mt-3 block font-display text-3xl font-semibold">Lidmaatschap ≠ permanente verblijfsstatus</strong><p className="mt-3 text-[10px] font-semibold leading-5 text-white/58">De PE-stempel, 90-dagenmelding en jaarlijkse verblijfsklok blijven praktisch relevant.</p></div>}
      />

      <PageSectionNav items={sectionNav} />

      <section className="section-divider-bottom py-10 lg:py-12">
        <div className="container-custom grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {quickFacts.map(({ icon: Icon, label, value, detail }) => <article key={label} className="rounded-2xl border border-jade/10 bg-white p-5 shadow-sm"><Icon size={21} className="text-saffron-dark" /><p className="mt-4 text-[9px] font-extrabold uppercase tracking-[0.15em] text-charcoal/45">{label}</p><strong className="mt-1 block font-display text-2xl font-semibold text-jade">{value}</strong><span className="mt-1 block text-[10px] font-medium text-charcoal/48">{detail}</span></article>)}
        </div>
      </section>

      <section id="pakketten" className="section-divider-bottom scroll-mt-24 bg-tonal/55 py-16 lg:py-24">
        <div className="container-custom">
          <SectionHeading eyebrow="Eerst de prijsarchitectuur" title="Vijf kaarten. Twee werkelijk verschillende keuzes." description="Bronze en Gold kopen vijf jaar; hogere tiers kopen vooral een langere basisduur en meer jaarlijkse punten. Klik een tier en vergelijk de vooruitbetaling met de kale prijs per basisjaar." />
          <div className="mt-10 overflow-hidden rounded-[30px] border border-jade/10 bg-jade shadow-editorial-lift">
            <div className="grid lg:grid-cols-[0.98fr_1.02fr]">
              <div className="relative min-h-[390px] overflow-hidden lg:min-h-[650px]"><Image src="/images/redesign/thailand-privilege-tiers.webp" alt="Vijf neutrale materiaalkaarten als visuele vergelijking van de Thailand Privilege-tiers" fill sizes="(max-width:1024px) 100vw,50vw" className="object-cover" /><div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/20 bg-jade/82 p-4 text-white backdrop-blur-lg"><p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-light">Geen officiële kaarten</p><p className="mt-1 text-xs font-medium leading-5 text-white/65">Het beeld ordent de vijf prijsniveaus; actuele rechten komen uitsluitend uit de live voorwaarden.</p></div></div>
              <div className="p-6 sm:p-9 lg:p-11">
                <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
                  {tiers.map((tier) => {
                    const active = tier.id === activeTier.id;
                    return <button key={tier.id} type="button" aria-pressed={active} onClick={() => setActiveTierId(tier.id)} className={`group flex items-center gap-4 rounded-xl border p-4 text-left transition ${active ? 'border-saffron bg-canvas text-jade shadow-lg' : 'border-white/18 bg-white/[0.055] text-white hover:bg-white/[0.1]'}`}><span className={`h-10 w-7 shrink-0 rounded-md border border-white/25 shadow-sm ${tier.accent}`} /><span className="min-w-0 flex-1"><strong className="block text-sm">{tier.name} · {tier.validity}</strong><span className={`mt-1 block text-[10px] font-medium ${active ? 'text-charcoal/55' : 'text-white/48'}`}>{formatThb(tier.fee)} THB · {tier.points}</span></span><ArrowRight size={15} className={active ? 'text-saffron-dark' : 'text-white/35'} /></button>;
                  })}
                </div>
                <div className="mt-7 border-t border-white/20 pt-7 text-white">
                  <p className="eyebrow !text-saffron-light">{activeTier.name} doorgerekend</p>
                  <div className="mt-4 grid grid-cols-2 gap-3"><div><span className="text-[9px] font-bold uppercase tracking-[0.12em] text-white/40">Vooruitbetaling</span><strong className="mt-1 block font-display text-2xl">{formatThb(activeTier.fee)} THB</strong></div><div><span className="text-[9px] font-bold uppercase tracking-[0.12em] text-white/40">Per basisjaar</span><strong className="mt-1 block font-display text-2xl">≈ {formatThb(annualised)} THB</strong></div></div>
                  <p className="mt-5 text-sm font-medium leading-6 text-white/62">{activeTier.character}</p>
                  <p className="mt-3 flex gap-2 text-[10px] font-semibold leading-5 text-white/48"><UsersRound size={15} className="mt-0.5 shrink-0 text-saffron-light" />{activeTier.family}</p>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-4 text-[10px] font-medium leading-5 text-charcoal/48">Rekensom: lidmaatschapsprijs gedeeld door de genoemde basisduur. Dit is geen jaarlijkse betaaloptie en waardeert punten, services, wisselkoers, belasting of gemiste rente niet.</p>
        </div>
      </section>

      <section id="werkelijkheid" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
        <div className="container-custom">
          <SectionHeading eyebrow="De marketinglaag eraf" title="Je koopt comfort rond verblijf. Niet alle rechten eromheen." description="De Privilege Entry-status maakt lang en herhaald verblijf voorspelbaarder. De volgende grenzen blijven essentieel voordat je een grote vooruitbetaling doet." />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <article className="rounded-[28px] bg-jade p-7 text-white shadow-editorial-lift sm:p-10"><p className="eyebrow !text-saffron-light">Wel inbegrepen in de kern</p><div className="mt-7 grid gap-4">{[
              ['Meervoudige PE-status', 'Een jaar verblijf per correcte binnenkomststempel binnen de membershipterm.'],
              ['Aankomst- en contactservice', 'EPA op geselecteerde luchthavens en een meertalig Member Contact Center.'],
              ['Administratieve ondersteuning', 'EPL kan ondersteunen bij onder meer 90-dagenmelding, bankzaken en rijbewijs; quota, punten en gebied gelden.'],
              ['Privilegepunten vanaf Gold', 'Punten kunnen worden gebruikt binnen het actuele partner- en serviceaanbod.'],
            ].map(([title, text]) => <div key={title} className="flex gap-3 border-b border-white/12 pb-4 last:border-0 last:pb-0"><Check size={17} className="mt-0.5 shrink-0 text-saffron-light" /><div><strong className="text-sm">{title}</strong><p className="mt-1 text-xs font-medium leading-5 text-white/55">{text}</p></div></div>)}</div></article>
            <article className="rounded-[28px] border border-jade/10 bg-white p-7 shadow-editorial-card sm:p-10"><p className="eyebrow">Niet automatisch inbegrepen</p><div className="mt-7 grid gap-4">{[
              ['Werk- of studierecht', 'De officiële aanbieder zegt expliciet dat geen enkele tier dit onder het PE-visum geeft.'],
              ['Permanent residence of nationaliteit', 'Een lange membershipterm verandert tijdelijk verblijf niet in permanente status.'],
              ['Belastingvrijstelling', 'Visumstatus beslist niet zelfstandig over belastingresidentie of belastingplicht.'],
              ['Zorgverzekering of onbeperkte services', 'Verzekering is geen toelatingseis; veel privileges hebben tiers, punten, quota of reserveringsvoorwaarden.'],
            ].map(([title, text]) => <div key={title} className="flex gap-3 border-b border-jade/8 pb-4 last:border-0 last:pb-0"><X size={17} className="mt-0.5 shrink-0 text-saffron-dark" /><div><strong className="text-sm text-jade">{title}</strong><p className="mt-1 text-xs font-medium leading-5 text-charcoal/55">{text}</p></div></div>)}</div></article>
          </div>
        </div>
      </section>

      <section id="kalender" className="section-divider-bottom scroll-mt-24 bg-mist/50 py-16 lg:py-24">
        <div className="container-custom">
          <SectionHeading eyebrow="De klok die nog steeds loopt" title="Vijf jaar membership betekent niet vijf jaar op één stempel." description="Gebruik vier afzonderlijke klokken. De kortste klok bepaalt welke handeling als eerste komt." />
          <div className="relative mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4 before:absolute before:left-[8%] before:right-[8%] before:top-8 before:hidden before:border-t-2 before:border-dashed before:border-saffron/50 xl:before:block">
            {[
              { n: '01', icon: Plane, title: 'Binnenkomst', text: 'Controleer direct dat de PE-stempel één jaar verblijf geeft. Een fout moet je bij aankomst melden.' },
              { n: '02', icon: RefreshCw, title: 'Iedere 90 dagen', text: 'Melden blijft verplicht wanneer je onafgebroken in Thailand bent. TPC-service is niet overal of onbeperkt.' },
              { n: '03', icon: CalendarCheck2, title: 'Voor één jaar verloopt', text: 'Uit- en opnieuw inreizen geeft bij correcte status een nieuwe stempel; lokaal verlengen kost volgens TPC 1.900 THB.' },
              { n: '04', icon: Gem, title: 'Membershipterm', text: 'De kaart loopt 5, 10, 15 of 20+ jaar. Aanbiedingen, punten en servicepartners kunnen tussentijds veranderen.' },
            ].map(({ n, icon: Icon, title, text }) => <article key={n} className="relative rounded-2xl border border-jade/10 bg-canvas p-6 shadow-sm"><span className="relative z-10 grid h-16 w-16 place-items-center rounded-full border border-saffron/30 bg-canvas"><Icon size={23} className="text-jade" /></span><span className="mt-5 block text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-dark">Klok {n}</span><h3 className="mt-2 font-display text-2xl font-semibold text-jade">{title}</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/55">{text}</p></article>)}
          </div>
        </div>
      </section>

      <section id="vergelijk" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
        <div className="container-custom">
          <SectionHeading eyebrow="Betaal pas na de routecheck" title="Privilege wint op gemak. Andere routes winnen vaak op prijs of rechten." description="Deze vergelijking voorkomt dat je servicecomfort verwart met geschiktheid voor werk, studie of een specifiek langverblijfsdoel." />
          <div className="mt-10 overflow-x-auto rounded-[26px] border border-jade/10 bg-white shadow-editorial-card">
            <table className="min-w-[850px] w-full text-left text-xs"><thead className="bg-jade text-white"><tr><th className="p-5">Route</th><th className="p-5">Kernprijs</th><th className="p-5">Sterk wanneer</th><th className="p-5">Belangrijkste grens</th><th className="p-5">Lees verder</th></tr></thead><tbody className="divide-y divide-jade/8">{[
              ['Thailand Privilege', '650.000–5.000.000 THB', 'Je hoge vooruitbetaling accepteert voor lang verblijf en servicegemak.', 'Geen werk/studie, geen PR; 90 dagen en jaarstempel blijven.', '/visa/thailand-elite-visa/'],
              ['DTV', '€350 via Den Haag', 'Remote work/soft power en maximaal 180 dagen per binnenkomst passen.', 'Bewijsroute en verlenging verschillen sterk van membership.', '/visa/digital-nomad-visa/'],
              ['LTR', '50.000 THB in Thailand', 'Je aantoonbaar een strenge vermogen-, pensioen-, werkgevers- of expertiseroute haalt.', 'Kwalificatie en bewijsbehoud zijn zwaar.', '/visa/ltr-visa/'],
              ['Retirement', '€70–€175 via Den Haag', 'Je 50+ bent en financiële/verzekeringsvoorwaarden kunt dragen.', 'Meer immigratie- en bewijsverplichtingen, afhankelijk van route.', '/visa/retirement-visa/'],
            ].map(([route, price, fit, limit, href]) => <tr key={route}><th className="p-5 font-display text-lg font-semibold text-jade">{route}</th><td className="p-5 font-semibold text-charcoal/72">{price}</td><td className="p-5 leading-5 text-charcoal/58">{fit}</td><td className="p-5 leading-5 text-charcoal/58">{limit}</td><td className="p-5"><Link href={href} className="inline-flex items-center gap-2 font-bold text-jade">Vergelijk <ArrowRight size={14} className="text-saffron-dark" /></Link></td></tr>)}</tbody></table>
          </div>
        </div>
      </section>

      <section id="aanvragen" className="section-divider-bottom scroll-mt-24 bg-tonal/50 py-16 lg:py-24">
        <div className="container-custom">
          <SectionHeading eyebrow="Officieel en factuur-eerst" title="Vijf stappen vóór je eerste PE-stempel." description="De 50.000 THB aanvraagfee is deel van de membershipprijs bij goedkeuring, maar niet vrij opzegbaar. Controleer ontvanger, voorwaarden en betaaldeadline rechtstreeks bij TPC." />
          <div className="mt-11 grid gap-5 lg:grid-cols-5">{[
            ['01', 'Kies op horizon', 'Vergelijk basisduur, punten, gezin en werkelijk gebruik — niet alleen het kaartmateriaal.'],
            ['02', 'Dien compleet in', 'Formulier, paspoort, foto, eventuele Thaise stempel en openheid over overstay.'],
            ['03', 'Betaal aanvraagfee', '50.000 THB per aanvraag via de officiële instructie; laat bankgegevens zelf verifiëren.'],
            ['04', 'Wacht op controle', 'Immigration/background review duurt volgens actuele officiële uitleg circa vier tot acht weken.'],
            ['05', 'Activeer & affixeer', 'Betaal binnen de factuurtermijn en plan visumaffixatie via luchthaven, ambassade of Immigration.'],
          ].map(([n, title, text]) => <article key={n} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-sm"><span className="text-[10px] font-black tracking-[0.16em] text-saffron-dark">{n}</span><h3 className="mt-5 font-display text-2xl font-semibold text-jade">{title}</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/55">{text}</p></article>)}</div>
          <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-saffron/25 bg-saffron-pale p-5 text-xs font-medium leading-6 text-charcoal/65 sm:flex-row sm:items-center sm:justify-between"><span className="flex gap-3"><ShieldCheck size={20} className="mt-0.5 shrink-0 text-saffron-dark" />Betaal alleen aan Thailand Privilege Card Co., Ltd. via de gegevens in je actuele officiële dossier of invoice.</span><a href={OFFICIAL_APPLICATION} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 font-extrabold text-jade">Officiële registratie <ExternalLink size={14} /></a></div>
        </div>
      </section>

      <section className="section-divider-bottom py-16 lg:py-24">
        <div className="container-custom"><div className="overflow-hidden rounded-[30px] bg-jade text-white shadow-editorial-lift"><div className="grid lg:grid-cols-[0.82fr_1.18fr]"><div className="p-8 sm:p-11"><p className="eyebrow !text-saffron-light">Na goedkeuring, vóór lang huren</p><h2 className="font-display text-[3.05rem] font-semibold leading-[0.9] tracking-[-0.035em]">Test je Thaise thuisbasis eerst één maand.</h2><p className="mt-5 text-sm font-medium leading-7 text-white/60">Een vijfjarige kaart vertelt niet of Bangkok, Chiang Mai of een eiland bij je dagelijkse ritme past. Boek de eerste maand flexibel en beslis daarna pas over jaarhuur.</p><Link href="/best-hotels/bangkok/" className="btn-cream mt-7">Vergelijk Bangkok-wijken <ArrowRight size={15} /></Link></div><div className="grid gap-3 bg-white/[0.055] p-7 sm:grid-cols-2 sm:p-10"><a href={hotelHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-2xl border border-white/14 bg-white/[0.07] p-5"><Sparkles size={20} className="text-saffron-light" /><strong className="mt-4 block text-sm">Flexibele eerste maand</strong><span className="mt-1 block text-[10px] text-white/50">Verblijven via Trip.com</span></a><a href={esimHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-2xl border border-white/14 bg-white/[0.07] p-5"><Smartphone size={20} className="text-saffron-light" /><strong className="mt-4 block text-sm">Bereikbaar bij aankomst</strong><span className="mt-1 block text-[10px] text-white/50">eSIM vergelijken via Saily</span></a><AffiliateDisclosure className="sm:col-span-2 !border-white/12 !bg-white/[0.04] !text-white/55">Trip.com en Saily zijn affiliate-links voor praktisch verblijf en bereikbaarheid. Ze zijn geen aanvraagagent en hebben geen invloed op toelating, membership of PE-visum.</AffiliateDisclosure></div></div></div></div>
      </section>

      <FaqSplitSection id="vragen" eyebrow="Echte zoekvragen" title="Veelgestelde vragen over Thailand Elite Visa" description="De vragen komen uit twee actuele Nederlandse DataForSEO-SERP’s. Antwoorden zijn getoetst aan de huidige Thailand Privilege-pakketten, voorwaarden en verblijfsregels." items={faqs} />

      <RelatedGuidesSection eyebrow="Vergelijk vóór je betaalt" title="De juiste langverblijfsroute begint bij wat je in Thailand gaat doen." guides={[
        { title: 'LTR Visa', description: 'Strenge kwalificatie, veel lagere afgifteprijs en andere werk-/belastingvoordelen.', href: '/visa/ltr-visa/', image: '/images/redesign/thailand-ltr-visa-hero.webp', imageAlt: 'Professionals in Bangkok voor de LTR Visa-gids' },
        { title: 'DTV voor remote work', description: 'Vijfjarige visumgeldigheid met maximaal 180 dagen per binnenkomst.', href: '/visa/digital-nomad-visa/', image: '/images/redesign/thailand-dtv-hero.webp', imageAlt: 'Remote professional in Thailand voor de DTV-gids' },
        { title: 'Pensioenvisum', description: 'Vergelijk Non-O, O-A en O-X wanneer je 50 jaar of ouder bent.', href: '/visa/retirement-visa/', image: '/images/redesign/thailand-retirement-visa-hero.webp', imageAlt: 'Langverblijf in Thailand voor pensioenvisum' },
      ]} />

      <SourceMethodSection eyebrow="Bronnen & onderzoek" title="Actuele voorwaarden wegen zwaarder dan oude Elite-prijzen." description="DataForSEO-onderzoek voor Nederland omvatte drie keywordsets, twee live SERP’s, negen PAA-vragen, vier concurrentieparses en ranking- en backlinkchecks. Prijzen, punten, aanvraagfee, kwalificaties, werk-/studiebeperking, 90-dagenmelding en jaarverlenging zijn daarna gecontroleerd bij Thailand Privilege zelf." sources={[
        { title: 'Huidige membershippakketten', creator: 'Thailand Privilege Card Co., Ltd.', url: OFFICIAL_HOME, note: 'Live overzicht van Bronze, Gold, Platinum, Diamond en Reserve met prijs, duur en punten.' },
        { title: 'Pakketvergelijking en aanvraagflow', creator: 'Thailand Privilege Card Co., Ltd.', url: OFFICIAL_COMPARE, note: 'Officiële uitleg van tierinhoud, benodigde documenten, controle en visumaffixatie.' },
        { title: '90-dagenmelding en stay extension', creator: 'Thailand Privilege Card Co., Ltd.', url: OFFICIAL_RULES, note: 'Operationele regels, servicegebieden, documentlijsten, fysieke aanwezigheid en verlengingsfee.' },
        { title: 'Membership Application Fee', creator: 'Thailand Privilege Card Co., Ltd.', url: OFFICIAL_APPLICATION_FEE, note: 'Voorwaarden voor de 50.000 THB aanvraagfee, verrekening en beperkte restitutie.' },
        { title: 'Gold Membership Agreement', creator: 'Thailand Privilege Card Co., Ltd.', url: OFFICIAL_GOLD_TERMS, note: 'Actuele kwalificaties, fee, upgradevoorwaarden en bindende membershipvoorwaarden.' },
      ]} />
    </>
  );
}
