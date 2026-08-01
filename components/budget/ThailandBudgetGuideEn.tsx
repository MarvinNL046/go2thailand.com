import { useMemo, useState } from 'react';
import Image from 'next/image';
import {
  BedDouble,
  Calculator,
  Check,
  Coins,
  CreditCard,
  ExternalLink,
  Landmark,
  MapPinned,
  ReceiptText,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  TicketCheck,
  TrainFront,
  Utensils,
} from 'lucide-react';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';
import { KLOOK_GENERIC, TRIP_GENERIC, TWELVEGO_GENERIC, withPlacementSubId } from '../../lib/affiliates';

type StyleKey = 'lean' | 'balanced' | 'comfort';
type RouteKey = 'mainland' | 'mixed' | 'islands';
type CostKey = 'stay' | 'food' | 'local' | 'experiences';

interface PlanningBand {
  label: string;
  summary: string;
  stay: [number, number];
  food: [number, number];
  local: [number, number];
  experiences: [number, number];
  intercity: [number, number];
}

const planningBands: Record<StyleKey, PlanningBand> = {
  lean: {
    label: 'Lean',
    summary: 'Hostel or simple room, local food, public transport and selective paid days.',
    stay: [12, 24], food: [9, 17], local: [4, 9], experiences: [5, 13], intercity: [65, 145],
  },
  balanced: {
    label: 'Balanced',
    summary: 'Private room, mixed dining, convenient transport and several considered experiences.',
    stay: [28, 58], food: [16, 30], local: [8, 16], experiences: [13, 29], intercity: [145, 310],
  },
  comfort: {
    label: 'Comfort',
    summary: 'Stronger hotel location, flexible transport and room for premium experience days.',
    stay: [78, 150], food: [32, 62], local: [18, 38], experiences: [34, 76], intercity: [290, 680],
  },
};

const routeFactors: Record<RouteKey, { label: string; factor: number; note: string }> = {
  mainland: { label: 'Mostly mainland', factor: 1, note: 'Longer stays in Bangkok, the north or smaller mainland cities.' },
  mixed: { label: 'City + north + coast', factor: 1.1, note: 'A first-trip mix with several long-distance transfers.' },
  islands: { label: 'Island focused', factor: 1.23, note: 'More boat logistics and greater exposure to high-demand coastal locations.' },
};

const costCategories: Array<{ key: CostKey; label: string; icon: typeof BedDouble; copy: string; control: string }> = [
  { key: 'stay', label: 'Accommodation', icon: BedDouble, copy: 'Area, dates and cancellation terms often matter more than the star rating.', control: 'Compare the same neighbourhood and dates before comparing discounts.' },
  { key: 'food', label: 'Food & drink', icon: Utensils, copy: 'Local meals keep the base flexible; drinks and prime beachfront locations accumulate faster.', control: 'Plan your normal eating rhythm and treat rooftop or beach-club days separately.' },
  { key: 'local', label: 'Local transport', icon: TrainFront, copy: 'Small taxi fares become a leak when the hotel base creates repeated journeys.', control: 'A better-located room can cost less than daily transfers in the end.' },
  { key: 'experiences', label: 'Experiences', icon: Sparkles, copy: 'Boat days, private transfers and small groups vary widely in scope and conditions.', control: 'Compare inclusions, entrance fees, pickup zone and cancellation terms.' },
];

