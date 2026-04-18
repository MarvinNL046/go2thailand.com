import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { KLOOK_GENERIC, GYG_GENERIC, VIATOR_GENERIC } from '../../lib/affiliates';

const OFFICIAL_SITE = 'https://www.royalgrandpalace.th/en/home';
const LAST_VERIFIED = 'April 18, 2026';

const FAQ_ITEMS = [
  {
    question: 'How much are Grand Palace tickets in 2026?',
    answer:
      'The official entry fee is 500 THB (about $15) per adult, which includes the Grand Palace grounds plus Wat Phra Kaew (Temple of the Emerald Buddha) and the Queen Sirikit Museum of Textiles on the same ticket. Children under 13 enter free with a guardian. If you book a skip-the-line tour through GetYourGuide, Viator, or Klook, expect $25 to $50 per person for entry plus an English-speaking guide, and $40 to $70 per person for a half-day tour that also covers Wat Pho and Wat Arun.',
  },
  {
    question: 'What time does the Grand Palace open and close?',
    answer:
      'The Grand Palace is open every day from 8:30am to 3:30pm, with last entry at 2:30pm. It runs 365 days a year and almost never closes, despite what a tuk-tuk driver may tell you. The best time to arrive is right at 8:30am opening, because crowds build fast between 10am and 1pm, especially on Sundays and Thai public holidays. If you arrive after 2:30pm you will not be allowed in, so do not leave it until late afternoon.',
  },
  {
    question: 'What is the dress code for the Grand Palace?',
    answer:
      'The dress code is strict and enforced at the gate. Shoulders and knees must be covered. No sleeveless tops, no tank tops, no see-through fabric, no ripped jeans with skin showing, no short skirts, no short shorts, and no open-heel sandals for the Emerald Buddha temple. If you show up wrong, you can rent a sarong, shirt, or long trousers at the on-site rental booth for a 200 THB refundable deposit. Bring your deposit back with your clothing to get the money back.',
  },
  {
    question: 'Is a skip-the-line Grand Palace tour worth it?',
    answer:
      'For most first-time visitors, yes. The official entry line can stretch 30 to 60 minutes between 10am and noon in high season, and the site is confusing without context. A guided tour at $25 to $50 per person bundles entry, a fast-track entrance, and an English-speaking guide who explains the Ramakien murals, Chakri Maha Prasat Hall, and the Emerald Buddha. If you arrive at 8:30am and you have already done your reading, the self-guided route with a 200 THB audio guide is fine.',
  },
  {
    question: 'How long do you need to visit the Grand Palace?',
    answer:
      'Plan on 2 to 3 hours inside. The complex is about 218,000 square meters and includes three outer, middle, and inner courts. Most visitors spend 45 minutes at Wat Phra Kaew, 30 to 45 minutes in the throne hall area around Chakri Maha Prasat, and another 30 minutes wandering the grounds and taking photos. Add another hour if you are combining with Wat Pho next door, and half a day in total if you also cross the river to Wat Arun.',
  },
  {
    question: 'Is the Grand Palace closed today taxi scam real?',
    answer:
      'Yes, and it is the single most common Bangkok tourist scam. A tuk-tuk or taxi driver at a nearby intersection will tell you the Grand Palace is closed today for a royal ceremony or Buddhist holiday, then offer a cheap 20 THB tour to other temples. Every stop ends at a gem shop, tailor, or suit store where they earn commission. Ignore them completely. The Grand Palace is open every day from 8:30am to 3:30pm, including Sundays and holidays. Walk directly to the official entrance on Na Phra Lan Road.',
  },
  {
    question: 'Is the Grand Palace closed on Sundays?',
    answer:
      'No. The Grand Palace is open every day of the year, including Sundays, Buddhist holidays, and Thai public holidays. The only partial closures happen when a royal ceremony occupies a specific hall, in which case that hall alone is closed but the rest of the complex stays open. Anyone telling you the whole site is closed is either confused or running the classic closed-today scam at the gate.',
  },
  {
    question: 'Should I combine the Grand Palace with Wat Pho?',
    answer:
      'Yes, if your timing allows. Wat Pho and its 46-meter reclining Buddha are a 10-minute walk south of the Grand Palace, and entry is only 200 THB. Most tourists do Grand Palace first from 8:30am to 11:30am, then walk to Wat Pho for noon, grab lunch nearby, and take the 4 THB cross-river ferry to Wat Arun in the afternoon. A half-day guided tour packaging all three costs $40 to $70 per person and removes the logistics headache.',
  },
];

