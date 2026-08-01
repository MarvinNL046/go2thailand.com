import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BedDouble,
  Bike,
  CalendarDays,
  Check,
  CloudFog,
  Compass,
  ExternalLink,
  Footprints,
  Landmark,
  Map,
  MapPin,
  Route,
  ShieldCheck,
  Soup,
  Utensils,
} from 'lucide-react';
import { StoryDottedRoute } from '../visuals/StoryDottedRoute';

interface ChiangMaiDestinationOverviewProps {
  activitiesHref: string;
  hotelsHref: string;
  transportHref: string;
}

const AFFILIATE_REL = 'noopener noreferrer nofollow sponsored';

const zones = [
  { title: 'Old City', label: 'First visit & temples', copy: 'The easiest base for moat-side orientation, early temple walks and Sunday Walking Street. Choose your exact edge if late-night cafes matter.', image: '/images/cities/chiang-mai/redesign/chiang-mai-stay-old-city.webp' },
  { title: 'Nimman', label: 'Cafes & modern energy', copy: 'A strong fit for design shops, coffee, newer hotels and the Suthep side of town. Aircraft noise and busy roads vary by block.', image: '/images/cities/chiang-mai/redesign/chiang-mai-stay-nimman.webp' },
  { title: 'Riverside', label: 'Slower boutique stay', copy: 'Pick the Ping River for atmospheric hotels and calmer evenings. You will usually ride rather than walk to the main Old City sights.', image: '/images/cities/chiang-mai/redesign/chiang-mai-stay-riverside.webp' },
  { title: 'Santitham', label: 'Local food & value', copy: 'Useful for longer stays and neighbourhood eating between the Old City and Nimman, with fewer headline sights outside your door.', image: '/images/cities/chiang-mai/redesign/chiang-mai-stay-santitham.webp' },
] as const;

const experiences = [
  { title: 'Read the Old City slowly', tag: 'Lanna heritage', copy: 'Pair one headline wat with smaller temples and the moat. Chiang Mai makes more sense as a living temple city than as a race between photo stops.', image: '/images/cities/chiang-mai/redesign/chiang-mai-attractions-hero.webp', href: '/city/chiang-mai/attractions/' },
  { title: 'Follow food beyond khao soi', tag: 'Northern food', copy: 'Use khao soi as a doorway, then try sai ua, nam prik noom and a shared Northern Thai table rather than returning to generic favourites.', image: '/images/cities/chiang-mai/redesign/chiang-mai-food-khao-soi.webp', href: '/city/chiang-mai/food/' },
  { title: 'Climb into the foothills', tag: 'Mountain contrast', copy: 'Doi Suthep, Wat Pha Lat and Wat Umong add forest and altitude to a city-heavy plan. Group them by geography, not fame.', image: '/images/cities/chiang-mai/redesign/chiang-mai-attraction-wat-pha-lat.webp', href: '/city/chiang-mai/attractions/' },
  { title: 'Make room for craft culture', tag: 'Creative Chiang Mai', copy: 'Studios, markets, ceramics and coffee reveal the contemporary city. Baan Kang Wat works best as a slow browse, not a rushed detour.', image: '/images/cities/chiang-mai/redesign/chiang-mai-attraction-creative-courtyard.webp', href: '/city/chiang-mai/attractions/' },
] as const;

const itinerary = [
  { day: 'Day 1', title: 'Old City & markets', route: 'Temple cluster → moat break → chosen walking street', note: 'Start before the heat, dress for temples and keep the evening flexible for the market running that day.' },
  { day: 'Day 2', title: 'Mountain & west side', route: 'Wat Pha Lat or Doi Suthep → Nimman → relaxed dinner', note: 'Do not squeeze every mountain stop into one transfer. Weather and visibility should decide how far uphill you go.' },
  { day: 'Day 3', title: 'Choose your deeper experience', route: 'Cooking class, sanctuary or nature day → slow final evening', note: 'Choose one full experience carefully. A welfare-led sanctuary visit and a good cooking class both deserve more than a leftover hour.' },
] as const;

