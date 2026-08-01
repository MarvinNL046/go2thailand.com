import Image from 'next/image';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Check,
  ChefHat,
  CircleHelp,
  Clock3,
  Compass,
  Droplets,
  ExternalLink,
  Footprints,
  Map,
  MapPin,
  Navigation,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  TrainFront,
  UtensilsCrossed,
  WalletCards,
} from 'lucide-react';
import { cityAffiliates, withPlacementSubId } from '../../lib/affiliates';
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

const PAGE_URL = 'https://go2-thailand.com/blog/best-street-food-markets-bangkok/';
const HERO_IMAGE = '/images/redesign/bangkok-street-food-hero.webp';
const PAGE_TITLE = 'Best Bangkok Street Food Markets & Areas | Go2Thailand';
const PAGE_DESCRIPTION = 'Choose the best Bangkok street-food area for your time, mood and route. Compare Yaowarat, old-town markets, local neighbourhoods, safety cues and food tours.';

const navItems: PageSectionNavItem[] = [
  { href: '#choose', label: 'Choose an area', icon: Compass },
  { href: '#areas', label: 'Neighbourhoods', icon: MapPin },
  { href: '#routes', label: 'Food routes', icon: Navigation },
  { href: '#dishes', label: 'What to eat', icon: UtensilsCrossed },
  { href: '#safety', label: 'Choose well', icon: ShieldCheck },
  { href: '#tour', label: 'Tour or solo', icon: BadgeCheck },
  { href: '#questions', label: 'Questions', icon: CircleHelp },
];

type Area = {
  name: string;
  type: string;
  bestFor: string;
  timing: string;
  arrival: string;
  description: string;
  tradeoff: string;
  accent: string;
  href?: string;
};

const areas: Area[] = [
  {
    name: 'Yaowarat',
    type: 'Food street + neighbourhood',
    bestFor: 'An iconic first evening',
    timing: 'After the daytime businesses begin giving way to evening food activity',
    arrival: 'MRT Wat Mangkon is a useful rail anchor',
    description: 'Bangkok Chinatown layers Thai-Chinese shophouses, restaurants, street stalls and side streets. Treat the whole district as the experience: choose a few shared tastes and leave room to follow what is visibly operating that evening.',
    tradeoff: 'High recognition brings queues, traffic and pressure to chase famous names. A side street or sit-down shop can be the better answer when the main road is overwhelming.',
    accent: '01',
  },
  {
    name: 'Bang Rak & Charoen Krung',
    type: 'Old trading streets',
    bestFor: 'Day-to-evening wandering',
    timing: 'Build around the opening pattern of the specific market or shop, not one district-wide hour',
    arrival: 'BTS Saphan Taksin is one possible river-side anchor',
    description: 'A broad food district rather than one neat market. Old shops, noodle counters and newer restaurants reward a route with pauses, especially when combined with Talat Noi or the river.',
    tradeoff: 'The area is long. Pick one sub-area and one onward direction instead of zigzagging between saved pins.',
    accent: '02',
  },
  {
    name: 'Victory Monument & Rang Nam',
    type: 'Transit food zone',
    bestFor: 'A practical local-feeling meal stop',
    timing: 'Match the visit to your transfer and the individual venue',
    arrival: 'BTS Victory Monument gives the route a clear start and finish',
    description: 'Transport, workday eating and compact food clusters meet around a busy interchange. This is useful when a meal should fit an existing Bangkok day rather than become a cross-city expedition.',
    tradeoff: 'Road crossings and traffic make random wandering tiring. Decide which side of the monument you need before leaving the station.',
    accent: '03',
  },
  {
    name: 'Nang Loeng & old Bangkok',
    type: 'Daytime market context',
    bestFor: 'A slower old-city lunch',
    timing: 'Daytime is the relevant window; verify the current operating day before travelling',
    arrival: 'Plan the road transfer together with another old-town stop',
    description: 'A market-led choice for travellers interested in older Bangkok food culture and a calmer daytime rhythm. Come for the area and lunch context, not a guarantee that one named vendor will be present.',
    tradeoff: 'It is less convenient as an isolated rail stop. Pair it with an old-town route only when the transfer still makes sense.',
    accent: '04',
  },
  {
    name: 'Talat Phlu',
    type: 'Neighbourhood food crawl',
    bestFor: 'A route beyond the usual first-timer circuit',
    timing: 'Different businesses keep different patterns; check the same day',
    arrival: 'Use a rail station as the anchor, then confirm the final walk',
    description: 'A Thonburi neighbourhood with markets, shophouses and food spread across several streets. It suits travellers who enjoy choosing from what is actually open rather than ticking off one headline attraction.',
    tradeoff: 'Saved lists can send you across a large area. Choose a compact radius and stop when the return journey would become awkward.',
    accent: '05',
  },
  {
    name: 'Chatuchak & Or Tor Kor',
    type: 'Weekend market + fresh market',
    bestFor: 'Food combined with market browsing',
    timing: 'Check both venues independently; the complete Chatuchak experience is weekend-led',
    arrival: 'MRT Kamphaeng Phet connects the area well',
    description: 'Two different formats sit close enough to compare: Chatuchak is a vast weekend shopping market with food throughout, while Or Tor Kor is a fresh-market experience with produce and prepared food.',
    tradeoff: 'Do not call them interchangeable “night markets”. Heat, scale and shopping can consume more energy than the food itself.',
    accent: '06',
    href: '/blog/chatuchak-weekend-market-food-guide/',
  },
];

