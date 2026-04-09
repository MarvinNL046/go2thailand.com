import React from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import SEOHead from '../../components/SEOHead';
import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';
import { TRIP_GENERIC, withPlacementSubId } from '../../lib/affiliates';
import citiesData from '../../data/cities/index.json';

interface WeatherIndexProps {
  cities: Array<{
    id: number;
    slug: string;
    name: { en: string; nl: string };
    region: string;
  }>;
}

const monthlyHighlights = {
  en: [
    { month: 'january', name: 'January', description: 'Cool & Dry - Peak Season', emoji: '' },
    { month: 'february', name: 'February', description: 'Perfect Weather', emoji: '' },
    { month: 'march', name: 'March', description: 'Getting Warmer', emoji: '' },
    { month: 'april', name: 'April', description: 'Songkran Festival', emoji: '' },
    { month: 'may', name: 'May', description: 'Rainy Season Begins', emoji: '' },
    { month: 'june', name: 'June', description: 'Green Season', emoji: '' },
    { month: 'july', name: 'July', description: 'Peak Rainy Season', emoji: '' },
    { month: 'august', name: 'August', description: 'Monsoon Season', emoji: '' },
    { month: 'september', name: 'September', description: 'Wettest Month', emoji: '' },
    { month: 'october', name: 'October', description: 'Rain Decreasing', emoji: '' },
    { month: 'november', name: 'November', description: 'Loy Krathong - Cool Returns', emoji: '' },
    { month: 'december', name: 'December', description: 'Peak Cool Season', emoji: '' }
  ],
  nl: [
    { month: 'january', name: 'Januari', description: 'Koel & Droog - Hoogseizoen', emoji: '' },
    { month: 'february', name: 'Februari', description: 'Perfect Weer', emoji: '' },
    { month: 'march', name: 'Maart', description: 'Wordt Warmer', emoji: '' },
    { month: 'april', name: 'April', description: 'Songkran Festival', emoji: '' },
    { month: 'may', name: 'Mei', description: 'Regenseizoen Begint', emoji: '' },
    { month: 'june', name: 'Juni', description: 'Groene Seizoen', emoji: '' },
    { month: 'july', name: 'Juli', description: 'Piek Regenseizoen', emoji: '' },
    { month: 'august', name: 'Augustus', description: 'Moessonseizoen', emoji: '' },
    { month: 'september', name: 'September', description: 'Natste Maand', emoji: '' },
    { month: 'october', name: 'Oktober', description: 'Regen Neemt Af', emoji: '' },
    { month: 'november', name: 'November', description: 'Loy Krathong - Koelte Keert Terug', emoji: '' },
    { month: 'december', name: 'December', description: 'Piek Koele Seizoen', emoji: '' }
  ]
};

const weatherFaqs = {
  en: [
    {
      question: 'What is the best month to visit Thailand?',
      answer: 'The best months to visit Thailand are November through February, during the cool and dry season. December and January offer the most comfortable weather across the country with lower humidity and minimal rainfall.'
    },
    {
      question: 'Does it rain every day during monsoon season in Thailand?',
      answer: 'No, it does not rain all day during monsoon season (June-October). Typically you will experience short but heavy afternoon showers lasting 1-2 hours, with sunshine the rest of the day. Many travelers enjoy this season for fewer crowds and lower prices.'
    },
    {
      question: 'What is the hottest month in Thailand?',
      answer: 'April is the hottest month in Thailand, with temperatures regularly reaching 38-40\u00B0C (100-104\u00B0F) in central and northern regions. The Songkran water festival in mid-April helps cool things down, making it a fun time to visit despite the heat.'
    },
    {
      question: 'Is Thailand weather the same everywhere?',
      answer: 'No, Thailand has distinct regional weather patterns. Northern Thailand (Chiang Mai) has cooler winters and distinct seasons. Central Thailand (Bangkok) is hot year-round. The southern coasts have different monsoon seasons: the Andaman coast (Phuket, Krabi) is wettest June-October, while the Gulf coast (Koh Samui) is wettest October-December.'
    },
    {
      question: 'Can I visit Thai islands during rainy season?',
      answer: 'Yes, but choose your coast wisely. The Gulf islands (Koh Samui, Koh Phangan, Koh Tao) have their best weather from January to September, making them ideal during the traditional rainy season. The Andaman islands (Phuket, Koh Phi Phi, Koh Lanta) are best from November to April.'
    },
    {
      question: 'What should I pack for Thailand weather?',
      answer: 'Pack lightweight, breathable clothing year-round. Bring a light rain jacket or umbrella regardless of season. During the cool season (November-February), pack a light sweater for northern Thailand evenings. Sunscreen and a hat are essential in every season due to strong tropical UV rays.'
    }
  ],
  nl: [
    {
      question: 'Wat is de beste maand om Thailand te bezoeken?',
      answer: 'De beste maanden om Thailand te bezoeken zijn november tot en met februari, tijdens het koele en droge seizoen. December en januari bieden het meest comfortabele weer in het hele land met lagere luchtvochtigheid en minimale regenval.'
    },
    {
      question: 'Regent het elke dag tijdens het moessonseizoen in Thailand?',
      answer: 'Nee, het regent niet de hele dag tijdens het moessonseizoen (juni-oktober). Je ervaart doorgaans korte maar hevige middagbuien van 1-2 uur, met zonneschijn de rest van de dag. Veel reizigers genieten van dit seizoen vanwege minder drukte en lagere prijzen.'
    },
    {
      question: 'Wat is de warmste maand in Thailand?',
      answer: 'April is de warmste maand in Thailand, met temperaturen die regelmatig 38-40\u00B0C bereiken in centraal en noordelijk Thailand. Het Songkran waterfestival halverwege april helpt om af te koelen, waardoor het een leuke tijd is om te bezoeken ondanks de hitte.'
    },
    {
      question: 'Is het weer in Thailand overal hetzelfde?',
      answer: 'Nee, Thailand heeft verschillende regionale weerpatronen. Noord-Thailand (Chiang Mai) heeft koelere winters en duidelijke seizoenen. Centraal Thailand (Bangkok) is het hele jaar heet. De zuidelijke kusten hebben verschillende moessonseizoenen: de Andamankust (Phuket, Krabi) is het natst van juni-oktober, terwijl de Golfkust (Koh Samui) het natst is van oktober-december.'
    },
    {
      question: 'Kan ik Thaise eilanden bezoeken tijdens het regenseizoen?',
      answer: 'Ja, maar kies je kust verstandig. De Golfeilanden (Koh Samui, Koh Phangan, Koh Tao) hebben hun beste weer van januari tot september, waardoor ze ideaal zijn tijdens het traditionele regenseizoen. De Andaman-eilanden (Phuket, Koh Phi Phi, Koh Lanta) zijn het best van november tot april.'
    },
    {
      question: 'Wat moet ik inpakken voor het weer in Thailand?',
      answer: 'Pak het hele jaar door lichte, ademende kleding in. Neem altijd een licht regenjack of paraplu mee, ongeacht het seizoen. Pak tijdens het koele seizoen (november-februari) een lichte trui in voor de avonden in Noord-Thailand. Zonnebrandcr\u00e8me en een hoed zijn essentieel in elk seizoen vanwege de sterke tropische UV-straling.'
    }
  ]
};

