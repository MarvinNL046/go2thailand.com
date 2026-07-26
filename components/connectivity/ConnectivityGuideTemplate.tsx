import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BatteryCharging,
  Check,
  CircleHelp,
  CloudDownload,
  ExternalLink,
  Gauge,
  MapPin,
  Plane,
  Plug,
  RadioTower,
  Router,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Signal,
  Smartphone,
  Store,
  Wifi,
} from 'lucide-react';
import Image from 'next/image';
import type { ConnectivityGuideData } from '../../data/connectivity-guides/types';
import { SAILY_GENERIC, withSubId } from '../../lib/affiliates';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';

function createSchemas(data: ConnectivityGuideData) {
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
        { '@type': 'ListItem', position: 3, name: 'eSIM Thailand', item: pageUrl },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Internetopties voor Thailand',
      itemListElement: data.choices.map((choice, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: choice.title,
        description: choice.description,
      })),
    },
  ];
}

export function ConnectivityGuideTemplate({ data }: { data: ConnectivityGuideData }) {
  const schemas = createSchemas(data);
  const sailyHeroUrl = withSubId(SAILY_GENERIC, 'sim-card-thailand-nl-hero');
  const sailyDecisionUrl = withSubId(SAILY_GENERIC, 'sim-card-thailand-nl-decision');
  const sectionNav = [
    { href: '#kiezen' as const, label: 'Kiezen', icon: Smartphone },
    { href: '#vergelijken' as const, label: 'Vergelijken', icon: Signal },
    { href: '#data' as const, label: 'Data', icon: Gauge },
    { href: '#kopen' as const, label: 'Kopen', icon: Store },
    { href: '#installeren' as const, label: 'Installeren', icon: Settings },
    { href: '#oplossen' as const, label: 'Oplossen', icon: Router },
    { href: '#vragen' as const, label: 'Vragen', icon: CircleHelp },
  ];

  return (
    <>
      <SEOHead title={data.seo.title} description={data.seo.description} ogImage={data.seo.image}>
        <meta name="keywords" content={data.seo.keywords} />
        {schemas.map((schema) => <script key={schema['@type']} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      </SEOHead>

      <div className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          image={data.hero.image}
          imageAlt={data.hero.imageAlt}
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Reisgidsen', href: '/travel-guides/' }, { label: 'eSIM & simkaart' }]}
          eyebrow={data.hero.eyebrow}
          title={<>{data.hero.title}</>}
          subtitle={<>{data.hero.accent}</>}
          description={<>{data.hero.description}</>}
          actions={[
            { label: 'Vind jouw verbinding', href: '#kiezen', kind: 'primary' },
            { label: 'Bekijk Saily eSIM', href: sailyHeroUrl, kind: 'secondary', newTab: true, affiliate: true, ariaLabel: 'Bekijk de actuele Thailand eSIM-bundels van Saily' },
          ]}
          disclosure="Affiliate: bij een aankoop via Saily ontvangen wij mogelijk commissie, zonder extra kosten voor jou. Onze vergelijking en adviezen blijven onafhankelijk."
          minHeightClassName="min-h-[790px] lg:min-h-[720px]"
          contentClassName="max-w-[700px]"
          titleClassName="max-w-[650px] text-[4.15rem] leading-[0.84] sm:text-[5.15rem] lg:text-[5.9rem]"
          subtitleClassName="max-w-[600px] text-[2rem] leading-[0.94] text-saffron-dark sm:text-[2.8rem]"
          imageClassName="object-cover object-[68%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.1)_0%,rgba(252,250,246,0.6)_46%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.99)_0%,rgba(252,250,246,0.94)_39%,rgba(252,250,246,0.25)_67%,rgba(9,47,39,0.1)_100%)]"
          sideCard={(
            <aside className="absolute bottom-8 right-[max(2rem,calc((100vw-1280px)/2))] z-10 hidden w-[326px] overflow-hidden rounded-2xl border border-white/60 bg-white/82 shadow-editorial-lift backdrop-blur-xl xl:block">
              <div className="flex items-center justify-between border-b border-jade/10 px-5 py-4">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-dark">Beslis in 30 seconden</p>
                <span className="grid h-9 w-9 place-items-center rounded-full border border-saffron/30 bg-canvas text-jade"><Smartphone size={17} /></span>
              </div>
              <div className="space-y-3 px-5 py-5 text-[11px] font-bold leading-5 text-jade">
                <p className="flex gap-3"><Check size={15} className="mt-0.5 shrink-0 text-saffron" />Ondersteunt je exacte toestel eSIM?</p>
                <p className="flex gap-3"><Check size={15} className="mt-0.5 shrink-0 text-saffron" />Heb je een lokaal nummer nodig?</p>
                <p className="flex gap-3"><Check size={15} className="mt-0.5 shrink-0 text-saffron" />Hoeveel dagen en data gebruik je echt?</p>
              </div>
              <p className="border-t border-jade/10 px-5 py-4 text-[10px] font-medium leading-4 text-charcoal/58">Beantwoord die drie vragen vóór je prijzen vergelijkt. Zo kies je een passend product in plaats van het grootste marketinglabel.</p>
            </aside>
          )}
        />

        <PageSectionNav items={sectionNav} />

        <section id="kiezen" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div>
                <SectionHeading eyebrow="Begin bij je reis" title="Drie routes naar internet." description="Niet de provider maar jouw situatie komt eerst. Kies de route die bij je toestel, reisduur en behoefte aan een lokaal nummer past. Daarna vergelijk je pas bundels." />
                <div className="relative mt-9 hidden h-24 max-w-[320px] lg:block" aria-hidden="true">
                  <Smartphone size={29} strokeWidth={1.45} className="absolute left-0 top-0 text-jade" />
                  <div className="absolute left-10 top-5 h-10 w-[70%] rounded-[50%] border-b-2 border-dashed border-saffron/75" />
                  <MapPin size={29} strokeWidth={1.45} className="absolute right-4 top-10 text-saffron" />
                  <span className="absolute left-[52%] top-[50px] h-2 w-2 rounded-full bg-saffron" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {data.choices.map((choice, index) => {
                  const Icon = index === 0 ? CloudDownload : index === 1 ? RadioTower : Plane;
                  return (
                    <article key={choice.title} className={`rounded-2xl border p-6 shadow-editorial-card ${index === 0 ? 'border-saffron/35 bg-tonal' : 'border-jade/10 bg-white'}`}>
                      <div className="flex items-center justify-between">
                        <span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/25 bg-canvas text-jade"><Icon size={20} strokeWidth={1.5} /></span>
                        <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">{choice.label}</span>
                      </div>
                      <h2 className="mt-5 font-display text-[1.75rem] font-semibold leading-none text-jade">{choice.title}</h2>
                      <p className="mt-4 text-xs font-medium leading-6 text-charcoal/68">{choice.description}</p>
                      <p className="mt-5 border-t border-jade/10 pt-4 text-[10px] font-extrabold leading-5 text-jade/68">{choice.verdict}</p>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="mt-10 grid overflow-hidden rounded-[28px] border border-jade/10 bg-white shadow-editorial-card lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-[360px] lg:min-h-[480px]">
                <Image src="/images/redesign/esim-thailand-choice.webp" alt="Thailandkaart met smartphone, eSIM en fysieke sim als visuele keuzehulp" fill sizes="(max-width: 1024px) 100vw, 48vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-jade/30 via-transparent to-transparent lg:bg-gradient-to-r" />
              </div>
              <div className="p-7 sm:p-10 lg:p-12">
                <p className="eyebrow">De korte keuzehulp</p>
                <h2 className="font-display text-[2.7rem] font-semibold leading-[0.92] tracking-[-0.035em] text-jade sm:text-[3.35rem]">Welke verbinding past bij jou?</h2>
                <div className="mt-7 space-y-5 text-sm font-medium leading-7 text-charcoal/68">
                  <p><strong className="text-jade">Kies een reis-eSIM</strong> als je telefoon geschikt en simlockvrij is, je vooral data gebruikt en direct na landing online wilt. Controleer of de looptijd bij installatie of pas bij eerste netwerkverbinding start.</p>
                  <p><strong className="text-jade">Kies een Thaise sim of provider-eSIM</strong> als je een lokaal nummer, persoonlijke installatiehulp of een oplossing voor langer verblijf zoekt. Registratie met je paspoort is onderdeel van de aankoop.</p>
                  <p><strong className="text-jade">Gebruik roaming alleen bewust</strong> als je Nederlandse provider vooraf een heldere Thailandbundel toont. Thailand valt normaal buiten de EU-roamingregels, dus standaardtarieven kunnen ongunstig zijn.</p>
                </div>
                <aside className="mt-7 rounded-2xl border border-saffron/30 bg-tonal p-5">
                  <p className="flex items-start gap-3 text-xs font-bold leading-6 text-jade"><ShieldCheck size={19} className="mt-0.5 shrink-0 text-saffron-dark" />Bewaar hoteladres, reisverzekering, noodnummers en eerste transfervoucher ook offline. Mobiele data is een hulpmiddel, geen enige toegang tot je reis.</p>
                </aside>
              </div>
            </div>
          </div>
        </section>

        <section id="vergelijken" className="section-divider-bottom scroll-mt-24 bg-tonal/45 py-16 lg:py-24">
          <div className="container-custom min-w-0">
            <SectionHeading eyebrow="Zet dezelfde vragen naast elkaar" title="eSIM, Thaise sim of roaming?" description="Deze vergelijking gaat over het type verbinding. Binnen ieder type verschillen prijs, snelheid, dekking, looptijd en support per product." />
            <div className="mt-9 min-w-0 overflow-x-auto rounded-2xl border border-jade/10 bg-white shadow-editorial-card">
              <table className="min-w-[830px] w-full text-left text-xs">
                <thead className="bg-jade text-white">
                  <tr><th className="px-5 py-4">Vergelijkpunt</th><th className="px-5 py-4">Reis-eSIM</th><th className="px-5 py-4">Thaise sim/eSIM</th><th className="px-5 py-4">NL-roaming</th></tr>
                </thead>
                <tbody className="divide-y divide-jade/10">
                  {data.comparison.map((row, index) => (
                    <tr key={row.feature} className={index % 2 ? 'bg-tonal/45' : 'bg-white'}>
                      <th scope="row" className="px-5 py-4 font-extrabold text-jade">{row.feature}</th>
                      <td className="px-5 py-4 font-medium leading-5 text-charcoal/66">{row.travelEsim}</td>
                      <td className="px-5 py-4 font-medium leading-5 text-charcoal/66">{row.thaiSim}</td>
                      <td className="px-5 py-4 font-medium leading-5 text-charcoal/66">{row.roaming}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-[10px] font-medium leading-5 text-charcoal/52">Op mobiel kun je de tabel horizontaal verschuiven. Controleer actuele productspecificaties altijd bij de aanbieder; bundels veranderen sneller dan een redactionele gids.</p>
          </div>
        </section>

        <section id="data" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
              <SectionHeading eyebrow="Koop geen marketingwoord" title="Hoeveel data heb je echt nodig?" description="Kijk in de instellingen hoeveel mobiele data je thuis per app gebruikt. Corrigeer daarna voor hotel-wifi, offline kaarten en het feit dat je op reis mogelijk meer navigeert maar minder streamt." />
              <div className="grid gap-4 sm:grid-cols-2">
                {data.dataProfiles.map((profile, index) => (
                  <article key={profile.title} className={`rounded-2xl border p-6 shadow-editorial-card ${index === 2 ? 'border-saffron/30 bg-tonal' : 'border-jade/10 bg-white'}`}>
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">{profile.label}</p>
                    <h2 className="mt-2 font-display text-[1.85rem] font-semibold leading-none text-jade">{profile.title}</h2>
                    <p className="mt-3 text-xs font-extrabold text-jade/72">{profile.amount}</p>
                    <p className="mt-4 text-xs font-medium leading-6 text-charcoal/66">{profile.description}</p>
                    <ul className="mt-5 space-y-2 border-t border-jade/10 pt-4 text-[10px] font-bold text-jade/70">
                      {profile.tips.map((tip) => <li key={tip} className="flex gap-2"><Check size={13} className="mt-0.5 shrink-0 text-saffron" />{tip}</li>)}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
            <div className="mt-10 grid overflow-hidden rounded-[28px] bg-jade text-white shadow-editorial-lift lg:grid-cols-[1.05fr_0.95fr]">
              <div className="p-7 sm:p-10 lg:p-12">
                <p className="eyebrow !text-saffron-light">Let op het kleine lettertype</p>
                <h2 className="font-display text-[2.8rem] font-semibold leading-[0.92] tracking-[-0.035em] sm:text-[3.45rem]">“Onbeperkt” zegt niet hoe snel.</h2>
                <p className="mt-5 text-sm font-medium leading-7 text-white/72">Een onbeperkte bundel kan na een dagelijkse hoeveelheid high-speed data terugvallen naar een lagere snelheid. Ook hotspot, videokwaliteit of netwerkprioriteit kan worden beperkt. Noteer daarom vier dingen: data op volle snelheid, snelheid daarna, resetmoment en tetheringvoorwaarden. Bij Saily geldt voor huidige unlimited-plannen een fair-usebeleid; controleer de actuele productkaart vlak voor aankoop.</p>
                <div className="mt-7 flex flex-wrap gap-3 text-[10px] font-extrabold uppercase tracking-[0.12em] text-white/70">
                  <span className="rounded-lg border border-white/15 px-3 py-2">High-speed data</span><span className="rounded-lg border border-white/15 px-3 py-2">Snelheid daarna</span><span className="rounded-lg border border-white/15 px-3 py-2">Resetmoment</span><span className="rounded-lg border border-white/15 px-3 py-2">Hotspot</span>
                </div>
              </div>
              <div className="relative min-h-[330px] lg:min-h-full">
                <Image src="/images/redesign/esim-thailand-coverage.webp" alt="Reiziger controleert mobiel bereik langs een route in de bergen van Noord-Thailand" fill sizes="(max-width: 1024px) 100vw, 48vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-jade/35 via-transparent to-transparent lg:bg-gradient-to-r" />
              </div>
            </div>
          </div>
        </section>

        <section id="kopen" className="section-divider-bottom scroll-mt-24 bg-tonal/45 py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading eyebrow="Vier koopmomenten" title="Waar koop je een simkaart of eSIM?" description="Gemak, hulp en flexibiliteit verschuiven per verkoopplek. Kies vooraf welk probleem de verkoper voor je moet oplossen: alleen data leveren, registreren, installeren of ook later support geven." />
            <div className="mt-9 grid gap-5 lg:grid-cols-2">
              {data.purchaseOptions.map((option, index) => {
                const Icon = index === 0 ? CloudDownload : index === 1 ? Plane : index === 2 ? Store : ShoppingBag;
                return (
                  <article key={option.title} className={`rounded-[24px] border p-7 shadow-editorial-card sm:p-8 ${index === 1 ? 'border-saffron/30 bg-tonal' : 'border-jade/10 bg-white'}`}>
                    <div className="flex items-start justify-between gap-5">
                      <div className="flex items-start gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-saffron/25 bg-canvas text-jade"><Icon size={20} strokeWidth={1.5} /></span><div><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">{option.label}</p><h2 className="mt-1 font-display text-[2rem] font-semibold leading-none text-jade">{option.title}</h2></div></div>
                      <span className="font-display text-[2.8rem] font-semibold leading-none text-jade/10">0{index + 1}</span>
                    </div>
                    <p className="mt-5 text-xs font-medium leading-6 text-charcoal/68">{option.description}</p>
                    <dl className="mt-5 grid gap-4 border-t border-jade/10 pt-5 text-[10px] leading-5 sm:grid-cols-2">
                      <div><dt className="font-extrabold text-jade">Goed voor</dt><dd className="mt-1 text-charcoal/62">{option.goodFor}</dd></div>
                      <div><dt className="font-extrabold text-saffron-dark">Let op</dt><dd className="mt-1 text-charcoal/62">{option.caution}</dd></div>
                    </dl>
                  </article>
                );
              })}
            </div>

            <div className="mt-10 grid overflow-hidden rounded-[28px] border border-jade/10 bg-white shadow-editorial-card lg:grid-cols-[0.92fr_1.08fr]">
              <div className="relative min-h-[360px] lg:min-h-[490px]">
                <Image src="/images/redesign/esim-thailand-airport.webp" alt="Medewerker bij een generieke mobiele balie helpt een reiziger met simkaartregistratie" fill sizes="(max-width: 1024px) 100vw, 46vw" className="object-cover" />
              </div>
              <div className="p-7 sm:p-10 lg:p-12">
                <p className="eyebrow">Aan de balie</p>
                <h2 className="font-display text-[2.7rem] font-semibold leading-[0.92] tracking-[-0.035em] text-jade sm:text-[3.3rem]">Loop pas weg als data werkt.</h2>
                <p className="mt-5 text-sm font-medium leading-7 text-charcoal/68">Laat niet alleen een verpakking scannen. De sim moet aan jouw paspoort worden gekoppeld, geactiveerd en op het juiste dataprofiel staan. Open vervolgens een website zonder wifi, laad een kaart en bel desgewenst het lokale nummer. Maak een foto van de bundelnaam, afloopdatum en supportcode.</p>
                <ol className="mt-7 space-y-4 text-xs font-bold leading-5 text-jade">
                  {['Paspoortregistratie voltooid', 'Bundel en afloopdatum zichtbaar', 'Mobiele data zonder wifi getest', 'Nummer en supportkanaal opgeslagen'].map((item, index) => <li key={item} className="flex items-center gap-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-jade text-[10px] text-saffron-light">{index + 1}</span>{item}</li>)}
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading eyebrow="Netwerk zonder ranglijstje" title="AIS, True-dtac of een reis-eSIM?" description="Een landelijke winnaar aanwijzen op basis van één meting helpt weinig als jij op een eiland, in een bergdorp of in een druk stadion staat. Controleer de officiële kaart en vraag je accommodatie naar jouw specifieke locatie." />
            <div className="mt-9 grid gap-5 lg:grid-cols-3">
              {data.providers.map((provider, index) => (
                <article key={provider.title} className={`rounded-[24px] border p-7 shadow-editorial-card ${index === 2 ? 'border-saffron/30 bg-tonal' : 'border-jade/10 bg-white'}`}>
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">{provider.label}</p>
                  <h2 className="mt-3 font-display text-[2rem] font-semibold leading-none text-jade">{provider.title}</h2>
                  <p className="mt-5 text-xs font-medium leading-6 text-charcoal/68">{provider.description}</p>
                  <ul className="mt-6 space-y-3 border-t border-jade/10 pt-5 text-[10px] font-bold leading-5 text-jade/68">
                    {provider.checks.map((check) => <li key={check} className="flex gap-2"><Check size={13} className="mt-0.5 shrink-0 text-saffron" />{check}</li>)}
                  </ul>
                </article>
              ))}
            </div>
            <aside className="mt-7 rounded-[24px] border border-saffron/30 bg-tonal px-7 py-6 sm:flex sm:items-center sm:gap-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-jade text-saffron-light"><BadgeCheck size={21} /></span>
              <div className="mt-4 sm:mt-0"><p className="text-sm font-extrabold text-jade">De 60-dagenregel voor Tourist SIM</p><p className="mt-2 text-xs font-medium leading-6 text-charcoal/68">Sinds 30 juni 2025 mag een Tourist SIM volgens de Thaise telecomtoezichthouder maximaal 60 dagen actief zijn. Alleen opwaarderen verlengt dat niet. Wil je hem daarna gebruiken, dan moet je je opnieuw volgens de providerprocedure identificeren. Een afzonderlijke databundel kan al eerder aflopen.</p></div>
            </aside>
          </div>
        </section>

        <section id="installeren" className="section-divider-bottom scroll-mt-24 bg-tonal/45 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
              <div>
                <SectionHeading eyebrow="Voor vertrek voorbereiden" title="Installeer zonder je thuissim te laten roamen." description="De precieze menunamen verschillen per iPhone, Android-versie en aanbieder. De logica blijft gelijk: installeren via wifi, lijnen labelen, Thailand voor data kiezen en je Nederlandse dataroaming uitschakelen." />
                <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-[24px] border border-jade/10 shadow-editorial-card">
                  <Image src="/images/redesign/esim-thailand-setup.webp" alt="Handen stellen een eSIM in op een smartphone met Bangkok op de achtergrond" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
                </div>
              </div>
              <ol className="relative space-y-4 before:absolute before:bottom-8 before:left-5 before:top-8 before:border-l-2 before:border-dashed before:border-saffron/55">
                {data.setupSteps.map((step, index) => (
                  <li key={step.title} className="relative grid grid-cols-[42px_1fr] gap-4 rounded-2xl border border-jade/10 bg-white p-5 shadow-editorial-card">
                    <span className="relative z-10 grid h-10 w-10 place-items-center rounded-full bg-jade text-xs font-extrabold text-saffron-light">{index + 1}</span>
                    <div><h2 className="font-display text-[1.55rem] font-semibold leading-none text-jade">{step.title}</h2><p className="mt-3 text-xs font-medium leading-6 text-charcoal/66">{step.description}</p><p className="mt-3 text-[10px] font-extrabold uppercase tracking-[0.1em] text-saffron-dark">{step.check}</p></div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-12 grid overflow-hidden rounded-[28px] bg-jade text-white shadow-editorial-lift lg:grid-cols-[1.08fr_0.92fr]">
              <div className="jade-pattern p-7 sm:p-10 lg:p-12">
                <p className="eyebrow !text-saffron-light">Vooraf klaarzetten</p>
                <h2 className="font-display text-[3rem] font-semibold leading-[0.9] tracking-[-0.035em]">Saily voor direct data na landing</h2>
                <p className="mt-5 max-w-[620px] text-sm font-medium leading-7 text-white/74">Saily biedt actuele Thailandbundels als eSIM, waaronder vaste databundels en unlimited-opties. Controleer vóór aankoop of je exacte toestel geschikt is, wanneer de geldigheid start en welke fair-use- en hotspotvoorwaarden bij jouw plan horen. Installeer het profiel thuis via wifi en activeer het volgens de aanwijzingen pas op het juiste moment.</p>
                <AffiliateDisclosure className="mt-5 !text-white/58">Affiliate: via onderstaande knop ontvangen wij mogelijk commissie wanneer je koopt, zonder extra kosten voor jou. Saily is één optie binnen deze onafhankelijke keuzehulp en geen automatisch antwoord voor iedere reiziger.</AffiliateDisclosure>
                <a href={sailyDecisionUrl} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-cream group mt-5 inline-flex min-h-12 px-6 text-saffron-dark">
                  Bekijk actuele Saily-bundels <ExternalLink size={15} />
                </a>
              </div>
              <div className="relative min-h-[340px] lg:min-h-full">
                <Image src="/images/redesign/esim-thailand-navigation.webp" alt="Reiziger gebruikt een smartphone voor navigatie in Bangkok bij blauwe avondlucht" fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-jade/35 via-transparent to-transparent lg:bg-gradient-to-r" />
              </div>
            </div>
          </div>
        </section>

        <section id="oplossen" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr]">
              <div>
                <SectionHeading eyebrow="Geen paniek bij nul streepjes" title="Los eerst de simpele instelling op." description="Verwijder een eSIM-profiel niet als eerste stap. Controleer lijn, datakeuze, roaming en aanbiederinstructies in een vaste volgorde. Daarmee voorkom je dat een herstelbare instelling een nieuw aankoopprobleem wordt." />
                <aside className="mt-7 rounded-2xl border border-saffron/30 bg-tonal p-5"><p className="flex gap-3 text-xs font-bold leading-6 text-jade"><AlertTriangle size={19} className="mt-0.5 shrink-0 text-saffron-dark" />Moet je direct een transfer halen? Gebruik luchthaven-wifi, open je offline voucher en los de verbinding pas op een veilige plek op.</p></aside>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {data.troubleshooting.map((item, index) => {
                  const Icon = index === 0 ? Wifi : index === 1 ? ShieldCheck : index === 2 ? Smartphone : Router;
                  return (
                    <article key={item.problem} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                      <span className="grid h-10 w-10 place-items-center rounded-xl border border-saffron/25 bg-canvas text-jade"><Icon size={19} strokeWidth={1.5} /></span>
                      <h2 className="mt-5 font-display text-[1.65rem] font-semibold leading-none text-jade">{item.problem}</h2>
                      <ol className="mt-4 space-y-3 text-[11px] font-medium leading-5 text-charcoal/66">{item.actions.map((action, actionIndex) => <li key={action} className="flex gap-3"><span className="font-extrabold text-saffron-dark">{actionIndex + 1}.</span>{action}</li>)}</ol>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="mt-12 grid gap-6 rounded-[28px] border border-jade/10 bg-white p-7 shadow-editorial-card lg:grid-cols-[0.7fr_1.3fr] lg:p-10">
              <div>
                <p className="eyebrow">OneLink reisaccessoires</p>
                <h2 className="font-display text-[2.65rem] font-semibold leading-[0.92] tracking-[-0.035em] text-jade">Houd je telefoon bruikbaar.</h2>
                <p className="mt-5 text-sm font-medium leading-7 text-charcoal/66">Een databundel helpt niet bij een lege batterij of losse kabel. Deze accessoires passen inhoudelijk bij navigatie- en transferdagen; controleer zelf specificaties en neem alleen mee wat je echt gebruikt.</p>
                <AffiliateDisclosure className="mt-4">Amazon-affiliate: bij een aankoop via deze links ontvangen wij mogelijk commissie, zonder extra kosten voor jou. OneLink kan je naar een passende lokale Amazon-winkel sturen; aanbod, prijs en bestemming verschillen per land.</AffiliateDisclosure>
              </div>
              <div className="grid gap-3">
                {data.amazonProducts.map((product, index) => {
                  const Icon = index === 0 ? BatteryCharging : index === 1 ? Plug : ShoppingBag;
                  return (
                    <a key={product.amazonSlug} href={`/go/${product.amazonSlug}/`} target="_blank" rel="noopener noreferrer nofollow sponsored" className="group grid grid-cols-[42px_1fr_34px] items-center gap-4 rounded-xl border border-jade/10 bg-tonal/55 p-4 transition hover:border-saffron/40 hover:bg-tonal">
                      <span className="grid h-10 w-10 place-items-center rounded-lg bg-jade text-saffron-light"><Icon size={18} /></span>
                      <span><strong className="block text-xs font-extrabold text-jade">{product.title}</strong><span className="mt-1 block text-[10px] font-medium leading-4 text-charcoal/58">{product.reason}</span></span>
                      <ArrowRight size={16} className="text-saffron-dark transition group-hover:translate-x-1" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <FaqSplitSection id="vragen" eyebrow="Vóór je activeert" title="Veelgestelde vragen over eSIM en simkaarten" description="De antwoorden combineren actuele Thaise registratieregels met praktische instellingen. Productprijzen, promoties en toestelondersteuning controleer je altijd opnieuw bij de aanbieder." items={data.faqs} />

        <RelatedGuidesSection eyebrow="Blijf slim verbonden" title="Plan de rest van je Thailandreis" guides={data.related} />

        <SourceMethodSection eyebrow="Gecontroleerd, niet gegokt" title="Bronnen & redactionele methode" description="Deze gids is op 25 juli 2026 herzien aan de hand van officiële telecom- en providerbronnen, actuele DFS-zoekdata, echte Nederlandse zoekvragen en een inhoudsanalyse van concurrerende gidsen. We rangschikken netwerken niet zonder routegebonden bewijs en tonen veranderlijke prijzen niet als tijdloze feiten." sources={data.sources} />
      </div>
    </>
  );
}
