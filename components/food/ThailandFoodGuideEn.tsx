import Image from 'next/image';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  ChefHat,
  ExternalLink,
  Flame,
  HeartHandshake,
  Leaf,
  Map,
  MapPin,
  MessageCircle,
  Salad,
  ShieldCheck,
  ShoppingBasket,
  Soup,
  Sparkles,
  Store,
  UtensilsCrossed,
} from 'lucide-react';
import { KLOOK_GENERIC, withPlacementSubId } from '../../lib/affiliates';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';

const PAGE_URL = 'https://go2-thailand.com/travel-guides/thai-cuisine-food-guide/';
const HERO = '/images/redesign/thailand-food-hub-hero.webp';
const UPDATED_AT = '2026-07-29';

const startingPoints = [
  {
    label: 'Gentle & familiar',
    title: 'Start with noodles or rice',
    description: 'Pad see ew, khao man gai and khao pad are approachable formats. Sauces and garnishes still vary, so ask before assuming a dish is mild or allergen-free.',
    icon: Soup,
  },
  {
    label: 'Bright & punchy',
    title: 'Try salads and grilled food',
    description: 'Som tam, laab, gai yang and sticky rice make a lively shared meal. State your chilli preference and ask whether pla ra or fish sauce is used.',
    icon: Salad,
  },
  {
    label: 'Aromatic & spoonable',
    title: 'Choose a soup or curry',
    description: 'Tom yum is sharp and fragrant; tom kha is coconut-rich; massaman is usually gentler. Curry colour alone does not predict heat.',
    icon: Flame,
  },
  {
    label: 'Go beyond the classics',
    title: 'Follow the region',
    description: 'Khao soi in the north, Isaan grilled food, southern khua kling or Phuket Hokkien noodles reveal more than another generic top-ten list.',
    icon: Map,
  },
] as const;

const regions = [
  {
    name: 'Central & Bangkok',
    signal: 'Balance, river produce and layered curries',
    try: 'Tom yum, pad kra pao, boat noodles, green curry',
    note: 'Bangkok also has distinct royal, Chinese-Thai and migrant food traditions; it is more than one “central” menu.',
    image: '/images/redesign/bangkok-food-yaowarat.webp',
  },
  {
    name: 'Northern',
    signal: 'Herbs, chilli dips and less coconut milk',
    try: 'Khao soi, sai ua, nam prik ong, gaeng hang lay',
    note: 'Sticky rice and shared dishes are common. Chiang Mai is the easiest base, but the cuisine extends well beyond the city.',
    image: '/images/redesign/chiang-rai-food-coffee.webp',
  },
  {
    name: 'Northeastern / Isaan',
    signal: 'Sour, spicy, grilled and fermented',
    try: 'Som tam, laab, gai yang, sticky rice',
    note: 'Pla ra gives depth to many preparations. Ask clearly if fermented fish, fish sauce or dried shrimp matters to you.',
    image: '/images/redesign/khon-kaen-food.webp',
  },
  {
    name: 'Southern',
    signal: 'Turmeric, seafood and assertive heat',
    try: 'Khao yam, gaeng tai pla, khua kling, roti and curry',
    note: 'Muslim, Malay and Chinese-Thai influences vary by province. “Southern food” is a useful doorway, not one uniform cuisine.',
    image: '/images/redesign/phuket-food-kopitiam.webp',
  },
] as const;

