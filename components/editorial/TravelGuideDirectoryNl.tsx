import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpenCheck, Compass, HeartPulse, Languages, Leaf, Map, MoonStar, Route, ShieldCheck, Smartphone, Sparkles, Users, Utensils, WalletCards } from 'lucide-react';
import SEOHead from '../SEOHead';
import { EditorialHero } from '../design/EditorialHero';
import { PageSectionNav } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';

type GuideCard = { title: string; eyebrow: string; description: string; href: string; icon: typeof Compass };
type GuideGroup = { id: string; label: string; title: string; description: string; accent: string; image: string; imageAlt: string; guides: GuideCard[] };

const groups: GuideGroup[] = [
  {
    id: 'beginnen', label: 'Voor je vertrekt', title: 'Maak eerst de grote keuzes.', accent: 'Planning', image: '/images/redesign/first-time-thailand-packing.webp', imageAlt: 'Overzichtelijke reisvoorbereiding voor Thailand',
    description: 'Deze owners bepalen reisvenster, tempo, toegang en totaalplaatje. Open ze vóór je losse producten vergelijkt.',
    guides: [
      { title: 'Eerste keer Thailand', eyebrow: 'Volgorde en beginnersfouten', description: 'Van aankomst en geld tot connectiviteit, cultuur en een haalbare eerste route.', href: '/thailand-for-first-timers/', icon: Sparkles },
      { title: 'Weer per regio', eyebrow: 'Maand, kust en conditie', description: 'Vergelijk je exacte regio’s in plaats van één landelijke beste maand te volgen.', href: '/weather/', icon: Compass },
      { title: 'Budgetplanner', eyebrow: 'Bandbreedte, geen prijsbelofte', description: 'Reken met route, hotelstijl en activiteiten en open daarna actuele quotes.', href: '/thailand-index/budget/', icon: WalletCards },
      { title: 'Visum & toegang', eyebrow: 'Paspoort, TDAC en verblijfsdoel', description: 'Begin bij je nationaliteit en officiële status; niet bij een oude blogregel.', href: '/visa/', icon: BookOpenCheck },
      { title: 'Thailand met kinderen', eyebrow: 'Tempo, slaap en zorg', description: 'Kies minder bases en controleer gezondheid, vervoer en accommodatie per leeftijd.', href: '/travel-guides/thailand-with-kids/', icon: Users },
      { title: 'Solo reizen als vrouw', eyebrow: 'Praktische veiligheidskeuzes', description: 'Plan aankomst, vervoer, verblijf en contactmomenten zonder veiligheid te beloven.', href: '/travel-guides/solo-female-travel-thailand/', icon: ShieldCheck },
    ],
  },
  {
    id: 'praktisch', label: 'Onderweg', title: 'Regel verbinding, vervoer en gezondheid.', accent: 'Praktisch', image: '/images/redesign/thailand-practical-hub-hero-nl.webp', imageAlt: 'Praktische voorbereiding voor reizen in Thailand',
    description: 'Tijdgevoelige details blijven bij de owner die provider-, veiligheids- of gezondheidsclaims kan controleren.',
    guides: [
      { title: 'SIM & eSIM', eyebrow: 'Internet vanaf aankomst', description: 'Vergelijk fysieke SIM en eSIM op toestel, dekking, activatie en actuele voorwaarden.', href: '/travel-guides/sim-card-thailand/', icon: Smartphone },
      { title: 'VPN in Thailand', eyebrow: 'Openbare wifi en toegang', description: 'Bepaal eerst welk concreet privacy- of toegangsprobleem je probeert op te lossen.', href: '/travel-guides/vpn-thailand/', icon: ShieldCheck },
      { title: 'Scooter huren', eyebrow: 'Documenten vóór de sleutel', description: 'Controleer rijbewijs, helm, voertuig, borg en polis vóór je besluit te rijden.', href: '/travel-guides/scooter-rental-thailand/', icon: Route },
      { title: 'Gezondheid & ziekenhuizen', eyebrow: 'Voorbereiden zonder diagnose', description: 'Vind zorgniveaus, noodroute en vragen voor je verzekeraar of behandelaar.', href: '/travel-guides/health-hospitals-thailand/', icon: HeartPulse },
      { title: 'Lang verblijf', eyebrow: 'Leefritme en administratie', description: 'Scheid verblijf, werk, belasting, zorg en wonen; elk heeft een eigen officiële status.', href: '/travel-guides/expat-long-stay-thailand/', icon: Map },
      { title: 'Vervoer in Thailand', eyebrow: 'Netwerk en overstappen', description: 'Kies trein, bus, boot of vlucht per traject en controleer de echte terminal.', href: '/transport/', icon: Route },
    ],
  },
  {
    id: 'natuur', label: 'Buiten', title: 'Laat conditie en toegang de dag bepalen.', accent: 'Natuur', image: '/images/redesign/khao-sok-attractions-hero.webp', imageAlt: 'Regenwoud en kalksteen in Thailand',
    description: 'Parkstatus, weer, zee, weg en eigen ervaring zijn belangrijker dan een universele top-10.',
    guides: [
      { title: 'Nationale parken', eyebrow: 'Status, toegang en alternatief', description: 'Kies een park op regio en controleer sluiting, gidsvereiste en actueel weer.', href: '/travel-guides/national-parks-thailand/', icon: Leaf },
      { title: 'Wandelen & trekking', eyebrow: 'Route en fysieke belasting', description: 'Match afstand, hoogte, ondergrond en gids aan je ervaring en omstandigheden.', href: '/travel-guides/hiking-trekking-thailand/', icon: Leaf },
      { title: 'Duiken & snorkelen', eyebrow: 'Zee, opleiding en operator', description: 'Kies op kust, maand, brevet, medische fitheid en actuele uitvoerdervoorwaarden.', href: '/travel-guides/diving-snorkeling-thailand/', icon: Compass },
      { title: 'Dierenrisico’s', eyebrow: 'Voorkomen en handelen', description: 'Focus op waarschijnlijkheid, preventie en professionele hulp—not op angstlijsten.', href: '/travel-guides/dangerous-animals-thailand/', icon: ShieldCheck },
      { title: 'Verborgen plekken', eyebrow: 'Rustiger is niet automatisch leeg', description: 'Vergelijk bereikbaarheid, voorzieningen en seizoen voordat je “onontdekt” kiest.', href: '/travel-guides/hidden-gems-off-beaten-path-thailand/', icon: Sparkles },
    ],
  },
  {
    id: 'cultuur', label: 'Dagelijks Thailand', title: 'Begrijp de context achter de ervaring.', accent: 'Cultuur', image: '/images/redesign/thailand-food-shared-table.webp', imageAlt: 'Gedeelde Thaise tafel als dagelijkse cultuur',
    description: 'Gebruik cultuur-, taal- en eetgidsen als context. Veranderlijke venues en kalenders controleer je opnieuw vlak voor bezoek.',
    guides: [
      { title: 'Geschiedenis & cultuur', eyebrow: 'Van koninkrijken tot erfgoed', description: 'Plaats tempels, steden en tradities in context zonder cultuur tot fotodecor te maken.', href: '/travel-guides/history-culture-thailand/', icon: BookOpenCheck },
      { title: 'Etiquette', eyebrow: 'Tempel, wai en respect', description: 'Leer bruikbare gedragsregels en volg lokale aanwijzingen wanneer situaties verschillen.', href: '/practical-info/etiquette-culture/', icon: Users },
      { title: 'Thaise basiszinnen', eyebrow: 'Begrijpen vóór perfectioneren', description: 'Gebruik korte zinnen voor begroeten, eten, route en hulp; toon en context blijven belangrijk.', href: '/travel-guides/thai-phrases-language/', icon: Languages },
      { title: 'Vegetarisch & vegan', eyebrow: 'Ingrediënten en bestelzin', description: 'Maak dieet, vissaus, bouillon, ei en allergenen expliciet in plaats van op een label te gokken.', href: '/travel-guides/vegetarian-vegan-thailand/', icon: Utensils },
      { title: '7-Eleven in Thailand', eyebrow: 'Handige stop, geen must-buylijst', description: 'Gebruik de winkel voor concrete reisbehoeften en controleer ingrediënten en actuele prijs.', href: '/travel-guides/7-eleven-thailand/', icon: Utensils },
      { title: 'Markten & winkelen', eyebrow: 'Plaats en opening hercontroleren', description: 'Kies marktcontext, product en vervoer; tijden en aanbod kunnen wijzigen.', href: '/travel-guides/shopping-markets-thailand/', icon: Map },
      { title: 'Festivals & evenementen', eyebrow: 'Datum en locatie zijn variabel', description: 'Begrijp het evenement en bevestig kalender, toegang en lokale regels bij de organisator.', href: '/travel-guides/festivals-events-thailand/', icon: Sparkles },
      { title: 'Nachtleven & rooftops', eyebrow: 'Buurt, terugreis en voorwaarden', description: 'Plan opening, dresscode, leeftijdsregel en veilige terugkeer op actuele venue-informatie.', href: '/travel-guides/nightlife-rooftop-bars-thailand/', icon: MoonStar },
    ],
  },
];

