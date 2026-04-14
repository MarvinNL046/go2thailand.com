import { ReactNode, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';

const EKTA_LINK = 'https://ektatraveling.tpo.lv/pK9wyXgr';
const SAFETYWING_LINK = 'https://safetywing.com/?referenceID=26490463&utm_source=26490463&utm_medium=Ambassador';
const LAST_VERIFIED = 'March 10, 2026';

function getFaqItems(isNl: boolean) {
  return [
    {
      question: isNl
        ? 'Heb ik een reisverzekering nodig voor Thailand?'
        : 'Do I need travel insurance for Thailand?',
      answer: isNl
        ? 'Ja. Thailand kan dagelijks betaalbaar zijn, maar priv\u00e9ziekenhuisrekeningen lopen snel op. Bumrungrad publiceert kamerprijzen die al in de duizenden baht per nacht lopen, en CDC-richtlijnen voor Thailand benadrukken verkeersveiligheid, voedsel- en waterrisico\'s, hitte en zwemgevaren. Ik zou niet onverzekerd gaan.'
        : 'Yes. Thailand can be affordable day to day, but private medical bills add up fast. Bumrungrad publishes room rates that already run into the thousands of baht per night, and CDC guidance for Thailand highlights road safety, food and water risks, heat illness, and swimming hazards. I would not go uninsured.',
    },
    {
      question: isNl
        ? 'Dekt een reisverzekering motorfietsen in Thailand?'
        : 'Does travel insurance cover motorbikes in Thailand?',
      answer: isNl
        ? 'Soms, maar alleen als je polis het expliciet toestaat en je aan de voorwaarden voldoet. SafetyWing zegt dat motorongelukken gedekt kunnen zijn bij recreatief motorrijden als je een geldig rijbewijs hebt, een helm draagt en de wet niet overtreedt. EKTA vermeldt scooters, brommers en motorfietsen onder de Active rest-categorie en hoger. Als je zonder het juiste rijbewijs rijdt, kunnen veel claims mislukken.'
        : 'Sometimes, but only if your policy explicitly allows it and you meet the conditions. SafetyWing says motor accidents can be covered for recreational motorcycle driving if you have a valid license, wear a helmet, and are not breaking the law. EKTA lists scooters, mopeds, and motorcycles under its Active rest tier and above. If you ride without the right license, many claims can fall apart.',
    },
    {
      question: isNl
        ? 'Wat is de beste reisverzekering voor Thailand?'
        : 'What is the best travel insurance for Thailand?',
      answer: isNl
        ? 'Voor een eenvoudige korte reis zou ik beginnen met EKTA vanwege de Thailand-pagina, lage dagprijzen en activiteitscategorie\u00ebn die het makkelijk maken om een eenmalige vakantie af te dekken. Voor remote workers en langere reizen is SafetyWing de betere keuze vanwege het doorlopende abonnementsmodel met $250.000 medische dekking en $100.000 evacuatiedekking op basis van de openbare plandetails die ik heb gecontroleerd.'
        : 'For a straightforward short trip, I would start with EKTA because its Thailand page, low daily pricing, and activity-tier structure make it easy to match a one-off holiday. For remote workers and longer trips, SafetyWing is the stronger fit because it works on a rolling subscription model with $250,000 medical coverage and $100,000 in evacuation coverage on the public plan details I checked.',
    },
    {
      question: isNl
        ? 'Hoeveel kost een reisverzekering voor Thailand?'
        : 'How much does Thailand travel insurance cost?',
      answer: isNl
        ? 'Voor een korte solo-reis kan een reisverzekering voor Thailand beginnen rond $14 tot $20 voor twee weken op basis van EKTA\'s openbare dagprijs. De prijzen van SafetyWing zijn leeftijdsgebonden; toen ik het op 10 maart 2026 controleerde, toonde de offici\u00eble pagina $62,72 per vier weken voor leeftijd 10 tot 39. Echte offertes vari\u00ebren per leeftijd, thuisland en extra opties.'
        : 'For a short solo trip, Thailand travel insurance can start around $14 to $20 for two weeks using EKTA\u2019s public daily pricing. SafetyWing\u2019s public pricing is age-based; when I checked it on March 10, 2026, the official page showed $62.72 per four weeks for ages 10 to 39. Real quotes vary by age, home country, and add-ons.',
    },
    {
      question: isNl
        ? 'Dekt een reisverzekering Muay Thai in Thailand?'
        : 'Does travel insurance cover Muay Thai in Thailand?',
      answer: isNl
        ? 'Ga er niet vanuit dat dit het geval is. SafetyWing\'s Description of Coverage vermeldt vechtsporten als uitgesloten activiteiten, dus standaarddekking is niet genoeg voor Muay Thai. Als training of vechten onderdeel is van je reis, vraag dan schriftelijke bevestiging van de verzekeraar voordat je koopt.'
        : 'Do not assume it does. SafetyWing\u2019s Description of Coverage lists martial arts among excluded activities, so standard cover is not enough for Muay Thai. If training or fighting is part of your trip, get written confirmation from the insurer before you buy.',
    },
    {
      question: isNl
        ? 'Is gezondheidszorg duur in Thailand?'
        : 'Is healthcare expensive in Thailand?',
      answer: isNl
        ? 'Openbare zorg kan goedkoper zijn, maar de ziekenhuizen waar de meeste reizigers in noodgevallen terechtkomen zijn vaak priv\u00e9. De gepubliceerde kamerprijzen van Bumrungrad laten zien hoe snel de kosten kunnen oplopen voordat specialistische behandeling, scans, chirurgie of evacuatie worden meegerekend. Dat is precies waarom een sterke medische limiet belangrijker is dan een paar dollar besparen op de premie.'
        : 'Public care can be cheaper, but the hospitals most travelers want in an emergency are often private. Bumrungrad\u2019s published room rates show how quickly costs can rise before specialist treatment, scans, surgery, or evacuation are added. That is exactly why a strong medical limit matters more than saving a few dollars on premium.',
    },
  ];
}

function getInternalGuides(isNl: boolean) {
  return [
    {
      href: '/city/phuket/',
      title: isNl ? 'Phuket Stadsgids' : 'Phuket City Guide',
      description: isNl
        ? 'Handig als je een scooter wilt huren, boottochten wilt boeken of in de buurt van priv\u00e9ziekenhuizen verblijft.'
        : 'Useful if you might rent a scooter, book boat trips, or stay near private hospitals.',
    },
    {
      href: '/travel-guides/scooter-rental-thailand/',
      title: isNl ? 'Scooter Huren in Thailand' : 'Scooter Rental in Thailand',
      description: isNl
        ? 'Lees dit voordat je aanneemt dat je helm- en rijbewijssituatie goed genoeg is.'
        : 'Read this before you assume your helmet and license situation is good enough.',
    },
    {
      href: '/best-diving-snorkeling-in-thailand/',
      title: isNl ? 'Beste Duik- & Snorkelplekken' : 'Best Diving & Snorkeling',
      description: isNl
        ? 'Relevant als je de activiteitenvoorwaarden moet controleren voordat je je polis boekt.'
        : 'Relevant if you need to double-check activity wording before booking your policy.',
    },
    {
      href: '/best-muay-thai-in-thailand/',
      title: isNl ? 'Beste Muay Thai in Thailand' : 'Best Muay Thai in Thailand',
      description: isNl
        ? 'Belangrijk omdat Muay Thai-dekking niet iets is waar je standaard vanuit kunt gaan.'
        : 'Important because Muay Thai cover is not something I would ever assume by default.',
    },
    {
      href: '/practical-info/health-vaccinations/',
      title: isNl ? 'Gezondheid & Vaccinaties' : 'Health & Vaccinations',
      description: isNl
        ? 'Dengue, voedselveiligheid, muggenbescherming en de basis die je moet regelen voor vertrek.'
        : 'Dengue, food safety, mosquito protection, and the basics to sort before flying.',
    },
    {
      href: '/travel-guides/thailand-weather/',
      title: isNl ? 'Thailand Weergids' : 'Thailand Weather Guide',
      description: isNl
        ? 'Handig als je reis in het regenseizoen valt, eilandhoppen omvat of hete maanden beslaat.'
        : 'Useful if your trip crosses rainy season, island hopping, or heat-heavy months.',
    },
    {
      href: '/esim/',
      title: isNl ? 'Thailand eSIM Gids' : 'Thailand eSIM Guide',
      description: isNl
        ? 'Sla je polisdocumenten, noodnummer van de verzekeraar en ziekenhuisadressen op een werkende telefoon op.'
        : 'Save your policy docs, insurer hotline, and hospital directions on a working phone.',
    },
    {
      href: '/thailand-travel-guide/',
      title: isNl ? 'Thailand Reisgids' : 'Thailand Travel Guide',
      description: isNl
        ? 'Complete planningsgids voor je Thailand-reis \u2014 van visa tot budgetten.'
        : 'Complete planning guide for your Thailand trip \u2014 from visas to budgets.',
    },
    {
      href: '/thailand-for-first-timers/',
      title: isNl ? 'Thailand voor Beginners' : 'Thailand for First Timers',
      description: isNl
        ? 'Alles wat je als eerste bezoeker moet weten voordat je aankomt.'
        : 'Everything first-time visitors need to know before arriving.',
    },
    {
      href: '/islands/',
      title: isNl ? 'Thaise Eilandengids' : 'Thai Islands Guide',
      description: isNl
        ? 'Eilandhoppen vereist vaak extra bootverzekeringen \u2014 controleer je dekking.'
        : 'Island hopping often needs boat insurance add-ons \u2014 check your coverage.',
    },
  ];
}

function AffiliateButton({
  href,
  children,
  variant = 'primary',
}: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
}) {
  const className =
    variant === 'primary'
      ? 'inline-flex items-center justify-center rounded-full bg-thailand-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700'
      : 'inline-flex items-center justify-center rounded-full border border-thailand-blue px-6 py-3 text-sm font-semibold text-thailand-blue transition-colors hover:bg-thailand-blue hover:text-white';

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow sponsored"
      className={className}
    >
      {children}
    </a>
  );
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <h3 className="mb-3 text-xl font-bold font-heading text-gray-900">{title}</h3>
      <div className="space-y-4 text-gray-700">{children}</div>
    </div>
  );
}

