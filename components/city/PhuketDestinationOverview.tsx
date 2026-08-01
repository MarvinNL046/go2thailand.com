import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  BusFront,
  CalendarDays,
  Check,
  Compass,
  ExternalLink,
  Footprints,
  Map,
  MapPin,
  MoonStar,
  Route,
  ShieldCheck,
  Soup,
  Utensils,
  Waves,
} from "lucide-react";
import { StoryDottedRoute } from "../visuals/StoryDottedRoute";

interface PhuketDestinationOverviewProps {
  activitiesHref: string;
  hotelsHref: string;
  transportHref: string;
}

const AFFILIATE_REL = "noopener noreferrer nofollow sponsored";

const zones = [
  {
    title: "Patong",
    label: "Nightlife & convenience",
    copy: "Choose Patong when nightlife, dense dining and tour pickup convenience lead the trip. It is energetic and practical, but not the island’s quiet-beach default.",
    image: "/images/redesign/phuket-stay-patong.webp",
  },
  {
    title: "Kata & Karon",
    label: "Classic first beach stay",
    copy: "A balanced first choice for sand, restaurants and a holiday rhythm that is calmer than Patong without feeling remote.",
    image: "/images/redesign/phuket-stay-kata-karon.webp",
  },
  {
    title: "Kamala",
    label: "Quieter west coast",
    copy: "Useful for couples and families who want a smaller beach zone and are comfortable riding elsewhere for wider evening choice.",
    image: "/images/redesign/phuket-stay-kamala.webp",
  },
  {
    title: "Bang Tao",
    label: "Resort-led comfort",
    copy: "Best suited to upscale resorts, beach clubs and a self-contained stay. Check the exact pin because the wider area stretches well beyond one walkable centre.",
    image: "/images/redesign/phuket-stay-bang-tao.webp",
  },
  {
    title: "Rawai & Nai Harn",
    label: "South-island rhythm",
    copy: "A slower base for longer stays, seafood and southern viewpoints. Rawai itself is more of a local waterfront than a classic swimming beach.",
    image: "/images/redesign/phuket-stay-rawai-nai-harn.webp",
  },
  {
    title: "Phuket Old Town",
    label: "Food & heritage",
    copy: "Choose town for Sino-Portuguese streets, serious local food and urban texture. It works as a culture base, not as a doorstep beach holiday.",
    image: "/images/redesign/phuket-stay-old-town.webp",
  },
] as const;

const experiences = [
  {
    title: "Build a real beach day",
    tag: "West coast",
    copy: "Pick one beach for swimming and downtime instead of turning the coast into a sequence of short photo stops. Conditions matter more than collecting names.",
    image: "/images/cities/phuket/attractions/Kata Beach.webp",
    href: "/city/phuket/attractions/",
  },
  {
    title: "Give Old Town its own block",
    tag: "Food & heritage",
    copy: "Architecture, shrines, markets and Phuket-style dishes deserve a half-day or evening without a rushed transfer from the far west coast.",
    image: "/images/cities/phuket/attractions/Phuket Old Town2.webp",
    href: "/city/phuket/attractions/phuket-old-town/",
  },
  {
    title: "Choose one boat geography",
    tag: "Andaman day",
    copy: "Phi Phi and Phang Nga Bay solve different moods. Select by scenery, sea conditions, group format and transfer burden—not fame alone.",
    image: "/images/redesign/phuket-attraction-phang-nga.webp",
    href: "/city/phuket/attractions/",
  },
  {
    title: "Connect temples and viewpoints",
    tag: "Island interior",
    copy: "Wat Chalong and southern viewpoints form a better road cluster than isolated cross-island detours. Check current access before leaving.",
    image: "/images/redesign/phuket-attraction-wat-chalong.webp",
    href: "/city/phuket/attractions/",
  },
] as const;