const formatChoices: Array<{ icon: LucideIcon; title: string; cue: string; description: string; pick: string }> = [
  { icon: Sparkles, title: 'Iconic evening', cue: 'Start with Yaowarat', description: 'You want lights, movement, Thai-Chinese food context and several shared bites in one recognisable district.', pick: 'Best first-night energy' },
  { icon: Store, title: 'Market + browsing', cue: 'Choose Chatuchak or Or Tor Kor', description: 'Food supports a market visit, or you want to compare a huge weekend market with a produce-led fresh market.', pick: 'Best combined purpose' },
  { icon: Footprints, title: 'Neighbourhood crawl', cue: 'Choose Talat Phlu or Bang Rak', description: 'You prefer a compact walking direction and are comfortable replacing an old saved pin with what is operating now.', pick: 'Best for flexible explorers' },
  { icon: Clock3, title: 'Daytime lunch', cue: 'Choose old Bangkok', description: 'You want a market meal inside a cultural day and will verify the operating day before committing to the transfer.', pick: 'Best slower rhythm' },
  { icon: ChefHat, title: 'Guided first taste', cue: 'Compare a food tour', description: 'Ingredient context, ordering help and a curated sequence matter more than complete independence.', pick: 'Best for explanation' },
];

const routes = [
  {
    label: 'Route A',
    title: 'The first-evening route',
    time: 'About 2–3 hours',
    start: 'MRT Wat Mangkon',
    steps: ['Walk Chinatown before ordering', 'Share one savoury anchor', 'Add one contrast on a side street', 'Finish with a drink or dessert'],
    boundary: 'Keep the route inside one neighbourhood. Do not bolt another night market onto the same evening.',
  },
  {
    label: 'Route B',
    title: 'The market morning',
    time: 'About half a day',
    start: 'MRT Kamphaeng Phet',
    steps: ['Check both venues independently', 'Begin with produce and prepared food', 'Pause before entering the larger market', 'Choose shopping or a second taste'],
    boundary: 'Useful on a compatible operating day. Heat and scale are part of the planning cost.',
  },
  {
    label: 'Route C',
    title: 'The local-feeling meal',
    time: 'About 90 minutes',
    start: 'One rail anchor',
    steps: ['Pick Victory Monument or Talat Phlu', 'Save one compact radius', 'Choose one hot dish and one small contrast', 'Leave via the planned station'],
    boundary: 'One well-chosen zone gives more value than three rushed neighbourhoods.',
  },
];

const dishes = [
  { title: 'Pad Thai', cue: 'Wok noodles', href: '/food/pad-thai/', image: '/images/redesign/pad-thai-dish-hero.webp', description: 'Use the dish owner for texture, sauce balance, ordering and the difference between a name and one fixed recipe.' },
  { title: 'Som tam', cue: 'Fresh + pounded', href: '/food/som-tam/', image: '/images/redesign/som-tam-dish-hero.webp', description: 'Chilli, fish sauce, peanut and dried shrimp are separate questions. “Salad” does not automatically mean mild or vegetarian.' },
  { title: 'Tom yum', cue: 'Hot + aromatic', href: '/food/tom-yum-goong/', image: '/images/redesign/tom-yum-goong-hero.webp', description: 'Compare clear and creamy directions, then ask about seafood, chilli, dairy assumptions and the actual bowl offered.' },
  { title: 'Boat noodles', cue: 'Small bowls', href: '/food/boat-noodles/', image: '/images/food/tom-yum-noodles.webp', description: 'A useful shared tasting format near Victory Monument, but ingredients and broth bases still need individual checks.' },
  { title: 'Mango sticky rice', cue: 'Sweet finish', href: '/food/mango-sticky-rice/', image: '/images/redesign/mango-sticky-rice-dish-hero.webp', description: 'Season, ripeness and toppings change. Treat it as a possible finish rather than a guaranteed stall at every market.' },
  { title: 'Khao man gai', cue: 'Rice + chicken', href: '/food/khao-man-gai/', image: '/images/food/khao-man-gai.webp', description: 'A practical meal anchor whose rice, broth, sauce and chicken handling matter more than a viral ranking.' },
];

