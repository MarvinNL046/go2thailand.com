import Image from 'next/image';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  CalendarRange,
  Camera,
  Check,
  CloudRain,
  CloudSun,
  Droplets,
  ExternalLink,
  Info,
  Landmark,
  Leaf,
  ShieldCheck,
  Shirt,
  Sun,
  ThermometerSun,
  Umbrella,
  WalletCards,
  Waves,
} from 'lucide-react';
import SEOHead from '../SEOHead';
import FeedbackForm from '../FeedbackForm';
import type { WeatherGuideData, WeatherIconName, WeatherMonth } from '../../data/weather/types';
import { cityAffiliates, KLOOK_GENERIC, TRIP_GENERIC, withPlacementSubId } from '../../lib/affiliates';
import { useSubId } from '../../lib/useSubId';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav, type PageSectionNavItem } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SourceMethodSection } from '../design/SourceMethodSection';
import { EditorialHero, type EditorialHeroAction } from '../design/EditorialHero';

interface WeatherGuideTemplateProps {
  data: WeatherGuideData;
}

const iconMap: Record<WeatherIconName, LucideIcon> = {
  sun: Sun,
  'cloud-sun': CloudSun,
  'cloud-rain': CloudRain,
  waves: Waves,
  leaf: Leaf,
  wallet: WalletCards,
  camera: Camera,
  umbrella: Umbrella,
  shirt: Shirt,
  shield: ShieldCheck,
};

const weatherSectionNavItems: PageSectionNavItem[] = [
  { href: '#advies', label: 'Kort advies', icon: Sun },
  { href: '#per-maand', label: 'Per maand', icon: CalendarRange },
  { href: '#seizoenen', label: 'Seizoenen', icon: CloudSun },
  { href: '#plannen', label: 'Slim plannen', icon: ShieldCheck },
  { href: '#vragen', label: 'Vragen', icon: Info },
];

const travelToneClasses: Record<WeatherMonth['travelTone'], string> = {
  best: 'bg-[#e0eee6] text-jade',
  good: 'bg-[#edf2e9] text-jade',
  mixed: 'bg-[#fff0dc] text-[#9c5a18]',
  wet: 'bg-[#e7edf0] text-[#36545d]',
};

const seasonToneClasses = {
  dry: 'border-saffron/30 bg-[#fffaf1]',
  transition: 'border-[#d9b98a]/40 bg-[#f8f1e6]',
  green: 'border-jade/15 bg-[#edf3ef]',
};