const transport = [
  { icon: Footprints, title: 'Walking', copy: 'Excellent inside the Old City and within individual neighbourhoods. The wider city is not one continuous comfortable walk.' },
  { icon: Route, title: 'Red songthaew', copy: 'A flexible shared option for short city journeys. Agree on the destination before boarding and avoid treating every red truck as a fixed-route bus.' },
  { icon: MapPin, title: 'Ride-hailing', copy: 'Useful between the Old City, Nimman, river and airport. Pickup points can be easier on a quieter side street than beside a busy gate.' },
  { icon: Bike, title: 'Scooter', copy: 'Not required for a good trip. Only ride with the correct licence, insurance and real experience; mountain roads add risk.' },
] as const;

const practical = [
  { icon: CloudFog, title: 'Check air, not just season', copy: 'Smoke and haze vary by year and day. If clear mountain views or respiratory comfort matter, check live air-quality forecasts before committing.' },
  { icon: Landmark, title: 'Dress once for the day', copy: 'Covered shoulders and knees make multi-temple mornings easier. Carry footwear that is simple to remove at entrances.' },
  { icon: ShieldCheck, title: 'Audit animal experiences', copy: 'Similar marketing language can hide very different welfare models. Research handling, performances and visitor contact before booking.' },
  { icon: Soup, title: 'Eat regionally', copy: 'Northern dishes are a core part of the destination. Use markets and specialist restaurants to build a meal beyond one famous bowl.' },
] as const;

