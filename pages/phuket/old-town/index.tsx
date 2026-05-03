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

export default function PhuketOldTownPillarPage({ partners, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const subId = useSubId();
  const placement = (p: string) => `${subId}-pseo-phuket-old-town-${p}`;

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Phuket', href: '/city/phuket/' },
    { name: isNl ? 'Old Town' : 'Old Town', href: '/phuket/old-town/' },
  ];

  // Title <60, keyword front, modifier — primary KW: "phuket old town" 900/KD3
  const seoTitle = isNl
    ? 'Phuket Old Town (2026): Sino-Portugese Wijk Gids'           // 49
    : 'Phuket Old Town Guide (2026): Sino-Portuguese Walking Tour'; // 56

  // H1 different — uses secondary keyword variations ("old phuket town", "old town phuket")
  const h1 = isNl
    ? 'Old Phuket Town: pastelpanden, foodstops en het echte verhaal'
    : 'Inside Old Phuket Town: Pastel Shophouses, Food Stops & the Real Story';

  // Meta desc <155 + question hook + KW variation
  const seoDescription = isNl
    ? 'Op zoek naar Phuket Old Town? Bekijk de Sino-Portugese wijk: Thalang Road, Soi Romanee street art, Sunday Walking Street en de beste foodstops.'
    : 'Wondering what Phuket Old Town is really about? Sino-Portuguese shophouses, Thalang Road, Soi Romanee art, Sunday Walking Street + honest food stops.';

  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/phuket/old-town/`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({
      '@type': 'ListItem', position: i + 1, name: b.name,
      item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}`,
    })),
  };

  const faqEn = [
    { q: 'Where exactly is Phuket Old Town?', a: 'Phuket Old Town is the historic core of Phuket City (also called Phuket Town), in the south-east of the island roughly 45 min from Patong, 35 min from Karon and 20 min from the airport via expressway. The "old town" itself is a tight grid centred on Thalang Road, Dibuk Road, Soi Romanee and Krabi Road — about 6 blocks you can walk in 90 minutes.' },
    { q: "What's special about Phuket Old Town?", a: 'It is the only intact Sino-Portuguese (sometimes called "Peranakan") quarter in southern Thailand. Tin-mining wealth from the 1860s–1920s built two- and three-storey shophouses with European-Chinese hybrid architecture, brightly painted in pastels. Add Hokkien-Thai food, two heritage museums and Soi Romanee street-art and you have the most photogenic, walkable district anywhere in Phuket.' },
    { q: 'Is Phuket Old Town worth visiting?', a: 'Yes — even on a beach holiday, Old Town is the easiest half-day in Phuket that is not a beach. Most travellers spend 3–4 hours: a morning cafe + walking the shophouses, lunch on Thalang Road, an afternoon museum (Thai Hua or Chinpracha House) and home before the heat. On a Sunday evening, swap morning for the Walking Street night market 16:00–22:00.' },
    { q: 'How much time should I spend in Old Town?', a: 'A focused half-day (3–4 hours) covers the highlights: Thalang Road shophouses, Soi Romanee, Phuket Trickeye Museum or Thai Hua Museum, lunch at Lock Tien food court or One Chun. A full day (6+ hours) lets you add Chinpracha House, the Standard Chartered Building, two cafes and dinner at Raya. On a Sunday: stay through to the night market.' },
    { q: 'How do I get to Phuket Old Town from Patong?', a: 'By taxi or Grab: 45–55 min, ~700 THB ($20). By rental scooter: 35 min via Route 4020. By local songthaew: 90 min, 30 THB — leaves from Phuket Bus Terminal 1 (uncomfortable, only worth it on a budget). Most travellers Grab there in the morning, walk the town, and Grab back. Verify the Grab driver has a meter or the price agreed up front.' },
    { q: 'Is Old Town the same as Phuket Town?', a: 'Phuket Town (also "Phuket City") is the modern provincial capital — administrative, with hospitals, banks and shopping malls. "Phuket Old Town" or "Old Phuket Town" specifically means the small heritage quarter inside Phuket Town. So Old Town is in Phuket Town. Use "Phuket Old Town" or "Old Town" when searching for the historic part.' },
    { q: 'When is the Sunday Walking Street?', a: 'Every Sunday, 16:00–22:00, on Thalang Road which closes to traffic. About 400 m of food stalls, craft vendors and live performances. Peak crowds 18:30–20:30 — arrive at 17:00 if you want photos without elbows in the frame. Even when it rains the market runs (vendors put up tarps), but expect 30 % fewer stalls.' },
  ];
  const faqNl = [
    { q: 'Waar ligt Phuket Old Town precies?', a: 'Phuket Old Town is de historische kern van Phuket City (ook Phuket Town), in het zuidoosten van het eiland — 45 min vanaf Patong, 35 min vanaf Karon, 20 min vanaf het vliegveld via de tolweg. De "old town" zelf is een compact rooster rond Thalang Road, Dibuk Road, Soi Romanee en Krabi Road — ongeveer 6 blokken die je in 90 minuten loopt.' },
    { q: 'Wat is bijzonder aan Phuket Old Town?', a: 'Het is de enige intacte Sino-Portugese ("Peranakan") wijk in Zuid-Thailand. Tin-mijnbouw-rijkdom uit 1860–1920 bouwde twee- en drielaagse shophouses met Europees-Chinese hybride architectuur, in pastel geverfd. Voeg Hokkien-Thais eten, twee heritage-musea en de Soi Romanee street-art toe en je hebt de meest fotogenieke, beloopbare wijk van Phuket.' },
    { q: 'Is Phuket Old Town de moeite waard?', a: 'Ja — zelfs op een strandvakantie is Old Town de makkelijkste halve dag in Phuket die geen strand is. De meeste reizigers besteden 3–4 uur: een ochtendcafé, langs de shophouses lopen, lunch op Thalang Road, een middag in een museum (Thai Hua of Chinpracha House) en thuis voor de hitte. Op zondag vervang ochtend door Walking Street 16:00–22:00.' },
    { q: 'Hoeveel tijd moet ik plannen in Old Town?', a: 'Een halve dag (3–4 uur) dekt de highlights: Thalang Road, Soi Romanee, Phuket Trickeye of Thai Hua Museum, lunch bij Lock Tien-foodcourt of One Chun. Een volle dag (6+ uur) voegt Chinpracha House, het Standard Chartered Building, twee cafés en diner bij Raya toe. Op zondag: blijf voor de nachtmarkt.' },
    { q: 'Hoe kom ik in Old Town vanuit Patong?', a: 'Met taxi/Grab: 45–55 min, ~700 THB ($20). Met huurscooter: 35 min via route 4020. Met lokale songthaew: 90 min, 30 THB — vertrekt vanaf Phuket Bus Terminal 1 (oncomfortabel, alleen op een laag budget). De meeste reizigers Grab heen ‘s ochtends, lopen het, Grab terug. Check dat de chauffeur een meter heeft of dat de prijs vooraf is afgesproken.' },
    { q: 'Is Old Town hetzelfde als Phuket Town?', a: 'Phuket Town (ook "Phuket City") is de moderne provinciehoofdstad — administratie, ziekenhuizen, banken, malls. "Phuket Old Town" of "Old Phuket Town" is het kleine heritage-gedeelte binnen Phuket Town. Old Town zit dus in Phuket Town. Gebruik "Phuket Old Town" of "Old Town" als je het historische zoekt.' },
    { q: 'Wanneer is de Sunday Walking Street?', a: 'Elke zondag 16:00–22:00 op Thalang Road, dat dan voor verkeer sluit. Zo’n 400 m foodstalls, craft-vendors en live-muziek. Pieken 18:30–20:30 — kom om 17:00 voor foto’s zonder ellebogen in beeld. Ook bij regen draait de markt (zeilen erover), maar reken op 30% minder stalls.' },
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
                ? 'Phuket Old Town is geen strand. Het is een kleine, lopende heritage-wijk met pastel shophouses uit de tin-mijnbouw, een zondagse nachtmarkt en de beste Hokkien-Thaise food op het eiland. In 3–4 uur loop je het belangrijkste — hier is hoe je het slim doet.'
                : "Phuket Old Town isn't a beach. It's a small walking heritage quarter of pastel tin-era shophouses, a Sunday night market and the best Hokkien-Thai food on the island. You can walk the highlights in 3–4 hours — here's how to do it smart."}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={withSubId(partners.klook_pillar.partnerUrl, placement('hero-primary'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">
                {isNl ? 'Old Town walking tour op Klook' : 'Old Town walking tour on Klook'} →
              </a>
              <a href={withSubId(partners.gyg_pillar.partnerUrl, placement('hero-secondary'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-[#1B9E3E] text-white px-6 py-3 text-base font-semibold hover:bg-[#157a30]">
                {isNl ? 'Vergelijk op GetYourGuide' : 'Compare on GetYourGuide'} →
              </a>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs opacity-90">
              <span>✔ 6 {isNl ? 'blokken te lopen' : 'walkable blocks'}</span>
              <span>✔ {isNl ? 'Sunday Walking Street 16:00–22:00' : 'Sunday Walking Street 16:00–22:00'}</span>
              <span>✔ {isNl ? 'Bijgewerkt' : 'Updated'} {new Date(lastUpdated).toLocaleDateString(isNl ? 'nl-NL' : 'en', { year: 'numeric', month: 'long' })}</span>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Quick stats */}
          <section className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Old Town in één oogopslag' : 'Old Town at a glance'}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Looptijd' : 'Walking time'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">{isNl ? '3–4 uur' : '3–4 hours'}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Beste tijd' : 'Best time'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">{isNl ? '08:00–11:00' : '08:00–11:00'}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Vanaf Patong' : 'From Patong'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">{isNl ? '45–55 min' : '45–55 min'}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Markt' : 'Market'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">{isNl ? 'Zondag' : 'Sunday'}</p></div>
            </div>
          </section>

          {/* History / Sino-Portuguese */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Sino-Portugese architectuur: het korte verhaal' : 'Sino-Portuguese architecture: the short story'}</h2>
            <div className="prose max-w-none text-gray-700 leading-relaxed">
              <p>{isNl
                ? 'Tussen 1860 en 1920 was Phuket de grootste tin-mijnbouw-hub van Zuidoost-Azië. Hokkien-Chinese ondernemers, Britse koloniale ingenieurs en Portugese handelaren uit Macau bouwden samen de stad uit. Het resultaat: shophouses die er Chinees uitzien (binnenplaatsen, altaartjes), maar Europees zijn aan de buitenkant (gepleisterde gevels, pilaren, gestucte ornamenten). De stijl heet officieel "Sino-Portuguese" — soms ook "Peranakan", al verwijst dat eigenlijk naar de Chinees-Maleise mengcultuur.'
                : 'Between 1860 and 1920 Phuket was the largest tin-mining hub in Southeast Asia. Hokkien Chinese entrepreneurs, British colonial engineers and Portuguese traders out of Macau built the town together. The result: shophouses that look Chinese inside (courtyards, ancestor shrines) but European outside (plastered facades, columns, stucco ornament). The style is officially "Sino-Portuguese" — sometimes called "Peranakan", though that strictly refers to the Straits Chinese-Malay culture.'}</p>
              <p>{isNl
                ? 'Toen de tinprijs crashte in 1985 sloten de mijnen. De wijk verloor haar rijke families maar behield de gebouwen — met restauratiewerken sinds 2002 zijn de meeste pastel-shophouses op Thalang Road, Dibuk Road, Krabi Road en Yaowarat Road nu in volle glorie. Beste voorbeelden: het Standard Chartered Building (1907, eerste bank van Thailand buiten Bangkok), de Phuket Provincial Hall en de oude Thai Hua School (nu museum).'
                : 'When tin prices crashed in 1985 the mines closed. The quarter lost its rich families but kept its buildings — restoration since 2002 has brought most of the pastel shophouses on Thalang, Dibuk, Krabi and Yaowarat roads back to full colour. Best examples: the Standard Chartered Building (1907, first bank in Thailand outside Bangkok), the Phuket Provincial Hall and the old Thai Hua School (now a museum).'}</p>
            </div>
          </section>

          {/* Top pick: walking tour */}
          <section className="rounded-2xl bg-thailand-red/5 border-2 border-thailand-red p-6">
            <span className="inline-block rounded-full bg-thailand-red text-white text-xs font-bold uppercase tracking-wide px-3 py-1 mb-3">⭐ {isNl ? 'Beste eerste-bezoek' : 'Best first visit'}</span>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Begeleide walking tour (~$30, 2,5 uur)' : 'Guided walking tour (~$30, 2.5 hours)'}</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              {isNl
                ? 'Self-guided is gratis, maar voor je eerste-bezoek leert een 2,5 uur tour je verschillen tussen Hokkien- en Hainan-shophouses, welke gebouwen authentiek zijn vs gerenoveerd, en wáár de echte Hokkien noodles zitten — niet de tourist-shop versie. Tussen $25 en $35 pp, ochtend-tour 09:00 vermijdt zon en sluit af met lunchpauze.'
                : "Self-guided is free, but on a first visit a 2.5-hour tour teaches you what's authentic vs restored, the difference between Hokkien and Hainan shophouses, and where the real Hokkien noodles are vs the tourist version. $25–35 pp, the 09:00 morning tour beats the heat and ends at lunch."}
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={withSubId(partners.klook_pillar.partnerUrl, placement('toppick-klook'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">
                {isNl ? 'Walking tour op Klook' : 'Walking tour on Klook'} →
              </a>
              <a href={withSubId(partners.gyg_pillar.partnerUrl, placement('toppick-gyg'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-[#1B9E3E] text-white px-5 py-2 text-sm font-semibold hover:bg-[#157a30]">
                {isNl ? 'Vergelijk op GetYourGuide' : 'Compare on GetYourGuide'} →
              </a>
              <a href={withSubId(partners.tiqets_pillar.partnerUrl, placement('toppick-tiqets'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">
                {isNl ? 'Tickets op Tiqets' : 'Tickets on Tiqets'} →
              </a>
            </div>
          </section>

          {/* Streets to walk — internal H3s */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'De 6 straten die je echt loopt' : 'The 6 streets that actually matter'}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-thailand-blue">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-1">Thalang Road</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'De hoofdader. Hier sluit de straat elke zondagavond voor de Walking Street. Beste pastel-shophouses, beste lunch (Lock Tien-foodcourt), beste cafés (Bookhemian, Campus Coffee Roasters).' : "The main artery. Closes Sunday evenings for the Walking Street market. Best pastel shophouse stretch, best lunch (Lock Tien food court), best cafes (Bookhemian, Campus Coffee Roasters)."}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-amber-500">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-1">Soi Romanee</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'De fotograaf-favoriet. 80 m gele, blauwe en pinkpastel shophouses tussen Thalang en Dibuk. Was vroeger de "red light"-straat van rijke handelaren — nu de meest geïnstagramde 80 m van Phuket.' : "The photographer's favourite. 80 m of yellow, blue and pink pastel shophouses between Thalang and Dibuk. Used to be the rich-merchant red-light street — now the most Instagrammed 80 m on Phuket."}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-emerald-500">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-1">Dibuk Road</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? "Loopt parallel aan Thalang. Rustiger, betere mansions: Chinpracha House (museum) en het Pee Bua Mansion. Boutique-hotels en hipster-cafés komen hier op." : 'Runs parallel to Thalang. Quieter, better mansions: Chinpracha House (museum) and Pee Bua Mansion. Boutique hotels and indie cafes are concentrated here.'}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-purple-500">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-1">Krabi Road</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? "Thai Hua Museum (entree 200 THB), Standard Chartered Building, Phuket Trickeye Museum. De museum-as voor wie 60 minuten in Old Town wil leren in plaats van wandelen." : "Thai Hua Museum (200 THB), Standard Chartered Building, Phuket Trickeye Museum. The museum spine if you want to learn in 60 min instead of just walking."}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-rose-500">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-1">Yaowarat Road</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? "Chinatown-zijde — drukker, lokaler, minder Instagram. Hier zit de Sunday Walking Street voorzetting + beste a-pong-pannenkoekenstal van het eiland." : 'The Chinatown side — busier, more local, less Instagram. The Sunday Walking Street extension runs here + the best a-pong (mini pancake) cart on the island.'}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-sky-500">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-1">Phang Nga Road</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? "On Day Hotel, het Memory at On On Hotel (Leonardo DiCaprio's slaapplek in The Beach), en oude bioscopen. Snelle 10 min wandeling die niet in elke gids staat." : 'On Day Hotel, The Memory at On On Hotel (where DiCaprio slept in The Beach), and old cinemas. A quick 10-min walk most guides skip.'}</p>
              </div>
            </div>
          </section>

          {/* Food + cafe scene */}
          <section className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Foodstops die je echt moet doen' : 'Food stops you actually need to do'}</h2>
            <ul className="space-y-3 text-gray-800 text-sm leading-relaxed">
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>Lock Tien Food Court</strong> {isNl ? '(Yaowarat × Soi Sutham): 4 stalls, 10 zitplekken, Hokkien noodles, oh tow (oester-omelet) en pad mee Hokkien voor 80–100 THB. Open lunch + diner, dicht maandag.' : '(Yaowarat × Soi Sutham): 4 stalls, 10 seats, Hokkien noodles, oh tow (oyster omelette) and pad mee Hokkien for 80–100 THB. Open lunch + dinner, closed Mondays.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>One Chun</strong> {isNl ? '(Thalang Road): elegante shophouse-restaurant, klassieke Phuket-currys (kaeng leuang gele kerrie). 250–500 THB pp. Reserveer voor diner.' : '(Thalang Road): refined shophouse restaurant, classic Phuket curries (kaeng leuang yellow curry). 250–500 THB pp. Book ahead for dinner.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>Raya</strong> {isNl ? '(Dibuk × Thepkasattri): Tony Boudain dineerde hier. Crab curry met gele noodles is hét gerecht (450 THB). Niet goedkoop, wel het bezoek waard.' : '(Dibuk × Thepkasattri): Anthony Bourdain ate here. The crab curry with yellow noodles is the order (450 THB). Not cheap, but worth the trip.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'A-Pong Mae Sunee' : 'A-Pong Mae Sunee'}</strong> {isNl ? '(Walking Street): mini-kokospannenkoeken op kolen, 5 voor 20 THB. Alleen zondagavond 17:00–22:00.' : '(Walking Street): mini coconut pancakes over charcoal, 5 for 20 THB. Sunday evening only, 17:00–22:00.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>Bookhemian</strong> {isNl ? '(Thalang Road): boekenwinkel-café, beste cappuccino in Old Town, AC. Rest-stop voor wie 4 uur loopt.' : '(Thalang Road): bookshop-cafe, best cappuccino in Old Town, A/C. Rest stop after 4 hours of walking.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Mango sticky rice-stalls' : 'Mango sticky rice carts'}</strong> {isNl ? '(Walking Street, hoek Romanee): 80 THB, beste in seizoen apr–jun. Vraag om "khao niao mamuang".' : '(Walking Street, Romanee corner): 80 THB, best in mango season Apr–Jun. Ask for "khao niao mamuang".'}</span></li>
            </ul>
          </section>

          {/* Getting there */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Hoe kom je in Old Town?' : 'How to get to Old Town'}</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Vanaf Patong' : 'From Patong'}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Grab/taxi 45–55 min, ~700 THB ($20). Songthaew 90 min via Phuket Bus Terminal 1, 30 THB. Scooter 35 min via 4020.' : 'Grab/taxi 45–55 min, ~700 THB ($20). Songthaew 90 min via Phuket Bus Terminal 1, 30 THB. Scooter 35 min via Route 4020.'}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Vanaf Karon/Kata' : 'From Karon/Kata'}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Grab 35–45 min, ~600 THB. Mooie scooterroute via 4028 (40 min, leuke heuvels).' : 'Grab 35–45 min, ~600 THB. Nice scooter route via 4028 (40 min, scenic hills).'}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Vanaf het vliegveld' : 'From HKT airport'}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Grab/taxi 25–30 min via expressway, ~600 THB. Bus 40 THB naar Phuket Bus Terminal 2, dan 50 THB naar Old Town.' : 'Grab/taxi 25–30 min via expressway, ~600 THB. Bus 40 THB to Phuket Bus Terminal 2, then 50 THB to Old Town.'}</p>
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

          {/* Sibling spokes — Old Town */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Meer over Phuket Old Town' : 'More on Phuket Old Town'}</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <Link href="/phuket/old-town/things-to-do/" className="block rounded-2xl bg-white p-4 shadow-sm border border-gray-200 hover:border-thailand-blue transition-colors">
                <p className="font-heading font-bold text-gray-900">{isNl ? 'Dingen te doen in Old Town' : 'Things to do in Old Phuket Town'}</p>
                <p className="text-sm text-gray-600 mt-1">{isNl ? '10 stops: Trickeye Museum, Thai Hua, Soi Romanee, Standard Chartered…' : '10 stops: Trickeye Museum, Thai Hua, Soi Romanee, Standard Chartered…'}</p>
                <p className="text-xs text-thailand-blue mt-2 font-semibold">{isNl ? 'Bekijk activiteiten' : 'See activities'} →</p>
              </Link>
              <Link href="/phuket/old-town/night-market/" className="block rounded-2xl bg-white p-4 shadow-sm border border-gray-200 hover:border-thailand-blue transition-colors">
                <p className="font-heading font-bold text-gray-900">{isNl ? 'Sunday Walking Street nachtmarkt' : 'Sunday Walking Street night market'}</p>
                <p className="text-sm text-gray-600 mt-1">{isNl ? '400m foodstalls 16:00–22:00 — wat eten, hoe komen, foto-tips.' : '400m of food stalls 16:00–22:00 — what to eat, how to get there, photo tips.'}</p>
                <p className="text-xs text-thailand-blue mt-2 font-semibold">{isNl ? 'Bekijk markt' : 'See market'} →</p>
              </Link>
            </div>
          </section>

          {/* Cluster mesh — UP to /city/phuket + cross-cluster */}
          <section className="rounded-2xl bg-thailand-blue/10 p-6">
            <h2 className="font-heading text-xl font-bold text-gray-900">{isNl ? 'Plan de rest van je Phuket-trip' : 'Plan the rest of your Phuket trip'}</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/best-hotels/phuket/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">{isNl ? '🏨 Beste hotels in Phuket' : '🏨 Best hotels in Phuket'}</Link>
              <Link href="/flights-to-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '✈️ Vluchten naar Phuket' : '✈️ Flights to Phuket'}</Link>
              <Link href="/car-rental-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🚗 Auto huren' : '🚗 Car rental in Phuket'}</Link>
              <Link href="/yacht-charter-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '⛵ Yacht charter' : '⛵ Yacht charter Phuket'}</Link>
              <Link href="/city/phuket/" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">{isNl ? '📖 Phuket reisgids' : '📖 Phuket travel guide'}</Link>
              <a href={withSubId(KLOOK_GENERIC, placement('mesh-klook'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">{isNl ? '🎟️ Andere Phuket activiteiten' : '🎟️ Other Phuket activities'}</a>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const file = path.join(process.cwd(), 'data', 'pseo', 'areas', 'old-town-partners.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  return { props: { partners: data.partners, lastUpdated: data.lastUpdated }, revalidate: 604800 };
};
