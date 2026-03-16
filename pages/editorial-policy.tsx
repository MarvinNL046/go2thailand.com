import Head from 'next/head';
import Link from 'next/link';
import Breadcrumbs from '../components/Breadcrumbs';

export default function EditorialPolicy() {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Editorial Policy', href: '/editorial-policy' }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Editorial Policy - Go2Thailand.com',
    description: 'How Go2Thailand.com creates, verifies, and maintains trustworthy Thailand travel content. Our standards for accuracy, independence, and transparency.',
    url: 'https://go2-thailand.com/editorial-policy/',
    inLanguage: 'en',
    publisher: {
      '@type': 'Organization',
      name: 'Go2Thailand.com',
      url: 'https://go2-thailand.com',
      logo: 'https://go2-thailand.com/go2thailand-faviocon.webp',
      email: 'hello@go2-thailand.com',
    },
    dateModified: '2026-03-16',
  };

  return (
    <>
      <Head>
        <title>Editorial Policy - Go2Thailand.com | How We Create Trustworthy Travel Content</title>
        <meta
          name="description"
          content="Our editorial policy explains how Go2Thailand.com researches, fact-checks, and maintains accurate Thailand travel content — including our standards for independence, affiliate transparency, and corrections."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="min-h-screen bg-surface-cream">
        <Breadcrumbs items={breadcrumbs} />

        <div className="container-custom py-12">
          <div className="max-w-4xl mx-auto">

            {/* Hero */}
            <div className="bg-surface-dark text-white rounded-2xl p-8 md:p-12 mb-8 text-center">
              <p className="font-script text-thailand-gold text-lg mb-2">Editorial Policy</p>
              <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-4">
                How We Create Trustworthy Travel Content
              </h1>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Go2Thailand.com is committed to accuracy, independence, and transparency in everything we publish.
                Here is exactly how we work.
              </p>
            </div>

            {/* Our Standards */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">Our Standards</h2>
              <p className="text-gray-700 mb-6">
                We follow <strong>E-E-A-T principles</strong> — Experience, Expertise, Authoritativeness, and
                Trustworthiness — across every piece of content we publish. These are not aspirational goals;
                they are the non-negotiable foundation of how we operate.
              </p>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 flex-shrink-0">&#10003;</span>
                  <span>
                    <strong>Accuracy First</strong> — All facts, prices, visa requirements, transport schedules,
                    and operational details are verified against official and primary sources before publication.
                    We do not republish unverified claims.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 flex-shrink-0">&#10003;</span>
                  <span>
                    <strong>Regular Updates</strong> — Thailand changes fast. Content is reviewed and updated
                    regularly to reflect current prices, entry requirements, and on-the-ground conditions.
                    Outdated information is removed or corrected promptly.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 flex-shrink-0">&#10003;</span>
                  <span>
                    <strong>Independence</strong> — No hotel, tour operator, airline, or destination marketing
                    board can pay for coverage, higher rankings, or positive reviews. Our editorial decisions
                    are made independently of commercial relationships.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 flex-shrink-0">&#10003;</span>
                  <span>
                    <strong>Transparency</strong> — Where we earn affiliate commissions, this is clearly
                    disclosed. See our{' '}
                    <Link href="/affiliate-disclosure/" className="text-thailand-blue hover:underline">
                      affiliate disclosure
                    </Link>{' '}
                    for the full list of partnerships. Disclosure is never hidden in fine print.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 flex-shrink-0">&#10003;</span>
                  <span>
                    <strong>Real Data Only</strong> — We never fabricate reviews, ratings, hotel star counts,
                    or availability data. All structured data (prices, distances, travel times) comes from
                    verified, citable sources.
                  </span>
                </li>
              </ul>
            </div>

            {/* How We Research */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">How We Research</h2>
              <p className="text-gray-700 mb-6">
                Every destination guide, food article, transport route, and travel tip on Go2Thailand.com
                is built on a layered research process:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-surface-cream rounded-xl">
                  <div className="text-2xl mb-2">&#127981;</div>
                  <h3 className="font-semibold text-gray-900 mb-1">Official Tourism Authority Data</h3>
                  <p className="text-sm text-gray-600">
                    We cross-reference content with the Tourism Authority of Thailand (TAT), Thai immigration
                    and visa portals, and official transport operators.
                  </p>
                </div>
                <div className="p-4 bg-surface-cream rounded-xl">
                  <div className="text-2xl mb-2">&#10024;</div>
                  <h3 className="font-semibold text-gray-900 mb-1">Verified Traveler Experiences</h3>
                  <p className="text-sm text-gray-600">
                    We draw on documented traveler accounts, verified review platforms, and travel community
                    knowledge to ground recommendations in real-world experience.
                  </p>
                </div>
                <div className="p-4 bg-surface-cream rounded-xl">
                  <div className="text-2xl mb-2">&#127758;</div>
                  <h3 className="font-semibold text-gray-900 mb-1">Local Source Verification</h3>
                  <p className="text-sm text-gray-600">
                    Local context — opening hours, seasonal closures, cultural considerations — is verified
                    against local Thai sources and up-to-date community reports.
                  </p>
                </div>
                <div className="p-4 bg-surface-cream rounded-xl">
                  <div className="text-2xl mb-2">&#128197;</div>
                  <h3 className="font-semibold text-gray-900 mb-1">Regular On-the-Ground Updates</h3>
                  <p className="text-sm text-gray-600">
                    Prices, transport links, and entry requirements are reviewed on a rolling basis.
                    Content that cannot be verified as current is flagged or removed.
                  </p>
                </div>
              </div>
            </div>

            {/* How We Handle Affiliate Content */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">How We Handle Affiliate Content</h2>
              <p className="text-gray-700 mb-4">
                Go2Thailand.com participates in affiliate programmes — including Booking.com, Klook,
                GetYourGuide, 12Go, and others — which means we may earn a commission if you book through
                links on our site. Here is how we keep that from affecting our editorial integrity:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 flex-shrink-0">&#10003;</span>
                  <span>
                    Affiliate links <strong>never influence which destinations, hotels, or experiences we
                    recommend</strong>. Our rankings are based on verified quality, traveler value, and
                    relevance — not commission rates.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 flex-shrink-0">&#10003;</span>
                  <span>
                    <strong>We recommend products and services we genuinely believe provide value</strong> to
                    travelers. If a hotel or tour appears in our guides, it is because it meets our quality
                    bar — not because of a commercial arrangement.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 flex-shrink-0">&#10003;</span>
                  <span>
                    Affiliate relationships are disclosed clearly on every page where affiliate links appear.
                  </span>
                </li>
              </ul>
              <p className="text-gray-700 mt-4">
                For the complete list of affiliate partners and how they work, read our{' '}
                <Link href="/affiliate-disclosure/" className="text-thailand-blue hover:underline">
                  Affiliate Disclosure
                </Link>.
              </p>
            </div>

            {/* Corrections Policy */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">Corrections Policy</h2>
              <p className="text-gray-700 mb-4">
                We take accuracy seriously. When errors occur — and in a destination that changes as
                quickly as Thailand, they sometimes do — we correct them promptly and transparently.
              </p>
              <ul className="space-y-3 text-gray-700 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 flex-shrink-0">&#10003;</span>
                  <span>
                    <strong>We welcome corrections.</strong> If you spot an error in price, fact, or detail,
                    please let us know. Email us at{' '}
                    <a
                      href="mailto:hello@go2-thailand.com"
                      className="text-thailand-blue hover:underline"
                    >
                      hello@go2-thailand.com
                    </a>{' '}
                    or use our{' '}
                    <Link href="/contact/" className="text-thailand-blue hover:underline">
                      contact page
                    </Link>.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 flex-shrink-0">&#10003;</span>
                  <span>
                    <strong>Errors are corrected promptly.</strong> We aim to review and act on correction
                    requests within 5 working days.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 flex-shrink-0">&#10003;</span>
                  <span>
                    <strong>Corrections are made with transparency.</strong> Significant factual corrections
                    are noted in the updated content where appropriate, so readers know the information has
                    been reviewed.
                  </span>
                </li>
              </ul>
            </div>

            {/* Content Coverage */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">What We Cover</h2>
              <p className="text-gray-700 mb-6">
                Go2Thailand.com focuses exclusively on Thailand. This narrow focus allows us to go deeper
                than broad travel platforms and maintain higher accuracy across our entire content library.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Link href="/city/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="text-2xl mb-2">&#127751;</div>
                  <div className="font-semibold text-gray-900">33 Cities</div>
                  <div className="text-xs text-gray-600">In-depth destination guides</div>
                </Link>
                <Link href="/islands/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="text-2xl mb-2">&#127965;</div>
                  <div className="font-semibold text-gray-900">11 Islands</div>
                  <div className="text-xs text-gray-600">Beach & island guides</div>
                </Link>
                <Link href="/city/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="text-2xl mb-2">&#127966;</div>
                  <div className="font-semibold text-gray-900">295 Attractions</div>
                  <div className="text-xs text-gray-600">Verified & mapped</div>
                </Link>
                <Link href="/food/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="text-2xl mb-2">&#127836;</div>
                  <div className="font-semibold text-gray-900">46 Dishes</div>
                  <div className="text-xs text-gray-600">Thai cuisine guide</div>
                </Link>
                <Link href="/transport/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="text-2xl mb-2">&#128652;</div>
                  <div className="font-semibold text-gray-900">245 Routes</div>
                  <div className="text-xs text-gray-600">Transport planner</div>
                </Link>
                <Link href="/blog/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="text-2xl mb-2">&#128221;</div>
                  <div className="font-semibold text-gray-900">Travel Blog</div>
                  <div className="text-xs text-gray-600">Expert tips & stories</div>
                </Link>
              </div>
            </div>

            {/* Footer links */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">More About Go2Thailand.com</h2>
              <p className="text-gray-700 mb-6">
                For questions about our editorial process, corrections, or partnerships, we are always happy to hear from you.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/about/"
                  className="inline-flex items-center gap-2 bg-surface-dark text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
                >
                  About Us
                </Link>
                <Link
                  href="/affiliate-disclosure/"
                  className="inline-flex items-center gap-2 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:border-thailand-blue hover:text-thailand-blue transition-colors"
                >
                  Affiliate Disclosure
                </Link>
                <Link
                  href="/contact/"
                  className="inline-flex items-center gap-2 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:border-thailand-blue hover:text-thailand-blue transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
