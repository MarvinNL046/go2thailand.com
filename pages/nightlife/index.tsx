import Link from 'next/link';
import { useRouter } from 'next/router';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { useT } from '../../lib/i18n';
import { strings as i18nStrings } from '../../lib/i18n/nightlife-index';

const CITIES = [
  { slug: 'bangkok', name: 'Bangkok', tagline: 'Rooftop bars, mega-clubs, and Khao San Road', desc: 'Thailand\'s capital is the undisputed nightlife capital of Southeast Asia. From sky-high rooftop cocktails above the city skyline to the legendary neon corridors of Nana Plaza, Soi Cowboy, and Patpong, Bangkok offers every style of night out imaginable. Sukhumvit hosts international-standard clubs while Silom draws a mixed crowd of locals and travellers. Expect bar entry from 9pm and clubs running until 2am (or later on weekends).' },
  { slug: 'phuket', name: 'Phuket', tagline: 'Bangla Road, beach clubs, and island parties', desc: 'Bangla Road in Patong remains Thailand\'s most concentrated strip of nightlife: neon-lit go-go bars, open-air clubs with international DJs, and beer bars spilling onto the street. Kata and Karon offer a more relaxed bar scene, while Kamala Beach is home to upscale beach clubs with sun-loungers, cocktails, and sunset sessions. During peak season (Nov–Mar), big-name DJs rotate through venues every weekend.' },
  { slug: 'pattaya', name: 'Pattaya', tagline: 'Walking Street, cabarets, and beachfront bars', desc: 'Pattaya has evolved from its reputation as a pure adult playground into a genuinely diverse nightlife destination. Walking Street is still the epicentre — 800 metres of clubs, cabarets, live music bars, and rooftop lounges. The famous cabaret shows (Alcazar, Tiffany\'s) attract families and couples, while beach road bars and pool clubs round out the scene for those wanting something more casual.' },
  { slug: 'chiang-mai', name: 'Chiang Mai', tagline: 'Laid-back bars, live music, and night bazaars', desc: 'Chiang Mai\'s nightlife is worlds apart from the south. The Nimman area around Nimmanhaemin Road is packed with craft beer bars, wine cafes, live jazz venues, and rooftop terraces. The Night Bazaar and Saturday/Sunday Walking Street are cultural evening experiences as much as shopping events. Bars close earlier here (midnight–1am) by municipal rules, keeping the vibe relaxed and accessible.' },
  { slug: 'koh-samui', name: 'Koh Samui', tagline: 'Beach bars, rooftop clubs, and tropical sunsets', desc: 'Koh Samui\'s nightlife centres on Chaweng Beach Road — a lively strip of open-air bars, live music venues, and clubs that stays busy from around 8pm until 3am. Green Mango and Ark Bar are institution-level venues. The north end of the island near Bophut\'s Fisherman\'s Village offers a calmer alternative: wine bars, seafood restaurants, and Friday night street markets.' },
  { slug: 'koh-phangan', name: 'Koh Phangan', tagline: 'Full Moon Party, Half Moon, and jungle raves', desc: 'Koh Phangan built its global reputation on the Full Moon Party — held monthly on Haad Rin Beach and drawing 10,000–30,000 visitors. But the island\'s party scene now runs throughout the month: Half Moon Festival, Jungle Experience, and Waterfall Party each offer their own electronic music and fire-show experiences. For something calmer, Srithanu\'s yoga-and-café strip has a chilled bohemian bar scene.' },
  { slug: 'krabi', name: 'Krabi', tagline: 'Ao Nang beach bars, reggae bars, and rock-climbing vibes', desc: 'Krabi town and Ao Nang have a relaxed, backpacker-friendly nightlife scene. Ao Nang beachfront is lined with reggae bars, cocktail shacks, and fire-show performers. The famous Reggae Bar in Ao Nang has been a traveller landmark for decades. Krabi Town\'s Maharaj Road has a cluster of local-favourite bars and live music venues popular with long-stay travellers and expats.' },
  { slug: 'hua-hin', name: 'Hua Hin', tagline: 'Cicada market, rooftop bars, and expat pubs', desc: 'Hua Hin is Thailand\'s most refined beach resort town and its nightlife reflects that. The Cicada Night Market (Friday–Sunday) is a cultural-meets-social evening out with art stalls, live music, and street food. Soi Bintabaht is the main bar street. Rooftop bars overlooking the Gulf of Thailand attract a well-heeled mix of Thai weekenders and long-term expats. It\'s nightlife for grown-ups who prefer conversation over thumping bass.' },
];

