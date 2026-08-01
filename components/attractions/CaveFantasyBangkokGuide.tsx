import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  CircleHelp,
  Clock3,
  ExternalLink,
  Eye,
  Footprints,
  HeartPulse,
  MapPin,
  Route,
  ShieldCheck,
  Sparkles,
  Ticket,
  TrainFront,
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

const PAGE_URL = 'https://go2-thailand.com/nl/blog/cave-fantasy-mbk-center-bangkok-immersive-art-2026/';
const PAGE_TITLE = 'Cave Fantasy Bangkok: tickets, route en eerlijke keuzehulp';
const PAGE_DESCRIPTION = 'Kies tussen Fantasy Space, Flight Theater en de combo bij Cave Fantasy in MBK Bangkok. Met BTS-route, actuele uren, kindchecks en ticketadvies.';
const HERO_IMAGE = '/images/redesign/editorial/cave-fantasy-mbk-center-bangkok-immersive-art-2026-hero.webp';

const navItems: PageSectionNavItem[] = [
  { href: '#kiezen', label: 'Kies je ticket', icon: Ticket },
  { href: '#binnen', label: 'Wat zie je?', icon: Sparkles },
  { href: '#kinderen', label: 'Met kinderen', icon: Users },
  { href: '#route', label: 'Zo kom je er', icon: Route },
  { href: '#praktisch', label: 'Praktisch', icon: BadgeCheck },
  { href: '#vragen', label: 'Vragen', icon: CircleHelp },
];

interface TicketChoice {
  icon: LucideIcon;
  label: string;
  title: string;
  time: string;
  bestFor: string;
  expectation: string;
  check: string;
}

const ticketChoices: TicketChoice[] = [
  {
    icon: Sparkles,
    label: 'Rustig verkennen',
    title: 'Fantasy Space',
    time: 'Reken circa 45–90 minuten',
    bestFor: 'Foto’s, projecties, kinderen die zelf willen bewegen en bezoekers die geen bewegende rit nodig hebben.',
    expectation: 'De listing verdeelt Fantasy Space over acht thematische zones. Je loopt zelf en bepaalt grotendeels je eigen tempo.',
    check: 'Controleer welke zones op jouw datum inbegrepen zijn en hoe laat de laatste toegang is.',
  },
  {
    icon: Waves,
    label: 'Kort en bewegend',
    title: 'Flight Theater',
    time: 'Aparte korte ervaring',
    bestFor: 'Bezoekers die een gesimuleerde vlucht en een duidelijk attractiemoment zoeken.',
    expectation: 'Dit is geen extra galerijwandeling maar een bewegingsgerichte theaterervaring met visuele effecten.',
    check: 'Minimumlengte en gezondheidswaarschuwingen gelden; controleer de productvoorwaarden vóór boeken.',
  },
  {
    icon: Ticket,
    label: 'Volledige eerste keer',
    title: 'Combo',
    time: 'Plan 1–2 uur plus buffer',
    bestFor: 'Wie zeker weet dat zowel vrije fotografie als de Flight-ervaring bij het gezelschap passen.',
    expectation: 'Je combineert de wandelzones met het theater. Dat maakt de ervaring completer, maar niet automatisch beter voor iedere bezoeker.',
    check: 'Vergelijk inclusies, start- of geldigheidsmoment, wijziging, annulering en re-entry op de concrete voucher.',
  },
];

