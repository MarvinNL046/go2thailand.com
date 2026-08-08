import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  CalendarDays,
  Check,
  CircleHelp,
  Clock3,
  ExternalLink,
  Eye,
  Hotel,
  Map,
  MapPin,
  PackageCheck,
  Scale,
  ShieldCheck,
  ShoppingBasket,
  Sparkles,
  Sprout,
  TrainFront,
  Utensils,
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

const PAGE_URL = 'https://go2-thailand.com/blog/durian-season-thailand-2026-where-to-eat-buy-guide/';
const HERO_IMAGE = '/images/redesign/durian-season-hero.webp';
const PAGE_TITLE = 'Durian season Thailand 2026: festivals, buffets & buying guide';
const PAGE_DESCRIPTION = 'Plan Thailand durian season 2026 with the regional harvest calendar, current festival checks, buffet advice, Bangkok buying tips and a calmer Chanthaburi orchard route.';
const AMAZON_DURIAN_SLUG: AmazonAffiliateSlug = 'kooky-freeze-dried-monthong-durian';

const navItems: PageSectionNavItem[] = [
  { href: '#season', label: 'Season', icon: CalendarDays },
  { href: '#varieties', label: 'Varieties', icon: Sparkles },
  { href: '#buy', label: 'Buying', icon: ShoppingBasket },
  { href: '#taste', label: 'Tasting', icon: Utensils },
  { href: '#orchard', label: 'Orchards', icon: Sprout },
  { href: '#rules', label: 'Rules', icon: ShieldCheck },
  { href: '#questions', label: 'Questions', icon: CircleHelp },
];

const cultivars = [
  {
    name: 'Monthong',
    thai: 'Golden pillow',
    profile: 'Often introduced as a more approachable Thai cultivar: pale-to-rich yellow flesh, a smoother texture and an aroma that can feel less forceful than a very ripe Chanee.',
    ask: 'Ask for firm or creamy',
    firstTry: 'A logical first option, not a compulsory one',
  },
  {
    name: 'Chanee',
    thai: 'Gibbon',
    profile: 'Usually deeper yellow; as it ripens, the flesh can become softer, creamier and more powerful in sweet, savoury and aromatic impressions.',
    ask: 'Ask how ripe the portion is',
    firstTry: 'For travellers who want more intensity',
  },
  {
    name: 'Kradum',
    thai: 'Button',
    profile: 'Commonly smaller, with ripe flesh that can become soft and sweet. Its compact size can make it easier to compare without committing to a very large fruit.',
    ask: 'Ask when it was opened',
    firstTry: 'Small fruit, large ripeness effect',
  },
  {
    name: 'Kanyao',
    thai: 'Long stem',
    profile: 'A recognised premium cultivar with a rounder fruit shape and a different balance of sweetness, aroma and texture. Reputation alone does not predict your preference.',
    ask: 'Ask cultivar and origin',
    firstTry: 'Price is not an objective flavour score',
  },
];

