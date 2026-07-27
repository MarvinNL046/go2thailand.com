import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Bike,
  CalendarDays,
  Check,
  CloudRain,
  Drama,
  ExternalLink,
  Footprints,
  House,
  Landmark,
  MapPin,
  Mountain,
  MoonStar,
  Plane,
  Route,
  ShoppingBasket,
  Sparkles,
  TrainFront,
  Utensils,
} from 'lucide-react';

interface NakhonSiThammaratDestinationOverviewProps {
  activitiesHref: string;
  hotelsHref: string;
  transportHref: string;
}

const AFFILIATE_REL = 'noopener noreferrer nofollow sponsored';

const tripShapes = [
  {
    icon: MoonStar,
    label: 'One focused night',
    title: 'Temple-city introduction',
    copy: 'Use the temple district, one heritage house and a serious southern meal to give a short stop its own identity.',
  },
  {
    icon: Landmark,
    label: 'Strongest first stay',
    title: 'Two-night heritage city',
    copy: 'Add shadow puppetry, Tha Wang and a slower old-core sequence without turning Wat Phra Mahathat into a photo stop.',
  },
  {
    icon: Mountain,
    label: 'City plus landscape',
    title: 'Kiriwong extension',
    copy: 'Give the mountain village a real half-day or overnight and verify rain, river and local programme conditions close to travel.',
  },
  {
    icon: Route,
    label: 'Province-scale trip',
    title: 'Choose one direction',
    copy: 'Khanom, Sichon, Phromlok and Khao Luang point to different routes. One short city stay cannot absorb the whole province.',
  },
] as const;

const citySpine = [
  {
    icon: Landmark,
    label: 'Sacred anchor',
    title: 'Wat Phra Mahathat',
    copy: 'Begin with the city’s religious centre and treat active worship, dress and photography with care.',
    href: '/city/nakhon-si-thammarat/attractions/wat-phra-mahathat/',
  },
  {
    icon: House,
    label: 'Built heritage',
    title: 'Old core & Ban Tan Khun',
    copy: 'Let the surviving houses and lanes turn a headline temple into a readable urban quarter.',
    href: '/city/nakhon-si-thammarat/attractions/',
  },
  {
    icon: Drama,
    label: 'Living craft',
    title: 'Nang talung',
    copy: 'Read shadow puppetry as a practiced southern art with makers and performers, not as decorative merchandise.',
    href: '/city/nakhon-si-thammarat/attractions/shadow-puppet-museum/',
  },
  {
    icon: ShoppingBasket,
    label: 'Evening layer',
    title: 'Tha Wang & current food',
    copy: 'Use the market side after the heritage route, but verify what is operating rather than freezing one stall list.',
    href: '/city/nakhon-si-thammarat/food/',
  },
] as const;

const stayDecisions = [
  {
    icon: Landmark,
    label: 'Temple / Rajdamnern side',
    title: 'For heritage first',
    copy: 'Best when Wat Phra Mahathat, the old core and a walkable cultural sequence are the main reason to stay.',
  },
  {
    icon: TrainFront,
    label: 'Station / Tha Wang side',
    title: 'For connected evenings',
    copy: 'Useful for rail access, markets and an easy first or last night, with transfers for the temple district and hills.',
  },
  {
    icon: Mountain,
    label: 'Kiriwong village',
    title: 'For a separate slow stay',
    copy: 'Choose an overnight only when river, village and orchard-country rhythm are the purpose—not as a city-hotel substitute.',
  },
] as const;

const itinerary = [
  {
    day: 'Day 1',
    title: 'Start with the sacred city',
    route: 'Wat Phra Mahathat → Ban Tan Khun → old-core lanes',
    note: 'Use one compact district before lunch, then return for an evening meal instead of crossing the province on arrival day.',
  },
  {
    day: 'Day 2',
    title: 'Follow craft and food',
    route: 'Shadow puppets → museum or niello layer → Tha Wang evening',
    note: 'Check current opening or demonstration arrangements. A living craft visit needs time and respectful attention.',
  },
  {
    day: 'Day 3',
    title: 'Take one mountain direction',
    route: 'Kiriwong OR Phromlok and Khao Luang side',
    note: 'Keep the route coherent and recheck rain, road and water conditions. Khanom or Sichon deserves another trip chapter.',
  },
] as const;

