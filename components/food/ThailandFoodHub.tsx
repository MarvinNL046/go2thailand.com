import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Check,
  ChefHat,
  ChevronRight,
  CircleHelp,
  ExternalLink,
  Flame,
  Languages,
  Leaf,
  MapPinned,
  MessageCircle,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Soup,
  UtensilsCrossed,
  WheatOff,
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

interface Dish {
  id: number;
  slug: string;
  name: { en: string; nl: string; thai: string };
  category: string;
  region: string;
  spice_level: string;
  image: string;
  difficulty: string;
  preparation_time: string;
  price_range: string;
  ingredients: string[];
}

interface ThailandFoodHubProps {
  dishes: Dish[];
}

type MoodKey = 'eerste-avond' | 'mild' | 'pittig' | 'zonder-vlees';

const PAGE_URL = 'https://go2-thailand.com/nl/food/';
const PAGE_TITLE = 'Eten in Thailand: gerechten, regio’s & bestellen';
const PAGE_DESCRIPTION =
  'Wat moet je eten in Thailand? Ontdek typische Thaise gerechten, vier regionale keukens, streetfood, pittigheid, vegetarisch bestellen en allergietips.';
const HERO_IMAGE = '/images/redesign/thailand-food-hub-hero.webp';

const sectionNav: PageSectionNavItem[] = [
  { href: '#start', label: 'Start', icon: UtensilsCrossed },
  { href: '#gerechten', label: 'Gerechten', icon: ChefHat },
  { href: '#regios', label: 'Regio’s', icon: MapPinned },
  { href: '#streetfood', label: 'Streetfood', icon: Flame },
  { href: '#bestellen', label: 'Bestellen', icon: MessageCircle },
  { href: '#dieet', label: 'Dieet & allergie', icon: ShieldCheck },
  { href: '#vragen', label: 'Vragen', icon: CircleHelp },
];

const dishProfiles: Record<string, { kicker: string; note: string; spice: string }> = {
  'pad-krapow': { kicker: 'Wok + rijst', note: 'Basilicumroerbak met rijst en vaak een gebakken ei; vraag expliciet naar het gekozen eiwit en de pittigheid.', spice: 'meestal pittig' },
  'som-tam': { kicker: 'Fris + scherp', note: 'Groene-papayasalade met veel varianten. Chili, gedroogde garnaal, vis- of gefermenteerde saus kunnen per versie verschillen.', spice: 'vaak pittig' },
  'tom-yum-goong': { kicker: 'Zuur + aromatisch', note: 'Heldere, geurige soep met garnalen. De balans van zuur, zout en chili verschilt per keuken.', spice: 'middel tot pittig' },
  'pad-thai': { kicker: 'Noedels + tamarinde', note: 'Een toegankelijk begin, maar controleer pinda, ei, gedroogde garnaal en vissaus als die voor jou relevant zijn.', spice: 'meestal mild' },
  'khao-soi': { kicker: 'Noord + noedels', note: 'Curry-noedelsoep uit het noorden met zachte en krokante noedels; recept en toppings verschillen per adres.', spice: 'mild tot middel' },
  'massaman-curry': { kicker: 'Rijk + zacht', note: 'Langzaam opgebouwde curry met warme specerijen. Vraag naar noten en het gebruikte eiwit.', spice: 'meestal mild' },
  'gai-tod-hat-yai': { kicker: 'Zuid + krokant', note: 'Gefrituurde kip in Hat Yai-stijl, vaak met gebakken sjalot en kleefrijst.', spice: 'mild' },
  'mango-sticky-rice': { kicker: 'Zoet + romig', note: 'Kleefrijst, kokos en rijpe mango; een dessert dat textuur belangrijker maakt dan chili.', spice: 'niet pittig' },
};

const moodOptions: Array<{ key: MoodKey; label: string; icon: LucideIcon }> = [
  { key: 'eerste-avond', label: 'Mijn eerste avond', icon: Sparkles },
  { key: 'mild', label: 'Liever mild', icon: Soup },
  { key: 'pittig', label: 'Ik zoek pit', icon: Flame },
  { key: 'zonder-vlees', label: 'Zonder vlees', icon: Leaf },
];

const moodDishSlugs: Record<MoodKey, string[]> = {
  'eerste-avond': ['pad-krapow', 'khao-soi', 'mango-sticky-rice'],
  mild: ['pad-thai', 'massaman-curry', 'mango-sticky-rice'],
  pittig: ['som-tam', 'tom-yum-goong', 'pad-krapow'],
  'zonder-vlees': ['pad-thai', 'som-tam', 'mango-sticky-rice'],
};

