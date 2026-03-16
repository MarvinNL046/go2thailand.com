import Head from 'next/head';
import Link from 'next/link';
import Breadcrumbs from '../components/Breadcrumbs';

export default function ContactPage() {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Contact Us', href: '/contact' }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    mainEntity: {
      '@type': 'Organization',
      name: 'Go2Thailand.com',
      url: 'https://go2-thailand.com',
      logo: 'https://go2-thailand.com/go2thailand-faviocon.webp',
      email: 'hello@go2-thailand.com',
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'hello@go2-thailand.com',
        contactType: 'customer support',
        availableLanguage: ['English', 'Dutch'],
      },
    },
  };

  const helpCards = [
    {
      icon: '&#9888;',
      title: 'Report an Error',
      description: 'Spotted an outdated price, incorrect opening hour, or factual mistake? Let us know and we\'ll fix it promptly.',
      subject: 'Error Report',
    },
    {
      icon: '&#127968;',
      title: 'Suggest a Destination',
      description: 'Know a hidden gem in Thailand that we haven\'t covered yet? We\'d love to hear about it.',
      subject: 'Destination Suggestion',
    },
    {
      icon: '&#129309;',
      title: 'Partnership Inquiries',
      description: 'Interested in working together? We partner with travel brands that align with our values and editorial standards.',
      subject: 'Partnership Inquiry',
    },
    {
      icon: '&#128240;',
      title: 'Media & Press',
      description: 'Journalists and content creators are welcome to reach out for data, quotes, or collaboration on Thailand travel stories.',
      subject: 'Media Inquiry',
    },
  ];

  const quickLinks = [
    { href: '/about/', label: 'About Us' },
    { href: '/editorial-policy/', label: 'Editorial Policy' },
    { href: '/affiliate-disclosure/', label: 'Affiliate Disclosure' },
    { href: '/privacy/', label: 'Privacy Policy' },
    { href: '/terms/', label: 'Terms of Service' },
  ];

  return (
    <>
      <Head>
        <title>Contact Us - Go2Thailand.com</title>
        <meta
          name="description"
          content="Get in touch with Go2Thailand.com. Report errors, suggest destinations, ask about partnerships, or send media inquiries. We typically respond within 48 hours."
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

            {/* Hero */}
            <div className="bg-surface-dark text-white rounded-2xl p-8 md:p-12 mb-8 text-center">
              <p className="font-script text-thailand-gold text-lg mb-2">We&apos;d Love to Hear From You</p>
              <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-4">Contact Us</h1>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Have a question, spotted a mistake, or want to work together? Send us an email — we typically respond within 48 hours.
              </p>
            </div>

            {/* Get in Touch */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">Get in Touch</h2>
              <p className="text-gray-700 mb-6">
                The best way to reach us is by email. We read every message and aim to respond within 48 hours on business days.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 bg-surface-cream rounded-xl">
                <div className="text-3xl">&#9993;</div>
                <div>
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Email us at</div>
                  <a
                    href="mailto:hello@go2-thailand.com"
                    className="text-2xl font-bold text-thailand-blue hover:underline"
                  >
                    hello@go2-thailand.com
                  </a>
                  <p className="text-sm text-gray-500 mt-1">We typically respond within 48 hours.</p>
                </div>
              </div>
            </div>

            {/* What Can We Help With */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-2">What Can We Help With?</h2>
              <p className="text-gray-600 mb-6">
                Not sure what to write? Here are the most common reasons people reach out.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {helpCards.map((card) => (
                  <a
                    key={card.title}
                    href={`mailto:hello@go2-thailand.com?subject=${encodeURIComponent(card.subject)}`}
                    className="block p-5 bg-surface-cream rounded-xl hover:shadow-md transition-all group"
                  >
                    <div
                      className="text-2xl mb-3"
                      dangerouslySetInnerHTML={{ __html: card.icon }}
                    />
                    <h3 className="font-semibold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors mb-1">
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-600">{card.description}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">Quick Links</h2>
              <p className="text-gray-700 mb-5">
                Looking for our policies or more information about how we operate?
              </p>
              <div className="flex flex-wrap gap-3">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex items-center px-4 py-2 bg-surface-cream rounded-lg text-thailand-blue font-medium hover:shadow-md transition-all hover:bg-white border border-transparent hover:border-gray-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
