import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  CircleHelp,
  Coffee,
  Eye,
  ExternalLink,
  Footprints,
  Grid2X2,
  Map,
  MapPin,
  Moon,
  QrCode,
  Salad,
  ShieldCheck,
  ShoppingBag,
  Soup,
  Sun,
  TrainFront,
  Trees,
  UtensilsCrossed,
} from 'lucide-react';
import type { AmazonAffiliateSlug } from '../../lib/amazon-affiliates';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav, type PageSectionNavItem } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';

const PAGE_URL = 'https://go2-thailand.com/nl/blog/bangkok-lumpini-hawker-centre-street-food-2026/';
const HERO_IMAGE = '/images/redesign/editorial/bangkok-lumpini-hawker-centre-street-food-2026-hero.webp';
const PAGE_TITLE = 'Lumpini Hawker Centre Bangkok: route, tijden en eten';
const PAGE_DESCRIPTION = 'Plan je bezoek aan Lumpini Hawker Centre bij Gate 5: actuele shifts, route vanaf BTS/MRT, gerechtkeuze, betalen en een park-plus-eten plan.';

const navItems: PageSectionNavItem[] = [
  { href: '#kort', label: 'In het kort', icon: BadgeCheck },
  { href: '#route', label: 'Route', icon: MapPin },
  { href: '#kiezen', label: 'Eten kiezen', icon: UtensilsCrossed },
  { href: '#betalen', label: 'Betalen', icon: Banknote },
  { href: '#park', label: 'Park + eten', icon: Trees },
  { href: '#vergelijken', label: 'Vergelijken', icon: Grid2X2 },
  { href: '#vragen', label: 'Vragen', icon: CircleHelp },
];

const visitPlans: Array<{ icon: LucideIcon; title: string; time: string; description: string; route: string }> = [
  {
    icon: Coffee,
    title: 'Ontbijt na het park',
    time: '07:00–09:00',
    description: 'Begin met een rustige ronde in het park en kies daarna één warm ontbijt plus drank. De ochtendshift is dan al op gang zonder middaghitte.',
    route: 'Park → Gate 5 → ontbijt',
  },
  {
    icon: Soup,
    title: 'Gerichte lunch',
    time: '11:00–13:00',
    description: 'Scan eerst alle actieve rijen, kies dan een gerecht dat per bestelling wordt bereid en zoek vóór bestellen een vrije tafel.',
    route: 'Eerst kijken → dan bestellen',
  },
  {
    icon: Moon,
    title: 'Vroege avond',
    time: '17:00–19:30',
    description: 'Combineer de koelere parkuren met het begin van de avondshift. Individuele kramen kunnen later opstarten of die dag ontbreken.',
    route: 'Wandeling → diner',
  },
  {
    icon: UtensilsCrossed,
    title: 'Food-first bezoek',
    time: '± 75 minuten',
    description: 'Deel twee kleine gerechten en één dessert. Zo vergelijk je technieken zonder van de venue een eindeloze afvinklijst te maken.',
    route: 'Hartig → tweede stijl → zoet',
  },
];

