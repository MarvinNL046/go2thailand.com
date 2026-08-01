import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarDays, Compass, ExternalLink, Map, Ship, Sparkles, Waves } from 'lucide-react';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';
import { ThailandMapGraphic } from '../visuals/ThailandMapGraphic';
import { TWELVEGO_GENERIC, withPlacementSubId } from '../../lib/affiliates';
import { normalizeNlInternalHref } from '../../lib/nl-route-owners';
import { useSubId } from '../../lib/useSubId';

interface IslandSummary {
  id: number;
  slug: string;
  name: { en: string; nl: string };
  region: string;
  province: string;
  image: string;
  highlights: string[];
}

const profiles = [
  { title: 'Veel gemak', islands: 'Koh Samui · Phuket', text: 'Luchthaven, ruime hotelkeuze en veel voorzieningen. Daar staat meer verkeer en ontwikkeling tegenover.', icon: Sparkles },
  { title: 'Langzaam strandritme', islands: 'Koh Lanta · Koh Yao Noi', text: 'Meer ruimte voor één basis, stranddagen en korte lokale verplaatsingen dan voor een volle afvinklijst.', icon: Waves },
  { title: 'Duiken & snorkelen', islands: 'Koh Tao · Koh Lipe', text: 'Kies op zeeconditie, opleidingsdoel en transferlogica; helder water is geen dagelijkse garantie.', icon: Compass },
  { title: 'Dicht bij Bangkok', islands: 'Koh Samet · Koh Chang · Koh Mak', text: 'Logisch aan het begin of einde rond Bangkok, maar de oostelijke Golf is geen snelle zijstap vanaf Samui.', icon: Map },
];

const islandMeta: Record<string, { coast: 'gulf' | 'andaman'; region: string; highlights: string[] }> = {
  'koh-samui': { coast: 'gulf', region: 'Zuidelijke Golf', highlights: ['Strandgebieden', 'Fisherman’s Village', 'Ang Thong'] },
  'koh-phangan': { coast: 'gulf', region: 'Zuidelijke Golf', highlights: ['Haad Rin', 'Rustiger noorden', 'Baaihoppen'] },
  'koh-tao': { coast: 'gulf', region: 'Zuidelijke Golf', highlights: ['Duiken', 'Snorkelen', 'Sairee'] },
  'koh-phi-phi': { coast: 'andaman', region: 'Krabi & Andaman', highlights: ['Maya Bay-context', 'Uitzichtpunt', 'Bootdagen'] },
  'koh-lanta': { coast: 'andaman', region: 'Krabi & Andaman', highlights: ['Lange stranden', 'Old Town', 'Langzaam ritme'] },
  'koh-chang': { coast: 'gulf', region: 'Oostelijke Golf', highlights: ['Groen binnenland', 'Westkuststranden', 'Trat-route'] },
  'koh-lipe': { coast: 'andaman', region: 'Zuidelijke Andaman', highlights: ['Compact eiland', 'Snorkelen', 'Satun-route'] },
  'koh-yao-noi': { coast: 'andaman', region: 'Phang Nga Bay', highlights: ['Baai-uitzicht', 'Rustig ritme', 'Lokale dorpen'] },
  'koh-mak': { coast: 'gulf', region: 'Oostelijke Golf', highlights: ['Fietsen', 'Kleine schaal', 'Koh Kood-netwerk'] },
  'koh-samet': { coast: 'gulf', region: 'Rayong & Bangkok', highlights: ['Korte eilandbreak', 'Strandkeuze', 'Ban Phe-route'] },
  phuket: { coast: 'andaman', region: 'Andamanzee', highlights: ['Veel gebieden', 'Eigen luchthaven', 'Oude stad'] },
};

