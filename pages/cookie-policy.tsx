import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Breadcrumbs from '../components/Breadcrumbs';

export default function CookiePolicy() {
  const { locale } = useRouter();
  const isNl = locale === 'nl';

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Cookie Beleid' : 'Cookie Policy', href: '/cookie-policy' }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: isNl ? 'Cookie Beleid - Go2Thailand.com' : 'Cookie Policy - Go2Thailand.com',
    description: isNl
      ? 'Cookie Beleid voor Go2Thailand.com - Leer meer over de cookies die we gebruiken, waarom we ze gebruiken en hoe u uw cookievoorkeuren kunt beheren.'
      : 'Cookie Policy for Go2Thailand.com - Learn about the cookies we use, why we use them, and how you can manage your cookie preferences.',
    url: 'https://go2-thailand.com/cookie-policy',
    publisher: {
      '@type': 'Organization',
      name: 'Go2Thailand.com',
      url: 'https://go2-thailand.com'
    },
    inLanguage: isNl ? 'nl' : 'en'
  };

  return (
    <>
      <Head>
        <title>{isNl ? 'Cookie Beleid - Go2Thailand.com' : 'Cookie Policy - Go2Thailand.com'}</title>
        <meta
          name="description"
          content={isNl
            ? 'Cookie Beleid voor Go2Thailand.com - Leer meer over de cookies die we gebruiken, waarom we ze gebruiken en hoe u uw cookievoorkeuren kunt beheren.'
            : 'Cookie Policy for Go2Thailand.com - Learn about the cookies we use, why we use them, and how you can manage your cookie preferences.'}
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
            <h1 className="text-3xl font-bold font-heading mb-4">{isNl ? 'Cookie Beleid' : 'Cookie Policy'}</h1>
            <p className="text-gray-600 mb-8">{isNl ? 'Laatst bijgewerkt: 16 maart 2026' : 'Last updated: March 16, 2026'}</p>

            <div className="prose prose-lg max-w-none">

              {/* 1. What Are Cookies */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold font-heading mb-4">{isNl ? '1. Wat Zijn Cookies' : '1. What Are Cookies'}</h2>
                <p className="mb-4">
                  {isNl
                    ? 'Cookies zijn kleine tekstbestanden die op uw apparaat (computer, tablet of mobiele telefoon) worden geplaatst wanneer u een website bezoekt. Ze worden veel gebruikt om websites goed te laten werken, de gebruikerservaring te verbeteren en informatie te verstrekken aan de website-eigenaren.'
                    : 'Cookies are small text files that are placed on your device (computer, tablet, or mobile phone) when you visit a website. They are widely used to make websites work properly, to improve user experience, and to provide information to the website owners.'}
                </p>
                <p className="mb-4">
                  {isNl
                    ? 'Cookies bevatten geen informatie die u direct persoonlijk identificeert, maar persoonlijke informatie die wij over u opslaan kan worden gekoppeld aan de informatie die is opgeslagen in en verkregen uit cookies.'
                    : 'Cookies do not contain any information that personally identifies you directly, but personal information that we store about you may be linked to the information stored in and obtained from cookies.'}
                </p>
              </section>

              {/* 2. How We Use Cookies */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold font-heading mb-4">{isNl ? '2. Hoe We Cookies Gebruiken' : '2. How We Use Cookies'}</h2>
                <p className="mb-4">
                  {isNl
                    ? 'Go2Thailand.com gebruikt cookies voor verschillende doeleinden. Hieronder vindt u een gedetailleerd overzicht van elke categorie cookies die we gebruiken en waarom.'
                    : 'Go2Thailand.com uses cookies for several purposes. Below you will find a detailed overview of each category of cookies we use and why.'}
                </p>

                <h3 className="text-xl font-semibold font-heading mb-3 mt-6">{isNl ? 'Essentiële Cookies' : 'Essential Cookies'}</h3>
                <p className="mb-4">
                  {isNl
                    ? 'Deze cookies zijn strikt noodzakelijk voor het functioneren van de website en kunnen niet worden uitgeschakeld in onze systemen. Ze worden meestal alleen ingesteld als reactie op acties die u onderneemt, zoals inloggen of het invullen van formulieren.'
                    : 'These cookies are strictly necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions you make, such as logging in or filling in forms.'}
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>{isNl ? <><strong>Sessiecookies:</strong> Behouden uw sessiestatus terwijl u tussen pagina&apos;s navigeert.</> : <><strong>Session cookies:</strong> Maintain your session state as you navigate between pages.</>}</li>
                  <li>{isNl ? <><strong>Beveiligingscookies:</strong> Helpen beschermen tegen cross-site request forgery (CSRF) en andere beveiligingsbedreigingen.</> : <><strong>Security cookies:</strong> Help protect against cross-site request forgery (CSRF) and other security threats.</>}</li>
                  <li>{isNl ? <><strong>Load-balancing cookies:</strong> Zorgen ervoor dat verzoeken efficiënt over onze servers worden verdeeld.</> : <><strong>Load-balancing cookies:</strong> Ensure requests are distributed efficiently across our servers.</>}</li>
                </ul>

                <h3 className="text-xl font-semibold font-heading mb-3 mt-6">{isNl ? 'Analytische Cookies' : 'Analytics Cookies'}</h3>
                <p className="mb-4">
                  {isNl
                    ? 'Deze cookies stellen ons in staat bezoeken te tellen en te begrijpen hoe bezoekers zich door de website bewegen. Alle verzamelde informatie is geaggregeerd en daarom anoniem.'
                    : 'These cookies allow us to count visits and understand how visitors move around the website. All information collected is aggregated and therefore anonymous.'}
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>
                    {isNl
                      ? <><strong>Google Analytics:</strong> We gebruiken Google Analytics om bezoekersgedrag te begrijpen — welke pagina&apos;s het populairst zijn, hoe lang bezoekers blijven en waar ze vandaan komen. Dit helpt ons onze Thailand reisinhoud te verbeteren. Google Analytics plaatst cookies zoals <code>_ga</code>, <code>_gid</code> en <code>_gat</code>. U kunt zich afmelden via{' '}<a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">Google Analytics Opt-out</a>.</>
                      : <><strong>Google Analytics:</strong> We use Google Analytics to understand visitor behavior — which pages are most popular, how long visitors stay, and where they come from. This helps us improve our Thailand travel content. Google Analytics sets cookies such as <code>_ga</code>, <code>_gid</code>, and <code>_gat</code>. You can opt out via{' '}<a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">Google Analytics Opt-out</a>.</>}
                  </li>
                </ul>

                <h3 className="text-xl font-semibold font-heading mb-3 mt-6">{isNl ? 'Advertentiecookies' : 'Advertising Cookies'}</h3>
                <p className="mb-4">
                  {isNl
                    ? 'Deze cookies worden geplaatst door onze advertentiepartners om een profiel van uw interesses op te bouwen en u relevante advertenties op andere sites te tonen. Ze zijn gebaseerd op het uniek identificeren van uw browser en apparaat.'
                    : 'These cookies are set by our advertising partners to build a profile of your interests and show you relevant ads on other sites. They are based on uniquely identifying your browser and device.'}
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>
                    {isNl
                      ? <><strong>Google AdSense:</strong> Toont contextuele en gepersonaliseerde advertenties. Google kan cookies zoals <code>IDE</code> en <code>DSID</code> gebruiken om advertenties weer te geven op basis van uw eerdere bezoeken. Meer informatie op{' '}<a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">Google Ads beleid</a>.</>
                      : <><strong>Google AdSense:</strong> Displays contextual and personalized ads. Google may use cookies such as <code>IDE</code> and <code>DSID</code> to serve ads based on your prior visits. Learn more at{' '}<a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">Google Ads policies</a>.</>}
                  </li>
                  <li>
                    {isNl
                      ? <><strong>Ezoic:</strong> We gebruiken Ezoic om advertentielevering en siteprestaties te optimaliseren. Ezoic en haar technologiepartners kunnen cookies plaatsen om advertenties te personaliseren en advertentieprestaties te meten. Zie{' '}<a href="http://g.ezoic.net/privacy/go2-thailand.com" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">Ezoic&apos;s privacyverklaringen voor Go2Thailand.com</a>.</>
                      : <><strong>Ezoic:</strong> We use Ezoic to optimize ad delivery and site performance. Ezoic and its technology partners may set cookies to personalize ads and measure ad performance. See{' '}<a href="http://g.ezoic.net/privacy/go2-thailand.com" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">Ezoic&apos;s privacy disclosures for Go2Thailand.com</a>.</>}
                  </li>
                </ul>

                <h3 className="text-xl font-semibold font-heading mb-3 mt-6">{isNl ? 'Voorkeurscookies' : 'Preference Cookies'}</h3>
                <p className="mb-4">
                  {isNl
                    ? 'Deze cookies stellen de website in staat keuzes die u maakt te onthouden om verbeterde, meer gepersonaliseerde functies te bieden.'
                    : 'These cookies allow the website to remember choices you make to provide enhanced, more personalized features.'}
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>{isNl ? <><strong>Taalvoorkeur:</strong> Onthoudt uw geselecteerde taal (Engels, Nederlands, Thai, etc.) zodat u deze niet bij elk bezoek opnieuw hoeft te selecteren.</> : <><strong>Language preference:</strong> Remembers your selected language (English, Dutch, Thai, etc.) so you do not have to re-select it on every visit.</>}</li>
                  <li>{isNl ? <><strong>Thema-/weergavevoorkeuren:</strong> Slaat eventuele weergave-instellingen op die u heeft gekozen.</> : <><strong>Theme/display preferences:</strong> Stores any display settings you have chosen.</>}</li>
                  <li>{isNl ? <><strong>Pushmeldingsstatus:</strong> Onthoudt of u zich heeft aangemeld voor of onze pushmeldingsbanner heeft gesloten.</> : <><strong>Push notification status:</strong> Remembers whether you have opted in to or dismissed our push notification banner.</>}</li>
                </ul>
              </section>

              {/* 3. Third-Party Cookies */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold font-heading mb-4">{isNl ? '3. Cookies van Derden' : '3. Third-Party Cookies'}</h2>
                <p className="mb-4">
                  {isNl
                    ? 'Naast onze eigen cookies kunnen verschillende diensten van derden die op deze site zijn ingebed ook cookies op uw apparaat plaatsen. Wij hebben geen controle over deze cookies van derden en ze vallen onder het privacybeleid van de betreffende partijen.'
                    : 'In addition to our own cookies, several third-party services embedded on this site may also set cookies on your device. We do not control these third-party cookies, and they are governed by the privacy policies of the respective parties.'}
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
                      {isNl ? 'Google Privacybeleid' : 'Google Privacy Policy'}
                    </a>
                  </li>
                  <li>
                    <strong>Ezoic</strong> ({isNl ? 'advertentie-optimalisatie, A/B-testen' : 'ad optimization, A/B testing'}) &mdash;{' '}
                    <a
                      href="https://www.ezoic.com/privacy-policy/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-thailand-blue hover:underline"
                    >
                      {isNl ? 'Ezoic Privacybeleid' : 'Ezoic Privacy Policy'}
                    </a>
                  </li>
                  <li>
                    <strong>Travelpayouts / {isNl ? 'affiliate partners' : 'affiliate partners'}</strong> (Booking.com, Klook, GetYourGuide, Trip.com,
                    12Go, Viator) &mdash; {isNl
                      ? 'Wanneer u op een affiliate link klikt, kan de betreffende partner trackingcookies op uw apparaat plaatsen om een eventuele aankoop aan onze verwijzing toe te schrijven. Deze cookies verlopen doorgaans binnen 30-90 dagen.'
                      : 'When you click on an affiliate link, the respective partner may set tracking cookies on your device to attribute any resulting purchase to our referral. These cookies are typically named after the partner and expire within 30\u201390 days.'}
                  </li>
                  <li>
                    <strong>Saily / NordVPN / SafetyWing</strong> &mdash; {isNl
                      ? 'Affiliate trackingcookies kunnen worden geplaatst wanneer u via onze site naar deze partners doorklikt.'
                      : 'Affiliate tracking cookies may be set when you click through to these partners from our site.'}
                  </li>
                </ul>
              </section>

              {/* 4. Managing Cookies */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold font-heading mb-4">{isNl ? '4. Cookies Beheren' : '4. Managing Cookies'}</h2>
                <p className="mb-4">
                  {isNl
                    ? 'U heeft het recht om te beslissen of u cookies accepteert of weigert. U kunt uw cookievoorkeuren uitoefenen door de instellingen in uw webbrowser aan te passen. De meeste browsers staan u toe om:'
                    : 'You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by adjusting the settings in your web browser. Most browsers allow you to:'}
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>{isNl ? 'Te bekijken welke cookies zijn opgeslagen en ze individueel te verwijderen.' : 'View which cookies are stored and delete them individually.'}</li>
                  <li>{isNl ? 'Cookies van derden te blokkeren.' : 'Block third-party cookies.'}</li>
                  <li>{isNl ? 'Cookies van specifieke sites te blokkeren.' : 'Block cookies from specific sites.'}</li>
                  <li>{isNl ? 'Alle cookies te blokkeren.' : 'Block all cookies from being set.'}</li>
                  <li>{isNl ? 'Alle cookies te verwijderen wanneer u uw browser sluit.' : 'Delete all cookies when you close your browser.'}</li>
                </ul>
                <p className="mb-4">
                  {isNl ? 'Handleiding voor de meest gebruikte browsers:' : 'Guidance for the most common browsers:'}
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
                  {isNl
                    ? 'Houd er rekening mee dat het uitschakelen van cookies de functionaliteit van deze en vele andere websites die u bezoekt kan beïnvloeden. Het uitschakelen van cookies zal meestal ook bepaalde functionaliteit en functies van deze site uitschakelen. Daarom wordt aanbevolen dat u cookies niet uitschakelt.'
                    : 'Please be aware that disabling cookies may affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of this site. Therefore, it is recommended that you do not disable cookies.'}
                </p>
              </section>

              {/* 5. Your Consent */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold font-heading mb-4">{isNl ? '5. Uw Toestemming' : '5. Your Consent'}</h2>
                <p className="mb-4">
                  {isNl
                    ? 'Door Go2Thailand.com te blijven gebruiken, stemt u in met het plaatsen van cookies op uw apparaat zoals beschreven in dit Cookie Beleid. Essentiële cookies worden automatisch geplaatst omdat ze nodig zijn om de website te laten werken.'
                    : 'By continuing to use Go2Thailand.com, you consent to the placement of cookies on your device as described in this Cookie Policy. Essential cookies are placed automatically as they are required for the website to operate.'}
                </p>
                <p className="mb-4">
                  {isNl
                    ? 'U kunt uw toestemming op elk moment intrekken door de cookies die in uw browser zijn opgeslagen te wissen en uw browserinstellingen aan te passen om toekomstige cookies te weigeren. Let op dat het intrekken van toestemming uw ervaring op deze website kan beïnvloeden, inclusief de mogelijkheid om gepersonaliseerde inhoud te bekijken.'
                    : 'You may withdraw your consent at any time by clearing the cookies stored in your browser and adjusting your browser settings to refuse future cookies. Note that withdrawing consent may affect your experience on this website, including the ability to view personalized content.'}
                </p>
                <p className="mb-4">
                  {isNl
                    ? 'Voor inwoners van de Europese Economische Ruimte (EER) verwerken wij persoonlijke gegevens die via advertentie- en analytische cookies worden verzameld op basis van uw toestemming, in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG). U kunt uw toestemming op elk moment intrekken via uw browserinstellingen.'
                    : 'For residents of the European Economic Area (EEA), we process personal data collected through advertising and analytics cookies on the basis of your consent, in accordance with the General Data Protection Regulation (GDPR). You can withdraw consent at any time via your browser settings.'}
                </p>
              </section>

              {/* 6. Contact Us */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold font-heading mb-4">{isNl ? '6. Neem Contact Op' : '6. Contact Us'}</h2>
                <p className="mb-4">
                  {isNl
                    ? 'Als u vragen heeft over ons gebruik van cookies of dit Cookie Beleid, neem dan contact met ons op:'
                    : 'If you have any questions about our use of cookies or this Cookie Policy, please contact us:'}
                </p>
                <p className="mb-4">
                  Email:{' '}
                  <a href="mailto:hello@go2-thailand.com" className="text-thailand-blue hover:underline">
                    hello@go2-thailand.com
                  </a>
                </p>
                <p className="mb-4">
                  {isNl ? 'De volgende pagina\'s kunnen ook nuttig zijn:' : 'You may also find the following pages helpful:'}
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>
                    <Link href="/privacy" className="text-thailand-blue hover:underline">
                      {isNl ? 'Privacybeleid' : 'Privacy Policy'}
                    </Link>{' '}
                    &mdash; {isNl ? 'hoe we met uw persoonlijke gegevens omgaan' : 'how we handle your personal data'}
                  </li>
                  <li>
                    <Link href="/contact" className="text-thailand-blue hover:underline">
                      {isNl ? 'Neem Contact Op' : 'Contact Us'}
                    </Link>{' '}
                    &mdash; {isNl ? 'neem contact op met ons team' : 'get in touch with our team'}
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
