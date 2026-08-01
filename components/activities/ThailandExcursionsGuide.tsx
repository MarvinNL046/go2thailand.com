import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  CalendarCheck,
  Check,
  ClipboardCheck,
  Compass,
  ExternalLink,
  HeartHandshake,
  MapPinned,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  TicketCheck,
  Users,
  Waves,
} from 'lucide-react';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';
import { thailandExcursionsNl as content } from '../../data/activities/nl';
import { cityAffiliates, KLOOK_GENERIC, withSubId } from '../../lib/affiliates';

const categoryIcons = [Waves, Sparkles, MapPinned, HeartHandshake];

const sectionNav = [
  { href: '#kiezen' as const, label: 'Kiezen', icon: Compass },
  { href: '#ervaringen' as const, label: 'Ervaringen', icon: Sparkles },
  { href: '#bestemmingen' as const, label: 'Bestemmingen', icon: MapPinned },
  { href: '#vergelijken' as const, label: 'Vergelijken', icon: SearchCheck },
  { href: '#boeken' as const, label: 'Veilig boeken', icon: ShieldCheck },
  { href: '#vragen' as const, label: 'Vragen', icon: TicketCheck },
];

export default function ThailandExcursionsGuide() {
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
    '@id': 'https://go2-thailand.com/nl/activities/#ervaringen',
    name: 'Soorten excursies in Thailand',
    itemListElement: content.categories.map((category, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: category.title,
      url: `https://go2-thailand.com/nl${category.href}`,
    })),
  };
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: content.seo.title,
    description: content.seo.description,
    url: 'https://go2-thailand.com/nl/activities/',
    inLanguage: 'nl-NL',
    dateModified: '2026-07-26',
    mainEntity: { '@id': 'https://go2-thailand.com/nl/activities/#ervaringen' },
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://go2-thailand.com/nl/' },
      { '@type': 'ListItem', position: 2, name: 'Excursies', item: 'https://go2-thailand.com/nl/activities/' },
    ],
  };

  return (
    <>
      <SEOHead title={content.seo.title} description={content.seo.description} ogImage="https://go2-thailand.com/images/blog/best-day-trips-from-bangkok.webp">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </SEOHead>

      <div className="bg-canvas text-charcoal">
        <EditorialHero
          image="/images/blog/best-day-trips-from-bangkok.webp"
          imageAlt="Rivier, tempels en skyline van Bangkok bij zonsondergang"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Excursies' }]}
          eyebrow={content.hero.eyebrow}
          title={<>{content.hero.title}{' '}<span className="block text-saffron-dark">{content.hero.accent}</span></>}
          description={content.hero.intro}
          actions={[
            { label: 'Vind jouw ervaring', href: '#kiezen', kind: 'primary' },
            { label: 'Bekijk op Klook', href: withSubId(KLOOK_GENERIC, 'activities-nl-hero'), kind: 'secondary', affiliate: true, newTab: true, ariaLabel: 'Bekijk excursies in Thailand op Klook' },
          ]}
          disclosure="Affiliate-link: boek je via Klook, dan ontvangen wij mogelijk commissie zonder extra kosten voor jou. Onze selectie en uitleg blijven onafhankelijk."
          minHeightClassName="min-h-[690px] lg:min-h-[680px]"
          titleClassName="max-w-[650px] text-[4.4rem] leading-[0.83] sm:text-[5.5rem] lg:text-[6.2rem]"
          imageClassName="object-cover object-[62%_center] lg:object-center"
          sideCard={(
            <div className="absolute bottom-7 right-[max(2rem,calc((100vw-1280px)/2))] z-10 hidden w-[285px] rounded-2xl border border-white/45 bg-white/82 p-5 shadow-editorial-card backdrop-blur-lg xl:block">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-dark">Een sterke tour toont vooraf</p>
              <ul className="mt-3 space-y-2.5 text-xs font-bold text-jade">
                {['Wat echt inbegrepen is', 'Wie de activiteit uitvoert', 'Waar en wanneer je start'].map((item) => <li key={item} className="flex items-center gap-2"><Check size={14} className="text-saffron" />{item}</li>)}
              </ul>
            </div>
          )}
        />

        <PageSectionNav items={sectionNav} />

        <section id="kiezen" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <SectionHeading eyebrow="Eerst slim kiezen" title={<>Niet elke top-tour<br />is jouw beste dag.</>} description="Begin bij het gevoel dat je zoekt, kijk daarna naar de route en controleer pas als laatste de aanbieder. Zo laat je de populairste excursie los wanneer die niet bij jouw tempo past." />
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { number: '01', title: 'Kies je moment', text: 'Cultuur, eten, natuur of actief: één duidelijke hoofdreden.' },
                  { number: '02', title: 'Check de logistiek', text: 'Vertrekpunt, reistijd en groepsgrootte bepalen je echte dag.' },
                  { number: '03', title: 'Vergelijk de details', text: 'Inbegrepen kosten, voorwaarden en uitvoerende aanbieder.' },
                ].map((step) => <article key={step.number} className="rounded-2xl border border-jade/10 bg-white p-5 shadow-editorial-card"><span className="font-display text-3xl font-semibold text-saffron-dark">{step.number}</span><h2 className="mt-3 font-display text-2xl font-semibold leading-none text-jade">{step.title}</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/60">{step.text}</p></article>)}
              </div>
            </div>
          </div>
        </section>

        <section id="ervaringen" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading eyebrow="Kies op reisstijl" title="Vier ervaringen die Thailand anders laten voelen." description="Elke categorie vraagt om een andere afweging. Daarom vergelijken we niet alleen wat mooi klinkt, maar ook wanneer een tour waarde toevoegt en welke details je vooraf wilt zien." />
            <div className="mt-11 grid gap-6 md:grid-cols-2">
              {content.categories.map((category, index) => {
                const Icon = categoryIcons[index];
                return (
                  <article key={category.id} className="group overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card lg:grid lg:grid-cols-[0.92fr_1.08fr]">
                    <Link href={category.href} className="relative block min-h-[280px] overflow-hidden" aria-label={`Lees meer over ${category.title}`}>
                      <Image src={category.image} alt={category.imageAlt} fill sizes="(max-width: 768px) 100vw, 27vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-jade/60 via-transparent to-transparent" />
                      <span className="absolute left-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-jade shadow-sm"><Icon size={18} /></span>
                    </Link>
                    <div className="flex flex-col p-6 lg:p-7">
                      <p className="eyebrow">{category.eyebrow}</p>
                      <h2 className="font-display text-[2.3rem] font-semibold leading-[0.95] text-jade">{category.title}</h2>
                      <p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">{category.description}</p>
                      <dl className="mt-5 space-y-3 border-t border-jade/10 pt-5 text-[11px]">
                        <div><dt className="font-extrabold text-jade">Sterk vanuit</dt><dd className="mt-1 text-charcoal/58">{category.bestFor}</dd></div>
                        <div><dt className="font-extrabold text-jade">Controleer</dt><dd className="mt-1 text-charcoal/58">{category.check}</dd></div>
                      </dl>
                      <Link href={category.href} className="mt-6 inline-flex items-center gap-2 self-start text-xs font-extrabold text-jade">Lees de keuzehulp <ArrowRight size={14} className="text-saffron transition group-hover:translate-x-1" /></Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="bestemmingen" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading eyebrow="Kies je vertrekpunt" title="Waar wil je iets beleven?" description="Hetzelfde type excursie kan per bestemming totaal anders voelen. Kies eerst je basis; vergelijk daarna alleen activiteiten die logistiek bij die plek passen." />
              <Link href="/city/" className="inline-flex items-center gap-2 text-xs font-extrabold text-jade">Bekijk alle bestemmingen <ArrowRight size={14} className="text-saffron" /></Link>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {content.destinations.map((destination) => {
                const affiliateHref = withSubId(cityAffiliates[destination.slug]?.klook || KLOOK_GENERIC, `activities-nl-${destination.slug}`);
                return (
                  <article key={destination.slug} className="group overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card">
                    <Link href={`/city/${destination.slug}/attractions/`} className="relative block h-56 overflow-hidden" aria-label={`Bekijk uitjes in ${destination.name}`}>
                      <Image src={destination.image} alt={destination.imageAlt} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw" className="object-cover transition duration-700 group-hover:scale-[1.04]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-jade/65 via-transparent to-transparent" />
                      <h2 className="absolute bottom-4 left-5 font-display text-3xl font-semibold text-white">{destination.name}</h2>
                    </Link>
                    <div className="p-5">
                      <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">{destination.label}</p>
                      <p className="mt-3 min-h-[60px] text-xs font-medium leading-5 text-charcoal/62">{destination.description}</p>
                      <div className="mt-5 flex items-center justify-between gap-3 border-t border-jade/10 pt-4">
                        <Link href={`/city/${destination.slug}/attractions/`} className="text-xs font-extrabold text-jade">Bekijk gids</Link>
                        <a href={affiliateHref} target="_blank" rel="noopener noreferrer nofollow sponsored" aria-label={`Bekijk activiteiten in ${destination.name} op Klook`} className="grid h-9 w-9 place-items-center rounded-lg border border-saffron/35 text-saffron-dark transition hover:bg-saffron hover:text-white"><ExternalLink size={15} /></a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            <AffiliateDisclosure className="mt-3">De externe Klook-knoppen zijn affiliate-links. Beschikbaarheid, prijs en voorwaarden worden door het specifieke product en de aanbieder bepaald.</AffiliateDisclosure>
          </div>
        </section>

        <section id="vergelijken" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading eyebrow="Vergelijk het dagritme" title="Welke excursie past in je route?" description="Gebruik tijdsduur en logistiek als eerste filter. Een mooie activiteit die twee lange transfers vraagt, is zelden de beste keuze voor een korte reis." />
            <div className="mt-10 overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card">
              <div className="hidden grid-cols-[0.8fr_0.8fr_1fr_1.35fr_1.35fr] gap-4 bg-jade px-6 py-4 text-[9px] font-extrabold uppercase tracking-[0.12em] text-white lg:grid">
                <span>Type</span><span>Tijd</span><span>Vorm</span><span>Kies op</span><span>Liever overslaan</span>
              </div>
              <div className="divide-y divide-jade/10">
                {content.comparison.map((row) => <div key={row.type} className="grid gap-4 px-5 py-6 text-xs lg:grid-cols-[0.8fr_0.8fr_1fr_1.35fr_1.35fr] lg:px-6"><strong className="font-display text-xl font-semibold text-jade">{row.type}</strong><div><span className="mb-1 block text-[8px] font-extrabold uppercase tracking-[0.12em] text-saffron-dark lg:hidden">Tijd</span>{row.time}</div><div><span className="mb-1 block text-[8px] font-extrabold uppercase tracking-[0.12em] text-saffron-dark lg:hidden">Vorm</span>{row.group}</div><div><span className="mb-1 block text-[8px] font-extrabold uppercase tracking-[0.12em] text-saffron-dark lg:hidden">Kies op</span>{row.choose}</div><div className="text-charcoal/58"><span className="mb-1 block text-[8px] font-extrabold uppercase tracking-[0.12em] text-saffron-dark lg:hidden">Liever overslaan</span>{row.skip}</div></div>)}
              </div>
            </div>
          </div>
        </section>

        <section id="boeken" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom overflow-hidden rounded-[28px] bg-jade text-white shadow-editorial-lift">
            <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
              <div className="relative min-h-[420px] overflow-hidden">
                <Image src="/images/redesign/krabi-destination-hero.webp" alt="Boottocht langs de kalksteenrotsen van Krabi" fill sizes="(max-width: 1024px) 100vw, 38vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-jade via-jade/15 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8"><p className="eyebrow !text-saffron-light">Goed voorbereid boeken</p><h2 className="max-w-[420px] font-display text-[3.35rem] font-semibold leading-[0.88]">De details maken je dag.</h2></div>
              </div>
              <div className="p-7 sm:p-10 lg:p-12">
                <div className="grid gap-5 sm:grid-cols-2">
                  {content.bookingChecks.map((item, index) => {
                    const icons = [ClipboardCheck, MapPinned, CalendarCheck, Waves];
                    const Icon = icons[index];
                    return <article key={item.title} className="rounded-2xl border border-white/12 bg-white/[0.06] p-5"><span className="grid h-10 w-10 place-items-center rounded-xl border border-saffron/35 text-saffron-light"><Icon size={18} /></span><h3 className="mt-4 font-display text-2xl font-semibold leading-none">{item.title}</h3><p className="mt-3 text-xs font-medium leading-5 text-white/67">{item.text}</p></article>;
                  })}
                </div>
                <a href={withSubId(KLOOK_GENERIC, 'activities-nl-booking-check')} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-cream group mt-7 min-h-12 px-6 text-saffron-dark">Vergelijk actuele opties op Klook <ExternalLink size={15} /></a>
                <AffiliateDisclosure className="mt-3 !text-white/48">Affiliate-link. Controleer altijd de voorwaarden op de productpagina; Go2Thailand voert de activiteit niet uit.</AffiliateDisclosure>
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom bg-mist py-16 lg:py-20">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <SectionHeading eyebrow="Veilig & verantwoord" title={<>Een goede ervaring<br />voelt ook goed.</>} description="Populariteit is geen kwaliteitskeurmerk. Kijk naar de impact op dieren en natuur, de ervaring van de uitvoerder en de informatie die je vóór betaling krijgt." />
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: HeartHandshake, title: 'Dierenwelzijn', text: 'Kies observatie boven entertainment. Geen ritten, shows of gegarandeerd lichamelijk contact.' },
                { icon: ShieldCheck, title: 'Veiligheid', text: 'Controleer materiaal, verzekering, zeecondities en fysieke eisen bij actieve tours.' },
                { icon: Users, title: 'Lokale impact', text: 'Kleine groepen en lokale gidsen geven vaak meer context en minder druk op één plek.' },
              ].map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl border border-jade/10 bg-white p-6"><Icon size={24} className="text-saffron-dark" /><h2 className="mt-5 font-display text-2xl font-semibold text-jade">{title}</h2><p className="mt-3 text-xs font-medium leading-5 text-charcoal/62">{text}</p></article>)}
            </div>
          </div>
        </section>

        <FaqSplitSection id="vragen" eyebrow="Voor je boekt" title="Veelgestelde vragen over excursies in Thailand" description="De live DFS-SERP leverde deze echte Nederlandse vragen op. De antwoorden helpen kiezen zonder één prijs, aanbieder of route als universeel beste neer te zetten." items={[...content.faqs]} />

        <RelatedGuidesSection
          eyebrow="Verder plannen"
          title="Maak je Thailand-reis logisch"
          guides={[
            { title: 'Grand Palace in Bangkok', description: 'Plan entree, kleding, controlepunten en actuele bezoekvoorwaarden vóór je tempeldag.', href: '/grand-palace-tickets/', image: '/images/redesign/editorial/grand-palace-bangkok-complete-guide-2026-hero.webp', imageAlt: 'Daken en tempelarchitectuur van het Grand Palace in Bangkok' },
            { title: 'Mooiste plekken', description: 'Kies eerst welke bestemmingen bij jouw reisstijl passen.', href: '/city/', image: '/images/redesign/destination-krabi.webp', imageAlt: 'Tropisch landschap bij Krabi' },
            { title: 'Beste reistijd', description: 'Stem boottochten en buitenactiviteiten af op regio en seizoen.', href: '/weather/', image: '/images/redesign/krabi-weather-packing-flatlay.webp', imageAlt: 'Praktische uitrusting voor het weer in Thailand' },
            { title: 'Wat te doen', description: 'Lees de redactionele inspiratielijst zonder boekingsfocus.', href: '/things-to-do-in-thailand/', image: '/images/redesign/experience-ayutthaya.webp', imageAlt: 'Tempels van Ayutthaya' },
          ]}
        />

        <SourceMethodSection eyebrow="Onderzoek & transparantie" title="Hoe deze keuzehulp is gemaakt" description="De zoekintentie, concurrenten en letterlijke PAA-vragen zijn op 23 juli 2026 met DataForSEO voor Nederland vastgelegd. We gebruiken officiële bestemmingsinformatie voor context en tonen geen vaste productprijs of reviewscore zonder actuele productbron." sources={[...content.sources]} />
      </div>
    </>
  );
}
