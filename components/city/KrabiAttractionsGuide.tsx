import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpenText,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Compass,
  Footprints,
  Landmark,
  MapPin,
  Mountain,
  Ship,
  Sparkles,
  TreePine,
  Waves,
} from 'lucide-react';
import SEOHead from '../SEOHead';
import FeedbackForm from '../FeedbackForm';
import { cityAffiliates, KLOOK_GENERIC, withPlacementSubId } from '../../lib/affiliates';
import { EditorialHero, type EditorialHeroAction } from '../design/EditorialHero';
import { PageSectionNav, type PageSectionNavItem } from '../design/PageSectionNav';

interface KrabiAttractionsGuideProps {
  ogImage: string;
}

const pageTitle = 'Krabi bezienswaardigheden: 8x zien & doen';
const pageDescription = 'Ontdek de mooiste bezienswaardigheden van Krabi, van Railay en de eilanden tot Tiger Cave Temple en Emerald Pool. Inclusief routes en praktische tips.';
const pageUrl = 'https://go2-thailand.com/nl/city/krabi/attractions/';
const heroImage = '/images/redesign/krabi-destination-hero.webp';
const klookHref = withPlacementSubId(cityAffiliates.krabi?.klook || KLOOK_GENERIC, 'krabi-attractions');
const attractionsSectionNavItems: PageSectionNavItem[] = [
  { href: '#kort', label: 'Kort antwoord', icon: Sparkles },
  { href: '#mooiste-plekken', label: 'Mooiste plekken', icon: Compass },
  { href: '#kiezen', label: 'Kiezen', icon: Waves },
  { href: '#route', label: 'Route', icon: MapPin },
  { href: '#vragen', label: 'Vragen', icon: BookOpenText },
];
const attractionsHeroActions: EditorialHeroAction[] = [
  { label: 'Bekijk de plekken', href: '#mooiste-plekken', kind: 'primary' },
  { label: 'Vind een uitje', href: klookHref, kind: 'secondary', newTab: true, affiliate: true },
];
const attractionsHeroBreadcrumbs = [
  { label: 'Thailand', href: '/' },
  { label: 'Krabi', href: '/city/krabi/' },
  { label: 'Bezienswaardigheden' },
];

