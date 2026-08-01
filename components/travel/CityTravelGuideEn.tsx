import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  CalendarDays,
  Check,
  CircleDollarSign,
  ExternalLink,
  Map,
  MapPin,
  Route,
  ShieldCheck,
  Sparkles,
  TrainFront,
  Utensils,
} from "lucide-react";
import type { TravelGuidePage } from "../../lib/cluster-types";
import type { CityAffiliates } from "../../lib/affiliates";
import { withSubId } from "../../lib/affiliates";
import { normalizeEnInternalHref } from "../../lib/en-route-owners";
import { useSubId } from "../../lib/useSubId";
import SEOHead from "../SEOHead";
import { AffiliateDisclosure } from "../design/AffiliateDisclosure";
import { EditorialHero } from "../design/EditorialHero";
import { PageSectionNav } from "../design/PageSectionNav";
import { RelatedGuidesSection } from "../design/RelatedGuidesSection";
import { SectionHeading } from "../design/SectionHeading";
import { SourceMethodSection } from "../design/SourceMethodSection";

const SITE = "https://go2-thailand.com";

function absoluteImage(src: string) {
  return src.startsWith("http") ? src : `${SITE}${src}`;
}

function nonEmpty(values: string[] | undefined) {
  return (values || []).map((value) => value.trim()).filter(Boolean);
}

