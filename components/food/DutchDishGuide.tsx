import Image from 'next/image';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Check,
  ChefHat,
  CircleHelp,
  ExternalLink,
  Flame,
  Leaf,
  MapPin,
  MessageCircle,
  Minus,
  ShoppingBasket,
  Sparkles,
  UtensilsCrossed,
} from 'lucide-react';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { SectionHeading } from '../design/SectionHeading';
import { KLOOK_GENERIC, withSubId } from '../../lib/affiliates';
import { dutchDishProfiles, ingredientTranslations } from '../../lib/nl-dish-profiles';

export interface DishGuideData {
  id: number;
  slug: string;
  name: { en: string; nl?: string; thai?: string };
  category: string;
  region: string;
  spice_level: string;
  description?: { en?: string; nl?: string };
  ingredients?: string[];
  allergens?: string[];
  dietary?: string[];
  image: string;
}

interface DutchDishGuideProps {
  dish: DishGuideData;
  relatedDishes: DishGuideData[];
}

interface FaqItem {
  question: string;
  answer: string;
}

const categoryLabels: Record<string, string> = {
  'main-dish': 'Hoofdgerecht',
  salad: 'Salade',
  soup: 'Soep',
  curry: 'Curry',
  dessert: 'Dessert',
};

const regionDetails: Record<string, { label: string; route: string; text: string; places: Array<{ label: string; href: string }> }> = {
  central: {
    label: 'Centraal-Thailand',
    route: '/region/central/',
    text: 'In Centraal-Thailand komen rivierproducten, rijst, handelsinvloeden en stedelijke eetcultuur samen. Recepten veranderen van markt tot restaurant en van familie tot familie.',
    places: [{ label: 'Bangkok', href: '/city/bangkok/' }, { label: 'Ayutthaya', href: '/city/ayutthaya/' }],
  },
  northern: {
    label: 'Noord-Thailand',
    route: '/region/northern/',
    text: 'De Noord-Thaise keuken heeft een eigen Lanna-context met kruiden, dips, noedels, stoofgerechten en kleefrijst. Niet elk noordelijk gerecht is automatisch mild.',
    places: [{ label: 'Chiang Mai', href: '/city/chiang-mai/' }, { label: 'Chiang Rai', href: '/city/chiang-rai/' }],
  },
  southern: {
    label: 'Zuid-Thailand',
    route: '/region/southern/',
    text: 'Zuid-Thaise gerechten gebruiken vaak vis, zeevruchten, kurkuma, kokos en krachtige currypasta’s. Phuket, Hat Yai en de kustprovincies hebben bovendien eigen handels- en eetculturen.',
    places: [{ label: 'Phuket', href: '/city/phuket/' }, { label: 'Hat Yai', href: '/city/hat-yai/' }],
  },
  northeastern: {
    label: 'Isaan',
    route: '/region/isaan/',
    text: 'In Isaan spelen kleefrijst, verse kruiden, chili, geroosterd rijstpoeder en gefermenteerde smaken vaak een rol. Veel gerechten zijn bedoeld om samen te delen.',
    places: [{ label: 'Khon Kaen', href: '/city/khon-kaen/' }, { label: 'Nong Khai', href: '/city/nong-khai/' }],
  },
  isaan: {
    label: 'Isaan',
    route: '/region/isaan/',
    text: 'In Isaan spelen kleefrijst, verse kruiden, chili, geroosterd rijstpoeder en gefermenteerde smaken vaak een rol. Veel gerechten zijn bedoeld om samen te delen.',
    places: [{ label: 'Khon Kaen', href: '/city/khon-kaen/' }, { label: 'Nong Khai', href: '/city/nong-khai/' }],
  },
};

const spiceLabels: Record<string, string> = {
  none: 'Niet pittig',
  mild: 'Mild',
  medium: 'Gemiddeld pittig',
  hot: 'Pittig',
  'very-hot': 'Zeer pittig',
  'very hot': 'Zeer pittig',
};

const allergenLabels: Record<string, string> = {
  nuts: 'noten',
  peanuts: 'pinda',
  seafood: 'vis of zeevruchten',
  shellfish: 'schaaldieren',
  soy: 'soja',
  egg: 'ei',
  eggs: 'ei',
  gluten: 'gluten',
  dairy: 'melk',
  fish: 'vis',
};

