import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, Compass, Map, MapPin, Search, Sparkles, Trees, Waves } from 'lucide-react';
import SEOHead from '../SEOHead';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';
import { ThailandMapGraphic } from '../visuals/ThailandMapGraphic';
import { destinationIndexNl as content } from '../../data/destinations/nl';

interface CitySummary {
  id: number;
  slug: string;
  name: { en: string; nl: string };
  region: string;
  province: string;
  image: string;
  highlights: string[];
}

interface DestinationIndexGuideProps {
  cities: CitySummary[];
}

const regionLabels: Record<string, string> = {
  Northern: 'Noord',
  Central: 'Centraal',
  Southern: 'Zuid',
  Isaan: 'Isaan',
};

const styleIcons = [Compass, Waves, Trees, Sparkles];

export default function DestinationIndexGuide({ cities }: DestinationIndexGuideProps) {
  const [region, setRegion] = useState('all');
  const [query, setQuery] = useState('');
  const [showAll, setShowAll] = useState(false);

  const filteredCities = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('nl-NL');
    return cities.filter((city) => {
      const matchesRegion = region === 'all' || city.region === region;
      const haystack = `${city.name.nl || city.name.en} ${city.province}`.toLocaleLowerCase('nl-NL');
      return matchesRegion && (!normalizedQuery || haystack.includes(normalizedQuery));
    });
  }, [cities, query, region]);

  const visibleCities = showAll || query || region !== 'all' ? filteredCities : filteredCities.slice(0, 12);
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': 'https://go2-thailand.com/nl/city/#mooiste-plekken',
    name: 'Mooiste plekken van Thailand',
    itemListElement: content.featured.map((destination, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: destination.name,
      url: `https://go2-thailand.com/nl/city/${destination.slug}/`,
    })),
  };
  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: content.seo.title,
    description: content.seo.description,
    url: 'https://go2-thailand.com/nl/city/',
    inLanguage: 'nl-NL',
    mainEntity: { '@id': 'https://go2-thailand.com/nl/city/#mooiste-plekken' },
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://go2-thailand.com/nl/' },
      { '@type': 'ListItem', position: 2, name: 'Bestemmingen', item: 'https://go2-thailand.com/nl/city/' },
    ],
  };

  return (
    <>
      <SEOHead title={content.seo.title} description={content.seo.description} ogImage="https://go2-thailand.com/images/redesign/destination-krabi.webp">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </SEOHead>

      <main className="bg-canvas text-charcoal">
        <section className="section-divider-bottom relative overflow-hidden bg-tonal pt-28 lg:min-h-[700px] lg:pt-20">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_72%_12%,rgba(242,154,56,0.16),transparent_24%),linear-gradient(135deg,rgba(255,255,255,0.72),transparent_48%)]" />
          <div className="container-custom relative z-10 grid min-h-[620px] items-center gap-12 pb-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:pb-12">
            <div className="max-w-[620px]">
              <nav aria-label="Kruimelpad" className="mb-6 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.15em] text-jade/55">
                <Link href="/" className="transition hover:text-saffron-dark">Thailand</Link><span aria-hidden="true">/</span><span className="text-jade">Bestemmingen</span>
              </nav>
              <p className="eyebrow">{content.hero.eyebrow}</p>
              <h1 className="max-w-[620px] font-display text-[4rem] font-semibold leading-[0.86] tracking-[-0.05em] text-jade sm:text-[5rem] lg:text-[5.65rem]">
                {content.hero.title}{' '}<span className="block text-saffron-dark">{content.hero.accent}</span>
              </h1>
              <p className="mt-7 max-w-[560px] text-[15px] font-medium leading-7 text-charcoal/70 sm:text-base">{content.hero.intro}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#mooiste-plekken" className="btn-jade btn-jade-pattern group min-h-12 justify-center px-6">Bekijk de shortlist <ArrowRight size={17} className="text-saffron transition group-hover:translate-x-1" /></a>
                <a href="#alle-bestemmingen" className="btn-cream group min-h-12 justify-center px-6 text-saffron-dark">Zoek een bestemming <span className="grid h-6 w-6 place-items-center rounded-md border border-saffron/45"><Search size={14} /></span></a>
              </div>
              <div className="mt-9 grid max-w-[560px] grid-cols-3 border-y border-jade/10 py-4">
                {[['10', 'sterke keuzes'], ['4', 'reisregio’s'], [String(cities.length), 'gidsen']].map(([value, label]) => <div key={label} className="border-r border-jade/10 px-3 first:pl-0 last:border-r-0"><strong className="block font-display text-2xl text-jade">{value}</strong><span className="text-[9px] font-bold uppercase tracking-[0.12em] text-charcoal/45">{label}</span></div>)}
              </div>
            </div>

            <div className="relative mx-auto h-[510px] w-full max-w-[680px] lg:h-[590px]">
              <div className="absolute left-[3%] top-[8%] h-[66%] w-[63%] overflow-hidden rounded-[28px] border border-white/70 shadow-editorial-lift">
                <Image src="/images/redesign/krabi-destination-hero.webp" alt="Longtailboot in het landschap van Krabi" fill priority sizes="(max-width: 1024px) 85vw, 42vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-jade/55 via-transparent to-transparent" />
                <span className="absolute bottom-5 left-5 font-display text-3xl font-semibold text-white">Krabi</span>
              </div>
              <div className="absolute right-[2%] top-0 h-[39%] w-[34%] overflow-hidden rounded-[24px] border-4 border-tonal shadow-editorial-card">
                <Image src="/images/redesign/destination-chiang-mai.webp" alt="Tempel in Chiang Mai" fill sizes="(max-width: 1024px) 40vw, 18vw" className="object-cover" />
              </div>
              <div className="absolute bottom-[2%] right-[4%] h-[48%] w-[38%] overflow-hidden rounded-[24px] border-4 border-tonal shadow-editorial-card">
                <Image src="/images/redesign/destination-bangkok.webp" alt="Tempels en stad in Bangkok" fill sizes="(max-width: 1024px) 42vw, 20vw" className="object-cover" />
              </div>
              <div className="absolute bottom-[4%] left-[8%] h-[39%] w-[34%] rounded-[24px] border border-jade/10 bg-white/90 p-5 shadow-editorial-card backdrop-blur-sm">
                <ThailandMapGraphic className="absolute bottom-1 right-2 h-[90%] w-auto opacity-90" />
                <div className="relative z-10"><p className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-saffron-dark">Van noord naar zuid</p><p className="mt-2 max-w-[125px] font-display text-2xl font-semibold leading-none text-jade">Kies één logische lijn.</p></div>
              </div>
            </div>
          </div>
        </section>

        <nav aria-label="Op deze pagina" className="section-divider-bottom sticky top-0 z-20 bg-canvas/94 backdrop-blur-xl">
          <div className="container-custom flex gap-7 overflow-x-auto py-4 text-[10px] font-extrabold uppercase tracking-[0.12em] text-charcoal/46 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[['#mooiste-plekken', 'Shortlist'], ['#reisstijl', 'Reisstijl'], ['#regios', 'Regio’s'], ['#alle-bestemmingen', 'Alle plekken'], ['#vragen', 'Vragen']].map(([href, label], index) => <a key={href} href={href} className="group flex shrink-0 items-center gap-2 transition hover:text-jade"><span className={`grid h-6 w-6 place-items-center rounded-full ${index === 0 ? 'bg-jade text-white' : 'border border-jade/12 bg-white text-jade'}`}>{index + 1}</span>{label}</a>)}
          </div>
        </nav>

        <section id="mooiste-plekken" className="section-divider-bottom scroll-mt-28 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <SectionHeading eyebrow="Eerst kiezen" title={<>Tien plekken.<br />Tien andere reizen.</>} description="Dit is geen objectieve ranglijst. Iedere plek staat hier omdat ze een duidelijk ander type reis mogelijk maakt. Let vooral op de keerzijde: die bepaalt vaak beter of een bestemming bij je past." />
              <div className="rounded-2xl border border-jade/10 bg-tonal p-5 text-sm font-medium leading-6 text-charcoal/65"><strong className="text-jade">Snelle keuze:</strong> eerste keer? Combineer Bangkok, Chiang Mai en één kustbasis. Minder verplaatsen levert meestal meer reis op.</div>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {content.featured.map((destination, index) => (
                <article key={destination.slug} className="group grid overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card sm:grid-cols-[0.9fr_1.1fr]">
                  <Link href={`/city/${destination.slug}/`} className="relative min-h-[260px] overflow-hidden sm:min-h-full" aria-label={`Lees de gids voor ${destination.name}`}>
                    <Image src={destination.image} alt={destination.alt} fill sizes="(max-width: 768px) 100vw, 28vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-jade/45 via-transparent to-transparent" />
                    <span className="absolute left-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-xs font-extrabold text-jade shadow-sm">{String(index + 1).padStart(2, '0')}</span>
                  </Link>
                  <div className="flex flex-col p-6 sm:p-7">
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-saffron-dark">{destination.kicker}</p>
                    <h2 className="mt-2 font-display text-[2.25rem] font-semibold leading-none text-jade">{destination.name}</h2>
                    <p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">{destination.summary}</p>
                    <dl className="mt-5 space-y-3 border-t border-jade/10 pt-5 text-[11px]">
                      <div className="flex gap-3"><Check size={15} className="mt-0.5 shrink-0 text-saffron-dark" /><div><dt className="font-extrabold text-jade">Past goed bij</dt><dd className="mt-0.5 text-charcoal/58">{destination.bestFor}</dd></div></div>
                      <div className="flex gap-3"><MapPin size={15} className="mt-0.5 shrink-0 text-saffron-dark" /><div><dt className="font-extrabold text-jade">Houd rekening met</dt><dd className="mt-0.5 text-charcoal/58">{destination.tradeoff}</dd></div></div>
                    </dl>
                    <Link href={`/city/${destination.slug}/`} className="mt-6 inline-flex items-center gap-2 self-start text-xs font-extrabold text-jade">Bekijk {destination.name} <ArrowRight size={14} className="text-saffron transition group-hover:translate-x-1" /></Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="reisstijl" className="section-divider-bottom scroll-mt-28 bg-tonal py-16 lg:py-20">
          <div className="container-custom">
            <SectionHeading eyebrow="Kies op gevoel" title="Welke reis wil je maken?" description="Een regio is pas nuttig als je weet waar je blij van wordt. Gebruik deze vier routes als startpunt en schrap daarna zonder schuldgevoel wat niet past." />
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {content.styles.map((style, index) => {
                const StyleIcon = styleIcons[index];
                return <article key={style.id} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-mist text-jade"><StyleIcon size={22} strokeWidth={1.6} /></span><h3 className="mt-6 font-display text-[1.75rem] font-semibold leading-none text-jade">{style.title}</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/62">{style.description}</p><div className="mt-5 flex flex-wrap gap-2">{style.links.map((link) => <span key={link} className="rounded-full border border-saffron/20 bg-[#fffaf3] px-3 py-1.5 text-[9px] font-extrabold text-saffron-dark">{link}</span>)}</div></article>;
              })}
            </div>
          </div>
        </section>

        <section id="regios" className="section-divider-bottom scroll-mt-28 py-16 lg:py-24">
          <div className="container-custom grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
            <div className="relative min-h-[590px] overflow-hidden rounded-[28px] border border-jade/10 bg-jade p-8 text-white shadow-editorial-lift">
              <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_75%_16%,rgba(242,154,56,0.24),transparent_23%),linear-gradient(145deg,rgba(255,255,255,0.05),transparent_58%)]" />
              <ThailandMapGraphic className="absolute bottom-[-22px] right-[-5px] h-[92%] w-auto opacity-95" />
              <div className="relative z-10 max-w-[270px]"><p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-saffron-light">De kaart helpt kiezen</p><h2 className="mt-3 font-display text-[3.25rem] font-semibold leading-[0.88] tracking-[-0.04em]">Vier regio’s. Niet één route.</h2><p className="mt-5 text-sm font-medium leading-7 text-white/68">Noord, centraal, Isaan en zuid vragen ieder om een ander tempo. Combineer liever twee sterke regio’s dan vier losse vinkjes.</p></div>
            </div>
            <div>
              <SectionHeading eyebrow="Van noord naar zuid" title="Kies eerst je regio" />
              <div className="mt-8 divide-y divide-jade/10 border-y border-jade/10">
                {content.regions.map((item, index) => <button key={item.key} type="button" onClick={() => { setRegion(item.key); document.getElementById('alle-bestemmingen')?.scrollIntoView({ behavior: 'smooth' }); }} className="group grid w-full gap-3 py-6 text-left sm:grid-cols-[45px_170px_1fr_auto] sm:items-center"><span className="font-display text-2xl text-saffron-dark">0{index + 1}</span><span className="text-xs font-extrabold uppercase tracking-[0.1em] text-jade">{item.label}</span><span><strong className="block font-display text-xl font-semibold text-jade">{item.title}</strong><span className="mt-2 block text-xs font-medium leading-5 text-charcoal/58">{item.description}</span></span><ArrowRight size={17} className="text-saffron transition group-hover:translate-x-1" /></button>)}
              </div>
            </div>
          </div>
        </section>

        <section id="alle-bestemmingen" className="section-divider-bottom scroll-mt-28 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading eyebrow="De complete gids" title="Vind jouw bestemming" description="Zoek op plaats of provincie en filter op regio. De kaarten brengen je naar de volledige gids met bezienswaardigheden, eten, verblijf en praktische informatie." />
              <div className="w-full max-w-[620px] space-y-3">
                <label htmlFor="destination-search" className="sr-only">Zoek een bestemming of provincie</label>
                <div className="relative"><Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-jade/45" /><input id="destination-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Zoek bijvoorbeeld Krabi of Chiang Mai" className="h-13 w-full rounded-xl border border-jade/12 bg-white py-3.5 pl-12 pr-4 text-sm font-medium text-jade outline-none transition placeholder:text-charcoal/36 focus:border-saffron/55 focus:ring-4 focus:ring-saffron/10" /></div>
                <div className="flex flex-wrap gap-2">{[['all', 'Alle regio’s'], ['Northern', 'Noord'], ['Central', 'Centraal'], ['Isaan', 'Isaan'], ['Southern', 'Zuid']].map(([key, label]) => <button key={key} type="button" onClick={() => setRegion(key)} aria-pressed={region === key} className={`rounded-full border px-4 py-2 text-[10px] font-extrabold transition ${region === key ? 'border-jade bg-jade text-white' : 'border-jade/12 bg-white text-jade hover:border-saffron/40'}`}>{label}</button>)}</div>
              </div>
            </div>

            <div className="mt-9 flex items-center justify-between text-[10px] font-extrabold uppercase tracking-[0.12em] text-charcoal/43"><span>{filteredCities.length} bestemmingen</span>{region !== 'all' ? <button type="button" onClick={() => setRegion('all')} className="text-saffron-dark">Wis regiofilter</button> : null}</div>
            {visibleCities.length ? <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{visibleCities.map((city) => <Link key={city.slug} href={`/city/${city.slug}/`} className="group overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card"><div className="relative h-40 overflow-hidden"><Image src={city.image} alt={`${city.name.nl || city.name.en} in Thailand`} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 25vw" className="object-cover transition duration-500 group-hover:scale-[1.035]" /><div className="absolute inset-0 bg-gradient-to-t from-jade/55 via-transparent to-transparent" /><span className="absolute bottom-3 left-4 rounded-full bg-white/90 px-2.5 py-1 text-[9px] font-extrabold text-jade">{regionLabels[city.region] || city.region}</span></div><div className="flex items-center justify-between gap-4 p-4"><div><h3 className="font-display text-[1.55rem] font-semibold leading-none text-jade">{city.name.nl || city.name.en}</h3><p className="mt-1 text-[10px] text-charcoal/46">{city.province}</p></div><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-jade/10 text-saffron-dark transition group-hover:border-saffron/35 group-hover:bg-[#fff8ee]"><ArrowRight size={14} /></span></div></Link>)}</div> : <div className="mt-8 rounded-2xl border border-jade/10 bg-white p-10 text-center"><Map size={28} className="mx-auto text-jade/35" /><h3 className="mt-4 font-display text-2xl font-semibold text-jade">Geen bestemming gevonden</h3><p className="mt-2 text-sm text-charcoal/55">Probeer een andere schrijfwijze of wis je regiofilter.</p></div>}
            {!showAll && !query && region === 'all' && filteredCities.length > 12 ? <div className="mt-8 text-center"><button type="button" onClick={() => setShowAll(true)} className="btn-cream min-h-12 px-6 text-saffron-dark">Toon alle {filteredCities.length} bestemmingen <ArrowRight size={15} /></button></div> : null}
          </div>
        </section>

        <FaqSplitSection eyebrow="Echte zoekvragen" title="Veelgestelde vragen over Thailand" description="Korte antwoorden op vragen die Nederlandse reizigers nu daadwerkelijk in Google stellen. Voor budget, veiligheid en seizoen linken we door naar de gids die dat onderwerp volledig bezit." items={[...content.faqs]} />
        <RelatedGuidesSection eyebrow="Maak er een reis van" title="Plan de volgende stap" guides={[...content.relatedGuides]} />
        <SourceMethodSection title="Hoe deze selectie is gemaakt" description="We combineren actuele Nederlandse zoekintentie met officiële bestemmingsinformatie en onze bestaande Thailand-datasets. De shortlist is redactioneel: praktisch reisfit weegt zwaarder dan alleen een mooi beeld." sources={[...content.sources]} />
      </main>
    </>
  );
}
