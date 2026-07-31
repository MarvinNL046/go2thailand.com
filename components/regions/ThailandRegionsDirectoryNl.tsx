import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Compass, ExternalLink, Map, Mountain, Route, Sparkles, Waves } from 'lucide-react';
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
import { useSubId } from '../../lib/useSubId';

interface RegionSummary {
  slug: string;
  name: { en: string; nl: string };
}

type Preference = 'all' | 'culture' | 'nature' | 'coast';

const regionMeta = {
  northern: { name: 'Noord-Thailand', image: '/images/redesign/northern-thailand-region-hero-nl.webp', eyebrow: 'Bergen & valleien', summary: 'Chiang Mai als basis, met een bewuste tweede as naar Chiang Rai, Sukhothai of de berglus.', route: 'Chiang Mai · tweede corridor', tags: ['culture', 'nature'] as Preference[] },
  central: { name: 'Centraal-Thailand', image: '/images/redesign/central-thailand-region-hero-nl.webp', eyebrow: 'Rivier & historische assen', summary: 'Bangkok als hub, met Ayutthaya, Kanchanaburi of een lokale riviervlakte als afzonderlijke keuze.', route: 'Bangkok · historie of westen', tags: ['culture'] as Preference[] },
  southern: { name: 'Zuid-Thailand', image: '/images/redesign/southern-thailand-region-hero-nl.webp', eyebrow: 'Twee kusten', summary: 'Kies eerst Andaman, zuidelijke Golf of vastelandnatuur en bouw daarna de bootketen.', route: 'Andaman · Golf · vasteland', tags: ['nature', 'coast'] as Preference[] },
  isaan: { name: 'Isaan', image: '/images/redesign/isaan-thailand-region-hero-nl.webp', eyebrow: 'Plateau & Mekong', summary: 'Reis via Korat, midden-Isaan of één Mekongcorridor zonder de regio als leeg of onontdekt te framen.', route: 'Korat · midden · Mekong', tags: ['culture', 'nature'] as Preference[] },
};

const preferences: Array<{ value: Preference; label: string; icon: typeof Map }> = [
  { value: 'all', label: 'Alle regio’s', icon: Map },
  { value: 'culture', label: 'Cultuur & steden', icon: Sparkles },
  { value: 'nature', label: 'Natuur & landschap', icon: Mountain },
  { value: 'coast', label: 'Kust & eilanden', icon: Waves },
];

const faqs = [
  { question: 'Wat zijn de 4 regio’s van Thailand?', answer: 'Voor deze reisgids gebruiken we vier praktische hoofdkeuzes: Noord-Thailand, Centraal-Thailand, Zuid-Thailand en Isaan in het noordoosten. Andere officiële of toeristische indelingen kunnen oost en west afzonderlijk rekenen; de indeling is dus een routehulpmiddel, geen enige geografische waarheid.' },
  { question: 'Wat zijn de mooiste regio’s in Thailand?', answer: 'Er is geen objectieve winnaar. Het noorden past bij bergen en steden, Centraal-Thailand bij Bangkok en erfgoed, het zuiden bij kustnetwerken en Isaan bij Mekong, eten en langere lokale routes. De beste regio is degene die in jouw periode en reistijd uitvoerbaar blijft.' },
  { question: 'Wat is de armste regio van Thailand?', answer: 'Economische verschillen zijn reëel, maar een veranderlijke statistiek is geen toeristisch label. Deze gids presenteert Isaan niet als arm of authentiek decor; gebruik actuele officiële statistiek voor economie en behandel iedere regio als intern divers.' },
  { question: 'Wat zijn de provincies van Thailand?', answer: 'Thailand bestaat uit provincies, terwijl toeristische regio’s meerdere provincies bundelen. Gebruik een regio om je reisnetwerk te kiezen en open daarna de provincie- of stadsowner voor exacte routes en verblijf.' },
];

