import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  BedDouble,
  CalendarDays,
  Compass,
  ExternalLink,
  MapPin,
  MoonStar,
  Palmtree,
  Plane,
  Route,
  Scale,
  Ship,
  Sparkles,
  TicketCheck,
  Users,
  Waves,
} from 'lucide-react';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';
import { KLOOK_GENERIC, TRIP_GENERIC, TWELVEGO_GENERIC, cityAffiliates, withSubId } from '../../lib/affiliates';

const PAGE_URL = 'https://go2-thailand.com/blog/phuket-vs-koh-samui-for-tourists/';
const UPDATED_AT = '2026-07-27';

const navItems = [
  { href: '#verdict' as const, label: 'Verdict', icon: BadgeCheck },
  { href: '#compare' as const, label: 'Compare', icon: Scale },
  { href: '#weather' as const, label: 'Weather', icon: CalendarDays },
  { href: '#traveller' as const, label: 'Your style', icon: Users },
  { href: '#book' as const, label: 'Book', icon: TicketCheck },
  { href: '#questions' as const, label: 'Questions', icon: Sparkles },
];

const verdicts = [
  { label: 'Choice & connections', winner: 'Phuket', icon: Plane },
  { label: 'Slower island rhythm', winner: 'Koh Samui', icon: Palmtree },
  { label: 'Nightlife range', winner: 'Phuket', icon: MoonStar },
  { label: 'One-resort escape', winner: 'Koh Samui', icon: Waves },
];

const rows = [
  ['Arrival', 'Broader air connections and a large airport; your beach may still be a long road transfer away.', 'A compact island airport; compare the direct flight with a Surat Thani bus-and-ferry journey.', 'Phuket for route choice'],
  ['Beach rhythm', 'More distinct beach towns, each with a different level of traffic, dining and nightlife.', 'Easier to settle into one coastal base and circle the island selectively.', 'Samui for slowing down'],
  ['Evenings', 'Ranges from quiet sunset dining to the concentrated nightlife of Patong.', 'Chaweng is the main late-night centre; other bases feel noticeably calmer.', 'Phuket for range'],
  ['Food', 'Old Town adds a strong Sino-Portuguese and local southern-Thai layer to the beach-resort scene.', 'A resort-led international scene plus local markets and seafood around several coastal hubs.', 'Phuket for depth'],
  ['Day trips', 'The Andaman network: Phang Nga Bay, Phi Phi and different island routes depending on sea conditions.', 'The Gulf network: Ang Thong, Koh Phangan and Koh Tao, subject to the operating day and weather.', 'Choose by wish list'],
  ['Moving around', 'A large island where cross-island traffic can turn a loose plan into hours on the road.', 'A ring-road island, but distances and hill roads still matter when changing coasts.', 'Samui for simplicity'],
];

const profiles = [
  { eyebrow: 'First Thailand island', title: 'Lean Phuket', copy: 'Choose it when flight choice, hotel breadth, rainy-day alternatives and several different beach towns reduce planning risk.', icon: Compass },
  { eyebrow: 'Honeymoon or reset', title: 'Lean Koh Samui', copy: 'Choose it when one well-matched coastal base, a quieter evening rhythm and fewer reasons to cross the island matter most.', icon: Palmtree },
  { eyebrow: 'Family trip', title: 'Choose the base, not the brand', copy: 'A short airport transfer, gentle beach access, shade, pool design and nearby food matter more than a generic island winner.', icon: Users },
  { eyebrow: 'Active island hopping', title: 'Follow the day-trip map', copy: 'Pick Phuket for an Andaman wish list; pick Samui when Ang Thong, Koh Phangan or Koh Tao is the actual reason for travelling.', icon: Ship },
];

const weather = [
  { period: 'Jan–Mar', phuket: 'Usually the clearest shared window, with high demand.', samui: 'Usually the clearest shared window, with high demand.', cue: 'Either island' },
  { period: 'Apr–Jun', phuket: 'Heat builds and the southwest monsoon transition can change sea conditions.', samui: 'Often a useful alternative, but local showers and heat still need checking.', cue: 'Check the exact week' },
  { period: 'Jul–Sep', phuket: 'Rougher Andaman conditions are more likely; boat plans need flexibility.', samui: 'Often the more practical Gulf option during this period.', cue: 'Samui often fits better' },
  { period: 'Oct–Dec', phuket: 'Conditions generally transition toward the drier Andaman season.', samui: 'The Gulf rainy period can be more disruptive, especially around its wetter weeks.', cue: 'Phuket often fits better' },
];

