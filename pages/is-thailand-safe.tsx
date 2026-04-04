import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import EmailCapture from '../components/EmailCapture';

const faqItemsBilingual = [
  {
    question: { en: 'Is Thailand safe for tourists?', nl: 'Is Thailand veilig voor toeristen?' },
    answer: {
      en: 'Yes, Thailand is generally safe for tourists. The main risks are petty theft, scams targeting tourists, and traffic accidents. Violent crime against tourists is rare.',
      nl: 'Ja, Thailand is over het algemeen veilig voor toeristen. De belangrijkste risico\'s zijn zakkenrollerij, oplichting gericht op toeristen en verkeersongevallen. Geweldsmisdrijven tegen toeristen zijn zeldzaam.',
    },
  },
  {
    question: { en: 'Is Thailand safe for solo female travelers?', nl: 'Is Thailand veilig voor alleen reizende vrouwen?' },
    answer: {
      en: 'Thailand is one of the more popular solo female travel destinations in Southeast Asia. Major cities and tourist areas are well-traveled and safe. Take normal precautions at night.',
      nl: 'Thailand is een van de populairste bestemmingen voor alleen reizende vrouwen in Zuidoost-Azië. Grote steden en toeristische gebieden zijn goed bezocht en veilig. Neem \'s nachts de normale voorzorgsmaatregelen.',
    },
  },
  {
    question: { en: 'What are the biggest risks in Thailand?', nl: 'Wat zijn de grootste risico\'s in Thailand?' },
    answer: {
      en: 'The biggest risks are road accidents (especially on scooters), tourist scams (tuk-tuk scams, gem scams), petty theft in crowded areas, and jellyfish/sea creatures in certain coastal areas.',
      nl: 'De grootste risico\'s zijn verkeersongevallen (vooral op scooters), toeristenoplichting (tuk-tuk oplichting, edelsteenoplichting), zakkenrollerij op drukke plekken en kwallen/zeedieren in bepaalde kustgebieden.',
    },
  },
  {
    question: { en: 'Is tap water safe to drink in Thailand?', nl: 'Is kraanwater veilig om te drinken in Thailand?' },
    answer: {
      en: 'No. Do not drink tap water in Thailand. Bottled water is cheap and widely available (about 10 THB / $0.30 per 1.5L bottle).',
      nl: 'Nee. Drink geen kraanwater in Thailand. Flessenwater is goedkoop en overal verkrijgbaar (ongeveer 10 THB / €0,30 per fles van 1,5L).',
    },
  },
];

const risksBilingual = [
  {
    level: { en: 'Low', nl: 'Laag' },
    color: 'bg-green-100 text-green-800',
    title: { en: 'Violent crime', nl: 'Geweldsmisdrijven' },
    detail: {
      en: 'Violent crime against tourists is rare. Thailand is not a high-risk country.',
      nl: 'Geweldsmisdrijven tegen toeristen zijn zeldzaam. Thailand is geen land met hoog risico.',
    },
  },
  {
    level: { en: 'Medium', nl: 'Gemiddeld' },
    color: 'bg-yellow-100 text-yellow-800',
    title: { en: 'Petty theft', nl: 'Zakkenrollerij' },
    detail: {
      en: 'Pickpocketing in crowded markets and tourist areas. Keep valuables secure.',
      nl: 'Zakkenrollerij op drukke markten en toeristische gebieden. Bewaar waardevolle spullen veilig.',
    },
  },
  {
    level: { en: 'Medium', nl: 'Gemiddeld' },
    color: 'bg-yellow-100 text-yellow-800',
    title: { en: 'Tourist scams', nl: 'Toeristenoplichting' },
    detail: {
      en: 'Tuk-tuk scams, gem scams, fake travel agents. Stick to reputable operators.',
      nl: 'Tuk-tuk oplichting, edelsteenoplichting, nep reisbureaus. Gebruik betrouwbare aanbieders.',
    },
  },
  {
    level: { en: 'High', nl: 'Hoog' },
    color: 'bg-red-100 text-red-800',
    title: { en: 'Traffic & scooters', nl: 'Verkeer & scooters' },
    detail: {
      en: 'Road accidents are the #1 cause of tourist deaths in Thailand. Be very careful on scooters. Get travel insurance that covers motorbikes.',
      nl: 'Verkeersongevallen zijn doodsoorzaak nummer 1 onder toeristen in Thailand. Wees zeer voorzichtig op scooters. Neem een reisverzekering die motorfietsen dekt.',
    },
  },
  {
    level: { en: 'Low', nl: 'Laag' },
    color: 'bg-green-100 text-green-800',
    title: { en: 'Natural disasters', nl: 'Natuurrampen' },
    detail: {
      en: 'Tsunami risk exists on the Andaman coast but is rare. Monsoon flooding in some areas during rainy season.',
      nl: 'Tsunami-risico bestaat aan de Andamankust maar is zeldzaam. Moessonoverstromingen in sommige gebieden tijdens het regenseizoen.',
    },
  },
];

