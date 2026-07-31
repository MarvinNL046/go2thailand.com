import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BedDouble,
  Check,
  Clock3,
  ExternalLink,
  Hotel,
  KeyRound,
  Languages,
  MapPin,
  MapPinned,
  MessageCircleMore,
  MoonStar,
  PhoneCall,
  Route,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrainFront,
  UsersRound,
  WalletCards,
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

const safetyLayers = [
  {
    title: "Voor vertrek",
    tag: "Eigenaars vastleggen",
    copy: "Controleer het actuele reisadvies, polis, noodnummers, zorgroute, telefoonbackup en de eerste deur-tot-deurketen.",
    icon: ShieldCheck,
  },
  {
    title: "Bij aankomst",
    tag: "Eerste uren voorspelbaar",
    copy: "Bewaar offline adres en route, verifieer vervoer en laat genoeg marge voor SIM, geld, eten en inchecken bij daglicht waar praktisch.",
    icon: MapPinned,
  },
  {
    title: "Onderweg",
    tag: "Voertuig en route controleren",
    copy: "Vergelijk chauffeur, kenteken of vervoersbewijs, instapplaats en eindpunt met de boeking. Stap uit op een publieke plek als iets niet klopt.",
    icon: TrainFront,
  },
  {
    title: "Avond & nacht",
    tag: "Terugweg vóór vertrek",
    copy: "Bepaal vooraf hoe je terugkomt, houd eigen drinken en telefoon in beeld en wissel niet impulsief naar onbekend vervoer of een afgelegen eindpunt.",
    icon: MoonStar,
  },
  {
    title: "Bij twijfel",
    tag: "Plan wijzigen is toegestaan",
    copy: "Ga naar personeel, receptie, winkel of andere drukke plek. Bel een vertrouwd contact of Tourist Police en zet sociale druk boven beleefdheid.",
    icon: PhoneCall,
  },
];

const baseProfiles = [
  {
    title: "Bangkok",
    label: "Veel infrastructuur",
    fit: "Sterk voor openbaar vervoer, uiteenlopende buurten, accommodaties en activiteiten met vaste startpunten.",
    tradeoff: "Wijk, laatste looproute en aankomsttijd bepalen meer dan de stadsnaam; verkeer en prikkels kunnen vermoeien.",
    href: "/city/bangkok/",
  },
  {
    title: "Chiang Mai",
    label: "Compactere routine",
    fit: "Een kleinere stedelijke basis met dagactiviteiten, workshops en routes naar natuur of omgeving.",
    tradeoff: "Lokale ritten, afgelegen activiteiten en seizoensgebonden luchtkwaliteit vragen een eigen plan.",
    href: "/city/chiang-mai/",
  },
  {
    title: "Krabi of Phuket",
    label: "Kust met veel keuze",
    fit: "Uiteenlopende zones, excursies en vervoersopties maken een kustbasis flexibel wanneer je locatie goed kiest.",
    tradeoff: "Strandzones liggen ver uiteen; avondrit, boottransfer en seizoensconditie verschillen per product.",
    href: "/region/southern/",
  },
  {
    title: "Eiland of kleine plaats",
    label: "Rust met minder fallback",
    fit: "Past wanneer accommodatie en directe omgeving de bestemming zijn en je weinig late verplaatsingen nodig hebt.",
    tradeoff: "Minder vervoer, zorg, bereikbaarheid en uitwijkopties maken een vooraf geregelde keten belangrijker.",
    href: "/islands/",
  },
];

const arrivalChecks = [
  "Volledig adres in Thai en Engels, plus kaartpin offline beschikbaar",
  "Aankomstterminal, instappunt en route naar de accommodatie bevestigd",
  "Accommodatie bereikbaar bij vertraging en late check-in vooraf akkoord",
  "Telefoon, data, batterij en één onafhankelijk betaalmiddel operationeel",
  "Eerste check-inmoment met een vertrouwd contact concreet afgesproken",
];

const checkInPlan = [
  { time: "Voor vertrek", copy: "Deel route, eerste verblijf, polis en wat iemand moet doen als je niet reageert." },
  { time: "Na aankomst", copy: "Bevestig alleen dat je veilig op de afgesproken plek bent; deel niet openbaar je kamernummer." },
  { time: "Bij een routewissel", copy: "Werk de bestemming en verwachtte aankomsttijd bij wanneer de verandering materieel is." },
  { time: "Na een gemist moment", copy: "Laat je contact eerst appen/bellen en daarna het afgesproken escalatiepad volgen." },
];