const faqs = [
  { question: 'Welk eiland van Thailand is het mooist?', answer: 'Er is geen objectieve winnaar. Voor kalksteenlandschap kijk je eerder naar Phi Phi en de Andaman-kust; voor een compact duikritme naar Koh Tao; voor een langzamer verblijf naar Koh Lanta of Koh Yao Noi. Kies eerst je reisperiode, gewenste drukte en maximaal aantal transfers.' },
  { question: 'Wat zijn de mooiste vakantie-eilanden in Thailand?', answer: 'Koh Samui, Koh Phangan, Koh Tao, Koh Phi Phi, Koh Lanta, Koh Chang, Koh Lipe, Koh Yao Noi, Koh Mak en Koh Samet zijn allemaal realistische vakantie-eilanden, maar voor verschillende reizen. De beste shortlist combineert kust, bereikbaarheid, strandtype en reisstijl.' },
  { question: 'Wat zijn de mooiste eilanden rond Thailand?', answer: '“Rond Thailand” omvat verschillende zeegebieden. Bouw geen landelijke ranglijst, maar vergelijk de Samui–Phangan–Tao-keten, de Krabi–Phi Phi–Lanta-zone en de Trat-eilanden afzonderlijk. Binnen zo’n netwerk blijven transfers meestal logischer.' },
  { question: 'Welk gedeelte van Thailand is het mooist?', answer: 'Dat is een smaakvraag. De Andamanzee staat bekend om uitgesproken kalksteenlandschap; de Golf heeft meerdere afzonderlijke eilandnetwerken en kan in een andere periode passend zijn. Actueel weer, vaarcondities en jouw route bepalen welke kant werkelijk werkt.' },
];

