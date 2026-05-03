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
interface Partners { trip_pillar: Partner; trip_hotels: Partner; trip_novotel: Partner; trip_sunwing: Partner; trip_sunprime: Partner; }

interface HotelLite { slug: string; name: string; tier: string; priceFrom: number; priceTo: number; tripPartnerKey: keyof Partners; }

interface Props { partners: Partners; lastUpdated: string; hotels: HotelLite[]; }

export default function KamalaHotelsHub({ partners, lastUpdated, hotels }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const subId = useSubId();
  const placement = (p: string) => `${subId}-pseo-phuket-kamala-hotels-${p}`;

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Phuket', href: '/city/phuket/' },
    { name: 'Kamala Beach', href: '/phuket/kamala/' },
    { name: isNl ? 'Hotels' : 'Hotels', href: '/phuket/kamala/hotels/' },
  ];

  const seoTitle = isNl ? 'Kamala Beach Hotels (2026): 8 Beste Vergeleken' : 'Kamala Beach Hotels (2026): 8 Best Picks Compared';
  const seoDescription = isNl
    ? 'Op zoek naar een Kamala Beach hotel? 8 verblijven vergeleken: Novotel, Sunwing, Sunprime, $90 budget tot $400 cliff-villas, beachfront vs dorp.'
    : 'Looking for a Kamala Beach hotel? 8 stays compared — Novotel, Sunwing, Sunprime, $90 budget to $400 cliff villas, beachfront vs village picks.';
  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/phuket/kamala/hotels/`;

  const featuredHotels = [
    { name: 'Novotel Phuket Kamala Beach', tier: isNl ? 'Upper-mid familie' : 'Upper-mid family', price: '$95–220', best: isNl ? 'Accor-vertrouwen' : 'Accor reliability', reviewSlug: 'novotel-phuket-kamala-beach' },
    { name: 'Sunwing Kamala Beach', tier: isNl ? 'Familie all-in' : 'Family all-incl', price: '$130–260', best: isNl ? 'Scandinavische families' : 'Scandinavian families', reviewSlug: 'sunwing-kamala-beach' },
    { name: 'Sunprime Kamala Beach', tier: 'Adults-only', price: '$140–280', best: isNl ? 'Stellen, geen kinderen' : 'Couples, no kids', reviewSlug: 'sunprime-kamala-beach' },
    { name: 'Andara Resort & Villas', tier: isNl ? 'Luxe villa' : 'Luxury villa', price: '$300–650', best: isNl ? 'Honeymoon' : 'Honeymoon', reviewSlug: null },
    { name: 'The Cape Phuket', tier: isNl ? 'Boutique luxe' : 'Boutique luxury', price: '$220–400', best: isNl ? 'Cliff-views, stellen' : 'Cliff views, couples', reviewSlug: null },
    { name: 'Hyatt Regency Phuket Resort', tier: 'Mid-luxe', price: '$160–290', best: isNl ? 'World of Hyatt punten' : 'World of Hyatt points', reviewSlug: null },
    { name: 'Kamala Beach Resort (a Sunprime Resort)', tier: 'Mid-range', price: '$110–200', best: isNl ? 'Familie + budget' : 'Family + budget', reviewSlug: null },
    { name: 'Print Kamala Resort', tier: 'Mid-range', price: '$90–160', best: isNl ? 'Value beachfront' : 'Value beachfront', reviewSlug: null },
  ];

  const faqEn = [
    { q: 'Which Kamala Beach hotel is best for families?', a: 'Sunwing Kamala Beach (Scandinavian charter favourite, all-inclusive, six pools, kids\' club in 4 languages, $130–260) is the consensus pick for families. Novotel is the Accor-reliable alternative ($95–220). Both have direct beach access.' },
    { q: 'Which Kamala Beach hotel is best for couples?', a: 'Sunprime Kamala Beach (adults-only sister to Sunwing, $140–280) for value. The Cape Phuket (cliff-side, $220–400) for boutique luxury. Andara Resort & Villas ($300–650) for honeymoon-level privacy with private pools.' },
    { q: 'Are all Kamala hotels beachfront?', a: 'Most are — Kamala\'s narrow strip means you\'re rarely more than 100 m from sand. Novotel sits across a quiet residential lane (1 min walk). Sunwing/Sunprime share a beachfront plot. Andara and The Cape are cliff-front rather than sand-front. Only a handful of mid-tier hotels are 200–400 m inland.' },
    { q: 'How early should I book Kamala hotels?', a: 'Christmas/NY: 4–6 months ahead, prices 60–80% above shoulder. High season Dec–Feb: 6–8 weeks for top three. Mid-tier: 3–4 weeks. Low season May–Oct: 1 week is fine.' },
    { q: 'Is Sunwing or Novotel better for first-time visitors?', a: 'Novotel if you want freedom to eat in the village and explore (not all-inclusive), Sunwing if you want everything bundled at known cost. Sunwing\'s all-inclusive maths only beats Novotel + village-eating if you stay 5+ nights and drink a lot of cocktails.' },
    { q: 'Can I walk between Kamala hotels?', a: 'Yes — the entire strip is walkable in 25 min end to end. Novotel (north end) to Sunwing/Sunprime (south end) is 20 min on the beach (low tide) or 25 min via the road. Most travelers walk to the village restaurant strip in 10 min from any hotel.' },
    { q: 'Do Kamala hotels include airport transfer?', a: 'Most 4-star+ hotels include free airport transfer for stays of 3+ nights. Novotel, Sunwing, Sunprime, Andara, The Cape all do at minimum a paid transfer service ($18–25 one-way). Confirm at booking.' },
  ];

  const faqNl = [
    { q: 'Welk Kamala Beach hotel is het beste voor families?', a: 'Sunwing Kamala Beach (Scandinavische charter-favoriet, all-inclusive, zes zwembaden, kinderclub in 4 talen, $130–260) is de consensus. Novotel is de Accor-betrouwbare alternatief ($95–220). Beide direct aan zee.' },
    { q: 'Welk Kamala Beach hotel is het beste voor stellen?', a: 'Sunprime Kamala Beach (adults-only zusje van Sunwing, $140–280) voor value. The Cape Phuket (cliff, $220–400) voor boutique luxe. Andara Resort & Villas ($300–650) voor honeymoon-privacy met private pools.' },
    { q: 'Liggen alle Kamala hotels aan zee?', a: 'De meeste wel — Kamala\'s smalle strook betekent dat je zelden meer dan 100 m van zand bent. Novotel ligt over een rustig zijstraatje (1 min lopen). Sunwing/Sunprime delen een beachfront-plot. Andara en The Cape zijn cliff-front ipv zand-front. Slechts enkele mid-tier hotels zijn 200–400 m landinwaarts.' },
    { q: 'Hoe vroeg Kamala hotels boeken?', a: 'Kerst/NJ: 4–6 maanden vooruit, prijzen 60–80% boven shoulder. Hoogseizoen dec–feb: 6–8 weken voor top drie. Mid-tier: 3–4 weken. Laagseizoen mei–okt: 1 week is genoeg.' },
    { q: 'Sunwing of Novotel beter voor eerste-keer bezoekers?', a: 'Novotel als je vrijheid wilt om in het dorp te eten en te ontdekken (niet all-in), Sunwing als je alles gebundeld in vaste kosten wilt. Sunwing\'s all-in rekenkundig pas beter dan Novotel + dorps-eten bij 5+ nachten verblijf en veel cocktails.' },
    { q: 'Kun je tussen Kamala-hotels lopen?', a: 'Ja — de hele strook is in 25 min van eind naar eind te lopen. Novotel (noord) naar Sunwing/Sunprime (zuid): 20 min over strand (eb) of 25 min via weg. De meeste reizigers lopen vanaf elk hotel in 10 min naar de dorpsrestaurantenstrook.' },
    { q: 'Hebben Kamala hotels airport transfer?', a: 'Meeste 4-sterren+ hotels hebben gratis transfer bij verblijf van 3+ nachten. Novotel, Sunwing, Sunprime, Andara, The Cape allemaal minimaal betaalde transfer ($18–25 enkele reis). Bevestig bij boeking.' },
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
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/75">{isNl ? 'Kamala accommodatie' : 'Kamala accommodation'}</p>
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">{isNl ? 'Waar overnachten in Kamala Beach: 8 hotels vergeleken' : 'Where to Stay in Kamala Beach: 8 Hotels Compared'}</h1>
            <p className="mt-4 text-lg lg:text-xl max-w-3xl opacity-95">{isNl ? 'Kamala Beach hotels van $90 budget tot $650 cliff-villas. Familieresorts, adults-only, all-inclusive, boutique luxe — de 8 beste opties met prijsklassen, beste voor wie, en directe affiliate-links.' : 'Kamala Beach hotels from $90 budget to $650 cliff villas. Family resorts, adults-only, all-inclusive, boutique luxury — the 8 best options with price ranges, who each fits, and direct affiliate links.'}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={withSubId(partners.trip_hotels.partnerUrl, placement('hero-trip'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">{isNl ? 'Live tarieven Trip.com' : 'Live rates on Trip.com'} →</a>
              <Link href="/phuket/kamala/" className="rounded-full bg-white text-thailand-blue border border-white/40 px-6 py-3 text-base font-semibold hover:bg-white/90">{isNl ? '← Kamala Beach gids' : '← Kamala Beach guide'}</Link>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">{isNl ? '8 Kamala Beach hotels vergeleken' : '8 Kamala Beach hotels compared'}</h2>
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
                  {featuredHotels.map((h, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-gray-900">{h.reviewSlug ? <Link href={`/phuket/kamala/hotels/${h.reviewSlug}/`} className="text-thailand-blue hover:text-thailand-red hover:underline">{h.name}</Link> : h.name}</td>
                      <td className="px-4 py-3 text-gray-700">{h.tier}</td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{h.price}</td>
                      <td className="px-4 py-3 text-gray-700">{h.best}</td>
                      <td className="px-4 py-3"><a href={withSubId(partners.trip_hotels.partnerUrl, placement(`row-${i}`))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'See rates →'}</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-500">{isNl ? 'Prijzen zijn 2026 hoogseizoen-tarieven (nov–apr). Mei–okt 30–40% lager. Resort fees en transfers vaak apart.' : 'Prices are 2026 high-season rates (Nov–Apr). May–Oct 30–40% lower. Resort fees and transfers often extra.'}</p>
          </section>

          <section className="rounded-2xl bg-thailand-red/5 border-2 border-thailand-red p-6">
            <span className="inline-block rounded-full bg-thailand-red text-white text-xs font-bold uppercase tracking-wide px-3 py-1 mb-3">⭐ {isNl ? 'Onze keuze voor de meesten' : 'Our pick for most'}</span>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">Novotel Phuket Kamala Beach</h2>
            <p className="text-gray-700 leading-relaxed mb-3">{isNl ? "Voor 80% van Kamala-bezoekers is Novotel de juiste call: $95–220/nacht, twee zwembaden, kinderclub, 1 min naar het strand, betrouwbare Accor-service, vrijheid om in het dorp te eten. Niet de luxste, niet de goedkoopste — de slimme value-keuze." : "For 80% of Kamala visitors Novotel is the right call: $95–220/night, two pools, kids' club, 1 min to the beach, reliable Accor service, freedom to eat in the village. Not the most luxurious, not the cheapest — the smart value pick."}</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/phuket/kamala/hotels/novotel-phuket-kamala-beach/" className="inline-flex items-center rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">{isNl ? 'Lees onze Novotel review' : 'Read our Novotel review'} →</Link>
              <a href={withSubId(partners.trip_novotel.partnerUrl, placement('toppick'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">{isNl ? 'Bekijk Novotel op Trip.com' : 'See Novotel on Trip.com'} →</a>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Volledige reviews' : 'In-depth reviews'}</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/phuket/kamala/hotels/novotel-phuket-kamala-beach/" className="block rounded-2xl bg-white p-5 shadow-sm border border-gray-100 hover:border-thailand-blue"><h3 className="font-heading text-lg font-bold text-gray-900 mb-1">Novotel Phuket Kamala Beach</h3><p className="text-sm text-gray-600">{isNl ? '$95–220/nacht • familie • Accor' : '$95–220/night • family • Accor'}</p><p className="text-xs text-thailand-blue mt-2 font-semibold">{isNl ? 'Lees review' : 'Read review'} →</p></Link>
              <Link href="/phuket/kamala/hotels/sunwing-kamala-beach/" className="block rounded-2xl bg-white p-5 shadow-sm border border-gray-100 hover:border-thailand-blue"><h3 className="font-heading text-lg font-bold text-gray-900 mb-1">Sunwing Kamala Beach</h3><p className="text-sm text-gray-600">{isNl ? '$130–260/nacht • all-in familie' : '$130–260/night • all-incl family'}</p><p className="text-xs text-thailand-blue mt-2 font-semibold">{isNl ? 'Lees review' : 'Read review'} →</p></Link>
              <Link href="/phuket/kamala/hotels/sunprime-kamala-beach/" className="block rounded-2xl bg-white p-5 shadow-sm border border-gray-100 hover:border-thailand-blue"><h3 className="font-heading text-lg font-bold text-gray-900 mb-1">Sunprime Kamala Beach</h3><p className="text-sm text-gray-600">{isNl ? '$140–280/nacht • adults-only' : '$140–280/night • adults-only'}</p><p className="text-xs text-thailand-blue mt-2 font-semibold">{isNl ? 'Lees review' : 'Read review'} →</p></Link>
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
            <h2 className="font-heading text-xl font-bold text-gray-900">{isNl ? 'Plan je Kamala-trip' : 'Plan your Kamala trip'}</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/phuket/kamala/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">{isNl ? '🏖️ Kamala Beach gids' : '🏖️ Kamala Beach guide'}</Link>
              <Link href="/phuket/kata/hotels/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏨 Kata hotels' : '🏨 Kata hotels'}</Link>
              <Link href="/phuket/bang-tao/hotels/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏨 Bang Tao hotels' : '🏨 Bang Tao hotels'}</Link>
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
  const partnersFile = path.join(process.cwd(), 'data', 'pseo', 'areas', 'kamala-partners.json');
  const hotelsFile = path.join(process.cwd(), 'data', 'pseo', 'areas', 'kamala-hotels.json');
  const partnersData = JSON.parse(fs.readFileSync(partnersFile, 'utf8'));
  const hotelsData = JSON.parse(fs.readFileSync(hotelsFile, 'utf8'));
  const hotels: HotelLite[] = hotelsData.hotels.map((h: any) => ({ slug: h.slug, name: h.name, tier: h.tier, priceFrom: h.priceFrom, priceTo: h.priceTo, tripPartnerKey: h.tripPartnerKey }));
  return { props: { partners: partnersData.partners, lastUpdated: partnersData.lastUpdated, hotels }, revalidate: 604800 };
};