const faqs = [
  {
    question: "Is het veilig om alleen naar Thailand te gaan?",
    answer:
      "Een algemene veiligheidsgarantie bestaat niet. Controleer het actuele reisadvies, regionale risico’s, vervoer, accommodatie, uitgaan, verkeer en zorgtoegang voor jouw route. Veel soloreizigers kiezen Thailand vanwege de infrastructuur, maar je eigen aankomst-, terugweg- en noodplan blijven bepalend.",
  },
  {
    question: "Hoe veilig is Thailand voor vrouwen?",
    answer:
      "Risico verschilt per plaats, tijd, vervoerskeuze, alcoholcontext en persoonlijke situatie. Vermijd zowel de claim dat Thailand vanzelf veilig is als angstmarketing. Kies zichtbare vervoersketens, controleer boekingsdetails, houd een eigen terugweg en zoek direct een publieke plek of hulp wanneer gedrag of situatie niet klopt.",
  },
  {
    question: "Is Thailand een goede bestemming voor soloreizen?",
    answer:
      "Thailand kan praktisch zijn door veel reisroutes, accommodaties en activiteiten, maar ‘goed’ hangt af van je ervaring, routecomplexiteit, budget, seizoen, gewenste sociale context en risicotolerantie. Begin eventueel met weinig basissen en goed verbonden zones in plaats van direct afgelegen plekken te stapelen.",
  },
  {
    question: "Hoeveel geld heb je nodig voor twee weken Thailand?",
    answer:
      "Maak een persoonlijk scenario met actuele solo-kamerprijzen, alle transfers, eten, activiteiten, verzekering, SIM en een nood- en vertrekbuffer. Solo reizen kan per persoon duurder zijn doordat kamer en privétrits niet worden gedeeld. Eén gemiddeld bedrag is daarom geen betrouwbare begroting.",
  },
  {
    question: "Wat moet je vermijden in Thailand als je alleen reist?",
    answer:
      "Vermijd geen hele bestemming op basis van clichés. Vermijd wel onduidelijke vervoersafspraken, een onbekende terugweg, openbare kamernummers, onbeheerde drank, impulsieve betalingen, afgelegen eindpunten zonder bereikbaarheid en routes die strijdig zijn met het actuele reisadvies. Verlaat een situatie zodra die niet goed voelt.",
  },
];

