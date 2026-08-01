import { ChefHat, Flame, Leaf, MapPin, ShoppingBasket, Sparkles, UtensilsCrossed } from 'lucide-react';
import { KLOOK_GENERIC, withSubId } from '../../lib/affiliates';
import { DishEditorialTemplate, type DishEditorialData } from './DishEditorialTemplate';

const data: DishEditorialData = {
  title: 'Pad See Ew: Wide Noodles, Sauce, Taste & How to Order',
  description: 'Understand Pad See Ew before ordering: wide rice noodles, sauce, Chinese broccoli, taste, spice, Pad Thai and Pad Kee Mao differences, gluten and vegetarian checks.',
  canonical: 'https://go2-thailand.com/food/pad-see-ew/',
  updatedAt: '28 July 2026',
  name: 'Pad See Ew',
  thaiName: 'ผัดซีอิ๊ว',
  heroImage: '/images/redesign/pad-see-ew-yaowarat-hero.webp',
  heroAlt: 'Wide Pad See Ew rice noodles with pork, egg and Chinese broccoli being folded through a dark wok in a Yaowarat shophouse',
  heroEyebrow: 'Wide noodles · dark soy · hot wok',
  lead: 'Pad See Ew is a Thai soy-sauce stir-fry built around broad, chewy rice noodles. Chinese broccoli, egg and a chosen protein are familiar; the sauce can combine several soy seasonings plus oyster or fish sauce, so a mild-looking plate still deserves specific dietary questions.',
  quickFacts: [
    { label: 'Name means', value: 'Stir-fried with soy sauce', icon: UtensilsCrossed },
    { label: 'Core noodle', value: 'Fresh wide rice noodle · sen yai', icon: Sparkles },
    { label: 'Heat', value: 'Usually mild; chilli at the side', icon: Flame },
    { label: 'Context', value: 'Food courts · stalls · restaurants', icon: MapPin },
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
    intro: 'Soy seasoning makes the first bite savoury and lightly sweet; hot-wok contact can add caramelised or charred edges without turning the noodles crisp throughout. Chinese broccoli brings a fresh, faintly bitter counterpoint.',
    texture: 'Fresh sen yai should feel soft, broad and chewy, with separate folds rather than a broken, wet clump. Egg ribbons, tender protein and crunchy gai-lan stems create contrast.',
    finish: 'Dark soy depth and wok-cooked noodle linger. Chilli vinegar can add heat and acidity at the table, which is different from building chilli through the base as Pad Kee Mao often does.',
    scores: [{ label: 'Savoury', value: 5 }, { label: 'Chewy', value: 5 }, { label: 'Sweet', value: 2 }, { label: 'Hot', value: 1 }],
  },
  ingredients: [
    { name: 'Fresh sen yai', role: 'Broad fresh rice-noodle sheets give the familiar soft-chewy fold. Dried wide noodles work differently, and other noodle variants exist in Thailand.' },
    { name: 'Chinese broccoli', role: 'Gai lan contributes leafy freshness and a firm, slightly bitter stem. Broccolini or other greens may appear when supply changes.' },
    { name: 'Egg', role: 'Often scrambled briefly in the wok so soft pieces cling to the noodles. It is common, but a vendor can have a different default.' },
    { name: 'Pork, chicken or tofu', role: 'Sliced pork and chicken are familiar; beef, seafood and tofu also occur. The protein choice does not reveal the complete sauce.' },
    { name: 'Light or seasoning soy', role: 'Adds salt and savoury depth. Product, concentration and wheat ingredients differ, so current labels matter.' },
    { name: 'Black or dark soy', role: 'Contributes the brown colour and some sweetness. Thai and Chinese products are not interchangeable at identical quantities.' },
    { name: 'Oyster and fish sauce', role: 'Common in many tested recipes and kitchens, but not universal. Both are essential vegetarian, vegan and allergen checks.' },
    { name: 'Chilli vinegar', role: 'Prik nam som can brighten the rich noodles at the table. It is an optional condiment, not proof that the base must be spicy.' },
  ],
  allergenCopy: 'Soy, wheat, mollusc ingredients, fish and egg are the main checks. Fresh rice noodles may be gluten-free by composition, but soy and seasoning sauces, marinades, commercial noodles and shared woks can change the completed dish. For coeliac or serious allergy safety, verify every current label and preparation surface rather than asking only whether the noodles are rice.',
  vegetarianCopy: 'Pad See Ew is not vegetarian or vegan by default. Tofu noodles can still contain oyster sauce, fish sauce, egg or meat marinade from a shared wok. Ask for a confirmed plant-based sauce, suitable noodles and protein, no egg for vegan orders and acceptable cross-contact controls.',
  formats: [
    { title: 'Made-to-order stall', bestFor: 'Watching one portion move from noodle sheet to hot wok and choosing protein at the counter.', tradeOff: 'Premixed sauce and a shared wok can limit dietary changes; high turnover is useful, but it is not an allergen guarantee.' },
    { title: 'Food court or restaurant', bestFor: 'An English menu, more time for sauce questions and a side of chilli vinegar you can control.', tradeOff: 'Dark colour does not prove one sauce recipe, and a polished plate does not guarantee fresh sen yai or stronger cross-contact controls.' },
    { title: 'Home or class', bestFor: 'Learning noodle separation, small-batch cooking and the difference between browning and breaking the noodles.', tradeOff: 'Fresh-noodle availability and domestic stove power change the result; exact timing must come from a tested recipe.' },
  ],
  orderSteps: [
    { title: 'Choose protein', text: 'Order moo for pork, gai for chicken or the available beef, seafood or tofu version. Confirm whether egg is included if you need it added or removed.' },
    { title: 'Check the sauce', text: 'Ask about oyster sauce, fish sauce, soy, wheat and the shared wok before cooking begins. “Rice noodles” alone does not answer those questions.' },
    { title: 'Add contrast later', text: 'Taste the noodles first, then use chilli vinegar or another table condiment. Pad See Ew is normally less chilli-led than Pad Kee Mao, but the actual kitchen still decides.' },
  ],
  cooking: {
    title: 'Separate. Sear. Egg. Greens. Noodles. Char.',
    intro: 'The practical sequence protects fresh noodles from turning into one broken mass. Protein is safely cooked, egg and gai lan enter in order, then a measured single portion of noodles and sauce gets enough pan contact to colour without being repeatedly stirred to pieces.',
    steps: ['Choose a tested recipe and identify every noodle, marinade and sauce ingredient before heating the wok.', 'Separate fresh noodle sheets gently and divide ingredients into single portions.', 'Sear the chosen protein safely, removing or sequencing it as the recipe specifies.', 'Cook garlic, egg and Chinese broccoli without letting watery greens cool the pan for too long.', 'Add one portion of noodles and measured sauce, folding rather than constantly chopping through them.', 'Allow controlled pan contact for colour, then serve immediately with optional chilli vinegar.'],
    boundary: 'Fresh-noodle moisture, sauce brand, protein thickness, pan seasoning, batch size and stove power change timing. Use a tested recipe for exact quantities, safe internal temperatures, storage and reheating. Wok hei is possible, not a universal requirement, and this page deliberately does not publish Recipe schema.',
  },
  affiliates: [{
    href: '/go/simple-thai-food-cookbook/',
    title: 'Simple Thai Food',
    text: 'A broad Thai cooking reference can place fresh noodles, soy seasoning and wok sequencing in context without pretending one gadget creates restaurant heat. Compare the current edition, format, seller and delivery details.',
  }],
  classHref: withSubId(KLOOK_GENERIC, 'en-pad-see-ew-thailand-cooking-class'),
  classCopy: 'A suitable Thai cooking class can show how fresh noodle sheets are separated, why one-portion batches matter and how soy seasoning is balanced. Klook results are broad: confirm Pad See Ew is on the current menu and ask how dietary substitutions are handled.',
  classSignals: [
    { title: 'Fresh noodles', text: 'Identify sen yai and compare its handling with dried wide rice noodles.' },
    { title: 'Heat control', text: 'Watch pan contact and batch size rather than chasing a theatrical flame.' },
    { title: 'Sauce labels', text: 'Check soy, oyster, fish, wheat and egg boundaries before substitutions begin.' },
  ],
  faqs: [
    { question: 'What exactly is Pad See Ew?', answer: 'Pad See Ew is a Thai stir-fried noodle dish whose name refers to soy-sauce stir-frying. A familiar version combines broad fresh rice noodles, Chinese broccoli, egg, a chosen protein and a mixture of soy-based seasonings, sometimes with oyster or fish sauce.' },
    { question: 'What does Pad See Ew taste like?', answer: 'It is usually savoury, lightly sweet and soy-led, with soft-chewy noodles and some caramelised or charred edges from the wok. Chinese broccoli adds freshness and faint bitterness; chilli vinegar can add acidity and heat after serving.' },
    { question: 'What is Pad See Ew made of?', answer: 'Common signals are fresh wide rice noodles, gai lan or Chinese broccoli, egg, garlic, pork or chicken, light soy, black soy, oyster sauce and sometimes fish sauce. Vendor formulas, proteins and noodle types vary.' },
    { question: 'What kind of noodles are used in Pad See Ew?', answer: 'Fresh broad rice noodles called sen yai are the familiar choice and give the soft, folded texture. Dried wide rice noodles behave differently. Thailand also has vermicelli and egg-noodle Pad See Ew variants, so “wide rice noodle” describes the common form rather than every possible plate.' },
    { question: 'What is Pad See Ew sauce made of?', answer: 'Many tested versions combine light or seasoning soy, black or dark soy and oyster sauce, with fish sauce or sugar in some formulas. Brands differ in salt, sweetness and wheat ingredients, so there is no safe universal ingredient list for every restaurant.' },
    { question: 'Is Pad See Ew ever spicy?', answer: 'The base is usually not chilli-led, which makes it a useful milder choice, but kitchens vary and chilli vinegar or dried chilli may be served alongside it. Ask when heat matters rather than relying on a zero-spice guarantee.' },
    { question: 'Is Pad See Ew usually gluten-free?', answer: 'Not automatically. The familiar noodles are made from rice, but soy and seasoning sauces may contain wheat, marinades can add gluten and the wok may be shared. Coeliac diners need current product-label and cross-contact confirmation.' },
    { question: 'Can Pad See Ew be vegetarian or vegan?', answer: 'Yes, if the complete sauce and preparation are changed. Request tofu or vegetables with confirmed plant-based oyster alternative or soy seasoning, no fish sauce, no meat marinade, no egg for vegan orders and suitable shared-preparation controls.' },
    { question: 'What is the difference between Pad See Ew and Pad Thai?', answer: 'Pad See Ew normally uses broad noodles and a dark soy-led sauce with Chinese broccoli, producing a savoury, lightly sweet profile. Pad Thai usually uses narrower rice noodles and tamarind-led sweet-sour seasoning with sprouts, chives and separate garnishes. They are distinct dishes.' },
    { question: 'Is Pad See Ew the same as Pad Kee Mao?', answer: 'No. They can share broad rice noodles, but Pad Kee Mao — drunken noodles — is generally more chilli- and herb-led, while Pad See Ew centres on soy seasoning and Chinese broccoli. Exact heat and ingredients still vary by kitchen.' },
  ],
  related: [
    { title: 'Pad Thai guide', description: 'Compare tamarind-led narrower noodles with Pad See Ew’s wide soy-seasoned folds.', href: '/food/pad-thai/', image: '/images/redesign/pad-thai-dish-hero.webp' },
    { title: 'Thai street food guide', description: 'Choose a made-to-order stall using turnover, cooking and practical route signals.', href: '/thailand-street-food/', image: '/images/redesign/thailand-food-street-banner.webp' },
    { title: 'Thai food guide', description: 'Place stir-fried noodles beside curries, soups, salads and regional dishes.', href: '/food/', image: '/images/redesign/thailand-food-hub-hero.webp' },
  ],
  sources: [
    { title: 'Authentic Thai Pad See Ew Recipe', creator: 'Hot Thai Kitchen', url: 'https://hot-thai-kitchen.com/pad-see-ew-new/', note: 'Full DFS parse used for name meaning, sen yai, Chinese broccoli, sauce signals, ordering context, noodle variants, substitutions and practical sequence.' },
    { title: 'Silk Road on a Thai Plate', creator: 'Tourism Authority of Thailand Newsroom', url: 'https://www.tatnews.org/2026/02/silk-road-on-a-thai-plate/', note: 'Full primary-source parse used for Thai-Chinese and Teochew context, wide noodles, gai lan, egg, dark soy, wok technique and chilli-vinegar accompaniment.' },
    { title: 'Secrets to Thai Cooking', creator: 'Thailand Foundation', url: 'https://thailandfoundation.or.th/secrets-to-thai-cooking/', note: 'Full institutional parse used for the Thai-style sweet-soy stir-fried noodle description and broader cuisine context.' },
    { title: 'Pad See Ew (Thai Stir Fried Noodles)', creator: 'RecipeTin Eats', url: 'https://www.recipetineats.com/thai-stir-fried-noodles-pad-see-ew/', note: 'Full competitor parse used to map UK-English noodle, sauce and technique expectations; not treated as universal Thai practice.' },
  ],
  methodDescription: 'Updated 28 July 2026 after a 242-record DataForSEO cluster with 50 competitor domains, ten current UK-English SERPs with 75 organic results, 58 People Also Ask appearances and 46 unique genuine questions, four usable full source parses, plus exact ranking and backlink checks. The existing owner returned no ranking keywords or reportable backlink summary signal but remains the only canonical English Pad See Ew route. Healthiest/unhealthiest, fixed-calorie, restaurant-near-me, brand-menu, supermarket, exact-origin-date, automatic-gluten-free, guaranteed-non-spicy and unsupported first-hand claims were excluded.',
};

export function PadSeeEwGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
