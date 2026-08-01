import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BedDouble, BusFront, CalendarDays, CarFront, Check, CircleAlert, ExternalLink, Footprints, Landmark, Leaf, MapPin, Route, Ship, ShoppingBasket, Store, SunMedium, Utensils, Waves } from 'lucide-react';

interface RayongDestinationOverviewProps {
  activitiesHref: string;
  hotelsHref: string;
  transportHref: string;
}

const AFFILIATE_REL = 'noopener noreferrer nofollow sponsored';

const bases = [
  {
    icon: Landmark,
    label: 'Food + old-town evening',
    title: 'Rayong City',
    copy: 'Choose the centre for Yomjinda Road, markets and a practical first or last night. It is a city base, not a walk-to-the-beach stay.',
  },
  {
    icon: Waves,
    label: 'Mainland coast',
    title: 'Mae Ramphueng',
    copy: 'The most useful base for a long mainland beach with Khao Laem Ya close by. Check live sea and beach conditions before swimming.',
  },
  {
    icon: Ship,
    label: 'Ferry + seafood',
    title: 'Ban Phe',
    copy: 'Stay here when a verified Koh Samet connection is the priority. The harbour and market are useful; the island is a separate trip chapter.',
  },
  {
    icon: Leaf,
    label: 'Slower east-coast route',
    title: 'Mae Phim / Prasae',
    copy: 'A stronger fit for a relaxed resort, mangrove landscapes and a road trip toward Klaeng than for frequent city evenings.',
  },
] as const;

const coastChoices = [
  {
    image: '/images/redesign/rayong-destination-hero.webp',
    label: 'Mainland nature edge',
    title: 'Khao Laem Ya + Mae Ramphueng',
    copy: 'Pair the national-park headland with the long mainland beach. This is the clearest first Rayong coast day without boarding a boat.',
    href: '/city/rayong/attractions/khao-laem-ya-national-park/',
  },
  {
    image: '/images/cities/generated/rayong.webp',
    label: 'Quieter road-trip coast',
    title: 'Laem Mae Phim',
    copy: 'Choose the eastern mainland coast for a slower resort rhythm and easier access to the Prasae side of the province.',
    href: '/city/rayong/attractions/',
  },
  {
    image: '/images/islands/koh-samet.webp',
    label: 'Separate island stay',
    title: 'Koh Samet',
    copy: 'Choose the island when beach time is the trip purpose. Verify the Ban Phe pier, sailing, park access and island transfer close to travel.',
    href: '/islands/koh-samet/',
  },
] as const;

const itinerary = [
  {
    day: 'Arrival day',
    title: 'City texture first',
    route: 'Yomjinda Road → old-town meal → riverside evening',
    note: 'Keep the first evening compact. It gives Rayong a local identity before the coast takes over.',
  },
  {
    day: 'Day 2',
    title: 'Read the mainland coast',
    route: 'Khao Laem Ya → Mae Ramphueng → Ban Phe seafood',
    note: 'This is the strongest first coastal loop. Recheck park access and sea conditions on the day.',
  },
  {
    day: 'Day 3',
    title: 'Choose one extension',
    route: 'Prasae mangroves OR fruit orchard OR Koh Samet',
    note: 'Each option needs its own transport and timing. Combining all three makes Rayong feel like a transfer checklist.',
  },
] as const;

const practicalChecks = [
  {
    icon: BusFront,
    title: 'Book to the correct Rayong base',
    copy: 'Rayong City, Mae Ramphueng and Ban Phe are different arrival points. Compare the final local transfer, not only the Bangkok–Rayong headline.',
  },
  {
    icon: CarFront,
    title: 'Plan for a dispersed coast',
    copy: 'A car, driver or deliberately arranged transfer is useful once the route extends beyond the city. Do not assume frequent cross-coast transport.',
  },
  {
    icon: Waves,
    title: 'Treat the sea as live information',
    copy: 'Wind, currents, water quality and local warnings can change. Follow flags and current local advice instead of an evergreen swimming promise.',
  },
  {
    icon: CalendarDays,
    title: 'Verify seasonal experiences',
    copy: 'Fruit varieties, orchard programmes, park access and boat schedules vary. Confirm what is actually operating near your date.',
  },
] as const;

