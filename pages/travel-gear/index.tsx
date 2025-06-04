import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import EzoicAd from '../../components/EzoicAd';
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
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Travel Gear', href: '/travel-gear' }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? gearItems 
    : gearItems.filter(item => item.category === selectedCategory);

  return (
    <>
      <Head>
        <title>Essential Travel Gear for Thailand 2025 | Packing List & Reviews</title>
        <meta name="description" content="The ultimate Thailand packing list. Find the best travel gear including backpacks, mosquito repellent, rain gear, and electronics for your Thailand adventure." />
        <meta name="keywords" content="Thailand travel gear, Thailand packing list, best backpack Thailand, mosquito repellent Thailand, travel essentials" />
        <link rel="canonical" href="https://go2-thailand.com/travel-gear/" />
      </Head>

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-thailand-blue to-thailand-gold text-white">
          <div className="container-custom py-16">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Essential Travel Gear for Thailand
              </h1>
              <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                Pack smart for your Thailand adventure with our tested gear recommendations
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">
                  🎒 Tried & Tested
                </div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">
                  🌴 Thailand Specific
                </div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">
                  💰 Best Value
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 💰 TOP AD PLACEMENT */}
        <section className="bg-white py-4">
          <div className="container-custom">
            <EzoicAd 
              placementId={135}
              size="banner"
              className="mx-auto"
              lazy={false}
            />
          </div>
        </section>

        {/* Breadcrumbs and Affiliate Notice */}
        <section className="bg-white">
          <div className="container-custom py-6">
            <Breadcrumbs items={breadcrumbs} />
            
            {/* Affiliate Notice */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg mt-4">
              <div className="px-4 py-3">
                <p className="text-sm text-center text-orange-800">
                  💡 This page contains affiliate links. As an Amazon Associate, we earn from qualifying purchases at no extra cost to you. 😊
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Essentials Section */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-8">Thailand Travel Essentials</h2>
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <div className="text-center">
                <div className="text-4xl mb-4">🦟</div>
                <h3 className="font-semibold mb-2">Mosquito Protection</h3>
                <p className="text-gray-600 text-sm">
                  DEET spray is essential, especially during rainy season
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">☀️</div>
                <h3 className="font-semibold mb-2">Sun Protection</h3>
                <p className="text-gray-600 text-sm">
                  High SPF sunscreen and a good hat are must-haves
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🌧️</div>
                <h3 className="font-semibold mb-2">Rain Gear</h3>
                <p className="text-gray-600 text-sm">
                  Lightweight rain jacket or poncho for sudden downpours
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🔌</div>
                <h3 className="font-semibold mb-2">Power Adapter</h3>
                <p className="text-gray-600 text-sm">
                  Thailand uses Type A, B, C plugs - universal adapter needed
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
                All Gear
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
                <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  {/* Essential Badge */}
                  {item.essential && (
                    <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 absolute top-4 right-4 rounded-full z-10">
                      ESSENTIAL
                    </div>
                  )}
                  
                  {/* Product Image */}
                  <div className="relative h-64 bg-gray-100">
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
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium">{item.rating}</span>
                        <span className="text-xs text-gray-500">({item.reviews})</span>
                      </div>
                    </div>
                    
                    {/* Product Name & Price */}
                    <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                    <p className="text-2xl font-bold text-thailand-blue mb-3">{item.price}</p>
                    
                    {/* Description */}
                    <p className="text-gray-700 mb-4 text-sm">{item.description}</p>
                    
                    {/* Features */}
                    <ul className="mb-4 space-y-1">
                      {item.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {/* CTA Button */}
                    <a 
                      href={item.amazonLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-orange-500 text-white text-center py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                    >
                      View on Amazon →
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* 💰 MID-CONTENT AD */}
            {filteredItems.length > 6 && (
              <div className="my-12">
                <EzoicAd 
                  placementId={136}
                  size="rectangle"
                  className="mx-auto"
                  lazy={true}
                />
              </div>
            )}
          </div>
        </section>

        {/* Packing Tips Section */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-8">Thailand Packing Tips</h2>
            <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <span className="text-2xl">🏝️</span>
                  Island Hopping Essentials
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Dry bag for boat trips</li>
                  <li>• Reef-safe sunscreen</li>
                  <li>• Quick-dry towel</li>
                  <li>• Waterproof phone case</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <span className="text-2xl">🏛️</span>
                  Temple Visit Requirements
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Sarong or long pants</li>
                  <li>• Shoulders-covering shirt</li>
                  <li>• Easy-remove shoes</li>
                  <li>• Small bag for shoes</li>
                </ul>
              </div>
              <div className="bg-yellow-50 rounded-lg p-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <span className="text-2xl">🌡️</span>
                  Hot Weather Hacks
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Cooling towel</li>
                  <li>• Electrolyte packets</li>
                  <li>• Breathable fabrics only</li>
                  <li>• Portable fan</li>
                </ul>
              </div>
              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <span className="text-2xl">🎒</span>
                  Backpacking Must-Haves
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Packing cubes</li>
                  <li>• Laundry detergent sheets</li>
                  <li>• Padlock for hostels</li>
                  <li>• First aid kit</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Amazon Associates Disclaimer */}
        <section className="py-8 bg-gray-100">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Affiliate Disclosure:</strong> As an Amazon Associate, I earn from qualifying purchases. 
                This means I may receive a commission at no extra cost to you when you purchase through links on this page. 🙏
              </p>
              <p className="text-xs text-gray-500">
                All gear recommendations are based on personal experience traveling in Thailand and extensive research. 
                Prices and availability are subject to change. 🎒✈️
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
    { id: 'backpacks', name: 'Backpacks', icon: '🎒', description: 'Travel backpacks and daypacks' },
    { id: 'health', name: 'Health & Safety', icon: '🏥', description: 'First aid, mosquito protection' },
    { id: 'electronics', name: 'Electronics', icon: '📱', description: 'Adapters, power banks, tech' },
    { id: 'clothing', name: 'Clothing', icon: '👕', description: 'Weather appropriate clothes' },
    { id: 'accessories', name: 'Accessories', icon: '🕶️', description: 'Travel accessories' }
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