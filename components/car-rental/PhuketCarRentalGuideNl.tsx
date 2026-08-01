import {
  ArrowRight,
  BadgeCheck,
  Car,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  ExternalLink,
  FileCheck2,
  Gauge,
  KeyRound,
  MapPin,
  PlaneLanding,
  Route,
  ShieldCheck,
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

export type CarRentalOwner = "hub" | "airport" | "long-term" | "automatic";

const CONFIG = {
  hub: {
    path: "/car-rental-phuket/",
    eyebrow: "Eerst beslissen of een auto bij je reis past",
    title: "Auto huren op Phuket.",
    accent: "Vrijheid met een goede checklist.",
    subtitle: "Vergelijk voorwaarden vóór je prijzen vergelijkt.",
    description:
      "Een huurauto geeft vrijheid buiten je hotelzone, maar alleen wanneer rijbewijs, verzekering, borg, bagage en routes bij je passen. Deze gids helpt je eerst kiezen en daarna actueel vergelijken.",
    focusTitle: "Is een huurauto logisch voor jouw Phuket-reis?",
    focusCopy:
      "Een auto werkt vooral wanneer je meerdere gebieden bezoekt, met bagage reist of buiten de vaste transfercorridors wilt komen. Blijf je vooral in één strandplaats, dan kunnen transfers en lokaal vervoer rustiger uitpakken.",
    cta: "Vergelijk actuele huurauto's",
  },
  airport: {
    path: "/car-rental-phuket/airport/",
    eyebrow: "Van bagageband naar veilige overdracht",
    title: "Auto huren op Phuket Airport.",
    accent: "Controleer HKT vóór je landt.",
    subtitle: "Balie of meet-and-greet: je voucher vertelt waar je moet zijn.",
    description:
      "Niet iedere huurauto wordt op dezelfde plek overgedragen. Controleer terminal, ophaalinstructie, vluchtnummer, openingstijden en vertragingvoorwaarden voordat je vertrekt.",
    focusTitle: "Je boekingsvoucher is je routekaart op HKT",
    focusCopy:
      "Airports of Thailand bevestigt autoverhuur op Phuket Airport, maar merk, balie en openingstijd kunnen veranderen. Volg daarom de actuele voucher: die bepaalt of je naar een balie, parkeerplaats of ontmoetingspunt gaat.",
    cta: "Bekijk actuele HKT-opties",
  },
  "long-term": {
    path: "/car-rental-phuket/long-term/",
    eyebrow: "Een lage maandprijs is nog geen compleet contract",
    title: "Langer een auto huren op Phuket.",
    accent: "Lees verder dan het maandtarief.",
    subtitle: "Kilometers, onderhoud en vervanging bepalen de echte waarde.",
    description:
      "Bij een langere huur worden contractduur, betaalmomenten, kilometerlimiet, onderhoud, verzekering en een vervangende auto belangrijker dan het losse dagtarief.",
    focusTitle: "Vergelijk de totale contractperiode",
    focusCopy:
      "Controleer of het tarief echt voor jouw volledige periode geldt en wat er gebeurt bij onderhoud, schade, grensoverschrijding of eerder inleveren. Laat mondelinge afspraken in het contract of de voucher zetten.",
    cta: "Vergelijk langere huur actueel",
  },
  automatic: {
    path: "/car-rental-phuket/automatic/",
    eyebrow: "Reserveer een transmissie, niet alleen een categorie",
    title: "Een automaat huren op Phuket.",
    accent: "Bevestig wat er klaarstaat.",
    subtitle: "Het filter helpt zoeken; de voucher maakt de afspraak.",
    description:
      "Een automatische transmissie kan prettig zijn in druk verkeer en op hellingen. Controleer wel of de boeking een gegarandeerde automaat vermeldt en niet alleen een voorbeeldauto toont.",
    focusTitle:
      "‘Of vergelijkbaar’ gaat over de auto, niet vanzelf over de transmissie",
    focusCopy:
      "Kijk in de voertuigdetails en voucher naar automatic/AT. Controleer dit opnieuw bij overdracht voordat je tekent en wegrijdt; een modelafbeelding alleen is geen garantie.",
    cta: "Zoek actuele automaten",
  },
} as const;

const FAQ: Record<CarRentalOwner, { question: string; answer: string }[]> = {
  hub: [
    {
      question: "Heb je in Thailand een internationaal rijbewijs nodig?",
      answer:
        "Volgens NederlandWereldwijd is een Nederlands rijbewijs in Thailand alleen geldig samen met een geldig internationaal rijbewijs. Neem beide originele documenten mee en controleer daarnaast de voorwaarden van de verhuurder.",
    },
    {
      question: "Is een auto huren op Phuket verstandig?",
      answer:
        "Dat hangt af van je route, rijervaring en verblijfplaats. Thailand rijdt links en Phuket combineert druk verkeer met heuvelachtige wegen. Kies alleen zelf rijden als je je daar comfortabel bij voelt.",
    },
    {
      question: "Wat kost een huurauto op Phuket?",
      answer:
        "Er is geen vaste betrouwbare dagprijs. Reisdata, voertuigcategorie, verzekering, borg, bestuurder en ophaallocatie veranderen de totaalprijs. Vergelijk dezelfde voorwaarden en bekijk de actuele prijs bij de aanbieder.",
    },
    {
      question: "Heb je een creditcard nodig voor autohuur?",
      answer:
        "Dat verschilt per aanbieder en voertuig. Controleer vóór betalen welke betaalkaart op naam van de hoofdbestuurder nodig is en welk bedrag of limiet voor de borg beschikbaar moet zijn.",
    },
    {
      question: "Welke verzekering heb je nodig?",
      answer:
        "Lees wat basisdekking, eigen risico, banden, glas, onderzijde, dak en pechhulp precies omvatten. De productnaam alleen zegt te weinig; de polis- en huurvoorwaarden zijn leidend.",
    },
  ],
  airport: [
    {
      question: "Kun je op Phuket Airport een auto huren?",
      answer:
        "Ja. Airports of Thailand vermeldt autoverhuurdiensten op Phuket Airport. Controleer voor jouw reservering de actuele aanbieder, terminal, balie of ontmoetingsplek en openingstijd.",
    },
    {
      question: "Waar haal je een huurauto op HKT op?",
      answer:
        "Dat staat op je voucher. Sommige reserveringen gebruiken een luchthavenbalie, andere een meet-and-greet of parkeerplaats. Volg niet automatisch een oude online routebeschrijving.",
    },
    {
      question: "Wat als je vlucht vertraagd is?",
      answer:
        "Vul je vluchtnummer in en lees de no-show- en wachttijdvoorwaarden. Neem bij een grote vertraging rechtstreeks contact op via het nummer op de voucher; ga er niet vanuit dat iedere balie onbeperkt wacht.",
    },
    {
      question: "Kun je de auto buiten openingstijd ophalen?",
      answer:
        "Alleen wanneer dit expliciet in de boeking is bevestigd. Controleer mogelijke toeslag, instructie en contactwijze vóór vertrek en bewaar de bevestiging offline.",
    },
    {
      question: "Hoeveel tijd kost ophalen op Phuket Airport?",
      answer:
        "Dat wisselt met immigratie, bagage, wachtrij en overdrachtsvorm. Plan geen strakke vervolgafspraak en neem tijd voor document- en schadecontrole.",
    },
  ],
  "long-term": [
    {
      question: "Wat geldt als lange termijn autohuur op Phuket?",
      answer:
        "Aanbieders gebruiken verschillende perioden. Vul daarom je volledige data in en controleer of je een dag-, week- of maandproduct boekt en hoe verlengen of eerder inleveren wordt berekend.",
    },
    {
      question: "Is een maand huren altijd goedkoper?",
      answer:
        "Niet automatisch. Een lager periodetarief kan andere kilometer-, verzekerings-, onderhouds- of betaalvoorwaarden hebben. Vergelijk de totale contractkosten voor dezelfde dekking.",
    },
    {
      question: "Wie regelt onderhoud tijdens een langere huur?",
      answer:
        "Dat moet in de overeenkomst staan. Vraag wie betaalt, waar onderhoud plaatsvindt en of je een vervangende auto krijgt wanneer de huurauto niet beschikbaar is.",
    },
    {
      question: "Kun je een lang huurcontract eerder stoppen?",
      answer:
        "Dat hangt af van de annulerings- en herberekeningsvoorwaarden. Laat vóór betalen uitleggen of gebruikte dagen opnieuw tegen een ander tarief worden berekend.",
    },
    {
      question: "Heb je voor langere huur andere documenten nodig?",
      answer:
        "De vereisten verschillen per verhuurder en verblijfsduur. Controleer rijbewijs, internationaal rijbewijs, paspoort, betaalkaart, adres- en eventuele visumvereisten rechtstreeks bij de aanbieder.",
    },
  ],
  automatic: [
    {
      question: "Zijn automaten beschikbaar op Phuket?",
      answer:
        "Ja, zoekresultaten bieden automatische voertuigcategorieën. Beschikbaarheid verandert per datum en locatie; filter op automatic/AT en controleer de transmissie op de voucher.",
    },
    {
      question: "Hoe weet je zeker dat je een automaat krijgt?",
      answer:
        "Controleer dat automatic of AT als reserveringskenmerk staat vermeld. Een foto van een voorbeeldmodel of alleen ‘of vergelijkbaar’ is onvoldoende.",
    },
    {
      question: "Is een automaat handig op Phuket?",
      answer:
        "Veel reizigers vinden een automaat rustiger in langzaam verkeer en op hellingen. Je moet nog steeds comfortabel zijn met links rijden, scooters rondom de auto en lokale verkeerssituaties.",
    },
    {
      question: "Wat controleer je bij het ophalen?",
      answer:
        "Bevestig transmissie, brandstofniveau, bestaande schade, banden, verlichting, documenten en noodcontact. Maak vóór vertrek foto's of video volgens de voorwaarden van de verhuurder.",
    },
    {
      question: "Is een automaat duurder dan een handgeschakelde auto?",
      answer:
        "Dat verschilt per voorraad en datum. Vergelijk op dezelfde reisdata en met dezelfde categorie, dekking en borg; gebruik de actuele totaalprijs van de aanbieder.",
    },
  ],
};

export default function PhuketCarRentalGuideNl({
  owner,
  primaryUrl,
  secondaryUrl,
}: {
  owner: CarRentalOwner;
  primaryUrl: string;
  secondaryUrl: string;
}) {
  const c = CONFIG[owner];
  const primary = withSubId(primaryUrl, `phuket-car-${owner}-nl-discovercars`);
  const secondary = withSubId(secondaryUrl, `phuket-car-${owner}-nl-trip`);
  const canonical = `https://go2-thailand.com/nl${c.path}`;
  const faqs = FAQ[owner];
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
        title={`${c.title} Keuzehulp en actuele prijzen`}
        description={c.description}
      >
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="nl" href={canonical} />
        <link
          rel="alternate"
          hrefLang="en"
          href={`https://go2-thailand.com${c.path}`}
        />
        {schemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </SEOHead>
      <div className="bg-canvas text-charcoal">
        <EditorialHero
        image="/images/redesign/phuket-car-rental-coastal-road-v2.webp"
          imageAlt="Een huurauto op een tropische kustweg op Phuket"
          breadcrumbs={[
            { label: "Thailand", href: "/" },
            { label: "Phuket", href: "/city/phuket/" },
            { label: owner === "hub" ? "Auto huren" : c.title },
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
            {
              label: "Doe eerst de huurcheck",
              href: "#keuze",
              kind: "primary",
            },
            {
              label: "Bekijk actuele prijs",
              href: primary,
              kind: "secondary",
              newTab: true,
              affiliate: true,
            },
          ]}
          disclosure="De prijscheck is een affiliate-link. Wij kunnen commissie ontvangen zonder extra kosten voor jou. Beschikbaarheid, totaalprijs, borg, dekking en voorwaarden staan uitsluitend bij de aanbieder."
          titleClassName="max-w-[790px] text-[3.35rem] leading-[0.9] sm:text-[4.5rem] lg:text-[5.1rem]"
        />
        <PageSectionNav
          label="Op deze pagina"
          items={[
            { href: "#keuze", label: "Past een auto?", icon: Route },
            { href: "#documenten", label: "Documenten", icon: FileCheck2 },
            { href: "#boeken", label: "Boekingscheck", icon: ClipboardCheck },
            { href: "#ophalen", label: "Ophalen", icon: KeyRound },
            { href: "#vragen", label: "Vragen", icon: ShieldCheck },
          ]}
        />

        <section
          id="keuze"
          className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
        >
          <div className="container-custom grid gap-9 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="eyebrow">Begin bij je route</p>
              <h2 className="mt-3 font-display text-4xl leading-tight text-jade lg:text-5xl">
                {c.focusTitle}
              </h2>
              <p className="mt-5 leading-8 text-muted">{c.focusCopy}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                [
                  CheckCircle2,
                  "Wel logisch",
                  "Meerdere gebieden, bagage of uitstapjes buiten je hotelzone.",
                ],
                [
                  Route,
                  "Vergelijk alternatief",
                  "Transfers of lokaal vervoer kunnen rustiger zijn bij één vaste basis.",
                ],
                [
                  Gauge,
                  "Rijcomfort",
                  "Links verkeer, hellingen en veel scooters vragen ontspannen ervaring.",
                ],
                [
                  MapPin,
                  "Parkeren",
                  "Controleer vooraf parkeren bij je hotel en belangrijkste stops.",
                ],
              ].map(([Icon, title, copy], i) => {
                const I = Icon as typeof Car;
                return (
                  <article
                    key={String(title)}
                    className={`rounded-[1.25rem] border border-jade/10 p-5 ${i === 0 ? "bg-jade text-ivory" : "bg-white"}`}
                  >
                    <I
                      size={23}
                      className={i === 0 ? "text-saffron" : "text-jade"}
                    />
                    <h3 className="mt-4 font-display text-2xl">
                      {String(title)}
                    </h3>
                    <p
                      className={`mt-2 text-sm leading-6 ${i === 0 ? "text-ivory/75" : "text-muted"}`}
                    >
                      {String(copy)}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="documenten"
          className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
        >
          <div className="container-custom">
            <SectionHeading
              eyebrow="Geen document, geen veilige start"
              title={
                <>
                  Vier controles.
                  <br />
                  Nog vóór je reserveert.
                </>
              }
              description="De voorwaarden van je exacte aanbieder blijven leidend naast de officiële rijbewijsregels."
            />
            <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                [
                  FileCheck2,
                  "Twee rijbewijzen",
                  "Neem je geldige Nederlandse én geldige internationale rijbewijs origineel mee.",
                ],
                [
                  CreditCard,
                  "Betaalkaart en borg",
                  "Controleer kaarttype, naam hoofdbestuurder en benodigde bestedingsruimte.",
                ],
                [
                  ShieldCheck,
                  "Dekking en eigen risico",
                  "Lees uitsluitingen voor glas, banden, dak, onderzijde, sleutel en pech.",
                ],
                [
                  BadgeCheck,
                  "Extra bestuurder",
                  "Registreer iedere bestuurder en controleer leeftijds- of ervaringsvoorwaarden.",
                ],
              ].map(([Icon, title, copy]) => {
                const I = Icon as typeof Car;
                return (
                  <article
                    key={String(title)}
                    className="rounded-[1.25rem] border border-jade/10 bg-white p-6"
                  >
                    <I className="text-saffron" />
                    <h3 className="mt-5 font-display text-2xl text-jade">
                      {String(title)}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted">
                      {String(copy)}
                    </p>
                  </article>
                );
              })}
            </div>
            <div className="mt-7 rounded-xl border border-saffron/25 bg-saffron/8 p-5 text-sm leading-7 text-jade">
              <strong>Officiële basis:</strong> NederlandWereldwijd vermeldt dat
              je Nederlandse rijbewijs in Thailand alleen geldig is in
              combinatie met een geldig internationaal rijbewijs. Een verhuurder
              die minder vraagt, verandert de verkeersregel niet.
            </div>
          </div>
        </section>

        <section
          id="boeken"
          className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
        >
          <div className="container-custom grid gap-9 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <SectionHeading
                eyebrow="Vergelijk appels met appels"
                title="De totaalprijs zit in de voorwaarden"
                description="Zet dezelfde reisdata, bestuurders, categorie, transmissie en dekking naast elkaar."
              />
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  "Ophaal- en inlevertijd",
                  "Kilometerlimiet",
                  "Brandstofbeleid",
                  "Borg en betaalkaart",
                  "Eigen risico en uitsluitingen",
                  "Annuleren of wijzigen",
                  "Grens- en eilandbeperkingen",
                  "Pechhulp en vervanging",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-jade/10 bg-white p-4 text-sm font-semibold text-jade"
                  >
                    <CheckCircle2 size={18} className="text-saffron" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <aside className="rounded-[1.5rem] bg-jade p-7 text-ivory lg:p-9">
              <Car className="text-saffron" />
              <h3 className="mt-5 font-display text-3xl">{c.cta}</h3>
              <p className="mt-3 leading-7 text-ivory/75">
                Gebruik je exacte data. Controleer daarna op de betaalpagina
                opnieuw totaalprijs, borg, kaart, dekking en locatie.
              </p>
              <div className="mt-6 grid gap-3">
                <a
                  href={primary}
                  target="_blank"
                  rel="noopener noreferrer nofollow sponsored"
                  className="flex items-center justify-between rounded-lg bg-white px-5 py-3 text-sm font-bold text-jade"
                >
                  Actuele prijs bij Discover Cars{" "}
                  <ExternalLink size={16} className="text-saffron" />
                </a>
                <a
                  href={secondary}
                  target="_blank"
                  rel="noopener noreferrer nofollow sponsored"
                  className="flex items-center justify-between rounded-lg border border-white/25 px-5 py-3 text-sm font-bold"
                >
                  Vergelijk ook bij Trip.com{" "}
                  <ExternalLink size={16} className="text-saffron" />
                </a>
              </div>
            </aside>
            <AffiliateDisclosure
              className="lg:col-span-2"
              text="Beide prijschecks zijn affiliate-links via onze centrale Travelpayouts-configuratie. Een commissie verandert jouw prijs niet. We rangschikken geen verhuurder op commissie en publiceren geen vaste prijs als actuele aanbieding."
            />
          </div>
        </section>

        <section
          id="ophalen"
          className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
        >
          <div className="container-custom">
            <SectionHeading
              eyebrow="Sleutel nog niet omdraaien"
              title="Doe de overdracht terwijl de medewerker erbij is"
              description="Leg de staat vast en laat afwijkingen op het formulier of in de app bevestigen."
            />
            <div className="mt-9 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-[1.5rem] border border-jade/10 bg-white p-6 lg:p-8">
                <ol className="grid gap-5 sm:grid-cols-2">
                  {[
                    "Controleer naam, kenteken en voertuigcategorie",
                    "Film carrosserie, ruiten, wielen, dak en interieur",
                    "Test verlichting, airco, ruitenwissers en remmen",
                    "Noteer brandstof- of laadniveau en kilometerstand",
                    "Vind registratie, verzekeringsinformatie en noodnummer",
                    "Spreek retourplek, tijd en sleutelprocedure af",
                  ].map((item, i) => (
                    <li key={item} className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-saffron text-xs font-bold text-jade">
                        {i + 1}
                      </span>
                      <span className="pt-1 text-sm font-semibold leading-6 text-jade">
                        {item}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="rounded-[1.5rem] bg-sand p-6 lg:p-8">
                <PlaneLanding className="text-saffron" />
                <h3 className="mt-5 font-display text-3xl text-jade">
                  Ophalen op HKT?
                </h3>
                <p className="mt-3 leading-7 text-muted">
                  Lees je actuele voucher. AOT bevestigt verhuur op de
                  luchthaven, maar je reservering bepaalt de echte balie,
                  terminal of ontmoetingsplek.
                </p>
                {owner !== "airport" && (
                  <Link
                    href="/car-rental-phuket/airport/"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-jade"
                  >
                    Bekijk de Phuket Airport-gids{" "}
                    <ArrowRight size={16} className="text-saffron" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        <FaqSplitSection
          id="vragen"
          eyebrow="Voor je reserveert"
          title={`${c.title} Veelgestelde vragen`}
          items={faqs}
        />
        <section className="section-divider-top py-14">
          <div className="container-custom">
            <div className="rounded-[1.5rem] bg-jade p-7 text-ivory lg:flex lg:items-center lg:justify-between lg:p-9">
              <div>
                <p className="eyebrow text-saffron">
                  Vergelijk de andere huurkeuze
                </p>
                <h2 className="mt-2 font-display text-3xl">
                  Van algemene keuze tot specifieke voucher
                </h2>
              </div>
              <div className="mt-6 flex flex-wrap gap-3 lg:mt-0">
                {Object.entries(CONFIG)
                  .filter(([key]) => key !== owner)
                  .map(([key, item]) => (
                    <Link
                      key={key}
                      href={item.path}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/15"
                    >
                      {key === "hub"
                        ? "Auto huren op Phuket"
                        : key === "airport"
                          ? "Ophalen op HKT"
                          : key === "long-term"
                            ? "Langere huur"
                            : "Automaat kiezen"}
                      <ArrowRight size={15} className="text-saffron" />
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </section>
        <SourceMethodSection
          title="Bronnen en actualiteit"
          description="We houden officiële rijbewijs- en luchthaveninformatie gescheiden van veranderlijke commerciële voorwaarden."
          sources={[
            {
              label: "NederlandWereldwijd — reisadvies Thailand en rijbewijs",
              href: "https://www.nederlandwereldwijd.nl/reisadvies/thailand",
            },
            {
              label: "Airports of Thailand — autoverhuur Phuket Airport",
              href: "https://phuket.airportthai.co.th/service/way-to-airport/detail/126",
            },
            {
              label:
                "Thai Department of Land Transport — erkende internationale rijbewijzen",
              href: "https://fvp.dlt.go.th/Manual2",
            },
          ]}
          method="Vier Nederlandse SERP's zijn zichtbaar gecontroleerd. DataForSEO leverde tijdelijk geen bruikbaar rapport. Vaste prijzen, borgbedragen, boetes, openingstijden en vlootclaims zijn daarom niet als evergreen feiten overgenomen; de aanbieder blijft bron voor de actuele boeking."
        />
      </div>
    </>
  );
}
