import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';
import SEOHead from '../../components/SEOHead';

const REVIEWED_DATE = 'March 25, 2026';
const AFFILIATE_REL = 'sponsored nofollow noopener noreferrer';

const coreRisks = [
  {
    title: 'Shared networks and travel logins',
    description:
      'Airport, hotel, coworking, and cafe Wi-Fi create more moments where you are signing in, confirming bookings, and moving sensitive travel information between devices.',
  },
  {
    title: 'Reused passwords across travel accounts',
    description:
      'Travel means airline accounts, booking platforms, bank logins, ride apps, and email. Reused credentials increase the damage if one service is breached.',
  },
  {
    title: 'Scam sites and rushed logins',
    description:
      'A VPN or password manager does not fix a fake website, but the right setup makes it easier to slow down, spot weak security habits, and avoid typing passwords repeatedly.',
  },
];

const securityLayers = [
  {
    title: 'VPN',
    description:
      'Useful when you want an extra encrypted layer on unfamiliar Wi-Fi or want to reduce tracking on open networks.',
    helpsWith: 'Network privacy, encrypted traffic, safer public Wi-Fi habits.',
    doesNotDo: 'Does not make scam sites trustworthy and does not replace updates, 2FA, or good judgment.',
  },
  {
    title: 'Password manager',
    description:
      'Makes it realistic to use long, unique passwords for every booking, banking, airline, and email account.',
    helpsWith: 'Strong unique passwords, autofill, breach monitoring, safer account hygiene.',
    doesNotDo: 'Does not protect you if you hand codes to scammers or approve phishing prompts.',
  },
  {
    title: 'Two-factor authentication',
    description:
      'A second step still matters for important accounts, especially email, banking, and any account that can reset other passwords.',
    helpsWith: 'Account takeover resistance if a password leaks.',
    doesNotDo: 'Does not fix weak passwords or unsecured devices by itself.',
  },
  {
    title: 'Basic device hygiene',
    description:
      'Keeping apps updated, logging out of shared devices, and checking URLs before signing in are still the highest-leverage habits.',
    helpsWith: 'Everyday travel risk reduction.',
    doesNotDo: 'It is not a substitute for account-level security tools.',
  },
];

const picks = [
  {
    name: 'NordVPN',
    logo: '/images/partners/nordvpn.svg',
    accent: '#4687FF',
    bestFor: 'Travelers who regularly use hotel, airport, or cafe Wi-Fi and want an easy VPN app across multiple devices.',
    summary:
      'Our current VPN pick for this page because the setup is simple, the device allowance is generous, and the privacy/security feature set is well documented on the official site.',
    features: [
      'Use on up to 10 devices at the same time.',
      'Threat Protection features are available in the NordVPN ecosystem.',
      'No-logs position and security features are documented publicly by the company.',
      'Useful if you want one VPN account across phone, laptop, and tablet.',
    ],
    watchouts: [
      'A VPN is not a magic shield against phishing or scam booking pages.',
      'Always check the URL and lock icon before entering payment or passport details.',
    ],
    ctaLabel: 'Check current NordVPN plans',
    affiliateLink: 'https://nordvpn.tpo.lv/ekHF1i55',
    sources: [
      { label: 'NordVPN official site', href: 'https://nordvpn.com/' },
      { label: 'NordVPN no-logs overview', href: 'https://nordvpn.com/features/no-logs-vpn/' },
    ],
  },
  {
    name: 'NordPass',
    logo: '/images/partners/nordpass.svg',
    accent: '#00CFB6',
    bestFor: 'Travelers who want stronger password hygiene for airline, hotel, banking, and email accounts before a trip.',
    summary:
      'Our current password-manager pick on this page because it makes unique passwords and autofill much easier to maintain, which is one of the most defensible travel-security upgrades for most people.',
    features: [
      'Password Health helps surface weak, reused, and exposed passwords.',
      'Data Breach Scanner and secure sharing are documented official features.',
      'Useful for storing booking logins and reducing repeated password reuse.',
      'Lets you rely less on memory when moving between travel services.',
    ],
    watchouts: [
      'A password manager still needs a strong master password and 2FA where available.',
      'It improves account hygiene, but it does not remove the need for cautious browsing.',
    ],
    ctaLabel: 'Check current NordPass plans',
    affiliateLink: 'https://nordvpn.tpo.lv/tp12zNjC',
    sources: [
      { label: 'NordPass Password Health', href: 'https://nordpass.com/features/password-health-report/' },
      { label: 'NordPass support: Password Health', href: 'https://support.nordpass.com/hc/en-us/articles/360012506958-Password-Health' },
      { label: 'NordPass password generator', href: 'https://nordpass.com/password-generator' },
    ],
  },
];

