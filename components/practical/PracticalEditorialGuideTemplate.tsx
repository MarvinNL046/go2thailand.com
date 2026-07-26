import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BadgeCheck,
  Check,
  Clock3,
  Coffee,
  CreditCard,
  ExternalLink,
  IdCard,
  MapPin,
  Microwave,
  Moon,
  Package,
  ShieldCheck,
  ShoppingBasket,
  Smartphone,
  Sparkles,
  WalletCards,
  Wifi,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { PracticalEditorialGuideData, PracticalGuideIcon } from '../../data/practical-guides/types';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';

const iconMap: Record<PracticalGuideIcon, LucideIcon> = {
  basket: ShoppingBasket,
  coffee: Coffee,
  'credit-card': CreditCard,
  'id-card': IdCard,
  'map-pin': MapPin,
  microwave: Microwave,
  moon: Moon,
  package: Package,
  phone: Smartphone,
  shield: ShieldCheck,
  sim: Wifi,
  sparkles: Sparkles,
  wallet: WalletCards,
};

function createSchemas(data: PracticalEditorialGuideData) {
  const pageUrl = `https://go2-thailand.com/nl/travel-guides/${data.slug}/`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data.seo.title,
      description: data.seo.description,
      image: data.seo.image,
      datePublished: data.publishedAt,
      dateModified: data.updatedAt,
      inLanguage: 'nl-NL',
      mainEntityOfPage: pageUrl,
      author: { '@type': 'Organization', name: 'Go2 Thailand', url: 'https://go2-thailand.com/' },
      publisher: { '@type': 'Organization', name: 'Go2 Thailand', url: 'https://go2-thailand.com/' },
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
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://go2-thailand.com/nl/' },
        { '@type': 'ListItem', position: 2, name: 'Reisgidsen', item: 'https://go2-thailand.com/nl/travel-guides/' },
        { '@type': 'ListItem', position: 3, name: '7-Eleven Thailand', item: pageUrl },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Wat koop je bij 7-Eleven Thailand?',
      itemListElement: data.products.cards.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: product.title,
        description: product.description,
      })),
    },
  ];
}