const faqs = [
  { question: 'Waar ligt Cave Fantasy in Bangkok?', answer: 'Cave Fantasy ligt in MBK Center op verdieping 4, Zone A, ruimte 4K-103. Reis met de BTS Silom Line naar National Stadium (W1), neem Exit 3 of 4 en volg de korte skywalk naar het winkelcentrum. Controleer binnen de actuele directory of bewegwijzering.' },
  { question: 'Wat is Cave Fantasy Bangkok precies?', answer: 'Het is een commerciële, fotogerichte immersive experience met licht, projecties, interactieve elementen en een afzonderlijke Flight Theater-optie. Het is geen traditioneel museum met een kunsthistorische collectie. Verwacht entertainment en beeldwerelden, niet dezelfde inhoud als BACC, MOCA of DIB Bangkok.' },
  { question: 'Heeft Cave Fantasy acht of negen ruimtes?', answer: 'Marketingteksten gebruiken verschillende tellingen. De actuele Klook-combo beschrijft acht thematische zones binnen Fantasy Space plus het afzonderlijke Flight Theater. Zie “negen” daarom als totaalervaring, niet als garantie dat negen vrije galerijen in ieder ticket zitten.' },
  { question: 'Hoe lang duurt Cave Fantasy Bangkok?', answer: 'De ticketlisting adviseert 1–2 uur voor de volledige ervaring. Alleen Fantasy Space kan voor snelle bezoekers korter duren; met kinderen, foto’s en de Flight-combo is extra buffer verstandig. Plan geen krappe volgende reservering direct erachter.' },
  { question: 'Wat zijn de openingstijden van Cave Fantasy?', answer: 'De officiële MBK-directory vermeldde op 1 augustus 2026 dagelijks 10:00–22:00 voor Cave Fantasy. Producturen, laatste toegang en zonebeschikbaarheid kunnen afwijken, dus controleer je bezoekdatum bij MBK en de gekozen ticketaanbieder.' },
  { question: 'Is Cave Fantasy geschikt voor kinderen?', answer: 'Voor kinderen die van projecties, kleur, spiegels en interactieve vloeren houden kan Fantasy Space goed passen. Klook vermeldt gratis toegang tot en met 90 cm, volwassen tarief vanaf 140 cm en minimaal 100 cm voor Flight Theater. Controleer altijd de actuele voorwaarden en begeleid kinderen in donkere of spiegelende zones.' },
  { question: 'Voor wie is Flight Theater minder geschikt?', answer: 'De ticketvoorwaarden raden Flight Theater onder meer af bij bepaalde medische aandoeningen, zwangerschap en voor senioren. Ook bij bewegingsziekte, duizeligheid of sterke prikkelgevoeligheid is eerst navragen verstandig. Dit is productinformatie, geen medisch advies; sla de rit over bij twijfel.' },
  { question: 'Mag je foto’s maken in Cave Fantasy?', answer: 'Persoonlijke fotografie is volgens de listing toegestaan, maar commerciële opnames en livestreaming niet. Volg personeel en borden, blokkeer geen doorgangen en dim je scherm wanneer dat anderen helpt. Een fotozone is geen uitnodiging om andere bezoekers ongevraagd herkenbaar vast te leggen.' },
  { question: 'Is Cave Fantasy Bangkok de moeite waard?', answer: 'Ja als je een compacte, airconditioned en fotogerichte attractie in Siam zoekt. Minder waarschijnlijk als je vooral een inhoudelijk kunstmuseum, rustige galerie of lange thrill ride verwacht. De waarde hangt daarom meer af van productfit dan van een universele reviewscore.' },
  { question: 'Wat kun je combineren met Cave Fantasy en MBK?', answer: 'BACC ligt bij hetzelfde National Stadium-knooppunt en vormt een inhoudelijk contrast. Je kunt ook lunchen of shoppen in MBK en later via Siam verder. Houd Chatuchak, Wat Arun of een verre riverside-stop buiten dezelfde halve dag; die voegen onnodige reistijd toe.' },
];

const sources = [
  { title: 'Cave Fantasy directory', creator: 'MBK Center', url: 'https://www.mbk-center.co.th/directory/shop/Cave-Fantasy/', note: 'Primaire locatiebron: verdieping 4, Zone A, ruimte 4K-103 en positionering als 3D immersive experience.' },
  { title: 'Entertainment at MBK Center', creator: 'MBK Center', url: 'https://www.mbk-center.co.th/en/zone/entertainment-zone/', note: 'Officieel entertainmentoverzicht en dagelijkse malluren.' },
  { title: 'How to go to MBK Center', creator: 'MBK Center', url: 'https://www.mbk-center.co.th/en/howtogo/', note: 'Primaire BTS-, MRT-, boot-, bus- en taxiroute; National Stadium is direct verbonden.' },
  { title: 'Cave Fantasy ticket', creator: 'Klook', url: 'https://www.klook.com/activity/195002-cave-fantasy-ticket-bangkok/', note: 'Actuele productvarianten, zones, duur, uren, lengtecriteria, re-entry en bezoekersvoorwaarden; gecontroleerd 1 augustus 2026.' },
  { title: 'Cave Fantasy ticket overview', creator: 'ThaiPass', url: 'https://www.thethaipass.com/activities/thailand-bangkok/cave-fantasy-bangkok', note: 'Aanvullende commerciële productbeschrijving; duur en inclusies altijd live controleren.' },
  { title: 'Cave Fantasy attraction overview', creator: 'Trip.com', url: 'https://us.trip.com/travel-guide/attraction/bangkok/cave-fantasy-154000935/', note: 'Aanvullende venuebeschrijving; niet gebruikt voor vaste scores of prijzen.' },
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
      '@context': 'https://schema.org', '@type': 'TouristAttraction', name: 'Cave Fantasy Bangkok', url: PAGE_URL,
      description: PAGE_DESCRIPTION, image: `https://go2-thailand.com${HERO_IMAGE}`,
      address: { '@type': 'PostalAddress', streetAddress: 'MBK Center, 444 Phayathai Road, verdieping 4, Zone A', addressLocality: 'Bangkok', postalCode: '10330', addressCountry: 'TH' },
      touristType: ['Families', 'Fotografieliefhebbers', 'Bezoekers die een indoor activiteit zoeken'],
    },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/nl/' },
        { '@type': 'ListItem', position: 2, name: 'Bangkok', item: 'https://go2-thailand.com/nl/city/bangkok/' },
        { '@type': 'ListItem', position: 3, name: 'Cave Fantasy Bangkok', item: PAGE_URL },
      ],
    },
    {
      '@context': 'https://schema.org', '@type': 'HowTo', name: 'Zo bezoek je Cave Fantasy via BTS',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Reis naar National Stadium', text: 'Neem de BTS Silom Line naar National Stadium W1; stap bij Siam over als je van de Sukhumvit-lijn komt.' },
        { '@type': 'HowToStep', position: 2, name: 'Volg de skywalk naar MBK', text: 'Gebruik Exit 3 of 4 en loop via de korte overdekte verbinding naar MBK Center.' },
        { '@type': 'HowToStep', position: 3, name: 'Ga naar verdieping 4, Zone A', text: 'Zoek ruimte 4K-103 en controleer de productbalie en toegangstijd op je voucher.' },
        { '@type': 'HowToStep', position: 4, name: 'Kies je bezoekritme', text: 'Begin met Fantasy Space en voeg Flight Theater alleen toe als lengte, gezondheid en bewegingsgevoeligheid passen.' },
      ],
    },
  ];
}

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="font-extrabold text-jade underline decoration-saffron/45 underline-offset-4 transition hover:text-saffron-dark">{children}</Link>;
}

