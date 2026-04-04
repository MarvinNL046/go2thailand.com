import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Breadcrumbs from '../components/Breadcrumbs';

export default function TermsOfService() {
  const { locale } = useRouter();
  const isNl = locale === 'nl';

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Algemene Voorwaarden' : 'Terms of Service', href: '/terms' }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: isNl ? 'Algemene Voorwaarden' : 'Terms of Service',
    description: isNl
      ? 'Algemene Voorwaarden voor Go2Thailand.com - Lees onze voorwaarden voor het gebruik van onze reisgids website.'
      : 'Terms of Service for Go2Thailand.com - Read our terms and conditions for using our travel guide website.',
    url: 'https://go2-thailand.com/terms',
    publisher: {
      '@type': 'Organization',
      name: 'Go2Thailand.com',
      url: 'https://go2-thailand.com',
    },
  };

  return (
    <>
      <Head>
        <title>{isNl ? 'Algemene Voorwaarden - Go2Thailand.com' : 'Terms of Service - Go2Thailand.com'}</title>
        <meta name="description" content={isNl
          ? 'Algemene Voorwaarden voor Go2Thailand.com - Lees onze voorwaarden voor het gebruik van onze reisgids website.'
          : 'Terms of Service for Go2Thailand.com - Read our terms and conditions for using our travel guide website.'
        } />
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
            <h1 className="text-3xl font-bold font-heading mb-8">{isNl ? 'Algemene Voorwaarden' : 'Terms of Service'}</h1>
            <p className="text-gray-600 mb-8">{isNl ? 'Laatst bijgewerkt' : 'Last updated'}: {new Date().toLocaleDateString()}</p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold font-heading mb-4">{isNl ? '1. Aanvaarding van Voorwaarden' : '1. Acceptance of Terms'}</h2>
                <p className="mb-4">
                  {isNl
                    ? 'Door Go2Thailand.com te bezoeken en te gebruiken, accepteert u en stemt u ermee in gebonden te zijn aan de bepalingen van deze overeenkomst. Als u niet akkoord gaat met deze voorwaarden, gebruik dan onze website niet.'
                    : 'By accessing and using Go2Thailand.com, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our website.'}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold font-heading mb-4">{isNl ? '2. Gebruik van de Website' : '2. Use of Website'}</h2>
                <p className="mb-4">
                  {isNl
                    ? 'Go2Thailand.com biedt reisinformatie, gidsen en aanbevelingen over Thailand. Deze inhoud is uitsluitend bedoeld voor informatieve doeleinden. U mag onze website alleen voor wettige doeleinden gebruiken.'
                    : 'Go2Thailand.com provides travel information, guides, and recommendations about Thailand. This content is for informational purposes only. You may use our website for lawful purposes only.'}
                </p>
                <p className="mb-4">{isNl ? 'U stemt ermee in om niet:' : 'You agree not to:'}</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>{isNl ? 'De website te gebruiken op een manier die in strijd is met toepasselijke wet- of regelgeving' : 'Use the website in any way that violates any applicable law or regulation'}</li>
                  <li>{isNl ? 'Enig deel van onze website te reproduceren, dupliceren, kopiëren of door te verkopen zonder toestemming' : 'Reproduce, duplicate, copy, or re-sell any part of our website without permission'}</li>
                  <li>{isNl ? 'Geautomatiseerde systemen of software te gebruiken om gegevens van de website te extraheren' : 'Use any automated system or software to extract data from the website'}</li>
                  <li>{isNl ? 'Virussen of schadelijke code te verzenden' : 'Transmit any viruses or harmful code'}</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold font-heading mb-4">{isNl ? '3. Disclaimer over Inhoud' : '3. Content Disclaimer'}</h2>
                <p className="mb-4">
                  {isNl
                    ? 'Hoewel we ernaar streven nauwkeurige en actuele informatie te bieden, geeft Go2Thailand.com geen verklaringen of garanties van welke aard dan ook over de volledigheid, nauwkeurigheid, betrouwbaarheid, geschiktheid of beschikbaarheid van de informatie op de website.'
                    : 'While we strive to provide accurate and up-to-date information, Go2Thailand.com makes no representations or warranties of any kind about the completeness, accuracy, reliability, suitability, or availability of the information contained on the website.'}
                </p>
                <p className="mb-4">
                  {isNl
                    ? 'Reisinformatie, prijzen en beschikbaarheid kunnen zonder voorafgaande kennisgeving wijzigen. Controleer altijd belangrijke details bij officiële bronnen voordat u reisarrangementen maakt.'
                    : 'Travel information, prices, and availability may change without notice. Always verify important details with official sources before making travel arrangements.'}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold font-heading mb-4">{isNl ? '4. Intellectueel Eigendom' : '4. Intellectual Property'}</h2>
                <p className="mb-4">
                  {isNl
                    ? 'Alle inhoud op Go2Thailand.com, inclusief tekst, afbeeldingen, logo\'s, afbeeldingen en software, is eigendom van Go2Thailand.com of haar inhoudleveranciers en wordt beschermd door internationale auteursrechtwetten.'
                    : 'All content on Go2Thailand.com, including text, graphics, logos, images, and software, is the property of Go2Thailand.com or its content suppliers and is protected by international copyright laws.'}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold font-heading mb-4">{isNl ? '5. Links naar Derden' : '5. Third-Party Links'}</h2>
                <p className="mb-4">
                  {isNl
                    ? 'Onze website kan links bevatten naar websites of diensten van derden die niet eigendom zijn van of beheerd worden door Go2Thailand.com. Wij hebben geen controle over en nemen geen verantwoordelijkheid voor de inhoud, het privacybeleid of de praktijken van websites van derden.'
                    : 'Our website may contain links to third-party websites or services that are not owned or controlled by Go2Thailand.com. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites.'}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold font-heading mb-4">{isNl ? '6. Advertenties' : '6. Advertising'}</h2>
                <p className="mb-4">
                  {isNl
                    ? 'Go2Thailand.com toont advertenties via externe advertentiepartners waaronder Google AdSense en Ezoic. Deze advertenties kunnen cookies en andere trackingtechnologieën gebruiken. Door onze website te gebruiken, stemt u in met de weergave van deze advertenties.'
                    : 'Go2Thailand.com displays advertisements through third-party advertising partners including Google AdSense and Ezoic. These advertisements may use cookies and other tracking technologies. By using our website, you consent to the display of these advertisements.'}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold font-heading mb-4">{isNl ? '7. Beperking van Aansprakelijkheid' : '7. Limitation of Liability'}</h2>
                <p className="mb-4">
                  {isNl
                    ? 'Go2Thailand.com is niet aansprakelijk voor enige directe, indirecte, incidentele, bijzondere, gevolg- of punitieve schade als gevolg van uw toegang tot of gebruik van de website.'
                    : 'Go2Thailand.com shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of your access to or use of the website.'}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold font-heading mb-4">{isNl ? '8. Vrijwaring' : '8. Indemnification'}</h2>
                <p className="mb-4">
                  {isNl
                    ? 'U stemt ermee in Go2Thailand.com en haar gelieerde ondernemingen te vrijwaren van elke claim of eis van derden als gevolg van of voortvloeiend uit uw schending van deze Algemene Voorwaarden of uw overtreding van enige wet of rechten van derden.'
                    : 'You agree to indemnify and hold harmless Go2Thailand.com and its affiliates from any claim or demand made by any third party due to or arising out of your breach of these Terms of Service or your violation of any law or rights of a third party.'}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold font-heading mb-4">{isNl ? '9. Wijzigingen in Voorwaarden' : '9. Changes to Terms'}</h2>
                <p className="mb-4">
                  {isNl
                    ? 'Wij behouden ons het recht voor deze Algemene Voorwaarden op elk moment te wijzigen of te vervangen. Bij materiële wijzigingen zullen wij gebruikers informeren door de datum bovenaan deze pagina bij te werken. Uw voortgezet gebruik van de website na eventuele wijzigingen geeft aan dat u de nieuwe voorwaarden accepteert.'
                    : 'We reserve the right to modify or replace these Terms of Service at any time. If we make material changes, we will notify users by updating the date at the top of this page. Your continued use of the website after any changes indicates your acceptance of the new terms.'}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold font-heading mb-4">{isNl ? '10. Toepasselijk Recht' : '10. Governing Law'}</h2>
                <p className="mb-4">
                  {isNl
                    ? 'Deze Algemene Voorwaarden worden beheerst door en geïnterpreteerd in overeenstemming met de wetten van Nederland, zonder rekening te houden met conflicterende wettelijke bepalingen.'
                    : 'These Terms of Service shall be governed by and construed in accordance with the laws of the Netherlands, without regard to its conflict of law provisions.'}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold font-heading mb-4">{isNl ? '11. Contactinformatie' : '11. Contact Information'}</h2>
                <p className="mb-4">
                  {isNl
                    ? 'Als u vragen heeft over deze Algemene Voorwaarden, neem dan contact met ons op:'
                    : 'If you have any questions about these Terms of Service, please contact us at:'}
                </p>
                <p className="mb-4">
                  Email: hello@go2-thailand.com<br />
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
