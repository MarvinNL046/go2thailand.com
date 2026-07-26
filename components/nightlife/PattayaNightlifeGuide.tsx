import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  CircleHelp,
  Clock3,
  ExternalLink,
  Eye,
  GlassWater,
  Hotel,
  MapPin,
  MapPinned,
  Martini,
  Music2,
  Navigation,
  Phone,
  ReceiptText,
  Route,
  ShieldCheck,
  Sparkles,
  Sun,
  Ticket,
  Users,
  WalletCards,
  Waves,
  Zap,
} from 'lucide-react';
import { cityAffiliates, KLOOK_GENERIC, withPlacementSubId } from '../../lib/affiliates';
import { useSubId } from '../../lib/useSubId';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav, type PageSectionNavItem } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';

const PAGE_URL = 'https://go2-thailand.com/nl/nightlife/pattaya/';
const PAGE_TITLE = 'Nachtleven Pattaya: gebieden, regels en veilige avondroute';
const PAGE_DESCRIPTION = 'Kies het Pattaya-nachtleven dat bij je past: Walking Street, Soi Buakhao, Jomtien of een geplande show. Met actuele regels, kostencheck en veilige terugrit.';
const HERO_IMAGE = '/images/redesign/pattaya-nightlife-hero.webp';

const sectionNav: PageSectionNavItem[] = [
  { href: '#kiezen', label: 'Kies je sfeer', icon: Sparkles },
  { href: '#route', label: 'Avondroute', icon: Route },
  { href: '#kosten', label: 'Kosten', icon: WalletCards },
  { href: '#regels', label: 'Regels', icon: BadgeCheck },
  { href: '#veilig', label: 'Veilig terug', icon: ShieldCheck },
  { href: '#boeken', label: 'Shows', icon: Ticket },
  { href: '#vragen', label: 'Vragen', icon: CircleHelp },
];

interface NightMood {
  icon: LucideIcon;
  name: string;
  cue: string;
  fits: string;
  expect: string;
  check: string;
}

const nightMoods: NightMood[] = [
  {
    icon: Music2,
    name: 'Walking Street',
    cue: 'Maximale prikkels',
    fits: 'Je wilt de bekendste strip één keer ervaren, met clubs, live muziek en zichtbaar adult entertainment.',
    expect: 'Drukte, harde muziek, promoters en sterk wisselende venues. Je kunt de straat bekijken zonder iedere zaak binnen te gaan.',
    check: 'Kies vooraf één type venue en een eindtijd; laat de neonstraat niet automatisch je hele avond bepalen.',
  },
  {
    icon: GlassWater,
    name: 'Soi Buakhao & LK Metro',
    cue: 'Compacte barhop',
    fits: 'Je zoekt sportbars, open bars, eten en een dichter lokaal straatritme op korte afstand van elkaar.',
    expect: 'Een lange, levendige verkeersstraat met zijstraten en eveneens veel volwassen entertainment.',
    check: 'Smal wegprofiel en druk verkeer maken gedachteloos oversteken en telefoongebruik op straat een slechte combinatie.',
  },
  {
    icon: Waves,
    name: 'Jomtien',
    cue: 'Rustiger en inclusiever',
    fits: 'Je wilt strandrestaurants, casual bars of de LGBTQ+-scene rond Jomtien Complex zonder Walking Street als middelpunt.',
    expect: 'Meer spreiding en doorgaans een lager tempo; de exacte sfeer verandert sterk per straat en avond.',
    check: 'Controleer de laatste posts van de gekozen venue en plan de terugrit, want Jomtien ligt buiten het compacte centrumcluster.',
  },
  {
    icon: Sun,
    name: 'Sunset, rooftop of show',
    cue: 'Geplande avond',
    fits: 'Je reist als stel, groep of gezin en wilt een duidelijke starttijd, zitplaats of rustiger uitzicht boven barhoppen.',
    expect: 'Een sunsetbar, hotellounge of cabaretvoorstelling maakt de avond voorspelbaarder, maar kan reservering of dresscode vragen.',
    check: 'Vergelijk datum, locatie, zaal of venue, zitcategorie, duur, inbegrepen onderdelen en annuleringsvoorwaarden.',
  },
];

const routeSteps = [
  { time: '18:30', title: 'Eet vóór de drukte', text: 'Kies een concrete dinerplek in of vlak bij je avondgebied. Zo begin je niet hongerig aan losse drank- en straatkeuzes.', icon: Sun },
  { time: '20:00', title: 'Test één sfeer', text: 'Loop eerst een korte ronde. Een straat bekijken verplicht je niet om een venue binnen te gaan of een aanbod te accepteren.', icon: Eye },
  { time: '22:00', title: 'Blijf of wissel bewust', text: 'Past de sfeer? Blijf in hetzelfde compacte gebied. Past hij niet? Kies één alternatief en voorkom een nacht vol taxiritten.', icon: Route },
  { time: 'Vooraf', title: 'Leg je terugrit vast', text: 'Sla hoteladres, ophaalpunt en noodnummer op vóór je batterij laag is en de groep uit elkaar raakt.', icon: Navigation },
];

