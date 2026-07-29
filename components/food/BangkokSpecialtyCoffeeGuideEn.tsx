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

const PAGE_URL = 'https://go2-thailand.com/blog/bangkok-specialty-coffee-cafe-guide-2026/';
const PAGE_TITLE = 'Specialty coffee Bangkok: 3 routes and 7 reliable stops';
const PAGE_DESCRIPTION = 'Plan specialty coffee in Bangkok through three practical neighbourhood routes, seven checked café anchors, a menu decoder, Thai-bean guide and same-day checks.';
const HERO_IMAGE = '/images/redesign/bangkok-coffee-hero.webp';
const AMAZON_BREWER_SLUG: AmazonAffiliateSlug = 'aeropress-go-travel-coffee-maker';

const navItems: PageSectionNavItem[] = [
  { href: '#choose', label: 'Choose route', icon: Route },
  { href: '#routes', label: 'Three routes', icon: MapPin },
  { href: '#order', label: 'Order', icon: Coffee },
  { href: '#beans', label: 'Thai beans', icon: Bean },
  { href: '#practical', label: 'Practical', icon: BadgeCheck },
  { href: '#questions', label: 'Questions', icon: CircleHelp },
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
    subtitle: 'The strongest first route',
    start: 'Start around 08:00',
    fit: 'For a first Bangkok day, a BTS-led route and coffee plus art without a large detour.',
    rhythm: 'One early coffee, one comparison cup and a slower filter stop inside BACC after 10:00.',
    icon: TrainFront,
    stops: [
      { name: 'Factory Coffee Phaya Thai', area: 'Phaya Thai', hours: 'Daily 08:00–16:00', role: 'Technique + signature', address: '49 Phayathai Road, Ratchathewi', sourceUrl: 'https://factorybkk.com/blogs/news/location', orderLogic: 'Begin with espresso or ask which current brew shows the selected lot most clearly.' },
      { name: 'Roots Ratchathewi', area: 'Ratchathewi', hours: 'Daily 07:30–17:30', role: 'Thai origin', address: 'Asia Hotel, Phayathai Road', sourceUrl: 'https://rootsbkk.com/branch/', orderLogic: 'Ask for a Thai bean and its origin. Compare it as a different profile, not automatically as a better cup.' },
      { name: 'Gallery Drip Coffee', area: 'Siam / BACC', hours: 'Tue–Sun 10:00–20:00 · Mon closed', role: 'Filter + art', address: 'BACC, room 107, 1st floor', sourceUrl: 'https://www.bacc.or.th/en/directories/62255', orderLogic: 'Finish with filter coffee, then enter the exhibitions after the drink; BACC does not allow food or drink in its main galleries.' },
    ],
    switchOption: 'Too much caffeine or too little time? Skip the middle cup and make Factory → BACC a two-stop route with breakfast and water between them.',
  },
  {
    number: '02',
    title: 'Phrom Phong → Ekkamai',
    subtitle: 'The beans-and-brunch route',
    start: 'Start between 08:00 and 09:00',
    fit: 'For travellers who want to compare beans, sit longer and keep the day close to the Sukhumvit Line.',
    rhythm: 'Taste one clean brew first, move east and turn the second stop into the longer meal.',
    icon: Bean,
    stops: [
      { name: 'Ceresia Coffee Roasters', area: 'Sukhumvit 41', hours: 'Daily 08:00–17:00', role: 'Roaster + filter', address: '15/1 Sukhumvit Soi 41', sourceUrl: 'https://ceresiacoffeeroasters.com/our-shop/', orderLogic: 'Choose origin and process first; then ask whether filter or espresso best expresses that profile.' },
      { name: 'Kaizen Coffee Ekkamai', area: 'Ekkamai', hours: 'Daily 07:30–16:30', role: 'Coffee + brunch', address: '888 C Condo, Sukhumvit 63', sourceUrl: 'https://www.kaizencoffee.com/locations', orderLogic: 'Use this as the longer food stop. Choose a smaller second coffee or share a filter after a complete first tasting.' },
    ],
    switchOption: 'Prefer Thong Lor? Roots at theCOMMONS is a checked branch alternative. Replan the last sois rather than forcing both neighbourhoods into one hurried route.',
  },
  {
    number: '03',
    title: 'Ari at a slower pace',
    subtitle: 'A compact neighbourhood morning',
    start: 'Begin early and stay local',
    fit: 'For an unhurried morning and travellers who prefer two useful anchors over a citywide checklist.',
    rhythm: 'One main stop, a walk through Ari and only then a second cup if taste, time and energy still support it.',
    icon: Footprints,
    stops: [
      { name: 'Nana Coffee Roasters Ari', area: 'Ari Soi 4', hours: 'Check on the visit day', role: 'Roastery + broad choice', address: '24/2 Ari 4 Alley', sourceUrl: 'https://nanacoffeeroasters.com/pages/our-locations', orderLogic: 'Ask for Thai origin and a brew inside your preference; do not let rarity or price choose the cup automatically.' },
      { name: 'Roots Ari', area: 'Ari Soi 4', hours: 'Daily 07:30–17:00', role: 'Producer + story', address: '50/2 Phahon Yothin 7, Ari Soi 4', sourceUrl: 'https://rootsbkk.com/branch/', orderLogic: 'Use the second stop to compare origin or process instead of ordering the same milk drink again.' },
    ],
    switchOption: 'Ari changes quickly. Leave room for one spontaneous neighbourhood stop, but confirm the official location or current map listing before making the detour.',
  },
];

