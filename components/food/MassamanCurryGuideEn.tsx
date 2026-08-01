import { ChefHat, Flame, Leaf, MapPin, ShoppingBasket, Sparkles, UtensilsCrossed } from 'lucide-react';
import { KLOOK_GENERIC, withSubId } from '../../lib/affiliates';
import { DishEditorialTemplate, type DishEditorialData } from './DishEditorialTemplate';

const data: DishEditorialData = {
  title: 'Massaman Curry in Thailand: Taste, Ingredients & How to Order',
  description: 'Understand Massaman curry before ordering it in Thailand: taste, ingredients, heat, Thai-Muslim context, halal and vegetarian checks, cooking sequence and genuine UK search questions.',
  canonical: 'https://go2-thailand.com/food/massaman-curry/',
  updatedAt: '28 July 2026',
  name: 'Massaman Curry',
  thaiName: 'แกงมัสมั่น',
  heroImage: '/images/redesign/massaman-curry-dish-hero.webp',
  heroAlt: 'Copper-gold chicken Massaman curry with potato, onion and peanuts in a deep green Thai dining room, with rice and roti nearby',
  heroEyebrow: 'Warm spices, one careful order',
  lead: 'Massaman is a rich Thai curry shaped by Thai-Muslim cooking and long-distance spice exchange. Coconut milk, curry paste, potato, onion, tamarind, peanuts and warm dry spices are familiar signals, but protein, heat, sweetness and dietary status remain kitchen-level questions.',
  quickFacts: [
    { label: 'Dish family', value: 'Slow-simmered Thai curry', icon: UtensilsCrossed },
    { label: 'Typical profile', value: 'Warm · rich · savoury · tangy', icon: Sparkles },
    { label: 'Heat', value: 'Often gentle; never guaranteed', icon: Flame },
    { label: 'Context', value: 'Thai-Muslim and trade-route influences', icon: MapPin },
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
    intro: 'A common bowl is coconut-rich and savoury with the perfume of toasted dry spices. Tamarind can brighten the sauce, palm sugar may round it and peanuts add roasted depth. It should not be reduced to “sweet curry”: the balance changes by kitchen.',
    texture: 'The sauce is often fuller and more stew-like than a fast green or red curry. Tender protein, soft potato and onion contrast with whole or crushed peanuts.',
    finish: 'Warm spice and coconut linger, while tamarind and salty seasoning keep the finish from feeling flat. Chilli may be quiet or more noticeable than the menu suggests.',
    scores: [{ label: 'Aromatic', value: 5 }, { label: 'Savoury', value: 4 }, { label: 'Sweet', value: 3 }, { label: 'Hot', value: 1 }],
  },
  ingredients: [
    { name: 'Massaman paste', role: 'The aromatic base; prepared versions may contain chilli, shrimp paste or other ingredients that are not visible.' },
    { name: 'Coconut milk', role: 'Builds body and richness, with concentration changing as the curry simmers.' },
    { name: 'Chicken or beef', role: 'Common proteins linked to the dish’s Muslim context; the menu name does not prove sourcing or certification.' },
    { name: 'Potato and onion', role: 'Familiar stew-like structure that absorbs the sauce during a slower cook.' },
    { name: 'Warm dry spices', role: 'Cinnamon, cardamom, cumin, coriander, cloves, nutmeg or mace may appear in different combinations.' },
    { name: 'Tamarind', role: 'Adds acidity to balance coconut richness and sweetness; strength varies by paste and kitchen.' },
    { name: 'Peanuts', role: 'A common roasted flavour and an important allergen or cross-contact question.' },
    { name: 'Fish sauce or shrimp paste', role: 'Possible savoury depth in seasoning or curry paste, even when the visible plate looks meat-free.' },
  ],
  allergenCopy: 'Peanut, fish and shellfish are the main recurring checks, while coconut may matter for an individual diet. Ask about curry paste, fish sauce, shrimp paste, stock, garnish and shared utensils; removing visible peanuts does not remove the sauce or cross-contact.',
  vegetarianCopy: 'Potato and onion do not prove a vegetarian curry. Confirm the paste, shrimp paste, fish sauce, stock and protein before cooking, and ask whether a separate pan or utensils are needed for your boundary.',
  formats: [
    { title: 'Chicken Massaman', bestFor: 'A familiar version in which a slower simmer can carry spice and coconut into the meat and potato.', tradeOff: 'Chicken does not automatically mean halal; confirm meat source, stock, paste, alcohol use, utensils and certification if required.' },
    { title: 'Beef Massaman', bestFor: 'A deeper, long-cooked version where beef and warm spices can create a richer stew-like profile.', tradeOff: 'Cut, tenderness, portion and cooking time vary. Beef still needs the same halal, allergen and kitchen checks.' },
    { title: 'Confirmed meat-free', bestFor: 'Exploring the spice profile with tofu or vegetables when a kitchen can make a deliberate substitution.', tradeOff: 'Fish sauce, shrimp paste, meat stock and shared equipment may remain unless each is discussed explicitly.' },
  ],
  orderSteps: [
    { title: 'Choose protein and proof', text: 'Ask whether today’s version is chicken, beef or deliberately meat-free. If halal matters, confirm the kitchen standard or certification rather than inferring it from the dish’s roots.' },
    { title: 'Check paste and allergens', text: 'Discuss peanuts, fish sauce, shrimp paste, stock and medical allergens before the sauce is portioned or garnished.' },
    { title: 'Set the table', text: 'Confirm heat, portion and whether rice or roti is included. Taste first: extra chilli, sugar or fish sauce can hide the curry’s starting balance.' },
  ],
  cooking: {
    title: 'Toast. Bloom. Simmer. Balance.',
    intro: 'Massaman rewards a deliberate sequence rather than a rushed sauce. Dry spices are toasted or bloomed according to the recipe, paste is cooked in coconut milk, protein simmers until nearly tender, then potato, onion, peanut and the final sour-salty-sweet balance follow.',
    steps: ['Check the curry paste, stock and every dietary boundary before cooking.', 'Toast and grind the specified dry spices without burning them.', 'Cook the paste in coconut milk until aromatic according to a tested recipe.', 'Add protein and liquid, then simmer at the safe temperature and pace that cut requires.', 'Add potato, onion and peanuts at the stage that protects their texture.', 'Balance with tamarind, salty seasoning and sweetness, then serve with rice or roti.'],
    boundary: 'Paste salt, coconut concentration, tamarind strength, protein cut and potato type all change the result. Use a tested recipe for quantities, timing and safe temperatures; this guide explains the sequence and decision points rather than presenting an untested universal formula.',
  },
  affiliates: [
    { href: '/go/simple-thai-food-cookbook/', title: 'Simple Thai Food', text: 'A broad Thai cooking reference can place curry paste, balance and regional context together. Compare the current edition, seller, format and delivery details in your local Amazon store.' },
    { href: '/go/thai-granite-mortar-eight-inch/', title: 'Eight-inch granite mortar', text: 'A stable mortar can grind toasted spices and combine curry-paste components. Check current weight, usable interior, care instructions and worktop protection before buying.' },
  ],
  classHref: withSubId(KLOOK_GENERIC, 'en-massaman-curry-dish-cooking-class'),
  classCopy: 'A suitable class can show how dry spices, curry paste, coconut milk and tamarind are balanced in context. Klook results are broad: confirm that Massaman is on the current menu and ask about protein, allergens and individual workstations before booking.',
  classSignals: [
    { title: 'Spice architecture', text: 'See how toasted dry spices differ from fresh-aromatic curry foundations.' },
    { title: 'Slow sequence', text: 'Learn when paste, protein, potato, onion and final seasoning enter the pot.' },
    { title: 'Dietary proof', text: 'Identify paste, stock, fish sauce, shrimp paste, peanut and shared-tool boundaries.' },
  ],
  faqs: [
    { question: 'What is Massaman curry made of?', answer: 'Common versions use Massaman curry paste, coconut milk, chicken or beef, potato, onion, peanuts, tamarind and warm spices such as cinnamon, cardamom, cumin or cloves. Fish sauce or shrimp paste may appear in the seasoning or paste. Recipes vary.' },
    { question: 'What does Massaman curry taste like?', answer: 'It is commonly rich, aromatic and savoury with coconut, toasted warm spices, gentle sweetness and tamarind acidity. Peanut may add roasted depth. Chilli is often less dominant than in some Thai curries, but each kitchen sets its own balance.' },
    { question: 'How hot is a Massaman curry?', answer: 'Many versions are relatively gentle, but Massaman is not a fixed heat rating. Curry paste, chilli, batch and kitchen differ. Ask before ordering if heat matters rather than treating “mild” as a guarantee.' },
    { question: 'Is Massaman curry Indian or Thai?', answer: 'It is a Thai curry with strong Muslim and long-distance spice influences. Dry spices and stew-like structure reflect exchange with South and West Asian foodways, while the dish developed within Thai culinary traditions. A single-country either-or answer misses that history.' },
    { question: 'Where is Massaman curry from in Thailand?', answer: 'It is strongly associated with Thai-Muslim cooking and southern connections, while historical accounts also place it in central and royal Thai food culture. The precise birthplace and one unchanged origin story remain open, so regional influence is safer than a false exact address.' },
    { question: 'Is Thai Massaman curry vegetarian?', answer: 'Not by default. Chicken or beef is common, and fish sauce, shrimp paste or meat stock may remain in an apparently vegetable version. Request a specifically vegetarian or vegan paste, stock and seasoning and discuss shared equipment.' },
    { question: 'Is Massaman curry halal?', answer: 'Its Muslim roots do not automatically make every restaurant version halal. Confirm the meat source, stock, paste, alcohol use, utensils and the kitchen’s certification or standard. Choose a clearly halal kitchen if formal assurance matters.' },
    { question: 'Is Massaman curry pork or chicken?', answer: 'Chicken and beef are common; mutton, duck or other local versions also exist. Pork is uncommon in the traditional Muslim context, but menus and modern kitchens vary. Ask what protein is in today’s pot.' },
    { question: 'What is the difference between Massaman and Panang curry?', answer: 'Massaman is often stew-like with potato, onion, peanuts and prominent warm dry spices. Panang is commonly thicker, more paste-forward and served without the same potato-led structure. Either can vary in heat, sweetness, protein and allergens.' },
    { question: 'Is Massaman curry hotter than Panang curry?', answer: 'There is no dependable universal ranking. Massaman is often perceived as gentler, while Panang may feel more chilli-forward, but paste and kitchen choices can reverse that expectation. Compare the two dishes on the actual menu.' },
  ],
  related: [
    { title: 'Compare Thai curries', description: 'Separate green, red, yellow, Massaman and Panang by paste, texture, heat and ordering choice.', href: '/blog/thai-curry-guide-green-red-yellow-massaman-panang/', image: '/images/redesign/thai-curry-guide-hero.webp' },
    { title: 'Thai food guide', description: 'Place curries beside soups, noodles, salads and regional eating decisions.', href: '/food/', image: '/images/redesign/thailand-food-hub-hero.webp' },
    { title: 'Vegetarian Thailand', description: 'Check paste, fish sauce, shrimp paste, stock and shared-preparation boundaries.', href: '/travel-guides/vegetarian-vegan-thailand/', image: '/images/redesign/vegetarian-thailand-hero.webp' },
  ],
  sources: [
    { title: 'Authentic Thai Massaman Curry with Chicken', creator: 'Hot Thai Kitchen', url: 'https://hot-thai-kitchen.com/massaman-curry/', note: 'Full DFS parse used for dry-spice distinction, ingredients, common proteins and cooking sequence.' },
    { title: 'Much-loved dishes from different regions of Thailand', creator: 'Tourism Authority of Thailand', url: 'https://www.tatnews.org/2020/01/much-loved-must-eat-dishes-from-different-regions-of-thailand/', note: 'Full primary-source parse used for Thai-Muslim context and common protein, potato, onion, coconut and peanut signals.' },
    { title: 'Discover Thai cuisine through its four regions', creator: 'Tourism Authority of Thailand', url: 'https://www.tatnews.org/2018/01/discover-thai-cuisine-famous-four-regions/', note: 'Full primary-source parse used for southern cross-cultural and regional context.' },
    { title: 'Secrets to Thai Cooking', creator: 'Thailand Foundation', url: 'https://thailandfoundation.or.th/secrets-to-thai-cooking/', note: 'Full DFS parse used for wider Thai culinary and international Massaman context.' },
  ],
  methodDescription: 'Updated 28 July 2026 after a 92-record DataForSEO comparison cluster with 50 competitor domains, ten current UK-English SERPs with 75 organic results, 58 People Also Ask records and 48 unique genuine questions, four usable full source parses, one current Michelin source-discovery capture, plus exact ranking and backlink checks for the canonical owner. The broad curry-comparison article remains a distinct supporting pillar. Recipe-only, supermarket, takeaway, celebrity, fixed-price, fixed-nutrition, universal-health, one-authentic-origin, guaranteed-mild, automatically-halal, automatically-vegetarian and unsupported first-hand claims were excluded.',
};

export function MassamanCurryGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