const NIGHTLIFE_TYPES = [
  {
    title: 'Night Markets',
    icon: '🏮',
    description: 'Night markets are the most authentically Thai nightlife experience. From Bangkok\'s massive Jodd Fairs and Rod Fai (Train Night Market) to Chiang Mai\'s Sunday Walking Street, these open-air markets combine street food, live music, shopping, and people-watching into one relaxed evening out. Entry is free, food is cheap, and the atmosphere is electric. Night markets typically run from 5pm to midnight and are family-friendly.',
  },
  {
    title: 'Rooftop Bars',
    icon: '🍸',
    description: 'Thailand\'s rooftop bar scene is world-class. Bangkok alone has dozens of sky bars perched above its skyscraper skyline — from the legendary Lebua State Tower (inspiration for the Hangover II) to newer venues in Silom, Sathorn, and Ari. Phuket, Koh Samui, and Hua Hin also have excellent rooftop options with ocean views. Dress codes apply at most upscale venues (smart casual, no flip-flops). Budget ฿300–600 per cocktail.',
  },
  {
    title: 'Clubs & Mega-Venues',
    icon: '🎧',
    description: 'Bangkok is home to Southeast Asia\'s most impressive clubs. ONYX on RCA hosts international DJs with a 3,000-person capacity. Club Insanity and Levels in Sukhumvit draw younger crowds with EDM and hip-hop. Phuket\'s Illuzion and Koh Phangan\'s Full Moon Party venues are world-famous on the global dance music circuit. Most clubs charge ฿300–600 cover (often including a drink), open at 10pm, and peak between midnight and 3am.',
  },
  {
    title: 'Live Music Bars',
    icon: '🎸',
    description: 'Thailand has an excellent live music bar culture that most tourists overlook. Bangkok\'s Saxophone Pub (near Victory Monument) has hosted nightly jazz and blues for decades. Chiang Mai\'s North Gate Jazz Co-Op and Zoe in Yellow are beloved institutions. Pattaya\'s Marine Bar and Guitar Pub draw serious rock fans. Live sets typically start at 9–10pm. Cover charges are rare — you just buy drinks. Thai bands often perform note-perfect covers of Western classics.',
  },
  {
    title: 'Go-Go Bars',
    icon: '💃',
    description: 'Go-go bars are a specific category of adult entertainment concentrated in Bangkok\'s Nana Plaza, Soi Cowboy, and Patpong; Phuket\'s Bangla Road; and Pattaya\'s Walking Street. They involve dancers performing on stage and hostesses drinking with customers. They are legal, regulated, and operate openly. If this isn\'t your scene, they are completely avoidable — the rest of Thailand\'s nightlife is entirely separate. Prices: beer ฿120–180, lady drinks ฿180–250.',
  },
  {
    title: 'Beach Clubs',
    icon: '🏖️',
    description: 'Thailand\'s beach club scene rivals Ibiza and Bali for quality. Koh Samui\'s Ark Bar, Phuket\'s Catch Beach Club and Café del Mar, and Koh Phangan\'s Haad Rin beach are internationally recognised. Beach clubs typically start as pool-and-sunlounger venues by day (minimum spend applies) and transition to full party mode after sunset. International DJs perform on weekends, especially during high season (November–March on the west coast).',
  },
];