const checklist = [
  'Update your phone, laptop, browser, and banking apps before departure.',
  'Turn on two-factor authentication for your email, banking, and main travel accounts.',
  'Use a password manager so booking, airline, and bank logins are not reusing the same password.',
  'Install and test your VPN before you leave, not after a problem happens on the road.',
  'Avoid typing passwords into lookalike booking pages or links from unsolicited messages.',
];

const faqData = [
  {
    question: 'Do I need a VPN for Thailand travel?',
    answer:
      'Not every traveler needs one, but it is a reasonable extra layer if you regularly use hotel, airport, or cafe Wi-Fi, or if you want a cleaner separation between your travel browsing and open networks.',
  },
  {
    question: 'Is a password manager more important than a VPN?',
    answer:
      'For many people, yes. CISA specifically recommends password managers because they make strong, unique passwords practical across many accounts. A VPN helps on the network side, but reused passwords usually create a bigger long-term risk.',
  },
  {
    question: 'Can a VPN protect me from fake booking or airline websites?',
    answer:
      'No. A VPN encrypts traffic, but it does not make a fraudulent site legitimate. You still need to check the URL, use official apps or bookmarks, and avoid rushed logins from messages or search ads.',
  },
  {
    question: 'Should I still use HTTPS and 2FA if I have a VPN?',
    answer:
      'Yes. The FTC notes that most websites already use encryption, and account protection still depends on secure sites, software updates, strong passwords, and two-factor authentication where available.',
  },
];

const sourceLinks = [
  {
    label: 'FTC: Are Public Wi-Fi Networks Safe? What You Need To Know',
    href: 'https://consumer.ftc.gov/articles/are-public-wi-fi-networks-safe-what-you-need-know',
  },
  {
    label: 'CISA: Use Strong Passwords',
    href: 'https://www.cisa.gov/secure-our-world/use-strong-passwords',
  },
  {
    label: 'NordVPN official site',
    href: 'https://nordvpn.com/',
  },
  {
    label: 'NordVPN no-logs overview',
    href: 'https://nordvpn.com/features/no-logs-vpn/',
  },
  {
    label: 'NordPass Password Health',
    href: 'https://nordpass.com/features/password-health-report/',
  },
  {
    label: 'NordPass password generator',
    href: 'https://nordpass.com/password-generator',
  },
];

