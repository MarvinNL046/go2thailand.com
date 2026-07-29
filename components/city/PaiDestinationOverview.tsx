import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BedDouble,
  BusFront,
  CalendarDays,
  Check,
  CircleAlert,
  CloudSun,
  ExternalLink,
  Footprints,
  MapPin,
  Mountain,
  ShieldCheck,
  Soup,
  Sparkles,
  SunMedium,
  Trees,
  Waves,
} from 'lucide-react';
import { StoryDottedRoute } from '../visuals/StoryDottedRoute';

interface PaiDestinationOverviewProps {
  activitiesHref: string;
  hotelsHref: string;
  transportHref: string;
}

const AFFILIATE_REL = 'noopener noreferrer nofollow sponsored';

const tripShapes = [
  {
    icon: BedDouble,
    title: 'Two nights',
    label: 'Strong minimum',
    copy: 'Arrive without forcing a canyon sunset, keep one full valley day and leave after a second unhurried town evening.',
  },
  {
    icon: Trees,
    title: 'Three nights',
    label: 'Best first balance',
    copy: 'Adds weather margin and lets the south-valley, town and northern side become separate chapters instead of one road race.',
  },
  {
    icon: BusFront,
    title: 'No scooter',
    label: 'Completely workable',
    copy: 'Stay close to town, pre-plan one driver or organised valley day and keep evenings walkable. Do not let vehicle pressure make the decision.',
  },
  {
    icon: Waves,
    title: 'Riverside stay',
    label: 'Slower valley version',
    copy: 'Trade Walking Street convenience for morning quiet only after checking the transfer, evening return and food options around the stay.',
  },
] as const;

const valleyLayers = [
  {
    title: 'Use town as the first anchor',
    tag: 'Walkable core',
    copy: 'Walking Street and the compact centre make arrival easy, especially when you want dinner and an early night after the winding road.',
    image: '/images/redesign/pai-food-walking-street.webp',
    href: '/city/pai/top-10-restaurants/',
  },
  {
    title: 'Give Pai Canyon safe light',
    tag: 'South-valley route',
    copy: 'The exposed ridges need daylight, suitable footwear and personal limits. A famous sunset is not an instruction to crowd a narrow edge.',
    image: '/images/redesign/pai-canyon-route.webp',
    href: '/city/pai/attractions/',
  },
  {
    title: 'Choose one warm-water stop',
    tag: 'Hot-spring layer',
    copy: 'Hot-spring experiences vary by setting and current access. Check live conditions and choose one that fits the route rather than collecting them.',
    image: '/images/extra images/The shore of the river Pai.webp',
    href: '/city/pai/attractions/',
  },
  {
    title: 'Treat the north as a cultural route',
    tag: 'Santichon and valley',
    copy: 'Viewpoints and community visits deserve context and respectful behaviour, not a rushed costume-and-photo stop between unrelated pins.',
    image: '/images/redesign/pai-valley-riverside-v2.webp',
    href: '/city/pai/attractions/',
  },
] as const;

const itinerary = [
  {
    day: 'Arrival',
    title: 'Recover from the road',
    route: 'Check in → short town walk → dinner near Walking Street',
    note: 'The Chiang Mai–Pai journey is already a real travel block. Keep the first evening simple instead of attaching a late canyon run.',
  },
  {
    day: 'Day 2',
    title: 'Build one south-valley loop',
    route: 'One warm-water stop → slow lunch → Pai Canyon in safe light',
    note: 'Use a driver, organised route or suitable legal transport. Verify the actual stop order and do not make sunset the only acceptable outcome.',
  },
  {
    day: 'Day 3',
    title: 'Choose north or stillness',
    route: 'Santichon/Yun Lai OR riverside and town time',
    note: 'A third day works because it removes pressure. Pick a cultural and viewpoint route, or let the valley stay quiet before the onward journey.',
  },
] as const;

