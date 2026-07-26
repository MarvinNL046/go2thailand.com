import { useMemo, useState } from 'react';
import Image from 'next/image';
import {
  Backpack,
  BadgeCheck,
  BatteryCharging,
  Check,
  CheckCircle2,
  CloudRain,
  ExternalLink,
  FileText,
  Footprints,
  HeartPulse,
  Layers3,
  Luggage,
  MapPin,
  PackageCheck,
  PlugZap,
  Printer,
  RotateCcw,
  Route,
  Shirt,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Sun,
  Waves,
  X,
} from 'lucide-react';
import SEOHead from '../SEOHead';
import FeedbackForm from '../FeedbackForm';
import type { PackingChecklistCategory, PackingGuideData, PackingProductPick } from '../../data/gear/types';
import { EditorialHero } from '../design/EditorialHero';
import { PageSectionNav, type PageSectionNavItem } from '../design/PageSectionNav';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SourceMethodSection } from '../design/SourceMethodSection';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';

interface PackingGuideTemplateProps {
  data: PackingGuideData;
}

const sectionNavItems: PageSectionNavItem[] = [
  { href: '#basis', label: 'Slim inpakken', icon: Sparkles },
  { href: '#checklist', label: 'Afvinklijst', icon: CheckCircle2 },
  { href: '#bagage', label: 'Handbagage', icon: Luggage },
  { href: '#route', label: 'Per reisstijl', icon: Route },
  { href: '#producten', label: 'Uitrusting', icon: Backpack },
  { href: '#vragen', label: 'Vragen', icon: FileText },
];

const checklistIcons = {
  documents: FileText,
  clothing: Shirt,
  health: HeartPulse,
  electronics: Smartphone,
  bags: Backpack,
  route: Route,
};

const productIcons = {
  adapter: PlugZap,
  battery: BatteryCharging,
  daypack: Backpack,
  drybag: Waves,
  towel: Layers3,
  sun: Sun,
  rain: CloudRain,
  shoes: Footprints,
};

const baggageTone = {
  carry: { icon: BadgeCheck, label: 'Altijd bij je', classes: 'border-jade/15 bg-white text-jade' },
  checked: { icon: Luggage, label: 'Controleer je airline', classes: 'border-saffron/20 bg-canvas text-jade' },
  leave: { icon: X, label: 'Thuislaten', classes: 'border-red-900/10 bg-[#f7eee9] text-[#713b2e]' },
};

