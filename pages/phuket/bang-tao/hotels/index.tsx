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
interface Partners { trip_pillar: Partner; trip_hotels: Partner; trip_hilton_garden: Partner; klook_pillar: Partner; gyg_pillar: Partner; viator_pillar: Partner; }
interface Props { partners: Partners; lastUpdated: string; }

export default function BangTaoHotelsHub({ partners, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const subId = useSubId();
  const placement = (p: string) => `${subId}-pseo-phuket-bang-tao-hotels-${p}`;

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Phuket', href: '/city/phuket/' },
    { name: 'Bang Tao Beach', href: '/phuket/bang-tao/' },
    { name: isNl ? 'Hotels' : 'Hotels', href: '/phuket/bang-tao/hotels/' },
  ];

  const seoTitle = isNl ? 'Bang Tao Beach Hotels (2026): 8 Beste Vergeleken' : 'Bang Tao Beach Hotels (2026): 8 Best Picks Compared';
  const seoDescription = isNl
    ? 'Op zoek naar een Bang Tao Beach hotel? 8 verblijven vergeleken: Banyan Tree, Hilton Garden Inn, Angsana, $90 budget tot $800 luxe Laguna-resorts.'
    : 'Looking for a Bang Tao Beach hotel? 8 stays compared — Banyan Tree, Hilton Garden Inn, Angsana, $90 budget to $800 Laguna luxury picks.';
  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/phuket/bang-tao/hotels/`;

  const hotels = [
    { name: 'Banyan Tree Phuket', tier: isNl ? 'Luxe villa' : 'Luxury villa', price: '$500–1.200', best: isNl ? 'Honeymoon, privé-pools' : 'Honeymoon, private pools', reviewSlug: null },
    { name: 'Trisara Phuket', tier: isNl ? 'Ultra-luxe' : 'Ultra-luxury', price: '$650–2.000', best: isNl ? 'Ultra-discreet, foodies' : 'Ultra-discreet, foodies', reviewSlug: null },
    { name: 'Angsana Laguna Phuket', tier: 'Luxe familie', price: '$280–550', best: isNl ? 'Luxe families, lagunes' : 'Luxury families, lagoons', reviewSlug: null },
    { name: 'Dusit Thani Laguna Phuket', tier: 'Luxe', price: '$240–480', best: isNl ? 'Beachfront luxe' : 'Beachfront luxury', reviewSlug: null },
    { name: 'Cassia Phuket (Banyan Tree)', tier: 'Mid-luxe', price: '$130–260', best: isNl ? 'Laguna-toegang voor minder' : 'Laguna access for less', reviewSlug: null },
    { name: 'Hilton Garden Inn Phuket Bang Tao', tier: 'Upper-mid', price: '$90–200', best: isNl ? 'Boat Avenue + Hilton points' : 'Boat Avenue + Hilton points', reviewSlug: 'hilton-garden-inn-phuket-bang-tao' },
    { name: 'Centara Grand West Sands', tier: isNl ? 'Mid-range familie' : 'Mid-range family', price: '$110–230', best: isNl ? 'Familie all-round' : 'All-round family', reviewSlug: null },
    { name: 'Outrigger Surin Beach Resort', tier: 'Mid-luxe', price: '$160–320', best: isNl ? 'Beachfront, Surin-grens' : 'Beachfront, Surin border', reviewSlug: null },
  ];

  const faqEn = [
    { q: 'Which is the best value Bang Tao hotel?', a: 'Hilton Garden Inn Phuket Bang Tao at $90–200/night beats most Laguna pricing while sitting 5 min from the same beach and 10 min from Boat Avenue. Hilton Honors points stack normally. Read our full review for the trade-offs.' },
    { q: 'What is Laguna Phuket?', a: 'A 5-hotel luxury estate at the south end of Bang Tao Beach: Banyan Tree, Angsana Laguna, Dusit Thani Laguna, Laguna Beach Resort, and Cassia. Connected by tropical lagoons with free shuttle buses + boats between them. Guests of any one hotel can use facilities at the others (with restrictions).' },
    { q: 'Is Banyan Tree worth $500+/night?', a: "If you want all-villa, all-private-pool, ultra-quiet, top-3-Phuket luxury — yes. If you want a beach holiday with kids in the pool — Cassia or Hilton Garden Inn at one-third the price gets the same beach. Banyan Tree is for occasion stays (anniversaries, honeymoons, milestone birthdays)." },
    { q: 'Are Bang Tao hotels good for families?', a: 'Yes — wide beach with no rocks, lifeguards, kids\' clubs at all 4-star+ resorts, and the Laguna shuttle network is a kid magnet. Best family pick: Angsana Laguna or Centara Grand West Sands. Best family value: Hilton Garden Inn (kids stay free up to 12).' },
    { q: 'How early should I book Bang Tao hotels?', a: 'Christmas/NY: 4–6 months ahead, prices 60–80% above shoulder. High season Dec–Feb: 8–10 weeks for top luxury (Banyan Tree, Trisara). Mid-tier: 3–4 weeks. Low season May–Oct: 1 week is fine.' },
    { q: 'Are Bang Tao hotels walkable to restaurants?', a: 'Most are 10–15 min walk from Boat Avenue, the area\'s 600 m dining strip with 50+ restaurants. Beachfront luxury (Banyan Tree, Trisara) need a shuttle or taxi. Hilton Garden Inn, Cassia, Dusit, Angsana — all walking distance to Boat Avenue.' },
    { q: 'Can I get a non-Laguna luxury hotel at Bang Tao?', a: 'Yes — Trisara (north end, ultra-discreet, $650+), Avani+ Mai Khao Phuket Suites (just north, beachfront, $250+), Outrigger Surin Beach (border with Surin, $160–320). Skipping Laguna means you skip the shuttle network but gain privacy.' },
  ];

  const faqNl = [
    { q: 'Welk is het beste-value Bang Tao hotel?', a: 'Hilton Garden Inn Phuket Bang Tao op $90–200/nacht wint van de meeste Laguna-prijzen, terwijl het 5 min van hetzelfde strand en 10 min van Boat Avenue zit. Hilton Honors-punten gewoon. Lees onze volledige review voor de afwegingen.' },
    { q: 'Wat is Laguna Phuket?', a: 'Een 5-hotel luxe-estate aan de zuidzijde van Bang Tao: Banyan Tree, Angsana Laguna, Dusit Thani Laguna, Laguna Beach Resort en Cassia. Verbonden door tropische lagunes met gratis shuttles + bootjes. Gasten van elk hotel kunnen faciliteiten in de andere gebruiken (met beperkingen).' },
    { q: 'Is Banyan Tree $500+/nacht waard?', a: "Voor all-villa, all-private-pool, ultra-rustig, top-3-Phuket luxe — ja. Voor strandvakantie met kinderen in het zwembad — Cassia of Hilton Garden Inn op 1/3 van de prijs geeft hetzelfde strand. Banyan Tree is voor occasion-verblijven (jubilea, honeymoons)." },
    { q: 'Zijn Bang Tao hotels goed voor families?', a: 'Ja — breed strand zonder rotsen, lifeguards, kinderclubs bij alle 4-sterren+, en het Laguna-shuttlesysteem is een kindermagneet. Beste familie: Angsana Laguna of Centara Grand West Sands. Beste familie-value: Hilton Garden Inn (kinderen tot 12 gratis).' },
    { q: 'Hoe vroeg Bang Tao hotels boeken?', a: 'Kerst/NJ: 4–6 maanden vooruit, prijzen 60–80% boven shoulder. Hoogseizoen dec–feb: 8–10 weken voor topluxe (Banyan Tree, Trisara). Mid-tier: 3–4 weken. Laagseizoen mei–okt: 1 week is genoeg.' },
    { q: 'Zijn Bang Tao hotels loopbaar naar restaurants?', a: 'Meeste zijn 10–15 min lopen van Boat Avenue, de 600 m dining-strook met 50+ restaurants. Beachfront luxe (Banyan Tree, Trisara) hebben shuttle of taxi nodig. Hilton Garden Inn, Cassia, Dusit, Angsana — allemaal loopafstand naar Boat Avenue.' },
    { q: 'Kan ik een niet-Laguna luxe-hotel krijgen op Bang Tao?', a: 'Ja — Trisara (noord, ultra-discreet, $650+), Avani+ Mai Khao Phuket Suites (net noord, beachfront, $250+), Outrigger Surin Beach (grens Surin, $160–320). Buiten Laguna sla je het shuttlesysteem over maar win je privacy.' },
  ];

  const faqList = isNl ? faqNl : faqEn;
  const breadcrumbJsonLd = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: breadcrumbs.map((b, i) => ({ '@type': 'ListItem', position: i + 1, name: b.name, item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}` })) };
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
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/75">{isNl ? 'Bang Tao accommodatie' : 'Bang Tao accommodation'}</p>
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">{isNl ? 'Waar overnachten in Bang Tao Beach: 8 hotels vergeleken' : 'Where to Stay in Bang Tao Beach: 8 Hotels Compared'}</h1>
            <p className="mt-4 text-lg lg:text-xl max-w-3xl opacity-95">{isNl ? "Bang Tao hotels van $90 mid-range tot $2.000 ultra-luxe Trisara-villa's. Laguna-estate, beachfront, Boat Avenue value — de 8 beste opties met prijsklassen, beste voor wie, en directe affiliate-links." : "Bang Tao hotels from $90 mid-range to $2,000 ultra-luxury Trisara villas. Laguna estate, beachfront, Boat Avenue value — the 8 best options with price ranges, who each fits, and direct affiliate links."}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={withSubId(partners.trip_hotels.partnerUrl, placement('hero-trip'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">{isNl ? 'Live tarieven Trip.com' : 'Live rates on Trip.com'} →</a>
              <Link href="/phuket/bang-tao/" className="rounded-full bg-white text-thailand-blue border border-white/40 px-6 py-3 text-base font-semibold hover:bg-white/90">{isNl ? '← Bang Tao gids' : '← Bang Tao guide'}</Link>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">{isNl ? '8 Bang Tao Beach hotels vergeleken' : '8 Bang Tao Beach hotels compared'}</h2>
            <p className="text-gray-600 mb-6">{isNl ? 'Klik om live tarieven of onze diepgaande review te zien.' : 'Click for live rates or our in-depth review.'}</p>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-700"><tr>
                  <th className="text-left font-semibold px-4 py-3">{isNl ? 'Hotel' : 'Hotel'}</th>
                  <th className="text-left font-semibold px-4 py-3">{isNl ? 'Tier' : 'Tier'}</th>
                  <th className="text-left font-semibold px-4 py-3">{isNl ? 'Prijs/nacht' : 'Price/night'}</th>
                  <th className="text-left font-semibold px-4 py-3">{isNl ? 'Beste voor' : 'Best for'}</th>
                  <th className="text-left font-semibold px-4 py-3">{isNl ? 'Boek' : 'Book'}</th>
                </tr></thead>
                <tbody className="divide-y divide-gray-100">
                  {hotels.map((h, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-gray-900">{h.reviewSlug ? <Link href={`/phuket/bang-tao/hotels/${h.reviewSlug}/`} className="text-thailand-blue hover:text-thailand-red hover:underline">{h.name}</Link> : h.name}</td>
                      <td className="px-4 py-3 text-gray-700">{h.tier}</td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{h.price}</td>
                      <td className="px-4 py-3 text-gray-700">{h.best}</td>
                      <td className="px-4 py-3"><a href={withSubId(partners.trip_hotels.partnerUrl, placement(`row-${i}`))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'See rates →'}</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-500">{isNl ? 'Prijzen zijn 2026 hoogseizoen-tarieven (nov–apr). Mei–okt 30–40% lager.' : 'Prices are 2026 high-season rates (Nov–Apr). May–Oct 30–40% lower.'}</p>
          </section>

          <section className="rounded-2xl bg-thailand-red/5 border-2 border-thailand-red p-6">
            <span className="inline-block rounded-full bg-thailand-red text-white text-xs font-bold uppercase tracking-wide px-3 py-1 mb-3">⭐ {isNl ? 'Slimste pick' : 'Smartest pick'}</span>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">Hilton Garden Inn Phuket Bang Tao</h2>
            <p className="text-gray-700 leading-relaxed mb-3">{isNl ? "Voor 70% van Bang Tao-bezoekers is Hilton Garden Inn de juiste call: $90–200/nacht (vs $300+ Laguna), 5 min naar het strand, 10 min naar Boat Avenue, Hilton Honors-punten, dedicated workspace. Niet beachfront, wel toegang tot dezelfde Bang Tao-strook." : "For 70% of Bang Tao visitors Hilton Garden Inn is the right call: $90–200/night (vs $300+ Laguna), 5 min to beach, 10 min to Boat Avenue, Hilton Honors points, dedicated workspace. Not beachfront — but access to the same Bang Tao strip."}</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/phuket/bang-tao/hotels/hilton-garden-inn-phuket-bang-tao/" className="inline-flex items-center rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">{isNl ? 'Lees onze review' : 'Read our review'} →</Link>
              <a href={withSubId(partners.trip_hilton_garden.partnerUrl, placement('toppick'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">{isNl ? 'Bekijk op Trip.com' : 'See on Trip.com'} →</a>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Volledige reviews' : 'In-depth reviews'}</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/phuket/bang-tao/hotels/hilton-garden-inn-phuket-bang-tao/" className="block rounded-2xl bg-white p-5 shadow-sm border border-gray-100 hover:border-thailand-blue"><h3 className="font-heading text-lg font-bold text-gray-900 mb-1">Hilton Garden Inn Phuket Bang Tao</h3><p className="text-sm text-gray-600">{isNl ? '$90–200/nacht • Boat Avenue + Hilton points' : '$90–200/night • Boat Avenue + Hilton points'}</p><p className="text-xs text-thailand-blue mt-2 font-semibold">{isNl ? 'Lees review' : 'Read review'} →</p></Link>
            </div>
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
            <h2 className="font-heading text-xl font-bold text-gray-900">{isNl ? 'Plan je Bang Tao-trip' : 'Plan your Bang Tao trip'}</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/phuket/bang-tao/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">{isNl ? '🏖️ Bang Tao gids' : '🏖️ Bang Tao guide'}</Link>
              <Link href="/phuket/kamala/hotels/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏨 Kamala hotels' : '🏨 Kamala hotels'}</Link>
              <Link href="/phuket/kata/hotels/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏨 Kata hotels' : '🏨 Kata hotels'}</Link>
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
  const file = path.join(process.cwd(), 'data', 'pseo', 'areas', 'bang-tao-partners.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  return { props: { partners: data.partners, lastUpdated: data.lastUpdated }, revalidate: 604800 };
};
