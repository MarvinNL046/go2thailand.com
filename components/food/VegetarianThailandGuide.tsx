import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { ReactNode } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CalendarDays,
  Check,
  ChefHat,
  CircleHelp,
  ExternalLink,
  Languages,
  Leaf,
  MapPinned,
  MessageCircle,
  ShieldCheck,
  ShoppingBag,
  Store,
  UtensilsCrossed,
  WheatOff,
} from 'lucide-react';
import { KLOOK_GENERIC, withPlacementSubId } from '../../lib/affiliates';
import { useSubId } from '../../lib/useSubId';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav, type PageSectionNavItem } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';

type DietKey = 'vegetarisch' | 'vegan' | 'jay' | 'allergie';

const PAGE_URL = 'https://go2-thailand.com/nl/travel-guides/vegetarian-vegan-thailand/';
const PAGE_TITLE = 'Vegetarisch eten in Thailand: vegan, jay & bestellen';
const PAGE_DESCRIPTION = 'Vegetarisch of vegan eten in Thailand? Leer jay herkennen, controleer vissaus en currypasta, bestel duidelijk en kies gerechten, steden en kooklessen.';

const sectionNav: PageSectionNavItem[] = [
  { href: '#begin', label: 'Begin', icon: Leaf },
  { href: '#verschillen', label: 'Verschillen', icon: BadgeCheck },
  { href: '#bestellen', label: 'Bestellen', icon: MessageCircle },
  { href: '#gerechten', label: 'Gerechten', icon: UtensilsCrossed },
  { href: '#plekken', label: 'Plekken', icon: MapPinned },
  { href: '#festival', label: 'Festival', icon: CalendarDays },
  { href: '#vragen', label: 'Vragen', icon: CircleHelp },
];

const dietProfiles: Record<DietKey, { label: string; eyebrow: string; title: string; summary: string; ask: string[]; tone: string }> = {
  vegetarisch: {
    label: 'Vegetarisch',
    eyebrow: 'Geen vlees of vis',
    title: 'Vraag óók naar de smaakbasis',
    summary: 'Een groentegerecht kan nog vissaus, oestersaus, garnalenpasta of vleesbouillon bevatten. Ei en zuivel passen soms wel binnen jouw keuze, maar niet automatisch binnen die van de keuken.',
    ask: ['Geen vlees en vis', 'Wel of geen ei', 'Vissaus, oestersaus en bouillon'],
    tone: 'bg-[#fff4df]',
  },
  vegan: {
    label: 'Vegan',
    eyebrow: 'Geen dierlijke ingrediënten',
    title: 'Maak het recept concreet',
    summary: 'Zeg niet alleen “vegan”, maar benoem wat voor dit gerecht telt: geen ei, melk, vissaus, oestersaus, garnalenpasta en dierlijke bouillon. Vraag of de currypasta al is gemengd.',
    ask: ['Geen ei of zuivel', 'Geen dierlijke saus of pasta', 'Controleer vooraf gemengde basis'],
    tone: 'bg-mist',
  },
  jay: {
    label: 'Jay',
    eyebrow: 'Religieuze eetpraktijk',
    title: 'Sterk signaal, andere betekenis',
    summary: 'Kin jay hoort bij een bredere Chinees-Thaise religieuze praktijk. Jay-food vermijdt dierlijke ingrediënten en in de striktere traditie ook scherp geurende planten. Zie het symbool als aanwijzing, niet als vervanging van een vraag bij een medische grens.',
    ask: ['Zoek het geel-rode เจ-signaal', 'Respecteer religieuze context', 'Vraag opnieuw bij allergie'],
    tone: 'bg-[#eef3ed]',
  },
  allergie: {
    label: 'Allergie',
    eyebrow: 'Medische grens',
    title: 'Een dieetlabel dekt geen kruiscontact',
    summary: 'Vegetarisch, vegan of jay zegt niets zekers over een gedeelde wok, olie, mes, snijplank of sauslepel. Gebruik een professioneel vertaalde chef card en kies een keuken die de vraag begrijpt.',
    ask: ['Ingrediënt én bereiding', 'Gedeelde wok en olie', 'Eigen medisch noodplan'],
    tone: 'bg-[#f4eee7]',
  },
};

