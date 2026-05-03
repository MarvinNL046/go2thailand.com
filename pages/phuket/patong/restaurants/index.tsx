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

export default function PatongRestaurantsPage({ partners, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const subId = useSubId();
  const sub = (placement: string) => `${subId}-pseo-phuket-patong-restaurants-${placement}`;

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Phuket', href: '/city/phuket/' },
    { name: 'Patong', href: '/phuket/patong/' },
    { name: isNl ? 'Restaurants' : 'Restaurants', href: '/phuket/patong/restaurants/' },
  ];

  const seoTitle = isNl
    ? 'Patong Restaurants (2026): 10 Picks + Night Markets'  // 53
    : 'Patong Restaurants (2026): 10 Picks + Night Markets'; // 53

  const seoDescription = isNl
    ? 'Op zoek naar de beste Patong restaurants? 10 picks van 60 THB straat-stalls tot 3.000 THB tasting menus + Banzaan en Loma night markets gids.'.slice(0, 155)
    : 'Looking for the best Patong restaurants? 10 picks from 60 THB street stalls to 3,000 THB tasting menus + Banzaan and Loma night market guide.'.slice(0, 155);

  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/phuket/patong/restaurants/`;

  const h1 = isNl
    ? 'Eten in Patong Beach: 10 restaurants en 2 night markets'
    : 'Where to Eat in Patong Beach: 10 Restaurants & 2 Night Markets';

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({
      '@type': 'ListItem', position: i + 1, name: b.name,
      item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}`,
    })),
  };

  const restaurants = [
    { name: 'Patong Seafood Restaurant', cuisine: isNl ? 'Zeevruchten · Thai' : 'Seafood · Thai', priceRange: '$15–35 pp', area: 'Beach Road', best: isNl ? 'Verse vis op het strand' : 'Fresh fish on the beach', note: isNl ? 'Vis kies je uit ijs, ze grillen op houtskool. Vraag prijs per kg vóór het kiezen.' : "Pick fish off the ice, charcoal-grilled. Always confirm price per kg before choosing." },
    { name: 'No.6 Restaurant Phuket', cuisine: isNl ? 'Thai · cult-favoriet' : 'Thai · cult-favorite', priceRange: '$5–10 pp', area: 'Rat-U-Thit Rd', best: isNl ? 'Beste pad krapow van Patong' : 'Best pad krapow in Patong', note: isNl ? 'Lokale staff, eenvoudige plastic-stoel-tafels, kaart in 4 talen. Niet voor Instagram, wél voor smaak.' : 'Local staff, plastic-chair-and-table simple, menu in 4 languages. Not for Instagram, very much for flavor.' },
    { name: 'Savoey Seafood Co.', cuisine: isNl ? 'Zeevruchten upscale' : 'Seafood upscale', priceRange: '$25–60 pp', area: 'Patong Beach', best: isNl ? 'Premium zeevruchten met service' : 'Upscale seafood with service', note: isNl ? 'Branche van de Bangkok-keten, 30 jaar oud. Boek vooruit voor venster-tafel.' : '30-year-old Bangkok chain branch. Book ahead for window seats.' },
    { name: 'La Gritta', cuisine: isNl ? 'Italiaans · fine dining' : 'Italian · fine dining', priceRange: '$60–100 pp', area: 'Amari Phuket', best: isNl ? 'Sunset Italiaans op het strand' : 'Sunset Italian on the beach', note: isNl ? 'Naast de Amari aan het zuideinde van Patong. Pasta huisgemaakt, 200+ wijnen, geboekte tafel met zonsondergang ($90 pp).' : 'Next to Amari at the south end of Patong. House-made pasta, 200+ wine list, booked sunset tables ($90 pp).' },
    { name: 'Mom Tri\'s Kitchen', cuisine: isNl ? 'Thai-Frans fusion' : 'Thai-French fusion', priceRange: '$50–90 pp', area: isNl ? 'Buurt Patong (Kalim)' : 'Patong neighbour (Kalim)', best: isNl ? 'Tasting menu' : 'Tasting menu', note: isNl ? 'Eigenaar Mom Tri Devakul, oud-architect. 7-course tasting $80 pp, ook à la carte.' : 'Owner Mom Tri Devakul, ex-architect. 7-course tasting $80 pp, also à la carte.' },
    { name: 'White Box', cuisine: isNl ? 'Modern Thai' : 'Modern Thai', priceRange: '$40–70 pp', area: 'Kalim Bay', best: isNl ? 'Architecturaal restaurant + zicht' : 'Architectural restaurant + view', note: isNl ? 'Witte glas-doos boven de baai. Elegant Thai met Westerse plating, decent wijnkaart.' : 'White glass cube over the bay. Elegant Thai with Western plating, decent wine list.' },
    { name: 'Pum Restaurant & Cooking School', cuisine: isNl ? 'Thai (cooking class)' : 'Thai (cooking class)', priceRange: '$8–18 pp · class $50', area: 'Soi Permpong 2', best: isNl ? 'Eten + leren koken' : 'Eat + learn to cook', note: isNl ? '4-uur kookcursus inclusief markt-tour, 12 deelnemers max. Boek 2 dagen vooruit.' : '4-hour cooking class with market tour, 12 max. Book 2 days ahead.' },
    { name: 'The Kitchen by Eve', cuisine: isNl ? 'Thai · ontbijt' : 'Thai · breakfast', priceRange: '$5–12 pp', area: 'Soi Sai Nam Yen', best: isNl ? 'Beste ontbijt van Patong' : 'Best breakfast in Patong', note: isNl ? 'Hangsfeer, openluchtkeuken, Eve zelf serveert. Klassieker is khao tom (rijstsoep) en Thai omelet.' : 'Open-air kitchen, Eve serves herself. Classic order: khao tom (rice soup) and Thai omelet.' },
    { name: 'Joe\'s Downstairs', cuisine: isNl ? 'Steakhouse · Westers' : 'Steakhouse · Western', priceRange: '$25–55 pp', area: 'Kalim Bay', best: isNl ? 'Steaks zonder verrassingen' : 'Reliable steakhouse', note: isNl ? 'Australische ribeye en NZ lam. Pittige sausen en goede single-malts.' : 'Australian ribeye and NZ lamb. Punchy sauces and a tight single-malt list.' },
    { name: 'Aromas of India', cuisine: isNl ? 'Indiaas · halal' : 'Indian · halal', priceRange: '$10–25 pp', area: 'Rat-U-Thit Rd', best: isNl ? 'Halal-keuze in Patong' : 'Halal pick in Patong', note: isNl ? 'Tandoor-keuken, vegetarische opties, 3 gangen voor $18. Ook delivery via Foodpanda.' : 'Tandoor kitchen, vegetarian-friendly, 3-course for $18. Also delivery via Foodpanda.' },
  ];

  const faqEn = [
    { q: 'Where is the best street food in Patong?',
      a: 'Three options: (1) Banzaan Fresh Market (behind Jungceylon Mall) — daytime + dinner, 60–80 THB pad krapow, 250 THB whole grilled fish, busiest 18:00–21:00. (2) Loma Park Night Market (next to Promthep, evenings only) — smaller, more authentic, less English. (3) Rat-U-Thit Road stalls (after sunset) — 60 THB pad thai, 80 THB pad krapow, eaten on plastic stools.' },
    { q: 'Is the food safe to eat in Patong?',
      a: "Yes, with three rules: (1) Pick stalls with locals queuing — high turnover means fresh ingredients. (2) Avoid pre-cooked food sitting at room temperature for hours, especially seafood and dairy. (3) Bottled water only, never tap; ice in restaurants is industrial and safe, but skip ice from street carts that look ramshackle. Stick to those rules and you'll be fine for any Patong stall." },
    { q: 'How much do meals cost in Patong?',
      a: 'Street food: 60–120 THB pp ($2–4). Mid-range Thai restaurants (Kitchen by Eve, No.6, Aromas): $5–18 pp. Western chains and upscale Thai (Savoey, Patong Seafood): $25–55 pp. Fine dining (La Gritta, Mom Tri\'s, White Box): $50–100 pp. Drinks add 50–80% to mid-range bills (50 THB beer to 200 THB wine glass).' },
    { q: 'Banzaan vs Loma night market — which is better?',
      a: "Banzaan (behind Jungceylon Mall) is bigger, more touristy, English menus, 70+ stalls, runs 09:00–22:00 — best for first-timers, lunch + dinner. Loma Park (next to Promthep, south end of Patong) is smaller, mostly locals, 18:00–23:00 — better street-food prices but less seafood. Go to Banzaan once for the variety, Loma for cheap weeknight dinners." },
    { q: 'Best vegetarian and vegan restaurants in Patong?',
      a: "Aromas of India (Rat-U-Thit) has the deepest vegetarian menu — 30+ veg dishes. Sea Hag (Soi Sea Dragon) is vegan-only, plant-based Thai classics, 250–400 THB mains. Pum Restaurant teaches vegetarian Thai cooking on request. For breakfast: Kitchen by Eve does vegetarian Thai omelet and fruit plates. Most regular Thai restaurants will adjust dishes — say 'jay' (vegetarian) or 'mai sai nuea' (no meat)." },
    { q: 'Where to find late-night food in Patong (after 23:00)?',
      a: 'Bangla Road late-night noodle stalls (Soi Sea Dragon end) run until 04:00 — 80 THB tom yum, 100 THB pad see ew. McDonald\'s at Jungceylon (24h) and 7-Eleven hot food (24h). Most sit-down restaurants close by midnight. For drunk-food after 02:00: Soi Sea Dragon noodles or 7-Eleven sandwiches.' },
    { q: 'Can I do a food tour in Patong?',
      a: "Yes — Klook and GetYourGuide both run 4-hour Patong street food tours ($45–55 pp). You taste 8–10 dishes across Banzaan, Rat-U-Thit and Soi Bangla, with English-speaking guide. Worth it for first-timers who want to learn what to order. For cooking classes (3–4 hours, market tour + 4 dishes + meal): Pum Restaurant ($50) or VJ Cooking Class ($45)." },
  ];

  const faqNl = [
    { q: 'Waar vind je het beste straatvoedsel in Patong?',
      a: 'Drie opties: (1) Banzaan Fresh Market (achter Jungceylon Mall) — dag + avond, 60–80 THB pad krapow, 250 THB hele gegrilde vis, drukst 18:00–21:00. (2) Loma Park Night Market (naast Promthep, alleen avond) — kleiner, authentieker, minder Engels. (3) Rat-U-Thit Road stalletjes (na zonsondergang) — 60 THB pad thai, 80 THB pad krapow, op plastic-stoeltjes.' },
    { q: 'Is het eten veilig in Patong?',
      a: 'Ja, met drie regels: (1) Kies stalls met lokalen in de rij — hoge omzet = verse ingrediënten. (2) Vermijd voorgekookt eten dat op kamertemperatuur staat, vooral zeevruchten en zuivel. (3) Alleen flessenwater, nooit kraan; ijs in restaurants is industrieel en veilig, ijs van vervallen straatkarren overslaan. Daarmee zit je goed in elke Patong-stall.' },
    { q: 'Wat kosten maaltijden in Patong?',
      a: 'Straatvoedsel: 60–120 THB pp ($2–4). Mid-range Thai (Kitchen by Eve, No.6, Aromas): $5–18 pp. Westerse ketens en upscale Thai (Savoey, Patong Seafood): $25–55 pp. Fine dining (La Gritta, Mom Tri\'s, White Box): $50–100 pp. Drank rekent 50–80% bij mid-range (50 THB bier tot 200 THB wijnglas).' },
    { q: 'Banzaan vs Loma night market — wat is beter?',
      a: 'Banzaan (achter Jungceylon) is groter, toeristischer, Engels menu, 70+ stalls, draait 09:00–22:00 — beste voor first-timers, lunch + diner. Loma Park (naast Promthep, zuidkant) is kleiner, vooral lokalen, 18:00–23:00 — betere straatvoedsel-prijzen maar minder zeevruchten. Banzaan voor variatie, Loma voor goedkope doordeweekse diners.' },
    { q: 'Beste vegetarisch en veganistisch in Patong?',
      a: 'Aromas of India (Rat-U-Thit) heeft het diepste vegetarische menu — 30+ veggie gerechten. Sea Hag (Soi Sea Dragon) is volledig vegan, plant-based Thai klassiekers, 250–400 THB hoofdgerechten. Pum Restaurant leert vegetarische Thai-koken op verzoek. Ontbijt: Kitchen by Eve doet vegetarische Thai-omelet en fruit. Meeste Thai-restaurants passen aan — zeg "jay" (vegetarisch) of "mai sai nuea" (zonder vlees).' },
    { q: 'Waar late-night eten in Patong (na 23:00)?',
      a: 'Bangla Road noodle-stalls (Soi Sea Dragon-zijde) draaien tot 04:00 — 80 THB tom yum, 100 THB pad see ew. McDonald\'s in Jungceylon (24u) en 7-Eleven warme hap (24u). Meeste sit-down sluiten rond middernacht. Drunk-food na 02:00: Soi Sea Dragon noodles of 7-Eleven sandwiches.' },
    { q: 'Kan ik een food tour doen in Patong?',
      a: "Ja — Klook en GetYourGuide draaien 4-uur Patong straatvoedsel-tours ($45–55 pp). Je proeft 8–10 gerechten over Banzaan, Rat-U-Thit en Soi Bangla, Engelse gids. Goed voor first-timers die willen leren wat te bestellen. Cooking classes (3–4u, markt-tour + 4 gerechten + eten): Pum Restaurant ($50) of VJ Cooking Class ($45)." },
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
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/75">{isNl ? 'Patong eten · Night markets' : 'Patong eating · Night markets'}</p>
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">{h1}</h1>
            <p className="mt-4 text-lg lg:text-xl max-w-3xl opacity-95">
              {isNl
                ? 'Patong eten gaat van 60 THB pad krapow op Banzaan Market tot $90 sunset-tasting bij La Gritta. Hier vind je 10 restaurants over alle prijsklassen, allebei night markets uitgelegd, en hoe je veilig en lekker eet zonder in toeristen-traps te trappen.'
                : "Patong eating runs from 60 THB pad krapow at Banzaan Market to $90 sunset-tasting at La Gritta. Here are 10 restaurants across every price tier, both night markets explained, and how to eat well + safe without falling into the tourist-trap routes."}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={withSubId(KLOOK_GENERIC, sub('hero-klook'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">
                {isNl ? 'Patong food tours op Klook' : 'Patong food tours on Klook'} →
              </a>
              <a href={withSubId(GYG_GENERIC, sub('hero-gyg'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-[#1B9E3E] text-white px-6 py-3 text-base font-semibold hover:bg-[#157a30]">
                {isNl ? 'Cooking classes op GetYourGuide' : 'Cooking classes on GetYourGuide'} →
              </a>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs opacity-90">
              <span>✔ 10 {isNl ? 'restaurants vergeleken' : 'restaurants compared'}</span>
              <span>✔ 2 {isNl ? 'night markets' : 'night markets'}</span>
              <span>✔ {isNl ? 'Bijgewerkt' : 'Updated'} {new Date(lastUpdated).toLocaleDateString(isNl ? 'nl-NL' : 'en', { year: 'numeric', month: 'long' })}</span>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Restaurant comparison table */}
          <section id="comparison">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">{isNl ? 'Snelle vergelijking: 10 Patong restaurants' : 'Quick comparison: 10 Patong restaurants'}</h2>
            <p className="text-gray-600 mb-6">{isNl ? 'Alle prijsklassen, alle keukens — van straatvoedsel tot fine dining.' : 'Every price tier, every cuisine — from street food to fine dining.'}</p>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Restaurant' : 'Restaurant'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Keuken' : 'Cuisine'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Prijs' : 'Price'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Locatie' : 'Area'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Beste voor' : 'Best for'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {restaurants.map((r, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-gray-900">{r.name}</td>
                      <td className="px-4 py-3 text-gray-700">{r.cuisine}</td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{r.priceRange}</td>
                      <td className="px-4 py-3 text-gray-700">{r.area}</td>
                      <td className="px-4 py-3 text-gray-700">{r.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Detailed reviews */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Per restaurant — wat maakt het bijzonder' : 'Each restaurant — what makes it stand out'}</h2>
            <div className="space-y-4">
              {restaurants.map((r, i) => (
                <div key={i} className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                  <h3 className="font-heading text-lg font-bold text-gray-900 mb-1">{r.name}</h3>
                  <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">{r.cuisine} · {r.priceRange} · {r.area}</p>
                  <p className="text-gray-700 text-sm leading-relaxed">{r.note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Night markets */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'De twee night markets' : 'The two night markets'}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white p-6 shadow-sm border-l-4 border-thailand-red">
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">Banzaan Fresh Market</h3>
                <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">{isNl ? 'Achter Jungceylon Mall · 09:00–22:00 · Druk 18:00–21:00' : 'Behind Jungceylon Mall · 09:00–22:00 · Busy 18:00–21:00'}</p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {isNl
                    ? 'Banzaan is hoofdmarkt van Patong: bovenste etage = warm eten, onder = verse vis, fruit, kruiden. Bovenste etage 70+ stalls (60 THB pad krapow, 80 THB pad thai, 250 THB hele vis op de grill). Engels menu en 4 talen. Zeevruchten op de tweede etage: zelf vis kiezen, ze grillen het naast de stall — vraag prijs per kg vooraf.'
                    : 'Banzaan is Patong\'s main market: upper floor = hot food, lower = fresh fish, fruit, spices. Upper floor 70+ stalls (60 THB pad krapow, 80 THB pad thai, 250 THB whole grilled fish). English menu and 4 languages. Seafood on second floor: pick fish, they grill next to the stall — confirm price per kg upfront.'}
                </p>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-sm border-l-4 border-thailand-blue">
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">Loma Park Night Market</h3>
                <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">{isNl ? 'Naast Promthep, zuid Patong · 18:00–23:00' : 'Next to Promthep, south Patong · 18:00–23:00'}</p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {isNl
                    ? 'Lokaler dan Banzaan, vrijwel alleen Thai-bezoekers. 30+ stalls met simpel meubilair op het grasveld. Sterk: papaya salade (60 THB), sticky rice met mango (40 THB), grilled chicken (80 THB), boba milk tea (50 THB). Geen Engels menu, wijs gewoon aan. Niet voor zeevruchten — kies Banzaan dan.'
                    : 'More local than Banzaan, mostly Thai diners. 30+ stalls with simple seating on the lawn. Highlights: papaya salad (60 THB), sticky rice with mango (40 THB), grilled chicken (80 THB), boba milk tea (50 THB). No English menu, just point. Skip for seafood — go to Banzaan for that.'}
                </p>
              </div>
            </div>
          </section>

          {/* Cooking classes + food tours */}
          <section className="rounded-2xl bg-thailand-red/5 border-2 border-thailand-red p-6">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Food tours en cooking classes' : 'Food tours and cooking classes'}</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              {isNl
                ? 'Voor first-timers die niet willen gokken: een 4-uur Patong food tour ($45–55 pp) leidt je langs 8–10 dishes over Banzaan, Rat-U-Thit en Soi Bangla met Engelse gids. Voor wie wil leren koken: Pum Restaurant ($50, 4 uur, markt-tour + 4 dishes) of VJ Cooking Class ($45).'
                : 'For first-timers who don\'t want to gamble: a 4-hour Patong food tour ($45–55 pp) walks you through 8–10 dishes across Banzaan, Rat-U-Thit and Soi Bangla with an English-speaking guide. For learning to cook: Pum Restaurant ($50, 4 hours, market tour + 4 dishes) or VJ Cooking Class ($45).'}
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={withSubId(KLOOK_GENERIC, sub('food-tour-klook'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">
                {isNl ? 'Bekijk Patong food tours op Klook' : 'See Patong food tours on Klook'} →
              </a>
              <a href={withSubId(GYG_GENERIC, sub('food-tour-gyg'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-[#1B9E3E] text-white px-5 py-2 text-sm font-semibold hover:bg-[#157a30]">
                {isNl ? 'GetYourGuide cooking classes' : 'GetYourGuide cooking classes'} →
              </a>
            </div>
          </section>

          {/* Buyer's tips */}
          <section className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Eet-tips voor Patong' : 'Patong eating tips'}</h2>
            <ul className="space-y-3 text-gray-800">
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Beach Road = toeristen-prijzen' : 'Beach Road = tourist prices'}</strong>{isNl ? '. Zelfde gerecht is 30–50% goedkoper op Rat-U-Thit, één straat landinwaarts.' : '. Same dish is 30–50% cheaper on Rat-U-Thit, one street back from the beach.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Vraag spice-level' : 'Confirm spice level'}</strong>{isNl ? ': "phet noi" = mild, "phet" = medium, "phet phet" = vurig. Toerist-versies zijn vaak al milder.' : ': "phet noi" = mild, "phet" = medium, "phet phet" = fiery. Tourist versions are often pre-toned-down.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Drink-mark-up' : 'Drink markup'}</strong>{isNl ? ': bier in restaurants 80–150 THB; in 7-Eleven 50 THB. Bestel water (gratis bij meeste eet-stalls) en koop bier in de winkel.' : ': beer in restaurants 80–150 THB; in 7-Eleven 50 THB. Order water (free at most stalls) and grab beer at the shop.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Boek fine dining vooruit' : 'Book fine dining ahead'}</strong>{isNl ? ': La Gritta sunset tafels gaan 1 week vooruit op slot. Mom Tri\'s tasting menu vraagt 2 dagen vooruit.' : ": La Gritta sunset tables sell out 1 week ahead. Mom Tri's tasting menu wants 2 days notice."}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Foodpanda en Grab Food werken' : 'Foodpanda and Grab Food work'}</strong>{isNl ? ' — bezorging binnen Patong meestal 30 min, 30–60 THB delivery fee.' : ' — Patong delivery usually 30 min, 30–60 THB fee.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Eilander vis-avond bij hotels' : 'Hotel "island BBQ" nights'}</strong>{isNl ? ': $30–50 buffet, vaak met live muziek, prima voor 1 keer. Maar de échte vis is goedkoper en verser bij Banzaan of Patong Seafood.' : ': $30–50 buffet, often with live music, fine once. But real fish is cheaper and fresher at Banzaan or Patong Seafood.'}</span></li>
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
              <Link href="/phuket/patong/hotels/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏨 Patong hotels' : '🏨 Patong hotels'}</Link>
              <Link href="/phuket/patong/nightlife/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🌃 Bangla Road nightlife' : '🌃 Bangla Road nightlife'}</Link>
              <Link href="/best-hotels/phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏝️ Beste hotels Phuket' : '🏝️ Best hotels Phuket'}</Link>
              <Link href="/flights-to-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '✈️ Vluchten naar Phuket' : '✈️ Flights to Phuket'}</Link>
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
  const file = path.join(process.cwd(), 'data', 'pseo', 'areas', 'patong-partners.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  return { props: { partners: data.partners, lastUpdated: data.lastUpdated }, revalidate: 604800 };
};
