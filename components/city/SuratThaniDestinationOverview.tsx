import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  CalendarDays,
  Check,
  CircleAlert,
  Clock3,
  ExternalLink,
  Footprints,
  Landmark,
  MoonStar,
  Plane,
  Route,
  Ship,
  ShoppingBasket,
  Soup,
  Store,
  TrainFront,
  Trees,
  Utensils,
  Waves,
} from 'lucide-react';

interface SuratThaniDestinationOverviewProps {
  activitiesHref: string;
  hotelsHref: string;
  transportHref: string;
}

const AFFILIATE_REL = 'noopener noreferrer nofollow sponsored';

const tripShapes = [
  {
    icon: MoonStar,
    label: 'One useful night',
    title: 'City stopover',
    copy: 'Stay around the old-town, riverfront and night-market side when a late arrival or early onward connection leaves one real evening in town.',
  },
  {
    icon: Footprints,
    label: 'Best first introduction',
    title: 'Two-night city stay',
    copy: 'Give Talat Lang, the shrine, market food and one Bang Bai Mai canal morning enough space before continuing elsewhere.',
  },
  {
    icon: Ship,
    label: 'Island-bound',
    title: 'Through-ticket route',
    copy: 'Treat Surat Thani Airport or city and Don Sak pier as separate legs. Compare the complete bus, boat and island-side transfer chain.',
  },
  {
    icon: Landmark,
    label: 'Mainland depth',
    title: 'Chaiya heritage day',
    copy: 'Choose Chaiya for a deliberate temple and district route. It is a separate northbound day, not a quick city-centre attraction.',
  },
] as const;

const nextChapters = [
  {
    image: '/images/redesign/koh-samui-destination-hero.webp',
    label: 'Island chapter',
    title: 'Koh Samui',
    copy: 'Choose the island for a multi-night beach stay. Verify the correct mainland departure, sailing and Samui arrival pier as one live chain.',
    href: '/city/koh-samui/',
  },
  {
    image: '/images/redesign/khao-sok-destination-hero.webp',
    label: 'National-park chapter',
    title: 'Khao Sok',
    copy: 'Choose the park for jungle, Khlong Sok village and—if planned separately—Cheow Lan Lake. It needs its own stay and current operator checks.',
    href: '/city/khao-sok/',
  },
  {
    image: '/images/redesign/surat-thani-chaiya.webp',
    label: 'Mainland heritage',
    title: 'Chaiya',
    copy: 'Keep the trip on the mainland for Wat Phra Borommathat Chaiya, local history and a slower district-scale route north of the city.',
    href: '/city/surat-thani/attractions/wat-phra-borommathat-chaiya/',
  },
] as const;

const itinerary = [
  {
    day: 'Arrival evening',
    title: 'Let the city earn the night',
    route: 'City Pillar Shrine → Talat Lang → night-market dinner',
    note: 'Keep the first route walkable and close to the river. It works after an airport, bus or train transfer without turning dinner into another crossing.',
  },
  {
    day: 'Day 2',
    title: 'Follow the canals',
    route: 'Bang Bai Mai → Khlong Roi Sai → return to the city',
    note: 'Use a locally arranged route and confirm the current programme. The canal community deserves a half-day, not a rushed add-on before a ferry.',
  },
  {
    day: 'Day 3+',
    title: 'Start a new chapter',
    route: 'Chaiya OR Khao Sok OR Don Sak and the islands',
    note: 'These routes point in different directions. Choose one, verify the live handovers and let the next destination have its own itinerary.',
  },
] as const;

const practicalChecks = [
  {
    icon: Plane,
    title: 'Airport is not the city',
    copy: 'Surat Thani Airport sits outside the centre. Check whether a transfer ends downtown, at a pier connection or somewhere else entirely.',
  },
  {
    icon: TrainFront,
    title: 'The station is in Phun Phin',
    copy: 'Surat Thani Railway Station is not in the old-town core. Leave a separate transfer block between the station and a city hotel or onward vehicle.',
  },
  {
    icon: Ship,
    title: 'Don Sak is another leg',
    copy: 'Island routes usually require a road transfer to the mainland pier before the boat. Confirm the exact pier and island arrival point close to travel.',
  },
  {
    icon: CalendarDays,
    title: 'Schedules remain live',
    copy: 'Train, bus, airport transfer, community programme and ferry availability can change. Recheck the complete chain rather than one headline time.',
  },
] as const;