const dishes = [
  { slug: 'pad-thai', name: 'Pad thai', cue: 'Vraag zonder ei, vissaus en gedroogde garnaal', text: 'De noedels zijn niet automatisch plantaardig. Laat de kok ook de saus en toppings controleren.' },
  { slug: 'som-tam', name: 'Som tam', cue: 'Vraag zonder vissaus en gedroogde garnaal', text: 'De vijzel kan gedeeld zijn. Bij allergie is dat een aparte vraag naast de ingrediënten.' },
  { slug: 'khao-soi', name: 'Khao soi', cue: 'Vraag naar currypasta en bouillon', text: 'Een tofuversie kan nog dierlijke pasta of bouillon gebruiken. Een gespecialiseerde vegan keuken is eenvoudiger.' },
  { slug: 'mango-sticky-rice', name: 'Mango sticky rice', cue: 'Vaak een logische dessertcheck', text: 'Kleefrijst, mango en kokos zijn een bruikbaar startpunt, maar receptuur en toppings blijven locatieafhankelijk.' },
];

const places = [
  { city: 'Chiang Mai', href: '/city/chiang-mai/', label: 'compact zoeken', text: 'Veel keuze in de stad en Nimman; handig als je meerdere gespecialiseerde keukens wilt vergelijken.' },
  { city: 'Bangkok', href: '/city/bangkok/', label: 'grootste variatie', text: 'Van jay-kramen rond Chinees-Thaise buurten tot moderne plant-based restaurants; afstanden vragen planning.' },
  { city: 'Phuket', href: '/city/phuket/', label: 'festivalcontext', text: 'Phuket Town is de culturele basis voor het beroemde festival; kustplaatsen hebben een ander aanbod.' },
  { city: 'Koh Phangan', href: '/islands/koh-phangan/', label: 'eilandkeuze', text: 'Sterke internationale wellness- en plant-based scene, maar controleer locatie, opening en bereik per strand.' },
];

const faqItems = [
  { question: 'Kan je in Thailand vegetarisch eten?', answer: 'Ja. In toeristische steden, bij jay-restaurants en in veel lokale keukens zijn vegetarische keuzes te vinden. De beslissende stap is controleren of saus, currypasta en bouillon ook zonder vis, schaal- of vleesingrediënten worden gemaakt.' },
  { question: 'Welke vegetarische gerechten zijn er in Thailand?', answer: 'Denk aan roerbakgerechten met tofu en groenten, curry’s met een gecontroleerde plantaardige pasta, rijst- en noedelgerechten zonder dierlijke saus, en desserts op basis van fruit, rijst en kokos. De naam alleen bewijst de receptuur niet.' },
  { question: 'Hoe vind ik vegetarisch eten in Thailand?', answer: 'Zoek eerst op gespecialiseerde vegetarian, vegan of jay-keukens en controleer daarna recente openingstijden en reviews. HappyCow kan als actuele ontdekkingstool helpen; een geel-rood jay-symbool is onderweg een extra aanwijzing.' },
  { question: 'Kan ik in Thailand veganistisch eten?', answer: 'Ja, vooral in Bangkok, Chiang Mai, Phuket en eilanden met een internationale foodscene. Bij een algemene Thaise keuken helpt een concrete ingrediëntvraag beter dan alleen het Engelse woord vegan.' },
  { question: 'Is Thais eten veganistisch?', answer: 'Niet automatisch. Veel gerechten ogen plantaardig, terwijl vissaus, oestersaus, garnalenpasta, ei of dierlijke bouillon in de basis zit. Een expliciet vegan gerecht of gespecialiseerde keuken geeft meer duidelijkheid.' },
  { question: 'Welke Thaise gerechten zijn doorgaans veganistisch?', answer: 'Er is geen landelijk gerecht dat je zonder receptcheck gegarandeerd vegan kunt noemen. Mango sticky rice en sommige tofu- of groentegerechten zijn logische kandidaten, maar saus, pasta, bouillon en toppings kunnen verschillen.' },
  { question: 'Hoe is Thailand voor veganisten?', answer: 'De keuze kan uitstekend zijn, maar gemak verschilt sterk per plek. Grote steden en bekende eilanden bieden meer gespecialiseerde adressen; in een kleine lokale keuken draait succes vaker om duidelijke vragen en een eenvoudig aanpasbaar gerecht.' },
  { question: 'Is er veganistisch eten verkrijgbaar in Thailand?', answer: 'Ja. Naast moderne vegan restaurants bestaat er een lange Chinees-Thaise jay-traditie. Buiten festivals is aanbod minder zichtbaar en veranderen adressen snel, dus controleer een actuele directory en de locatie zelf.' },
  { question: 'Wat moet je vermijden in Thailand?', answer: 'Binnen deze eetcontext: ga niet af op alleen “groenten” of tofu. Controleer vissaus, oestersaus, garnalenpasta, bouillon, ei en vooraf gemengde curry- of chilipasta. Bij allergie moet je bovendien kruiscontact bespreken.' },
  { question: 'Wat moet je echt gegeten hebben in Thailand?', answer: 'Kies contrast in plaats van één universele top tien: een wokgerecht, een curry met gecontroleerde pasta, iets fris zoals aangepaste som tam en een rijst-kokosdessert. De brede gids over eten in Thailand helpt je regio en smaak erbij kiezen.' },
];

