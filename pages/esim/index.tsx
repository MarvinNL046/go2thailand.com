import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Breadcrumbs from '../../components/Breadcrumbs';
import SEOHead from '../../components/SEOHead';
import Image from 'next/image';
import Link from 'next/link';

interface ESIMPlan {
  label: string;
  price: string;
}

interface SourceLink {
  label: string;
  href: string;
}

interface ESIMProvider {
  id: number;
  name: string;
  slug: string;
  logo: string;
  badge: string;
  bestFor: string;
  description: string;
  highlights: string[];
  tradeoffs: string[];
  plans: ESIMPlan[];
  planNote: string;
  ctaLabel: string;
  affiliateLink: string;
  sourceLinks: SourceLink[];
}

interface ESIMPageProps {
  providers: ESIMProvider[];
}

const REVIEWED_DATE = 'March 25, 2026';
const AFFILIATE_REL = 'sponsored nofollow noopener noreferrer';

const comparisonRows = [
  {
    feature: 'Best fit',
    airalo: 'Short trips and travelers who want a widely used marketplace with several Thailand plan shapes.',
    yesim: 'Heavier data use, unlimited-plan shoppers, or travelers who want the app and support layer to be a bigger part of the experience.',
    saily: 'Travelers who want a straightforward data-only eSIM and value built-in privacy features in the app.',
  },
  {
    feature: 'Sample entry plan',
    airalo: '3 days / 1 GB / 4.00 EUR',
    yesim: '1 day / 500 MB / 0.45 EUR',
    saily: '7 days / 1 GB / US$2.99',
  },
  {
    feature: 'Sample longer-stay plan',
    airalo: '30 days / 5 GB / 7.50 EUR',
    yesim: '30 days / 20 GB / 17 EUR',
    saily: '30 days / 5 GB / US$7.99',
  },
  {
    feature: 'Top-up / flexibility',
    airalo: 'Top-ups are available for rechargeable eSIMs.',
    yesim: 'Fixed plans, unlimited plans, and Pay & Fly options exist on the official site.',
    saily: 'Top-ups and auto top-up are available in the app.',
  },
  {
    feature: 'Notable extra',
    airalo: 'Very mature eSIM marketplace with extensive help documentation.',
    yesim: 'Unlimited options, Pay & Fly, and 24/7 support messaging on the official site.',
    saily: 'Built-in privacy features and data-only simplicity.',
  },
];

const methodologyPoints = {
  en: [
    'We checked official provider pages and help centers on March 25, 2026.',
    'We treated the prices on this page as sample plan snapshots, not guaranteed future prices.',
    'We avoided invented ratings and unverified network-speed claims.',
    'We kept Saily in the comparison, but reduced brand-led NordVPN language to what is factually necessary.',
  ],
  nl: [
    'We hebben officiële aanbiederpagina\'s en helpcentra gecontroleerd op 25 maart 2026.',
    'We behandelden de prijzen op deze pagina als voorbeeldprijzen, niet als gegarandeerde toekomstige prijzen.',
    'We vermeden verzonnen beoordelingen en ongecontroleerde netwerksnelheidsclaims.',
    'We hielden Saily in de vergelijking, maar reduceerden merkgerichte NordVPN-taal tot wat feitelijk noodzakelijk is.',
  ],
};

const faqData = [
  {
    question: 'Should I install my Thailand eSIM before I fly?',
    answer:
      'Usually yes. Apple recommends setting up your travel eSIM before you arrive when possible, and providers like Airalo and Yesim also structure their setup flows around pre-installation with Wi-Fi available.',
  },
  {
    question: 'Do I need to remove my physical SIM card?',
    answer:
      'No. On supported phones, an eSIM can usually run alongside your existing SIM. That means you can use the eSIM for data in Thailand while keeping your regular number active for calls or account verification.',
  },
  {
    question: 'Are the prices on this page fixed?',
    answer:
      'No. eSIM promotions and local pricing change often. The plan examples on this page are sample snapshots checked against official provider pages on March 25, 2026, so always verify the live plan before buying.',
  },
  {
    question: 'Is Saily the same thing as NordVPN?',
    answer:
      'No. Saily is an eSIM product from Nord Security, the company behind NordVPN, but it is a separate travel-data product. We mention that relationship once for transparency rather than treating it as the main reason to choose the service.',
  },
];

