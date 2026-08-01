import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BadgeCheck,
  Bean,
  CircleHelp,
  Clock3,
  Coffee,
  ExternalLink,
  Footprints,
  GlassWater,
  MapPin,
  Milk,
  Palette,
  Route,
  ShoppingBag,
  Sparkles,
  Sun,
  TrainFront,
} from 'lucide-react';
import { TRIP_GENERIC, withPlacementSubId } from '../../lib/affiliates';
import { useSubId } from '../../lib/useSubId';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav, type PageSectionNavItem } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';

const PAGE_URL = 'https://go2-thailand.com/nl/blog/bangkok-specialty-coffee-cafe-guide-2026/';
const PAGE_TITLE = 'Specialty coffee Bangkok: 3 routes en 6 koffiebars';
const PAGE_DESCRIPTION = 'Plan specialty coffee in Bangkok via drie slimme routes, zes gecontroleerde café-ankers, een menu-decoder en praktische BTS- en openingstijdenchecks.';
const HERO_IMAGE = '/images/redesign/editorial/bangkok-specialty-coffee-cafe-guide-2026-hero.webp';

const navItems: PageSectionNavItem[] = [
  { href: '#kiezen', label: 'Kies je route', icon: Route },
  { href: '#routes', label: 'Drie routes', icon: MapPin },
  { href: '#bestellen', label: 'Bestellen', icon: Coffee },
  { href: '#bonen', label: 'Thaise bonen', icon: Bean },
  { href: '#praktisch', label: 'Praktisch', icon: BadgeCheck },
  { href: '#vragen', label: 'Vragen', icon: CircleHelp },
];

interface CoffeeStop {
  name: string;
  area: string;
  hours: string;
  role: string;
  address: string;
  sourceUrl: string;
  orderLogic: string;
}

interface CoffeeRoute {
  number: string;
  title: string;
  subtitle: string;
  start: string;
  fit: string;
  rhythm: string;
  icon: LucideIcon;
  stops: CoffeeStop[];
  switchOption: string;
}

const coffeeRoutes: CoffeeRoute[] = [
  {
    number: '01',
    title: 'Phaya Thai → Siam',
    subtitle: 'De sterkste eerste route',
    start: 'Start rond 08:00',
    fit: 'Voor je eerste Bangkok-bezoek, een BTS-dag en koffie plus kunst zonder grote omweg.',
    rhythm: 'Eén vroege koffie, één vergelijkingskop en na 10:00 een rustige filterstop in BACC.',
    icon: TrainFront,
    stops: [
      { name: 'Factory Coffee Phaya Thai', area: 'Phaya Thai', hours: 'Dagelijks 08:00–16:00', role: 'Techniek + signature', address: '49 Phayathai Road, Ratchathewi', sourceUrl: 'https://factorybkk.com/blogs/news/location', orderLogic: 'Begin met espresso of vraag welke bereiding het actuele lot het duidelijkst laat zien.' },
      { name: 'Roots Ratchathewi', area: 'Ratchathewi', hours: 'Dagelijks 07:30–17:30', role: 'Thaise herkomst', address: 'Asia Hotel, Phayathai Road', sourceUrl: 'https://rootsbkk.com/th/branch/', orderLogic: 'Vraag naar een Thaise boon en herkomst; vergelijk hem niet automatisch als “beter” maar als ander profiel.' },
      { name: 'Gallery Drip Coffee', area: 'Siam / BACC', hours: 'Di–zo 10:00–20:00 · ma gesloten', role: 'Filter + kunst', address: 'BACC, kamer 107, 1e verdieping', sourceUrl: 'https://www.bacc.or.th/en/directories/62255', orderLogic: 'Eindig met filterkoffie en bezoek daarna de tentoonstellingen zonder je drankje de galerie in te nemen.' },
    ],
    switchOption: 'Te veel cafeïne of te weinig tijd? Sla de middelste stop over en maak van Factory → BACC een route met ontbijt of water ertussen.',
  },
  {
    number: '02',
    title: 'Phrom Phong → Ekkamai',
    subtitle: 'De boon-en-brunchroute',
    start: 'Start tussen 08:00 en 09:00',
    fit: 'Voor reizigers die bonen willen vergelijken, rustig willen zitten en hun koffiedag langs de Sukhumvit-lijn bouwen.',
    rhythm: 'Proef eerst zuiver, neem daarna BTS of een korte rit en maak de tweede stop langer met brunch.',
    icon: Bean,
    stops: [
      { name: 'Ceresia Coffee Roasters', area: 'Sukhumvit 41', hours: 'Dagelijks 08:00–17:00', role: 'Roaster + filter', address: '15/1 Sukhumvit Soi 41', sourceUrl: 'https://ceresiacoffeeroasters.com/our-shop/', orderLogic: 'Kies eerst boon en proces; vraag daarna of filter of espresso het bedoelde profiel beter laat zien.' },
      { name: 'Kaizen Coffee Ekkamai', area: 'Ekkamai', hours: 'Dagelijks 07:30–16:30', role: 'Koffie + brunch', address: '888 C Condo, Sukhumvit 63', sourceUrl: 'https://www.kaizencoffee.com/locations', orderLogic: 'Gebruik dit als langere eetstop. Kies een tweede koffie kleiner of deel een filter als je al een volledige tasting deed.' },
    ],
    switchOption: 'Wil je Thong Lor in plaats van Ekkamai, gebruik Roots at theCOMMONS als gecontroleerde wisseloptie en plan de laatste sois op kaart.',
  },
  {
    number: '03',
    title: 'Ari in langzaam tempo',
    subtitle: 'De compacte wijkochtend',
    start: 'Begin vroeg en blijf in één buurt',
    fit: 'Voor een rustige ochtend, een groene setting en reizigers die liever twee goede ankers dan een stadsbrede checklist afvinken.',
    rhythm: 'Eén hoofdstop, een wandeling door Ari en pas daarna een tweede kop als smaak en energie daarom vragen.',
    icon: Footprints,
    stops: [
      { name: 'Nana Coffee Roasters Ari', area: 'Ari Soi 4', hours: 'Uren op bezoekdag controleren', role: 'Roastery + ruime keuze', address: '24/2 Ari 4 Alley', sourceUrl: 'https://nanacoffeeroasters.com/pages/our-locations', orderLogic: 'Vraag naar Thaise herkomst en een bereiding binnen je smaakvoorkeur; laat prijs en zeldzaamheid niet automatisch je keuze bepalen.' },
      { name: 'Roots Ari', area: 'Ari Soi 4', hours: 'Dagelijks 07:30–17:00', role: 'Producent + verhaal', address: '50/2 Phahon Yothin 7, Ari Soi 4', sourceUrl: 'https://rootsbkk.com/th/branch/', orderLogic: 'Gebruik de tweede stop om herkomst of proces te vergelijken, niet om exact hetzelfde melkdrankje opnieuw te bestellen.' },
    ],
    switchOption: 'Ari verandert snel. Bewaar ruimte voor één spontane buurtstop, maar controleer de officiële of actuele kaartvermelding voordat je omloopt.',
  },
];

