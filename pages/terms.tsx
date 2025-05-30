import Head from 'next/head';
import Link from 'next/link';
import Breadcrumbs from '../components/Breadcrumbs';

export default function TermsOfService() {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Terms of Service', href: '/terms' }
  ];

  return (
    <>
      <Head>
        <title>Terms of Service - Go2Thailand.com</title>
        <meta name="description" content="Terms of Service for Go2Thailand.com - Read our terms and conditions for using our travel guide website." />
        <meta name="robots" content="noindex, follow" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="container-custom py-12">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
            <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                <p className="mb-4">
                  By accessing and using Go2Thailand.com, you accept and agree to be bound by the terms and provision 
                  of this agreement. If you do not agree to these terms, please do not use our website.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Use of Website</h2>
                <p className="mb-4">
                  Go2Thailand.com provides travel information, guides, and recommendations about Thailand. 
                  This content is for informational purposes only. You may use our website for lawful purposes only.
                </p>
                <p className="mb-4">You agree not to:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Use the website in any way that violates any applicable law or regulation</li>
                  <li>Reproduce, duplicate, copy, or re-sell any part of our website without permission</li>
                  <li>Use any automated system or software to extract data from the website</li>
                  <li>Transmit any viruses or harmful code</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. Content Disclaimer</h2>
                <p className="mb-4">
                  While we strive to provide accurate and up-to-date information, Go2Thailand.com makes no 
                  representations or warranties of any kind about the completeness, accuracy, reliability, 
                  suitability, or availability of the information contained on the website.
                </p>
                <p className="mb-4">
                  Travel information, prices, and availability may change without notice. Always verify 
                  important details with official sources before making travel arrangements.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
                <p className="mb-4">
                  All content on Go2Thailand.com, including text, graphics, logos, images, and software, 
                  is the property of Go2Thailand.com or its content suppliers and is protected by 
                  international copyright laws.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Third-Party Links</h2>
                <p className="mb-4">
                  Our website may contain links to third-party websites or services that are not owned 
                  or controlled by Go2Thailand.com. We have no control over and assume no responsibility 
                  for the content, privacy policies, or practices of any third-party websites.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Advertising</h2>
                <p className="mb-4">
                  Go2Thailand.com displays advertisements through third-party advertising partners including 
                  Google AdSense and Ezoic. These advertisements may use cookies and other tracking technologies. 
                  By using our website, you consent to the display of these advertisements.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
                <p className="mb-4">
                  Go2Thailand.com shall not be liable for any direct, indirect, incidental, special, 
                  consequential, or punitive damages arising out of your access to or use of the website.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">8. Indemnification</h2>
                <p className="mb-4">
                  You agree to indemnify and hold harmless Go2Thailand.com and its affiliates from any 
                  claim or demand made by any third party due to or arising out of your breach of these 
                  Terms of Service or your violation of any law or rights of a third party.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
                <p className="mb-4">
                  We reserve the right to modify or replace these Terms of Service at any time. 
                  If we make material changes, we will notify users by updating the date at the top 
                  of this page. Your continued use of the website after any changes indicates your 
                  acceptance of the new terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">10. Governing Law</h2>
                <p className="mb-4">
                  These Terms of Service shall be governed by and construed in accordance with the laws 
                  of the Netherlands, without regard to its conflict of law provisions.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">11. Contact Information</h2>
                <p className="mb-4">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <p className="mb-4">
                  Email: info@staycoolairco.nl<br />
                  Website: Go2Thailand.com
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}