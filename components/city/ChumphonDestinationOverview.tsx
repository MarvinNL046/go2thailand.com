import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  CalendarDays,
  CircleAlert,
  Coffee,
  Compass,
  ExternalLink,
  Fish,
  Footprints,
  Hotel,
  MapPin,
  MoonStar,
  Route,
  Ship,
  ShoppingBasket,
  Sparkles,
  TrainFront,
  Utensils,
  Waves,
  Wind,
} from 'lucide-react';

interface ChumphonDestinationOverviewProps {
  activitiesHref: string;
  hotelsHref: string;
  transportHref: string;
}

const AFFILIATE_REL = 'noopener noreferrer nofollow sponsored';

const tripShapes = [
  {
    icon: MoonStar,
    label: 'One useful night',
    title: 'Town stopover',
    copy: 'Stay near the railway station and night-market streets when the city is mainly a calm buffer before an early connection.',
  },
  {
    icon: Waves,
    label: 'Strongest first stay',
    title: 'Mainland coast',
    copy: 'Use Thung Wua Laen as the beach base, then give Chumphon town, viewpoints and seafood their own planned blocks.',
  },
  {
    icon: Ship,
    label: 'Sea-day focus',
    title: 'Marine park',
    copy: 'Choose a current licensed trip for Mu Ko Chumphon and let sea state, visibility and operator conditions decide the day.',
  },
  {
    icon: Compass,
    label: 'Island-bound',
    title: 'Koh Tao connection',
    copy: 'Treat airport or train arrival, town, pier, ferry and Mae Haad arrival as separate handovers in one live route.',
  },
] as const;

const bases = [
  {
    icon: TrainFront,
    label: 'Town & station',
    title: 'For a connected evening',
    copy: 'Best for the night market, train access and an overnight that remains useful even without a car.',
    href: '/city/chumphon/hotels/',
  },
  {
    icon: Waves,
    label: 'Thung Wua Laen',
    title: 'For an actual beach stay',
    copy: 'Choose this coast when sand, swimming conditions and a slower morning matter more than a town-centre address.',
    href: '/city/chumphon/attractions/thung-wua-laen-beach/',
  },
  {
    icon: MapPin,
    label: 'Sairee & Pak Nam',
    title: 'For coast and viewpoint',
    copy: 'Use the southern side for the shrine, fishing-port context and Khao Matsee rather than a late town walk.',
    href: '/city/chumphon/attractions/khao-matsee-viewpoint/',
  },
] as const;

const itinerary = [
  {
    day: 'Arrival evening',
    title: 'Give town one real meal',
    route: 'Check in → station-side streets → current night-market stalls',
    note: 'Keep the first block walkable. Confirm where the market is active instead of planning around an old stall list.',
  },
  {
    day: 'Day 2',
    title: 'Read the mainland coast',
    route: 'Thung Wua Laen → Sairee → Khao Matsee',
    note: 'This is a road day between separate coastal points. Leave enough daylight and do not assume every beach has the same sea conditions.',
  },
  {
    day: 'Day 3',
    title: 'Choose one sea chapter',
    route: 'Mu Ko Chumphon trip OR onward ferry to Koh Tao',
    note: 'A marine-park day returns to the mainland; Koh Tao starts a new multi-night island stay. Do not combine them into one vague boat plan.',
  },
] as const;

const practicalChecks = [
  {
    icon: TrainFront,
    title: 'Train and town connect well',
    copy: 'The railway station sits in the urban core, but an onward pier or beach transfer remains a separate journey.',
  },
  {
    icon: Ship,
    title: 'The ticket needs a pier',
    copy: 'Confirm the exact mainland pier, check-in point and Koh Tao arrival rather than booking from the city name alone.',
  },
  {
    icon: Wind,
    title: 'Sea state changes the plan',
    copy: 'Visibility, wind and sailing conditions matter for snorkelling, diving and ferries. Recheck them close to departure.',
  },
  {
    icon: CalendarDays,
    title: 'Season is not a guarantee',
    copy: 'Use seasonal patterns for the first shortlist, then use current local forecasts and operator information for the final choice.',
  },
] as const;

