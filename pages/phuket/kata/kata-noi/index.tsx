import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import SEOHead from '../../../../components/SEOHead';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import { withSubId } from '../../../../lib/affiliates';
import { useSubId } from '../../../../lib/useSubId';

interface Partner { partnerUrl: string; label: string; }
interface Partners { trip_kata_noi: Partner; klook_kata_noi: Partner; trip_pillar: Partner; klook_pillar: Partner; }
interface Props { partners: Partners; lastUpdated: string; }

export default function KataNoiPage({ partners, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const subId = useSubId();
  const placement = (p: string) => `${subId}-pseo-phuket-kata-noi-${p}`;

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Phuket', href: '/city/phuket/' },
    { name: 'Kata Beach', href: '/phuket/kata/' },
    { name: 'Kata Noi', href: '/phuket/kata/kata-noi/' },
  ];

  const seoTitle = isNl ? 'Kata Noi Beach Phuket (2026): Rust + Hotels' : 'Kata Noi Beach Phuket (2026): Quiet Cove + Best Hotels';
  const seoDescription = isNl
    ? 'Op zoek naar Kata Noi Beach? Phuket\'s rustigste broertje van Kata — 700 m strand, 4 hotels, geen dorp, beste voor stellen die van Patong en drukte willen ontsnappen.'
    : 'Heading to Kata Noi Beach? Phuket\'s quieter sibling of Kata — 700 m of sand, 4 hotels, no village, best for couples escaping Patong crowds. Honest 2026 guide.';
  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/phuket/kata/kata-noi/`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({ '@type': 'ListItem', position: i + 1, name: b.name, item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}` })),
  };

  const faqEn = [
    { q: 'Where exactly is Kata Noi Beach?', a: 'Kata Noi sits over the southern headland from main Kata Beach, about 1.5 km / 5 min by scooter or 20 min walk via the cliff road. It\'s a self-contained 700 m crescent with one road, four hotels, and almost zero independent businesses.' },
    { q: 'Is Kata Noi quieter than Kata?', a: 'Markedly — half the sun-loungers, no day-trippers from Patong, no surf school crowds, and the village noise stops at the headland. The trade-off: you\'ll walk back to main Kata for any restaurant variety, and the strip\'s entire dining scene fits in two resort restaurants.' },
    { q: 'Which Kata Noi hotel should I book?', a: 'Katathani Phuket Beach Resort dominates the strip with 489 rooms across the central beachfront — it owns the experience for most visitors. The Shore at Katathani (adults-only sister, $300+/night) or smaller Mom Tri\'s Villa Royale ($400+ boutique) are the alternatives. Avista Hideaway is technically Kata Noi but on the hill, not beachfront.' },
    { q: 'Can you walk between Kata Noi and Kata?', a: 'Yes — a 15-min cliff road over the headland (pavement, gentle hill, no shade) or 25 min along the beach at low tide (impossible at high tide because of the rock). Most travelers scooter the road for $5 round trip via songthaew.' },
    { q: 'Does Kata Noi have surf?', a: 'Bigger swell than Kata Yai during peak monsoon (Jul–Sep) because the headland focuses the south-west swell. But the line-up is small (50 m wide), the rip-current is stronger, and there are no surf schools on Kata Noi itself — instructors bring intermediate students over from main Kata only on big days.' },
    { q: 'Is Kata Noi family-friendly?', a: 'Yes for low-key families who don\'t need an entertainment programme — Katathani has kids\' pools, kids\' club, and a sandcastle-friendly beach. No, for families wanting walkable restaurants/activities — there\'s nothing within walking distance except your hotel\'s offering.' },
    { q: 'How much does Kata Noi cost vs main Kata?', a: 'Hotel rates on Kata Noi are 20–40% above similar-class Kata Beach options because of beachfront position and lower competition. Katathani $200–350/night vs $130–250 for similar-tier Kata. Worth it for couples wanting peace; not worth it for groups who\'ll spend half their time in main Kata anyway.' },
  ];

  const faqNl = [
    { q: 'Waar ligt Kata Noi Beach precies?', a: 'Kata Noi ligt over de zuidelijke landtong vanaf hoofd-Kata, ongeveer 1,5 km / 5 min met scooter of 20 min lopen via de cliff-weg. Een afgesloten 700 m halve-cirkel met één straat, vier hotels en bijna geen onafhankelijke ondernemingen.' },
    { q: 'Is Kata Noi rustiger dan Kata?', a: 'Duidelijk — halve het aantal ligbedjes, geen dagtoeristen uit Patong, geen surfschoolmenigte, en het dorpsgeluid stopt bij de landtong. Trade-off: je loopt terug naar hoofd-Kata voor restaurantvariatie, en de hele dining-scene past in twee resort-restaurants.' },
    { q: 'Welk Kata Noi hotel moet ik boeken?', a: 'Katathani Phuket Beach Resort domineert de strook met 489 kamers over het centrale beachfront — het bepaalt de ervaring voor de meeste bezoekers. The Shore at Katathani (adults-only zusje, $300+/nacht) of kleinere Mom Tri\'s Villa Royale ($400+ boutique) zijn alternatieven. Avista Hideaway is technisch Kata Noi maar op de heuvel.' },
    { q: 'Kun je tussen Kata Noi en Kata lopen?', a: 'Ja — 15 min cliff-weg over de landtong (asfalt, lichte heuvel, geen schaduw) of 25 min over het strand bij eb (onmogelijk bij vloed door de rotsen). Meeste reizigers nemen songthaew voor $5 retour.' },
    { q: 'Heeft Kata Noi surf?', a: 'Grotere swell dan Kata Yai tijdens piekmoesson (jul–sep) door de landtong-focus. Maar de line-up is klein (50 m breed), de stroming sterker, en er zijn geen surfscholen op Kata Noi — instructeurs nemen op grote dagen intermediates mee van hoofd-Kata.' },
    { q: 'Is Kata Noi familievriendelijk?', a: "Ja voor low-key families zonder behoefte aan entertainment — Katathani heeft kinderbaden, kinderclub en zandkasteel-strand. Nee voor families die loopbare restaurants/activiteiten willen — er is niets op loopafstand behalve je hotel." },
    { q: 'Hoeveel kost Kata Noi vs hoofd-Kata?', a: 'Kata Noi-tarieven zijn 20–40% boven vergelijkbare Kata-opties door beachfront-positie en lagere concurrentie. Katathani $200–350/nacht vs $130–250 voor vergelijkbare Kata. De moeite voor stellen die rust willen; minder voor groepen die toch de helft van de tijd in hoofd-Kata zijn.' },
  ];

  const faqList = isNl ? faqNl : faqEn;
  const faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqList.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };

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
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/75">{isNl ? 'Het rustige zusje' : 'The quiet sibling'}</p>
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">{isNl ? 'Kata Noi Beach Phuket: 700 meter rust over de landtong' : 'Kata Noi Beach Phuket: 700 m of Quiet Over the Headland'}</h1>
            <p className="mt-4 text-lg lg:text-xl max-w-3xl opacity-95">{isNl ? 'Kata Noi is wat Kata was vóór de scooters arriveerden. Eén weg, vier hotels, geen dorp — alleen 700 m wit zand over de landtong vanaf de drukke buurman. Hier is wanneer Kata Noi zinvol is, welk hotel te kiezen, en waarom je ondanks de prijs misschien terugkeert.' : "Kata Noi is what Kata used to be before the scooters arrived. One road, four hotels, no village — just 700 m of white sand over the headland from its noisier neighbour. Here's when Kata Noi makes sense, which hotel to pick, and why you might come back despite the price tag."}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={withSubId(partners.trip_kata_noi.partnerUrl, placement('hero-trip'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">{isNl ? 'Kata Noi hotels op Trip.com' : 'Kata Noi hotels on Trip.com'} →</a>
              <Link href="/phuket/kata/" className="rounded-full bg-white text-thailand-blue border border-white/40 px-6 py-3 text-base font-semibold hover:bg-white/90">{isNl ? '← Hoofd-Kata gids' : '← Main Kata guide'}</Link>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <section className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Kata Noi vs Kata Yai' : 'Kata Noi vs Kata Yai'}</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-700"><tr>
                  <th className="text-left font-semibold px-4 py-3"></th>
                  <th className="text-left font-semibold px-4 py-3">Kata Noi</th>
                  <th className="text-left font-semibold px-4 py-3">Kata Yai (main)</th>
                </tr></thead>
                <tbody className="divide-y divide-gray-100">
                  <tr><td className="px-4 py-3 font-semibold">{isNl ? 'Lengte' : 'Length'}</td><td className="px-4 py-3">700 m</td><td className="px-4 py-3">1.5 km</td></tr>
                  <tr><td className="px-4 py-3 font-semibold">{isNl ? 'Hotels' : 'Hotels'}</td><td className="px-4 py-3">4</td><td className="px-4 py-3">25+</td></tr>
                  <tr><td className="px-4 py-3 font-semibold">{isNl ? 'Restaurants buiten hotel' : 'Restaurants outside hotels'}</td><td className="px-4 py-3">0</td><td className="px-4 py-3">30+</td></tr>
                  <tr><td className="px-4 py-3 font-semibold">{isNl ? 'Drukte' : 'Crowd'}</td><td className="px-4 py-3">{isNl ? 'Laag' : 'Low'}</td><td className="px-4 py-3">{isNl ? 'Middel' : 'Medium'}</td></tr>
                  <tr><td className="px-4 py-3 font-semibold">{isNl ? 'Surf jul–sep' : 'Surf Jul–Sep'}</td><td className="px-4 py-3">{isNl ? 'Groter, smaller' : 'Bigger, narrower'}</td><td className="px-4 py-3">{isNl ? 'Gevarieerder' : 'More varied'}</td></tr>
                  <tr><td className="px-4 py-3 font-semibold">{isNl ? 'Hotelprijs' : 'Hotel pricing'}</td><td className="px-4 py-3">$$$ (premium)</td><td className="px-4 py-3">$$ – $$$$</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Wie kiest Kata Noi?' : 'Who picks Kata Noi?'}</h2>
            <p className="text-gray-700 leading-relaxed mb-3">{isNl ? "Stellen op rust-zoekend honeymoon, gepensioneerden die druk willen vermijden, herhaal-bezoekers van Phuket die hoofd-Kata al kennen. Niet voor: eerste-keer Phuket-bezoekers (mis te veel), groepen op zoek naar avondvariatie, surf-beginners (geen scholen op Kata Noi)." : "Couples on quiet-seeking honeymoons, retirees avoiding the bustle, repeat Phuket visitors who already know main Kata. Not for: first-time Phuket visitors (you'll miss too much), groups wanting nightlife variety, beginner surfers (no schools on Kata Noi)."}</p>
            <p className="text-gray-700 leading-relaxed">{isNl ? "Beste seizoen: nov–apr (kalm zwemmen, droog). Mei–okt loont alleen als je aan de hotel-zwembad verbonden bent — zwemmen kan rood gevlagd zijn." : "Best season: Nov–Apr (calm swimming, dry). May–Oct only worth it if you're tied to the hotel pool — swimming may be red-flagged."}</p>
          </section>

          <section className="rounded-2xl bg-thailand-red/5 border-2 border-thailand-red p-6">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Top hotel: Katathani Phuket Beach Resort' : 'Top hotel: Katathani Phuket Beach Resort'}</h2>
            <p className="text-gray-700 leading-relaxed mb-3">{isNl ? "489 kamers verdeeld over twee vleugels die het centrale Kata Noi-strandfront bezetten. Zes zwembaden, zes restaurants, kinderclub, spa, beachfront cabana's. $200–350/nacht hoogseizoen. Echt aan zee — open je kamerdeur, ren naar zand. De facto vrijwel het enige strand-experience van Kata Noi." : "489 rooms across two wings occupying central Kata Noi beachfront. Six pools, six restaurants, kids' club, spa, beachfront cabanas. $200–350/night high season. Truly beachfront — open your room, run to sand. Effectively the entire Kata Noi beach experience."}</p>
            <a href={withSubId(partners.trip_kata_noi.partnerUrl, placement('toppick'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">{isNl ? 'Bekijk Katathani' : 'See Katathani'} →</a>
          </section>

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

          <section className="rounded-2xl bg-thailand-blue/10 p-6">
            <h2 className="font-heading text-xl font-bold text-gray-900">{isNl ? 'Plan je Kata-trip' : 'Plan your Kata trip'}</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/phuket/kata/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">{isNl ? '🏖️ Hoofd-Kata gids' : '🏖️ Main Kata guide'}</Link>
              <Link href="/phuket/kata/hotels/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏨 Kata hotels' : '🏨 Kata hotels'}</Link>
              <Link href="/phuket/kata/surfing/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏄 Surfen op Kata' : '🏄 Surfing at Kata'}</Link>
              <Link href="/phuket/kamala/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏝️ Kamala' : '🏝️ Kamala'}</Link>
              <Link href="/phuket/surin/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏝️ Surin' : '🏝️ Surin'}</Link>
              <Link href="/best-hotels/phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏨 Alle Phuket hotels' : '🏨 All Phuket hotels'}</Link>
              <Link href="/city/phuket/" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">{isNl ? '📖 Phuket reisgids' : '📖 Phuket travel guide'}</Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const file = path.join(process.cwd(), 'data', 'pseo', 'areas', 'kata-partners.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  return { props: { partners: data.partners, lastUpdated: data.lastUpdated }, revalidate: 604800 };
};