const menuChoices: Array<{ icon: LucideIcon; title: string; cue: string; explanation: string }> = [
  { icon: Coffee, title: 'Espresso', cue: 'Intense + short', explanation: 'Useful for comparing extraction and balance. Less forgiving when you mainly want subtle origin differences and are not used to a concentrated cup.' },
  { icon: Milk, title: 'Flat white or latte', cue: 'Texture + coffee', explanation: 'Ask which house bean remains clear in milk. A larger latte softens acidity and bitterness but can also hide smaller differences between lots.' },
  { icon: GlassWater, title: 'Filter or pour-over', cue: 'Read the origin', explanation: 'Strong when producer, variety and process are the task. Let the barista guide the current menu if “floral”, “fruit” or “chocolate” still feels abstract.' },
  { icon: Sparkles, title: 'Signature drink', cue: 'Café identity', explanation: 'Choose it for creativity, not as a neutral bean comparison. Ask about sweetness, dairy and ingredients when you do not want an unexpected syrup or allergen.' },
];

const faqs = [
  { question: 'What are some good cafes to go cafe hopping in Bangkok?', answer: 'For one coherent first route, combine Factory Coffee Phaya Thai, Roots Ratchathewi and Gallery Drip at BACC. Ceresia and Kaizen form a calmer Sukhumvit route, while Nana and Roots work as two Ari anchors. These are practical corridors, not a universal ranking; check the official branch and hours on the day.' },
  { question: 'What do you do in cafe hopping?', answer: 'Compare one clear variable rather than collecting interiors. Try espresso versus filter, a Thai origin versus an imported lot, or a signature drink versus a clean brew. Leave room for water and food, take three tasting notes and stop when caffeine, budget or the rest of Bangkok matters more.' },
  { question: 'What is the best coffee in Bangkok?', answer: 'There is no objective winner because bean, roast, brew, milk, service and personal taste change the result. Factory is a practical technique-led first stop; Roots is useful for Thai-origin context; Gallery Drip fits filter plus BACC; Ceresia suits bean selection and Kaizen suits coffee plus brunch. Choose the job, not one inflated score.' },
  { question: 'Does Thailand have good coffee beans?', answer: 'Yes. Thailand grows Arabica and Robusta and has specialised producers and roasters. “Thai” alone is not a quality grade: read province, producer, process, roast date and recommended brew. Bangkok is useful because multiple origins can be compared without turning a farm story into a guarantee about the cup.' },
  { question: 'Why is Thailand coffee so good?', answer: 'That wording is subjective. Strong Thai coffee can reflect suitable growing areas, careful variety selection, harvest, processing, roasting and skilled brewing. Those steps vary between lots; geography or nationality never guarantees flavour. Ask what the café can trace about the specific bean in front of you.' },
  { question: 'How is Thai coffee different?', answer: 'There is no single Thai profile. Northern Arabica, southern Robusta, washed and natural processing, roast level and drink format can produce very different cups. Traditional sweet coffee, a modern light-roast filter and a milk-based dirty coffee answer different tasks and should not be collapsed into one taste description.' },
  { question: 'What is a dirty coffee in Bangkok?', answer: 'Dirty coffee usually layers a hot espresso shot over very cold milk so temperature, texture and visual contrast meet in a small glass. Recipes, sweetness and dairy vary by café. Ask whether syrup is included and drink it before the layers fully merge if you want the intended contrast.' },
  { question: 'What makes Factory coffee Bangkok unique?', answer: 'Its official material emphasises technique, roasting and origin, while the Phaya Thai branch is unusually convenient as an early BTS-route anchor. The newer Town in Town HQ houses its roastery and office. Awards and reputation may guide interest, but they do not prove that every visitor will prefer one signature drink.' },
  { question: 'What is special about Roots coffee beans?', answer: 'Roots foregrounds people, producers and Thai origin in its coffee story and runs branches that make those beans accessible across Bangkok. The useful visitor task is to ask which Thai lot is currently served, who produced it and how it was processed. Brand story should support, not replace, tasting and traceability.' },
  { question: 'Where to go in Ari, Bangkok?', answer: 'For this coffee task, start with either Nana Coffee Roasters Ari or Roots Ari around Ari Soi 4 and keep the second cup optional. Ari also rewards walking and eating, so do not turn the neighbourhood into a list of cafés only. Confirm each map pin because businesses and branches can change.' },
  { question: 'What is the most popular Thai coffee brand?', answer: 'Popularity depends on whether you mean a national retail chain, supermarket product, specialty roaster or single-origin producer. That is not the same as best quality. On this route, use current beans at Roots, Factory, Ceresia or Nana to compare origin and process instead of treating brand reach as a flavour score.' },
  { question: 'How much is coffee in Bangkok?', answer: 'The current price depends on venue, bean, dose, milk, brew and whether a rare lot or signature recipe is involved. A house espresso and a hand-poured competition lot are not comparable. Check the current menu and confirm premium-bean surcharges before ordering; this page does not freeze launch-day prices into a fake tariff.' },
];