export function ChumphonDestinationOverview({ activitiesHref, hotelsHref, transportHref }: ChumphonDestinationOverviewProps) {
  return (
    <>
      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom">
          <div className="mb-8 grid gap-5 lg:grid-cols-[0.74fr_1.26fr] lg:items-end lg:gap-14">
            <div>
              <p className="eyebrow">Choose what Chumphon is for</p>
              <h2 className="font-display text-[3.05rem] font-semibold leading-[0.9] tracking-[-0.04em] text-jade sm:text-[3.7rem]">Do not let the ferry erase the coast.</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-charcoal/62">Chumphon can be a useful stopover, a quiet mainland beach stay, a marine-park base or the start of a Koh Tao route. Each version needs a different hotel and a different morning.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tripShapes.map(({ icon: Icon, label, title, copy }, index) => (
              <article key={title} className={`relative overflow-hidden rounded-xl border p-5 shadow-[0_5px_18px_rgba(18,63,54,0.04)] ${index === 1 ? 'border-saffron/30 bg-[#fffaf0]' : 'border-jade/10 bg-white'}`}>
                {index === 1 && <span className="absolute right-3 top-3 rounded-md bg-saffron px-2 py-1 text-[7px] font-extrabold uppercase tracking-[0.16em] text-jade-dark">Best mainland balance</span>}
                <span className="grid h-10 w-10 place-items-center rounded-lg border border-saffron/25 bg-saffron/[0.055] text-saffron-dark"><Icon size={20} strokeWidth={1.55} /></span>
                <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.18em] text-saffron-dark">{label}</p>
                <h3 className="mt-1 font-display text-2xl font-semibold text-jade">{title}</h3>
                <p className="mt-3 text-[11px] leading-5 text-charcoal/58">{copy}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-jade/10 bg-white px-5 py-4">
            <p className="text-xs leading-5 text-charcoal/56"><strong className="text-jade">First visit?</strong> Two nights gives town and mainland coast a fair chance; add a third day for one weather-dependent sea chapter.</p>
            <a href={hotelsHref} target="_blank" rel={AFFILIATE_REL} className="inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark">Check current Chumphon hotel prices on Trip.com <ExternalLink size={14} /></a>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
          <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-jade/10 shadow-editorial-lift">
            <Image src="/images/redesign/chumphon-city-night-market.webp" alt="Evening food stalls and shophouses in central Chumphon" fill sizes="(min-width:1024px) 56vw, 100vw" className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-jade-dark/94 via-jade-dark/65 to-transparent px-6 pb-6 pt-24 text-white">
              <MoonStar size={20} className="text-saffron-light" />
              <p className="mt-2 font-display text-2xl font-semibold">A provincial evening, not a waiting room.</p>
              <p className="mt-1 max-w-lg text-[11px] leading-5 text-white/70">Station-side streets, ordinary shophouses and current food stalls give town a useful human scale before the coast or ferry.</p>
            </div>
          </div>

          <div>
            <p className="eyebrow">Let town earn the first night</p>
            <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">Arrive. Drop the bags. Follow dinner, not a checklist.</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/62">Central Chumphon works best as an easy arrival block: a hotel within practical reach of the station, one unhurried meal and enough margin for the next morning. Market locations and opening patterns can change, so use live local information rather than a frozen list of stalls.</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                { icon: TrainFront, title: 'Station logic', copy: 'Choose a connected base when the next leg begins by rail or transfer.' },
                { icon: ShoppingBasket, title: 'Current market', copy: 'Let tonight’s open stalls decide the meal instead of chasing an old ranking.' },
                { icon: Footprints, title: 'Short evening', copy: 'Keep arrival night compact enough that the coast still gets daylight tomorrow.' },
                { icon: Hotel, title: 'Correct base', copy: 'Town and beach hotels solve different trips; decide before comparing rooms.' },
              ].map(({ icon: Icon, title, copy }) => (
                <article key={title} className="rounded-xl border border-jade/10 bg-white p-4">
                  <Icon size={18} className="text-jade" strokeWidth={1.55} />
                  <h3 className="mt-3 font-display text-xl font-semibold text-jade">{title}</h3>
                  <p className="mt-2 text-[10px] leading-5 text-charcoal/55">{copy}</p>
                </article>
              ))}
            </div>
            <Link href="/city/chumphon/food/" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark"><Utensils size={15} /> Open the Chumphon food guide <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[0.62fr_1.38fr] lg:items-end lg:gap-14">
            <div>
              <p className="eyebrow">Pick the base before the room</p>
              <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">Town, beach or the southern coast?</h2>
              <p className="mt-5 text-sm leading-7 text-charcoal/62">Chumphon is long enough that the wrong base turns every meal, viewpoint and departure into a transfer. Match the address to the main purpose.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {bases.map(({ icon: Icon, label, title, copy, href }) => (
                <Link key={label} href={href} className="group rounded-xl border border-jade/10 bg-white p-5 shadow-[0_5px_18px_rgba(18,63,54,0.035)] transition hover:-translate-y-1 hover:shadow-xl">
                  <span className="grid h-10 w-10 place-items-center rounded-lg border border-saffron/25 bg-saffron/[0.05] text-saffron-dark"><Icon size={19} strokeWidth={1.55} /></span>
                  <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.18em] text-saffron-dark">{label}</p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-jade">{title}</h3>
                  <p className="mt-3 text-[10px] leading-5 text-charcoal/56">{copy}</p>
                  <span className="mt-5 flex items-center justify-between border-t border-jade/8 pt-3 text-[10px] font-bold text-jade">Open the guide <ArrowRight size={14} /></span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom">
          <div className="relative min-h-[410px] overflow-hidden rounded-2xl bg-jade-dark text-white shadow-editorial-lift">
            <Image src="/images/redesign/chumphon-marine-route.webp" alt="Small boat travelling between forested islands in Mu Ko Chumphon National Park" fill sizes="100vw" className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-jade-dark/98 via-jade-dark/80 to-jade-dark/10" />
            <div className="relative max-w-2xl px-7 py-12 sm:px-10 lg:px-14 lg:py-16">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-saffron-light">Mainland base → marine park OR Koh Tao</p>
              <h2 className="mt-3 font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] sm:text-[3.7rem]">Two boat days with different endings.</h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/72">A Mu Ko Chumphon trip explores the mainland province and returns to its coast. A ferry to Koh Tao begins a separate island stay. Confirm the operator, exact pier, return point, weather policy and onward transfer before paying.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={activitiesHref} target="_blank" rel={AFFILIATE_REL} className="btn-cream min-h-11 px-5 text-saffron-dark">Check current Chumphon experiences on Klook <ExternalLink size={14} /></a>
                <Link href="/city/chumphon/attractions/mu-ko-chumphon-national-park/" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/35 px-5 text-xs font-bold text-white hover:bg-white/10">Open the marine-park guide <ArrowRight size={14} /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom grid items-center gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14">
          <div>
            <p className="eyebrow">Food belongs in the route</p>
            <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">Seafood, southern curry and a market table.</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/62">Chumphon’s fishing economy makes seafood an obvious theme, while TAT also highlights southern-style khanom chin, Sawi pineapple and local banana products. Treat these as a tasting brief, then choose a current kitchen with visible demand and a menu that fits the group.</p>
            <div className="mt-7 space-y-3">
              {[
                { icon: Coffee, label: 'Morning', copy: 'Coffee or a light station-side breakfast before a road or sea day' },
                { icon: Fish, label: 'Main meal', copy: 'Fresh seafood or southern dishes chosen for the whole table' },
                { icon: ShoppingBasket, label: 'Take home', copy: 'Local fruit or packaged products only after checking freshness and travel rules' },
              ].map(({ icon: Icon, label, copy }) => (
                <div key={label} className="flex gap-4 rounded-xl border border-jade/10 bg-white p-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-saffron/25 bg-saffron/[0.05] text-saffron-dark"><Icon size={17} strokeWidth={1.55} /></span>
                  <div><p className="text-[9px] font-bold uppercase tracking-[0.18em] text-saffron-dark">{label}</p><p className="mt-1 text-xs font-semibold leading-5 text-jade">{copy}</p></div>
                </div>
              ))}
            </div>
            <Link href="/city/chumphon/food/" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark">Plan what to eat in Chumphon <ArrowRight size={15} /></Link>
          </div>

          <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-jade/10 shadow-editorial-lift">
            <Image src="/images/redesign/chumphon-night-market-food.webp" alt="Seafood, southern curry and market dishes in Chumphon" fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
            <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/20 bg-jade-dark/84 p-5 text-white backdrop-blur-sm">
              <Fish size={19} className="text-saffron-light" />
              <p className="mt-2 font-display text-xl font-semibold">Taste it here. Recreate it later.</p>
              <p className="mt-1 text-[10px] leading-5 text-white/68">The dedicated food guide can connect regional dishes to cooking techniques and only the tools that genuinely support them.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom grid gap-10 lg:grid-cols-[0.56fr_1.8fr] lg:gap-14">
          <div>
            <p className="eyebrow">A realistic Chumphon itinerary</p>
            <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">Three days. One coast. One sea decision.</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/62">The itinerary works because town, the mainland coast and the sea are separate chapters instead of a rushed list of distant pins.</p>
          </div>
          <div className="relative grid gap-4 sm:grid-cols-3">
            <div className="pointer-events-none absolute left-8 right-8 top-8 hidden border-t border-dashed border-saffron/55 sm:block" />
            {itinerary.map((item, index) => (
              <article key={item.day} className="relative rounded-xl border border-jade/10 bg-white p-5 shadow-[0_5px_18px_rgba(18,63,54,0.035)]">
                <span className="grid h-8 w-8 place-items-center rounded-full border border-saffron/45 bg-[#fcfaf6] text-[10px] font-extrabold text-saffron-dark">{index + 1}</span>
                <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.18em] text-saffron-dark">{item.day}</p>
                <h3 className="mt-1 font-display text-2xl font-semibold text-jade">{item.title}</h3>
                <p className="mt-4 text-xs font-bold leading-5 text-jade">{item.route}</p>
                <p className="mt-3 text-[11px] leading-5 text-charcoal/56">{item.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom grid gap-8 lg:grid-cols-[0.7fr_1.5fr] lg:gap-14">
          <div>
            <p className="eyebrow">Before you book</p>
            <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">Write down every shore and handover.</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/62">Chumphon travel stays calm when town, beach, airport, railway station, mainland pier and island arrival are treated as separate points.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {practicalChecks.map(({ icon: Icon, title, copy }) => (
              <article key={title} className="rounded-xl border border-jade/10 bg-white p-5 shadow-[0_5px_18px_rgba(18,63,54,0.03)]">
                <span className="grid h-10 w-10 place-items-center rounded-lg border border-jade/10 bg-jade/[0.035] text-jade"><Icon size={20} strokeWidth={1.5} /></span>
                <h3 className="mt-4 font-display text-[1.35rem] font-semibold text-jade">{title}</h3>
                <p className="mt-2 text-[11px] leading-5 text-charcoal/56">{copy}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="container-custom mt-7">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-jade/10 bg-white px-5 py-4">
            <div className="flex items-start gap-3">
              <CircleAlert size={18} className="mt-0.5 shrink-0 text-saffron-dark" />
              <p className="text-xs leading-5 text-charcoal/56"><strong className="text-jade">Going to Koh Tao?</strong> The island has its own stay, weather and activity owner. Use Chumphon to plan the mainland handover, then continue with the specialist island guide.</p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/islands/koh-tao/" className="inline-flex items-center gap-2 text-[10px] font-bold text-jade hover:text-saffron-dark"><Sparkles size={14} /> Open Koh Tao <ArrowRight size={14} /></Link>
              <a href={transportHref} target="_blank" rel={AFFILIATE_REL} className="inline-flex items-center gap-2 text-[10px] font-bold text-jade hover:text-saffron-dark"><Route size={14} /> Check current routes on 12Go <ExternalLink size={13} /></a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
