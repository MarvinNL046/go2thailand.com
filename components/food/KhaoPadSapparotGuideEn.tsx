import { ChefHat, Flame, Leaf, MapPin, ShoppingBasket, Sparkles, UtensilsCrossed } from 'lucide-react';
import { KLOOK_GENERIC, withSubId } from '../../lib/affiliates';
import { DishEditorialTemplate, type DishEditorialData } from './DishEditorialTemplate';

const data: DishEditorialData = {
  title: 'Khao Pad Sapparot: Thai Pineapple Fried Rice',
  description: 'Understand Khao Pad Sapparot: Thai pineapple fried rice, curry powder, prawns, egg, cashews, raisins, sauces, allergens, ordering and safe rice handling.',
  canonical: 'https://go2-thailand.com/food/khao-pad-sapparot/',
  updatedAt: '28 July 2026',
  name: 'Khao Pad Sapparot',
  thaiName: 'ข้าวผัดสับปะรด · Thai pineapple fried rice',
  heroImage: '/images/redesign/khao-pad-sapparot-thai-pineapple-fried-rice-hero.webp',
  heroAlt: 'Thai Khao Pad Sapparot with separate golden jasmine rice grains, fully cooked prawns, pineapple, egg, cashews, raisins and spring onion in a pineapple half',
  heroEyebrow: 'Jasmine rice · warm curry spice · fresh pineapple',
  lead: 'Khao Pad Sapparot is real Thai pineapple fried rice, not merely a beach-resort prop. Distinct jasmine-rice grains carry warm curry powder and savoury seasoning; pineapple gives juicy sweet-sour contrast. Prawns, egg, cashews and raisins form one recognisable expression, while the carved pineapple shell is optional theatre—not the definition of the dish.',
  quickFacts: [
    { label: 'Name', value: 'Khao = rice · pad = stir-fried · sapparot = pineapple', icon: Sparkles },
    { label: 'Core', value: 'Jasmine rice · pineapple · curry powder', icon: ShoppingBasket },
    { label: 'Service', value: 'Plate or clean pineapple half · both valid', icon: UtensilsCrossed },
    { label: 'Heat', value: 'Usually mild · chilli condiment can be hot', icon: Flame },
  ],
  navItems: [
    { href: '#taste', label: 'Taste', icon: Sparkles },
    { href: '#ingredients', label: 'Signals', icon: ShoppingBasket },
    { href: '#choose', label: 'Choose', icon: UtensilsCrossed },
    { href: '#order', label: 'Order', icon: MapPin },
    { href: '#cook', label: 'Wok', icon: ChefHat },
    { href: '#questions', label: 'Questions', icon: Leaf },
  ],
  taste: {
    intro: 'Fresh pineapple brings juicy sweetness and acidity into savoury, lightly salty fried rice. Curry powder adds warm aromatic depth rather than a wet curry sauce, while fish or soy seasoning carries umami across the grains.',
    texture: 'Good fried rice has separate grains with lightly toasted edges. Prawns are firm, egg stays tender, pineapple remains juicy and cashews add crunch. A wet pineapple shell, overloaded wok or too much sauce can turn those contrasts soft and clumped.',
    finish: 'Spring onion, tomato, cucumber or lime can make the finish fresher. Phrik nam pla adds sharp chilli and fish-sauce intensity, so taste the rice before adding the condiment—it changes both heat and allergen exposure.',
    scores: [{ label: 'Sweet-savoury', value: 5 }, { label: 'Aromatic', value: 4 }, { label: 'Toasted', value: 4 }, { label: 'Base heat', value: 2 }],
  },
  ingredients: [
    { name: 'Jasmine rice', role: 'The familiar Thai base. Separate, reasonably dry grains matter more than a myth that the rice must be “day-old”. Fresh rice can work in a complete method; stored rice needs strict cooling and reheating control.' },
    { name: 'Pineapple', role: 'Supplies the defining juicy sweet-sour contrast. Fresh fruit is prominent in Thai specialist methods; canned versions also exist. Ripeness, moisture and sweetness change the balance.' },
    { name: 'Curry powder · white pepper', role: 'Build the golden colour and warm aroma. Turmeric or different blends may appear, but this remains fried rice rather than a wet curry or biryani.' },
    { name: 'Prawns · chicken · other protein', role: 'Fully cooked prawns are familiar; chicken, pork, tofu or mixed seafood can replace them. The selected protein changes crustacean, mollusc, meat, halal and shared-wok checks.' },
    { name: 'Egg', role: 'Scrambled into the rice for tenderness and richness in many versions. It is a direct allergen and must be separately omitted—not merely picked out—for egg-free or vegan needs.' },
    { name: 'Cashews · raisins', role: 'Roasted cashews add tree-nut crunch and raisins add concentrated sweetness in a recognisable presentation. Both can vary; cashew omission still requires shared-container and wok checks.' },
    { name: 'Fish sauce · soy · shrimp paste', role: 'Carry salt and umami. Fish, crustacean, soy and wheat/gluten can hide here, and oyster or commercial seasoning sauce may add mollusc or other ingredients.' },
    { name: 'Tomato · spring onion · shell', role: 'Fresh additions lift the finish. The hollowed pineapple is an optional serving vessel that should be clean and dry; a plate is equally Khao Pad Sapparot.' },
  ],
  allergenCopy: 'Crustacean may enter through prawns or shrimp paste; fish through fish sauce; egg and cashew are common. Soy, wheat/gluten, mollusc, sesame, peanut and coconut can appear through sauces, seasoning, variation or a shared wok. Curry powder colour and a fruit shell reveal none of this. Ask about the complete seasoning mix, protein, garnish and cookware before ordering.',
  vegetarianCopy: 'Khao Pad Sapparot is not automatically vegetarian or vegan: a bowl without visible meat can still contain fish sauce, shrimp paste, egg or stock. A plant-based version needs replacement seasoning, no egg and clean utensils. Halal suitability depends on protein, fish/shrimp seasoning, sauces, possible alcohol ingredients and shared wok—not simply the absence of pork.',
  formats: [
    { title: 'Classic prawn and egg', bestFor: 'Trying the familiar golden rice, fresh pineapple, fully cooked prawns, tender egg, cashews and optional raisins.', tradeOff: 'Expect crustacean, fish, egg, soy and tree-nut checks; shrimp paste or wheat-containing sauce may be hidden. Request chilli condiment separately.' },
    { title: 'Chicken or chosen protein', bestFor: 'Selecting chicken, pork, seafood or another clearly named protein while keeping the pineapple–curry-powder rice structure.', tradeOff: 'Protein substitution can add soy marinade, oyster sauce or shared-wok contact. Confirm the sauce and seasoning rather than checking only the meat.' },
    { title: 'Separately verified plant-based bowl', bestFor: 'A kitchen willing to replace fish/shrimp seasoning, omit egg and use tofu or vegetables with clean utensils.', tradeOff: 'Cashew, soy, gluten and shared-wok risks can remain. A vegetable label does not prove vegan, halal or coeliac-safe preparation.' },
  ],
  orderSteps: [
    { title: 'Name the owner and presentation', text: 'Ask for Khao Pad Sapparot / ข้าวผัดสับปะรด and confirm whether it comes on a plate or in a pineapple half. The vessel is optional; do not confuse it with ordinary Khao Pad or Pad Thai noodles.' },
    { title: 'Choose protein and map seasoning', text: 'Identify prawns, chicken, pork, tofu or mixed seafood, then check egg, cashew, fish sauce, shrimp paste, soy/oyster sauce, stock and curry-powder blend. State serious allergies and dietary needs before the wok starts.' },
    { title: 'Control condiment and freshness', text: 'Ask for phrik nam pla or chilli sauce on the side, then taste first. Choose rice served hot from an active wok and treat takeaway leftovers carefully; a decorative shell does not protect temperature control.' },
  ],
  cooking: {
    title: 'Cool safely. Set the wok. Fry fast. Finish fresh.',
    intro: 'Fried rice depends on prepared ingredients and controlled rice moisture, not one magical age of rice. A complete tested method must specify the chosen rice, protein, seasoning and wok sequence. This traveller owner protects the decisions without inventing one recipe.',
    steps: ['Choose one complete tested Khao Pad Sapparot method. Cook jasmine rice as directed; if rice is prepared for later use, cool it quickly according to current official guidance, keep it refrigerated and do not leave it at room temperature.', 'Cut and drain pineapple, prepare vegetables and measure dry spices and liquid seasoning before heating the wok. Keep raw prawns, chicken or other protein away from cooked rice and ready-to-eat garnishes.', 'Cook the selected protein thoroughly using the complete method, then remove or position it as directed. Prawns must be opaque; poultry, pork and other proteins require their own current safe endpoint.', 'Scramble egg where used, add rice and distribute curry powder and seasoning evenly over high controlled heat. Work in a suitable batch so grains fry and toast rather than steam into a wet mass.', 'Add pineapple late enough to heat without releasing excessive liquid. Return cooked protein, then finish cashews, raisins, tomato and spring onion in the sequence specified by the tested method.', 'Serve hot on a plate or in a clean, dry pineapple half. Use clean utensils, hold hot food safely and cool any kept rice promptly; reheating cannot repair toxins produced by badly stored rice.'],
    boundary: '“Day-old rice” is neither compulsory nor permission to leave rice out. UK official guidance requires rapidly chilled, refrigerated rice when it will be used later and thorough safe reheating. Protein, egg and sauce also keep their own cooking and allergen requirements. The pineapple shell changes presentation, not food safety. Recipe schema is deliberately omitted.',
  },
  affiliates: [
    { href: '/go/simple-thai-food-cookbook/', title: 'Simple Thai Food', text: 'A tested Thai cookbook can supply exact rice, wok, protein, seasoning and food-safety controls that this traveller guide should not invent. Check the current edition, recipe index, format, seller, price and delivery before buying.' },
  ],
  classHref: withSubId(KLOOK_GENERIC, 'en-khao-pad-sapparot-bangkok-market-cooking-experience'),
  classCopy: 'A suitable Bangkok market or Thai cooking experience can show how dry jasmine rice, fresh pineapple, curry powder and seasoning come together without steaming the wok. Klook results are broad: confirm Khao Pad Sapparot is explicitly in the current menu and check protein, allergens, dietary handling, language, group size and cancellation terms before booking.',
  classSignals: [
    { title: 'Rice control', text: 'See how moisture, batch size and heat create separate toasted grains without treating unsafe room-temperature rice as a shortcut.' },
    { title: 'Sweet-savoury balance', text: 'Learn when pineapple, curry powder, fish/soy seasoning and optional raisins enter so fruit stays bright instead of making the rice wet.' },
    { title: 'Optional theatre', text: 'Carve and dry a pineapple vessel only when useful, while recognising that a plate-served bowl remains the same dish.' },
  ],
  faqs: [
    { question: 'What is pineapple rice called in Thai food?', answer: 'Thai pineapple fried rice is called Khao Pad Sapparot, also written khao phat sapparod or similar transliterations. Khao means rice, pad/phat means stir-fried and sapparot/sapparod means pineapple. The spellings point to one dish owner.' },
    { question: 'What is Khao Pad?', answer: 'Khao Pad is the broad Thai fried-rice family: jasmine rice is stir-fried with seasoning and a chosen protein or vegetables, often with lime and chilli-fish-sauce condiment. Khao Pad Sapparot is the pineapple-and-curry-powder expression, not a synonym for every Khao Pad.' },
    { question: 'What is Thai-style pineapple fried rice?', answer: 'It is fried jasmine rice built around pineapple and warm curry-powder aroma, often with egg, prawns or another protein, cashews, raisins, tomato and spring onion. Fish and soy seasonings are familiar. A pineapple shell is optional presentation rather than the definition.' },
    { question: 'What is in Khao Pad Sapparot?', answer: 'A recognisable version combines jasmine rice, pineapple, curry powder, egg, prawns, cashews, raisins, onion, tomato, spring onion, fish sauce and soy sauce; shrimp paste may appear. Chicken, pork, tofu, coconut rice and different vegetables are credible variations. Verify the actual wok.' },
    { question: 'What sauce is in Thai pineapple fried rice?', answer: 'The researched specialist pattern can combine fish sauce and soy sauce, sometimes with optional shrimp paste, sugar, salt and dry curry powder. Other kitchens use oyster sauce, stock or commercial seasoning. Ask about fish, crustacean, soy, wheat and mollusc instead of assuming one universal sauce.' },
    { question: 'What meat goes with pineapple fried rice?', answer: 'Prawns are a familiar match, while chicken, pork, mixed seafood, tofu or no visible meat also appear. Choose based on preference and dietary needs, then verify marinade, stock, seasoning and shared-wok contact because the protein label does not describe the whole dish.' },
    { question: 'Is Khao Pad Sapparot vegetarian?', answer: 'Not automatically. Even a vegetable-looking bowl may contain fish sauce, shrimp paste, egg or stock. A vegetarian version needs those checked and replaced; a vegan version must also omit egg and animal stock. Cashew, soy, gluten and shared-wok exposure may remain.' },
    { question: 'Is Thai pineapple fried rice gluten-free?', answer: 'Rice, pineapple and pure spices do not require gluten, but soy sauce, oyster sauce, stock, curry blends and shared woks can add wheat or cross-contact. Ask for the sauce labels and preparation method; a golden colour or fruit serving bowl is not proof of coeliac safety.' },
    { question: 'Does Thai pineapple fried rice have cashews?', answer: 'Cashews are common in the recognisable prawn-and-pineapple expression and add roasted crunch, but they are not compulsory in every version. For a tree-nut allergy, request omission before cooking and check the garnish container, oil, utensils and shared wok.' },
    { question: 'What makes Thai fried rice taste different?', answer: 'Thai Khao Pad commonly uses fragrant jasmine rice and fish-sauce, lime, white-pepper and chilli-condiment cues alongside soy seasoning; protein is often named when ordering. Khao Pad Sapparot adds pineapple and warm curry powder. Chinese fried-rice traditions are diverse, so avoid one universal comparison.' },
  ],
  related: [
    { title: 'Thai Fried Rice', description: 'Understand the broader Khao Pad owner before deciding whether pineapple, curry powder and cashews are the version you want.', href: '/food/thai-fried-rice/', image: '/images/redesign/thai-fried-rice-khao-pad-hero.webp' },
    { title: 'Bangkok travel guide', description: 'Place a market or cooking stop inside a useful neighbourhood and transport plan instead of chasing one permanent restaurant.', href: '/city/bangkok/', image: '/images/redesign/bangkok-food-yaowarat.webp' },
    { title: 'Pad Kra Pao', description: 'Compare a chilli-basil wok dish served over rice with this fruit-led fried-rice owner.', href: '/food/pad-krapow/', image: '/images/redesign/pad-kra-pao-bangkok-hero.webp' },
  ],
  sources: [
    { title: 'Thai Pineapple Fried Rice', creator: 'Hot Thai Kitchen · Pailin Chongchitnant', url: 'https://hot-thai-kitchen.com/pineapple-fried-rice/', note: 'Complete current Thai specialist parse used for the Thai owner, pineapple/curry/rice structure, prawn, egg, sauces, cashew, optional raisin and shrimp-paste signals, substitutions and optional pineapple-bowl service. Exact quantities, timing and subjective claims were excluded.' },
    { title: 'Pineapple Fried Rice', creator: 'Thai Chef School', url: 'https://thaichefschool.com/recipes/pineapple-fried-rice/', note: 'Complete Thai culinary-school parse independently supporting cooked rice, shrimp, pineapple, curry/turmeric, cashew, raisin, vegetables, soy seasoning, phrik nam pla and variation between instructors.' },
    { title: 'Chicken Pineapple Fried Rice', creator: 'Hungry in Thailand · Praew', url: 'https://hungryinthailand.com/chicken-pineapple-fried-rice/', note: 'Complete current Thai specialist parse used for a chicken expression, pineapple, vegetables, stir-fry sauce and pineapple-shell context. Health, fixed-time, “authentic” and subjective claims were excluded.' },
    { title: 'Five incredible street-food stalls in Yaowarat', creator: 'MICHELIN Guide Thailand', url: 'https://guide.michelin.com/th/en/article/dining-out/five-incredible-street-food-stalls-in-yaowarat-s-chinatown', note: 'Current broad Khao Pad context for jasmine rice, lime, spring onion, nam pla prik and named protein. DFS returned zero markdown, so no recipe, price or permanence claim is derived from it.' },
    { title: 'Safe method: rice', creator: 'UK Food Standards Agency', url: 'https://www.food.gov.uk/sites/default/files/media/document/sfbb-indian-05-cooking-06-rice_0.pdf', note: 'Current primary guidance used for quickly cooling rice intended for later use, refrigerated storage and thorough safe reheating. DFS returned zero markdown; the live primary document was verified separately.' },
    { title: 'Allergen guidance for food businesses', creator: 'UK Food Standards Agency', url: 'https://www.food.gov.uk/business-guidance/allergen-guidance-for-food-businesses', note: 'Current primary guidance used for crustacean, fish, egg, tree nut, soy, wheat, mollusc and cross-contact boundaries rather than automatic safety.' },
  ],
  methodDescription: 'Updated 28 July 2026 after two independent DataForSEO clusters with 108 raw keyword records and 50 competitor domains, eleven current UK-English SERPs with 78 organic results, 62 People Also Ask appearances and 44 case-normalised unique questions, three complete DFS source parses, one current zero-markdown Michelin context capture, one current zero-markdown primary FSA rice-safety capture, current allergen guidance, plus exact owner ranking and backlink checks. DFS returned UK volume 140 and KD 0 for “khao pad sapparot” and volume 480 with KD 13 for “thai pineapple fried rice”; the owner has zero ranking terms and no reportable backlink summary signal. Generic Khao Pad, Pad Thai, American fried rice, pineapple curry, global pineapple rice, recipe-only, health, calorie, fixed-price, automatic dietary, permanent restaurant, compulsory pineapple-shell, universal mildness and one-formula claims were excluded.',
};

export function KhaoPadSapparotGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
