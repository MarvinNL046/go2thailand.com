import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BedDouble,
  Building2,
  BusFront,
  CalendarDays,
  Check,
  Clock3,
  Compass,
  ExternalLink,
  Map,
  MapPin,
  MoonStar,
  Route,
  ShieldCheck,
  TrainFront,
  Utensils,
  Waves,
} from 'lucide-react';
import { StoryDottedRoute } from '../visuals/StoryDottedRoute';

interface BangkokDestinationOverviewProps {
  activitiesHref: string;
  hotelsHref: string;
  transportHref: string;
}

const AFFILIATE_REL = 'noopener noreferrer nofollow sponsored';

const zones = [
  {
    title: 'Old Town & riverside',
    label: 'Temples and first-time icons',
    copy: 'Choose this side when the Grand Palace, Wat Pho, Wat Arun and river boats lead your plan. It is atmospheric, but rail connections are less direct in parts of the old centre.',
    icon: Waves,
  },
  {
    title: 'Siam',
    label: 'Central and well connected',
    copy: 'A practical first base for BTS connections, major malls and a relatively simple journey between the historic city and modern Bangkok.',
    icon: TrainFront,
  },
  {
    title: 'Lower Sukhumvit',
    label: 'Transport, dining and nightlife',
    copy: 'Useful when restaurants, evening choice and BTS or MRT access matter most. Pick the exact station area carefully because Sukhumvit stretches a long way.',
    icon: Building2,
  },
  {
    title: 'Silom & Sathorn',
    label: 'Food, parks and mixed transport',
    copy: 'A balanced base for MRT, BTS, the river, Lumphini Park and serious dining without putting the trip entirely inside a shopping district.',
    icon: MapPin,
  },
] as const;

const experiences = [
  {
    title: 'Old Bangkok by temple cluster',
    copy: 'Group the Grand Palace, Wat Pho and the cross-river approach to Wat Arun. Walking less and crossing the river deliberately makes this day much calmer.',
    image: '/images/cities/bangkok/attractions/grand-palace-chakri-maha-prasat.webp',
    href: '/city/bangkok/attractions/',
    tag: 'Heritage',
  },
  {
    title: 'The Chao Phraya as a route',
    copy: 'Use the river to connect old Bangkok, Thonburi and selected riverside stops instead of treating every boat ride as a separate attraction.',
    image: '/images/redesign/bangkok-zones-banner.webp',
    href: '/city/bangkok/attractions/',
    tag: 'River',
  },
  {
    title: 'Yaowarat after dark',
    copy: 'Arrive with an appetite and choose a few focused stops. Chinatown works best as an evening food district, not as a checklist of famous queues.',
    image: '/images/redesign/bangkok-food-yaowarat.webp',
    href: '/city/bangkok/food/',
    tag: 'Food',
  },
  {
    title: 'A slower green contrast',
    copy: 'Add Lumphini, Benjakitti or Bang Kachao when heat, traffic and visual overload begin to flatten the experience.',
    image: '/images/cities/bangkok/attractions/lumpini-park-aerial.webp',
    href: '/city/bangkok/attractions/bang-kachao/',
    tag: 'Breathing room',
  },
] as const;

const itinerary = [
  {
    day: 'Day 1',
    title: 'Old Bangkok & river',
    route: 'Grand Palace → Wat Pho → ferry crossing → Wat Arun',
    note: 'Start early, keep shoulders and knees covered and leave room for a slow riverside break.',
  },
  {
    day: 'Day 2',
    title: 'Neighbourhoods & food',
    route: 'Talat Noi → Chinatown → evening food route',
    note: 'Move by river, MRT or taxi between clusters instead of walking every connecting road.',
  },
  {
    day: 'Day 3',
    title: 'Modern city & green space',
    route: 'Siam or Jim Thompson House → Lumphini/Benjakitti → chosen evening',
    note: 'Use the final evening for a night market, rooftop, Muay Thai or a quieter local district—not all four.',
  },
] as const;