const sources = [
  { title: 'Factory Coffee locations', creator: 'Factory Coffee', url: 'https://factorybkk.com/blogs/news/location', note: 'Current official address and daily 08:00–16:00 hours for Phaya Thai; checked 26 July 2026.' },
  { title: 'Roots branches', creator: 'Roots', url: 'https://rootsbkk.com/branch/', note: 'Current official branches, addresses and hours for Ratchathewi, Ari and Thong Lor.' },
  { title: 'Gallery Drip Coffee', creator: 'Bangkok Art and Culture Centre', url: 'https://www.bacc.or.th/en/directories/62255', note: 'Official BACC directory for room 107, first floor and Tuesday–Sunday 10:00–20:00 opening.' },
  { title: 'Kaizen Coffee locations', creator: 'Kaizen Coffee', url: 'https://www.kaizencoffee.com/locations', note: 'Official Ekkamai and Thong Lor locations with daily 07:30–16:30 hours.' },
  { title: 'Ceresia — Our shop', creator: 'Ceresia Coffee Roasters', url: 'https://ceresiacoffeeroasters.com/our-shop/', note: 'Official Sukhumvit 41 address, walk from Phrom Phong and daily 08:00–17:00 hours.' },
  { title: 'Nana Coffee Roasters locations', creator: 'Nana Coffee Roasters', url: 'https://nanacoffeeroasters.com/pages/our-locations', note: 'Official current branch list and Ari address; no stable hours are claimed from this source.' },
  { title: 'World of Coffee heads to Bangkok', creator: 'Specialty Coffee Association', url: 'https://sca.coffee/sca-news/2025/5/16/world-of-coffee-heads-to-bangkok-in-2026-the-third-edition-of-world-of-coffee-asia-3brz5', note: 'Primary source for the completed 7–9 May 2026 event at BITEC, not presented as a future activity.' },
  { title: 'Thailand coffee varieties programme', creator: 'Thailand Department of Agriculture', url: 'https://www.doa.go.th/th/news_board/103929/', note: 'Official 2026 context for Thai Arabica and Robusta varieties and quality-planting work.' },
  { title: 'AeroPress Go product information', creator: 'AeroPress', url: 'https://aeropress.com/products/aeropress-go-travel-coffee-press', note: 'Primary manufacturer source used to describe the optional compact brewer without repeating price or subjective flavour claims.' },
];

