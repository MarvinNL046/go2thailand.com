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
  const isEn = data.language === 'en';
  const localePath = isEn ? '' : '/nl';
  const pageUrl = `https://go2-thailand.com${localePath}/travel-guides/${data.slug}/`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data.seo.title,
      description: data.seo.description,
      image: data.seo.image,
      datePublished: data.publishedAt,
      dateModified: data.updatedAt,
      inLanguage: isEn ? 'en' : 'nl-NL',
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
        { '@type': 'ListItem', position: 1, name: 'Home', item: `https://go2-thailand.com${localePath}/` },
        { '@type': 'ListItem', position: 2, name: isEn ? 'Travel Guides' : 'Reisgidsen', item: `https://go2-thailand.com${localePath}/travel-guides/` },
        { '@type': 'ListItem', position: 3, name: 'eSIM Thailand', item: pageUrl },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: isEn ? 'Internet options for Thailand' : 'Internetopties voor Thailand',
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
  const isEn = data.language === 'en';
  const copy = isEn ? {
    nav: ['Choose', 'Compare', 'Data', 'Buy', 'Install', 'Fix', 'FAQs'], guides: 'Travel Guides', crumb: 'eSIM & SIM card',
    heroPrimary: 'Find your connection', heroSecondary: 'Check current price at Saily', heroAria: 'Check the current price of Saily eSIM plans for Thailand',
    heroDisclosure: 'Affiliate disclosure: we may earn commission from a Saily purchase at no extra cost to you. Our comparison and advice remain independent.',
    sideTitle: 'Decide in 30 seconds', sideItems: ['Does your exact phone support eSIM?', 'Do you need a local number?', 'How many days and how much data do you really use?'],
    sideNote: 'Answer those three questions before comparing prices. That leads to a suitable product instead of the largest marketing claim.',
    choiceEyebrow: 'Start with your trip', choiceTitle: 'Three routes to mobile data.',
    choiceDescription: 'Your situation comes before the provider. Choose by device, trip length and whether you need a local number; compare plans only after that.',
    choiceAlt: 'Thailand map with smartphone, travel eSIM and physical SIM as a visual decision aid', choiceKicker: 'The short decision guide', choiceHeading: 'Which connection fits your trip?',
    choiceParagraphs: [
      ['Choose a travel eSIM', ' if your unlocked phone supports eSIM, you mainly need data and want to connect immediately after landing. Check whether validity starts at installation or first network connection.'],
      ['Choose a Thai SIM or carrier eSIM', ' if you need a local number, in-person setup support or a longer-stay option. Passport registration is part of the purchase.'],
      ['Use home-network roaming deliberately', ' only when your provider shows a clear Thailand package in advance. Thailand is normally outside EU roaming rules, so standard rates can be expensive.'],
    ],
    offlineNote: 'Keep your hotel address, travel-insurance details, emergency numbers and first transfer voucher offline too. Mobile data should not be your only access to the trip.',
    compareEyebrow: 'Ask the same questions', compareTitle: 'Travel eSIM, Thai SIM or roaming?',
    compareDescription: 'This compares connection types. Price, speed, coverage, validity and support still vary within each type.',
    compareHeaders: ['Feature', 'Travel eSIM', 'Thai SIM/eSIM', 'Home roaming'], compareMobile: 'On mobile, swipe the table horizontally. Always recheck current product specifications with the provider; plans change faster than an editorial guide.',
    dataEyebrow: 'Do not buy a marketing word', dataTitle: 'How much data do you actually need?',
    dataDescription: 'Check mobile-data use per app in your phone settings, then adjust for hotel Wi-Fi, offline maps and the likelihood that you will navigate more but stream less.',
    unlimitedEyebrow: 'Read the smaller type', unlimitedTitle: '“Unlimited” does not define the speed.',
    unlimitedText: 'An unlimited plan can slow down after a daily high-speed allowance. Hotspot use, video quality or network priority may also be restricted. Record four facts: full-speed data, speed after the cap, reset time and tethering terms. Saily currently applies fair-use terms to unlimited plans; recheck the live product card before buying.',
    unlimitedTags: ['High-speed data', 'Speed after cap', 'Reset time', 'Hotspot'], coverageAlt: 'Traveller checking mobile coverage along a route in northern Thailand',
    purchaseEyebrow: 'Four purchase moments', purchaseTitle: 'Where should you buy a SIM or eSIM?',
    purchaseDescription: 'Convenience, setup help and flexibility shift by sales channel. Decide whether the seller only needs to provide data or must also register, install and support it.',
    bestFor: 'Best for', caution: 'Watch for', counterEyebrow: 'At the counter', counterTitle: 'Leave only after mobile data works.',
    counterText: 'Do not stop when a package has been scanned. The SIM must be linked to your passport, activated and assigned the right data profile. Open a website without Wi-Fi, load a map and, if relevant, test the local number. Photograph the plan name, expiry date and support code.',
    counterChecks: ['Passport registration completed', 'Plan and expiry visible', 'Mobile data tested without Wi-Fi', 'Number and support channel saved'], counterAlt: 'Mobile-store employee helping a traveller register a SIM card',
    providerEyebrow: 'Networks without a generic ranking', providerTitle: 'AIS, True-dtac or a travel eSIM?',
    providerDescription: 'A national winner based on one measurement says little about an island, mountain village or crowded stadium. Check official maps and ask your accommodation about the exact location.',
    sixtyTitle: 'The 60-day Tourist SIM rule', sixtyText: 'Since 30 June 2025, Thailand’s telecom regulator says a Tourist SIM may remain active for no more than 60 days. A top-up alone does not extend that limit; continued use requires renewed identification under the carrier procedure. The individual data plan can expire sooner.',
    setupEyebrow: 'Prepare before departure', setupTitle: 'Install without letting your home SIM roam.',
    setupDescription: 'Menu names differ by iPhone, Android version and provider. The logic stays the same: install on Wi-Fi, label both lines, select Thailand for data and switch off data roaming on your home line.', setupAlt: 'Hands setting up an eSIM on a smartphone with Bangkok in the background',
    sailyEyebrow: 'Set up in advance', sailyTitle: 'Saily for data after landing',
    sailyText: 'Saily offers current Thailand eSIM plans, including fixed-data and unlimited options. Before purchase, confirm exact device support, when validity starts and which fair-use and hotspot conditions apply. Install the profile at home on Wi-Fi and activate it at the instructed moment.',
    sailyDisclosure: 'Affiliate disclosure: we may earn commission through the button below at no extra cost to you. Saily is one option in this independent guide, not an automatic answer for every traveller.', sailyCta: 'Check current price at Saily',
    navigationAlt: 'Traveller using a smartphone for navigation in Bangkok at blue hour',
    fixEyebrow: 'Do not panic at zero bars', fixTitle: 'Check the simple setting first.',
    fixDescription: 'Do not delete an eSIM profile as the first step. Check the line, mobile-data selection, roaming and provider instructions in a fixed order.',
    fixNote: 'Need to catch a transfer now? Use airport Wi-Fi, open the offline voucher and troubleshoot later from a safe place.',
    amazonEyebrow: 'OneLink travel accessories', amazonTitle: 'Keep your phone usable.',
    amazonText: 'A data plan does not help an empty battery or loose cable. These accessories fit navigation and transfer days; verify specifications and pack only what you use.',
    amazonDisclosure: 'Amazon affiliate disclosure: we may earn commission from qualifying purchases at no extra cost to you. OneLink may send you to a local Amazon store; availability, price and delivery vary by country.', amazonCta: 'Check current price at Amazon',
    faqEyebrow: 'Before activation', faqTitle: 'Frequently asked questions about eSIMs and SIM cards',
    faqDescription: 'The answers combine current Thai registration rules with practical setup. Recheck product prices, promotions and device support with the provider.',
    relatedEyebrow: 'Stay connected', relatedTitle: 'Plan the rest of your Thailand trip',
    sourceEyebrow: 'Verified, not guessed', sourceTitle: 'Sources & editorial method',
    sourceDescription: `This guide was reviewed on ${data.updatedAt} using official telecom and provider sources, current English DataForSEO search data, real English PAA questions and competitor analysis. We do not rank networks without route-specific evidence or present changing prices as timeless facts.`,
  } : {
    nav: ['Kiezen', 'Vergelijken', 'Data', 'Kopen', 'Installeren', 'Oplossen', 'Vragen'], guides: 'Reisgidsen', crumb: 'eSIM & simkaart',
    heroPrimary: 'Vind jouw verbinding', heroSecondary: 'Bekijk actuele prijs bij Saily', heroAria: 'Bekijk de actuele prijs van Saily eSIM-bundels voor Thailand',
    heroDisclosure: 'Affiliate: bij een aankoop via Saily ontvangen wij mogelijk commissie, zonder extra kosten voor jou. Onze vergelijking en adviezen blijven onafhankelijk.',
    sideTitle: 'Beslis in 30 seconden', sideItems: ['Ondersteunt je exacte toestel eSIM?', 'Heb je een lokaal nummer nodig?', 'Hoeveel dagen en data gebruik je echt?'],
    sideNote: 'Beantwoord die drie vragen vóór je prijzen vergelijkt. Zo kies je een passend product in plaats van het grootste marketinglabel.',
    choiceEyebrow: 'Begin bij je reis', choiceTitle: 'Drie routes naar internet.', choiceDescription: 'Niet de provider maar jouw situatie komt eerst. Kies de route die bij je toestel, reisduur en behoefte aan een lokaal nummer past. Daarna vergelijk je pas bundels.',
    choiceAlt: 'Thailandkaart met smartphone, eSIM en fysieke sim als visuele keuzehulp', choiceKicker: 'De korte keuzehulp', choiceHeading: 'Welke verbinding past bij jou?',
    choiceParagraphs: [['Kies een reis-eSIM', ' als je telefoon geschikt en simlockvrij is, je vooral data gebruikt en direct na landing online wilt. Controleer of de looptijd bij installatie of pas bij eerste netwerkverbinding start.'], ['Kies een Thaise sim of provider-eSIM', ' als je een lokaal nummer, persoonlijke installatiehulp of een oplossing voor langer verblijf zoekt. Registratie met je paspoort is onderdeel van de aankoop.'], ['Gebruik roaming alleen bewust', ' als je Nederlandse provider vooraf een heldere Thailandbundel toont. Thailand valt normaal buiten de EU-roamingregels, dus standaardtarieven kunnen ongunstig zijn.']],
    offlineNote: 'Bewaar hoteladres, reisverzekering, noodnummers en eerste transfervoucher ook offline. Mobiele data is een hulpmiddel, geen enige toegang tot je reis.',
    compareEyebrow: 'Zet dezelfde vragen naast elkaar', compareTitle: 'eSIM, Thaise sim of roaming?', compareDescription: 'Deze vergelijking gaat over het type verbinding. Binnen ieder type verschillen prijs, snelheid, dekking, looptijd en support per product.',
    compareHeaders: ['Vergelijkpunt', 'Reis-eSIM', 'Thaise sim/eSIM', 'NL-roaming'], compareMobile: 'Op mobiel kun je de tabel horizontaal verschuiven. Controleer actuele productspecificaties altijd bij de aanbieder; bundels veranderen sneller dan een redactionele gids.',
    dataEyebrow: 'Koop geen marketingwoord', dataTitle: 'Hoeveel data heb je echt nodig?', dataDescription: 'Kijk in de instellingen hoeveel mobiele data je thuis per app gebruikt. Corrigeer daarna voor hotel-wifi, offline kaarten en het feit dat je op reis mogelijk meer navigeert maar minder streamt.',
    unlimitedEyebrow: 'Let op het kleine lettertype', unlimitedTitle: '“Onbeperkt” zegt niet hoe snel.', unlimitedText: 'Een onbeperkte bundel kan na een dagelijkse hoeveelheid high-speed data terugvallen naar een lagere snelheid. Ook hotspot, videokwaliteit of netwerkprioriteit kan worden beperkt. Noteer daarom vier dingen: data op volle snelheid, snelheid daarna, resetmoment en tetheringvoorwaarden. Bij Saily geldt voor huidige unlimited-plannen een fair-usebeleid; controleer de actuele productkaart vlak voor aankoop.', unlimitedTags: ['High-speed data', 'Snelheid daarna', 'Resetmoment', 'Hotspot'], coverageAlt: 'Reiziger controleert mobiel bereik langs een route in de bergen van Noord-Thailand',
    purchaseEyebrow: 'Vier koopmomenten', purchaseTitle: 'Waar koop je een simkaart of eSIM?', purchaseDescription: 'Gemak, hulp en flexibiliteit verschuiven per verkoopplek. Kies vooraf welk probleem de verkoper voor je moet oplossen: alleen data leveren, registreren, installeren of ook later support geven.', bestFor: 'Goed voor', caution: 'Let op',
    counterEyebrow: 'Aan de balie', counterTitle: 'Loop pas weg als data werkt.', counterText: 'Laat niet alleen een verpakking scannen. De sim moet aan jouw paspoort worden gekoppeld, geactiveerd en op het juiste dataprofiel staan. Open vervolgens een website zonder wifi, laad een kaart en bel desgewenst het lokale nummer. Maak een foto van de bundelnaam, afloopdatum en supportcode.', counterChecks: ['Paspoortregistratie voltooid', 'Bundel en afloopdatum zichtbaar', 'Mobiele data zonder wifi getest', 'Nummer en supportkanaal opgeslagen'], counterAlt: 'Medewerker bij een generieke mobiele balie helpt een reiziger met simkaartregistratie',
    providerEyebrow: 'Netwerk zonder ranglijstje', providerTitle: 'AIS, True-dtac of een reis-eSIM?', providerDescription: 'Een landelijke winnaar aanwijzen op basis van één meting helpt weinig als jij op een eiland, in een bergdorp of in een druk stadion staat. Controleer de officiële kaart en vraag je accommodatie naar jouw specifieke locatie.', sixtyTitle: 'De 60-dagenregel voor Tourist SIM', sixtyText: 'Sinds 30 juni 2025 mag een Tourist SIM volgens de Thaise telecomtoezichthouder maximaal 60 dagen actief zijn. Alleen opwaarderen verlengt dat niet. Wil je hem daarna gebruiken, dan moet je je opnieuw volgens de providerprocedure identificeren. Een afzonderlijke databundel kan al eerder aflopen.',
    setupEyebrow: 'Voor vertrek voorbereiden', setupTitle: 'Installeer zonder je thuissim te laten roamen.', setupDescription: 'De precieze menunamen verschillen per iPhone, Android-versie en aanbieder. De logica blijft gelijk: installeren via wifi, lijnen labelen, Thailand voor data kiezen en je Nederlandse dataroaming uitschakelen.', setupAlt: 'Handen stellen een eSIM in op een smartphone met Bangkok op de achtergrond',
    sailyEyebrow: 'Vooraf klaarzetten', sailyTitle: 'Saily voor direct data na landing', sailyText: 'Saily biedt actuele Thailandbundels als eSIM, waaronder vaste databundels en unlimited-opties. Controleer vóór aankoop of je exacte toestel geschikt is, wanneer de geldigheid start en welke fair-use- en hotspotvoorwaarden bij jouw plan horen. Installeer het profiel thuis via wifi en activeer het volgens de aanwijzingen pas op het juiste moment.', sailyDisclosure: 'Affiliate: via onderstaande knop ontvangen wij mogelijk commissie wanneer je koopt, zonder extra kosten voor jou. Saily is één optie binnen deze onafhankelijke keuzehulp en geen automatisch antwoord voor iedere reiziger.', sailyCta: 'Bekijk actuele prijs bij Saily', navigationAlt: 'Reiziger gebruikt een smartphone voor navigatie in Bangkok bij blauwe avondlucht',
    fixEyebrow: 'Geen paniek bij nul streepjes', fixTitle: 'Los eerst de simpele instelling op.', fixDescription: 'Verwijder een eSIM-profiel niet als eerste stap. Controleer lijn, datakeuze, roaming en aanbiederinstructies in een vaste volgorde. Daarmee voorkom je dat een herstelbare instelling een nieuw aankoopprobleem wordt.', fixNote: 'Moet je direct een transfer halen? Gebruik luchthaven-wifi, open je offline voucher en los de verbinding pas op een veilige plek op.',
    amazonEyebrow: 'OneLink reisaccessoires', amazonTitle: 'Houd je telefoon bruikbaar.', amazonText: 'Een databundel helpt niet bij een lege batterij of losse kabel. Deze accessoires passen inhoudelijk bij navigatie- en transferdagen; controleer zelf specificaties en neem alleen mee wat je echt gebruikt.', amazonDisclosure: 'Amazon-affiliate: bij een aankoop via deze links ontvangen wij mogelijk commissie, zonder extra kosten voor jou. OneLink kan je naar een passende lokale Amazon-winkel sturen; aanbod, prijs en bestemming verschillen per land.', amazonCta: 'Bekijk actuele prijs bij Amazon',
    faqEyebrow: 'Vóór je activeert', faqTitle: 'Veelgestelde vragen over eSIM en simkaarten', faqDescription: 'De antwoorden combineren actuele Thaise registratieregels met praktische instellingen. Productprijzen, promoties en toestelondersteuning controleer je altijd opnieuw bij de aanbieder.', relatedEyebrow: 'Blijf slim verbonden', relatedTitle: 'Plan de rest van je Thailandreis', sourceEyebrow: 'Gecontroleerd, niet gegokt', sourceTitle: 'Bronnen & redactionele methode', sourceDescription: 'Deze gids is op 25 juli 2026 herzien aan de hand van officiële telecom- en providerbronnen, actuele DFS-zoekdata, echte Nederlandse zoekvragen en een inhoudsanalyse van concurrerende gidsen. We rangschikken netwerken niet zonder routegebonden bewijs en tonen veranderlijke prijzen niet als tijdloze feiten.',
  };
  const schemas = createSchemas(data);
  const sailyHeroUrl = withSubId(SAILY_GENERIC, `sim-card-thailand-${isEn ? 'en' : 'nl'}-hero`);
  const sailyDecisionUrl = withSubId(SAILY_GENERIC, `sim-card-thailand-${isEn ? 'en' : 'nl'}-decision`);
  const sectionNav = [
    { href: '#kiezen' as const, label: copy.nav[0], icon: Smartphone },
    { href: '#vergelijken' as const, label: copy.nav[1], icon: Signal },
    { href: '#data' as const, label: copy.nav[2], icon: Gauge },
    { href: '#kopen' as const, label: copy.nav[3], icon: Store },
    { href: '#installeren' as const, label: copy.nav[4], icon: Settings },
    { href: '#oplossen' as const, label: copy.nav[5], icon: Router },
    { href: '#vragen' as const, label: copy.nav[6], icon: CircleHelp },
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
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: copy.guides, href: '/travel-guides/' }, { label: copy.crumb }]}
          eyebrow={data.hero.eyebrow}
          title={<>{data.hero.title}</>}
          subtitle={<>{data.hero.accent}</>}
          description={<>{data.hero.description}</>}
          actions={[
            { label: copy.heroPrimary, href: '#kiezen', kind: 'primary' },
            { label: copy.heroSecondary, href: sailyHeroUrl, kind: 'secondary', newTab: true, affiliate: true, ariaLabel: copy.heroAria },
          ]}
          disclosure={copy.heroDisclosure}
          minHeightClassName="min-h-[790px] lg:min-h-[720px]"
          contentClassName="max-w-[700px]"
          titleClassName="max-w-[650px] text-[4.15rem] leading-[0.84] sm:text-[5.15rem] lg:text-[5.9rem]"
          subtitleClassName="max-w-[600px] text-[2rem] leading-[0.94] text-saffron-dark sm:text-[2.8rem]"
          imageClassName="object-cover object-[68%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.1)_0%,rgba(252,250,246,0.6)_46%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.99)_0%,rgba(252,250,246,0.94)_39%,rgba(252,250,246,0.25)_67%,rgba(9,47,39,0.1)_100%)]"
          sideCard={(
            <aside className="absolute bottom-8 right-[max(2rem,calc((100vw-1280px)/2))] z-10 hidden w-[326px] overflow-hidden rounded-2xl border border-white/60 bg-white/82 shadow-editorial-lift backdrop-blur-xl xl:block">
              <div className="flex items-center justify-between border-b border-jade/10 px-5 py-4">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-dark">{copy.sideTitle}</p>
                <span className="grid h-9 w-9 place-items-center rounded-full border border-saffron/30 bg-canvas text-jade"><Smartphone size={17} /></span>
              </div>
              <div className="space-y-3 px-5 py-5 text-[11px] font-bold leading-5 text-jade">
                {copy.sideItems.map((item) => <p key={item} className="flex gap-3"><Check size={15} className="mt-0.5 shrink-0 text-saffron" />{item}</p>)}
              </div>
              <p className="border-t border-jade/10 px-5 py-4 text-[10px] font-medium leading-4 text-charcoal/58">{copy.sideNote}</p>
            </aside>
          )}
        />

        <PageSectionNav items={sectionNav} />

        <section id="kiezen" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div>
                <SectionHeading eyebrow={copy.choiceEyebrow} title={copy.choiceTitle} description={copy.choiceDescription} />
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
                <Image src="/images/redesign/esim-thailand-choice.webp" alt={copy.choiceAlt} fill sizes="(max-width: 1024px) 100vw, 48vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-jade/30 via-transparent to-transparent lg:bg-gradient-to-r" />
              </div>
              <div className="p-7 sm:p-10 lg:p-12">
                <p className="eyebrow">{copy.choiceKicker}</p>
                <h2 className="font-display text-[2.7rem] font-semibold leading-[0.92] tracking-[-0.035em] text-jade sm:text-[3.35rem]">{copy.choiceHeading}</h2>
                <div className="mt-7 space-y-5 text-sm font-medium leading-7 text-charcoal/68">
                  {copy.choiceParagraphs.map(([lead, text]) => <p key={lead}><strong className="text-jade">{lead}</strong>{text}</p>)}
                </div>
                <aside className="mt-7 rounded-2xl border border-saffron/30 bg-tonal p-5">
                  <p className="flex items-start gap-3 text-xs font-bold leading-6 text-jade"><ShieldCheck size={19} className="mt-0.5 shrink-0 text-saffron-dark" />{copy.offlineNote}</p>
                </aside>
              </div>
            </div>
          </div>
        </section>

        <section id="vergelijken" className="section-divider-bottom scroll-mt-24 bg-tonal/45 py-16 lg:py-24">
          <div className="container-custom min-w-0">
            <SectionHeading eyebrow={copy.compareEyebrow} title={copy.compareTitle} description={copy.compareDescription} />
            <div className="mt-9 min-w-0 overflow-x-auto rounded-2xl border border-jade/10 bg-white shadow-editorial-card">
              <table className="min-w-[830px] w-full text-left text-xs">
                <thead className="bg-jade text-white">
                  <tr>{copy.compareHeaders.map((header) => <th key={header} className="px-5 py-4">{header}</th>)}</tr>
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
            <p className="mt-4 text-[10px] font-medium leading-5 text-charcoal/52">{copy.compareMobile}</p>
          </div>
        </section>

        <section id="data" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
              <SectionHeading eyebrow={copy.dataEyebrow} title={copy.dataTitle} description={copy.dataDescription} />
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
                <p className="eyebrow !text-saffron-light">{copy.unlimitedEyebrow}</p>
                <h2 className="font-display text-[2.8rem] font-semibold leading-[0.92] tracking-[-0.035em] sm:text-[3.45rem]">{copy.unlimitedTitle}</h2>
                <p className="mt-5 text-sm font-medium leading-7 text-white/72">{copy.unlimitedText}</p>
                <div className="mt-7 flex flex-wrap gap-3 text-[10px] font-extrabold uppercase tracking-[0.12em] text-white/70">
                  {copy.unlimitedTags.map((tag) => <span key={tag} className="rounded-lg border border-white/15 px-3 py-2">{tag}</span>)}
                </div>
              </div>
              <div className="relative min-h-[330px] lg:min-h-full">
                <Image src="/images/redesign/esim-thailand-coverage.webp" alt={copy.coverageAlt} fill sizes="(max-width: 1024px) 100vw, 48vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-jade/35 via-transparent to-transparent lg:bg-gradient-to-r" />
              </div>
            </div>
          </div>
        </section>

        <section id="kopen" className="section-divider-bottom scroll-mt-24 bg-tonal/45 py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading eyebrow={copy.purchaseEyebrow} title={copy.purchaseTitle} description={copy.purchaseDescription} />
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
                      <div><dt className="font-extrabold text-jade">{copy.bestFor}</dt><dd className="mt-1 text-charcoal/62">{option.goodFor}</dd></div>
                      <div><dt className="font-extrabold text-saffron-dark">{copy.caution}</dt><dd className="mt-1 text-charcoal/62">{option.caution}</dd></div>
                    </dl>
                  </article>
                );
              })}
            </div>

            <div className="mt-10 grid overflow-hidden rounded-[28px] border border-jade/10 bg-white shadow-editorial-card lg:grid-cols-[0.92fr_1.08fr]">
              <div className="relative min-h-[360px] lg:min-h-[490px]">
                <Image src="/images/redesign/esim-thailand-airport.webp" alt={copy.counterAlt} fill sizes="(max-width: 1024px) 100vw, 46vw" className="object-cover" />
              </div>
              <div className="p-7 sm:p-10 lg:p-12">
                <p className="eyebrow">{copy.counterEyebrow}</p>
                <h2 className="font-display text-[2.7rem] font-semibold leading-[0.92] tracking-[-0.035em] text-jade sm:text-[3.3rem]">{copy.counterTitle}</h2>
                <p className="mt-5 text-sm font-medium leading-7 text-charcoal/68">{copy.counterText}</p>
                <ol className="mt-7 space-y-4 text-xs font-bold leading-5 text-jade">
                  {copy.counterChecks.map((item, index) => <li key={item} className="flex items-center gap-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-jade text-[10px] text-saffron-light">{index + 1}</span>{item}</li>)}
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-16 lg:py-24">
          <div className="container-custom">
            <SectionHeading eyebrow={copy.providerEyebrow} title={copy.providerTitle} description={copy.providerDescription} />
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
              <div className="mt-4 sm:mt-0"><p className="text-sm font-extrabold text-jade">{copy.sixtyTitle}</p><p className="mt-2 text-xs font-medium leading-6 text-charcoal/68">{copy.sixtyText}</p></div>
            </aside>
          </div>
        </section>

        <section id="installeren" className="section-divider-bottom scroll-mt-24 bg-tonal/45 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
              <div>
                <SectionHeading eyebrow={copy.setupEyebrow} title={copy.setupTitle} description={copy.setupDescription} />
                <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-[24px] border border-jade/10 shadow-editorial-card">
                  <Image src="/images/redesign/esim-thailand-setup.webp" alt={copy.setupAlt} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
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
                <p className="eyebrow !text-saffron-light">{copy.sailyEyebrow}</p>
                <h2 className="font-display text-[3rem] font-semibold leading-[0.9] tracking-[-0.035em]">{copy.sailyTitle}</h2>
                <p className="mt-5 max-w-[620px] text-sm font-medium leading-7 text-white/74">{copy.sailyText}</p>
                <AffiliateDisclosure className="mt-5 !text-white/58">{copy.sailyDisclosure}</AffiliateDisclosure>
                <a href={sailyDecisionUrl} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-cream group mt-5 inline-flex min-h-12 px-6 text-saffron-dark">
                  {copy.sailyCta} <ExternalLink size={15} />
                </a>
              </div>
              <div className="relative min-h-[340px] lg:min-h-full">
                <Image src="/images/redesign/esim-thailand-navigation.webp" alt={copy.navigationAlt} fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-jade/35 via-transparent to-transparent lg:bg-gradient-to-r" />
              </div>
            </div>
          </div>
        </section>

        <section id="oplossen" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr]">
              <div>
                <SectionHeading eyebrow={copy.fixEyebrow} title={copy.fixTitle} description={copy.fixDescription} />
                <aside className="mt-7 rounded-2xl border border-saffron/30 bg-tonal p-5"><p className="flex gap-3 text-xs font-bold leading-6 text-jade"><AlertTriangle size={19} className="mt-0.5 shrink-0 text-saffron-dark" />{copy.fixNote}</p></aside>
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
                <p className="eyebrow">{copy.amazonEyebrow}</p>
                <h2 className="font-display text-[2.65rem] font-semibold leading-[0.92] tracking-[-0.035em] text-jade">{copy.amazonTitle}</h2>
                <p className="mt-5 text-sm font-medium leading-7 text-charcoal/66">{copy.amazonText}</p>
                <AffiliateDisclosure className="mt-4">{copy.amazonDisclosure}</AffiliateDisclosure>
              </div>
              <div className="grid gap-3">
                {data.amazonProducts.map((product, index) => {
                  const Icon = index === 0 ? BatteryCharging : index === 1 ? Plug : ShoppingBag;
                  return (
                    <a key={product.amazonSlug} href={`/go/${product.amazonSlug}/`} target="_blank" rel="noopener noreferrer nofollow sponsored" className="group grid grid-cols-[42px_1fr_34px] items-center gap-4 rounded-xl border border-jade/10 bg-tonal/55 p-4 transition hover:border-saffron/40 hover:bg-tonal">
                      <span className="grid h-10 w-10 place-items-center rounded-lg bg-jade text-saffron-light"><Icon size={18} /></span>
                      <span><strong className="block text-xs font-extrabold text-jade">{product.title}</strong><span className="mt-1 block text-[10px] font-medium leading-4 text-charcoal/58">{product.reason}</span><span className="mt-2 block text-[9px] font-extrabold uppercase tracking-[0.08em] text-saffron-dark">{copy.amazonCta}</span></span>
                      <ArrowRight size={16} className="text-saffron-dark transition group-hover:translate-x-1" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <FaqSplitSection id="vragen" eyebrow={copy.faqEyebrow} title={copy.faqTitle} description={copy.faqDescription} items={data.faqs} />

        <RelatedGuidesSection eyebrow={copy.relatedEyebrow} title={copy.relatedTitle} guides={data.related} />

        <SourceMethodSection eyebrow={copy.sourceEyebrow} title={copy.sourceTitle} description={copy.sourceDescription} sources={data.sources} />
      </div>
    </>
  );
}
