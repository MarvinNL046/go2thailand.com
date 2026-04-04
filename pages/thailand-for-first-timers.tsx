import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import EmailCapture from '../components/EmailCapture';

const classicRoute = {
  en: [
    { city: 'Bangkok', nights: '2–3 nights', desc: 'Start here. Temples, street food, markets, and nightlife. The pulse of Thailand.' },
    { city: 'Chiang Mai', nights: '2–3 nights', desc: 'Northern culture, elephant sanctuaries, cooking classes, and mountain scenery.' },
    { city: 'Southern Islands', nights: '4–7 nights', desc: 'Choose your vibe: party (Koh Phangan), diving (Koh Tao), beaches (Koh Samui, Krabi, Phuket).' },
  ],
  nl: [
    { city: 'Bangkok', nights: '2–3 nachten', desc: 'Begin hier. Tempels, straatvoedsel, markten en nachtleven. De hartslag van Thailand.' },
    { city: 'Chiang Mai', nights: '2–3 nachten', desc: 'Noordelijke cultuur, olifantenopvang, kooklessen en berglandschappen.' },
    { city: 'Zuidelijke Eilanden', nights: '4–7 nachten', desc: 'Kies je sfeer: feest (Koh Phangan), duiken (Koh Tao), stranden (Koh Samui, Krabi, Phuket).' },
  ],
};

const beforeYouGo = {
  en: [
    { title: 'Visa', detail: 'Most nationalities get 30 days visa-free on arrival. Check your specific country.', link: { href: '/visa/', label: 'Visa guide' } },
    { title: 'SIM card / eSIM', detail: 'Buy a local SIM at the airport or get an eSIM before you leave.', link: { href: '/esim/', label: 'eSIM guide' } },
    { title: 'Currency', detail: 'Thai Baht (THB). ATMs are everywhere but charge ~200 THB fee. Use Wise or Revolut to minimize fees.' },
    { title: 'Health', detail: 'No mandatory vaccinations. Consider Hep A, Typhoid, and malaria prevention for rural areas. Travel insurance is strongly recommended.', link: { href: '/travel-insurance-thailand/', label: 'Travel insurance guide' } },
    { title: 'Language', detail: 'Thai is the official language. English is widely spoken in tourist areas. Learn a few Thai words — locals appreciate it.' },
  ],
  nl: [
    { title: 'Visum', detail: 'De meeste nationaliteiten krijgen 30 dagen visumvrij bij aankomst. Controleer je specifieke land.', link: { href: '/visa/', label: 'Visumgids' } },
    { title: 'SIM-kaart / eSIM', detail: 'Koop een lokale SIM op de luchthaven of neem een eSIM voordat je vertrekt.', link: { href: '/esim/', label: 'eSIM-gids' } },
    { title: 'Valuta', detail: 'Thaise Baht (THB). Geldautomaten zijn overal maar rekenen ~200 THB kosten. Gebruik Wise of Revolut om kosten te beperken.' },
    { title: 'Gezondheid', detail: 'Geen verplichte vaccinaties. Overweeg Hep A, Tyfus en malariaprofylaxe voor landelijke gebieden. Reisverzekering wordt sterk aanbevolen.', link: { href: '/travel-insurance-thailand/', label: 'Reisverzekeringsgids' } },
    { title: 'Taal', detail: 'Thai is de officiële taal. Engels wordt veel gesproken in toeristische gebieden. Leer een paar Thaise woorden — locals waarderen het.' },
  ],
};

const mistakes = {
  en: [
    'Overpacking: Thailand is hot and laundry is cheap. Pack light.',
    'Trusting tuk-tuk drivers who "know a better temple" — classic scam.',
    'Not negotiating: markets and tuk-tuks expect it.',
    'Renting a scooter without experience — road accidents are the #1 tourist risk.',
    'Changing money at the airport — terrible rates. Use an ATM in the city.',
    'Disrespecting temple dress codes — cover shoulders and knees.',
  ],
  nl: [
    'Te veel inpakken: Thailand is warm en de was is goedkoop. Pak licht in.',
    'Tuk-tuk chauffeurs vertrouwen die "een betere tempel kennen" — klassieke oplichterij.',
    'Niet onderhandelen: op markten en in tuk-tuks wordt het verwacht.',
    'Een scooter huren zonder ervaring — verkeersongelukken zijn het #1 toeristenrisico.',
    'Geld wisselen op de luchthaven — slechte koersen. Gebruik een geldautomaat in de stad.',
    'Tempelkledingvoorschriften negeren — bedek schouders en knieën.',
  ],
};