const transport = [
  {
    icon: TrainFront,
    title: 'BTS and MRT',
    copy: 'Best for repeatable cross-city journeys along the modern corridors. Check the final walk because a nearby station does not always mean a comfortable pedestrian route.',
  },
  {
    icon: Waves,
    title: 'River and canal boats',
    copy: 'Useful for old-city and riverside clusters. Confirm the pier, boat type and service direction rather than boarding solely by colour or crowd.',
  },
  {
    icon: BusFront,
    title: 'Metered taxi or ride-hailing',
    copy: 'Helpful for door-to-door gaps, late returns or luggage. Traffic can transform a short map distance into a long journey, so compare road and rail before leaving.',
  },
  {
    icon: Route,
    title: 'Walking',
    copy: 'Excellent within a neighbourhood, unreliable as a citywide strategy. Bangkok rewards short walks inside clusters more than long walks between them.',
  },
] as const;

const practical = [
  {
    icon: Clock3,
    title: 'Plan by travel time',
    copy: 'Map distance is a poor Bangkok clock. Build each half-day around one connected cluster and one realistic transfer.',
  },
  {
    icon: ShieldCheck,
    title: 'Check live venue details',
    copy: 'Temple access, ceremonies, exhibitions and transport operations can change. Verify the official source on the day you visit.',
  },
  {
    icon: Utensils,
    title: 'Order food in rounds',
    copy: 'Share a few dishes, check allergens directly and move on only if you still have room. This works better than chasing a fixed “best food” list.',
  },
  {
    icon: MoonStar,
    title: 'Choose one evening mood',
    copy: 'Night market, rooftop, Chinatown, live music or Muay Thai each deserves its own route. Combining too many creates expensive backtracking.',
  },
] as const;