const allGuides = groups.flatMap((group) => group.guides);

export default function TravelGuideDirectoryNl() {
  const pageUrl = 'https://go2-thailand.com/nl/travel-guides/';
  const schemas = [
    { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Thailand themagidsen', description: 'Vind de juiste Thailand-gids voor planning, gezondheid, connectiviteit, natuur, cultuur en dagelijks reizen.', url: pageUrl, inLanguage: 'nl-NL', mainEntity: { '@type': 'ItemList', numberOfItems: allGuides.length, itemListElement: allGuides.map((guide, index) => ({ '@type': 'ListItem', position: index + 1, name: guide.title, url: `https://go2-thailand.com/nl${guide.href}` })) } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/nl/' }, { '@type': 'ListItem', position: 2, name: 'Reisgidsen', item: pageUrl }] },
  ];

  return <>
    <SEOHead title="Thailand reisgidsen per onderwerp" description="Vind direct de juiste Thailand-gids voor route, weer, visum, budget, gezondheid, connectiviteit, natuur, cultuur en reizen met kinderen." ogImage="https://go2-thailand.com/images/redesign/thailand-practical-hub-hero-nl.webp">
      {schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
    </SEOHead>
    <div data-premium-template="travel-guide-directory-nl" className="overflow-hidden bg-canvas text-charcoal">
      <EditorialHero image="/images/redesign/thailand-practical-hub-hero-nl.webp" imageAlt="Reiziger ordent praktische Thailandinformatie aan een houten tafel" breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Reisgidsen' }]} eyebrow="Van vraag naar de juiste owner" title={<>Thailand-gidsen.<br /><span className="text-saffron-dark">Kies je onderwerp.</span></>} subtitle="Geen eindeloze artikelenlijst." description="Start bij de beslissing die je nu moet nemen. Elke themagids beheert zijn eigen feiten, controles en vervolgstappen." actions={[{ label: 'Voor je vertrekt', href: '#beginnen', kind: 'primary' }, { label: 'Complete landgids', href: '/thailand-travel-guide/', kind: 'secondary' }]} imageClassName="object-cover object-[65%_center]" />
      <PageSectionNav items={[{ href: '#beginnen', label: 'Beginnen', icon: Compass }, { href: '#praktisch', label: 'Onderweg', icon: Smartphone }, { href: '#natuur', label: 'Natuur', icon: Leaf }, { href: '#cultuur', label: 'Cultuur', icon: Languages }]} />

      {groups.map((group, groupIndex) => <section key={group.id} id={group.id} className={`section-divider-bottom scroll-mt-24 py-16 lg:py-24 ${groupIndex % 2 ? 'bg-tonal' : ''}`}><div className="container-custom"><div className="grid gap-8 lg:grid-cols-[.68fr_1.32fr] lg:items-end"><SectionHeading eyebrow={`${group.label} · ${group.guides.length} gidsen`} title={group.title} description={group.description} /><div className="relative hidden h-40 overflow-hidden rounded-2xl border border-jade/10 lg:block"><Image src={group.image} alt={group.imageAlt} fill sizes="50vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-jade/68 to-transparent" /><span className="absolute bottom-5 left-5 text-[10px] font-extrabold uppercase tracking-[.16em] text-saffron">{group.accent}</span></div></div><div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{group.guides.map(({ title, eyebrow, description, href, icon: Icon }) => <Link key={title} href={href} className="group flex min-h-[236px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/25 bg-canvas text-jade"><Icon size={20} /></span><ArrowRight size={15} className="text-saffron-dark transition group-hover:translate-x-1" /></div><p className="mt-5 text-[9px] font-extrabold uppercase tracking-[.13em] text-saffron-dark">{eyebrow}</p><h2 className="mt-2 font-display text-[1.7rem] font-semibold leading-none text-jade">{title}</h2><p className="mt-4 text-xs font-medium leading-6 text-charcoal/64">{description}</p><span className="mt-auto pt-5 text-xs font-extrabold text-jade">Open deze gids</span></Link>)}</div></div></section>)}

      <RelatedGuidesSection eyebrow="Liever vanuit je reis beginnen?" title="Drie andere ingangen naar dezelfde informatie" guides={[{ title: 'Complete Thailand-reisgids', description: 'Plan reisvenster, route, toegang en budget in de juiste volgorde.', href: '/thailand-travel-guide/', image: '/images/redesign/thailand-travel-guide-hero-v2.webp', imageAlt: 'Complete reis door Thailand plannen' }, { title: 'Bestemmingen', description: 'Begin bij een concrete stad, regio of eiland en open lokale owners.', href: '/city/', image: '/images/redesign/thailand-route-rhythm.webp', imageAlt: 'Bestemmingen en reisnetwerken in Thailand' }, { title: 'Wat te doen', description: 'Kies activiteiten op regio, tempo en actuele conditie.', href: '/things-to-do-in-thailand/', image: '/images/redesign/thailand-excursions-hero.webp', imageAlt: 'Activiteiten in Thailand' }]} />
      <SourceMethodSection eyebrow="Directorymethode" title="Eén onderwerp, één definitieve eigenaar" description="Deze directory schrijft veranderlijke feiten niet opnieuw uit. Hij verwijst naar de owner die research, primaire bronnen, interne links en actualiteitscontrole voor dat onderwerp beheert. Oude weers-, food-, firsttimer-, etiquette- en gezondheidsaliases worden rechtstreeks naar hun geconsolideerde eigenaar geleid." sources={[{ title: 'Bestemmingen en reiscontext', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Destinations', note: 'Primaire startbron voor regio-, bestemming- en cultuurcontext; iedere themagids specificeert zijn eigen aanvullende bronnen.' }, { title: 'Actueel reisadvies Thailand', creator: 'NederlandWereldwijd', url: 'https://www.nederlandwereldwijd.nl/reisadvies/thailand', note: 'Actuele Nederlandse veiligheids- en toegangscontext; specialistische owners verwijzen daarnaast naar de relevante Thaise instantie.' }]} />
    </div>
  </>;
}
