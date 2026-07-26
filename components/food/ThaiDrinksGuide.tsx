import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  ArrowRight,
  BookOpenCheck,
  ChevronRight,
  CircleHelp,
  Coffee,
  Droplets,
  ExternalLink,
  GlassWater,
  HeartHandshake,
  Languages,
  Leaf,
  Martini,
  Milk,
  PackageCheck,
  Route,
  ShieldCheck,
  Sparkles,
  Sun,
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

const PAGE_URL = 'https://go2-thailand.com/nl/drinks/';
const PAGE_TITLE = 'Thaise dranken: 25 drankjes om in Thailand te proeven';
const PAGE_DESCRIPTION = 'Ontdek 25 Thaise dranken: van cha yen, oliang en kokoswater tot Thais bier. Met smaakprofielen, bestelzinnen, wateradvies en actuele alcoholregels.';
const HERO_IMAGE = '/images/redesign/thai-drinks-hero.webp';

interface Drink {
  id: number;
  slug: string;
  name: { en: string; nl: string; thai: string };
  category: string;
  description: { en: string; nl: string };
  image: string;
  alcohol_content: string;
  caffeine: string;
}

interface ThaiDrinksGuideProps {
  drinks: Drink[];
}

const navItems: PageSectionNavItem[] = [
  { href: '#beginnen', label: 'Begin hier', icon: Sparkles },
  { href: '#smaakroute', label: 'Smaakroute', icon: Route },
  { href: '#alle-dranken', label: 'Alle 25', icon: GlassWater },
  { href: '#bestellen', label: 'Bestellen', icon: Languages },
  { href: '#veilig-drinken', label: 'Water & regels', icon: ShieldCheck },
  { href: '#vragen', label: 'Vragen', icon: CircleHelp },
];

const firstSips = [
  { slug: 'thai-iced-tea', label: 'Zoet & romig', why: 'De oranje klassieker met sterke thee, ijs en meestal melk. Vraag om minder zoet als je de thee beter wilt proeven.' },
  { slug: 'oliang', label: 'Donker & aromatisch', why: 'Traditionele Thaise ijskoffie met een krachtiger, gebrande smaak. Samenstelling en zoetheid verschillen per verkoper.' },
  { slug: 'coconut-water', label: 'Fris & eenvoudig', why: 'Een jonge kokosnoot is tegelijk drankje en rustmoment. Kies een exemplaar dat voor je wordt geopend.' },
  { slug: 'nam-manao', label: 'Zuur & verfrissend', why: 'Limoen, water, ijs en vaak suiker. Een goede tegenhanger van romige thee en koffie.' },
  { slug: 'nam-anchan', label: 'Kruidig & kleurrijk', why: 'Butterfly-pea-drank krijgt zijn opvallende kleur van vlindererwtbloem; limoen kan de tint zichtbaar veranderen.' },
  { slug: 'nam-matoom', label: 'Zacht & kruidig', why: 'Bael-fruit wordt gebruikt voor een geurende kruidendrank die warm of gekoeld kan verschijnen.' },
];

const tasteCompass = [
  { icon: Milk, title: 'Romig & zoet', cue: 'cha yen · nom yen', text: 'Begin hier als je van volle, dessertachtige smaken houdt. Gecondenseerde of geëvaporeerde melk komt vaak voor; vraag naar zuivel wanneer dat belangrijk is.' },
  { icon: Coffee, title: 'Donker & geroosterd', cue: 'oliang · Thaise ijskoffie', text: 'Voor koffiedrinkers die een steviger, soms zoeter straatdrankje willen. “Koffie” zegt nog niets over melk, suiker of cafeïneniveau.' },
  { icon: Droplets, title: 'Fris & zuur', cue: 'nam manao · kokoswater', text: 'Handig in de hitte, maar fris betekent niet automatisch ongezoet. Vraag bij limoen-, fruit- en sodadranken expliciet naar de zoetheid.' },
  { icon: Leaf, title: 'Bloemig & kruidig', cue: 'anchan · krajiab · matoom', text: 'Deze categorie laat zien dat de Thaise drankencultuur breder is dan ijsthee en bier. Verwacht lokale recepten, seizoenen en kleurverschillen.' },
];

const catalogGroups = [
  { title: 'Thee & koffie', subtitle: 'Vier toegankelijke startpunten', slugs: ['thai-iced-tea', 'thai-milk-tea', 'oliang', 'thai-iced-coffee'] },
  { title: 'Fruit, limoen & rietsuiker', subtitle: 'Vijf dorstlessers met verschillende zoetheid', slugs: ['coconut-water', 'nam-manao', 'manao-soda', 'nam-oy', 'sugarcane-juice'] },
  { title: 'Kruiden, bloemen & kleur', subtitle: 'Tien minder bekende glazen', slugs: ['chrysanthemum-tea', 'ginger-tea', 'lemongrass-tea', 'nam-anchan', 'nam-bai-makrut', 'nam-dok-anchan-manao', 'nam-krajiab', 'nam-matoom', 'nom-yen', 'sala-syrup-soda'] },
  { title: 'Bier & sterke drank', subtitle: 'Zes alcoholische routes voor 20+', slugs: ['singha-beer', 'chang-beer', 'leo-beer', 'sangsom-rum', 'mekong-whisky', 'sato'] },
];

