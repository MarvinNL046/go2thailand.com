import Link from 'next/link';
import { ArrowRight, CalendarDays, CloudRain, ExternalLink, Luggage, MapPinned, Sun, Waves } from 'lucide-react';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav, type PageSectionNavItem } from '../design/PageSectionNav';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';
import { KLOOK_GENERIC, TRIP_GENERIC, withPlacementSubId } from '../../lib/affiliates';

export interface MonthGuideEn {
  month: string;
  slug: string;
  title: string;
  meta_description: string;
  weather: {
    overview: string;
    temperature: { north: string; central: string; south: string };
    rainfall: string;
    humidity: string;
  };
  highlights: string[];
  festivals: Array<{ name: string; description: string }>;
  best_destinations: Array<{ name: string; reason: string }>;
  travel_tips: string[];
  pros: string[];
  cons: string[];
}

interface Props {
  guide: MonthGuideEn;
  previousMonth: string | null;
  nextMonth: string | null;
}

const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
const labels = monthNames.map((month) => month[0].toUpperCase() + month.slice(1));

const coastNotes: Record<string, string> = {
  january: 'The Andaman coast is usually in its drier window. The Gulf often improves through the month, but Samui can still be changeable after its late-year rain peak.',
  february: 'Both coasts can work well. Compare local marine forecasts because calm-season averages never guarantee a specific boat day.',
  march: 'The Andaman is often still settled while the Gulf is also a practical beach choice. Heat becomes a bigger route-planning factor.',
  april: 'Both coasts remain possible, but heat, Songkran demand and local sea conditions matter more than a national weather label.',
  may: 'The southwest monsoon transition makes the Andaman less predictable. Gulf islands can be a useful alternative, not a weather guarantee.',
  june: 'Expect rougher, wetter periods on the Andaman. The lower Gulf often offers a different pattern, though local squalls still occur.',
  july: 'The Andaman remains exposed to southwest-monsoon conditions. Compare Gulf islands and keep boat plans flexible.',
  august: 'The west coast can be rough and wet. The Gulf may be the more practical island option, subject to the live marine forecast.',
  september: 'This is a high-rain-risk period on much of the Andaman side. Do not build a tight island-hopping plan around climate averages.',
  october: 'The Andaman may begin transitioning, while rain risk rises around the lower Gulf. Exact timing varies from year to year.',
  november: 'Andaman conditions often improve, while the lower Gulf can be in its wettest period. Choose the coast before booking boats.',
  december: 'The Andaman is commonly the easier beach choice. The Gulf, especially Samui, can remain wet or rough despite dry weather elsewhere.',
};

const navItems: PageSectionNavItem[] = [
  { href: '#decision', label: 'Quick verdict', icon: Sun },
  { href: '#regions', label: 'By region', icon: MapPinned },
  { href: '#planning', label: 'Plan the month', icon: CalendarDays },
  { href: '#questions', label: 'Questions', icon: CloudRain },
];

function clean(value: string) {
  return value.replace(/Â°C/g, '°C').replace(/â€”/g, '—').replace(/â€™/g, '’');
}