export default function IsThailandSafePage() {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const lang = isNl ? 'nl' : 'en';

  const faqItems = faqItemsBilingual.map(item => ({
    question: item.question[lang],
    answer: item.answer[lang],
  }));

  const risks = risksBilingual.map(item => ({
    level: item.level[lang],
    color: item.color,
    title: item.title[lang],
    detail: item.detail[lang],
  }));

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Is Thailand Veilig?' : 'Is Thailand Safe?', href: '/is-thailand-safe/' },
  ];

  return (
    <>
      <SEOHead
        title={isNl
          ? 'Is Thailand Veilig? Ja — Dit Ervaren 35M Toeristen Per Jaar (2026)'
          : "Is Thailand Safe? Yes — Here's What 35M Tourists Per Year Experience (2026)"}
        description={isNl
          ? 'Thailand is een van Azië\'s veiligste toeristische bestemmingen. Weinig geweldsmisdrijven, vriendelijke locals, goede gezondheidszorg. Bekijk de echte risico\'s (oplichting, verkeer, dranken) en hoe je ze vermijdt. Bijgewerkt maart 2026.'
          : "Thailand is one of Asia's safest tourist destinations. Low violent crime, friendly locals, great healthcare. See the real risks (scams, traffic, drinks) and how to avoid them. Updated March 2026."}
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-4">
                {isNl ? 'Is Thailand Veilig?' : 'Is Thailand Safe?'}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {isNl
                  ? 'Eerlijke, actuele veiligheidsgids voor Thailand in 2026. Waar je op moet letten en waar je je geen zorgen over hoeft te maken.'
                  : 'Honest, up-to-date safety guide for Thailand in 2026. What to watch out for and what not to worry about.'}
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom max-w-3xl">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-10">
              <p className="text-green-800 font-semibold text-lg">
                {isNl
                  ? 'Kort antwoord: Ja, Thailand is veilig voor toeristen. Miljoenen mensen bezoeken het land elk jaar zonder incidenten. De risico\'s die er zijn, zijn beheersbaar met basiskennis.'
                  : 'Short answer: Yes, Thailand is safe for tourists. Millions of people visit every year without incident. The risks that do exist are manageable with basic awareness.'}
              </p>
            </div>

            <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">
              {isNl ? 'Veiligheidsrisico Overzicht' : 'Safety Risk Overview'}
            </h2>
            <div className="space-y-4 mb-12">
              {risks.map((risk) => (
                <div key={risk.title} className="bg-white rounded-xl shadow-sm p-5 flex gap-4 items-start">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold shrink-0 ${risk.color}`}>{risk.level}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{risk.title}</h3>
                    <p className="text-gray-600 text-sm">{risk.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <EmailCapture
              heading={isNl ? 'Blijf veilig in Thailand' : 'Stay safe in Thailand'}
              subtext={isNl
                ? 'Ontvang wekelijks tips over veiligheid, oplichting om te vermijden en insider advies van ervaren reizigers.'
                : 'Get weekly tips on safety, scams to avoid, and insider advice from experienced travelers.'}
            />

            <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">
              {isNl ? 'Veelgestelde Vragen' : 'Frequently Asked Questions'}
            </h2>
            <div className="space-y-6 mb-12">
              {faqItems.map((item) => (
                <div key={item.question} className="bg-white rounded-xl shadow-sm p-5">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.question}</h3>
                  <p className="text-gray-600 text-sm">{item.answer}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold font-heading text-gray-900 mb-3">
                {isNl ? 'Meer Thailand gidsen' : 'More Thailand guides'}
              </h2>
              <ul className="space-y-2">
                <li><Link href="/thailand-travel-guide/" className="text-thailand-blue hover:underline">{isNl ? 'Thailand Reisgids 2026' : 'Thailand Travel Guide 2026'}</Link></li>
                <li><Link href="/thailand-for-first-timers/" className="text-thailand-blue hover:underline">{isNl ? 'Thailand voor Beginners' : 'Thailand for First Timers'}</Link></li>
                <li><Link href="/visa/" className="text-thailand-blue hover:underline">{isNl ? 'Thailand Visum Gids' : 'Thailand Visa Guide'}</Link></li>
                <li><Link href="/travel-security/" className="text-thailand-blue hover:underline">{isNl ? 'Reisbeveiliging Tips' : 'Travel Security Tips'}</Link></li>
                <li><Link href="/travel-insurance-thailand/" className="text-thailand-blue hover:underline">{isNl ? 'Reisverzekering voor Thailand' : 'Travel Insurance for Thailand'}</Link></li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold font-heading text-gray-900 mb-3">
                {isNl ? 'Ontdek Bestemmingen' : 'Explore Destinations'}
              </h2>
              <ul className="space-y-2">
                <li><Link href="/city/bangkok/" className="text-thailand-blue hover:underline">{isNl ? 'Bangkok Gids' : 'Bangkok Guide'}</Link></li>
                <li><Link href="/city/chiang-mai/" className="text-thailand-blue hover:underline">{isNl ? 'Chiang Mai Gids' : 'Chiang Mai Guide'}</Link></li>
                <li><Link href="/city/phuket/" className="text-thailand-blue hover:underline">{isNl ? 'Phuket Gids' : 'Phuket Guide'}</Link></li>
                <li><Link href="/islands/" className="text-thailand-blue hover:underline">{isNl ? 'Thaise Eilanden Gids' : 'Thai Islands Guide'}</Link></li>
                <li><Link href="/best-places-to-visit-thailand/" className="text-thailand-blue hover:underline">{isNl ? 'Beste Plekken om te Bezoeken' : 'Best Places to Visit'}</Link></li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps = async () => ({ props: {}, revalidate: 604800 });