const menuChoices: Array<{ icon: LucideIcon; title: string; cue: string; explanation: string }> = [
  { icon: Coffee, title: 'Espresso', cue: 'Intens en kort', explanation: 'Goed om extractie en balans te vergelijken. Minder geschikt wanneer je vooral subtiele herkomstverschillen zoekt en niet gewend bent aan een geconcentreerde kop.' },
  { icon: Milk, title: 'Flat white of latte', cue: 'Textuur + koffie', explanation: 'Vraag welke huisboon in melk blijft staan. Een grotere latte verzacht zuren en bitterheid, maar maakt kleine verschillen tussen lots ook minder zichtbaar.' },
  { icon: GlassWater, title: 'Filter of pour-over', cue: 'Herkomst lezen', explanation: 'Sterk wanneer je producent, variëteit en proces wilt proeven. Laat de barista kiezen als je woorden als floral, fruitig of chocoladeachtig concreter wilt maken.' },
  { icon: Sparkles, title: 'Signature drink', cue: 'Café-identiteit', explanation: 'Kies dit voor creativiteit, niet als neutrale vergelijking van bonen. Vraag naar zoetheid en ingrediënten wanneer je geen onverwachte siroop of zuivel wilt.' },
];

const faqs = [
  { question: 'Kun je goede koffie drinken in Thailand?', answer: 'Ja. Thailand heeft zowel een eigen koffieteelt als gespecialiseerde roasters en cafés. In Bangkok kun je internationale lots en Thaise bonen naast elkaar proeven. Kwaliteit verschilt per boon, branding, bereiding en dag; “Thais” is geen automatische kwaliteitsgarantie.' },
  { question: 'Wat is de beste specialty coffee in Bangkok?', answer: 'Er is geen objectieve winnaar. Voor een eerste route zijn Factory Phaya Thai, Roots Ratchathewi en Gallery Drip praktisch te combineren. Voor boonkeuze passen Ceresia en Nana; voor koffie plus brunch past Kaizen. Kies dus op taak en wijk, niet op één universele ranking.' },
  { question: 'Welke wijk is het beste voor café-hoppen in Bangkok?', answer: 'Phaya Thai–Ratchathewi–Siam werkt goed voor een eerste stadsdag met BTS en kunst. Phrom Phong–Ekkamai is sterker voor roasters en brunch. Ari is compacter en rustiger. De beste wijk is degene die aansluit op je hotel en volgende activiteit.' },
  { question: 'Wat kost een kop specialty coffee in Bangkok?', answer: 'Prijzen verschillen sterk per boon, bereidingswijze en café en veranderen vaker dan deze gids. Een huisespresso en een zeldzame handgeschonken microlot horen niet in dezelfde prijscategorie. Controleer het actuele menu vóór bestellen en vraag naar de prijs van premium lots.' },
  { question: 'Wordt koffie in Thailand verbouwd?', answer: 'Ja. Het Thaise Department of Agriculture werkt met meerdere Arabica- en Robusta-variëteiten. Noordelijke hooglandgebieden zijn belangrijk voor Arabica; Doi Chaang in Chiang Rai is een bekende geografische herkomst. Vraag in het café naar provincie, producent en proces.' },
  { question: 'Wat maakt Factory Coffee Bangkok bijzonder?', answer: 'Factory combineert een centrale Phaya Thai-locatie met een duidelijke focus op bereiding. De officiële site noemt daarnaast een nieuwere HQ-roastery in Town in Town. Voor bezoekers is Phaya Thai vooral sterk als vroeg anker in een BTS-route; verwacht geen objectief bewijs dat één café “het beste” is.' },
  { question: 'Op welke verdieping zit Gallery Drip Coffee?', answer: 'Volgens Bangkok Art and Culture Centre zit Gallery Drip Coffee in kamer 107 op de eerste verdieping. BACC is dinsdag tot en met zondag geopend en maandag gesloten. Eten en drinken mag niet mee in de hoofdgaleries, dus drink vóór je tentoonstelling.' },
  { question: 'Welke koffie bestel je als beginner?', answer: 'Begin bij je voorkeur: espresso voor intensiteit, flat white voor koffie met melktextuur, filter voor herkomst of een signature drink voor creativiteit. Zeg of je fruitig, chocoladeachtig, licht of stevig zoekt; dat helpt meer dan de duurste boon aanwijzen.' },
  { question: 'Kan ik Thaise koffiebonen meenemen naar huis?', answer: 'Veel roasters verkopen verpakte bonen. Controleer brandingdatum, hele boon of maling, proces, producent en zetadvies. Laat de boon alleen malen wanneer je weet voor welke methode; voorgemalen koffie verliest sneller aroma. Controleer ook de invoerregels van je bestemmingsland.' },
  { question: 'Is World of Coffee Bangkok 2026 nog te bezoeken?', answer: 'Nee. De Specialty Coffee Association plande het evenement voor 7–9 mei 2026 in BITEC; op de controledatum 25 juli is het voorbij. Gebruik oude eventpagina’s daarom niet als actuele activiteit en controleer de officiële World of Coffee-kalender voor een volgende editie.' },
];

