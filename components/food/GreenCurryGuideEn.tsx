import { ChefHat, Flame, Leaf, MapPin, ShoppingBasket, Sparkles, UtensilsCrossed } from 'lucide-react';
import { KLOOK_GENERIC, withSubId } from '../../lib/affiliates';
import { DishEditorialTemplate, type DishEditorialData } from './DishEditorialTemplate';

const data: DishEditorialData = {
  title: 'Thai Green Curry: Ingredients, Taste, Heat & How to Eat It',
  description: 'Understand Thai green curry before ordering it: gaeng keow wan meaning, ingredients, colour, taste, heat, fish sauce, vegetarian checks, serving and cooking sequence.',
  canonical: 'https://go2-thailand.com/food/green-curry/',
  updatedAt: '28 July 2026',
  name: 'Thai Green Curry',
  thaiName: 'แกงเขียวหวาน',
  heroImage: '/images/redesign/thai-green-curry-dish-hero.webp',
  heroAlt: 'Natural Thai green curry with chicken, Thai aubergine, pea aubergine, basil, lime leaf and jasmine rice on a riverside veranda',
  heroEyebrow: 'Fresh green chilli, coconut and basil',
  lead: 'Thai green curry — kaeng khiao wan — builds fresh green chilli, aromatic curry paste and coconut into a rich bowl whose heat, salt and sweetness change by kitchen. Chicken is familiar, but the paste, broth, vegetables and seasoning matter more than assuming one fixed recipe.',
  quickFacts: [
    { label: 'Thai name', value: 'Kaeng khiao wan', icon: UtensilsCrossed },
    { label: 'Typical profile', value: 'Aromatic · rich · spicy · savoury', icon: Sparkles },
    { label: 'Heat', value: 'Variable; never guaranteed mild', icon: Flame },
    { label: 'Serve with', value: 'Jasmine rice or khanom chin', icon: MapPin },
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
    intro: 'Fresh chilli and herbs give lift before coconut rounds the edges. Fish sauce, shrimp paste, stock and palm sugar can build savoury depth and balance, but no single sweetness or heat level defines every bowl.',
    texture: 'The curry should flow around rice or noodles rather than behave like a dry paste. Coconut gives body; Thai aubergine stays firm-tender and pea aubergine can add a small bitter pop.',
    finish: 'Basil, makrut-lime leaf, chilli and coconut linger. A well-balanced bowl can feel hot, salty, aromatic and gently sweet without any one signal erasing the others.',
    scores: [{ label: 'Aromatic', value: 5 }, { label: 'Rich', value: 4 }, { label: 'Hot', value: 3 }, { label: 'Sweet', value: 2 }],
  },
  ingredients: [
    { name: 'Green curry paste', role: 'Fresh green chilli distinguishes the paste; lemongrass, galangal, lime zest, shallot, garlic, coriander root and spices are familiar signals.' },
    { name: 'Shrimp paste', role: 'Common in traditional-looking paste and easy to miss. Commercial and house recipes vary, so plant-based diners must ask.' },
    { name: 'Coconut milk or cream', role: 'Builds richness and carries the paste. Brand, concentration and how the coconut is cooked change body and sheen.' },
    { name: 'Chicken or another protein', role: 'Chicken is familiar, while beef, fish balls, seafood and meat-free versions also occur. No protein is mandatory everywhere.' },
    { name: 'Thai aubergine', role: 'Round quartered aubergine gives a firm, juicy bite; tiny pea aubergines can contribute a mild bitterness.' },
    { name: 'Fish sauce and palm sugar', role: 'Common seasoning controls for salt, savoury depth and balance. Neither amount nor presence is universal.' },
    { name: 'Thai basil', role: 'Adds anise-like aroma and may deepen the green colour. It is not proof that the paste itself is fresh or allergen-safe.' },
    { name: 'Makrut-lime leaf and chilli', role: 'Lift the finish with citrus aroma and additional heat. Garnish style and chilli choice vary by cook.' },
  ],
  allergenCopy: 'Shrimp paste, fish sauce, soy, stock and commercial curry paste are the main hidden checks. Coconut is also relevant for some diners. For coeliac safety, verify every paste and seasoning label plus stock, soy-based ingredients and cross-contact; a curry served with rice is not automatically gluten-free.',
  vegetarianCopy: 'Green curry is not vegetarian or vegan by default. Vegetables or tofu can still sit in shrimp-containing paste, fish sauce or meat stock. Ask for a version with confirmed plant-based paste, broth, seasoning and protein, prepared with suitable tools rather than requesting only “no meat”.',
  formats: [
    { title: 'Khao gaeng stall', bestFor: 'Seeing the prepared curry before choosing it over rice and comparing it with another tray.', tradeOff: 'Paste, stock and seasoning are already fixed; shared ladles and holding time matter for dietary needs and texture.' },
    { title: 'Restaurant bowl', bestFor: 'Choosing protein, sharing with rice and asking more detailed ingredient questions before ordering.', tradeOff: 'A polished room or higher price does not prove fresh paste, mild heat or stronger allergen controls.' },
    { title: 'Home or class', bestFor: 'Understanding paste texture, coconut technique, aubergine timing and seasoning by tasting as you cook.', tradeOff: 'Use a tested recipe and current product labels; paste strength and coconut concentration vary substantially.' },
  ],
  orderSteps: [
    { title: 'Name the version', text: 'Choose the available protein or confirmed meat-free base, then ask about paste, stock and seasoning if fish, shrimp, soy, gluten or vegan boundaries matter.' },
    { title: 'Choose the carrier', text: 'Jasmine rice is familiar and absorbs the sauce; khanom chin rice noodles are another established pairing. Order enough to balance the curry’s richness.' },
    { title: 'Taste before adjusting', text: 'Check the actual heat, salt and sweetness before adding chilli or another condiment. Green colour does not predict a universal spice level.' },
  ],
  cooking: {
    title: 'Pound. Bloom. Simmer. Season. Finish.',
    intro: 'The useful sequence starts with a smooth aromatic paste, develops it in coconut, cooks the chosen protein safely, times the aubergines for texture and finishes with basil and lime leaf rather than flattening every ingredient in one long boil.',
    steps: ['Identify every paste ingredient and prepare a tested recipe before heating the pan.', 'Pound or blend the fresh aromatics to the texture specified by that recipe.', 'Bloom the paste in coconut cream, coconut milk or the recipe’s chosen fat without scorching it.', 'Add coconut milk, stock and the chosen protein in the tested order and cook safely.', 'Add Thai and pea aubergines according to their size so they remain pleasantly firm.', 'Balance seasoning, then add basil and lime leaf close to service for a fresher aroma.'],
    boundary: 'Chilli strength, paste brand, coconut concentration, protein, pan and aubergine size all move quantities and timing. Use a tested recipe for exact measurements, frying or simmering temperatures, safe internal temperature, cooling and storage. No Recipe schema is used here because those measurements are not independently republished and tested.',
  },
  affiliates: [
    { href: '/go/simple-thai-food-cookbook/', title: 'Simple Thai Food', text: 'A broad Thai cooking reference can place green curry paste, coconut technique and regional balance in context. Compare the current edition, format, seller and delivery details.' },
    { href: '/go/thai-granite-mortar-eight-inch/', title: 'Eight-inch granite mortar', text: 'A stable mortar can grind chilli, fibrous aromatics and spices into paste. Check current weight, usable interior, care instructions and worktop protection before buying.' },
  ],
  classHref: withSubId(KLOOK_GENERIC, 'en-green-curry-thailand-cooking-class'),
  classCopy: 'A suitable Thai cooking class can show paste texture, coconut technique and balance through repeated tasting. Klook results are broad: confirm that green curry is on the current menu, whether paste is made from scratch and how dietary requests are handled.',
  classSignals: [
    { title: 'Fresh paste', text: 'Confirm whether each guest pounds aromatics or mainly opens a prepared paste.' },
    { title: 'Coconut control', text: 'See how heat and concentration change body instead of relying on one fixed visual cue.' },
    { title: 'Dietary boundary', text: 'Identify shrimp paste, fish sauce, stock and shared tools before substitutions begin.' },
  ],
  faqs: [
    { question: 'What are the main ingredients in Thai green curry?', answer: 'A familiar version combines green curry paste, coconut milk or cream, a protein, Thai and pea aubergines, fish sauce, palm sugar, Thai basil and makrut-lime leaf. The paste commonly contains fresh green chilli, lemongrass, galangal, lime zest, shallot, garlic, coriander root, spices and shrimp paste. Recipes vary.' },
    { question: 'What gives Thai green curry its green colour?', answer: 'Fresh green chillies are the defining colour source in the paste. Thai basil or other green leaves may deepen the shade, while coconut lightens it. Colour varies naturally; a bright or pale bowl alone does not prove quality, heat or freshness.' },
    { question: 'What do Thai people call green curry?', answer: 'The Thai name is แกงเขียวหวาน. English spellings vary, including kaeng khiao wan, gaeng keow wan and kaeng kiew wan. Showing the Thai script avoids treating one transliteration as the only correct form.' },
    { question: 'Is Thai green curry very hot?', answer: 'It can be, because the paste uses fresh green chillies, but chilli type, paste quantity, coconut and kitchen style change the result. Do not assume green is always Thailand’s hottest curry or that a restaurant can remove heat already present in prepared paste.' },
    { question: 'Is Thai green curry meant to be sweet?', answer: 'It may contain palm sugar and have a gentle sweetness, but it should not be reduced to a sweet sauce. Thai sources connect “wan” in the name with the soft or creamy green colour; actual bowls balance chilli, savoury seasoning, salt, aromatics, coconut and some sweetness.' },
    { question: 'Is green curry usually vegetarian?', answer: 'No. Even a vegetable or tofu bowl may use shrimp paste, fish sauce or meat stock. Request a version with confirmed vegetarian paste, broth and seasoning, and discuss shared tools. Vegan diners should also check every commercial product and garnish.' },
    { question: 'Does green curry usually have fish sauce?', answer: 'Fish sauce is common in familiar recipes, but it is not unavoidable. A vendor can use another seasoning only if the paste, stock and complete recipe also meet your boundary. Ask about shrimp paste separately; removing fish sauce does not make the curry vegetarian.' },
    { question: 'What is in Thai green curry paste?', answer: 'Common signals include fresh green chilli, lemongrass, galangal, makrut-lime zest, coriander root, shallot, garlic, white pepper and toasted spices, often with shrimp paste. Proportions and additions vary between fresh, house-made and commercial pastes.' },
    { question: 'What do Thai people eat with green curry?', answer: 'Steamed jasmine rice is a familiar pairing, and khanom chin fermented rice noodles are also established. Some settings use roti or another starch. Choose enough rice or noodles to carry the rich sauce rather than treating one accompaniment as compulsory.' },
    { question: 'Which is hotter, Thai green or red curry?', answer: 'There is no dependable universal winner. Green paste uses fresh green chilli and red paste usually uses dried red chilli, but variety, quantity and recipe can reverse expectations. Use the dedicated Thai curry comparison guide for the broader flavour and ordering decision.' },
  ],
  related: [
    { title: 'Thai curry comparison', description: 'Compare green, red, yellow, Panang and Massaman without turning colour into a heat guarantee.', href: '/blog/thai-curry-guide-green-red-yellow-massaman-panang/', image: '/images/redesign/thai-curry-guide-hero.webp' },
    { title: 'Thai food guide', description: 'Place curries beside soups, noodles, salads and regional ordering decisions.', href: '/food/', image: '/images/redesign/thailand-food-hub-hero.webp' },
    { title: 'Cooking classes in Thailand', description: 'Compare menu, market visit, hands-on time, paste-making and dietary support.', href: '/best-cooking-classes-in-thailand/', image: '/images/redesign/thai-curry-paste.webp' },
  ],
  sources: [
    { title: 'Kaeng Khiao Wan: Thailand’s Iconic Green Curry', creator: 'Thailand Foundation', url: 'https://thailandfoundation.or.th/kaeng-khiao-wan-thailands-iconic-green-curry/', note: 'Full DFS parse used for Thai name, colour-language explanation, historical placement, ingredients, serving and preparation.' },
    { title: 'Authentic & Easy Thai Green Curry Chicken', creator: 'Hot Thai Kitchen', url: 'https://hot-thai-kitchen.com/green-curry-new-2/', note: 'Full DFS parse used for fresh-green-chilli colour, paste and broth signals, common protein, vegetables, serving and tested technique.' },
    { title: 'Discover Thai Cuisine through its famous four regions', creator: 'Tourism Authority of Thailand', url: 'https://www.tatnews.org/2018/01/discover-thai-cuisine-famous-four-regions/', note: 'Full primary-source parse used for Central Thailand context and common curry-paste ingredients.' },
    { title: 'How To Make Thai Green Curry Like A Michelin Starred Restaurant', creator: 'Michelin Guide', url: 'https://guide.michelin.com/en/article/dining-in/how-to-make-thai-green-curry-like-a-michelin-starred-restaurant', note: 'Current editorial corroboration used for fresh paste, coconut proportion, ingredient and balance signals; the direct DFS body parse was unavailable.' },
  ],
  methodDescription: 'Updated 28 July 2026 after a 317-record DataForSEO cluster with 50 competitor domains, ten current UK-English SERPs with 78 organic results, 51 People Also Ask appearances and 44 unique genuine questions, three usable full source parses, current Michelin discovery captures, plus exact ranking and backlink checks for the dish and comparison owners. Two Thai-name rankings remain on this canonical dish route; 49 red-versus-green and curry-type rankings remain on the separate broad comparison owner. Near-me, supermarket-brand, celebrity, fixed-price, fixed-calorie, universal-health, one-hottest-curry, guaranteed-vegetarian, guaranteed-gluten-free and unsupported first-hand claims were excluded.',
};

export function GreenCurryGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