const faqItems = {
  en: [
    { question: 'Is Thailand good for first-time solo travelers?', answer: 'Yes. Thailand is one of the most first-timer-friendly destinations in the world. English is widely spoken, transport is easy, and the country is set up for tourism.' },
    { question: 'How much money do I need for Thailand?', answer: 'Budget: $30-50/day. Mid-range: $60-120/day. This covers accommodation, food, local transport, and activities. Flights and big tours are extra.' },
    { question: 'Do I need vaccines for Thailand?', answer: 'No mandatory vaccines. Recommended: Hepatitis A and Typhoid. Check with your doctor. Travel insurance is strongly advised.' },
    { question: 'What should I pack for Thailand?', answer: 'Light, breathable clothes. Reef-safe sunscreen. A scarf (for temples). Flip flops. Power adapter (Thailand uses Type A/B/C — most electronics work fine). That is basically it.' },
  ],
  nl: [
    { question: 'Is Thailand geschikt voor eerste solo reizigers?', answer: 'Ja. Thailand is een van de meest beginnersvriendelijke bestemmingen ter wereld. Engels wordt veel gesproken, vervoer is makkelijk en het land is ingericht op toerisme.' },
    { question: 'Hoeveel geld heb ik nodig voor Thailand?', answer: 'Budget: €30-50/dag. Midden: €60-120/dag. Dit dekt accommodatie, eten, lokaal vervoer en activiteiten. Vluchten en grote tours zijn extra.' },
    { question: 'Heb ik vaccinaties nodig voor Thailand?', answer: 'Geen verplichte vaccinaties. Aanbevolen: Hepatitis A en Tyfus. Overleg met je huisarts. Een reisverzekering wordt sterk aanbevolen.' },
    { question: 'Wat moet ik inpakken voor Thailand?', answer: 'Lichte, ademende kleding. Rifvriendelijke zonnebrand. Een sjaal (voor tempels). Slippers. Stekkeradapter (Thailand gebruikt Type A/B/C — de meeste elektronica werkt prima). Dat is het eigenlijk.' },
  ],
};

