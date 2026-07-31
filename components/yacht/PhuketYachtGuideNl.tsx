import {
  Anchor,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  ExternalLink,
  LifeBuoy,
  MapPin,
  Route,
  Sailboat,
  ShieldCheck,
  Users,
  Waves,
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

export type YachtOwner =
  | "charter"
  | "rental"
  | "catamaran"
  | "luxury"
  | "phi-phi"
  | "similan";

const CONFIG = {
  charter: {
    path: "/yacht-charter-phuket/",
    eyebrow: "Kies eerst het type dag op zee",
    title: "Yacht charter op Phuket.",
    accent: "Privé, gedeeld of met bemanning?",
    subtitle: "De juiste boot begint bij je groep en route.",
    description:
      "Een sunsetcruise, privé dagboot en meerdaagse charter zijn andere producten. Vergelijk eerst privacy, route, bemanning en inclusies; bekijk daarna de actuele beschikbaarheid.",
    focus: "Welke charter bedoel je eigenlijk?",
    focusCopy:
      "Een gedeelde dagtocht verkoopt een plek en vast programma. Een privécharter verkoopt exclusief gebruik binnen afgesproken route en tijd. Bareboat laat de vaart aan jou over en vraagt vooraf geaccepteerde kwalificaties.",
    image: "/images/redesign/phuket-yacht-charter-hero-v2.webp",
    alt: "Een zeilcatamaran op de Andamanse Zee bij Phuket",
  },
  rental: {
    path: "/yacht-rental-phuket/",
    eyebrow: "Bareboat is een verantwoordelijkheid, geen upgrade",
    title: "Een yacht huren op Phuket.",
    accent: "Zelf varen of een schipper?",
    subtitle: "Laat je kwalificatie vóór de reis schriftelijk accepteren.",
    description:
      "Yacht rental heeft een eigen intentie: bareboat versus skippered. Vergelijk vaargebied, ervaringseisen, borg, briefing en weersbesluit voordat je een boot kiest.",
    focus: "Bareboat en skippered zijn twee verschillende overeenkomsten",
    focusCopy:
      "Zonder schipper ben jij verantwoordelijk voor navigatie, overdracht en naleving van operatorvoorwaarden. Laat certificaat en vaar-CV vóór betalen beoordelen. Bij een schipper blijven route, maaltijden, hut en bevoegdheden contractpunten.",
    image: "/images/redesign/phuket-yacht-charter-hero-v2.webp",
    alt: "Een zeilcatamaran op de Andamanse Zee bij Phuket",
  },
  catamaran: {
    path: "/catamaran-phuket/",
    eyebrow: "Meer dekruimte, een andere vaarbeleving",
    title: "Een catamaran huren op Phuket.",
    accent: "Kies op groep, route en zee.",
    subtitle: "Stabiliteit is sterk, maar niet de enige afweging.",
    description:
      "Een catamaran biedt veel leefruimte en beweegt anders dan een monohull. Vergelijk zeil- of motorcatamaran, groepsindeling, schaduw, zwemtoegang en routevoorwaarden.",
    focus: "Zeilcatamaran of motorcatamaran?",
    focusCopy:
      "Een zeilcatamaran past bij een ontspannen vaardag; een motorcatamaran kan een andere route- en tijdsindeling geven. Werk met actuele operatorspecificaties, want weersomstandigheden en vaarsnelheid laten zich niet garanderen.",
    image: "/images/redesign/phuket-yacht-charter-hero-v2.webp",
    alt: "Een moderne catamaran bij Phuket",
  },
  luxury: {
    path: "/yacht-charter-phuket/luxury/",
    eyebrow: "Luxe zit in uitvoering, niet alleen in bootlengte",
    title: "Luxe yacht charter op Phuket.",
    accent: "Laat de offerte het verhaal bewijzen.",
    subtitle: "Bemanning, privacy en service horen concreet op papier.",
    description:
      "Een premium foto zegt niets over brandstof, catering, hutten, transfers of bemanning. Bouw de ervaring met een schriftelijke offerte en controleer wat exclusief gebruik werkelijk omvat.",
    focus: "Van mooie listing naar uitvoerbare offerte",
    focusCopy:
      "Laat bootidentiteit, bemanning, gastenlimiet, route, eten, dranken, transfers, brandstof, parkfees en belastingen afzonderlijk bevestigen. Vraag ook wie beslist bij weerwijziging en welke vervanging mogelijk is.",
    image: "/images/redesign/phuket-yacht-charter-hero-v2.webp",
    alt: "Een elegante privécatamaran bij Phuket",
  },
  "phi-phi": {
    path: "/yacht-charter-phuket/phi-phi/",
    eyebrow: "De route is belangrijker dan de bootfoto",
    title: "Privé varen naar Phi Phi.",
    accent: "Plan stops én terugkeerbuffer.",
    subtitle: "Een eigen boot geeft regie, geen controle over zee of park.",
    description:
      "Een privéroute naar Phi Phi draait om vertrekpunt, gewenste stops, actuele toegang, zwem- en snorkelplan en voldoende ruimte voor de terugreis.",
    focus: "Kies een Phi Phi-route, niet een lijst met garanties",
    focusCopy:
      "Bespreek welke eilanden en baaien gewenst zijn, maar accepteer dat parkregels, drukte, stroming en weer de volgorde kunnen veranderen. Een goede operator legt vooraf uit welke alternatieven veilig zijn.",
    image: "/images/redesign/koh-phi-phi-island-hero-nl.webp",
    alt: "De kalksteenbaaien van de Phi Phi-eilanden",
  },
  similan: {
    path: "/yacht-charter-phuket/similan/",
    eyebrow: "Controleer eerst of de route vandaag uitvoerbaar is",
    title: "Privé varen naar de Similan-eilanden.",
    accent: "Parktoegang en zee beslissen mee.",
    subtitle:
      "Afstand, vertrekpunt en actuele regels maken dit een specialistische route.",
    description:
      "Een Similan-charter vraagt actuele parktoegang, passend vertrekpunt, zeewaardige boot en een realistisch alternatief. Boek niet op een oude kalender of vaste vaartijd.",
    focus: "Similan is geen standaard Phuket-dagtocht",
    focusCopy:
      "Laat de operator schriftelijk bevestigen vanaf waar de boot vertrekt, hoeveel tijd werkelijk op bestemming overblijft en wat gebeurt wanneer parkautoriteiten of zeecondities de route wijzigen.",
    image:
      "/images/blog/similan-islands-diving-snorkelling-new-rules-2026.webp",
    alt: "Helder water en granieten eilanden van Mu Ko Similan",
  },
} as const;

const FAQ: Record<YachtOwner, { question: string; answer: string }[]> = {
  charter: [
    {
      question: "Wat kost een yacht charter op Phuket?",
      answer:
        "Er is geen vaste betrouwbare prijs. Boot, exclusiviteit, duur, route, brandstof, bemanning, eten, transfers en parkfees veranderen de totaalprijs. Vergelijk schriftelijke inclusies en bekijk daarna het actuele bedrag bij de aanbieder.",
    },
    {
      question: "Wat is het verschil tussen gedeeld en privé?",
      answer:
        "Bij gedeeld boek je plaatsen binnen een vast programma. Bij privé reserveer je exclusief gebruik, maar route en stops blijven afhankelijk van contract, regels en omstandigheden.",
    },
    {
      question: "Welke jachthaven is het handigst?",
      answer:
        "Dat hangt af van boot, route en hotel. Gebruik de echte vertrekpin op de voucher en bereken je transfer; ga niet uit van één vaste Phuket-marina.",
    },
    {
      question: "Wat moet bij de charter zijn inbegrepen?",
      answer:
        "Laat boot, bemanning, brandstof, maaltijden, dranken, transfer, uitrusting, parkfees, belasting en eventuele toeslagen afzonderlijk bevestigen.",
    },
  ],
  rental: [
    {
      question: "Heb je een vaarbewijs nodig voor bareboat op Phuket?",
      answer:
        "De operator bepaalt welke kwalificatie en ervaring voor boot en vaargebied wordt geaccepteerd. Stuur certificaat en vaar-CV vooraf en vraag schriftelijke goedkeuring vóór betalen.",
    },
    {
      question: "Kun je dezelfde boot met schipper huren?",
      answer:
        "Sommige operators bieden dat aan, maar controleer schipperskosten, hut, maaltijden, routebevoegdheid en verantwoordelijkheden in de offerte.",
    },
    {
      question: "Is bareboat geschikt voor een eerste bezoek?",
      answer:
        "Alleen wanneer de operator je ervaring passend vindt en je comfortabel bent met lokaal vaargebied, briefing en weersbesluiten. Een schipper kan de veiligere keuze zijn.",
    },
    {
      question: "Welke documenten stuur je vooraf?",
      answer:
        "Vraag de operator om de actuele lijst. Vaak zijn kwalificatie, vaar-CV en identiteitsgegevens relevant, maar publiceer geen universele acceptatiebelofte.",
    },
  ],
  catamaran: [
    {
      question: "Waarom een catamaran kiezen?",
      answer:
        "De brede opzet biedt veel dek- en leefruimte en wordt vaak als stabiel ervaren. Controleer wel trapjes, schaduw, toiletten, zitplaatsen en capaciteit voor jouw groep.",
    },
    {
      question: "Zeilcatamaran of motorcatamaran?",
      answer:
        "Kies op gewenste vaarbeleving, route en groepscomfort. Gebruik geen vaste vaartijden: wind, zee en operationele keuzes bepalen de uitvoering.",
    },
    {
      question: "Kun je een catamaran met schipper huren?",
      answer:
        "Ja, veel aanbiedingen zijn bemand. Controleer precies welke bemanning, catering, brandstof en route bij het getoonde product horen.",
    },
    {
      question: "Welke maat catamaran heb je nodig?",
      answer:
        "Niet alleen lengte telt. Vraag naar gecertificeerde gastencapaciteit, binnen- en buitenzitplaatsen, schaduw, toiletten en eventuele hutten.",
    },
  ],
  luxury: [
    {
      question: "Wat maakt een yacht charter luxe?",
      answer:
        "Vooral de concrete service: exclusiviteit, staat van het schip, verhouding bemanning-gasten, catering, privacy, transfers en maatwerk. Laat alles specificeren.",
    },
    {
      question: "Is brandstof inbegrepen?",
      answer:
        "Dat verschilt per offerte en route. Vraag om een totaalbedrag of duidelijke berekeningswijze en laat mogelijke routewijzigingen uitleggen.",
    },
    {
      question: "Kun je catering en dranken aanpassen?",
      answer:
        "Vaak wel, maar allergenen, dieetwensen, alcohol, premiumdranken en deadline moeten schriftelijk worden bevestigd.",
    },
    {
      question: "Wat gebeurt er bij slecht weer?",
      answer:
        "Controleer wie het veiligheidsbesluit neemt en welke wijziging, vervangende route, verplaatsing of terugbetaling in het contract staat.",
    },
  ],
  "phi-phi": [
    {
      question: "Kun je privé van Phuket naar Phi Phi varen?",
      answer:
        "Er zijn private-bootproducten, maar boot, vertrekpunt en route verschillen. Controleer actuele beschikbaarheid en parkvoorwaarden bij de aanbieder.",
    },
    {
      question: "Welke stops horen bij een Phi Phi-charter?",
      answer:
        "Vraag om een voorgesteld programma, maar behandel stops niet als garantie. Weer, stroming, drukte en parkregels kunnen de dag veranderen.",
    },
    {
      question: "Zijn parkfees inbegrepen?",
      answer:
        "Niet altijd. Laat per gast en bestemming bevestigen welke park- of toegangskosten wel of niet in de prijs zitten.",
    },
    {
      question: "Hoe vermijd je de grootste drukte?",
      answer:
        "Bespreek vertrektijd en route met de operator. Veiligheid en actuele toegangsregels gaan boven een belofte van een lege baai.",
    },
  ],
  similan: [
    {
      question: "Kun je vanuit Phuket privé naar Similan varen?",
      answer:
        "Er bestaan specialistische producten, maar uitvoerbaarheid hangt af van vertrekpunt, boot, parktoegang en zee. Laat de aanbieder de route voor jouw datum bevestigen.",
    },
    {
      question: "Wanneer zijn de Similan-eilanden open?",
      answer:
        "Gebruik de actuele mededelingen van DNP/Mu Ko Similan National Park. Jaarlijkse data kunnen veranderen en oude blogs zijn geen toegangsbewijs.",
    },
    {
      question: "Is Similan geschikt als dagtocht?",
      answer:
        "Dat hangt af van vertrekpunt, vaartuig en programma. Vraag hoeveel effectieve tijd op bestemming resteert en welk alternatief geldt als de route niet veilig is.",
    },
    {
      question: "Wat controleer je vóór betalen?",
      answer:
        "Parkstatus, vertrekhaven, boot en bemanning, route, parkfees, duik- of snorkeluitrusting, weersbeleid, annulering en terugkeerplanning.",
    },
  ],
};

export default function PhuketYachtGuideNl({
  owner,
  primaryUrl,
  secondaryUrl,
}: {
  owner: YachtOwner;
  primaryUrl: string;
  secondaryUrl: string;
}) {
  const c = CONFIG[owner];
  const faqs = FAQ[owner];
  const canonical = `https://go2-thailand.com/nl${c.path}`;
  const primary = withSubId(primaryUrl, `phuket-yacht-${owner}-nl-primary`);
  const secondary = withSubId(
    secondaryUrl,
    `phuket-yacht-${owner}-nl-secondary`,
  );
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: c.title,
      description: c.description,
      url: canonical,
      inLanguage: "nl-NL",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ];
  return (
    <>
      <SEOHead
        title={`${c.title} Onafhankelijke keuzehulp`}
        description={c.description}
      >
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="nl" href={canonical} />
        <link
          rel="alternate"
          hrefLang="en"
          href={`https://go2-thailand.com${c.path}`}
        />
        {schemas.map((s, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
          />
        ))}
      </SEOHead>
      <main className="bg-canvas text-charcoal">
        <EditorialHero
          image={c.image}
          imageAlt={c.alt}
          breadcrumbs={[
            { label: "Thailand", href: "/" },
            { label: "Phuket", href: "/city/phuket/" },
            { label: c.title },
          ]}
          eyebrow={c.eyebrow}
          title={
            <>
              {c.title}
              <br />
              <span className="text-saffron-dark">{c.accent}</span>
            </>
          }
          subtitle={c.subtitle}
          description={c.description}
          actions={[
            { label: "Kies je charter", href: "#keuze", kind: "primary" },
            {
              label: "Bekijk actuele opties",
              href: primary,
              kind: "secondary",
              newTab: true,
              affiliate: true,
            },
          ]}
          disclosure="De externe optieknop is een affiliate-link. Wij kunnen commissie ontvangen zonder extra kosten voor jou. Actuele boot, prijs, route, inclusies en voorwaarden staan uitsluitend bij de aanbieder."
          titleClassName="max-w-[790px] text-[3.25rem] leading-[0.9] sm:text-[4.45rem] lg:text-[5.1rem]"
        />
        <PageSectionNav
          label="Op deze pagina"
          items={[
            { href: "#keuze", label: "Charterkeuze", icon: Sailboat },
            { href: "#offerte", label: "Offertecheck", icon: ClipboardCheck },
            { href: "#veiligheid", label: "Veiligheid", icon: LifeBuoy },
            { href: "#boeken", label: "Actueel boeken", icon: Anchor },
            { href: "#vragen", label: "Vragen", icon: ShieldCheck },
          ]}
        />
        <section
          id="keuze"
          className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
        >
          <div className="container-custom grid gap-9 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="eyebrow">De ownerkeuze</p>
              <h2 className="mt-3 font-display text-4xl leading-tight text-jade lg:text-5xl">
                {c.focus}
              </h2>
              <p className="mt-5 leading-8 text-muted">{c.focusCopy}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                [
                  Users,
                  "Groep en privacy",
                  "Aantal gasten, exclusiviteit, schaduw en zitruimte.",
                ],
                [
                  Route,
                  "Route en tijd",
                  "Vertrekpin, gewenste stops en veilige terugkeer.",
                ],
                [
                  Anchor,
                  "Boot en bemanning",
                  "Exact schip, capaciteit, schipper en crewrollen.",
                ],
                [
                  Waves,
                  "Weer en alternatief",
                  "Wie beslist en wat gebeurt bij een routewijziging.",
                ],
              ].map(([Icon, t, x], i) => {
                const I = Icon as typeof Sailboat;
                return (
                  <article
                    key={String(t)}
                    className={`rounded-[1.25rem] border border-jade/10 p-5 ${i === 0 ? "bg-jade text-ivory" : "bg-white"}`}
                  >
                    <I className={i === 0 ? "text-saffron" : "text-jade"} />
                    <h3 className="mt-4 font-display text-2xl">{String(t)}</h3>
                    <p
                      className={`mt-2 text-sm leading-6 ${i === 0 ? "text-ivory/75" : "text-muted"}`}
                    >
                      {String(x)}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
        <section
          id="offerte"
          className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
        >
          <div className="container-custom">
            <SectionHeading
              eyebrow="Een listing is nog geen overeenkomst"
              title={
                <>
                  Laat acht punten.
                  <br />
                  Schriftelijk bevestigen.
                </>
              }
              description="Vergelijk offertes alleen wanneer ze dezelfde ervaring en risico's omvatten."
            />
            <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "Exact schip en gastencapaciteit",
                "Schipper, crew en talen",
                "Vertrekpin en transfer",
                "Route en mogelijke alternatieven",
                "Brandstof en vaartijd",
                "Eten, drinken en allergenen",
                "Parkfees en belastingen",
                "Annulering en weersbesluit",
              ].map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-xl border border-jade/10 bg-white p-4 text-sm font-semibold leading-6 text-jade"
                >
                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-saffron"
                    size={18}
                  />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
        <section
          id="veiligheid"
          className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
        >
          <div className="container-custom grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <SectionHeading
                eyebrow="Marine safety vóór de sfeerfoto"
                title="Een goede operator kan ook nee zeggen"
                description="Route en vertrektijd mogen veranderen wanneer autoriteiten of omstandigheden daarom vragen."
              />
              <ul className="mt-7 grid gap-4">
                {[
                  "Vraag waar reddingsvesten en noodmiddelen liggen",
                  "Meld zwemmen, allergieën en medische bijzonderheden",
                  "Raak koraal niet aan en volg park- en crew-instructies",
                  "Bewaar voucher, vertrekpin en noodcontact offline",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-7 text-jade"
                  >
                    <BadgeCheck
                      className="mt-1 shrink-0 text-saffron"
                      size={19}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <aside className="rounded-[1.5rem] bg-jade p-7 text-ivory lg:p-9">
              <Compass className="text-saffron" />
              <h3 className="mt-5 font-display text-3xl">Route gewijzigd?</h3>
              <p className="mt-3 leading-7 text-ivory/75">
                Vraag vóór boeken welke gelijkwaardige route, datumwijziging of
                terugbetaling geldt wanneer de geplande bestemming niet veilig
                of toegankelijk is.
              </p>
            </aside>
          </div>
        </section>
        <section
          id="boeken"
          className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
        >
          <div className="container-custom grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="eyebrow">Na de gratis checklist</p>
              <h2 className="mt-3 font-display text-4xl text-jade">
                Bekijk actuele uitvoering en prijs
              </h2>
              <p className="mt-4 leading-8 text-muted">
                Open dezelfde data bij twee aanbieders en vergelijk niet alleen
                het eerste bedrag, maar ook route, duur, transfers, inclusies en
                annuleringsregels.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href={primary}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="flex items-center justify-between rounded-xl bg-jade px-5 py-4 text-sm font-bold text-white"
              >
                Actuele opties bij aanbieder{" "}
                <ExternalLink className="text-saffron" size={17} />
              </a>
              <a
                href={secondary}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="flex items-center justify-between rounded-xl border border-jade/15 bg-white px-5 py-4 text-sm font-bold text-jade"
              >
                Vergelijk tweede aanbieder{" "}
                <ExternalLink className="text-saffron" size={17} />
              </a>
            </div>
            <AffiliateDisclosure
              className="lg:col-span-2"
              text="Beide knoppen zijn affiliate-links via onze centrale Travelpayoutsconfiguratie. Een mogelijke commissie verandert jouw prijs niet. We plaatsen geen vaste charterprijs en rangschikken geen operator op commissie."
            />
          </div>
        </section>
        <FaqSplitSection
          id="vragen"
          eyebrow="Voor je betaalt"
          title={`${c.title} Veelgestelde vragen`}
          items={faqs}
        />
        <section className="section-divider-top py-14">
          <div className="container-custom">
            <div className="rounded-[1.5rem] bg-jade p-7 text-ivory lg:p-9">
              <p className="eyebrow text-saffron">Vergelijk de juiste owner</p>
              <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <h2 className="font-display text-3xl">
                  Van boottype naar uitvoerbare route
                </h2>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(CONFIG)
                    .filter(([k]) => k !== owner)
                    .map(([k, v]) => (
                      <Link
                        key={k}
                        href={v.path}
                        className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold hover:bg-white/15"
                      >
                        {k === "charter"
                          ? "Alle charters"
                          : k === "rental"
                            ? "Bareboat of schipper"
                            : k === "catamaran"
                              ? "Catamaran kiezen"
                              : k === "luxury"
                                ? "Luxe offerte"
                                : k === "phi-phi"
                                  ? "Privé naar Phi Phi"
                                  : "Similan haalbaarheid"}
                        <ArrowRight size={14} className="text-saffron" />
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <SourceMethodSection
          title="Bronnen en actualiteit"
          description="We scheiden blijvende keuzehulp van veranderlijke boten, prijzen, parktoegang en zeecondities."
          sources={[
            {
              label: "Tourism Authority of Thailand — Cruise & Yacht Travel",
              href: "https://tourismproduct.tourismthailand.org/en/database/ebook/cruise-yacht-travel",
            },
            {
              label: "TAT — Coral College marine safety",
              href: "https://www.tatnews.org/2025/07/tat-launches-coral-college-project-to-promote-safe-and-sustainable-marine-tourism/",
            },
            {
              label: "DNP — Mu Ko Similan National Park updates",
              href: "https://news.dnp.go.th/news/38198",
            },
          ]}
          method="Zes zichtbare Google-NL SERP's zijn gecontroleerd. Er verscheen geen stabiel PAA-blok en DataForSEO leverde tijdelijk geen bruikbaar rapport. FAQ's zijn daarom gebaseerd op zichtbare zoekmodificaties en primaire veiligheids- en parkbronnen; actuele commerciële feiten blijven bij de aanbieder."
        />
      </main>
    </>
  );
}
