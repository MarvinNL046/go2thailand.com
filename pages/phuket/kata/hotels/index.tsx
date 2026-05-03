import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import SEOHead from '../../../../components/SEOHead';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import { withSubId, TRIP_GENERIC } from '../../../../lib/affiliates';
import { useSubId } from '../../../../lib/useSubId';

interface Partner { partnerUrl: string; label: string; }
interface Partners { trip_pillar: Partner; trip_hotels: Partner; klook_pillar: Partner; gyg_pillar: Partner; viator_pillar: Partner; }
interface Props { partners: Partners; lastUpdated: string; }

export default function KataHotelsHub({ partners, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const subId = useSubId();
  const placement = (p: string) => `${subId}-pseo-phuket-kata-hotels-${p}`;

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Phuket', href: '/city/phuket/' },
    { name: 'Kata Beach', href: '/phuket/kata/' },
    { name: isNl ? 'Hotels' : 'Hotels', href: '/phuket/kata/hotels/' },
  ];

  const seoTitle = isNl ? 'Kata Beach Hotels (2026): 8 Beste Vergeleken' : 'Kata Beach Hotels (2026): 8 Best Picks Compared';
  const seoDescription = isNl
    ? 'Op zoek naar een Kata Beach hotel in Phuket? 8 verblijven vergeleken: $30 hostels tot $500 luxe, beachfront vs dorp, beste voor families/koppels/surf.'
    : 'Looking for a Kata Beach hotel in Phuket? 8 stays compared — $30 hostels to $500 luxury, beachfront vs village, best for families, couples and surfers.';
  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/phuket/kata/hotels/`;

  const hotels = [
    { name: 'Kata Rocks', tier: isNl ? 'Luxe beachfront' : 'Luxury beachfront', price: '$380–650', best: isNl ? 'Romantiek, infinity-suites' : 'Romance, infinity suites', rooms: '34 villa\'s' },
    { name: 'The Boathouse Phuket', tier: isNl ? 'Boutique luxe' : 'Boutique luxury', price: '$240–420', best: isNl ? 'Stellen, fine dining' : 'Couples, fine dining', rooms: '38' },
    { name: 'Beyond Kata', tier: 'Upper-mid', price: '$140–250', best: isNl ? 'Familie + zwembad' : 'Family + pool', rooms: '187' },
    { name: 'Centara Kata Resort', tier: 'Mid-range', price: '$110–200', best: isNl ? 'Familie all-round' : 'All-round family', rooms: '158' },
    { name: 'Kata Sea Breeze Resort', tier: 'Mid-range', price: '$95–170', best: isNl ? '5 min naar zand, value' : '5 min to sand, value', rooms: '52' },
    { name: 'Sugar Marina Resort — Surf', tier: isNl ? 'Surf-themed' : 'Surf-themed', price: '$80–140', best: isNl ? 'Surfers, jonge stellen' : 'Surfers, young couples', rooms: '170' },
    { name: 'Kata Palm Resort & Spa', tier: 'Mid-range', price: '$70–130', best: isNl ? 'Budget-vriendelijk gezin' : 'Budget-friendly family', rooms: '218' },
    { name: 'Lub d Phuket Kata Beach', tier: isNl ? 'Hostel/poshtel' : 'Hostel/poshtel', price: '$30–80', best: isNl ? 'Solo + groep' : 'Solo + group', rooms: '189' },
  ];

  const faqEn = [
    { q: 'Are Kata Beach hotels right on the sand?', a: 'A few are. Kata Rocks, The Boathouse, and Centara Kata Resort sit directly on the beach (0–50 m). Beyond Kata is across a quiet road. Most other hotels are 200–500 m inland — a 3–7 minute walk through the village to the sand. The "beachfront premium" runs about $60–100/night extra for nearly identical rooms.' },
    { q: 'Which Kata Beach hotel is best for families?', a: 'Beyond Kata (kids\' pool, family rooms sleeping 4, sandcastle programme) and Centara Kata Resort (kids\' club, three pools, walking distance to restaurants) are the consensus picks. Both $130–220/night. Kata Palm Resort is the budget family option at $70–130 with two pools and family rooms.' },
    { q: 'How early should I book Kata Beach hotels?', a: 'High season Dec–Feb: 6–8 weeks ahead for the top three (Kata Rocks, Boathouse, Beyond Kata). Mid-tier: 3–4 weeks. Low season May–Oct: 1 week is fine. Christmas/New Year: 4–6 months ahead, prices 60–80% above the rest of the year.' },
    { q: 'Are Kata hotels good for surfers?', a: 'Sugar Marina Resort — Surf is the only theme-built option (board storage, surf school discounts, in-house instructors). Lub d Phuket Kata Beach has board lockers and is closest to Phuket Surf school. Both run May–Oct surf packages combining stay + lessons + board rental at 20–30% off list.' },
    { q: 'What is the difference between Kata and Karon hotels?', a: 'Karon has more 5-star resorts (Pullman, Centara Grand) and a longer beach. Kata has a tighter village feel with restaurants closer to the hotels, and is the only Phuket beach with a surf scene. Pricing roughly equal mid-range; Karon edges out at the very top end.' },
    { q: 'Do Kata Beach hotels include breakfast?', a: 'Most mid-range and luxury Kata hotels include breakfast as standard or as a $15–25/night upgrade. Hostels and budget guesthouses rarely do. Kata\'s village has 30+ café/breakfast options for $4–8 — skipping the hotel breakfast is often better value if you\'re willing to walk 5 min.' },
    { q: 'Is it worth staying at Kata Noi instead of Kata?', a: 'Only if quiet matters more than walkable dining. Kata Noi has 4–5 hotels (mostly Katathani Phuket Beach Resort and small boutiques), zero village, one road back to the main Kata strip. Couples wanting peace prefer Kata Noi; first-time visitors want main Kata.' },
  ];

  const faqNl = [
    { q: 'Liggen Kata Beach hotels direct aan zee?', a: 'Een paar. Kata Rocks, The Boathouse en Centara Kata Resort liggen direct aan het strand (0–50 m). Beyond Kata is over een rustige straat. Meeste andere hotels zijn 200–500 m landinwaarts — 3–7 min lopen door het dorp. De "beachfront-premie" is ongeveer $60–100/nacht extra voor vrijwel dezelfde kamer.' },
    { q: 'Welk Kata Beach hotel is het beste voor families?', a: 'Beyond Kata (kinderbad, familiekamers voor 4, zandkasteel-programma) en Centara Kata Resort (kinderclub, drie zwembaden, loopafstand restaurants) zijn de consensus-keuzes. Beide $130–220/nacht. Kata Palm Resort is de budget-familieoptie op $70–130 met twee zwembaden en familiekamers.' },
    { q: 'Hoe vroeg moet ik Kata Beach hotels boeken?', a: 'Hoogseizoen dec–feb: 6–8 weken vooruit voor de top drie. Mid-tier: 3–4 weken. Laagseizoen mei–okt: 1 week voldoende. Kerst/Nieuwjaar: 4–6 maanden vooruit, prijzen 60–80% boven de rest van het jaar.' },
    { q: 'Zijn Kata hotels goed voor surfers?', a: 'Sugar Marina Resort — Surf is de enige themabouw (board-opslag, korting op surfschool, in-house instructeurs). Lub d Phuket Kata Beach heeft board-lockers en is dichtst bij Phuket Surf-school. Beide bieden mei–okt surfpakketten met 20–30% korting.' },
    { q: 'Wat is het verschil tussen Kata- en Karon-hotels?', a: 'Karon heeft meer 5-sterren resorts (Pullman, Centara Grand) en een langer strand. Kata heeft een hechter dorpsgevoel en is het enige Phuket-strand met een surf-scene. Mid-range prijzen vergelijkbaar; Karon wint aan de top.' },
    { q: 'Inclusief ontbijt bij Kata Beach hotels?', a: 'Meeste mid-range en luxe Kata-hotels hebben ontbijt standaard of als $15–25/nacht-upgrade. Hostels en budget-guesthouses zelden. Het Kata-dorp heeft 30+ ontbijtgelegenheden voor $4–8 — overslaan is vaak beter als je 5 min wilt lopen.' },
    { q: 'Loont Kata Noi i.p.v. Kata?', a: 'Alleen als rust belangrijker is dan loopbare dining. Kata Noi heeft 4–5 hotels (vooral Katathani), geen dorp, één straat naar Kata. Stellen die rust willen kiezen Kata Noi; eerste-keer bezoekers willen Kata.' },
  ];

  const faqList = isNl ? faqNl : faqEn;
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({ '@type': 'ListItem', position: i + 1, name: b.name, item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}` })),
  };
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
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/75">{isNl ? 'Kata accommodatie' : 'Kata accommodation'}</p>
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">{isNl ? 'Waar overnachten in Kata Beach: 8 hotels vergeleken' : 'Where to Stay in Kata Beach: 8 Hotels Compared'}</h1>
            <p className="mt-4 text-lg lg:text-xl max-w-3xl opacity-95">{isNl ? 'Kata Beach hotels lopen van $30 hostels tot $650 cliff-suites. Beachfront, dorpsmiddenpunt en surf-georiënteerd — hier vind je de 8 beste opties voor families, koppels en surfers, met eerlijke prijsklassen en wie het beste bij je past.' : 'Kata Beach hotels run from $30 hostels to $650 cliff-side suites. Beachfront, village-centre, and surf-focused — here are the 8 best stays for families, couples and surfers, with honest price ranges and who each fits.'}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={withSubId(partners.trip_hotels.partnerUrl, placement('hero-trip'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">{isNl ? 'Live tarieven Trip.com' : 'Live rates on Trip.com'} →</a>
              <Link href="/phuket/kata/" className="rounded-full bg-white text-thailand-blue border border-white/40 px-6 py-3 text-base font-semibold hover:bg-white/90">{isNl ? '← Kata Beach gids' : '← Kata Beach guide'}</Link>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">{isNl ? '8 Kata Beach hotels vergeleken' : '8 Kata Beach hotels compared'}</h2>
            <p className="text-gray-600 mb-6">{isNl ? 'Klik om live tarieven te zien (we verdienen een kleine commissie zonder dat het jou iets extra kost).' : 'Click to see live rates (we earn a small commission at no extra cost to you).'}</p>
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
                      <td className="px-4 py-3 font-semibold text-gray-900">{h.name}</td>
                      <td className="px-4 py-3 text-gray-700">{h.tier}</td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{h.price}</td>
                      <td className="px-4 py-3 text-gray-700">{h.best}</td>
                      <td className="px-4 py-3"><a href={withSubId(partners.trip_hotels.partnerUrl, placement(`row-${i}`))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'See rates →'}</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-500">{isNl ? 'Prijzen zijn 2026 hoogseizoen-tarieven (nov–apr). Mei–okt 30–40% lager. Resort fees + transfers vaak apart.' : 'Prices are 2026 high-season rates (Nov–Apr). May–Oct 30–40% lower. Resort fees + transfers often extra.'}</p>
          </section>

          <section className="rounded-2xl bg-thailand-red/5 border-2 border-thailand-red p-6">
            <span className="inline-block rounded-full bg-thailand-red text-white text-xs font-bold uppercase tracking-wide px-3 py-1 mb-3">⭐ {isNl ? 'Onze keuze voor de meesten' : 'Our pick for most'}</span>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">Beyond Kata</h2>
            <p className="text-gray-700 leading-relaxed mb-3">{isNl ? '90% van Kata-bezoekers heeft hier het meest aan: $140–250/nacht, drie zwembaden, kinderbad, familiekamers tot 4 personen, 3 min lopen naar zand, sterke ontbijten. Niet de allerbeste sea-view (Kata Rocks/Boathouse winnen daarop), wel het beste prijs-kwaliteit-pakket op het strand.' : "For 90% of Kata visitors this is the right call: $140–250/night, three pools, kids' pool, family rooms up to 4, 3 min walk to sand, strong breakfasts. Not the absolute best ocean view (Kata Rocks/Boathouse win there), but the strongest value-on-the-beach package."}</p>
            <a href={withSubId(partners.trip_hotels.partnerUrl, placement('toppick'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">{isNl ? 'Bekijk Beyond Kata →' : 'See Beyond Kata →'}</a>
          </section>

          {/* By type */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Beste hotel per reizigerstype' : 'Best hotel by traveller type'}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100"><h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? '🌟 Romantiek & honeymoon' : '🌟 Romance & honeymoon'}</h3><p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Kata Rocks (cliff-pool villa\'s, $380+) of The Boathouse (intieme 38 kamers, sterke wijnkaart). Beide direct aan zee.' : 'Kata Rocks (cliff-pool villas, $380+) or The Boathouse (intimate 38 rooms, strong wine list). Both beachfront.'}</p></div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100"><h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? '👨‍👩‍👧 Familie' : '👨‍👩‍👧 Family'}</h3><p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Beyond Kata of Centara Kata Resort. Beide hebben kinderbad, familiekamers en kinderclub. $130–220/nacht.' : "Beyond Kata or Centara Kata Resort. Both have kids' pool, family rooms and kids' club. $130–220/night."}</p></div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100"><h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? '🏄 Surfers' : '🏄 Surfers'}</h3><p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Sugar Marina Resort — Surf (board-opslag, surf-pakketten) of Lub d (hostel-prijzen, dichtst bij Phuket Surf school).' : 'Sugar Marina Resort — Surf (board storage, surf packages) or Lub d (hostel pricing, closest to Phuket Surf school).'}</p></div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100"><h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? '💸 Budget' : '💸 Budget'}</h3><p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Lub d Kata Beach (hostel + privé-kamers $30–80) of Kata Palm Resort ($70–130 met twee pools).' : 'Lub d Kata Beach (hostel + private rooms $30–80) or Kata Palm Resort ($70–130 with two pools).'}</p></div>
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
            <h2 className="font-heading text-xl font-bold text-gray-900">{isNl ? 'Plan je Kata-trip' : 'Plan your Kata trip'}</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/phuket/kata/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">{isNl ? '🏖️ Kata Beach gids' : '🏖️ Kata Beach guide'}</Link>
              <Link href="/phuket/kata/surfing/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏄 Surfen op Kata' : '🏄 Surfing at Kata'}</Link>
              <Link href="/phuket/kata/kata-noi/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏝️ Kata Noi' : '🏝️ Kata Noi'}</Link>
              <Link href="/phuket/kamala/hotels/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏨 Kamala hotels' : '🏨 Kamala hotels'}</Link>
              <Link href="/phuket/bang-tao/hotels/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏨 Bang Tao hotels' : '🏨 Bang Tao hotels'}</Link>
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
