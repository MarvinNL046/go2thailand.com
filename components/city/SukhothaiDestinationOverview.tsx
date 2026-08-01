import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BedDouble,
  Bike,
  BusFront,
  CalendarDays,
  Check,
  Clock3,
  ExternalLink,
  Footprints,
  Landmark,
  Map,
  MapPin,
  Route,
  Soup,
  Sparkles,
  SunMedium,
  Trees,
} from 'lucide-react';
import { StoryDottedRoute } from '../visuals/StoryDottedRoute';

interface SukhothaiDestinationOverviewProps {
  activitiesHref: string;
  hotelsHref: string;
  transportHref: string;
}

const AFFILIATE_REL = 'noopener noreferrer nofollow sponsored';

const tripShapes = [
  {
    icon: Clock3,
    title: 'One focused day',
    label: 'Central zone first',
    copy: 'Use the central park as one coherent loop, then add Wat Si Chum only if daylight, heat and energy still make sense.',
  },
  {
    icon: BedDouble,
    title: 'One night nearby',
    label: 'Best short visit',
    copy: 'Stay around Mueang Kao for an early or late park session and a calmer meal after the day-trippers leave.',
  },
  {
    icon: Route,
    title: 'Two full days',
    label: 'Strong first balance',
    copy: 'Separate the central loop from the north or west zones, with time for local food and the city-versus-park geography.',
  },
  {
    icon: Trees,
    title: 'Add Si Satchanalai',
    label: 'Deeper heritage trip',
    copy: 'Give the second historical landscape its own day. It adds real context, but becomes thin when squeezed into a rushed park afternoon.',
  },
] as const;

const parkLayers = [
  {
    title: 'Read the central zone first',
    tag: 'Orientation loop',
    copy: 'Wat Mahathat, Wat Sa Si, ponds and city walls establish the scale and visual language of the old capital.',
    image: '/images/redesign/sukhothai-cycling-central.webp',
    href: '/city/sukhothai/attractions/sukhothai-historical-park/',
  },
  {
    title: 'Meet Wat Si Chum slowly',
    tag: 'North zone',
    copy: 'The monumental seated Buddha deserves a deliberate stop, not a photo sprint between unrelated ruins.',
    image: '/images/redesign/sukhothai-wat-si-chum.webp',
    href: '/city/sukhothai/attractions/wat-si-chum/',
  },
  {
    title: 'Climb only with margin',
    tag: 'West zone',
    copy: 'Wat Saphan Hin changes the perspective from monuments to landscape; heat, light and the return journey matter here.',
    image: '/images/cities/sukhothai/attractions/Wat Saphan Hin.webp',
    href: '/city/sukhothai/attractions/wat-saphan-hin/',
  },
  {
    title: 'Treat Si Satchanalai as a second story',
    tag: 'Separate heritage day',
    copy: 'Its forested ruins and ceramic history deepen the Sukhothai-era story when they receive their own route and transport plan.',
    image: '/images/redesign/sukhothai-si-satchanalai.webp',
    href: '/city/sukhothai/attractions/si-satchanalai-historical-park/',
  },
] as const;

const itinerary = [
  {
    day: 'Day 1',
    title: 'Understand the old city',
    route: 'Ramkhamhaeng museum context → central zone → Wat Si Chum',
    note: 'Start with the city plan and material culture, then let the monuments build on that context. Move Wat Si Chum to day two if the afternoon becomes rushed.',
  },
  {
    day: 'Day 2',
    title: 'Choose depth, not volume',
    route: 'West-zone landscape OR Si Satchanalai',
    note: 'The west adds a different view of the old capital; Si Satchanalai is a separate historical landscape. Trying to do both weakens both.',
  },
  {
    day: 'Evenings',
    title: 'Keep room for Sukhothai food',
    route: 'Noodles → one regional dish → a quiet old-city evening',
    note: 'Local food is a reason to stay, not filler between temples. Match dinner to your hotel area so the day does not end with another long transfer.',
  },
] as const;