export default function ThailandIslandsDirectoryNl({ islands }: { islands: IslandSummary[] }) {
  const [coast, setCoast] = useState<'all' | 'gulf' | 'andaman'>('all');
  const subId = useSubId();
  const visible = islands.filter((island) => coast === 'all' || islandMeta[island.slug]?.coast === coast);
  const pageUrl = 'https://go2-thailand.com/nl/islands/';
  const schemas = [
    { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Eilanden Thailand: welk eiland past bij jouw reis?', description: 'Vergelijk de eilanden van Thailand per kust, reisstijl en bereikbaarheid.', url: pageUrl, inLanguage: 'nl-NL', mainEntity: { '@type': 'ItemList', numberOfItems: islands.length, itemListElement: islands.map((island, index) => ({ '@type': 'ListItem', position: index + 1, name: island.name.nl, url: `https://go2-thailand.com/nl${normalizeNlInternalHref(`/islands/${island.slug}/`)}` })) } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(({ question, answer }) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/nl/' }, { '@type': 'ListItem', position: 2, name: 'Eilanden', item: pageUrl }] },
  ];

  return <>
    <SEOHead title="Eilanden Thailand: welk eiland past bij jouw reis?" description="Vergelijk de eilanden van Thailand per kust, reisstijl en bereikbaarheid. Kies tussen de Golf van Thailand, Andamanzee en tien eilandgidsen." ogImage="https://go2-thailand.com/images/redesign/thailand-island-hopping-hero-v2.webp">
      {schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
    </SEOHead>
    <div data-premium-template="thailand-islands-directory-nl" className="overflow-hidden bg-canvas text-charcoal">
      <EditorialHero image="/images/redesign/thailand-island-hopping-hero-v2.webp" imageAlt="Reizigers stappen bij een groene Thaise eilandkust van een ferry" breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Eilanden' }]} eyebrow="Eerst de kust, daarna het eiland" title={<>Eilanden van<br /><span className="text-saffron-dark">Thailand.</span></>} subtitle="Niet het mooiste eiland. Wel het eiland dat bij jouw reis past." description="Vergelijk tien eilandgidsen en Phuket op kust, reisritme en bereikbaarheid. Kies één logisch netwerk en houd ruimte voor een tegenvallende vaardag." actions={[{ label: 'Vergelijk de eilanden', href: '#eilanden', kind: 'primary' }, { label: 'Bekijk de kustkeuze', href: '#kusten', kind: 'secondary' }]} imageClassName="object-cover object-[66%_center] lg:object-center" />
      <PageSectionNav items={[{ href: '#kiezen', label: 'Reisstijl', icon: Sparkles }, { href: '#kusten', label: 'Kusten', icon: Map }, { href: '#eilanden', label: 'Eilanden', icon: Waves }, { href: '#vragen', label: 'Vragen', icon: CalendarDays }]} />

      <section id="kiezen" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"><div className="container-custom grid gap-10 lg:grid-cols-[.72fr_1.28fr]"><div><SectionHeading eyebrow="Begin bij de consequentie" title="Wat wil je iedere dag voelen?" description="Een eilandnaam zegt weinig zonder de dagelijkse consequentie: hoeveel vervoer, hoeveel keuze, welk avondritme en hoeveel afhankelijkheid van bootweer." /><svg aria-hidden="true" viewBox="0 0 360 120" className="mt-8 hidden h-28 w-full max-w-sm text-saffron lg:block"><path d="M10 78 C62 26 104 112 161 61 S260 26 347 78" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 8" strokeLinecap="round" /><circle cx="10" cy="78" r="5" fill="currentColor" /><circle cx="161" cy="61" r="4" fill="currentColor" /><path d="M347 63c-8 0-14 6-14 14 0 11 14 25 14 25s14-14 14-25c0-8-6-14-14-14Z" fill="currentColor" /></svg></div><div className="grid gap-4 sm:grid-cols-2">{profiles.map(({ title, islands: names, text, icon: Icon }) => <article key={title} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><Icon size={22} className="text-saffron-dark" /><h2 className="mt-5 font-display text-[1.8rem] font-semibold leading-none text-jade">{title}</h2><p className="mt-3 text-[9px] font-extrabold uppercase tracking-[.11em] text-jade/50">{names}</p><p className="mt-4 text-xs font-medium leading-6 text-charcoal/62">{text}</p></article>)}</div></div></section>

      <section id="kusten" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"><div className="container-custom grid gap-10 lg:grid-cols-[.52fr_1.48fr] lg:items-center"><div className="relative mx-auto w-full max-w-[310px]"><ThailandMapGraphic className="w-full drop-shadow-[0_24px_35px_rgba(13,65,55,.12)]" label="Correcte geografische contour van Thailand met gestileerde reisroute" /><span className="absolute left-0 top-[62%] rounded-full border border-jade/10 bg-white px-3 py-2 text-[9px] font-extrabold text-jade shadow-sm">Andamanzee</span><span className="absolute right-0 top-[66%] rounded-full border border-jade/10 bg-white px-3 py-2 text-[9px] font-extrabold text-jade shadow-sm">Golf</span></div><div><SectionHeading eyebrow="Twee zeeën, drie netwerken" title="Kies een kust die logistiek klopt." description="De Golf is geen enkel eilandgebied: Trat in het oosten en Samui in het zuiden liggen ver uit elkaar. De Andaman-eilanden vormen evenmin één probleemloze keten. Kijk naar gateway en verbinding, niet alleen naar hemelsbrede afstand." /><div className="mt-8 grid gap-4 md:grid-cols-2"><article className="rounded-2xl bg-jade p-7 text-white"><p className="eyebrow !text-saffron-light">Golf van Thailand</p><h2 className="font-display text-[2.5rem] font-semibold leading-none">Twee aparte keuzes.</h2><p className="mt-5 text-xs font-medium leading-6 text-white/64">Samui, Phangan en Tao vormen een zuidelijke keten. Chang, Mak en omliggende Trat-eilanden vormen een oostelijk netwerk. Samet ligt praktisch dichter bij Bangkok en Rayong.</p></article><article className="rounded-2xl border border-jade/10 bg-white p-7"><p className="eyebrow">Andamanzee</p><h2 className="font-display text-[2.5rem] font-semibold leading-none text-jade">Kalksteen & lange kust.</h2><p className="mt-5 text-xs font-medium leading-6 text-charcoal/62">Phuket, Phi Phi en Lanta zijn bekende schakels; Koh Yao Noi vraagt een ander rustig ritme en Koh Lipe ligt veel verder zuidelijk. Forceer ze niet allemaal in één korte route.</p></article></div></div></div></section>

      <section id="eilanden" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"><div className="container-custom"><div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><SectionHeading eyebrow="Tien eilandgidsen + Phuket" title="Maak je shortlist." description="De kaartjes zijn startpunten. Open daarna de volledige owner voor stranden, gebieden, bereikbaarheid, seizoensafweging en verblijf." /><div role="group" aria-label="Filter eilanden op kust" className="flex w-fit rounded-xl border border-jade/10 bg-white p-1">{([['all','Alle'],['gulf','Golf'],['andaman','Andaman']] as const).map(([value,label]) => <button key={value} type="button" aria-pressed={coast === value} onClick={() => setCoast(value)} className={`rounded-lg px-4 py-2 text-[10px] font-extrabold transition ${coast === value ? 'bg-jade text-white' : 'text-jade hover:bg-tonal'}`}>{label}</button>)}</div></div><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{visible.map((island) => { const meta = islandMeta[island.slug]; return <Link key={island.slug} href={normalizeNlInternalHref(`/islands/${island.slug}/`)} className="group overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card"><div className="relative h-52 overflow-hidden"><Image src={island.image} alt={`${island.name.nl}, eiland in Thailand`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.035]" /><div className="absolute inset-0 bg-gradient-to-t from-jade/82 via-transparent to-transparent" /><span className="absolute left-4 top-4 rounded-full bg-ivory/90 px-3 py-1.5 text-[9px] font-extrabold text-jade">{meta?.region || 'Thailand'}</span><h2 className="absolute bottom-5 left-5 font-display text-[2.2rem] font-semibold text-white">{island.name.nl}</h2></div><div className="p-5"><p className="text-[9px] font-extrabold uppercase tracking-[.1em] text-saffron-dark">{(meta?.highlights || island.highlights.slice(0, 3)).join(' · ')}</p><span className="mt-4 inline-flex items-center gap-2 text-xs font-extrabold text-jade">Open eilandgids <ArrowRight size={14} className="text-saffron-dark transition group-hover:translate-x-1" /></span></div></Link>; })}</div></div></section>

      <section className="section-divider-bottom bg-jade py-14 text-white lg:py-18"><div className="container-custom grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-center"><div><p className="eyebrow !text-saffron-light">Pas daarna boeken</p><h2 className="font-display text-[3rem] font-semibold leading-[.9]">Controleer de hele bootketen.</h2></div><div><p className="max-w-[760px] text-sm font-medium leading-7 text-white/66">Controleer vertrekpier, check-inpunt, operator, bagageregel, aankomstpier en transfer naar je hotel. Een los goedkoop ticket kan een onhaalbare aansluiting maken.</p><a href={withPlacementSubId(TWELVEGO_GENERIC, subId, 'islands-nl-directory-ferry')} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-cream mt-6 w-fit text-saffron-dark">Bekijk actuele ferry-opties <ExternalLink size={14} /></a><AffiliateDisclosure className="mt-3 !text-white/58">Dit is een gesponsorde 12Go-link. Routes, tijden, pieren, bagage en voorwaarden veranderen; controleer de volledige actuele verbinding vóór betaling.</AffiliateDisclosure></div></div></section>

      <FaqSplitSection id="vragen" eyebrow="Echte zoekvragen" title="Veelgestelde vragen over Thaise eilanden" description="Zichtbaar gecontroleerd in Google Nederland op 31 juli 2026 en beantwoord zonder een subjectieve ranglijst als feit te presenteren." items={faqs} />
      <RelatedGuidesSection eyebrow="Van shortlist naar route" title="Maak de eilandkeuze uitvoerbaar" guides={[
        { title: 'Eilandhoppen plannen', description: 'Bepaal tempo, kust en logische keten zonder iedere vaardag vol te plannen.', href: '/thailand-islands/', image: '/images/redesign/thailand-route-coast-fork.webp', imageAlt: 'Keuze tussen Thaise eilandkusten' },
        { title: 'Weer & beste reistijd', description: 'Vergelijk klimaatzones en controleer daarna de lokale weersverwachting.', href: '/weather/', image: '/images/redesign/thailand-weather-coast-switch.webp', imageAlt: 'Weerkeuze tussen Thaise kusten' },
        { title: 'Vervoer in Thailand', description: 'Verbind vlucht, trein, bus, transfer en ferry als één reisdag.', href: '/transport/', image: '/images/redesign/transport-thailand-hero.webp', imageAlt: 'Vervoer door Thailand' },
      ]} />
      <SourceMethodSection title="Overzicht, geen eeuwige ranglijst" description="De hub combineert bestaande Nederlandse DFS-signalen met twee zichtbare Google Nederland-SERPs en echte keuzevragen op 31 juli 2026. Primaire bestemmingsbronnen bepalen context; actuele ferry- en weersinformatie moet vlak voor boeken opnieuw worden gecontroleerd." sources={[
        { title: 'Thailand destination portal', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Destinations', note: 'Officiële startbron voor provincies, eilanden en bestemmingscontext.' },
        { title: 'Marine weather', creator: 'Thai Meteorological Department', url: 'https://www.tmd.go.th/en', note: 'Actuele weers- en maritieme waarschuwingen; lokale omstandigheden veranderen.' },
        { title: 'Reisadvies Thailand', creator: 'NederlandWereldwijd', url: 'https://www.nederlandwereldwijd.nl/reisadvies/thailand', note: 'Actuele regionale veiligheids- en consulaire informatie.' },
      ]} />
    </div>
  </>;
}