const mobility = [
  {
    icon: Footprints,
    title: 'Walk the centre',
    copy: 'The town core and evening food streets are the easiest no-vehicle layer. Choose accommodation by its real walking route, not a vague “Pai” address.',
  },
  {
    icon: BusFront,
    title: 'Shared or organised day',
    copy: 'Useful when you want several outer stops without driving. Compare group size, route order, time at each stop and the return after dark.',
  },
  {
    icon: MapPin,
    title: 'Private driver or local ride',
    copy: 'Best for a custom valley loop or riverside hotel. Arrange the return in advance and do not assume an app ride will appear in every outer location.',
  },
  {
    icon: ShieldCheck,
    title: 'Self-drive only when qualified',
    copy: 'Use the correct licence, insurance, helmet and experience. The mountain road and local conditions are not a beginner-rider attraction.',
  },
] as const;

const practical = [
  {
    icon: CircleAlert,
    title: 'Respect exposed canyon edges',
    copy: 'There are steep drops and narrow sections. Keep distance from edges and crowds, avoid poor visibility and turn back when footing feels wrong.',
  },
  {
    icon: CloudSun,
    title: 'Check northern air quality',
    copy: 'Haze can materially change views and outdoor comfort. Use live air-quality and weather information rather than a fixed seasonal promise.',
  },
  {
    icon: SunMedium,
    title: 'Verify hot-spring conditions',
    copy: 'Access, bathing areas, water conditions and site rules can change. Check the current operator or official information close to the visit.',
  },
  {
    icon: Sparkles,
    title: 'Visit communities as a guest',
    copy: 'Avoid reducing Santichon or local villages to a visual theme. Follow local rules, ask before close photography and spend with community businesses.',
  },
] as const;

