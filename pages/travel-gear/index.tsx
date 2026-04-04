import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import SEOHead from '../../components/SEOHead';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '../../components/Breadcrumbs';
import { useState } from 'react';

interface GearItem {
  id: number;
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
  features: string[];
  amazonLink: string;
  rating: number;
  reviews: number;
  essential: boolean;
}

interface GearCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

interface TravelGearPageProps {
  gearItems: GearItem[];
  categories: GearCategory[];
}

export default function TravelGearPage({ gearItems, categories }: TravelGearPageProps) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Reisuitrusting' : 'Travel Gear', href: '/travel-gear' }
  ];

  const filteredItems = selectedCategory === 'all'
    ? gearItems
    : gearItems.filter(item => item.category === selectedCategory);

  return (
    <>
      <SEOHead
        title={isNl
          ? 'Essenti\u00eble Reisuitrusting voor Thailand 2026 | Paklijst & Reviews'
          : 'Essential Travel Gear for Thailand 2026 | Packing List & Reviews'}
        description={isNl
          ? 'De ultieme Thailand paklijst. Vind de beste reisuitrusting inclusief rugzakken, muggenspray, regenkleding en elektronica voor je Thailand avontuur.'
          : 'The ultimate Thailand packing list. Find the best travel gear including backpacks, mosquito repellent, rain gear, and electronics for your Thailand adventure.'}
      >
        <meta name="keywords" content={isNl
          ? 'Thailand reisuitrusting, Thailand paklijst, beste rugzak Thailand, muggenspray Thailand, reisbenodigdheden'
          : 'Thailand travel gear, Thailand packing list, best backpack Thailand, mosquito repellent Thailand, travel essentials'} />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero Section */}
        <section className="bg-surface-dark text-white">
          <div className="container-custom py-16">
            <div className="text-center">
              <p className="font-script text-thailand-gold mb-2">{isNl ? 'Slim Inpakken' : 'Pack Smart'}</p>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
                {isNl ? 'Essenti\u00eble Reisuitrusting voor Thailand' : 'Essential Travel Gear for Thailand'}
              </h1>
              <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                {isNl
                  ? 'Pak slim in voor je Thailand avontuur met onze geteste aanbevelingen'
                  : 'Pack smart for your Thailand adventure with our tested gear recommendations'}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">
                  {isNl ? 'Getest & Bewezen' : 'Tried & Tested'}
                </div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">
                  {isNl ? 'Thailand Specifiek' : 'Thailand Specific'}
                </div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">
                  {isNl ? 'Beste Waarde' : 'Best Value'}
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Breadcrumbs and Affiliate Notice */}
        <section className="bg-white">
          <div className="container-custom py-6">
            <Breadcrumbs items={breadcrumbs} />

            {/* Affiliate Notice */}
            <div className="bg-orange-50 border-0 rounded-2xl mt-4">
              <div className="px-4 py-3">
                <p className="text-sm text-center text-orange-800">
                  {isNl
                    ? 'Deze pagina bevat affiliate links. Als Amazon Associate verdienen wij aan kwalificerende aankopen, zonder extra kosten voor jou.'
                    : 'This page contains affiliate links. As an Amazon Associate, we earn from qualifying purchases at no extra cost to you.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Essentials Section */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <p className="section-label text-center">{isNl ? 'Essenti\u00eble Items' : 'Essentials'}</p>
            <h2 className="text-3xl font-bold font-heading text-center mb-8">
              {isNl ? 'Thailand Reisbenodigdheden' : 'Thailand Travel Essentials'}
            </h2>
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <div className="text-center">
                <div className="text-4xl mb-4"></div>
                <h3 className="font-semibold font-heading mb-2">{isNl ? 'Muggenbescherming' : 'Mosquito Protection'}</h3>
                <p className="text-gray-600 text-sm">
                  {isNl
                    ? 'DEET spray is essentieel, vooral tijdens het regenseizoen'
                    : 'DEET spray is essential, especially during rainy season'}
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4"></div>
                <h3 className="font-semibold font-heading mb-2">{isNl ? 'Zonbescherming' : 'Sun Protection'}</h3>
                <p className="text-gray-600 text-sm">
                  {isNl
                    ? 'Hoge SPF zonnebrandcr\u00e8me en een goede hoed zijn onmisbaar'
                    : 'High SPF sunscreen and a good hat are must-haves'}
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4"></div>
                <h3 className="font-semibold font-heading mb-2">{isNl ? 'Regenkleding' : 'Rain Gear'}</h3>
                <p className="text-gray-600 text-sm">
                  {isNl
                    ? 'Lichtgewicht regenjack of poncho voor plotselinge buien'
                    : 'Lightweight rain jacket or poncho for sudden downpours'}
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4"></div>
                <h3 className="font-semibold font-heading mb-2">{isNl ? 'Stekkeradapter' : 'Power Adapter'}</h3>
                <p className="text-gray-600 text-sm">
                  {isNl
                    ? 'Thailand gebruikt Type A, B, C stekkers - universele adapter nodig'
                    : 'Thailand uses Type A, B, C plugs - universal adapter needed'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8">
          <div className="container-custom">
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-6 py-3 rounded-full transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-thailand-blue text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {isNl ? 'Alle Uitrusting' : 'All Gear'}
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full transition-colors flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? 'bg-thailand-blue text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gear Grid */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid md:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden">
                  {/* Essential Badge */}
                  {item.essential && (
                    <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 absolute top-4 right-4 rounded-full z-10">
                      {isNl ? 'ESSENTIEEL' : 'ESSENTIAL'}
                    </div>
                  )}

                  {/* Product Image */}
                  <div className="relative h-64 bg-surface-cream">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-4"
                    />
                  </div>

                  <div className="p-6">
                    {/* Category & Rating */}
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm text-gray-500 uppercase tracking-wide">
                        {categories.find(c => c.id === item.category)?.name}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">\u2605</span>
                        <span className="text-sm font-medium">{item.rating}</span>
                        <span className="text-xs text-gray-500">({item.reviews})</span>
                      </div>
                    </div>

                    {/* Product Name & Price */}
                    <h3 className="text-xl font-bold font-heading mb-2">{item.name}</h3>
                    <p className="text-2xl font-bold text-thailand-blue mb-3">{item.price}</p>

                    {/* Description */}
                    <p className="text-gray-700 mb-4 text-sm">{item.description}</p>

                    {/* Features */}
                    <ul className="mb-4 space-y-1">
                      {item.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="text-green-500 mr-2">\u2713</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <a
                      href={item.amazonLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-thailand-red text-white text-center py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
                    >
                      {isNl ? 'Bekijk op Amazon \u2192' : 'View on Amazon \u2192'}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* MID-CONTENT AD */}
          </div>
        </section>

        {/* Packing Tips Section */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <p className="section-label text-center">{isNl ? 'Inpaktips' : 'Packing Tips'}</p>
            <h2 className="text-3xl font-bold font-heading text-center mb-8">
              {isNl ? 'Thailand Inpaktips' : 'Thailand Packing Tips'}
            </h2>
            <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="font-semibold font-heading mb-3 flex items-center gap-2">
                  <span className="text-2xl"></span>
                  {isNl ? 'Eilandhoppen Essentials' : 'Island Hopping Essentials'}
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>&bull; {isNl ? 'Waterdichte tas voor boottochten' : 'Dry bag for boat trips'}</li>
                  <li>&bull; {isNl ? 'Rifvriendelijke zonnebrand' : 'Reef-safe sunscreen'}</li>
                  <li>&bull; {isNl ? 'Sneldrogende handdoek' : 'Quick-dry towel'}</li>
                  <li>&bull; {isNl ? 'Waterdicht telefoonhoesje' : 'Waterproof phone case'}</li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="font-semibold font-heading mb-3 flex items-center gap-2">
                  <span className="text-2xl"></span>
                  {isNl ? 'Tempelbezoek Vereisten' : 'Temple Visit Requirements'}
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>&bull; {isNl ? 'Sarong of lange broek' : 'Sarong or long pants'}</li>
                  <li>&bull; {isNl ? 'Schouderbedekkend shirt' : 'Shoulders-covering shirt'}</li>
                  <li>&bull; {isNl ? 'Makkelijk uit te trekken schoenen' : 'Easy-remove shoes'}</li>
                  <li>&bull; {isNl ? 'Klein tasje voor schoenen' : 'Small bag for shoes'}</li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="font-semibold font-heading mb-3 flex items-center gap-2">
                  <span className="text-2xl"></span>
                  {isNl ? 'Hitte Tips' : 'Hot Weather Hacks'}
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>&bull; {isNl ? 'Koelhanddoek' : 'Cooling towel'}</li>
                  <li>&bull; {isNl ? 'Elektrolytenpakjes' : 'Electrolyte packets'}</li>
                  <li>&bull; {isNl ? 'Alleen ademende stoffen' : 'Breathable fabrics only'}</li>
                  <li>&bull; {isNl ? 'Draagbare ventilator' : 'Portable fan'}</li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="font-semibold font-heading mb-3 flex items-center gap-2">
                  <span className="text-2xl"></span>
                  {isNl ? 'Backpack Must-Haves' : 'Backpacking Must-Haves'}
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>&bull; {isNl ? 'Packing cubes' : 'Packing cubes'}</li>
                  <li>&bull; {isNl ? 'Wasmiddel sheets' : 'Laundry detergent sheets'}</li>
                  <li>&bull; {isNl ? 'Hangslot voor hostels' : 'Padlock for hostels'}</li>
                  <li>&bull; {isNl ? 'EHBO-set' : 'First aid kit'}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Plan Your Trip - Internal Links Section */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <p className="section-label text-center">{isNl ? 'Plan Je Reis' : 'Plan Your Trip'}</p>
            <h2 className="text-3xl font-bold font-heading text-center mb-3">
              {isNl ? 'Gerelateerde Reisgidsen' : 'Related Travel Guides'}
            </h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              {isNl
                ? 'Goede uitrusting is nog maar het begin. Gebruik deze gidsen om elk detail van je Thailand avontuur te plannen.'
                : 'Great gear is just the start. Use these guides to plan every detail of your Thailand adventure.'}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
              <Link href="/weather/" className="group">
                <div className="bg-surface-cream rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all h-full flex flex-col">
                  <div className="text-3xl mb-3"></div>
                  <h3 className="font-bold font-heading text-base mb-2 group-hover:text-thailand-blue transition-colors">
                    {isNl ? 'Weergids' : 'Weather Guide'}
                  </h3>
                  <p className="text-gray-600 text-sm flex-1">
                    {isNl
                      ? 'Pak in voor het juiste seizoen \u2014 weet wanneer je regenkleding of strandspullen nodig hebt.'
                      : 'Pack for the right season \u2014 know when to bring rain gear or beach essentials.'}
                  </p>
                  <span className="text-thailand-blue text-sm font-medium mt-3 inline-block">
                    {isNl ? 'Bekijk weer \u2192' : 'Check weather \u2192'}
                  </span>
                </div>
              </Link>
              <Link href="/city/" className="group">
                <div className="bg-surface-cream rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all h-full flex flex-col">
                  <div className="text-3xl mb-3"></div>
                  <h3 className="font-bold font-heading text-base mb-2 group-hover:text-thailand-blue transition-colors">
                    {isNl ? 'Stadsgidsen' : 'City Guides'}
                  </h3>
                  <p className="text-gray-600 text-sm flex-1">
                    {isNl
                      ? 'Ontdek 33 Thaise steden \u2014 elk met unieke uitrustingsbehoeften.'
                      : 'Explore 33 Thai cities \u2014 each with unique gear needs from Bangkok temples to Chiang Mai trekking.'}
                  </p>
                  <span className="text-thailand-blue text-sm font-medium mt-3 inline-block">
                    {isNl ? 'Bekijk steden \u2192' : 'Browse cities \u2192'}
                  </span>
                </div>
              </Link>
              <Link href="/islands/" className="group">
                <div className="bg-surface-cream rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all h-full flex flex-col">
                  <div className="text-3xl mb-3"></div>
                  <h3 className="font-bold font-heading text-base mb-2 group-hover:text-thailand-blue transition-colors">
                    {isNl ? 'Eilandengids' : 'Island Guide'}
                  </h3>
                  <p className="text-gray-600 text-sm flex-1">
                    {isNl
                      ? 'Op weg naar het strand? Bekijk onze eilandengids voor strand- en wateruitrusting.'
                      : 'Heading to the beaches? See our island guide for what beach and water gear to pack.'}
                  </p>
                  <span className="text-thailand-blue text-sm font-medium mt-3 inline-block">
                    {isNl ? 'Ontdek eilanden \u2192' : 'Explore islands \u2192'}
                  </span>
                </div>
              </Link>
              <Link href="/thailand-for-first-timers/" className="group">
                <div className="bg-surface-cream rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all h-full flex flex-col">
                  <div className="text-3xl mb-3"></div>
                  <h3 className="font-bold font-heading text-base mb-2 group-hover:text-thailand-blue transition-colors">
                    {isNl ? 'Gids voor Beginners' : "First Timer's Guide"}
                  </h3>
                  <p className="text-gray-600 text-sm flex-1">
                    {isNl
                      ? 'Eerste reis naar Thailand? Deze complete gids behandelt alles wat je moet weten.'
                      : 'First trip to Thailand? This complete guide covers everything you need to know before you go.'}
                  </p>
                  <span className="text-thailand-blue text-sm font-medium mt-3 inline-block">
                    {isNl ? 'Lees de gids \u2192' : 'Read the guide \u2192'}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* More Travel Essentials - Cross-sell Section */}
        <section className="py-12 bg-surface-cream">
          <div className="container-custom">
            <p className="section-label text-center">{isNl ? 'Meer Essentials' : 'More Essentials'}</p>
            <h2 className="text-3xl font-bold font-heading text-center mb-3">
              {isNl ? 'Meer Reisbenodigdheden' : 'More Travel Essentials'}
            </h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              {isNl
                ? 'Naast uitrusting \u2014 zorg dat je volledig voorbereid bent op Thailand met deze essenti\u00eble diensten'
                : 'Beyond gear -- make sure you are fully prepared for Thailand with these essential services'}
            </p>
            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <Link href="/esim/" className="group">
                <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all h-full">
                  <div className="text-4xl mb-4"></div>
                  <h3 className="font-bold font-heading text-lg mb-2 group-hover:text-thailand-blue transition-colors">Thailand eSIM</h3>
                  <p className="text-gray-600 text-sm">
                    {isNl
                      ? 'Blijf verbonden met betaalbare data-abonnementen. Geen fysieke SIM nodig.'
                      : 'Stay connected with affordable data plans. No physical SIM needed.'}
                  </p>
                </div>
              </Link>
              <Link href="/travel-insurance-thailand/" className="group">
                <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all h-full">
                  <div className="text-4xl mb-4"></div>
                  <h3 className="font-bold font-heading text-lg mb-2 group-hover:text-thailand-blue transition-colors">
                    {isNl ? 'Reisverzekering' : 'Travel Insurance'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {isNl
                      ? 'Bescherm je reis met uitgebreide dekking voor Thailand.'
                      : 'Protect your trip with comprehensive coverage for Thailand.'}
                  </p>
                </div>
              </Link>
              <Link href="/travel-security/" className="group">
                <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all h-full">
                  <div className="text-4xl mb-4"></div>
                  <h3 className="font-bold font-heading text-lg mb-2 group-hover:text-thailand-blue transition-colors">
                    {isNl ? 'VPN & Beveiliging' : 'VPN & Security'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {isNl
                      ? 'Blijf veilig online met een betrouwbare VPN voor openbare Wi-Fi in Thailand.'
                      : 'Stay safe online with a reliable VPN for public Wi-Fi in Thailand.'}
                  </p>
                </div>
              </Link>
              <a href="https://trip.tpo.lv/TmObooZ5?subid=travel-gear" target="_blank" rel="noopener noreferrer" className="group">
                <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all h-full">
                  <div className="text-4xl mb-4"></div>
                  <h3 className="font-bold font-heading text-lg mb-2 group-hover:text-thailand-blue transition-colors">
                    {isNl ? 'Boek Hotels' : 'Book Hotels'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {isNl
                      ? 'Vind geweldige deals voor Thailand hotels en resorts op Trip.com.'
                      : 'Find great deals on Thailand hotels and resorts on Trip.com.'}
                  </p>
                </div>
              </a>
            </div>
            <p className="text-gray-400 text-xs text-center mt-6">
              {isNl
                ? 'Sommige links zijn affiliate links. We kunnen een commissie verdienen zonder extra kosten voor jou.'
                : 'Some links are affiliate links. We may earn a commission at no extra cost to you.'}
            </p>
          </div>
        </section>

        {/* Amazon Associates Disclaimer */}
        <section className="py-8 bg-surface-cream">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-sm text-gray-600 mb-2">
                <strong>{isNl ? 'Affiliate Verklaring:' : 'Affiliate Disclosure:'}</strong>{' '}
                {isNl
                  ? 'Als Amazon Associate verdien ik aan kwalificerende aankopen. Dit betekent dat ik een commissie kan ontvangen zonder extra kosten voor jou wanneer je koopt via links op deze pagina.'
                  : 'As an Amazon Associate, I earn from qualifying purchases. This means I may receive a commission at no extra cost to you when you purchase through links on this page.'}
              </p>
              <p className="text-xs text-gray-500">
                {isNl
                  ? 'Alle aanbevelingen zijn gebaseerd op persoonlijke ervaring met reizen in Thailand en uitgebreid onderzoek. Prijzen en beschikbaarheid kunnen wijzigen.'
                  : 'All gear recommendations are based on personal experience traveling in Thailand and extensive research. Prices and availability are subject to change.'}
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const categories: GearCategory[] = [
    { id: 'backpacks', name: 'Backpacks', icon: '', description: 'Travel backpacks and daypacks' },
    { id: 'health', name: 'Health & Safety', icon: '', description: 'First aid, mosquito protection' },
    { id: 'electronics', name: 'Electronics', icon: '', description: 'Adapters, power banks, tech' },
    { id: 'clothing', name: 'Clothing', icon: '', description: 'Weather appropriate clothes' },
    { id: 'accessories', name: 'Accessories', icon: '', description: 'Travel accessories' }
  ];

  const gearItems: GearItem[] = [
    {
      id: 1,
      name: "AirVault Vacuum Travel Backpack",
      category: "backpacks",
      description: "Innovative carry-on backpack with built-in vacuum compression. Fits 5-7 days of clothes in airline-approved size.",
      price: "$89-99",
      image: "https://m.media-amazon.com/images/I/81KTCe77KmL._AC_SL1500_.jpg",
      features: [
        "Built-in vacuum compression system",
        "Carry-on approved dimensions",
        "Fits 5-7 days of clothing",
        "Water-resistant material",
        "USB charging port"
      ],
      amazonLink: "https://www.amazon.com/dp/B0DQD8FVJB?tag=go2thailand-20",
      rating: 4.3,
      reviews: 250,
      essential: true
    },
    {
      id: 2,
      name: "UGREEN 25000mAh Power Bank",
      category: "electronics",
      description: "High-capacity power bank with fast charging. Perfect for long travel days and charging multiple devices.",
      price: "$45-55",
      image: "https://m.media-amazon.com/images/I/51QA3Bm7DYL._AC_SL1500_.jpg",
      features: [
        "25000mAh high capacity",
        "100W PD fast charging",
        "3 ports (2 USB-C, 1 USB-A)",
        "Digital display shows battery %",
        "Charges laptop, phone, tablet"
      ],
      amazonLink: "https://www.amazon.com/dp/B0BJQ7F16T?tag=go2thailand-20",
      rating: 4.5,
      reviews: 3000,
      essential: true
    },
    {
      id: 3,
      name: "Anker PowerCore 10K with Built-in USB-C",
      category: "electronics",
      description: "Compact power bank with built-in foldable USB-C connector. No cables needed - perfect for travel!",
      price: "$25-35",
      image: "https://m.media-amazon.com/images/I/61QjXMm2VTL._AC_SL1500_.jpg",
      features: [
        "10,000mAh capacity",
        "Built-in foldable USB-C cable",
        "No extra cables needed",
        "20W fast charging",
        "Charges phone 2+ times"
      ],
      amazonLink: "https://www.amazon.com/dp/B0CX4992Z8?tag=go2thailand-20",
      rating: 4.5,
      reviews: 1500,
      essential: true
    },
    {
      id: 4,
      name: "MOMAX Universal Travel Adapter",
      category: "electronics",
      description: "Premium travel adapter with GaN technology. Works in Thailand and 200+ countries with fast charging.",
      price: "$35-45",
      image: "https://m.media-amazon.com/images/I/61N1ocLV0XL._AC_SL1500_.jpg",
      features: [
        "Works in Thailand & 200+ countries",
        "70W GaN fast charging",
        "3 USB-C + 2 USB-A ports",
        "Simultaneous 5-device charging",
        "Safety certified with fuse"
      ],
      amazonLink: "https://www.amazon.com/dp/B0BHQNMDNC?tag=go2thailand-20",
      rating: 4.6,
      reviews: 1200,
      essential: true
    },
    {
      id: 5,
      name: "Sun Cube Wide Brim Sun Hat",
      category: "clothing",
      description: "UPF 50+ sun protection with extra wide brim. Packable and perfect for Thailand's strong sun.",
      price: "$20-30",
      image: "https://m.media-amazon.com/images/I/81T8bidN4mL._AC_SX466_.jpg",
      features: [
        "UPF 50+ certified",
        "4-inch wide brim",
        "Adjustable chin cord",
        "Moisture-wicking band",
        "Folds for packing"
      ],
      amazonLink: "https://www.amazon.com/dp/B09WHGZ46G?tag=go2thailand-20",
      rating: 4.4,
      reviews: 2100,
      essential: false
    },
    {
      id: 6,
      name: "Neutrogena Beach Defense Sunscreen SPF 70",
      category: "health",
      description: "High SPF protection for Thailand's intense sun. Water resistant and lightweight formula.",
      price: "$10-15",
      image: "https://m.media-amazon.com/images/I/61Qk6tKPGPL._SL1500_.jpg",
      features: [
        "SPF 70 protection",
        "Helioplex technology",
        "Water resistant 80 minutes",
        "Oil-free formula",
        "Fast-absorbing"
      ],
      amazonLink: "https://www.amazon.com/dp/B00AEN4QZ8?tag=go2thailand-20",
      rating: 4.3,
      reviews: 9800,
      essential: true
    },
    {
      id: 7,
      name: "Badger Anti-Bug Shake & Spray",
      category: "health",
      description: "Natural, DEET-free mosquito repellent. Certified organic with essential oils - safe for kids too.",
      price: "$12-16",
      image: "https://m.media-amazon.com/images/I/612e7rX9j3L._AC_SL1500_.jpg",
      features: [
        "DEET-free natural formula",
        "Certified organic ingredients",
        "Essential oil based (citronella, cedar)",
        "Safe for children",
        "Eco-friendly aluminum bottle"
      ],
      amazonLink: "https://www.amazon.com/dp/B003FBPFJW?tag=go2thailand-20",
      rating: 4.0,
      reviews: 1800,
      essential: true
    },
    {
      id: 8,
      name: "Rainleaf Microfiber Travel Towel",
      category: "accessories",
      description: "Ultra-compact quick-dry towel. Takes up minimal space in your backpack and dries super fast.",
      price: "$10-20",
      image: "https://m.media-amazon.com/images/I/61HHXRkRz6L._AC_SL1000_.jpg",
      features: [
        "Quick dry microfiber",
        "5 size options",
        "Antibacterial coating",
        "Comes with carry bag",
        "Snap loop for hanging"
      ],
      amazonLink: "https://www.amazon.com/dp/B01K1TX77W?tag=go2thailand-20",
      rating: 4.3,
      reviews: 28000,
      essential: false
    },
    {
      id: 9,
      name: "Venture Pal Lightweight Packable Backpack",
      category: "backpacks",
      description: "Ultra-light daypack that folds into its own pocket. Perfect for day trips and as extra bag.",
      price: "$22-28",
      image: "https://m.media-amazon.com/images/I/71EqyF7QYSL._AC_SL1500_.jpg",
      features: [
        "Only 0.7 lbs weight",
        "35L capacity",
        "Folds into pocket",
        "Water resistant coating",
        "Lifetime warranty"
      ],
      amazonLink: "https://www.amazon.com/dp/B07PY3D9M7?tag=go2thailand-20",
      rating: 4.3,
      reviews: 24000,
      essential: false
    },
    {
      id: 10,
      name: "SIMARI Water Shoes Quick-Dry",
      category: "clothing",
      description: "Affordable water shoes perfect for island hopping, waterfall visits, and rocky beaches.",
      price: "$12-20",
      image: "https://m.media-amazon.com/images/I/615Y2JPLC5L._AC_SY500_.jpg",
      features: [
        "Quick-dry breathable fabric",
        "Rubber sole for grip",
        "Ultra lightweight",
        "Multiple colors",
        "Folds flat for packing"
      ],
      amazonLink: "https://www.amazon.com/dp/B08SJ4JQWD?tag=go2thailand-20",
      rating: 4.2,
      reviews: 18000,
      essential: false
    },
    {
      id: 11,
      name: "Earth Pak Waterproof Dry Bag",
      category: "accessories",
      description: "Keep your valuables dry during boat trips, beach days, and Thailand's rainy season. Roll-top closure ensures waterproof seal.",
      price: "$18-25",
      image: "https://m.media-amazon.com/images/I/71K+pqXfiEL._AC_SL1500_.jpg",
      features: [
        "100% waterproof protection",
        "10L/20L sizes available",
        "Heavy-duty 500D PVC",
        "Roll-top closure system",
        "Includes shoulder strap"
      ],
      amazonLink: "https://www.amazon.com/dp/B01GZCUCO0?tag=go2thailand-20",
      rating: 4.4,
      reviews: 32000,
      essential: true
    },
    {
      id: 12,
      name: "HovSiyla Quick-Dry Athletic Shirt",
      category: "clothing",
      description: "Moisture-wicking athletic shirt perfect for Thailand's humid climate. Dries fast and keeps you cool.",
      price: "$15-25",
      image: "https://m.media-amazon.com/images/I/61GltY-BrXL._AC_SY500_.jpg",
      features: [
        "Quick-dry polyester fabric",
        "Moisture-wicking technology",
        "UPF 50+ sun protection",
        "Anti-odor treatment",
        "Athletic fit design"
      ],
      amazonLink: "https://www.amazon.com/dp/B0D266SMGD?tag=go2thailand-20",
      rating: 4.3,
      reviews: 5500,
      essential: false
    },
    {
      id: 13,
      name: "Hagon PRO Disposable Rain Ponchos",
      category: "clothing",
      description: "Pack of emergency rain ponchos perfect for Thailand's sudden downpours. Lightweight and compact.",
      price: "$10-15",
      image: "https://m.media-amazon.com/images/I/712kxoa9k8L._AC_SY500_.jpg",
      features: [
        "Pack of 4 ponchos",
        "100% waterproof material",
        "One size fits all",
        "Lightweight & packable",
        "Drawstring hood"
      ],
      amazonLink: "https://www.amazon.com/dp/B076ZHMR3S?tag=go2thailand-20",
      rating: 4.4,
      reviews: 3200,
      essential: true
    }
  ];

  return {
    props: {
      gearItems,
      categories
    }
  };
};
