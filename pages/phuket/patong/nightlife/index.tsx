import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import SEOHead from '../../../../components/SEOHead';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import { withSubId, KLOOK_GENERIC, GYG_GENERIC } from '../../../../lib/affiliates';
import { useSubId } from '../../../../lib/useSubId';

interface Partners {
  trip_patong_pillar: { partnerUrl: string };
  trip_patong_hotels_hub: { partnerUrl: string };
  trip_patong_nightlife: { partnerUrl: string };
  trip_patong_restaurants: { partnerUrl: string };
}

interface Props { partners: Partners; lastUpdated: string; }

export default function PatongNightlifePage({ partners, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const subId = useSubId();
  const sub = (placement: string) => `${subId}-pseo-phuket-patong-nightlife-${placement}`;

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Phuket', href: '/city/phuket/' },
    { name: 'Patong', href: '/phuket/patong/' },
    { name: isNl ? 'Nightlife' : 'Nightlife', href: '/phuket/patong/nightlife/' },
  ];

  const seoTitle = isNl
    ? 'Patong Beach Nightlife (2026): Bangla Road Gids'  // 50
    : 'Patong Beach Nightlife (2026): Bangla Road Guide'; // 49

  const seoDescription = isNl
    ? 'Op zoek naar Patong Beach nightlife? Bangla Road clubs (Illuzion, Tiger), bier-bars, cabaret-shows, prijzen, scams om te ontwijken & openingstijden.'.slice(0, 155)
    : 'Looking for Patong Beach nightlife? Bangla Road clubs (Illuzion, Tiger), beer bars, cabaret shows, prices, scams to avoid + opening times.'.slice(0, 155);

  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/phuket/patong/nightlife/`;

  const h1 = isNl
    ? 'Bangla Road & Patong Nightlife: Wat Verwachten Per Uur?'
    : 'Bangla Road & Patong Nightlife: What to Expect Hour by Hour';

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({
      '@type': 'ListItem', position: i + 1, name: b.name,
      item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}`,
    })),
  };

  const faqEn = [
    { q: 'When does Bangla Road open and close?',
      a: 'Officially: walking street closes to traffic at 18:00 and reopens at 04:00. In practice: bars start filling 21:00, peak crowd 23:00–01:30, last bars roll down 03:30. Weekends and full moon: 30–40 minutes later. Sundays: slightly quieter, but still busy.' },
    { q: 'How much do drinks cost in Bangla Road?',
      a: 'Outdoor beer bars: 80–120 THB local beer (Singha, Chang), 200–250 THB cocktail. Mid-tier clubs: 200–300 THB beer, 400–500 THB cocktail, 1,500 THB+ for buckets. Top clubs (Illuzion, Tiger, Aqua): 350 THB+ entry sometimes, 400 THB+ beer, 500–700 THB cocktails, 6,000–25,000 THB bottle service for VIP tables.' },
    { q: 'What are the top clubs on Bangla Road?',
      a: 'Illuzion (formerly Tiger Discotheque) — biggest, EDM-heavy, 2,000+ capacity, free entry before 23:00. Aqua Club — smaller, hip-hop and reggaeton lean, free entry. White Room — Korean-inspired, K-pop nights. Tiger Discotheque (separate from Illuzion now) — open-air rooftop, more relaxed. For live music: Hard Rock Cafe (off Bangla, slightly cheaper, mid-30s crowd).' },
    { q: 'Is Bangla Road safe?',
      a: 'Generally yes — well-lit, patrolled by tourist police, lots of CCTV. Common issues: drink-spiking (don\'t accept open drinks from strangers), bar-bill scams (always read before signing), pickpocketing in dense crowds 23:00–01:00, and motorbike-snatch on the side streets. After 02:00, walk in pairs and stick to Bangla itself, not the dark sois.' },
    { q: 'Can I bring kids to Bangla Road?',
      a: 'Bangla Road allows under-18s to walk through during the early evening (18:00–20:00), and many families do — kids stare at fire-jugglers and lights. After 21:00 it becomes adults-only in feel: scantily-dressed promoters, ladyboys posing for tips, more aggressive bar pitches. The walking street itself has no legal under-18 ban, but the inside of clubs is 18+ enforced.' },
    { q: 'How do I avoid bar-bill scams?',
      a: "Never sit at a bar-girl table without confirming the price upfront — touching a girl's arm sometimes triggers a 1,000 THB 'lady drink' added silently. Read the bill before signing. Reject 'free shot' offers from outside promoters — they're tied to overpriced bottle minimums inside. Avoid private rooms above ground-floor bars unless you've agreed all prices in writing. Genuine bottle service is fine if you negotiate first." },
    { q: 'Is Patong nightlife only on Bangla Road?',
      a: "No. Bangla is the loud commercial centre. Quieter, more local: Soi Sea Dragon (parallel to Bangla, less aggressive bars). Soi Eric (small bars, friendly). Beer-bar district on Soi Patak (toward Karon — very cheap drinks, older crowd). For a glass of wine without the noise: rooftop bars at Hotel Indigo, Mövenpick Myth, La Flora. Cabaret shows: Simon Cabaret (Karon, 15-min taxi)." },
  ];

  const faqNl = [
    { q: 'Wanneer opent en sluit Bangla Road?',
      a: 'Officieel: walking street sluit voor verkeer om 18:00 en heropent 04:00. Praktisch: bars vullen vanaf 21:00, piek 23:00–01:30, laatste bars sluiten 03:30. Weekend en volle maan: 30–40 min later. Zondag: iets rustiger, nog steeds druk.' },
    { q: 'Wat kosten drankjes op Bangla Road?',
      a: 'Buitenlucht-bars: 80–120 THB lokaal bier (Singha, Chang), 200–250 THB cocktail. Mid-tier clubs: 200–300 THB bier, 400–500 THB cocktail, 1.500 THB+ buckets. Top clubs (Illuzion, Tiger, Aqua): soms 350 THB+ entree, 400 THB+ bier, 500–700 THB cocktails, 6.000–25.000 THB bottle service.' },
    { q: 'Wat zijn de top clubs op Bangla Road?',
      a: 'Illuzion (voorheen Tiger Discotheque) — grootste, EDM, 2.000+ capaciteit, gratis entree vóór 23:00. Aqua Club — kleiner, hip-hop en reggaeton, gratis entree. White Room — Koreaans, K-pop avonden. Tiger Discotheque (apart van Illuzion nu) — open-air rooftop, relaxter. Voor live muziek: Hard Rock Cafe (naast Bangla, iets goedkoper, mid-30s publiek).' },
    { q: 'Is Bangla Road veilig?',
      a: 'Over het algemeen ja — goed verlicht, toeristenpolitie, veel CCTV. Veelvoorkomende issues: drink-spiking (geen open drankjes van vreemden), bar-rekening-scams (lees voor je tekent), zakkenrollen in drukke groepen 23:00–01:00, en motor-snatch in zijstraten. Na 02:00 in paren lopen en op Bangla zelf blijven, niet in donkere sois.' },
    { q: 'Mag je kinderen meenemen naar Bangla Road?',
      a: 'Bangla Road staat onder-18 toe in vroege avond (18:00–20:00), en veel families wandelen er door — kinderen staren naar vuurjongleurs en lichten. Na 21:00 voelt het volwassen: schaars geklede promoters, ladyboys voor tips, agressievere pitches. Walking street zelf geen verbod, clubs binnen wel 18+.' },
    { q: 'Hoe vermijd ik bar-rekening scams?',
      a: 'Ga niet aan een bar-meisjestafel zitten zonder vooraf de prijs te bevestigen — een arm aanraken triggert soms 1.000 THB "lady drink" stilletjes op de rekening. Lees de rekening voor tekenen. Sla "gratis shot"-aanbieden van buitenpromoters af — gebonden aan dure flessen-minima binnen. Vermijd privé-kamers boven bars tenzij alle prijzen op papier zijn afgesproken.' },
    { q: 'Is Patong-nightlife alleen Bangla Road?',
      a: 'Nee. Bangla is het commerciële luide centrum. Rustiger en lokaler: Soi Sea Dragon (parallel aan Bangla, minder agressieve bars). Soi Eric (kleine bars, vriendelijk). Beer-bar district Soi Patak (richting Karon — goedkope drank, ouder publiek). Voor wijn zonder herrie: rooftop-bars bij Hotel Indigo, Mövenpick Myth, La Flora. Cabaret-shows: Simon Cabaret (Karon, 15 min taxi).' },
  ];

  const faqList = isNl ? faqNl : faqEn;

  const faqJsonLd = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faqList.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  const clubs = [
    { name: 'Illuzion Phuket', kind: isNl ? 'Mega-club / EDM' : 'Mega-club / EDM', cap: '2,000+', cover: isNl ? 'Gratis vóór 23:00' : 'Free before 23:00', drink: isNl ? 'Bier 400 THB · Cocktail 600 THB' : 'Beer 400 THB · Cocktail 600 THB' },
    { name: 'Tiger Discotheque', kind: isNl ? 'Open-air rooftop' : 'Open-air rooftop', cap: '1,200', cover: isNl ? 'Gratis (drink-min)' : 'Free (drink min)', drink: isNl ? 'Bier 250 THB · Bucket 1.500 THB' : 'Beer 250 THB · Bucket 1,500 THB' },
    { name: 'Aqua Club', kind: 'Hip-hop / R&B', cap: '700', cover: isNl ? 'Gratis' : 'Free', drink: isNl ? 'Bier 350 THB · Cocktail 500 THB' : 'Beer 350 THB · Cocktail 500 THB' },
    { name: 'White Room', kind: 'K-pop / pop', cap: '500', cover: '200 THB', drink: isNl ? 'Bier 300 THB · Cocktail 450 THB' : 'Beer 300 THB · Cocktail 450 THB' },
    { name: 'Hollywood Disco', kind: isNl ? 'Top-40 / pop' : 'Top-40 / pop', cap: '900', cover: isNl ? 'Gratis' : 'Free', drink: isNl ? 'Bier 250 THB · Cocktail 400 THB' : 'Beer 250 THB · Cocktail 400 THB' },
  ];

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
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/75">{isNl ? 'Patong nightlife · Bangla Road' : 'Patong nightlife · Bangla Road'}</p>
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">{h1}</h1>
            <p className="mt-4 text-lg lg:text-xl max-w-3xl opacity-95">
              {isNl
                ? 'Bangla Road is 400m walking street tussen Beach Road en Rat-U-Thit, sluit elke avond om 18:00 voor verkeer en draait door tot 04:00. Hier vind je per uur wat er gebeurt, welke clubs (Illuzion, Tiger, Aqua) wat doen, prijzen, en welke scams je écht moet vermijden.'
                : "Bangla Road is a 400m walking street between Beach Road and Rat-U-Thit, closed to traffic from 18:00 to 04:00 every night. Here's what happens hour by hour, which clubs (Illuzion, Tiger, Aqua) do what, what drinks cost, and the scams to avoid."}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={withSubId(KLOOK_GENERIC, sub('hero-klook'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">
                {isNl ? 'Bekijk Patong shows + tickets op Klook' : 'See Patong shows + tickets on Klook'} →
              </a>
              <a href={withSubId(GYG_GENERIC, sub('hero-gyg'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-[#1B9E3E] text-white px-6 py-3 text-base font-semibold hover:bg-[#157a30]">
                {isNl ? 'Cabaret op GetYourGuide' : 'Cabaret on GetYourGuide'} →
              </a>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs opacity-90">
              <span>✔ {isNl ? '5 top clubs' : '5 top clubs'}</span>
              <span>✔ {isNl ? 'Prijzen + scam-tips' : 'Prices + scam tips'}</span>
              <span>✔ {isNl ? 'Bijgewerkt' : 'Updated'} {new Date(lastUpdated).toLocaleDateString(isNl ? 'nl-NL' : 'en', { year: 'numeric', month: 'long' })}</span>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Hour-by-hour */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Bangla Road per uur' : 'Bangla Road hour by hour'}</h2>
            <div className="rounded-2xl bg-white shadow-sm border border-gray-200 divide-y divide-gray-100">
              <div className="p-4 grid md:grid-cols-[120px_1fr] gap-3">
                <p className="font-bold text-gray-900">18:00 – 20:00</p>
                <p className="text-gray-700 text-sm">{isNl ? 'Walking street sluit voor verkeer. Bar-promoters zetten borden en speakers neer. Weinig publiek, ideaal moment voor families om door te lopen, foto\'s maken, geluid van fire-jugglers zien zonder gedrang.' : "Walking street closes to traffic. Bar promoters set up signs and speakers. Light crowd — ideal moment for families to walk through, take photos, watch fire-jugglers without the press of bodies."}</p>
              </div>
              <div className="p-4 grid md:grid-cols-[120px_1fr] gap-3">
                <p className="font-bold text-gray-900">20:00 – 22:00</p>
                <p className="text-gray-700 text-sm">{isNl ? 'Pre-game tijd: outdoor bier-bars vullen, livemuziek-bars beginnen. Beste happy hours (50% van bier en cocktails) bij meeste outdoor-bars. Goedkoopste eet: papaya salade en pad krapow van de stalls voor 60–80 THB.' : 'Pre-game window: outdoor beer bars fill up, live music bars get going. Happy hour (50% off beer + cocktails) at most outdoor places. Cheapest food: 60–80 THB papaya salad and pad krapow from stalls.'}</p>
              </div>
              <div className="p-4 grid md:grid-cols-[120px_1fr] gap-3">
                <p className="font-bold text-gray-900">22:00 – 23:00</p>
                <p className="text-gray-700 text-sm">{isNl ? 'Promoters worden agressiever ("lady-drinks-1-for-1" wordt geroepen). Clubs openen formeel maar nog half-leeg — beste moment om binnen te komen zonder cover te betalen. Sloten van Beach Road kijken naar wat de scene wordt.' : 'Promoters get pushier ("1-for-1 lady drinks" shouts). Clubs officially open but half-empty — best window to enter free before cover kicks in. People near Beach Road watch the scene unfold.'}</p>
              </div>
              <div className="p-4 grid md:grid-cols-[120px_1fr] gap-3">
                <p className="font-bold text-gray-900">23:00 – 01:30</p>
                <p className="text-gray-700 text-sm">{isNl ? 'Piek-energie. Illuzion vult, Aqua draait hip-hop, Tiger rooftop is hét fotodoel. Cocktails 400–700 THB. Cabarets in zijstraten draaien 22:00 en 00:30. Verwacht 8.000–15.000 mensen op Bangla in dit venster — staan + bewegen.' : 'Peak energy. Illuzion fills, Aqua runs hip-hop, Tiger rooftop is the photo spot. Cocktails 400–700 THB. Cabaret shows in side sois run 22:00 and 00:30. Expect 8,000–15,000 people on Bangla in this window — stand and shuffle.'}</p>
              </div>
              <div className="p-4 grid md:grid-cols-[120px_1fr] gap-3">
                <p className="font-bold text-gray-900">01:30 – 03:30</p>
                <p className="text-gray-700 text-sm">{isNl ? 'Dim-down. Outdoor-bars sluiten één voor één. Diehards verschuiven naar Illuzion of after-hours bars op Soi Sea Dragon. Tuk-tuk- en taxitarieven verdubbelen na 02:00 — open Bolt voor fixed-price.' : 'Dim-down. Outdoor bars roll down one by one. Diehards move to Illuzion or after-hours places on Soi Sea Dragon. Tuk-tuk and taxi fares double after 02:00 — open Bolt for fixed-price.'}</p>
              </div>
              <div className="p-4 grid md:grid-cols-[120px_1fr] gap-3">
                <p className="font-bold text-gray-900">03:30 – 04:00</p>
                <p className="text-gray-700 text-sm">{isNl ? 'Last calls. Walking street heropent voor verkeer rond 04:00. Late-night noodle stalls (vooral op Soi Sea Dragon) draaien tot 05:00 — perfecte balans voor een tom yum vóór bed.' : 'Last calls. Walking street reopens to traffic around 04:00. Late-night noodle stalls (mostly on Soi Sea Dragon) run until 05:00 — perfect balance for a tom yum before bed.'}</p>
              </div>
            </div>
          </section>

          {/* Clubs comparison */}
          <section id="clubs">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">{isNl ? 'Top 5 Bangla Road clubs vergeleken' : 'Top 5 Bangla Road clubs compared'}</h2>
            <p className="text-gray-600 mb-6">{isNl ? 'Welke club voor welke vibe en welk budget.' : 'Which club for which vibe and which budget.'}</p>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Club' : 'Club'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Soort' : 'Type'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Capaciteit' : 'Capacity'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Entree' : 'Cover'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Drank' : 'Drinks'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {clubs.map((c, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-gray-900">{c.name}</td>
                      <td className="px-4 py-3 text-gray-700">{c.kind}</td>
                      <td className="px-4 py-3 text-gray-700">{c.cap}</td>
                      <td className="px-4 py-3 text-gray-700">{c.cover}</td>
                      <td className="px-4 py-3 text-gray-700">{c.drink}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Bar streets */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Bar-straten naast Bangla' : 'Bar streets beyond Bangla'}</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-thailand-blue">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-1">Soi Sea Dragon</h3>
                <p className="text-gray-700 text-sm">{isNl ? 'Parallel aan Bangla, één straat noord. Mengeling van outdoor-bars en kleine clubs. Minder agressief, lokaler publiek, late-night noodle stalls.' : 'Parallel to Bangla, one street north. Mix of outdoor bars and small clubs. Less aggressive, more local crowd, late-night noodle stalls.'}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-thailand-red">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-1">Soi Eric</h3>
                <p className="text-gray-700 text-sm">{isNl ? 'Kleine bars, friendly vibe, expat-favoriet. Niet voor party-rondes; meer voor 2 biertjes en gesprekken met mensen die jaren in Phuket wonen.' : "Small bars, friendly vibe, expat favourite. Not for party laps; more 2-beer chats with long-time Phuket residents."}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-amber-500">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-1">Soi Patak (beer-bar district)</h3>
                <p className="text-gray-700 text-sm">{isNl ? 'Richting Karon, 100+ open beer-bars op een rij. Goedkope drank (60 THB Singha), ouder publiek (50+), pool tables, geen muziek-druk.' : 'Toward Karon, 100+ open beer bars in a row. Cheap drink (60 THB Singha), older crowd (50+), pool tables, no music pressure.'}</p>
              </div>
            </div>
          </section>

          {/* Cabaret + Muay Thai shows */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Cabaret en Muay Thai-shows' : 'Cabaret and Muay Thai shows'}</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              {isNl
                ? "Phuket Simon Cabaret is dé ladyboy-cabaret van het eiland — niet op Bangla maar 15 min taxi naar Karon, twee shows dagelijks (18:00, 19:30, 21:00), tickets via Klook of GetYourGuide ($25–35). Op Bangla zelf draaien kleinere drag- en cabaret-shows in zijstraten — gratis entree, 1 drink minimum, 200 THB tip-jar."
                : "Phuket Simon Cabaret is the marquee ladyboy cabaret on the island — not on Bangla but a 15-min taxi to Karon, two shows daily (18:00, 19:30, 21:00), tickets via Klook or GetYourGuide ($25–35). On Bangla itself, smaller drag and cabaret shows run in side sois — free entry, 1-drink minimum, 200 THB tip jar."}
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              {isNl
                ? "Voor Muay Thai: Bangla Boxing Stadium (op Bangla zelf, 600m vanaf Beach Road) draait elke maandag, woensdag, donderdag en zaterdag 21:00. Tickets 1.500–2.500 THB ringside, 800 THB algemene tribune. Boek via Klook voor 10–15% korting + transfer."
                : "For Muay Thai: Bangla Boxing Stadium (on Bangla itself, 600m from Beach Road) runs Monday, Wednesday, Thursday and Saturday at 21:00. Tickets 1,500–2,500 THB ringside, 800 THB general. Book via Klook for 10–15% off + transfer."}
            </p>
            <a href={withSubId(KLOOK_GENERIC, sub('shows-klook'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">
              {isNl ? 'Patong shows + Muay Thai op Klook' : 'Patong shows + Muay Thai on Klook'} →
            </a>
          </section>

          {/* Scams to avoid */}
          <section className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Scams die je echt moet vermijden' : 'Scams to actually avoid'}</h2>
            <ul className="space-y-3 text-gray-800">
              <li className="flex gap-3"><span className="text-amber-700 font-bold">⚠</span><span><strong>{isNl ? '"Lady drink"-rekening' : '"Lady drink" surcharge'}</strong>{isNl ? ': een meisje plopt naast je en bestelt een drankje (vaak een 200 THB shot bij jou bij 1.000 THB op de rekening). Vraag prijs vooraf.' : ': a girl sits down and orders a drink (often a 200 THB shot that becomes 1,000 THB on the bill). Confirm pricing upfront.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">⚠</span><span><strong>{isNl ? 'Bottle-service oversell' : 'Bottle-service oversell'}</strong>{isNl ? ': "VIP-tafel" kost vaak 6.000–25.000 THB met bijproducten. Onderhandelen kan, áltijd op papier.' : ': "VIP table" often runs 6,000–25,000 THB with hidden extras. Negotiate, always on paper.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">⚠</span><span><strong>{isNl ? 'Drink-spiking' : 'Drink-spiking'}</strong>{isNl ? ': accepteer geen open drankjes van vreemden. Hou je eigen flesje altijd in zicht. Loop weg als je je vreemd voelt.' : ": don't accept open drinks from strangers. Keep your own bottle in sight at all times. Walk to a safe spot if you feel off."}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">⚠</span><span><strong>{isNl ? 'Tuk-tuk-monopolie na 02:00' : 'Tuk-tuk monopoly after 02:00'}</strong>{isNl ? ': prijzen verdubbelen, geen meter. Gebruik Bolt of Grab — fixed-price 60–150 THB binnen Patong.' : ': prices double, no meter. Use Bolt or Grab — fixed-price 60–150 THB within Patong.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">⚠</span><span><strong>{isNl ? 'Ping-pong shows' : 'Ping-pong shows'}</strong>{isNl ? ': "gratis entree" met 1.500–4.000 THB drank-minimum. Niet typisch Phuket-cultuur, vermijd.' : ": 'free entry' with 1,500–4,000 THB drink minimums. Not typical Phuket culture, skip."}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">⚠</span><span><strong>{isNl ? 'Pickpocket-warming' : 'Pickpocket pushing'}</strong>{isNl ? ': in dikke menigtes 23:00–01:00, vooral bij ingangen van Illuzion. Houd portemonnee voor je, niet in achterzak.' : ': in thick crowds 23:00–01:00, especially near Illuzion entrance. Keep wallet front-pocket, not back.'}</span></li>
            </ul>
          </section>

          {/* Transport home */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Hoe je terug naar je hotel komt' : 'How to get back to your hotel'}</h2>
            <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
              <li>{isNl ? 'Bolt of Grab: 60–150 THB vanaf Bangla naar elke Patong-hotel — meestal 3–8 min wachttijd. Werkt heel Phuket.' : 'Bolt or Grab: 60–150 THB from Bangla to any Patong hotel — usually 3–8 min wait. Works all of Phuket.'}</li>
              <li>{isNl ? 'Tuk-tuk: 200–400 THB binnen Patong na 02:00. Onderhandelen kan, maar jouw prijs is meestal nog 30% hoger dan Bolt.' : 'Tuk-tuk: 200–400 THB within Patong after 02:00. Negotiate works, but your price is usually still 30% higher than Bolt.'}</li>
              <li>{isNl ? 'Lopen: alle centrale Patong-hotels zijn 5–15 min lopen vanaf Bangla. Veilig in groep.' : 'Walking: every central Patong hotel is 5–15 min walk from Bangla. Safe in groups.'}</li>
              <li>{isNl ? 'Naar Karon/Kata: nachttaxi 600–800 THB. Smart Bus stopt 22:00.' : 'To Karon/Kata: night taxi 600–800 THB. Smart Bus stops at 22:00.'}</li>
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

          {/* Cluster mesh */}
          <section className="rounded-2xl bg-thailand-blue/10 p-6">
            <h2 className="font-heading text-xl font-bold text-gray-900">{isNl ? 'Plan de rest van je Patong-trip' : 'Plan the rest of your Patong trip'}</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/phuket/patong/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">{isNl ? '🏖️ Patong gids' : '🏖️ Patong area guide'}</Link>
              <Link href="/phuket/patong/hotels/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏨 Hotels in Patong' : '🏨 Patong hotels'}</Link>
              <Link href="/phuket/patong/restaurants/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🍽️ Eten in Patong' : '🍽️ Patong restaurants'}</Link>
              <Link href="/yacht-charter-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '⛵ Sunset cruises' : '⛵ Sunset cruises'}</Link>
              <Link href="/best-hotels/phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏝️ Beste hotels Phuket' : '🏝️ Best hotels Phuket'}</Link>
              <Link href="/flights-to-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '✈️ Vluchten naar Phuket' : '✈️ Flights to Phuket'}</Link>
              <Link href="/city/phuket/" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">{isNl ? '📖 Phuket reisgids' : '📖 Phuket travel guide'}</Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const file = path.join(process.cwd(), 'data', 'pseo', 'areas', 'patong-partners.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  return { props: { partners: data.partners, lastUpdated: data.lastUpdated }, revalidate: 604800 };
};
