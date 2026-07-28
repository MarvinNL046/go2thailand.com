import { ChefHat, Flame, Leaf, MapPin, ShoppingBasket, Sparkles, UtensilsCrossed } from 'lucide-react';
import { KLOOK_GENERIC, withSubId } from '../../lib/affiliates';
import { DishEditorialTemplate, type DishEditorialData } from './DishEditorialTemplate';

const data: DishEditorialData = {
  title: 'Khao Soi Chiang Mai: What It Is, Ingredients & How to Eat It',
  description: 'Understand Chiang Mai khao soi before ordering it: taste, noodles, curry broth, toppings, heat, vegetarian and allergen checks, how to eat it and genuine UK search questions.',
  canonical: 'https://go2-thailand.com/blog/khao-soi-chiang-mai-guide/',
  updatedAt: '28 July 2026',
  name: 'Khao Soi Chiang Mai',
  thaiName: 'ข้าวซอย',
  heroImage: '/images/redesign/khao-soi-chiang-mai-hero.webp',
  heroAlt: 'Chiang Mai khao soi with soft egg noodles, crisp fried noodles, chicken and lime, shallot, pickled greens and chilli condiments',
  heroEyebrow: 'Northern curry, two noodle textures',
  lead: 'Chiang Mai-style khao soi brings soft wheat egg noodles and crisp fried noodles into one fragrant coconut-curry bowl, commonly with chicken or beef. Lime, pickled mustard greens, shallot and chilli are not decoration: they let you tune richness, acidity, salt and heat at the table.',
  quickFacts: [
    { label: 'Thai name', value: 'Khao soi', icon: UtensilsCrossed },
    { label: 'Typical profile', value: 'Fragrant · rich · savoury · tangy', icon: Sparkles },
    { label: 'Heat', value: 'Variable; chilli can be separate', icon: Flame },
    { label: 'Where', value: 'Chiang Mai and northern Thailand', icon: MapPin },
  ],
  navItems: [
    { href: '#taste', label: 'Taste', icon: Sparkles },
    { href: '#ingredients', label: 'Ingredients', icon: ShoppingBasket },
    { href: '#choose', label: 'Choose', icon: UtensilsCrossed },
    { href: '#order', label: 'Eat', icon: MapPin },
    { href: '#cook', label: 'Cook', icon: ChefHat },
    { href: '#questions', label: 'Questions', icon: Leaf },
  ],
  taste: {
    intro: 'A familiar Chiang Mai bowl is aromatic and savoury, with coconut richness rather than dessert-like sweetness. Lime and pickled greens cut through the broth; fried noodles contrast with the soft noodles below.',
    texture: 'Soft, slippery egg noodles sit in the curry broth while a dry, crisp nest stays above it. The topping gradually softens, so the texture changes as you eat.',
    finish: 'Warm spice, coconut and savoury stock linger. Shallot, pickle, lime and chilli can make the same bowl sharper, hotter or more fermented from one mouthful to the next.',
    scores: [{ label: 'Aromatic', value: 5 }, { label: 'Rich', value: 4 }, { label: 'Tangy', value: 3 }, { label: 'Hot', value: 3 }],
  },
  ingredients: [
    { name: 'Wheat egg noodles', role: 'A soft portion sits in the broth; another portion is commonly fried for the crisp crown. Rice-noodle regional relatives also exist.' },
    { name: 'Coconut milk', role: 'Adds body and richness to the familiar Chiang Mai-style broth, but concentration and amount differ between cooks.' },
    { name: 'Curry paste', role: 'Often brings dried chilli, shallot, ginger, turmeric and spices; a house or commercial paste can change heat and hidden ingredients.' },
    { name: 'Stock and seasoning', role: 'Build savoury depth. Meat stock, fish sauce, soy sauce, sugar or other seasoning may appear and require a vendor-level check.' },
    { name: 'Chicken or beef', role: 'Familiar protein choices with historical Chinese-Muslim associations, but neither choice alone proves halal preparation.' },
    { name: 'Crisp noodles', role: 'A fried noodle portion supplies height and crunch. It starts crisp and softens where it touches the hot broth.' },
    { name: 'Pickled mustard greens', role: 'Bring salty acidity and fermentation. Recipes and service portions vary, and they are often served at the side.' },
    { name: 'Lime, shallot and chilli', role: 'Table controls for brightness, fresh bite and heat. Taste the broth before changing all three.' },
  ],
  allergenCopy: 'Common egg noodles contain wheat and egg. Curry paste, broth and seasoning may include fish, shrimp, soy or other allergens, while coconut and shared fryers or utensils can also matter. Ask about the complete paste, stock, noodles, fried topping and kitchen process; removing a visible garnish is not enough.',
  vegetarianCopy: 'Khao soi is not vegetarian or vegan by default. A vegetable or tofu label may still sit on meat stock, fish sauce, shrimp-containing paste or egg noodles. Confirm the broth, paste, seasoning, noodle recipe, fried topping and shared preparation before ordering.',
  formats: [
    { title: 'Specialist shop', bestFor: 'A focused bowl, steady noodle turnover and a clear choice of protein or broth style.', tradeOff: 'A queue or famous name does not prove dietary controls, current hours or the best bowl for your taste.' },
    { title: 'Market or food court', bestFor: 'A quick comparison of visible toppings, portion size and neighbouring northern dishes.', tradeOff: 'Ask whether paste, broth and fried noodles are shared and check the current stall schedule.' },
    { title: 'Northern restaurant', bestFor: 'Placing khao soi beside sai ua, nam phrik and other Lanna dishes at a shared table.', tradeOff: 'A broader menu may mean slower noodle turnover; modern or regional interpretations are normal.' },
  ],
  orderSteps: [
    { title: 'Choose the bowl', text: 'Ask which protein or meat-free version is available, then confirm broth, paste and noodles if halal, vegetarian, vegan or allergen boundaries matter.' },
    { title: 'Taste before tuning', text: 'Try broth and both noodle textures first. Add lime, pickle, shallot and chilli gradually instead of burying the cook’s balance in one move.' },
    { title: 'Mix in stages', text: 'Pull soft noodles through the broth while keeping part of the fried topping dry. Let the rest soften naturally so one bowl gives several textures.' },
  ],
  cooking: {
    title: 'Paste. Simmer. Fry. Boil. Build.',
    intro: 'Khao soi works as parallel preparation rather than one-pot assembly: curry paste and broth develop together, protein cooks safely, one noodle portion is fried, another is boiled, and fresh condiments wait until service.',
    steps: ['Use a tested recipe to make or select a paste and identify every allergen.', 'Bloom the paste and build the coconut-curry broth without scorching the spices.', 'Cook the chosen protein safely in the broth or prepare a genuinely separate meat-free base.', 'Fry a dry noodle portion until crisp, then drain it carefully.', 'Boil the soft egg noodles according to their actual thickness and brand.', 'Assemble immediately with hot broth, crisp noodles and separate lime, shallot, pickle and chilli.'],
    boundary: 'Paste strength, noodle thickness, coconut concentration, protein cut and stove all change timing. Follow a tested recipe for exact quantities, frying temperature, safe internal temperature, cooling and storage. This guide preserves the technique and decision logic without inventing measurements.',
  },
  affiliates: [
    { href: '/go/simple-thai-food-cookbook/', title: 'Simple Thai Food', text: 'A broad Thai cooking reference can place curry paste, noodles and regional balance in context. Compare the current edition, format, seller and delivery details.' },
    { href: '/go/thai-granite-mortar-eight-inch/', title: 'Eight-inch granite mortar', text: 'A stable mortar can grind aromatics and toasted spices for curry paste. Check current weight, usable interior, care instructions and worktop protection before buying.' },
  ],
  classHref: withSubId(KLOOK_GENERIC, 'en-khao-soi-chiang-mai-cooking-class'),
  classCopy: 'A suitable Chiang Mai class can connect market ingredients, paste texture, broth balance and the two noodle preparations. Klook results are broad: confirm that khao soi is on the current menu, whether each guest cooks it and how dietary requests are handled.',
  classSignals: [
    { title: 'Paste structure', text: 'See which aromatics and spices enter the paste and when they are ground.' },
    { title: 'Two noodles', text: 'Learn why one portion boils while another becomes the crisp topping.' },
    { title: 'Table balance', text: 'Use lime, pickle, shallot and chilli as controls rather than compulsory decoration.' },
  ],
  faqs: [
    { question: 'What is Chiang Mai khao soi?', answer: 'It is a northern Thai curry noodle soup strongly associated with Chiang Mai. A familiar version combines soft wheat egg noodles, coconut-curry broth, chicken or beef, crisp fried noodles and side condiments such as lime, shallot, pickled mustard greens and chilli.' },
    { question: 'What is khao soi made of?', answer: 'Recipes vary, but familiar signals include wheat egg noodles, coconut milk, curry paste, stock, seasoning, chicken or beef, fried noodles and condiments. Paste can include dried chilli, turmeric, ginger, shallot, coriander and black cardamom. Ask about the actual shop recipe when ingredients matter.' },
    { question: 'What does khao soi taste like?', answer: 'Expect fragrant curry spice, savoury broth, coconut richness and changing acidity and heat from the condiments. Soft noodles and a crisp fried topping create the defining texture contrast. It should not be reduced to one fixed sweetness or spice score.' },
    { question: 'Is khao soi a curry or a soup?', answer: 'Both descriptions are useful: it is a noodle soup served in a curry-style broth. In English, “northern Thai curry noodle soup” communicates the bowl more clearly than forcing it into only one category.' },
    { question: 'Is khao soi very spicy?', answer: 'It can be mild-to-hot by personal standards, but the base paste usually contains chilli and varies by cook. Extra chilli may be served separately. Ask about the base before ordering and add table chilli only after tasting.' },
    { question: 'What noodles are used for khao soi?', answer: 'The familiar Chiang Mai version uses wheat-based egg noodles: soft boiled noodles in the broth and a fried portion on top. Wider regional dishes with the same or similar name can use different noodles, so the Chiang Mai context matters.' },
    { question: 'What are the crunchy noodles on top of khao soi?', answer: 'They are typically a fried portion of wheat egg noodles. They begin dry and crisp, then soften where they touch the broth. Ask about the fryer and noodle ingredients if wheat, egg or cross-contact matters.' },
    { question: 'Can khao soi be vegetarian or vegan?', answer: 'A dedicated version can be made, but it is not the default. Confirm meat-free broth, curry paste without fish or shrimp, vegan seasoning, egg-free noodles if needed, the fried topping and shared tools or oil.' },
    { question: 'Is khao soi Thai or Burmese food?', answer: 'Chiang Mai-style khao soi is established northern Thai food, while its history is linked to regional movement among Yunnan, Myanmar and northern Thailand and to Chin Haw or Chinese-Muslim traders. Related dishes differ, and no single inventor or uncontested origin story is established.' },
    { question: 'What is khao soi normally served with?', answer: 'Lime, sliced shallot, pickled mustard greens and chilli oil or fried chilli are familiar side condiments. Add them gradually. Some shops provide other garnishes, and the quantity or recipe is not universal.' },
  ],
  related: [
    { title: 'Chiang Mai guide', description: 'Choose a neighbourhood, build a realistic day and connect temples, markets and northern food.', href: '/city/chiang-mai/', image: '/images/cities/chiang-mai/redesign/chiang-mai-destination-hero.webp' },
    { title: 'Thai curry guide', description: 'Compare green, red, yellow, Panang and Massaman by flavour and ordering decisions.', href: '/blog/thai-curry-guide-green-red-yellow-massaman-panang/', image: '/images/redesign/thai-curry-guide-hero.webp' },
    { title: 'Chiang Mai cooking classes', description: 'Compare menu, market visit, hands-on time and dietary support before booking.', href: '/blog/thai-cooking-classes-chiang-mai/', image: '/images/redesign/thai-curry-paste.webp' },
  ],
  sources: [
    { title: 'Discover Thai Cuisine through its famous four regions', creator: 'Tourism Authority of Thailand', url: 'https://www.tatnews.org/2018/01/discover-thai-cuisine-famous-four-regions/', note: 'Full DFS parse used for Lanna context, coconut curry, chicken and soft-versus-crisp noodle structure.' },
    { title: 'Much-loved, must-eat dishes from different regions of Thailand', creator: 'Tourism Authority of Thailand', url: 'https://www.tatnews.org/2020/01/much-loved-must-eat-dishes-from-different-regions-of-thailand/', note: 'Full DFS parse used for Chiang Mai association, egg noodles and familiar chicken or beef choices.' },
    { title: 'Khao Soi: Northern Thai Curry Noodle Soup', creator: 'Hot Thai Kitchen', url: 'https://hot-thai-kitchen.com/kao-soi/', note: 'Full DFS parse used for noodle identity, paste and broth technique, condiments, variants and preparation sequence.' },
    { title: 'Chiang Mai: A Gastronomy Journey of Thailand', creator: 'Michelin Guide', url: 'https://guide.michelin.com/th/en/article/features/chiang-mai-a-gastronomy-journey-of-thailand-ep-1-kong-kin-kon-mueang', note: 'Current editorial corroboration used for Lanna status, Chin Haw context, aromatic ingredients and toppings; the direct DFS body parse was unavailable.' },
  ],
  methodDescription: 'Updated 28 July 2026 after a 69-record DataForSEO cluster with 50 competitor domains, ten current UK-English SERPs with 77 organic results, 57 People Also Ask appearances and 44 unique genuine questions, three usable full source parses, current Michelin discovery captures, plus exact ranking and backlink checks for both candidate owners. Five ranking variants remain on this canonical guide. The overlapping English dish URL returned no rankings or reportable backlink signal and consolidates here; Dutch remains independent. Celebrity, near-me, delivery, frozen best-restaurant, fixed-price, fixed-nutrition, universal-spice, automatic-halal, automatic-vegan, exact-inventor and unsupported first-hand claims were excluded.',
};

export function KhaoSoiGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
