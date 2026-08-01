import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Ban,
  Bug,
  Check,
  ExternalLink,
  Eye,
  Footprints,
  HeartPulse,
  MapPinned,
  PawPrint,
  PhoneCall,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Trees,
  Waves,
  Worm,
} from "lucide-react";
import SEOHead from "../SEOHead";
import { EditorialHero } from "../design/EditorialHero";
import { FaqSplitSection } from "../design/FaqSplitSection";
import { PageSectionNav } from "../design/PageSectionNav";
import { RelatedGuidesSection } from "../design/RelatedGuidesSection";
import { SectionHeading } from "../design/SectionHeading";
import { SourceMethodSection } from "../design/SourceMethodSection";

const situations = [
  {
    title: "Straatdieren & apen",
    tag: "Afstand is de regel",
    copy: "Voer, aai of lok geen hond, kat of aap. Berg eten, flesjes, brillen en losse spullen op en probeer een dier niets terug af te pakken.",
    moment: "Tempels, uitzichtpunten, straten en stranden",
    icon: PawPrint,
  },
  {
    title: "Slangen & verborgen dieren",
    tag: "Kijken waar je stapt",
    copy: "Blijf op paden, gebruik licht in het donker en steek handen of voeten niet blind in begroeiing, holtes, schoenen of stapels materiaal.",
    moment: "Natuur, tuin, landelijk verblijf en nacht",
    icon: Worm,
  },
  {
    title: "Zee & kust",
    tag: "Lokale conditie eerst",
    copy: "Raak zeeleven niet aan en volg vlaggen, ranger- en strandinstructies. Een helder strand of eerdere veilige zwemdag zegt niets over vandaag.",
    moment: "Zwemmen, snorkelen, duiken en kustlopen",
    icon: Waves,
  },
  {
    title: "Insecten & geleedpotigen",
    tag: "Blootstelling beperken",
    copy: "Gebruik passende kleding, controleer kamer en beddengoed en volg actuele professionele productinstructies. Laat ernstige of snel verergerende reacties beoordelen.",
    moment: "Binnen, jungle, tuin en schemering",
    icon: Bug,
  },
  {
    title: "Wildlife spotten",
    tag: "Geen waarnemingsgarantie",
    copy: "Volg ranger en gids, blokkeer geen route en jaag een dier niet voor foto of video. Stap nooit uit of dichterbij omdat anderen dat doen.",
    moment: "Nationaal park, bootroute en bosrand",
    icon: Trees,
  },
];

const exposureSteps = [
  {
    step: "01",
    title: "Ga uit de gevarenzone",
    copy: "Creëer afstand zonder het dier te achtervolgen, vangen of doden. Regel bij ernstige klachten of direct gevaar meteen professionele noodhulp.",
    icon: Footprints,
  },
  {
    step: "02",
    title: "Was mogelijke rabiëswond direct",
    copy: "Bij een beet, krab of mogelijk speekselcontact op beschadigde huid: spoel en was onmiddellijk en grondig met water en zeep gedurende vijftien minuten.",
    icon: Waves,
  },
  {
    step: "03",
    title: "Zoek onmiddellijk medische beoordeling",
    copy: "Laat een arts de blootstelling, wond, tetanus- en rabiësroute beoordelen. Wacht niet op klachten en sla deze stap ook na preventieve vaccinatie niet over.",
    icon: Stethoscope,
  },
  {
    step: "04",
    title: "Leg context vast zonder risico",
    copy: "Noteer plaats, tijd, diertype en omstandigheden wanneer dat veilig kan. Probeer geen close-up, vangst of eigen soortidentificatie af te dwingen.",
    icon: Search,
  },
];

const doNot = [
  "Geen dier voeren, aaien, oppakken of met eten dichterbij lokken",
  "Geen wond dichtplakken of medische hulp uitstellen om eerst te reizen",
  "Geen tour- of socialmediaclaim gebruiken als bewijs dat contact veilig is",
  "Geen slang, kwal, insect of ander dier zelf als ongevaarlijk classificeren",
  "Geen beetset, zuigpomp, middel of online protocol als vervanging voor een arts",
  "Geen kind alleen laten naderen, ook niet bij een ogenschijnlijk tam dier",
];

