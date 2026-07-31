import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Binoculars,
  CalendarCheck,
  Check,
  CloudRain,
  ExternalLink,
  Footprints,
  Leaf,
  MapPinned,
  Mountain,
  Route,
  ShieldCheck,
  Sparkles,
  Trees,
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
import { KLOOK_GENERIC, TRIP_GENERIC, withPlacementSubId } from "../../lib/affiliates";
import { useSubId } from "../../lib/useSubId";

const parkProfiles = [
  { title: "Khao Yai", tag: "Bos & wildlife", copy: "Een toegankelijke parkbasis voor bosroutes, uitzichtpunten en ranger-led natuurbeleving. Kies hem voor een compacte landroute, niet voor een gegarandeerde waarneming.", check: "Route, verkeerssituatie, rangeradvies en actuele zone-openstelling", icon: Binoculars },
  { title: "Khao Sok", tag: "Regenwoud & meer", copy: "Combineert regenwoudlogistiek met meer- en bootzones. Past bij reizigers die tijd maken voor transfer, weerbuffer en eventueel een overnachting.", check: "Land- of meerzone, boot, verblijf, regen en gidsvereiste", icon: Trees },
  { title: "Doi Inthanon", tag: "Berg & koelte", copy: "Een bergprofiel met wegtrajecten, uitzicht, watervallen en wandelzones. Hoogte en zicht kunnen de ervaring sterk veranderen.", check: "Zicht, temperatuur, trailstatus, vervoer en lokale regels", icon: Mountain },
  { title: "Erawan", tag: "Waterval als dagdoel", copy: "Een duidelijke dagparkkeuze vanuit Kanchanaburi. Waterstand, drukte, padconditie en tijdelijke beperkingen bepalen hoeveel van de route haalbaar is.", check: "Water, toegangstijd, schoenen, terugweg en sluiting van niveaus", icon: Footprints },
  { title: "Mariene parken", tag: "Boot & seizoen", copy: "Denk aan Similan of Ang Thong: de parkdag hangt eerst af van seizoensopening, zeeconditie, bootroute en de daadwerkelijk toegankelijke eilanden of zones.", check: "Parkstatus, zee, bootoperator, zone, inclusies en alternatief", icon: Waves },
];

const checks = [
  { step: "01", title: "Open officiële parkstatus", copy: "Controleer niet alleen de parknaam, maar ook de concrete route, waterval, camping, eiland- of meerzone die je wilt bezoeken.", icon: CalendarCheck },
  { step: "02", title: "Lees de dagcondities", copy: "Weer, zicht, hitte, luchtkwaliteit, waterstand en zeeconditie kunnen een open park alsnog ongeschikt maken voor jouw plan.", icon: CloudRain },
  { step: "03", title: "Leg de toegangsketen vast", copy: "Noteer vertrekpunt, laatste vervoer, parkeer- of bootlogistiek, terugkeertijd en wat je ter plaatse nog apart moet regelen.", icon: Route },
  { step: "04", title: "Bepaal ranger of gids", copy: "Gebruik een ranger of gekwalificeerde lokale gids wanneer de zone dat verlangt of wanneer routekennis en actuele omstandigheden dat verstandig maken.", icon: UserRoundCheck },
  { step: "05", title: "Bewaar plan B", copy: "Kies een lager, korter of regionaal alternatief. Een sluiting is geen uitnodiging om via een onofficiële ingang of ongemarkeerde route te gaan.", icon: MapPinned },
];

const faqs = [
  { question: "Welk nationaal park is het beste in Thailand?", answer: "Er is geen universele winnaar. Kies Khao Yai voor een toegankelijke bos- en wildlifecontext, Khao Sok voor regenwoud en meerlogistiek, Doi Inthanon voor berglandschap, Erawan voor een watervaldag en een marien park voor een seizoensgebonden bootdag. Controleer daarna de actuele zone-openstelling." },
  { question: "Hoeveel kost een bezoek aan een nationaal park in Thailand?", answer: "Dat verschilt per park, bezoekerstype, zone en datum. Vervoer, boot, gids, camping of tour kunnen bovendien losstaan van parktoegang. Controleer de actuele officiële parkvoorwaarden en vraag een aanbieder expliciet welke onderdelen zijn inbegrepen." },
  { question: "Hoeveel nationale parken heeft Thailand?", answer: "Het officiële aantal kan veranderen wanneer gebieden worden aangewezen of administratief aangepast. Voor reisplanning helpt een momentopname weinig: kies op regio en landschap en verifieer het betreffende park rechtstreeks bij de Thaise parkautoriteit." },
  { question: "Is Khao Sok echt de moeite waard?", answer: "Voor reizigers die regenwoud, kalksteenlandschap en meerlogistiek willen combineren kan Khao Sok sterk passen. Reken wel met transfers, regen, verschillende parkzones en mogelijk een overnachting. Een snelle omweg zonder buffer benut het park minder goed." },
  { question: "Is Khao Yai National Park de moeite waard?", answer: "Khao Yai kan goed passen bij een landroute met bos, uitzichtpunten en rangercontext. Beoordeel het op bereikbaarheid, beschikbare tijd en actuele routes—niet op een beloofde olifant- of andere wildlife-waarneming." },
];

