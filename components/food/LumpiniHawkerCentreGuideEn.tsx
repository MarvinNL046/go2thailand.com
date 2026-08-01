import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  CircleHelp,
  Coffee,
  Droplets,
  Eye,
  ExternalLink,
  Grid2X2,
  Map,
  MapPin,
  Moon,
  QrCode,
  Salad,
  ShieldCheck,
  ShoppingBag,
  Soup,
  Sun,
  TrainFront,
  Trees,
  UtensilsCrossed,
} from 'lucide-react';
import type { AmazonAffiliateSlug } from '../../lib/amazon-affiliates';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav, type PageSectionNavItem } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';

const PAGE_URL = 'https://go2-thailand.com/blog/bangkok-lumpini-hawker-centre-street-food-2026/';
const HERO_IMAGE = '/images/redesign/lumpini-hawker-hero.webp';
const PAGE_TITLE = 'Lumpini Hawker Centre Bangkok: hours, food and Gate 5 route';
const PAGE_DESCRIPTION = 'Plan Lumpini Hawker Centre at Gate 5 with current shifts, BTS and MRT directions, a practical food-choice method, payment checks and a park-plus-meal route.';

const navItems: PageSectionNavItem[] = [
  { href: '#plan', label: 'Visit plan', icon: BadgeCheck },
  { href: '#route', label: 'Gate 5 route', icon: MapPin },
  { href: '#food', label: 'Choose food', icon: UtensilsCrossed },
  { href: '#pay', label: 'Pay', icon: Banknote },
  { href: '#park', label: 'Park + meal', icon: Trees },
  { href: '#compare', label: 'Compare', icon: Grid2X2 },
  { href: '#questions', label: 'Questions', icon: CircleHelp },
];

const visitPlans: Array<{ icon: LucideIcon; title: string; time: string; description: string; route: string }> = [
  {
    icon: Coffee,
    title: 'Breakfast after the park',
    time: '07:00–09:00',
    description: 'Walk one calm loop first, then choose one warm breakfast and a drink. The morning shift is active without turning the visit into a midday-heat exercise.',
    route: 'Park → Gate 5 → breakfast',
  },
  {
    icon: Soup,
    title: 'Focused lunch',
    time: '11:00–13:00',
    description: 'Scan the active rows, choose food prepared to order and locate a table before paying. A rotating vendor list makes method more useful than hype.',
    route: 'Look first → then order',
  },
  {
    icon: Moon,
    title: 'Early evening',
    time: '17:00–19:30',
    description: 'Pair cooler park time with the start of the evening shift. Individual vendors can start later, finish early or be absent on your day.',
    route: 'Walk → Gate 5 → dinner',
  },
  {
    icon: UtensilsCrossed,
    title: 'Food-first visit',
    time: 'About 75 min',
    description: 'Share two small dishes and one dessert. You compare techniques without pretending that every stall must become part of a fixed checklist.',
    route: 'Savoury → second style → sweet',
  },
];