const faqs = [
  {
    question: 'Is it durian season in Thailand now?',
    answer: 'It depends on today’s date, region, weather and cultivar. For eastern Thailand in 2026, official material placed Chanthaburi supply broadly from February to July, with the highest volume in May. TAT describes May to July as a strong orchard-travel period in Chanthaburi. Bangkok can receive fruit from several regions, so availability there does not prove a local harvest peak.',
  },
  {
    question: 'What is the durian season in Thailand?',
    answer: 'Thailand does not have one nationwide switch that turns every region on at the same time. In 2026, Chanthaburi’s official supply window ran from February to July, and TAT highlights May to July for eastern fruit orchards. Southern and other regional harvests can differ. Plan with a province, cultivar and travel year, then recheck current local announcements.',
  },
  {
    question: 'Which month is best for durian?',
    answer: 'May is the strongest first guess for an eastern-Thailand fruit trip in 2026 because official information identifies a May peak and Chanthaburi/Trat agritourism focus. “Best” still depends on the cultivar, ripeness and exact orchard. For a wider orchard holiday, May to July gives a practical planning window, provided the chosen garden confirms that it is open.',
  },
  {
    question: 'Where can I find good durian in Bangkok?',
    answer: 'Or Tor Kor Market beside MRT Kamphaeng Phet is an easy place to compare fruit sellers, while supermarkets and specialist fruit vendors offer other buying contexts. No market name guarantees the best portion. Ask every seller the same four questions: cultivar, origin, ripeness and whether the price is per kilogram, whole fruit or opened box.',
  },
  {
    question: 'What is the best Thai durian variety?',
    answer: 'There is no objective winner. Monthong is often approachable for beginners, while ripe Chanee can be softer, sweeter and more aromatic. Kradum is smaller, and Kanyao carries a premium reputation. Compare small portions at similar ripeness; otherwise you may mistake a ripeness difference for a cultivar difference.',
  },
  {
    question: 'What does a Chanee durian taste like?',
    answer: 'A ripe Chanee can feel creamy, sweet and comparatively intense in aroma, with savoury notes that are difficult to reduce to one familiar food. The exact experience depends heavily on ripeness and handling. Ask for a small portion and whether the seller considers it firm, creamy or very ripe before judging the cultivar.',
  },
  {
    question: 'Is Monthong durian sweet?',
    answer: 'Monthong can taste sweet and creamy, but sweetness changes with maturity and ripeness. A firmer portion may feel drier and more restrained; a softer one can feel fuller and sweeter. The cultivar name alone cannot promise the exact flavour of one box, so discuss the desired texture before the fruit is opened.',
  },
  {
    question: 'How to choose Thailand durian?',
    answer: 'Choose the cultivar and ripeness separately, start with a small opened portion, confirm origin and ask when it was opened. Check whether the price refers to a whole fruit per kilogram or only edible flesh in a box, watch the scale and confirm the total before opening. Let the seller handle the spiny husk rather than using a travel knife.',
  },
  {
    question: 'Why is durian expensive in Thailand?',
    answer: 'Price can reflect cultivar, origin, season, grade, ripeness, size, handling, demand and whether you buy a whole fruit or selected edible flesh. Whole fruit includes heavy husk and seeds, while a prepared box charges for selection and opening. Ask for the unit and total; a high price does not guarantee that you prefer the flavour.',
  },
  {
    question: 'Can I eat durian in a Thailand hotel?',
    answer: 'Only when the specific hotel allows it. Many properties restrict durian because the smell can affect rooms and other guests, but policy is set by the accommodation. Ask reception before buying; a sealed-looking box does not override house rules. Eating it at the seller or an orchard avoids carrying smell and waste into the room.',
  },
  {
    question: 'Can you bring food on BTS?',
    answer: 'BTS regulations prohibit consuming food or drink in trains and paid areas, and separately prohibit bringing matter that may release bad or offensive smells into the system. Do not take opened or strongly smelling durian onto BTS. For ordinary sealed food, follow current signs and staff instructions, but do not eat it in the paid area.',
  },
  {
    question: 'Can you check in luggage with durian?',
    answer: 'Do not assume so. Airline, airport, route, destination customs and whether the fruit is fresh, frozen or processed all matter. Some carriers prohibit durian because of smell even in checked baggage. Check the operating airline and destination authority before purchase; seller packaging does not create permission.',
  },
  {
    question: 'Who should avoid eating durian?',
    answer: 'A travel guide cannot decide an individual medical diet. Durian is energy-dense fruit, and people with clinician-directed limits involving sugar, potassium, energy intake or another condition should follow personalised advice. Anyone with a known allergy should avoid it. First-time tasters without such restrictions can begin with a small portion rather than treating it as a challenge.',
  },
];

const sources = [
  {
    title: 'Thailand commences the 2026 tropical fruit season',
    creator: 'Government of Thailand',
    url: 'https://thailand.go.th/public/issue-focus-detail/thailand-officially-commences-2026-tropical-fruit-season-strategic-integration-of-gastronomy-soft-power-to-accelerate-grassroots-economic-growth',
    note: 'Current official 2026 context for the May durian peak and agritourism in eastern provinces including Chanthaburi and Trat.',
  },
  {
    title: 'Eastern durian production and quality measures 2026',
    creator: 'Thailand Department of Agriculture',
    url: 'https://www.doa.go.th/th/news_release/106997/',
    note: 'Official Chanthaburi production context supporting the February–July window, May volume peak and cultivar-dependent harvest dates.',
  },
  {
    title: 'Chanthaburi–Rayong fruit route',
    creator: 'Tourism Authority of Thailand',
    url: 'https://www.tourismthailand.org/Articles/chanthaburi-rayong',
    note: 'Primary tourism source for May–July orchard travel and the need to select an actual orchard experience.',
  },
  {
    title: 'The Beginner’s Guide to Thai Durians',
    creator: 'Royal Thai Embassy, Shanghai',
    url: 'https://thaishanghai.thaiembassy.org/th/content/the-beginner-s-guide-to-thai-durians?cate=5f0d67e59cc17760ab1a99d2',
    note: 'Source for Monthong, Chanee, Kradum and Kanyao cultivar context. Old prices from the source are not reused.',
  },
  {
    title: 'Announcement and Regulations',
    creator: 'BTS SkyTrain',
    url: 'https://www.bts.co.th/eng/service/AnnouncementandRegulations.html',
    note: 'Primary operator source for the ban on eating in the paid system and bringing matter that may release bad or offensive smells.',
  },
];