export function CaveFantasyBangkokGuide() {
  const subId = useSubId();
  const ticketHref = withPlacementSubId(KLOOK_GENERIC, subId, 'cave-fantasy-ticket-check');
  const schemas = createSchemas();

  return (
    <>
      <SEOHead title={PAGE_TITLE} description={PAGE_DESCRIPTION} ogImage={`https://go2-thailand.com${HERO_IMAGE}`}>
        <meta name="keywords" content="cave fantasy bangkok, cave fantasy mbk, cave fantasy tickets, immersive art bangkok, digitaal museum bangkok, indoor activiteit bangkok" />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content="2026-03-22" />
        <meta property="article:modified_time" content="2026-08-01" />
        {schemas.map((schema, index) => <script key={`${schema['@type']}-${index}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      </SEOHead>
      <div className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          eyebrow="Een lichtwereld op verdieping vier"
          title={<>Cave Fantasy<br />Bangkok.</>}
          subtitle="Kies de ruimte die bij je past."
          description="Geen vluchtige hypepagina, maar een praktische keuze tussen Fantasy Space, Flight Theater en de combo — met BTS-route, kindchecks en actuele voorwaarden."
          image={HERO_IMAGE}
          imageAlt="Gezin verkent een redactionele immersieve lichtgrot als sfeerbeeld voor Cave Fantasy Bangkok"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Bangkok', href: '/city/bangkok/' }, { label: 'Cave Fantasy' }]}
          actions={[
            { label: 'Kies je ticket', href: '#kiezen', kind: 'primary' },
            { label: 'Plan de BTS-route', href: '#route', kind: 'secondary' },
          ]}
          minHeightClassName="min-h-[850px] lg:min-h-[720px]"
          contentClassName="max-w-[690px]"
          titleClassName="max-w-[700px] text-[3.9rem] leading-[0.84] sm:text-[5rem] lg:text-[5.45rem]"
          subtitleClassName="max-w-[620px] text-[1.65rem] leading-[1] text-saffron-dark sm:text-[2.25rem]"
          imageClassName="object-cover object-[72%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.02)_0%,rgba(252,250,246,0.72)_49%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.97)_0%,rgba(252,250,246,0.84)_38%,rgba(7,39,34,0.1)_61%,rgba(5,27,24,0.06)_100%)]"
          sideCard={
            <div className="rounded-2xl border border-white/25 bg-canvas/94 p-6 text-jade shadow-editorial-lift backdrop-blur-xl">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-dark">Bezoekkaart · 1 augustus 2026</p>
              <dl className="mt-5 grid gap-3 text-xs font-bold">
                <div className="flex justify-between gap-4 border-b border-jade/10 pb-3"><dt className="text-charcoal/45">Locatie</dt><dd className="text-right">MBK · 4F · Zone A</dd></div>
                <div className="flex justify-between gap-4 border-b border-jade/10 pb-3"><dt className="text-charcoal/45">BTS</dt><dd className="text-right">National Stadium</dd></div>
                <div className="flex justify-between gap-4 border-b border-jade/10 pb-3"><dt className="text-charcoal/45">Tijd</dt><dd className="text-right">Plan 1–2 uur</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-charcoal/45">Keuze</dt><dd className="text-right text-saffron-dark">Space · Flight · combo</dd></div>
              </dl>
              <p className="mt-5 text-[10px] font-medium leading-5 text-charcoal/48">Uren, prijs en inclusies zijn datumgevoelig. Controleer je concrete product vlak voor boeken en opnieuw op de bezoekdag.</p>
            </div>
          }
        />

        <PageSectionNav items={navItems} />

        <section id="kiezen" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-end">
              <SectionHeading eyebrow="Koop niet automatisch de combo" title={<>Drie tickets,<br />drie andere verwachtingen</>} />
              <div className="max-w-3xl text-sm font-medium leading-7 text-charcoal/66">
                <p>Cave Fantasy wordt vaak als één attractie verkocht, maar de belangrijkste beslissing zit in het product. Fantasy Space is een vrije wandeling door licht- en fotowerelden. Flight Theater is een korte bewegende ervaring. De combo voegt beide samen.</p>
                <p className="mt-4">Kies eerst voor wie je boekt en hoe gevoelig het gezelschap is voor beweging, donkerte, spiegels en geluid. Open daarna pas de actuele ticketpagina. Zo voorkom je dat de hoogste bundelprijs je keuze maakt.</p>
              </div>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {ticketChoices.map(({ icon: Icon, label, title, time, bestFor, expectation, check }, index) => (
                <article key={title} className={`overflow-hidden rounded-[26px] border shadow-editorial-card ${index === 2 ? 'border-saffron/30 bg-[#fff4df]' : 'border-jade/10 bg-white'}`}>
                  <div className="bg-jade p-6 text-white">
                    <div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-white/16 bg-white/8"><Icon size={21} /></span><span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-light">Keuze 0{index + 1}</span></div>
                    <p className="mt-6 text-[9px] font-extrabold uppercase tracking-[0.14em] text-white/48">{label}</p>
                    <h2 className="mt-2 font-display text-[2.4rem] font-semibold leading-none">{title}</h2>
                    <p className="mt-3 text-xs font-bold text-saffron-light">{time}</p>
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-medium leading-6 text-charcoal/64">{bestFor}</p>
                    <p className="mt-5 border-l-2 border-saffron/55 pl-4 text-xs font-medium leading-6 text-charcoal/64">{expectation}</p>
                    <p className="mt-5 flex gap-2 text-[10px] font-bold leading-5 text-jade"><BadgeCheck size={16} className="mt-0.5 shrink-0 text-saffron" />{check}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="binnen" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
              <div className="relative min-h-[520px] overflow-hidden rounded-[30px] shadow-editorial-lift lg:min-h-[650px]">
                <Image src="/images/redesign/cave-fantasy-interactive.webp" alt="Redactioneel sfeerbeeld van een gezin in een interactieve oceaanprojectie" fill sizes="(max-width: 1024px) 100vw, 52vw" className="object-cover" />
                <span className="absolute bottom-5 left-5 rounded-full border border-white/25 bg-jade/78 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-md">Sfeerbeeld · geen specifieke zaal</span>
              </div>
              <div>
                <SectionHeading eyebrow="Wat zie je binnen?" title={<>Een beeldwereld,<br />geen klassieke museumzaal</>} description="De sterkste verwachting is eenvoudig: je komt voor licht, beweging, spiegels, fotografie en korte interactie. Niet voor tekstpanelen, een permanente kunstcollectie of een lange thrill ride." />
                <div className="mt-8 space-y-0 border-y border-jade/10">
                  {[
                    ['Vrij bewegen', 'In Fantasy Space bepaal je grotendeels zelf hoe lang je bij een projectie of fotopunt blijft.'],
                    ['Acht zones + theater', 'De huidige combo-inclusies noemen acht thematische zones en Flight Theater als apart onderdeel.'],
                    ['Foto’s zijn onderdeel van het product', 'Ga voor beeld en samenspel; een druk moment kan de ervaring dus sterker beïnvloeden dan bij een traditioneel museum.'],
                    ['Geen vaste score nodig', 'Of het de moeite waard is, hangt vooral af van je verwachting, gezelschap en ticketkeuze.'],
                  ].map(([title, text], index) => (
                    <div key={title} className="grid grid-cols-[38px_1fr] gap-4 border-b border-jade/10 py-5 last:border-0"><span className="text-[10px] font-extrabold text-saffron-dark">0{index + 1}</span><div><h3 className="font-display text-xl font-semibold text-jade">{title}</h3><p className="mt-2 text-xs font-medium leading-6 text-charcoal/62">{text}</p></div></div>
                  ))}
                </div>
                <p className="mt-7 text-sm font-medium leading-7 text-charcoal/64">Zoek je inhoudelijke hedendaagse kunst, combineer de dag dan met <InlineLink href="/blog/bangkok-art-biennale-2026-angels-mara-guide/">kunst in Bangkok</InlineLink> of een echt museum. Cave Fantasy werkt juist als compact entertainment tussen BTS, lunch en Siam.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-12 lg:grid-cols-[0.48fr_1.52fr]">
              <div>
                <SectionHeading eyebrow="Vergelijk het juiste product" title={<>Immersief is<br />niet hetzelfde als kunst</>} description="Bangkok gebruikt woorden als digital, interactive en immersive voor heel verschillende ervaringen. Kies op wat je daadwerkelijk wilt doen, niet op het meest spectaculaire beeld in de zoekresultaten." />
              </div>
              <div className="border-y border-jade/10">
                {[
                  { tag: 'Foto + entertainment', title: 'Cave Fantasy', text: 'Kies dit wanneer je een compacte wandeling door projecties, spiegels en fantasiewerelden wilt, eventueel met Flight Theater. De locatie bij National Stadium maakt combineren eenvoudig.', href: '#kiezen', label: 'Kies product' },
                  { tag: 'Galerie + context', title: 'BACC', text: 'Kies BACC wanneer tentoonstellingen, makers en een rustigere museumstructuur belangrijker zijn dan een betaalde fotowereld. Controleer het programma en onthoud dat maandag de vaste sluitingsdag is.', href: '/nl/blog/bangkok-art-biennale-2026-angels-mara-guide/', label: 'Bekijk kunstcontext' },
                  { tag: 'Andere digitale ervaring', title: 'Space & Time Cube', text: 'Vergelijk eerst locatie, aantal zones, ticketvorm en reisdoel voordat je twee soortgelijke digitale ervaringen in één reis boekt. Meer is niet automatisch gevarieerder.', href: '/nl/blog/space-time-cube-bangkok-immersive-metaverse-museum-2026/', label: 'Vergelijk ervaring' },
                ].map(({ tag, title, text, href, label }) => (
                  <article key={title} className="grid gap-4 border-b border-jade/10 py-7 last:border-0 sm:grid-cols-[170px_1fr_auto] sm:items-start">
                    <div><p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{tag}</p><h3 className="mt-2 font-display text-2xl font-semibold text-jade">{title}</h3></div>
                    <p className="text-xs font-medium leading-6 text-charcoal/62">{text}</p>
                    <a href={href} className="inline-flex items-center gap-2 text-[10px] font-extrabold text-jade">{label}<ArrowRight size={13} className="text-saffron" /></a>
                  </article>
                ))}
              </div>
            </div>

            <aside className="mt-12 grid gap-8 rounded-[26px] border border-jade/10 bg-white p-7 shadow-editorial-card lg:grid-cols-[0.72fr_1.28fr] lg:p-9">
              <div className="flex items-start gap-4"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-jade text-saffron-light"><Camera size={22} /></span><div><p className="eyebrow">Fotograferen zonder de ruimte over te nemen</p><h2 className="font-display text-[2.2rem] font-semibold leading-[0.95] text-jade">Maak eerst mee. Leg daarna vast.</h2></div></div>
              <div className="grid gap-5 text-xs font-medium leading-6 text-charcoal/64 sm:grid-cols-2">
                <p><strong className="text-jade">Kies vooraf één hoofdfoto.</strong> Kijk eerst hoe licht en vloer bewegen, wacht op een natuurlijk leeg moment en stap daarna door. Zo wordt iedere zone geen mini-fotoshoot.</p>
                <p><strong className="text-jade">Vraag toestemming.</strong> Spiegelwanden en groothoeklenzen nemen andere bezoekers snel mee. Publiceer kinderen buiten je eigen gezelschap niet herkenbaar en volg personeel wanneer een zone tijdelijk doorstroom nodig heeft.</p>
                <p><strong className="text-jade">Gebruik bestaand licht.</strong> Flits kan projecties wegdrukken en anderen hinderen. Reinig je lens, verlaag schermhelderheid en houd je telefoon veilig vast bij donkere vloerovergangen.</p>
                <p><strong className="text-jade">Ken de grens.</strong> Persoonlijke fotografie is toegestaan; commerciële shoots en livestreaming niet. Voor statief, extra lamp of professionele opname vraag je vooraf expliciete toestemming.</p>
              </div>
            </aside>
          </div>
        </section>

        <section id="kinderen" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <SectionHeading eyebrow="Voor gezin en prikkelgevoelige reiziger" title={<>Leuk begint met<br />de juiste grens</>} description="Leeftijd alleen zegt weinig. Donkere overgangen, spiegelwanden, geluid en bewegende beelden kunnen voor het ene kind magisch en voor het andere te veel zijn." />
                <div className="mt-7 rounded-2xl bg-jade p-6 text-white shadow-editorial-card">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-light">Ticketcriteria op 1 augustus 2026</p>
                  <p className="mt-4 font-display text-2xl font-semibold">Tot en met 90 cm gratis · vanaf 140 cm volwassen tarief · Flight minimaal 100 cm</p>
                  <p className="mt-3 text-xs font-medium leading-6 text-white/58">Dit zijn productvoorwaarden, geen leeftijdsadvies. Controleer de actuele meting, het gekozen pakket en de voorwaarden op je voucher.</p>
                </div>
              </div>
              <div className="grid gap-x-8 gap-y-0 sm:grid-cols-2">
                {[
                  { icon: Eye, title: 'Kijk eerst', text: 'Laat een kind de ingang en eerste projectie zien voordat je haast maakt. Spreek af dat stoppen of teruglopen altijd mag.' },
                  { icon: HeartPulse, title: 'Flight apart beslissen', text: 'Bewegingsziekte, duizeligheid of de genoemde gezondheidswaarschuwingen zijn redenen om Flight niet als vanzelfsprekend onderdeel te zien.' },
                  { icon: Camera, title: 'Foto zonder druk', text: 'Maak niet van iedere zone een fotosessie. Wissel kijken, bewegen en één gekozen foto af; dat houdt de ervaring van het kind centraal.' },
                  { icon: ShieldCheck, title: 'Blijf dichtbij', text: 'Spiegels en donkerte maken oriëntatie lastiger. Houd kinderen bij je en volg alle aanwijzingen van medewerkers en vloermarkering.' },
                  { icon: Clock3, title: 'Pauze vóór vermoeidheid', text: 'Plan lunch, drinken en toilet buiten de attractie voordat onrust ontstaat. Eten en drinken zijn binnen niet toegestaan.' },
                  { icon: Users, title: 'Mobiliteit vooraf checken', text: 'De listing vraagt begeleiding bij rolstoel of mobiliteitshulpmiddel. Vraag de venue naar de concrete route en Flight-toegang.' },
                ].map(({ icon: Icon, title, text }) => (
                  <article key={title} className="border-b border-jade/10 py-6"><Icon size={21} className="text-saffron-dark" /><h3 className="mt-4 font-display text-2xl font-semibold text-jade">{title}</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/62">{text}</p></article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="route" className="section-divider-bottom scroll-mt-24 bg-jade py-16 text-white lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.58fr_1.42fr] lg:items-end">
              <div><p className="eyebrow !text-saffron-light">Van perron tot projectie</p><h2 className="font-display text-[3.4rem] font-semibold leading-[0.9] tracking-[-0.04em]">Drie stappen zonder taxi.</h2></div>
              <p className="max-w-3xl text-sm font-medium leading-7 text-white/65">MBK is een van de makkelijkste indoor attracties om met BTS te bereiken. Gebruik National Stadium als anker; Siam is een bruikbaar alternatief, maar voegt een wandeling door het drukke winkelgebied toe.</p>
            </div>
            <div className="relative mt-12 grid gap-7 lg:grid-cols-3">
              <div className="pointer-events-none absolute left-[8%] right-[8%] top-10 hidden border-t-2 border-dashed border-saffron/65 lg:block" />
              {[
                { n: '1', icon: TrainFront, title: 'National Stadium W1', text: 'Kom je via Sukhumvit, stap dan bij Siam over op de Silom Line voor één halte. Gebruik Exit 3 of 4.' },
                { n: '2', icon: Footprints, title: 'Circa 50 meter skywalk', text: 'Volg de overdekte verbinding naar MBK. Je blijft uit het drukste straatverkeer en hebt bij regen minder gedoe.' },
                { n: '3', icon: MapPin, title: '4F · Zone A · 4K-103', text: 'Ga naar verdieping vier en volg de actuele directory. Toon je voucher pas bij het juiste product en controleer de toegangstijd.' },
              ].map(({ n, icon: Icon, title, text }) => (
                <article key={n} className="relative rounded-2xl border border-white/14 bg-white/[0.055] p-7 backdrop-blur-sm"><span className="relative z-10 grid h-20 w-20 place-items-center rounded-full border border-saffron/60 bg-jade text-saffron-light shadow-[0_0_0_8px_rgba(18,77,66,1)]"><Icon size={27} /></span><p className="mt-7 text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-light">Stap 0{n}</p><h3 className="mt-2 font-display text-[1.85rem] font-semibold">{title}</h3><p className="mt-4 text-xs font-medium leading-6 text-white/58">{text}</p></article>
              ))}
            </div>
            <p className="mt-8 max-w-4xl text-sm font-medium leading-7 text-white/62">Lees voor de overstap en ticketvalidatie ook onze <InlineLink href="/blog/bangkok-public-transport-bts-mrt-tourist-guide-2026/">BTS- en MRT-gids voor Bangkok</InlineLink>. Gebruik een kaartpin als laatste controle, niet als vervanging van de officiële MBK-directory.</p>
          </div>
        </section>

        <section aria-label="Regenbestendige Bangkok-route" className="section-divider-bottom py-12 lg:py-16">
          <div className="container-custom">
            <div className="relative min-h-[450px] overflow-hidden rounded-[30px] bg-jade shadow-editorial-lift sm:min-h-[390px]">
              <Image src="/images/redesign/cave-fantasy-rain-route.webp" alt="Gezin volgt een redactionele regenroute via BTS naar een winkelcentrum in Bangkok" fill sizes="100vw" className="object-cover object-[67%_center]" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,35,30,0.99)_0%,rgba(5,35,30,0.91)_39%,rgba(5,35,30,0.16)_72%,rgba(5,35,30,0.03)_100%)]" />
              <div className="relative z-10 flex min-h-[450px] max-w-[610px] flex-col justify-center p-7 text-white sm:min-h-[390px] sm:p-12">
                <p className="eyebrow !text-saffron-light">Regen is een reden, geen garantie</p>
                <h2 className="font-display text-[3.2rem] font-semibold leading-[0.88] tracking-[-0.04em]">Bouw een dag die ook droog werkt.</h2>
                <p className="mt-5 max-w-[530px] text-sm font-medium leading-7 text-white/67">Reserveer Cave Fantasy niet alleen als noodplan op hetzelfde moment dat de bui begint. Controleer beschikbaarheid, reis via de BTS en combineer met BACC, lunch of één rustige MBK-activiteit.</p>
                <Link href="/city/bangkok/attractions/" className="btn-cream mt-7 w-fit">Vergelijk Bangkok-attracties <ArrowRight size={15} className="text-saffron" /></Link>
              </div>
            </div>
          </div>
        </section>

        <section id="praktisch" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-12 lg:grid-cols-[0.62fr_1.38fr]">
              <SectionHeading eyebrow="Voor je betaalt" title={<>Lees het product,<br />niet alleen de foto’s</>} description="Een ticketnaam kan op elkaar lijken terwijl inclusies, re-entry en wijzigingsregels verschillen. Deze zes checks zijn waardevoller dan een oude vaste prijs." />
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {[
                  { icon: Ticket, title: 'Exact pakket', text: 'Staat er Fantasy Space, Flight Theater of combo? Controleer de zones die letterlijk als inbegrepen worden genoemd.' },
                  { icon: Clock3, title: 'Datum + laatste toegang', text: 'Malluren zijn niet hetzelfde als producturen. Controleer tijdvak, geldigheid en wanneer de laatste entree wordt verwerkt.' },
                  { icon: Users, title: 'Lengte + tarief', text: 'Meet kinderen niet op gevoel. Controleer gratis grens, volwassen tariefgrens en Flight-minimum op de actuele listing.' },
                  { icon: HeartPulse, title: 'Bewegingscheck', text: 'Lees de waarschuwingen van Flight Theater apart. Kies alleen Fantasy Space wanneer de bewegende ervaring niet past.' },
                  { icon: Route, title: 'Re-entry', text: 'Fantasy Space staat re-entry met bewijs toe; Flight Theater niet. Bevestig dit op jouw voucher voordat je naar buiten loopt.' },
                  { icon: Camera, title: 'Foto + huisregels', text: 'Persoonlijke foto’s zijn toegestaan; commerciële opname en livestream niet. Eten, drinken en storende voorwerpen blijven buiten.' },
                ].map(({ icon: Icon, title, text }) => (
                  <article key={title} className="rounded-2xl border border-jade/10 bg-white p-5 shadow-editorial-card"><Icon size={20} className="text-jade" /><h3 className="mt-5 font-display text-[1.45rem] font-semibold text-jade">{title}</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/62">{text}</p></article>
                ))}
              </div>
            </div>

            <div className="mt-12 overflow-hidden rounded-[28px] border border-saffron/25 bg-[#fff4df] shadow-editorial-card">
              <div className="grid gap-8 p-7 lg:grid-cols-[0.82fr_1.18fr] lg:p-10">
                <div><p className="eyebrow">Transactionele stap</p><h2 className="font-display text-[2.8rem] font-semibold leading-[0.92] text-jade">Zoek eerst de exacte productnaam.</h2><p className="mt-5 text-sm font-medium leading-7 text-charcoal/64">De knop opent Klook via onze affiliatepartner. Controleer daar expliciet <strong>Cave Fantasy Bangkok</strong>, de gekozen datum en het pakket; de affiliate-uitgang is geen garantie dat de eerste getoonde activiteit dit product is.</p></div>
                <div className="lg:self-center lg:justify-self-end">
                  <a href={ticketHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-jade btn-jade-pattern">Controleer tickets op Klook <ExternalLink size={15} className="text-saffron" /></a>
                  <AffiliateDisclosure className="mt-4 max-w-xl">Klook is een affiliatepartner. Go2Thailand kan commissie ontvangen zonder dat jouw prijs stijgt. Controleer productnaam, datum, zones, lengtecriteria, gezondheidswaarschuwingen en voorwaarden zelf voor betaling.</AffiliateDisclosure>
                </div>
              </div>
            </div>

            <div className="mt-14 grid gap-10 lg:grid-cols-[0.45fr_1.55fr]">
              <div><p className="eyebrow">Kies je dagvorm</p><h2 className="font-display text-[2.7rem] font-semibold leading-[0.92] text-jade">Cave Fantasy hoeft geen hele dag te worden.</h2></div>
              <div className="border-y border-jade/10">
                {[
                  { time: '90 min', title: 'Snelle indoor stop', text: 'Reis naar National Stadium, kies Fantasy Space en ga daarna lunchen. Geschikt wanneer foto’s en een koele pauze het doel zijn.' },
                  { time: 'Halve dag', title: 'BACC + Cave Fantasy', text: 'Begin bij BACC wanneer het open is, pauzeer voor eten en kies daarna Cave Fantasy als speels contrast. Controleer dat BACC maandag sluit.' },
                  { time: 'Regendag', title: 'MBK zonder overplanning', text: 'Combineer de experience met lunch en maximaal één extra MBK-activiteit. Laat ruimte voor wachttijd, vermoeidheid en een droge BTS-terugweg.' },
                ].map(({ time, title, text }) => (
                  <article key={title} className="grid gap-4 border-b border-jade/10 py-7 last:border-0 sm:grid-cols-[90px_220px_1fr]"><p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-saffron-dark">{time}</p><h3 className="font-display text-2xl font-semibold text-jade">{title}</h3><p className="text-xs font-medium leading-6 text-charcoal/62">{text}</p></article>
                ))}
              </div>
            </div>
            <p className="mt-7 max-w-4xl text-sm font-medium leading-7 text-charcoal/62">Reserveer een specifieke tijd alleen wanneer de rest van je dag die zekerheid nodig heeft. Bij een flexibel bezoek blijven actuele beschikbaarheid, laatste toegang en je eigen energieniveau leidend.</p>
          </div>
        </section>

        <FaqSplitSection id="vragen" eyebrow="Praktische merkvragen" title="Veelgestelde vragen over Cave Fantasy Bangkok" description="We gebruiken alleen directe bezoekvragen die door venue- en ticketbronnen te beantwoorden zijn. Prijs en voorwaarden blijven een dagcheck." items={faqs} />

        <RelatedGuidesSection
          eyebrow="Bouw verder rond Siam"
          title="Meer zien zonder Bangkok te doorkruisen"
          guides={[
            { title: 'Bangkok attracties', description: 'Vergelijk indoor, tempel, uitzicht en markt op tijd, wijk en reisdoel.', href: '/city/bangkok/attractions/', image: '/images/cities/bangkok/redesign/bangkok-attractions-hero.webp' },
            { title: 'BTS & MRT in Bangkok', description: 'Plan National Stadium, Siam en je volgende wijk zonder onnodige taxirit.', href: '/blog/bangkok-public-transport-bts-mrt-tourist-guide-2026/', image: '/images/blog/bangkok-public-transport-bts-mrt-tourist-guide-2026.webp' },
            { title: 'Space & Time Cube', description: 'Vergelijk een andere digitale ervaring voordat je twee vergelijkbare tickets koopt.', href: '/blog/space-time-cube-bangkok-immersive-metaverse-museum-2026/', image: '/images/blog/space-time-cube-bangkok-immersive-metaverse-museum-2026.webp' },
          ]}
        />

        <SourceMethodSection
          title="Een attractiepagina blijft alleen bruikbaar met een controledatum"
          description="Primaire MBK- en actuele ticketinformatie bepalen locatie, route, productopbouw en voorwaarden; commerciële platformpagina’s zijn alleen aanvullend gebruikt. Vaste prijzen, dynamische reviewscores en oncontroleerbare superlatieven zijn bewust niet overgenomen. Laatst gecontroleerd: 1 augustus 2026."
          sources={sources}
        />
      </div>
    </>
  );
}