const practicalChecks = [
  {
    icon: Plane,
    title: 'Airport is a separate transfer',
    copy: 'Confirm whether the vehicle ends at a city hotel, another district or an onward connection before paying.',
  },
  {
    icon: TrainFront,
    title: 'Station and temple differ',
    copy: 'Rail arrival is convenient for town, but the sacred core and a Kiriwong departure still need their own movement plan.',
  },
  {
    icon: CloudRain,
    title: 'Rain changes hill days',
    copy: 'River, waterfall, cycling and road conditions can change. Use current local information instead of a seasonal promise.',
  },
  {
    icon: CalendarDays,
    title: 'Craft visits need confirmation',
    copy: 'Museums, workshops, performances and cultural markets may not follow a universal daily schedule. Verify the programme.',
  },
] as const;

export function NakhonSiThammaratDestinationOverview({ activitiesHref, hotelsHref, transportHref }: NakhonSiThammaratDestinationOverviewProps) {
  return (
    <>
      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom">
          <div className="mb-8 grid gap-5 lg:grid-cols-[0.76fr_1.24fr] lg:items-end lg:gap-14">
            <div>
              <p className="eyebrow">Choose the scale of the trip</p>
              <h2 className="font-display text-[3.05rem] font-semibold leading-[0.9] tracking-[-0.04em] text-jade sm:text-[3.7rem]">A temple city before a province of detours.</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-charcoal/62">Nakhon Si Thammarat is strongest when the city earns its first two days through faith, houses, craft and food. Only then should Kiriwong, Phromlok or a separate coastal route expand the map.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tripShapes.map(({ icon: Icon, label, title, copy }, index) => (
              <article key={title} className={`relative overflow-hidden rounded-xl border p-5 shadow-[0_5px_18px_rgba(18,63,54,0.04)] ${index === 1 ? 'border-saffron/30 bg-[#fffaf0]' : 'border-jade/10 bg-white'}`}>
                {index === 1 && <span className="absolute right-3 top-3 rounded-md bg-saffron px-2 py-1 text-[7px] font-extrabold uppercase tracking-[0.16em] text-jade-dark">Best first balance</span>}
                <span className="grid h-10 w-10 place-items-center rounded-lg border border-saffron/25 bg-saffron/[0.055] text-saffron-dark"><Icon size={20} strokeWidth={1.55} /></span>
                <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.18em] text-saffron-dark">{label}</p>
                <h3 className="mt-1 font-display text-2xl font-semibold text-jade">{title}</h3>
                <p className="mt-3 text-[11px] leading-5 text-charcoal/58">{copy}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-jade/10 bg-white px-5 py-4">
            <p className="text-xs leading-5 text-charcoal/56"><strong className="text-jade">First visit?</strong> Two nights gives the sacred city and living craft enough room; use day three for one hill-side extension.</p>
            <a href={hotelsHref} target="_blank" rel={AFFILIATE_REL} className="inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark">Check current Nakhon Si Thammarat hotel prices on Trip.com <ExternalLink size={14} /></a>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom grid items-center gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14">
          <div>
            <p className="eyebrow">Begin with active faith</p>
            <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">The chedi is an anchor, not a backdrop.</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/62">Wat Phra Mahathat Woramahawihan gives Nakhon its clearest centre of gravity. Approach it as an active religious complex: dress with care, follow local signs, keep voices low and ask before turning worship or offerings into photography.</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                ['1', 'Read the complex first', 'Give the chedi, cloisters and devotional spaces time before reaching for the next pin.'],
                ['2', 'Keep the district together', 'Ban Tan Khun and old-core lanes make the temple part of a real heritage quarter.'],
                ['3', 'Return at a different hour', 'Morning worship and an evening food layer reveal different sides of the same area.'],
                ['4', 'Verify special programmes', 'Festivals, markets and ceremonial access change the rhythm; check current local guidance.'],
              ].map(([step, title, copy]) => (
                <article key={step} className="rounded-xl border border-jade/10 bg-white p-4">
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-saffron/35 bg-saffron/[0.05] text-[10px] font-extrabold text-saffron-dark">{step}</span>
                  <h3 className="mt-3 font-display text-xl font-semibold text-jade">{title}</h3>
                  <p className="mt-2 text-[10px] leading-5 text-charcoal/55">{copy}</p>
                </article>
              ))}
            </div>
            <Link href="/city/nakhon-si-thammarat/attractions/wat-phra-mahathat/" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark">Open the Wat Phra Mahathat guide <ArrowRight size={15} /></Link>
          </div>

          <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-jade/10 shadow-editorial-lift">
            <Image src="/images/redesign/nakhon-si-thammarat-temple-elephants.webp" alt="Worshippers and elephant sculptures at Wat Phra Mahathat in Nakhon Si Thammarat" fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-jade-dark/94 via-jade-dark/64 to-transparent px-6 pb-6 pt-24 text-white">
              <Landmark size={20} className="text-saffron-light" />
              <p className="mt-2 font-display text-2xl font-semibold">Observe the living city around the monument.</p>
              <p className="mt-1 max-w-lg text-[11px] leading-5 text-white/70">The strongest visit respects worship first, then follows architecture, houses and everyday streets beyond the temple walls.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom">
          <div className="mb-8 grid gap-5 lg:grid-cols-[0.66fr_1.34fr] lg:items-end lg:gap-14">
            <div>
              <p className="eyebrow">Follow the city spine</p>
              <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">Faith, houses, craft, then dinner.</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-charcoal/62">The city becomes memorable through sequence. Keep these four layers connected rather than treating every museum, market and temple as an isolated card.</p>
          </div>

          <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="pointer-events-none absolute left-8 right-8 top-8 hidden border-t border-dashed border-saffron/50 lg:block" />
            {citySpine.map(({ icon: Icon, label, title, copy, href }, index) => (
              <Link key={title} href={href} className="group relative rounded-xl border border-jade/10 bg-white p-5 shadow-[0_5px_18px_rgba(18,63,54,0.035)] transition hover:-translate-y-1 hover:shadow-xl">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-saffron/40 bg-[#fcfaf6] text-saffron-dark"><Icon size={18} strokeWidth={1.55} /></span>
                <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.18em] text-saffron-dark">{index + 1}. {label}</p>
                <h3 className="mt-1 font-display text-xl font-semibold text-jade">{title}</h3>
                <p className="mt-3 text-[10px] leading-5 text-charcoal/56">{copy}</p>
                <span className="mt-5 flex items-center justify-between border-t border-jade/8 pt-3 text-[10px] font-bold text-jade">Open this layer <ArrowRight size={14} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
          <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-jade/10 shadow-editorial-lift">
            <Image src="/images/redesign/nakhon-si-thammarat-shadow-puppets.webp" alt="A craftsperson making a southern nang talung shadow puppet" fill sizes="(min-width:1024px) 52vw, 100vw" className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-jade-dark/94 via-jade-dark/66 to-transparent px-6 pb-6 pt-24 text-white">
              <Drama size={20} className="text-saffron-light" />
              <p className="mt-2 font-display text-2xl font-semibold">See the hand behind the silhouette.</p>
              <p className="mt-1 max-w-lg text-[11px] leading-5 text-white/70">Nang talung gains meaning through making, repertoire and performance—not through a souvenir shape alone.</p>
            </div>
          </div>

          <div>
            <p className="eyebrow">Living heritage needs time</p>
            <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">Do not reduce shadow puppetry to a display case.</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/62">Nang talung is one of the city’s most distinctive cultural layers. A good visit connects the leather-cutting craft, characters, performance tradition and the people maintaining it. Confirm current opening or demonstration arrangements and buy directly where that exchange is appropriate.</p>
            <div className="mt-7 space-y-3">
              {[
                { icon: Footprints, title: 'Arrive with time', copy: 'A maker’s house or museum deserves more than a hurried photograph.' },
                { icon: Check, title: 'Ask before recording', copy: 'Workshop and performance access do not automatically include unrestricted filming.' },
                { icon: Sparkles, title: 'Buy with context', copy: 'A directly purchased piece carries more meaning when you understand its character and making.' },
              ].map(({ icon: Icon, title, copy }) => (
                <div key={title} className="flex gap-4 rounded-xl border border-jade/10 bg-white p-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-saffron/25 bg-saffron/[0.05] text-saffron-dark"><Icon size={17} strokeWidth={1.55} /></span>
                  <div><h3 className="font-display text-lg font-semibold text-jade">{title}</h3><p className="mt-1 text-[10px] leading-5 text-charcoal/56">{copy}</p></div>
                </div>
              ))}
            </div>
            <Link href="/city/nakhon-si-thammarat/attractions/shadow-puppet-museum/" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark">Open the shadow-puppet guide <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom grid items-center gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14">
          <div>
            <p className="eyebrow">Food is part of the heritage route</p>
            <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">Khanom jeen first. Southern curry with questions.</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/62">Build the day around a breakfast institution, a focused southern lunch and one current market or roti evening. Ask about chilli, fermented ingredients and unfamiliar herbs rather than assuming every curry arrives at the same heat or richness.</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {[
                ['Morning', 'Fresh khanom jeen, vegetables and the sauces that fit your table'],
                ['Midday', 'One proper southern spread shared across several dishes'],
                ['Evening', 'Current Tha Wang or temple-side food activity, verified that day'],
              ].map(([label, copy]) => (
                <div key={label} className="rounded-xl border border-jade/10 bg-white p-4">
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-saffron-dark">{label}</p>
                  <p className="mt-2 text-xs font-semibold leading-5 text-jade">{copy}</p>
                </div>
              ))}
            </div>
            <Link href="/city/nakhon-si-thammarat/food/" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark"><Utensils size={15} /> Open the Nakhon food guide <ArrowRight size={15} /></Link>
          </div>

          <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-jade/10 shadow-editorial-lift">
            <Image src="/images/redesign/nakhon-si-thammarat-food.webp" alt="Khanom jeen, southern curries, vegetables and coffee in Nakhon Si Thammarat" fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
            <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/20 bg-jade-dark/84 p-5 text-white backdrop-blur-sm">
              <Utensils size={19} className="text-saffron-light" />
              <p className="mt-2 font-display text-xl font-semibold">Taste the dish. Learn the technique. Choose tools only when useful.</p>
              <p className="mt-1 text-[10px] leading-5 text-white/68">Any later cookware recommendation belongs with a recipe or cooking task on the food owner—not inside this broad city guide.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom">
          <div className="relative min-h-[400px] overflow-hidden rounded-2xl bg-jade-dark text-white shadow-editorial-lift">
            <Image src="/images/redesign/nakhon-si-thammarat-route-banner.webp" alt="Wet heritage street leading toward Wat Phra Mahathat in Nakhon Si Thammarat" fill sizes="100vw" className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-jade-dark/98 via-jade-dark/78 to-jade-dark/12" />
            <div className="relative max-w-2xl px-7 py-12 sm:px-10 lg:px-14 lg:py-16">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-saffron-light">Temple district → craft → Tha Wang → hills</p>
              <h2 className="mt-3 font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] sm:text-[3.7rem]">Keep the city linear before the province branches.</h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/72">The city route can stay coherent on its north–south spine. Kiriwong and Phromlok pull west toward the mountains; Khanom and Sichon are separate coastal chapters. Compare the exact transport chain before combining them.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={transportHref} target="_blank" rel={AFFILIATE_REL} className="btn-cream min-h-11 px-5 text-saffron-dark">Check current Nakhon routes on 12Go <ExternalLink size={14} /></a>
                <Link href="/city/nakhon-si-thammarat/attractions/" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/35 px-5 text-xs font-bold text-white hover:bg-white/10">Open all city attractions <ArrowRight size={14} /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
          <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-jade/10 shadow-editorial-lift">
            <Image src="/images/redesign/nakhon-si-thammarat-kiriwong.webp" alt="River, bridge and mountain village landscape in Kiriwong" fill sizes="(min-width:1024px) 56vw, 100vw" className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-jade-dark/94 via-jade-dark/62 to-transparent px-6 pb-6 pt-24 text-white">
              <Mountain size={20} className="text-saffron-light" />
              <p className="mt-2 font-display text-2xl font-semibold">A village day, not a scenic pit stop.</p>
              <p className="mt-1 max-w-lg text-[11px] leading-5 text-white/70">Walking, cycling, river context, orchards and community enterprise need enough time to remain more than a bridge photograph.</p>
            </div>
          </div>

          <div>
            <p className="eyebrow">One edited mountain extension</p>
            <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">Give Kiriwong a real half-day—or stay.</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/62">Kiriwong works when the village and river landscape set the pace. Arrange transport as its own return route, verify current weather and water conditions, and let food or locally made products create a direct value exchange.</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                { icon: Bike, title: 'Move slowly', copy: 'Walk or cycle only where conditions and confidence make that sensible.' },
                { icon: CloudRain, title: 'Check the hills', copy: 'Rain and river conditions can change the best route or activity.' },
                { icon: ShoppingBasket, title: 'Spend locally', copy: 'Use food, fruit or community products as part of the visit—not a token stop.' },
                { icon: House, title: 'Overnight with purpose', copy: 'Stay only when village mornings and a slower rhythm are the point.' },
              ].map(({ icon: Icon, title, copy }) => (
                <article key={title} className="rounded-xl border border-jade/10 bg-white p-4">
                  <Icon size={18} className="text-jade" strokeWidth={1.55} />
                  <h3 className="mt-3 font-display text-xl font-semibold text-jade">{title}</h3>
                  <p className="mt-2 text-[10px] leading-5 text-charcoal/55">{copy}</p>
                </article>
              ))}
            </div>
            <Link href="/city/nakhon-si-thammarat/attractions/kiriwong-village/" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark">Open the Kiriwong guide <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[0.64fr_1.36fr] lg:items-end lg:gap-14">
            <div>
              <p className="eyebrow">Pick the base before the room</p>
              <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">Three bases. Three different mornings.</h2>
              <p className="mt-5 text-sm leading-7 text-charcoal/62">Choose the address that protects the main purpose of the trip instead of comparing every property under one city label.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {stayDecisions.map(({ icon: Icon, label, title, copy }) => (
                <article key={label} className="rounded-xl border border-jade/10 bg-white p-5 shadow-[0_5px_18px_rgba(18,63,54,0.035)]">
                  <span className="grid h-10 w-10 place-items-center rounded-lg border border-saffron/25 bg-saffron/[0.05] text-saffron-dark"><Icon size={19} strokeWidth={1.55} /></span>
                  <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.18em] text-saffron-dark">{label}</p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-jade">{title}</h3>
                  <p className="mt-3 text-[10px] leading-5 text-charcoal/56">{copy}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-jade/10 bg-white px-5 py-4">
            <p className="text-xs leading-5 text-charcoal/56"><strong className="text-jade">Hotel rule:</strong> compare current prices only after deciding whether the first morning belongs to the temple, station or mountain village.</p>
            <a href={hotelsHref} target="_blank" rel={AFFILIATE_REL} className="inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark">Check current stays on Trip.com <ExternalLink size={14} /></a>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom grid gap-10 lg:grid-cols-[0.56fr_1.8fr] lg:gap-14">
          <div>
            <p className="eyebrow">A realistic first itinerary</p>
            <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">Two city days. One hill direction.</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/62">The sequence protects the city’s cultural depth and stops Kiriwong, Phromlok and the coast from collapsing into one impossible province loop.</p>
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
            <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">Confirm the ritual, craft and road—not only the pin.</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/62">The city is straightforward when active religious sites, workshop access and province-scale transfers are planned as different kinds of visit.</p>
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
              <MapPin size={18} className="mt-0.5 shrink-0 text-saffron-dark" />
              <p className="text-xs leading-5 text-charcoal/56"><strong className="text-jade">Province is not city.</strong> Khanom, Sichon, Kiriwong and Khao Luang belong to separate directions. Build one coherent extension after the urban owner has done its job.</p>
            </div>
            <a href={activitiesHref} target="_blank" rel={AFFILIATE_REL} className="inline-flex items-center gap-2 text-[10px] font-bold text-jade hover:text-saffron-dark">Check current experiences on Klook <ExternalLink size={13} /></a>
          </div>
        </div>
      </section>
    </>
  );
}
