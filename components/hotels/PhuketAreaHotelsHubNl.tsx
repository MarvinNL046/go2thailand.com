import {
  ArrowRight,
  BedDouble,
  Building2,
  CalendarCheck2,
  CheckCircle2,
  Compass,
  ExternalLink,
  MapPin,
  MoonStar,
  Route,
  ShieldCheck,
  Sparkles,
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

export type PhuketHotelArea =
  | "patong"
  | "karon"
  | "kata"
  | "kamala"
  | "bang-tao"
  | "nai-harn";

type AreaConfig = {
  name: string;
  path: string;
  eyebrow: string;
  title: string;
  accent: string;
  subtitle: string;
  description: string;
  image: string;
  alt: string;
  fit: string;
  tradeoff: string;
  zones: { title: string; copy: string }[];
  checks: string[];
  faqs: { question: string; answer: string }[];
};

const HOTEL_PROFILES: Partial<Record<PhuketHotelArea, { slug: string; name: string }[]>> = {
  patong: [
    ["grand-mercure-phuket-patong", "Grand Mercure Phuket Patong"], ["four-points-by-sheraton-phuket-patong-beach-resort", "Four Points by Sheraton Phuket Patong Beach Resort"], ["hotel-indigo-phuket-patong", "Hotel Indigo Phuket Patong"], ["hotel-clover-patong-phuket", "Hotel Clover Patong Phuket"], ["movenpick-myth-hotel-patong-phuket", "Mövenpick Myth Hotel Patong Phuket"], ["lub-d-phuket-patong", "Lub D Phuket Patong"], ["la-flora-resort-patong", "La Flora Resort Patong"], ["7q-patong-beach-hotel", "7Q Patong Beach Hotel"], ["holiday-inn-express-phuket-patong-beach-central", "Holiday Inn Express Phuket Patong Beach Central"], ["andaman-embrace-patong", "Andaman Embrace Patong"], ["best-western-patong-beach", "Best Western Patong Beach"], ["mt-hotel-patong", "MT Hotel Patong"], ["ramada-by-wyndham-phuket-deevana-patong", "Ramada by Wyndham Phuket Deevana Patong"], ["patong-signature-boutique-hotel", "Patong Signature Boutique Hotel"], ["deevana-patong-resort-and-spa", "Deevana Patong Resort & Spa"], ["deevana-plaza-phuket-patong", "Deevana Plaza Phuket Patong"], ["icheck-inn-residences-patong", "iCheck inn Residences Patong"], ["woovo-phuket-patong", "Woovo Phuket Patong"],
  ].map(([slug, name]) => ({ slug, name })),
  karon: [
    ["pullman-phuket-arcadia-karon-beach-resort", "Pullman Phuket Arcadia Karon Beach Resort"], ["centara-grand-beach-resort-phuket", "Centara Grand Beach Resort Phuket"], ["mandarava-resort-and-spa-karon-beach", "Mandarava Resort and Spa Karon Beach"], ["beyond-resort-karon", "Beyond Resort Karon"], ["avista-grande-karon-mgallery", "Avista Grande Phuket Karon — MGallery"],
  ].map(([slug, name]) => ({ slug, name })),
  kamala: [
    ["novotel-phuket-kamala-beach", "Novotel Phuket Kamala Beach"], ["sunwing-kamala-beach", "Sunwing Kamala Beach"], ["sunprime-kamala-beach", "Sunprime Kamala Beach"],
  ].map(([slug, name]) => ({ slug, name })),
  "bang-tao": [{ slug: "hilton-garden-inn-phuket-bang-tao", name: "Hilton Garden Inn Phuket Bang Tao" }],
  "nai-harn": [{ slug: "the-nai-harn-phuket", name: "The Nai Harn" }, { slug: "wyndham-grand-nai-harn-beach-phuket", name: "Wyndham Grand Nai Harn Beach Phuket" }],
};

const livePrice =
  "Hotelprijzen veranderen per datum, bezetting, kamertype en voorwaarden. Vergelijk dezelfde gegevens en bekijk de actuele totaalprijs bij de aanbieder.";

const CONFIG: Record<PhuketHotelArea, AreaConfig> = {
  patong: {
    name: "Patong",
    path: "/phuket/patong/hotels/",
    eyebrow: "Actie dichtbij, nachtrust bewust kiezen",
    title: "Hotels in Patong.",
    accent: "Kies je microgebied.",
    subtitle:
      "In Patong kan een paar straten verschil je hele verblijf veranderen.",
    description:
      "Vergelijk Patong-hotels op afstand tot strand en avondleven, maar ook op nachtgeluid, verkeersroute, kamertypen en de plek van je kamer in het gebouw.",
    image: "/images/redesign/phuket-stay-patong.webp",
    alt: "Patong en de westkust van Phuket",
    fit: "Reizigers die winkels, restaurants en avondleven bewust dichtbij willen",
    tradeoff:
      "De centrale ligging kan meer verkeer, mensen en nachtgeluid betekenen. ‘Patong’ alleen zegt niet waar je kamer ligt.",
    zones: [
      {
        title: "Noord / Kalim-kant",
        copy: "Rustiger randgevoel; controleer de praktische looproute naar je dagelijkse doelen.",
      },
      {
        title: "Centraal",
        copy: "Maximaal gemak; vraag naar kameroriëntatie en nachtgeluid.",
      },
      {
        title: "Zuid / Tri Trang-kant",
        copy: "Meer afstand van de kern; controleer helling, transfer en strandtoegang.",
      },
    ],
    checks: [
      "Werkelijke nachtgeluidzijde",
      "Looproute en verkeersoversteek",
      "Exacte strandtoegang",
      "Kameroriëntatie en renovatiestatus",
    ],
    faqs: [
      {
        question: "Waar in Patong kun je het beste overnachten?",
        answer:
          "Kies centraal voor gemak en een randgebied voor meer afstand van de drukste kern. Controleer de exacte kaartpositie en kamerzijde in plaats van alleen de hotelnaam.",
      },
      {
        question: "Zijn hotels in Patong luidruchtig?",
        answer:
          "Dat verschilt per straat, gebouw, kamerrichting en isolatie. Vraag naar een rustige kamer en controleer recente informatie voor jouw exacte categorie.",
      },
      { question: "Wat kost een hotel in Patong?", answer: livePrice },
    ],
  },
  karon: {
    name: "Karon",
    path: "/phuket/karon/hotels/",
    eyebrow: "Lang strand, verschillende looproutes",
    title: "Hotels in Karon.",
    accent: "Strandweg, heuvel of zuidkant?",
    subtitle:
      "Beachfront, sea view en een korte strandwandeling zijn drie verschillende beloften.",
    description:
      "Vergelijk Karon-hotels op echte strandtoegang, helling, looproute, resortfaciliteiten, kamercategorie en verbinding met Kata of Patong.",
    image: "/images/redesign/karon-area-hero-v2.webp",
    alt: "Karon Beach aan de westkust van Phuket",
    fit: "Reizigers die een ruimere strandbasis zoeken met restaurants en resorts",
    tradeoff:
      "Sommige hotels liggen op een helling of achter een drukke weg. Kaartafstand is niet automatisch een makkelijke wandeling.",
    zones: [
      {
        title: "Noord-Karon",
        copy: "Meer afstand tot Kata; controleer voorzieningen en avondroute.",
      },
      {
        title: "Midden / strandweg",
        copy: "Praktisch voor strand; let op oversteek en kamerzijde.",
      },
      {
        title: "Zuid-Karon",
        copy: "Handig voor Kata; controleer heuvels en exacte voetgangersroute.",
      },
    ],
    checks: [
      "Strandroute zonder marketingtaal",
      "Helling en toegankelijkheid",
      "Familiekamer of extra bed",
      "Resortfaciliteiten op jouw datum",
    ],
    faqs: [
      {
        question: "Is Karon of Kata beter om te verblijven?",
        answer:
          "Karon voelt ruimer en langgerekter; Kata compacter en levendiger. Kies op de exacte looproute, gewenste sfeer en dagelijkse plannen.",
      },
      {
        question: "Liggen Karon-hotels direct aan het strand?",
        answer:
          "Niet allemaal. Controleer of beachfront directe toegang betekent of dat een weg, terrein of hoogteverschil ertussen ligt.",
      },
      { question: "Wat kost een hotel in Karon?", answer: livePrice },
    ],
  },
  kata: {
    name: "Kata",
    path: "/phuket/kata/hotels/",
    eyebrow: "Compacte strandbasis, maar niet overal vlak",
    title: "Hotels in Kata.",
    accent: "Kies op looproute en reisstijl.",
    subtitle: "Kata, Kata Noi en de heuvelrand werken anders in de praktijk.",
    description:
      "Vergelijk Kata-hotels op strandroute, helling, familie-indeling, surf-/zeeseizoen, restaurants en vervoer naar andere delen van Phuket.",
    image: "/images/redesign/kata-area-hero-v2.webp",
    alt: "Kata Beach op Phuket",
    fit: "Stellen en families die een compacte kustbasis met voorzieningen zoeken",
    tradeoff:
      "Een korte kaartafstand kan door hotelterreinen, heuvels of toegangswegen langer aanvoelen. Zeecondities veranderen per seizoen.",
    zones: [
      {
        title: "Kata Yai",
        copy: "Meer voorzieningen; controleer de daadwerkelijke strandtoegang.",
      },
      {
        title: "Kata Noi",
        copy: "Kleiner en rustiger gevoel; minder brede keuze direct buiten het hotel.",
      },
      {
        title: "Heuvelrand",
        copy: "Uitzicht kan sterk zijn; mobiliteit en shuttlebeleid worden belangrijker.",
      },
    ],
    checks: [
      "Kata Yai of Kata Noi",
      "Helling, shuttle en voetpad",
      "Familiekamer en bedindeling",
      "Actuele zee- en surfcondities",
    ],
    faqs: [
      {
        question: "Is Kata een goede basis voor een eerste Phuketreis?",
        answer:
          "Kata kan een praktische balans bieden tussen strand en voorzieningen. Controleer wel de exacte ligging en hoeveel vervoer je voor andere delen van Phuket nodig hebt.",
      },
      {
        question: "Is Kata geschikt voor gezinnen?",
        answer:
          "Veel gezinnen waarderen de combinatie van strand en voorzieningen, maar veiligheid hangt van actuele zeecondities, toezicht en de gekozen accommodatie af.",
      },
      { question: "Wat kost een hotel in Kata?", answer: livePrice },
    ],
  },
  kamala: {
    name: "Kamala",
    path: "/phuket/kamala/hotels/",
    eyebrow: "Rustiger kustdorp, uiteenlopende uiteinden",
    title: "Hotels in Kamala.",
    accent: "Dorp, strand of noordrand?",
    subtitle:
      "Kamala is rustiger dan Patong, maar de exacte ligging bepaalt hoeveel je loopt of rijdt.",
    description:
      "Vergelijk Kamala-hotels op dorps- en strandtoegang, noord/zuidligging, familievoorzieningen, avondrust, terrein en vervoer.",
    image: "/images/redesign/kamala-area-hero-v2.webp",
    alt: "Kamala Beach op Phuket",
    fit: "Reizigers die een kalmere strandbasis willen zonder volledig afgelegen te zitten",
    tradeoff:
      "De baai en het dorp zijn niet één compact punt. Een resort aan de rand kan voor diners en uitstapjes extra vervoer vragen.",
    zones: [
      {
        title: "Dorpskern",
        copy: "Praktisch voor eten en lokale voorzieningen; controleer strandroute.",
      },
      {
        title: "Middenstrand",
        copy: "Focus op stranddagen; vergelijk toegang en kamercategorie.",
      },
      {
        title: "Noord-/heuvelrand",
        copy: "Meer resortgevoel; vaak minder vanzelfsprekende loopbaarheid.",
      },
    ],
    checks: [
      "Afstand tot dorp én strand",
      "Vlakke of steile toegang",
      "Familie- of adults-onlybeleid",
      "Vervoer buiten Kamala",
    ],
    faqs: [
      {
        question: "Is Kamala rustiger dan Patong?",
        answer:
          "Kamala heeft doorgaans een rustiger basisgevoel, maar evenementen, hotelpositie en kamerzijde kunnen de ervaring veranderen.",
      },
      {
        question: "Is Kamala geschikt voor gezinnen?",
        answer:
          "Dat kan, vooral wanneer strandroute, kamertype en faciliteiten aansluiten. Controleer actuele zeecondities en kindervoorzieningen afzonderlijk.",
      },
      { question: "Wat kost een hotel in Kamala?", answer: livePrice },
    ],
  },
  "bang-tao": {
    name: "Bang Tao",
    path: "/phuket/bang-tao/hotels/",
    eyebrow: "Groot gebied, resortzone en lokale stukken",
    title: "Hotels in Bang Tao.",
    accent: "Laguna is niet heel Bang Tao.",
    subtitle:
      "Resortcomfort, strand en restaurants liggen niet overal op dezelfde looproute.",
    description:
      "Vergelijk Bang Tao-hotels op exacte subzone, resortnetwerk, strandtoegang, Boat Avenue-route, vervoer en wat je daadwerkelijk binnen het hotel wilt doen.",
    image: "/images/redesign/bang-tao-area-hero-v2.webp",
    alt: "Bang Tao Beach en de resortkust van Phuket",
    fit: "Reizigers die een gepolijste resortbasis of langer strandverblijf zoeken",
    tradeoff:
      "Bang Tao is uitgestrekt. Een adres kan goed zijn voor het strand maar minder handig voor restaurants, of andersom.",
    zones: [
      {
        title: "Laguna-zone",
        copy: "Geïntegreerd resortgevoel; verifieer welke gedeelde diensten actueel gelden.",
      },
      {
        title: "Boat Avenue-kant",
        copy: "Handig voor restaurants; controleer route en afstand tot strand.",
      },
      {
        title: "Noordelijk Bang Tao",
        copy: "Meer ruimte en rust; vaak grotere vervoersafhankelijkheid.",
      },
    ],
    checks: [
      "Exacte Bang Tao-subzone",
      "Strand versus restaurants",
      "Actuele shuttle-/resortdiensten",
      "Vervoer naar rest van Phuket",
    ],
    faqs: [
      {
        question: "Waar in Bang Tao kun je het beste verblijven?",
        answer:
          "Kies Laguna voor een geïntegreerd resortgevoel, dichter bij restaurants voor avondgemak, of noordelijker voor meer afstand. Verifieer de exacte kaartpositie.",
      },
      {
        question: "Is Bang Tao geschikt voor gezinnen?",
        answer:
          "Veel accommodaties richten zich op gezinnen, maar controleer kamertype, zwembadveiligheid, kinderfaciliteiten en dagelijkse looproutes per hotel.",
      },
      { question: "Wat kost een hotel in Bang Tao?", answer: livePrice },
    ],
  },
  "nai-harn": {
    name: "Nai Harn",
    path: "/phuket/nai-harn/hotels/",
    eyebrow: "Rustige zuidbasis, beperkte strandbebouwing",
    title: "Hotels in Nai Harn.",
    accent: "Kies tussen baai en ruimere omgeving.",
    subtitle: "Niet ieder hotel met Nai Harn in de naam ligt aan de baai.",
    description:
      "Vergelijk Nai Harn-hotels op echte strandroute, Rawai-verbinding, helling, eigen vervoer, kamertype en bereikbaarheid van restaurants en uitstapjes.",
    image: "/images/redesign/phuket-stay-rawai-nai-harn.webp",
    alt: "Nai Harn en Rawai in het zuiden van Phuket",
    fit: "Reizigers die een rustigere zuidbasis en natuur rond de baai zoeken",
    tradeoff:
      "De directe hotelkeuze bij het strand is beperkter en locaties buiten de baai kunnen vervoer vragen. Nai Harn en Rawai zijn niet hetzelfde.",
    zones: [
      {
        title: "Direct rond de baai",
        copy: "Sterk voor stranddagen; beperkte keuze vraagt nauwkeurige categoriecontrole.",
      },
      {
        title: "Dorp / binnenland",
        copy: "Meer verblijfsopties; controleer loopbaarheid en helling.",
      },
      {
        title: "Rawai-verbinding",
        copy: "Handig voor zuidelijke restaurants en boten; niet automatisch een zwemstrandbasis.",
      },
    ],
    checks: [
      "Nai Harn of feitelijk Rawai",
      "Echte strandroute",
      "Helling en eigen vervoer",
      "Restaurants en avondmobiliteit",
    ],
    faqs: [
      {
        question: "Is Nai Harn een goede plek om te verblijven?",
        answer:
          "Nai Harn past bij reizigers die rust en een zuidelijke basis zoeken. Voor veel eilandritten of nachtleven kan de ligging minder praktisch zijn.",
      },
      {
        question: "Kun je vanuit elk Nai Harn-hotel naar het strand lopen?",
        answer:
          "Nee. Controleer de exacte route, helling, voetpad en eventuele shuttle; plaatsnamen in listings kunnen een ruim gebied aanduiden.",
      },
      { question: "Wat kost een hotel in Nai Harn?", answer: livePrice },
    ],
  },
};

export default function PhuketAreaHotelsHubNl({
  area,
  tripUrl,
}: {
  area: PhuketHotelArea;
  tripUrl: string;
}) {
  const c = CONFIG[area];
  const hotelProfiles = HOTEL_PROFILES[area] || [];
  const canonical = `https://go2-thailand.com/nl${c.path}`;
  const affiliate = withSubId(tripUrl, `phuket-${area}-hotels-owner-nl`);
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
      mainEntity: c.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ];
  return (
    <>
      <SEOHead
        title={`${c.title} Gebieden en actuele hotelkeuze`}
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
      <div className="bg-canvas text-charcoal">
        <EditorialHero
          image={c.image}
          imageAlt={c.alt}
          breadcrumbs={[
            { label: "Thailand", href: "/" },
            { label: "Phuket", href: "/city/phuket/" },
            { label: c.name, href: `/phuket/${area}/` },
            { label: "Hotels" },
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
              label: "Vergelijk microgebieden",
              href: "#gebieden",
              kind: "primary",
            },
            {
              label: "Bekijk actuele hotels",
              href: affiliate,
              kind: "secondary",
              newTab: true,
              affiliate: true,
            },
          ]}
          disclosure="De hotelknop is een affiliate-link via onze centrale Travelpayoutsconfiguratie. Wij kunnen commissie ontvangen zonder extra kosten voor jou; actuele prijs en voorwaarden staan bij Trip.com."
          titleClassName="max-w-[840px] text-[3.15rem] leading-[0.9] sm:text-[4.35rem] lg:text-[5rem]"
        />
        <PageSectionNav
          label="Op deze pagina"
          items={[
            { href: "#past-dit", label: "Past dit gebied?", icon: Compass },
            { href: "#gebieden", label: "Microgebieden", icon: MapPin },
            { href: "#controle", label: "Hotelcheck", icon: BedDouble },
            { href: "#boeken", label: "Actuele hotels", icon: CalendarCheck2 },
            { href: "#vragen", label: "Vragen", icon: Sparkles },
          ]}
        />
        <section
          id="past-dit"
          className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
        >
          <div className="container-custom grid gap-8 lg:grid-cols-2">
            <div>
              <p className="eyebrow">Goede match</p>
              <h2 className="mt-3 font-display text-4xl text-jade">
                Voor wie werkt {c.name}?
              </h2>
              <p className="mt-5 leading-8 text-muted">{c.fit}</p>
            </div>
            <aside className="rounded-[1.4rem] bg-jade p-7 text-ivory">
              <MoonStar className="text-saffron" />
              <h3 className="mt-4 font-display text-3xl">De echte trade-off</h3>
              <p className="mt-3 leading-7 text-ivory/75">{c.tradeoff}</p>
            </aside>
          </div>
        </section>
        <section
          id="gebieden"
          className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
        >
          <div className="container-custom">
            <SectionHeading
              eyebrow="Binnen dezelfde plaats"
              title="Drie microgebieden om te vergelijken"
              description="De kaarten zijn een locatiecheck, geen hotelranglijst."
            />
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {c.zones.map((z, i) => (
                <article
                  key={z.title}
                  className={`rounded-[1.3rem] border p-6 ${i === 0 ? "border-jade bg-jade text-ivory" : "border-jade/10 bg-white"}`}
                >
                  <Route className={i === 0 ? "text-saffron" : "text-jade"} />
                  <h3 className="mt-4 font-display text-2xl">{z.title}</h3>
                  <p
                    className={`mt-3 text-sm leading-7 ${i === 0 ? "text-ivory/75" : "text-muted"}`}
                  >
                    {z.copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section
          id="controle"
          className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
        >
          <div className="container-custom">
            <SectionHeading
              eyebrow="Vóór je reserveert"
              title="Controleer het exacte hotelproduct"
              description="Een gebied past pas echt wanneer kamer, toegang en voorwaarden ook kloppen."
            />
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {c.checks.map((x, i) => (
                <article
                  key={x}
                  className="rounded-[1.25rem] border border-jade/10 bg-white p-5"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-saffron text-xs font-bold text-jade">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 font-display text-xl text-jade">{x}</h3>
                </article>
              ))}
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "Exacte kamercategorie",
                "Totaalprijs en belastingen",
                "Ontbijt en extra bed",
                "Annulering en betaalmoment",
                "Renovatie of bouw in omgeving",
                "Lift, trappen en toegankelijkheid",
                "Shuttle en werkelijke route",
                "Recente accommodatie-informatie",
              ].map((x) => (
                <div
                  key={x}
                  className="flex gap-2 rounded-xl bg-sand px-4 py-3 text-sm font-semibold text-jade"
                >
                  <CheckCircle2
                    size={17}
                    className="mt-0.5 shrink-0 text-saffron"
                  />
                  {x}
                </div>
              ))}
            </div>
          </div>
        </section>
        {hotelProfiles.length ? (
          <section className="section-divider-bottom py-14 lg:py-20">
            <div className="container-custom">
              <SectionHeading eyebrow="Hotelprofielen in deze zone" title={`Verdiep je shortlist voor ${c.name}`} description="Open alleen hotels waarvoor een zelfstandig profiel bestaat. Controleer daarna nog steeds de actuele kamer, totaalprijs en voorwaarden bij de aanbieder." />
              <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {hotelProfiles.map((hotel) => (
                  <Link key={hotel.slug} href={`/phuket/${area}/hotels/${hotel.slug}/`} className="group flex min-h-20 items-center justify-between gap-4 rounded-2xl border border-jade/10 bg-white px-5 py-4 text-sm font-extrabold text-jade shadow-editorial-card transition hover:-translate-y-0.5 hover:border-saffron/45">
                    <span>{hotel.name}</span><ArrowRight size={15} className="shrink-0 text-saffron-dark transition group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}
        <section
          id="boeken"
          className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
        >
          <div className="container-custom">
            <div className="rounded-[1.5rem] bg-jade p-7 text-ivory lg:flex lg:items-center lg:justify-between lg:p-9">
              <div>
                <p className="eyebrow text-saffron">Na de gebiedscheck</p>
                <h2 className="mt-2 font-display text-3xl">
                  Bekijk de actuele hotelkeuze in {c.name}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-ivory/75">
                  Vergelijk dezelfde datum, bezetting en kamer. Controleer op de
                  laatste stap de totaalprijs en voorwaarden.
                </p>
              </div>
              <a
                href={affiliate}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-saffron px-5 py-3 text-sm font-bold text-jade lg:mt-0"
              >
                Bekijk actuele prijs via Trip.com
                <ExternalLink size={16} />
              </a>
            </div>
            <AffiliateDisclosure
              className="mt-5"
              text="Trip.com loopt via onze centrale Travelpayoutsconfiguratie. Een mogelijke commissie verandert jouw prijs niet. We publiceren geen vluchtige prijs of betaalde hotelrangschikking."
            />
          </div>
        </section>
        <FaqSplitSection
          id="vragen"
          eyebrow="Voor je boekt"
          title={`Veelgestelde vragen over hotels in ${c.name}`}
          items={c.faqs}
        />
        <section className="section-divider-top py-14">
          <div className="container-custom">
            <div className="rounded-[1.4rem] border border-jade/10 bg-white p-7 lg:flex lg:items-center lg:justify-between">
              <div>
                <p className="eyebrow">Vergelijk de bredere kust</p>
                <h2 className="mt-2 font-display text-3xl text-jade">
                  Past een andere Phuket-zone beter?
                </h2>
              </div>
              <div className="mt-5 flex flex-wrap gap-2 lg:mt-0">
                <Link
                  href="/nl/best-hotels/phuket/"
                  className="inline-flex items-center gap-2 rounded-lg bg-jade px-4 py-3 text-sm font-bold text-white"
                >
                  Alle Phuket-gebieden
                  <ArrowRight size={15} className="text-saffron" />
                </Link>
                <Link
                  href="/best-hotels/phuket/"
                  className="inline-flex items-center gap-2 rounded-lg border border-jade/15 px-4 py-3 text-sm font-bold text-jade"
                >
                  Phuket hotelgids
                  <ArrowRight size={15} className="text-saffron" />
                </Link>
                {area === "bang-tao" ? <Link href="/phuket/surin/" className="inline-flex items-center gap-2 rounded-lg border border-jade/15 px-4 py-3 text-sm font-bold text-jade">Surin vergelijken <ArrowRight size={15} className="text-saffron" /></Link> : null}
              </div>
            </div>
          </div>
        </section>
        <SourceMethodSection
          title="Bronnen en werkwijze"
          description="De ownergrenzen volgen uit actuele Nederlandse en internationale zoekresultaten, gebiedsvergelijkingen en bestaande onafhankelijke Phuket-location research. Hotelprijzen, beschikbaarheid en kamervoorwaarden blijven bij de aanbieder. Zeecondities en voorzieningen kunnen veranderen."
          sources={[
            {
              label: "Tourism Authority of Thailand — Phuket",
              href: "https://www.tourismthailand.org/Destinations/Provinces/Phuket/350",
            },
          ]}
        />
      </div>
    </>
  );
}
