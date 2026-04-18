import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { KLOOK_GENERIC, GYG_GENERIC, VIATOR_GENERIC } from '../../lib/affiliates';

const LAST_VERIFIED = 'April 18, 2026';
const CANONICAL_URL = 'https://go2-thailand.com/chiang-mai-elephant-sanctuary/';
const SITE_LOGO = 'https://go2-thailand.com/images/brand/go2thailand-logo-2026.png';

const FAQ_ITEMS = [
  {
    question: 'What makes an elephant sanctuary ethical vs a tourist trap?',
    answer:
      'A genuinely ethical sanctuary never allows riding, never uses bullhooks, never chains elephants at night, and never forces tricks, painting, or circus-style shows. Elephants roam freely in jungle or river valleys, eat on their own schedule, and interact with small visitor groups. Tourist traps dress up as sanctuaries by adding the word sanctuary to their name while still offering saddles, chain lines, and performances. If you see an elephant in a saddle or holding a paintbrush on the website, close the tab.',
  },
  {
    question: 'Which Chiang Mai elephant sanctuary is best?',
    answer:
      'Elephant Nature Park, founded by Lek Chailert, is the gold standard and the one I would pick for a first ethical visit. It has rescued more than 100 elephants from logging, street begging, and the tourism trade, it is featured in National Geographic and BBC documentaries, and it has no riding, no bathing on demand, and no shows. Patara Elephant Farm is a strong alternative if you want a smaller, one-on-one mahout-for-a-day style day at a higher price. Baanchang Elephant Park sits in the middle for budget.',
  },
  {
    question: 'How much does a Chiang Mai elephant sanctuary visit cost in 2026?',
    answer:
      'Expect USD 55 to 90 (around 1,900 to 3,100 THB) for a half-day budget visit, USD 80 to 130 (around 2,800 to 4,500 THB) for a full day at the better-known ethical sanctuaries, USD 160 to 220 (around 5,500 to 7,600 THB) for a premium one-on-one experience like Patara, and USD 160 to 280 (around 5,500 to 9,700 THB) for overnight stays at Elephant Nature Park. Hotel pickup, lunch, and a guide are almost always included.',
  },
  {
    question: 'What is the minimum age for kids at elephant sanctuaries in Chiang Mai?',
    answer:
      'Most ethical sanctuaries set a minimum age of 4 or 5 years old for direct elephant interaction. A few, such as Elephant Nature Park, offer observation-only programs that allow toddlers under 3 as long as a parent stays with them and does not enter the direct contact zones. Patara has stricter rules for the full mahout program, typically age 6 and up. Always email the sanctuary before booking if you have kids under 5.',
  },
  {
    question: 'Is it ever OK to ride an elephant in Thailand?',
    answer:
      'No. Riding, especially with a heavy wooden saddle called a howdah, causes long-term spinal injury in elephants. World Animal Protection, the Born Free Foundation, and Save Elephant Foundation all list riding as the clearest red flag of an unethical operation. The gentle-looking bareback riding still requires the elephant to be broken first using a process called phajaan, so avoid that too. Feeding, walking alongside, and observing are the ethical options.',
  },
  {
    question: 'What should I wear to an elephant sanctuary?',
    answer:
      'Quick-dry shorts or light pants, a t-shirt you do not mind getting muddy, closed-toe shoes or sport sandals with a back strap, and a swimsuit under your clothes if the visit includes river time. Bring a towel, sunscreen, insect repellent, a refillable water bottle, and a dry bag for your phone. Skip white clothes, flip-flops, and perfume. Most sanctuaries provide a traditional mahout shirt to wear during the day.',
  },
  {
    question: 'Should I book a full-day or a half-day elephant sanctuary?',
    answer:
      'A full day is worth the extra USD 30 to 50 because you get the slow, unhurried interaction that makes these visits meaningful: feeding in the morning, a forest walk, lunch with a view, and an afternoon river bath session. Half-day visits can feel rushed, with the drive eating a big chunk of your time. If you only have a half day, pick a closer sanctuary to keep travel time under 45 minutes each way.',
  },
  {
    question: 'How far in advance should I book an elephant sanctuary in Chiang Mai?',
    answer:
      'Two to four weeks in high season, which runs November through February. Elephant Nature Park in particular sells out a month ahead for December and January. Patara has limited daily spots because of its one-on-one model and often books out 3 weeks in advance. In the low season, May through September, a few days ahead is usually fine, but you still want to confirm pickup times in writing.',
  },
];