function createSchemas() {
  const stops = coffeeRoutes.flatMap((route) => route.stops);
  return [
    {
      '@context': 'https://schema.org', '@type': 'Article', '@id': `${PAGE_URL}#article`, headline: PAGE_TITLE,
      description: PAGE_DESCRIPTION, image: `https://go2-thailand.com${HERO_IMAGE}`, datePublished: '2026-03-23', dateModified: '2026-07-26',
      inLanguage: 'en', mainEntityOfPage: PAGE_URL,
      author: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
      publisher: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
    },
    {
      '@context': 'https://schema.org', '@type': 'ItemList', name: 'Seven specialty-coffee anchors in Bangkok',
      itemListElement: stops.map((stop, index) => ({ '@type': 'ListItem', position: index + 1, name: stop.name, description: `${stop.area}. ${stop.role}. ${stop.hours}.` })),
    },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/' },
        { '@type': 'ListItem', position: 2, name: 'Bangkok', item: 'https://go2-thailand.com/city/bangkok/' },
        { '@type': 'ListItem', position: 3, name: 'Specialty coffee Bangkok', item: PAGE_URL },
      ],
    },
    {
      '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to plan a specialty-coffee route in Bangkok',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Choose one corridor', text: 'Choose Phaya Thai–Siam, Sukhumvit or Ari around the rest of your Bangkok day.' },
        { '@type': 'HowToStep', position: 2, name: 'Check the visit day', text: 'Recheck the official branch, hours and closing day before leaving.' },
        { '@type': 'HowToStep', position: 3, name: 'Compare brewing styles', text: 'Compare espresso, filter, Thai origin or a signature rather than repeating one drink everywhere.' },
        { '@type': 'HowToStep', position: 4, name: 'Plan food and transit', text: 'Leave room for water, a meal, BTS travel and the rest of the city.' },
      ],
    },
  ];
}

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="font-extrabold text-jade underline decoration-saffron/55 underline-offset-4 transition hover:text-saffron-dark">{children}</Link>;
}

