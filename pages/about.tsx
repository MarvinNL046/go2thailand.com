import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '../components/Breadcrumbs';

export default function AboutPage() {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    mainEntity: {
      '@type': 'Organization',
      name: 'Go2Thailand.com',
      url: 'https://go2-thailand.com',
      logo: 'https://go2-thailand.com/go2thailand-faviocon.webp',
      description: 'Independent Thailand travel guide helping travelers plan unforgettable trips since 2024.',
      foundingDate: '2024',
      email: 'hello@go2-thailand.com',
      founder: {
        '@type': 'Person',
        name: 'Marvin',
        jobTitle: 'Founder & Lead Editor',
        image: 'https://go2-thailand.com/images/team/marvin.webp',
      },
      areaServed: {
        '@type': 'Country',
        name: 'Thailand',
      },
    },
  };

  return (
    <>
      <Head>
        <title>About Us - Go2Thailand.com | Independent Thailand Travel Guide</title>
        <meta name="description" content="Learn about Go2Thailand.com — an independent Thailand travel guide covering 33 cities, 11 islands, and hundreds of attractions. Our mission, team, and editorial standards." />
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
              <p className="font-script text-thailand-gold text-lg mb-2">About Us</p>
              <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-4">Go2Thailand.com</h1>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Your independent guide to exploring Thailand — from bustling Bangkok to serene island beaches.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                Go2Thailand.com exists to help travelers plan better trips to Thailand. We believe every visitor deserves
                access to accurate, up-to-date, and honest travel information — whether you&apos;re a first-timer figuring out
                your visa or a seasoned traveler looking for the best Khao Soi in Chiang Mai.
              </p>
              <p className="text-gray-700">
                We cover <strong>33 cities</strong>, <strong>11 islands</strong>, <strong>295 attractions</strong>,
                {' '}<strong>46 Thai dishes</strong>, and <strong>245 transport routes</strong> across every region of Thailand.
                Our guides are researched, fact-checked, and regularly updated.
              </p>
            </div>

            {/* What We Cover */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">What We Cover</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Link href="/city/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="text-2xl mb-2">&#127751;</div>
                  <div className="font-semibold text-gray-900">33 Cities</div>
                  <div className="text-xs text-gray-600">Destination guides</div>
                </Link>
                <Link href="/islands/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="text-2xl mb-2">&#127965;</div>
                  <div className="font-semibold text-gray-900">11 Islands</div>
                  <div className="text-xs text-gray-600">Beach paradises</div>
                </Link>
                <Link href="/food/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="text-2xl mb-2">&#127836;</div>
                  <div className="font-semibold text-gray-900">46+ Dishes</div>
                  <div className="text-xs text-gray-600">Thai cuisine guide</div>
                </Link>
                <Link href="/transport/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="text-2xl mb-2">&#128652;</div>
                  <div className="font-semibold text-gray-900">245 Routes</div>
                  <div className="text-xs text-gray-600">Transport planner</div>
                </Link>
                <Link href="/region/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="text-2xl mb-2">&#127757;</div>
                  <div className="font-semibold text-gray-900">4 Regions</div>
                  <div className="text-xs text-gray-600">North, South, Central, Isaan</div>
                </Link>
                <Link href="/blog/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="text-2xl mb-2">&#128221;</div>
                  <div className="font-semibold text-gray-900">Travel Blog</div>
                  <div className="text-xs text-gray-600">Tips & stories</div>
                </Link>
              </div>
            </div>

            {/* Meet the Founder */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">Meet the Founder</h2>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <Image
                    src="/images/team/marvin.webp"
                    alt="Marvin — Founder of Go2Thailand.com"
                    width={180}
                    height={180}
                    className="rounded-2xl object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">Marvin</h3>
                  <p className="text-sm text-thailand-blue font-medium mb-3">Founder &amp; Lead Editor</p>
                  <p className="text-gray-700 mb-3">
                    Marvin is a Dutch expat and travel technology specialist who has been exploring Thailand extensively
                    since 2019, visiting over 50 provinces across the country. What started as a personal passion for
                    Thai culture, food, and off-the-beaten-path destinations grew into Go2Thailand.com — an independent
                    travel guide built to help fellow travelers plan better trips.
                  </p>
                  <p className="text-gray-700 mb-3">
                    Based between the Netherlands and Southeast Asia, Marvin combines firsthand travel experience with
                    a background in web development to create data-driven, practical guides. He personally oversees
                    all editorial content, ensures accuracy of prices and logistics, and maintains the site&apos;s
                    commitment to honest, unbiased recommendations.
                  </p>
                  <p className="text-gray-700">
                    Marvin also runs the{' '}
                    <strong>Go2 Travel Network</strong> — a family of destination guides including{' '}
                    <a href="https://go2-vietnam.com" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">Go2Vietnam</a>,{' '}
                    <a href="https://go2-bali.com" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">Go2Bali</a>,{' '}
                    <a href="https://go2-japan.com" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">Go2Japan</a>, and more.
                  </p>
                </div>
              </div>
            </div>

            {/* Editorial Standards */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">Our Editorial Standards</h2>
              <p className="text-gray-700 mb-4">
                We follow <strong>E-E-A-T principles</strong> (Experience, Expertise, Authoritativeness, Trustworthiness)
                in everything we publish:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 flex-shrink-0">&#10003;</span>
                  <span><strong>Real data only</strong> — We never fabricate prices, ratings, or availability. All data comes from verified sources.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 flex-shrink-0">&#10003;</span>
                  <span><strong>Regular updates</strong> — Content is reviewed and updated regularly. Outdated information helps no one.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 flex-shrink-0">&#10003;</span>
                  <span><strong>Transparent affiliates</strong> — We earn commissions from some links, clearly disclosed. This never influences our recommendations. See our <Link href="/affiliate-disclosure/" className="text-thailand-blue hover:underline">affiliate disclosure</Link>.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 flex-shrink-0">&#10003;</span>
                  <span><strong>No sponsored content</strong> — Hotels and tour operators cannot pay for reviews or higher rankings.</span>
                </li>
              </ul>
              <p className="text-gray-700 mt-4">
                Read our full <Link href="/editorial-policy/" className="text-thailand-blue hover:underline">editorial policy</Link> for more details.
              </p>
            </div>

            {/* How We Create Content */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">How We Create Content</h2>
              <p className="text-gray-700 mb-4">
                Our content is created by a team of Thailand-based travel writers, long-term expats, and technology
                specialists. We combine firsthand travel experience with data-driven research to produce guides that
                are both practical and trustworthy.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>AI-assisted, human-verified:</strong> We use AI tools to assist with research, drafting, and
                data analysis. All content is reviewed, fact-checked, and verified by our editorial team before
                publication. Statistics are sourced from official organizations (Tourism Authority of Thailand, UNESCO,
                government agencies) and linked directly to their origin.
              </p>
              <p className="text-gray-700">
                <strong>Correction policy:</strong> If you find an error in our content, please{' '}
                <Link href="/contact/" className="text-thailand-blue hover:underline">contact us</Link>. We take
                accuracy seriously and will correct verified errors within 24 hours.
              </p>
            </div>

            {/* How We're Different */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">How We&apos;re Different</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Unlike large travel platforms, we focus exclusively on Thailand. This allows us to go deeper:
                  city-by-city budget breakdowns, month-by-month weather data, and curated top-10 lists based on
                  real reviews — not advertising spend.
                </p>
                <p>
                  We also provide tools that big sites don&apos;t: a{' '}
                  <Link href="/thailand-index/" className="text-thailand-blue hover:underline">Thailand Travel Index</Link>{' '}
                  comparing all 33 cities by budget, weather, and transport connectivity, and a{' '}
                  <Link href="/compare/" className="text-thailand-blue hover:underline">destination comparison tool</Link>{' '}
                  to help you choose between similar cities.
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">Get in Touch</h2>
              <p className="text-gray-700 mb-4">
                Have a question, suggestion, or found an error? We&apos;d love to hear from you.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact/"
                  className="inline-flex items-center gap-2 bg-thailand-red text-white px-6 py-3 rounded-xl font-semibold hover:bg-thailand-red-600 transition-colors"
                >
                  Contact Us
                </Link>
                <a
                  href="mailto:hello@go2-thailand.com"
                  className="inline-flex items-center gap-2 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:border-thailand-blue hover:text-thailand-blue transition-colors"
                >
                  hello@go2-thailand.com
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
