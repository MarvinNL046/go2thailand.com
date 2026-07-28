import { ChefHat, Flame, Leaf, MapPin, ShoppingBasket, Sparkles, UtensilsCrossed } from 'lucide-react';
import { KLOOK_GENERIC, withSubId } from '../../lib/affiliates';
import { DishEditorialTemplate, type DishEditorialData } from './DishEditorialTemplate';

const data: DishEditorialData = {
  title: 'Nam Prik Goong Siap: Southern Thai Smoked-Shrimp Dip',
  description: 'Understand Nam Prik Goong Siap: smoked dried shrimp, chilli, lime, fish sauce, shrimp paste, vegetables, heat, allergens, halal checks and how to eat it.',
  canonical: 'https://go2-thailand.com/food/nam-prik-goong-siap/',
  updatedAt: '28 July 2026',
  name: 'Nam Prik Goong Siap',
  thaiName: 'น้ำพริกกุ้งเสียบ · Southern smoked-shrimp dip',
  heroImage: '/images/redesign/nam-prik-goong-siap-southern-dip-hero.webp',
  heroAlt: 'Southern Thai rust-red chilli dip with smoked dried shrimp, lime, vegetables and jasmine rice',
  heroEyebrow: 'Southern Thailand · smoked shrimp · chilli-lime dip',
  lead: 'Nam Prik Goong Siap is a concentrated Southern Thai dip built around smoked or dried shrimp, chilli and lime, often with shrimp paste and fish sauce. It sits at the centre of vegetables and rice rather than functioning as soup or curry. Expect real heat, sourness and deep seafood savouriness—and ask about both crustacean and fish before the first bite.',
  quickFacts: [
    { label: 'Region', value: 'Southern Thailand · Phuket and Krabi', icon: MapPin },
    { label: 'Identity', value: 'Smoked or dried shrimp chilli dip', icon: ShoppingBasket },
    { label: 'Service', value: 'Vegetables · rice · shared table', icon: UtensilsCrossed },
    { label: 'Heat', value: 'Usually hot · vendor level varies', icon: Flame },
  ],
  navItems: [
    { href: '#taste', label: 'Taste', icon: Sparkles },
    { href: '#ingredients', label: 'Signals', icon: ShoppingBasket },
    { href: '#choose', label: 'Choose', icon: UtensilsCrossed },
    { href: '#order', label: 'Eat', icon: MapPin },
    { href: '#cook', label: 'Pound', icon: ChefHat },
    { href: '#questions', label: 'Questions', icon: Leaf },
  ],
  taste: {
    intro: 'Chilli heat and lime acidity arrive first; dried-smoked shrimp, shrimp paste and fish sauce build a concentrated marine savouriness underneath. Garlic, shallot and palm sugar can soften the edges without turning the dip mild or sweet.',
    texture: 'The paste can be coarse rather than smooth, with discernible shrimp pieces and crushed aromatics. Crisp cucumber and beans, tender blanched greens and soft rice create the contrast; the dip itself is intentionally intense in a small amount.',
    finish: 'Smoke, salt and chilli linger, while lime keeps the finish from feeling heavy. Shrimp size, roasting, paste, fish sauce and chilli count move the balance considerably from one kitchen to another.',
    scores: [{ label: 'Hot', value: 5 }, { label: 'Sour', value: 4 }, { label: 'Smoky', value: 4 }, { label: 'Savoury', value: 5 }],
  },
  ingredients: [
    { name: 'Goong siap', role: 'Smoked or dried shrimp is the defining ingredient and a direct crustacean allergen. Whole pieces or a coarse chew distinguish it from a smooth generic chilli paste.' },
    { name: 'Shrimp paste', role: 'A fermented crustacean product documented in familiar versions. Brand, salt and preparation vary, so ask rather than assuming it is always present or absent.' },
    { name: 'Fish sauce', role: 'Adds salt and fish-derived savouriness. Product labels, additives and halal or gluten status vary by bottle.' },
    { name: 'Fresh chilli', role: 'Drives the Southern heat. Variety, quantity and whether seeds remain can change intensity; colour alone is not a reliable heat scale.' },
    { name: 'Lime juice', role: 'Supplies sharp acidity and loosens the pounded paste. Freshness and proportion decide whether sourness balances or dominates.' },
    { name: 'Garlic · shallot', role: 'Pounded aromatics add bite and sweetness. Raw or roasted treatment follows the cook and affects the final edge.' },
    { name: 'Palm sugar', role: 'A small balancing component in documented versions, not permission to call the dip sweet. Other sweeteners or premixes may be used.' },
    { name: 'Vegetable platter', role: 'Cucumber, long beans, leafy greens and bamboo shoots are familiar partners. Raw, blanched and cooked items require separate clean handling.' },
  ],
  allergenCopy: 'Dried shrimp and shrimp paste are crustaceans; fish sauce is fish. Commercial paste, fish sauce, seasoning and sides can add soy, wheat/gluten or other allergens, while mortar, spoon, grill and serving bowl can cross-contact seafood. Ask about the entire dip and platter, not only the visible shrimp.',
  vegetarianCopy: 'Classic Nam Prik Goong Siap is neither vegetarian nor vegan: goong siap is shrimp, and shrimp paste and fish sauce may reinforce the seafood base. A shrimp-free chilli dip is a different nam prik and needs a separate name, ingredient list and clean preparation. Seafood alone also does not certify one version as halal.',
  formats: [
    { title: 'Vegetable-platter centre', bestFor: 'Eating the dip in its intended small, intense role with crisp raw vegetables, blanched greens and rice.', tradeOff: 'Ask which vegetables are raw or cooked and whether the platter, knife and serving spoon avoid your allergens. The dip remains crustacean- and often fish-based.' },
    { title: 'Shared rice-table dip', bestFor: 'Adding tiny spoonfuls beside rice, Southern curries or grilled food so sour heat and smoke cut through a larger meal.', tradeOff: 'Neighbouring dishes can add more allergens and heat. A shared spoon spreads shrimp, fish and chilli across the table.' },
    { title: 'Vendor-confirmed lower heat', bestFor: 'Trying the shrimp-and-lime identity with fewer chillies only when the kitchen can adjust a fresh batch.', tradeOff: 'A premade paste may not be adjustable, and “less spicy” is not “mild”. Removing chilli does not alter seafood, fish sauce or cross-contact.' },
  ],
  orderSteps: [
    { title: 'Name the shrimp dip', text: 'Ask for Nam Prik Goong Siap or show น้ำพริกกุ้งเสียบ. Confirm that goong siap pieces are included rather than receiving generic Nam Prik Kapi, Nam Prik Pao or plain Prik Nam Pla.' },
    { title: 'Map seafood and heat', text: 'Ask about dried shrimp, shrimp paste, fish sauce, chilli level and packaged seasoning. State crustacean, fish, gluten or halal needs before shared mortars and spoons make separation impossible.' },
    { title: 'Build small bites', text: 'Choose clean fresh or cooked vegetables and rice, then start with a tiny amount of dip. Use the serving spoon, protect shared food from double-dipping and refrigerate leftovers promptly.' },
  ],
  cooking: {
    title: 'Check. Toast. Pound. Balance. Plate. Chill.',
    intro: 'A good nam prik is built in sequence so smoke, chilli, sourness, salt and sweetness remain distinct. A complete tested recipe must specify whether its goong siap and shrimp paste are ready to use, toasted or cooked and how much fish sauce and lime to add. This guide protects the sequence, not one formula.',
    steps: ['Choose one complete tested Nam Prik Goong Siap recipe and food-grade dried or smoked shrimp, then read the shrimp, shrimp-paste and fish-sauce labels before preparation.', 'Keep allergen tools clearly identified and clean. Toast, grill or crisp the shrimp and paste only as the tested method directs; smoked or dried does not answer every ready-to-eat question.', 'Pound chilli, garlic and shallot in the specified order, using eye and hand protection appropriate to hot chilli and avoiding splashes or face contact.', 'Add shrimp, shrimp paste, fish sauce, lime and sugar in the tested sequence, tasting with clean spoons rather than returning a used spoon to the mortar.', 'Wash produce under current food-safety guidance, separate raw from blanched or cooked vegetables and arrange the platter with its own clean utensils.', 'Serve a small fresh portion, protect it from heat and contamination, then refrigerate promptly and follow the recipe and product labels for storage or disposal.'],
    boundary: 'Crustacean allergen remains after drying, smoking, pounding or cooking. Product status, room temperature and fresh lime change storage risk, so this page does not invent a universal shelf life or treat a jarred product like a fresh mortar batch. This owner deliberately omits Recipe schema.',
  },
  affiliates: [
    { href: '/go/simple-thai-food-cookbook/', title: 'Simple Thai Food', text: 'A tested Thai cookbook can supply exact ingredient, chilli, mortar and storage controls that this traveller guide should not invent. Check the current contents, edition, format and seller.' },
    { href: '/go/thai-granite-mortar-eight-inch/', title: 'Eight-inch granite mortar', text: 'Useful when the tested paste fits its usable bowl size. Compare weight, interior capacity, worktop protection and allergen cleaning before buying.' },
  ],
  classHref: withSubId(KLOOK_GENERIC, 'en-nam-prik-goong-siap-southern-food-class'),
  classCopy: 'A suitable Phuket or Southern Thai cooking experience can show how a small nam prik works with a full vegetable platter. Klook results are broad: confirm Nam Prik Goong Siap is explicitly on the current menu and check crustacean, fish, chilli, dietary handling, language and cancellation terms.',
  classSignals: [
    { title: 'Goong siap identity', text: 'See why dried-smoked shrimp pieces make this different from smooth shrimp paste or generic nam prik.' },
    { title: 'Mortar sequence', text: 'Learn when chilli, aromatics, shrimp, lime, fish sauce and sugar enter instead of blending everything blindly.' },
    { title: 'Plate architecture', text: 'Use vegetables and rice as texture and intensity controls, not as decorative garnish around an oversized dip.' },
  ],
  faqs: [
    { question: 'What is nam prik made of?', answer: 'Nam prik is a broad Thai chilli-dip category, not one ingredient list. Nam Prik Goong Siap specifically centres on smoked or dried shrimp with chilli and lime; documented versions can add garlic, shallot, shrimp paste, fish sauce and palm sugar.' },
    { question: 'What does nam prik mean?', answer: 'Nam prik is commonly translated as chilli dip or chilli paste. “Goong siap” identifies the Southern smoked or dried shrimp in this version, which is why a shrimp-free paste should not quietly keep the same dish name.' },
    { question: 'What does nam prik taste like?', answer: 'This version is usually hot, sour, smoky and deeply savoury, with small amounts of sweetness balancing the lime and salt. Other nam prik styles can taste completely different, so the full name matters.' },
    { question: 'Is nam prik spicy?', answer: 'Many nam prik dips are spicy, and Southern Nam Prik Goong Siap is commonly hot. Chilli variety and quantity vary. Ask whether the batch is premade and start with a tiny spoonful rather than trusting colour or a universal heat number.' },
    { question: 'What is the difference between nam prik and nam pla?', answer: 'Nam prik is a family of pounded chilli dips. Nam pla is fish sauce, a salty liquid seasoning that may be one ingredient in a nam prik. Prik Nam Pla is a separate table condiment of chillies in fish sauce.' },
    { question: 'Is nam pla the same as fish sauce?', answer: 'Yes: nam pla is the Thai term for fish sauce. Product ingredients and certification still vary, and fish sauce is a fish allergen even when only a small amount enters the dip.' },
    { question: 'What is Thai shrimp paste made of?', answer: 'Thai shrimp paste is generally made by fermenting small shrimp or krill with salt. Species, processing, additives and labels vary. It is a crustacean product and is separate from the larger dried-smoked shrimp pieces that define Goong Siap.' },
    { question: 'Can shrimp paste be eaten raw?', answer: 'Do not assume one shrimp paste is ready to eat straight from the package. Follow its label and a tested recipe: some methods roast, grill or cook it, while commercial products and fresh preparations differ. Heating does not remove the crustacean allergen.' },
    { question: 'What side dishes go well with nam prik?', answer: 'Nam Prik Goong Siap is commonly served with cucumber, long beans, leafy greens, bamboo shoots and rice. A Southern shared table may add curries or grilled dishes, but those bring their own heat, allergens and serving utensils.' },
    { question: 'Should Prik Nam Pla be refrigerated?', answer: 'Prik Nam Pla is a different condiment, but the storage principle is useful: fresh chilli, lime, water and room-temperature service change risk. Follow the specific recipe or product label, use clean utensils and refrigerate fresh leftovers promptly instead of applying one shelf life to every nam prik.' },
  ],
  related: [
    { title: 'Phuket travel guide', description: 'Place Southern food in a realistic island plan instead of treating Phuket as beaches alone.', href: '/city/phuket/', image: '/images/redesign/phuket-destination-hero-v2.webp' },
    { title: 'Moo Hong', description: 'Balance this hot, sour dip with Phuket’s dark and gently peppery pork-belly braise.', href: '/food/moo-hong/', image: '/images/redesign/moo-hong-phuket-braised-pork-hero.webp' },
    { title: 'Oh Aew', description: 'Follow Southern chilli and seafood depth with Phuket’s chilled fig-jelly dessert.', href: '/food/oh-aew/', image: '/images/redesign/oh-aew-phuket-jelly-ice-hero.webp' },
  ],
  sources: [
    { title: 'Culture Compass: Thai Cuisine Explained Part II', creator: 'Thai Trade and Economic Office · Royal Thai Embassy Taipei', url: 'https://tteo.thaiembassy.org/th/content/culture-compass-thai-cuisine-explained-part-ii?menu=61712bcfd4efcd33ab7bd432', note: 'Complete primary Thai-government parse used for Nam Prik Goong Siap as a Southern dried-shrimp chilli paste and for the region’s heat, sourness and seafood context.' },
    { title: 'Typical Southern Thai food to try in Phuket', creator: 'Phuket101', url: 'https://www.phuket101.net/best-southern-food-in-phuket/', note: 'Complete current parse used for one smoked-shrimp, chilli, lime, garlic, fish-sauce, shrimp-paste and palm-sugar expression with a vegetable platter. Restaurant rankings and health copy were excluded.' },
    { title: 'Thai Life: A Culinary Treasure', creator: 'Thailand cultural publication', url: 'https://www.nif-tidthai.org/wp-content/uploads/2016/10/Thai_Life_A_Culinary_Treasure.pdf', note: 'Current PDF capture used for Southern-region placement and fish sauce in one documented expression. Exact quantities were excluded.' },
    { title: 'Review of allergen analytical testing methodologies', creator: 'UK Food Standards Agency', url: 'https://www.food.gov.uk/research/food-hypersensitivity/review-of-allergen-analytical-testing-methodologies-measurement-parameters-and-sensitivity-of-methods?print=1', note: 'Current primary source used for shrimp and prawn as crustacean allergens. Technical thresholds were not turned into a traveller safety guarantee.' },
    { title: 'Safe gluten-free takeaway options', creator: 'Coeliac UK', url: 'https://www.coeliac.org.uk/living-with-coeliac-disease/food-and-drink/eating-out-and-travel/16528-2/', note: 'Expert source used for packaged sauce and shared-equipment gluten checks rather than automatic gluten-free status.' },
  ],
  methodDescription: 'Updated 28 July 2026 after two independent DataForSEO clusters with two raw keyword records, ten current UK-English SERPs with 77 organic results, 55 People Also Ask appearances and 39 unique questions, two complete DFS source parses, current Thai-government, Thai culinary PDF and UK Food Standards Agency captures, plus exact owner ranking and backlink checks. DFS returned no measurable volume, difficulty or competitor-domain table; the owner has zero ranking terms and no reportable backlink summary signal. Nam Prik Kapi, Nam Prik Pao, Prik Nam Pla, generic shrimp paste, health, fixed-price, calorie, automatic dietary, permanent restaurant, universal heat and shelf-life claims were excluded.',
};

export function NamPrikGoongSiapGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
