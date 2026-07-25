import Image from 'next/image';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  AlertTriangle,
  ArrowRight,
  ChefHat,
  CircleHelp,
  ExternalLink,
  Flame,
  Languages,
  Leaf,
  ListChecks,
  Nut,
  Scale,
  ShoppingBasket,
  Soup,
  Sparkles,
  UtensilsCrossed,
  WheatOff,
} from 'lucide-react';
import { KLOOK_GENERIC, withPlacementSubId } from '../../lib/affiliates';
import type { AmazonAffiliateSlug } from '../../lib/amazon-affiliates';
import { useSubId } from '../../lib/useSubId';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav, type PageSectionNavItem } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';

const PAGE_URL = 'https://go2-thailand.com/nl/blog/thai-curry-guide-green-red-yellow-massaman-panang/';
const HERO_IMAGE = '/images/redesign/thai-curry-guide-hero.webp';
const PAGE_TITLE = 'Thaise curry kiezen: groen, rood, geel, massaman of panang';
const PAGE_DESCRIPTION = 'Vergelijk vijf bekende Thaise curry’s op smaak, textuur, pit en allergenen. Met besteltips, Thaise zinnen en een praktische kookgids.';

interface CurryProfile {
  id: string;
  name: string;
  thai?: string;
  cue: string;
  profile: string;
  texture: string;
  common: string;
  check: string;
  icon: LucideIcon;
  colorClass: string;
}

const curries: CurryProfile[] = [
  {
    id: 'groen',
    name: 'Groene curry',
    thai: 'แกงเขียวหวาน',
    cue: 'Fris en kruidig',
    profile: 'Groene chili, Thaise basilicum en verse aromaten geven vaak een helder, kruidig profiel. Kokosmelk rondt de saus meestal af.',
    texture: 'Meestal vloeibaar tot romig',
    common: 'Kip, aubergine, bamboe, basilicum',
    check: 'De groene kleur zegt niet automatisch dat dit de heetste optie is.',
    icon: Leaf,
    colorClass: 'bg-[#dfe9d9] text-[#245b42]',
  },
  {
    id: 'rood',
    name: 'Rode curry',
    thai: 'แกงเผ็ด',
    cue: 'Rond en chili-kruidig',
    profile: 'Gedroogde rode chili geeft kleur en diepte. De smaak kan hartig, aromatisch en vol zijn zonder per definitie extreem pittig te worden.',
    texture: 'Romig en goed schenkbaar',
    common: 'Kip, rund, eend, pompoen, bamboe',
    check: 'Vraag naar de bereiding van die dag; de chilidosis verschilt per keuken.',
    icon: Flame,
    colorClass: 'bg-[#f2ded4] text-[#994629]',
  },
  {
    id: 'geel',
    name: 'Gele curry',
    thai: 'แกงกะหรี่',
    cue: 'Warm en aards',
    profile: 'Kurkuma en warme specerijen vallen vaak eerder op dan verse kruiden. De saus voelt herkenbaar en toegankelijk, maar mild is geen garantie.',
    texture: 'Zacht en romig',
    common: 'Kip, aardappel, ui, vis',
    check: 'Proef of vraag; ook een gele curry kan royaal chili bevatten.',
    icon: Sparkles,
    colorClass: 'bg-[#f4e7bd] text-[#855d11]',
  },
  {
    id: 'massaman',
    name: 'Massaman',
    thai: 'มัสมั่น',
    cue: 'Warm, zoet-hartig en gekruid',
    profile: 'Kaneel, kardemom, komijn en andere droge specerijen geven een diep, warm profiel. Aardappel, ui en pinda komen vaak voor.',
    texture: 'Vol, zacht en stoofachtig',
    common: 'Rund of kip, aardappel, ui, pinda',
    check: 'Pinda en vissaus kunnen aanwezig zijn; controleer allergenen altijd apart.',
    icon: Nut,
    colorClass: 'bg-[#e8d9c9] text-[#6f4932]',
  },
  {
    id: 'panang',
    name: 'Panang',
    thai: 'พะแนง',
    cue: 'Dik, geconcentreerd en aromatisch',
    profile: 'Een ingekookte kokosbasis, currypasta en makrut-limoenblad leveren vaak een rijke, geurige saus die dichter om het hoofdingrediënt zit.',
    texture: 'Dik en minder soepachtig',
    common: 'Vlees, makrut-limoenblad, kokosroom',
    check: 'Pinda kan in pasta of garnering zitten, maar recepten verschillen.',
    icon: Soup,
    colorClass: 'bg-[#ead6c3] text-[#824829]',
  },
];

const navItems: PageSectionNavItem[] = [
  { href: '#kiezen', label: 'Kiezen', icon: ListChecks },
  { href: '#vergelijken', label: 'Vergelijken', icon: Scale },
  { href: '#currypasta', label: 'Currypasta', icon: ChefHat },
  { href: '#bestellen', label: 'Bestellen', icon: Languages },
  { href: '#allergenen', label: 'Allergenen', icon: AlertTriangle },
  { href: '#thuis', label: 'Thuis koken', icon: ShoppingBasket },
  { href: '#vragen', label: 'Vragen', icon: CircleHelp },
];