const venueChecks = [
  { label: 'Open?', title: 'Recente activiteit', text: 'Zoek een recente officiële post, agenda of boekbare datum. Een oude review bewijst niet dat de venue nog dezelfde naam of formule heeft.' },
  { label: 'Wat koop je?', title: 'Prijs vóór bestelling', text: 'Lees menu, entree, zitcategorie, minimum spend en inbegrepen drankje voordat je bestelt of betaalt.' },
  { label: 'Waar precies?', title: 'Pin + ophaalpunt', text: 'Vergelijk kaartpin met de officiële contactpagina en spreek een goed verlicht terughaalpunt af buiten de drukste doorgang.' },
];

const faqs = [
  { question: 'Wat is de belangrijkste uitgaansstraat in Pattaya?', answer: 'Walking Street aan het zuidelijke einde van Beach Road is de bekendste uitgaansstraat. Je vindt er clubs, live muziek, restaurants en adult entertainment. Dat maakt haar de bekendste, niet automatisch de beste keuze. Voor een compactere barhop past Soi Buakhao met LK Metro vaak beter; voor een rustiger avond Jomtien of een geplande show.' },
  { question: 'Is het veilig om ’s nachts in Pattaya te wandelen?', answer: 'Veel reizigers lopen ’s avonds door de centrale uitgaansgebieden, maar risicovrij is dat niet. TAT waarschuwt specifiek voor zakkenrollers in de drukte van Walking Street. Houd telefoon en portemonnee uit het zicht, loop via verlichte routes, steek drukke wegen bewust over en plan een betrouwbare terugrit. Bel Tourist Police 1155 als je hulp of vertaling nodig hebt.' },
  { question: 'Wat moet je vermijden tijdens het uitgaan in Pattaya?', answer: 'Vermijd aanbiedingen zonder duidelijke prijs, een open rekening die je pas aan het einde bekijkt, je paspoort als borg, drugs en zelf rijden na alcohol. Laat je drankje niet onbeheerd achter en ga niet mee naar een andere locatie als je die keuze niet zelf en nuchter hebt gemaakt.' },
  { question: 'Hoe ziet het nachtleven in Pattaya eruit?', answer: 'Pattaya combineert zeer zichtbaar volwassen entertainment met clubs, live muziek, sportbars, cabaret, rooftopbars, strandrestaurants en rustige avondmarkten. De ervaring hangt daardoor meer af van je gekozen gebied dan van de stad als geheel.' },
  { question: 'Hoe laat begint Walking Street Pattaya?', answer: 'De straat krijgt vanaf de avond steeds meer activiteit en is later op de avond het drukst. Er bestaat geen betrouwbaar universeel begintijdstip voor alle venues. Plan rond een actuele reservering of officiële venue-informatie en gebruik een vroege wandeling om de sfeer te beoordelen.' },
  { question: 'Hoe laat sluiten clubs in Pattaya?', answer: 'Dat verschilt per vergunning, gebied, dag en venue. Gelicentieerde entertainmentlocaties in aangewezen gebieden in Chon Buri kunnen onder de aparte 04:00-regel vallen, maar dat betekent niet dat iedere club of bar tot 04:00 open mag of daadwerkelijk openblijft. Controleer de locatie op dezelfde dag.' },
  { question: 'Wat kost een avond uit in Pattaya?', answer: 'Er is geen betrouwbaar vast bedrag. Bouw je budget uit vier posten: heen- en terugvervoer, eten, drank of alcoholvrij alternatief, en eventuele entree of showstoel. Controleer iedere prijs vóór bestelling en houd een buffer voor een gewijzigde terugrit; oude online prijslijsten zijn geen garantie.' },
  { question: 'Waar staat Pattaya om bekend bij volwassenen?', answer: 'Pattaya staat internationaal bekend om zichtbaar adult entertainment, vooral rond Walking Street en bepaalde sois. De stad heeft daarnaast live muziek, clubs, cabaret, rooftops, strandbars en avondmarkten. Je kunt volwassen entertainment grotendeels vermijden door je gebied en venue vooraf te kiezen.' },
  { question: 'Welk deel van Pattaya is het beste voor nachtleven?', answer: 'Walking Street past bij maximale energie en een eerste kennismaking; Soi Buakhao en LK Metro bij compacte barhop; Jomtien bij een rustiger of inclusiever avondritme; een rooftop, hotellounge of cabaret bij een geplande avond. “Beste” hangt dus af van sfeer, groep, geluidstolerantie en terugroute.' },
  { question: 'Waar staat Soi Buakhao om bekend?', answer: 'Soi Buakhao is een circa 1,7 kilometer lange centrale straat tussen Second en Third Road, met eten, diensten, bars en vele zijstraten. LK Metro ligt aan deze zone. Het gebied is compact maar verkeersdruk en bevat ook volwassen entertainment; behandel het niet als een rustig voetgangersgebied.' },
];

