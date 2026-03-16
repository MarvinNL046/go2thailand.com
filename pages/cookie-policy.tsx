import Head from 'next/head';
import Link from 'next/link';
import Breadcrumbs from '../components/Breadcrumbs';

export default function CookiePolicy() {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Cookie Policy', href: '/cookie-policy' }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Cookie Policy - Go2Thailand.com',
    description:
      'Cookie Policy for Go2Thailand.com - Learn about the cookies we use, why we use them, and how you can manage your cookie preferences.',
    url: 'https://go2-thailand.com/cookie-policy',
    publisher: {
      '@type': 'Organization',
      name: 'Go2Thailand.com',
      url: 'https://go2-thailand.com'
    },
    inLanguage: 'en'
  };

  return (
    <>
      <Head>
        <title>Cookie Policy - Go2Thailand.com</title>
        <meta
          name="description"
          content="Cookie Policy for Go2Thailand.com - Learn about the cookies we use, why we use them, and how you can manage your cookie preferences."
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
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8">
            <h1 className="text-3xl font-bold font-heading mb-4">Cookie Policy</h1>
            <p className="text-gray-600 mb-8">Last updated: March 16, 2026</p>

            <div className="prose prose-lg max-w-none">

              {/* 1. What Are Cookies */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold font-heading mb-4">1. What Are Cookies</h2>
                <p className="mb-4">
                  Cookies are small text files that are placed on your device (computer, tablet, or mobile phone) when
                  you visit a website. They are widely used to make websites work properly, to improve user experience,
                  and to provide information to the website owners.
                </p>
                <p className="mb-4">
                  Cookies do not contain any information that personally identifies you directly, but personal
                  information that we store about you may be linked to the information stored in and obtained from
                  cookies.
                </p>
              </section>

              {/* 2. How We Use Cookies */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold font-heading mb-4">2. How We Use Cookies</h2>
                <p className="mb-4">
                  Go2Thailand.com uses cookies for several purposes. Below you will find a detailed overview of each
                  category of cookies we use and why.
                </p>

                <h3 className="text-xl font-semibold font-heading mb-3 mt-6">Essential Cookies</h3>
                <p className="mb-4">
                  These cookies are strictly necessary for the website to function and cannot be switched off in our
                  systems. They are usually only set in response to actions you make, such as logging in or filling in
                  forms.
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li><strong>Session cookies:</strong> Maintain your session state as you navigate between pages.</li>
                  <li><strong>Security cookies:</strong> Help protect against cross-site request forgery (CSRF) and other security threats.</li>
                  <li><strong>Load-balancing cookies:</strong> Ensure requests are distributed efficiently across our servers.</li>
                </ul>

                <h3 className="text-xl font-semibold font-heading mb-3 mt-6">Analytics Cookies</h3>
                <p className="mb-4">
                  These cookies allow us to count visits and understand how visitors move around the website. All
                  information collected is aggregated and therefore anonymous.
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>
                    <strong>Google Analytics:</strong> We use Google Analytics to understand visitor behavior — which
                    pages are most popular, how long visitors stay, and where they come from. This helps us improve our
                    Thailand travel content. Google Analytics sets cookies such as <code>_ga</code>, <code>_gid</code>,
                    and <code>_gat</code>. You can opt out via{' '}
                    <a
                      href="https://tools.google.com/dlpage/gaoptout"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-thailand-blue hover:underline"
                    >
                      Google Analytics Opt-out
                    </a>.
                  </li>
                </ul>

                <h3 className="text-xl font-semibold font-heading mb-3 mt-6">Advertising Cookies</h3>
                <p className="mb-4">
                  These cookies are set by our advertising partners to build a profile of your interests and show you
                  relevant ads on other sites. They are based on uniquely identifying your browser and device.
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>
                    <strong>Google AdSense:</strong> Displays contextual and personalized ads. Google may use cookies
                    such as <code>IDE</code> and <code>DSID</code> to serve ads based on your prior visits. Learn more
                    at{' '}
                    <a
                      href="https://policies.google.com/technologies/ads"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-thailand-blue hover:underline"
                    >
                      Google Ads policies
                    </a>.
                  </li>
                  <li>
                    <strong>Ezoic:</strong> We use Ezoic to optimize ad delivery and site performance. Ezoic and its
                    technology partners may set cookies to personalize ads and measure ad performance. See{' '}
                    <a
                      href="http://g.ezoic.net/privacy/go2-thailand.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-thailand-blue hover:underline"
                    >
                      Ezoic&apos;s privacy disclosures for Go2Thailand.com
                    </a>.
                  </li>
                </ul>

                <h3 className="text-xl font-semibold font-heading mb-3 mt-6">Preference Cookies</h3>
                <p className="mb-4">
                  These cookies allow the website to remember choices you make to provide enhanced, more personalized
                  features.
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li><strong>Language preference:</strong> Remembers your selected language (English, Dutch, Thai, etc.) so you do not have to re-select it on every visit.</li>
                  <li><strong>Theme/display preferences:</strong> Stores any display settings you have chosen.</li>
                  <li><strong>Push notification status:</strong> Remembers whether you have opted in to or dismissed our push notification banner.</li>
                </ul>
              </section>

              {/* 3. Third-Party Cookies */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold font-heading mb-4">3. Third-Party Cookies</h2>
                <p className="mb-4">
                  In addition to our own cookies, several third-party services embedded on this site may also set
                  cookies on your device. We do not control these third-party cookies, and they are governed by the
                  privacy policies of the respective parties.
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>
                    <strong>Google</strong> (Analytics, AdSense, Maps) &mdash;{' '}
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-thailand-blue hover:underline"
                    >
                      Google Privacy Policy
                    </a>
                  </li>
                  <li>
                    <strong>Ezoic</strong> (ad optimization, A/B testing) &mdash;{' '}
                    <a
                      href="https://www.ezoic.com/privacy-policy/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-thailand-blue hover:underline"
                    >
                      Ezoic Privacy Policy
                    </a>
                  </li>
                  <li>
                    <strong>Travelpayouts / affiliate partners</strong> (Booking.com, Klook, GetYourGuide, Trip.com,
                    12Go, Viator) &mdash; When you click on an affiliate link, the respective partner may set tracking
                    cookies on your device to attribute any resulting purchase to our referral. These cookies are
                    typically named after the partner and expire within 30–90 days.
                  </li>
                  <li>
                    <strong>Saily / NordVPN / SafetyWing</strong> &mdash; Affiliate tracking cookies may be set when
                    you click through to these partners from our site.
                  </li>
                </ul>
              </section>

              {/* 4. Managing Cookies */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold font-heading mb-4">4. Managing Cookies</h2>
                <p className="mb-4">
                  You have the right to decide whether to accept or reject cookies. You can exercise your cookie
                  preferences by adjusting the settings in your web browser. Most browsers allow you to:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>View which cookies are stored and delete them individually.</li>
                  <li>Block third-party cookies.</li>
                  <li>Block cookies from specific sites.</li>
                  <li>Block all cookies from being set.</li>
                  <li>Delete all cookies when you close your browser.</li>
                </ul>
                <p className="mb-4">
                  Guidance for the most common browsers:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>
                    <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">Google Chrome</a>
                  </li>
                  <li>
                    <a href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">Mozilla Firefox</a>
                  </li>
                  <li>
                    <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">Apple Safari</a>
                  </li>
                  <li>
                    <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">Microsoft Edge</a>
                  </li>
                </ul>
                <p className="mb-4">
                  Please be aware that disabling cookies may affect the functionality of this and many other websites
                  that you visit. Disabling cookies will usually result in also disabling certain functionality and
                  features of this site. Therefore, it is recommended that you do not disable cookies.
                </p>
              </section>

              {/* 5. Your Consent */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold font-heading mb-4">5. Your Consent</h2>
                <p className="mb-4">
                  By continuing to use Go2Thailand.com, you consent to the placement of cookies on your device as
                  described in this Cookie Policy. Essential cookies are placed automatically as they are required for
                  the website to operate.
                </p>
                <p className="mb-4">
                  You may withdraw your consent at any time by clearing the cookies stored in your browser and
                  adjusting your browser settings to refuse future cookies. Note that withdrawing consent may affect
                  your experience on this website, including the ability to view personalized content.
                </p>
                <p className="mb-4">
                  For residents of the European Economic Area (EEA), we process personal data collected through
                  advertising and analytics cookies on the basis of your consent, in accordance with the General Data
                  Protection Regulation (GDPR). You can withdraw consent at any time via your browser settings.
                </p>
              </section>

              {/* 6. Contact Us */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold font-heading mb-4">6. Contact Us</h2>
                <p className="mb-4">
                  If you have any questions about our use of cookies or this Cookie Policy, please contact us:
                </p>
                <p className="mb-4">
                  Email:{' '}
                  <a href="mailto:hello@go2-thailand.com" className="text-thailand-blue hover:underline">
                    hello@go2-thailand.com
                  </a>
                </p>
                <p className="mb-4">
                  You may also find the following pages helpful:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>
                    <Link href="/privacy" className="text-thailand-blue hover:underline">
                      Privacy Policy
                    </Link>{' '}
                    &mdash; how we handle your personal data
                  </li>
                  <li>
                    <Link href="/contact" className="text-thailand-blue hover:underline">
                      Contact Us
                    </Link>{' '}
                    &mdash; get in touch with our team
                  </li>
                </ul>
              </section>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
