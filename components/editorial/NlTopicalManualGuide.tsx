import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Check,
  ExternalLink,
  HelpCircle,
  MapPinned,
  SearchCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { NlTopicalGuideData } from "../../data/editorial/nl-topical-manual";
import { KLOOK_GENERIC, withPlacementSubId } from "../../lib/affiliates";
import { useSubId } from "../../lib/useSubId";
import SEOHead from "../SEOHead";
import { AffiliateDisclosure } from "../design/AffiliateDisclosure";
import { EditorialHero } from "../design/EditorialHero";
import { FaqSplitSection } from "../design/FaqSplitSection";
import { PageSectionNav } from "../design/PageSectionNav";
import { RelatedGuidesSection } from "../design/RelatedGuidesSection";
import { SectionHeading } from "../design/SectionHeading";
import { SourceMethodSection } from "../design/SourceMethodSection";

const profileIcons = [MapPinned, BookOpenCheck, SearchCheck, ShieldCheck];

export default function NlTopicalManualGuide({ data }: { data: NlTopicalGuideData }) {
  const subId = useSubId();
  const affiliateHref = data.affiliate
    ? withPlacementSubId(KLOOK_GENERIC, subId, data.affiliate.placement)
    : null;
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: data.title,
      description: data.metaDescription,
      image: `https://go2-thailand.com${data.heroImage}`,
      url: data.pageUrl,
      inLanguage: "nl-NL",
      dateModified: "2026-07-31",
      author: { "@type": "Organization", name: "GO2 Thailand" },
      publisher: { "@type": "Organization", name: "GO2 Thailand" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: data.faqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Thailand", item: "https://go2-thailand.com/nl/" },
        { "@type": "ListItem", position: 2, name: data.title, item: data.pageUrl },
      ],
    },
  ];

  return (
    <>
      <SEOHead title={data.title} description={data.metaDescription} ogImage={`https://go2-thailand.com${data.heroImage}`}>
        {schemas.map((schema, index) => (
          <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}
      </SEOHead>

      <div data-premium-template={`nl-topical-${data.slug}`} className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          image={data.heroImage}
          imageAlt={data.heroAlt}
          breadcrumbs={[{ label: "Thailand", href: "/" }, { label: data.title }]}
          eyebrow={data.eyebrow}
          title={<>{data.heroTitle}<br /><span className="text-saffron-light">{data.heroAccent}</span></>}
          description={data.heroDescription}
          actions={[
            { label: "Start met kiezen", href: "#kiezen", kind: "primary" },
            { label: "Open de vijf checks", href: "#checks", kind: "secondary" },
          ]}
          contentTone="light"
          gradientClassName="bg-[linear-gradient(90deg,rgba(3,29,29,0.97)_0%,rgba(3,29,29,0.9)_45%,rgba(3,29,29,0.22)_72%,rgba(3,29,29,0.03)_100%)]"
          imageClassName="object-cover object-center"
          titleClassName="max-w-[820px] text-[3.8rem] leading-[0.86] !text-white sm:text-[4.8rem] lg:text-[5.5rem]"
          descriptionClassName="mt-5 max-w-[640px] text-sm leading-7 !text-white/78"
        />

        <PageSectionNav items={[
          { href: "#kiezen", label: "Kiezen", icon: MapPinned },
          { href: "#checks", label: "Vijf checks", icon: SearchCheck },
          { href: "#grens", label: "De grens", icon: ShieldCheck },
          { href: "#vragen", label: "Vragen", icon: HelpCircle },
        ]} />

        <section className="section-divider-bottom bg-jade py-5 text-white">
          <div className="container-custom grid gap-3 sm:grid-cols-3">
            {[
              { label: "Eerst", value: "Je eigen reisfit", icon: MapPinned },
              { label: "Daarna", value: "Actuele details", icon: SearchCheck },
              { label: "Altijd", value: "Een geloofwaardige grens", icon: ShieldCheck },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex min-h-20 items-center gap-4 rounded-xl border border-white/12 bg-white/7 px-5 py-4">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-saffron text-jade"><Icon size={19} /></span>
                <span><span className="block text-[9px] font-extrabold uppercase tracking-[.15em] text-white/55">{label}</span><strong className="font-display text-xl">{value}</strong></span>
              </div>
            ))}
          </div>
        </section>

        <section id="kiezen" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom">
            <SectionHeading eyebrow="Geen universele nummer één" title={data.decisionTitle} description={data.decisionDescription} />
            <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {data.profiles.map((profile, index) => {
                const Icon = profileIcons[index] || BadgeCheck;
                return (
                  <article key={profile.title} className="flex min-h-[375px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                    <div className="flex items-start justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/25 bg-saffron/8 text-jade"><Icon size={21} /></span>
                      <span className="font-display text-4xl text-jade/12">0{index + 1}</span>
                    </div>
                    <p className="mt-7 text-[9px] font-extrabold uppercase tracking-[.15em] text-saffron-dark">{profile.label}</p>
                    <h2 className="mt-2 font-display text-[1.7rem] font-semibold leading-none text-jade">{profile.title}</h2>
                    <p className="mt-4 text-xs font-medium leading-6 text-charcoal/68">{profile.copy}</p>
                    <p className="mt-auto border-t border-jade/10 pt-4 text-[10px] font-semibold leading-5 text-charcoal/50">Controleer: {profile.verify}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="checks" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
          <div className="container-custom grid gap-10 lg:grid-cols-[.66fr_1.34fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading eyebrow="Van inspiratie naar besluit" title={data.checkTitle} description={data.checkDescription} />
              <p className="mt-7 rounded-2xl border border-saffron/25 bg-white p-5 text-xs font-medium leading-6 text-charcoal/66">
                Controleer veranderlijke informatie vlak voor betalen en opnieuw vlak voor vertrek. Een broncheck uit juli 2026 is methodebewijs, geen garantie voor jouw datum.
              </p>
            </div>
            <ol className="grid gap-4 sm:grid-cols-2">
              {data.steps.map((step, index) => (
                <li key={step.title} className={`min-h-[235px] rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card ${index === 4 ? "sm:col-span-2" : ""}`}>
                  <div className="flex items-start justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-jade text-saffron"><Check size={19} /></span>
                    <span className="text-[10px] font-extrabold tracking-[.15em] text-saffron-dark">CHECK 0{index + 1}</span>
                  </div>
                  <h3 className="mt-7 font-display text-[1.65rem] font-semibold leading-none text-jade">{step.title}</h3>
                  <p className="mt-4 max-w-2xl text-xs font-medium leading-6 text-charcoal/67">{step.copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="grens" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom">
            <div className="grid overflow-hidden rounded-[1.7rem] bg-jade text-white shadow-editorial-card lg:grid-cols-[1.05fr_.95fr]">
              <div className="relative min-h-[390px]">
                <Image src={data.related[0]?.image || data.heroImage} alt="Visuele context bij de redactionele keuzecheck" fill sizes="(max-width:1024px) 100vw, 52vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-jade/35 to-transparent" />
              </div>
              <div className="flex flex-col justify-center p-7 lg:p-10">
                <p className="eyebrow !text-saffron-light">Waar deze gids stopt</p>
                <h2 className="font-display text-[3rem] font-semibold leading-[.9] tracking-[-.04em]">{data.boundaryTitle}</h2>
                <p className="mt-6 text-sm font-medium leading-7 text-white/72">{data.boundaryCopy}</p>
                {affiliateHref && data.affiliate ? (
                  <>
                    <a href={affiliateHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-cream mt-7 min-h-12 w-fit px-6 text-saffron-dark">
                      {data.affiliate.label} <ExternalLink size={15} />
                    </a>
                    <AffiliateDisclosure className="mt-4 !text-white/52">{data.affiliate.disclosure}</AffiliateDisclosure>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        {data.amazon?.length ? (
          <section className="section-divider-bottom bg-tonal py-14 lg:py-20">
            <div className="container-custom grid gap-9 lg:grid-cols-[.65fr_1.35fr]">
              <div>
                <p className="eyebrow">Alleen na de ervaring</p>
                <h2 className="font-display text-[3.1rem] font-semibold leading-[.9] text-jade">Thuis verder.<br />Niet zwaarder reizen.</h2>
                <p className="mt-5 text-sm font-medium leading-7 text-charcoal/65">Deze producten lossen geen reis- of veiligheidskeuze op. Ze passen alleen wanneer je na thuiskomst verder wilt oefenen.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {data.amazon.map((product) => (
                  <article key={product.slug} className="flex min-h-[260px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                    <Sparkles className="text-jade" />
                    <h3 className="mt-6 font-display text-[1.6rem] font-semibold text-jade">{product.title}</h3>
                    <p className="mt-4 flex-1 text-xs font-medium leading-6 text-charcoal/62">{product.copy}</p>
                    <a href={`/go/${product.slug}/`} target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-6 inline-flex items-center gap-2 text-[10px] font-extrabold text-saffron-dark">Bekijk actuele prijs bij Amazon <ExternalLink size={12} /></a>
                  </article>
                ))}
              </div>
              <AffiliateDisclosure className="lg:col-start-2">Als Amazon-partner verdienen wij aan in aanmerking komende aankopen, zonder extra kosten voor jou. OneLink kan naar een lokale Amazon-winkel sturen; product, prijs, verkoper en beschikbaarheid verschillen.</AffiliateDisclosure>
            </div>
          </section>
        ) : null}

        <div id="vragen">
          <FaqSplitSection eyebrow="Onderbouwde reisvragen" title={`Veelgestelde vragen over ${data.title.toLowerCase()}`} description="Antwoorden zonder onbewezen prijs-, beschikbaarheids- of beste-keuzegarantie." items={data.faqs} />
        </div>

        <RelatedGuidesSection title="Maak de rest van je reis ook logisch" guides={data.related} />

        <SourceMethodSection
          title="Bronnen geven grenzen, geen ranglijst"
          description="Deze Nederlandse owner is op 31 juli 2026 redactioneel herbouwd met primaire en gezaghebbende bronnen. DataForSEO was uitgeput; daarom claimen we geen zoekvolume, ranking of People Also Ask-validatie. Veranderlijke details blijven een live check bij de officiële bron of aanbieder."
          method="De pagina scheidt stabiele keuzeprincipes van veranderlijke prijzen, opening, programma's en voorwaarden. Affiliatelinks staan pas na gratis beslisinformatie en zijn zichtbaar toegelicht."
          sources={data.sources}
        />

        <section className="section-divider-bottom py-10">
          <div className="container-custom flex flex-col justify-between gap-4 rounded-2xl border border-jade/10 bg-white p-6 sm:flex-row sm:items-center">
            <div><p className="text-[9px] font-extrabold uppercase tracking-[.15em] text-saffron-dark">Verder plannen</p><p className="mt-1 text-sm font-semibold text-jade">Kies eerst de route, dan het betaalde product.</p></div>
            <Link href="/things-to-do-in-thailand/" className="inline-flex items-center gap-2 text-xs font-extrabold text-jade">Bekijk wat te doen in Thailand <ArrowRight size={14} className="text-saffron" /></Link>
          </div>
        </section>
      </div>
    </>
  );
}
