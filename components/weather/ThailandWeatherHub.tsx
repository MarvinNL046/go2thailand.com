import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  CalendarDays,
  CloudRain,
  ExternalLink,
  MapPinned,
  Mountain,
  Navigation,
  ShieldCheck,
  Shirt,
  Sparkles,
  Sun,
  ThermometerSun,
  Umbrella,
  Waves,
  Wind,
} from 'lucide-react';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';
import { KLOOK_GENERIC, TRIP_GENERIC, withPlacementSubId } from '../../lib/affiliates';
import {
  bangkokWeatherGuide,
  chiangMaiWeatherGuide,
  kohSamuiWeatherGuide,
  krabiWeatherGuide,
  phuketWeatherGuide,
} from '../../data/weather/nl';

const monthSlugs = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'] as const;

const monthVerdicts = [
  { title: 'Sterke allround maand', note: 'Vaak een goede combinatie voor stad, noorden en Andamankust; populair en dus drukker.' },
  { title: 'Droog, helder en populair', note: 'Sterk voor veel routes. In Noord-Thailand neemt hitte en kans op haze later in de maand toe.' },
  { title: 'Kies op activiteit', note: 'Heet in stad en noorden; kustkeuze en luchtkwaliteit worden belangrijker.' },
  { title: 'Hitte bepaalt je ritme', note: 'Plan vroege dagen, rust in de middag en controleer lokale omstandigheden rond Songkran.' },
  { title: 'Overgang naar groener weer', note: 'Buienkans groeit, vooral aan de Andamankust. Flexibiliteit wordt waardevoller.' },
  { title: 'Groen seizoen met kustverschil', note: 'Niet heel Thailand heeft hetzelfde patroon; kijk naar regio, wind en zeecondities.' },
  { title: 'Zomerreis vraagt een kustkeuze', note: 'Noord en centraal zijn groen en wisselvallig; de Golf kan een logischer strandroute zijn.' },
  { title: 'Reken op tropische variatie', note: 'Een droge dag en een stevige bui kunnen in dezelfde reisweek voorkomen.' },
  { title: 'Natste signalen op meerdere plekken', note: 'Plan minder strak, houd bootdagen flexibel en volg waarschuwingen.' },
  { title: 'Overgang verschilt per kust', note: 'Het noorden en Bangkok kunnen opklaren terwijl de Golf juist natter wordt.' },
  { title: 'Noorden en Andaman openen op', note: 'Een sterke routeperiode, maar de Golf kan nog een ander regenpatroon hebben.' },
  { title: 'Koeler ritme, hoogseizoen', note: 'Vaak sterk voor een brede rondreis; boek populaire hotels en trajecten eerder.' },
] as const;

const representativeRegions = [
  { label: 'Noord', city: 'Chiang Mai', href: '/city/chiang-mai/weather/', icon: Mountain, data: chiangMaiWeatherGuide },
  { label: 'Centraal', city: 'Bangkok', href: '/city/bangkok/weather/', icon: MapPinned, data: bangkokWeatherGuide },
  { label: 'Andaman', city: 'Krabi', href: '/city/krabi/weather/', icon: Waves, data: krabiWeatherGuide },
  { label: 'Andaman', city: 'Phuket', href: '/city/phuket/weather/', icon: Waves, data: phuketWeatherGuide },
  { label: 'Golf', city: 'Koh Samui', href: '/city/koh-samui/weather/', icon: Wind, data: kohSamuiWeatherGuide },
] as const;