const faqs = [
  { question: 'Where is nicer, Koh Samui or Phuket?', answer: 'Koh Samui usually feels nicer to travellers who want one calm coastal base and a slower resort rhythm. Phuket feels nicer when variety is the point: distinct beach towns, Old Town, more evening options and a wider day-trip menu. “Nicer” is therefore a match between your preferred daily pace and the right neighbourhood.' },
  { question: 'Is Koh Samui more expensive than Phuket?', answer: 'It can be, particularly when a direct Samui flight and a particular resort are compared with Phuket’s much larger flight and hotel markets. It is not a dependable island-wide rule. Compare the live total for your dates: flight or ferry, checked bags, airport transfer, the same hotel standard and the activities you will actually book.' },
  { question: 'Should I do Phuket or Koh Samui?', answer: 'Start with your month, then your top two experiences. Phuket is the stronger default for connections, variety and an Andaman itinerary. Koh Samui is stronger for a slower Gulf-island stay and access toward Ang Thong, Koh Phangan or Koh Tao. If weather and wish list disagree, let safety and operating conditions win.' },
  { question: 'Which is better beaches Phuket or Koh Samui?', answer: 'Phuket offers more visibly different beach towns and easier variety within one island, while Koh Samui makes it easier to commit to one resort-and-beach rhythm. Beach quality changes with coast, wind, maintenance, tide and the week you visit, so recent local conditions matter more than a permanent island ranking.' },
  { question: 'Which month to avoid Koh Samui?', answer: 'There is no month that fails every year, but the Gulf rainy period is the key risk to examine, particularly in the later part of the year. Do not book from a fixed climate slogan alone: review the Thai Meteorological Department outlook and your operator’s sea policy close to travel.' },
  { question: 'Is Koh Samui suitable for families?', answer: 'Yes, provided the chosen base fits your children and transport tolerance. Check the real airport or pier transfer, beach entry, shade, pool barriers, connecting-room policy and food access. A calm family stay in Samui can be excellent, but “family-friendly island” does not make every hotel or beach equally suitable.' },
];