const dayRoute = [
  { time: '07:00–10:00', title: 'Ochtend', icon: Coffee, drink: 'Oliang of Thaise koffie', text: 'Proef eerst zonder haast. Vraag naar melk en suiker; een gekoelde straatkoffie kan veel zoeter zijn dan je thuis gewend bent.' },
  { time: '11:00–14:00', title: 'Middag', icon: Sun, drink: 'Kokoswater of nam manao', text: 'Kies een vers geopend of duidelijk bereid drankje en neem daarnaast gewoon drinkwater. Dorst is geen reden om vier zoete glazen achter elkaar te bestellen.' },
  { time: '15:00–18:00', title: 'Marktpauze', icon: GlassWater, drink: 'Cha yen of kruidendrank', text: 'Dit is het moment om romig met bloemig te vergelijken. Deel eventueel twee kleine drankjes zodat smaak belangrijker blijft dan volume.' },
  { time: 'Na het eten', title: 'Avond', icon: Martini, drink: 'Alcoholvrij of 20+', text: 'Wie alcohol kiest, controleert leeftijdsregels, verkoopmoment, eigen vervoer en de actuele voorwaarden van de venue. Water blijft onderdeel van de avond.' },
];

const orderingPhrases = [
  { thai: 'หวานน้อย', latin: 'waan noi', nl: 'minder zoet', note: 'Vermindert meestal de suiker, maar garandeert geen suikervrij drankje.' },
  { thai: 'ไม่หวาน', latin: 'mai waan', nl: 'niet zoet / zonder extra suiker', note: 'Recepten met vooraf gezoete mix, siroop of gecondenseerde melk kunnen toch suiker bevatten.' },
  { thai: 'ไม่ใส่นม', latin: 'mai sai nom', nl: 'geen melk toevoegen', note: 'Vraag bij allergie óók naar poeder, creamer, mix en gebruikte apparatuur.' },
  { thai: 'ไม่ใส่น้ำแข็ง', latin: 'mai sai nam khaeng', nl: 'zonder ijs', note: 'Een praktisch verzoek, maar geen oordeel over iedere ijsleverancier of zaak.' },
];

const safetyChecks = [
  { icon: Droplets, title: 'Kies drinkwater bewust', text: 'De CDC Thailand-gids adviseert reizigers geen kraanwater te drinken. Gebruik fabrieksverzegeld fleswater of betrouwbaar gefilterd water; gebruik dat bij twijfel ook voor tandenpoetsen.' },
  { icon: GlassWater, title: 'Vraag hoe het is gemaakt', text: 'Kijk naar water, ijs, rauw sap, melk en bewaartemperatuur. Een bruisend, verpakt of heet bereid drankje heeft een ander risicoprofiel dan een kan die lang in de warmte staat.' },
  { icon: PackageCheck, title: 'Controleer allergenen', text: 'Melk, creamer, noten, cafeïne en kleur- of smaakmixen zijn niet altijd zichtbaar. “Geen melk” is bij een ernstige allergie niet genoeg zonder een echte ingrediënten- en kruisbesmettingscheck.' },
  { icon: ShieldCheck, title: 'Alcohol: 20+ en lokaal geregeld', text: 'Sinds 29 mei 2026 geldt volgens TAT doorgaans verkoop van 11:00 tot 24:00. Uitzonderingen en tijdelijke beperkingen hangen af van vergunning, locatie, verkiezingen en religieuze dagen.' },
];

