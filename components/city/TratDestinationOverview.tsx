import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BedDouble,
  Building2,
  BusFront,
  CalendarDays,
  Check,
  CircleAlert,
  ExternalLink,
  Footprints,
  Landmark,
  MapPin,
  Palmtree,
  Route,
  Ship,
  ShoppingBasket,
  Soup,
  Store,
  UsersRound,
  Waves,
} from 'lucide-react';

interface TratDestinationOverviewProps {
  activitiesHref: string;
  hotelsHref: string;
  transportHref: string;
}

const AFFILIATE_REL = 'noopener noreferrer nofollow sponsored';

const tripModes = [
  {
    icon: BedDouble,
    label: 'One useful night',
    title: 'Ferry buffer',
    copy: 'Stay in Trat town when an island connection does not line up comfortably. Use the evening for the old quarter and market instead of treating the stop as dead time.',
  },
  {
    icon: Footprints,
    label: 'Best mainland introduction',
    title: 'Two-night city stay',
    copy: 'Give the museum, canal quarter and food loop one day, then choose Ban Nam Chiao or Laem Ngop as the second mainland chapter.',
  },
  {
    icon: Ship,
    label: 'Sea-first journey',
    title: 'Island connection',
    copy: 'Use Trat as the decision point for Koh Chang, Koh Mak or Koh Kood. The right pier and transfer chain depends on the island, date and live operator schedule.',
  },
  {
    icon: UsersRound,
    label: 'Most local depth',
    title: 'Community route',
    copy: 'Build around Ban Nam Chiao, local food and the mainland coast when everyday eastern Thailand matters more than ticking off another beach.',
  },
] as const;

const itinerary = [
  {
    day: 'Arrival day',
    title: 'Let Trat be a town',
    route: 'Old quarter → city museum → canal walk → night market',
    note: 'Keep the first route compact and walkable. It works after a road arrival and makes the next transfer easier to understand.',
  },
  {
    day: 'Day 2',
    title: 'Choose one mainland edge',
    route: 'Ban Nam Chiao OR Laem Ngop → seafood stop → Trat town',
    note: 'Choose community depth or the coastal gateway. Trying to combine both with a same-day ferry usually weakens every stop.',
  },
  {
    day: 'Day 3+',
    title: 'Continue to the right island',
    route: 'Correct pier → verified sailing → island transfer → chosen base',
    note: 'Treat the island as a new destination chapter. Recheck the full connection and last hotel transfer close to travel.',
  },
] as const;

const islandChoices = [
  {
    image: '/images/islands/koh-chang.webp',
    label: 'Most infrastructure',
    title: 'Koh Chang',
    copy: 'The broadest choice of beaches, stays and services. Choose the coast before the hotel because island road time changes the trip.',
    href: '/city/koh-chang/',
  },
  {
    image: '/images/islands/koh-mak.webp',
    label: 'Slower island rhythm',
    title: 'Koh Mak',
    copy: 'A smaller, lower-density stay for travellers who value quiet roads and a deliberately slower programme over a long attraction list.',
    href: '/islands/koh-mak/',
  },
  {
    image: '/images/blog/koh-kood-quiet-island-guide-trat-2026.webp',
    label: 'Beach-led retreat',
    title: 'Koh Kood',
    copy: 'The strongest fit when the trip centres on a quiet resort, clear-water beach time and enough days to absorb a longer transfer chain.',
    href: '/blog/koh-kood-quiet-island-guide-trat-2026/',
  },
] as const;

const practicalChecks = [
  {
    icon: BusFront,
    title: 'Compare the full Bangkok route',
    copy: 'Check the departure terminal, luggage rules, arrival point and onward hotel or pier transfer—not only the headline journey.',
  },
  {
    icon: Ship,
    title: 'Treat ferries as live information',
    copy: 'Pier, operator and sailing availability can change by island, season and conditions. Verify the complete chain close to travel.',
  },
  {
    icon: CalendarDays,
    title: 'Leave weather margin',
    copy: 'Trat is one of Thailand’s wetter provinces. A flexible night is more useful than a tightly connected sea itinerary when conditions shift.',
  },
  {
    icon: CircleAlert,
    title: 'Check current local advice',
    copy: 'For border-area travel or onward international plans, use official current guidance. This evergreen city guide does not replace live notices.',
  },
] as const;

