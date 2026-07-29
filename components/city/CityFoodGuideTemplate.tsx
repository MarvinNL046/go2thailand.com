import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  ChefHat,
  Clock3,
  Coffee,
  ExternalLink,
  Flame,
  Map,
  MapPin,
  MoonStar,
  ShieldCheck,
  ShoppingBasket,
  Soup,
  Store,
  Sun,
  UtensilsCrossed,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { CityFoodGuideData, CityFoodIcon } from '../../data/city-food/types';
import { KLOOK_GENERIC, withPlacementSubId } from '../../lib/affiliates';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';

const iconMap: Record<CityFoodIcon, LucideIcon> = {
  bowl: Soup,
  chef: ChefHat,
  clock: Clock3,
  coffee: Coffee,
  flame: Flame,
  market: Store,
  moon: MoonStar,
  restaurant: UtensilsCrossed,
  shield: ShieldCheck,
  shopping: ShoppingBasket,
  sun: Sun,
  utensils: UtensilsCrossed,
};

function buildSchemas(data: CityFoodGuideData) {
  const isNl = data.locale === 'nl';
  const localePrefix = isNl ? '/nl' : '';
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data.seo.title,
      description: data.seo.description,
      image: `https://go2-thailand.com${data.hero.image}`,
      dateModified: data.updatedAt,
      inLanguage: isNl ? 'nl-NL' : 'en-GB',
      mainEntityOfPage: data.pageUrl,
      author: { '@type': 'Organization', name: 'Go2Thailand' },
      publisher: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Thailand', item: `https://go2-thailand.com${localePrefix}/` },
        { '@type': 'ListItem', position: 2, name: data.city, item: `https://go2-thailand.com${localePrefix}/city/${data.slug}/` },
        { '@type': 'ListItem', position: 3, name: isNl ? `Eten in ${data.city}` : `${data.city} food`, item: data.pageUrl },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: data.faqs.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    },
  ];
}