const faqs = [
  {
    question: "Waar zitten de meeste slangen in Thailand?",
    answer:
      "Daar bestaat geen bruikbare toeristische kaart of garantie voor. Slangen kunnen in natuur, landbouwgebied, tuinen en soms stedelijke zones voorkomen, terwijl veel reizigers er geen zien. Verminder blootstelling door op paden te blijven, licht te gebruiken, niet blind te grijpen en ranger- of accommodatie-instructies te volgen.",
  },
  {
    question: "Wat voor wilde dieren heb je in Thailand?",
    answer:
      "Thailand heeft zeer uiteenlopende zoogdieren, reptielen, vogels, insecten en zeeleven. Deze owner is geen soortenlijst: voor reizigers is gedrag belangrijker dan zeldzaamheid. Houd afstand, voer niets, raak niets aan en behandel een waarneming nooit als uitnodiging om de route van een dier te blokkeren.",
  },
  {
    question: "Waar zitten de tijgers in Thailand?",
    answer:
      "Wilde tijgers leven in beschermde landschappen en een waarneming is niet voorspelbaar of verantwoord na te jagen. Gebruik uitsluitend officiële park- en natuurinformatie, volg rangerregels en kies geen aanbieder die direct contact, lokken of een gegarandeerde wilde waarneming belooft.",
  },
  {
    question: "Wat moet je doen als je in Thailand gebeten wordt?",
    answer:
      "Ga uit de gevarenzone en regel bij ernstige klachten direct noodhulp. Bij een mogelijke rabiësblootstelling adviseert de WHO de wond onmiddellijk en grondig vijftien minuten met water en zeep te wassen en direct professionele medische beoordeling te zoeken. Laat een arts de wond, tetanus, rabiës-PEP en overige behandeling bepalen.",
  },
  {
    question: "Hoe groot is de kans dat je rabiës krijgt in Thailand?",
    answer:
      "Een persoonlijk percentage is niet betrouwbaar uit een zoekresultaat af te leiden. Risico hangt af van werkelijk contact, dier, wond, locatie en tijdige zorg. Voorkom contact, bespreek preventieve vaccinatie met een reisarts en zoek na mogelijke blootstelling onmiddellijk medische beoordeling—ook als je vooraf bent ingeënt.",
  },
];

