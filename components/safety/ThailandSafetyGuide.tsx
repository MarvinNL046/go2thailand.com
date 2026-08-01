import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Ambulance,
  Bike,
  Check,
  CircleAlert,
  ExternalLink,
  FileCheck2,
  Flame,
  HeartHandshake,
  MapPinned,
  PhoneCall,
  Route,
  ShieldCheck,
  Sparkles,
  TrainFront,
  Users,
  Waves,
} from 'lucide-react';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';
import { KLOOK_GENERIC, TRIP_GENERIC, TWELVEGO_GENERIC, withPlacementSubId } from '../../lib/affiliates';

const sectionNav = [
  { href: '#reisadvies' as const, label: 'Reisadvies', icon: MapPinned },
  { href: '#risicos' as const, label: 'Risico’s', icon: ShieldCheck },
  { href: '#vervoer' as const, label: 'Vervoer', icon: Bike },
  { href: '#scams' as const, label: 'Scams', icon: CircleAlert },
  { href: '#noodplan' as const, label: 'Noodplan', icon: PhoneCall },
  { href: '#vragen' as const, label: 'Vragen', icon: HeartHandshake },
];

const preparationItems = [
  'Live reisadvies en routezones gecontroleerd',
  'Reisverzekering en sportdekking nagekeken',
  'Kopieën van paspoort en polis veilig opgeslagen',
  '191, 1155 en 1669 in je telefoon gezet',
  'Route en accommodaties met thuisfront gedeeld',
  'Rijbewijs, helm en verzekering kloppen vóór scooterhuur',
];

const faqs = [
  { question: 'Is Thailand veilig om op vakantie te gaan?', answer: 'Voor het grootste deel van Thailand geldt bij de broncontrole een geel Nederlands reisadvies: je kunt erheen reizen, maar er zijn bijzondere veiligheidsrisico’s. Specifieke grensstroken en delen van het diepe zuiden hebben rood of oranje advies. Controleer daarom altijd de live kaart van NederlandWereldwijd en baseer je route op de actuele kleurzones.' },
  { question: 'Wat moet je vermijden in Thailand?', answer: 'Vermijd gebieden waarvoor het officiële reisadvies rood of oranje is, demonstraties, drugs, onverzekerd scooter rijden, zwemmen bij een rode vlag en aanbieders die je paspoort als borg eisen. Ga ook niet mee in een onverwacht “speciale deal”-verhaal van een onbekende bij een toeristische plek.' },
  { question: 'Is Thailand veilig voor vrouwen?', answer: 'Veel vrouwen reizen zelfstandig door Thailand, maar populair betekent niet risicoloos. Kies een goed verlichte aankomstroute, deel je locatie, let op je drankje, vermijd geïsoleerde plekken ’s nachts en regel vervoer terug voordat je uitgaat. De veiligste keuze hangt af van buurt, tijdstip en situatie.' },
  { question: 'Is er veel criminaliteit in Bangkok?', answer: 'De praktische aandachtspunten voor bezoekers zijn vooral zakkenrollerij, tas- of telefoondiefstal, toeristenscams en uitgaansrisico’s. Houd waardevolle spullen uit zicht, gebruik betrouwbare vervoersopties en verlaat een situatie zodra druk of haast onderdeel van de verkoop wordt.' },
  { question: 'Hoe veilig is Thailand op dit moment?', answer: 'Dat antwoord kan per dag en regio veranderen. Go2Thailand vat het reisadvies niet samen als een live statusdienst. Open vlak voor boeken én vertrek het actuele advies van NederlandWereldwijd en meld je aan voor de Reisapp of Informatieservice wanneer je updates wilt ontvangen.' },
  { question: 'Welke alarmnummers heb je nodig in Thailand?', answer: 'Bel 191 voor algemene politiehulp, 1155 voor de Tourist Police, 1669 voor medische noodgevallen in Thailand en 199 voor de brandweer. Zet ook de contactgegevens van je verzekeraar en NederlandWereldwijd in je telefoon en bewaar een offline kopie.' },
];

