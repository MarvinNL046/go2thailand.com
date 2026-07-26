import Image from 'next/image';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BadgeCheck,
  BatteryCharging,
  Check,
  ChefHat,
  CircleHelp,
  Clock3,
  Coffee,
  ExternalLink,
  Eye,
  Flame,
  IceCreamBowl,
  Map,
  MapPin,
  Navigation,
  Salad,
  ShoppingBag,
  Soup,
  Sun,
  UtensilsCrossed,
  WalletCards,
} from 'lucide-react';
import { KLOOK_GENERIC, withPlacementSubId } from '../../lib/affiliates';
import type { AmazonAffiliateSlug } from '../../lib/amazon-affiliates';
import { useSubId } from '../../lib/useSubId';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav, type PageSectionNavItem } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';

const PAGE_URL = 'https://go2-thailand.com/nl/blog/chatuchak-weekend-market-food-guide/';
const HERO_IMAGE = '/images/redesign/chatuchak-food-hero.webp';
const PAGE_TITLE = 'Eten op Chatuchak Market: foodroute en slimme keuzes';
const PAGE_DESCRIPTION = 'Vind eten op Chatuchak zonder doelloos zoeken. Met foodsecties, proefroute, tijden, betaaladvies, allergenenchecks en een praktische marktkit.';

const navItems: PageSectionNavItem[] = [
  { href: '#kort', label: 'Kies je plan', icon: BadgeCheck },
  { href: '#route', label: 'Foodroute', icon: Navigation },
  { href: '#proeven', label: 'Wat proeven', icon: UtensilsCrossed },
  { href: '#timing', label: 'Timing', icon: Clock3 },
  { href: '#kiezen', label: 'Slim kiezen', icon: Eye },
  { href: '#marktkit', label: 'Marktkit', icon: ShoppingBag },
  { href: '#vragen', label: 'Vragen', icon: CircleHelp },
];

const foodDirections: Array<{
  icon: LucideIcon;
  title: string;
  cue: string;
  description: string;
  orderTip: string;
}> = [
  {
    icon: Soup,
    title: 'Rijst & curry',
    cue: 'Snel en deelbaar',
    description: 'Khao gaeng is rijst met één of meer bereide gerechten uit schalen. Je ziet vooraf wat er ligt en kunt makkelijk twee smaken delen.',
    orderTip: 'Wijs per schaal aan, vraag wat erin zit en controleer of rijst apart wordt gerekend.',
  },
  {
    icon: Flame,
    title: 'Wok & noedels',
    cue: 'Vers uit de pan',
    description: 'Een gerecht dat per bestelling wordt gewokt geeft je zicht op timing en bereiding. Denk aan noedels, gebakken rijst of basilicum met rijst.',
    orderTip: 'Bespreek pittigheid vóór de wok start; een saus of pasta kan al chili bevatten.',
  },
  {
    icon: ChefHat,
    title: 'Grill & spiesjes',
    cue: 'Klein beginnen',
    description: 'Gegrild vlees, worst, vis of groenten werken goed als eerste gedeelde snack. De marinade kan suiker, soja, vissaus of pinda bevatten.',
    orderTip: 'Controleer portiegrootte en saus voordat je meerdere stuks tegelijk bestelt.',
  },
  {
    icon: Salad,
    title: 'Fris & Isaan',
    cue: 'Zuur, zout, pittig',
    description: 'Som tam, larb en andere kruidige salades kunnen fris aanvoelen, maar de basis bevat vaak chili, vissaus en soms pinda of gedroogde garnaal.',
    orderTip: 'Vraag afzonderlijk naar chili en allergenen; “vegetable” betekent niet automatisch vegetarisch.',
  },
  {
    icon: IceCreamBowl,
    title: 'Koud & zoet',
    cue: 'Afkoelen aan het eind',
    description: 'Fruit, kokosijs en mango met kleefrijst zijn logische afsluiters. Rijpheid, toppings en beschikbaarheid veranderen met seizoen en kraam.',
    orderTip: 'Vraag toppings apart als je pinda, melk, kokos of andere ingrediënten moet vermijden.',
  },
  {
    icon: Coffee,
    title: 'Drank & pauze',
    cue: 'Hydratatie eerst',
    description: 'Water is je basis; Thaise thee, koffie en smoothies zijn extra. Ze worden vaak zoeter gemaakt dan veel Nederlandse reizigers verwachten.',
    orderTip: 'Vraag om minder suiker vóór het mengen en laat ijs weg als je daar bewust voor kiest.',
  },
];

