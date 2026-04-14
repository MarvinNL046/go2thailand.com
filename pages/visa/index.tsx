import { GetStaticProps } from 'next';
import SEOHead from '../../components/SEOHead';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Breadcrumbs from '../../components/Breadcrumbs';
import EmailCapture from '../../components/EmailCapture';
import PreFooterAffiliateBanner from '../../components/PreFooterAffiliateBanner';
import TravelpayoutsRecoveryPanel from '../../components/TravelpayoutsRecoveryPanel';
import { getAllVisas } from '../../lib/visas';
import { useT } from '../../lib/i18n';
import { strings as i18nStrings } from '../../lib/i18n/visa-index';

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
  const t = useT(i18nStrings);
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
        title={t("s001_thailand_visa_guide_2026")}
        description={t("s002_complete_thailand_visa_guide")}
      >
        <meta name="keywords" content={t("s003_thailand_visa_thailand_visa")} />
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
              <p className="font-script text-thailand-gold mb-2">{t("s004_visa_info")}</p>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
                {t("s005_thailand_visa_guide_2026")}
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

        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <TravelpayoutsRecoveryPanel
              pageType="visa"
              placement="visa-index-panel"
              columns={3}
            />
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
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">{t("s006_do_you_need_a")}</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                {t("s007_most_tourists")} <strong>do not need a visa</strong> to visit Thailand. Since 2024, citizens of 93 countries can enter Thailand visa-free for up to 60 days — double the previous 30-day allowance. This covers most passport holders from Europe, North America, Australia, and parts of Asia and South America.
              </p>
              <p>
                {t("s008_if_60_days_is")} <Link href="/visa/tourist-visa/">{t("s009_tourist_visa_tr")}</Link>, <Link href="/visa/digital-nomad-visa/">{t("s010_digital_nomad_visa_dtv")}</Link>, and <Link href="/visa/retirement-visa/">{t("s011_retirement_visa")}</Link>.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 not-prose my-6">
                <p className="text-amber-800 text-sm font-medium">⚠️ <strong>{t("s012_april_2026_update")}</strong> {t("s013_the_thai_government_is")}</p>
              </div>
              <p>
                {t("s014_for_nationalities_not_on")} <strong>{t("s015_visa_on_arrival_voa")}</strong> is available for citizens of 19 additional countries at a cost of ฿2,000 for 15 days. Thailand has also replaced the paper TM.6 arrival card with the <Link href="/visa/digital-arrival-card/">{t("s016_thailand_digital_arrival_card")}</Link>, which you can fill out online before your trip.
              </p>
            </div>
          </div>
        </section>

        {/* Visa Exemption Countries */}
        <section className="py-12 border-t" id="visa-exemption">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">{t("s017_visa_exemption_60_day")}</h2>
            <p className="text-gray-600 mb-8">{t("s018_citizens_of_93_countries")}</p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-bold font-heading text-gray-900 mb-3">🇪🇺 Europe</h3>
                <p className="text-sm text-gray-600">{t("s019_uk_france_germany_netherlands")}</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-bold font-heading text-gray-900 mb-3">🇺🇸 Americas</h3>
                <p className="text-sm text-gray-600">{t("s020_united_states_canada_brazil")}</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-bold font-heading text-gray-900 mb-3">🌏 Asia-Pacific</h3>
                <p className="text-sm text-gray-600">{t("s021_australia_new_zealand_japan")}</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-bold font-heading text-gray-900 mb-3">🌍 Middle East & Africa</h3>
                <p className="text-sm text-gray-600">{t("s022_uae_qatar_kuwait_bahrain")}</p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 mb-6">
              <p className="text-blue-800 text-sm"><strong>{t("s023_asean_countries")}</strong> {t("s024_laos_vietnam_and_timor")}</p>
            </div>

            <p className="text-gray-600">{t("s025_for_the_complete_official")} <a href="https://www.mfa.go.th" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">{t("s026_thai_ministry_of_foreign")}</a> website. You can also read our detailed <Link href="/visa/visa-free-entry/" className="text-thailand-blue hover:underline">visa-free entry guide</Link>.</p>
          </div>
        </section>

        {/* Thailand Visa for US Citizens */}
        <section className="py-12 bg-white border-t" id="us-citizens">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">{t("s027_thailand_visa_for_us")}</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                {t("s028_us_citizens_can_enter")} <strong>without a visa for 60 days</strong>. No application, no embassy visit, no fee — just show your passport at immigration. This makes Thailand one of the easiest countries in Southeast Asia for Americans to visit.
              </p>
              <h3 className="font-heading">{t("s029_extending_your_stay")}</h3>
              <p>
                {t("s030_if_60_days_is")}
              </p>
              <h3 className="font-heading">{t("s031_longer_stays_for_us")}</h3>
              <ul>
                <li><Link href="/visa/tourist-visa/"><strong>{t("s009_tourist_visa_tr")}</strong></Link> — Apply at a Thai embassy before your trip. Gives 60 days, extendable by 30. Cost: approximately $40.</li>
                <li><Link href="/visa/digital-nomad-visa/"><strong>{t("s010_digital_nomad_visa_dtv")}</strong></Link> — For remote workers. Up to 180 days. Cost: ฿10,000. Requires proof of remote employment or freelance income.</li>
                <li><Link href="/visa/retirement-visa/"><strong>{t("s034_retirement_visa_o_a")}</strong></Link> — For those aged 50+. 1-year stay with financial requirements (฿800,000 in Thai bank or ฿65,000/month income).</li>
              </ul>
              <p>
                {t("s035_for_more_on_planning")} <Link href="/blog/digital-nomad-thailand-2026-dtv-visa-costs-cities/">{t("s036_thailand_digital_nomad_visa")}</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* Visa Costs & Processing */}
        <section className="py-12 border-t" id="costs">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">{t("s037_visa_costs_and_processing")}</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-3 pr-4 font-bold text-gray-900">{t("s038_visa_type")}</th>
                    <th className="py-3 pr-4 font-bold text-gray-900">Cost</th>
                    <th className="py-3 pr-4 font-bold text-gray-900">Duration</th>
                    <th className="py-3 font-bold text-gray-900">Processing</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4">{t("s039_visa_free_entry")}</td>
                    <td className="py-3 pr-4 text-green-600 font-medium">Free</td>
                    <td className="py-3 pr-4">60 days</td>
                    <td className="py-3">{t("s040_instant_at_border")}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4">{t("s015_visa_on_arrival_voa")}</td>
                    <td className="py-3 pr-4">฿2,000</td>
                    <td className="py-3 pr-4">15 days</td>
                    <td className="py-3">{t("s042_at_airport")}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4"><Link href="/visa/tourist-visa/" className="text-thailand-blue hover:underline">{t("s009_tourist_visa_tr")}</Link></td>
                    <td className="py-3 pr-4">~$40 / ฿1,500</td>
                    <td className="py-3 pr-4">60 days</td>
                    <td className="py-3">3–5 business days</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4"><Link href="/visa/digital-nomad-visa/" className="text-thailand-blue hover:underline">{t("s044_digital_nomad_dtv")}</Link></td>
                    <td className="py-3 pr-4">฿10,000</td>
                    <td className="py-3 pr-4">180 days</td>
                    <td className="py-3">5–15 business days</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4"><Link href="/visa/visa-extension/" className="text-thailand-blue hover:underline">{t("s045_extension_any_type")}</Link></td>
                    <td className="py-3 pr-4">฿1,900</td>
                    <td className="py-3 pr-4">+30 days</td>
                    <td className="py-3">{t("s046_same_day")}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4"><Link href="/visa/retirement-visa/" className="text-thailand-blue hover:underline">{t("s047_retirement_o_a")}</Link></td>
                    <td className="py-3 pr-4">~$80 / ฿2,000</td>
                    <td className="py-3 pr-4">1 year</td>
                    <td className="py-3">{t("s048_varies_by_embassy")}</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4"><Link href="/visa/education-visa/" className="text-thailand-blue hover:underline">{t("s049_education_ed")}</Link></td>
                    <td className="py-3 pr-4">~$80 / ฿2,000</td>
                    <td className="py-3 pr-4">90 days (renewable)</td>
                    <td className="py-3">Varies</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500 mt-4">{t("s050_costs_are_approximate_and")}</p>
          </div>
        </section>

        {/* Extension & Overstay */}
        <section className="py-12 bg-white border-t" id="extension-overstay">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">{t("s051_visa_extension_and_overstay")}</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <h3 className="font-heading">{t("s052_how_to_extend_at")}</h3>
              <p>{t("s053_you_can_extend_most")}</p>
              <ol>
                <li><strong>Passport</strong> with at least 6 months validity</li>
                <li><strong>4×6cm photo</strong> (available at immigration offices for ฿100–200)</li>
                <li><strong>{t("s054_tm_7_application_form")}</strong> (available at the office or downloadable)</li>
                <li><strong>฿1,900</strong> in cash</li>
                <li><strong>{t("s055_copy_of_passport")}</strong> (ID page + current visa stamp)</li>
              </ol>
              <p>
                {isNl
                  ? <>Belangrijke immigratiekantoren: <strong>Bangkok</strong> (Government Complex, Chaeng Wattana Road), <strong>Chiang Mai</strong> (Promenada Mall), <strong>Phuket</strong> (Phuket Town), <strong>Pattaya</strong> (Soi 5, Jomtien). Verwerking duurt doorgaans 1-3 uur. Kom vroeg — kantoren worden druk, vooral in Bangkok.</>
                  : <>{t("s056_major_immigration_offices")} <strong>Bangkok</strong> (Government Complex, Chaeng Wattana Road), <strong>{t("s057_chiang_mai")}</strong> (Promenada Mall), <strong>Phuket</strong> (Phuket Town), <strong>Pattaya</strong> (Soi 5, Jomtien). Processing typically takes 1–3 hours. Arrive early — offices get busy, especially in Bangkok.</>}
              </p>

              <h3 className="font-heading">{t("s058_overstay_penalties")}</h3>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 not-prose my-4">
                <p className="text-red-800 text-sm font-medium">⚠️ <strong>{t("s059_overstaying_is_serious")}</strong> {t("s060_thailand_enforces_strict_overstay")}</p>
              </div>
              <ul>
                <li><strong>Fine:</strong> ฿500 per day, maximum ฿20,000 if you self-report at the airport</li>
                <li><strong>{t("s061_re_entry_bans")}</strong> if caught (not self-reporting):
                  <ul>
                    <li>{t("s062_less_than_1_year")}</li>
                    <li>{t("s063_over_1_year_10")}</li>
                  </ul>
                </li>
                <li><strong>{t("s061_re_entry_bans")}</strong> if self-reporting at departure:
                  <ul>
                    <li>90 days – 1 year overstay → 1-year ban</li>
                    <li>1–3 years → 3-year ban</li>
                    <li>3–5 years → 5-year ban</li>
                    <li>{t("s065_over_5_years_10")}</li>
                  </ul>
                </li>
              </ul>
              <p>
                <strong>{t("s066_bottom_line")}</strong> {t("s067_never_overstay_if_you")} <Link href="/visa/visa-extension/">visa extension guide</Link> for step-by-step instructions.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 border-t" id="faq">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8">{t("s068_visa_faqs")}</h2>
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
          placement="visa-index-prefooter"
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