const sources = [
  { title: 'Alcohol sales and consumption rules updated in Thailand', creator: 'TAT Newsroom · 29 mei 2026', url: 'https://www.tatnews.org/2026/05/alcohol-sales-and-consumption-rules-updated-in-thailand-what-tourists-need-to-know/', note: 'Primaire toerisme-uitleg van de actuele algemene verkoopuren, minimumleeftijd, uitzonderingen en tijdelijke restricties.' },
  { title: 'Entertainment venues in tourist destinations to open until 4 am', creator: 'TAT Newsroom', url: 'https://www.tatnews.org/2023/12/entertainment-venues-in-thai-tourist-destinations-to-open-until-4-am/', note: 'Bron voor de beperkte 04:00-regel: alleen gelicentieerde entertainmentvenues in aangewezen gebieden, waaronder Chon Buri.' },
  { title: 'Pattaya destination information', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Destinations/Provinces/Pattaya/469', note: 'Officiële destinationbron die het brede avondaanbod noemt en specifiek waarschuwt voor zakkenrollers op druk Walking Street.' },
  { title: 'Reisadvies Thailand', creator: 'NederlandWereldwijd · 24 juli 2026', url: 'https://www.nederlandwereldwijd.nl/reisadvies/thailand', note: 'Actuele Nederlandse bron voor criminaliteit, verkeer, scooterdekking, drugsregels en voorbereiding.' },
  { title: 'Tourist Police 1155', creator: 'Thailand Tourist Police Bureau', url: 'https://www.touristpolice.go.th/main', note: 'Officiële bron voor 24/7 hulp, meertalige ondersteuning en het noodnummer 1155.' },
  { title: 'Pattaya Nightlife Guide 2026', creator: 'Pattaya Pointer · secundair', url: 'https://pattayapointer.com/guides/pattaya-nightlife-guide/', note: 'Recente marktbron gebruikt om de verschillende avondtypes en veranderlijkheid van venues te toetsen; prijzen en rankings zijn niet als waarheid overgenomen.' },
];

function createSchemas() {
  return [
    {
      '@context': 'https://schema.org', '@type': 'Article', '@id': `${PAGE_URL}#article`, headline: PAGE_TITLE,
      description: PAGE_DESCRIPTION, image: `https://go2-thailand.com${HERO_IMAGE}`, datePublished: '2026-03-10', dateModified: '2026-07-25',
      inLanguage: 'nl-NL', mainEntityOfPage: PAGE_URL,
      author: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
      publisher: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
    },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/nl/' },
        { '@type': 'ListItem', position: 2, name: 'Nachtleven', item: 'https://go2-thailand.com/nl/nightlife/' },
        { '@type': 'ListItem', position: 3, name: 'Pattaya', item: PAGE_URL },
      ],
    },
    { '@context': 'https://schema.org', '@type': 'HowTo', name: 'Zo plan je een avond uit in Pattaya', step: routeSteps.map((step, index) => ({ '@type': 'HowToStep', position: index + 1, name: step.title, text: step.text })) },
    { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Vier avondtypes in Pattaya', itemListElement: nightMoods.map((mood, index) => ({ '@type': 'ListItem', position: index + 1, name: mood.name, description: mood.fits })) },
  ];
}

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="font-extrabold text-jade underline decoration-saffron/45 underline-offset-4 transition hover:text-saffron-dark">{children}</Link>;
}

