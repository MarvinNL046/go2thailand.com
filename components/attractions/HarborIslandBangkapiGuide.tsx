import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  Backpack,
  BadgeCheck,
  CircleHelp,
  Clock3,
  Droplets,
  ExternalLink,
  Eye,
  MapPin,
  Route,
  Ruler,
  ShieldCheck,
  Sparkles,
  Store,
  Sun,
  Ticket,
  TrainFront,
  Umbrella,
  Users,
  Waves,
} from 'lucide-react';
import { KLOOK_GENERIC, withPlacementSubId } from '../../lib/affiliates';
import { useSubId } from '../../lib/useSubId';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav, type PageSectionNavItem } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';

const PAGE_URL = 'https://go2-thailand.com/nl/blog/harbor-island-bangkok-rooftop-waterpark-2026/';
const PAGE_TITLE = 'Harbor Island Bangkapi: route, tickets en gezinsgids';
const PAGE_DESCRIPTION = 'Plan Harbor Island op The Mall Lifestore Bangkapi zonder de verkeerde vestiging te boeken. Met zeven zones, route, kinderen, tijden en paklijst.';
const HERO_IMAGE = '/images/redesign/editorial/harbor-island-bangkok-rooftop-waterpark-2026-hero.webp';

const navItems: PageSectionNavItem[] = [
  { href: '#vestiging', label: 'Juiste vestiging', icon: Store },
  { href: '#zones', label: 'Zeven zones', icon: Waves },
  { href: '#kinderen', label: 'Met kinderen', icon: Users },
  { href: '#route', label: 'Zo kom je er', icon: Route },
  { href: '#tickets', label: 'Tickets & tijden', icon: Ticket },
  { href: '#meenemen', label: 'Wat meenemen', icon: Backpack },
  { href: '#vragen', label: 'Vragen', icon: CircleHelp },
];

interface BranchChoice {
  icon: LucideIcon;
  label: string;
  title: string;
  place: string;
  identity: string;
  chooseWhen: string;
  warning: string;
}

const branchChoices: BranchChoice[] = [
  {
    icon: Waves,
    label: 'Deze pagina',
    title: 'Harbor Island Bangkapi',
    place: 'The Mall Lifestore Bangkapi · verdieping 3',
    identity: 'Rooftopwaterpark van meer dan 10.000 m² met zeven zones, achttien glijbanen in Super Island, een 200 meter lange lazy river en de Sky Rider.',
    chooseWhen: 'Je specifiek het waterpark aan de Yellow Line wilt en een sessie van meerdere uren plant.',
    warning: 'Selecteer in iedere boeking expliciet Bangkapi én Harbor Island.',
  },
  {
    icon: Sparkles,
    label: 'Nieuwe tweede vestiging',
    title: 'Harbor Island Bangkae',
    place: 'The Mall Lifestore Bangkae · verdieping 3',
    identity: 'Apart waterpark dat op 6 maart 2026 opende, met meer dan 11.000 m², negen zones, een wave pool en langere Sky Rider.',
    chooseWhen: 'Bangkae beter bij je hotel of westelijke dagroute past, of je juist de wave pool zoekt.',
    warning: 'Bangkae en Bangkapi hebben andere routes, zones en mogelijk voorwaarden.',
  },
  {
    icon: Store,
    label: 'Ander product',
    title: 'HarborLand indoor',
    place: 'Meerdere Bangkok-vestigingen, ook One Bangkok',
    identity: 'Droge indoor playground met speelstructuren, ballenbakken en actieve zones. Dezelfde groep en vergelijkbare naam, maar geen automatisch waterparkticket.',
    chooseWhen: 'Je een airconditioned droge speelplek zoekt of buitenactiviteiten door het weer onzeker zijn.',
    warning: 'Een Klook-resultaat voor Harbor Land kan indoor zijn; lees branch en productnaam volledig.',
  },
];

const zones = [
  { number: '01', title: 'Super Island', kind: 'Grote wateractie', text: 'De Aqua Tower telt volgens HarborLand achttien glijbanen, van vriendelijker routes tot steile drops. Ride-toegang blijft afhankelijk van de actuele regels.' },
  { number: '02', title: 'Little Island', kind: 'Rustiger spetteren', text: 'Een spraypark voor jongere kinderen en gezinnen die waterpret zonder de grootste glijbanen zoeken.' },
  { number: '03', title: 'Lazy Island', kind: 'Drijven en pauzeren', text: 'Een route van circa 200 meter met watereffecten. Zie dit als ritmewissel, niet als onbewaakte kinderopvang.' },
  { number: '04', title: 'Jungle Island', kind: 'Droge beweging', text: 'Outdoor obstakels en speelwerk buiten het zwembad. Handig wanneer niet iedereen tegelijk wil zwemmen.' },
  { number: '05', title: 'Sky Rider', kind: 'Hoogte en spanning', text: 'Een circa 100 meter lange railervaring op ongeveer 8 meter hoogte. Controleer lengte, gewicht en andere ridevoorwaarden ter plaatse.' },
  { number: '06', title: 'Toys Island', kind: 'Ontdekken in water', text: 'Een ontwikkelingsgerichte waterspeelzone. “Vanaf 2 jaar” voor het park blijft geen garantie voor ieder toestel.' },
  { number: '07', title: 'Art Island', kind: 'Creatieve rust', text: 'Craft- en DIY-activiteiten geven het gezin een droge pauze zonder meteen het hele complex te verlaten.' },
];