const faqs = [
  {
    question: 'Wat is het Lumpini Hawker Centre?',
    answer: 'Het is een door de Bangkok Metropolitan Administration ontwikkeld, georganiseerd streetfoodcentrum naast Lumpini Park. Het model combineert roterende verkopers met vaste kraamruimte, gezamenlijke zitplaatsen, water-, afwas-, afval- en handwasvoorzieningen. Het werd op 10 april 2026 soft-geopend. Zie het als een BMA-pilot in centraal Bangkok, niet als bewijs dat alle streetfood naar één uniform model verhuist.',
  },
  {
    question: 'Wat zijn de openingstijden van Lumpini Hawker Centre?',
    answer: 'De gepubliceerde werking bestaat uit een ochtendshift van 05:00 tot 16:00 en een avondshift van 16:00 tot middernacht. Dat is de venueplanning; individuele kramen, gerechten en opstartmomenten kunnen afwijken. Controleer op de bezoekdag recente kanalen en kom niet uitsluitend voor één specifieke verkoper zonder diens eigen bevestiging.',
  },
  {
    question: 'Waar ligt Lumpini Hawker Centre?',
    answer: 'Het centrum ligt langs Ratchadamri Road bij Gate 5 van Lumpini Park, tegenover de zijde van Chulalongkorn Hospital. Nation Thailand noemt BTS Sala Daeng uitgang 6 en MRT Lumphini uitgang 1 als toegangen. Er is geen directe overdekte stationsverbinding; bewaar Gate 5 en Ratchadamri Road als kaartanker en volg de actuele stationsborden.',
  },
  {
    question: 'Welk MRT-station is het beste voor Lumpini Park en het hawker centre?',
    answer: 'Voor het hawker centre noemt de openingspublicatie MRT Lumphini uitgang 1; voor andere delen van het park kan MRT Si Lom logischer zijn. “Beste” hangt dus af van je parkroute en vertrekpunt. Plan voor Gate 5 aan Ratchadamri Road en laat een algemene parkentree je niet per ongeluk aan de andere kant van het 57,6 hectare grote park uitkomen.',
  },
  {
    question: 'Is Lumpini Hawker Centre de moeite waard?',
    answer: 'Ja als je betaalbare Thaise gerechten wilt combineren met Lumpini Park, zitruimte en een centraal gelegen, georganiseerd bestelproces. Het is minder passend wanneer je juist één beroemde historische kraam zoekt, airconditioning wilt of een grote avondmarkt met winkels en entertainment verwacht. De kracht is de park-plus-maaltijdroute, niet dat iedere kraam uniek of dagelijks aanwezig is.',
  },
  {
    question: 'Wat kun je eten in Lumpini Hawker Centre?',
    answer: 'Het roterende aanbod kan onder meer rijstgerechten, noedels, papajasalade, gegrilde snacks, ontbijt, dranken, desserts en seizoensfruit omvatten. Bouw je keuze op bereiding en behoefte: een kom of bord als basis, eventueel één gedeelde snack en daarna iets zoets. Vraag ter plekke wat werkelijk beschikbaar is en controleer pittigheid en allergenen per bestelling.',
  },
  {
    question: 'Kun je contant betalen of heb je Thaise QR nodig?',
    answer: 'LINE MAN Wongnai ondersteunde het project met QR-betaaltechnologie, maar een Thaise QR-code is niet automatisch bruikbaar met iedere buitenlandse bankapp. Neem daarom baht in kleine coupures mee en vraag vóór bestellen welke betaalwijze de specifieke kraam accepteert. Een digitaal betaalbord bij één kraam zegt niets over alle andere verkopers.',
  },
  {
    question: 'Heeft Lumpini Hawker Centre airconditioning?',
    answer: 'Nee. Het ontwerp gebruikt natuurlijke ventilatie in een halfopen structuur. Dat geeft beschutting en luchtstroom, maar geen gekoelde mall-omgeving. Voor meer comfort zijn vroege ochtend en vroege avond vaak logischer dan het heetste deel van de middag. Tijdens zware regen kan open zijkant bovendien opspattend water of wind toelaten.',
  },
  {
    question: 'Moet je betalen voor Lumpini Park?',
    answer: 'De officiële BMA-pagina vermeldt gratis toegang tot Lumpini Park en dagelijkse parkuren van 04:30 tot 22:00. Het hawker centre verkoopt eten apart en heeft gepubliceerde uren tot middernacht. Behandel park en eetcentrum dus als twee aangrenzende plekken met een eigen ritme; na 22:00 kun je niet aannemen dat iedere parkpoort open blijft.',
  },
  {
    question: 'Wat is beter: Lumpini Hawker Centre, een mall-foodcourt of een nachtmarkt?',
    answer: 'Kies Lumpini voor park plus streetfood en halfopen zitruimte, een mall-foodcourt voor airconditioning en een voorspelbaar betaalsysteem, en een nachtmarkt voor avondenergie, winkelen en meer omwegen. Losse straatkramen zijn beter als je al een specifieke verkoper kent. Er is geen algemene winnaar; kies de setting die jouw dagtaak het eenvoudigst maakt.',
  },
];