export function RayongDestinationOverview({ activitiesHref, hotelsHref, transportHref }: RayongDestinationOverviewProps) {
  return (
    <>
      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom">
          <div className="mb-8 grid gap-5 lg:grid-cols-[0.76fr_1.24fr] lg:items-end lg:gap-14">
            <div>
              <p className="eyebrow">Choose your Rayong base</p>
              <h2 className="font-display text-[3.05rem] font-semibold leading-[0.9] tracking-[-0.04em] text-jade sm:text-[3.7rem]">One province. Four very different stays.</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-charcoal/62">Rayong is a city, a long mainland coast and the province containing Koh Samet. Choose the base before the hotel: the centre, Mae Ramphueng, Ban Phe and Mae Phim solve different trips.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {bases.map(({ icon: Icon, label, title, copy }, index) => (
              <article key={title} className={`relative overflow-hidden rounded-xl border p-5 shadow-[0_5px_18px_rgba(18,63,54,0.04)] ${index === 1 ? 'border-saffron/30 bg-[#fffaf0]' : 'border-jade/10 bg-white'}`}>
                {index === 1 && <span className="absolute right-3 top-3 rounded-md bg-saffron px-2 py-1 text-[7px] font-extrabold uppercase tracking-[0.16em] text-jade-dark">Best first coast base</span>}
                <span className="grid h-10 w-10 place-items-center rounded-lg border border-saffron/25 bg-saffron/[0.055] text-saffron-dark">
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
              <strong className="text-jade">First visit?</strong> Two nights covers the city and mainland coast; add a third only for one deliberate extension.
            </p>
            <a href={hotelsHref} target="_blank" rel={AFFILIATE_REL} className="inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark">
              Check current Rayong hotel prices on Trip.com <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
          <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-jade/10 shadow-editorial-lift">
            <Image src="/images/redesign/rayong-yomjinda-old-town.webp" alt="Historic wooden shophouses on Yomjinda Road in Rayong" fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-jade-dark/94 via-jade-dark/70 to-transparent px-6 pb-6 pt-24 text-white">
              <Landmark size={20} className="text-saffron-light" />
              <p className="mt-2 font-display text-2xl font-semibold">Rayong is more than the road to a pier.</p>
              <p className="mt-1 max-w-lg text-[11px] leading-5 text-white/70">Yomjinda gives the city an evening of wooden shophouses, local food and everyday heritage before the itinerary moves coastward.</p>
            </div>
          </div>

          <div>
            <p className="eyebrow">Yomjinda after the heat</p>
            <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">Give the old town one unhurried evening.</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/62">Yomjinda Road is the right city-scale introduction: old wooden façades, small food stops and the river-side trading story sit close enough for a slow walk. Come for atmosphere rather than a guaranteed event programme, because opening patterns and market activity vary by day.</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                {
                  icon: Footprints,
                  label: 'Walk slowly',
                  copy: 'The value is in the street sequence, not one landmark pin.',
                },
                {
                  icon: Store,
                  label: 'Follow current activity',
                  copy: 'Let open shops and stalls shape the route on the day.',
                },
                {
                  icon: Utensils,
                  label: 'Eat locally',
                  copy: 'Choose one focused Rayong meal instead of a generic ranking list.',
                },
                {
                  icon: BedDouble,
                  label: 'Useful first night',
                  copy: 'A centre stay works before moving to the mainland coast.',
                },
              ].map(({ icon: Icon, label, copy }) => (
                <article key={label} className="rounded-xl border border-jade/10 bg-white p-4">
                  <Icon size={18} className="text-jade" strokeWidth={1.55} />
                  <h3 className="mt-3 font-display text-xl font-semibold text-jade">{label}</h3>
                  <p className="mt-2 text-[10px] leading-5 text-charcoal/55">{copy}</p>
                </article>
              ))}
            </div>
            <Link href="/city/rayong/food/" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark">
              Open the Rayong food guide <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom">
          <div className="mb-8 grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-14">
            <div>
              <p className="eyebrow">Mainland beach or island?</p>
              <h2 className="font-display text-[3.05rem] font-semibold leading-[0.9] tracking-[-0.04em] text-jade sm:text-[3.7rem]">Choose the coast by travel style.</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-charcoal/62">Mae Ramphueng, Laem Mae Phim and Koh Samet are not interchangeable beach labels. The first two keep you on the mainland; Koh Samet adds a pier, boat and island-side transfer.</p>
          </div>

          <div className="scrollbar-hide flex snap-x gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible">
            {coastChoices.map((item) => (
              <Link key={item.title} href={item.href} className="group min-w-[82vw] snap-start overflow-hidden rounded-xl border border-jade/10 bg-white shadow-[0_5px_18px_rgba(18,63,54,0.04)] transition hover:-translate-y-1 hover:shadow-xl sm:min-w-0">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={item.image} alt={`${item.title} in Rayong province`} fill sizes="(min-width:768px) 33vw, 82vw" className="object-cover transition duration-500 group-hover:scale-[1.035]" />
                  <span className="absolute left-3 top-3 rounded-md bg-jade/88 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.17em] text-white backdrop-blur">{item.label}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-[1.65rem] font-semibold leading-tight text-jade">{item.title}</h3>
                  <p className="mt-2 text-[11px] leading-5 text-charcoal/58">{item.copy}</p>
                  <span className="mt-4 flex items-center justify-between border-t border-jade/8 pt-3 text-[10px] font-bold text-jade">
                    Open the right guide <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center rounded-xl border border-jade/10 bg-white px-5 py-4">
            <div className="flex items-start gap-3">
              <CircleAlert size={18} className="mt-0.5 shrink-0 text-saffron-dark" />
              <p className="text-xs leading-5 text-charcoal/56">
                <strong className="text-jade">Swimming is a live decision.</strong> Check flags, weather, currents and current local advice at the beach; conditions can differ across the province and by day.
              </p>
            </div>
            <a href={activitiesHref} target="_blank" rel={AFFILIATE_REL} className="inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark">
              Check current Rayong experiences on Klook <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-2xl bg-jade-dark text-white shadow-editorial-lift">
            <Image src="/images/redesign/rayong-mangrove-route.webp" alt="Boardwalk through the mangroves on the Prasae side of Rayong" fill sizes="100vw" className="object-cover object-[58%_center]" />
            <div className="absolute inset-0 bg-gradient-to-r from-jade-dark/98 via-jade-dark/84 to-jade-dark/12" />
            <div className="relative max-w-2xl px-7 py-12 sm:px-10 lg:px-14 lg:py-16">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-saffron-light">Rayong City → Ban Phe → Prasae</p>
              <h2 className="mt-3 font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] sm:text-[3.7rem]">Let the mainland coast become the road trip.</h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/72">The eastern route joins fishing-town stops, slower beaches and mangrove landscapes. Thung Prong Thong belongs to the Prasae side, well beyond central Rayong, so give it a dedicated day rather than squeezing it around a ferry.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={transportHref} target="_blank" rel={AFFILIATE_REL} className="btn-cream min-h-11 px-5 text-saffron-dark">
                  Check current Rayong routes on 12Go <ExternalLink size={14} />
                </a>
                <Link href="/transport/" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/35 px-5 text-xs font-bold text-white hover:bg-white/10">
                  Read the transport guide <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <p className="eyebrow">Fruit is a season, not a prop</p>
            <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">Visit an orchard for what is actually ripe.</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/62">Rayong is known for fruit-growing, especially during the hotter harvest months. Durian, mangosteen and rambutan do not follow one permanent visitor schedule, so confirm the current crop, orchard programme, opening day and booking conditions before making the drive.</p>
            <div className="mt-7 space-y-3">
              {[
                ['Before booking', 'Ask which fruit is in season and what the visit includes'],
                ['At the orchard', 'Follow local handling rules and taste in the order suggested'],
                ['Outside harvest', 'Give the coast or mangrove route more weight instead'],
              ].map(([label, copy]) => (
                <div key={label} className="flex gap-4 rounded-xl border border-jade/10 bg-white p-4">
                  <Check size={17} className="mt-0.5 shrink-0 text-saffron-dark" />
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-saffron-dark">{label}</p>
                    <p className="mt-1 text-xs font-semibold leading-5 text-jade">{copy}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/city/rayong/attractions/rayong-fruit-orchards/" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark">
              <ShoppingBasket size={15} /> Read the orchard guide <ArrowRight size={15} />
            </Link>
          </div>

          <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-jade/10 shadow-editorial-lift">
            <Image src="/images/redesign/rayong-fruit-orchard.webp" alt="Durian, mangosteen, rambutan and other fruit grown in Rayong" fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
            <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/20 bg-jade-dark/82 p-5 text-white backdrop-blur-sm">
              <SunMedium size={19} className="text-saffron-light" />
              <p className="mt-2 font-display text-xl font-semibold">Season first. Orchard second.</p>
              <p className="mt-1 text-[10px] leading-5 text-white/68">Availability is agricultural and date-specific—check the current harvest instead of relying on a generic annual promise.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom grid gap-10 lg:grid-cols-[0.56fr_1.8fr] lg:gap-14">
          <div>
            <p className="eyebrow">A realistic Rayong itinerary</p>
            <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">Three days. One coherent coast.</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/62">Two nights gives Rayong shape. A third day should deepen one route—not force the mainland and island into the same rushed loop.</p>
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
            <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">Keep the distances and conditions visible.</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/62">Rayong becomes easy once the correct base, final transfer and one chosen extension are treated as separate planning decisions.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {practicalChecks.map(({ icon: Icon, title, copy }) => (
              <article key={title} className="rounded-xl border border-jade/10 bg-white p-5 shadow-[0_5px_18px_rgba(18,63,54,0.03)]">
                <span className="grid h-10 w-10 place-items-center rounded-lg border border-jade/10 bg-jade/[0.035] text-jade">
                  <Icon size={20} strokeWidth={1.5} />
                </span>
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
              <p className="text-xs leading-5 text-charcoal/56">
                <strong className="text-jade">Rayong or Pattaya?</strong> Rayong suits a quieter mainland-coast and road-trip brief; Pattaya has denser urban entertainment and easier city-scale infrastructure.
              </p>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-jade">
              <MapPin size={14} className="text-saffron-dark" /> City first, coast second, one extension
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