const highlights = [
  {
    rank: '01',
    slug: 'railay-beach',
    title: 'Railay Beach en Phra Nang',
    type: 'Kust',
    duration: 'Halve tot hele dag',
    image: '/images/cities/krabi/attractions/railayBeach.webp',
    description: 'Railay laat precies zien waarom Krabi zo herkenbaar is: hoge kalksteenkliffen, stranden en longtailboten. Geef het schiereiland genoeg tijd om ook Phra Nang en de wandelpaden te zien.',
    bestFor: 'Je eerste dag in Krabi',
    tradeoff: 'Midden op de dag kan het druk zijn en je bent afhankelijk van de bootverbinding.',
  },
  {
    rank: '02',
    slug: 'four-islands-tour',
    title: 'Four Islands-route',
    type: 'Eilanden',
    duration: 'Hele dag',
    image: '/images/cities/krabi/attractions/Aerial view of Nui beach in koh Phi Phi Don island, in Krabi, Thailand, sunset light..webp',
    description: 'Een klassieke bootdag langs onder meer Poda, Chicken Island en de zandbank bij Thale Waek. Dit is de logischste eerste eilandroute als je meerdere kustlandschappen wilt combineren.',
    bestFor: 'Een klassieke eilanddag',
    tradeoff: 'De route is populair. Kies deze of een andere grote eilandtour, niet meerdere vergelijkbare dagen achter elkaar.',
  },
  {
    rank: '03',
    slug: 'tiger-cave-temple',
    title: 'Tiger Cave Temple',
    type: 'Tempel',
    duration: 'Halve dag',
    image: '/images/cities/krabi/attractions/tiger cave temple.webp',
    description: 'Wat Tham Suea is een actief tempelcomplex bij Krabi Town. De klim van meer dan 1.200 treden naar het uitzichtpunt is zwaar, maar geeft een heel ander beeld van de provincie dan de kust.',
    bestFor: 'Uitzicht en cultuur',
    tradeoff: 'Niet geschikt als je slecht ter been bent of moeite hebt met hitte en steile trappen.',
  },
  {
    rank: '04',
    slug: 'emerald-pool',
    title: 'Emerald Pool',
    type: 'Natuur',
    duration: 'Onderdeel van een dagtrip',
    image: '/images/cities/krabi/attractions/emerald pool.webp',
    description: 'Sa Morakot ligt in het groene binnenland bij Khlong Thom. De boswandeling en helder gekleurde natuurlijke poel vormen een goed tegenwicht voor strand- en bootdagen.',
    bestFor: 'Een dag op het vasteland',
    tradeoff: 'De reistijd maakt een los, kort bezoek onhandig. Combineer deze plek met de warmwaterbronnen.',
  },
  {
    rank: '05',
    slug: 'hot-springs-waterfall',
    title: 'Warmwaterbronwaterval',
    type: 'Natuur',
    duration: 'Samen met Emerald Pool',
    image: '/images/cities/krabi/attractions/Hot Springs Waterfall in Krabi .webp',
    description: 'Bij Khlong Thom stroomt warm bronwater over natuurlijke rotsbassins. De plek werkt vooral goed als tweede stop tijdens dezelfde binnenlandroute als Emerald Pool.',
    bestFor: 'Ontspanning na de boswandeling',
    tradeoff: 'Maak hier geen aparte reisdag van als je maar drie of vier dagen in Krabi hebt.',
  },
  {
    rank: '06',
    slug: 'phi-phi-islands-krabi',
    title: 'Phi Phi-eilanden',
    type: 'Eilanden',
    duration: 'Hele dag',
    image: '/images/cities/krabi/attractions/Aerial view sunset Phi Phi island in Andaman Sea from drone in Province of Krabi, travel landmark of Thailand..webp',
    description: 'Phi Phi combineert hoge kliffen, baaien en snorkelstops tijdens een langere dag op zee. Kies deze route als de bekende eilanden voor jou belangrijker zijn dan een rustig tempo.',
    bestFor: 'Iconische eilandlandschappen',
    tradeoff: 'Reken op een drukkere en langere bootdag. De omstandigheden op zee bepalen hoeveel comfort je hebt.',
  },
  {
    rank: '07',
    slug: 'krabi-town-night-market',
    title: 'Krabi Walking Street',
    type: 'Markt',
    duration: 'Avond',
    image: '/images/extra images/Young man tourist on Walking street Asian food market.webp',
    description: 'Een avond in Krabi Town voegt lokaal eten en stadsleven toe aan een reis die anders vooral uit stranden bestaat. Loop eerst een ronde en proef daarna verschillende kleine gerechten.',
    bestFor: 'Eten en lokale sfeer',
    tradeoff: 'Controleer vooraf op welke avonden de markt tijdens jouw verblijf plaatsvindt.',
  },
  {
    rank: '08',
    slug: 'khao-khanap-nam',
    title: 'Khao Khanap Nam',
    type: 'Rivier',
    duration: 'Enkele uren',
    image: '/images/cities/krabi/krabi-mountain-view.webp',
    description: 'De twee kalksteenrotsen bij de monding van de Krabi-rivier zijn een herkenbaar stadslandschap. Een korte longtailtocht combineert goed met Krabi Town of het nabijgelegen Ko Klang.',
    bestFor: 'Een rustige halve dag',
    tradeoff: 'Minder spectaculair dan een eilandtour, maar juist sterker als afwisseling tijdens een langer verblijf.',
  },
];

