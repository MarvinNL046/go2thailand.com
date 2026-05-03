import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import SEOHead from '../../../components/SEOHead';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { withSubId, KLOOK_GENERIC } from '../../../lib/affiliates';
import { useSubId } from '../../../lib/useSubId';

interface PartnerEntry { partnerUrl: string; label: string }
interface Partners { [key: string]: PartnerEntry }
interface Props { partners: Partners; lastUpdated: string }

export default function PhuketNaiHarnPillarPage({ partners, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const subId = useSubId();
  const placement = (p: string) => `${subId}-pseo-phuket-nai-harn-${p}`;

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Phuket', href: '/city/phuket/' },
    { name: 'Nai Harn', href: '/phuket/nai-harn/' },
  ];

  // Title <60. KW: "nai harn beach" 450/KD11, "nai harn phuket" 350/KD9
  const seoTitle = isNl
    ? 'Nai Harn Beach Phuket (2026): Rustige Zuid-gids'    // 49
    : 'Nai Harn Beach Phuket (2026): Quiet South Coast Guide'; // 53

  const h1 = isNl
    ? 'Nai Harn Phuket: het rustige zuiden — strand, expats en zonsondergangen'
    : 'Nai Harn Phuket: The Quiet South — Beach, Expat Scene & Sunset Guide';

  const seoDescription = isNl
    ? 'Op zoek naar Nai Harn beach Phuket? Rustige baai aan de zuidpunt, expat-favoriet, Promthep Cape zonsondergang. Wanneer komen, hoe komen, wie het past.'
    : 'Looking for Nai Harn beach Phuket? Quiet bay at the south tip, expat favourite, Promthep Cape sunsets. When to visit, how to get there, who it suits.';

  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/phuket/nai-harn/`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({ '@type': 'ListItem', position: i + 1, name: b.name, item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}` })),
  };

  const faqEn = [
    { q: 'Where is Nai Harn beach in Phuket?', a: 'Nai Harn is the south-west tip of Phuket, the second-to-last beach before the island ends at Promthep Cape. It sits in a sheltered bay between two headlands — about 25 min from Karon, 40 min from Patong, 45 min from Phuket town and 1 hour from the airport. The shape: a half-mile arc of white sand, calm clear water from Nov–Apr, choppy and red-flagged in monsoon months.' },
    { q: 'Is Nai Harn beach worth visiting?', a: 'Yes — especially if you want a calmer alternative to Patong/Karon. The beach itself is among the cleanest on Phuket (Blue-flag rated multiple years), there are no jet skis, no parasailing operators, very few touts. The expat-leaning crowd uses Nai Harn as a daily-life beach: morning runs, afternoon cafes, evening sunset walks. Best for couples, families, retirees. Not the right call for nightlife seekers — that is Patong, 40 min north.' },
    { q: 'Is Nai Harn the same as Promthep Cape?', a: 'No, but they are 5 min apart. Nai Harn is the beach in the bay; Promthep Cape is the cliff viewpoint at the very southern tip — Phuket\'s most famous sunset spot. From Nai Harn beach drive 4 km south on Route 4233 and you are at Promthep Cape parking. Many visitors do beach in afternoon, then sunset on the cape from 17:30.' },
    { q: 'Can you swim at Nai Harn beach?', a: 'November to April: yes — calm water, good visibility, gentle slope, lifeguards on duty. May to October (monsoon): no — strong rip currents, red flags up most days, lifeguards strongly enforce no-swim rules. Ignoring red flags has caused multiple drowning incidents per year. The lagoon at the north end (Nai Harn Lake) is a calm alternative for kids in monsoon.' },
    { q: 'Where should I stay near Nai Harn?', a: 'See our Nai Harn hotels hub for the comparison. The two flagship properties: The Nai Harn (5* on the cliff, sea-view rooms, infinity pool) and Wyndham Grand Nai Harn Beach Phuket (5* family-resort, 3 pools, kids\' club). Plus 4 mid-range options ($80–150/night). For nightlife or shopping convenience: stay in Patong instead — Nai Harn is intentionally quiet.' },
    { q: 'Nai Harn vs Karon vs Kata — which is right for me?', a: 'Nai Harn = quietest, smallest, most expat-leaning. Best for couples and slow-paced families. Karon = mid-size beach, mid-density, families and value-seekers. Kata = surfing and a more sociable beach-bar scene. Patong = nightlife, shopping, intense. If your priority is sleep + clean water + a runner-friendly promenade: Nai Harn. If you want walkability to bars and food: Karon or Patong.' },
    { q: 'When is the best time to visit Nai Harn?', a: 'November to mid-April is ideal — calm sea, sunny, swimmable, all restaurants and beach clubs operating. December to February is peak (and 25–40 % more expensive on hotels). Mid-October and late April are sweet spots for value with high-season weather. Avoid June–September for swimming, though the area still has appeal for retirees and digital-nomads who do not need beach swimming.' },
  ];
  const faqNl = [
    { q: 'Waar ligt Nai Harn beach in Phuket?', a: 'Nai Harn is de zuidwestpunt van Phuket, de op-een-na-laatste baai voordat het eiland eindigt bij Promthep Cape. Beschermde baai tussen twee koppen — 25 min vanaf Karon, 40 min vanaf Patong, 45 min vanaf Phuket town, 1 uur vanaf het vliegveld. Vorm: een halve-mijl boog wit zand, rustig helder water van nov–apr, woelig en rood-vlag in moessontijd.' },
    { q: 'Is Nai Harn beach de moeite waard?', a: 'Ja — vooral als rustigere variant op Patong/Karon. Het strand zelf is een van de schoonste van Phuket (Blue-flag meerdere jaren), geen jetski’s, geen parasailing, weinig touts. De expat-gemeenschap gebruikt Nai Harn als dagelijks-leven-strand: ochtend hardlopen, middag-cafés, avond zonsondergang. Past voor stellen, families, gepensioneerden. Niet voor nightlife — dat is Patong, 40 min noord.' },
    { q: 'Is Nai Harn hetzelfde als Promthep Cape?', a: 'Nee, wel 5 min uit elkaar. Nai Harn is het strand in de baai; Promthep Cape is het uitkijkpunt op de zuidpunt van Phuket — beroemdste zonsondergangsplek van het eiland. Vanaf Nai Harn rij je 4 km zuid via 4233 en je bent op Promthep Cape parking. Veel bezoekers doen ‘s middags strand, dan zonsondergang op de cape vanaf 17:30.' },
    { q: 'Kun je zwemmen op Nai Harn?', a: 'November tot april: ja — rustig water, goed zicht, geleidelijke helling, lifeguards aanwezig. Mei tot oktober (moesson): nee — sterke ribstromen, rode vlaggen op meeste dagen, lifeguards handhaven het zwemverbod. Negeren leidde meerdere keren per jaar tot verdrinking. De lagune (Nai Harn Lake) noord-eind is rustig alternatief voor kinderen in moesson.' },
    { q: 'Waar moet ik blijven in Nai Harn?', a: 'Zie onze hotels-hub voor vergelijking. Twee flagships: The Nai Harn (5* op de klif, zeezicht, infinity-pool) en Wyndham Grand Nai Harn Beach Phuket (5* familie-resort, 3 pools, kids\' club). Plus 4 mid-range opties ($80–150/nacht). Voor nightlife/shopping: kies Patong — Nai Harn is bewust rustig.' },
    { q: 'Nai Harn vs Karon vs Kata — wat past?', a: 'Nai Harn = rustigst, kleinst, meest expat. Voor stellen en rustige families. Karon = middelgroot, families en value. Kata = surfen en sociaal beach-bar. Patong = nightlife, shopping, intens. Slaap + schoon water + runner-vriendelijk: Nai Harn. Loopafstand naar bars/eten: Karon of Patong.' },
    { q: 'Wanneer is de beste tijd voor Nai Harn?', a: 'November tot half april is ideaal — rustige zee, zon, zwembaar, alle restaurants en beach clubs open. December–februari piek (25–40% duurder hotels). Mid-oktober en eind april zijn sweet spots voor prijs met hoogseizoens-weer. Vermijd juni–september voor zwemmen, gebied blijft wel aantrekkelijk voor gepensioneerden en digital nomads.' },
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
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/75">{isNl ? 'Phuket sub-gids' : 'Phuket sub-guide'}</p>
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">{h1}</h1>
            <p className="mt-4 text-lg lg:text-xl max-w-3xl opacity-95">
              {isNl
                ? "Nai Harn is wat Phuket's zuidpunt anders maakt: rustig, schoon, lokaal-gericht. Geen jet-ski's, geen Bangla Road-massa. Hier vind je wat het écht is, of het bij jou past, en hoe je de beste 4 dagen plant."
                : "Nai Harn is what makes Phuket's south tip different: quiet, clean, locally oriented. No jet skis, no Bangla Road crowds. Here's what it really is, whether it suits you, and how to plan the best 4 days."}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={withSubId(partners.trip_pillar.partnerUrl, placement('hero-primary'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">
                {isNl ? 'Nai Harn hotels op Trip.com' : 'Nai Harn hotels on Trip.com'} →
              </a>
              <a href={withSubId(partners.klook_pillar.partnerUrl, placement('hero-secondary'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-white text-thailand-blue border border-white/40 px-6 py-3 text-base font-semibold hover:bg-white/90">
                {isNl ? 'Activiteiten op Klook' : 'Activities on Klook'} →
              </a>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs opacity-90">
              <span>✔ Blue-flag {isNl ? 'strand' : 'beach'}</span>
              <span>✔ Promthep Cape 5 min</span>
              <span>✔ {isNl ? 'Bijgewerkt' : 'Updated'} {new Date(lastUpdated).toLocaleDateString(isNl ? 'nl-NL' : 'en', { year: 'numeric', month: 'long' })}</span>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Quick stats */}
          <section className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Nai Harn in cijfers' : 'Nai Harn at a glance'}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Strandlengte' : 'Beach length'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">~700 m</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Vanaf Patong' : 'From Patong'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">~40 min</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Beste tijd' : 'Best time'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">Nov–Apr</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Vibe' : 'Vibe'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">{isNl ? 'Rustig' : 'Quiet'}</p></div>
            </div>
          </section>

          {/* Who it's for */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Voor wie is Nai Harn?' : 'Who Nai Harn is for'}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-emerald-50 p-5 border border-emerald-200">
                <h3 className="font-heading text-lg font-bold text-emerald-900 mb-2">{isNl ? '👍 Past goed bij' : '👍 Suits these travellers'}</h3>
                <ul className="space-y-1 text-sm text-emerald-900">
                  <li>{isNl ? 'Stellen & honeymooners' : 'Couples & honeymooners'}</li>
                  <li>{isNl ? 'Families met kids 8+' : 'Families with kids 8+'}</li>
                  <li>{isNl ? 'Long-stay & expats' : 'Long-stay & expats'}</li>
                  <li>{isNl ? 'Gepensioneerden' : 'Retirees'}</li>
                  <li>{isNl ? 'Hardlopers, yoga, slow-vibes' : 'Runners, yoga, slow-vibes'}</li>
                </ul>
              </div>
              <div className="rounded-2xl bg-rose-50 p-5 border border-rose-200">
                <h3 className="font-heading text-lg font-bold text-rose-900 mb-2">{isNl ? '⚠️ Past minder bij' : '⚠️ Less suited for'}</h3>
                <ul className="space-y-1 text-sm text-rose-900">
                  <li>{isNl ? 'Nightlife / clubbers' : 'Nightlife / clubbers'}</li>
                  <li>{isNl ? 'Solo-reiziger op feest-trip' : 'Solo party-trippers'}</li>
                  <li>{isNl ? 'Shopping-fans' : 'Shopping-focused'}</li>
                  <li>{isNl ? 'Reizigers zonder transport' : 'Travellers without transport'}</li>
                  <li>{isNl ? 'Backpackers met klein budget' : 'Tight-budget backpackers'}</li>
                </ul>
              </div>
            </div>
          </section>

          {/* The beach */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Het strand zelf' : 'The beach itself'}</h2>
            <p className="text-gray-700 leading-relaxed">{isNl
              ? "Nai Harn is een halve-cirkel-baai van ongeveer 700 m wit zand, beschermd door een rotsige punt aan beide kanten. Het zand loopt zachtjes af waardoor het veilig is voor kinderen in droog seizoen. Aan de noordkant ligt Nai Harn Lake — een zoetwatermeer 50 m van de zee, populair bij families die niet in zout willen zwemmen. Schaduw is beperkt: 30 % van het strand heeft palmen, parasols zijn gratis met consumptie bij beach-clubs."
              : "Nai Harn is a half-circle bay of roughly 700 m of white sand, sheltered by rocky headlands on each side. The sand slopes gently, making it safe for kids during the dry season. At the north end sits Nai Harn Lake — a freshwater pond 50 m from the sea, popular with families who do not want salt. Shade is limited: ~30% of the beach has palms, parasols are free with a drink purchase at beach clubs."}</p>
          </section>

          {/* Things to do */}
          <section className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? '6 dingen die Nai Harn de moeite waard maken' : '6 things that earn Nai Harn the trip'}</h2>
            <ul className="space-y-3 text-gray-800 text-sm">
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>Promthep Cape sunset</strong> — {isNl ? "5 min rijden zuid, parking gratis, kom 17:00 in hoogseizoen voor goede plek. Sunset 17:50–18:30 afhankelijk van maand." : '5-min drive south, free parking, arrive 17:00 in high season for a good spot. Sunset 17:50–18:30 depending on month.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>Windmill Viewpoint</strong> — {isNl ? "200 m vóór Promthep, minder druk, vergelijkbaar uitzicht. Onze tip voor stellen die de 4-bus crowd willen vermijden." : 'just 200 m before Promthep, less crowded, similar view. Our pick for couples who want to dodge the tour-bus crowd.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>Nai Harn Lake walk</strong> — {isNl ? "1,5 km wandelpad rond het meer, schaduwrijk, perfect voor 06:30 voor de hitte aanslaat." : '1.5 km path around the lake, shaded, perfect for a 06:30 walk before the heat.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>Yacht Club + dinner</strong> — {isNl ? "Quan Asian Cuisine en Da Vinci's Italian zijn de twee zekerheden. Beide reserveren in hoogseizoen." : "Quan Asian Cuisine and Da Vinci's Italian are the two safe bets. Both worth booking in high season."}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>Rawai seafood market</strong> — {isNl ? "10 min noord — kies je vis, restaurant kookt op-50-THB-fee. Slimste avond-eten in zuid-Phuket." : '10 min north — choose your fish, restaurant cooks for a 50-THB fee. Smartest dinner in south Phuket.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>Yoga + free fitness</strong> — {isNl ? "Naka Yoga aan het strand: 350 THB drop-in, 06:30 en 17:30. Het bouwwerk-met-pull-up-balken aan het zuidelijke uiteinde is een gratis outdoor gym." : 'Naka Yoga on the beach: 350 THB drop-in, 06:30 and 17:30. The pull-up frame at the south end is a free outdoor gym.'}</span></li>
            </ul>
          </section>

          {/* Where to stay teaser */}
          <section className="rounded-2xl bg-thailand-red/5 border-2 border-thailand-red p-6">
            <span className="inline-block rounded-full bg-thailand-red text-white text-xs font-bold uppercase tracking-wide px-3 py-1 mb-3">⭐ {isNl ? 'Hotels' : 'Hotels'}</span>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Waar overnachten in Nai Harn?' : 'Where to stay in Nai Harn'}</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              {isNl
                ? 'De twee anker-hotels: The Nai Harn (5* op de klif, zeezicht, $250–500/nacht) en Wyndham Grand Nai Harn Beach Phuket (5* familie, 3 pools, $200–400/nacht). Plus 4 mid-range opties tussen $80–150. Vergelijking + reviews op de hotels-hub.'
                : 'The two anchor hotels: The Nai Harn (5* clifftop, sea view, $250–500/night) and Wyndham Grand Nai Harn Beach Phuket (5* family-resort, 3 pools, $200–400/night). Plus 4 mid-range options $80–150. Full comparison + reviews on the hotels hub.'}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/phuket/nai-harn/hotels/" className="inline-flex items-center rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">
                {isNl ? 'Nai Harn hotels vergelijken →' : 'Compare Nai Harn hotels →'}
              </Link>
              <a href={withSubId(partners.trip_hotels.partnerUrl, placement('cta-trip'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">
                {isNl ? 'Trip.com Nai Harn hotels' : 'Trip.com Nai Harn hotels'} →
              </a>
            </div>
          </section>

          {/* Getting there */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Hoe kom je in Nai Harn?' : 'Getting to Nai Harn'}</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-base font-bold text-gray-900 mb-1">{isNl ? 'Vanaf het vliegveld' : 'From HKT airport'}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Grab/taxi 60–75 min via expressway, ~1.000 THB ($30). Geen directe shuttle.' : 'Grab/taxi 60–75 min via expressway, ~1,000 THB ($30). No direct shuttle.'}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-base font-bold text-gray-900 mb-1">{isNl ? 'Vanaf Patong' : 'From Patong'}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Grab 35–45 min, ~600 THB. Scooter 30 min via 4233.' : 'Grab 35–45 min, ~600 THB. Scooter 30 min via Route 4233.'}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-base font-bold text-gray-900 mb-1">{isNl ? 'Lokaal vervoer' : 'Local transport'}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Eigen scooter (200 THB/dag) of huurauto sterk aanbevolen. Tuk-tuks duur (300+ THB voor 5 min rit).' : 'Own scooter (200 THB/day) or rental car strongly recommended. Tuk-tuks pricey (300+ THB for a 5-min ride).'}</p>
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
            <h2 className="font-heading text-xl font-bold text-gray-900">{isNl ? 'Plan de rest van je Phuket-trip' : 'Plan the rest of your Phuket trip'}</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/phuket/nai-harn/hotels/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">{isNl ? '🏨 Nai Harn hotels-hub' : '🏨 Nai Harn hotels hub'}</Link>
              <Link href="/phuket/rawai/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏘️ Rawai gids' : '🏘️ Rawai guide'}</Link>
              <Link href="/phuket/old-town/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏛️ Old Phuket Town' : '🏛️ Old Phuket Town'}</Link>
              <Link href="/best-hotels/phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏨 Beste hotels in Phuket' : '🏨 Best hotels in Phuket'}</Link>
              <Link href="/flights-to-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '✈️ Vluchten naar Phuket' : '✈️ Flights to Phuket'}</Link>
              <Link href="/yacht-charter-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '⛵ Yacht charter Phuket' : '⛵ Yacht charter Phuket'}</Link>
              <Link href="/city/phuket/" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">{isNl ? '📖 Phuket reisgids' : '📖 Phuket travel guide'}</Link>
              <a href={withSubId(KLOOK_GENERIC, placement('mesh-klook'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">{isNl ? '🎟️ Activiteiten Phuket' : '🎟️ Phuket activities'}</a>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const file = path.join(process.cwd(), 'data', 'pseo', 'areas', 'nai-harn-partners.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  return { props: { partners: data.partners, lastUpdated: data.lastUpdated }, revalidate: 604800 };
};