const faqs = [
  {
    question: 'Does Lumpini Park have food?',
    answer: 'Yes. Hawker Centre Suan Lumphini sits beside Gate 5 on Ratchadamri Road and brings rotating street-food vendors into a managed dining area. It is next to the park rather than a promise that food is available at every gate. Published venue shifts run from 05:00 to 16:00 and 16:00 to midnight, but a specific stall or dish still needs a same-day check.',
  },
  {
    question: 'What time does Lumpini open?',
    answer: 'Bangkok Metropolitan Administration publishes daily park hours of 04:30–22:00. The hawker centre follows a different clock: its published morning shift is 05:00–16:00 and evening shift 16:00–00:00. Treat the park and food centre as adjacent places with separate closing logic, especially late in the evening.',
  },
  {
    question: 'Which station is best for Lumpini Park?',
    answer: 'There is no single best station for the whole park because the site has several edges and entrances. For the hawker centre, the April opening publication specifically named Lumphini MRT Exit 1 and Sala Daeng BTS Exit 6. Save Gate 5 on Ratchadamri Road as the final map anchor and follow current station signage.',
  },
  {
    question: 'Which BTS station is closest to Lumpini Park?',
    answer: 'Sala Daeng is the BTS station named by both the BMA park information and the hawker-centre opening coverage. The BMA describes the walk via the skywalk across Rama IV Road; the venue publication names Exit 6. Walking time depends on the chosen gate, crossings and current station access, so do not navigate only to a generic park pin.',
  },
  {
    question: 'Can I go to Lumpini Park at night?',
    answer: 'You can visit during the official daily hours, which currently end at 22:00. That does not mean every gate, path activity or facility operates identically until the last minute. The hawker centre may continue its published evening shift until midnight, so finish the park portion first and exit deliberately toward Gate 5.',
  },
  {
    question: 'Do you have to pay to enter Lumpini Park?',
    answer: 'No. The official BMA park page lists admission as free. Food at the adjacent hawker centre is purchased separately, and there is no reason to treat the meal price as park admission. Check the displayed menu, portion and extras before ordering.',
  },
  {
    question: 'Can you eat in Lumpini Park?',
    answer: 'Do not assume that every lawn, event or facility has identical rules. The clearest food plan is to use the purpose-built hawker dining area beside Gate 5, keep shared areas clean and follow posted park instructions. BMA explicitly prohibits alcohol and intoxicants in the park.',
  },
  {
    question: 'Can you picnic in Lumpini Park?',
    answer: 'A quiet, tidy sit on an appropriate lawn is different from setting up a catered event or trading. Check signs and staff instructions for the exact area, do not bring alcohol, and remove all waste. For a full meal, the Gate 5 hawker centre provides dedicated seating and disposal infrastructure.',
  },
  {
    question: 'Is Lumpini Park worth it?',
    answer: 'It is a strong choice when you want green space, walking and an inexpensive food stop in one central route. It is less suitable when your priority is air-conditioned dining, shopping or a large night market. The park-plus-meal combination is the information gain; neither place needs to be stretched into an all-day attraction.',
  },
  {
    question: 'What is Lumpini Park famous for?',
    answer: 'Lumpini is Bangkok’s first public park and a long-standing central space for walking, running, exercise, water activities and community use. Travellers also notice its water monitors, but wildlife should be observed with distance rather than approached or fed. The new hawker centre adds a managed food stop without replacing the park’s main identity.',
  },
  {
    question: 'Are there monitor lizards in Lumpini Park?',
    answer: 'Yes, water monitors are regularly seen around the park’s lakes and waterways. Give them space, do not feed or corner them and keep food packed away when wildlife is close. The presence of an animal does not make an encounter guaranteed, and this venue guide does not replace current park or wildlife instructions.',
  },
];

const sources = [
  {
    title: 'Bangkok soft-opens Hawker Centre Suan Lumphini',
    creator: 'Nation Thailand',
    url: 'https://www.nationthailand.com/blogs/thailand/bangkok/40064920',
    note: 'Dated 10 April 2026; used for Gate 5, named BTS/MRT exits, rotating vendors, the two shifts, infrastructure and QR BOX context.',
  },
  {
    title: 'Lumpini Park’s Hawker Center is now open',
    creator: 'Time Out Bangkok',
    url: 'https://www.timeout.com/bangkok/news/hawker-center-lumphini-042226',
    note: 'Dated 22 April 2026; independent venue context for location, open-air design, shifts and the debate around organised street food.',
  },
  {
    title: 'First hawker centre in central Bangkok a success',
    creator: 'Bangkok Post',
    url: 'https://www.bangkokpost.com/thailand/general/3246900/first-hawker-centre-in-central-bangkok-a-success',
    note: 'Later April reporting used as a dated operating snapshot, not as a permanent promise for vendor count or daily availability.',
  },
  {
    title: 'Lumphini Park',
    creator: 'Greener Bangkok — Bangkok Metropolitan Administration',
    url: 'https://greener.bangkok.go.th/en/park/suan-lumpini/',
    note: 'Primary BMA source for daily 04:30–22:00 park hours, free admission, facilities, restrictions and public-transport context.',
  },
];

const amazonProducts: Array<{ slug: AmazonAffiliateSlug; title: string; reason: string; icon: LucideIcon }> = [
  {
    slug: 'owala-freesip-24oz',
    title: 'Reusable water bottle',
    reason: 'Useful for the park leg before or after eating. Check capacity, cleaning instructions, seller and local delivery rather than buying for a branded feature alone.',
    icon: Droplets,
  },
  {
    slug: 'sun-cube-wide-brim-hat',
    title: 'Lightweight sun hat',
    reason: 'For exposed park sections before the meal. Check fit, material and your own protection needs; a hat is not a substitute for shade or sensible timing.',
    icon: Sun,
  },
  {
    slug: 'venture-pal-packable-backpack',
    title: 'Packable day bag',
    reason: 'Keeps water and light day items together without taking large luggage through shared tables and narrow vendor aisles.',
    icon: ShoppingBag,
  },
];

