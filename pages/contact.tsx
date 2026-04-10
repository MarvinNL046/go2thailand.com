import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Breadcrumbs from '../components/Breadcrumbs';

export default function ContactPage() {
  const siteLogoUrl = 'https://go2-thailand.com/images/brand/go2thailand-logo-2026.png';
  const { locale } = useRouter();
  const isNl = locale === 'nl';

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Neem Contact Op' : 'Contact Us', href: '/contact' }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    mainEntity: {
      '@type': 'Organization',
      name: 'Go2Thailand.com',
      url: 'https://go2-thailand.com',
      logo: siteLogoUrl,
      email: 'hello@go2-thailand.com',
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'hello@go2-thailand.com',
        contactType: 'customer support',
        availableLanguage: ['English', 'Dutch'],
      },
    },
  };

  const helpCards = isNl ? [
    {
      icon: '&#9888;',
      title: 'Meld een Fout',
      description: 'Een verouderde prijs, onjuiste openingstijd of feitelijke fout gezien? Laat het ons weten en we lossen het snel op.',
      subject: 'Foutmelding',
    },
    {
      icon: '&#127968;',
      title: 'Stel een Bestemming Voor',
      description: 'Ken je een verborgen juweeltje in Thailand dat we nog niet behandeld hebben? We horen er graag over.',
      subject: 'Bestemmingssuggestie',
    },
    {
      icon: '&#129309;',
      title: 'Samenwerkingen',
      description: 'Geïnteresseerd in samenwerking? We werken samen met reismerken die aansluiten bij onze waarden en redactionele standaarden.',
      subject: 'Samenwerkingsverzoek',
    },
    {
      icon: '&#128240;',
      title: 'Media & Pers',
      description: 'Journalisten en contentmakers zijn welkom om contact op te nemen voor data, citaten of samenwerking aan Thailand reisverhalen.',
      subject: 'Media-aanvraag',
    },
  ] : [
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

  const quickLinks = isNl ? [
    { href: '/about/', label: 'Over Ons' },
    { href: '/editorial-policy/', label: 'Redactioneel Beleid' },
    { href: '/affiliate-disclosure/', label: 'Affiliate Verklaring' },
    { href: '/privacy/', label: 'Privacybeleid' },
    { href: '/terms/', label: 'Algemene Voorwaarden' },
  ] : [
    { href: '/about/', label: 'About Us' },
    { href: '/editorial-policy/', label: 'Editorial Policy' },
    { href: '/affiliate-disclosure/', label: 'Affiliate Disclosure' },
    { href: '/privacy/', label: 'Privacy Policy' },
    { href: '/terms/', label: 'Terms of Service' },
  ];

  return (
    <>
      <Head>
        <title>{isNl ? 'Neem Contact Op - Go2Thailand.com' : 'Contact Us - Go2Thailand.com'}</title>
        <meta
          name="description"
          content={isNl
            ? 'Neem contact op met Go2Thailand.com. Meld fouten, stel bestemmingen voor, vraag naar samenwerkingen of stuur mediavragen. We reageren doorgaans binnen 48 uur.'
            : 'Get in touch with Go2Thailand.com. Report errors, suggest destinations, ask about partnerships, or send media inquiries. We typically respond within 48 hours.'}
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
              <p className="font-script text-thailand-gold text-lg mb-2">{isNl ? 'We Horen Graag Van Je' : 'We\u0027d Love to Hear From You'}</p>
              <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-4">{isNl ? 'Neem Contact Op' : 'Contact Us'}</h1>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                {isNl
                  ? 'Heb je een vraag, een fout gevonden of wil je samenwerken? Stuur ons een e-mail — we reageren doorgaans binnen 48 uur.'
                  : 'Have a question, spotted a mistake, or want to work together? Send us an email — we typically respond within 48 hours.'}
              </p>
            </div>

            {/* Get in Touch */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">{isNl ? 'Neem Contact Op' : 'Get in Touch'}</h2>
              <p className="text-gray-700 mb-6">
                {isNl
                  ? 'De beste manier om ons te bereiken is per e-mail. We lezen elk bericht en streven ernaar binnen 48 uur te reageren op werkdagen.'
                  : 'The best way to reach us is by email. We read every message and aim to respond within 48 hours on business days.'}
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 bg-surface-cream rounded-xl">
                <div className="text-3xl">&#9993;</div>
                <div>
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">{isNl ? 'E-mail ons op' : 'Email us at'}</div>
                  <a
                    href="mailto:hello@go2-thailand.com"
                    className="text-2xl font-bold text-thailand-blue hover:underline"
                  >
                    hello@go2-thailand.com
                  </a>
                  <p className="text-sm text-gray-500 mt-1">{isNl ? 'We reageren doorgaans binnen 48 uur.' : 'We typically respond within 48 hours.'}</p>
                </div>
              </div>
            </div>

            {/* What Can We Help With */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-2">{isNl ? 'Waarmee Kunnen We Helpen?' : 'What Can We Help With?'}</h2>
              <p className="text-gray-600 mb-6">
                {isNl
                  ? 'Niet zeker wat je moet schrijven? Dit zijn de meest voorkomende redenen waarom mensen contact opnemen.'
                  : 'Not sure what to write? Here are the most common reasons people reach out.'}
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
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">{isNl ? 'Snelle Links' : 'Quick Links'}</h2>
              <p className="text-gray-700 mb-5">
                {isNl
                  ? 'Op zoek naar ons beleid of meer informatie over hoe we werken?'
                  : 'Looking for our policies or more information about how we operate?'}
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
