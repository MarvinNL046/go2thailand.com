import { useMemo, useState, type ReactNode } from 'react';
import Image from 'next/image';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight, ExternalLink, Route, Sparkles } from 'lucide-react';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav, type PageSectionNavItem } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';
import { StoryDottedRoute } from '../visuals/StoryDottedRoute';

interface PriorityOption {
  key: string;
  label: string;
  description: string;
  cityAScore: number;
  cityBScore: number;
  icon: LucideIcon;
}

interface StayPlan {
  nights: number;
  label: string;
  cityA: string;
  cityB: string;
  summary: string;
}

export interface CityComparisonGuideData {
  pageUrl: string;
  updatedAt: string;
  title: string;
  description: string;
  heroImage: string;
  heroAlt: string;
  heroEyebrow: string;
  heroTitle: ReactNode;
  heroSubtitle: string;
  heroDescription: string;
  cityA: string;
  cityB: string;
  cityAImage: string;
  cityAAlt: string;
  cityBImage: string;
  cityBAlt: string;
  cityAMood: string;
  cityBMood: string;
  navItems: PageSectionNavItem[];
  verdictTitle: ReactNode;
  verdictDescription: string;
  verdictCards: Array<{ label: string; winner: string; icon: LucideIcon }>;
  editorialRule: string;
  priorities: PriorityOption[];
  comparisonRows: Array<{ factor: string; cityA: string; cityB: string; cue: string }>;
  stayPlans: StayPlan[];
  dayTripTitle: string;
  dayTripDescription: string;
  dayTripChecks: string[];
  timingTitle: ReactNode;
  timingDescription: string;
  timingRows: Array<{ period: string; cityA: string; cityB: string; cue: string; highlight?: boolean }>;
  routeTitle: string;
  routeDescription: string;
  routeStops: Array<{ label: string; title: string; text: string }>;
  routeHref: string;
  routeCta: string;
  bookingCards: Array<{ title: string; copy: string; href: string; icon: LucideIcon }>;
  faqs: Array<{ question: string; answer: string }>;
  faqDescription: string;
  related: Array<{ title: string; description: string; href: string; image: string; imageAlt: string }>;
  sources: Array<{ title: string; creator: string; url: string; note: string }>;
  methodDescription: string;
}

function createSchemas(data: CityComparisonGuideData) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data.title,
      description: data.description,
      url: data.pageUrl,
      image: `https://go2-thailand.com${data.heroImage}`,
      inLanguage: 'en-GB',
      dateModified: data.updatedAt,
      author: { '@type': 'Organization', name: 'Go2Thailand' },
      publisher: { '@type': 'Organization', name: 'Go2Thailand' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `${data.cityA} vs ${data.cityB} comparison`,
      numberOfItems: data.comparisonRows.length,
      itemListElement: data.comparisonRows.map((row, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: row.factor,
        description: `${data.cityA}: ${row.cityA} ${data.cityB}: ${row.cityB} Planning cue: ${row.cue}.`,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: data.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://go2-thailand.com/' },
        { '@type': 'ListItem', position: 2, name: 'Travel comparisons', item: 'https://go2-thailand.com/blog/' },
        { '@type': 'ListItem', position: 3, name: `${data.cityA} vs ${data.cityB}`, item: data.pageUrl },
      ],
    },
  ];
}

