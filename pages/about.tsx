import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Breadcrumbs from '../components/Breadcrumbs';
import { useT } from '../lib/i18n';
import { strings as i18nStrings } from '../lib/i18n/about';

export default function AboutPage() {
  const t = useT(i18nStrings);
  const siteLogoUrl = 'https://go2-thailand.com/images/brand/go2thailand-logo-2026.png';
  const { locale } = useRouter();
  const isNl = locale === 'nl';

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Over Ons' : 'About Us', href: '/about' }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    mainEntity: {
      '@type': 'Organization',
      name: 'Go2Thailand.com',
      url: 'https://go2-thailand.com',
      logo: siteLogoUrl,
      description: isNl
        ? 'Onafhankelijke Thailand reisgids die reizigers helpt onvergetelijke reizen te plannen sinds 2024.'
        : 'Independent Thailand travel guide helping travelers plan unforgettable trips since 2024.',
      foundingDate: '2024',
      email: 'hello@go2-thailand.com',
      founder: {
        '@type': 'Person',
        name: 'Marvin',
        jobTitle: isNl ? 'Oprichter & Hoofdredacteur' : 'Founder & Lead Editor',
        image: 'https://go2-thailand.com/images/team/marvin.webp',
      },
      areaServed: {
        '@type': 'Country',
        name: 'Thailand',
      },
    },
  };
  return (
    <>
      <Head>
        <title>{isNl ? 'Over Ons - Go2Thailand.com | Onafhankelijke Thailand Reisgids' : 'About Us - Go2Thailand.com | Independent Thailand Travel Guide'}</title>
        <meta name="description" content={isNl
          ? 'Leer meer over Go2Thailand.com — een onafhankelijke Thailand reisgids met 33 steden, 11 eilanden en honderden attracties. Onze missie, team en redactionele standaarden.'
          : 'Learn about Go2Thailand.com — an independent Thailand travel guide covering 33 cities, 11 islands, and hundreds of attractions. Our mission, team, and editorial standards.'
        } />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="min-h-screen bg-surface-cream">
        <Breadcrumbs items={breadcrumbs} />

        <div className="container-custom py-12">
          <div className="max-w-4xl mx-auto">

            {/* Hero */}
            <div className="bg-surface-dark text-white rounded-2xl p-8 md:p-12 mb-8 text-center">
              <p className="font-script text-thailand-gold text-lg mb-2">{isNl ? 'Over Ons' : 'About Us'}</p>
              <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-4">Go2Thailand.com</h1>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                {isNl
                  ? 'Jouw onafhankelijke gids voor het verkennen van Thailand — van bruisend Bangkok tot serene eilandstranden.'
                  : 'Your independent guide to exploring Thailand — from bustling Bangkok to serene island beaches.'}
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">{isNl ? 'Onze Missie' : 'Our Mission'}</h2>
              <p className="text-gray-700 mb-4">
                {isNl
                  ? 'Go2Thailand.com bestaat om reizigers te helpen betere reizen naar Thailand te plannen. Wij geloven dat elke bezoeker toegang verdient tot nauwkeurige, actuele en eerlijke reisinformatie — of je nu een eerste bezoeker bent die zijn visum uitzoekt of een ervaren reiziger op zoek naar de beste Khao Soi in Chiang Mai.'
                  : 'Go2Thailand.com exists to help travelers plan better trips to Thailand. We believe every visitor deserves access to accurate, up-to-date, and honest travel information — whether you\'re a first-timer figuring out your visa or a seasoned traveler looking for the best Khao Soi in Chiang Mai.'}
              </p>
              <p className="text-gray-700">
                {isNl
                  ? <>We behandelen <strong>33 steden</strong>, <strong>11 eilanden</strong>, <strong>295 attracties</strong>,{' '}<strong>46 Thaise gerechten</strong> en <strong>245 transportroutes</strong> in elke regio van Thailand. Onze gidsen zijn onderzocht, op feiten gecontroleerd en regelmatig bijgewerkt.</>
                  : <>{t("s001_we_cover")} <strong>33 cities</strong>, <strong>11 islands</strong>, <strong>295 attractions</strong>,{' '}<strong>46 Thai dishes</strong>, and <strong>245 transport routes</strong> across every region of Thailand. Our guides are researched, fact-checked, and regularly updated.</>}
              </p>
            </div>

            {/* What We Cover */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">{isNl ? 'Wat We Behandelen' : 'What We Cover'}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Link href="/city/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="text-2xl mb-2">&#127751;</div>
                  <div className="font-semibold text-gray-900">{isNl ? '33 Steden' : '33 Cities'}</div>
                  <div className="text-xs text-gray-600">{isNl ? 'Bestemmingsgidsen' : 'Destination guides'}</div>
                </Link>
                <Link href="/islands/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="text-2xl mb-2">&#127965;</div>
                  <div className="font-semibold text-gray-900">{isNl ? '11 Eilanden' : '11 Islands'}</div>
                  <div className="text-xs text-gray-600">{isNl ? 'Strandparadijzen' : 'Beach paradises'}</div>
                </Link>
                <Link href="/food/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="text-2xl mb-2">&#127836;</div>
                  <div className="font-semibold text-gray-900">{isNl ? '46+ Gerechten' : '46+ Dishes'}</div>
                  <div className="text-xs text-gray-600">{isNl ? 'Thaise keukengids' : 'Thai cuisine guide'}</div>
                </Link>
                <Link href="/transport/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="text-2xl mb-2">&#128652;</div>
                  <div className="font-semibold text-gray-900">{isNl ? '245 Routes' : '245 Routes'}</div>
                  <div className="text-xs text-gray-600">{isNl ? 'Vervoersplanner' : 'Transport planner'}</div>
                </Link>
                <Link href="/region/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="text-2xl mb-2">&#127757;</div>
                  <div className="font-semibold text-gray-900">{isNl ? '4 Regio\'s' : '4 Regions'}</div>
                  <div className="text-xs text-gray-600">{isNl ? 'Noord, Zuid, Centraal, Isaan' : 'North, South, Central, Isaan'}</div>
                </Link>
                <Link href="/blog/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="text-2xl mb-2">&#128221;</div>
                  <div className="font-semibold text-gray-900">{isNl ? 'Reisblog' : 'Travel Blog'}</div>
                  <div className="text-xs text-gray-600">{isNl ? 'Tips & verhalen' : 'Tips & stories'}</div>
                </Link>
              </div>
            </div>

            {/* Meet the Founder */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">{isNl ? 'Maak Kennis met de Oprichter' : 'Meet the Founder'}</h2>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <Image
                    src="/images/team/marvin.webp"
                    alt={isNl ? 'Marvin — Oprichter van Go2Thailand.com' : 'Marvin — Founder of Go2Thailand.com'}
                    width={180}
                    height={180}
                    className="rounded-2xl object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">Marvin</h3>
                  <p className="text-sm text-thailand-blue font-medium mb-3">{isNl ? 'Oprichter & Hoofdredacteur' : 'Founder & Lead Editor'}</p>
                  <p className="text-gray-700 mb-3">
                    {isNl
                      ? 'Marvin is een Nederlandse expat en reistechnologie-specialist die Thailand uitgebreid verkent sinds 2019, met bezoeken aan meer dan 50 provincies door het hele land. Wat begon als een persoonlijke passie voor de Thaise cultuur, het eten en verborgen bestemmingen groeide uit tot Go2Thailand.com — een onafhankelijke reisgids gebouwd om medereizigers te helpen betere reizen te plannen.'
                      : 'Marvin is a Dutch expat and travel technology specialist who has been exploring Thailand extensively since 2019, visiting over 50 provinces across the country. What started as a personal passion for Thai culture, food, and off-the-beaten-path destinations grew into Go2Thailand.com — an independent travel guide built to help fellow travelers plan better trips.'}
                  </p>
                  <p className="text-gray-700 mb-3">
                    {isNl
                      ? 'Vanuit Nederland en Zuidoost-Azië combineert Marvin persoonlijke reiservaring met een achtergrond in webontwikkeling om datagedreven, praktische gidsen te maken. Hij houdt persoonlijk toezicht op alle redactionele inhoud, zorgt voor nauwkeurigheid van prijzen en logistiek, en handhaaft de toewijding van de site aan eerlijke, onbevooroordeelde aanbevelingen.'
                      : 'Based between the Netherlands and Southeast Asia, Marvin combines firsthand travel experience with a background in web development to create data-driven, practical guides. He personally oversees all editorial content, ensures accuracy of prices and logistics, and maintains the site\'s commitment to honest, unbiased recommendations.'}
                  </p>
                  <p className="text-gray-700">
                    {isNl
                      ? <>Marvin runt ook het{' '}<strong>{t("s002_go2_travel_network")}</strong> — een familie van bestemmingsgidsen waaronder{' '}<a href="https://go2-vietnam.com" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">Go2Vietnam</a>,{' '}<a href="https://go2-bali.com" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">Go2Bali</a>,{' '}<a href="https://go2-japan.com" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">Go2Japan</a> en meer.</>
                      : <>Marvin also runs the{' '}<strong>{t("s002_go2_travel_network")}</strong> — a family of destination guides including{' '}<a href="https://go2-vietnam.com" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">Go2Vietnam</a>,{' '}<a href="https://go2-bali.com" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">Go2Bali</a>,{' '}<a href="https://go2-japan.com" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">Go2Japan</a>, and more.</>}
                  </p>
                </div>
              </div>
            </div>

            {/* Editorial Standards */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">{isNl ? 'Onze Redactionele Standaarden' : 'Our Editorial Standards'}</h2>
              <p className="text-gray-700 mb-4">
                {isNl
                  ? <>We volgen <strong>E-E-A-T principes</strong> (Ervaring, Expertise, Autoriteit, Betrouwbaarheid) in alles wat we publiceren:</>
                  : <>We follow <strong>E-E-A-T principles</strong> (Experience, Expertise, Authoritativeness, Trustworthiness) in everything we publish:</>}
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 flex-shrink-0">&#10003;</span>
                  <span>{isNl
                    ? <><strong>Alleen echte data</strong> — We verzinnen nooit prijzen, beoordelingen of beschikbaarheid. Alle data komt van geverifieerde bronnen.</>
                    : <><strong>Real data only</strong> — We never fabricate prices, ratings, or availability. All data comes from verified sources.</>}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 flex-shrink-0">&#10003;</span>
                  <span>{isNl
                    ? <><strong>Regelmatige updates</strong> — Inhoud wordt regelmatig beoordeeld en bijgewerkt. Verouderde informatie helpt niemand.</>
                    : <><strong>Regular updates</strong> — Content is reviewed and updated regularly. Outdated information helps no one.</>}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 flex-shrink-0">&#10003;</span>
                  <span>{isNl
                    ? <><strong>Transparante affiliates</strong> — We verdienen commissies via sommige links, duidelijk vermeld. Dit beïnvloedt nooit onze aanbevelingen. Zie onze <Link href="/affiliate-disclosure/" className="text-thailand-blue hover:underline">affiliate verklaring</Link>.</>
                    : <><strong>{t("s004_transparent_affiliates")}</strong> — We earn commissions from some links, clearly disclosed. This never influences our recommendations. See our <Link href="/affiliate-disclosure/" className="text-thailand-blue hover:underline">affiliate disclosure</Link>.</>}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 flex-shrink-0">&#10003;</span>
                  <span>{isNl
                    ? <><strong>Geen gesponsorde inhoud</strong> — Hotels en touroperators kunnen niet betalen voor reviews of hogere posities.</>
                    : <><strong>No sponsored content</strong> — Hotels and tour operators cannot pay for reviews or higher rankings.</>}</span>
                </li>
              </ul>
              <p className="text-gray-700 mt-4">
                {isNl
                  ? <>Lees ons volledige <Link href="/editorial-policy/" className="text-thailand-blue hover:underline">redactioneel beleid</Link> voor meer details.</>
                  : <>Read our full <Link href="/editorial-policy/" className="text-thailand-blue hover:underline">editorial policy</Link> for more details.</>}
              </p>
            </div>

            {/* How We Create Content */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">{isNl ? 'Hoe We Inhoud Maken' : 'How We Create Content'}</h2>
              <p className="text-gray-700 mb-4">
                {isNl
                  ? 'Onze inhoud wordt gemaakt door een team van in Thailand gevestigde reisschrijvers, langdurige expats en technologiespecialisten. We combineren persoonlijke reiservaring met datagedreven onderzoek om gidsen te produceren die zowel praktisch als betrouwbaar zijn.'
                  : 'Our content is created by a team of Thailand-based travel writers, long-term expats, and technology specialists. We combine firsthand travel experience with data-driven research to produce guides that are both practical and trustworthy.'}
              </p>
              <p className="text-gray-700 mb-4">
                {isNl
                  ? <><strong>AI-ondersteund, door mensen geverifieerd:</strong> We gebruiken AI-tools om te helpen bij onderzoek, het schrijven en data-analyse. Alle inhoud wordt beoordeeld, op feiten gecontroleerd en geverifieerd door ons redactieteam voor publicatie. Statistieken komen van officiële organisaties (Tourism Authority of Thailand, UNESCO, overheidsinstanties) en worden direct naar hun bron gelinkt.</>
                  : <><strong>{t("s005_ai_assisted_human_verified")}</strong> {t("s006_we_use_ai_tools")}</>}
              </p>
              <p className="text-gray-700">
                {isNl
                  ? <><strong>Correctiebeleid:</strong> Als je een fout vindt in onze inhoud, <Link href="/contact/" className="text-thailand-blue hover:underline">neem dan contact met ons op</Link>. We nemen nauwkeurigheid serieus en zullen geverifieerde fouten binnen 24 uur corrigeren.</>
                  : <><strong>{t("s007_correction_policy")}</strong> If you find an error in our content, please{' '}<Link href="/contact/" className="text-thailand-blue hover:underline">contact us</Link>. We take accuracy seriously and will correct verified errors within 24 hours.</>}
              </p>
            </div>

            {/* How We're Different */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">{isNl ? 'Wat Ons Anders Maakt' : 'How We\u0027re Different'}</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  {isNl
                    ? 'In tegenstelling tot grote reisplatformen richten wij ons uitsluitend op Thailand. Dit stelt ons in staat om dieper te gaan: stad-voor-stad budgetoverzichten, maand-voor-maand weerdata en samengestelde top-10 lijsten gebaseerd op echte reviews — niet op advertentie-uitgaven.'
                    : 'Unlike large travel platforms, we focus exclusively on Thailand. This allows us to go deeper: city-by-city budget breakdowns, month-by-month weather data, and curated top-10 lists based on real reviews — not advertising spend.'}
                </p>
                <p>
                  {isNl
                    ? <>We bieden ook tools die grote sites niet hebben: een{' '}<Link href="/thailand-index/" className="text-thailand-blue hover:underline">{t("s008_thailand_travel_index")}</Link>{' '}die alle 33 steden vergelijkt op budget, weer en vervoersconnectiviteit, en een{' '}<Link href="/compare/" className="text-thailand-blue hover:underline">bestemmingsvergelijkingstool</Link>{' '}om je te helpen kiezen tussen vergelijkbare steden.</>
                    : <>We also provide tools that big sites don&apos;t: a{' '}<Link href="/thailand-index/" className="text-thailand-blue hover:underline">{t("s008_thailand_travel_index")}</Link>{' '}comparing all 33 cities by budget, weather, and transport connectivity, and a{' '}<Link href="/compare/" className="text-thailand-blue hover:underline">destination comparison tool</Link>{' '}to help you choose between similar cities.</>}
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">{isNl ? 'Neem Contact Op' : 'Get in Touch'}</h2>
              <p className="text-gray-700 mb-4">
                {isNl
                  ? 'Heb je een vraag, suggestie of een fout gevonden? We horen graag van je.'
                  : 'Have a question, suggestion, or found an error? We\u0027d love to hear from you.'}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact/"
                  className="inline-flex items-center gap-2 bg-thailand-red text-white px-6 py-3 rounded-xl font-semibold hover:bg-thailand-red-600 transition-colors"
                >
                  {isNl ? 'Neem Contact Op' : 'Contact Us'}
                </Link>
                <a
                  href="mailto:hello@go2-thailand.com"
                  className="inline-flex items-center gap-2 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:border-thailand-blue hover:text-thailand-blue transition-colors"
                >
                  hello@go2-thailand.com
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