const activityTypes = [
  {
    icon: Waves,
    title: 'Kust & eilanden',
    description: 'Kies Railay plus één grote eilandroute. Four Islands is klassiek en compact; Phi Phi is een langere, drukkere zeedag.',
    picks: 'Railay · Four Islands · Phi Phi',
  },
  {
    icon: Footprints,
    title: 'Actief buiten',
    description: 'Kajak door de mangroven van Ao Thalane of ga onder begeleiding klimmen bij Railay. Houd rekening met hitte, regen en ervaring.',
    picks: 'Ao Thalane · klimmen bij Railay',
  },
  {
    icon: TreePine,
    title: 'Natuur op het vasteland',
    description: 'Combineer Emerald Pool en de warmwaterbronnen in één route. Zo betaal je de transfertijd maar één keer.',
    picks: 'Emerald Pool · Khlong Thom',
  },
  {
    icon: Landmark,
    title: 'Cultuur & lokaal leven',
    description: 'Koppel Tiger Cave Temple aan Krabi Town, Khao Khanap Nam of Ko Klang voor een dag zonder strandlogistiek.',
    picks: 'Tiger Cave · Krabi Town · Ko Klang',
  },
];

const routeDays = [
  {
    day: 'Dag 1',
    title: 'Railay op eigen tempo',
    description: 'Vaar vroeg naar Railay, loop door naar Phra Nang en blijf lang genoeg om de drukste aankomsten niet je hele bezoek te laten bepalen.',
    href: '/city/krabi/attractions/',
  },
  {
    day: 'Dag 2',
    title: 'Kies één eilandroute',
    description: 'Ga voor Four Islands als je een klassieke Krabi-dag wilt, of kies Phi Phi wanneer die eilanden hoog op je wensenlijst staan.',
    href: '#mooiste-plekken',
  },
  {
    day: 'Dag 3',
    title: 'Vasteland of mangroven',
    description: 'Combineer Emerald Pool met de warmwaterbronnen, of kies Tiger Cave Temple en Krabi Town voor minder reistijd.',
    href: '#mooiste-plekken',
  },
];

const practicalTips = [
  {
    icon: Ship,
    title: 'Plan niet elke dag een boot',
    text: 'Four Islands, Hong Islands en Phi Phi overlappen deels in sfeer. Eén sterke eilanddag is voor veel eerste reizen genoeg.',
  },
  {
    icon: CalendarDays,
    title: 'Houd een zeedag flexibel',
    text: 'Wind, regen en zeegang kunnen je route beïnvloeden. Controleer de lokale verwachting en volg aanwijzingen van de aanbieder.',
  },
  {
    icon: MapPin,
    title: 'Kies je basis bewust',
    text: 'Ao Nang is praktisch voor boten en tours. Krabi Town past beter bij markten, de rivier en uitstappen op het vasteland.',
  },
  {
    icon: Mountain,
    title: 'Neem inspanning serieus',
    text: 'Tiger Cave Temple, viewpoints en klimroutes vragen goede schoenen, water en een planning buiten het heetste deel van de dag.',
  },
];