export default function ThailandNationalParksGuideNl() {
  const subId = useSubId();
  const klookHref = withPlacementSubId(KLOOK_GENERIC, subId, "national-parks-thailand-nl-tours");
  const tripHref = withPlacementSubId(TRIP_GENERIC, subId, "national-parks-thailand-nl-base");
  const pageUrl = "https://go2-thailand.com/nl/travel-guides/national-parks-thailand/";
  const schemas = [
    { "@context": "https://schema.org", "@type": "Article", headline: "Nationale parken Thailand: kies park, seizoen en route", description: "Vergelijk parkprofielen en controleer status, zone, weer, toegang, ranger en alternatief voordat je vertrekt.", image: "https://go2-thailand.com/images/redesign/thailand-national-parks-hero-v2.webp", url: pageUrl, inLanguage: "nl-NL", author: { "@type": "Organization", name: "GO2 Thailand" }, publisher: { "@type": "Organization", name: "GO2 Thailand" }, dateModified: "2026-07-31" },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Thailand", item: "https://go2-thailand.com/nl/" },
      { "@type": "ListItem", position: 2, name: "Reisgidsen", item: "https://go2-thailand.com/nl/travel-guides/" },
      { "@type": "ListItem", position: 3, name: "Nationale parken", item: pageUrl },
    ] },
  ];

  return <>
    <SEOHead title="Nationale parken Thailand: welk park past bij jou?" description="Kies een nationaal park in Thailand op landschap en logistiek. Controleer actuele status, route, weer, ranger, toegang en alternatief." ogImage="https://go2-thailand.com/images/redesign/thailand-national-parks-hero-v2.webp">
      {schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
    </SEOHead>

    <div data-premium-template="national-parks-thailand-nl" className="overflow-hidden bg-canvas text-charcoal">
      <EditorialHero
        image="/images/redesign/thailand-national-parks-hero-v2.webp"
        imageAlt="Ranger en twee reizigers kijken vanaf veilige afstand over een bebost nationaal park in Thailand"
        breadcrumbs={[{ label: "Thailand", href: "/" }, { label: "Reisgidsen", href: "/travel-guides/" }, { label: "Nationale parken" }]}
        eyebrow="Kies landschap, check toegang"
        title={<>Thailand is wild.<br /><span className="text-saffron-light">Je planning niet.</span></>}
        subtitle="Het beste park is het park dat bij je route én de dagcondities past."
        description="Vergelijk parkprofielen en controleer vlak voor vertrek de officiële status van de specifieke route of zone. Wildlife, weer en toegang geven nooit garanties."
        actions={[{ label: "Vergelijk de parken", href: "#parkprofielen", kind: "primary" }, { label: "Open de vijf checks", href: "#checkroute", kind: "secondary" }]}
        contentTone="light"
        gradientClassName="bg-[linear-gradient(90deg,rgba(3,27,22,0.98)_0%,rgba(3,27,22,0.9)_42%,rgba(3,27,22,0.24)_68%,rgba(3,27,22,0.02)_100%)]"
        imageClassName="object-cover object-[60%_center]"
        titleClassName="max-w-[760px] text-[4rem] leading-[0.84] !text-white sm:text-[5rem] lg:text-[5.8rem]"
        subtitleClassName="max-w-[620px] text-[1.35rem] leading-[1.12] !text-white sm:text-[1.6rem]"
        descriptionClassName="mt-4 max-w-[610px] text-sm leading-7 !text-white/75"
      />

      <PageSectionNav items={[
        { href: "#parkprofielen", label: "Park kiezen", icon: Trees },
        { href: "#checkroute", label: "Actuele checks", icon: CalendarCheck },
        { href: "#ranger", label: "Ranger & wildlife", icon: Binoculars },
        { href: "#vragen", label: "Vragen", icon: Sparkles },
      ]} />

      <section className="section-divider-bottom bg-jade py-5 text-white">
        <div className="container-custom grid gap-3 sm:grid-cols-3">
          {[{k:"Eerst",v:"Specifieke zone open?",I:CalendarCheck},{k:"Daarna",v:"Weer en toegang",I:Route},{k:"Altijd",v:"Geen sighting guarantee",I:Binoculars}].map(({k,v,I}) => <div key={k} className="flex min-h-20 items-center gap-4 rounded-xl border border-white/12 bg-white/7 px-5 py-4"><span className="grid h-10 w-10 place-items-center rounded-full bg-saffron text-jade"><I size={20} aria-hidden="true" /></span><span><span className="block text-[9px] font-extrabold uppercase tracking-[0.15em] text-white/55">{k}</span><strong className="font-display text-xl">{v}</strong></span></div>)}
        </div>
      </section>

      <section id="parkprofielen" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
        <div className="container-custom">
          <SectionHeading eyebrow="Niet rangschikken, maar matchen" title={<>Vijf parkprofielen.<br />Vijf andere reisdagen.</>} description="Begin bij landschap en logistiek. Verdiep daarna de bestemming: bekijk bijvoorbeeld de aparte gids voor Khao Sok of combineer Khao Yai met een passende route vanuit Bangkok." />
          <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {parkProfiles.map(({title,tag,copy,check,icon:Icon},index) => <article key={title} className="flex min-h-[390px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
              <div className="flex items-start justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/25 bg-saffron/8 text-jade"><Icon size={21} aria-hidden="true" /></span><span className="font-display text-4xl text-jade/12">0{index+1}</span></div>
              <p className="mt-7 text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">{tag}</p><h3 className="mt-2 font-display text-[1.65rem] font-semibold leading-none text-jade">{title}</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/68">{copy}</p><p className="mt-auto border-t border-jade/10 pt-4 text-[10px] font-semibold leading-5 text-charcoal/50">Check: {check}</p>
            </article>)}
          </div>
        </div>
      </section>

      <section id="checkroute" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
        <div className="container-custom grid gap-10 lg:grid-cols-[0.68fr_1.32fr]">
          <div className="lg:sticky lg:top-28"><SectionHeading eyebrow="Open park is niet hetzelfde als open route" title="Vijf checks vóór je vertrekt" description="DNP kan een park, route of zone tijdelijk of seizoensgebonden sluiten voor veiligheid en natuurherstel. Controleer opnieuw op de dag zelf." /><div className="mt-7 rounded-2xl border border-saffron/25 bg-white p-5"><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">Momentopname</p><p className="mt-3 text-xs font-medium leading-6 text-charcoal/68">Deze pagina publiceert bewust geen vaste entreeprijzen, parkentelling of universele openingstijden. Gebruik de officiële parkmelding als laatste bron.</p></div></div>
          <ol className="grid gap-4 sm:grid-cols-2">{checks.map(({step,title,copy,icon:Icon},index) => <li key={step} className={`min-h-[245px] rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card ${index===4?'sm:col-span-2':''}`}><div className="flex items-start justify-between"><span className="grid h-11 w-11 place-items-center rounded-full bg-jade text-saffron"><Icon size={20} aria-hidden="true" /></span><span className="text-[10px] font-extrabold tracking-[0.15em] text-saffron-dark">STAP {step}</span></div><h3 className="mt-7 font-display text-[1.7rem] font-semibold leading-none text-jade">{title}</h3><p className="mt-4 max-w-2xl text-xs font-medium leading-6 text-charcoal/67">{copy}</p></li>)}</ol>
        </div>
      </section>

      <section id="ranger" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
        <div className="container-custom">
          <div className="grid overflow-hidden rounded-[1.7rem] bg-jade text-white shadow-editorial-card lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-[420px]"><Image src="/images/redesign/korat-khao-yai.webp" alt="Boslandschap in de regio van Khao Yai" fill sizes="(max-width:1024px) 100vw, 52vw" className="object-cover" /></div>
            <div className="p-7 lg:p-10"><p className="eyebrow !text-saffron-light">Ranger vóór bereik</p><h2 className="font-display text-[3.1rem] font-semibold leading-[0.89] tracking-[-0.04em]">Wildlife blijft wild</h2><p className="mt-5 text-sm font-medium leading-7 text-white/72">Volg rangerinstructies, blijf op gemarkeerde routes, voer niets en blokkeer geen dier voor een foto. Een tour, gids of parknaam garandeert nooit een waarneming.</p><ul className="mt-6 space-y-3">{["Kies een ranger of lokale gids om routekennis, niet om een dier te laten lokken","Vraag vóór boeken naar route, duur, vervoer, parkzone en wat niet inbegrepen is","Ga niet via een gesloten zone of onofficieel pad wanneer plan A vervalt"].map(item=><li key={item} className="flex gap-3 text-xs font-medium leading-5 text-white/72"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-saffron text-jade"><Check size={12} strokeWidth={3} aria-hidden="true" /></span>{item}</li>)}</ul><Link href="/travel-guides/dangerous-animals-thailand/" className="btn-cream group mt-7 min-h-12 px-6 text-saffron-dark">Lees de dierenrisico-owner <ArrowRight size={15} aria-hidden="true" /></Link></div>
          </div>
        </div>
      </section>

      <section className="section-divider-bottom bg-tonal py-14 lg:py-20">
        <div className="container-custom"><SectionHeading eyebrow="Pas boeken na de parkcheck" title="Vergelijk voorwaarden, niet alleen de foto" description="Een tour kan vervoer, gids, boot of parktoegang wel of niet bevatten. Een verblijf is een uitvalsbasis, geen toegangsbewijs." />
          <AffiliateDisclosure className="mt-7">Klook- en Trip.com-affiliatelinks: we kunnen commissie ontvangen zonder extra kosten voor jou. Controleer actuele prijs, parktoegang, inclusies en voorwaarden rechtstreeks bij de aanbieder.</AffiliateDisclosure>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-jade/10 bg-jade p-7 text-white"><Leaf className="text-saffron" aria-hidden="true" /><h3 className="mt-5 font-display text-3xl font-semibold">Parktour controleren</h3><p className="mt-3 text-xs font-medium leading-6 text-white/68">Controleer actuele prijs, datum, route, gids, vervoer, parktoegang, maaltijden en annuleringsvoorwaarden rechtstreeks bij Klook.</p><a href={klookHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-cream mt-6 min-h-12 px-6 text-saffron-dark">Bekijk actuele parktours <ExternalLink size={15} aria-hidden="true" /></a></div>
            <div className="rounded-2xl border border-jade/10 bg-white p-7 shadow-editorial-card"><MapPinned className="text-saffron-dark" aria-hidden="true" /><h3 className="mt-5 font-display text-3xl font-semibold text-jade">Uitvalsbasis controleren</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/68">Vergelijk een verblijf op echte transfertijd, vroege check-out, vervoer en annuleerbaarheid. Controleer de actuele prijs bij Trip.com.</p><a href={tripHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-jade btn-jade-pattern mt-6 min-h-12 px-6">Bekijk actuele verblijven <ExternalLink size={15} className="text-saffron" aria-hidden="true" /></a></div>
          </div>
        </div>
      </section>

      <div id="vragen"><FaqSplitSection eyebrow="Echte zoekvragen" title="Veelgestelde vragen over nationale parken" description="De antwoorden helpen kiezen zonder veranderlijke prijzen, parkentellingen of wildlifebeloftes als vast feit te presenteren." items={faqs} /></div>
      <RelatedGuidesSection title="Bouw de rest van je natuurroute" guides={[
        { title: "Khao Sok", description: "Verdiep de regenwoud-, meer-, transfer- en verblijfkeuzes voor deze specifieke bestemming.", href: "/city/khao-sok/", image: "/images/redesign/khao-sok-attractions-hero.webp" },
        { title: "Trekking in Thailand", description: "Kies trailniveau, gids, uitrusting en herstel voor wandel- en trekkingdagen.", href: "/travel-guides/hiking-trekking-thailand/", image: "/images/redesign/khao-sok-jungle-village.webp" },
        { title: "Dierenrisico's", description: "Houd afstand en weet welke professionele route na contact nodig is.", href: "/travel-guides/dangerous-animals-thailand/", image: "/images/redesign/thailand-animal-risk-hero-v2.webp" },
      ]} />
      <SourceMethodSection title="Parkstatus is veranderlijk" description="Nederlandse PAA's zijn op 31 juli 2026 zichtbaar gecontroleerd. DNP-berichten tonen dat sluitingen per park, route, zone en seizoen kunnen verschillen; controleer daarom altijd de actuele officiële melding." sources={[
        { title: "Officiële sluitingsberichten", creator: "Department of National Parks Thailand", url: "https://news.dnp.go.th/news/tag/%E0%B8%9B%E0%B8%B4%E0%B8%94%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%97%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A7", note: "Primaire actualiteiten over tijdelijke en seizoensgebonden sluitingen." },
        { title: "Similan seizoenssluiting", creator: "Department of National Parks Thailand", url: "https://news.dnp.go.th/news/45603", note: "Voorbeeld van een mariene parksluiting voor natuurherstel." },
        { title: "Trailveiligheid en heropening", creator: "Department of National Parks Thailand", url: "https://news.dnp.go.th/news/46094", note: "Voorbeeld van tijdelijke trailsluiting en aangepaste veiligheidsmaatregelen." },
        { title: "Thailand destination information", creator: "Tourism Authority of Thailand", url: "https://www.tourismthailand.org/", note: "Officiële bestemmingscontext; actuele parkstatus blijft bij DNP en het park zelf." },
      ]} />
    </div>
  </>;
}