const sources = [
  {
    title: 'Bangkok soft-opens Hawker Centre Suan Lumphini',
    creator: 'Nation Thailand',
    url: 'https://www.nationthailand.com/blogs/thailand/bangkok/40064920',
    note: 'Bron voor soft-opening op 10 april 2026, Gate 5, genoemde BTS/MRT-uitgangen, shifts, rotatiemodel en gezamenlijke infrastructuur.',
  },
  {
    title: 'Lumpini Park’s Hawker Center is now open',
    creator: 'Time Out Bangkok',
    url: 'https://www.timeout.com/bangkok/news/hawker-center-lumphini-042226',
    note: 'Onafhankelijke venuecontext voor ligging, open structuur, ochtend-/avondshift en debat over georganiseerd streetfood.',
  },
  {
    title: 'First hawker centre in central Bangkok a success',
    creator: 'Bangkok Post',
    url: 'https://www.bangkokpost.com/thailand/general/3246900/first-hawker-centre-in-central-bangkok-a-success',
    note: 'Actuelere aprilreferentie voor meer dan 130 roterende stalls en de gepubliceerde 05:00–00:00-werking; gebruikt als momentopname, niet als daggarantie.',
  },
  {
    title: 'Suan Lumpini',
    creator: 'Greener Bangkok — BMA',
    url: 'https://greener.bangkok.go.th/park/suan-lumpini/',
    note: 'Primaire BMA-bron voor parkuren 04:30–22:00, gratis toegang, ligging en openbaarvervoercontext.',
  },
];

const amazonProducts: Array<{ slug: AmazonAffiliateSlug; title: string; reason: string; icon: LucideIcon }> = [
  {
    slug: 'rainleaf-travel-towel',
    title: 'Compacte reisdoek',
    reason: 'Voor zweet of een korte bui na je parkwandeling; gebruik hem niet als vervanging voor drinkwater of rust.',
    icon: Footprints,
  },
  {
    slug: 'sun-cube-wide-brim-hat',
    title: 'Lichtgewicht zonnehoed',
    reason: 'Voor open parkdelen vóór of na de maaltijd; controleer pasvorm, materiaal en eigen zonbeschermingsbehoefte.',
    icon: Sun,
  },
  {
    slug: 'venture-pal-packable-backpack',
    title: 'Opvouwbare daypack',
    reason: 'Voor water en lichte dagspullen zonder grote bagage tussen tafels en smalle looppaden mee te nemen.',
    icon: ShoppingBag,
  },
];

function createSchemas() {
  return [
    {
      '@context': 'https://schema.org', '@type': 'Article', '@id': `${PAGE_URL}#article`, headline: PAGE_TITLE,
      description: PAGE_DESCRIPTION, image: `https://go2-thailand.com${HERO_IMAGE}`, datePublished: '2026-03-22', dateModified: '2026-08-01',
      inLanguage: 'nl-NL', mainEntityOfPage: PAGE_URL,
      author: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
      publisher: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
    },
    {
      '@context': 'https://schema.org', '@type': 'FoodEstablishment', '@id': `${PAGE_URL}#venue`, name: 'Hawker Centre Suan Lumphini',
      description: 'BMA streetfoodcentrum met roterende verkopers naast Gate 5 van Lumpini Park.',
      address: { '@type': 'PostalAddress', streetAddress: 'Gate 5, Ratchadamri Road', addressLocality: 'Pathum Wan, Bangkok', addressCountry: 'TH' },
      isAccessibleForFree: true,
    },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/nl/' },
        { '@type': 'ListItem', position: 2, name: 'Bangkok', item: 'https://go2-thailand.com/nl/city/bangkok/' },
        { '@type': 'ListItem', position: 3, name: 'Lumpini Hawker Centre', item: PAGE_URL },
      ],
    },
    {
      '@context': 'https://schema.org', '@type': 'HowTo', name: 'Zo plan je eten bij Lumpini Hawker Centre',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Kies een tijdvenster', text: 'Kies ontbijt, lunch of vroege avond en houd rekening met roterende shifts.' },
        { '@type': 'HowToStep', position: 2, name: 'Navigeer naar Gate 5', text: 'Bewaar Ratchadamri Road en Gate 5 naast Lumpini Park als kaartanker.' },
        { '@type': 'HowToStep', position: 3, name: 'Scan vóór bestellen', text: 'Bekijk actieve kramen, zitplaatsen, bereiding en zichtbare menuprijzen.' },
        { '@type': 'HowToStep', position: 4, name: 'Bestel één basis', text: 'Begin met één gerecht en voeg alleen iets toe wanneer portie en behoefte duidelijk zijn.' },
      ],
    },
  ];
}

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="font-extrabold text-jade underline decoration-saffron/55 underline-offset-4 transition hover:text-saffron-dark">{children}</Link>;
}

