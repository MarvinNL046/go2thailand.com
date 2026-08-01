import Image from 'next/image';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  Accessibility,
  ArrowRight,
  BadgeCheck,
  Check,
  CircleHelp,
  Clock3,
  CloudRain,
  ExternalLink,
  Eye,
  MapPin,
  Navigation,
  Route,
  ShoppingBag,
  Store,
  TrainFront,
  UtensilsCrossed,
  WalletCards,
  X,
} from 'lucide-react';
import { KLOOK_GENERIC, withPlacementSubId } from '../../lib/affiliates';
import { useSubId } from '../../lib/useSubId';
import SEOHead from '../SEOHead';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav, type PageSectionNavItem } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';

const PAGE_URL = 'https://go2-thailand.com/nl/blog/jodd-fairs-bangkok-night-market-guide/';
const HERO_IMAGE = '/images/redesign/jodd-fairs-ratchada-hero.webp';
const PAGE_TITLE = 'Jodd Fairs Ratchada: locatie, tijden en bezoekplan';
const PAGE_DESCRIPTION = 'Bezoek Jodd Fairs Ratchada zonder locatieverwarring. Bekijk openingstijden, MRT-route, beste tijd, eten, betalen en een eerlijk 90-minutenplan.';

const navItems: PageSectionNavItem[] = [
  { href: '#kort', label: 'In het kort', icon: BadgeCheck },
  { href: '#route', label: 'Route', icon: TrainFront },
  { href: '#timing', label: 'Timing', icon: Clock3 },
  { href: '#eten', label: 'Eten', icon: UtensilsCrossed },
  { href: '#voor-jou', label: 'Voor jou?', icon: Eye },
  { href: '#vergelijken', label: 'Vergelijken', icon: Store },
  { href: '#vragen', label: 'Vragen', icon: CircleHelp },
];

const faqs = [
  {
    question: 'Wat is Jodd Fairs Ratchada?',
    answer: 'Jodd Fairs Ratchada is een avondmarkt aan Ratchadaphisek Road in Bangkok met eetkramen, drankjes, mode, accessoires en andere kleine winkels. Deze gids gaat uitsluitend over de Ratchada-locatie die op 31 januari 2025 opende. De markt is makkelijk per MRT te bereiken en voelt meer als een compacte, samengestelde uitgaansmarkt dan als een stille lokale buurtmarkt.',
  },
  {
    question: 'Wat is er met Jodd Fairs Rama 9 gebeurd?',
    answer: 'De voormalige Jodd Fairs bij Rama 9 sloot volgens Thailand Travel, de Japanse site van de Tourism Authority of Thailand, eind juni 2025. Oude blogs, video’s en kaartpins kunnen daardoor naar de verkeerde plek verwijzen. Zoek voor deze gids expliciet op Jodd Fairs Ratchada en navigeer naar Thailand Cultural Centre MRT, uitgang 4.',
  },
  {
    question: 'Zijn er twee Jodd Fairs-markten in Bangkok?',
    answer: 'De merknaam is in de afgelopen jaren aan meerdere locaties gekoppeld, waardoor zoekresultaten door elkaar lopen. De actuele, officieel geverifieerde locatie die wij hier behandelen is Jodd Fairs Ratchada. Controleer vóór vertrek altijd het officiële Facebook- of Instagramkanaal, vooral wanneer je een andere vestigingsnaam in een recente video ziet.',
  },
  {
    question: 'Wat zijn de openingstijden van Jodd Fairs Ratchada?',
    answer: 'De officiële communicatie noemt dagelijks 17:00 tot 01:00. Dat is een marktvenster, geen garantie dat iedere kraam vanaf het eerste tot het laatste moment volledig draait. Kom niet pas vlak voor sluiting als een bepaalde maaltijd of winkel belangrijk voor je is en controleer feestdagen of tijdelijke wijzigingen op de officiële kanalen.',
  },
  {
    question: 'Welk MRT-station ligt bij Jodd Fairs?',
    answer: 'Neem de MRT Blue Line naar Thailand Cultural Centre en gebruik uitgang 4. De officiële Jodd Fairs-post noemt deze uitgang; Thailand Travel beschrijft de wandeling als ongeveer twee minuten. Volg buiten het station de actuele looproute en niet blind een oude pin voor Rama 9.',
  },
  {
    question: 'Wat is de beste tijd om Jodd Fairs te bezoeken?',
    answer: 'Voor foto’s, overzicht en een eerste eetronde is ongeveer 17:30–18:30 meestal de prettigste planning: de markt komt op gang en je hebt nog avondlicht. Voor maximale sfeer kies je later op de avond, met meer kans op drukte. Dit zijn redactionele planningsvensters, geen officiële of live druktemetingen.',
  },
  {
    question: 'Wat kun je eten bij Jodd Fairs?',
    answer: 'Het aanbod wisselt, maar je vindt doorgaans gegrilde hapjes, noedels, zeevruchten, vleesgerechten, desserts en opvallende drankjes. Kies niet alleen op wat viraal oogt. Loop eerst een ronde, vergelijk bereiding en portiegrootte, check de prijs vóór bestellen en deel kleine porties als je meer wilt proeven.',
  },
  {
    question: 'Kun je bij Jodd Fairs met kaart betalen?',
    answer: 'Betaalmethoden verschillen per kraam. Thaise QR-betalingen zijn niet hetzelfde als een universele internationale kaartbetaling, dus neem baht in kleine coupures als back-up mee. Vraag vóór bestellen of jouw kaart wordt geaccepteerd en vertrouw niet op één betaalmethode voor de hele avond.',
  },
  {
    question: 'Is Jodd Fairs de moeite waard?',
    answer: 'Ja als je een makkelijk bereikbare, levendige avondmarkt met veel keuze en visuele energie zoekt. Minder waarschijnlijk als je vooral een rustige, uitgesproken lokale buurtmarkt, vintage specialisme of veel ruimte tussen de kramen wilt. De kracht is gemak en variatie; de keerzijde is dat het op populaire uren toeristisch en druk kan voelen.',
  },
  {
    question: 'Hoe druk is Jodd Fairs?',
    answer: 'De drukte wisselt per dag, weer, vakantieperiode en tijdstip. Smalle looppaden en populaire foodstalls kunnen later op de avond dichtlopen. Ga vroeg als je minder prikkels of meer tijd nodig hebt, spreek bij een groep een herkenbaar ontmoetingspunt af en houd je terugroute naar uitgang 4 vrij in je navigatie.',
  },
];

