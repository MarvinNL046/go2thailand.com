import { ChefHat, Flame, Leaf, MapPin, ShoppingBasket, Sparkles, UtensilsCrossed } from 'lucide-react';
import { KLOOK_GENERIC, withSubId } from '../../lib/affiliates';
import { DishEditorialTemplate, type DishEditorialData } from './DishEditorialTemplate';

const data: DishEditorialData = {
  title: 'Sai Ua: Northern Thai Sausage & How to Order',
  description: 'Understand Sai Ua or Sai Oua: Northern Thai herbal pork sausage, ingredients, casing, heat, taste, Sai Ua versus Isaan sausage and how to order it.',
  canonical: 'https://go2-thailand.com/food/sai-ua/',
  updatedAt: '28 July 2026',
  name: 'Sai Ua',
  thaiName: 'ไส้อั่ว · Sai Oua',
  heroImage: '/images/redesign/sai-ua-northern-sausage-hero.webp',
  heroAlt: 'Fully cooked sliced Northern Thai Sai Ua sausage coil with visible herb flecks beside sticky rice, cabbage, cucumber and nam prik noom',
  heroEyebrow: 'Northern herbs · fresh pork sausage · grilled until cooked',
  lead: 'Sai Ua — also written Sai Oua — is Northern Thailand’s fragrant fresh pork sausage. Coarse pork and fat carry curry paste, lemongrass, galangal, makrut lime and chilli into a browned coil whose sliced centre shows the herbs. It is savoury, citrusy and often hot, but it is not the sour fermented Isaan sausage travellers sometimes expect.',
  quickFacts: [
    { label: 'Region', value: 'Northern Thailand · Lanna', icon: MapPin },
    { label: 'Base', value: 'Fresh pork · fat · aromatic paste', icon: ShoppingBasket },
    { label: 'Texture', value: 'Coarse · herb-flecked · fully cooked', icon: UtensilsCrossed },
    { label: 'Heat', value: 'Chilli-led · recipe and vendor vary', icon: Flame },
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
    intro: 'Sai Ua leads with fresh aromatic intensity rather than fermented sourness. Lemongrass, makrut lime and galangal cut through rich pork; curry paste, garlic and chilli build savoury warmth; a charcoal or grill finish can add smoke without defining every version.',
    texture: 'A familiar version is coarsely ground, juicy and visibly flecked with herbs under a browned casing. The filling should be fully cooked. Finely ground commercial links and casing-free adaptations exist, so texture alone does not prove quality or method.',
    finish: 'Citrus leaf and lemongrass rise after the pork, followed by curry spice and lingering chilli. Fish sauce or shrimp paste can deepen the finish invisibly, while sticky rice and vegetables soften the richness.',
    scores: [{ label: 'Aromatic', value: 5 }, { label: 'Herbal', value: 5 }, { label: 'Savoury', value: 4 }, { label: 'Hot', value: 3 }],
  },
  ingredients: [
    { name: 'Pork and fat', role: 'The familiar fresh-sausage base, often coarsely ground. Lean-to-fat ratio, cut and texture vary; the dish name does not prove halal sourcing or safe storage.' },
    { name: 'Curry paste', role: 'A Northern-leaning aromatic paste can carry chilli, garlic, shallot, coriander root, cumin or other spice. Premixed paste may hide allergens or fixed heat.' },
    { name: 'Lemongrass', role: 'A recurring fresh citrus-herb signal that is pounded or chopped into the filling. Amount and visible texture depend on the grinder and recipe.' },
    { name: 'Galangal · turmeric', role: 'Galangal supplies peppery resinous aroma; turmeric appears in some documented versions. Neither proves one universal ingredient list.' },
    { name: 'Makrut lime leaf', role: 'Thinly sliced or pounded leaf can give the cooked centre its characteristic high citrus aroma and visible green flecks.' },
    { name: 'Fish and shrimp seasoning', role: 'Fish sauce and shrimp paste occur in documented versions. They create fish, shellfish and vegetarian boundaries even when invisible.' },
    { name: 'Natural casing', role: 'Often pork intestine. Caseless patties or rolls are possible adaptations, but a coil at a market should be treated as pork-cased unless the vendor confirms otherwise.' },
    { name: 'Northern table', role: 'Sticky rice, cabbage, cucumber, herbs, nam phrik noom and pork crackling may accompany a shared Lanna meal. None is guaranteed with every portion.' },
  ],
  allergenCopy: 'Fish and shellfish are the main hidden checks because fish sauce and shrimp paste occur in documented fillings or curry pastes. Soy, wheat and other packaged-seasoning ingredients may also appear; shared grills, knives and chopping boards add cross-contact. Check the full paste and sausage, not only the visible herb list.',
  vegetarianCopy: 'Standard Sai Ua is fresh pork sausage, usually with pork casing and sometimes fish sauce or shrimp paste. A plant-based or casing-free adaptation needs a different filling, paste, casing and preparation route. It should be labelled and confirmed rather than inferred from shape.',
  formats: [
    { title: 'Market coil', bestFor: 'Seeing the herb-flecked sausage sliced from a browned coil and choosing a small tasting portion.', tradeOff: 'Ask whether it is served hot, fully cooked, pork-cased and made with fish sauce or shrimp paste. Display heat and holding time cannot be judged from colour.' },
    { title: 'Northern shared plate', bestFor: 'Placing Sai Ua beside sticky rice, nam phrik, vegetables and other Lanna dishes in a khan-tok-style meal.', tradeOff: 'The surrounding dips, crackling and curries introduce their own chilli, fish, shrimp, pork and cross-contact boundaries.' },
    { title: 'Caseless adaptation', bestFor: 'Home cooks who want the aromatic filling as patties or rolls without sausage-stuffing equipment.', tradeOff: 'It is an adaptation, not a guarantee of a pork-free or allergen-free result. Use a complete tested recipe and cook the centre thoroughly.' },
  ],
  orderSteps: [
    { title: 'Confirm pork and casing', text: 'Ask whether both filling and casing are pork and whether the displayed coil is already fully cooked. A chicken or plant-based version should be confirmed as a separate product with separate preparation.' },
    { title: 'Check paste, seafood and heat', text: 'Ask about fish sauce, shrimp paste, soy, wheat and chilli before buying. A premixed or pre-cooked sausage usually cannot be made milder after it reaches the stall.' },
    { title: 'Choose portion and sides', text: 'Order a tasting portion or a shared amount, then add sticky rice, vegetables or nam phrik only after their ingredients are clear. Eat freshly heated sausage rather than assuming any display temperature is safe.' },
  ],
  cooking: {
    title: 'Pound. Keep cold. Grind. Stuff. Cook through.',
    intro: 'Sai Ua combines curry-paste work with fresh-sausage food safety. A tested recipe defines the meat-and-fat ratio, paste, casing, grinding temperature and final cooking control. Keeping raw pork cold and separated protects both texture and ready-to-eat herbs or sides.',
    steps: ['Choose one complete tested Sai Ua recipe and map pork, fat, paste, fish or shrimp seasoning, casing, equipment, accompaniments and substitutions before starting.', 'Pound or process the measured aromatics according to that recipe, keeping raw-pork tools and surfaces away from the paste, herbs and serving table until mixing begins.', 'Chill the pork, fat, grinder parts and bowl as instructed, then grind to the specified texture without allowing the mixture to warm unnecessarily.', 'Mix the paste through the meat evenly, cook a small separate test portion fully and adjust seasoning only within the tested recipe before stuffing.', 'Prepare and fill the casing with clean equipment, remove trapped air according to the method and refrigerate the raw sausage until the grill or oven is ready.', 'Cook the coil or links evenly, moving them to prevent a burnt casing, and verify the centre is steaming hot and cooked through with no pink meat before resting and slicing with clean tools.'],
    boundary: 'A browned casing is not a doneness test. The UK Food Standards Agency advises cooking sausages until steaming hot throughout, with no pink meat and clear juices, or using an appropriate safe time-and-temperature combination. Follow a tested recipe for exact quantities, temperature, cooling, storage and reheating; this editorial owner deliberately omits Recipe schema.',
  },
  affiliates: [
    { href: '/go/simple-thai-food-cookbook/', title: 'Simple Thai Food', text: 'A tested Thai cookbook can supply exact paste, meat, casing and cooking instructions that this traveller guide should not invent. Compare the current edition, format, seller and delivery details.' },
    { href: '/go/thai-granite-mortar-eight-inch/', title: 'Eight-inch granite mortar', text: 'Useful when a tested paste fits the usable bowl size. Compare weight, interior capacity and worktop protection with a processor or grinder for your actual batch.' },
  ],
  classHref: withSubId(KLOOK_GENERIC, 'en-sai-ua-northern-thai-sausage-cooking-class'),
  classCopy: 'A relevant Northern Thai class can show how aromatics become a paste, how the coarse filling stays cold and how a coil is cooked without burning its casing. Klook results are broad, so confirm Sai Ua is on the menu and ask about stuffing, raw-pork handling, allergens and language.',
  classSignals: [
    { title: 'Aromatic paste', text: 'Identify lemongrass, galangal, makrut lime, chilli and one local paste balance before it enters the pork.' },
    { title: 'Cold texture', text: 'See why meat, fat and equipment stay cold and how coarse grinding keeps the herb-flecked structure.' },
    { title: 'Cooked centre', text: 'Separate raw and cooked tools and verify doneness instead of trusting casing colour or smoke.' },
  ],
  faqs: [
    { question: 'What is Sai Ua in English?', answer: 'Sai Ua or Sai Oua is usually called Northern Thai sausage or Chiang Mai sausage in English. It is a fresh pork sausage seasoned with aromatic curry paste and herbs, then grilled or otherwise fully cooked.' },
    { question: 'What is Northern Thai sausage?', answer: 'In this owner, Northern Thai sausage means Sai Ua: coarse pork and fat mixed with an aromatic paste that commonly features lemongrass, galangal, makrut lime, garlic and chilli. Recipes, casing and seafood seasoning vary.' },
    { question: 'What is Sai Ua made of?', answer: 'A familiar Sai Ua combines pork, pork fat, curry paste, lemongrass, galangal, garlic, shallot, makrut lime leaf, chilli and herbs in a natural casing. Fish sauce, shrimp paste, turmeric, cumin and other seasonings appear in some versions, not all.' },
    { question: 'What are the ingredients in Sai Ua sausage?', answer: 'The exact answer belongs to the vendor or recipe. Check pork and fat, casing, curry-paste contents, lemongrass, galangal, makrut lime, chilli, fish sauce, shrimp paste and packaged seasoning. Visible green flecks do not reveal every allergen.' },
    { question: 'What does Sai Oua taste like?', answer: 'Sai Oua is rich and savoury with intense fresh-herb aroma, citrus lift from lemongrass and makrut lime, warm galangal and chilli heat. Smoke may appear from grilling, while sticky rice and vegetables can soften the finish.' },
    { question: 'Is Sai Oua spicy?', answer: 'It is often spicy, but the amount and type of chilli vary. Because the curry paste is mixed through the raw filling before cooking, a finished coil usually cannot be made milder to order. Ask to taste a small slice or choose another dish when heat matters.' },
    { question: 'How do you pronounce Sai Oua?', answer: 'English spellings include Sai Ua and Sai Oua, so written pronunciation guides vary. A practical approximation is “sigh oo-ah”, spoken as two parts. Showing ไส้อั่ว on your phone is more reliable than expecting one romanisation.' },
    { question: 'What to eat with Sai Oua?', answer: 'Sticky rice, cabbage, cucumber, fresh herbs and nam phrik noom are familiar Northern companions. Sai Ua can also join a shared khan-tok meal. These sides are optional and bring their own chilli, fish, shrimp or pork checks.' },
    { question: 'Can you grill Sai Oua?', answer: 'Yes, grilling is a documented preparation and can brown the casing and add smoke. Turn it for even cooking and verify the centre is fully cooked rather than relying on surface colour. Follow the exact time-and-temperature control in a tested recipe.' },
    { question: 'What is Isaan sausage?', answer: 'Sai Krok Isan is a separate Northeastern sausage commonly fermented with pork, rice, garlic and salt, creating sourness. Sai Ua is a fresh Northern herb-and-curry-paste sausage. Both vary, but fermentation and sourness should not be transferred to Sai Ua by default.' },
  ],
  related: [
    { title: 'Northern Laab Kua', description: 'Continue into Northern Thailand’s roasted-spice minced-meat system and its makhwaen boundary.', href: '/food/laab-kua/', image: '/images/redesign/laab-kua-lanna-table-hero.webp' },
    { title: 'Khao Soi', description: 'Move from grilled aromatic sausage to Chiang Mai’s layered curry-noodle tradition.', href: '/blog/khao-soi-chiang-mai-guide/', image: '/images/redesign/khao-soi-chiang-mai-hero.webp' },
    { title: 'Chiang Mai guide', description: 'Plan markets, Northern food context and useful city decisions around the dish.', href: '/city/chiang-mai/', image: '/images/redesign/destination-chiang-mai.webp' },
  ],
  sources: [
    { title: '“Sai Ua” Northern Thai Sausage', creator: 'Hot Thai Kitchen', url: 'https://hot-thai-kitchen.com/sai-ua/', note: 'DFS parse used for fresh pork, aromatic curry paste, grilling, sticky-rice and vegetable context and casing-free adaptation. Promotion and recipe quantities were excluded.' },
    { title: 'Sai Ua, Northern Thai Sausage', creator: 'Meatwave', url: 'https://meatwave.com/recipes/homemade-sai-ua-northern-thai-sausage-recipe', note: 'Complete DFS parse used for one coarse pork-and-fat expression, aromatic paste, casing, grill sequence and fully cooked test portion. Personal opinion and one formula were excluded.' },
    { title: 'Sai Ua — Northern Thai Sausage', creator: 'Ian Benites', url: 'https://ianbenites.com/sai-ua-northern-thai-sausage-%E0%B9%84%E0%B8%AA%E0%B9%89%E0%B8%AD%E0%B8%B1%E0%B9%88%E0%B8%A7/', note: 'Complete DFS parse used as an independent fresh-sausage expression with coarse pork, visible aromatics, natural casing and charcoal cooking. Shopping and storage claims were excluded.' },
    { title: 'Northern Thai Cuisine', creator: 'Thailand Foundation', url: 'https://thailandfoundation.or.th/northern-thai-cuisine-opening/', note: 'Current primary-context source confirming Sai Oua as an aromatic Northern dish within a cuisine organised around sticky rice, aromatics and khan-tok service.' },
    { title: 'Sai-ua — Lanna Food', creator: 'Northern Thai Information Center, Chiang Mai University Library', url: 'https://lannainfo.library.cmu.ac.th/en_lannafood/detail_lannafood.php?id_food=188', note: 'Current primary source capture used for one documented pork, herb, shrimp-paste, casing and slow-grill method. Quantities were not universalised.' },
  ],
  methodDescription: 'Updated 28 July 2026 after two independent DataForSEO clusters with 43 raw keyword records and 100 competitor-domain records, ten current UK-English SERPs with 75 organic results, 52 People Also Ask appearances and 34 unique genuine questions, four complete DFS source parses, two current primary Thai-context captures, one current Michelin capture, plus exact owner ranking and backlink checks. The route has UK head-term volume 590 / KD 0, zero ranking terms and no reportable backlink summary signal. Fermented Sai Krok Isan remains independent. Near-me, frozen-product, best-market, Chinese-sausage, fixed price, calorie, health, heat, shelf-life, automatic dietary, raw-centre and one-formula claims were excluded.',
};

export function SaiUaGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
