import Head from 'next/head';
import Link from 'next/link';
import Breadcrumbs from '../components/Breadcrumbs';

export default function AffiliateDisclosure() {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Affiliate Disclosure - Go2Thailand.com',
    description:
      'Learn how Go2Thailand.com earns affiliate commissions, which partners we work with, and how this never influences our editorial recommendations.',
    url: 'https://go2-thailand.com/affiliate-disclosure/',
    publisher: {
      '@type': 'Organization',
      name: 'Go2Thailand.com',
      url: 'https://go2-thailand.com',
    },
  };

  return (
    <>
      <Head>
        <title>Affiliate Disclosure - Go2Thailand.com</title>
        <meta
          name="description"
          content="Learn how Go2Thailand.com earns affiliate commissions, which partners we work with, and how this never influences our editorial recommendations."
        />
        <meta name="robots" content="noindex, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="min-h-screen bg-surface-cream">
        <Breadcrumbs items={breadcrumbs} />

        <div className="container-custom py-12">
          <div className="max-w-4xl mx-auto">

            {/* Page header */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h1 className="text-3xl font-bold font-heading text-gray-900 mb-2">
                Affiliate Disclosure
              </h1>
              <p className="text-sm text-gray-500">Last updated: March 2026</p>
              <p className="text-gray-700 mt-4">
                Go2Thailand.com is an independent travel guide. To keep this site free for readers,
                we participate in affiliate programmes. This page explains exactly how that works,
                which partners are involved, and what it means for you.
              </p>
            </div>

            {/* How We Earn */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">How We Earn</h2>
              <p className="text-gray-700 mb-4">
                Some links on Go2Thailand.com are affiliate links. When you click one of these links
                and complete a purchase or booking, we may earn a small commission — at no extra cost
                to you. The price you pay is identical to what you would pay by visiting the partner
                directly.
              </p>
              <p className="text-gray-700 mb-4">
                We currently participate in affiliate programmes from the following partners:
              </p>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1 flex-shrink-0">&#8212;</span>
                  <span><strong>Booking.com</strong> — hotel and accommodation bookings</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1 flex-shrink-0">&#8212;</span>
                  <span><strong>Klook</strong> — tours, activities, and day trips</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1 flex-shrink-0">&#8212;</span>
                  <span><strong>GetYourGuide</strong> — tours and experiences</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1 flex-shrink-0">&#8212;</span>
                  <span><strong>Viator</strong> — tours and activities</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1 flex-shrink-0">&#8212;</span>
                  <span><strong>Trip.com</strong> — flights, hotels, and transport</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1 flex-shrink-0">&#8212;</span>
                  <span><strong>12Go Asia</strong> — buses, trains, ferries, and transfers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1 flex-shrink-0">&#8212;</span>
                  <span><strong>Saily</strong> — eSIM data plans for travellers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1 flex-shrink-0">&#8212;</span>
                  <span><strong>NordVPN</strong> — VPN service for secure internet access abroad</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1 flex-shrink-0">&#8212;</span>
                  <span><strong>SafetyWing</strong> — travel medical insurance and nomad insurance</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1 flex-shrink-0">&#8212;</span>
                  <span><strong>Amazon</strong> — travel gear and accessories</span>
                </li>
              </ul>
              <p className="text-gray-700">
                This disclosure complies with the FTC&apos;s guidelines on endorsements and testimonials,
                and with applicable consumer protection regulations in other jurisdictions.
              </p>
            </div>

            {/* Our Promise */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">Our Promise</h2>
              <p className="text-gray-700 mb-4">
                Earning commissions does not change what we write or recommend. We hold ourselves to
                the following standards without exception:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 flex-shrink-0">&#10003;</span>
                  <span>
                    <strong>Commissions never influence our recommendations.</strong> We recommend
                    hotels, tours, and services based on quality and relevance to the reader, not
                    commission rates.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 flex-shrink-0">&#10003;</span>
                  <span>
                    <strong>We recommend products and services we genuinely believe in.</strong> If
                    we would not use something ourselves, we do not promote it.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 flex-shrink-0">&#10003;</span>
                  <span>
                    <strong>Negative findings are published honestly.</strong> If a destination,
                    hotel, or service has real drawbacks, we say so — regardless of whether we have
                    an affiliate relationship.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 flex-shrink-0">&#10003;</span>
                  <span>
                    <strong>We clearly mark affiliate links.</strong> Where practical, affiliate
                    links are identified so you always know when a click may generate a commission.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 flex-shrink-0">&#10003;</span>
                  <span>
                    <strong>We research and vet before recommending.</strong> Affiliate partners are
                    selected based on traveller feedback, industry reputation, and our own assessment
                    of their service quality.
                  </span>
                </li>
              </ul>
            </div>

            {/* Which Links Are Affiliate Links */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                Which Links Are Affiliate Links?
              </h2>
              <p className="text-gray-700 mb-4">
                Affiliate tracking may be present on the following types of links across the site:
              </p>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1 flex-shrink-0">&#8212;</span>
                  <span>
                    <strong>Hotel booking links</strong> — &quot;Book now&quot; or &quot;Check availability&quot; buttons
                    on city pages, top-10-hotels pages, and destination guides
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1 flex-shrink-0">&#8212;</span>
                  <span>
                    <strong>Tour and activity links</strong> — links to cooking classes, elephant
                    sanctuaries, diving trips, Muay Thai experiences, and other activities
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1 flex-shrink-0">&#8212;</span>
                  <span>
                    <strong>Transport booking links</strong> — bus, train, ferry, and transfer
                    bookings via 12Go Asia or Trip.com
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1 flex-shrink-0">&#8212;</span>
                  <span>
                    <strong>Travel insurance links</strong> — links to SafetyWing plans on our
                    travel insurance pages
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1 flex-shrink-0">&#8212;</span>
                  <span>
                    <strong>eSIM links</strong> — links to Saily on our SIM card and connectivity
                    guides
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1 flex-shrink-0">&#8212;</span>
                  <span>
                    <strong>VPN links</strong> — links to NordVPN on our travel security and
                    digital nomad pages
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1 flex-shrink-0">&#8212;</span>
                  <span>
                    <strong>Travel gear links</strong> — product links to Amazon on our packing
                    and gear guides
                  </span>
                </li>
              </ul>
              <p className="text-gray-700">
                Links to external sources cited for factual purposes (government websites, official
                tourism boards, news articles) are never affiliate links.
              </p>
            </div>

            {/* How This Supports Us */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                How This Supports Us
              </h2>
              <p className="text-gray-700 mb-4">
                Producing accurate, regularly updated travel content requires ongoing research,
                writing, and technical work. Affiliate commissions are the primary way we cover
                these costs while keeping Go2Thailand.com free to use and largely free of
                intrusive advertising.
              </p>
              <p className="text-gray-700">
                When you book through one of our links, you directly support the continued
                development of this site at no additional cost to yourself. We appreciate it, and
                we take that responsibility seriously by maintaining the editorial independence
                described above.
              </p>
            </div>

            {/* Related pages */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                Related Policies
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <Link href="/editorial-policy/" className="text-thailand-blue hover:underline font-medium">
                    Editorial Policy
                  </Link>
                  {' '}— how we research, write, and update our content
                </li>
                <li>
                  <Link href="/about/" className="text-thailand-blue hover:underline font-medium">
                    About Us
                  </Link>
                  {' '}— our mission and what we cover
                </li>
                <li>
                  <Link href="/privacy/" className="text-thailand-blue hover:underline font-medium">
                    Privacy Policy
                  </Link>
                  {' '}— how we handle your personal data
                </li>
                <li>
                  <Link href="/contact/" className="text-thailand-blue hover:underline font-medium">
                    Contact
                  </Link>
                  {' '}— questions or concerns about this disclosure
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