const faqs = [
  {
    question: 'Wat moet je gezien hebben in Krabi?',
    answer: 'Voor een eerste bezoek zijn Railay en Phra Nang, één eilandroute en één plek op het vasteland de beste combinatie. Kies bijvoorbeeld Tiger Cave Temple of Emerald Pool. Voeg Krabi Town toe als je ook marktleven en de rivier wilt zien.',
  },
  {
    question: 'Hoeveel dagen heb je nodig in Krabi?',
    answer: 'Met drie volle dagen kun je Railay, een eilandroute en één dag op het vasteland plannen. Vier of vijf dagen geeft meer ruimte voor rust, veranderlijk weer of een extra activiteit zoals kajakken bij Ao Thalane.',
  },
  {
    question: 'Wat zijn de hotspots in Krabi?',
    answer: 'Railay Beach, Phra Nang, Tiger Cave Temple, de Four Islands-route, Phi Phi, Emerald Pool en de warmwaterbronnen behoren tot de bekendste plekken. Krabi Town, Khao Khanap Nam en Ko Klang zijn rustiger aanvullingen.',
  },
  {
    question: 'Wat is leuker, Krabi of Ao Nang?',
    answer: 'Ao Nang ligt in de provincie Krabi en is vooral een handige uitvalsbasis voor restaurants, hotels en boten. Met Krabi bedoelen reizigers soms de provincie en soms Krabi Town. Kies Ao Nang voor een strandreis en Krabi Town voor markten en lokaal stadsleven.',
  },
  {
    question: 'Wat is leuker, Phuket of Krabi?',
    answer: 'Krabi past beter als je kalksteenlandschappen, boottochten en een rustiger verspreide kust zoekt. Phuket heeft meer stranden, restaurants, uitgaansleven en vervoersmogelijkheden binnen één grote eilandbestemming. De beste keuze hangt af van je gewenste tempo.',
  },
  {
    question: 'Zijn 3 dagen voldoende voor Krabi?',
    answer: 'Ja, drie volle dagen zijn voldoende voor de belangrijkste bezienswaardigheden. Plan Railay, één eilandtour en één dag voor Tiger Cave Temple, Ao Thalane of Khlong Thom. Met een extra dag hoef je minder afhankelijk te zijn van een strak bootschema.',
  },
];

const sources = [
  {
    title: '10 things to do in Krabi',
    creator: 'Tourism Authority of Thailand',
    url: 'https://www.tourismthailand.org/Articles/10-things-to-do-in-krabi',
  },
  {
    title: 'Route langs Railay, Thale Waek en Khao Khanap Nam',
    creator: 'Tourism Authority of Thailand',
    url: 'https://www.tourismthailand.org/Trip-Planner/Suggestion-Detail/ao-railay-railay-bay-tham-phra-nang-beach-phra-nang-cave-beach-thale-waek-separated-sea-ko-po-da-khao-khanap-nam-viewpoint-tha-pom-khlang-cave',
  },
  {
    title: 'Krabi Walking Street',
    creator: 'Tourism Authority of Thailand',
    url: 'https://www.tourismthailand.org/Attraction/krabi-walking-street',
  },
  {
    title: 'Emerald Pool',
    creator: '7Greens / Tourism Authority of Thailand',
    url: 'https://7greens.tourismthailand.org/2018/11/13/emerald-pool/',
  },
];

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Mooiste bezienswaardigheden in Krabi',
  numberOfItems: highlights.length,
  itemListElement: highlights.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.title,
    url: `${pageUrl}${item.slug}/`,
  })),
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/nl/' },
    { '@type': 'ListItem', position: 2, name: 'Krabi', item: 'https://go2-thailand.com/nl/city/krabi/' },
    { '@type': 'ListItem', position: 3, name: 'Bezienswaardigheden', item: pageUrl },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${pageUrl}#webpage`,
  url: pageUrl,
  name: pageTitle,
  description: pageDescription,
  inLanguage: 'nl-NL',
  dateModified: '2026-07-23',
};

