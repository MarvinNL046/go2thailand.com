import Image from "next/image";
import {
  CheckCircle2,
  ClipboardCheck,
  CloudRain,
  Compass,
  ExternalLink,
  Eye,
  GraduationCap,
  Hotel,
  LifeBuoy,
  ShieldCheck,
  Sun,
  Users,
  Waves,
  Wind,
} from "lucide-react";
import SEOHead from "../SEOHead";
import { AffiliateDisclosure } from "../design/AffiliateDisclosure";
import { EditorialHero } from "../design/EditorialHero";
import { FaqSplitSection } from "../design/FaqSplitSection";
import {
  PageSectionNav,
  type PageSectionNavItem,
} from "../design/PageSectionNav";
import { RelatedGuidesSection } from "../design/RelatedGuidesSection";
import { SectionHeading } from "../design/SectionHeading";
import { SourceMethodSection } from "../design/SourceMethodSection";

const HERO = "/images/redesign/kata-surfing-hero-v2.webp";
const PAGE_URL = "https://go2-thailand.com/nl/phuket/kata/surfing/";

interface Props {
  lessonHref: string;
  alternativeLessonHref: string;
  hotelHref: string;
}

const navItems: PageSectionNavItem[] = [
  { href: "#fit", label: "Jouw niveau", icon: Compass },
  { href: "#conditions", label: "Condities", icon: Wind },
  { href: "#lessons", label: "Lessen", icon: GraduationCap },
  { href: "#safety", label: "Veiligheid", icon: LifeBuoy },
  { href: "#plan", label: "Plan het", icon: ClipboardCheck },
  { href: "#questions", label: "Vragen", icon: CheckCircle2 },
];

const fitCards = [
  {
    eyebrow: "Beste eerste stap",
    title: "Eerste surfles",
    copy: "Start met een instructeur en beginnersboard. Laat de school voor die sessie een passende leszone kiezen in plaats van een plek uit een oude gids.",
    icon: GraduationCap,
  },
  {
    eyebrow: "Condities beslissen",
    title: "Beginnende surfer",
    copy: "Vraag waar de les plaatsvindt, hoe niveaus worden gescheiden en of de zee nog past bij jouw peddel- en boardcontrole.",
    icon: Waves,
  },
  {
    eyebrow: "Neem eigen oordeel mee",
    title: "Zelfstandig surfen",
    copy: "Controleer actuele verwachting, vlaggen, lokaal advies, drukte en instap voordat je uitpeddelt. Dezelfde baai verandert per uur.",
    icon: Wind,
  },
  {
    eyebrow: "Ook een goede stranddag",
    title: "Kijker of gezin",
    copy: "Kies een aanbieder met helder ontmoetingspunt en toezicht. Houd zwem- en surfzones uit elkaar en volg strandwachten.",
    icon: Eye,
    dark: true,
  },
];

const conditionRows = [
  {
    period: "dec–apr",
    pattern:
      "De drogere reisperiode hangt vaak samen met rustigere Andamancondities.",
    meaning:
      "Boek geen reis met de aanname dat er oceaansurf is. Controleer aanbod en verwachting actueel.",
    cue: "Eerst een strandreis",
  },
  {
    period: "mei–jun",
    pattern:
      "Moessonpatronen kunnen surfbare dagen brengen naast regen en snel wisselende zee.",
    meaning:
      "Een les kan mogelijk zijn, maar geschiktheid hangt af van dag, niveau en operatorbesluit.",
    cue: "Begin flexibel",
    highlight: true,
  },
  {
    period: "jul–sep",
    pattern:
      "Dit wordt vaak als de kern van Phukets surfperiode behandeld, met actievere zee.",
    meaning:
      "Meer golfkans is ook meer reden om vlaggen, stroming en instructeursoordeel te respecteren.",
    cue: "Venster, geen belofte",
    highlight: true,
  },
  {
    period: "okt–nov",
    pattern:
      "Overgangscondities variëren wanneer het moessonpatroon verandert.",
    meaning:
      "Houd een land- of zwembadplan klaar en bevestig de les dicht op de datum.",
    cue: "Controleer opnieuw",
  },
];

