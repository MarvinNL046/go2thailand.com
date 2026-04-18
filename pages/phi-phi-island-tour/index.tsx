import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { KLOOK_GENERIC, GYG_GENERIC, VIATOR_GENERIC, BOOKING_GENERIC } from '../../lib/affiliates';

const LAST_VERIFIED = 'April 18, 2026';

const FAQ_ITEMS = [
  {
    question: 'How much does a Phi Phi Island tour cost in 2026?',
    answer:
      'A standard speedboat day tour from Phuket runs $35 to $70 per person and typically bundles Maya Bay, Monkey Beach, snorkel stops, and lunch. From Krabi or Ao Nang, the same kind of day tour costs $30 to $55 because the crossing is shorter. A 2-day/1-night package with a stay on Phi Phi Don sits between $120 and $280 per person depending on hotel class. Private longtail boats for up to 6 passengers go for $80 to $150 total. Remember the Maya Bay national park fee of 400 THB (about $12) is almost always charged separately on arrival.',
  },
  {
    question: 'Day trip or overnight on Phi Phi: which is actually better?',
    answer:
      'Overnight wins by a huge margin if you actually want to enjoy the place. Day trips arrive in the narrow 10am to 3pm window when roughly 3,000 tourists land at the same time. By 4pm most speedboats leave, Tonsai Bay empties, and Phi Phi Don becomes a different island. Sunset from a Long Beach viewpoint, an empty sandbar at sunrise, and quiet snorkel stops before the day tours arrive are only possible if you sleep on the island. If your trip is longer than 5 days in the region, the overnight option is almost always worth the extra cost.',
  },
  {
    question: 'Should I depart from Phuket or Krabi for Phi Phi?',
    answer:
      'Krabi and Ao Nang are closer to Phi Phi, so the boat ride is shorter (about 45 to 75 minutes), the sea is usually calmer, and you get more time at the actual islands. Phuket tours are more numerous and often cheaper per headline price but involve 90 to 120 minutes each way on a speedboat, which can be brutal in choppy water. If you are already staying in Phuket, booking from Phuket is fine. If you are flexible, basing yourself in Ao Nang or Krabi town for the Phi Phi portion of your trip is the smarter call.',
  },
  {
    question: 'Is Maya Bay worth the 400 THB national park fee?',
    answer:
      'Yes, if you understand what you are paying for. Maya Bay closed from 2018 to 2022 so the reef and beach could recover after The Beach film tourism wrecked it. Since reopening there is a hard cap of 4,000 visitors per day, timed entry, no swimming at the main beach (you swim from a floating platform), and no boats anchoring in the bay. The 400 THB goes toward maintaining those limits. It is still the most cinematic beach in Thailand, but keep expectations realistic: you will not be alone there.',
  },
  {
    question: 'When is the best time to visit Phi Phi?',
    answer:
      'November through April is the dry, clear, calm window. Seas are flat, visibility underwater is strong, and every speedboat operator runs full schedules. December and January are peak season and peak crowd. May through October is monsoon: rough seas, afternoon rain, reduced tour schedules, and some operators pause service entirely during the worst weeks (usually late September and October). If you go in shoulder season (May, early June, late October), prices drop noticeably but you accept weather risk.',
  },
  {
    question: 'Is a private longtail boat worth it for Phi Phi?',
    answer:
      'For 4 to 6 travelers, absolutely. A private longtail for $80 to $150 total lets you set your own route, skip the stops with 40 other speedboats parked side by side, and linger at the ones you actually like. You lose speed (longtails are slow compared to speedboats), and you will not make it to Bamboo Island or the far sites without a longer day. For couples or solo travelers the math works better on a group speedboat tour.',
  },
  {
    question: 'Phi Phi Don vs Phi Phi Leh: what is the difference?',
    answer:
      'Phi Phi Don is the big inhabited island, home to Tonsai village, hotels, beach bars, restaurants, and nearly all accommodations. This is where you sleep, eat, and access dive shops. Phi Phi Leh is the smaller uninhabited island to the south and it is where the famous stuff lives: Maya Bay, Pileh Lagoon, Viking Cave, and the limestone cliffs. You cannot stay overnight on Phi Phi Leh. Every tour visits Phi Phi Leh for the scenery and returns to Phi Phi Don or the mainland to sleep.',
  },
  {
    question: 'Should I take the public ferry or a guided tour to Phi Phi?',
    answer:
      'Different products for different goals. The Phuket ferry is about 2 hours for $18 and gets you to Tonsai Pier on Phi Phi Don so you can stay overnight. The Krabi ferry is 75 minutes for $15. Ferries do not stop at Maya Bay, Pileh Lagoon, or snorkel sites: they are transport. Guided tours cost more ($30 to $70) but include all the scenic stops, lunch, and snorkel gear. The smart move for most travelers is a ferry across, 1 to 2 nights on Phi Phi Don, and a half-day longtail charter from the island itself to see Phi Phi Leh without the day-trip crowds.',
  },
];

