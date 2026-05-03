import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import SEOHead from '../../../../components/SEOHead';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import { withSubId, KLOOK_GENERIC } from '../../../../lib/affiliates';
import { useSubId } from '../../../../lib/useSubId';

interface Partner { partnerUrl: string; label: string; }
interface Partners { klook_surfing: Partner; gyg_surfing: Partner; klook_pillar: Partner; gyg_pillar: Partner; trip_pillar: Partner; }
interface Props { partners: Partners; lastUpdated: string; }

export default function KataSurfingPage({ partners, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const subId = useSubId();
  const placement = (p: string) => `${subId}-pseo-phuket-kata-surfing-${p}`;

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Phuket', href: '/city/phuket/' },
    { name: 'Kata Beach', href: '/phuket/kata/' },
    { name: isNl ? 'Surfen' : 'Surfing', href: '/phuket/kata/surfing/' },
  ];

  const seoTitle = isNl ? 'Surfen op Kata Beach (2026): Lessen + Spots' : 'Surfing at Kata Beach (2026): Lessons, Spots & Season';
  const seoDescription = isNl
    ? 'Kun je surfen op Kata Beach? Phuket\'s enige consistente surfstrand mei–okt — 6 surfscholen, $35 lessen, board-huur $20/dag, 1–2 m golven. Volledige gids 2026.'
    : 'Can you surf at Kata Beach? Phuket\'s only consistent surf beach May–Oct — 6 schools, $35 lessons, $20/day board rental, 1–2 m waves. Full 2026 guide.';
  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/phuket/kata/surfing/`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({ '@type': 'ListItem', position: i + 1, name: b.name, item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}` })),
  };

  const faqEn = [
    { q: 'When is surf season at Kata Beach?', a: 'Mid-May through mid-October — the south-west monsoon pushes consistent swell into the bay. Peak: July to early September with 1.5–2 m waves on better days. Outside this window the bay is glassy flat — useless for surfing but great for swimming.' },
    { q: 'How much is a Kata Beach surf lesson?', a: 'Group lesson 2 hours: $35–45 including board, rashguard, instructor (1:4 ratio). Private lesson 90 min: $60–80. Multi-day surf camp (3–5 days, includes accommodation): $300–600. All schools run from May through October only.' },
    { q: 'Is Kata Beach good for beginner surfers?', a: 'Yes — sandy bottom, gentle 0.5–1 m beginner waves at the south end of the bay, palm-shaded chill-out zones, six schools competing on price/quality. Most travelers stand up on day 1 of a 2-hour lesson. Stronger waves at the north end during peak swell are for intermediates.' },
    { q: 'Where can I rent a surfboard at Kata Beach?', a: '$10/hour or $20/day at any of the surf schools (Phuket Surf, Kata Surf, Saltwater Dreaming, Surf House Phuket are the established names). Soft-tops for beginners, fibreglass for intermediates, longboards available. ID deposit ($50) usually required.' },
    { q: 'Are there other surf spots near Kata?', a: 'Kalim (north of Patong, 20 min by scooter): faster, shorter waves, intermediate level. Nai Harn (south, 30 min): smaller wave, very consistent but crowded. Surin Beach (further north): cleanest break but rare during low season. Kata Yai itself remains the best all-round option for any skill level.' },
    { q: 'What should I bring for surfing at Kata?', a: 'Reef-safe sunscreen (chemical sunscreens are banned in Thai national parks), rash guard or surf-specific sun shirt, water bottle. The schools provide everything else — board, leash, wax, towel. Do NOT bring flip-flops onto the line-up: they get lost.' },
    { q: 'Can I surf at Kata in November?', a: 'Late October the swell drops fast. Schools usually close 15 October and reopen 15 May. November–April is glassy or near-glassy at Kata — beautiful for swimming, useless for surfing. If you want winter surf in Thailand, head to Koh Phangan (east coast, gets north-east swell) or Tonsai/Krabi.' },
  ];

  const faqNl = [
    { q: 'Wanneer is het surfseizoen op Kata Beach?', a: 'Half mei tot half oktober — de zuidwestmoesson stuurt consistent golven de baai in. Piek: juli tot begin september met 1,5–2 m golven op betere dagen. Buiten dit venster is de baai spiegelglad — perfect voor zwemmen, niets voor surfen.' },
    { q: 'Wat kost een Kata Beach surfles?', a: 'Groepsles 2 uur: $35–45 inclusief board, rashguard, instructeur (1:4 ratio). Privéles 90 min: $60–80. Meerdaags surfkamp (3–5 dagen incl. accommodatie): $300–600. Alle scholen draaien alleen mei–okt.' },
    { q: 'Is Kata Beach goed voor beginnende surfers?', a: 'Ja — zandbodem, zachte 0,5–1 m beginnersgolven aan zuidzijde, schaduw onder palmen, zes scholen die concurreren op prijs/kwaliteit. De meeste reizigers staan op dag 1 van een 2u-les. Sterkere golven aan noordzijde tijdens piek-swell zijn voor gevorderden.' },
    { q: 'Waar kun je een surfboard huren op Kata Beach?', a: '$10/uur of $20/dag bij elke surfschool (Phuket Surf, Kata Surf, Saltwater Dreaming, Surf House Phuket zijn gevestigde namen). Soft-tops voor beginners, fibreglass voor gevorderden, longboards beschikbaar. ID-borg ($50) meestal vereist.' },
    { q: 'Zijn er andere surfspots dichtbij Kata?', a: 'Kalim (noord van Patong, 20 min scooter): snellere, kortere golven, gevorderd. Nai Harn (zuid, 30 min): kleinere golf, zeer consistent maar druk. Surin Beach (verder noord): schoonste break maar zeldzaam in laagseizoen. Kata Yai zelf blijft de beste all-round optie voor elk niveau.' },
    { q: 'Wat moet ik meenemen voor surfen op Kata?', a: 'Reefveilige zonnebrand (chemische zonnebrand is verboden in Thaise parken), rashguard of surf-shirt, waterfles. Scholen leveren al het andere — board, leash, wax, handdoek. Geen slippers naar de line-up: die raak je kwijt.' },
    { q: 'Kun je surfen op Kata in november?', a: 'Eind oktober daalt de swell snel. Scholen sluiten meestal 15 oktober en openen 15 mei. Nov–apr is glassy of bijna glassy — mooi voor zwemmen, niets voor surfen. Voor winter-surf in Thailand: ga naar Koh Phangan (oostkust) of Tonsai/Krabi.' },
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
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/75">{isNl ? 'Phuket\'s enige surfstrand' : "Phuket's only true surf beach"}</p>
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">{isNl ? 'Surfen op Kata Beach: lessen, spots & het mei–okt seizoen' : 'How to Surf Kata Beach: Lessons, Spots & the May–Oct Season'}</h1>
            <p className="mt-4 text-lg lg:text-xl max-w-3xl opacity-95">{isNl ? 'Vergeet wat je hoorde over Phuket en surfen — Kata Beach is de échte surfspot van het eiland, alleen niet wanneer je waarschijnlijk komt. Hier staat alles over het mei–okt seizoen, de zes scholen die er toe doen, en hoe een beginner of intermediate hier z\'n weg vindt.' : "Forget what you heard about Phuket and surfing — Kata Beach is the island's actual surf spot, just not when most travelers visit. Here's everything about the May–Oct season, the six schools that matter, and how to navigate Kata as a beginner or intermediate."}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={withSubId(partners.klook_surfing.partnerUrl, placement('hero-klook'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">{isNl ? 'Boek surfles op Klook' : 'Book surf lesson on Klook'} →</a>
              <a href={withSubId(partners.gyg_surfing.partnerUrl, placement('hero-gyg'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-[#1B9E3E] text-white px-6 py-3 text-base font-semibold hover:bg-[#157a30]">{isNl ? 'GetYourGuide surf' : 'GetYourGuide surf'} →</a>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs opacity-90">
              <span>✔ {isNl ? 'Seizoen mei–okt' : 'Season May–Oct'}</span>
              <span>✔ {isNl ? '6 surfscholen' : '6 surf schools'}</span>
              <span>✔ {isNl ? 'Lessen vanaf $35' : 'Lessons from $35'}</span>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Stats */}
          <section className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Surf op Kata in cijfers' : 'Kata surf at a glance'}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Seizoen' : 'Season'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">{isNl ? 'mei – okt' : 'May–Oct'}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Piek-swell' : 'Peak swell'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">Jul–Sep</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Golfhoogte' : 'Wave height'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">0.5–2 m</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Bodem' : 'Bottom'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">{isNl ? 'Zand' : 'Sand'}</p></div>
            </div>
          </section>

          {/* Surf schools */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? '6 surfscholen op Kata' : '6 surf schools at Kata'}</h2>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-700"><tr>
                  <th className="text-left font-semibold px-4 py-3">{isNl ? 'School' : 'School'}</th>
                  <th className="text-left font-semibold px-4 py-3">{isNl ? 'Specialiteit' : 'Specialty'}</th>
                  <th className="text-left font-semibold px-4 py-3">{isNl ? 'Les 2u' : '2h lesson'}</th>
                  <th className="text-left font-semibold px-4 py-3">{isNl ? 'Board/dag' : 'Board/day'}</th>
                </tr></thead>
                <tbody className="divide-y divide-gray-100">
                  <tr><td className="px-4 py-3 font-semibold">Phuket Surf</td><td className="px-4 py-3">{isNl ? 'Beginners, families' : 'Beginners, families'}</td><td className="px-4 py-3">$40</td><td className="px-4 py-3">$20</td></tr>
                  <tr><td className="px-4 py-3 font-semibold">Kata Surf</td><td className="px-4 py-3">{isNl ? 'Solo + groep' : 'Solo + group'}</td><td className="px-4 py-3">$35</td><td className="px-4 py-3">$20</td></tr>
                  <tr><td className="px-4 py-3 font-semibold">Saltwater Dreaming</td><td className="px-4 py-3">{isNl ? 'Privé-coaching' : 'Private coaching'}</td><td className="px-4 py-3">$45 ({isNl ? 'groep' : 'group'}) / $80 ({isNl ? 'privé' : 'private'})</td><td className="px-4 py-3">$25</td></tr>
                  <tr><td className="px-4 py-3 font-semibold">Surf House Phuket</td><td className="px-4 py-3">{isNl ? 'Wave pool + ocean' : 'Wave pool + ocean'}</td><td className="px-4 py-3">$50</td><td className="px-4 py-3">$25</td></tr>
                  <tr><td className="px-4 py-3 font-semibold">Phuket Surfing</td><td className="px-4 py-3">{isNl ? 'Surfkampen 3–5 dagen' : '3–5 day camps'}</td><td className="px-4 py-3">$40 ({isNl ? 'dagles' : 'day lesson'})</td><td className="px-4 py-3">$20</td></tr>
                  <tr><td className="px-4 py-3 font-semibold">Nautilus Surf</td><td className="px-4 py-3">{isNl ? 'Intermediate-advanced' : 'Intermediate-advanced'}</td><td className="px-4 py-3">$55</td><td className="px-4 py-3">$30 (longboard)</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-500">{isNl ? '2026 prijzen, hoogseizoen jul–sep. Vroeg in mei en eind sep meestal 10–15% lager.' : '2026 prices, peak season Jul–Sep. Early May and late Sep usually 10–15% lower.'}</p>
          </section>

          {/* Best surf spots */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Surfspots op Kata' : 'Surf spots at Kata'}</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-green-500"><h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Zuid-eind (beginners)' : 'South end (beginners)'}</h3><p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Voor de cliffs van Kata Noi richting hoofdstrand. 0,5–1 m, regelmatig, lange ride-out, perfect voor beginners. Alle scholen lessen hier.' : "Off the cliffs of Kata Noi heading to main beach. 0.5–1 m, regular, long ride-out, perfect for beginners. All schools teach here."}</p></div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-yellow-500"><h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Midden-baai (improvers)' : 'Mid-bay (improvers)'}</h3><p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Tussen Kata pier en hoofdrestaurants. 1–1,5 m bij swell, sneller dan zuid-end, beste plek om van pop-up naar bottom-turn te gaan.' : 'Between Kata pier and main restaurants. 1–1.5 m on swell, faster than south end, best spot to progress from pop-up to bottom-turn.'}</p></div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-red-500"><h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Noord-eind (gevorderd)' : 'North end (advanced)'}</h3><p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Richting Crab Island. 1,5–2 m piekdagen, sterkere stroming, kleinere line-up — alleen voor zelfgenoeg surfers.' : 'Towards Crab Island. 1.5–2 m on peak days, stronger current, smaller line-up — for self-sufficient surfers only.'}</p></div>
            </div>
          </section>

          {/* Surf camp */}
          <section className="rounded-2xl bg-thailand-red/5 border-2 border-thailand-red p-6">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Een surfweek op Kata: $400–800 all-in' : 'A Kata surf week: $400–800 all-in'}</h2>
            <p className="text-gray-700 leading-relaxed mb-3">{isNl ? '7 dagen surfkamp via Sugar Marina Resort — Surf of via een onafhankelijke school: $400–600 voor budget-tier (gedeelde kamer, 5 lessen, board-huur), $600–800 voor mid-tier (privé-kamer in 3-sterren hotel, 6 lessen, video-analyse, transfer). Boek 4–6 weken vooruit voor jul–aug.' : "7-day surf camp via Sugar Marina Resort — Surf or an independent school: $400–600 budget tier (shared room, 5 lessons, board rental), $600–800 mid-tier (private room in 3-star, 6 lessons, video analysis, transfer). Book 4–6 weeks ahead for Jul–Aug."}</p>
            <div className="flex flex-wrap gap-3">
              <a href={withSubId(partners.klook_surfing.partnerUrl, placement('camp-klook'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">{isNl ? 'Bekijk surfkampen' : 'See surf camps'} →</a>
              <Link href="/phuket/kata/hotels/" className="inline-flex items-center rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? 'Kata hotels' : 'Kata hotels'}</Link>
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
            <h2 className="font-heading text-xl font-bold text-gray-900">{isNl ? 'Meer Kata + Phuket' : 'More Kata + Phuket'}</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/phuket/kata/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">{isNl ? '🏖️ Kata Beach gids' : '🏖️ Kata Beach guide'}</Link>
              <Link href="/phuket/kata/hotels/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏨 Kata hotels' : '🏨 Kata hotels'}</Link>
              <Link href="/phuket/kata/kata-noi/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏝️ Kata Noi' : '🏝️ Kata Noi'}</Link>
              <Link href="/yacht-charter-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '⛵ Yacht charter' : '⛵ Yacht charter'}</Link>
              <Link href="/city/phuket/" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">{isNl ? '📖 Phuket reisgids' : '📖 Phuket travel guide'}</Link>
              <a href={withSubId(KLOOK_GENERIC, placement('mesh'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">{isNl ? '🎟️ Andere activiteiten' : '🎟️ Other activities'}</a>
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
