import { ChefHat, Flame, Leaf, MapPin, MoonStar, ShoppingBasket, Sparkles, UtensilsCrossed } from 'lucide-react';
import { KLOOK_GENERIC, withSubId } from '../../lib/affiliates';
import { DishEditorialTemplate, type DishEditorialData } from './DishEditorialTemplate';

const data: DishEditorialData = {
  title: 'Khao Mok Gai: Thai Chicken Biryani & How to Order',
  description: 'Understand Khao Mok Gai: Thai chicken biryani, aromatic yellow rice, green sauce, Thai-Muslim context, halal checks, allergens, taste and ordering.',
  canonical: 'https://go2-thailand.com/food/khao-mok-gai/',
  updatedAt: '28 July 2026',
  name: 'Khao Mok Gai',
  thaiName: 'ข้าวหมกไก่ · Thai chicken biryani',
  heroImage: '/images/redesign/khao-mok-gai-thai-chicken-biryani-hero.webp',
  heroAlt: 'Thai Khao Mok Gai with fully cooked chicken, separate golden spiced rice, fried shallots, cucumber, tomato and a separate green herb chilli sauce',
  heroEyebrow: 'Thai-Muslim rice plate · warm spice · green sauce',
  lead: 'Khao Mok Gai is Thailand’s chicken-biryani expression: marinated chicken and fragrant yellow rice shaped by warm spices, then commonly served with crisp fried shallots, cucumber and a bright green herb-chilli sauce. Its Thai-Muslim and southern context is central to the story. That heritage does not certify every current kitchen, so halal, dairy, gluten and shared-equipment questions still belong at vendor level.',
  quickFacts: [
    { label: 'Identity', value: 'Thai chicken biryani · one-pot rice family', icon: Sparkles },
    { label: 'Context', value: 'Thai-Muslim · strong southern connection', icon: MoonStar },
    { label: 'Rice', value: 'Golden · aromatic · separate grains', icon: ShoppingBasket },
    { label: 'Contrast', value: 'Warm spice · bright green sauce', icon: Flame },
  ],
  navItems: [
    { href: '#taste', label: 'Taste', icon: Sparkles },
    { href: '#ingredients', label: 'Signals', icon: ShoppingBasket },
    { href: '#choose', label: 'Choose', icon: UtensilsCrossed },
    { href: '#order', label: 'Order', icon: MapPin },
    { href: '#cook', label: 'Cook', icon: ChefHat },
    { href: '#questions', label: 'Questions', icon: Leaf },
  ],
  taste: {
    intro: 'The rice is savoury and deeply aromatic rather than automatically chilli-hot. Turmeric or saffron gives colour while cinnamon, cardamom, clove, cumin, coriander and pepper can create warm perfume. Marinated chicken adds richness; fried shallot brings sweet crunch. The green sauce supplies the sharper herb, acid and chilli contrast.',
    texture: 'Good rice has tender but recognisably separate grains, not wet mash. Bone-in chicken should be fully cooked yet juicy, with spice and marinade carried through the meat. Fried shallots stay crisp when added late; cucumber and tomato reset the palate.',
    finish: 'Without sauce, the plate can finish warm, savoury and gently spiced. A little green sauce adds fresh coriander or mint, vinegar or lime and chilli. Its intensity varies, so taste separately before covering the rice.',
    scores: [{ label: 'Aromatic spice', value: 5 }, { label: 'Savoury', value: 4 }, { label: 'Rice heat', value: 2 }, { label: 'Sauce heat', value: 4 }],
  },
  ingredients: [
    { name: 'Long-grain rice', role: 'Jasmine rice is used in a documented Thai-specialist version; other long-grain rice can appear. Washing, liquid ratio and chicken moisture determine whether the grains stay separate.' },
    { name: 'Fully cooked chicken', role: 'Bone-in thigh or drumstick is familiar because it can cook with and flavour the rice. Cut, skin, marinade and source vary; appearance does not prove halal certification or safe doneness.' },
    { name: 'Turmeric · saffron', role: 'Turmeric commonly gives the plate its golden tone; saffron can deepen fragrance and colour. Yellow rice alone does not identify every spice, colouring or ingredient.' },
    { name: 'Warm whole spices', role: 'Coriander, cumin, cinnamon, cardamom, clove, pepper, bay and nutmeg appear across documented versions. They define aroma without forming one compulsory national blend.' },
    { name: 'Yoghurt · marinade', role: 'Yoghurt can tenderise chicken and carry ground spice, garlic, shallot and ginger. Milk is an allergen; other marinades exist, so dairy-free status must be checked rather than inferred.' },
    { name: 'Stock · cooking fat', role: 'Chicken stock, rendered fat or vegetable oil can season the rice. Cubes, powders and premixes may contain wheat, milk, soy or non-halal ingredients that are invisible after cooking.' },
    { name: 'Fried shallots', role: 'Crisp shallots add sweetness and texture at service. Commercial or shared-fryer versions can introduce wheat, milk, soy, peanut or cross-contact depending on coating and oil.' },
    { name: 'Green sauce · cool sides', role: 'A separate coriander- or mint-led chilli sauce can include ginger, garlic, vinegar or lime, sugar and salt. Cucumber and tomato cool the plate; every sauce formula and garnish remains vendor-specific.' },
  ],
  allergenCopy: 'Milk can enter through yoghurt or another chicken marinade. Wheat/gluten, soy or milk may occur in stock cubes, spice blends, premixed sauce and fried shallots; shared fryers, grinders, spoons and rice cookers add cross-contact. Rice and whole spices alone do not prove the finished plate gluten-free. Ask about marinade, stock, spice mix, sauce, shallots and shared preparation.',
  vegetarianCopy: 'Standard Khao Mok Gai is built around chicken and usually chicken stock, so it is neither vegetarian nor vegan. A vegetable “khao mok” adaptation needs a genuinely plant-based stock, marinade, sauce and clean equipment. Thai-Muslim heritage makes halal context important but does not certify every plate: verify the current halal mark or accountable chicken source, stock, dairy, seasonings, alcohol-containing flavourings and shared kitchen.',
  formats: [
    { title: 'Thai-Muslim specialist', bestFor: 'Understanding the dish in a kitchen that can explain the rice, chicken, spice, green sauce and its own halal controls.', tradeOff: 'Muslim ownership, a halal logo and formal certification are not identical claims. Check the current evidence you require, opening status and exact plate rather than relying on online labels alone.' },
    { title: 'Market or food court', bestFor: 'A quick plate where you can inspect chicken cut, rice texture, fried shallot and whether sauce and broth are separate.', tradeOff: 'Shared ladles, stock, fryers and counters may serve several dishes. Ask before ordering if dairy, gluten, soy, halal handling or chilli control matters.' },
    { title: 'Home or spice mix', bestFor: 'Following one complete tested method or a current labelled mix when you want control over chicken, stock, dairy and sauce.', tradeOff: 'A spice packet is not the whole dish. Read the current local label, allergen statement, halal mark, chicken and rice instructions; do not substitute its timings into another recipe.' },
  ],
  orderSteps: [
    { title: 'Verify the kitchen and chicken', text: 'Ask for Khao Mok Gai / ข้าวหมกไก่, then check current halal certification or the ingredient-and-handling evidence you need. Confirm chicken, stock, marinade, spice mix and shared equipment rather than judging the rice colour.' },
    { title: 'Read the complete plate', text: 'Choose the available chicken cut and portion, and check whether fried shallots, cucumber, tomato, broth or another garnish are included. Ask about dairy, wheat, soy and the fryer before anything is removed or added.' },
    { title: 'Taste the sauce separately', text: 'Try the spiced rice and chicken first, then add the green herb sauce gradually. It can be much hotter and sharper than the rice. Confirm whether a sweeter chilli sauce or a lower-chilli option is actually available.' },
  ],
  cooking: {
    title: 'Toast. Marinate. Sear. Cook rice and chicken together.',
    intro: 'Khao Mok Gai coordinates a spice blend, marinated raw chicken, measured rice and liquid, fried shallots and a fresh sauce. A complete tested method matters because chicken moisture, rice variety, pot and heat all change the safe timing and grain texture.',
    steps: ['Choose one complete tested Khao Mok Gai method. Map rice type, chicken size, spice blend, marinade, stock, fried shallots, green sauce, allergens and halal requirements before shopping.', 'Toast and grind only the measured whole spices in the tested method. Keep a separate, labelled grinder or clean it to the standard required for allergens and halal preparation.', 'Marinate raw chicken under refrigeration for the stated method time. Keep chicken, marinade, hands, boards and utensils away from cucumber, herbs, sauce equipment and cooked food.', 'Sear or otherwise colour the chicken exactly as directed without treating browning as proof of doneness. Coat the rinsed, well-drained rice with the measured spice and marinade mixture.', 'Add the tested amount of stock, arrange the chicken and cook under controlled heat until both rice and chicken meet the recipe’s safe endpoint. Verify poultry is steaming hot and cooked through; do not rely on the yellow colour or one generic timer.', 'Rest and fluff the rice with clean tools. Serve with fully cooked chicken, fried shallots, cucumber and separately prepared green sauce, then follow the complete method and current food-safety guidance for cooling, refrigeration and reheating.'],
    boundary: 'Chicken cut, bone, marinade, rice variety, stock concentration and cooker all alter liquid and time. The UK Food Standards Agency says poultry should be steaming hot and cooked through, with no pink meat and clear juices, or use an appropriate validated time-and-temperature combination. Follow one complete tested recipe for quantities and storage; Recipe schema is deliberately absent.',
  },
  affiliates: [
    { href: '/go/simple-thai-food-cookbook/', title: 'Simple Thai Food', text: 'A tested Thai cookbook can provide exact spice, marinade, stock and rice quantities that this traveller guide should not invent. Check whether Khao Mok Gai is included in the current contents, then compare edition, format, seller, price and delivery.' },
    { href: '/go/thai-granite-mortar-eight-inch/', title: 'Eight-inch granite mortar', text: 'Useful when a complete method asks you to crush toasted whole spices, garlic, ginger or coriander root. Check usable interior, weight, worktop protection and allergen cleaning; a spice grinder may suit a fine dry blend better.' },
  ],
  classHref: withSubId(KLOOK_GENERIC, 'en-khao-mok-gai-thai-muslim-chicken-biryani-class'),
  classCopy: 'A relevant class can connect spice toasting, chicken marination, rice absorption and green-sauce balance with Thai-Muslim food context. Klook results are broad: confirm Khao Mok Gai—or a clearly relevant Thai-Muslim rice dish—is on the current menu and check halal handling, participation, language and cancellation terms before booking.',
  classSignals: [
    { title: 'Spice structure', text: 'Compare warm whole spices, turmeric or saffron and fresh aromatics without reducing the dish to one curry powder.' },
    { title: 'Rice and chicken', text: 'See how one tested method accounts for raw-chicken moisture, stock and rice absorption in the same pot.' },
    { title: 'Green contrast', text: 'Taste the fresh herb, acid, sugar and chilli sauce separately from the aromatic rice and map its allergen and halal ingredients.' },
  ],
  faqs: [
    { question: 'What is Khao Mok Gai?', answer: 'Khao Mok Gai is Thailand’s chicken-biryani expression: fragrant yellow spiced rice cooked with marinated chicken, commonly served with fried shallots, cucumber and a separate green herb-chilli sauce. Recipes and accompaniments vary across Thai-Muslim communities, stalls and homes.' },
    { question: 'What is Khao Mok Gai in English?', answer: 'It is usually translated as Thai chicken biryani or Thai-style chicken biryani. That description communicates the spiced rice-and-chicken family, but the Thai plate, green sauce, local spice balance and Thai-Muslim context give it its own identity.' },
    { question: 'What does Khao Mok mean?', answer: 'Khao means rice. Mok conveys covering, burying or cooking together, which fits the rice-and-meat method associated with biryani-style dishes. Gai means chicken. Transliteration varies, so Kao Mok Gai and Khao Mok Kai can point to the same dish.' },
    { question: 'What is Khao Mok Gai made of?', answer: 'Common signals include long-grain rice, chicken, turmeric or saffron, coriander, cumin, cinnamon, cardamom, clove, pepper, garlic, shallot, ginger, stock and possibly yoghurt. Fried shallots, cucumber, tomato, broth and green herb-chilli sauce vary rather than forming one compulsory formula.' },
    { question: 'What does Khao Mok Gai taste like?', answer: 'The rice is savoury, warm-spiced and aromatic rather than automatically very hot. Chicken and stock add richness, fried shallots add sweet crunch and the separate green sauce adds fresh herbs, acid and chilli. Sauce strength and spice blend vary by cook.' },
    { question: 'Is Khao Mok Gai spicy?', answer: 'The rice is often mild to gently spiced, although pepper and chilli can vary. The green dipping sauce may be substantially hotter. Ask for sauce separately, taste a little first and confirm whether the rice or marinade already contains chilli when avoiding heat.' },
    { question: 'Is Khao Mok Gai halal?', answer: 'It has strong Thai-Muslim culinary associations and is often sold by halal specialists, but the name alone is not certification. Verify the current halal mark or the evidence you require for chicken source, stock, dairy, spice mix, sauce, alcohol-containing flavourings and shared kitchen handling.' },
    { question: 'Is Khao Mok Gai gluten-free?', answer: 'Not automatically. Rice and whole spices can be gluten-free, but stock cubes, premixed spice, soy-containing seasoning, bottled sauce, fried shallot coatings and shared equipment may introduce wheat or cross-contact. Check the exact ingredients and process.' },
    { question: 'What is the difference between Khao Mok Gai and biryani?', answer: 'Khao Mok Gai belongs to the broad biryani family but is a Thai expression shaped by local ingredients, Thai-Muslim communities and familiar service with green sauce, cucumber and fried shallots. Indian, Pakistani, Bangladeshi, Malaysian and Thai biryanis each contain regional and household variation; none is the single universal original recipe.' },
    { question: 'What is the difference between Khao Mok Gai and Khao Man Gai?', answer: 'Khao Mok Gai cooks marinated chicken with golden aromatic spiced rice and commonly adds green herb sauce. Khao Man Gai is Thailand’s Hainanese-influenced chicken rice: usually poached chicken, broth-and-fat rice, cucumber, clear soup and a fermented-soybean ginger-chilli dip. Their colours, techniques and histories differ.' },
  ],
  related: [
    { title: 'Khao Man Gai', description: 'Compare Thailand’s Hainanese-influenced poached chicken rice, its broth rice and fermented-soybean sauce.', href: '/food/khao-man-gai/', image: '/images/redesign/khao-man-gai-thai-chicken-rice-hero.webp' },
    { title: 'Gai Tod Hat Yai', description: 'Continue south to a distinct fried-chicken owner with crisp shallot, coriander seed and sticky-rice choices.', href: '/food/gai-tod-hat-yai/', image: '/images/food/gai-tod-hat-yai.webp' },
    { title: 'Halal food in Thailand', description: 'Use the wider travel guide for certification, ingredient questions and city-level Muslim dining context.', href: '/blog/halal-food-thailand-guide/', image: '/images/blog/halal-food-thailand-guide.webp' },
  ],
  sources: [
    { title: 'Thai Chicken Biryani (Kao Mok Gai)', creator: 'Hot Thai Kitchen', url: 'https://hot-thai-kitchen.com/kao-mok-gai/', note: 'Current DFS summary parse and live source used for Thai-biryani identity, Thai-Muslim context, whole-spice blend, yoghurt-marinated chicken, jasmine rice, fried shallot, cucumber, tomato, green herb sauce and one tested preparation sequence. Recipe quantities and storage claims were excluded.' },
    { title: 'Southern Thai Cuisine', creator: 'Thailand Foundation', url: 'https://thailandfoundation.or.th/?p=527684', note: 'Complete DFS parse used for southern maritime-trade context, Indian, Malay, Chinese and wider Southeast Asian culinary influence, non-sticky rice and explicit Khao Mok Gai recognition.' },
    { title: 'Chicken Biryani with Green Chili Sauce', creator: 'Thailand Foundation', url: 'https://thailandfoundation.or.th/culture_heritage/chicken-biryani-with-green-chili-sauce/', note: 'Current shallow DFS capture used only to corroborate the owned dish and green-sauce pairing; no missing recipe or origin detail was inferred.' },
    { title: 'Halal Dining in Thailand', creator: 'MICHELIN Guide', url: 'https://guide.michelin.com/en/article/features/halal-dining-in-thailand', note: 'Current live zero-markdown capture used for Thai-Muslim context, yellow rice from warm spice and turmeric or saffron, chicken or beef variation, fried shallot and green-herb or sweet-chilli accompaniments. Named restaurants and permanent certification were excluded.' },
    { title: 'Cooking your food', creator: 'UK Food Standards Agency', url: 'https://www.food.gov.uk/safety-hygiene/cooking-your-food', note: 'Current primary guidance used for safe poultry cooking and raw-to-ready separation rather than invented universal cooking times.' },
    { title: 'Allergen guidance for food businesses', creator: 'UK Food Standards Agency', url: 'https://www.food.gov.uk/business-guidance/allergen-guidance-for-food-businesses', note: 'Current primary guidance used for milk, wheat, soy and cross-contact boundaries. Rice colour and Muslim culinary heritage are not treated as dietary or certification evidence.' },
  ],
  methodDescription: 'Updated 28 July 2026 after two independent DataForSEO clusters with five raw keyword records and 35 competitor domains, ten current UK-English SERPs with 72 organic results, 59 genuine People Also Ask appearances and 41 case-normalised unique questions, two useful DFS source parses, one shallow Thailand Foundation dish capture, one current zero-markdown Michelin capture, one explicitly non-citable institutional parse reviewed but excluded as evidence, current primary FSA cooking, rice-safety and allergen guidance, plus exact owner ranking and backlink checks. DFS returned UK volume 70 and KD 0 for the exact head term and volume 10 for Thai chicken biryani; the owner has zero ranking terms and no reportable backlink summary signal. Khao Man Gai, Hat Yai fried chicken, Massaman, generic global biryani, recipe-only, nutrition and restaurant-near-me intent remain independent. Fixed-price, calorie, health, automatic halal/gluten-free/dairy-free/mildness, permanent-restaurant, universal-shelf-life, single-origin, compulsory-spice and one-formula claims were excluded; Recipe schema is deliberately absent.',
};

export function KhaoMokGaiGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