const PRICE_ROWS = [
  { tour: 'Speedboat day tour from Phuket', price: '$35 to $70 pp', notes: 'Maya Bay + Monkey Beach + snorkel + lunch, 8 hours total' },
  { tour: 'Speedboat day tour from Krabi / Ao Nang', price: '$30 to $55 pp', notes: 'Shorter crossing, calmer sea, same itinerary' },
  { tour: '2-day / 1-night Phi Phi + Maya package', price: '$120 to $280 pp', notes: 'Overnight on Phi Phi Don, midrange hotel, 2 days of boating' },
  { tour: 'Sunset cruise departing from Phi Phi Don', price: '$30 to $50 pp', notes: 'Longtail or catamaran, 2 to 3 hours, drinks often included' },
  { tour: 'Private longtail boat charter (up to 6 pax)', price: '$80 to $150 total', notes: 'Half-day, custom route, driver only, no guide' },
  { tour: 'Luxury big cat catamaran day trip', price: '$120 to $180 pp', notes: 'Premium catamaran, smaller group, full bar, gourmet lunch' },
  { tour: 'Ferry Phuket to Phi Phi (one way)', price: '$18 pp', notes: 'Roughly 2 hours, no scenic stops, transport only' },
  { tour: 'Ferry Krabi to Phi Phi (one way)', price: '$15 pp', notes: 'Roughly 1h15, calmer route, Tonsai Pier arrival' },
];

const WHY_CARDS = [
  {
    title: 'Maya Bay cinematic fame',
    body:
      'The limestone cliffs wrapping Maya Bay are the same ones that made The Beach iconic in 2000. Since the 2022 reopening with a strict 4,000 pax daily cap, the site is calmer than in 2016 to 2018 but still unmistakably the most photographed beach in Thailand. It is worth seeing in person at least once.',
  },
  {
    title: 'World-class snorkeling',
    body:
      'Coral reefs around Loh Samah Bay, Bamboo Island, and Monkey Beach are in better shape than most of Phuket\u2019s west coast. Visibility in the dry season regularly hits 15 to 20 meters. You will see clownfish, parrotfish, reef sharks on the edges, and the occasional sea turtle without needing dive certification.',
  },
  {
    title: 'Sunset from Phi Phi Don',
    body:
      'The Phi Phi Don viewpoint trail (about 20 minutes up) delivers the twin-bay sunset shot you see on every Thailand postcard. Catamaran sunset cruises from Tonsai Pier pair it with open deck space and drinks. Either version is a reason to stay the night instead of day-tripping.',
  },
];

const PROVIDERS = [
  {
    name: 'Viator',
    url: VIATOR_GENERIC,
    pitch: 'Largest selection of Phuket and Krabi departures with flexible cancellation. Good default when you want to sort by reviews and filter by boat type.',
  },
  {
    name: 'GetYourGuide',
    url: GYG_GENERIC,
    pitch: 'Cleanest interface for comparing day vs overnight packages. Strong European user base, so reviews tend to be detailed about what is actually included.',
  },
  {
    name: 'Klook',
    url: KLOOK_GENERIC,
    pitch: 'Best prices for Asian travelers and frequently runs promo codes on Phi Phi tours. Ferry tickets to Phi Phi Don are also bookable here at face value.',
  },
  {
    name: 'Booking.com Cruises',
    url: BOOKING_GENERIC,
    pitch: 'If you want the overnight package, Booking.com bundles the Phi Phi Don hotel with the boat transfer at a single price. Easier than booking the two parts separately.',
  },
];

