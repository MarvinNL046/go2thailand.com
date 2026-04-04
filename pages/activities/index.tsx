import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getCookingClassesIndex } from '../../lib/cooking-classes';
import { getMuayThaiIndex } from '../../lib/muay-thai';
import { getElephantSanctuariesIndex } from '../../lib/elephant-sanctuaries';
import { getDivingSnorkelingIndex } from '../../lib/diving-snorkeling';
import { formatPrice } from '../../lib/price';
import Breadcrumbs from '../../components/Breadcrumbs';
import AffiliateWidget from '../../components/AffiliateWidget';
import SEOHead from '../../components/SEOHead';

interface CityEntry {
  slug: string;
  name: { en: string; nl: string };
  classCount: number;
  priceRange: { from: number; to: number; currency: string };
}

interface ActivityType {
  slug: string;
  title: string;
  description: string;
  editorial: string;
  borderColor: string;
  buttonColor: string;
  guidePath: string;
  cities: CityEntry[];
  totalActivities: number;
  lowestPrice: number;
}

interface Props {
  activities: ActivityType[];
}

const KLOOK_WIDGET = '<script async src="https://tpembd.com/content?currency=USD&trs=421888&shmarker=602467&locale=en&category=4&amount=3&powered_by=true&campaign_id=137&promo_id=4497" charset="utf-8"></script>';
const GYG_POPULAR_TOURS = '<script async src="https://tpembd.com/content?trs=421888&shmarker=602467&place=Thailand&items=3&locale=en&powered_by=true&campaign_id=108&promo_id=4039" charset="utf-8"></script>';

const GYG_AFFILIATE = 'https://getyourguide.tpo.lv/6HngJ5FC';
const KLOOK_AFFILIATE = 'https://klook.tpo.lv/7Dt6WApj';

function getCityActivityPath(activitySlug: string, citySlug: string) {
  switch (activitySlug) {
    case 'cooking-classes': return `/city/${citySlug}/cooking-classes/`;
    case 'muay-thai': return `/city/${citySlug}/muay-thai/`;
    case 'elephant-sanctuaries': return `/city/${citySlug}/elephant-sanctuaries/`;
    case 'diving-snorkeling': return `/city/${citySlug}/diving-snorkeling/`;
    default: return `/city/${citySlug}/`;
  }
}