export function CityTravelGuideEn({
  data,
  affiliates,
  heroImage,
}: {
  data: TravelGuidePage;
  affiliates: CityAffiliates | null;
  heroImage: string;
}) {
  const subId = useSubId();
  const canonical = `${SITE}/guides/travel-guide/${data.citySlug}/`;
  const itinerary = data.itinerary?.days || [];
  const localTransport = nonEmpty(data.transport?.localTransport);
  const dishes = nonEmpty(data.food?.mustTry);
  const foodAreas = nonEmpty(data.food?.foodAreas);
  const foodTips = nonEmpty(data.food?.tips);
  const etiquette = nonEmpty(data.etiquette);
  const sourceList = (data.sources || []).filter((source) => /^https?:\/\//.test(source.sourceUrl || ""));
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${data.cityName} travel guide`,
      description: data.seo.metaDescription,
      url: canonical,
      mainEntityOfPage: canonical,
      image: absoluteImage(heroImage),
      inLanguage: "en-GB",
      dateModified: data.lastUpdated,
      author: { "@type": "Organization", name: "Go2Thailand.com", url: `${SITE}/` },
      publisher: { "@type": "Organization", name: "Go2Thailand.com", url: `${SITE}/` },
      about: { "@type": "Place", name: data.cityName, containedInPlace: { "@type": "Country", name: "Thailand" } },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Thailand", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Travel guides", item: `${SITE}/travel-guides/` },
        { "@type": "ListItem", position: 3, name: `${data.cityName} travel guide`, item: canonical },
      ],
    },
  ];
  const owner = (path: string) => normalizeEnInternalHref(path);

  return (
    <>
      <SEOHead title={data.seo.title} description={data.seo.metaDescription} ogImage={absoluteImage(heroImage)}>
        <meta property="og:type" content="article" />
        {schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      </SEOHead>

      <div className="overflow-hidden bg-canvas text-charcoal" data-premium-template="city-travel-guide-en">
        <EditorialHero
          image={heroImage}
          imageAlt={`${data.cityName}, Thailand, as context for a multi-day travel plan`}
          breadcrumbs={[{ label: "Thailand", href: "/" }, { label: "Travel guides", href: "/travel-guides/" }, { label: data.cityName }]}
          eyebrow="Sequence the trip before booking it"
          title={<>{data.cityName}<br />travel guide</>}
          subtitle={`${itinerary.length || "Flexible"}-day editorial route`}
          description={data.intro}
          actions={[{ label: "Build the route", href: "#route", kind: "primary" }, { label: "Check practical details", href: "#practical", kind: "secondary" }]}
          minHeightClassName="min-h-[820px] lg:min-h-[720px]"
          titleClassName="max-w-[760px] text-[4.1rem] leading-[.84] sm:text-[5.3rem] lg:text-[6.35rem]"
          contentClassName="max-w-[760px]"
          contentTone="light"
          gradientClassName="bg-[linear-gradient(180deg,rgba(5,39,32,.04)_0%,rgba(5,39,32,.76)_55%,rgba(5,39,32,.98)_100%)] lg:bg-[linear-gradient(90deg,rgba(5,39,32,.98)_0%,rgba(5,39,32,.91)_40%,rgba(5,39,32,.22)_72%,rgba(5,39,32,.04)_100%)]"
          sideCard={<aside className="absolute bottom-8 right-[max(2rem,calc((100vw-1240px)/2))] z-20 hidden w-[322px] rounded-2xl border border-white/15 bg-jade/84 p-6 text-white shadow-editorial-lift backdrop-blur-xl xl:block"><p className="eyebrow !text-saffron-light">Plan boundary</p><div className="mt-5 grid gap-4 text-xs"><div className="flex justify-between gap-4"><span className="text-white/48">Route shape</span><strong>{itinerary.length ? `${itinerary.length} editorial days` : "Flexible"}</strong></div><div className="flex justify-between gap-4"><span className="text-white/48">Verify live</span><strong className="text-right">Hours · fares · weather</strong></div><div className="flex justify-between gap-4"><span className="text-white/48">Best next owner</span><strong className="text-right">City overview</strong></div></div></aside>}
        />

        <PageSectionNav label="Plan this guide" items={[
          { href: "#route", label: "Route", icon: Route },
          { href: "#practical", label: "Transport", icon: TrainFront },
          { href: "#food", label: "Food", icon: Utensils },
          { href: "#budget", label: "Budget", icon: CircleDollarSign },
          { href: "#book", label: "Live options", icon: CalendarDays },
        ]} />

        <section className="section-divider-bottom py-14 lg:py-20">
          <div className="container-custom grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-start">
            <SectionHeading eyebrow="Start with a decision" title={`What job should ${data.cityName} do in your trip?`} description="Treat the itinerary as a sequence, not a checklist. Keep arrival and departure friction visible, cluster places by area and leave one decision flexible for weather or energy." />
            <div className="grid gap-px overflow-hidden rounded-[26px] border border-jade/10 bg-jade/10 sm:grid-cols-3">
              {[
                { icon: Map, title: "One anchor", text: "Choose the city story that matters most before adding day trips." },
                { icon: Route, title: "One area at a time", text: "Reduce backtracking by grouping nearby stops and meals." },
                { icon: ShieldCheck, title: "One live check", text: "Recheck access, weather, operator details and total cost shortly before travel." },
              ].map(({ icon: Icon, title, text }, index) => <article key={title} className={`${index === 1 ? "bg-mist" : "bg-white"} p-7`}><Icon className="text-jade" /><h2 className="mt-5 font-display text-[1.8rem] font-semibold leading-none text-jade">{title}</h2><p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">{text}</p></article>)}
            </div>
          </div>
        </section>

        <section id="route" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
          <div className="container-custom">
            <SectionHeading eyebrow="Day by day" title={data.itinerary?.title || `${data.cityName} route`} description="Activities are editorial sequencing ideas. They do not promise admission, availability, opening hours or transport connections." />
            {itinerary.length ? <div className="relative mt-10 grid gap-5 lg:grid-cols-3"><div className="absolute left-[10%] right-[10%] top-8 hidden border-t-2 border-dashed border-saffron/55 lg:block" />{itinerary.map((day, index) => <article key={`${day.day}-${day.title}`} className="relative rounded-[24px] border border-jade/10 bg-white p-7 shadow-editorial-card"><span className="relative z-10 grid h-14 w-14 place-items-center rounded-full border-4 border-tonal bg-saffron text-sm font-black text-white">{day.day || index + 1}</span><p className="eyebrow mt-6">Day {day.day || index + 1}</p><h3 className="font-display text-[2rem] font-semibold leading-none text-jade">{day.title}</h3><ul className="mt-5 grid gap-3">{nonEmpty(day.activities).map((activity) => <li key={activity} className="flex gap-3 text-xs font-medium leading-6 text-charcoal/68"><Check size={14} className="mt-1 shrink-0 text-saffron-dark" />{activity}</li>)}</ul></article>)}</div> : <p className="mt-8 rounded-2xl border border-jade/10 bg-white p-6 text-sm text-charcoal/68">Build this route from the city overview and current local conditions; the dataset does not contain a dependable day sequence.</p>}
          </div>
        </section>

        <section id="practical" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
            <div><SectionHeading eyebrow="Arrive, then move locally" title="Transport is a chain of checks." description="Schedules, terminals, fares, road conditions and luggage rules change. Use this guide to identify the legs, then verify every connection with the actual operator." /><Link href={owner("/transport/")} className="btn-jade btn-jade-pattern mt-7">Open Thailand transport <ArrowRight size={14} className="text-saffron" /></Link></div>
            <div className="grid gap-5 sm:grid-cols-2"><article className="rounded-2xl bg-jade p-7 text-white shadow-editorial-card"><TrainFront className="text-saffron-light" /><h3 className="mt-5 font-display text-[2rem] font-semibold">From Bangkok</h3><p className="mt-4 text-sm font-medium leading-7 text-white/70">{data.transport?.fromBangkok || "Compare the current rail, bus, flight or road options for your dates and starting airport or station."}</p></article><article className="rounded-2xl border border-jade/10 bg-white p-7 shadow-editorial-card"><MapPin className="text-jade" /><h3 className="mt-5 font-display text-[2rem] font-semibold text-jade">Around {data.cityName}</h3>{localTransport.length ? <ul className="mt-4 grid gap-3">{localTransport.map((item) => <li key={item} className="flex gap-3 text-xs font-medium leading-6 text-charcoal/66"><Check size={14} className="mt-1 shrink-0 text-saffron-dark" />{item}</li>)}</ul> : <p className="mt-4 text-sm font-medium leading-7 text-charcoal/66">The source record does not support a dependable local-mode list. Confirm the realistic last mile at your accommodation or arrival point.</p>}</article></div>
          </div>
        </section>

        <section id="food" className="section-divider-bottom scroll-mt-24 bg-mist py-14 lg:py-20">
          <div className="container-custom">
            <SectionHeading eyebrow="Taste by place" title={`Food decisions in ${data.cityName}`} description="Dish names and food areas are starting points. Recipe, allergens, opening times and stall availability remain a direct vendor check." />
            <div className="mt-9 grid gap-5 lg:grid-cols-3"><article className="rounded-2xl border border-jade/10 bg-white p-7 shadow-editorial-card"><Utensils className="text-jade" /><h3 className="mt-5 font-display text-[1.9rem] font-semibold text-jade">Dish signals</h3>{dishes.length ? <ul className="mt-4 grid gap-2 text-xs font-medium leading-6 text-charcoal/66">{dishes.map((item) => <li key={item}>— {item}</li>)}</ul> : <p className="mt-4 text-sm leading-7 text-charcoal/65">Use the city food owner for current, independently researched local dish context.</p>}</article><article className="rounded-2xl bg-jade p-7 text-white shadow-editorial-card"><MapPin className="text-saffron-light" /><h3 className="mt-5 font-display text-[1.9rem] font-semibold">Area signals</h3>{foodAreas.length ? <ul className="mt-4 grid gap-2 text-xs font-medium leading-6 text-white/70">{foodAreas.map((item) => <li key={item}>— {item}</li>)}</ul> : <p className="mt-4 text-sm leading-7 text-white/68">Availability shifts; use the dedicated city food guide before choosing a meal stop.</p>}</article><article className="rounded-2xl border border-jade/10 bg-white p-7 shadow-editorial-card"><ShieldCheck className="text-jade" /><h3 className="mt-5 font-display text-[1.9rem] font-semibold text-jade">Ordering checks</h3>{foodTips.length ? <ul className="mt-4 grid gap-2 text-xs font-medium leading-6 text-charcoal/66">{foodTips.map((item) => <li key={item}>— {item}</li>)}</ul> : <p className="mt-4 text-sm leading-7 text-charcoal/65">Ask about ingredients, cross-contact and spice directly; a translated allergy card is safer than relying on a dish label.</p>}</article></div>
            <Link href={owner(`/city/${data.citySlug}/food/`)} className="mt-7 inline-flex items-center gap-2 text-xs font-extrabold text-jade">Open the {data.cityName} food guide <ArrowRight size={14} className="text-saffron-dark" /></Link>
          </div>
        </section>

        <section id="budget" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
            <SectionHeading eyebrow="Budget by variables" title="Build a live total, not a frozen daily price." description="Old daily bands age quickly. Price accommodation, long-distance legs and bookable activities for your dates, then add food, local transport and a contingency." />
            <div className="grid gap-px overflow-hidden rounded-2xl border border-jade/10 bg-jade/10 sm:grid-cols-3">{[
              [BedDouble, "Sleep", "Compare the final nightly total, taxes, location and cancellation terms."],
              [TrainFront, "Move", "Price every long leg plus transfers, bags and the last mile."],
              [Sparkles, "Experience", "Check current admission, inclusions and weather-dependent alternatives."],
            ].map(([Icon, title, copy]) => { const ItemIcon = Icon as typeof BedDouble; return <article key={String(title)} className="bg-white p-7"><ItemIcon className="text-jade" /><h3 className="mt-5 font-display text-[1.8rem] font-semibold text-jade">{String(title)}</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/65">{String(copy)}</p></article>; })}</div>
          </div>
        </section>

        {etiquette.length ? <section className="section-divider-bottom bg-tonal py-14 lg:py-20"><div className="container-custom grid gap-8 lg:grid-cols-[.7fr_1.3fr]"><SectionHeading eyebrow="Travel with context" title="Local etiquette without stereotypes." description="Use these as respectful prompts, then follow signs and local instructions in the place itself." /><ol className="grid gap-3 sm:grid-cols-2">{etiquette.map((item, index) => <li key={item} className="flex gap-4 rounded-xl border border-jade/10 bg-white p-5 text-xs font-medium leading-6 text-charcoal/68"><span className="font-black text-saffron-dark">{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol></div></section> : null}

        <section id="book" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom"><div className="overflow-hidden rounded-[28px] bg-jade p-8 text-white shadow-editorial-lift sm:p-10"><div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr]"><div><p className="eyebrow !text-saffron-light">Only after the route makes sense</p><h2 className="font-display text-[3rem] font-semibold leading-[.9]">Check the actual option, provider and total.</h2><p className="mt-5 text-sm font-medium leading-7 text-white/68">Partner links are booking tools, not evidence that a particular product is available or best. Compare live price, operator, meeting point, inclusions and cancellation terms.</p></div>{affiliates ? <div className="grid gap-3 sm:grid-cols-3"><a href={withSubId(affiliates.klook, `${subId}-city-travel-guide-en`)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-2xl border border-white/14 bg-white/[.07] p-6 transition hover:border-saffron/45"><Sparkles className="text-saffron-light" /><strong className="mt-5 block text-sm">Activities</strong><span className="mt-4 inline-flex items-center gap-2 text-[10px] font-extrabold text-saffron-light">Check Klook <ExternalLink size={12} /></span></a><a href={withSubId(affiliates.trip || "https://trip.tpo.lv/TmObooZ5", `${subId}-city-travel-guide-en`)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-2xl border border-white/14 bg-white/[.07] p-6 transition hover:border-saffron/45"><BedDouble className="text-saffron-light" /><strong className="mt-5 block text-sm">Places to stay</strong><span className="mt-4 inline-flex items-center gap-2 text-[10px] font-extrabold text-saffron-light">Check Trip.com <ExternalLink size={12} /></span></a><a href={withSubId(affiliates.twelveGo, `${subId}-city-travel-guide-en`)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-2xl border border-white/14 bg-white/[.07] p-6 transition hover:border-saffron/45"><TrainFront className="text-saffron-light" /><strong className="mt-5 block text-sm">Transport</strong><span className="mt-4 inline-flex items-center gap-2 text-[10px] font-extrabold text-saffron-light">Check 12Go <ExternalLink size={12} /></span></a></div> : <p className="rounded-2xl border border-white/14 bg-white/[.06] p-6 text-sm leading-7 text-white/68">No destination-specific partner set is registered. Use the editorial route and verify directly with the operator or venue.</p>}</div><AffiliateDisclosure className="mt-6 !text-white/58">Sponsored partner links may earn us a commission at no extra cost to you. Editorial sequence is independent. Availability, provider, total price and terms must be checked on the partner page.</AffiliateDisclosure></div></div>
        </section>

        <RelatedGuidesSection eyebrow="Keep planning" title={`Build the rest of your ${data.cityName} trip`} guides={[
          { title: `${data.cityName} overview`, description: "Choose the destination role, highlights and practical starting point.", href: owner(`/city/${data.citySlug}/`), image: heroImage },
          { title: `${data.cityName} attractions`, description: "Compare attraction types and group nearby stops before booking.", href: owner(`/city/${data.citySlug}/attractions/`), image: heroImage },
          { title: `Where to stay in ${data.cityName}`, description: "Choose an area by route fit before comparing live hotel totals.", href: owner(`/where-to-stay/${data.citySlug}/`), image: heroImage },
        ]} readLabel="Open guide" />

        {sourceList.length ? <SourceMethodSection eyebrow="Sources & method" title="A route framework, not a live booking feed." description="Sources establish destination context and owner boundaries. Dates beside them record the dataset check, not a promise that every schedule, fare, venue or rule remains unchanged. Recheck volatile details with the responsible operator or authority." sources={sourceList.map((source) => ({ title: source.sourceName, creator: source.sourceName, url: source.sourceUrl, note: `Recorded verification date: ${source.lastVerified || data.lastUpdated}. Use the source itself for current details.` }))} /> : <section className="section-divider-bottom bg-tonal py-12"><div className="container-custom"><p className="eyebrow">Evidence boundary</p><h2 className="font-display text-[2.7rem] font-semibold text-jade">No source trail, no current-fact promise.</h2><p className="mt-5 max-w-3xl text-sm leading-7 text-charcoal/66">This owner remains an editorial sequencing framework. Verify every factual or bookable detail through the destination, venue or operator before relying on it.</p></div></section>}
        <footer className="py-8"><div className="container-custom flex flex-wrap items-center justify-between gap-4 text-[10px] font-medium text-charcoal/48"><span>Editorial owner reviewed 1 August 2026</span><span className="inline-flex items-center gap-2"><Check size={13} className="text-jade" /> Live details remain a provider-level check</span></div></footer>
      </div>
    </>
  );
}