export function PaiDestinationOverview({ activitiesHref, hotelsHref, transportHref }: PaiDestinationOverviewProps) {
  return (
    <>
      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom">
          <div className="mb-8 grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-14">
            <div>
              <p className="eyebrow">Choose the version of Pai</p>
              <h2 className="font-display text-[3.05rem] font-semibold leading-[0.9] tracking-[-0.04em] text-jade sm:text-[3.7rem]">
                A small town. A valley that needs a real plan.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-charcoal/62">
              Pai sits in Mae Hong Son province in northern Thailand, reached most commonly from Chiang Mai by a winding mountain route. The centre is compact; canyon, hot springs, viewpoints and village stops are not. Choose the transport and stay geography before the attraction list.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tripShapes.map(({ icon: Icon, title, label, copy }) => (
              <article key={title} className="rounded-xl border border-jade/10 bg-white p-5 shadow-[0_5px_18px_rgba(18,63,54,0.04)]">
                <span className="grid h-10 w-10 place-items-center rounded-lg border border-saffron/25 bg-saffron/[0.05] text-saffron-dark"><Icon size={20} strokeWidth={1.55} /></span>
                <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.18em] text-saffron-dark">{label}</p>
                <h3 className="mt-1 font-display text-2xl font-semibold text-jade">{title}</h3>
                <p className="mt-3 text-[11px] leading-5 text-charcoal/58">{copy}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-jade/10 bg-white px-5 py-4">
            <p className="text-xs leading-5 text-charcoal/56">
              <strong className="text-jade">Town or valley?</strong> Stay near the centre for walkable evenings and no-scooter convenience; move outward for quiet only after confirming every transfer.
            </p>
            <a href={hotelsHref} target="_blank" rel={AFFILIATE_REL} className="inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark">Check current hotel prices on Trip.com <ExternalLink size={14} /></a>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom">
          <div className="mb-7 flex items-end justify-between gap-5">
            <div>
              <p className="eyebrow">Four different rhythms</p>
              <h2 className="font-display text-[2.9rem] font-semibold leading-none tracking-[-0.04em] text-jade sm:text-[3.4rem]">Do not turn the valley into a pin race.</h2>
            </div>
            <Link href="/city/pai/attractions/" className="hidden items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark sm:flex">All Pai attractions <ArrowRight size={15} /></Link>
          </div>

          <div className="scrollbar-hide flex snap-x gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
            {valleyLayers.map(item => (
              <Link key={item.title} href={item.href} className="group min-w-[80vw] snap-start overflow-hidden rounded-xl border border-jade/10 bg-white shadow-[0_5px_18px_rgba(18,63,54,0.04)] transition hover:-translate-y-1 hover:shadow-xl sm:min-w-0">
                <div className="relative aspect-[4/2.9] overflow-hidden">
                  <Image src={item.image} alt={item.title} fill sizes="(min-width:1024px) 25vw, 80vw" className="object-cover transition duration-500 group-hover:scale-[1.035]" />
                  <span className="absolute left-3 top-3 rounded-md bg-jade/88 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.17em] text-white backdrop-blur">{item.tag}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-display text-[1.35rem] font-semibold leading-tight text-jade">{item.title}</h3>
                  <p className="mt-2 text-[11px] leading-5 text-charcoal/58">{item.copy}</p>
                  <span className="mt-4 flex items-center justify-between border-t border-jade/8 pt-3 text-[10px] font-bold text-jade">Open the guide <ArrowRight size={14} /></span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-jade/10 bg-white px-5 py-4">
            <p className="text-xs leading-5 text-charcoal/56"><strong className="text-jade">Comparing valley tours?</strong> Check transport type, canyon timing, cultural context and the real return time—not just the stop count.</p>
            <a href={activitiesHref} target="_blank" rel={AFFILIATE_REL} className="inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark">Check current Pai options on Klook <ExternalLink size={14} /></a>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-2xl bg-jade-dark text-white shadow-editorial-lift">
            <Image src="/images/redesign/pai-canyon-route.webp" alt="Pai Canyon and the mountain valley in safe daylight" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-jade-dark via-jade-dark/86 to-jade-dark/10" />
            <div className="relative grid min-h-[405px] items-center gap-8 px-7 py-10 sm:px-10 lg:grid-cols-[0.74fr_1.2fr] lg:px-14">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-saffron-light">Arrival before attractions</p>
                <h2 className="mt-3 max-w-md font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] sm:text-[3.7rem]">The mountain road is part of day one.</h2>
                <p className="mt-5 max-w-md text-sm leading-7 text-white/70">
                  Compare the complete Chiang Mai–Pai journey, motion-sickness needs, pickup point and town transfer before choosing the cheapest-looking seat. Do not plan an exposed-edge sunset as if arrival time were guaranteed.
                </p>
              </div>
              <div className="relative hidden min-h-[250px] lg:block">
                <StoryDottedRoute className="absolute left-0 top-14 h-40 w-72 opacity-90" />
                <div className="absolute right-0 top-0 grid w-[390px] grid-cols-2 gap-3">
                  {['Pickup point', 'Mountain road', 'Town check-in', 'Simple evening'].map((label, index) => (
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
        <div className="container-custom grid gap-10 lg:grid-cols-[0.55fr_1.8fr] lg:gap-14">
          <div>
            <p className="eyebrow">A realistic first visit</p>
            <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">Three nights, with one real valley day.</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/62">Two nights can work. Three makes the winding arrival, one outer-valley route and the town itself feel like separate experiences.</p>
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
        <div className="container-custom grid items-center gap-9 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-jade/10 shadow-editorial-lift">
            <Image src="/images/redesign/pai-valley-riverside-v2.webp" alt="Quiet riverside footbridge and rice fields in the Pai valley" fill sizes="48vw" className="object-cover" />
          </div>
          <div>
            <p className="eyebrow">Pai without a scooter</p>
            <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.6rem]">Build around a walkable evening and one planned outer day.</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/62">
              You do not need to ride to enjoy Pai. The strong no-scooter version uses a central base, a pre-booked valley loop and a deliberate transfer for any remote riverside stay.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {mobility.map(({ icon: Icon, title, copy }) => (
                <article key={title} className="rounded-xl border border-jade/10 bg-white p-4">
                  <Icon size={19} className="text-jade" strokeWidth={1.55} />
                  <h3 className="mt-3 font-display text-xl font-semibold text-jade">{title}</h3>
                  <p className="mt-2 text-[10px] leading-5 text-charcoal/55">{copy}</p>
                </article>
              ))}
            </div>
            <a href={transportHref} target="_blank" rel={AFFILIATE_REL} className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark">Check current Chiang Mai–Pai routes on 12Go <ExternalLink size={14} /></a>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom grid gap-5 lg:grid-cols-2">
          <article className="overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-[0_6px_22px_rgba(18,63,54,0.045)]">
            <div className="relative aspect-[16/8.5]"><Image src="/images/redesign/pai-valley-riverside-v2.webp" alt="Riverside stay landscape in the Pai valley" fill sizes="50vw" className="object-cover" /></div>
            <div className="p-6 sm:p-8">
              <p className="eyebrow">Stay geography changes the trip</p>
              <h2 className="font-display text-[2.75rem] font-semibold leading-[0.95] tracking-[-0.035em] text-jade">Quiet outside town has a transport cost.</h2>
              <p className="mt-4 text-sm leading-7 text-charcoal/62">A valley or river stay can be the best version of Pai, but only when the hotel transfer, evening food and next departure are clear before booking.</p>
              <a href={hotelsHref} target="_blank" rel={AFFILIATE_REL} className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark">Check current Pai hotel prices on Trip.com <ExternalLink size={14} /></a>
            </div>
          </article>
          <article className="overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-[0_6px_22px_rgba(18,63,54,0.045)]">
            <div className="relative aspect-[16/8.5]"><Image src="/images/redesign/pai-food-walking-street.webp" alt="Northern Thai food near Pai Walking Street" fill sizes="50vw" className="object-cover" /></div>
            <div className="p-6 sm:p-8">
              <p className="eyebrow">Keep the food layer specific</p>
              <h2 className="font-display text-[2.75rem] font-semibold leading-[0.95] tracking-[-0.035em] text-jade">Walking Street is an evening anchor, not all of Pai food.</h2>
              <p className="mt-4 text-sm leading-7 text-charcoal/62">Use the market for an easy first orientation, then make room for one Northern Thai meal beyond snacks and café stops.</p>
              <Link href="/city/pai/top-10-restaurants/" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark"><Soup size={15} /> Plan where to eat in Pai <ArrowRight size={15} /></Link>
            </div>
          </article>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.5fr] lg:gap-14">
            <div>
              <p className="eyebrow">Before you go</p>
              <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">Keep the valley beautiful without selling away the risks.</h2>
              <p className="mt-5 text-sm leading-7 text-charcoal/62">Pai is easy to romanticise. A useful guide stays honest about exposed trails, northern haze, live site conditions and the responsibility of entering local communities.</p>
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
                <p className="eyebrow">Useful arrival reset</p>
                <h3 className="font-display text-[2.35rem] font-semibold leading-[0.95] text-jade">Let the first Pai evening be uneventful.</h3>
              </div>
              <ul className="grid gap-3 text-xs leading-5 text-charcoal/60 sm:grid-cols-2">
                {[
                  'Save the exact hotel pin and final transfer plan.',
                  'Choose tomorrow’s south or north valley geography.',
                  'Arrange any driver or tour before the outer route.',
                  'Check weather, air quality and canyon visibility.',
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
            <h2 className="mt-3 font-display text-[3rem] font-semibold leading-[0.93] tracking-[-0.04em]">Build the rest of your Pai trip.</h2>
            <p className="mt-5 text-sm leading-7 text-white/65">Use the specialist owners for individual stops, stay choices and seasonal detail without turning this broad owner into a brittle timetable.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { icon: Mountain, title: 'Things to do', copy: 'Canyon, warm-water stops, temples and valley routes.', href: '/city/pai/attractions/' },
              { icon: BedDouble, title: 'Where to stay', copy: 'Compare the walkable centre, river and outer valley.', href: '/best-hotels/pai/' },
              { icon: CalendarDays, title: 'Season planning', copy: 'Plan heat, rain, haze, views and road comfort inside the destination owner.', href: '/city/pai/' },
            ].map(({ icon: Icon, title, copy, href }) => (
              <Link key={title} href={href} className="group rounded-xl border border-white/12 bg-white/[0.07] p-5 backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/[0.11]">
                <Icon size={18} className="text-saffron-light" strokeWidth={1.55} />
                <h3 className="mt-4 font-display text-2xl font-semibold">{title}</h3>
                <p className="mt-2 min-h-10 text-[10px] leading-5 text-white/57">{copy}</p>
                <span className="mt-5 flex items-center justify-between text-[10px] font-bold text-saffron-light">Open guide <ArrowRight size={14} className="transition group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
