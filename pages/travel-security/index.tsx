import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '../../components/Breadcrumbs';

export default function TravelSecurityPage() {
  return (
    <>
      <Head>
        <title>VPN & Password Manager for Thailand Travel 2026 | Stay Safe Online</title>
        <meta name="description" content="Protect your online privacy while traveling in Thailand. NordVPN secures public Wi-Fi, NordPass manages your passwords. Essential digital security for travelers." />
        <meta name="keywords" content="Thailand VPN, travel VPN, NordVPN Thailand, password manager travel, NordPass, secure Wi-Fi Thailand, digital security travel" />
      </Head>

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white">
          <div className="container-custom py-16">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Protect Your Digital Life in Thailand
              </h1>
              <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                Public Wi-Fi at airports, hotels, and cafes can expose your data. Stay secure with a VPN and password manager.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">
                  🔒 Encrypt Your Connection
                </div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">
                  🛡️ Protect Passwords
                </div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">
                  🌐 Access Home Content
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <a
                  href="https://nordvpn.tpo.lv/ekHF1i55"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Get NordVPN →
                </a>
                <a
                  href="https://nordvpn.tpo.lv/tp12zNjC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Get NordPass →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="bg-white">
          <div className="container-custom py-6">
            <Breadcrumbs items={[
              { name: 'Home', href: '/' },
              { name: 'Travel Security', href: '/travel-security' }
            ]} />
            <div className="bg-orange-50 border border-orange-200 rounded-lg mt-4">
              <div className="px-4 py-3">
                <p className="text-sm text-center text-orange-800">
                  💡 This page contains affiliate links. We may earn a commission at no extra cost to you when you purchase through our links. 😊
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Digital Security */}
        <section className="bg-white section-padding">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Why Travelers Need Digital Security
              </h2>
              <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
                Every time you connect to airport Wi-Fi, hotel networks, or cafe hotspots in Thailand, your personal data is at risk.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚠️</span>
                  </div>
                  <h3 className="font-semibold mb-2">Public Wi-Fi Risks</h3>
                  <p className="text-gray-600 text-sm">
                    Hackers can intercept your data on unsecured networks at airports, hotels, and cafes. A VPN encrypts everything.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔑</span>
                  </div>
                  <h3 className="font-semibold mb-2">Password Theft</h3>
                  <p className="text-gray-600 text-sm">
                    Using the same password across booking sites, airlines, and hotels? One breach can compromise all your accounts.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🛡️</span>
                  </div>
                  <h3 className="font-semibold mb-2">Identity Protection</h3>
                  <p className="text-gray-600 text-sm">
                    Keep your travel bookings, credit card details, and personal documents safe with end-to-end encryption.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NordVPN Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ borderTop: '4px solid #4687FF' }}>
              <div className="p-8">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1">
                    <div className="relative h-10 w-40 mb-6">
                      <Image
                        src="/images/partners/nordvpn.svg"
                        alt="NordVPN Logo"
                        fill
                        className="object-contain object-left"
                      />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Secure Your Internet Connection in Thailand
                    </h2>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex text-thailand-gold">★★★★★</div>
                      <span className="text-sm text-gray-600">(4.8/5)</span>
                      <span className="inline-block bg-thailand-red text-white px-3 py-1 rounded-full text-sm font-medium ml-2">
                        🔥 Save up to 74%
                      </span>
                    </div>
                    <p className="text-gray-600 mb-6">
                      Protect your online privacy while traveling with NordVPN. Secure public Wi-Fi connections, access content from home, and browse safely from anywhere in Thailand.
                    </p>
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {[
                        '9,000+ servers in 118 countries',
                        'Up to 10 devices simultaneously',
                        'Threat Protection against malware',
                        '30-day money-back guarantee',
                        '24/7 customer support',
                        'No-logs policy (audited)',
                      ].map((feature, i) => (
                        <div key={i} className="flex items-center text-sm text-gray-600">
                          <span className="text-green-500 mr-2">✓</span>
                          {feature}
                        </div>
                      ))}
                    </div>
                    <a
                      href="https://nordvpn.tpo.lv/ekHF1i55"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                    >
                      Get NordVPN — Save up to 74% →
                    </a>
                  </div>
                  <div className="lg:w-80 bg-gray-50 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Perfect for Thailand Travel</h3>
                    <ul className="space-y-3 text-sm text-gray-600">
                      {[
                        'Secure public Wi-Fi at airports & hotels',
                        'Access home content while abroad',
                        'Post-quantum encryption',
                        'Lightning-fast connection speeds',
                        'Built-in ad & tracker blocker',
                        'Works on all devices & platforms',
                      ].map((benefit, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-blue-500 mr-2">✓</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NordPass Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ borderTop: '4px solid #00CFB6' }}>
              <div className="p-8">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1">
                    <div className="relative h-10 w-40 mb-6">
                      <Image
                        src="/images/partners/nordpass.svg"
                        alt="NordPass Logo"
                        fill
                        className="object-contain object-left"
                      />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      All Your Passwords, Secure & Accessible Anywhere
                    </h2>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex text-thailand-gold">★★★★★</div>
                      <span className="text-sm text-gray-600">(4.7/5)</span>
                    </div>
                    <p className="text-gray-600 mb-6">
                      Never forget a password again while traveling. NordPass securely stores and autofills your passwords, credit cards, and personal info across all your devices.
                    </p>
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {[
                        'XChaCha20 encryption',
                        'Zero-knowledge architecture',
                        'Password health reports',
                        'Data breach scanner',
                        'Secure password sharing',
                        'Built-in authenticator',
                      ].map((feature, i) => (
                        <div key={i} className="flex items-center text-sm text-gray-600">
                          <span className="text-green-500 mr-2">✓</span>
                          {feature}
                        </div>
                      ))}
                    </div>
                    <a
                      href="https://nordvpn.tpo.lv/tp12zNjC"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-teal-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors"
                    >
                      Get NordPass →
                    </a>
                  </div>
                  <div className="lg:w-80 bg-gray-50 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Travel Benefits</h3>
                    <ul className="space-y-3 text-sm text-gray-600">
                      {[
                        'Autofill booking & login details instantly',
                        'Store travel documents securely',
                        'Access passwords on any device',
                        'Generate strong unique passwords',
                        'Share credentials safely with travel partners',
                        'Protect against credential theft',
                      ].map((benefit, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-teal-500 mr-2">✓</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bundle Recommendation */}
        <section className="bg-gradient-to-r from-blue-50 to-teal-50 section-padding">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Best Protection: Use Both Together
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              NordVPN encrypts your internet connection while NordPass secures all your passwords. Together, they provide complete digital protection for your Thailand travels. Both are made by Nord Security — protecting over 15 million users worldwide.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://nordvpn.tpo.lv/ekHF1i55"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Get NordVPN →
              </a>
              <a
                href="https://nordvpn.tpo.lv/tp12zNjC"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-teal-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors"
              >
                Get NordPass →
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="font-semibold text-lg mb-2">Why do I need a VPN when traveling in Thailand?</h3>
                  <p className="text-gray-600">
                    When you connect to public Wi-Fi at Thai airports, hotels, or cafes, your data can be intercepted by hackers. A VPN encrypts all your internet traffic, making it unreadable. It also lets you access content from your home country while abroad.
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="font-semibold text-lg mb-2">Is NordVPN easy to use while traveling?</h3>
                  <p className="text-gray-600">
                    Yes! Simply download the app on your phone or laptop, connect with one tap, and you&apos;re protected. NordVPN has 9,000+ servers in 118 countries, including nearby Asian locations for fast connections.
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="font-semibold text-lg mb-2">Why should I use a password manager for travel?</h3>
                  <p className="text-gray-600">
                    Travelers use dozens of accounts — airline bookings, hotel reservations, banking, and more. NordPass generates strong unique passwords for each and autofills them so you never need to type them on unsafe devices.
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="font-semibold text-lg mb-2">Is VPN legal in Thailand?</h3>
                  <p className="text-gray-600">
                    Yes, using a VPN is perfectly legal in Thailand. Many travelers and expats use VPNs daily for privacy, security, and accessing content from their home countries.
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="font-semibold text-lg mb-2">Can I use NordVPN on multiple devices?</h3>
                  <p className="text-gray-600">
                    Yes, one NordVPN account protects up to 10 devices simultaneously — your phone, laptop, tablet, and more. Perfect for travelers with multiple devices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-thailand-gold to-thailand-blue text-white section-padding">
          <div className="container-custom text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Complete Your Thailand Travel Essentials
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Pair your digital security with other travel must-haves
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/esim/" className="bg-white text-thailand-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                eSIM Data Plans
              </Link>
              <Link href="/travel-insurance/" className="bg-white bg-opacity-20 text-white border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-thailand-blue transition-colors">
                Travel Insurance
              </Link>
              <Link href="/city/" className="bg-white bg-opacity-20 text-white border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-thailand-blue transition-colors">
                Explore Cities
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