const WHY_CARDS = [
  {
    title: 'Crowds peak at 10am',
    body:
      'By 10am the main line at the Na Phra Lan gate is 30 to 60 minutes. Skip-the-line tours enter via a side gate with the guide, which saves the wait and a lot of sweating in the Bangkok sun. Arrive 8:30am self-guided or book a 9am guide slot to stay ahead of the tour buses.',
  },
  {
    title: 'Dress code is strict',
    body:
      'Shoulders and knees must be covered, no exceptions. If you turn up in a tank top or short shorts, you either rent cover-up clothes for a 200 THB deposit or you do not enter. Book a guide-inclusive tour and most operators remind you in the confirmation email, so you arrive dressed right the first time.',
  },
  {
    title: 'Scammers work the gate',
    body:
      'Freelance guides, fake officials, and tuk-tuk drivers cluster outside the entrance telling tourists the palace is closed, a special ceremony is on, or a shortcut tour is cheaper. A pre-booked GetYourGuide, Viator, or Klook voucher with a named operator bypasses the entire fake-guide economy.',
  },
];

const PRICE_ROWS = [
  { item: 'Official adult entry (includes Wat Phra Kaew + Textile Museum)', price: '500 THB ($15)' },
  { item: 'Children under 13', price: 'Free' },
  { item: 'Audio guide rental (English, Mandarin, French, etc.)', price: '200 THB ($6)' },
  { item: 'Clothing rental (sarong, shirt, trousers)', price: '200 THB ($6) refundable deposit' },
  { item: 'Skip-the-line guided tour (2 to 3 hours)', price: '$25 to $50 per person' },
  { item: 'Half-day combo: Grand Palace + Wat Pho + Wat Arun', price: '$40 to $70 per person' },
  { item: 'Full-day private guide with driver', price: '$100 to $200 per person' },
];

const COMMON_MISTAKES = [
  'Showing up in a tank top or short shorts and losing 30 minutes at the clothing rental booth.',
  'Believing a tuk-tuk driver who says the palace is closed today, then ending up at a gem shop.',
  'Trying to take photos inside the Emerald Buddha temple. It is strictly forbidden and guards will stop you.',
  'Arriving at 2pm and getting turned away because last entry is 2:30pm and you still need to buy a ticket and cross the courtyard.',
  'Paying a freelance guide at the gate 500 to 1,500 THB for a rushed 30-minute tour. Book a vetted operator in advance.',
  'Taking an air-con taxi across Bangkok at rush hour when the Chao Phraya express boat to Tha Chang pier costs 9 THB and drops you at the door.',
];

