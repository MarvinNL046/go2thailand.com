import { ChefHat, Flame, Leaf, MapPin, Shell, ShoppingBasket, Sparkles, UtensilsCrossed } from 'lucide-react';
import { KLOOK_GENERIC, withSubId } from '../../lib/affiliates';
import { DishEditorialTemplate, type DishEditorialData } from './DishEditorialTemplate';

const data: DishEditorialData = {
  title: 'Goong Pad Makham: Thai Tamarind Prawns Guide',
  description: 'Understand Goong Pad Makham: Thai tamarind prawns, sweet-sour-salty sauce, southern context, spice, crustacean and cashew checks, and ordering.',
  canonical: 'https://go2-thailand.com/food/goong-pad-makham/',
  updatedAt: '28 July 2026',
  name: 'Goong Pad Makham',
  thaiName: 'กุ้งผัดมะขาม · Thai tamarind prawns',
  heroImage: '/images/redesign/goong-pad-makham-thai-tamarind-prawns-hero.webp',
  heroAlt: 'Fully cooked Thai prawns coated in glossy amber tamarind sauce with fried shallots, coriander, sliced chilli and jasmine rice',
  heroEyebrow: 'Southern prawn plate · tamarind gloss · optional chilli',
  lead: 'Goong Pad Makham coats fully cooked prawns in a glossy tamarind-led sauce where sour, sweet and salty should meet rather than compete. Palm sugar and fish sauce are familiar partners; shallot, garlic, coriander and chilli can deepen the plate. Southern expressions may sear, fry or deep-fry the prawns, while cashew belongs to a documented variation—not every serving.',
  quickFacts: [
    { label: 'Identity', value: 'Prawns · reduced tamarind sauce', icon: Shell },
    { label: 'Balance', value: 'Sour · sweet · salty', icon: Sparkles },
    { label: 'Heat', value: 'Chilli optional · sauce varies', icon: Flame },
    { label: 'Check', value: 'Crustacean · fish · cashew · wheat', icon: ShoppingBasket },
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
    intro: 'Tamarind supplies dark-fruit acidity rather than lemon-like sharpness. Palm sugar rounds it with caramel depth and fish sauce or another salty seasoning prevents the sauce becoming jam. Garlic, shallot and coriander add savoury aroma. Chilli can brighten the finish but is not required for the dish to make sense.',
    texture: 'The prawn should be fully cooked, juicy and firm enough to hold the coating. Reduced sauce should cling in a thin gloss instead of pooling like soup or setting into hard caramel. Fried shallot adds crispness; shell-on, peeled and fried versions create different bite and handling.',
    finish: 'Sour tamarind should return after the first sweetness, followed by salty umami and prawn. Chilli lingers only when used. Jasmine rice can absorb the sauce and reset intensity without becoming part of the named dish.',
    scores: [{ label: 'Tamarind sour', value: 5 }, { label: 'Palm sweetness', value: 4 }, { label: 'Salty umami', value: 4 }, { label: 'Chilli heat', value: 2 }],
  },
  ingredients: [
    { name: 'Fully cooked prawns', role: 'Large prawns hold sauce well, but species, size, shell, head and frying method vary. Crustacean is intrinsic; colour and curl are not the only safe-cooking controls.' },
    { name: 'Tamarind pulp · paste', role: 'Prepared pulp or a pourable Thai ready-to-use paste can supply the sour base. Concentrate, sweetened sauce and products from other cuisines behave differently; read the exact label.' },
    { name: 'Palm sugar', role: 'Palm sugar adds sweetness and caramel aroma that round the acid. White or brown sugar substitutions exist, so one sweetness or colour is not universal.' },
    { name: 'Fish sauce · salty base', role: 'Fish sauce is a familiar salty-umami control. Salt, soy or oyster sauce can appear in variations and change fish, soy, mollusc and wheat checks.' },
    { name: 'Shallot · garlic · coriander', role: 'Aromatic paste or sliced aromatics build savoury depth beneath the sauce. Coriander root or stems withstand heat; leaves can finish the plate.' },
    { name: 'Stock · water', role: 'A small amount helps dissolve sugar and control reduction. Chicken or seafood stock, cubes and powders may introduce meat, fish, crustacean, soy, milk or wheat.' },
    { name: 'Fresh · dried chilli', role: 'Chilli can enter the aromatic paste, sauce or garnish. It is adjustable in some preparations but not after a premixed sauce or fried garnish is already made.' },
    { name: 'Shallot · cashew finish', role: 'Fried shallot is a familiar crisp garnish. Cashew appears in a named Thai variation and is a tree-nut allergen; shared fryers and commercial coatings add further checks.' },
  ],
  allergenCopy: 'Crustacean is intrinsic. Fish sauce can add fish; oyster sauce can add mollusc; cashew is a tree nut in a documented variation. Soy, wheat/gluten, milk or other allergens may enter through bottled tamarind sauce, soy/oyster sauce, stock powder, commercial fried shallots, coatings and shared fryers or woks. Ask about sauce, stock, garnish and oil—not only the visible prawns.',
  vegetarianCopy: 'Goong Pad Makham is not vegetarian or vegan because prawns are the core ingredient, and fish sauce or animal stock can add further animal products. “Pescatarian” does not guarantee suitability for a crustacean allergy, halal requirements or a no-fish-sauce preference. Halal status depends on all sauces, stock, frying medium, alcohol-containing flavourings and shared kitchen controls.',
  formats: [
    { title: 'Seared or stir-fried', bestFor: 'Juicy prawns browned quickly, then coated in a freshly reduced tamarind sauce with direct sweet–sour–salty balance.', tradeOff: 'Ask whether shell and head remain, how much chilli is in the aromatic paste, and whether chicken stock, fish sauce, soy or oyster sauce enters the pan.' },
    { title: 'Fried and sauced', bestFor: 'A crisper Southern or restaurant expression where fried prawns carry the tamarind sauce and fried shallot.', tradeOff: 'Batter or coating is not universal but introduces wheat or egg when used; shared fryer oil changes gluten, shellfish, halal and other allergen boundaries.' },
    { title: 'Cashew variation', bestFor: 'Adding roasted or fried cashew crunch to the glossy prawn-and-tamarind plate when it is clearly named or visible.', tradeOff: 'Cashew is a tree-nut allergen and can remain in oil, scoops and woks. Do not assume a nut-free base merely because cashews are omitted from the top.' },
  ],
  orderSteps: [
    { title: 'Identify prawn and technique', text: 'Ask for Goong Pad Makham / กุ้งผัดมะขาม and check whether the prawns are shell-on, peeled, seared, fried or battered. Confirm size or portion from the current menu rather than expecting one standard plate.' },
    { title: 'Map the whole sauce', text: 'Ask whether tamarind pulp or a premix is used and check palm sugar, fish sauce, stock, soy or oyster sauce. Verify crustacean, fish, mollusc, wheat, soy, milk, halal handling and shared wok or fryer before ordering.' },
    { title: 'Set chilli and garnish', text: 'Request less chilli where the sauce is made to order, then check fried shallot, dried chilli and cashew. Taste with plain rice before adding extra sauce; a premixed base may limit heat or sweetness changes.' },
  ],
  cooking: {
    title: 'Sear the prawn. Build the gloss. Reunite briefly.',
    intro: 'A good sequence protects two endpoints: fully cooked but not rubbery prawns, and a tamarind sauce reduced enough to cling without scorching. Preparing pulp, aromatics and garnish first prevents seafood from waiting in a hot pan.',
    steps: ['Choose one complete tested Goong Pad Makham method. Decide prawn size and shell, tamarind product, sugar, salty seasoning, stock, chilli, garnish and every allergen or halal substitution before cooking.', 'Prepare tamarind pulp or measure the exact labelled paste as directed. Do not substitute a concentrated, sweetened or salted product one-for-one without the tested method accounting for its strength.', 'Keep raw prawns and their liquid away from rice, coriander, fried garnish, sauce spoons and serving plates. Use separate boards and utensils and wash hands and surfaces thoroughly.', 'Sear or fry the prawns in batches by the tested method. Remove them at the specified stage; browning alone does not prove the centre is safely cooked.', 'Cook the aromatic paste, then dissolve tamarind, palm sugar, fish sauce or the tested alternatives with the specified liquid. Reduce while stirring until the sauce coats a spoon without burning.', 'Return prawns only long enough to finish cooking and coat evenly. Verify they are cooked through, serve immediately with clean garnish and rice, and follow the complete method and current food-safety guidance for cooling, storage and reheating.'],
    boundary: 'Prawn size, shell, initial frying, tamarind concentration and sugar change both timing and reduction. Use a complete tested method and current food-safety guidance for safe seafood cooking, temperatures, cooling and storage. This editorial guide deliberately publishes no universal time, shelf life or Recipe schema.',
  },
  affiliates: [
    { href: '/go/simple-thai-food-cookbook/', title: 'Simple Thai Food', text: 'A tested Thai cookbook can supply exact tamarind, sugar, fish-sauce and prawn quantities that this traveller owner should not invent. Check whether a tamarind-prawn method is included in the current contents, then compare edition, format, seller, price and delivery.' },
    { href: '/go/thai-granite-mortar-eight-inch/', title: 'Eight-inch granite mortar', text: 'Useful when a complete method asks you to pound garlic, shallot, coriander root and chilli into a rough paste. Check usable interior, weight, worktop protection and crustacean or nut cleaning; a small processor may suit the tested method better.' },
  ],
  classHref: withSubId(KLOOK_GENERIC, 'en-goong-pad-makham-thai-tamarind-prawns-class'),
  classCopy: 'A relevant Thai cooking class can demonstrate tamarind strength, sauce reduction and the narrow window between cooked and rubbery prawns. Klook results are broad: confirm Goong Pad Makham or a clearly comparable tamarind seafood dish is on the current menu and check hands-on participation, allergens, halal handling, language and cancellation terms.',
  classSignals: [
    { title: 'Tamarind control', text: 'Compare fresh prepared pulp, ready-to-use paste and concentrate before balancing sugar and salty seasoning.' },
    { title: 'Prawn endpoint', text: 'See how one tested method separates raw tools, controls pan load and finishes prawns without extending the reduction.' },
    { title: 'Gloss, not syrup', text: 'Learn when a sauce coats the prawn while still tasting sour, sweet and salty rather than becoming sugary caramel.' },
  ],
  faqs: [
    { question: 'What is Goong Pad Makham?', answer: 'Goong Pad Makham is a Thai prawn dish in which fully cooked prawns are coated or topped with a tamarind-led sauce balanced with sweetness and salty umami. Palm sugar and fish sauce are familiar; shallot, garlic, coriander, chilli, fried shallot and cashew vary.' },
    { question: 'What does Goong Pad Makham mean?', answer: 'Goong means prawn or shrimp, pad means stir-fried and makham means tamarind. English spellings such as Goong Pad Makam or Goong Pad Makaam refer to the same broad dish. Some restaurant versions fry the prawns before adding sauce despite the translated name.' },
    { question: 'What does Goong Pad Makham taste like?', answer: 'Expect tamarind sourness, palm-sugar sweetness and fish-sauce or another salty-savoury note in balance. Prawns add sweetness and briny depth; garlic and shallot add aroma. Chilli can add heat, but it is a variable rather than the defining flavour.' },
    { question: 'What is Thai tamarind sauce made of?', answer: 'For this dish, a familiar base combines tamarind pulp or paste, palm sugar and fish sauce, sometimes loosened with stock or water and cooked with garlic, shallot, coriander root or chilli. Bottled sauces and recipes vary in sugar, salt, soy, wheat and concentration.' },
    { question: 'Is tamarind sauce spicy?', answer: 'Tamarind itself is sour and fruity, not hot. A Goong Pad Makham sauce may include fresh or dried chilli, but the amount varies and can sometimes be reduced. Confirm whether chilli is already in the premix, aromatic paste or fried garnish.' },
    { question: 'Are tamarind prawns gluten-free?', answer: 'Not automatically. Tamarind and prawns do not contain gluten by themselves, but soy or oyster sauce, stock powder, bottled tamarind sauce, coatings, commercial fried shallots and shared fryers or woks may introduce wheat or cross-contact. Verify the complete sauce and process.' },
    { question: 'Does Goong Pad Makham contain nuts?', answer: 'Not every version does, but a documented Thai variation combines tamarind prawns with cashews. Cashew is a tree-nut allergen and shared oil, scoops or woks may matter even when visible nuts are omitted. Ask before ordering.' },
    { question: 'Is Goong Pad Makham halal?', answer: 'Prawns may fit many halal diets, but the finished plate is not automatically verified halal. Check fish, soy or oyster sauces, chicken stock, alcohol-containing flavourings, frying oil, coatings and shared cookware, and look for current certification or accountable vendor evidence when required.' },
    { question: 'What is the difference between Goong Pad Makham and Pad Thai?', answer: 'Both can use tamarind, but Goong Pad Makham centres prawns and a glossy sauce, normally eaten with rice or as a shared dish. Pad Thai is a stir-fried rice-noodle dish with its own egg, tofu, dried shrimp, peanut, sprout and seasoning structure. One should not redirect or cannibalise the other.' },
    { question: 'How do you eat Goong Pad Makham?', answer: 'Eat the prawns with jasmine rice so the rice catches the concentrated sauce. Remove shell or head carefully if retained, add chilli garnish gradually and share serving utensils at a group meal. Ask the kitchen how the current plate is prepared when allergens or halal handling matter.' },
  ],
  related: [
    { title: 'Tom Yum Goong', description: 'Compare a prawn-led hot-and-sour soup with a separate aromatic-herb and clear-versus-creamy structure.', href: '/food/tom-yum-goong/', image: '/images/redesign/tom-yum-goong-hero.webp' },
    { title: 'Pad Thai', description: 'See why sharing tamarind does not make a sauced prawn plate the same owner as Thailand’s famous rice noodles.', href: '/food/pad-thai/', image: '/images/redesign/pad-thai-dish-hero.webp' },
    { title: 'Phuket food guide', description: 'Place tamarind prawns inside a wider southern route through seafood, kopitiams and Phuket culinary history.', href: '/city/phuket/food/', image: '/images/redesign/phuket-food-kopitiam.webp' },
  ],
  sources: [
    { title: 'Thai Tamarind Shrimp Recipe (Goong Pad Makaam)', creator: 'Hot Thai Kitchen', url: 'https://hot-thai-kitchen.com/tamarind-shrimp/', note: 'Complete DFS parse used for sweet–salty–sour balance, optional chilli, tamarind-paste checks, prawns, stock, palm sugar, jasmine-rice pairing, aromatic paste, searing and sauce reduction. Recipe quantities and fixed storage claims were excluded.' },
    { title: 'Gung Pad Nam Makham Med Mamuang Himmaphan', creator: 'Thailand Foundation', url: 'https://thailandfoundation.or.th/gung-pad-nam-makham-med-mamuang-himmaphan-2/', note: 'Current shallow DFS capture used only to corroborate the official named tamarind-prawn-and-cashew variation and its Ministry of Foreign Affairs cooking-project context.' },
    { title: '5 Dishes to Know in Southern Thai Cuisine', creator: 'MICHELIN Guide', url: 'https://guide.michelin.com/en/article/features/5-Dishes-To-Know-In-Southern-Thai-Cuisine', note: 'Current live zero-markdown capture used for southern-dish context, palm sugar, fish sauce, tamarind paste, fried prawns and sweet–salty–sour balance. No recipe was reconstructed from the capture.' },
    { title: 'Retro Decor Meets Phuket Flavours at One Chun', creator: 'MICHELIN Guide', url: 'https://guide.michelin.com/th/en/article/dining-out/behind-the-bib-retro-decor-meets-phuket-flavours-at-one-chun', note: 'Current live zero-markdown capture used narrowly for a Phuket deep-fried prawn and tamarind-sauce expression. Restaurant superlatives, fixed prices and permanent availability were excluded.' },
    { title: 'Allergen guidance for food businesses', creator: 'UK Food Standards Agency', url: 'https://www.food.gov.uk/business-guidance/allergen-guidance-for-food-businesses', note: 'Current primary guidance used for crustacean, fish, mollusc, tree nut, soy, wheat and cross-contact boundaries rather than automatic gluten-free, halal or pescatarian-safe claims.' },
    { title: 'Cooking your food', creator: 'UK Food Standards Agency', url: 'https://www.food.gov.uk/safety-hygiene/cooking-your-food', note: 'Current primary guidance used for safe cooking, raw-to-ready separation and hot service without inventing one universal prawn time or storage period.' },
  ],
  methodDescription: 'Updated 28 July 2026 after two independent DataForSEO clusters with four raw keyword records and no returned competitor-domain table, ten current UK-English SERPs with 74 organic results, 58 People Also Ask appearances and 41 case-normalised unique questions, one complete DFS source parse, one shallow Thailand Foundation capture, two current zero-markdown Michelin captures, current primary FSA allergen and cooking guidance, plus exact owner ranking and backlink checks. DFS returned no measurable exact-head volume or KD, while three Thai-tamarind-prawn variants returned UK volume 10; the owner has zero ranking terms and no reportable backlink summary signal. Pad Thai, Goong Ob Woon Sen, Tom Yum Goong, Pla Goong, generic sweet-and-sour prawns, tamarind ingredient, retailer, health and recipe-only intent remain independent. Fixed-price, calorie, health, automatic gluten-free/halal/pescatarian-safe, permanent-restaurant, universal-heat, shelf-life, compulsory-cashew/chilli/stock/frying/prawn-size and one-formula claims were excluded; Recipe schema is deliberately absent.',
};

export function GoongPadMakhamGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
