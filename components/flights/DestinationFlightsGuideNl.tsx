import {
  ArrowRight,
  BaggageClaim,
  CheckCircle2,
  ExternalLink,
  MapPin,
  Plane,
  Route,
  ShieldCheck,
  TicketCheck,
  Waypoints,
} from "lucide-react";
import Link from "next/link";
import SEOHead from "../SEOHead";
import { AffiliateDisclosure } from "../design/AffiliateDisclosure";
import { EditorialHero } from "../design/EditorialHero";
import { FaqSplitSection } from "../design/FaqSplitSection";
import { PageSectionNav } from "../design/PageSectionNav";
import { SectionHeading } from "../design/SectionHeading";
import { SourceMethodSection } from "../design/SourceMethodSection";
import { withSubId } from "../../lib/affiliates";

export interface DestinationFlightRoute {
  code: string;
  from: string;
  fromName: string;
  tier: "domestic" | "regional" | "long-haul" | "search";
  partnerUrl: string;
}

type Destination = "bangkok" | "chiang-mai";

const CONFIG = {
  bangkok: {
    name: "Bangkok",
    code: "BKK of DMK",
    slug: "bangkok",
    image: "/images/homepageHero/downtown-bangkok.webp",
    alt: "De skyline van Bangkok bij warm avondlicht",
    eyebrow: "Eerst de luchthaven, daarna het ticket",
    title: "Vliegen naar Bangkok.",
    accent: "BKK en DMK slim vergelijken.",
    subtitle: "Twee luchthavens, één belangrijke controle.",
    description:
      "Een goede Bangkok-vlucht past bij je vervolgroute. Controleer daarom niet alleen prijs en reistijd, maar ook luchthaven, ticketstructuur, bagage en de rit naar je eerste verblijf.",
    distinctionTitle: "BKK en DMK zijn geen terminals van hetzelfde vliegveld",
    distinctionCopy:
      "Suvarnabhumi (BKK) en Don Mueang (DMK) liggen op verschillende locaties. Een aansluiting met luchthavenwissel vraagt immigratie, bagage ophalen, vervoer door Bangkok en opnieuw inchecken. Vergelijk die combinatie als twee losse reisdelen.",
    onward: [
      { href: "/city/bangkok/", label: "Bangkok reisgids" },
      { href: "/best-hotels/bangkok/", label: "Hotels in Bangkok kiezen" },
      { href: "/transport/bangkok-to-chiang-mai/", label: "Van Bangkok naar Chiang Mai" },
    ],
  },
  "chiang-mai": {
    name: "Chiang Mai",
    code: "CNX",
    slug: "chiang-mai",
    image: "/images/blog/12-best-day-trips-from-chiang-mai-temples-waterfalls-mountains.webp",
    alt: "Berglandschap en tempels rond Chiang Mai",
    eyebrow: "Plan de aansluiting als onderdeel van je reis",
    title: "Vliegen naar Chiang Mai.",
    accent: "Eén ticket of zelf overstappen?",
    subtitle: "De verbinding bepaalt hoeveel rust je reis houdt.",
    description:
      "Naar CNX vergelijk je meer dan een vluchtduur. Een doorgaand ticket, een losse Bangkok-aansluiting of een regionale hub hebben elk andere gevolgen voor bagage, bescherming en overstapruimte.",
    distinctionTitle: "Een Bangkok-aansluiting kan één of twee reizen zijn",
    distinctionCopy:
      "Bij één boeking kan de luchtvaartmaatschappij je aansluiting en bagage doorgaans als geheel behandelen. Met losse tickets draag je zelf het risico bij vertraging en moet je mogelijk opnieuw inchecken. Controleer bovendien of beide vluchten dezelfde Bangkok-luchthaven gebruiken.",
    onward: [
      { href: "/city/chiang-mai/", label: "Chiang Mai reisgids" },
      { href: "/best-hotels/chiang-mai/", label: "Hotels in Chiang Mai kiezen" },
      { href: "/transport/bangkok-to-chiang-mai/", label: "Vervoer vanuit Bangkok" },
    ],
  },
} as const;

