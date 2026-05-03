import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import SEOHead from '../../../../components/SEOHead';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import { withSubId } from '../../../../lib/affiliates';
import { useSubId } from '../../../../lib/useSubId';

interface PartnerEntry { partnerUrl: string; label: string }
interface Partners { [key: string]: PartnerEntry }
interface Props { partners: Partners; lastUpdated: string }

export default function PhuketOldTownThingsToDoPage({ partners, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const subId = useSubId();
  const placement = (p: string) => `${subId}-pseo-phuket-old-town-things-to-do-${p}`;

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Phuket', href: '/city/phuket/' },
    { name: 'Old Town', href: '/phuket/old-town/' },
    { name: isNl ? 'Dingen te doen' : 'Things to Do', href: '/phuket/old-town/things-to-do/' },
  ];

  // Title <60 — KW: "things to do in phuket old town" 100/KD1, variants total 200 vol
  const seoTitle = isNl
    ? 'Dingen te doen in Phuket Old Town: 10 Tips (2026)'      // 51
    : 'Things to Do in Phuket Old Town: 10 Highlights (2026)';  // 53

  const h1 = isNl
    ? '10 dingen te doen in Old Phuket Town: musea, art, food, foto-spots'
    : '10 Things to Do in Old Phuket Town: Museums, Art, Food & Photo Spots';

  const seoDescription = isNl
    ? 'Op zoek naar dingen te doen in Phuket Old Town? 10 specifieke stops: Trickeye Museum, Thai Hua, Soi Romanee street art, Chinpracha House en meer.'
    : 'Looking for things to do in old Phuket town? 10 specific stops: Trickeye Museum, Thai Hua, Soi Romanee street art, Chinpracha House and more.';

  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/phuket/old-town/things-to-do/`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({ '@type': 'ListItem', position: i + 1, name: b.name, item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}` })),
  };

  const things = [
    {
      name: 'Soi Romanee',
      en: { intro: '80 m of pastel-painted shophouses between Thalang and Dibuk — the single most photographed street in Phuket. Free, open 24/7. Best light: 08:00–10:00 (no shadow on west side) or 16:30–17:30 (warm late sun on east).', tip: 'Free' },
      nl: { intro: '80 m pastel-shophouses tussen Thalang en Dibuk — de meest gefotografeerde straat van Phuket. Gratis, 24/7 open. Beste licht: 08:00–10:00 (geen schaduw westzijde) of 16:30–17:30 (warme zon op oostzijde).', tip: 'Gratis' },
    },
    {
      name: 'Thai Hua Museum',
      en: { intro: 'The old Thai Hua School (1934), restored 2010. Best place to learn Sino-Portuguese history in 60 min: Chinese-immigration story, Hokkien-Thai weddings, tin-mining. Krabi Road. 200 THB, 09:00–17:00, closed Mon.', tip: '200 THB · 60 min' },
      nl: { intro: 'De oude Thai Hua-school (1934), gerestaureerd in 2010. Beste plek om in 60 min de Sino-Portugese geschiedenis te leren: Chinese immigratie, Hokkien-Thai-bruiloften, tin-mijnbouw. Krabi Road. 200 THB, 09:00–17:00, dicht ma.', tip: '200 THB · 60 min' },
    },
    {
      name: 'Chinpracha House',
      en: { intro: '1903 Sino-Portuguese mansion still in family ownership — descendants of tin-baron Phra Pitak Chinpracha live in part of it. Tour the front rooms: original tile floors, Italian glass, Hokkien shrine. 150 THB.', tip: '150 THB · authentic' },
      nl: { intro: 'Sino-Portugees herenhuis uit 1903, nog steeds familiebezit — afstammelingen van tin-baron Phra Pitak Chinpracha wonen er. Voorvertrekken te bezichtigen: originele tegels, Italiaans glas, Hokkien-altaar. 150 THB.', tip: '150 THB · authentiek' },
    },
    {
      name: 'Phuket Trickeye Museum',
      en: { intro: '4,200 m² of optical-illusion painted scenes — kid magnet, surprisingly fun for adults too if you commit to the photos. Allow 90 min. Phang Nga Road. 500 THB adults / 300 THB kids.', tip: '500 THB · families' },
      nl: { intro: '4.200 m² geschilderde optische-illusie-scènes — kindermagneet, ook voor volwassenen leuk als je je over geeft aan de foto’s. Reken 90 min. Phang Nga Road. 500 THB volwassenen / 300 THB kids.', tip: '500 THB · families' },
    },
    {
      name: 'Standard Chartered Building',
      en: { intro: '1907 colonial bank — first Standard Chartered branch in Thailand. Now houses the Peranakanitat Museum (free entry). The Krabi Road landmark for architecture buffs. 2-storey colonnaded facade is the icon shot.', tip: 'Free entry' },
      nl: { intro: 'Koloniale bank uit 1907 — de eerste Standard Chartered-vestiging in Thailand. Nu het Peranakanitat-museum (gratis). Het Krabi Road-monument voor architectuur-fans. De 2-laagse zuilengalerij is de icoon-foto.', tip: 'Gratis' },
    },
    {
      name: 'Phuket Mining Museum',
      en: { intro: '15 min south of Old Town in Kathu — outdoor museum on the tin-mining era that built Old Town. Reconstructions of old mine, dredge, miners’ houses. Skip if short on time, must-see if you’re into industrial history. 100 THB.', tip: '100 THB · context' },
      nl: { intro: '15 min ten zuiden van Old Town in Kathu — openluchtmuseum over het tin-mijnbouw-tijdperk dat Old Town bouwde. Reconstructies van mijn, dredger, mijnwerkershuizen. Skip bij weinig tijd, must-see voor industriële historie. 100 THB.', tip: '100 THB · context' },
    },
    {
      name: 'Sunday Walking Street',
      en: { intro: 'Every Sunday 16:00–22:00, Thalang Road closes for 400 m of food, crafts, live music. The best evening in Old Town if your visit lines up. Detail page: /phuket/old-town/night-market/.', tip: 'Sun 16–22:00' },
      nl: { intro: 'Elke zondag 16:00–22:00 sluit Thalang Road voor 400 m food, crafts, live muziek. Beste avond in Old Town als je bezoek erop valt. Detail: /phuket/old-town/night-market/.', tip: 'Zo 16–22:00' },
    },
    {
      name: 'Bookhemian + cafe-hop',
      en: { intro: '4 cafes in 6 blocks — Bookhemian (literary), Campus Coffee Roasters (third-wave), Glur (vegan), and The Memory at On On (historic). Plan a 2-hour caffeine crawl with cooling-off A/C between Old Town walks.', tip: '~250 THB / cafe' },
      nl: { intro: '4 cafés in 6 blokken — Bookhemian (literair), Campus Coffee Roasters (third-wave), Glur (vegan), The Memory at On On (historisch). Plan een 2-uur cafeïne-route met AC-pauzes tussen wandelblokken.', tip: '~250 THB / café' },
    },
    {
      name: 'Hokkien noodle lunch',
      en: { intro: 'Hokkien mee at Lock Tien food court (Yaowarat × Sutham) is the dish — wide yellow noodles, dark soy, pork crackling, fresh lime. 80 THB. Also try oh tow (oyster omelette) at the next stall. Closed Mondays.', tip: '80 THB · iconic' },
      nl: { intro: 'Hokkien mee bij Lock Tien-foodcourt (Yaowarat × Sutham) is hét gerecht — brede gele noedels, donkere soja, pork crackling, verse limoen. 80 THB. Probeer ook de oh tow (oester-omelet) bij het stalletje ernaast. Dicht ma.', tip: '80 THB · iconisch' },
    },
    {
      name: 'Self-guided photo route',
      en: { intro: 'Free 90-min loop: Thalang → Soi Romanee → Dibuk → Krabi → Yaowarat → back to Thalang. 12 photo spots, no entry fees, plenty of cafes for breaks. Print a map or load offline before you arrive — cell signal is patchy in some shophouse interiors.', tip: 'Free · 90 min' },
      nl: { intro: 'Gratis 90-min route: Thalang → Soi Romanee → Dibuk → Krabi → Yaowarat → terug Thalang. 12 fotospots, geen entree, genoeg cafés voor pauze. Print een kaart of laad offline — mobiel signaal is wisselend binnen shophouses.', tip: 'Gratis · 90 min' },
    },
  ];

  const faqList = isNl ? [
    { q: 'Wat is de #1 ding te doen in Old Phuket Town?', a: 'Walking Sino-Portuguese shophouses op Thalang Road en Soi Romanee. Gratis, het meest fotogeniek, en het verhaal achter Phuket. Combineer met lunch bij Lock Tien en het Thai Hua Museum voor een volle halve dag.' },
    { q: 'Hoeveel tijd heb je nodig voor Old Town?', a: '3–4 uur dekt de top-6 stops. Een volle dag (6+ uur) voegt 2 musea, 2 cafés en diner toe. Op zondag: blijf voor de Walking Street markt 16:00–22:00.' },
    { q: 'Is Phuket Old Town gratis?', a: 'Lopen op Thalang, Soi Romanee, Dibuk: gratis. Musea: 100–500 THB. Walking tour: $25–35 pp. De meeste reizigers besteden ~600 THB ($18) aan musea + lunch.' },
    { q: 'Kunnen kinderen iets in Old Town?', a: 'Ja — Trickeye Museum (4–14 jaar) is de duidelijke kindwinnaar. Sunday Walking Street is goed voor +6, Soi Romanee fotostop werkt voor alle leeftijden. Skip Chinpracha House <8 (statisch museum).' },
    { q: 'Welke dag is dicht voor Old Town musea?', a: 'Maandag is de risicodag — Thai Hua, Lock Tien-foodcourt en sommige shop-cafés zijn dan dicht. Trickeye en Chinpracha zijn 7 dagen open. Plan musea op di–zo.' },
  ] : [
    { q: 'What is the #1 thing to do in old Phuket town?', a: 'Walk the Sino-Portuguese shophouses on Thalang Road and Soi Romanee. Free, most photogenic, the story behind Phuket. Combine with lunch at Lock Tien food court and Thai Hua Museum for a full half-day.' },
    { q: 'How much time do you need for Old Town?', a: '3–4 hours covers the top 6 stops. A full day (6+ hours) adds 2 museums, 2 cafes and dinner. On a Sunday: stay through to the Walking Street market 16:00–22:00.' },
    { q: 'Is Phuket Old Town free to visit?', a: 'Walking Thalang, Soi Romanee, Dibuk: free. Museums: 100–500 THB. Walking tour: $25–35 pp. Most travellers spend ~600 THB ($18) on museums + lunch.' },
    { q: 'Are there things to do for kids in Old Town?', a: 'Yes — Trickeye Museum (ages 4–14) is the clear kid winner. Sunday Walking Street is good for 6+, Soi Romanee photo stop works for all ages. Skip Chinpracha House if under 8 (static museum).' },
    { q: 'What day is closed in Old Town?', a: 'Monday is the risky day — Thai Hua Museum, Lock Tien food court and some shop cafes close. Trickeye and Chinpracha House are open 7 days. Plan museums Tue–Sun.' },
  ];

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
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/75">{isNl ? 'Old Town activiteiten' : 'Old Town activities'}</p>
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">{h1}</h1>
            <p className="mt-4 text-lg lg:text-xl max-w-3xl opacity-95">
              {isNl
                ? 'Een volle gids voor wie zich afvraagt wat er in Old Phuket Town te doen is. Geen lijst van 30 stops — 10 die het echt waard zijn, met prijs, tijd, en hoe je ze in 4 uur combineert.'
                : "A full guide for travelers wondering what's worth doing in old Phuket town. Not a list of 30 stops — 10 that genuinely earn the time, with price, duration, and how to thread them in 4 hours."}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={withSubId(partners.klook_things.partnerUrl, placement('hero-primary'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">
                {isNl ? 'Walking tour boeken op Klook' : 'Book a walking tour on Klook'} →
              </a>
              <a href={withSubId(partners.tiqets_things.partnerUrl, placement('hero-tiqets'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-white text-thailand-blue border border-white/40 px-6 py-3 text-base font-semibold hover:bg-white/90">
                {isNl ? 'Museum-tickets op Tiqets' : 'Museum tickets on Tiqets'} →
              </a>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
          {/* The 10 things */}
          <section className="space-y-4">
            {things.map((t, i) => (
              <article key={i} className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-heading text-xl font-bold text-gray-900">{i + 1}. {t.name}</h2>
                  <span className="shrink-0 inline-block rounded-full bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1">{isNl ? t.nl.tip : t.en.tip}</span>
                </div>
                <p className="mt-2 text-gray-700 text-sm leading-relaxed">{isNl ? t.nl.intro : t.en.intro}</p>
              </article>
            ))}
          </section>

          {/* CTA mid-page — buyers' bridge */}
          <section className="rounded-2xl bg-thailand-red/5 border-2 border-thailand-red p-6">
            <h2 className="font-heading text-xl font-bold text-gray-900 mb-2">{isNl ? 'Liever niet zelf plannen?' : 'Rather not plan it yourself?'}</h2>
            <p className="text-gray-700 leading-relaxed mb-3">{isNl ? 'Een 2,5-uur walking tour ($25–35 pp) doet 6 stops, vertelt het verhaal en eindigt bij lunch. Beste optie voor een eerste-bezoek aan Phuket.' : 'A 2.5-hour walking tour ($25–35 pp) covers 6 stops, tells the story and ends at lunch. Best option for a first-time Old Town visit.'}</p>
            <div className="flex flex-wrap gap-3">
              <a href={withSubId(partners.klook_things.partnerUrl, placement('mid-klook'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">{isNl ? 'Klook walking tour' : 'Klook walking tour'} →</a>
              <a href={withSubId(partners.gyg_things.partnerUrl, placement('mid-gyg'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-[#1B9E3E] text-white px-5 py-2 text-sm font-semibold hover:bg-[#157a30]">{isNl ? 'GetYourGuide opties' : 'GetYourGuide options'} →</a>
            </div>
          </section>

          {/* Suggested route */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Aanbevolen volgorde (4 uur)' : 'Suggested order (4 hours)'}</h2>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700 text-sm">
              <li>{isNl ? '08:30 — Bookhemian (Thalang) voor cappuccino + start' : '08:30 — Bookhemian (Thalang) for cappuccino + start'}</li>
              <li>{isNl ? '09:00 — Soi Romanee fotostop (15 min)' : '09:00 — Soi Romanee photo stop (15 min)'}</li>
              <li>{isNl ? '09:30 — Thai Hua Museum (60 min)' : '09:30 — Thai Hua Museum (60 min)'}</li>
              <li>{isNl ? '10:30 — Wandelen Krabi → Standard Chartered → Trickeye (90 min)' : '10:30 — Walk Krabi → Standard Chartered → Trickeye (90 min)'}</li>
              <li>{isNl ? '12:00 — Lunch Lock Tien food court (Hokkien mee)' : '12:00 — Lunch Lock Tien food court (Hokkien mee)'}</li>
              <li>{isNl ? '13:00 — Chinpracha House (40 min) of Bookhemian-pauze' : '13:00 — Chinpracha House (40 min) or Bookhemian rest'}</li>
            </ol>
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

          {/* Cluster mesh — UP + sibling + cross */}
          <section className="rounded-2xl bg-thailand-blue/10 p-6">
            <h2 className="font-heading text-xl font-bold text-gray-900">{isNl ? 'Verder met Old Town en Phuket' : 'More on Old Town and Phuket'}</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/phuket/old-town/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">{isNl ? '↑ Phuket Old Town gids' : '↑ Phuket Old Town guide'}</Link>
              <Link href="/phuket/old-town/night-market/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🌃 Sunday night market' : '🌃 Sunday night market'}</Link>
              <Link href="/best-hotels/phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏨 Hotels Phuket' : '🏨 Phuket hotels'}</Link>
              <Link href="/yacht-charter-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '⛵ Yacht charter' : '⛵ Yacht charter'}</Link>
              <Link href="/city/phuket/" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">{isNl ? '📖 Phuket reisgids' : '📖 Phuket travel guide'}</Link>
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