export function CityFoodGuideTemplate({ data }: { data: CityFoodGuideData }) {
  const isNl = data.locale === 'nl';
  const localePrefix = isNl ? '/nl' : '';
  const internalHref = (href: string) => isNl && href.startsWith('/') && !href.startsWith('/nl/') && !href.startsWith('/go/') ? `/nl${href}` : href;
  const labels = isNl ? {
    navFormat: 'Kies je eetmoment', navDistricts: 'Eetwijken', navDishes: 'Wat ga je eten', navDay: 'Plan je fooddag', navPractical: 'Praktische checks', navFaq: 'Veelgestelde vragen',
    foodGuide: 'Eetgids', heroPrimary: 'Kies een eetwijk', heroSecondary: 'Bekijk wat je eet', onPage: `Op deze eetpagina over ${data.city}`,
    firstDecision: 'Eerste keuze', formatTitle: 'Welk eetmoment past nu?', tradeoff: 'Afweging:', bestTiming: 'Beste moment', routeLogic: 'Routelogica', openSpecialist: 'Open de specialistische gids',
    orderNote: 'Bestelcheck:', readDish: 'Lees de gerechtgids', limitsEyebrow: 'Handige grenzen', limitsTitle: 'Vier checks voordat je vertrekt', limitsDescription: 'Een drukke markt of beroemd gerecht vervangt nooit een controle van voedselbereiding, actuele details en je eigen dieetwensen.',
    medicalBoundary: 'Medische grens:', medicalText: 'deze pagina geeft algemene reisplanning en geen persoonlijk medisch advies. Ernstige of aanhoudende klachten, zwangerschap, immuunproblemen en zware allergieën vragen om passende professionele begeleiding.',
    experience: `Beleef ${data.city}`, guidedTitle: 'Foodroute met gids', guidedText: 'Vergelijk de precieze wijk, proeverijen, groepsgrootte, ontmoetingspunt, loopafstand en omgang met dieetwensen.', klook: 'Bekijk actuele opties bij Klook',
    technique: 'Haal de techniek in huis', amazon: 'Bekijk actuele prijs op Amazon', disclosure: 'Gesponsorde links. We kunnen zonder extra kosten voor jou commissie ontvangen. Amazon OneLink kan geschikte bezoekers naar een lokale winkel sturen; verkoper, product, prijs, voorraad en bezorging verschillen per land. Controleer alle actuele details voordat je boekt of koopt.',
    phrasesEyebrow: 'Bestellen zonder te veel te beloven', phrasesTitle: 'Wijs aan, vraag en bevestig', phrasesDescription: 'Een paar zinnen verminderen misverstanden. Ze verwijderen geen allergenen, kruiscontact of verschillen in hoe een verkoper pittigheid interpreteert.',
    faqEyebrow: 'Echte zoekvragen', faqDescription: 'Deze vragen zijn letterlijk verzameld uit actuele Nederlandse Google People Also Ask-resultaten. De antwoorden bewaken het verschil tussen brede eet-, restaurant- en marktintentie.',
    sourcesEyebrow: 'Bronnen & methode', sourcesTitle: 'Eerst onderzoeken, dan aanbevelen', relatedEyebrow: 'Houd de intentie helder', relatedTitle: 'Ga dieper zonder dezelfde lijst te herhalen',
  } : {
    navFormat: 'Choose a format', navDistricts: 'Food districts', navDishes: 'What to eat', navDay: 'Plan a food day', navPractical: 'Practical checks', navFaq: 'FAQs',
    foodGuide: 'Food guide', heroPrimary: 'Choose a food district', heroSecondary: 'See what to eat', onPage: `On this ${data.city} food page`,
    firstDecision: 'First decision', formatTitle: 'What kind of meal solves this moment?', tradeoff: 'Trade-off:', bestTiming: 'Best timing', routeLogic: 'Route logic', openSpecialist: 'Open the specialist guide',
    orderNote: 'Order note:', readDish: 'Read the dish guide', limitsEyebrow: 'Useful limits', limitsTitle: 'Four checks before you set out', limitsDescription: 'A busy market or famous dish never removes the need to check food handling, current details and your own dietary requirements.',
    medicalBoundary: 'Medical boundary:', medicalText: 'this page offers general travel planning, not individual medical advice. Severe or persistent symptoms, pregnancy, immune conditions and serious allergies require appropriate professional guidance.',
    experience: `Experience ${data.city}`, guidedTitle: 'Guided food route', guidedText: 'Compare the exact district, tastings, group size, meeting point, walking distance and dietary handling.', klook: 'Check current Klook options',
    technique: 'Bring the technique home', amazon: 'Check current price at Amazon', disclosure: 'Sponsored links. We may earn a commission at no extra cost to you. Amazon OneLink may route eligible visitors to a local store; seller, product, price, availability and delivery vary by country. Check all live details before booking or buying.',
    phrasesEyebrow: 'Ordering without overpromising', phrasesTitle: 'Point, ask and confirm', phrasesDescription: 'A few phrases reduce friction. They do not remove allergens, cross-contact or differences in how a vendor interprets spice.',
    faqEyebrow: 'Real search questions', faqDescription: 'These questions were captured verbatim from current UK-English Google People Also Ask results. Answers preserve the boundary between broad food, restaurant and market intent.',
    sourcesEyebrow: 'Sources & method', sourcesTitle: 'Research before recommendation', relatedEyebrow: 'Keep the intent clear', relatedTitle: 'Go deeper without repeating the same list',
  };
  const schemas = buildSchemas(data);
  const foodTourHref = withPlacementSubId(KLOOK_GENERIC, data.affiliate.klookSubId, 'food-tour');
  const navItems = [
    { href: '#format' as const, label: labels.navFormat, icon: Store },
    { href: '#districts' as const, label: labels.navDistricts, icon: Map },
    { href: '#dishes' as const, label: labels.navDishes, icon: UtensilsCrossed },
    { href: '#day' as const, label: labels.navDay, icon: Clock3 },
    { href: '#practical' as const, label: labels.navPractical, icon: ShieldCheck },
    { href: '#questions' as const, label: labels.navFaq, icon: BookOpen },
  ];

  return (
    <>
      <SEOHead
        title={data.seo.title}
        description={data.seo.description}
        ogImage={`https://go2-thailand.com${data.hero.image}`}
      >
        {schemas.map((schema, index) => (
          <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}
      </SEOHead>

      <div className="bg-canvas text-charcoal" data-premium-template={`city-food-guide-${isNl ? 'nl' : 'en'}`} data-owner={`${data.slug}-food`}>
        <EditorialHero
          image={data.hero.image}
          imageAlt={data.hero.imageAlt}
          breadcrumbs={[
            { label: 'Thailand', href: `${localePrefix}/` },
            { label: data.city, href: `${localePrefix}/city/${data.slug}/` },
            { label: labels.foodGuide },
          ]}
          eyebrow={data.hero.eyebrow}
          title={<>{data.hero.titleLead}<br /><span className="text-saffron-light">{data.hero.titleAccent}</span></>}
          subtitle={data.hero.subtitle}
          description={data.hero.description}
          actions={[
            { label: labels.heroPrimary, href: '#districts', kind: 'primary' },
            { label: labels.heroSecondary, href: '#dishes', kind: 'secondary' },
          ]}
          contentTone="light"
          minHeightClassName="min-h-[730px] lg:min-h-[710px]"
          contentClassName="max-w-[800px]"
          titleClassName="max-w-[800px] text-[3.65rem] leading-[0.85] sm:text-[5rem] lg:text-[5.8rem]"
          subtitleClassName="max-w-[650px] text-[1.25rem] leading-[1.08] sm:text-[1.65rem]"
          descriptionClassName="mt-4 max-w-[610px] text-sm leading-7"
          imageClassName="object-cover object-[62%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(3,37,31,0.12)_0%,rgba(3,37,31,0.66)_53%,rgba(3,37,31,0.98)_100%)] lg:bg-[linear-gradient(90deg,rgba(3,37,31,0.98)_0%,rgba(3,37,31,0.9)_44%,rgba(3,37,31,0.3)_72%,rgba(3,37,31,0.08)_100%)]"
          breadcrumbAriaLabel="Breadcrumb"
          sideCard={(
            <aside className="absolute bottom-9 right-[max(2rem,calc((100vw-1280px)/2))] z-10 hidden w-[315px] rounded-2xl border border-white/20 bg-jade/80 p-6 text-white shadow-editorial-card backdrop-blur-xl xl:block">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-light">{data.hero.sideEyebrow}</p>
              <strong className="mt-3 block font-display text-[2rem] font-semibold leading-[0.95]">{data.hero.sideTitle}</strong>
              <p className="mt-4 text-[11px] font-medium leading-5 text-white/66">{data.hero.sideDescription}</p>
            </aside>
          )}
        />

        <PageSectionNav label={labels.onPage} items={navItems} />

        <section id="format" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <SectionHeading eyebrow={labels.firstDecision} title={labels.formatTitle} description={data.copy.formatDescription} />
              <p className="max-w-[700px] text-sm font-medium leading-7 text-charcoal/68">{data.copy.formatIntro}</p>
            </div>
            <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {data.formats.map(({ title, label, fit, tradeoff, icon }, index) => {
                const Icon = iconMap[icon];
                const highlighted = index === 0;
                return (
                  <article key={title} className={`rounded-2xl border p-6 ${highlighted ? 'border-saffron/30 bg-jade text-white shadow-editorial-lift' : 'border-jade/10 bg-white shadow-editorial-card'}`}>
                    <span className={`grid h-11 w-11 place-items-center rounded-xl border ${highlighted ? 'border-white/18 bg-white/8 text-saffron-light' : 'border-jade/12 bg-tonal text-jade'}`}><Icon size={21} aria-hidden="true" /></span>
                    <p className={`mt-6 text-[9px] font-extrabold uppercase tracking-[0.15em] ${highlighted ? 'text-saffron-light' : 'text-saffron-dark'}`}>{label}</p>
                    <h2 className="mt-2 font-display text-[1.75rem] font-semibold leading-none">{title}</h2>
                    <p className={`mt-4 text-xs font-medium leading-6 ${highlighted ? 'text-white/72' : 'text-charcoal/68'}`}>{fit}</p>
                    <p className={`mt-4 border-t pt-4 text-[11px] font-medium leading-5 ${highlighted ? 'border-white/15 text-white/58' : 'border-jade/10 text-charcoal/54'}`}><strong className={highlighted ? 'text-white/82' : 'text-jade'}>{labels.tradeoff}</strong> {tradeoff}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="districts" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
          <div className="container-custom">
            <SectionHeading eyebrow={data.copy.districtEyebrow} title={data.copy.districtTitle} description={data.copy.districtDescription} />
            <div className="mt-9 grid gap-5 lg:grid-cols-2">
              {data.districts.map((district, index) => {
                const content = (
                  <>
                    <div className="relative min-h-[250px] overflow-hidden sm:min-h-[300px]">
                      <Image src={district.image} alt={district.imageAlt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition duration-500 group-hover:scale-[1.035]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-jade/82 via-jade/10 to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6 text-white">
                        <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">{district.signal}</p>
                        <h2 className="mt-2 font-display text-[2.25rem] font-semibold leading-none">{district.name}</h2>
                      </div>
                    </div>
                    <div className="p-6 sm:p-7">
                      <p className="text-sm font-medium leading-7 text-charcoal/68">{district.description}</p>
                      <div className="mt-5 grid gap-3 border-t border-jade/10 pt-5 sm:grid-cols-2">
                        <p className="text-[11px] leading-5 text-charcoal/58"><strong className="block text-[9px] uppercase tracking-[0.13em] text-saffron-dark">{labels.bestTiming}</strong>{district.timing}</p>
                        <p className="text-[11px] leading-5 text-charcoal/58"><strong className="block text-[9px] uppercase tracking-[0.13em] text-saffron-dark">{labels.routeLogic}</strong>{district.routeNote}</p>
                      </div>
                      {district.href ? <span className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-jade">{labels.openSpecialist} <ArrowRight size={14} aria-hidden="true" className="text-saffron-dark transition group-hover:translate-x-1" /></span> : null}
                    </div>
                  </>
                );
                const className = `group overflow-hidden rounded-2xl border bg-white shadow-editorial-card ${index === 0 ? 'border-saffron/28' : 'border-jade/10'}`;
                return district.href ? <Link key={district.name} href={internalHref(district.href)} className={className}>{content}</Link> : <article key={district.name} className={className}>{content}</article>;
              })}
            </div>
          </div>
        </section>

        <section id="dishes" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <SectionHeading eyebrow={data.copy.dishEyebrow} title={data.copy.dishTitle} description={data.copy.dishDescription} />
              <p className="max-w-[690px] text-sm font-medium leading-7 text-charcoal/68">{data.copy.dishIntro}</p>
            </div>
            <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {data.dishes.map((dish) => (
                <Link key={`${dish.href}-${dish.title}`} href={internalHref(dish.href)} className="group overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card">
                  <div className="relative h-52 overflow-hidden"><Image src={dish.image} alt={dish.imageAlt} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.035]" /></div>
                  <div className="p-6">
                    {dish.thai ? <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">{dish.thai}</p> : null}
                    <h2 className="mt-2 font-display text-[1.9rem] font-semibold leading-none text-jade">{dish.title}</h2>
                    <p className="mt-4 text-xs font-medium leading-6 text-charcoal/66">{dish.description}</p>
                    <p className="mt-4 border-t border-jade/10 pt-4 text-[11px] leading-5 text-charcoal/56"><strong className="text-jade">{labels.orderNote}</strong> {dish.orderNote}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-extrabold text-jade">{labels.readDish} <ArrowRight size={14} aria-hidden="true" className="text-saffron-dark transition group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="day" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom overflow-hidden rounded-[1.5rem] border border-jade/10 bg-white shadow-editorial-lift">
            <div className="grid lg:grid-cols-[0.88fr_1.12fr]">
              <div className="relative min-h-[350px] lg:min-h-full">
                <Image src={data.copy.dayImage} alt={data.copy.dayImageAlt} fill sizes="(max-width: 1024px) 100vw, 44vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-jade/85 via-jade/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white"><p className="eyebrow !text-saffron-light">{data.copy.dayEyebrow}</p><h2 className="max-w-lg font-display text-[3rem] font-semibold leading-[0.88]">{data.copy.dayTitle}</h2></div>
              </div>
              <div className="p-7 sm:p-10 lg:p-12">
                {data.dayPlan.map(({ time, title, description, icon }, index) => {
                  const Icon = iconMap[icon];
                  return (
                    <article key={time} className="relative grid grid-cols-[54px_1fr] gap-4 pb-8 last:pb-0">
                      {index < data.dayPlan.length - 1 ? <span aria-hidden="true" className="absolute left-[26px] top-11 h-[calc(100%-1rem)] border-l border-dashed border-saffron/65" /> : null}
                      <span className="relative z-10 grid h-[54px] w-[54px] place-items-center rounded-full border border-jade/12 bg-tonal text-jade"><Icon size={20} aria-hidden="true" /></span>
                      <div><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">{time}</p><h3 className="mt-1 font-display text-[1.6rem] font-semibold leading-none text-jade">{title}</h3><p className="mt-2 text-xs font-medium leading-6 text-charcoal/62">{description}</p></div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="practical" className="section-divider-bottom scroll-mt-24 bg-jade py-14 text-white lg:py-20">
          <div className="container-custom">
            <SectionHeading eyebrow={labels.limitsEyebrow} title={labels.limitsTitle} description={labels.limitsDescription} className="[&>.eyebrow]:!text-saffron-light [&_.heading-redesign]:text-white [&>div]:!text-white/68" />
            <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {data.practicalChecks.map(({ title, description, icon }, index) => {
                const Icon = iconMap[icon];
                const light = index === data.practicalChecks.length - 1;
                return <article key={title} className={`rounded-2xl border p-6 ${light ? 'border-saffron/35 bg-white text-jade' : 'border-white/16 bg-white/7'}`}><Icon size={23} aria-hidden="true" className={light ? 'text-saffron-dark' : 'text-saffron-light'} /><h2 className="mt-6 font-display text-[1.65rem] font-semibold leading-none">{title}</h2><p className={`mt-4 text-xs font-medium leading-6 ${light ? 'text-charcoal/68' : 'text-white/66'}`}>{description}</p></article>;
              })}
            </div>
            <p className="mt-6 max-w-4xl text-xs font-medium leading-6 text-white/64"><strong className="text-white">{labels.medicalBoundary}</strong> {labels.medicalText}</p>
          </div>
        </section>

        <section className="section-divider-bottom bg-tonal py-14 lg:py-20">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <SectionHeading eyebrow={data.copy.affiliateEyebrow} title={data.copy.affiliateTitle} description={data.copy.affiliateDescription} />
            <div className="grid gap-4 md:grid-cols-3">
              <article className="rounded-2xl border border-saffron/30 bg-jade p-6 text-white shadow-editorial-lift">
                <MapPin size={23} aria-hidden="true" className="text-saffron-light" />
                <p className="mt-6 text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">{labels.experience}</p>
                <h2 className="mt-2 font-display text-[1.75rem] font-semibold leading-none">{labels.guidedTitle}</h2>
                <p className="mt-4 text-xs font-medium leading-6 text-white/66">{labels.guidedText}</p>
                <a href={foodTourHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-saffron-light">{labels.klook} <ExternalLink size={13} aria-hidden="true" /></a>
              </article>
              {data.affiliate.products.map((product) => {
                const Icon = iconMap[product.icon];
                return (
                  <article key={product.amazonSlug} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                    <Icon size={23} aria-hidden="true" className="text-jade" />
                    <p className="mt-6 text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">{labels.technique}</p>
                    <h2 className="mt-2 font-display text-[1.75rem] font-semibold leading-none text-jade">{product.title}</h2>
                    <p className="mt-4 text-xs font-medium leading-6 text-charcoal/66">{product.description}</p>
                    <a href={`/go/${product.amazonSlug}/`} target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-jade">{labels.amazon} <ExternalLink size={13} aria-hidden="true" className="text-saffron-dark" /></a>
                  </article>
                );
              })}
            </div>
            <AffiliateDisclosure className="lg:col-start-2">{labels.disclosure}</AffiliateDisclosure>
          </div>
        </section>

        <section className="section-divider-bottom py-14 lg:py-20">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <SectionHeading eyebrow={labels.phrasesEyebrow} title={labels.phrasesTitle} description={labels.phrasesDescription} />
            <div className="grid gap-4 sm:grid-cols-2">
              {data.phrases.map(({ phrase, meaning, note }, index) => <article key={phrase} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="grid h-9 w-9 place-items-center rounded-full bg-tonal text-xs font-extrabold text-jade">0{index + 1}</span><h2 className="mt-5 font-display text-[1.75rem] font-semibold leading-none text-jade">{phrase}</h2><p className="mt-2 text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">{meaning}</p><p className="mt-3 text-xs font-medium leading-6 text-charcoal/62">{note}</p></article>)}
            </div>
          </div>
        </section>

        <FaqSplitSection id="questions" eyebrow={labels.faqEyebrow} title={data.copy.faqTitle} description={labels.faqDescription} items={data.faqs} />

        <SourceMethodSection eyebrow={labels.sourcesEyebrow} title={labels.sourcesTitle} description={data.researchSummary} sources={data.sources} />

        <RelatedGuidesSection eyebrow={labels.relatedEyebrow} title={labels.relatedTitle} guides={data.related.map(guide => ({ ...guide, href: internalHref(guide.href) }))} readLabel={labels.openSpecialist} />
      </div>
    </>
  );
}
