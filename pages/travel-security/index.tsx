import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Breadcrumbs from '../../components/Breadcrumbs';
import SEOHead from '../../components/SEOHead';

const REVIEWED_DATE = 'March 25, 2026';
const REVIEWED_DATE_NL = '25 maart 2026';
const AFFILIATE_REL = 'sponsored nofollow noopener noreferrer';

const coreRisks = [
  {
    title: { en: 'Shared networks and travel logins', nl: 'Gedeelde netwerken en reisinloggegevens' },
    description: {
      en: 'Airport, hotel, coworking, and cafe Wi-Fi create more moments where you are signing in, confirming bookings, and moving sensitive travel information between devices.',
      nl: 'Wi-Fi op luchthavens, hotels, coworking en caf\u00e9s cre\u00ebren meer momenten waarop je inlogt, boekingen bevestigt en gevoelige reisinformatie tussen apparaten verplaatst.',
    },
  },
  {
    title: { en: 'Reused passwords across travel accounts', nl: 'Hergebruikte wachtwoorden voor reisaccounts' },
    description: {
      en: 'Travel means airline accounts, booking platforms, bank logins, ride apps, and email. Reused credentials increase the damage if one service is breached.',
      nl: 'Reizen betekent luchtvaartmaatschappij-accounts, boekingsplatforms, bankinloggegevens, ritjes-apps en e-mail. Hergebruikte inloggegevens vergroten de schade als \u00e9\u00e9n dienst wordt gehackt.',
    },
  },
  {
    title: { en: 'Scam sites and rushed logins', nl: 'Nepwebsites en gehaaste logins' },
    description: {
      en: 'A VPN or password manager does not fix a fake website, but the right setup makes it easier to slow down, spot weak security habits, and avoid typing passwords repeatedly.',
      nl: 'Een VPN of wachtwoordbeheerder verhelpt geen nepwebsite, maar de juiste setup maakt het makkelijker om af te remmen, zwakke beveiligingsgewoonten te herkennen en te voorkomen dat je steeds wachtwoorden typt.',
    },
  },
];

const securityLayers = [
  {
    title: 'VPN',
    description: {
      en: 'Useful when you want an extra encrypted layer on unfamiliar Wi-Fi or want to reduce tracking on open networks.',
      nl: 'Nuttig als je een extra versleutelde laag wilt op onbekende Wi-Fi of tracking op open netwerken wilt verminderen.',
    },
    helpsWith: {
      en: 'Network privacy, encrypted traffic, safer public Wi-Fi habits.',
      nl: 'Netwerkprivacy, versleuteld verkeer, veiligere openbare Wi-Fi gewoonten.',
    },
    doesNotDo: {
      en: 'Does not make scam sites trustworthy and does not replace updates, 2FA, or good judgment.',
      nl: 'Maakt nepwebsites niet betrouwbaar en vervangt geen updates, 2FA of gezond verstand.',
    },
  },
  {
    title: { en: 'Password manager', nl: 'Wachtwoordbeheerder' },
    description: {
      en: 'Makes it realistic to use long, unique passwords for every booking, banking, airline, and email account.',
      nl: 'Maakt het realistisch om lange, unieke wachtwoorden te gebruiken voor elke boeking, bank, luchtvaartmaatschappij en e-mailaccount.',
    },
    helpsWith: {
      en: 'Strong unique passwords, autofill, breach monitoring, safer account hygiene.',
      nl: 'Sterke unieke wachtwoorden, automatisch invullen, lekmonitoring, veiligere accounthygi\u00ebne.',
    },
    doesNotDo: {
      en: 'Does not protect you if you hand codes to scammers or approve phishing prompts.',
      nl: 'Beschermt je niet als je codes aan oplichters geeft of phishing-verzoeken goedkeurt.',
    },
  },
  {
    title: { en: 'Two-factor authentication', nl: 'Tweefactorauthenticatie' },
    description: {
      en: 'A second step still matters for important accounts, especially email, banking, and any account that can reset other passwords.',
      nl: 'Een tweede stap is nog steeds belangrijk voor belangrijke accounts, vooral e-mail, bankieren en elk account dat andere wachtwoorden kan resetten.',
    },
    helpsWith: {
      en: 'Account takeover resistance if a password leaks.',
      nl: 'Bescherming tegen accountovername als een wachtwoord lekt.',
    },
    doesNotDo: {
      en: 'Does not fix weak passwords or unsecured devices by itself.',
      nl: 'Verhelpt op zichzelf geen zwakke wachtwoorden of onbeveiligde apparaten.',
    },
  },
  {
    title: { en: 'Basic device hygiene', nl: 'Basale apparaathygi\u00ebne' },
    description: {
      en: 'Keeping apps updated, logging out of shared devices, and checking URLs before signing in are still the highest-leverage habits.',
      nl: 'Apps updaten, uitloggen van gedeelde apparaten en URL\'s controleren voor het inloggen zijn nog steeds de belangrijkste gewoonten.',
    },
    helpsWith: {
      en: 'Everyday travel risk reduction.',
      nl: 'Dagelijkse risicovermindering tijdens reizen.',
    },
    doesNotDo: {
      en: 'It is not a substitute for account-level security tools.',
      nl: 'Het is geen vervanging voor beveiligingstools op accountniveau.',
    },
  },
];