const faqs = [
  {
    question: 'Heeft Chatuchak Market een foodgedeelte?',
    answer: 'Ja. De gepubliceerde marktindeling noemt eten en drinken in secties 2, 3, 4, 23, 24, 26 en 27. Zie dat als oriëntatie en niet als een vaste restaurantplattegrond: individuele kramen, doorgangen en openingstijden kunnen veranderen. Eten vind je bovendien verspreid langs meerdere hoofd- en zijpaden.',
  },
  {
    question: 'Wat kun je eten op Chatuchak Market?',
    answer: 'Het aanbod wisselt, maar je kunt doorgaans kiezen uit rijst met curry, wokgerechten, noedels, gegrilde snacks, Isaan-gerechten, fruit, kokosdesserts, thee, koffie en smoothies. Kies op wat vers wordt bereid, wat je kunt delen en wat aansluit op je dieet in plaats van een statische lijst met vijftien “verplichte” gerechten af te werken.',
  },
  {
    question: 'Wat is de beste tijd om voor eten naar Chatuchak te gaan?',
    answer: 'Voor een food-first bezoek is ongeveer 09:30–11:30 een praktisch venster: het volledige weekendaanbod is op gang en de zwaarste middaghitte moet meestal nog komen. Rond lunchtijd neemt de druk op populaire zit- en eetplekken vaak toe. Dit is redactioneel planningsadvies, geen live druktemeting.',
  },
  {
    question: 'Wat zijn de openingstijden van Chatuchak Weekend Market?',
    answer: 'Voor de volledige markt noemt de marktwebsite zaterdag en zondag 09:00–18:00. Woensdag en donderdag draaien vooral om planten en vrijdag wordt als wholesale-avond gecommuniceerd; dat zijn dus geen gelijkwaardige alternatieven voor de complete weekendervaring. Controleer rond feestdagen altijd de actuele kanalen.',
  },
  {
    question: 'Welk station is het handigst voor eten op Chatuchak?',
    answer: 'MRT Kamphaeng Phet brengt je dicht bij de westelijke en binnenste marktzone en is daardoor een handige food-first start. BTS Mo Chit uitgang 1 en MRT Chatuchak Park zijn ook bruikbare routes. De beste keuze hangt af van je vertrekpunt en het gedeelte dat je eerst wilt zien; bewaar stationsnaam en uitgang offline.',
  },
  {
    question: 'Is Chatuchak Market alleen contant te betalen?',
    answer: 'Niet iedere kraam hanteert dezelfde betaalwijze. Thaise QR-betalingen zijn veelvoorkomend maar werken meestal via lokale bankapps; internationale kaartacceptatie is niet universeel. Neem daarom baht in kleine coupures mee en houd een tweede betaalmogelijkheid achter de hand.',
  },
  {
    question: 'Kun je afdingen op eten bij Chatuchak?',
    answer: 'Bij eten met een duidelijke prijs is afdingen niet de logische standaard. Vraag vooraf naar prijs en portiegrootte als die niet zichtbaar zijn en beslis dan of je bestelt. Onderhandelen past eerder bij sommige winkelproducten of meerdere stuks; behandel een kleine foodkraam niet alsof iedere snack een onderhandeling moet worden.',
  },
  {
    question: 'Hoe lang heb je nodig voor een Chatuchak-foodroute?',
    answer: 'Reken voor alleen oriënteren en drie gedeelde keuzes op ongeveer 90 minuten. Wil je ook uitgebreid shoppen, pauzeren en meerdere secties bekijken, reserveer dan drie tot vier uur. Combineer niet automatisch een volledige marktverkenning met een grote foodlist: hitte en loopafstand maken minder, betere keuzes vaak prettiger.',
  },
  {
    question: 'Is streetfood op Chatuchak veilig?',
    answer: 'Geen enkele markt of kraam kan via een algemene webpagina veilig worden verklaard. Kies zichtbare bereiding, let op goede omloop en schone hulpmiddelen en vermijd eten dat niet passend warm of koud wordt gehouden. Bij ernstige allergie moet je ingrediënten én kruiscontact expliciet bespreken; kan dat niet betrouwbaar, kies dan iets anders.',
  },
  {
    question: 'Is Chatuchak voor eten de moeite waard?',
    answer: 'Ja als je eten wilt combineren met een grote weekendmarkt en graag onderweg kleine dingen proeft. Als eten het hoofddoel is en shoppen je weinig interesseert, kan een foodmarkt of georganiseerde foodroute overzichtelijker zijn. Chatuchaks kracht is combinatie en variatie, niet dat iedere kraam de beste versie van een gerecht serveert.',
  },
];

const sources = [
  {
    title: 'Chatuchak Weekend Market — public-space information',
    creator: 'Bangkok Metropolitan Administration',
    url: 'https://publicspace.bangkok.go.th/Spaces/Info/2FBD1377-1BC8-4565-86CA-2C647E59F18A',
    note: 'Gemeentelijke context voor marktdagen, algemene uren, openbaar vervoer en het assortiment met bereid en vers eten.',
  },
  {
    title: 'Contact and opening times',
    creator: 'Chatuchak Market',
    url: 'https://www.chatuchakmarket.org/contact/',
    note: 'Geraadpleegd voor de volledige weekenduren en het onderscheid met planten- en wholesale-dagen.',
  },
  {
    title: 'Sections at Chatuchak Market',
    creator: 'Chatuchak Market',
    url: 'https://www.chatuchakmarket.org/sections/',
    note: 'Bron voor de gepubliceerde food- en beverage-secties en de rol van secties en sois bij navigatie.',
  },
  {
    title: 'Getting to Chatuchak by Skytrain',
    creator: 'Chatuchak Market',
    url: 'https://www.chatuchakmarket.org/getting-to-chatuchak-by-skytrain/',
    note: 'Routecontext voor BTS Mo Chit en uitgang 1; gecombineerd met actuele netwerk- en stationsinformatie.',
  },
];

