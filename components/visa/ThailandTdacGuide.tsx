import { useMemo, useState } from 'react';
import Image from 'next/image';
import {
  Baby,
  CalendarDays,
  Check,
  CircleAlert,
  Clock3,
  ExternalLink,
  FileCheck2,
  Hotel,
  MailCheck,
  Plane,
  RefreshCw,
  ScanLine,
  ShieldCheck,
  Ship,
  Smartphone,
  Users,
  WifiOff,
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

const OFFICIAL_TDAC = 'https://tdac.immigration.go.th/';

const sectionNav = [
  { href: '#kort' as const, label: 'Kort antwoord', icon: ShieldCheck },
  { href: '#wanneer' as const, label: 'Wanneer', icon: CalendarDays },
  { href: '#invullen' as const, label: 'Invullen', icon: Smartphone },
  { href: '#gegevens' as const, label: 'Gegevens', icon: FileCheck2 },
  { href: '#wijzigen' as const, label: 'Wijzigen', icon: RefreshCw },
  { href: '#vragen' as const, label: 'Vragen', icon: CircleAlert },
];

const quickFacts = [
  { icon: ShieldCheck, label: 'Kosten', value: 'Gratis', text: 'Alleen via de officiële Thaise immigratiewebsite.' },
  { icon: CalendarDays, label: 'Indienmoment', value: 'Binnen 3 dagen', text: 'De aankomstdag telt mee in het officiële venster.' },
  { icon: RefreshCw, label: 'Geldigheid', value: '1 binnenkomst', text: 'Voor elke nieuwe entry vul je een nieuwe TDAC in.' },
  { icon: Clock3, label: 'Invultijd', value: 'Circa 3–5 min', text: 'Wanneer paspoort, reis- en adresgegevens klaarstaan.' },
];

const formSteps = [
  { icon: ScanLine, label: '01 · Persoon', title: 'Paspoortgegevens', text: 'Vul alles in het Engels in en controleer een MRZ-scan altijd handmatig.' },
  { icon: Plane, label: '02 · Reis', title: 'Aankomstgegevens', text: 'Aankomstdatum, vervoerswijze en vlucht- of voertuignummer.' },
  { icon: Hotel, label: '03 · Verblijf', title: 'Eerste adres', text: 'Type accommodatie, provincie, district en het adres in Thailand.' },
  { icon: ShieldCheck, label: '04 · Gezondheid', title: 'Alleen indien gevraagd', text: 'De vragen hangen af van recente landen, route en actuele gezondheidsregels.' },
  { icon: MailCheck, label: '05 · Bevestiging', title: 'Controleren & downloaden', text: 'Gebruik je e-mailadres en bewaar het ontvangen document met QR-code offline.' },
];

const checklistItems = [
  'Paspoort en naam exact zoals daarin vermeld',
  'Aankomstdatum en vlucht- of voertuignummer',
  'Land waar je bent ingestapt',
  'Eerste accommodatieadres in Thailand',
  'Landen bezocht in de twee weken voor aankomst',
  'Werkend e-mailadres voor document en QR-code',
];

const situations = [
  { icon: Baby, label: 'Met kinderen', title: 'Iedereen heeft een eigen record', text: 'Ook baby’s en kinderen hebben een TDAC nodig. Een ouder mag het formulier namens hen indienen.' },
  { icon: Users, label: 'Gezin of groep', title: 'Maximaal 10 per indiening', text: 'De officiële groepsroute kan gedeelde reis- en verblijfsgegevens overnemen.' },
  { icon: Ship, label: 'Land, lucht of zee', title: 'De vervoerswijze maakt niet uit', text: 'Niet-Thaise reizigers die immigratie passeren dienen vóór binnenkomst een TDAC in.' },
  { icon: WifiOff, label: 'Transit', title: 'Geen immigratie, geen TDAC', text: 'Bij een technische landing of airside transit zonder immigratie is de kaart niet nodig.' },
];

const faqs = [
  { question: 'Heb ik een TDAC nodig voor Thailand?', answer: 'Ja, iedere niet-Thaise reiziger die Thailand via land, lucht of zee binnenkomt en immigratie passeert, moet vooraf een Thailand Digital Arrival Card indienen. Dat geldt ook voor kinderen en voor reizigers met een visum. Bij transit zonder immigratie is geen TDAC nodig.' },
  { question: 'Hoe kan ik een TDAC aanvragen?', answer: 'Gebruik uitsluitend tdac.immigration.go.th, kies Arrival Card, vul persoonlijke, reis-, verblijfs- en eventuele gezondheidsgegevens in, controleer de preview en download daarna het TDAC-document. De officiële aanvraag is gratis.' },
  { question: 'Hoe lang van tevoren moet je de TDAC aanvragen?', answer: 'De officiële Immigration Bureau-FAQ zegt: binnen drie dagen vóór aankomst, waarbij de aankomstdag meetelt. Bereid je gegevens eerder voor, maar dien het formulier pas in wanneer dit venster openstaat.' },
  { question: 'Is de TDAC voor Thailand gratis?', answer: 'Ja. De officiële TDAC kost niets. Betaalde websites zijn tussenpartijen en niet nodig om het formulier in te dienen. Controleer daarom het domein voordat je persoonlijke en paspoortgegevens invoert.' },
  { question: 'Kun je een fout in de TDAC herstellen?', answer: 'Gebruik eerst Update Arrival Card op de officiële website. Kun je het betreffende veld daar niet aanpassen, dien dan vóór binnenkomst een nieuwe correcte kaart in. Volgens de officiële FAQ geldt bij meerdere inzendingen de meest recente geldige inzending.' },
  { question: 'Moet je de TDAC printen?', answer: 'Printen is niet verplicht. Download het document met QR-code en bewaar het op je telefoon. Een papieren kopie kan als reserve handig zijn wanneer je apparaat leeg of onbereikbaar is.' },
];

function formatDutchDate(date: Date) {
  return new Intl.DateTimeFormat('nl-NL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date);
}

export default function ThailandTdacGuide() {
  const [arrivalDate, setArrivalDate] = useState('');
  const [checked, setChecked] = useState<number[]>([]);
  const firstSubmissionDate = useMemo(() => {
    if (!arrivalDate) return null;
    const arrival = new Date(`${arrivalDate}T12:00:00Z`);
    if (Number.isNaN(arrival.getTime())) return null;
    const first = new Date(arrival);
    first.setUTCDate(first.getUTCDate() - 2);
    return { arrival, first };
  }, [arrivalDate]);
  const hotelHref = withPlacementSubId(TRIP_GENERIC, 'nl-tdac', 'first-address');
  const transportHref = withPlacementSubId(TWELVEGO_GENERIC, 'nl-tdac', 'arrival-details');

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
  };
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'TDAC Thailand invullen: gratis officiële stappen',
    description: 'Nederlandse stap-voor-stapgids voor de Thailand Digital Arrival Card met indienmoment, benodigde gegevens, kinderen, groepen en fouten herstellen.',
    url: 'https://go2-thailand.com/nl/visa/digital-arrival-card/',
    inLanguage: 'nl-NL',
    dateModified: '2026-07-24',
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://go2-thailand.com/nl/' },
      { '@type': 'ListItem', position: 2, name: 'Visum Thailand', item: 'https://go2-thailand.com/nl/visa/' },
      { '@type': 'ListItem', position: 3, name: 'TDAC Thailand', item: 'https://go2-thailand.com/nl/visa/digital-arrival-card/' },
    ],
  };

  return (
    <>
      <SEOHead
        title="TDAC Thailand invullen: gratis stappenplan | Go2Thailand"
        description="TDAC Thailand invullen? Bekijk wanneer het kan, welke gegevens je nodig hebt, de gratis officiële website en hoe je fouten herstelt."
        ogImage="https://go2-thailand.com/images/redesign/thailand-tdac-hero.webp"
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </SEOHead>

      <main className="bg-canvas text-charcoal">
        <EditorialHero
          image="/images/redesign/thailand-tdac-hero.webp"
          imageAlt="Paspoort en telefoon met een digitale aankomstworkflow in een Thaise luchthavenlounge"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Visum', href: '/visa/' }, { label: 'TDAC' }]}
          eyebrow="Gratis aankomstkaart · geen visum"
          title={<>TDAC Thailand.<br /><span className="text-saffron">Goed ingevuld.</span></>}
          subtitle="Binnen drie dagen voor aankomst, via één officieel domein."
          description="Leg je paspoort, aankomstgegevens en eerste verblijfsadres klaar. Met deze gids vul je de kaart in één keer logisch in en herken je betaalde tussenpartijen."
          actions={[
            { label: 'Open officiële TDAC', href: OFFICIAL_TDAC, kind: 'primary', newTab: true },
            { label: 'Bereken jouw moment', href: '#wanneer', kind: 'secondary' },
          ]}
          minHeightClassName="min-h-[730px] lg:min-h-[710px]"
          titleClassName="max-w-[700px] text-[3.9rem] leading-[0.88] !text-white sm:text-[5.2rem] lg:text-[5.9rem]"
          subtitleClassName="max-w-[630px] !text-white"
          descriptionClassName="mt-4 max-w-[580px] text-sm leading-7 !text-white/80"
          imageClassName="object-cover object-[67%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(4,42,34,0.18)_0%,rgba(4,42,34,0.5)_45%,rgba(4,42,34,0.98)_100%)] lg:bg-[linear-gradient(90deg,rgba(4,42,34,0.99)_0%,rgba(4,42,34,0.96)_43%,rgba(4,42,34,0.16)_68%,rgba(4,42,34,0.02)_100%)]"
          contentClassName="max-w-[720px] [&_nav]:!text-white/60 [&_nav_span]:!text-white/75"
          sideCard={
            <div className="absolute bottom-8 right-[max(2rem,calc((100vw-1280px)/2))] z-10 hidden w-[310px] rounded-2xl border border-white/25 bg-jade/82 p-5 text-white shadow-editorial-card backdrop-blur-lg xl:block">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">Controleer vóór je invult</p>
              <p className="mt-3 font-display text-2xl font-semibold leading-tight">Het adres moet eindigen op immigration.go.th</p>
              <p className="mt-4 flex items-start gap-3 border-t border-white/12 pt-4 text-[10px] font-semibold leading-5 text-white/58"><ShieldCheck size={17} className="mt-0.5 shrink-0 text-saffron-light" />De officiële aanvraag rekent geen aanvraagkosten.</p>
            </div>
          }
        />

        <PageSectionNav items={sectionNav} />

        <section id="kort" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom">
            <SectionHeading
              eyebrow="Het korte antwoord"
              title="Geen visum. Wel verplicht vóór immigratie."
              description="De Thailand Digital Arrival Card vervangt de papieren aankomstkaart voor niet-Thaise reizigers. De kaart geeft geen verblijfsrecht en verandert je visumstatus niet."
            />
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {quickFacts.map((fact) => {
                const Icon = fact.icon;
                return (
                  <article key={fact.label} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                    <div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/30 bg-canvas text-jade"><Icon size={20} /></span><span className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{fact.label}</span></div>
                    <h2 className="mt-5 font-display text-[1.85rem] font-semibold leading-tight text-jade">{fact.value}</h2>
                    <p className="mt-3 text-xs font-medium leading-5 text-charcoal/60">{fact.text}</p>
                  </article>
                );
              })}
            </div>
            <a href={OFFICIAL_TDAC} target="_blank" rel="noopener noreferrer" className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-jade/10 bg-jade px-5 py-4 text-white shadow-editorial-card">
              <span><strong className="block text-sm">Officiële website: tdac.immigration.go.th</strong><span className="mt-1 block text-[10px] font-medium text-white/55">Gratis · Thailand Immigration Bureau · controleer het domein letter voor letter.</span></span>
              <ExternalLink size={18} className="shrink-0 text-saffron-light" />
            </a>
          </div>
        </section>

        <section id="wanneer" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom grid gap-9 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <SectionHeading
              eyebrow="De 3-dagenregel visueel"
              title="Wanneer gaat jouw TDAC-venster open?"
              description="Kies je aankomstdatum. De rekentool toont de eerste kalenderdag van het officiële driedagenvenster, inclusief de aankomstdag."
            />
            <div className="overflow-hidden rounded-[28px] border border-jade/10 bg-white shadow-editorial-lift">
              <div className="grid md:grid-cols-[0.72fr_1.28fr]">
                <div className="bg-jade p-7 text-white sm:p-9">
                  <label htmlFor="tdac-arrival" className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-light">Aankomstdatum Thailand</label>
                  <input id="tdac-arrival" type="date" value={arrivalDate} onChange={(event) => setArrivalDate(event.target.value)} className="mt-4 min-h-14 w-full rounded-xl border border-white/18 bg-white px-4 text-sm font-extrabold text-jade outline-none ring-saffron focus:ring-2" />
                  <p className="mt-4 text-[10px] font-medium leading-5 text-white/55">Gebruik de lokale aankomstdatum op je ticket, niet je vertrekdatum uit Nederland.</p>
                </div>
                <div className="p-7 sm:p-9" aria-live="polite">
                  {firstSubmissionDate ? (
                    <>
                      <p className="eyebrow">Jouw praktische venster</p>
                      <h2 className="font-display text-[2.65rem] font-semibold leading-[0.94] text-jade">Vanaf {formatDutchDate(firstSubmissionDate.first)}</h2>
                      <div className="mt-6 grid grid-cols-3 gap-2">
                        {[firstSubmissionDate.first, new Date(firstSubmissionDate.first.getTime() + 86400000), firstSubmissionDate.arrival].map((date, index) => (
                          <div key={date.toISOString()} className={`rounded-xl border p-3 text-center ${index === 2 ? 'border-saffron/40 bg-saffron/10' : 'border-jade/10 bg-mist/45'}`}><span className="block text-[9px] font-extrabold uppercase tracking-[0.1em] text-charcoal/45">{index === 2 ? 'Aankomst' : `Dag ${index + 1}`}</span><strong className="mt-2 block font-display text-xl text-jade">{new Intl.DateTimeFormat('nl-NL', { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(date)}</strong></div>
                        ))}
                      </div>
                      <p className="mt-5 text-xs font-medium leading-6 text-charcoal/60">Dien uiterlijk vóór immigratie in. Een vertraagde vlucht verandert je geplande aankomstdatum niet automatisch; pas je kaart aan als de datum werkelijk wijzigt.</p>
                    </>
                  ) : (
                    <div className="flex min-h-[220px] flex-col justify-center"><CalendarDays size={34} className="text-saffron" /><h2 className="mt-4 font-display text-[2.4rem] font-semibold leading-tight text-jade">Kies links je aankomstdatum.</h2><p className="mt-3 text-xs font-medium leading-6 text-charcoal/60">Je krijgt direct drie duidelijke kalenderdagen te zien.</p></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="invullen" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading
              eyebrow="In één logische flow"
              title="Van paspoort naar download in vijf stappen."
              description="De officiële site laat je eerst persoonsgegevens, daarna reis en verblijf en ten slotte eventuele gezondheidsinformatie controleren."
            />
            <div className="mt-10 overflow-hidden rounded-[30px] border border-jade/10 bg-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
                <div className="relative min-h-[440px] lg:min-h-[650px]"><Image src="/images/redesign/thailand-tdac-form-flow.webp" alt="Visuele TDAC-invulroute van paspoort via reis en verblijf naar bevestiging" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" /></div>
                <div className="bg-jade p-7 text-white sm:p-10 lg:p-11">
                  <p className="eyebrow !text-saffron-light">Niet gokken, eerst klaarleggen</p>
                  <div className="mt-6 grid gap-3">
                    {formSteps.map((step) => {
                      const Icon = step.icon;
                      return (
                        <article key={step.title} className="grid grid-cols-[42px_1fr] gap-4 rounded-2xl border border-white/13 bg-white/[0.06] p-4">
                          <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-saffron-light"><Icon size={18} /></span>
                          <div><p className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-saffron-light">{step.label}</p><h2 className="mt-1 font-display text-xl font-semibold">{step.title}</h2><p className="mt-1 text-[10px] font-medium leading-5 text-white/55">{step.text}</p></div>
                        </article>
                      );
                    })}
                  </div>
                  <a href={OFFICIAL_TDAC} target="_blank" rel="noopener noreferrer" className="btn-cream mt-6">Start op de officiële website <ExternalLink size={15} /></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="gegevens" className="section-divider-bottom scroll-mt-24 bg-mist py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="Jouw aankomstmap"
                title="Heb je alles bij de hand?"
                description="Vink de set af vóór je begint. De officiële site kan je voortgang niet als concept bewaren."
              />
              <div className="mt-7 rounded-2xl border border-jade/10 bg-white p-5 shadow-editorial-card"><div className="flex items-center justify-between"><span className="text-xs font-extrabold text-jade">{checked.length} van {checklistItems.length} klaar</span><span className="font-display text-2xl font-semibold text-saffron">{Math.round((checked.length / checklistItems.length) * 100)}%</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-mist"><div className="h-full rounded-full bg-saffron transition-all" style={{ width: `${(checked.length / checklistItems.length) * 100}%` }} /></div></div>
            </div>
            <div className="grid gap-3">
              {checklistItems.map((item, index) => {
                const active = checked.includes(index);
                return (
                  <button key={item} type="button" aria-pressed={active} onClick={() => setChecked((items) => active ? items.filter((value) => value !== index) : [...items, index])} className={`flex min-h-16 items-center gap-4 rounded-2xl border px-5 py-4 text-left text-xs font-extrabold transition ${active ? 'border-saffron/35 bg-saffron/10 text-jade' : 'border-jade/10 bg-white text-charcoal/68 hover:border-jade/25'}`}>
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border ${active ? 'border-saffron bg-saffron text-jade' : 'border-jade/15 bg-mist text-jade/30'}`}><Check size={15} /></span>{item}
                  </button>
                );
              })}
              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                <a href={hotelHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-2xl border border-jade/10 bg-jade p-5 text-white shadow-editorial-card"><Hotel size={20} className="text-saffron-light" /><strong className="mt-4 block text-sm">Eerste hoteladres vastleggen</strong><span className="mt-1 block text-[10px] text-white/55">Hotels via Trip.com</span></a>
                <a href={transportHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-2xl border border-jade/10 bg-white p-5 text-jade shadow-editorial-card"><Plane size={20} className="text-saffron" /><strong className="mt-4 block text-sm">Aankomstroute controleren</strong><span className="mt-1 block text-[10px] text-charcoal/45">Transport via 12Go</span></a>
              </div>
              <AffiliateDisclosure className="mt-1">Trip.com en 12Go zijn affiliate-links. Je TDAC zelf is altijd gratis; boek alleen een verblijf of rit die werkelijk bij je route hoort.</AffiliateDisclosure>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading eyebrow="Ook bij een afwijkende reis" title="Vier situaties die vaak twijfel geven." description="De kernvraag is steeds dezelfde: ben je niet-Thai en passeer je de Thaise immigratiecontrole?" />
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {situations.map((item) => {
                const Icon = item.icon;
                return <article key={item.title} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/30 bg-canvas text-jade"><Icon size={20} /></span><span className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-saffron-dark">{item.label}</span></div><h2 className="mt-5 font-display text-[1.7rem] font-semibold leading-tight text-jade">{item.title}</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/60">{item.text}</p></article>;
              })}
            </div>
          </div>
        </section>

        <section id="wijzigen" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="overflow-hidden rounded-[30px] border border-jade/10 bg-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
                <div className="bg-jade p-8 text-white sm:p-11">
                  <p className="eyebrow !text-saffron-light">Fout of wijziging?</p>
                  <h2 className="font-display text-[3.35rem] font-semibold leading-[0.9] tracking-[-0.035em]">Herstellen vóór je Thailand binnenkomt.</h2>
                  <p className="mt-5 text-sm font-medium leading-7 text-white/62">Een nieuw hotel, vluchtwijziging of typefout hoeft niet tot paniek te leiden. De officiële site heeft een updatefunctie.</p>
                </div>
                <div className="grid gap-4 p-7 sm:p-10 md:grid-cols-3">
                  {[
                    { icon: RefreshCw, number: '01', title: 'Open Update Arrival Card', text: 'Zoek je kaart op met de gevraagde identificatiegegevens.' },
                    { icon: FileCheck2, number: '02', title: 'Wijzig wat beschikbaar is', text: 'Controleer daarna opnieuw alle reis- en verblijfsgegevens.' },
                    { icon: MailCheck, number: '03', title: 'Anders: dien opnieuw in', text: 'Kan het veld niet gewijzigd worden, dan geldt de meest recente geldige inzending.' },
                  ].map((step) => {
                    const Icon = step.icon;
                    return <article key={step.title} className="rounded-2xl border border-jade/10 bg-mist/45 p-5"><div className="flex items-center justify-between"><Icon size={19} className="text-jade" /><span className="font-display text-3xl font-semibold text-saffron">{step.number}</span></div><h3 className="mt-5 font-display text-xl font-semibold leading-tight text-jade">{step.title}</h3><p className="mt-3 text-[10px] font-medium leading-5 text-charcoal/58">{step.text}</p></article>;
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-14 lg:py-20">
          <div className="container-custom grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div><p className="eyebrow">Nog één laatste controle</p><h2 className="font-display text-[3.1rem] font-semibold leading-[0.92] text-jade">Engels ingevuld. Domein klopt. QR-code offline.</h2><p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-charcoal/60">De officiële handleiding vraagt om Engelse invoer. Controleer na een paspoortscan de uitgelezen gegevens en bewaar de download of e-mail gedurende je verblijf.</p></div>
            <a href={OFFICIAL_TDAC} target="_blank" rel="noopener noreferrer" className="btn-jade">Naar officiële TDAC <ExternalLink size={15} className="text-saffron-light" /></a>
          </div>
        </section>

        <FaqSplitSection id="vragen" eyebrow="Echte Nederlandse zoekvragen" title="Veelgestelde vragen over de TDAC" description="Deze vragen komen uit de actuele Nederlandse TDAC-SERP en PAA-resultaten. De antwoorden volgen de officiële Immigration Bureau-handleiding en FAQ." items={faqs} />

        <RelatedGuidesSection
          eyebrow="Verder voorbereiden"
          title="Maak je aankomst compleet"
          guides={[
            { title: 'Visum & inreisregels', description: 'Controleer verblijfsduur, paspoort en bewijs van vertrek.', href: '/visa/', image: '/images/redesign/thailand-visa-hero.webp', imageAlt: 'Reisdocumenten voor Thailand' },
            { title: 'Paklijst Thailand', description: 'Van handbagage en tempelkleding tot documenten en elektronica.', href: '/packing-list-thailand/', image: '/images/redesign/thailand-packing-hero.webp', imageAlt: 'Bagage en reisbenodigdheden voor Thailand' },
            { title: 'Eerste keer Thailand', description: 'Een rustige beslisvolgorde van route tot aankomst.', href: '/thailand-for-first-timers/', image: '/images/redesign/thailand-first-time-hero.webp', imageAlt: 'Eerste reis naar Thailand' },
          ]}
        />

        <SourceMethodSection
          eyebrow="Bron & onderzoek"
          title="De officiële handleiding bepaalt de stappen."
          description="Nederlandse zoektermen, concurrenten en echte PAA-vragen zijn op 24 juli 2026 met DataForSEO onderzocht. Vereisten, uitzonderingen, groepslimiet, correcties en invultijd komen rechtstreeks uit de actuele TDAC-handleiding en FAQ van Thailand Immigration Bureau."
          sources={[
            { title: 'TDAC User Guide', creator: 'Thailand Immigration Bureau', url: 'https://tdac.immigration.go.th/manual/en/', note: 'Primaire stap-voor-stapbron voor individuele en groepsindiening, gegevensvelden, preview, download en wijzigingen.' },
            { title: 'TDAC FAQ & Updates', creator: 'Thailand Immigration Bureau', url: 'https://tdac.immigration.go.th/manual/en/faq.html', note: 'Primaire bron voor termijn, kosten, kinderen, transit, vervoer, geldigheid, groepen, invultijd en herstel van fouten.' },
            { title: 'Reisadvies Thailand', creator: 'NederlandWereldwijd', url: 'https://www.nederlandwereldwijd.nl/reisadvies/thailand', note: 'Nederlandse overheidscontext voor paspoort, aankomstvoorwaarden en controle vlak voor vertrek.' },
          ]}
        />
      </main>
    </>
  );
}
