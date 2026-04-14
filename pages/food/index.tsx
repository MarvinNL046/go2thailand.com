import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { getAllDishes } from '../../lib/food';
import Breadcrumbs from '../../components/Breadcrumbs';
import SEOHead from '../../components/SEOHead';
import EmailCapture from '../../components/EmailCapture';
import { useT } from '../../lib/i18n';
import { strings as i18nStrings } from '../../lib/i18n/food-index';

interface Dish {
  id: number;
  slug: string;
  name: { en: string; nl: string; thai: string; };
  category: string;
  region: string;
  spice_level: string;
  image: string;
  difficulty: string;
  preparation_time: string;
  price_range: string;
  ingredients: string[];
}

interface FoodIndexPageProps {
  dishes: Dish[];
  categories: string[];
}

export default function FoodIndexPage({ dishes, categories }: FoodIndexPageProps) {
  const t = useT(i18nStrings);
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const lang = isNl ? 'nl' : 'en';

  // Start with 12 dishes or all dishes if less than 12
  const initialLoad = Math.min(12, dishes.length);
  const [visibleDishes, setVisibleDishes] = useState(initialLoad);
  const [isLoading, setIsLoading] = useState(false);
  const dishesPerLoad = 12; // Load 12 more each time

  const handleShowMore = () => {
    setIsLoading(true);
    // Simulate loading delay for better UX
    setTimeout(() => {
      setVisibleDishes(prev => {
        // Ensure we're adding exactly dishesPerLoad or the remaining dishes
        const remaining = dishes.length - prev;
        const toAdd = Math.min(dishesPerLoad, remaining);
        return prev + toAdd;
      });
      setIsLoading(false);
    }, 300);
  };

  // Calculate how many dishes are left to show
  const remainingDishes = dishes.length - visibleDishes;

  const getSpiceLevelColor = (level: string) => {
    switch (level) {
      case 'mild': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hot': return 'bg-orange-100 text-orange-800';
      case 'very-hot': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'main-dish':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'soup':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'curry':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        );
      case 'salad':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
      case 'dessert':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
    }
  };

  const faqItems = isNl ? [
    {
      question: 'Wat is het populairste Thaise gerecht?',
      answer: 'Internationaal is pad thai het meest bekende Thaise gerecht — het staat op vrijwel elk Thais restaurantmenu wereldwijd. Maar in Thailand zelf is pad krapow (roergebakken basilicum met gehakt varken of kip over rijst, met een gebakken ei) het dagelijkse basisgerecht. Thais eten het bij straatkraampjes, food courts en kantinekantines vrijwel dagelijks voor de lunch. Het kost slechts 40-50 baht en is het dichtstbijzijnde nationaal comfortvoedsel. Andere gerechten die Thais vaker eten dan pad thai zijn som tam (papajasalade), khao man gai (kippenrijst) en diverse curry-over-rijst combinaties.',
    },
    {
      question: 'Is Thais eten heel pittig?',
      answer: 'Thais eten beslaat een breed spectrum van pittigheid en niet elk gerecht zet je mond in brand. Centraal-Thaise keuken (Bangkok) is gematigd gekruid met een balans van zoet, zuur en zout. Noord-Thaise gerechten zoals khao soi en sai oua zijn over het algemeen milder. Zuid-Thaise en Isaan keukens zijn het pittigst. Het goede nieuws is dat pittigheid bijna altijd aanpasbaar is. Zeg bij het bestellen "pet nit noi" (een beetje pittig) of "mai pet" (niet pittig).',
    },
    {
      question: 'Is straatvoedsel veilig in Thailand?',
      answer: 'Ja, straatvoedsel in Thailand is over het algemeen veilig voor toeristen. Bangkok is meerdere keren door CNN uitgeroepen tot beste straatvoedselstad ter wereld en miljoenen Thais eten dagelijks straatvoedsel zonder problemen. De sleutel is verstandig kraampjes kiezen: zoek verkopers met een gestage stroom lokale klanten, wat betekent dat er hoge omloop en verse ingrediënten zijn. Op bestelling gekookte gerechten zijn het veiligst. Vermijd vooraf bereide etenswaren die urenlang in de zon hebben gestaan.',
    },
    {
      question: 'Wat moet ik als eerste eten in Thailand?',
      answer: 'Begin voor je eerste Thaise maaltijd met iets benaderbaar en universeel geliefd. Pad thai is het klassieke startpunt — roergebakken rijstnoedels met ei, taugé en je keuze uit garnalen of kip, geserveerd met een limoenpartje en gehakte pinda\'s. Een ander uitstekend eerste gerecht is khao man gai (kippenrijst): gepocheerde kip op geurige rijst met een eenvoudige gember-chilisaus. Het is zacht voor de maag en kost rond 40-60 baht bij elk straatkraampje.',
    },
  ] : [
    {
      question: 'What is the most popular Thai food?',
      answer: 'Internationally, pad thai is the most recognized Thai dish — it appears on virtually every Thai restaurant menu worldwide. However, within Thailand itself, pad krapow (stir-fried basil with minced pork or chicken over rice, topped with a fried egg) is the everyday staple. Thais eat it at street stalls, food courts, and office canteens for lunch almost daily. It costs as little as 40-50 baht and is the closest thing to a national comfort food. Other dishes that Thais eat more frequently than pad thai include som tam (papaya salad), khao man gai (chicken rice), and various curry-over-rice combinations from neighborhood shops.',
    },
    {
      question: 'Is Thai food very spicy?',
      answer: 'Thai food spans a wide spectrum of heat levels, and not every dish will set your mouth on fire. Central Thai cuisine (Bangkok) tends to be moderately spiced with a balance of sweet, sour, and salty flavors. Northern Thai dishes like khao soi and sai oua are generally milder, with warm spices rather than sharp chili heat. Southern Thai and Isaan (northeastern) cuisines are the spiciest — dishes like gaeng tai pla and som tam can be genuinely fiery. The good news is that spice levels are almost always adjustable. When ordering, say "pet nit noi" (a little spicy) or "mai pet" (not spicy) to customize your meal. Many restaurants also serve condiment trays with chili flakes, vinegar with chilies, and fish sauce so you can adjust to taste.',
    },
    {
      question: 'Is street food safe in Thailand?',
      answer: 'Yes, street food in Thailand is generally safe for tourists. Bangkok has been named the best street food city in the world by CNN multiple times, and millions of Thais eat street food daily without issue. The key is choosing stalls wisely: look for vendors with a steady stream of local customers, which means high turnover and fresh ingredients. Cooked-to-order dishes are safest because the heat kills bacteria. Avoid pre-made food that has been sitting in the sun for hours, and be cautious with raw salads at less busy stalls. If a stall looks clean and the vendor handles money and food with different hands (or wears gloves), those are good signs. Start with cooked dishes like pad thai or grilled satay, and work your way up to more adventurous options as your stomach adjusts.',
    },
    {
      question: 'What should I eat first in Thailand?',
      answer: 'For your first Thai meal, start with something approachable and universally loved. Pad thai is the classic starting point — stir-fried rice noodles with egg, bean sprouts, and your choice of shrimp or chicken, served with a lime wedge and crushed peanuts. It is mild, savory, and familiar enough that most newcomers enjoy it immediately. Another excellent first dish is khao man gai (chicken rice): poached chicken on fragrant rice with a simple ginger-chili sauce. It is gentle on the stomach, costs around 40-60 baht at any street stall, and is almost impossible to dislike. Once you have settled in, branch out to tom yum goong (spicy prawn soup), som tam (papaya salad), and massaman curry — each one introduces a new dimension of Thai flavor.',
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

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isNl
      ? 'Thaise Keuken Gids: Must-Try Gerechten, Straatvoedsel & Regionale Keuken'
      : 'Thai Food Guide: Must-Try Dishes, Street Food & Regional Cuisine',
    description: isNl
      ? `Ontdek ${dishes.length} authentieke Thaise gerechten met straatvoedsel tips, regionale keuken en praktisch besteladvies. Je complete Thaise eetgids voor 2026.`
      : `Discover ${dishes.length} authentic Thai dishes with street food tips, regional cuisine breakdowns, and practical ordering advice. Your complete Thai food guide for 2026.`,
    author: {
      '@type': 'Organization',
      name: 'Go2Thailand',
      url: 'https://go2-thailand.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Go2Thailand',
      url: 'https://go2-thailand.com',
    },
    datePublished: '2025-06-15',
    dateModified: '2026-04-02',
  };

  return (
    <>
      <SEOHead
        title={isNl
          ? `Thaise Keuken Gids: Must-Try Gerechten, Straatvoedsel & Regionale Keuken | Go2Thailand`
          : `Thai Food Guide: Must-Try Dishes, Street Food & Regional Cuisine | Go2Thailand`}
        description={isNl
          ? `Ontdek ${dishes.length} authentieke Thaise gerechten met straatvoedsel tips, regionale keuken en praktisch besteladvies. Van pad thai tot khao soi — je complete Thaise eetgids.`
          : `Discover ${dishes.length} authentic Thai dishes with street food tips, regional cuisine breakdowns, and practical ordering advice. From pad thai to khao soi — your complete Thai food guide.`}
      >
        <meta name="keywords" content="thai food, best thai food, thai street food, thai cuisine, thai dishes, pad thai, som tam, tom yum, massaman curry, thai food guide, street food thailand" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Header */}
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={[
              { name: isNl ? 'Home' : 'Home', href: '/' },
              { name: isNl ? 'Thaise Keuken Gids' : 'Thai Food Guide', href: '/food' }
            ]} />
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-4">
                {isNl ? 'Thaise Keuken Gids: Must-Try Gerechten, Straatvoedsel & Regionale Keuken' : 'Thai Food Guide: Must-Try Dishes, Street Food & Regional Cuisine'}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {isNl
                  ? 'De Thaise keuken is een van de meest gevierde ter wereld — een meesterlijke balans van zoet, zuur, zout, bitter en pikant die eenvoudige ingrediënten transformeert in onvergetelijke maaltijden. Deze gids behandelt de essentiële gerechten, regionale stijlen, straatvoedselcultuur en praktische tips om goed te eten in heel Thailand.'
                  : 'Thai cuisine is one of the most celebrated in the world — a masterful balance of sweet, sour, salty, bitter, and spicy that transforms simple ingredients into unforgettable meals. This guide covers the essential dishes, regional styles, street food culture, and practical tips you need to eat well across Thailand.'}
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
                <li><a href="#essential-dishes" className="text-thailand-blue hover:underline">{isNl ? 'Essentiële Thaise Gerechten' : 'Essential Thai Dishes'}</a></li>
                <li><a href="#street-food" className="text-thailand-blue hover:underline">{isNl ? 'Thais Straatvoedsel Gids' : 'Thai Street Food Guide'}</a></li>
                <li><a href="#regional-cuisines" className="text-thailand-blue hover:underline">{isNl ? 'Regionale Thaise Keukens' : 'Regional Thai Cuisines'}</a></li>
                <li><a href="#cultural-guide" className="text-thailand-blue hover:underline">{isNl ? 'Culturele Gids' : 'Cultural Guide'}</a></li>
                <li><a href="#all-dishes" className="text-thailand-blue hover:underline">{isNl ? `Bekijk Alle ${dishes.length} Gerechten` : `Browse All ${dishes.length} Dishes`}</a></li>
                <li><a href="#food-faqs" className="text-thailand-blue hover:underline">{isNl ? 'Veelgestelde Vragen' : 'Food FAQs'}</a></li>
              </ul>
            </nav>

            {/* Intro paragraph */}
            <p className="text-gray-700 text-lg mb-10 leading-relaxed">
              Thailand&apos;s food culture runs deeper than any restaurant menu can capture. From the sizzling woks of Bangkok&apos;s Yaowarat district to the coconut-milk curries of the south and the sticky-rice traditions of the northeast, every region has its own culinary identity shaped by centuries of trade, geography, and cultural exchange. Whether you are a first-time visitor wondering what to order or a returning traveler looking to explore beyond the familiar, this guide will help you navigate Thailand&apos;s extraordinary food landscape with confidence. We cover the must-try dishes, the best cities for street food, regional differences you should know about, and practical tips for ordering — including the Thai phrases that make a real difference.
            </p>

            {/* ============================================ */}
            {/* SECTION 1: Essential Thai Dishes */}
            {/* ============================================ */}
            <section id="essential-dishes" className="mb-16">
              <div className="border-t-2 border-thailand-blue/20 pt-8 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900">{t("s001_essential_thai_dishes_every")}</h2>
                <p className="text-gray-600 mt-2">{t("s002_these_seven_dishes_represent")}</p>
              </div>

              {/* Dish 1: Pad Thai */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">1</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">{t("s003_pad_thai")}</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Pad thai is Thailand&apos;s most internationally famous dish, and for good reason. Thin rice noodles are stir-fried in a searingly hot wok with egg, tofu, dried shrimp, bean sprouts, and your choice of protein — usually shrimp, chicken, or pork. The sauce is a carefully balanced blend of tamarind paste, fish sauce, and palm sugar that gives pad thai its signature sweet-tangy flavor. A squeeze of fresh lime, a sprinkle of crushed peanuts, and a pinch of chili flakes complete the dish. The best pad thai is cooked over charcoal for a subtle smoky flavor the Thais call <em>wok hei</em>. Street food versions cost as little as 40-60 baht, while sit-down restaurants charge 120-200 baht. Bangkok&apos;s Thip Samai on Maha Chai Road has been serving what many consider the best pad thai in the country since 1966 — their signature version wrapped in a thin egg omelet is worth the queue.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>{isNl ? 'Prijs:' : 'Price:'}</strong> 40-80 baht ({isNl ? 'straatvoedsel' : 'street food'}) | 150-250 baht ({isNl ? 'restaurant' : 'restaurant'})</p>
                      <p><strong>{isNl ? 'Pittigheid:' : 'Spice level:'}</strong> {isNl ? 'Mild — pittigheid is aanpasbaar met kruiden' : 'Mild — heat is adjustable with condiments'}</p>
                      <p><strong>{isNl ? 'Best in:' : 'Best in:'}</strong> {t("s004_bangkok_thip_samai_yaowarat")}</p>
                    </div>
                    <p className="mt-3 text-sm">
                      <Link href="/food/pad-thai/" className="text-thailand-blue hover:underline font-semibold">{t("s005_full_pad_thai_guide")}</Link>
                      {' '}<span className="text-gray-400">|</span>{' '}
                      <Link href="/blog/pad-thai-street-food-vs-restaurant-homemade/" className="text-thailand-blue hover:underline font-semibold">{t("s006_street_food_vs_restaurant")}</Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Dish 2: Som Tam */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">2</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">{t("s007_som_tam_green_papaya")}</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Som tam is arguably the most eaten dish in Thailand — Thais consume it at every meal, from breakfast to late-night snacking. Shredded unripe papaya is pounded in a clay mortar with garlic, chilies, long beans, tomatoes, dried shrimp, peanuts, lime juice, fish sauce, and palm sugar. The result is an explosive combination of crunchy, spicy, sour, sweet, and salty in every bite. Originating from Isaan (northeastern Thailand), som tam has countless regional variations: som tam thai is the milder, tourist-friendly version with peanuts and dried shrimp; som tam poo adds salted black crab for a funky, intensely savory kick; and som tam pla ra includes fermented fish sauce that locals love but can challenge uninitiated palates. Street vendors across the country pound it fresh to order, typically for 40-60 baht. Watch them adjust the chilies — four or more is standard for Thais, but asking for one or two is perfectly fine.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>{isNl ? 'Prijs:' : 'Price:'}</strong> 40-60 baht ({isNl ? 'straatvoedsel' : 'street food'}) | 100-180 baht ({isNl ? 'restaurant' : 'restaurant'})</p>
                      <p><strong>{isNl ? 'Pittigheid:' : 'Spice level:'}</strong> {isNl ? 'Gemiddeld tot zeer pittig — altijd aanpasbaar' : 'Medium to very hot — always adjustable'}</p>
                      <p><strong>{isNl ? 'Best in:' : 'Best in:'}</strong> {t("s008_isaan_region_bangkok_any")}</p>
                    </div>
                    <p className="mt-3 text-sm">
                      <Link href="/food/som-tam/" className="text-thailand-blue hover:underline font-semibold">{t("s009_full_som_tam_guide")}</Link>
                      {' '}<span className="text-gray-400">|</span>{' '}
                      <Link href="/blog/som-tam-regional-variations-thailand/" className="text-thailand-blue hover:underline font-semibold">{t("s010_regional_som_tam_variations")}</Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Dish 3: Tom Yum Goong */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">3</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">{t("s011_tom_yum_goong_spicy")}</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Tom yum goong is the quintessential Thai soup — a fragrant, sour, spicy broth loaded with plump river prawns, mushrooms, and a holy trinity of Thai aromatics: lemongrass, galangal, and kaffir lime leaves. These ingredients are bruised and simmered to release their essential oils, then the broth is sharpened with fresh lime juice and fish sauce and ignited with bird&apos;s eye chilies. Two versions exist: tom yum nam sai (clear broth) and tom yum nam khon (creamy, with roasted chili paste and evaporated milk). The creamy version is richer and more popular in Bangkok restaurants. A steaming bowl of tom yum goong is the perfect remedy for a rainy evening or a mild cold — the galangal and lemongrass have genuine medicinal properties that Thai traditional medicine has recognized for centuries. Street food stalls serve it for 60-80 baht; restaurants charge 150-300 baht depending on the size of the prawns.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>{isNl ? 'Prijs:' : 'Price:'}</strong> 60-80 baht ({isNl ? 'straatvoedsel' : 'street food'}) | 150-300 baht ({isNl ? 'restaurant' : 'restaurant'})</p>
                      <p><strong>{isNl ? 'Pittigheid:' : 'Spice level:'}</strong> {isNl ? 'Gemiddeld tot pittig — vraag om "mai pet" voor mild' : 'Medium to hot — ask for "mai pet" for mild'}</p>
                      <p><strong>{isNl ? 'Best in:' : 'Best in:'}</strong> {t("s012_bangkok_pe_aor_on")}</p>
                    </div>
                    <p className="mt-3 text-sm">
                      <Link href="/food/tom-yum-goong/" className="text-thailand-blue hover:underline font-semibold">{t("s013_full_tom_yum_goong")}</Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Dish 4: Massaman Curry */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">4</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">{t("s014_massaman_curry")}</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Massaman curry is Thai cuisine&apos;s most globally acclaimed dish — CNN once named it the best food in the world. This rich, mild curry reflects centuries of cultural exchange with Muslim traders from India, Persia, and the Malay Peninsula. The curry paste combines dried spices rarely found in other Thai curries: cinnamon, cardamom, cloves, star anise, and cumin, along with lemongrass, galangal, and shallots. These are simmered in thick coconut milk with tender chunks of beef or chicken, potatoes, and roasted peanuts. The result is warming, slightly sweet, and deeply aromatic — closer to an Indian-style curry than anything else in Thai cooking, yet unmistakably Thai in its use of fish sauce, tamarind, and palm sugar. Massaman is one of the least spicy Thai curries, making it an excellent choice for travelers who are sensitive to heat. It is most commonly served over steamed jasmine rice.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>{isNl ? 'Prijs:' : 'Price:'}</strong> 50-70 baht ({isNl ? 'straatvoedsel/food court' : 'street food/food court'}) | 150-280 baht ({isNl ? 'restaurant' : 'restaurant'})</p>
                      <p><strong>{isNl ? 'Pittigheid:' : 'Spice level:'}</strong> {isNl ? 'Mild — een van de minst pittige Thaise curry\'s' : 'Mild — one of the least spicy Thai curries'}</p>
                      <p><strong>{isNl ? 'Best in:' : 'Best in:'}</strong> {t("s015_southern_thailand_phuket_krabi")}</p>
                    </div>
                    <p className="mt-3 text-sm">
                      <Link href="/food/massaman-curry/" className="text-thailand-blue hover:underline font-semibold">{t("s016_full_massaman_curry_guide")}</Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Dish 5: Mango Sticky Rice */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">5</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">{t("s017_mango_sticky_rice")}</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Mango sticky rice is Thailand&apos;s most beloved dessert, and once you try it, you will understand why. Warm glutinous rice is soaked in sweetened coconut cream until each grain is rich and fragrant, then served alongside slices of perfectly ripe nam dok mai mango — a golden, fiberless variety that is intensely sweet and creamy. A drizzle of additional coconut cream and a sprinkle of crispy mung beans or toasted sesame seeds finish the dish. The combination of warm, salty-sweet sticky rice against cool, juicy mango is simple genius. Peak mango season runs from April through June, when the fruit is at its sweetest and most abundant — prices drop and quality soars during these months. Outside of season, vendors still serve it year-round using different mango varieties, but the experience during peak season is unmatched. Street vendors sell portions for 60-100 baht; restaurants charge 120-200 baht.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>{isNl ? 'Prijs:' : 'Price:'}</strong> 60-100 baht ({isNl ? 'straatvoedsel' : 'street food'}) | 120-200 baht ({isNl ? 'restaurant' : 'restaurant'})</p>
                      <p><strong>{isNl ? 'Beste seizoen:' : 'Best season:'}</strong> April - June ({isNl ? 'piek mango seizoen' : 'peak mango season'})</p>
                      <p><strong>{isNl ? 'Best in:' : 'Best in:'}</strong> {isNl ? 'Overal verkrijgbaar, maar Bangkok\'s Yaowarat en nachtmarkten blinken uit' : 'Available everywhere, but Bangkok\'s Yaowarat and night markets excel'}</p>
                    </div>
                    <p className="mt-3 text-sm">
                      <Link href="/food/mango-sticky-rice/" className="text-thailand-blue hover:underline font-semibold">{t("s018_full_mango_sticky_rice")}</Link>
                      {' '}<span className="text-gray-400">|</span>{' '}
                      <Link href="/blog/mango-sticky-rice-season-thailand/" className="text-thailand-blue hover:underline font-semibold">{t("s019_when_is_mango_season")}</Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Dish 6: Pad Krapow */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">6</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">{t("s020_pad_krapow_moo_sap")}</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      If pad thai is Thailand&apos;s most famous dish abroad, pad krapow is the dish Thais actually eat every day. Minced pork (or chicken, beef, or seafood) is stir-fried with a heavy hand of garlic, fresh chilies, and holy basil — a peppery, slightly anise-flavored herb that is distinctly different from the sweet basil used in Western cooking. The dish is served over steamed jasmine rice and almost always topped with a crispy fried egg (kai dao) with lacy, golden edges. The combination of savory, spicy meat against the fragrant rice and rich egg yolk is deeply satisfying. It is the ultimate Thai comfort food — quick, cheap, and available at every food stall, food court, and canteen in the country. A plate costs 40-60 baht at street stalls and 80-150 baht in restaurants. Ordering it is simple: &quot;pad krapow moo sap kai dao&quot; means basil stir-fry with minced pork and a fried egg.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>{isNl ? 'Prijs:' : 'Price:'}</strong> 40-60 baht ({isNl ? 'straatvoedsel' : 'street food'}) | 80-150 baht ({isNl ? 'restaurant' : 'restaurant'})</p>
                      <p><strong>{isNl ? 'Pittigheid:' : 'Spice level:'}</strong> {isNl ? 'Gemiddeld tot pittig — heilige basilicum voegt zijn eigen peperige kick toe' : 'Medium to hot — holy basil adds its own peppery kick'}</p>
                      <p><strong>{isNl ? 'Tip:' : 'Tip:'}</strong> {isNl ? 'Voeg altijd "kai dao" (gebakken ei) toe — het maakt het gerecht' : 'Always add "kai dao" (fried egg) — it makes the dish'}</p>
                    </div>
                    <p className="mt-3 text-sm">
                      <Link href="/food/pad-krapow/" className="text-thailand-blue hover:underline font-semibold">{t("s021_full_pad_krapow_guide")}</Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Dish 7: Khao Soi */}
              <div className="mb-10">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-thailand-blue text-white flex items-center justify-center font-bold text-lg">7</span>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">{t("s022_khao_soi_northern_curry")}</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Khao soi is Chiang Mai&apos;s signature dish and one of the most compelling reasons to visit northern Thailand. This Burmese-influenced curry noodle soup combines tender egg noodles in a rich, mildly spiced coconut-curry broth with a chicken drumstick (or beef), topped with a tangle of crispy deep-fried noodles that add crunch to every spoonful. Served alongside are pickled mustard greens, shallots, and lime — each condiment adding a different dimension when stirred in. The curry paste uses dried spices like turmeric, coriander, and cumin alongside fresh ingredients, giving it warmth rather than sharp heat. Khao soi is most commonly found in Chiang Mai, Chiang Rai, and other northern provinces, though its popularity has spread to Bangkok in recent years. In Chiang Mai, legendary spots like Khao Soi Khun Yai serve bowls for 40-60 baht. The dish is so beloved in the north that entire food trails and competitions are dedicated to finding the city&apos;s best version.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                      <p><strong>{isNl ? 'Prijs:' : 'Price:'}</strong> 40-60 baht (Chiang Mai {isNl ? 'straatvoedsel' : 'street stalls'}) | 120-200 baht (Bangkok {isNl ? 'restaurants' : 'restaurants'})</p>
                      <p><strong>{isNl ? 'Pittigheid:' : 'Spice level:'}</strong> {isNl ? 'Mild tot gemiddeld — warme specerijen, geen vurige hitte' : 'Mild to medium — warm spices, not fiery heat'}</p>
                      <p><strong>{isNl ? 'Best in:' : 'Best in:'}</strong> {t("s023_chiang_mai_khao_soi")}</p>
                    </div>
                    <p className="mt-3 text-sm">
                      <Link href="/food/khao-soi/" className="text-thailand-blue hover:underline font-semibold">{t("s024_full_khao_soi_guide")}</Link>
                      {' '}<span className="text-gray-400">|</span>{' '}
                      <Link href="/blog/khao-soi-chiang-mai-guide/" className="text-thailand-blue hover:underline font-semibold">{t("s025_where_to_eat_khao")}</Link>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 2: Thai Street Food Guide */}
            {/* ============================================ */}
            <section id="street-food" className="mb-16">
              <div className="border-t-2 border-thailand-blue/20 pt-8 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900">{t("s026_thai_street_food_guide")}</h2>
                <p className="text-gray-600 mt-2">{t("s027_street_food_is_not")}</p>
              </div>

              <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">{t("s028_best_cities_for_street")}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong><Link href="/city/bangkok/" className="text-thailand-blue hover:underline">Bangkok</Link></strong> is the undisputed street food capital of the world. From the neon-lit food stalls of Yaowarat (Chinatown) to the sprawling Victory Monument boat noodle alley, the city offers an almost overwhelming variety of dishes at prices that rarely exceed 80 baht. The Lumpini area around Sala Daeng is a lunchtime favorite, with vendors serving pad krapow, som tam, and grilled pork neck to the office crowd. Food courts in malls like Terminal 21 and MBK Center offer the same street food quality in air-conditioned comfort for 50-80 baht per dish.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong><Link href="/city/chiang-mai/" className="text-thailand-blue hover:underline">{t("s029_chiang_mai")}</Link></strong> is the khao soi capital, but its food scene goes far beyond a single dish. The Sunday Walking Street market along Ratchadamnoen Road transforms the old city into a kilometer-long food festival every week. Sai oua (northern herb sausage), khao kha moo (braised pork leg over rice), and nam prik noom (roasted green chili dip with vegetables) are northern specialties you will find at every market stall. Warorot Market is the locals&apos; choice for everyday eating.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                {isNl
                  ? <><strong>Hat Yai</strong> in het diepe zuiden is de meest onderschatte foodstad van Thailand. De Zuid-Thaise-Maleisische fusiekeuken hier is anders dan alles wat je in Bangkok of op de eilanden vindt. Gai tod Hat Yai (Hat Yai gefrituurde kip met knapperige sjalotten), roti canai en vurige curry&apos;s gemaakt met kurkuma en verse zeevruchten bepalen de lokale eetcultuur. De nachtmarktscene is levendig en bijna volledig lokaal.</>
                  : <><strong>Hat Yai</strong> in the deep south is Thailand&apos;s most underrated food city. The southern Thai-Malay fusion cuisine here is unlike anything you will find in Bangkok or the islands. Gai tod Hat Yai (Hat Yai fried chicken with crispy shallots), roti canai, and fiery curries made with turmeric and fresh seafood define the local food culture. The night market scene is vibrant and almost entirely local.</>}
              </p>

              <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">{t("s030_famous_night_markets_worth")}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Night markets are the beating heart of Thai street food culture. Bangkok&apos;s <Link href="/blog/jodd-fairs-bangkok-night-market-guide/" className="text-thailand-blue hover:underline">{t("s031_jodd_fairs")}</Link> has become one of the most popular night markets in the city, with a curated mix of food stalls, craft vendors, and live music. The enormous <Link href="/blog/chatuchak-market-bangkok-guide/" className="text-thailand-blue hover:underline">{t("s032_chatuchak_weekend_market")}</Link> is legendary for both shopping and eating, with over 15,000 stalls spread across 35 acres. For a more local experience, look for <Link href="/blog/best-night-markets-bangkok-2026/" className="text-thailand-blue hover:underline">{t("s033_bangkok_apos_s_neighborhood")}</Link> where prices are lower and the crowds are mostly Thai.
              </p>

              <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">{t("s034_street_food_safety_tips")}</h3>
              <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-0.5">&#10003;</span>
                    <span><strong>{t("s035_follow_the_crowds")}</strong> {t("s036_a_long_line_of")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-0.5">&#10003;</span>
                    <span><strong>{t("s037_choose_cooked_to_order")}</strong> {t("s038_dishes_stir_fried_or")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold mt-0.5">&#10007;</span>
                    <span><strong>{t("s039_avoid_pre_made_food")}</strong> {t("s040_dishes_that_have_been")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-0.5">&#10003;</span>
                    <span><strong>{t("s041_ice_is_generally_safe")}</strong> {t("s042_most_ice_in_thailand")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-0.5">&#10003;</span>
                    <span><strong>{t("s043_start_mild_build_up")}</strong> {t("s044_give_your_stomach_a")}</span>
                  </li>
                </ul>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                For a deeper introduction, read our <Link href="/blog/bangkok-street-food-beginners/" className="text-thailand-blue hover:underline font-semibold">{t("s045_bangkok_street_food_guide")}</Link> and our guide to <Link href="/blog/eat-like-local-thailand-under-5-dollars/" className="text-thailand-blue hover:underline font-semibold">eating like a local for under $5 a day</Link>.
              </p>

              <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">{t("s046_how_to_order_in")}</h3>
              <div className="bg-gray-50 rounded-xl p-5 text-gray-700 space-y-2 mb-4">
                <p><strong>&quot;Ao nee&quot;</strong> (เอาอันนี้) — &quot;I want this one.&quot; Point at whatever looks good and say this. Works everywhere.</p>
                <p><strong>&quot;Pet nit noi&quot;</strong> (เผ็ดนิดหน่อย) — &quot;A little spicy.&quot; Most vendors will dial back the chilies for you.</p>
                <p><strong>&quot;Mai pet&quot;</strong> (ไม่เผ็ด) — &quot;Not spicy.&quot; Use this if you have zero heat tolerance.</p>
                <p><strong>&quot;Pet mak&quot;</strong> (เผ็ดมาก) — &quot;Very spicy.&quot; Use with caution — Thai &quot;very spicy&quot; is a different league.</p>
                <p><strong>&quot;Check bin&quot;</strong> (เช็คบิล) — &quot;Check please.&quot; Universal in restaurants; at street stalls you usually pay when you receive your food.</p>
                <p><strong>&quot;Aroy mak&quot;</strong> (อร่อยมาก) — &quot;Very delicious.&quot; Telling a vendor their food is great will make their day.</p>
              </div>
            </section>

            {/* Mid-article EmailCapture */}
            <EmailCapture
              heading="Get weekly Thai food recommendations"
              subtext="Insider tips on street food stalls, regional dishes, and hidden food markets — straight to your inbox."
            />

            {/* ============================================ */}
            {/* SECTION 3: Regional Thai Cuisines */}
            {/* ============================================ */}
            <section id="regional-cuisines" className="mb-16">
              <div className="border-t-2 border-thailand-blue/20 pt-8 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900">{t("s047_regional_thai_cuisines")}</h2>
                <p className="text-gray-600 mt-2">{t("s048_thailand_has_four_distinct")}</p>
              </div>

              {/* Central */}
              <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">{t("s049_central_thailand_bangkok")}</h3>
                <p className="text-gray-500 text-sm mb-3">{t("s050_mild_balanced_coconut_milk")}</p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Central Thai cuisine — centered on Bangkok and the surrounding plains — is what most of the world thinks of as &quot;Thai food.&quot; It is characterized by a careful balance of all five flavors, with coconut milk as a key ingredient in curries and soups. The royal court cuisine tradition of central Thailand emphasizes presentation and refinement. Dishes tend to be milder than southern or northeastern food, with sweetness from palm sugar and coconut cream balancing the heat. Jasmine rice is the staple grain, served alongside curries, stir-fries, and soups at every meal.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">
                  <strong>{t("s051_signature_dishes")}</strong>{' '}
                  <Link href="/food/pad-thai/" className="text-thailand-blue hover:underline">{t("s052_pad_thai")}</Link>,{' '}
                  <Link href="/food/tom-yum-goong/" className="text-thailand-blue hover:underline">{t("s053_tom_yum_goong")}</Link>,{' '}
                  <Link href="/food/green-curry/" className="text-thailand-blue hover:underline">{t("s054_green_curry")}</Link>,{' '}
                  <Link href="/food/pad-krapow/" className="text-thailand-blue hover:underline">{t("s055_pad_krapow")}</Link>,{' '}
                  <Link href="/food/mango-sticky-rice/" className="text-thailand-blue hover:underline">{t("s056_mango_sticky_rice")}</Link>
                </p>
              </div>

              {/* Northern */}
              <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">{t("s057_northern_thailand_chiang_mai")}</h3>
                <p className="text-gray-500 text-sm mb-3">{t("s058_burmese_amp_lanna_influence")}</p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Northern Thai (Lanna) cuisine is influenced by neighboring Myanmar and southern China. The food is generally milder than central or southern Thai cooking, favoring warm, earthy spices like turmeric, ginger, and dried spices over sharp chili heat. Sticky rice — eaten by hand in small clumps — is the staple grain rather than jasmine rice. Coconut milk is used less frequently than in central cuisine, and many dishes feature preserved and fermented ingredients. The cooler mountain climate supports herbs and vegetables that do not grow in the tropical south. Northern food is hearty and comforting, suited to the cooler evenings of Chiang Mai and the surrounding highlands.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">
                  <strong>{t("s051_signature_dishes")}</strong>{' '}
                  <Link href="/food/khao-soi/" className="text-thailand-blue hover:underline">{t("s060_khao_soi")}</Link>,{' '}
                  <Link href="/food/sai-ua/" className="text-thailand-blue hover:underline">{t("s061_sai_oua_herb_sausage")}</Link>,{' '}
                  <Link href="/food/nam-prik-ong/" className="text-thailand-blue hover:underline">{t("s062_nam_prik_ong")}</Link>,{' '}
                  <Link href="/food/gaeng-hang-lay/" className="text-thailand-blue hover:underline">{t("s063_gaeng_hang_lay")}</Link>,{' '}
                  <Link href="/food/nam-ngiao/" className="text-thailand-blue hover:underline">{t("s064_nam_ngiao")}</Link>
                </p>
              </div>

              {/* Southern */}
              <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">{t("s065_southern_thailand_phuket_krabi")}</h3>
                <p className="text-gray-500 text-sm mb-3">{t("s066_spiciest_region_turmeric_amp")}</p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Southern Thai cuisine is the boldest and spiciest in the country. The abundance of fresh seafood from both the Andaman Sea and Gulf of Thailand defines the coastal kitchen, while turmeric, black pepper, and large quantities of fresh chilies provide the distinctive yellow-orange color and intense heat. Malay and Muslim influences are strong in the deep south, visible in dishes like roti canai, biryani-style rice (khao mok gai), and massaman curry. Southern curries tend to be thinner and more intensely flavored than their central Thai counterparts, with less coconut cream sweetness and more shrimp paste funk. Fresh seafood — grilled fish, stir-fried crab, prawns in tamarind sauce — is plentiful, excellent, and remarkably affordable in coastal towns.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">
                  <strong>{t("s051_signature_dishes")}</strong>{' '}
                  <Link href="/food/massaman-curry/" className="text-thailand-blue hover:underline">{t("s068_massaman_curry")}</Link>,{' '}
                  <Link href="/food/gaeng-tai-pla/" className="text-thailand-blue hover:underline">{t("s069_gaeng_tai_pla")}</Link>,{' '}
                  <Link href="/food/roti-canai/" className="text-thailand-blue hover:underline">{t("s070_roti_canai")}</Link>,{' '}
                  <Link href="/food/gai-tod-hat-yai/" className="text-thailand-blue hover:underline">{t("s071_gai_tod_hat_yai")}</Link>,{' '}
                  <Link href="/food/khao-mok-gai/" className="text-thailand-blue hover:underline">{t("s072_khao_mok_gai")}</Link>
                </p>
              </div>

              {/* Isaan */}
              <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">{t("s073_isaan_northeast_thailand")}</h3>
                <p className="text-gray-500 text-sm mb-3">{t("s074_laotian_influence_fermented_fish")}</p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Isaan cuisine comes from Thailand&apos;s largest and poorest region, bordering Laos and Cambodia. Despite — or perhaps because of — its humble origins, Isaan food has become the most popular regional cuisine across all of Thailand. Bangkok&apos;s office workers eat som tam and gai yang (grilled chicken) for lunch daily, and every neighborhood in every Thai city has at least one Isaan food stall. The food is bold, punchy, and unapologetic: fermented fish sauce (pla ra), raw chilies, lime, and fresh herbs dominate. Sticky rice — rolled into balls and dipped into chili pastes, grilled meats, and salads — is the essential accompaniment. Grilled meats, especially gai yang (marinated grilled chicken) and moo ping (grilled pork skewers), are staples that pair perfectly with spicy salads and papaya dishes.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">
                  <strong>{t("s051_signature_dishes")}</strong>{' '}
                  <Link href="/food/som-tam/" className="text-thailand-blue hover:underline">Som Tam</Link>,{' '}
                  <Link href="/food/larb/" className="text-thailand-blue hover:underline">{t("s076_larb_minced_meat_salad")}</Link>,{' '}
                  <Link href="/food/laab-kua/" className="text-thailand-blue hover:underline">{t("s077_laab_kua")}</Link>,{' '}
                  <Link href="/food/khao-man-gai/" className="text-thailand-blue hover:underline">{t("s078_khao_man_gai")}</Link>,{' '}
                  <Link href="/food/tam-khanun/" className="text-thailand-blue hover:underline">{t("s079_tam_khanun")}</Link>
                </p>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 4: What Is Thai Food? Cultural Guide */}
            {/* ============================================ */}
            <section id="cultural-guide" className="mb-16">
              <div className="border-t-2 border-thailand-blue/20 pt-8 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900">{t("s080_what_is_thai_food")}</h2>
                <p className="text-gray-600 mt-2">{t("s081_understanding_how_thais_think")}</p>
              </div>

              <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">{t("s082_the_five_flavors")}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The foundation of Thai cooking is balance among five fundamental flavors: sweet, sour, salty, bitter, and spicy. No single flavor should dominate — instead, each dish aims for a harmony where the flavors play off one another. Palm sugar provides sweetness; lime juice and tamarind deliver sourness; fish sauce and shrimp paste bring saltiness; bitter melon and certain herbs add bitterness; and fresh chilies supply heat. This is why Thai food tastes so complex with seemingly simple ingredients. A good som tam balances all five flavors in a single mortar. A well-made green curry starts sweet and creamy before the chili heat arrives, followed by the fragrant lift of basil and kaffir lime. This balance-first philosophy is what separates Thai cuisine from other Southeast Asian traditions that may lean harder into one dominant flavor.
              </p>

              <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">{t("s083_thai_dining_etiquette")}</h3>
              <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-thailand-blue font-bold mt-0.5">&#8226;</span>
                    <span><strong>{t("s084_fork_and_spoon_not")}</strong> {t("s085_thais_eat_most_dishes")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-thailand-blue font-bold mt-0.5">&#8226;</span>
                    <span><strong>{t("s086_rice_is_the_center")}</strong> {t("s087_in_thai_the_phrase")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-thailand-blue font-bold mt-0.5">&#8226;</span>
                    <span><strong>{t("s088_shared_plates_communal_eating")}</strong> {t("s089_thai_meals_are_almost")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-thailand-blue font-bold mt-0.5">&#8226;</span>
                    <span><strong>{t("s090_condiment_trays")}</strong> {t("s091_nearly_every_thai_restaurant")}</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">{t("s092_vegetarian_and_vegan_in")}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Thailand is surprisingly accommodating for plant-based travelers once you know the right words. Look for restaurants flying a yellow flag with red Chinese characters — these are <strong>&quot;jay&quot; (เจ)</strong> restaurants, serving strict vegan food without meat, fish sauce, garlic, or onions. Jay food is rooted in Chinese-Buddhist tradition and is especially abundant during the annual Vegetarian Festival (October). The food is inexpensive and often very good, with mock meats made from soy and mushroom protein. For vegetarians who eat eggs and dairy, the term is <strong>&quot;mang sa wirat&quot; (มังสวิรัติ)</strong>. At regular restaurants and street stalls, you can request <strong>&quot;mai sai neua sat&quot;</strong> (no meat) or <strong>&quot;jay&quot;</strong> — but be aware that many Thai sauces contain fish sauce or shrimp paste by default. Dishes like pad thai, fried rice, and stir-fried morning glory can usually be made vegetarian on request. Our guide to <Link href="/blog/is-thai-food-healthy/" className="text-thailand-blue hover:underline">whether Thai food is healthy</Link> covers nutrition and dietary considerations in more detail.
              </p>
            </section>
          </div>
        </section>

        {/* Category Navigation */}
        <section className="bg-white py-8">
          <div className="container-custom">
            <p className="section-label font-script text-thailand-gold text-center">{isNl ? 'Categorieën' : 'Categories'}</p>
            <h2 className="text-2xl font-heading font-bold text-center mb-6">{isNl ? 'Bekijk per Categorie' : 'Browse by Category'}</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Link href="/food/category/main-dish/" className="group">
                <div className="bg-surface-cream p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all text-center">
                  <div className="text-4xl mb-2"></div>
                  <h3 className="font-heading font-semibold text-gray-900 group-hover:text-thailand-red">{isNl ? 'Hoofdgerechten' : 'Main Dishes'}</h3>
                  <p className="text-sm text-gray-600">{dishes.filter(d => d.category === 'main-dish').length} {isNl ? 'recepten' : 'recipes'}</p>
                </div>
              </Link>
              <Link href="/food/category/soup/" className="group">
                <div className="bg-surface-cream p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all text-center">
                  <div className="text-4xl mb-2"></div>
                  <h3 className="font-heading font-semibold text-gray-900 group-hover:text-thailand-blue">{isNl ? 'Soepen' : 'Soups'}</h3>
                  <p className="text-sm text-gray-600">{dishes.filter(d => d.category === 'soup').length} {isNl ? 'recepten' : 'recipes'}</p>
                </div>
              </Link>
              <Link href="/food/category/curry/" className="group">
                <div className="bg-surface-cream p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all text-center">
                  <div className="text-4xl mb-2"></div>
                  <h3 className="font-heading font-semibold text-gray-900 group-hover:text-thailand-red">{isNl ? "Curry's" : 'Curries'}</h3>
                  <p className="text-sm text-gray-600">{dishes.filter(d => d.category === 'curry').length} {isNl ? 'recepten' : 'recipes'}</p>
                </div>
              </Link>
              <Link href="/food/category/salad/" className="group">
                <div className="bg-surface-cream p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all text-center">
                  <div className="text-4xl mb-2"></div>
                  <h3 className="font-heading font-semibold text-gray-900 group-hover:text-thailand-blue">{isNl ? 'Salades' : 'Salads'}</h3>
                  <p className="text-sm text-gray-600">{dishes.filter(d => d.category === 'salad').length} {isNl ? 'recepten' : 'recipes'}</p>
                </div>
              </Link>
              <Link href="/food/category/dessert/" className="group">
                <div className="bg-surface-cream p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all text-center">
                  <div className="text-4xl mb-2"></div>
                  <h3 className="font-heading font-semibold text-gray-900 group-hover:text-thailand-red">{isNl ? 'Desserts' : 'Desserts'}</h3>
                  <p className="text-sm text-gray-600">{dishes.filter(d => d.category === 'dessert').length} {isNl ? 'recepten' : 'recipes'}</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Dishes Grid */}
        <section id="all-dishes" className="section-padding">
          <div className="container-custom">
            <p className="section-label font-script text-thailand-gold text-center">{isNl ? 'Ontdek' : 'Discover'}</p>
            <h2 className="text-3xl font-heading font-bold text-center mb-8">{isNl ? `Alle ${dishes.length} Thaise Gerechten` : `All ${dishes.length} Thai Dishes`}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dishes.slice(0, visibleDishes).map((dish) => (
                <Link key={dish.id} href={`/food/${dish.slug}`} className="group">
                  <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image
                        src={dish.image}
                        alt={dish.name[lang] || dish.name.en}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
                      <div className="absolute top-3 left-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSpiceLevelColor(dish.spice_level)}`}>
                          {dish.spice_level === 'none' ? (isNl ? 'Niet Pittig' : 'Not Spicy') : dish.spice_level}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="bg-white bg-opacity-90 text-thailand-blue px-2 py-1 rounded-full text-xs font-medium">
                          {dish.preparation_time}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <div className="flex items-center text-thailand-blue">
                          {getCategoryIcon(dish.category)}
                          <span className="ml-2 text-sm font-medium capitalize">
                            {dish.category.replace('-', ' ')}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-xl font-heading font-bold text-gray-900 mb-2 group-hover:text-thailand-blue transition-colors">
                        {dish.name[lang] || dish.name.en}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {dish.name.thai}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span>{dish.preparation_time}</span>
                        <span>{dish.region}</span>
                        <span>{dish.price_range}</span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {dish.ingredients.slice(0, 3).map((ingredient, index) => (
                          <span key={index} className="bg-surface-cream text-gray-600 px-2 py-1 rounded-full text-xs">
                            {ingredient}
                          </span>
                        ))}
                        {dish.ingredients.length > 3 && (
                          <span className="bg-surface-cream text-gray-600 px-2 py-1 rounded-full text-xs">
                            +{dish.ingredients.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>


            {/* Show More Button */}
            {visibleDishes < dishes.length && (
              <div className="text-center mt-12">
                <button
                  onClick={handleShowMore}
                  disabled={isLoading}
                  className="bg-thailand-blue text-white px-8 py-3 rounded-xl font-semibold hover:bg-thailand-red transition-all duration-300 shadow-md hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Loading...
                    </span>
                  ) : (
                    isNl ? `Meer Gerechten Tonen (${remainingDishes} resterend)` : `Show More Dishes (${remainingDishes} remaining)`
                  )}
                </button>
              </div>
            )}

            {/* Show message when all dishes are displayed */}
            {visibleDishes >= dishes.length && (
              <div className="text-center mt-12 p-6 bg-white rounded-2xl">
                <p className="text-gray-600 mb-4">
                  {isNl
                    ? `Je hebt het einde bereikt! Dat zijn alle ${dishes.length} Thaise gerechten die we hebben.`
                    : `You've reached the end! That's all ${dishes.length} Thai dishes we have.`}
                </p>
                <Link
                  href="/food/category/"
                  className="text-thailand-blue hover:text-thailand-red font-semibold underline"
                >
                  {isNl ? 'Bekijk per Categorie →' : 'Browse by Category →'}
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Explore by Region */}
        <section className="bg-white section-padding">
          <div className="container-custom">
            <div className="text-center mb-8">
              <p className="section-label font-script text-thailand-gold">{isNl ? 'Per Regio' : 'By Region'}</p>
              <h2 className="text-3xl font-heading font-bold text-gray-900">{isNl ? 'Ontdek Thais Eten per Regio' : 'Explore Thai Food by Region'}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { slug: 'northern', name: 'Northern Thailand', desc: 'Mountain herbs, mild flavors, sticky rice' },
                { slug: 'central', name: 'Central Thailand', desc: 'Royal cuisine, balanced flavors, coconut milk' },
                { slug: 'southern', name: 'Southern Thailand', desc: 'Bold spices, seafood, turmeric' },
                { slug: 'isaan', name: 'Isaan (Northeast)', desc: 'Fermented fish, grilled meats, spicy salads' },
              ].map(region => (
                <Link key={region.slug} href={`/region/${region.slug}/`} className="bg-surface-cream rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-heading font-bold text-gray-900 mb-1">{region.name}</h3>
                  <p className="text-gray-600 text-sm">{region.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="food-faqs" className="section-padding">
          <div className="container-custom max-w-4xl">
            <div className="border-t-2 border-thailand-blue/20 pt-8 mb-8">
              <h2 className="text-3xl font-bold font-heading text-gray-900">{t("s093_food_faqs")}</h2>
              <p className="text-gray-600 mt-2">{t("s094_answers_to_the_most")}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="space-y-6">
                {faqItems.map((item) => (
                  <div key={item.question}>
                    <h3 className="font-bold font-heading text-gray-900 mb-2 text-lg">{item.question}</h3>
                    <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                    {item.question === 'What is the most popular Thai food?' && (
                      <p className="mt-2 text-sm">
                        <Link href="/food/pad-krapow/" className="text-thailand-blue hover:underline font-semibold">{t("s095_read_our_pad_krapow")}</Link>
                        {' '}<span className="text-gray-400">|</span>{' '}
                        <Link href="/food/pad-thai/" className="text-thailand-blue hover:underline font-semibold">{t("s096_read_our_pad_thai")}</Link>
                      </p>
                    )}
                    {item.question === 'Is street food safe in Thailand?' && (
                      <p className="mt-2 text-sm">
                        <Link href="/blog/bangkok-street-food-beginners/" className="text-thailand-blue hover:underline font-semibold">{t("s097_bangkok_street_food_guide")}</Link>
                        {' '}<span className="text-gray-400">|</span>{' '}
                        <Link href="/blog/bangkok-lumpini-hawker-centre-street-food-2026/" className="text-thailand-blue hover:underline font-semibold">{t("s098_lumpini_hawker_centre_guide")}</Link>
                      </p>
                    )}
                    {item.question === 'What should I eat first in Thailand?' && (
                      <p className="mt-2 text-sm">
                        <Link href="/blog/eat-like-local-thailand-under-5-dollars/" className="text-thailand-blue hover:underline font-semibold">{t("s099_eat_like_a_local")}</Link>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Drinks Cross-Link */}
        <section className="section-padding">
          <div className="container-custom text-center">
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-3">{isNl ? 'Maak Je Thaise Maaltijd Compleet' : 'Complete Your Thai Meal'}</h2>
            <p className="text-gray-600 mb-6">{isNl ? 'Ontdek traditionele Thaise dranken om te combineren met je favoriete gerechten.' : 'Discover traditional Thai drinks and beverages to pair with your favorite dishes.'}</p>
            <Link href="/drinks/" className="inline-flex items-center gap-2 bg-thailand-blue text-white px-6 py-3 rounded-xl font-semibold hover:bg-thailand-blue/90 transition-colors">
              {isNl ? 'Ontdek Thaise Dranken' : 'Explore Thai Drinks'}
            </Link>
          </div>
        </section>

        {/* Cooking Classes Cross-Link */}
        <section className="bg-white section-padding">
          <div className="container-custom text-center">
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-3">{isNl ? 'Leer Thais Koken' : 'Learn to Cook Thai Food'}</h2>
            <p className="text-gray-600 mb-6">{isNl ? 'Volg een hands-on kookles en leer deze gerechten thuis na te maken. Bangkok en Chiang Mai hebben de beste opties.' : 'Take a hands-on cooking class and learn to recreate these dishes at home. Bangkok and Chiang Mai have the best options.'}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/best-cooking-classes-in-thailand/" className="inline-flex items-center gap-2 bg-thailand-red text-white px-6 py-3 rounded-xl font-semibold hover:bg-thailand-red-600 transition-colors">
                Compare Cooking Classes Across Thailand
              </Link>
              <Link href="/blog/best-cooking-classes-bangkok-market-tour-2026/" className="inline-flex items-center gap-2 bg-surface-cream text-gray-900 px-6 py-3 rounded-xl font-semibold hover:shadow-md transition-all">
                Bangkok Cooking Classes &amp; Market Tours
              </Link>
            </div>
          </div>
        </section>

        {/* Email Capture */}
        <section className="section-padding">
          <div className="container-custom max-w-4xl">
            <EmailCapture heading="Want more Thai food tips?" subtext="Get our weekly newsletter with hidden food gems, street food guides, and regional cuisine deep dives across Thailand." />
          </div>
        </section>

        {/* Cross-links to other pillar pages */}
        <section className="section-padding bg-white">
          <div className="container-custom max-w-4xl">
            <h2 className="text-xl font-bold font-heading text-gray-900 mb-4">{isNl ? 'Ontdek Meer Thailand Gidsen' : 'Explore More Thailand Guides'}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Link href="/thailand-travel-guide/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                <div className="font-semibold text-gray-900 text-sm">{t("s100_travel_guide")}</div>
                <div className="text-xs text-gray-600">{t("s101_everything_you_need")}</div>
              </Link>
              <Link href="/best-places-to-visit-thailand/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                <div className="font-semibold text-gray-900 text-sm">{t("s102_best_places")}</div>
                <div className="text-xs text-gray-600">33 destinations</div>
              </Link>
              <Link href="/things-to-do-in-thailand/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                <div className="font-semibold text-gray-900 text-sm">{t("s103_things_to_do")}</div>
                <div className="text-xs text-gray-600">25 top activities</div>
              </Link>
              <Link href="/thailand-for-first-timers/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                <div className="font-semibold text-gray-900 text-sm">{t("s104_first_timers")}</div>
                <div className="text-xs text-gray-600">{t("s105_start_here")}</div>
              </Link>
              <Link href="/thailand-itinerary/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                <div className="font-semibold text-gray-900 text-sm">Itineraries</div>
                <div className="text-xs text-gray-600">{t("s106_ready_made_routes")}</div>
              </Link>
              <Link href="/islands/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                <div className="font-semibold text-gray-900 text-sm">{t("s107_thai_islands")}</div>
                <div className="text-xs text-gray-600">{t("s108_beach_paradise")}</div>
              </Link>
              <Link href="/is-thailand-safe/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                <div className="font-semibold text-gray-900 text-sm">{t("s109_safety_guide")}</div>
                <div className="text-xs text-gray-600">{t("s110_stay_safe")}</div>
              </Link>
              <Link href="/transport/" className="p-4 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
                <div className="font-semibold text-gray-900 text-sm">Transport</div>
                <div className="text-xs text-gray-600">{t("s111_buses_trains_flights")}</div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-surface-dark text-white section-padding">
          <div className="container-custom text-center">
            <p className="font-script text-thailand-gold mb-2">{isNl ? 'Ontdek Meer' : 'Explore More'}</p>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-6">
              {isNl ? 'Klaar om Thailand te Ontdekken?' : 'Ready to Explore Thailand?'}
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              {isNl ? 'Ontdek de steden waar deze geweldige gerechten vandaan komen' : 'Discover the cities where these amazing dishes come from'}
            </p>
            <Link href="/city/" className="bg-white text-thailand-blue px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              {isNl ? 'Ontdek Thaise Steden' : 'Explore Thai Cities'}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const dishes = getAllDishes();
  const categorySet = new Set(dishes.map(dish => dish.category));
  const categories = Array.from(categorySet);

  return {
    props: {
      dishes,
      categories
    }
  };
};