const sources = [
  { title: 'The Vegetarian Festival: A Century-Spanning Ritual of Faith', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Articles/vegetarian-festival-en', note: 'Religieuze context, negen dagen en de centrale rol van geloof, onthouding en gemeenschap.' },
  { title: 'Phuket Vegetarian Festival', creator: 'Thailand Foundation', url: 'https://www.thailandfoundation.or.th/phuket-vegetarian-festival/', note: 'Kin jay, Chinees-Thaise oorsprong, gele signalen en de betekenis van de processies.' },
  { title: 'คู่มือสำหรับถือศีลกินเจ', creator: 'Radio Thailand / PRD', url: 'https://radiothailand.prd.go.th/th/content/category/detail/id/1378/iid/218903', note: 'Thaise overheidsuitleg over het verschil tussen jay en vegetarisch en de bredere religieuze praktijk.' },
  { title: 'Food Allergy Chef Cards', creator: 'FARE', url: 'https://www.foodallergy.org/resources/food-allergy-chef-cards', note: 'Waarom professioneel vertaalde kaarten helpen en vertaling alleen kruiscontact niet oplost.' },
  { title: 'Thailand restaurant directory', creator: 'HappyCow', url: 'https://www.happycow.net/asia/thailand/', note: 'Dynamische ontdekkingstool; adressen, openingstijden en reviews altijd bij de locatie zelf hercontroleren.' },
];

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="font-extrabold text-jade underline decoration-saffron/45 decoration-2 underline-offset-4 transition hover:text-saffron-dark">{children}</Link>;
}