const RELATED_READING = [
  {
    href: '/blog/ethical-elephant-sanctuaries-thailand-2026-guide/',
    title: 'Ethical Elephant Sanctuaries Thailand 2026 Guide',
    description: 'Nationwide breakdown of ethical sanctuaries beyond Chiang Mai, with red flags to avoid.',
  },
  {
    href: '/blog/12-best-day-trips-from-chiang-mai-temples-waterfalls-mountains/',
    title: '12 Best Day Trips from Chiang Mai',
    description: 'Pair your sanctuary visit with temples, waterfalls, and mountain routes around Chiang Mai.',
  },
  {
    href: '/blog/wildlife-conservation-volunteering-thailand-2026-turtles-elephants/',
    title: 'Wildlife Conservation Volunteering in Thailand 2026',
    description: 'Longer-term volunteer programs with elephants, turtles, and rescue wildlife across Thailand.',
  },
  {
    href: '/blog/10-biggest-thailand-travel-mistakes/',
    title: '10 Biggest Thailand Travel Mistakes',
    description: 'Booking an elephant ride is one of them. Here are the other nine to dodge on your trip.',
  },
];

const SANCTUARIES = [
  {
    name: 'Elephant Nature Park',
    founder: 'Lek Chailert',
    halfDay: 'Observation only',
    fullDay: 'USD 80 to 130 (2,800 to 4,500 THB)',
    overnight: 'USD 160 to 280 (5,500 to 9,700 THB)',
    ride: 'Never',
    notes: 'The gold standard. 100+ rescued elephants. No bathing on demand.',
    direct: 'https://www.elephantnaturepark.org/',
  },
  {
    name: 'Patara Elephant Farm',
    founder: 'Pat Theerapat',
    halfDay: 'Not offered',
    fullDay: 'USD 160 to 220 (5,500 to 7,600 THB)',
    overnight: 'Limited',
    ride: 'Bareback only, optional',
    notes: 'One-on-one mahout for a day. Small groups, breeding focused.',
    direct: 'https://www.pataraelephantfarm.com/',
  },
  {
    name: 'Elephant Jungle Sanctuary',
    founder: 'Multiple camps',
    halfDay: 'USD 60 to 75 (2,100 to 2,600 THB)',
    fullDay: 'USD 80 to 90 (2,800 to 3,100 THB)',
    overnight: 'Not offered',
    ride: 'Never',
    notes: 'Popular, several locations. Some criticism on mud-bath pressure.',
    direct: 'https://www.elephantjunglesanctuary.com/',
  },
  {
    name: 'Baanchang Elephant Park',
    founder: 'Local family',
    halfDay: 'USD 70 to 85 (2,400 to 2,950 THB)',
    fullDay: 'USD 85 to 100 (2,950 to 3,450 THB)',
    overnight: 'Limited',
    ride: 'Never',
    notes: 'Ethical mid-range. Good for families who want small groups.',
    direct: 'https://baanchangelephantpark.com/',
  },
  {
    name: 'Elephant Care Sanctuary',
    founder: 'Local team',
    halfDay: 'USD 55 to 80 (1,900 to 2,800 THB)',
    fullDay: 'USD 75 to 95 (2,600 to 3,300 THB)',
    overnight: 'Not offered',
    ride: 'Never',
    notes: 'Budget ethical pick. Smaller herd, less crowded than the giants.',
    direct: 'https://www.elephantcaresanctuary.com/',
  },
  {
    name: 'Kerchor Elephant Eco Park',
    founder: 'Local family',
    halfDay: 'USD 65 to 80 (2,250 to 2,800 THB)',
    fullDay: 'USD 85 to 110 (2,950 to 3,800 THB)',
    overnight: 'Not offered',
    ride: 'Never',
    notes: 'Smaller crowds, hiking program, good alternative to the big names.',
    direct: 'https://www.kerchorelephantpark.com/',
  },
];

function AffiliateLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="inline-flex items-center justify-center rounded-full bg-thailand-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
    >
      {children}
    </a>
  );
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="text-thailand-blue underline decoration-dotted underline-offset-2 hover:text-blue-700"
    >
      {children}
    </a>
  );
}