export default function ThailandAnimalRiskGuideNl() {
  const pageUrl = "https://go2-thailand.com/nl/travel-guides/dangerous-animals-thailand/";
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Dierenrisico’s in Thailand: afstand houden en juist handelen",
      description:
        "Voorkom onnodig diercontact en volg na beet, krab, steek of mogelijk rabiëscontact een professionele hulproute.",
      image: "https://go2-thailand.com/images/redesign/thailand-animal-risk-hero-v2.webp",
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
        { "@type": "ListItem", position: 3, name: "Dierenrisico’s", item: pageUrl },
      ],
    },
  ];

  return (
    <>
      <SEOHead
        title="Gevaarlijke dieren Thailand: voorkomen en handelen"
        description="Wat doe je bij een dierenbeet in Thailand? Voorkom contact met apen, honden, slangen en zeeleven en volg de officiële medische hulproute."
        ogImage="https://go2-thailand.com/images/redesign/thailand-animal-risk-hero-v2.webp"
      >
        {schemas.map((schema, index) => (
          <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}
      </SEOHead>

      <div data-premium-template="dangerous-animals-thailand-nl" className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          image="/images/redesign/thailand-animal-risk-hero-v2.webp"
          imageAlt="Reiziger bekijkt op ruime afstand een makaak achter een afscheiding in een Thais natuurgebied"
          breadcrumbs={[
            { label: "Thailand", href: "/" },
            { label: "Reisgidsen", href: "/travel-guides/" },
            { label: "Dierenrisico’s" },
          ]}
          eyebrow="Kijken, afstand houden, doorlopen"
          title={<>Wild Thailand.<br /><span className="text-saffron-light">Geen close-up nodig.</span></>}
          subtitle="Het beste dierencontact is vaak géén contact."
          description="Deze gids ordent vermijden en eerste stappen na een incident. Hij identificeert geen soort, stelt geen diagnose en vervangt geen ranger, arts, antigifcentrum of medische spoedhulp."
          actions={[
            { label: "Herken de situaties", href: "#situaties", kind: "primary" },
            { label: "Na beet of krab", href: "#blootstelling", kind: "secondary" },
          ]}
          contentTone="light"
          gradientClassName="bg-[linear-gradient(90deg,rgba(4,31,25,0.98)_0%,rgba(4,31,25,0.9)_39%,rgba(4,31,25,0.2)_67%,rgba(4,31,25,0.03)_100%)]"
          imageClassName="object-cover object-[70%_center]"
          titleClassName="max-w-[730px] text-[4rem] leading-[0.84] !text-white sm:text-[5rem] lg:text-[5.7rem]"
          subtitleClassName="max-w-[590px] text-[1.4rem] leading-[1.1] !text-white sm:text-[1.65rem]"
          descriptionClassName="mt-4 max-w-[600px] text-sm leading-7 !text-white/75"
        />

        <PageSectionNav
          items={[
            { href: "#situaties", label: "Situaties", icon: PawPrint },
            { href: "#blootstelling", label: "Na contact", icon: HeartPulse },
            { href: "#afstand", label: "Afstand", icon: Eye },
            { href: "#vragen", label: "Vragen", icon: Sparkles },
          ]}
        />

        <div>
          <section className="section-divider-bottom bg-jade py-5 text-white">
            <div className="container-custom grid gap-3 sm:grid-cols-[0.8fr_1.2fr_1fr]">
              <div className="flex min-h-20 items-center gap-4 rounded-xl border border-white/12 bg-white/7 px-5 py-4"><span className="grid h-10 w-10 place-items-center rounded-full bg-saffron text-jade"><Ban size={20} aria-hidden="true" /></span><span><span className="block text-[9px] font-extrabold uppercase tracking-[0.15em] text-white/55">Preventie</span><strong className="font-display text-xl">Niet voeren of aanraken</strong></span></div>
              <div className="flex min-h-20 items-center gap-4 rounded-xl border border-white/12 bg-white/7 px-5 py-4"><span className="grid h-10 w-10 place-items-center rounded-full bg-saffron text-jade"><Waves size={20} aria-hidden="true" /></span><span><span className="block text-[9px] font-extrabold uppercase tracking-[0.15em] text-white/55">Mogelijke rabiësblootstelling</span><strong className="font-display text-xl">Direct 15 minuten wassen</strong></span></div>
              <div className="flex min-h-20 items-center gap-4 rounded-xl border border-white/12 bg-white/7 px-5 py-4"><span className="grid h-10 w-10 place-items-center rounded-full bg-saffron text-jade"><Stethoscope size={20} aria-hidden="true" /></span><span><span className="block text-[9px] font-extrabold uppercase tracking-[0.15em] text-white/55">Daarna</span><strong className="font-display text-xl">Onmiddellijk medische beoordeling</strong></span></div>
            </div>
          </section>

          <section id="situaties" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
            <div className="container-custom">
              <SectionHeading
                eyebrow="Risico ontstaat in een moment"
                title={<>Vijf situaties,<br />dezelfde hoofdregel</>}
                description={<>Creëer afstand, volg lokale instructies en laat een incident professioneel beoordelen. Leg vóór vertrek ook je <Link href="/practical-info/health-vaccinations/" className="font-extrabold text-jade underline decoration-saffron/45 underline-offset-4">rabiës- en vaccinatievragen</Link> aan een reisarts voor.</>}
              />
              <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                {situations.map(({ title, tag, copy, moment, icon: Icon }, index) => (
                  <article key={title} className="flex min-h-[350px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                    <div className="flex items-start justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/25 bg-saffron/8 text-jade"><Icon size={21} aria-hidden="true" /></span><span className="font-display text-4xl text-jade/12">0{index+1}</span></div>
                    <p className="mt-7 text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">{tag}</p>
                    <h3 className="mt-2 font-display text-[1.65rem] font-semibold leading-none text-jade">{title}</h3>
                    <p className="mt-4 text-xs font-medium leading-6 text-charcoal/68">{copy}</p>
                    <p className="mt-auto border-t border-jade/10 pt-4 text-[10px] font-semibold leading-5 text-charcoal/48">{moment}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="blootstelling" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
            <div className="container-custom grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
              <div className="lg:sticky lg:top-28">
                <SectionHeading eyebrow="Na beet, krab of mogelijk speekselcontact" title="Handel direct, laat een arts beoordelen" description="Rabiës-PEP en overige behandeling hangen van de echte blootstelling af. Een eerdere preventieve vaccinatie is geen reden om zorg over te slaan." />
                <div className="mt-7 rounded-2xl border border-rose-200 bg-rose-50 p-5 text-rose-950"><p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-rose-700">Medische grens</p><p className="mt-3 text-xs font-medium leading-6">Bij ernstige bloeding, ademhalingsproblemen, bewustzijnsverandering of snelle verslechtering: regel onmiddellijk lokale medische spoedhulp. Deze pagina is geen triage-instrument.</p></div>
              </div>
              <ol className="grid gap-4 sm:grid-cols-2">
                {exposureSteps.map(({ step, title, copy, icon: Icon }) => (
                  <li key={step} className="min-h-[250px] rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card">
                    <div className="flex items-start justify-between"><span className="grid h-11 w-11 place-items-center rounded-full bg-jade text-saffron"><Icon size={20} aria-hidden="true" /></span><span className="text-[10px] font-extrabold tracking-[0.15em] text-saffron-dark">STAP {step}</span></div>
                    <h3 className="mt-7 font-display text-[1.7rem] font-semibold leading-none text-jade">{title}</h3>
                    <p className="mt-4 text-xs font-medium leading-6 text-charcoal/67">{copy}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section id="afstand" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
            <div className="container-custom">
              <div className="grid overflow-hidden rounded-[1.7rem] bg-jade text-white shadow-editorial-card lg:grid-cols-[0.9fr_1.1fr]">
                <div className="relative min-h-[400px]"><Image src="/images/redesign/thailand-wildlife-safety-hero-v2.webp" alt="Wild dier in een Thais natuurgebied bekeken zonder direct contact" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" /></div>
                <div className="p-7 lg:p-10">
                  <p className="eyebrow !text-saffron-light">Geen foto is het risico waard</p>
                  <h2 className="font-display text-[3.1rem] font-semibold leading-[0.89] tracking-[-0.04em]">Wat je bewust niet doet</h2>
                  <ul className="mt-7 space-y-3">{doNot.map(item=><li key={item} className="flex gap-3 text-xs font-medium leading-5 text-white/72"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-saffron text-jade"><Check size={12} strokeWidth={3} aria-hidden="true" /></span>{item}</li>)}</ul>
                  <Link href="/travel-guides/health-hospitals-thailand/" className="btn-cream group mt-7 min-h-12 px-6 text-saffron-dark">Open de zorg- en ziekenhuisroute <ArrowRight size={15} aria-hidden="true" /></Link>
                  <p className="mt-4 text-[10px] font-medium leading-5 text-white/52">Geen affiliateproducten op deze owner: afweermiddelen, beetsets of “snake gear” kunnen schijnveiligheid geven en horen niet in een medische handelingsroute.</p>
                </div>
              </div>
            </div>
          </section>

          <FaqSplitSection eyebrow="Echte zoekvragen" title="Veelgestelde vragen over dieren in Thailand" description="De antwoorden vervangen sensatie en kanspercentages door afstand, preventie en professionele beoordeling." items={faqs} />

          <RelatedGuidesSection
            title="Bereid natuur en gezondheid samen voor"
            guides={[
              { title: "Vaccinaties & reisgezondheid", description: "Bespreek rabiës en andere persoonlijke gezondheidsvragen tijdig met een reisarts.", href: "/practical-info/health-vaccinations/", image: "/images/redesign/thailand-vaccinations-hero.webp" },
              { title: "Zorg & ziekenhuizen", description: "Volg bij een incident de juiste spoed-, verzekerings- en dossierroute.", href: "/travel-guides/health-hospitals-thailand/", image: "/images/redesign/thailand-health-hospitals-hero-v2.webp" },
              { title: "Nationale parken", description: "Kies park, route, ranger en seizoen zonder een wilde waarneming te garanderen.", href: "/travel-guides/national-parks-thailand/", image: "/images/redesign/korat-khao-yai.webp" },
            ]}
          />

          <div id="bronnen">
            <SourceMethodSection
              title="Medische blootstelling vraagt professionele beoordeling"
              description="Nederlandse PAA’s zijn op 31 juli 2026 zichtbaar gecontroleerd. De eerste-hulproute is aan RIVM en WHO gekoppeld; individuele PEP, tetanus, antigif en wondbehandeling blijven medische besluiten."
              sources={[
                { title: "Hondsdolheid voor reizigers", creator: "RIVM", url: "https://www.rivm.nl/rabies/vragen-en-antwoorden-rabies-voor-reizigers", note: "Nederlandse primaire informatie over vermijden, voorbereiding en handelen na beet of krab in het buitenland." },
                { title: "Rabiësrisico per land", creator: "RIVM", url: "https://www.rivm.nl/rabies/informatie-voor-professionals/landenlijst-rabiesrisico", note: "Actuele professionele risicolijst; persoonlijke beoordeling hoort bij zorgprofessionals." },
                { title: "Rabies fact sheet", creator: "World Health Organization", url: "https://www.who.int/news-room/fact-sheets/detail/rabies", note: "Primaire bron voor wond wassen, onmiddellijke zorg en PEP-principes." },
                { title: "Animal bites", creator: "World Health Organization", url: "https://www.who.int/news-room/fact-sheets/detail/animal-bites", note: "Primaire context over uiteenlopende beet-, steek- en contactrisico’s en vroege medische beoordeling." },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