export default function TravelSecurityPage() {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Thailand Travel Security Guide',
    description:
      'A practical Thailand travel security guide covering public Wi-Fi, password hygiene, 2FA, and our current VPN/password-manager picks with sources and affiliate disclosure.',
    dateModified: '2026-03-25',
    datePublished: '2026-03-25',
    inLanguage: 'en',
    author: {
      '@type': 'Organization',
      name: 'Go2Thailand Editorial Team',
      url: 'https://go2-thailand.com/about/',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Go2Thailand.com',
      url: 'https://go2-thailand.com/',
      logo: {
        '@type': 'ImageObject',
        url: 'https://go2-thailand.com/go2thailand-faviocon.webp',
      },
    },
    mainEntityOfPage: 'https://go2-thailand.com/travel-security/',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <SEOHead
        title="Thailand Travel Security Guide 2026 | VPN, Password Managers & Safer Wi-Fi"
        description="A practical Thailand travel security guide covering public Wi-Fi, password hygiene, 2FA, and our current VPN/password-manager picks with sources and affiliate disclosure."
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        <section className="bg-surface-dark text-white">
          <div className="container-custom py-16">
            <div className="mx-auto max-w-4xl text-center">
              <p className="font-script text-thailand-gold mb-2">Digital Safety</p>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
                Thailand Travel Security Guide
              </h1>
              <p className="text-xl lg:text-2xl mb-8 opacity-90">
                A trust-first guide to safer public Wi-Fi habits, stronger travel logins, and the tools that actually help when you are moving between airports, hotels, coworking spaces, and cafe networks.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">
                  Public Wi-Fi habits
                </div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">
                  Password hygiene
                </div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">
                  Clear affiliate disclosure
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="container-custom py-6">
            <Breadcrumbs
              items={[
                { name: 'Home', href: '/' },
                { name: 'Travel Security', href: '/travel-security' },
              ]}
            />
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-[1.6fr,1fr] gap-4">
              <div className="rounded-2xl bg-orange-50 p-5">
                <p className="text-sm font-semibold text-orange-900 mb-2">Affiliate disclosure</p>
                <p className="text-sm text-orange-800">
                  This page contains affiliate links. We may earn a commission at no extra cost to you if you buy through our links. Our selection criteria are explained below and in our{' '}
                  <Link href="/affiliate-disclosure/" className="font-semibold underline underline-offset-2">
                    affiliate disclosure
                  </Link>
                  .
                </p>
              </div>
              <div className="rounded-2xl bg-thailand-blue-50 p-5">
                <p className="text-sm font-semibold text-thailand-blue-900 mb-2">Editorial review</p>
                <p className="text-sm text-thailand-blue-900">
                  Last reviewed: <strong>{REVIEWED_DATE}</strong>
                </p>
                <p className="mt-2 text-sm text-thailand-blue-800">
                  Reviewed by <strong>Go2Thailand Editorial Team</strong>. We checked official product pages and general cybersecurity guidance before recommending anything here.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white section-padding">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <p className="section-label text-center">Why It Matters</p>
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4 text-center">
                The travel risk is usually account sprawl, not Thailand itself
              </h2>
              <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
                Thailand is easy to travel, but trips create more sign-ins, more payment flows, and more moments where you are relying on unfamiliar networks. That is why this page focuses on realistic traveler habits instead of scare tactics.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {coreRisks.map((item) => (
                  <div key={item.title} className="rounded-2xl bg-surface-cream p-6 shadow-md">
                    <h3 className="font-semibold font-heading text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-6">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            <p className="section-label text-center">What Actually Helps</p>
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
              Think in layers, not in one magic product
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {securityLayers.map((item) => (
                <div key={item.title} className="rounded-2xl bg-white p-6 shadow-md">
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="space-y-3 text-sm">
                    <div className="rounded-xl bg-green-50 p-4">
                      <p className="font-semibold text-green-800 mb-1">What it helps with</p>
                      <p className="text-green-900">{item.helpsWith}</p>
                    </div>
                    <div className="rounded-xl bg-orange-50 p-4">
                      <p className="font-semibold text-orange-800 mb-1">What it does not solve</p>
                      <p className="text-orange-900">{item.doesNotDo}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white section-padding">
          <div className="container-custom">
            <p className="section-label text-center">Current Picks</p>
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4 text-center">
              Our current picks for this page
            </h2>
            <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
              These are not the only tools that can work. They are the two products we currently feature because they line up best with this page&apos;s use case: safer travel browsing and better account hygiene.
            </p>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {picks.map((pick) => (
                <div
                  key={pick.name}
                  className="rounded-2xl bg-white shadow-md overflow-hidden"
                  style={{ borderTop: `4px solid ${pick.accent}` }}
                >
                  <div className="p-8">
                    <div className="relative h-10 w-40 mb-6">
                      <Image
                        src={pick.logo}
                        alt={`${pick.name} logo`}
                        fill
                        className="object-contain object-left"
                      />
                    </div>
                    <div className="inline-flex rounded-full bg-surface-cream px-3 py-1 text-sm font-medium text-gray-700 mb-4">
                      Best for: {pick.bestFor}
                    </div>
                    <p className="text-gray-600 mb-6">{pick.summary}</p>
                    <div className="grid grid-cols-1 gap-4 mb-6">
                      <div className="rounded-xl bg-thailand-blue-50 p-4">
                        <h3 className="font-semibold font-heading text-thailand-blue-900 mb-3">Why it made the page</h3>
                        <ul className="space-y-2 text-sm text-thailand-blue-900">
                          {pick.features.map((feature) => (
                            <li key={feature} className="flex items-start">
                              <span className="mr-2 text-green-600">✓</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-xl bg-orange-50 p-4">
                        <h3 className="font-semibold font-heading text-orange-900 mb-3">What to keep in mind</h3>
                        <ul className="space-y-2 text-sm text-orange-900">
                          {pick.watchouts.map((item) => (
                            <li key={item} className="flex items-start">
                              <span className="mr-2 text-orange-700">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 items-center">
                      <a
                        href={pick.affiliateLink}
                        target="_blank"
                        rel={AFFILIATE_REL}
                        className="inline-flex items-center rounded-xl bg-thailand-blue px-6 py-3 font-semibold text-white transition-colors hover:bg-thailand-blue-dark"
                      >
                        {pick.ctaLabel} →
                      </a>
                      <div className="text-sm text-gray-500">
                        Affiliate link.
                      </div>
                    </div>
                    <div className="mt-6 border-t border-gray-200 pt-5">
                      <p className="text-sm font-semibold text-gray-900 mb-3">Official sources checked during review</p>
                      <div className="flex flex-wrap gap-3">
                        {pick.sources.map((source) => (
                          <span
                            key={source.href}
                            className="rounded-full bg-surface-cream px-3 py-1 text-sm text-gray-700"
                          >
                            {source.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl rounded-2xl bg-surface-dark p-8 text-white">
              <p className="font-script text-thailand-gold mb-2 text-center">Checklist</p>
              <h2 className="text-3xl font-bold font-heading mb-6 text-center">
                Pre-trip security checklist
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {checklist.map((item) => (
                  <div key={item} className="rounded-xl bg-white/10 p-4 text-sm leading-6">
                    <span className="mr-2 text-thailand-gold">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white section-padding">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl rounded-2xl bg-surface-cream p-8 shadow-md">
              <p className="section-label">Context</p>
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">
                When you may not need both tools
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="rounded-xl bg-white p-5">
                  <p className="font-semibold text-gray-900 mb-2">You may be fine without a VPN if</p>
                  <p className="text-gray-600">
                    you mostly use your mobile data, keep your software updated, and already avoid logging into sensitive accounts on open Wi-Fi. A VPN is an extra layer, not a requirement for every traveler.
                  </p>
                </div>
                <div className="rounded-xl bg-white p-5">
                  <p className="font-semibold text-gray-900 mb-2">A password manager usually matters more if</p>
                  <p className="text-gray-600">
                    your bigger weakness is reused passwords across email, banking, airline, and booking logins. That is the more common traveler problem, which is why this page treats account hygiene as the higher-priority baseline.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white section-padding">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl">
              <p className="section-label text-center">FAQ</p>
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {faqData.map((item) => (
                  <div key={item.question} className="rounded-2xl bg-surface-cream p-6 shadow-md">
                    <h3 className="text-lg font-semibold font-heading text-gray-900 mb-2">{item.question}</h3>
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-md">
              <p className="section-label">Sources</p>
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">
                Sources, methodology, and transparency
              </h2>
              <p className="text-gray-600 mb-6">
                This page was reviewed on <strong>{REVIEWED_DATE}</strong>. We prioritized primary sources for product capabilities and public-interest cybersecurity guidance for the non-commercial advice. We also link to our editorial standards and affiliate disclosure so readers can see how commercial relationships are handled.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="rounded-2xl bg-thailand-blue-50 p-5">
                  <p className="font-semibold text-thailand-blue-900 mb-2">Editorial review</p>
                  <p className="text-sm text-thailand-blue-900 mb-3">
                    Reviewed by <strong>Go2Thailand Editorial Team</strong> on <strong>{REVIEWED_DATE}</strong>.
                  </p>
                  <p className="font-semibold text-thailand-blue-900 mb-2">How we chose the picks</p>
                  <ul className="space-y-2 text-sm text-thailand-blue-900">
                    <li>We looked for tools that solve a real traveler problem, not just a marketing angle.</li>
                    <li>We favored documented features over vague review-site claims.</li>
                    <li>We kept the page honest about where a VPN helps and where it does not.</li>
                  </ul>
                </div>
                <div className="rounded-2xl bg-orange-50 p-5">
                  <p className="font-semibold text-orange-900 mb-2">Policy links</p>
                  <div className="space-y-2 text-sm">
                    <Link href="/editorial-policy/" className="block text-orange-900 underline underline-offset-2">
                      Editorial Policy
                    </Link>
                    <Link href="/affiliate-disclosure/" className="block text-orange-900 underline underline-offset-2">
                      Affiliate Disclosure
                    </Link>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sourceLinks.map((source) => (
                  <div
                    key={source.href}
                    className="rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700"
                  >
                    {source.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white section-padding">
          <div className="container-custom">
            <p className="section-label text-center">Related Guides</p>
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
              Related Thailand prep guides
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  href: '/esim/',
                  title: 'Thailand eSIM guide',
                  text: 'Compare travel eSIM options if you want mobile data from day one.',
                },
                {
                  href: '/travel-insurance-thailand/',
                  title: 'Travel insurance guide',
                  text: 'A separate guide for medical, cancellation, and baggage cover.',
                },
                {
                  href: '/is-thailand-safe/',
                  title: 'Thailand safety guide',
                  text: 'Scams, transport, and general on-the-ground safety tips.',
                },
                {
                  href: '/thailand-for-first-timers/',
                  title: 'First-timer guide',
                  text: 'Practical planning advice for your first trip to Thailand.',
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl bg-surface-cream p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <h3 className="font-semibold font-heading text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.text}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
