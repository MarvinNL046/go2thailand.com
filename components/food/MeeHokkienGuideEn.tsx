import { ChefHat, Flame, Leaf, MapPin, ShoppingBasket, Sparkles, UtensilsCrossed } from 'lucide-react';
import { KLOOK_GENERIC, withSubId } from '../../lib/affiliates';
import { DishEditorialTemplate, type DishEditorialData } from './DishEditorialTemplate';

const data: DishEditorialData = {
  title: 'Mee Hokkien: Phuket’s Yellow Wok Noodles',
  description: 'Understand Phuket Mee Hokkien: thick yellow noodles, moist wok sauce, seafood, pork, egg, allergens, regional differences and how to order it.',
  canonical: 'https://go2-thailand.com/food/mee-hokkien/',
  updatedAt: '28 July 2026',
  name: 'Mee Hokkien',
  thaiName: 'หมี่ฮกเกี้ยน · Phuket Hokkien Mee',
  heroImage: '/images/redesign/mee-hokkien-phuket-wok-hero.webp',
  heroAlt: 'Phuket-style thick yellow Hokkien noodles with fully cooked prawns, squid, pork, egg and choy sum in a dark wok',
  heroEyebrow: 'Phuket Old Town · thick yellow noodles · moist wok finish',
  lead: 'Phuket Mee Hokkien is a local Thai-Chinese wok-noodle dish, not a copy of every Hokkien mee sold around Southeast Asia. Thick yellow wheat-and-egg noodles stay chewy under a smoky, savoury and often moist sauce, while seafood, pork, greens and egg vary by shop. Choose the noodle and egg style first, then check the stock and sauces before assuming it is pork-free or gluten-free.',
  quickFacts: [
    { label: 'Place', value: 'Phuket · Hokkien-Chinese heritage', icon: MapPin },
    { label: 'Noodle', value: 'Thick yellow wheat-and-egg noodle', icon: ShoppingBasket },
    { label: 'Finish', value: 'Wok-fried · moist · sauce-coated', icon: UtensilsCrossed },
    { label: 'Heat', value: 'Usually gentle · condiments vary', icon: Flame },
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
    intro: 'The Phuket bowl is built around chewy yellow noodles, savoury stock or sauce and high-wok aroma. Soy, seafood and pork can deepen the base; greens bring freshness; an egg can make it rounder. Chilli is often a condiment rather than the defining flavour.',
    texture: 'Expect thick, springy noodles with enough liquid to stay glossy and sauce-coated—often between a dry stir-fry and noodle soup. Prawns and squid should be just cooked, greens crisp and egg set to the ordered style. Shops can serve a wetter or drier bowl.',
    finish: 'Smoky wok notes and gentle saltiness linger, followed by seafood or pork-stock depth. Shallot, vinegar, lime or chilli can sharpen the finish at the table, but none should be assumed in every bowl.',
    scores: [{ label: 'Savoury', value: 5 }, { label: 'Smoky', value: 4 }, { label: 'Chewy', value: 5 }, { label: 'Hot', value: 1 }],
  },
  ingredients: [
    { name: 'Yellow noodles', role: 'The familiar Phuket choice is thick wheat-and-egg noodle: chewy, yellow and able to hold a moist wok sauce. Wheat and egg are direct dietary checks.' },
    { name: 'Seafood', role: 'Prawns, squid, fish or fish cake appear across documented bowls. Type and combination vary, creating crustacean, mollusc and fish boundaries.' },
    { name: 'Pork', role: 'Sliced pork, char siu, pork crackling, lard or pork stock may enter separately. A bowl that visually looks seafood-only is not automatically pork-free or halal.' },
    { name: 'Egg', role: 'Egg may be fried through the noodles, set on top or added extra for richness. Ask about doneness and shared utensils rather than expecting a runny yolk.' },
    { name: 'Choy sum · greens', role: 'Choy sum stems and leaves, Chinese kale, cabbage, bean sprouts or other greens supply crunch. The exact mix follows shop and season.' },
    { name: 'Stock and sauce', role: 'Soy-based sauce, seafood or pork stock and oyster-style seasoning can create the moist finish. Soy, wheat, shellfish, fish and pork can therefore hide in the liquid.' },
    { name: 'Wok and fat', role: 'High heat adds aroma, while oil or lard carries the sauce. Shared woks and oil matter for shellfish, pork, gluten and vegetarian cross-contact.' },
    { name: 'Table condiments', role: 'Chilli flakes or sauce, vinegar, shallot and lime may add heat or acidity. Packaged condiments need their own ingredient check.' },
  ],
  allergenCopy: 'The core yellow noodle normally contains wheat/gluten and egg. Prawns, squid, fish, fish cake, oyster sauce, soy sauce and stock can add crustacean, mollusc, fish, soy or more wheat. Shared woks, oil, ladles and noodle water make cross-contact likely; ask about the whole bowl and cooking station.',
  vegetarianCopy: 'Removing visible seafood or pork is not enough. Yellow noodles may contain egg; the wok sauce or stock may contain pork, seafood, fish or oyster seasoning; and the wok may be shared. A vegetarian adaptation needs verified noodles, stock, sauces, protein and separate handling.',
  formats: [
    { title: 'Moist yellow-noodle bowl', bestFor: 'Trying the Phuket signature: thick chewy noodles, wok aroma and a savoury sauce that sits between dry and soupy.', tradeOff: 'Ask what seafood and pork are included and whether stock, soy or oyster sauce enters the wok. Moisture and portion vary by shop.' },
    { title: 'Add a set egg', bestFor: 'Rounding the smoky sauce with extra richness while keeping the egg cooked to a clearly requested doneness.', tradeOff: 'Egg is another allergen and does not remove seafood, pork or wheat. Confirm whether it is cooked through if runny egg is unsuitable.' },
    { title: 'Verified rice-noodle adaptation', bestFor: 'Choosing a thinner rice noodle only when the shop offers it and can explain sauce, stock and handling.', tradeOff: 'Rice noodles do not make the dish gluten-free when soy sauce, stock, shared wok or noodle water still contains wheat.' },
  ],
  orderSteps: [
    { title: 'Choose noodle and moisture', text: 'Ask for Phuket Mee Hokkien or show หมี่ฮกเกี้ยน, then choose the thick yellow noodle and whether the shop offers a wetter or drier finish. Do not expect Singapore or Kuala Lumpur style.' },
    { title: 'Map pork, seafood and sauces', text: 'Ask which prawns, squid, fish, pork, char siu, stock, soy or oyster sauce are used. Confirm wheat, egg and shared-wok handling before treating any substitution as allergen-safe.' },
    { title: 'Set egg and condiments', text: 'Choose no egg, egg mixed through or an extra set egg if available, then add chilli or vinegar gradually. Prefer freshly hot noodles with fully cooked seafood and pork.' },
  ],
  cooking: {
    title: 'Prepare first. Wok hot. Proteins separate. Sauce fast.',
    intro: 'Mee Hokkien depends on mise en place because noodles, seafood, pork, greens, egg and sauce reach their best texture at different moments. A complete tested Phuket recipe must define every ingredient, stock and safety control; the sequence below is an orientation, not a formula.',
    steps: ['Choose one complete tested Phuket Mee Hokkien recipe and map noodles, seafood, pork, egg, greens, stock, sauces, fat and condiments before heating the wok.', 'Prepare raw seafood and pork on separate clean boards as required, keep them chilled and place cooked or ready-to-eat greens and garnishes away from raw-protein tools.', 'Mix the measured sauce and stock according to the recipe, checking soy, wheat, shellfish, fish and pork before cooking rather than adjusting blindly at the wok.', 'Heat the wok and cook pork and seafood in the tested sequence so each reaches safe doneness without turning tough; remove or move ingredients only as the method directs.', 'Add greens, thick yellow noodles and measured liquid at the specified stages, tossing quickly so the noodles become hot, glossy and smoky without drying out or becoming soup.', 'Cook the egg to the requested safe doneness, combine with clean utensils and serve immediately. Cool leftovers promptly and follow current local storage and reheating guidance.'],
    boundary: 'Seafood opacity, pork colour and a steaming wok are imperfect safety tests on their own. Follow a tested recipe and current food-safety guidance for suitable time-and-temperature controls, egg handling, cross-contamination, cooling and reheating. This editorial owner deliberately omits Recipe schema.',
  },
  affiliates: [
    { href: '/go/simple-thai-food-cookbook/', title: 'Simple Thai Food', text: 'A complete tested Thai recipe can provide exact noodle, stock, sauce and protein controls. Compare the current edition, format, seller and delivery details.' },
    { href: '/go/thai-granite-mortar-eight-inch/', title: 'Eight-inch granite mortar', text: 'Relevant only when a tested condiment or aromatic paste calls for pounding. Compare usable capacity, weight and worktop protection; it is not required for the noodle wok itself.' },
  ],
  classHref: withSubId(KLOOK_GENERIC, 'en-mee-hokkien-phuket-food-class'),
  classCopy: 'A relevant Phuket Old Town food walk or cooking experience can connect the noodles with the island’s Hokkien-Chinese history and show the moist wok finish. Klook results are broad, so confirm Mee Hokkien is included and check seafood, pork, allergens, Old Town stops, class language and cancellation terms.',
  classSignals: [
    { title: 'Phuket identity', text: 'Separate the local yellow-noodle bowl from Singapore, Kuala Lumpur and Penang dishes that share the Hokkien mee name.' },
    { title: 'Moist wok finish', text: 'See how thick noodles, stock or sauce and high heat create gloss and smoke without becoming dry or soupy.' },
    { title: 'Protein map', text: 'Identify seafood, pork, egg, stock and sauces before the shared wok makes hidden ingredients difficult to trace.' },
  ],
  faqs: [
    { question: 'What exactly is Hokkien mee?', answer: 'Hokkien mee is a regional noodle name, not one universal dish. On this page it means Phuket-style thick yellow wheat-and-egg noodles wok-fried with a moist savoury sauce and a variable mix of seafood, pork, greens and egg.' },
    { question: 'What is Hokkien mee Thai?', answer: 'In Phuket, Thai Hokkien mee is a local Thai-Chinese noodle dish tied to the island’s Hokkien community and Old Town food culture. It is usually moist and wok-fried rather than identical to Singapore, Kuala Lumpur or Penang versions.' },
    { question: 'What are Hokkien noodles made of?', answer: 'The familiar thick yellow Hokkien noodle in Phuket is made from wheat flour and egg. Exact commercial recipes vary, and some shops offer thin rice noodles separately. Always confirm ingredients when gluten or egg matters.' },
    { question: 'What is Hokkien mee made of?', answer: 'A Phuket bowl commonly combines thick yellow noodles, greens and savoury stock or sauce with some mix of prawns, squid, fish, fish cake, pork, char siu and egg. Soy or oyster-style seasoning may be hidden in the sauce.' },
    { question: 'What does Hokkien mee taste like?', answer: 'Phuket Mee Hokkien is savoury, gently salty and often smoky from the wok, with chewy noodles and seafood or pork depth. Egg can make it rounder; vinegar, shallot, lime or chilli can sharpen it at the table.' },
    { question: 'What sauces are used in Hokkien mee?', answer: 'There is no universal sauce. Phuket expressions may use soy-based seasoning, seafood or pork stock and oyster-style sauce to create a moist glaze. Ask about wheat, soy, shellfish, fish and pork rather than relying on colour.' },
    { question: 'Is Phuket Hokkien mee spicy?', answer: 'It is often gentle rather than chilli-led, with heat added through chilli flakes or sauce. Kitchens and condiments vary, so ask before ordering and add chilli gradually.' },
    { question: 'What is the difference between Singapore noodles and Hokkien mee?', answer: '“Singapore noodles” often refers outside Singapore to curry-flavoured rice vermicelli, while Hokkien mee names several regional dishes. Phuket Hokkien mee centres on thick yellow wheat-and-egg noodles with a moist wok sauce; neither name guarantees one recipe.' },
    { question: 'What is the difference between Singapore Hokkien mee and Malaysian Hokkien mee?', answer: 'The names vary within both countries. Singapore Hokkien mee is commonly a prawn-stock noodle dish, Kuala Lumpur Hokkien mee is commonly darker with soy, and Penang uses Hokkien mee for prawn noodle soup. Phuket’s moist yellow-noodle wok dish is its own local system.' },
    { question: 'Do Hokkien noodles have gluten in them?', answer: 'The thick yellow Hokkien noodles normally contain wheat and therefore gluten. A rice-noodle substitution still may contact wheat through soy sauce, stock, shared wok, utensils or noodle water. Confirm the complete preparation.' },
  ],
  related: [
    { title: 'Phuket travel guide', description: 'Choose the right coast and build Old Town food time into a realistic island plan.', href: '/city/phuket/', image: '/images/redesign/phuket-destination-hero-v2.webp' },
    { title: 'Phuket Old Town', description: 'Walk the shophouses, museums and local food streets that give the noodle its cultural setting.', href: '/phuket/old-town/things-to-do/', image: '/images/redesign/phuket-old-town-walk-hero-v2.webp' },
    { title: 'Oh Aew', description: 'Follow the savoury noodle bowl with Phuket’s cooling local jelly dessert.', href: '/food/oh-aew/', image: '/images/food/oh-aew.webp' },
  ],
  sources: [
    { title: 'Travelling Around Phuket Old Town', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Articles/phuket', note: 'Current official source used for Phuket Old Town context, homemade wheat-flour noodles, choy sum preparation and varied seafood.' },
    { title: 'Phuket — Creative City of Gastronomy', creator: 'UNESCO Creative Cities Network', url: 'https://www.unesco.org/en/creative-cities/phuket?hub=80094', note: 'Primary civic context for Phuket gastronomy as cultural heritage; the 2024 monitoring report additionally confirms municipal Hokkien Mee history materials and Hokkien-Chinese roots.' },
    { title: '2 Days in Phuket for Street Food Lovers', creator: 'Michelin Guide Thailand', url: 'https://guide.michelin.com/hk/en/article/travel/2-days-in-phuket-for-street-food-lovers', note: 'Current editorial capture used for thick yellow noodles wok-fried over charcoal with squid, prawns and egg. Venue recommendations were excluded.' },
    { title: 'Hokkien Style Fried Noodles in Phuket Town', creator: 'Eating Thai Food', url: 'https://www.eatingthaifood.com/restaurants/lock-tien-phuket/', note: 'Complete DFS parse used for one yellow wheat-and-egg noodle, squid, pork, cabbage, egg, moist soy-based sauce and condiment expression. Price and review verdict were excluded.' },
    { title: 'Trying the Hokkien Mee of Phuket', creator: 'Zoy to the World', url: 'https://www.zoytotheworld.com/blog/thailand-phuket-food-trip-mee-ton-poe-hokkien-mee', note: 'Complete DFS parse used as an independent thick-noodle, pork, seafood, vegetable, egg and shallot expression. Venue logistics and personal ranking were excluded.' },
    { title: 'A Day with Penang Hokkien Mee', creator: 'Michelin Guide', url: 'https://guide.michelin.com/sg/en/article/dining-out/a-day-in-the-life-with-penang-s-888-hokkien-mee', note: 'Current regional comparison source used only to prevent Penang prawn-noodle meaning from being silently transferred to the Phuket owner.' },
  ],
  methodDescription: 'Updated 28 July 2026 after two independent DataForSEO clusters with three raw keyword records, ten current UK-English SERPs with 80 organic results, 60 People Also Ask appearances and 39 unique genuine questions, four complete DFS source parses, current Tourism Authority, UNESCO and Michelin captures, plus exact owner ranking and backlink checks. The measurable UK term has volume 10, while the owner has zero ranking terms and no reportable backlink summary signal. Singapore, Kuala Lumpur and Penang systems remain independent. Restaurant ranking, delivery, celebrity, fixed-price, calorie, health, automatic dietary, guaranteed heat and one-formula claims were excluded.',
};

export function MeeHokkienGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