export function BangkokDestinationOverview({ activitiesHref, hotelsHref, transportHref }: BangkokDestinationOverviewProps) {
  return (
    <>
      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.55fr] lg:items-end lg:gap-14">
            <div>
              <p className="eyebrow">Choose the right Bangkok</p>
              <h2 className="font-display text-[3.05rem] font-semibold leading-[0.9] tracking-[-0.04em] text-jade sm:text-[3.65rem]">Your base changes the whole trip.</h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-charcoal/64">Bangkok has no single visitor centre. Start with the places you want to reach after breakfast and after dark, then choose a base that reduces repeated cross-city journeys.</p>
              <Link href="/where-to-stay/bangkok/first-time/" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-jade transition hover:text-saffron-dark">Compare first-time areas <ArrowRight size={15} /></Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {zones.map(({ title, label, copy, icon: Icon }) => (
                <article key={title} className="rounded-xl border border-jade/10 bg-white p-5 shadow-[0_5px_18px_rgba(18,63,54,0.035)] sm:p-6">
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-saffron/25 bg-saffron/[0.06] text-jade"><Icon size={21} strokeWidth={1.55} /></span>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-saffron-dark">{label}</p>
                      <h3 className="mt-1 font-display text-2xl font-semibold text-jade">{title}</h3>
                    </div>
                  </div>
                  <p className="mt-4 text-xs leading-6 text-charcoal/60">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom">
          <div className="mb-7 flex items-end justify-between gap-5">
            <div>
              <p className="eyebrow">Four different city rhythms</p>
              <h2 className="font-display text-[2.9rem] font-semibold leading-none tracking-[-0.04em] text-jade sm:text-[3.4rem]">Things to do without checklist fatigue.</h2>
            </div>
            <Link href="/city/bangkok/attractions/" className="hidden items-center gap-2 text-xs font-bold text-jade transition hover:text-saffron-dark sm:flex">All Bangkok attractions <ArrowRight size={15} /></Link>
          </div>

          <div className="scrollbar-hide flex snap-x gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
            {experiences.map(item => (
              <Link key={item.title} href={item.href} className="group min-w-[80vw] snap-start overflow-hidden rounded-xl border border-jade/10 bg-white shadow-[0_5px_18px_rgba(18,63,54,0.04)] transition hover:-translate-y-1 hover:shadow-xl sm:min-w-0">
                <div className="relative aspect-[4/2.9] overflow-hidden bg-jade/5">
                  <Image src={item.image} alt={item.title} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 80vw" className="object-cover transition duration-500 group-hover:scale-[1.035]" />
                  <span className="absolute left-3 top-3 rounded-md bg-jade/88 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.17em] text-white backdrop-blur">{item.tag}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-display text-[1.35rem] font-semibold leading-tight text-jade">{item.title}</h3>
                  <p className="mt-2 text-[11px] leading-5 text-charcoal/58">{item.copy}</p>
                  <span className="mt-4 flex items-center justify-between border-t border-jade/8 pt-3 text-[10px] font-bold text-jade">Open the guide <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-jade/10 bg-white px-5 py-4">
            <p className="text-xs leading-5 text-charcoal/56"><strong className="text-jade">Prefer an organised first day?</strong> Compare current temple, food and river experiences before choosing a format.</p>
            <a href={activitiesHref} target="_blank" rel={AFFILIATE_REL} className="inline-flex items-center gap-2 text-xs font-bold text-jade transition hover:text-saffron-dark">Check current options on Klook <ExternalLink size={14} /></a>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-2xl bg-jade-dark text-white shadow-editorial-lift">
            <Image src="/images/redesign/bangkok-zones-banner.webp" alt="Bangkok neighbourhoods along the Chao Phraya River" fill sizes="100vw" className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-jade-dark via-jade-dark/88 to-jade-dark/15" />
            <div className="relative grid min-h-[390px] items-center gap-8 px-7 py-10 sm:px-10 lg:grid-cols-[0.72fr_1.2fr] lg:px-14">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-saffron-light">The cluster method</p>
                <h2 className="mt-3 max-w-md font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] sm:text-[3.7rem]">Cross the city less. Experience it more.</h2>
                <p className="mt-5 max-w-md text-sm leading-7 text-white/70">Treat Old Town, the river, Chinatown and the BTS/MRT corridor as separate mini-cities. Finish one cluster before making the next major transfer.</p>
              </div>
              <div className="relative hidden min-h-[250px] lg:block">
                <StoryDottedRoute className="absolute left-0 top-14 h-40 w-72 opacity-90" />
                <div className="absolute right-0 top-0 grid w-[390px] grid-cols-2 gap-3">
                  {['Old Town + river', 'Talat Noi + Chinatown', 'Siam + green space', 'Chosen evening district'].map((label, index) => (
                    <div key={label} className="rounded-xl border border-white/15 bg-white/[0.09] p-4 backdrop-blur-sm">
                      <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-saffron-light">Cluster {index + 1}</span>
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
        <div className="container-custom">
          <div className="grid gap-10 lg:grid-cols-[0.62fr_1.6fr] lg:items-start lg:gap-14">
            <div>
              <p className="eyebrow">A realistic first visit</p>
              <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">Three days, three versions of Bangkok.</h2>
              <p className="mt-5 text-sm leading-7 text-charcoal/62">Three full days cover a strong first layer. Add a fourth or fifth day for neighbourhood depth, museums, markets or a day trip—not because every headline sight needs its own day.</p>
              <Link href="/itineraries/" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-jade transition hover:text-saffron-dark">Explore Thailand itineraries <ArrowRight size={15} /></Link>
            </div>
            <div className="relative grid gap-4 lg:grid-cols-3">
              <div className="pointer-events-none absolute left-8 right-8 top-8 hidden border-t border-dashed border-saffron/55 lg:block" />
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
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom grid gap-5 lg:grid-cols-2">
          <article className="overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-[0_6px_22px_rgba(18,63,54,0.045)]">
            <div className="relative aspect-[16/8.5] overflow-hidden">
              <Image src="/images/redesign/bangkok-food-yaowarat.webp" alt="Food in Bangkok's Yaowarat district" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-jade/55 via-transparent to-transparent" />
            </div>
            <div className="p-6 sm:p-8">
              <p className="eyebrow">Eat by district</p>
              <h2 className="font-display text-[2.75rem] font-semibold leading-[0.95] tracking-[-0.035em] text-jade">Bangkok food needs its own route.</h2>
              <p className="mt-4 text-sm leading-7 text-charcoal/62">Yaowarat, Bang Rak, old-town markets and modern dining districts each solve a different food mood. Choose one area, order in rounds and use the dedicated food owner for dishes and neighbourhood context.</p>
              <Link href="/city/bangkok/food/" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-jade transition hover:text-saffron-dark">Plan where to eat in Bangkok <ArrowRight size={15} /></Link>
            </div>
          </article>

          <article className="overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-[0_6px_22px_rgba(18,63,54,0.045)]">
            <div className="relative aspect-[16/8.5] overflow-hidden">
              <Image src="/images/redesign/stay-bangkok-rooftop.webp" alt="Bangkok hotel skyline" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-jade/55 via-transparent to-transparent" />
            </div>
            <div className="p-6 sm:p-8">
              <p className="eyebrow">Stay for your route</p>
              <h2 className="font-display text-[2.75rem] font-semibold leading-[0.95] tracking-[-0.035em] text-jade">A “central” hotel is not always connected.</h2>
              <p className="mt-4 text-sm leading-7 text-charcoal/62">Check the actual station, river pier and late-evening return—not just the district name. A slightly quieter hotel beside useful transport often saves more time than a famous address.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/where-to-stay/bangkok/" className="inline-flex items-center gap-2 text-xs font-bold text-jade transition hover:text-saffron-dark">Compare Bangkok areas <ArrowRight size={15} /></Link>
                <a href={hotelsHref} target="_blank" rel={AFFILIATE_REL} className="inline-flex items-center gap-2 text-xs font-bold text-saffron-dark transition hover:text-jade">Check current hotel prices on Trip.com <ExternalLink size={14} /></a>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom grid items-center gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-jade/10 bg-jade/5 shadow-editorial-lift">
            <Image src="/images/redesign/bangkok-route-planning.webp" alt="Planning a Bangkok route using rail and river transport" fill sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover" />
          </div>
          <div>
            <p className="eyebrow">Move between clusters</p>
            <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.6rem]">Bangkok is partly walkable—not one long walk.</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-charcoal/62">Use rail for predictable modern-corridor trips, boats for selected old-city and riverside journeys, and road transport for the gaps. The best combination changes by neighbourhood.</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {transport.map(({ icon: Icon, title, copy }) => (
                <article key={title} className="rounded-xl border border-jade/10 bg-white p-4">
                  <Icon size={19} className="text-jade" strokeWidth={1.55} />
                  <h3 className="mt-3 font-display text-xl font-semibold text-jade">{title}</h3>
                  <p className="mt-2 text-[10px] leading-5 text-charcoal/55">{copy}</p>
                </article>
              ))}
            </div>
            <a href={transportHref} target="_blank" rel={AFFILIATE_REL} className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-jade transition hover:text-saffron-dark">Check current intercity transport on 12Go <ExternalLink size={14} /></a>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.5fr] lg:items-start lg:gap-14">
            <div>
              <p className="eyebrow">Before you go</p>
              <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">Small choices make Bangkok easier.</h2>
              <p className="mt-5 text-sm leading-7 text-charcoal/62">November through February is usually the easiest period for long outdoor days, but Bangkok works year-round when you plan shade, indoor breaks and flexible transfers.</p>
              <Link href="/city/bangkok/weather/" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-jade transition hover:text-saffron-dark"><CalendarDays size={15} /> See Bangkok weather by month <ArrowRight size={14} /></Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {practical.map(({ icon: Icon, title, copy }) => (
                <article key={title} className="rounded-xl border border-jade/10 bg-white p-5 shadow-[0_5px_18px_rgba(18,63,54,0.035)]">
                  <span className="grid h-10 w-10 place-items-center rounded-lg border border-jade/10 bg-jade/[0.025] text-jade"><Icon size={20} strokeWidth={1.55} /></span>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-jade">{title}</h3>
                  <p className="mt-2 text-[11px] leading-5 text-charcoal/57">{copy}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-9 rounded-2xl border border-jade/10 bg-white px-6 py-7 sm:px-8">
            <div className="grid gap-6 lg:grid-cols-[0.72fr_1.4fr] lg:items-center">
              <div>
                <p className="eyebrow">A useful pre-flight check</p>
                <h3 className="font-display text-[2.35rem] font-semibold leading-[0.95] text-jade">Keep the first 24 hours simple.</h3>
              </div>
              <ul className="grid gap-3 text-xs leading-5 text-charcoal/60 sm:grid-cols-2">
                {[
                  'Save the hotel name and address in Thai and English.',
                  'Check the final airport-to-hotel route on arrival day.',
                  'Install your eSIM and essential transport apps before leaving Wi-Fi.',
                  'Choose one nearby meal or walk instead of a full arrival-night itinerary.',
                ].map(item => <li key={item} className="flex gap-2.5"><Check size={15} className="mt-0.5 shrink-0 text-saffron-dark" />{item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-jade-dark py-12 text-white lg:py-16">
        <div className="container-custom grid gap-9 lg:grid-cols-[0.68fr_1.5fr] lg:items-center lg:gap-14">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-saffron-light">Continue planning</p>
            <h2 className="mt-3 font-display text-[3rem] font-semibold leading-[0.93] tracking-[-0.04em]">Build the rest of your Bangkok trip.</h2>
            <p className="mt-4 text-sm leading-7 text-white/64">Use the specialist owners for depth. The destination page keeps the city decision clear; each next guide answers one narrower task.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { icon: Compass, title: 'Bangkok attractions', copy: 'Temples, museums, neighbourhoods and quieter alternatives.', href: '/city/bangkok/attractions/' },
              { icon: Utensils, title: 'Food in Bangkok', copy: 'Districts, dishes, markets and an easier ordering strategy.', href: '/city/bangkok/food/' },
              { icon: BedDouble, title: 'Where to stay', copy: 'Choose an area by route, transport and evening mood.', href: '/where-to-stay/bangkok/' },
              { icon: Map, title: 'Thailand travel guide', copy: 'Connect Bangkok to the rest of the country without route overload.', href: '/thailand-travel-guide/' },
            ].map(({ icon: Icon, title, copy, href }) => (
              <Link key={title} href={href} className="group rounded-xl border border-white/12 bg-white/[0.07] p-5 transition hover:-translate-y-0.5 hover:border-saffron/45 hover:bg-white/[0.11]">
                <Icon size={20} className="text-saffron-light" strokeWidth={1.55} />
                <h3 className="mt-4 flex items-center justify-between font-display text-xl font-semibold">{title}<ArrowRight size={15} className="text-saffron-light transition-transform group-hover:translate-x-1" /></h3>
                <p className="mt-2 text-[10px] leading-5 text-white/55">{copy}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-9">
        <div className="container-custom flex flex-col gap-5 text-[10px] leading-5 text-charcoal/52 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <p className="font-bold uppercase tracking-[0.18em] text-jade">Editorial method</p>
            <p className="mt-2">This owner separates broad destination decisions from live venue, weather, hotel and transport inventory. Official destination material, current English SERPs and specialist transport or itinerary sources inform the structure; users should verify changing access and service details with the operator.</p>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 font-bold text-jade">
            <a href="https://www.tourismthailand.org/Destinations/Provinces/Bangkok/219" target="_blank" rel="noopener noreferrer nofollow" className="hover:text-saffron-dark">Tourism Authority of Thailand</a>
            <Link href="/editorial-policy/" className="hover:text-saffron-dark">Editorial policy</Link>
          </div>
        </div>
      </section>
    </>
  );
}
