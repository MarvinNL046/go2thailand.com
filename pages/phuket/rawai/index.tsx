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

export default function PhuketRawaiPillarPage({ partners, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const subId = useSubId();
  const placement = (p: string) => `${subId}-pseo-phuket-rawai-${p}`;

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Phuket', href: '/city/phuket/' },
    { name: 'Rawai', href: '/phuket/rawai/' },
  ];

  // Title <60 — KW: "rawai phuket" 150/KD0, "rawai beach phuket" 100/KD0
  const seoTitle = isNl
    ? 'Rawai Phuket (2026): Lokale Vissersdorp Gids'           // 47
    : 'Rawai Phuket Guide (2026): Local Fishing Village + Pier'; // 56

  const h1 = isNl
    ? 'Rawai Beach Phuket: vissersdorp, sea-gypsies en de échte expat-buurt'
    : "Rawai Beach Phuket: Fishing Village, Sea Gypsies & the Real Expat Hub";

  const seoDescription = isNl
    ? 'Op zoek naar Rawai Phuket? Authentiek vissersdorp aan de zuidkust, sea-gypsy markt, Naga Pearl Farm. Wie het past, hoe komen, wat te eten.'
    : "Curious about Rawai Phuket? Authentic south-coast fishing village with sea-gypsy market, Naga Pearl Farm + Rawai Pier. Who it suits, how to get there, what to eat.";

  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/phuket/rawai/`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({ '@type': 'ListItem', position: i + 1, name: b.name, item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}` })),
  };

  const faqEn = [
    { q: 'Where is Rawai in Phuket?', a: 'Rawai sits on the south-east tip of Phuket, between Nai Harn (west) and Chalong (north). About 50 min from Patong, 30 min from Karon, 50 min from the airport. The eastern-shore location means calmer water year-round but a different beach experience: Rawai\'s "beach" is shallow, rocky and not really for swimming — it\'s a working fisherman\'s shore with traditional longtail boats moored offshore.' },
    { q: "Is Rawai beach good for swimming?", a: "Honestly, no. Rawai is the wrong place if your priority is a swimming beach. The water is shallow, the seabed has rocks and rope mooring lines, and longtail boats run from the shore. For swimming, drive 5 min west to Nai Harn or 8 min south-east to Ya Nui Beach. Where Rawai shines: dining at the seafood market, sunset boats from the pier, daily-life immersion." },
    { q: 'Who is Rawai right for?', a: 'Long-stay travellers (1+ month), digital nomads, expat-curious visitors, foodies, retirees who want quiet local life. Wrong for: short-trip tourists wanting beach-resort holiday (you\'ll wonder where the beach is). Many expats who have lived in Phuket for years live in Rawai precisely because it\'s NOT a tourist beach.' },
    { q: 'What is the Rawai sea-gypsy village?', a: 'The Chao Lay (Sea Gypsies) are an indigenous Austronesian community who have lived along the Andaman coast for centuries — partly nomadic, partly fishing-village settled. The Rawai sea-gypsy village (Moken/Urak Lawoi) sits at the south end of Rawai beach, with about 200 families. You can visit respectfully (do not photograph people without permission), buy from their market and learn — better yet, join a guided cultural visit so a local interpreter explains the culture properly.' },
    { q: 'Is the Rawai seafood market worth it?', a: "Yes — it's the smartest dinner in south Phuket. Walk along the pier road, pick a fish at the open-air market (mantis prawn, snapper, blue crab, lobster, oysters at fixed-board prices), then take it to one of 8 cookhouse restaurants behind. They charge a flat ~50 THB/dish to cook it any style (chili-garlic, salt-crust, Thai red curry). Total cost for two people with seafood + rice + drinks: 800–1,200 THB ($24–36) for what would cost $80+ at a hotel restaurant." },
    { q: 'How do I get to Rawai from Patong or the airport?', a: 'Patong: Grab/taxi 50 min, ~700 THB ($20). Airport: Grab 50 min via expressway, ~900 THB ($26). Karon/Kata: Grab 25 min, ~500 THB. Renting a scooter ($6/day) or car is the smart call if staying 3+ days — Rawai is the kind of place where you want to drive to dinner spots, the pier, the cape and the Naga Pearl Farm without negotiating tuk-tuks.' },
    { q: 'Where should I stay in Rawai?', a: 'Selina Serenity Rawai (hostel-hybrid, dorms $15–25, privates $55–110, suites $120+) is the digital-nomad anchor with coworking. For mid-range hotels, most Rawai listings on Trip.com are family-run boutique villas $80–150/night. Many digital nomads rent monthly condos via Facebook groups — Rawai Beach Resort + condos around it run $600–1,200/month for 1-bed.' },
  ];
  const faqNl = [
    { q: 'Waar ligt Rawai in Phuket?', a: 'Rawai ligt op de zuidoostpunt van Phuket, tussen Nai Harn (west) en Chalong (noord). 50 min vanaf Patong, 30 min vanaf Karon, 50 min vanaf het vliegveld. Oostkust-locatie betekent rustiger water het hele jaar, maar andere strandervaring: Rawai\'s "strand" is ondiep, rotsig en niet echt voor zwemmen — het is een werkende vissersdorp-kust met traditionele longtailboten voor de wal.' },
    { q: 'Is Rawai beach goed om te zwemmen?', a: 'Eerlijk: nee. Rawai is de verkeerde plek als zwemmen je prioriteit is. Water ondiep, zeebodem met rotsen en touwen, longtailboten varen vanaf het strand. Voor zwemmen: 5 min west naar Nai Harn of 8 min zuidoost naar Ya Nui Beach. Wat Rawai wel goed doet: eten op de vismarkt, zonsondergangsbootjes vanaf de pier, lokaal dagelijks leven.' },
    { q: 'Voor wie past Rawai?', a: 'Long-stay reizigers (1+ maand), digital nomads, expat-curieus, foodies, gepensioneerden die rustig lokaal leven willen. Niet voor: korte-trip toeristen op strandvakantie (je vraagt je af waar het strand is). Veel Phuket-expats wonen al jaren in Rawai juist omdat het GEEN toeristen-strand is.' },
    { q: 'Wat is het Rawai sea-gypsy dorp?', a: 'De Chao Lay (Sea Gypsies) zijn een inheemse Austronesische gemeenschap die al eeuwen langs de Andamankust leven — deels nomadisch, deels gevestigd in vissersdorpen. Het Rawai sea-gypsy dorp (Moken/Urak Lawoi) ligt aan het zuidelijke uiteinde van Rawai-strand, ongeveer 200 families. Bezoek respectvol (fotografeer mensen niet zonder toestemming), koop op hun markt — beter nog: doe een begeleide cultural visit waar een lokale tolk de cultuur uitlegt.' },
    { q: 'Is de Rawai vismarkt het waard?', a: 'Ja — de slimste avondmaaltijd in zuid-Phuket. Loop langs de pierstraat, kies een vis op de open markt (mantis-garnaal, snapper, blauwe krab, kreeft, oesters tegen vaste bord-prijzen), neem mee naar een van de 8 kookhuizen erachter. Vlakke ~50 THB/gerecht-fee voor bereiding (chili-knoflook, zoutkorst, Thai red curry). Totaal voor 2 personen met seafood + rijst + drank: 800–1.200 THB ($24–36) — bij hotel-restaurant kost dit $80+.' },
    { q: 'Hoe kom ik in Rawai vanaf Patong of vliegveld?', a: 'Patong: Grab/taxi 50 min, ~700 THB ($20). Vliegveld: Grab 50 min via expressway, ~900 THB ($26). Karon/Kata: Grab 25 min, ~500 THB. Een scooter ($6/dag) of huurauto is slim bij 3+ dagen verblijf — in Rawai wil je naar restaurants, pier, cape en de Naga Pearl Farm rijden zonder tuk-tuk-onderhandeling.' },
    { q: 'Waar moet ik blijven in Rawai?', a: 'Selina Serenity Rawai (hostel-hybrid, dorms $15–25, privé $55–110, suites $120+) is de digital-nomad keuze met coworking. Mid-range hotels op Trip.com zijn meestal familie-gerunde boutique-villa\'s $80–150/nacht. Veel digital nomads huren maandelijks condos via Facebook-groepen — Rawai Beach Resort + condos in de buurt $600–1.200/maand voor 1-slk.' },
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
                ? "Rawai is geen strandvakantie. Het is wat Phuket eruitzag voordat het Phuket werd: longtail-boten, ochtendvismarkt, expats op scooters, zonsondergang vanaf de pier. Hier is wie zich er thuis voelt en hoe je 4 dagen plant."
                : "Rawai isn't a beach holiday. It's what Phuket looked like before it became Phuket: longtail boats, a morning fish market, expats on scooters, sunsets from the pier. Here's who feels at home here and how to plan 4 days right."}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={withSubId(partners.trip_pillar.partnerUrl, placement('hero-primary'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">
                {isNl ? 'Rawai hotels op Trip.com' : 'Rawai hotels on Trip.com'} →
              </a>
              <a href={withSubId(partners.klook_pillar.partnerUrl, placement('hero-secondary'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-white text-thailand-blue border border-white/40 px-6 py-3 text-base font-semibold hover:bg-white/90">
                {isNl ? 'Activiteiten op Klook' : 'Activities on Klook'} →
              </a>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs opacity-90">
              <span>✔ {isNl ? 'Authentiek + lokaal' : 'Authentic + local'}</span>
              <span>✔ Sea-gypsy {isNl ? 'markt' : 'market'}</span>
              <span>✔ {isNl ? 'Bijgewerkt' : 'Updated'} {new Date(lastUpdated).toLocaleDateString(isNl ? 'nl-NL' : 'en', { year: 'numeric', month: 'long' })}</span>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Quick stats */}
          <section className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Rawai in cijfers' : 'Rawai at a glance'}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Vibe' : 'Vibe'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">{isNl ? 'Lokaal/expat' : 'Local/expat'}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Strand' : 'Beach'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">{isNl ? 'Niet zwemmen' : 'Not for swim'}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Vanaf Karon' : 'From Karon'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">~25 min</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Beste reden' : 'Best reason'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">{isNl ? 'Vismarkt' : 'Seafood market'}</p></div>
            </div>
          </section>

          {/* Who it suits */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Voor wie is Rawai?' : 'Who Rawai is for'}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-emerald-50 p-5 border border-emerald-200">
                <h3 className="font-heading text-lg font-bold text-emerald-900 mb-2">{isNl ? '👍 Past goed bij' : '👍 Suits these travellers'}</h3>
                <ul className="space-y-1 text-sm text-emerald-900">
                  <li>{isNl ? 'Long-stay (1+ maand) digital nomads' : 'Long-stay (1+ month) digital nomads'}</li>
                  <li>{isNl ? 'Expat-curieus / scouting' : 'Expat-curious / scouting trips'}</li>
                  <li>{isNl ? 'Foodies (vismarkt!)' : 'Foodies (the seafood market!)'}</li>
                  <li>{isNl ? 'Backpackers met focus op Selina' : 'Backpackers anchored on Selina'}</li>
                  <li>{isNl ? 'Gepensioneerden die rust zoeken' : 'Retirees seeking quiet pace'}</li>
                </ul>
              </div>
              <div className="rounded-2xl bg-rose-50 p-5 border border-rose-200">
                <h3 className="font-heading text-lg font-bold text-rose-900 mb-2">{isNl ? '⚠️ Past niet' : '⚠️ Wrong fit'}</h3>
                <ul className="space-y-1 text-sm text-rose-900">
                  <li>{isNl ? 'Korte 5-7 dagen strandvakantie' : 'Short 5–7 day beach vacations'}</li>
                  <li>{isNl ? 'Families met kids 0–5' : 'Families with kids 0–5'}</li>
                  <li>{isNl ? 'Reizigers zonder vervoer' : 'Travellers without transport'}</li>
                  <li>{isNl ? 'Nightlife / clubbers' : 'Nightlife / clubbers'}</li>
                  <li>{isNl ? 'Resort-luxe-zoekers (kies Nai Harn)' : 'Luxury-resort seekers (pick Nai Harn)'}</li>
                </ul>
              </div>
            </div>
          </section>

          {/* What to do */}
          <section className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? '5 redenen om Rawai te ervaren' : '5 reasons to experience Rawai'}</h2>
            <ul className="space-y-3 text-gray-800 text-sm">
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>Rawai Seafood Market</strong> — {isNl ? "open 11:00–22:00, kies-en-kookhuis-format. 800–1.200 THB voor 2 met verse vis. Naast de pier." : 'open 11:00–22:00, pick-and-cook format. 800–1,200 THB for two with fresh fish. Beside the pier.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>Rawai Pier longtail trips</strong> — {isNl ? "naar Coral Island (Koh Hae) of Racha Yai. 1.500 THB private longtail/halve dag, vier mensen passen makkelijk. Veel goedkoper dan de speedboat-tours." : 'to Coral Island (Koh Hae) or Racha Yai. 1,500 THB private longtail half-day, four people fit easily. Much cheaper than speedboat tours.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>Naga Pearl Farm</strong> — {isNl ? "10 min noord van Rawai pier, 250 THB tour, leer hoe Andaman-pearls worden gekweekt. Onderschat museum, bezoek 1 uur." : '10 min north of Rawai pier, 250 THB tour, learn how Andaman pearls are farmed. Underrated 1-hour museum.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>Promthep Cape sunset</strong> — {isNl ? "5 min rijden, gratis parking, kom 17:00 in hoogseizoen. Beste sunset-uitzicht van Phuket." : '5-min drive, free parking, come 17:00 in high season. Best sunset view in Phuket.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>Sea-gypsy market + cultural visit</strong> — {isNl ? "ochtendmarkt op zuidkant van Rawai. Boek een begeleide cultural-visit ($25 pp via Klook) voor context — minstens 1× respectvol bezoeken." : 'morning market on the south side of Rawai. Book a guided cultural visit ($25 pp via Klook) for context — worth doing once respectfully.'}</span></li>
            </ul>
            <div className="mt-4">
              <a href={withSubId(partners.gyg_pillar.partnerUrl, placement('activities-cta'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-[#1B9E3E] text-white px-5 py-2 text-sm font-semibold hover:bg-[#157a30]">
                {isNl ? 'Rawai-tours op GetYourGuide' : 'Rawai tours on GetYourGuide'} →
              </a>
            </div>
          </section>

          {/* Where to stay teaser — Selina */}
          <section className="rounded-2xl bg-thailand-red/5 border-2 border-thailand-red p-6">
            <span className="inline-block rounded-full bg-thailand-red text-white text-xs font-bold uppercase tracking-wide px-3 py-1 mb-3">⭐ {isNl ? 'Beste hotel optie' : 'Top hotel pick'}</span>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Selina Serenity Rawai — voor digital nomads' : 'Selina Serenity Rawai — for digital nomads'}</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              {isNl
                ? '200 m van Rawai pier, hostel-hybrid: dorms $15–25, privé $55–110, suites $120+. Coworking-ruimte met snel wifi, dagelijks yoga, groot zwembad. Perfecte basis voor 1-week tot 3-maanden long-stays.'
                : "200 m from Rawai pier, hostel-hybrid: dorms $15–25, privates $55–110, suites $120+. Coworking with fast wifi, daily yoga, big pool. Ideal anchor for 1-week to 3-month long-stays."}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/phuket/rawai/hotels/selina-serenity-rawai-phuket/" className="inline-flex items-center rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">
                {isNl ? 'Volledige Selina-review' : 'Read full Selina review'} →
              </Link>
              <a href={withSubId(partners.trip_selina.partnerUrl, placement('selina-cta'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">
                {isNl ? 'Tarieven op Trip.com' : 'Check rates on Trip.com'} →
              </a>
            </div>
          </section>

          {/* Getting there */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Hoe kom je in Rawai?' : 'Getting to Rawai'}</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-base font-bold text-gray-900 mb-1">{isNl ? 'Vanaf vliegveld' : 'From HKT airport'}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Grab/taxi 50 min via expressway, ~900 THB ($26). Geen directe shuttle — soms transfer regelen via Selina.' : 'Grab/taxi 50 min via expressway, ~900 THB ($26). No direct shuttle — Selina sometimes arranges transfers.'}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-base font-bold text-gray-900 mb-1">{isNl ? 'Vanaf Patong' : 'From Patong'}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Grab 50 min, ~700 THB. Scooter 40 min via 4233 (mooie kustweg).' : 'Grab 50 min, ~700 THB. Scooter 40 min via Route 4233 (scenic coastal).'}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-base font-bold text-gray-900 mb-1">{isNl ? 'Eigen vervoer' : 'Own transport'}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Sterk aanbevolen — scooter ($6/dag) of huurauto ($25/dag). Tuk-tuks duur, Grab-aanbod beperkt na 22:00.' : 'Strongly recommended — scooter ($6/day) or rental car ($25/day). Tuk-tuks pricey, Grab supply limited after 22:00.'}</p>
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
              <Link href="/phuket/rawai/hotels/selina-serenity-rawai-phuket/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">{isNl ? '🏨 Selina Serenity review' : '🏨 Selina Serenity review'}</Link>
              <Link href="/phuket/nai-harn/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏖️ Nai Harn gids' : '🏖️ Nai Harn guide'}</Link>
              <Link href="/phuket/old-town/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏛️ Old Phuket Town' : '🏛️ Old Phuket Town'}</Link>
              <Link href="/best-hotels/phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏨 Beste hotels Phuket' : '🏨 Best hotels in Phuket'}</Link>
              <Link href="/yacht-charter-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '⛵ Yacht charter' : '⛵ Yacht charter'}</Link>
              <Link href="/flights-to-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '✈️ Vluchten naar Phuket' : '✈️ Flights to Phuket'}</Link>
              <Link href="/car-rental-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🚗 Auto huren in Phuket' : '🚗 Car rental in Phuket'}</Link>
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
  const file = path.join(process.cwd(), 'data', 'pseo', 'areas', 'rawai-partners.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  return { props: { partners: data.partners, lastUpdated: data.lastUpdated }, revalidate: 604800 };
};