export function BangkokSpecialtyCoffeeGuideEn() {
  const subId = useSubId();
  const hotelHref = withPlacementSubId(TRIP_GENERIC, subId, 'bangkok-coffee-en-bts-base');
  const schemas = createSchemas();

  return (
    <>
      <SEOHead title={PAGE_TITLE} description={PAGE_DESCRIPTION} ogImage={`https://go2-thailand.com${HERO_IMAGE}`}>
        <meta name="keywords" content="specialty coffee bangkok, best coffee bangkok, coffee shops bangkok, bangkok cafe hopping, thai coffee beans, factory coffee bangkok, roots coffee bangkok" />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content="2026-03-23" />
        <meta property="article:modified_time" content="2026-07-26" />
        {schemas.map((schema, index) => <script key={`${schema['@type']}-${index}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      </SEOHead>

      <div className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          image={HERO_IMAGE}
          imageAlt="Barista preparing specialty filter coffee beside Bangkok's BTS corridor"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Bangkok', href: '/city/bangkok/' }, { label: 'Specialty coffee' }]}
          eyebrow="Bangkok starts early"
          title={<>Specialty coffee Bangkok.</>}
          subtitle={<>Three routes. Seven reliable anchors.</>}
          description={<>No ranking that breaks when a score, branch or hour changes. Use three coherent city routes, official location checks and an ordering strategy built around your taste.</>}
          actions={[
            { label: 'Choose your coffee route', href: '#choose', kind: 'primary' },
            { label: 'Open the menu decoder', href: '#order', kind: 'secondary' },
          ]}
          minHeightClassName="min-h-[850px] lg:min-h-[720px]"
          contentClassName="max-w-[690px]"
          titleClassName="max-w-[700px] text-[3.9rem] leading-[0.84] sm:text-[5rem] lg:text-[5.45rem]"
          subtitleClassName="max-w-[620px] text-[1.65rem] leading-[1] text-saffron-dark sm:text-[2.25rem]"
          imageClassName="object-cover object-[72%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.02)_0%,rgba(252,250,246,0.76)_50%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.97)_0%,rgba(252,250,246,0.84)_38%,rgba(7,39,34,0.1)_61%,rgba(5,27,24,0.06)_100%)]"
          sideCard={(
            <aside className="absolute bottom-8 right-[max(2rem,calc((100vw-1240px)/2))] z-10 hidden w-[350px] overflow-hidden rounded-2xl border border-white/55 bg-white/[0.91] shadow-editorial-lift backdrop-blur-xl xl:block">
              <div className="flex items-center justify-between border-b border-jade/10 px-5 py-4"><p className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-saffron-dark">Coffee card · July 2026</p><Coffee size={18} className="text-jade" /></div>
              <dl className="grid grid-cols-[92px_1fr] gap-x-4 gap-y-3 p-5 text-[11px]">
                <dt className="text-charcoal/46">First visit</dt><dd className="font-extrabold text-jade">Phaya Thai → Siam</dd>
                <dt className="text-charcoal/46">Bean focus</dt><dd className="font-extrabold text-jade">Phrom Phong → Ekkamai</dd>
                <dt className="text-charcoal/46">Slower</dt><dd className="font-extrabold text-jade">Ari in one area</dd>
                <dt className="text-charcoal/46">Rhythm</dt><dd className="font-extrabold text-saffron-dark">2 main tastes + water</dd>
              </dl>
              <p className="border-t border-jade/10 px-5 py-4 text-[10px] font-medium leading-4 text-charcoal/62">Hours checked 26 July 2026. Recheck the official branch on your visit day.</p>
            </aside>
          )}
        />

        <PageSectionNav items={navItems} />

        <section id="choose" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-end">
              <SectionHeading eyebrow="Your day first, then the café" title={<>Which route<br />fits you?</>} description={<>Bangkok is too large for a useful “top ten in one morning”. Choose one corridor and let coffee support the day. Use our <InlineLink href="/blog/bangkok-public-transport-bts-mrt-tourist-guide-2026/">BTS and MRT guide</InlineLink> for the long axis.</>} />
              <p className="max-w-3xl text-sm font-medium leading-7 text-charcoal/66">A good crawl compares something: brewing method, Thai origin or café format. Six similar milk drinks mainly create haste. These routes limit movement, give each stop a different role and retain space for breakfast, water and Bangkok itself.</p>
            </div>
            <div className="mt-11 grid gap-4 md:grid-cols-3">
              {[
                { icon: TrainFront, eyebrow: 'First Bangkok day', title: 'Coffee + BTS + art', text: 'Choose the central route when you want to start without a taxi and BACC or Siam already fits the day.', href: '#route-central' },
                { icon: Bean, eyebrow: 'You may buy beans', title: 'Roaster + brunch', text: 'Choose Sukhumvit when process, brewing and a longer second stop matter more than collecting addresses.', href: '#route-sukhumvit' },
                { icon: Sun, eyebrow: 'Calm over quantity', title: 'Ari at a slower pace', text: 'Choose Ari for two reliable anchors, one neighbourhood walk and space to inspect one new place.', href: '#route-ari' },
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
            <SectionHeading eyebrow="Three half-days" title="A route is stronger than a ranking" description="Each route has its own pace and task. Do not treat it as a checklist: one useful cup and a good next activity beat completing every named stop." />
            <div className="mt-12 space-y-6">
              {coffeeRoutes.map((route, routeIndex) => {
                const Icon = route.icon;
                const id = routeIndex === 0 ? 'route-central' : routeIndex === 1 ? 'route-sukhumvit' : 'route-ari';
                return (
                  <article key={route.title} id={id} className="scroll-mt-28 overflow-hidden rounded-[28px] border border-jade/10 bg-white shadow-editorial-card">
                    <div className="grid lg:grid-cols-[0.34fr_0.66fr]">
                      <div className={`relative flex min-h-[310px] flex-col justify-between overflow-hidden p-7 text-white sm:p-9 ${routeIndex === 1 ? 'bg-[#294c43]' : routeIndex === 2 ? 'bg-[#213932]' : 'bg-jade'}`}>
                        <div aria-hidden="true" className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-saffron/24" />
                        <div className="relative"><span className="grid h-12 w-12 place-items-center rounded-xl border border-white/15 bg-white/[0.07]"><Icon size={22} className="text-saffron-light" /></span><p className="mt-7 text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-light">Route {route.number}</p><h2 className="mt-3 font-display text-[2.55rem] font-semibold leading-[0.9]">{route.title}</h2><p className="mt-3 text-xs font-bold text-white/58">{route.subtitle}</p></div>
                        <div className="relative border-t border-white/12 pt-5"><p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-light">Rhythm</p><p className="mt-2 text-xs font-medium leading-6 text-white/64">{route.rhythm}</p></div>
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
                                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-jade/10 pt-4"><span className="inline-flex items-center gap-2 text-[10px] font-semibold text-charcoal/52"><MapPin size={13} className="text-jade" />{stop.address}</span><a href={stop.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] font-extrabold text-jade">Official location <ExternalLink size={12} className="text-saffron" /></a></div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="mt-6 rounded-xl border border-saffron/24 bg-[#fff6e8] p-4 text-[11px] font-semibold leading-5 text-jade"><strong>Switch option:</strong> {route.switchOption}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="order" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
              <div className="relative min-h-[520px] overflow-hidden rounded-[28px] shadow-editorial-lift lg:min-h-[620px]"><Image src="/images/redesign/bangkok-coffee-tasting.webp" alt="Tasting table with espresso, filter coffee, milk drink, beans and a dotted Bangkok route" fill sizes="(max-width: 1024px) 100vw, 43vw" className="object-cover" /><span className="absolute bottom-4 left-4 rounded-full border border-white/25 bg-jade/78 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-md">Tasting style over popularity</span></div>
              <div>
                <SectionHeading eyebrow="Say what you want" title={<>Turn the menu<br />into a decision tree</>} description={<>“What is most popular?” often leads to the sweetest signature. Say whether you want intensity, milk texture, origin or creativity so the barista can work with the current menu.</>} />
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {menuChoices.map(({ icon: Icon, title, cue, explanation }) => (
                    <article key={title} className="rounded-2xl border border-jade/10 bg-white p-5 shadow-editorial-card"><div className="flex items-center justify-between"><Icon size={21} className="text-jade" /><span className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-saffron-dark">{cue}</span></div><h3 className="mt-5 font-display text-[1.55rem] font-semibold text-jade">{title}</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/62">{explanation}</p></article>
                  ))}
                </div>
                <div className="mt-5 rounded-2xl border border-jade/10 bg-jade p-6 text-white"><p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-light">One sentence at the bar</p><p className="mt-3 font-display text-2xl font-semibold">“I want something fruit-led and not very bitter; which Thai bean fits today?”</p><p className="mt-3 text-xs font-medium leading-5 text-white/58">Replace fruit-led with chocolate-led, light, bold or milk-friendly. That is more useful than asking for “the best”.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="beans" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.58fr_1.42fr]">
              <SectionHeading eyebrow="Thailand can be inside the bag" title={<>Read the bean,<br />not only the café</>} description="Thailand grows Arabica and Robusta. That does not predict your cup: read four fields on the bag and connect them to the brew you actually use." />
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { number: '01', title: 'Origin', text: 'Look for province, village or a defined geographic name. “Thailand” alone is much broader than a named growing area.' },
                  { number: '02', title: 'Producer', text: 'A farm, cooperative or processor makes the chain more concrete. Missing detail does not automatically mean bad coffee, but it limits traceability.' },
                  { number: '03', title: 'Process', text: 'Washed, natural, honey and experimental processes shape flavour and texture. No process is automatically fruitier or objectively better.' },
                  { number: '04', title: 'Roast + brew', text: 'Check roast date, level and suggested method. Buy whole bean if you grind at home; otherwise request the exact grind for your brewer.' },
                ].map(({ number, title, text }) => (
                  <article key={title} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="text-[10px] font-extrabold text-saffron-dark">{number}</span><h3 className="mt-4 font-display text-[1.75rem] font-semibold leading-none text-jade">{title}</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">{text}</p></article>
                ))}
              </div>
            </div>
            <p className="mt-8 max-w-4xl text-sm font-medium leading-7 text-charcoal/64">To explore northern origin context later in the same trip, connect the tasting with <InlineLink href="/city/chiang-mai/">Chiang Mai</InlineLink>, <InlineLink href="/city/chiang-rai/">Chiang Rai</InlineLink> and our <InlineLink href="/region/northern/">Northern Thailand guide</InlineLink>. Bangkok remains the easiest place to compare regions without romanticising a plantation claim.</p>

            <div className="mt-10 grid overflow-hidden rounded-[28px] bg-jade shadow-editorial-lift lg:grid-cols-[0.68fr_1.32fr]">
              <div className="flex min-h-[330px] flex-col justify-between p-8 text-white sm:p-10">
                <div><p className="eyebrow !text-saffron-light">Optional home-brew bridge</p><h2 className="font-display text-[3rem] font-semibold leading-[0.9] tracking-[-0.04em]">Take the bean home, not the café fantasy.</h2></div>
                <Coffee size={42} strokeWidth={1.15} className="mt-8 text-saffron-light" />
              </div>
              <div className="bg-[#143f36] p-8 text-white sm:p-10">
                <h3 className="font-display text-[2rem] font-semibold">AeroPress Go travel brewer</h3>
                <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-white/66">A compact manual brewer can be useful when you buy Thai beans and already want to brew while travelling or at home. It is not required for these café routes and does not recreate a barista’s grinder, water or recipe. Check the included filters, capacity, material, seller and country availability.</p>
                <a href={`/go/${AMAZON_BREWER_SLUG}/`} target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-7 inline-flex items-center gap-2 border-t border-white/12 pt-5 text-xs font-extrabold text-saffron-light">Check current price at Amazon <ArrowRight size={14} /></a>
                <AffiliateDisclosure className="mt-4 !text-white/54">Amazon affiliate disclosure: as an Amazon Associate, Go2Thailand may earn from qualifying purchases at no extra cost to you. OneLink may route you to a local Amazon store; product, seller, current price and availability vary.</AffiliateDisclosure>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Coffee route with breathing room" className="section-divider-bottom py-12 lg:py-16">
          <div className="container-custom">
            <div className="relative min-h-[430px] overflow-hidden rounded-[30px] bg-jade shadow-editorial-lift sm:min-h-[380px]">
              <Image src="/images/redesign/bangkok-coffee-route-banner.webp" alt="Travellers follow a dotted coffee route beside Bangkok's BTS" fill sizes="100vw" className="object-cover object-[68%_center]" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,35,30,0.99)_0%,rgba(6,35,30,0.9)_39%,rgba(6,35,30,0.12)_73%,rgba(6,35,30,0.03)_100%)]" />
              <div className="relative z-10 flex min-h-[430px] max-w-[610px] flex-col justify-center p-7 text-white sm:min-h-[380px] sm:p-12">
                <p className="eyebrow !text-saffron-light">Two cups. One real city day.</p>
                <h2 className="font-display text-[3.2rem] font-semibold leading-[0.88] tracking-[-0.04em]">Let the route breathe.</h2>
                <p className="mt-5 max-w-[520px] text-sm font-medium leading-7 text-white/67">Plan water and food between tastings, use BTS for the long axis and drop one stop as soon as coffee begins to consume the day. Bangkok is the destination; the crawl is a lens.</p>
                <Link href="/city/bangkok/food/" className="btn-cream mt-7 w-fit">Build a food day around it <ArrowRight size={15} className="text-saffron" /></Link>
              </div>
            </div>
          </div>
        </section>

        <section id="practical" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.58fr_1.42fr]">
              <SectionHeading eyebrow="Before leaving" title={<>Six checks that<br />prevent a closed door</>} description="Cafés move, branches close earlier and map pins lag. Use this routine when adding any new place from social media too." />
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {[
                  { icon: Clock3, title: 'Official hours', text: 'Check the café’s own branch page on the day. Holidays and last order can differ.' },
                  { icon: MapPin, title: 'Exact branch', text: 'Brands have multiple branches. Save the complete name and address, not only the logo.' },
                  { icon: TrainFront, title: 'Last kilometre', text: 'BTS reaches the area; the final soi can still require walking or another short ride.' },
                  { icon: GlassWater, title: 'Water + food', text: 'Do not stack strong drinks on an empty stomach. Make breakfast or lunch part of the route.' },
                  { icon: ShoppingBag, title: 'Beans home', text: 'Check roast date, grind and destination-country import rules before buying a bright bag.' },
                  { icon: Palette, title: 'Venue rules', text: 'At BACC the drink stays outside the main galleries, and Monday is the regular closure.' },
                ].map(({ icon: Icon, title, text }) => (
                  <article key={title} className="rounded-2xl border border-jade/10 bg-white p-5 shadow-editorial-card"><Icon size={20} className="text-jade" /><h3 className="mt-5 font-display text-[1.5rem] font-semibold text-jade">{title}</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/62">{text}</p></article>
                ))}
              </div>
            </div>

            <aside className="mt-8 border-y border-jade/10 py-7 lg:flex lg:items-start lg:justify-between lg:gap-12">
              <div className="flex items-center gap-3 text-jade"><Bean size={21} /><p className="font-display text-2xl font-semibold">Keep a three-line tasting log</p></div>
              <div className="mt-4 max-w-3xl space-y-3 text-sm font-medium leading-7 text-charcoal/64 lg:mt-0">
                <p>Write what you smell, taste and notice as the cup cools. Ordinary words—citrus, cacao, tea-like, heavy or clean—are more useful than a borrowed score.</p>
                <p>Add bean, process and brew from the card or bag. The next stop then compares the same question rather than two interiors. Share a filter when caffeine, budget or time becomes the limit.</p>
                <p>A disappointing cup does not break the route. Confirm what you received, compare it with the order and use the difference to phrase the next choice more clearly.</p>
              </div>
            </aside>

            <div className="mt-12 grid gap-8 overflow-hidden rounded-[28px] border border-jade/10 bg-[#fff4df] p-7 shadow-editorial-card lg:grid-cols-[0.8fr_1.2fr] lg:p-10">
              <div><p className="eyebrow">Choose the Bangkok base</p><h2 className="font-display text-[2.8rem] font-semibold leading-[0.92] text-jade">A BTS-aligned hotel saves more than one extra café pin.</h2></div>
              <div className="lg:justify-self-end"><p className="max-w-3xl text-sm font-medium leading-7 text-charcoal/66">You do not need to sleep beside one coffee shop. Choose a Sukhumvit- or Silom-line base that also fits the rest of the itinerary. Compare neighbourhood, station access, room conditions and recent reviews before booking.</p><div className="mt-6 flex flex-wrap items-center gap-4"><Link href="/best-hotels/bangkok/" className="btn-jade">Compare Bangkok areas <ArrowRight size={15} className="text-saffron" /></Link><a href={hotelHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center gap-2 text-xs font-extrabold text-saffron-dark">Check current hotel price at Trip.com <ExternalLink size={13} /></a></div><AffiliateDisclosure className="mt-3">Trip.com is an affiliate link. Go2Thailand may earn commission at no extra cost to you. Café selection and hotel choice remain editorially independent; current price and availability change.</AffiliateDisclosure></div>
            </div>
          </div>
        </section>

        <FaqSplitSection id="questions" eyebrow="Real English search questions" title="Frequently asked questions about coffee in Bangkok" description="Every question below was captured verbatim in the independent English SERP research. Locations, hours, menus and events change; taste and “best” remain personal." items={faqs} />

        <RelatedGuidesSection
          eyebrow="After the last cup"
          title="Turn coffee into a Bangkok day"
          guides={[
            { title: 'BTS & MRT in Bangkok', description: 'Plan the long axis and avoid unnecessary taxi rides between coffee areas.', href: '/blog/bangkok-public-transport-bts-mrt-tourist-guide-2026/', image: '/images/blog/bangkok-public-transport-bts-mrt-tourist-guide-2026.webp' },
            { title: 'Thailand street food', description: 'Connect the first coffee to a real meal and use the same calm selection checks.', href: '/thailand-street-food/', image: '/images/redesign/bangkok-street-food-market-kit.webp' },
            { title: 'Lumpini Hawker Centre', description: 'Combine park, breakfast or early evening with a route that ends at Gate 5.', href: '/blog/bangkok-lumpini-hawker-centre-street-food-2026/', image: '/images/redesign/lumpini-hawker-hero.webp' },
          ]}
          readLabel="Read the guide"
        />

        <SourceMethodSection
          eyebrow="Sources & editorial method"
          title="A café map is only strong with a date"
          description="Independent English DataForSEO ranking, backlink, three keyword-cluster, twelve SERP, competitor and exact-PAA research defined this owner. Three ranking competitors were parsed; addresses and hours then returned to official café and venue pages. Google scores, review counts and old price tables are excluded. World of Coffee Bangkok is marked as a completed May 2026 event. Last substantive review: 26 July 2026."
          sources={sources}
        />
      </div>
    </>
  );
}
