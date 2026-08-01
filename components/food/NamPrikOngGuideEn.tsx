import { ChefHat, Flame, Leaf, MapPin, ShoppingBasket, Sparkles, UtensilsCrossed } from 'lucide-react';
import { KLOOK_GENERIC, withSubId } from '../../lib/affiliates';
import { DishEditorialTemplate, type DishEditorialData } from './DishEditorialTemplate';

const data: DishEditorialData = {
  title: 'Nam Prik Ong: Northern Thai Pork & Tomato Dip',
  description: 'Understand Nam Prik Ong: its pork-and-tomato base, taste, ingredients, heat, accompaniments, dietary checks and how to order this Northern Thai chilli dip.',
  canonical: 'https://go2-thailand.com/food/nam-prik-ong/',
  updatedAt: '28 July 2026',
  name: 'Nam Prik Ong',
  thaiName: 'น้ำพริกอ่อง · Nam Phrik Ong',
  heroImage: '/images/redesign/nam-prik-ong-lanna-dip-hero.webp',
  heroAlt: 'Cooked chunky Nam Prik Ong pork and tomato chilli dip with cabbage, cucumber, long beans, eggplants, sticky rice and pork crackling',
  heroEyebrow: 'Northern chilli dip · cooked pork · tomato tang',
  lead: 'Nam Prik Ong is Northern Thailand’s chunky red pork-and-tomato chilli dip. Dried chilli, shallot and garlic give it warmth; tomato supplies tang and gentle sweetness; minced pork makes it a substantial part of a shared meal. Scoop it with vegetables or sticky rice, but check the paste and seasonings before assuming its heat or allergens.',
  quickFacts: [
    { label: 'Region', value: 'Northern Thailand · Lanna', icon: MapPin },
    { label: 'Core', value: 'Cooked pork · tomato · chilli paste', icon: ShoppingBasket },
    { label: 'Texture', value: 'Chunky relish · not a smooth sauce', icon: UtensilsCrossed },
    { label: 'Heat', value: 'Mild to hot · recipe varies', icon: Flame },
  ],
  navItems: [
    { href: '#taste', label: 'Taste', icon: Sparkles },
    { href: '#ingredients', label: 'Ingredients', icon: ShoppingBasket },
    { href: '#choose', label: 'Choose', icon: UtensilsCrossed },
    { href: '#order', label: 'Order', icon: MapPin },
    { href: '#cook', label: 'Cook', icon: ChefHat },
    { href: '#questions', label: 'Questions', icon: Leaf },
  ],
  taste: {
    intro: 'The clearest Nam Prik Ong signature is a cooked balance of tomato tang, savoury pork, dried-chilli warmth and aromatic paste. Saltiness, sweetness and fermentation depth move with the cook; it should not be reduced to “Thai bolognese” or treated as one fixed sauce.',
    texture: 'A familiar bowl is thick enough to cling to cabbage or cucumber, with softened tomato and small pieces of fully cooked minced pork. Some versions are wetter, finer or more reduced. Smoothness does not prove authenticity and redness does not prove doneness.',
    finish: 'Tomato acidity lifts the rich pork, then garlic, shallot and chilli linger. Shrimp paste, fermented soybean or fish sauce can add deeper umami without being visible, while fresh vegetables cool the next bite.',
    scores: [{ label: 'Tangy', value: 4 }, { label: 'Savoury', value: 5 }, { label: 'Hot', value: 3 }, { label: 'Sweet', value: 2 }],
  },
  ingredients: [
    { name: 'Minced pork', role: 'The familiar cooked protein and source of richness. Meat cut, fat level and grind vary; the dish name alone cannot confirm halal sourcing or safe holding.' },
    { name: 'Tomatoes', role: 'Fresh tomato softens into the red, tangy base. Cherry and other tomatoes appear in documented versions, but no single variety or sweetness level is mandatory.' },
    { name: 'Dried chilli', role: 'Pounded into the paste for colour, warmth and aroma. Type, seed level and quantity change the heat considerably.' },
    { name: 'Shallot and garlic', role: 'Recurring paste aromatics that round the tomato and pork. They may be pounded raw, roasted or cooked according to the complete method.' },
    { name: 'Shrimp · fish seasoning', role: 'Shrimp paste and fish sauce appear in documented versions. They create shellfish, fish and vegetarian boundaries even when the bowl looks meat-and-tomato only.' },
    { name: 'Fermented soybean · sauces', role: 'Some expressions add fermented soybean or bottled seasoning for savoury depth. Soy, wheat and sodium therefore need a product-specific check.' },
    { name: 'Fresh herbs', role: 'Coriander and spring onion can finish the cooked dip. Garnish varies and does not identify the hidden paste or seasoning.' },
    { name: 'Dippers and sides', role: 'Cabbage, cucumber, long beans, small eggplants, boiled vegetables, sticky rice and pork crackling are familiar companions, not guaranteed inclusions.' },
  ],
  allergenCopy: 'Shrimp paste, fish sauce, fermented soybean and bottled seasoning are the main hidden checks. That can introduce shellfish, fish, soy or wheat; shared mortars, woks and serving spoons create cross-contact. Ask about the entire paste and cooking sequence, not only the visible pork and tomato.',
  vegetarianCopy: 'Standard Nam Prik Ong contains minced pork and may also contain shrimp paste or fish sauce. A meat-free adaptation needs a separate protein or mushroom base, vegetarian paste, verified sauces and separate preparation. “No visible meat” is not enough.',
  formats: [
    { title: 'Market dip set', bestFor: 'Trying a small bowl with a clear selection of crisp or boiled vegetables and sticky rice.', tradeOff: 'Confirm whether the dip is warm, freshly cooked and already fixed in heat. Pork, shrimp, fish, soy and wheat may not be listed at the counter.' },
    { title: 'Northern shared plate', bestFor: 'Comparing Nam Prik Ong with Sai Ua, Laab Kua or Hang Lay in a wider Lanna meal.', tradeOff: 'Every sausage, curry, dip and crackling has its own pork, seafood, seasoning and cross-contact checks; the platter is not one allergen decision.' },
    { title: 'Verified meat-free adaptation', bestFor: 'Exploring the tomato-and-chilli format when a restaurant deliberately replaces pork and seafood seasoning.', tradeOff: 'Ask what replaces the pork, which paste and sauces are used and whether tools are shared. It is an adaptation, not standard Nam Prik Ong.' },
  ],
  orderSteps: [
    { title: 'Name the red dip', text: 'Ask for Nam Prik Ong and show น้ำพริกอ่อง if pronunciation is difficult. Confirm it is the red tomato-and-pork dip, not green Nam Prik Noom or sweet roasted Nam Prik Pao.' },
    { title: 'Check the whole paste', text: 'Ask about pork, shrimp paste, fish sauce, fermented soybean, bottled sauces, wheat and chilli. A prepared bowl usually cannot be made milder or allergen-free after ordering.' },
    { title: 'Choose a small set first', text: 'Start with a tasting bowl and vegetables or sticky rice, then add pork crackling only if wanted. Prefer freshly served, thoroughly cooked pork dip over a bowl whose holding conditions are unclear.' },
  ],
  cooking: {
    title: 'Pound. Brown. Simmer. Cook through. Serve fresh.',
    intro: 'A complete tested Nam Prik Ong recipe should define the paste, pork, tomato, seasoning and safe cooking controls as one system. The editorial sequence below explains the decisions without inventing universal quantities.',
    steps: ['Select one complete tested recipe and identify every chilli, paste ingredient, minced-pork control, sauce, garnish and dipper before shopping.', 'Prepare the measured dried chilli, shallot, garlic and any shrimp paste or fermented soybean exactly as that method directs, keeping ready-to-eat vegetables away from raw-pork tools.', 'Pound or process the paste to the specified texture, then transfer it with clean utensils. Do not taste any mixture after raw pork has been added.', 'Cook the paste as directed, add the minced pork and break it up so there are no hidden raw clumps. Use the recipe’s heat and timing rather than judging by tomato colour.', 'Add the measured tomatoes and seasoning, then simmer or fry until the pork is fully cooked and the tomatoes reach the intended thick, scoopable texture.', 'Use clean serving utensils and offer freshly washed vegetables or prepared sticky rice separately. Cool leftovers promptly and follow current local storage and reheating guidance.'],
    boundary: 'Tomato can make undercooked pork look red or brown, so colour is not a reliable safety test. The UK Food Standards Agency advises cooking minced meat thoroughly and using a safe time-and-temperature combination; follow a tested recipe for exact quantities, temperature, cooling and reheating. This page deliberately carries no Recipe schema.',
  },
  affiliates: [
    { href: '/go/simple-thai-food-cookbook/', title: 'Simple Thai Food', text: 'Use a complete tested Thai recipe for exact paste, pork, tomato and cooking controls. Compare the current edition, format, seller and delivery details before buying.' },
    { href: '/go/thai-granite-mortar-eight-inch/', title: 'Eight-inch granite mortar', text: 'Useful for pounding a measured chilli paste when the usable bowl capacity suits the recipe. Compare weight, interior size and worktop protection with a processor.' },
  ],
  classHref: withSubId(KLOOK_GENERIC, 'en-nam-prik-ong-northern-thai-cooking-class'),
  classCopy: 'A relevant Northern Thai cooking class can connect paste texture, raw-pork handling and the final dip set. Klook results are broad, so confirm Nam Prik Ong is on the current menu and ask about market visits, allergens, substitutions, class language and cancellation terms.',
  classSignals: [
    { title: 'Dip identity', text: 'See how a red tomato-and-pork Nam Prik Ong differs from green Nam Prik Noom and roasted Nam Prik Pao.' },
    { title: 'Paste control', text: 'Identify dried chilli, shallot, garlic and any shrimp, fish or soybean seasoning before the pork enters the pan.' },
    { title: 'Safe service', text: 'Keep raw-pork tools away from vegetables and verify full cooking before building the shared platter.' },
  ],
  faqs: [
    { question: 'What is Nam Prik Ong?', answer: 'Nam Prik Ong is a cooked Northern Thai chilli dip or relish made around tomato and minced pork with a pounded chilli-and-aromatic paste. It is commonly served with fresh or boiled vegetables and may join sticky rice or a wider Lanna meal.' },
    { question: 'What does Nam Prik mean in Thai?', answer: 'Nam prik is a broad Thai category of chilli dips or relishes, not one recipe. “Ong” identifies this Northern red pork-and-tomato member of the family. Showing น้ำพริกอ่อง helps distinguish it when ordering.' },
    { question: 'What does Nam Prik Ong taste like?', answer: 'Expect tomato tang and gentle sweetness around savoury pork, garlic, shallot and dried-chilli warmth. Shrimp paste, fish sauce or fermented soybean may add deeper salty umami. Exact balance varies by cook.' },
    { question: 'What is the texture of Nam Prik Ong?', answer: 'A familiar version is a thick, scoopable relish with softened tomato and small pieces of fully cooked minced pork. It can be wetter or more reduced, but it is generally chunkier than a smooth bottled sauce.' },
    { question: 'What are the ingredients in Nam Prik Ong?', answer: 'A recurring core is minced pork, tomato, dried chilli, shallot, garlic and salt. Shrimp paste, fish sauce, fermented soybean, tamarind, coriander, spring onion and packaged sauces appear in some versions, so ask for the actual ingredient list.' },
    { question: 'How spicy is Nam Prik Ong?', answer: 'It can range from fairly gentle to hot because dried-chilli type and quantity vary. The paste is normally cooked into the finished dip, so a prepared bowl cannot simply be made mild. Ask before ordering and begin with a small portion.' },
    { question: 'What kind of vegetables go with Nam Prik Ong?', answer: 'Cabbage, cucumber, long beans, small Thai eggplants and assorted fresh or boiled vegetables are familiar dippers. Availability changes by season and restaurant, and shared serving utensils still matter for allergens.' },
    { question: 'How does Nam Prik Ong compare to other Thai dips?', answer: 'Nam Prik Ong is red, tomato-led and commonly contains minced pork. Nam Prik Noom is a Northern roasted green-chilli dip; Nam Prik Pao is a sweet-savory roasted chilli paste or jam; Prik Nam Pla is a fish-sauce condiment. They are not interchangeable.' },
    { question: 'What is Nam Prik Noom in English?', answer: 'Nam Prik Noom is usually described as Northern Thai roasted green-chilli dip. It is built around roasted young green chillies rather than the tomato-and-minced-pork base that identifies Nam Prik Ong.' },
    { question: 'Is Nam Prik Ong gluten-free?', answer: 'Not automatically. The basic pork, tomato, chilli and fresh aromatics may contain no gluten, but fermented soybean, soy or seasoning sauce, packaged paste and shared equipment can introduce wheat. Confirm every ingredient and cross-contact route.' },
  ],
  related: [
    { title: 'Sai Ua', description: 'Pair the dip with Northern Thailand’s fragrant fresh pork sausage and understand its casing and allergen checks.', href: '/food/sai-ua/', image: '/images/redesign/sai-ua-northern-sausage-hero.webp' },
    { title: 'Northern Laab Kua', description: 'Continue into roasted-spice minced meat, makhwaen aroma and another Lanna ordering system.', href: '/food/laab-kua/', image: '/images/redesign/laab-kua-lanna-table-hero.webp' },
    { title: 'Chiang Mai guide', description: 'Plan the markets, neighbourhoods and Northern food context around a Chiang Mai stay.', href: '/city/chiang-mai/', image: '/images/redesign/destination-chiang-mai.webp' },
  ],
  sources: [
    { title: 'Namphrik Ong — Lanna Food', creator: 'Northern Thai Information Center, Chiang Mai University Library', url: 'https://lannainfo.library.cmu.ac.th/en_lannafood/detail_lannafood.php?id_food=174', note: 'Primary Lanna source used for the combined sour, salty, spicy and sweet profile, dried chilli, tomato, pork, shrimp-paste possibility, vegetables and two documented cooking sequences.' },
    { title: 'Thai Nam Prik — The Local Guide', creator: 'Eating Thai Food', url: 'https://www.eatingthaifood.com/thai-nam-prik-chili-sauce/', note: 'Complete DFS parse used for nam prik family context, dip-style eating, vegetables, sticky rice, crackling and the Nam Prik Ong versus Nam Prik Noom distinction.' },
    { title: 'Authentic Nam Prik Ong', creator: 'Hungry in Thailand', url: 'https://hungryinthailand.com/nam-prik-ong/', note: 'Complete DFS parse used as an independent pork, tomato, dried-chilli, seasoning and service expression. Recipe quantities and calorie claims were excluded.' },
    { title: 'Nam Prik Ong', creator: 'Serious Eats', url: 'https://www.seriouseats.com/nam-prik-ong-thai-pork-tomato-chile-dip', note: 'Current top-result evidence used for the Northern pork-and-tomato relish and fermented-soybean and shrimp-paste possibilities. DFS returned no full markdown, so no formula was reused.' },
    { title: 'Getting to Know Chiang Rai', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Articles/https-www-tourismthailand-org-articles-getting-to-know-chiang-rai', note: 'Current official travel context used for Nam Prik Ong on a shared Northern platter with Sai Ua and Hang Lay curry. Venue details were excluded.' },
    { title: 'Cooking meat safely', creator: 'UK Food Standards Agency', url: 'https://www.food.gov.uk/safety-hygiene/cooking-your-food', note: 'Primary food-safety boundary used for thorough cooking of minced meat and safe time-and-temperature control.' },
  ],
  methodDescription: 'Updated 28 July 2026 after two independent DataForSEO clusters with 31 raw keyword records and 50 competitor-domain records, ten current UK-English SERPs with 72 organic results, 55 People Also Ask appearances and 39 unique genuine questions, two complete DFS source parses, current Chiang Mai University and Tourism Authority context, plus exact owner ranking and backlink checks. The route has UK volume 110 / KD 0, zero ranking terms and no reportable backlink summary signal. Nam Prik Noom, Nam Prik Pao and Prik Nam Pla remain independent. Recipe-only, near-me, lasagne, packaged-paste, fixed-price, calorie, health, automatic dietary and one-formula claims were excluded.',
};

export function NamPrikOngGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