function SafetyWingWidget() {
  useEffect(() => {
    // Load SafetyWing price widget script
    const existing = document.querySelector('script[src*="safetywing-price-widget"]');
    if (existing) return;
    const script = document.createElement('script');
    script.src = 'https://storage.googleapis.com/safetywing-static/widget/safetywing-price-widget.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="my-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div
        className="safetywing-price-widget"
        data-safetywingaffiliateid="26490463"
        data-scale="1.0"
      />
    </div>
  );
}

export default function TravelInsurancePage() {
  const siteLogoUrl = 'https://go2-thailand.com/images/brand/go2thailand-logo-2026.png';
  const { locale } = useRouter();
  const isNl = locale === 'nl';

  const FAQ_ITEMS = getFaqItems(isNl);
  const INTERNAL_GUIDES = getInternalGuides(isNl);

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Reisverzekering' : 'Travel Insurance', href: '/travel-insurance-thailand' },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isNl
      ? 'Beste Reisverzekering voor Thailand in 2026'
      : 'Best Travel Insurance for Thailand in 2026',
    description: isNl
      ? 'Vergelijk de beste reisverzekeringen voor Thailand in 2026. We beoordelen Ekta en SafetyWing op prijs, scooterdekking, medische limieten, evacuatie en de uitsluitingen die er echt toe doen.'
      : 'Compare the best travel insurance for Thailand in 2026. We review Ekta and SafetyWing on price, scooter cover, medical limits, evacuation and the exclusions that actually matter.',
    datePublished: '2026-03-10',
    dateModified: '2026-03-10',
    author: {
      '@type': 'Organization',
      name: 'Go2Thailand',
      url: 'https://go2-thailand.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Go2Thailand',
      url: 'https://go2-thailand.com',
      logo: {
        '@type': 'ImageObject',
        url: siteLogoUrl,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://go2-thailand.com/travel-insurance-thailand/',
    },
  };

  return (
    <>
      <SEOHead
        title={isNl
          ? 'Beste Reisverzekering voor Thailand 2026 \u2014 Vanaf $0,99/dag'
          : 'Best Travel Insurance for Thailand 2026 \u2014 From $0.99/Day'}
        description={isNl
          ? 'We vergeleken Ekta (vanaf $0,99/dag) en SafetyWing ($62/4 weken) voor Thailand. Scooterdekking, medische limieten tot $250K, evacuatieregels & de uitsluitingen die er echt toe doen.'
          : 'We compared Ekta (from $0.99/day) and SafetyWing ($62/4 weeks) for Thailand. Scooter cover, medical limits up to $250K, evacuation rules & the exclusions that actually matter.'}
      >
        <meta
          name="keywords"
          content="travel insurance thailand, best travel insurance for thailand, thailand travel insurance, travel insurance for thailand, do i need travel insurance for thailand, best travel medical insurance for thailand, travel health insurance thailand"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      </SEOHead>

      <div className="min-h-screen bg-surface-cream">
        <section className="bg-surface-dark text-white">
          <div className="container-custom py-16">
            <div className="mx-auto max-w-4xl text-center">
              <p className="mb-2 font-script text-thailand-gold">{isNl ? 'Feitelijk Gecontroleerde Gids' : 'Fact-Checked Guide'}</p>
              <h1 className="mb-6 text-4xl font-bold font-heading lg:text-6xl">
                {isNl ? 'Beste Reisverzekering voor Thailand in 2026' : 'Best Travel Insurance for Thailand in 2026'}
              </h1>
              <p className="mx-auto mb-8 max-w-3xl text-lg opacity-90 lg:text-2xl">
                {isNl
                  ? 'Als ik vandaag Thailand zou boeken, zou ik geen verzekering kopen op basis van naamsbekendheid alleen. Ik zou eerst scooterregels, medische limieten, evacuatie en activiteitenuitsluitingen vergelijken, want dat zijn de details die ertoe doen als er echt iets misgaat.'
                  : 'If I were booking Thailand today, I would not buy insurance based on brand recognition alone. I would compare scooter rules, medical limits, evacuation, and activity exclusions first, because those are the details that matter when something actually goes wrong.'}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="#comparison"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-thailand-blue transition-colors hover:bg-slate-100"
                >
                  {isNl ? 'Ga naar Vergelijking' : 'Jump to Comparison'}
                </a>
                <AffiliateButton href={EKTA_LINK}>{isNl ? 'Vraag een Offerte Aan bij Ekta' : 'Get a Quote from Ekta'}</AffiliateButton>
                <a
                  href={SAFETYWING_LINK}
                  target="_blank"
                  rel="noopener noreferrer nofollow sponsored"
                  className="inline-flex items-center justify-center rounded-full border-2 border-white bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-thailand-blue"
                >
                  {isNl ? 'Vraag een Offerte Aan bij SafetyWing' : 'Get a Quote from SafetyWing'}
                </a>
              </div>
              <p className="mt-5 text-sm text-blue-100">
                {isNl
                  ? `Geverifieerd aan de hand van offici\u00eble aanbiederpagina's en volksgezondheidsrichtlijnen op ${LAST_VERIFIED}. Affiliate links zijn gemarkeerd en veranderen mijn vergelijking niet.`
                  : `Verified against official provider pages and public health guidance on ${LAST_VERIFIED}. Affiliate links are marked and do not change my comparison.`}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="container-custom py-6">
            <Breadcrumbs items={breadcrumbs} />
            <div className="mt-4 rounded-2xl bg-orange-50 px-4 py-3">
              <p className="text-center text-sm text-orange-800">
                {isNl
                  ? 'Deze pagina bevat affiliate links. We kunnen een commissie verdienen zonder extra kosten voor jou.'
                  : 'This page contains affiliate links. We may earn a commission at no extra cost to you.'}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white pb-6">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <nav aria-label={isNl ? 'Inhoudsopgave' : 'Table of contents'} className="rounded-2xl bg-slate-50 p-5">
                <p className="mb-3 font-semibold text-gray-900">{isNl ? 'In deze gids' : 'In this guide'}</p>
                <ul className="grid gap-2 text-sm sm:grid-cols-2">
                  <li><a href="#do-you-need" className="text-thailand-blue hover:underline">{isNl ? 'Heb je een Reisverzekering Nodig?' : 'Do You Need Travel Insurance?'}</a></li>
                  <li><a href="#comparison" className="text-thailand-blue hover:underline">{isNl ? 'Top 2 Keuzes in een Oogopslag' : 'Top 2 Picks at a Glance'}</a></li>
                  <li><a href="#reviews" className="text-thailand-blue hover:underline">{isNl ? 'Volledige Reviews' : 'Full Reviews'}</a></li>
                  <li><a href="#coverage" className="text-thailand-blue hover:underline">{isNl ? 'Wat Moet het Dekken?' : 'What Should It Cover?'}</a></li>
                  <li><a href="#risks" className="text-thailand-blue hover:underline">{isNl ? 'Thailand-Specifieke Risico\'s' : 'Thailand-Specific Risks'}</a></li>
                  <li><a href="#cost" className="text-thailand-blue hover:underline">{isNl ? 'Hoeveel Kost het?' : 'How Much Does It Cost?'}</a></li>
                  <li><a href="#how-to-buy" className="text-thailand-blue hover:underline">{isNl ? 'Hoe te Kopen' : 'How to Buy'}</a></li>
                  <li><a href="#faq" className="text-thailand-blue hover:underline">{isNl ? 'Veelgestelde Vragen' : 'Frequently Asked Questions'}</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </section>

        <section id="do-you-need" className="bg-white py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <p className="section-label text-center">{isNl ? 'Snel Antwoord' : 'Quick Answer'}</p>
              <h2 className="mb-6 text-center text-3xl font-bold font-heading text-gray-900">
                {isNl ? 'Heb je een Reisverzekering Nodig voor Thailand?' : 'Do You Need Travel Insurance for Thailand?'}
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <SectionCard title={isNl ? 'Kort antwoord: ja' : 'Short answer: yes'}>
                  <p>
                    {isNl
                      ? 'Thailand is makkelijk om van te houden en makkelijk om te onderschatten. De dagelijkse kosten kunnen laag zijn, maar \u00e9\u00e9n verblijf in een priv\u00e9ziekenhuis is genoeg om alle besparingen van budgetvliegen of dagelijks streetfood eten teniet te doen.'
                      : 'Thailand is easy to love and easy to underestimate. Day-to-day costs can be low, but one private-hospital stay is enough to erase any savings from flying budget or eating street food every day.'}
                  </p>
                  <p>
                    {isNl
                      ? 'Bumrungrad publiceert kamerprijzen die al in de duizenden baht per nacht beginnen voordat specialistenkosten, scans, chirurgie of evacuatie worden meegerekend. CDC-richtlijnen voor Thailand signaleren ook verkeersveiligheid, voedsel- en waterblootstelling, hitte en zwemgevaren als re\u00eble reizigersrisico\'s.'
                      : 'Bumrungrad publishes room rates that already start in the thousands of baht per night before specialist fees, scans, surgery, or evacuation are added. CDC guidance for Thailand also flags road safety, food and water exposure, heat, and swimming hazards as real traveler risks.'}
                  </p>
                </SectionCard>
                <SectionCard title={isNl ? 'Waarom mensen verrast worden' : 'Why people get caught out'}>
                  <p>
                    {isNl
                      ? 'De grootste fout is de goedkoopste polis kopen en aannemen dat "Thailand is goedkoop" betekent dat de claim ook goedkoop zal zijn. Dat is vaak niet zo, vooral als er een scootercrash, duikprobleem of noodevacuatie vanaf een eiland bij betrokken is.'
                      : 'The biggest mistake is buying the cheapest policy and assuming \u201cThailand is cheap\u201d means the claim will be cheap too. It often is not, especially if a scooter crash, diving issue, or island transfer emergency is involved.'}
                  </p>
                  <p>
                    {isNl
                      ? 'De tweede fout is aannemen dat motorfietsen en activiteiten standaard gedekt zijn. Dat is vaak niet het geval. Daarom let ik meer op uitsluitingen, rijbewijsregels en evacuatievoorwaarden dan op een kopprijs.'
                      : 'The second mistake is assuming motorbikes and activities are covered by default. They often are not. That is why I care more about exclusions, license rules, and evacuation language than a headline premium.'}
                  </p>
                  <p>
                    {isNl
                      ? 'Zoek op GoFundMe naar "Thailand hospital bill" of "scooter accident Thailand" en je vindt tientallen inzamelingsacties van reizigers die zonder dekking gingen of de verkeerde polis hadden. Die verhalen zijn te voorkomen.'
                      : 'Search GoFundMe for \u201cThailand hospital bill\u201d or \u201cscooter accident Thailand\u201d and you will find dozens of fundraisers from travelers who went without cover or had the wrong policy. Those stories are preventable.'}
                  </p>
                </SectionCard>
              </div>
            </div>
          </div>
        </section>

        <section id="comparison" className="scroll-mt-20 py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-5xl">
              <p className="section-label text-center">{isNl ? 'Onze Top Keuzes' : 'Top Picks'}</p>
              <h2 className="mb-4 text-center text-3xl font-bold font-heading text-gray-900">
                {isNl ? 'Onze Top 2 Keuzes in een Oogopslag' : 'Our Top 2 Picks at a Glance'}
              </h2>
              <p className="mx-auto mb-8 max-w-3xl text-center text-gray-600">
                {isNl
                  ? 'Ik zou eerst kiezen tussen deze twee. EKTA past makkelijker bij een korte Thailand-vakantie. SafetyWing is sterker voor langere reizen en nomadenstijl-verblijven.'
                  : 'I would choose between these two first. EKTA is easier to fit around a short Thailand holiday. SafetyWing is stronger for longer travel and nomad-style stays.'}
              </p>
              <div className="overflow-x-auto rounded-2xl bg-white shadow-md">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-4 text-left font-semibold text-gray-900">{isNl ? 'Kenmerk' : 'Feature'}</th>
                      <th className="px-4 py-4 text-left font-semibold text-gray-900">
                        Ekta Insurance
                      </th>
                      <th className="px-4 py-4 text-left font-semibold text-gray-900">
                        SafetyWing
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    <tr>
                      <td className="px-4 py-4 font-medium text-gray-900">{isNl ? 'Beste voor' : 'Best for'}</td>
                      <td className="px-4 py-4 text-gray-700">{isNl ? 'Korte reizen en vakanties van 1 tot 4 weken' : 'Short trips and 1 to 4 week holidays'}</td>
                      <td className="px-4 py-4 text-gray-700">
                        {isNl ? 'Digitale nomaden en langer flexibel reizen' : 'Digital nomads and longer flexible travel'}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-medium text-gray-900">{isNl ? 'Prijs vanaf' : 'Price from'}</td>
                      <td className="px-4 py-4 text-gray-700">{isNl ? '$0,99/dag op de openbare site' : '$0.99/day on the public site'}</td>
                      <td className="px-4 py-4 text-gray-700">
                        {isNl
                          ? 'Leeftijdsgebonden offerte; offici\u00eble pagina toonde $62,72 / 4 weken bij controle'
                          : 'Age-based live quote; official page showed $62.72 / 4 weeks when checked'}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-medium text-gray-900">{isNl ? 'Medische dekking' : 'Medical coverage'}</td>
                      <td className="px-4 py-4 text-gray-700">
                        {isNl ? 'Thailand-pagina toont opties van $50.000 en $125.000' : 'Thailand page highlights $50,000 and $125,000 options'}
                      </td>
                      <td className="px-4 py-4 text-gray-700">$250,000</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-medium text-gray-900">{isNl ? 'Scooter / motorfiets' : 'Scooter / motorbike'}</td>
                      <td className="px-4 py-4 text-gray-700">
                        {isNl ? 'Vermeld onder Active rest en hoger' : 'Listed under Active rest and above'}
                      </td>
                      <td className="px-4 py-4 text-gray-700">
                        {isNl
                          ? 'Motorongelukken kunnen gedekt zijn met geldig rijbewijs en helm'
                          : 'Motor accidents can be covered with valid license and helmet'}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-medium text-gray-900">{isNl ? 'Avontuurlijke activiteiten' : 'Adventure activities'}</td>
                      <td className="px-4 py-4 text-gray-700">
                        {isNl
                          ? 'Gestructureerd per Quiet rest, Active rest, Extreme en Sport categorie'
                          : 'Structured by Quiet rest, Active rest, Extreme, and Sport tiers'}
                      </td>
                      <td className="px-4 py-4 text-gray-700">
                        {isNl
                          ? 'Optionele activiteitenupgrades bestaan, maar bevestig exacte uitsluitingen'
                          : 'Optional activity upgrades exist, but confirm exact exclusions'}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-medium text-gray-900">{isNl ? 'Claims / ondersteuning' : 'Claims / support'}</td>
                      <td className="px-4 py-4 text-gray-700">{isNl ? '24/7 ondersteuning; polis per e-mail in 1 minuut' : '24/7 support; policy by email in 1 minute'}</td>
                      <td className="px-4 py-4 text-gray-700">
                        {isNl
                          ? 'Dashboard claims; typische vergoeding binnen 10 dagen of minder'
                          : 'Dashboard claims; typical reimbursement in 10 days or less'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <AffiliateButton href={EKTA_LINK}>{isNl ? 'Vraag een Offerte Aan bij Ekta' : 'Get a Quote from Ekta'}</AffiliateButton>
                <AffiliateButton href={SAFETYWING_LINK} variant="secondary">
                  {isNl ? 'Vraag een Offerte Aan bij SafetyWing' : 'Get a Quote from SafetyWing'}
                </AffiliateButton>
              </div>
            </div>
          </div>
        </section>

        <section id="reviews" className="scroll-mt-20 bg-white py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-5xl">
              <p className="section-label text-center">{isNl ? 'Volledige Reviews' : 'Full Reviews'}</p>
              <h2 className="mb-8 text-center text-3xl font-bold font-heading text-gray-900">
                {isNl ? 'Beste Reisverzekering voor Thailand \u2014 Volledige Reviews' : 'Best Travel Insurance for Thailand \u2014 Full Reviews'}
              </h2>
              <div className="space-y-8">
                <SectionCard title={isNl ? '1. Ekta Insurance \u2014 Beste voor Thailand-Specifieke Dekking' : '1. Ekta Insurance \u2014 Best for Thailand-Specific Coverage'}>
                  <p>
                    {isNl
                      ? 'EKTA valt op omdat het iets doet wat veel concurrenten niet doen: het heeft een speciale Thailand-pagina in plaats van je door een generieke wereldwijde funnel te sturen. Als ik een normale Thailand-vakantie boek en een snelle, landspecifieke offerte wil, maakt dat uit.'
                      : 'EKTA stands out because it does something many competitors do not: it has a dedicated Thailand page instead of forcing you through a generic worldwide funnel. If I am booking a normal Thailand holiday and want a fast, country-fit quote, that matters.'}
                  </p>
                  <p>
                    {isNl
                      ? 'Op de openbare site adverteert EKTA prijzen vanaf $0,99 per dag en presenteert Thailand-specifieke medische dekkingsopties op de landenpagina. De bredere site maakt ook de activiteitenlogica ongewoon duidelijk: Quiet rest voor standaardreizen, Active rest voor scooters en brommers, dan Extreme en Sport voor serieuzer risico.'
                      : 'On the public site, EKTA advertises pricing from $0.99 per day and presents Thailand-specific medical coverage options on its country page. The broader site also makes its activity logic unusually clear: Quiet rest for standard trips, Active rest for things like scooters and mopeds, then Extreme and Sport for more serious risk.'}
                  </p>
                  <p>
                    {isNl
                      ? 'De andere reden waarom ik EKTA leuk vind voor Thailand is de transparantie over waar je voor betaalt. De tarieftabellen laten zien dat sommige transportvoordelen, waaronder medische luchtvaart en evacuatie naar je thuisland, alleen op sterkere plannen verschijnen. Dat maakt het veel makkelijker om te begrijpen waar een goedkoop plan in de echte wereld ophoudt goedkoop te zijn.'
                      : 'The other reason I like EKTA for Thailand is transparency around what you are paying for. Its tariff tables show that some transport benefits, including medical aviation and evacuation to your home country, only appear on stronger plans. That makes it much easier to understand where a cheap plan stops being cheap in the real world.'}
                  </p>
                  <p>
                    {isNl
                      ? 'EKTA is geen nieuwkomer. Het bedrijf zit al meer dan 12 jaar in de reisverzekeringenmarkt, heeft meer dan 6,2 miljoen polissen verkocht en heeft een 4,9 op 5 klantenbeoordeling op de openbare reviewpagina\'s. Dat soort track record telt als je iemand vertrouwt met een medische claim aan de andere kant van de wereld.'
                      : 'EKTA is not a newcomer. The company has been in the travel insurance market for over 12 years, has sold more than 6.2 million policies, and holds a 4.9 out of 5 customer rating on its public review pages. That kind of track record matters when you are trusting someone with a medical claim on the other side of the world.'}
                  </p>
                  <p>
                    {isNl
                      ? 'Ik zou EKTA als eerste kiezen voor korte reizen, stellen, backpackers en iedereen die een polis wil opbouwen rond scooterrijden of activiteitscategorie\u00ebn zonder te betalen voor een doorlopend abonnement dat ze niet nodig hebben.'
                      : 'I would pick EKTA first for short trips, couples, backpackers, and anyone who wants to build a policy around scooter riding or activity tiers without paying for a rolling subscription they do not need.'}
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-green-50 p-5">
                      <p className="mb-3 font-semibold text-green-900">{isNl ? 'Wat ik goed vind' : 'What I like'}</p>
                      <ul className="space-y-2 text-sm text-green-800">
                        <li>{isNl ? 'Openbare prijzen beginnen bij $0,99/dag.' : 'Public pricing starts at $0.99/day.'}</li>
                        <li>{isNl ? 'Speciale Thailand-landingspagina.' : 'Dedicated Thailand landing page.'}</li>
                        <li>{isNl ? '24/7 ondersteuning en polislevering per e-mail in ongeveer 1 minuut.' : '24/7 support and policy delivery by email in about 1 minute.'}</li>
                        <li>{isNl ? 'Activiteitscategorie\u00ebn maken scooterdekking makkelijker te beoordelen voordat je koopt.' : 'Activity tiers make scooter cover easier to judge before you buy.'}</li>
                        <li>{isNl ? '4,9/5 beoordeling met 6,2M+ verkochte polissen in 12+ jaar.' : '4.9/5 rating with 6.2M+ policies sold over 12+ years.'}</li>
                      </ul>
                    </div>
                    <div className="rounded-2xl bg-amber-50 p-5">
                      <p className="mb-3 font-semibold text-amber-900">{isNl ? 'Let op' : 'Watch out for'}</p>
                      <ul className="space-y-2 text-sm text-amber-800">
                        <li>{isNl ? 'Medische evacuatie en luchtvaart alleen op sterkere plannen.' : 'Medical evacuation and aviation only on stronger plans.'}</li>
                        <li>{isNl ? 'Lagere medische limieten ($50K/$125K) vergeleken met SafetyWing\'s $250K.' : 'Lower medical limits ($50K/$125K) compared to SafetyWing\u2019s $250K.'}</li>
                        <li>{isNl ? 'Niet abonnementsgebaseerd \u2014 minder flexibel voor open reizen.' : 'Not subscription-based \u2014 less flexible for open-ended trips.'}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <AffiliateButton href={EKTA_LINK}>{isNl ? 'Vraag een Offerte Aan bij Ekta' : 'Get a Quote from Ekta'}</AffiliateButton>
                  </div>
                </SectionCard>

                <SectionCard title={isNl ? '2. SafetyWing \u2014 Beste voor Digitale Nomaden & Langverblijvers' : '2. SafetyWing \u2014 Best for Digital Nomads & Long-Term Travelers'}>
                  <p>
                    {isNl
                      ? 'SafetyWing is de betere keuze als je Thailand-reis open-ended is, onderdeel is van een bredere Azi\u00eb-route of gekoppeld is aan remote werk. Het grote voordeel is de abonnementsstijl. Je bouwt niet elke keer een eenmalige vakantiepolis als je data veranderen.'
                      : 'SafetyWing is the cleaner choice if your Thailand trip is open-ended, part of a broader Asia loop, or tied to remote work. The big advantage is its subscription-style structure. You are not building a one-off holiday policy every time your dates change.'}
                  </p>
                  <p>
                    {isNl
                      ? 'Op de offici\u00eble productpagina die ik controleerde, toonde de openbare offerte voor leeftijden 10 tot 39 $62,72 per vier weken, met $250.000 medische dekking en $100.000 medische evacuatie. SafetyWing stelt ook dat het Essential-plan op elk moment kan worden opgezegd door de abonnementsbetalingen via het dashboard te stoppen.'
                      : 'On the official product page I checked, the public quote for ages 10 to 39 showed $62.72 per four weeks, with $250,000 in medical coverage and $100,000 in medical evacuation. SafetyWing also states that its Essential plan can be cancelled any time by stopping subscription payments from the dashboard.'}
                  </p>
                  <p>
                    {isNl
                      ? 'SafetyWing is ook explicieter dan sommige merken over claimsadministratie. De FAQ zegt dat claims worden ingediend via het dashboard en doorgaans binnen 10 dagen of minder worden vergoed per bankoverschrijving. Voor langere reizen is die operationele duidelijkheid iets waard.'
                      : 'SafetyWing is also more explicit than some brands about claims admin. Its FAQ says claims are filed through the dashboard and are typically reimbursed within 10 days or less by bank transfer. For longer trips, that operational clarity is worth something.'}
                  </p>
                  <p>
                    {isNl
                      ? 'De belangrijkste waarschuwing betreft activiteiten. SafetyWing zegt dat motorongelukken gedekt kunnen zijn bij recreatief motorrijden, maar alleen als je een geldig rijbewijs hebt, een helm draagt en de lokale wet niet overtreedt. De Description of Coverage vermeldt ook vechtsporten als uitgesloten activiteiten, dus ik zou niet op het standaardplan vertrouwen voor Muay Thai zonder schriftelijke bevestiging.'
                      : 'The main caution is activities. SafetyWing says motor accidents can be covered for recreational motorcycle driving, but only if you have a valid license, wear a helmet, and are not breaking local law. Its Description of Coverage also lists martial arts among excluded activities, so I would not rely on the standard plan for Muay Thai without written confirmation.'}
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-green-50 p-5">
                      <p className="mb-3 font-semibold text-green-900">{isNl ? 'Wat ik goed vind' : 'What I like'}</p>
                      <ul className="space-y-2 text-sm text-green-800">
                        <li>{isNl ? 'Sterke match voor digitale nomaden en lange verblijven.' : 'Strong fit for digital nomads and long stays.'}</li>
                        <li>{isNl ? '$250.000 medische dekking en $100.000 evacuatie op het openbare plan.' : '$250,000 medical coverage and $100,000 evacuation on the public plan.'}</li>
                        <li>{isNl ? 'Op elk moment opzegbaar abonnementsmodel.' : 'Cancel-anytime subscription model.'}</li>
                        <li>{isNl ? 'Claimproces is duidelijk gedocumenteerd.' : 'Claims process is clearly documented.'}</li>
                      </ul>
                    </div>
                    <div className="rounded-2xl bg-amber-50 p-5">
                      <p className="mb-3 font-semibold text-amber-900">{isNl ? 'Let op' : 'Watch out for'}</p>
                      <ul className="space-y-2 text-sm text-amber-800">
                        <li>{isNl ? 'Vechtsporten (inclusief Muay Thai) uitgesloten op standaardplan.' : 'Martial arts (including Muay Thai) excluded on standard plan.'}</li>
                        <li>{isNl ? 'Motorfietsdekking vereist geldig rijbewijs en helm \u2014 geen uitzonderingen.' : 'Motorbike cover requires valid license and helmet \u2014 no exceptions.'}</li>
                        <li>{isNl ? 'Hogere instapprijs dan EKTA voor korte, vaste reizen.' : 'Higher entry price than EKTA for short, fixed trips.'}</li>
                      </ul>
                    </div>
                  </div>
                  <SafetyWingWidget />
                  <div className="flex flex-wrap gap-3">
                    <AffiliateButton href={SAFETYWING_LINK}>
                      {isNl ? 'Vraag een Offerte Aan bij SafetyWing' : 'Get a Quote from SafetyWing'}
                    </AffiliateButton>
                  </div>
                </SectionCard>
              </div>
            </div>
          </div>
        </section>

        <section id="coverage" className="scroll-mt-20 py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-5xl">
              <p className="section-label text-center">{isNl ? 'Dekkingschecklist' : 'Coverage Checklist'}</p>
              <h2 className="mb-8 text-center text-3xl font-bold font-heading text-gray-900">
                {isNl ? 'Wat Moet je Thailand Reisverzekering Dekken?' : 'What Should Your Thailand Travel Insurance Cover?'}
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <SectionCard title={isNl ? 'Ononderhandelbaar' : 'Non-negotiables'}>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li>{isNl ? 'Minimaal $100.000 aan medische nooddekking. Meer is beter.' : 'At least $100,000 in emergency medical coverage. More is better.'}</li>
                    <li>{isNl ? 'Medische evacuatie en repatri\u00ebring.' : 'Medical evacuation and repatriation.'}</li>
                    <li>{isNl ? 'Motorfiets- of scooterdekking als je van plan bent te rijden.' : 'Motorbike or scooter cover if you plan to ride at all.'}</li>
                    <li>{isNl ? 'Duidelijke activiteitenvoorwaarden voor duiken, klimmen, surfen of eilandreizen.' : 'Clear activity wording for diving, climbing, surfing, or island trips.'}</li>
                    <li>{isNl ? '24/7 noodhulp en een praktisch claimproces.' : '24/7 emergency assistance and a practical claims process.'}</li>
                  </ul>
                </SectionCard>
                <SectionCard title={isNl ? 'Fijn om te hebben, afhankelijk van je reis' : 'Nice to have, depending on your trip'}>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li>{isNl ? 'Reisonderbreking of annulering als je vluchten en hotels vooruitbetaalt.' : 'Trip interruption or cancellation if you are prepaying flights and hotels.'}</li>
                    <li>{isNl ? 'Bagagedekking als je reist met dure elektronica.' : 'Baggage cover if you travel with expensive electronics.'}</li>
                    <li>{isNl ? 'Hogere transportvoordelen als je op eilanden of afgelegen routes bent.' : 'Higher transport benefits if you will be on islands or remote routes.'}</li>
                    <li>{isNl ? 'Schriftelijke bevestiging voor alles wat niche is, vooral Muay Thai.' : 'Written confirmation for anything niche, especially Muay Thai.'}</li>
                    <li>{isNl ? 'Eenvoudige vergoeding als je verwacht zelf te betalen en terug te claimen.' : 'Low-friction reimbursement if you expect to self-pay and claim back.'}</li>
                  </ul>
                </SectionCard>
              </div>
            </div>
          </div>
        </section>

        <section id="risks" className="scroll-mt-20 bg-white py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-5xl">
              <p className="section-label text-center">{isNl ? 'Thailand Risico\'s' : 'Thailand Risks'}</p>
              <h2 className="mb-8 text-center text-3xl font-bold font-heading text-gray-900">
                {isNl ? 'Thailand-Specifieke Risico\'s Waarvoor je Dekking Nodig Hebt' : 'Thailand-Specific Risks You Need Coverage For'}
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="mb-2 font-bold text-gray-900">{isNl ? 'Verkeers- en scooterongelukken' : 'Road and scooter crashes'}</h3>
                  <p className="text-sm text-gray-700">
                    {isNl
                      ? 'CDC benadrukt verkeersveiligheid voor Thailand. Dit is het eerste wat ik controleer in een polis, want een scooter is waar goedkope vakanties snel duur worden.'
                      : 'CDC highlights road safety for Thailand. This is the first thing I check in a policy because a scooter is where cheap holidays turn expensive fast.'}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="mb-2 font-bold text-gray-900">{isNl ? 'Voedsel- en waterproblemen' : 'Food and water issues'}</h3>
                  <p className="text-sm text-gray-700">
                    {isNl
                      ? 'De meeste gevallen zijn mild, maar uitdroging, infuusbehandeling en een bezoek aan een priv\u00e9kliniek kunnen nog steeds een claim worden. CDC voedsel- en drinkrichtlijnen zijn hier relevant.'
                      : 'Most cases are minor, but dehydration, IV treatment, and a private clinic visit can still become a claim. CDC food and drink guidance is relevant here.'}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="mb-2 font-bold text-gray-900">{isNl ? 'Knokkelkoorts (Dengue)' : 'Dengue fever'}</h3>
                  <p className="text-sm text-gray-700">
                    {isNl
                      ? 'Thailand heeft dengue-risico. Zowel WHO als CDC behandelen het als een serieus door muggen overgedragen probleem, vooral in warmere en nattere perioden.'
                      : 'Thailand has dengue risk. WHO and CDC both treat it as a serious mosquito-borne issue, especially in warmer and wetter periods.'}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="mb-2 font-bold text-gray-900">{isNl ? 'Zwem- en kwallenvaren' : 'Swimming and jellyfish hazards'}</h3>
                  <p className="text-sm text-gray-700">
                    {isNl
                      ? 'CDC-reisadvies voor Thailand waarschuwt expliciet voor zwemgevaren. Als je reis strandgericht is, negeer kustletsel en kwallensteken niet als uitzonderlijke gevallen.'
                      : 'CDC travel advice for Thailand explicitly warns about swimming hazards. If your trip is beach-heavy, do not dismiss coastal injuries and stings as edge cases.'}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="mb-2 font-bold text-gray-900">{isNl ? 'Duikincidenten' : 'Diving incidents'}</h3>
                  <p className="text-sm text-gray-700">
                    {isNl
                      ? 'Decompressieziekte is zeldzaam maar ernstig. Als duiken op het programma staat, controleer ik de activiteitenvoorwaarden voordat ik de polis boek, niet erna.'
                      : 'Decompression sickness is rare but serious. If diving is on the plan, I check activity wording before I book the policy, not after.'}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="mb-2 font-bold text-gray-900">{isNl ? 'Extreme hitte en uitdroging' : 'Extreme heat and dehydration'}</h3>
                  <p className="text-sm text-gray-700">
                    {isNl
                      ? 'De hitte van Thailand kan mensen die verder gezond zijn vloeren. CDC\'s hitte-richtlijnen zijn niet theoretisch als je in april of mei rondreist.'
                      : 'Thailand\'s heat can flatten people who are otherwise healthy. CDC\'s heat guidance is not theoretical if you are moving around in April or May.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="cost" className="scroll-mt-20 py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <p className="section-label text-center">{isNl ? 'Prijzen' : 'Pricing'}</p>
              <h2 className="mb-6 text-center text-3xl font-bold font-heading text-gray-900">
                {isNl ? 'Hoeveel Kost een Reisverzekering voor Thailand?' : 'How Much Does Travel Insurance for Thailand Cost?'}
              </h2>
              <div className="rounded-2xl bg-white p-6 shadow-md">
                <p className="mb-4 text-gray-700">
                  {isNl
                    ? `Ik geef liever transparante ranges weer in plaats van nepprecisie. De voorbeelden hieronder gebruiken openbare prijzen die ik heb gecontroleerd op ${LAST_VERIFIED}, maar je offerte verandert nog steeds op basis van leeftijd, woonplaats, data en activiteitskeuzes.`
                    : `I prefer to show transparent ranges instead of fake precision. The examples below use public pricing I checked on ${LAST_VERIFIED}, but your quote still changes with age, residence, dates, and activity choices.`}
                </p>
                <ul className="space-y-4 text-sm text-gray-700">
                  <li>
                    <strong>{isNl ? 'Backpacker voor 2 weken:' : 'Backpacker for 2 weeks:'}</strong>{' '}
                    {isNl
                      ? 'EKTA\'s openbare startprijs komt uit op ongeveer $13,86 voor 14 dagen, en de Active rest-categorie komt hoger uit. In de praktijk zou ik ruwweg $20 tot $40 budgetteren als je een realistischere Thailand-opzet wilt.'
                      : 'EKTA\u2019s public starting rate works out to about $13.86 for 14 days, and its Active rest tier comes out higher. In practice, I would budget roughly $20 to $40 if you want a more realistic Thailand setup.'}
                  </li>
                  <li>
                    <strong>{isNl ? 'Gezin voor 2 weken:' : 'Family for 2 weeks:'}</strong>{' '}
                    {isNl
                      ? 'er is geen eerlijk standaardbedrag omdat leeftijd de berekening verandert, maar zelfs met instapprijzen per dag passeren vier reizigers snel het "goedkope extra" stadium. Verwacht live offertes aan te vragen in plaats van te gokken.'
                      : 'there is no honest one-size figure because age changes the math, but even using entry-level daily pricing, four travelers quickly move past the \u201ccheap add-on\u201d stage. Expect to run live quotes rather than guess.'}
                  </li>
                  <li>
                    <strong>{isNl ? 'Digitale nomade voor 3 maanden:' : 'Digital nomad for 3 months:'}</strong>{' '}
                    {isNl
                      ? 'op basis van SafetyWing\'s gepubliceerde $62,72-per-4-weken prijs voor leeftijden 10 tot 39, komen drie maanden uit op ongeveer $188 v\u00f3\u00f3r eventuele extra\'s of leeftijdsopslagen.'
                      : 'using SafetyWing\u2019s published $62.72-per-4-weeks figure for ages 10 to 39, three months lands around $188 before any add-ons or age uplifts.'}
                  </li>
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  <AffiliateButton href={EKTA_LINK}>{isNl ? 'Bekijk Ekta Prijzen' : 'Check Ekta Pricing'}</AffiliateButton>
                  <AffiliateButton href={SAFETYWING_LINK} variant="secondary">
                    {isNl ? 'Bekijk SafetyWing Prijzen' : 'Check SafetyWing Pricing'}
                  </AffiliateButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-to-buy" className="scroll-mt-20 bg-white py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <p className="section-label text-center">{isNl ? 'Hoe te Kopen' : 'How to Buy'}</p>
              <h2 className="mb-6 text-center text-3xl font-bold font-heading text-gray-900">
                {isNl ? 'Hoe Koop je een Reisverzekering voor Thailand' : 'How to Buy Travel Insurance for Thailand'}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="mb-2 font-semibold text-gray-900">{isNl ? '1. Match de aanbieder met de reis' : '1. Match the provider to the trip'}</p>
                  <p className="text-sm text-gray-700">
                    {isNl
                      ? 'EKTA voor korte, vaste Thailand-reizen. SafetyWing voor flexibel of langer reizen.'
                      : 'EKTA for short, fixed Thailand trips. SafetyWing for flexible or longer travel.'}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="mb-2 font-semibold text-gray-900">{isNl ? '2. Controleer activiteitenregels' : '2. Check activity rules'}</p>
                  <p className="text-sm text-gray-700">
                    {isNl
                      ? 'Scooters, duiken, klimmen en Muay Thai moeten regel voor regel worden beoordeeld.'
                      : 'Scooters, diving, climbing, and Muay Thai should be reviewed line by line.'}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="mb-2 font-semibold text-gray-900">{isNl ? '3. Bevestig medische en evacuatielimieten' : '3. Confirm medical and evacuation limits'}</p>
                  <p className="text-sm text-gray-700">
                    {isNl
                      ? 'Dit is waar de goedkope polis vaak ophoudt goedkoop te lijken.'
                      : 'This is where the cheap policy often stops looking cheap.'}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="mb-2 font-semibold text-gray-900">{isNl ? '4. Sla de polis offline op' : '4. Save the policy offline'}</p>
                  <p className="text-sm text-gray-700">
                    {isNl
                      ? 'Bewaar je PDF, noodnummer en claiminstructies op je telefoon voordat je landt.'
                      : 'Keep your PDF, emergency number, and claim instructions on your phone before you land.'}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <AffiliateButton href={EKTA_LINK}>{isNl ? 'Koop via Ekta' : 'Buy via Ekta'}</AffiliateButton>
                <AffiliateButton href={SAFETYWING_LINK} variant="secondary">
                  {isNl ? 'Koop via SafetyWing' : 'Buy via SafetyWing'}
                </AffiliateButton>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-20 py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <p className="section-label text-center">FAQ</p>
              <h2 className="mb-8 text-center text-3xl font-bold font-heading text-gray-900">
                {isNl ? 'Veelgestelde Vragen' : 'Frequently Asked Questions'}
              </h2>
              <div className="space-y-5">
                {FAQ_ITEMS.map((item) => (
                  <div key={item.question} className="rounded-2xl bg-white p-6 shadow-md">
                    <h3 className="mb-3 text-xl font-bold font-heading text-gray-900">
                      {item.question}
                    </h3>
                    <p className="text-gray-700">{item.answer}</p>
                    {(item.question === 'What is the best travel insurance for Thailand?' || item.question === 'Wat is de beste reisverzekering voor Thailand?') && (
                      <div className="mt-4 flex flex-wrap gap-3">
                        <AffiliateButton href={EKTA_LINK}>{isNl ? 'Vergelijk Ekta' : 'Compare Ekta'}</AffiliateButton>
                        <AffiliateButton href={SAFETYWING_LINK} variant="secondary">
                          {isNl ? 'Vergelijk SafetyWing' : 'Compare SafetyWing'}
                        </AffiliateButton>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <p className="section-label text-center">{isNl ? 'Reis Plannen' : 'Trip Planning'}</p>
              <h2 className="mb-6 text-center text-3xl font-bold font-heading text-gray-900">
                {isNl ? 'Plan je Reis' : 'Plan Your Trip'}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Link
                  href="/visa/"
                  className="rounded-2xl bg-white p-5 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <h3 className="mb-1 font-bold font-heading text-gray-900">{isNl ? 'Visumgids' : 'Visa Guide'}</h3>
                  <p className="text-sm text-gray-600">{isNl ? 'Toegangseisen, visum bij aankomst en e-visum voor Thailand.' : 'Entry requirements, visa on arrival, and e-visa for Thailand.'}</p>
                </Link>
                <Link
                  href="/weather/"
                  className="rounded-2xl bg-white p-5 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <h3 className="mb-1 font-bold font-heading text-gray-900">{isNl ? 'Weergids' : 'Weather Guide'}</h3>
                  <p className="text-sm text-gray-600">{isNl ? 'Beste tijd om te bezoeken, regenseizoen en regionale klimaatverschillen.' : 'Best time to visit, rainy season, and regional climate differences.'}</p>
                </Link>
                <Link
                  href="/compare/"
                  className="rounded-2xl bg-white p-5 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <h3 className="mb-1 font-bold font-heading text-gray-900">{isNl ? 'Vergelijk Bestemmingen' : 'Compare Destinations'}</h3>
                  <p className="text-sm text-gray-600">{isNl ? 'Zij-aan-zij vergelijkingen van Thaise steden om te helpen beslissen waar je naartoe gaat.' : 'Side-by-side comparisons of Thai cities to help you decide where to go.'}</p>
                </Link>
                <Link
                  href="/city/"
                  className="rounded-2xl bg-white p-5 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <h3 className="mb-1 font-bold font-heading text-gray-900">{isNl ? 'Stadsgidsen' : 'City Guides'}</h3>
                  <p className="text-sm text-gray-600">{isNl ? 'Uitgebreide gidsen voor alle 33 Thaise steden \u2014 attracties, eten, vervoer en meer.' : 'In-depth guides for all 33 Thai cities \u2014 attractions, food, transport, and more.'}</p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-5xl">
              <p className="section-label text-center">{isNl ? 'Gerelateerde Gidsen' : 'Related Guides'}</p>
              <h2 className="mb-6 text-center text-3xl font-bold font-heading text-gray-900">
                {isNl ? 'Lees Dit Voordat je Gaat' : 'Read These Before You Go'}
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {INTERNAL_GUIDES.map((guide) => (
                  <Link
                    key={guide.href}
                    href={guide.href}
                    className="rounded-2xl bg-surface-cream p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                  >
                    <h3 className="mb-2 font-bold font-heading text-gray-900">{guide.title}</h3>
                    <p className="text-sm text-gray-600">{guide.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl rounded-3xl bg-surface-dark px-6 py-10 text-center text-white">
              <p className="mb-2 font-script text-thailand-gold">{isNl ? 'Laatste Keuze' : 'Final Pick'}</p>
              <h2 className="mb-4 text-3xl font-bold font-heading">
                {isNl ? 'Als ik snel moest kiezen' : 'If I had to choose quickly'}
              </h2>
              <p className="mx-auto mb-6 max-w-2xl text-blue-100">
                {isNl
                  ? 'Ik zou kiezen voor EKTA voor een normale korte Thailand-vakantie en SafetyWing voor een lang verblijf of nomadenreis. Hoe dan ook, ik zou de polis pas kopen na het controleren van scooterregels, evacuatievoorwaarden en activiteitenuitsluitingen.'
                  : 'I would go with EKTA for a normal short Thailand holiday and SafetyWing for a long stay or nomad trip. Either way, I would buy the policy only after checking scooter rules, evacuation wording, and activity exclusions.'}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <AffiliateButton href={EKTA_LINK}>{isNl ? 'Vraag een Offerte Aan bij Ekta' : 'Get a Quote from Ekta'}</AffiliateButton>
                <AffiliateButton href={SAFETYWING_LINK} variant="secondary">
                  {isNl ? 'Vraag een Offerte Aan bij SafetyWing' : 'Get a Quote from SafetyWing'}
                </AffiliateButton>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
