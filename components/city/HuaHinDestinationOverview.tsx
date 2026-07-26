import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BedDouble,
  CalendarDays,
  Check,
  CircleAlert,
  Clock3,
  ExternalLink,
  Footprints,
  MapPin,
  Palmtree,
  ShieldCheck,
  ShoppingBasket,
  Soup,
  SunMedium,
  TrainFront,
  Waves,
} from 'lucide-react';
import { StoryDottedRoute } from '../visuals/StoryDottedRoute';

interface HuaHinDestinationOverviewProps {
  activitiesHref: string;
  hotelsHref: string;
  transportHref: string;
}

const AFFILIATE_REL = 'noopener noreferrer nofollow sponsored';

const stayShapes = [
  {
    icon: Footprints,
    title: 'Central Hua Hin',
    label: 'Best first base',
    copy: 'Choose the older centre for the railway heritage, main beach, Chat Chai and the night market without arranging a ride for every meal.',
  },
  {
    icon: Palmtree,
    title: 'Nong Kae',
    label: 'Beach and markets',
    copy: 'A south-side base works well for resort time, Cicada, Tamarind and easier access toward Khao Takiab.',
  },
  {
    icon: Waves,
    title: 'Khao Takiab',
    label: 'Quieter coast',
    copy: 'Stay near the hill when a calmer beach edge matters more than walking into the town centre every evening.',
  },
  {
    icon: BedDouble,
    title: 'North coast',
    label: 'Resort-led stay',
    copy: 'The Cha-am side suits a self-contained resort break, but only after checking the real transfer to Hua Hin and its markets.',
  },
] as const;

const rhythms = [
  {
    day: 'Arrival',
    title: 'Let the town introduce itself',
    route: 'Station or road arrival → beach walk → night market',
    note: 'Keep the first evening central. It gives you orientation without turning a Bangkok transfer into a sightseeing sprint.',
  },
  {
    day: 'Day 2',
    title: 'Follow the coast south',
    route: 'Beach morning → Khao Takiab → Cicada and Tamarind',
    note: 'This route works best on a weekend. On weekdays, finish in the centre instead of planning around a closed market.',
  },
  {
    day: 'Day 3',
    title: 'Choose one landscape',
    route: 'Sam Roi Yot OR a slower Hua Hin resort day',
    note: 'The park deserves the whole day. If weather or mobility makes that unrealistic, keep the coast slow rather than stacking minor stops.',
  },
] as const;

const beachChecks = [
  {
    icon: Clock3,
    title: 'Use the beach early',
    copy: 'Morning brings cooler walking, softer light and a more local rhythm before the resort day becomes dominant.',
  },
  {
    icon: Waves,
    title: 'Read the live conditions',
    copy: 'Water, wind, tide and swimming comfort change. Check flags and current local advice instead of relying on one evergreen beach claim.',
  },
  {
    icon: Palmtree,
    title: 'Pick the right section',
    copy: 'The central beach is practical; the south side can feel calmer. Your hotel geography matters more than a generic “Hua Hin Beach” label.',
  },
  {
    icon: ShieldCheck,
    title: 'Give animals space',
    copy: 'Avoid feeding or crowding monkeys around Khao Takiab, and keep food and loose belongings out of reach.',
  },
] as const;

const practical = [
  {
    icon: TrainFront,
    title: 'Compare the full Bangkok route',
    copy: 'Train, bus, van and private transfer each solve a different arrival. Check departure point, luggage rules and hotel transfer—not only headline time.',
  },
  {
    icon: CalendarDays,
    title: 'Match markets to weekdays',
    copy: 'The central night market is the dependable anchor. Cicada and Tamarind are weekend plans, so verify current opening days close to travel.',
  },
  {
    icon: SunMedium,
    title: 'Build heat into the day',
    copy: 'Beach walks, temple steps and park trails are easier early. Keep the middle of the day flexible for lunch, pool time or a slower indoor stop.',
  },
  {
    icon: CircleAlert,
    title: 'Do not compress Sam Roi Yot',
    copy: 'Road time, park conditions and any cave approach make this a real nature day. Check official access and weather before departure.',
  },
] as const;