const movement = [
  {
    icon: Bike,
    title: 'Bicycle',
    copy: 'A natural fit for the flatter central zone when heat and mobility allow. Use a lock, carry water and do not assume every outer road feels equally relaxed.',
  },
  {
    icon: Footprints,
    title: 'Walking',
    copy: 'Works for selected central monuments, but the complete park and the gap between New Sukhothai and Mueang Kao are not one walkable centre.',
  },
  {
    icon: MapPin,
    title: 'Local rides',
    copy: 'Useful between the new town, old city and outer zones when available. Confirm the return rather than relying on a pickup appearing later.',
  },
  {
    icon: BusFront,
    title: 'Driver or organised route',
    copy: 'The clearest choice for Si Satchanalai or an arrival-day transfer. Compare actual time at the sites, not only the number of advertised stops.',
  },
] as const;

const practical = [
  {
    icon: SunMedium,
    title: 'Design around the heat',
    copy: 'Use morning and late afternoon for longer loops. Keep a shaded midday block rather than making temples compete with physical fatigue.',
  },
  {
    icon: Landmark,
    title: 'Remember these are sacred landscapes',
    copy: 'Dress and behave respectfully around active worship, Buddha images and protected ruins. Follow current signs and staff instructions.',
  },
  {
    icon: Map,
    title: 'Check the live zone setup',
    copy: 'Entrances, transport, bicycle access and opening arrangements can change. Verify current park information close to the visit.',
  },
  {
    icon: CalendarDays,
    title: 'Treat festival dates separately',
    copy: 'Loy Krathong can transform demand and crowd patterns. Confirm official dates and reserve transport and stays earlier if it is central to the trip.',
  },
] as const;