const sources = [
  { title: 'Factory Coffee locations', creator: 'Factory Coffee', url: 'https://factorybkk.com/blogs/news/location', note: 'Actuele adressen en uren voor Phaya Thai en HQ Town in Town.' },
  { title: 'Roots branches', creator: 'Roots', url: 'https://rootsbkk.com/th/branch/', note: 'Actuele vestigingen, adressen en uren voor Ratchathewi, Ari, Thong Lor en andere branches.' },
  { title: 'Gallery Drip Coffee', creator: 'Bangkok Art and Culture Centre', url: 'https://www.bacc.or.th/en/directories/62255', note: 'Officiële BACC-directory voor kamer 107; opening en huisregels aanvullend via BACC Plan Your Visit.' },
  { title: 'Kaizen Coffee locations', creator: 'Kaizen Coffee', url: 'https://www.kaizencoffee.com/locations', note: 'Actuele Ekkamai- en Thong Lor-locaties met uren en adressen.' },
  { title: 'Ceresia — Our shop', creator: 'Ceresia Coffee Roasters', url: 'https://ceresiacoffeeroasters.com/our-shop/', note: 'Nieuwe Sukhumvit 41-locatie, route vanaf BTS Phrom Phong en openingstijden.' },
  { title: 'Nana Coffee Roasters locations', creator: 'Nana Coffee Roasters', url: 'https://nanacoffeeroasters.com/pages/our-locations', note: 'Officiële vestigingslijst met het adres van Nana Ari.' },
  { title: 'World of Coffee heads to Bangkok', creator: 'Specialty Coffee Association', url: 'https://sca.coffee/sca-news/2025/5/16/world-of-coffee-heads-to-bangkok-in-2026-the-third-edition-of-world-of-coffee-asia-3brz5', note: 'Primaire datum- en venuebron voor het inmiddels afgelopen evenement van 7–9 mei 2026.' },
  { title: 'Thailand coffee varieties programme', creator: 'Thailand Department of Agriculture', url: 'https://www.doa.go.th/th/news_board/103929/', note: '2026-context voor Thaise Arabica- en Robusta-variëteiten en hooglandteelt.' },
];