export function CityComparisonGuideTemplate({ data }: { data: CityComparisonGuideData }) {
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [stayIndex, setStayIndex] = useState(Math.min(1, data.stayPlans.length - 1));
  const schemas = createSchemas(data);
  const stay = data.stayPlans[stayIndex];

  const recommendation = useMemo(() => {
    const selected = data.priorities.filter((option) => selectedPriorities.includes(option.key));
    const cityAScore = selected.reduce((total, option) => total + option.cityAScore, 0);
    const cityBScore = selected.reduce((total, option) => total + option.cityBScore, 0);
    if (!selected.length) return { winner: 'Choose what matters', copy: 'Select two or three priorities to turn the comparison into your own decision.' };
    if (cityAScore === cityBScore) return { winner: 'Combine both', copy: `Your priorities are balanced. Use the night split below rather than forcing one city to win.` };
    const winner = cityAScore > cityBScore ? data.cityA : data.cityB;
    return { winner, copy: `${winner} fits the priorities you selected more often. Treat this as a planning cue, then check the trade-offs below.` };
  }, [data.cityA, data.cityB, data.priorities, selectedPriorities]);

  function togglePriority(key: string) {
    setSelectedPriorities((current) => current.includes(key) ? current.filter((item) => item !== key) : [...current, key]);
  }

  return (
    <>
      <SEOHead title={data.title} description={data.description} ogImage={`https://go2-thailand.com${data.heroImage}`}>
        {schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      </SEOHead>

      <div className="overflow-hidden bg-canvas text-charcoal" data-premium-template="city-comparison">
        <EditorialHero
          image={data.heroImage}
          imageAlt={data.heroAlt}
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Travel comparisons', href: '/blog/' }, { label: `${data.cityA} vs ${data.cityB}` }]}
          eyebrow={data.heroEyebrow}
          title={data.heroTitle}
          subtitle={data.heroSubtitle}
          description={data.heroDescription}
          actions={[{ label: 'Get the short answer', href: '#verdict', kind: 'primary' }, { label: 'Build your split', href: '#days', kind: 'secondary' }]}
          minHeightClassName="min-h-[800px] lg:min-h-[730px]"
          titleClassName="max-w-[760px] text-[4rem] leading-[0.83] sm:text-[5.25rem] lg:text-[6.2rem]"
          contentClassName="max-w-[720px]"
          imageClassName="object-cover object-[58%_center]"
          gradientClassName="bg-[linear-gradient(180deg,rgba(7,41,35,0.16)_0%,rgba(7,41,35,0.78)_62%,rgba(7,41,35,0.98)_100%)] lg:bg-[linear-gradient(90deg,rgba(7,41,35,0.98)_0%,rgba(7,41,35,0.90)_39%,rgba(7,41,35,0.18)_68%,rgba(7,41,35,0.03)_100%)]"
          contentTone="light"
          sideCard={(
            <aside className="absolute bottom-8 right-[max(2rem,calc((100vw-1240px)/2))] z-20 hidden w-[310px] rounded-2xl border border-white/16 bg-jade/82 p-6 text-white shadow-editorial-lift backdrop-blur-xl xl:block">
              <p className="eyebrow !text-saffron-light">The honest default</p>
              <p className="mt-4 font-display text-[2rem] font-semibold leading-[0.95]">First trip: {data.cityA}.<br />Art-led add-on: {data.cityB}.</p>
              <p className="mt-4 text-xs font-medium leading-6 text-white/65">Do both when your northern route has enough nights to give each city a distinct job.</p>
            </aside>
          )}
        />
        <PageSectionNav items={data.navItems} />

        <section id="verdict" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom grid gap-11 lg:grid-cols-[0.7fr_1.3fr]">
            <SectionHeading eyebrow="The 60-second answer" title={data.verdictTitle} description={data.verdictDescription} />
            <div>
              <div className="grid gap-3 sm:grid-cols-2">
                {data.verdictCards.map(({ label, winner, icon: Icon }) => (
                  <article key={label} className="flex items-center gap-4 rounded-2xl border border-jade/10 bg-white p-5 shadow-editorial-card">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-tonal text-jade"><Icon size={20} /></span>
                    <div><p className="text-[9px] font-extrabold uppercase tracking-[.13em] text-charcoal/45">{label}</p><p className="mt-1 font-display text-[1.45rem] font-semibold text-jade">{winner}</p></div>
                  </article>
                ))}
              </div>
              <aside className="relative mt-6 overflow-hidden rounded-2xl bg-jade p-7 text-white shadow-editorial-lift sm:p-9">
                <StoryDottedRoute className="absolute -bottom-8 right-3 h-44 w-52 opacity-50" />
                <Route className="relative text-saffron" />
                <h2 className="relative mt-5 font-display text-[2.2rem] font-semibold leading-none">Our editorial rule</h2>
                <p className="relative mt-4 max-w-3xl text-sm leading-7 text-white/74">{data.editorialRule}</p>
              </aside>
            </div>
          </div>
        </section>

        <section id="priorities" className="section-divider-bottom scroll-mt-24 bg-mist py-14 lg:py-20">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <SectionHeading eyebrow="Make it your comparison" title="Pick what the trip must do" description="Generic winners disappear when your actual priorities enter the room. Select a few; the recommendation updates without pretending to be a booking engine." />
              <div className="mt-7 rounded-2xl bg-jade p-6 text-white shadow-editorial-lift">
                <p className="eyebrow !text-saffron-light">Current cue</p>
                <p aria-live="polite" className="mt-3 font-display text-[2.25rem] font-semibold leading-none">{recommendation.winner}</p>
                <p className="mt-4 text-xs font-medium leading-6 text-white/68">{recommendation.copy}</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {data.priorities.map(({ key, label, description, icon: Icon }) => {
                const active = selectedPriorities.includes(key);
                return (
                  <button key={key} type="button" aria-pressed={active} onClick={() => togglePriority(key)} className={`min-h-[142px] rounded-2xl border p-5 text-left transition ${active ? 'border-saffron bg-[#fff4e4] shadow-editorial-card' : 'border-jade/10 bg-white hover:-translate-y-0.5 hover:border-jade/25'}`}>
                    <span className={`grid h-10 w-10 place-items-center rounded-xl ${active ? 'bg-saffron text-white' : 'bg-tonal text-jade'}`}><Icon size={19} /></span>
                    <span className="mt-4 block font-display text-[1.45rem] font-semibold leading-none text-jade">{label}</span>
                    <span className="mt-3 block text-[11px] font-medium leading-5 text-charcoal/58">{description}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section id="compare" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom">
            <SectionHeading eyebrow="Side by side" title="What changes on the ground" description="Every advantage has a trade-off. The useful question is which friction you are happier to operate." />
            <div className="mt-9 overflow-x-auto rounded-2xl border border-jade/10 bg-white shadow-editorial-card">
              <table className="w-full min-w-[960px] border-collapse text-left">
                <thead><tr className="bg-jade text-white"><th className="px-6 py-5 text-[10px] uppercase tracking-[.14em]">Factor</th><th className="px-6 py-5 font-display text-2xl">{data.cityA}</th><th className="px-6 py-5 font-display text-2xl">{data.cityB}</th><th className="px-6 py-5 text-[10px] uppercase tracking-[.14em] text-saffron">Planning cue</th></tr></thead>
                <tbody className="divide-y divide-jade/10">{data.comparisonRows.map((row, index) => <tr key={row.factor} className={index % 2 ? 'bg-canvas/55' : 'bg-white'}><th className="px-6 py-6 text-sm text-jade">{row.factor}</th><td className="px-6 py-6 text-xs leading-6 text-charcoal/65">{row.cityA}</td><td className="px-6 py-6 text-xs leading-6 text-charcoal/65">{row.cityB}</td><td className="px-6 py-6"><span className="rounded-full bg-tonal px-3 py-2 text-[10px] font-extrabold text-jade">{row.cue}</span></td></tr>)}</tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom bg-tonal py-14 lg:py-20">
          <div className="container-custom">
            <SectionHeading eyebrow="Two northern rhythms" title="The difference is felt between sights" description="One city rewards daily neighbourhood choice. The other gives each art-and-landscape day more breathing room." />
            <div className="mt-9 grid gap-5 lg:grid-cols-2">
              {[
                { city: data.cityA, image: data.cityAImage, alt: data.cityAAlt, mood: data.cityAMood, number: '01' },
                { city: data.cityB, image: data.cityBImage, alt: data.cityBAlt, mood: data.cityBMood, number: '02' },
              ].map((item) => (
                <article key={item.city} className="group relative min-h-[470px] overflow-hidden rounded-[28px] shadow-editorial-lift">
                  <Image src={item.image} alt={item.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-[1.025]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-jade via-jade/24 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9"><span className="text-[9px] font-extrabold uppercase tracking-[.15em] text-saffron-light">{item.number} / city mood</span><h2 className="mt-3 font-display text-[3.2rem] font-semibold leading-none">{item.city}</h2><p className="mt-4 max-w-xl text-sm font-medium leading-7 text-white/72">{item.mood}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="days" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.66fr_1.34fr]">
            <SectionHeading eyebrow="Allocate nights, not labels" title="How should you split the north?" description="Choose the total nights you can genuinely protect. A transfer also consumes attention, packing and hotel-change energy." />
            <div>
              <div className="flex flex-wrap gap-3" role="group" aria-label="Choose total nights in northern Thailand">
                {data.stayPlans.map((plan, index) => <button key={plan.nights} type="button" aria-pressed={stayIndex === index} onClick={() => setStayIndex(index)} className={`min-h-11 rounded-xl border px-5 text-xs font-extrabold transition ${stayIndex === index ? 'border-jade bg-jade text-white' : 'border-jade/15 bg-white text-jade hover:border-saffron'}`}>{plan.label}</button>)}
              </div>
              <div className="mt-5 overflow-hidden rounded-[26px] border border-jade/10 bg-white shadow-editorial-lift">
                <div className="grid sm:grid-cols-2"><div className="bg-jade p-7 text-white sm:p-9"><p className="eyebrow !text-saffron-light">{data.cityA}</p><p className="mt-4 font-display text-[3.4rem] font-semibold leading-none">{stay.cityA}</p></div><div className="bg-[#fff4e4] p-7 text-jade sm:p-9"><p className="eyebrow">{data.cityB}</p><p className="mt-4 font-display text-[3.4rem] font-semibold leading-none">{stay.cityB}</p></div></div>
                <p aria-live="polite" className="p-7 text-sm font-medium leading-7 text-charcoal/66 sm:p-9">{stay.summary}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom bg-mist py-14 lg:py-20">
          <div className="container-custom grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
            <article className="relative overflow-hidden rounded-[28px] bg-jade p-7 text-white shadow-editorial-lift sm:p-10">
              <StoryDottedRoute className="absolute -bottom-2 right-1 h-56 w-64 opacity-55" />
              <div className="relative max-w-2xl"><p className="eyebrow !text-saffron-light">The day-trip question</p><h2 className="mt-4 font-display text-[3rem] font-semibold leading-[0.9]">{data.dayTripTitle}</h2><p className="mt-5 text-sm font-medium leading-7 text-white/70">{data.dayTripDescription}</p></div>
            </article>
            <div className="grid gap-3">{data.dayTripChecks.map((item, index) => <article key={item} className="flex items-start gap-4 rounded-2xl border border-jade/10 bg-white p-5 shadow-editorial-card"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-tonal text-xs font-extrabold text-jade">{index + 1}</span><p className="pt-1 text-xs font-medium leading-6 text-charcoal/66">{item}</p></article>)}</div>
          </div>
        </section>

        <section id="timing" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.68fr_1.32fr]">
            <SectionHeading eyebrow="Time the whole north" title={data.timingTitle} description={data.timingDescription} />
            <div className="grid gap-3">{data.timingRows.map((row) => <article key={row.period} className={`grid gap-4 rounded-2xl border p-5 sm:grid-cols-[110px_1fr_1fr_150px] sm:items-center ${row.highlight ? 'border-saffron/30 bg-white shadow-editorial-card' : 'border-jade/10 bg-canvas'}`}><strong className="font-display text-xl text-jade">{row.period}</strong><p className="text-[11px] leading-5 text-charcoal/62"><span className="font-extrabold text-jade">{data.cityA}: </span>{row.cityA}</p><p className="text-[11px] leading-5 text-charcoal/62"><span className="font-extrabold text-jade">{data.cityB}: </span>{row.cityB}</p><span className="text-[9px] font-extrabold uppercase tracking-[.11em] text-saffron-dark">{row.cue}</span></article>)}</div>
          </div>
        </section>

        <section className="section-divider-bottom py-14 lg:py-20">
          <div className="container-custom">
            <div className="relative overflow-hidden rounded-[28px] bg-jade text-white shadow-editorial-lift">
              <Image src={data.heroImage} alt="Northern Thailand city-to-city route planning" fill sizes="100vw" className="object-cover opacity-25" />
              <div className="absolute inset-0 bg-gradient-to-r from-jade via-jade/94 to-jade/52" />
              <div className="relative grid min-h-[420px] gap-10 px-7 py-10 sm:px-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:px-14">
                <div><p className="eyebrow !text-saffron-light">One route, two jobs</p><h2 className="mt-4 font-display text-[3.1rem] font-semibold leading-[0.9]">{data.routeTitle}</h2><p className="mt-5 text-sm leading-7 text-white/72">{data.routeDescription}</p><a href={data.routeHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-cream mt-7 min-h-12 px-6 text-saffron-dark">{data.routeCta} <ExternalLink size={15} /></a></div>
                <div className="grid gap-3 sm:grid-cols-2">{data.routeStops.map((stop, index) => <article key={stop.title} className="rounded-2xl border border-white/12 bg-white/10 p-5 backdrop-blur-sm"><div className="flex items-center justify-between gap-3"><span className="text-[9px] font-extrabold uppercase tracking-[.13em] text-saffron-light">{stop.label}</span><span className="font-display text-2xl text-white/30">0{index + 1}</span></div><h3 className="mt-4 font-display text-[1.55rem] font-semibold leading-none">{stop.title}</h3><p className="mt-3 text-[11px] font-medium leading-5 text-white/64">{stop.text}</p></article>)}</div>
              </div>
            </div>
          </div>
        </section>

        <section id="book" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
          <div className="container-custom">
            <SectionHeading eyebrow="After the decision" title="Check the current fit" description="No frozen hotel, tour or transport prices. Compare your actual dates, address, cancellation terms and inclusions at the provider." />
            <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{data.bookingCards.map(({ title, copy, href, icon: Icon }) => <article key={title} className="flex min-h-[300px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="grid h-11 w-11 place-items-center rounded-xl bg-tonal text-jade"><Icon size={21} /></span><h3 className="mt-6 font-display text-[1.7rem] font-semibold text-jade">{title}</h3><p className="mt-4 flex-1 text-xs leading-6 text-charcoal/62">{copy}</p><a href={href} target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-jade">Check current options <ArrowRight size={14} className="text-saffron" /></a></article>)}</div>
            <AffiliateDisclosure className="mt-4">Affiliate links to travel providers. Go2Thailand may earn a commission without increasing your price. The provider controls current availability, price, operator and terms.</AffiliateDisclosure>
          </div>
        </section>

        <FaqSplitSection id="questions" eyebrow="Real UK search questions" title={`${data.cityA} vs ${data.cityB} questions`} description={data.faqDescription} items={data.faqs} />
        <RelatedGuidesSection eyebrow="Build the route you chose" title="Plan each city as its own stay" readLabel="Open guide" guides={data.related} />
        <SourceMethodSection eyebrow="Sources & method" title="A comparison with an evidence boundary" description={data.methodDescription} sources={data.sources} />

        <section className="py-8"><div className="container-custom flex flex-wrap items-center justify-between gap-4 text-[10px] font-medium text-charcoal/48"><span>Independent UK-market research: {data.updatedAt}</span><span className="inline-flex items-center gap-2"><Sparkles size={13} className="text-jade" /> Prices, schedules, air quality and access remain live checks</span></div></section>
      </div>
    </>
  );
}
