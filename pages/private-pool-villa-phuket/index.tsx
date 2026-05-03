import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { withSubId, BOOKING_GENERIC, KLOOK_GENERIC } from '../../lib/affiliates';
import { useSubId } from '../../lib/useSubId';

interface Partners {
  trip_luxury: { partnerUrl: string };
  trip_private_pool: { partnerUrl: string };
  trip_oceanfront: { partnerUrl: string };
  trip_family: { partnerUrl: string };
  trip_villa_search: { partnerUrl: string };
}

interface Props { partners: Partners; lastUpdated: string; }

export default function PrivatePoolVillaPhuketPage({ partners, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const subId = useSubId();
  const placementSubId = (placement: string) => `${subId}-pseo-private-pool-villa-phuket-${placement}`;

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Private pool villa Phuket' : 'Private Pool Villa Phuket', href: '/private-pool-villa-phuket/' },
  ];

  // Title <60, keyword front, year + count
  const seoTitle = isNl
    ? 'Private Pool Villa Phuket (2026): 7 Echte Privé-villas'   // 51
    : 'Private Pool Villa Phuket (2026): 7 Truly Private Picks'; // 53

  // Meta desc <155 with question hook
  const seoDescription = isNl
    ? 'Op zoek naar een private pool villa in Phuket? Vergelijk 7 echte privé-zwembad villa\'s $700–10.000/nacht — geen gedeelde pool, eigen tuin gegarandeerd.'
    : 'Looking for a private pool villa in Phuket? Compare 7 truly private pool villas $700–10,000/night — no shared pool, dedicated garden guaranteed.';

  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/private-pool-villa-phuket/`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({
      '@type': 'ListItem', position: i + 1, name: b.name,
      item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}`,
    })),
  };

  const faqEn = [
    { q: "What counts as a real private pool villa in Phuket?",
      a: "Three criteria: (1) the pool is exclusively yours during the booking — no other guests can enter — (2) the pool is enclosed within your villa's walls or fence, not visible from a corridor or shared garden, (3) it's a swimming-size pool (minimum ~5×3 m) not just a plunge pool on a balcony. Below the $700/night tier, 'pool villa' often means a plunge pool with shared corridor, which is not the same. Banyan Tree, Trisara, Sri Panwa, Andara, Amanpuri, The Pavilions and Cape Sienna all guarantee genuine private pools." },
    { q: "How big is the pool in a typical Phuket private pool villa?",
      a: "Standard luxury pool villa: 6×3 m to 8×4 m, 1.4 m depth. Trisara oceanfront villas: 8×3.5 m infinity pools. Amanpuri private estates: 12×5 m main pool plus secondary plunge pool. Banyan Tree 1-bedroom: 6×3 m. The Pavilions cliff villas: 6×2.5 m. At 5–7 m length you can do laps. Below 5 m it's a soaking/cooling pool. Heated pools (Nov–Feb) are standard at Trisara, Amanpuri, Andara — confirm at booking if heating matters to you." },
    { q: "Private pool villa vs shared pool villa — what's the cost difference?",
      a: "Genuine private pool villa in Phuket starts around $700/night (The Pavilions, Cape Sienna). Shared/semi-private pool 'villas' (where 4–6 villas share access to a 'private' pool that's actually a small communal pool) start at $250–400/night. The price gap reflects the difference: privacy, exclusive use, dedicated maintenance, fence/wall enclosure. For honeymoons, families with kids, or anyone wanting to swim naked at 11pm — pay the gap." },
    { q: "Are private pool villas in Phuket good for families with young kids?",
      a: "Yes — arguably the best accommodation type for kids in Thailand. The fenced/walled pool means no random adults nearby; you can leave kids in the pool while you watch from the terrace. Most luxury operators offer pool fence add-ons (sliding mesh fence around the pool, $50/night extra) for toddler safety. 2-bedroom configurations (master + kids bunk room) at Banyan Tree, Andara and Sri Panwa run $1,000–2,500/night for 4 — strong value vs separate hotel rooms." },
    { q: "Do private pool villas come with a butler or villa attendant?",
      a: "At $1,500+/night: yes, always — Trisara, Amanpuri, Sri Panwa, Andara include a personal villa attendant who does turn-down service, in-villa dining setup, daily housekeeping, errand running. At $700–1,400/night (Banyan Tree, The Pavilions, Cape Sienna): butler-on-call rather than dedicated. Below $700/night for 'private pool villa' — usually no butler, just standard housekeeping. Tipping: $20–40/day for a dedicated attendant on a 5+ night stay is customary." },
    { q: "Can I cook in a private pool villa in Phuket?",
      a: "Most luxury private pool villas have a fully equipped kitchen with stovetop, oven, fridge, and basic supplies — Andara, Banyan Tree, The Pavilions, Cape Sienna. Trisara villas have a kitchenette (kettle, microwave, fridge) but expect dining at the resort restaurants. Amanpuri private estates send a personal chef on request — cooking yourself feels almost wrong. For a 5+ night family trip in Bang Tao or Kamala, a full kitchen plus once-a-day grocery delivery from Villa Market or Tops saves $100–200/day vs eating out for 4." },
    { q: "Best months to book a private pool villa in Phuket?",
      a: "November–February for high season weather (28–32°C, almost no rain, calm seas, every restaurant open) — book 3–4 months ahead, expect 20–30% premium for Christmas/NY/Chinese New Year. May–October for value (30–45% off rack rates, 1–2 days/week monsoon rain, but warm pools are warmer if anything). Sweet-spot months: late November (high-season weather, no holiday surcharge) and early May (start of low season, hotels still well-staffed and beach restaurants still open)." },
  ];

  const faqNl = [
    { q: "Wat telt als een echte private pool villa in Phuket?",
      a: "Drie criteria: (1) het zwembad is exclusief van jou tijdens de boeking — geen andere gasten — (2) het zwembad is omsloten binnen je villa-muren of -hek, niet zichtbaar vanaf een gang of gedeelde tuin, (3) het is een echte zwembad-formaat (minimum ~5×3 m) niet alleen een plunge pool op een balkon. Onder $700/nacht betekent 'pool villa' vaak plunge pool met gedeelde gang — niet hetzelfde. Banyan Tree, Trisara, Sri Panwa, Andara, Amanpuri, The Pavilions en Cape Sienna garanderen echte privézwembaden." },
    { q: "Hoe groot is het zwembad in een typische Phuket private pool villa?",
      a: "Standaard luxe pool villa: 6×3 m tot 8×4 m, 1,4 m diep. Trisara oceanfront-villa's: 8×3,5 m infinity pools. Amanpuri privé-estates: 12×5 m hoofdzwembad plus secundaire plunge pool. Banyan Tree 1-bedroom: 6×3 m. The Pavilions cliff villa's: 6×2,5 m. Vanaf 5–7 m kun je baantjes trekken. Onder 5 m is het een afkoel/relax-bad. Verwarmde zwembaden (nov–feb) zijn standaard bij Trisara, Amanpuri, Andara — bevestig bij boeking als verwarming belangrijk is." },
    { q: "Private pool villa vs gedeelde pool villa — wat kost het verschil?",
      a: "Echte private pool villa in Phuket: vanaf $700/nacht (The Pavilions, Cape Sienna). Gedeelde/semi-privé pool 'villa\'s' (4–6 villa\'s delen 'privé'-zwembad dat eigenlijk een klein communaal bad is): $250–400/nacht. Het prijsverschil reflecteert: privacy, exclusief gebruik, eigen onderhoud, hek/muur. Voor honeymoons, gezinnen met kinderen, of wie 's avonds naakt wil zwemmen — betaal het verschil." },
    { q: "Zijn private pool villa's in Phuket geschikt voor gezinnen met jonge kinderen?",
      a: "Ja — argumenteerbaar de beste accommodatie voor kinderen in Thailand. Het omheinde zwembad betekent geen vreemde volwassenen in de buurt; je kunt kinderen in het bad laten terwijl je vanaf het terras kijkt. Meeste luxe-operators bieden zwembad-hek add-ons (schuifbaar mesh-hek rond bad, $50/nacht extra) voor peuterveiligheid. 2-bedroom configuraties (master + kinder-bunkkamer) bij Banyan Tree, Andara en Sri Panwa: $1.000–2.500/nacht voor 4 — sterke value vs aparte hotelkamers." },
    { q: "Komen private pool villa's met een butler of villa-attendant?",
      a: "Op $1.500+/nacht: ja, altijd — Trisara, Amanpuri, Sri Panwa, Andara hebben persoonlijke villa-attendant die turn-down service, in-villa dining setup, dagelijkse housekeeping en boodschappen doet. Op $700–1.400/nacht (Banyan Tree, The Pavilions, Cape Sienna): butler-op-afroep in plaats van dedicated. Onder $700/nacht voor 'private pool villa': meestal geen butler, alleen standaard housekeeping. Tip: $20–40/dag voor dedicated attendant bij 5+ nacht is gangbaar." },
    { q: "Kan ik koken in een private pool villa in Phuket?",
      a: "Meeste luxe private pool villa's hebben een volledig uitgeruste keuken (kookplaat, oven, koelkast, basis-supplies) — Andara, Banyan Tree, The Pavilions, Cape Sienna. Trisara-villa's hebben kitchenette (waterkoker, magnetron, koelkast) maar je eet bij de resort-restaurants. Amanpuri private estates sturen op verzoek een persoonlijke chef — zelf koken voelt bijna verkeerd. Voor een 5+ nacht gezinstrip in Bang Tao of Kamala: volledige keuken + eens-per-dag boodschappen van Villa Market of Tops bespaart $100–200/dag vs uit-eten met 4." },
    { q: "Beste maanden om een private pool villa in Phuket te boeken?",
      a: "November–februari voor hoogseizoens-weer (28–32°C, bijna geen regen, kalme zee, alle restaurants open) — boek 3–4 maanden vooruit, verwacht 20–30% premie voor Kerst/Oud & Nieuw/Chinees Nieuwjaar. Mei–oktober voor value (30–45% korting, 1–2 dagen/week regen, maar warme zwembaden zijn juist warmer). Sweet-spot maanden: laat november (hoogseizoens-weer zonder vakantietoeslag) en begin mei (start laagseizoen, hotels nog goed bemand en strandrestaurants nog open)." },
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
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/75">{isNl ? 'Private pool villa Phuket-gids' : 'Private pool villa Phuket guide'}</p>
            {/* H1 differs from title — secondary keyword "luxury villas" + "what to expect" framing */}
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">
              {isNl
                ? 'Private pool villa\'s in Phuket: 7 echte luxe villa\'s + wat te verwachten'
                : 'Private Pool Villas in Phuket: 7 Truly Luxury Villas + What to Expect'}
            </h1>
            <p className="mt-4 text-lg lg:text-xl max-w-3xl opacity-95">
              {isNl
                ? "Niet alle 'private pool villa\'s' in Phuket zijn echt privé. Hier vind je de 7 resorts waar elk zwembad exclusief van jou is, ommuurd of omheind, en in echte zwembad-formaat — geen plunge pool met gedeelde gang. Plus precies wat je krijgt voor $700, $1.500 of $5.000/nacht."
                : "Not every 'private pool villa' in Phuket is actually private. Here are the 7 resorts where each pool is exclusively yours, walled or fenced, and in real swimming-size — no plunge pool with shared corridor. Plus exactly what you get at $700, $1,500 or $5,000/night."}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={withSubId(partners.trip_private_pool.partnerUrl, placementSubId('hero-trip'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">
                {isNl ? 'Bekijk private pool villa\'s op Trip.com' : 'See private pool villas on Trip.com'} →
              </a>
              <a href={withSubId(BOOKING_GENERIC, placementSubId('hero-booking'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-white text-thailand-blue border border-white/40 px-6 py-3 text-base font-semibold hover:bg-white/90">
                {isNl ? 'Vergelijk op Booking.com' : 'Compare on Booking.com'} →
              </a>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs opacity-90">
              <span>✔ 7 {isNl ? 'echte privé-zwembaden' : 'truly private pools'}</span>
              <span>✔ {isNl ? 'Wat je werkelijk krijgt' : 'What you actually get'}</span>
              <span>✔ {isNl ? 'Bijgewerkt' : 'Updated'} {new Date(lastUpdated).toLocaleDateString(isNl ? 'nl-NL' : 'en', { year: 'numeric', month: 'long' })}</span>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Comparison */}
          <section id="comparison">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">{isNl ? 'Snelle vergelijking: 7 echte private pool villa-resorts' : 'Quick comparison: 7 truly private pool villa resorts'}</h2>
            <p className="text-gray-600 mb-6">{isNl ? 'Alleen resorts waar elk zwembad exclusief van jou is — geen gedeelde pools.' : "Only resorts where each pool is exclusively yours — no shared pools."}</p>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Resort' : 'Resort'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Pool-formaat' : 'Pool size'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Verwarmd?' : 'Heated?'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Vanaf' : 'From'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Beste voor' : 'Best for'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Boek' : 'Book'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { name: 'Amanpuri', size: '12×5 m', heated: isNl ? 'Ja' : 'Yes', price: '$5,000', best: isNl ? 'Privé-estate prestige' : 'Private estate prestige' },
                    { name: 'Trisara', size: '8×3.5 m infinity', heated: isNl ? 'Ja' : 'Yes', price: '$2,500', best: isNl ? 'Oceanfront privacy' : 'Oceanfront privacy' },
                    { name: 'Sri Panwa', size: '7×3.5 m', heated: isNl ? 'Optioneel' : 'Optional', price: '$1,200', best: isNl ? 'Cliff-uitzicht' : 'Cliff views' },
                    { name: 'Andara Resort & Villas', size: '8×4 m', heated: isNl ? 'Ja' : 'Yes', price: '$1,200', best: isNl ? 'Families 4–6 personen' : 'Families 4–6 guests' },
                    { name: 'Banyan Tree Phuket', size: '6×3 m', heated: isNl ? 'Optioneel' : 'Optional', price: '$800', best: isNl ? 'Best value privé' : 'Best value private' },
                    { name: 'The Pavilions Phuket', size: '6×2.5 m', heated: isNl ? 'Nee' : 'No', price: '$700', best: isNl ? 'Adults-only stellen' : 'Adults-only couples' },
                    { name: 'Cape Sienna Gourmet', size: '6×3 m', heated: isNl ? 'Nee' : 'No', price: '$600', best: isNl ? 'Foodies + uitzicht' : 'Foodies + view' },
                  ].map((r, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-3"><a href={withSubId(partners.trip_private_pool.partnerUrl, placementSubId(`table-${i}`))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="font-semibold text-thailand-blue hover:text-thailand-red hover:underline">{r.name}</a></td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{r.size}</td>
                      <td className="px-4 py-3 text-gray-700">{r.heated}</td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{r.price}/nt</td>
                      <td className="px-4 py-3 text-gray-700">{r.best}</td>
                      <td className="px-4 py-3"><a href={withSubId(partners.trip_private_pool.partnerUrl, placementSubId(`table-cta-${i}`))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'See deals →'}</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-500">{isNl ? '"Vanaf"-prijzen zijn 1-bedroom configuraties in laag-hoogseizoen (laat-nov of begin-mei). Hoogseizoen + grotere villa\'s lopen tot $10–15K/nacht.' : '"From" prices are 1-bedroom configs in shoulder/start of high season (late Nov / early May). Peak season + larger villas run to $10–15K/night.'}</p>
          </section>

          {/* What to expect */}
          <section className="rounded-2xl bg-thailand-red/5 border-2 border-thailand-red p-6">
            <span className="inline-block rounded-full bg-thailand-red text-white text-xs font-bold uppercase tracking-wide px-3 py-1 mb-3">⭐ {isNl ? 'Wat verwachten' : 'What to expect'}</span>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Wat krijg je in een echte private pool villa in Phuket?' : 'What do you get in a real private pool villa in Phuket?'}</h2>
            <ul className="space-y-2 text-gray-700 mb-3">
              <li>• <strong>{isNl ? 'Het zwembad: ' : 'The pool: '}</strong>{isNl ? '5×3 m tot 12×5 m afhankelijk van prijspunt. Volledig binnen je eigen muren of hek. Schoongemaakt tweemaal daags. Verwarmd nov–feb bij Trisara/Amanpuri/Andara.' : '5×3 m to 12×5 m depending on price tier. Entirely within your own walls or fence. Cleaned twice daily. Heated Nov–Feb at Trisara/Amanpuri/Andara.'}</li>
              <li>• <strong>{isNl ? 'Privé-tuin of -terras: ' : 'Private garden or terrace: '}</strong>{isNl ? 'Sun loungers, eettafel buiten, vaak een outdoor sala (paviljoen). Volledig buiten zicht van andere gasten.' : 'Sun loungers, outdoor dining table, often an outdoor sala (pavilion). Completely out of sight of other guests.'}</li>
              <li>• <strong>{isNl ? 'Eigen ingang en toegang: ' : 'Own entrance and access: '}</strong>{isNl ? 'Geen hotel-gang door, eigen privé-pad of golf-cart-pickup vanaf de lobby.' : 'No hotel corridor, own private path or golf-cart pickup from the lobby.'}</li>
              <li>• <strong>{isNl ? 'Volledig of half ingerichte keuken: ' : 'Full or partial kitchen: '}</strong>{isNl ? 'Standaard bij Andara, Banyan Tree, The Pavilions. Trisara: kitchenette. Amanpuri: persoonlijke chef op afroep.' : 'Standard at Andara, Banyan Tree, The Pavilions. Trisara: kitchenette. Amanpuri: personal chef on request.'}</li>
              <li>• <strong>{isNl ? 'Villa-attendant of butler: ' : 'Villa attendant or butler: '}</strong>{isNl ? 'Dedicated boven $1.500/nacht; on-call op $700–1.400/nacht.' : 'Dedicated above $1,500/night; on-call at $700–1,400/night.'}</li>
              <li>• <strong>{isNl ? 'In-villa dining: ' : 'In-villa dining: '}</strong>{isNl ? 'Ontbijt, lunch, diner aan je eigen poolside set-up. Service charge gewoonlijk 10% bovenop menukosten.' : 'Breakfast, lunch, dinner at your own poolside setup. Service charge typically 10% on top of menu prices.'}</li>
            </ul>
            <div className="flex flex-wrap gap-3">
              <a href={withSubId(partners.trip_private_pool.partnerUrl, placementSubId('expect-trip'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">
                {isNl ? 'Vergelijk op Trip.com' : 'Compare on Trip.com'} →
              </a>
            </div>
          </section>

          {/* Operators in detail */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Beste operators voor private pool villa\'s' : 'Best operators for private pool villas'}</h2>
            <div className="space-y-5">
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">{isNl ? '$700–1.400/nacht — Value tier' : '$700–1,400/night — Value tier'}</h3>
                <p className="text-gray-700 leading-relaxed mb-3">{isNl ? 'Banyan Tree (Bang Tao lagoon villa\'s, $800+), The Pavilions (Cherng Talay adults-only, $700+), Cape Sienna (Kamala met panorama, $600+). Echte privé-zwembaden, 6×3 m tot 8×3,5 m. Niet altijd verwarmd. Butler op afroep, niet dedicated. Sterke keuze voor stellen op 4–7 nacht.' : "Banyan Tree (Bang Tao lagoon villas, $800+), The Pavilions (Cherng Talay adults-only, $700+), Cape Sienna (Kamala with panorama, $600+). Genuinely private pools, 6×3 m to 8×3.5 m. Not always heated. Butler on call rather than dedicated. Strong choice for couples on a 4–7 night stay."}</p>
                <a href={withSubId(partners.trip_private_pool.partnerUrl, placementSubId('detail-value'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center text-sm font-semibold text-thailand-red hover:underline">{isNl ? 'Bekijk value-tier private pool villa\'s →' : 'See value-tier private pool villas →'}</a>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">{isNl ? '$1.500–4.500/nacht — Premium tier' : '$1,500–4,500/night — Premium tier'}</h3>
                <p className="text-gray-700 leading-relaxed mb-3">{isNl ? 'Trisara (Layan, oceanfront infinity pools), Sri Panwa (Cape Panwa cliff villa\'s), Andara (Kamala hillside, families). 7×3,5 m tot 8×4 m verwarmde zwembaden. Dedicated villa-attendant inbegrepen, in-villa dining standaard, signature spa\'s. Sweet spot voor 6–8 daagse romantische trip of multi-gen vacation.' : "Trisara (Layan, oceanfront infinity pools), Sri Panwa (Cape Panwa cliff villas), Andara (Kamala hillside, families). 7×3.5 m to 8×4 m heated pools. Dedicated villa attendant included, in-villa dining standard, signature spas. Sweet spot for 6–8 night romantic trip or multi-gen vacation."}</p>
                <a href={withSubId(partners.trip_private_pool.partnerUrl, placementSubId('detail-premium'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center text-sm font-semibold text-thailand-red hover:underline">{isNl ? 'Bekijk premium private pool villa\'s →' : 'See premium private pool villas →'}</a>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">{isNl ? '$5.000+/nacht — Ultra-luxe' : '$5,000+/night — Ultra-luxury'}</h3>
                <p className="text-gray-700 leading-relaxed mb-3">{isNl ? 'Amanpuri private estates (2-tot-9-bedroom met eigen chef, butler, masseuse). 12×5 m hoofdzwembad plus secundaire plunge pool. Het meest persoonlijke service-niveau in Phuket — alleen op de Mandarin Oriental private estates op Bangkok of Four Seasons Koh Samui in dezelfde range.' : "Amanpuri private estates (2-to-9-bedroom with own chef, butler, masseuse). 12×5 m main pool plus secondary plunge pool. The most personalised service tier in Phuket — only Mandarin Oriental private estates in Bangkok or Four Seasons Koh Samui in the same range."}</p>
                <a href={withSubId(partners.trip_private_pool.partnerUrl, placementSubId('detail-ultra'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center text-sm font-semibold text-thailand-red hover:underline">{isNl ? 'Bekijk ultra-luxe private estates →' : 'See ultra-luxury private estates →'}</a>
              </div>
            </div>
          </section>

          {/* Buyer's guide */}
          <section className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Boekingstips: zorg dat het écht privé is' : "Booking tips: make sure it's actually private"}</h2>
            <ul className="space-y-3 text-gray-800">
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Eis "exclusive use" in de bevestiging' : 'Demand "exclusive use" in the confirmation'}</strong>{isNl ? '. Niet alleen "private pool" — sommige resorts verkopen "private" pool maar 4 villa\'s delen toegang. Vraag schriftelijk: "pool exclusively for our villa, no shared access".' : '. Not just "private pool" — some resorts sell "private" pool but 4 villas share access. Ask in writing: "pool exclusively for our villa, no shared access".'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Vraag pool-formaat in m²' : 'Ask pool size in m²'}</strong>{isNl ? '. "Pool villa" kan plunge pool van 3×2 m betekenen. Voor échte zwemmen: minimum 5 m lang.' : '. "Pool villa" can mean 3×2 m plunge pool. For actual swimming: minimum 5 m long.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Verwarming nov–feb' : 'Heating Nov–Feb'}</strong>{isNl ? '. Standaard bij Trisara, Amanpuri, Andara. Optioneel/niet bij The Pavilions, Cape Sienna. Bij <26°C ochtend-water voelt onverwarmd koud.' : '. Standard at Trisara, Amanpuri, Andara. Optional/none at The Pavilions, Cape Sienna. Below 26°C morning water, unheated feels cold.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Pool-fence voor peuters' : 'Pool fence for toddlers'}</strong>{isNl ? '. Add-on $50/nacht bij Banyan Tree, Andara, Sri Panwa. Mesh-hek rond bad — vraag als je kids onder 4 hebt.' : '. Add-on $50/night at Banyan Tree, Andara, Sri Panwa. Mesh fence around the pool — request if you have kids under 4.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Vergelijk Trip.com vs direct booking' : 'Compare Trip.com vs direct booking'}</strong>{isNl ? '. Direct boeken: extra perks (transfer, ontbijt, spa-credit). Trip.com: vaak 10–25% lagere kale prijs. Soms wint direct, soms Trip.com — altijd beide checken.' : '. Direct booking: extra perks (transfer, breakfast, spa credit). Trip.com: often 10–25% lower base price. Sometimes direct wins, sometimes Trip.com — always check both.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Service charge + btw nakijken' : 'Check service charge + VAT'}</strong>{isNl ? '. 10% service + 7% btw is standaard, vaak NIET in de "from" prijs. Reken altijd 17% extra.' : '. 10% service + 7% VAT is standard, often NOT in the "from" price. Always add 17%.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Boek de grootste configuratie' : 'Book the largest configuration'}</strong>{isNl ? '. Een 3-bedroom villa is vaak slechts 60% duurder dan 1-bedroom — voor families/groepen significant goedkoper per persoon.' : '. A 3-bedroom is often only 60% more than 1-bedroom — significantly cheaper per person for families/groups.'}</span></li>
            </ul>
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

          {/* Cluster mesh — UP to pillar + cross-cluster */}
          <section className="rounded-2xl bg-thailand-blue/10 p-6">
            <h2 className="font-heading text-xl font-bold text-gray-900">{isNl ? 'Plan de rest van je luxe Phuket-trip' : 'Plan the rest of your luxury Phuket trip'}</h2>
            <p className="mt-2 text-gray-700">{isNl ? 'Pool villa is geboekt — werk de rest af:' : 'Pool villa booked — wrap up the rest:'}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/phuket-luxury-villas/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">{isNl ? '🏝️ Vergelijk alle 8 luxe villa-resorts' : '🏝️ Compare all 8 luxury villa resorts'}</Link>
              <Link href="/phuket-luxury-villas/family/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '👨‍👩‍👧 Family pool villa\'s (4+ slaapkamers)' : '👨‍👩‍👧 Family pool villas (4+ bedrooms)'}</Link>
              <Link href="/phuket-luxury-villas/oceanfront/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🌊 Oceanfront pool villa\'s' : '🌊 Oceanfront pool villas'}</Link>
              <Link href="/best-hotels/phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏨 Beste hotels in Phuket' : '🏨 Best hotels in Phuket'}</Link>
              <Link href="/yacht-charter-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '⛵ Yacht charter Phuket' : '⛵ Yacht charter Phuket'}</Link>
              <Link href="/flights-to-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '✈️ Vluchten naar Phuket' : '✈️ Flights to Phuket'}</Link>
              <Link href="/car-rental-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🚗 Auto huren in Phuket' : '🚗 Car rental Phuket'}</Link>
              <a href={withSubId(KLOOK_GENERIC, placementSubId('mesh-klook'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">{isNl ? '🎟️ Phuket activiteiten' : '🎟️ Phuket activities'}</a>
            </div>
          </section>

          {/* Methodology */}
          <section className="rounded-2xl bg-gray-50 border border-gray-200 p-6 text-sm text-gray-700">
            <h2 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Hoe we vergeleken' : 'How we compared'}</h2>
            <p>{isNl ? 'Privacy-criteria geverifieerd in mei 2026: zwembad-formaat, omsluiting (muur/hek), gedeelde toegang ja/nee — gecheckt via resort-floorplan + recente Tripadvisor-foto\'s. Tarieven van Trip.com en Booking.com voor early-juni 2026 boekingen. We verdienen commissie op boekingen via genoemde platforms — dit verandert niets aan de prijs of welke resorts we noemen.' : "Privacy criteria verified May 2026: pool size, enclosure (wall/fence), shared access yes/no — checked via resort floorplans and recent Tripadvisor photos. Rates from Trip.com and Booking.com for early-June 2026 bookings. We earn a commission on bookings through the listed platforms — this never changes the price you pay or which resorts we cover."}</p>
          </section>
        </main>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const file = path.join(process.cwd(), 'data', 'pseo', 'villas', 'phuket-partners.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  return { props: { partners: data.partners, lastUpdated: data.lastUpdated }, revalidate: 604800 };
};