const picks = [
  {
    name: 'NordVPN',
    logo: '/images/partners/nordvpn.svg',
    accent: '#4687FF',
    bestFor: {
      en: 'Travelers who regularly use hotel, airport, or cafe Wi-Fi and want an easy VPN app across multiple devices.',
      nl: 'Reizigers die regelmatig hotel-, luchthaven- of caf\u00e9-Wi-Fi gebruiken en een makkelijke VPN-app willen op meerdere apparaten.',
    },
    summary: {
      en: 'Our current VPN pick for this page because the setup is simple, the device allowance is generous, and the privacy/security feature set is well documented on the official site.',
      nl: 'Onze huidige VPN-keuze voor deze pagina omdat de setup eenvoudig is, het apparaatlimiet ruim is en de privacy/beveiligingsfuncties goed gedocumenteerd zijn op de offici\u00eble site.',
    },
    features: {
      en: [
        'Use on up to 10 devices at the same time.',
        'Threat Protection features are available in the NordVPN ecosystem.',
        'No-logs position and security features are documented publicly by the company.',
        'Useful if you want one VPN account across phone, laptop, and tablet.',
      ],
      nl: [
        'Gebruik op maximaal 10 apparaten tegelijk.',
        'Dreigingsbescherming is beschikbaar in het NordVPN-ecosysteem.',
        'No-logs beleid en beveiligingsfuncties zijn publiek gedocumenteerd door het bedrijf.',
        'Handig als je \u00e9\u00e9n VPN-account wilt voor telefoon, laptop en tablet.',
      ],
    },
    watchouts: {
      en: [
        'A VPN is not a magic shield against phishing or scam booking pages.',
        'Always check the URL and lock icon before entering payment or passport details.',
      ],
      nl: [
        'Een VPN is geen magisch schild tegen phishing of nep-boekingspagina\'s.',
        'Controleer altijd de URL en het slotje voordat je betaal- of paspoortgegevens invoert.',
      ],
    },
    ctaLabel: { en: 'Check current NordVPN plans', nl: 'Bekijk huidige NordVPN abonnementen' },
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
    bestFor: {
      en: 'Travelers who want stronger password hygiene for airline, hotel, banking, and email accounts before a trip.',
      nl: 'Reizigers die sterkere wachtwoordhygi\u00ebne willen voor luchtvaart-, hotel-, bank- en e-mailaccounts voor een reis.',
    },
    summary: {
      en: 'Our current password-manager pick on this page because it makes unique passwords and autofill much easier to maintain, which is one of the most defensible travel-security upgrades for most people.',
      nl: 'Onze huidige wachtwoordbeheerder-keuze op deze pagina omdat het unieke wachtwoorden en automatisch invullen veel makkelijker maakt, wat een van de beste beveiligingsupgrades is voor de meeste reizigers.',
    },
    features: {
      en: [
        'Password Health helps surface weak, reused, and exposed passwords.',
        'Data Breach Scanner and secure sharing are documented official features.',
        'Useful for storing booking logins and reducing repeated password reuse.',
        'Lets you rely less on memory when moving between travel services.',
      ],
      nl: [
        'Wachtwoordgezondheid helpt zwakke, hergebruikte en gelekte wachtwoorden te vinden.',
        'Data Breach Scanner en veilig delen zijn gedocumenteerde offici\u00eble functies.',
        'Handig voor het opslaan van boekingsinloggegevens en het verminderen van wachtwoordhergebruik.',
        'Laat je minder op je geheugen vertrouwen bij het wisselen tussen reisdiensten.',
      ],
    },
    watchouts: {
      en: [
        'A password manager still needs a strong master password and 2FA where available.',
        'It improves account hygiene, but it does not remove the need for cautious browsing.',
      ],
      nl: [
        'Een wachtwoordbeheerder heeft nog steeds een sterk hoofdwachtwoord en 2FA nodig waar beschikbaar.',
        'Het verbetert accounthygi\u00ebne, maar neemt de noodzaak van voorzichtig browsen niet weg.',
      ],
    },
    ctaLabel: { en: 'Check current NordPass plans', nl: 'Bekijk huidige NordPass abonnementen' },
    affiliateLink: 'https://nordvpn.tpo.lv/tp12zNjC',
    sources: [
      { label: 'NordPass Password Health', href: 'https://nordpass.com/features/password-health-report/' },
      { label: 'NordPass support: Password Health', href: 'https://support.nordpass.com/hc/en-us/articles/360012506958-Password-Health' },
      { label: 'NordPass password generator', href: 'https://nordpass.com/password-generator' },
    ],
  },
];