export default function SoloFemaleThailandGuideNl() {
  const subId = useSubId();
  const tripHref = withPlacementSubId(TRIP_GENERIC, subId, "solo-female-thailand-nl-first-stay");
  const klookHref = withPlacementSubId(KLOOK_GENERIC, subId, "solo-female-thailand-nl-group-activity");
  const pageUrl = "https://go2-thailand.com/nl/travel-guides/solo-female-travel-thailand/";
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Solo reizen in Thailand als vrouw: bouw een rustige veiligheidsroute",
      description:
        "Plan aankomst, vervoer, accommodatie, avond, check-ins en noodhulp zonder algemene veiligheidsgarantie of angstmarketing.",
      image: "https://go2-thailand.com/images/redesign/solo-female-thailand-hero-v2.webp",
      url: pageUrl,
      inLanguage: "nl-NL",
      author: { "@type": "Organization", name: "GO2 Thailand" },
      publisher: { "@type": "Organization", name: "GO2 Thailand" },
      dateModified: "2026-07-31",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map(({ question, answer }) => ({
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
        { "@type": "ListItem", position: 2, name: "Reisgidsen", item: "https://go2-thailand.com/nl/travel-guides/" },
        { "@type": "ListItem", position: 3, name: "Solo reizen als vrouw", item: pageUrl },
      ],
    },
  ];

  return (
    <>
      <SEOHead
        title="Solo reizen Thailand als vrouw: veiligheid en route"
        description="Plan solo reizen in Thailand met een concrete aankomst-, vervoer-, avond-, check-in- en noodroute. Inclusief officiële noodnummers en echte PAA-vragen."
        ogImage="https://go2-thailand.com/images/redesign/solo-female-thailand-hero-v2.webp"
      >
        {schemas.map((schema, index) => (
          <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}
      </SEOHead>

      <div data-premium-template="solo-female-thailand-nl" className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          image="/images/redesign/solo-female-thailand-hero-v2.webp"
          imageAlt="Soloreiziger controleert haar route met telefoon bij openbaar vervoer in Bangkok"
          breadcrumbs={[
            { label: "Thailand", href: "/" },
            { label: "Reisgidsen", href: "/travel-guides/" },
            { label: "Solo reizen als vrouw" },
          ]}
          eyebrow="Vrij reizen met vaste ankerpunten"
          title={<>Solo op pad.<br /><span className="text-saffron-light">Niet zonder plan.</span></>}
          subtitle="Maak elke overgang controleerbaar: aankomst, rit, avond en terugweg."
          description="Geen bestemming is automatisch veilig of onveilig. Deze gids helpt risico’s verkleinen en een hulpketen voorbereiden; hij vervangt geen actueel reisadvies, politie of professionele ondersteuning."
          actions={[
            { label: "Bouw je veiligheidslagen", href: "#lagen", kind: "primary" },
            { label: "Sla noodnummers op", href: "#nood", kind: "secondary" },
          ]}
          contentTone="light"
          gradientClassName="bg-[linear-gradient(90deg,rgba(5,35,29,0.97)_0%,rgba(5,35,29,0.88)_38%,rgba(5,35,29,0.18)_66%,rgba(5,35,29,0.03)_100%)]"
          imageClassName="object-cover object-[69%_center]"
          titleClassName="max-w-[710px] text-[4rem] leading-[0.84] !text-white sm:text-[5.1rem] lg:text-[5.8rem]"
          subtitleClassName="max-w-[590px] text-[1.4rem] leading-[1.1] !text-white sm:text-[1.65rem]"
          descriptionClassName="mt-4 max-w-[600px] text-sm leading-7 !text-white/75"
        />

        <PageSectionNav
          items={[
            { href: "#lagen", label: "Veiligheidslagen", icon: ShieldCheck },
            { href: "#basissen", label: "Basissen", icon: MapPinned },
            { href: "#aankomst", label: "Aankomst", icon: KeyRound },
            { href: "#checkin", label: "Check-ins", icon: MessageCircleMore },
            { href: "#vragen", label: "Vragen", icon: Sparkles },
          ]}
        />

        <div>
          <section id="nood" className="section-divider-bottom bg-jade py-5 text-white">
            <div className="container-custom grid gap-3 sm:grid-cols-3">
              {[{n:"191",label:"Algemene urgentie",icon:PhoneCall},{n:"1155",label:"Tourist Police",icon:Languages},{n:"1669",label:"Medische spoed",icon:ShieldCheck}].map(({n,label,icon:Icon})=><a key={n} href={`tel:${n}`} className="flex min-h-20 items-center gap-4 rounded-xl border border-white/12 bg-white/7 px-5 py-4 transition hover:bg-white/12"><span className="grid h-10 w-10 place-items-center rounded-full bg-saffron text-jade"><Icon size={19} aria-hidden="true" /></span><span><span className="block text-[9px] font-extrabold uppercase tracking-[0.15em] text-white/55">{label}</span><strong className="font-display text-2xl">{n}</strong></span></a>)}
            </div>
          </section>

          <section id="lagen" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
            <div className="container-custom">
              <SectionHeading
                eyebrow="Vijf momenten, vijf besluiten"
                title={<>Veiligheid zit in<br />de overgang</>}
                description={<>Controleer het <a href="https://www.nederlandwereldwijd.nl/reisadvies/thailand" target="_blank" rel="noopener noreferrer" className="font-extrabold text-jade underline decoration-saffron/45 underline-offset-4">actuele reisadvies</a> vóór iedere materiële routewijziging en leg je <Link href="/travel-guides/health-hospitals-thailand/" className="font-extrabold text-jade underline decoration-saffron/45 underline-offset-4">medische noodroute</Link> apart vast.</>}
              />
              <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                {safetyLayers.map(({ title, tag, copy, icon: Icon }, index) => (
                  <article key={title} className="flex min-h-[330px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                    <div className="flex items-start justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/25 bg-saffron/8 text-jade"><Icon size={21} aria-hidden="true" /></span><span className="font-display text-4xl text-jade/12">0{index+1}</span></div>
                    <p className="mt-7 text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">{tag}</p>
                    <h3 className="mt-2 font-display text-[1.7rem] font-semibold leading-none text-jade">{title}</h3>
                    <p className="mt-4 text-xs font-medium leading-6 text-charcoal/67">{copy}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="basissen" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
            <div className="container-custom grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
              <div className="lg:sticky lg:top-28">
                <SectionHeading eyebrow="Geen veiligste-stadranglijst" title="Kies op dagelijkse route" description="Een goed verbonden wijk kan beter passen dan een populaire maar afgelegen accommodatie. Vergelijk zichtbaarheid, laatste loopstuk, vervoer, zorg en je eigen dagritme." />
                <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl border border-jade/10 shadow-editorial-card"><Image src="/images/redesign/solo-female-thailand-choice-route.webp" alt="Soloreiziger vergelijkt routes en bestemmingstypen in Thailand" fill sizes="(max-width:1024px) 100vw, 36vw" className="object-cover" /></div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {baseProfiles.map((base,index)=><Link key={base.title} href={base.href} className="group rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card transition hover:-translate-y-1 hover:border-saffron/30"><div className="flex justify-between"><span className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">{base.label}</span><span className="font-display text-3xl text-jade/15">0{index+1}</span></div><h3 className="mt-5 font-display text-[2rem] font-semibold leading-none text-jade">{base.title}</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/68">{base.fit}</p><p className="mt-4 border-t border-jade/10 pt-4 text-xs leading-5 text-charcoal/55"><strong className="text-jade">Afweging:</strong> {base.tradeoff}</p><span className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-jade">Bekijk bestemming <ArrowRight size={14} className="text-saffron-dark transition group-hover:translate-x-1" aria-hidden="true" /></span></Link>)}
              </div>
            </div>
          </section>

          <section id="aankomst" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
            <div className="container-custom">
              <div className="grid overflow-hidden rounded-[1.7rem] bg-jade text-white shadow-editorial-card lg:grid-cols-[1.05fr_0.95fr]">
                <div className="p-7 lg:p-10">
                  <p className="eyebrow !text-saffron-light">Bescherm de eerste uren</p>
                  <h2 className="font-display text-[3.2rem] font-semibold leading-[0.89] tracking-[-0.04em]">Je aankomstplan eindigt bij de kamerdeur</h2>
                  <ul className="mt-7 space-y-3">{arrivalChecks.map(item=><li key={item} className="flex gap-3 text-xs font-medium leading-5 text-white/72"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-saffron text-jade"><Check size={12} strokeWidth={3} aria-hidden="true" /></span>{item}</li>)}</ul>
                  <a href={tripHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-cream group mt-7 min-h-12 px-6 text-saffron-dark">Bekijk actuele eerste verblijven <ExternalLink size={15} aria-hidden="true" /></a>
                  <AffiliateDisclosure className="mt-3 !text-white/55">Affiliate-link: Trip.com kan commissie betalen. Controleer kamer, locatie, check-in en volledige prijs zelf; een boeking is geen veiligheidsgarantie.</AffiliateDisclosure>
                </div>
                <div className="relative min-h-[380px]"><Image src="/images/redesign/bangkok-route-planning.webp" alt="Routeplanning en aankomstvoorbereiding voor Bangkok" fill sizes="(max-width:1024px) 100vw, 46vw" className="object-cover" /></div>
              </div>

              <div className="mt-8 grid gap-5 lg:grid-cols-2">
                <article className="rounded-2xl border border-jade/10 bg-white p-7 shadow-editorial-card"><div className="flex items-center gap-4"><span className="grid h-12 w-12 place-items-center rounded-xl border border-saffron/25 bg-saffron/8 text-jade"><UsersRound size={22} aria-hidden="true" /></span><div><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">Optionele sociale structuur</p><h3 className="mt-1 font-display text-[1.9rem] font-semibold leading-none text-jade">Een groepstour is een activiteit</h3></div></div><p className="mt-5 text-sm font-medium leading-7 text-charcoal/68">Een groepsactiviteit kan een laagdrempelige eerste dag geven, maar vervangt geen eigen vervoers-, terugweg- of noodplan. Controleer startpunt, eindtijd, inclusies, aanbieder en actuele reviews.</p><a href={klookHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-jade btn-jade-pattern group mt-6 min-h-12 px-6">Bekijk actuele groepsactiviteiten <ExternalLink size={15} className="text-saffron" aria-hidden="true" /></a><AffiliateDisclosure className="mt-3">Affiliate-link: Klook kan commissie betalen. De activiteit is geen veiligheidsdienst of begeleide terugreis tenzij expliciet vermeld.</AffiliateDisclosure></article>
                <article className="rounded-2xl border border-jade/10 bg-white p-7 shadow-editorial-card"><div className="flex items-center gap-4"><span className="grid h-12 w-12 place-items-center rounded-xl border border-saffron/25 bg-saffron/8 text-jade"><WalletCards size={22} aria-hidden="true" /></span><div><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">Financiële uitweg</p><h3 className="mt-1 font-display text-[1.9rem] font-semibold leading-none text-jade">Houd een onafhankelijke vertrekroute</h3></div></div><p className="mt-5 text-sm font-medium leading-7 text-charcoal/68">Verdeel betaalmiddelen, houd vervoer- en overnachtingsbuffer apart en maak je niet afhankelijk van één telefoon, kaart of reisgenoot. Een noodbuffer is geen dagbudget en hoort niet zichtbaar in je tas of verblijf te liggen.</p><Link href="/practical-info/atm-money/" className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-jade">Open de geld- en ATM-gids <ArrowRight size={14} className="text-saffron-dark" aria-hidden="true" /></Link></article>
              </div>
            </div>
          </section>

          <section id="checkin" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
            <div className="container-custom grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
              <SectionHeading eyebrow="Locatie delen is geen garantie" title="Maak een check-inplan met een echte actie" description="Een punt op een kaart helpt pas wanneer iemand weet wanneer je reageert, wat een afwijking betekent en wanneer escalatie nodig is." />
              <ol className="grid gap-3 sm:grid-cols-2">
                {checkInPlan.map((item,index)=><li key={item.time} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><div className="flex items-center justify-between"><span className="grid h-10 w-10 place-items-center rounded-full bg-jade text-saffron"><Smartphone size={18} aria-hidden="true" /></span><span className="font-display text-3xl text-jade/15">0{index+1}</span></div><h3 className="mt-5 font-display text-[1.55rem] font-semibold leading-none text-jade">{item.time}</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/65">{item.copy}</p></li>)}
              </ol>
            </div>
          </section>

          <FaqSplitSection eyebrow="Echte zoekvragen" title="Veelgestelde vragen over solo reizen" description="De antwoorden zetten veiligheidsclaims om in actuele, concrete controlepunten zonder angstmarketing." items={faqs} />

          <RelatedGuidesSection
            title="Maak je solo-route verder controleerbaar"
            guides={[
              { title: "Reisveiligheid", description: "Orden noodnummers, verkeer, scams, documenten en hulp voordat je vertrekt.", href: "/travel-security/", image: "/images/redesign/thailand-safety-hero.webp" },
              { title: "Zorg & ziekenhuizen", description: "Bereid medische spoed, verzekering, zorglocatie en bewijsstukken voor.", href: "/travel-guides/health-hospitals-thailand/", image: "/images/redesign/thailand-health-hospitals-hero-v2.webp" },
              { title: "Thailand voor het eerst", description: "Bouw aankomst, SIM, geld, vervoer en de eerste dagen in logische volgorde.", href: "/thailand-for-first-timers/", image: "/images/redesign/bangkok-first-time-hero.webp" },
            ]}
          />

          <div id="bronnen">
            <SourceMethodSection
              title="Veiligheid is actueel, niet absoluut"
              description="Nederlandse PAA’s zijn op 31 juli 2026 zichtbaar gecontroleerd. Regionale situaties en hulproutes kunnen wijzigen; controleer ze opnieuw vóór vertrek en tijdens materiële routewijzigingen."
              sources={[
                { title: "Reisadvies Thailand", creator: "NederlandWereldwijd", url: "https://www.nederlandwereldwijd.nl/reisadvies/thailand", note: "Actuele regionale risico’s, voorbereiding en Nederlandse hulpinformatie." },
                { title: "Tourist Police Thailand", creator: "Royal Thai Police", url: "https://www.touristpolice.go.th/main", note: "Officiële eigenaar van hotline 1155 en informatie over Tourist Police-ondersteuning." },
                { title: "Essential tourist assistance contact numbers", creator: "Thailand Government", url: "https://thailand.go.th/public/issue-focus-detail/essential-tourist-assistance-contact-numbers-to-ensure-a-smooth-and-safe-journey", note: "Officiële bevestiging van onder meer 191, 1155 en 1669." },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