const DEPARTURE_POINTS = [
  {
    name: 'Phuket',
    pros: 'Most tours, widest price range, easy if you are already based here',
    cons: 'Long 90 to 120 min crossing, rougher sea in afternoon return',
    best: 'Travelers already staying in Patong, Kata, or Karon',
  },
  {
    name: 'Krabi / Ao Nang',
    pros: 'Shorter 45 to 75 min crossing, calmer water, more time at stops',
    cons: 'Fewer luxury tour options, less hotel selection in Ao Nang',
    best: 'Anyone flexible about base, especially families with kids prone to seasickness',
  },
  {
    name: 'Koh Lanta',
    pros: 'Quieter boats, combines with Koh Lanta itinerary, often includes Koh Rok',
    cons: 'Seasonal (many operators close May to October), fewer daily departures',
    best: 'Travelers already doing a Koh Lanta stay who want one day at Phi Phi',
  },
];

const COMMON_MISTAKES = [
  'Booking the cheapest Phuket speedboat without checking it departs before 8am (the ones leaving at 9am or later arrive at Maya Bay in peak crowd time)',
  'Assuming the 400 THB Maya Bay park fee is included in the tour price (it is almost always billed separately on arrival)',
  'Day-tripping in rainy season (May to October) then being surprised when the trip gets cancelled or the sea is too rough to reach Maya Bay',
  'Skipping the overnight on Phi Phi Don and thinking you have seen the island (you have only seen the day-tourist version)',
  'Wearing regular sunscreen (reef-safe only is enforced at Maya Bay since 2022, and rangers do check)',
  'Booking a private longtail for Maya Bay alone (the longtail is slower and the savings over a group speedboat vanish for just 2 travelers)',
];