const riskCards = [
  { icon: Bike, label: 'Hoogste dagelijkse prioriteit', title: 'Verkeer & scooters', text: 'Een helm alleen is niet genoeg. Rijbewijs, voertuigtype, ervaring, verzekering, weg en weer moeten allemaal kloppen.', action: 'Kies trein, taxi of transfer wanneer één schakel ontbreekt.' },
  { icon: CircleAlert, label: 'Veelvoorkomend en vermijdbaar', title: 'Oplichting & diefstal', text: 'Druk, afleiding, een “gesloten” attractie of een aanbieding die alleen nu geldt zijn signalen om uit te stappen.', action: 'Verifieer zelfstandig en betaal nooit onder sociale druk.' },
  { icon: Waves, label: 'Lokaal en weersafhankelijk', title: 'Zee & natuur', text: 'Rode vlaggen, stroming, golven, hitte, luchtkwaliteit en zware regen vragen een beslissing op de dag zelf.', action: 'Volg lokale waarschuwingen, niet je oorspronkelijke planning.' },
  { icon: Users, label: 'Situatie bepaalt het risico', title: 'Uitgaan & solo reizen', text: 'Buurt, tijdstip, alcohol, aankomstroute en vervoer terug wegen zwaarder dan een algemene “veilige stad”-score.', action: 'Plan je terugweg voordat de avond begint.' },
];