const itinerary = [
  {
    day: "Day 1",
    title: "Settle into one coast",
    route: "Chosen beach → local dinner → one easy evening",
    note: "Keep arrival day local. A west-coast hotel and Old Town may look close on a map but traffic can consume the first evening.",
  },
  {
    day: "Day 2",
    title: "Old Town & island interior",
    route: "Old Town food walk → Wat Chalong → chosen south or west viewpoint",
    note: "Start with town before the midday heat, then follow one road cluster rather than crossing the island repeatedly.",
  },
  {
    day: "Day 3",
    title: "One serious boat day",
    route: "Phi Phi, Phang Nga Bay or a quieter local route",
    note: "Choose the geography and boat format in advance. Keep the evening deliberately light after an early start and a full day at sea.",
  },
  {
    day: "Day 4",
    title: "Beach time without a checklist",
    route: "Slow morning → one optional activity → final sunset",
    note: "Leave room for weather changes, swimming conditions and the beach or neighbourhood you actually enjoyed most.",
  },
] as const;

const transport = [
  {
    icon: Footprints,
    title: "Walking",
    copy: "Useful inside Old Town and individual beach zones. It is not a credible island-wide transport plan.",
  },
  {
    icon: BusFront,
    title: "Local bus & smart bus",
    copy: "Helpful on selected corridors when timing and stops fit. Confirm the current route rather than assuming every beach connects directly.",
  },
  {
    icon: MapPin,
    title: "Taxi & ride-hailing",
    copy: "Practical for door-to-door gaps. Compare pickup, traffic and the return plan before committing to a distant dinner or sunset.",
  },
  {
    icon: Route,
    title: "Scooter or rental car",
    copy: "Only for properly licensed and insured drivers with suitable experience. Rain, hills and unfamiliar traffic raise the risk quickly.",
  },
] as const;

const practical = [
  {
    icon: Waves,
    title: "Respect the sea",
    copy: "Red flags and rough-season conditions are instructions, not background decoration. Boat and swimming plans need live checks.",
  },
  {
    icon: ShieldCheck,
    title: "Verify changing access",
    copy: "Viewpoints, construction, ceremonies and attraction access can change. Check official or operator information close to the visit.",
  },
  {
    icon: Soup,
    title: "Eat Phuket, not generic Thai",
    copy: "Old Town rewards a route through mee Hokkien, moo hong, roti and local sweets rather than another resort-default menu.",
  },
  {
    icon: MoonStar,
    title: "Choose one evening mood",
    copy: "Patong nightlife, Old Town food, a beach sunset and a resort evening each belong to different parts of the island.",
  },
] as const;