const faqs = [
  {
    question: 'Wat zit er in een Thaise curry?',
    answer: 'Een Thaise curry begint meestal met currypasta: chili, sjalot, knoflook, citroengras, galanga, specerijen en soms garnalenpasta worden fijngemalen. De kok bakt de pasta aan en bouwt de saus op met bijvoorbeeld kokosmelk, bouillon, vissaus, palmsuiker, kruiden, groenten en een hoofdingrediënt. De precieze combinatie verschilt sterk per curry en per keuken.',
  },
  {
    question: 'Wat is het verschil tussen rode en groene Thaise curry?',
    answer: 'Het duidelijkste verschil zit in de currypasta. Groene curry gebruikt doorgaans groene chili en verse groene kruiden; rode curry krijgt zijn kleur vooral van gedroogde rode chili. Daardoor smaakt groen vaak frisser en kruidiger en rood ronder en dieper. Kleur alleen voorspelt de pittigheid niet betrouwbaar.',
  },
  {
    question: 'Welke Thaise curry is het mildst?',
    answer: 'Massaman en sommige gele curry’s worden vaak als zachter ervaren omdat warme specerijen, aardappel en een romige saus de chili minder centraal zetten. Dat is geen vaste regel. Vraag in het restaurant welke curry die dag het minst pittig is en leg uit dat je weinig of geen chili wilt.',
  },
  {
    question: 'Welke Thaise curry is het pittigst?',
    answer: 'Er bestaat geen betrouwbare universele winnaar. Groene curry kan zeer pittig zijn, maar een rode curry kan door meer chili heter uitvallen. De hoeveelheid en soort chili, de pasta en de kok bepalen de werkelijke hitte. Gebruik de kleur dus niet als warmtemeter.',
  },
  {
    question: 'Wat is het verschil tussen panang en rode curry?',
    answer: 'Panang is doorgaans dikker, meer ingekookt en geconcentreerder dan een gewone rode curry. Makrut-limoenblad en kokosroom vallen vaak op, terwijl de saus minder vloeibaar is. Beide kunnen op rode chili gebaseerde pasta gebruiken; samenstelling en pit verschillen per recept.',
  },
  {
    question: 'Waar smaakt massaman curry naar?',
    answer: 'Massaman smaakt doorgaans warm, kruidig, licht zoet en hartig. Specerijen als kaneel, kardemom, komijn, kruidnagel en steranijs kunnen aanwezig zijn, naast kokosmelk, aardappel, ui en vaak pinda. Het profiel is eerder stoofachtig dan fris-kruidig.',
  },
  {
    question: 'Bevat Thaise curry altijd kokosmelk?',
    answer: 'Nee. Kokosmelk is gebruikelijk in veel centrale en zuidelijke curries, waaronder veel groene, rode, gele, massaman- en panangbereidingen. De Thaise categorie gaeng is breder en omvat ook waterige, kruidige of regionale curry’s zonder kokosmelk. Vraag bij allergie altijd naar het specifieke gerecht.',
  },
  {
    question: 'Kan ik vegetarische Thaise curry bestellen?',
    answer: 'Vaak wel, maar groenten of tofu maken een curry niet automatisch vegetarisch. Currypasta kan garnalenpasta bevatten en de saus kan vissaus of bouillon bevatten. Vraag expliciet naar alle drie en houd rekening met gedeelde pannen, lepels en werkvlakken.',
  },
  {
    question: 'Hoe bestel ik een curry minder pittig?',
    answer: 'Phet nit noi betekent “een beetje pittig” en mai phet betekent “niet pittig”. Bij curry uit een gezamenlijke pan kan de basis al chili bevatten en niet volledig worden aangepast. Vraag daarom welke curry daadwerkelijk het minst pittig is, in plaats van alleen een standaardzin te gebruiken.',
  },
  {
    question: 'Wat zijn veelgemaakte fouten bij het maken van Thaise curry?',
    answer: 'Te veel tegelijk veranderen, de pasta niet goed aanbakken, kokosmelk hard laten koken en alle smaakmakers aan het begin toevoegen zijn bekende valkuilen. Bouw in lagen: pasta, vloeistof, hoofdingrediënt, groenten en pas aan het einde de balans tussen zout, zoet, zuur en pittig aan.',
  },
];

const sources = [
  {
    title: 'Central Thai cuisine: coconut milk and curry traditions',
    creator: 'Thailand Foundation',
    url: 'https://thailandfoundation.or.th/central-thai-cuisine-opening/',
    note: 'Context over centrale Thaise keuken, kokosmelk en bekende curries zoals groene curry en massaman.',
  },
  {
    title: 'Phanaeng curry: ingredients, texture and culinary context',
    creator: 'Thailand Foundation',
    url: 'https://thailandfoundation.or.th/phanaeng-curry-a-thai-culinary-delight/',
    note: 'Achtergrond bij het geconcentreerde karakter en de aromaten van phanaeng.',
  },
  {
    title: 'Gaeng massaman nua',
    creator: 'Thailand Foundation / Ministry of Foreign Affairs',
    url: 'https://thailandfoundation.or.th/gaeng-masssaman-nua-3/',
    note: 'Culturele en culinaire context voor massaman vanuit een Thaise publieke bron.',
  },
  {
    title: 'Thai SELECT restaurant certification',
    creator: 'Department of International Trade Promotion',
    url: 'https://www.thaiselect.com/news/detail/130',
    note: 'Uitleg over het officiële Thai SELECT-keurmerk voor Thaise restaurants buiten Thailand.',
  },
];

const amazonProducts: Array<{ amazonSlug: AmazonAffiliateSlug; title: string; reason: string }> = [
  {
    amazonSlug: 'thai-granite-mortar-eight-inch',
    title: 'Granieten vijzel',
    reason: 'Voor wie currypasta echt wil stampen; zwaar en vooral geschikt voor een vaste keukenplek.',
  },
  {
    amazonSlug: 'zojirushi-six-cup-rice-cooker',
    title: 'Zojirushi rijstkoker',
    reason: 'Een eenvoudige aparte rijstroute; controleer capaciteit, netspanning en lokale uitvoering.',
  },
  {
    amazonSlug: 'simple-thai-food-cookbook',
    title: 'Simple Thai Food',
    reason: 'Een kookboek van Leela Punyaratabandhu voor techniek, context en thuiskoken.',
  },
];