export default function ChiangMaiElephantSanctuaryPage() {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Chiang Mai Elephant Sanctuary', href: '/chiang-mai-elephant-sanctuary' },
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
    headline: 'Chiang Mai Elephant Sanctuary 2026: Best Ethical Options + Where to Book',
    description:
      'Compare the best ethical elephant sanctuaries in Chiang Mai for 2026. Prices, red flags, where to book, and how to tell a real sanctuary from a tourist trap.',
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
        url: SITE_LOGO,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': CANONICAL_URL,
    },
  };

  return (
    <>
      <SEOHead
        title="Chiang Mai Elephant Sanctuary 2026: Best Ethical Options + Where to Book | Go2Thailand"
        description="Compare the best ethical elephant sanctuaries in Chiang Mai 2026. Real prices (USD + THB), 8-point ethics checklist, red flags, and where to book Elephant Nature Park, Patara, and more."
      >
        <link rel="canonical" href={CANONICAL_URL} />
        <meta
          name="keywords"
          content="chiang mai elephant sanctuary, ethical elephant sanctuary thailand, elephant nature park, patara elephant farm, best elephant sanctuary chiang mai, elephant sanctuary no riding"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </SEOHead>

      <div className="min-h-screen bg-surface-cream">
        <section className="bg-surface-dark text-white">
          <div className="container-custom py-16">
            <div className="mx-auto max-w-4xl text-center">
              <p className="mb-2 font-script text-thailand-gold">Ethical Elephant Experiences</p>
              <h1 className="mb-6 text-4xl font-bold font-heading lg:text-6xl">
                Chiang Mai Elephant Sanctuary 2026: Best Ethical Options + Where to Book
              </h1>
              <p className="mx-auto mb-8 max-w-3xl text-lg opacity-90 lg:text-2xl">
                Chiang Mai has more than 60 places calling themselves elephant sanctuaries. Maybe a
                dozen are actually ethical. Here is how to tell the difference, what real 2026 prices
                look like, and where to book the sanctuaries that let elephants be elephants.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="#sanctuaries"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-thailand-blue transition-colors hover:bg-slate-100"
                >
                  Jump to 2026 Prices
                </a>
                <AffiliateLink href={KLOOK_GENERIC}>Browse Klook Sanctuaries</AffiliateLink>
                <AffiliateLink href={GYG_GENERIC}>Browse GetYourGuide</AffiliateLink>
              </div>
              <p className="mt-5 text-sm text-blue-100">
                Verified against official sanctuary pages, World Animal Protection guidance, and Save
                Elephant Foundation on {LAST_VERIFIED}. Affiliate links are marked and do not change
                the ranking.
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

        <section id="why-ethical" className="bg-white py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-5xl">
              <p className="section-label text-center">Why This Matters</p>
              <h2 className="mb-8 text-center text-3xl font-bold font-heading text-gray-900">
                Why Ethical Elephant Tourism Matters
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-6">
                  <h3 className="mb-3 font-bold font-heading text-gray-900">Bullhook Abuse Is Real</h3>
                  <p className="text-sm text-gray-700">
                    Every riding elephant you see was first broken through a traditional process called
                    phajaan, which uses bullhooks, chains, and isolation to crush the animal&apos;s
                    spirit. World Animal Protection has documented this for more than a decade. No
                    ethical sanctuary uses bullhooks or allows them on site.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-6">
                  <h3 className="mb-3 font-bold font-heading text-gray-900">Riding Causes Injury</h3>
                  <p className="text-sm text-gray-700">
                    Elephants look huge, but their spines are not built to carry a wooden howdah plus
                    two adults for eight hours a day. Veterinary research from Chiang Mai University
                    shows repeated spinal injury, foot abscesses, and arthritis in riding elephants.
                    Bareback is slightly better, but still requires a broken elephant to start with.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-6">
                  <h3 className="mb-3 font-bold font-heading text-gray-900">Your Money Shifts the Industry</h3>
                  <p className="text-sm text-gray-700">
                    When Lek Chailert opened Elephant Nature Park in the 1990s, riding camps dominated
                    Chiang Mai. Now the share of ride-free sanctuaries is growing every year because
                    travelers vote with their dollars. Every ethical booking makes the next camp
                    reconsider its saddles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="sanctuaries" className="scroll-mt-20 py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-6xl">
              <p className="section-label text-center">2026 Prices</p>
              <h2 className="mb-4 text-center text-3xl font-bold font-heading text-gray-900">
                Six Ethical Elephant Sanctuaries in Chiang Mai Compared
              </h2>
              <p className="mx-auto mb-8 max-w-3xl text-center text-gray-600">
                All prices verified on {LAST_VERIFIED} against official sanctuary pages. USD shown
                first with THB in parentheses at roughly 34.5 THB per USD. Hotel pickup, lunch, and a
                guide are included unless noted.
              </p>
              <div className="overflow-x-auto rounded-2xl bg-white shadow-md">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-4 text-left font-semibold text-gray-900">Sanctuary</th>
                      <th className="px-4 py-4 text-left font-semibold text-gray-900">Half Day</th>
                      <th className="px-4 py-4 text-left font-semibold text-gray-900">Full Day</th>
                      <th className="px-4 py-4 text-left font-semibold text-gray-900">Overnight</th>
                      <th className="px-4 py-4 text-left font-semibold text-gray-900">Riding?</th>
                      <th className="px-4 py-4 text-left font-semibold text-gray-900">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {SANCTUARIES.map((s) => (
                      <tr key={s.name}>
                        <td className="px-4 py-4 font-medium text-gray-900">
                          <ExternalLink href={s.direct}>{s.name}</ExternalLink>
                        </td>
                        <td className="px-4 py-4 text-gray-700">{s.halfDay}</td>
                        <td className="px-4 py-4 text-gray-700">{s.fullDay}</td>
                        <td className="px-4 py-4 text-gray-700">{s.overnight}</td>
                        <td className="px-4 py-4 text-gray-700">{s.ride}</td>
                        <td className="px-4 py-4 text-gray-700">{s.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section id="where-to-book" className="bg-white py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-5xl">
              <p className="section-label text-center">Where to Book</p>
              <h2 className="mb-4 text-center text-3xl font-bold font-heading text-gray-900">
                Where to Book Your Chiang Mai Elephant Sanctuary Visit
              </h2>
              <p className="mx-auto mb-8 max-w-3xl text-center text-gray-600">
                Four routes work well in 2026. Direct is usually cheapest and most flexible. The big
                three booking platforms are useful if you want one itinerary in one account, free
                cancellation windows, and reviews from thousands of other travelers.
              </p>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl bg-surface-cream p-6 shadow-sm">
                  <h3 className="mb-3 font-bold font-heading text-gray-900">1. Direct With the Sanctuary</h3>
                  <p className="mb-4 text-sm text-gray-700">
                    Email the sanctuary or book on its official site. You usually pay the lowest rate
                    and can ask about group size, age limits, or dietary needs before paying.
                  </p>
                  <p className="text-xs text-gray-500">
                    Best for: specific sanctuary, dietary requests, kids under 5.
                  </p>
                </div>
                <div className="rounded-2xl bg-surface-cream p-6 shadow-sm">
                  <h3 className="mb-3 font-bold font-heading text-gray-900">2. Klook</h3>
                  <p className="mb-4 text-sm text-gray-700">
                    Klook lists most major Chiang Mai sanctuaries with instant confirmation, 24-hour
                    cancellation on many tours, and pickup included from hotels in the city.
                  </p>
                  <AffiliateLink href={KLOOK_GENERIC}>Search Klook</AffiliateLink>
                </div>
                <div className="rounded-2xl bg-surface-cream p-6 shadow-sm">
                  <h3 className="mb-3 font-bold font-heading text-gray-900">3. GetYourGuide</h3>
                  <p className="mb-4 text-sm text-gray-700">
                    GetYourGuide has strong verified reviews and free cancellation up to 24 hours on
                    most sanctuary tours. Useful if you want to compare experiences side by side.
                  </p>
                  <AffiliateLink href={GYG_GENERIC}>Search GetYourGuide</AffiliateLink>
                </div>
                <div className="rounded-2xl bg-surface-cream p-6 shadow-sm">
                  <h3 className="mb-3 font-bold font-heading text-gray-900">4. Viator</h3>
                  <p className="mb-4 text-sm text-gray-700">
                    Viator is the TripAdvisor-owned option with a huge inventory and lowest-price
                    guarantees. Good for combining sanctuary visits with other Chiang Mai tours.
                  </p>
                  <AffiliateLink href={VIATOR_GENERIC}>Search Viator</AffiliateLink>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="ethics-checklist" className="py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <p className="section-label text-center">Ethics Checklist</p>
              <h2 className="mb-6 text-center text-3xl font-bold font-heading text-gray-900">
                8-Point Checklist: Is This Sanctuary Actually Ethical?
              </h2>
              <div className="rounded-2xl bg-white p-6 shadow-md">
                <ol className="space-y-4 text-gray-700">
                  <li>
                    <strong>1. No riding, ever.</strong> Not bareback, not with a saddle, not for
                    photos. Any camp offering riding is not a sanctuary, even if it uses the word.
                  </li>
                  <li>
                    <strong>2. No bullhooks on site.</strong> Mahouts should carry only voice commands
                    or a bamboo stick for gentle guidance. Metal bullhooks are a hard no.
                  </li>
                  <li>
                    <strong>3. Free roaming during the day.</strong> Elephants should be grazing,
                    walking in the forest, or bathing in the river, not tied to a post waiting for
                    tourists.
                  </li>
                  <li>
                    <strong>4. No chains at night, or chains with long leads only.</strong> Chained
                    elephants develop stereotypic swaying. Ask about overnight setups before booking.
                  </li>
                  <li>
                    <strong>5. Small visitor-to-elephant ratio.</strong> Groups of 4 to 8 people per
                    elephant is reasonable. Groups of 20 with one elephant is a factory line.
                  </li>
                  <li>
                    <strong>6. No painting, no football, no tricks.</strong> If an elephant is
                    performing for a crowd, something is wrong.
                  </li>
                  <li>
                    <strong>7. Bathing happens in rivers, not mud pits on demand.</strong> Elephants
                    love water, but not on a strict hourly schedule with 30 tourists waiting.
                  </li>
                  <li>
                    <strong>8. A real rescue story, documented.</strong> Ethical sanctuaries publish
                    each elephant&apos;s name, age, and rescue background. If the website has no
                    stories, that is a signal.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section id="red-flags" className="bg-white py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <p className="section-label text-center">Red Flags</p>
              <h2 className="mb-6 text-center text-3xl font-bold font-heading text-gray-900">
                Red Flag Warning Signs to Walk Away From
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-red-50 p-5">
                  <h3 className="mb-2 font-bold text-red-900">Any form of riding</h3>
                  <p className="text-sm text-red-800">
                    Saddles, howdahs, even bareback photo seats. All require a broken elephant.
                  </p>
                </div>
                <div className="rounded-2xl bg-red-50 p-5">
                  <h3 className="mb-2 font-bold text-red-900">Painting or trick shows</h3>
                  <p className="text-sm text-red-800">
                    Elephants do not naturally paint Thai flags. That ability is taught with pain.
                  </p>
                </div>
                <div className="rounded-2xl bg-red-50 p-5">
                  <h3 className="mb-2 font-bold text-red-900">Short chains at the site</h3>
                  <p className="text-sm text-red-800">
                    Especially chains on all four legs or chains with less than 5 meters of slack.
                  </p>
                </div>
                <div className="rounded-2xl bg-red-50 p-5">
                  <h3 className="mb-2 font-bold text-red-900">Circus-style performances</h3>
                  <p className="text-sm text-red-800">
                    Dancing, football, balancing on stools. None of these belong in a real sanctuary.
                  </p>
                </div>
                <div className="rounded-2xl bg-red-50 p-5">
                  <h3 className="mb-2 font-bold text-red-900">Names to avoid in 2026</h3>
                  <p className="text-sm text-red-800">
                    Maetaeng, Mae Taman, and any camp listing riding or shows as a main activity. A
                    few have quietly rebranded as sanctuaries without changing practices.
                  </p>
                </div>
                <div className="rounded-2xl bg-red-50 p-5">
                  <h3 className="mb-2 font-bold text-red-900">Baby elephants on display</h3>
                  <p className="text-sm text-red-800">
                    Babies separated from their mothers to draw tourists is a breeding-for-tourism
                    sign. Real sanctuaries keep mother and calf together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="elephant-nature-park" className="py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <p className="section-label text-center">Deep Dive</p>
              <h2 className="mb-6 text-center text-3xl font-bold font-heading text-gray-900">
                Elephant Nature Park: The Gold Standard
              </h2>
              <div className="rounded-2xl bg-white p-8 shadow-md">
                <p className="mb-4 text-gray-700">
                  Elephant Nature Park sits in a river valley about 60 km north of Chiang Mai, a drive
                  of roughly 90 minutes with hotel pickup. Founder Lek Chailert opened it in the
                  mid-1990s as a place for elephants rescued from logging camps, street begging, and
                  trekking tourism to simply live. In 2026 the park houses more than 100 rescued
                  elephants alongside hundreds of rescued dogs, cats, and buffalo.
                </p>
                <p className="mb-4 text-gray-700">
                  What makes it different: there is no riding, there are no forced bath times, and
                  there are no tricks. You watch elephants eat melons the size of your head, walk
                  alongside them on forest paths, prepare their food in the kitchen, and maybe see
                  them wade into the river on their own schedule. A full-day visit runs USD 80 to 130
                  (2,800 to 4,500 THB). Overnight stays run USD 160 to 280 (5,500 to 9,700 THB) and
                  include bungalow lodging, all meals, and more time with the herds.
                </p>
                <p className="mb-4 text-gray-700">
                  Booking fills up a month ahead for December and January. Lek Chailert also runs the
                  Save Elephant Foundation, a registered Thai charity that has helped reform dozens of
                  former riding camps into ride-free operations. Your ticket directly funds vet bills,
                  rescue missions, and the land lease.
                </p>
                <div className="flex flex-wrap gap-3">
                  <AffiliateLink href={KLOOK_GENERIC}>Book via Klook</AffiliateLink>
                  <AffiliateLink href={GYG_GENERIC}>Book via GetYourGuide</AffiliateLink>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="patara-vs-enp" className="bg-white py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-5xl">
              <p className="section-label text-center">Head to Head</p>
              <h2 className="mb-6 text-center text-3xl font-bold font-heading text-gray-900">
                Patara Elephant Farm vs Elephant Nature Park
              </h2>
              <div className="overflow-x-auto rounded-2xl bg-surface-cream shadow-md">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-4 text-left font-semibold text-gray-900">Factor</th>
                      <th className="px-4 py-4 text-left font-semibold text-gray-900">Elephant Nature Park</th>
                      <th className="px-4 py-4 text-left font-semibold text-gray-900">Patara Elephant Farm</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr>
                      <td className="px-4 py-4 font-medium text-gray-900">Model</td>
                      <td className="px-4 py-4 text-gray-700">Rescue sanctuary, large herd</td>
                      <td className="px-4 py-4 text-gray-700">Breeding and conservation farm</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-medium text-gray-900">Herd size</td>
                      <td className="px-4 py-4 text-gray-700">100+ elephants</td>
                      <td className="px-4 py-4 text-gray-700">Roughly 40 elephants</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-medium text-gray-900">Full-day price</td>
                      <td className="px-4 py-4 text-gray-700">USD 80 to 130 (2,800 to 4,500 THB)</td>
                      <td className="px-4 py-4 text-gray-700">USD 160 to 220 (5,500 to 7,600 THB)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-medium text-gray-900">Interaction style</td>
                      <td className="px-4 py-4 text-gray-700">Observe, feed, walk alongside</td>
                      <td className="px-4 py-4 text-gray-700">One-on-one mahout-for-a-day</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-medium text-gray-900">Riding</td>
                      <td className="px-4 py-4 text-gray-700">Never</td>
                      <td className="px-4 py-4 text-gray-700">Optional bareback on neck only</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-medium text-gray-900">Best for</td>
                      <td className="px-4 py-4 text-gray-700">First-time visitors, families, advocacy</td>
                      <td className="px-4 py-4 text-gray-700">Couples, solo travelers, deeper hands-on</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section id="included-pickup" className="py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <p className="section-label text-center">What Is Included</p>
              <h2 className="mb-6 text-center text-3xl font-bold font-heading text-gray-900">
                What Is Included + Hotel Pickup
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl bg-white p-6 shadow-md">
                  <h3 className="mb-3 font-bold font-heading text-gray-900">Included at almost every sanctuary</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>Round-trip hotel pickup from Chiang Mai Old City, Nimman, and Night Bazaar areas.</li>
                    <li>English-speaking guide for the day.</li>
                    <li>Thai buffet lunch, usually vegetarian-friendly.</li>
                    <li>Mahout shirt to wear during the visit.</li>
                    <li>Bottled water, coffee, and fruit throughout.</li>
                    <li>Photos taken by the guide, sent via WhatsApp or cloud link after.</li>
                  </ul>
                </div>
                <div className="rounded-2xl bg-white p-6 shadow-md">
                  <h3 className="mb-3 font-bold font-heading text-gray-900">Pickup logistics</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>Pickup windows run 7:30 to 8:30 AM for full-day programs.</li>
                    <li>Half-day afternoon options pick up around 12:00 to 1:00 PM.</li>
                    <li>Return is usually 5:00 to 6:30 PM in Chiang Mai.</li>
                    <li>Hotels outside the main ring road may add USD 5 to 10 per person.</li>
                    <li>Airbnb and homestays sometimes need a nearby meeting point.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="what-to-wear" className="bg-white py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <p className="section-label text-center">Packing</p>
              <h2 className="mb-6 text-center text-3xl font-bold font-heading text-gray-900">
                What to Wear and Bring
              </h2>
              <div className="rounded-2xl bg-surface-cream p-6 shadow-md">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-3 font-bold font-heading text-gray-900">Wear</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>Quick-dry shorts or light pants.</li>
                      <li>T-shirt you do not mind getting muddy or wet.</li>
                      <li>Closed-toe shoes or sport sandals with a back strap.</li>
                      <li>Swimsuit under your clothes if river time is included.</li>
                      <li>Hat or cap for sun protection.</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-3 font-bold font-heading text-gray-900">Bring</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>Towel, compact if possible.</li>
                      <li>Reef-safe sunscreen and insect repellent.</li>
                      <li>Refillable water bottle (refills are usually free on site).</li>
                      <li>Dry bag or zip bag for your phone and wallet.</li>
                      <li>Small cash tip for the mahout, around 100 to 200 THB.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="kids" className="py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <p className="section-label text-center">With Kids</p>
              <h2 className="mb-6 text-center text-3xl font-bold font-heading text-gray-900">
                Visiting With Kids: Minimum Ages by Sanctuary
              </h2>
              <div className="overflow-x-auto rounded-2xl bg-white shadow-md">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-4 text-left font-semibold text-gray-900">Sanctuary</th>
                      <th className="px-4 py-4 text-left font-semibold text-gray-900">Minimum Age</th>
                      <th className="px-4 py-4 text-left font-semibold text-gray-900">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    <tr>
                      <td className="px-4 py-4 font-medium text-gray-900">Elephant Nature Park</td>
                      <td className="px-4 py-4 text-gray-700">4 for single-day, under 3 observation only</td>
                      <td className="px-4 py-4 text-gray-700">Observation platforms keep toddlers safe.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-medium text-gray-900">Patara Elephant Farm</td>
                      <td className="px-4 py-4 text-gray-700">6 for full mahout program</td>
                      <td className="px-4 py-4 text-gray-700">One-on-one model is not suited to toddlers.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-medium text-gray-900">Elephant Jungle Sanctuary</td>
                      <td className="px-4 py-4 text-gray-700">5</td>
                      <td className="px-4 py-4 text-gray-700">Larger groups, good for older kids.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-medium text-gray-900">Baanchang Elephant Park</td>
                      <td className="px-4 py-4 text-gray-700">4</td>
                      <td className="px-4 py-4 text-gray-700">Family-friendly half-day program.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-medium text-gray-900">Elephant Care Sanctuary</td>
                      <td className="px-4 py-4 text-gray-700">5</td>
                      <td className="px-4 py-4 text-gray-700">Smaller herd, more attention per child.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-medium text-gray-900">Kerchor Elephant Eco Park</td>
                      <td className="px-4 py-4 text-gray-700">4</td>
                      <td className="px-4 py-4 text-gray-700">Gentle hiking option for older kids.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section id="best-time" className="bg-white py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <p className="section-label text-center">Timing</p>
              <h2 className="mb-6 text-center text-3xl font-bold font-heading text-gray-900">
                Best Time to Visit + How to Avoid Crowds
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="mb-2 font-bold text-gray-900">High season: Nov to Feb</h3>
                  <p className="text-sm text-gray-700">
                    Cooler, dry, the most pleasant weather. Book 2 to 4 weeks ahead. Expect full
                    groups at Elephant Nature Park and 3-week waits for Patara.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="mb-2 font-bold text-gray-900">Shoulder: Mar and Oct</h3>
                  <p className="text-sm text-gray-700">
                    March gets hot and smoky from agricultural burning. October is wet but calmer
                    with fewer crowds and greener landscape.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="mb-2 font-bold text-gray-900">Low season: May to Sep</h3>
                  <p className="text-sm text-gray-700">
                    Rain is usually afternoon only, so morning sanctuary visits still work well.
                    Smallest groups, easiest bookings, and the rivers are full for bathing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="mistakes" className="py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <p className="section-label text-center">Avoid These</p>
              <h2 className="mb-6 text-center text-3xl font-bold font-heading text-gray-900">
                6 Common Mistakes Travelers Make
              </h2>
              <div className="space-y-4">
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <h3 className="mb-2 font-bold text-gray-900">1. Booking on the day of arrival</h3>
                  <p className="text-sm text-gray-700">
                    The best sanctuaries sell out. Walking into your hotel and asking for an elephant
                    tour usually lands you at a less-ethical camp with same-day availability.
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <h3 className="mb-2 font-bold text-gray-900">2. Trusting the word sanctuary in the name</h3>
                  <p className="text-sm text-gray-700">
                    Dozens of riding camps added the word sanctuary to their name after the ethics
                    wave started. Always verify against the 8-point checklist.
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <h3 className="mb-2 font-bold text-gray-900">3. Picking the cheapest option by default</h3>
                  <p className="text-sm text-gray-700">
                    USD 30 tours exist, but usually run tighter schedules, larger groups, and have
                    less space per elephant. The USD 80 to 100 range is the honest sweet spot.
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <h3 className="mb-2 font-bold text-gray-900">4. Pushing for bathing photos</h3>
                  <p className="text-sm text-gray-700">
                    Real sanctuaries let elephants bathe when they want. If bathing is heavily
                    promoted on the brochure, that is often a schedule, not a natural behavior.
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <h3 className="mb-2 font-bold text-gray-900">5. Bringing a drone without asking</h3>
                  <p className="text-sm text-gray-700">
                    Most sanctuaries ban drones because noise stresses elephants. Ask before you fly
                    or you will be asked to put it away.
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <h3 className="mb-2 font-bold text-gray-900">6. Skipping travel insurance</h3>
                  <p className="text-sm text-gray-700">
                    Slippery river rocks, unfamiliar terrain, and a 3-tonne animal means small
                    injuries happen. See our{' '}
                    <Link href="/travel-insurance-thailand" className="text-thailand-blue underline">
                      Thailand travel insurance guide
                    </Link>{' '}
                    before you fly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-20 bg-white py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <p className="section-label text-center">FAQ</p>
              <h2 className="mb-8 text-center text-3xl font-bold font-heading text-gray-900">
                Frequently Asked Questions
              </h2>
              <div className="space-y-5">
                {FAQ_ITEMS.map((item) => (
                  <div key={item.question} className="rounded-2xl bg-surface-cream p-6 shadow-md">
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

        <section className="py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <p className="section-label text-center">Plan the Rest of Your Trip</p>
              <h2 className="mb-6 text-center text-3xl font-bold font-heading text-gray-900">
                Pair Your Sanctuary Visit With These Experiences
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Link
                  href="/grand-palace-tickets/"
                  className="rounded-2xl bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <h3 className="mb-2 font-bold font-heading text-gray-900">Grand Palace Tickets</h3>
                  <p className="text-sm text-gray-600">
                    Book Bangkok&apos;s Grand Palace ahead of time and skip the scam guides at the gate.
                  </p>
                </Link>
                <Link
                  href="/phi-phi-island-tour/"
                  className="rounded-2xl bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <h3 className="mb-2 font-bold font-heading text-gray-900">Phi Phi Island Tour</h3>
                  <p className="text-sm text-gray-600">
                    Compare day tours and overnight options to Maya Bay and the Phi Phi islands.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-5xl">
              <p className="section-label text-center">Related Reading</p>
              <h2 className="mb-6 text-center text-3xl font-bold font-heading text-gray-900">
                Read These Before You Book
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {RELATED_READING.map((post) => (
                  <Link
                    key={post.href}
                    href={post.href}
                    className="rounded-2xl bg-surface-cream p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                  >
                    <h3 className="mb-2 font-bold font-heading text-gray-900">{post.title}</h3>
                    <p className="text-sm text-gray-600">{post.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl rounded-3xl bg-surface-dark px-6 py-10 text-center text-white">
              <p className="mb-2 font-script text-thailand-gold">Final Pick</p>
              <h2 className="mb-4 text-3xl font-bold font-heading">
                If I only had one day in Chiang Mai
              </h2>
              <p className="mx-auto mb-6 max-w-2xl text-blue-100">
                I would book a full day at Elephant Nature Park through Klook or GetYourGuide,
                confirm hotel pickup the night before, and bring a dry bag and towel. That is the
                single choice in Chiang Mai that reliably supports ethical elephant welfare in 2026.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <AffiliateLink href={KLOOK_GENERIC}>Search Klook</AffiliateLink>
                <AffiliateLink href={GYG_GENERIC}>Search GetYourGuide</AffiliateLink>
                <AffiliateLink href={VIATOR_GENERIC}>Search Viator</AffiliateLink>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