const amazonProducts: Array<{ slug: AmazonAffiliateSlug; title: string; reason: string; icon: LucideIcon }> = [
  {
    slug: 'venture-pal-packable-backpack',
    title: 'Opvouwbare daypack',
    reason: 'Voor water en kleine aankopen; neem kostbare spullen voorop wanneer de gangen druk worden.',
    icon: ShoppingBag,
  },
  {
    slug: 'anker-powercore-10k',
    title: 'Compacte powerbank',
    reason: 'Houd kaart, route en communicatie beschikbaar tijdens een lange markt- en metrorit.',
    icon: BatteryCharging,
  },
  {
    slug: 'sun-cube-wide-brim-hat',
    title: 'Lichtgewicht zonnehoed',
    reason: 'Voor de open delen en wandeling van het station; check pasvorm en materiaal vóór aankoop.',
    icon: Sun,
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
      datePublished: '2026-03-19',
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
      name: 'Chatuchak Weekend Market',
      description: 'Weekendmarkt in Bangkok met onder meer eten, drinken, kleding, kunst en woonartikelen.',
      url: 'https://www.chatuchakmarket.org/',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Kamphaeng Phet 2 Road',
        addressLocality: 'Chatuchak, Bangkok',
        postalCode: '10900',
        addressCountry: 'TH',
      },
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday', 'Sunday'], opens: '09:00', closes: '18:00' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/nl/' },
        { '@type': 'ListItem', position: 2, name: 'Bangkok', item: 'https://go2-thailand.com/nl/city/bangkok/' },
        { '@type': 'ListItem', position: 3, name: 'Eten op Chatuchak', item: PAGE_URL },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Zes smaakrichtingen voor eten op Chatuchak Market',
      itemListElement: foodDirections.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.title,
        description: item.description,
      })),
    },
  ];
}