export function HuaHinDestinationOverview({ activitiesHref, hotelsHref, transportHref }: HuaHinDestinationOverviewProps) {
  return (
    <>
      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom">
          <div className="mb-8 grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-14">
            <div>
              <p className="eyebrow">Choose your Hua Hin</p>
              <h2 className="font-display text-[3.05rem] font-semibold leading-[0.9] tracking-[-0.04em] text-jade sm:text-[3.7rem]">
                One coast. Four genuinely different bases.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-charcoal/62">
              Hua Hin is a coastal city in Prachuap Khiri Khan province, not a single resort strip. The older centre, Nong Kae, Khao Takiab and the north-coast resorts create different trips. Choose the base before choosing the room.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stayShapes.map(({ icon: Icon, title, label, copy }) => (
              <article key={title} className="rounded-xl border border-jade/10 bg-white p-5 shadow-[0_5px_18px_rgba(18,63,54,0.04)]">
                <span className="grid h-10 w-10 place-items-center rounded-lg border border-saffron/25 bg-saffron/[0.05] text-saffron-dark"><Icon size={20} strokeWidth={1.55} /></span>
                <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.18em] text-saffron-dark">{label}</p>
                <h3 className="mt-1 font-display text-2xl font-semibold text-jade">{title}</h3>
                <p className="mt-3 text-[11px] leading-5 text-charcoal/58">{copy}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-jade/10 bg-white px-5 py-4">
            <p className="text-xs leading-5 text-charcoal/56"><strong className="text-jade">First visit?</strong> Central Hua Hin is the simplest all-round base; move south when beach time and weekend markets are the priority.</p>
            <a href={hotelsHref} target="_blank" rel={AFFILIATE_REL} className="inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark">Check current Hua Hin hotel prices on Trip.com <ExternalLink size={14} /></a>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <p className="eyebrow">A beach town with a working centre</p>
            <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.65rem]">Do the market before the resort day takes over.</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/62">
              Start around Chat Chai and the older streets, then walk toward the beach. In the evening, the central night market becomes the easy food anchor. This simple morning-and-evening rhythm is what separates Hua Hin from a generic hotel break.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                ['Morning', 'Chat Chai, breakfast and the central beach'],
                ['Late afternoon', 'Khao Takiab or a slow return to the coast'],
                ['Weekend evening', 'Cicada for art, Tamarind for easier food'],
                ['Any evening', 'Central night market as the reliable fallback'],
              ].map(([label, copy]) => (
                <div key={label} className="rounded-xl border border-jade/10 bg-white p-4">
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-saffron-dark">{label}</p>
                  <p className="mt-2 text-xs font-semibold leading-5 text-jade">{copy}</p>
                </div>
              ))}
            </div>
            <Link href="/city/hua-hin/food/" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark"><Soup size={15} /> Plan where to eat in Hua Hin <ArrowRight size={15} /></Link>
          </div>

          <div className="relative aspect-[16/12] overflow-hidden rounded-2xl border border-jade/10 shadow-editorial-lift">
            <Image src="/images/redesign/hua-hin-night-market-seafood.webp" alt="Seafood and evening market dining in Hua Hin" fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-jade-dark/90 to-transparent px-6 pb-6 pt-20 text-white">
              <ShoppingBasket size={20} className="text-saffron-light" />
              <p className="mt-2 font-display text-2xl font-semibold">Market first, menu second.</p>
              <p className="mt-1 max-w-md text-[11px] leading-5 text-white/70">Browse before ordering, ask the current price when seafood is sold by weight and choose busy stalls with clear turnover.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-2xl bg-jade-dark text-white shadow-editorial-lift">
            <Image src="/images/redesign/hua-hin-destination-hero.webp" alt="Hua Hin coast in calm morning light" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-jade-dark via-jade-dark/88 to-jade-dark/12" />
            <div className="relative grid min-h-[405px] items-center gap-8 px-7 py-10 sm:px-10 lg:grid-cols-[0.76fr_1.18fr] lg:px-14">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-saffron-light">Bangkok to the Gulf coast</p>
                <h2 className="mt-3 max-w-md font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] sm:text-[3.7rem]">Choose the arrival that matches the stay.</h2>
                <p className="mt-5 max-w-md text-sm leading-7 text-white/70">A central hotel pairs naturally with rail or town arrivals. An outer resort may turn the last transfer into a separate journey. Compare the complete door-to-door route before booking.</p>
                <a href={transportHref} target="_blank" rel={AFFILIATE_REL} className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-white hover:text-saffron-light">Check current Bangkok–Hua Hin routes on 12Go <ExternalLink size={14} /></a>
              </div>
              <div className="relative hidden min-h-[250px] lg:block">
                <StoryDottedRoute className="absolute left-0 top-14 h-40 w-72 opacity-90" />
                <div className="absolute right-0 top-0 grid w-[390px] grid-cols-2 gap-3">
                  {['Bangkok departure', 'Rail or road', 'Hua Hin arrival', 'Hotel transfer'].map((label, index) => (
                    <div key={label} className="rounded-xl border border-white/15 bg-white/[0.09] p-4 backdrop-blur-sm">
                      <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-saffron-light">Step {index + 1}</span>
                      <strong className="mt-1.5 block font-display text-lg font-semibold">{label}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom grid gap-10 lg:grid-cols-[0.56fr_1.8fr] lg:gap-14">
          <div>
            <p className="eyebrow">A realistic first visit</p>
            <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">Three nights, with one honest choice.</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/62">Two nights covers the town and south coast. A third night creates space for Sam Roi Yot without sacrificing the beach and market rhythm that makes Hua Hin work.</p>
          </div>
          <div className="relative grid gap-4 sm:grid-cols-3">
            <div className="pointer-events-none absolute left-8 right-8 top-8 hidden border-t border-dashed border-saffron/55 sm:block" />
            {rhythms.map((item, index) => (
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
        <div className="container-custom grid items-center gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-jade/10 shadow-editorial-lift">
            <Image src="/images/redesign/hua-hin-destination-hero.webp" alt="Long sandy beach and the Hua Hin shoreline" fill sizes="(min-width:1024px) 58vw, 100vw" className="object-cover" />
            <div className="absolute left-5 top-5 rounded-lg border border-white/25 bg-jade-dark/80 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur">Long walks · changing sea</div>
          </div>
          <div>
            <p className="eyebrow">The honest beach guide</p>
            <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">Hua Hin Beach is a city beach—not an island fantasy.</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/62">Its strength is access: long walks, early mornings and a beach that sits beside a real town. If clear-water snorkelling is the whole brief, choose a different Thai coast. If you want coast, markets and easy Bangkok access together, Hua Hin becomes much stronger.</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {beachChecks.map(({ icon: Icon, title, copy }) => (
                <article key={title} className="rounded-xl border border-jade/10 bg-white p-4">
                  <Icon size={19} className="text-jade" strokeWidth={1.55} />
                  <h3 className="mt-3 font-display text-xl font-semibold text-jade">{title}</h3>
                  <p className="mt-2 text-[10px] leading-5 text-charcoal/55">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-2xl bg-jade-dark text-white shadow-editorial-lift">
            <Image src="/images/redesign/hua-hin-sam-roi-yot-route.webp" alt="Wetland boardwalk and limestone peaks in Khao Sam Roi Yot" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-jade-dark/96 via-jade-dark/80 to-transparent" />
            <div className="relative max-w-2xl px-7 py-12 sm:px-10 lg:px-14 lg:py-16">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-saffron-light">Beyond the resort strip</p>
              <h2 className="mt-3 font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] sm:text-[3.7rem]">Give Sam Roi Yot the whole day.</h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/72">Karst peaks, wetlands and cave routes are the landscape contrast that Hua Hin itself cannot provide. Choose a realistic park focus, verify current access and do not promise yourself every viewpoint in one outing.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={activitiesHref} target="_blank" rel={AFFILIATE_REL} className="btn-cream min-h-11 px-5 text-saffron-dark">Check current Hua Hin day trips <ExternalLink size={14} /></a>
                <Link href="/city/hua-hin/attractions/" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/35 px-5 text-xs font-bold text-white hover:bg-white/10">Compare attractions <ArrowRight size={14} /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom grid gap-8 lg:grid-cols-[0.7fr_1.5fr] lg:gap-14">
          <div>
            <p className="eyebrow">Before you go</p>
            <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">Keep the easy coast genuinely easy.</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/62">Hua Hin rewards simple planning: one coherent base, live market and weather checks, and a day trip only when its travel time fits.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {practical.map(({ icon: Icon, title, copy }) => (
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
              <MapPin size={18} className="mt-0.5 shrink-0 text-saffron-dark" />
              <p className="text-xs leading-5 text-charcoal/56"><strong className="text-jade">Hua Hin or Pattaya?</strong> Choose Hua Hin for a calmer coast-and-market break; choose Pattaya when nightlife and a denser entertainment programme are central to the trip.</p>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-jade"><Check size={14} className="text-saffron-dark" /> Decision first, hotel second</div>
          </div>
        </div>
      </section>
    </>
  );
}
