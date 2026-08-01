import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  Clock3,
  ExternalLink,
  MapPin,
  ShieldCheck,
  Sparkles,
  Utensils,
} from 'lucide-react';
import { cityAffiliates, KLOOK_GENERIC, withPlacementSubId } from '../../lib/affiliates';

export interface TopTenGuideItem {
  rank: number;
  name: string;
  description?: string;
  location?: string;
  current_price?: string;
  highlights?: string[];
  insider_tips?: string[];
  current_info?: string;
  story?: string;
  why_locals_love_it?: string;
}

interface GuideSource {
  title: string;
  creator: string;
  url: string;
  description?: string;
}

interface Props {
  city: { slug: string; name: { en: string }; image: string };
  mode: 'attractions' | 'restaurants';
  title: string;
  intro: string;
  items: TopTenGuideItem[];
  editorial?: string;
  sources?: GuideSource[];
  reviewedLabel?: string | null;
}

const safeImage = (image: string) => image || '/images/redesign/thailand-hidden-waterfall-traveler.webp';

export default function TopTenEditorialGuide({
  city,
  mode,
  title,
  intro,
  items,
  editorial,
  sources = [],
  reviewedLabel,
}: Props) {
  const isAttractions = mode === 'attractions';
  const siblingHref = isAttractions
    ? `/city/${city.slug}/top-10-restaurants/`
    : `/city/${city.slug}/top-10-attractions/`;
  const siblingLabel = isAttractions ? `Where to eat in ${city.name.en}` : `Things to do in ${city.name.en}`;
  const klookHref = withPlacementSubId(
    cityAffiliates[city.slug]?.klook || KLOOK_GENERIC,
    `city-${city.slug}`,
    'top-ten-guide',
  );

  return (
    <div data-premium-template="top-ten-editorial-guide" className="overflow-hidden bg-canvas text-charcoal">
      <section className="relative min-h-[560px] border-b border-jade/10 lg:min-h-[650px]">
        <Image
          src={safeImage(city.image)}
          alt={`${city.name.en}, Thailand`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-jade-dark via-jade-dark/82 to-jade/15" />
        <div className="container-custom relative flex min-h-[560px] items-end py-14 lg:min-h-[650px] lg:items-center lg:py-24">
          <div className="max-w-3xl text-white">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-saffron-light">
              {isAttractions ? 'Choose by experience' : 'Choose by appetite'}
            </p>
            <h1 className="mt-4 font-display text-[3.6rem] font-semibold leading-[0.84] tracking-[-0.045em] sm:text-[4.8rem] lg:text-[6rem]">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-sm font-medium leading-7 text-white/76 sm:text-base">{intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#shortlist" className="btn-primary group min-h-12 px-6">
                Explore the shortlist <ArrowRight size={15} className="text-saffron-light transition group-hover:translate-x-1" />
              </a>
              <Link href={`/city/${city.slug}/`} className="btn-cream group min-h-12 px-6 text-jade">
                Open the city guide <ArrowRight size={15} className="text-saffron transition group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-canvas">
        <div className="container-custom grid gap-px overflow-hidden rounded-2xl border border-jade/10 bg-jade/10 md:grid-cols-3">
          {[
            { icon: ShieldCheck, label: 'Editorial method', value: 'A practical shortlist, not a booking guarantee' },
            { icon: Clock3, label: 'Freshness', value: reviewedLabel ? `Reviewed ${reviewedLabel}` : 'Verify details shortly before visiting' },
            { icon: MapPin, label: 'Local check', value: isAttractions ? 'Confirm access, hours and dress rules' : 'Confirm opening hours, menu and reservation rules' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-4 bg-canvas px-5 py-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-saffron/25 bg-white text-jade"><Icon size={19} /></span>
              <div><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">{label}</p><p className="mt-1 text-xs font-semibold leading-5 text-jade">{value}</p></div>
            </div>
          ))}
        </div>
      </section>

      {(editorial || items.length > 0) && (
        <section className="section-divider-bottom py-14 lg:py-20">
          <div className="container-custom grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="eyebrow">Start with the shape of your day</p>
              <h2 className="heading-redesign">A list works better with context.</h2>
            </div>
            <p className="max-w-2xl text-sm font-medium leading-7 text-charcoal/68 lg:justify-self-end">
              {editorial || (isAttractions
                ? `Mix one anchor sight with a neighbourhood, food stop or slower outdoor moment. That leaves room for weather and travel time in ${city.name.en}.`
                : `Use this shortlist to compare neighbourhood, cuisine and occasion. Menus, chefs, opening hours and reservation policies can change.`)}{' '}
              Continue with the <Link href={`/city/${city.slug}/`} className="font-bold text-jade underline decoration-saffron/50 underline-offset-4 hover:text-saffron-dark">complete {city.name.en} travel guide</Link> when you are ready to connect the stops.
            </p>
          </div>
        </section>
      )}

      <section id="shortlist" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
        <div className="container-custom">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="eyebrow">The considered shortlist</p><h2 className="heading-redesign">{isAttractions ? 'Places worth building around.' : 'Places to compare before you go.'}</h2></div>
            <Link href={siblingHref} className="inline-flex items-center gap-2 text-xs font-extrabold text-jade hover:text-saffron-dark">{siblingLabel} <ArrowRight size={15} /></Link>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {items.map((item) => {
              const highlights = (item.highlights?.length ? item.highlights : item.insider_tips || []).slice(0, 3);
              return (
                <article id={`${isAttractions ? 'attraction' : 'restaurant'}-${item.rank}`} key={`${item.rank}-${item.name}`} className="group relative overflow-hidden rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card sm:p-8">
                  <div aria-hidden="true" className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-saffron/[0.08] transition-transform duration-500 group-hover:scale-125" />
                  <div className="relative flex items-start justify-between gap-5">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-jade font-display text-xl font-semibold text-saffron-light">{String(item.rank).padStart(2, '0')}</span>
                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${item.name} ${city.name.en} Thailand`)}`} target="_blank" rel="noopener noreferrer" aria-label={`Find ${item.name} on Google Maps`} className="grid h-10 w-10 place-items-center rounded-xl border border-jade/10 text-jade transition hover:border-saffron/40 hover:text-saffron-dark"><MapPin size={18} /></a>
                  </div>
                  <h3 className="relative mt-7 font-display text-[2rem] font-semibold leading-[0.94] text-jade">{item.name}</h3>
                  {item.location && <p className="relative mt-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-saffron-dark">{item.location}</p>}
                  <p className="relative mt-5 text-sm font-medium leading-7 text-charcoal/68">{item.description || item.story}</p>
                  {highlights.length > 0 && <ul className="relative mt-6 space-y-2 border-t border-jade/10 pt-5">{highlights.map((highlight) => <li key={highlight} className="flex gap-3 text-xs font-semibold leading-5 text-charcoal/66"><Check size={14} className="mt-0.5 shrink-0 text-saffron-dark" />{highlight}</li>)}</ul>}
                  {item.current_price && <p className="relative mt-5 rounded-xl bg-tonal px-4 py-3 text-[11px] font-semibold leading-5 text-jade"><span className="text-saffron-dark">Indicative price note:</span> {item.current_price}. Verify the current menu or official venue information before relying on it.</p>}
                  {item.current_info && <p className="relative mt-4 text-[11px] font-medium leading-5 text-charcoal/58"><strong className="text-jade">Check before visiting:</strong> {item.current_info}</p>}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-jade py-14 text-white lg:py-20">
        <div className="container-custom grid gap-9 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            <p className="eyebrow !text-saffron-light">Turn the shortlist into a plan</p>
            <h2 className="mt-3 max-w-3xl font-display text-[3.3rem] font-semibold leading-[0.88] tracking-[-0.04em]">
              {isAttractions ? 'Compare the day, then check the live option.' : 'Choose the area first, then confirm the table.'}
            </h2>
            <p className="mt-5 max-w-2xl text-sm font-medium leading-7 text-white/65">
              {isAttractions
                ? 'Tour availability, inclusions and meeting points change. The partner link is a comparison starting point; verify the exact product and total price before paying.'
                : 'Restaurant lists date quickly. Check the venue’s own recent channel for opening hours, menu, dietary questions and reservations.'}
            </p>
          </div>
          <div className="rounded-2xl border border-white/14 bg-white/[0.06] p-6 backdrop-blur-sm">
            <div className="flex items-center gap-4"><span className="grid h-12 w-12 place-items-center rounded-xl bg-saffron text-white">{isAttractions ? <Sparkles size={21} /> : <Utensils size={21} />}</span><div><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">Next step</p><p className="font-display text-2xl font-semibold">{isAttractions ? 'See current activities' : 'Continue planning the city'}</p></div></div>
            {isAttractions ? (
              <a href={klookHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-cream group mt-7 w-full justify-between text-jade">Check live options on Klook <ExternalLink size={15} className="text-saffron" /></a>
            ) : (
              <Link href={`/city/${city.slug}/`} className="btn-cream group mt-7 w-full justify-between text-jade">Open {city.name.en} guide <ArrowRight size={15} className="text-saffron" /></Link>
            )}
            <p className="mt-4 text-[10px] leading-5 text-white/48">{isAttractions ? 'Affiliate link: we may receive a commission, at no extra cost to you.' : 'No restaurant placement on this page is sold as a guaranteed ranking.'}</p>
          </div>
        </div>
      </section>

      {sources.length > 0 && (
        <section className="section-divider-bottom py-14 lg:py-20">
          <div className="container-custom grid gap-8 lg:grid-cols-[0.65fr_1.35fr]">
            <div><p className="eyebrow">Source trail</p><h2 className="heading-redesign">Check the latest details.</h2><p className="mt-4 text-xs font-medium leading-6 text-charcoal/58">Sources support the editorial review, but venues and operators remain responsible for their current information.</p></div>
            <div className="divide-y divide-jade/10 border-y border-jade/10">{sources.map((source) => <a key={`${source.url}-${source.title}`} href={source.url} target="_blank" rel="noopener noreferrer" className="group grid gap-2 py-5 sm:grid-cols-[1fr_auto] sm:items-center"><div><h3 className="font-display text-xl font-semibold text-jade">{source.title}</h3><p className="mt-1 text-[10px] font-bold uppercase tracking-[0.1em] text-charcoal/45">{source.creator}</p></div><ExternalLink size={15} className="text-saffron transition group-hover:translate-x-1" /></a>)}</div>
          </div>
        </section>
      )}

      <section className="py-12">
        <div className="container-custom flex flex-col items-start justify-between gap-5 rounded-2xl border border-jade/10 bg-tonal p-7 sm:flex-row sm:items-center">
          <div><p className="eyebrow">Keep exploring</p><p className="font-display text-2xl font-semibold text-jade">Build the rest of your {city.name.en} trip.</p></div>
          <div className="flex flex-wrap gap-3"><Link href={`/best-hotels/${city.slug}/`} className="btn-secondary">Compare places to stay <ArrowRight size={14} /></Link><Link href={`/city/${city.slug}/`} className="btn-primary">City guide <ArrowRight size={14} className="text-saffron-light" /></Link></div>
        </div>
      </section>
    </div>
  );
}