const faqs = [
  { question: 'How much does a Thailand trip cost?', answer: 'There is no single honest total without dates, route and travel style. Start with an in-country daily planning band, add long-distance transfers and a buffer, then check real hotel, transport and activity quotes. The calculator above does that without pretending international flights or exchange rates are fixed.' },
  { question: 'How much money do I need for 2 weeks in Thailand?', answer: 'Set the calculator to 14 days and select the route and comfort level that match your trip. A two-week island-heavy itinerary normally needs more room than a slower mainland route because ferries, transfers and high-demand beach locations compound. The result excludes international flights and should be replaced with live quotes before booking.' },
  { question: 'How much money should I bring to Thailand for 7 days?', answer: 'Do not carry the entire seven-day budget as cash. Calculate accommodation, transport and booked experiences separately, then carry a practical cash float for markets, small restaurants and local transport. Keep cards and cash in separate places and replenish carefully.' },
  { question: 'Is $100 a day enough for Thailand?', answer: 'For many independent travellers, the equivalent of US$100 per person per day can support a balanced in-country trip. It becomes tighter with single-occupancy resort rooms, frequent flights, private tours or premium island locations. Treat the number as a planning ceiling or midpoint, not a universal promise.' },
  { question: 'Is £500 enough for 2 weeks in Thailand?', answer: '£500 is a demanding in-country budget once accommodation, long transfers and activities are included. It may work for a very lean, slow mainland trip with shared or simple rooms, but it leaves little resilience. Use the 14-day calculator, check your actual accommodation first and keep an emergency buffer outside the spending target.' },
  { question: 'Is Thailand cheap for UK tourists?', answer: 'Thailand can offer strong value for UK travellers, especially with a slower mainland route and local eating pattern. It is not uniformly cheap: exchange rates move, island logistics cost more, and popular dates can change accommodation prices sharply. Compare current quotes in Thai baht instead of relying on an old GBP conversion.' },
  { question: 'Is food and drink cheap in Thailand?', answer: 'Local Thai food can occupy a modest part of a daily budget, while imported food, alcohol, speciality coffee and prime tourist locations can change the total quickly. One universal meal price is misleading; use a daily category band and check the menu before ordering.' },
  { question: 'What is a realistic budget for Thailand?', answer: 'A realistic budget matches your route, room occupancy and paid-experience rhythm. Separate accommodation, food, local transport, experiences and intercity travel, then add at least a planning buffer. The balanced calculator preset is a useful first draft for travellers who want a private room without treating every day as premium.' },
  { question: 'How much cash should I take into Thailand?', answer: 'Carry enough for the next part of the trip, not your full holiday budget. Cash remains useful for markets and small operators, while cards provide a second payment route. Use bank-based ATMs, protect your PIN and check the current Thai Customs declaration rules if travelling with unusually large sums.' },
];

const sectionNav = [
  { href: '#calculator' as const, label: 'Calculator', icon: Calculator },
  { href: '#breakdown' as const, label: 'Breakdown', icon: ReceiptText },
  { href: '#route' as const, label: 'Route', icon: MapPinned },
  { href: '#leaks' as const, label: 'Budget leaks', icon: Coins },
  { href: '#check-prices' as const, label: 'Check prices', icon: TicketCheck },
  { href: '#questions' as const, label: 'Questions', icon: ShieldCheck },
];

const pounds = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 });
const roundFive = (value: number) => Math.round(value / 5) * 5;

