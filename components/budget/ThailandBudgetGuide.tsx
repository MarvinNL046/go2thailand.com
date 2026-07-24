import { useMemo, useState } from 'react';
import Image from 'next/image';
import {
  BedDouble,
  Calculator,
  Check,
  Coins,
  CreditCard,
  ExternalLink,
  Landmark,
  MapPinned,
  ReceiptText,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  TicketCheck,
  TrainFront,
  Utensils,
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

type StyleKey = 'compact' | 'balanced' | 'comfort';
type RegionKey = 'north' | 'mixed' | 'coast';

interface PlanningBand {
  label: string;
  summary: string;
  stay: [number, number];
  food: [number, number];
  local: [number, number];
  experiences: [number, number];
  intercity: [number, number];
}

const planningBands: Record<StyleKey, PlanningBand> = {
  compact: {
    label: 'Compact', summary: 'Eenvoudige kamer of hostel, lokaal eten, openbaar vervoer en selectieve betaalde dagen.',
    stay: [12, 22], food: [10, 16], local: [5, 8], experiences: [5, 12], intercity: [80, 160],
  },
  balanced: {
    label: 'Gebalanceerd', summary: 'Privékamer, mix van lokale en comfortabele keuzes, plus meerdere gerichte ervaringen.',
    stay: [28, 55], food: [16, 28], local: [8, 15], experiences: [12, 25], intercity: [160, 320],
  },
  comfort: {
    label: 'Comfort', summary: 'Sterkere hotellocatie, ruimer eetbudget, flexibel vervoer en vaker een premium activiteit.',
    stay: [75, 140], food: [30, 55], local: [18, 35], experiences: [30, 65], intercity: [300, 650],
  },
};

const regionFactors: Record<RegionKey, { label: string; factor: number; note: string }> = {
  north: { label: 'Vooral noorden', factor: 1, note: 'Langere verblijven in Noord- of Centraal-Thailand.' },
  mixed: { label: 'Stad + noord + kust', factor: 1.1, note: 'Een gemengde eerste reis met meerdere grote trajecten.' },
  coast: { label: 'Vooral eilanden', factor: 1.22, note: 'Meer bootlogistiek en een grotere kans op duurdere kustlocaties.' },
};

const costCategories = [
  { key: 'stay' as const, label: 'Slapen', icon: BedDouble, copy: 'Locatie, seizoen en annuleringsvoorwaarden wegen vaak zwaarder dan het aantal sterren.', control: 'Vergelijk dezelfde buurt en dezelfde data; kijk pas daarna naar korting.' },
  { key: 'food' as const, label: 'Eten & drinken', icon: Utensils, copy: 'Lokale maaltijden houden de basis laag; drankjes en strandlocaties stapelen sneller op.', control: 'Plan je gewone eetritme en behandel rooftop- of beachclubdagen als aparte ervaring.' },
  { key: 'local' as const, label: 'Lokaal vervoer', icon: TrainFront, copy: 'Losse taxi’s lijken klein, maar worden een budgetlek bij een onhandige hotelbasis.', control: 'Betaal iets meer voor een goede ligging wanneer dat dagelijks ritten voorkomt.' },
  { key: 'experiences' as const, label: 'Ervaringen', icon: Sparkles, copy: 'Bootdagen, privévervoer en kleine groepen verschillen sterk in inhoud en prijs.', control: 'Vergelijk inclusies, entreegeld, ophaalzone en annuleringsvoorwaarden.' },
];

const faqs = [
  { question: 'Hoeveel geld geef je per dag uit in Thailand?', answer: 'Voor een werkbaar eerste plan kun je vaak denken aan ongeveer €35–€60 per persoon per dag voor compact reizen, €70–€125 voor een gebalanceerde reis en vanaf circa €155 voor comfort. Dit zijn planningsbanden exclusief internationale vlucht, geen actuele prijsopgave. Eilanden, hoogseizoen, privétours en eenpersoonskamers verhogen het bedrag.' },
  { question: 'Is 3.000 baht per dag genoeg?', answer: 'Voor veel zelfstandige reizigers kan 3.000 baht per persoon per dag voldoende zijn voor een privékamer, lokaal eten, normaal lokaal vervoer en selectieve activiteiten. Op populaire eilanden of met veel privétours wordt het krapper. Reken daarom in categorieën en controleer je echte hotel- en trajectprijzen voor de reisdatum.' },
  { question: 'Hoeveel geld heb je nodig voor 3 weken in Thailand?', answer: 'De calculator op deze pagina vertaalt 21 dagen naar jouw reisstijl, aantal reizigers en regiokeuze. De uitkomst is exclusief internationale vlucht en bevat een buffer. Deel je hotelkamerkosten correct over het aantal reizigers en zet lange trajecten los van het dagelijkse leefgeld.' },
  { question: 'Hoe duur is het eten in Thailand?', answer: 'Lokaal Thais eten kan een klein deel van je dagbudget blijven, terwijl westerse restaurants, alcohol, koffiebars en strandlocaties het eetbudget snel vergroten. Gebruik daarom geen universele maaltijdprijs: kies in de calculator een reisstijl en controleer ter plaatse menuprijzen voordat je bestelt.' },
  { question: 'Wat kost een biertje in Thailand?', answer: 'De prijs verschilt per winkel, lokaal restaurant, hotel, rooftopbar en eiland. Een bedrag uit een blog veroudert snel en zegt weinig zonder locatie. Behandel alcohol als aparte variabele: één drankje per dag gedurende drie weken heeft meer impact dan een eenmalige duurdere maaltijd.' },
  { question: 'Is het handig om cash mee te nemen naar Thailand?', answer: 'Ja, een beperkte hoeveelheid cash is praktisch voor markten, kleine eetgelegenheden en lokaal vervoer. Neem niet je volledige reisbudget contant mee. Combineer cash met een betaalkaart, bewaar betaalmiddelen gescheiden en kies bij kaart of geldautomaat voor afrekening in Thaise baht wanneer je de keuze krijgt.' },
];

const sectionNav = [
  { href: '#calculator' as const, label: 'Calculator', icon: Calculator },
  { href: '#verdeling' as const, label: 'Verdeling', icon: ReceiptText },
  { href: '#regio' as const, label: 'Regio', icon: MapPinned },
  { href: '#budgetlekken' as const, label: 'Budgetlekken', icon: Coins },
  { href: '#boeken' as const, label: 'Boeken', icon: TicketCheck },
  { href: '#vragen' as const, label: 'Vragen', icon: ShieldCheck },
];

const euro = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
const roundTen = (value: number) => Math.round(value / 10) * 10;

export default function ThailandBudgetGuide() {
  const [days, setDays] = useState(21);
  const [travelers, setTravelers] = useState(2);
  const [style, setStyle] = useState<StyleKey>('balanced');
  const [region, setRegion] = useState<RegionKey>('mixed');
  const band = planningBands[style];
  const regionChoice = regionFactors[region];

  const calculation = useMemo(() => {
    const dailyMin = (band.stay[0] + band.food[0] + band.local[0] + band.experiences[0]) * regionChoice.factor;
    const dailyMax = (band.stay[1] + band.food[1] + band.local[1] + band.experiences[1]) * regionChoice.factor;
    const tripMin = (dailyMin * days + band.intercity[0] * regionChoice.factor) * travelers;
    const tripMax = (dailyMax * days + band.intercity[1] * regionChoice.factor) * travelers;
    const bufferMin = tripMin * 1.1;
    const bufferMax = tripMax * 1.1;
    const midpoint = {
      stay: ((band.stay[0] + band.stay[1]) / 2) * regionChoice.factor,
      food: ((band.food[0] + band.food[1]) / 2) * regionChoice.factor,
      local: ((band.local[0] + band.local[1]) / 2) * regionChoice.factor,
      experiences: ((band.experiences[0] + band.experiences[1]) / 2) * regionChoice.factor,
    };
    const midpointTotal = Object.values(midpoint).reduce((sum, value) => sum + value, 0);
    return {
      perDay: [roundTen(dailyMin), roundTen(dailyMax)] as [number, number],
      trip: [roundTen(bufferMin), roundTen(bufferMax)] as [number, number],
      shares: Object.fromEntries(Object.entries(midpoint).map(([key, value]) => [key, Math.round((value / midpointTotal) * 100)])) as Record<keyof typeof midpoint, number>,
    };
  }, [band, days, regionChoice.factor, travelers]);

  const subId = 'nl-thailand-budget';
  const tripHref = withPlacementSubId(TRIP_GENERIC, subId, 'hotels');
  const transportHref = withPlacementSubId(TWELVEGO_GENERIC, subId, 'transport');
  const klookHref = withPlacementSubId(KLOOK_GENERIC, subId, 'activities');

  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) };
  const webPageSchema = { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Is Thailand duur? Budget en kosten per dag', description: 'Interactieve Thailand-budgetcalculator met planningsbanden per reisstijl, reisduur en regio.', url: 'https://go2-thailand.com/nl/thailand-index/budget/', inLanguage: 'nl-NL', dateModified: '2026-07-24' };
  const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://go2-thailand.com/nl/' }, { '@type': 'ListItem', position: 2, name: 'Thailand budget', item: 'https://go2-thailand.com/nl/thailand-index/budget/' }] };

  return (
    <>
      <SEOHead title="Is Thailand duur? Budget en kosten per dag | Go2Thailand" description="Bereken je Thailand-budget per dag en voor 2, 3 of 4 weken. Vergelijk reisstijlen, regio’s, kostenposten en verborgen uitgaven zonder schijnprecisie." ogImage="https://go2-thailand.com/images/redesign/thailand-budget-hero.webp">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </SEOHead>

      <main className="bg-canvas text-charcoal">
        <EditorialHero
          image="/images/redesign/thailand-budget-hero.webp"
          imageAlt="Thaise maaltijd, vervoer en reisnotitie aan de rivier als onderdelen van een reisbudget"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Budget & kosten' }]}
          eyebrow="Plan in keuzes, niet in één magisch bedrag"
          title={<>Is Thailand<br /><span className="text-saffron-dark">duur?</span></>}
          subtitle="Je hotel, route en kustkeuze bepalen meer dan de prijs van pad thai."
          description="Bouw een realistisch reisbudget voor jouw aantal dagen, reizigers en reisstijl. Je krijgt een bandbreedte met buffer — geen nep-exact tarief dat morgen alweer verouderd is."
          actions={[{ label: 'Bereken je budget', href: '#calculator', kind: 'primary' }, { label: 'Bekijk waar kosten ontstaan', href: '#verdeling', kind: 'secondary' }]}
          minHeightClassName="min-h-[720px] lg:min-h-[700px]"
          titleClassName="max-w-[650px] text-[4.5rem] leading-[0.82] sm:text-[5.7rem] lg:text-[6.5rem]"
          imageClassName="object-cover object-[70%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(250,247,240,0.05)_0%,rgba(250,247,240,0.4)_46%,rgba(250,247,240,0.98)_100%)] lg:bg-[linear-gradient(90deg,rgba(250,247,240,0.97)_0%,rgba(250,247,240,0.9)_37%,rgba(250,247,240,0.08)_61%,rgba(4,42,34,0.05)_100%)]"
          sideCard={<div className="absolute bottom-8 right-[max(2rem,calc((100vw-1280px)/2))] z-10 hidden w-[306px] rounded-2xl border border-white/30 bg-jade/82 p-5 text-white shadow-editorial-card backdrop-blur-lg xl:block"><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">Kort antwoord</p><p className="mt-3 font-display text-2xl font-semibold leading-tight">Thailand hoeft niet duur te zijn. Een onrustige route vaak wel.</p><div className="mt-4 flex items-center gap-3 border-t border-white/12 pt-4 text-[10px] font-semibold text-white/58"><ReceiptText size={16} className="text-saffron-light" />Reken hotel, vervoer en ervaringen apart.</div></div>}
        />

        <PageSectionNav items={sectionNav} />

        <section className="section-divider-bottom py-14 lg:py-20">
          <div className="container-custom grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <SectionHeading eyebrow="Het eerlijke antwoord" title="Betaalbaar is niet hetzelfde als goedkoop." description="Thailand geeft veel speelruimte, maar populaire kustplaatsen, korte verblijven en veel binnenlandse verplaatsingen maken die ruimte snel kleiner." />
            <div className="grid gap-4 sm:grid-cols-3">
              {(Object.keys(planningBands) as StyleKey[]).map((key) => { const item = planningBands[key]; return <article key={key} className={`rounded-2xl border p-5 ${key === 'balanced' ? 'border-saffron/35 bg-jade text-white shadow-editorial-lift' : 'border-jade/10 bg-white shadow-editorial-card'}`}><p className={`text-[9px] font-extrabold uppercase tracking-[0.13em] ${key === 'balanced' ? 'text-saffron-light' : 'text-saffron-dark'}`}>{item.label}</p><strong className={`mt-3 block font-display text-3xl font-semibold ${key === 'balanced' ? 'text-white' : 'text-jade'}`}>{euro.format(item.stay[0] + item.food[0] + item.local[0] + item.experiences[0])}–{euro.format(item.stay[1] + item.food[1] + item.local[1] + item.experiences[1])}</strong><span className={`text-[10px] font-bold ${key === 'balanced' ? 'text-white/55' : 'text-charcoal/48'}`}>per persoon per dag · basisband</span><p className={`mt-4 text-xs font-medium leading-5 ${key === 'balanced' ? 'text-white/65' : 'text-charcoal/62'}`}>{item.summary}</p></article>; })}
            </div>
          </div>
        </section>

        <section id="calculator" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading eyebrow="Interactieve budgetplanner" title="Wat kost jóuw Thailand-reis?" description="Kies je reisduur, groepsgrootte, comfort en route. De uitkomst bevat 10% buffer, maar geen internationale vlucht. Controleer daarna je echte hotel- en trajectprijzen." />
            <div className="mt-10 overflow-hidden rounded-[28px] border border-jade/10 bg-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[0.94fr_1.06fr]">
                <div className="p-6 sm:p-9">
                  <fieldset><legend className="text-xs font-extrabold text-jade">Hoe lang reis je?</legend><div className="mt-3 grid grid-cols-4 gap-2">{[10, 14, 21, 28].map((value) => <button key={value} type="button" aria-pressed={days === value} onClick={() => setDays(value)} className={`min-h-12 rounded-xl border text-xs font-extrabold transition ${days === value ? 'border-jade bg-jade text-white' : 'border-jade/12 bg-canvas text-jade hover:border-saffron/45'}`}>{value} d</button>)}</div></fieldset>
                  <fieldset className="mt-7"><legend className="text-xs font-extrabold text-jade">Hoeveel reizigers?</legend><div className="mt-3 grid grid-cols-4 gap-2">{[1, 2, 3, 4].map((value) => <button key={value} type="button" aria-pressed={travelers === value} onClick={() => setTravelers(value)} className={`min-h-12 rounded-xl border text-xs font-extrabold transition ${travelers === value ? 'border-jade bg-jade text-white' : 'border-jade/12 bg-canvas text-jade hover:border-saffron/45'}`}>{value}</button>)}</div></fieldset>
                  <fieldset className="mt-7"><legend className="text-xs font-extrabold text-jade">Welke reisstijl past?</legend><div className="mt-3 grid gap-2 sm:grid-cols-3">{(Object.keys(planningBands) as StyleKey[]).map((key) => <button key={key} type="button" aria-pressed={style === key} onClick={() => setStyle(key)} className={`rounded-xl border p-4 text-left transition ${style === key ? 'border-saffron bg-saffron/10' : 'border-jade/10 bg-canvas hover:border-saffron/35'}`}><strong className="block text-xs text-jade">{planningBands[key].label}</strong><span className="mt-1 block text-[10px] leading-4 text-charcoal/52">{key === 'compact' ? 'simpel & selectief' : key === 'balanced' ? 'comfort met keuzes' : 'vrijheid & premium'}</span></button>)}</div></fieldset>
                  <fieldset className="mt-7"><legend className="text-xs font-extrabold text-jade">Waar ligt de nadruk?</legend><div className="mt-3 grid gap-2 sm:grid-cols-3">{(Object.keys(regionFactors) as RegionKey[]).map((key) => <button key={key} type="button" aria-pressed={region === key} onClick={() => setRegion(key)} className={`rounded-xl border p-4 text-left transition ${region === key ? 'border-saffron bg-saffron/10' : 'border-jade/10 bg-canvas hover:border-saffron/35'}`}><strong className="block text-xs text-jade">{regionFactors[key].label}</strong></button>)}</div><p className="mt-3 text-[10px] font-medium leading-4 text-charcoal/48">{regionChoice.note}</p></fieldset>
                </div>
                <div className="bg-jade p-7 text-white sm:p-10" aria-live="polite">
                  <p className="eyebrow !text-saffron-light">Jouw planningsband</p>
                  <h2 className="font-display text-[3.7rem] font-semibold leading-[0.84] tracking-[-0.04em]">{euro.format(calculation.trip[0])}<br /><span className="text-saffron-light">tot {euro.format(calculation.trip[1])}</span></h2>
                  <p className="mt-4 text-sm font-medium leading-6 text-white/66">Voor {travelers} {travelers === 1 ? 'reiziger' : 'reizigers'} · {days} dagen · {band.label.toLowerCase()} · inclusief 10% buffer.</p>
                  <div className="mt-7 rounded-2xl border border-white/12 bg-white/[0.06] p-5"><div className="flex items-end justify-between gap-4"><div><span className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-white/45">Per persoon per dag</span><strong className="mt-1 block font-display text-3xl text-white">{euro.format(calculation.perDay[0])}–{euro.format(calculation.perDay[1])}</strong></div><Calculator size={24} className="text-saffron-light" /></div></div>
                  <div className="mt-7 space-y-4">{costCategories.map((category) => { const Icon = category.icon; const share = calculation.shares[category.key]; return <div key={category.key}><div className="mb-2 flex items-center justify-between text-[10px] font-bold"><span className="flex items-center gap-2 text-white/70"><Icon size={14} className="text-saffron-light" />{category.label}</span><span>{share}%</span></div><div className="h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-saffron" style={{ width: `${share}%` }} /></div></div>; })}</div>
                  <p className="mt-7 border-t border-white/12 pt-5 text-[10px] font-medium leading-5 text-white/46">Rekenmodel: categoriebanden × regiocorrectie + een intercityband + 10% buffer. Geen offerte, wisselkoers of garantie; prijzen veranderen per datum, locatie en aanbieder.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="verdeling" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading eyebrow="Vier schuiven bepalen de uitkomst" title="Waar gaat je reisgeld werkelijk heen?" description="De goedkoopste lunch compenseert geen verkeerd gelegen hotel of zes onnodige taxiritten. Stuur daarom eerst de grote patronen." />
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{costCategories.map((category, index) => { const Icon = category.icon; return <article key={category.key} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/30 bg-canvas text-jade"><Icon size={20} /></span><span className="font-display text-4xl font-semibold text-jade/10">0{index + 1}</span></div><h2 className="mt-5 font-display text-[1.9rem] font-semibold text-jade">{category.label}</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/62">{category.copy}</p><p className="mt-5 border-t border-jade/10 pt-4 text-[10px] font-bold leading-4 text-saffron-dark">{category.control}</p></article>; })}</div>
          </div>
        </section>

        <section id="regio" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading eyebrow="Dezelfde reisstijl, andere uitkomst" title="Je route is óók een budgetkeuze." description="Een langere basis in het noorden werkt anders dan korte eilandstops. Vergelijk regio’s niet op één losse hotelprijs, maar op verblijf, vervoer en activiteiten samen." />
            <div className="relative mt-10 min-h-[600px] overflow-hidden rounded-[30px] shadow-editorial-lift"><Image src="/images/redesign/thailand-budget-regions.webp" alt="Bangkok, Noord-Thailand en de zuidelijke kust verbonden als drie budgetregio’s" fill sizes="100vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-jade/95 via-jade/14 to-transparent" /><div className="absolute inset-x-5 bottom-5 grid gap-3 md:inset-x-8 md:bottom-8 md:grid-cols-3">{[['Bangkok', 'Meer keuzes, maar ligging bepaalt hoeveel lokaal vervoer je blijft kopen.'], ['Noord-Thailand', 'Langere verblijven en lokale eetpatronen geven vaak meer budgetruimte.'], ['Kust & eilanden', 'Bootlogistiek, strandlocatie en seizoen maken dezelfde comfortkeuze gevoeliger.']].map(([title, text]) => <article key={title} className="rounded-2xl border border-white/18 bg-jade/75 p-5 text-white backdrop-blur-md"><h2 className="font-display text-2xl font-semibold">{title}</h2><p className="mt-3 text-xs font-medium leading-5 text-white/64">{text}</p></article>)}</div></div>
          </div>
        </section>

        <section id="budgetlekken" className="section-divider-bottom scroll-mt-24 bg-mist py-16 lg:py-24">
          <div className="container-custom overflow-hidden rounded-[30px] bg-white shadow-editorial-lift">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]"><div className="relative min-h-[480px]"><Image src="/images/redesign/thailand-budget-leaks.webp" alt="Hotelkey, ferryticket, taxi, drankje en zonnebrand als verborgen kostenposten" fill sizes="(max-width: 1024px) 100vw, 52vw" className="object-cover" /></div><div className="bg-jade p-7 text-white sm:p-10 lg:p-12"><p className="eyebrow !text-saffron-light">Waar kleine bedragen groot worden</p><h2 className="font-display text-[3.5rem] font-semibold leading-[0.86] tracking-[-0.035em]">Vijf budgetlekken die geen “grote aankoop” lijken.</h2><div className="mt-7 space-y-3">{[['Korte verblijven', 'Elke wissel voegt vervoer, wachttijd en vaak duurdere aankomstkeuzes toe.'], ['Hotel op de verkeerde plek', 'Een lagere kamerprijs kan dagelijks extra ritten veroorzaken.'], ['Niet inbegrepen', 'Entreegeld, transfer, materiaal en lunch verschillen per activiteit.'], ['Dorst op toplocatie', 'Drankjes, alcohol en strandservice vergroten het eetbudget ongemerkt.'], ['Geen buffer', 'Weer, gemiste aansluiting of wijziging wordt dan direct een probleem.']].map(([title, text]) => <article key={title} className="flex gap-3 border-b border-white/10 pb-3"><Check size={15} className="mt-1 shrink-0 text-saffron-light" /><div><h3 className="text-xs font-extrabold">{title}</h3><p className="mt-1 text-[10px] font-medium leading-4 text-white/55">{text}</p></div></article>)}</div></div></div>
          </div>
        </section>

        <section className="section-divider-bottom py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.68fr_1.32fr]">
            <SectionHeading eyebrow="Cash, kaart en wisselkoers" title="Betaal slim zonder je reis als bankkluis te behandelen." description="Een goede betaalmix voorkomt dat één verloren kaart of een dure conversiekeuze je hele budget raakt." />
            <div className="grid gap-4 sm:grid-cols-3">{[
              { icon: Coins, title: 'Cash voor klein', text: 'Markten, kleine eetplekken en lokaal vervoer vragen regelmatig contant geld. Neem niet je hele reisbudget ineens op.' },
              { icon: CreditCard, title: 'Kaart als tweede spoor', text: 'Bewaar betaalmiddelen gescheiden en controleer vóór vertrek limieten, blokkades en kosten van je eigen bank.' },
              { icon: Landmark, title: 'Kies THB', text: 'Wanneer een automaat of terminal omrekent naar euro’s, vergelijk dan eerst de koers en kosten. De aangeboden conversie is niet automatisch gunstig.' },
            ].map((item) => { const Icon = item.icon; return <article key={item.title} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/30 bg-canvas text-jade"><Icon size={20} /></span><h2 className="mt-5 font-display text-2xl font-semibold text-jade">{item.title}</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/60">{item.text}</p></article>; })}</div>
          </div>
        </section>

        <section id="boeken" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end"><SectionHeading eyebrow="Vervang aannames door echte quotes" title="Controleer de drie grootste variabelen." description="Gebruik de calculator voor richting. Open daarna je echte reisdata en noteer de totaalprijs, annuleringsvoorwaarden en wat inbegrepen is." /><div className="flex flex-wrap gap-2 lg:justify-end"><span className="rounded-full border border-jade/12 bg-white px-4 py-2 text-[10px] font-bold text-jade">hotel per nacht</span><span className="rounded-full border border-jade/12 bg-white px-4 py-2 text-[10px] font-bold text-jade">lange trajecten</span><span className="rounded-full border border-jade/12 bg-white px-4 py-2 text-[10px] font-bold text-jade">grote ervaringen</span></div></div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">{[
              { icon: BedDouble, eyebrow: 'Slapen', title: 'Trip.com', text: 'Vergelijk dezelfde buurt, data, kamertype en annuleringsvoorwaarden.', href: tripHref, label: 'Vergelijk hotels' },
              { icon: TrainFront, eyebrow: 'Verplaatsen', title: '12Go', text: 'Controleer aanbieder, terminal, bagage en overstaptijd per traject.', href: transportHref, label: 'Vergelijk vervoer' },
              { icon: ShoppingBag, eyebrow: 'Ervaren', title: 'Klook', text: 'Vergelijk inclusies, ophaalzone en voorwaarden van het specifieke product.', href: klookHref, label: 'Vergelijk uitjes' },
            ].map((item) => { const Icon = item.icon; return <article key={item.title} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/30 bg-canvas text-jade"><Icon size={20} /></span><span className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{item.eyebrow}</span></div><h2 className="mt-5 font-display text-3xl font-semibold text-jade">{item.title}</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/60">{item.text}</p><a href={item.href} target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-jade">{item.label} <ExternalLink size={13} className="text-saffron" /></a></article>; })}</div>
            <AffiliateDisclosure className="mt-3">De drie externe knoppen zijn affiliate-links. Go2Thailand kan commissie ontvangen zonder dat jouw prijs stijgt. De calculator gebruikt geen partnerprijzen; actuele prijs, beschikbaarheid en voorwaarden staan bij de aanbieder.</AffiliateDisclosure>
          </div>
        </section>

        <FaqSplitSection id="vragen" eyebrow="Echte Nederlandse zoekvragen" title="Veelgestelde vragen over kosten in Thailand" description="De vragen zijn ontdubbeld uit vijf actuele DataForSEO-SERP’s. De antwoorden gebruiken bandbreedtes en beslisregels; bedragen blijven planningshulp, geen prijsbelofte." items={faqs} />

        <RelatedGuidesSection eyebrow="Van budget naar reis" title="Plan de rest in de juiste volgorde" guides={[
          { title: 'Thailand reisroute', description: 'Minder verhuisdagen betekent vaak ook minder verborgen kosten.', href: '/thailand-itinerary/', image: '/images/redesign/thailand-route-hero.webp', imageAlt: 'Route door Thailand van stad naar kust' },
          { title: 'Vervoer in Thailand', description: 'Vergelijk trein, bus, boot en vlucht voor elk lang traject.', href: '/transport/', image: '/images/redesign/transport-thailand-hero.webp', imageAlt: 'Vervoer door Thailand' },
          { title: 'Paklijst Thailand', description: 'Neem mee wat echt nodig is en voorkom nood- of dubbele aankopen.', href: '/travel-gear/', image: '/images/redesign/travel-gear-hero.webp', imageAlt: 'Compacte bagage voor Thailand' },
        ]} />

        <SourceMethodSection eyebrow="Bronnen & rekenmethode" title="Waarom we geen ‘live prijzen’ veinzen" description="Zoektermen, concurrenten en echte PAA-vragen zijn op 24 juli 2026 via DataForSEO voor Nederland onderzocht. De planningsbanden zijn redactionele scenario’s op basis van meerdere Nederlandse kostengidsen; actuele partnerprijzen worden niet ingelezen. Wisselkoers, hoteldata en trajectvoorwaarden moet je voor jouw vertrek opnieuw controleren." sources={[
          { title: 'Referentiewisselkoersen en financiële statistiek', creator: 'Bank of Thailand', url: 'https://www.bot.or.th/en/statistics/exchange-rate.html', note: 'Primaire bron om actuele baht-wisselkoersen te controleren; de calculator rekent bewust in eurobanden en gebruikt geen vaste live koers.' },
          { title: 'Officiële treinreserveringen', creator: 'State Railway of Thailand', url: 'https://www.dticket.railway.co.th/DTicketPublicWeb/home/Home', note: 'Voor controle van actuele treinopties en beschikbaarheid op een concrete datum.' },
          { title: 'Kosten van reizen in Thailand', creator: 'Reisjunk', url: 'https://www.reisjunk.nl/thailand/kosten/', note: 'Nederlandse concurrentiebenchmark voor categorieën en backpackercontext; niet als live prijslijst overgenomen.' },
          { title: 'Kosten Thailand en dagbudget', creator: 'Travelalut', url: 'https://www.travelalut.com/thailand/kosten-thailand-budget/', note: 'Nederlandse concurrentiebenchmark voor dagbudget, eten, vervoer, verblijf en excursies.' },
        ]} />
      </main>
    </>
  );
}