export default function ThailandRegionsDirectoryNl({ regions }: { regions: RegionSummary[] }) {
  const [preference, setPreference] = useState<Preference>('all');
  const subId = useSubId();
  const cards = useMemo(() => regions.map((region) => ({ slug: region.slug, ...regionMeta[region.slug as keyof typeof regionMeta] })).filter((region) => region.name && (preference === 'all' || region.tags.includes(preference))), [regions, preference]);
  const pageUrl = 'https://go2-thailand.com/nl/region/';
  const schemas = [
    { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Regio’s van Thailand', description: 'Vergelijk Noord-, Centraal- en Zuid-Thailand en Isaan op route, landschap en logistiek.', url: pageUrl, inLanguage: 'nl-NL', mainEntity: { '@type': 'ItemList', numberOfItems: 4, itemListElement: Object.entries(regionMeta).map(([slug, region], index) => ({ '@type': 'ListItem', position: index + 1, name: region.name, url: `${pageUrl}${slug}/` })) } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(({ question, answer }) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/nl/' }, { '@type': 'ListItem', position: 2, name: 'Regio’s', item: pageUrl }] },
  ];

  return <>
    <SEOHead title="Regio’s Thailand: kies Noord, Centraal, Zuid of Isaan" description="Vergelijk de regio’s van Thailand op landschap, route, seizoen en vervoer. Kies tussen Noord-, Centraal- en Zuid-Thailand en Isaan." ogImage="https://go2-thailand.com/images/redesign/thailand-route-hero.webp">
      {schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
    </SEOHead>
    <div data-premium-template="thailand-regions-directory-nl" className="overflow-hidden bg-canvas text-charcoal">
      <EditorialHero image="/images/redesign/thailand-route-hero.webp" imageAlt="Trein en weg door verschillende landschappen van Thailand" breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Regio’s' }]} eyebrow="Eerst het netwerk, daarna de plaats" title={<>Regio’s van<br /><span className="text-saffron-dark">Thailand.</span></>} subtitle="Vier reisvragen. Geen eeuwige mooiste-ranglijst." description="Vergelijk Noord, Centraal, Zuid en Isaan op landschap, reistijd en verbinding. De indeling helpt je plannen; zij vervangt geen provinciekaart of actuele routecheck." actions={[{ label: 'Vergelijk de regio’s', href: '#regios', kind: 'primary' }, { label: 'Zo kies je', href: '#kiezen', kind: 'secondary' }]} imageClassName="object-cover object-[68%_center]" />
      <PageSectionNav items={[{ href: '#kiezen', label: 'Keuzelogica', icon: Compass }, { href: '#regios', label: 'Regio’s', icon: Map }, { href: '#verbinden', label: 'Verbinden', icon: Route }, { href: '#vragen', label: 'Vragen', icon: Sparkles }]} />

      <section id="kiezen" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"><div className="container-custom grid gap-10 lg:grid-cols-[.68fr_1.32fr] lg:items-center"><div><SectionHeading eyebrow="Vier praktische reisnetwerken" title="Wat wil je dat de route oplost?" description="Kies niet op een losse fotolijst. Bepaal of je vooral bergen, stads- en rivierassen, kustnetwerken of een langere Mekongcorridor wilt verbinden." /><div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter regio’s op reisstijl">{preferences.map(({ value, label, icon: Icon }) => <button key={value} type="button" aria-pressed={preference === value} onClick={() => setPreference(value)} className={`inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-[10px] font-extrabold transition ${preference === value ? 'border-jade bg-jade text-white' : 'border-jade/10 bg-white text-jade hover:bg-tonal'}`}><Icon size={15} />{label}</button>)}</div></div><div className="relative mx-auto w-full max-w-[430px]"><ThailandMapGraphic className="w-full drop-shadow-[0_25px_40px_rgba(13,65,55,.14)]" label="Geografische contour van Thailand als regioselectie" /><div className="absolute right-2 top-[18%] rounded-xl border border-jade/10 bg-white/92 px-3 py-2 text-[9px] font-extrabold text-jade shadow-sm">Noord</div><div className="absolute right-0 top-[45%] rounded-xl border border-jade/10 bg-white/92 px-3 py-2 text-[9px] font-extrabold text-jade shadow-sm">Isaan</div><div className="absolute left-2 top-[48%] rounded-xl border border-jade/10 bg-white/92 px-3 py-2 text-[9px] font-extrabold text-jade shadow-sm">Centraal</div><div className="absolute right-[18%] top-[76%] rounded-xl border border-jade/10 bg-white/92 px-3 py-2 text-[9px] font-extrabold text-jade shadow-sm">Zuid</div></div></div></section>

      <section id="regios" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"><div className="container-custom"><SectionHeading eyebrow="Van land naar route" title="Open de regio die bij je tempo past." description={`${cards.length} van 4 regio’s passen bij het gekozen reisprofiel. Iedere owner vergelijkt corridors, actuele condities en echte vervolgbeslissingen.`} /><div className="mt-10 grid gap-5 md:grid-cols-2">{cards.map((region, index) => <Link key={region.slug} href={`/region/${region.slug}/`} className="group grid overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card sm:grid-cols-[.9fr_1.1fr]"><div className="relative min-h-60 overflow-hidden"><Image src={region.image} alt={`${region.name}, regio in Thailand`} fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover transition duration-500 group-hover:scale-[1.035]" /><div className="absolute inset-0 bg-gradient-to-t from-jade/62 via-transparent to-transparent" /><span className="absolute left-4 top-4 rounded-full bg-ivory/92 px-3 py-1.5 text-[9px] font-extrabold text-jade">0{index + 1}</span></div><div className="flex flex-col p-6"><p className="eyebrow">{region.eyebrow}</p><h2 className="font-display text-[2.2rem] font-semibold leading-none text-jade">{region.name}</h2><p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">{region.summary}</p><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[.1em] text-saffron-dark">{region.route}</p><span className="mt-auto inline-flex items-center gap-2 pt-6 text-xs font-extrabold text-jade">Open regiogids <ArrowRight size={14} className="text-saffron-dark transition group-hover:translate-x-1" /></span></div></Link>)}</div></div></section>

      <section id="verbinden" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"><div className="container-custom grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-center"><div><p className="eyebrow">Reken in reisdagen</p><h2 className="font-display text-[3.2rem] font-semibold leading-[.9] text-jade">Eén overgang kan een hele dag zijn.</h2></div><div className="rounded-2xl bg-jade p-7 text-white"><p className="text-sm font-medium leading-7 text-white/68">Een regio-overgang combineert vaak hotelcheckout, terminal, lange trein of vlucht en de laatste transfer. Vergelijk daarom deur-tot-deur en bescherm losse aansluitingen.</p><a href={withPlacementSubId(TWELVEGO_GENERIC, subId, 'regions-nl-directory-transport')} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-cream mt-6 w-fit text-saffron-dark">Bekijk actuele vervoeropties <ExternalLink size={14} /></a><AffiliateDisclosure className="mt-3 !text-white/58">Gesponsorde 12Go-link. Vertrekpunt, tijden, bagage, voorwaarden en totale route kunnen wijzigen.</AffiliateDisclosure></div></div></section>

      <FaqSplitSection id="vragen" eyebrow="Echte zoekvragen" title="Veelgestelde vragen over Thailand-regio’s" description="De hoofdvragen zijn zichtbaar gecontroleerd in Google Nederland op 31 juli 2026. We scheiden een praktische reisindeling bewust van provincies, economie en subjectieve ranglijsten." items={faqs} />
      <RelatedGuidesSection eyebrow="Van regio naar reis" title="Maak de keuze uitvoerbaar" guides={[{ title: 'Bestemmingen', description: 'Open de stad of plaats die jouw gekozen regio daadwerkelijk draagt.', href: '/city/', image: '/images/redesign/thailand-route-rhythm.webp', imageAlt: 'Bestemmingen en routekeuzes door Thailand' }, { title: 'Reisroutes', description: 'Zet regio’s om in een ritme met realistische verplaatsingsdagen.', href: '/itineraries/', image: '/images/redesign/thailand-route-hero.webp', imageAlt: 'Route en ritme door Thailand' }, { title: 'Weer & kustkeuze', description: 'Vergelijk klimaatzones en controleer daarna de actuele conditie.', href: '/weather/', image: '/images/redesign/thailand-weather-coast-switch.webp', imageAlt: 'Weerkeuze tussen Thaise regio’s' }]} />
      <SourceMethodSection title="Praktische indeling, geen absolute landkaart" description="De directory combineert lokaal beschikbare DFS-signalen, vijf zichtbare Nederlandse SERPs en primaire regionale bronnen. De vierdeling is een routekeuze; officiële en toeristische indelingen kunnen meer regio’s onderscheiden." sources={[{ title: 'Destinations by region', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Destinations', note: 'Officiële startbron voor regio- en provinciecontext.' }, { title: 'Regional weather', creator: 'Thai Meteorological Department', url: 'https://www.tmd.go.th/en', note: 'Actuele regionale verwachtingen en waarschuwingen.' }, { title: 'Reisadvies Thailand', creator: 'NederlandWereldwijd', url: 'https://www.nederlandwereldwijd.nl/reisadvies/thailand', note: 'Actuele veiligheids-, grens- en vervoerscontext.' }]} />
    </div>
  </>;
}