export function TratDestinationOverview({ activitiesHref, hotelsHref, transportHref }: TratDestinationOverviewProps) {
  return (
    <>
      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom">
          <div className="mb-8 grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-14">
            <div>
              <p className="eyebrow">Choose your Trat</p>
              <h2 className="font-display text-[3.05rem] font-semibold leading-[0.9] tracking-[-0.04em] text-jade sm:text-[3.7rem]">
                The town, the mainland or the islands?
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-charcoal/62">
              Trat is a provincial town in eastern Thailand and a gateway to a much larger island province. It is worth staying when food, old wooden streets and coastal communities are part of the brief—not only when a ferry timetable forces a stop.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tripModes.map(({ icon: Icon, label, title, copy }) => (
              <article key={title} className="rounded-xl border border-jade/10 bg-white p-5 shadow-[0_5px_18px_rgba(18,63,54,0.04)]">
                <span className="grid h-10 w-10 place-items-center rounded-lg border border-saffron/25 bg-saffron/[0.05] text-saffron-dark"><Icon size={20} strokeWidth={1.55} /></span>
                <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.18em] text-saffron-dark">{label}</p>
                <h3 className="mt-1 font-display text-2xl font-semibold text-jade">{title}</h3>
                <p className="mt-3 text-[11px] leading-5 text-charcoal/58">{copy}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-jade/10 bg-white px-5 py-4">
            <p className="text-xs leading-5 text-charcoal/56"><strong className="text-jade">First visit?</strong> One night is a useful ferry buffer; two nights turns Trat into a genuine mainland destination.</p>
            <a href={hotelsHref} target="_blank" rel={AFFILIATE_REL} className="inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark">Check current Trat hotel prices on Trip.com <ExternalLink size={14} /></a>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-jade/10 shadow-editorial-lift">
            <Image src="/images/redesign/trat-old-town.webp" alt="Wooden houses and a canal in Trat old town" fill sizes="(min-width:1024px) 54vw, 100vw" className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-jade-dark/92 to-transparent px-6 pb-6 pt-24 text-white">
              <Landmark size={20} className="text-saffron-light" />
              <p className="mt-2 font-display text-2xl font-semibold">Start where the ferry story usually skips.</p>
              <p className="mt-1 max-w-lg text-[11px] leading-5 text-white/70">The museum, Bang Phra canal quarter and wooden streets explain the coastal trade town before the province opens toward the sea.</p>
            </div>
          </div>

          <div>
            <p className="eyebrow">Trat town in one coherent walk</p>
            <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">Museum first. Canal second. Market when the light softens.</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/62">Begin around Trat City Museum and the older centre, then slow down through Rak Khlong Bang Phra. This is not a blockbuster-attraction route; it is a compact sequence of wooden houses, local trade history, small food stops and ordinary town life.</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                { icon: Building2, label: 'Context', copy: 'Use the city museum to understand the province before choosing the coast.' },
                { icon: Footprints, label: 'Slow walk', copy: 'Keep the canal quarter unhurried instead of treating it as a photo stop.' },
                { icon: Store, label: 'Market layer', copy: 'Browse first and let current stall activity shape the evening meal.' },
                { icon: MapPin, label: 'Compact base', copy: 'Stay near the old centre when one walkable evening matters.' },
              ].map(({ icon: Icon, label, copy }) => (
                <article key={label} className="rounded-xl border border-jade/10 bg-white p-4">
                  <Icon size={18} className="text-jade" strokeWidth={1.55} />
                  <h3 className="mt-3 font-display text-xl font-semibold text-jade">{label}</h3>
                  <p className="mt-2 text-[10px] leading-5 text-charcoal/55">{copy}</p>
                </article>
              ))}
            </div>
            <Link href="/city/trat/attractions/" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark">Plan the old-town route <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom grid items-center gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14">
          <div>
            <p className="eyebrow">Food is part of the geography</p>
            <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">Eat the mainland before chasing an island menu.</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/62">Trat’s useful food brief is specific: seafood, crab noodles, salacca fruit, old-town sweets and community snacks. Build a tasting loop from current market activity and local specialists instead of relying on one permanent “best restaurants” ranking.</p>
            <div className="mt-7 space-y-3">
              {[
                ['Morning', 'Market fruit, a simple breakfast and the first old-town walk'],
                ['Midday', 'Crab noodles or another focused local lunch'],
                ['Late afternoon', 'Small sweets and salacca products around the centre'],
                ['Evening', 'Seafood or busy market stalls with clearly displayed current prices'],
              ].map(([label, copy]) => (
                <div key={label} className="flex gap-4 rounded-xl border border-jade/10 bg-white p-4">
                  <span className="min-w-20 text-[9px] font-bold uppercase tracking-[0.18em] text-saffron-dark">{label}</span>
                  <p className="text-xs font-semibold leading-5 text-jade">{copy}</p>
                </div>
              ))}
            </div>
            <Link href="/city/trat/food/" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark"><Soup size={15} /> Open the Trat food guide <ArrowRight size={15} /></Link>
          </div>

          <div className="relative aspect-[16/12] overflow-hidden rounded-2xl border border-jade/10 shadow-editorial-lift">
            <Image src="/images/redesign/trat-food.webp" alt="Seafood, crab noodles and tropical fruit in Trat" fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
            <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/20 bg-jade-dark/82 p-5 text-white backdrop-blur-sm">
              <ShoppingBasket size={19} className="text-saffron-light" />
              <p className="mt-2 font-display text-xl font-semibold">Current market, current choice.</p>
              <p className="mt-1 text-[10px] leading-5 text-white/68">Ask the price before ordering seafood sold by weight and prefer clear turnover over an evergreen claim.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-2xl bg-jade-dark text-white shadow-editorial-lift">
            <Image src="/images/redesign/trat-route-banner.webp" alt="Route from Trat town toward island ferry piers" fill sizes="100vw" className="object-cover object-[62%_center]" />
            <div className="absolute inset-0 bg-gradient-to-r from-jade-dark/98 via-jade-dark/83 to-jade-dark/15" />
            <div className="relative max-w-2xl px-7 py-12 sm:px-10 lg:px-14 lg:py-16">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-saffron-light">Bangkok → Trat → the correct pier</p>
              <h2 className="mt-3 font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] sm:text-[3.7rem]">The last transfer decides whether the route works.</h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/72">A bus to Trat town, a flight to Trat Airport and a through-ticket to an island are different products. Compare the actual arrival point, pier, sailing, luggage and island-side hotel transfer as one chain.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={transportHref} target="_blank" rel={AFFILIATE_REL} className="btn-cream min-h-11 px-5 text-saffron-dark">Check current Trat routes on 12Go <ExternalLink size={14} /></a>
                <Link href="/transportation/" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/35 px-5 text-xs font-bold text-white hover:bg-white/10">Read the transport guide <ArrowRight size={14} /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom">
          <div className="mb-8 grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-14">
            <div>
              <p className="eyebrow">Choose the island, not just the ferry</p>
              <h2 className="font-display text-[3.05rem] font-semibold leading-[0.9] tracking-[-0.04em] text-jade sm:text-[3.7rem]">Three islands. Three different travel briefs.</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-charcoal/62">Koh Chang, Koh Mak and Koh Kood should not be flattened into one “Trat islands” answer. Choose by stay style first, then verify the live connection serving that island.</p>
          </div>

          <div className="scrollbar-hide flex snap-x gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible">
            {islandChoices.map(item => (
              <Link key={item.title} href={item.href} className="group min-w-[82vw] snap-start overflow-hidden rounded-xl border border-jade/10 bg-white shadow-[0_5px_18px_rgba(18,63,54,0.04)] transition hover:-translate-y-1 hover:shadow-xl sm:min-w-0">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={item.image} alt={`${item.title} in Trat province`} fill sizes="(min-width:768px) 33vw, 82vw" className="object-cover transition duration-500 group-hover:scale-[1.035]" />
                  <span className="absolute left-3 top-3 rounded-md bg-jade/88 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.17em] text-white backdrop-blur">{item.label}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-[1.65rem] font-semibold leading-tight text-jade">{item.title}</h3>
                  <p className="mt-2 text-[11px] leading-5 text-charcoal/58">{item.copy}</p>
                  <span className="mt-4 flex items-center justify-between border-t border-jade/8 pt-3 text-[10px] font-bold text-jade">Open the specialist guide <ArrowRight size={14} /></span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-jade/10 bg-white px-5 py-4">
            <p className="text-xs leading-5 text-charcoal/56"><strong className="text-jade">Do not book by island name alone.</strong> Check the exact stay area, transfer route and current boat connection before paying.</p>
            <a href={activitiesHref} target="_blank" rel={AFFILIATE_REL} className="inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark">Check current Trat experiences on Klook <ExternalLink size={14} /></a>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
          <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-jade/10 shadow-editorial-lift">
            <Image src="/images/redesign/trat-ban-nam-chiao.webp" alt="Mangrove walkway, mosque and temple in Ban Nam Chiao" fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
            <div className="absolute left-5 top-5 rounded-lg border border-white/25 bg-jade-dark/80 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur">Community · mangroves · shared heritage</div>
          </div>
          <div>
            <p className="eyebrow">The strongest mainland extension</p>
            <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">Give Ban Nam Chiao more than one bridge photo.</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/62">Ban Nam Chiao is valuable because Buddhist and Muslim community life, mangrove landscapes, craft and food sit in one lived-in place. Visit through a local programme where possible, ask before photographing people or religious spaces and spend locally.</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                { icon: UsersRound, title: 'Community first', copy: 'Follow local guidance and let hosts set the pace.' },
                { icon: Soup, title: 'Food with context', copy: 'Use snacks and meals to understand the place, not as props.' },
                { icon: Waves, title: 'Read the mangroves', copy: 'Choose a route that explains the coastal ecosystem.' },
                { icon: Check, title: 'Respect the setting', copy: 'Dress and photograph with religious and residential spaces in mind.' },
              ].map(({ icon: Icon, title, copy }) => (
                <article key={title} className="rounded-xl border border-jade/10 bg-white p-4">
                  <Icon size={18} className="text-jade" strokeWidth={1.55} />
                  <h3 className="mt-3 font-display text-xl font-semibold text-jade">{title}</h3>
                  <p className="mt-2 text-[10px] leading-5 text-charcoal/55">{copy}</p>
                </article>
              ))}
            </div>
            <Link href="/city/trat/attractions/ban-nam-chiao-community/" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark">Read the Ban Nam Chiao guide <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom grid gap-10 lg:grid-cols-[0.56fr_1.8fr] lg:gap-14">
          <div>
            <p className="eyebrow">A realistic Trat itinerary</p>
            <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">Two mainland nights before the sea takes over.</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/62">One night is useful; two nights gives Trat its own story. Add an island only as a separate trip chapter with its own transfer margin.</p>
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
            <p className="eyebrow">Before you go</p>
            <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">Keep every handover visible.</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/62">Trat becomes easy when town, airport, pier and island are treated as separate points—not as one vague destination label.</p>
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
              <Route size={18} className="mt-0.5 shrink-0 text-saffron-dark" />
              <p className="text-xs leading-5 text-charcoal/56"><strong className="text-jade">Trat town or Koh Chang?</strong> Stay in town for food, old streets and mainland communities; continue to Koh Chang when the beach-and-island stay is the actual purpose.</p>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-jade"><Palmtree size={14} className="text-saffron-dark" /> Mainland first, island second</div>
          </div>
        </div>
      </section>
    </>
  );
}