function createSchemas() {
  const stops = coffeeRoutes.flatMap((route) => route.stops);
  return [
    {
      '@context': 'https://schema.org', '@type': 'Article', '@id': `${PAGE_URL}#article`, headline: PAGE_TITLE,
      description: PAGE_DESCRIPTION, image: `https://go2-thailand.com${HERO_IMAGE}`, datePublished: '2026-03-23', dateModified: '2026-08-01',
      inLanguage: 'nl-NL', mainEntityOfPage: PAGE_URL,
      author: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
      publisher: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
    },
    {
      '@context': 'https://schema.org', '@type': 'ItemList', name: 'Zes specialty-coffee-ankers in Bangkok',
      itemListElement: stops.map((stop, index) => ({ '@type': 'ListItem', position: index + 1, name: stop.name, description: `${stop.area}. ${stop.role}. ${stop.hours}.` })),
    },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/nl/' },
        { '@type': 'ListItem', position: 2, name: 'Bangkok', item: 'https://go2-thailand.com/nl/city/bangkok/' },
        { '@type': 'ListItem', position: 3, name: 'Specialty coffee Bangkok', item: PAGE_URL },
      ],
    },
    {
      '@context': 'https://schema.org', '@type': 'HowTo', name: 'Zo plan je een specialty-coffee-route in Bangkok',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Kies één wijkroute', text: 'Kies Phaya Thai–Siam, Sukhumvit of Ari op basis van je hotel en volgende activiteit.' },
        { '@type': 'HowToStep', position: 2, name: 'Controleer de bezoekdag', text: 'Controleer officiële uren, sluitingsdag en actuele locatie voordat je vertrekt.' },
        { '@type': 'HowToStep', position: 3, name: 'Vergelijk bereidingsstijlen', text: 'Bestel niet overal hetzelfde, maar vergelijk bijvoorbeeld espresso met filter of Thaise herkomst.' },
        { '@type': 'HowToStep', position: 4, name: 'Plan water, eten en transit', text: 'Houd ruimte tussen stops en koppel je route aan BTS, ontbijt, lunch of een culturele activiteit.' },
      ],
    },
  ];
}

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="font-extrabold text-jade underline decoration-saffron/55 underline-offset-4 transition hover:text-saffron-dark">{children}</Link>;
}