const SAFETY_TIPS = [
  { tip: 'Set a drink limit before you go out', detail: 'Alcohol is cheap and served in large measures. Chang tower (3L) and bucket cocktails make it easy to drink far more than intended. Decide on a personal limit before the night starts.' },
  { tip: 'Use Grab for taxis', detail: 'Metered taxis and official Grab (Thailand\'s Uber equivalent) are safe and affordable. Never get into an unmarked car. Tuk-tuks are for daytime sightseeing, not late-night transport.' },
  { tip: 'Guard your drinks', detail: 'In crowded venues — particularly go-go bars and large clubs — never leave your drink unattended or accept drinks from strangers you\'ve just met.' },
  { tip: 'Avoid bar scams', detail: 'Pattaya and Bangkok have well-documented gem store scams, "friendly stranger" scams, and inflated bar bills. Do not follow strangers to "special" bars or accept unsolicited directions to nightlife.' },
  { tip: 'Know the closing time laws', detail: 'Bars in most of Thailand are legally required to close by 2am. Some venues extend to 3am with permits. Nightlife in entertainment zones (Patpong, Walking Street) runs later. Police crackdowns occur periodically.' },
  { tip: 'Respect Thai customs', detail: 'Public drunkenness, nudity, or aggressive behaviour can result in arrest. Thailand\'s legal system treats drug offences extremely seriously — penalties include lengthy imprisonment. Never purchase or consume illegal substances.' },
];