export function ChatuchakFoodGuide() {
  const subId = useSubId();
  const foodTourHref = withPlacementSubId(KLOOK_GENERIC, subId, 'chatuchak-food-related-tour');
  const schemas = createSchemas();

  return (
    <>
      <SEOHead title={PAGE_TITLE} description={PAGE_DESCRIPTION} ogImage={`https://go2-thailand.com${HERO_IMAGE}`}>
        <meta name="keywords" content="chatuchak market food, chatuchak markt eten, chatuchak food stalls, wat eten op chatuchak, food section chatuchak" />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content="2026-03-19" />
        <meta property="article:modified_time" content="2026-07-25" />
        {schemas.map((schema, index) => <script key={`${schema['@type']}-${index}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      </SEOHead>

      <div className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          image={HERO_IMAGE}
          imageAlt="Foodstalls en bezoekers op Chatuchak Weekend Market in Bangkok"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Bangkok', href: '/city/bangkok/' }, { label: 'Chatuchak food' }]}
          eyebrow="Een foodroute door het labyrint"
          title={<>Chatuchak<br />proeven.</>}
          subtitle={<>Zonder je route kwijt te raken.</>}
          description={<>Geen afvinklijst met vijftien snel verouderende kramen, maar een plan dat blijft werken: waar je start, wat je eerst deelt, wanneer je pauzeert en hoe je betere keuzes maakt.</>}
          actions={[
            { label: 'Kies je foodplan', href: '#kort', kind: 'primary' },
            { label: 'Bekijk de route', href: '#route', kind: 'secondary' },
          ]}
          minHeightClassName="min-h-[820px] lg:min-h-[730px]"
          contentClassName="max-w-[670px]"
          titleClassName="max-w-[660px] text-[4.2rem] leading-[0.82] sm:text-[5.4rem] lg:text-[6.2rem]"
          subtitleClassName="max-w-[620px] text-[1.9rem] leading-[0.96] text-saffron-dark sm:text-[2.75rem]"
          imageClassName="object-cover object-[66%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.03)_0%,rgba(252,250,246,0.63)_48%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.99)_0%,rgba(252,250,246,0.94)_40%,rgba(252,250,246,0.18)_68%,rgba(18,63,54,0.08)_100%)]"
          sideCard={(
            <aside className="absolute bottom-8 right-[max(2rem,calc((100vw-1240px)/2))] z-10 hidden w-[330px] overflow-hidden rounded-2xl border border-white/60 bg-white/[0.92] shadow-editorial-lift backdrop-blur-xl xl:block">
              <div className="flex items-center justify-between border-b border-jade/10 px-5 py-4"><p className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-saffron-dark">Food-first vertrekkaart</p><UtensilsCrossed size={18} className="text-jade" /></div>
              <dl className="grid grid-cols-[88px_1fr] gap-x-4 gap-y-3 p-5 text-[11px]">
                <dt className="text-charcoal/46">Volle markt</dt><dd className="font-extrabold text-jade">Za–zo 09:00–18:00</dd>
                <dt className="text-charcoal/46">Start</dt><dd className="font-extrabold text-jade">MRT Kamphaeng Phet</dd>
                <dt className="text-charcoal/46">Foodzones</dt><dd className="font-extrabold text-jade">2–4 en 23–24, 26–27</dd>
                <dt className="text-charcoal/46">Duur</dt><dd className="font-extrabold text-jade">90 min food-only</dd>
              </dl>
              <p className="border-t border-jade/10 px-5 py-4 text-[10px] font-medium leading-4 text-charcoal/58">Secties helpen oriënteren; individuele kramen en doorgangen kunnen veranderen.</p>
            </aside>
          )}
        />

        <PageSectionNav items={navItems} />

        <section id="kort" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-end">
              <SectionHeading
                eyebrow="Eerst je bedoeling"
                title={<>Wat wil je uit<br />de markt halen?</>}
                description={<>Chatuchak is veel groter dan een foodcourt. Laat eten daarom je route ondersteunen in plaats van iedere afslag te bepalen. Voor ligging, winkels en alle secties gebruik je onze <Link href="/blog/chatuchak-market-bangkok-guide/" className="font-extrabold text-jade underline decoration-saffron/55 underline-offset-4 transition hover:text-saffron-dark">algemene Chatuchak-gids</Link>; deze owner houdt de focus op proeven.</>}
              />
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  [UtensilsCrossed, 'Alleen proeven', 'Start bij Kamphaeng Phet, doe één lus en deel drie kleine keuzes.', '± 90 min'],
                  [ShoppingBag, 'Shoppen + eten', 'Plan een hartige pauze halverwege en een koude afsluiter bij vertrek.', '3–4 uur'],
                  [ChefHat, 'Gerechten leren', 'Kies bereidingen die je kunt zien en vergelijk smaakprofielen, niet viraliteit.', '2–3 uur'],
                  [Sun, 'Rustig & koel', 'Kom vroeg, markeer een zit- of AC-pauze en beperk je tot twee zones.', '± 2 uur'],
                ].map(([Icon, title, text, time], index) => {
                  const CardIcon = Icon as LucideIcon;
                  return (
                    <article key={String(title)} className={`flex min-h-[290px] flex-col rounded-2xl border p-6 ${index === 0 ? 'border-saffron/40 bg-[#fff4df] shadow-editorial-card' : 'border-jade/10 bg-white'}`}>
                      <div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/30 bg-canvas text-jade"><CardIcon size={20} strokeWidth={1.5} /></span><span className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{String(time)}</span></div>
                      <h3 className="mt-6 font-display text-[1.55rem] font-semibold leading-none text-jade">{String(title)}</h3>
                      <p className="mt-4 text-xs font-medium leading-6 text-charcoal/65">{String(text)}</p>
                      <span className="mt-auto pt-5 text-[9px] font-extrabold uppercase tracking-[0.14em] text-jade/48">Route 0{index + 1}</span>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="route" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div className="relative min-h-[520px] overflow-hidden rounded-[28px] shadow-editorial-lift sm:min-h-[650px]">
              <Image src="/images/redesign/chatuchak-food-route.webp" alt="Overzicht van meerdere foodpaden op Chatuchak Weekend Market" fill sizes="(max-width: 1024px) 100vw, 54vw" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-jade/92 via-jade/48 to-transparent p-7 pt-32 text-white">
                <p className="eyebrow !text-saffron-light">Je kaart is een kompas</p>
                <h2 className="max-w-xl font-display text-[3rem] font-semibold leading-[0.9] tracking-[-0.04em]">Bewaar een sectie én een herkenningspunt.</h2>
                <p className="mt-4 max-w-lg text-xs font-medium leading-6 text-white/64">Een kraamnummer alleen helpt weinig als een doorgang verandert. Noteer ook soi, nabijgelegen poort of station.</p>
              </div>
            </div>
            <div>
              <SectionHeading
                eyebrow="Drie lussen, geen zigzag"
                title="Een foodroute die ruimte laat"
                description={<>De gepubliceerde indeling noemt food in secties 2, 3, 4, 23, 24, 26 en 27. Gebruik die zones om richting te kiezen, niet als belofte dat een specifiek gerecht altijd op dezelfde plek staat. Onze <Link href="/blog/bangkok-public-transport-bts-mrt-tourist-guide-2026/" className="font-extrabold text-jade underline decoration-saffron/55 underline-offset-4 transition hover:text-saffron-dark">BTS- en MRT-gids</Link> helpt je de aankomst vanaf je hotel plannen.</>}
              />
              <ol className="mt-8 space-y-6">
                {[
                  ['09:30 — scan de westkant', 'Start bij MRT Kamphaeng Phet als dat bij je route past. Loop eerst langs de buitenzijde van secties 2–4, markeer een drankpunt en bestel nog geen volledige maaltijd.'],
                  ['10:00 — deel iets hartigs', 'Kies één vers bereide basis en één kleine snack. Zoek pas daarna richting 23–24 of 26–27; zo voorkom je dat je met volle handen door meerdere zones moet.'],
                  ['10:45 — koel af en beslis', 'Sluit af met fruit, kokos of een drank en bepaal of je verder winkelt. Bewaar je station in de kaart en laat de route eindigen waar je daadwerkelijk wilt vertrekken.'],
                ].map(([title, text], index) => (
                  <li key={title} className="grid grid-cols-[50px_1fr] gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-jade font-display text-xl font-semibold text-saffron-light">0{index + 1}</span>
                    <div><h3 className="font-display text-[1.5rem] font-semibold leading-none text-jade">{title}</h3><p className="mt-2 text-xs font-medium leading-6 text-charcoal/66">{text}</p></div>
                  </li>
                ))}
              </ol>
              <a href="https://www.chatuchakmarket.org/map/" target="_blank" rel="noopener noreferrer" className="btn-cream mt-8 min-h-12 px-6 text-saffron-dark">Open de actuele marktkaart <ExternalLink size={15} /></a>
            </div>
          </div>
        </section>

        <section id="proeven" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:items-end">
              <SectionHeading
                eyebrow="Geen verplichte top vijftien"
                title="Zes smaakrichtingen die blijven werken"
                description={<>Kramen komen en gaan; een goede beslismethode veroudert langzamer. Gebruik deze richtingen om een gevarieerde route te bouwen en lees in onze <Link href="/blog/thai-curry-guide-green-red-yellow-massaman-panang/" className="font-extrabold text-jade underline decoration-saffron/55 underline-offset-4 transition hover:text-saffron-dark">Thaise currygids</Link> hoe je kleur, smaak en pittigheid uit elkaar houdt.</>}
              />
              <p className="max-w-3xl text-sm font-medium leading-7 text-charcoal/62">Een evenwichtige proefroute bestaat bijvoorbeeld uit één warme basis, één gegrilde of frisse aanvulling en één koude afsluiter. Dat is genoeg om verschillende technieken te ervaren zonder dat iedere rij of trend je plan overneemt. Vraag altijd wat er die dag werkelijk beschikbaar is.</p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {foodDirections.map(({ icon: Icon, title, cue, description, orderTip }) => (
                <article key={title} className="group flex min-h-[350px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card transition hover:-translate-y-1 hover:shadow-editorial-lift">
                  <div className="flex items-center justify-between"><span className="grid h-12 w-12 place-items-center rounded-xl bg-[#eef2ed] text-jade"><Icon size={23} strokeWidth={1.45} /></span><span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">{cue}</span></div>
                  <h3 className="mt-6 font-display text-[1.75rem] font-semibold leading-none text-jade">{title}</h3>
                  <p className="mt-4 text-xs font-medium leading-6 text-charcoal/66">{description}</p>
                  <div className="mt-auto border-t border-jade/10 pt-5"><p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-jade/50">Bestelcheck</p><p className="mt-2 text-[11px] font-medium leading-5 text-charcoal/62">{orderTip}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="timing" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="overflow-hidden rounded-[30px] bg-jade text-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[0.62fr_1.38fr]">
                <div className="p-8 sm:p-10 lg:p-12">
                  <p className="eyebrow !text-saffron-light">Tijd is ook een ingrediënt</p>
                  <h2 className="font-display text-[3.25rem] font-semibold leading-[0.88] tracking-[-0.04em]">Eet vóór hitte en honger samen beslissen.</h2>
                  <p className="mt-6 text-sm font-medium leading-7 text-white/66">De volledige markt draait zaterdag en zondag van 09:00 tot 18:00. Foodstalls kunnen individueel afwijken. Kom met lichte trek, drink eerst water en plan een echte pauze voordat je energie wegzakt.</p>
                </div>
                <div className="grid gap-px bg-white/10 sm:grid-cols-3">
                  {[
                    ['09:00–11:30', 'Food-first', 'Meer overzicht en doorgaans minder middaghitte. Geef kramen wel tijd om volledig op te starten.', 'Beste voor een route'],
                    ['11:30–14:30', 'Lunchpiek', 'Veel sfeer en keuze, maar grotere druk op paden, zitplekken en populaire bestellingen.', 'Beste voor energie'],
                    ['14:30–17:30', 'Shoppen + snack', 'Logisch als je eerst winkelt. Vertrouw niet op ieder specifiek gerecht tot vlak voor sluiting.', 'Beste als afsluiter'],
                  ].map(([time, title, text, cue]) => (
                    <article key={time} className="flex min-h-[320px] flex-col bg-jade p-7 sm:py-10">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-saffron-light">{time}</p>
                      <h3 className="mt-5 font-display text-[1.7rem] font-semibold leading-none">{title}</h3>
                      <p className="mt-4 text-xs font-medium leading-6 text-white/62">{text}</p>
                      <p className="mt-auto border-t border-white/12 pt-5 text-[10px] font-extrabold text-white/75">{cue}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                [Sun, 'Hittestop', 'Wacht niet tot je duizelig of misselijk wordt. Zoek schaduw of airco, drink water en verkort je route als herstel uitblijft.'],
                [MapPin, 'Vast ontmoetingspunt', 'Spreek een poort, station of opvallend permanent gebouw af; “bij de foodstalls” is te vaag in een grote markt.'],
                [WalletCards, 'Betaalbuffer', 'Neem kleine coupures mee. QR en kaart verschillen per kraam en een ATM op de kaart is geen reden om zonder back-up te starten.'],
              ].map(([Icon, title, text]) => {
                const TipIcon = Icon as LucideIcon;
                return <article key={String(title)} className="grid grid-cols-[44px_1fr] gap-4 rounded-2xl border border-jade/10 bg-white p-5"><span className="grid h-11 w-11 place-items-center rounded-full border border-saffron/30 text-jade"><TipIcon size={19} /></span><div><h3 className="font-display text-xl font-semibold text-jade">{String(title)}</h3><p className="mt-2 text-xs font-medium leading-5 text-charcoal/64">{String(text)}</p></div></article>;
              })}
            </div>

            <div className="mt-10 grid gap-8 rounded-[26px] border border-jade/10 bg-white p-7 shadow-editorial-card sm:p-9 lg:grid-cols-[0.58fr_1.42fr]">
              <div>
                <p className="eyebrow">Voorkom routeverlies</p>
                <h2 className="font-display text-[2.75rem] font-semibold leading-[0.9] tracking-[-0.035em] text-jade">Vier plannen die op papier beter werken dan op de markt.</h2>
                <p className="mt-5 text-sm font-medium leading-7 text-charcoal/65">Chatuchak is geen winkelcentrum met een onveranderlijke plattegrond en gelijkmatig klimaat. Een goed plan heeft ankers, maar laat bewust ruimte om een gang over te slaan, eerder te pauzeren of zonder die ene beroemde snack te vertrekken.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ['Vrijdag als volledige fooddag plannen', 'Vrijdag wordt als wholesale-avond gecommuniceerd en biedt niet dezelfde complete markt als zaterdag en zondag. Wil je alle foodzones combineren met shoppen, kies dan het volledige weekendvenster en controleer tijdelijke wijzigingen vooraf.'],
                  ['Met vijftien kraamnamen binnenkomen', 'Een exact lijstje lijkt efficiënt, maar één gesloten of verhuisde kraam kan je route in zigzag veranderen. Kies liever drie smaakrichtingen en vervang een gemiste kraam door een bereiding die je ter plekke goed kunt beoordelen.'],
                  ['Eten tot je geen handen meer vrij hebt', 'Drank, shoppingtas, kaart en warme snack tegelijk dragen maakt een druk pad onnodig lastig. Eet zittend of aan de rand waar dat mag, ruim eerst op en begin pas daarna aan je volgende marktzone.'],
                  ['Zoete drank als hydratatie rekenen', 'Thaise thee of smoothie kan verfrissen, maar vervangt niet automatisch water. Begin met water, vraag desgewenst minder suiker en plan een extra drinkmoment wanneer warmte, lopen en zoute snacks samen optellen.'],
                ].map(([title, text], index) => (
                  <article key={title} className="border-l-2 border-saffron/55 pl-5">
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">Niet doen 0{index + 1}</p>
                    <h3 className="mt-2 font-display text-[1.4rem] font-semibold leading-none text-jade">{title}</h3>
                    <p className="mt-3 text-xs font-medium leading-6 text-charcoal/64">{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="kiezen" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
              <div>
                <SectionHeading
                  eyebrow="Kraam voor kraam"
                  title="Kijk, vraag, bestel — in die volgorde"
                  description={<>Een lange rij bewijst populariteit, maar niet automatisch geschiktheid voor jouw smaak, budget of allergie. De bredere <Link href="/thailand-street-food/" className="font-extrabold text-jade underline decoration-saffron/55 underline-offset-4 transition hover:text-saffron-dark">Thailand-streetfoodgids</Link> helpt je ook buiten Chatuchak kiezen tussen kraam, markt en foodcourt.</>}
                />
                <div className="mt-8 space-y-4">
                  {[
                    ['01', 'Kijk naar de bereiding', 'Wordt een warm gerecht per bestelling gemaakt of passend warm gehouden? Liggen rauwe en gare ingrediënten gescheiden? Eén snelle visuele scan helpt meer dan een virale naam.'],
                    ['02', 'Vraag prijs en portie', 'Staat iets niet helder aangegeven, vraag dan vóór bestellen wat één portie kost en wat erbij hoort. Deelbaar eten werkt alleen als je weet hoeveel je krijgt.'],
                    ['03', 'Bespreek pittigheid en dieet apart', '“Niet pittig”, vegetarisch en allergievrij zijn drie verschillende vragen. Currypasta, vissaus, pinda, schaaldieren, ei en gedeelde olie kunnen onzichtbaar zijn.'],
                    ['04', 'Bestel klein en evalueer', 'Neem eerst één portie, proef en besluit daarna of je terugkomt. Zo beperk je verspilling en houd je ruimte voor iets dat je later pas ontdekt.'],
                  ].map(([step, title, text]) => (
                    <article key={step} className="grid grid-cols-[48px_1fr] gap-4 rounded-2xl border border-jade/10 bg-tonal p-5"><span className="grid h-11 w-11 place-items-center rounded-xl bg-jade font-display text-lg text-saffron-light">{step}</span><div><h3 className="font-display text-[1.45rem] font-semibold leading-none text-jade">{title}</h3><p className="mt-2 text-xs font-medium leading-6 text-charcoal/66">{text}</p></div></article>
                  ))}
                </div>
              </div>
              <div className="relative min-h-[540px] overflow-hidden rounded-[28px] shadow-editorial-lift sm:min-h-[680px]">
                <Image src="/images/redesign/chatuchak-food-choice.webp" alt="Reiziger vergelijkt vers bereide gerechten bij een foodstall op Chatuchak Market" fill sizes="(max-width: 1024px) 100vw, 54vw" className="object-cover" />
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-jade/[0.9] p-6 text-white backdrop-blur-md sm:left-auto sm:w-[350px]">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-light">De beste eerste vraag</p>
                  <p className="mt-2 font-display text-[1.8rem] font-semibold leading-none">Wat wordt nu vers voor me gemaakt?</p>
                  <p className="mt-3 text-[10px] font-medium leading-5 text-white/62">Vraag daarna pas naar pit, ingrediënten, portiegrootte en prijs.</p>
                </div>
              </div>
            </div>

            <div className="mt-12 grid gap-8 rounded-[26px] border border-jade/10 bg-[#f3eee3] p-7 sm:p-9 lg:grid-cols-[0.62fr_1.38fr]">
              <div>
                <p className="eyebrow">Dieet en allergenen</p>
                <h2 className="font-display text-[2.85rem] font-semibold leading-[0.9] tracking-[-0.035em] text-jade">Vier vragen die “no problem” concreter maken.</h2>
                <p className="mt-5 text-sm font-medium leading-7 text-charcoal/66">Een algemene bevestiging is niet genoeg wanneer een ingrediënt ernstige gevolgen kan hebben. Wijs het gekozen gerecht aan, stel één vraag tegelijk en laat de verkoper ook de pasta, saus, topping en gedeelde bereiding meenemen.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <article className="rounded-2xl border border-jade/10 bg-white p-5">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">Pittigheid</p>
                  <h3 className="mt-3 font-display text-[1.45rem] font-semibold text-jade">Kan dit nog worden aangepast?</h3>
                  <p className="mt-3 text-xs font-medium leading-6 text-charcoal/64">Bij een wokgerecht kan minder chili soms vóór bereiding. Een curry, saus of saladebasis kan al klaarstaan. Vraag daarom niet alleen “mai phet”, maar ook of de basis al chili bevat. Kies bij twijfel een gerecht waarvan je de bereiding kunt volgen.</p>
                </article>
                <article className="rounded-2xl border border-jade/10 bg-white p-5">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">Vegetarisch of vegan</p>
                  <h3 className="mt-3 font-display text-[1.45rem] font-semibold text-jade">Zit er vissaus of garnalenpasta in?</h3>
                  <p className="mt-3 text-xs font-medium leading-6 text-charcoal/64">Groenten, tofu en kokos maken een gerecht niet automatisch vegetarisch. Vissaus kan in de saus zitten en garnalenpasta in currypasta. Vraag ook naar bouillon, ei en garnering. Een verkoper die het niet kan bevestigen geeft je onvoldoende informatie, geen uitnodiging om te gokken.</p>
                </article>
                <article className="rounded-2xl border border-jade/10 bg-white p-5">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">Ernstige allergie</p>
                  <h3 className="mt-3 font-display text-[1.45rem] font-semibold text-jade">Worden olie en hulpmiddelen gedeeld?</h3>
                  <p className="mt-3 text-xs font-medium leading-6 text-charcoal/64">Een ingrediënt weglaten voorkomt geen kruiscontact via olie, grill, wok, tang of snijplank. Toon een professioneel vertaalde allergiekaart vóór bestellen. Kan personeel je vraag niet betrouwbaar beantwoorden, kies dan niet op basis van uiterlijk, drukte of een glimlach alleen.</p>
                </article>
                <article className="rounded-2xl border border-jade/10 bg-white p-5">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">Portie en afval</p>
                  <h3 className="mt-3 font-display text-[1.45rem] font-semibold text-jade">Is één bestelling genoeg om te delen?</h3>
                  <p className="mt-3 text-xs font-medium leading-6 text-charcoal/64">Vraag hoe groot een portie is voordat iedereen hetzelfde bestelt. Begin met één, gebruik beschikbare afvalpunten en laat lege bekers niet op een kraamrand staan. Een rustige deelstrategie vermindert verspilling én houdt je handen vrij in smalle paden.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.58fr_1.42fr]">
              <SectionHeading
                eyebrow="Eten of marktbeleving?"
                title="Chatuchak hoeft niet altijd je foodbestemming te zijn"
                description="De juiste keuze hangt af van wat je dag moet opleveren. Een grote markt kan fantastisch zijn zonder dat iedere bezoeker er zijn beste maaltijd hoeft te vinden."
              />
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  ['Kies Chatuchak', 'Je wilt winkelen én onderweg proeven, hebt een weekendmorgen vrij en vindt dwalen onderdeel van de ervaring.'],
                  ['Kies Chatuchak + één lunch', 'Shoppen is het hoofddoel. Je gebruikt één foodzone of foodcourt als geplande pauze en voorkomt een tweede volledige route.'],
                  ['Kies een food-first alternatief', 'Eten is je hoofddoel, je wilt ingrediënten en zitruimte beter vergelijken of de omvang en hitte van Chatuchak kosten te veel energie.'],
                ].map(([title, text], index) => (
                  <article key={title} className={`rounded-2xl border p-6 ${index === 0 ? 'border-jade bg-jade text-white' : 'border-jade/10 bg-white text-charcoal'}`}><span className={`text-[9px] font-extrabold uppercase tracking-[0.14em] ${index === 0 ? 'text-saffron-light' : 'text-saffron-dark'}`}>Keuze 0{index + 1}</span><h3 className={`mt-4 font-display text-[1.55rem] font-semibold leading-none ${index === 0 ? 'text-white' : 'text-jade'}`}>{title}</h3><p className={`mt-4 text-xs font-medium leading-6 ${index === 0 ? 'text-white/65' : 'text-charcoal/64'}`}>{text}</p></article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="marktkit" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="overflow-hidden rounded-[30px] bg-jade text-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[0.88fr_1.12fr]">
                <div className="relative min-h-[430px] lg:min-h-[650px]">
                  <Image src="/images/redesign/chatuchak-market-kit.webp" alt="Compacte marktkit met daypack, zonnehoed, powerbank, waterfles en kaart" fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-jade/78 via-transparent to-transparent" />
                  <div className="absolute bottom-7 left-7 right-7"><p className="eyebrow !text-saffron-light">Licht meenemen</p><h2 className="max-w-lg font-display text-[3.15rem] font-semibold leading-[0.88] tracking-[-0.04em]">Ruimte voor water, route en wat je echt koopt.</h2></div>
                </div>
                <div className="p-7 sm:p-10 lg:p-12">
                  <p className="text-sm font-medium leading-7 text-white/68">Voor een grote openluchtmarkt zijn drie dingen aantoonbaar nuttiger dan een volle gadgetlijst: draagruimte die je niet in de weg zit, genoeg batterij voor kaart en terugroute, en bescherming voor de open stukken. De producten hieronder zijn voorbeelden; vergelijk maat, materiaal, capaciteit, verkoper en lokale beschikbaarheid zelf.</p>
                  <div className="mt-7 space-y-3">
                    {amazonProducts.map(({ slug, title, reason, icon: Icon }) => (
                      <a key={slug} href={`/go/${slug}/`} target="_blank" rel="noopener noreferrer nofollow sponsored" className="group grid grid-cols-[42px_1fr_34px] items-start gap-4 rounded-xl border border-white/13 bg-white/[0.065] p-4 transition hover:border-saffron/45 hover:bg-white/[0.1]">
                        <span className="grid h-10 w-10 place-items-center rounded-lg border border-saffron/35 text-saffron-light"><Icon size={18} /></span>
                        <span><strong className="block text-xs text-white">{title}</strong><span className="mt-1 block text-[10px] leading-4 text-white/55">{reason}</span></span>
                        <span className="grid h-8 w-8 place-items-center rounded-lg border border-white/12 text-white/60 transition group-hover:text-saffron-light"><ExternalLink size={13} /></span>
                      </a>
                    ))}
                  </div>
                  <AffiliateDisclosure className="mt-4 !text-white/54">Amazon-affiliatelinks via onze centrale <strong className="text-white/72">/go/</strong>-router. Als Amazon-partner verdienen wij aan in aanmerking komende aankopen, zonder extra kosten voor jou. OneLink kan je doorsturen naar een lokale Amazon-winkel; product, prijs, verkoper en beschikbaarheid verschillen per land.</AffiliateDisclosure>
                  <div className="mt-8 border-t border-white/12 pt-7">
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">Niet vergeten</p>
                    <ul className="mt-4 grid gap-3 text-xs font-medium leading-5 text-white/64 sm:grid-cols-2">
                      <li className="flex gap-2"><Check size={14} className="mt-1 shrink-0 text-saffron-light" />Water en kleine coupures</li>
                      <li className="flex gap-2"><Check size={14} className="mt-1 shrink-0 text-saffron-light" />Offline station en uitgang</li>
                      <li className="flex gap-2"><Check size={14} className="mt-1 shrink-0 text-saffron-light" />Herkenbaar ontmoetingspunt</li>
                      <li className="flex gap-2"><Check size={14} className="mt-1 shrink-0 text-saffron-light" />Allergiekaart indien nodig</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FaqSplitSection
          eyebrow="Echte zoekvragen"
          title="Veelgestelde vragen over eten op Chatuchak"
          description="De antwoorden hieronder combineren actuele marktinformatie met vragen die werkelijk in de Nederlandse zoekresultaten verschijnen."
          items={faqs}
        />

        <RelatedGuidesSection
          eyebrow="Verder eten in Bangkok"
          title="Bouw een fooddag die bij je past"
          guides={[
            { title: 'Chatuchak compleet', description: 'Plan alle secties, shoppen, route en verblijfsduur buiten de food-first eigenaar.', href: '/blog/chatuchak-market-bangkok-guide/', image: '/images/redesign/chatuchak-food-route.webp', imageAlt: 'Overzicht van de paden op Chatuchak Market' },
            { title: 'Thaise curry kiezen', description: 'Vergelijk groen, rood, geel, massaman en panang op smaak, textuur en allergenen.', href: '/blog/thai-curry-guide-green-red-yellow-massaman-panang/', image: '/images/redesign/thai-curry-guide-hero.webp', imageAlt: 'Verschillende Thaise curry’s bij een eetkraam' },
            { title: 'Bangkok streetfood', description: 'Kies wijken en eetvormen wanneer eten belangrijker is dan één markt.', href: '/blog/beste-streetfood-bangkok-wijken-plekken-proeven/', image: '/images/redesign/chatuchak-food-choice.webp', imageAlt: 'Kiezen bij een Bangkokse foodstall' },
          ]}
          sideLink={{ label: 'Bekijk Bangkok-foodtours op Klook', href: foodTourHref, affiliate: true }}
          disclosure="De Klook-link gaat naar bredere Bangkok-foodtours en is geen toegangsticket voor Chatuchak. Bij een boeking kunnen wij commissie ontvangen; de drie gidskaarten zijn redactionele interne links."
        />

        <SourceMethodSection
          eyebrow="Bronnen & redactionele methode"
          title="Een route die niet breekt als één kraam verhuist"
          description="Deze owner combineert gemeentelijke en marktbronnen met zelfstandige DataForSEO-keyword-, ranking-, backlink-, SERP-, concurrentie- en PAA-analyse. Specifieke kraamprijzen en onbewezen bezoeken zijn verwijderd; veranderlijke zones en uren blijven controlepunten. Laatste inhoudelijke controle: 25 juli 2026."
          sources={sources}
        />

        <section className="py-12 lg:py-16">
          <div className="container-custom">
            <div className="flex flex-col gap-5 rounded-2xl border border-jade/10 bg-white p-7 sm:flex-row sm:items-center sm:justify-between">
              <div><p className="eyebrow">Klaar om te proeven?</p><h2 className="font-display text-[2.6rem] font-semibold leading-none text-jade">Start met water. Deel daarna drie keuzes.</h2></div>
              <div className="flex flex-wrap gap-3"><a href="#route" className="btn-jade btn-jade-pattern group min-h-12 px-6">Bekijk de foodroute <ArrowRight size={15} className="text-saffron" /></a><Link href="/city/bangkok/" className="btn-cream min-h-12 px-6 text-saffron-dark">Plan Bangkok <Map size={15} /></Link></div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