const lessonChecks = [
  [
    "Niveau & zwemvertrouwen",
    "Vertel je echte surfervaring en watervertrouwen; vraag hoe niveaus worden gescheiden.",
  ],
  [
    "Opzet met instructeur",
    "Controleer privé of groep, groepsgrootte en hoeveel begeleiding in het water is inbegrepen.",
  ],
  [
    "Materiaal",
    "Bevestig boardtype, leash, rashguard en overige uitrusting plus hoe maat en board worden gekozen.",
  ],
  [
    "Ontmoetingspunt",
    "Controleer exacte strandlocatie, aankomsttijd en of vervoer inbegrepen of apart is.",
  ],
  [
    "Weersbeleid",
    "Vraag wie annuleert bij onveilige condities en of omboeken, tegoed of terugbetaling volgt.",
  ],
  [
    "Verzekering & uitsluitingen",
    "Lees dekking, medische of leeftijdsbeperkingen en deelnemerseisen.",
  ],
  [
    "Huurvoorwaarden",
    "Bevestig identificatie, schadevoorwaarden, retourmoment en geschiktheid van het board.",
  ],
];

const faqs = [
  {
    question: "Kun je surfen bij Kata Beach?",
    answer:
      "Ja, Kata heeft een seizoensgebonden surfscene. Of een sessie op jouw dag doorgaat hangt af van actuele golven, weer, vlaggen en het oordeel van de aanbieder.",
  },
  {
    question: "Waar kun je het beste surfen op Phuket?",
    answer:
      "Kata is voor veel bezoekers de praktischste eerste vergelijking omdat er in het seizoen lessen en verhuur zijn. ‘Beste’ hangt nog steeds af van niveau en de condities van die dag.",
  },
  {
    question: "Is Kata Beach geschikt voor beginnende surfers?",
    answer:
      "Dat kan op een passende dag met instructeur, geschikt materiaal en een gekozen leszone. Beginnersvriendelijk betekent niet veilig onder iedere conditie; volg vlaggen en professioneel lokaal advies.",
  },
  {
    question: "Wanneer is het surfseizoen op Phuket?",
    answer:
      "Surfbronnen koppelen Phuket breed aan de zuidwestmoessonperiode, ongeveer vanaf mei richting oktober. Gebruik dit als planningsvenster, niet als golf- of lesgarantie.",
  },
  {
    question: "Kun je leren surfen op Phuket?",
    answer:
      "Ja. Aanbieders rond Kata tonen privé- en groepslessen en boardverhuur. Vergelijk actueel lesformat, begeleiding, materiaal, verzekering en annulering.",
  },
  {
    question: "Is surfen bij Kata Beach veilig?",
    answer:
      "Geen strand is automatisch veilig. Condities, stroming, vermogen, materiaal en toezicht tellen. Ga niet het water in bij een rode vlag en vraag strandwacht of gekwalificeerde instructeur bij twijfel.",
  },
  {
    question: "Kun je een surfboard huren bij Kata Beach?",
    answer:
      "Seizoensaanbieders adverteren verhuur, maar voorraad, opening en voorwaarden wijzigen. Bevestig boardtype, leash, schadevoorwaarden, identificatie en retour rechtstreeks.",
  },
  {
    question: "Is Kata leuk voor niet-surfers tijdens de surfperiode?",
    answer:
      "Ja, maar zwemmers moeten uit actieve surfzones blijven en vlaggen volgen. Houd cafés, uitzichtpunten, zwembad of landactiviteiten achter de hand als de zee ongeschikt is.",
  },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Surfen bij Kata Beach: lessen, seizoen en veiligheid",
    description:
      "Plan surfen bij Kata Beach op niveau en actuele condities. Vergelijk lessen, materiaal, veiligheid, huidige aanbieders en hotels.",
    url: PAGE_URL,
    image: `https://go2-thailand.com${HERO}`,
    inLanguage: "nl-NL",
    dateModified: "2026-07-31",
    author: { "@type": "Organization", name: "Go2Thailand" },
    publisher: { "@type": "Organization", name: "Go2Thailand" },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Thailand",
        item: "https://go2-thailand.com/nl/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Phuket",
        item: "https://go2-thailand.com/nl/city/phuket/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Kata Beach",
        item: "https://go2-thailand.com/nl/phuket/kata/",
      },
      { "@type": "ListItem", position: 4, name: "Surfen", item: PAGE_URL },
    ],
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
];

