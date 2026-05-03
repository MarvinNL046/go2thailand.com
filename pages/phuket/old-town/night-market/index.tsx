import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import SEOHead from '../../../../components/SEOHead';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import { withSubId } from '../../../../lib/affiliates';
import { useSubId } from '../../../../lib/useSubId';

interface PartnerEntry { partnerUrl: string; label: string }
interface Partners { [key: string]: PartnerEntry }
interface Props { partners: Partners; lastUpdated: string }

export default function PhuketOldTownNightMarketPage({ partners, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const subId = useSubId();
  const placement = (p: string) => `${subId}-pseo-phuket-old-town-night-market-${p}`;

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Phuket', href: '/city/phuket/' },
    { name: 'Old Town', href: '/phuket/old-town/' },
    { name: isNl ? 'Night Market' : 'Night Market', href: '/phuket/old-town/night-market/' },
  ];

  // Title <60 — KW: "phuket old town night market" 100/KD0 + variants 350 vol
  const seoTitle = isNl
    ? 'Phuket Old Town Night Market: Sunday Walking Street'   // 53
    : 'Phuket Old Town Night Market: Sunday Walking Street'; // 53

  const h1 = isNl
    ? 'Sunday Walking Street: de échte gids voor de Old Town Phuket nachtmarkt'
    : "Sunday Walking Street: The Honest Guide to Old Town Phuket's Night Market";

  const seoDescription = isNl
    ? 'Op zoek naar de Phuket Old Town night market? Sunday Walking Street draait elke zondag 16:00–22:00 op Thalang Road — wat eten, hoe komen, foto-tips.'
    : 'Looking for the Phuket Old Town night market? Sunday Walking Street runs every Sunday 16:00–22:00 on Thalang Road — what to eat, how to get there, photo tips.';

  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/phuket/old-town/night-market/`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({ '@type': 'ListItem', position: i + 1, name: b.name, item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}` })),
  };

  const faqEn = [
    { q: 'When is the Phuket Old Town night market?', a: 'Every Sunday, 16:00–22:00. Stalls start setting up around 15:00; food vendors are running by 16:30. Peak crowds 18:30–20:30. Last food orders 21:30 — most stalls pack down by 22:00. The market runs every Sunday year-round, including rainy season (June–October), with about 30% fewer stalls when heavy rain hits.' },
    { q: 'Where exactly is the Walking Street market?', a: 'On Thalang Road in Old Phuket Town — between the Yaowarat junction and Phuket Road. It also extends down Phang Nga Road for the last block. The street is closed to traffic from 15:30 every Sunday. Nearest landmark: the Standard Chartered Building on Krabi Road (1-min walk south).' },
    { q: 'What should I eat at the night market?', a: 'Hokkien noodles (yellow stir-fry, 60–80 THB), oh tow (oyster omelette, 100 THB), a-pong mini coconut pancakes (5 for 20 THB), mango sticky rice in season (60 THB), Phuket-style satay (10 THB/skewer), grilled squid (100 THB), and a coconut ice-cream in a coconut shell at the Yaowarat end (60 THB). Skip the touristy pad thai stalls — Old Town has better Hokkien-style noodles next door.' },
    { q: 'Is the Phuket Old Town market the same as Phuket Walking Street or Saturday Night Market?', a: 'Different markets. Phuket Old Town night market = Sunday Walking Street on Thalang Road in the historic centre — food, crafts, shophouse photos. Phuket Walking Street near Bangla Road in Patong is a different (red-light) zone. The "Saturday Night Market" (Naka Market) is a much larger flea market on the Phuket Town outskirts, open Sat–Sun, 16:00–23:00 — different vibe, more general goods less heritage.' },
    { q: 'How do I get to the night market from Patong?', a: 'Grab/taxi 50–60 min on a Sunday evening (heavier traffic) for ~750 THB ($22). Recommend leaving Patong by 16:30 to arrive 17:30 — beats the 18:00–20:00 jam. Return: book Grab from the Krabi Road end after 21:00 to avoid surge pricing — by 22:30 fares drop back to normal.' },
    { q: 'Is the night market kid-friendly?', a: 'Yes, but tight. Stroller access is limited 18:30–20:30 when crowds peak — better with a baby carrier. Plenty of kid-friendly food (a-pong pancakes, ice-cream, satay), but loud live-music speakers near the Yaowarat end can scare younger kids. Best window with kids: 17:00–18:00.' },
    { q: 'What other Sunday activities work with the market?', a: 'Combine with a Trickeye Museum visit (closes 19:00, walks back to Walking Street in 5 min) or Soi Romanee photo session (15 min, peak light 16:30–17:30). Most visitors do Old Town highlights in the afternoon, then drop into the market at 17:30. Some prefer lunch at One Chun followed by a 16:00 market start.' },
  ];
  const faqNl = [
    { q: 'Wanneer is de Phuket Old Town night market?', a: 'Elke zondag 16:00–22:00. Stalls beginnen op te bouwen rond 15:00; foodstalls draaien vanaf 16:30. Pieken 18:30–20:30. Laatste bestellingen 21:30 — afbouw rond 22:00. Markt draait jaarrond, ook in regenseizoen (jun–okt), ~30% minder stalls bij flinke regen.' },
    { q: 'Waar precies is de Walking Street markt?', a: 'Op Thalang Road in Old Phuket Town — tussen Yaowarat-kruising en Phuket Road. Loopt door over Phang Nga Road in het laatste blok. Straat dicht voor verkeer vanaf 15:30 op zondag. Dichtstbijzijnde herkenningspunt: het Standard Chartered Building op Krabi Road (1 min lopen).' },
    { q: 'Wat moet ik eten op de night market?', a: 'Hokkien noedels (gele wok, 60–80 THB), oh tow (oester-omelet, 100 THB), a-pong mini-kokospannenkoeken (5 voor 20 THB), mango sticky rice in seizoen (60 THB), Phuket-satay (10 THB/stokje), gegrilde inktvis (100 THB), kokosijs in een kokosnoot aan de Yaowarat-kant (60 THB). Skip de toeristen pad thai-kraampjes — Old Town heeft betere Hokkien-noedels.' },
    { q: 'Is dit dezelfde markt als Phuket Walking Street of de Saturday Night Market?', a: 'Verschillende markten. Phuket Old Town night market = Sunday Walking Street op Thalang Road, historisch centrum — food, crafts, shophouses. Phuket Walking Street bij Bangla Road in Patong is een andere (red-light) zone. De "Saturday Night Market" (Naka Market) is een grotere vlooienmarkt aan de rand van Phuket Town, za–zo 16:00–23:00 — andere sfeer, meer algemene goederen.' },
    { q: 'Hoe kom ik vanuit Patong naar de markt?', a: 'Grab/taxi 50–60 min op zondagavond (drukker verkeer) voor ~750 THB ($22). Vertrek vanuit Patong uiterlijk 16:30 om 17:30 te zijn — voor de 18:00–20:00 file. Terug: Grab boeken vanaf het Krabi Road-uiteinde na 21:00 om surge te vermijden — 22:30 zijn prijzen weer normaal.' },
    { q: 'Is de markt kindvriendelijk?', a: 'Ja, maar krap. Kinderwagen lukt slecht 18:30–20:30 — beter met draagdoek. Veel kindvriendelijk eten (a-pong, ijs, satay), maar luide live-muziekspeakers bij Yaowarat kunnen jongere kinderen schrikken. Beste raam met kinderen: 17:00–18:00.' },
    { q: 'Welke andere zondag-activiteiten passen erbij?', a: 'Combineer met Trickeye Museum (sluit 19:00, 5 min lopen naar Walking Street) of Soi Romanee fotosessie (15 min, beste licht 16:30–17:30). De meesten doen Old Town overdag en stappen 17:30 de markt op. Of lunch bij One Chun en start 16:00 op de markt.' },
  ];
  const faqList = isNl ? faqNl : faqEn;
  const faqJsonLd = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faqList.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <>
      <SEOHead title={seoTitle} description={seoDescription}>
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        <section className="bg-thailand-blue text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Breadcrumbs items={breadcrumbs} />
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/75">{isNl ? 'Old Town nachtmarkt' : 'Old Town night market'}</p>
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">{h1}</h1>
            <p className="mt-4 text-lg lg:text-xl max-w-3xl opacity-95">
              {isNl
                ? "Elke zondag sluit Thalang Road voor verkeer en wordt het 400 m foodstalls, crafts en live muziek. Hier is hoe je hem doet zonder de standaard fouten — wat eten, hoe komen, en wanneer je echt foto's maakt zonder massa."
                : "Every Sunday Thalang Road closes to traffic and becomes 400 m of food stalls, crafts and live music. Here's how to do it without the standard tourist mistakes — what to eat, how to get there, and when to actually get photos without elbows."}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={withSubId(partners.klook_market.partnerUrl, placement('hero-primary'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">
                {isNl ? 'Food tour boeken op Klook' : 'Book a food tour on Klook'} →
              </a>
              <a href={withSubId(partners.gyg_market.partnerUrl, placement('hero-secondary'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-[#1B9E3E] text-white px-6 py-3 text-base font-semibold hover:bg-[#157a30]">
                {isNl ? 'Vergelijk op GetYourGuide' : 'Compare on GetYourGuide'} →
              </a>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs opacity-90">
              <span>✔ {isNl ? 'Elke zondag 16:00–22:00' : 'Every Sunday 16:00–22:00'}</span>
              <span>✔ Thalang Road</span>
              <span>✔ {isNl ? 'Bijgewerkt' : 'Updated'} {new Date(lastUpdated).toLocaleDateString(isNl ? 'nl-NL' : 'en', { year: 'numeric', month: 'long' })}</span>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
          {/* Quick facts */}
          <section className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'In één oogopslag' : 'Quick facts'}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Open' : 'Open'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">{isNl ? 'Zo 16–22:00' : 'Sun 16–22:00'}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Lengte' : 'Length'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">~400 m</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Stalls' : 'Stalls'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">~150</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Drukst' : 'Peak'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">18:30–20:30</p></div>
            </div>
          </section>

          {/* What to eat */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Wat je écht moet eten (volgorde van must-do)' : 'What to actually eat (in order of must-do)'}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-amber-500">
                <h3 className="font-heading text-lg font-bold text-gray-900">{isNl ? 'A-Pong (mini-kokospannenkoeken)' : 'A-Pong (mini coconut pancakes)'}</h3>
                <p className="text-xs text-amber-700 font-semibold mb-1">5 × 20 THB</p>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Knapperige randjes, romige binnenkant, vers van kolen. De Mae Sunee-stal bij hoek Romanee is de hometown legend. Vraag om "a-pong sai khai" (met ei) voor extra rijkdom.' : 'Crispy edges, custardy centre, off the charcoal. The Mae Sunee stall at the Romanee corner is the hometown legend. Ask for "a-pong sai khai" (with egg) for extra richness.'}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-rose-500">
                <h3 className="font-heading text-lg font-bold text-gray-900">{isNl ? 'Hokkien Mee' : 'Hokkien Mee'}</h3>
                <p className="text-xs text-rose-700 font-semibold mb-1">60–80 THB</p>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Brede gele noedels, wokken in donkere soja, varken, kool, krokante varkensvellen, verse limoen. Phuket Old Town heeft de beste hokkien-noedel-stalls van Thailand — buiten Penang dan.' : 'Wide yellow noodles, wok-fried in dark soy with pork, cabbage, crispy pork crackling, fresh lime. Phuket Old Town arguably has the best Hokkien-mee stalls in Thailand — Penang aside.'}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-emerald-500">
                <h3 className="font-heading text-lg font-bold text-gray-900">{isNl ? 'Oh Tow (oester-omelet)' : 'Oh Tow (oyster omelette)'}</h3>
                <p className="text-xs text-emerald-700 font-semibold mb-1">100 THB</p>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Knapperige rijstmeel-omelet met kleine oesters en kruidenmix, geserveerd met chili-saus. Een Phuket-Hainan-Hokkien fusion-gerecht dat je in Bangkok niet zo eet.' : 'Crispy rice-flour omelette with small oysters and herb mix, served with chili sauce. A Phuket-Hainan-Hokkien fusion dish you do not get in this form in Bangkok.'}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-purple-500">
                <h3 className="font-heading text-lg font-bold text-gray-900">{isNl ? 'Mango Sticky Rice' : 'Mango Sticky Rice'}</h3>
                <p className="text-xs text-purple-700 font-semibold mb-1">60 THB</p>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'In seizoen apr–jun een aanrader. Buiten seizoen: bevroren mango of vacuüm — niet hetzelfde. Vraag "mai khao niao mamuang" en check of de mango oranje en zacht is voor je betaalt.' : 'In season Apr–Jun, this is a must. Off-season vendors use frozen or vacuum mango — not the same. Ask "khao niao mamuang" and check the mango is orange and soft before paying.'}</p>
              </div>
            </div>
          </section>

          {/* When to come / photo tips */}
          <section className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Beste tijden + foto-tips' : 'Best timing + photo tips'}</h2>
            <ul className="space-y-3 text-gray-800 text-sm">
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? '17:00 aankomst' : 'Arrive 17:00'}</strong> — {isNl ? "alle stalls draaien, gouden uur licht voor shophouse-foto's, geen ellebogen in beeld." : 'all stalls running, golden-hour light on the shophouses, elbow-free photos.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? '18:30–20:30 piek' : '18:30–20:30 peak'}</strong> — {isNl ? "beste sfeer, drukste massa, langste rijen. Eet hier, foto's eerder." : 'best vibe, biggest crowds, longest queues. Eat here, photograph earlier.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? '21:00–22:00 staart' : '21:00–22:00 tail'}</strong> — {isNl ? "stalls verkopen rest tegen 30–50% korting. Mango sticky rice 40 THB, Hokkien noedels 50 THB." : 'stalls discount remaining stock 30–50%. Mango sticky rice 40 THB, Hokkien noodles 50 THB.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Soi Romanee combo' : 'Soi Romanee combo'}</strong> — {isNl ? 'om 16:30 langs Soi Romanee voor de gepleisterde shophouse-shots, dan 17:00 op de markt.' : 'walk Soi Romanee at 16:30 for pastel shophouse shots, then 17:00 onto the market.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Lens-tip' : 'Lens tip'}</strong> — {isNl ? '35mm of phone-prime werkt beter dan 24mm. Te wijd vangt te veel zwerm-mensen.' : '35mm or phone prime works better than 24mm. Too wide pulls in too many people-shapes.'}</span></li>
            </ul>
          </section>

          {/* Getting there */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Hoe kom je daar?' : 'Getting there'}</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-base font-bold text-gray-900 mb-1">{isNl ? 'Vanaf Patong' : 'From Patong'}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Grab 50–60 min, ~750 THB ($22). Vertrek 16:30 om voor de 18:00–20:00 file te zijn.' : 'Grab 50–60 min, ~750 THB ($22). Leave 16:30 to beat the 18:00–20:00 jam.'}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-base font-bold text-gray-900 mb-1">{isNl ? 'Vanaf Karon/Kata' : 'From Karon/Kata'}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Grab 35–45 min, ~600 THB. Mooie scooter-rit via 4028 als je rijdt.' : 'Grab 35–45 min, ~600 THB. Lovely scooter ride via 4028 if you ride.'}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-base font-bold text-gray-900 mb-1">{isNl ? 'Parkeren' : 'Parking'}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? "Phuket Provincial Hall-parkeerplaats (50 THB) is 5 min lopen. Op straat parkeren in Old Town: niet doen op zondag — boetes." : 'Phuket Provincial Hall lot (50 THB) is a 5-min walk. On-street parking in Old Town: avoid on Sunday — fines.'}</p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Veelgestelde vragen' : 'Frequently asked questions'}</h2>
            <div className="space-y-3">
              {faqList.map((f, i) => (
                <details key={i} className="rounded-2xl bg-white p-4 shadow-sm border border-gray-200">
                  <summary className="font-semibold text-gray-900 cursor-pointer">{f.q}</summary>
                  <p className="mt-2 text-gray-700 text-sm leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Cluster mesh */}
          <section className="rounded-2xl bg-thailand-blue/10 p-6">
            <h2 className="font-heading text-xl font-bold text-gray-900">{isNl ? 'Verder met Old Town en Phuket' : 'More on Old Town and Phuket'}</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/phuket/old-town/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">{isNl ? '↑ Old Town complete gids' : '↑ Old Town full guide'}</Link>
              <Link href="/phuket/old-town/things-to-do/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🎨 Dingen te doen in Old Town' : '🎨 Things to do in Old Town'}</Link>
              <Link href="/best-hotels/phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏨 Hotels in Phuket' : '🏨 Phuket hotels'}</Link>
              <Link href="/yacht-charter-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '⛵ Yacht charter Phuket' : '⛵ Yacht charter Phuket'}</Link>
              <Link href="/city/phuket/" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">{isNl ? '📖 Phuket reisgids' : '📖 Phuket travel guide'}</Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const file = path.join(process.cwd(), 'data', 'pseo', 'areas', 'old-town-partners.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  return { props: { partners: data.partners, lastUpdated: data.lastUpdated }, revalidate: 604800 };
};