export function SukhothaiDestinationOverview({ activitiesHref, hotelsHref, transportHref }: SukhothaiDestinationOverviewProps) {
  return (
    <>
      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom">
          <div className="mb-8 grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-14">
            <div>
              <p className="eyebrow">Choose the right depth</p>
              <h2 className="font-display text-[3.05rem] font-semibold leading-[0.9] tracking-[-0.04em] text-jade sm:text-[3.7rem]">
                One old capital. Several very different trips.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-charcoal/62">
              Sukhothai works best when the UNESCO old city remains the centre. Decide first whether you have one focused park day, an old-city overnight or enough time for a separate Si Satchanalai route.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tripShapes.map(({ icon: Icon, title, label, copy }) => (
              <article key={title} className="rounded-xl border border-jade/10 bg-white p-5 shadow-[0_5px_18px_rgba(18,63,54,0.04)]">
                <span className="grid h-10 w-10 place-items-center rounded-lg border border-saffron/25 bg-saffron/[0.05] text-saffron-dark">
                  <Icon size={20} strokeWidth={1.55} />
                </span>
                <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.18em] text-saffron-dark">{label}</p>
                <h3 className="mt-1 font-display text-2xl font-semibold text-jade">{title}</h3>
                <p className="mt-3 text-[11px] leading-5 text-charcoal/58">{copy}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-jade/10 bg-white px-5 py-4">
            <p className="text-xs leading-5 text-charcoal/56">
              <strong className="text-jade">Old city or new town?</strong> Mueang Kao is strongest for park access; New Sukhothai is a practical road-transport and local-food base. They are separate places, not adjacent neighbourhoods.
            </p>
            <a href={hotelsHref} target="_blank" rel={AFFILIATE_REL} className="inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark">
              Check current hotel prices on Trip.com <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom">
          <div className="mb-7 flex items-end justify-between gap-5">
            <div>
              <p className="eyebrow">Four heritage layers</p>
              <h2 className="font-display text-[2.9rem] font-semibold leading-none tracking-[-0.04em] text-jade sm:text-[3.4rem]">
                Read the landscape in the right order.
              </h2>
            </div>
            <Link href="/city/sukhothai/attractions/" className="hidden items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark sm:flex">
              All Sukhothai attractions <ArrowRight size={15} />
            </Link>
          </div>

          <div className="scrollbar-hide flex snap-x gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
            {parkLayers.map(item => (
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
            <p className="text-xs leading-5 text-charcoal/56">
              <strong className="text-jade">Comparing tours?</strong> Check whether the route distinguishes central, north and west zones, and how much time is actually spent inside the park.
            </p>
            <a href={activitiesHref} target="_blank" rel={AFFILIATE_REL} className="inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark">
              Check current Sukhothai options on Klook <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-2xl bg-jade-dark text-white shadow-editorial-lift">
            <Image src="/images/redesign/sukhothai-cycling-central.webp" alt="Bicycle route through Sukhothai Historical Park" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-jade-dark via-jade-dark/86 to-jade-dark/12" />
            <div className="relative grid min-h-[405px] items-center gap-8 px-7 py-10 sm:px-10 lg:grid-cols-[0.74fr_1.2fr] lg:px-14">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-saffron-light">The first-loop route</p>
                <h2 className="mt-3 max-w-md font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] sm:text-[3.7rem]">Let the central zone teach you how to look.</h2>
                <p className="mt-5 max-w-md text-sm leading-7 text-white/70">
                  Begin with the city walls and museum context, then move through Wat Mahathat and Wat Sa Si before adding an outer zone. The sequence turns isolated ruins into one legible capital.
                </p>
              </div>
              <div className="relative hidden min-h-[250px] lg:block">
                <StoryDottedRoute className="absolute left-0 top-14 h-40 w-72 opacity-90" />
                <div className="absolute right-0 top-0 grid w-[390px] grid-cols-2 gap-3">
                  {['Museum context', 'Wat Mahathat', 'Wat Sa Si', 'Wat Si Chum'].map((label, index) => (
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
            <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">Two days, with space between the ruins.</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/62">
              One day can introduce Sukhothai. Two days gives the old capital, one deeper heritage choice and the local-food layer enough room to feel distinct.
            </p>
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
        <div className="container-custom grid gap-5 lg:grid-cols-2">
          <article className="overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-[0_6px_22px_rgba(18,63,54,0.045)]">
            <div className="relative aspect-[16/8.5]">
              <Image src="/images/redesign/sukhothai-si-satchanalai.webp" alt="Forested ruins at Si Satchanalai Historical Park" fill sizes="50vw" className="object-cover" />
            </div>
            <div className="p-6 sm:p-8">
              <p className="eyebrow">A second historical landscape</p>
              <h2 className="font-display text-[2.75rem] font-semibold leading-[0.95] tracking-[-0.035em] text-jade">Si Satchanalai earns a separate day.</h2>
              <p className="mt-4 text-sm leading-7 text-charcoal/62">
                The quieter forest setting and ceramic history add a real second chapter. Verify transport both ways before committing; this is not a casual outer-zone detour.
              </p>
              <a href={transportHref} target="_blank" rel={AFFILIATE_REL} className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark">
                Check current Sukhothai transport on 12Go <ExternalLink size={14} />
              </a>
            </div>
          </article>

          <article className="overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-[0_6px_22px_rgba(18,63,54,0.045)]">
            <div className="relative aspect-[16/8.5]">
              <Image src="/images/redesign/sukhothai-noodles.webp" alt="A bowl of Sukhothai noodles with regional garnishes" fill sizes="50vw" className="object-cover" />
            </div>
            <div className="p-6 sm:p-8">
              <p className="eyebrow">The reason to keep an evening</p>
              <h2 className="font-display text-[2.75rem] font-semibold leading-[0.95] tracking-[-0.035em] text-jade">Sukhothai food is part of the destination.</h2>
              <p className="mt-4 text-sm leading-7 text-charcoal/62">
                Start with Sukhothai noodles, then add one broader regional meal or traditional sweet. The food layer is stronger when it supports the route rather than becoming another ranking checklist.
              </p>
              <Link href="/city/sukhothai/top-10-restaurants/" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark">
                <Soup size={15} /> Plan where to eat in Sukhothai <ArrowRight size={15} />
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom grid items-center gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-jade/10 shadow-editorial-lift">
            <Image src="/images/redesign/sukhothai-cycling-central.webp" alt="Cycling route in the central zone of Sukhothai Historical Park" fill sizes="48vw" className="object-cover" />
          </div>
          <div>
            <p className="eyebrow">Old city, new town, outer park</p>
            <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.6rem]">Plan the gaps before choosing the wheels.</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/62">
              The central zone can feel wonderfully compact; the complete destination is not. Your hotel, outer-zone plan and next-city connection determine the most useful transport mix.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {movement.map(({ icon: Icon, title, copy }) => (
                <article key={title} className="rounded-xl border border-jade/10 bg-white p-4">
                  <Icon size={19} className="text-jade" strokeWidth={1.55} />
                  <h3 className="mt-3 font-display text-xl font-semibold text-jade">{title}</h3>
                  <p className="mt-2 text-[10px] leading-5 text-charcoal/55">{copy}</p>
                </article>
              ))}
            </div>
            <a href={transportHref} target="_blank" rel={AFFILIATE_REL} className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark">
              Check current routes to Sukhothai on 12Go <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.5fr] lg:gap-14">
            <div>
              <p className="eyebrow">Before you go</p>
              <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">Protect the pace and the place.</h2>
              <p className="mt-5 text-sm leading-7 text-charcoal/62">
                The best Sukhothai day is not the one with the most temples. It is the one that keeps historical context, comfort and respectful behaviour intact.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {practical.map(({ icon: Icon, title, copy }) => (
                <article key={title} className="rounded-xl border border-jade/10 bg-white p-5 shadow-[0_5px_18px_rgba(18,63,54,0.035)]">
                  <span className="grid h-10 w-10 place-items-center rounded-lg border border-jade/10 bg-jade/[0.025] text-jade">
                    <Icon size={20} strokeWidth={1.55} />
                  </span>
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
                <h3 className="font-display text-[2.35rem] font-semibold leading-[0.95] text-jade">Make the first Sukhothai evening do less.</h3>
              </div>
              <ul className="grid gap-3 text-xs leading-5 text-charcoal/60 sm:grid-cols-2">
                {[
                  'Confirm whether the hotel is in New Sukhothai or Mueang Kao.',
                  'Save tomorrow’s exact park entrance and first stop.',
                  'Choose central plus north, or central plus west—not everything.',
                  'Check the next-city connection before adding Si Satchanalai.',
                ].map(item => (
                  <li key={item} className="flex gap-2.5"><Check size={15} className="mt-0.5 shrink-0 text-saffron-dark" />{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-jade-dark py-12 text-white lg:py-16">
        <div className="container-custom grid gap-9 lg:grid-cols-[0.68fr_1.5fr] lg:items-center lg:gap-14">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-saffron-light">Continue planning</p>
            <h2 className="mt-3 font-display text-[3rem] font-semibold leading-[0.93] tracking-[-0.04em]">Build the rest of your Sukhothai trip.</h2>
            <p className="mt-5 text-sm leading-7 text-white/65">
              Use the specialist guides for individual ruins, stay geography and seasonal detail without turning the broad destination owner into a brittle timetable.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { icon: Sparkles, title: 'Things to do', copy: 'Central, north, west and Si Satchanalai routes.', href: '/city/sukhothai/attractions/' },
              { icon: BedDouble, title: 'Where to stay', copy: 'Compare Mueang Kao, New Sukhothai and airport-side stays.', href: '/best-hotels/sukhothai/' },
              { icon: CalendarDays, title: 'Weather', copy: 'Plan heat, rain, cycling comfort and festival pressure.', href: '/city/sukhothai/weather/' },
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
