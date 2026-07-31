import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  CircleHelp,
  Clock3,
  ExternalLink,
  Eye,
  GlassWater,
  Hotel,
  MapPin,
  MapPinned,
  Navigation,
  ReceiptText,
  Route,
  ShieldCheck,
  Sparkles,
  Ticket,
  Users,
  Zap,
} from "lucide-react";
import type { NlCityNightlifeGuide } from "../../data/nightlife/nl-city-guides";
import { KLOOK_GENERIC, withPlacementSubId } from "../../lib/affiliates";
import { useSubId } from "../../lib/useSubId";
import SEOHead from "../SEOHead";
import { AffiliateDisclosure } from "../design/AffiliateDisclosure";
import { EditorialHero } from "../design/EditorialHero";
import { FaqSplitSection } from "../design/FaqSplitSection";
import { PageSectionNav, type PageSectionNavItem } from "../design/PageSectionNav";
import { RelatedGuidesSection } from "../design/RelatedGuidesSection";
import { SectionHeading } from "../design/SectionHeading";
import { SourceMethodSection } from "../design/SourceMethodSection";

const sectionNav: PageSectionNavItem[] = [
  { href: "#kiezen", label: "Kiezen", icon: Sparkles },
  { href: "#zones", label: "Zones", icon: MapPinned },
  { href: "#route", label: "Avondroute", icon: Route },
  { href: "#check", label: "Actueel checken", icon: BadgeCheck },
  { href: "#veilig", label: "Veilig terug", icon: ShieldCheck },
  { href: "#vragen", label: "Vragen", icon: CircleHelp },
];

const zoneIcons = [MapPin, GlassWater, Ticket, Users, Eye];
const checkIcons = [CalendarClock, Navigation, BadgeCheck, Clock3];
const safetyIcons = [GlassWater, Navigation, ReceiptText, ShieldCheck];

function createSchemas(guide: NlCityNightlifeGuide) {
  const pageUrl = `https://go2-thailand.com/nl/nightlife/${guide.slug}/`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${pageUrl}#article`,
      headline: guide.title,
      description: guide.description,
      image: `https://go2-thailand.com${guide.heroImage}`,
      dateModified: "2026-07-31",
      inLanguage: "nl-NL",
      mainEntityOfPage: pageUrl,
      author: { "@type": "Organization", name: "Go2Thailand", url: "https://go2-thailand.com/" },
      publisher: { "@type": "Organization", name: "Go2Thailand", url: "https://go2-thailand.com/" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: guide.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Thailand", item: "https://go2-thailand.com/nl/" },
        { "@type": "ListItem", position: 2, name: "Nachtleven", item: "https://go2-thailand.com/nl/nightlife/" },
        { "@type": "ListItem", position: 3, name: guide.city, item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: `Zo plan je een avond uit in ${guide.city}`,
      step: guide.route.map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: step.title,
        text: step.text,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `Uitgaanszones in ${guide.city}`,
      itemListElement: guide.zones.map((zone, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: zone.name,
        description: zone.fit,
      })),
    },
  ];
}

function InlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="font-extrabold text-jade underline decoration-saffron/45 underline-offset-4 transition hover:text-saffron-dark">
      {children}
    </Link>
  );
}