const globalSources: SourceLink[] = [
  {
    label: 'Apple Support: Use eSIM while traveling internationally with your iPhone',
    href: 'https://support.apple.com/en-us/118227',
  },
  {
    label: 'Airalo Thailand eSIM listing',
    href: 'https://www.airalo.com/thailand-esim/maew-in-7days-1gb',
  },
  {
    label: 'Airalo Help Center',
    href: 'https://www.airalo.com/help',
  },
  {
    label: 'Yesim Thailand eSIM plans',
    href: 'https://yesim.app/country/thailand/',
  },
  {
    label: 'Yesim Help Center',
    href: 'https://help.yesim.tech/yesim-esim-setup/',
  },
  {
    label: 'Saily Thailand eSIM page',
    href: 'https://saily.com/esim-thailand/',
  },
];

export default function ESIMPage({ providers }: ESIMPageProps) {
  const { locale } = useRouter();
  const t = (en: string, nl: string) => locale === 'nl' ? nl : en;

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Best eSIM for Thailand',
    description:
      'A trust-first Thailand eSIM comparison covering Airalo, Yesim, and Saily with sample plan snapshots, installation guidance, affiliate disclosure, and source links.',
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
    mainEntityOfPage: 'https://go2-thailand.com/esim/',
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
        title="Best eSIM for Thailand 2026 | Compare Data Plans, Setup & Travel Fit"
        description="A trust-first Thailand eSIM comparison covering Airalo, Yesim, and Saily with sample plan snapshots, installation guidance, affiliate disclosure, and source links."
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
              <p className="font-script text-thailand-gold mb-2">{t('Stay Connected', 'Blijf Verbonden')}</p>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
                {t('Best eSIM for Thailand', 'Beste eSIM voor Thailand')}
              </h1>
              <p className="text-xl lg:text-2xl mb-8 opacity-90">
                {t(
                  'A practical comparison of Thailand eSIM options, focused on plan shape, installation ease, and travel fit rather than hype.',
                  'Een praktische vergelijking van Thailand eSIM opties, gericht op bundelvorm, installatiegemak en reisgeschiktheid in plaats van hype.'
                )}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">
                  {t(`Sample prices checked ${REVIEWED_DATE}`, `Voorbeeldprijzen gecontroleerd ${REVIEWED_DATE}`)}
                </div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">
                  {t('Data-only and unlimited options', 'Alleen data en onbeperkte opties')}
                </div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">
                  {t('Source links on-page', 'Bronlinks op de pagina')}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="container-custom py-6">
            <Breadcrumbs
              items={[
                { name: t('Home', 'Home'), href: '/' },
                { name: 'Thailand eSIM', href: '/esim' },
              ]}
            />
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-[1.6fr,1fr] gap-4">
              <div className="rounded-2xl bg-orange-50 p-5">
                <p className="text-sm font-semibold text-orange-900 mb-2">{t('Affiliate disclosure', 'Affiliate verklaring')}</p>
                <p className="text-sm text-orange-800">
                  {t(
                    'This page contains affiliate links. We may earn a commission at no extra cost to you if you buy through our links. Our comparison method is explained below and in our',
                    'Deze pagina bevat affiliate links. We kunnen een commissie verdienen zonder extra kosten voor jou als je via onze links koopt. Onze vergelijkingsmethode wordt hieronder uitgelegd en in onze'
                  )}{' '}
                  <Link href="/affiliate-disclosure/" className="font-semibold underline underline-offset-2">
                    {t('affiliate disclosure', 'affiliate verklaring')}
                  </Link>
                  .
                </p>
              </div>
              <div className="rounded-2xl bg-thailand-blue-50 p-5">
                <p className="text-sm font-semibold text-thailand-blue-900 mb-2">{t('Editorial review', 'Redactionele beoordeling')}</p>
                <p className="text-sm text-thailand-blue-900">
                  {t('Last reviewed:', 'Laatst beoordeeld:')} <strong>{REVIEWED_DATE}</strong>
                </p>
                <p className="mt-2 text-sm text-thailand-blue-800">
                  {t(
                    'Reviewed by',
                    'Beoordeeld door'
                  )} <strong>Go2Thailand Editorial Team</strong>. {t(
                    'Prices below are sample plan snapshots from official provider pages and may change.',
                    'Prijzen hieronder zijn voorbeeldprijzen van officiële aanbiederpagina\'s en kunnen wijzigen.'
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white section-padding">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <p className="section-label text-center">{t('Why eSIM', 'Waarom eSIM')}</p>
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4 text-center">
                {t('Why many Thailand travelers prefer eSIM now', 'Waarom veel Thailand reizigers nu eSIM verkiezen')}
              </h2>
              <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
                {t(
                  'eSIM is mainly about convenience: install ahead of time, keep your usual number, and land with data ready for Grab, maps, banking apps, and hotel messages. Apple also notes that an eSIM cannot be physically removed if the phone is lost or stolen.',
                  'eSIM draait vooral om gemak: installeer van tevoren, behoud je gebruikelijke nummer en land met data klaar voor Grab, kaarten, bank-apps en hotelberichten. Apple merkt ook op dat een eSIM niet fysiek verwijderd kan worden als de telefoon verloren of gestolen is.'
                )}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: t('Install before arrival', 'Installeer voor aankomst'),
                    text: t(
                      'You can usually set up the travel eSIM while you still have stable Wi-Fi at home or at the airport.',
                      'Je kunt de reis-eSIM meestal instellen terwijl je nog stabiel Wi-Fi hebt thuis of op het vliegveld.'
                    ),
                  },
                  {
                    title: t('Keep your main number', 'Behoud je hoofdnummer'),
                    text: t(
                      'On supported phones, your home SIM and travel eSIM can often stay active together.',
                      'Op ondersteunde telefoons kunnen je thuis-SIM en reis-eSIM vaak samen actief blijven.'
                    ),
                  },
                  {
                    title: t('Avoid airport SIM friction', 'Vermijd SIM-gedoe op het vliegveld'),
                    text: t(
                      'You skip kiosk queues, physical SIM swaps, and the risk of misplacing your home SIM card.',
                      'Je slaat kiosk-wachtrijen, fysieke SIM-wissels en het risico van het kwijtraken van je thuis-SIM over.'
                    ),
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl bg-surface-cream p-6 shadow-md">
                    <h3 className="font-semibold font-heading text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-6">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-md">
              <p className="section-label">{t('Methodology', 'Methodologie')}</p>
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">
                {t('How we compared Thailand eSIM providers', 'Hoe we Thailand eSIM aanbieders vergeleken')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(locale === 'nl' ? methodologyPoints.nl : methodologyPoints.en).map((item) => (
                  <div key={item} className="rounded-xl bg-thailand-blue-50 p-4 text-sm text-thailand-blue-900">
                    <span className="mr-2 text-green-600">✓</span>
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
              <p className="section-label">{t('Context', 'Context')}</p>
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">
                {t('When eSIM is not automatically the best choice', 'Wanneer eSIM niet automatisch de beste keuze is')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="rounded-xl bg-white p-5">
                  <p className="font-semibold text-gray-900 mb-2">{t('Airport SIM can still be simpler if', 'Vliegveld-SIM kan nog steeds eenvoudiger zijn als')}</p>
                  <p className="text-gray-600">
                    {t(
                      'your phone is not eSIM-compatible, your device is carrier-locked, or you want in-person help the moment you land. This page compares eSIMs, but that does not make them the right answer for every traveler.',
                      'je telefoon niet eSIM-compatibel is, je apparaat provider-vergrendeld is, of je persoonlijke hulp wilt op het moment dat je landt. Deze pagina vergelijkt eSIMs, maar dat maakt ze niet het juiste antwoord voor elke reiziger.'
                    )}
                  </p>
                </div>
                <div className="rounded-xl bg-white p-5">
                  <p className="font-semibold text-gray-900 mb-2">{t('What we are not claiming', 'Wat we niet beweren')}</p>
                  <p className="text-gray-600">
                    {t(
                      'We are not claiming one provider is always cheapest or fastest. We are showing current plan snapshots, tradeoffs, and setup context so you can verify the live offer that fits your trip.',
                      'We beweren niet dat één aanbieder altijd het goedkoopst of snelst is. We tonen huidige bundelvoorbeelden, afwegingen en installatiecontext zodat je het live aanbod kunt verifiëren dat bij je reis past.'
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            <p className="section-label text-center">{t('Providers', 'Aanbieders')}</p>
            <h2 className="text-3xl lg:text-4xl font-bold font-heading text-gray-900 mb-8 text-center">
              {t('Compare Thailand eSIM providers', 'Vergelijk Thailand eSIM aanbieders')}
            </h2>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {providers.map((provider) => (
                <div key={provider.id} className="rounded-2xl bg-white shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="relative h-9 w-32 mb-5">
                      <Image
                        src={provider.logo}
                        alt={`${provider.name} logo`}
                        fill
                        className="object-contain object-left"
                      />
                    </div>
                    <div className="inline-flex rounded-full bg-surface-cream px-3 py-1 text-sm font-medium text-gray-700 mb-4">
                      {provider.badge}
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-gray-900 mb-3">{provider.name}</h3>
                    <p className="text-sm font-semibold text-thailand-blue mb-2">{provider.bestFor}</p>
                    <p className="text-gray-600 mb-5">{provider.description}</p>

                    <div className="rounded-xl bg-surface-cream p-4 mb-5">
                      <h4 className="font-semibold text-gray-900 mb-3">{t(`Sample plans checked ${REVIEWED_DATE}`, `Voorbeeldbundels gecontroleerd ${REVIEWED_DATE}`)}</h4>
                      <div className="space-y-2">
                        {provider.plans.map((plan) => (
                          <div key={`${provider.slug}-${plan.label}`} className="flex items-center justify-between text-sm">
                            <span className="text-gray-700">{plan.label}</span>
                            <span className="font-semibold text-thailand-blue">{plan.price}</span>
                          </div>
                        ))}
                      </div>
                      <p className="mt-3 text-xs text-gray-500">{provider.planNote}</p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mb-6">
                      <div>
                        <h4 className="font-semibold text-green-700 mb-2">{t('What stands out', 'Wat opvalt')}</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          {provider.highlights.map((item) => (
                            <li key={item} className="flex items-start">
                              <span className="mr-2 text-green-600">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-orange-700 mb-2">{t('What to watch', 'Waar op te letten')}</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          {provider.tradeoffs.map((item) => (
                            <li key={item} className="flex items-start">
                              <span className="mr-2 text-orange-700">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <a
                      href={provider.affiliateLink}
                      target="_blank"
                      rel={AFFILIATE_REL}
                      className="block w-full rounded-xl bg-thailand-blue px-5 py-3 text-center font-semibold text-white transition-colors hover:bg-thailand-blue-dark"
                    >
                      {provider.ctaLabel} →
                    </a>

                    <div className="mt-5 border-t border-gray-200 pt-4">
                      <p className="text-sm font-semibold text-gray-900 mb-3">{t('Official sources checked during review', 'Officiële bronnen gecontroleerd tijdens beoordeling')}</p>
                      <div className="flex flex-wrap gap-3">
                        {provider.sourceLinks.map((source) => (
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

        <section className="bg-white section-padding">
          <div className="container-custom">
            <div className="mx-auto max-w-6xl">
              <p className="section-label text-center">{t('Comparison', 'Vergelijking')}</p>
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
                {t('Quick comparison: Airalo vs Yesim vs Saily', 'Snelle vergelijking: Airalo vs Yesim vs Saily')}
              </h2>
              <div className="overflow-hidden rounded-2xl bg-white shadow-md">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-thailand-blue text-white">
                      <tr>
                        <th className="px-6 py-4 text-left">{t('Feature', 'Kenmerk')}</th>
                        <th className="px-6 py-4 text-left">Airalo</th>
                        <th className="px-6 py-4 text-left">Yesim</th>
                        <th className="px-6 py-4 text-left">Saily</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-sm">
                      {comparisonRows.map((row, index) => (
                        <tr key={row.feature} className={index % 2 === 1 ? 'bg-gray-50' : ''}>
                          <td className="px-6 py-4 font-semibold text-gray-900">{row.feature}</td>
                          <td className="px-6 py-4 text-gray-600 align-top">{row.airalo}</td>
                          <td className="px-6 py-4 text-gray-600 align-top">{row.yesim}</td>
                          <td className="px-6 py-4 text-gray-600 align-top">{row.saily}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="bg-thailand-blue-50 p-6">
                  <p className="font-semibold text-thailand-blue-900 mb-2">{t('Important note on prices', 'Belangrijke opmerking over prijzen')}</p>
                  <p className="text-sm text-thailand-blue-900">
                    {t(
                      `Official provider sites use different currencies, flash promotions, and package mixes. Treat these as sample plan snapshots checked on ${REVIEWED_DATE}, then verify the live plan before purchase.`,
                      `Officiële aanbiedersites gebruiken verschillende valuta's, flash-promoties en bundelcombinaties. Beschouw deze als voorbeeldprijzen gecontroleerd op ${REVIEWED_DATE} en verifieer het live aanbod voor aankoop.`
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white section-padding">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <p className="section-label text-center">{t('Installation', 'Installatie')}</p>
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
                {t('How to install your Thailand eSIM', 'Hoe installeer je je Thailand eSIM')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  {
                    step: '1',
                    title: t('Check compatibility', 'Controleer compatibiliteit'),
                    text: t(
                      'Make sure your phone supports eSIM and is carrier-unlocked before buying.',
                      'Zorg ervoor dat je telefoon eSIM ondersteunt en provider-ontgrendeld is voor aankoop.'
                    ),
                  },
                  {
                    step: '2',
                    title: t('Buy with Wi-Fi available', 'Koop met Wi-Fi beschikbaar'),
                    text: t(
                      'Purchase and install while you still have stable internet, ideally before departure.',
                      'Koop en installeer terwijl je nog stabiel internet hebt, idealiter voor vertrek.'
                    ),
                  },
                  {
                    step: '3',
                    title: t('Follow provider setup', 'Volg aanbieder-installatie'),
                    text: t(
                      'Use the provider app, QR code, or manual setup steps exactly as documented.',
                      'Gebruik de aanbieder-app, QR-code of handmatige installatiestappen precies zoals gedocumenteerd.'
                    ),
                  },
                  {
                    step: '4',
                    title: t('Enable the line in Thailand', 'Activeer de lijn in Thailand'),
                    text: t(
                      'Turn on the eSIM and data roaming for that line when you arrive and want to connect.',
                      'Zet de eSIM en dataroaming voor die lijn aan wanneer je aankomt en verbinding wilt maken.'
                    ),
                  },
                ].map((item) => (
                  <div key={item.step} className="text-center rounded-2xl bg-surface-cream p-6 shadow-md">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-thailand-blue text-xl font-bold text-white">
                      {item.step}
                    </div>
                    <h3 className="font-semibold font-heading text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl">
              <p className="section-label text-center">FAQ</p>
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
                {t('Frequently asked questions', 'Veelgestelde vragen')}
              </h2>
              <div className="space-y-6">
                {faqData.map((item) => (
                  <div key={item.question} className="rounded-2xl bg-white p-6 shadow-md">
                    <h3 className="text-lg font-semibold font-heading text-gray-900 mb-2">{item.question}</h3>
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white section-padding">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-md">
              <p className="section-label">{t('Sources', 'Bronnen')}</p>
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">
                {t('Sources, methodology, and transparency', 'Bronnen, methodologie en transparantie')}
              </h2>
              <p className="text-gray-600 mb-6">
                {t(
                  `This page was reviewed on`,
                  `Deze pagina is beoordeeld op`
                )} <strong>{REVIEWED_DATE}</strong>. {t(
                  'We used official provider pages, help centers, and Apple\'s own eSIM travel documentation for the general setup advice. We also disclose the affiliate relationship clearly because these links are commercial.',
                  'We gebruikten officiële aanbiederpagina\'s, helpcentra en Apple\'s eigen eSIM-reisdocumentatie voor het algemene installatieadvies. We vermelden de affiliate-relatie ook duidelijk omdat deze links commercieel zijn.'
                )}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="rounded-2xl bg-thailand-blue-50 p-5">
                  <p className="font-semibold text-thailand-blue-900 mb-2">{t('Editorial review', 'Redactionele beoordeling')}</p>
                  <p className="text-sm text-thailand-blue-900 mb-3">
                    {t('Reviewed by', 'Beoordeeld door')} <strong>Go2Thailand Editorial Team</strong> {t('on', 'op')} <strong>{REVIEWED_DATE}</strong>.
                  </p>
                  <p className="font-semibold text-thailand-blue-900 mb-2">{t('Editorial standards', 'Redactionele standaarden')}</p>
                  <p className="text-sm text-thailand-blue-900">
                    {t(
                      'We avoided invented ratings, unverified support-speed claims, and outdated price points. Where data changes often, we framed it as a checked snapshot rather than a fixed promise.',
                      'We vermeden verzonnen beoordelingen, ongecontroleerde claims over supportsnelheid en verouderde prijspunten. Waar gegevens vaak veranderen, presenteerden we het als een gecontroleerde momentopname in plaats van een vaste belofte.'
                    )}
                  </p>
                </div>
                <div className="rounded-2xl bg-orange-50 p-5">
                  <p className="font-semibold text-orange-900 mb-2">{t('Policy links', 'Beleidslinks')}</p>
                  <div className="space-y-2 text-sm">
                    <Link href="/editorial-policy/" className="block text-orange-900 underline underline-offset-2">
                      {t('Editorial Policy', 'Redactioneel Beleid')}
                    </Link>
                    <Link href="/affiliate-disclosure/" className="block text-orange-900 underline underline-offset-2">
                      {t('Affiliate Disclosure', 'Affiliate Verklaring')}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {globalSources.map((source) => (
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

        <section className="section-padding">
          <div className="container-custom">
            <p className="section-label text-center">{t('Related Guides', 'Gerelateerde Gidsen')}</p>
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
              {t('Related Thailand prep guides', 'Gerelateerde Thailand voorbereidingsgidsen')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  href: '/travel-security/',
                  title: t('Travel security guide', 'Reisveiligheidsgids'),
                  text: t(
                    'VPNs, password managers, and practical digital-safety habits for Thailand.',
                    'VPN\'s, wachtwoordmanagers en praktische digitale veiligheidsgewoonten voor Thailand.'
                  ),
                },
                {
                  href: '/travel-insurance-thailand/',
                  title: t('Travel insurance guide', 'Reisverzekeringsgids'),
                  text: t(
                    'Medical and cancellation cover explained in a separate guide.',
                    'Medische en annuleringsdekking uitgelegd in een aparte gids.'
                  ),
                },
                {
                  href: '/thailand-for-first-timers/',
                  title: t('First-timer guide', 'Gids voor eerste keer'),
                  text: t(
                    'Plan transport, money, timing, and expectations before you land.',
                    'Plan transport, geld, timing en verwachtingen voordat je landt.'
                  ),
                },
                {
                  href: '/city/',
                  title: t('Explore destinations', 'Ontdek bestemmingen'),
                  text: t(
                    'Choose Bangkok, Chiang Mai, islands, beach towns, and more.',
                    'Kies Bangkok, Chiang Mai, eilanden, badplaatsen en meer.'
                  ),
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
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

export const getStaticProps: GetStaticProps = async () => {
  const providers: ESIMProvider[] = [
    {
      id: 1,
      name: 'Airalo',
      slug: 'airalo',
      logo: '/images/esim/airalo-logo.png',
      badge: 'Best for light-to-medium trips',
      bestFor: 'Good fit if you want a familiar eSIM marketplace and several Thailand package sizes.',
      description:
        'Airalo is one of the most established travel-eSIM marketplaces. For Thailand, it offers several smaller fixed-data packages and clear help-center documentation, which makes it a safe default for many travelers.',
      highlights: [
        'Multiple Thailand package sizes on the official store.',
        'Clear installation and troubleshooting documentation.',
        'Top-ups are supported when the eSIM is rechargeable.',
      ],
      tradeoffs: [
        'Not always the cheapest option once you move into bigger data needs.',
        'You still need to check whether the exact eSIM you choose supports top-up.',
      ],
      plans: [
        { label: '3 days / 1 GB', price: '4.00 EUR' },
        { label: '7 days / 3 GB', price: '5.50 EUR' },
        { label: '30 days / 5 GB', price: '7.50 EUR' },
      ],
      planNote:
        'Sample plans pulled from official Airalo Thailand listings checked on March 25, 2026.',
      ctaLabel: 'Check current Airalo plans',
      affiliateLink: 'https://airalo.tp.st/r8TriO5V',
      sourceLinks: [
        { label: 'Airalo Thailand eSIM listing', href: 'https://www.airalo.com/thailand-esim/maew-in-7days-1gb' },
        { label: 'Airalo Help Center', href: 'https://www.airalo.com/help' },
        { label: 'Airalo top-up help', href: 'https://www.airalo.com/help/using-managing-esims/ZSEEHBT5HW6F/how-can-i-top-up-an-esim/2DMCF3341SYF' },
      ],
    },
    {
      id: 2,
      name: 'Yesim',
      slug: 'yesim',
      logo: '/images/esim/yesim-logo.png',
      badge: 'Best for unlimited options',
      bestFor: 'Worth a look if you want unlimited-plan choices or more app-led flexibility.',
      description:
        'Yesim positions itself around plan flexibility: small entry plans, larger fixed-data plans, unlimited options, and Pay & Fly. That makes it more interesting for travelers whose data needs are harder to predict.',
      highlights: [
        'Unlimited and fixed-data plans both exist on the official Thailand page.',
        'Help-center documentation covers setup and offline activation guidance.',
        'Official site also advertises 24/7 support and Pay & Fly.',
      ],
      tradeoffs: [
        'The plan menu is broader, which can feel less simple than a basic fixed-data eSIM.',
        'You should compare the exact unlimited plan terms before assuming it is the best value.',
      ],
      plans: [
        { label: '1 day / 500 MB', price: '0.45 EUR' },
        { label: '7 days / Unlimited', price: '18 EUR' },
        { label: '30 days / 20 GB', price: '17 EUR' },
      ],
      planNote:
        'Sample plans pulled from the official Yesim Thailand page checked on March 25, 2026.',
      ctaLabel: 'Check current Yesim plans',
      affiliateLink: 'https://yesim.tp.st/i9QU4Xm6',
      sourceLinks: [
        { label: 'Yesim Thailand eSIM plans', href: 'https://yesim.app/country/thailand/' },
        { label: 'Yesim setup help', href: 'https://help.yesim.tech/yesim-esim-setup/' },
        { label: 'Yesim contacts / support', href: 'https://yesim.app/contacts/' },
      ],
    },
    {
      id: 3,
      name: 'Saily',
      slug: 'saily',
      logo: '/images/partners/saily.svg',
      badge: 'Best for simple data-only setup',
      bestFor: 'Useful if you want straightforward data-only travel eSIM plans plus built-in privacy features.',
      description:
        'Saily is a travel eSIM product from Nord Security, the company behind NordVPN. We keep it in the comparison because the official Thailand page is straightforward and the app includes extra privacy features, but we do not treat the Nord connection as the main reason to choose it.',
      highlights: [
        'Simple Thailand plan ladder from 1 GB to unlimited.',
        'Top-ups and auto top-up are documented on the official page.',
        'Official page highlights built-in privacy features and data-only simplicity.',
      ],
      tradeoffs: [
        'Data-only is great for many travelers, but some people may prefer providers with broader plan variations.',
        'You should compare it against Airalo or Yesim if your trip is long or your data needs are unusual.',
      ],
      plans: [
        { label: '7 days / 1 GB', price: 'US$2.99' },
        { label: '30 days / 3 GB', price: 'US$5.99' },
        { label: '30 days / 5 GB', price: 'US$7.99' },
      ],
      planNote:
        'Sample plans pulled from the official Saily Thailand page checked on March 25, 2026.',
      ctaLabel: 'Check current Saily plans',
      affiliateLink: 'https://saily.tpo.lv/rf9lidnE',
      sourceLinks: [
        { label: 'Saily Thailand eSIM page', href: 'https://saily.com/esim-thailand/' },
        { label: 'Saily app setup steps', href: 'https://saily.com/esim-thailand/' },
        { label: 'Apple travel eSIM support', href: 'https://support.apple.com/en-us/118227' },
      ],
    },
  ];

  return {
    props: {
      providers,
    },
  };
};