function ChecklistCard({ category, checked, onToggle }: { category: PackingChecklistCategory; checked: Set<string>; onToggle: (id: string) => void }) {
  const Icon = checklistIcons[category.icon];

  return (
    <article className="break-inside-avoid overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-[0_16px_48px_rgba(18,63,54,0.06)]">
      <div className="flex items-start gap-4 border-b border-jade/10 bg-tonal/70 p-5">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-saffron/25 bg-canvas text-jade"><Icon size={20} strokeWidth={1.6} /></span>
        <div><h3 className="font-display text-[1.65rem] font-semibold leading-none text-jade">{category.title}</h3><p className="mt-2 text-xs leading-5 text-charcoal/58">{category.description}</p></div>
      </div>
      <div className="divide-y divide-jade/[0.07] p-2">
        {category.items.map((item) => {
          const isChecked = checked.has(item.id);
          return (
            <label key={item.id} className={`group flex cursor-pointer items-start gap-3 rounded-xl px-3 py-3.5 transition hover:bg-tonal/60 ${isChecked ? 'bg-mist/55' : ''}`}>
              <input type="checkbox" checked={isChecked} onChange={() => onToggle(item.id)} className="sr-only" />
              <span aria-hidden="true" className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition ${isChecked ? 'border-jade bg-jade text-white' : 'border-jade/20 bg-canvas text-transparent group-hover:border-saffron/55'}`}><Check size={13} strokeWidth={3} /></span>
              <span>
                <span className={`block text-xs font-bold leading-5 ${isChecked ? 'text-jade/50 line-through' : 'text-jade'}`}>{item.label}{item.essential ? <span className="ml-1.5 text-[8px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">basis</span> : null}</span>
                {item.note ? <span className="mt-0.5 block text-[10px] leading-4 text-charcoal/48">{item.note}</span> : null}
              </span>
            </label>
          );
        })}
      </div>
    </article>
  );
}

function ProductCard({ product, index }: { product: PackingProductPick; index: number }) {
  const Icon = productIcons[product.icon];
  return (
    <article className="group flex min-h-[390px] flex-col rounded-2xl border border-white/12 bg-white/[0.065] p-5 text-white backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/[0.09] sm:p-6">
      <div className="flex items-start justify-between gap-4"><span className="grid h-12 w-12 place-items-center rounded-xl border border-saffron/35 bg-white/8 text-saffron-light"><Icon size={21} strokeWidth={1.55} /></span><span className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-white/35">0{index + 1}</span></div>
      <p className="mt-6 text-[9px] font-extrabold uppercase tracking-[0.18em] text-saffron-light">{product.category}</p>
      <h3 className="mt-2 font-display text-[1.75rem] font-semibold leading-[0.95]">{product.name}</h3>
      <p className="mt-4 text-xs font-bold leading-5 text-white/80">{product.usefulFor}</p>
      <p className="mt-3 text-xs leading-5 text-white/62">{product.description}</p>
      <p className="mt-4 border-l-2 border-saffron/55 pl-3 text-[11px] leading-5 text-white/58"><strong className="text-white/85">Overslaan als:</strong> {product.skipWhen}</p>
      <a href={`/go/${product.amazonSlug}/`} target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-auto inline-flex items-center justify-between gap-3 border-t border-white/10 pt-5 text-xs font-extrabold text-white transition hover:text-saffron-light">Bekijk actueel aanbod <span className="grid h-9 w-9 place-items-center rounded-xl border border-saffron/45 text-saffron-light transition group-hover:bg-saffron group-hover:text-white"><ExternalLink size={14} /></span></a>
    </article>
  );
}

export default function PackingGuideTemplate({ data }: PackingGuideTemplateProps) {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const checked = useMemo(() => new Set(checkedIds), [checkedIds]);
  const totalItems = data.checklist.reduce((sum, category) => sum + category.items.length, 0);
  const progress = Math.round((checkedIds.length / totalItems) * 100);

  const toggleItem = (id: string) => setCheckedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const resetChecklist = () => setCheckedIds([]);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/nl/' },
      { '@type': 'ListItem', position: 2, name: 'Paklijst Thailand', item: data.pageUrl },
    ],
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
  };
  const checklistSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Complete paklijst voor Thailand',
    numberOfItems: totalItems,
    itemListElement: data.checklist.flatMap((category) => category.items).map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.label })),
  };
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: data.pageUrl,
    name: data.pageTitle,
    description: data.pageDescription,
    inLanguage: 'nl-NL',
    dateModified: data.dateModified,
  };

  return (
    <>
      <SEOHead title={data.pageTitle} description={data.pageDescription} ogImage={`https://go2-thailand.com${data.heroImage}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(checklistSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      </SEOHead>

      <div className="bg-canvas text-charcoal print:bg-white">
        <div className="print:hidden">
          <EditorialHero
            image={data.heroImage}
            imageAlt={data.heroAlt}
            breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Paklijst & reisuitrusting' }]}
            eyebrow={data.eyebrow}
            title={<>{data.heroTitle} <span className="block text-[2.9rem] text-saffron-dark sm:text-[3.8rem] lg:text-[4.35rem]">{data.heroAccent}</span></>}
            titleClassName="max-w-[670px] text-[4.1rem] leading-[0.85] sm:text-[5.2rem] lg:text-[5.8rem]"
            description={data.intro}
            actions={[
              { label: 'Open de afvinklijst', href: '#checklist', kind: 'primary' },
              { label: 'Bekijk slimme uitrusting', href: '#producten', kind: 'secondary' },
            ]}
            minHeightClassName="min-h-[735px] lg:min-h-[690px]"
            imageClassName="object-cover object-[63%_center] lg:object-center"
          />
          <PageSectionNav items={sectionNavItems} />
        </div>

        <section id="basis" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20 print:py-5">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <div>
              <p className="eyebrow">Het korte antwoord</p>
              <h2 className="heading-redesign">Pak voor je route, niet voor je reisduur</h2>
              <p className="mt-5 text-sm font-medium leading-7 text-charcoal/72">{data.quickAnswer}</p>
              <div className="mt-6 inline-flex items-center gap-3 rounded-xl border border-saffron/20 bg-tonal px-4 py-3 text-xs font-bold leading-5 text-jade"><PackageCheck size={18} className="shrink-0 text-saffron-dark" /> Was onderweg en houd ruimte over voor de terugreis.</div>
            </div>
            <div>
              <p className="mb-4 text-[9px] font-extrabold uppercase tracking-[0.18em] text-saffron-dark">Backpack of koffer?</p>
              <div className="grid gap-4 sm:grid-cols-3">
                {data.bagChoices.map((choice, index) => (
                  <article key={choice.title} className="relative overflow-hidden rounded-2xl border border-jade/10 bg-white p-5 shadow-[0_14px_42px_rgba(18,63,54,0.06)]">
                    <span className="text-[9px] font-extrabold tracking-[0.14em] text-saffron-dark">0{index + 1}</span>
                    <h3 className="mt-4 font-display text-[1.55rem] font-semibold leading-none text-jade">{choice.title}</h3>
                    <p className="mt-3 text-[11px] font-bold leading-5 text-jade/72">{choice.bestFor}</p>
                    <p className="mt-4 text-[11px] leading-5 text-charcoal/62"><Check size={12} className="mr-1 inline text-saffron-dark" /> {choice.advantage}</p>
                    <p className="mt-3 text-[11px] leading-5 text-charcoal/55"><Luggage size={12} className="mr-1 inline text-saffron-dark" /> {choice.tradeoff}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="checklist" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20 print:bg-white print:py-5">
          <div className="container-custom">
            <div className="grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div><p className="eyebrow">Interactieve checklist</p><h2 className="heading-redesign">Dit gaat er wél mee</h2></div>
              <div className="rounded-2xl border border-jade/10 bg-canvas p-5 lg:justify-self-end lg:min-w-[500px] print:hidden">
                <div className="flex items-end justify-between gap-4"><div><p className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-saffron-dark">Jouw voortgang</p><p aria-live="polite" className="mt-1 font-display text-2xl font-semibold text-jade">{checkedIds.length} van {totalItems} afgevinkt</p></div><strong className="font-display text-3xl font-semibold text-jade">{progress}%</strong></div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-jade/8"><div className="h-full rounded-full bg-saffron transition-[width] duration-300" style={{ width: `${progress}%` }} /></div>
                <div className="mt-4 flex flex-wrap gap-3"><button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 text-[10px] font-extrabold text-jade transition hover:text-saffron-dark"><Printer size={14} /> Print of bewaar als PDF</button><button type="button" onClick={resetChecklist} disabled={!checkedIds.length} className="inline-flex items-center gap-2 text-[10px] font-bold text-charcoal/45 transition hover:text-jade disabled:cursor-not-allowed disabled:opacity-35"><RotateCcw size={13} /> Wissen</button></div>
              </div>
            </div>
            <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3 print:grid-cols-2">{data.checklist.map((category) => <ChecklistCard key={category.id} category={category} checked={checked} onToggle={toggleItem} />)}</div>
            <p className="mt-5 text-[10px] leading-5 text-charcoal/50 print:hidden">De afvinkstatus blijft alleen tijdens dit bezoek bewaard. Gebruik de printknop om de lijst als PDF op je eigen apparaat te bewaren.</p>
          </div>
        </section>

        <section id="bagage" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20 print:hidden">
          <div className="container-custom">
            <div className="relative min-h-[390px] overflow-hidden rounded-2xl bg-jade">
              <Image src={data.cabinRulesImage} alt={data.cabinRulesImageAlt} fill sizes="100vw" className="object-cover object-[68%_center]" />
              <div className="absolute inset-0 bg-gradient-to-r from-jade via-jade/82 to-jade/5" />
              <div className="relative max-w-[520px] px-6 py-10 text-white sm:px-10 sm:py-14">
                <p className="eyebrow !text-saffron-light">Voor je naar security gaat</p>
                <h2 className="font-display text-[3.2rem] font-semibold leading-[0.88] tracking-[-0.04em]">Wat hoort in welke tas?</h2>
                <p className="mt-5 text-sm font-medium leading-7 text-white/72">Bagageregels veranderen per airport, airline en product. Gebruik deze verdeling als veilige basis en controleer kort voor vertrek de actuele regels van je eigen vlucht.</p>
              </div>
            </div>
            <div className="relative z-10 -mt-8 grid gap-4 px-3 md:grid-cols-3 lg:px-8">
              {data.cabinRules.map((rule) => {
                const tone = baggageTone[rule.tone];
                const Icon = tone.icon;
                return <article key={rule.title} className={`rounded-2xl border p-5 shadow-[0_18px_55px_rgba(18,63,54,0.1)] ${tone.classes}`}><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl border border-current/15 bg-white/65"><Icon size={18} /></span><div><p className="text-[8px] font-extrabold uppercase tracking-[0.16em] opacity-55">{tone.label}</p><h3 className="font-display text-[1.55rem] font-semibold leading-none">{rule.title}</h3></div></div><ul className="mt-5 space-y-3">{rule.items.map((item) => <li key={item} className="flex items-start gap-2 text-[11px] font-medium leading-5 opacity-75"><Check size={13} className="mt-0.5 shrink-0 text-saffron-dark" />{item}</li>)}</ul></article>;
              })}
            </div>
          </div>
        </section>

        <section id="route" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20 print:hidden">
          <div className="container-custom">
            <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end"><div><p className="eyebrow">Stem af op je route</p><h2 className="heading-redesign">Niet iedere Thailandreis pakt hetzelfde</h2></div><p className="max-w-2xl text-sm font-medium leading-7 text-charcoal/65 lg:justify-self-end">Begin met dezelfde lichte basis en voeg alleen toe wat je daadwerkelijk gaat doen. Zo blijven transfers eenvoudiger en heeft ieder extra item een duidelijke reden.</p></div>
            <div className="relative mt-9 h-[300px] overflow-hidden rounded-2xl sm:h-[390px]"><Image src={data.routeImage} alt={data.routeImageAlt} fill sizes="100vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-jade/40 via-transparent to-transparent" /></div>
            <div className="relative z-10 -mt-7 grid gap-4 px-3 md:grid-cols-3 lg:px-8">
              {data.routeCapsules.map((capsule, index) => <article key={capsule.title} className="rounded-2xl border border-jade/10 bg-white p-5 shadow-[0_16px_48px_rgba(18,63,54,0.08)]"><div className="flex items-center justify-between"><p className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-saffron-dark">{capsule.eyebrow}</p><span className="grid h-8 w-8 place-items-center rounded-full bg-saffron text-[10px] font-extrabold text-white">{index + 1}</span></div><h3 className="mt-4 font-display text-[1.65rem] font-semibold leading-none text-jade">{capsule.title}</h3><p className="mt-3 text-xs leading-5 text-charcoal/62">{capsule.description}</p><ul className="mt-4 space-y-2 border-t border-jade/10 pt-4">{capsule.additions.map((item) => <li key={item} className="flex items-center gap-2 text-[10px] font-bold text-jade/65"><Check size={12} className="text-saffron-dark" />{item}</li>)}</ul></article>)}
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-14 lg:py-20 print:hidden">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-center">
            <div><p className="eyebrow">Ruimte is ook uitrusting</p><h2 className="heading-redesign">Meenemen, lokaal kopen of thuislaten?</h2><p className="mt-5 text-sm font-medium leading-7 text-charcoal/68">De beste paklijst is geen inventaris van alles wat nuttig kan zijn. Het is een reeks bewuste keuzes over wat moeilijk vervangbaar is en wat je route werkelijk gebruikt.</p></div>
            <div className="relative py-3">
              <div aria-hidden="true" className="absolute left-5 right-5 top-1/2 hidden border-t-2 border-dashed border-saffron/55 sm:block" />
              <div aria-hidden="true" className="absolute bottom-10 left-[2.35rem] top-10 border-l-2 border-dashed border-saffron/55 sm:hidden" />
              <div className="relative grid gap-4 sm:grid-cols-3">
                {[
                  { label: 'Van thuis', title: 'Neem mee', icon: PackageCheck, items: data.homeVsLocal.bring },
                  { label: 'Onderweg', title: 'Koop lokaal', icon: ShoppingBag, items: data.homeVsLocal.buy },
                  { label: 'Meer vrijheid', title: 'Laat thuis', icon: Luggage, items: data.homeVsLocal.leave },
                ].map((column, index) => { const Icon = column.icon; return <article key={column.title} className="rounded-2xl border border-jade/10 bg-white p-5 shadow-[0_12px_38px_rgba(18,63,54,0.06)]"><span className="grid h-10 w-10 place-items-center rounded-full bg-saffron text-white"><Icon size={17} /></span><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-dark">0{index + 1} · {column.label}</p><h3 className="mt-2 font-display text-[1.6rem] font-semibold leading-none text-jade">{column.title}</h3><ul className="mt-4 space-y-3">{column.items.map((item) => <li key={item} className="flex items-start gap-2 text-[11px] leading-5 text-charcoal/62"><MapPin size={12} className="mt-1 shrink-0 text-saffron-dark" />{item}</li>)}</ul></article>; })}
              </div>
            </div>
          </div>
        </section>

        <section id="producten" className="section-divider-bottom scroll-mt-24 bg-jade py-14 text-white lg:py-20 print:hidden">
          <div className="container-custom">
            <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end"><div><p className="eyebrow !text-saffron-light">Alleen als het iets oplost</p><h2 className="font-display text-[3.2rem] font-semibold leading-[0.88] tracking-[-0.04em] sm:text-[4rem]">Slimme reisuitrusting</h2></div><div className="lg:justify-self-end"><p className="max-w-2xl text-sm font-medium leading-7 text-white/65">Geen ranglijst en geen “must-have”-claims. Dit zijn voorbeelden per gebruiksmoment. Vergelijk altijd de actuele uitvoering, verkoper, prijs en voorwaarden voordat je koopt.</p><AffiliateDisclosure className="mt-2 !text-white/48">Als Amazon-partner verdienen wij aan in aanmerking komende aankopen. Jij betaalt niets extra; aanbod en levering kunnen per land verschillen.</AffiliateDisclosure></div></div>
            <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{data.productPicks.map((product, index) => <ProductCard key={product.name} product={product} index={index} />)}</div>
            <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.055] px-5 py-5 text-[10px] leading-5 text-white/55 sm:px-7"><strong className="text-white/80">Selectiemethode:</strong> een product komt alleen in beeld wanneer het een herkenbare pakbeslissing oplost. We verkopen geen positie, tonen geen onbewezen reviewscore en verwijderen of vervangen een voorbeeld wanneer product, link of gebruiksdoel niet meer klopt.</div>
          </div>
        </section>

        <div className="print:hidden">
          <FaqSplitSection eyebrow="Echte vragen uit de zoekresultaten" title="Veelgestelde vragen over je Thailand-paklijst" description="Deze vragen zijn ontdubbeld uit Nederlandse People Also Ask-resultaten van DataForSEO. Voor regels die kunnen wijzigen verwijzen we naar de officiële bron." items={data.faqs} />
          <RelatedGuidesSection title="Bereid de rest van je reis voor" guides={data.relatedGuides} />
          <SourceMethodSection title="Waarop baseren we deze paklijst?" description="De checklist combineert Nederlandse zoekvragen met actuele informatie van immigratie, douane, luchthaven-, luchtvaart- en toerismeautoriteiten. Productvoorbeelden staan los van de redactionele basislijst." sources={data.sources} />
          <section className="py-10 lg:py-12"><div className="container-custom"><FeedbackForm pageTitle={data.pageTitle} pageUrl={data.pageUrl} /></div></section>
        </div>
      </div>
    </>
  );
}