export function KrabiAttractionsGuide({ ogImage }: KrabiAttractionsGuideProps) {
  return (
    <>
      <SEOHead title={pageTitle} description={pageDescription} ogImage={ogImage}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      </SEOHead>

      <div className="bg-canvas text-charcoal">
        <EditorialHero
          image={heroImage}
          imageAlt="Kalksteenkliffen en een longtailboot in Krabi"
          breadcrumbs={attractionsHeroBreadcrumbs}
          eyebrow="Van eilanden tot jungle"
          title={<>Krabi <span className="block break-words text-[2.05rem] leading-[0.9] sm:text-[3.45rem] lg:text-[3.9rem]">bezienswaardigheden</span></>}
          titleClassName="max-w-[590px] text-[4.1rem] leading-[0.83] tracking-[-0.048em] sm:text-[5.25rem] lg:text-[6.1rem]"
          subtitle="Acht plekken die samen meer laten zien dan alleen een rij mooie stranden."
          subtitleClassName="max-w-[540px] text-[1.55rem] leading-[1.08] sm:text-[1.85rem]"
          description="Begin met Railay, kies één eilandroute en voeg daarna een tempel, mangrovegebied of dag in het groene binnenland toe. Zo blijft je reis afwisselend en zit je niet iedere dag op een vergelijkbare boottocht."
          descriptionClassName="mt-4 max-w-[550px] text-sm leading-6"
          actions={attractionsHeroActions}
          disclosure="De uitjesknop is een affiliatelink. Bij een boeking ontvangen wij mogelijk een commissie; jij betaalt niets extra."
          minHeightClassName="min-h-[680px] lg:min-h-[620px]"
          contentClassName="max-w-[620px]"
          imageClassName="object-cover object-[64%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.08)_0%,rgba(252,250,246,0.35)_44%,rgba(252,250,246,0.98)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.98)_0%,rgba(252,250,246,0.9)_34%,rgba(252,250,246,0.28)_61%,rgba(18,63,54,0.08)_100%)]"
        />

        <PageSectionNav items={attractionsSectionNavItems} />

        <section id="kort" className="section-divider-bottom py-14 lg:py-18">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.92fr_1.35fr] lg:items-center">
            <div>
              <p className="eyebrow">Eerst de hoofdkeuze</p>
              <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.035em] text-jade sm:text-[3.65rem]">Wat moet je gezien hebben in Krabi?</h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-charcoal/70">
                Voor een eerste reis vormen Railay, één eilandroute en één dag op het vasteland de beste basis. Heb je maar één dag, kies dan Railay. Met drie dagen voeg je een bootdag en Tiger Cave Temple, Ao Thalane of Khlong Thom toe.
              </p>
              <Link href="/city/krabi/" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-jade transition hover:text-saffron-dark">Terug naar de complete Krabi-gids <ArrowRight size={14} /></Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { label: 'Niet missen', value: 'Railay', icon: Mountain },
                { label: 'Beste balans', value: '3 volle dagen', icon: Clock3 },
                { label: 'Handige basis', value: 'Ao Nang', icon: MapPin },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="rounded-xl border border-jade/10 bg-white p-5 shadow-[0_7px_24px_rgba(18,63,54,0.045)]">
                  <Icon size={24} strokeWidth={1.5} className="text-saffron-dark" />
                  <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.14em] text-charcoal/42">{label}</p>
                  <p className="mt-1 font-display text-2xl font-semibold text-jade">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="mooiste-plekken" className="section-divider-bottom py-14 lg:py-20">
          <div className="container-custom">
            <div className="mb-9 max-w-3xl">
              <p className="eyebrow">De redactionele selectie</p>
              <h2 className="heading-redesign">De mooiste bezienswaardigheden van Krabi</h2>
              <p className="mt-5 text-sm leading-7 text-charcoal/68">Niet iedere bekende plek past in dezelfde reis. Daarom staat bij elke keuze ook de praktische keerzijde.</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {highlights.map((item) => (
                <article key={item.slug} className="group overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-[0_8px_28px_rgba(18,63,54,0.045)] transition hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(18,63,54,0.09)]">
                  <Link href="#kiezen" className="grid h-full sm:grid-cols-[42%_58%]">
                    <div className="relative min-h-[235px] overflow-hidden sm:min-h-full">
                      <Image src={item.image} alt={`${item.title} in Krabi`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 42vw, 24vw" className="object-cover transition duration-500 group-hover:scale-[1.035]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-jade-dark/55 via-transparent to-transparent" />
                      <span className="absolute left-4 top-4 grid h-9 min-w-9 place-items-center rounded-lg bg-white/92 px-2 text-xs font-extrabold text-jade shadow-sm backdrop-blur">{item.rank}</span>
                      <span className="absolute bottom-4 left-4 rounded-md bg-jade/88 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.13em] text-white backdrop-blur">{item.type}</span>
                    </div>
                    <div className="flex flex-col p-5 sm:p-6">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-charcoal/45"><Clock3 size={13} className="text-saffron-dark" /> {item.duration}</div>
                      <h3 className="mt-3 font-display text-[1.65rem] font-semibold leading-none tracking-[-0.02em] text-jade">{item.title}</h3>
                      <p className="mt-3 text-xs leading-5 text-charcoal/65">{item.description}</p>
                      <div className="mt-4 space-y-2 border-t border-jade/8 pt-4 text-[10px] leading-4">
                        <p className="flex gap-2 text-jade"><Check size={13} className="mt-0.5 shrink-0 text-saffron-dark" /><span><strong>Past goed bij:</strong> {item.bestFor}</span></p>
                        <p className="flex gap-2 text-charcoal/55"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-jade/30" /><span>{item.tradeoff}</span></p>
                      </div>
                      <span className="mt-auto inline-flex items-center justify-end gap-2 pt-5 text-xs font-bold text-jade transition group-hover:text-saffron-dark">Vergelijk in deze gids <ArrowRight size={14} className="transition group-hover:translate-x-1" /></span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="kiezen" className="section-divider-bottom bg-tonal py-14 lg:py-18">
          <div className="container-custom">
            <div className="mb-8 grid gap-5 lg:grid-cols-[1fr_0.8fr] lg:items-end">
              <div>
                <p className="eyebrow">Kies op reisstijl</p>
                <h2 className="heading-redesign">Welke activiteit past bij jouw reis?</h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-charcoal/65 lg:justify-self-end">Gebruik dit als filter. Je hoeft niet uit iedere categorie iets te kiezen; de beste route heeft meestal één duidelijk kustmoment en één sterk contrast.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {activityTypes.map(({ icon: Icon, title, description, picks }) => (
                <article key={title} className="flex min-h-[270px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-[0_7px_24px_rgba(18,63,54,0.04)]">
                  <Icon size={40} strokeWidth={1.35} className="text-jade" />
                  <h3 className="mt-6 font-display text-[1.65rem] font-semibold leading-none text-jade">{title}</h3>
                  <p className="mt-3 text-xs leading-5 text-charcoal/62">{description}</p>
                  <p className="mt-auto border-t border-jade/8 pt-4 text-[10px] font-bold leading-4 text-saffron-dark">{picks}</p>
                </article>
              ))}
            </div>
            <div className="mt-7 flex flex-col items-start justify-between gap-5 rounded-2xl bg-jade px-6 py-6 text-white shadow-[0_12px_32px_rgba(18,63,54,0.16)] sm:flex-row sm:items-center lg:px-8">
              <div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-saffron-light">Uitjes via Klook</p><p className="mt-2 max-w-2xl font-display text-2xl font-semibold leading-tight">Vergelijk actuele boottochten, kajaktrips en klimervaringen.</p></div>
              <a href={klookHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-bold text-jade transition hover:-translate-y-0.5">Bekijk activiteiten <ArrowRight size={14} className="text-saffron-dark" /></a>
            </div>
            <p className="mt-2 text-[9px] text-charcoal/45">Affiliatelink — wij kunnen commissie ontvangen bij een boeking, zonder extra kosten voor jou.</p>
          </div>
        </section>

        <section className="section-divider-bottom py-14 lg:py-20">
          <div className="container-custom grid overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-[0_10px_34px_rgba(18,63,54,0.06)] lg:grid-cols-[0.88fr_1.12fr]">
            <div className="relative min-h-[420px] overflow-hidden lg:min-h-full">
              <Image src="/images/cities/krabi/attractions/emerald pool.webp" alt="Groene natuur bij Emerald Pool in Krabi" fill sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-jade-dark/88 via-jade/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-white lg:p-9">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-saffron-light">Meer dan een kustroute</p>
                <p className="mt-3 max-w-md font-display text-[2.35rem] font-semibold leading-[0.94]">Laat niet iedere dag op zee eindigen.</p>
                <p className="mt-4 max-w-md text-xs leading-5 text-white/72">Krabi wordt interessanter zodra je eilanden afwisselt met jungle, tempels, de rivier en een avond in de stad.</p>
              </div>
            </div>
            <div className="p-7 lg:p-10">
              <p className="eyebrow">Slimmer groeperen</p>
              <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.035em] text-jade sm:text-[3.55rem]">Denk in gebieden, niet in losse pins</h2>
              <p className="mt-5 text-sm leading-7 text-charcoal/68">Plan per dag één zone. Zo houd je meer tijd over voor de plek zelf en minder tijd voor wachten, terugvaren en extra transfers.</p>
              <div className="mt-7 divide-y divide-jade/10 border-y border-jade/10">
                {[
                  ['Kust', 'Railay, Phra Nang en eventueel klimmen horen bij elkaar. Begin vanuit Ao Nang of verblijf op Railay.'],
                  ['Stad & rivier', 'Combineer Tiger Cave Temple met Krabi Town, Khao Khanap Nam of Ko Klang.'],
                  ['Binnenland', 'Maak van Emerald Pool en de warmwaterbronnen één Khlong Thom-dag.'],
                  ['Op zee', 'Kies Four Islands, Hong Islands of Phi Phi als je grote bootdag; stapel ze niet automatisch.'],
                ].map(([area, text]) => (
                  <div key={area} className="grid gap-2 py-4 sm:grid-cols-[7.5rem_1fr]">
                    <h3 className="font-display text-xl font-semibold text-jade">{area}</h3>
                    <p className="text-xs leading-5 text-charcoal/62">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="route" className="section-divider-bottom py-14 lg:py-20">
          <div className="container-custom">
            <div className="mb-8 max-w-3xl">
              <p className="eyebrow">Minder heen en weer</p>
              <h2 className="heading-redesign">Zo combineer je de bezienswaardigheden</h2>
              <p className="mt-5 text-sm leading-7 text-charcoal/68">Deze driedaagse basis voorkomt dat je kust, eilanden en het binnenland op één dag probeert te proppen.</p>
            </div>
            <div className="relative grid gap-5 lg:grid-cols-3">
              <div aria-hidden="true" className="absolute left-[12%] right-[12%] top-7 hidden border-t-2 border-dashed border-saffron/50 lg:block" />
              {routeDays.map((item, index) => (
                <Link key={item.day} href={item.href} className="group relative rounded-2xl border border-jade/10 bg-white p-6 shadow-[0_7px_24px_rgba(18,63,54,0.045)] transition hover:-translate-y-1 hover:border-saffron/35">
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="grid h-14 w-14 place-items-center rounded-full border-4 border-[#fcfaf6] bg-saffron text-sm font-extrabold text-white shadow-sm">{index + 1}</span>
                    <ArrowRight size={16} className="text-jade transition group-hover:translate-x-1 group-hover:text-saffron-dark" />
                  </div>
                  <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-saffron-dark">{item.day}</p>
                  <h3 className="mt-2 font-display text-[1.8rem] font-semibold leading-none text-jade">{item.title}</h3>
                  <p className="mt-4 text-xs leading-5 text-charcoal/62">{item.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section-divider-bottom bg-tonal py-14 lg:py-18">
          <div className="container-custom">
            <div className="mb-8">
              <p className="eyebrow">Voor je vertrekt</p>
              <h2 className="heading-redesign">Praktische tips voor je planning</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {practicalTips.map(({ icon: Icon, title, text }) => (
                <article key={title} className="rounded-2xl border border-jade/10 bg-white p-6">
                  <Icon size={38} strokeWidth={1.35} className="text-jade" />
                  <h3 className="mt-5 font-display text-[1.5rem] font-semibold leading-none text-jade">{title}</h3>
                  <p className="mt-3 text-xs leading-5 text-charcoal/62">{text}</p>
                </article>
              ))}
            </div>
            <p className="mt-6 rounded-xl border border-saffron/25 bg-white/65 px-5 py-4 text-xs leading-5 text-charcoal/65"><strong className="text-jade">Controleer actuele informatie.</strong> Entreeprijzen, openingstijden, bootvertrekken en toegang kunnen veranderen. Kijk vlak voor vertrek bij de officiële locatie of je aanbieder.</p>
          </div>
        </section>

        <section id="vragen" className="section-divider-bottom py-14 lg:py-18">
          <div className="container-custom">
            <div className="mb-7">
              <p className="eyebrow">Echte vragen uit Google</p>
              <h2 className="heading-redesign">Veelgestelde vragen over Krabi</h2>
            </div>
            <div className="overflow-hidden rounded-xl border border-jade/10 bg-white shadow-[0_5px_18px_rgba(18,63,54,0.035)]">
              {faqs.map((faq) => (
                <details key={faq.question} className="group border-b border-jade/10 last:border-b-0">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 text-sm font-bold text-jade transition hover:bg-jade/[0.025] focus:outline-none sm:px-6 [&::-webkit-details-marker]:hidden">
                    <span>{faq.question}</span>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-jade/10 text-jade transition group-open:rotate-180 group-open:border-saffron/35 group-open:text-saffron-dark"><ChevronDown size={15} /></span>
                  </summary>
                  <div className="px-5 pb-5 pr-16 sm:px-6 sm:pb-6 sm:pr-24"><p className="max-w-[58rem] text-sm leading-6 text-charcoal/85">{faq.answer}</p></div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-14 lg:py-18">
          <div className="container-custom">
            <div className="grid gap-6 rounded-2xl bg-jade p-7 text-white lg:grid-cols-[1fr_1.2fr] lg:p-10">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-saffron-light">Plan de rest</p>
                <h2 className="mt-3 font-display text-[2.8rem] font-semibold leading-[0.92]">Maak je Krabi-reis compleet</h2>
                <p className="mt-4 max-w-lg text-sm leading-6 text-white/70">Kies daarna je uitvalsbasis, controleer het seizoen en bouw de dagen rond je belangrijkste bezienswaardigheden.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ['Complete Krabi-gids', '/city/krabi/', Compass],
                  ['Waar verblijven?', '/best-hotels/krabi/', MapPin],
                  ['Beste reistijd', '/city/krabi/weather/', CalendarDays],
                ].map(([label, href, Icon]) => {
                  const CardIcon = Icon as typeof Compass;
                  return <Link key={href as string} href={href as string} className="group flex min-h-[145px] flex-col rounded-xl border border-white/12 bg-white/8 p-5 transition hover:-translate-y-1 hover:bg-white/12"><CardIcon size={25} className="text-saffron-light" /><span className="mt-auto flex items-end justify-between gap-3 text-xs font-bold"><span>{label as string}</span><ArrowRight size={14} className="transition group-hover:translate-x-1" /></span></Link>;
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 lg:py-12">
          <div className="container-custom">
            <details className="group rounded-xl border border-jade/10 bg-white">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-3"><BookOpenText size={18} className="text-saffron-dark" /><span><strong className="block font-display text-xl font-semibold text-jade">Bronnen & redactie</strong><span className="text-[10px] text-charcoal/48">4 officiële bronnen · Go2Thailand Redactieteam · bijgewerkt 23 juli 2026</span></span></span>
                <span className="text-xs font-bold text-jade group-open:hidden">Bekijken</span><span className="hidden text-xs font-bold text-jade group-open:block">Sluiten</span>
              </summary>
              <div className="grid gap-3 border-t border-jade/8 px-6 py-5 md:grid-cols-2">
                {sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#faf7f0] px-4 py-3 text-xs text-charcoal/62 transition hover:text-jade"><strong className="block text-jade">{source.title}</strong><span className="mt-1 block text-[10px]">{source.creator}</span></a>)}
              </div>
            </details>
            <FeedbackForm pageTitle={pageTitle} pageUrl={pageUrl} />
          </div>
        </section>
      </div>
    </>
  );
}
