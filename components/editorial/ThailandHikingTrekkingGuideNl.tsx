import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Backpack,
  Check,
  CloudRain,
  Compass,
  ExternalLink,
  Footprints,
  Gauge,
  MapPinned,
  Mountain,
  Phone,
  Route,
  ShieldCheck,
  Sparkles,
  Sun,
  TimerReset,
  UserRoundCheck,
  Waves,
} from "lucide-react";
import SEOHead from "../SEOHead";
import { AffiliateDisclosure } from "../design/AffiliateDisclosure";
import { EditorialHero } from "../design/EditorialHero";
import { FaqSplitSection } from "../design/FaqSplitSection";
import { PageSectionNav } from "../design/PageSectionNav";
import { RelatedGuidesSection } from "../design/RelatedGuidesSection";
import { SectionHeading } from "../design/SectionHeading";
import { SourceMethodSection } from "../design/SourceMethodSection";
import { KLOOK_GENERIC, withPlacementSubId } from "../../lib/affiliates";
import { useSubId } from "../../lib/useSubId";

const profiles = [
  { title: "Korte natuurwandeling", tag: "Gemarkeerd & omkeerbaar", copy: "Kies een duidelijke route met bekende duur, terugkeerpunt en daglichtbuffer. Ook een korte wandeling vraagt een actuele statuscheck.", fit: "Eerste traildag, beperkt hoogteverschil, eigen tempo", icon: Footprints },
  { title: "Begeleide jungledag", tag: "Lokale routekennis", copy: "Een gids kan actuele terrein-, weer- en routecontext geven. Controleer de echte route en wat parktoegang, vervoer en eten omvatten.", fit: "Onbekend terrein, lokale regels of lastige toegang", icon: UserRoundCheck },
  { title: "Berg & waterval", tag: "Grip en hoogte tellen", copy: "Natte stenen, steile stukken en snelle weersverandering maken afstand alleen een slechte moeilijkheidsmaat. Beoordeel terrein en afdaling.", fit: "Ervaren wandelaar met passende schoenen en buffer", icon: Mountain },
  { title: "Meerdaagse trekking", tag: "Keten in plaats van dag", copy: "Overnachting, eten, water, bagage, communicatie en evacuatie zijn onderdeel van de route. Laat één mooie foto deze keten niet verbergen.", fit: "Geteste uitrusting, realistische conditie en begeleiding", icon: Backpack },
];

const readiness = [
  { title: "Status", question: "Is precies deze trail open?", copy: "Controleer park, zone, route en lokale melding opnieuw vlak voor vertrek.", icon: MapPinned },
  { title: "Terrein", question: "Past de ondergrond bij mij?", copy: "Vraag naar stijgen, dalen, modder, waterkruisingen, grip en technische passages.", icon: Gauge },
  { title: "Tijd", question: "Wanneer moet ik omkeren?", copy: "Leg start, daglichtbuffer, laatste vervoer en een harde omkeertijd vooraf vast.", icon: TimerReset },
  { title: "Weer", question: "Wat verandert de route vandaag?", copy: "Hitte, regen, zicht, waterstand en onweer kunnen een normale route ongeschikt maken.", icon: CloudRain },
  { title: "Communicatie", question: "Wie kent mijn plan?", copy: "Deel route en terugkeertijd en controleer bereik, offline kaart en relevante contactpunten.", icon: Phone },
];

const packList = [
  "Passende, vooraf ingelopen schoenen met grip voor de echte ondergrond",
  "Lichte laagjes plus regen- en zonbescherming voor de dagcondities",
  "Voldoende water en eten op basis van route, duur en lokale aanvulpunten",
  "Opgeladen telefoon, offline route en een waterbestendige opbergmethode",
  "Persoonlijk noodzakelijke medicatie en alleen middelen die je correct kunt gebruiken",
  "Een lichte dagtas; laat overbodig gewicht en ongeteste gadgets achter",
];