const checklist = {
  en: [
    'Update your phone, laptop, browser, and banking apps before departure.',
    'Turn on two-factor authentication for your email, banking, and main travel accounts.',
    'Use a password manager so booking, airline, and bank logins are not reusing the same password.',
    'Install and test your VPN before you leave, not after a problem happens on the road.',
    'Avoid typing passwords into lookalike booking pages or links from unsolicited messages.',
  ],
  nl: [
    'Update je telefoon, laptop, browser en bank-apps voor vertrek.',
    'Schakel tweefactorauthenticatie in voor je e-mail, bankieren en belangrijkste reisaccounts.',
    'Gebruik een wachtwoordbeheerder zodat boekings-, luchtvaart- en banklogins niet hetzelfde wachtwoord hergebruiken.',
    'Installeer en test je VPN voor vertrek, niet nadat er onderweg een probleem is.',
    'Vermijd het typen van wachtwoorden op nepboekingspagina\'s of links uit ongewenste berichten.',
  ],
};

const faqData = {
  en: [
    {
      question: 'Do I need a VPN for Thailand travel?',
      answer: 'Not every traveler needs one, but it is a reasonable extra layer if you regularly use hotel, airport, or cafe Wi-Fi, or if you want a cleaner separation between your travel browsing and open networks.',
    },
    {
      question: 'Is a password manager more important than a VPN?',
      answer: 'For many people, yes. CISA specifically recommends password managers because they make strong, unique passwords practical across many accounts. A VPN helps on the network side, but reused passwords usually create a bigger long-term risk.',
    },
    {
      question: 'Can a VPN protect me from fake booking or airline websites?',
      answer: 'No. A VPN encrypts traffic, but it does not make a fraudulent site legitimate. You still need to check the URL, use official apps or bookmarks, and avoid rushed logins from messages or search ads.',
    },
    {
      question: 'Should I still use HTTPS and 2FA if I have a VPN?',
      answer: 'Yes. The FTC notes that most websites already use encryption, and account protection still depends on secure sites, software updates, strong passwords, and two-factor authentication where available.',
    },
  ],
  nl: [
    {
      question: 'Heb ik een VPN nodig voor reizen naar Thailand?',
      answer: 'Niet elke reiziger heeft er een nodig, maar het is een redelijke extra laag als je regelmatig hotel-, luchthaven- of caf\u00e9-Wi-Fi gebruikt, of als je een schonere scheiding wilt tussen je reisbrowsing en open netwerken.',
    },
    {
      question: 'Is een wachtwoordbeheerder belangrijker dan een VPN?',
      answer: 'Voor veel mensen wel. CISA beveelt specifiek wachtwoordbeheerders aan omdat ze sterke, unieke wachtwoorden praktisch maken voor veel accounts. Een VPN helpt aan de netwerkkant, maar hergebruikte wachtwoorden cre\u00ebren meestal een groter langetermijnrisico.',
    },
    {
      question: 'Kan een VPN me beschermen tegen nep-boekings- of luchtvaartwebsites?',
      answer: 'Nee. Een VPN versleutelt verkeer, maar maakt een frauduleuze site niet legitiem. Je moet nog steeds de URL controleren, offici\u00eble apps of bladwijzers gebruiken en gehaaste logins vanuit berichten of zoekadvertenties vermijden.',
    },
    {
      question: 'Moet ik nog steeds HTTPS en 2FA gebruiken als ik een VPN heb?',
      answer: 'Ja. De FTC merkt op dat de meeste websites al versleuteling gebruiken, en accountbescherming hangt nog steeds af van veilige sites, software-updates, sterke wachtwoorden en tweefactorauthenticatie waar beschikbaar.',
    },
  ],
};

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
  const siteLogoUrl = 'https://go2-thailand.com/images/brand/go2thailand-logo-2026.png';
  const { locale } = useRouter();
  const isNl = locale === 'nl';

  const t = <T,>(obj: { en: T; nl: T }) => (isNl ? obj.nl : obj.en);
  const ts = (obj: string | { en: string; nl: string }) =>
    typeof obj === 'string' ? obj : isNl ? obj.nl : obj.en;

  const currentFaqs = isNl ? faqData.nl : faqData.en;
  const currentChecklist = isNl ? checklist.nl : checklist.en;
  const reviewedDate = isNl ? REVIEWED_DATE_NL : REVIEWED_DATE;

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isNl ? 'Thailand Reis Beveiligingsgids' : 'Thailand Travel Security Guide',
    description: isNl
      ? 'Een praktische Thailand reis beveiligingsgids over openbare Wi-Fi, wachtwoordhygi\u00ebne, 2FA en onze huidige VPN/wachtwoordbeheerder keuzes met bronnen en affiliate-verklaring.'
      : 'A practical Thailand travel security guide covering public Wi-Fi, password hygiene, 2FA, and our current VPN/password-manager picks with sources and affiliate disclosure.',
    dateModified: '2026-03-25',
    datePublished: '2026-03-25',
    inLanguage: isNl ? 'nl' : 'en',
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
        url: siteLogoUrl,
      },
    },
    mainEntityOfPage: 'https://go2-thailand.com/travel-security/',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: currentFaqs.map((item) => ({
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
        title={isNl
          ? 'Thailand Reis Beveiligingsgids 2026 | VPN, Wachtwoordbeheerders & Veiliger Wi-Fi'
          : 'Thailand Travel Security Guide 2026 | VPN, Password Managers & Safer Wi-Fi'}
        description={isNl
          ? 'Een praktische Thailand reis beveiligingsgids over openbare Wi-Fi, wachtwoordhygi\u00ebne, 2FA en onze huidige VPN/wachtwoordbeheerder keuzes met bronnen en affiliate-verklaring.'
          : 'A practical Thailand travel security guide covering public Wi-Fi, password hygiene, 2FA, and our current VPN/password-manager picks with sources and affiliate disclosure.'}
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
              <p className="font-script text-thailand-gold mb-2">{isNl ? 'Digitale Veiligheid' : 'Digital Safety'}</p>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
                {isNl ? 'Thailand Reis Beveiligingsgids' : 'Thailand Travel Security Guide'}
              </h1>
              <p className="text-xl lg:text-2xl mb-8 opacity-90">
                {isNl
                  ? 'Een betrouwbare gids voor veiligere openbare Wi-Fi gewoonten, sterkere reisinloggegevens en de tools die echt helpen wanneer je beweegt tussen luchthavens, hotels, coworking-ruimtes en caf\u00e9netwerken.'
                  : 'A trust-first guide to safer public Wi-Fi habits, stronger travel logins, and the tools that actually help when you are moving between airports, hotels, coworking spaces, and cafe networks.'}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">
                  {isNl ? 'Openbare Wi-Fi gewoonten' : 'Public Wi-Fi habits'}
                </div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">
                  {isNl ? 'Wachtwoordhygi\u00ebne' : 'Password hygiene'}
                </div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">
                  {isNl ? 'Duidelijke affiliate-verklaring' : 'Clear affiliate disclosure'}
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
                { name: isNl ? 'Reis Veiligheid' : 'Travel Security', href: '/travel-security' },
              ]}
            />
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-[1.6fr,1fr] gap-4">
              <div className="rounded-2xl bg-orange-50 p-5">
                <p className="text-sm font-semibold text-orange-900 mb-2">{isNl ? 'Affiliate-verklaring' : 'Affiliate disclosure'}</p>
                <p className="text-sm text-orange-800">
                  {isNl
                    ? 'Deze pagina bevat affiliate links. We kunnen een commissie verdienen zonder extra kosten voor jou als je koopt via onze links. Onze selectiecriteria worden hieronder en in onze '
                    : 'This page contains affiliate links. We may earn a commission at no extra cost to you if you buy through our links. Our selection criteria are explained below and in our '}
                  <Link href="/affiliate-disclosure/" className="font-semibold underline underline-offset-2">
                    {isNl ? 'affiliate-verklaring' : 'affiliate disclosure'}
                  </Link>
                  {isNl ? ' uitgelegd.' : '.'}
                </p>
              </div>
              <div className="rounded-2xl bg-thailand-blue-50 p-5">
                <p className="text-sm font-semibold text-thailand-blue-900 mb-2">{isNl ? 'Redactionele review' : 'Editorial review'}</p>
                <p className="text-sm text-thailand-blue-900">
                  {isNl ? 'Laatst beoordeeld: ' : 'Last reviewed: '}<strong>{reviewedDate}</strong>
                </p>
                <p className="mt-2 text-sm text-thailand-blue-800">
                  {isNl
                    ? 'Beoordeeld door '
                    : 'Reviewed by '}<strong>Go2Thailand Editorial Team</strong>{isNl
                    ? '. We hebben offici\u00eble productpagina\'s en algemene cyberbeveiligingsrichtlijnen gecontroleerd voordat we hier iets aanbevelen.'
                    : '. We checked official product pages and general cybersecurity guidance before recommending anything here.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white section-padding">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <p className="section-label text-center">{isNl ? 'Waarom Het Belangrijk Is' : 'Why It Matters'}</p>
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4 text-center">
                {isNl
                  ? 'Het reisrisico is meestal account-wildgroei, niet Thailand zelf'
                  : 'The travel risk is usually account sprawl, not Thailand itself'}
              </h2>
              <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
                {isNl
                  ? 'Thailand is makkelijk om in te reizen, maar reizen cre\u00ebert meer inlogmomenten, meer betalingsstromen en meer momenten waarop je afhankelijk bent van onbekende netwerken. Daarom richt deze pagina zich op realistische reizigersgewoonten in plaats van angsttactieken.'
                  : 'Thailand is easy to travel, but trips create more sign-ins, more payment flows, and more moments where you are relying on unfamiliar networks. That is why this page focuses on realistic traveler habits instead of scare tactics.'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {coreRisks.map((item) => (
                  <div key={t(item.title)} className="rounded-2xl bg-surface-cream p-6 shadow-md">
                    <h3 className="font-semibold font-heading text-gray-900 mb-3">{t(item.title)}</h3>
                    <p className="text-sm text-gray-600 leading-6">{t(item.description)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            <p className="section-label text-center">{isNl ? 'Wat Echt Helpt' : 'What Actually Helps'}</p>
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
              {isNl ? 'Denk in lagen, niet in \u00e9\u00e9n wonderproduct' : 'Think in layers, not in one magic product'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {securityLayers.map((item) => (
                <div key={ts(item.title)} className="rounded-2xl bg-white p-6 shadow-md">
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">{ts(item.title)}</h3>
                  <p className="text-gray-600 mb-4">{t(item.description)}</p>
                  <div className="space-y-3 text-sm">
                    <div className="rounded-xl bg-green-50 p-4">
                      <p className="font-semibold text-green-800 mb-1">{isNl ? 'Waar het mee helpt' : 'What it helps with'}</p>
                      <p className="text-green-900">{t(item.helpsWith)}</p>
                    </div>
                    <div className="rounded-xl bg-orange-50 p-4">
                      <p className="font-semibold text-orange-800 mb-1">{isNl ? 'Wat het niet oplost' : 'What it does not solve'}</p>
                      <p className="text-orange-900">{t(item.doesNotDo)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white section-padding">
          <div className="container-custom">
            <p className="section-label text-center">{isNl ? 'Huidige Keuzes' : 'Current Picks'}</p>
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4 text-center">
              {isNl ? 'Onze huidige keuzes voor deze pagina' : 'Our current picks for this page'}
            </h2>
            <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
              {isNl
                ? 'Dit zijn niet de enige tools die kunnen werken. Het zijn de twee producten die we momenteel uitlichten omdat ze het beste aansluiten bij het doel van deze pagina: veiliger reisbrowsing en betere accounthygi\u00ebne.'
                : 'These are not the only tools that can work. They are the two products we currently feature because they line up best with this page\u0027s use case: safer travel browsing and better account hygiene.'}
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
                      {isNl ? 'Beste voor: ' : 'Best for: '}{t(pick.bestFor)}
                    </div>
                    <p className="text-gray-600 mb-6">{t(pick.summary)}</p>
                    <div className="grid grid-cols-1 gap-4 mb-6">
                      <div className="rounded-xl bg-thailand-blue-50 p-4">
                        <h3 className="font-semibold font-heading text-thailand-blue-900 mb-3">
                          {isNl ? 'Waarom het op deze pagina staat' : 'Why it made the page'}
                        </h3>
                        <ul className="space-y-2 text-sm text-thailand-blue-900">
                          {t(pick.features).map((feature) => (
                            <li key={feature} className="flex items-start">
                              <span className="mr-2 text-green-600">\u2713</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-xl bg-orange-50 p-4">
                        <h3 className="font-semibold font-heading text-orange-900 mb-3">
                          {isNl ? 'Waar je rekening mee moet houden' : 'What to keep in mind'}
                        </h3>
                        <ul className="space-y-2 text-sm text-orange-900">
                          {t(pick.watchouts).map((item) => (
                            <li key={item} className="flex items-start">
                              <span className="mr-2 text-orange-700">&bull;</span>
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
                        {t(pick.ctaLabel)} \u2192
                      </a>
                      <div className="text-sm text-gray-500">
                        {isNl ? 'Affiliate link.' : 'Affiliate link.'}
                      </div>
                    </div>
                    <div className="mt-6 border-t border-gray-200 pt-5">
                      <p className="text-sm font-semibold text-gray-900 mb-3">
                        {isNl ? 'Offici\u00eble bronnen gecontroleerd tijdens review' : 'Official sources checked during review'}
                      </p>
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
              <p className="font-script text-thailand-gold mb-2 text-center">{isNl ? 'Checklist' : 'Checklist'}</p>
              <h2 className="text-3xl font-bold font-heading mb-6 text-center">
                {isNl ? 'Beveiligingschecklist voor vertrek' : 'Pre-trip security checklist'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentChecklist.map((item) => (
                  <div key={item} className="rounded-xl bg-white/10 p-4 text-sm leading-6">
                    <span className="mr-2 text-thailand-gold">\u2713</span>
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
              <p className="section-label">{isNl ? 'Context' : 'Context'}</p>
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">
                {isNl ? 'Wanneer je misschien niet beide tools nodig hebt' : 'When you may not need both tools'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="rounded-xl bg-white p-5">
                  <p className="font-semibold text-gray-900 mb-2">
                    {isNl ? 'Je hebt misschien geen VPN nodig als' : 'You may be fine without a VPN if'}
                  </p>
                  <p className="text-gray-600">
                    {isNl
                      ? 'je voornamelijk je mobiele data gebruikt, je software bijhoudt en al vermijdt om in te loggen op gevoelige accounts via open Wi-Fi. Een VPN is een extra laag, geen vereiste voor elke reiziger.'
                      : 'you mostly use your mobile data, keep your software updated, and already avoid logging into sensitive accounts on open Wi-Fi. A VPN is an extra layer, not a requirement for every traveler.'}
                  </p>
                </div>
                <div className="rounded-xl bg-white p-5">
                  <p className="font-semibold text-gray-900 mb-2">
                    {isNl ? 'Een wachtwoordbeheerder is meestal belangrijker als' : 'A password manager usually matters more if'}
                  </p>
                  <p className="text-gray-600">
                    {isNl
                      ? 'je grotere zwakte hergebruikte wachtwoorden zijn voor e-mail, bankieren, luchtvaart en boekingsinloggegevens. Dat is het meest voorkomende reizigersprobleem, daarom behandelt deze pagina accounthygi\u00ebne als de hogere prioriteit.'
                      : 'your bigger weakness is reused passwords across email, banking, airline, and booking logins. That is the more common traveler problem, which is why this page treats account hygiene as the higher-priority baseline.'}
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
                {isNl ? 'Veelgestelde Vragen' : 'Frequently Asked Questions'}
              </h2>
              <div className="space-y-6">
                {currentFaqs.map((item) => (
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
              <p className="section-label">{isNl ? 'Bronnen' : 'Sources'}</p>
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">
                {isNl ? 'Bronnen, methodologie en transparantie' : 'Sources, methodology, and transparency'}
              </h2>
              <p className="text-gray-600 mb-6">
                {isNl
                  ? <>Deze pagina is beoordeeld op <strong>{reviewedDate}</strong>. We hebben primaire bronnen voor productmogelijkheden en openbare cyberbeveiligingsrichtlijnen geprioriteerd. We linken ook naar onze redactionele normen en affiliate-verklaring zodat lezers kunnen zien hoe commerci\u00eble relaties worden afgehandeld.</>
                  : <>This page was reviewed on <strong>{reviewedDate}</strong>. We prioritized primary sources for product capabilities and public-interest cybersecurity guidance for the non-commercial advice. We also link to our editorial standards and affiliate disclosure so readers can see how commercial relationships are handled.</>}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="rounded-2xl bg-thailand-blue-50 p-5">
                  <p className="font-semibold text-thailand-blue-900 mb-2">{isNl ? 'Redactionele review' : 'Editorial review'}</p>
                  <p className="text-sm text-thailand-blue-900 mb-3">
                    {isNl ? 'Beoordeeld door ' : 'Reviewed by '}<strong>Go2Thailand Editorial Team</strong>{isNl ? ' op ' : ' on '}<strong>{reviewedDate}</strong>.
                  </p>
                  <p className="font-semibold text-thailand-blue-900 mb-2">
                    {isNl ? 'Hoe we de keuzes hebben gemaakt' : 'How we chose the picks'}
                  </p>
                  <ul className="space-y-2 text-sm text-thailand-blue-900">
                    <li>{isNl ? 'We zochten tools die een echt reizigersprobleem oplossen, niet alleen een marketinghoek.' : 'We looked for tools that solve a real traveler problem, not just a marketing angle.'}</li>
                    <li>{isNl ? 'We gaven de voorkeur aan gedocumenteerde functies boven vage review-site claims.' : 'We favored documented features over vague review-site claims.'}</li>
                    <li>{isNl ? 'We hielden de pagina eerlijk over waar een VPN helpt en waar niet.' : 'We kept the page honest about where a VPN helps and where it does not.'}</li>
                  </ul>
                </div>
                <div className="rounded-2xl bg-orange-50 p-5">
                  <p className="font-semibold text-orange-900 mb-2">{isNl ? 'Beleidslinks' : 'Policy links'}</p>
                  <div className="space-y-2 text-sm">
                    <Link href="/editorial-policy/" className="block text-orange-900 underline underline-offset-2">
                      {isNl ? 'Redactioneel Beleid' : 'Editorial Policy'}
                    </Link>
                    <Link href="/affiliate-disclosure/" className="block text-orange-900 underline underline-offset-2">
                      {isNl ? 'Affiliate-verklaring' : 'Affiliate Disclosure'}
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
            <p className="section-label text-center">{isNl ? 'Gerelateerde Gidsen' : 'Related Guides'}</p>
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
              {isNl ? 'Gerelateerde Thailand voorbereidingsgidsen' : 'Related Thailand prep guides'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  href: '/esim/',
                  title: { en: 'Thailand eSIM guide', nl: 'Thailand eSIM gids' },
                  text: { en: 'Compare travel eSIM options if you want mobile data from day one.', nl: 'Vergelijk reis-eSIM opties als je mobiele data wilt vanaf dag \u00e9\u00e9n.' },
                },
                {
                  href: '/travel-insurance-thailand/',
                  title: { en: 'Travel insurance guide', nl: 'Reisverzekeringsgids' },
                  text: { en: 'A separate guide for medical, cancellation, and baggage cover.', nl: 'Een aparte gids voor medische, annulerings- en bagagedekking.' },
                },
                {
                  href: '/is-thailand-safe/',
                  title: { en: 'Thailand safety guide', nl: 'Thailand veiligheidsgids' },
                  text: { en: 'Scams, transport, and general on-the-ground safety tips.', nl: 'Oplichting, vervoer en algemene veiligheidstips ter plaatse.' },
                },
                {
                  href: '/thailand-for-first-timers/',
                  title: { en: 'First-timer guide', nl: 'Gids voor beginners' },
                  text: { en: 'Practical planning advice for your first trip to Thailand.', nl: 'Praktisch planningsadvies voor je eerste reis naar Thailand.' },
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl bg-surface-cream p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <h3 className="font-semibold font-heading text-gray-900 mb-2">{t(item.title)}</h3>
                  <p className="text-sm text-gray-600">{t(item.text)}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