const familyChecks = [
  { icon: Users, title: 'Leeftijd is alleen de ingang', text: 'HarborLand noemt het park geschikt vanaf 2 jaar. Dat zegt niet dat ieder kind iedere glijbaan of Sky Rider mag gebruiken.' },
  { icon: Ruler, title: 'Meet vóór de wachtrij', text: 'Vraag bij binnenkomst welke lengte-, gewicht-, begeleidings- en gezondheidsregels vandaag per attractie gelden.' },
  { icon: Eye, title: 'Kies één zichtpunt', text: 'Spreek af wie welk kind volgt en waar je elkaar terugvindt. Zeven zones zijn te groot voor “we zien elkaar vanzelf”.' },
  { icon: ShieldCheck, title: 'Zwemvaardigheid blijft leidend', text: 'Een polsbandje of internationale norm vervangt geen actieve begeleiding, passende drijfhulp of eerlijk oordeel over watervertrouwen.' },
];

const routeSteps = [
  { icon: TrainFront, number: '01', title: 'Neem de MRT Yellow Line', text: 'Reis naar Bang Kapi Station. Vanaf de Blue Line kun je bij Lat Phrao overstappen; vanaf Airport Rail Link is Hua Mak een mogelijke aansluiting.' },
  { icon: MapPin, number: '02', title: 'Kies Exit 3', text: 'The Mall Group wijst Exit 3 aan voor de skywalk. Controleer stationsborden, want uitgangen en tijdelijke looproutes kunnen wijzigen.' },
  { icon: Route, number: '03', title: 'Volg de skywalk naar M', text: 'De overdekte verbinding brengt je naar de M-verdieping van The Mall Lifestore Bangkapi zonder de drukke Lat Phrao Road over te steken.' },
  { icon: Store, number: '04', title: 'Ga naar verdieping 3', text: 'Volg binnen de actuele mallbewegwijzering naar Harbor Island. Controleer bij de balie opnieuw branch, sessie en ridevoorwaarden.' },
];

const ticketChecks = [
  { title: 'Branch', text: 'Staat er Bangkapi, niet Bangkae of een andere HarborLand-vestiging?' },
  { title: 'Product', text: 'Koop je Harbor Island waterpark, HarborLand indoor of een echte combinatie?' },
  { title: 'Persoonstype', text: 'Welke categorie geldt voor kind, spelende ouder, niet-spelende ouder en senior?' },
  { title: 'Sessieduur', text: 'Een officiële 2026-promotie gebruikt zes uur; timeslots en regulier product kunnen wijzigen.' },
  { title: 'Inbegrepen', text: 'Controleer handdoek, locker, doucheruimte, drijfmiddelen en materiaal opnieuw op jouw product.' },
  { title: 'Wijzigen', text: 'Lees datum, re-entry, no-show, annulering, weer en tijdelijke ride-sluitingen vóór betalen.' },
];

const faqs = [
  { question: 'Waar ligt Harbor Island Bangkapi?', answer: 'Harbor Island ligt op verdieping 3 van The Mall Lifestore Bangkapi, 3522 Lat Phrao Road in Bangkok. Reis met de MRT Yellow Line naar Bang Kapi Station, neem volgens The Mall Group Exit 3 en volg de skywalk naar de M-verdieping. Volg daarna de actuele mallbewegwijzering naar verdieping 3.' },
  { question: 'Is Harbor Island hetzelfde als HarborLand?', answer: 'Nee. Harbor Island is het waterparkproduct; HarborLand is de droge indoor playground van dezelfde groep. Beide kunnen bij één complex of in zoekresultaten naast elkaar staan. Controleer daarom altijd productnaam, vestiging en inclusies voordat je een ticket koopt.' },
  { question: 'Moet ik Bangkapi of Bangkae kiezen?', answer: 'Kies op locatie en zones. Bangkapi heeft officieel zeven zones, een lazy river van circa 200 meter en een Sky Rider van circa 100 meter. De nieuwere Bangkae-vestiging opende op 6 maart 2026 met negen zones, een wave pool en meer dan 11.000 m². Het zijn afzonderlijke bestemmingen met andere treinroutes.' },
  { question: 'Wat zijn de openingstijden van Harbor Island Bangkapi?', answer: 'De officiële Engelse en Thaise venuepagina’s gaven op 25 juli 2026 verschillende tijden. De Engelse versie noemde 10:30–20:00 op werkdagen en 10:00–20:00 in het weekend; de Thaise versie 11:00–19:30 en 10:00–19:30 tijdens lange weekenden. Controleer daarom op je bezoekdag de officiële pagina of het venuekanaal.' },
  { question: 'Hoeveel kost Harbor Island Bangkapi?', answer: 'Gebruik geen oude vaste prijstabel. Tickets verschillen naar vestiging, persoonscategorie, spelen of niet spelen, sessie, combo en promotie. De actuele officiële prijspagina was niet betrouwbaar als tekst te verifiëren. Open de officiële branchpagina, controleer de kassa of neem contact op en vergelijk de totale gezinsprijs inclusief mogelijke extra’s.' },
  { question: 'Is Harbor Island Bangkapi het grootste rooftopwaterpark?', answer: 'De officiële Bangkapi-pagina noemt het Thailand’s largest rooftop water park en meer dan 10.000 m². HarborLand opende in 2026 echter Bangkae met meer dan 11.000 m². Gebruik “grootste van Thailand” of “Zuidoost-Azië” daarom niet als doorslaggevende, tijdloze reden; kijk naar vestiging en zones.' },
  { question: 'Is Harbor Island geschikt voor kleine kinderen?', answer: 'HarborLand noemt toegang vanaf 2 jaar en heeft Little Island, Toys Island en rustige of droge zones. Dat garandeert geen toegang tot iedere attractie. Vraag per kind naar lengte, gewicht, begeleiding en zwemvaardigheid en kies een vast volwassen toezichtplan.' },
  { question: 'Is Harbor Island leuk voor volwassenen zonder kinderen?', answer: 'De grote slides en Sky Rider kunnen ook volwassenen aanspreken, maar het concept is duidelijk “Family & The Gang” en meerdere zones zijn op kinderen of creatieve pauzes gericht. Wie uitsluitend extreme rides zoekt, vergelijkt beter eerst het actuele aanbod van grotere water- en attractieparken.' },
  { question: 'Wat neem je mee naar Harbor Island?', answer: 'Neem passende zwemkleding, droge kleding, eigen zonnebescherming, water en een manier om natte kleding apart te vervoeren. Controleer vooraf of handdoek, locker, drijfmiddel of andere gear bij jouw ticket zit. Koop geen waterschoenen voor de glijbanen zonder te weten of ze zijn toegestaan.' },
  { question: 'Wat gebeurt er bij regen of onweer?', answer: 'Harbor Island heeft buitenzones op een mallcomplex. Een regenbui hoeft niet hetzelfde te betekenen als een hele dag sluiting, maar buitenrides kunnen om veiligheids- of operationele redenen wijzigen. Controleer dezelfde dag het venuekanaal; een open winkelcentrum bewijst niet dat iedere attractie actief is.' },
];