export default function PhiPhiIslandTourPage() {
  const siteLogoUrl = 'https://go2-thailand.com/images/brand/go2thailand-logo-2026.png';

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Phi Phi Island Tour', href: '/phi-phi-island-tour' },
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
    headline: 'Phi Phi Island Tour 2026: Real Prices, Day vs Overnight, Where to Book',
    description:
      'Real 2026 pricing for Phi Phi Island tours from Phuket, Krabi, and Koh Lanta. Day trip vs overnight math, Maya Bay rules, departure point comparison, and where to book with honest provider notes.',
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
      '@id': 'https://go2-thailand.com/phi-phi-island-tour/',
    },
  };

  return (
    <>
      <SEOHead
        title="Phi Phi Island Tour 2026: Real Prices, Day vs Overnight, Where to Book | Go2Thailand"
        description="Real 2026 prices for Phi Phi Island tours from Phuket, Krabi, and Koh Lanta. Day vs overnight breakdown, Maya Bay rules, departure point comparison, and honest provider notes."
      >
        <link rel="canonical" href="https://go2-thailand.com/phi-phi-island-tour/" />
        <meta
          name="keywords"
          content="phi phi island tour, phi phi tour from phuket, phi phi tour from krabi, maya bay tour, phi phi overnight, phi phi day trip, phi phi island tour price"
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
              <p className="mb-2 font-script text-thailand-gold">Money-Saving Pillar Guide</p>
              <h1 className="mb-6 text-4xl font-bold font-heading lg:text-6xl">
                Phi Phi Island Tour 2026: Real Prices, Day vs Overnight, Where to Book
              </h1>
              <p className="mx-auto mb-8 max-w-3xl text-lg opacity-90 lg:text-2xl">
                If I were booking Phi Phi today, I would not start with the cheapest speedboat on page one. I would pick my departure point first (Krabi beats Phuket for comfort), decide day vs overnight (overnight wins if you have the time), then check that the 400 THB Maya Bay fee is actually included. That order matters.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="#prices"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-thailand-blue transition-colors hover:bg-slate-100"
                >
                  Jump to 2026 Prices
                </a>
                <a
                  href={VIATOR_GENERIC}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center justify-center rounded-full bg-thailand-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Compare Tours on Viator
                </a>
                <a
                  href={GYG_GENERIC}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center justify-center rounded-full border-2 border-white bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-thailand-blue"
                >
                  Check GetYourGuide
                </a>
              </div>
              <p className="mt-5 text-sm text-blue-100">
                Verified against operator sites, DNP Thailand park fee schedule, and ferry timetables on {LAST_VERIFIED}. Affiliate links are disclosed and do not change the rankings.
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

        <section id="what-is" className="bg-white py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <p className="section-label text-center">What Phi Phi Actually Is</p>
              <h2 className="mb-6 text-center text-3xl font-bold font-heading text-gray-900">
                A Quick Orientation Before You Book
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Phi Phi is a pair of islands in the Andaman Sea, sitting between Phuket (90 to 120 minutes by speedboat) and Krabi (45 to 75 minutes). The larger one, Phi Phi Don, has the village, the hotels, the bars, and the ferry pier. The smaller one, Phi Phi Leh, is uninhabited and home to Maya Bay, Pileh Lagoon, and Viking Cave. Nobody sleeps on Phi Phi Leh. Every tour visits it for the scenery and returns to Phi Phi Don or the mainland.
                </p>
                <p>
                  The crowds matter more than most blog posts admit. On a typical dry-season day, 3,000 to 4,000 day-trippers arrive between 10am and 3pm. Before 9am and after 4pm, the island is a different place. Understanding this gap is the single most useful piece of information for planning your trip, and it is why I keep pushing the overnight option throughout this guide.
                </p>
                <p>
                  USD prices in this guide are primary, with THB in parentheses where the local fee is fixed (like the Maya Bay park fee). All tour prices move with season and booking channel, so treat them as realistic ranges rather than quotes.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="why" className="bg-surface-cream py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-5xl">
              <p className="section-label text-center">Why Book a Tour</p>
              <h2 className="mb-8 text-center text-3xl font-bold font-heading text-gray-900">
                Three Reasons Phi Phi Earns the Visit
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                {WHY_CARDS.map((card) => (
                  <div key={card.title} className="rounded-2xl bg-white p-6 shadow-md">
                    <h3 className="mb-3 text-xl font-bold font-heading text-gray-900">{card.title}</h3>
                    <p className="text-gray-700">{card.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="prices" className="scroll-mt-20 bg-white py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-5xl">
              <p className="section-label text-center">2026 Pricing</p>
              <h2 className="mb-4 text-center text-3xl font-bold font-heading text-gray-900">
                Real Phi Phi Island Tour Prices in 2026
              </h2>
              <p className="mx-auto mb-8 max-w-3xl text-center text-gray-600">
                Ranges below are what I see consistently across Viator, GetYourGuide, Klook, and direct operator sites as of {LAST_VERIFIED}. Maya Bay park fee of 400 THB (about $12) is usually extra.
              </p>
              <div className="overflow-x-auto rounded-2xl bg-white shadow-md">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-4 text-left font-semibold text-gray-900">Tour Type</th>
                      <th className="px-4 py-4 text-left font-semibold text-gray-900">Price (2026)</th>
                      <th className="px-4 py-4 text-left font-semibold text-gray-900">What to Know</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {PRICE_ROWS.map((row) => (
                      <tr key={row.tour}>
                        <td className="px-4 py-4 font-medium text-gray-900">{row.tour}</td>
                        <td className="px-4 py-4 text-gray-700">{row.price}</td>
                        <td className="px-4 py-4 text-gray-700">{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section id="where-to-book" className="bg-surface-cream py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-5xl">
              <p className="section-label text-center">Where to Book</p>
              <h2 className="mb-8 text-center text-3xl font-bold font-heading text-gray-900">
                Four Platforms I Actually Use for Phi Phi
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {PROVIDERS.map((provider) => (
                  <div key={provider.name} className="rounded-2xl bg-white p-6 shadow-md">
                    <h3 className="mb-3 text-xl font-bold font-heading text-gray-900">{provider.name}</h3>
                    <p className="mb-4 text-gray-700">{provider.pitch}</p>
                    <a
                      href={provider.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="inline-flex items-center justify-center rounded-full bg-thailand-blue px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                    >
                      Check {provider.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="maya-bay-story" className="bg-white py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <p className="section-label text-center">The Maya Bay Story</p>
              <h2 className="mb-6 text-center text-3xl font-bold font-heading text-gray-900">
                What Actually Happened from 2018 to 2022
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  In 2018 Thailand{'\u2019'}s Department of National Parks closed Maya Bay indefinitely. The trigger was obvious damage: the coral reef inside the bay was essentially dead, speedboat anchors had shredded the seagrass, and 4,000 to 5,000 visitors a day were trampling sand that should have been nesting territory for blacktip reef sharks.
                </p>
                <p>
                  The closure lasted nearly four years. When Maya Bay reopened in January 2022, the rules were different. A floating pier replaced boat anchoring in the bay. The beach itself is no-swim zone: you swim from a platform at Loh Samah Bay on the other side of the peninsula and walk through to Maya Bay via a short boardwalk. Daily visitors are capped at 4,000 and timed into entry slots. Rangers enforce reef-safe sunscreen and no food on the sand.
                </p>
                <p>
                  Is it still crowded? Yes, the cap is generous and slots fill up in high season. Is it more intact than pre-2018? Measurably. Reef biologists document returning coral cover and shark pup populations. This context matters when you pay the 400 THB fee: you are subsidizing the enforcement, not just buying a ticket.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="don-vs-leh" className="bg-surface-cream py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <p className="section-label text-center">The Two Islands</p>
              <h2 className="mb-6 text-center text-3xl font-bold font-heading text-gray-900">
                Phi Phi Don vs Phi Phi Leh
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl bg-white p-6 shadow-md">
                  <h3 className="mb-3 text-xl font-bold font-heading text-gray-900">Phi Phi Don (the big one)</h3>
                  <p className="mb-3 text-gray-700">
                    Inhabited, with Tonsai village as the main hub. Ferry pier, banks, dive shops, hotels across Tonsai Beach (busy), Long Beach (quieter), and Laem Tong (remote and upscale). This is where you sleep.
                  </p>
                  <p className="text-gray-700">
                    Good for: overnight stays, diving, sunset viewpoint hikes, Thai food at Tonsai night market, catamaran bar cruises.
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-6 shadow-md">
                  <h3 className="mb-3 text-xl font-bold font-heading text-gray-900">Phi Phi Leh (the small one)</h3>
                  <p className="mb-3 text-gray-700">
                    Uninhabited, no accommodation, no infrastructure. Home to Maya Bay, Pileh Lagoon, Viking Cave, and Loh Samah Bay. Every scenic photo you have seen of Phi Phi is probably here.
                  </p>
                  <p className="text-gray-700">
                    Good for: snorkeling, the Maya Bay visit, lagoon swimming (Pileh Lagoon is the emerald-green pool between cliffs). Half-day trip only, no overnight.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="day-vs-overnight" className="bg-white py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <p className="section-label text-center">The Math</p>
              <h2 className="mb-6 text-center text-3xl font-bold font-heading text-gray-900">
                Day Trip vs Overnight: The Actual Numbers
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  A day trip from Phuket is roughly $50 per person all-in (tour + Maya fee). You spend about 3 hours at Phi Phi in the 10am to 3pm peak crowd window. Photos come out fine but the vibe is theme-park queues.
                </p>
                <p>
                  An overnight package is roughly $150 to $200 per person (ferry + 1 night midrange hotel + half-day longtail charter + dinner). That is 3 to 4 times the cost for maybe 10 times the actual island time. You get sunset, sunrise, the viewpoint hike, dinner at Tonsai, a morning swim before any day boats arrive, and a half-day longtail to Phi Phi Leh at 8am before the crowds.
                </p>
                <p>
                  If Phi Phi is the only beach thing you are doing on this trip, overnight. If you have Phuket beaches, Krabi islands, and Koh Lanta already planned, a day trip is defensible as a photo stop. But the overnight is where the trip becomes a memory rather than a checkmark.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="best-time" className="bg-surface-cream py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-5xl">
              <p className="section-label text-center">Seasonality</p>
              <h2 className="mb-6 text-center text-3xl font-bold font-heading text-gray-900">
                Best Time for a Phi Phi Tour
              </h2>
              <div className="overflow-x-auto rounded-2xl bg-white shadow-md">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-4 text-left font-semibold text-gray-900">Period</th>
                      <th className="px-4 py-4 text-left font-semibold text-gray-900">Sea Conditions</th>
                      <th className="px-4 py-4 text-left font-semibold text-gray-900">Crowds</th>
                      <th className="px-4 py-4 text-left font-semibold text-gray-900">Verdict</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    <tr>
                      <td className="px-4 py-4 font-medium text-gray-900">Nov to Feb</td>
                      <td className="px-4 py-4 text-gray-700">Calm, clear, 15 to 20m visibility</td>
                      <td className="px-4 py-4 text-gray-700">Peak (Dec and Jan)</td>
                      <td className="px-4 py-4 text-gray-700">Best weather, worst crowds. Book weeks ahead.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-medium text-gray-900">Mar to Apr</td>
                      <td className="px-4 py-4 text-gray-700">Hot, flat seas, slightly hazier</td>
                      <td className="px-4 py-4 text-gray-700">High but thinning</td>
                      <td className="px-4 py-4 text-gray-700">Sweet spot for most travelers.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-medium text-gray-900">May to Jun</td>
                      <td className="px-4 py-4 text-gray-700">Monsoon starting, afternoon rain</td>
                      <td className="px-4 py-4 text-gray-700">Light</td>
                      <td className="px-4 py-4 text-gray-700">Shoulder, good value if flexible.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-medium text-gray-900">Jul to Sep</td>
                      <td className="px-4 py-4 text-gray-700">Rough seas, possible cancellations</td>
                      <td className="px-4 py-4 text-gray-700">Low</td>
                      <td className="px-4 py-4 text-gray-700">Risky, insurance worth having.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-medium text-gray-900">Oct</td>
                      <td className="px-4 py-4 text-gray-700">Worst month, heavy rain + swell</td>
                      <td className="px-4 py-4 text-gray-700">Very low</td>
                      <td className="px-4 py-4 text-gray-700">Many operators close, I would skip.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section id="departure" className="bg-white py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-5xl">
              <p className="section-label text-center">Departure Points</p>
              <h2 className="mb-6 text-center text-3xl font-bold font-heading text-gray-900">
                Phuket vs Krabi vs Koh Lanta
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                {DEPARTURE_POINTS.map((dp) => (
                  <div key={dp.name} className="rounded-2xl bg-surface-cream p-6 shadow-md">
                    <h3 className="mb-3 text-xl font-bold font-heading text-gray-900">{dp.name}</h3>
                    <p className="mb-2 text-sm text-gray-700"><strong>Pros:</strong> {dp.pros}</p>
                    <p className="mb-2 text-sm text-gray-700"><strong>Cons:</strong> {dp.cons}</p>
                    <p className="text-sm text-gray-700"><strong>Best for:</strong> {dp.best}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="whats-included" className="bg-surface-cream py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <p className="section-label text-center">What is Included</p>
              <h2 className="mb-6 text-center text-3xl font-bold font-heading text-gray-900">
                Read the Inclusions Carefully
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl bg-white p-6 shadow-md">
                  <h3 className="mb-3 text-xl font-bold font-heading text-gray-900">Usually included</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>Hotel pickup and drop-off within tour zone</li>
                    <li>Buffet or boxed lunch on Phi Phi Don or the boat</li>
                    <li>Snorkel mask, fins, life jacket</li>
                    <li>Drinking water and light snacks</li>
                    <li>English-speaking guide</li>
                    <li>Basic insurance covered by the operator</li>
                  </ul>
                </div>
                <div className="rounded-2xl bg-white p-6 shadow-md">
                  <h3 className="mb-3 text-xl font-bold font-heading text-gray-900">Usually SEPARATE</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>Maya Bay national park fee: 400 THB (about $12)</li>
                    <li>Phi Phi Leh marine park fee (varies, around 200 THB)</li>
                    <li>Underwater camera rental</li>
                    <li>Private longtail upgrades on the island</li>
                    <li>Drinks beyond water (especially on luxury catamarans)</li>
                    <li>Tips for crew and guide (optional but expected)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="mistakes" className="bg-white py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <p className="section-label text-center">Common Mistakes</p>
              <h2 className="mb-6 text-center text-3xl font-bold font-heading text-gray-900">
                Six Phi Phi Booking Mistakes I See Repeatedly
              </h2>
              <div className="space-y-4">
                {COMMON_MISTAKES.map((mistake, index) => (
                  <div key={index} className="flex gap-4 rounded-2xl bg-surface-cream p-5">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-thailand-blue text-sm font-bold text-white">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{mistake}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="bg-surface-cream py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <p className="section-label text-center">FAQ</p>
              <h2 className="mb-8 text-center text-3xl font-bold font-heading text-gray-900">
                Phi Phi Island Tour: Frequently Asked Questions
              </h2>
              <div className="space-y-5">
                {FAQ_ITEMS.map((item) => (
                  <div key={item.question} className="rounded-2xl bg-white p-6 shadow-md">
                    <h3 className="mb-3 text-xl font-bold font-heading text-gray-900">{item.question}</h3>
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
              <p className="section-label text-center">Other Money Pages</p>
              <h2 className="mb-6 text-center text-3xl font-bold font-heading text-gray-900">
                While You are Planning Thailand
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Link
                  href="/grand-palace-tickets/"
                  className="rounded-2xl bg-surface-cream p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <h3 className="mb-2 font-bold font-heading text-gray-900">Grand Palace Tickets Guide</h3>
                  <p className="text-sm text-gray-600">Bangkok{'\u2019'}s biggest attraction with real ticket prices, dress code, and the skip-the-line options worth paying for.</p>
                </Link>
                <Link
                  href="/chiang-mai-elephant-sanctuary/"
                  className="rounded-2xl bg-surface-cream p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <h3 className="mb-2 font-bold font-heading text-gray-900">Chiang Mai Elephant Sanctuary</h3>
                  <p className="text-sm text-gray-600">Ethical sanctuary picks near Chiang Mai with price comparisons and honest notes on which operations are actually no-ride.</p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface-cream py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-5xl">
              <p className="section-label text-center">Related Reading</p>
              <h2 className="mb-6 text-center text-3xl font-bold font-heading text-gray-900">
                Go Deeper on Thai Islands and Beaches
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Link
                  href="/blog/phi-phi-islands-guide-beyond-tourist-crowds/"
                  className="rounded-2xl bg-white p-5 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <h3 className="mb-2 font-bold font-heading text-gray-900">Phi Phi Beyond the Tourist Crowds</h3>
                  <p className="text-sm text-gray-600">The quiet side of Phi Phi Don: Laem Tong, Long Beach at sunrise, and the local bars nobody tells day-trippers about.</p>
                </Link>
                <Link
                  href="/blog/thailand-islands/"
                  className="rounded-2xl bg-white p-5 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <h3 className="mb-2 font-bold font-heading text-gray-900">Thailand Islands Overview</h3>
                  <p className="text-sm text-gray-600">How Phi Phi compares to Koh Lanta, Koh Tao, Koh Samui, and Koh Lipe, with a decision framework for picking yours.</p>
                </Link>
                <Link
                  href="/blog/best-beaches-in-thailand/"
                  className="rounded-2xl bg-white p-5 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <h3 className="mb-2 font-bold font-heading text-gray-900">Best Beaches in Thailand</h3>
                  <p className="text-sm text-gray-600">Ranked list with Maya Bay in context: what beats it, what loses to it, and why a few unknown beaches belong in your itinerary.</p>
                </Link>
                <Link
                  href="/blog/where-to-stay-phuket-beaches-areas-budget/"
                  className="rounded-2xl bg-white p-5 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <h3 className="mb-2 font-bold font-heading text-gray-900">Where to Stay in Phuket</h3>
                  <p className="text-sm text-gray-600">Phuket beach areas compared by budget and vibe, useful if you are basing a Phi Phi day trip out of Phuket.</p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl rounded-3xl bg-surface-dark px-6 py-10 text-center text-white">
              <p className="mb-2 font-script text-thailand-gold">Final Call</p>
              <h2 className="mb-4 text-3xl font-bold font-heading">Book the Right Phi Phi Tour</h2>
              <p className="mx-auto mb-6 max-w-2xl text-blue-100">
                If I had one trip left this year, I would ferry from Krabi, sleep two nights on Phi Phi Don, hire a private longtail at sunrise for Maya Bay and Pileh Lagoon, and skip the Phuket day boats entirely. Whichever version fits your schedule, compare providers before you tap book.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href={VIATOR_GENERIC}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-thailand-blue transition-colors hover:bg-slate-100"
                >
                  Compare on Viator
                </a>
                <a
                  href={GYG_GENERIC}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center justify-center rounded-full border-2 border-white bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-thailand-blue"
                >
                  Check GetYourGuide
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