export function KataSurfingGuideNl({
  lessonHref,
  alternativeLessonHref,
  hotelHref,
}: Props) {
  return (
    <div className="bg-canvas" data-premium-template="kata-surfing-nl">
      <SEOHead
        title="Surfen bij Kata Beach: lessen, seizoen en veiligheid"
        description="Plan surfen bij Kata Beach op niveau en actuele condities. Vergelijk lessen, materiaal, veiligheid, huidige aanbieders en hotels."
        ogImage={`https://go2-thailand.com${HERO}`}
      >
        {schemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </SEOHead>

      <EditorialHero
        image={HERO}
        imageAlt="Surfinstructeur die een beginner helpt in kleine golven bij een tropisch strand op Phuket"
        breadcrumbs={[
          { label: "Thailand", href: "/" },
          { label: "Phuket", href: "/city/phuket/" },
          { label: "Kata Beach", href: "/phuket/kata/" },
          { label: "Surfen" },
        ]}
        eyebrow="Surfen op Phuket, gepland op condities"
        title={
          <>
            Surfen bij Kata.
            <br />
            <span className="text-saffron-dark">
              Laat de zee de sessie kiezen.
            </span>
          </>
        }
        subtitle="Een beginnersplan blijft een actuele beslissing."
        description="Kata is de nuttigste plek op Phuket om seizoenslessen te vergelijken, maar een maand belooft geen golven — en geen veiligheid. Begin bij je niveau, controleer de echte condities en kies daarna les, huur of een alternatief strandplan."
        actions={[
          { label: "Vind jouw surfplan", href: "#fit", kind: "primary" },
          {
            label: "Bekijk actuele lessen",
            href: lessonHref,
            kind: "secondary",
            newTab: true,
            affiliate: true,
          },
        ]}
        disclosure="De leslink is gesponsord. Wij kunnen zonder extra kosten voor jou commissie ontvangen. Controleer aanbieder, ontmoetingspunt, inclusies, weersbeleid, totaal en annulering actueel."
        minHeightClassName="min-h-[760px] lg:min-h-[700px]"
        contentClassName="max-w-[720px]"
        titleClassName="max-w-[760px] text-[3.85rem] leading-[0.86] sm:text-[5rem] lg:text-[5.7rem]"
        imageClassName="object-cover object-[64%_center] lg:object-center"
      />
      <PageSectionNav label="In deze surfgids over Kata" items={navItems} />

      <section
        id="fit"
        className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
      >
        <div className="container-custom grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <SectionHeading
              eyebrow="Kies op niveau"
              title={
                <>
                  Jouw niveau verandert
                  <br />
                  het juiste antwoord.
                </>
              }
              description="Een eerste les en zelfstandig uitpeddelen zijn andere beslissingen. Wees eerlijk over zwemmen, peddelen, boardcontrole en vertrouwen in bewegend water."
            />
            <svg
              aria-hidden="true"
              viewBox="0 0 360 120"
              className="mt-8 hidden h-28 w-full max-w-sm text-saffron lg:block"
            >
              <path
                d="M8 84 C70 118 96 26 154 65 S254 104 342 22"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="3 8"
                strokeLinecap="round"
              />
              <circle cx="8" cy="84" r="5" fill="currentColor" />
              <circle cx="154" cy="65" r="4" fill="currentColor" />
              <path
                d="M342 12c-8 0-14 6-14 14 0 11 14 24 14 24s14-13 14-24c0-8-6-14-14-14Zm0 19a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-jade/10 bg-jade/10 sm:grid-cols-2">
              {fitCards.map(
                ({ eyebrow, title, copy, icon: Icon, dark }, index) => (
                  <article
                    key={title}
                    className={`min-h-[245px] p-7 ${dark ? "bg-jade text-white" : index % 2 ? "bg-tonal" : "bg-white"}`}
                  >
                    <Icon
                      size={25}
                      className={dark ? "text-saffron-light" : "text-jade"}
                    />
                    <p
                      className={`mt-6 text-[9px] font-extrabold uppercase tracking-[.15em] ${dark ? "text-saffron-light" : "text-saffron-dark"}`}
                    >
                      {eyebrow}
                    </p>
                    <h2
                      className={`mt-2 font-display text-[1.65rem] font-semibold leading-none ${dark ? "text-white" : "text-jade"}`}
                    >
                      {title}
                    </h2>
                    <p
                      className={`mt-4 text-xs font-medium leading-6 ${dark ? "text-white/66" : "text-charcoal/64"}`}
                    >
                      {copy}
                    </p>
                  </article>
                ),
              )}
            </div>
            <p className="mt-5 rounded-xl border border-saffron/25 bg-saffron-pale px-5 py-4 text-xs font-extrabold leading-6 text-jade">
              Redactionele regel: geen vaste golfhoogte, schooltelling,
              huurprijs of ‘veilige plek’ overleeft de actuele-conditiecheck.
            </p>
          </div>
        </div>
      </section>

      <section
        id="conditions"
        className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20"
      >
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <SectionHeading
              eyebrow="Seizoen is context"
              title={
                <>
                  Plan een venster.
                  <br />
                  Controleer de dag.
                </>
              }
            />
            <p className="max-w-[760px] text-sm font-medium leading-7 text-charcoal/64">
              De zuidwestmoesson verklaart waarom surfinteresse in nattere
              maanden stijgt. Hij vertelt niet of jouw ochtend past bij een
              eerste les, zelfstandig uitpeddelen of zwemmen.
            </p>
          </div>
          <div className="mt-10 overflow-hidden rounded-2xl border border-jade/10 bg-jade/10">
            <div className="hidden grid-cols-[.55fr_1.15fr_1.35fr_.75fr] bg-jade px-6 py-4 text-[9px] font-extrabold uppercase tracking-[.14em] text-white md:grid">
              <span>Venster</span>
              <span>Breed patroon</span>
              <span>Betekenis</span>
              <span>Signaal</span>
            </div>
            {conditionRows.map((row) => (
              <article
                key={row.period}
                className={`grid gap-3 border-b border-jade/10 p-6 last:border-0 md:grid-cols-[.55fr_1.15fr_1.35fr_.75fr] ${row.highlight ? "bg-saffron-pale" : "bg-white"}`}
              >
                <h3 className="font-display text-[1.35rem] font-semibold text-jade">
                  {row.period}
                </h3>
                <p className="text-xs font-medium leading-5 text-charcoal/64">
                  {row.pattern}
                </p>
                <p className="text-xs font-medium leading-5 text-charcoal/64">
                  {row.meaning}
                </p>
                <p className="text-[10px] font-extrabold uppercase tracking-[.1em] text-saffron-dark">
                  {row.cue}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: CloudRain,
                title: "Weersverwachting",
                copy: "Gebruik TMD voor weercontext en vraag de operator daarna naar de echte lescondities.",
              },
              {
                icon: Waves,
                title: "Strandvlaggen",
                copy: "Een rode vlag overrulet de boeking. Ga niet het water in omdat de kalender ‘surfseizoen’ zegt.",
              },
              {
                icon: Users,
                title: "Lokaal oordeel",
                copy: "Strandwachten en instructeurs lezen de zee vóór je; een evergreen artikel kan dat niet.",
              },
            ].map(({ icon: Icon, title, copy }) => (
              <article
                key={title}
                className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"
              >
                <Icon size={24} className="text-jade" />
                <h3 className="mt-5 font-display text-[1.55rem] font-semibold text-jade">
                  {title}
                </h3>
                <p className="mt-3 text-xs font-medium leading-6 text-charcoal/64">
                  {copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="lessons"
        className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
      >
        <div className="container-custom grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
          <SectionHeading
            eyebrow="Vergelijk de les, niet de lokprijs"
            title={
              <>
                Zeven checks voordat
                <br />
                je boekt.
              </>
            }
            description="Lesformaten en condities verschillen. Gebruik de actuele listing én rechtstreekse bevestiging voor alles wat jouw sessie beïnvloedt."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {lessonChecks.map(([title, copy], index) => (
              <article
                key={title}
                className={`rounded-2xl border p-6 ${index === 0 ? "border-saffron/25 bg-saffron-pale" : "border-jade/10 bg-white shadow-editorial-card"}`}
              >
                <p className="text-[9px] font-extrabold uppercase tracking-[.15em] text-saffron-dark">
                  Check {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-[1.5rem] font-semibold text-jade">
                  {title}
                </h3>
                <p className="mt-3 text-xs font-medium leading-6 text-charcoal/64">
                  {copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="safety"
        className="section-divider-bottom scroll-mt-24 bg-jade py-14 text-white lg:py-20"
      >
        <div className="container-custom grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <p className="eyebrow !text-saffron-light">
              Surfen en zwemmen zijn andere plannen
            </p>
            <h2 className="font-display text-[3.2rem] font-semibold leading-[.9] tracking-[-.035em]">
              Een surfbare zee
              <br />
              is niet automatisch zwemveilig.
            </h2>
            <p className="mt-6 text-sm font-medium leading-7 text-white/66">
              Moessoncondities kunnen golven en sterkere stroming brengen. Houd
              beginners bij een passende instructeur, zwemmers buiten surfzones
              en kinderen onder actief toezicht.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: "Lees de vlaggen",
                copy: "Ga nooit het water in bij rood. Volg strandwachten ook wanneer anderen wel in zee zijn.",
              },
              {
                icon: LifeBuoy,
                title: "Blijf binnen je niveau",
                copy: "Les, foamboard of zandbodem nemen stromings-, botsings- en vermoeidheidsrisico niet weg.",
              },
              {
                icon: Sun,
                title: "Bescherm je energie",
                copy: "Drink genoeg, bescherm tegen zon en stop bij vermoeidheid.",
              },
            ].map(({ icon: Icon, title, copy }) => (
              <article
                key={title}
                className="rounded-2xl border border-white/13 bg-white/[.065] p-6"
              >
                <Icon size={25} className="text-saffron-light" />
                <h3 className="mt-6 font-display text-[1.55rem] font-semibold">
                  {title}
                </h3>
                <p className="mt-4 text-xs font-medium leading-6 text-white/64">
                  {copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="plan"
        className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
      >
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <SectionHeading
              eyebrow="Bouw een weersbestendige dag"
              title={
                <>
                  Plan A: surfen.
                  <br />
                  Plan B: nog steeds Phuket.
                </>
              }
            />
            <p className="text-sm font-medium leading-7 text-charcoal/64">
              Boek pas na het lezen van actuele voorwaarden, houd ruimte voor
              weersverandering en dwing de zee niet in een vooruitbetaalde
              planning.
            </p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
            <article className="overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card">
              <div className="relative h-72">
                <Image
                  src={HERO}
                  alt="Surfinstructeur die een beginner aan de waterlijn helpt"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-[67%_center]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-jade/80 via-transparent to-transparent" />
                <h3 className="absolute bottom-6 left-6 max-w-sm font-display text-[2.2rem] font-semibold leading-none text-white">
                  De conditie is het eerste boekingsfilter.
                </h3>
              </div>
              <div className="grid gap-4 p-6 sm:grid-cols-3">
                {[
                  "Controleer aanbieder",
                  "Bekijk het weer opnieuw",
                  "Accepteer het veilige besluit",
                ].map((step, index) => (
                  <div key={step}>
                    <p className="text-[9px] font-extrabold uppercase tracking-[.15em] text-saffron-dark">
                      Stap {index + 1}
                    </p>
                    <p className="mt-2 text-xs font-extrabold text-jade">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </article>
            <div className="grid gap-4">
              <a
                href={lessonHref}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="flex flex-col rounded-2xl bg-jade p-7 text-white"
              >
                <GraduationCap className="text-saffron-light" />
                <h3 className="mt-6 font-display text-[1.7rem] font-semibold">
                  Surfopties via Klook
                </h3>
                <p className="mt-3 text-xs font-medium leading-6 text-white/64">
                  Controleer les, datum, punt, inclusies, operator en
                  annulering.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-saffron-light">
                  Bekijk actuele prijs en beschikbaarheid{" "}
                  <ExternalLink size={13} />
                </span>
              </a>
              <a
                href={alternativeLessonHref}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="flex flex-col rounded-2xl border border-jade/10 bg-tonal p-7"
              >
                <Waves className="text-jade" />
                <h3 className="mt-6 font-display text-[1.7rem] font-semibold text-jade">
                  Vergelijk een andere aanbieder
                </h3>
                <p className="mt-3 text-xs font-medium leading-6 text-charcoal/64">
                  Vergelijk actueel format en voorwaarden, niet een oude
                  lokprijs.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-saffron-dark">
                  Vergelijk actuele opties <ExternalLink size={13} />
                </span>
              </a>
              <a
                href={hotelHref}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="flex flex-col rounded-2xl border border-jade/10 bg-white p-7 shadow-editorial-card"
              >
                <Hotel className="text-jade" />
                <h3 className="mt-6 font-display text-[1.7rem] font-semibold text-jade">
                  Verblijf bij Kata
                </h3>
                <p className="mt-3 text-xs font-medium leading-6 text-charcoal/64">
                  Vergelijk kaartpin, toegang, kamer, voorwaarden en totaal.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-saffron-dark">
                  Bekijk actuele hotelprijzen <ExternalLink size={13} />
                </span>
              </a>
            </div>
          </div>
          <AffiliateDisclosure className="mt-4">
            Providerlinks zijn gesponsord. Wij kunnen commissie ontvangen zonder
            jouw prijs te verhogen. Wij bepalen beschikbaarheid, prijs,
            condities of annulering niet.
          </AffiliateDisclosure>
        </div>
      </section>

      <FaqSplitSection
        id="questions"
        eyebrow="Echte zoekvragen"
        title="Vragen over surfen bij Kata Beach"
        description="Zes actuele Nederlandse SERPs leverden 30 echte PAA-vermeldingen. Antwoorden scheiden brede seizoenscontext van de beslissing op het strand."
        items={faqs}
      />
      <RelatedGuidesSection
        eyebrow="Verder plannen"
        title="Bouw de rest van je verblijf in Kata"
        readLabel="Open de gids"
        guides={[
          {
            title: "Kata gebiedsgids",
            description:
              "Bepaal of Kata ook buiten de surfles bij je Phuket-reis past.",
            href: "/phuket/kata/",
            image: "/images/redesign/kata-area-hero-v2.webp",
            imageAlt: "Kata Beach en de groene landtong",
          },
          {
            title: "Kata Noi",
            description:
              "Vergelijk de kleinere buurbaai en het rustigere verblijfsritme.",
            href: "/phuket/kata/kata-noi/",
            image: "/images/redesign/kata-noi-area-hero-v2.webp",
            imageAlt: "Kata Noi Beach op Phuket",
          },
          {
            title: "Hotels in Kata",
            description: "Ga van gebiedskeuze naar een actuele hotelshortlist.",
            href: "/phuket/kata/hotels/",
            image: "/images/redesign/phuket-hotels-hero.webp",
            imageAlt: "Resort- en hotelomgeving op Phuket",
          },
        ]}
      />
      <SourceMethodSection
        eyebrow="Bronnen & methode"
        title="Onderzocht voor de beslissing — niet voor de belofte"
        description="Bijgewerkt op 31 juli 2026 na rankings- en backlinkchecks, twee smalle DFS-clusters met 3 records, zes Nederlandse SERPs met 56 organische resultaten en 30 PAA-vermeldingen, zichtbare Google-NL-controle en operator- plus primaire veiligheidsbronnen. Vaste prijzen, schoolaantallen, golfhoogtes, openingsdata, lesresultaten, reistijden en veiligheidsgaranties zijn verwijderd."
        sources={[
          {
            title: "Weer in Phuket",
            creator: "Thai Meteorological Department",
            url: "https://www.tmd.go.th/weather/province/phuket",
            note: "Primaire actuele weercontext.",
          },
          {
            title: "Phuket",
            creator: "Tourism Authority of Thailand",
            url: "https://www.tourismthailand.org/Destinations/Provinces/phuket/350",
            note: "Officiële bestemmings- en vlaggencontext.",
          },
          {
            title: "Reisadvies Thailand",
            creator: "NederlandWereldwijd",
            url: "https://www.nederlandwereldwijd.nl/reisadvies/thailand",
            note: "Actueel Nederlands veiligheidskader.",
          },
          {
            title: "Lessen en verhuur bij Kata",
            creator: "Kata Surf Limited",
            url: "https://www.katasurflimited.com/",
            note: "Direct bewijs dat lessen en verhuur worden aangeboden; voorwaarden actueel bevestigen.",
          },
        ]}
      />
    </div>
  );
}
