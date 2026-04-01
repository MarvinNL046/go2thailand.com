import { ReactNode, useEffect } from 'react';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';

const EKTA_LINK = 'https://ektatraveling.tpo.lv/pK9wyXgr';
const SAFETYWING_LINK = 'https://safetywing.com/?referenceID=26490463&utm_source=26490463&utm_medium=Ambassador';
const LAST_VERIFIED = 'March 10, 2026';

const FAQ_ITEMS = [
  {
    question: 'Do I need travel insurance for Thailand?',
    answer:
      'Yes. Thailand can be affordable day to day, but private medical bills add up fast. Bumrungrad publishes room rates that already run into the thousands of baht per night, and CDC guidance for Thailand highlights road safety, food and water risks, heat illness, and swimming hazards. I would not go uninsured.',
  },
  {
    question: 'Does travel insurance cover motorbikes in Thailand?',
    answer:
      'Sometimes, but only if your policy explicitly allows it and you meet the conditions. SafetyWing says motor accidents can be covered for recreational motorcycle driving if you have a valid license, wear a helmet, and are not breaking the law. EKTA lists scooters, mopeds, and motorcycles under its Active rest tier and above. If you ride without the right license, many claims can fall apart.',
  },
  {
    question: 'What is the best travel insurance for Thailand?',
    answer:
      'For a straightforward short trip, I would start with EKTA because its Thailand page, low daily pricing, and activity-tier structure make it easy to match a one-off holiday. For remote workers and longer trips, SafetyWing is the stronger fit because it works on a rolling subscription model with $250,000 medical coverage and $100,000 in evacuation coverage on the public plan details I checked.',
  },
  {
    question: 'How much does Thailand travel insurance cost?',
    answer:
      'For a short solo trip, Thailand travel insurance can start around $14 to $20 for two weeks using EKTA’s public daily pricing. SafetyWing’s public pricing is age-based; when I checked it on March 10, 2026, the official page showed $62.72 per four weeks for ages 10 to 39. Real quotes vary by age, home country, and add-ons.',
  },
  {
    question: 'Does travel insurance cover Muay Thai in Thailand?',
    answer:
      'Do not assume it does. SafetyWing’s Description of Coverage lists martial arts among excluded activities, so standard cover is not enough for Muay Thai. If training or fighting is part of your trip, get written confirmation from the insurer before you buy.',
  },
  {
    question: 'Is healthcare expensive in Thailand?',
    answer:
      'Public care can be cheaper, but the hospitals most travelers want in an emergency are often private. Bumrungrad’s published room rates show how quickly costs can rise before specialist treatment, scans, surgery, or evacuation are added. That is exactly why a strong medical limit matters more than saving a few dollars on premium.',
  },
];

const INTERNAL_GUIDES = [
  {
    href: '/city/phuket/',
    title: 'Phuket City Guide',
    description: 'Useful if you might rent a scooter, book boat trips, or stay near private hospitals.',
  },
  {
    href: '/travel-guides/scooter-rental-thailand/',
    title: 'Scooter Rental in Thailand',
    description: 'Read this before you assume your helmet and license situation is good enough.',
  },
  {
    href: '/best-diving-snorkeling-in-thailand/',
    title: 'Best Diving & Snorkeling',
    description: 'Relevant if you need to double-check activity wording before booking your policy.',
  },
  {
    href: '/best-muay-thai-in-thailand/',
    title: 'Best Muay Thai in Thailand',
    description: 'Important because Muay Thai cover is not something I would ever assume by default.',
  },
  {
    href: '/practical-info/health-vaccinations/',
    title: 'Health & Vaccinations',
    description: 'Dengue, food safety, mosquito protection, and the basics to sort before flying.',
  },
  {
    href: '/travel-guides/thailand-weather/',
    title: 'Thailand Weather Guide',
    description: 'Useful if your trip crosses rainy season, island hopping, or heat-heavy months.',
  },
  {
    href: '/esim/',
    title: 'Thailand eSIM Guide',
    description: 'Save your policy docs, insurer hotline, and hospital directions on a working phone.',
  },
  {
    href: '/thailand-travel-guide/',
    title: 'Thailand Travel Guide',
    description: 'Complete planning guide for your Thailand trip — from visas to budgets.',
  },
  {
    href: '/thailand-for-first-timers/',
    title: 'Thailand for First Timers',
    description: 'Everything first-time visitors need to know before arriving.',
  },
  {
    href: '/islands/',
    title: 'Thai Islands Guide',
    description: 'Island hopping often needs boat insurance add-ons — check your coverage.',
  },
];