export function CityNightlifeGuideNl({ guide }: { guide: NlCityNightlifeGuide }) {
  const subId = useSubId();
  const klookHref = withPlacementSubId(KLOOK_GENERIC, subId, guide.klookPlacement);
  const schemas = createSchemas(guide);

  return (
    <>
      <SEOHead title={guide.title} description={guide.description} ogImage={`https://go2-thailand.com${guide.heroImage}`}>
        <meta property="og:type" content="article" />
        <meta property="article:modified_time" content="2026-07-31" />
        {schemas.map((schema, index) => (
          <script key={`${schema["@type"]}-${index}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}
      </SEOHead>

      <div className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          eyebrow={guide.eyebrow}
          title={guide.heroTitle}
          subtitle={guide.heroSubtitle}
          description={guide.heroDescription}
          image={guide.heroImage}
          imageAlt={guide.heroAlt}
          breadcrumbs={[{ label: "Thailand", href: "/" }, { label: "Nachtleven", href: "/nightlife/" }, { label: guide.city }]}
          actions={[{ label: "Vergelijk zones", href: "#zones", kind: "primary" }, { label: "Plan je avond", href: "#route", kind: "secondary" }]}
          minHeightClassName="min-h-[850px] lg:min-h-[710px]"
          contentClassName="max-w-[760px]"
          titleClassName="max-w-[790px] text-[3.5rem] leading-[0.88] sm:text-[4.75rem] lg:text-[5.5rem]"
          subtitleClassName="max-w-[680px] text-[1.35rem] leading-[1.08] sm:text-[1.8rem]"
          imageClassName="object-cover object-[68%_center]"
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.95)_0%,rgba(252,250,246,0.85)_55%,rgba(252,250,246,0.98)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.99)_0%,rgba(252,250,246,0.92)_42%,rgba(3,31,27,0.14)_76%,rgba(3,31,27,0.36)_100%)]"
        />

        <PageSectionNav label={`Inhoud van nachtleven ${guide.city}`} items={sectionNav} />

        <section id="kiezen" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <SectionHeading eyebrow="Eerst de juiste vraag" title="Niet: welke club is de beste? Wel: welke avond past?" description={guide.primaryIntent} />
            <div className="rounded-[28px] border border-jade/10 bg-white p-7 shadow-editorial-lift sm:p-9">
              <p className="text-base font-semibold leading-8 text-charcoal/72">{guide.intro}</p>
              <div className="mt-7 border-l-2 border-dashed border-saffron/55 pl-6">
                <p className="text-xs font-extrabold uppercase tracking-[0.13em] text-saffron-dark">De belangrijkste afweging</p>
                <p className="mt-3 text-sm font-medium leading-7 text-charcoal/66">{guide.decision}</p>
              </div>
              <p className="mt-7 text-sm font-medium leading-7 text-charcoal/64">
                De landelijke vergelijking staat in <InlineLink href="/nightlife/">nachtleven in Thailand</InlineLink>. Deze pagina bezit alleen de keuze binnen {guide.city}; eten, hotels en de volledige bestemming blijven afzonderlijke gidsen.
              </p>
            </div>
          </div>
        </section>

        <section id="zones" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading eyebrow="Kies op sfeer én terugweg" title={`${guide.city}: ${guide.zones.length} avondzones vergeleken`} description="Geen ranglijst van vluchtige venues, maar een keuze op avondtype, route en praktische keerzijde." />
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {guide.zones.map((zone, index) => {
                const Icon = zoneIcons[index % zoneIcons.length];
                return (
                  <article key={zone.name} className="group flex min-h-[390px] flex-col rounded-[26px] border border-jade/10 bg-white p-7 shadow-editorial-card transition hover:-translate-y-1 hover:shadow-editorial-lift">
                    <div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-jade/[0.06] text-jade"><Icon size={20} /></span><span className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{zone.label}</span></div>
                    <h2 className="mt-8 font-display text-[2rem] font-semibold leading-none text-jade">{zone.name}</h2>
                    <p className="mt-5 text-xs font-medium leading-6 text-charcoal/67">{zone.fit}</p>
                    <div className="mt-6 border-t border-jade/10 pt-5"><p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-jade/55">Zo plan je het</p><p className="mt-2 text-[11px] font-medium leading-5 text-charcoal/60">{zone.plan}</p></div>
                    <div className="mt-auto pt-5"><p className="rounded-xl bg-saffron/[0.07] p-4 text-[11px] font-medium leading-5 text-charcoal/65"><strong className="text-jade">Keerzijde:</strong> {zone.tradeoff}</p></div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="route" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.68fr_1.32fr]">
            <SectionHeading eyebrow="Eén avond, één hoofdlijn" title="Bouw rust in vóór de drukte begint." description="Een sterke avond heeft één zone, één hoofdactiviteit, een beslismoment en een terugroute die al offline op je telefoon staat." />
            <div className="relative pt-2">
              <div className="absolute left-6 top-8 h-[calc(100%-4rem)] border-l-2 border-dashed border-saffron/55 lg:left-0 lg:right-0 lg:top-10 lg:h-0 lg:border-l-0 lg:border-t-2" />
              <div className="grid gap-4 lg:grid-cols-4">
                {guide.route.map((step, index) => (
                  <article key={step.title} className="relative ml-12 rounded-2xl border border-jade/10 bg-white p-5 shadow-editorial-card lg:ml-0 lg:mt-7">
                    <span className="absolute -left-[2.55rem] top-6 grid h-7 w-7 place-items-center rounded-full border-4 border-canvas bg-saffron text-[9px] font-black text-white lg:-top-[2.55rem] lg:left-5">{index + 1}</span>
                    <Clock3 size={20} className="text-jade" /><p className="mt-4 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{step.time}</p><h3 className="mt-2 font-display text-[1.45rem] font-semibold leading-none text-jade">{step.title}</h3><p className="mt-3 text-[11px] font-medium leading-5 text-charcoal/62">{step.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="check" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading eyebrow="Controleer op de bezoekdag" title="Een oude lijst is geen actuele avond." description="Prijs, toegang, marktdag, vergunning, event en vervoer kunnen veranderen. Gebruik deze checks voordat je betaalt of vertrekt." />
            <div className="mt-10 grid gap-px overflow-hidden rounded-[28px] border border-jade/10 bg-jade/10 md:grid-cols-4">
              {guide.checks.map((check, index) => { const Icon = checkIcons[index % checkIcons.length]; return <article key={check.title} className="bg-white p-7"><Icon size={22} className="text-saffron-dark" /><h3 className="mt-7 font-display text-[1.65rem] font-semibold leading-none text-jade">{check.title}</h3><p className="mt-4 text-[11px] font-medium leading-5 text-charcoal/62">{check.text}</p></article>; })}
            </div>
            <div className="mt-10 overflow-hidden rounded-[28px] bg-jade text-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                <div className="p-8 sm:p-11"><p className="eyebrow !text-saffron-light">Actuele prijs in plaats van een oude claim</p><h2 className="font-display text-[3rem] font-semibold leading-[0.9]">Vergelijk alleen een avondactiviteit die bij je gekozen zone past.</h2><p className="mt-5 text-sm font-medium leading-7 text-white/64">Klook toont het actuele aanbod. Controleer aanbieder, locatie, datum, start- en eindtijd, leeftijd, transfer, inclusies en annulering opnieuw vóór betaling.</p><a href={klookHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-cream mt-7">Bekijk actuele avondactiviteiten <ExternalLink size={15} /></a><AffiliateDisclosure className="mt-4 !text-white/54">Klook-affiliatelink. Wij kunnen commissie ontvangen, zonder extra kosten voor jou. Beschikbaarheid en prijs worden door de aanbieder bepaald.</AffiliateDisclosure></div>
                <div className="relative min-h-[390px]"><Image src={guide.heroImage} alt="Sfeerbeeld bij de keuze voor een avondactiviteit" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-jade/60 to-transparent" /></div>
              </div>
            </div>
          </div>
        </section>

        <section id="veilig" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div><SectionHeading eyebrow="Veiligheid zonder schijnzekerheid" title="Vier afspraken vóór de eerste bestelling." description="Geen wijk is automatisch veilig of onveilig. Je eigen keuzes, actuele omstandigheden en een bekende terugroute maken het verschil." /><div className="mt-8 rounded-2xl border border-saffron/25 bg-saffron/[0.07] p-6"><Zap size={22} className="text-saffron-dark" /><p className="mt-4 text-sm font-extrabold text-jade">Bewaar hotelkaart, ophaalpunt en 1155 offline.</p><p className="mt-2 text-xs font-medium leading-6 text-charcoal/64">Rijd niet zelf na alcohol en zwem niet onder invloed. Bij direct gevaar bel je 191.</p></div></div>
            <div className="grid gap-4 sm:grid-cols-2">
              {guide.safety.map((item, index) => { const Icon = safetyIcons[index % safetyIcons.length]; return <article key={item.title} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><Icon size={21} className="text-jade" /><h3 className="mt-5 font-display text-[1.55rem] font-semibold text-jade">{item.title}</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/63">{item.text}</p></article>; })}
            </div>
          </div>
          <div className="container-custom mt-12 grid gap-5 lg:grid-cols-3">
            {[{ icon: MapPinned, label: guide.cityLinkLabel, href: guide.cityLink }, { icon: Hotel, label: guide.stayLinkLabel, href: guide.stayLink }, { icon: ReceiptText, label: guide.foodLinkLabel, href: guide.foodLink }].map(({ icon: Icon, label, href }) => <Link key={href} href={href} className="group flex items-center justify-between rounded-2xl border border-jade/10 bg-tonal p-6 transition hover:border-saffron/45"><span className="flex items-center gap-4"><Icon size={21} className="text-jade" /><span className="font-display text-xl font-semibold text-jade">{label}</span></span><ArrowRight size={17} className="text-saffron-dark transition group-hover:translate-x-1" /></Link>)}
          </div>
        </section>

        <FaqSplitSection id="vragen" eyebrow="Veelgestelde zoekvragen" title={`Vragen over nachtleven in ${guide.city}`} description="Praktische antwoorden zonder vaste prijs-, sluitingstijd- of veiligheidsclaims. Controleer tijdgevoelige details opnieuw voor je bezoek." items={guide.faqs} />
        <RelatedGuidesSection eyebrow="Maak de rest van de reis sterker" title={`${guide.city} overdag en na je laatste avond`} guides={guide.related} />
        <SourceMethodSection title="Actuele regels boven vluchtige clubranglijsten" description={`Deze Nederlandse owner scheidt de avondintentie van de algemene ${guide.city}-gids, food-owner en hotelowner. Primaire TAT-, Tourist Police- en NederlandWereldwijd-bronnen dragen regels en veiligheidsgrenzen. Venue-, markt-, event-, vervoer- en prijsdetails blijven controlepunten voor de bezoekdag; vaste prijzen, universele sluitingstijden, absolute veiligheidslabels en onbewezen persoonlijke ervaring zijn uitgesloten. Laatst redactioneel gecontroleerd: 31 juli 2026.`} sources={guide.sources} />
      </div>
    </>
  );
}
