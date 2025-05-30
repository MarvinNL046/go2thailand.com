import Head from 'next/head';
import Link from 'next/link';
import Breadcrumbs from '../components/Breadcrumbs';

export default function PrivacyPolicy() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Privacy Policy', href: '/privacy' }
  ];

  return (
    <>
      <Head>
        <title>Privacy Policy - Go2Thailand.com</title>
        <meta name="description" content="Privacy Policy for Go2Thailand.com - Learn how we collect, use, and protect your personal information." />
        <meta name="robots" content="noindex, follow" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="container-custom py-12">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
            <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                <p className="mb-4">
                  Welcome to Go2Thailand.com. We respect your privacy and are committed to protecting your personal data. 
                  This privacy policy will inform you about how we look after your personal data when you visit our website.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
                <p className="mb-4">We may collect the following types of information:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Technical data (IP address, browser type, device information)</li>
                  <li>Usage data (how you use our website)</li>
                  <li>Marketing and communications preferences</li>
                  <li>Data collected through cookies and similar technologies</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
                <p className="mb-4">We use your information to:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Provide and improve our travel content and recommendations</li>
                  <li>Personalize your experience on our website</li>
                  <li>Send you relevant travel information (if you've opted in)</li>
                  <li>Analyze website usage to improve our services</li>
                  <li>Display relevant advertisements through our advertising partners</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Advertising Partners</h2>
                <p className="mb-4">
                  We work with advertising partners including Google AdSense and Ezoic to display advertisements on our website. 
                  These partners may use cookies and similar technologies to collect information about your browsing activities 
                  to show you personalized advertisements.
                </p>
                <p className="mb-4">
                  You can learn more about Google's practices at{' '}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">
                    Google Privacy Policy
                  </a>.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Cookies</h2>
                <p className="mb-4">
                  We use cookies and similar tracking technologies to track activity on our website and hold certain information. 
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                </p>
                <p className="mb-4">Types of cookies we use:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li><strong>Essential cookies:</strong> Required for the website to function properly</li>
                  <li><strong>Analytics cookies:</strong> Help us understand how visitors use our website</li>
                  <li><strong>Advertising cookies:</strong> Used to deliver relevant advertisements</li>
                  <li><strong>Preference cookies:</strong> Remember your preferences and settings</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
                <p className="mb-4">Under GDPR and other privacy laws, you have the right to:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate personal data</li>
                  <li>Request deletion of your personal data</li>
                  <li>Object to processing of your personal data</li>
                  <li>Request restriction of processing your personal data</li>
                  <li>Request transfer of your personal data</li>
                  <li>Withdraw consent</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">7. Data Security</h2>
                <p className="mb-4">
                  We have implemented appropriate security measures to prevent your personal data from being accidentally lost, 
                  used, or accessed in an unauthorized way. We limit access to your personal data to those who have a genuine 
                  business need to know it.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">8. Third-Party Links</h2>
                <p className="mb-4">
                  Our website may include links to third-party websites, plug-ins, and applications. Clicking on those links 
                  may allow third parties to collect or share data about you. We do not control these third-party websites 
                  and are not responsible for their privacy statements.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
                <p className="mb-4">
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
                </p>
                <p className="mb-4">
                  Email: info@staycoolairco.nl<br />
                  Website: Go2Thailand.com
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">10. Changes to This Privacy Policy</h2>
                <p className="mb-4">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
                  Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}