export default function ActivitiesPage({ activities }: Props) {
  const { locale } = useRouter();
  const loc = locale || 'en';
  const isNl = locale === 'nl';
  const lang = isNl ? 'nl' : 'en';

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Activiteiten & Tours' : 'Activities & Tours', href: '/activities/' }
  ];

  const totalActivities = activities.reduce((sum, a) => sum + a.totalActivities, 0);

  return (
    <>
      <SEOHead
        title={isNl ? "Wat te doen in Thailand — Activiteitengidsen per Bestemming" : "Things to Do in Thailand — Activity Guides by Destination"}
        description={isNl
          ? `Redactionele gidsen voor de beste activiteiten in Thailand: kooklessen, Muay Thai, ethische olifantenopvang en duiken. Georganiseerd per bestemming met praktische details.`
          : `Editorial guides to Thailand's best activities: cooking classes, Muay Thai, ethical elephant sanctuaries, and diving. Organised by destination with practical detail.`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Things to Do in Thailand',
            description: 'Editorial guides to Thailand activities by category and destination: cooking classes, Muay Thai, elephant sanctuaries, diving and snorkeling.',
            url: 'https://go2-thailand.com/activities/',
          }) }}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero */}
        <section className="bg-surface-dark text-white">
          <div className="container-custom py-12">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center mt-6">
              <p className="font-script text-thailand-gold text-lg mb-2">{isNl ? 'Activiteitengidsen' : 'Activity guides'}</p>
              <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-4">
                {isNl ? 'Wat te doen in Thailand' : 'Things to Do in Thailand'}
              </h1>
              <p className="text-xl max-w-3xl mx-auto text-gray-300">
                {isNl
                  ? 'Vier activiteitencategorieen die het plannen waard zijn: kooklessen, Muay Thai, olifantenopvang en duiken. Elk met een eigen gids met details per stad, prijscontext en wat je moet weten voor je boekt.'
                  : 'Four activity categories worth planning around: cooking classes, Muay Thai, elephant sanctuaries, and diving. Each has its own guide with city-level detail, pricing context, and what to know before you book.'}
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            {/* Activity Guide Cards */}
            <p className="section-label">{isNl ? 'Ontdek per categorie' : 'Explore by category'}</p>
            <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">{isNl ? 'Activiteitengidsen' : 'Activity guides'}</h2>
            <p className="text-gray-600 mb-8 max-w-2xl">
              {isNl
                ? 'Elke gids hieronder beschrijft wat de activiteit inhoudt, welke steden de beste versies bieden, typische prijsklassen en hoe je betrouwbare aanbieders vindt.'
                : 'Each guide below covers what the activity involves, which cities offer the best versions of it, typical price ranges, and how to find operators worth trusting.'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {activities.map((activity) => (
                <div key={activity.slug} className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden border-0">
                  <div className="p-6">
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">
                      <Link href={activity.guidePath} className="hover:underline">
                        {activity.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">{activity.description}</p>
                    <p className="text-gray-500 text-sm italic mb-4">{activity.editorial}</p>

                    <div className="flex gap-3 mb-4">
                      <div className="bg-surface-cream rounded-xl px-3 py-1.5 text-center">
                        <div className="text-sm font-bold text-gray-900">{activity.totalActivities}+</div>
                        <div className="text-[10px] text-gray-500">{isNl ? 'Opties' : 'Options'}</div>
                      </div>
                      <div className="bg-surface-cream rounded-xl px-3 py-1.5 text-center">
                        <div className="text-sm font-bold text-gray-900">{activity.cities.length}</div>
                        <div className="text-[10px] text-gray-500">{isNl ? 'Steden' : 'Cities'}</div>
                      </div>
                      <div className="bg-surface-cream rounded-xl px-3 py-1.5 text-center">
                        <div className="text-sm font-bold text-gray-900">{formatPrice(activity.lowestPrice, loc)}+</div>
                        <div className="text-[10px] text-gray-500">{isNl ? 'Vanaf' : 'From'}</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {activity.cities.map((city) => (
                        <Link
                          key={city.slug}
                          href={getCityActivityPath(activity.slug, city.slug)}
                          className="text-xs bg-surface-cream text-gray-600 px-2 py-1 rounded-full hover:bg-gray-200 transition-colors"
                        >
                          {city.name[lang] || city.name.en}
                        </Link>
                      ))}
                    </div>

                    <Link
                      href={activity.guidePath}
                      className="inline-flex items-center px-5 py-2 text-white text-sm font-semibold rounded-xl transition-colors bg-thailand-red hover:bg-red-700"
                    >
                      {isNl ? `Lees de ${activity.title.toLowerCase()} gids` : `Read the ${activity.title.toLowerCase()} guide`} &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Activities by City */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
              <p className="section-label">{isNl ? 'Per bestemming' : 'By destination'}</p>
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-3">{isNl ? 'Activiteiten per stad' : 'Activities by city'}</h2>
              <p className="text-gray-600 text-sm mb-6">
                {isNl
                  ? 'Welke stad bij jouw activiteitenmix past is net zo belangrijk als welke activiteit je kiest. Bangkok leidt voor Muay Thai; Chiang Mai voor kooklessen en olifantenopvang; Phuket en Krabi voor duiken.'
                  : 'Which city fits your activity mix matters as much as which activity you choose. Bangkok leads for Muay Thai; Chiang Mai for cooking classes and elephant sanctuaries; Phuket and Krabi for diving.'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {['bangkok', 'chiang-mai', 'phuket', 'krabi'].map((citySlug) => {
                  const cityName = citySlug === 'chiang-mai' ? 'Chiang Mai'
                    : citySlug.charAt(0).toUpperCase() + citySlug.slice(1);
                  const cityActivities = activities.filter(a =>
                    a.cities.some(c => c.slug === citySlug)
                  );
                  if (cityActivities.length === 0) return null;
                  return (
                    <div key={citySlug} className="border-0 rounded-2xl p-4 bg-surface-cream">
                      <h3 className="font-bold font-heading text-gray-900 mb-3">
                        <Link href={`/city/${citySlug}/`} className="hover:underline">
                          {cityName}
                        </Link>
                      </h3>
                      <ul className="space-y-2">
                        {cityActivities.map((a) => {
                          const city = a.cities.find(c => c.slug === citySlug);
                          return (
                            <li key={a.slug}>
                              <Link
                                href={getCityActivityPath(a.slug, citySlug)}
                                className="text-sm text-thailand-blue hover:underline"
                              >
                                {a.title}
                              </Link>
                              {city && (
                                <span className="text-xs text-gray-400 ml-1">
                                  ({city.classCount})
                                </span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Booking Platforms — secondary, supporting editorial */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
              <p className="section-label">{isNl ? 'Waar boeken' : 'Where to book'}</p>
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-3">{isNl ? 'Boekingsplatforms in onze gidsen' : 'Booking platforms used in our guides'}</h2>
              <p className="text-gray-600 text-sm mb-8">
                {isNl
                  ? 'De activiteitengidsen op deze site verwijzen voornamelijk naar Klook en GetYourGuide. Beide platforms bundelen gecheckte lokale aanbieders, bieden directe bevestiging en hebben duidelijke annuleringsvoorwaarden. Wij ontvangen een commissie als je via onze links boekt, zonder extra kosten voor jou.'
                  : 'The activity guides on this site link primarily to Klook and GetYourGuide. Both platforms aggregate vetted local operators, offer instant confirmation, and have clear cancellation terms — which matters when plans change. We earn a commission if you book through our links, at no extra cost to you.'}
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-surface-cream rounded-2xl p-6 border-0">
                  <div className="relative h-10 w-32 mb-3">
                    <Image src="/images/partners/klook.svg" alt="Klook" fill className="object-contain object-left" />
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Klook is Asia&apos;s largest activities platform with strong Thailand coverage — particularly for day trips, cooking classes, and airport transfers. Prices are typically in USD and confirmed instantly.
                  </p>
                  <AffiliateWidget scriptContent={KLOOK_WIDGET} className="mb-4" minHeight="200px" />
                  <a href={KLOOK_AFFILIATE} target="_blank" rel="noopener noreferrer sponsored"
                    className="inline-block bg-thailand-red text-white text-center px-5 py-2 rounded-xl font-semibold hover:bg-red-700 transition-colors text-sm">
                    {isNl ? 'Bekijk Thailand activiteiten op Klook' : 'Browse Thailand activities on Klook'}
                  </a>
                </div>
                <div className="bg-surface-cream rounded-2xl p-6 border-0">
                  <div className="relative h-10 w-48 mb-3">
                    <Image src="/images/partners/getyourguide.svg" alt="GetYourGuide" fill className="object-contain object-left" />
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {isNl
                      ? 'GetYourGuide biedt een breed scala aan Thailand tours met focus op begeleide ervaringen, Muay Thai-tickets en culturele activiteiten. Geschikt voor ervaringen waar de kwaliteit van de gids belangrijk is.'
                      : 'GetYourGuide covers a wide range of Thailand tours with a focus on guided experiences, Muay Thai fight tickets, and cultural activities. Good for experiences where guide quality matters.'}
                  </p>
                  <AffiliateWidget scriptContent={GYG_POPULAR_TOURS} className="mb-4" minHeight="200px" />
                  <a href={GYG_AFFILIATE} target="_blank" rel="noopener noreferrer sponsored"
                    className="inline-block bg-thailand-blue text-white text-center px-5 py-2 rounded-xl font-semibold hover:bg-blue-800 transition-colors text-sm">
                    {isNl ? 'Bekijk Thailand activiteiten op GetYourGuide' : 'Browse Thailand activities on GetYourGuide'}
                  </a>
                </div>
              </div>
            </div>

            {/* Practical planning notes */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
              <p className="section-label">{isNl ? 'Planningsnotities' : 'Planning notes'}</p>
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">{isNl ? 'Wat je moet weten voor je boekt' : 'What to know before you book'}</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold font-heading text-gray-900 mb-2">{isNl ? 'Welke activiteiten passen bij welke bestemmingen?' : 'Which activities suit which destinations?'}</h3>
                  <p className="text-gray-700">{isNl
                    ? 'Kooklessen zijn het sterkst in Chiang Mai en Bangkok, waar markt-naar-tafel formats goed zijn ingeburgerd. Muay Thai-avonden zijn het beste in Bangkok — Lumpinee en Rajadamnern stadions zijn het echte werk. Ethische olifantenopvang concentreert zich rond Chiang Mai en enkele plekken in Kanchanaburi. Duiken draait om Koh Tao (certificeringscursussen), de Similan-eilanden (liveaboards) en de Andamankust rond Krabi en Koh Lanta.'
                    : 'Cooking classes are strongest in Chiang Mai and Bangkok, where market-to-table formats are well established. Muay Thai fight nights are best in Bangkok — Lumpinee and Rajadamnern stadiums are the genuine article. Ethical elephant sanctuaries concentrate around Chiang Mai and a few spots in Kanchanaburi. Diving is centred on Koh Tao (certification courses), the Similan Islands (liveaboards), and the Andaman coast around Krabi and Koh Lanta.'}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold font-heading text-gray-900 mb-2">{isNl ? 'Hoe ver van tevoren moet je boeken?' : 'How far in advance should you book?'}</h3>
                  <p className="text-gray-700">{isNl
                    ? 'Tijdens het hoogseizoen (november tot februari) kunnen populaire halfdaagse kooklessen en duiktrips in kleine groepen drie tot vijf dagen van tevoren vol raken. Muay Thai-tickets zijn zelden eerder dan een dag van tevoren uitverkocht, maar goede plaatsen in grote stadions gaan snel. Olifantenopvang met ochtend-badslots zijn vaak het snelst vol — boek die voor je vlucht als de ervaring prioriteit heeft.'
                    : 'During peak season (November to February), popular half-day cooking classes and small-group diving trips can fill up three to five days ahead. Muay Thai fight tickets rarely sell out more than a day before, but good seats at major stadiums go early. Elephant sanctuaries with morning bathing slots are often the tightest — book those before flights if the experience is a priority.'}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold font-heading text-gray-900 mb-2">{isNl ? 'Wat betekent de prijsklasse?' : 'What does the price range mean?'}</h3>
                  <p className="text-gray-700">{isNl
                    ? 'De "vanaf" prijs per categorie is de goedkoopste optie over alle steden. Budget kooklessen kunnen onder $15 zijn voor een groepssessie; premium hands-on cursussen met boerderijbezoek kosten $60–$90. Duikdagtrips beginnen rond $50 voor een tweeduiksboot; PADI Open Water-cursussen kosten $300–$400. Gebruik de volledige gids per categorie om te begrijpen wat het prijsverschil je oplevert.'
                    : 'The \u201cfrom\u201d price shown per category is the cheapest option indexed across all cities. Budget cooking classes can be under $15 for a group session; premium hands-on courses with farm visits run $60\u2013$90. Diving day trips start around $50 for a two-dive boat; PADI Open Water courses run $300\u2013$400. Use the full guide for each category to understand what the price difference actually buys you.'}</p>
                </div>
              </div>
            </div>

            {/* Related Guides */}
            <div className="mb-8">
              <p className="section-label">{isNl ? 'Verder plannen' : 'Continue planning'}</p>
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">{isNl ? 'Gerelateerde gidsen' : 'Related guides'}</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { href: '/weather/', title: isNl ? 'Weer per maand' : 'Weather by month', description: isNl ? 'Buitenactiviteiten hangen sterk af van het seizoen. Deze gids behandelt regionale regenpatronen en de beste periodes voor duiken, trekking en olifantenopvang.' : 'Outdoor activities depend heavily on season. This guide covers regional rain patterns and the best windows for diving, trekking, and elephant sanctuary visits.' },
                  { href: '/visa/', title: isNl ? 'Visumgids' : 'Visa guide', description: isNl ? 'Visum bij aankomst, e-visum en vrijstellingen uitgelegd — voor de meeste nationaliteiten en de laatste regels.' : 'Visa on arrival, e-visa, and exemptions explained — covering most nationalities and the latest entry rules.' },
                  { href: '/thailand-for-first-timers/', title: isNl ? 'Gids voor beginners' : "First-timer's guide", description: isNl ? 'Veiligheid, etiquette, vervoer en wat te doen op een korte eerste reis — een praktische basis voor je activiteiten plant.' : 'Safety, etiquette, transport, and what to do on a short first trip — a practical foundation before drilling into activities.' },
                  { href: '/travel-insurance-thailand/', title: isNl ? 'Reisverzekering' : 'Travel insurance', description: isNl ? 'De meeste standaard polissen sluiten Muay Thai-training, bepaalde duikdieptes en scooterrijden uit. Controleer de dekking voor je activiteiten boekt.' : 'Most standard policies exclude Muay Thai training, certain dive depths, and scooter riding. Check coverage specifics before you book activities.' },
                  { href: '/compare/', title: isNl ? 'Bestemmingen vergelijken' : 'Compare destinations', description: isNl ? 'Vergelijk Thaise steden op kosten, beschikbare activiteiten, stranden en logistiek om te bepalen waar je je baseert.' : 'Compare Thai cities on cost, available activities, beaches, and logistics to decide where to base yourself.' },
                  { href: '/islands/', title: isNl ? 'Eilandgidsen' : 'Island guides', description: isNl ? 'Als duiken of strandactiviteiten de hoofdattractie zijn, behandelt de eilandengids welke kusten bij welke routes passen.' : 'If diving or beach activities are the main draw, the island hub covers which coasts suit which itineraries.' },
                ].map((guide) => (
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

            <p className="text-xs text-gray-400 text-center mt-8">
              {isNl
                ? 'Deze site ontvangt een commissie wanneer je via affiliate links boekt. Dit heeft geen invloed op redactionele aanbevelingen of de volgorde waarin activiteiten worden gepresenteerd.'
                : 'This site earns a commission when you book through affiliate links. This does not affect editorial recommendations or the order in which activities are presented.'}
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const cookingIndex = getCookingClassesIndex();
  const muayThaiIndex = getMuayThaiIndex();
  const elephantIndex = getElephantSanctuariesIndex();
  const divingIndex = getDivingSnorkelingIndex();

  const activities: ActivityType[] = [];

  if (cookingIndex) {
    const cities = cookingIndex.cities as CityEntry[];
    activities.push({
      slug: 'cooking-classes',
      title: 'Cooking Classes',
      description: 'Learn to cook authentic Thai dishes — pad thai, green curry, mango sticky rice — in hands-on classes that typically include a market tour and recipe booklet.',
      editorial: 'Chiang Mai has the strongest concentration of quality cooking schools, with Bangkok a close second. Most full-day courses are genuinely different from the tourist-facing shortcuts.',
      borderColor: 'border-orange-400',
      buttonColor: 'bg-orange-600 hover:bg-orange-700',
      guidePath: '/best-cooking-classes-in-thailand/',
      cities,
      totalActivities: cities.reduce((sum, c) => sum + c.classCount, 0),
      lowestPrice: Math.min(...cities.map(c => c.priceRange.from)),
    });
  }

  if (muayThaiIndex) {
    const cities = muayThaiIndex.cities as CityEntry[];
    activities.push({
      slug: 'muay-thai',
      title: 'Muay Thai',
      description: 'Watch live fights at historic stadiums or train with professional coaches. Thailand is the origin of the sport and Bangkok remains the centre of serious competition.',
      editorial: 'Fight nights at Lumpinee and Rajadamnern in Bangkok are the authentic experience. Phuket and Chiang Mai offer training camps; quality varies significantly between gyms.',
      borderColor: 'border-red-400',
      buttonColor: 'bg-red-600 hover:bg-red-700',
      guidePath: '/best-muay-thai-in-thailand/',
      cities,
      totalActivities: cities.reduce((sum, c) => sum + c.classCount, 0),
      lowestPrice: Math.min(...cities.map(c => c.priceRange.from)),
    });
  }

  if (elephantIndex) {
    const cities = elephantIndex.cities as CityEntry[];
    activities.push({
      slug: 'elephant-sanctuaries',
      title: 'Elephant Sanctuaries',
      description: 'Visit sanctuaries where rescued elephants live without riding or performance requirements. Feed, observe, and walk alongside them in a setting focused on welfare.',
      editorial: 'The ethical distinction matters here. Riding and circus-style shows are harmful to elephants — the guide covers what welfare standards to look for and which certifications carry weight.',
      borderColor: 'border-green-400',
      buttonColor: 'bg-green-600 hover:bg-green-700',
      guidePath: '/best-elephant-sanctuaries-in-thailand/',
      cities,
      totalActivities: cities.reduce((sum, c) => sum + c.classCount, 0),
      lowestPrice: Math.min(...cities.map(c => c.priceRange.from)),
    });
  }

  if (divingIndex) {
    const cities = divingIndex.cities as CityEntry[];
    activities.push({
      slug: 'diving-snorkeling',
      title: 'Diving & Snorkeling',
      description: 'Thailand has two distinct dive regions: the Andaman Sea (Similan Islands, Richelieu Rock, Koh Lanta) and the Gulf (Koh Tao, Sail Rock). Each has different marine life, seasonality, and trip formats.',
      editorial: 'Koh Tao is the most accessible starting point for certification courses. The Similan Islands require a liveaboard or day trip from Khao Lak. Season alignment matters — the coasts close at different times.',
      borderColor: 'border-blue-400',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      guidePath: '/best-diving-snorkeling-in-thailand/',
      cities,
      totalActivities: cities.reduce((sum, c) => sum + c.classCount, 0),
      lowestPrice: Math.min(...cities.map(c => c.priceRange.from)),
    });
  }

  return {
    props: { activities },
    revalidate: 604800
  };
};