function getFaqJsonLd(locale: string) {
  const items = locale === 'nl' ? faqItems.nl : faqItems.en;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export default function ThailandForFirstTimers() {
  const { locale } = useRouter();
  const isNl = locale === 'nl';

  const route = isNl ? classicRoute.nl : classicRoute.en;
  const byg = isNl ? beforeYouGo.nl : beforeYouGo.en;
  const mist = isNl ? mistakes.nl : mistakes.en;
  const faq = isNl ? faqItems.nl : faqItems.en;

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Thailand voor Beginners' : 'Thailand for First Timers', href: '/thailand-for-first-timers/' },
  ];

  return (
    <>
      <SEOHead
        title={isNl
          ? 'Thailand voor Beginners: Complete Gids 2026 | Go2 Thailand'
          : 'Thailand for First Timers: Complete Beginner Guide 2026 | Go2 Thailand'}
        description={isNl
          ? 'Eerste keer naar Thailand? Deze complete beginnersgids behandelt de klassieke route, visum, budget, wat je moet inpakken, veelgemaakte fouten en alles wat je moet weten.'
          : 'First time in Thailand? This complete beginner guide covers the classic route, visa, budget, what to pack, common mistakes, and everything you need to know before you go.'}
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqJsonLd(locale || 'en')) }} />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-4">
                {isNl ? 'Thailand voor Beginners' : 'Thailand for First Timers'}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {isNl
                  ? 'Alles wat je moet weten voor je eerste reis naar Thailand — route, budget, visum, wat je moet inpakken en wat je moet vermijden.'
                  : 'Everything you need to know before your first trip to Thailand — route, budget, visa, what to pack, and what to avoid.'}
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom max-w-3xl">

            <section className="mb-12">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">
                {isNl ? 'De Klassieke Beginners Route' : 'The Classic First-Timer Route'}
              </h2>
              <div className="space-y-4">
                {route.map((stop, i) => (
                  <div key={stop.city} className="bg-white rounded-xl shadow-sm p-5 flex gap-4">
                    <span className="text-2xl font-bold text-thailand-blue shrink-0">{i + 1}</span>
                    <div>
                      <h3 className="font-bold font-heading text-gray-900">{stop.city} <span className="text-gray-500 font-normal text-sm">({stop.nights})</span></h3>
                      <p className="text-gray-600 text-sm mt-1">{stop.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-gray-600 text-sm mt-4">
                {isNl
                  ? 'Totaal: 10–14 dagen. Kortere reis? Doe Bangkok + één bestemming. Langer? Voeg Chiang Rai, Pai of meer eilanden toe.'
                  : 'Total: 10–14 days. Shorter trip? Do Bangkok + one destination. Longer? Add Chiang Rai, Pai, or more islands.'}
              </p>
              <Link href="/itineraries/" className="text-thailand-blue hover:underline font-semibold mt-2 inline-block">
                {isNl ? 'Bekijk kant-en-klare reisroutes →' : 'Browse ready-made itineraries →'}
              </Link>
            </section>

            <EmailCapture
              heading={isNl ? 'Eerste keer naar Thailand?' : 'First time in Thailand?'}
              subtext={isNl
                ? 'Ontvang onze gratis startersgids met must-knows, paktips en budgethacks — in je inbox.'
                : 'Get our free starter guide with must-knows, packing tips, and budget hacks — delivered to your inbox.'}
            />

            <section className="mb-12">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">
                {isNl ? 'Wat je Moet Weten Voor je Gaat' : 'What to Know Before You Go'}
              </h2>
              <div className="space-y-4">
                {byg.map((item) => (
                  <div key={item.title} className="bg-white rounded-xl shadow-sm p-5">
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.detail}</p>
                    {item.link && (
                      <Link href={item.link.href} className="text-thailand-blue hover:underline text-sm font-semibold mt-1 inline-block">
                        {item.link.label} →
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">
                {isNl ? 'Veelgemaakte Fouten' : 'Common First-Timer Mistakes'}
              </h2>
              <ul className="space-y-3">
                {mist.map((mistake) => (
                  <li key={mistake} className="bg-white rounded-xl shadow-sm p-4 flex gap-3">
                    <span className="text-red-500 shrink-0">✗</span>
                    <span className="text-gray-600 text-sm">{mistake}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                {isNl ? 'Veelgestelde Vragen' : 'FAQ'}
              </h2>
              <div className="space-y-6">
                {faq.map((item) => (
                  <div key={item.question} className="bg-white rounded-xl shadow-sm p-5">
                    <h3 className="font-semibold text-gray-900 mb-2">{item.question}</h3>
                    <p className="text-gray-600 text-sm">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold font-heading text-gray-900 mb-3">
                {isNl ? 'Meer gidsen' : 'More guides'}
              </h2>
              <ul className="space-y-2">
                <li><Link href="/thailand-travel-guide/" className="text-thailand-blue hover:underline">{isNl ? 'Complete Thailand Reisgids' : 'Complete Thailand Travel Guide'}</Link></li>
                <li><Link href="/is-thailand-safe/" className="text-thailand-blue hover:underline">{isNl ? 'Is Thailand Veilig?' : 'Is Thailand Safe?'}</Link></li>
                <li><Link href="/thailand-index/budget/" className="text-thailand-blue hover:underline">{isNl ? 'Thailand Budgetgids' : 'Thailand Budget Guide'}</Link></li>
                <li><Link href="/city/bangkok/" className="text-thailand-blue hover:underline">{isNl ? 'Bangkok Gids' : 'Bangkok Guide'}</Link></li>
                <li><Link href="/city/chiang-mai/" className="text-thailand-blue hover:underline">{isNl ? 'Chiang Mai Gids' : 'Chiang Mai Guide'}</Link></li>
                <li><Link href="/travel-insurance-thailand/" className="text-thailand-blue hover:underline">{isNl ? 'Reisverzekering voor Thailand' : 'Travel Insurance for Thailand'}</Link></li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold font-heading text-gray-900 mb-3">
                {isNl ? 'Plan je ervaring' : 'Plan your experience'}
              </h2>
              <ul className="space-y-2">
                <li><Link href="/thailand-itinerary/" className="text-thailand-blue hover:underline">{isNl ? 'Thailand Reisroute Templates' : 'Thailand Itinerary Templates'}</Link></li>
                <li><Link href="/islands/" className="text-thailand-blue hover:underline">{isNl ? 'Thaise Eilanden Gids' : 'Thai Islands Guide'}</Link></li>
                <li><Link href="/food/" className="text-thailand-blue hover:underline">{isNl ? 'Thais Eten Gids' : 'Thai Food Guide'}</Link></li>
                <li><Link href="/best-cooking-classes-in-thailand/" className="text-thailand-blue hover:underline">{isNl ? 'Kooklessen' : 'Cooking Classes'}</Link></li>
                <li><Link href="/transport/" className="text-thailand-blue hover:underline">{isNl ? 'Vervoersroutes' : 'Transport Routes'}</Link></li>
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
