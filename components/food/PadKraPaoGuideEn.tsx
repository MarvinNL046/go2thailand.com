import { ChefHat, Flame, Leaf, MapPin, ShoppingBasket, Sparkles, UtensilsCrossed } from 'lucide-react';
import { KLOOK_GENERIC, withSubId } from '../../lib/affiliates';
import { DishEditorialTemplate, type DishEditorialData } from './DishEditorialTemplate';

const data: DishEditorialData = {
  title: 'Pad Kra Pao: Ingredients, Holy Basil & How to Order It',
  description: 'Know Pad Kra Pao before you order: holy basil, ingredients, taste, spice, pork or chicken, kai dao, sauces, vegetarian checks and cooking sequence.',
  canonical: 'https://go2-thailand.com/food/pad-krapow/',
  updatedAt: '28 July 2026',
  name: 'Pad Kra Pao',
  thaiName: 'ผัดกะเพรา',
  heroImage: '/images/redesign/pad-kra-pao-bangkok-hero.webp',
  heroAlt: 'Pad Kra Pao with minced pork, holy basil, red chilli, jasmine rice and a crisp-edged Thai fried egg beside a Bangkok shophouse wok',
  heroEyebrow: 'Holy basil · hot wok · made to order',
  lead: 'Pad Kra Pao — also written Pad Krapow, Pad Kaprao or Pad Gaprao — is a fast holy-basil stir-fry served with rice. Choose the protein, tell the cook how much chilli you want and add a crisp-edged kai dao if it suits you; the exact sauce and heat still belong to that kitchen.',
  quickFacts: [
    { label: 'Thai name', value: 'Phat kaphrao', icon: UtensilsCrossed },
    { label: 'Core herb', value: 'Holy basil · bai kaphrao', icon: Leaf },
    { label: 'Heat', value: 'Usually chilli-led; ask', icon: Flame },
    { label: 'Classic extra', value: 'Kai dao · fried egg', icon: MapPin },
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
    intro: 'Garlic, chilli and savoury seasoning arrive first; holy basil gives the finish a peppery, clove-like lift. Sugar may round the sauce, but Pad Kra Pao should not be reduced to one sweet, salty or fiery formula.',
    texture: 'The stir-fry is loose enough to season rice, not a coconut curry and not a dry pile of meat. Finely chopped or sliced protein, wilted basil and a fresh fried egg create the useful contrast.',
    finish: 'Holy basil and chilli linger after the salty-savoury wok sauce. A runny or soft yolk can mellow the heat, while a fully cooked egg changes texture rather than the identity of the dish.',
    scores: [{ label: 'Savoury', value: 5 }, { label: 'Basil', value: 4 }, { label: 'Hot', value: 4 }, { label: 'Sweet', value: 1 }],
  },
  ingredients: [
    { name: 'Holy basil', role: 'Bai kaphrao is the defining herb. Its peppery aroma differs from Thai sweet basil, though kitchens and home cooks sometimes substitute when supply is limited.' },
    { name: 'Garlic', role: 'Pounded or chopped with chilli, it forms the aromatic base. Amount and browning vary, so visible garlic is a clue rather than a fixed measurement.' },
    { name: 'Fresh chilli', role: 'Thai chillies commonly drive the heat. Type, number and whether a sauce is premixed determine how far a cook can reduce it.' },
    { name: 'Pork, chicken or another base', role: 'Minced pork and chicken are familiar; beef, seafood, crispy pork, tofu and mushrooms also appear. No one protein defines every plate.' },
    { name: 'Oyster sauce', role: 'Common in many current recipes and restaurant sauces, but not universal. It is a shellfish and vegetarian check, not something to infer from appearance.' },
    { name: 'Fish and soy sauces', role: 'Common sources of salt and savoury depth. Soy sauces may contain wheat; fish sauce means a meat-free-looking plate is not automatically vegetarian.' },
    { name: 'Jasmine rice', role: 'The usual carrier catches the concentrated wok sauce. Confirm that rice is included when ordering a dish rather than a rice plate.' },
    { name: 'Kai dao', role: 'A Thai-style fried egg is a popular extra, often with crisp bubbly edges. It is common but optional, and the yolk can be cooked to different levels.' },
  ],
  allergenCopy: 'Oyster sauce, fish sauce, soy sauce, seasoning sauce and premixed wok sauce are the main hidden checks. Soy may bring wheat; oyster sauce may bring mollusc ingredients, and the egg is separate but often fried in shared oil. For a serious allergy or coeliac need, confirm each bottle, stock or powder plus the wok, utensils and fryer rather than trusting a rice-based plate.',
  vegetarianCopy: 'Pad Kra Pao is not vegetarian or vegan by default. Tofu or mushrooms can still be cooked with oyster sauce, fish sauce, meat seasoning or a shared premix. Ask for a confirmed plant-based sauce and base, no egg for vegan orders and suitable shared-preparation controls; “no meat” alone is not enough.',
  formats: [
    { title: 'Ahan tam sang stall', bestFor: 'A freshly cooked rice plate where protein, chilli and kai dao can often be chosen in one short order.', tradeOff: 'A premixed sauce can limit dietary changes, and busy stalls may share woks, spatulas, oil and seasoning bottles.' },
    { title: 'Food court or restaurant', bestFor: 'Reading an English menu, comparing versions and asking ingredient questions before committing.', tradeOff: 'A polished menu does not prove holy basil, low heat or allergen-safe sauce; ask the kitchen, not the photograph.' },
    { title: 'Home or class', bestFor: 'Learning how garlic, chilli, sauce, protein and basil enter the wok in sequence.', tradeOff: 'Holy basil supply, stove power and sauce brands change the result; use a tested recipe for exact quantities and safety.' },
  ],
  orderSteps: [
    { title: 'Choose the base', text: 'Order moo for pork, gai for chicken or the available beef, seafood or confirmed plant-based option. Ask about the complete sauce if diet or allergy matters.' },
    { title: 'Set heat and egg', text: 'Say how much chilli you want before the wok starts and add kai dao if desired. “Not spicy” may be limited when a sauce or chilli-garlic base is already prepared.' },
    { title: 'Confirm the plate', text: 'Check whether jasmine rice is included, then taste before adding prik nam pla or more chilli. Egg doneness and condiments are separate choices.' },
  ],
  cooking: {
    title: 'Prepare. Pound. Sear. Sauce. Basil. Serve.',
    intro: 'Speed comes from preparation, not improvisation. A tested recipe should have the protein, sauce and rice ready before garlic and chilli hit the pan; holy basil is folded in at the end so its aroma is not cooked away.',
    steps: ['Choose a tested recipe, identify every sauce ingredient and cook or hold the rice safely.', 'Prepare the protein and any confirmed substitute, keeping raw ingredients and utensils separate.', 'Pound or chop garlic and chilli to the texture and heat specified by the recipe.', 'Stir-fry the aromatic base and protein over the heat your pan and stove can safely sustain.', 'Add the measured sauce and reduce only as directed; do not guess with salty concentrates.', 'Turn down or remove the heat, wilt in holy basil, then serve immediately with rice and the chosen egg.'],
    boundary: 'Protein size, stove power, pan material, sauce concentration and chilli strength move both timing and seasoning. Use a tested recipe for quantities, safe internal temperatures, frying, storage and reheating. No Recipe schema is used because Go2Thailand has not independently tested and republished those measurements.',
  },
  affiliates: [
    { href: '/go/simple-thai-food-cookbook/', title: 'Simple Thai Food', text: 'A broad Thai cooking reference can place wok seasoning, holy basil and made-to-order dishes in context. Compare the current edition, format, seller and delivery details.' },
    { href: '/go/thai-granite-mortar-eight-inch/', title: 'Eight-inch granite mortar', text: 'A stable mortar can bruise garlic and chilli without turning the task into a gadget collection. Check current weight, usable interior, care instructions and worktop protection.' },
  ],
  classHref: withSubId(KLOOK_GENERIC, 'en-pad-kra-pao-thailand-cooking-class'),
  classCopy: 'A relevant Thai cooking class can demonstrate ingredient preparation, sauce balance, high-heat sequencing and the difference between holy and sweet basil. Klook results are broad: confirm Pad Kra Pao is on the current menu and how substitutions or allergies are handled.',
  classSignals: [
    { title: 'Herb check', text: 'Ask which basil is used and learn to identify it before it wilts into the stir-fry.' },
    { title: 'Wok sequence', text: 'Look for preparation and timing rather than a promise that every home stove creates restaurant heat.' },
    { title: 'Sauce boundary', text: 'Read oyster, fish and soy labels before a vegetarian or gluten-free substitution is accepted.' },
  ],
  faqs: [
    { question: 'What is Pad Kra Pao?', answer: 'Pad Kra Pao is a Thai made-to-order stir-fry built around holy basil, garlic, chilli, savoury seasoning and a chosen protein or substitute. It is commonly served over jasmine rice, with a Thai-style fried egg as a popular optional extra.' },
    { question: 'What does “Pad Kra Pao” actually mean?', answer: 'Pad or phat refers to stir-frying and kaphrao refers to holy basil. English spellings vary — Pad Kra Pao, Pad Krapow, Pad Kaprao and Pad Gaprao can all point to the same dish. The Thai script ผัดกะเพรา removes the spelling ambiguity.' },
    { question: 'What does Pad Kra Pao taste like?', answer: 'A familiar plate is savoury, garlic-forward, chilli-hot and aromatic from holy basil, with a small amount of sweetness in some sauces. Protein, sauce formula, basil supply and requested heat change the balance by kitchen.' },
    { question: 'What are the ingredients in Pad Kra Pao?', answer: 'Common signals are holy basil, garlic, fresh chilli, pork or chicken, oyster sauce, fish sauce, soy-based seasoning and rice. Other proteins, tofu or mushrooms occur, and a fried egg is common but optional. There is no universal restaurant formula.' },
    { question: 'Does Pad Kra Pao use holy basil?', answer: 'Holy basil — bai kaphrao — is the herb named by the dish and the intended aromatic signature. Thai sweet basil and Italian basil taste different. Substitutions happen when holy basil is unavailable, so ask rather than judging a dark cooked leaf from a distance.' },
    { question: 'Is Pad Kra Pao always spicy?', answer: 'It is normally chilli-led, but there is no fixed heat level. Ask before cooking for less chilli or mai phet. A vendor may have limited control when chilli, sauce or the stir-fry is premixed, so “not spicy” is never an automatic guarantee.' },
    { question: 'Is Pad Kra Pao beef or pork?', answer: 'Neither is compulsory. Pork and chicken are common, while beef, seafood, crispy pork, tofu and mushrooms also appear. Specify the version you want and confirm the sauce rather than assuming a plant-based base makes the whole plate vegetarian.' },
    { question: 'Does Pad Kra Pao come with a fried egg?', answer: 'Kai dao is a very popular addition but not mandatory everywhere and may cost extra. Thai-style versions often have crisp bubbly edges. Ask for the egg and state your preferred doneness if that matters.' },
    { question: 'Does Pad Kra Pao contain oyster or fish sauce?', answer: 'Many versions use oyster sauce, fish sauce, soy sauce or a combination, but formulas vary. These ingredients matter for shellfish, fish, soy, wheat, vegetarian and vegan boundaries. Ask what is in the actual premix and how the wok is shared.' },
    { question: 'Can Pad Kra Pao be vegetarian or vegan?', answer: 'Yes, but it needs more than swapping meat for tofu. Confirm a plant-based sauce without oyster or fish sauce, suitable stock or seasoning, no egg for vegan orders and acceptable shared preparation. Commercial sauce labels and vendor practice both matter.' },
  ],
  related: [
    { title: 'Thai street food guide', description: 'Choose a busy made-to-order stall, understand the meal format and keep price claims current.', href: '/thailand-street-food/', image: '/images/redesign/thailand-food-street-banner.webp' },
    { title: 'Thai food guide', description: 'Place holy-basil stir-fry beside curries, soups, noodles, salads and regional dishes.', href: '/food/', image: '/images/redesign/thailand-food-hub-hero.webp' },
    { title: 'Cooking classes in Thailand', description: 'Compare menu, market visit, hands-on time, class size and dietary support.', href: '/best-cooking-classes-in-thailand/', image: '/images/redesign/thailand-cooking-classes-hero-v2.webp' },
  ],
  sources: [
    { title: 'Pad Gaprao (Pad Kra Pao) Holy Basil Chicken Stir-Fry', creator: 'Hot Thai Kitchen', url: 'https://hot-thai-kitchen.com/holy-basil-stir-fry/', note: 'Full DFS parse used for spelling variants, made-to-order context, holy basil, protein choices, rice and the optional Thai-style fried egg.' },
    { title: 'The Only Pad Kra Pao Recipe You Need — Holy Basil Stir Fry', creator: 'Hot Thai Kitchen', url: 'https://hot-thai-kitchen.com/pad-kra-pao-anything/', note: 'Full DFS parse used for the dish-name meaning, sauce and chilli signals, tofu note, basil distinction and practical cooking sequence.' },
    { title: 'Global Recognition of Pad Krapao and Khanom Krok', creator: 'Thailand Foundation', url: 'https://thailandfoundation.or.th/thailand-foundation-celebrates-global-recognition-of-pad-krapao-thai-basil-stir-fry-and-khanom-krok-thai-coconut-pancakes-by-tasteatlas/', note: 'Institutional capture used for Thai culinary context and its linked rice, pork, basil and egg dish reference; ranking claims are not repeated as timeless fact.' },
  ],
  methodDescription: 'Updated 28 July 2026 after a 175-record DataForSEO cluster with 50 competitor domains, spelling comparison, ten current UK-English SERPs with 78 organic results, 57 People Also Ask appearances and 48 unique genuine questions, two full technique parses, Thailand Foundation captures and exact ranking/backlink checks for Pad Kra Pao, Pad See Ew and Larb. Four existing spelling and recipe-adjacent rankings remain on this canonical route. Restaurant-near-me, delivery-app, fixed-price, fixed-calorie, universal-health, exact-origin-decade, guaranteed-spice, automatic-vegetarian and unsupported national-dish claims were excluded.',
};

export function PadKraPaoGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