export default function ThailandBudgetGuideEn() {
  const [days, setDays] = useState(14);
  const [travellers, setTravellers] = useState(2);
  const [style, setStyle] = useState<StyleKey>('balanced');
  const [route, setRoute] = useState<RouteKey>('mixed');
  const band = planningBands[style];
  const routeChoice = routeFactors[route];

  const calculation = useMemo(() => {
    const dailyMin = (band.stay[0] + band.food[0] + band.local[0] + band.experiences[0]) * routeChoice.factor;
    const dailyMax = (band.stay[1] + band.food[1] + band.local[1] + band.experiences[1]) * routeChoice.factor;
    const tripMin = (dailyMin * days + band.intercity[0] * routeChoice.factor) * travellers;
    const tripMax = (dailyMax * days + band.intercity[1] * routeChoice.factor) * travellers;
    const midpoint = {
      stay: ((band.stay[0] + band.stay[1]) / 2) * routeChoice.factor,
      food: ((band.food[0] + band.food[1]) / 2) * routeChoice.factor,
      local: ((band.local[0] + band.local[1]) / 2) * routeChoice.factor,
      experiences: ((band.experiences[0] + band.experiences[1]) / 2) * routeChoice.factor,
    };
    const midpointTotal = Object.values(midpoint).reduce((sum, value) => sum + value, 0);
    return {
      perDay: [roundFive(dailyMin), roundFive(dailyMax)] as [number, number],
      trip: [roundFive(tripMin * 1.1), roundFive(tripMax * 1.1)] as [number, number],
      shares: Object.fromEntries(Object.entries(midpoint).map(([key, value]) => [key, Math.round((value / midpointTotal) * 100)])) as Record<CostKey, number>,
    };
  }, [band, days, routeChoice.factor, travellers]);

  const placement = 'en-thailand-budget';
  const hotelHref = withPlacementSubId(TRIP_GENERIC, placement, 'hotels');
  const transportHref = withPlacementSubId(TWELVEGO_GENERIC, placement, 'transport');
  const activityHref = withPlacementSubId(KLOOK_GENERIC, placement, 'activities');
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) };
  const webPageSchema = { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Thailand travel cost and budget planner', description: 'Interactive Thailand trip-cost calculator with planning bands by travel style, duration and route.', url: 'https://go2-thailand.com/thailand-index/budget/', inLanguage: 'en-GB', dateModified: '2026-07-27' };
  const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://go2-thailand.com/' }, { '@type': 'ListItem', position: 2, name: 'Thailand budget', item: 'https://go2-thailand.com/thailand-index/budget/' }] };

  return (
    <>
      <SEOHead title="Thailand Travel Cost: Build Your Trip Budget | Go2Thailand" description="Estimate your Thailand travel cost for 7 days, 2 weeks or longer. Compare travel styles, route choices and current hotel, transport and activity quotes." ogImage="https://go2-thailand.com/images/redesign/thailand-budget-hero.webp">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </SEOHead>

      <div className="bg-canvas text-charcoal" data-premium-template="thailand-budget-en">
        <EditorialHero
          image="/images/redesign/thailand-budget-hero.webp"
          imageAlt="Thai food, transport and a travel notebook beside a river as parts of a Thailand trip budget"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Budget & costs' }]}
          breadcrumbAriaLabel="Breadcrumb"
          eyebrow="Build a plan, not a magic number"
          title={<>What does<br /><span className="text-saffron-dark">Thailand cost?</span></>}
          subtitle="Your hotel base, route and coast choice matter more than the price of one pad thai."
          description="Create a realistic in-country budget for your dates, group and travel style. The result is a working range with a buffer—not a fake live price that is out of date tomorrow."
          actions={[{ label: 'Calculate your trip', href: '#calculator', kind: 'primary' }, { label: 'See what drives the cost', href: '#breakdown', kind: 'secondary' }]}
          minHeightClassName="min-h-[720px] lg:min-h-[700px]"
          titleClassName="max-w-[720px] text-[4rem] leading-[0.84] sm:text-[5.2rem] lg:text-[6rem]"
          imageClassName="object-cover object-[70%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(250,247,240,0.05)_0%,rgba(250,247,240,0.42)_46%,rgba(250,247,240,0.98)_100%)] lg:bg-[linear-gradient(90deg,rgba(250,247,240,0.97)_0%,rgba(250,247,240,0.9)_39%,rgba(250,247,240,0.08)_63%,rgba(4,42,34,0.05)_100%)]"
          sideCard={<div className="absolute bottom-8 right-[max(2rem,calc((100vw-1280px)/2))] z-10 hidden w-[306px] rounded-2xl border border-white/30 bg-jade/82 p-5 text-white shadow-editorial-card backdrop-blur-lg xl:block"><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">The short answer</p><p className="mt-3 font-display text-2xl font-semibold leading-tight">Thailand can be good value. A restless route rarely is.</p><div className="mt-4 flex items-center gap-3 border-t border-white/12 pt-4 text-[10px] font-semibold text-white/58"><ReceiptText size={16} className="text-saffron-light" />Separate stays, movement and experience days.</div></div>}
        />

        <PageSectionNav label="On this page" items={sectionNav} />

        <section className="section-divider-bottom py-14 lg:py-20">
          <div className="container-custom grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <SectionHeading eyebrow="The honest answer" title="Affordable is not the same as cheap." description="Thailand gives you room to choose, but popular coasts, short stays and frequent transfers can absorb that room quickly." />
            <div className="grid gap-4 sm:grid-cols-3">
              {(Object.keys(planningBands) as StyleKey[]).map((key) => {
                const item = planningBands[key];
                const min = item.stay[0] + item.food[0] + item.local[0] + item.experiences[0];
                const max = item.stay[1] + item.food[1] + item.local[1] + item.experiences[1];
                return <article key={key} className={`rounded-2xl border p-5 ${key === 'balanced' ? 'border-saffron/35 bg-jade text-white shadow-editorial-lift' : 'border-jade/10 bg-white shadow-editorial-card'}`}><p className={`text-[9px] font-extrabold uppercase tracking-[0.13em] ${key === 'balanced' ? 'text-saffron-light' : 'text-saffron-dark'}`}>{item.label}</p><strong className={`mt-3 block font-display text-3xl font-semibold ${key === 'balanced' ? 'text-white' : 'text-jade'}`}>{pounds.format(min)}–{pounds.format(max)}</strong><span className={`text-[10px] font-bold ${key === 'balanced' ? 'text-white/55' : 'text-charcoal/48'}`}>per person per day · planning band</span><p className={`mt-4 text-xs font-medium leading-5 ${key === 'balanced' ? 'text-white/65' : 'text-charcoal/62'}`}>{item.summary}</p></article>;
              })}
            </div>
          </div>
        </section>

        <section id="calculator" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading eyebrow="Interactive trip-cost planner" title="What might your Thailand trip cost?" description="Choose duration, group size, comfort and route. The result includes a 10% buffer but excludes international flights. Replace the assumptions with real quotes before you book." />
            <div className="mt-10 overflow-hidden rounded-[28px] border border-jade/10 bg-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[0.94fr_1.06fr]">
                <div className="p-6 sm:p-9">
                  <fieldset><legend className="text-xs font-extrabold text-jade">How long are you travelling?</legend><div className="mt-3 grid grid-cols-4 gap-2">{[7, 10, 14, 21].map((value) => <button key={value} type="button" aria-pressed={days === value} onClick={() => setDays(value)} className={`min-h-12 rounded-xl border text-xs font-extrabold transition ${days === value ? 'border-jade bg-jade text-white' : 'border-jade/12 bg-canvas text-jade hover:border-saffron/45'}`}>{value} d</button>)}</div></fieldset>
                  <fieldset className="mt-7"><legend className="text-xs font-extrabold text-jade">How many travellers?</legend><div className="mt-3 grid grid-cols-4 gap-2">{[1, 2, 3, 4].map((value) => <button key={value} type="button" aria-pressed={travellers === value} onClick={() => setTravellers(value)} className={`min-h-12 rounded-xl border text-xs font-extrabold transition ${travellers === value ? 'border-jade bg-jade text-white' : 'border-jade/12 bg-canvas text-jade hover:border-saffron/45'}`}>{value}</button>)}</div></fieldset>
                  <fieldset className="mt-7"><legend className="text-xs font-extrabold text-jade">Which travel style fits?</legend><div className="mt-3 grid gap-2 sm:grid-cols-3">{(Object.keys(planningBands) as StyleKey[]).map((key) => <button key={key} type="button" aria-pressed={style === key} onClick={() => setStyle(key)} className={`rounded-xl border p-4 text-left transition ${style === key ? 'border-saffron bg-saffron/10' : 'border-jade/10 bg-canvas hover:border-saffron/35'}`}><strong className="block text-xs text-jade">{planningBands[key].label}</strong><span className="mt-1 block text-[10px] leading-4 text-charcoal/52">{key === 'lean' ? 'simple & selective' : key === 'balanced' ? 'comfort with choices' : 'flexibility & premium'}</span></button>)}</div></fieldset>
                  <fieldset className="mt-7"><legend className="text-xs font-extrabold text-jade">What shape is the route?</legend><div className="mt-3 grid gap-2 sm:grid-cols-3">{(Object.keys(routeFactors) as RouteKey[]).map((key) => <button key={key} type="button" aria-pressed={route === key} onClick={() => setRoute(key)} className={`rounded-xl border p-4 text-left transition ${route === key ? 'border-saffron bg-saffron/10' : 'border-jade/10 bg-canvas hover:border-saffron/35'}`}><strong className="block text-xs text-jade">{routeFactors[key].label}</strong></button>)}</div><p className="mt-3 text-[10px] font-medium leading-4 text-charcoal/48">{routeChoice.note}</p></fieldset>
                </div>
                <div className="bg-jade p-7 text-white sm:p-10" aria-live="polite">
                  <p className="eyebrow !text-saffron-light">Your working range</p>
                  <h2 className="font-display text-[3.7rem] font-semibold leading-[0.84] tracking-[-0.04em]">{pounds.format(calculation.trip[0])}<br /><span className="text-saffron-light">to {pounds.format(calculation.trip[1])}</span></h2>
                  <p className="mt-4 text-sm font-medium leading-6 text-white/66">For {travellers} {travellers === 1 ? 'traveller' : 'travellers'} · {days} days · {band.label.toLowerCase()} · including a 10% buffer.</p>
                  <div className="mt-7 rounded-2xl border border-white/12 bg-white/[0.06] p-5"><div className="flex items-end justify-between gap-4"><div><span className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-white/45">Per person per day</span><strong className="mt-1 block font-display text-3xl text-white">{pounds.format(calculation.perDay[0])}–{pounds.format(calculation.perDay[1])}</strong></div><Calculator size={24} className="text-saffron-light" /></div></div>
                  <div className="mt-7 space-y-4">{costCategories.map((category) => { const Icon = category.icon; const share = calculation.shares[category.key]; return <div key={category.key}><div className="mb-2 flex items-center justify-between text-[10px] font-bold"><span className="flex items-center gap-2 text-white/70"><Icon size={14} className="text-saffron-light" />{category.label}</span><span>{share}%</span></div><div className="h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-saffron" style={{ width: `${share}%` }} /></div></div>; })}</div>
                  <p className="mt-7 border-t border-white/12 pt-5 text-[10px] font-medium leading-5 text-white/46">Model: category bands × route factor + an intercity band + 10% buffer. This is not a quote, exchange rate or price guarantee. Dates, location, room occupancy and provider terms change the result.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="breakdown" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading eyebrow="Four controls shape the result" title="Where does the money actually go?" description="The cheapest lunch cannot offset a badly placed hotel or six avoidable taxi journeys. Control the large patterns first." />
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{costCategories.map((category, index) => { const Icon = category.icon; return <article key={category.key} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/30 bg-canvas text-jade"><Icon size={20} /></span><span className="font-display text-4xl font-semibold text-jade/10">0{index + 1}</span></div><h2 className="mt-5 font-display text-[1.9rem] font-semibold text-jade">{category.label}</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/62">{category.copy}</p><p className="mt-5 border-t border-jade/10 pt-4 text-[10px] font-bold leading-4 text-saffron-dark">{category.control}</p></article>; })}</div>
          </div>
        </section>

        <section id="route" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading eyebrow="Same comfort, different cost pressure" title="Your route is a budget decision too." description="A longer northern base behaves differently from short island stops. Compare accommodation, movement and experience days together—not one isolated room price." />
            <div className="relative mt-10 min-h-[600px] overflow-hidden rounded-[30px] shadow-editorial-lift"><Image src="/images/redesign/thailand-budget-regions.webp" alt="Bangkok, northern Thailand and the southern coast connected as three budget regions" fill sizes="100vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-jade/95 via-jade/14 to-transparent" /><div className="absolute inset-x-5 bottom-5 grid gap-3 md:inset-x-8 md:bottom-8 md:grid-cols-3">{[['Bangkok', 'More choice, but your hotel location decides how much local transport you keep buying.'], ['Northern Thailand', 'Longer stays and a local eating rhythm often create more room in the plan.'], ['Coast & islands', 'Boat logistics, beachfront location and season make the same comfort choice more sensitive.']].map(([title, text]) => <article key={title} className="rounded-2xl border border-white/18 bg-jade/75 p-5 text-white backdrop-blur-md"><h2 className="font-display text-2xl font-semibold">{title}</h2><p className="mt-3 text-xs font-medium leading-5 text-white/64">{text}</p></article>)}</div></div>
          </div>
        </section>

        <section id="leaks" className="section-divider-bottom scroll-mt-24 bg-mist py-16 lg:py-24">
          <div className="container-custom overflow-hidden rounded-[30px] bg-white shadow-editorial-lift">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]"><div className="relative min-h-[480px]"><Image src="/images/redesign/thailand-budget-leaks.webp" alt="Hotel key, ferry ticket, taxi, drink and sunscreen as hidden Thailand travel costs" fill sizes="(max-width: 1024px) 100vw, 52vw" className="object-cover" /></div><div className="bg-jade p-7 text-white sm:p-10 lg:p-12"><p className="eyebrow !text-saffron-light">Where small amounts become large</p><h2 className="font-display text-[3.5rem] font-semibold leading-[0.86] tracking-[-0.035em]">Five leaks that never feel like a big purchase.</h2><div className="mt-7 space-y-3">{[['Short stays', 'Every move adds transport, waiting time and often a more expensive arrival choice.'], ['The wrong hotel base', 'A cheaper room can create paid journeys every day.'], ['Missing inclusions', 'Entrance, transfer, equipment and lunch vary between activities.'], ['Drinks in prime locations', 'Alcohol and beachfront service expand the food category quietly.'], ['No buffer', 'Weather, a missed connection or a change then becomes an immediate problem.']].map(([title, text]) => <article key={title} className="flex gap-3 border-b border-white/10 pb-3"><Check size={15} className="mt-1 shrink-0 text-saffron-light" /><div><h3 className="text-xs font-extrabold">{title}</h3><p className="mt-1 text-[10px] font-medium leading-4 text-white/55">{text}</p></div></article>)}</div></div></div>
          </div>
        </section>

        <section className="section-divider-bottom py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.68fr_1.32fr]">
            <SectionHeading eyebrow="Cash, cards and exchange rates" title="Pay smart without carrying your trip like a bank vault." description="A considered payment mix prevents one lost card or poor conversion choice from controlling the rest of the trip." />
            <div className="grid gap-4 sm:grid-cols-3">{[
              { icon: Coins, title: 'Cash for the small', text: 'Markets, small food businesses and local transport may still require cash. Carry the next useful amount, not the whole holiday budget.' },
              { icon: CreditCard, title: 'A second payment rail', text: 'Keep payment methods apart. Before departure, check your own bank’s limits, blocks and overseas fees.' },
              { icon: Landmark, title: 'Think in THB', text: 'When a terminal offers a home-currency conversion, compare the rate and fees first. The convenient option is not automatically the better one.' },
            ].map((item) => { const Icon = item.icon; return <article key={item.title} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/30 bg-canvas text-jade"><Icon size={20} /></span><h2 className="mt-5 font-display text-2xl font-semibold text-jade">{item.title}</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/60">{item.text}</p></article>; })}</div>
          </div>
        </section>

        <section id="check-prices" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end"><SectionHeading eyebrow="Replace assumptions with real quotes" title="Check the three biggest variables." description="Use the calculator for direction. Then open your actual travel dates and record the total, cancellation terms and inclusions." /><div className="flex flex-wrap gap-2 lg:justify-end"><span className="rounded-full border border-jade/12 bg-white px-4 py-2 text-[10px] font-bold text-jade">room total</span><span className="rounded-full border border-jade/12 bg-white px-4 py-2 text-[10px] font-bold text-jade">long transfers</span><span className="rounded-full border border-jade/12 bg-white px-4 py-2 text-[10px] font-bold text-jade">major experiences</span></div></div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">{[
              { icon: BedDouble, eyebrow: 'Stay', title: 'Trip.com', text: 'Compare the same area, dates, room type and cancellation conditions.', href: hotelHref, label: 'Check current hotel prices' },
              { icon: TrainFront, eyebrow: 'Move', title: '12Go', text: 'Check operator, terminal, luggage and connection time for each route.', href: transportHref, label: 'Check current transport prices' },
              { icon: ShoppingBag, eyebrow: 'Experience', title: 'Klook', text: 'Compare inclusions, pickup zone and the conditions of the specific activity.', href: activityHref, label: 'Check current activity prices' },
            ].map((item) => { const Icon = item.icon; return <article key={item.title} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/30 bg-canvas text-jade"><Icon size={20} /></span><span className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{item.eyebrow}</span></div><h2 className="mt-5 font-display text-3xl font-semibold text-jade">{item.title}</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/60">{item.text}</p><a href={item.href} target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-jade">{item.label} <ExternalLink size={13} className="text-saffron" /></a></article>; })}</div>
            <AffiliateDisclosure className="mt-3">These three external buttons are affiliate links. Go2Thailand may earn a commission without increasing your price. The calculator does not ingest partner prices; current availability, total price and conditions remain with the provider.</AffiliateDisclosure>
          </div>
        </section>

        <FaqSplitSection id="questions" eyebrow="Real UK search questions" title="Thailand travel-cost questions" description="These questions were deduplicated from ten live DataForSEO UK SERPs. The answers use planning rules rather than passing an old exchange rate off as a live price." items={faqs} />

        <RelatedGuidesSection eyebrow="From cost to route" title="Plan the rest in the right order" readLabel="Read the guide" guides={[
          { title: 'Thailand itinerary', description: 'Fewer moving days can also mean fewer hidden costs.', href: '/thailand-itinerary/', image: '/images/redesign/thailand-route-hero.webp', imageAlt: 'A route through Thailand from city to coast' },
          { title: 'Transport in Thailand', description: 'Compare train, bus, ferry and flight for each long journey.', href: '/transport/', image: '/images/redesign/transport-thailand-hero.webp', imageAlt: 'Transport through Thailand' },
          { title: 'Thailand packing list', description: 'Pack what you need and avoid rushed or duplicate purchases.', href: '/travel-gear/', image: '/images/redesign/travel-gear-hero.webp', imageAlt: 'Compact luggage for Thailand' },
        ]} />

        <SourceMethodSection eyebrow="Sources & method" title="Why we do not pretend these are live prices" description="Keywords, competitors and exact PAA questions were captured through DataForSEO for the UK on 27 July 2026. The calculator uses transparent editorial scenarios, not an exchange-rate or provider-price feed. Recheck your dates, room occupancy and route before booking." sources={[
          { title: 'Daily Foreign Exchange Rates', creator: 'Bank of Thailand', url: 'https://www.bot.or.th/en/statistics/exchange-rate.html', note: 'Primary reference for checking current baht exchange-rate data; the calculator deliberately keeps a broad GBP planning range instead of claiming a live conversion.' },
          { title: 'Thailand safety and security', creator: 'UK Foreign, Commonwealth & Development Office', url: 'https://www.gov.uk/foreign-travel-advice/thailand/safety-and-security', note: 'Current UK guidance used for bank-card and ATM-fraud safeguards.' },
          { title: 'Currency Declaration System', creator: 'Thai Customs Department', url: 'https://icds.customs.go.th/', note: 'Official declaration rules for travellers carrying unusually large amounts of Thai or foreign currency.' },
          { title: 'Official D-Ticket', creator: 'State Railway of Thailand', url: 'https://www.dticket.railway.co.th/DTicketPublicWeb/home/Home', note: 'Primary route for checking current reservable train options and conditions on a specific date.' },
        ]} />
      </div>
    </>
  );
}