const products = [
  { title: "Lichte opvouwbare dagrugzak", copy: "Alleen nuttig wanneer pasvorm, volume en draagcomfort bij jouw trailbelasting passen. Test hem vóór vertrek.", slug: "venture-pal-packable-backpack", icon: Backpack },
  { title: "Waterbestendige dry bag", copy: "Kan telefoon, documenten of droge laag scheiden van regen en spatwater; geen garantie dat elektronica altijd beschermd blijft.", slug: "earth-pak-dry-bag", icon: Waves },
  { title: "Compacte regenponcho", copy: "Controleer maat, ventilatie, zicht en bewegingsruimte. Een poncho vervangt geen route- of onweersbesluit.", slug: "hagon-rain-ponchos", icon: CloudRain },
];

const faqs = [
  { question: "Waar kun je het beste hiken in Thailand?", answer: "Dat hangt af van het profiel. Chiang Mai en Chiang Rai bieden veel begeleide berg- en jungledagen, Khao Sok regenwoudcontext, Khao Yai bosroutes en Doi Inthanon hoogte en watervallen. Kies eerst terrein, duur en logistiek en controleer daarna de actuele trailstatus." },
  { question: "Kun je in Thailand zelfstandig wandelen?", answer: "Op sommige gemarkeerde, open en goed begrepen routes kan dat passen; andere zones vereisen of verdienen een ranger of gekwalificeerde lokale gids. Baseer het besluit op actuele regels, terrein, weer, bereik, ervaring en terugkeeropties—niet alleen op een oude blogroute." },
  { question: "Wat neem je mee tijdens een trekking in Thailand?", answer: "Neem passende ingelopen schoenen, lichte laagjes, regen- en zonbescherming, voldoende water en eten, telefoon met offline route en persoonlijk noodzakelijke medicatie mee. De exacte hoeveelheid en uitrusting hangen af van duur, terrein, weer, gids en aanvulpunten." },
  { question: "Wanneer is het beste seizoen voor trekking in Thailand?", answer: "Er is geen landelijke beste maand voor iedere route. Noord, zuid, berg, regenwoud en waterval reageren anders op regen, hitte, zicht en sluitingen. Controleer het regionale weer én de lokale trailmelding vlak voor vertrek." },
  { question: "Heb je voor jungle trekking in Thailand een gids nodig?", answer: "Volg altijd de lokale park- en trailregels. Een gids is verstandig of vereist bij onbekend terrein, ongemarkeerde of beperkte zones, meerdaagse routes en situaties waarin actuele lokale routekennis essentieel is. Controleer kwalificatie, route, groep en inclusies vóór boeken." },
];