const sources = [
  {
    title: 'Jodd Fairs Ratchada — opening en officiële bezoekinformatie',
    creator: 'Jodd Fairs',
    url: 'https://www.facebook.com/JoddFairs/posts/come-join-us-jodd-fairs-ratchada-grand-opening-31-january-2025-%E0%B8%95%E0%B8%AD%E0%B8%81%E0%B8%A2%E0%B9%89%E0%B8%B3%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%99%E0%B8%AA%E0%B8%B8%E0%B8%94%E0%B8%A2/592580060149213/',
    note: 'Primair merkbericht voor openingsdatum, dagelijkse uren en MRT Thailand Cultural Centre uitgang 4.',
  },
  {
    title: 'Jodd Fairs',
    creator: 'Tourism Authority of Thailand — Japan',
    url: 'https://www.thailandtravel.or.jp/jodd-fairs/',
    note: 'Actueel adres, loopafstand vanaf de MRT, marktaanbod en sluiting van de voormalige Rama 9-locatie.',
  },
  {
    title: 'Talad Rot Fai Ratchada reopens',
    creator: 'AroiMakMak',
    url: 'https://aroimakmak.com/talad-rot-fai-ratchada/',
    note: 'Gedateerde achtergrond bij de heropening van Train Night Market Ratchada in maart 2026; gebruikt voor de marktvergelijking.',
  },
  {
    title: 'MRT system map and passenger information',
    creator: 'Bangkok Expressway and Metro',
    url: 'https://metro.bemplc.co.th/MRT-System-Map?lang=en',
    note: 'Officiële netwerkcontext voor de Blue Line en het plannen van de metrorit.',
  },
];

function createSchemas() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${PAGE_URL}#article`,
      headline: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      image: `https://go2-thailand.com${HERO_IMAGE}`,
      datePublished: '2026-03-17',
      dateModified: '2026-07-25',
      inLanguage: 'nl-NL',
      mainEntityOfPage: PAGE_URL,
      author: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
      publisher: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'TouristAttraction',
      '@id': `${PAGE_URL}#place`,
      name: 'Jodd Fairs Ratchada',
      description: 'Avondmarkt in Ratchada, Bangkok, met eten, drinken, mode en kleine winkels.',
      url: 'https://www.facebook.com/JoddFairs.Ratchada/',
      image: `https://go2-thailand.com${HERO_IMAGE}`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '129 Ratchadaphisek Road',
        addressLocality: 'Din Daeng, Bangkok',
        postalCode: '10400',
        addressCountry: 'TH',
      },
      openingHours: 'Mo-Su 17:00-01:00',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/nl/' },
        { '@type': 'ListItem', position: 2, name: 'Bangkok', item: 'https://go2-thailand.com/nl/city/bangkok/' },
        { '@type': 'ListItem', position: 3, name: 'Jodd Fairs Ratchada', item: PAGE_URL },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Bezoekplan voor Jodd Fairs Ratchada',
      itemListElement: [
        ['Oriënteer', 'Loop eerst een ronde en bewaar kraampjes die je interessant vindt.'],
        ['Deel en proef', 'Kies kleine of deelbare porties en controleer prijs en ingrediënten.'],
        ['Koop gericht', 'Ga terug naar je favorieten en plan daarna de route naar de MRT.'],
      ].map(([name, description], index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name,
        description,
      })),
    },
  ];
}

const planSteps = [
  {
    minutes: '0–15 min',
    title: 'Eerst kijken',
    text: 'Loop één volledige lus zonder meteen de eerste grote portie te bestellen. Let op wachtrijen, zichtbare prijzen, zitplekken en gerechten die vers worden bereid.',
    icon: Eye,
  },
  {
    minutes: '15–55 min',
    title: 'Klein delen',
    text: 'Kies één hartige basis en deel daarna kleine hapjes. Zo houd je ruimte voor iets dat je pas halverwege ontdekt en voorkom je dat één virale portie de hele avond bepaalt.',
    icon: UtensilsCrossed,
  },
  {
    minutes: '55–90 min',
    title: 'Gericht terug',
    text: 'Koop alleen de favorieten die je na de eerste ronde nog steeds wilt. Controleer je MRT-route vóór je laatste drankje en spreek bij een groep een vertrekpunt af.',
    icon: Navigation,
  },
];