const faqs = [
  { question: 'Wat is een typisch Thais drankje?', answer: 'Cha yen, de oranje Thaise ijsthee met melk en ijs, is een herkenbare keuze. Thailand heeft echter geen enkel glas dat het hele land samenvat: oliang, kokoswater, limoen-, kruiden- en bloemendranken horen net zo goed bij het dagelijkse aanbod.' },
  { question: 'Wat is de populairste drank in Thailand?', answer: 'Dat hangt af van plaats, tijdstip en doelgroep. Zoekresultaten noemen vaak Thai milk tea, koffie en bier, maar een landelijke ranglijst zonder duidelijke bron zegt weinig. Gebruik deze gids daarom als smaakroute, niet als absolute populariteitswedstrijd.' },
  { question: 'Wat moet je drinken in Thailand?', answer: 'Begin met één romige klassieker zoals cha yen, één donkere koffie zoals oliang, één frisse keuze zoals nam manao of kokoswater en één kruidendrank zoals anchan of krajiab. Zo proef je meer verschil dan wanneer je alleen merknamen afvinkt.' },
  { question: 'Wat zit er in Thai tea?', answer: 'De basis is een sterk theemengsel. Een verkochte cha yen bevat doorgaans ijs, suiker en melk of creamer, maar recept en mix verschillen. ChaTraMue beschrijft de ontwikkeling van rode theeblends voor Thai Milk Tea en Thai Black Tea; vraag lokaal naar ingrediënten als suiker, zuivel of cafeïne belangrijk zijn.' },
  { question: 'Is Thaise ijsthee gezond?', answer: '“Gezond” is geen vaste eigenschap van een naam. Een cha yen kan cafeïne, veel suiker en melk bevatten; portie en recept verschillen. Zie het als een smaakdrank en vraag om minder zoet wanneer dat bij je past. Bij medische of voedingsvragen volg je professioneel advies.' },
  { question: 'Welke Thaise bieren kom je vaak tegen?', answer: 'Singha, Chang en Leo zijn bekende namen in het bestaande aanbod. Beschikbaarheid, alcoholpercentage, recept en verpakking kunnen veranderen; controleer daarom het etiket of menu in plaats van één tijdloze vergelijking te geloven.' },
  { question: 'Hoe oud moet je zijn om alcohol te drinken in Thailand?', answer: 'De wettelijke minimumleeftijd is 20 jaar. Neem identificatie mee en volg lokale aanwijzingen. Verkoop kan bovendien worden beperkt op bepaalde locaties, tijdens verkiezingen, religieuze dagen of andere officiële periodes.' },
  { question: 'Wat zijn de alcoholverkoopuren in Thailand?', answer: 'TAT meldde dat alcohol sinds 29 mei 2026 in het algemeen van 11:00 tot 24:00 mag worden verkocht. Hotels, luchthavens, vergunde entertainmentlocaties en aangewezen gebieden kunnen andere voorwaarden hebben; dat betekent niet dat iedere bar automatisch langer open mag.' },
  { question: 'Kun je kraanwater drinken in Thailand?', answer: 'De CDC Yellow Book-pagina voor Thailand adviseert reizigers geen kraanwater te drinken en te kiezen voor verzegeld of gefilterd water. Waterkwaliteit en leidingnet kunnen lokaal verschillen; neem als reiziger geen risico op basis van helder uiterlijk alleen.' },
  { question: 'Kan ik ijs nemen in Thailand?', answer: 'De CDC adviseert ijs te vermijden wanneer je niet redelijk zeker weet dat het van veilig water is gemaakt. Veel professionele zaken gebruiken geleverd ijs, maar dat is geen universele garantie. Vraag bij twijfel naar de herkomst of bestel zonder ijs.' },
  { question: 'Hoe bestel ik een drankje minder zoet?', answer: 'Je kunt “waan noi” (minder zoet) zeggen of de Thaise tekst หวานน้อย laten zien. Dat verlaagt vaak de toegevoegde suiker, maar een voorgemengde basis, siroop of gecondenseerde melk kan al zoet zijn.' },
];

const sources = [
  { title: 'Alcohol sales and consumption rules updated in Thailand', creator: 'TAT Newsroom · 29 mei 2026', url: 'https://www.tatnews.org/2026/05/alcohol-sales-and-consumption-rules-updated-in-thailand-what-tourists-need-to-know/', note: 'Primaire actuele bron voor algemene verkoopuren, minimumleeftijd, uitzonderingen en tijdelijke beperkingen.' },
  { title: 'Thailand — Yellow Book', creator: 'CDC · editie 2026', url: 'https://www.cdc.gov/yellow-book/hcp/asia/thailand.html', note: 'Professionele reisgezondheidsbron voor drinkwater, verzegelde dranken, ijs en voedsel- en waterhygiëne.' },
  { title: 'Our History', creator: 'ChaTraMue', url: 'https://chatramue.com/pages/our-history', note: 'Merkbron voor de historische ontwikkeling van rode theeblends voor Thaise melk- en zwarte ijsthee; niet gebruikt voor gezondheidsclaims.' },
  { title: '16 drankjes die je moet proeven in Thailand', creator: 'Valiezen · 12 april 2025', url: 'https://valiezen.com/2025/04/12/drank-thailand/', note: 'Nederlandse SERP-concurrent gebruikt om lijstintentie, ontbrekende bestelcontext en informatiegaten te vergelijken.' },
  { title: 'Eten en drinken Thailand', creator: 'Koning Aap', url: 'https://koningaap.nl/thailand-reizen/eten-en-drinken-thailand', note: 'Secundaire vergelijking voor bekende thee-, koffie-, bier- en sterke-dranknamen; prijzen niet overgenomen.' },
];

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="font-extrabold text-jade underline decoration-saffron/45 underline-offset-4 transition hover:text-saffron-dark">{children}</Link>;
}