export default function NightlifeIndex() {
  const t = useT(i18nStrings);
  const { locale } = useRouter();
  const isNl = locale === 'nl';

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Nachtleven' : 'Nightlife', href: '/nightlife/' },
  ];

  return (
    <>
      <SEOHead
        title={t("s001_thailand_nightlife_guide_2026")}
        description={t("s002_explore_the_best_nightlife")}
      />

      <div className="bg-surface-cream min-h-screen">
        {/* Hero */}
        <section className="bg-surface-dark text-white">
          <div className="container-custom py-16 lg:py-20">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center max-w-3xl mx-auto">
              <span className="section-label">{isNl ? 'Nachtleven Gidsen' : 'Nightlife Guides'}</span>
              <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-6">
                {t("s001_thailand_nightlife_guide_2026")}
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed">
                {t("s002_from_bangkok_rooftop_cocktails")}
              </p>
            </div>
          </div>
        </section>

        {/* Editorial Intro */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto prose prose-lg text-gray-700">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">{t("s003_thailand_s_nightlife_culture")}</h2>
              <p className="mb-4">
                {t("s003_thailand_s_nightlife_is")}
              </p>
              <p className="mb-4">
                {t("s004_the_country_s_most")}
              </p>
              <p className="mb-4">
                {t("s005_what_unifies_thai_nightlife")}
              </p>
              <p className="mb-4">
                {t("s006_the_nightlife_calendar_also")}
              </p>
              <p>
                {t("s007_whether_you_want_a")}
              </p>
            </div>
          </div>
        </section>

        {/* Types of Nightlife */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-2 text-center">{isNl ? 'Soorten Nachtleven in Thailand' : 'Types of Nightlife in Thailand'}</h2>
              <p className="text-center text-gray-600 mb-10">{isNl ? 'Van culturele markten tot megaclubs — weet wat je zoekt voordat je gaat.' : 'From cultural markets to mega-clubs — know what you\'re looking for before you go.'}</p>
              <div className="grid sm:grid-cols-2 gap-6">
                {NIGHTLIFE_TYPES.map((type) => (
                  <div key={type.title} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                    <div className="text-3xl mb-3">{type.icon}</div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">{type.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{type.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* City Grid */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-2 text-center">{isNl ? 'Nachtleven per Stad' : 'Nightlife by City'}</h2>
              <p className="text-center text-gray-600 mb-10">{isNl ? 'Uitgebreide gidsen voor de beste nachtlevenbestemmingen van Thailand.' : 'In-depth guides for Thailand\'s top nightlife destinations.'}</p>
              <div className="grid sm:grid-cols-2 gap-6">
                {CITIES.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/nightlife/${city.slug}/`}
                    className="bg-surface-cream rounded-2xl shadow-sm p-6 hover:shadow-lg hover:border-thailand-gold/40 border border-transparent transition-all group"
                  >
                    <h2 className="text-2xl font-bold font-heading text-gray-900 mb-1 group-hover:text-thailand-gold transition-colors">
                      {city.name}
                    </h2>
                    <p className="text-thailand-gold text-sm font-medium mb-3">{city.tagline}</p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{city.desc}</p>
                    <span className="text-thailand-gold text-sm font-medium">
                      {isNl ? 'Bekijk nachtleven gids' : 'View nightlife guide'} &rarr;
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Safety Tips */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-2 text-center">{isNl ? 'Veiligheid bij Nachtleven in Thailand' : 'Nightlife Safety in Thailand'}</h2>
              <p className="text-center text-gray-600 mb-10">{isNl ? 'Thailand is over het algemeen veilig, maar een paar belangrijke voorzorgsmaatregelen maken het verschil.' : 'Thailand is generally safe but a few key precautions make the difference between a great night and a nightmare.'}</p>
              <div className="space-y-4">
                {SAFETY_TIPS.map((item) => (
                  <div key={item.tip} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex gap-4">
                    <span className="text-thailand-gold font-bold text-lg mt-0.5">✓</span>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{item.tip}</h3>
                      <p className="text-gray-600 text-sm">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Explore More */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6 text-center">
                {isNl ? 'Ontdek Meer van Thailand' : 'Explore More of Thailand'}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link
                  href="/food/"
                  className="bg-surface-cream rounded-xl p-5 hover:shadow-md border border-transparent hover:border-thailand-gold/30 transition-all group"
                >
                  <div className="text-2xl mb-2">&#127836;</div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-thailand-blue transition-colors mb-1">
                    {isNl ? 'Thaise Eetgids' : 'Thai Food Guide'}
                  </h3>
                  <p className="text-sm text-gray-500">{isNl ? 'Gerechten, straatvoedsel & waar te eten' : 'Dishes, street food & where to eat'}</p>
                </Link>
                <Link
                  href="/drinks/"
                  className="bg-surface-cream rounded-xl p-5 hover:shadow-md border border-transparent hover:border-thailand-gold/30 transition-all group"
                >
                  <div className="text-2xl mb-2">&#127865;</div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-thailand-blue transition-colors mb-1">
                    {isNl ? 'Thaise Drankengids' : 'Thai Drinks Guide'}
                  </h3>
                  <p className="text-sm text-gray-500">{isNl ? 'Cocktails, bieren & lokale dranken' : 'Cocktails, beers & local drinks'}</p>
                </Link>
                <Link
                  href="/city/"
                  className="bg-surface-cream rounded-xl p-5 hover:shadow-md border border-transparent hover:border-thailand-gold/30 transition-all group"
                >
                  <div className="text-2xl mb-2">&#127961;&#65039;</div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-thailand-blue transition-colors mb-1">
                    {isNl ? 'Alle Steden' : 'All Cities'}
                  </h3>
                  <p className="text-sm text-gray-500">{isNl ? 'Uitgebreide reisgidsen voor 33 steden' : 'Full travel guides for 33 cities'}</p>
                </Link>
                <Link
                  href="/best-places-to-visit-thailand/"
                  className="bg-surface-cream rounded-xl p-5 hover:shadow-md border border-transparent hover:border-thailand-gold/30 transition-all group"
                >
                  <div className="text-2xl mb-2">&#128205;</div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-thailand-blue transition-colors mb-1">
                    {isNl ? 'Beste Plekken om te Bezoeken' : 'Best Places to Visit'}
                  </h3>
                  <p className="text-sm text-gray-500">{isNl ? 'Top bestemmingen gerangschikt & beoordeeld' : 'Top destinations ranked & reviewed'}</p>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