export default function ThailandMonthGuideEn({ guide, previousMonth, nextMonth }: Props) {
  const canonical = `https://go2-thailand.com/thailand-in/${guide.slug}/`;
  const description = `Plan Thailand in ${guide.month} by region and coast. Compare typical weather, practical trade-offs and what to verify before you book.`;
  const faqs = [
    { question: `Is ${guide.month} a good month for Thailand?`, answer: `It can be, but the answer depends on your route. Northern Thailand, Bangkok, the Andaman coast and the lower Gulf do not share one weather pattern. Use this page as climate context and check the live forecast before travel.` },
    { question: `Which coast should I choose in ${guide.month}?`, answer: coastNotes[guide.slug] || 'Compare the Andaman and Gulf forecasts separately before fixing ferries or boat trips.' },
    { question: `What should I pack for Thailand in ${guide.month}?`, answer: 'Pack light, breathable clothing, sun protection and footwear suited to your activities. Add reliable rain protection and a dry bag when showers or boat travel are likely; use layers for cooler northern mornings.' },
    { question: `Should I book early for ${guide.month}?`, answer: 'Book scarce stays and important connections earlier around public holidays and peak travel windows. Always compare the current total price, cancellation terms, exact location and final transfer rather than relying on a cached “from” price.' },
  ];
  const schemas = [
    { '@context': 'https://schema.org', '@type': 'Article', headline: `Thailand in ${guide.month}: weather and travel planning`, description, url: canonical, image: 'https://go2-thailand.com/images/redesign/thailand-weather-hub-hero.webp', inLanguage: 'en', dateModified: '2026-08-01', author: { '@type': 'Organization', name: 'Go2Thailand' }, publisher: { '@type': 'Organization', name: 'Go2Thailand' } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://go2-thailand.com/' },
      { '@type': 'ListItem', position: 2, name: 'Thailand weather', item: 'https://go2-thailand.com/weather/' },
      { '@type': 'ListItem', position: 3, name: `Thailand in ${guide.month}`, item: canonical },
    ] },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(({ question, answer }) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) },
  ];
  const hotelHref = withPlacementSubId(TRIP_GENERIC, `en-thailand-${guide.slug}`, 'month-hotels');
  const activityHref = withPlacementSubId(KLOOK_GENERIC, `en-thailand-${guide.slug}`, 'month-activities');

  return (
    <div className="bg-canvas" data-premium-template="thailand-month-guide-en" data-month-owner={guide.slug}>
      <SEOHead title={`Thailand in ${guide.month}: Weather & Where to Go`} description={description} ogImage="https://go2-thailand.com/images/redesign/thailand-weather-hub-hero.webp">
        {schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      </SEOHead>
      <EditorialHero
        image="/images/redesign/thailand-weather-hub-hero.webp"
        imageAlt={`Thailand landscape and changing weather in ${guide.month}`}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Weather', href: '/weather/' }, { label: `Thailand in ${guide.month}` }]}
        eyebrow="Choose by region, not one national average"
        title={<>Thailand in<br />{guide.month}</>}
        subtitle={clean(guide.weather.overview)}
        description={description}
        actions={[{ label: 'See the quick verdict', href: '#decision', kind: 'primary' }, { label: 'Compare all months', href: '/weather/', kind: 'secondary' }]}
        minHeightClassName="min-h-[720px] lg:min-h-[650px]"
        titleClassName="max-w-[720px] text-[4rem] leading-[.84] sm:text-[5.3rem] lg:text-[5.9rem]"
        imageClassName="object-cover object-[68%_center] lg:object-center"
        gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,.70)_0%,rgba(252,250,246,.9)_58%,rgba(252,250,246,.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,.98)_0%,rgba(252,250,246,.9)_40%,rgba(252,250,246,.2)_72%)]"
      />
      <PageSectionNav label={`On this page: Thailand in ${guide.month}`} items={navItems} />

      <nav aria-label="Other month guides" className="section-divider-bottom bg-canvas">
        <div className="container-custom scrollbar-hide flex snap-x gap-2 overflow-x-auto py-5">
          {monthNames.map((slug, index) => <Link key={slug} href={`/thailand-in/${slug}/`} aria-current={slug === guide.slug ? 'page' : undefined} className={`min-h-10 shrink-0 rounded-full border px-4 py-2 text-[10px] font-extrabold uppercase tracking-[.09em] ${slug === guide.slug ? 'border-jade bg-jade text-white' : 'border-jade/10 bg-white text-charcoal/65 hover:border-saffron/40'}`}>{labels[index]}</Link>)}
        </div>
      </nav>

      <section id="decision" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
        <div className="container-custom grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-center">
          <SectionHeading eyebrow="The useful short answer" title={<>Does {guide.month}<br />fit your trip?</>} description="Monthly climate is context, not a promise. Region, coast, elevation and short-term conditions can change the practical answer." />
          <div className="rounded-[28px] bg-jade p-7 text-white shadow-editorial-card lg:p-10">
            <p className="text-[9px] font-extrabold uppercase tracking-[.16em] text-saffron-light">Planning verdict</p>
            <p className="mt-4 font-display text-[2.35rem] font-semibold leading-[1] sm:text-[3rem]">{clean(guide.weather.overview)}</p>
            <p className="mt-6 text-sm font-medium leading-7 text-white/72">{coastNotes[guide.slug]}</p>
          </div>
        </div>
      </section>

      <section id="regions" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
        <div className="container-custom">
          <SectionHeading eyebrow="Three different travel decisions" title={<>Typical conditions<br />by region</>} description="These broad bands summarize the existing monthly guide. Check TMD forecasts and warnings for your actual dates." />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {[
              ['Northern Thailand', clean(guide.weather.temperature.north), 'Mountain mornings can differ sharply from daytime city temperatures.', CloudRain],
              ['Bangkok & central', clean(guide.weather.temperature.central), `${clean(guide.weather.rainfall)}; ${clean(guide.weather.humidity).toLowerCase()} humidity.`, Sun],
              ['Southern coasts', clean(guide.weather.temperature.south), coastNotes[guide.slug], Waves],
            ].map(([title, value, copy, Icon], index) => (
              <article key={String(title)} className={`flex min-h-[300px] flex-col rounded-2xl border p-7 shadow-editorial-card ${index === 1 ? 'border-jade bg-jade text-white' : 'border-jade/10 bg-white text-jade'}`}>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <Icon size={25} className={index === 1 ? 'text-saffron-light' : 'text-saffron-dark'} aria-hidden="true" />
                <h3 className="mt-7 font-display text-[2rem] font-semibold leading-none">{String(title)}</h3>
                <p className={`mt-4 text-lg font-extrabold ${index === 1 ? 'text-saffron-light' : 'text-jade'}`}>{String(value)}</p>
                <p className={`mt-4 text-xs font-medium leading-6 ${index === 1 ? 'text-white/70' : 'text-charcoal/65'}`}>{String(copy)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="planning" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
        <div className="container-custom grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
          <SectionHeading eyebrow="Turn the month into a route" title={<>Where this month<br />may work</>} description="The cards preserve distinct month intent without pretending that a seasonal average guarantees conditions." />
          <div className="grid gap-4 md:grid-cols-3">
            {guide.best_destinations.slice(0, 3).map((destination, index) => <article key={destination.name} className="flex min-h-[270px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="text-[9px] font-extrabold uppercase tracking-[.14em] text-saffron-dark">Option 0{index + 1}</span><h3 className="mt-7 font-display text-[1.8rem] font-semibold leading-none text-jade">{destination.name}</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/65">{clean(destination.reason)}</p><p className="mt-auto border-t border-jade/10 pt-5 text-[10px] font-extrabold text-jade">Verify local forecast and access</p></article>)}
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-jade py-14 text-white lg:py-20">
        <div className="container-custom grid gap-8 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <p className="eyebrow !text-saffron-light">Book after choosing the route</p>
            <h2 className="font-display text-[3.25rem] font-semibold leading-[.9]">Check live options<br />and full terms</h2>
            <p className="mt-5 max-w-xl text-sm font-medium leading-7 text-white/70">Prices, availability, inclusions and weather policies change. We deliberately do not publish stale ‘from’ prices.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <a href={hotelHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-2xl border border-white/12 bg-white p-7 text-jade"><MapPinned size={24} /><h3 className="mt-6 font-display text-[1.8rem] font-semibold">Compare stays</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/65">Check exact location, dates, total price and cancellation terms on Trip.com.</p><span className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-saffron-dark">Check current stays <ExternalLink size={14} /></span></a>
            <a href={activityHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-2xl border border-white/12 bg-white/[.06] p-7"><CalendarDays size={24} className="text-saffron-light" /><h3 className="mt-6 font-display text-[1.8rem] font-semibold">Compare activities</h3><p className="mt-4 text-xs font-medium leading-6 text-white/70">Check operator, pickup area, inclusions, physical demands and weather policy on Klook.</p><span className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-saffron-light">Check current options <ExternalLink size={14} /></span></a>
            <AffiliateDisclosure className="sm:col-span-2">Trip.com and Klook are affiliate partners. We may earn a commission at no extra cost to you. Commission does not determine our regional advice.</AffiliateDisclosure>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom py-14 lg:py-20">
        <div className="container-custom grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
          <SectionHeading eyebrow="Pack for the route" title={<>Useful basics for<br />{guide.month}</>} description="Choose equipment for your actual itinerary, not an affiliate checklist." />
          <div className="grid gap-3 sm:grid-cols-2">{guide.travel_tips.slice(0, 4).map((tip) => <div key={tip} className="flex min-h-20 items-center gap-4 rounded-xl border border-jade/10 bg-white p-5 shadow-editorial-card"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-tonal text-jade"><Luggage size={16} aria-hidden="true" /></span><span className="text-sm font-extrabold text-jade">{clean(tip)}</span></div>)}</div>
        </div>
      </section>

      <FaqSplitSection id="questions" eyebrow="Practical answers" title={`Questions about Thailand in ${guide.month}`} description="Editorial planning questions, not claimed Google People Also Ask data. Recheck current conditions with the official source." items={faqs} />
      <SourceMethodSection eyebrow="Sources & method" title="Climate context, not a forecast" description="We separate long-term seasonal context from live travel decisions. Month pages are reviewed against official climate guidance; dates, warnings, park access and marine conditions must still be checked shortly before travel." method="The temperature bands come from the existing editorial dataset and are shown as indicative ranges. We removed absolute ‘perfect weather’, ‘cheapest’ and nationwide guarantees from the rendered owner." sources={[
        { title: 'Monthly weather summaries', creator: 'Thai Meteorological Department', url: 'https://www.tmd.go.th/en/climate/summarymonthly', note: 'Official climate summaries; use TMD’s forecast and warning pages for live regional conditions.' },
        { title: 'Thailand climate and weather', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Plan-Your-Trip/Weather', note: 'Official visitor-facing overview of Thailand’s monsoon-influenced seasons.' },
      ]} />
      <div className="container-custom flex items-center justify-between gap-4 py-8 text-xs font-extrabold text-jade">
        {previousMonth ? <Link href={`/thailand-in/${previousMonth}/`} className="inline-flex items-center gap-2"><ArrowRight size={14} className="rotate-180 text-saffron-dark" />Previous month</Link> : <span />}
        <Link href="/weather/">All months</Link>
        {nextMonth ? <Link href={`/thailand-in/${nextMonth}/`} className="inline-flex items-center gap-2">Next month<ArrowRight size={14} className="text-saffron-dark" /></Link> : <span />}
      </div>
    </div>
  );
}
