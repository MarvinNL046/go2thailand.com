import { ChefHat, Leaf, MapPin, ShoppingBasket, Sparkles, UtensilsCrossed } from 'lucide-react';
import { KLOOK_GENERIC, withSubId } from '../../lib/affiliates';
import { DishEditorialTemplate, type DishEditorialData } from './DishEditorialTemplate';

const data: DishEditorialData = {
  title: 'Gai Tod Hat Yai: Hat Yai Fried Chicken Guide',
  description: 'Understand Gai Tod Hat Yai: thin crisp chicken, fried shallots, sticky rice, taste, marinade, gluten and halal checks, ordering and safe home cooking.',
  canonical: 'https://go2-thailand.com/food/gai-tod-hat-yai/',
  updatedAt: '28 July 2026',
  name: 'Gai Tod Hat Yai',
  thaiName: 'ไก่ทอดหาดใหญ่ · Hat Yai fried chicken',
  heroImage: '/images/redesign/gai-tod-hat-yai-fried-chicken-hero.webp',
  heroAlt: 'Golden Hat Yai-style bone-in fried chicken with a thin crisp coating, fried shallots, sticky rice and sweet chilli sauce',
  heroEyebrow: 'Southern street food · thin crisp shell · fried shallots',
  lead: 'Gai Tod Hat Yai is southern Thai fried chicken recognised less by a universal spice mix than by marinated chicken, a relatively thin crisp shell, fried shallots and a sticky-rice pairing. Garlic, coriander root or stems, pepper, soy or fish sauce and sugar are familiar. Cumin, coriander seed, coconut milk, coating and dipping sauce depend on the cook—so the smartest order starts with the fryer and marinade.',
  quickFacts: [
    { label: 'Identity', value: 'Chicken · fried shallots', icon: UtensilsCrossed },
    { label: 'Texture', value: 'Thin crisp · juicy centre', icon: Sparkles },
    { label: 'Pairing', value: 'Sticky rice · sauce optional', icon: Leaf },
    { label: 'Check', value: 'Soy · wheat · fish · fryer', icon: ShoppingBasket },
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
    intro: 'The chicken should taste seasoned through the meat rather than relying on a heavy outer crust. Garlic, coriander root or stems and pepper create an aromatic savoury base; soy, fish sauce, salt and sugar vary the balance. Fried shallots add a sweet, toasted top note. Chilli usually comes through sauce or a vendor variation, not necessarily the chicken.',
    texture: 'Expect crisp skin or a thin rice-flour shell rather than thick jagged breadcrumbs. Bone-in thighs, drumsticks and wings stay different in juiciness and handling. The shallots should be brittle and light, while sticky rice provides chew beside the fried surface.',
    finish: 'Pepper, garlic and salty umami remain after the first crunch, followed by sweet fried shallot. Cumin or coriander seed can add warm spice in some recipes; coconut milk can round a marinade but is not compulsory. Sauce changes the finish from savoury to sweet-hot.',
    scores: [{ label: 'Savoury depth', value: 5 }, { label: 'Aromatic spice', value: 4 }, { label: 'Crisp shell', value: 5 }, { label: 'Chilli heat', value: 1 }],
  },
  ingredients: [
    { name: 'Bone-in chicken', role: 'Thighs, drumsticks, whole wings and breast all appear. Cut, skin, size, brining and supplier vary; browned skin does not prove that the thickest meat beside the bone is safely cooked.' },
    { name: 'Garlic', role: 'Garlic enters the marinade as a pounded aromatic and survives beneath the crust. Quantity and fresh-versus-paste handling vary; commercial paste may add oil, acid, salt or preservatives.' },
    { name: 'Coriander root · stems', role: 'Root or sturdy stems bring earthy citrus aroma to familiar marinades. Leaf garnish is not a substitute and is not required; shared mortar handling matters for allergens.' },
    { name: 'Pepper · spice branch', role: 'White or black pepper is familiar. Cumin and coriander seed appear in documented versions but are explicitly absent from another Hat Yai-born cook’s family style, so they are options rather than an authenticity test.' },
    { name: 'Soy · fish sauce · salt', role: 'Soy sauce, sweet soy, fish sauce or salt season different marinades. Soy and fish are allergens; regular soy and sweet soy can contain wheat, and brand or kitchen substitutions change the answer.' },
    { name: 'Sugar · coconut variation', role: 'Sugar can round salt and help colour the crust. Coconut milk appears in one current southern-Thai expression but not in two other documented formulas, so dairy-free or coconut-free status requires a direct check.' },
    { name: 'Rice flour · coating', role: 'Rice flour supports the characteristic light crust, sometimes mixed into the marinade. Wheat flour, starch, baking powder, egg or a commercial premix can replace or join it, and shared fryers defeat visual assumptions.' },
    { name: 'Shallot · frying oil', role: 'Crispy fried shallots are the strongest Hat Yai identity signal across the sources. Fresh or packaged shallots, frying oil, shared fryer use and storage affect allergens, halal handling, flavour and crispness.' },
  ],
  allergenCopy: 'Soy sauce can add soy and wheat; fish sauce adds fish. Coating or premix may add wheat/gluten, egg, milk, soy or raising agents. Packaged fried shallots, sweet chilli sauce, seasoning and a shared fryer can add further allergens or cross-contact. Rice flour and a visibly thin crust do not prove gluten-free status—verify marinade, coating, garnish, sauce and oil.',
  vegetarianCopy: 'The dish is not vegetarian or vegan because chicken is central; fish sauce can add another animal ingredient. It is not automatically halal because it comes from Hat Yai: verify the chicken source and current accountable certification plus every soy/fish sauce, sugar, flavouring, coating and shared fryer. A city, Muslim-owned claim or old product certificate is not enough on its own.',
  formats: [
    { title: 'Street-cart piece', bestFor: 'Choosing a hot drumstick, thigh or wing by sight, then adding the amount of crispy shallot and sticky rice you actually want.', tradeOff: 'Ask how recently it was fried, which cut you are buying, what enters the marinade and coating, whether the oil is shared and whether current halal evidence is available.' },
    { title: 'Sticky-rice set', bestFor: 'The clearest Hat Yai eating rhythm: seasoned chicken, chewy glutinous rice and fried shallot, with sauce or som tam as an optional contrast.', tradeOff: 'Confirm portion and sauce before assuming a fixed set. Sweet chilli, chilli vinegar or papaya salad changes sugar, heat, peanut, fish, crustacean and gluten checks.' },
    { title: 'Restaurant plate', bestFor: 'Comparing a plated interpretation with a named marinade, selected chicken cut and composed sides in a slower setting.', tradeOff: 'A thicker batter, coconut-milk marinade, cumin/coriander seed or chef sauce can be intentional variations. Verify rather than judging authenticity from one visual rule.' },
  ],
  orderSteps: [
    { title: 'Choose cut and moment', text: 'Ask for Gai Tod Hat Yai / ไก่ทอดหาดใหญ่ and select thigh, drumstick, wing, mixed pieces or a current set. Prefer a hot fresh batch and confirm whether bones and skin remain rather than expecting one standard portion.' },
    { title: 'Audit marinade and fryer', text: 'Check soy sauce, fish sauce, wheat, rice flour, egg, milk or coconut, premix and seasoning. Ask whether oil is shared with pork, seafood, wheat-coated food or other allergens and request current halal evidence when required.' },
    { title: 'Build the pairing', text: 'Add sticky rice and fried shallots, then choose sweet chilli sauce or som tam only if they suit your heat, sugar and allergen needs. Taste the seasoned chicken before covering it in sauce.' },
  ],
  cooking: {
    title: 'Marinate cold. Coat thin. Fry to a safe centre.',
    intro: 'A reliable sequence protects flavour and poultry safety without pretending every cut needs one time or temperature. Keep the tested marinade cold, prevent raw-chicken spread and treat oil control and doneness as separate decisions.',
    steps: ['Choose one complete tested Hat Yai fried-chicken method. Decide chicken cuts, marinade, coating, shallots, oil, sauce, rice and every allergen or halal substitution before raw poultry enters the workspace.', 'Pound aromatics with clean equipment, combine the tested marinade and keep the chicken covered under refrigeration for the specified period. Do not reuse raw marinade as a serving sauce unless the complete method makes it safe.', 'Separate raw chicken, marinade and coating tools from cooked rice, fried shallots, sauce and serving plates. Wash hands and sanitise boards, bowls, tongs and work surfaces thoroughly.', 'Prepare the shallots and rice by the complete method. If oil is reused between shallots and chicken, decide the allergen and halal boundary before frying and keep ready-to-eat garnish away from raw-chicken tools.', 'Apply the specified light coating and fry in batches with suitable equipment. Control oil according to the tested method; colour, crispness and floating are not sufficient proof of safe poultry doneness.', 'Verify the thickest meat—especially beside bone—is safely cooked using current food-safety guidance, drain with clean tools and serve promptly. Follow the complete method for cooling, storage and reheating leftovers.'],
    boundary: 'Cut, thickness, bone, starting temperature, coating and fryer load change the endpoint. Use one complete tested method and current food-safety guidance. This editorial page deliberately gives no universal fry time, oil temperature, internal temperature, shelf life or Recipe schema.',
  },
  affiliates: [
    { href: '/go/simple-thai-food-cookbook/', title: 'Simple Thai Food', text: 'A tested Thai cookbook can give exact marinade, coating, oil and poultry steps that this traveller owner should not invent. Check whether Hat Yai fried chicken or a comparable Thai fried-chicken method is in the current contents, then compare edition, format, seller, price and delivery.' },
    { href: '/go/thai-granite-mortar-eight-inch/', title: 'Eight-inch granite mortar', text: 'Useful when a complete method asks you to pound pepper, garlic and coriander root or stems into a marinade paste. Check usable interior, weight, worktop protection and raw-poultry/allergen cleaning; a small processor may suit the tested method better.' },
  ],
  classHref: withSubId(KLOOK_GENERIC, 'en-gai-tod-hat-yai-fried-chicken-food-class'),
  classCopy: 'A relevant southern Thai cooking class or Hat Yai food experience can show the difference between a thin rice-flour shell and generic fried chicken. Klook results are broad: confirm the current menu or stops include Gai Tod Hat Yai and check hands-on participation, fryer sharing, halal evidence, allergens, language and cancellation terms.',
  classSignals: [
    { title: 'Marinade architecture', text: 'Compare stable garlic, coriander and pepper signals with the cook’s optional seed spices, sauces or coconut.' },
    { title: 'Crust and oil', text: 'See how one tested method builds a light coating, controls batch load and separates raw from cooked tools.' },
    { title: 'Hat Yai service', text: 'Learn how fried shallots, sticky rice and optional sauce turn a chicken piece into the regional eating experience.' },
  ],
  faqs: [
    { question: 'What is Gai Tod Hat Yai?', answer: 'Gai Tod Hat Yai is Hat Yai-style southern Thai fried chicken: marinated chicken with a relatively thin crisp coating or skin, strongly associated with crispy fried shallots and commonly served with sticky rice. Marinade, chicken cut, coating and sauce vary.' },
    { question: 'What does Gai Tod Hat Yai mean?', answer: 'Gai means chicken, tod means fried and Hat Yai is the southern Thai city associated with the style. English spellings include Kai Tod, Gai Thod, Had Yai and Hat Yai fried chicken.' },
    { question: 'What does Hat Yai fried chicken taste like?', answer: 'Expect seasoned savoury chicken with garlic, coriander root or stems and pepper, a light crisp shell and sweet-toasted fried shallot. Soy sauce, fish sauce, sugar and optional cumin, coriander seed or coconut milk shift salt, warmth and sweetness.' },
    { question: 'What is in Gai Tod Hat Yai?', answer: 'Chicken, garlic, coriander root or stems, pepper, salty seasoning, sugar, rice flour, oil and fried shallots are familiar signals. Soy or fish sauce, cumin, coriander seed, coconut milk, wheat flour, egg, baking powder, chilli sauce and sticky rice vary.' },
    { question: 'Why is Hat Yai fried chicken famous?', answer: 'It combines flavourful marinated meat, a lighter crisp shell, fried shallots and sticky rice in a practical street-food format. It began as a Hat Yai style and spread across Thailand, but “best in the world” remains personal opinion rather than a verifiable owner claim.' },
    { question: 'Is Gai Tod Hat Yai spicy?', answer: 'The chicken itself is often aromatic and peppery rather than chilli-hot, but recipes and vendors vary. Sweet chilli sauce, chilli powder or som tam can add substantial heat. Ask whether chilli is in the marinade, coating, garnish or side.' },
    { question: 'Is Hat Yai fried chicken gluten-free?', answer: 'Not automatically. Rice flour is common, but soy sauce, sweet soy, wheat flour, premix, baking powder, packaged shallots, sauce and shared fryer oil may introduce wheat or cross-contact. Verify the full process.' },
    { question: 'Is Hat Yai fried chicken halal?', answer: 'Not automatically. Hat Yai has major Muslim and Thai-Malay food traditions, but the name does not certify a vendor. Check current accountable halal certification, chicken source, sauces, seasoning, marinade, oil and shared equipment.' },
    { question: 'What is the difference between Gai Tod Hat Yai and Khao Man Gai Tod?', answer: 'Gai Tod Hat Yai is the regional fried-chicken style identified by its marinade, light shell and fried shallots, usually with sticky rice. Khao Man Gai Tod is crispy chicken inside a Thai chicken-rice plate with seasoned rice, soup and a separate sauce system.' },
    { question: 'How do you eat Gai Tod Hat Yai?', answer: 'Tear off chicken and eat it with small pinches of sticky rice and fried shallot. Dip lightly in sweet chilli sauce if offered, or pair it with som tam for freshness and heat. Use care around bones and ask about the current marinade, fryer and halal controls first.' },
  ],
  related: [
    { title: 'Khao Man Gai', description: 'Compare poached or crispy Thai chicken rice with its separate rice, soup and sauce architecture.', href: '/food/khao-man-gai/', image: '/images/redesign/khao-man-gai-thai-chicken-rice-hero.webp' },
    { title: 'Khao Mok Gai', description: 'Continue through southern chicken traditions with aromatic biryani-style rice and a distinct green sauce.', href: '/food/khao-mok-gai/', image: '/images/redesign/khao-mok-gai-thai-chicken-biryani-hero.webp' },
    { title: 'Hat Yai guide', description: 'Build a city route around markets, southern food, transport and the Thai-Malay character behind the dish.', href: '/city/hat-yai/', image: '/images/redesign/hat-yai-destination-hero.webp' },
  ],
  sources: [
    { title: 'Thai Fried Chicken Recipe – Hat Yai Style', creator: 'Hot Thai Kitchen', url: 'https://hot-thai-kitchen.com/hat-yai-fried-chicken/', note: 'Complete DFS parse from a Hat Yai-born specialist used for thin crust, fried shallots, sticky rice, garlic/coriander/pepper, soy/fish sauce, rice flour and non-universal seed spices. Superlatives, quantities, times and temperatures were excluded.' },
    { title: 'Authentic Thai Recipe for Hat Yai Fried Chicken', creator: 'ThaiCookbook.tv', url: 'https://www.thaicookbook.tv/thai-recipes/main-dishes/hat-yai-fried-chicken/', note: 'Complete DFS parse used as an independent garlic, coriander-root, pepper, soy, rice-flour, fried-shallot and sticky-rice expression. Ratings, quantities and fixed timings were excluded.' },
    { title: 'Southern Thai Fried Chicken (Gai Tod Hat Yai)', creator: 'Epicurious', url: 'https://www.epicurious.com/recipes/food/views/southern-thai-fried-chicken-gai-tod-hat-yai', note: 'Complete DFS parse used for a current cumin/coriander-seed, fish/soy sauce, coconut-milk, rice-flour and baking-powder variation plus optional shallots and sauce. Recipe quantities were not transferred.' },
    { title: 'Hat Yai Guidebook', creator: 'Prince of Songkla University', url: 'https://cdd2020.pharmacy.psu.ac.th/images/hatyai_guidebook.pdf', note: 'Current live zero-markdown PDF capture used narrowly for local food context and one crispy-outside, soft-inside, fried-shallot vendor expression. Venue hours, prices and permanence were excluded.' },
    { title: 'Hat Yai Fried Chicken product record', creator: 'Central Islamic Council of Thailand', url: 'https://halalthai.or.th/en/product/detail/566094', note: 'Current shallow official capture used only to show that halal certification is product-, company- and expiry-specific. The record does not certify this dish family or any recommended vendor.' },
    { title: 'Allergen guidance for food businesses', creator: 'UK Food Standards Agency', url: 'https://www.food.gov.uk/business-guidance/allergen-guidance-for-food-businesses', note: 'Current primary guidance used for soy, wheat, fish, milk, egg and shared-fryer boundaries rather than automatic gluten-free or dairy-free claims.' },
    { title: 'Cooking your food', creator: 'UK Food Standards Agency', url: 'https://www.food.gov.uk/safety-hygiene/cooking-your-food', note: 'Current primary guidance used for raw-poultry separation and safe cooking without inventing one universal fry time, temperature or shelf life.' },
  ],
  methodDescription: 'Updated 28 July 2026 after two DataForSEO clusters with 24 raw keyword records and 68 competitor-domain records, ten current UK-English SERPs with 72 organic result appearances, 59 People Also Ask appearances and 45 case-normalised unique questions, three complete DFS source parses, one current zero-markdown Prince of Songkla University guide capture, one shallow official Central Islamic Council capture, current primary FSA allergen and cooking guidance, plus exact owner ranking and backlink checks. “Hat Yai fried chicken” returned UK volume 170 / KD 0 and “gai tod hat yai” volume 70 / KD 0; the owner has zero ranking terms and no reportable backlink summary signal. Generic Gai Tod, Khao Man Gai Tod, Gai Yang, Khao Mok Gai, other national fried-chicken families, restaurant, delivery, recipe-only, calorie, health and superlative intent remain independent. Fixed-price, calorie, health, automatic dietary/halal, permanent-restaurant, universal-heat/time/temperature/shelf-life, compulsory-spice/sauce/coating/cut/method, exact-inventor and one-formula claims were excluded; Recipe schema is deliberately absent.',
};

export function GaiTodHatYaiGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