function createSchemas() {
  return [
    {
      '@context': 'https://schema.org', '@type': 'Article', '@id': `${PAGE_URL}#article`, headline: PAGE_TITLE,
      description: PAGE_DESCRIPTION, image: `https://go2-thailand.com${HERO_IMAGE}`, datePublished: '2026-03-23', dateModified: '2026-07-26',
      inLanguage: 'en', mainEntityOfPage: PAGE_URL,
      author: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
      publisher: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
    },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/' },
        { '@type': 'ListItem', position: 2, name: 'Food', item: 'https://go2-thailand.com/food/' },
        { '@type': 'ListItem', position: 3, name: 'Durian in Thailand', item: PAGE_URL },
      ],
    },
    { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Thai durian varieties for travellers', itemListElement: cultivars.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, description: item.profile })) },
    {
      '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to buy and taste durian for the first time in Thailand',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Choose a small portion', text: 'Do not open a whole fruit for a first taste unless you understand the size and price.' },
        { '@type': 'HowToStep', position: 2, name: 'Choose cultivar and ripeness', text: 'Ask for both the variety and a firm, creamy or very ripe texture.' },
        { '@type': 'HowToStep', position: 3, name: 'Confirm the price unit', text: 'Check whether the price is per kilogram, whole fruit or opened flesh, then confirm the total.' },
        { '@type': 'HowToStep', position: 4, name: 'Eat at the seller', text: 'Taste where smell, husk, seeds and packaging can be handled correctly.' },
      ],
    },
  ];
}

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="font-extrabold text-jade underline decoration-saffron/55 underline-offset-4 transition hover:text-saffron-dark">{children}</Link>;
}