const WeatherIndex: React.FC<WeatherIndexProps> = ({ cities }) => {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const trackAffiliate = (url: string, placement: string) =>
    withPlacementSubId(url, 'weather', placement);

  const currentMonths = isNl ? monthlyHighlights.nl : monthlyHighlights.en;
  const currentFaqs = isNl ? weatherFaqs.nl : weatherFaqs.en;

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Weergids' : 'Weather Guide', href: '/weather' }
  ];

  // Group cities by region
  const citiesByRegion = cities.reduce((acc, city) => {
    if (!acc[city.region]) {
      acc[city.region] = [];
    }
    acc[city.region].push(city);
    return acc;
  }, {} as Record<string, typeof cities>);

  return (
    <div className="min-h-screen bg-surface-cream">
      <SEOHead
        title={isNl
          ? 'Thailand Weer \u2014 Beste Reistijd & Seizoenen 2026'
          : 'Thailand Weather \u2014 Best Time to Visit & Seasons 2026'}
        description={isNl
          ? 'Wanneer Thailand bezoeken? Maandelijks weer, regenseizoen data, temperatuur & luchtvochtigheid voor 33 steden. Plan de perfecte reis met onze 2026 klimaatgids.'
          : 'When to visit Thailand? Monthly weather, rainy season dates, temperature & humidity for 33 cities. Plan the perfect trip with our 2026 climate guide.'}
      >
        <meta name="keywords" content={isNl
          ? 'Thailand weer, Thailand klimaat, Thaise steden weer, beste reistijd Thailand, Thailand seizoenen, Thailand temperatuur'
          : 'Thailand weather, Thailand climate, Thai cities weather, best time visit Thailand, Thailand seasons, Thailand temperature'} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": currentFaqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            })
          }}
        />
      </SEOHead>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <p className="font-script text-thailand-gold mb-2">{isNl ? 'Klimaatgids' : 'Climate Guide'}</p>
        <h1 className="text-4xl font-bold font-heading text-gray-900 mb-8">
          {isNl ? 'Thailand Weergids' : 'Thailand Weather Guide'}
        </h1>

        {/* Introduction */}
        <section className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <p className="text-gray-700 leading-relaxed mb-4">
            {isNl
              ? 'Je Thailand avontuur plannen? Het weer begrijpen is de sleutel tot een perfecte reis. Thailand heeft drie hoofdseizoenen: Koel (november\u2013februari), Heet (maart\u2013mei) en Regen (juni\u2013oktober). Elke regio en stad heeft zijn eigen weerpatronen. Gebruik deze gids om de beste reistijd voor elke bestemming te vinden.'
              : 'Planning your Thailand adventure? Understanding the weather is key to a perfect trip. Thailand has three main seasons: Cool (November\u2013February), Hot (March\u2013May), and Rainy (June\u2013October). Each region and city has its own weather patterns. Use this guide to find the best time to visit each destination.'}
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            {isNl
              ? 'Een van de belangrijkste dingen om te begrijpen is dat de twee kustlijnen van Thailand op tegengestelde moessonschema\'s werken. De Andamankust (Phuket, Krabi, Koh Lanta, Koh Phi Phi) krijgt de zuidwestmoesson van mei tot oktober \u2014 dit is het natte seizoen, waarbij sommige stranden en bootdiensten volledig sluiten in september en oktober. De Golf van Thailand-kust (Koh Samui, Koh Phangan, Koh Tao, Hua Hin) is grotendeels beschut tegen de zuidwestmoesson en krijgt in plaats daarvan regen van de noordoostmoesson in november en december.'
              : 'One of the most important things to understand is that Thailand\'s two coastlines operate on opposite monsoon schedules. The Andaman coast (Phuket, Krabi, Koh Lanta, Koh Phi Phi) receives the southwest monsoon from May to October \u2014 this is its wet season, with some beaches and boat services closing entirely in September and October. The Gulf of Thailand coast (Koh Samui, Koh Phangan, Koh Tao, Hua Hin) is largely sheltered from the southwest monsoon and instead gets its rain from the northeast monsoon in November and December. This means that when Phuket is at peak season (December\u2013April), Koh Samui\'s best months are January\u2013September.'}
          </p>
          <p className="text-gray-700 leading-relaxed">
            {isNl
              ? 'Noord-Thailand (Chiang Mai, Chiang Rai) volgt weer een ander patroon: een echt koel seizoen van november tot februari met temperaturen die soms zakken tot 10\u00B0C \'s nachts in de bergen, een zeer hete en rokerige maart\u2013april (brandseizoen), en een groen, weelderig regenseizoen van juni tot oktober dat de bergen omtovert tot uitstekend trekking terrein.'
              : 'Northern Thailand (Chiang Mai, Chiang Rai) follows yet another pattern: a genuine cool season from November to February with temperatures sometimes dropping to 10\u00B0C at night in the mountains, a very hot and smoky March\u2013April (burning season), and a green, lush rainy season from June to October that transforms the mountains into excellent trekking terrain.'}
          </p>
        </section>

        {/* Activities by Season */}
        <section className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <p className="section-label">{isNl ? 'Activiteiten' : 'Activities'}</p>
          <h2 className="text-2xl font-bold font-heading mb-6">{isNl ? 'Activiteiten per Seizoen' : 'Activities by Season'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-cream rounded-2xl p-5">
              <h3 className="font-bold font-heading text-lg text-gray-900 mb-3">{isNl ? 'Duiken & Snorkelen' : 'Scuba Diving & Snorkelling'}</h3>
              <p className="text-sm text-gray-700 mb-3">
                {isNl
                  ? 'Het beste duiken in Thailand hangt volledig af van welke kust je bezoekt. De Andamanzee (Similan-eilanden, Koh Bon, Richelieu Rock) heeft de beste zichtbaarheid van november tot april \u2014 kalme zee\u00ebn, 30m+ zicht en walvishaaien van februari tot april. De Golf van Thailand duiklocaties (Koh Tao, Sail Rock, Chumphon Pinnacle) zijn het hele jaar door bereikbaar, met piekcondiaties van maart tot september.'
                  : 'The best diving in Thailand depends entirely on which coast you\'re visiting. The Andaman Sea (Similan Islands, Koh Bon, Richelieu Rock) has its finest visibility from November to April \u2014 calm seas, 30m+ visibility, and whale sharks from February to April. The Similan Islands National Park closes entirely May\u2013October. Gulf of Thailand dive sites (Koh Tao, Sail Rock, Chumphon Pinnacle) are diveable year-round, with peak conditions from March to September. Koh Tao has some of the cheapest PADI dive certification courses in the world.'}
              </p>
              <p className="text-xs text-thailand-gold font-medium">{isNl ? 'Beste maanden: Nov\u2013Apr (Andaman) | Mar\u2013Sep (Golf)' : 'Best months: Nov\u2013Apr (Andaman) | Mar\u2013Sep (Gulf)'}</p>
            </div>
            <div className="bg-surface-cream rounded-2xl p-5">
              <h3 className="font-bold font-heading text-lg text-gray-900 mb-3">{isNl ? 'Trekking & Wandelen' : 'Trekking & Hiking'}</h3>
              <p className="text-sm text-gray-700 mb-3">
                {isNl
                  ? 'Het koele seizoen (november tot februari) is de beste trekkingtijd in Noord-Thailand. Temperaturen in Chiang Mai liggen rond 15\u201325\u00B0C, junglepaden zijn droog en begaanbaar, en bergstam-dorpsverblijven zijn comfortabel. Vermijd trekking in maart\u2013april wanneer bosbranden gevaarlijke rook en hitte veroorzaken.'
                  : 'The cool season (November to February) is prime trekking time in northern Thailand. Temperatures in Chiang Mai sit at 15\u201325\u00B0C, jungle trails are dry and manageable, and hill tribe village stays are comfortable. Doi Inthanon, Doi Pha Hom Pok, and the trails around Mae Hong Son are all at their best. Avoid trekking in March\u2013April when forest fires create dangerous smoke and heat. Rainy season (June\u2013October) makes northern jungles lush and photogenic but trails can be slippery and leech-heavy \u2014 waterproof boots essential.'}
              </p>
              <p className="text-xs text-thailand-gold font-medium">{isNl ? 'Beste maanden: Nov\u2013Feb (noord), Jun\u2013Okt voor weelderig landschap' : 'Best months: Nov\u2013Feb (north), Jun\u2013Oct for lush scenery'}</p>
            </div>
            <div className="bg-surface-cream rounded-2xl p-5">
              <h3 className="font-bold font-heading text-lg text-gray-900 mb-3">{isNl ? 'Strandvakanties' : 'Beach Holidays'}</h3>
              <p className="text-sm text-gray-700 mb-3">
                {isNl
                  ? 'Voor de klassieke Thailand strandvakantie \u2014 turquoise water, wit zand, lage golven \u2014 hangt de timing af van je bestemming. Phuket en Krabi: december tot maart is hoogseizoen. Koh Samui en Koh Phangan: januari tot september. Voor gezinnen die gegarandeerd strandweer willen in het hele land zijn januari en februari de veiligste maanden.'
                  : 'For the classic Thailand beach holiday \u2014 turquoise water, white sand, low waves \u2014 timing depends on your destination. Phuket and Krabi: December to March is peak season with flat seas and full sun. Koh Samui and Koh Phangan: January to September, avoiding the northeast monsoon in November\u2013December. Koh Chang (eastern coast): November to May. For families wanting guaranteed beach weather across the whole country, January and February are the safest months \u2014 both coastlines are simultaneously at their best.'}
              </p>
              <p className="text-xs text-thailand-gold font-medium">{isNl ? 'Beste maanden: Dec\u2013Mar (Andaman) | Jan\u2013Sep (Golfkust)' : 'Best months: Dec\u2013Mar (Andaman) | Jan\u2013Sep (Gulf coast)'}</p>
            </div>
            <div className="bg-surface-cream rounded-2xl p-5">
              <h3 className="font-bold font-heading text-lg text-gray-900 mb-3">{isNl ? 'Festivals & Culturele Evenementen' : 'Festivals & Cultural Events'}</h3>
              <p className="text-sm text-gray-700 mb-3">
                {isNl
                  ? 'Thailand\'s festivalkalender biedt het hele jaar door redenen om te bezoeken. Songkran (Thais Nieuwjaar waterfestival) vult Bangkok, Chiang Mai en elke stad in april. Loi Krathong in november (drijvende kaarsboten op rivieren) is het meest visueel verbluffende festival. Yi Peng in Chiang Mai laat duizenden hemellantaarns los.'
                  : 'Thailand\'s festival calendar offers year-round reasons to visit. Songkran (Thai New Year water festival) fills Bangkok, Chiang Mai, and every city in April \u2014 the world\'s largest water fight and an unmissable experience. Loi Krathong in November (floating candle boats on rivers) is the most visually stunning festival. Yi Peng in Chiang Mai (same week as Loi Krathong) releases thousands of sky lanterns \u2014 one of the most photographed events on earth. The Vegetarian Festival in Phuket (October) involves extreme devotion rituals. Ubon Candle Festival (July) draws crowds to Isan.'}
              </p>
              <p className="text-xs text-thailand-gold font-medium">{isNl ? 'Beste maanden: Apr (Songkran), Nov (Loi Krathong/Yi Peng)' : 'Best months: Apr (Songkran), Nov (Loi Krathong/Yi Peng)'}</p>
            </div>
            <div className="bg-surface-cream rounded-2xl p-5">
              <h3 className="font-bold font-heading text-lg text-gray-900 mb-3">{isNl ? 'Wilde Dieren & Vogels Kijken' : 'Wildlife & Birdwatching'}</h3>
              <p className="text-sm text-gray-700 mb-3">
                {isNl
                  ? 'Khao Yai Nationaal Park (UNESCO Werelderfgoed) is het best van november tot juni \u2014 olifanten, gibbons en neushoornvogels worden betrouwbaar gezien. Voor walvishaaien en mantaroggen bij de Similan-eilanden, richt je op februari tot april.'
                  : 'Khao Yai National Park (UNESCO World Heritage) is best from November to June \u2014 elephants, gibbons, and hornbills are reliably seen. The rainy season (July\u2013October) brings animals to water sources but trails flood. For whale sharks and manta rays at the Similan Islands, target February to April. Doi Inthanon in the north has over 360 bird species; the cool season (November\u2013February) brings rare high-altitude migrants. The Mangrove forests of Krabi and Phang Nga are best explored October\u2013April before the monsoon.'}
              </p>
              <p className="text-xs text-thailand-gold font-medium">{isNl ? 'Beste maanden: Nov\u2013Apr voor de meeste wildlife ervaringen' : 'Best months: Nov\u2013Apr for most wildlife experiences'}</p>
            </div>
            <div className="bg-surface-cream rounded-2xl p-5">
              <h3 className="font-bold font-heading text-lg text-gray-900 mb-3">{isNl ? 'Budget Reizen & Minder Drukte' : 'Budget Travel & Fewer Crowds'}</h3>
              <p className="text-sm text-gray-700 mb-3">
                {isNl
                  ? 'De schouder- en laagseizoen bieden aanzienlijke besparingen. Mei\u2013juni en september\u2013oktober zien hotelprijzen met 30\u201350% dalen en populaire attracties worden beheerbaar. De trade-off is weerrisico \u2014 maar in de praktijk hebben de meeste regenseizoensdagen ochtendzon en middagbuien, niet de hele dag regen.'
                  : 'The shoulder and low seasons offer significant savings. May\u2013June (just as rains begin) and September\u2013October (rainy season peak) see hotel prices drop 30\u201350% and popular attractions become manageable. Bangkok is always busy, but Phuket in June or Chiang Mai in October feel genuinely uncrowded. The trade-off is weather risk \u2014 but in practice, most rainy season days have morning sunshine and afternoon showers, not all-day rain. Budget travellers who can be flexible with activities will find these months excellent value.'}
              </p>
              <p className="text-xs text-thailand-gold font-medium">{isNl ? 'Beste maanden: Mei\u2013Jun en Sep\u2013Okt voor waarde' : 'Best months: May\u2013Jun and Sep\u2013Oct for value'}</p>
            </div>
          </div>
        </section>

        {/* Monsoon Explained */}
        <section className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <p className="section-label">{isNl ? 'Klimaatwetenschap' : 'Climate Science'}</p>
          <h2 className="text-2xl font-bold font-heading mb-4">{isNl ? 'De Twee Moessons Uitgelegd' : 'The Two Monsoons Explained'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-blue-400 pl-5">
              <h3 className="font-bold font-heading text-lg text-gray-900 mb-2">{isNl ? 'Zuidwestmoesson (Andamankust)' : 'Southwest Monsoon (Andaman Coast)'}</h3>
              <p className="text-sm text-gray-700 mb-3">
                {isNl ? 'Arriveert: Eind mei / juni' : 'Arrives: Late May / June'}<br />
                {isNl ? 'Vertrekt: Oktober / begin november' : 'Departs: October / early November'}
              </p>
              <p className="text-sm text-gray-700">
                {isNl
                  ? 'De zuidwestmoesson rolt binnen vanuit de Indische Oceaan en treft de Andamankust van Thailand (Phuket, Krabi, Ranong, Trang, Satun) met volle kracht van tropische regen. Juni tot augustus brengt zware regen, sterke zee\u00ebn en bootannuleringen. September en oktober zijn de slechtste maanden aan deze kust. Tegen november trekt de zuidwestmoesson zich terug en wordt de Andamanzee een spiegel \u2014 het begin van het piekstrandseizoen dat loopt tot april.'
                  : 'The southwest monsoon rolls in from the Indian Ocean, hitting the Andaman coast of Thailand (Phuket, Krabi, Ranong, Trang, Satun) with the full force of tropical rain. June to August brings heavy rain, strong seas, and boat cancellations. September and October are the worst months on this coast. By November, the southwest monsoon retreats and the Andaman Sea becomes a mirror \u2014 beginning peak beach season that runs through April.'}
              </p>
            </div>
            <div className="border-l-4 border-teal-400 pl-5">
              <h3 className="font-bold font-heading text-lg text-gray-900 mb-2">{isNl ? 'Noordoostmoesson (Golfkust)' : 'Northeast Monsoon (Gulf Coast)'}</h3>
              <p className="text-sm text-gray-700 mb-3">
                {isNl ? 'Arriveert: Oktober / november' : 'Arrives: October / November'}<br />
                {isNl ? 'Vertrekt: Januari / februari' : 'Departs: January / February'}
              </p>
              <p className="text-sm text-gray-700">
                {isNl
                  ? 'De noordoostmoesson treft de Golf van Thailand kustlijn (Koh Samui, Koh Phangan, Koh Tao, Hua Hin). November en december brengen aanzienlijke regen en ruwe zee\u00ebn naar Koh Samui in het bijzonder. De keerzijde: terwijl de Andamankust bakt in droogseizoenzon, is de Golfkust perfect kalm van januari tot september.'
                  : 'The northeast monsoon affects the Gulf of Thailand coastline (Koh Samui, Koh Phangan, Koh Tao, Hua Hin). November and December bring significant rain and rough seas to Koh Samui in particular \u2014 the island has a notorious reputation for bad weather in December that catches first-timers off guard. The flip side: while the Andaman coast bakes in dry-season sun, the Gulf coast is perfectly calm from January through September, making it the better choice for most of the year.'}
              </p>
            </div>
          </div>
          <div className="mt-6 bg-surface-cream rounded-xl p-4">
            <p className="text-sm text-gray-700">
              <strong>{isNl ? 'Praktische tip:' : 'Practical tip:'}</strong>{' '}
              {isNl
                ? 'Als je wilt eilandhoppen tussen de Andaman- en Golfkust in \u00e9\u00e9n reis, zijn januari en februari de veiligste maanden wanneer beide kusten tegelijkertijd goed weer hebben.'
                : 'If you want to island-hop between the Andaman and Gulf coasts in a single trip, January and February are the safest months when both coasts simultaneously have good weather. December through April is reliably dry on the Andaman; January through September on the Gulf. Avoid flying directly from Phuket to Koh Samui in November or December \u2014 there\'s a high chance both ends of that journey will be wet.'}
            </p>
          </div>
        </section>

        {/* Festival Calendar */}
        <section className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <p className="section-label">{isNl ? 'Evenementen' : 'Events'}</p>
          <h2 className="text-2xl font-bold font-heading mb-6">{isNl ? 'Thailand Festivalkalender 2026' : 'Thailand Festival Calendar 2026'}</h2>
          <div className="space-y-4">
            {[
              { month: isNl ? 'Januari' : 'January', festival: 'Bo Sang Umbrella Festival', location: 'Chiang Mai', desc: isNl ? 'Driedaags ambachtsfestival dat de handgeschilderde papieren parapluitraditie van het Bo Sang-dorp viert.' : 'Three-day craft festival celebrating the hand-painted paper umbrella tradition of the Bo Sang village. Miss Bo Sang beauty pageant, craft demonstrations, and cultural parade.' },
              { month: isNl ? 'Februari' : 'February', festival: isNl ? 'Chinees Nieuwjaar / Makha Bucha' : 'Chinese New Year / Makha Bucha', location: 'Bangkok (Chinatown), nationwide', desc: isNl ? 'Chinees Nieuwjaar vult de Yaowarat Road in Bangkok met drakendansen en lantaarns. Makha Bucha is een boeddhistische heilige dag.' : 'Chinese New Year fills Yaowarat Road in Bangkok with dragon dances and lanterns. Makha Bucha (Buddhist holy day) sees candlelit circumambulations at every temple nationwide.' },
              { month: isNl ? 'Maart' : 'March', festival: isNl ? 'Olifantenfestival' : 'Elephant Festival', location: 'Surin', desc: isNl ? 'De provincie Surin viert haar olifant-mahout erfgoed met parades, historische re-enactments en olifantendemonstraties.' : 'Surin province celebrates its elephant-mahout heritage with parades, historical re-enactments, and elephant demonstrations at the Surin Elephant Study Centre.' },
              { month: 'April', festival: 'Songkran (Thai New Year)', location: isNl ? 'Landelijk \u2014 grootst in Chiang Mai en Bangkok' : 'Nationwide \u2014 biggest in Chiang Mai and Bangkok', desc: isNl ? 'Thailand\'s grootste feest \u2014 een 3-daags waterfestival ter ere van het Thaise Nieuwjaar (13\u201315 april). Straten worden landelijke watergevechten.' : 'Thailand\'s biggest celebration \u2014 a 3-day water festival marking the Thai New Year (April 13\u201315). Streets become nationwide water fights. Temple visits, merit-making, and family reunions also central. Chiang Mai\'s Songkran is considered the most spectacular.' },
              { month: isNl ? 'Mei' : 'May', festival: isNl ? 'Koninklijke Ploegceremonie / Visakha Bucha' : 'Royal Ploughing Ceremony / Visakha Bucha', location: 'Bangkok / Nationwide', desc: isNl ? 'De Koninklijke Ploegceremonie op Sanam Luang in Bangkok is een oud Brahmaans ritueel. Visakha Bucha is de belangrijkste boeddhistische feestdag.' : 'The Royal Ploughing Ceremony at Sanam Luang in Bangkok is an ancient Brahman ritual that predicts the year\'s agricultural fortunes. Visakha Bucha (most important Buddhist holiday) involves candlelit processions at temples nationwide.' },
              { month: isNl ? 'Juli' : 'July', festival: isNl ? 'Ubon Ratchathani Kaarsenfestival' : 'Ubon Ratchathani Candle Festival / Asalha Bucha', location: 'Ubon Ratchathani', desc: isNl ? 'Een van de meest spectaculaire regionale festivals in Thailand: enorme, ingewikkeld gesneden bijenwaskaarsen door de stad geparadeerd.' : 'One of the most spectacular regional festivals in Thailand: enormous intricately carved beeswax candles paraded through the city to mark Buddhist Lent (Khao Phansa). Best experienced in Ubon but celebrated across Isan.' },
              { month: isNl ? 'Oktober' : 'October', festival: isNl ? 'Vegetarisch Festival (Tesagan Gin Je)' : 'Vegetarian Festival (Tesagan Gin Je)', location: 'Phuket', desc: isNl ? 'Negendaags Chinees Tao\u00efstisch festival op Phuket met extreme devotionele handelingen, strikt vegetarisch dieet en straatprocessies.' : 'Nine-day Chinese Taoist festival in Phuket involving extreme devotional acts (body piercing, fire-walking), strict vegetarian diet, and street processions. Not for the faint-hearted \u2014 one of the most intense ritual experiences in Southeast Asia.' },
              { month: 'November', festival: 'Loi Krathong & Yi Peng', location: isNl ? 'Landelijk \u2014 spectaculairst in Chiang Mai' : 'Nationwide \u2014 most spectacular in Chiang Mai', desc: isNl ? 'Loi Krathong (25 november 2026) ziet miljoenen kaarsverlichte bananenblad-vlotjes losgelaten op rivieren en meren. In Chiang Mai laat het gelijktijdige Yi Peng-festival duizenden hemellantaarns los.' : 'Loi Krathong (25 November 2026) sees millions of candlelit banana-leaf floats released on rivers and lakes nationwide. In Chiang Mai, the simultaneous Yi Peng festival releases thousands of sky lanterns (khom loi) \u2014 one of the most photographed spectacles in Asia. Book accommodation months ahead.' },
              { month: 'December', festival: isNl ? 'Lopburi Apenfestival / Verjaardag Koning' : 'Lopburi Monkey Festival / King\'s Birthday', location: isNl ? 'Lopburi / Landelijk' : 'Lopburi / Nationwide', desc: isNl ? 'De beroemde makaken van Lopburi krijgen een jaarlijks feest (december) als dank voor het brengen van toerisme. Thailand\'s nationale dag op 5 december.' : 'Lopburi\'s famous macaque residents get an annual feast (December) in thanks for bringing tourism. Thailand\'s national day on December 5 marks the late King Bhumibol\'s birthday with celebrations and illuminations in Bangkok.' },
            ].map((item) => (
              <div key={item.festival} className="flex gap-4 border-b border-gray-100 pb-4 last:border-0">
                <div className="w-24 flex-shrink-0">
                  <span className="text-sm font-bold text-thailand-gold">{item.month}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{item.festival}</h3>
                  <p className="text-xs text-gray-500 mb-1">{item.location}</p>
                  <p className="text-sm text-gray-700">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Monthly Overview */}
            <section className="bg-white rounded-2xl shadow-md p-6 mb-8">
              <p className="section-label">{isNl ? 'Maandelijks Overzicht' : 'Monthly Overview'}</p>
              <h2 className="text-2xl font-bold font-heading mb-6">{isNl ? 'Thailand Weer per Maand' : 'Thailand Weather by Month'}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentMonths.map((month) => (
                  <Link
                    key={month.month}
                    href={`/thailand-in/${month.month}/`}
                    className="flex items-center p-4 border-0 bg-surface-cream rounded-2xl hover:shadow-lg transition-shadow"
                  >
                    <span className="text-3xl mr-4">{month.emoji}</span>
                    <div>
                      <h3 className="font-semibold font-heading text-lg">{month.name}</h3>
                      <p className="text-sm text-gray-600">{month.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>


            {/* Cities by Region */}
            <section className="bg-white rounded-2xl shadow-md p-6">
              <p className="section-label">{isNl ? 'Per Stad' : 'By City'}</p>
              <h2 className="text-2xl font-bold font-heading mb-6">{isNl ? 'Stadsweergidsen' : 'City Weather Guides'}</h2>

              {Object.entries(citiesByRegion).map(([region, regionCities]) => (
                <div key={region} className="mb-8 last:mb-0">
                  <h3 className="text-xl font-semibold font-heading text-gray-800 mb-4 flex items-center">
                    <span className="mr-2">
                      {region === 'Northern' && ''}
                      {region === 'Central' && ''}
                      {region === 'Southern' && ''}
                    </span>
                    {isNl
                      ? `${region === 'Northern' ? 'Noord' : region === 'Central' ? 'Centraal' : region === 'Southern' ? 'Zuid' : region} Thailand`
                      : `${region} Thailand`}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {regionCities.map((city) => (
                      <Link
                        key={city.slug}
                        href={`/city/${city.slug}/weather/`}
                        className="flex items-center justify-between p-3 bg-surface-cream rounded-xl hover:bg-thailand-blue/5 transition-colors group"
                      >
                        <span className="font-medium text-gray-700 group-hover:text-thailand-blue">
                          {isNl ? city.name.nl : city.name.en}
                        </span>
                        <span className="text-thailand-blue group-hover:translate-x-1 transition-transform">
                          \u2192
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            {/* FAQ Section */}
            <section className="bg-white rounded-2xl shadow-md p-6 mt-8">
              <p className="section-label">FAQ</p>
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">{isNl ? 'Veelgestelde Vragen' : 'Frequently Asked Questions'}</h2>
              <div className="space-y-6">
                {currentFaqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                    <h3 className="text-lg font-semibold font-heading text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside>
            <div className="lg:sticky lg:top-4 space-y-6">
            {/* Quick Tips */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-semibold font-heading mb-4">{isNl ? 'Snelle Weertips' : 'Quick Weather Tips'}</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2"></span>
                  <div>
                    <strong>{isNl ? 'Koel Seizoen (Nov-Feb):' : 'Cool Season (Nov-Feb):'}</strong>{' '}
                    {isNl ? 'Beste weer, piekprijzen' : 'Best weather, peak prices'}
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2"></span>
                  <div>
                    <strong>{isNl ? 'Heet Seizoen (Mar-Mei):' : 'Hot Season (Mar-May):'}</strong>{' '}
                    {isNl ? 'Zeer heet, Songkran in april' : 'Very hot, Songkran in April'}
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2"></span>
                  <div>
                    <strong>{isNl ? 'Regenseizoen (Jun-Okt):' : 'Rainy Season (Jun-Oct):'}</strong>{' '}
                    {isNl ? 'Middagbuien, minder toeristen' : 'Afternoon showers, fewer tourists'}
                  </div>
                </li>
              </ul>
            </div>

            {/* Best Times to Visit */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-semibold font-heading mb-4">{isNl ? 'Beste Reistijd' : 'Best Times to Visit'}</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="font-medium text-gray-800">{isNl ? 'Voor Perfect Weer:' : 'For Perfect Weather:'}</h4>
                  <p className="text-gray-600">{isNl ? 'November - Februari' : 'November - February'}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{isNl ? 'Voor Minder Drukte:' : 'For Fewer Crowds:'}</h4>
                  <p className="text-gray-600">{isNl ? 'Mei - Oktober' : 'May - October'}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{isNl ? 'Voor Stranden:' : 'For Beaches:'}</h4>
                  <p className="text-gray-600">{isNl ? 'December - Maart (Westkust)' : 'December - March (West Coast)'}</p>
                  <p className="text-gray-600">{isNl ? 'Januari - September (Oostkust)' : 'January - September (East Coast)'}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{isNl ? 'Voor Festivals:' : 'For Festivals:'}</h4>
                  <p className="text-gray-600">{isNl ? 'April (Songkran)' : 'April (Songkran)'}</p>
                  <p className="text-gray-600">{isNl ? 'November (Loy Krathong)' : 'November (Loy Krathong)'}</p>
                </div>
              </div>
            </div>

            {/* Regional Differences */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-semibold font-heading mb-4">{isNl ? 'Regionale Verschillen' : 'Regional Differences'}</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <strong className="text-gray-800">{isNl ? 'Noord:' : 'North:'}</strong>
                  <span className="text-gray-600">{isNl ? ' Koeler, duidelijke seizoenen' : ' Cooler, distinct seasons'}</span>
                </li>
                <li>
                  <strong className="text-gray-800">{isNl ? 'Centraal:' : 'Central:'}</strong>
                  <span className="text-gray-600">{isNl ? ' Heet, typisch tropisch' : ' Hot, typical tropical'}</span>
                </li>
                <li>
                  <strong className="text-gray-800">{isNl ? 'Zuid Oost:' : 'South East:'}</strong>
                  <span className="text-gray-600">{isNl ? ' Ander regenpatroon' : ' Different rain pattern'}</span>
                </li>
                <li>
                  <strong className="text-gray-800">{isNl ? 'Zuid West:' : 'South West:'}</strong>
                  <span className="text-gray-600">{isNl ? ' Door moesson be\u00efnvloed' : ' Monsoon affected'}</span>
                </li>
              </ul>
            </div>

            </div>
          </aside>
        </div>

        {/* Explore More */}
        <section className="bg-white rounded-2xl shadow-md p-6 mt-8">
          <p className="section-label">{isNl ? 'Ontdek Meer' : 'Explore More'}</p>
          <h2 className="text-2xl font-bold font-heading mb-6">{isNl ? 'Plan Je Reis naar Thailand' : 'Plan Your Trip to Thailand'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/city/" className="flex items-center justify-between p-4 bg-surface-cream rounded-2xl hover:shadow-lg transition-shadow group">
              <div>
                <h3 className="font-semibold font-heading text-gray-900 group-hover:text-thailand-blue">{isNl ? 'Stadsgidsen' : 'City Guides'}</h3>
                <p className="text-sm text-gray-600">{isNl ? 'Ontdek alle 33 Thaise steden' : 'Explore all 33 Thai cities'}</p>
              </div>
              <span className="text-thailand-blue group-hover:translate-x-1 transition-transform text-lg">\u2192</span>
            </Link>
            <Link href="/compare/" className="flex items-center justify-between p-4 bg-surface-cream rounded-2xl hover:shadow-lg transition-shadow group">
              <div>
                <h3 className="font-semibold font-heading text-gray-900 group-hover:text-thailand-blue">{isNl ? 'Vergelijk Bestemmingen' : 'Compare Destinations'}</h3>
                <p className="text-sm text-gray-600">{isNl ? 'Steden naast elkaar vergelijken' : 'Side-by-side city comparisons'}</p>
              </div>
              <span className="text-thailand-blue group-hover:translate-x-1 transition-transform text-lg">\u2192</span>
            </Link>
            <Link href="/thailand-index/best-time" className="flex items-center justify-between p-4 bg-surface-cream rounded-2xl hover:shadow-lg transition-shadow group">
              <div>
                <h3 className="font-semibold font-heading text-gray-900 group-hover:text-thailand-blue">{isNl ? 'Beste Reistijd' : 'Best Time to Visit'}</h3>
                <p className="text-sm text-gray-600">{isNl ? 'Datagestuurde maand-per-maand index' : 'Data-driven month-by-month index'}</p>
              </div>
              <span className="text-thailand-blue group-hover:translate-x-1 transition-transform text-lg">\u2192</span>
            </Link>
            <Link href="/thailand-for-first-timers/" className="flex items-center justify-between p-4 bg-surface-cream rounded-2xl hover:shadow-lg transition-shadow group">
              <div>
                <h3 className="font-semibold font-heading text-gray-900 group-hover:text-thailand-blue">{isNl ? 'Gids voor Beginners' : "First Timer's Guide"}</h3>
                <p className="text-sm text-gray-600">{isNl ? 'Alles wat je moet weten' : 'Everything you need to know'}</p>
              </div>
              <span className="text-thailand-blue group-hover:translate-x-1 transition-transform text-lg">\u2192</span>
            </Link>
            <Link href="/islands/" className="flex items-center justify-between p-4 bg-surface-cream rounded-2xl hover:shadow-lg transition-shadow group">
              <div>
                <h3 className="font-semibold font-heading text-gray-900 group-hover:text-thailand-blue">{isNl ? 'Thaise Eilanden' : 'Thai Islands'}</h3>
                <p className="text-sm text-gray-600">{isNl ? 'Stranden, duiken & eilandleven' : 'Beaches, diving & island life'}</p>
              </div>
              <span className="text-thailand-blue group-hover:translate-x-1 transition-transform text-lg">\u2192</span>
            </Link>
            <Link href="/travel-gear/" className="flex items-center justify-between p-4 bg-surface-cream rounded-2xl hover:shadow-lg transition-shadow group">
              <div>
                <h3 className="font-semibold font-heading text-gray-900 group-hover:text-thailand-blue">{isNl ? 'Reisuitrusting' : 'Travel Gear'}</h3>
                <p className="text-sm text-gray-600">{isNl ? 'Slim inpakken voor elk seizoen' : 'Pack smart for every season'}</p>
              </div>
              <span className="text-thailand-blue group-hover:translate-x-1 transition-transform text-lg">\u2192</span>
            </Link>
          </div>
        </section>

        {/* Ready to Book Section */}
        <section className="bg-surface-dark rounded-2xl p-8 text-white mt-12">
          <p className="font-script text-thailand-gold text-center mb-2">{isNl ? 'Plan Vooruit' : 'Plan Ahead'}</p>
          <h2 className="text-2xl font-bold font-heading text-center mb-4">{isNl ? 'Klaar om Je Thailand Reis te Boeken?' : 'Ready to Book Your Thailand Trip?'}</h2>
          <p className="text-center mb-8 opacity-90 max-w-2xl mx-auto">
            {isNl
              ? 'Nu je de beste reistijd weet, begin met het plannen van je perfecte Thailand vakantie.'
              : 'Now that you know the best time to visit, start planning your perfect Thailand getaway.'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <a
              href={trackAffiliate(TRIP_GENERIC, 'hotels')}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-thailand-blue rounded-2xl p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all block"
            >
              <div className="text-3xl mb-3"></div>
              <h3 className="font-semibold font-heading text-lg mb-1">{isNl ? 'Vind Hotels' : 'Find Hotels'}</h3>
              <p className="text-sm text-gray-600">{isNl ? 'Vergelijk deals op Trip.com' : 'Compare deals on Trip.com'}</p>
            </a>
            <Link
              href="/esim/"
              className="bg-white text-thailand-blue rounded-2xl p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all block"
            >
              <div className="text-3xl mb-3"></div>
              <h3 className="font-semibold font-heading text-lg mb-1">{isNl ? 'Blijf Verbonden' : 'Stay Connected'}</h3>
              <p className="text-sm text-gray-600">{isNl ? 'Koop een eSIM voor Thailand' : 'Get an eSIM for Thailand'}</p>
            </Link>
            <Link
              href="/travel-insurance-thailand/"
              className="bg-white text-thailand-blue rounded-2xl p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all block"
            >
              <div className="text-3xl mb-3"></div>
              <h3 className="font-semibold font-heading text-lg mb-1">{isNl ? 'Reisverzekering' : 'Travel Insurance'}</h3>
              <p className="text-sm text-gray-600">{isNl ? 'Bescherm je reis' : 'Protect your trip'}</p>
            </Link>
          </div>
          <p className="text-xs text-center opacity-75">
            {isNl
              ? 'Externe links zijn affiliate links. We kunnen een kleine commissie verdienen zonder extra kosten voor jou.'
              : 'External links are affiliate links. We may earn a small commission at no extra cost to you.'}
          </p>
        </section>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<WeatherIndexProps> = async () => {
  return {
    props: {
      cities: citiesData
    },
    revalidate: 604800
  };
};

export default WeatherIndex;
