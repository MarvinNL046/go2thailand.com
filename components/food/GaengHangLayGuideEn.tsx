import { ChefHat, Flame, Leaf, MapPin, ShoppingBasket, Sparkles, UtensilsCrossed } from 'lucide-react';
import { KLOOK_GENERIC, withSubId } from '../../lib/affiliates';
import { DishEditorialTemplate, type DishEditorialData } from './DishEditorialTemplate';

const data: DishEditorialData = {
  title: 'Gaeng Hang Lay: Northern Thai Braised Pork Curry',
  description: 'Understand Gaeng Hang Lay or Gaeng Hung Lay: its braised pork, ginger, tamarind, warm spices, no-coconut-milk pattern, allergens and how to order it.',
  canonical: 'https://go2-thailand.com/food/gaeng-hang-lay/',
  updatedAt: '28 July 2026',
  name: 'Gaeng Hang Lay',
  thaiName: 'แกงฮังเล · Gaeng Hung Lay · Kaeng Hang Le',
  heroImage: '/images/redesign/gaeng-hang-lay-braised-pork-hero.webp',
  heroAlt: 'Fully cooked tender pork in deep rust Gaeng Hang Lay curry with ginger threads, whole garlic and sticky rice on a Northern Thai table',
  heroEyebrow: 'Northern pork curry · ginger and tamarind · no coconut milk',
  lead: 'Gaeng Hang Lay — also written Gaeng Hung Lay or Kaeng Hang Le — is Northern Thailand’s slow-braised pork curry. Tender pork, ginger, garlic, tamarind and warm spices create a rich sweet-sour sauce without the creamy coconut-milk body many travellers expect from Thai curry. Heat, peanuts, shrimp paste and regional additions still vary by kitchen.',
  quickFacts: [
    { label: 'Region', value: 'Northern Thailand · Lanna', icon: MapPin },
    { label: 'Base', value: 'Braised pork · spice · tamarind', icon: ShoppingBasket },
    { label: 'Body', value: 'Rich sauce · typically no coconut milk', icon: UtensilsCrossed },
    { label: 'Heat', value: 'Gentle to warm · kitchen varies', icon: Flame },
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
    intro: 'Hang Lay is deep and aromatic rather than coconut-creamy. Pork richness meets tamarind sourness, ginger and garlic, while dried chilli and warm spice build a rounded curry aroma. Sugar or fruit can soften the edges, but sweetness is not a fixed target.',
    texture: 'A familiar bowl has tender chunks of pork in a reduced, glossy sauce that coats rather than floods the meat. Pork belly brings soft fat; neck, shoulder or ribs change the bite. The sauce may contain whole garlic, ginger threads or peanuts depending on the kitchen.',
    finish: 'Tamarind and ginger lift the pork after the first rich bite. Warm spice, garlic and measured chilli linger, while sticky rice absorbs the sauce. Coconut should not dominate the finish in the familiar Northern pattern.',
    scores: [{ label: 'Aromatic', value: 5 }, { label: 'Rich', value: 5 }, { label: 'Tangy', value: 3 }, { label: 'Hot', value: 2 }],
  },
  ingredients: [
    { name: 'Pork', role: 'Pork belly, neck, shoulder or ribs appear in documented versions. Cut and fat level change the braise; the dish name does not confirm halal sourcing or safe holding.' },
    { name: 'Hang Lay spice', role: 'A warm spice blend or masala-influenced powder may join the curry paste. Composition varies, so packaged powder needs its own allergen and ingredient check.' },
    { name: 'Ginger and garlic', role: 'Fresh ginger and whole or pickled garlic are recurring aromatic signals. Quantity, cut and pickling vary by regional and household expression.' },
    { name: 'Tamarind', role: 'Supplies the sour line that cuts through rich pork. Pineapple or another sour ingredient may supplement it in some versions, not all.' },
    { name: 'Dried chilli paste', role: 'Chilli, shallot, garlic, lemongrass and galangal can form the aromatic paste. Chilli type and amount determine whether the curry feels mild or warm.' },
    { name: 'Peanuts', role: 'Roasted peanuts appear in a documented Lanna version but are not visually guaranteed. Ask directly because a smooth sauce can hide nuts or nut cross-contact.' },
    { name: 'Shrimp · sauces', role: 'Shrimp paste can enter the curry paste; fish, soy or wheat-based seasoning may appear elsewhere. The full kitchen recipe controls dietary status.' },
    { name: 'Northern table', role: 'Sticky rice and a shared khan-toke meal are familiar contexts. Chiangsaen-style versions may add vegetables, bamboo shoots or sesame, so the label is not one ingredient list.' },
  ],
  allergenCopy: 'Peanuts and shrimp paste are documented possibilities. Fish sauce, soy, wheat, sesame or packaged spice may also appear, and shared mortars, woks or ladles create cross-contact. “No coconut milk” does not mean allergen-free; check the complete paste, powder, seasoning and garnish.',
  vegetarianCopy: 'Standard Gaeng Hang Lay is a pork curry and may also contain shrimp paste or fish sauce. A plant-based adaptation needs a different braising base, verified paste, powder and sauces, plus separate preparation. It should be named and checked as an adaptation.',
  formats: [
    { title: 'Classic braised pork', bestFor: 'Experiencing the concentrated pork, ginger, tamarind and warm-spice character in a focused bowl.', tradeOff: 'Ask which pork cut is used and check peanuts, shrimp paste and packaged powder. Richness and heat cannot be judged from colour alone.' },
    { title: 'Khan-toke shared bowl', bestFor: 'Placing Hang Lay beside sticky rice, dips, sausage and vegetables in a wider Northern meal.', tradeOff: 'The shared table multiplies pork, seafood, nut, soy, wheat and cross-contact decisions; every companion dish needs its own check.' },
    { title: 'Chiangsaen-style variation', bestFor: 'Exploring a documented regional direction with vegetables, bamboo shoots, fresh chilli or sesame.', tradeOff: 'The name does not guarantee one exact vegetable set. Confirm sesame, peanuts, paste and pork rather than inferring from the regional label.' },
  ],
  orderSteps: [
    { title: 'Confirm the curry and pork', text: 'Ask for Gaeng Hang Lay and show แกงฮังเล if spelling causes confusion. Confirm the pork cut and whether the kitchen follows the familiar no-coconut-milk Northern style.' },
    { title: 'Check paste, nuts and heat', text: 'Ask about peanuts, shrimp paste, fish sauce, soy, wheat, sesame, packaged Hang Lay powder and chilli. A finished braise normally cannot be remade allergen-free or mild.' },
    { title: 'Choose portion and rice', text: 'Start with a small bowl or share it because pork belly can be rich. Add sticky rice after the curry is understood, and prefer freshly hot food whose pork is tender and thoroughly cooked.' },
  ],
  cooking: {
    title: 'Map the paste. Brown gently. Braise low. Balance late.',
    intro: 'Hang Lay is a slow-braise system: a tested recipe must connect pork cut, paste, spice powder, sourness, liquid and safe cooking. Changing one component can alter tenderness, sauce reduction and allergen status, so the sequence below is orientation rather than a formula.',
    steps: ['Choose one complete tested Gaeng Hang Lay recipe and map the pork cut, curry paste, Hang Lay powder, tamarind, ginger, garlic, sweetener, peanuts and every packaged seasoning.', 'Prepare and measure the paste exactly as directed, keeping raw-pork boards and knives away from ready-to-eat ginger, rice and serving utensils.', 'Marinate or season the pork only if the tested method calls for it, keeping it refrigerated and discarding or cooking any raw-meat marinade safely.', 'Cook the paste and pork at the instructed heat without scorching the spices, then add the specified liquid. Do not assume coconut milk belongs in the pot.', 'Braise gently until the chosen pork cut is both safely cooked and tender, adding ginger, garlic, tamarind or other finishing ingredients at the stages defined by the recipe.', 'Reduce and balance only within the tested method, then serve with clean utensils and fresh rice. Cool leftovers promptly and follow current local storage and reheating guidance.'],
    boundary: 'Tenderness is not the only safety control, and dark sauce can hide the colour of the meat. Follow a tested recipe and current food-safety guidance for an appropriate time-and-temperature combination, cooling, storage and reheating. This editorial owner deliberately omits Recipe schema and universal cooking times.',
  },
  affiliates: [
    { href: '/go/simple-thai-food-cookbook/', title: 'Simple Thai Food', text: 'A complete tested Thai recipe can provide exact pork, paste, spice and braising controls. Compare the current edition, format, seller and delivery details.' },
    { href: '/go/thai-granite-mortar-eight-inch/', title: 'Eight-inch granite mortar', text: 'Useful when a tested Hang Lay paste fits the usable bowl size. Compare weight, interior capacity and worktop protection with a processor for the actual batch.' },
  ],
  classHref: withSubId(KLOOK_GENERIC, 'en-gaeng-hang-lay-northern-thai-cooking-class'),
  classCopy: 'A relevant Northern Thai class can show how curry paste, warm spice, tamarind and pork become a non-creamy slow braise. Klook results are broad, so confirm Gaeng Hang Lay is on the current menu and ask about pork handling, peanuts, shrimp paste, substitutions, language and cancellation terms.',
  classSignals: [
    { title: 'No-coconut structure', text: 'See how spice, pork fat, tamarind and reduction create body without relying on coconut milk.' },
    { title: 'Pork and paste', text: 'Identify the cut, Hang Lay powder and any shrimp, peanut, soy, wheat or sesame boundary before cooking.' },
    { title: 'Braise control', text: 'Connect low heat, tenderness, safe doneness and final sweet-sour balance instead of chasing one fixed cooking time.' },
  ],
  faqs: [
    { question: 'What is Gaeng Hang Lay?', answer: 'Gaeng Hang Lay is a Northern Thai slow-braised pork curry with ginger, garlic, tamarind, dried chilli and warm spices. Familiar versions are rich and sweet-sour without coconut milk, though ingredients and regional additions vary.' },
    { question: 'What is Gaeng Hung Lay?', answer: 'Gaeng Hung Lay is another romanisation of the same Northern curry, also written Kaeng Hang Le. Spellings differ because Thai and Northern terms do not have one universal English transliteration.' },
    { question: 'What kind of curry is Gaeng Hang Lay?', answer: 'It is a Northern Thai pork curry that behaves more like a concentrated slow braise than a creamy coconut curry. Pork, aromatic paste, Hang Lay spice, ginger, garlic and tamarind are recurring signals.' },
    { question: 'What does Gaeng Hung Lay mean?', answer: 'The name is linked in Lanna documentation to Burmese terms such as hin le or han le, reflecting cross-border culinary influence. English translations vary, so “Northern Thai braised pork curry” is a useful description rather than a literal universal meaning.' },
    { question: 'What does Hung Lay curry taste like?', answer: 'It is rich and aromatic with tender pork, warm spice, ginger and garlic, plus tamarind sourness and measured sweetness. Chilli heat is usually not the only focus. Peanuts, pineapple, pickled garlic and other accents depend on the kitchen.' },
    { question: 'Is Gaeng Hang Lay spicy?', answer: 'Often it is gentler than Thailand’s hottest curries, but dried chilli and spice blends vary. A prepared braise usually cannot be made mild after cooking. Ask the kitchen and begin with a small portion when heat matters.' },
    { question: 'How does Gaeng Hang Lay differ from other Thai curries?', answer: 'Its familiar Northern structure centres on braised pork, ginger, tamarind and warm spice without coconut milk. Many central curries use coconut milk and fresh curry-paste aromatics differently. Exact recipes still vary, so this is a pattern, not a guarantee.' },
    { question: 'Which curry is closest to Massaman curry?', answer: 'Hang Lay and Massaman can both feel warm-spiced, rich and sweet-sour, but they remain separate dishes. Massaman commonly uses coconut milk and may use beef or chicken; Hang Lay is a Northern pork braise whose familiar form has no coconut milk.' },
    { question: 'Is Gaeng Hung Lay difficult to make at home?', answer: 'It is manageable with a complete tested recipe, but paste preparation, pork cut, slow braising, reduction and food safety need coordination. A shortcut powder or paste still requires a full ingredient and allergen check.' },
    { question: 'Which Thai curries are gluten-free?', answer: 'No curry name guarantees gluten-free status. Gaeng Hang Lay may use naturally gluten-free fresh ingredients, but spice mixes, soy or seasoning sauces, shrimp paste and shared equipment can introduce wheat. Confirm every product and cross-contact route.' },
  ],
  related: [
    { title: 'Nam Prik Ong', description: 'Compare another Lanna pork dish through tomato tang, chilli paste and a vegetable dip set.', href: '/food/nam-prik-ong/', image: '/images/redesign/nam-prik-ong-lanna-dip-hero.webp' },
    { title: 'Sai Ua', description: 'Move from slow-braised curry to Northern Thailand’s fragrant fresh pork sausage.', href: '/food/sai-ua/', image: '/images/redesign/sai-ua-northern-sausage-hero.webp' },
    { title: 'Chiang Mai guide', description: 'Plan markets, neighbourhoods and Northern food context around a Chiang Mai stay.', href: '/city/chiang-mai/', image: '/images/redesign/destination-chiang-mai.webp' },
  ],
  sources: [
    { title: 'Kaeng Hang Le — Lanna Food', creator: 'Northern Thai Information Center, Chiang Mai University Library', url: 'https://lannainfo.library.cmu.ac.th/en_lannafood/detail_lannafood.php?id_food=68', note: 'Primary Lanna source used for naming, Myanmar connection, pork cuts, tamarind, ginger, garlic, peanuts, spice powder, optional shrimp paste and Chiangsaen variation. Its formula was not universalised.' },
    { title: 'Gaeng Hung Lay — Northern Thai Braised Pork Curry', creator: 'Hot Thai Kitchen', url: 'https://hot-thai-kitchen.com/gaeng-hung-lay/', note: 'Complete DFS parse used for one pork-belly-and-rib expression, slow braise, ginger, garlic, tamarind, warm spice and no-coconut-milk distinction. Quantities and promotion were excluded.' },
    { title: 'Northern Thai Cuisine', creator: 'Thailand Foundation', url: 'https://thailandfoundation.or.th/northern-thai-cuisine-opening/', note: 'Primary context for Northern cuisine, trade-route influences, sticky rice, khan-tok service and Gaeng Hung Lae within the regional dish set.' },
    { title: 'Khan Toke: Northern Thai Tradition', creator: 'Thailand Foundation', url: 'https://thailandfoundation.or.th/th/khan-toke-a-versatile-container-of-the-northern-thai-tradition/', note: 'Complete DFS parse used for Gaeng Hung Lay as a familiar shared khan-toke dish with glutinous rice and balanced companion dishes.' },
    { title: '10 Northern Thai Dishes You Should Know', creator: 'Michelin Guide Thailand', url: 'https://guide.michelin.com/th/en/article/features/10-northern-thai-dishes-you-should-know', note: 'Current editorial capture used for celebratory context, pork belly, tamarind, galangal, pickled garlic, optional pineapple and the no-coconut-milk pattern. Venue listings were excluded.' },
  ],
  methodDescription: 'Updated 28 July 2026 after two independent DataForSEO clusters with three raw keyword records, ten current UK-English SERPs with 72 organic results, 53 People Also Ask appearances and 35 unique genuine questions, three complete DFS source parses, current Chiang Mai University and Michelin captures, plus exact owner ranking and backlink checks. The route has UK volume 30, zero ranking terms and no reportable backlink summary signal. Massaman remains independent. Generic heat rankings, near-me, nightlife, celebrity, recipe-only, fixed-price, calorie, health, automatic dietary and one-formula claims were excluded.',
};

export function GaengHangLayGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