export function DurianThailandGuideEn() {
  const subId = useSubId();
  const hotelHref = withPlacementSubId(TRIP_GENERIC, subId, 'durian-en-chanthaburi-stay');
  const schemas = createSchemas();

  return (
    <>
      <SEOHead title={PAGE_TITLE} description={PAGE_DESCRIPTION} ogImage={`https://go2-thailand.com${HERO_IMAGE}`}>
        <meta name="keywords" content="durian season thailand 2026, durian thailand, best month durian thailand, durian bangkok, Monthong Chanee, durian orchard thailand" />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content="2026-03-23" />
        <meta property="article:modified_time" content="2026-07-26" />
        {schemas.map((schema, index) => <script key={`${schema['@type']}-${index}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      </SEOHead>

      <div className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          image={HERO_IMAGE}
          imageAlt="Thai fruit seller opening a durian in an eastern Thailand orchard"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Food', href: '/food/' }, { label: 'Durian' }]}
          breadcrumbAriaLabel="Breadcrumb"
          eyebrow="Taste the season, not the hype"
          title={<>Durian.<br />At the right moment.</>}
          subtitle={<>Choose origin, cultivar and ripeness.</>}
          description={<>Durian season in Thailand is regional, not one nationwide switch. Use the current 2026 eastern calendar, cultivar guide and buying route to find a first portion without price myths or an outdated festival date.</>}
          actions={[
            { label: 'See the 2026 season', href: '#season', kind: 'primary' },
            { label: 'Plan your first taste', href: '#taste', kind: 'secondary' },
          ]}
          minHeightClassName="min-h-[820px] lg:min-h-[700px]"
          contentClassName="max-w-[710px]"
          titleClassName="max-w-[680px] text-[4rem] leading-[0.84] sm:text-[5rem] lg:text-[5.55rem]"
          subtitleClassName="max-w-[630px] text-[1.7rem] leading-[0.98] text-saffron-dark sm:text-[2.2rem]"
          imageClassName="object-cover object-[70%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.04)_0%,rgba(252,250,246,0.69)_48%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.99)_0%,rgba(252,250,246,0.91)_39%,rgba(252,250,246,0.14)_67%,rgba(18,63,54,0.06)_100%)]"
          sideCard={(
            <aside className="absolute bottom-8 right-[max(2rem,calc((100vw-1240px)/2))] z-10 hidden w-[340px] overflow-hidden rounded-2xl border border-white/60 bg-white/[0.92] shadow-editorial-lift backdrop-blur-xl xl:block">
              <div className="flex items-center justify-between border-b border-jade/10 px-5 py-4"><p className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-saffron-dark">Eastern Thailand 2026</p><CalendarDays size={18} className="text-jade" /></div>
              <dl className="grid grid-cols-[92px_1fr] gap-x-4 gap-y-3 p-5 text-[11px]">
                <dt className="text-charcoal/46">Supply</dt><dd className="font-extrabold text-jade">February–July</dd>
                <dt className="text-charcoal/46">Peak volume</dt><dd className="font-extrabold text-jade">May in Chanthaburi</dd>
                <dt className="text-charcoal/46">Orchards</dt><dd className="font-extrabold text-jade">Plan May–July</dd>
                <dt className="text-charcoal/46">Always check</dt><dd className="font-extrabold text-jade">Year + province</dd>
              </dl>
              <p className="border-t border-jade/10 px-5 py-4 text-[10px] font-medium leading-4 text-charcoal/62">Official 2026 planning reference for Chanthaburi, not a guarantee for every region, cultivar, stall or travel date.</p>
            </aside>
          )}
        />

        <PageSectionNav label="On this page" items={navItems} />

        <section id="season" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:items-end">
              <SectionHeading eyebrow="One fruit, several calendars" title={<>When is durian<br />season in Thailand?</>} description={<>Plan with a region and year. Combine the harvest window with our <InlineLink href="/blog/best-time-to-visit-thailand/">best time to visit Thailand guide</InlineLink>, because peak fruit volume and the driest travel weather are not automatically the same.</>} />
              <p className="max-w-3xl text-sm font-medium leading-7 text-charcoal/66">For current planning, Chanthaburi is the strongest official reference: 2026 supply was forecast from February to July, with the greatest volume in May. TAT positions May to July as a prime orchard period in Chanthaburi and Rayong. Use that as an eastern travel window, not a universal biological rule for the whole country.</p>
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-4">
              {[
                ['Feb–Apr', 'Early eastern supply', 'Cultivars do not mature together. Official minimum harvest dates in Chanthaburi varied by variety during 2026.', 'More weekly variation'],
                ['May', 'Highest 2026 volume', 'Chanthaburi expected its largest share in May. More choice does not make every opened segment perfectly ripe.', 'Strongest first guess'],
                ['Jun–Jul', 'Orchard window', 'TAT highlights May–July for fruit routes in Chanthaburi and Rayong. Opening and supply remain garden-specific.', 'Confirm before travel'],
                ['Afterwards', 'Ask for origin', 'Bangkok can receive fruit from other regions and chilled chains. Availability is not the same as a local peak.', 'No national off switch'],
              ].map(([period, title, text, cue], index) => (
                <article key={period} className={`flex min-h-[330px] flex-col rounded-2xl border p-6 ${index === 1 ? 'border-saffron/40 bg-[#fff4df] shadow-editorial-card' : 'border-jade/10 bg-white'}`}>
                  <p className="font-display text-[2rem] font-semibold text-saffron-dark">{period}</p><h3 className="mt-5 font-display text-[1.55rem] font-semibold leading-none text-jade">{title}</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/66">{text}</p><p className="mt-auto border-t border-jade/10 pt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-jade/55">{cue}</p>
                </article>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-saffron/25 bg-[#fff4df] p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-4xl text-xs font-medium leading-6 text-charcoal/70"><strong className="text-jade">Festival check:</strong> never anchor a trip to an old blog date. Rayong’s official 2026 fruit festival ran 21–24 May, but another year can use different dates and venue. Find the provincial or TAT announcement for your actual travel year before booking.</p>
              <a href="https://thai.tourismthailand.org/Articles/fruits-festival-rayong-2026" target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 text-xs font-extrabold text-jade">Open 2026 source <ExternalLink size={14} className="text-saffron-dark" /></a>
            </div>
          </div>
        </section>

        <section id="varieties" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:items-end"><SectionHeading eyebrow="Cultivar × ripeness" title="The variety is only half the flavour" description="Do not ask only for ‘the best durian’. The same cultivar moves from firm and controlled to softer, sweeter and more aromatic as it ripens." /><div className="grid gap-3 sm:grid-cols-2">{['Milder aroma', 'Stronger aroma', 'Firmer flesh', 'Softer and creamier'].map((label, index) => <div key={label} className="flex items-center gap-3 rounded-xl border border-jade/10 bg-white px-5 py-4"><span className={`h-3 w-3 rounded-full ${index % 2 ? 'bg-saffron' : 'bg-jade'}`} /><span className="text-xs font-extrabold text-jade">{label}</span></div>)}</div></div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {cultivars.map((cultivar, index) => (
                <article key={cultivar.name} className="flex min-h-[405px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                  <div className="flex items-start justify-between gap-4"><span className="grid h-11 w-11 place-items-center rounded-full bg-jade font-display text-lg font-semibold text-saffron-light">0{index + 1}</span><span className="text-right text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{cultivar.thai}</span></div>
                  <h2 className="mt-6 font-display text-[1.8rem] font-semibold text-jade">{cultivar.name}</h2><p className="mt-4 text-xs font-medium leading-6 text-charcoal/66">{cultivar.profile}</p><div className="mt-auto space-y-3 border-t border-jade/10 pt-5"><p className="text-[10px] font-extrabold text-jade"><Check size={14} className="mr-2 inline text-saffron" />{cultivar.ask}</p><p className="text-[10px] font-medium leading-5 text-charcoal/55">{cultivar.firstTry}</p></div>
                </article>
              ))}
            </div>
            <div className="mt-8 grid gap-5 lg:grid-cols-[0.58fr_1.42fr] lg:items-stretch">
              <div className="rounded-2xl bg-jade p-7 text-white"><p className="eyebrow !text-saffron-light">The ripeness ladder</p><h2 className="font-display text-[2.6rem] font-semibold leading-[0.92]">Ask how you want it to feel, not only what it is called.</h2><p className="mt-5 text-xs font-medium leading-6 text-white/68">Ripeness language varies by seller. Ask to see one compartment or choose an existing small portion before committing to a whole fruit.</p></div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  ['Firm', 'Clearly shaped segments and a drier bite. The aroma can feel more restrained. Firm does not automatically mean unripe; ask whether the seller considers it ready to eat.', 'For texture seekers'],
                  ['Creamy', 'Softer flesh that yields more easily and can feel fuller and sweeter. This is a useful middle choice for many first-time tasters.', 'Balanced starting point'],
                  ['Very ripe', 'Much softer, stronger smelling and often more intense in sweet and savoury notes. Choose it consciously and eat immediately.', 'For intensity'],
                ].map(([title, text, cue], index) => <article key={title} className={`flex min-h-[295px] flex-col rounded-2xl border p-6 ${index === 1 ? 'border-saffron/35 bg-[#fff4df]' : 'border-jade/10 bg-white'}`}><p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">Level 0{index + 1}</p><h3 className="mt-4 font-display text-[1.65rem] font-semibold text-jade">{title}</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/66">{text}</p><p className="mt-auto border-t border-jade/10 pt-4 text-[9px] font-extrabold uppercase tracking-[0.12em] text-jade/50">{cue}</p></article>)}
              </div>
            </div>
          </div>
        </section>

        <section id="buy" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div className="relative min-h-[500px] overflow-hidden rounded-[28px] shadow-editorial-lift sm:min-h-[640px]">
              <Image src="/images/redesign/durian-buying-guide.webp" alt="Fruit seller and traveller comparing small durian portions at a market" fill sizes="(max-width: 1024px) 100vw, 54vw" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-jade/94 via-jade/55 to-transparent p-7 pt-32 text-white"><p className="eyebrow !text-saffron-light">Open one compartment first</p><h2 className="max-w-xl font-display text-[3rem] font-semibold leading-[0.9] tracking-[-0.04em]">A useful seller helps you choose ripeness.</h2></div>
            </div>
            <div>
              <SectionHeading eyebrow="Five checks at the stall" title="Buy what you understand" description={<>For food, <InlineLink href="/blog/chatuchak-weekend-market-food-guide/">Chatuchak is a broad market experience</InlineLink>; nearby Or Tor Kor beside MRT Kamphaeng Phet offers a more focused fresh-fruit comparison. Neither name guarantees the cheapest or best box.</>} />
              <ol className="mt-8 space-y-5">
                {[
                  ['Cultivar', 'Ask the seller to point to or write the variety. “Premium” is not a cultivar.'],
                  ['Ripeness', 'Choose firm, creamy or very ripe and ask the seller to describe what that means for this fruit.'],
                  ['Unit', 'Confirm whole fruit per kilogram or a box containing only edible flesh.'],
                  ['Weight', 'Watch the scale and confirm the total before the fruit is opened for you.'],
                  ['Timing', 'Ask when a prepared box was opened and eat it immediately or appropriately chilled.'],
                ].map(([title, text], index) => <li key={title} className="grid grid-cols-[46px_1fr] gap-4"><span className="grid h-11 w-11 place-items-center rounded-full bg-[#fff0d5] text-sm font-extrabold text-saffron-dark">0{index + 1}</span><div><h3 className="text-sm font-extrabold text-jade">{title}</h3><p className="mt-1 text-xs font-medium leading-5 text-charcoal/64">{text}</p></div></li>)}
              </ol>
              <div className="mt-7 rounded-2xl border border-jade/10 bg-white p-5"><p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">One-sentence price check</p><p className="mt-3 font-display text-[1.6rem] font-semibold leading-tight text-jade">“Is this price for the whole fruit, per kilogram or for this box of edible flesh?”</p></div>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:items-end"><SectionHeading eyebrow="Where to buy in Bangkok" title="Choose the buying context first" description={<>Bangkok gives you options without an orchard journey. Use our <InlineLink href="/blog/bangkok-public-transport-bts-mrt-tourist-guide-2026/">BTS and MRT guide</InlineLink> for the route, but buy only after deciding where you can eat the portion and how you travel afterwards.</>} /><p className="max-w-3xl text-sm font-medium leading-7 text-charcoal/66">A market enables conversation and variety, a supermarket often provides clearer labels and refrigeration, and a specialist can explain ripeness. Compare the actual portion rather than assuming one famous place wins every criterion.</p></div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                [MapPin, 'Or Tor Kor', 'Fresh market beside MRT Kamphaeng Phet, useful for comparing several fruit sellers using the same cultivar, ripeness, unit and origin questions.', 'Best for comparison'],
                [ShoppingBasket, 'Local fruit seller', 'Strong when the seller opens a portion and adjusts ripeness. A busy stall suggests turnover, not guaranteed quality.', 'Best for explanation'],
                [PackageCheck, 'Supermarket', 'Prepared boxes can make net weight and storage clearer. Check packed time, refrigeration, damage and where you may eat it.', 'Best for convenience'],
                [Sprout, 'Orchard', 'The clearest origin experience after confirming opening, tasting format, cultivars and transport. A buffet changes with the crop.', 'Best for context'],
              ].map(([Icon, title, text, cue]) => {
                const CardIcon = Icon as LucideIcon;
                return <article key={String(title)} className="flex min-h-[340px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#eef2ed] text-jade"><CardIcon size={20} strokeWidth={1.45} /></span><h3 className="mt-6 font-display text-[1.55rem] font-semibold leading-none text-jade">{String(title)}</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/66">{String(text)}</p><p className="mt-auto border-t border-jade/10 pt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{String(cue)}</p></article>;
              })}
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
              <SectionHeading eyebrow="Price without an old baht figure" title="Normalise before comparing" description="A whole fruit can look cheaper because the heavy husk and seeds are included. Opened flesh can look expensive per kilogram because you pay for selection, opening and only the edible portion. Both can be logical." />
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  [Scale, 'Whole fruit', 'Record price per kilogram, total weight and what happens if the opened flesh does not match the agreed ripeness.', 'Husk counts'],
                  [PackageCheck, 'Opened box', 'Check net content, cultivar, packed time and refrigeration. Compare boxes only when the weights really match.', 'Convenience costs'],
                  [Clock3, 'Tasting or buffet', 'Compare duration, included cultivars, hours, booking and waste rules. Unlimited says nothing about what is ripe that day.', 'Experience has value'],
                ].map(([Icon, title, text, cue], index) => {
                  const CardIcon = Icon as LucideIcon;
                  return <article key={String(title)} className={`flex min-h-[320px] flex-col rounded-2xl border p-6 ${index === 1 ? 'border-saffron/35 bg-[#fff4df]' : 'border-jade/10 bg-white'}`}><CardIcon size={22} strokeWidth={1.45} className="text-jade" /><h3 className="mt-6 font-display text-[1.6rem] font-semibold text-jade">{String(title)}</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/66">{String(text)}</p><p className="mt-auto border-t border-jade/10 pt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{String(cue)}</p></article>;
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="taste" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="overflow-hidden rounded-[30px] bg-jade text-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[0.58fr_1.42fr]">
                <div className="p-8 sm:p-10 lg:p-12"><p className="eyebrow !text-saffron-light">First time?</p><h2 className="font-display text-[3.35rem] font-semibold leading-[0.88] tracking-[-0.04em]">Taste small. Compare fairly.</h2><p className="mt-6 text-sm font-medium leading-7 text-white/68">Begin with one or two segments, not a whole fruit or buffet. You discover whether texture, sweetness or aroma matters most without turning the “king of fruits” into an eating challenge.</p></div>
                <div className="grid gap-px bg-white/10 sm:grid-cols-4">
                  {[
                    [PackageCheck, 'Small box', 'Order a portion you can finish at the seller.'],
                    [Eye, 'Look first', 'Compare colour and structure without treating them as safety guarantees.'],
                    [Utensils, 'One bite', 'Let the flavour settle before switching cultivar.'],
                    [ShoppingBasket, 'Return waste', 'Use the seller’s point for husk, seeds and packaging.'],
                  ].map(([Icon, title, text]) => {
                    const CardIcon = Icon as LucideIcon;
                    return <article key={String(title)} className="flex min-h-[310px] flex-col bg-jade p-6 sm:py-9"><CardIcon size={23} strokeWidth={1.4} className="text-saffron-light" /><h3 className="mt-6 font-display text-[1.55rem] font-semibold leading-none">{String(title)}</h3><p className="mt-4 text-xs font-medium leading-6 text-white/64">{String(text)}</p><ArrowRight size={16} className="mt-auto text-saffron-light" /></article>;
                  })}
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-[0.66fr_1.34fr]">
              <article className="rounded-2xl border border-saffron/25 bg-[#fff4df] p-7"><p className="eyebrow">Flavour without clichés</p><h3 className="font-display text-[2rem] font-semibold leading-tight text-jade">Move beyond good or disgusting: creamy, sweet, savoury and aromatic.</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/66">Name the quality you notice. It makes a cultivar comparison more useful than trying to describe the smell as dramatically as possible.</p></article>
              <article className="rounded-2xl border border-jade/10 bg-white p-7"><p className="text-sm font-extrabold text-jade">Make freshness visible, not mystical</p><p className="mt-3 text-xs font-medium leading-6 text-charcoal/66">After opening, time, temperature and handling matter. Buy when you can actually eat, choose appropriate refrigeration for prepared fruit and do not leave a box in hot luggage. Appearance or smell alone cannot guarantee food safety. A whole fruit protects its flesh until opening; once opened, ordinary food-handling judgement applies.</p></article>
            </div>

            <div className="mt-10 overflow-hidden rounded-[28px] border border-jade/10 bg-tonal shadow-editorial-card">
              <div className="grid lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
                <div className="p-8 sm:p-10"><p className="eyebrow">A different way to compare at home</p><h2 className="font-display text-[2.8rem] font-semibold leading-[0.92] tracking-[-0.035em] text-jade">Freeze-dried Monthong is not fresh durian.</h2><p className="mt-5 text-sm font-medium leading-7 text-charcoal/66">It can be a shelf-stable introduction to the cultivar’s sweet-savoury direction, but freeze-drying changes aroma, moisture and texture. Check ingredients, pack size, allergen information, seller and country availability. Do not use a processed snack to judge the ripeness of fruit you will meet in Thailand.</p></div>
                <div className="bg-jade p-8 text-white sm:p-10">
                  <a href={`/go/${AMAZON_DURIAN_SLUG}/`} target="_blank" rel="noopener noreferrer nofollow sponsored" className="group block rounded-2xl border border-white/14 bg-white/[0.07] p-6 transition hover:border-saffron/45 hover:bg-white/[0.1]">
                    <div className="flex items-start justify-between gap-5"><div><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">Amazon OneLink · current English SERP product</p><h3 className="mt-3 font-display text-[2rem] font-semibold leading-none">Kooky freeze-dried Monthong durian</h3></div><ExternalLink size={18} className="shrink-0 text-saffron-light" /></div>
                    <p className="mt-5 text-xs font-medium leading-6 text-white/64">A packaged tasting comparison discovered in the current UK shopping results. OneLink may route another country to a different local listing or no matching offer.</p>
                    <span className="mt-6 inline-flex items-center gap-2 border-t border-white/12 pt-5 text-xs font-extrabold text-saffron-light">Check current price at Amazon <ArrowRight size={14} /></span>
                  </a>
                  <AffiliateDisclosure className="mt-4 !text-white/54">Amazon affiliate disclosure: as an Amazon Associate, we may earn from qualifying purchases at no extra cost to you. Price, product, ingredients, seller, delivery and availability vary by country. OneLink can route you to a local Amazon store.</AffiliateDisclosure>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="orchard" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="relative overflow-hidden rounded-[30px] bg-jade shadow-editorial-lift">
              <div className="relative min-h-[380px] sm:min-h-[440px]"><Image src="/images/redesign/durian-orchard-route.webp" alt="Wet country road beside fruit orchards and a durian stall in Chanthaburi" fill sizes="100vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-jade/94 via-jade/62 to-transparent" /></div>
              <div className="absolute inset-0 flex max-w-[680px] flex-col justify-center p-8 text-white sm:p-12"><p className="eyebrow !text-saffron-light">From Bangkok to the source</p><h2 className="font-display text-[3.2rem] font-semibold leading-[0.88] tracking-[-0.04em] sm:text-[4rem]">Do not turn Chanthaburi into a rushed day trip.</h2><p className="mt-5 max-w-xl text-sm font-medium leading-7 text-white/72">The journey, orchard hours and tropical rain need margin. Combine one confirmed garden with town, market or coast and stay overnight when fruit is the main reason for travelling.</p><Link href="/city/chanthaburi/" className="btn-jade btn-jade-pattern mt-7 w-fit border border-white/20 px-6">Plan Chanthaburi <ArrowRight size={16} className="text-saffron" /></Link></div>
            </div>
            <div className="mt-8 grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">
              <SectionHeading eyebrow="Two days, one good tasting" title="A fruit route with breathing room" description={<>Use our guide to <InlineLink href="/city/chanthaburi/food/">food in Chanthaburi</InlineLink> as a local base. Always call or message an orchard about opening, cultivars, tasting format, reservation and language.</>} />
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ['Day 1', 'Arrive & compare', 'Travel without an early orchard deadline. Explore Chanthaburi, compare fruit at a market and note the cultivar and ripeness you want tomorrow.'],
                  ['Day 2', 'Orchard & departure', 'Visit one confirmed garden early, taste with restraint and hold a wet-weather backup. Leave only after you no longer need to carry opened durian.'],
                ].map(([day, title, text]) => <article key={day} className="rounded-2xl border border-jade/10 bg-white p-7 shadow-editorial-card"><p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">{day}</p><h3 className="mt-3 font-display text-[1.75rem] font-semibold text-jade">{title}</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/66">{text}</p></article>)}
              </div>
            </div>
          </div>
        </section>

        <section id="rules" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-start">
            <SectionHeading eyebrow="The smell travels farther than you" title="Check the next door before buying" description="‘Durian is banned everywhere’ is too broad. One rule is clear: BTS prohibits matter that may release bad or offensive smells and also bans eating in the paid system. For other doors, check the specific provider." />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                [TrainFront, 'BTS', 'Do not bring opened or strongly smelling durian into the system; consuming any food in the paid area is also prohibited.', 'Official rule'],
                [Hotel, 'Hotel', 'Ask reception before buying. A closed box can still breach the property’s house rules.', 'Property-specific'],
                [Map, 'Taxi, bus, MRT', 'Ask the driver or operator and follow signage. Packaging does not automatically create permission.', 'Operator-specific'],
                [PackageCheck, 'Flight & border', 'Check airline, airport and destination-country rules for fresh, frozen or processed fruit before purchase.', 'Route-specific'],
              ].map(([Icon, title, text, cue]) => {
                const CardIcon = Icon as LucideIcon;
                return <article key={String(title)} className="flex min-h-[330px] flex-col rounded-2xl border border-jade/10 bg-white p-6"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#eef2ed] text-jade"><CardIcon size={20} strokeWidth={1.45} /></span><h3 className="mt-6 font-display text-[1.55rem] font-semibold text-jade">{String(title)}</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">{String(text)}</p><p className="mt-auto border-t border-jade/10 pt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{String(cue)}</p></article>;
              })}
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-14 lg:py-20">
          <div className="container-custom">
            <div className="rounded-[28px] bg-jade p-8 text-white shadow-editorial-lift sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-12">
              <div className="max-w-3xl"><p className="eyebrow !text-saffron-light">Staying in Chanthaburi?</p><h2 className="font-display text-[2.8rem] font-semibold leading-[0.92] tracking-[-0.035em]">Compare location on your orchard route, not room price alone.</h2><p className="mt-4 text-sm font-medium leading-7 text-white/68">Check travel time to the confirmed garden, parking or transfer, and the property’s durian policy before buying fruit. An overnight stay makes the route calmer; it is unnecessary when Bangkok is your only tasting location.</p></div>
              <a href={hotelHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-cream mt-7 shrink-0 px-7 text-saffron-dark lg:mt-0">Check current hotel price at Trip.com <ExternalLink size={15} /></a>
            </div>
            <AffiliateDisclosure className="mt-3">Affiliate disclosure: Go2Thailand may earn commission after a booking at no extra cost to you. Recheck location, current price, conditions and the property’s fruit or smell policy directly before booking.</AffiliateDisclosure>
          </div>
        </section>

        <FaqSplitSection id="questions" eyebrow="Real English search questions" title="Frequently asked questions about durian in Thailand" description="Every question below was captured verbatim in the English SERP research. Answers separate current regional facts from taste, price, health and operator policies that require individual checking." items={faqs} />

        <RelatedGuidesSection
          eyebrow="Keep building the fruit trip"
          title="From Bangkok market to eastern Thailand"
          guides={[
            { title: 'Complete Chanthaburi guide', description: 'Plan town, fruit, coast and transport as one calmer destination route.', href: '/city/chanthaburi/', image: '/images/redesign/chanthaburi-hero.webp', imageAlt: 'Chanthaburi landscape in eastern Thailand' },
            { title: 'Food in Chanthaburi', description: 'Add markets, local dishes and other seasonal fruit around the orchard day.', href: '/city/chanthaburi/food/', image: '/images/redesign/chanthaburi-fruit-food.webp', imageAlt: 'Seasonal fruit and food in Chanthaburi' },
            { title: 'Food at Chatuchak', description: 'Combine the market with a food route and the nearby Or Tor Kor fresh-market area.', href: '/blog/chatuchak-weekend-market-food-guide/', image: '/images/redesign/chatuchak-food-hero.webp', imageAlt: 'Food stalls at Chatuchak Market' },
          ]}
          readLabel="Read the guide"
        />

        <SourceMethodSection
          eyebrow="Sources & editorial method"
          title="Regional data before a universal calendar"
          description="Independent English DataForSEO ranking, backlink, keyword-cluster, SERP, competitor and exact-PAA research set the task. Seasonal, cultivar and BTS claims return to Thai government, Department of Agriculture, embassy, TAT and operator sources. Old source prices and unverified future festivals or buffets are excluded. Last substantive review: 26 July 2026."
          sources={sources}
        />
      </div>
    </>
  );
}