const regionalRoute = [
  {
    region: 'Noord',
    place: 'Chiang Mai & Lanna',
    flavour: 'kruiden, dips, noedels en invloeden via berg- en handelsroutes',
    dishes: 'khao soi · sai ua · nam phrik ong · gaeng hang lay',
    link: '/food/khao-soi/',
    tone: 'bg-[#dfe8dc]',
  },
  {
    region: 'Noordoost',
    place: 'Isaan',
    flavour: 'kleefrijst, grill, verse kruiden, zuur, zout en uitgesproken fermentatie',
    dishes: 'som tam · larb · gai yang · nam tok',
    link: '/food/som-tam/',
    tone: 'bg-[#edf0e5]',
  },
  {
    region: 'Centraal',
    place: 'Bangkok & Central Plains',
    flavour: 'grote variatie, jasmijnrijst, wokgerechten, soepen en currypasta’s',
    dishes: 'pad thai · tom yum · groene curry · pad krapow',
    link: '/food/pad-krapow/',
    tone: 'bg-[#f6ead7]',
  },
  {
    region: 'Zuid',
    place: 'Andamankust & Golf',
    flavour: 'krachtige curry, kurkuma, tamarinde, zeevruchten en Maleise invloeden',
    dishes: 'gaeng tai pla · khao yam · roti canai · gai tod Hat Yai',
    link: '/food/gai-tod-hat-yai/',
    tone: 'bg-[#f0dfce]',
  },
];

const foodFormats = [
  {
    title: 'A-han tam sang',
    label: 'Op bestelling uit de wok',
    description: 'Kies één gerecht met rijst of noedels. Handig wanneer je snel wilt eten en duidelijk wilt zien wat er wordt bereid.',
    prompt: 'Vraag naar eiwit, chili en sauzen vóór de wok aangaat.',
    icon: ChefHat,
  },
  {
    title: 'Khao gaeng',
    label: 'Curry’s en bijgerechten op rijst',
    description: 'Je wijst één of meer bereide gerechten aan. Snel en goed om smaken te vergelijken, maar ingrediënten zijn lastiger ter plekke aan te passen.',
    prompt: 'Bij allergie of strikt dieet: vraag eerst, wijs niet alleen.',
    icon: Soup,
  },
  {
    title: 'Streetfoodkraam',
    label: 'Eén specialiteit, hoog tempo',
    description: 'Veel sterke kramen doen maar een paar dingen. Dat maakt de keuze eenvoudig en de bereiding zichtbaar.',
    prompt: 'Let op schoon werken, doorloop en eten dat goed wordt verhit.',
    icon: Flame,
  },
  {
    title: 'Gedeelde tafel',
    label: 'Meerdere gerechten, samen eten',
    description: 'Bestel contrast: iets fris, iets uit de wok, een curry of soep en rijst. Schep kleine porties zodat smaken naast elkaar blijven bestaan.',
    prompt: 'Vraag om een serveerlepel als die niet bij het gerecht ligt.',
    icon: UtensilsCrossed,
  },
];

const orderSteps = [
  {
    title: 'Kies het soort eetplek',
    text: 'Wokgerecht, curry op rijst, kraam met één specialiteit of gedeelde tafel: het format bepaalt hoeveel je kunt aanpassen.',
    icon: Search,
  },
  {
    title: 'Noem wat echt moet veranderen',
    text: 'Zeg niet alleen “mild” als een ingrediënt medisch of principieel vermeden moet worden. Benoem ingrediënt en kruiscontact apart.',
    icon: Languages,
  },
  {
    title: 'Laat de bestelling terugkomen',
    text: 'Wijs het gerecht aan of laat de medewerker bevestigen wat erin en eruit gaat. Bij twijfel kies je een keuken die de vraag kan beantwoorden.',
    icon: MessageCircle,
  },
  {
    title: 'Bouw contrast op tafel',
    text: 'Combineer rijst met bijvoorbeeld één frisse salade, één wokgerecht en een soep of curry in plaats van vier vergelijkbare borden.',
    icon: BadgeCheck,
  },
];

