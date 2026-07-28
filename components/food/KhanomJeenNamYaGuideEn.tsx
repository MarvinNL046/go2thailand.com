import { ChefHat, Flame, Leaf, MapPin, ShoppingBasket, Sparkles, UtensilsCrossed } from 'lucide-react';
import { KLOOK_GENERIC, withSubId } from '../../lib/affiliates';
import { DishEditorialTemplate, type DishEditorialData } from './DishEditorialTemplate';

const data: DishEditorialData = {
  title: 'Khanom Jeen Nam Ya: Southern Thai Fish-Curry Noodles',
  description: 'Understand Khanom Jeen Nam Ya: fresh rice noodles, aromatic fish curry, vegetables, heat, fermentation, allergens, halal checks and how to order it.',
  canonical: 'https://go2-thailand.com/food/kanom-jeen-nam-ya/',
  updatedAt: '28 July 2026',
  name: 'Khanom Jeen Nam Ya',
  thaiName: 'ขนมจีนน้ำยา · Southern fish-curry noodles',
  heroImage: '/images/redesign/khanom-jeen-nam-ya-southern-noodles-hero.webp',
  heroAlt: 'Southern Thai khanom jeen rice-noodle coils with golden fish curry, vegetables, herbs, pickles and egg',
  heroEyebrow: 'Southern Thailand · fresh rice noodles · aromatic fish curry',
  lead: 'Khanom jeen names fresh round rice noodles served with a sauce; nam ya is the aromatic fish curry ladled over them. In the South, the plate often arrives with a generous field of vegetables, herbs, pickles and egg. Some noodles are fermented and gently tangy, but many are not—so ask about the actual noodles, curry, heat and seafood rather than trusting one fixed description.',
  quickFacts: [
    { label: 'Region', value: 'Southern Thailand · nationwide variations', icon: MapPin },
    { label: 'Identity', value: 'Fresh rice noodles · fish-curry sauce', icon: ShoppingBasket },
    { label: 'Service', value: 'Warm curry · noodles · crisp sides', icon: UtensilsCrossed },
    { label: 'Heat', value: 'Medium to hot · kitchen dependent', icon: Flame },
  ],
  navItems: [
    { href: '#taste', label: 'Taste', icon: Sparkles },
    { href: '#ingredients', label: 'Signals', icon: ShoppingBasket },
    { href: '#choose', label: 'Choose', icon: UtensilsCrossed },
    { href: '#order', label: 'Order', icon: MapPin },
    { href: '#cook', label: 'Prepare', icon: ChefHat },
    { href: '#questions', label: 'Questions', icon: Leaf },
  ],
  taste: {
    intro: 'Nam ya can feel creamy and rounded from coconut milk, yet remains intensely aromatic through fish, fingerroot, lemongrass, galangal and chilli. Tamarind or another sour element may brighten the sauce while fish sauce and shrimp paste deepen its savoury side.',
    texture: 'Soft, springy noodle coils loosen under the curry. Pounded or flaked fish gives the sauce body; bean sprouts, long beans, cabbage, cucumber, herbs and pickles provide the crisp, juicy and sour counterpoint that makes the plate work.',
    finish: 'Fingerroot and turmeric create a warm earthy perfume, chilli can linger and fresh vegetables reset the palate. Fermented noodles add a mild tang only when that noodle style is actually used.',
    scores: [{ label: 'Aromatic', value: 5 }, { label: 'Creamy', value: 4 }, { label: 'Hot', value: 4 }, { label: 'Tangy', value: 3 }],
  },
  ingredients: [
    { name: 'Khanom jeen noodles', role: 'Fresh round rice noodles, commonly portioned into small coils. Some are fermented; many modern versions are not. Dried substitutes can differ in texture and ingredients.' },
    { name: 'Cooked fish', role: 'The defining protein of nam ya, often pounded or flaked into the curry for body. Species, bones and preparation vary, and fish remains a direct allergen.' },
    { name: 'Coconut milk', role: 'Creates a rich, smooth carrier in familiar Southern versions. Brand, dilution and use vary; coconut does not make the whole sauce dairy-free or allergen-safe by itself.' },
    { name: 'Fingerroot · krachai', role: 'A distinctive earthy, peppery aromatic strongly associated with the sauce. Fresh, frozen or brined products can taste and label differently.' },
    { name: 'Chilli · turmeric', role: 'Dried and fresh chillies control heat while turmeric supplies colour and earthiness. Neither colour nor region predicts one universal spice level.' },
    { name: 'Shrimp paste · fish sauce', role: 'Common savoury builders in documented versions. They introduce crustacean and fish checks plus product-specific gluten and halal questions.' },
    { name: 'Fresh vegetables', role: 'Bean sprouts, long beans, cabbage, cucumber and herbs add crunch and freshness. Wash, separate and serve them with clean utensils.' },
    { name: 'Pickles · egg · sides', role: 'Pickled mustard greens and boiled egg are familiar additions; fried chicken, fish cakes or other sides can appear. Every addition brings its own ingredients and cross-contact.' },
  ],
  allergenCopy: 'Fish is intrinsic to nam ya; shrimp paste can add crustacean. Fish sauce, curry paste, stock powder, pickles, fried sides and commercial seasoning may add soy, wheat/gluten or other allergens. Shared curry ladles, noodle baskets, knives, boards and topping trays can cross-contact several dishes. A white rice noodle does not certify the complete plate.',
  vegetarianCopy: 'Classic nam ya is neither vegetarian nor vegan because fish defines the sauce, and shrimp paste or fish sauce may reinforce it. Khanom jeen can be served with other sauces, but a vegetable or green-curry option is a separately named dish that still needs a full ingredient and equipment check. Fish-based food is not automatically halal-certified.',
  formats: [
    { title: 'Classic Southern nam ya', bestFor: 'The full fish-curry identity with fresh noodle coils, abundant vegetables, herbs, pickles and optional egg.', tradeOff: 'Expect fish and possibly shrimp paste, fish sauce and firm heat. Ask whether the noodles are fermented and whether toppings share utensils.' },
    { title: 'Vendor-confirmed lower heat', bestFor: 'Trying the aromatic fish and fingerroot profile when a kitchen can ladle a milder sauce or explain its chilli level.', tradeOff: 'A premade curry cannot always be adjusted. Less chilli changes neither seafood allergens nor curry-paste, gluten or halal checks.' },
    { title: 'Another named khanom jeen sauce', bestFor: 'Exploring the noodle system through green curry, Northern nam ngiao or a clearly labelled local sauce.', tradeOff: 'This is not nam ya. Pork, chicken, blood, fermented soybean, coconut, seafood and heat vary by sauce, so restart the ingredient check.' },
  ],
  orderSteps: [
    { title: 'Name both noodle and sauce', text: 'Ask for Khanom Jeen Nam Ya or show ขนมจีนน้ำยา. Confirm the ladle is the fish-curry nam ya—not nam ngiao, green curry, nam prik or another sauce sharing the noodle counter.' },
    { title: 'Map fermentation and allergens', text: 'Ask whether the fresh noodles are fermented, how hot the curry is and whether it contains fish sauce, shrimp paste, packaged paste, stock or wheat-bearing seasoning. State fish, crustacean, gluten and halal needs before serving.' },
    { title: 'Assemble a balanced plate', text: 'Start with a few noodle coils, add enough warm curry to coat them, then choose clean vegetables, herbs, pickles and egg. Keep shared spoons in their own trays and take only food that has been handled safely.' },
  ],
  cooking: {
    title: 'Separate. Cook. Coil. Hold. Ladle. Chill.',
    intro: 'The dish succeeds because noodles, fish curry and raw or pickled sides are prepared as separate systems and meet only in the bowl. A complete tested recipe must define its fish, curry paste, coconut balance, noodles and safe temperatures; this traveller guide protects that architecture without inventing one formula.',
    steps: ['Choose one complete tested nam-ya recipe and identify every fish, shrimp-paste, fish-sauce, curry-paste, stock and noodle label before shopping.', 'Prepare fish with dedicated tools, remove bones as the tested method directs and cook it fully before pounding or flaking it into the curry base.', 'Build the aromatic paste in the tested order, then cook it with coconut milk and fish until the recipe’s safe endpoint; colour, bubbling or chilli heat alone does not prove doneness.', 'Cook fresh or dried rice noodles according to their own verified method, drain with a clean basket and form small coils while manageable. Do not substitute wheat noodles silently.', 'Wash vegetables and herbs, keep raw toppings away from fish tools and drain pickles or cook eggs with separate clean utensils.', 'Keep curry appropriately hot, protect noodles and toppings from contamination, assemble portions to order and refrigerate perishable leftovers promptly under current recipe, product and food-safety guidance.'],
    boundary: 'Fresh noodles, cooked fish curry, coconut milk, eggs and cut vegetables are perishable. Fermentation does not make the noodle plate shelf-stable, reheating does not remove allergens and one vendor’s storage instructions cannot be generalised. This owner deliberately omits Recipe schema.',
  },
  affiliates: [
    { href: '/go/simple-thai-food-cookbook/', title: 'Simple Thai Food', text: 'A tested Thai cookbook can supply exact fish, paste, noodle and food-safety controls that this traveller guide should not invent. Check the current contents, edition, format, seller and delivery.' },
    { href: '/go/thai-granite-mortar-eight-inch/', title: 'Eight-inch granite mortar', text: 'Relevant for a tested aromatic curry-paste method. Compare usable bowl size, weight, worktop protection and seafood-allergen cleaning before buying.' },
  ],
  classHref: withSubId(KLOOK_GENERIC, 'en-khanom-jeen-nam-ya-southern-food-class'),
  classCopy: 'A suitable Southern Thai cooking or market experience can explain how fresh noodle coils, fish curry and a large vegetable tray work together. Klook results are broad: confirm khanom jeen nam ya is explicitly on the current menu and check fish, crustacean, gluten, halal handling, language and cancellation terms before booking.',
  classSignals: [
    { title: 'Noodle identity', text: 'Compare fresh round khanom jeen with dried rice vermicelli and learn when fermentation is—and is not—part of the noodle.' },
    { title: 'Nam-ya architecture', text: 'See how cooked fish, coconut, fingerroot, chilli and savoury seasonings become a sauce rather than a generic curry soup.' },
    { title: 'Southern plate logic', text: 'Use vegetables, herbs, pickles and egg to control heat, richness and texture instead of treating them as optional decoration.' },
  ],
  faqs: [
    { question: 'What is kanom jeen namya?', answer: 'Khanom jeen nam ya is fresh round rice noodles served with an aromatic fish-curry sauce. Southern versions commonly combine cooked fish, coconut milk, chilli, fingerroot and other herbs, then add vegetables, pickles and sometimes egg. Spellings such as kanom jeen and khanom chin refer to the same noodle name.' },
    { question: 'What does khanom jeen mean?', answer: 'In this context, khanom jeen names the fresh round rice noodles and the wider noodle-with-sauce format. It does not mean Chinese dessert. Nam ya names this fish-curry sauce; changing the sauce changes the dish.' },
    { question: 'What is khanom jeen made of?', answer: 'The noodles are made primarily from rice and water. Traditional processes can ferment the rice, but not every current khanom jeen noodle is fermented. Check fresh or packaged noodles directly rather than applying one production method to all of them.' },
    { question: 'Is khanom jeen served hot or cold?', answer: 'The noodle coils are often served at room temperature while the curry is ladled warm or hot, with cool vegetables and herbs beside them. Service and holding vary by vendor. Choose curry that is being handled hot and toppings that look clean and protected.' },
    { question: 'How does kanom jeen taste?', answer: 'The noodles themselves are mild; a fermented version may be gently tangy. Nam ya brings aromatic fish, coconut richness, fingerroot, herbs, chilli and savoury depth, while vegetables and pickles add crisp and sour contrast.' },
    { question: 'How is kanom jeen different from other noodles?', answer: 'Fresh khanom jeen is a round rice noodle traditionally served in small coils with sauce ladled over it. It differs from flat sen yai, thin dried sen mee, wheat-and-egg bamee and glass noodles in ingredients, texture and preparation. Overseas substitutes may resemble it without being identical.' },
    { question: 'How do you eat nam ya?', answer: 'Place a few khanom jeen coils in the bowl, ladle nam ya over them and add vegetables, herbs, pickles and egg to taste. Mix enough for each bite and start cautiously with chilli. Nam ya can also appear in other contexts, so name the full dish when ordering.' },
    { question: 'Is Kanom Jeen vegetarian or vegan?', answer: 'The rice noodles may contain no animal ingredients, but classic nam ya is fish curry and can also contain shrimp paste and fish sauce. Therefore the full dish is not vegetarian or vegan. Ask for another specifically named sauce and recheck its paste, stock and shared equipment.' },
    { question: 'Is Khanom Jeen Nam Ya gluten-free?', answer: 'Rice noodles and the core fish-coconut idea do not require wheat, but the complete plate is not automatically gluten-free. Curry paste, fish sauce, seasoning, pickles, fried sides, substitute noodles and shared baskets can add gluten or cross-contact. Verify labels and the kitchen.' },
    { question: 'Is Khanom Jeen Nam Ya halal?', answer: 'Fish can fit a halal diet, but that alone does not certify this dish. Shrimp paste, fish sauce, curry paste, stock, packaged seasoning, alcohol-containing additions and shared preparation can vary. Choose a clearly halal-certified vendor or obtain a sufficiently detailed kitchen check.' },
  ],
  related: [
    { title: 'Nakhon Si Thammarat', description: 'Build a Southern city plan around temples, Kiriwong and a morning khanom-jeen table.', href: '/city/nakhon-si-thammarat/', image: '/images/redesign/nakhon-si-thammarat-hero.webp' },
    { title: 'Nam Prik Goong Siap', description: 'Continue into the South’s small, intense smoked-shrimp dip and vegetable-platter tradition.', href: '/food/nam-prik-goong-siap/', image: '/images/redesign/nam-prik-goong-siap-southern-dip-hero.webp' },
    { title: 'Phuket travel guide', description: 'Pair market breakfasts and Old Town food culture with a realistic island itinerary.', href: '/city/phuket/', image: '/images/redesign/phuket-destination-hero-v2.webp' },
  ],
  sources: [
    { title: 'Thai Rice Noodles with Fish Curry — Kanom Jeen Namya', creator: 'Hot Thai Kitchen · Pailin Chongchitnant', url: 'https://hot-thai-kitchen.com/kanom-jeen-namya/', note: 'Complete current specialist parse used for the noodle-versus-sauce definition, non-universal fermentation, one Southern fish-coconut expression, vegetables and substitution boundaries. Exact recipe, health and fixed storage claims were excluded.' },
    { title: '3 Days in Nakhon Si Thammarat Beyond the Sea', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Articles/https-www-tourismthailand-org-articles-3daysinnakhonsithammaratbeyondthesea', note: 'Complete current official parse used for fresh khanom jeen, multiple sauces, blue-crab nam ya and Southern breakfast context. The named venue was not turned into a permanent ranking.' },
    { title: 'Culture Compass: Thai Cuisine Explained Part II', creator: 'Thai Trade and Economic Office · Royal Thai Embassy Taipei', url: 'https://tteo.thaiembassy.org/th/content/culture-compass-thai-cuisine-explained-part-ii?menu=61712bcfd4efcd33ab7bd432', note: 'Complete primary Thai-government parse used for khanom jeen with fiery sauce in Southern breakfast culture and the region’s heat, sourness and seafood profile.' },
    { title: 'Allergen guidance for food businesses', creator: 'UK Food Standards Agency', url: 'https://www.food.gov.uk/business-guidance/allergen-guidance-for-food-businesses', note: 'Current primary guidance used for fish, crustacean and cross-contact boundaries rather than an automatic safety claim.' },
    { title: 'Safe gluten-free takeaway options', creator: 'Coeliac UK', url: 'https://www.coeliac.org.uk/living-with-coeliac-disease/food-and-drink/eating-out-and-travel/16528-2/', note: 'Expert source used for packaged sauce and shared-equipment checks rather than assuming rice noodles make the full plate gluten-free.' },
  ],
  methodDescription: 'Updated 28 July 2026 after two independent DataForSEO clusters with four raw keyword records, ten current UK-English SERPs with 70 organic results, 53 People Also Ask appearances and 30 unique questions, three complete DFS source parses, current Tourism Authority and Thai-government captures, plus exact owner ranking and backlink checks. DFS returned UK volume 10 for the exact head term but no difficulty or competitor-domain table; the owner has zero ranking terms and no reportable backlink summary signal. Northern nam ngiao, green-curry noodles, generic rice vermicelli, generic fish curry, recipe-only, health, fixed-price, calorie, automatic dietary, permanent restaurant, universal heat, storage and compulsory-fermentation claims were excluded.',
};

export function KhanomJeenNamYaGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