const FAQ = {
  bangkok: [
    { question: "Kun je rechtstreeks van Amsterdam naar Bangkok vliegen?", answer: "Rechtstreekse opties en dienstregelingen kunnen veranderen. Zoek voor je exacte data en controleer in het resultaat of er werkelijk nul overstappen staan, welke Bangkok-luchthaven wordt gebruikt en wat bij het tarief is inbegrepen." },
    { question: "Hoeveel uur is het vliegen naar Bangkok?", answer: "De totale reis hangt af van vertrekpunt, route, eventuele overstap en aankomstluchthaven. Vergelijk daarom de volledige deur-tot-deurreis in plaats van één algemene vliegduur." },
    { question: "Wat is het verschil tussen BKK en DMK?", answer: "BKK is Suvarnabhumi en DMK is Don Mueang. Het zijn twee afzonderlijke luchthavens. Controleer bij een overstap altijd de codes; een wissel vraagt vervoer, extra tijd en meestal opnieuw inchecken." },
    { question: "Wat is de goedkoopste maand om naar Bangkok te vliegen?", answer: "Er bestaat geen blijvend goedkoopste maand voor iedere route. Reisdata, vraag, bagage en tariefvoorwaarden veranderen de totaalprijs. Vergelijk een flexibele band rond je data en bekijk de actuele prijs bij de aanbieder." },
    { question: "Welke luchthaven is handig voor Bangkok?", answer: "Dat hangt af van je vlucht, wijk en vervolgroute. BKK is vaak relevant voor internationale verbindingen; DMK komt veel voor bij regionale en binnenlandse routes. Kijk naar de totale reis, niet alleen het ticket." },
  ],
  "chiang-mai": [
    { question: "Kun je rechtstreeks naar Chiang Mai vliegen vanuit Nederland?", answer: "Beschikbaarheid verandert per seizoen en dienstregeling. Voor veel Nederlandse zoekopdrachten is een verbinding via Bangkok of een andere Aziatische hub relevant. Controleer voor jouw data of alles op één ticket staat." },
    { question: "Op welke luchthaven vlieg je voor Chiang Mai?", answer: "Chiang Mai International Airport gebruikt de code CNX. Controleer die code in elk vluchtresultaat en plan daarna je vervoer naar je echte accommodatieadres." },
    { question: "Hoe lang vlieg je naar Chiang Mai?", answer: "De totale duur wordt vooral bepaald door vertrekpunt, hub en overstap. Vergelijk de complete reisduur, de overstapruimte en de ticketstructuur; een korte verbinding is niet automatisch de veiligste keuze." },
    { question: "Is overstappen in Bangkok handig?", answer: "Dat kan, vooral wanneer de verbinding op één ticket staat. Bij losse tickets heb je meer buffer nodig. Let extra op een mogelijke wissel tussen BKK en DMK." },
    { question: "Wat is de goedkoopste maand om naar Chiang Mai te vliegen?", answer: "Een vaste goedkoopste maand is niet betrouwbaar. Vergelijk actuele tarieven rond je data en neem bagage, betaalvoorwaarden en eventuele losse aansluitingen mee in de totaalprijs." },
  ],
} as const;