const faqItems = [
  {
    question: 'Wat moet je zeker eten in Thailand?',
    answer: 'Kies niet één universele top tien, maar proef contrast en regio. Een sterke eerste reeks is pad krapow of pad thai, som tam, tom yum, khao soi, een regionale curry en mango sticky rice. Reis je verder, voeg dan lokale specialiteiten toe: sai ua in het noorden, larb in Isaan en khao yam of een zuidelijke curry aan de kust.',
  },
  {
    question: 'Wat zijn traditionele Thaise gerechten?',
    answer: 'Traditie verschilt per regio en gemeenschap. Veelgenoemde voorbeelden zijn som tam en larb uit Isaan, khao soi en nam phrik uit het noorden, tom yum en groene curry uit Centraal-Thailand en khao yam of gaeng tai pla uit het zuiden. Pad thai is bekend, maar vertegenwoordigt niet de hele Thaise keuken.',
  },
  {
    question: 'Wat zijn de 4 regio’s van de Thaise keuken?',
    answer: 'De gebruikelijke culinaire indeling bestaat uit Noord, Noordoost of Isaan, Centraal en Zuid. De Tourism Authority of Thailand beschrijft iedere regio met eigen geografie, ingrediënten en invloeden. Sommige moderne foodcampagnes behandelen Oost-Thailand aanvullend als eigen smaakroute; dat maakt de klassieke vierdeling niet waardeloos, maar wel een startpunt.',
  },
  {
    question: 'Kan je streetfood eten in Thailand?',
    answer: 'Ja, maar “streetfood” is geen veiligheidsgarantie. Kies een kraam waar schoon wordt gewerkt, rauw en gaar voedsel gescheiden blijven en je gerecht goed wordt verhit. Drukte en snelle doorloop kunnen helpen, maar vervangen de vijf voedselveiligheidsprincipes van de WHO niet.',
  },
  {
    question: 'Welke Thaise gerechten zijn niet pittig?',
    answer: 'Khao man gai, veel versies van pad thai, massaman curry, gebakken rijst en mango sticky rice zijn vaak milder dan som tam of zuidelijke curry. Toch kan een saus of tafelcondiment chili bevatten. Vraag vóór het koken om weinig of geen chili en controleer het bord zelf.',
  },
  {
    question: 'Wat zijn de eetgewoontes in Thailand?',
    answer: 'Bij een groepsmaaltijd staan vaak meerdere gerechten centraal met rijst per persoon. Je neemt kleine porties van verschillende gerechten. Lepel en vork zijn gebruikelijk; een serveerlepel voorkomt dat persoonlijk bestek teruggaat in een gedeelde schaal. De precieze gewoonte verschilt per huishouden en eetplek.',
  },
  {
    question: 'Wat is in Thailand onbeleefd aan tafel?',
    answer: 'Een maaltijd domineren, eten verspillen of zonder te kijken de laatste portie nemen kan ongemakkelijk zijn. Volg het tempo van je gezelschap, schep kleine porties en gebruik een aanwezige serveerlepel. Huiselijke gewoonten verschillen, dus observeren en vriendelijk vragen werkt beter dan een starre lijst met verboden.',
  },
  {
    question: 'Kan je in Thailand vegetarisch eten?',
    answer: 'Ja, vooral in steden en bij gespecialiseerde vegetarische of jay-eetplekken. Vraag wel expliciet naar vissaus, oestersaus, garnalenpasta, bouillon en ei; “zonder vlees” betekent niet automatisch dat al deze ingrediënten ontbreken. Bij een strikt dieet is een plek die de bereiding kan uitleggen veiliger dan alleen een gerechtnaam vertrouwen.',
  },
  {
    question: 'Waar moet je op letten bij het eten in Thailand?',
    answer: 'Let op hygiëne, verhitting, temperatuur, water en rauwe ingrediënten. Vraag bij allergieën vooraf naar sauzen, currypasta’s en kruiscontact en neem een professioneel vertaalde allergiekaart mee. Actuele prijzen, porties en recepturen verschillen per locatie en moment.',
  },
  {
    question: 'Hoe duur is het eten in Thailand?',
    answer: 'Er bestaat geen tijdloze landelijke maaltijdprijs. Een kraam, food court, buurtrestaurant, eiland en luxe zaak hebben elk een ander prijsniveau. Vergelijk het actuele menu, portiegrootte, belasting en servicekosten ter plaatse. Voor je totale reisbudget helpt onze kostenpagina met scenario’s in plaats van één vast dagbedrag.',
  },
];

const sources = [
  {
    title: 'Discover Thai cuisine through its famous four regions',
    creator: 'Tourism Authority of Thailand — TAT Newsroom',
    url: 'https://www.tatnews.org/2018/01/discover-thai-cuisine-famous-four-regions/',
    note: 'Officiële basis voor de culinaire vierdeling, smaakprofielen en regionale voorbeelden.',
  },
  {
    title: 'Local food',
    creator: 'Tourism Authority of Thailand',
    url: 'https://www.tourismthailand.org/Experiences/Details/local-food/31.',
    note: 'Uitleg van onder meer streetfood, curry-op-rijst en op-bestelling-bereide gerechten.',
  },
  {
    title: 'Sharing is giving in Thai food culture',
    creator: 'TAT Newsroom',
    url: 'https://www.tatnews.org/2017/04/sharing-giving-thai-food-culture/',
    note: 'Context voor gedeelde gerechten, rijst per persoon en kleine porties naast elkaar.',
  },
  {
    title: 'Thai Food',
    creator: 'Thailand Foundation',
    url: 'https://thailandfoundation.or.th/culture-heritage/thai-food/',
    note: 'Culturele achtergrond, invloeden via handel en migratie en de overgang naar streetfood.',
  },
  {
    title: 'Five keys to safer food',
    creator: 'World Health Organization',
    url: 'https://www.who.int/activities/promoting-safe-food-handling/five-key-to-safer-food/',
    note: 'Internationale basis voor schoon werken, scheiding, verhitting, temperatuur en veilig water.',
  },
  {
    title: 'Food Allergy Chef Cards',
    creator: 'FARE',
    url: 'https://www.foodallergy.org/resources/food-allergy-chef-cards',
    note: 'Reisgerichte chef-cardtemplates en expliciete waarschuwing dat vertaling en dialect nuance kunnen geven.',
  },
];