export function PhuketDestinationOverview({
  activitiesHref,
  hotelsHref,
  transportHref,
}: PhuketDestinationOverviewProps) {
  return (
    <>
      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom">
          <div className="mb-8 grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-14">
            <div>
              <p className="eyebrow">Choose your Phuket</p>
              <h2 className="font-display text-[3.05rem] font-semibold leading-[0.9] tracking-[-0.04em] text-jade sm:text-[3.7rem]">
                Your beach zone sets the pace.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-charcoal/62">
              Phuket is Thailand’s largest island and a province, while Phuket
              Town is its urban centre. Start with the coast or town experience
              you want every morning, then choose a base that prevents daily
              cross-island travel.
            </p>
          </div>
          <div className="scrollbar-hide flex snap-x gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3">
            {zones.map((zone) => (
              <article
                key={zone.title}
                className="min-w-[80vw] snap-start overflow-hidden rounded-xl border border-jade/10 bg-white shadow-[0_5px_18px_rgba(18,63,54,0.04)] sm:min-w-0"
              >
                <div className="relative aspect-[16/7.2]">
                  <Image
                    src={zone.image}
                    alt={`${zone.title}, Phuket`}
                    fill
                    sizes="(min-width:1024px) 33vw, 80vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-saffron-dark">
                    {zone.label}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-semibold text-jade">
                    {zone.title}
                  </h3>
                  <p className="mt-3 text-[11px] leading-5 text-charcoal/58">
                    {zone.copy}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-jade/10 bg-white px-5 py-4">
            <p className="text-xs leading-5 text-charcoal/56">
              <strong className="text-jade">
                Check the pin, not only the area name.
              </strong>{" "}
              Large resort districts can contain very different walking and
              transfer realities.
            </p>
            <a
              href={hotelsHref}
              target="_blank"
              rel={AFFILIATE_REL}
              className="inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark"
            >
              Check current hotel prices on Trip.com <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom">
          <div className="mb-7 flex items-end justify-between gap-5">
            <div>
              <p className="eyebrow">Four different island rhythms</p>
              <h2 className="font-display text-[2.9rem] font-semibold leading-none tracking-[-0.04em] text-jade sm:text-[3.4rem]">
                Phuket beyond one famous beach.
              </h2>
            </div>
            <Link
              href="/city/phuket/attractions/"
              className="hidden items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark sm:flex"
            >
              All Phuket attractions <ArrowRight size={15} />
            </Link>
          </div>
          <div className="scrollbar-hide flex snap-x gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
            {experiences.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group min-w-[80vw] snap-start overflow-hidden rounded-xl border border-jade/10 bg-white shadow-[0_5px_18px_rgba(18,63,54,0.04)] transition hover:-translate-y-1 hover:shadow-xl sm:min-w-0"
              >
                <div className="relative aspect-[4/2.9] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width:1024px) 25vw, 80vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.035]"
                  />
                  <span className="absolute left-3 top-3 rounded-md bg-jade/88 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.17em] text-white backdrop-blur">
                    {item.tag}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-display text-[1.35rem] font-semibold leading-tight text-jade">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[11px] leading-5 text-charcoal/58">
                    {item.copy}
                  </p>
                  <span className="mt-4 flex items-center justify-between border-t border-jade/8 pt-3 text-[10px] font-bold text-jade">
                    Open the guide <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-jade/10 bg-white px-5 py-4">
            <p className="text-xs leading-5 text-charcoal/56">
              <strong className="text-jade">Comparing boat days?</strong> Check
              route, boat size, pickup and cancellation conditions—not only the
              headline islands.
            </p>
            <a
              href={activitiesHref}
              target="_blank"
              rel={AFFILIATE_REL}
              className="inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark"
            >
              Check current options on Klook <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-2xl bg-jade-dark text-white shadow-editorial-lift">
            <Image
              src="/images/redesign/phuket-zones-banner.webp"
              alt="Phuket coast, Old Town and island routes"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-jade-dark via-jade-dark/88 to-jade-dark/15" />
            <div className="relative grid min-h-[390px] items-center gap-8 px-7 py-10 sm:px-10 lg:grid-cols-[0.72fr_1.2fr] lg:px-14">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-saffron-light">
                  The one-crossing rule
                </p>
                <h2 className="mt-3 max-w-md font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] sm:text-[3.7rem]">
                  Cross the island once. Finish a whole cluster.
                </h2>
                <p className="mt-5 max-w-md text-sm leading-7 text-white/70">
                  Link Old Town with Wat Chalong and a southern viewpoint, or
                  keep a west-coast day around one beach zone. Repeated
                  east–west transfers flatten the island into traffic.
                </p>
              </div>
              <div className="relative hidden min-h-[250px] lg:block">
                <StoryDottedRoute className="absolute left-0 top-14 h-40 w-72 opacity-90" />
                <div className="absolute right-0 top-0 grid w-[390px] grid-cols-2 gap-3">
                  {[
                    "West-coast base",
                    "Old Town food",
                    "Temple + viewpoint",
                    "Chosen boat pier",
                  ].map((label, index) => (
                    <div
                      key={label}
                      className="rounded-xl border border-white/15 bg-white/[0.09] p-4 backdrop-blur-sm"
                    >
                      <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-saffron-light">
                        Cluster {index + 1}
                      </span>
                      <strong className="mt-1.5 block font-display text-lg font-semibold">
                        {label}
                      </strong>
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
            <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">
              Four days, without island whiplash.
            </h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/62">
              Four full days give Phuket room for beach time, Old Town, one
              interior route and one boat day. Add days for rest or another
              coast—not to double the transfers.
            </p>
          </div>
          <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="pointer-events-none absolute left-8 right-8 top-8 hidden border-t border-dashed border-saffron/55 lg:block" />
            {itinerary.map((item, index) => (
              <article
                key={item.day}
                className="relative rounded-xl border border-jade/10 bg-white p-5 shadow-[0_5px_18px_rgba(18,63,54,0.035)]"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full border border-saffron/45 bg-[#fcfaf6] text-[10px] font-extrabold text-saffron-dark">
                  {index + 1}
                </span>
                <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.18em] text-saffron-dark">
                  {item.day}
                </p>
                <h3 className="mt-1 font-display text-2xl font-semibold text-jade">
                  {item.title}
                </h3>
                <p className="mt-4 text-xs font-bold leading-5 text-jade">
                  {item.route}
                </p>
                <p className="mt-3 text-[11px] leading-5 text-charcoal/56">
                  {item.note}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom grid gap-5 lg:grid-cols-2">
          <article className="overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-[0_6px_22px_rgba(18,63,54,0.045)]">
            <div className="relative aspect-[16/8.5]">
              <Image
                src="/images/redesign/phuket-food-kopitiam.webp"
                alt="Local Phuket food in Old Town"
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
            <div className="p-6 sm:p-8">
              <p className="eyebrow">Eat the island’s history</p>
              <h2 className="font-display text-[2.75rem] font-semibold leading-[0.95] tracking-[-0.035em] text-jade">
                Old Town is a food route, not a token stop.
              </h2>
              <p className="mt-4 text-sm leading-7 text-charcoal/62">
                Phuket’s Chinese, Malay and Southern Thai influences show up in
                mee Hokkien, moo hong, roti breakfasts and local sweets. Use the
                dedicated owner for dishes and neighbourhood stops.
              </p>
              <Link
                href="/city/phuket/food/"
                className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark"
              >
                Plan where to eat in Phuket <ArrowRight size={15} />
              </Link>
            </div>
          </article>
          <article className="overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-[0_6px_22px_rgba(18,63,54,0.045)]">
            <div className="relative aspect-[16/8.5]">
              <Image
                src="/images/redesign/phuket-weather-green-season.webp"
                alt="Phuket during green season"
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
            <div className="p-6 sm:p-8">
              <p className="eyebrow">Plan for the Andaman sea</p>
              <h2 className="font-display text-[2.75rem] font-semibold leading-[0.95] tracking-[-0.035em] text-jade">
                Beach weather and boat weather are different questions.
              </h2>
              <p className="mt-4 text-sm leading-7 text-charcoal/62">
                A lower-season trip can still work, but rougher seas and
                red-flag days matter if swimming or boat routes are the main
                purpose. Keep a flexible land-based alternative.
              </p>
              <Link
                href="/city/phuket/weather/"
                className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark"
              >
                <CalendarDays size={15} /> Compare Phuket by month{" "}
                <ArrowRight size={15} />
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom grid items-center gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-jade/10 shadow-editorial-lift">
            <Image
              src="/images/redesign/phuket-route-planning.webp"
              alt="Planning transport between Phuket zones"
              fill
              sizes="48vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="eyebrow">Distance is not the whole journey</p>
            <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.6rem]">
              Plan by coast and traffic, not kilometres.
            </h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/62">
              Phuket is large enough that an impulsive dinner, sunset or pier
              transfer can reshape half the day. Group movement and always plan
              the return.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {transport.map(({ icon: Icon, title, copy }) => (
                <article
                  key={title}
                  className="rounded-xl border border-jade/10 bg-white p-4"
                >
                  <Icon size={19} className="text-jade" strokeWidth={1.55} />
                  <h3 className="mt-3 font-display text-xl font-semibold text-jade">
                    {title}
                  </h3>
                  <p className="mt-2 text-[10px] leading-5 text-charcoal/55">
                    {copy}
                  </p>
                </article>
              ))}
            </div>
            <a
              href={transportHref}
              target="_blank"
              rel={AFFILIATE_REL}
              className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark"
            >
              Check current intercity transport on 12Go{" "}
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.5fr] lg:gap-14">
            <div>
              <p className="eyebrow">Before you go</p>
              <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">
                Good Phuket planning stays flexible.
              </h2>
              <p className="mt-5 text-sm leading-7 text-charcoal/62">
                Sea conditions, traffic and access can change a day faster than
                another saved attraction list can repair it.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {practical.map(({ icon: Icon, title, copy }) => (
                <article
                  key={title}
                  className="rounded-xl border border-jade/10 bg-white p-5 shadow-[0_5px_18px_rgba(18,63,54,0.035)]"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-lg border border-jade/10 bg-jade/[0.025] text-jade">
                    <Icon size={20} strokeWidth={1.55} />
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-jade">
                    {title}
                  </h3>
                  <p className="mt-2 text-[11px] leading-5 text-charcoal/57">
                    {copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
          <div className="mt-9 rounded-2xl border border-jade/10 bg-white px-6 py-7 sm:px-8">
            <div className="grid gap-6 lg:grid-cols-[0.72fr_1.4fr] lg:items-center">
              <div>
                <p className="eyebrow">Useful arrival reset</p>
                <h3 className="font-display text-[2.35rem] font-semibold leading-[0.95] text-jade">
                  Keep the first island day local.
                </h3>
              </div>
              <ul className="grid gap-3 text-xs leading-5 text-charcoal/60 sm:grid-cols-2">
                {[
                  "Save the exact hotel pin and arrival transfer.",
                  "Check the beach flags before swimming.",
                  "Confirm the pickup zone for any early boat day.",
                  "Choose one nearby dinner, not a cross-island mission.",
                ].map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check
                      size={15}
                      className="mt-0.5 shrink-0 text-saffron-dark"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-jade-dark py-12 text-white lg:py-16">
        <div className="container-custom grid gap-9 lg:grid-cols-[0.68fr_1.5fr] lg:items-center lg:gap-14">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-saffron-light">
              Continue planning
            </p>
            <h2 className="mt-3 font-display text-[3rem] font-semibold leading-[0.93] tracking-[-0.04em]">
              Build the rest of your Phuket trip.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/64">
              Use each specialist owner for one narrower decision while this
              page keeps the island structure clear.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                icon: Compass,
                title: "Phuket attractions",
                copy: "Beaches, Old Town, temples, viewpoints and boat routes.",
                href: "/city/phuket/attractions/",
              },
              {
                icon: Utensils,
                title: "Food in Phuket",
                copy: "Island dishes, markets and an Old Town eating route.",
                href: "/city/phuket/food/",
              },
              {
                icon: BedDouble,
                title: "Where to stay",
                copy: "Compare west-coast beaches, the south and Old Town.",
                href: "/where-to-stay/phuket/",
              },
              {
                icon: Map,
                title: "Phuket or Krabi?",
                copy: "Choose the Andaman base that fits your trip style.",
                href: "/compare/phuket-vs-krabi/",
              },
            ].map(({ icon: Icon, title, copy, href }) => (
              <Link
                key={title}
                href={href}
                className="group rounded-xl border border-white/12 bg-white/[0.07] p-5 transition hover:-translate-y-0.5 hover:border-saffron/45 hover:bg-white/[0.11]"
              >
                <Icon
                  size={20}
                  className="text-saffron-light"
                  strokeWidth={1.55}
                />
                <h3 className="mt-4 flex items-center justify-between font-display text-xl font-semibold">
                  {title}
                  <ArrowRight size={15} className="text-saffron-light" />
                </h3>
                <p className="mt-2 text-[10px] leading-5 text-white/55">
                  {copy}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-9">
        <div className="container-custom flex flex-col gap-5 text-[10px] leading-5 text-charcoal/52 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <p className="font-bold uppercase tracking-[0.18em] text-jade">
              Editorial method
            </p>
            <p className="mt-2">
              This owner separates broad island decisions from live sea
              conditions, venue access, hotel inventory and tour availability.
              Current English search results and specialist sources informed the
              structure; verify changing conditions with official sources and
              operators.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 font-bold text-jade">
            <a
              href="https://www.tourismthailand.org/Destinations/Provinces/Phuket/350"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="hover:text-saffron-dark"
            >
              Tourism Authority of Thailand
            </a>
            <Link href="/editorial-policy/" className="hover:text-saffron-dark">
              Editorial policy
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