export default function DestinationFlightsGuideNl({ destination, routes }: { destination: Destination; routes: DestinationFlightRoute[] }) {
  const c = CONFIG[destination];
  const generic = routes.find((route) => route.tier === "search");
  const liveUrl = withSubId(generic?.partnerUrl || "https://trip.tpo.lv/8K2VZTtC", `${destination}-flights-owner-nl-live`);
  const routeGroups = [
    { tier: "domestic", title: "Vanuit Thailand", copy: "Handig binnen een rondreis. Controleer bij losse tickets je overstapbuffer en bagage." },
    { tier: "regional", title: "Via een Aziatische hub", copy: "Vergelijk terminal, transitvoorwaarden en of de bagage wordt doorgelabeld." },
    { tier: "long-haul", title: "Vanuit Nederland en verder", copy: "Beoordeel totale reisduur en ticketbescherming, niet alleen het eerste tarief." },
  ] as const;
  const faqs = FAQ[destination];
  const canonical = `https://go2-thailand.com/nl/flights-to-${c.slug}/`;
  const schemas = [
    { "@context": "https://schema.org", "@type": "WebPage", name: `Vluchten naar ${c.name}`, description: `Onafhankelijke keuzehulp voor routes, overstappen en aankomst in ${c.name}.`, url: canonical, inLanguage: "nl-NL" },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
  ];

  return <>
    <SEOHead title={`Vluchten naar ${c.name}: routes en overstappen kiezen`} description={`Vergelijk hoe je naar ${c.name} vliegt. Heldere uitleg over tickets, bagage, overstappen, luchthavens en actuele vluchtprijzen bij de aanbieder.`}>
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="nl" href={canonical} />
      <link rel="alternate" hrefLang="en" href={`https://go2-thailand.com/flights-to-${c.slug}/`} />
      {schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
    </SEOHead>
    <div className="bg-canvas text-charcoal">
      <EditorialHero image={c.image} imageAlt={c.alt} breadcrumbs={[{ label: "Thailand", href: "/" }, { label: "Vervoer", href: "/transport/" }, { label: `Vluchten naar ${c.name}` }]} eyebrow={c.eyebrow} title={<>{c.title}<br/><span className="text-saffron-dark">{c.accent}</span></>} subtitle={c.subtitle} description={c.description} actions={[{ label: "Vergelijk je route", href: "#routekeuze", kind: "primary" }, { label: "Bekijk actuele prijs", href: liveUrl, kind: "secondary", newTab: true, affiliate: true }]} disclosure="De prijscheck is een affiliate-link. Wij kunnen commissie ontvangen zonder extra kosten voor jou. Prijs, route, bagage en voorwaarden controleer je altijd bij de aanbieder." titleClassName="max-w-[760px] text-[3.5rem] leading-[0.9] sm:text-[4.7rem] lg:text-[5.35rem]" />
      <PageSectionNav label="Op deze pagina" items={[{ href: "#routekeuze", label: "Routekeuze", icon: Waypoints }, { href: "#luchthaven", label: "Luchthaven", icon: MapPin }, { href: "#vertreksteden", label: "Vertreksteden", icon: Plane }, { href: "#boekingscheck", label: "Boekingscheck", icon: TicketCheck }, { href: "#vragen", label: "Vragen", icon: ShieldCheck }]} />

      <section id="routekeuze" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"><div className="container-custom">
        <SectionHeading eyebrow="De keuze vóór de prijs" title={<>Drie routes.<br/>Drie andere afwegingen.</>} description="Zet eerst de ticketstructuur goed; vergelijk daarna pas het actuele tarief." />
        <div className="mt-9 grid gap-4 lg:grid-cols-3">{[
          [TicketCheck, "Eén doorgaand ticket", "Meer samenhang bij bagage en een gemiste aansluiting, maar controleer de voorwaarden."],
          [Route, "Losse tickets combineren", "Meer keuze, maar jij draagt meestal zelf het aansluitrisico en hebt extra buffer nodig."],
          [BaggageClaim, "Bagage als beslispunt", "Een laag basistarief kan na ruimbagage, stoelkeuze en betaaltoeslagen anders uitpakken."],
        ].map(([Icon, title, copy], i) => { const I = Icon as typeof Plane; return <article key={String(title)} className={`rounded-[1.25rem] border border-jade/10 p-6 ${i === 2 ? "bg-jade text-ivory" : "bg-white"}`}><I className={i === 2 ? "text-saffron" : "text-jade"} size={27}/><h3 className="mt-5 font-display text-2xl">{String(title)}</h3><p className={`mt-3 text-sm leading-7 ${i === 2 ? "text-ivory/78" : "text-muted"}`}>{String(copy)}</p></article>})}
        </div>
      </div></section>

      <section id="luchthaven" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"><div className="container-custom grid items-center gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        <div><p className="eyebrow">Luchthavencode {c.code}</p><h2 className="mt-3 font-display text-4xl leading-tight text-jade lg:text-5xl">{c.distinctionTitle}</h2><p className="mt-5 max-w-xl leading-8 text-muted">{c.distinctionCopy}</p></div>
        <div className="rounded-[1.5rem] bg-jade p-7 text-ivory lg:p-9"><div className="flex items-center gap-3 text-saffron"><MapPin/><span className="text-xs font-bold uppercase tracking-[0.2em]">Controle vóór betalen</span></div><ul className="mt-6 grid gap-4 text-sm leading-6 sm:grid-cols-2">{["Luchthavencode en terminal", "Eén boeking of losse tickets", "Bagage doorgelabeld of ophalen", "Tijd tot je echte verblijf"].map((item)=><li key={item} className="flex gap-3"><CheckCircle2 className="mt-0.5 shrink-0 text-saffron" size={18}/>{item}</li>)}</ul></div>
      </div></section>

      <section id="vertreksteden" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"><div className="container-custom">
        <SectionHeading eyebrow="Vertrekroute kiezen" title={`Veelgebruikte routes naar ${c.name}`} description="Deze steden zijn startpunten voor een live zoekopdracht, geen belofte dat een route iedere dag of rechtstreeks wordt uitgevoerd." />
        <div className="mt-9 grid gap-6 lg:grid-cols-3">{routeGroups.map((group)=><div key={group.tier}><div className="mb-4"><h3 className="font-display text-2xl text-jade">{group.title}</h3><p className="mt-2 text-sm leading-6 text-muted">{group.copy}</p></div><div className="grid gap-2">{routes.filter(r=>r.tier===group.tier).slice(0,7).map(route=><a key={route.code} href={withSubId(route.partnerUrl, `${destination}-${route.from.toLowerCase()}-nl`)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="group flex items-center justify-between rounded-xl border border-jade/10 bg-white px-4 py-3 text-sm font-semibold text-jade transition hover:border-saffron/50"><span>{route.fromName} <span className="ml-1 text-xs font-normal text-muted">{route.from}</span></span><ExternalLink size={15} className="text-saffron"/></a>)}</div></div>)}</div>
        <AffiliateDisclosure className="mt-8" text="De vertrekstadknoppen openen een actuele zoekopdracht bij onze affiliatepartner. Wij ontvangen mogelijk commissie; jij betaalt daardoor niet meer. Beschikbaarheid en totaalprijs staan uitsluitend bij de aanbieder." />
      </div></section>

      <section id="boekingscheck" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"><div className="container-custom grid gap-9 lg:grid-cols-[1fr_0.9fr]">
        <div><SectionHeading eyebrow="Voor je betaalt" title="Vergelijk dezelfde reis, niet alleen hetzelfde bedrag" description="Een eerlijke prijsvergelijking gebruikt dezelfde bagage, ticketvoorwaarden en aansluiting."/><div className="mt-7 grid gap-3 sm:grid-cols-2">{["Totale deur-tot-deurduur", "Ruim- en handbagage", "Wijzigen en annuleren", "Zelfde of andere luchthaven", "Minimale overstaptijd", "Vervoer na aankomst"].map(item=><div key={item} className="flex items-center gap-3 rounded-xl border border-jade/10 bg-white p-4 text-sm font-semibold text-jade"><CheckCircle2 size={18} className="text-saffron"/>{item}</div>)}</div></div>
        <aside className="rounded-[1.5rem] bg-sand p-7 lg:p-9"><Plane className="text-saffron"/><h3 className="mt-5 font-display text-3xl text-jade">Klaar om live te vergelijken?</h3><p className="mt-3 leading-7 text-muted">Gebruik je exacte data en controleer in het laatste boekingsscherm de luchthaven, bagage en voorwaarden.</p><a href={liveUrl} target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-6 inline-flex items-center gap-3 rounded-lg bg-jade px-5 py-3 text-sm font-bold text-white">Bekijk actuele prijs bij aanbieder <ArrowRight size={17} className="text-saffron"/></a></aside>
      </div></section>

      <FaqSplitSection id="vragen" eyebrow="Voor vertrek" title={`Veelgestelde vragen over vliegen naar ${c.name}`} items={[...faqs]} />
      <section className="section-divider-top py-14"><div className="container-custom"><div className="rounded-[1.5rem] bg-jade p-7 text-ivory lg:flex lg:items-center lg:justify-between lg:p-9"><div><p className="eyebrow text-saffron">Na je vluchtkeuze</p><h2 className="mt-2 font-display text-3xl">Plan de rest van je reis</h2></div><div className="mt-6 flex flex-wrap gap-3 lg:mt-0">{c.onward.map(item=><Link key={item.href} href={item.href} className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/15">{item.label}<ArrowRight size={15} className="text-saffron"/></Link>)}</div></div></div></section>
      <SourceMethodSection title="Zo bijgehouden" description="We scheiden blijvende keuzehulp van veranderlijke dienstregelingen en prijzen." sources={[{ label: "Schiphol — actuele vlucht- en luchthaveninformatie", href: "https://www.schiphol.nl/" }, { label: "Airports of Thailand — officiële luchthaveninformatie", href: "https://www.airportthai.co.th/" }, { label: "EU — rechten van luchtvaartpassagiers", href: "https://europa.eu/youreurope/citizens/travel/passenger-rights/air/index_nl.htm" }]} method="Nederlandse zoekintentie en zichtbare Google-NL PAA's zijn gecombineerd met officiële luchthaven- en passagiersbronnen. Actuele commerciële gegevens worden niet als vaste redactionele feiten opgeslagen." />
    </div>
  </>;
}