const sources = [
  { title: 'Phuket destination profile', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Destinations/Provinces/phuket/350', note: 'Official destination context for Phuket’s beaches, Old Town and visitor areas.' },
  { title: 'Ko Samui destination profile', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Destinations/Provinces/Surat-Thani/358', note: 'Official province and island context for Samui and the Gulf archipelago.' },
  { title: 'Phuket International Airport', creator: 'Airports of Thailand', url: 'https://phuket.airportthai.co.th/', note: 'Primary source for live airport and passenger information.' },
  { title: 'Weather and warnings', creator: 'Thai Meteorological Department', url: 'https://www.tmd.go.th/en/', note: 'Primary source to check current forecasts and marine warnings instead of relying on a fixed monthly promise.' },
];

function schemas() {
  return [
    { '@context': 'https://schema.org', '@type': 'Article', headline: 'Phuket vs Koh Samui: which island fits your trip?', description: 'Compare Phuket and Koh Samui by weather, beaches, access, nightlife, family fit and travel style.', url: PAGE_URL, image: 'https://go2-thailand.com/images/redesign/phuket-koh-samui-comparison-hero-v2.webp', inLanguage: 'en-GB', dateModified: UPDATED_AT, author: { '@type': 'Organization', name: 'Go2Thailand' }, publisher: { '@type': 'Organization', name: 'Go2Thailand' } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://go2-thailand.com/' }, { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://go2-thailand.com/blog/' }, { '@type': 'ListItem', position: 3, name: 'Phuket vs Koh Samui', item: PAGE_URL }] },
  ];
}

export default function PhuketSamuiComparisonGuideEn() {
  const phuketHotels = withSubId(cityAffiliates.phuket?.trip || TRIP_GENERIC, 'compare-en-phuket-hotels');
  const samuiHotels = withSubId(cityAffiliates['koh-samui']?.trip || TRIP_GENERIC, 'compare-en-samui-hotels');
  const phuketTours = withSubId(cityAffiliates.phuket?.klook || KLOOK_GENERIC, 'compare-en-phuket-tours');
  const samuiTours = withSubId(cityAffiliates['koh-samui']?.klook || KLOOK_GENERIC, 'compare-en-samui-tours');
  const transport = withSubId(TWELVEGO_GENERIC, 'compare-en-phuket-samui-transport');
  return <>
    <SEOHead title="Phuket vs Koh Samui: which island fits your trip?" description="Compare Phuket and Koh Samui by weather, beaches, access, nightlife, family fit and travel style—then check current hotels, tours and transport." ogImage="https://go2-thailand.com/images/redesign/phuket-koh-samui-comparison-hero-v2.webp">
      {schemas().map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
    </SEOHead>
    <main className="bg-canvas text-charcoal" data-premium-template="island-comparison">
      <EditorialHero image="/images/redesign/phuket-koh-samui-comparison-hero-v2.webp" imageAlt="Tropical Andaman limestone coast blending into a calm palm-lined Gulf beach" breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Island guides', href: '/islands/' }, { label: 'Phuket vs Koh Samui' }]} eyebrow="Two coasts · one honest choice" title={<>Phuket <span className="text-saffron-dark">or</span>{' '}<br />Koh Samui?</>} subtitle="Choose by month and travel rhythm—not by one perfect beach photo." description="Phuket gives you more connections, districts and moving parts. Koh Samui rewards a slower island base. This comparison shows the trade-offs, then sends you to live prices instead of pretending one dated number fits every trip." actions={[{ label: 'See the verdict', href: '#verdict', kind: 'primary' }, { label: 'Compare side by side', href: '#compare', kind: 'secondary' }]} minHeightClassName="min-h-[720px] lg:min-h-[690px]" titleClassName="max-w-[720px] text-[4.2rem] leading-[0.86] sm:text-[5.6rem] lg:text-[6.8rem]" contentClassName="max-w-[710px]" imageClassName="object-cover object-[58%_center]" gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.05)_0%,rgba(252,250,246,0.82)_62%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.98)_0%,rgba(252,250,246,0.83)_38%,rgba(252,250,246,0.10)_64%,rgba(8,47,41,0.04)_100%)]" />
      <PageSectionNav items={navItems} />

      <section id="verdict" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"><div className="container-custom grid gap-11 lg:grid-cols-[0.7fr_1.3fr]">
        <SectionHeading eyebrow="The 60-second answer" title={<>The winner changes<br />with your trip.</>} description="Month comes first. Then choose between a high-choice island and a slower, more contained base." />
        <div><div className="grid gap-3 sm:grid-cols-2">{verdicts.map(({label,winner,icon:Icon}) => <article key={label} className="flex items-center gap-4 rounded-2xl border border-jade/10 bg-white p-5 shadow-editorial-card"><span className="grid h-11 w-11 place-items-center rounded-xl bg-tonal text-jade"><Icon size={20}/></span><div><p className="text-[9px] font-extrabold uppercase tracking-[.13em] text-charcoal/45">{label}</p><p className="mt-1 font-display text-[1.45rem] font-semibold text-jade">{winner}</p></div></article>)}</div>
        <aside className="relative mt-6 overflow-hidden rounded-2xl bg-jade p-7 text-white shadow-editorial-lift sm:p-9"><div className="absolute -right-14 -top-14 h-44 w-44 rounded-full border border-dashed border-saffron/45"/><Sparkles className="text-saffron"/><h2 className="mt-5 font-display text-[2.2rem] font-semibold leading-none">Our editorial rule</h2><p className="mt-4 text-sm leading-7 text-white/74">Choose <strong className="text-white">Phuket</strong> when route choice, different beach districts, Old Town and flexible evenings are part of the holiday. Choose <strong className="text-white">Koh Samui</strong> when the goal is one good coastal base and a calmer Gulf-island rhythm. If the weather window strongly favours one coast, let that override the mood board.</p></aside></div>
      </div></section>

      <section id="compare" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20"><div className="container-custom"><SectionHeading eyebrow="Side by side" title="What changes on the ground" description="Every advantage has a cost: more choice usually means more transport and decisions; a calmer base usually means fewer backups."/><div className="mt-9 overflow-x-auto rounded-2xl border border-jade/10 bg-white shadow-editorial-card"><table className="w-full min-w-[940px] border-collapse text-left"><thead><tr className="bg-jade text-white"><th className="px-6 py-5 text-[10px] uppercase tracking-[.14em]">Factor</th><th className="px-6 py-5 font-display text-2xl">Phuket</th><th className="px-6 py-5 font-display text-2xl">Koh Samui</th><th className="px-6 py-5 text-[10px] uppercase tracking-[.14em] text-saffron">Cue</th></tr></thead><tbody className="divide-y divide-jade/10">{rows.map(([factor,phuket,samui,cue],index)=><tr key={factor} className={index%2?'bg-canvas/55':'bg-white'}><th className="px-6 py-6 text-sm text-jade">{factor}</th><td className="px-6 py-6 text-xs leading-6 text-charcoal/65">{phuket}</td><td className="px-6 py-6 text-xs leading-6 text-charcoal/65">{samui}</td><td className="px-6 py-6"><span className="rounded-full bg-tonal px-3 py-2 text-[10px] font-extrabold text-jade">{cue}</span></td></tr>)}</tbody></table></div></div></section>

      <section id="weather" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"><div className="container-custom grid gap-10 lg:grid-cols-[0.68fr_1.32fr]"><SectionHeading eyebrow="The coast decides" title={<>Weather is not<br />a footnote.</>} description="Phuket faces the Andaman Sea; Samui sits in the Gulf. Use these broad planning bands, then verify the live forecast and marine warning."/><div className="grid gap-3">{weather.map((item,index)=><article key={item.period} className={`grid gap-4 rounded-2xl border p-5 sm:grid-cols-[110px_1fr_1fr_150px] sm:items-center ${index===2||index===3?'border-saffron/30 bg-white shadow-editorial-card':'border-jade/10 bg-canvas'}`}><strong className="font-display text-xl text-jade">{item.period}</strong><p className="text-[11px] leading-5 text-charcoal/62"><span className="font-extrabold text-jade">Phuket · </span>{item.phuket}</p><p className="text-[11px] leading-5 text-charcoal/62"><span className="font-extrabold text-jade">Samui · </span>{item.samui}</p><span className="text-[9px] font-extrabold uppercase tracking-[.11em] text-saffron-dark">{item.cue}</span></article>)}</div></div></section>

      <section id="traveller" className="section-divider-bottom scroll-mt-24 bg-mist py-14 lg:py-20"><div className="container-custom"><SectionHeading eyebrow="Choose your travel style" title="Which island fits whom?" description="The island name is only the first decision. Your actual beach district, transfer and hotel shape the daily experience."/><div className="mt-9 grid gap-5 md:grid-cols-2">{profiles.map(({eyebrow,title,copy,icon:Icon},index)=><article key={eyebrow} className="relative overflow-hidden rounded-2xl border border-jade/10 bg-white p-7 shadow-editorial-card"><span className="grid h-13 w-13 place-items-center rounded-xl bg-tonal text-jade"><Icon size={22}/></span><p className="mt-6 text-[9px] font-extrabold uppercase tracking-[.14em] text-saffron-dark">{eyebrow}</p><h3 className="mt-2 font-display text-[2rem] font-semibold leading-none text-jade">{title}</h3><p className="mt-4 max-w-xl text-sm leading-7 text-charcoal/65">{copy}</p><span className="absolute bottom-5 right-6 font-display text-5xl text-jade/8">0{index+1}</span></article>)}</div></div></section>

      <section className="section-divider-bottom py-14 lg:py-20"><div className="container-custom"><div className="relative overflow-hidden rounded-[28px] bg-jade text-white shadow-editorial-lift"><Image src="/images/redesign/koh-samui-ang-thong.webp" alt="Gulf island route from Koh Samui" fill sizes="100vw" className="object-cover opacity-30"/><div className="absolute inset-0 bg-gradient-to-r from-jade via-jade/92 to-jade/45"/><div className="relative grid min-h-[390px] items-center gap-8 px-7 py-10 sm:px-10 lg:grid-cols-[.85fr_1.15fr] lg:px-14"><div><p className="eyebrow text-saffron">A route, not a rivalry</p><h2 className="font-display text-[3.2rem] font-semibold leading-[.9]">Can you combine them?</h2><p className="mt-5 text-sm leading-7 text-white/72">Yes, but this is a meaningful cross-country transfer rather than a casual island hop. Compare a flight with the overland-and-ferry journey and count the full hotel-to-hotel day.</p><a href={transport} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-cream mt-7 min-h-12 px-6 text-saffron-dark">Check current transport <ExternalLink size={15}/></a></div><div className="relative min-h-[220px]"><div className="absolute left-[15%] right-[15%] top-1/2 border-t-2 border-dashed border-saffron/70"/><Plane className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-jade p-2 text-saffron" size={44}/><div className="relative flex h-full min-h-[200px] items-center justify-between"><div className="rounded-2xl bg-white p-5 text-jade"><MapPin className="text-saffron-dark"/><strong className="mt-3 block font-display text-2xl">Phuket</strong><span className="text-[10px] text-charcoal/55">Andaman coast</span></div><div className="rounded-2xl bg-tonal p-5 text-jade"><MapPin className="text-saffron-dark"/><strong className="mt-3 block font-display text-2xl">Koh Samui</strong><span className="text-[10px] text-charcoal/55">Gulf coast</span></div></div></div></div></div></div></section>

      <section id="book" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20"><div className="container-custom"><SectionHeading eyebrow="After the decision" title="Check the current fit" description="No frozen nightly rates. Open your dates, compare the same room terms and verify what the tour or transfer actually includes."/><div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{[
        ['Phuket hotels','Compare the district before the room. Transfer time can erase a cheap-looking rate.',phuketHotels,BedDouble],['Koh Samui hotels','Compare beach access, airport or pier transfer and the evening rhythm around the property.',samuiHotels,Palmtree],['Phuket experiences','Check pier, pickup zone, vessel, group size and weather policy before paying.',phuketTours,Ship],['Koh Samui experiences','Compare Ang Thong and Gulf routes by operating day, pickup and cancellation terms.',samuiTours,Waves],
      ].map(([title,copy,href,Icon])=>{const I=Icon as typeof BedDouble;return <article key={String(title)} className="flex min-h-[300px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><I className="text-jade"/><h3 className="mt-6 font-display text-[1.7rem] font-semibold text-jade">{String(title)}</h3><p className="mt-4 flex-1 text-xs leading-6 text-charcoal/62">{String(copy)}</p><a href={String(href)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-jade">Check current options <ArrowRight size={14} className="text-saffron"/></a></article>})}</div><AffiliateDisclosure className="mt-4">Affiliate links to Trip.com and Klook. Go2Thailand may earn a commission without increasing your price. The provider controls live availability, price and terms.</AffiliateDisclosure></div></section>

      <FaqSplitSection eyebrow="Real search questions" title="Phuket vs Koh Samui FAQs" description="These questions were returned verbatim in the UK Google People Also Ask results captured through DataForSEO on 27 July 2026." items={faqs}/>
      <RelatedGuidesSection title="Plan the island you chose" guides={[{title:'Phuket travel guide',description:'Build the island by district, transport, food and realistic day clusters.',href:'/city/phuket/',image:'/images/redesign/phuket-destination-hero-v2.webp',imageAlt:'Phuket coast and long-tail boat'},{title:'Koh Samui travel guide',description:'Choose a coast, understand the island rhythm and plan Gulf day trips.',href:'/city/koh-samui/',image:'/images/redesign/koh-samui-destination-hero.webp',imageAlt:'Koh Samui tropical coast'},{title:'Thailand islands',description:'Compare more Thai islands before locking the owner route.',href:'/islands/',image:'/images/islands/koh-samui.webp',imageAlt:'Palm-lined Thai island beach'}]} sideLink={{label:'Browse Thailand experiences',href:withSubId(KLOOK_GENERIC,'compare-en-related'),affiliate:true}} disclosure="The Klook link is an affiliate link. Editorial order is not paid placement."/>
      <SourceMethodSection title="How this comparison was made" description="The English owner, ranking footprint, keyword cluster, competitor field and exact People Also Ask questions were researched with DataForSEO for the United Kingdom on 27 July 2026. Destination, airport and weather guidance is checked against primary Thai sources. We avoid static trip prices and direct readers to current provider results." sources={sources}/>
    </main>
  </>;
}