export function JoddFairsRatchadaGuide() {
  const subId = useSubId();
  const foodTourHref = withPlacementSubId(KLOOK_GENERIC, subId, 'jodd-fairs-related-bangkok-food-tour');
  const schemas = createSchemas();

  return (
    <>
      <SEOHead title={PAGE_TITLE} description={PAGE_DESCRIPTION} ogImage={`https://go2-thailand.com${HERO_IMAGE}`}>
        <meta name="keywords" content="jodd fair night market, jodd fairs bangkok, jodd fairs ratchada, jodd fairs opening hours, jodd fairs new location, jodd fairs mrt" />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content="2026-03-17" />
        <meta property="article:modified_time" content="2026-07-25" />
        {schemas.map((schema, index) => <script key={`${schema['@type']}-${index}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      </SEOHead>

      <div className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          image={HERO_IMAGE}
          imageAlt="Jodd Fairs Ratchada in Bangkok met verlichte eetkramen en bezoekers in de avond"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Bangkok', href: '/city/bangkok/' }, { label: 'Jodd Fairs Ratchada' }]}
          eyebrow="De juiste markt, zonder omweg"
          title={<>Jodd Fairs<br />Ratchada.</>}
          subtitle={<>Eén avond. Geen verkeerde locatie.</>}
          description={<>De oude Rama 9-pagina’s zwerven nog door zoekresultaten. Hier vind je de actuele Ratchada-locatie, uitgang 4, een slim proefplan en een eerlijk antwoord op de vraag of deze markt bij jou past.</>}
          actions={[
            { label: 'Plan je bezoek', href: '#kort', kind: 'primary' },
            { label: 'Route vanaf MRT', href: '#route', kind: 'secondary' },
          ]}
          minHeightClassName="min-h-[820px] lg:min-h-[730px]"
          contentClassName="max-w-[680px]"
          titleClassName="max-w-[680px] text-[4.05rem] leading-[0.83] sm:text-[5.25rem] lg:text-[6.1rem]"
          subtitleClassName="max-w-[620px] text-[1.9rem] leading-[0.95] text-saffron-dark sm:text-[2.75rem]"
          imageClassName="object-cover object-[67%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.03)_0%,rgba(252,250,246,0.58)_46%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.99)_0%,rgba(252,250,246,0.92)_39%,rgba(252,250,246,0.12)_68%,rgba(18,63,54,0.18)_100%)]"
          sideCard={(
            <aside className="absolute bottom-8 right-[max(2rem,calc((100vw-1240px)/2))] z-10 hidden w-[330px] overflow-hidden rounded-2xl border border-white/50 bg-jade/91 text-white shadow-editorial-lift backdrop-blur-xl xl:block">
              <div className="flex items-center justify-between border-b border-white/12 px-5 py-4">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-saffron-light">Actueel geverifieerd</p>
                <BadgeCheck size={19} className="text-saffron-light" />
              </div>
              <dl className="grid grid-cols-[80px_1fr] gap-x-4 gap-y-3 p-5 text-[11px]">
                <dt className="text-white/52">Open</dt><dd className="font-bold">Dagelijks 17:00–01:00</dd>
                <dt className="text-white/52">MRT</dt><dd className="font-bold">Thailand Cultural Centre</dd>
                <dt className="text-white/52">Uitgang</dt><dd className="font-bold">Exit 4</dd>
                <dt className="text-white/52">Adres</dt><dd className="font-bold">129 Ratchadaphisek Road</dd>
              </dl>
              <p className="border-t border-white/12 px-5 py-4 text-[10px] font-medium leading-4 text-white/60">Controleer op de bezoekdag altijd de officiële kanalen voor tijdelijke wijzigingen.</p>
            </aside>
          )}
        />

        <PageSectionNav items={navItems} />

        <section id="kort" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom">
            <div className="grid gap-5 rounded-[26px] border border-saffron/25 bg-[#fff5e6] p-6 shadow-editorial-card sm:grid-cols-[auto_1fr] sm:p-8 lg:items-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-saffron text-white"><MapPin size={22} /></span>
              <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-saffron-dark">Locatiecheck — juli 2026</p>
                  <h2 className="mt-2 font-display text-[2rem] font-semibold leading-none text-jade">Rama 9 is gesloten. Deze gids brengt je naar Ratchada.</h2>
                  <p className="mt-3 max-w-3xl text-xs font-medium leading-6 text-charcoal/68">De voormalige Jodd Fairs Rama 9 sloot eind juni 2025. Oude video’s en kaartpins kunnen nog boven komen drijven. Gebruik daarom de volledige naam <strong>Jodd Fairs Ratchada</strong>, reis naar Thailand Cultural Centre en neem uitgang 4.</p>
                </div>
                <a href="https://www.facebook.com/JoddFairs.Ratchada/" target="_blank" rel="noopener noreferrer" className="btn-cream min-h-11 justify-center px-5 text-saffron-dark">Officieel kanaal <ExternalLink size={14} /></a>
              </div>
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-end">
              <SectionHeading
                eyebrow="Begin met een plan"
                title={<>Negentig minuten.<br />Drie goede keuzes.</>}
                description="Jodd Fairs beloont eerst oriënteren. De markt is compact genoeg voor een volledige ronde, maar druk genoeg om impulsief de eerste opvallende portie te kopen. Dit plan houdt ruimte voor vergelijken, delen en terugkeren."
              />
              <div className="grid gap-4 md:grid-cols-3">
                {planSteps.map(({ minutes, title, text, icon: Icon }) => (
                  <article key={title} className="flex min-h-[305px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                    <div className="flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/30 bg-canvas text-jade"><Icon size={20} strokeWidth={1.5} /></span>
                      <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">{minutes}</span>
                    </div>
                    <h3 className="mt-7 font-display text-[1.8rem] font-semibold leading-none text-jade">{title}</h3>
                    <p className="mt-4 text-xs font-medium leading-6 text-charcoal/66">{text}</p>
                    <span className="mt-auto pt-5 text-[10px] font-extrabold text-jade">Stap {planSteps.findIndex((step) => step.title === title) + 1} van 3</span>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="route" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div className="relative min-h-[480px] overflow-hidden rounded-[28px] shadow-editorial-lift sm:min-h-[620px]">
              <Image src="/images/redesign/jodd-fairs-ratchada-arrival.webp" alt="Route vanaf MRT Thailand Cultural Centre naar de verlichte Jodd Fairs Ratchada-markt" fill sizes="(max-width: 1024px) 100vw, 54vw" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-jade/90 via-jade/45 to-transparent p-7 pt-28 text-white">
                <p className="eyebrow !text-saffron-light">Herkenningspunt</p>
                <h2 className="max-w-xl font-display text-[2.9rem] font-semibold leading-[0.9] tracking-[-0.035em]">Uitgang 4 is je anker, niet een oude marktnaam.</h2>
              </div>
            </div>
            <div>
              <SectionHeading
                eyebrow="Zonder taxi-omweg"
                title="Van MRT naar eerste kraam"
                description={<>De Blue Line is voor de meeste bezoekers de eenvoudigste route. Je vermijdt wegverkeer en begint met één controleerbaar punt: Thailand Cultural Centre, uitgang 4. Lees onze <Link href="/blog/bangkok-public-transport-bts-mrt-tourist-guide-2026/" className="font-extrabold text-jade underline decoration-saffron/55 underline-offset-4 transition hover:text-saffron-dark">gids voor BTS en MRT in Bangkok</Link> als je onderweg tussen beide systemen moet overstappen.</>}
              />
              <ol className="mt-8 space-y-5">
                {[
                  ['Plan tot Thailand Cultural Centre', 'Controleer in je route-app dat je op de MRT Blue Line uitkomt. BTS en MRT zijn afzonderlijke systemen; een overstap kan nodig zijn.'],
                  ['Neem uitgang 4', 'Volg in het station de nummering. Deel bij een groep al vóór de poortjes af dat uitgang 4 het verzamelpunt is.'],
                  ['Controleer de volledige marktnaam', 'Zoek buiten op Jodd Fairs Ratchada. Thailand Travel beschrijft de wandeling vanaf de MRT als ongeveer twee minuten.'],
                  ['Bewaar je terugroute', 'Maak een screenshot van stationsnaam en uitgang, vooral als je later weinig bereik of batterij hebt. Kijk vóór vertrek naar de laatste passende metroverbinding.'],
                ].map(([title, text], index) => (
                  <li key={title} className="grid grid-cols-[44px_1fr] gap-4">
                    <span className="grid h-11 w-11 place-items-center rounded-full border border-saffron/40 bg-canvas font-display text-lg font-semibold text-saffron-dark">{index + 1}</span>
                    <div><h3 className="font-display text-[1.5rem] font-semibold leading-none text-jade">{title}</h3><p className="mt-2 text-xs font-medium leading-6 text-charcoal/66">{text}</p></div>
                  </li>
                ))}
              </ol>
              <div className="mt-8 rounded-2xl border border-jade/10 bg-white p-5">
                <p className="flex items-center gap-2 text-xs font-extrabold text-jade"><Route size={17} className="text-saffron" /> Taxi of Grab?</p>
                <p className="mt-2 text-xs font-medium leading-5 text-charcoal/64">Gebruik het actuele marktprofiel als bestemming en vergelijk de pin met 129 Ratchadaphisek Road. Reistijd en prijs hangen van je vertrekpunt en het verkeer af; een generiek bedrag op deze pagina zou schijnzekerheid geven.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="timing" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-end">
              <SectionHeading
                eyebrow="Kies je sfeer"
                title="Niet elk uur voelt hetzelfde"
                description="De officiële uren zijn dagelijks 17:00–01:00. Wanneer je daarbinnen komt, bepaalt of je vooral overzicht, avondenergie of een late snack krijgt. Zie dit als reisplanning, niet als live druktevoorspelling."
              />
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  ['17:00–18:30', 'Rustig opstarten', 'Goed voor oriëntatie, foto’s met restlicht en reizigers die drukte willen beperken. Niet iedere kraam hoeft bij de eerste minuut volledig klaar te zijn.', 'Beste start voor overzicht'],
                  ['18:30–21:30', 'Volle marktsfeer', 'De verlichting, foodstalls en bezoekersstroom komen samen. Dit is vaak de levendigste ervaring, met meer kans op wachtrijen en volle looppaden.', 'Beste voor energie'],
                  ['21:30–00:30', 'Later en losser', 'Handig na diner of een andere Bangkok-stop. Het aanbod kan nog ruim zijn, maar reken niet blind op ieder specifiek gerecht tot vlak voor sluiting.', 'Beste als tweede stop'],
                ].map(([time, title, text, cue], index) => (
                  <article key={time} className={`rounded-2xl border p-6 ${index === 1 ? 'border-saffron/45 bg-[#fff4df] shadow-editorial-card' : 'border-jade/10 bg-white'}`}>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">{time}</p>
                    <h3 className="mt-4 font-display text-[1.8rem] font-semibold leading-none text-jade">{title}</h3>
                    <p className="mt-4 text-xs font-medium leading-6 text-charcoal/66">{text}</p>
                    <p className="mt-6 border-t border-jade/10 pt-4 text-[10px] font-extrabold text-jade">{cue}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-10 overflow-hidden rounded-[28px] bg-jade text-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[0.62fr_1.38fr]">
                <div className="p-8 sm:p-10">
                  <p className="eyebrow !text-saffron-light">De betere avondvolgorde</p>
                  <h2 className="font-display text-[3.05rem] font-semibold leading-[0.9] tracking-[-0.04em]">Kom met trek.<br />Niet uitgehongerd.</h2>
                  <p className="mt-5 text-xs font-medium leading-6 text-white/64">Een kleine snack vooraf voorkomt dat je bij de ingang meteen een zware portie kiest. Water, een rustige eerste ronde en één gedeeld gerecht geven veel meer keuzevrijheid.</p>
                </div>
                <div className="grid gap-px bg-white/10 sm:grid-cols-3">
                  {[
                    [Eye, 'Scan', 'Bekijk aanbod, prijzen en bereiding vóór je kiest.'],
                    [UtensilsCrossed, 'Deel', 'Neem kleinere porties zodat je meerdere dingen kunt proeven.'],
                    [ShoppingBag, 'Bewaar', 'Koop souvenirs pas na je eetronde; je hoeft ze dan minder lang te dragen.'],
                  ].map(([Icon, title, text]) => {
                    const CardIcon = Icon as LucideIcon;
                    return <div key={String(title)} className="bg-jade p-8 sm:py-10"><CardIcon size={25} strokeWidth={1.4} className="text-saffron-light" /><h3 className="mt-6 font-display text-2xl font-semibold">{String(title)}</h3><p className="mt-3 text-xs leading-6 text-white/60">{String(text)}</p></div>;
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="eten" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Kies met je ogen én je hoofd"
                title="Vier filters voor je eerste hap"
                description={<>Het marktaanbod verandert. Een statische top tien raakt daarom sneller verouderd dan een goede keuzemethode. Gebruik deze vier checks bij iedere kraam, ook als een gerecht op social media beroemd is. Voor de bredere eetcontext helpt onze <Link href="/food/" className="font-extrabold text-jade underline decoration-saffron/55 underline-offset-4 transition hover:text-saffron-dark">streetfoodgids voor Thailand</Link> je kraam, foodcourt en restaurant uit elkaar te houden.</>}
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  ['Wordt het nu bereid?', 'Kies bij warme gerechten liever een kraam waar je bereiding, temperatuur en omloopsnelheid kunt zien.'],
                  ['Staat de prijs duidelijk?', 'Vraag prijs en portiegrootte vóór bestellen als het bord niet helder is. Maak geen aannames op basis van de kraam ernaast.'],
                  ['Kun je het delen?', 'Eén groot viraal gerecht kan snel vullen. Twee of drie kleine keuzes geven een betere marktproeverij.'],
                  ['Kun je ingrediënten checken?', 'Vraag apart naar pinda, schaaldieren, vissaus, ei en kruiscontact. Alleen naar “spicy” vragen dekt geen allergie.'],
                ].map(([title, text], index) => (
                  <article key={title} className="rounded-2xl border border-jade/10 bg-white p-5">
                    <span className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">Filter 0{index + 1}</span>
                    <h3 className="mt-3 font-display text-[1.45rem] font-semibold leading-none text-jade">{title}</h3>
                    <p className="mt-3 text-xs font-medium leading-5 text-charcoal/66">{text}</p>
                  </article>
                ))}
              </div>
              <div className="mt-6 grid gap-4 rounded-2xl border border-jade/10 bg-canvas p-6 sm:grid-cols-[auto_1fr]">
                <WalletCards size={27} strokeWidth={1.4} className="text-jade" />
                <div><h3 className="font-display text-xl font-semibold text-jade">Cash als back-up, QR niet als belofte</h3><p className="mt-2 text-xs font-medium leading-5 text-charcoal/65">Kaartacceptatie verschilt per verkoper. Thaise QR-betalingen werken vaak via lokale bankapps; ga er niet vanuit dat jouw buitenlandse wallet automatisch werkt. Kleine coupures en een tweede betaaloptie voorkomen een onnodige zoektocht.</p></div>
              </div>
            </div>
            <div className="relative min-h-[510px] overflow-hidden rounded-[28px] shadow-editorial-lift sm:min-h-[650px]">
              <Image src="/images/redesign/jodd-fairs-ratchada-food-choice.webp" alt="Reiziger vergelijkt vers bereide gerechten bij een foodstall op Jodd Fairs Ratchada" fill sizes="(max-width: 1024px) 100vw, 54vw" className="object-cover" />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-jade/88 p-6 text-white backdrop-blur-md sm:left-auto sm:w-[340px]">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-light">Goede marktregel</p>
                <p className="mt-2 font-display text-[1.8rem] font-semibold leading-none">Bekijk één ronde. Kies daarna pas.</p>
                <p className="mt-3 text-[10px] font-medium leading-5 text-white/62">Populariteit is een signaal, geen garantie voor smaak, allergenen of prijs-kwaliteit.</p>
              </div>
            </div>
          </div>

          <div className="container-custom mt-12">
            <div className="grid gap-8 rounded-[26px] border border-jade/10 bg-white p-7 shadow-editorial-card sm:p-9 lg:grid-cols-[0.66fr_1.34fr]">
              <div>
                <p className="eyebrow">Wie reist er mee?</p>
                <h2 className="font-display text-[2.8rem] font-semibold leading-[0.92] tracking-[-0.035em] text-jade">Dezelfde markt vraagt een ander ritme.</h2>
                <p className="mt-5 text-sm font-medium leading-7 text-charcoal/65">Een goed bezoekplan draait niet alleen om eten. Groepsgrootte, prikkels, mobiliteit en dieetwensen bepalen waar je afspreekt, hoeveel je tegelijk bestelt en wanneer je besluit door te gaan.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <article className="border-l-2 border-saffron/55 pl-5">
                  <h3 className="font-display text-[1.45rem] font-semibold text-jade">Alleen op pad</h3>
                  <p className="mt-2 text-xs font-medium leading-6 text-charcoal/64">Bewaar de stationnaam offline, draag je tas aan de voorkant in dichte passages en kies porties die je echt op krijgt. Alleen reizen maakt omkeren makkelijk: voelt een gang te druk, loop dan eerst langs de buitenrand en kom later terug. Laat één persoon thuis weten wanneer je ongeveer terug bent, zonder van een levendige markt automatisch een onveilige plek te maken.</p>
                </article>
                <article className="border-l-2 border-saffron/55 pl-5">
                  <h3 className="font-display text-[1.45rem] font-semibold text-jade">Met z’n tweeën</h3>
                  <p className="mt-2 text-xs font-medium leading-6 text-charcoal/64">Dit is de eenvoudigste vorm voor een proefroute: één haalt een drankje terwijl de ander een tafel of rustige rand bewaakt, daarna deel je twee kleine gerechten. Spreek wel af dat niemand zonder overleg een enorme virale portie bestelt. Gebruik een foto van de kraamnaam wanneer je later wilt terugkeren; rijen met vergelijkbare luifels lijken na zonsondergang snel op elkaar.</p>
                </article>
                <article className="border-l-2 border-saffron/55 pl-5">
                  <h3 className="font-display text-[1.45rem] font-semibold text-jade">Met een groep</h3>
                  <p className="mt-2 text-xs font-medium leading-6 text-charcoal/64">Kies uitgang 4 als eerste verzamelpunt en een vaste, herkenbare plek op de markt als tweede. Verdeel geen geldpot zonder overzicht; laat iedere besteller prijs en allergenen voor zijn of haar gerecht controleren. Grote groepen blokkeren makkelijk een smal pad, dus bespreek keuzes aan de zijkant en splits tijdelijk op. Deel live locatie alleen als iedereen daarmee instemt.</p>
                </article>
                <article className="border-l-2 border-saffron/55 pl-5">
                  <h3 className="font-display text-[1.45rem] font-semibold text-jade">Met kinderen of weinig energie</h3>
                  <p className="mt-2 text-xs font-medium leading-6 text-charcoal/64">Ga vroeg, beperk het bezoek tot één ronde en identificeer zitruimte vóór je eten haalt. Houd hete grills, uitstekende tafels en onverwachte kabelranden in het oog. Spreek een harde eindtijd af in plaats van “nog één kraam”. Een korte geslaagde marktstop is waardevoller dan een lang bezoek waarin honger, hitte en geluid alle beslissingen tegelijk moeilijk maken.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="voor-jou" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow">Een eerlijker antwoord dan “must visit”</p>
              <h2 className="font-display text-[3.4rem] font-semibold leading-[0.9] tracking-[-0.04em] text-jade sm:text-[4.2rem]">Is Jodd Fairs<br />de moeite waard?</h2>
              <p className="mx-auto mt-6 max-w-2xl text-sm font-medium leading-7 text-charcoal/68">De markt is niet voor iedere Bangkok-reiziger de beste keuze. Hij is sterk wanneer bereikbaarheid, variatie en avondsfeer zwaar wegen. Voor rust, vintage of een uitgesproken buurtgevoel zijn er betere kandidaten; vergelijk dan onze <Link href="/blog/night-markets-food-lovers-bangkok-chiang-mai-phuket/" className="font-extrabold text-jade underline decoration-saffron/55 underline-offset-4 transition hover:text-saffron-dark">beste nachtmarkten van Bangkok</Link> op sfeer en ligging.</p>
            </div>
            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              <article className="rounded-[26px] border border-jade/12 bg-jade p-7 text-white sm:p-9">
                <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-full bg-saffron text-white"><Check size={20} /></span><h3 className="font-display text-[2.1rem] font-semibold">Wel voor jou</h3></div>
                <ul className="mt-7 space-y-4 text-sm font-medium leading-6 text-white/72">
                  <li className="flex gap-3"><Check size={17} className="mt-1 shrink-0 text-saffron-light" />Je wilt een eerste nachtmarkt die eenvoudig per MRT te bereiken is.</li>
                  <li className="flex gap-3"><Check size={17} className="mt-1 shrink-0 text-saffron-light" />Je reist met mensen die verschillende dingen willen eten en bekijken.</li>
                  <li className="flex gap-3"><Check size={17} className="mt-1 shrink-0 text-saffron-light" />Je houdt van verlichting, levendigheid en fotogenieke foodstalls.</li>
                  <li className="flex gap-3"><Check size={17} className="mt-1 shrink-0 text-saffron-light" />Je combineert de markt met Ratchada of een stop aan de Blue Line.</li>
                </ul>
              </article>
              <article className="rounded-[26px] border border-jade/10 bg-white p-7 sm:p-9">
                <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-full border border-saffron/35 bg-canvas text-saffron-dark"><X size={20} /></span><h3 className="font-display text-[2.1rem] font-semibold text-jade">Waarschijnlijk niet</h3></div>
                <ul className="mt-7 space-y-4 text-sm font-medium leading-6 text-charcoal/68">
                  <li className="flex gap-3"><X size={17} className="mt-1 shrink-0 text-saffron-dark" />Je zoekt vooral een stille lokale markt waar toerisme nauwelijks zichtbaar is.</li>
                  <li className="flex gap-3"><X size={17} className="mt-1 shrink-0 text-saffron-dark" />Je wilt hoofdzakelijk vintage, antiek of één specialistische productcategorie.</li>
                  <li className="flex gap-3"><X size={17} className="mt-1 shrink-0 text-saffron-dark" />Je vindt dichte bezoekersstromen of visuele drukte snel vermoeiend.</li>
                  <li className="flex gap-3"><X size={17} className="mt-1 shrink-0 text-saffron-dark" />Je hebt maar één avond en een andere markt sluit duidelijk beter aan op je route.</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section id="vergelijken" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-start">
              <SectionHeading
                eyebrow="Zelfde stad, andere bedoeling"
                title="Welke markt past beter?"
                description="Ratchada heeft sinds maart 2026 opnieuw twee marktverhalen in hetzelfde bredere gebied. Jodd Fairs en Train Night Market zijn geen twee namen voor exact dezelfde markt. Kies op ervaring, niet op een oude foto of blogtitel."
              />
              <div className="overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card">
                <div className="hidden grid-cols-[1.05fr_1fr_1fr] bg-jade px-6 py-4 text-[9px] font-extrabold uppercase tracking-[0.14em] text-white sm:grid">
                  <span>Markt</span><span>Sterk als je zoekt</span><span>Let op</span>
                </div>
                {[
                  ['Jodd Fairs Ratchada', 'Eenvoudige MRT-route, veel foodkeuze en een energieke eerste nachtmarkt.', 'Toeristisch en compact; piekuren kunnen druk voelen.'],
                  ['Train Night Market Ratchada', 'De in maart 2026 heropende Ratchada-ervaring en een alternatief in hetzelfde uitgaansgebied.', 'Controleer actuele dagen, uren en locatie vóór vertrek; deze pagina is niet de owner daarvan.'],
                  ['Srinakarin Train Night Market', 'Een grotere avond uit met retro-, vintage- en marktgevoel als reistijd minder zwaar weegt.', 'Verder van het centrum; behandel vervoer en sluitingstijd als apart reisplan.'],
                  ['Chatuchak Weekend Market', 'Overdag zeer breed winkelen en gericht zoeken per productzone.', 'Weekendritme, hitte en schaal vragen een andere aanpak dan een compacte avondmarkt.'],
                ].map(([name, fit, caveat]) => (
                  <article key={name} className="grid gap-3 border-t border-jade/10 px-6 py-5 first:border-t-0 sm:grid-cols-[1.05fr_1fr_1fr] sm:gap-6">
                    <h3 className="font-display text-[1.35rem] font-semibold leading-none text-jade">{name}</h3>
                    <p className="text-xs font-medium leading-5 text-charcoal/66"><span className="mb-1 block text-[8px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark sm:hidden">Sterk als je zoekt</span>{fit}</p>
                    <p className="text-xs font-medium leading-5 text-charcoal/58"><span className="mb-1 block text-[8px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark sm:hidden">Let op</span>{caveat}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.58fr_1.42fr]">
              <SectionHeading
                eyebrow="Praktisch vóór vertrek"
                title="Kleine checks, veel rust"
                description="Een nachtmarkt is geen gecontroleerde restaurantzaal. Weer, geluid, zitruimte, ondergrond en betaalmogelijkheden kunnen per avond en kraam verschillen. Plan daarom op wat je zelf kunt beïnvloeden."
              />
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  [CloudRain, 'Regen en hitte', 'Draag lichte kleding, drink voldoende en neem bij regen een compacte oplossing mee. Wacht een zware bui zo nodig uit in een vast gebouw en houd elektronica droog.'],
                  [Accessibility, 'Toegankelijkheid', 'Reken op drukke, soms smalle looproutes, beperkte zitruimte en drempels of kabelafdekking. Vroeg gaan helpt, maar is geen volledige toegankelijkheidsgarantie.'],
                  [UtensilsCrossed, 'Hygiëne en allergenen', 'Kies zichtbare bereiding en goede omloop. Bespreek ernstige allergenen vóór je bestelt; gedeelde tangen, olie, grills en werkbladen kunnen kruiscontact veroorzaken.'],
                  [WalletCards, 'Geld en telefoon', 'Neem kleine coupures, een tweede betaaloptie en genoeg batterij voor je MRT-route mee. Bewaar waardevolle spullen gesloten en zichtbaar aan de voorkant in drukke gangen.'],
                ].map(([Icon, title, text]) => {
                  const PracticalIcon = Icon as LucideIcon;
                  return (
                    <article key={String(title)} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                      <span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/30 bg-canvas text-jade"><PracticalIcon size={21} strokeWidth={1.45} /></span>
                      <h3 className="mt-6 font-display text-[1.6rem] font-semibold leading-none text-jade">{String(title)}</h3>
                      <p className="mt-3 text-xs font-medium leading-6 text-charcoal/66">{String(text)}</p>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="mt-10 grid gap-5 rounded-[26px] border border-jade/10 bg-[#f3eee3] p-7 sm:p-9 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
              <div><p className="eyebrow">Bewuste affiliatekeuze</p><h2 className="font-display text-[2.7rem] font-semibold leading-[0.92] tracking-[-0.035em] text-jade">Geen onnodige productcarrousel tussen jou en de route.</h2></div>
              <div><p className="text-sm font-medium leading-7 text-charcoal/70">Voor deze pagina hebben we Amazon OneLink expliciet beoordeeld. Een willekeurige poncho, powerbank of tas beantwoordt niet de hoofdvraag: waar ligt Jodd Fairs Ratchada en hoe bezoek je de markt slim? Daarom plaatsen we hier geen geforceerde Amazon-producten. Relevante reisgear komt op onze aparte inpak- en productowners via gecontroleerde <strong>/go/</strong>-routes, met lokale OneLink-doorsturing en duidelijke disclosure.</p><Link href="/travel-guides/" className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-jade transition hover:text-saffron-dark">Bekijk alle praktische reisgidsen <ArrowRight size={14} className="text-saffron" /></Link></div>
            </div>
          </div>
        </section>

        <FaqSplitSection
          eyebrow="Echte zoekvragen"
          title="Veelgestelde vragen over Jodd Fairs"
          description="De antwoorden hieronder volgen actuele locatiegegevens en vragen die werkelijk rond Jodd Fairs in de zoekresultaten verschijnen."
          items={faqs}
        />

        <RelatedGuidesSection
          eyebrow="Verder door Bangkok"
          title="Maak van één markt een goede avond"
          guides={[
            { title: 'Bangkok nachtmarkten', description: 'Vergelijk de belangrijkste avondmarkten op sfeer, ligging en reisintentie.', href: '/blog/night-markets-food-lovers-bangkok-chiang-mai-phuket/', image: HERO_IMAGE, imageAlt: 'Verlichte nachtmarkt in Bangkok' },
            { title: 'Streetfood in Bangkok', description: 'Kies wijken, gerechten en foodroutes zonder alle foodvragen op één markt te stapelen.', href: '/blog/beste-streetfood-bangkok-wijken-plekken-proeven/', image: '/images/redesign/jodd-fairs-ratchada-food-choice.webp', imageAlt: 'Kiezen bij een Bangkokse streetfoodkraam' },
            { title: 'MRT en BTS uitgelegd', description: 'Plan overstappen, betaalwijze en terugreis door Bangkok met minder onzekerheid.', href: '/blog/bangkok-public-transport-bts-mrt-tourist-guide-2026/', image: '/images/redesign/jodd-fairs-ratchada-arrival.webp', imageAlt: 'Aankomst per MRT bij een Bangkokse avondmarkt' },
          ]}
          sideLink={{ label: 'Bekijk Bangkok-foodtours op Klook', href: foodTourHref, affiliate: true }}
          disclosure="De Klook-link gaat naar foodtours in Bangkok en is geen ticket voor Jodd Fairs. Bij een boeking kunnen wij commissie ontvangen; de drie gidskaarten zijn redactionele interne links."
        />

        <SourceMethodSection
          eyebrow="Bronnen & redactionele methode"
          title="Actuele locatie boven oude viraliteit"
          description="Deze owner combineert officiële locatie- en openingstijdeninformatie met zelfstandige DataForSEO-keyword-, ranking-, SERP-, concurrentie- en PAA-analyse. Veranderlijke zaken zoals kraamaanbod, drukte en betaalwijze formuleren we bewust als keuzes en controles, niet als eeuwige garanties. Laatste inhoudelijke controle: 25 juli 2026."
          sources={sources}
        />

        <section className="py-12 lg:py-16">
          <div className="container-custom">
            <div className="flex flex-col gap-5 rounded-2xl border border-jade/10 bg-white p-7 sm:flex-row sm:items-center sm:justify-between">
              <div><p className="eyebrow">Klaar voor Ratchada?</p><h2 className="font-display text-[2.6rem] font-semibold leading-none text-jade">Bewaar uitgang 4. Loop eerst één ronde.</h2></div>
              <div className="flex flex-wrap gap-3"><a href="#route" className="btn-jade btn-jade-pattern group min-h-12 px-6">Bekijk de route <ArrowRight size={15} className="text-saffron" /></a><Link href="/city/bangkok/" className="btn-cream min-h-12 px-6 text-saffron-dark">Plan Bangkok <MapPin size={15} /></Link></div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