const dishPaths = [
  {
    mood: 'One-bowl comfort',
    picks: [
      { name: 'Khao soi', note: 'Northern curry noodles with contrasting soft and crisp textures.', href: '/blog/khao-soi-chiang-mai-guide/' },
      { name: 'Boat noodles', note: 'A concentrated noodle bowl; order a second only after tasting the first.', href: '/food/boat-noodles/' },
      { name: 'Khao man gai', note: 'Chicken, seasoned rice, broth and a sauce that carries much of the character.', href: '/food/khao-man-gai/' },
    ],
  },
  {
    mood: 'Fresh, sour & grilled',
    picks: [
      { name: 'Som tam', note: 'Texture and heat are adjusted to order, but the dressing may include fish sauce and dried shrimp.', href: '/food/som-tam/' },
      { name: 'Laab', note: 'Minced meat, toasted rice powder, herbs, lime and chilli in an Isaan or Lao family of dishes.', href: '/food/larb/' },
      { name: 'Gai tod Hat Yai', note: 'Southern-style fried chicken with fried shallots; a useful gateway to Hat Yai food.', href: '/food/gai-tod-hat-yai/' },
    ],
  },
  {
    mood: 'Curries, soups & spice',
    picks: [
      { name: 'Tom yum goong', note: 'Hot-sour prawn soup led by lemongrass, galangal and makrut lime leaf.', href: '/food/tom-yum-goong/' },
      { name: 'Massaman curry', note: 'A slow, aromatic curry with a different spice profile from green or red curry.', href: '/food/massaman-curry/' },
      { name: 'Gaeng tai pla', note: 'An intense southern curry; better chosen knowingly than treated as a dare.', href: '/food/gaeng-tai-pla/' },
    ],
  },
] as const;

const venueChoices = [
  ['Street stall', 'One specialist dish, fast turnover and a visible cooking rhythm.', 'Look at what the stall actually cooks, where the queue forms and whether the dish suits your dietary needs.', Store],
  ['Market', 'Several small tastes and an easy way to compare savoury food, snacks and dessert.', 'Choose a bounded route rather than trying every aisle. Keep raw and cooked foods separate.', MapPin],
  ['Food court', 'Useful for mixed preferences, air-conditioning and clear stall choice.', 'Load or collect the payment card correctly and return any balance according to the venue rules.', ShoppingBasket],
  ['Restaurant', 'Shared regional dishes, curries and preparations that need more time or space.', 'Order as a table: something soupy, something fried or grilled, vegetables and rice create a better meal than duplicate mains.', UtensilsCrossed],
] as const;

const orderingSteps = [
  { thai: 'Ao ...', meaning: 'I would like ...', use: 'Point to the exact menu item, then confirm quantity.' },
  { thai: 'Mai phet', meaning: 'Not spicy', use: 'Useful preference language, not a measurable heat guarantee.' },
  { thai: 'Mai sai ...', meaning: 'Do not add ...', use: 'Name the ingredient, but remember stocks, pastes and sauces may already contain it.' },
  { thai: 'Kin jay', meaning: 'Eat jay food', use: 'Jay is a specific plant-based tradition; it is not identical to every traveller’s definition of vegan.' },
] as const;

const dietaryChecks = [
  {
    title: 'Vegetarian or vegan',
    body: 'A vegetable dish may still contain fish sauce, oyster sauce, shrimp paste, egg or a meat-based stock. Use a specialist guide and ask about the whole preparation, not only visible toppings.',
    href: '/blog/vegan-thai-food-guide/',
    link: 'Open the plant-based guide',
  },
  {
    title: 'Gluten or wheat',
    body: 'Rice noodles are not proof that the finished dish is gluten-free. Soy sauce, seasoning sauces, shared fryers and cross-contact can all matter.',
    href: '/blog/is-thai-food-gluten-free/',
    link: 'Read the gluten guide',
  },
  {
    title: 'Peanut, shellfish or fish',
    body: 'Peanuts may be a garnish; shellfish, dried shrimp, fish sauce and shrimp paste can be less visible. A translated allergy card helps communication but does not remove kitchen risk.',
    href: '/travel-insurance/',
    link: 'Plan for medical support',
  },
] as const;

const homeKit = [
  {
    title: 'A reliable Thai cookbook',
    description: 'Useful when it explains technique, ingredient roles and substitutions rather than only promising speed.',
    href: '/go/simple-thai-food-cookbook/',
    cta: 'Check the current cookbook price',
    icon: BookOpen,
  },
  {
    title: 'Granite mortar and pestle',
    description: 'A sturdy mortar helps bruise aromatics and build curry paste texture. Check dimensions and weight before ordering.',
    href: '/go/thai-granite-mortar-eight-inch/',
    cta: 'Check the current mortar price',
    icon: ChefHat,
  },
  {
    title: 'Rice cooker',
    description: 'Practical for repeat rice cooking at home. Confirm voltage, plug, capacity and warranty for your own country.',
    href: '/go/zojirushi-six-cup-rice-cooker/',
    cta: 'Check the current rice-cooker price',
    icon: ShoppingBasket,
  },
] as const;