const researchedFaqs: Record<string, FaqItem[]> = {
  'pad-thai': [
    { question: 'Wat is pad thai?', answer: 'Pad Thai is een Thais wokgerecht met rijstnoedels en een zoetzure, hartige saus. Ei, tofu, taugé, pinda, limoen en een gekozen proteïne komen vaak voor, maar de samenstelling verschilt per keuken.' },
    { question: 'Wat zit er in een pad thai?', answer: 'Veel versies bevatten rijstnoedels, tamarinde, taugé, tofu, ei en pinda. Vissaus, gedroogde garnaal, kip of verse garnalen kunnen ook voorkomen. Vraag daarom altijd naar de huisversie wanneer dieet of allergie belangrijk is.' },
  ],
  'som-tam': [
    { question: 'Wat is som tum thai?', answer: 'Som tam Thai is een variant van gestampte groene-papajasalade. De dressing combineert doorgaans limoen, chili, palmsuiker en vissaus; pinda en gedroogde garnaal komen vaak voor.' },
    { question: 'Wat is Thaise groene papaja?', answer: 'Groene papaja is de onrijpe vrucht. Het stevige, neutrale vruchtvlees wordt in dunne reepjes gesneden en neemt de zure, zoute, zoete en pittige dressing goed op.' },
  ],
  'tom-yum-goong': [
    { question: 'Wat is Tom Yum Goong?', answer: 'Tom yum goong is een Thaise zure en pittige garnalensoep met aromaten zoals citroengras, galanga en makrut-limoenblad. Er bestaan heldere en romigere uitvoeringen.' },
    { question: 'Wat is tom yum in Thailand?', answer: 'Tom yum is een familie van zuur-pittige soepen; “goong” of “kung” wijst op garnaal. De kennis en kookpraktijk rond Tomyum Kung staat sinds 2024 op de representatieve UNESCO-lijst voor immaterieel cultureel erfgoed.' },
  ],
  'khao-soi': [
    { question: 'Wat zit er in Khao Soi?', answer: 'Een typische kom bevat eiernoedels, kokoscurry, een proteïne en krokante noedels. Limoen, sjalot en ingelegde groente worden vaak apart geserveerd. Bouillon en currypasta verschillen per keuken.' },
    { question: 'Is Khao Soi pittig?', answer: 'Khao soi is meestal kruidig en kan pittig zijn, maar de intensiteit verschilt sterk. Vraag vooraf naar het chiliniveau en voeg de chilipasta aan tafel voorzichtig toe.' },
  ],
};

const officialSources = [
  { label: 'Tourism Authority of Thailand · Local food', href: 'https://www.tourismthailand.org/Experiences/Details/local-food/31' },
  { label: 'Thailand Foundation · Thai Food', href: 'https://thailandfoundation.or.th/culture-heritage/thai-food/' },
];

function absoluteImage(image: string): string {
  return image.startsWith('http') ? image : `https://go2-thailand.com${image}`;
}

function displayName(dish: DishGuideData): string {
  return dish.name.nl || dish.name.en;
}

function translateIngredient(ingredient: string): string {
  return ingredientTranslations[ingredient.toLowerCase()] || ingredient;
}

function TasteMeter({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-[10px] font-extrabold uppercase tracking-[0.13em] text-white/62">
        <span>{label}</span>
        <span>{value}/5</span>
      </div>
      <div className="grid grid-cols-5 gap-1.5" aria-label={`${label}: ${value} van 5`}>
        {[1, 2, 3, 4, 5].map((step) => <span key={step} className={`h-1.5 rounded-full ${step <= value ? 'bg-saffron' : 'bg-white/14'}`} />)}
      </div>
    </div>
  );
}