export default function VegetarianThailandGuide() {
  const [diet, setDiet] = useState<DietKey>('vegan');
  const profile = dietProfiles[diet];
  const subId = useSubId();
  const klookHref = withPlacementSubId(KLOOK_GENERIC, subId, 'vegetarian-thailand-cooking-class');

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Vegetarisch en vegan eten in Thailand',
    description: PAGE_DESCRIPTION,
    mainEntityOfPage: PAGE_URL,
    image: [
      'https://go2-thailand.com/images/redesign/vegetarian-thailand-hero.webp',
      'https://go2-thailand.com/images/redesign/vegetarian-thailand-ingredients.webp',
      'https://go2-thailand.com/images/redesign/vegetarian-thailand-festival.webp',
    ],
    author: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
    publisher: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
    dateModified: '2026-07-26',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/nl/' },
      { '@type': 'ListItem', position: 2, name: 'Eten in Thailand', item: 'https://go2-thailand.com/nl/food/' },
      { '@type': 'ListItem', position: 3, name: 'Vegetarisch en vegan eten', item: PAGE_URL },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })),
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Vegetarisch of vegan bestellen in Thailand',
    step: [
      'Kies zo mogelijk een gespecialiseerde vegetarian, vegan of jay-keuken.',
      'Benoem je eigen grens: vegetarisch, vegan of een medische allergie.',
      'Vraag naar saus, currypasta, bouillon, ei en andere verborgen ingrediënten.',
      'Bespreek gedeelde wok, olie en keukengerei apart wanneer kruiscontact medisch relevant is.',
    ].map((text, index) => ({ '@type': 'HowToStep', position: index + 1, name: `Stap ${index + 1}`, text })),
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Vier praktische bases voor vegetarisch en vegan eten in Thailand',
    itemListElement: places.map((place, index) => ({ '@type': 'ListItem', position: index + 1, name: place.city, url: `https://go2-thailand.com/nl${place.href}` })),
  };

  return (
    <>
      <SEOHead title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
        {[articleSchema, breadcrumbSchema, faqSchema, howToSchema, itemListSchema].map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      </SEOHead>

      <main className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          image="/images/redesign/vegetarian-thailand-hero.webp"
          imageAlt="Reiziger bespreekt een plantaardige Thaise maaltijd met de kok"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Eten', href: '/food/' }, { label: 'Vegetarisch & vegan' }]}
          eyebrow="Bestel op ingrediënten, niet op aannames"
          title={<>Vegetarisch eten.<br />Vraag verder dan<br />“geen vlees”.</>}
          description={<>Thailand kan heerlijk zijn voor vegetariërs en vegans, maar tofu of groenten vertellen niet wat er in saus, pasta en bouillon zit. Deze gids maakt van je dieet een korte, vriendelijke bestelroute.</>}
          actions={[
            { label: 'Bouw je bestelzin', href: '#bestellen', kind: 'primary' },
            { label: 'Vergelijk de vier keuzes', href: '#verschillen', kind: 'secondary' },
          ]}
          titleClassName="max-w-[690px] text-[3.75rem] leading-[0.84] sm:text-[5rem] lg:text-[5.55rem]"
          imageClassName="object-cover object-[68%_center] lg:object-center"
          sideCard={<div className="absolute bottom-7 right-[max(2rem,calc((100vw-1280px)/2))] z-10 hidden w-[292px] rounded-2xl border border-white/55 bg-white/84 p-5 shadow-editorial-card backdrop-blur-xl xl:block"><p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">De snelle keukencheck</p><h2 className="mt-2 font-display text-[1.75rem] font-semibold leading-none text-jade">Groente is het begin, niet het antwoord.</h2><div className="mt-5 space-y-2">{['Saus & currypasta','Bouillon & ei','Wok, olie & keukengerei'].map((item, index) => <div key={item} className="flex items-center justify-between rounded-lg border border-jade/10 bg-white/80 px-3 py-2 text-[10px] font-bold text-jade"><span>{item}</span><span className="text-saffron-dark">0{index + 1}</span></div>)}</div></div>}
        />

        <PageSectionNav items={sectionNav} />

        <section id="begin" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <SectionHeading eyebrow="Kort antwoord" title="Ja, maar maak je grens zichtbaar" description={<>Voor een eerste oriëntatie helpt de brede gids over <InlineLink href="/food/">eten in Thailand</InlineLink>. Op deze pagina draait alles om het verschil tussen een gerecht dat geen stuk vlees toont en een recept dat werkelijk binnen jouw keuze past.</>} />
            <div className="grid overflow-hidden rounded-2xl border border-jade/10 bg-jade/10 shadow-editorial-card md:grid-cols-3">
              {[
                ['01','Vegetarisch','Controleer vissaus, oestersaus, garnalenpasta en bouillon; beslis zelf over ei en zuivel.'],
                ['02','Vegan','Benoem alle dierlijke ingrediënten en vraag of pasta of saus vooraf is gemengd.'],
                ['03','Allergie','Behandel ingrediënt en kruiscontact als twee verschillende vragen.'],
              ].map(([number,title,text], index) => <article key={title} className={`p-6 ${index === 1 ? 'bg-tonal' : index === 2 ? 'bg-jade text-white' : 'bg-white'}`}><span className={`text-[9px] font-extrabold ${index === 2 ? 'text-saffron-light' : 'text-saffron-dark'}`}>{number}</span><h3 className="mt-5 font-display text-[1.75rem] font-semibold leading-none">{title}</h3><p className={`mt-4 text-xs font-medium leading-6 ${index === 2 ? 'text-white/68' : 'text-charcoal/64'}`}>{text}</p></article>)}
            </div>
          </div>
        </section>

        <section id="verschillen" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
          <div className="container-custom">
            <div className="grid gap-9 lg:grid-cols-[0.62fr_1.38fr] lg:items-start">
              <div>
                <p className="eyebrow">Kies jouw grens</p>
                <h2 className="heading-redesign">Vier woorden.<br />Vier andere gesprekken.</h2>
                <div className="mt-7 flex flex-wrap gap-2">
                  {(Object.keys(dietProfiles) as DietKey[]).map((key) => <button key={key} type="button" onClick={() => setDiet(key)} aria-pressed={diet === key} className={`rounded-full border px-4 py-2 text-xs font-extrabold transition ${diet === key ? 'border-jade bg-jade text-white' : 'border-jade/15 bg-white text-jade hover:border-saffron/45'}`}>{dietProfiles[key].label}</button>)}
                </div>
              </div>
              <article className={`min-h-[360px] rounded-[28px] border border-jade/10 p-7 shadow-editorial-card sm:p-10 ${profile.tone}`}>
                <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">{profile.eyebrow}</p>
                <h3 className="mt-3 max-w-2xl font-display text-[2.7rem] font-semibold leading-[0.92] text-jade">{profile.title}</h3>
                <p className="mt-6 max-w-3xl text-sm font-medium leading-7 text-charcoal/68">{profile.summary}</p>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">{profile.ask.map((item) => <div key={item} className="flex items-center gap-3 rounded-xl border border-jade/10 bg-white/70 p-4 text-xs font-extrabold text-jade"><Check size={15} className="shrink-0 text-saffron-dark" />{item}</div>)}</div>
              </article>
            </div>
          </div>
        </section>

        <section id="bestellen" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[28px] border border-jade/10 shadow-editorial-card lg:aspect-[4/5]"><Image src="/images/redesign/vegetarian-thailand-ingredients.webp" alt="Tofu, rijst, groenten, kruiden, currypasta en sauzen voor een Thaise ingrediëntencheck" fill sizes="(max-width: 1024px) 100vw, 44vw" className="object-cover object-left" /></div>
              <div>
                <SectionHeading eyebrow="De vier-vragenroute" title="Bestel in lagen, niet in één label" description="Een korte volgorde houdt het gesprek vriendelijk én controleerbaar. Laat bij twijfel liever één eenvoudiger gerecht maken dan vijf uitzonderingen stapelen." />
                <ol className="mt-8 border-l border-dashed border-saffron/55 pl-7">
                  {[
                    ['Kies de keuken','Een gespecialiseerde vegan, vegetarian of jay-keuken verkleint het aantal aannames.'],
                    ['Noem je grens','Zeg vegetarisch of vegan en benoem bij allergie het allergeen apart.'],
                    ['Open de smaakbasis','Vraag naar vissaus, oestersaus, garnalenpasta, currypasta, bouillon en ei.'],
                    ['Bevestig de bereiding','Alleen bij medische noodzaak: vraag ook naar gedeelde wok, olie, mes en werkvlak.'],
                  ].map(([title,text], index) => <li key={title} className="relative pb-7 last:pb-0"><span className="absolute -left-[45px] top-0 grid h-9 w-9 place-items-center rounded-full border-4 border-canvas bg-jade text-[9px] font-extrabold text-white">0{index + 1}</span><h3 className="font-display text-[1.55rem] font-semibold leading-none text-jade">{title}</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/64">{text}</p></li>)}
                </ol>
              </div>
            </div>
            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-jade/10 bg-jade/10 md:grid-cols-3">
              <article className="bg-white p-6"><Languages size={23} className="text-jade" /><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">Taal</p><h3 className="mt-2 font-display text-[1.65rem] font-semibold text-jade">Laat de kaart spreken</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/62">Een professioneel vertaalde kaart is betrouwbaarder dan fonetiek uit het hoofd. Wijs per gerecht aan wat niet kan.</p></article>
              <article className="bg-mist p-6"><WheatOff size={23} className="text-jade" /><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">Allergie</p><h3 className="mt-2 font-display text-[1.65rem] font-semibold text-jade">Niet hetzelfde als vegan</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/62">Een plantaardige keuken kan nog noten, soja, gluten of gedeeld gerei gebruiken. Bespreek je noodplan met een zorgprofessional.</p></article>
              <article className="bg-jade p-6 text-white"><ShieldCheck size={23} className="text-saffron-light" /><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-light">Beslissing</p><h3 className="mt-2 font-display text-[1.65rem] font-semibold">Geen helder antwoord?</h3><p className="mt-3 text-xs font-medium leading-6 text-white/68">Kies een andere keuken of een verpakt product waarvan je het etiket kunt controleren. Twijfel is informatie.</p></article>
            </div>
          </div>
        </section>

        <section id="gerechten" className="section-divider-bottom scroll-mt-24 bg-[#0a332d] py-14 text-white lg:py-20">
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end"><div><p className="eyebrow !text-saffron-light">Gerechten als startpunt</p><h2 className="font-display text-[3.1rem] font-semibold leading-[0.9] tracking-[-0.04em]">Kies iets dat de keuken kan uitleggen.</h2></div><p className="max-w-2xl text-sm font-medium leading-7 text-white/62 lg:justify-self-end">Geen gerechtnaam is een garantie. Deze vier opties maken vooral duidelijk welke vervolgvraag bij het recept hoort.</p></div>
            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/12 bg-white/12 md:grid-cols-2 lg:grid-cols-4">
              {dishes.map((dish, index) => <Link key={dish.slug} href={`/food/${dish.slug}/`} className={`group flex min-h-[320px] flex-col p-6 transition hover:bg-white/[0.1] ${index % 2 ? 'bg-white/[0.055]' : 'bg-jade/55'}`}><span className="text-[9px] font-extrabold text-saffron-light">0{index + 1}</span><h3 className="mt-7 font-display text-[2rem] font-semibold leading-none">{dish.name}</h3><p className="mt-4 text-xs font-extrabold leading-5 text-saffron-light">{dish.cue}</p><p className="mt-4 text-xs font-medium leading-6 text-white/58">{dish.text}</p><span className="mt-auto inline-flex items-center gap-2 pt-7 text-xs font-extrabold">Open gerecht <ArrowRight size={14} className="text-saffron-light transition group-hover:translate-x-1" /></span></Link>)}
            </div>
          </div>
        </section>

        <section id="plekken" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
          <div className="container-custom">
            <SectionHeading eyebrow="Kies een handige basis" title="Meer keuze betekent niet minder controleren" description="Deze vier plekken zijn praktisch door hun zoekvolume aan gespecialiseerde adressen en reizigerscontext. Het is geen eeuwige ranglijst: restaurants openen, verhuizen en sluiten." />
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {places.map((place, index) => <Link key={place.city} href={place.href} className={`group grid min-h-[245px] grid-cols-[64px_1fr] gap-5 rounded-[24px] border p-6 shadow-editorial-card transition hover:-translate-y-0.5 ${index === 1 ? 'border-saffron/30 bg-tonal' : 'border-jade/10 bg-white'}`}><span className="grid h-14 w-14 place-items-center rounded-2xl bg-mist font-display text-xl font-semibold text-jade">0{index + 1}</span><div><p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{place.label}</p><h3 className="mt-2 font-display text-[2rem] font-semibold leading-none text-jade">{place.city}</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">{place.text}</p><span className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-jade">Plan je basis <ArrowRight size={14} className="text-saffron-dark transition group-hover:translate-x-1" /></span></div></Link>)}
            </div>
            <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-saffron/24 bg-[#fff6e8] p-6 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">Dynamisch aanbod</p><p className="mt-2 max-w-3xl text-xs font-medium leading-6 text-charcoal/64">Gebruik HappyCow of een recente kaart alleen als shortlist. Bel of controleer dezelfde dag de locatie, keukenuren en dieetmogelijkheden.</p></div><a href="https://www.happycow.net/asia/thailand/" target="_blank" rel="noopener noreferrer" className="btn-cream shrink-0 text-saffron-dark">Open HappyCow <ExternalLink size={14} /></a></div>
          </div>
        </section>

        <section id="festival" className="section-divider-bottom scroll-mt-24 py-12 lg:py-16">
          <div className="container-custom relative min-h-[500px] overflow-hidden rounded-[30px] bg-jade shadow-editorial-lift">
            <Image src="/images/redesign/vegetarian-thailand-festival.webp" alt="Families en bezoekers in witte kleding bij het Phuket Vegetarian Festival" fill sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#062d28]/95 via-[#062d28]/70 to-transparent" />
            <div className="relative z-10 flex min-h-[500px] max-w-xl flex-col justify-center px-7 py-12 text-white sm:px-11">
              <p className="eyebrow !text-saffron-light">Kin jay in Phuket</p>
              <h2 className="font-display text-[3.15rem] font-semibold leading-[0.9] tracking-[-0.04em]">Geen foodfestival met een religieus sausje.</h2>
              <p className="mt-5 text-sm font-medium leading-7 text-white/70">Het Phuket Vegetarian Festival is een Chinees-Thaise geloofstraditie van negen dagen, met onthouding, witte kleding, schrijnen en processies. Plant-based eten is zichtbaar, maar niet het volledige verhaal.</p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2"><div className="rounded-xl border border-white/14 bg-white/[0.08] p-4"><p className="text-[9px] font-extrabold text-saffron-light">WANNEER</p><p className="mt-2 text-xs leading-5 text-white/68">De Chinese maankalender bepaalt de periode. Controleer ieder jaar de officiële eventpagina.</p></div><div className="rounded-xl border border-white/14 bg-white/[0.08] p-4"><p className="text-[9px] font-extrabold text-saffron-light">HOUDING</p><p className="mt-2 text-xs leading-5 text-white/68">Volg aanwijzingen bij schrijnen, blokkeer geen processies en fotografeer rituelen terughoudend.</p></div></div>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-14 lg:py-20">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <div><p className="eyebrow">Leren koken</p><h2 className="heading-redesign">Vraag vóór je boekt wat “vegetarian option” betekent</h2><p className="mt-5 text-sm font-medium leading-7 text-charcoal/64">Een kookles kan precies laten zien waar pasta, bouillon en saus vandaan komen. Controleer of je een volledig plantaardig menu krijgt, of werkstations en ingrediënten worden gedeeld en welke taal de instructie gebruikt.</p><a href={klookHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-jade btn-jade-pattern mt-7 w-fit">Vergelijk kooklessen <ExternalLink size={15} className="text-saffron" /></a><AffiliateDisclosure className="mt-3 max-w-lg">Affiliate via Klook: wij kunnen commissie ontvangen zonder extra kosten voor jou. Controleer menu, ingrediënten, taal, locatie en annuleringsvoorwaarden bij de aanbieder.</AffiliateDisclosure></div>
            <aside className="rounded-[28px] border border-jade/10 bg-tonal p-7 shadow-editorial-card sm:p-9"><ChefHat size={28} className="text-jade" /><h3 className="mt-6 font-display text-[2rem] font-semibold leading-none text-jade">Vier vragen aan de aanbieder</h3><ul className="mt-6 grid gap-3 sm:grid-cols-2">{['Is het hele menu vegan?','Wordt currypasta zelf gemaakt?','Zijn wok en keukengerei gedeeld?','Kunnen allergenen worden uitgelegd?'].map((item) => <li key={item} className="flex gap-3 rounded-xl border border-jade/10 bg-white/75 p-4 text-xs font-extrabold leading-5 text-jade"><Check size={15} className="mt-0.5 shrink-0 text-saffron-dark" />{item}</li>)}</ul></aside>
          </div>
        </section>

        <section className="section-divider-bottom bg-[#0a332d] py-14 text-white lg:py-20">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <div><p className="eyebrow !text-saffron-light">Na je reis</p><h2 className="font-display text-[3.1rem] font-semibold leading-[0.9] tracking-[-0.04em]">Neem techniek mee, geen etiketbelofte.</h2><p className="mt-5 text-sm font-medium leading-7 text-white/64">Een algemeen Thais kookboek en stevige vijzel helpen smaaklagen begrijpen, maar zijn niet automatisch vegan. Pas recepten bewust aan en controleer pasta’s, sauzen en bouillon opnieuw.</p></div>
            <div><div className="grid gap-3 sm:grid-cols-2"><a href="/go/simple-thai-food-cookbook/" target="_blank" rel="noopener noreferrer nofollow sponsored" className="group grid min-h-28 grid-cols-[42px_1fr_34px] items-center gap-4 rounded-xl border border-white/13 bg-white/[0.065] p-5 transition hover:border-saffron/45"><BookOpen size={23} className="text-saffron-light" /><div><p className="text-xs font-extrabold">Simple Thai Food</p><p className="mt-1 text-[10px] font-medium leading-5 text-white/54">Algemeen kookboek; controleer en vervang dierlijke ingrediënten per recept.</p></div><ExternalLink size={14} className="text-saffron-light" /></a><a href="/go/thai-granite-mortar-eight-inch/" target="_blank" rel="noopener noreferrer nofollow sponsored" className="group grid min-h-28 grid-cols-[42px_1fr_34px] items-center gap-4 rounded-xl border border-white/13 bg-white/[0.065] p-5 transition hover:border-saffron/45"><ShoppingBag size={23} className="text-saffron-light" /><div><p className="text-xs font-extrabold">Granieten vijzel</p><p className="mt-1 text-[10px] font-medium leading-5 text-white/54">Voor currypasta en textuur; controleer maat, gewicht en werkbladbescherming.</p></div><ExternalLink size={14} className="text-saffron-light" /></a></div><AffiliateDisclosure className="mt-4 !text-white/54">Amazon-affiliatelinks via onze centrale <strong className="text-white/72">/go/</strong>-router. Als Amazon-partner verdienen wij aan in aanmerking komende aankopen, zonder extra kosten voor jou. OneLink kan naar een lokale winkel sturen; product, prijs en beschikbaarheid verschillen per land.</AffiliateDisclosure></div>
          </div>
        </section>

        <section className="section-divider-bottom py-14 lg:py-20">
          <div className="container-custom grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div><p className="eyebrow">Medische grens</p><h2 className="heading-redesign">Vegan is geen allergenenvrij</h2><p className="mt-5 text-sm font-medium leading-7 text-charcoal/64">Bij een ernstige allergie is deze reisgids geen persoonlijk medisch advies. Bespreek je noodplan en medicatie vooraf met een bevoegde zorgprofessional.</p></div>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-jade/10 bg-jade/10 md:grid-cols-3"><article className="bg-white p-6"><AlertTriangle size={22} className="text-saffron-dark" /><h3 className="mt-5 font-display text-[1.6rem] font-semibold text-jade">Ingrediënt</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/62">Noem het allergeen en afgeleide sauzen, pasta’s of bouillons.</p></article><article className="bg-mist p-6"><Store size={22} className="text-jade" /><h3 className="mt-5 font-display text-[1.6rem] font-semibold text-jade">Bereiding</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/62">Vraag naar gedeelde wok, olie, mes, werkvlak en serveerlepel.</p></article><article className="bg-jade p-6 text-white"><ShieldCheck size={22} className="text-saffron-light" /><h3 className="mt-5 font-display text-[1.6rem] font-semibold">Besluit</h3><p className="mt-3 text-xs font-medium leading-6 text-white/68">Kan de keuken de vraag niet uitleggen, kies dan een andere eetplek.</p><a href="https://www.foodallergy.org/resources/food-allergy-chef-cards" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-xs font-extrabold text-saffron-light">Chef cards van FARE <ExternalLink size={13} /></a></article></div>
          </div>
        </section>

        <FaqSplitSection id="vragen" eyebrow="Echte zoekvragen" title="Veelgestelde vragen over vegetarisch eten in Thailand" description="De vragen hieronder zijn letterlijk aangetroffen in Nederlandse zoekresultaten. De antwoorden maken verschil tussen beschikbaarheid, receptuur en medische zekerheid." items={faqItems} />

        <RelatedGuidesSection eyebrow="Verder proeven" title="Bouw je foodroute verder uit" guides={[
          { title: 'Eten in Thailand', description: 'Kies gerechten, regio’s, streetfood en een bestelvorm die bij je reis past.', href: '/food/', image: '/images/redesign/thailand-food-hub-hero.webp' },
          { title: 'Thaise curry kiezen', description: 'Vergelijk groen, rood, geel, massaman en panang en controleer de currypasta.', href: '/blog/thai-curry-guide-green-red-yellow-massaman-panang/', image: '/images/redesign/thai-curry-guide-hero.webp' },
          { title: '7-Eleven Thailand', description: 'Controleer etiketten, koeling, ingrediënten en een praktisch reismandje.', href: '/travel-guides/7-eleven-thailand/', image: '/images/redesign/seven-eleven-thailand-food.webp' },
        ]} sideLink={{ label: 'Bekijk Thaise gerechten', href: '/food/' }} />

        <SourceMethodSection title="Research vóór geruststelling" description="Laatst inhoudelijk gecontroleerd op 26 juli 2026. We combineerden zelfstandige Nederlandse DFS-, SERP-, concurrent- en PAA-research met Thaise toerisme-, cultuur- en overheidsbronnen. Restaurantaanbod en festivaldata veranderen; dieet en allergie blijven persoonlijke grenzen die je ter plekke opnieuw controleert." sources={sources} />
      </main>
    </>
  );
}
