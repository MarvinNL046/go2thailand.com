import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import EmailCapture from '../components/EmailCapture';

export default function ThingsToDoPage() {
  const { locale } = useRouter();
  const isNl = locale === 'nl';

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Dingen om te Doen in Thailand' : 'Things to Do in Thailand', href: '/things-to-do-in-thailand/' },
  ];

  const items = [
    { position: 1, name: 'Explore Bangkok\'s Grand Palace and Wat Phra Kaew' },
    { position: 2, name: 'Watch Sunrise at Ayutthaya\'s Ancient Ruins' },
    { position: 3, name: 'Climb 1,256 Steps to Tiger Cave Temple in Krabi' },
    { position: 4, name: 'Visit the White Temple in Chiang Rai' },
    { position: 5, name: 'Discover Doi Suthep in Chiang Mai' },
    { position: 6, name: 'Island-Hop in the Andaman Sea' },
    { position: 7, name: 'Relax on Phuket\'s West Coast Beaches' },
    { position: 8, name: 'Experience Koh Lanta\'s Laid-Back Vibe' },
    { position: 9, name: 'Dive or Snorkel at Koh Tao' },
    { position: 10, name: 'Party at the Full Moon Party on Koh Phangan' },
    { position: 11, name: 'Take a Thai Cooking Class in Chiang Mai' },
    { position: 12, name: 'Eat Your Way Through Bangkok\'s Street Food' },
    { position: 13, name: 'Visit a Floating Market' },
    { position: 14, name: 'Try Authentic Pad Thai at Thip Samai' },
    { position: 15, name: 'Ethical Elephant Experience in Chiang Mai' },
    { position: 16, name: 'Hike to Viewpoints in Pai' },
    { position: 17, name: 'Rock Climb at Railay Beach in Krabi' },
    { position: 18, name: 'Kayak Through Phang Nga Bay\'s Caves' },
    { position: 19, name: 'Trek Through Khao Sok National Park' },
    { position: 20, name: 'Learn Muay Thai in Bangkok or Chiang Mai' },
    { position: 21, name: 'Release a Sky Lantern at Yi Peng Festival' },
    { position: 22, name: 'Get a Traditional Thai Massage' },
    { position: 23, name: 'Explore Bangkok\'s Chatuchak Weekend Market' },
    { position: 24, name: 'Stay in a Treehouse in Khao Sok' },
    { position: 25, name: 'Visit Sukhothai Historical Park' },
  ];

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isNl ? '25 Beste Dingen om te Doen in Thailand' : '25 Best Things to Do in Thailand',
    numberOfItems: 25,
    itemListElement: items.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      url: 'https://go2-thailand.com/things-to-do-in-thailand/',
    })),
  };

  const faqItems = isNl ? [
    {
      question: 'Hoeveel dagen heb je nodig in Thailand?',
      answer: 'De meeste reizigers vinden 10 tot 14 dagen ideaal voor een veelzijdige Thailand reis. Dat geeft je genoeg tijd voor 2-3 dagen Bangkok, 3-4 dagen Chiang Mai en het noorden, en 4-5 dagen op de zuidelijke eilanden. Als je maar 7 dagen hebt, focus dan op een regio — het noorden (Bangkok plus Chiang Mai) of het zuiden (Bangkok plus eilanden). Langere verblijven van 3-4 weken laten je vertragen en bestemmingen als Pai of Sukhothai toevoegen.',
    },
    {
      question: 'Wat is de beste tijd om Thailand te bezoeken?',
      answer: 'Het koele seizoen van november tot februari is de comfortabelste tijd, met lagere luchtvochtigheid, minder regen en temperaturen rond 25-30 graden. Dit is het hoogseizoen met hogere prijzen. Het regenseizoen (juni tot oktober) brengt middagbuien maar ook weelderige landschappen, minder drukte en lagere prijzen. Thailand\'s twee zuidelijke kusten hebben tegenovergestelde moessonpatronen: de Andamankant (Phuket, Krabi) is het natst van mei tot oktober, de Golfkant (Koh Samui, Koh Phangan) van oktober tot december.',
    },
    {
      question: 'Heb je een visum nodig voor Thailand?',
      answer: 'De meeste nationaliteiten krijgen bij aankomst een visumvrijstelling van 30 tot 60 dagen, afhankelijk van je paspoort. Burgers uit de VS, VK, EU, Australië en Canada krijgen doorgaans 60 dagen visumvrij. Je kunt dit met 30 dagen verlengen bij elk immigratiekantoor voor ongeveer 1.900 baht. Digitale nomaden komen mogelijk in aanmerking voor het Destination Thailand Visa (DTV).',
    },
    {
      question: 'Is Thailand veilig voor toeristen?',
      answer: 'Thailand is over het algemeen zeer veilig voor toeristen, inclusief alleen reizende en gezinnen. Miljoenen bezoekers reizen elk jaar door het land zonder incidenten. De meest voorkomende risico\'s zijn zakkenrollerij, verkeersongelukken (vooral scooterverhuur) en toeristenoplichting. Geweldsmisdrijven tegen toeristen zijn zeldzaam. Ziekenhuizen in grote steden als Bangkok, Chiang Mai en Phuket voldoen aan internationale standaarden.',
    },
    {
      question: 'Hoeveel kost Thailand per dag?',
      answer: 'Thailand blijft een van de bestemmingen met de beste prijs-kwaliteitverhouding in Zuidoost-Azië. Budgetreizigers komen uit met 1.000-1.500 baht per dag (ongeveer $28-42), met hostels, straatvoedsel en lokaal vervoer. Midden-reizigers besteden 1.500-3.000 baht per dag ($42-85) aan comfortabele hotels, een mix van restaurants en straatvoedsel. Luxe reizen begint rond 5.000 baht per dag ($140+). Bangkok en populaire eilanden zijn 20-30% duurder dan noordelijke steden als Chiang Mai.',
    },
  ] : [
    {
      question: 'How many days do you need in Thailand?',
      answer: 'Most travelers find 10 to 14 days ideal for a well-rounded Thailand trip. That gives you enough time for 2-3 days in Bangkok, 3-4 days exploring Chiang Mai and the north, and 4-5 days on the southern islands. If you only have 7 days, focus on one region — either the north (Bangkok plus Chiang Mai) or the south (Bangkok plus the islands). Longer stays of 3-4 weeks let you slow down, add off-the-beaten-path destinations like Pai or Sukhothai, and truly soak in Thai culture without rushing.',
    },
    {
      question: 'What is the best time to visit Thailand?',
      answer: 'The cool season from November to February is the most comfortable time to visit, with lower humidity, less rain, and temperatures around 25-30 degrees Celsius. This is peak season, so expect higher prices and more crowds. The shoulder months of March and October offer a good balance — fewer tourists with mostly decent weather. The rainy season (June to October) brings afternoon downpours but also lush landscapes, fewer crowds, and significantly lower prices. Note that Thailand\'s two southern coasts have opposite monsoon patterns: the Andaman side (Phuket, Krabi) is wettest May to October, while the Gulf side (Koh Samui, Koh Phangan) is wettest October to December.',
    },
    {
      question: 'Do you need a visa for Thailand?',
      answer: 'Most nationalities receive a visa exemption on arrival, allowing stays of 30 to 60 days depending on your passport. Citizens from the US, UK, EU, Australia, and Canada typically get 60 days visa-free (updated in 2024). You can extend this by 30 days at any immigration office for a fee of around 1,900 baht. For longer stays, consider applying for a tourist visa before your trip, which grants 60 days with a possible 30-day extension. Digital nomads may qualify for Thailand\'s newer Destination Thailand Visa (DTV), which allows longer-term stays. Always check the latest rules before traveling, as Thailand\'s visa policies are updated regularly.',
    },
    {
      question: 'Is Thailand safe for tourists?',
      answer: 'Thailand is generally very safe for tourists, including solo travelers and families. Millions of visitors travel through the country every year without incident. The most common risks are petty theft (pickpocketing in crowded areas), transportation-related accidents (especially scooter rentals), and tourist scams. Violent crime against tourists is rare. Use common sense: lock up valuables, wear a helmet when riding scooters, avoid walking alone on deserted beaches late at night, and be cautious with drinks at full moon parties. The Thai people are overwhelmingly friendly and helpful. Hospitals in major cities like Bangkok, Chiang Mai, and Phuket meet international standards.',
    },
    {
      question: 'How much does Thailand cost per day?',
      answer: 'Thailand remains one of the best-value destinations in Southeast Asia, though costs have risen since 2023. Budget travelers can manage on 1,000 to 1,500 baht per day (roughly $28-42 USD), staying in hostels, eating street food, and using local transport. Mid-range travelers spending 1,500 to 3,000 baht per day ($42-85 USD) enjoy comfortable hotels, a mix of restaurants and street food, and organized day trips. Upscale travel starts around 5,000 baht per day ($140+ USD). Bangkok and the popular islands (Phuket, Koh Samui) tend to be 20-30% more expensive than northern cities like Chiang Mai. The biggest variable is accommodation — street food and transport are cheap everywhere.',
    },
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <SEOHead
        title="25 Best Things to Do in Thailand (2026 Travel Guide) | Go2Thailand"
        description="The 25 best things to do in Thailand in 2026 — from temples and beaches to street food, Muay Thai, and hidden gems. Entrance fees, practical tips, and how to plan your trip."
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Header */}
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-4">
                25 Best Things to Do in Thailand (2026 Travel Guide)
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From glittering temples and turquoise beaches to fiery street food and ancient ruins — these are the experiences that make Thailand one of the world&apos;s most-visited countries.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom max-w-4xl">
            {/* Table of Contents */}
            <nav className="bg-white rounded-2xl shadow-md p-6 mb-10">
              <h2 className="text-lg font-bold font-heading text-gray-900 mb-4">{isNl ? 'In deze gids' : 'In this guide'}</h2>
              <ul className="grid grid-cols-2 gap-2 text-sm">
                <li><a href="#temples" className="text-thailand-blue hover:underline">{isNl ? 'Tempels & Culturele Plekken' : 'Temples & Cultural Sites'}</a></li>
                <li><a href="#beaches" className="text-thailand-blue hover:underline">{isNl ? 'Stranden & Eilanden' : 'Beaches & Islands'}</a></li>
                <li><a href="#food" className="text-thailand-blue hover:underline">{isNl ? 'Culinaire Ervaringen' : 'Food Experiences'}</a></li>
                <li><a href="#nature" className="text-thailand-blue hover:underline">{isNl ? 'Natuur & Avontuur' : 'Nature & Adventure'}</a></li>
                <li><a href="#culture" className="text-thailand-blue hover:underline">{isNl ? 'Unieke Culturele Ervaringen' : 'Unique Cultural Experiences'}</a></li>
                <li><a href="#planning" className="text-thailand-blue hover:underline">{isNl ? 'Plan Je Reis (FAQ)' : 'Planning Your Trip (FAQ)'}</a></li>
              </ul>
            </nav>

            {/* Intro paragraph */}
            <p className="text-gray-700 text-lg mb-10 leading-relaxed">
              Thailand offers an extraordinary range of experiences for every type of traveler. Whether you are exploring centuries-old temple complexes, learning to cook a perfect pad thai, scaling limestone cliffs above the Andaman Sea, or simply unwinding on a quiet island beach, the country consistently delivers. This guide covers the 25 best things to do in Thailand in 2026, with current entrance fees, practical tips, and links to our detailed destination guides so you can start planning right away.
            </p>

            {/* ============================================ */}
            {/* SECTION 1: Iconic Temples and Cultural Sites */}
            {/* ============================================ */}
            <section id="temples" className="mb-16">
              <div className="border-t-2 border-thailand-blue/20 pt-8 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900">{isNl ? 'Iconische Tempels en Culturele Plekken' : 'Iconic Temples and Cultural Sites'}</h2>
                <p className="text-gray-600 mt-2">{isNl ? 'Thailand heeft meer dan 40.000 boeddhistische tempels. Deze vijf mag je niet missen.' : 'Thailand is home to over 40,000 Buddhist temples. These five are the ones you should not miss.'}</p>
              </div>

              {/* Item 1 */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">1</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">Explore Bangkok&apos;s Grand Palace and Wat Phra Kaew</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      The Grand Palace has been the ceremonial heart of Thailand since 1782. Within its walls, Wat Phra Kaew (the Temple of the Emerald Buddha) houses the country&apos;s most sacred Buddha image — a 66-centimeter jade figure dressed in gold seasonal garments changed by the King three times a year. The complex is a dazzling mix of Thai, Chinese, and European architecture, with glittering spires, mosaic-covered chedis, and intricate murals depicting the Ramakien epic. Plan to spend at least 2-3 hours exploring the grounds, and arrive early to avoid the thickest crowds. A strict dress code is enforced: covered shoulders, long trousers or skirts, and closed-toe shoes. Sarongs are available to borrow at the entrance if needed.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>Entrance fee:</strong> ฿500 (includes Wat Phra Kaew, Coin Pavilion, and Queen Sirikit Museum of Textiles)</p>
                      <p><strong>Hours:</strong> 8:30am - 4:30pm daily (ticket office closes at 3:30pm)</p>
                      <p><strong>Tip:</strong> Go first thing in the morning or after 2pm for smaller crowds.</p>
                    </div>
                    <p className="mt-3 text-sm">
                      <Link href="/city/bangkok/" className="text-thailand-blue hover:underline font-semibold">Explore our full Bangkok guide →</Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Item 2 */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">2</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">Watch Sunrise at Ayutthaya&apos;s Ancient Ruins</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Ayutthaya was the capital of the Kingdom of Siam for over 400 years before Burmese invaders razed it in 1767. Today the UNESCO-listed historical park contains the atmospheric remains of temples, monasteries, and palaces spread across an island surrounded by three rivers. The most iconic image is the Buddha head entwined in the roots of a banyan tree at Wat Mahathat. Sunrise casts a golden light over the brick ruins and is the most magical time to visit — you will have many of the temples almost to yourself. Rent a bicycle (around ฿50-100 per day) to cover the sprawling site at your own pace, or hire a tuk-tuk driver for a half-day tour. The park is easily accessible as a day trip from Bangkok, just 80 kilometers north via train (2 hours, ฿20 third class) or minivan (1.5 hours, around ฿70).
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>Entrance fee:</strong> ฿50 per temple (or ฿220 for a six-temple combo ticket)</p>
                      <p><strong>Hours:</strong> Most temples open 8am - 6pm; grounds are accessible earlier for sunrise</p>
                      <p><strong>Tip:</strong> Take the early morning train from Bangkok Hua Lamphong and return by minivan for variety.</p>
                    </div>
                    <p className="mt-3 text-sm">
                      <Link href="/city/ayutthaya/" className="text-thailand-blue hover:underline font-semibold">Read our Ayutthaya destination guide →</Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Item 3 */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">3</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">Climb 1,256 Steps to Tiger Cave Temple in Krabi</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Wat Tham Suea (Tiger Cave Temple) sits atop a dramatic limestone karst about 9 kilometers from Krabi Town. The reward for climbing its 1,256 steps is a golden Buddha statue and a breathtaking 360-degree view of the Andaman coast, mangrove forests, and limestone peaks stretching to the horizon. The climb is steep and relentless — expect 40 to 60 minutes of hard work depending on your fitness level. There is very little shade on the staircase, so bring plenty of water and start early in the morning before the heat builds. Monkeys populate the lower areas of the temple complex, so secure your belongings. The cave system at the base of the hill is worth exploring before or after the climb, with stalactite formations and a meditation area still used by resident monks.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>Entrance fee:</strong> Free (donations welcome)</p>
                      <p><strong>Hours:</strong> 6am - 6pm daily</p>
                      <p><strong>Tip:</strong> Start before 8am to avoid the midday heat. Bring a towel — you will sweat.</p>
                    </div>
                    <p className="mt-3 text-sm">
                      <Link href="/city/krabi/" className="text-thailand-blue hover:underline font-semibold">Explore our full Krabi guide →</Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Item 4 */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">4</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">Visit the White Temple in Chiang Rai</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Wat Rong Khun, universally known as the White Temple, is one of the most visually striking buildings in Southeast Asia. Designed by Thai artist Chalermchai Kositpipat, it blends traditional Buddhist temple architecture with surreal contemporary art. The glittering white exterior symbolizes the purity of the Buddha, while the bridge over a sea of outstretched hands represents the crossing from the cycle of rebirth to Buddhist paradise. Inside, the murals include unexpectedly modern imagery — from The Matrix to Superman — woven into traditional Buddhist themes. The temple grounds also include a golden building (the restrooms, famously called the most beautiful bathroom in the world), a gallery of the artist&apos;s work, and several ongoing additions. Note that the entrance fee doubled in January 2026 from ฿100 to ฿200 for foreigners, while remaining free for Thai nationals.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>Entrance fee:</strong> ฿200 for foreigners (doubled January 2026); free for Thais</p>
                      <p><strong>Hours:</strong> 8am - 5pm daily (grounds open 6:30am - 6pm)</p>
                      <p><strong>Tip:</strong> Visit early morning when the white facade is luminous in soft light and tour groups have not yet arrived.</p>
                    </div>
                    <p className="mt-3 text-sm">
                      <Link href="/city/chiang-rai/" className="text-thailand-blue hover:underline font-semibold">Explore Chiang Rai →</Link>
                      {' '}<span className="text-gray-400">|</span>{' '}
                      <Link href="/blog/chiang-rai-white-temple-entrance-fee-doubles-2026/" className="text-thailand-blue hover:underline font-semibold">Read about the 2026 price change →</Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Item 5 */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">5</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">Discover Doi Suthep in Chiang Mai</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Wat Phra That Doi Suthep is the golden hilltop temple that overlooks Chiang Mai from the slopes of Doi Suthep mountain. It is one of the most sacred temples in northern Thailand, and the panoramic views of Chiang Mai city and the surrounding countryside are spectacular on a clear day. You can reach the temple by climbing the famous 309-step Naga staircase flanked by serpent balustrades, or take the funicular railway for ฿20 if the stairs are not for you. At the top, you will find a gleaming gold chedi said to contain a relic of the Buddha, plus a terrace ideal for watching sunset. The temple is about 15 kilometers from Chiang Mai&apos;s old city. The easiest way to get there is by songthaew (shared red truck) from the base of the mountain — the ride takes about 30 minutes and costs around ฿40-60 per person. Combine it with a visit to the nearby Doi Suthep-Pui National Park for hiking trails through misty mountain forest.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>Entrance fee:</strong> ฿30 for foreigners</p>
                      <p><strong>Hours:</strong> 6am - 8pm daily</p>
                      <p><strong>Tip:</strong> The 309 steps are manageable for most fitness levels. The funicular (฿20) is there if you prefer.</p>
                    </div>
                    <p className="mt-3 text-sm">
                      <Link href="/city/chiang-mai/" className="text-thailand-blue hover:underline font-semibold">Explore our full Chiang Mai guide →</Link>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 2: Thailand's Best Beaches and Islands */}
            {/* ============================================ */}
            <section id="beaches" className="mb-16">
              <div className="border-t-2 border-thailand-blue/20 pt-8 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900">{isNl ? 'Thailand\'s Beste Stranden en Eilanden' : 'Thailand\'s Best Beaches and Islands'}</h2>
                <p className="text-gray-600 mt-2">{isNl ? 'Twee kustlijnen, honderden eilanden en enkele van de beste stranden in Azië.' : 'Two coastlines, hundreds of islands, and some of the best beaches in Asia.'}</p>
              </div>

              {/* Item 6 */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">6</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">Island-Hop in the Andaman Sea (Krabi and Phi Phi)</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      The Andaman coast is Thailand&apos;s island-hopping paradise. From Krabi or Ao Nang, you can access the Phi Phi Islands, the Four Islands, Hong Island, and the Railay peninsula — all within a day trip or short boat ride. The Phi Phi Islands remain jaw-droppingly beautiful despite their fame: turquoise water, towering limestone cliffs, and vibrant coral reefs. Maya Bay (made famous by the movie &quot;The Beach&quot;) has reopened with a daily visitor cap and a no-swimming rule to protect the recovering coral ecosystem. Four Islands tours from Krabi typically cost ฿800-1,500 per person including lunch, snorkeling equipment, and visits to Tup Island, Chicken Island, Poda Island, and Phra Nang Cave Beach. For a less crowded experience, base yourself on Koh Jum or Koh Yao Noi and take day trips to the bigger islands. The best season for the Andaman coast is November through April when the seas are calm and the skies are clear.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>Best season:</strong> November - April (Andaman coast dry season)</p>
                      <p><strong>Day trip cost:</strong> ฿800-1,500 per person for group tours including lunch</p>
                      <p><strong>Tip:</strong> Book a private longtail boat (around ฿2,500-3,500/day) for flexibility and fewer crowds.</p>
                    </div>
                    <p className="mt-3 text-sm">
                      <Link href="/city/krabi/" className="text-thailand-blue hover:underline font-semibold">Explore our Krabi guide →</Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Item 7 */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">7</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">Relax on Phuket&apos;s West Coast Beaches</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Phuket&apos;s west coast is lined with some of Thailand&apos;s most famous beaches, each with its own character. Patong is the busiest — packed with hotels, restaurants, nightlife, and shopping — and serves as the island&apos;s entertainment hub. If you prefer something quieter, head south to Kata or Karon for wide sandy stretches, good swimming, and family-friendly vibes. Further south, Nai Harn is a local favorite with a relaxed atmosphere and beautiful sunset views. For an upscale experience, Surin and Bang Tao (Laguna area) offer luxury resorts and beach clubs. Freedom Beach, accessible only by boat or a steep trail, is one of Phuket&apos;s most pristine and uncrowded strips of sand. All Phuket beaches are public in Thailand, so you can walk onto any beach even if it fronts a luxury resort. During the monsoon season (May to October), red flags indicate dangerous currents on the west coast — always respect them.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>Best beaches for families:</strong> Kata, Karon, Nai Harn</p>
                      <p><strong>Best for nightlife:</strong> Patong</p>
                      <p><strong>Tip:</strong> Rent a scooter (฿200-300/day) to beach-hop along the west coast in a single afternoon.</p>
                    </div>
                    <p className="mt-3 text-sm">
                      <Link href="/city/phuket/" className="text-thailand-blue hover:underline font-semibold">Explore Phuket →</Link>
                      {' '}<span className="text-gray-400">|</span>{' '}
                      <Link href="/phuket-beaches/" className="text-thailand-blue hover:underline font-semibold">Phuket beach guide →</Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Item 8 */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">8</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">Experience Koh Lanta&apos;s Laid-Back Vibe</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Koh Lanta is the antidote to Thailand&apos;s busier islands. This long, narrow island off the Andaman coast draws travelers who want beautiful beaches without the party scene. Long Beach (Phra Ae) is the most popular stretch with a good selection of restaurants and bars, but even here the atmosphere stays mellow. Head further south to Kantiang Bay or Bamboo Bay for near-empty beaches framed by jungle-covered hills. The island&apos;s interior is home to the Mu Koh Lanta National Park, where you can hike through tropical forest to a lighthouse with views across the Andaman Sea. Koh Lanta also has an atmospheric Old Town on the eastern coast — a row of wooden stilt houses built by Chinese and Malay traders generations ago, now home to quirky cafes and art galleries. Snorkeling trips to Koh Rok and Koh Haa (two nearby marine parks) are world-class, with crystal-clear visibility and healthy coral reefs.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>Best season:</strong> November - April</p>
                      <p><strong>Getting there:</strong> Ferry from Krabi (1.5 hours, around ฿400) or minivan + car ferry</p>
                      <p><strong>Tip:</strong> Rent a scooter and explore the entire west coast — the beaches get quieter as you go south.</p>
                    </div>
                    <p className="mt-3 text-sm">
                      <Link href="/city/koh-lanta/" className="text-thailand-blue hover:underline font-semibold">Explore our Koh Lanta guide →</Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Item 9 */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">9</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">Dive or Snorkel at Koh Tao</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Koh Tao (Turtle Island) is one of the cheapest and most popular places in the world to get your PADI Open Water certification. The small island in the Gulf of Thailand has over 25 dive sites within easy reach, including Sail Rock (where you might spot whale sharks), the HTMS Sattakut wreck, and the colorful pinnacles of Chumphon Pinnacle. Water temperatures hover around 28-30 degrees Celsius year-round, and visibility often exceeds 20 meters. An Open Water course typically costs ฿9,000-11,000 and takes 3-4 days, usually including accommodation. If diving is not for you, the snorkeling is excellent too — Shark Bay (Ao Thian Ok) is famous for its green sea turtles, and Mango Bay on the north tip has abundant reef fish. Beyond the underwater world, Koh Tao offers great viewpoint hikes, particularly the trek to John-Suwan Viewpoint and the short climb to the Koh Nang Yuan lookout, which has one of the most photographed panoramas in Thailand.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>Best diving season:</strong> March - October (calmest seas, best visibility)</p>
                      <p><strong>PADI Open Water course:</strong> ฿9,000-11,000 (3-4 days, often includes accommodation)</p>
                      <p><strong>Tip:</strong> Book your course on arrival — competition keeps prices low and you can meet instructors first.</p>
                    </div>
                    <p className="mt-3 text-sm">
                      <Link href="/city/koh-tao/" className="text-thailand-blue hover:underline font-semibold">Explore Koh Tao →</Link>
                      {' '}<span className="text-gray-400">|</span>{' '}
                      <Link href="/best-diving-snorkeling-in-thailand/" className="text-thailand-blue hover:underline font-semibold">Best diving &amp; snorkeling in Thailand →</Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Item 10 */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">10</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">Party at the Full Moon Party on Koh Phangan</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      The Full Moon Party on Haad Rin Beach is one of the most legendary party events in Southeast Asia. Every month around the full moon, tens of thousands of revelers gather on this crescent-shaped beach for an all-night celebration with fire shows, neon body paint, booming sound systems, and cheap bucket cocktails. The party runs from about 9pm until well after sunrise. While it is not everyone&apos;s scene, it is a rite of passage for many backpackers and remains genuinely fun if you go with the right expectations. Beyond the Full Moon Party, Koh Phangan has a completely different side worth exploring: the northern and western coasts are home to yoga retreats, wellness centers, and some of the quietest beaches in the Gulf of Thailand. Bottle Beach on the north coast is reachable only by boat or a jungle hike and feels worlds away from Haad Rin&apos;s party strip. The island&apos;s interior has waterfalls and jungle trails, and the sunset views from the western coast are among the best in southern Thailand.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>Entrance fee:</strong> ฿200</p>
                      <p><strong>When:</strong> Monthly around the full moon (check dates — it sometimes shifts to avoid Buddhist holidays)</p>
                      <p><strong>Tip:</strong> Wear shoes you can throw away, keep valuables locked at your hotel, and buy drinks from stalls (not strangers).</p>
                    </div>
                    <p className="mt-3 text-sm">
                      <Link href="/city/koh-phangan/" className="text-thailand-blue hover:underline font-semibold">Explore our Koh Phangan guide →</Link>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Mid-page Email Capture */}
            <EmailCapture heading="Planning your Thailand trip?" subtext="Get weekly travel tips, hidden gems, and budget hacks — straight to your inbox." />

            {/* ============================================ */}
            {/* SECTION 3: Unforgettable Food Experiences */}
            {/* ============================================ */}
            <section id="food" className="mb-16">
              <div className="border-t-2 border-thailand-blue/20 pt-8 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900">{isNl ? 'Onvergetelijke Culinaire Ervaringen' : 'Unforgettable Food Experiences'}</h2>
                <p className="text-gray-600 mt-2">{isNl ? 'De Thaise keuken is op zich al reden genoeg om het land te bezoeken. Deze ervaringen gaan verder dan alleen eten.' : 'Thai cuisine is reason enough to visit the country. These experiences go beyond just eating.'}</p>
              </div>

              {/* Item 11 */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">11</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">Take a Thai Cooking Class in Chiang Mai</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Chiang Mai is the cooking class capital of Thailand, and with good reason. The northern city has dozens of highly-rated schools offering half-day and full-day classes that typically begin with a guided tour of a local market where you learn to identify Thai herbs, spices, and vegetables. Back in the kitchen, you will prepare 4-6 dishes — usually including classics like pad thai, green or red curry, tom yum soup, and mango sticky rice. Most classes provide recipe booklets to take home. The best schools teach you authentic techniques like balancing the four Thai flavors (sweet, sour, salty, spicy) and pounding your own curry paste with a mortar and pestle rather than using store-bought shortcuts. Prices range from ฿800 to ฿1,500 for a half-day class and ฿1,200 to ฿2,000 for a full day. Organic farm-based classes outside the city tend to cost a bit more but include a peaceful setting surrounded by rice paddies.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>Cost:</strong> ฿800-2,000 depending on duration and school</p>
                      <p><strong>Duration:</strong> Half-day (3-4 hours) or full-day (5-7 hours) including market visit</p>
                      <p><strong>Tip:</strong> Book a class early in your trip so you can recognize and order dishes confidently for the rest of your stay.</p>
                    </div>
                    <p className="mt-3 text-sm">
                      <Link href="/city/chiang-mai/" className="text-thailand-blue hover:underline font-semibold">Explore Chiang Mai →</Link>
                      {' '}<span className="text-gray-400">|</span>{' '}
                      <Link href="/best-cooking-classes-in-thailand/" className="text-thailand-blue hover:underline font-semibold">Best cooking classes in Thailand →</Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Item 12 */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">12</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">Eat Your Way Through Bangkok&apos;s Street Food</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Bangkok is one of the greatest street food cities on earth. From roadside noodle stalls and night markets to Michelin-recognized shophouses, the city serves up an astonishing variety of dishes at prices that seem almost too good to be true. Start with Yaowarat (Chinatown) for grilled seafood, duck noodles, and mango sticky rice stands lining the neon-lit street. Explore the stalls around Victory Monument for boat noodles (฿20-35 for small bowls — the idea is to eat several). Head to Bang Rak for some of the city&apos;s oldest family-run eateries. And do not overlook the food courts in shopping malls like Terminal 21 or MBK Center, where you can eat well for ฿50-80 per dish in air-conditioned comfort. The Lumpini area hawker stalls around Sala Daeng are another local favorite, especially for lunch. Street food in Bangkok typically costs ฿40-80 per dish, which means you can eat three meals a day for under ฿250 (about $7 USD).
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>Budget per meal:</strong> ฿40-80 per dish at street stalls</p>
                      <p><strong>Top areas:</strong> Yaowarat (Chinatown), Victory Monument, Bang Rak, Sala Daeng</p>
                      <p><strong>Tip:</strong> Follow the crowds — busy stalls mean fresh food and high turnover.</p>
                    </div>
                    <p className="mt-3 text-sm">
                      <Link href="/blog/bangkok-street-food-beginners/" className="text-thailand-blue hover:underline font-semibold">Bangkok street food for beginners →</Link>
                      {' '}<span className="text-gray-400">|</span>{' '}
                      <Link href="/blog/bangkok-lumpini-hawker-centre-street-food-2026/" className="text-thailand-blue hover:underline font-semibold">Lumpini hawker centre guide →</Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Item 13 */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">13</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">Visit a Floating Market</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      {isNl
                        ? 'Drijvende markten zijn een van de meest fotogenieke tradities van Thailand, en hoewel veel ervan nu op toeristen zijn gericht, is de ervaring van versbereid eten kopen van verkopers in smalle houten boten nog steeds magisch. De twee meest toegankelijke opties vanuit Bangkok zijn Damnoen Saduak en Amphawa. Damnoen Saduak (ongeveer 100 km ten zuidwesten van Bangkok) is de grotere en meer toeristische van de twee — kom voor 9 uur aan om de tourbussen voor te zijn en verkopers daadwerkelijk te zien handelen in plaats van poseren voor foto\'s. Amphawa (ongeveer 80 km ten zuidwesten) is de meer authentieke en bij locals populaire optie, voornamelijk open in het weekend van de late middag tot de avond. De sfeer bij Amphawa is fantastisch: boten met gegrilde zeevruchten staan langs het kanaal, en je eet zittend op de houten platforms langs de oever. Na zonsondergang kun je een boottocht maken om vuurvliegjes te zien langs de Mae Klong rivier. Beide markten zijn makkelijke dagtripjes vanuit Bangkok per minibus of georganiseerde tour.'
                        : 'Floating markets are one of Thailand\'s most photogenic traditions, and while many are now oriented toward tourism, the experience of buying freshly cooked food from vendors in narrow wooden boats is still magical. The two most accessible options from Bangkok are Damnoen Saduak and Amphawa. Damnoen Saduak (about 100 km southwest of Bangkok) is the larger and more touristic of the two — arrive before 9am to beat the tour buses and see vendors actually trading rather than posing for photos. Amphawa (about 80 km southwest) is the more authentic and locals-preferred option, operating mainly on weekends from late afternoon into the evening. The atmosphere at Amphawa is fantastic: boats selling grilled seafood line the canal, and you eat sitting on the wooden platforms along the bank. After dark, you can take a boat ride to see fireflies along the Mae Klong River. Both markets are easy day trips from Bangkok via minivan or organized tour.'}
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>Damnoen Saduak:</strong> {isNl ? 'Dagelijks, best voor 9 uur — circa 1,5 uur vanaf Bangkok' : 'Daily, best before 9am — about 1.5 hours from Bangkok'}</p>
                      <p><strong>Amphawa:</strong> {isNl ? 'Vrijdag-zondag, late middag tot avond — circa 1,5 uur vanaf Bangkok' : 'Friday-Sunday, late afternoon to evening — about 1.5 hours from Bangkok'}</p>
                      <p><strong>{isNl ? 'Tip:' : 'Tip:'}</strong> {isNl ? 'Ga op een weekend avond naar Amphawa voor de meest authentieke ervaring en de vuurvliegjes boottocht.' : 'Go to Amphawa on a weekend evening for the most authentic experience and the firefly boat tour.'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Item 14 */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">14</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">Try Authentic Pad Thai at Thip Samai</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Thip Samai on Maha Chai Road in Bangkok&apos;s old town has been serving what many consider the best pad thai in the country since 1966. The restaurant&apos;s signature &quot;Superb Pad Thai&quot; is wrapped in a thin egg omelet and cooked over charcoal for a slightly smoky flavor that sets it apart from every other version you will try. The line often stretches down the street — especially on weekends — but it moves quickly because the kitchen operates with incredible efficiency. Prices are reasonable for the quality: expect to pay ฿60-100 per plate depending on whether you add prawns. Thip Samai is open from late afternoon until around midnight (or until ingredients run out), and is conveniently located near the Golden Mount and the backpacker hub of Khao San Road, making it easy to combine with sightseeing. While pad thai is available on virtually every street corner in Thailand, eating it at its most famous source is a worthwhile food pilgrimage.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>Price:</strong> ฿60-100 per plate</p>
                      <p><strong>Hours:</strong> Approximately 5pm - midnight (closed Wednesdays)</p>
                      <p><strong>Tip:</strong> Order the &quot;Superb Pad Thai&quot; (egg-wrapped) with fresh orange juice — the classic combination.</p>
                    </div>
                    <p className="mt-3 text-sm">
                      <Link href="/blog/pad-thai-street-food-vs-restaurant-homemade/" className="text-thailand-blue hover:underline font-semibold">Pad thai: street food vs. restaurant vs. homemade →</Link>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 4: Nature and Adventure Activities */}
            {/* ============================================ */}
            <section id="nature" className="mb-16">
              <div className="border-t-2 border-thailand-blue/20 pt-8 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900">{isNl ? 'Natuur- en Avontuuractiviteiten' : 'Nature and Adventure Activities'}</h2>
                <p className="text-gray-600 mt-2">{isNl ? 'Thailand\'s landschappen variëren van mistige bergen tot oeroude regenwouden en dramatische kalksteenkusten.' : 'Thailand\'s landscapes range from misty mountains to ancient rainforests and dramatic limestone coasts.'}</p>
              </div>

              {/* Item 15 */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">15</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">Ethical Elephant Experience in Chiang Mai</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Meeting elephants ethically is one of the most meaningful things you can do in Thailand. The industry has shifted significantly in recent years, and responsible sanctuaries now focus on observation, walking alongside elephants, and feeding — without riding, chains, or performances. Chiang Mai is the hub for ethical elephant experiences, with several well-regarded sanctuaries in the surrounding countryside. Programs typically last half a day or a full day and include learning about the elephants&apos; histories, walking with them through forest and river areas, preparing their food (elephants eat up to 200 kg per day), and watching them bathe and play in mud wallows. Look for sanctuaries that give elephants freedom to roam, do not use bullhooks, and limit group sizes. Some of the most respected programs are small operations that rescue elephants from logging or tourism industries and provide them with large open habitats. Expect to pay ฿2,000-4,500 per person for a half-day experience including transport from Chiang Mai.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>Cost:</strong> ฿2,000-4,500 per person for half-day programs (transport included)</p>
                      <p><strong>Duration:</strong> Half-day (4-5 hours) or full-day (7-8 hours)</p>
                      <p><strong>Tip:</strong> Avoid any place that offers riding, painting shows, or keeps elephants on short chains.</p>
                    </div>
                    <p className="mt-3 text-sm">
                      <Link href="/best-elephant-sanctuaries-in-thailand/" className="text-thailand-blue hover:underline font-semibold">Best elephant sanctuaries in Thailand →</Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Item 16 */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">16</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">Hike to Viewpoints in Pai</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Pai is a small mountain town in Mae Hong Son province, about 3 hours north of Chiang Mai via a winding road with 762 curves. Once a quiet backpacker secret, it now draws a steady stream of travelers seeking a slower pace and gorgeous scenery. The surrounding hills and valleys offer some of northern Thailand&apos;s best viewpoints. Pai Canyon (Kong Lan) is a narrow ridge walk with dramatic drop-offs on both sides and panoramic views of the valley below — go at sunset for the best light. The viewpoint at Yun Lai is another highlight, overlooking a sea of clouds on cool mornings during the winter months (November to February). The Pai area also has hot springs (Tha Pai Hot Springs in a forested setting), waterfalls (Pam Bok and Mo Paeng are popular swimming spots), and the famous Bamboo Bridge through rice paddies at Kho Ku So. Rent a scooter to explore — distances between attractions are manageable but too far to walk comfortably.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>Getting there:</strong> Minivan from Chiang Mai (3 hours, ฿150-250)</p>
                      <p><strong>Best season:</strong> November - February (cool, misty mornings, sea of clouds)</p>
                      <p><strong>Tip:</strong> Spend at least 2-3 nights — one day is not enough to soak in the Pai vibe.</p>
                    </div>
                    <p className="mt-3 text-sm">
                      <Link href="/city/pai/" className="text-thailand-blue hover:underline font-semibold">Explore our Pai guide →</Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Item 17 */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">17</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">Rock Climb at Railay Beach in Krabi</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Railay Beach is one of the world&apos;s premier rock climbing destinations, attracting climbers of all levels from around the globe. The peninsula (accessible only by boat due to the sheer limestone cliffs that cut it off from the mainland) has over 700 bolted routes ranging from beginner-friendly 5a walls to fierce overhangs at 8b+. The main climbing areas are Muay Thai Wall, One-Two-Three Wall, and Thaiwand Wall, all within walking distance of the beach. The setting is extraordinary — you climb above turquoise water with views of islands on the horizon. Half-day introductory courses for beginners cost around ฿1,000-1,800 per person including gear and an instructor, making it one of the most affordable ways to try outdoor climbing anywhere. Experienced climbers can rent gear and hire local guides or simply find routes and get going. The rock is sharp limestone, so bring climbing tape for your fingers. The best climbing season aligns with the dry season: November through March, when the rock is dry and the humidity is lower.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>Beginner course:</strong> ฿1,000-1,800 for half-day including gear and instructor</p>
                      <p><strong>Number of routes:</strong> 700+ bolted routes across all grades</p>
                      <p><strong>Tip:</strong> Stay on Railay itself (Tonsai side is cheapest) to maximize climbing time and avoid daily boat transfers.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Item 18 */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">18</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">Kayak Through Phang Nga Bay&apos;s Caves</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Phang Nga Bay, between Phuket and Krabi, is a marine wonderland of over 40 towering limestone karsts rising vertically from emerald-green water. The bay is most famous for James Bond Island (Khao Phing Kan), which appeared in &quot;The Man with the Golden Gun,&quot; but the real magic lies in exploring the hidden lagoons and sea caves accessible only by kayak at the right tide. Paddling through a narrow cave mouth into a collapsed karst — a &quot;hong&quot; (room) — and emerging into a still lagoon surrounded by 100-meter limestone walls is genuinely awe-inspiring. The most popular tour is the Hong by Starlight trip run by John Gray, a pioneer of sea kayaking in the region, which paddles into the hongs at dusk to experience them under starlight and bioluminescence. Day trips from Phuket typically cost ฿1,500-3,500 per person depending on the operator and group size. Choose a kayaking tour over a speedboat tour for a more intimate, eco-friendly experience — you will get closer to the cliffs and into caves that speedboats cannot access.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>Day trip cost:</strong> ฿1,500-3,500 per person from Phuket including lunch</p>
                      <p><strong>Highlights:</strong> James Bond Island, hidden hongs (lagoons), sea caves, mangrove forests</p>
                      <p><strong>Tip:</strong> Book a kayaking tour (not speedboat) for the best experience and access to hidden lagoons.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Item 19 */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">19</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">Trek Through Khao Sok National Park</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Khao Sok National Park in Surat Thani province contains one of the oldest evergreen rainforests in the world — estimated to be over 160 million years old, making it older than the Amazon. The park&apos;s centrepiece is Cheow Lan Lake, a vast reservoir surrounded by dramatic limestone cliffs and blanketed in thick jungle. Staying overnight in floating rafthouses on the lake is one of the most unique accommodation experiences in Thailand — you fall asleep to the sounds of the rainforest and wake to mist rising off the water. Guided treks through the jungle reveal giant Rafflesia flowers (the world&apos;s largest blooms), gibbons swinging through the canopy, hornbills, and if you are very lucky, wild elephants. Multi-day tours including lake kayaking, cave exploration, and jungle trekking typically cost ฿2,500-5,000 per person. The park is located between Phuket/Krabi and the Gulf coast (Koh Samui), making it a natural stopover if you are traveling between the two coasts.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>Park entrance fee:</strong> ฿300 for foreigners</p>
                      <p><strong>Rafthouses:</strong> ฿1,500-3,000/night including meals and guided activities</p>
                      <p><strong>Tip:</strong> Book a 2-day/1-night Cheow Lan Lake tour for the full experience — day trips feel rushed.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 5: Unique Cultural Experiences */}
            {/* ============================================ */}
            <section id="culture" className="mb-16">
              <div className="border-t-2 border-thailand-blue/20 pt-8 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900">{isNl ? 'Unieke Culturele Ervaringen' : 'Unique Cultural Experiences'}</h2>
                <p className="text-gray-600 mt-2">{isNl ? 'Voorbij de tempels en stranden onthullen deze ervaringen het kloppend hart van de Thaise cultuur.' : 'Beyond the temples and beaches, these experiences reveal the heartbeat of Thai culture.'}</p>
              </div>

              {/* Item 20 */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">20</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">Learn Muay Thai in Bangkok or Chiang Mai</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Muay Thai (Thai boxing) is Thailand&apos;s national sport and one of the most effective striking martial arts in the world. Training camps across the country welcome beginners and experienced fighters alike for sessions lasting from a single day to months-long immersive programs. Bangkok and Chiang Mai have the highest concentration of quality gyms. A typical beginner session lasts 1.5-2 hours and covers basic stance, punches, kicks, knee and elbow strikes, pad work, and conditioning. It is an incredible workout — expect to burn 600-1,000 calories per session. Drop-in sessions typically cost ฿300-500 at local gyms, while more specialized tourist-oriented camps charge ฿500-800. If you want the spectator experience, catch a live fight at Rajadamnern Stadium or Lumpinee Stadium in Bangkok — Thailand&apos;s two most prestigious Muay Thai venues. Ringside tickets cost around ฿1,000-2,000 and the atmosphere is electric, with Thai crowds passionately cheering and the traditional wai khru (pre-fight dance ritual) adding ceremony and pageantry.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>Drop-in session:</strong> ฿300-800 per session (1.5-2 hours)</p>
                      <p><strong>Stadium fights:</strong> ฿1,000-2,000 ringside at Rajadamnern or Lumpinee</p>
                      <p><strong>Tip:</strong> Even if you have never done martial arts, a single session is a fantastic and authentic experience.</p>
                    </div>
                    <p className="mt-3 text-sm">
                      <Link href="/best-muay-thai-in-thailand/" className="text-thailand-blue hover:underline font-semibold">Best Muay Thai gyms and camps in Thailand →</Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Item 21 */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">21</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">Release a Sky Lantern at Yi Peng Festival</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Yi Peng is Chiang Mai&apos;s lantern festival, held annually in November around the same time as the nationwide Loi Krathong celebration. The sight of thousands of glowing paper lanterns (khom loi) rising into the night sky is one of the most beautiful spectacles you will ever witness. The main organized mass-release events take place at venues outside the city, where hundreds of participants release their lanterns simultaneously — creating a surreal river of light floating upward. Tickets for the organized events typically cost ฿3,000-5,000 per person including dinner and cultural performances, and they sell out well in advance (book 2-3 months ahead). Within the city itself, smaller spontaneous releases happen along the Ping River and near the temples on the full moon night. The festival also coincides with Loi Krathong, when locals float small decorated banana-leaf boats (krathongs) carrying flowers, incense, and candles on the river to symbolize letting go of negativity. Participating in both traditions on the same night is profoundly moving.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>When:</strong> November (exact dates vary with the lunar calendar)</p>
                      <p><strong>Organized event tickets:</strong> ฿3,000-5,000 per person (book months ahead)</p>
                      <p><strong>Tip:</strong> Book accommodation in Chiang Mai early — the city fills up completely during Yi Peng week.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Item 22 */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">22</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">Get a Traditional Thai Massage</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Traditional Thai massage (nuad thai) was inscribed on UNESCO&apos;s Intangible Cultural Heritage list in 2019, recognizing its deep roots in Thai culture and medicine. Unlike Western massage, Thai massage is performed fully clothed on a floor mat and involves a combination of acupressure, stretching, and yoga-like positions — it is sometimes called &quot;lazy person&apos;s yoga.&quot; A skilled therapist will work through your entire body, stretching your limbs, pressing energy lines (sen), and cracking joints you did not know could crack. It can feel intense during the session, but afterward you will feel remarkably loose and energized. Massage shops are everywhere in Thailand — from basic street-side operations charging ฿200-300 per hour to luxury spa experiences at ฿1,500-3,000 per hour. For the most authentic experience, get a massage at Wat Pho in Bangkok, which is considered the birthplace of traditional Thai massage and still runs a respected massage school on its grounds. The temple offers 30-minute and 60-minute massages performed by trained practitioners.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>Cost:</strong> ฿300-500 for 1 hour at a street-side shop; ฿500-1,000 at Wat Pho</p>
                      <p><strong>Duration:</strong> 1-2 hours recommended for a full-body session</p>
                      <p><strong>Tip:</strong> Communicate with your therapist about pressure — &quot;bao bao&quot; means softer, &quot;nak noi&quot; means harder.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Item 23 */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">23</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">Explore Bangkok&apos;s Chatuchak Weekend Market</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Chatuchak Weekend Market (JJ Market) is one of the largest open-air markets in the world, spanning 35 acres with over 15,000 stalls and 27 sections selling everything imaginable. You will find vintage clothing, handmade jewelry, Thai silk, home decor, ceramics, art, antiques, plants, pets, and more — all at prices well below what you would pay in shopping malls. The food sections are outstanding: from coconut ice cream and mango sticky rice to grilled squid, pad thai, and fresh smoothies. Getting lost here is inevitable (and part of the experience), but pick up a map at one of the information kiosks and use the numbered section signs to orient yourself. The market is open Saturday and Sunday from 9am to 6pm, with some sections operating on Friday evenings. It gets extremely crowded and hot by midday, so arrive early (9-10am) for the most comfortable shopping experience. The nearest BTS station is Mo Chit, and MRT Chatuchak Park station is right at the entrance.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>Hours:</strong> Saturday-Sunday 9am-6pm; some stalls open Friday evening</p>
                      <p><strong>Size:</strong> 15,000+ stalls across 27 sections</p>
                      <p><strong>Tip:</strong> Bring cash in small bills — many vendors do not accept cards. Bargaining is expected on clothing and souvenirs.</p>
                    </div>
                    <p className="mt-3 text-sm">
                      <Link href="/blog/chatuchak-market-bangkok-guide/" className="text-thailand-blue hover:underline font-semibold">Our full Chatuchak Market guide →</Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Item 24 */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">24</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">Stay in a Treehouse in Khao Sok</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      For an accommodation experience you will never forget, spend a night in a treehouse or floating rafthouse deep in Khao Sok National Park. The park&apos;s Cheow Lan Lake is home to several floating bungalow operations where you sleep in a simple but comfortable wooden house built on bamboo rafts, surrounded by towering karst cliffs and pristine jungle. Electricity is limited (some operations use solar), mobile phone signal is nonexistent, and the only sounds are birdsong, gibbons calling at dawn, and the gentle lap of water beneath your room. Treehouse accommodations are also available in the jungle section of the park, elevated on stilts among the canopy. Most overnight packages include guided activities such as kayaking on the lake, jungle trekking to caves and waterfalls, night safaris to spot wildlife, and swimming in the emerald-green lake. The remoteness is part of the appeal — this is one of the few places in Thailand where you can truly disconnect.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>Rafthouses:</strong> ฿1,500-3,000/night per person (meals and activities included)</p>
                      <p><strong>What to bring:</strong> Headlamp, insect repellent, dry bag for electronics</p>
                      <p><strong>Tip:</strong> Book a 2-night stay for the full experience — the first night feels like settling in, the second is pure magic.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Item 25 */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">25</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">Visit Sukhothai Historical Park</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Sukhothai was the first capital of the Thai kingdom (1238-1438) and is widely considered the cradle of Thai civilization. The UNESCO-listed historical park contains the ruins of 21 temples and 4 large ponds within the old city walls, with dozens more spread across the surrounding countryside. Unlike Ayutthaya, Sukhothai feels uncrowded and peaceful — you can explore the ruins by bicycle at a leisurely pace, often with few other visitors around. The centrepiece is Wat Mahathat, the royal temple with its iconic seated Buddha surrounded by columns, reflected in a lotus-filled pond. The park is divided into five zones, and the central zone alone takes 2-3 hours to explore properly. Sukhothai is less visited than Ayutthaya because it is further from Bangkok (about 440 km north), but the extra effort is rewarded with a more contemplative, atmospheric experience. The nearby Si Satchanalai Historical Park, another 60 km north, is even quieter and equally beautiful.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>Entrance fee:</strong> ฿100 per zone (central zone is the must-see; ฿350 combo ticket for all zones)</p>
                      <p><strong>Hours:</strong> 6:30am - 7:30pm daily (central zone); other zones 6am - 6pm</p>
                      <p><strong>Tip:</strong> Rent a bicycle (฿30/day) and explore the central zone first, then cycle to the northern and western zones if time allows.</p>
                    </div>
                    <p className="mt-3 text-sm">
                      <Link href="/city/sukhothai/" className="text-thailand-blue hover:underline font-semibold">Explore our Sukhothai guide →</Link>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 6: Planning FAQ */}
            {/* ============================================ */}
            <section id="planning" className="mb-12">
              <div className="border-t-2 border-thailand-blue/20 pt-8 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900">{isNl ? 'Plan Je Thailand Reis' : 'Planning Your Thailand Trip'}</h2>
                <p className="text-gray-600 mt-2">{isNl ? 'Antwoorden op de meest gestelde vragen over een bezoek aan Thailand.' : 'Answers to the most common questions about visiting Thailand.'}</p>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="space-y-6">
                  {faqItems.map((item) => (
                    <div key={item.question}>
                      <h3 className="font-bold font-heading text-gray-900 mb-2 text-lg">{item.question}</h3>
                      <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                      {item.question === 'How many days do you need in Thailand?' && (
                        <p className="mt-2 text-sm">
                          <Link href="/thailand-itinerary/" className="text-thailand-blue hover:underline font-semibold">Browse our Thailand itineraries →</Link>
                        </p>
                      )}
                      {item.question === 'What is the best time to visit Thailand?' && (
                        <p className="mt-2 text-sm">
                          <Link href="/thailand-index/best-time/" className="text-thailand-blue hover:underline font-semibold">Full month-by-month weather guide →</Link>
                        </p>
                      )}
                      {item.question === 'Do you need a visa for Thailand?' && (
                        <p className="mt-2 text-sm">
                          <Link href="/visa/" className="text-thailand-blue hover:underline font-semibold">Full Thailand visa guide →</Link>
                        </p>
                      )}
                      {item.question === 'Is Thailand safe for tourists?' && (
                        <p className="mt-2 text-sm">
                          <Link href="/is-thailand-safe/" className="text-thailand-blue hover:underline font-semibold">Full Thailand safety guide →</Link>
                        </p>
                      )}
                      {item.question === 'How much does Thailand cost per day?' && (
                        <p className="mt-2 text-sm">
                          <Link href="/blog/thailand-budget-2026-daily-costs/" className="text-thailand-blue hover:underline font-semibold">Thailand budget breakdown 2026 →</Link>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Email Capture */}
            <EmailCapture heading="Want more Thailand tips?" subtext="Get our weekly newsletter with hidden gems, budget hacks, and insider guides for Thailand." />

            {/* Cross-links to other pillar pages */}
            <section className="bg-white rounded-2xl shadow-md p-6 mt-8">
              <h2 className="text-xl font-bold font-heading text-gray-900 mb-4">{isNl ? 'Ontdek Meer Thailand Gidsen' : 'Explore More Thailand Guides'}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Link href="/thailand-travel-guide/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">{isNl ? 'Reisgids' : 'Travel Guide'}</div>
                  <div className="text-xs text-gray-600">{isNl ? 'Alles wat je nodig hebt' : 'Everything you need'}</div>
                </Link>
                <Link href="/best-places-to-visit-thailand/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">{isNl ? 'Beste Plekken' : 'Best Places'}</div>
                  <div className="text-xs text-gray-600">{isNl ? '33 bestemmingen' : '33 destinations'}</div>
                </Link>
                <Link href="/thailand-itinerary/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">{isNl ? 'Reisroutes' : 'Itineraries'}</div>
                  <div className="text-xs text-gray-600">{isNl ? 'Kant-en-klare routes' : 'Ready-made routes'}</div>
                </Link>
                <Link href="/thailand-for-first-timers/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">{isNl ? 'Eerste Keer' : 'First Timers'}</div>
                  <div className="text-xs text-gray-600">{isNl ? 'Begin hier' : 'Start here'}</div>
                </Link>
                <Link href="/islands/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">{isNl ? 'Thaise Eilanden' : 'Thai Islands'}</div>
                  <div className="text-xs text-gray-600">{isNl ? 'Strandparadijs' : 'Beach paradise'}</div>
                </Link>
                <Link href="/food/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">{isNl ? 'Thais Eten' : 'Thai Food'}</div>
                  <div className="text-xs text-gray-600">{isNl ? 'Keukengids' : 'Cuisine guide'}</div>
                </Link>
                <Link href="/is-thailand-safe/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">{isNl ? 'Veiligheidsgids' : 'Safety Guide'}</div>
                  <div className="text-xs text-gray-600">{isNl ? 'Blijf veilig' : 'Stay safe'}</div>
                </Link>
                <Link href="/transport/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                  <div className="font-semibold text-gray-900 text-sm">{isNl ? 'Vervoer' : 'Transport'}</div>
                  <div className="text-xs text-gray-600">{isNl ? 'Bussen, treinen, vluchten' : 'Buses, trains, flights'}</div>
                </Link>
              </div>
            </section>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 86400,
  };
};
