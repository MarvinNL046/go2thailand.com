import { ChefHat, Flame, Leaf, MapPin, ShoppingBasket, Sparkles, UtensilsCrossed } from 'lucide-react';
import { KLOOK_GENERIC, withSubId } from '../../lib/affiliates';
import { DishEditorialTemplate, type DishEditorialData } from './DishEditorialTemplate';

const data: DishEditorialData = {
  title: 'Thai Fried Rice (Khao Pad): Ingredients & How to Order',
  description: 'Understand Thai Fried Rice, or Khao Pad: taste, ingredients, protein names, heat, sauces, allergens, Khao Pad versus Chinese fried rice and how to order it.',
  canonical: 'https://go2-thailand.com/food/thai-fried-rice/',
  updatedAt: '28 July 2026',
  name: 'Thai Fried Rice',
  thaiName: 'ข้าวผัด · Khao Pad',
  heroImage: '/images/redesign/thai-fried-rice-khao-pad-hero.webp',
  heroAlt: 'Fully cooked Thai Khao Pad with loose jasmine rice, prawns, egg and greens beside lime, cucumber and a separate bowl of prik nam pla',
  heroEyebrow: 'Khao Pad · jasmine rice · cooked to order',
  lead: 'Khao Pad is Thailand’s everyday fried rice: cooked jasmine rice stir-fried quickly with egg, garlic, a chosen protein and the kitchen’s seasoning. It is usually savoury rather than chilli-led, with lime, cucumber or prik nam pla adding freshness and heat at the table. The exact vegetables and sauces change by cook and version.',
  quickFacts: [
    { label: 'Thai name', value: 'Khao Pad · ข้าวผัด', icon: Sparkles },
    { label: 'Rice', value: 'Cooked jasmine rice · loose grains', icon: ShoppingBasket },
    { label: 'Heat', value: 'Often mild · chilli may be separate', icon: Flame },
    { label: 'Choose', value: 'Gai · Moo · Goong · Pu · vegetables', icon: UtensilsCrossed },
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
    intro: 'A familiar Khao Pad is savoury, lightly aromatic and drier than a sauce-heavy rice dish. Garlic, egg and the chosen protein sit around the rice rather than hiding it. Lime and cucumber brighten the plate; prik nam pla adds a salty chilli edge only when you use it.',
    texture: 'Good versions keep the grains separate with tender egg and small pieces of protein or vegetables. Moisture changes with the rice, wok load and sauce, so “fried” does not mean hard, greasy or uniformly smoky.',
    finish: 'Expect rice, egg and savoury seasoning first, followed by garlic, spring onion or white pepper. Lime sharpens the finish. Fish sauce, soy or oyster sauce can deepen it, but no one sauce combination defines every kitchen.',
    scores: [{ label: 'Savoury', value: 4 }, { label: 'Aromatic', value: 3 }, { label: 'Fresh finish', value: 3 }, { label: 'Hot', value: 1 }],
  },
  ingredients: [
    { name: 'Cooked jasmine rice', role: 'A common base whose cooled, separated grains handle a fast stir-fry well. Other rice and same-day cooled rice occur; “day-old” is texture advice, never permission for unsafe room-temperature storage.' },
    { name: 'Egg', role: 'Often scrambled through or beside the rice, but not compulsory. Ask explicitly when avoiding egg because its absence cannot be inferred from the protein name.' },
    { name: 'Chosen protein', role: 'Gai is chicken, moo pork, goong prawn and pu or poo crab. Beef, squid, mixed seafood, tofu and vegetable-led versions depend on the kitchen.' },
    { name: 'Garlic and alliums', role: 'Garlic, onion and spring onion are recurring aromatic signals. Shallot, Chinese broccoli, carrot, tomato or another vegetable may appear without becoming universal.' },
    { name: 'Fish sauce', role: 'Common in Thai fried-rice examples and in prik nam pla. It adds savoury depth and a fish-allergen and vegetarian boundary even when no seafood is visible.' },
    { name: 'Soy and oyster sauce', role: 'One or both may season a house version. Soy can involve soy and wheat; oyster sauce involves shellfish unless a verified plant-based alternative is used.' },
    { name: 'Lime and cucumber', role: 'Frequent fresh accompaniments that brighten and cool the plate. They may arrive beside the rice rather than being cooked into it.' },
    { name: 'Prik nam pla', role: 'A separate chilli-and-fish-sauce condiment, sometimes with lime. It lets the diner add heat, but a shared bowl and hidden fish sauce still require an allergen check.' },
  ],
  allergenCopy: 'Egg, fish, shellfish, soy and wheat are the main checks. Oyster sauce, stock, seasoning powder and a shared wok or spatula can add less visible exposure. A prawn-free plate is not automatically shellfish-safe, and rice itself does not make the complete dish gluten-free.',
  vegetarianCopy: 'A vegetable or tofu Khao Pad can work, but “no meat” does not remove egg, fish sauce, oyster sauce, animal stock or a shared wok. Ask for the complete sauce and preparation change. For vegan or medically necessary avoidance, use a kitchen that can explain both ingredients and cross-contact.',
  formats: [
    { title: 'Classic Khao Pad', bestFor: 'A mild, flexible rice meal where the grain, egg and simple savoury seasoning remain central.', tradeOff: 'Choose the protein and check the house sauces. Tomato, basil, sugar and vegetables vary rather than defining the dish.' },
    { title: 'Named-protein Khao Pad', bestFor: 'Ordering directly: Khao Pad Gai, Moo, Goong or Pu tells the cook which main protein you want.', tradeOff: 'A protein name does not reveal egg, fish sauce, oyster sauce, stock or shared-wok contact. Crab and prawn versions require a direct shellfish check.' },
    { title: 'Khao Pad Sapparot', bestFor: 'A distinct pineapple-led fried rice with sweet fruit and possible curry powder, cashews, raisins, prawn or chicken.', tradeOff: 'It has its own owner and allergen pattern. Do not assume the pineapple shell, nuts or one restaurant presentation is universal.' },
  ],
  orderSteps: [
    { title: 'Choose the version', text: 'Ask for Khao Pad plus the available protein: gai for chicken, moo for pork, goong for prawn or pu/poo for crab. For a meat-free version, confirm tofu or vegetables rather than relying on “vegetarian” alone.' },
    { title: 'Set heat and table extras', text: 'Khao Pad is often mild, while sliced chilli or prik nam pla adds heat at the table. Ask whether chilli is already in the wok; “mai pet” cannot remove a premixed chilli sauce.' },
    { title: 'Verify hidden seasoning', text: 'Check egg, fish sauce, oyster sauce, soy or wheat, stock and shared-wok contact before cooking begins. Request lime or cucumber only after the dietary boundary is understood.' },
  ],
  cooking: {
    title: 'Cook. Cool safely. Separate. Stir-fry. Serve.',
    intro: 'Khao Pad depends on preparation more than a long ingredient list. A tested method cooks the rice, cools any rice being saved quickly, prepares small dry ingredients, cooks raw protein safely, keeps the wok load manageable and seasons without flooding the grains.',
    steps: ['Select one tested Thai fried-rice recipe and map its rice, protein, egg, vegetables, sauces, garnish and allergen substitutions before heating the wok.', 'Cook jasmine rice correctly. If saving it for later, cool it as quickly as possible—ideally within one hour—and refrigerate rather than leaving it in a rice cooker or pan.', 'Prepare vegetables and aromatics, break chilled rice into loose grains and keep raw protein, cooked food and ready-to-eat garnishes on separate tools and surfaces.', 'Cook the chosen protein and egg according to the tested sequence, using a hot but controllable pan and a batch size the equipment can actually stir-fry.', 'Add rice and measured seasoning in the recipe’s order, tossing until the grains separate and the whole dish is steaming hot without soaking it in sauce.', 'Finish with spring onion or white pepper as specified, serve immediately with prepared lime and cucumber, and add prik nam pla only to the individual diner’s taste.'],
    boundary: 'The UK Food Standards Agency advises cooling cooked rice quickly, refrigerating it, using it within 24 hours, reheating only once and reheating until steaming hot throughout. Reheating cannot correct rice that was stored unsafely. Use a tested recipe for exact quantities, protein temperatures and timings; this editorial owner deliberately omits Recipe schema.',
  },
  affiliates: [
    { href: '/go/simple-thai-food-cookbook/', title: 'Simple Thai Food', text: 'A tested cookbook supplies exact quantities and sequence that an editorial dish guide should not invent. Compare the current edition, format, seller and delivery details.' },
    { href: '/go/zojirushi-six-cup-rice-cooker/', title: 'Six-cup rice cooker', text: 'Useful only when its real capacity fits your household. Check current model, local voltage, plug, warranty, bowl care and seller before buying; OneLink does not guarantee a UK-compatible version.' },
  ],
  classHref: withSubId(KLOOK_GENERIC, 'en-thai-fried-rice-khao-pad-cooking-class'),
  classCopy: 'A relevant Thai cooking class can show grain preparation, wok load, sauce control and how table condiments change the final bite. Klook results are broad, so verify that Khao Pad is on the current menu rather than assuming every class teaches it.',
  classSignals: [
    { title: 'Rice texture', text: 'See how cooked rice is cooled, separated and handled without turning texture advice into unsafe storage.' },
    { title: 'Wok sequence', text: 'Learn when protein, egg, rice, vegetables and sauce enter one tested version—and why batch size matters.' },
    { title: 'Seasoning boundary', text: 'Taste fish sauce, soy, oyster sauce, lime and prik nam pla separately before deciding what belongs in your plate.' },
  ],
  faqs: [
    { question: 'What makes Thai fried rice different?', answer: 'Many Khao Pad versions use jasmine rice, egg, garlic, a chosen protein and Thai seasonings such as fish sauce, then arrive with lime, cucumber or prik nam pla. Those are recurring signals, not a universal formula. Thai and Chinese fried-rice traditions are both diverse.' },
    { question: 'What are the ingredients in Thai fried rice?', answer: 'A common version combines cooked jasmine rice, egg, garlic, onion or spring onion, a protein, vegetables and savoury seasoning. Fish sauce, soy sauce, oyster sauce, white pepper, sugar, tomato, Chinese broccoli and garnishes vary by cook and named version.' },
    { question: 'What sauce is used in Thai fried rice?', answer: 'Fish sauce is a recurring Thai signal, while soy sauce and oyster sauce also appear in tested versions. Some cooks use a combination and others season more simply. Ask about the actual house sauce when fish, shellfish, soy, wheat or vegetarian status matters.' },
    { question: 'What does Thai style fried rice taste like?', answer: 'Khao Pad is usually savoury and aromatic with rice, egg, garlic and protein at the centre. Lime can add acidity, cucumber freshness and prik nam pla salty chilli heat. It is often less sweet or sauce-heavy than travellers expect, but house recipes vary.' },
    { question: 'How spicy is typical Thai fried rice?', answer: 'Many standard Khao Pad plates are mild, with chilli added separately through prik nam pla or table condiments. Chilli can also be cooked into a particular version, so ask before ordering. “Mai pet” is useful but cannot remove a premixed chilli seasoning.' },
    { question: 'What is Khao Pad made of?', answer: 'Khao Pad literally describes fried rice. The broad dish commonly uses cooked jasmine rice, egg, garlic, a protein or vegetables and savoury seasoning, then may be served with lime, cucumber, spring onion or prik nam pla.' },
    { question: 'What are some variations of Khao Pad?', answer: 'Protein names create familiar variants: gai for chicken, moo for pork, goong for prawn and pu or poo for crab. Egg, vegetables, tofu, squid, mixed seafood and chilli-led versions occur. Khao Pad Sapparot is the distinct pineapple-fried-rice branch.' },
    { question: 'What is Khao Pad Poo?', answer: 'Khao Pad Pu—often written Khao Pad Poo in English—is Thai crab fried rice. Crab is the named protein, but egg, fish sauce, soy, oyster sauce and shared shellfish preparation still depend on the kitchen.' },
    { question: 'What is the difference between Chinese fried rice and Thai fried rice?', answer: 'There is no single Chinese or Thai formula. Thai Khao Pad often uses jasmine rice, fish sauce and a lime or prik-nam-pla finish, while Chinese regional and diaspora fried-rice styles use many rice types, proteins, aromatics and seasonings. Compare named dishes rather than national stereotypes.' },
    { question: 'Is Thai fried rice healthy?', answer: 'No universal healthy or unhealthy label is accurate. Portion, oil, rice quantity, protein, vegetables, sauces, sodium and individual needs change the plate. Ask how it is prepared and choose a portion and ingredients that fit your own dietary guidance; a fixed calorie number would be misleading.' },
  ],
  related: [
    { title: 'Khao Pad Sapparot', description: 'Open the separate pineapple-fried-rice owner for fruit, curry-powder and nut or seafood checks.', href: '/food/khao-pad-sapparot/', image: '/images/food/khao-pad-sapparot.webp' },
    { title: 'Pad Kra Pao', description: 'Compare mild fried rice with a holy-basil stir-fry whose chilli and sauce usually lead much more strongly.', href: '/food/pad-krapow/', image: '/images/redesign/pad-kra-pao-bangkok-hero.webp' },
    { title: 'Thai cuisine guide', description: 'Place Khao Pad inside a wider food route with regional dishes, ordering and dietary decisions.', href: '/travel-guides/thai-cuisine-food-guide/', image: '/images/redesign/thailand-food-hub-hero.webp' },
  ],
  sources: [
    { title: 'Secrets to Thai Cooking', creator: 'Thailand Foundation with Thailand Ministry of Foreign Affairs', url: 'https://thailandfoundation.or.th/secrets-to-thai-cooking/', note: 'Primary-context source confirming Khao Pad as Thai-style fried rice and a recognised Thai dish; broad promotional health language was excluded.' },
    { title: 'Authentic Thai Fried Rice Recipe (street-food style)', creator: 'Eating Thai Food', url: 'https://www.eatingthaifood.com/thai-fried-rice-recipe-shrimp/', note: 'Complete DFS parse used for street-stall context, jasmine rice, named protein, lime, prik nam pla and one shrimp technique; personal superlatives were excluded.' },
    { title: 'Thai-style fried rice with shrimp or prawns', creator: 'Rosa’s Thai', url: 'https://rosasthai.com/recipes/thai-style-fried-rice-with-shrimp-or-prawns', note: 'Complete DFS parse used as one restaurant expression of the recurring rice, garlic, sauce, vegetable and lime pattern; promotion was excluded.' },
    { title: 'Thai Fried Rice', creator: 'The Woks of Life', url: 'https://thewoksoflife.com/thai-fried-rice/', note: 'Complete DFS parse used for Thai-versus-Chinese comparison boundaries, sauce variability, proteins and wok sequence; one family recipe was not universalised.' },
    { title: 'Home food fact checker: rice', creator: 'UK Food Standards Agency', url: 'https://www.food.gov.uk/safety-hygiene/home-food-fact-checker', note: 'Current official source for fast cooling, refrigerated storage, one reheating cycle and reheating rice until steaming hot throughout.' },
  ],
  methodDescription: 'Updated 28 July 2026 after two independent DataForSEO clusters with 392 raw keyword records and 100 competitor-domain records, ten current UK-English SERPs with 75 organic results, 57 People Also Ask appearances and 41 unique genuine questions, five complete DFS source parses, plus exact owner ranking and backlink checks. The owner has UK head-term volume 1,300, zero returned ranking terms and no reportable backlink summary signal. Pineapple-specific intent remains with Khao Pad Sapparot. Near-me, takeaway, unrelated Pad Kra Pao, fixed prices, calories, universal health labels, one authentic formula, unsafe leftover-rice advice, automatic dietary status and unsupported first-hand claims were excluded.',
};

export function ThaiFriedRiceGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
