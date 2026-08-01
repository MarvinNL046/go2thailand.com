import Image from "next/image";
import Link from "next/link";
import {
  Ambulance,
  ArrowRight,
  Building2,
  CalendarCheck,
  Check,
  ClipboardCheck,
  ExternalLink,
  FileText,
  HeartPulse,
  Languages,
  MapPin,
  PhoneCall,
  Pill,
  ReceiptText,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import SEOHead from "../SEOHead";
import { EditorialHero } from "../design/EditorialHero";
import { FaqSplitSection } from "../design/FaqSplitSection";
import { PageSectionNav } from "../design/PageSectionNav";
import { RelatedGuidesSection } from "../design/RelatedGuidesSection";
import { SectionHeading } from "../design/SectionHeading";
import { SourceMethodSection } from "../design/SourceMethodSection";

const urgencyLevels = [
  {
    tag: "Direct medische spoedhulp",
    title: "Ernstig of mogelijk levensbedreigend",
    copy: "Bel 1669 of laat iemand ter plaatse medische spoedhulp inschakelen. Geef je locatie, herkenningspunt, telefoonnummer en wat er is gebeurd zo duidelijk mogelijk door.",
    action: "1669",
    tone: "border-rose-200 bg-rose-50/75 text-rose-900",
    icon: Ambulance,
  },
  {
    tag: "Vandaag laten beoordelen",
    title: "Niet stabiel, snel erger of zorgwekkend",
    copy: "Laat een arts of kliniek de urgentie beoordelen. Vraag hotel, host of verzekeringsalarmcentrale naar een passende actuele zorglocatie; stel zelf geen diagnose.",
    action: "Arts of kliniek",
    tone: "border-saffron/30 bg-saffron/8 text-jade",
    icon: Stethoscope,
  },
  {
    tag: "Voorbereid contact",
    title: "Niet-urgent of geplande zorgvraag",
    copy: "Controleer afdeling, openingstijd, afspraakroute, taalondersteuning, benodigde documenten en verzekeringsvoorwaarden vóór je vertrekt.",
    action: "Vooraf bellen",
    tone: "border-jade/12 bg-mist/65 text-jade",
    icon: CalendarCheck,
  },
];

const careSteps = [
  {
    step: "01",
    title: "Regel eerst veilige hulp",
    copy: "Bij spoed gaat hulp vóór administratie. Laat iemand je exacte locatie delen en neem paspoort, telefoon en medicatieoverzicht mee als dat zonder vertraging kan.",
    icon: HeartPulse,
  },
  {
    step: "02",
    title: "Bel je alarmcentrale",
    copy: "Neem zodra mogelijk contact op met je reis- of zorgverzekeraar. Vraag welk zorgpunt past, of vooraf akkoord nodig is en hoe betaling of garantie wordt geregeld.",
    icon: PhoneCall,
  },
  {
    step: "03",
    title: "Deel medische context",
    copy: "Noem allergieën, huidige medicatie, bestaande aandoeningen en recente behandeling. Gebruik een vertaalde lijst, maar laat een arts de medische beoordeling doen.",
    icon: ClipboardCheck,
  },
  {
    step: "04",
    title: "Bewaar het dossier",
    copy: "Vraag om medische samenvatting, voorschrift, onderzoeksuitslagen en gespecificeerde facturen. Bewaar ook betaalbewijzen en het claim- of dossiernummer.",
    icon: ReceiptText,
  },
];

const hospitalChecks = [
  {
    title: "Juiste zorgniveau",
    copy: "Heeft deze locatie de afdeling, diagnostiek of spoedcapaciteit die voor jouw vraag nodig is? Een bekende merknaam bewijst dat niet.",
    icon: Building2,
  },
  {
    title: "Werkelijke bereikbaarheid",
    copy: "Controleer actuele reistijd, ingang, openingstijd en een terugvaloptie—zeker op eilanden of buiten een provinciehoofdstad.",
    icon: MapPin,
  },
  {
    title: "Taal & contact",
    copy: "Vraag of de relevante afdeling Engels spreekt of een tolk kan regelen. Neem een contactpersoon mee wanneer communicatie lastig is.",
    icon: Languages,
  },
  {
    title: "Polis & betaling",
    copy: "Controleer of je verzekeraar deze aanbieder accepteert, welke toestemming nodig is en welke documenten voor directe betaling of declaratie gelden.",
    icon: ShieldCheck,
  },
];

const preparation = [
  "Polisnummer, alarmcentrale en eventuele app offline opgeslagen",
  "Paspoortkopie en noodcontact op twee bereikbare plaatsen",
  "Generieke namen, dosering en reden van je actuele medicatie",
  "Allergieën, aandoeningen en relevante recente medische informatie",
  "Betaalmiddel voor kosten die je mogelijk eerst zelf moet voldoen",
  "Locatie van passende zorg bij je eerste én volgende bestemming",
];

const faqs = [
  {
    question: "Hoeveel kost een doktersbezoek in Thailand?",
    answer:
      "Daar is geen betrouwbaar vast bedrag voor. De rekening hangt onder meer af van openbaar of privé, locatie, specialisme, spoedtoeslag, onderzoeken, medicatie en opname. Vraag bij niet-spoedeisende zorg vooraf om een actuele prijsindicatie en controleer bij je verzekeraar wat wordt vergoed. Stel noodzakelijke spoedzorg niet uit vanwege een online prijs.",
  },
  {
    question: "Hoe kan ik als toerist in Thailand een arts bezoeken?",
    answer:
      "Bij medische spoed bel je 1669. Voor niet-acute zorg kun je een kliniek of ziekenhuis contacteren; vraag hotel, host of verzekeringsalarmcentrale om een actuele passende locatie. Controleer de afdeling en openingstijd en neem paspoort, verzekeringsgegevens, medicatielijst en relevante medische informatie mee.",
  },
  {
    question: "Is een medische reisverzekering verplicht voor Thailand?",
    answer:
      "Een algemene ja-of-nee-uitspraak past niet bij iedere visum- of verblijfsroute. Los daarvan kan onverzekerde zorg grote financiële gevolgen hebben. Controleer de officiële toelatingseisen én je polisvoorwaarden, inclusief bestaande aandoeningen, activiteiten, scootergebruik, duiken, evacuatie en maximale reisduur.",
  },
  {
    question: "Hoe goed zijn de ziekenhuizen in Thailand?",
    answer:
      "Thailand heeft uiteenlopende openbare en private zorgaanbieders, maar kwaliteit, capaciteit, taalondersteuning en specialismen verschillen per locatie en moment. Kies niet op een algemene ranglijst: laat urgentie en benodigde afdeling leidend zijn en controleer actuele accreditatie en verzekeringsacceptatie rechtstreeks.",
  },
  {
    question: "Wat moet ik doen bij een ziekenhuisopname in Thailand?",
    answer:
      "Zorg bij spoed eerst voor medische hulp. Bel daarna zodra mogelijk je verzekeringsalarmcentrale, noteer contactpersonen en dossiernummer, vraag naar betalingsgarantie en bewaar medische samenvatting, voorschriften, uitslagen, gespecificeerde facturen en betaalbewijzen. Bespreek overplaatsing of repatriëring alleen met behandelaar en verzekeraar.",
  },
];

export default function HealthHospitalsThailandGuideNl() {
  const pageUrl = "https://go2-thailand.com/nl/travel-guides/health-hospitals-thailand/";
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Zorg en ziekenhuizen in Thailand: je praktische hulpplan",
      description:
        "Bepaal de juiste zorgrouting in Thailand, bewaar noodnummers en regel ziekenhuis-, verzekerings- en dossierstappen zonder vaste prijsclaims.",
      image: "https://go2-thailand.com/images/redesign/thailand-health-hospitals-hero-v2.webp",
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
        { "@type": "ListItem", position: 3, name: "Zorg en ziekenhuizen", item: pageUrl },
      ],
    },
  ];

  return (
    <>
      <SEOHead
        title="Ziekenhuis in Thailand: zorg, spoednummer en verzekering"
        description="Wat doe je als toerist bij ziekte of ziekenhuisopname in Thailand? Gebruik 1669 bij spoed en volg de praktische zorg-, verzekerings- en dossierroute."
        ogImage="https://go2-thailand.com/images/redesign/thailand-health-hospitals-hero-v2.webp"
      >
        {schemas.map((schema, index) => (
          <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}
      </SEOHead>

      <div data-premium-template="health-hospitals-thailand-nl" className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          image="/images/redesign/thailand-health-hospitals-hero-v2.webp"
          imageAlt="Reiziger bespreekt verzekeringsdocumenten bij de receptie van een Thaise kliniek"
          breadcrumbs={[
            { label: "Thailand", href: "/" },
            { label: "Reisgidsen", href: "/travel-guides/" },
            { label: "Zorg & ziekenhuizen" },
          ]}
          eyebrow="Zorg vinden zonder te gokken"
          title={<>Ziek in Thailand.<br /><span className="text-saffron-light">Weet wat je doet.</span></>}
          subtitle="Van 1669 bij medische spoed tot de documenten voor je verzekeraar."
          description="Deze gids helpt je de juiste hulpketen voorbereiden. Hij stelt geen diagnose, kiest geen behandeling en vervangt geen arts, hulpdienst of verzekeringsalarmcentrale."
          actions={[
            { label: "Bekijk de urgentieladder", href: "#urgentie", kind: "primary" },
            { label: "Sla noodnummers op", href: "#noodnummers", kind: "secondary" },
          ]}
          contentTone="light"
          gradientClassName="bg-[linear-gradient(90deg,rgba(5,35,29,0.97)_0%,rgba(5,35,29,0.88)_38%,rgba(5,35,29,0.2)_66%,rgba(5,35,29,0.04)_100%)]"
          imageClassName="object-cover object-[68%_center]"
          titleClassName="max-w-[710px] text-[4rem] leading-[0.84] !text-white sm:text-[5.1rem] lg:text-[5.8rem]"
          subtitleClassName="max-w-[590px] text-[1.4rem] leading-[1.1] !text-white sm:text-[1.65rem]"
          descriptionClassName="mt-4 max-w-[590px] text-sm leading-7 !text-white/75"
        />

        <PageSectionNav
          items={[
            { href: "#urgentie", label: "Urgentie", icon: Ambulance },
            { href: "#zorgroute", label: "Zorgroute", icon: Stethoscope },
            { href: "#ziekenhuischeck", label: "Zorglocatie", icon: Building2 },
            { href: "#vragen", label: "Vragen", icon: FileText },
          ]}
        />

        <div>
          <section id="noodnummers" className="section-divider-bottom bg-jade py-5 text-white">
            <div className="container-custom grid gap-3 sm:grid-cols-3">
              <a href="tel:1669" className="group flex min-h-20 items-center gap-4 rounded-xl border border-white/12 bg-white/7 px-5 py-4 transition hover:bg-white/12">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-saffron text-jade"><Ambulance size={20} aria-hidden="true" /></span>
                <span><span className="block text-[9px] font-extrabold uppercase tracking-[0.15em] text-white/55">Medische spoed</span><strong className="font-display text-2xl">1669</strong></span>
              </a>
              <a href="tel:1155" className="group flex min-h-20 items-center gap-4 rounded-xl border border-white/12 bg-white/7 px-5 py-4 transition hover:bg-white/12">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-white/15"><Languages size={20} aria-hidden="true" /></span>
                <span><span className="block text-[9px] font-extrabold uppercase tracking-[0.15em] text-white/55">Tourist Police</span><strong className="font-display text-2xl">1155</strong></span>
              </a>
              <div className="flex min-h-20 items-center gap-4 rounded-xl border border-white/12 bg-white/7 px-5 py-4">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-white/15"><ShieldCheck size={20} aria-hidden="true" /></span>
                <span><span className="block text-[9px] font-extrabold uppercase tracking-[0.15em] text-white/55">Polisgebonden</span><strong className="font-display text-xl">Je alarmcentrale</strong></span>
              </div>
            </div>
          </section>

          <section id="urgentie" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
            <div className="container-custom">
              <SectionHeading
                eyebrow="Eerst de juiste snelheid"
                title={<>Kies de zorgroute<br />niet de diagnose</>}
                description={<>Bij mogelijke medische spoed bel je <a href="tel:1669" className="font-extrabold text-jade underline decoration-saffron/45 underline-offset-4">1669</a>. Voor niet-acute hulp kan je <Link href="/travel-insurance/" className="font-extrabold text-jade underline decoration-saffron/45 underline-offset-4">verzekeringsalarmcentrale</Link> helpen bij een passende actuele zorglocatie.</>}
              />
              <div className="mt-9 grid gap-4 lg:grid-cols-3">
                {urgencyLevels.map(({ tag, title, copy, action, tone, icon: Icon }) => (
                  <article key={title} className={`rounded-2xl border p-6 shadow-editorial-card ${tone}`}>
                    <div className="flex items-center justify-between gap-4"><span className="grid h-11 w-11 place-items-center rounded-xl border border-current/15 bg-white/55"><Icon size={22} aria-hidden="true" /></span><span className="rounded-full border border-current/15 bg-white/45 px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.13em]">{action}</span></div>
                    <p className="mt-7 text-[9px] font-extrabold uppercase tracking-[0.15em] opacity-60">{tag}</p>
                    <h3 className="mt-2 font-display text-[1.9rem] font-semibold leading-[0.98]">{title}</h3>
                    <p className="mt-4 text-xs font-medium leading-6 opacity-75">{copy}</p>
                  </article>
                ))}
              </div>
              <p className="mt-5 max-w-[920px] text-xs font-medium leading-6 text-charcoal/58">Twijfel je over de ernst of verslechtert de situatie? Laat de urgentie beoordelen door een zorgprofessional. Deze kleurindeling is een voorbereidingsroute, geen medische triage-instrument.</p>
            </div>
          </section>

          <section id="zorgroute" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
            <div className="container-custom grid gap-10 lg:grid-cols-[0.68fr_1.32fr]">
              <div>
                <SectionHeading
                  eyebrow="Tijdens de reis"
                  title="Van eerste hulp tot bruikbaar dossier"
                  description="De praktische volgorde voorkomt dat medische hulp, verzekeringscontact en bewijsstukken door elkaar gaan lopen."
                />
                <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl border border-jade/10 shadow-editorial-card">
                  <Image src="/images/redesign/thailand-safety-emergency-kit.webp" alt="Telefoon, documenten en noodinformatie voor een reis door Thailand" fill sizes="(max-width: 1024px) 100vw, 36vw" className="object-cover" />
                </div>
              </div>
              <ol className="grid gap-4 sm:grid-cols-2">
                {careSteps.map(({ step, title, copy, icon: Icon }) => (
                  <li key={step} className="flex min-h-[250px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                    <div className="flex items-start justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/25 bg-saffron/8 text-jade"><Icon size={21} aria-hidden="true" /></span><span className="font-display text-4xl font-semibold text-jade/15">{step}</span></div>
                    <h3 className="mt-7 font-display text-[1.7rem] font-semibold leading-none text-jade">{title}</h3>
                    <p className="mt-4 text-xs font-medium leading-6 text-charcoal/68">{copy}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section id="ziekenhuischeck" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
            <div className="container-custom">
              <div className="grid gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-end">
                <SectionHeading
                  eyebrow="Geen top-tienlijst"
                  title="Kies een passende zorglocatie"
                  description="Een groot privéziekenhuis kan praktisch zijn, maar is niet automatisch de juiste keuze voor iedere vraag. Controleer de actuele locatie en afdeling rechtstreeks."
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  {hospitalChecks.map(({ title, copy, icon: Icon }) => (
                    <article key={title} className="rounded-xl border border-jade/10 bg-white p-5">
                      <Icon size={20} aria-hidden="true" className="text-saffron-dark" />
                      <h3 className="mt-4 font-display text-[1.45rem] font-semibold leading-none text-jade">{title}</h3>
                      <p className="mt-3 text-xs font-medium leading-5 text-charcoal/65">{copy}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="mt-10 grid overflow-hidden rounded-[1.6rem] bg-jade text-white shadow-editorial-card lg:grid-cols-[1fr_0.78fr]">
                <div className="p-7 lg:p-10">
                  <p className="eyebrow !text-saffron-light">Voor je vertrekt</p>
                  <h2 className="font-display text-[3rem] font-semibold leading-[0.9] tracking-[-0.04em]">Maak je zorgrouting offline beschikbaar</h2>
                  <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                    {preparation.map((item) => <li key={item} className="flex gap-3 text-xs font-medium leading-5 text-white/72"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-saffron text-jade"><Check size={12} strokeWidth={3} aria-hidden="true" /></span>{item}</li>)}
                  </ul>
                  <Link href="/travel-insurance/" className="btn-cream group mt-7 min-h-12 px-6 text-saffron-dark">Controleer de verzekeringsgids <ArrowRight size={15} aria-hidden="true" /></Link>
                  <p className="mt-3 text-[10px] font-medium leading-4 text-white/52">De verzekeringspagina kan affiliate-links bevatten. Vergelijk altijd de officiële polisvoorwaarden en vraag bij twijfel schriftelijke bevestiging.</p>
                </div>
                <div className="relative min-h-[340px]">
                  <Image src="/images/redesign/thailand-vaccinations-kit.webp" alt="Reisdocumenten en gezondheidsvoorbereiding voor Thailand" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
                </div>
              </div>
            </div>
          </section>

          <section className="section-divider-bottom bg-tonal py-12 lg:py-16">
            <div className="container-custom grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
              <SectionHeading eyebrow="Medicatie onderweg" title="Neem geen medische gok bij de apotheek" description="Beschikbaarheid zonder uitgebreide intake betekent niet dat een middel passend of veilig is voor jouw situatie." />
              <div className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                <div className="flex items-start gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-saffron/25 bg-saffron/8 text-jade"><Pill size={21} aria-hidden="true" /></span><div><h3 className="font-display text-[1.8rem] font-semibold leading-none text-jade">Vraag om een professional, niet alleen een product</h3><p className="mt-4 text-sm font-medium leading-7 text-charcoal/68">Gebruik voor bestaande medicatie de generieke werkzame stof, dosering en medische reden. Start of stop geen voorgeschreven medicatie op basis van een reissite. Laat klachten beoordelen en controleer invoerregels vóór vertrek bij de bevoegde instanties.</p><Link href="/practical-info/health-vaccinations/" className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-jade">Open de gezondheidsvoorbereiding <ArrowRight size={14} className="text-saffron-dark" aria-hidden="true" /></Link></div></div>
              </div>
            </div>
          </section>

          <FaqSplitSection
            eyebrow="Echte zoekvragen"
            title="Veelgestelde vragen over zorg in Thailand"
            description="Deze antwoorden helpen je de juiste route kiezen; een arts en verzekeraar beoordelen jouw concrete medische en financiële situatie."
            items={faqs}
          />

          <RelatedGuidesSection
            title="Bereid gezondheid en veiligheid samen voor"
            guides={[
              { title: "Vaccinaties & reisgezondheid", description: "Plan persoonlijk advies tijdig en scheid preventie van zorg tijdens de reis.", href: "/practical-info/health-vaccinations/", image: "/images/redesign/thailand-vaccinations-hero.webp" },
              { title: "Reisveiligheid", description: "Sla noodroutes op en maak vervoer, documenten en contactpersonen bereikbaar.", href: "/travel-security/", image: "/images/redesign/thailand-safety-hero.webp" },
              { title: "Reisverzekering", description: "Controleer medische kosten, activiteiten, evacuatie, duur en uitsluitingen in de polis.", href: "/travel-insurance/", image: "/images/redesign/thailand-safety-transport.webp" },
            ]}
          />

          <div id="bronnen">
            <SourceMethodSection
              title="Noodinformatie vraagt een officiële eigenaar"
              description="PAA’s zijn op 31 juli 2026 zichtbaar in de Nederlandse Google-resultaten gecontroleerd. Nummers, reisadvies en gezondheidsinformatie kunnen wijzigen; verifieer ze daarom opnieuw voor vertrek."
              sources={[
                { title: "Essential tourist assistance contact numbers", creator: "Thailand Government", url: "https://thailand.go.th/public/issue-focus-detail/essential-tourist-assistance-contact-numbers-to-ensure-a-smooth-and-safe-journey", note: "Officiële bevestiging van onder meer 1669 voor medische spoed en 1155 voor Tourist Police." },
                { title: "Reisadvies Thailand", creator: "NederlandWereldwijd", url: "https://www.nederlandwereldwijd.nl/reisadvies/thailand", note: "Actueel Nederlands overheidsreisadvies en voorbereiding op hulp in het buitenland." },
                { title: "Thailand", creator: "GGD Reisvaccinaties", url: "https://www.ggdreisvaccinaties.nl/land/thailand", note: "Bestemmingsinformatie als startpunt; persoonlijk advies hoort bij GGD, huisarts of reisarts." },
                { title: "Emergencies in Thailand", creator: "World Health Organization", url: "https://www.who.int/thailand/emergencies", note: "Primaire context over volksgezondheidsnoodorganisaties; geen vervanging voor lokale acute hulp." },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