export function PracticalEditorialGuideTemplate({ data }: { data: PracticalEditorialGuideData }) {
  const schemas = createSchemas(data);
  const sectionNav = [
    { href: '#kiezen' as const, label: 'Kiezen', icon: ShoppingBasket },
    { href: '#eten' as const, label: 'Eten', icon: Coffee },
    { href: '#prijzen' as const, label: 'Prijzen', icon: WalletCards },
    { href: '#diensten' as const, label: 'Diensten', icon: Smartphone },
    { href: '#regels' as const, label: 'Regels', icon: Clock3 },
    { href: '#meenemen' as const, label: 'Meenemen', icon: Package },
    { href: '#vragen' as const, label: 'Vragen', icon: ShieldCheck },
  ];

  return (
    <>
      <SEOHead title={data.seo.title} description={data.seo.description} ogImage={data.seo.image}>
        <meta name="keywords" content="7 eleven thailand, 7-eleven thailand, 7 eleven thailand snacks, wat kopen bij 7 eleven thailand, prijzen 7 eleven thailand, simkaart thailand" />
        {schemas.map((schema) => <script key={schema['@type']} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      </SEOHead>

      <div className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          image={data.hero.image}
          imageAlt={data.hero.imageAlt}
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Reisgidsen', href: '/travel-guides/' }, { label: '7-Eleven' }]}
          eyebrow={data.hero.eyebrow}
          title={<>{data.hero.title}</>}
          subtitle={<>{data.hero.accent}</>}
          description={data.hero.description}
          actions={[
            { label: 'Wat koop je?', href: '#kiezen', kind: 'primary' },
            { label: 'Bekijk prijsbanden', href: '#prijzen', kind: 'secondary' },
          ]}
          minHeightClassName="min-h-[790px] lg:min-h-[720px]"
          contentClassName="max-w-[690px]"
          titleClassName="max-w-[690px] text-[3.9rem] leading-[0.84] sm:text-[5.05rem] lg:text-[5.75rem]"
          subtitleClassName="max-w-[600px] text-[2rem] leading-[0.92] text-saffron-dark sm:text-[2.75rem]"
          imageClassName="object-cover object-[66%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.12)_0%,rgba(252,250,246,0.56)_49%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.99)_0%,rgba(252,250,246,0.93)_38%,rgba(252,250,246,0.22)_66%,rgba(11,45,39,0.13)_100%)]"
          sideCard={(
            <aside className="absolute bottom-8 right-[max(2rem,calc((100vw-1280px)/2))] z-10 hidden w-[315px] overflow-hidden rounded-2xl border border-white/60 bg-white/82 shadow-editorial-lift backdrop-blur-xl xl:block">
              <div className="flex items-center justify-between border-b border-jade/10 px-5 py-4">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-dark">Snel beslissen</p>
                <span className="grid h-9 w-9 place-items-center rounded-full border border-saffron/30 bg-canvas text-jade"><ShoppingBasket size={17} /></span>
              </div>
              <div className="grid grid-cols-3 divide-x divide-jade/10 px-2 py-5 text-center">
                <div><strong className="block font-display text-2xl text-jade">A</strong><span className="text-[9px] font-bold text-charcoal/52">Nu nodig</span></div>
                <div><strong className="block font-display text-2xl text-jade">B</strong><span className="text-[9px] font-bold text-charcoal/52">Voor later</span></div>
                <div><strong className="block font-display text-2xl text-jade">C</strong><span className="text-[9px] font-bold text-charcoal/52">Met regels</span></div>
              </div>
              <p className="border-t border-jade/10 px-5 py-4 text-[10px] font-medium leading-4 text-charcoal/55">Prijzen en voorraad wisselen. De kassa en actuele overheidsinformatie blijven leidend.</p>
            </aside>
          )}
        />

        <PageSectionNav items={sectionNav} />

        <section id="kiezen" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div>
                <SectionHeading eyebrow={data.intro.eyebrow} title={data.intro.title} description={data.intro.description} />
                <div className="relative mt-8 hidden h-20 max-w-[290px] lg:block" aria-hidden="true">
                  <ShoppingBasket size={28} strokeWidth={1.45} className="absolute left-0 top-0 text-jade" />
                  <div className="absolute left-9 top-5 h-8 w-[72%] rounded-[50%] border-b-2 border-dashed border-saffron/75" />
                  <MapPin size={28} strokeWidth={1.45} className="absolute right-3 top-9 text-saffron" />
                  <span className="absolute left-[52%] top-[45px] h-2 w-2 rounded-full bg-saffron" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {data.intro.cards.map((card, index) => {
                  const Icon = iconMap[card.icon];
                  return (
                    <article key={card.title} className={`rounded-2xl border p-6 shadow-editorial-card ${index === 0 ? 'border-saffron/35 bg-tonal' : 'border-jade/10 bg-white'}`}>
                      <div className="flex items-center justify-between">
                        <span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/25 bg-canvas text-jade"><Icon size={20} strokeWidth={1.5} /></span>
                        <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">{card.label}</span>
                      </div>
                      <h2 className="mt-5 font-display text-[1.65rem] font-semibold leading-none text-jade">{card.title}</h2>
                      <p className="mt-3 text-xs font-medium leading-5 text-charcoal/66">{card.description}</p>
                      <p className="mt-4 border-t border-jade/10 pt-4 text-[10px] font-bold leading-4 text-jade/60">{card.note}</p>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="mt-10 grid overflow-hidden rounded-[28px] border border-jade/10 bg-white shadow-editorial-card lg:grid-cols-[0.86fr_1.14fr]">
              <div className="relative min-h-[340px] lg:min-h-[460px]">
                <Image src={data.basket.image} alt={data.basket.imageAlt} fill sizes="(max-width: 1024px) 100vw, 44vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-jade/38 via-transparent to-transparent lg:bg-gradient-to-r" />
              </div>
              <div className="p-7 sm:p-10 lg:p-12">
                <p className="eyebrow">De eerste stop</p>
                <h2 className="font-display text-[2.65rem] font-semibold leading-[0.9] tracking-[-0.035em] text-jade sm:text-[3.3rem]">{data.basket.title}</h2>
                <p className="mt-5 text-sm font-medium leading-7 text-charcoal/66">{data.basket.intro}</p>
                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  {data.basket.items.map((item) => (
                    <div key={item.title} className="border-t border-jade/12 pt-4">
                      <div className="flex items-center gap-2 text-xs font-extrabold text-jade"><Check size={14} className="text-saffron" />{item.title}</div>
                      <p className="mt-2 text-[11px] font-medium leading-5 text-charcoal/58">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="mt-6 rounded-2xl border border-saffron/25 bg-tonal px-6 py-5 sm:flex sm:items-center sm:gap-6">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-jade text-saffron-light"><BadgeCheck size={20} /></span>
              <div className="mt-3 sm:mt-0"><strong className="text-sm font-extrabold text-jade">Kort oordeel</strong><p className="mt-1 text-xs font-medium leading-5 text-charcoal/66">{data.intro.verdict}</p></div>
            </aside>
          </div>
        </section>

        <section id="eten" className="section-divider-bottom scroll-mt-24 bg-tonal/45 py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading eyebrow={data.products.eyebrow} title={data.products.title} description={data.products.description} />
            <div className="mt-9 grid gap-5 lg:grid-cols-3">
              {data.products.cards.map((card) => (
                <article key={card.title} className="group overflow-hidden rounded-[24px] border border-jade/10 bg-white shadow-editorial-card">
                  <div className="relative h-64 overflow-hidden">
                    <Image src={card.image} alt={card.imageAlt} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" />
                    <span className="absolute left-4 top-4 rounded-lg bg-canvas/92 px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark backdrop-blur">{card.label}</span>
                  </div>
                  <div className="p-6">
                    <h2 className="font-display text-[1.9rem] font-semibold leading-none text-jade">{card.title}</h2>
                    <p className="mt-4 text-xs font-medium leading-6 text-charcoal/66">{card.description}</p>
                    <dl className="mt-5 space-y-3 border-t border-jade/10 pt-5 text-[11px] leading-5">
                      <div><dt className="font-extrabold text-jade">Goed voor</dt><dd className="text-charcoal/60">{card.bestFor}</dd></div>
                      <div><dt className="font-extrabold text-saffron-dark">Let op</dt><dd className="text-charcoal/60">{card.caution}</dd></div>
                    </dl>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-6 grid overflow-hidden rounded-2xl bg-jade text-white shadow-editorial-lift md:grid-cols-[0.4fr_1.6fr]">
              <div className="jade-pattern flex items-center px-7 py-6"><p className="font-display text-[1.8rem] font-semibold leading-none">{data.products.decisionTitle}</p></div>
              <p className="border-t border-white/10 px-7 py-6 text-sm font-medium leading-7 text-white/72 md:border-l md:border-t-0">{data.products.decisionText}</p>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-16 lg:py-24">
          <div className="container-custom">
            <div className="mb-16 lg:mb-24">
              <SectionHeading eyebrow={data.scenarios.eyebrow} title={data.scenarios.title} description={data.scenarios.description} />
              <div className="mt-8 grid gap-4 lg:grid-cols-2">
                {data.scenarios.items.map((scenario, index) => (
                  <article key={scenario.title} className={`relative overflow-hidden rounded-[24px] border p-7 shadow-editorial-card sm:p-8 ${index === 0 || index === 3 ? 'border-saffron/25 bg-tonal' : 'border-jade/10 bg-white'}`}>
                    <div className="flex items-start justify-between gap-5">
                      <div><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">{scenario.label}</p><h2 className="mt-2 font-display text-[2rem] font-semibold leading-none text-jade">{scenario.title}</h2></div>
                      <span className="font-display text-[2.7rem] font-semibold leading-none text-jade/12">0{index + 1}</span>
                    </div>
                    <p className="mt-5 text-xs font-medium leading-6 text-charcoal/66">{scenario.text}</p>
                    <ul className="mt-5 grid gap-2 border-t border-jade/10 pt-5 text-[10px] font-bold leading-5 text-jade/68 sm:grid-cols-3">
                      {scenario.steps.map((step) => <li key={step} className="flex items-start gap-2"><Check size={13} className="mt-0.5 shrink-0 text-saffron" />{step}</li>)}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
            <div id="prijzen" className="grid min-w-0 scroll-mt-24 gap-10 lg:grid-cols-[0.66fr_1.34fr]">
              <div className="min-w-0">
                <SectionHeading eyebrow={data.prices.eyebrow} title={data.prices.title} description={data.prices.description} />
                <aside className="mt-7 rounded-2xl border border-saffron/25 bg-tonal p-5">
                  <strong className="text-xs font-extrabold text-jade">{data.prices.howToReadTitle}</strong>
                  <p className="mt-2 text-[11px] font-medium leading-5 text-charcoal/62">{data.prices.howToRead}</p>
                </aside>
              </div>
              <div className="min-w-0">
                <div className="w-full max-w-full overflow-x-auto rounded-2xl border border-jade/10 bg-white shadow-editorial-card">
                  <table className="w-full min-w-[680px] border-collapse text-left">
                    <caption className="sr-only">Indicatieve prijzen voor producten bij 7-Eleven Thailand</caption>
                    <thead className="bg-jade text-[10px] font-extrabold uppercase tracking-[0.12em] text-white">
                      <tr><th scope="col" className="px-5 py-4">Product</th><th scope="col" className="px-5 py-4">Oriëntatie</th><th scope="col" className="px-5 py-4">Waarom het verschilt</th></tr>
                    </thead>
                    <tbody className="divide-y divide-jade/8">
                      {data.prices.rows.map((row, index) => (
                        <tr key={row.category} className={index % 2 ? 'bg-tonal/55' : 'bg-white'}>
                          <th scope="row" className="px-5 py-4 text-xs font-extrabold text-jade">{row.category}</th>
                          <td className="whitespace-nowrap px-5 py-4 font-display text-xl font-semibold text-saffron-dark">{row.range}</td>
                          <td className="px-5 py-4 text-[11px] font-medium leading-5 text-charcoal/58">{row.context}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-[10px] font-medium leading-5 text-charcoal/52">{data.prices.note}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="diensten" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-end">
              <SectionHeading eyebrow={data.services.eyebrow} title={data.services.title} description={data.services.description} />
              <div className="relative h-[320px] overflow-hidden rounded-[24px] shadow-editorial-lift sm:h-[390px]">
                <Image src={data.services.image} alt={data.services.imageAlt} fill sizes="(max-width: 1024px) 100vw, 62vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-jade/36 via-transparent to-transparent" />
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.services.cards.map((card) => {
                const Icon = iconMap[card.icon];
                return (
                  <article key={card.title} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                    <div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-jade/12 bg-canvas text-jade"><Icon size={20} strokeWidth={1.45} /></span><span className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-saffron-dark">{card.note}</span></div>
                    <h3 className="mt-5 font-display text-[1.65rem] font-semibold leading-none text-jade">{card.title}</h3>
                    <p className="mt-3 text-xs font-medium leading-6 text-charcoal/63">{card.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="regels" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="relative overflow-hidden rounded-[30px] bg-jade shadow-editorial-lift">
              <Image src={data.rules.image} alt={data.rules.imageAlt} fill sizes="100vw" className="object-cover object-center opacity-48" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,46,39,0.98)_0%,rgba(8,46,39,0.87)_52%,rgba(8,46,39,0.2)_100%)]" />
              <div className="relative z-10 max-w-[760px] p-8 text-white sm:p-11 lg:p-14">
                <p className="eyebrow !text-saffron-light">{data.rules.eyebrow}</p>
                <h2 className="font-display text-[3rem] font-semibold leading-[0.88] tracking-[-0.04em] sm:text-[4rem]">{data.rules.title}</h2>
                <p className="mt-5 max-w-[640px] text-sm font-medium leading-7 text-white/72">{data.rules.description}</p>
                <div className="mt-8 grid gap-3 md:grid-cols-3">
                  {data.rules.items.map((item, index) => (
                    <article key={item.title} className="rounded-2xl border border-white/14 bg-white/[0.075] p-5 backdrop-blur-sm">
                      <div className="flex items-center justify-between"><span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-light">{item.label}</span><span className="font-display text-2xl text-white/18">0{index + 1}</span></div>
                      <h3 className="mt-3 font-display text-[1.45rem] font-semibold leading-none">{item.title}</h3>
                      <p className="mt-3 text-[11px] font-medium leading-5 text-white/64">{item.text}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="meenemen" className="section-divider-bottom scroll-mt-24 bg-tonal/55 py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading eyebrow={data.pack.eyebrow} title={data.pack.title} description={data.pack.description} />
            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              <article className="relative overflow-hidden rounded-[26px] border border-jade/10 bg-white p-7 shadow-editorial-card sm:p-9">
                <div className="flex items-center justify-between"><p className="eyebrow">Na aankomst</p><span className="grid h-12 w-12 place-items-center rounded-full border border-saffron/30 bg-tonal text-jade"><ShoppingBasket size={22} /></span></div>
                <h3 className="font-display text-[2.45rem] font-semibold leading-none text-jade">{data.pack.localTitle}</h3>
                <div className="mt-7 space-y-5">
                  {data.pack.localItems.map((item) => (
                    <div key={item.title} className="grid grid-cols-[22px_1fr] gap-3 border-t border-jade/10 pt-4"><Check size={16} className="mt-0.5 text-saffron" /><div><strong className="text-xs font-extrabold text-jade">{item.title}</strong><p className="mt-1 text-[11px] font-medium leading-5 text-charcoal/58">{item.detail}</p></div></div>
                  ))}
                </div>
                <div className="pointer-events-none absolute -bottom-8 -right-10 h-36 w-52 opacity-55" aria-hidden="true"><div className="absolute left-0 top-4 h-20 w-[85%] rounded-[50%] border-b-2 border-dashed border-saffron/70" /><MapPin className="absolute right-3 top-20 text-saffron" size={28} /><span className="absolute left-12 top-[78px] h-2 w-2 rounded-full bg-saffron" /></div>
              </article>

              <article className="rounded-[26px] bg-jade p-7 text-white shadow-editorial-lift sm:p-9">
                <div className="flex items-center justify-between"><p className="eyebrow !text-saffron-light">Voor vertrek</p><span className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/[0.07] text-saffron-light"><Package size={22} /></span></div>
                <h3 className="font-display text-[2.45rem] font-semibold leading-none">{data.pack.amazonTitle}</h3>
                <p className="mt-4 text-xs font-medium leading-6 text-white/64">{data.pack.amazonDescription}</p>
                <AffiliateDisclosure className="mt-4 !text-white/55">Affiliate: bij een aankoop via deze Amazon-links ontvangen wij mogelijk commissie, zonder extra kosten voor jou. OneLink kan je doorsturen naar een lokale Amazon-winkel; aanbod en bestemming verschillen per land.</AffiliateDisclosure>
                <div className="mt-6 grid gap-3">
                  {data.pack.amazonProducts.map((product, index) => (
                    <a key={product.amazonSlug} href={`/go/${product.amazonSlug}/`} target="_blank" rel="noopener noreferrer nofollow sponsored" className="group grid grid-cols-[36px_1fr_36px] items-start gap-3 rounded-xl border border-white/13 bg-white/[0.065] p-4 transition hover:border-saffron/45 hover:bg-white/[0.1]">
                      <span className="grid h-9 w-9 place-items-center rounded-lg bg-saffron text-xs font-black text-white">0{index + 1}</span>
                      <span><strong className="block text-sm font-extrabold text-white">{product.title}</strong><span className="mt-1 block text-[10px] font-medium leading-5 text-white/58">{product.reason}</span></span>
                      <span className="grid h-9 w-9 place-items-center rounded-lg border border-saffron/35 text-saffron-light transition group-hover:bg-saffron group-hover:text-white"><ExternalLink size={14} /></span>
                    </a>
                  ))}
                </div>
                <Link href="/travel-gear/" className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-saffron-light">Bekijk de volledige Thailand-paklijst <ArrowRight size={14} /></Link>
              </article>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading eyebrow={data.tips.eyebrow} title={data.tips.title} />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {data.tips.cards.map((card) => {
                const Icon = iconMap[card.icon];
                return <article key={card.title} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><Icon size={26} strokeWidth={1.45} className="text-jade" /><h2 className="mt-5 font-display text-[1.55rem] font-semibold leading-none text-jade">{card.title}</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/62">{card.description}</p></article>;
              })}
            </div>
          </div>
        </section>

        <FaqSplitSection id="vragen" eyebrow="Echte zoekvragen" title="Veelgestelde vragen over 7-Eleven Thailand" description="De vragen zijn gebaseerd op actuele Nederlandse People Also Ask-resultaten. Antwoorden scheiden stabiele winkelinformatie van regels en diensten die kunnen veranderen." items={data.faqs} />

        <RelatedGuidesSection eyebrow="Verder voorbereiden" title="Van snelle stop naar slimme reis" guides={data.related} />

        <SourceMethodSection eyebrow="Controleerbare informatie" title="Bronnen & methode" description={`De owner is op ${data.updatedAt.split('-').reverse().join('-')} herbouwd na live DataForSEO-keyword-, SERP-, concurrent-, PAA-, ranking- en backlinkonderzoek. We gebruiken officiële bronnen voor winkelaantal, diensten, alcoholregels en telecom. Prijsbanden zijn redactionele oriëntatie en geen kassagarantie.`} sources={data.sources} />
      </div>
    </>
  );
}