export function PattayaNightlifeGuide() {
  const subId = useSubId();
  const klookHref = withPlacementSubId(cityAffiliates.pattaya?.klook || KLOOK_GENERIC, subId, 'pattaya-nightlife-organised-evening');
  const schemas = createSchemas();

  return (
    <>
      <SEOHead title={PAGE_TITLE} description={PAGE_DESCRIPTION} ogImage={`https://go2-thailand.com${HERO_IMAGE}`}>
        <meta name="keywords" content="pattaya nightlife, nightlife pattaya, uitgaan pattaya, walking street pattaya, pattaya bars, pattaya clubs, soi buakhao nightlife" />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content="2026-03-10" />
        <meta property="article:modified_time" content="2026-07-25" />
        {schemas.map((schema, index) => <script key={`${schema['@type']}-${index}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      </SEOHead>

      <div className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          eyebrow="Pattaya na zonsondergang"
          title={<>Kies je avond.<br />Niet alleen een straat.</>}
          subtitle="Van volle neon tot een rustige tafel aan zee."
          description={<>Walking Street is de bekendste naam, maar Pattaya heeft meerdere nachtlandschappen. Kies eerst sfeer en gebied; leg daarna budget, venuecheck en terugrit vast. Zo blijft de avond van jou.</>}
          image={HERO_IMAGE}
          imageAlt="Redactioneel sfeerbeeld van volwassen reizigers langs Pattaya Bay bij zonsondergang"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Nachtleven', href: '/nightlife/' }, { label: 'Pattaya' }]}
          actions={[
            { label: 'Kies je avondtype', href: '#kiezen', kind: 'primary' },
            { label: 'Plan je terugrit', href: '#veilig', kind: 'secondary' },
          ]}
          minHeightClassName="min-h-[890px] lg:min-h-[735px]"
          contentClassName="max-w-[735px]"
          titleClassName="max-w-[760px] text-[3.55rem] leading-[0.86] sm:text-[4.7rem] lg:text-[5.5rem]"
          subtitleClassName="max-w-[650px] text-[1.45rem] leading-[1.04] text-saffron-dark sm:text-[1.95rem]"
          imageClassName="object-cover object-[67%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.02)_0%,rgba(252,250,246,0.78)_52%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.98)_0%,rgba(252,250,246,0.91)_39%,rgba(5,36,32,0.1)_67%,rgba(5,27,24,0.03)_100%)]"
          sideCard={(
            <div className="absolute bottom-8 right-[5vw] z-20 hidden w-[340px] overflow-hidden rounded-[26px] border border-white/65 bg-canvas/94 shadow-editorial-lift backdrop-blur-xl lg:block">
              <div className="flex items-center justify-between border-b border-jade/10 px-6 py-5"><p className="eyebrow !mb-0">Avondpaspoort · juli 2026</p><Martini size={19} className="text-jade" /></div>
              <div className="space-y-4 p-6 text-xs">
                <div className="flex justify-between gap-4"><span className="text-charcoal/50">Gebieden</span><strong className="text-right text-jade">4 verschillende ritmes</strong></div>
                <div className="flex justify-between gap-4"><span className="text-charcoal/50">Algemene verkoop</span><strong className="text-right text-jade">11:00–24:00</strong></div>
                <div className="flex justify-between gap-4"><span className="text-charcoal/50">Minimumleeftijd</span><strong className="text-right text-jade">20 jaar</strong></div>
                <div className="flex justify-between gap-4"><span className="text-charcoal/50">Hulp</span><strong className="text-right text-saffron-dark">Tourist Police 1155</strong></div>
              </div>
            </div>
          )}
        />

        <PageSectionNav items={sectionNav} />

        <section className="section-divider-bottom bg-canvas py-7">
          <div className="container-custom grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: MapPin, label: 'Eerst kiezen', value: 'Gebied vóór venue' },
              { icon: ReceiptText, label: 'Voor bestellen', value: 'Prijs en inclusies' },
              { icon: Navigation, label: 'Voor vertrek', value: 'Ophaalpunt opslaan' },
              { icon: Phone, label: 'Bij hulp', value: 'Bel 1155' },
            ].map(({ icon: Icon, label, value }) => <div key={label} className="flex items-center gap-4 border-l border-jade/12 pl-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-jade/[0.06] text-jade"><Icon size={18} /></span><div><p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">{label}</p><p className="mt-1 text-xs font-extrabold text-jade">{value}</p></div></div>)}
          </div>
        </section>

        <section id="kiezen" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid items-end gap-10 lg:grid-cols-[0.7fr_1.3fr]">
              <SectionHeading eyebrow="Vier avonden in één stad" title="Walking Street is een keuze, geen samenvatting." description="De meest bruikbare vraag is niet welke club online nummer één staat, maar welke hoeveelheid geluid, drukte, volwassen entertainment en verplaatsing je wilt." />
              <div className="relative aspect-[4/3] overflow-hidden rounded-[30px] bg-jade shadow-editorial-lift">
                <Image src="/images/redesign/pattaya-nightlife-moods.webp" alt="Redactionele sfeercompositie van vier soorten avondleven in Pattaya" fill sizes="(max-width: 1024px) 100vw, 65vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#052b25]/68 via-transparent to-transparent" />
                <div className="absolute inset-x-5 bottom-5 flex flex-wrap gap-2 sm:inset-x-7 sm:bottom-7">{nightMoods.map((mood) => <span key={mood.name} className="rounded-full border border-white/25 bg-[#062f29]/72 px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.12em] text-white backdrop-blur">{mood.name}</span>)}</div>
              </div>
            </div>

            <div className="mt-12 divide-y divide-jade/10 border-y border-jade/10">
              {nightMoods.map(({ icon: Icon, name, cue, fits, expect, check }, index) => (
                <article key={name} className="grid gap-5 py-7 sm:grid-cols-[54px_190px_1fr] lg:grid-cols-[64px_235px_1fr_1fr] lg:items-start">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-saffron/25 bg-saffron/[0.07] text-saffron-dark"><Icon size={22} /></span>
                  <div><p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">0{index + 1} · {cue}</p><h3 className="mt-2 font-display text-[1.75rem] font-semibold leading-none text-jade">{name}</h3></div>
                  <div><p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-jade/45">Past bij</p><p className="mt-2 text-xs font-medium leading-6 text-charcoal/68">{fits}</p><p className="mt-3 text-xs font-medium leading-6 text-charcoal/56 lg:hidden">{expect}</p></div>
                  <div className="hidden lg:block"><p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-jade/45">Verwachting + check</p><p className="mt-2 text-xs font-medium leading-6 text-charcoal/68">{expect}</p><p className="mt-2 text-[11px] font-extrabold leading-5 text-jade">{check}</p></div>
                </article>
              ))}
            </div>
            <p className="mt-7 max-w-3xl text-sm font-medium leading-7 text-charcoal/65">Wil je Pattaya eerst als bestemming begrijpen? De <InlineLink href="/city/pattaya/">complete Pattaya-gids</InlineLink> zet strand, wijken, vervoer en dagactiviteiten naast het avondleven. De landelijke <InlineLink href="/nightlife/">Thailand-nachtlevenvergelijking</InlineLink> helpt wanneer je nog tussen steden kiest.</p>

            <div className="mt-16 grid overflow-hidden rounded-[30px] border border-jade/10 bg-white shadow-editorial-lift lg:grid-cols-[0.78fr_1.22fr]">
              <div className="bg-[#0a3932] p-8 text-white sm:p-11">
                <p className="eyebrow !text-saffron-light">Zonder verkeerde verwachting</p>
                <h2 className="font-display text-[3.15rem] font-semibold leading-[0.88] tracking-[-0.035em]">Grenzen horen bij je route, niet pas bij de deur.</h2>
                <p className="mt-5 text-sm font-medium leading-7 text-white/66">Volwassen entertainment is in delen van Pattaya zichtbaar vanaf de straat. Je hoeft niets binnen te gaan, niets te kopen en geen uitnodiging te accepteren. Een beleefd en duidelijk “no, thank you” is voldoende.</p>
                <p className="mt-4 text-sm font-medium leading-7 text-white/58">Wie dit liever niet tegenkomt, kiest geen willekeurige barhop door Walking Street, Soi 6 of LK Metro. Een sunsetrestaurant, hotellounge, avondmarkt of vooraf geselecteerde show geeft meer controle over setting, duur en publiek.</p>
              </div>
              <div className="divide-y divide-jade/10 p-7 sm:p-10">
                {[
                  { number: '01', title: 'Alleen de straat bekijken', text: 'Loop één volledige ronde voordat je een venue kiest. Blijf in de openbare doorloop, reageer niet op elk aanbod en maak vooraf duidelijk of je groep alleen sfeer en live muziek zoekt. Dat voorkomt dat de luidste promoter je avondroute bepaalt.' },
                  { number: '02', title: 'Binnen: prijs, foto en grens eerst', text: 'Vraag vóór bestelling naar menu, entree, minimum spend en wat fotograferen of filmen wel en niet mag. Respecteer performers en personeel; een betaling koopt geen toestemming voor aanraking, opname, privégegevens of een vervolglocatie.' },
                  { number: '03', title: 'Als stel, solo of groep', text: 'Stellen kiezen samen welk type venue comfortabel voelt. Soloreizigers delen geen kamernummer en houden hun eigen terugrit. Groepen spreken een ontmoetingspunt en vertrektijd af en laten niemand zonder bewuste check alleen achter.' },
                  { number: '04', title: 'Met kinderen of onder 20', text: 'De wettelijke drinkleeftijd is 20 en venues kunnen strengere toegangseisen hanteren. Kies voor gezinnen een vroege markt, restaurant, cabaret of andere vooraf gecontroleerde show; behandel een bekende uitgaansstraat niet automatisch als familieattractie.' },
                ].map((item) => <article key={item.number} className="grid gap-3 py-6 sm:grid-cols-[52px_190px_1fr]"><span className="font-display text-2xl font-semibold text-saffron-dark">{item.number}</span><h3 className="text-sm font-extrabold text-jade">{item.title}</h3><p className="text-xs font-medium leading-6 text-charcoal/63">{item.text}</p></article>)}
              </div>
            </div>
          </div>
        </section>

        <section id="route" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
              <SectionHeading eyebrow="Eén avond, één hoofdlijn" title="Van zonsondergang naar een bekende terugrit." description="De sterkste Pattaya-avond stapelt niet zoveel mogelijk adressen. Hij heeft één sfeerkeuze, één beslismoment en een einde dat al vóór de eerste bestelling bekend is." />
              <div className="relative pt-2">
                <div className="absolute left-6 top-8 h-[calc(100%-4rem)] border-l-2 border-dashed border-saffron/55 lg:left-0 lg:right-0 lg:top-10 lg:h-0 lg:border-l-0 lg:border-t-2" />
                <div className="grid gap-4 lg:grid-cols-4">
                  {routeSteps.map(({ time, title, text, icon: Icon }, index) => <article key={title} className="relative ml-12 rounded-2xl border border-jade/10 bg-white p-5 shadow-editorial-card lg:ml-0 lg:mt-7"><span className="absolute -left-[2.55rem] top-6 grid h-7 w-7 place-items-center rounded-full border-4 border-tonal bg-saffron text-[9px] font-black text-white lg:-top-[2.55rem] lg:left-5">{index + 1}</span><Icon size={20} className="text-jade" /><p className="mt-4 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{time}</p><h3 className="mt-2 font-display text-[1.5rem] font-semibold leading-none text-jade">{title}</h3><p className="mt-3 text-[11px] font-medium leading-5 text-charcoal/62">{text}</p></article>)}
                </div>
              </div>
            </div>

            <div className="mt-14 overflow-hidden rounded-[28px] bg-jade text-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
                <div className="p-8 sm:p-10"><p className="eyebrow !text-saffron-light">De 60-seconden venuecheck</p><h2 className="font-display text-[3rem] font-semibold leading-[0.9] tracking-[-0.035em]">Een naam in een lijst is nog geen avondplan.</h2><p className="mt-5 text-sm font-medium leading-7 text-white/62">Pattaya-venues sluiten, verhuizen en rebranden. Controleer deze drie signalen op dezelfde dag; bel of vraag je hotel bij twijfel.</p></div>
                <div className="grid gap-3 bg-white/[0.055] p-7 sm:grid-cols-3 sm:p-9">{venueChecks.map((item, index) => <article key={item.title} className="rounded-2xl border border-white/14 bg-white/[0.06] p-5"><span className="grid h-8 w-8 place-items-center rounded-full bg-saffron text-xs font-black text-jade">{index + 1}</span><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-light">{item.label}</p><h3 className="mt-2 font-display text-[1.45rem] font-semibold">{item.title}</h3><p className="mt-3 text-[11px] leading-5 text-white/58">{item.text}</p></article>)}</div>
              </div>
            </div>
          </div>
        </section>

        <section id="kosten" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <SectionHeading eyebrow="Budget zonder schijnzekerheid" title="Vier posten. Geen magisch nachtbedrag." description="Online prijsartikelen verouderen snel en verschillende venuecategorieën zijn niet vergelijkbaar. Werk daarom met een eigen plafond en controleer iedere stap vóór je bestelt." />
              <div className="mt-8 rounded-2xl border border-saffron/25 bg-saffron/[0.07] p-6"><ReceiptText size={22} className="text-saffron-dark" /><p className="mt-4 text-sm font-extrabold text-jade">Open geen onduidelijke eindafrekening.</p><p className="mt-2 text-xs font-medium leading-6 text-charcoal/64">Vraag om een menu, houd je rekening per ronde bij en bespreek een fout direct en rustig. Een goedkoop lokaanbod zonder volledige prijs is geen budgetstrategie.</p></div>
            </div>
            <div className="overflow-hidden rounded-[28px] border border-jade/10 bg-white shadow-editorial-lift">
              {[
                { icon: Navigation, label: '01 · Vervoer', title: 'Heen én terug', text: 'Bekijk de live appprijs of spreek het songthaew-/taxitarief vóór vertrek af. Reserveer een hogere terugritbuffer voor laat, regen of een ander ophaalpunt.' },
                { icon: GlassWater, label: '02 · Consumpties', title: 'Menuprijs per ronde', text: 'Kies alcoholvrij of alcohol op je eigen grens. Controleer service, maat en promotievoorwaarden; ga niet uit van een oud online gemiddelde.' },
                { icon: Ticket, label: '03 · Entree of show', title: 'Wat is inbegrepen?', text: 'Vergelijk stoel, duur, inbegrepen drankje, transfer, foto- of servicekosten en annuleringsvoorwaarden voordat je betaalt.' },
                { icon: WalletCards, label: '04 · Buffer', title: 'Minstens één planwijziging', text: 'Houd ruimte voor een andere terugrit, extra maaltijd of vroeg vertrek. Bewaar betaalmiddel en noodreserve niet op dezelfde plek.' },
              ].map(({ icon: Icon, label, title, text }) => <article key={label} className="grid gap-4 border-b border-jade/10 p-6 last:border-b-0 sm:grid-cols-[42px_170px_1fr] sm:items-center"><span className="grid h-10 w-10 place-items-center rounded-xl bg-jade/[0.06] text-jade"><Icon size={19} /></span><div><p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{label}</p><h3 className="mt-1 font-display text-[1.45rem] font-semibold leading-none text-jade">{title}</h3></div><p className="text-xs font-medium leading-6 text-charcoal/62">{text}</p></article>)}
            </div>
          </div>
        </section>

        <section id="regels" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><SectionHeading eyebrow="Regels gecontroleerd op 25 juli 2026" title="Openingstijd is niet hetzelfde als verkooptijd." description="Landelijke verkoopregels, een entertainmentvergunning en de feitelijke opening van één venue zijn drie verschillende lagen." /><a href="https://www.tatnews.org/2026/05/alcohol-sales-and-consumption-rules-updated-in-thailand-what-tourists-need-to-know/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-extrabold text-jade">Lees de officiële TAT-update <ExternalLink size={14} /></a></div>
            <div className="mt-10 grid gap-px overflow-hidden rounded-[28px] border border-jade/10 bg-jade/10 md:grid-cols-4">
              {[
                { icon: Clock3, value: '11:00–24:00', title: 'Algemene alcoholverkoop', text: 'Sinds 29 mei 2026 is ook 14:00–17:00 onderdeel van het reguliere toegestane tijdvak.' },
                { icon: Users, value: '20 jaar', title: 'Wettelijke minimumleeftijd', text: 'Een venue kan om identificatie vragen. Draag liever een veilige kopie dan je paspoort tijdens barhoppen.' },
                { icon: BadgeCheck, value: 'Alleen met voorwaarden', title: 'Mogelijk tot 04:00', text: 'De aparte regel geldt voor gelicentieerde entertainmentvenues in aangewezen gebieden, niet automatisch voor iedere zaak.' },
                { icon: CalendarClock, value: 'Check de datum', title: 'Tijdelijke beperkingen', text: 'Verkiezingen, belangrijke religieuze dagen en officiële besluiten kunnen verkoop of entertainment beperken.' },
              ].map(({ icon: Icon, value, title, text }) => <article key={title} className="bg-white p-7"><Icon size={22} className="text-saffron-dark" /><p className="mt-7 font-display text-[1.8rem] font-semibold text-jade">{value}</p><h3 className="mt-2 text-xs font-extrabold text-jade">{title}</h3><p className="mt-3 text-[11px] font-medium leading-5 text-charcoal/60">{text}</p></article>)}
            </div>
            <p className="mt-6 text-xs font-medium leading-6 text-charcoal/58">Een open venue is geen bewijs dat iedere verkoop of activiteit daar legaal is. Volg personeel en lokale autoriteiten, koop alleen bij gelicentieerde zaken en controleer een tijdgevoelige regel opnieuw op je bezoekdag.</p>
          </div>
        </section>

        <section id="veilig" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
              <SectionHeading eyebrow="Vóór de eerste rit" title="Vijf dingen staan om 17:00 al vast." description="Een veilige terugroute wordt niet beter door meer waarschuwingen tijdens de nacht. Maak de beslissingen die denkwerk vragen voordat je vertrekt." />
              <div className="divide-y divide-jade/10 border-y border-jade/10">
                {[
                  { label: 'Hotelkaart', text: 'Bewaar naam, adres en kaartpin ook als screenshot. Een Engelse hotelnaam alleen is niet altijd genoeg voor een chauffeur of omstander.' },
                  { label: 'Groepsafspraak', text: 'Kies één ontmoetingspunt en één moment waarop iedereen expliciet laat weten alleen of samen terug te gaan. Stil verdwijnen is geen planwijziging.' },
                  { label: 'Ophaalzone', text: 'Leg een verlichte plek buiten de drukste loop- en verkeersstroom vast. Controleer kenteken en bestemming voordat je instapt.' },
                  { label: 'Noodroute', text: 'Zet Tourist Police 1155 en hotelreceptie bij je favorieten. Bij direct gevaar bel je de Thaise politie via 191.' },
                  { label: 'Weer + beperking', text: 'Controleer buien, een eventuele alcoholvrije dag, verkiezingsbeperking en de actuele venuepost. Een gewijzigde avond is beter dan een oud screenshot volgen.' },
                ].map((item, index) => <div key={item.label} className="grid gap-3 py-5 sm:grid-cols-[46px_150px_1fr]"><span className="font-display text-xl font-semibold text-saffron-dark">0{index + 1}</span><p className="text-xs font-extrabold text-jade">{item.label}</p><p className="text-xs font-medium leading-6 text-charcoal/63">{item.text}</p></div>)}
              </div>
            </div>

            <div className="relative mt-14 min-h-[470px] overflow-hidden rounded-[30px] bg-jade shadow-editorial-lift">
              <Image src="/images/redesign/pattaya-nightlife-return-route.webp" alt="Redactioneel sfeerbeeld van volwassen reizigers die ’s avonds een terugrit controleren aan de Pattaya-waterkant" fill sizes="100vw" className="object-cover object-[67%_center]" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,31,27,0.96)_0%,rgba(3,31,27,0.78)_38%,rgba(3,31,27,0.08)_75%)]" />
              <div className="relative z-10 flex min-h-[470px] max-w-[650px] flex-col justify-center p-8 text-white sm:p-12"><p className="eyebrow !text-saffron-light">Je laatste keuze maak je als eerste</p><h2 className="font-display text-[3.2rem] font-semibold leading-[0.88] tracking-[-0.035em] sm:text-[4rem]">Sla de route naar huis op vóór de avond begint.</h2><p className="mt-5 max-w-[560px] text-sm font-medium leading-7 text-white/68">Hotelnaam in het Thais, kaartpin, afgesproken ophaalpunt en Tourist Police 1155 horen al offline op je telefoon te staan. Rijd na alcohol niet zelf op een scooter of motor.</p><Link href="/practical-info/scams-safety/" className="btn-cream mt-7 w-fit">Bekijk scams & veiligheid <ArrowRight size={15} /></Link></div>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { icon: Eye, title: 'In de drukte', text: 'TAT noemt zakkenrollers specifiek op Walking Street. Houd waardevolle spullen voor je lichaam en gebruik je telefoon niet midden in de loopstroom.' },
                  { icon: ReceiptText, title: 'Aan de bar', text: 'Bestel alleen met een zichtbare prijs, houd de rekening per ronde bij en laat een drankje niet onbeheerd achter.' },
                  { icon: Navigation, title: 'Op straat', text: 'Soi Buakhao is geen voetgangersgebied. Kijk op bij oversteken en kies een helder ophaalpunt buiten de drukste doorgang.' },
                  { icon: ShieldCheck, title: 'Bij een probleem', text: 'Ga naar een goed verlichte plek, vraag venue- of hotelpersoneel om hulp en bel Tourist Police 1155 voor meertalige ondersteuning.' },
                ].map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><Icon size={21} className="text-jade" /><h3 className="mt-5 font-display text-[1.55rem] font-semibold text-jade">{title}</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/63">{text}</p></article>)}
              </div>
              <aside className="flex flex-col rounded-[26px] bg-[#082f29] p-7 text-white shadow-editorial-lift sm:p-9"><Zap size={25} className="text-saffron-light" /><p className="eyebrow mt-7 !text-saffron-light">Functionele avondkit</p><h2 className="font-display text-[2.55rem] font-semibold leading-[0.9]">Reserve-energie voor je route, niet voor een langere nacht.</h2><p className="mt-5 text-sm font-medium leading-7 text-white/62">Een compacte powerbank kan helpen bij navigatie en je geboekte terugrit. Hij vervangt geen offline adres, groepsafspraak of nuchtere vervoerskeuze.</p><a href="/go/anker-powercore-10k/" target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-7 inline-flex min-h-12 items-center justify-between rounded-xl border border-white/16 bg-white/[0.08] px-5 text-xs font-extrabold transition hover:border-saffron/45 hover:bg-white/[0.11]">Bekijk een compacte powerbank <ExternalLink size={15} className="text-saffron-light" /></a><AffiliateDisclosure className="mt-4 !text-white/54">Amazon-affiliatelink via onze centrale OneLink-route. Als Amazon-partner verdienen wij aan in aanmerking komende aankopen, zonder extra kosten voor jou. Product, batterijregels, prijs, verkoper en lokale beschikbaarheid kunnen verschillen.</AffiliateDisclosure></aside>
            </div>
          </div>
        </section>

        <section id="boeken" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="overflow-hidden rounded-[30px] bg-jade text-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                <div className="p-8 sm:p-11"><p className="eyebrow !text-saffron-light">Een vaste starttijd kan rust geven</p><h2 className="font-display text-[3.1rem] font-semibold leading-[0.9] tracking-[-0.035em]">Vergelijk een georganiseerde show als alternatief voor barhoppen.</h2><p className="mt-5 text-sm font-medium leading-7 text-white/64">Cabaret en andere avondactiviteiten kunnen een duidelijke locatie, duur en zitcategorie geven. De Klook-link opent het actuele Pattaya-aanbod; hij is geen garantie dat een specifiek product of tijdslot beschikbaar is.</p><a href={klookHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-cream mt-7">Bekijk actuele avondactiviteiten <ExternalLink size={15} /></a><AffiliateDisclosure className="mt-4 !text-white/54">Klook-affiliatelink. Controleer productnaam, aanbieder, datum, locatie, leeftijdsregels, zitcategorie, transfer, inclusies en annulering opnieuw vóór betaling.</AffiliateDisclosure></div>
                <div className="grid gap-3 bg-white/[0.055] p-7 sm:grid-cols-2 sm:p-10">
                  {[
                    { icon: MapPinned, title: 'Exacte locatie', text: 'Pattaya en Jomtien worden in zoekresultaten makkelijk door elkaar gehaald.' },
                    { icon: Clock3, title: 'Start + eindtijd', text: 'Gebruik de actuele voucher, niet een tijd uit een oud blog of screenshot.' },
                    { icon: Ticket, title: 'Stoel en inclusies', text: 'Standaard, VIP, foto, transfer en drank zijn verschillende producten.' },
                    { icon: Hotel, title: 'Route vanaf je verblijf', text: 'Kies daarna pas een hotelgebied dat ook overdag bij je reis past.' },
                  ].map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl border border-white/14 bg-white/[0.06] p-5"><Icon size={21} className="text-saffron-light" /><h3 className="mt-5 font-display text-[1.45rem] font-semibold">{title}</h3><p className="mt-3 text-[11px] leading-5 text-white/58">{text}</p></article>)}
                </div>
              </div>
            </div>
            <p className="mt-7 text-sm font-medium leading-7 text-charcoal/62">Wil je dicht bij je gekozen avondgebied slapen zonder de rest van je reis verkeerd vast te zetten? Gebruik eerst de <InlineLink href="/best-hotels/pattaya/">Pattaya-hotelgids per wijk</InlineLink>; daar hoort de vergelijking van verblijven en Trip.com pas logisch in de funnel.</p>
          </div>
        </section>

        <FaqSplitSection id="vragen" eyebrow="Echte vragen uit de zoekresultaten" title="Veelgestelde vragen over Pattaya-nachtleven" description="De antwoorden vermijden sensationele adult-content en tijdloze clubclaims. Ze helpen je een gebied, regel, budget en terugroute controleren op je eigen bezoekdag." items={faqs} />

        <RelatedGuidesSection
          eyebrow="Bouw Pattaya rond meer dan één avond"
          title="Overdag, verblijf en weer"
          guides={[
            { title: 'Pattaya compleet', description: 'Kies strand, wijk, vervoer en dagritme voordat nachtleven je hele bestemming definieert.', href: '/city/pattaya/', image: '/images/redesign/pattaya-destination-hero.webp' },
            { title: 'Waar verblijven?', description: 'Vergelijk Pattaya-wijken op strand, rust, bereikbaarheid en avondroute.', href: '/best-hotels/pattaya/', image: '/images/redesign/pattaya-seafood-coast.webp' },
            { title: 'Pattaya bezienswaardigheden', description: 'Vul je dagen met kust, cultuur en uitstapjes in plaats van alleen late avonden.', href: '/city/pattaya/attractions/', image: '/images/cities/pattaya/pattaya-sanctuary-truth.webp' },
          ]}
        />

        <SourceMethodSection
          title="Een actuele regel weegt zwaarder dan een oude clubranglijst"
          description="DataForSEO bepaalde de Nederlandse gebieds-, kosten-, openingsuren-, club-, Walking Street-, Soi Buakhao- en veiligheidsintentie en legde de echte PAA vast. Officiële TAT-, Tourist Police- en NederlandWereldwijd-bronnen dragen de regels en veiligheidsgrenzen. Secundaire nightlifebronnen zijn alleen gebruikt om avondtypes en informatiegaten te toetsen. Vaste prijzen, vermeende universele sluitingstijden, absolute veiligheidslabels en vluchtige clubrankings zijn verwijderd. Laatst gecontroleerd: 25 juli 2026."
          sources={sources}
        />
      </div>
    </>
  );
}
