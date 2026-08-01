import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BedDouble,
  Building2,
  BusFront,
  Check,
  CircleAlert,
  ExternalLink,
  MapPin,
  MoonStar,
  Palmtree,
  ShieldCheck,
  Ship,
  Soup,
  SunMedium,
  Users,
  Waves,
} from 'lucide-react';
import { StoryDottedRoute } from '../visuals/StoryDottedRoute';

interface PattayaDestinationOverviewProps {
  activitiesHref: string;
  hotelsHref: string;
  transportHref: string;
}

const AFFILIATE_REL = 'noopener noreferrer nofollow sponsored';

const areaChoices = [
  {
    icon: Building2,
    title: 'Central Pattaya',
    label: 'Convenience first',
    copy: 'Best for a short city break, malls, transport corridors and deliberate nightlife access. It is the busiest version, not the universal default.',
  },
  {
    icon: BedDouble,
    title: 'Naklua and north',
    label: 'Culture and resort',
    copy: 'A stronger fit for the Sanctuary of Truth, calmer resort time and a northern food layer away from the central strip.',
  },
  {
    icon: Palmtree,
    title: 'Pratumnak',
    label: 'Quieter in-between',
    copy: 'Useful when you want separation from the centre while keeping both Jomtien and South Pattaya within a planned ride.',
  },
  {
    icon: Waves,
    title: 'Jomtien',
    label: 'Slower beach base',
    copy: 'Often the easiest choice for families, longer stays and travellers who want beachfront rhythm without living inside the nightlife core.',
  },
] as const;

const cityLayers = [
  {
    title: 'Start with the Sanctuary of Truth',
    label: 'North Pattaya',
    copy: 'Treat the carved wooden complex as the city’s main cultural anchor. Check current visiting information and give the craftsmanship more than a photo stop.',
    image: '/images/redesign/pattaya-sanctuary-route.webp',
    href: '/city/pattaya/attractions/sanctuary-of-truth/',
  },
  {
    title: 'Use Central Pattaya for access',
    label: 'Urban coast',
    copy: 'The central bay is strongest for movement, shopping and evening choice. Do not mistake convenience for the best swimming beach.',
    image: '/images/redesign/pattaya-destination-hero.webp',
    href: '/city/pattaya/attractions/',
  },
  {
    title: 'Slow the trip down in Jomtien',
    label: 'South coast',
    copy: 'Jomtien gives a longer beachfront and an easier day-to-day pace, while still requiring a deliberate ride for central nightlife or northern attractions.',
    image: '/images/cities/pattaya/attractions/Jomtien Beach.webp',
    href: '/city/pattaya/attractions/jomtien-beach/',
  },
  {
    title: 'Make Koh Larn a real sea day',
    label: 'Island chapter',
    copy: 'Choose the island when swimming and clearer-water expectations matter. Verify the current boat, pier, weather and return plan close to departure.',
    image: '/images/cities/pattaya/attractions/Coral Island (Koh Larn).webp',
    href: '/blog/koh-larn-island-day-trip-pattaya-beaches-ferry-guide-2026/',
  },
] as const;

const itinerary = [
  {
    day: 'Arrival',
    title: 'Understand the bay',
    route: 'Bangkok arrival → check-in → viewpoint or waterfront → local dinner',
    note: 'Keep the first night close to your chosen area. Pattaya becomes messy when arrival, cross-city transport and nightlife are all forced into one block.',
  },
  {
    day: 'Day 2',
    title: 'Culture north, evening by choice',
    route: 'Sanctuary of Truth → Naklua food → quiet, family or adult evening',
    note: 'Choose the evening mode in advance. Walking Street is one adult entertainment zone, not a compulsory Pattaya experience.',
  },
  {
    day: 'Day 3',
    title: 'Island or south coast',
    route: 'Koh Larn sea day OR Jomtien and Pratumnak at a slower pace',
    note: 'Let live sea conditions and group needs decide. An island day should not be treated as interchangeable with the urban beachfront.',
  },
] as const;

const eveningModes = [
  {
    icon: MoonStar,
    title: 'Adult nightlife',
    copy: 'Walking Street and nearby zones are intense and explicitly adult. Keep boundaries clear, follow venue rules, protect drinks and arrange the return before the night begins.',
  },
  {
    icon: Soup,
    title: 'Food and waterfront',
    copy: 'A north-side seafood dinner, Jomtien evening or market-led meal gives the city a social night without making bars the whole programme.',
  },
  {
    icon: Users,
    title: 'Family evening',
    copy: 'Base in Jomtien, Pratumnak or the north and choose a show, mall, early dinner or resort evening that does not require crossing adult nightlife streets.',
  },
  {
    icon: ShieldCheck,
    title: 'Return with a plan',
    copy: 'Save the hotel address, use a known transport option and avoid riding after alcohol. Do not depend on negotiating a late return when judgment is already reduced.',
  },
] as const;