function createSchemas(drinks: Drink[]) {
  return [
    {
      '@context': 'https://schema.org', '@type': 'Article', headline: PAGE_TITLE, description: PAGE_DESCRIPTION, inLanguage: 'nl-NL', mainEntityOfPage: PAGE_URL,
      image: [`https://go2-thailand.com${HERO_IMAGE}`, 'https://go2-thailand.com/images/redesign/thai-drinks-cha-yen.webp'], dateModified: '2026-07-25',
      author: { '@type': 'Organization', name: 'Go2Thailand' }, publisher: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
    },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/nl/' }, { '@type': 'ListItem', position: 2, name: 'Thaise dranken', item: PAGE_URL }] },
    { '@context': 'https://schema.org', '@type': 'ItemList', name: '25 Thaise dranken', numberOfItems: drinks.length, itemListElement: drinks.map((drink, index) => ({ '@type': 'ListItem', position: index + 1, name: drink.name.nl || drink.name.en, url: `${PAGE_URL}${drink.slug}/` })) },
  ];
}

export function ThaiDrinksGuide({ drinks }: ThaiDrinksGuideProps) {
  const subId = useSubId();
  const foodTourHref = withPlacementSubId(KLOOK_GENERIC, subId, 'thai-drinks-food-tour');
  const bySlug = new Map(drinks.map((drink) => [drink.slug, drink]));
  const schemas = createSchemas(drinks);

  return (
    <>
      <SEOHead title={PAGE_TITLE} description={PAGE_DESCRIPTION} ogImage={`https://go2-thailand.com${HERO_IMAGE}`}>
        <meta name="keywords" content="thaise dranken, thaise drankjes, wat drinken ze in thailand, thai iced tea, thaise ijsthee, thais bier, kokoswater thailand" />
        <meta property="og:type" content="article" />
        <meta property="article:modified_time" content="2026-07-25" />
        {schemas.map((schema, index) => <script key={`${schema['@type']}-${index}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      </SEOHead>

      <div className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          eyebrow="Thailand proef je in lagen"
          title={<>Vijfentwintig glazen.<br />Eén smaakroute.</>}
          subtitle="Van cha yen tot anchan, zonder de drankencultuur plat te slaan tot één winnaar."
          description={<>Kies niet alleen wat fotogeniek is. Vergelijk zoetheid, melk, cafeïne, water en moment van de dag—en bestel daarna een drankje dat echt bij je past.</>}
          image={HERO_IMAGE}
          imageAlt="Redactioneel sfeerbeeld met Thaise ijsthee, oliang, kokoswater, limoen- en butterfly-peadrank bij Wat Arun"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Eten & drinken', href: '/food/' }, { label: 'Thaise dranken' }]}
          actions={[{ label: 'Vind jouw eerste glas', href: '#beginnen', kind: 'primary' }, { label: 'Bekijk alle 25', href: '#alle-dranken', kind: 'secondary' }]}
          minHeightClassName="min-h-[900px] lg:min-h-[740px]"
          contentClassName="max-w-[755px]"
          titleClassName="max-w-[770px] text-[3.45rem] leading-[0.86] sm:text-[4.65rem] lg:text-[5.45rem]"
          subtitleClassName="max-w-[660px] text-[1.4rem] leading-[1.06] text-saffron-dark sm:text-[1.9rem]"
          imageClassName="object-cover object-[68%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.02)_0%,rgba(252,250,246,0.78)_54%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.99)_0%,rgba(252,250,246,0.92)_39%,rgba(4,38,32,0.08)_67%,rgba(4,30,25,0.02)_100%)]"
          sideCard={(
            <div className="absolute bottom-8 right-[5vw] z-20 hidden w-[338px] overflow-hidden rounded-[26px] border border-white/65 bg-canvas/94 shadow-editorial-lift backdrop-blur-xl lg:block">
              <div className="flex items-center justify-between border-b border-jade/10 px-6 py-5"><p className="eyebrow !mb-0">Smaakpaspoort</p><GlassWater size={20} className="text-jade" /></div>
              <div className="space-y-4 p-6 text-xs">
                <div className="flex justify-between gap-4"><span className="text-charcoal/50">In deze gids</span><strong className="text-right text-jade">25 drankjes · 9 categorieën</strong></div>
                <div className="flex justify-between gap-4"><span className="text-charcoal/50">Slim beginnen</span><strong className="text-right text-jade">4 smaakfamilies</strong></div>
                <div className="flex justify-between gap-4"><span className="text-charcoal/50">Bestellen</span><strong className="text-right text-jade">4 bruikbare zinnen</strong></div>
                <div className="flex justify-between gap-4"><span className="text-charcoal/50">Alcohol</span><strong className="text-right text-saffron-dark">20+ · regels checken</strong></div>
              </div>
            </div>
          )}
        />

        <PageSectionNav items={navItems} />

        <section className="section-divider-bottom bg-canvas py-7">
          <div className="container-custom grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: GlassWater, label: 'Catalogus', value: `${drinks.length} drankroutes` },
              { icon: Languages, label: 'Bestellen', value: 'Zoetheid + melk' },
              { icon: Droplets, label: 'Drinkwater', value: 'Verzegeld of gefilterd' },
              { icon: ShieldCheck, label: 'Alcohol', value: 'Vanaf 20 jaar' },
            ].map(({ icon: Icon, label, value }) => <div key={label} className="flex items-center gap-4 border-l border-jade/12 pl-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-jade/[0.06] text-jade"><Icon size={18} /></span><div><p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">{label}</p><p className="mt-1 text-xs font-extrabold text-jade">{value}</p></div></div>)}
          </div>
        </section>

        <section id="beginnen" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid items-end gap-10 lg:grid-cols-[0.73fr_1.27fr]">
              <div>
                <SectionHeading eyebrow="Begin bij smaak, niet bij een ranglijst" title={<>Wat past<br />in jouw glas?</>} description="De bekendste naam is niet automatisch jouw beste eerste keuze. Kies eerst tussen romig, geroosterd, fris en kruidig; controleer daarna zoetheid, melk en cafeïne." />
                <p className="mt-6 text-sm font-medium leading-7 text-charcoal/66">Een goede drankengids helpt je beslissen. Daarom koppelen we ieder glas aan een smaak en moment, en niet aan een onbewezen claim als “de nationale drank” of “de gezondste keuze”.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {tasteCompass.map(({ icon: Icon, title, cue, text }, index) => (
                  <article key={title} className={`min-h-[235px] rounded-[24px] border p-6 ${index === 0 ? 'border-saffron/25 bg-saffron/[0.07]' : 'border-jade/10 bg-white'}`}>
                    <div className="flex items-center justify-between"><Icon size={23} className={index === 0 ? 'text-saffron-dark' : 'text-jade'} /><span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-charcoal/38">0{index + 1}</span></div>
                    <h3 className="mt-6 font-display text-[1.7rem] font-semibold leading-none text-jade">{title}</h3>
                    <p className="mt-2 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{cue}</p>
                    <p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">{text}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-14 divide-y divide-jade/10 border-y border-jade/10">
              {firstSips.map((item) => {
                const drink = bySlug.get(item.slug);
                if (!drink) return null;
                return (
                  <Link key={item.slug} href={`/drinks/${item.slug}/`} className="group grid gap-5 py-5 sm:grid-cols-[92px_170px_1fr_32px] sm:items-center">
                    <div className="relative h-24 overflow-hidden rounded-2xl"><Image src={drink.image} alt={drink.name.nl || drink.name.en} fill sizes="92px" className="object-cover transition duration-500 group-hover:scale-105" /></div>
                    <div><p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{item.label}</p><h3 className="mt-2 font-display text-[1.55rem] font-semibold leading-none text-jade">{drink.name.nl || drink.name.en}</h3><p className="mt-1 font-thai text-xs text-charcoal/45">{drink.name.thai}</p></div>
                    <p className="text-xs font-medium leading-6 text-charcoal/64">{item.why}</p>
                    <span className="grid h-8 w-8 place-items-center rounded-lg border border-jade/12 text-jade transition group-hover:border-saffron/45 group-hover:text-saffron-dark"><ChevronRight size={15} /></span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section id="smaakroute" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom grid items-center gap-12 lg:grid-cols-[1.12fr_0.88fr]">
            <div className="relative aspect-[3/2] overflow-hidden rounded-[30px] bg-jade shadow-editorial-lift">
              <Image src="/images/redesign/thai-drinks-cha-yen.webp" alt="Thaise straatverkoper die cha yen door een traditionele theefilter schenkt" fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#052f29]/75 via-transparent to-transparent" />
              <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-5 text-white sm:inset-x-8 sm:bottom-8"><div><p className="eyebrow !text-saffron-light">Eén glas, vier keuzes</p><p className="max-w-md font-display text-[1.9rem] font-semibold leading-none">Thee · zoetheid · melk · ijs</p></div><GlassWater size={28} className="shrink-0 text-saffron-light" /></div>
            </div>
            <div>
              <SectionHeading eyebrow="Cha yen ontleed" title={<>Oranje is<br />geen recept.</>} description="De kleur maakt Thaise ijsthee herkenbaar, maar verkopers gebruiken niet overal dezelfde theemix, melk, creamer, suiker of verhouding. Proeven begint dus met één extra vraag." />
              <div className="mt-8 space-y-5">
                {[
                  ['01', 'Vraag hoe zoet', '“Waan noi” is nuttiger dan achteraf concluderen dat iedere cha yen extreem zoet is.'],
                  ['02', 'Controleer melk', 'Gecondenseerde melk, geëvaporeerde melk en creamer zijn verschillende ingrediënten en kunnen naast elkaar voorkomen.'],
                  ['03', 'Behandel cafeïne als echt', 'Sterke thee en koffie blijven cafeïnehoudend, ook wanneer ijs en melk de smaak zachter maken.'],
                  ['04', 'Vergelijk één element', 'Proef cha yen naast Thai black tea of een kruidendrank; dan ontdek je wat thee, melk en suiker afzonderlijk doen.'],
                ].map(([number, title, text]) => <div key={number} className="grid grid-cols-[38px_1fr] gap-4 border-t border-jade/10 pt-4"><span className="text-[10px] font-extrabold text-saffron-dark">{number}</span><div><h3 className="text-sm font-extrabold text-jade">{title}</h3><p className="mt-2 text-xs font-medium leading-6 text-charcoal/62">{text}</p></div></div>)}
              </div>
              <p className="mt-7 text-sm font-medium leading-7 text-charcoal/66">Wil je na koffie verder verdiepen? De <InlineLink href="/nl/blog/bangkok-specialty-coffee-cafe-guide-2026/">Bangkok-koffiegids</InlineLink> legt boon, zetmethode, wijk en caféritme naast elkaar.</p>
            </div>
          </div>

          <div className="container-custom mt-16">
            <div className="grid gap-8 lg:grid-cols-[0.6fr_1.4fr] lg:items-end"><SectionHeading eyebrow="Een dag, vier proefmomenten" title="Maak ruimte tussen de glazen." description="Een smaakroute is geen drinkchallenge. Wissel zoete of cafeïnehoudende keuzes af met eten, rust en betrouwbaar drinkwater." /><p className="max-w-3xl text-sm font-medium leading-7 text-charcoal/64">De route is bewust tijdloos: geen winkel, prijs of exacte openingstijd wordt als garantie gepresenteerd. Gebruik hem op een markt, foodtour of eigen stadswandeling.</p></div>
            <div className="relative mt-10 grid gap-4 lg:grid-cols-4">
              <div aria-hidden="true" className="absolute left-[8%] right-[8%] top-8 hidden border-t-2 border-dotted border-saffron/55 lg:block" />
              {dayRoute.map(({ time, title, icon: Icon, drink, text }, index) => <article key={title} className="relative z-10 min-h-[285px] rounded-[24px] border border-jade/10 bg-canvas p-6 shadow-editorial-card"><span className="grid h-12 w-12 place-items-center rounded-full border-4 border-tonal bg-saffron text-white"><Icon size={21} /></span><p className="mt-6 text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">{time} · stop 0{index + 1}</p><h3 className="mt-2 font-display text-[1.7rem] font-semibold leading-none text-jade">{title}</h3><p className="mt-3 text-xs font-extrabold text-jade">{drink}</p><p className="mt-3 text-xs font-medium leading-6 text-charcoal/62">{text}</p></article>)}
            </div>
          </div>
        </section>

        <section id="alle-dranken" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:items-end"><SectionHeading eyebrow="De complete collectie" title={<>Alle 25.<br />Zonder kaartmoeheid.</>} description="De vier rijen hieronder ontsluiten iedere bestaande drankdetailpagina. Kies op familie; gebruik de detailpagina pas daarna voor ingrediënten, smaak en context." /><p className="max-w-3xl text-sm font-medium leading-7 text-charcoal/64">De twee rietsuikerroutes in de huidige collectie beschrijven vrijwel hetzelfde drankje onder een Engelse en Thaise naam. We laten beide vindbaar, maar behandelen ze hier niet als twee volledig verschillende tradities.</p></div>
            <div className="mt-12 divide-y divide-jade/10 border-y border-jade/10">
              {catalogGroups.map((group, groupIndex) => (
                <section key={group.title} className="grid gap-6 py-8 lg:grid-cols-[235px_1fr]">
                  <div><p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">0{groupIndex + 1} · {group.subtitle}</p><h2 className="mt-2 font-display text-[1.85rem] font-semibold leading-none text-jade">{group.title}</h2></div>
                  <div className="grid gap-x-6 sm:grid-cols-2 xl:grid-cols-3">
                    {group.slugs.map((slug) => {
                      const drink = bySlug.get(slug);
                      if (!drink) return null;
                      return <Link key={slug} href={`/drinks/${slug}/`} className="group flex items-center justify-between gap-4 border-b border-jade/8 py-3 text-sm font-extrabold text-jade"><span><span className="block">{drink.name.nl || drink.name.en}</span><span className="mt-1 block font-thai text-[10px] font-medium text-charcoal/42">{drink.name.thai}</span></span><ArrowRight size={14} className="shrink-0 text-saffron transition group-hover:translate-x-1" /></Link>;
                    })}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section id="bestellen" className="section-divider-bottom scroll-mt-24 bg-jade py-16 text-white lg:py-24">
          <div className="container-custom grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="eyebrow !text-saffron-light">Bestellen zonder toneelstuk</p>
              <h2 className="font-display text-[3.25rem] font-semibold leading-[0.9] tracking-[-0.04em] sm:text-[4.25rem]">Vier zinnen die echt iets veranderen.</h2>
              <p className="mt-6 text-sm font-medium leading-7 text-white/68">Laat de Thaise tekst zien als uitspraak lastig is. Een vriendelijk verzoek helpt, maar een ernstige allergie vraagt altijd om een ingrediëntencheck en duidelijke bevestiging.</p>
              <div className="mt-8 rounded-2xl border border-white/14 bg-white/[0.06] p-5"><HeartHandshake size={22} className="text-saffron-light" /><p className="mt-4 text-xs font-extrabold text-white">Begin met “sawatdee” en wijs rustig aan.</p><p className="mt-2 text-xs leading-6 text-white/58">Je hoeft geen perfect Thais te spreken. Duidelijkheid, geduld en respect werken beter dan een fonetische zin hard herhalen.</p></div>
            </div>
            <div className="divide-y divide-white/12 border-y border-white/12">
              {orderingPhrases.map((phrase, index) => <div key={phrase.thai} className="grid gap-4 py-6 sm:grid-cols-[64px_170px_1fr] sm:items-center"><span className="text-[10px] font-extrabold text-saffron-light">0{index + 1}</span><div><p className="font-thai text-[1.8rem] font-semibold leading-none">{phrase.thai}</p><p className="mt-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-white/45">{phrase.latin} · {phrase.nl}</p></div><p className="text-xs font-medium leading-6 text-white/62">{phrase.note}</p></div>)}
            </div>
          </div>
        </section>

        <section id="veilig-drinken" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="relative min-h-[430px] overflow-hidden rounded-[30px] bg-jade shadow-editorial-lift">
              <Image src="/images/redesign/thai-drinks-hydration-route.webp" alt="Reisstop met herbruikbare fles, verzegeld water, kokosnoot en limoendrank bij zonsondergang" fill sizes="100vw" className="object-cover object-[65%_center] sm:object-center" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,31,26,0.98)_0%,rgba(3,31,26,0.9)_38%,rgba(3,31,26,0.18)_68%,rgba(3,31,26,0.02)_100%)]" />
              <div className="relative z-10 flex min-h-[430px] max-w-[640px] flex-col justify-center p-7 text-white sm:p-11 lg:p-14">
                <p className="eyebrow !text-saffron-light">Hydratatie is de basisroute</p>
                <h2 className="font-display text-[3rem] font-semibold leading-[0.9] tracking-[-0.04em] sm:text-[4rem]">Een mooi glas vervangt geen veilig water.</h2>
                <p className="mt-5 max-w-[560px] text-sm font-medium leading-7 text-white/68">De CDC adviseert reizigers in Thailand geen kraanwater te drinken. Kies verzegeld of betrouwbaar gefilterd water en gebruik dat bij twijfel ook voor tandenpoetsen. Een fles is alleen herbruikbaar wanneer je weet waarmee je haar vult.</p>
                <Link href="/practical-info/health-vaccinations/" className="btn-cream mt-7 w-fit">Bekijk gezondheid & voorbereiding <ArrowRight size={15} className="text-saffron" /></Link>
              </div>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {safetyChecks.map(({ icon: Icon, title, text }, index) => <article key={title} className="grid gap-5 border-t border-jade/12 py-6 sm:grid-cols-[52px_1fr]"><span className={`grid h-12 w-12 place-items-center rounded-2xl ${index === 3 ? 'bg-saffron/[0.1] text-saffron-dark' : 'bg-jade/[0.06] text-jade'}`}><Icon size={22} /></span><div><h3 className="font-display text-[1.65rem] font-semibold leading-none text-jade">{title}</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/64">{text}</p></div></article>)}
            </div>
            <p className="mt-5 text-xs font-medium leading-6 text-charcoal/58">Voor actuele algemene veiligheidsinformatie blijft het <a href="https://www.nederlandwereldwijd.nl/reisadvies/thailand" target="_blank" rel="noopener noreferrer" className="font-extrabold text-jade underline decoration-saffron/45 underline-offset-4">Nederlandse reisadvies voor Thailand</a> leidend. Voor gezondheidsvragen overleg je met een arts of reizigerskliniek.</p>
          </div>
        </section>

        <section className="section-divider-bottom bg-tonal py-16 lg:py-24">
          <div className="container-custom grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <SectionHeading eyebrow="Proeven met context" title={<>Een foodtour kan helpen.<br />De listing blijft leidend.</>} description="Een begeleide markt- of foodtour kan ingrediënten, taal en lokale gewoonten verduidelijken. De knop opent bewust een algemene Klook-bestemming: zoek zelf naar food tour, street food of cooking class en controleer de echte inhoud." />
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  ['Route', 'Welke markt of wijk bezoek je werkelijk en hoeveel lopen of vervoer zit erbij?'],
                  ['Proeven', 'Welke drankjes zijn bevestigd, hoeveel porties en zijn alcoholvrije opties mogelijk?'],
                  ['Dieet', 'Kan de aanbieder allergieën of dieetwensen echt veilig verwerken?'],
                ].map(([title, text]) => <div key={title} className="rounded-2xl border border-jade/10 bg-white p-5"><h3 className="text-sm font-extrabold text-jade">{title}</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/60">{text}</p></div>)}
              </div>
              <a href={foodTourHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-jade btn-jade-pattern mt-7 w-fit">Bekijk actuele foodtours op Klook <ExternalLink size={15} className="text-saffron" /></a>
              <AffiliateDisclosure className="mt-4">Klook is een affiliatelink. Go2Thailand kan commissie ontvangen zonder dat jouw prijs stijgt. Wij garanderen via deze algemene knop geen specifieke tour, drank, stop of beschikbaarheid.</AffiliateDisclosure>
            </div>

            <aside className="overflow-hidden rounded-[28px] bg-jade p-7 text-white shadow-editorial-lift sm:p-9">
              <div className="flex items-start justify-between gap-5"><div><p className="eyebrow !text-saffron-light">Voor onderweg en thuis</p><h2 className="font-display text-[2.65rem] font-semibold leading-[0.92]">Twee relevante Amazon-routes.</h2></div><BookOpenCheck size={26} className="shrink-0 text-saffron-light" /></div>
              <p className="mt-5 text-xs font-medium leading-6 text-white/62">Geen wondermiddelen of “must-haves”: alleen een herbruikbare fles voor betrouwbaar water en een bestaande Thaise theemix om het recept thuis te onderzoeken.</p>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <a href="/go/owala-freesip-24oz/" target="_blank" rel="noopener noreferrer nofollow sponsored" className="group flex min-h-[235px] flex-col rounded-2xl border border-white/14 bg-white/[0.07] p-5 transition hover:border-saffron/45 hover:bg-white/[0.1]"><Droplets size={23} className="text-saffron-light" /><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-white/45">Voor veilig vulwater</p><h3 className="mt-2 font-display text-[1.55rem] font-semibold">Geïsoleerde drinkfles</h3><p className="mt-3 text-[11px] font-medium leading-5 text-white/58">De fles maakt kraanwater niet veilig. Vul uitsluitend met water waarvan je de herkomst vertrouwt; controleer formaat, onderhoud en verkoper.</p><span className="mt-auto inline-flex items-center justify-between border-t border-white/10 pt-4 text-[10px] font-extrabold">Bekijk actueel aanbod <ExternalLink size={13} className="text-saffron-light" /></span></a>
                <a href="/go/chatramue-original-thai-tea/" target="_blank" rel="noopener noreferrer nofollow sponsored" className="group flex min-h-[235px] flex-col rounded-2xl border border-white/14 bg-white/[0.07] p-5 transition hover:border-saffron/45 hover:bg-white/[0.1]"><Leaf size={23} className="text-saffron-light" /><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-white/45">Voor thuis proeven</p><h3 className="mt-2 font-display text-[1.55rem] font-semibold">Original Thai Tea-mix</h3><p className="mt-3 text-[11px] font-medium leading-5 text-white/58">Controleer ingrediënten, cafeïne, bereiding, houdbaarheid, verkoper en lokale beschikbaarheid. Het recept bepaalt uiteindelijk melk en suiker.</p><span className="mt-auto inline-flex items-center justify-between border-t border-white/10 pt-4 text-[10px] font-extrabold">Bekijk actueel aanbod <ExternalLink size={13} className="text-saffron-light" /></span></a>
              </div>
              <AffiliateDisclosure className="mt-5 !text-white/55">Als Amazon Associate verdienen we aan kwalificerende aankopen. OneLink probeert je naar een passende lokale Amazon-store te sturen; product, prijs en voorraad kunnen per land verschillen.</AffiliateDisclosure>
            </aside>
          </div>
        </section>

        <FaqSplitSection id="vragen" eyebrow="Echte vragen uit Nederlandse zoekresultaten" title="Veelgestelde vragen over Thaise dranken" description="De vragen zijn letterlijk uit de onderzochte SERP/PAA-sets geselecteerd. Antwoorden maken verschil tussen smaak, gezondheid, drinkwater en actuele wetgeving." items={faqs} />

        <RelatedGuidesSection
          eyebrow="Eten en drinken verder plannen"
          title="Van glas naar markt, koffie en curry"
          guides={[
            { title: 'Thaise curry’s kiezen', description: 'Vergelijk groen, rood, geel, massaman en panang op smaak in plaats van alleen op kleur.', href: '/nl/blog/thai-curry-guide-green-red-yellow-massaman-panang/', image: '/images/redesign/thai-curry-guide-hero.webp' },
            { title: 'Bangkok-koffieroute', description: 'Kies een wijk, zetmethode en caféritme voor specialty coffee in Bangkok.', href: '/nl/blog/bangkok-specialty-coffee-cafe-guide-2026/', image: '/images/redesign/bangkok-coffee-hero.webp' },
            { title: 'Eten bij 7-Eleven', description: 'Bouw een praktisch mandje en controleer etiket, suiker, koeling en allergenen.', href: '/nl/travel-guides/7-eleven-thailand/', image: '/images/redesign/seven-eleven-thailand-food.webp' },
          ]}
        />

        <SourceMethodSection
          title="Onderzocht als keuzehulp, niet als smaakwedstrijd."
          description="Voor deze NL-owner zijn een DFS-cluster met 115 records, tien Nederlandse SERP/PAA-sets, drie concurrentpagina’s, een primaire Thaise theebron en actuele officiële water- en alcoholbronnen gebruikt. Vluchtige prijzen, onbewezen populariteitsranglijsten en gezondheidsbeloftes zijn verwijderd."
          sources={sources}
        />
      </div>
    </>
  );
}