const faqs = [
  { question: 'What area of Bangkok has the best street food?', answer: 'There is no single best area for every trip. Yaowarat is the strongest iconic evening choice; Bang Rak and Charoen Krung suit a day-to-evening wander; Victory Monument works as a practical transit meal; Nang Loeng is a daytime market choice; Talat Phlu rewards a flexible neighbourhood route; and Chatuchak with Or Tor Kor combines food and market browsing. Choose by time, transport and desired atmosphere.' },
  { question: 'Where is the best place to get street food in Bangkok?', answer: 'For a first evening, Yaowarat is the clearest starting point because it combines a recognised food district with a usable MRT anchor. That does not make every stall the best choice. Scan what is operating, share small portions and use side streets or a sit-down shop when queues and traffic make the main road less useful.' },
  { question: 'What is the famous street for food in Bangkok?', answer: 'Yaowarat Road in Bangkok Chinatown is the city’s most famous food-street reference and is described by the Tourism Authority of Thailand as part of a popular street-food destination. The experience extends beyond the main road into surrounding streets, shops and restaurants, so do not reduce the district to one permanent line of stalls.' },
  { question: 'What is the most famous food market in Bangkok?', answer: 'Chatuchak is Bangkok’s most recognisable large weekend market and includes food throughout, while nearby Or Tor Kor is a more focused fresh market with produce and prepared food. Yaowarat is better understood as a food street and neighbourhood, not one enclosed market. The right answer depends on whether you want shopping, produce or an evening food district.' },
  { question: 'Is it okay to eat street food in Bangkok?', answer: 'Many travellers choose to, but no page can guarantee that a stall is safe. Use observable risk-reduction cues: food cooked thoroughly and served hot, clean handling, raw and cooked separation, appropriate hot or cold holding and safe water or ingredients. People who are pregnant, immunocompromised or otherwise at higher medical risk should seek personalised clinical advice.' },
  { question: 'How to avoid food poisoning in Bangkok?', answer: 'Risk cannot be removed completely. WHO’s Five Keys emphasise cleanliness, separation of raw and cooked food, thorough cooking, safe temperatures and safe water or raw materials. Clean your hands before eating, be cautious with raw or undercooked meat, seafood and eggs, and walk away when ingredient handling or temperature is unclear.' },
  { question: 'What is a must eat in Bangkok?', answer: 'A useful Bangkok tasting sequence is one hot meal anchor, one contrasting shared dish and one sweet or cold finish. Pad Thai, som tam, tom yum, boat noodles, khao man gai and mango sticky rice are strong directions, not a compulsory checklist. Follow appetite, dietary needs and what a vendor can explain clearly.' },
  { question: 'What is the best time to go to Yaowarat?', answer: 'Yaowarat is associated with evening food activity, but businesses keep individual schedules and temporary changes happen. Arrive before you are extremely hungry, walk the area once, and verify any must-visit shop on the same day. This page intentionally avoids one permanent clock time for the entire neighbourhood.' },
  { question: 'Is a Bangkok food tour worth it?', answer: 'A tour can be worth it when ingredient context, ordering help, a compact sequence or meeting other travellers matters to you. A self-guided route is usually enough when you enjoy choosing independently and are comfortable checking transport and vendors yourself. Compare the current route, group size, inclusions, meeting point, cancellation terms and live price before booking.' },
  { question: 'Where to stay in Bangkok near street food?', answer: 'Do not choose a hotel around one stall. Choose a district with the transport and evening rhythm you want: Chinatown for immediate Yaowarat access, Silom or the river side for Bang Rak and Charoen Krung, or a well-connected BTS/MRT base for several areas. Use the Bangkok hotel-area guide to compare the full stay rather than food proximity alone.' },
];

const sources = [
  { title: 'The adventure through Bangkok’s Chinatown', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Articles/the-adventure-through-bangkok-s-chinatown', note: 'Official tourism context for Yaowarat and Chinatown as a shopping and street-food destination; not used as a live vendor directory.' },
  { title: 'Top five places for street food in Bangkok', creator: 'Thailand Government', url: 'https://thailand.go.th/issue-focus-detail/009-015?hl=en', note: 'Government-published area context used to cross-check the broad neighbourhood framing.' },
  { title: 'Five keys to safer food', creator: 'World Health Organization', url: 'https://www.who.int/activities/promoting-safe-food-handling/five-key-to-safer-food', note: 'Primary framework for cleanliness, raw/cooked separation, thorough cooking, safe temperatures and safe water or ingredients.' },
  { title: 'Thailand — Yellow Book', creator: 'U.S. Centers for Disease Control and Prevention', url: 'https://www.cdc.gov/yellow-book/hcp/asia/thailand.html', note: 'Primary travel-health boundary for cautious wording. It does not certify individual Bangkok stalls.' },
  { title: 'SERP API documentation', creator: 'DataForSEO / Go2Thailand editorial', url: 'https://dataforseo.com/apis/serp-api', note: 'Ten live UK-English SERPs, 83 organic results, 51 PAA appearances, rankings, backlinks and five full competitor parses informed the owner and information architecture.' },
];

const amazonProducts: Array<{ slug: AmazonAffiliateSlug; title: string; reason: string; icon: LucideIcon }> = [
  { slug: 'venture-pal-packable-backpack', title: 'Packable daypack', reason: 'Keeps water and small purchases together without turning a food walk into a luggage day. Compare capacity, straps, material and seller.', icon: ShoppingBag },
  { slug: 'owala-freesip-24oz', title: 'Reusable water bottle', reason: 'Useful when a hot walk and salty dishes make planned water breaks more important. Check size, cleaning, leak resistance and local delivery.', icon: Droplets },
  { slug: 'simple-thai-food-cookbook', title: 'Thai cookbook', reason: 'A considered way to take flavour context home without this travel guide inventing recipe quantities. Compare edition, contents, format and seller.', icon: BookOpen },
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
      datePublished: '2026-02-26',
      dateModified: '2026-07-29',
      inLanguage: 'en',
      mainEntityOfPage: PAGE_URL,
      author: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
      publisher: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
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
        { '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/' },
        { '@type': 'ListItem', position: 2, name: 'Bangkok', item: 'https://go2-thailand.com/city/bangkok/' },
        { '@type': 'ListItem', position: 3, name: 'Bangkok street food markets', item: PAGE_URL },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Bangkok street-food areas by trip type',
      itemListElement: areas.map((area, index) => ({ '@type': 'ListItem', position: index + 1, name: area.name, description: area.description })),
    },
  ];
}