const faqs = [
  { question: 'What kind of food is Thai food?', answer: 'Thai food is not one fixed flavour profile. It includes regional cuisines and dishes built through combinations of aromatic, salty, sour, sweet, bitter and spicy elements. Rice, noodles, herbs, chilli, fermented seasonings, vegetables, seafood and meat appear in different ways across the country.' },
  { question: 'What are the most popular Thai dishes?', answer: 'Pad thai, tom yum, green curry, som tam, pad kra pao and mango sticky rice are widely recognised. Popularity is not the same as a best choice for every traveller; use your preferred format and the region you are visiting to choose more intelligently.' },
  { question: 'What is the best Thai food for beginners?', answer: 'Pad see ew, khao man gai, khao pad and massaman curry are approachable starting formats for many visitors. Ask about spice, seafood-based seasoning and allergens rather than assuming a familiar-looking dish is automatically suitable.' },
  { question: 'Is Thai food the same as Chinese food?', answer: 'No. Thai cuisine has its own regional histories, ingredients, flavour structures and eating customs. Chinese migration has strongly influenced many Thai dishes and city food cultures, but influence does not make the two cuisines interchangeable.' },
  { question: 'Is Thai food actually spicy?', answer: 'Some Thai dishes are very hot, while others are mild or gain heat from condiments added at the table. Region, cook and preparation matter. “Mai phet” communicates a preference but cannot create a universal heat level.' },
  { question: 'What Thai food should I try first?', answer: 'Choose by appetite: khao man gai for gentle rice comfort, tom yum for aromatic hot-sour soup, som tam with grilled chicken for a bright shared meal, or khao soi for a distinctly northern bowl. Then explore a specialist dish guide.' },
  { question: 'What is typical Thai street food?', answer: 'Typical formats include rice or noodle dishes cooked to order, grilled skewers, soups, salads, fruit, drinks and small sweets. The useful clue is often a specialist stall with a short menu and steady turnover rather than one universal list of street-food dishes.' },
  { question: 'How to order food in Thai for beginners?', answer: 'Start with “ao” followed by the dish and point to the exact item. “Mai phet” asks for no chilli heat and “mai sai” asks not to add a named ingredient. For allergies, use a professionally translated card and confirm preparation; a short phrase alone is not a safety guarantee.' },
  { question: 'Is Thai food very healthy?', answer: 'Thai cuisine includes vegetable-rich soups and stir-fries, grilled food, salads, deep-fried snacks, sweet drinks and coconut-rich curries. Health depends on the specific dish, portion, preparation and your needs—not the nationality of the cuisine.' },
  { question: 'What is a typical Thai menu?', answer: 'There is no single national set menu. A shared meal commonly combines rice with dishes that differ in texture and method—for example a soup, something grilled or fried, vegetables, a curry or relish—and diners share rather than ordering identical individual mains.' },
] as const;

const klookFoodHref = withPlacementSubId(KLOOK_GENERIC, 'en-thai-food-owner', 'food-experiences');