const faqs = [
  { question: 'Wat is de beste tijd om naar Thailand te gaan?', answer: 'November tot en met februari is vaak de sterkste periode voor een brede route door Bangkok, Noord-Thailand en de Andamankust. Dat is geen garantie voor heel Thailand: de Golfkust heeft een ander regenpatroon en drukte, prijzen, hitte en luchtkwaliteit kunnen jouw beste maand veranderen.' },
  { question: 'Wanneer is het regenseizoen in Thailand?', answer: 'Er bestaat geen enkel landelijk begin- en eindpunt. In veel delen van Noord- en Centraal-Thailand en aan de Andamankust neemt de zuidwestmoesson grofweg vanaf mei toe en wordt het later in het jaar droger. De Golfkust, waaronder Koh Samui, krijgt vaak later in het jaar meer regen. Kies daarom eerst regio en kust.' },
  { question: 'Is het regenseizoen in Thailand erg?', answer: 'Dat hangt af van plaats, activiteit en dag. Een regendag in klimaatdata betekent niet automatisch onafgebroken regen. Voor stadsdagen kan een korte bui goed op te vangen zijn; voor een boottocht zijn wind, golven en waarschuwingen belangrijker dan alleen het regenicoon.' },
  { question: 'Wat is de natste maand in Thailand?', answer: 'Er is geen betrouwbare landelijke winnaar, omdat stations en kusten verschillen. September en oktober zijn op meerdere noordelijke, centrale en Andaman-stations vaak nat, terwijl de Golfkust later in het jaar een andere piek kan hebben. Bekijk de maandselector en daarna de lokale weerspagina.' },
  { question: 'Wat zijn de beste en slechtste maanden om Thailand te bezoeken?', answer: 'Een universeel beste of slechtste maand bestaat niet. Januari en februari zijn sterke allround keuzes maar drukker; april is heet; september vraagt vaak de meeste flexibiliteit; november kan uitstekend zijn voor Noord-Thailand en Andaman terwijl de Golf nog natter kan zijn.' },
  { question: 'Kan ik Thailand in juli of augustus bezoeken?', answer: 'Ja. Verwacht een groener landschap en een grotere buienkans, plan minder strak en kies de kust bewust. Controleer vóór bootdagen altijd de actuele lokale verwachting en waarschuwingen. Een zomerreis is geen mislukte droogseizoenreis, maar een andere routekeuze.' },
];

const sectionNav = [
  { href: '#maandkiezer' as const, label: 'Per maand', icon: CalendarDays },
  { href: '#kustwissel' as const, label: 'Kustwissel', icon: Waves },
  { href: '#seizoenen' as const, label: 'Seizoenen', icon: Sun },
  { href: '#plan-b' as const, label: 'Plan B', icon: Umbrella },
  { href: '#boeken' as const, label: 'Boeken', icon: Navigation },
  { href: '#vragen' as const, label: 'Vragen', icon: ShieldCheck },
];

function toneClasses(tone: 'best' | 'good' | 'mixed' | 'wet') {
  if (tone === 'best') return 'bg-jade text-white';
  if (tone === 'good') return 'bg-mist text-jade';
  if (tone === 'mixed') return 'bg-saffron/12 text-jade';
  return 'bg-[#dbe7ea] text-jade';
}