export function ChiangMaiDestinationOverview({ activitiesHref, hotelsHref, transportHref }: ChiangMaiDestinationOverviewProps) {
  return (
    <>
      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom">
          <div className="mb-8 grid gap-5 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:gap-14">
            <div><p className="eyebrow">Choose your Chiang Mai</p><h2 className="font-display text-[3.05rem] font-semibold leading-[0.9] tracking-[-0.04em] text-jade sm:text-[3.7rem]">Stay for the trip you actually want.</h2></div>
            <p className="max-w-2xl text-sm leading-7 text-charcoal/62">The moat is a landmark, not the only centre. Start with temples, cafes, nightlife or a slower hotel atmosphere, then choose the district that removes your most repeated ride.</p>
          </div>
          <div className="scrollbar-hide flex snap-x gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
            {zones.map(zone => (
              <article key={zone.title} className="min-w-[80vw] snap-start overflow-hidden rounded-xl border border-jade/10 bg-white shadow-[0_5px_18px_rgba(18,63,54,0.04)] sm:min-w-0">
                <div className="relative aspect-[4/2.45]"><Image src={zone.image} alt={`${zone.title}, Chiang Mai`} fill sizes="(min-width:1024px) 25vw, 80vw" className="object-cover" /></div>
                <div className="p-5"><p className="text-[9px] font-bold uppercase tracking-[0.18em] text-saffron-dark">{zone.label}</p><h3 className="mt-1 font-display text-2xl font-semibold text-jade">{zone.title}</h3><p className="mt-3 text-[11px] leading-5 text-charcoal/58">{zone.copy}</p></div>
              </article>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-jade/10 bg-white px-5 py-4"><p className="text-xs leading-5 text-charcoal/56"><strong className="text-jade">Hotel names can be misleading.</strong> Check the actual map pin, evening return and airport noise before paying.</p><a href={hotelsHref} target="_blank" rel={AFFILIATE_REL} className="inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark">Check current hotel prices on Trip.com <ExternalLink size={14} /></a></div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom">
          <div className="mb-7 flex items-end justify-between gap-5"><div><p className="eyebrow">Four city rhythms</p><h2 className="font-display text-[2.9rem] font-semibold leading-none tracking-[-0.04em] text-jade sm:text-[3.4rem]">More than temples and day trips.</h2></div><Link href="/city/chiang-mai/attractions/" className="hidden items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark sm:flex">All Chiang Mai attractions <ArrowRight size={15} /></Link></div>
          <div className="scrollbar-hide flex snap-x gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
            {experiences.map(item => (
              <Link key={item.title} href={item.href} className="group min-w-[80vw] snap-start overflow-hidden rounded-xl border border-jade/10 bg-white shadow-[0_5px_18px_rgba(18,63,54,0.04)] transition hover:-translate-y-1 hover:shadow-xl sm:min-w-0">
                <div className="relative aspect-[4/2.9] overflow-hidden"><Image src={item.image} alt={item.title} fill sizes="(min-width:1024px) 25vw, 80vw" className="object-cover transition duration-500 group-hover:scale-[1.035]" /><span className="absolute left-3 top-3 rounded-md bg-jade/88 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.17em] text-white backdrop-blur">{item.tag}</span></div>
                <div className="p-4"><h3 className="font-display text-[1.35rem] font-semibold leading-tight text-jade">{item.title}</h3><p className="mt-2 text-[11px] leading-5 text-charcoal/58">{item.copy}</p><span className="mt-4 flex items-center justify-between border-t border-jade/8 pt-3 text-[10px] font-bold text-jade">Open the guide <ArrowRight size={14} /></span></div>
              </Link>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-jade/10 bg-white px-5 py-4"><p className="text-xs leading-5 text-charcoal/56"><strong className="text-jade">Want one organised experience?</strong> Compare formats and welfare or group-size details before booking.</p><a href={activitiesHref} target="_blank" rel={AFFILIATE_REL} className="inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark">Check current options on Klook <ExternalLink size={14} /></a></div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-2xl bg-jade-dark text-white shadow-editorial-lift">
            <Image src="/images/cities/chiang-mai/redesign/chiang-mai-route-planning.webp" alt="Planning a route between Chiang Mai city and mountain temples" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-jade-dark via-jade-dark/88 to-jade-dark/15" />
            <div className="relative grid min-h-[390px] items-center gap-8 px-7 py-10 sm:px-10 lg:grid-cols-[0.72fr_1.2fr] lg:px-14"><div><p className="text-[10px] font-bold uppercase tracking-[0.22em] text-saffron-light">City to mountain</p><h2 className="mt-3 max-w-md font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] sm:text-[3.7rem]">Let the west side rise into the day.</h2><p className="mt-5 max-w-md text-sm leading-7 text-white/70">Old City, Wat Umong, Wat Pha Lat and Doi Suthep form a geographic story. Follow the foothills deliberately and return through Nimman instead of zigzagging across town.</p></div><div className="relative hidden min-h-[250px] lg:block"><StoryDottedRoute className="absolute left-0 top-14 h-40 w-72 opacity-90" /><div className="absolute right-0 top-0 grid w-[390px] grid-cols-2 gap-3">{['Old City morning','Forest temple pause','Mountain viewpoint','Nimman evening'].map((label,index)=><div key={label} className="rounded-xl border border-white/15 bg-white/[0.09] p-4 backdrop-blur-sm"><span className="text-[9px] font-bold uppercase tracking-[0.18em] text-saffron-light">Stop {index+1}</span><strong className="mt-1.5 block font-display text-lg font-semibold">{label}</strong></div>)}</div></div></div>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom grid gap-10 lg:grid-cols-[0.62fr_1.6fr] lg:gap-14"><div><p className="eyebrow">A realistic first visit</p><h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">Three days with room to notice Chiang Mai.</h2><p className="mt-5 text-sm leading-7 text-charcoal/62">Three full days cover a strong first layer. Add a fourth for another nature day, craft route or slower neighbourhood—not to double the number of stops.</p></div><div className="relative grid gap-4 lg:grid-cols-3"><div className="pointer-events-none absolute left-8 right-8 top-8 hidden border-t border-dashed border-saffron/55 lg:block" />{itinerary.map((item,index)=><article key={item.day} className="relative rounded-xl border border-jade/10 bg-white p-5 shadow-[0_5px_18px_rgba(18,63,54,0.035)]"><span className="grid h-8 w-8 place-items-center rounded-full border border-saffron/45 bg-[#fcfaf6] text-[10px] font-extrabold text-saffron-dark">{index+1}</span><p className="mt-5 text-[9px] font-bold uppercase tracking-[0.18em] text-saffron-dark">{item.day}</p><h3 className="mt-1 font-display text-2xl font-semibold text-jade">{item.title}</h3><p className="mt-4 text-xs font-bold leading-5 text-jade">{item.route}</p><p className="mt-3 text-[11px] leading-5 text-charcoal/56">{item.note}</p></article>)}</div></div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
        <div className="container-custom grid gap-5 lg:grid-cols-2">
          <article className="overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-[0_6px_22px_rgba(18,63,54,0.045)]"><div className="relative aspect-[16/8.5]"><Image src="/images/cities/chiang-mai/redesign/chiang-mai-food-khao-soi.webp" alt="Khao soi in Chiang Mai" fill sizes="50vw" className="object-cover" /></div><div className="p-6 sm:p-8"><p className="eyebrow">Eat Northern</p><h2 className="font-display text-[2.75rem] font-semibold leading-[0.95] tracking-[-0.035em] text-jade">Khao soi is the first chapter.</h2><p className="mt-4 text-sm leading-7 text-charcoal/62">Continue with sai ua, nam prik noom, kanom jeen nam ngiao and a shared Northern table. The dedicated food guide keeps dishes and neighbourhood choices in one place.</p><Link href="/city/chiang-mai/food/" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark">Plan where to eat <ArrowRight size={15} /></Link></div></article>
          <article className="overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-[0_6px_22px_rgba(18,63,54,0.045)]"><div className="relative aspect-[16/8.5]"><Image src="/images/cities/chiang-mai/redesign/chiang-mai-weather-green-season.webp" alt="Green season near Chiang Mai" fill sizes="50vw" className="object-cover" /></div><div className="p-6 sm:p-8"><p className="eyebrow">Choose conditions, not a slogan</p><h2 className="font-display text-[2.75rem] font-semibold leading-[0.95] tracking-[-0.035em] text-jade">Smoky season deserves a real decision.</h2><p className="mt-4 text-sm leading-7 text-charcoal/62">Haze risk is commonly higher in the late dry season, but conditions are not identical every year. Read the weather guide, then check live air quality close to departure.</p><Link href="/city/chiang-mai/weather/" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark"><CalendarDays size={15} /> Compare seasons and months <ArrowRight size={15} /></Link></div></article>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16"><div className="container-custom grid items-center gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14"><div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-jade/10 shadow-editorial-lift"><Image src="/images/cities/chiang-mai/redesign/chiang-mai-zones-banner.webp" alt="Chiang Mai neighbourhoods and city transport" fill sizes="48vw" className="object-cover" /></div><div><p className="eyebrow">Move in short clusters</p><h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.6rem]">Walk the moat. Ride the gaps.</h2><p className="mt-5 text-sm leading-7 text-charcoal/62">The Old City is walkable, but Chiang Mai extends far beyond it. Use short rides between zones and save long transfers for mountain or countryside days.</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{transport.map(({icon:Icon,title,copy})=><article key={title} className="rounded-xl border border-jade/10 bg-white p-4"><Icon size={19} className="text-jade" strokeWidth={1.55}/><h3 className="mt-3 font-display text-xl font-semibold text-jade">{title}</h3><p className="mt-2 text-[10px] leading-5 text-charcoal/55">{copy}</p></article>)}</div><a href={transportHref} target="_blank" rel={AFFILIATE_REL} className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-jade hover:text-saffron-dark">Check current intercity transport on 12Go <ExternalLink size={14}/></a></div></div></section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16"><div className="container-custom"><div className="grid gap-8 lg:grid-cols-[0.72fr_1.5fr] lg:gap-14"><div><p className="eyebrow">Before you go</p><h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-jade sm:text-[3.55rem]">Small choices protect the calm.</h2><p className="mt-5 text-sm leading-7 text-charcoal/62">Weather, air quality, temple etiquette and animal welfare influence this trip more than another oversized attraction list.</p></div><div className="grid gap-3 sm:grid-cols-2">{practical.map(({icon:Icon,title,copy})=><article key={title} className="rounded-xl border border-jade/10 bg-white p-5 shadow-[0_5px_18px_rgba(18,63,54,0.035)]"><span className="grid h-10 w-10 place-items-center rounded-lg border border-jade/10 bg-jade/[0.025] text-jade"><Icon size={20} strokeWidth={1.55}/></span><h3 className="mt-4 font-display text-2xl font-semibold text-jade">{title}</h3><p className="mt-2 text-[11px] leading-5 text-charcoal/57">{copy}</p></article>)}</div></div><div className="mt-9 rounded-2xl border border-jade/10 bg-white px-6 py-7 sm:px-8"><div className="grid gap-6 lg:grid-cols-[0.72fr_1.4fr] lg:items-center"><div><p className="eyebrow">Useful first-day reset</p><h3 className="font-display text-[2.35rem] font-semibold leading-[0.95] text-jade">Arrive with one easy loop.</h3></div><ul className="grid gap-3 text-xs leading-5 text-charcoal/60 sm:grid-cols-2">{['Save your hotel name and pin before leaving the airport.','Choose one walkable temple or meal near your base.','Check live air quality before a mountain-view day.','Book only one major experience for the following morning.'].map(item=><li key={item} className="flex gap-2.5"><Check size={15} className="mt-0.5 shrink-0 text-saffron-dark"/>{item}</li>)}</ul></div></div></div></section>

      <section className="section-divider-bottom bg-jade-dark py-12 text-white lg:py-16"><div className="container-custom grid gap-9 lg:grid-cols-[0.68fr_1.5fr] lg:items-center lg:gap-14"><div><p className="text-[10px] font-bold uppercase tracking-[0.22em] text-saffron-light">Continue planning</p><h2 className="mt-3 font-display text-[3rem] font-semibold leading-[0.93] tracking-[-0.04em]">Build the rest of your Chiang Mai trip.</h2><p className="mt-4 text-sm leading-7 text-white/64">Use each specialist guide for one decision instead of making this overview pretend to answer everything.</p></div><div className="grid gap-3 sm:grid-cols-2">{[
        {icon:Compass,title:'Chiang Mai attractions',copy:'Temples, mountains, markets and quieter creative stops.',href:'/city/chiang-mai/attractions/'},
        {icon:Utensils,title:'Food in Chiang Mai',copy:'Northern dishes, markets, restaurants and cooking classes.',href:'/city/chiang-mai/food/'},
        {icon:BedDouble,title:'Where to stay',copy:'Choose Old City, Nimman, riverside or a quieter base.',href:'/where-to-stay/chiang-mai/'},
        {icon:Map,title:'Northern Thailand',copy:'Connect Chiang Mai to Chiang Rai and the wider north.',href:'/thailand-travel-guide/'},
      ].map(({icon:Icon,title,copy,href})=><Link key={title} href={href} className="group rounded-xl border border-white/12 bg-white/[0.07] p-5 transition hover:-translate-y-0.5 hover:border-saffron/45 hover:bg-white/[0.11]"><Icon size={20} className="text-saffron-light" strokeWidth={1.55}/><h3 className="mt-4 flex items-center justify-between font-display text-xl font-semibold">{title}<ArrowRight size={15} className="text-saffron-light"/></h3><p className="mt-2 text-[10px] leading-5 text-white/55">{copy}</p></Link>)}</div></div></section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-9"><div className="container-custom flex flex-col gap-5 text-[10px] leading-5 text-charcoal/52 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-3xl"><p className="font-bold uppercase tracking-[0.18em] text-jade">Editorial method</p><p className="mt-2">This guide separates the city decision from changing air quality, venue access, hotel inventory and tour availability. Current English search results and destination specialists informed the structure; verify live conditions with official sources close to travel.</p></div><div className="flex flex-wrap gap-x-4 gap-y-2 font-bold text-jade"><a href="https://www.tourismthailand.org/Destinations/Provinces/Chiang-Mai/101" target="_blank" rel="noopener noreferrer nofollow" className="hover:text-saffron-dark">Tourism Authority of Thailand</a><Link href="/editorial-policy/" className="hover:text-saffron-dark">Editorial policy</Link></div></div></section>
    </>
  );
}