function formatDecimal(value: number) {
  return value.toLocaleString('nl-NL', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

export default function WeatherGuideTemplate({ data }: WeatherGuideTemplateProps) {
  const subId = useSubId();
  const klookHref = withPlacementSubId(cityAffiliates[data.citySlug]?.klook || KLOOK_GENERIC, subId, `${data.citySlug}-weather-activities`);
  const tripHref = withPlacementSubId(cityAffiliates[data.citySlug]?.trip || TRIP_GENERIC, subId, `${data.citySlug}-weather-hotels`);
  const heroActions: EditorialHeroAction[] = [
    { label: 'Bekijk het weer per maand', href: '#per-maand', kind: 'primary' },
    {
      label: 'Actuele verwachting',
      href: data.currentForecastUrl,
      kind: 'secondary',
      newTab: true,
      icon: <span className="grid h-6 w-6 place-items-center rounded-md border border-saffron/45"><ExternalLink size={13} aria-hidden="true" /></span>,
    },
  ];
  const heroBreadcrumbs = [
    { label: 'Thailand', href: '/' },
    { label: data.cityName, href: `/city/${data.citySlug}/` },
    { label: 'Weer' },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/nl/' },
      { '@type': 'ListItem', position: 2, name: data.cityName, item: `https://go2-thailand.com/nl/city/${data.citySlug}/` },
      { '@type': 'ListItem', position: 3, name: 'Weer en beste reistijd', item: data.pageUrl },
    ],
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${data.pageUrl}#webpage`,
    url: data.pageUrl,
    name: data.pageTitle,
    description: data.pageDescription,
    inLanguage: 'nl-NL',
    dateModified: data.dateModified,
    isBasedOn: data.sources.map((source) => source.url),
  };

  const datasetSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: `Klimaatgemiddelden ${data.cityName} per maand`,
    description: `Maandgemiddelden voor maximumtemperatuur, minimumtemperatuur, neerslag en regendagen bij ${data.climateStation}.`,
    url: data.pageUrl,
    temporalCoverage: data.climatePeriod.replace('–', '/'),
    spatialCoverage: { '@type': 'Place', name: `${data.cityName}, Thailand` },
    creator: { '@type': 'Organization', name: 'Thai Meteorological Department', url: 'https://www.tmd.go.th/' },
    variableMeasured: ['Gemiddelde maximumtemperatuur', 'Gemiddelde minimumtemperatuur', 'Gemiddelde maandneerslag', 'Gemiddeld aantal regendagen'],
  };

  return (
    <>
      <SEOHead title={data.pageTitle} description={data.pageDescription} ogImage={`https://go2-thailand.com${data.heroImage}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      </SEOHead>

      <div className="bg-canvas text-charcoal">
        <EditorialHero
          image={data.heroImage}
          imageAlt={data.heroAlt}
          breadcrumbs={heroBreadcrumbs}
          eyebrow={data.eyebrow}
          title={<><span className="block">{data.heroTitle}</span>{' '}<span className="block text-jade-light">{data.heroAccent}</span></>}
          titleClassName="max-w-[640px] text-[4.35rem] leading-[0.82] sm:text-[5.35rem] lg:text-[6.15rem]"
          description={data.intro}
          descriptionClassName="mt-6 max-w-[570px] text-[15px] leading-7 sm:text-base"
          actions={heroActions}
          minHeightClassName="min-h-[720px] lg:min-h-[650px]"
          imageClassName="object-cover object-[66%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.08)_0%,rgba(252,250,246,0.36)_40%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.99)_0%,rgba(252,250,246,0.92)_36%,rgba(252,250,246,0.28)_62%,rgba(8,44,39,0.2)_100%)]"
          decorativeOverlay={<div aria-hidden="true" className="absolute right-0 top-0 hidden h-full w-[42%] bg-[radial-gradient(circle_at_78%_18%,rgba(242,154,56,0.42),transparent_23%),linear-gradient(150deg,transparent_32%,rgba(12,48,43,0.18)_78%)] lg:block" />}
          sideCard={(
            <div className="absolute bottom-10 right-[6%] z-10 hidden rounded-2xl border border-white/35 bg-jade/82 p-5 text-white shadow-2xl backdrop-blur-md lg:block">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-saffron text-white"><Sun size={22} aria-hidden="true" /></span>
                <div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/60">{data.decisionCards[0].label}</p><p className="mt-1 font-display text-2xl font-semibold">{data.decisionCards[0].value}</p></div>
              </div>
            </div>
          )}
        />

        <section className="section-divider-bottom bg-canvas py-7">
          <div className="container-custom grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {data.stats.map((stat, index) => {
              const StatIcon = [CalendarRange, ThermometerSun, Droplets, Sun][index];
              return (
                <div key={stat.label} className="flex items-center gap-3 rounded-xl border border-jade/10 bg-white/65 px-4 py-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f6eee2] text-saffron-dark"><StatIcon size={19} /></span>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-charcoal/48">{stat.label}</p>
                    <p className="mt-0.5 text-sm font-extrabold text-jade">{stat.value}</p>
                    <p className="mt-0.5 text-[10px] text-charcoal/52">{stat.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <PageSectionNav items={weatherSectionNavItems} />

        <section id="advies" className="section-divider-bottom py-14 lg:py-20">
          <div className="container-custom grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <p className="eyebrow">Het korte antwoord</p>
              <h2 className="heading-redesign max-w-[760px]">Wat is de beste reistijd voor {data.cityName}?</h2>
              <p className="mt-6 max-w-[770px] text-base font-medium leading-8 text-charcoal/72">{data.quickAnswer}</p>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {data.decisionCards.map(({ label, value }) => (
                  <div key={label} className="rounded-xl border border-jade/10 bg-white p-4 shadow-[0_12px_35px_rgba(18,63,54,0.05)]">
                    <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-saffron-dark">{label}</p>
                    <p className="mt-2 font-display text-xl font-semibold text-jade">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-2xl border border-jade/12 bg-[#edf3ef] p-6 lg:p-7">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-jade text-white"><Info size={20} /></span>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-jade">Klimaat is geen voorspelling</h3>
                  <p className="mt-3 text-sm leading-6 text-charcoal/68">{data.planningNotes.climateVsForecast}</p>
                  <a href={data.currentForecastUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-jade transition hover:text-saffron-dark">
                    Open de officiële TMD-verwachting <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section id="per-maand" className="section-divider-bottom bg-tonal py-14 lg:py-20">
          <div className="container-custom">
            <div className="max-w-[820px]">
              <p className="eyebrow">Officiële klimaatnormalen</p>
              <h2 className="heading-redesign">{data.cityName} weer per maand</h2>
              <p className="mt-5 max-w-[760px] text-sm leading-7 text-charcoal/66">De cijfers zijn gemiddelden van {data.climateStation} over {data.climatePeriod}. Regenval is het maandtotaal; een regendag hoeft dus geen volledig verregende dag te zijn.</p>
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-[0_20px_55px_rgba(18,63,54,0.07)]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[820px] border-collapse text-left">
                  <thead className="bg-jade text-white">
                    <tr className="text-[10px] uppercase tracking-[0.14em]">
                      <th scope="col" className="px-5 py-4">Maand</th>
                      <th scope="col" className="px-4 py-4">Gem. max.</th>
                      <th scope="col" className="px-4 py-4">Gem. min.</th>
                      <th scope="col" className="px-4 py-4">Regen</th>
                      <th scope="col" className="px-4 py-4">Regendagen</th>
                      <th scope="col" className="px-5 py-4">Reisbeeld</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.months.map((month) => (
                      <tr key={month.slug} className="border-b border-jade/8 last:border-0 hover:bg-canvas">
                        <th scope="row" className="px-5 py-4">
                          <Link href={`/city/${data.citySlug}/weather/${month.slug}/`} className="group inline-flex items-center gap-2 font-extrabold text-jade hover:text-saffron-dark">
                            {month.name} <ArrowRight size={13} className="opacity-45 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                          </Link>
                        </th>
                        <td className="px-4 py-4 text-sm font-bold text-charcoal/78">{formatDecimal(month.meanHigh)} °C</td>
                        <td className="px-4 py-4 text-sm text-charcoal/65">{formatDecimal(month.meanLow)} °C</td>
                        <td className="px-4 py-4 text-sm text-charcoal/65">{formatDecimal(month.rainfall)} mm</td>
                        <td className="px-4 py-4 text-sm text-charcoal/65">{formatDecimal(month.rainDays)}</td>
                        <td className="px-5 py-4"><span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-extrabold ${travelToneClasses[month.travelTone]}`}>{month.travelLabel}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="border-t border-jade/8 bg-canvas px-5 py-3 text-[10px] leading-5 text-charcoal/50">Bron: Thai Meteorological Department. Waarden zijn afgerond op één decimaal en beschrijven het klimaat, niet het weer tijdens jouw specifieke reis.</div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {data.planningNotes.interpretation.map(({ title, description }) => (
                <div key={title} className="rounded-xl border border-jade/10 bg-white/60 p-4">
                  <h3 className="text-xs font-extrabold text-jade">{title}</h3>
                  <p className="mt-2 text-[11px] leading-5 text-charcoal/60">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="seizoenen" className="section-divider-bottom py-14 lg:py-20">
          <div className="container-custom">
            <div className="max-w-[760px]">
              <p className="eyebrow">Kies je seizoen bewust</p>
              <h2 className="heading-redesign">Drie reisperiodes voor {data.cityName}</h2>
            </div>
            <div className="mt-9 grid gap-5 lg:grid-cols-3">
              {data.seasons.map((season) => {
                const SeasonIcon = iconMap[season.icon];
                return (
                  <article key={season.title} className={`rounded-2xl border p-6 shadow-[0_16px_45px_rgba(18,63,54,0.05)] lg:p-7 ${seasonToneClasses[season.tone]}`}>
                    <div className="flex items-center justify-between gap-4">
                      <span className="grid h-12 w-12 place-items-center rounded-xl border border-jade/10 bg-white text-jade shadow-sm"><SeasonIcon size={23} /></span>
                      <span className="rounded-full bg-white/75 px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">{season.months}</span>
                    </div>
                    <h3 className="mt-6 font-display text-[2rem] font-semibold leading-none text-jade">{season.title}</h3>
                    <p className="mt-4 text-sm leading-6 text-charcoal/68">{season.summary}</p>
                    <div className="mt-5 border-t border-jade/10 pt-5 text-xs leading-5">
                      <p className="flex gap-2 text-jade"><Check size={15} className="mt-0.5 shrink-0 text-saffron" /><span><strong>Past bij:</strong> {season.bestFor}</span></p>
                      <p className="mt-3 flex gap-2 text-charcoal/62"><Info size={15} className="mt-0.5 shrink-0" /><span><strong>Let op:</strong> {season.tradeoff}</span></p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-10 lg:py-14">
          <div className="container-custom">
            <div className="relative min-h-[470px] overflow-hidden rounded-2xl bg-jade text-white shadow-[0_22px_70px_rgba(18,63,54,0.18)] lg:min-h-[390px]">
              <Image src={data.greenSeason.image} alt={data.greenSeason.alt} fill sizes="(max-width: 1024px) 100vw, 1280px" className="object-cover object-center" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,49,42,0.96)_0%,rgba(6,49,42,0.86)_44%,rgba(6,49,42,0.18)_78%,rgba(6,49,42,0.05)_100%)]" />
              <div className="relative z-10 flex min-h-[470px] max-w-[720px] flex-col justify-center p-7 sm:p-10 lg:min-h-[390px] lg:p-14">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-saffron-light">{data.greenSeason.eyebrow}</p>
                <h2 className="mt-3 max-w-[620px] font-display text-[3.2rem] font-semibold leading-[0.88] tracking-[-0.035em] sm:text-[4rem]">{data.greenSeason.title}</h2>
                <p className="mt-5 max-w-[640px] text-sm leading-7 text-white/78">{data.greenSeason.description}</p>
                <ul className="mt-6 grid gap-2 text-xs font-bold text-white/90 sm:grid-cols-2">
                  {data.greenSeason.bullets.map((bullet) => <li key={bullet} className="flex gap-2"><Check size={15} className="shrink-0 text-saffron-light" /> {bullet}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-14 lg:py-20">
          <div className="container-custom">
            <div className="max-w-[760px]">
              <p className="eyebrow">Niet iedereen zoekt hetzelfde</p>
              <h2 className="heading-redesign">De beste maand voor jouw reisstijl</h2>
            </div>
            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {data.travelStyles.map((style) => {
                const StyleIcon = iconMap[style.icon];
                return (
                  <article key={style.title} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-[0_14px_38px_rgba(18,63,54,0.05)]">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#f6eee2] text-saffron-dark"><StyleIcon size={21} /></span>
                    <p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-dark">{style.months}</p>
                    <h3 className="mt-2 font-display text-[1.65rem] font-semibold leading-none text-jade">{style.title}</h3>
                    <p className="mt-4 text-sm leading-6 text-charcoal/64">{style.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="plannen" className="section-divider-bottom bg-canvas py-14 lg:py-20">
          <div className="container-custom">
            <div className="grid gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
              <div>
                <p className="eyebrow">Slim inpakken</p>
                <h2 className="heading-redesign">Wat neem je mee?</h2>
                <div className="mt-7 grid overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-[0_18px_50px_rgba(18,63,54,0.07)] sm:grid-cols-[0.9fr_1.1fr]">
                  <div className="relative min-h-[310px] sm:min-h-full">
                    <Image
                      src={data.packingImage.src}
                      alt={data.packingImage.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 26vw"
                      className="object-cover"
                    />
                    <span className="absolute left-4 top-4 rounded-full border border-white/50 bg-white/85 px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.15em] text-jade shadow-sm backdrop-blur-sm">{data.cityName}-paklijst</span>
                  </div>
                  <div className="p-5 sm:p-6">
                    <ul className="divide-y divide-jade/10">
                      {data.packingTips.map((tip) => (
                        <li key={tip.title} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#edf3ef] text-jade"><Check size={13} strokeWidth={2.7} /></span>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-extrabold leading-5 text-jade">{tip.title} <span className="font-medium text-charcoal/48">— {tip.description}</span></p>
                            {tip.amazonSlug && (
                              <a href={`/go/${tip.amazonSlug}/`} target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-1 inline-flex items-center gap-1 text-[10px] font-extrabold text-saffron-dark transition hover:text-jade">
                                {tip.amazonLabel} op Amazon <ExternalLink size={10} />
                              </a>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-[500px] text-[9px] leading-4 text-charcoal/48">Als Amazon-partner verdienen wij aan in aanmerking komende aankopen. Jij betaalt niets extra; aanbod en levering kunnen per land verschillen.</p>
                  <Link href="/travel-gear/" className="group inline-flex shrink-0 items-center gap-2 text-xs font-extrabold text-jade transition hover:text-saffron-dark">
                    Complete Thailand-paklijst <ArrowRight size={14} className="text-saffron transition group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              <div>
                <p className="eyebrow">Plan flexibel</p>
                <h2 className="heading-redesign max-w-[580px]">Zo voorkom je dat het weer je reis bepaalt</h2>
                <div className="relative mt-8">
                  <div aria-hidden="true" className="pointer-events-none absolute bottom-10 left-[47px] top-10 border-l-2 border-dashed border-saffron/45 sm:hidden" />
                  <svg className="pointer-events-none absolute left-[8%] top-4 hidden h-24 w-[84%] overflow-visible lg:block" viewBox="0 0 680 110" fill="none" aria-hidden="true">
                    <path d="M10 34 C86 103 132 10 222 48 S370 93 447 37 S570 18 670 68" stroke="#f29a38" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 8" />
                    <circle cx="10" cy="34" r="5" fill="#f29a38" />
                    <circle cx="222" cy="48" r="5" fill="#f29a38" />
                    <circle cx="447" cy="37" r="5" fill="#f29a38" />
                    <circle cx="670" cy="68" r="5" fill="#f29a38" />
                  </svg>
                  <div className="grid gap-4 sm:grid-cols-3 lg:gap-5">
                    {data.plans.map((plan, index) => {
                      const PlanIcon = [Sun, Leaf, Landmark][index];
                      return (
                        <article key={plan.label} className="relative flex gap-4 rounded-2xl border border-jade/10 bg-white/75 p-5 shadow-[0_14px_38px_rgba(18,63,54,0.05)] sm:block sm:border-0 sm:bg-transparent sm:px-2 sm:py-4 sm:shadow-none">
                          <span className={`relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl border bg-canvas shadow-sm ${index === 0 ? 'border-saffron/30 text-saffron' : 'border-jade/15 text-jade'}`}>
                            <PlanIcon size={27} strokeWidth={1.6} />
                          </span>
                          <div className="sm:mt-7">
                            <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-dark">{plan.label}</p>
                            <h3 className="mt-1 font-display text-[1.55rem] font-semibold leading-none text-jade">{plan.title}</h3>
                            <p className="mt-3 text-xs leading-5 text-charcoal/62">{plan.description}</p>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-saffron/20 bg-[#fff8ec] p-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-[470px] text-xs leading-5 text-charcoal/65"><strong className="text-jade">Boek slim:</strong> {data.planningNotes.bookingTip}</p>
                  <a href={klookHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-jade btn-jade-pattern group shrink-0 justify-center px-5 py-3">
                    Bekijk uitjes <ArrowRight size={15} className="text-saffron transition group-hover:translate-x-1" />
                  </a>
                </div>
                <AffiliateDisclosure className="mt-2">De uitjesknop is een affiliatelink. Bij een boeking ontvangen wij mogelijk een commissie; jij betaalt niets extra.</AffiliateDisclosure>
              </div>
            </div>
          </div>
        </section>

        <FaqSplitSection
          eyebrow="DFS People Also Ask"
          title={`Veelgestelde vragen over het weer in ${data.cityName}`}
          description="Deze vragen komen letterlijk uit de Nederlandse zoekresultaten. De antwoorden combineren reiscontext met de gecontroleerde klimaatdata op deze pagina."
          items={data.faqs}
        />

        <RelatedGuidesSection
          title={`Maak je ${data.cityName}-reis compleet`}
          guides={data.relatedGuides}
          sideLink={{ label: 'Bekijk hotels via Trip.com', href: tripHref, affiliate: true }}
          disclosure="De Trip.com-link is een affiliatelink. Bij een boeking ontvangen wij mogelijk een commissie; jij betaalt niets extra."
        />

        <SourceMethodSection
          title="Waar komen deze cijfers vandaan?"
          description="We gebruiken geen gegenereerde weersverwachting. De tabel is gebaseerd op officiële klimaatnormalen; voor de komende dagen verwijzen we naar de actuele dienst van TMD."
          sources={data.sources}
        />

        <section className="py-10 lg:py-12">
          <div className="container-custom"><FeedbackForm pageTitle={data.pageTitle} pageUrl={data.pageUrl} /></div>
        </section>
      </div>
    </>
  );
}
