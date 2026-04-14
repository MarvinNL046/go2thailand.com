import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Breadcrumbs from '../components/Breadcrumbs';
import { useT } from '../lib/i18n';
import { strings as i18nStrings } from '../lib/i18n/privacy';

export default function PrivacyPolicy() {
  const t = useT(i18nStrings);
  const { locale } = useRouter();
  const isNl = locale === 'nl';

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Privacybeleid' : 'Privacy Policy', href: '/privacy' }
  ];

  useEffect(() => {
    // Load Ezoic privacy policy content
    const script = document.createElement('script');
    script.src = 'https://g.ezoic.net/privacy/go2-thailand.com.js';
    script.async = true;

    // Add script to page
    document.body.appendChild(script);

    // Cleanup on unmount
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: isNl ? 'Privacybeleid' : 'Privacy Policy',
    description: isNl
      ? 'Privacybeleid voor Go2Thailand.com - Leer hoe wij uw persoonlijke gegevens verzamelen, gebruiken en beschermen.'
      : 'Privacy Policy for Go2Thailand.com - Learn how we collect, use, and protect your personal information.',
    url: 'https://go2-thailand.com/privacy',
    publisher: {
      '@type': 'Organization',
      name: 'Go2Thailand.com',
      url: 'https://go2-thailand.com',
    },
  };

  return (
    <>
      <Head>
        <title>{isNl ? 'Privacybeleid - Go2Thailand.com' : 'Privacy Policy - Go2Thailand.com'}</title>
        <meta name="description" content={isNl
          ? 'Privacybeleid voor Go2Thailand.com - Leer hoe wij uw persoonlijke gegevens verzamelen, gebruiken en beschermen.'
          : 'Privacy Policy for Go2Thailand.com - Learn how we collect, use, and protect your personal information.'
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
            <h1 className="text-3xl font-bold font-heading mb-8">{isNl ? 'Privacybeleid' : 'Privacy Policy'}</h1>
            <p className="text-gray-600 mb-8">{isNl ? 'Laatst bijgewerkt' : 'Last updated'}: {new Date().toLocaleDateString()}</p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold font-heading mb-4">{isNl ? '1. Inleiding' : '1. Introduction'}</h2>
                <p className="mb-4">
                  {isNl
                    ? 'Welkom bij Go2Thailand.com. Wij respecteren uw privacy en zetten ons in om uw persoonlijke gegevens te beschermen. Dit privacybeleid informeert u over hoe wij voor uw persoonlijke gegevens zorgen wanneer u onze website bezoekt.'
                    : 'Welcome to Go2Thailand.com. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website.'}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold font-heading mb-4">{isNl ? '2. Informatie die We Verzamelen' : '2. Information We Collect'}</h2>
                <p className="mb-4">{isNl ? 'We kunnen de volgende soorten informatie verzamelen:' : 'We may collect the following types of information:'}</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>{isNl ? 'Technische gegevens (IP-adres, browsertype, apparaatinformatie)' : 'Technical data (IP address, browser type, device information)'}</li>
                  <li>{isNl ? 'Gebruiksgegevens (hoe u onze website gebruikt)' : 'Usage data (how you use our website)'}</li>
                  <li>{isNl ? 'Marketing- en communicatievoorkeuren' : 'Marketing and communications preferences'}</li>
                  <li>{isNl ? 'Gegevens verzameld via cookies en vergelijkbare technologieën' : 'Data collected through cookies and similar technologies'}</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold font-heading mb-4">{isNl ? '3. Hoe We Uw Informatie Gebruiken' : '3. How We Use Your Information'}</h2>
                <p className="mb-4">{isNl ? 'We gebruiken uw informatie om:' : 'We use your information to:'}</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>{isNl ? 'Onze reisinhoud en aanbevelingen te bieden en te verbeteren' : 'Provide and improve our travel content and recommendations'}</li>
                  <li>{isNl ? 'Uw ervaring op onze website te personaliseren' : 'Personalize your experience on our website'}</li>
                  <li>{isNl ? 'U relevante reisinformatie te sturen (als u zich heeft aangemeld)' : 'Send you relevant travel information (if you\'ve opted in)'}</li>
                  <li>{isNl ? 'Websitegebruik te analyseren om onze diensten te verbeteren' : 'Analyze website usage to improve our services'}</li>
                  <li>{isNl ? 'Relevante advertenties weer te geven via onze advertentiepartners' : 'Display relevant advertisements through our advertising partners'}</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold font-heading mb-4">{isNl ? '4. Advertentiepartners' : '4. Advertising Partners'}</h2>
                <p className="mb-4">
                  {isNl
                    ? 'We werken samen met advertentiepartners waaronder Google AdSense en Ezoic om advertenties op onze website weer te geven. Deze partners kunnen cookies en vergelijkbare technologieën gebruiken om informatie over uw surfactiviteiten te verzamelen en u gepersonaliseerde advertenties te tonen.'
                    : 'We work with advertising partners including Google AdSense and Ezoic to display advertisements on our website. These partners may use cookies and similar technologies to collect information about your browsing activities to show you personalized advertisements.'}
                </p>
                <p className="mb-4">
                  {isNl
                    ? <>U kunt meer leren over de praktijken van Google op{' '}<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">{t("s001_google_privacybeleid")}</a>.</>
                    : <>You can learn more about Google&apos;s practices at{' '}<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">{t("s002_google_privacy_policy")}</a>.</>}
                </p>

                {/* Ezoic Privacy Policy Embed */}
                <div className="mt-6 p-4 bg-surface-cream rounded-xl">
                  <h3 className="text-lg font-semibold font-heading mb-3">{isNl ? 'Ezoic Privacybeleid' : 'Ezoic Privacy Policy'}</h3>
                  <span id="ezoic-privacy-policy-embed"></span>
                  <div className="mt-3 text-sm text-gray-600">
                    <p>
                      {isNl
                        ? <>Voor gedetailleerde informatie over hoe Ezoic en haar partners gegevens gebruiken, bezoek:{' '}<a href="http://g.ezoic.net/privacy/go2-thailand.com" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">{t("s003_ezoic_privacy_verklaringen_voor")}</a></>
                        : <>For detailed information about how Ezoic and its partners use data, please visit:{' '}<a href="http://g.ezoic.net/privacy/go2-thailand.com" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">{t("s004_ezoic_privacy_disclosures_for")}</a></>}
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold font-heading mb-4">5. Cookies</h2>
                <p className="mb-4">
                  {isNl
                    ? 'We gebruiken cookies en vergelijkbare trackingtechnologieën om activiteit op onze website bij te houden en bepaalde informatie op te slaan. U kunt uw browser instrueren om alle cookies te weigeren of aan te geven wanneer een cookie wordt verzonden.'
                    : 'We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.'}
                </p>
                <p className="mb-4">{isNl ? 'Soorten cookies die we gebruiken:' : 'Types of cookies we use:'}</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>{isNl ? <><strong>Essentiële cookies:</strong> Vereist om de website goed te laten functioneren</> : <><strong>Essential cookies:</strong> Required for the website to function properly</>}</li>
                  <li>{isNl ? <><strong>Analytische cookies:</strong> Helpen ons begrijpen hoe bezoekers onze website gebruiken</> : <><strong>Analytics cookies:</strong> Help us understand how visitors use our website</>}</li>
                  <li>{isNl ? <><strong>Advertentiecookies:</strong> Gebruikt om relevante advertenties weer te geven</> : <><strong>Advertising cookies:</strong> Used to deliver relevant advertisements</>}</li>
                  <li>{isNl ? <><strong>Voorkeurscookies:</strong> Onthouden uw voorkeuren en instellingen</> : <><strong>Preference cookies:</strong> Remember your preferences and settings</>}</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold font-heading mb-4">{isNl ? '6. Uw Rechten' : '6. Your Rights'}</h2>
                <p className="mb-4">{isNl ? 'Onder de AVG en andere privacywetten heeft u het recht om:' : 'Under GDPR and other privacy laws, you have the right to:'}</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>{isNl ? 'Toegang tot uw persoonlijke gegevens' : 'Access your personal data'}</li>
                  <li>{isNl ? 'Onjuiste persoonlijke gegevens te corrigeren' : 'Correct inaccurate personal data'}</li>
                  <li>{isNl ? 'Verwijdering van uw persoonlijke gegevens aan te vragen' : 'Request deletion of your personal data'}</li>
                  <li>{isNl ? 'Bezwaar te maken tegen de verwerking van uw persoonlijke gegevens' : 'Object to processing of your personal data'}</li>
                  <li>{isNl ? 'Beperking van de verwerking van uw persoonlijke gegevens aan te vragen' : 'Request restriction of processing your personal data'}</li>
                  <li>{isNl ? 'Overdracht van uw persoonlijke gegevens aan te vragen' : 'Request transfer of your personal data'}</li>
                  <li>{isNl ? 'Toestemming in te trekken' : 'Withdraw consent'}</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold font-heading mb-4">{isNl ? '7. Gegevensbeveiliging' : '7. Data Security'}</h2>
                <p className="mb-4">
                  {isNl
                    ? 'We hebben passende beveiligingsmaatregelen geïmplementeerd om te voorkomen dat uw persoonlijke gegevens per ongeluk verloren gaan, worden gebruikt of op ongeautoriseerde wijze worden benaderd. We beperken de toegang tot uw persoonlijke gegevens tot degenen die een oprechte zakelijke noodzaak hebben om deze te kennen.'
                    : 'We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way. We limit access to your personal data to those who have a genuine business need to know it.'}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold font-heading mb-4">{isNl ? '8. Links naar Derden' : '8. Third-Party Links'}</h2>
                <p className="mb-4">
                  {isNl
                    ? 'Onze website kan links bevatten naar websites, plug-ins en applicaties van derden. Het klikken op deze links kan derden in staat stellen gegevens over u te verzamelen of te delen. Wij hebben geen controle over deze websites van derden en zijn niet verantwoordelijk voor hun privacyverklaringen.'
                    : 'Our website may include links to third-party websites, plug-ins, and applications. Clicking on those links may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.'}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold font-heading mb-4">{isNl ? '9. Neem Contact Op' : '9. Contact Us'}</h2>
                <p className="mb-4">
                  {isNl
                    ? 'Als u vragen heeft over dit privacybeleid of onze privacypraktijken, neem dan contact met ons op:'
                    : 'If you have any questions about this Privacy Policy or our privacy practices, please contact us at:'}
                </p>
                <p className="mb-4">
                  Email: hello@go2-thailand.com<br />
                  Website: Go2Thailand.com
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold font-heading mb-4">{isNl ? '10. Wijzigingen in dit Privacybeleid' : '10. Changes to This Privacy Policy'}</h2>
                <p className="mb-4">
                  {isNl
                    ? 'We kunnen ons privacybeleid van tijd tot tijd bijwerken. We zullen u op de hoogte stellen van eventuele wijzigingen door het nieuwe privacybeleid op deze pagina te plaatsen en de datum "Laatst bijgewerkt" bij te werken.'
                    : 'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.'}
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