export default function GrandPalaceTicketsPage() {
  const siteLogoUrl = 'https://go2-thailand.com/images/brand/go2thailand-logo-2026.png';

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Grand Palace Tickets', href: '/grand-palace-tickets' },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Grand Palace Bangkok Tickets 2026: Prices, Dress Code, Where to Book',
    description:
      'Official 2026 Grand Palace ticket prices (500 THB), dress code rules, the closed today taxi scam, skip-the-line tour math, MRT and river ferry access, and where to book from trusted operators.',
    datePublished: '2026-04-18',
    dateModified: '2026-04-18',
    author: {
      '@type': 'Organization',
      name: 'Go2Thailand',
      url: 'https://go2-thailand.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Go2Thailand',
      url: 'https://go2-thailand.com',
      logo: {
        '@type': 'ImageObject',
        url: siteLogoUrl,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://go2-thailand.com/grand-palace-tickets/',
    },
  };

  return (
    <>
      <SEOHead
        title="Grand Palace Bangkok Tickets 2026: Prices, Dress Code, Where to Book | Go2Thailand"
        description="Grand Palace Bangkok in 2026: 500 THB official entry, dress code rules, the closed today taxi scam, skip-the-line tours from $25, and where to book. Updated April 2026."
      >
        <link rel="canonical" href="https://go2-thailand.com/grand-palace-tickets/" />
        <meta
          name="keywords"
          content="grand palace tickets, grand palace bangkok, grand palace entry fee, wat phra kaew tickets, emerald buddha temple, grand palace dress code, grand palace skip the line, bangkok grand palace tour"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      </SEOHead>

      <div className="min-h-screen bg-surface-cream">
        <section className="bg-surface-dark text-white">
          <div className="container-custom py-16">
            <div className="mx-auto max-w-4xl text-center">
              <p className="mb-2 font-script text-thailand-gold">Bangkok&apos;s #1 Sight</p>
              <h1 className="mb-6 text-4xl font-bold font-heading lg:text-6xl">
                Grand Palace Bangkok Tickets 2026: Prices, Dress Code, Where to Book
              </h1>
              <p className="mx-auto mb-8 max-w-3xl text-lg opacity-90 lg:text-2xl">
                Official entry is 500 THB ($15). The real questions are when to arrive, what to wear, how to dodge the closed today taxi scam, and whether a skip-the-line tour is worth the extra $20. Here is the 2026 answer, verified from the ground.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="#prices"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-thailand-blue transition-colors hover:bg-slate-100"
                >
                  Jump to Prices
                </a>
                <a
                  href={GYG_GENERIC}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center justify-center rounded-full bg-thailand-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Skip-the-Line Tours on GetYourGuide
                </a>
                <a
                  href={VIATOR_GENERIC}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center justify-center rounded-full border-2 border-white bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-thailand-blue"
                >
                  Compare on Viator
                </a>
              </div>
              <p className="mt-5 text-sm text-blue-100">
                Verified against the official Royal Grand Palace site and tour operator prices on {LAST_VERIFIED}. Affiliate links are marked and do not affect ticket pricing.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="container-custom py-6">
            <Breadcrumbs items={breadcrumbs} />
            <div className="mt-4 rounded-2xl bg-orange-50 px-4 py-3">
              <p className="text-center text-sm text-orange-800">
                This page contains affiliate links. We may earn a commission at no extra cost to you.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-5xl">
              <p className="section-label text-center">Why Book Ahead</p>
              <h2 className="mb-8 text-center text-3xl font-bold font-heading text-gray-900">
                Three Reasons Most Visitors Book Online First
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                {WHY_CARDS.map((card) => (
                  <div key={card.title} className="rounded-2xl bg-surface-cream p-6 shadow-md">
                    <h3 className="mb-3 text-xl font-bold font-heading text-gray-900">{card.title}</h3>
                    <p className="text-sm text-gray-700">{card.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="prices" className="scroll-mt-20 py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <p className="section-label text-center">2026 Prices</p>
              <h2 className="mb-6 text-center text-3xl font-bold font-heading text-gray-900">
                Grand Palace Bangkok Prices in 2026
              </h2>
              <p className="mx-auto mb-6 max-w-3xl text-center text-gray-700">
                Prices below are the official 2026 rates at the gate plus typical operator prices for skip-the-line tours. USD is approximate at 33 THB per USD and shifts with the exchange rate.
              </p>
              <div className="overflow-x-auto rounded-2xl bg-white shadow-md">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-4 text-left font-semibold text-gray-900">Item</th>
                      <th className="px-4 py-4 text-left font-semibold text-gray-900">2026 Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {PRICE_ROWS.map((row) => (
                      <tr key={row.item}>
                        <td className="px-4 py-4 font-medium text-gray-900">{row.item}</td>
                        <td className="px-4 py-4 text-gray-700">{row.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-center text-xs text-gray-500">
                Source: Royal Grand Palace official site and GetYourGuide / Viator / Klook listings, checked {LAST_VERIFIED}.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-5xl">
              <p className="section-label text-center">Where to Book</p>
              <h2 className="mb-8 text-center text-3xl font-bold font-heading text-gray-900">
                Four Ways to Buy Your Grand Palace Ticket
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl bg-surface-cream p-6 shadow-md">
                  <h3 className="mb-3 text-xl font-bold font-heading text-gray-900">1. Official gate ticket</h3>
                  <p className="mb-4 text-sm text-gray-700">
                    Walk up to the official ticket window on Na Phra Lan Road, pay 500 THB cash or card, and enter. No online booking is offered by the palace itself. Best if you arrive at 8:30am opening, speak enough English to self-guide, and do not mind queueing. Add a 200 THB audio guide at the next window for context.
                  </p>
                  <a
                    href={OFFICIAL_SITE}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-sm font-semibold text-thailand-blue hover:underline"
                  >
                    Official Royal Grand Palace website
                  </a>
                </div>
                <div className="rounded-2xl bg-surface-cream p-6 shadow-md">
                  <h3 className="mb-3 text-xl font-bold font-heading text-gray-900">2. GetYourGuide skip-the-line</h3>
                  <p className="mb-4 text-sm text-gray-700">
                    GetYourGuide lists 2 to 3 hour guided entries at $25 to $45 per person with free cancellation 24 hours out. The guide meets you outside the gate, handles ticketing, explains the Ramakien murals and Chakri Maha Prasat, and ends at a convenient lunch spot. Best if you value context over budget.
                  </p>
                  <a
                    href={GYG_GENERIC}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-flex items-center justify-center rounded-full bg-thailand-blue px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    Check GetYourGuide
                  </a>
                </div>
                <div className="rounded-2xl bg-surface-cream p-6 shadow-md">
                  <h3 className="mb-3 text-xl font-bold font-heading text-gray-900">3. Viator half-day combo</h3>
                  <p className="mb-4 text-sm text-gray-700">
                    Viator bundles Grand Palace, Wat Pho, and Wat Arun into a half-day tour for $40 to $70 per person, including entries, guide, and the cross-river ferry. Best if you are short on time and want the three flagship Bangkok temples handled in one morning. Pick an early 8am slot to beat the crowds.
                  </p>
                  <a
                    href={VIATOR_GENERIC}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-flex items-center justify-center rounded-full bg-thailand-blue px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    Check Viator
                  </a>
                </div>
                <div className="rounded-2xl bg-surface-cream p-6 shadow-md">
                  <h3 className="mb-3 text-xl font-bold font-heading text-gray-900">4. Klook Asia-focused listings</h3>
                  <p className="mb-4 text-sm text-gray-700">
                    Klook is the big Asian booking platform and frequently lists the cheapest Grand Palace combos, sometimes with 10 to 20 percent app-only discounts. Good for travelers already comparing Bangkok activities like river dinner cruises, MBK Muay Thai, or Ayutthaya day trips on the same account.
                  </p>
                  <a
                    href={KLOOK_GENERIC}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-flex items-center justify-center rounded-full bg-thailand-blue px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    Check Klook
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <p className="section-label text-center">Dress Code</p>
              <h2 className="mb-6 text-center text-3xl font-bold font-heading text-gray-900">
                What to Wear and the On-Site Rental Booth
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl bg-white p-6 shadow-md">
                  <h3 className="mb-3 text-xl font-bold font-heading text-gray-900">Not allowed</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>Sleeveless tops, tank tops, or crop tops.</li>
                    <li>Shorts or skirts above the knee.</li>
                    <li>Ripped jeans with visible skin.</li>
                    <li>Yoga pants, leggings, or see-through fabric.</li>
                    <li>Open-back sandals or flip-flops at Wat Phra Kaew (shoes must have a back strap).</li>
                  </ul>
                </div>
                <div className="rounded-2xl bg-white p-6 shadow-md">
                  <h3 className="mb-3 text-xl font-bold font-heading text-gray-900">Rental booth details</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>Sarongs, wrap skirts, shirts, and long trousers available.</li>
                    <li>200 THB ($6) refundable deposit per item, paid in cash.</li>
                    <li>Return the item to the same booth to get your deposit back.</li>
                    <li>Bring ID as some days they ask for a passport copy.</li>
                    <li>Line can be 20 to 30 minutes by 10:30am. Dress right and skip it.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <p className="section-label text-center">Best Time to Visit</p>
              <h2 className="mb-6 text-center text-3xl font-bold font-heading text-gray-900">
                The Sunrise Slot Strategy
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  The palace opens at 8:30am. If you are at the gate by 8:15am with tickets ready, you will walk straight in and have Wat Phra Kaew almost to yourself for the first 30 to 45 minutes. By 10am the tour buses from Khao San Road and Sukhumvit hotels start arriving and the main hall becomes shoulder-to-shoulder.
                </p>
                <p>
                  Sundays and Thai public holidays are the worst. Thai families visit on weekends, foreign tour groups stay through the afternoon, and the heat peaks by noon. If your trip includes a weekday, use it for the palace and save Sunday for something quieter like Lumpini Park or Jim Thompson House.
                </p>
                <p>
                  The worst combo is 11am on a hot-season Sunday (March through May). The courtyards have no shade, the gold reflects the sun back at you, and the queue for the Emerald Buddha temple spills back into the main courtyard. Go early or do not go at all on those days.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-5xl">
              <p className="section-label text-center">Getting There</p>
              <h2 className="mb-6 text-center text-3xl font-bold font-heading text-gray-900">
                MRT, River Ferry, and Why Not Taxi
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl bg-white p-6 shadow-md">
                  <h3 className="mb-3 text-xl font-bold font-heading text-gray-900">MRT: Sanam Chai station</h3>
                  <p className="text-sm text-gray-700">
                    Take the MRT Blue Line to Sanam Chai station (exit 1). It is a 10-minute walk north along Maha Rat Road to the palace entrance. Trains run every 5 minutes, cost 20 to 40 THB from most Bangkok hotels, and drop you in an air-conditioned station. This is the easiest route if you are staying in Silom, Sukhumvit, or near a Blue Line station.
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-6 shadow-md">
                  <h3 className="mb-3 text-xl font-bold font-heading text-gray-900">Chao Phraya express boat</h3>
                  <p className="text-sm text-gray-700">
                    The orange-flag express boat from Sathorn pier (connected to BTS Saphan Taksin) to Tha Chang pier is 15 to 20 THB depending on distance, and Tha Chang drops you 3 minutes from the Grand Palace gate. Boats run every 15 to 20 minutes from 6am to 7pm. Faster, cheaper, and more scenic than any taxi in Bangkok traffic.
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-6 shadow-md">
                  <h3 className="mb-3 text-xl font-bold font-heading text-gray-900">Grab or taxi</h3>
                  <p className="text-sm text-gray-700">
                    A metered taxi or Grab from Sukhumvit costs 150 to 300 THB depending on traffic, but Bangkok rush-hour traffic can turn a 20-minute ride into 60 minutes. Only worth it if you have luggage or are traveling as a group of 3 to 4. Always insist on the meter or use the Grab app to avoid gate-area freelance drivers.
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-6 shadow-md">
                  <h3 className="mb-3 text-xl font-bold font-heading text-gray-900">From Khao San Road</h3>
                  <p className="text-sm text-gray-700">
                    Khao San Road is a 20-minute walk or a 60 THB tuk-tuk. The walk down Ratchadamnoen Klang Avenue past Democracy Monument is pleasant before 9am, brutal at noon. Do not pay more than 80 THB for a tuk-tuk on this short run, and confirm the price before you get in.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <div className="rounded-2xl border-l-8 border-red-500 bg-red-50 p-6 shadow-md">
                <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-red-700">Scam warning</p>
                <h2 className="mb-3 text-2xl font-bold font-heading text-red-900">
                  The Grand Palace is Closed Today Taxi Scam
                </h2>
                <div className="space-y-3 text-sm text-red-900">
                  <p>
                    A tuk-tuk driver, taxi driver, or well-dressed stranger approaches you near the palace and says: the Grand Palace is closed today for a royal ceremony, a Buddhist holy day, or prayers until 1pm. They then offer a friendly 20 to 40 THB tour of lucky Buddha temples and a lucky gem shop.
                  </p>
                  <p>
                    Every stop ends at a commission-paying gem store, tailor shop, or suit shop where you are high-pressure sold fake rubies, overpriced suits, or tourist jewelry. The driver pockets 200 to 500 THB per tourist delivered, whether you buy or not.
                  </p>
                  <p>
                    <strong>What to do:</strong> ignore them completely. Walk straight to the official ticket booth on Na Phra Lan Road. If anyone in uniform tells you the palace is closed, they are fake. The Grand Palace is open every single day from 8:30am to 3:30pm, including Sundays and public holidays.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <p className="section-label text-center">Combine With</p>
              <h2 className="mb-6 text-center text-3xl font-bold font-heading text-gray-900">
                Wat Pho and Wat Arun: The Math
              </h2>
              <div className="rounded-2xl bg-white p-6 shadow-md">
                <p className="mb-4 text-gray-700">
                  Doing all three separately: 500 + 200 + 200 = 900 THB ($27) in entry alone, plus one river ferry, plus two walks, plus half a day of logistics. Doing a GetYourGuide or Viator half-day combo: $40 to $70 per person, all entries included, one guide who handles the transfers. For 2 travelers the combo saves about 2 hours and gives you context you will not get self-guided.
                </p>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl bg-surface-cream p-4">
                    <p className="mb-1 font-semibold text-gray-900">Grand Palace</p>
                    <p className="text-sm text-gray-700">500 THB, 2 to 3 hours, 8:30am start.</p>
                  </div>
                  <div className="rounded-xl bg-surface-cream p-4">
                    <p className="mb-1 font-semibold text-gray-900">Wat Pho</p>
                    <p className="text-sm text-gray-700">200 THB, 1 hour, 10-minute walk south. Reclining Buddha.</p>
                  </div>
                  <div className="rounded-xl bg-surface-cream p-4">
                    <p className="mb-1 font-semibold text-gray-900">Wat Arun</p>
                    <p className="text-sm text-gray-700">200 THB, 1 hour, cross-river ferry 4 THB from Tha Tien pier.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-5xl">
              <p className="section-label text-center">Inside the Complex</p>
              <h2 className="mb-8 text-center text-3xl font-bold font-heading text-gray-900">
                What to See Inside the Grand Palace
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl bg-surface-cream p-6 shadow-md">
                  <h3 className="mb-3 text-xl font-bold font-heading text-gray-900">Wat Phra Kaew and the Emerald Buddha</h3>
                  <p className="text-sm text-gray-700">
                    The Emerald Buddha is a 66cm jade statue seated on a golden throne inside the royal chapel. It is dressed in one of three seasonal golden robes, changed by the King himself three times a year. Shoes off, hats off, no photos inside. Sit at the back and take 5 minutes of quiet before moving on.
                  </p>
                </div>
                <div className="rounded-2xl bg-surface-cream p-6 shadow-md">
                  <h3 className="mb-3 text-xl font-bold font-heading text-gray-900">Chakri Maha Prasat Hall</h3>
                  <p className="text-sm text-gray-700">
                    The cream-and-gold 1882 throne hall that mixes European Italian Renaissance architecture with a Thai spired roof. The ground-floor weapon museum is open to the public; the upper royal halls are not. Ideal mid-morning photo spot with the honor guard out front.
                  </p>
                </div>
                <div className="rounded-2xl bg-surface-cream p-6 shadow-md">
                  <h3 className="mb-3 text-xl font-bold font-heading text-gray-900">The Ramakien murals</h3>
                  <p className="text-sm text-gray-700">
                    The cloister walls around Wat Phra Kaew hold 178 mural panels telling the Thai version of the Ramayana epic. They were painted in 1783, restored multiple times, and are best viewed with a guide or audio guide to make sense of the scenes.
                  </p>
                </div>
                <div className="rounded-2xl bg-surface-cream p-6 shadow-md">
                  <h3 className="mb-3 text-xl font-bold font-heading text-gray-900">Phra Si Rattana Chedi</h3>
                  <p className="text-sm text-gray-700">
                    The golden bell-shaped chedi on the upper terrace is covered in gold mosaic tiles and holds a relic of the Buddha. Best photographed against a blue morning sky. Walk the full upper terrace to see all three monuments in the Wat Phra Kaew triangle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <p className="section-label text-center">Photo Rules</p>
              <h2 className="mb-6 text-center text-3xl font-bold font-heading text-gray-900">
                Where You Can and Cannot Take Photos
              </h2>
              <div className="rounded-2xl bg-white p-6 shadow-md">
                <ul className="space-y-3 text-sm text-gray-700">
                  <li><strong>Outside, yes.</strong> The courtyards, Chakri Maha Prasat Hall exterior, the golden chedi, and the Ramakien murals are all open for photos and video.</li>
                  <li><strong>Inside Wat Phra Kaew temple, no.</strong> No photos, no video, no phones out. Guards will stop you and you may be asked to leave the temple. This is non-negotiable out of respect for the Emerald Buddha.</li>
                  <li><strong>Tripods and selfie sticks</strong> are allowed in open areas but not inside halls. Drones are banned anywhere over the palace grounds.</li>
                  <li><strong>No climbing</strong> on statues, chedis, or temple steps for photos. Fines are 1,000 to 5,000 THB and enforcement has tightened since 2024.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <p className="section-label text-center">Avoid These</p>
              <h2 className="mb-6 text-center text-3xl font-bold font-heading text-gray-900">
                Six Common Grand Palace Mistakes
              </h2>
              <div className="rounded-2xl bg-white p-6 shadow-md">
                <ol className="list-decimal space-y-3 pl-6 text-sm text-gray-700">
                  {COMMON_MISTAKES.map((mistake) => (
                    <li key={mistake}>{mistake}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-20 py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <p className="section-label text-center">FAQ</p>
              <h2 className="mb-8 text-center text-3xl font-bold font-heading text-gray-900">
                Grand Palace Bangkok FAQ
              </h2>
              <div className="space-y-5">
                {FAQ_ITEMS.map((item) => (
                  <div key={item.question} className="rounded-2xl bg-white p-6 shadow-md">
                    <h3 className="mb-3 text-xl font-bold font-heading text-gray-900">
                      {item.question}
                    </h3>
                    <p className="text-gray-700">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <p className="section-label text-center">More Thailand Activities</p>
              <h2 className="mb-6 text-center text-3xl font-bold font-heading text-gray-900">
                Plan the Rest of Your Thailand Trip
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                <Link
                  href="/phi-phi-island-tour/"
                  className="rounded-2xl bg-surface-cream p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <h3 className="mb-2 font-bold font-heading text-gray-900">Phi Phi Island Tour from Phuket</h3>
                  <p className="text-sm text-gray-600">
                    If Bangkok is your city stop, Phi Phi is the island counterweight. Prices, operator comparison, and what a decent day-tour actually includes.
                  </p>
                </Link>
                <Link
                  href="/chiang-mai-elephant-sanctuary/"
                  className="rounded-2xl bg-surface-cream p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <h3 className="mb-2 font-bold font-heading text-gray-900">Chiang Mai Elephant Sanctuary</h3>
                  <p className="text-sm text-gray-600">
                    After Bangkok, most travelers head north. Here is how to pick an ethical sanctuary, what to pay, and which operators still offer riding (avoid those).
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-5xl">
              <p className="section-label text-center">Related Reading</p>
              <h2 className="mb-6 text-center text-3xl font-bold font-heading text-gray-900">
                Read Before You Go
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Link
                  href="/blog/grand-palace-bangkok-complete-guide-2026/"
                  className="rounded-2xl bg-white p-5 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <h3 className="mb-1 font-bold font-heading text-gray-900">Grand Palace Complete Guide 2026</h3>
                  <p className="text-sm text-gray-600">
                    Deep-dive guide to every hall, every mural, and the royal history behind the complex.
                  </p>
                </Link>
                <Link
                  href="/blog/bangkok-public-transport-bts-mrt-tourist-guide-2026/"
                  className="rounded-2xl bg-white p-5 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <h3 className="mb-1 font-bold font-heading text-gray-900">Bangkok BTS and MRT Tourist Guide</h3>
                  <p className="text-sm text-gray-600">
                    How to use the Bangkok metro like a local, including the 3-minute walk from Sanam Chai to the palace.
                  </p>
                </Link>
                <Link
                  href="/blog/10-biggest-thailand-travel-mistakes/"
                  className="rounded-2xl bg-white p-5 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <h3 className="mb-1 font-bold font-heading text-gray-900">10 Biggest Thailand Travel Mistakes</h3>
                  <p className="text-sm text-gray-600">
                    The closed today scam is just one. Nine more traps first-time Thailand visitors fall for and how to dodge them.
                  </p>
                </Link>
                <Link
                  href="/blog/is-thailand-safe-tourists-2026/"
                  className="rounded-2xl bg-white p-5 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <h3 className="mb-1 font-bold font-heading text-gray-900">Is Thailand Safe for Tourists in 2026?</h3>
                  <p className="text-sm text-gray-600">
                    Crime rates, scam hotspots, health risks, and the honest 2026 safety picture for Bangkok and beyond.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl rounded-3xl bg-surface-dark px-6 py-10 text-center text-white">
              <p className="mb-2 font-script text-thailand-gold">Ready to Book?</p>
              <h2 className="mb-4 text-3xl font-bold font-heading">
                Lock in Your Grand Palace Slot
              </h2>
              <p className="mx-auto mb-6 max-w-2xl text-blue-100">
                For a first visit, a skip-the-line guided tour at $25 to $50 per person saves an hour of queueing, gives you context most self-guided visitors miss, and avoids the entire gate-scam economy. Compare the top operators and pick your date.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href={GYG_GENERIC}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-thailand-blue transition-colors hover:bg-slate-100"
                >
                  Book on GetYourGuide
                </a>
                <a
                  href={VIATOR_GENERIC}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center justify-center rounded-full border-2 border-white bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-thailand-blue"
                >
                  Compare on Viator
                </a>
                <a
                  href={KLOOK_GENERIC}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center justify-center rounded-full border-2 border-white bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-thailand-blue"
                >
                  Check Klook
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