const sources = [
  { title: 'Harbor Island The Mall Lifestore Bangkapi', creator: 'HarborLand Group', url: 'https://harborlandgroup.com/harbor-island-the-mall-lifestore-bangkapi/', note: 'Primaire bron voor locatie, zeven zones, oppervlaktelabel, attracties, leeftijdspositionering, standaarden en Engelstalige uren.' },
  { title: 'Harbor Island Bangkapi — Thai', creator: 'HarborLand Group', url: 'https://harborlandgroup.com/harbor-island-the-mall-lifestore-bangkapi-th/', note: 'Thaise officiële versie met afwijkende uren; gebruikt om de zichtbare tijdwaarschuwing te onderbouwen.' },
  { title: 'Open Now Harbor Island Bangkae', creator: 'HarborLand Group', url: 'https://harborlandgroup.com/open-now-harbor-island-the-mall-lifestore-bangkae/', note: 'Primaire bron voor de tweede vestiging: opening 6 maart 2026, meer dan 11.000 m², negen zones en andere attracties.' },
  { title: 'Public transport to The Mall Lifestore Bangkapi', creator: 'The Mall Group', url: 'https://www.facebook.com/themallgroup/posts/818336273672061/', note: 'Officieel mallkanaal voor Bang Kapi Station, Exit 3 en de skywalk naar de M-verdieping.' },
  { title: 'Harbor Island & HarborLand guide', creator: 'The Smart Local', url: 'https://thesmartlocal.com/read/harborland-waterpark-bangkok/', note: 'Secundaire bron voor productverschil, sessievormen, voorzieningen en route; prijzen niet als actuele waarheid overgenomen.' },
  { title: 'Harbor Island record overview', creator: 'ASEAN Records', url: 'https://aseanrecords.world/harbor-island-thailand-the-largest-rooftop-water-park-in-southeast-asia/', note: 'Secundaire recordclaim gecontroleerd tegen de nieuwere officiële Bangkae-opening; niet als tijdloze superlatief gebruikt.' },
];

function createSchemas() {
  return [
    {
      '@context': 'https://schema.org', '@type': 'Article', '@id': `${PAGE_URL}#article`, headline: PAGE_TITLE,
      description: PAGE_DESCRIPTION, image: `https://go2-thailand.com${HERO_IMAGE}`, datePublished: '2026-03-22', dateModified: '2026-07-25',
      inLanguage: 'nl-NL', mainEntityOfPage: PAGE_URL,
      author: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
      publisher: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
    },
    {
      '@context': 'https://schema.org', '@type': 'TouristAttraction', name: 'Harbor Island The Mall Lifestore Bangkapi', url: PAGE_URL,
      description: PAGE_DESCRIPTION, image: `https://go2-thailand.com${HERO_IMAGE}`,
      address: { '@type': 'PostalAddress', streetAddress: 'The Mall Lifestore Bangkapi, 3522 Lat Phrao Road, verdieping 3', addressLocality: 'Bangkok', postalCode: '10240', addressCountry: 'TH' },
      touristType: ['Gezinnen', 'Waterparkliefhebbers', 'Reizigers met kinderen'],
    },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/nl/' },
        { '@type': 'ListItem', position: 2, name: 'Bangkok', item: 'https://go2-thailand.com/nl/city/bangkok/' },
        { '@type': 'ListItem', position: 3, name: 'Harbor Island Bangkapi', item: PAGE_URL },
      ],
    },
    {
      '@context': 'https://schema.org', '@type': 'HowTo', name: 'Zo reis je met de Yellow Line naar Harbor Island Bangkapi',
      step: routeSteps.map((step, index) => ({ '@type': 'HowToStep', position: index + 1, name: step.title, text: step.text })),
    },
    {
      '@context': 'https://schema.org', '@type': 'ItemList', name: 'De zeven zones van Harbor Island Bangkapi',
      itemListElement: zones.map((zone, index) => ({ '@type': 'ListItem', position: index + 1, name: zone.title, description: zone.text })),
    },
  ];
}

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="font-extrabold text-jade underline decoration-saffron/45 underline-offset-4 transition hover:text-saffron-dark">{children}</Link>;
}