export default function ThailandSafetyGuide() {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const completed = checkedItems.length;
  const progress = useMemo(() => Math.round((completed / preparationItems.length) * 100), [completed]);
  const subId = 'nl-thailand-safety';
  const tripHref = withPlacementSubId(TRIP_GENERIC, subId, 'hotel-conditions');
  const transportHref = withPlacementSubId(TWELVEGO_GENERIC, subId, 'transport-options');
  const klookHref = withPlacementSubId(KLOOK_GENERIC, subId, 'operator-conditions');

  const toggleItem = (index: number) => setCheckedItems((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index]);

  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) };
  const webPageSchema = { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Is Thailand veilig? Actueel reisadvies en praktische keuzes', description: 'Praktische veiligheidsgids voor Thailand met officiële reisadviesroute, verkeerskeuzes, scams, noodnummers en een interactieve voorbereiding.', url: 'https://go2-thailand.com/nl/is-thailand-safe/', inLanguage: 'nl-NL', dateModified: '2026-07-26' };
  const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://go2-thailand.com/nl/' }, { '@type': 'ListItem', position: 2, name: 'Is Thailand veilig?', item: 'https://go2-thailand.com/nl/is-thailand-safe/' }] };

  return (
    <>
      <SEOHead
        title="Is Thailand veilig? Reisadvies & risico’s | Go2Thailand"
        description="Is Thailand veilig? Bekijk het actuele reisadvies, de belangrijkste dagelijkse risico’s, scams, noodnummers en een praktische vertrekcheck."
        ogImage="https://go2-thailand.com/images/redesign/thailand-safety-hero.webp"
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </SEOHead>

      <div className="bg-canvas text-charcoal">
        <EditorialHero
          image="/images/redesign/thailand-safety-hero.webp"
          imageAlt="Reizigers controleren hun route bij een verlicht BTS-station in Bangkok"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Veilig reizen' }]}
          eyebrow="Rust komt van goede beslissingen"
          title={<>Is Thailand<br /><span className="text-saffron">veilig?</span></>}
          subtitle="Voor veel routes: goed te bereizen. Zonder blanco veiligheidsbelofte."
          description="Controleer eerst het officiële reisadvies. Stuur daarna op de risico’s die je dagelijks zelf beïnvloedt: vervoer, omgeving, aanbieder en noodplan."
          actions={[{ label: 'Bekijk de beslischeck', href: '#reisadvies', kind: 'primary' }, { label: 'Sla noodnummers op', href: '#noodplan', kind: 'secondary' }]}
          minHeightClassName="min-h-[720px] lg:min-h-[710px]"
          titleClassName="max-w-[640px] text-[4.4rem] leading-[0.84] !text-white sm:text-[5.7rem] lg:text-[6.4rem]"
          subtitleClassName="max-w-[610px] !text-white"
          descriptionClassName="mt-4 max-w-[590px] text-sm leading-7 !text-white/80"
          imageClassName="object-cover object-[68%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(4,42,34,0.22)_0%,rgba(4,42,34,0.44)_44%,rgba(4,42,34,0.96)_100%)] lg:bg-[linear-gradient(90deg,rgba(4,42,34,0.99)_0%,rgba(4,42,34,0.94)_40%,rgba(4,42,34,0.17)_64%,rgba(4,42,34,0.03)_100%)]"
          contentClassName="max-w-[680px] [&_nav]:!text-white/60 [&_nav_span]:!text-white/75"
          sideCard={<div className="absolute bottom-8 right-[max(2rem,calc((100vw-1280px)/2))] z-10 hidden w-[315px] rounded-2xl border border-white/25 bg-jade/78 p-5 text-white shadow-editorial-card backdrop-blur-lg xl:block"><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">Kort antwoord</p><p className="mt-3 font-display text-2xl font-semibold leading-tight">Geen landscore. Wel een live routecheck en vier beïnvloedbare keuzes.</p><div className="mt-4 flex items-center gap-3 border-t border-white/12 pt-4 text-[10px] font-semibold text-white/58"><ShieldCheck size={16} className="text-saffron-light" />Broncontrole: 26 juli 2026.</div></div>}
        />

        <PageSectionNav items={sectionNav} />

        <section id="reisadvies" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <SectionHeading eyebrow="Eerst de live routecheck" title="Go2Thailand vervangt het reisadvies niet." description="Bij onze broncontrole gold geel voor het grootste deel van Thailand. Specifieke grensstroken en delen van het diepe zuiden hadden rood of oranje advies. Dat kan wijzigen; de live kaart blijft leidend." />
            <div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { tone: 'bg-[#f3df76]', label: 'Geel', title: 'Reizen kan', text: 'Er zijn bijzondere veiligheidsrisico’s. Lees de lokale aandachtspunten vóór je boekt.' },
                  { tone: 'bg-saffron', label: 'Oranje', title: 'Alleen noodzakelijk', text: 'Niet bedoeld voor vakantie. Verzekering en consulaire hulp kunnen beperkter zijn.' },
                  { tone: 'bg-[#be5b4b]', label: 'Rood', title: 'Niet reizen', text: 'Ga niet naar de aangegeven zone, ongeacht je eigen risicotolerantie.' },
                ].map((item) => <article key={item.label} className="rounded-2xl border border-jade/10 bg-white p-5 shadow-editorial-card"><span className={`block h-2 w-12 rounded-full ${item.tone}`} /><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">Kleurcode {item.label}</p><h2 className="mt-2 font-display text-2xl font-semibold text-jade">{item.title}</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/58">{item.text}</p></article>)}
              </div>
              <a href="https://www.nederlandwereldwijd.nl/reisadvies/thailand" target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center justify-between gap-4 rounded-2xl border border-jade/10 bg-jade px-5 py-4 text-white shadow-editorial-card"><span><strong className="block text-sm">Open het actuele reisadvies en de kaart</strong><span className="mt-1 block text-[10px] font-medium text-white/55">NederlandWereldwijd · controleer opnieuw vóór vertrek</span></span><ExternalLink size={17} className="shrink-0 text-saffron-light" /></a>
            </div>
          </div>
        </section>

        <section id="risicos" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading eyebrow="Geen zelfverzonnen veiligheidsscore" title="Prioriteer wat je werkelijk kunt beïnvloeden." description="Een gemiddelde lands- of stadscore maskeert tijdstip, straat, vervoerskeuze en actuele omstandigheden. Deze vier beslisvelden zijn praktischer." />
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {riskCards.map((risk, index) => { const Icon = risk.icon; return <article key={risk.title} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/30 bg-canvas text-jade"><Icon size={20} /></span><span className="font-display text-4xl font-semibold text-jade/10">0{index + 1}</span></div><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{risk.label}</p><h2 className="mt-2 font-display text-[1.8rem] font-semibold text-jade">{risk.title}</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/60">{risk.text}</p><p className="mt-5 border-t border-jade/10 pt-4 text-[10px] font-extrabold leading-4 text-jade">{risk.action}</p></article>; })}
            </div>
          </div>
        </section>

        <section id="vervoer" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading eyebrow="De keuze met de meeste dagelijkse impact" title="Vervoer is geen bijzaak in je veiligheidsplan." description="Het officiële advies benadrukt het hoge verkeersrisico, vooral rond motoren en scooters. Een alternatief is geen mislukking: het is risicosturing." />
            <div className="relative mt-10 min-h-[620px] overflow-hidden rounded-[30px] shadow-editorial-lift"><Image src="/images/redesign/thailand-safety-transport.webp" alt="Helm bij een Thaise reisroute met trein, veerboot en verlicht hotel" fill sizes="100vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-jade via-jade/14 to-transparent" /><div className="absolute inset-x-5 bottom-5 grid gap-3 md:inset-x-8 md:bottom-8 md:grid-cols-3"><article className="rounded-2xl border border-white/18 bg-jade/80 p-5 text-white backdrop-blur-md"><p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-light">Scooter</p><h2 className="mt-2 font-display text-2xl font-semibold">Zes checks, geen impuls</h2><p className="mt-3 text-xs font-medium leading-5 text-white/64">Ervaring, geldig rijbewijs, dekking, helm, voertuig en omstandigheden moeten allemaal kloppen.</p></article><article className="rounded-2xl border border-saffron/35 bg-canvas p-5 text-jade shadow-editorial-card"><p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">Lange afstand</p><h2 className="mt-2 font-display text-2xl font-semibold">Vergelijk het hele traject</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/64">Operator, terminal, aankomsttijd, overstap en bagage horen bij dezelfde keuze.</p></article><article className="rounded-2xl border border-white/18 bg-jade/80 p-5 text-white backdrop-blur-md"><p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-light">Boot & zee</p><h2 className="mt-2 font-display text-2xl font-semibold">Reddingsvest vóór uitzicht</h2><p className="mt-3 text-xs font-medium leading-5 text-white/64">Stap niet op bij overbelasting of slechte omstandigheden en volg lokale waarschuwingen.</p></article></div></div>
          </div>
        </section>

        <section id="scams" className="section-divider-bottom scroll-mt-24 bg-mist py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.68fr_1.32fr]">
            <div><SectionHeading eyebrow="Een patroon is nuttiger dan twaalf anekdotes" title="Herken druk, omleiding en borg." description="Scams veranderen van verhaal, maar gebruiken vaak dezelfde mechanismen. Zodra je dat patroon ziet, hoef je niet te onderhandelen: je loopt weg en verifieert zelf." /><Link href="/practical-info/scams-safety/" className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-jade">Bekijk de volledige scamsgids <ExternalLink size={13} className="text-saffron" /></Link></div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: '“Het is vandaag gesloten”', text: 'Controleer opening en entree via de officiële locatie. Ga niet mee naar een alternatief dat een onbekende voorstelt.' },
                { title: 'Alleen nu of alleen cash', text: 'Haast is het waarschuwingssignaal. Vergelijk elders en betaal niet voordat aanbieder en voorwaarden duidelijk zijn.' },
                { title: 'Paspoort als borg', text: 'Geef je paspoort of rijbewijs niet af bij voertuigverhuur. Kies een verhuurder die een kopie of geldborg accepteert.' },
                { title: 'Schade zonder nulmeting', text: 'Film voertuig en materiaal vóór gebruik. Meld bestaande schade en bewaar de boeking en voorwaarden.' },
              ].map((item, index) => <article key={item.title} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><div className="flex items-center justify-between"><span className="grid h-9 w-9 place-items-center rounded-full bg-jade text-xs font-extrabold text-white">{index + 1}</span><Route size={19} className="text-saffron" /></div><h2 className="mt-5 font-display text-2xl font-semibold text-jade">{item.title}</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/60">{item.text}</p></article>)}
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading eyebrow="Zes acties vóór vertrek" title="Maak je veiligheidsplan af in tien minuten." description="De checklist bewaart niets en is geen juridisch advies. Hij maakt alleen zichtbaar welke praktische voorbereidingen je nog niet hebt afgerond." />
            <div className="mt-10 overflow-hidden rounded-[28px] border border-jade/10 bg-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
                <div className="bg-jade p-7 text-white sm:p-10"><p className="eyebrow !text-saffron-light">Jouw vertrekcheck</p><h2 className="font-display text-[4rem] font-semibold leading-none">{completed}<span className="text-saffron-light"> / 6</span></h2><p className="mt-4 text-sm font-medium leading-6 text-white/62">{completed === preparationItems.length ? 'De basis staat. Controleer het live reisadvies opnieuw vlak voor vertrek.' : 'Tik iedere stap aan zodra je hem echt hebt gecontroleerd.'}</p><div className="mt-8 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-saffron transition-all" style={{ width: `${progress}%` }} /></div><span className="mt-2 block text-[10px] font-bold text-white/45">{progress}% voorbereid</span></div>
                <div className="grid gap-px bg-jade/10 sm:grid-cols-2">{preparationItems.map((item, index) => { const selected = checkedItems.includes(index); return <button key={item} type="button" aria-pressed={selected} onClick={() => toggleItem(index)} className={`flex min-h-[118px] items-start gap-4 p-6 text-left transition ${selected ? 'bg-mist' : 'bg-white hover:bg-tonal'}`}><span className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border ${selected ? 'border-jade bg-jade text-white' : 'border-jade/18 text-transparent'}`}><Check size={14} /></span><span><strong className="block text-xs leading-5 text-jade">{item}</strong><span className="mt-2 block text-[9px] font-bold uppercase tracking-[0.11em] text-saffron-dark">{selected ? 'gecontroleerd' : 'nog doen'}</span></span></button>; })}</div>
              </div>
            </div>
          </div>
        </section>

        <section id="noodplan" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom overflow-hidden rounded-[30px] border border-jade/8 bg-white shadow-editorial-lift">
            <div className="grid lg:grid-cols-[1.08fr_0.92fr]"><div className="relative min-h-[520px]"><Image src="/images/redesign/thailand-safety-emergency-kit.webp" alt="Telefoon, documentkopieën, EHBO-set en routekaart als praktisch noodplan" fill sizes="(max-width: 1024px) 100vw, 54vw" className="object-cover" /></div><div className="bg-jade p-7 text-white sm:p-10 lg:p-12"><p className="eyebrow !text-saffron-light">Sla dit offline op</p><h2 className="font-display text-[3.5rem] font-semibold leading-[0.86] tracking-[-0.035em]">Wie bel je wanneer er wél iets gebeurt?</h2><div className="mt-7 grid gap-3">{[
                  { icon: ShieldCheck, number: '191', label: 'Algemene politiehulp' },
                  { icon: PhoneCall, number: '1155', label: 'Tourist Police' },
                  { icon: Ambulance, number: '1669', label: 'Medisch noodgeval' },
                  { icon: Flame, number: '199', label: 'Brandweer' },
                ].map((item) => { const Icon = item.icon; return <div key={item.number} className="flex items-center justify-between rounded-xl border border-white/14 bg-white/[0.06] px-4 py-3"><span className="flex items-center gap-3 text-xs font-extrabold"><Icon size={16} className="text-saffron-light" />{item.label}</span><strong className="font-display text-2xl text-white">{item.number}</strong></div>; })}</div><a href="https://www.nederlandwereldwijd.nl/contact" target="_blank" rel="noopener noreferrer" className="mt-5 flex items-center justify-between border-t border-white/12 pt-5 text-[10px] font-bold text-white/62"><span>NederlandWereldwijd 24/7 · +31 247 247 247</span><ExternalLink size={13} className="text-saffron-light" /></a></div></div>
          </div>
        </section>

        <section className="section-divider-bottom bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[0.68fr_1.32fr] lg:items-end"><SectionHeading eyebrow="Betrouwbaarheid zit in de voorwaarden" title="Controleer aanbieder, traject en flexibiliteit." description="Een affiliatebadge maakt iets niet automatisch veilig. Gebruik partners alleen om echte data en voorwaarden te vergelijken; blijf zelf verantwoordelijk voor de keuze." /><div className="flex flex-wrap gap-2 lg:justify-end"><span className="rounded-full border border-jade/12 bg-white px-4 py-2 text-[10px] font-bold text-jade">annulering</span><span className="rounded-full border border-jade/12 bg-white px-4 py-2 text-[10px] font-bold text-jade">ophaalzone</span><span className="rounded-full border border-jade/12 bg-white px-4 py-2 text-[10px] font-bold text-jade">operator</span></div></div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">{[
              { icon: FileCheck2, eyebrow: 'Verblijf', title: 'Trip.com', text: 'Vergelijk buurt, receptietijden, recente voorwaarden en een flexibele annuleringsoptie.', href: tripHref, label: 'Vergelijk verblijf' },
              { icon: TrainFront, eyebrow: 'Traject', title: '12Go', text: 'Controleer operator, vertrekpunt, aankomsttijd, overstap en bagage als één geheel.', href: transportHref, label: 'Vergelijk vervoer' },
              { icon: Sparkles, eyebrow: 'Activiteit', title: 'Klook', text: 'Lees inclusies, ophaalzone, wijzigingsvoorwaarden en de concrete operatorinformatie.', href: klookHref, label: 'Vergelijk activiteiten' },
            ].map((item) => { const Icon = item.icon; return <article key={item.title} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/30 bg-canvas text-jade"><Icon size={20} /></span><span className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{item.eyebrow}</span></div><h2 className="mt-5 font-display text-3xl font-semibold text-jade">{item.title}</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/60">{item.text}</p><a href={item.href} target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-jade">{item.label} <ExternalLink size={13} className="text-saffron" /></a></article>; })}</div>
            <AffiliateDisclosure className="mt-3">Trip.com, 12Go en Klook zijn affiliate-links. Go2Thailand kan commissie ontvangen zonder dat jouw prijs stijgt. Wij certificeren geen aanbieder en geven geen veiligheids- of uitvoeringsgarantie.</AffiliateDisclosure>
          </div>
        </section>

        <FaqSplitSection id="vragen" eyebrow="Echte Nederlandse zoekvragen" title="Veelgestelde vragen over veilig reizen" description="De vragen zijn ontdubbeld uit vier actuele DataForSEO-SERP’s. Actuele situatievragen verwijzen altijd terug naar de live overheidsbron." items={faqs} />

        <RelatedGuidesSection eyebrow="Verdiep alleen waar nodig" title="Maak je praktische voorbereiding compleet" guides={[
          { title: 'Scams herkennen', description: 'De meest voorkomende patronen en hoe je zonder discussie uitstapt.', href: '/practical-info/scams-safety/', image: '/images/redesign/thailand-safety-emergency-kit.webp', imageAlt: 'Praktische veiligheidsdocumenten en telefoon' },
          { title: 'Vervoer in Thailand', description: 'Vergelijk trein, bus, boot en transfers per traject.', href: '/transport/', image: '/images/redesign/thailand-safety-transport.webp', imageAlt: 'Trein, ferry en hotel als vervoerskeuzes' },
          { title: 'Weer & beste reistijd', description: 'Controleer regen, zeecondities en lokale planning per regio.', href: '/weather/', image: '/images/redesign/thailand-weather-coast-switch.webp', imageAlt: 'Twee Thaise kusten met verschillend weer' },
        ]} />

        <SourceMethodSection eyebrow="Bronnen & actualiteit" title="Veiligheidsadvies hoort een eigenaar te hebben" description="Zoektermen, concurrenten en echte PAA-vragen zijn op 24 juli 2026 via DataForSEO voor Nederland onderzocht. De live bronstatus is op 26 juli opnieuw gecontroleerd. Go2Thailand vertaalt het officiële advies naar praktische keuzes, maar publiceert geen eigen kleurcode, live incidentstatus of zelfbedachte veiligheidsscores." sources={[
          { title: 'Reisadvies Thailand', creator: 'Ministerie van Buitenlandse Zaken · NederlandWereldwijd', url: 'https://www.nederlandwereldwijd.nl/reisadvies/thailand', note: 'Primaire live bron voor kleurcodes, regionale risico’s, verkeerswaarschuwingen, lokale hulpdiensten en consulaire voorbereiding.' },
          { title: 'Tourist Police Thailand', creator: 'Tourist Police Bureau', url: 'https://www.touristpolice.go.th/en/main', note: 'Officiële bron voor hotline 1155 en de Tourist Police-app.' },
          { title: 'National Institute for Emergency Medicine', creator: 'NIEM Thailand', url: 'https://www.niems.go.th/1/SubWebsite/?id=1096', note: 'Officiële bron voor het nationale medische noodnummer 1669.' },
          { title: 'Criminaliteit in het buitenland voorkomen', creator: 'NederlandWereldwijd', url: 'https://www.nederlandwereldwijd.nl/reisadvies/criminaliteit', note: 'Primaire Nederlandse bron voor documentkopieën, thuisfront, zakkenrollerij en handelen na criminaliteit.' },
        ]} />
      </div>
    </>
  );
}