function AffiliateButton({
  href,
  children,
  variant = 'primary',
}: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
}) {
  const className =
    variant === 'primary'
      ? 'inline-flex items-center justify-center rounded-full bg-thailand-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700'
      : 'inline-flex items-center justify-center rounded-full border border-thailand-blue px-6 py-3 text-sm font-semibold text-thailand-blue transition-colors hover:bg-thailand-blue hover:text-white';

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow sponsored"
      className={className}
    >
      {children}
    </a>
  );
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <h3 className="mb-3 text-xl font-bold font-heading text-gray-900">{title}</h3>
      <div className="space-y-4 text-gray-700">{children}</div>
    </div>
  );
}

function SafetyWingWidget() {
  useEffect(() => {
    // Load SafetyWing price widget script
    const existing = document.querySelector('script[src*="safetywing-price-widget"]');
    if (existing) return;
    const script = document.createElement('script');
    script.src = 'https://storage.googleapis.com/safetywing-static/widget/safetywing-price-widget.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="my-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div
        className="safetywing-price-widget"
        data-safetywingaffiliateid="26490463"
        data-scale="1.0"
      />
    </div>
  );
}

export default function TravelInsurancePage() {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Travel Insurance', href: '/travel-insurance-thailand' },
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
    headline: 'Best Travel Insurance for Thailand in 2026',
    description:
      'Compare the best travel insurance for Thailand in 2026. We review Ekta and SafetyWing on price, scooter cover, medical limits, evacuation and the exclusions that actually matter.',
    datePublished: '2026-03-10',
    dateModified: '2026-03-10',
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
        url: 'https://go2-thailand.com/images/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://go2-thailand.com/travel-insurance-thailand/',
    },
  };

  return (
    <>
      <SEOHead
        title="Best Travel Insurance for Thailand 2026 — From $0.99/Day"
        description="We compared Ekta (from $0.99/day) and SafetyWing ($62/4 weeks) for Thailand. Scooter cover, medical limits up to $250K, evacuation rules & the exclusions that actually matter."
      >
        <meta
          name="keywords"
          content="travel insurance thailand, best travel insurance for thailand, thailand travel insurance, travel insurance for thailand, do i need travel insurance for thailand, best travel medical insurance for thailand, travel health insurance thailand"
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
              <p className="mb-2 font-script text-thailand-gold">Fact-Checked Guide</p>
              <h1 className="mb-6 text-4xl font-bold font-heading lg:text-6xl">
                Best Travel Insurance for Thailand in 2026
              </h1>
              <p className="mx-auto mb-8 max-w-3xl text-lg opacity-90 lg:text-2xl">
                If I were booking Thailand today, I would not buy insurance based on brand
                recognition alone. I would compare scooter rules, medical limits, evacuation, and
                activity exclusions first, because those are the details that matter when something
                actually goes wrong.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="#comparison"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-thailand-blue transition-colors hover:bg-slate-100"
                >
                  Jump to Comparison
                </a>
                <AffiliateButton href={EKTA_LINK}>Get a Quote from Ekta</AffiliateButton>
                <AffiliateButton href={SAFETYWING_LINK} variant="secondary">
                  Get a Quote from SafetyWing
                </AffiliateButton>
              </div>
              <p className="mt-5 text-sm text-blue-100">
                Verified against official provider pages and public health guidance on{' '}
                {LAST_VERIFIED}. Affiliate links are marked and do not change my comparison.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="container-custom py-6">
            <Breadcrumbs items={breadcrumbs} />
            <div className="mt-4 rounded-2xl bg-orange-50 px-4 py-3">
              <p className="text-center text-sm text-orange-800">
                This page contains affiliate links. We may earn a commission at no extra cost to
                you.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white pb-6">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <nav aria-label="Table of contents" className="rounded-2xl bg-slate-50 p-5">
                <p className="mb-3 font-semibold text-gray-900">In this guide</p>
                <ul className="grid gap-2 text-sm sm:grid-cols-2">
                  <li><a href="#do-you-need" className="text-thailand-blue hover:underline">Do You Need Travel Insurance?</a></li>
                  <li><a href="#comparison" className="text-thailand-blue hover:underline">Top 2 Picks at a Glance</a></li>
                  <li><a href="#reviews" className="text-thailand-blue hover:underline">Full Reviews</a></li>
                  <li><a href="#coverage" className="text-thailand-blue hover:underline">What Should It Cover?</a></li>
                  <li><a href="#risks" className="text-thailand-blue hover:underline">Thailand-Specific Risks</a></li>
                  <li><a href="#cost" className="text-thailand-blue hover:underline">How Much Does It Cost?</a></li>
                  <li><a href="#how-to-buy" className="text-thailand-blue hover:underline">How to Buy</a></li>
                  <li><a href="#faq" className="text-thailand-blue hover:underline">Frequently Asked Questions</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </section>

        <section id="do-you-need" className="bg-white py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <p className="section-label text-center">Quick Answer</p>
              <h2 className="mb-6 text-center text-3xl font-bold font-heading text-gray-900">
                Do You Need Travel Insurance for Thailand?
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <SectionCard title="Short answer: yes">
                  <p>
                    Thailand is easy to love and easy to underestimate. Day-to-day costs can be
                    low, but one private-hospital stay is enough to erase any savings from flying
                    budget or eating street food every day.
                  </p>
                  <p>
                    Bumrungrad publishes room rates that already start in the thousands of baht per
                    night before specialist fees, scans, surgery, or evacuation are added. CDC
                    guidance for Thailand also flags road safety, food and water exposure, heat,
                    and swimming hazards as real traveler risks.
                  </p>
                </SectionCard>
                <SectionCard title="Why people get caught out">
                  <p>
                    The biggest mistake is buying the cheapest policy and assuming “Thailand is
                    cheap” means the claim will be cheap too. It often is not, especially if a
                    scooter crash, diving issue, or island transfer emergency is involved.
                  </p>
                  <p>
                    The second mistake is assuming motorbikes and activities are covered by
                    default. They often are not. That is why I care more about exclusions,
                    license rules, and evacuation language than a headline premium.
                  </p>
                  <p>
                    Search GoFundMe for "Thailand hospital bill" or "scooter accident Thailand"
                    and you will find dozens of fundraisers from travelers who went without cover
                    or had the wrong policy. Those stories are preventable.
                  </p>
                </SectionCard>
              </div>
            </div>
          </div>
        </section>

        <section id="comparison" className="scroll-mt-20 py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-5xl">
              <p className="section-label text-center">Top Picks</p>
              <h2 className="mb-4 text-center text-3xl font-bold font-heading text-gray-900">
                Our Top 2 Picks at a Glance
              </h2>
              <p className="mx-auto mb-8 max-w-3xl text-center text-gray-600">
                I would choose between these two first. EKTA is easier to fit around a short
                Thailand holiday. SafetyWing is stronger for longer travel and nomad-style stays.
              </p>
              <div className="overflow-x-auto rounded-2xl bg-white shadow-md">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-4 text-left font-semibold text-gray-900">Feature</th>
                      <th className="px-4 py-4 text-left font-semibold text-gray-900">
                        Ekta Insurance
                      </th>
                      <th className="px-4 py-4 text-left font-semibold text-gray-900">
                        SafetyWing
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    <tr>
                      <td className="px-4 py-4 font-medium text-gray-900">Best for</td>
                      <td className="px-4 py-4 text-gray-700">Short trips and 1 to 4 week holidays</td>
                      <td className="px-4 py-4 text-gray-700">
                        Digital nomads and longer flexible travel
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-medium text-gray-900">Price from</td>
                      <td className="px-4 py-4 text-gray-700">$0.99/day on the public site</td>
                      <td className="px-4 py-4 text-gray-700">
                        Age-based live quote; official page showed $62.72 / 4 weeks when checked
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-medium text-gray-900">Medical coverage</td>
                      <td className="px-4 py-4 text-gray-700">
                        Thailand page highlights $50,000 and $125,000 options
                      </td>
                      <td className="px-4 py-4 text-gray-700">$250,000</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-medium text-gray-900">Scooter / motorbike</td>
                      <td className="px-4 py-4 text-gray-700">
                        Listed under Active rest and above
                      </td>
                      <td className="px-4 py-4 text-gray-700">
                        Motor accidents can be covered with valid license and helmet
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-medium text-gray-900">Adventure activities</td>
                      <td className="px-4 py-4 text-gray-700">
                        Structured by Quiet rest, Active rest, Extreme, and Sport tiers
                      </td>
                      <td className="px-4 py-4 text-gray-700">
                        Optional activity upgrades exist, but confirm exact exclusions
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-medium text-gray-900">Claims / support</td>
                      <td className="px-4 py-4 text-gray-700">24/7 support; policy by email in 1 minute</td>
                      <td className="px-4 py-4 text-gray-700">
                        Dashboard claims; typical reimbursement in 10 days or less
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <AffiliateButton href={EKTA_LINK}>Get a Quote from Ekta</AffiliateButton>
                <AffiliateButton href={SAFETYWING_LINK} variant="secondary">
                  Get a Quote from SafetyWing
                </AffiliateButton>
              </div>
            </div>
          </div>
        </section>

        <section id="reviews" className="scroll-mt-20 bg-white py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-5xl">
              <p className="section-label text-center">Full Reviews</p>
              <h2 className="mb-8 text-center text-3xl font-bold font-heading text-gray-900">
                Best Travel Insurance for Thailand — Full Reviews
              </h2>
              <div className="space-y-8">
                <SectionCard title="1. Ekta Insurance — Best for Thailand-Specific Coverage">
                  <p>
                    EKTA stands out because it does something many competitors do not: it has a
                    dedicated Thailand page instead of forcing you through a generic worldwide
                    funnel. If I am booking a normal Thailand holiday and want a fast, country-fit
                    quote, that matters.
                  </p>
                  <p>
                    On the public site, EKTA advertises pricing from $0.99 per day and presents
                    Thailand-specific medical coverage options on its country page. The broader site
                    also makes its activity logic unusually clear: Quiet rest for standard trips,
                    Active rest for things like scooters and mopeds, then Extreme and Sport for more
                    serious risk.
                  </p>
                  <p>
                    The other reason I like EKTA for Thailand is transparency around what you are
                    paying for. Its tariff tables show that some transport benefits, including
                    medical aviation and evacuation to your home country, only appear on stronger
                    plans. That makes it much easier to understand where a cheap plan stops being
                    cheap in the real world.
                  </p>
                  <p>
                    EKTA is not a newcomer. The company has been in the travel insurance market for
                    over 12 years, has sold more than 6.2 million policies, and holds a 4.9 out of
                    5 customer rating on its public review pages. That kind of track record matters
                    when you are trusting someone with a medical claim on the other side of the
                    world.
                  </p>
                  <p>
                    I would pick EKTA first for short trips, couples, backpackers, and anyone who
                    wants to build a policy around scooter riding or activity tiers without paying
                    for a rolling subscription they do not need.
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-green-50 p-5">
                      <p className="mb-3 font-semibold text-green-900">What I like</p>
                      <ul className="space-y-2 text-sm text-green-800">
                        <li>Public pricing starts at $0.99/day.</li>
                        <li>Dedicated Thailand landing page.</li>
                        <li>24/7 support and policy delivery by email in about 1 minute.</li>
                        <li>Activity tiers make scooter cover easier to judge before you buy.</li>
                        <li>4.9/5 rating with 6.2M+ policies sold over 12+ years.</li>
                      </ul>
                    </div>
                    <div className="rounded-2xl bg-amber-50 p-5">
                      <p className="mb-3 font-semibold text-amber-900">Watch out for</p>
                      <ul className="space-y-2 text-sm text-amber-800">
                        <li>Medical evacuation and aviation only on stronger plans.</li>
                        <li>Lower medical limits ($50K/$125K) compared to SafetyWing's $250K.</li>
                        <li>Not subscription-based — less flexible for open-ended trips.</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <AffiliateButton href={EKTA_LINK}>Get a Quote from Ekta</AffiliateButton>
                  </div>
                </SectionCard>

                <SectionCard title="2. SafetyWing — Best for Digital Nomads & Long-Term Travelers">
                  <p>
                    SafetyWing is the cleaner choice if your Thailand trip is open-ended, part of a
                    broader Asia loop, or tied to remote work. The big advantage is its
                    subscription-style structure. You are not building a one-off holiday policy every
                    time your dates change.
                  </p>
                  <p>
                    On the official product page I checked, the public quote for ages 10 to 39
                    showed $62.72 per four weeks, with $250,000 in medical coverage and $100,000
                    in medical evacuation. SafetyWing also states that its Essential plan can be
                    cancelled any time by stopping subscription payments from the dashboard.
                  </p>
                  <p>
                    SafetyWing is also more explicit than some brands about claims admin. Its FAQ
                    says claims are filed through the dashboard and are typically reimbursed within
                    10 days or less by bank transfer. For longer trips, that operational clarity is
                    worth something.
                  </p>
                  <p>
                    The main caution is activities. SafetyWing says motor accidents can be covered
                    for recreational motorcycle driving, but only if you have a valid license, wear
                    a helmet, and are not breaking local law. Its Description of Coverage also lists
                    martial arts among excluded activities, so I would not rely on the standard plan
                    for Muay Thai without written confirmation.
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-green-50 p-5">
                      <p className="mb-3 font-semibold text-green-900">What I like</p>
                      <ul className="space-y-2 text-sm text-green-800">
                        <li>Strong fit for digital nomads and long stays.</li>
                        <li>$250,000 medical coverage and $100,000 evacuation on the public plan.</li>
                        <li>Cancel-anytime subscription model.</li>
                        <li>Claims process is clearly documented.</li>
                      </ul>
                    </div>
                    <div className="rounded-2xl bg-amber-50 p-5">
                      <p className="mb-3 font-semibold text-amber-900">Watch out for</p>
                      <ul className="space-y-2 text-sm text-amber-800">
                        <li>Martial arts (including Muay Thai) excluded on standard plan.</li>
                        <li>Motorbike cover requires valid license and helmet — no exceptions.</li>
                        <li>Higher entry price than EKTA for short, fixed trips.</li>
                      </ul>
                    </div>
                  </div>
                  <SafetyWingWidget />
                  <div className="flex flex-wrap gap-3">
                    <AffiliateButton href={SAFETYWING_LINK}>
                      Get a Quote from SafetyWing
                    </AffiliateButton>
                  </div>
                </SectionCard>
              </div>
            </div>
          </div>
        </section>

        <section id="coverage" className="scroll-mt-20 py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-5xl">
              <p className="section-label text-center">Coverage Checklist</p>
              <h2 className="mb-8 text-center text-3xl font-bold font-heading text-gray-900">
                What Should Your Thailand Travel Insurance Cover?
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <SectionCard title="Non-negotiables">
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li>At least $100,000 in emergency medical coverage. More is better.</li>
                    <li>Medical evacuation and repatriation.</li>
                    <li>Motorbike or scooter cover if you plan to ride at all.</li>
                    <li>Clear activity wording for diving, climbing, surfing, or island trips.</li>
                    <li>24/7 emergency assistance and a practical claims process.</li>
                  </ul>
                </SectionCard>
                <SectionCard title="Nice to have, depending on your trip">
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li>Trip interruption or cancellation if you are prepaying flights and hotels.</li>
                    <li>Baggage cover if you travel with expensive electronics.</li>
                    <li>Higher transport benefits if you will be on islands or remote routes.</li>
                    <li>Written confirmation for anything niche, especially Muay Thai.</li>
                    <li>Low-friction reimbursement if you expect to self-pay and claim back.</li>
                  </ul>
                </SectionCard>
              </div>
            </div>
          </div>
        </section>

        <section id="risks" className="scroll-mt-20 bg-white py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-5xl">
              <p className="section-label text-center">Thailand Risks</p>
              <h2 className="mb-8 text-center text-3xl font-bold font-heading text-gray-900">
                Thailand-Specific Risks You Need Coverage For
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="mb-2 font-bold text-gray-900">Road and scooter crashes</h3>
                  <p className="text-sm text-gray-700">
                    CDC highlights road safety for Thailand. This is the first thing I check in a
                    policy because a scooter is where cheap holidays turn expensive fast.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="mb-2 font-bold text-gray-900">Food and water issues</h3>
                  <p className="text-sm text-gray-700">
                    Most cases are minor, but dehydration, IV treatment, and a private clinic visit
                    can still become a claim. CDC food and drink guidance is relevant here.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="mb-2 font-bold text-gray-900">Dengue fever</h3>
                  <p className="text-sm text-gray-700">
                    Thailand has dengue risk. WHO and CDC both treat it as a serious mosquito-borne
                    issue, especially in warmer and wetter periods.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="mb-2 font-bold text-gray-900">Swimming and jellyfish hazards</h3>
                  <p className="text-sm text-gray-700">
                    CDC travel advice for Thailand explicitly warns about swimming hazards. If your
                    trip is beach-heavy, do not dismiss coastal injuries and stings as edge cases.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="mb-2 font-bold text-gray-900">Diving incidents</h3>
                  <p className="text-sm text-gray-700">
                    Decompression sickness is rare but serious. If diving is on the plan, I check
                    activity wording before I book the policy, not after.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="mb-2 font-bold text-gray-900">Extreme heat and dehydration</h3>
                  <p className="text-sm text-gray-700">
                    Thailand’s heat can flatten people who are otherwise healthy. CDC’s heat
                    guidance is not theoretical if you are moving around in April or May.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="cost" className="scroll-mt-20 py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <p className="section-label text-center">Pricing</p>
              <h2 className="mb-6 text-center text-3xl font-bold font-heading text-gray-900">
                How Much Does Travel Insurance for Thailand Cost?
              </h2>
              <div className="rounded-2xl bg-white p-6 shadow-md">
                <p className="mb-4 text-gray-700">
                  I prefer to show transparent ranges instead of fake precision. The examples below
                  use public pricing I checked on {LAST_VERIFIED}, but your quote still changes with
                  age, residence, dates, and activity choices.
                </p>
                <ul className="space-y-4 text-sm text-gray-700">
                  <li>
                    <strong>Backpacker for 2 weeks:</strong> EKTA’s public starting rate works out to
                    about $13.86 for 14 days, and its Active rest tier comes out higher. In practice,
                    I would budget roughly $20 to $40 if you want a more realistic Thailand setup.
                  </li>
                  <li>
                    <strong>Family for 2 weeks:</strong> there is no honest one-size figure because age
                    changes the math, but even using entry-level daily pricing, four travelers quickly
                    move past the “cheap add-on” stage. Expect to run live quotes rather than guess.
                  </li>
                  <li>
                    <strong>Digital nomad for 3 months:</strong> using SafetyWing’s published
                    $62.72-per-4-weeks figure for ages 10 to 39, three months lands around $188
                    before any add-ons or age uplifts.
                  </li>
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  <AffiliateButton href={EKTA_LINK}>Check Ekta Pricing</AffiliateButton>
                  <AffiliateButton href={SAFETYWING_LINK} variant="secondary">
                    Check SafetyWing Pricing
                  </AffiliateButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-to-buy" className="scroll-mt-20 bg-white py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <p className="section-label text-center">How to Buy</p>
              <h2 className="mb-6 text-center text-3xl font-bold font-heading text-gray-900">
                How to Buy Travel Insurance for Thailand
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="mb-2 font-semibold text-gray-900">1. Match the provider to the trip</p>
                  <p className="text-sm text-gray-700">
                    EKTA for short, fixed Thailand trips. SafetyWing for flexible or longer travel.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="mb-2 font-semibold text-gray-900">2. Check activity rules</p>
                  <p className="text-sm text-gray-700">
                    Scooters, diving, climbing, and Muay Thai should be reviewed line by line.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="mb-2 font-semibold text-gray-900">3. Confirm medical and evacuation limits</p>
                  <p className="text-sm text-gray-700">
                    This is where the cheap policy often stops looking cheap.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="mb-2 font-semibold text-gray-900">4. Save the policy offline</p>
                  <p className="text-sm text-gray-700">
                    Keep your PDF, emergency number, and claim instructions on your phone before you
                    land.
                  </p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <AffiliateButton href={EKTA_LINK}>Buy via Ekta</AffiliateButton>
                <AffiliateButton href={SAFETYWING_LINK} variant="secondary">
                  Buy via SafetyWing
                </AffiliateButton>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-20 py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <p className="section-label text-center">FAQ</p>
              <h2 className="mb-8 text-center text-3xl font-bold font-heading text-gray-900">
                Frequently Asked Questions
              </h2>
              <div className="space-y-5">
                {FAQ_ITEMS.map((item) => (
                  <div key={item.question} className="rounded-2xl bg-white p-6 shadow-md">
                    <h3 className="mb-3 text-xl font-bold font-heading text-gray-900">
                      {item.question}
                    </h3>
                    <p className="text-gray-700">{item.answer}</p>
                    {item.question === 'What is the best travel insurance for Thailand?' && (
                      <div className="mt-4 flex flex-wrap gap-3">
                        <AffiliateButton href={EKTA_LINK}>Compare Ekta</AffiliateButton>
                        <AffiliateButton href={SAFETYWING_LINK} variant="secondary">
                          Compare SafetyWing
                        </AffiliateButton>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <p className="section-label text-center">Trip Planning</p>
              <h2 className="mb-6 text-center text-3xl font-bold font-heading text-gray-900">
                Plan Your Trip
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Link
                  href="/visa/"
                  className="rounded-2xl bg-white p-5 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <h3 className="mb-1 font-bold font-heading text-gray-900">Visa Guide</h3>
                  <p className="text-sm text-gray-600">Entry requirements, visa on arrival, and e-visa for Thailand.</p>
                </Link>
                <Link
                  href="/weather/"
                  className="rounded-2xl bg-white p-5 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <h3 className="mb-1 font-bold font-heading text-gray-900">Weather Guide</h3>
                  <p className="text-sm text-gray-600">Best time to visit, rainy season, and regional climate differences.</p>
                </Link>
                <Link
                  href="/compare/"
                  className="rounded-2xl bg-white p-5 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <h3 className="mb-1 font-bold font-heading text-gray-900">Compare Destinations</h3>
                  <p className="text-sm text-gray-600">Side-by-side comparisons of Thai cities to help you decide where to go.</p>
                </Link>
                <Link
                  href="/city/"
                  className="rounded-2xl bg-white p-5 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <h3 className="mb-1 font-bold font-heading text-gray-900">City Guides</h3>
                  <p className="text-sm text-gray-600">In-depth guides for all 33 Thai cities — attractions, food, transport, and more.</p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-5xl">
              <p className="section-label text-center">Related Guides</p>
              <h2 className="mb-6 text-center text-3xl font-bold font-heading text-gray-900">
                Read These Before You Go
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {INTERNAL_GUIDES.map((guide) => (
                  <Link
                    key={guide.href}
                    href={guide.href}
                    className="rounded-2xl bg-surface-cream p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                  >
                    <h3 className="mb-2 font-bold font-heading text-gray-900">{guide.title}</h3>
                    <p className="text-sm text-gray-600">{guide.description}</p>
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
                If I had to choose quickly
              </h2>
              <p className="mx-auto mb-6 max-w-2xl text-blue-100">
                I would go with EKTA for a normal short Thailand holiday and SafetyWing for a long
                stay or nomad trip. Either way, I would buy the policy only after checking scooter
                rules, evacuation wording, and activity exclusions.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <AffiliateButton href={EKTA_LINK}>Get a Quote from Ekta</AffiliateButton>
                <AffiliateButton href={SAFETYWING_LINK} variant="secondary">
                  Get a Quote from SafetyWing
                </AffiliateButton>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