export default function ThailandWeatherHub() {
  const [monthIndex, setMonthIndex] = useState(0);
  const selectedMonth = representativeRegions[0].data.months[monthIndex];
  const verdict = monthVerdicts[monthIndex];
  const subId = 'nl-thailand-weather-hub';
  const tripHref = withPlacementSubId(TRIP_GENERIC, subId, 'flexible-hotels');
  const klookHref = withPlacementSubId(KLOOK_GENERIC, subId, 'weather-flexible-activities');

  const regionRows = useMemo(() => representativeRegions.map((region) => ({
    ...region,
    month: region.data.months[monthIndex],
  })), [monthIndex]);

  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) };
  const webPageSchema = { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Beste reistijd Thailand: weer, klimaat en regenseizoen', description: 'Kies de beste reistijd voor jouw Thailand-route met een interactieve maand- en regiovergelijking, kustverschillen en officiële klimaatnormalen.', url: 'https://go2-thailand.com/nl/weather/', inLanguage: 'nl-NL', dateModified: '2026-07-26' };
  const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://go2-thailand.com/nl/' }, { '@type': 'ListItem', position: 2, name: 'Weer en beste reistijd', item: 'https://go2-thailand.com/nl/weather/' }] };
  const datasetSchema = { '@context': 'https://schema.org', '@type': 'Dataset', name: 'Klimaatnormalen Thailand per maand en regio', description: 'Interactieve vergelijking van maandgemiddelden voor Chiang Mai, Bangkok, Krabi, Phuket en Koh Samui op basis van officiële TMD-klimaatnormalen 1991–2020.', url: 'https://go2-thailand.com/nl/weather/', temporalCoverage: '1991/2020', spatialCoverage: representativeRegions.map((region) => ({ '@type': 'Place', name: `${region.city}, Thailand` })), creator: { '@type': 'Organization', name: 'Thai Meteorological Department', url: 'https://www.tmd.go.th/' }, variableMeasured: ['Gemiddelde maximumtemperatuur', 'Gemiddelde maandneerslag', 'Gemiddeld aantal regendagen'] };

  return (
    <>
      <SEOHead
        title="Beste reistijd Thailand: weer & regenseizoen | Go2Thailand"
        description="Kies de beste reistijd voor Thailand per maand, regio en kust. Vergelijk officiële klimaatnormalen, regenseizoen, hitte en slimme plan-B-keuzes."
        ogImage="https://go2-thailand.com/images/redesign/thailand-weather-hub-hero.webp"
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      </SEOHead>

      <div className="bg-canvas text-charcoal">
        <EditorialHero
          image="/images/redesign/thailand-weather-hub-hero.webp"
          imageAlt="Thailand van mistig noorden via Bangkok naar een tropische kust met wisselend weer"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Weer & beste reistijd' }]}
          eyebrow="Kies je route vóór je een maand kiest"
          title={<>Beste reistijd<br /><span className="text-saffron">Thailand?</span></>}
          subtitle="Niet één seizoen. Wel de juiste regio op het juiste moment."
          description="Vergelijk twaalf maanden met officiële klimaatnormalen voor vijf bestemmingen. Zie daarna waarom Andaman en de Golf nooit in één simpel regenlabel passen."
          actions={[{ label: 'Vergelijk jouw maand', href: '#maandkiezer', kind: 'primary' }, { label: 'Begrijp de kustwissel', href: '#kustwissel', kind: 'secondary' }]}
          minHeightClassName="min-h-[720px] lg:min-h-[710px]"
          titleClassName="max-w-[720px] text-[4rem] leading-[0.86] !text-white sm:text-[5.5rem] lg:text-[6.25rem]"
          subtitleClassName="max-w-[610px] !text-white"
          descriptionClassName="mt-4 max-w-[600px] text-sm leading-7 !text-white/80"
          imageClassName="object-cover object-[61%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(6,45,37,0.24)_0%,rgba(6,45,37,0.34)_42%,rgba(6,45,37,0.92)_100%)] lg:bg-[linear-gradient(90deg,rgba(4,42,34,0.98)_0%,rgba(4,42,34,0.9)_38%,rgba(4,42,34,0.18)_62%,rgba(4,42,34,0.04)_100%)]"
          contentClassName="max-w-[680px] [&_nav]:!text-white/60 [&_nav_span]:!text-white/75"
          sideCard={<div className="absolute bottom-8 right-[max(2rem,calc((100vw-1280px)/2))] z-10 hidden w-[310px] rounded-2xl border border-white/25 bg-jade/78 p-5 text-white shadow-editorial-card backdrop-blur-lg xl:block"><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">De beslisregel</p><p className="mt-3 font-display text-2xl font-semibold leading-tight">Maand + regio + activiteit. Pas dán heb je een reisadvies.</p><div className="mt-4 flex items-center gap-3 border-t border-white/12 pt-4 text-[10px] font-semibold text-white/58"><CloudRain size={16} className="text-saffron-light" />Klimaat is geen dagvoorspelling.</div></div>}
        />

        <PageSectionNav items={sectionNav} />

        <section className="section-divider-bottom py-14 lg:py-20">
          <div className="container-custom grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <SectionHeading eyebrow="Het korte antwoord" title="Er is geen beste maand voor heel Thailand." description="De veilige vuistregel november–februari helpt bij een eerste rondreis, maar verbergt het belangrijkste verschil: het noorden, Bangkok, Andaman en de Golf lopen niet gelijk." />
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: Mountain, label: 'Brede rondreis', value: 'nov – feb', text: 'Vaak het meest gebalanceerd voor stad, noorden en Andamankust.' },
                { icon: Waves, label: 'Andamankust', value: 'dec – mrt', text: 'Gemiddeld droger; controleer wind en golven voor iedere bootdag.' },
                { icon: Sun, label: 'Golfkust', value: 'jan – sep', text: 'Vaak een andere zomeroptie, met een natter signaal later in het jaar.' },
              ].map((item, index) => { const Icon = item.icon; return <article key={item.label} className={`rounded-2xl border p-5 ${index === 1 ? 'border-saffron/35 bg-jade text-white shadow-editorial-lift' : 'border-jade/10 bg-white shadow-editorial-card'}`}><div className="flex items-center justify-between"><span className={`grid h-10 w-10 place-items-center rounded-xl border ${index === 1 ? 'border-white/18 text-saffron-light' : 'border-saffron/28 text-jade'}`}><Icon size={19} /></span><span className={`text-[9px] font-extrabold uppercase tracking-[0.13em] ${index === 1 ? 'text-saffron-light' : 'text-saffron-dark'}`}>{item.label}</span></div><strong className={`mt-5 block font-display text-3xl font-semibold ${index === 1 ? 'text-white' : 'text-jade'}`}>{item.value}</strong><p className={`mt-3 text-xs font-medium leading-5 ${index === 1 ? 'text-white/62' : 'text-charcoal/58'}`}>{item.text}</p></article>; })}
            </div>
          </div>
        </section>

        <section id="maandkiezer" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading eyebrow="Interactieve maandvergelijker" title="Wat doet jouw maand per regio?" description="De cijfers zijn TMD-klimaatnormalen 1991–2020 van representatieve stations. Ze tonen een langjarig patroon, geen verwachting voor jouw specifieke reisdag." />
            <div className="mt-9 grid grid-cols-6 gap-2 lg:grid-cols-12" role="group" aria-label="Kies een reismaand">
              {representativeRegions[0].data.months.map((month, index) => <button key={month.slug} type="button" aria-pressed={monthIndex === index} onClick={() => setMonthIndex(index)} className={`min-h-12 rounded-xl border px-2 text-[10px] font-extrabold transition ${monthIndex === index ? 'border-jade bg-jade text-white shadow-editorial-card' : 'border-jade/10 bg-white text-jade hover:border-saffron/40'}`}>{month.shortName}</button>)}
            </div>

            <div className="mt-5 rounded-[28px] border border-jade/10 bg-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
                <div className="bg-jade p-7 text-white sm:p-10" aria-live="polite">
                  <p className="eyebrow !text-saffron-light">{selectedMonth.name} in perspectief</p>
                  <h2 className="font-display text-[3.8rem] font-semibold leading-[0.86] tracking-[-0.04em]">{verdict.title}</h2>
                  <p className="mt-5 text-sm font-medium leading-6 text-white/66">{verdict.note}</p>
                  <div className="mt-8 rounded-2xl border border-white/12 bg-white/[0.06] p-5"><p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-white/42">Lees de data goed</p><p className="mt-3 text-xs font-semibold leading-5 text-white/72">Een regendag telt al wanneer meetbare neerslag valt. Hij zegt niet dat je dag volledig verregent.</p></div>
                  <Link href={`/thailand-in/${monthSlugs[monthIndex]}/`} className="mt-7 inline-flex items-center gap-2 text-xs font-extrabold text-white">Bekijk de volledige maandgids <ExternalLink size={13} className="text-saffron-light" /></Link>
                </div>
                <div className="grid gap-px bg-jade/10 sm:grid-cols-2">
                  {regionRows.map((region, index) => { const Icon = region.icon; return <article key={region.city} className={`bg-white p-6 sm:p-7 ${index === regionRows.length - 1 ? 'sm:col-span-2' : ''}`}><div className="flex items-start justify-between gap-4"><div><p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">{region.label}</p><h3 className="mt-2 font-display text-2xl font-semibold text-jade">{region.city}</h3></div><span className={`grid h-10 w-10 place-items-center rounded-xl ${toneClasses(region.month.travelTone)}`}><Icon size={18} /></span></div><div className="mt-5 grid grid-cols-3 gap-3 border-y border-jade/8 py-4"><div><span className="block text-[9px] font-bold text-charcoal/42">max</span><strong className="font-display text-xl text-jade">{region.month.meanHigh}°</strong></div><div><span className="block text-[9px] font-bold text-charcoal/42">regen</span><strong className="font-display text-xl text-jade">{region.month.rainfall}</strong><span className="ml-0.5 text-[9px] text-charcoal/42">mm</span></div><div><span className="block text-[9px] font-bold text-charcoal/42">dagen</span><strong className="font-display text-xl text-jade">{region.month.rainDays}</strong></div></div><div className="mt-4 flex items-center justify-between gap-3"><span className={`rounded-full px-3 py-1 text-[9px] font-extrabold ${toneClasses(region.month.travelTone)}`}>{region.month.travelLabel}</span><Link href={region.href} className="text-[10px] font-extrabold text-jade">Lokale gids →</Link></div></article>; })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="kustwissel" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading eyebrow="De fout die de meeste simpele kalenders maken" title="Andaman en de Golf zijn geen tweeling." description="Een landelijk regenicoon kan je naar de verkeerde kust sturen. Windrichting, zeecondities en het latere regenpatroon aan de Golf veranderen de strandkeuze." />
            <div className="relative mt-10 min-h-[640px] overflow-hidden rounded-[30px] shadow-editorial-lift">
              <Image src="/images/redesign/thailand-weather-coast-switch.webp" alt="Andamankust met tropische regen naast een opklarende Golfkust" fill sizes="100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-jade via-jade/12 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 grid gap-3 md:inset-x-8 md:bottom-8 md:grid-cols-3">
                <article className="rounded-2xl border border-white/18 bg-jade/78 p-5 text-white backdrop-blur-md"><p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-light">Westkust</p><h2 className="mt-2 font-display text-2xl font-semibold">Andaman</h2><p className="mt-3 text-xs font-medium leading-5 text-white/64">Krabi en Phuket zijn gemiddeld sterker in de drogere maanden rond december–maart.</p></article>
                <article className="rounded-2xl border border-saffron/35 bg-canvas p-5 text-jade shadow-editorial-card"><p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">Beslis op activiteit</p><h2 className="mt-2 font-display text-2xl font-semibold">Bootdag ≠ stranddag</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/64">Voor boten zijn wind, golven, zicht en waarschuwingen belangrijker dan alleen neerslagkans.</p></article>
                <article className="rounded-2xl border border-white/18 bg-jade/78 p-5 text-white backdrop-blur-md"><p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-light">Oostkust</p><h2 className="mt-2 font-display text-2xl font-semibold">Golf</h2><p className="mt-3 text-xs font-medium leading-5 text-white/64">Koh Samui en omliggende eilanden hebben vaak later in het jaar hun nattere patroon.</p></article>
              </div>
            </div>
          </div>
        </section>

        <section id="seizoenen" className="section-divider-bottom scroll-mt-24 bg-mist py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading eyebrow="Drie woorden, veel lokale uitzonderingen" title="Gebruik seizoenen als startpunt, niet als eindantwoord." description="Koel, heet en groen helpen bij een eerste planning. De lokale stationdata en de kustkeuze bepalen daarna of de maand echt bij jouw route past." />
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                { icon: Wind, step: '01', months: 'nov – feb', title: 'Koeler seizoen', text: 'Sterk voor veel rondreizen en wandelen. In het noorden kunnen ochtenden fris zijn; populariteit en prijzen nemen toe.' },
                { icon: ThermometerSun, step: '02', months: 'mrt – mei', title: 'Heet seizoen', text: 'Vroege starttijden en een rustiger middagritme worden belangrijk. In het noorden hoort luchtkwaliteit bij de planning.' },
                { icon: CloudRain, step: '03', months: 'mei – okt', title: 'Groen seizoen', text: 'Meer buien en een groener landschap. De exacte timing en impact verschillen sterk per regio en kust.' },
              ].map((item) => { const Icon = item.icon; return <article key={item.title} className="rounded-[24px] border border-jade/10 bg-white p-7 shadow-editorial-card"><div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/28 bg-canvas text-jade"><Icon size={20} /></span><span className="font-display text-4xl font-semibold text-jade/10">{item.step}</span></div><p className="mt-6 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{item.months}</p><h2 className="mt-2 font-display text-3xl font-semibold text-jade">{item.title}</h2><p className="mt-4 text-xs font-medium leading-5 text-charcoal/60">{item.text}</p></article>; })}
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {representativeRegions[0].data.months.map((month, index) => <Link key={month.slug} href={`/thailand-in/${month.slug}/`} className="group rounded-2xl border border-jade/10 bg-white p-4 shadow-editorial-card transition hover:-translate-y-0.5 hover:border-saffron/35"><div className="flex items-center justify-between"><span className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-saffron-dark">{String(index + 1).padStart(2, '0')}</span><span className={`h-2.5 w-2.5 rounded-full ${month.travelTone === 'best' ? 'bg-jade' : month.travelTone === 'wet' ? 'bg-[#8ba8ad]' : 'bg-saffron'}`} /></div><strong className="mt-4 block font-display text-xl text-jade">{month.name}</strong><span className="mt-2 block text-[9px] font-bold text-charcoal/46">maandgids →</span></Link>)}
            </div>
          </div>
        </section>

        <section id="plan-b" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom overflow-hidden rounded-[30px] border border-jade/8 bg-white shadow-editorial-lift">
            <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
              <div className="relative min-h-[510px]"><Image src="/images/redesign/thailand-weather-day-kit.webp" alt="Lichte kleding, regenjas, drybag, zonnebrand en waterfles voor wisselend tropisch weer" fill sizes="(max-width: 1024px) 100vw, 54vw" className="object-cover" /></div>
              <div className="bg-jade p-7 text-white sm:p-10 lg:p-12">
                <p className="eyebrow !text-saffron-light">Een tropische dag is geen icoontje</p>
                <h2 className="font-display text-[3.5rem] font-semibold leading-[0.86] tracking-[-0.035em]">Plan op herstelvermogen, niet op perfect weer.</h2>
                <p className="mt-5 text-sm font-medium leading-6 text-white/64">Met een droge tas, lichte regenlaag en één flexibele dag blijft een bui klein. Het echte risico ontstaat wanneer iedere boot, transfer en excursie vast op elkaar staat.</p>
                <div className="mt-7 grid gap-3">
                  <a href="/go/hagon-rain-ponchos/" target="_blank" rel="noopener noreferrer nofollow sponsored" className="flex items-center justify-between rounded-xl border border-white/14 bg-white/[0.06] px-4 py-3 text-xs font-extrabold"><span className="flex items-center gap-3"><Umbrella size={16} className="text-saffron-light" />Lichte regenlaag</span><ExternalLink size={13} /></a>
                  <a href="/go/earth-pak-dry-bag/" target="_blank" rel="noopener noreferrer nofollow sponsored" className="flex items-center justify-between rounded-xl border border-white/14 bg-white/[0.06] px-4 py-3 text-xs font-extrabold"><span className="flex items-center gap-3"><ShieldCheck size={16} className="text-saffron-light" />Drybag voor bootdagen</span><ExternalLink size={13} /></a>
                  <a href="/go/hovsiyla-quick-dry-shirt/" target="_blank" rel="noopener noreferrer nofollow sponsored" className="flex items-center justify-between rounded-xl border border-white/14 bg-white/[0.06] px-4 py-3 text-xs font-extrabold"><span className="flex items-center gap-3"><Shirt size={16} className="text-saffron-light" />Sneldrogende laag</span><ExternalLink size={13} /></a>
                </div>
                <AffiliateDisclosure className="mt-4 !text-white/60">De drie productlinks zijn Amazon-affiliatelinks. We kunnen commissie ontvangen zonder dat jouw prijs stijgt. Controleer maat, materiaal, levering en lokale beschikbaarheid zelf.</AffiliateDisclosure>
              </div>
            </div>
          </div>
        </section>

        <section id="boeken" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[0.68fr_1.32fr] lg:items-end"><SectionHeading eyebrow="Klimaat kiezen, echte voorwaarden controleren" title="Boek met ruimte voor lokaal weer." description="De maandtabel geeft richting. Voor vertrek controleer je de lokale TMD-forecast, waarschuwingen, annuleringsvoorwaarden en de exacte ophaal- of vertreklocatie." /><div className="grid gap-3 sm:grid-cols-3"><div className="rounded-xl border border-jade/10 bg-white px-4 py-3 text-[10px] font-bold text-jade">1 · kies regio</div><div className="rounded-xl border border-jade/10 bg-white px-4 py-3 text-[10px] font-bold text-jade">2 · vergelijk data</div><div className="rounded-xl border border-jade/10 bg-white px-4 py-3 text-[10px] font-bold text-jade">3 · check lokaal weer</div></div></div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <a href="https://www.tmd.go.th/en" target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/28 bg-canvas text-jade"><CloudRain size={20} /></span><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">Officieel</p><h2 className="mt-2 font-display text-3xl font-semibold text-jade">TMD forecast</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/60">Controleer vlak voor een buiten- of bootdag de lokale verwachting en waarschuwingen.</p></a>
              <a href={tripHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/28 bg-canvas text-jade"><CalendarDays size={20} /></span><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">Verblijf</p><h2 className="mt-2 font-display text-3xl font-semibold text-jade">Trip.com</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/60">Vergelijk dezelfde data, buurt en annuleringsvoorwaarden voordat je een weerskeuze vastzet.</p></a>
              <a href={klookHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/28 bg-canvas text-jade"><Sparkles size={20} /></span><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">Ervaring</p><h2 className="mt-2 font-display text-3xl font-semibold text-jade">Klook</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/60">Lees inclusies, ophaalzone en wijzigingsvoorwaarden van het concrete product.</p></a>
            </div>
            <AffiliateDisclosure className="mt-3">Trip.com en Klook zijn affiliate-links. Go2Thailand kan commissie ontvangen zonder dat jouw prijs stijgt. Klimaatnormalen zijn nooit een garantie voor uitvoerbaarheid of beschikbaarheid.</AffiliateDisclosure>
          </div>
        </section>

        <FaqSplitSection id="vragen" eyebrow="Echte Nederlandse zoekvragen" title="Veelgestelde vragen over Thailand-weer" description="De vragen komen uit vier actuele DataForSEO-SERP’s. Antwoorden scheiden klimaat, regio en lokale verwachting zodat één landelijke vuistregel niet als garantie wordt gelezen." items={faqs} />

        <RelatedGuidesSection eyebrow="Zoom in op je route" title="Van landelijk patroon naar lokale keuze" guides={[
          { title: 'Weer in Bangkok', description: 'Stedelijke hitte, regen en een slim dagritme per maand.', href: '/city/bangkok/weather/', image: '/images/cities/bangkok/redesign/bangkok-weather-hero.webp', imageAlt: 'Bangkok in wisselend tropisch weer' },
          { title: 'Weer in Chiang Mai', description: 'Koele maanden, hitte, regen en actuele luchtkwaliteit.', href: '/city/chiang-mai/weather/', image: '/images/cities/chiang-mai/redesign/chiang-mai-weather-hero.webp', imageAlt: 'Chiang Mai en bergen in ochtendlicht' },
          { title: 'Weer in Krabi', description: 'Andamanseizoen, bootdagen en plan B per maand.', href: '/city/krabi/weather/', image: '/images/redesign/krabi-destination-hero.webp', imageAlt: 'Krabi-kust en kalksteenrotsen' },
        ]} />

        <SourceMethodSection eyebrow="Bronnen & methode" title="Klimaat is meetbaar. Jouw reisdag blijft lokaal." description="Zoektermen, concurrenten en echte PAA-vragen zijn op 24 juli 2026 via DataForSEO voor Nederland onderzocht; ranking- en backlinksignalen zijn op 26 juli 2026 opnieuw gecontroleerd. De maandvergelijker toont officiële TMD-klimaatnormalen 1991–2020 van vijf representatieve stations. Voor een concrete reisdag verwijzen we naar de actuele lokale TMD-dienst." sources={[
          { title: 'Climate normals 1991–2020', creator: 'Thai Meteorological Department', url: 'https://ubonmet.tmd.go.th/files/MetInfo/climate_normal.pdf', note: 'Primaire bron voor maandgemiddelden van temperatuur, neerslag en regendagen bij Chiang Mai, Bangkok, Krabi, Phuket en Koh Samui.' },
          { title: 'Actuele verwachting en waarschuwingen', creator: 'Thai Meteorological Department', url: 'https://www.tmd.go.th/en', note: 'Gebruik voor de concrete reisdag; klimaatnormalen zijn nadrukkelijk geen live forecast.' },
          { title: 'Beste reistijd Thailand', creator: 'ANWB', url: 'https://www.anwb.nl/vakantie/thailand/beste-reistijd', note: 'Nederlandse concurrentiebenchmark voor droge periode, regenseizoen en eilanden.' },
          { title: 'Wanneer is het regenseizoen in Thailand?', creator: 'AsiaDirect', url: 'https://www.asiadirect.nl/blog/wanneer-is-het-regenseizoen-in-thailand/', note: 'Nederlandse concurrentiebenchmark voor regionale verschillen en reizen in het groene seizoen.' },
        ]} />
      </div>
    </>
  );
}