export function BangkokStreetFoodMarketsGuideEn() {
  const subId = useSubId();
  const foodTourHref = withPlacementSubId(cityAffiliates.bangkok.klook, subId, 'bangkok-street-food-owner-en-tour');
  const schemas = createSchemas();

  return (
    <>
      <SEOHead title={PAGE_TITLE} description={PAGE_DESCRIPTION} ogImage={`https://go2-thailand.com${HERO_IMAGE}`}>
        <meta name="keywords" content="bangkok street food, best street food in bangkok, bangkok food market, bangkok street food areas, yaowarat street food" />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content="2026-02-26" />
        <meta property="article:modified_time" content="2026-07-29" />
        {schemas.map((schema, index) => <script key={`${schema['@type']}-${index}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      </SEOHead>

      <div className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          image={HERO_IMAGE}
          imageAlt="Bangkok street-food district at blue hour with glowing stalls and shared tables"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Bangkok', href: '/city/bangkok/' }, { label: 'Street food' }]}
          breadcrumbAriaLabel="Breadcrumb"
          eyebrow="Eat Bangkok by neighbourhood"
          title={<>Bangkok<br />street food.</>}
          subtitle={<>Choose the right area.</>}
          description={<>The best food route is not the longest vendor list. Match one neighbourhood to your time, appetite and transport—then use what is actually open that day.</>}
          actions={[
            { label: 'Choose your area', href: '#choose', kind: 'primary' },
            { label: 'Build a food route', href: '#routes', kind: 'secondary' },
          ]}
          minHeightClassName="min-h-[820px] lg:min-h-[730px]"
          contentClassName="max-w-[690px]"
          titleClassName="max-w-[660px] text-[4.25rem] leading-[0.82] sm:text-[5.45rem] lg:text-[6.25rem]"
          subtitleClassName="max-w-[620px] text-[1.9rem] leading-[0.96] text-saffron-dark sm:text-[2.8rem]"
          imageClassName="object-cover object-[58%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(8,40,34,0.16)_0%,rgba(7,31,27,0.58)_46%,rgba(7,31,27,0.96)_100%)] lg:bg-[linear-gradient(90deg,rgba(7,31,27,0.98)_0%,rgba(7,31,27,0.92)_35%,rgba(7,31,27,0.31)_62%,rgba(7,31,27,0.1)_100%)]"
          contentTone="light"
          sideCard={(
            <aside className="absolute bottom-8 right-[max(2rem,calc((100vw-1240px)/2))] z-10 hidden w-[340px] overflow-hidden rounded-2xl border border-white/20 bg-jade/[0.86] text-white shadow-editorial-lift backdrop-blur-xl xl:block">
              <div className="flex items-center justify-between border-b border-white/12 px-5 py-4"><p className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-saffron-light">Quick decision</p><Compass size={18} /></div>
              <dl className="grid grid-cols-[90px_1fr] gap-x-4 gap-y-3 p-5 text-[11px]">
                <dt className="text-white/45">First evening</dt><dd className="font-extrabold">Yaowarat</dd>
                <dt className="text-white/45">Market day</dt><dd className="font-extrabold">Chatuchak + Or Tor Kor</dd>
                <dt className="text-white/45">Local route</dt><dd className="font-extrabold">Talat Phlu or Victory Monument</dd>
                <dt className="text-white/45">Explain it</dt><dd className="font-extrabold">Small guided food tour</dd>
              </dl>
              <p className="border-t border-white/12 px-5 py-4 text-[10px] font-medium leading-4 text-white/55">Verify any must-visit business on the same day; districts outlast vendor lists.</p>
            </aside>
          )}
        />

        <PageSectionNav label="On this page" items={navItems} />

        <section id="choose" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-end">
              <SectionHeading eyebrow="Start with the job" title={<>What should food<br />add to your day?</>} description={<>Bangkok food does not live in one permanent night market. Choose the format first, then let our <Link href="/city/bangkok/food/" className="font-extrabold text-jade underline decoration-saffron/55 underline-offset-4 transition hover:text-saffron-dark">Bangkok food hub</Link> connect it to the rest of your city plan.</>} />
              <p className="max-w-3xl text-sm font-medium leading-7 text-charcoal/64">A busy road, fresh market, weekend market and managed hawker venue solve different problems. Calling all four “street food” hides the choice that matters: atmosphere, operating pattern, comfort, transport and how much explanation you want.</p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {formatChoices.map(({ icon: Icon, title, cue, description, pick }, index) => (
                <article key={title} className={`flex min-h-[315px] flex-col rounded-2xl border p-6 ${index === 0 ? 'border-saffron/45 bg-[#fff3dc] shadow-editorial-lift' : 'border-jade/10 bg-white shadow-editorial-card'}`}>
                  <div className="flex items-center justify-between"><span className="grid h-12 w-12 place-items-center rounded-xl border border-saffron/30 bg-canvas text-jade"><Icon size={21} strokeWidth={1.5} /></span><span className="font-display text-xl font-semibold text-jade/24">0{index + 1}</span></div>
                  <p className="mt-6 text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">{cue}</p>
                  <h3 className="mt-2 font-display text-[1.55rem] font-semibold leading-none text-jade">{title}</h3>
                  <p className="mt-4 text-xs font-medium leading-6 text-charcoal/65">{description}</p>
                  <p className="mt-auto border-t border-jade/10 pt-5 text-[10px] font-extrabold text-jade">{pick}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="areas" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <SectionHeading eyebrow="Six useful anchors" title="Choose an area, not a viral stall" description="The area gives you replacement options when one business is closed, moved or too busy. The cards below are decision frames, not live opening-hour promises." />
              <div className="rounded-2xl border border-jade/10 bg-white p-6 sm:flex sm:items-center sm:justify-between sm:gap-8">
                <div><p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">One same-day check</p><p className="mt-2 text-sm font-extrabold text-jade">Search the exact market or shop you refuse to miss.</p></div>
                <p className="mt-3 max-w-md text-xs font-medium leading-5 text-charcoal/60 sm:mt-0">For everything else, let the neighbourhood provide alternatives. Rain, holidays, regulations and vendor decisions can change a street faster than an old guide.</p>
              </div>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-12">
              {areas.map((area, index) => {
                const wide = index === 0 || index === 5;
                const content = (
                  <article className={`group relative flex h-full min-h-[390px] flex-col overflow-hidden rounded-[26px] border border-jade/10 p-7 shadow-editorial-card ${index === 0 ? 'bg-jade text-white lg:min-h-[490px]' : index === 5 ? 'bg-[#efe7d8]' : 'bg-white'}`}>
                    {index === 0 ? <Image src="/images/redesign/bangkok-food-yaowarat.webp" alt="" fill sizes="(max-width:1024px) 100vw, 58vw" className="object-cover opacity-20 mix-blend-luminosity" /> : null}
                    <div className="relative z-10 flex items-start justify-between gap-5"><span className={`text-[9px] font-extrabold uppercase tracking-[0.15em] ${index === 0 ? 'text-saffron-light' : 'text-saffron-dark'}`}>{area.type}</span><span className={`font-display text-3xl font-semibold ${index === 0 ? 'text-white/20' : 'text-jade/18'}`}>{area.accent}</span></div>
                    <div className="relative z-10 mt-auto pt-14">
                      <p className={`text-[10px] font-extrabold uppercase tracking-[0.12em] ${index === 0 ? 'text-white/55' : 'text-jade/45'}`}>{area.bestFor}</p>
                      <h3 className={`mt-2 font-display text-[2.45rem] font-semibold leading-[0.9] tracking-[-0.035em] ${index === 0 ? 'text-white' : 'text-jade'}`}>{area.name}</h3>
                      <p className={`mt-5 text-xs font-medium leading-6 ${index === 0 ? 'text-white/68' : 'text-charcoal/66'}`}>{area.description}</p>
                      <dl className={`mt-6 grid gap-3 border-t pt-5 text-[10px] ${index === 0 ? 'border-white/12' : 'border-jade/10'}`}>
                        <div className="grid grid-cols-[70px_1fr] gap-3"><dt className={index === 0 ? 'text-white/38' : 'text-charcoal/42'}>Timing</dt><dd className={`font-bold ${index === 0 ? 'text-white/75' : 'text-jade'}`}>{area.timing}</dd></div>
                        <div className="grid grid-cols-[70px_1fr] gap-3"><dt className={index === 0 ? 'text-white/38' : 'text-charcoal/42'}>Anchor</dt><dd className={`font-bold ${index === 0 ? 'text-white/75' : 'text-jade'}`}>{area.arrival}</dd></div>
                      </dl>
                      <p className={`mt-5 border-l-2 pl-4 text-[10px] font-medium leading-5 ${index === 0 ? 'border-saffron/60 text-white/55' : 'border-saffron/50 text-charcoal/55'}`}><strong className={index === 0 ? 'text-white/78' : 'text-jade'}>Trade-off:</strong> {area.tradeoff}</p>
                      {area.href ? <span className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-jade">Open the specialist guide <ArrowRight size={14} className="text-saffron" /></span> : null}
                    </div>
                  </article>
                );
                return area.href ? <Link key={area.name} href={area.href} className={wide ? 'lg:col-span-7' : 'lg:col-span-5'}>{content}</Link> : <div key={area.name} className={wide ? 'lg:col-span-7' : 'lg:col-span-5'}>{content}</div>;
              })}
            </div>
          </div>
        </section>

        <section id="routes" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.55fr_1.45fr] lg:items-end">
              <SectionHeading eyebrow="Three editorial sequences" title="A route with a finish line" description="The dotted line is a planning device, not a live walking map. Save the station and final return step before you start ordering." />
              <p className="max-w-3xl text-sm font-medium leading-7 text-charcoal/64">A reliable Bangkok food day keeps one geographical promise. It does not cross the city for six online favourites, and it leaves enough appetite and attention to ask questions before ordering.</p>
            </div>

            <div className="relative mt-12">
              <svg aria-hidden="true" className="pointer-events-none absolute left-[7%] right-[7%] top-14 hidden h-28 w-[86%] lg:block" viewBox="0 0 1000 120" preserveAspectRatio="none">
                <path d="M10 74 C130 8 220 112 330 56 S545 18 650 74 S865 110 990 42" fill="none" stroke="rgba(244,146,38,.72)" strokeWidth="2" strokeDasharray="6 7" />
                <circle cx="10" cy="74" r="6" fill="#f49226" /><circle cx="500" cy="47" r="6" fill="#f49226" /><circle cx="990" cy="42" r="6" fill="#f49226" />
              </svg>
              <div className="relative grid gap-5 lg:grid-cols-3 lg:pt-14">
                {routes.map((route, index) => (
                  <article key={route.label} className={`flex min-h-[510px] flex-col rounded-[26px] border p-7 shadow-editorial-card ${index === 1 ? 'border-jade bg-jade text-white lg:-translate-y-7' : 'border-jade/10 bg-white'}`}>
                    <div className="flex items-center justify-between"><span className={`text-[9px] font-extrabold uppercase tracking-[0.15em] ${index === 1 ? 'text-saffron-light' : 'text-saffron-dark'}`}>{route.label}</span><Navigation size={19} className={index === 1 ? 'text-saffron-light' : 'text-jade'} /></div>
                    <h3 className={`mt-7 font-display text-[2.15rem] font-semibold leading-[0.92] ${index === 1 ? 'text-white' : 'text-jade'}`}>{route.title}</h3>
                    <dl className={`mt-5 grid grid-cols-2 gap-3 border-y py-4 text-[10px] ${index === 1 ? 'border-white/12' : 'border-jade/10'}`}><div><dt className={index === 1 ? 'text-white/38' : 'text-charcoal/42'}>Window</dt><dd className="mt-1 font-extrabold">{route.time}</dd></div><div><dt className={index === 1 ? 'text-white/38' : 'text-charcoal/42'}>Anchor</dt><dd className="mt-1 font-extrabold">{route.start}</dd></div></dl>
                    <ol className="mt-6 space-y-4">{route.steps.map((step, stepIndex) => <li key={step} className="flex gap-3 text-xs font-semibold leading-5"><span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full font-display ${index === 1 ? 'bg-white/10 text-saffron-light' : 'bg-tonal text-jade'}`}>{stepIndex + 1}</span><span className={index === 1 ? 'text-white/72' : 'text-charcoal/68'}>{step}</span></li>)}</ol>
                    <p className={`mt-auto border-l-2 pl-4 pt-1 text-[10px] font-medium leading-5 ${index === 1 ? 'border-saffron/70 text-white/55' : 'border-saffron/50 text-charcoal/55'}`}>{route.boundary}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="dishes" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-end">
              <SectionHeading eyebrow="A dish compass, not a checklist" title="Choose contrast across three bites" description={<>Start with one hot anchor, add something fresh or grilled, then finish sweet or cold. Our <Link href="/thailand-street-food/" className="font-extrabold text-jade underline decoration-saffron/55 underline-offset-4 transition hover:text-saffron-dark">Thailand street-food guide</Link> owns the broader ordering and ingredient context.</>} />
              <p className="max-w-3xl text-sm font-medium leading-7 text-charcoal/64">These dish owners explain flavour, variations and hidden ingredients without pretending every Bangkok market serves the same version. Open only the guides that answer a real question before your route.</p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {dishes.map((dish) => (
                <Link key={dish.href} href={dish.href} className="group overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card">
                  <div className="relative h-56 overflow-hidden"><Image src={dish.image} alt={`${dish.title} served in Thailand`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.035]" /><span className="absolute left-4 top-4 rounded-md bg-jade/88 px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-light backdrop-blur">{dish.cue}</span></div>
                  <div className="p-6"><h3 className="font-display text-[1.8rem] font-semibold leading-none text-jade">{dish.title}</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/63">{dish.description}</p><span className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-jade">Read the dish guide <ArrowRight size={14} className="text-saffron transition group-hover:translate-x-1" /></span></div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="safety" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="overflow-hidden rounded-[30px] bg-jade text-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
                <div className="p-8 sm:p-10 lg:p-12">
                  <p className="eyebrow !text-saffron-light">Watch before ordering</p>
                  <h2 className="font-display text-[3.3rem] font-semibold leading-[0.86] tracking-[-0.04em]">A busy stall is not a safety certificate.</h2>
                  <p className="mt-6 text-sm font-medium leading-7 text-white/66">No queue, award or appearance can prove a meal is safe. WHO’s framework gives better questions: cleanliness, raw/cooked separation, thorough cooking, safe temperatures and safe water or ingredients.</p>
                  <Link href="/practical-info/health-vaccinations/" className="mt-7 inline-flex items-center gap-2 text-xs font-extrabold text-saffron-light">Open the Thailand health guide <ArrowRight size={14} /></Link>
                </div>
                <div className="grid gap-px bg-white/10 sm:grid-cols-2">
                  {[
                    ['Cooked and hot', 'Prefer food cooked thoroughly and served hot. Be cautious with raw or undercooked meat, seafood and egg, and with food sitting lukewarm.'],
                    ['Separate tools', 'Look for sensible separation between raw and cooked food, plus clean hands, surfaces and utensils. Visual cues reduce uncertainty; they do not guarantee safety.'],
                    ['Ask three questions', 'Heat level, vegetarian suitability and serious allergy risk are different questions. Paste, sauce, stock, shared oil and utensils can contain hidden ingredients.'],
                    ['Leave when unclear', 'If staff cannot explain a serious ingredient concern or handling looks wrong, choose another dish. Popularity is not a reason to override your boundary.'],
                  ].map(([title, text], index) => (
                    <article key={title} className="min-h-[270px] bg-jade p-7 sm:p-9"><span className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">Check 0{index + 1}</span><h3 className="mt-5 font-display text-[1.65rem] font-semibold leading-none">{title}</h3><p className="mt-4 text-xs font-medium leading-6 text-white/62">{text}</p></article>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-[0.58fr_1.42fr]">
              <SectionHeading eyebrow="Before leaving the hotel" title="Six checks that protect the route" description="A five-minute check is enough. Do not turn a flexible food plan into hours of tabs and saved pins." />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  [Clock3, 'Operating day', 'Verify the exact market or must-visit business, especially around holidays.'],
                  [TrainFront, 'Last rail step', 'Save the station, exit and route back—not just the first food pin.'],
                  [Map, 'One compact radius', 'Choose the streets you will actually walk before another cross-city save appears.'],
                  [WalletCards, 'Payment backup', 'Carry small Thai notes; card and QR acceptance vary by business.'],
                  [ShieldCheck, 'Dietary phrase', 'Keep one translated allergy or dietary card offline when the consequence matters.'],
                  [Sparkles, 'Weather option', 'Know the nearby indoor pause or shorter version if rain or heat changes the plan.'],
                ].map(([Icon, title, text]) => {
                  const CheckIcon = Icon as LucideIcon;
                  return <article key={String(title)} className="rounded-2xl border border-jade/10 bg-white p-5"><span className="grid h-11 w-11 place-items-center rounded-xl bg-tonal text-jade"><CheckIcon size={19} /></span><h3 className="mt-5 font-display text-[1.35rem] font-semibold leading-none text-jade">{String(title)}</h3><p className="mt-3 text-xs font-medium leading-5 text-charcoal/62">{String(text)}</p></article>;
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="tour" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom grid gap-8 lg:grid-cols-[1.12fr_0.88fr]">
            <article className="rounded-[28px] border border-jade/10 bg-white p-8 shadow-editorial-card sm:p-10 lg:p-12">
              <p className="eyebrow">Self-guided or explained?</p>
              <h2 className="font-display text-[3.5rem] font-semibold leading-[0.86] tracking-[-0.04em] text-jade">Pay for context, not just a queue of samples.</h2>
              <p className="mt-6 max-w-3xl text-sm font-medium leading-7 text-charcoal/66">A strong food tour can explain ingredients, ordering and neighbourhood history while keeping the route compact. It is not automatically better than exploring alone, and a product title does not prove the current stops or group experience.</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-tonal p-6"><p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">A tour earns its cost when</p><ul className="mt-4 space-y-3 text-xs font-medium leading-5 text-charcoal/65">{['You want ingredient and cultural explanation', 'Ordering support materially reduces friction', 'A curated route saves limited evening time', 'The current group size and mobility fit you'].map((item) => <li key={item} className="flex gap-2"><Check size={14} className="mt-0.5 shrink-0 text-jade" />{item}</li>)}</ul></div>
                <div className="rounded-2xl bg-[#fff3dc] p-6"><p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">Go independently when</p><ul className="mt-4 space-y-3 text-xs font-medium leading-5 text-charcoal/65">{['You enjoy replacing stops as you walk', 'You need full control over pace and portions', 'You can communicate important dietary limits', 'One area already fits naturally into your day'].map((item) => <li key={item} className="flex gap-2"><Check size={14} className="mt-0.5 shrink-0 text-jade" />{item}</li>)}</ul></div>
              </div>
            </article>
            <aside className="flex flex-col rounded-[28px] bg-jade p-8 text-white shadow-editorial-lift sm:p-10">
              <div className="flex items-start justify-between gap-5"><div><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">Klook · current options</p><h2 className="mt-3 font-display text-[2.65rem] font-semibold leading-[0.88]">Compare Bangkok food tours.</h2></div><ExternalLink size={20} className="shrink-0 text-saffron-light" /></div>
              <p className="mt-6 text-sm font-medium leading-7 text-white/64">Before booking, check the live neighbourhood, start time, walking distance, group size, number of tastings, drinks, dietary process, meeting point, cancellation terms and current price.</p>
              <div className="mt-7 rounded-2xl border border-white/12 bg-white/[0.055] p-5"><p className="text-[10px] font-extrabold text-white">No invented “from” price</p><p className="mt-2 text-[10px] leading-5 text-white/52">Inventory and price belong to the provider. This page sends you to the current listing rather than freezing a number that can expire.</p></div>
              <a href={foodTourHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-cream mt-auto min-h-12 justify-center px-6 text-saffron-dark">Check current tours on Klook <ExternalLink size={15} /></a>
              <AffiliateDisclosure className="mt-4 !text-white/52">Klook affiliate link. We may earn commission after a qualifying booking at no extra cost to you. Route, operator, inclusions, availability, terms and price can change.</AffiliateDisclosure>
            </aside>
          </div>
        </section>

        <section className="section-divider-bottom py-16 lg:py-24">
          <div className="container-custom">
            <div className="overflow-hidden rounded-[30px] bg-jade text-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                <div className="relative min-h-[450px] lg:min-h-[690px]"><Image src="/images/redesign/bangkok-street-food-market-kit.webp" alt="Compact Bangkok food-market kit with daypack, water bottle, map, wipes and a blank cookbook" fill sizes="(max-width: 1024px) 100vw, 46vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-jade/78 via-transparent to-transparent" /><div className="absolute bottom-7 left-7 right-7"><p className="eyebrow !text-saffron-light">Carry less, taste more</p><h2 className="max-w-xl font-display text-[3.2rem] font-semibold leading-[0.86] tracking-[-0.04em]">A market kit with one job per item.</h2></div></div>
                <div className="p-7 sm:p-10 lg:p-12">
                  <p className="text-sm font-medium leading-7 text-white/66">These are optional examples, not a ranking or compulsory packing list. Each item solves a recognisable task: hands-free carrying, planned water or reliable recipe context after the trip.</p>
                  <div className="mt-8 space-y-3">
                    {amazonProducts.map(({ slug, title, reason, icon: Icon }) => (
                      <a key={slug} href={`/go/${slug}/`} target="_blank" rel="noopener noreferrer nofollow sponsored" className="group grid grid-cols-[42px_1fr_34px] items-start gap-4 rounded-xl border border-white/13 bg-white/[0.06] p-4 transition hover:border-saffron/45 hover:bg-white/[0.1]">
                        <span className="grid h-10 w-10 place-items-center rounded-lg border border-saffron/35 text-saffron-light"><Icon size={18} /></span>
                        <span><strong className="block text-xs text-white">{title}</strong><span className="mt-1 block text-[10px] leading-4 text-white/55">{reason}</span><span className="mt-2 block text-[9px] font-extrabold uppercase tracking-[0.08em] text-saffron-light">Check current price at Amazon</span></span>
                        <span className="grid h-8 w-8 place-items-center rounded-lg border border-white/12 text-white/60 transition group-hover:text-saffron-light"><ExternalLink size={13} /></span>
                      </a>
                    ))}
                  </div>
                  <AffiliateDisclosure className="mt-5 !text-white/54">Amazon affiliate disclosure: as an Amazon Associate, we earn from qualifying purchases at no extra cost to you. Links use our central OneLink-compatible <strong className="text-white/72">/go/</strong> router; local store, product, seller, edition, current price, delivery and availability vary by country.</AffiliateDisclosure>
                  <div className="mt-8 border-t border-white/12 pt-7"><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">Skip every product when</p><p className="mt-3 text-xs font-medium leading-6 text-white/62">Your existing day bag and bottle already solve the route, or you do not plan to cook afterwards. Reusing what you own is the better recommendation.</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FaqSplitSection id="questions" eyebrow="Real search questions" title="Bangkok street-food questions, answered without absolutes" description="These questions came from the ten live English SERPs. Answers distinguish durable planning advice from details that need a same-day check." items={faqs} />

        <RelatedGuidesSection
          eyebrow="Continue the Bangkok food plan"
          title="Use the specialist owner for the next decision"
          guides={[
            { title: 'Chatuchak food route', description: 'Plan the weekend market’s food zones, timing, tasting sequence and practical market kit.', href: '/blog/chatuchak-weekend-market-food-guide/', image: '/images/redesign/chatuchak-food-hero.webp', imageAlt: 'Food at Chatuchak Weekend Market' },
            { title: 'Jodd Fairs Ratchada', description: 'Check the current venue identity, route and fit before treating one night market as a Bangkok-wide answer.', href: '/blog/jodd-fairs-bangkok-night-market-guide/', image: '/images/redesign/jodd-fairs-ratchada-hero.webp', imageAlt: 'Jodd Fairs Ratchada market in Bangkok' },
            { title: 'Lumpini hawker centre', description: 'Compare a managed hawker format with street-food areas and learn how rotating stalls change the decision.', href: '/blog/bangkok-lumpini-hawker-centre-street-food-2026/', image: '/images/redesign/lumpini-hawker-hero.webp', imageAlt: 'Managed Bangkok hawker centre' },
          ]}
          readLabel="Open the guide"
          sideLink={{ label: 'See the complete Bangkok food hub', href: '/city/bangkok/food/' }}
        />

        <SourceMethodSection eyebrow="Sources & editorial method" title="Built around live intent, not borrowed anecdotes" description="This English owner combines independent DataForSEO keyword, ranking, backlink, competitor, ten-SERP and genuine-PAA research with official tourism and public-health sources. Competitor articles informed coverage only; their vendor lists, prices and personal recommendations were not copied as facts. Last substantive review: 29 July 2026." sources={sources} />

        <section className="py-12 lg:py-16">
          <div className="container-custom"><div className="flex flex-col gap-5 rounded-2xl border border-jade/10 bg-white p-7 sm:flex-row sm:items-center sm:justify-between"><div><p className="eyebrow">One area. Three tastes.</p><h2 className="font-display text-[2.6rem] font-semibold leading-none text-jade">Let Bangkok stay bigger than your checklist.</h2></div><div className="flex flex-wrap gap-3"><a href="#areas" className="btn-jade btn-jade-pattern group min-h-12 px-6">Choose the area <ArrowRight size={15} className="text-saffron" /></a><Link href="/city/bangkok/" className="btn-cream min-h-12 px-6 text-saffron-dark">Plan Bangkok <Map size={15} /></Link></div></div></div>
        </section>
      </div>
    </>
  );
}