const sources = [
  { title: 'Discover Thai cuisine through its famous four regions', creator: 'Tourism Authority of Thailand Newsroom', url: 'https://www.tatnews.org/2018/01/discover-thai-cuisine-famous-four-regions/', note: 'Regional framing and examples; used as orientation rather than proof that four labels capture every local tradition.' },
  { title: 'Northern Thai Cuisine', creator: 'Thailand Foundation', url: 'https://thailandfoundation.or.th/northern-thai-cuisine-opening/', note: 'Cultural context for northern ingredients, shared dishes and Lanna food traditions.' },
  { title: 'Northeast Thai Cuisine', creator: 'Thailand Foundation', url: 'https://thailandfoundation.or.th/isan-cuisine-opening/', note: 'Context for Isaan flavours, sticky rice, grilling and fermented seasoning.' },
  { title: 'How to Order Food in Thai as a Beginner', creator: 'BananaThai', url: 'https://www.bananathaischool.com/blog/how-to-order-food-in-thai/', note: 'Language structure checked against a specialist Thai-language teaching source; transliteration varies.' },
  { title: 'Five Keys to Safer Food', creator: 'World Health Organization', url: 'https://www.who.int/activities/promoting-safe-food-handling/five-key-to-safer-food', note: 'General food-safety principles. No vendor or preparation is represented as risk-free.' },
] as const;

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Thai Food Guide: What to Eat, How to Order and Regional Cuisine',
    description: 'Choose Thai dishes by flavour and region, compare street stalls, markets and restaurants, order more clearly and manage dietary needs.',
    url: PAGE_URL,
    image: `https://go2-thailand.com${HERO}`,
    inLanguage: 'en-GB',
    dateModified: UPDATED_AT,
    author: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
    publisher: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://go2-thailand.com/' },
      { '@type': 'ListItem', position: 2, name: 'Travel guides', item: 'https://go2-thailand.com/travel-guides/' },
      { '@type': 'ListItem', position: 3, name: 'Thai food guide', item: PAGE_URL },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Thai regional cuisines',
    numberOfItems: regions.length,
    itemListElement: regions.map((region, index) => ({ '@type': 'ListItem', position: index + 1, name: region.name, description: `${region.signal}. Try: ${region.try}.` })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })),
  },
];