function createSchemas() {
  return [
    {
      '@context': 'https://schema.org', '@type': 'Article', '@id': `${PAGE_URL}#article`, headline: PAGE_TITLE,
      description: PAGE_DESCRIPTION, image: `https://go2-thailand.com${HERO_IMAGE}`, datePublished: '2026-03-22', dateModified: '2026-07-26',
      inLanguage: 'en', mainEntityOfPage: PAGE_URL,
      author: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
      publisher: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
    },
    {
      '@context': 'https://schema.org', '@type': 'FoodEstablishment', '@id': `${PAGE_URL}#venue`, name: 'Hawker Centre Suan Lumphini',
      description: 'A BMA-organised street-food centre with rotating vendors beside Gate 5 of Lumphini Park.',
      address: { '@type': 'PostalAddress', streetAddress: 'Gate 5, Ratchadamri Road', addressLocality: 'Pathum Wan, Bangkok', addressCountry: 'TH' },
    },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/' },
        { '@type': 'ListItem', position: 2, name: 'Bangkok', item: 'https://go2-thailand.com/city/bangkok/' },
        { '@type': 'ListItem', position: 3, name: 'Lumpini Hawker Centre', item: PAGE_URL },
      ],
    },
    {
      '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to plan a meal at Lumpini Hawker Centre',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Choose a time window', text: 'Choose breakfast, lunch or early evening and allow for rotating shifts.' },
        { '@type': 'HowToStep', position: 2, name: 'Navigate to Gate 5', text: 'Save Gate 5 on Ratchadamri Road beside Lumphini Park as the final map anchor.' },
        { '@type': 'HowToStep', position: 3, name: 'Scan before ordering', text: 'Check active stalls, seating, preparation and visible menu prices.' },
        { '@type': 'HowToStep', position: 4, name: 'Order one base dish', text: 'Begin with one dish and add only after portion size and needs are clear.' },
      ],
    },
  ];
}

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="font-extrabold text-jade underline decoration-saffron/55 underline-offset-4 transition hover:text-saffron-dark">{children}</Link>;
}

