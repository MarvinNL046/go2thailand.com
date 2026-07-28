import { ChefHat, Fish, Flame, Leaf, MapPin, ShoppingBasket, Sparkles, Soup } from 'lucide-react';
import { KLOOK_GENERIC, withSubId } from '../../lib/affiliates';
import { DishEditorialTemplate, type DishEditorialData } from './DishEditorialTemplate';

const data: DishEditorialData = {
  title: 'Tom Som Pla: Thai Sour Fish Soup Guide',
  description: 'Understand Tom Som Pla: its clear sour fish broth, regional sour fruits, taste, fish and shrimp-paste checks, spice, ordering and Thai soup differences.',
  canonical: 'https://go2-thailand.com/food/tom-som-pla/',
  updatedAt: '28 July 2026',
  name: 'Tom Som Pla',
  thaiName: 'ต้มส้มปลา · Thai sour fish soup',
  heroImage: '/images/redesign/tom-som-pla-thai-sour-fish-soup-hero.webp',
  heroAlt: 'Clear golden Thai sour fish soup with fully cooked white fish, lemongrass, shallot, coriander, chilli and sour fruit beside jasmine rice',
  heroEyebrow: 'Clear fish broth · regional sour fruit · no fixed formula',
  lead: 'Tom Som Pla is a Thai sour-fish-soup family, not one fixed turmeric recipe. Fish is gently cooked in a light broth whose acidity may come from tamarind or a local sour fruit. Shallot, coriander root, lemongrass, fish sauce, kapi, chilli and turmeric move in and out with region and kitchen. The useful question is not only “how spicy?” but “which Tom Som is this?”',
  quickFacts: [
    { label: 'Identity', value: 'Fish · clear sour broth', icon: Fish },
    { label: 'Sourness', value: 'Tamarind or local fruit', icon: Sparkles },
    { label: 'Heat', value: 'Mild to hot · version-led', icon: Flame },
    { label: 'Check', value: 'Fish · shrimp paste · stock', icon: ShoppingBasket },
  ],
  navItems: [
    { href: '#taste', label: 'Taste', icon: Sparkles },
    { href: '#ingredients', label: 'Signals', icon: ShoppingBasket },
    { href: '#choose', label: 'Choose', icon: Soup },
    { href: '#order', label: 'Order', icon: MapPin },
    { href: '#cook', label: 'Cook', icon: ChefHat },
    { href: '#questions', label: 'Questions', icon: Leaf },
  ],
  taste: {
    intro: 'Sourness should lead without flattening the fish. A clear broth can carry salty depth from fish sauce, salt, kapi or stock and a restrained sweetness in some expressions. Lemongrass, shallot, coriander root, pepper, chilli or turmeric change the aroma and heat; no single one defines every bowl.',
    texture: 'The broth is soup-like rather than coconut-creamy or thick like a reduced curry. Fish should be fully cooked yet remain in distinct moist pieces. Whole or bone-in fish creates a different eating rhythm from fillet chunks, so ask before the bowl arrives.',
    finish: 'The souring agent matters: tamarind is dark-fruity, Garcinia/asam more piercing, while other local fruit or leaves can taste greener or more floral. Salt, gentle sweetness and fish return after the acid; chilli may linger but is not a universal endpoint.',
    scores: [{ label: 'Sour fruit', value: 5 }, { label: 'Salty depth', value: 4 }, { label: 'Gentle sweet', value: 2 }, { label: 'Chilli heat', value: 2 }],
  },
  ingredients: [
    { name: 'Fresh fish', role: 'Fish is the owner signal, but mackerel, mullet, sea bass, tilapia, sand whiting and other local fish appear. Species, cut, bones, skin and availability are not universal; fish is an intrinsic allergen.' },
    { name: 'Sour fruit · tamarind', role: 'Tamarind is familiar, while documented southern kitchens use Garcinia/asam, salak, roselle, bilimbi, young fruit or leaves. A bottled premix may add sugar, salt or other ingredients.' },
    { name: 'Shallot', role: 'Smashed shallot can perfume a simple broth; in other versions it enters a pounded paste. Onion or garlic may appear, so one pale clear bowl does not reveal the complete aromatic base.' },
    { name: 'Coriander root · pepper', role: 'Michelin documents coriander root in a familiar Tom Som paste. Pepper, coriander seed, stems or leaves vary and should be treated as aromatic branches rather than compulsory garnish.' },
    { name: 'Lemongrass · herbs', role: 'A Phuket family expression uses bruised lemongrass. Makrut lime, galangal, ginger or spring onion can appear elsewhere, but a full tom-yum herb set is not required for Tom Som identity.' },
    { name: 'Kapi · shrimp paste', role: 'Krill or shrimp paste adds fermented savoury depth in documented versions, including a simple Phuket broth. It introduces crustacean even when no shellfish is visible and may matter for halal handling.' },
    { name: 'Fish sauce · salt · stock', role: 'Salt or fish sauce controls the savoury edge; stock, cubes and powders are kitchen choices rather than a default. They may add fish, crustacean, mollusc, soy, wheat, milk or meat ingredients.' },
    { name: 'Turmeric · chilli branch', role: 'Pla Tom Kamin is a documented clear yellow southern relative with turmeric. Chilli can enter paste or broth. Neither turmeric-yellow colour nor a fixed heat level defines every Tom Som Pla.' },
  ],
  allergenCopy: 'Fish is intrinsic. Kapi or shrimp paste adds crustacean; fish sauce, stock, seasoning powder and shared pots or ladles may add fish, crustacean, mollusc, soy, wheat/gluten, milk or other allergens. Coconut is not required, but absence of coconut milk does not prove the bowl safe. Ask about the broth base, paste, seasoning and shared preparation.',
  vegetarianCopy: 'Tom Som Pla is not vegetarian or vegan because fish is the central ingredient, and fish sauce, shrimp paste or animal stock can add more animal products. It is not automatically halal: verify the fish, kapi, sauce, stock, alcohol-containing flavourings and shared kitchen. “Pescatarian” does not answer a fish or crustacean allergy.',
  formats: [
    { title: 'Clear sour balance', bestFor: 'Learning the broad Tom Som idea through fish, a light broth and sourness that may be rounded by salt, aromatics and a little sweetness.', tradeOff: 'Ask for the souring agent, fish species or cut, chilli level, paste, stock and whether kapi or shrimp paste is used. Do not infer “central” from colour alone.' },
    { title: 'Phuket sour fruit', bestFor: 'A southern Tom Som Pla Sai expression built to foreground fresh local fish and Garcinia/asam, tamarind or another regional sour ingredient.', tradeOff: 'Sand whiting is documented, not compulsory. Confirm current fish, bones, sour fruit, shrimp paste and whether the bowl is available rather than freezing one restaurant example.' },
    { title: 'Turmeric-yellow branch', bestFor: 'Exploring the southern Pla Tom Kamin relationship: a clear, pale-yellow fish soup where turmeric aroma and a mild salty-sour profile can lead.', tradeOff: 'Yellow is not automatically Gaeng Som, but names overlap by kitchen. Ask whether it is Tom Som, Tom Kamin or curry-paste-led Gaeng Som and set heat accordingly.' },
  ],
  orderSteps: [
    { title: 'Name the soup family', text: 'Ask for Tom Som Pla / ต้มส้มปลา, then confirm whether the kitchen means a clear sour fish soup, Tom Som Pla Sai, Pla Tom Kamin or Gaeng Som. English menu descriptions often collapse these distinct owners.' },
    { title: 'Choose fish and sourness', text: 'Check today’s fish, whole versus fillet, bones and portion, then ask whether sourness comes from tamarind, Garcinia/asam, bilimbi, roselle or another ingredient. Choose plain rice to absorb the broth.' },
    { title: 'Map paste, heat and allergens', text: 'Ask about chilli, kapi or shrimp paste, fish sauce, stock, bottled seasoning and shared pots. Confirm fish, crustacean, soy, wheat/gluten and halal handling before ordering; clear broth is not a dietary guarantee.' },
  ],
  cooking: {
    title: 'Build the broth. Poach the fish. Stop on time.',
    intro: 'The best sequence protects two things at once: a sour broth balanced before service and fish that is fully cooked without disintegrating. Prepare every souring ingredient, paste and garnish before raw fish enters the workflow.',
    steps: ['Choose one complete tested Tom Som Pla method and its regional style. Decide the fish cut, souring agent, aromatics, kapi or alternative, seasoning, chilli, turmeric branch and all allergen substitutions before cooking.', 'Prepare tamarind pulp or the specified local sour ingredient exactly as the tested method directs. Concentrate, sweetened sauce, dried Garcinia and fresh fruit are not one-for-one substitutes.', 'Keep raw fish and its liquid away from cooked rice, herbs, tasting spoons and serving bowls. Use separate utensils and clean hands, boards and surfaces thoroughly.', 'Build and taste the broth base before the fish goes in, but do not treat this early taste as the final balance. Fish, kapi, sauce and reduction can change salt, sourness and aroma.', 'Add fish according to its species, thickness, bone and the tested method. Maintain the specified heat, avoid aggressive stirring and verify that the centre is safely cooked rather than judging only by broth colour.', 'Serve promptly with clean utensils and rice. Follow the complete method and current food-safety guidance for cooling, refrigeration and reheating; do not repeatedly warm a shared seafood pot.'],
    boundary: 'Fish species, thickness, bone, starting temperature and broth heat change cooking time. Use one complete tested method and current food-safety guidance. This traveller guide deliberately publishes no universal minute count, internal temperature, shelf life or Recipe schema.',
  },
  affiliates: [
    { href: '/go/simple-thai-food-cookbook/', title: 'Simple Thai Food', text: 'A tested Thai cookbook can place sour soups inside the wider tom family and give exact quantities that this traveller owner should not invent. Check the current contents for Tom Som, fish soup or a comparable sour-broth method, then compare edition, format, seller, price and delivery.' },
    { href: '/go/thai-granite-mortar-eight-inch/', title: 'Eight-inch granite mortar', text: 'Useful only when a complete method asks you to pound shallot, coriander root, pepper, chilli or kapi into a paste. Check usable interior, weight, worktop protection and seafood-allergen cleaning; a simple bruised-aromatic broth may not need one.' },
  ],
  classHref: withSubId(KLOOK_GENERIC, 'en-tom-som-pla-thai-sour-fish-soup-class'),
  classCopy: 'A relevant Thai cooking class can make sour-fruit strength, broth balance and fish doneness visible. Klook results are broad: confirm Tom Som Pla, Tom Kamin or a clearly comparable sour fish soup is on the current menu and check hands-on participation, fish handling, allergens, language and cancellation terms.',
  classSignals: [
    { title: 'Taste the sour source', text: 'Compare tamarind with the class’s local souring ingredient before adding sugar, salt or fish sauce.' },
    { title: 'Separate the families', text: 'Ask the teacher to contrast Tom Som with Tom Yum Pla, Tom Khlong and curry-paste-led Gaeng Som.' },
    { title: 'Protect the fish', text: 'See how one tested method controls fish cut, broth movement, doneness and raw-to-ready separation.' },
  ],
  faqs: [
    { question: 'What is Tom Som Pla?', answer: 'Tom Som Pla is a Thai sour fish soup family. Fish is cooked in a light broth made sour with tamarind or another local sour fruit, then balanced with salty seasoning, aromatics and sometimes sweetness or chilli. Ingredients and colour vary by region and kitchen.' },
    { question: 'What does Tom Som Pla mean?', answer: 'Tom refers to boiling or a boiled broth, som signals sourness and pla means fish. The name therefore points to sour fish soup rather than one mandatory ingredient list. It is unrelated to som tam, the pounded-salad family.' },
    { question: 'What does Tom Som Pla taste like?', answer: 'Sourness leads, followed by salty fish depth and sometimes a gentle sweetness. Tamarind tastes dark and fruity; Garcinia/asam, bilimbi, roselle or other local ingredients change the acidity. Chilli, turmeric, lemongrass, coriander root and shrimp paste vary.' },
    { question: 'What are the ingredients in Tom Som Pla?', answer: 'Fish and a sour broth are the stable signals. Documented versions use tamarind or local sour fruit with shallot, coriander root, lemongrass, kapi or shrimp paste, fish sauce, palm sugar, pepper, chilli or turmeric in different combinations. No single list covers every bowl.' },
    { question: 'Is Tom Som Pla spicy?', answer: 'Not always. Some bowls are mild and sour-salty, while others use chilli paste or sit close to hotter southern cooking. Ask whether chilli is already pounded into the base and distinguish Tom Som from southern Gaeng Som, which can be much hotter.' },
    { question: 'Is Tom Som Pla gluten-free?', answer: 'Not automatically. Fish, sour fruit and fresh herbs do not contain gluten by themselves, but stock powder, bottled seasoning, soy sauce, commercial paste and shared pots may introduce wheat or cross-contact. Verify the complete broth and preparation.' },
    { question: 'Does Tom Som Pla contain coconut milk?', answer: 'A clear Tom Som Pla normally does not depend on coconut milk, and the documented sources used here are broth-led. Regional and restaurant recipes still vary, so ask if coconut is an allergy or preference rather than treating appearance as proof.' },
    { question: 'What is the difference between Tom Som Pla and Tom Yum Pla?', answer: 'Both are sour fish soups, but Tom Yum Pla belongs to the tom-yum family and commonly foregrounds lemongrass, galangal, makrut lime, chilli and lime-led seasoning. Tom Som is defined more broadly by its sour broth and can use tamarind or regional sour fruit with a different paste or aromatic structure.' },
    { question: 'What is the difference between Tom Som Pla and Gaeng Som?', answer: 'Tom Som Pla is a broth-led sour fish soup. Gaeng Som is a sour curry built around a curry paste and commonly cooked with vegetables; southern Gaeng Som can be turmeric-yellow and intensely hot. Menu translations blur the distinction, so ask which paste and vegetables are used.' },
    { question: 'How do you eat Tom Som Pla?', answer: 'Serve it as part of a shared meal with jasmine rice, spooning broth and fish over a small portion of rice. Check for bones, add chilli gradually and use a clean serving spoon. Ask about today’s fish, souring ingredient and paste before ordering.' },
  ],
  related: [
    { title: 'Tom Yum Goong', description: 'Compare Thailand’s better-known prawn soup, its tom-yum aromatic family and clear-versus-creamy choices.', href: '/food/tom-yum-goong/', image: '/images/redesign/tom-yum-goong-hero.webp' },
    { title: 'Pla Pao', description: 'Follow fish into a salt-crusted charcoal preparation with a separate sauce, herb and eating method.', href: '/food/pla-pao/', image: '/images/redesign/pla-pao-salt-crusted-grilled-fish-hero.webp' },
    { title: 'Phuket food guide', description: 'Place southern sour soups inside Phuket’s wider seafood, kopitiam and regional food route.', href: '/city/phuket/food/', image: '/images/redesign/phuket-food-kopitiam.webp' },
  ],
  sources: [
    { title: 'Thai Soups Explained: Tom Kha, Tom Yum, Tom Kloang and Tom Som', creator: 'MICHELIN Guide', url: 'https://guide.michelin.com/en/article/features/thai-soups-explained-tom-kha-tom-yum-tom-klong-and-tom-som', note: 'Current live zero-markdown capture used for the meaning of tom and som, familiar paste components, variable souring agents, fish choices and soup-family distinctions.' },
    { title: 'Phuket Sand Whiting Fish Soup Recipe, Tom Som Pla Sai', creator: 'Pranee’s Thai Kitchen', url: 'https://praneesthaikitchen.com/2012/12/30/phuket-sand-whiting-fish-soup-recipe-tom-som-pla-sai/', note: 'Complete DFS parse used for the Phuket family expression, sand whiting, sour-fruit diversity, shrimp paste, lemongrass, shallot and broth-first sequence. Quantities and fixed times were excluded.' },
    { title: 'The Identity of Thai Cuisine in the 4 Regions', creator: 'Srinakharinwirot University', url: 'https://thesis.swu.ac.th/swuebook/A403432.pdf', note: 'Current zero-markdown PDF capture used narrowly for the Pla Tom Kamin/Tom Som description, clear turmeric-yellow southern branch and mild salty-sour profile.' },
    { title: 'Tom Yum Fish Soup', creator: 'Hot Thai Kitchen', url: 'https://hot-thai-kitchen.com/tom-yum-fish/', note: 'Partial DFS parse used only to protect the separate Tom Yam Pla aromatic-herb owner. Its recipe quantities, health framing and storage claims were excluded.' },
    { title: 'Rustic Thai Sour Curry with Shrimp (Gaeng Som)', creator: 'Hot Thai Kitchen', url: 'https://hot-thai-kitchen.com/gaeng-som/', note: 'Complete DFS parse used only to protect the curry-paste, vegetable and regional Gaeng Som boundary. Recipe quantities and dietary labels were not transferred.' },
    { title: 'Allergen guidance for food businesses', creator: 'UK Food Standards Agency', url: 'https://www.food.gov.uk/business-guidance/allergen-guidance-for-food-businesses', note: 'Current primary guidance used for fish, crustacean, soy, wheat and cross-contact boundaries rather than automatic dietary claims.' },
    { title: 'Cooking your food', creator: 'UK Food Standards Agency', url: 'https://www.food.gov.uk/safety-hygiene/cooking-your-food', note: 'Current primary guidance used for safe cooking and raw-to-ready separation without inventing one universal fish time, temperature or storage period.' },
  ],
  methodDescription: 'Updated 28 July 2026 after two independent DataForSEO clusters with 66 raw keyword records and no returned competitor-domain table, ten current UK-English SERPs with 69 organic result appearances, 54 People Also Ask appearances and 46 case-normalised unique questions, two complete DFS source parses, one partial parse, two current zero-markdown authority captures, current primary FSA allergen and cooking guidance, plus exact owner ranking and backlink checks. The exact head returned no measurable volume or KD; the closest relevant “thai fish soup recipe” term returned UK volume 50 and KD 0. Tom Yam Pla, Gaeng Som, Tom Khlong, Pla Tom Kamin, generic coconut fish soup, fish stew, retailer, health and recipe-only intent remain independent. Fixed-price, calorie, health, automatic dietary, permanent-restaurant, universal-heat, shelf-life, compulsory-turmeric/tamarind/chilli/coconut/sugar/kapi/lemongrass/fish-species/garnish/regional-origin and one-formula claims were excluded; Recipe schema is deliberately absent.',
};

export function TomSomPlaGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