export function BangkokSpecialtyCoffeeGuide() {
  const subId = useSubId();
  const hotelHref = withPlacementSubId(TRIP_GENERIC, subId, 'bangkok-coffee-bts-base');
  const schemas = createSchemas();

  return (
    <>
      <SEOHead title={PAGE_TITLE} description={PAGE_DESCRIPTION} ogImage={`https://go2-thailand.com${HERO_IMAGE}`}>
        <meta name="keywords" content="specialty coffee bangkok, beste koffie bangkok, koffiebar bangkok, cafe hopping bangkok, thaise koffiebonen, factory coffee bangkok, roots bangkok" />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content="2026-03-23" />
        <meta property="article:modified_time" content="2026-08-01" />
        {schemas.map((schema, index) => <script key={`${schema['@type']}-${index}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      </SEOHead>

      <div className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          image={HERO_IMAGE}
          imageAlt="Sfeerbeeld van een barista die specialty filterkoffie zet naast de BTS in Bangkok"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Bangkok', href: '/city/bangkok/' }, { label: 'Specialty coffee' }]}
          eyebrow="Bangkok begint vroeg"
          title={<>Specialty coffee Bangkok.</>}
          subtitle={<>Drie routes. Zes betrouwbare ankers.</>}
          description={<>Geen ranglijst die breekt zodra een score, filiaal of openingstijd verandert. Wel drie logische stadsroutes, officiële locatiechecks en een bestelstrategie die bij jouw smaak past.</>}
          actions={[
            { label: 'Kies je koffieroute', href: '#kiezen', kind: 'primary' },
            { label: 'Open de menu-decoder', href: '#bestellen', kind: 'secondary' },
          ]}
          minHeightClassName="min-h-[850px] lg:min-h-[720px]"
          contentClassName="max-w-[690px]"
          titleClassName="max-w-[700px] text-[3.9rem] leading-[0.84] sm:text-[5rem] lg:text-[5.45rem]"
          subtitleClassName="max-w-[620px] text-[1.65rem] leading-[1] text-saffron-dark sm:text-[2.25rem]"
          imageClassName="object-cover object-[72%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.02)_0%,rgba(252,250,246,0.76)_50%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.97)_0%,rgba(252,250,246,0.84)_38%,rgba(7,39,34,0.1)_61%,rgba(5,27,24,0.06)_100%)]"
          sideCard={(
            <aside className="absolute bottom-8 right-[max(2rem,calc((100vw-1240px)/2))] z-10 hidden w-[350px] overflow-hidden rounded-2xl border border-white/55 bg-white/[0.91] shadow-editorial-lift backdrop-blur-xl xl:block">
              <div className="flex items-center justify-between border-b border-jade/10 px-5 py-4"><p className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-saffron-dark">Koffiekaart · juli 2026</p><Coffee size={18} className="text-jade" /></div>
              <dl className="grid grid-cols-[92px_1fr] gap-x-4 gap-y-3 p-5 text-[11px]">
                <dt className="text-charcoal/46">Eerste keer</dt><dd className="font-extrabold text-jade">Phaya Thai → Siam</dd>
                <dt className="text-charcoal/46">Boonfocust</dt><dd className="font-extrabold text-jade">Phrom Phong → Ekkamai</dd>
                <dt className="text-charcoal/46">Langzaam</dt><dd className="font-extrabold text-jade">Ari in één wijk</dd>
                <dt className="text-charcoal/46">Ritme</dt><dd className="font-extrabold text-saffron-dark">2 hoofdproeven + water</dd>
              </dl>
              <p className="border-t border-jade/10 px-5 py-4 text-[10px] font-medium leading-4 text-charcoal/62">Uren zijn gecontroleerd op 1 augustus 2026. Controleer dezelfde dag opnieuw bij de officiële locatie.</p>
            </aside>
          )}
        />

        <PageSectionNav items={navItems} />

        <section id="kiezen" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-end">
              <SectionHeading eyebrow="Eerst je dag, dan je café" title={<>Welke route<br />past bij jou?</>} description={<>Bangkok is te groot voor een zinvolle “top 10 in één ochtend”. Kies één corridor en laat koffie je dag ondersteunen. Voor de ritten gebruik je onze <InlineLink href="/blog/bangkok-public-transport-bts-mrt-tourist-guide-2026/">BTS- en MRT-gids</InlineLink>.</>} />
              <p className="max-w-3xl text-sm font-medium leading-7 text-charcoal/66">Een goede crawl vergelijkt iets: bereiding, Thaise herkomst of cafévorm. Zes gelijksoortige melkdrankjes leveren vooral haast op. Onze drie routes beperken de verplaatsing, geven iedere stop een andere rol en houden ruimte voor ontbijt, water en de rest van Bangkok.</p>
            </div>

            <div className="mt-11 grid gap-4 md:grid-cols-3">
              {[
                { icon: TrainFront, eyebrow: 'Eerste Bangkok-dag', title: 'Koffie + BTS + kunst', text: 'Kies de centrale route wanneer je zonder taxi wilt starten en BACC of Siam al in je dag past.', href: '#route-centraal' },
                { icon: Bean, eyebrow: 'Je koopt ook bonen', title: 'Roaster + brunch', text: 'Kies Sukhumvit wanneer proces, zetwijze en een langere tweede stop belangrijker zijn dan veel adressen.', href: '#route-sukhumvit' },
                { icon: Sun, eyebrow: 'Rust boven aantallen', title: 'Ari in langzaam tempo', text: 'Kies Ari voor twee betrouwbare ankers, een wijkwandeling en ruimte om spontaan één nieuwe plek te bekijken.', href: '#route-ari' },
              ].map(({ icon: Icon, eyebrow, title, text, href }, index) => (
                <a key={title} href={href} className={`group flex min-h-[320px] flex-col rounded-2xl border p-6 transition hover:-translate-y-1 hover:shadow-editorial-lift ${index === 0 ? 'border-saffron/38 bg-[#fff2de]' : 'border-jade/10 bg-white'}`}>
                  <div className="flex items-center justify-between"><span className="grid h-12 w-12 place-items-center rounded-xl border border-jade/10 bg-canvas text-jade"><Icon size={22} strokeWidth={1.45} /></span><ArrowRight size={16} className="text-saffron transition group-hover:translate-x-1" /></div>
                  <p className="mt-7 text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">{eyebrow}</p>
                  <h2 className="mt-2 font-display text-[1.85rem] font-semibold leading-none text-jade">{title}</h2>
                  <p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">{text}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="routes" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading eyebrow="Drie halve dagen" title="Een route is sterker dan een ranglijst" description="Elke route heeft een eigen tempo en doel. Volg hem niet als afvinklijst: één goede kop en een prettig vervolg zijn waardevoller dan iedere genoemde stop halen." />
            <div className="mt-12 space-y-6">
              {coffeeRoutes.map((route, routeIndex) => {
                const Icon = route.icon;
                const id = routeIndex === 0 ? 'route-centraal' : routeIndex === 1 ? 'route-sukhumvit' : 'route-ari';
                return (
                  <article key={route.title} id={id} className="scroll-mt-28 overflow-hidden rounded-[28px] border border-jade/10 bg-white shadow-editorial-card">
                    <div className="grid lg:grid-cols-[0.34fr_0.66fr]">
                      <div className={`relative flex min-h-[310px] flex-col justify-between overflow-hidden p-7 text-white sm:p-9 ${routeIndex === 1 ? 'bg-[#294c43]' : routeIndex === 2 ? 'bg-[#213932]' : 'bg-jade'}`}>
                        <div aria-hidden="true" className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-saffron/24" />
                        <div className="relative"><span className="grid h-12 w-12 place-items-center rounded-xl border border-white/15 bg-white/[0.07]"><Icon size={22} className="text-saffron-light" /></span><p className="mt-7 text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-light">Route {route.number}</p><h2 className="mt-3 font-display text-[2.55rem] font-semibold leading-[0.9]">{route.title}</h2><p className="mt-3 text-xs font-bold text-white/58">{route.subtitle}</p></div>
                        <div className="relative border-t border-white/12 pt-5"><p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-light">Ritme</p><p className="mt-2 text-xs font-medium leading-6 text-white/64">{route.rhythm}</p></div>
                      </div>

                      <div className="p-7 sm:p-10">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><p className="max-w-2xl text-sm font-semibold leading-7 text-charcoal/70">{route.fit}</p><span className="shrink-0 rounded-full bg-canvas px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.12em] text-saffron-dark">{route.start}</span></div>
                        <div className="relative mt-8 space-y-4">
                          <div aria-hidden="true" className="absolute bottom-7 left-[17px] top-7 border-l-2 border-dashed border-saffron/45" />
                          {route.stops.map((stop, index) => (
                            <div key={stop.name} className="relative grid grid-cols-[36px_1fr] gap-4">
                              <span className="relative z-10 grid h-9 w-9 place-items-center rounded-full border border-saffron/40 bg-white text-[10px] font-extrabold text-saffron-dark">{index + 1}</span>
                              <div className="rounded-2xl border border-jade/10 bg-canvas p-5">
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{stop.area} · {stop.role}</p><h3 className="mt-1 font-display text-2xl font-semibold text-jade">{stop.name}</h3></div><span className="text-[10px] font-bold text-jade">{stop.hours}</span></div>
                                <p className="mt-3 text-xs font-medium leading-6 text-charcoal/64">{stop.orderLogic}</p>
                                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-jade/10 pt-4"><span className="inline-flex items-center gap-2 text-[10px] font-semibold text-charcoal/52"><MapPin size={13} className="text-jade" />{stop.address}</span><a href={stop.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] font-extrabold text-jade">Officiële locatie <ExternalLink size={12} className="text-saffron" /></a></div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="mt-6 rounded-xl border border-saffron/24 bg-[#fff6e8] p-4 text-[11px] font-semibold leading-5 text-jade"><strong>Wisseloptie:</strong> {route.switchOption}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="bestellen" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
              <div className="relative min-h-[520px] overflow-hidden rounded-[28px] shadow-editorial-lift lg:min-h-[620px]"><Image src="/images/redesign/bangkok-coffee-tasting.webp" alt="Proeftafel met espresso, filterkoffie, melkdrank, bonen en een gestippelde routekaart" fill sizes="(max-width: 1024px) 100vw, 43vw" className="object-cover" /><span className="absolute bottom-4 left-4 rounded-full border border-white/25 bg-jade/78 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-md">Proefstijl boven populariteit</span></div>
              <div>
                <SectionHeading eyebrow="Zeg wat je zoekt" title={<>Een menu wordt<br />een keuzeboom</>} description={<>“Wat is het populairst?” levert vaak de zoetste signature op. Zeg liever of je intensiteit, melktextuur, herkomst of creativiteit zoekt. Dan kan de barista binnen het actuele menu sturen.</>} />
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {menuChoices.map(({ icon: Icon, title, cue, explanation }) => (
                    <article key={title} className="rounded-2xl border border-jade/10 bg-white p-5 shadow-editorial-card"><div className="flex items-center justify-between"><Icon size={21} className="text-jade" /><span className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-saffron-dark">{cue}</span></div><h3 className="mt-5 font-display text-[1.55rem] font-semibold text-jade">{title}</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/62">{explanation}</p></article>
                  ))}
                </div>
                <div className="mt-5 rounded-2xl border border-jade/10 bg-jade p-6 text-white"><p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-light">Eén zin aan de bar</p><p className="mt-3 font-display text-2xl font-semibold">“Ik zoek iets fruitigs en niet te bitter; welke Thaise boon past vandaag?”</p><p className="mt-3 text-xs font-medium leading-5 text-white/58">Vervang fruitig door chocoladeachtig, licht, stevig of met melk. Dat is concreter dan vragen naar “de beste”.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="bonen" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.58fr_1.42fr]">
              <SectionHeading eyebrow="Thailand zit ook in de zak" title={<>Lees de boon,<br />niet alleen het café</>} description={<>Thailand teelt Arabica én Robusta. Het Department of Agriculture noemt meerdere nationale variëteiten en werkt in 2026 aan uitbreiding van kwalitatief plantmateriaal. Dat zegt nog niets over jouw kop: lees de vier velden op de zak.</>} />
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { number: '01', title: 'Herkomst', text: 'Zoek provincie, dorp of geografische aanduiding. Doi Chaang verwijst naar een afgebakende hooglandherkomst in Chiang Rai; “Thailand” alleen is veel breder.' },
                  { number: '02', title: 'Producent', text: 'Een boerderij, coöperatie of verwerker maakt de keten concreter. Geen naam betekent niet automatisch slechte koffie, maar wel minder traceerbaarheid.' },
                  { number: '03', title: 'Proces', text: 'Washed, natural, honey en experimentele processen sturen smaak en mondgevoel. Vraag om uitleg zonder te verwachten dat één proces altijd fruitig of beter is.' },
                  { number: '04', title: 'Branding + zetadvies', text: 'Controleer roast date, brandniveau en aanbevolen methode. Koop hele bonen wanneer je thuis maalt; laat anders voor jouw specifieke zetwijze malen.' },
                ].map(({ number, title, text }) => (
                  <article key={title} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="text-[10px] font-extrabold text-saffron-dark">{number}</span><h3 className="mt-4 font-display text-[1.75rem] font-semibold leading-none text-jade">{title}</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">{text}</p></article>
                ))}
              </div>
            </div>
            <p className="mt-8 max-w-4xl text-sm font-medium leading-7 text-charcoal/64">Wil je de bronregio’s later in dezelfde reis zien, combineer deze koffiekennis dan met onze gidsen voor <InlineLink href="/city/chiang-mai/">Chiang Mai</InlineLink>, <InlineLink href="/city/chiang-rai/">Chiang Rai</InlineLink> en de provincie Nan in onze <InlineLink href="/region/northern/">Noord-Thailand-gids</InlineLink>. Een café in Bangkok blijft de eenvoudigste plek om meerdere regio’s naast elkaar te proeven zonder een plantageclaim te romantiseren.</p>
          </div>
        </section>

        <section aria-label="Koffieroute met ademruimte" className="section-divider-bottom py-12 lg:py-16">
          <div className="container-custom">
            <div className="relative min-h-[430px] overflow-hidden rounded-[30px] bg-jade shadow-editorial-lift sm:min-h-[380px]">
              <Image src="/images/redesign/bangkok-coffee-route-banner.webp" alt="Reizigers volgen een gestippelde koffieroute langs de BTS in Bangkok" fill sizes="100vw" className="object-cover object-[68%_center]" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,35,30,0.99)_0%,rgba(6,35,30,0.9)_39%,rgba(6,35,30,0.12)_73%,rgba(6,35,30,0.03)_100%)]" />
              <div className="relative z-10 flex min-h-[430px] max-w-[610px] flex-col justify-center p-7 text-white sm:min-h-[380px] sm:p-12">
                <p className="eyebrow !text-saffron-light">Twee koppen. Eén echte stadsdag.</p>
                <h2 className="font-display text-[3.2rem] font-semibold leading-[0.88] tracking-[-0.04em]">Laat de route ademen.</h2>
                <p className="mt-5 max-w-[520px] text-sm font-medium leading-7 text-white/67">Plan water en eten tussen proeven, gebruik de BTS voor de lange as en laat één stop vervallen zodra koffie de dag begint over te nemen. Bangkok is de bestemming; de crawl is je lens.</p>
                <Link href="/city/bangkok/food/" className="btn-cream mt-7 w-fit">Bouw er een fooddag omheen <ArrowRight size={15} className="text-saffron" /></Link>
              </div>
            </div>
          </div>
        </section>

        <section id="praktisch" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.58fr_1.42fr]">
              <SectionHeading eyebrow="Voor je vertrekt" title={<>Zes checks die<br />een dichte deur voorkomen</>} description="Cafés verhuizen, branches sluiten eerder en kaartpins lopen achter. Gebruik deze routine ook wanneer je een nieuwe zaak uit een social post toevoegt." />
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {[
                  { icon: Clock3, title: 'Officiële uren', text: 'Controleer de eigen locatiepagina op dezelfde dag. Feestdagen en last order kunnen afwijken.' },
                  { icon: MapPin, title: 'Exact filiaal', text: 'Ketens hebben verschillende branches. Bewaar volledige naam en adres, niet alleen het merk.' },
                  { icon: TrainFront, title: 'Laatste kilometer', text: 'BTS brengt je in de wijk; de laatste soi kan nog lopen, taxi of motorrit vragen.' },
                  { icon: GlassWater, title: 'Water + eten', text: 'Plan geen rij van zware dranken op een lege maag. Maak van brunch of lunch een routeonderdeel.' },
                  { icon: ShoppingBag, title: 'Bonen meenemen', text: 'Controleer roast date, maling en invoerregels. Koop niet alleen op een opvallende verpakking.' },
                  { icon: Palette, title: 'Venue-regels', text: 'Bij BACC blijft je drankje buiten de hoofdgaleries en is maandag de vaste sluitingsdag.' },
                ].map(({ icon: Icon, title, text }) => (
                  <article key={title} className="rounded-2xl border border-jade/10 bg-white p-5 shadow-editorial-card"><Icon size={20} className="text-jade" /><h3 className="mt-5 font-display text-[1.5rem] font-semibold text-jade">{title}</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/62">{text}</p></article>
                ))}
              </div>
            </div>

            <aside className="mt-8 border-y border-jade/10 py-7 lg:flex lg:items-start lg:justify-between lg:gap-12">
              <div className="flex items-center gap-3 text-jade"><Bean size={21} /><p className="font-display text-2xl font-semibold">Maak een proeflog van drie regels</p></div>
              <div className="mt-4 max-w-3xl space-y-3 text-sm font-medium leading-7 text-charcoal/64 lg:mt-0">
                <p>Schrijf direct na de eerste slokken op wat je ruikt, wat je proeft en hoe de afdronk verandert wanneer de koffie afkoelt. Gebruik gewone woorden: citrus, cacao, theeachtig, zwaar of juist schoon is bruikbaarder dan een geleende score.</p>
                <p>Noteer daarna boon, proces en bereiding van het kaartje of de zak. Zo vergelijk je bij de volgende stop dezelfde vraag in plaats van alleen twee café-interieurs. Deel een filter als cafeïne, budget of tijd de beperkende factor wordt.</p>
                <p>Een tegenvallende kop maakt de route niet mislukt. Vraag rustig wat je daadwerkelijk kreeg, vergelijk dat met je bestelling en gebruik het verschil om je volgende keuze scherper te formuleren.</p>
              </div>
            </aside>

            <div className="mt-12 grid gap-8 overflow-hidden rounded-[28px] border border-jade/10 bg-[#fff4df] p-7 shadow-editorial-card lg:grid-cols-[0.8fr_1.2fr] lg:p-10">
              <div><p className="eyebrow">Kies je Bangkok-basis</p><h2 className="font-display text-[2.8rem] font-semibold leading-[0.92] text-jade">Een hotel bij BTS bespaart meer dan een extra cafépin.</h2></div>
              <div className="lg:justify-self-end"><p className="max-w-3xl text-sm font-medium leading-7 text-charcoal/66">Wie voor koffie reist, hoeft niet naast één café te slapen. Kies een basis aan de Sukhumvit- of Silom-lijn die ook bij de rest van je programma past. Vergelijk buurt, station, kamervoorwaarden en recente reviews voordat je boekt.</p><div className="mt-6 flex flex-wrap items-center gap-4"><Link href="/best-hotels/bangkok/" className="btn-jade">Vergelijk Bangkok-wijken <ArrowRight size={15} className="text-saffron" /></Link><a href={hotelHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center gap-2 text-xs font-extrabold text-saffron-dark">Bekijk live hotels via Trip.com <ExternalLink size={13} /></a></div><AffiliateDisclosure className="mt-3">Trip.com is een affiliatelink. Go2Thailand kan commissie ontvangen zonder dat jouw prijs stijgt. De caféselectie en hotelkeuze staan inhoudelijk los van deze partner.</AffiliateDisclosure></div>
            </div>
          </div>
        </section>

        <FaqSplitSection id="vragen" eyebrow="Praktische bezoekvragen" title="Veelgestelde vragen over koffie in Bangkok" description="De antwoorden vervangen geen dagcheck. Locaties, uren, menu’s en events veranderen; smaak en “beste” blijven persoonlijk." items={faqs} />

        <RelatedGuidesSection
          eyebrow="Na de laatste kop"
          title="Maak van koffie een Bangkok-dag"
          guides={[
            { title: 'BTS & MRT in Bangkok', description: 'Plan de lange as van je route en vermijd onnodige taxiritten tussen wijken.', href: '/blog/bangkok-public-transport-bts-mrt-tourist-guide-2026/', image: '/images/blog/bangkok-public-transport-bts-mrt-tourist-guide-2026.webp' },
            { title: 'Bangkok streetfood', description: 'Koppel je ochtendkoffie aan een maaltijd en gebruik dezelfde nuchtere selectiechecks.', href: '/thailand-street-food/', image: '/images/blog/thai-street-food-guide-2026.webp' },
            { title: 'Lumpini Hawker Centre', description: 'Combineer park, ontbijt of vroege avond met een route die op Gate 5 eindigt.', href: '/blog/bangkok-lumpini-hawker-centre-street-food-2026/', image: '/images/redesign/lumpini-hawker-hero.webp' },
          ]}
        />

        <SourceMethodSection
          title="Een cafékaart is alleen sterk met een datum"
          description="De route-opzet sluit aan op de Nederlandse keuze-intentie. Locaties en uren zijn opnieuw gecontroleerd via officiële café- en venuepagina’s. Google-scores, reviewaantallen en oude prijstabellen zijn bewust niet als selectiecriterium gebruikt. World of Coffee Bangkok staat als afgelopen evenement vermeld. Laatst gecontroleerd: 1 augustus 2026."
          sources={sources}
        />
      </div>
    </>
  );
}