export function LumpiniHawkerCentreGuideEn() {
  const schemas = createSchemas();

  return (
    <>
      <SEOHead title={PAGE_TITLE} description={PAGE_DESCRIPTION} ogImage={`https://go2-thailand.com${HERO_IMAGE}`}>
        <meta name="keywords" content="lumpini hawker centre, lumpini hawker center opening hours, lumpini park food, street food near lumpini park, gate 5 lumpini park" />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content="2026-03-22" />
        <meta property="article:modified_time" content="2026-07-26" />
        {schemas.map((schema, index) => <script key={`${schema['@type']}-${index}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      </SEOHead>

      <div className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          image={HERO_IMAGE}
          imageAlt="Open-air hawker pavilion with breakfast guests beside Lumphini Park"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Bangkok', href: '/city/bangkok/' }, { label: 'Lumpini Hawker Centre' }]}
          eyebrow="One park walk. One useful meal."
          title={<>Lumpini Hawker Centre.</>}
          subtitle={<>From Gate 5 to your first dish.</>}
          description={<>No frozen trial-price list or invented “best stall”. Use the current shifts, a precise arrival anchor and a food-choice method that still works while vendors rotate.</>}
          actions={[
            { label: 'Choose your visit plan', href: '#plan', kind: 'primary' },
            { label: 'See the Gate 5 route', href: '#route', kind: 'secondary' },
          ]}
          minHeightClassName="min-h-[820px] lg:min-h-[700px]"
          contentClassName="max-w-[680px]"
          titleClassName="max-w-[680px] text-[4rem] leading-[0.84] sm:text-[5rem] lg:text-[5.5rem]"
          subtitleClassName="max-w-[590px] text-[1.7rem] leading-[0.98] text-saffron-dark sm:text-[2.2rem]"
          imageClassName="object-cover object-[67%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.03)_0%,rgba(252,250,246,0.72)_49%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.99)_0%,rgba(252,250,246,0.92)_39%,rgba(252,250,246,0.14)_68%,rgba(18,63,54,0.05)_100%)]"
          sideCard={(
            <aside className="absolute bottom-8 right-[max(2rem,calc((100vw-1240px)/2))] z-10 hidden w-[340px] overflow-hidden rounded-2xl border border-white/60 bg-white/[0.92] shadow-editorial-lift backdrop-blur-xl xl:block">
              <div className="flex items-center justify-between border-b border-jade/10 px-5 py-4"><p className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-saffron-dark">Departure card · July 2026</p><UtensilsCrossed size={18} className="text-jade" /></div>
              <dl className="grid grid-cols-[90px_1fr] gap-x-4 gap-y-3 p-5 text-[11px]">
                <dt className="text-charcoal/46">Anchor</dt><dd className="font-extrabold text-jade">Gate 5 · Ratchadamri</dd>
                <dt className="text-charcoal/46">Morning</dt><dd className="font-extrabold text-jade">05:00–16:00</dd>
                <dt className="text-charcoal/46">Evening</dt><dd className="font-extrabold text-jade">16:00–00:00</dd>
                <dt className="text-charcoal/46">Park</dt><dd className="font-extrabold text-jade">04:30–22:00 · free</dd>
              </dl>
              <p className="border-t border-jade/10 px-5 py-4 text-[10px] font-medium leading-4 text-charcoal/62">Published venue and park hours; individual stalls, dishes and start times can differ on the day.</p>
            </aside>
          )}
        />

        <PageSectionNav items={navItems} />

        <section id="plan" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:items-end">
              <SectionHeading eyebrow="Choose the moment first" title={<>Four useful routes,<br />not one perfect hour</>} description={<>The centre uses rotating vendors and two long shifts. Choose the purpose before chasing a particular dish. Build the wider day with our <InlineLink href="/city/bangkok/">complete Bangkok guide</InlineLink>.</>} />
              <p className="max-w-3xl text-sm font-medium leading-7 text-charcoal/66">This venue is strongest as the bridge between park and meal. A visit built around one online-recommended seller is fragile; a breakfast, lunch or early-dinner route leaves you several good alternatives.</p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {visitPlans.map(({ icon: Icon, title, time, description, route }, index) => (
                <article key={title} className={`flex min-h-[360px] flex-col rounded-2xl border p-6 ${index === 0 ? 'border-saffron/40 bg-[#fff4df] shadow-editorial-card' : 'border-jade/10 bg-white'}`}>
                  <div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/25 bg-canvas text-jade"><Icon size={21} strokeWidth={1.45} /></span><span className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{time}</span></div>
                  <h2 className="mt-6 font-display text-[1.65rem] font-semibold leading-none text-jade">{title}</h2>
                  <p className="mt-4 text-xs font-medium leading-6 text-charcoal/66">{description}</p>
                  <p className="mt-auto border-t border-jade/10 pt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-jade/52">{route}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="route" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <SectionHeading eyebrow="A station name is not the destination" title="Navigate to Gate 5 on Ratchadamri Road" description={<>The dated opening report names Sala Daeng BTS Exit 6 and Lumphini MRT Exit 1. Use our <InlineLink href="/blog/bangkok-public-transport-bts-mrt-tourist-guide-2026/">Bangkok BTS and MRT guide</InlineLink> for the network leg, then follow current station signs.</>} />
            <div>
              <div className="relative grid gap-4 md:grid-cols-3">
                <div className="pointer-events-none absolute left-[10%] right-[10%] top-9 hidden border-t-2 border-dashed border-saffron/60 md:block" />
                {[
                  [TrainFront, 'Station', 'Choose Sala Daeng BTS or Lumphini MRT from your actual origin. Neither name alone identifies the hawker entrance.'],
                  [Map, 'Ratchadamri Road', 'Save the Ratchadamri edge and Gate 5. A generic Lumphini Park pin can place you at another side of the park.'],
                  [MapPin, 'Gate 5', 'The hawker centre sits beside this gate. There is no promise of a fully covered station-to-table connection.'],
                ].map(([Icon, title, text], index) => {
                  const CardIcon = Icon as LucideIcon;
                  return <article key={String(title)} className="relative min-h-[300px] rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="relative z-10 grid h-[72px] w-[72px] place-items-center rounded-full border border-saffron/35 bg-canvas text-jade"><CardIcon size={27} strokeWidth={1.4} /></span><p className="mt-6 text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">Step 0{index + 1}</p><h3 className="mt-2 font-display text-[1.65rem] font-semibold text-jade">{String(title)}</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/66">{String(text)}</p></article>;
                })}
              </div>
              <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-saffron/25 bg-[#fff4df] p-6 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-3xl text-xs font-medium leading-6 text-charcoal/68"><strong className="text-jade">Rain check:</strong> the pavilions are covered but open-sided. Bring a compact rain option for the final walk and do not expect an air-conditioned passage.</p><a href="https://maps.google.com/?q=Hawker+Centre+Suan+Lumphini+Gate+5+Ratchadamri" target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 text-xs font-extrabold text-jade">Open map <ExternalLink size={14} className="text-saffron-dark" /></a></div>
            </div>
          </div>
        </section>

        <section id="food" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
            <div className="relative min-h-[500px] overflow-hidden rounded-[28px] shadow-editorial-lift sm:min-h-[640px]">
              <Image src="/images/redesign/lumpini-hawker-food.webp" alt="Rice porridge, chicken rice, noodles and mango sticky rice on a shared hawker table" fill sizes="(max-width: 1024px) 100vw, 52vw" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-jade/94 via-jade/50 to-transparent p-7 pt-32 text-white"><p className="eyebrow !text-saffron-light">Four directions, not a must-eat list</p><h2 className="max-w-xl font-display text-[3rem] font-semibold leading-[0.9] tracking-[-0.04em]">Choose by cooking, portion and moment.</h2></div>
            </div>
            <div>
              <SectionHeading eyebrow="Scan before ordering" title="A stall matters when it solves your food question" description={<>Use our <InlineLink href="/thailand-street-food/">Thai street-food guide</InlineLink> for dish and ingredient context. Here the task is choosing inside a venue whose exact line-up rotates by shift.</>} />
              <div className="mt-8 space-y-4">
                {[
                  [Coffee, 'Breakfast & gentle', 'Rice porridge, eggs, soy drink or a simple rice plate can fit an early park routine. Ask what is being served fresh now.'],
                  [Soup, 'Hot & made to order', 'Noodles or wok cooking makes preparation visible. Discuss heat and allergens before the bowl or pan is assembled.'],
                  [Salad, 'Fresh & shared', 'Salads and grilled snacks can balance a meal, but sauces may contain fish sauce, peanut, soy, shrimp paste or chilli.'],
                  [UtensilsCrossed, 'Sweet as the finish', 'Fruit or dessert is a sensible last choice. Do not buy the full table before you understand the first portions.'],
                ].map(([Icon, title, text]) => {
                  const CardIcon = Icon as LucideIcon;
                  return <article key={String(title)} className="grid grid-cols-[48px_1fr] gap-4 rounded-2xl border border-jade/10 bg-white p-5"><span className="grid h-12 w-12 place-items-center rounded-xl bg-[#eef2ed] text-jade"><CardIcon size={20} strokeWidth={1.45} /></span><div><h3 className="font-display text-[1.45rem] font-semibold text-jade">{String(title)}</h3><p className="mt-2 text-xs font-medium leading-5 text-charcoal/64">{String(text)}</p></div></article>;
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="pay" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-end">
              <SectionHeading eyebrow="Price without a trial-day museum" title="Read today’s menu" description="A list of April launch prices would look precise while aging badly. With rotating vendors, a simple order check is more useful than presenting one old snapshot as a permanent tariff." />
              <p className="max-w-3xl text-sm font-medium leading-7 text-charcoal/66">Confirm the dish, portion, extras and final amount before ordering. Egg, a larger serving, extra meat or a drink can be priced separately. Pay the displayed menu amount; bargaining over a cooked meal with a visible price is not the visitor’s main task.</p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                [Eye, 'Menu', 'Does the price match the dish and portion you are pointing to?', 'Look before paying'],
                [Banknote, 'Cash backup', 'Carry some small baht notes and put change away before walking with a tray.', 'Do not assume cash-only'],
                [QrCode, 'Thai QR', 'QR BOX supports digital payments, but an overseas banking app does not automatically work with every Thai QR.', 'Bank and vendor specific'],
                [ShieldCheck, 'Allergens', 'Ask about ingredients and cross-contact. If the answer is unclear, choose a simpler dish with visible preparation.', 'No venue-wide guarantee'],
              ].map(([Icon, title, text, cue]) => {
                const CardIcon = Icon as LucideIcon;
                return <article key={String(title)} className="flex min-h-[320px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><CardIcon size={22} strokeWidth={1.45} className="text-jade" /><h3 className="mt-6 font-display text-[1.6rem] font-semibold text-jade">{String(title)}</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/66">{String(text)}</p><p className="mt-auto border-t border-jade/10 pt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{String(cue)}</p></article>;
              })}
            </div>
          </div>
        </section>

        <section id="park" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="relative overflow-hidden rounded-[30px] bg-jade shadow-editorial-lift">
              <div className="relative min-h-[390px] sm:min-h-[460px]"><Image src="/images/redesign/lumpini-hawker-route.webp" alt="Evening route beside the lake in Lumphini Park towards the lit hawker pavilion" fill sizes="100vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-jade/94 via-jade/55 to-transparent" /></div>
              <div className="absolute inset-0 flex max-w-[680px] flex-col justify-center p-8 text-white sm:p-12"><p className="eyebrow !text-saffron-light">Two clocks, one route</p><h2 className="font-display text-[3.25rem] font-semibold leading-[0.88] tracking-[-0.04em] sm:text-[4rem]">The park closes before the food.</h2><p className="mt-5 max-w-xl text-sm font-medium leading-7 text-white/72">BMA publishes Lumphini Park hours of 04:30–22:00; the hawker centre’s published evening shift runs until midnight. Finish deliberately at Gate 5 and never assume every park gate remains a through-route after closing.</p></div>
            </div>
            <div className="mt-8 grid gap-5 lg:grid-cols-[0.66fr_1.34fr]">
              <SectionHeading eyebrow="Morning or evening" title="Plan in the direction of the meal" description="Do not wander the entire park first by default. Choose a loop that ends on Ratchadamri Road, especially in heat, rain or before a fixed next appointment." />
              <div className="grid gap-4 sm:grid-cols-2">
                <article className="rounded-2xl border border-jade/10 bg-white p-7 shadow-editorial-card"><p className="eyebrow">Morning route · about 2 hours</p><h3 className="font-display text-[1.8rem] font-semibold text-jade">Park light → breakfast</h3><ol className="mt-5 space-y-3 text-xs font-medium leading-5 text-charcoal/66"><li>1. Start at the entrance that fits your station.</li><li>2. Walk one calm loop with a heat margin.</li><li>3. Finish at Gate 5 and scan breakfast.</li><li>4. Choose one base dish before the lunch peak.</li></ol></article>
                <article className="rounded-2xl border border-saffron/30 bg-[#fff4df] p-7 shadow-editorial-card"><p className="eyebrow">Evening route · about 2.5 hours</p><h3 className="font-display text-[1.8rem] font-semibold text-jade">Cooler park → dinner</h3><ol className="mt-5 space-y-3 text-xs font-medium leading-5 text-charcoal/66"><li>1. Arrive before dark with park time left.</li><li>2. Walk toward Ratchadamri and Gate 5.</li><li>3. Check which evening stalls are actually active.</li><li>4. Eat outside the park clock and leave street-side.</li></ol></article>
              </div>
            </div>
          </div>
        </section>

        <section id="compare" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-end">
              <SectionHeading eyebrow="Choose the setting" title="When Lumpini works — and when it does not" description={<>For evening markets with shopping and a wider entertainment loop, compare our <InlineLink href="/blog/best-night-markets-bangkok-2026/">Bangkok night-market guide</InlineLink>. Lumpini wins when park and food simplify the same day.</>} />
              <p className="max-w-3xl text-sm font-medium leading-7 text-charcoal/66">An organised pavilion is not automatically safer, more authentic or better than every independent stall. It provides shared infrastructure and seating. Your final choice still depends on cooking, turnover, communication, allergens and which vendors are open during that shift.</p>
            </div>
            <div className="mt-10 overflow-hidden rounded-[26px] border border-jade/10 bg-white shadow-editorial-card">
              <div className="grid grid-cols-[1.25fr_repeat(4,minmax(150px,1fr))] overflow-x-auto text-xs">
                <div className="bg-jade p-5 font-extrabold text-white">You want</div>{['Lumpini hawker', 'Street stall', 'Mall food court', 'Night market'].map((item) => <div key={item} className="min-w-[150px] border-l border-white/10 bg-jade p-5 text-center font-extrabold text-white">{item}</div>)}
                {[
                  ['Park + meal', 'Strong', 'Variable', 'Weak', 'Variable'],
                  ['Air conditioning', 'No', 'No', 'Yes', 'Usually no'],
                  ['Fixed seating', 'Yes', 'Not always', 'Yes', 'Variable'],
                  ['One specific stall', 'Check roster', 'Strong', 'Chains/mix', 'Check venue'],
                  ['Shopping too', 'No', 'No', 'Yes', 'Often'],
                ].flatMap((row) => row.map((cell, index) => <div key={`${row[0]}-${index}`} className={`${index === 0 ? 'font-extrabold text-jade' : 'text-center text-charcoal/66'} min-w-[150px] border-l border-t border-jade/10 p-5 first:border-l-0`}>{cell}</div>))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:items-end"><SectionHeading eyebrow="Park + hawker kit" title="Three light products for the actual route" description="Only items that support the park-to-meal task. No random cookware or gadgets pretending that a free central venue needs expedition equipment." /><p className="max-w-3xl text-sm font-medium leading-7 text-charcoal/66">Central `/go/` routes keep Amazon tracking and OneLink in one place. OneLink may route you to a local Amazon store when supported; always recheck the exact product, seller, size, current price and delivery.</p></div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {amazonProducts.map(({ slug, title, reason, icon: Icon }, index) => (
                <a key={slug} href={`/go/${slug}/`} target="_blank" rel="noopener noreferrer nofollow sponsored" className={`group flex min-h-[300px] flex-col rounded-2xl border p-6 transition hover:-translate-y-1 hover:shadow-editorial-lift ${index === 0 ? 'border-saffron/35 bg-[#fff4df]' : 'border-jade/10 bg-white'}`}>
                  <div className="flex items-center justify-between"><span className="grid h-12 w-12 place-items-center rounded-xl bg-canvas text-jade"><Icon size={22} strokeWidth={1.45} /></span><ExternalLink size={15} className="text-saffron-dark" /></div>
                  <h3 className="mt-6 font-display text-[1.7rem] font-semibold leading-none text-jade">{title}</h3>
                  <p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">{reason}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-5 text-xs font-extrabold text-jade">Check current price at Amazon <ArrowRight size={14} className="text-saffron transition group-hover:translate-x-1" /></span>
                </a>
              ))}
            </div>
            <AffiliateDisclosure className="mt-3">Amazon affiliate disclosure: as an Amazon Associate, Go2Thailand may earn from qualifying purchases at no extra cost to you. OneLink may route you to a local Amazon store; product, seller, current price and availability vary.</AffiliateDisclosure>
          </div>
        </section>

        <FaqSplitSection id="questions" eyebrow="Real English search questions" title="Frequently asked questions about Lumpini Park and the hawker centre" description="Each question was captured verbatim in the independent English SERP research. Answers distinguish official park information and dated venue operations from stall-level details that must be checked on the day." items={faqs} />

        <RelatedGuidesSection
          eyebrow="Keep eating through Bangkok"
          title="From one venue to the right next route"
          guides={[
            { title: 'Thailand street food', description: 'Learn ordering, ingredient and allergen checks beyond one managed hawker centre.', href: '/thailand-street-food/', image: '/images/redesign/bangkok-street-food-market-kit.webp' },
            { title: 'BTS & MRT', description: 'Plan the network leg, final station walk and journey home after the park.', href: '/blog/bangkok-public-transport-bts-mrt-tourist-guide-2026/', image: '/images/blog/bangkok-public-transport-bts-mrt-tourist-guide-2026.webp' },
            { title: 'Compare night markets', description: 'Choose a larger evening market when food, shopping and atmosphere matter together.', href: '/blog/best-night-markets-bangkok-2026/', image: '/images/blog/best-night-markets-bangkok-2026.webp' },
          ]}
          readLabel="Read the guide"
        />

        <SourceMethodSection
          eyebrow="Sources & editorial method"
          title="A new venue needs dated evidence"
          description="Independent English DataForSEO ranking, backlink, keyword-cluster, SERP, competitor and exact-PAA research defined this owner. Operational claims return to April 2026 opening reports and current BMA park information. Rotating vendors, prices, payment methods and dishes are day checks rather than permanent guarantees. Last substantive review: 26 July 2026."
          sources={sources}
        />
      </div>
    </>
  );
}