export function DutchDishGuide({ dish, relatedDishes }: DutchDishGuideProps) {
  const name = displayName(dish);
  const profile = dutchDishProfiles[dish.slug];
  const region = regionDetails[dish.region] || regionDetails.central;
  const category = categoryLabels[dish.category] || 'Thais gerecht';
  const spice = spiceLabels[dish.spice_level] || dish.spice_level;
  const ingredients = (dish.ingredients || []).map(translateIngredient);
  const allergens = (dish.allergens || []).map((allergen) => allergenLabels[allergen.toLowerCase()] || allergen);
  const faqs = researchedFaqs[dish.slug] || [];
  const canonical = `https://go2-thailand.com/nl/food/${dish.slug}/`;
  const fullSeoTitle = `${name} in Thailand: smaak, ingrediënten & bestellen`;
  const seoTitle = fullSeoTitle.length > 65 ? `${name}: smaak, ingrediënten & bestellen` : fullSeoTitle;
  const seoDescription = `${name} proberen in Thailand? Ontdek hoe het smaakt, welke ingrediënten kunnen voorkomen, hoe je het bestelt en bij welk type eter het past.`;
  const klookHref = withSubId(KLOOK_GENERIC, `dish-${dish.slug}-nl-cooking`);
  const amazonProducts = dish.category === 'dessert'
    ? [
        { href: '/go/simple-thai-food-cookbook/', title: 'Thaise kookboekbasis', text: 'Voor technieken en context die verder gaan dan één losse receptkaart.', icon: BookOpen },
        { href: '/go/zojirushi-six-cup-rice-cooker/', title: 'Rijstkoker vergelijken', text: 'Alleen relevant als je thuis vaak rijst maakt; capaciteit en productspecificaties verschillen.', icon: ShoppingBasket },
      ]
    : [
        { href: '/go/simple-thai-food-cookbook/', title: 'Thaise kookboekbasis', text: 'Om saus, techniek en regionale varianten in samenhang te leren begrijpen.', icon: BookOpen },
        { href: '/go/thai-granite-mortar-eight-inch/', title: 'Granieten vijzel vergelijken', text: 'Functioneel voor currypasta, chili en dressings; formaat en gewicht vragen aandacht.', icon: UtensilsCrossed },
      ];

  const schemas: Array<Record<string, unknown>> = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: `${name} in Thailand`,
      description: seoDescription,
      inLanguage: 'nl-NL',
      mainEntityOfPage: canonical,
      image: absoluteImage(dish.image),
      dateModified: '2026-07-26',
      author: { '@type': 'Organization', name: 'Go2Thailand.com', url: 'https://go2-thailand.com/' },
      publisher: { '@type': 'Organization', name: 'Go2Thailand.com', url: 'https://go2-thailand.com/' },
      about: [{ '@type': 'Thing', name }, { '@type': 'Place', name: region.label }],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://go2-thailand.com/nl/' },
        { '@type': 'ListItem', position: 2, name: 'Thais eten', item: 'https://go2-thailand.com/nl/food/' },
        { '@type': 'ListItem', position: 3, name, item: canonical },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `Ingrediëntsignalen voor ${name}`,
      itemListElement: ingredients.map((ingredient, index) => ({ '@type': 'ListItem', position: index + 1, name: ingredient })),
    },
  ];

  if (faqs.length) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
    });
  }

  return (
    <>
      <SEOHead title={seoTitle} description={seoDescription} ogImage={absoluteImage(dish.image)}>
        {schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      </SEOHead>

      <div className="min-h-screen bg-canvas text-charcoal">
        <section className="relative min-h-[680px] overflow-hidden bg-tonal lg:min-h-[650px]">
          <Image src={dish.image} alt={`${name}, een Thais gerecht`} fill priority sizes="100vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(252,250,246,0.08)_0%,rgba(252,250,246,0.5)_43%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.99)_0%,rgba(252,250,246,0.93)_39%,rgba(252,250,246,0.28)_67%,rgba(18,63,54,0.14)_100%)]" />
          <div className="absolute -right-24 top-28 hidden h-72 w-72 rounded-full border border-white/30 lg:block" />
          <div className="container-custom relative z-10 flex min-h-[680px] items-end pb-11 pt-32 lg:min-h-[650px] lg:items-center lg:pb-0 lg:pt-20">
            <div className="max-w-[650px]">
              <nav aria-label="Kruimelpad" className="mb-5 flex flex-wrap items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-jade/65">
                <Link href="/" className="hover:text-saffron-dark">Home</Link><span>/</span>
                <Link href="/food/" className="hover:text-saffron-dark">Thais eten</Link><span>/</span>
                <span className="text-jade">{name}</span>
              </nav>
              <p className="eyebrow">Proef met context</p>
              <h1 className="max-w-[650px] font-display text-[4.3rem] font-semibold leading-[0.82] tracking-[-0.055em] text-jade sm:text-[5.4rem] lg:text-[6.25rem]">{name}</h1>
              {dish.name.thai ? <p lang="th" className="mt-4 font-display text-2xl font-semibold text-jade/72">{dish.name.thai}</p> : null}
              <p className="mt-5 max-w-[590px] text-sm font-medium leading-7 text-charcoal/72">{profile.lead}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#bestellen" className="btn-jade btn-jade-pattern group min-h-12 w-full justify-center px-6 sm:w-auto">Zo bestel je dit <ArrowRight size={16} className="text-saffron transition group-hover:translate-x-1" /></a>
                <Link href="/food/" className="btn-cream group min-h-12 w-full justify-center px-6 text-saffron-dark sm:w-auto">Alle Thaise gerechten <span className="grid h-6 w-6 place-items-center rounded-md border border-saffron/45"><ArrowRight size={14} /></span></Link>
              </div>
            </div>
          </div>
          <aside className="absolute bottom-7 right-[max(2rem,calc((100vw-80rem)/2+2rem))] z-10 hidden w-[300px] overflow-hidden rounded-2xl border border-white/30 bg-jade/92 p-6 text-white shadow-[0_20px_55px_rgba(8,47,41,0.22)] backdrop-blur-md xl:block">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-saffron-light">In één blik</p>
            <div className="mt-5 grid gap-4 text-xs font-bold">
              <span className="flex items-center gap-3"><ChefHat size={17} className="text-saffron-light" /> {category}</span>
              <span className="flex items-center gap-3"><MapPin size={17} className="text-saffron-light" /> {region.label}</span>
              <span className="flex items-center gap-3"><Flame size={17} className="text-saffron-light" /> {spice}</span>
            </div>
          </aside>
        </section>

        <nav aria-label="Op deze pagina" className="sticky top-20 z-20 border-y border-jade/10 bg-canvas/95 backdrop-blur lg:top-[72px]">
          <div className="container-custom flex gap-8 overflow-x-auto py-4 text-[10px] font-extrabold uppercase tracking-[0.12em] text-jade/64 scrollbar-hide">
            <a href="#proeven" className="shrink-0 hover:text-saffron-dark">Smaakprofiel</a>
            <a href="#ingredienten" className="shrink-0 hover:text-saffron-dark">Ingrediënten</a>
            <a href="#bestellen" className="shrink-0 hover:text-saffron-dark">Bestellen</a>
            <a href="#regio" className="shrink-0 hover:text-saffron-dark">Regio</a>
            <a href="#thuis" className="shrink-0 hover:text-saffron-dark">Thuis verder</a>
          </div>
        </nav>

        <section id="proeven" className="section-divider-bottom py-16 lg:py-24 scroll-mt-32">
          <div className="container-custom grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <SectionHeading eyebrow="Eerst weten wat je bestelt" title={`Hoe smaakt ${name}?`} description={profile.flavour} />
              <div className="mt-8 grid gap-6 border-l border-saffron/45 pl-6 sm:grid-cols-2">
                <div><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">Textuur</p><p className="mt-2 text-sm font-medium leading-7 text-charcoal/66">{profile.texture}</p></div>
                <div><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">Aan tafel</p><p className="mt-2 text-sm font-medium leading-7 text-charcoal/66">{profile.pairing}</p></div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[28px] bg-jade p-7 text-white shadow-editorial-lift sm:p-10">
              <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full border border-white/8" />
              <div className="flex items-center justify-between"><div><p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-saffron-light">Smaakkompas</p><h2 className="mt-2 font-display text-[2.55rem] font-semibold leading-none">Vier signalen,<br />geen vaste formule.</h2></div><Sparkles size={28} className="text-saffron-light" /></div>
              <div className="mt-9 grid gap-6 sm:grid-cols-2">
                <TasteMeter label="Fris / zuur" value={profile.scores.fris} />
                <TasteMeter label="Hartig" value={profile.scores.hartig} />
                <TasteMeter label="Pittig" value={profile.scores.pittig} />
                <TasteMeter label="Romig" value={profile.scores.romig} />
              </div>
              <p className="mt-8 border-t border-white/12 pt-5 text-[10px] font-medium leading-5 text-white/52">Dit kompas beschrijft een gangbare uitvoering. Recept, regio, kok en jouw gekozen chiliniveau kunnen de balans veranderen.</p>
            </div>
          </div>
        </section>

        <section id="ingredienten" className="section-divider-bottom bg-tonal/55 py-16 lg:py-24 scroll-mt-32">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
              <SectionHeading eyebrow="Herken wat er in de kom kan zitten" title="Ingrediëntsignalen, geen garantie." description={<>Deze lijst helpt je gerichte vragen stellen. Hij is <strong>niet volledig</strong>: saus, pasta, bouillon, topping en gedeelde bereiding kunnen extra ingrediënten toevoegen.</>} />
              <div className="grid gap-px overflow-hidden rounded-2xl border border-jade/10 bg-jade/10 sm:grid-cols-2 lg:grid-cols-3">
                {ingredients.map((ingredient, index) => (
                  <div key={ingredient} className={`${index % 3 === 1 ? 'bg-mist' : 'bg-white'} flex min-h-24 items-center gap-4 p-5`}>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-saffron/30 bg-canvas text-[10px] font-extrabold text-saffron-dark">{String(index + 1).padStart(2, '0')}</span>
                    <span className="text-xs font-bold capitalize text-jade">{ingredient}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-9 grid gap-5 md:grid-cols-2">
              <article className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card sm:p-8">
                <div className="flex items-center gap-3"><AlertTriangle size={20} className="text-saffron-dark" /><h3 className="font-display text-[1.8rem] font-semibold text-jade">Allergenen checken</h3></div>
                <p className="mt-4 text-sm font-medium leading-7 text-charcoal/65">{allergens.length ? `De basisdata signaleert ${allergens.join(', ')}. ` : ''}Vraag daarnaast naar sauzen, currypasta, bouillon, toppings en kruiscontact. Een afwezig ingrediënt op dit lijstje is geen veiligheidsbelofte.</p>
              </article>
              <article className="rounded-2xl border border-jade/10 bg-jade p-6 text-white shadow-editorial-card sm:p-8">
                <div className="flex items-center gap-3"><Leaf size={20} className="text-saffron-light" /><h3 className="font-display text-[1.8rem] font-semibold">Vegetarisch of vegan?</h3></div>
                <p className="mt-4 text-sm font-medium leading-7 text-white/66">Groente of tofu zegt niet alles. Vissaus, garnalenpasta, oestersaus en vleesbouillon kunnen onzichtbaar in de basis zitten.</p>
                <Link href="/travel-guides/vegetarian-vegan-thailand/" className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-saffron-light">Gebruik de bestelgids <ArrowRight size={14} /></Link>
              </article>
            </div>
          </div>
        </section>

        <section id="bestellen" className="section-divider-bottom py-16 lg:py-24 scroll-mt-32">
          <div className="container-custom">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading eyebrow="Van menukaart naar goede keuze" title={`Bestel ${name} in drie stappen.`} description="De naam van het gerecht is pas het begin. Variant, proteïne, chili en verborgen smaakmakers bepalen wat er echt op tafel komt." />
              <p className="max-w-sm text-xs font-bold leading-6 text-jade/55"><MessageCircle size={17} className="mb-2 text-saffron-dark" />Laat de medewerker desnoods een foto of ingrediënt aanwijzen. Dat is duidelijker dan een lange, fonetische zin.</p>
            </div>
            <div className="relative mt-10 grid gap-5 lg:grid-cols-3">
              <div className="pointer-events-none absolute left-[16%] right-[16%] top-10 hidden border-t-2 border-dashed border-saffron/55 lg:block" />
              {[
                { step: '1', title: 'Kies de uitvoering', text: profile.orderTip, icon: CircleHelp },
                { step: '2', title: 'Noem je grens', text: 'Bespreek chili, dierlijke saus en het allergeen zelf. Vraag ook naar bouillon, currypasta en gedeelde wok of frituurolie.', icon: MessageCircle },
                { step: '3', title: 'Proef vóór je bijstuurt', text: 'Gebruik limoen, chili, suiker of vissaus aan tafel pas na de eerste hap. Zo houd je de balans van de kok herkenbaar.', icon: Check },
              ].map(({ step, title, text, icon: Icon }) => (
                <article key={step} className="relative rounded-2xl border border-jade/10 bg-white p-7 shadow-editorial-card">
                  <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border-4 border-canvas bg-saffron text-sm font-black text-white shadow-lg">{step}</span>
                  <Icon size={21} className="mt-7 text-jade" />
                  <h3 className="mt-4 font-display text-[2rem] font-semibold leading-none text-jade">{title}</h3>
                  <p className="mt-4 text-xs font-medium leading-6 text-charcoal/62">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-divider-bottom bg-tonal/55 py-16 lg:py-24">
          <div className="container-custom grid gap-6 lg:grid-cols-2">
            <article className="rounded-[28px] border border-jade/10 bg-white p-7 shadow-editorial-card sm:p-10">
              <p className="eyebrow">Dit past waarschijnlijk</p>
              <h2 className="font-display text-[3rem] font-semibold leading-[0.9] text-jade">Kies dit als…</h2>
              <p className="mt-6 text-sm font-medium leading-7 text-charcoal/68">{profile.goodFor}</p>
              <div className="mt-8 flex items-start gap-4 border-t border-jade/10 pt-6"><Check size={20} className="mt-1 shrink-0 text-saffron-dark" /><p className="text-xs font-semibold leading-6 text-jade/70">Je vindt het prima dat dezelfde gerechtnaam per streek en keuken anders kan uitpakken.</p></div>
            </article>
            <article className="relative overflow-hidden rounded-[28px] bg-jade p-7 text-white shadow-editorial-lift sm:p-10">
              <div className="absolute -bottom-16 -right-16 h-52 w-52 rounded-full border border-white/8" />
              <p className="eyebrow !text-saffron-light">Vraag eerst even door</p>
              <h2 className="font-display text-[3rem] font-semibold leading-[0.9]">Let extra op als…</h2>
              <p className="mt-6 text-sm font-medium leading-7 text-white/68">{profile.watch}</p>
              <div className="mt-8 flex items-start gap-4 border-t border-white/12 pt-6"><Minus size={20} className="mt-1 shrink-0 text-saffron-light" /><p className="text-xs font-semibold leading-6 text-white/68">Een ernstige allergie vraagt rechtstreeks overleg met de keuken; deze redactionele pagina vervangt dat gesprek niet.</p></div>
            </article>
          </div>
        </section>

        <section id="regio" className="section-divider-bottom py-16 lg:py-24 scroll-mt-32">
          <div className="container-custom grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="relative h-[420px] overflow-hidden rounded-[28px] shadow-editorial-lift">
              <Image src={dish.image} alt={`${name} als onderdeel van de keuken van ${region.label}`} fill sizes="(max-width: 1024px) 100vw, 52vw" className="object-cover transition duration-700 hover:scale-[1.025]" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(8,47,41,0.88)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9"><p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-saffron-light">Smaak reist mee met de plek</p><p className="mt-2 font-display text-[2.35rem] font-semibold leading-none">{region.label}</p></div>
            </div>
            <div>
              <SectionHeading eyebrow="Regionale context" title={`${name} hoort bij meer dan één bord.`} description={region.text} />
              <p className="mt-6 text-sm font-medium leading-7 text-charcoal/66">Een gerecht kan buiten de herkomstregio overal verkrijgbaar zijn. Gebruik regio daarom als context, niet als bewijs dat iedere uitvoering “authentiek” of identiek is.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={region.route} className="btn-jade btn-jade-pattern group">Ontdek {region.label} <ArrowRight size={15} className="text-saffron transition group-hover:translate-x-1" /></Link>
                {region.places.map((place) => <Link key={place.href} href={place.href} className="btn-cream px-5 py-3 text-saffron-dark">{place.label}</Link>)}
              </div>
              <p className="mt-7 text-xs font-medium leading-6 text-charcoal/58">Wil je eerst het grotere plaatje? In de gids over <Link href="/food/" className="font-extrabold text-jade underline decoration-saffron/50 underline-offset-4">eten in Thailand</Link> vergelijken we regio’s, bestelvormen en bekende gerechten zonder alles op één hoop te gooien.</p>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom bg-tonal/55 py-16 lg:py-24">
          <div className="container-custom grid gap-7 lg:grid-cols-[1fr_0.82fr]">
            <div className="rounded-[28px] bg-jade p-7 text-white shadow-editorial-lift sm:p-10">
              <div className="flex items-start justify-between gap-5"><div><p className="eyebrow !text-saffron-light">Leren door te koken</p><h2 className="font-display text-[3.25rem] font-semibold leading-[0.88]">Vergelijk een kookles,<br />niet alleen een foto.</h2></div><ChefHat size={27} className="shrink-0 text-saffron-light" /></div>
              <p className="mt-6 max-w-2xl text-sm font-medium leading-7 text-white/66">Een goede les laat ingrediënten, techniek en alternatieven zien. De Klook-link opent breder Thais kooklesaanbod; controleer stad, menu, taal, dieetopties, groepsgrootte en annulering in het actuele product.</p>
              <a href={klookHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-cream mt-7 text-saffron-dark">Bekijk actuele kooklessen <ExternalLink size={15} /></a>
              <AffiliateDisclosure className="mt-4 !text-white/52">Klook-affiliatelink. Wij kunnen commissie ontvangen zonder dat jouw prijs stijgt. Een listing is geen garantie dat {name} tijdens jouw datum op het lesmenu staat.</AffiliateDisclosure>
            </div>
            <div className="rounded-[28px] border border-jade/10 bg-white p-7 shadow-editorial-card sm:p-10">
              <p className="eyebrow">Eetcontext</p>
              <h2 className="font-display text-[2.75rem] font-semibold leading-[0.9] text-jade">Maak van één gerecht een betere maaltijd.</h2>
              <p className="mt-5 text-sm font-medium leading-7 text-charcoal/66">De Thaise tafel draait vaak om contrast en delen. Lees hoe drank, zuur, rijst en mildere gerechten naast een krachtige smaak kunnen werken.</p>
              <div className="mt-7 grid gap-3">
                <Link href="/drinks/" className="flex items-center justify-between border-b border-jade/10 py-3 text-xs font-extrabold text-jade">Thaise dranken kiezen <ArrowRight size={14} className="text-saffron" /></Link>
                <Link href="/travel-guides/vegetarian-vegan-thailand/" className="flex items-center justify-between border-b border-jade/10 py-3 text-xs font-extrabold text-jade">Vegetarisch en vegan bestellen <ArrowRight size={14} className="text-saffron" /></Link>
                {dish.category === 'curry' ? <Link href="/blog/thai-curry-guide-green-red-yellow-massaman-panang/" className="flex items-center justify-between border-b border-jade/10 py-3 text-xs font-extrabold text-jade">Thaise curries vergelijken <ArrowRight size={14} className="text-saffron" /></Link> : null}
              </div>
            </div>
          </div>
        </section>

        <section id="thuis" className="section-divider-bottom py-16 lg:py-24 scroll-mt-32">
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[0.68fr_1.32fr] lg:items-end">
              <SectionHeading eyebrow="Thuis verder proeven" title="Gereedschap met een taak." description="Geen willekeurige souvenirwinkel: alleen twee producten die kunnen helpen wanneer je structureel met Thaise smaken wilt oefenen." />
              <div className="grid gap-5 sm:grid-cols-2">
                {amazonProducts.map(({ href, title, text, icon: Icon }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer nofollow sponsored" className="group flex min-h-[205px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card transition hover:-translate-y-1 hover:border-saffron/45">
                    <div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/30 bg-canvas text-jade"><Icon size={20} /></span><ExternalLink size={15} className="text-saffron-dark" /></div>
                    <h3 className="mt-6 font-display text-[1.8rem] font-semibold leading-none text-jade">{title}</h3>
                    <p className="mt-3 text-xs font-medium leading-5 text-charcoal/60">{text}</p>
                    <span className="mt-auto pt-5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-jade">Bekijk actueel aanbod</span>
                  </a>
                ))}
              </div>
            </div>
            <AffiliateDisclosure className="mt-4 max-w-4xl">Amazon-affiliatelinks lopen via onze centrale <strong>/go/</strong>-router. Als Amazon-partner verdienen wij aan in aanmerking komende aankopen, zonder extra kosten voor jou. OneLink kan doorsturen naar een lokale Amazon-winkel; product, prijs, verkoper, productspecificaties en beschikbaarheid verschillen per land.</AffiliateDisclosure>
          </div>
        </section>

        {faqs.length ? (
          <section className="section-divider-bottom bg-tonal/55 py-16 lg:py-20">
            <div className="container-custom grid gap-10 lg:grid-cols-[0.55fr_1.45fr]">
              <SectionHeading eyebrow="Echte vragen uit de Nederlandse SERP" title={`Veelgestelde vragen over ${name}`} description="Vastgelegd via DataForSEO op 26 juli 2026; alleen vragen die werkelijk in de onderzochte zoekresultaten verschenen." />
              <div className="divide-y divide-jade/10 border-y border-jade/10">
                {faqs.map((faq) => <details key={faq.question} className="group py-1"><summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 text-sm font-extrabold text-jade"><span>{faq.question}</span><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-jade/15 text-saffron-dark transition group-open:rotate-45">+</span></summary><p className="max-w-3xl pb-6 pr-12 text-sm font-medium leading-7 text-charcoal/72">{faq.answer}</p></details>)}
              </div>
            </div>
          </section>
        ) : null}

        <section className="section-divider-bottom py-16 lg:py-24">
          <div className="container-custom">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><SectionHeading eyebrow="Blijf proeven" title={`Na ${name}: drie logische vervolgen.`} /><Link href="/food/" className="inline-flex items-center gap-2 text-xs font-extrabold text-jade">Alle gerechten <ArrowRight size={14} className="text-saffron" /></Link></div>
            <div className="mt-9 grid gap-5 md:grid-cols-3">
              {relatedDishes.slice(0, 3).map((related) => (
                <Link key={related.slug} href={`/food/${related.slug}/`} className="group overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card">
                  <div className="relative h-52 overflow-hidden"><Image src={related.image} alt={displayName(related)} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.04]" /></div>
                  <div className="p-6"><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">{categoryLabels[related.category] || 'Thais gerecht'}</p><h3 className="mt-2 font-display text-[1.9rem] font-semibold leading-none text-jade">{displayName(related)}</h3><p lang="th" className="mt-2 text-xs text-charcoal/48">{related.name.thai}</p><span className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-jade">Bekijk smaak en bestelwijze <ArrowRight size={14} className="text-saffron transition group-hover:translate-x-1" /></span></div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-jade py-14 text-white">
          <div className="container-custom grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div><p className="eyebrow !text-saffron-light">Bronnen & werkwijze</p><h2 className="font-display text-[2.7rem] font-semibold leading-[0.9]">Gecontroleerde context, geen vaste restaurantclaim.</h2></div>
            <div><p className="text-sm font-medium leading-7 text-white/64">Gerechtdata en regionale context zijn getoetst aan officiële culinaire bronnen. De uiteindelijke ingrediënten en bereiding blijven die van de verkoper; controleer ze ter plaatse opnieuw.</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{officialSources.map((source) => <a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer" className="flex min-h-14 items-center justify-between rounded-xl border border-white/12 bg-white/[0.06] px-4 text-[10px] font-bold leading-4 text-white/72 transition hover:border-saffron/45 hover:text-white"><span>{source.label}</span><ExternalLink size={13} className="shrink-0 text-saffron-light" /></a>)}{dish.slug === 'tom-yum-goong' ? <a href="https://ich.unesco.org/en/RL/tomyum-kung-01879" target="_blank" rel="noopener noreferrer" className="flex min-h-14 items-center justify-between rounded-xl border border-white/12 bg-white/[0.06] px-4 text-[10px] font-bold leading-4 text-white/72 transition hover:border-saffron/45 hover:text-white"><span>UNESCO · Tomyum Kung</span><ExternalLink size={13} className="shrink-0 text-saffron-light" /></a> : null}{dish.slug === 'pad-thai' ? <a href="https://thailandfoundation.or.th/th/853/" target="_blank" rel="noopener noreferrer" className="flex min-h-14 items-center justify-between rounded-xl border border-white/12 bg-white/[0.06] px-4 text-[10px] font-bold leading-4 text-white/72 transition hover:border-saffron/45 hover:text-white"><span>Thailand Foundation · Pad Thai</span><ExternalLink size={13} className="shrink-0 text-saffron-light" /></a> : null}</div><p className="mt-5 text-[10px] font-medium text-white/42">Redactioneel en SERP-onderzoek bijgewerkt: 26 juli 2026.</p></div>
          </div>
        </section>
      </div>
    </>
  );
}