export function SuratThaniDestinationOverview({ activitiesHref, hotelsHref, transportHref }: SuratThaniDestinationOverviewProps) {
  return (
    <>
      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom">
          <div className="mb-8 grid gap-5 lg:grid-cols-[0.76fr_1.24fr] lg:items-end lg:gap-14">
            <div>
              <p className="eyebrow">Choose the role of Surat Thani</p>
              <h2 className="font-display text-[3.05rem] font-semibold leading-[0.9] tracking-[-0.04em] text-jade sm:text-[3.7rem]">A stopover can still be a destination.</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-charcoal/62">Surat Thani is both a southern river city and the capital of a province containing famous islands and mainland nature. The city deserves its own night; the province needs separate route decisions.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tripShapes.map(({ icon: Icon, label, title, copy }, index) => (
              <article key={title} className={`relative overflow-hidden rounded-xl border p-5 shadow-[0_5px_18px_rgba(18,63,54,0.04)] ${index === 1 ? 'border-saffron/30 bg-[#fffaf0]' : 'border-jade/10 bg-white'}`}>
                {index === 1 && <span className="absolute right-3 top-3 rounded-md bg-saffron px-2 py-1 text-[7px] font-extrabold uppercase tracking-[0.16em] text-jade-dark">Best city balance</span>}
                <span className="grid h-10 w-10 place-items-center rounded-lg border border-saffron/25 bg-saffron/[0.055] text-saffron-dark"><Icon size={20} strokeWidth={1.55} /></span>
                <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.18em] text-saffron-dark">{label}</p>
                <h3 className="mt-1 font-display text-2xl font-semibold text-jade">{title}</h3>
                <p className="mt-3 text-[11px] leading-5 text-charcoal/58">{copy}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-jade/10 bg-white px-5 py-4">
            <p className="text-xs leading-5 text-charcoal/56"><strong className="text-jade">First visit?</strong> One night reveals the city; two nights creates room for the canal side without risking the next connection.</p>
            <a href={hotelsHref} target="_blank" rel={AFFILIATE_REL} className="inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark">Check current Surat Thani hotel prices on Trip.com <ExternalLink size={14} /></a>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
          <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-jade/10 shadow-editorial-lift">
            <Image src="/images/redesign/surat-thani-old-town.webp" alt="Old shophouses and the 100-Year Arch Bridge area in Surat Thani" fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-jade-dark/94 via-jade-dark/68 to-transparent px-6 pb-6 pt-24 text-white">
              <Landmark size={20} className="text-saffron-light" />
              <p className="mt-2 font-display text-2xl font-semibold">Read the working city before the ferry map.</p>
              <p className="mt-1 max-w-lg text-[11px] leading-5 text-white/70">Talat Lang, older shophouses and the bridge structure give the centre a human scale that transfer-only itineraries miss.</p>
            </div>
          </div>

          <div>
            <p className="eyebrow">A compact first city walk</p>
            <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">Shrine first. Old streets second. Market after the heat.</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/62">Begin near the City Pillar Shrine, then move through the older Talat Lang and Na Dan streets before dinner around the market side. The route is strongest as an ordinary city sequence—architecture, street life, small food stops and the Tapi river—not as a collection of oversized attractions.</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                { icon: Landmark, label: 'Civic anchor', copy: 'Use the shrine as the clearest orientation point in the centre.' },
                { icon: Footprints, label: 'Old-town walk', copy: 'Keep the older streets slow enough to notice their lived-in texture.' },
                { icon: Store, label: 'Market transition', copy: 'Let current stalls and opening patterns shape the evening.' },
                { icon: Waves, label: 'River context', copy: 'The Tapi explains the city better than a generic island-gateway label.' },
              ].map(({ icon: Icon, label, copy }) => (
                <article key={label} className="rounded-xl border border-jade/10 bg-white p-4">
                  <Icon size={18} className="text-jade" strokeWidth={1.55} />
                  <h3 className="mt-3 font-display text-xl font-semibold text-jade">{label}</h3>
                  <p className="mt-2 text-[10px] leading-5 text-charcoal/55">{copy}</p>
                </article>
              ))}
            </div>
            <Link href="/city/surat-thani/attractions/" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark">Plan the city walk <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom grid items-center gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14">
          <div>
            <p className="eyebrow">Southern food is the city’s strongest argument</p>
            <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">Build the day around three different meals.</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/62">Surat Thani works when breakfast, market food and one proper southern dinner are part of the route. Use current opening information and visible local demand rather than treating an old ranking as a permanent guarantee.</p>
            <div className="mt-7 space-y-3">
              {[
                { icon: Clock3, label: 'Morning', copy: 'Patongo, coffee or Thai-Chinese breakfast before the old-town walk' },
                { icon: ShoppingBasket, label: 'Midday', copy: 'A focused market snack, dumpling or pork-rice stop' },
                { icon: Soup, label: 'Evening', copy: 'One full southern meal with dishes chosen for the table' },
              ].map(({ icon: Icon, label, copy }) => (
                <div key={label} className="flex gap-4 rounded-xl border border-jade/10 bg-white p-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-saffron/25 bg-saffron/[0.05] text-saffron-dark"><Icon size={17} strokeWidth={1.55} /></span>
                  <div><p className="text-[9px] font-bold uppercase tracking-[0.18em] text-saffron-dark">{label}</p><p className="mt-1 text-xs font-semibold leading-5 text-jade">{copy}</p></div>
                </div>
              ))}
            </div>
            <Link href="/city/surat-thani/food/" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark"><Utensils size={15} /> Open the Surat Thani food guide <ArrowRight size={15} /></Link>
          </div>

          <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-jade/10 shadow-editorial-lift">
            <Image src="/images/redesign/surat-thani-food.webp" alt="Breakfast, market dishes and southern food in Surat Thani" fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
            <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/20 bg-jade-dark/84 p-5 text-white backdrop-blur-sm">
              <Soup size={19} className="text-saffron-light" />
              <p className="mt-2 font-display text-xl font-semibold">Current kitchen, current choice.</p>
              <p className="mt-1 text-[10px] leading-5 text-white/68">Confirm opening hours and ask about unfamiliar heat levels or ingredients; good editorial food advice should prepare the meal, not freeze a ranking.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-2xl bg-jade-dark text-white shadow-editorial-lift">
            <Image src="/images/redesign/surat-thani-route-banner.webp" alt="Train, Surat Thani city, road transfer and ferry as separate journey stages" fill sizes="100vw" className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-jade-dark/98 via-jade-dark/84 to-jade-dark/18" />
            <div className="relative max-w-2xl px-7 py-12 sm:px-10 lg:px-14 lg:py-16">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-saffron-light">Airport / Phun Phin → city → Don Sak → island</p>
              <h2 className="mt-3 font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] sm:text-[3.7rem]">Four labels. Four different points on the journey.</h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/72">A flight to Surat Thani Airport, a train arriving in Phun Phin, a hotel in the city and a ferry from Don Sak are not one location. Compare the whole route—including waiting time, luggage and the island-side transfer—before booking.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={transportHref} target="_blank" rel={AFFILIATE_REL} className="btn-cream min-h-11 px-5 text-saffron-dark">Check current Surat Thani routes on 12Go <ExternalLink size={14} /></a>
                <Link href="/transport/" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/35 px-5 text-xs font-bold text-white hover:bg-white/10">Read the transport guide <ArrowRight size={14} /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom">
          <div className="mb-8 grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-14">
            <div>
              <p className="eyebrow">Choose the next chapter</p>
              <h2 className="font-display text-[3.05rem] font-semibold leading-[0.9] tracking-[-0.04em] text-jade sm:text-[3.7rem]">Island, jungle or mainland history?</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-charcoal/62">Koh Samui, Khao Sok and Chaiya belong to different travel briefs and different transport chains. Surat Thani can connect them, but should not flatten them into one day-trip list.</p>
          </div>

          <div className="scrollbar-hide flex snap-x gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible">
            {nextChapters.map(item => (
              <Link key={item.title} href={item.href} className="group min-w-[82vw] snap-start overflow-hidden rounded-xl border border-jade/10 bg-white shadow-[0_5px_18px_rgba(18,63,54,0.04)] transition hover:-translate-y-1 hover:shadow-xl sm:min-w-0">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={item.image} alt={`${item.title} after Surat Thani`} fill sizes="(min-width:768px) 33vw, 82vw" className="object-cover transition duration-500 group-hover:scale-[1.035]" />
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
            <p className="text-xs leading-5 text-charcoal/56"><strong className="text-jade">Do not book by “Surat Thani” alone.</strong> Check the exact airport, station, city stop, pier and island arrival shown on the ticket.</p>
            <a href={activitiesHref} target="_blank" rel={AFFILIATE_REL} className="inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark">Check current Surat Thani experiences on Klook <ExternalLink size={14} /></a>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <p className="eyebrow">The gentler mainland extension</p>
            <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">Give Bang Bai Mai a real canal morning.</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/62">Bang Bai Mai and Khlong Roi Sai offer a quieter counterpoint to the city: canal-side homes, coconut landscapes, community activity and local food. Arrange the visit through a current local programme where possible, ask before photographing residents and do not assume a market or boat schedule is permanent.</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                { icon: Trees, title: 'Canal landscape', copy: 'Use the route to understand everyday river and coconut geography.' },
                { icon: Store, title: 'Current community activity', copy: 'Verify the programme and market day rather than assuming it runs daily.' },
                { icon: Soup, title: 'Spend locally', copy: 'Let food, crafts or a local guide be part of the value exchange.' },
                { icon: Check, title: 'Respect homes', copy: 'Ask before photographing people or private residential spaces.' },
              ].map(({ icon: Icon, title, copy }) => (
                <article key={title} className="rounded-xl border border-jade/10 bg-white p-4">
                  <Icon size={18} className="text-jade" strokeWidth={1.55} />
                  <h3 className="mt-3 font-display text-xl font-semibold text-jade">{title}</h3>
                  <p className="mt-2 text-[10px] leading-5 text-charcoal/55">{copy}</p>
                </article>
              ))}
            </div>
            <Link href="/city/surat-thani/attractions/bang-bai-mai-and-khlong-roi-sai/" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark">Read the Bang Bai Mai guide <ArrowRight size={15} /></Link>
          </div>

          <div className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-lift sm:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-saffron-dark">A half-day that stays coherent</p>
            <div className="mt-6 space-y-5">
              {[
                ['1', 'Confirm the current meeting point', 'A city pickup, community start and self-drive pin are not automatically the same.'],
                ['2', 'Keep the canal section unhurried', 'Leave enough time for context instead of using the boat only as a photo platform.'],
                ['3', 'Return before the next major handover', 'Do not pair the route with a tightly timed airport, train or ferry connection.'],
              ].map(([step, title, copy]) => (
                <div key={step} className="flex gap-4 border-b border-jade/8 pb-5 last:border-0 last:pb-0">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-saffron/40 bg-saffron/[0.06] text-[10px] font-extrabold text-saffron-dark">{step}</span>
                  <div><h3 className="font-display text-xl font-semibold text-jade">{title}</h3><p className="mt-2 text-[11px] leading-5 text-charcoal/56">{copy}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom grid gap-10 lg:grid-cols-[0.56fr_1.8fr] lg:gap-14">
          <div>
            <p className="eyebrow">A realistic Surat Thani itinerary</p>
            <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">Two city nights before the route branches.</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/62">A strong plan lets the city and canal side breathe, then starts one separate island, park or heritage chapter.</p>
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
            <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">Name every handover before paying.</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/62">Surat Thani travel becomes much easier when city, airport, station, pier and next destination are written as separate points.</p>
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
              <p className="text-xs leading-5 text-charcoal/56"><strong className="text-jade">No useful city beach?</strong> Surat Thani is a river city. Plan mainland urban and canal experiences here; use a specialist island or coastal owner when beach time is the actual purpose.</p>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-jade"><Route size={14} className="text-saffron-dark" /> City first, one onward chapter second</div>
          </div>
        </div>
      </section>
    </>
  );
}