function buildSchemas() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      image: [`https://go2-thailand.com${HERO_IMAGE}`],
      mainEntityOfPage: PAGE_URL,
      inLanguage: 'nl-NL',
      dateModified: '2026-07-26',
      author: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
      publisher: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/nl/' },
        { '@type': 'ListItem', position: 2, name: 'Eten in Thailand', item: PAGE_URL },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'Zo bestel je een gebalanceerde Thaise maaltijd',
      description: 'Vier stappen om eetplek, aanpassingen, bevestiging en gerechtcombinatie te kiezen.',
      step: orderSteps.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.title,
        text: step.text,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Typische gerechten om in Thailand te proeven',
      itemListElement: Object.entries(dishProfiles).map(([slug, profile], index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: slug,
        description: profile.note,
        url: `https://go2-thailand.com/nl/food/${slug}/`,
      })),
    },
  ];
}

export default function ThailandFoodHub({ dishes }: ThailandFoodHubProps) {
  const [activeMood, setActiveMood] = useState<MoodKey>('eerste-avond');
  const subId = useSubId();
  const klookHref = withPlacementSubId(KLOOK_GENERIC, subId, 'thailand-food-hub-tour');
  const dishMap = useMemo(() => new Map(dishes.map((dish) => [dish.slug, dish])), [dishes]);
  const featuredDishes = Object.keys(dishProfiles).map((slug) => dishMap.get(slug)).filter((dish): dish is Dish => Boolean(dish));
  const moodDishes = moodDishSlugs[activeMood].map((slug) => dishMap.get(slug)).filter((dish): dish is Dish => Boolean(dish));

  return (
    <>
      <SEOHead title={PAGE_TITLE} description={PAGE_DESCRIPTION} ogImage={HERO_IMAGE}>
        {buildSchemas().map((schema, index) => (
          <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}
      </SEOHead>

      <main className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          image={HERO_IMAGE}
          imageAlt="Reizigers kiezen gerechten bij een Thaise open keuken"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Eten in Thailand' }]}
          eyebrow="Proef Thailand per bord"
          title={<>Eten in Thailand.<br />Bestel verder<br />dan pad thai.</>}
          description={<>Begin niet met een top tien, maar met contrast: rijst of noedels, fris en rijk, mild en pittig, centraal en regionaal. Zo wordt iedere maaltijd een volgende stap in je reis.</>}
          actions={[
            { label: 'Kies je eerste gerechten', href: '#gerechten', kind: 'primary' },
            { label: 'Volg de vier regio’s', href: '#regios', kind: 'secondary' },
          ]}
          sideCard={
            <div className="absolute bottom-8 right-[4vw] z-10 hidden w-[270px] rounded-2xl border border-white/60 bg-white/82 p-5 shadow-editorial-lift backdrop-blur-md xl:block">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">Je eerste tafel</p>
              <p className="mt-2 font-display text-[1.6rem] font-semibold leading-none text-jade">Vier smaken, drie gerechten</p>
              <div className="mt-4 space-y-2 text-[10px] font-bold text-charcoal/65">
                <span className="flex items-center justify-between rounded-lg bg-mist px-3 py-2">Iets fris <span className="text-saffron-dark">som tam</span></span>
                <span className="flex items-center justify-between rounded-lg bg-mist px-3 py-2">Iets uit de wok <span className="text-saffron-dark">pad krapow</span></span>
                <span className="flex items-center justify-between rounded-lg bg-mist px-3 py-2">Iets zachts <span className="text-saffron-dark">massaman</span></span>
              </div>
            </div>
          }
          minHeightClassName="min-h-[760px] lg:min-h-[690px]"
          imageClassName="object-cover object-[72%_center] lg:object-center"
          titleClassName="max-w-[680px] text-[3.8rem] leading-[0.86] sm:text-[5rem] lg:text-[5.8rem]"
        />

        <PageSectionNav items={sectionNav} />

        <section id="start" className="section-divider-bottom scroll-mt-24 bg-tonal py-12 lg:py-16">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:items-center">
            <div>
              <p className="eyebrow">Het korte antwoord</p>
              <h2 className="font-display text-[3.15rem] font-semibold leading-[0.88] tracking-[-0.04em] text-jade">De Thaise keuken is geen lijst. Het is een landschap.</h2>
              <p className="mt-5 max-w-md text-sm font-medium leading-7 text-charcoal/65">Een gerecht verandert met regio, kok, seizoen en eetplek. Gebruik deze hub om een keuze te maken; open daarna de specialistische gerecht- of stadsgids.</p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-jade/10 bg-jade/10 sm:grid-cols-3">
              <article className="bg-white p-6">
                <UtensilsCrossed size={24} strokeWidth={1.35} className="text-saffron-dark" />
                <p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">Stap 1</p>
                <h3 className="mt-2 font-display text-[1.65rem] font-semibold leading-none text-jade">Kies een eetformat</h3>
                <p className="mt-3 text-xs font-medium leading-5 text-charcoal/64">Wok, curry op rijst, kraam of gedeelde tafel vragen ieder een andere bestelstrategie.</p>
              </article>
              <article className="bg-jade p-6 text-white">
                <MapPinned size={24} strokeWidth={1.35} className="text-saffron-light" />
                <p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-light">Stap 2</p>
                <h3 className="mt-2 font-display text-[1.65rem] font-semibold leading-none">Proef de regio</h3>
                <p className="mt-3 text-xs font-medium leading-5 text-white/67">Noord, Isaan, Centraal en Zuid gebruiken dezelfde smaakwoorden op een eigen manier.</p>
              </article>
              <article className="bg-white p-6">
                <MessageCircle size={24} strokeWidth={1.35} className="text-jade" />
                <p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">Stap 3</p>
                <h3 className="mt-2 font-display text-[1.65rem] font-semibold leading-none text-jade">Vraag vóór het koken</h3>
                <p className="mt-3 text-xs font-medium leading-5 text-charcoal/64">Pittigheid is een voorkeur; een allergie of strikt dieet vraagt om ingrediënten én kruiscontact.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="gerechten" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <SectionHeading eyebrow="Kies op reismoment" title="Wat past bij je volgende bord?" description="Niet iedereen wil op avond één dezelfde sprong maken. Kies een richting en vergelijk drie logische starters." />
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:justify-self-end">
                {moodOptions.map(({ key, label, icon: Icon }) => {
                  const active = activeMood === key;
                  return <button key={key} type="button" onClick={() => setActiveMood(key)} aria-pressed={active} className={`flex min-h-12 items-center justify-center gap-2 rounded-xl border px-4 text-[11px] font-extrabold transition ${active ? 'border-jade bg-jade text-white' : 'border-jade/12 bg-white text-jade hover:border-saffron/40'}`}><Icon size={15} className={active ? 'text-saffron-light' : 'text-saffron-dark'} />{label}</button>;
                })}
              </div>
            </div>

            <div className="mt-9 grid gap-5 md:grid-cols-3">
              {moodDishes.map((dish, index) => {
                const profile = dishProfiles[dish.slug];
                return (
                  <Link key={dish.slug} href={`/food/${dish.slug}/`} className={`group relative min-h-[390px] overflow-hidden rounded-[22px] ${index === 1 ? 'md:-translate-y-3' : ''}`}>
                    <Image src={dish.image} alt={`${dish.name.nl} als typisch gerecht in Thailand`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.04]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#062d27] via-[#062d27]/18 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                      <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-light">{profile.kicker}</p>
                      <div className="mt-2 flex items-end justify-between gap-4"><h3 className="font-display text-[2.25rem] font-semibold leading-none">{dish.name.nl}</h3><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/25"><ArrowRight size={15} className="text-saffron-light transition group-hover:translate-x-1" /></span></div>
                      <p className="mt-3 text-xs font-medium leading-5 text-white/68">{profile.note}</p>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-14 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div><p className="eyebrow">Acht ankerpunten</p><h2 className="font-display text-[3rem] font-semibold leading-[0.9] tracking-[-0.04em] text-jade">Van bekende klassieker naar regionaal spoor</h2></div>
              <p className="max-w-xl text-sm font-medium leading-7 text-charcoal/64">Deze selectie geeft contrast, geen ranglijst. Klik door voor ingrediënten, dieetcontext en de specialistische pagina van het gerecht.</p>
            </div>
            <div className="mt-8 divide-y divide-jade/10 border-y border-jade/10">
              {featuredDishes.map((dish, index) => {
                const profile = dishProfiles[dish.slug];
                return (
                  <Link key={dish.slug} href={`/food/${dish.slug}/`} className="group grid gap-4 py-5 sm:grid-cols-[48px_0.65fr_0.35fr_1.2fr_34px] sm:items-center">
                    <span className="font-display text-[1.8rem] font-semibold text-saffron-dark">{String(index + 1).padStart(2, '0')}</span>
                    <div><p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-charcoal/43">{profile.kicker}</p><h3 className="mt-1 font-display text-[1.7rem] font-semibold leading-none text-jade">{dish.name.nl}</h3></div>
                    <span className="w-fit rounded-full border border-jade/12 px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.1em] text-jade/65">{profile.spice}</span>
                    <p className="text-xs font-medium leading-6 text-charcoal/62">{profile.note}</p>
                    <ChevronRight size={17} className="text-saffron-dark transition group-hover:translate-x-1" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section id="regios" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
          <div className="container-custom grid gap-12 lg:grid-cols-[0.64fr_1.36fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="eyebrow">Van noord naar zuid</p>
              <h2 className="font-display text-[3.4rem] font-semibold leading-[0.86] tracking-[-0.04em] text-jade">Vier regio’s.<br />Vier smaakroutes.</h2>
              <p className="mt-5 max-w-md text-sm font-medium leading-7 text-charcoal/65">De klassieke vierdeling is een kompas, geen grensmuur. Migratie, handel, religie, klimaat en lokale producten laten gerechten voortdurend bewegen.</p>
              <div className="mt-7 flex items-start gap-3 rounded-xl border border-saffron/22 bg-saffron/[0.07] p-4 text-xs font-medium leading-6 text-charcoal/67"><MapPinned size={18} className="mt-0.5 shrink-0 text-saffron-dark" /><p>Oost-Thailand verschijnt in moderne gastronomiecampagnes soms als extra smaakroute. Hier gebruiken we de officiële klassieke vierdeling als begrijpelijk startpunt.</p></div>
            </div>
            <div className="relative">
              <div aria-hidden="true" className="absolute bottom-10 left-6 top-10 border-l-2 border-dashed border-saffron/55 sm:left-9" />
              <div className="space-y-4">
                {regionalRoute.map((item, index) => (
                  <Link key={item.region} href={item.link} className={`group relative ml-12 grid gap-5 rounded-2xl border border-jade/10 p-6 shadow-editorial-card transition hover:-translate-y-0.5 sm:ml-16 sm:grid-cols-[0.34fr_0.66fr] sm:p-8 ${item.tone}`}>
                    <span className="absolute -left-[55px] top-8 grid h-11 w-11 place-items-center rounded-full border-4 border-canvas bg-jade text-[10px] font-extrabold text-white sm:-left-[82px] sm:h-14 sm:w-14">0{index + 1}</span>
                    <div><p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">{item.place}</p><h3 className="mt-2 font-display text-[2.2rem] font-semibold leading-none text-jade">{item.region}</h3></div>
                    <div><p className="text-sm font-semibold leading-6 text-charcoal/72">{item.flavour}</p><p className="mt-3 text-xs font-medium leading-5 text-charcoal/55">{item.dishes}</p><span className="mt-4 inline-flex items-center gap-2 text-[10px] font-extrabold text-jade">Open een regionaal gerecht <ArrowRight size={13} className="text-saffron-dark transition group-hover:translate-x-1" /></span></div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="streetfood" className="scroll-mt-24 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="relative mx-auto min-h-[380px] max-w-[1500px] overflow-hidden rounded-[26px] bg-jade text-white shadow-editorial-lift">
            <Image src="/images/redesign/thailand-food-street-banner.webp" alt="Avondroute langs Thaise streetfoodkramen" fill sizes="(max-width: 1500px) 100vw, 1500px" className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#052a25] via-[#052a25]/80 to-transparent" />
            <div className="relative z-10 flex min-h-[380px] max-w-[620px] flex-col justify-center p-8 sm:p-12 lg:p-16">
              <p className="eyebrow !text-saffron-light">Streetfood zonder checkliststress</p>
              <h2 className="font-display text-[3.4rem] font-semibold leading-[0.86] tracking-[-0.04em]">Kijk naar het werk, niet naar een viral kraam.</h2>
              <p className="mt-5 max-w-lg text-sm font-medium leading-7 text-white/72">Een korte kaart en één specialiteit zijn vaak duidelijker dan honderd keuzes. Let op schoon werken, scheiding en goede verhitting; drukte is slechts één signaal, nooit een garantie.</p>
              <a href={klookHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-cream mt-7 w-fit text-saffron-dark">Vergelijk een begeleide foodtour <ExternalLink size={15} /></a>
              <AffiliateDisclosure className="mt-3 max-w-lg !text-white/55">Affiliate: via Klook kunnen wij commissie ontvangen zonder extra kosten voor jou. Controleer actuele route, inclusies, talen, dieetmogelijkheden en annuleringsvoorwaarden vóór je boekt.</AffiliateDisclosure>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-14 lg:py-20">
          <div className="container-custom">
            <SectionHeading eyebrow="Vier eetformats" title="De plek bepaalt hoe je bestelt" description="Een goede keuze begint niet bij de gerechtnaam maar bij wat de keuken ter plekke kan bereiden, uitleggen en aanpassen." />
            <div className="mt-9 grid gap-px overflow-hidden rounded-2xl border border-jade/10 bg-jade/10 md:grid-cols-2 lg:grid-cols-4">
              {foodFormats.map(({ title, label, description, prompt, icon: Icon }, index) => (
                <article key={title} className={`${index === 1 ? 'bg-mist' : index === 3 ? 'bg-jade text-white' : 'bg-white'} p-7`}>
                  <Icon size={25} strokeWidth={1.35} className={index === 3 ? 'text-saffron-light' : 'text-saffron-dark'} />
                  <p className={`mt-6 text-[9px] font-extrabold uppercase tracking-[0.14em] ${index === 3 ? 'text-saffron-light' : 'text-saffron-dark'}`}>{title}</p>
                  <h3 className={`mt-2 font-display text-[1.8rem] font-semibold leading-none ${index === 3 ? 'text-white' : 'text-jade'}`}>{label}</h3>
                  <p className={`mt-4 text-xs font-medium leading-6 ${index === 3 ? 'text-white/66' : 'text-charcoal/62'}`}>{description}</p>
                  <p className={`mt-5 border-t pt-4 text-[10px] font-bold leading-5 ${index === 3 ? 'border-white/12 text-white/76' : 'border-jade/10 text-jade'}`}>{prompt}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="bestellen" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="relative min-h-[520px] overflow-hidden rounded-[24px] shadow-editorial-lift">
              <Image src="/images/redesign/thailand-food-shared-table.webp" alt="Gedeelde Thaise maaltijd met meerdere gerechten en rijst" fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
              <div className="absolute inset-x-5 bottom-5 rounded-xl border border-white/35 bg-[#082f29]/88 p-5 text-white backdrop-blur-md">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-light">Tafelritme</p>
                <p className="mt-2 text-xs font-semibold leading-5 text-white/75">Schep kleine porties naast je rijst, proef eerst en bouw daarna verder.</p>
              </div>
            </div>
            <div>
              <SectionHeading eyebrow="Bestellen in vier stappen" title="Van menustress naar een tafel met contrast" description="Deze route werkt bij een eerste maaltijd én wanneer je later bewust een regio wilt proeven." />
              <ol className="mt-8 divide-y divide-jade/10 border-y border-jade/10">
                {orderSteps.map(({ title, text, icon: Icon }, index) => (
                  <li key={title} className="grid gap-3 py-5 sm:grid-cols-[42px_0.75fr_1.25fr] sm:items-start">
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-saffron/35 text-saffron-dark"><Icon size={16} /></span>
                    <div><p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">Stap {index + 1}</p><h3 className="mt-1 text-sm font-extrabold text-jade">{title}</h3></div>
                    <p className="text-xs font-medium leading-6 text-charcoal/64">{text}</p>
                  </li>
                ))}
              </ol>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-jade/10 bg-white p-5"><p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">Pittigheid</p><p className="mt-2 text-xs font-semibold leading-6 text-charcoal/68"><strong className="text-jade">Mai phet</strong> wordt vaak gebruikt voor “niet pittig”. Zie dit als een verzoek, niet als allergie-instructie.</p></div>
                <div className="rounded-xl border border-jade/10 bg-white p-5"><p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">Ingrediënten</p><p className="mt-2 text-xs font-semibold leading-6 text-charcoal/68">Bij een medische grens: toon een professioneel vertaalde kaart en vraag of de keuken kruiscontact kan vermijden.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="dieet" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <SectionHeading eyebrow="Dieet & allergie" title="Een label is pas het begin van het gesprek" description="Vegetarisch, vegan en allergie zijn drie verschillende beslissingen. Maak zichtbaar wat niet in het gerecht én niet via dezelfde bereiding mag terugkomen." />
              <div className="flex gap-3 rounded-xl border border-saffron/20 bg-saffron/[0.07] p-4 text-xs font-medium leading-6 text-charcoal/68 lg:justify-self-end"><AlertTriangle size={18} className="mt-0.5 shrink-0 text-saffron-dark" /><p className="max-w-xl"><strong className="text-jade">Bij ernstige allergie:</strong> vertrouw niet op deze pagina of één uitspraak. Bespreek je noodplan medisch, neem medicatie mee zoals voorgeschreven en kies een eetplek die ingrediënten en kruiscontact kan uitleggen.</p></div>
            </div>
            <div className="mt-9 grid gap-px overflow-hidden rounded-2xl border border-jade/10 bg-jade/10 lg:grid-cols-3">
              <article className="bg-white p-7"><Leaf size={25} className="text-jade" /><p className="mt-6 text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">Vegetarisch</p><h3 className="mt-2 font-display text-[1.9rem] font-semibold leading-none text-jade">Vraag ook naar de smaakmakers</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">Geen zichtbaar vlees betekent niet automatisch geen vissaus, oestersaus, garnalenpasta, bouillon of ei. Een gespecialiseerde vegetarische of jay-keuken kan vaak duidelijker antwoorden.</p><Link href="/travel-guides/vegetarian-vegan-thailand/" className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-jade">Open de vega-gids <ArrowRight size={13} className="text-saffron-dark" /></Link></article>
              <article className="bg-mist p-7"><WheatOff size={25} className="text-jade" /><p className="mt-6 text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">Allergie</p><h3 className="mt-2 font-display text-[1.9rem] font-semibold leading-none text-jade">Ingrediënt én kruiscontact</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">Sauzen, pasta’s en bouillon kunnen ingrediënten verbergen. Laat een professioneel vertaalde chef card zien en vraag of wok, olie, mes en werkvlak gedeeld worden.</p><a href="https://www.foodallergy.org/resources/food-allergy-chef-cards" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-jade">Bekijk chef cards van FARE <ExternalLink size={13} className="text-saffron-dark" /></a></article>
              <article className="bg-jade p-7 text-white"><ShieldCheck size={25} className="text-saffron-light" /><p className="mt-6 text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-light">Voedselveiligheid</p><h3 className="mt-2 font-display text-[1.9rem] font-semibold leading-none">Gebruik de vijf WHO-signalen</h3><ul className="mt-4 space-y-2 text-xs font-medium leading-5 text-white/68">{['Schoon werken','Rauw en gaar scheiden','Goed door en door verhitten','Veilige temperatuur','Veilig water en grondstoffen'].map((item) => <li key={item} className="flex gap-2"><Check size={13} className="mt-0.5 shrink-0 text-saffron-light" />{item}</li>)}</ul><a href="https://www.who.int/activities/promoting-safe-food-handling/five-key-to-safer-food/" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-saffron-light">Open de WHO-richtlijn <ExternalLink size={13} /></a></article>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom bg-[#0a332d] py-14 text-white lg:py-20">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <div><p className="eyebrow !text-saffron-light">Na je reis</p><h2 className="font-display text-[3.2rem] font-semibold leading-[0.88] tracking-[-0.04em]">Neem de techniek mee, niet de schijnzekerheid.</h2><p className="mt-5 text-sm font-medium leading-7 text-white/65">Een goed kookboek of stevige vijzel helpt je thuis verder. Geen product maakt een recept automatisch “authentiek”; ingrediënten, techniek en broncontext blijven belangrijker.</p></div>
            <div>
              <div className="grid gap-3 sm:grid-cols-2">
                <a href="/go/simple-thai-food-cookbook/" target="_blank" rel="noopener noreferrer nofollow sponsored" className="group grid min-h-28 grid-cols-[42px_1fr_34px] items-center gap-4 rounded-xl border border-white/13 bg-white/[0.065] p-5 transition hover:border-saffron/45 hover:bg-white/[0.1]"><BookOpen size={23} className="text-saffron-light" /><div><p className="text-xs font-extrabold">Simple Thai Food</p><p className="mt-1 text-[10px] font-medium leading-5 text-white/54">Een kookboek om technieken en gerechten thuis verder te onderzoeken.</p></div><ExternalLink size={14} className="text-saffron-light" /></a>
                <a href="/go/thai-granite-mortar-eight-inch/" target="_blank" rel="noopener noreferrer nofollow sponsored" className="group grid min-h-28 grid-cols-[42px_1fr_34px] items-center gap-4 rounded-xl border border-white/13 bg-white/[0.065] p-5 transition hover:border-saffron/45 hover:bg-white/[0.1]"><ShoppingBag size={23} className="text-saffron-light" /><div><p className="text-xs font-extrabold">Granieten vijzel</p><p className="mt-1 text-[10px] font-medium leading-5 text-white/54">Voor stampen en textuur; controleer gewicht, maat en werkbladbescherming.</p></div><ExternalLink size={14} className="text-saffron-light" /></a>
              </div>
              <AffiliateDisclosure className="mt-4 !text-white/54">Amazon-affiliatelinks via onze centrale <strong className="text-white/72">/go/</strong>-router. Als Amazon-partner verdienen wij aan in aanmerking komende aankopen, zonder extra kosten voor jou. OneLink kan je naar een lokale Amazon-winkel sturen; product, prijs, verkoper en beschikbaarheid verschillen per land.</AffiliateDisclosure>
            </div>
          </div>
        </section>

        <FaqSplitSection id="vragen" eyebrow="Echte zoekvragen" title="Veelgestelde vragen over eten in Thailand" description="Deze vragen zijn letterlijk uit de Nederlandse zoekresultaten gehaald. Antwoorden scheiden reiskeuze, culturele context en voedselveiligheid." items={faqItems} />

        <RelatedGuidesSection
          eyebrow="Verder proeven"
          title="Open de specialistische foodroutes"
          guides={[
            { title: 'Thaise curry kiezen', description: 'Vergelijk groen, rood, geel, massaman en panang op basis, smaak en bestelcontext.', href: '/blog/thai-curry-guide-green-red-yellow-massaman-panang/', image: '/images/redesign/thai-curry-guide-hero.webp' },
            { title: 'Drinken in Thailand', description: 'Van cha yen en koffie tot water, ijs, alcoholcontext en hydratatie.', href: '/drinks/', image: '/images/redesign/thai-drinks-hero.webp' },
            { title: '7-Eleven Thailand', description: 'Bouw een praktisch mandje en controleer etiketten, koeling en allergenen.', href: '/travel-guides/7-eleven-thailand/', image: '/images/redesign/seven-eleven-thailand-food.webp' },
          ]}
          sideLink={{ label: 'Bekijk food in Bangkok', href: '/city/bangkok/food/' }}
        />

        <SourceMethodSection
          title="Reisintentie vóór receptenruis"
          description="Laatst inhoudelijk gecontroleerd op 26 juli 2026. We combineerden zelfstandige Nederlandse DFS-, SERP-, concurrent- en PAA-research met officiële Thaise cultuur- en toerismebronnen, de WHO-richtlijn en FARE. Gerechten, ingrediënten en gewoonten verschillen per kok, regio en context; medische dieetbeslissingen blijven buiten deze reisgids."
          sources={sources}
        />
      </main>
    </>
  );
}