const practical = [
  {
    icon: Ship,
    title: 'Separate city beach and island day',
    copy: 'Pattaya Beach is an urban waterfront. Koh Larn is the stronger sea-day answer, but boats and conditions require live checks.',
  },
  {
    icon: BusFront,
    title: 'Learn the main transport corridor',
    copy: 'Baht buses and app rides can reduce friction, but routes and availability vary. Choose a stay area that removes unnecessary crossings.',
  },
  {
    icon: CircleAlert,
    title: 'Document any rental',
    copy: 'Photograph existing damage, read the agreement and confirm insurance before using a bike, watercraft or other rented equipment.',
  },
  {
    icon: SunMedium,
    title: 'Use live weather and sea advice',
    copy: 'Heat, rain, wind and marine conditions change the value of a beach or island plan. Keep one city alternative ready.',
  },
] as const;

export function PattayaDestinationOverview({ activitiesHref, hotelsHref, transportHref }: PattayaDestinationOverviewProps) {
  return (
    <>
      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom">
          <div className="mb-8 grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-14">
            <div>
              <p className="eyebrow">Choose your version of Pattaya</p>
              <h2 className="font-display text-[3.05rem] font-semibold leading-[0.9] tracking-[-0.04em] text-jade sm:text-[3.7rem]">One bay. Four very different stays.</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-charcoal/62">
              Where is Pattaya in Thailand? Pattaya is a coastal city in Chon Buri province on Thailand’s eastern Gulf coast, within practical overland reach of Bangkok. Central Pattaya, Naklua, Pratumnak and Jomtien are not interchangeable—choose the zone before the hotel.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {areaChoices.map(({ icon: Icon, title, label, copy }) => (
              <article key={title} className="rounded-xl border border-jade/10 bg-white p-5 shadow-[0_5px_18px_rgba(18,63,54,0.04)]">
                <span className="grid h-10 w-10 place-items-center rounded-lg border border-saffron/25 bg-saffron/[0.05] text-saffron-dark"><Icon size={20} strokeWidth={1.55} /></span>
                <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.18em] text-saffron-dark">{label}</p>
                <h3 className="mt-1 font-display text-2xl font-semibold text-jade">{title}</h3>
                <p className="mt-3 text-[11px] leading-5 text-charcoal/58">{copy}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-jade/10 bg-white px-5 py-4">
            <p className="text-xs leading-5 text-charcoal/56"><strong className="text-jade">First stay?</strong> Choose Central for convenience, Jomtien for a slower beach rhythm, or Naklua for a resort-and-culture trip.</p>
            <a href={hotelsHref} target="_blank" rel={AFFILIATE_REL} className="inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark">Check current Pattaya hotel prices on Trip.com <ExternalLink size={14} /></a>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom">
          <div className="mb-7 flex items-end justify-between gap-5">
            <div>
              <p className="eyebrow">Four city layers</p>
              <h2 className="font-display text-[2.9rem] font-semibold leading-none tracking-[-0.04em] text-jade sm:text-[3.4rem]">Pattaya is more useful when you stop selling it as one strip.</h2>
            </div>
            <Link href="/city/pattaya/attractions/" className="hidden items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark sm:flex">All Pattaya attractions <ArrowRight size={15} /></Link>
          </div>

          <div className="scrollbar-hide flex snap-x gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
            {cityLayers.map(item => (
              <Link key={item.title} href={item.href} className="group min-w-[80vw] snap-start overflow-hidden rounded-xl border border-jade/10 bg-white shadow-[0_5px_18px_rgba(18,63,54,0.04)] transition hover:-translate-y-1 hover:shadow-xl sm:min-w-0">
                <div className="relative aspect-[4/2.9] overflow-hidden">
                  <Image src={item.image} alt={item.title} fill sizes="(min-width:1024px) 25vw, 80vw" className="object-cover transition duration-500 group-hover:scale-[1.035]" />
                  <span className="absolute left-3 top-3 rounded-md bg-jade/88 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.17em] text-white backdrop-blur">{item.label}</span>
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
            <p className="text-xs leading-5 text-charcoal/56"><strong className="text-jade">Comparing experiences?</strong> Check pickup zone, group size, ethical standards, current access and the real return time.</p>
            <a href={activitiesHref} target="_blank" rel={AFFILIATE_REL} className="inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark">Check current Pattaya options on Klook <ExternalLink size={14} /></a>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-2xl bg-jade-dark text-white shadow-editorial-lift">
            <Image src="/images/redesign/pattaya-destination-hero.webp" alt="Pattaya bay and city coast in warm evening light" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-jade-dark via-jade-dark/88 to-jade-dark/12" />
            <div className="relative grid min-h-[405px] items-center gap-8 px-7 py-10 sm:px-10 lg:grid-cols-[0.76fr_1.18fr] lg:px-14">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-saffron-light">Bangkok to your actual base</p>
                <h2 className="mt-3 max-w-md font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] sm:text-[3.7rem]">The city begins after the highway.</h2>
                <p className="mt-5 max-w-md text-sm leading-7 text-white/70">A Bangkok transfer that ends in Central Pattaya is not the same journey as one continuing to Naklua or Jomtien. Compare the departure point, luggage, final drop-off and hotel transfer before choosing.</p>
                <a href={transportHref} target="_blank" rel={AFFILIATE_REL} className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-white hover:text-saffron-light">Check current Bangkok–Pattaya routes on 12Go <ExternalLink size={14} /></a>
              </div>
              <div className="relative hidden min-h-[250px] lg:block">
                <StoryDottedRoute className="absolute left-0 top-14 h-40 w-72 opacity-90" />
                <div className="absolute right-0 top-0 grid w-[390px] grid-cols-2 gap-3">
                  {['Bangkok departure', 'Road connection', 'Pattaya corridor', 'Correct stay zone'].map((label, index) => (
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
            <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">Three days. Three different versions of the city.</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/62">Two nights can work for a focused city break. Three days adds either Koh Larn or a slower south-coast day without erasing the cultural and food layers.</p>
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
        <div className="container-custom grid items-center gap-10 lg:grid-cols-[1.03fr_0.97fr] lg:gap-14">
          <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-jade/10 shadow-editorial-lift">
            <Image src="/images/redesign/pattaya-nightlife-moods.webp" alt="Different evening moods across Pattaya" fill sizes="(min-width:1024px) 52vw, 100vw" className="object-cover" />
          </div>
          <div>
            <p className="eyebrow">Pattaya after dark</p>
            <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">Choose the evening before the evening chooses you.</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/62">Pattaya’s nightlife reputation is real, but adult entertainment is one layer of a larger city. Make the intended atmosphere, boundaries and return transport explicit before leaving the hotel.</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {eveningModes.map(({ icon: Icon, title, copy }) => (
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
        <div className="container-custom grid gap-5 lg:grid-cols-2">
          <article className="overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-[0_6px_22px_rgba(18,63,54,0.045)]">
            <div className="relative aspect-[16/8.5]"><Image src="/images/redesign/pattaya-seafood-coast.webp" alt="Thai seafood dinner on the Pattaya coast" fill sizes="50vw" className="object-cover" /></div>
            <div className="p-6 sm:p-8">
              <p className="eyebrow">Food beyond tourist menus</p>
              <h2 className="font-display text-[2.75rem] font-semibold leading-[0.95] tracking-[-0.035em] text-jade">Let Naklua, noodles and Thai everyday food ground the trip.</h2>
              <p className="mt-4 text-sm leading-7 text-charcoal/62">Mix one coastal seafood meal with focused noodle, Isaan or Thai-casual stops. Ask the current price when seafood is sold by weight and do not let every meal default to the central strip.</p>
              <Link href="/city/pattaya/food/" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark"><Soup size={15} /> Plan where to eat in Pattaya <ArrowRight size={15} /></Link>
            </div>
          </article>
          <article className="overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-[0_6px_22px_rgba(18,63,54,0.045)]">
            <div className="relative aspect-[16/8.5]"><Image src="/images/cities/pattaya/attractions/Coral Island (Koh Larn).webp" alt="Koh Larn between the island coast and Pattaya" fill sizes="50vw" className="object-cover" /></div>
            <div className="p-6 sm:p-8">
              <p className="eyebrow">The honest beach choice</p>
              <h2 className="font-display text-[2.75rem] font-semibold leading-[0.95] tracking-[-0.035em] text-jade">Use Pattaya for the city. Use Koh Larn for the sea day.</h2>
              <p className="mt-4 text-sm leading-7 text-charcoal/62">The urban bay is convenient, while the island is usually the stronger swimming brief. Keep weather, boat access and the return pier as live planning inputs.</p>
              <a href={activitiesHref} target="_blank" rel={AFFILIATE_REL} className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark">Check current Koh Larn options on Klook <ExternalLink size={14} /></a>
            </div>
          </article>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom grid gap-8 lg:grid-cols-[0.7fr_1.5fr] lg:gap-14">
          <div>
            <p className="eyebrow">Before you go</p>
            <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">Keep a high-energy city under your control.</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/62">Pattaya rewards decisions made before arrival: the right zone, a transport plan, realistic sea expectations and clear boundaries after dark.</p>
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
              <p className="text-xs leading-5 text-charcoal/56"><strong className="text-jade">Travelling as a family?</strong> Jomtien or north Pattaya can work well, but choose the evening geography and hotel access deliberately instead of assuming the whole city has one atmosphere.</p>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-jade"><Check size={14} className="text-saffron-dark" /> Area first, itinerary second</div>
          </div>
        </div>
      </section>
    </>
  );
}
