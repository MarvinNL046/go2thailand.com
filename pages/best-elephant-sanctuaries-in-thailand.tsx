import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getElephantSanctuariesIndex, getElephantSanctuariesByCity } from '../lib/elephant-sanctuaries';
import { formatPrice } from '../lib/price';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';

interface Sanctuary {
  name: string;
  slug: string;
  rating: number;
  reviews: number;
  priceFrom: number;
  currency: string;
  duration: string;
  groupSize: string;
  badge: string;
}

interface CityEntry {
  slug: string;
  name: { en: string; nl: string };
  classCount: number;
  priceRange: { from: number; to: number; currency: string };
  topRating: number;
  highlight: { en: string; nl: string };
}

interface CityData {
  city: string;
  cityName: { en: string; nl: string };
  intro: { en: string; nl: string };
  classes: Sanctuary[];
}

interface Props {
  cities: CityEntry[];
  topSanctuaries: { cityName: string; citySlug: string; sanctuary: Sanctuary }[];
}

const GYG_AFFILIATE = 'https://getyourguide.tpo.lv/6HngJ5FC';
const KLOOK_AFFILIATE = 'https://klook.tpo.lv/7Dt6WApj';

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: fullStars }, (_, i) => (
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </span>
  );
}

export default function BestElephantSanctuariesPage({ cities, topSanctuaries }: Props) {
  const { locale } = useRouter();
  const loc = locale || 'en';
  const isNl = locale === 'nl';
  const lang = isNl ? 'nl' : 'en';
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Beste Olifanten Opvangcentra in Thailand' : 'Best Elephant Sanctuaries in Thailand', href: '/best-elephant-sanctuaries-in-thailand/' }
  ];

  const title = isNl
    ? 'Beste Ethische Olifanten Opvangcentra in Thailand 2026 — Geen Rijden, Geen Haken'
    : 'Best Ethical Elephant Sanctuaries in Thailand 2026 — No Riding, No Hooks';
  const description = isNl
    ? 'De complete gids voor ethische olifanten opvangcentra in Thailand. Elephant Nature Park, Boon Lott\'s, Elephant Jungle Sanctuary — geen rijden, geen shows, echte redding en natuurbehoud.'
    : 'The complete guide to ethical elephant sanctuaries in Thailand. Elephant Nature Park, Boon Lott\'s, Elephant Jungle Sanctuary — no riding, no shows, genuine rescue and conservation.';

  const faqItems = isNl ? [
    {
      q: 'Waar is de beste plek om een ethisch olifantenopvangcentrum te bezoeken in Thailand?',
      a: 'Chiang Mai is de topbestemming, met Elephant Nature Park — de gouden standaard van olifantenbescherming in Azië, opgericht door Lek Chailert en de Save Elephant Foundation. Het omringende Doi Inthanon hoogland biedt een natuurlijke regenwoudomgeving voor geredde olifanten. Phuket Elephant Sanctuary en opvangcentra in Krabi zijn sterke opties in het zuiden.'
    },
    {
      q: 'Hoeveel kost een bezoek aan een olifantenopvangcentrum in Thailand?',
      a: 'Ethische opvangbezoeken variëren van EUR18 voor een korte voersessie in Krabi tot EUR105 voor een 2-daags vrijwilligers homestay in Chiang Mai. De meeste betrouwbare halfdagprogramma\'s kosten EUR40–70 en omvatten hoteltransfers, olifanten voeren, wandelen met de kudde en een vegetarische Thaise lunch.'
    },
    {
      q: 'Wat maakt een olifantenopvangcentrum echt ethisch?',
      a: 'Echte ethische opvangcentra volgen strikte welzijnsstandaarden: niet rijden, geen stierenhaken, geen kettingen, geen kunstjes en geen direct baden dat de olifanten stress bezorgt. Zoek opvangcentra die worden aanbevolen door World Animal Protection. Boon Lott\'s Elephant Sanctuary (BLES) bij Sukhothai was een van de eerste faciliteiten in Thailand die een volledig hands-off observatiemodel adopteerde.'
    },
    {
      q: 'Zijn hoteltransfers inbegrepen bij olifantenopvangcentra?',
      a: 'Ja, bijna alle olifantenopvangprogramma\'s in Thailand omvatten hotel ophaal- en afzetservice vanuit de belangrijkste toeristische gebieden — inbegrepen in de prijs. Elephant Nature Park biedt ook eigen overnachtingsaccommodatie voor vrijwilligers als je meerdere dagen wilt blijven.'
    },
    {
      q: 'Wat is de beschermingsstatus van Aziatische olifanten in Thailand?',
      a: 'Aziatische olifanten (Elephas maximus) zijn geclassificeerd als Bedreigd op de IUCN Rode Lijst. Een rapport uit 2025 van Thailand\'s Department of National Parks schatte 4.013–4.422 olifanten in het land, waarvan 3.084–4.422 in het wild in 91 beschermde gebieden. De wereldwijde populatie wordt geschat op 48.000–52.000. Belangrijkste bedreigingen zijn habitatverlies, mens-olifant conflict en stroperij voor ivoor.'
    }
  ] : [
    {
      q: 'Where is the best place to visit an ethical elephant sanctuary in Thailand?',
      a: 'Chiang Mai is the top destination, home to Elephant Nature Park — the gold standard of elephant conservation in Asia, founded by Lek Chailert and the Save Elephant Foundation. The surrounding Doi Inthanon highlands provide a natural rainforest setting for rescued elephants to roam free. Phuket Elephant Sanctuary and sanctuaries in Krabi are strong options in the south.'
    },
    {
      q: 'How much does an elephant sanctuary visit cost in Thailand?',
      a: 'Ethical sanctuary visits range from EUR18 for a short feeding session in Krabi to EUR105 for a 2-day volunteer homestay in Chiang Mai. Most reputable half-day programs cost EUR40–70 and include hotel transfers, elephant feeding, walking with the herd, and a vegetarian Thai lunch.'
    },
    {
      q: 'What makes an elephant sanctuary truly ethical?',
      a: 'Genuine ethical sanctuaries follow strict welfare standards: no riding, no bull hooks, no chains, no performing tricks, and no direct bathing that stresses the elephants. Look for sanctuaries endorsed or rated by World Animal Protection. Boon Lott\'s Elephant Sanctuary (BLES) near Sukhothai was one of the first facilities in Thailand to adopt a fully hands-off observation model. Elephant Nature Park rescues elephants from logging camps, street begging, and abusive tourist camps.'
    },
    {
      q: 'Do elephant sanctuaries include hotel transfers?',
      a: 'Yes, almost all elephant sanctuary programs in Thailand include hotel pickup and drop-off from main tourist areas — included in the price. Elephant Nature Park also offers its own overnight volunteer accommodation if you want to stay multiple days.'
    },
    {
      q: 'What is the conservation status of Asian elephants in Thailand?',
      a: 'Asian elephants (Elephas maximus) are classified as Endangered on the IUCN Red List. A 2025 report by Thailand\'s Department of National Parks estimated 4,013–4,422 elephants in the country, including 3,084–4,422 in the wild across 91 protected areas. The global Asian elephant population is estimated at 48,000–52,000. Key threats include habitat loss, human-elephant conflict, and poaching for ivory.'
    }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a
      }
    }))
  };

  return (
    <>
      <SEOHead title={title} description={description}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero */}
        <section className="bg-surface-dark text-white">
          <div className="container-custom py-12">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center mt-6">
              <p className="font-script text-thailand-gold text-lg mb-2">{isNl ? 'Ethisch Wildlife' : 'Ethical Wildlife'}</p>
              <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-4">
                {isNl ? 'Beste Ethische Olifanten Opvangcentra in Thailand' : 'Best Ethical Elephant Sanctuaries in Thailand'}
              </h1>
              <p className="text-xl max-w-3xl mx-auto text-gray-300">
                {isNl
                  ? 'Thailand heeft naar schatting 4.000 olifanten — velen gered van houtkap en toerisme-uitbuiting. Deze opvangcentra bieden echte welzijnsgerichte bezoeken: geen rijden, geen haken, geen shows. Gewoon olifanten die leven als olifanten.'
                  : 'Thailand has an estimated 4,000 elephants — many rescued from logging and tourism exploitation. These sanctuaries offer genuine welfare-focused visits: no riding, no hooks, no shows. Just elephants living as elephants.'}
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            {/* Quick Comparison Table */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-12">
              <p className="section-label px-6 pt-6">{isNl ? 'Vergelijk' : 'Compare'}</p>
              <h2 className="text-2xl font-bold font-heading text-gray-900 p-6 pb-0">
                {isNl ? 'Steden Vergelijking in een Oogopslag' : 'City Comparison at a Glance'}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-surface-cream">
                    <tr>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">{isNl ? 'Stad' : 'City'}</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">{isNl ? 'Opvangcentra' : 'Sanctuaries'}</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">{isNl ? 'Prijsklasse' : 'Price Range'}</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">{isNl ? 'Beste Voor' : 'Best For'}</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {cities.map((city) => (
                      <tr key={city.slug} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <Link href={`/city/${city.slug}/elephant-sanctuaries/`} className="font-semibold text-thailand-blue hover:underline">
                            {city.name[lang] || city.name.en}
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{city.classCount}+</td>
                        <td className="px-6 py-4 text-gray-700">
                          {formatPrice(city.priceRange.from, loc)} - {formatPrice(city.priceRange.to, loc)}
                        </td>
                        <td className="px-6 py-4 text-gray-600 text-sm">{(city.highlight[lang] || city.highlight.en).split('.')[0]}</td>
                        <td className="px-6 py-4">
                          <Link
                            href={`/city/${city.slug}/elephant-sanctuaries/`}
                            className="text-sm font-semibold text-thailand-blue hover:text-blue-800"
                          >
                            {isNl ? 'Bekijk alle' : 'View all'} &rarr;
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* City Sections */}
            {cities.map((city, index) => (
              <div key={city.slug} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-8 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-lg font-bold text-white bg-thailand-blue w-8 h-8 rounded-xl flex items-center justify-center">
                    {index + 1}
                  </span>
                  <h2 className="text-2xl font-bold font-heading text-gray-900">
                    <Link href={`/city/${city.slug}/elephant-sanctuaries/`} className="hover:text-thailand-blue">
                      {isNl ? `Olifanten Opvangcentra in ${city.name.nl || city.name.en}` : `Elephant Sanctuaries in ${city.name.en}`}
                    </Link>
                  </h2>
                </div>
                <p className="text-gray-700 mb-4">{city.highlight[lang] || city.highlight.en}</p>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-surface-cream rounded-xl p-3 text-center">
                    <div className="text-lg font-bold text-gray-900">{city.classCount}+</div>
                    <div className="text-xs text-gray-600">{isNl ? 'Opvangcentra' : 'Sanctuaries'}</div>
                  </div>
                  <div className="bg-surface-cream rounded-xl p-3 text-center">
                    <div className="text-lg font-bold text-gray-900">
                      {formatPrice(city.priceRange.from, loc)}+
                    </div>
                    <div className="text-xs text-gray-600">{isNl ? 'Vanafprijs' : 'Starting Price'}</div>
                  </div>
                  <div className="bg-surface-cream rounded-xl p-3 text-center">
                    <div className="text-lg font-bold text-gray-900">{city.topRating}</div>
                    <div className="text-xs text-gray-600">{isNl ? 'Hoogste Beoordeling' : 'Top Rating'}</div>
                  </div>
                </div>

                {/* Top 3 sanctuaries for this city */}
                <div className="space-y-3 mb-6">
                  {topSanctuaries
                    .filter(ts => ts.citySlug === city.slug)
                    .slice(0, 3)
                    .map((ts, i) => (
                      <div key={ts.sanctuary.slug} className="flex items-center justify-between p-3 bg-surface-cream rounded-xl">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-gray-400">#{i + 1}</span>
                          <div>
                            <div className="font-medium text-gray-900 text-sm">{ts.sanctuary.name}</div>
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              {ts.sanctuary.rating > 0 && (
                                <>
                                  <StarRating rating={ts.sanctuary.rating} />
                                  <span>{ts.sanctuary.rating}</span>
                                  {ts.sanctuary.reviews > 0 && <span>({ts.sanctuary.reviews.toLocaleString()})</span>}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-900">{formatPrice(ts.sanctuary.priceFrom, loc)}</div>
                        </div>
                      </div>
                    ))}
                </div>

                <Link
                  href={`/city/${city.slug}/elephant-sanctuaries/`}
                  className="inline-flex items-center text-thailand-blue font-semibold hover:text-blue-800"
                >
                  {isNl ? `Bekijk alle ${city.classCount} opvangcentra in ${city.name.nl || city.name.en}` : `See all ${city.classCount} sanctuaries in ${city.name.en}`} &rarr;
                </Link>
              </div>
            ))}

            {/* Conservation Context */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <p className="section-label">{isNl ? 'Natuurbehoud' : 'Conservation'}</p>
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                {isNl ? 'Waarom Olifantenwelzijn Belangrijk Is' : 'Why Elephant Welfare Matters'}
              </h2>
              <div className="prose prose-gray max-w-none text-gray-700 space-y-4">
                <p>
                  Asian elephants (<em>Elephas maximus</em>) are listed as <strong>Endangered</strong> on the IUCN Red List — a classification held since 1986. The global population stands at an estimated 48,000–52,000 individuals. In Thailand, a 2025 survey by the Department of National Parks, Wildlife and Plant Conservation (DNP) counted <strong>4,013–4,422 elephants</strong> nationwide, with 3,084–4,422 living wild across 91 protected areas.
                </p>
                <p>
                  The threats are severe: habitat destruction driven by agricultural expansion, human-elephant conflict at forest boundaries, and ongoing poaching for ivory. Captive elephants face a separate set of problems — historically exploited for logging until Thailand banned commercial logging in 1989, many elephants moved into tourism, where bull hooks, chains, and riding saddles caused lasting physical and psychological damage.
                </p>
                <p>
                  A <strong>2017 World Animal Protection study</strong> found that more than 75% of elephants used in Asian tourism were living in cruel conditions. The shift toward ethical sanctuaries — no riding, no chains, no direct contact shows — represents a fundamental change in how Thailand&apos;s tourism industry treats these animals.
                </p>
                <p>
                  {isNl
                    ? <>De <strong>Save Elephant Foundation</strong>, geleid door Saengduean &quot;Lek&quot; Chailert, speelt een centrale rol in deze verschuiving sinds de oprichting van Elephant Nature Park in 1995. Lek heeft meerdere internationale natuurbeschermingsprijzen ontvangen voor haar werk met het rehabiliteren van olifanten die decennialang zijn mishandeld.</>
                    : <>The <strong>Save Elephant Foundation</strong>, run by Saengduean &quot;Lek&quot; Chailert, has been central to this shift since founding Elephant Nature Park in 1995. Lek has received multiple international conservation awards for her work rehabilitating elephants traumatised by decades of abuse.</>}
                </p>
              </div>
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { stat: '~4,000', label: 'Elephants in Thailand' },
                  { stat: 'Endangered', label: 'IUCN Red List Status' },
                  { stat: '75%+', label: 'Tourism elephants in poor conditions (WAP 2017)' },
                  { stat: '1989', label: 'Thailand logging ban year' },
                ].map((item) => (
                  <div key={item.stat} className="bg-surface-cream rounded-xl p-4 text-center">
                    <div className="text-xl font-bold text-thailand-blue">{item.stat}</div>
                    <div className="text-xs text-gray-600 mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Sanctuaries */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <p className="section-label">{isNl ? 'Uitgelichte Opvangcentra' : 'Featured Sanctuaries'}</p>
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">
                {isNl ? 'Top Ethische Opvangcentra in Thailand' : 'Top Ethical Sanctuaries in Thailand'}
              </h2>
              <div className="space-y-6">
                {[
                  {
                    name: 'Elephant Nature Park',
                    location: 'Mae Taeng Valley, Chiang Mai (60 km north of city)',
                    badge: 'Gold Standard',
                    badgeColor: 'bg-yellow-100 text-yellow-800',
                    description: 'Founded in 1995 by Lek Chailert and the Save Elephant Foundation, Elephant Nature Park is the most respected elephant rescue and rehabilitation centre in Asia. Over 75 elephants roam the park — blind, crippled, orphaned, and elderly individuals rescued from logging camps, street begging, and abusive tourism operations. There is no riding, no tricks, no bull hooks. Visitors walk with the free-roaming herd, prepare and feed fruit, and observe natural herd behaviour. Day visits and multi-day volunteer programs available.',
                    policy: 'No riding · No hooks · No chains · No performing',
                    source: 'saveelephant.org',
                  },
                  {
                    name: 'Boon Lott\'s Elephant Sanctuary (BLES)',
                    location: 'Sukhothai Province (north-central Thailand)',
                    badge: 'Hands-Off Model',
                    badgeColor: 'bg-green-100 text-green-800',
                    description: 'Founded by Katherine Connor in memory of a young elephant named Boon Lott, BLES was one of the first facilities in Thailand to adopt a fully hands-off observation approach. Guests never approach or touch the elephants. Instead, the 540-acre reserve allows rescued elephants to rediscover their natural instincts entirely on their own terms. A maximum of 10 guests are allowed at any time to minimise disturbance. All profits go directly back into conservation. Regarded by Wildlife Friends Foundation Thailand and international welfare organisations as a benchmark for true sanctuary ethics.',
                    policy: 'No feeding · No bathing · No contact · Max 10 guests',
                    source: 'blesele.org',
                  },
                  {
                    name: 'Elephant Jungle Sanctuary',
                    location: 'Multiple sites: Chiang Mai, Pattaya, Phuket, Samui',
                    badge: 'Multi-Site',
                    badgeColor: 'bg-blue-100 text-blue-700',
                    description: 'One of the most accessible ethical sanctuary networks in Thailand, Elephant Jungle Sanctuary operates sites in Chiang Mai, Pattaya, Phuket, and Koh Samui. The model focuses on feeding and walking alongside the herd in natural jungle settings. No riding, no shows, and strict no-hook policies are enforced across all locations. Their Chiang Mai camp is the original and largest, operating since 2014. Popular with travellers who want an ethical experience without venturing far from major tourist hubs.',
                    policy: 'No riding · No shows · No hooks · Hotel transfers included',
                    source: 'elephantjunglesanctuary.com',
                  },
                  {
                    name: 'Phuket Elephant Sanctuary',
                    location: 'Paklok, Phuket (northern Phuket)',
                    badge: 'South Thailand',
                    badgeColor: 'bg-purple-100 text-purple-700',
                    description: 'The only dedicated elephant sanctuary in Phuket with a genuine rescue-and-care mission. Elephants previously used in tourism and riding camps are retired here on a large forested reserve. Visitors observe and feed the elephants from a raised walkway and bamboo platforms — no direct contact or riding. The sanctuary partners with the Save Elephant Foundation and follows the same welfare standards as Elephant Nature Park.',
                    policy: 'No riding · No direct contact · Observation only · WAP-aligned',
                    source: 'phuketelephantsanctuary.org',
                  },
                ].map((sanctuary, index) => (
                  <div key={sanctuary.name} className="flex gap-4 p-5 bg-surface-cream rounded-xl">
                    <div className="flex flex-col items-center min-w-[36px]">
                      <span className="text-lg font-bold text-white bg-thailand-blue w-8 h-8 rounded-xl flex items-center justify-center">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-bold font-heading text-gray-900">{sanctuary.name}</h3>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${sanctuary.badgeColor}`}>{sanctuary.badge}</span>
                      </div>
                      <div className="text-xs text-gray-500 mb-2">{sanctuary.location}</div>
                      <p className="text-sm text-gray-700 mb-3">{sanctuary.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {sanctuary.policy.split(' · ').map((p, i) => (
                          <span key={i} className="text-[11px] bg-white text-gray-600 px-2 py-0.5 rounded-full shadow-sm">{p}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
                <p className="text-sm text-gray-700">
                  <strong>Red flag checklist:</strong> Avoid any venue that offers elephant riding, bull hooks, shows where elephants perform tricks (painting, football), or chains visible in guest photos. World Animal Protection and Wildlife Friends Foundation Thailand are reliable sources for identifying abusive operations.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-surface-dark rounded-2xl p-8 mb-12 text-center text-white">
              <p className="font-script text-thailand-gold text-lg mb-2">{isNl ? 'Boek je Bezoek' : 'Book Your Visit'}</p>
              <h2 className="text-3xl font-bold font-heading mb-4">{isNl ? 'Klaar om Thailand\'s Olifanten te Ontmoeten?' : 'Ready to Meet Thailand\'s Elephants?'}</h2>
              <p className="text-lg mb-6 opacity-90">
                {isNl ? 'Bekijk ethische olifanten opvangcentra door heel Thailand op deze vertrouwde boekingsplatformen.' : 'Browse ethical elephant sanctuaries across Thailand on these trusted booking platforms.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={GYG_AFFILIATE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 bg-white text-thailand-blue font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Browse on GetYourGuide
                </a>
                <a
                  href={KLOOK_AFFILIATE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-colors border border-white/40"
                >
                  Browse on Klook
                </a>
              </div>
              <p className="text-xs text-white/70 mt-4">
                {isNl ? 'We kunnen een commissie ontvangen wanneer je boekt via onze links, zonder extra kosten voor jou.' : 'We may earn a commission when you book through our links, at no extra cost to you.'}
              </p>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
              <p className="section-label">FAQ</p>
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">
                {isNl ? 'Veelgestelde Vragen' : 'Frequently Asked Questions'}
              </h2>
              <div className="space-y-6">
                {faqItems.map((item, i) => (
                  <div key={i}>
                    <h3 className="text-lg font-semibold font-heading text-gray-900 mb-2">{item.q}</h3>
                    <p className="text-gray-700">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Explore More */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
              <p className="section-label">{isNl ? 'Ontdek Meer' : 'Explore More'}</p>
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">
                {isNl ? 'Gerelateerde Gidsen' : 'Related Guides'}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Link href="/travel-insurance-thailand/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all">
                  <div className="font-semibold text-gray-900">Travel Insurance</div>
                  <div className="text-xs text-gray-600">Essential for activities</div>
                </Link>
                <Link href="/food/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all">
                  <div className="font-semibold text-gray-900">Thai Food Guide</div>
                  <div className="text-xs text-gray-600">Cuisine & street food</div>
                </Link>
                <Link href="/best-places-to-visit-thailand/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all">
                  <div className="font-semibold text-gray-900">Best Places to Visit</div>
                  <div className="text-xs text-gray-600">Top destinations</div>
                </Link>
                <Link href="/islands/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all">
                  <div className="font-semibold text-gray-900">Thai Islands</div>
                  <div className="text-xs text-gray-600">Beaches & island life</div>
                </Link>
                <Link href="/thailand-for-first-timers/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all">
                  <div className="font-semibold text-gray-900">First Timer&apos;s Guide</div>
                  <div className="text-xs text-gray-600">Everything you need to know</div>
                </Link>
                <Link href="/best-diving-snorkeling-in-thailand/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all">
                  <div className="font-semibold text-gray-900">Diving &amp; Snorkeling</div>
                  <div className="text-xs text-gray-600">Reefs & underwater life</div>
                </Link>
                <Link href="/best-muay-thai-in-thailand/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all">
                  <div className="font-semibold text-gray-900">Muay Thai</div>
                  <div className="text-xs text-gray-600">Training & fight nights</div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const index = getElephantSanctuariesIndex();
  if (!index) return { notFound: true };

  const topSanctuaries: { cityName: string; citySlug: string; sanctuary: Sanctuary }[] = [];

  index.cities.forEach((city: CityEntry) => {
    const data = getElephantSanctuariesByCity(city.slug) as CityData | null;
    if (data) {
      data.classes.slice(0, 3).forEach((sanctuary: Sanctuary) => {
        topSanctuaries.push({
          cityName: city.name.en,
          citySlug: city.slug,
          sanctuary
        });
      });
    }
  });

  return {
    props: {
      cities: index.cities,
      topSanctuaries
    },
    revalidate: 604800
  };
};