export default function ThailandFoodGuideEn() {
  const navItems = [
    { href: '#start' as const, label: 'Start here', icon: Sparkles },
    { href: '#regions' as const, label: 'Regions', icon: Map },
    { href: '#dishes' as const, label: 'Choose dishes', icon: Soup },
    { href: '#order' as const, label: 'Order clearly', icon: MessageCircle },
    { href: '#dietary' as const, label: 'Dietary needs', icon: ShieldCheck },
    { href: '#home' as const, label: 'Cook at home', icon: ChefHat },
    { href: '#questions' as const, label: 'FAQs', icon: HeartHandshake },
  ];

  return (
    <>
      <SEOHead
        title="Thai Food Guide: What to Eat & How to Order"
        description="Choose Thai dishes by flavour and region, compare street stalls and restaurants, order clearly and plan for spice, vegan diets and allergies."
        ogImage={`https://go2-thailand.com${HERO}`}
      >
        {schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      </SEOHead>

      <div className="bg-canvas text-charcoal" data-premium-template="thai-food-guide-en" data-owner="thai-cuisine-food-guide">
        <EditorialHero
          image={HERO}
          imageAlt="A shared Thai meal with curry, soup, grilled food, rice and fresh herbs on a wooden table"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Travel guides', href: '/travel-guides/' }, { label: 'Thai food guide' }]}
          eyebrow="Eat by flavour, place and moment"
          title={<>Thai food,<br /><span className="text-saffron-light">without the guesswork.</span></>}
          subtitle="Choose the next plate—not somebody else’s top ten."
          description="Start with the flavour and format you enjoy, follow regional clues, learn what to ask, and move from a first market snack to a genuinely varied Thailand food route."
          actions={[
            { label: 'Find your starting dish', href: '#start', kind: 'primary' },
            { label: 'Browse all dish guides', href: '/food/', kind: 'secondary' },
          ]}
          contentTone="light"
          minHeightClassName="min-h-[720px] lg:min-h-[700px]"
          contentClassName="max-w-[760px]"
          titleClassName="max-w-[760px] text-[4rem] leading-[0.84] sm:text-[5.3rem] lg:text-[6.1rem]"
          subtitleClassName="max-w-[620px] text-[1.35rem] leading-[1.08] sm:text-[1.7rem]"
          descriptionClassName="mt-4 max-w-[625px] text-sm leading-7"
          imageClassName="object-cover object-[62%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(4,38,32,0.2)_0%,rgba(4,38,32,0.62)_55%,rgba(4,38,32,0.98)_100%)] lg:bg-[linear-gradient(90deg,rgba(4,38,32,0.98)_0%,rgba(4,38,32,0.88)_42%,rgba(4,38,32,0.2)_72%,rgba(4,38,32,0.05)_100%)]"
          breadcrumbAriaLabel="Breadcrumb"
          sideCard={<aside className="absolute bottom-9 right-[max(2rem,calc((100vw-1280px)/2))] z-10 hidden w-[320px] rounded-2xl border border-white/22 bg-jade/78 p-6 text-white shadow-editorial-card backdrop-blur-xl xl:block"><p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-light">The useful rule</p><strong className="mt-3 block font-display text-[2rem] font-semibold leading-[0.95]">One meal,<br />several dishes.</strong><p className="mt-4 text-[11px] font-medium leading-5 text-white/64">A shared table reveals more range than ordering the same famous main on repeat.</p></aside>}
        />

        <PageSectionNav label="On this page" items={navItems} />

        <section id="start" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <SectionHeading eyebrow="Your first decision" title="What sounds good now?" description="Use these as starting directions, not rigid labels. Recipes, chilli and seasoning change by cook and place." />
              <p className="max-w-[680px] text-sm font-medium leading-7 text-charcoal/68">The strongest competitor pages mostly count dishes. This guide adds the missing decision layer: begin with texture and appetite, then use the region and venue to widen the route.</p>
            </div>
            <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {startingPoints.map(({ label, title, description, icon: Icon }, index) => (
                <article key={title} className={`rounded-2xl border p-6 ${index === 2 ? 'border-saffron/30 bg-jade text-white shadow-editorial-lift' : 'border-jade/10 bg-white shadow-editorial-card'}`}>
                  <span className={`grid h-11 w-11 place-items-center rounded-xl border ${index === 2 ? 'border-white/18 bg-white/8 text-saffron-light' : 'border-jade/12 bg-tonal text-jade'}`}><Icon size={21} aria-hidden="true" /></span>
                  <p className={`mt-7 text-[9px] font-extrabold uppercase tracking-[0.15em] ${index === 2 ? 'text-saffron-light' : 'text-saffron-dark'}`}>{label}</p>
                  <h2 className="mt-2 font-display text-[1.8rem] font-semibold leading-none">{title}</h2>
                  <p className={`mt-4 text-xs font-medium leading-6 ${index === 2 ? 'text-white/68' : 'text-charcoal/68'}`}>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="regions" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
          <div className="container-custom">
            <SectionHeading eyebrow="Follow the map" title="Four useful doors into regional food" description="Thailand has more local variation than four cards can hold. These broad regions help you notice ingredients and dishes without pretending every province cooks the same way." />
            <div className="mt-9 grid gap-5 lg:grid-cols-2">
              {regions.map((region) => (
                <article key={region.name} className="group grid overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card sm:grid-cols-[0.9fr_1.1fr]">
                  <div className="relative min-h-52 overflow-hidden"><Image src={region.image} alt={`${region.name} food setting in Thailand`} fill sizes="(max-width: 640px) 100vw, 32vw" className="object-cover transition duration-500 group-hover:scale-[1.035]" /></div>
                  <div className="p-6">
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">{region.signal}</p>
                    <h2 className="mt-2 font-display text-[2rem] font-semibold leading-none text-jade">{region.name}</h2>
                    <p className="mt-4 text-xs font-extrabold leading-5 text-jade">Try: {region.try}</p>
                    <p className="mt-3 text-xs font-medium leading-6 text-charcoal/66">{region.note}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="dishes" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
              <SectionHeading eyebrow="Build a food route" title="Choose a path, then go deeper" description="Each dish links to a specialist owner with its own ingredients, ordering cues and context." />
              <div className="space-y-4">
                {dishPaths.map((path, pathIndex) => (
                  <article key={path.mood} className={`rounded-2xl border p-6 lg:p-8 ${pathIndex === 1 ? 'border-jade/12 bg-jade text-white' : 'border-jade/10 bg-white shadow-editorial-card'}`}>
                    <p className={`text-[9px] font-extrabold uppercase tracking-[0.15em] ${pathIndex === 1 ? 'text-saffron-light' : 'text-saffron-dark'}`}>{path.mood}</p>
                    <div className="mt-5 grid gap-3 md:grid-cols-3">
                      {path.picks.map((pick) => (
                        <Link key={pick.href} href={pick.href} className={`group rounded-xl border p-5 transition ${pathIndex === 1 ? 'border-white/15 bg-white/7 hover:bg-white/11' : 'border-jade/10 bg-tonal/60 hover:border-saffron/35 hover:bg-tonal'}`}>
                          <h3 className="font-display text-[1.55rem] font-semibold leading-none">{pick.name}</h3>
                          <p className={`mt-3 text-xs font-medium leading-5 ${pathIndex === 1 ? 'text-white/65' : 'text-charcoal/65'}`}>{pick.note}</p>
                          <span className={`mt-4 inline-flex items-center gap-2 text-[10px] font-extrabold ${pathIndex === 1 ? 'text-saffron-light' : 'text-jade'}`}>Open dish guide <ArrowRight size={13} aria-hidden="true" className="transition group-hover:translate-x-1" /></span>
                        </Link>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom bg-tonal py-14 lg:py-20">
          <div className="container-custom">
            <SectionHeading eyebrow="Choose the setting" title="Street stall, market, food court or restaurant?" description="The best venue is the one that fits the dish, your group and the amount of certainty you need." />
            <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {venueChoices.map(([title, fit, check, Icon]) => (
                <article key={title} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                  <Icon size={24} aria-hidden="true" className="text-jade" />
                  <h2 className="mt-6 font-display text-[1.7rem] font-semibold leading-none text-jade">{title}</h2>
                  <p className="mt-4 text-xs font-extrabold leading-5 text-charcoal/78">{fit}</p>
                  <p className="mt-3 text-xs font-medium leading-6 text-charcoal/60"><strong className="text-saffron-dark">Check:</strong> {check}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="order" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <SectionHeading eyebrow="Order with less friction" title="Four phrases—and their limits" description="Pronunciation and transliteration vary. Pointing to the exact dish, staying patient and confirming the whole preparation matters more than sounding perfect." />
              <div className="mt-7 rounded-2xl border border-saffron/25 bg-saffron/8 p-5">
                <div className="flex gap-3"><AlertTriangle size={19} aria-hidden="true" className="mt-0.5 shrink-0 text-saffron-dark" /><p className="text-xs font-medium leading-6 text-charcoal/72"><strong className="text-jade">Allergy boundary:</strong> a phrase or card improves communication; it cannot guarantee ingredients, shared equipment or cross-contact.</p></div>
              </div>
            </div>
            <div className="divide-y divide-jade/10 border-y border-jade/10">
              {orderingSteps.map((step, index) => (
                <article key={step.thai} className="grid gap-3 py-5 sm:grid-cols-[60px_160px_1fr] sm:items-center">
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-jade/12 bg-tonal text-xs font-extrabold text-jade">0{index + 1}</span>
                  <div><h2 className="font-display text-[1.65rem] font-semibold leading-none text-jade">{step.thai}</h2><p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-saffron-dark">{step.meaning}</p></div>
                  <p className="text-xs font-medium leading-6 text-charcoal/66">{step.use}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="dietary" className="section-divider-bottom scroll-mt-24 bg-jade py-14 text-white lg:py-20">
          <div className="container-custom">
            <SectionHeading eyebrow="Dietary needs" title="Ask about hidden ingredients, not just the dish name" description="Recipes vary and cross-contact can happen. Treat these links as planning tools—not medical guarantees." className="[&_.heading-redesign]:text-white [&>div]:!text-white/68" />
            <div className="mt-9 grid gap-4 lg:grid-cols-3">
              {dietaryChecks.map((item, index) => (
                <article key={item.title} className={`rounded-2xl border p-6 ${index === 1 ? 'border-saffron/35 bg-white text-jade' : 'border-white/16 bg-white/7'}`}>
                  <Leaf size={23} aria-hidden="true" className={index === 1 ? 'text-saffron-dark' : 'text-saffron-light'} />
                  <h2 className="mt-6 font-display text-[1.8rem] font-semibold leading-none">{item.title}</h2>
                  <p className={`mt-4 text-xs font-medium leading-6 ${index === 1 ? 'text-charcoal/68' : 'text-white/68'}`}>{item.body}</p>
                  <Link href={item.href} className={`mt-5 inline-flex items-center gap-2 text-xs font-extrabold ${index === 1 ? 'text-jade' : 'text-saffron-light'}`}>{item.link} <ArrowRight size={14} aria-hidden="true" /></Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-14 lg:py-20">
          <div className="container-custom overflow-hidden rounded-[1.5rem] bg-jade text-white shadow-editorial-lift">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="p-7 sm:p-10 lg:p-12">
                <p className="eyebrow">Turn one meal into a skill</p>
                <h2 className="font-display text-[3rem] font-semibold leading-[0.9] tracking-[-0.04em]">A cooking class should teach more than a recipe.</h2>
                <p className="mt-5 max-w-[610px] text-sm font-medium leading-7 text-white/68">Compare hands-on time, the exact menu, personal versus shared stations, dietary support, transport and current cancellation terms. A market visit adds value only when it teaches ingredients.</p>
                <a href={klookFoodHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-cream mt-7 inline-flex min-h-12 px-6 text-saffron-dark">Check current food experiences <ExternalLink size={15} aria-hidden="true" /></a>
                <AffiliateDisclosure className="mt-3 max-w-[600px] text-white/58">Sponsored Klook link. We may earn a commission at no extra cost to you. Check the live operator, menu, price, meeting point and terms before booking.</AffiliateDisclosure>
              </div>
              <div className="relative min-h-72 lg:min-h-full"><Image src="/images/redesign/thailand-cooking-classes-hero-v2.webp" alt="Travellers preparing Thai ingredients during a hands-on cooking class" fill sizes="(max-width: 1024px) 100vw, 48vw" className="object-cover" /></div>
            </div>
          </div>
        </section>

        <section id="home" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <SectionHeading eyebrow="Bring the technique home" title="Three useful tools, not a souvenir shelf" description="Only buy what matches how often and how seriously you plan to cook. The live Amazon page controls current price, availability and delivery." />
            <div>
              <div className="grid gap-4 md:grid-cols-3">
                {homeKit.map(({ title, description, href, cta, icon: Icon }) => (
                  <article key={href} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-jade/12 bg-tonal text-jade"><Icon size={21} aria-hidden="true" /></span>
                    <h2 className="mt-6 font-display text-[1.65rem] font-semibold leading-none text-jade">{title}</h2>
                    <p className="mt-4 text-xs font-medium leading-6 text-charcoal/66">{description}</p>
                    <a href={href} target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-jade">{cta} <ExternalLink size={13} aria-hidden="true" className="text-saffron-dark" /></a>
                  </article>
                ))}
              </div>
              <AffiliateDisclosure className="mt-4">As an Amazon Associate, we earn from qualifying purchases. You pay nothing extra. Amazon OneLink may send you to a local store; product, price, voltage and delivery can vary by country.</AffiliateDisclosure>
            </div>
          </div>
        </section>

        <FaqSplitSection id="questions" eyebrow="Real search questions" title="Thai food questions, answered" description="These questions were captured from current English Google People Also Ask results. Answers stay practical and avoid universal claims." items={[...faqs]} />

        <SourceMethodSection eyebrow="Sources & method" title="Research before recommendation" description="This owner combines independent UK-English DFS keyword, SERP, PAA, ranking and backlink research with competitor parsing and primary or specialist cultural, language and food-safety sources. Prices are deliberately left to live providers." sources={[...sources]} />

        <RelatedGuidesSection
          eyebrow="Keep exploring"
          title="Turn the guide into a food route"
          guides={[
            { title: 'All Thai dish guides', description: 'Browse the full dish library by curry, noodle, soup, salad, rice, snack and dessert.', href: '/food/', image: '/images/redesign/thailand-food-shared-table.webp' },
            { title: 'Bangkok street-food markets', description: 'Choose a market and neighbourhood by evening format, dishes and transport friction.', href: '/blog/best-street-food-markets-bangkok/', image: '/images/redesign/bangkok-street-food-hero.webp' },
            { title: 'Cooking classes in Thailand', description: 'Compare cities, formats, market visits and hands-on value before booking.', href: '/best-cooking-classes-in-thailand/', image: '/images/redesign/thailand-cooking-classes-hero-v2.webp' },
          ]}
          readLabel="Open guide"
        />
      </div>
    </>
  );
}