function createSchemas() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${PAGE_URL}#article`,
      headline: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      image: `https://go2-thailand.com${HERO_IMAGE}`,
      datePublished: '2026-05-06',
      dateModified: '2026-07-25',
      inLanguage: 'nl-NL',
      mainEntityOfPage: PAGE_URL,
      author: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
      publisher: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/nl/' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://go2-thailand.com/nl/blog/' },
        { '@type': 'ListItem', position: 3, name: 'Thaise curry kiezen', item: PAGE_URL },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Vijf bekende soorten Thaise curry',
      itemListElement: curries.map((curry, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: curry.name,
        description: `${curry.cue}. ${curry.profile}`,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Go2Thailand',
      url: 'https://go2-thailand.com/',
      logo: 'https://go2-thailand.com/images/brand/go2thailand-logo-2026.png',
    },
  ];
}

export function ThaiCurryGuide() {
  const subId = useSubId();
  const cookingClassHref = withPlacementSubId(KLOOK_GENERIC, subId, 'thai-curry-guide-cooking-class');
  const schemas = createSchemas();

  return (
    <>
      <SEOHead title={PAGE_TITLE} description={PAGE_DESCRIPTION} ogImage={`https://go2-thailand.com${HERO_IMAGE}`}>
        <meta name="keywords" content="thaise curry, thaise curry soorten, groene of rode curry, gele curry, massaman curry, panang curry, thaise curry bestellen" />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content="2026-05-06" />
        <meta property="article:modified_time" content="2026-07-25" />
        {schemas.map((schema) => <script key={schema['@type']} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      </SEOHead>

      <main className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          image={HERO_IMAGE}
          imageAlt="Vijf kommen Thaise curry bij een eetkraam aan de rivier in Bangkok"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Eten', href: '/food/' }, { label: 'Thaise curry' }]}
          eyebrow="Van menukaart naar juiste kom"
          title={<>Thaise curry.</>}
          subtitle={<>Welke kom past bij jou?</>}
          description={<>Groen, rood, geel, massaman of panang: kies op smaak en textuur, niet alleen op kleur. Deze gids helpt je vergelijken, bestellen en veilig navragen.</>}
          actions={[
            { label: 'Kies jouw curry', href: '#kiezen', kind: 'primary' },
            { label: 'Leer bestellen', href: '#bestellen', kind: 'secondary' },
          ]}
          minHeightClassName="min-h-[800px] lg:min-h-[720px]"
          contentClassName="max-w-[650px]"
          titleClassName="max-w-[650px] text-[4.15rem] leading-[0.84] sm:text-[5.2rem] lg:text-[6rem]"
          subtitleClassName="max-w-[620px] text-[2.15rem] leading-[0.92] text-saffron-dark sm:text-[3rem]"
          imageClassName="object-cover object-[72%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.12)_0%,rgba(252,250,246,0.62)_48%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.99)_0%,rgba(252,250,246,0.94)_38%,rgba(252,250,246,0.22)_65%,rgba(18,63,54,0.08)_100%)]"
          sideCard={(
            <aside className="absolute bottom-8 right-[max(2rem,calc((100vw-1240px)/2))] z-10 hidden w-[320px] overflow-hidden rounded-2xl border border-white/65 bg-white/84 shadow-editorial-lift backdrop-blur-xl xl:block">
              <div className="flex items-center justify-between border-b border-jade/10 px-5 py-4">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-saffron-dark">Snelle smaakroute</p>
                <span className="grid h-9 w-9 place-items-center rounded-full border border-saffron/30 bg-canvas"><ChefHat size={17} className="text-jade" /></span>
              </div>
              <div className="space-y-3 p-5 text-[11px] font-bold text-jade">
                <p className="flex items-center justify-between"><span>Fris & kruidig</span><span className="text-saffron-dark">Groen</span></p>
                <p className="flex items-center justify-between"><span>Warm & zacht</span><span className="text-saffron-dark">Massaman</span></p>
                <p className="flex items-center justify-between"><span>Dik & rijk</span><span className="text-saffron-dark">Panang</span></p>
              </div>
              <p className="border-t border-jade/10 px-5 py-4 text-[10px] font-medium leading-4 text-charcoal/58">Pit varieert per recept en kok. Vraag altijd naar de bereiding van vandaag.</p>
            </aside>
          )}
        />

        <PageSectionNav items={navItems} />

        <section id="kiezen" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:items-end">
              <SectionHeading
                eyebrow="Begin bij smaak"
                title={<>Vijf curries.<br />Vijf andere routes.</>}
                description={<>“Thaise curry” is geen enkel vast gerecht. Currypasta, vloeistof, kruiden en bereidingswijze bepalen samen wat er in je kom gebeurt. Gebruik deze profielen als startpunt en laat het restaurant de actuele pit en ingrediënten bevestigen.</>}
              />
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-jade/10 bg-tonal p-5"><Leaf size={23} className="text-jade" /><strong className="mt-5 block font-display text-2xl text-jade">Fris</strong><p className="mt-2 text-xs leading-5 text-charcoal/62">Kies groen als basilicum en verse aromaten je aanspreken.</p></div>
                <div className="rounded-2xl border border-jade/10 bg-tonal p-5"><Sparkles size={23} className="text-jade" /><strong className="mt-5 block font-display text-2xl text-jade">Warm</strong><p className="mt-2 text-xs leading-5 text-charcoal/62">Kies geel of massaman voor kurkuma en droge specerijen.</p></div>
                <div className="rounded-2xl border border-jade/10 bg-tonal p-5"><Soup size={23} className="text-jade" /><strong className="mt-5 block font-display text-2xl text-jade">Rijk</strong><p className="mt-2 text-xs leading-5 text-charcoal/62">Kies panang voor een dikkere, geconcentreerde saus.</p></div>
              </div>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {curries.map((curry) => {
                const Icon = curry.icon;
                return (
                  <article key={curry.id} className="group flex min-h-[340px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card transition hover:-translate-y-1 hover:shadow-editorial-lift">
                    <span className={`grid h-12 w-12 place-items-center rounded-xl ${curry.colorClass}`}><Icon size={23} strokeWidth={1.55} /></span>
                    <p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">{curry.cue}</p>
                    <h2 className="mt-2 font-display text-[1.7rem] font-semibold leading-none text-jade">{curry.name}</h2>
                    {curry.thai ? <p lang="th" className="mt-2 text-xs font-bold text-charcoal/46">{curry.thai}</p> : null}
                    <p className="mt-4 text-xs font-medium leading-5 text-charcoal/66">{curry.profile}</p>
                    <a href={`#${curry.id}`} className="mt-auto inline-flex items-center gap-2 pt-5 text-[10px] font-extrabold text-jade">Bekijk profiel <ArrowRight size={12} className="text-saffron" /></a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-divider-bottom bg-tonal py-12 lg:py-16">
          <div className="container-custom">
            <div className="overflow-hidden rounded-[28px] bg-jade text-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[0.7fr_1.3fr]">
                <div className="p-8 sm:p-10">
                  <p className="eyebrow !text-saffron-light">Belangrijkste misverstand</p>
                  <h2 className="font-display text-[3.1rem] font-semibold leading-[0.9] tracking-[-0.04em]">Kleur is geen<br />warmtemeter.</h2>
                </div>
                <div className="grid gap-6 border-white/10 bg-white/[0.055] p-8 sm:grid-cols-3 sm:p-10">
                  <div><span className="grid h-10 w-10 place-items-center rounded-full border border-saffron/35 text-saffron-light"><Flame size={18} /></span><strong className="mt-4 block text-sm">Chili</strong><p className="mt-2 text-xs leading-5 text-white/62">Soort, hoeveelheid en verwerking bepalen de hitte.</p></div>
                  <div><span className="grid h-10 w-10 place-items-center rounded-full border border-saffron/35 text-saffron-light"><Soup size={18} /></span><strong className="mt-4 block text-sm">Saus</strong><p className="mt-2 text-xs leading-5 text-white/62">Vet, zoet en vocht veranderen hoe pittigheid aanvoelt.</p></div>
                  <div><span className="grid h-10 w-10 place-items-center rounded-full border border-saffron/35 text-saffron-light"><ChefHat size={18} /></span><strong className="mt-4 block text-sm">Keuken</strong><p className="mt-2 text-xs leading-5 text-white/62">Een gedeelde pan is vaak niet meer volledig aanpasbaar.</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="vergelijken" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading
              eyebrow="Naast elkaar"
              title="Vergelijk op profiel, niet op een hittecijfer"
              description="Een vaste schaal van één tot vijf pepers lijkt handig, maar doet alsof iedere keuken hetzelfde recept gebruikt. Deze tabel helpt je met kenmerken die beter te herkennen en te bespreken zijn."
            />
            <div className="mt-9 overflow-x-auto rounded-2xl border border-jade/10 bg-white shadow-editorial-card">
              <table className="min-w-[980px] w-full border-collapse text-left">
                <caption className="sr-only">Vergelijking van groene, rode, gele, massaman- en panangcurry</caption>
                <thead className="bg-jade text-white">
                  <tr className="text-[10px] uppercase tracking-[0.12em]"><th scope="col" className="p-5">Curry</th><th scope="col" className="p-5">Smaakrichting</th><th scope="col" className="p-5">Textuur</th><th scope="col" className="p-5">Komt vaak samen met</th><th scope="col" className="p-5">Vraag na</th></tr>
                </thead>
                <tbody className="divide-y divide-jade/10">
                  {curries.map((curry) => (
                    <tr id={curry.id} key={curry.id} className="scroll-mt-28 align-top">
                      <th scope="row" className="p-5"><span className="font-display text-xl font-semibold text-jade">{curry.name}</span><span className="mt-1 block text-[10px] font-bold text-saffron-dark">{curry.cue}</span></th>
                      <td className="p-5 text-xs font-medium leading-5 text-charcoal/66">{curry.profile}</td>
                      <td className="p-5 text-xs font-bold leading-5 text-jade">{curry.texture}</td>
                      <td className="p-5 text-xs font-medium leading-5 text-charcoal/66">{curry.common}</td>
                      <td className="p-5 text-xs font-medium leading-5 text-charcoal/66">{curry.check}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-[10px] font-medium leading-5 text-charcoal/52">“Vaak” is bewust geen ingrediëntengarantie. Menu, regio, kok en dieetversie veranderen het gerecht.</p>
          </div>
        </section>

        <section className="section-divider-bottom bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.66fr_1.34fr] lg:items-end">
              <SectionHeading
                eyebrow="De plek bepaalt het gesprek"
                title={<>Dezelfde curry.<br />Een ander bestelmoment.</>}
                description="Een kom op een restaurantmenu, een schaal bij een rijstkraam en een eigen pan tijdens een kookles vragen om een andere aanpak. Als je eerst herkent waar je eet, weet je ook welke vragen nog zin hebben."
              />
              <div className="rounded-2xl border border-jade/10 bg-white p-6 sm:p-8">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">Het woord gaeng</p>
                <p className="mt-3 text-sm font-medium leading-7 text-charcoal/70">In Nederlandse menukaarten wordt bijna alles als “curry” vertaald. Het Thaise <span lang="th" className="font-bold text-jade">แกง</span> — vaak geschreven als gaeng of kaeng — is breder. Het kan gaan om een romige kokoscurry, een heldere kruidige soep, een regionale bereiding of een stoofachtige saus. Verwacht daarom niet dat iedere gaeng op de vijf bekende kleuren lijkt. De concrete gerechtnaam vertelt meer dan het Engelse woord “curry”.</p>
              </div>
            </div>

            <div className="relative mt-10">
              <div className="absolute left-[8%] right-[8%] top-7 hidden border-t-2 border-dotted border-saffron/55 lg:block" aria-hidden="true" />
              <div className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {[
                  [ShoppingBasket, 'Khao-gaengkraam', 'Kijken, aanwijzen, combineren', 'De curries staan vaak al klaar in metalen schalen. Je ziet de kleur en ingrediënten, maar de pasta en saus zijn meestal vooraf bereid. Vraag welke schaal weinig pittig is en wat er zichtbaar én onzichtbaar in zit. Een portie over rijst maakt vergelijken eenvoudig, maar een ernstige allergie blijft lastig door gedeelde lepels en werkruimte.'],
                  [UtensilsCrossed, 'Foodcourt', 'Meer keuze, korte uitleg', 'Foodcourts combineren de snelheid van een kraam met duidelijkere menu’s en soms foto’s of Engelse labels. Bestel per loket, controleer of rijst in de prijs zit en houd je betaalkaart of couponsysteem apart. De medewerker kan vaak een verse portie afmaken, maar een basispasta of gezamenlijke pan is niet automatisch aanpasbaar.'],
                  [Soup, 'À-la-carte restaurant', 'Delen en balans bouwen', 'Een curry wordt hier vaker als schaal voor de tafel geserveerd. Bestel rijst en combineer de curry met een minder pittig gerecht, groenten of een omelet. Vraag vóór het bestellen naar portiegrootte en aanpasbaarheid. Een tafelbestelling draait om balans: niet iedere persoon heeft een eigen kom en niet ieder gerecht hoeft dezelfde smaakrichting te hebben.'],
                  [ChefHat, 'Kookles', 'Techniek zien en zelf proeven', 'Tijdens een kookles kun je pasta, kokosbasis en smaakcorrecties los van elkaar ervaren. Controleer vooraf welke gerechten je maakt, of je een pasta helemaal zelf stampt en hoe dieetwensen worden behandeld. Een les is vooral waardevol als de docent uitlegt waarom je iets doet; een receptenboekje alleen levert die sensorische referentie niet.'],
                ].map(([Icon, title, cue, text], index) => {
                  const IconComponent = Icon as LucideIcon;
                  return (
                    <article key={String(title)} className="relative flex min-h-[330px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                      <span className="relative z-10 grid h-14 w-14 place-items-center rounded-full border border-saffron/35 bg-canvas text-jade"><IconComponent size={22} strokeWidth={1.45} /></span>
                      <span className="absolute right-5 top-5 font-display text-3xl text-jade/10">0{index + 1}</span>
                      <h3 className="mt-6 font-display text-[1.65rem] font-semibold leading-none text-jade">{String(title)}</h3>
                      <p className="mt-2 text-[9px] font-extrabold uppercase tracking-[0.12em] text-saffron-dark">{String(cue)}</p>
                      <p className="mt-4 text-xs font-medium leading-5 text-charcoal/65">{String(text)}</p>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 grid gap-6 overflow-hidden rounded-[26px] bg-jade p-7 text-white sm:p-9 lg:grid-cols-[0.72fr_1.28fr]">
              <div><p className="eyebrow !text-saffron-light">Met twee of meer</p><h2 className="font-display text-[2.9rem] font-semibold leading-[0.9] tracking-[-0.035em]">Bouw een tafel, geen hittewedstrijd.</h2></div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-white/12 bg-white/[0.06] p-5"><strong className="text-sm">Eén herkenbaar</strong><p className="mt-2 text-[11px] leading-5 text-white/60">Kies een profiel waarvan je ongeveer weet wat je verwacht. Dat geeft rust als de tweede curry uitgesprokener blijkt.</p></div>
                <div className="rounded-xl border border-white/12 bg-white/[0.06] p-5"><strong className="text-sm">Eén nieuw</strong><p className="mt-2 text-[11px] leading-5 text-white/60">Voeg een andere textuur of specerijenrichting toe, bijvoorbeeld groen naast massaman of rood naast panang.</p></div>
                <div className="rounded-xl border border-white/12 bg-white/[0.06] p-5"><strong className="text-sm">Eén tegengewicht</strong><p className="mt-2 text-[11px] leading-5 text-white/60">Bestel rijst en een rustig gerecht. Zo hoeft niemand extra suiker of kokosmelk aan de curry toe te voegen om de pit te dempen.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="currypasta" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
            <div className="relative min-h-[430px] overflow-hidden rounded-[28px] shadow-editorial-lift sm:min-h-[560px]">
              <Image src="/images/redesign/thai-curry-paste.webp" alt="Thaise kok maalt rode currypasta in een granieten vijzel met verse aromaten ernaast" fill sizes="(max-width: 1024px) 100vw, 52vw" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-jade/80 to-transparent p-7 pt-24 text-white">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-light">De basis onder de kleur</p>
                <p className="mt-2 max-w-md text-xs font-medium leading-5 text-white/75">In een vijzel worden vezels gekneusd en aromatische oliën losgemaakt. Een keukenmachine werkt anders, maar kan thuis wel een praktische route zijn.</p>
              </div>
            </div>
            <div>
              <SectionHeading
                eyebrow="Zo wordt smaak opgebouwd"
                title="Currypasta is een systeem, geen verf"
                description="Rood, groen of geel beschrijft een zichtbaar kenmerk. Het karakter ontstaat uit de verhouding tussen chili, aromaten, specerijen, zoute componenten en de manier waarop de pasta wordt gebakken."
              />
              <div className="mt-8 space-y-4">
                {[
                  ['01', 'Aromatische basis', 'Sjalot, knoflook, citroengras, galanga en citrusachtige schil leveren geur en structuur. Niet iedere pasta gebruikt precies dezelfde set.'],
                  ['02', 'Chili en specerijen', 'Verse of gedroogde chili, kurkuma, korianderzaad en komijn verschuiven kleur, warmte en diepte. Meer kleur betekent niet automatisch meer hitte.'],
                  ['03', 'Hartig en rond', 'Garnalenpasta, zout, vissaus, palmsuiker en kokos kunnen de smaken verbinden. Dit is ook waar dieet- en allergenenvragen belangrijk worden.'],
                ].map(([step, title, text]) => (
                  <article key={step} className="grid grid-cols-[48px_1fr] gap-4 rounded-2xl border border-jade/10 bg-white p-5">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-jade font-display text-xl text-saffron-light">{step}</span>
                    <div><h3 className="font-display text-xl font-semibold text-jade">{title}</h3><p className="mt-2 text-xs font-medium leading-5 text-charcoal/64">{text}</p></div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="bestellen" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
              <div>
                <SectionHeading
                  eyebrow="Aan kraam of tafel"
                  title="Bestel in vier heldere stappen"
                  description="Bij een khao-gaengkraam wijs je gerechten aan die vaak al klaarstaan. In een restaurant bestel je doorgaans een gerecht voor de tafel en rijst apart. In beide gevallen werkt concreet vragen beter dan aannemen."
                />
                <ol className="mt-8 space-y-5">
                  {[
                    ['Kies het profiel', 'Benoem eerst groen, rood, geel, massaman of panang en vraag wat er vandaag beschikbaar is.'],
                    ['Kies hoofdingrediënt en rijst', 'Controleer of kip, rund, tofu, vis of groenten daadwerkelijk in die bereiding kan en bestel rijst als die niet inbegrepen is.'],
                    ['Bespreek pittigheid', 'Phet nit noi (เผ็ดนิดหน่อย) is een beetje pittig; mai phet (ไม่เผ็ด) is niet pittig. Een bestaande pan kan al chili bevatten.'],
                    ['Controleer allergenen', 'Vraag afzonderlijk naar garnalenpasta, vissaus, pinda, schelpdieren en gedeelde bereiding. Alleen “vegetarisch” vragen is soms te vaag.'],
                  ].map(([title, text], index) => (
                    <li key={title} className="grid grid-cols-[42px_1fr] gap-4">
                      <span className="grid h-10 w-10 place-items-center rounded-full border border-saffron/45 bg-canvas text-sm font-extrabold text-saffron-dark">{index + 1}</span>
                      <div><h3 className="font-display text-[1.45rem] font-semibold leading-none text-jade">{title}</h3><p className="mt-2 text-xs font-medium leading-5 text-charcoal/64">{text}</p></div>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="relative min-h-[470px] overflow-hidden rounded-[28px] shadow-editorial-lift sm:min-h-[570px]">
                <Image src="/images/redesign/thai-curry-ordering.webp" alt="Reiziger bestelt Thaise curry bij een khao-gaengkraam" fill sizes="(max-width: 1024px) 100vw, 56vw" className="object-cover" />
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/25 bg-jade/88 p-5 text-white backdrop-blur-md sm:left-auto sm:w-[310px]">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-light">Nuttiger dan “mild”</p>
                  <p className="mt-2 font-display text-2xl font-semibold">Welke curry is vandaag het minst pittig?</p>
                  <p className="mt-2 text-[10px] leading-4 text-white/64">Daarmee vraag je naar de bestaande bereiding, niet naar een aanpassing die misschien niet kan.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-12 lg:py-16">
          <div className="container-custom">
            <div className="grid gap-7 rounded-[26px] border border-jade/10 bg-white p-7 shadow-editorial-card sm:p-9 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <p className="eyebrow">Ook nuttig in Nederland</p>
                <h2 className="font-display text-[2.8rem] font-semibold leading-[0.92] tracking-[-0.035em] text-jade">Een goede curry hoeft niets te bewijzen met extra chili.</h2>
              </div>
              <div>
                <p className="text-sm font-medium leading-7 text-charcoal/70">Buiten Thailand worden namen, ingrediënten en pittigheid vaak aangepast aan lokaal aanbod en publiek. Dat maakt een gerecht niet automatisch “onecht”, maar het betekent wel dat de naam alleen onvoldoende informatie geeft. Een zorgvuldig restaurant kan uitleggen hoe de pasta, saus en dieetversies worden gemaakt. Zie spellingen als gaeng, kaeng en curry daarom als wegwijzers naar een gerecht, niet als vaste recepten met overal dezelfde uitkomst.</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="border-l-2 border-saffron/55 pl-4"><strong className="text-xs text-jade">Vraag naar het profiel</strong><p className="mt-2 text-[11px] leading-5 text-charcoal/60">“Fris en kruidig” of “warm en stoofachtig” levert meer op dan alleen vragen welke kleur populair is.</p></div>
                  <div className="border-l-2 border-saffron/55 pl-4"><strong className="text-xs text-jade">Lees de dieetdetails</strong><p className="mt-2 text-[11px] leading-5 text-charcoal/60">Een vegan symbool is nuttig, maar bij allergie blijven pasta, saus, garnering en kruiscontact vier aparte controles.</p></div>
                  <div className="border-l-2 border-saffron/55 pl-4"><strong className="text-xs text-jade">Zie een keurmerk als signaal</strong><p className="mt-2 text-[11px] leading-5 text-charcoal/60">Thai SELECT is een officieel kwaliteits- en authenticiteitssignaal buiten Thailand, geen persoonlijke smaakranglijst of allergenengarantie.</p></div>
                </div>
                <p className="mt-6 text-xs font-medium leading-6 text-charcoal/58">Gebruik je eerste curry buiten Thailand vooral om smaken te leren herkennen. Tijdens je reis kun je daarna bewust vergelijken hoe een marktkeuken, regionale kok of moderne eetzaak hetzelfde profiel anders opbouwt. Dat is interessanter dan één versie tot de enige juiste standaard verheffen.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="allergenen" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.66fr_1.34fr]">
              <SectionHeading
                eyebrow="Eerst navragen"
                title="Een groene curry is niet automatisch een groene keuze"
                description="Tofu, groenten en kokosmelk zeggen weinig over de volledige pasta, bouillon of gedeelde keuken. Bij een ernstige allergie is een ingrediëntenvraag geen formaliteit maar een beslismoment."
              />
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  [Nut, 'Pinda en noten', 'Massaman bevat vaak pinda; panang kan pinda in pasta of garnering hebben. Kruiscontact blijft mogelijk.'],
                  [Soup, 'Vis en schaaldieren', 'Vissaus en garnalenpasta kunnen onzichtbaar in de basis zitten, ook bij een gerecht dat vooral uit groenten bestaat.'],
                  [WheatOff, 'Gluten en soja', 'Sojasaus, bouillon, smaakmakers en gedeelde werkvlakken verschillen per keuken. Vraag naar merk of etiket als dat nodig is.'],
                  [AlertTriangle, 'Kokos en kruiscontact', 'Veel bekende curries gebruiken kokosmelk of -room. Lepels, wokken en pannen kunnen voor meerdere gerechten worden gebruikt.'],
                ].map(([Icon, title, text]) => {
                  const IconComponent = Icon as LucideIcon;
                  return (
                    <article key={String(title)} className="rounded-2xl border border-jade/10 bg-white p-6">
                      <IconComponent size={28} strokeWidth={1.4} className="text-jade" />
                      <h3 className="mt-5 font-display text-[1.65rem] font-semibold leading-none text-jade">{String(title)}</h3>
                      <p className="mt-3 text-xs font-medium leading-5 text-charcoal/65">{String(text)}</p>
                    </article>
                  );
                })}
              </div>
            </div>
            <div className="mt-9 grid gap-5 rounded-2xl border border-saffron/25 bg-[#fff6e8] p-6 sm:grid-cols-[auto_1fr] sm:p-8">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-saffron text-white"><AlertTriangle size={22} /></span>
              <div><h3 className="font-display text-2xl font-semibold text-jade">Bij een ernstige allergie</h3><p className="mt-2 max-w-4xl text-sm font-medium leading-7 text-charcoal/72">Gebruik een professioneel vertaalde allergiekaart, toon die vóór het bestellen en vraag of personeel ingrediënt én kruiscontact kan bevestigen. Kan de keuken dat niet, kies dan niet op basis van uiterlijk of een algemene “no problem”-reactie. Go2Thailand geeft hier praktische reiscontext, geen medisch advies.</p></div>
            </div>
          </div>
        </section>

        <section id="thuis" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="overflow-hidden rounded-[30px] bg-jade text-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
                <div className="relative min-h-[430px] lg:min-h-[650px]">
                  <Image src="/images/redesign/thai-curry-home-cooking.webp" alt="Reiziger kookt Thaise curry met een Thaise kookdocent" fill sizes="(max-width: 1024px) 100vw, 46vw" className="object-cover object-center" />
                  <div className="absolute inset-0 bg-gradient-to-t from-jade/80 via-transparent to-transparent" />
                  <div className="absolute bottom-7 left-7 right-7">
                    <p className="eyebrow !text-saffron-light">Van reisgeheugen naar techniek</p>
                    <h2 className="max-w-lg font-display text-[3.2rem] font-semibold leading-[0.9] tracking-[-0.04em]">Leer proeven vóór je een recept perfectioneert.</h2>
                  </div>
                </div>
                <div className="p-7 sm:p-10 lg:p-12">
                  <p className="text-sm font-medium leading-7 text-white/68">Een goede thuiskookroute begint niet met twintig speciale aankopen. Kies één curry, werk met een betrouwbare pasta of maal zelf, maak rijst apart en proef pas aan het einde de balans. Een kookles in Thailand helpt vooral omdat je geur, textuur en timing naast een docent ervaart.</p>
                  <a href={cookingClassHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-cream group mt-7 min-h-12 px-6 text-saffron-dark">Bekijk Thaise kooklessen op Klook <ExternalLink size={15} /></a>
                  <AffiliateDisclosure className="mt-3 !text-white/54">Affiliate: bij een boeking via Klook kunnen wij commissie ontvangen. Controleer menu, dieetopties, locatie, annulering en inclusies op de aanbiederpagina.</AffiliateDisclosure>

                  <div className="my-8 h-px bg-white/12" />
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-light">Compacte thuiskookkit via Amazon</p>
                  <div className="mt-4 space-y-3">
                    {amazonProducts.map(({ amazonSlug, title, reason }) => (
                      <a key={amazonSlug} href={`/go/${amazonSlug}/`} target="_blank" rel="noopener noreferrer nofollow sponsored" className="group grid grid-cols-[40px_1fr_34px] items-start gap-4 rounded-xl border border-white/13 bg-white/[0.065] p-4 transition hover:border-saffron/45 hover:bg-white/[0.1]">
                        <span className="grid h-10 w-10 place-items-center rounded-lg border border-saffron/35 text-saffron-light"><ShoppingBasket size={17} /></span>
                        <span><strong className="block text-xs text-white">{title}</strong><span className="mt-1 block text-[10px] leading-4 text-white/55">{reason}</span></span>
                        <span className="grid h-8 w-8 place-items-center rounded-lg border border-white/12 text-white/60 transition group-hover:text-saffron-light"><ExternalLink size={13} /></span>
                      </a>
                    ))}
                  </div>
                  <AffiliateDisclosure className="mt-4 !text-white/54">Amazon-affiliatelinks via onze centrale <strong className="text-white/72">/go/</strong>-router. Als Amazon-partner verdienen wij aan in aanmerking komende aankopen, zonder extra kosten voor jou. OneLink kan je doorsturen naar een lokale Amazon-winkel; product, prijs, verkoper en beschikbaarheid verschillen per land.</AffiliateDisclosure>
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-[0.58fr_1.42fr]">
              <SectionHeading eyebrow="Geen vijf losse recepten" title="Eén methode die je leert bijsturen" description="De zoekresultaten rond Thaise curry zijn sterk receptgedreven. Deze owner voorkomt overlap met onze afzonderlijke gerechtpagina’s en geeft je daarom een herbruikbare methode in plaats van vijf bijna gelijke recepten." />
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ['1. Bak de pasta', 'Verwarm vet of de dikkere kokosroom rustig en bak de pasta tot de rauwe geur verdwijnt. Laat knoflook en specerijen niet verbranden.'],
                  ['2. Bouw de saus', 'Voeg kokosmelk of een andere passende vloeistof in delen toe. Houd de saus levendig en voorkom onnodig hard doorkoken.'],
                  ['3. Plan de garing', 'Begin met ingrediënten die tijd nodig hebben. Voeg snelle groenten en verse kruiden pas later toe zodat textuur behouden blijft.'],
                  ['4. Balanceer op het einde', 'Proef zout, zoet, zuur en pittig samen met rijst. Corrigeer één richting tegelijk en noteer wat je verandert.'],
                ].map(([title, text]) => (
                  <article key={title} className="rounded-2xl border border-jade/10 bg-tonal p-6"><h3 className="font-display text-[1.55rem] font-semibold leading-none text-jade">{title}</h3><p className="mt-3 text-xs font-medium leading-5 text-charcoal/65">{text}</p></article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <FaqSplitSection
          eyebrow="Echte zoekvragen"
          title="Veelgestelde vragen over Thaise curry"
          description="Antwoorden op vragen die in de Nederlandse zoekresultaten daadwerkelijk rond dit onderwerp verschijnen."
          items={faqs}
        />

        <RelatedGuidesSection
          eyebrow="Verder proeven"
          title="Bouw je eigen foodroute"
          guides={[
            { title: 'Thaise gerechten', description: 'Ontdek gerechten buiten de bekende curry’s en bouw een gevarieerde eetlijst.', href: '/food/', image: '/images/redesign/thai-curry-guide-hero.webp', imageAlt: 'Verschillende Thaise curries aan een eetkraam' },
            { title: 'Streetfood in Thailand', description: 'Leer kiezen tussen kraam, foodcourt en markt zonder alles in één avond te proppen.', href: '/thailand-street-food/', image: '/images/redesign/thai-curry-ordering.webp', imageAlt: 'Bestellen bij een Thaise curry- en rijstkraam' },
            { title: 'Thaise kooklessen', description: 'Vergelijk steden en lesvormen als je technieken tijdens je reis wilt oefenen.', href: '/best-cooking-classes-in-thailand/', image: '/images/redesign/thai-curry-home-cooking.webp', imageAlt: 'Thaise kookles met reiziger en docent' },
          ]}
          sideLink={{ label: 'Bekijk kooklessen op Klook', href: cookingClassHref, affiliate: true }}
          disclosure="De externe Klook-link is gesponsord; de drie gidskaarten zijn redactionele interne links."
        />

        <SourceMethodSection
          eyebrow="Bronnen & redactionele methode"
          title="Smaaktaal met ruimte voor variatie"
          description="Deze gids combineert Thaise publieke cultuur- en handelsbronnen met zelfstandige Nederlandse zoek-, PAA- en concurrentieanalyse. We gebruiken bewust woorden als ‘vaak’ en ‘doorgaans’: curryrecepten zijn geen universele productspecificaties. Laatste inhoudelijke controle: 25 juli 2026."
          sources={sources}
        />

        <section className="py-12 lg:py-16">
          <div className="container-custom">
            <div className="flex flex-col gap-5 rounded-2xl border border-jade/10 bg-white p-7 sm:flex-row sm:items-center sm:justify-between">
              <div><p className="eyebrow">Klaar om te kiezen?</p><h2 className="font-display text-[2.6rem] font-semibold leading-none text-jade">Begin bij smaak. Vraag daarna naar pit.</h2></div>
              <div className="flex flex-wrap gap-3"><a href="#kiezen" className="btn-jade btn-jade-pattern group min-h-12 px-6">Vergelijk opnieuw <ArrowRight size={15} className="text-saffron" /></a><Link href="/food/" className="btn-cream min-h-12 px-6 text-saffron-dark">Bekijk alle gerechten <UtensilsCrossed size={15} /></Link></div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
