import { GetStaticProps } from 'next';
import SEOHead from '../../components/SEOHead';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Breadcrumbs from '../../components/Breadcrumbs';
import EmailCapture from '../../components/EmailCapture';
import PreFooterAffiliateBanner from '../../components/PreFooterAffiliateBanner';
import { getAllVisas } from '../../lib/visas';

interface Visa {
  id: number;
  slug: string;
  title: { en: string; nl: string };
  icon: string;
  duration: string;
  cost: string;
  category: string;
}

interface VisaPageProps {
  visas: Visa[];
}

export default function VisaIndexPage({ visas }: VisaPageProps) {
  const { locale } = useRouter();
  const lang = (locale === 'nl' ? 'nl' : 'en') as 'en' | 'nl';

  const isNl = lang === 'nl';

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Visum Gids' : 'Visa Guide', href: '/visa/' }
  ];

  const categories = [
    { key: 'tourist', label: { en: 'Tourist Visas', nl: 'Toeristenvisa' }, icon: '' },
    { key: 'work', label: { en: 'Work & Digital Nomad', nl: 'Werk & Digitale Nomade' }, icon: '' },
    { key: 'long-stay', label: { en: 'Long-Stay Visas', nl: 'Langverblijfvisa' }, icon: '' },
    { key: 'premium', label: { en: 'Premium Visas', nl: 'Premium Visa' }, icon: '' },
    { key: 'general', label: { en: 'Processes & Info', nl: 'Processen & Info' }, icon: '' }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": isNl ? "Thailand Visum Gids 2026" : "Thailand Visa Guide 2026",
    "description": isNl
      ? "Complete gids voor alle Thailand visum types in 2026. Visumvrije toegang, toeristenvisum, digitale nomade visum, pensioenvisum en meer."
      : "Complete guide to all Thailand visa types in 2026. Visa-free entry, tourist visa, digital nomad visa, retirement visa and more.",
    "url": "https://go2-thailand.com/visa/",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": `https://go2-thailand.com${crumb.href}`
      }))
    }
  };

  const faqItems = isNl ? [
    {
      question: 'Kan ik Thailand binnenkomen zonder visum?',
      answer: 'Ja, burgers van 93 landen krijgen 60 dagen visumvrije toegang. Dit geldt voor de meeste paspoorthouders uit Europa, Amerika en Azië-Pacific. Je kunt je verblijf met 30 dagen verlengen (kosten: 1.900 THB) bij elk immigratiekantoor in Thailand.',
    },
    {
      question: 'Hoe lang mag ik als toerist in Thailand verblijven?',
      answer: 'Met visumvrije toegang kun je 60 dagen blijven, verlengbaar tot 90 dagen bij immigratie. Een toeristenvisum (TR) verkregen bij een Thaise ambassade geeft ook 60 dagen, verlengbaar tot 90. Meerdere binnenkomsten zijn mogelijk met een Multiple Entry Tourist Visa (METV), geldig voor 6 maanden.',
    },
    {
      question: 'Kan ik mijn Thailand visum verlengen?',
      answer: 'Ja, bezoek een immigratiekantoor in Thailand met je paspoort, een 4x6cm foto, 1.900 THB en een ingevuld TM.7 formulier. Het proces duurt meestal 1-3 uur. Grote kantoren bevinden zich in Bangkok (Chaeng Wattana), Chiang Mai, Phuket en Pattaya.',
    },
    {
      question: 'Heb ik een retourticket nodig om Thailand binnen te komen?',
      answer: 'Luchtvaartmaatschappijen kunnen om een retour- of doorreisticket vragen voor het boarden, maar Thaise immigratie vraagt er zelden naar. Een boeking hebben (zelfs een restitueerbare) voorkomt mogelijke problemen bij het inchecken.',
    },
  ] : [
    {
      question: 'Can I enter Thailand without a visa?',
      answer: 'Yes, citizens of 93 countries get 60-day visa-free entry. This applies to most passport holders from Europe, the Americas, and Asia-Pacific. You can extend your stay by 30 days (cost: 1,900 THB) at any immigration office in Thailand.',
    },
    {
      question: 'How long can I stay in Thailand as a tourist?',
      answer: 'With visa-free entry, you can stay 60 days, extendable to 90 days at immigration. A Tourist Visa (TR) obtained from a Thai embassy also gives 60 days, extendable to 90. Multiple entries are possible with a Multiple Entry Tourist Visa (METV), valid for 6 months.',
    },
    {
      question: 'Can I extend my Thailand visa?',
      answer: 'Yes, visit any immigration office in Thailand with your passport, a 4x6cm photo, 1,900 THB, and a completed TM.7 form. The process typically takes 1-3 hours. Major offices are in Bangkok (Chaeng Wattana), Chiang Mai, Phuket, and Pattaya.',
    },
    {
      question: 'Do I need a return ticket to enter Thailand?',
      answer: 'Airlines may check for a return or onward ticket before boarding, but Thai immigration rarely asks. Having a booking (even a refundable one) avoids potential hassle at check-in. Some travelers use a refundable flight booking as proof.',
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };

  return (
    <>
      <SEOHead
        title="Thailand Visa Guide 2026: Requirements, Exemptions & How to Apply | Go2Thailand"
        description="Complete Thailand visa guide 2026. 93 countries qualify for 60-day visa-free entry. Tourist visa, digital nomad visa (DTV), retirement visa — requirements, costs, extensions & overstay rules."
      >
        <meta name="keywords" content="Thailand visa, Thailand visa 2026, visa free Thailand, tourist visa Thailand, digital nomad visa Thailand, DTV Thailand, thailand visa for us citizens, thailand visa extension" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero Section */}
        <section className="bg-surface-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <p className="font-script text-thailand-gold mb-2">Visa Info</p>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
                Thailand Visa Guide 2026
              </h1>
              <p className="text-xl lg:text-2xl mb-4 max-w-3xl mx-auto opacity-90">
                {lang === 'nl'
                  ? 'Alles wat je moet weten over visa voor Thailand'
                  : 'Everything you need to know about visas for Thailand'}
              </p>
              <p className="text-lg max-w-2xl mx-auto opacity-80">
                {lang === 'nl'
                  ? 'Van visumvrije toegang tot langverblijfvisa - vind het juiste visum voor jouw reis'
                  : 'From visa-free entry to long-stay visas — find the right visa for your trip'}
              </p>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </section>

        {/* Quick Summary */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-green-50 border-0 rounded-2xl p-6">
              <h2 className="text-lg font-bold font-heading text-green-800 mb-2">
                {lang === 'nl' ? 'Goed nieuws voor Nederlandse reizigers!' : 'Good news for most travelers!'}
              </h2>
              <p className="text-green-700">
                {lang === 'nl'
                  ? 'Sinds 2024 kunnen Nederlanders, Belgen en burgers van 90+ landen Thailand bezoeken zonder visum voor 60 dagen. Verlengbaar met 30 dagen bij immigratie.'
                  : 'Since 2024, citizens of 93+ countries can enter Thailand visa-free for 60 days. Extendable by 30 days at immigration for 1,900 THB.'}
              </p>
            </div>
          </div>
        </section>

        {/* Visa Categories */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {categories.map(category => {
              const categoryVisas = visas.filter(v => v.category === category.key);
              if (categoryVisas.length === 0) return null;

              return (
                <div key={category.key} className="mb-12">
                  <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">
                    {category.label[lang]}
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryVisas.map(visa => (
                      <Link
                        key={visa.id}
                        href={`/visa/${visa.slug}/`}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all p-6 group"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <span className="text-3xl">{visa.icon}</span>
                          <span className="bg-thailand-blue/10 text-thailand-blue px-2 py-1 rounded-full text-xs font-medium">
                            {visa.cost}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors mb-2">
                          {visa.title[lang]}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600">
                          <span>Duration: {visa.duration}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Do You Need a Visa? */}
        <section className="py-12 bg-white border-t" id="do-you-need-a-visa">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Do You Need a Visa for Thailand?</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                Most tourists <strong>do not need a visa</strong> to visit Thailand. Since 2024, citizens of 93 countries can enter Thailand visa-free for up to 60 days — double the previous 30-day allowance. This covers most passport holders from Europe, North America, Australia, and parts of Asia and South America.
              </p>
              <p>
                If 60 days is not enough, you can extend your stay by 30 days at any Thai immigration office for ฿1,900, giving you a total of 90 days without ever applying for a visa. For even longer stays, Thailand offers a range of visa options including the <Link href="/visa/tourist-visa/">Tourist Visa (TR)</Link>, <Link href="/visa/digital-nomad-visa/">Digital Nomad Visa (DTV)</Link>, and <Link href="/visa/retirement-visa/">Retirement Visa</Link>.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 not-prose my-6">
                <p className="text-amber-800 text-sm font-medium">⚠️ <strong>April 2026 update:</strong> The Thai government is reviewing a possible reduction from 60 to 30 days for visa-free entry. As of April 2026, the 60-day rule is still active — no changes have taken effect. We will update this page if the policy changes.</p>
              </div>
              <p>
                For nationalities not on the exemption list, <strong>Visa on Arrival (VOA)</strong> is available for citizens of 19 additional countries at a cost of ฿2,000 for 15 days. Thailand has also replaced the paper TM.6 arrival card with the <Link href="/visa/digital-arrival-card/">Thailand Digital Arrival Card (TDAC)</Link>, which you can fill out online before your trip.
              </p>
            </div>
          </div>
        </section>

        {/* Visa Exemption Countries */}
        <section className="py-12 border-t" id="visa-exemption">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Visa Exemption: 60-Day Free Entry</h2>
            <p className="text-gray-600 mb-8">Citizens of 93 countries can enter Thailand without a visa for up to 60 days. Here are the major countries grouped by region:</p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-bold font-heading text-gray-900 mb-3">🇪🇺 Europe</h3>
                <p className="text-sm text-gray-600">UK, France, Germany, Netherlands, Belgium, Italy, Spain, Sweden, Switzerland, Norway, Denmark, Finland, Austria, Ireland, Poland, Czech Republic, Portugal, Greece, Hungary, Iceland, Luxembourg, and more</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-bold font-heading text-gray-900 mb-3">🇺🇸 Americas</h3>
                <p className="text-sm text-gray-600">United States, Canada, Brazil, Argentina, Chile, Mexico, Peru, Costa Rica, Honduras, Uruguay</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-bold font-heading text-gray-900 mb-3">🌏 Asia-Pacific</h3>
                <p className="text-sm text-gray-600">Australia, New Zealand, Japan, South Korea (90 days), Hong Kong, Macao, Taiwan, Israel</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-bold font-heading text-gray-900 mb-3">🌍 Middle East & Africa</h3>
                <p className="text-sm text-gray-600">UAE, Qatar, Kuwait, Bahrain, Oman, Saudi Arabia, South Africa</p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 mb-6">
              <p className="text-blue-800 text-sm"><strong>ASEAN countries:</strong> Laos, Vietnam, and Timor-Leste get 30 days. Cambodia and Myanmar get 14 days. Singapore, Malaysia, Indonesia, Philippines, and Brunei get 30 days under separate bilateral agreements.</p>
            </div>

            <p className="text-gray-600">For the complete official list, check the <a href="https://www.mfa.go.th" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">Thai Ministry of Foreign Affairs</a> website. You can also read our detailed <Link href="/visa/visa-free-entry/" className="text-thailand-blue hover:underline">visa-free entry guide</Link>.</p>
          </div>
        </section>

        {/* Thailand Visa for US Citizens */}
        <section className="py-12 bg-white border-t" id="us-citizens">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Thailand Visa for US Citizens</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                US citizens can enter Thailand <strong>without a visa for 60 days</strong>. No application, no embassy visit, no fee — just show your passport at immigration. This makes Thailand one of the easiest countries in Southeast Asia for Americans to visit.
              </p>
              <h3 className="font-heading">Extending Your Stay</h3>
              <p>
                If 60 days is not enough, visit any immigration office to extend for 30 more days (฿1,900). You will need your passport, a 4×6cm photo, the completed TM.7 form, and the fee. The process typically takes 1–3 hours. Major immigration offices are in Bangkok (Chaeng Wattana), Chiang Mai, Phuket, and Pattaya.
              </p>
              <h3 className="font-heading">Longer Stays for US Citizens</h3>
              <ul>
                <li><Link href="/visa/tourist-visa/"><strong>Tourist Visa (TR)</strong></Link> — Apply at a Thai embassy before your trip. Gives 60 days, extendable by 30. Cost: approximately $40.</li>
                <li><Link href="/visa/digital-nomad-visa/"><strong>Digital Nomad Visa (DTV)</strong></Link> — For remote workers. Up to 180 days. Cost: ฿10,000. Requires proof of remote employment or freelance income.</li>
                <li><Link href="/visa/retirement-visa/"><strong>Retirement Visa (O-A)</strong></Link> — For those aged 50+. 1-year stay with financial requirements (฿800,000 in Thai bank or ฿65,000/month income).</li>
              </ul>
              <p>
                For more on planning a longer stay, read our guide on the <Link href="/blog/digital-nomad-thailand-2026-dtv-visa-costs-cities/">Thailand Digital Nomad Visa</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* Visa Costs & Processing */}
        <section className="py-12 border-t" id="costs">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Visa Costs and Processing Times</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-3 pr-4 font-bold text-gray-900">Visa Type</th>
                    <th className="py-3 pr-4 font-bold text-gray-900">Cost</th>
                    <th className="py-3 pr-4 font-bold text-gray-900">Duration</th>
                    <th className="py-3 font-bold text-gray-900">Processing</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4">Visa-Free Entry</td>
                    <td className="py-3 pr-4 text-green-600 font-medium">Free</td>
                    <td className="py-3 pr-4">60 days</td>
                    <td className="py-3">Instant at border</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4">Visa on Arrival (VOA)</td>
                    <td className="py-3 pr-4">฿2,000</td>
                    <td className="py-3 pr-4">15 days</td>
                    <td className="py-3">At airport</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4"><Link href="/visa/tourist-visa/" className="text-thailand-blue hover:underline">Tourist Visa (TR)</Link></td>
                    <td className="py-3 pr-4">~$40 / ฿1,500</td>
                    <td className="py-3 pr-4">60 days</td>
                    <td className="py-3">3–5 business days</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4"><Link href="/visa/digital-nomad-visa/" className="text-thailand-blue hover:underline">Digital Nomad (DTV)</Link></td>
                    <td className="py-3 pr-4">฿10,000</td>
                    <td className="py-3 pr-4">180 days</td>
                    <td className="py-3">5–15 business days</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4"><Link href="/visa/visa-extension/" className="text-thailand-blue hover:underline">Extension (any type)</Link></td>
                    <td className="py-3 pr-4">฿1,900</td>
                    <td className="py-3 pr-4">+30 days</td>
                    <td className="py-3">Same day</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4"><Link href="/visa/retirement-visa/" className="text-thailand-blue hover:underline">Retirement (O-A)</Link></td>
                    <td className="py-3 pr-4">~$80 / ฿2,000</td>
                    <td className="py-3 pr-4">1 year</td>
                    <td className="py-3">Varies by embassy</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4"><Link href="/visa/education-visa/" className="text-thailand-blue hover:underline">Education (ED)</Link></td>
                    <td className="py-3 pr-4">~$80 / ฿2,000</td>
                    <td className="py-3 pr-4">90 days (renewable)</td>
                    <td className="py-3">Varies</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500 mt-4">Costs are approximate and may vary by embassy. All extensions are processed at Thai immigration offices inside Thailand.</p>
          </div>
        </section>

        {/* Extension & Overstay */}
        <section className="py-12 bg-white border-t" id="extension-overstay">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Visa Extension and Overstay Rules</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <h3 className="font-heading">How to Extend at Immigration</h3>
              <p>You can extend most visa types by 30 days at any Thai immigration office. Here is what you need:</p>
              <ol>
                <li><strong>Passport</strong> with at least 6 months validity</li>
                <li><strong>4×6cm photo</strong> (available at immigration offices for ฿100–200)</li>
                <li><strong>TM.7 application form</strong> (available at the office or downloadable)</li>
                <li><strong>฿1,900</strong> in cash</li>
                <li><strong>Copy of passport</strong> (ID page + current visa stamp)</li>
              </ol>
              <p>
                {isNl
                  ? <>Belangrijke immigratiekantoren: <strong>Bangkok</strong> (Government Complex, Chaeng Wattana Road), <strong>Chiang Mai</strong> (Promenada Mall), <strong>Phuket</strong> (Phuket Town), <strong>Pattaya</strong> (Soi 5, Jomtien). Verwerking duurt doorgaans 1-3 uur. Kom vroeg — kantoren worden druk, vooral in Bangkok.</>
                  : <>Major immigration offices: <strong>Bangkok</strong> (Government Complex, Chaeng Wattana Road), <strong>Chiang Mai</strong> (Promenada Mall), <strong>Phuket</strong> (Phuket Town), <strong>Pattaya</strong> (Soi 5, Jomtien). Processing typically takes 1–3 hours. Arrive early — offices get busy, especially in Bangkok.</>}
              </p>

              <h3 className="font-heading">Overstay Penalties</h3>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 not-prose my-4">
                <p className="text-red-800 text-sm font-medium">⚠️ <strong>Overstaying is serious.</strong> Thailand enforces strict overstay penalties including fines, detention, and re-entry bans.</p>
              </div>
              <ul>
                <li><strong>Fine:</strong> ฿500 per day, maximum ฿20,000 if you self-report at the airport</li>
                <li><strong>Re-entry bans</strong> if caught (not self-reporting):
                  <ul>
                    <li>Less than 1 year overstay → 5-year ban</li>
                    <li>Over 1 year → 10-year ban</li>
                  </ul>
                </li>
                <li><strong>Re-entry bans</strong> if self-reporting at departure:
                  <ul>
                    <li>90 days – 1 year overstay → 1-year ban</li>
                    <li>1–3 years → 3-year ban</li>
                    <li>3–5 years → 5-year ban</li>
                    <li>Over 5 years → 10-year ban</li>
                  </ul>
                </li>
              </ul>
              <p>
                <strong>Bottom line:</strong> Never overstay. If you need more time, extend at immigration before your permitted stay expires. Read our detailed <Link href="/visa/visa-extension/">visa extension guide</Link> for step-by-step instructions.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 border-t" id="faq">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8">Visa FAQs</h2>
            <div className="space-y-6">
              {faqItems.map((item, i) => (
                <div key={i} className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-bold font-heading text-gray-900 mb-3">{item.question}</h3>
                  <p className="text-gray-700">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Email Capture */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <EmailCapture variant="inline" />
        </div>

        {/* Travel Planning */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">
              {lang === 'nl' ? 'Reisplanning' : 'Travel Planning'}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <Link
                href="/travel-insurance-thailand/"
                className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all p-5 group flex flex-col items-start gap-3"
              >
                <span className="text-3xl"></span>
                <div>
                  <h3 className="font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors">
                    {lang === 'nl' ? 'Reisverzekering' : 'Travel Insurance'}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {lang === 'nl' ? 'Vergelijk de beste opties' : 'Compare the best options'}
                  </p>
                </div>
              </Link>
              <Link
                href="/esim/"
                className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all p-5 group flex flex-col items-start gap-3"
              >
                <span className="text-3xl">📱</span>
                <div>
                  <h3 className="font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors">
                    {lang === 'nl' ? 'eSIM Gids' : 'eSIM Guide'}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {lang === 'nl' ? 'Blijf verbonden in Thailand' : 'Stay connected in Thailand'}
                  </p>
                </div>
              </Link>
              <Link
                href="/thailand-for-first-timers/"
                className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all p-5 group flex flex-col items-start gap-3"
              >
                <span className="text-3xl">✈️</span>
                <div>
                  <h3 className="font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors">
                    {lang === 'nl' ? 'Eerste Keer Thailand' : "First Timer's Guide"}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {lang === 'nl' ? 'Alles voor je eerste reis' : 'Everything for your first trip'}
                  </p>
                </div>
              </Link>
              <Link
                href="/thailand-travel-guide/"
                className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all p-5 group flex flex-col items-start gap-3"
              >
                <span className="text-3xl">🗺️</span>
                <div>
                  <h3 className="font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors">
                    {lang === 'nl' ? 'Thailand Reisgids' : 'Thailand Travel Guide'}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {lang === 'nl' ? 'Complete reisgids 2026' : 'Complete guide 2026'}
                  </p>
                </div>
              </Link>
              <Link
                href="/city/"
                className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all p-5 group flex flex-col items-start gap-3"
              >
                <span className="text-3xl">🏙️</span>
                <div>
                  <h3 className="font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors">
                    {lang === 'nl' ? 'Stedengidsen' : 'City Guides'}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {lang === 'nl' ? 'Ontdek 33 steden' : 'Explore 33 cities'}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <PreFooterAffiliateBanner
          title={lang === 'nl' ? 'Plan Je Thailand Reis' : 'Plan Your Thailand Trip'}
          description={lang === 'nl' ? 'Boek hotels, transport en meer' : 'Book hotels, transport and more'}
          links={[
            { label: 'Booking.com', href: 'https://booking.tpo.lv/2PT1kR82' },
            { label: 'Trip.com', href: 'https://trip.tpo.lv/TmObooZ5' },
            { label: 'Travel Insurance', href: '/travel-insurance-thailand/', internal: true },
            { label: 'eSIM', href: 'https://saily.tpo.lv/rf9lidnE' },
            { label: 'NordVPN', href: 'https://nordvpn.tpo.lv/ekHF1i55' },
            { label: 'NordPass', href: 'https://nordvpn.tpo.lv/tp12zNjC' },
          ]}
        />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const visas = getAllVisas();

  return {
    props: {
      visas
    }
  };
};
