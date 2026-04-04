import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Breadcrumbs from '../components/Breadcrumbs';

export default function EditorialPolicy() {
  const { locale } = useRouter();
  const isNl = locale === 'nl';

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Redactioneel Beleid' : 'Editorial Policy', href: '/editorial-policy' }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: isNl ? 'Redactioneel Beleid - Go2Thailand.com' : 'Editorial Policy - Go2Thailand.com',
    description: isNl
      ? 'Hoe Go2Thailand.com betrouwbare Thailand reisinhoud maakt, verifieert en onderhoudt. Onze standaarden voor nauwkeurigheid, onafhankelijkheid en transparantie.'
      : 'How Go2Thailand.com creates, verifies, and maintains trustworthy Thailand travel content. Our standards for accuracy, independence, and transparency.',
    url: 'https://go2-thailand.com/editorial-policy/',
    inLanguage: isNl ? 'nl' : 'en',
    publisher: {
      '@type': 'Organization',
      name: 'Go2Thailand.com',
      url: 'https://go2-thailand.com',
      logo: 'https://go2-thailand.com/go2thailand-faviocon.webp',
      email: 'hello@go2-thailand.com',
    },
    dateModified: '2026-03-16',
  };

  return (
    <>
      <Head>
        <title>{isNl
          ? 'Redactioneel Beleid - Go2Thailand.com | Hoe We Betrouwbare Reisinhoud Maken'
          : 'Editorial Policy - Go2Thailand.com | How We Create Trustworthy Travel Content'}</title>
        <meta
          name="description"
          content={isNl
            ? 'Ons redactioneel beleid legt uit hoe Go2Thailand.com nauwkeurige Thailand reisinhoud onderzoekt, op feiten controleert en onderhoudt — inclusief onze standaarden voor onafhankelijkheid, affiliate transparantie en correcties.'
            : 'Our editorial policy explains how Go2Thailand.com researches, fact-checks, and maintains accurate Thailand travel content — including our standards for independence, affiliate transparency, and corrections.'}
        />
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
              <p className="font-script text-thailand-gold text-lg mb-2">{isNl ? 'Redactioneel Beleid' : 'Editorial Policy'}</p>
              <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-4">
                {isNl ? 'Hoe We Betrouwbare Reisinhoud Maken' : 'How We Create Trustworthy Travel Content'}
              </h1>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                {isNl
                  ? 'Go2Thailand.com zet zich in voor nauwkeurigheid, onafhankelijkheid en transparantie in alles wat we publiceren. Hier is precies hoe we werken.'
                  : 'Go2Thailand.com is committed to accuracy, independence, and transparency in everything we publish. Here is exactly how we work.'}
              </p>
            </div>

            {/* Our Standards */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">{isNl ? 'Onze Standaarden' : 'Our Standards'}</h2>
              <p className="text-gray-700 mb-6">
                {isNl
                  ? <>We volgen <strong>E-E-A-T principes</strong> — Ervaring, Expertise, Autoriteit en Betrouwbaarheid — in elk stuk inhoud dat we publiceren. Dit zijn geen ambitieuze doelen; het zijn de niet-onderhandelbare basis van hoe we werken.</>
                  : <>We follow <strong>E-E-A-T principles</strong> — Experience, Expertise, Authoritativeness, and Trustworthiness — across every piece of content we publish. These are not aspirational goals; they are the non-negotiable foundation of how we operate.</>}
              </p>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 flex-shrink-0">&#10003;</span>
                  <span>
                    {isNl
                      ? <><strong>Nauwkeurigheid Eerst</strong> — Alle feiten, prijzen, visumvereisten, vervoersschema&apos;s en operationele details worden geverifieerd aan de hand van officiële en primaire bronnen voor publicatie. We herpubliceren geen ongeverifieerde claims.</>
                      : <><strong>Accuracy First</strong> — All facts, prices, visa requirements, transport schedules, and operational details are verified against official and primary sources before publication. We do not republish unverified claims.</>}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 flex-shrink-0">&#10003;</span>
                  <span>
                    {isNl
                      ? <><strong>Regelmatige Updates</strong> — Thailand verandert snel. Inhoud wordt regelmatig beoordeeld en bijgewerkt om actuele prijzen, toegangsvereisten en omstandigheden ter plaatse weer te geven. Verouderde informatie wordt snel verwijderd of gecorrigeerd.</>
                      : <><strong>Regular Updates</strong> — Thailand changes fast. Content is reviewed and updated regularly to reflect current prices, entry requirements, and on-the-ground conditions. Outdated information is removed or corrected promptly.</>}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 flex-shrink-0">&#10003;</span>
                  <span>
                    {isNl
                      ? <><strong>Onafhankelijkheid</strong> — Geen hotel, touroperator, luchtvaartmaatschappij of toerismebureau kan betalen voor berichtgeving, hogere posities of positieve reviews. Onze redactionele beslissingen worden onafhankelijk van commerciële relaties genomen.</>
                      : <><strong>Independence</strong> — No hotel, tour operator, airline, or destination marketing board can pay for coverage, higher rankings, or positive reviews. Our editorial decisions are made independently of commercial relationships.</>}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 flex-shrink-0">&#10003;</span>
                  <span>
                    {isNl
                      ? <><strong>Transparantie</strong> — Waar we affiliate commissies verdienen, wordt dit duidelijk vermeld. Zie onze{' '}<Link href="/affiliate-disclosure/" className="text-thailand-blue hover:underline">affiliate verklaring</Link>{' '}voor de volledige lijst van partnerschappen. Vermelding is nooit verborgen in kleine lettertjes.</>
                      : <><strong>Transparency</strong> — Where we earn affiliate commissions, this is clearly disclosed. See our{' '}<Link href="/affiliate-disclosure/" className="text-thailand-blue hover:underline">affiliate disclosure</Link>{' '}for the full list of partnerships. Disclosure is never hidden in fine print.</>}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 flex-shrink-0">&#10003;</span>
                  <span>
                    {isNl
                      ? <><strong>Alleen Echte Data</strong> — We verzinnen nooit reviews, beoordelingen, hotelsterren of beschikbaarheidsgegevens. Alle gestructureerde data (prijzen, afstanden, reistijden) komt van geverifieerde, citeerbare bronnen.</>
                      : <><strong>Real Data Only</strong> — We never fabricate reviews, ratings, hotel star counts, or availability data. All structured data (prices, distances, travel times) comes from verified, citable sources.</>}
                  </span>
                </li>
              </ul>
            </div>

            {/* How We Research */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">{isNl ? 'Hoe We Onderzoek Doen' : 'How We Research'}</h2>
              <p className="text-gray-700 mb-6">
                {isNl
                  ? 'Elke bestemmingsgids, voedselartikel, vervoersroute en reistip op Go2Thailand.com is gebouwd op een gelaagd onderzoeksproces:'
                  : 'Every destination guide, food article, transport route, and travel tip on Go2Thailand.com is built on a layered research process:'}
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-surface-cream rounded-xl">
                  <div className="text-2xl mb-2">&#127981;</div>
                  <h3 className="font-semibold text-gray-900 mb-1">{isNl ? 'Officiële Toerismedata' : 'Official Tourism Authority Data'}</h3>
                  <p className="text-sm text-gray-600">
                    {isNl
                      ? 'We controleren inhoud aan de hand van de Tourism Authority of Thailand (TAT), Thaise immigratie- en visumportalen en officiële vervoersmaatschappijen.'
                      : 'We cross-reference content with the Tourism Authority of Thailand (TAT), Thai immigration and visa portals, and official transport operators.'}
                  </p>
                </div>
                <div className="p-4 bg-surface-cream rounded-xl">
                  <div className="text-2xl mb-2">&#10024;</div>
                  <h3 className="font-semibold text-gray-900 mb-1">{isNl ? 'Geverifieerde Reizigerservaringen' : 'Verified Traveler Experiences'}</h3>
                  <p className="text-sm text-gray-600">
                    {isNl
                      ? 'We putten uit gedocumenteerde reizigersverhalen, geverifieerde reviewplatforms en kennis uit de reisgemeenschap om aanbevelingen te baseren op praktijkervaring.'
                      : 'We draw on documented traveler accounts, verified review platforms, and travel community knowledge to ground recommendations in real-world experience.'}
                  </p>
                </div>
                <div className="p-4 bg-surface-cream rounded-xl">
                  <div className="text-2xl mb-2">&#127758;</div>
                  <h3 className="font-semibold text-gray-900 mb-1">{isNl ? 'Lokale Bronverificatie' : 'Local Source Verification'}</h3>
                  <p className="text-sm text-gray-600">
                    {isNl
                      ? 'Lokale context — openingstijden, seizoenssluitingen, culturele overwegingen — wordt geverifieerd aan de hand van lokale Thaise bronnen en actuele gemeenschapsrapporten.'
                      : 'Local context — opening hours, seasonal closures, cultural considerations — is verified against local Thai sources and up-to-date community reports.'}
                  </p>
                </div>
                <div className="p-4 bg-surface-cream rounded-xl">
                  <div className="text-2xl mb-2">&#128197;</div>
                  <h3 className="font-semibold text-gray-900 mb-1">{isNl ? 'Regelmatige Updates ter Plaatse' : 'Regular On-the-Ground Updates'}</h3>
                  <p className="text-sm text-gray-600">
                    {isNl
                      ? 'Prijzen, vervoersverbindingen en toegangsvereisten worden doorlopend beoordeeld. Inhoud die niet als actueel kan worden geverifieerd, wordt gemarkeerd of verwijderd.'
                      : 'Prices, transport links, and entry requirements are reviewed on a rolling basis. Content that cannot be verified as current is flagged or removed.'}
                  </p>
                </div>
              </div>
            </div>

            {/* How We Handle Affiliate Content */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">{isNl ? 'Hoe We Omgaan met Affiliate Inhoud' : 'How We Handle Affiliate Content'}</h2>
              <p className="text-gray-700 mb-4">
                {isNl
                  ? 'Go2Thailand.com neemt deel aan affiliate programma\'s — waaronder Booking.com, Klook, GetYourGuide, 12Go en anderen — wat betekent dat we een commissie kunnen verdienen als u boekt via links op onze site. Hier is hoe we voorkomen dat dit onze redactionele integriteit beïnvloedt:'
                  : 'Go2Thailand.com participates in affiliate programmes — including Booking.com, Klook, GetYourGuide, 12Go, and others — which means we may earn a commission if you book through links on our site. Here is how we keep that from affecting our editorial integrity:'}
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 flex-shrink-0">&#10003;</span>
                  <span>
                    {isNl
                      ? <>Affiliate links <strong>beïnvloeden nooit welke bestemmingen, hotels of ervaringen we aanbevelen</strong>. Onze ranglijsten zijn gebaseerd op geverifieerde kwaliteit, waarde voor reizigers en relevantie — niet op commissietarieven.</>
                      : <>Affiliate links <strong>never influence which destinations, hotels, or experiences we recommend</strong>. Our rankings are based on verified quality, traveler value, and relevance — not commission rates.</>}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 flex-shrink-0">&#10003;</span>
                  <span>
                    {isNl
                      ? <><strong>We bevelen producten en diensten aan waarvan we oprecht geloven dat ze waarde bieden</strong> aan reizigers. Als een hotel of tour in onze gidsen verschijnt, is dat omdat het aan onze kwaliteitsstandaard voldoet — niet vanwege een commerciële afspraak.</>
                      : <><strong>We recommend products and services we genuinely believe provide value</strong> to travelers. If a hotel or tour appears in our guides, it is because it meets our quality bar — not because of a commercial arrangement.</>}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 flex-shrink-0">&#10003;</span>
                  <span>
                    {isNl
                      ? 'Affiliate relaties worden duidelijk vermeld op elke pagina waar affiliate links verschijnen.'
                      : 'Affiliate relationships are disclosed clearly on every page where affiliate links appear.'}
                  </span>
                </li>
              </ul>
              <p className="text-gray-700 mt-4">
                {isNl
                  ? <>Voor de volledige lijst van affiliate partners en hoe ze werken, lees onze{' '}<Link href="/affiliate-disclosure/" className="text-thailand-blue hover:underline">Affiliate Verklaring</Link>.</>
                  : <>For the complete list of affiliate partners and how they work, read our{' '}<Link href="/affiliate-disclosure/" className="text-thailand-blue hover:underline">Affiliate Disclosure</Link>.</>}
              </p>
            </div>

            {/* Corrections Policy */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">{isNl ? 'Correctiebeleid' : 'Corrections Policy'}</h2>
              <p className="text-gray-700 mb-4">
                {isNl
                  ? 'We nemen nauwkeurigheid serieus. Wanneer fouten optreden — en in een bestemming die zo snel verandert als Thailand, gebeurt dat soms — corrigeren we ze snel en transparant.'
                  : 'We take accuracy seriously. When errors occur — and in a destination that changes as quickly as Thailand, they sometimes do — we correct them promptly and transparently.'}
              </p>
              <ul className="space-y-3 text-gray-700 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 flex-shrink-0">&#10003;</span>
                  <span>
                    {isNl
                      ? <><strong>We verwelkomen correcties.</strong> Als u een fout ontdekt in prijs, feit of detail, laat het ons weten. E-mail ons op{' '}<a href="mailto:hello@go2-thailand.com" className="text-thailand-blue hover:underline">hello@go2-thailand.com</a>{' '}of gebruik onze{' '}<Link href="/contact/" className="text-thailand-blue hover:underline">contactpagina</Link>.</>
                      : <><strong>We welcome corrections.</strong> If you spot an error in price, fact, or detail, please let us know. Email us at{' '}<a href="mailto:hello@go2-thailand.com" className="text-thailand-blue hover:underline">hello@go2-thailand.com</a>{' '}or use our{' '}<Link href="/contact/" className="text-thailand-blue hover:underline">contact page</Link>.</>}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 flex-shrink-0">&#10003;</span>
                  <span>
                    {isNl
                      ? <><strong>Fouten worden snel gecorrigeerd.</strong> We streven ernaar correctieverzoeken binnen 5 werkdagen te beoordelen en af te handelen.</>
                      : <><strong>Errors are corrected promptly.</strong> We aim to review and act on correction requests within 5 working days.</>}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 flex-shrink-0">&#10003;</span>
                  <span>
                    {isNl
                      ? <><strong>Correcties worden transparant aangebracht.</strong> Significante feitelijke correcties worden waar passend vermeld in de bijgewerkte inhoud, zodat lezers weten dat de informatie is beoordeeld.</>
                      : <><strong>Corrections are made with transparency.</strong> Significant factual corrections are noted in the updated content where appropriate, so readers know the information has been reviewed.</>}
                  </span>
                </li>
              </ul>
            </div>

            {/* Content Coverage */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">{isNl ? 'Wat We Behandelen' : 'What We Cover'}</h2>
              <p className="text-gray-700 mb-6">
                {isNl
                  ? 'Go2Thailand.com richt zich uitsluitend op Thailand. Deze smalle focus stelt ons in staat om dieper te gaan dan brede reisplatforms en een hogere nauwkeurigheid te handhaven over onze gehele inhoudbibliotheek.'
                  : 'Go2Thailand.com focuses exclusively on Thailand. This narrow focus allows us to go deeper than broad travel platforms and maintain higher accuracy across our entire content library.'}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Link href="/city/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="text-2xl mb-2">&#127751;</div>
                  <div className="font-semibold text-gray-900">{isNl ? '33 Steden' : '33 Cities'}</div>
                  <div className="text-xs text-gray-600">{isNl ? 'Diepgaande bestemmingsgidsen' : 'In-depth destination guides'}</div>
                </Link>
                <Link href="/islands/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="text-2xl mb-2">&#127965;</div>
                  <div className="font-semibold text-gray-900">{isNl ? '11 Eilanden' : '11 Islands'}</div>
                  <div className="text-xs text-gray-600">{isNl ? 'Strand- & eilandgidsen' : 'Beach & island guides'}</div>
                </Link>
                <Link href="/city/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="text-2xl mb-2">&#127966;</div>
                  <div className="font-semibold text-gray-900">{isNl ? '295 Attracties' : '295 Attractions'}</div>
                  <div className="text-xs text-gray-600">{isNl ? 'Geverifieerd & in kaart gebracht' : 'Verified & mapped'}</div>
                </Link>
                <Link href="/food/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="text-2xl mb-2">&#127836;</div>
                  <div className="font-semibold text-gray-900">{isNl ? '46 Gerechten' : '46 Dishes'}</div>
                  <div className="text-xs text-gray-600">{isNl ? 'Thaise keukengids' : 'Thai cuisine guide'}</div>
                </Link>
                <Link href="/transport/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="text-2xl mb-2">&#128652;</div>
                  <div className="font-semibold text-gray-900">{isNl ? '245 Routes' : '245 Routes'}</div>
                  <div className="text-xs text-gray-600">{isNl ? 'Vervoersplanner' : 'Transport planner'}</div>
                </Link>
                <Link href="/blog/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="text-2xl mb-2">&#128221;</div>
                  <div className="font-semibold text-gray-900">{isNl ? 'Reisblog' : 'Travel Blog'}</div>
                  <div className="text-xs text-gray-600">{isNl ? 'Experttips & verhalen' : 'Expert tips & stories'}</div>
                </Link>
              </div>
            </div>

            {/* Footer links */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">{isNl ? 'Meer Over Go2Thailand.com' : 'More About Go2Thailand.com'}</h2>
              <p className="text-gray-700 mb-6">
                {isNl
                  ? 'Voor vragen over ons redactioneel proces, correcties of samenwerkingen horen we altijd graag van u.'
                  : 'For questions about our editorial process, corrections, or partnerships, we are always happy to hear from you.'}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/about/"
                  className="inline-flex items-center gap-2 bg-surface-dark text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
                >
                  {isNl ? 'Over Ons' : 'About Us'}
                </Link>
                <Link
                  href="/affiliate-disclosure/"
                  className="inline-flex items-center gap-2 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:border-thailand-blue hover:text-thailand-blue transition-colors"
                >
                  {isNl ? 'Affiliate Verklaring' : 'Affiliate Disclosure'}
                </Link>
                <Link
                  href="/contact/"
                  className="inline-flex items-center gap-2 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:border-thailand-blue hover:text-thailand-blue transition-colors"
                >
                  {isNl ? 'Neem Contact Op' : 'Contact Us'}
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