export function HarborIslandBangkapiGuide() {
  const subId = useSubId();
  const alternativeTicketsHref = withPlacementSubId(KLOOK_GENERIC, subId, 'harbor-island-bangkapi-waterpark-alternatives');
  const schemas = createSchemas();

  return (
    <>
      <SEOHead title={PAGE_TITLE} description={PAGE_DESCRIPTION} ogImage={`https://go2-thailand.com${HERO_IMAGE}`}>
        <meta name="keywords" content="harbor island water park bangkok, harbor island bangkapi, harbor island bangkok tickets, waterpark bangkok kinderen, the mall lifestore bangkapi" />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content="2026-03-22" />
        <meta property="article:modified_time" content="2026-07-25" />
        {schemas.map((schema, index) => <script key={`${schema['@type']}-${index}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      </SEOHead>

      <div className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          eyebrow="Rooftopwaterpark aan de Yellow Line"
          title={<>Harbor Island<br />Bangkapi.</>}
          subtitle="Kies eerst de juiste vestiging."
          description="Bangkapi, Bangkae en HarborLand indoor lijken in zoekresultaten op elkaar, maar zijn niet hetzelfde bezoek. Deze gids maakt eerst de branch duidelijk en plant daarna pas zones, route, ticket en gezinsdag."
          image={HERO_IMAGE}
          imageAlt="Redactioneel sfeerbeeld van een venue-neutraal rooftopwaterpark boven Bangkok met een gezin rechts in beeld"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Bangkok', href: '/city/bangkok/' }, { label: 'Harbor Island Bangkapi' }]}
          actions={[
            { label: 'Controleer je vestiging', href: '#vestiging', kind: 'primary' },
            { label: 'Plan de Yellow Line', href: '#route', kind: 'secondary' },
          ]}
          minHeightClassName="min-h-[880px] lg:min-h-[735px]"
          contentClassName="max-w-[720px]"
          titleClassName="max-w-[730px] text-[3.8rem] leading-[0.84] sm:text-[5rem] lg:text-[5.6rem]"
          subtitleClassName="max-w-[630px] text-[1.65rem] leading-[1] text-saffron-dark sm:text-[2.25rem]"
          imageClassName="object-cover object-[70%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.02)_0%,rgba(252,250,246,0.76)_50%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.98)_0%,rgba(252,250,246,0.88)_39%,rgba(7,39,34,0.1)_63%,rgba(5,27,24,0.05)_100%)]"
          sideCard={(
            <aside className="absolute bottom-8 right-[max(2rem,calc((100vw-1240px)/2))] z-10 hidden w-[350px] overflow-hidden rounded-2xl border border-white/55 bg-white/[0.92] shadow-editorial-lift backdrop-blur-xl xl:block">
              <div className="flex items-center justify-between border-b border-jade/10 px-5 py-4"><p className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-saffron-dark">Branch passport · juli 2026</p><Waves size={19} className="text-jade" /></div>
              <dl className="grid grid-cols-[100px_1fr] gap-x-4 gap-y-3 p-5 text-[11px]">
                <dt className="text-charcoal/46">Product</dt><dd className="font-extrabold text-jade">Harbor Island waterpark</dd>
                <dt className="text-charcoal/46">Vestiging</dt><dd className="font-extrabold text-jade">The Mall Bangkapi · 3F</dd>
                <dt className="text-charcoal/46">Indeling</dt><dd className="font-extrabold text-jade">7 zones · water + droog</dd>
                <dt className="text-charcoal/46">Productvorm</dt><dd className="font-extrabold text-saffron-dark">Controleer 6-uurslot</dd>
              </dl>
              <p className="border-t border-jade/10 px-5 py-4 text-[10px] font-medium leading-4 text-charcoal/62">Niet verwarren met Harbor Island Bangkae of een HarborLand indoor-ticket.</p>
            </aside>
          )}
        />

        <PageSectionNav items={navItems} />

        <section id="vestiging" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-end">
              <SectionHeading eyebrow="De naam is de eerste valkuil" title={<>Drie producten.<br />Drie andere dagen.</>} description={<>De officiële groep gebruikt Harbor Island voor waterparken en HarborLand voor droge indoor playgrounds. In 2026 kwam daar een tweede Harbor Island in Bangkae bij. Lees daarom nooit alleen “Harbor” en “Bangkok”.</>} />
              <div className="max-w-3xl space-y-4 text-sm font-medium leading-7 text-charcoal/66">
                <p>Deze owner gaat uitsluitend over Harbor Island op The Mall Lifestore <strong className="text-jade">Bangkapi</strong>. Dat is de vestiging aan de MRT Yellow Line met zeven zones. De nieuwere vestiging in Bangkae ligt aan de andere kant van Bangkok en heeft een andere zone-indeling.</p>
                <p>Ook belangrijk: een Klook-listing voor “Harbor Land Family Entertainment Center” beschrijft een indoor speelpark met sokken, ballenbakken en speelstructuren. Dat is niet automatisch toegang tot het Bangkapi-waterpark.</p>
              </div>
            </div>

            <div className="mt-11 grid gap-5 lg:grid-cols-3">
              {branchChoices.map(({ icon: Icon, label, title, place, identity, chooseWhen, warning }, index) => (
                <article key={title} className={`flex min-h-[470px] flex-col overflow-hidden rounded-[26px] border shadow-editorial-card ${index === 0 ? 'border-saffron/38 bg-[#fff3df]' : 'border-jade/10 bg-white'}`}>
                  <div className="bg-jade p-6 text-white"><div className="flex items-center justify-between"><span className="grid h-12 w-12 place-items-center rounded-xl border border-white/15 bg-white/[0.07]"><Icon size={22} className="text-saffron-light" /></span><span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-light">{label}</span></div><h3 className="mt-7 font-display text-[2.2rem] font-semibold leading-[0.92]">{title}</h3><p className="mt-3 text-[10px] font-bold leading-5 text-white/58">{place}</p></div>
                  <div className="flex flex-1 flex-col p-6"><p className="text-xs font-medium leading-6 text-charcoal/64">{identity}</p><p className="mt-5 border-l-2 border-saffron/55 pl-4 text-xs font-semibold leading-6 text-jade">{chooseWhen}</p><p className="mt-auto flex gap-2 pt-6 text-[10px] font-bold leading-5 text-charcoal/58"><ShieldCheck size={15} className="mt-0.5 shrink-0 text-saffron" />{warning}</p></div>
                </article>
              ))}
            </div>

            <aside className="mt-8 border-y border-jade/10 py-7 lg:flex lg:items-start lg:justify-between lg:gap-12">
              <div className="flex items-center gap-3 text-jade"><BadgeCheck size={21} /><p className="font-display text-2xl font-semibold">De superlatief is niet je routeplan</p></div>
              <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-charcoal/64 lg:mt-0">De Bangkapi-pagina noemt zichzelf nog Thailand’s grootste rooftopwaterpark en oude artikelen spreken zelfs over Zuidoost-Azië. Sinds 6 maart 2026 heeft dezelfde groep in Bangkae echter een tweede vestiging van meer dan 11.000 m². Kies dus op reistijd en zones, niet op een mogelijk verouderd record.</p>
            </aside>
          </div>
        </section>

        <section id="zones" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[1.03fr_0.97fr] lg:items-center">
              <div className="relative min-h-[560px] overflow-hidden rounded-[30px] shadow-editorial-lift lg:min-h-[700px]">
                <Image src="/images/redesign/harbor-island-family-zones.webp" alt="Redactioneel sfeerbeeld van een gezin in een venue-neutrale splashzone met een droge creatieve pauze ernaast" fill sizes="(max-width: 1024px) 100vw, 52vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-jade/78 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5"><p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-light">Sfeerbeeld · geen exacte venuefoto</p><p className="mt-2 max-w-[520px] font-display text-2xl font-semibold leading-none text-white">De beste zone is degene die bij dit moment van het gezin past.</p></div>
              </div>

              <div>
                <SectionHeading eyebrow="Zeven zones, niet zeven verplichtingen" title={<>Bouw je route<br />op energieniveau</>} description="Begin niet bij de steilste glijbaan. Kies een anker voor actie, een rustiger watermoment en één droge pauze. Zo blijft een sessie van meerdere uren beheersbaar." />
                <div className="relative mt-8 space-y-3">
                  <div aria-hidden="true" className="absolute bottom-7 left-[18px] top-7 border-l-2 border-dashed border-saffron/50" />
                  {zones.map((zone) => (
                    <article key={zone.number} className="relative grid grid-cols-[38px_1fr] gap-4">
                      <span className="relative z-10 grid h-9 w-9 place-items-center rounded-full border border-saffron/45 bg-canvas text-[10px] font-extrabold text-saffron-dark">{zone.number}</span>
                      <div className="rounded-2xl border border-jade/10 bg-white p-4 shadow-editorial-card"><div className="flex flex-wrap items-start justify-between gap-2"><h3 className="font-display text-[1.35rem] font-semibold leading-none text-jade">{zone.title}</h3><span className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-saffron-dark">{zone.kind}</span></div><p className="mt-2 text-[11px] font-medium leading-5 text-charcoal/62">{zone.text}</p></div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="kinderen" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.58fr_1.42fr]">
              <SectionHeading eyebrow="Vanaf 2 jaar is geen all-access" title={<>Vier checks vóór<br />de eerste wachtrij</>} description="De officiële leeftijdspositionering vertelt wie het park als geheel kan bezoeken. De concrete attractie beslist nog steeds op ridevoorwaarden, zwemvaardigheid en begeleiding." />
              <div className="grid gap-4 sm:grid-cols-2">
                {familyChecks.map(({ icon: Icon, title, text }, index) => <article key={title} className={`min-h-[250px] rounded-2xl border p-6 shadow-editorial-card ${index === 0 ? 'border-saffron/34 bg-[#fff3df]' : 'border-jade/10 bg-white'}`}><div className="flex items-center justify-between"><Icon size={24} className="text-jade" /><span className="text-[9px] font-extrabold text-saffron-dark">CHECK 0{index + 1}</span></div><h3 className="mt-6 font-display text-[1.65rem] font-semibold leading-none text-jade">{title}</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">{text}</p></article>)}
              </div>
            </div>

            <div className="mt-10 grid gap-5 overflow-hidden rounded-[28px] bg-jade p-7 text-white shadow-editorial-lift lg:grid-cols-[0.65fr_1.35fr] lg:p-10">
              <div><p className="eyebrow !text-saffron-light">Gezinsafspraak in 30 seconden</p><h2 className="font-display text-[2.75rem] font-semibold leading-[0.9]">Wie kijkt? Waar wachten we? Wanneer pauzeren we?</h2></div>
              <div className="grid gap-4 sm:grid-cols-3">{[['Wie', 'Wijs per kind één actieve volwassene aan; “iedereen let op” is geen duidelijke taak.'], ['Waar', 'Kies één herkenbaar droog terugkeerpunt voordat het gezin uit elkaar gaat.'], ['Wanneer', 'Plan een vaste water-, toilet- en zonnepauze vóór vermoeidheid zichtbaar wordt.']].map(([title, text]) => <div key={title} className="rounded-2xl border border-white/14 bg-white/[0.06] p-5"><h3 className="font-display text-[1.55rem] font-semibold text-saffron-light">{title}</h3><p className="mt-3 text-[11px] font-medium leading-5 text-white/60">{text}</p></div>)}</div>
            </div>
          </div>
        </section>

        <section id="route" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-end">
              <SectionHeading eyebrow="Geen taxi nodig om het simpel te houden" title={<>Yellow Line.<br />Exit 3. Verdieping 3.</>} description={<>Gebruik onze bredere <InlineLink href="/blog/bangkok-public-transport-bts-mrt-tourist-guide-2026/">Bangkok OV-gids</InlineLink> voor je overstap. De lokale route begint pas bij Bang Kapi Station.</>} />
              <p className="max-w-3xl text-sm font-medium leading-7 text-charcoal/66">“Direct verbonden” klinkt alsof het waterpark naast het perron ligt. In werkelijkheid volg je Exit 3, de skywalk naar de M-verdieping en daarna de interne mallroute naar verdieping 3. Reken met kinderen op toilet-, lift- en balietijd, niet alleen op de treinrit.</p>
            </div>
            <div className="relative mt-12 grid gap-5 lg:grid-cols-4">
              <div aria-hidden="true" className="absolute left-[8%] right-[8%] top-7 hidden border-t-2 border-dashed border-saffron/45 lg:block" />
              {routeSteps.map(({ icon: Icon, number, title, text }) => <article key={number} className="relative rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="relative z-10 grid h-14 w-14 place-items-center rounded-full border border-saffron/40 bg-canvas text-jade"><Icon size={22} /></span><p className="mt-6 text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">Stap {number}</p><h3 className="mt-2 font-display text-[1.65rem] font-semibold leading-none text-jade">{title}</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/63">{text}</p></article>)}
            </div>
          </div>
        </section>

        <section aria-label="Weerplan Harbor Island" className="section-divider-bottom py-12 lg:py-16">
          <div className="container-custom">
            <div className="relative min-h-[480px] overflow-hidden rounded-[30px] bg-jade shadow-editorial-lift sm:min-h-[410px]">
              <Image src="/images/redesign/harbor-island-weather-route.webp" alt="Redactioneel sfeerbeeld van een venue-neutraal rooftopwaterpark tussen een tropische bui en opklarende zon" fill sizes="100vw" className="object-cover object-center" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,31,27,0.99)_0%,rgba(5,31,27,0.91)_40%,rgba(5,31,27,0.16)_72%,rgba(5,31,27,0.03)_100%)]" />
              <div className="relative z-10 flex min-h-[480px] max-w-[680px] flex-col justify-center p-7 text-white sm:min-h-[410px] sm:p-12">
                <p className="eyebrow !text-saffron-light">Plan A / Plan B</p>
                <h2 className="font-display text-[3.2rem] font-semibold leading-[0.87] tracking-[-0.04em]">Een open mall is nog geen open glijbaan.</h2>
                <p className="mt-5 max-w-[590px] text-sm font-medium leading-7 text-white/68">Bij zon bouw je buitenactie rond vaste schaduw- en zonnepauzes. Bij een tropische bui gebruik je de droge zones of het winkelcentrum als buffer. Bij onweer of gewijzigde operatie laat je de venue beslissen; controleer dezelfde dag voordat je aan de andere kant van Bangkok vertrekt.</p>
                <div className="mt-7 flex flex-wrap gap-3"><Link href="/city/bangkok/weather/" className="btn-cream">Bekijk het weer in Bangkok <ArrowRight size={15} className="text-saffron" /></Link><Link href="/city/bangkok/attractions/" className="inline-flex min-h-12 items-center gap-2 px-4 text-xs font-extrabold text-white">Vergelijk indoor alternatieven <ArrowRight size={14} className="text-saffron-light" /></Link></div>
              </div>
            </div>
          </div>
        </section>

        <section id="tickets" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.58fr_1.42fr]">
              <SectionHeading eyebrow="Prijs volgt pas na product" title={<>Zes regels op<br />ieder ticketscherm</>} description="Vaste prijzen uit oude artikelen verouderen snel. Vergelijk de totale gezinsprijs pas nadat branch, product en persoonscategorie kloppen." />
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {ticketChecks.map((item, index) => <article key={item.title} className="min-h-[210px] rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><div className="flex items-center justify-between"><Ticket size={21} className="text-jade" /><span className="text-[9px] font-extrabold text-saffron-dark">0{index + 1}</span></div><h3 className="mt-5 font-display text-[1.55rem] font-semibold text-jade">{item.title}</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/63">{item.text}</p></article>)}
              </div>
            </div>

            <div className="mt-10 grid gap-5 overflow-hidden rounded-[28px] border border-saffron/28 bg-[#fff3df] p-7 shadow-editorial-card lg:grid-cols-[0.72fr_1.28fr] lg:p-10">
              <div><p className="eyebrow">Tijdenconflict · 25 juli 2026</p><h2 className="font-display text-[2.8rem] font-semibold leading-[0.9] text-jade">De officiële taalversies zijn het niet eens.</h2></div>
              <div><div className="grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-jade/10 bg-white p-5"><Clock3 size={20} className="text-jade" /><p className="mt-4 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">Engelse pagina</p><p className="mt-2 text-sm font-extrabold text-jade">Weekdag 10:30–20:00<br />Weekend 10:00–20:00</p></div><div className="rounded-2xl border border-jade/10 bg-white p-5"><Clock3 size={20} className="text-jade" /><p className="mt-4 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">Thaise pagina</p><p className="mt-2 text-sm font-extrabold text-jade">Dagelijks 11:00–19:30<br />Lang weekend 10:00–19:30</p></div></div><p className="mt-4 text-xs font-medium leading-6 text-charcoal/63">Behandel beide als momentopname. Controleer de officiële branchpagina, social update of balie op je bezoekdag en vraag naar laatste toegang en huidige sessiestart.</p></div>
            </div>

            <aside className="mt-8 grid gap-6 rounded-[26px] bg-jade p-7 text-white shadow-editorial-lift lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:p-9">
              <div><p className="eyebrow !text-saffron-light">Alternatieven via Klook</p><h2 className="font-display text-[2.65rem] font-semibold leading-[0.9]">Vergelijk alleen wanneer de productnaam volledig klopt.</h2></div>
              <div><p className="text-sm font-medium leading-7 text-white/64">De affiliateknop opent een algemene Klook-bestemming. Zoek zelf op Bangkok waterpark en controleer of je Harbor Island, HarborLand indoor, Pororo of Siam Amazing Park bekijkt. Wij bevestigen geen Harbor Island-deeplink via deze knop.</p><a href={alternativeTicketsHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-cream mt-6 w-fit">Bekijk actuele Bangkok-waterparken <ExternalLink size={14} className="text-saffron" /></a><AffiliateDisclosure className="mt-4 !text-white/54">Klook is een affiliatelink. Go2Thailand kan commissie ontvangen zonder dat jouw prijs stijgt. Productnaam, vestiging, datum, toegang en voorwaarden controleer je zelf.</AffiliateDisclosure></div>
            </aside>
          </div>
        </section>

        <section id="meenemen" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <div>
                <SectionHeading eyebrow="Eén tas, twee zones" title={<>Wat neem je mee<br />voor water én mall?</>} description="Verpak nat en droog apart. Controleer voor vertrek wat de actuele ticketsoort werkelijk verstrekt; een ouder artikel is geen garantie voor een handdoek of locker." />
                <div className="mt-8 divide-y divide-jade/10 border-y border-jade/10">
                  {[
                    ['Passende zwemkleding', 'Vermijd harde metalen delen en vraag bij twijfel naar de actuele glijbaanregels.'],
                    ['Droge set + eenvoudige schoenen', 'Houd mallkleding apart van natte zwemspullen; draag schoeisel alleen waar de venue het toestaat.'],
                    ['Zonnebescherming', 'Meerdere zones liggen buiten. Smeer volgens productinstructies en plan schaduw- en herhaalmomenten.'],
                    ['Water + gezinsherkenning', 'Spreek een terugkeerpunt af en zet een noodcontact bij jongere kinderen die van het zichtpunt kunnen afdwalen.'],
                    ['Telefoon buiten de rides', 'Gebruik alleen toegestane bescherming en leg de telefoon weg wanneer vasthouden toezicht of rideveiligheid vermindert.'],
                  ].map(([title, text]) => <div key={title} className="grid gap-2 py-5 sm:grid-cols-[190px_1fr]"><p className="text-sm font-extrabold text-jade">{title}</p><p className="text-xs font-medium leading-6 text-charcoal/62">{text}</p></div>)}
                </div>
              </div>

              <aside className="overflow-hidden rounded-[28px] bg-[#082f29] p-7 text-white shadow-editorial-lift sm:p-9">
                <div className="flex items-start justify-between gap-5"><div><p className="eyebrow !text-saffron-light">Functionele waterpark-kit</p><h2 className="font-display text-[2.75rem] font-semibold leading-[0.9]">Twee producten die de dagtaak ondersteunen.</h2></div><Backpack size={28} className="shrink-0 text-saffron-light" /></div>
                <p className="mt-5 text-sm font-medium leading-7 text-white/62">Geen waterschoenen of speelgoed zonder venuecheck. Deze bestaande Amazon-routes zijn alleen bedoeld voor zon en het scheiden van natte spullen.</p>
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <a href="/go/neutrogena-beach-defense-spf70/" target="_blank" rel="noopener noreferrer nofollow sponsored" className="group flex min-h-[230px] flex-col rounded-2xl border border-white/14 bg-white/[0.07] p-5 transition hover:border-saffron/45 hover:bg-white/[0.1]"><Sun size={23} className="text-saffron-light" /><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-white/45">Voor buitenzones</p><h3 className="mt-2 font-display text-[1.55rem] font-semibold">Waterbestendige SPF</h3><p className="mt-3 text-[11px] font-medium leading-5 text-white/58">Controleer huidgeschiktheid, ingrediënten, gebruik en verkoper; “waterbestendig” betekent niet één keer smeren.</p><span className="mt-auto inline-flex items-center justify-between border-t border-white/10 pt-4 text-[10px] font-extrabold">Bekijk actueel aanbod <ExternalLink size={13} className="text-saffron-light" /></span></a>
                  <a href="/go/earth-pak-dry-bag/" target="_blank" rel="noopener noreferrer nofollow sponsored" className="group flex min-h-[230px] flex-col rounded-2xl border border-white/14 bg-white/[0.07] p-5 transition hover:border-saffron/45 hover:bg-white/[0.1]"><Droplets size={23} className="text-saffron-light" /><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-white/45">Voor de rit terug</p><h3 className="mt-2 font-display text-[1.55rem] font-semibold">Drybag voor natte kleding</h3><p className="mt-3 text-[11px] font-medium leading-5 text-white/58">Gebruik hem als scheiding in je dagtas; neem hem niet automatisch mee op een ride en volg opslagregels.</p><span className="mt-auto inline-flex items-center justify-between border-t border-white/10 pt-4 text-[10px] font-extrabold">Bekijk actueel aanbod <ExternalLink size={13} className="text-saffron-light" /></span></a>
                </div>
                <AffiliateDisclosure className="mt-4 !text-white/54">Amazon-affiliatelinks lopen via onze centrale <strong className="text-white/72">/go/</strong>-router. Als Amazon-partner verdienen wij aan in aanmerking komende aankopen, zonder extra kosten voor jou. OneLink kan doorsturen naar een lokale winkel; product, prijs, verkoper en beschikbaarheid verschillen per land.</AffiliateDisclosure>
              </aside>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                { icon: Umbrella, title: 'Bui', text: 'Zoek de aangewezen droge zone of mallroute en wacht op operationele instructies; ren niet over een nat dek.' },
                { icon: ShieldCheck, title: 'Ridegrens', text: 'Accepteer iedere lengte-, gewicht-, gezondheids- of begeleidingsgrens ook als een kind de wachtrij al heeft gedaan.' },
                { icon: Droplets, title: 'Na afloop', text: 'Droog, wissel kleding en eet of drink vóór de treinrit. Een lang waterparkblok vraagt meer overgangstijd dan een gewone mallstop.' },
              ].map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><Icon size={22} className="text-jade" /><h3 className="mt-5 font-display text-[1.55rem] font-semibold text-jade">{title}</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/63">{text}</p></article>)}
            </div>
          </div>
        </section>

        <FaqSplitSection id="vragen" eyebrow="Echte vragen uit de zoekresultaten" title="Veelgestelde vragen over Harbor Island" description="Merknaam, vestiging, product, tijden en voorwaarden kunnen veranderen. De antwoorden maken de keuze controleerbaar, maar vervangen geen actuele venuecheck." items={faqs} />

        <RelatedGuidesSection
          eyebrow="Plan de rest van je gezinsdag"
          title="Bangkok vóór en na het waterpark"
          guides={[
            { title: 'Bangkok met kinderen', description: 'Bouw tempo, hitte, eten en rustdagen rond activiteiten voor verschillende leeftijden.', href: '/travel-guides/thailand-with-kids/', image: '/images/blog/thailand-with-kids-family-travel-guide.webp' },
            { title: 'Bangkok OV uitgelegd', description: 'Kies de juiste overstap naar de Yellow Line en voorkom dat de route een taxidag wordt.', href: '/blog/bangkok-public-transport-bts-mrt-tourist-guide-2026/', image: '/images/blog/bangkok-public-transport-bts-mrt-tourist-guide-2026.webp' },
            { title: 'Bangkok attracties', description: 'Vergelijk indoor, tempel, markt en gezinsactiviteit wanneer het weer of energieniveau verandert.', href: '/city/bangkok/attractions/', image: '/images/cities/bangkok/redesign/bangkok-attractions-hero.webp' },
          ]}
        />

        <SourceMethodSection
          title="Een branchnaam is hier belangrijker dan een reviewscore"
          description="DFS bepaalde de Nederlandse merk-, ticket-, prijs-, tijd-, kind-, route-, regel- en reviewintentie. Officiële HarborLand-pagina’s dragen de zone-, locatie- en branchfeiten; The Mall Group draagt Exit 3 en de skywalk. Secundaire bronnen zijn alleen gebruikt om productverwarring en sessievormen te toetsen. Oude vaste prijzen, euroconversies, onzekere inclusies, Happy Care en tijdloze grootste-claims zijn verwijderd. Laatst gecontroleerd: 25 juli 2026."
          sources={sources}
        />
      </div>
    </>
  );
}