export default function ThailandHikingTrekkingGuideNl() {
  const subId = useSubId();
  const klookHref = withPlacementSubId(KLOOK_GENERIC, subId, "hiking-trekking-thailand-nl-guided");
  const pageUrl = "https://go2-thailand.com/nl/travel-guides/hiking-trekking-thailand/";
  const schemas = [
    { "@context":"https://schema.org", "@type":"Article", headline:"Hiken en trekking in Thailand: kies route, gids en trailkit", description:"Kies een passend trekkingprofiel en controleer status, terrein, weer, omkeertijd, begeleiding en uitrusting.", image:"https://go2-thailand.com/images/redesign/thailand-hiking-trekking-hero-v2.webp", url:pageUrl, inLanguage:"nl-NL", author:{"@type":"Organization",name:"GO2 Thailand"}, publisher:{"@type":"Organization",name:"GO2 Thailand"}, dateModified:"2026-07-31" },
    { "@context":"https://schema.org", "@type":"FAQPage", mainEntity:faqs.map(({question,answer})=>({"@type":"Question",name:question,acceptedAnswer:{"@type":"Answer",text:answer}})) },
    { "@context":"https://schema.org", "@type":"BreadcrumbList", itemListElement:[{ "@type":"ListItem",position:1,name:"Thailand",item:"https://go2-thailand.com/nl/"},{"@type":"ListItem",position:2,name:"Reisgidsen",item:"https://go2-thailand.com/nl/travel-guides/"},{"@type":"ListItem",position:3,name:"Hiken en trekking",item:pageUrl}] },
  ];

  return <>
    <SEOHead title="Hiken en trekking Thailand: routes, gids en paklijst" description="Plan hiken in Thailand met een passend trailprofiel, actuele status, terrein- en weercheck, omkeertijd, gidskeuze en compacte trekkingpaklijst." ogImage="https://go2-thailand.com/images/redesign/thailand-hiking-trekking-hero-v2.webp">{schemas.map((schema,index)=><script key={index} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}} />)}</SEOHead>
    <div data-premium-template="hiking-trekking-thailand-nl" className="overflow-hidden bg-canvas text-charcoal">
      <EditorialHero image="/images/redesign/thailand-hiking-trekking-hero-v2.webp" imageAlt="Lokale gids en twee wandelaars volgen een gemarkeerd bospad in Thailand" breadcrumbs={[{label:"Thailand",href:"/"},{label:"Reisgidsen",href:"/travel-guides/"},{label:"Hiken & trekking"}]} eyebrow="Kies je trail vóór je uitzicht" title={<>Loop verder.<br/><span className="text-saffron-light">Plan je terugweg.</span></>} subtitle="Een goede trekking begint met het omkeerpunt." description="Kies een route die bij je conditie, terrein en dag past. Controleer actuele status, weer, begeleiding, communicatie en uitrusting voordat je het pad opgaat." actions={[{label:"Kies je trailprofiel",href:"#profielen",kind:"primary"},{label:"Check je traildag",href:"#trailcheck",kind:"secondary"}]} contentTone="light" gradientClassName="bg-[linear-gradient(90deg,rgba(3,27,22,0.98)_0%,rgba(3,27,22,0.9)_43%,rgba(3,27,22,0.22)_69%,rgba(3,27,22,0.02)_100%)]" imageClassName="object-cover object-[62%_center]" titleClassName="max-w-[760px] text-[4rem] leading-[0.84] !text-white sm:text-[5rem] lg:text-[5.8rem]" subtitleClassName="max-w-[620px] text-[1.35rem] leading-[1.12] !text-white sm:text-[1.6rem]" descriptionClassName="mt-4 max-w-[610px] text-sm leading-7 !text-white/75" />
      <PageSectionNav items={[{href:"#profielen",label:"Trailprofiel",icon:Footprints},{href:"#trailcheck",label:"Trailchecks",icon:Compass},{href:"#inpakken",label:"Wat neem je mee?",icon:Backpack},{href:"#vragen",label:"Vragen",icon:Sparkles}]} />

      <section className="section-divider-bottom bg-jade py-5 text-white"><div className="container-custom grid gap-3 sm:grid-cols-3">{[{k:"Vooraf",v:"Status en terrein",I:MapPinned},{k:"Onderweg",v:"Weer en omkeertijd",I:TimerReset},{k:"Bij twijfel",v:"Stop, keer om of neem een gids",I:ShieldCheck}].map(({k,v,I})=><div key={k} className="flex min-h-20 items-center gap-4 rounded-xl border border-white/12 bg-white/7 px-5 py-4"><span className="grid h-10 w-10 place-items-center rounded-full bg-saffron text-jade"><I size={20}/></span><span><span className="block text-[9px] font-extrabold uppercase tracking-[.15em] text-white/55">{k}</span><strong className="font-display text-xl">{v}</strong></span></div>)}</div></section>

      <section id="profielen" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"><div className="container-custom"><SectionHeading eyebrow="Afstand zegt niet hoe zwaar het wordt" title={<>Vier trailprofielen.<br/>Eén eerlijke keuze.</>} description="Vergelijk terrein, duur, begeleiding en terugkeerketen. Kies daarna een bestemming en controleer de specifieke route bij park, ranger of lokale operator."/><div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{profiles.map(({title,tag,copy,fit,icon:Icon},index)=><article key={title} className="flex min-h-[365px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><div className="flex items-start justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/25 bg-saffron/8 text-jade"><Icon size={21}/></span><span className="font-display text-4xl text-jade/12">0{index+1}</span></div><p className="mt-7 text-[9px] font-extrabold uppercase tracking-[.15em] text-saffron-dark">{tag}</p><h3 className="mt-2 font-display text-[1.7rem] font-semibold leading-none text-jade">{title}</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/68">{copy}</p><p className="mt-auto border-t border-jade/10 pt-4 text-[10px] font-semibold leading-5 text-charcoal/50">Past bij: {fit}</p></article>)}</div></div></section>

      <section id="trailcheck" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20"><div className="container-custom grid gap-10 lg:grid-cols-[.65fr_1.35fr]"><div className="lg:sticky lg:top-28"><SectionHeading eyebrow="Groen licht bestaat uit vijf checks" title="Is deze trail vandaag van jou?" description="Een open park, zonnige foto of opgegeven afstand is geen complete trailcheck. Leg elke laag apart vast."/><div className="mt-7 rounded-2xl border border-saffron/25 bg-white p-5"><p className="text-[9px] font-extrabold uppercase tracking-[.15em] text-saffron-dark">Harde omkeerregel</p><p className="mt-3 text-xs font-medium leading-6 text-charcoal/68">Keer om bij sluiting, verloren route, onvoldoende tijd of water, snelle weersverandering, blessure of hitteklachten. De top of waterval blijft staan.</p></div></div><div className="grid gap-4 sm:grid-cols-2">{readiness.map(({title,question,copy,icon:Icon},index)=><article key={title} className={`min-h-[235px] rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card ${index===4?'sm:col-span-2':''}`}><div className="flex items-start justify-between"><span className="grid h-11 w-11 place-items-center rounded-full bg-jade text-saffron"><Icon size={20}/></span><span className="text-[10px] font-extrabold tracking-[.15em] text-saffron-dark">CHECK 0{index+1}</span></div><h3 className="mt-6 font-display text-[1.65rem] font-semibold leading-none text-jade">{title}</h3><p className="mt-2 text-xs font-extrabold text-charcoal/75">{question}</p><p className="mt-3 text-xs font-medium leading-6 text-charcoal/62">{copy}</p></article>)}</div></div></section>

      <section id="inpakken" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"><div className="container-custom"><div className="grid overflow-hidden rounded-[1.7rem] border border-jade/10 bg-white shadow-editorial-card lg:grid-cols-[.82fr_1.18fr]"><div className="relative min-h-[430px]"><Image src="/images/redesign/first-time-thailand-packing.webp" alt="Compacte reisuitrusting overzichtelijk klaargelegd voor vertrek" fill sizes="(max-width:1024px) 100vw, 42vw" className="object-cover"/></div><div className="p-7 lg:p-10"><p className="eyebrow">Wat neem je mee?</p><h2 className="font-display text-[3.25rem] font-semibold leading-[.9] tracking-[-.04em] text-jade">Pak voor de route,<br/>niet voor de angst</h2><ul className="mt-7 space-y-3">{packList.map(item=><li key={item} className="flex gap-3 text-xs font-medium leading-5 text-charcoal/68"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-saffron text-jade"><Check size={12} strokeWidth={3}/></span>{item}</li>)}</ul><p className="mt-6 border-t border-jade/10 pt-5 text-[10px] font-medium leading-5 text-charcoal/52">Vraag je gids of park naar route-specifieke eisen. Geen product compenseert voor een gesloten trail, verkeerd schoeisel, onvoldoende water of een te late start.</p></div></div></div></section>

      <section className="section-divider-bottom bg-jade py-14 text-white lg:py-20"><div className="container-custom"><div className="grid gap-9 lg:grid-cols-[.65fr_1.35fr]"><div><p className="eyebrow !text-saffron-light">Amazon OneLink · alleen trailtaken</p><h2 className="font-display text-[3.2rem] font-semibold leading-[.9]">Drie lichte checks.<br/>Geen expeditietheater.</h2><p className="mt-5 text-sm font-medium leading-7 text-white/65">Controleer product, maat, materiaal, verkoper, actuele prijs en levering zelf. OneLink kan je naar een lokale Amazon-winkel sturen.</p></div><div className="grid gap-4 sm:grid-cols-3">{products.map(({title,copy,slug,icon:Icon})=><article key={slug} className="flex min-h-[290px] flex-col rounded-2xl border border-white/12 bg-white/[.06] p-6"><Icon className="text-saffron-light"/><h3 className="mt-6 font-display text-[1.55rem] font-semibold leading-none">{title}</h3><p className="mt-4 flex-1 text-xs font-medium leading-6 text-white/62">{copy}</p><a href={`/go/${slug}/`} target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-6 inline-flex items-center gap-2 text-[10px] font-extrabold text-saffron-light">Bekijk actuele prijs bij Amazon <ExternalLink size={12}/></a></article>)}</div><AffiliateDisclosure className="lg:col-start-2 !text-white/55">Als Amazon-partner verdienen wij aan in aanmerking komende aankopen, zonder extra kosten voor jou. Onze centrale /go/-routes ondersteunen OneLink; lokale winkel, product, verkoper, prijs en beschikbaarheid kunnen verschillen.</AffiliateDisclosure></div></div></section>

      <section className="section-divider-bottom bg-tonal py-14 lg:py-20"><div className="container-custom grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center"><div><SectionHeading eyebrow="Een gids verkoopt geen garantie" title="Controleer de echte trekking" description="Vraag naar route, terrein, duur, groepsgrootte, gids, vervoer, parktoegang, eten, water, uitrusting en annuleringsvoorwaarden. Een wildlife- of weerbelofte is geen kwaliteitsbewijs."/><AffiliateDisclosure className="mt-5">Klook-affiliatelink: we kunnen commissie ontvangen zonder extra kosten voor jou. Controleer de actuele tour, prijs en voorwaarden rechtstreeks bij de aanbieder.</AffiliateDisclosure></div><div className="rounded-2xl bg-jade p-7 text-white"><Route className="text-saffron"/><h3 className="mt-5 font-display text-3xl font-semibold">Begeleide trekking vergelijken</h3><p className="mt-3 text-xs font-medium leading-6 text-white/65">Boek pas nadat de officiële trailstatus en je eigen routefit duidelijk zijn.</p><a href={klookHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-cream mt-6 min-h-12 px-6 text-saffron-dark">Bekijk actuele trekkingtours <ExternalLink size={15}/></a></div></div></section>

      <div id="vragen"><FaqSplitSection eyebrow="Echte zoekvragen" title="Veelgestelde vragen over trekking in Thailand" description="Antwoorden zonder universele beste route, vaste seizoensgarantie of schijnveiligheid door uitrusting." items={faqs}/></div>
      <RelatedGuidesSection title="Bouw je natuurdag compleet" guides={[{title:"Nationale parken",description:"Kies eerst het juiste parkprofiel en controleer de specifieke zone-openstelling.",href:"/travel-guides/national-parks-thailand/",image:"/images/redesign/thailand-national-parks-hero-v2.webp"},{title:"Dierenrisico's",description:"Houd afstand en volg na contact de professionele handelingsroute.",href:"/travel-guides/dangerous-animals-thailand/",image:"/images/redesign/thailand-animal-risk-hero-v2.webp"},{title:"Khao Sok",description:"Verdiep regenwoud-, meer-, transfer- en verblijflogistiek voor Khao Sok.",href:"/city/khao-sok/",image:"/images/redesign/khao-sok-attractions-hero.webp"}]}/>
      <SourceMethodSection title="Trailstatus en hitte zijn momentopnames" description="Nederlandse SERP-intenties zijn op 31 juli 2026 zichtbaar gecontroleerd. DNP onderbouwt lokale sluitingschecks; WHO onderbouwt dat hittebelasting samenhangt met intensiteit, duur en acclimatisatie. Persoonlijke medische geschiktheid blijft bij een zorgprofessional." sources={[{title:"Trailveiligheid en heropening",creator:"Department of National Parks Thailand",url:"https://news.dnp.go.th/news/46094",note:"Primaire melding over tijdelijke trailsluiting, veiligheidsmaatregelen en heropening."},{title:"Sluiting vanwege wildlifeveiligheid",creator:"Department of National Parks Thailand",url:"https://news.dnp.go.th/news/40627",note:"Primaire melding die laat zien dat lokale routeveiligheid direct kan wijzigen."},{title:"Heat and health",creator:"World Health Organization",url:"https://www.who.int/news-room/fact-sheets/detail/climate-change-heat-and-health",note:"Primaire gezondheidscontext over warmte, blootstellingsduur, inspanning en acclimatisatie."},{title:"Reisadvies Thailand",creator:"NederlandWereldwijd",url:"https://www.nederlandwereldwijd.nl/reisadvies/thailand",note:"Actuele Nederlandse reis- en natuurgeweldcontext; controleer opnieuw voor vertrek."}]}/>
    </div>
  </>;
}