export function LumpiniHawkerCentreGuide() {
  const schemas = createSchemas();

  return (
    <>
      <SEOHead title={PAGE_TITLE} description={PAGE_DESCRIPTION} ogImage={`https://go2-thailand.com${HERO_IMAGE}`}>
        <meta name="keywords" content="lumpini hawker centre, hawker center lumpini bangkok, eten lumpini park, streetfood lumpini park, lumpini hawker centre opening hours" />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content="2026-03-22" />
        <meta property="article:modified_time" content="2026-08-01" />
        {schemas.map((schema, index) => <script key={`${schema['@type']}-${index}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      </SEOHead>

      <div className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          image={HERO_IMAGE}
          imageAlt="Open hawkerpaviljoen met ontbijtgasten en hardlopers naast Lumpini Park"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Bangkok', href: '/city/bangkok/' }, { label: 'Lumpini Hawker Centre' }]}
          eyebrow="Parkwandeling. Eén goede maaltijd."
          title={<>Lumpini Hawker Centre.</>}
          subtitle={<>Van Gate 5 naar je eerste gerecht.</>}
          description={<>Geen verouderde lijst met trialprijzen of “beste” kraampjes. Wel de actuele shifts, aankomstroute en een keuzemethode die blijft werken terwijl verkopers roteren.</>}
          actions={[
            { label: 'Kies je bezoekplan', href: '#kort', kind: 'primary' },
            { label: 'Bekijk de route', href: '#route', kind: 'secondary' },
          ]}
          minHeightClassName="min-h-[820px] lg:min-h-[700px]"
          contentClassName="max-w-[680px]"
          titleClassName="max-w-[680px] text-[4rem] leading-[0.84] sm:text-[5rem] lg:text-[5.5rem]"
          subtitleClassName="max-w-[590px] text-[1.7rem] leading-[0.98] text-saffron-dark sm:text-[2.2rem]"
          imageClassName="object-cover object-[67%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.03)_0%,rgba(252,250,246,0.72)_49%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.99)_0%,rgba(252,250,246,0.92)_39%,rgba(252,250,246,0.14)_68%,rgba(18,63,54,0.05)_100%)]"
          sideCard={(
            <aside className="absolute bottom-8 right-[max(2rem,calc((100vw-1240px)/2))] z-10 hidden w-[340px] overflow-hidden rounded-2xl border border-white/60 bg-white/[0.92] shadow-editorial-lift backdrop-blur-xl xl:block">
              <div className="flex items-center justify-between border-b border-jade/10 px-5 py-4"><p className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-saffron-dark">Vertrekkaart · juli 2026</p><UtensilsCrossed size={18} className="text-jade" /></div>
              <dl className="grid grid-cols-[90px_1fr] gap-x-4 gap-y-3 p-5 text-[11px]">
                <dt className="text-charcoal/46">Locatie</dt><dd className="font-extrabold text-jade">Gate 5 · Ratchadamri</dd>
                <dt className="text-charcoal/46">Ochtend</dt><dd className="font-extrabold text-jade">05:00–16:00</dd>
                <dt className="text-charcoal/46">Avond</dt><dd className="font-extrabold text-jade">16:00–00:00</dd>
                <dt className="text-charcoal/46">Park</dt><dd className="font-extrabold text-jade">04:30–22:00 · gratis</dd>
              </dl>
              <p className="border-t border-jade/10 px-5 py-4 text-[10px] font-medium leading-4 text-charcoal/62">Gepubliceerde venue- en parkuren; individuele kraamuren en het actuele aanbod kunnen afwijken.</p>
            </aside>
          )}
        />

        <PageSectionNav items={navItems} />

        <section id="kort" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:items-end">
              <SectionHeading eyebrow="Eerst je moment kiezen" title={<>Vier routes,<br />niet één perfect uur</>} description={<>Het centrum werkt met roterende verkopers en twee lange shifts. Kies daarom je bezoekdoel vóór je een specifiek gerecht kiest. Voor de bredere stadsplanning gebruik je onze <InlineLink href="/city/bangkok/">complete Bangkok-gids</InlineLink>.</>} />
              <p className="max-w-3xl text-sm font-medium leading-7 text-charcoal/66">De locatie is het sterkst als schakel tussen park en maaltijd. Wie alleen voor één online aanbevolen kraam komt, maakt zich afhankelijk van een rooster dat kan wisselen. Wie ontbijt, lunch of diner als route kiest, houdt genoeg alternatieven over.</p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {visitPlans.map(({ icon: Icon, title, time, description, route }, index) => (
                <article key={title} className={`flex min-h-[360px] flex-col rounded-2xl border p-6 ${index === 0 ? 'border-saffron/40 bg-[#fff4df] shadow-editorial-card' : 'border-jade/10 bg-white'}`}>
                  <div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/25 bg-canvas text-jade"><Icon size={21} strokeWidth={1.45} /></span><span className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{time}</span></div>
                  <h2 className="mt-6 font-display text-[1.65rem] font-semibold leading-none text-jade">{title}</h2>
                  <p className="mt-4 text-xs font-medium leading-6 text-charcoal/66">{description}</p>
                  <p className="mt-auto border-t border-jade/10 pt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-jade/52">{route}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="route" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <SectionHeading eyebrow="Geen stationsnaam zonder eindanker" title="Navigeer naar Gate 5 aan Ratchadamri Road" description={<>De officiële openingspublicatie noemt BTS Sala Daeng uitgang 6 en MRT Lumphini uitgang 1. Onze <InlineLink href="/blog/bangkok-public-transport-bts-mrt-tourist-guide-2026/">BTS- en MRT-gids</InlineLink> helpt je de rit plannen; volg ter plaatse altijd de actuele stationsborden.</>} />
            <div>
              <div className="relative grid gap-4 md:grid-cols-3">
                <div className="pointer-events-none absolute left-[10%] right-[10%] top-9 hidden border-t-2 border-dashed border-saffron/60 md:block" />
                {[
                  [TrainFront, 'Station', 'Kies Sala Daeng BTS of Lumphini MRT op basis van je vertrekpunt, niet op basis van een universele “beste” route.'],
                  [Map, 'Ratchadamri Road', 'Bewaar Gate 5 en de parkzijde langs Ratchadamri; een algemene pin voor Lumpini Park kan je naar een andere toegang leiden.'],
                  [MapPin, 'Gate 5', 'Het hawker centre ligt naast de parkpoort. Er is geen directe overdekte verbinding vanaf een station.'],
                ].map(([Icon, title, text], index) => {
                  const CardIcon = Icon as LucideIcon;
                  return <article key={String(title)} className="relative min-h-[300px] rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="relative z-10 grid h-[72px] w-[72px] place-items-center rounded-full border border-saffron/35 bg-canvas text-jade"><CardIcon size={27} strokeWidth={1.4} /></span><p className="mt-6 text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">Stap 0{index + 1}</p><h3 className="mt-2 font-display text-[1.65rem] font-semibold text-jade">{String(title)}</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/66">{String(text)}</p></article>;
                })}
              </div>
              <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-saffron/25 bg-[#fff4df] p-6 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-3xl text-xs font-medium leading-6 text-charcoal/68"><strong className="text-jade">Regencheck:</strong> de paviljoens zijn overdekt maar halfopen. Neem voor de laatste wandeling een compacte regenoptie mee en verwacht geen volledig geklimatiseerde verbinding.</p><a href="https://maps.google.com/?q=Hawker+Centre+Suan+Lumphini+Gate+5+Ratchadamri" target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 text-xs font-extrabold text-jade">Open kaart <ExternalLink size={14} className="text-saffron-dark" /></a></div>
            </div>
          </div>
        </section>

        <section id="kiezen" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
            <div className="relative min-h-[500px] overflow-hidden rounded-[28px] shadow-editorial-lift sm:min-h-[640px]">
              <Image src="/images/redesign/lumpini-hawker-food.webp" alt="Jok, kip met rijst, noedels en mango sticky rice op een gedeelde hawkertafel" fill sizes="(max-width: 1024px) 100vw, 52vw" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-jade/94 via-jade/50 to-transparent p-7 pt-32 text-white"><p className="eyebrow !text-saffron-light">Vier richtingen, geen must-eatlijst</p><h2 className="max-w-xl font-display text-[3rem] font-semibold leading-[0.9] tracking-[-0.04em]">Kies op bereiding, portie en moment.</h2></div>
            </div>
            <div>
              <SectionHeading eyebrow="Scan voordat je bestelt" title="Een kraam is pas interessant als hij jouw vraag oplost" description={<>Voor gerecht- en ingrediëntcontext lees je onze <InlineLink href="/thailand-street-food/">Thaise streetfoodgids</InlineLink>. Hier draait het om kiezen binnen een venue waar het aanbod per shift roteert.</>} />
              <div className="mt-8 space-y-4">
                {[
                  [Coffee, 'Ontbijt & zacht', 'Jok, eieren, sojadrank of een eenvoudige rijstkeuze passen bij een vroege parkroutine. Vraag wat nú vers wordt geserveerd.'],
                  [Soup, 'Warm & per bestelling', 'Noedels of een wokgerecht geven zicht op bereiding. Bespreek pittigheid en allergenen vóór de pan of kom wordt opgebouwd.'],
                  [Salad, 'Fris & gedeeld', 'Salades en gegrilde snacks werken als aanvulling, maar sauzen kunnen vissaus, pinda, soja, garnalenpasta of chili bevatten.'],
                  [UtensilsCrossed, 'Zoet als afsluiter', 'Fruit of een dessert is een logische laatste keuze. Koop niet alvast alles wanneer je de porties nog niet kent.'],
                ].map(([Icon, title, text]) => {
                  const CardIcon = Icon as LucideIcon;
                  return <article key={String(title)} className="grid grid-cols-[48px_1fr] gap-4 rounded-2xl border border-jade/10 bg-white p-5"><span className="grid h-12 w-12 place-items-center rounded-xl bg-[#eef2ed] text-jade"><CardIcon size={20} strokeWidth={1.45} /></span><div><h3 className="font-display text-[1.45rem] font-semibold text-jade">{String(title)}</h3><p className="mt-2 text-xs font-medium leading-5 text-charcoal/64">{String(text)}</p></div></article>;
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="betalen" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-end">
              <SectionHeading eyebrow="Prijs zonder trialmuseum" title="Lees het menu van vandaag" description="De oude pagina publiceerde losse aprilprijzen alsof ze een permanente prijslijst vormden. Bij roterende verkopers is een eenvoudige bestelcheck betrouwbaarder dan zo’n momentopname." />
              <p className="max-w-3xl text-sm font-medium leading-7 text-charcoal/66">Controleer gerecht, portie, extra’s en eindbedrag vóór bestellen. Een basisgerecht, ei, grotere portie, extra vlees of drank kan afzonderlijk geprijsd zijn. Betaal de zichtbare prijs; afdingen op een bereide maaltijd met menuprijs is niet de standaardtaak.</p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                [Eye, 'Menu', 'Is de prijs gekoppeld aan het gerecht en de portiegrootte die jij aanwijst?', 'Eerst kijken'],
                [Banknote, 'Cashbackup', 'Neem kleine bahtcoupures mee en berg wisselgeld op voordat je met dienblad loopt.', 'Niet cash-only beloven'],
                [QrCode, 'Thaise QR', 'QR BOX ondersteunt digitaal betalen, maar buitenlandse apps werken niet automatisch met iedere Thaise QR.', 'Per bank en kraam'],
                [ShieldCheck, 'Allergenen', 'Vraag ingrediënten én kruiscontact; kan de kraam dat niet betrouwbaar uitleggen, kies een eenvoudiger gerecht.', 'Geen algemene garantie'],
              ].map(([Icon, title, text, cue]) => {
                const CardIcon = Icon as LucideIcon;
                return <article key={String(title)} className="flex min-h-[320px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><CardIcon size={22} strokeWidth={1.45} className="text-jade" /><h3 className="mt-6 font-display text-[1.6rem] font-semibold text-jade">{String(title)}</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/66">{String(text)}</p><p className="mt-auto border-t border-jade/10 pt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{String(cue)}</p></article>;
              })}
            </div>
          </div>
        </section>

        <section id="park" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="relative overflow-hidden rounded-[30px] bg-jade shadow-editorial-lift">
              <div className="relative min-h-[390px] sm:min-h-[460px]"><Image src="/images/redesign/lumpini-hawker-route.webp" alt="Avondroute langs het meer van Lumpini Park naar een verlicht hawkerpaviljoen" fill sizes="100vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-jade/94 via-jade/55 to-transparent" /></div>
              <div className="absolute inset-0 flex max-w-[680px] flex-col justify-center p-8 text-white sm:p-12"><p className="eyebrow !text-saffron-light">Twee klokken, één route</p><h2 className="font-display text-[3.25rem] font-semibold leading-[0.88] tracking-[-0.04em] sm:text-[4rem]">Het park sluit eerder dan het eten.</h2><p className="mt-5 max-w-xl text-sm font-medium leading-7 text-white/72">BMA publiceert voor Lumpini Park 04:30–22:00; het hawker centre werkt volgens de gepubliceerde shifts tot middernacht. Eindig je avondroute daarom bewust aan Gate 5 en verwacht na parksluiting geen doorgang door iedere poort.</p></div>
            </div>
            <div className="mt-8 grid gap-5 lg:grid-cols-[0.66fr_1.34fr]">
              <SectionHeading eyebrow="Ochtend of avond" title="Plan in de richting van je maaltijd" description="Loop niet eerst willekeurig het hele park door. Kies een lus die eindigt aan Ratchadamri Road, zeker bij hitte, regen of een vaste vervolgafspraak." />
              <div className="grid gap-4 sm:grid-cols-2">
                <article className="rounded-2xl border border-jade/10 bg-white p-7 shadow-editorial-card"><p className="eyebrow">Ochtendroute · ± 2 uur</p><h3 className="font-display text-[1.8rem] font-semibold text-jade">Parklicht → ontbijt</h3><ol className="mt-5 space-y-3 text-xs font-medium leading-5 text-charcoal/66"><li>1. Start bij een toegang die bij je station past.</li><li>2. Wandel één rustige lus; bouw marge voor warmte in.</li><li>3. Eindig aan Gate 5 en scan het ontbijtaanbod.</li><li>4. Kies één basis en vertrek vóór de lunchpiek.</li></ol></article>
                <article className="rounded-2xl border border-saffron/30 bg-[#fff4df] p-7 shadow-editorial-card"><p className="eyebrow">Avondroute · ± 2,5 uur</p><h3 className="font-display text-[1.8rem] font-semibold text-jade">Koeler park → diner</h3><ol className="mt-5 space-y-3 text-xs font-medium leading-5 text-charcoal/66"><li>1. Kom vóór donker met genoeg tijd voor het park.</li><li>2. Loop richting Ratchadamri en Gate 5.</li><li>3. Controleer welke avondkramen echt actief zijn.</li><li>4. Eet buiten het parkritme en vertrek via straatzijde.</li></ol></article>
              </div>
            </div>
          </div>
        </section>

        <section id="vergelijken" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-end">
              <SectionHeading eyebrow="Kies de setting" title="Wanneer Lumpini wel — en wanneer niet" description={<>Wil je juist avondmarkten met winkelen en meer omwegen, vergelijk dan onze <InlineLink href="/blog/best-night-markets-bangkok-2026/">Bangkokse nachtmarkten</InlineLink>. Lumpini wint vooral als park en eten samen je dag vereenvoudigen.</>} />
              <p className="max-w-3xl text-sm font-medium leading-7 text-charcoal/66">Een georganiseerd paviljoen is niet automatisch veiliger, authentieker of beter dan iedere losse kraam. Het biedt gezamenlijke infrastructuur en zitruimte. De uiteindelijke keuze blijft afhankelijk van bereiding, omloop, uitleg, allergenen en wat die shift daadwerkelijk open is.</p>
            </div>
            <div className="mt-10 overflow-hidden rounded-[26px] border border-jade/10 bg-white shadow-editorial-card">
              <div className="grid grid-cols-[1.25fr_repeat(4,minmax(150px,1fr))] overflow-x-auto text-xs">
                <div className="bg-jade p-5 font-extrabold text-white">Je zoekt</div>{['Lumpini hawker', 'Losse kraam', 'Mall-foodcourt', 'Nachtmarkt'].map((item) => <div key={item} className="min-w-[150px] border-l border-white/10 bg-jade p-5 text-center font-extrabold text-white">{item}</div>)}
                {[
                  ['Park + maaltijd', 'Sterk', 'Wisselend', 'Zwak', 'Wisselend'],
                  ['Airconditioning', 'Nee', 'Nee', 'Ja', 'Meestal niet'],
                  ['Vaste zitruimte', 'Ja', 'Niet altijd', 'Ja', 'Wisselend'],
                  ['Eén specifieke kraam', 'Roostercheck', 'Sterk', 'Ketens/mix', 'Locatiecheck'],
                  ['Shoppen erbij', 'Nee', 'Nee', 'Ja', 'Vaak wel'],
                ].flatMap((row) => row.map((cell, index) => <div key={`${row[0]}-${index}`} className={`${index === 0 ? 'font-extrabold text-jade' : 'text-center text-charcoal/66'} min-w-[150px] border-l border-t border-jade/10 p-5 first:border-l-0`}>{cell}</div>))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:items-end"><SectionHeading eyebrow="Park + hawker kit" title="Drie lichte spullen voor één complete route" description="Alleen uitrusting die de park-naar-maaltijdtaak ondersteunt. Geen servies, foodgadgets of producten die doen alsof je een gratis toegankelijke venue moet voorbereiden als expeditie." /><p className="max-w-3xl text-sm font-medium leading-7 text-charcoal/66">De centrale `/go/`-routes houden tracking en OneLink op één plek. Amazon kan je, wanneer beschikbaar en gekoppeld, naar een passende lokale winkel sturen; controleer product, verkoper, maat, prijs en leverbaarheid zelf.</p></div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {amazonProducts.map(({ slug, title, reason, icon: Icon }, index) => (
                <a key={slug} href={`/go/${slug}/`} target="_blank" rel="noopener noreferrer nofollow sponsored" className={`group flex min-h-[300px] flex-col rounded-2xl border p-6 transition hover:-translate-y-1 hover:shadow-editorial-lift ${index === 0 ? 'border-saffron/35 bg-[#fff4df]' : 'border-jade/10 bg-white'}`}>
                  <div className="flex items-center justify-between"><span className="grid h-12 w-12 place-items-center rounded-xl bg-canvas text-jade"><Icon size={22} strokeWidth={1.45} /></span><ExternalLink size={15} className="text-saffron-dark" /></div>
                  <h3 className="mt-6 font-display text-[1.7rem] font-semibold leading-none text-jade">{title}</h3>
                  <p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">{reason}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-5 text-xs font-extrabold text-jade">Bekijk via Amazon <ArrowRight size={14} className="text-saffron transition group-hover:translate-x-1" /></span>
                </a>
              ))}
            </div>
            <AffiliateDisclosure className="mt-3">Amazon-affiliatelinks: bij een geschikte aankoop kan Go2Thailand commissie ontvangen zonder extra kosten voor jou. OneLink kan je naar een lokale Amazon-winkel sturen; controleer product, verkoper, prijs en beschikbaarheid.</AffiliateDisclosure>
          </div>
        </section>

        <FaqSplitSection id="vragen" eyebrow="Praktische bezoekvragen" title="Veelgestelde vragen over Lumpini Hawker Centre" description="De antwoorden gebruiken de gepubliceerde werking van 2026 en maken zichtbaar welke details venuebreed zijn en welke per kraam of bezoekdag moeten worden gecontroleerd." items={faqs} />

        <RelatedGuidesSection
          eyebrow="Verder eten in Bangkok"
          title="Van één venue naar de juiste volgende route"
          guides={[
            { title: 'Bangkok streetfood', description: 'Leer bestellen, kiezen en allergenen bespreken buiten één hawker centre.', href: '/thailand-street-food/', image: '/images/blog/thai-street-food-guide-2026.webp' },
            { title: 'BTS & MRT', description: 'Plan de laatste wandeling vanaf station en je terugrit na het park.', href: '/blog/bangkok-public-transport-bts-mrt-tourist-guide-2026/', image: '/images/blog/bangkok-public-transport-bts-mrt-tourist-guide-2026.webp' },
            { title: 'Nachtmarkten vergelijken', description: 'Kies een avondmarkt wanneer eten, winkelen en sfeer samen belangrijker zijn.', href: '/blog/best-night-markets-bangkok-2026/', image: '/images/blog/best-night-markets-bangkok-2026.webp' },
          ]}
        />

        <SourceMethodSection
          title="Een nieuwe venue vraagt gedateerde bronnen"
          description="Operationele feiten zijn opnieuw gecontroleerd aan officiële BMA-voedselveiligheids- en parkbronnen. Roterende kramen, prijzen, betaalwijzen en aanbod zijn als dagchecks geformuleerd, niet als permanente garanties. Laatst gecontroleerd: 1 augustus 2026."
          sources={sources}
        />
      </div>
    </>
  );
}
