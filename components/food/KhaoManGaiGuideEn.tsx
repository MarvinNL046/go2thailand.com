import { ChefHat, Flame, Leaf, MapPin, ShoppingBasket, Sparkles, UtensilsCrossed } from 'lucide-react';
import { KLOOK_GENERIC, withSubId } from '../../lib/affiliates';
import { DishEditorialTemplate, type DishEditorialData } from './DishEditorialTemplate';

const data: DishEditorialData = {
  title: 'Khao Man Gai: Thai Chicken Rice & How to Order',
  description: 'Understand Khao Man Gai: Thai poached chicken rice, Hainanese roots, sauce, soup, Khao Man Gai Tod, allergens, taste and how to order it.',
  canonical: 'https://go2-thailand.com/food/khao-man-gai/',
  updatedAt: '28 July 2026',
  name: 'Khao Man Gai',
  thaiName: 'ข้าวมันไก่ · Thai chicken rice',
  heroImage: '/images/redesign/khao-man-gai-thai-chicken-rice-hero.webp',
  heroAlt: 'Fully cooked sliced Thai poached chicken with fragrant rice, cucumber, separate ginger chilli soybean sauce and a bowl of clear broth',
  heroEyebrow: 'Poached chicken · fragrant rice · Thai taojiew sauce',
  lead: 'Khao Man Gai is Thailand’s chicken-rice comfort plate: gently cooked chicken over rice flavoured with broth and often chicken fat or garlic, with cucumber, a light soup and a separate ginger-chilli dipping sauce. It belongs to the wider Hainanese chicken-rice family, but the Thai sauce gives it a distinct ordering identity.',
  quickFacts: [
    { label: 'Thai name', value: 'Khao Man Gai · ข้าวมันไก่', icon: Sparkles },
    { label: 'Main choice', value: 'Poached · fried · mixed', icon: UtensilsCrossed },
    { label: 'Sauce cue', value: 'Taojiew · ginger · chilli', icon: Flame },
    { label: 'Plate', value: 'Chicken · rice · cucumber · broth', icon: ShoppingBasket },
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
    intro: 'The chicken and rice are intentionally gentle: clean chicken flavour, fragrant savoury rice and cooling cucumber. The separate Thai sauce does the louder work, bringing fermented-soybean depth, ginger, acidity and chilli only in the amount you add.',
    texture: 'Poached chicken should be fully cooked yet tender, while the rice is soft and separate rather than wet. Cucumber adds crunch, broth resets the palate and the sauce can be spooned over individual bites.',
    finish: 'Expect savoury rice and chicken first, then ginger, salty fermented soybean and chilli from the dip. A light broth softens the finish. Sauce, soup and richness change from vendor to vendor.',
    scores: [{ label: 'Savoury', value: 4 }, { label: 'Ginger lift', value: 3 }, { label: 'Rice richness', value: 3 }, { label: 'Hot', value: 2 }],
  },
  ingredients: [
    { name: 'Fully cooked chicken', role: 'Poached whole chicken or selected cuts are familiar. Skin, breast, thigh and portion style vary; the dish name does not prove halal sourcing or safe handling.' },
    { name: 'Jasmine rice', role: 'Commonly cooked with chicken broth and often rendered chicken fat, oil or fried garlic. “Man” points to richness, but one fat level or rice method is not universal.' },
    { name: 'Chicken broth', role: 'Cooking liquid can flavour the rice and return as a light side soup. Stock cubes, seasoning, daikon, winter melon or herbs depend on the kitchen.' },
    { name: 'Taojiew', role: 'Thai fermented soybean paste is a strong sauce signal. It adds soy and salt; exported versions can contain wheat, so the bottle or kitchen recipe matters.' },
    { name: 'Ginger and chilli', role: 'Fresh ginger and chilli commonly sharpen the dipping sauce. Heat often sits mainly in this separate bowl, but a premixed sauce may not be adjustable.' },
    { name: 'Soy and vinegar', role: 'Light or dark soy, vinegar, sugar and lime appear in documented sauces in different combinations. They are recurring options, not one fixed national formula.' },
    { name: 'Cucumber and herbs', role: 'Cucumber is a familiar cool, crisp side. Coriander, spring onion and other garnishes vary and should not be treated as guaranteed.' },
    { name: 'Optional extras', role: 'Some stalls offer liver, other offal, coagulated blood, extra skin or mixed chicken. None is mandatory: ask before the vendor assembles the plate.' },
  ],
  allergenCopy: 'Soy is the clearest recurring check because taojiew and soy sauce appear in many Thai dips. Wheat may be present in fermented paste or soy sauce; stock, seasoning, shared knives and a shared fryer for Khao Man Gai Tod add further boundaries. Ask about the actual sauce and preparation rather than assuming rice makes the plate gluten-free.',
  vegetarianCopy: 'Standard Khao Man Gai is built around chicken, chicken broth and often chicken fat, so it is neither vegetarian nor vegan. A plant-based adaptation needs different protein, rice liquid, fat, sauce and equipment. “No chicken on top” does not change the rice or soup underneath.',
  formats: [
    { title: 'Khao Man Gai', bestFor: 'The classic gentle plate of fully cooked poached chicken, fragrant rice, cucumber, broth and Thai dipping sauce.', tradeOff: 'Choose skin or no skin if available and ask about offal, sauce ingredients, stock and halal sourcing when those decisions matter.' },
    { title: 'Mixed plate', bestFor: 'Trying poached and crispy chicken together when the vendor offers “pasom” or a visibly mixed option.', tradeOff: 'The fried side introduces batter, frying oil and cross-contact. Confirm what “mixed” includes rather than relying on one spelling.' },
    { title: 'Khao Man Gai Tod', bestFor: 'A crispy fried-chicken version served with the same broad rice-plate idea.', tradeOff: 'It is not automatically Hat Yai fried chicken. Check batter, wheat, egg, frying oil and whether sauce or stock still contains soy or animal ingredients.' },
  ],
  orderSteps: [
    { title: 'Choose poached, fried or mixed', text: 'Ask for Khao Man Gai for the poached plate, Khao Man Gai Tod for crispy chicken, or point to the mixed option if available. Do not use “Thai chicken rice” when the stall offers several chicken dishes.' },
    { title: 'Set skin, extras and sauce', text: 'Choose skin on or off where possible, ask whether liver, other offal or blood is included, and request the chilli sauce separately if you want to control heat. A premixed dip may still be spicy.' },
    { title: 'Verify hidden boundaries', text: 'Check taojiew, soy, wheat, stock, halal sourcing, batter and shared fryer or knife contact before ordering. The rice and soup can contain chicken even when the topping changes.' },
  ],
  cooking: {
    title: 'Poach. Verify. Rest. Cook the rice. Build the sauce.',
    intro: 'A complete tested recipe coordinates three linked jobs: cook the chicken safely without drying it, use measured cooking liquid and fat for the rice, and make the punchy sauce separately. The sequence matters more than copying a street-stall timing onto a different bird or cooker.',
    steps: ['Choose one tested Khao Man Gai or Hainanese chicken-rice recipe and map the chicken size, rice ratio, broth, sauce, equipment and allergen substitutions before starting.', 'Keep raw chicken and its tools away from cucumber, herbs, cooked rice, sauce bowls and serving utensils; wash hands and surfaces between tasks.', 'Poach or gently cook the chicken by the tested method, then verify it is steaming hot and cooked through with no pink meat and clear juices, or use the recipe’s validated time-and-temperature control.', 'Rest and slice the fully cooked chicken with clean tools. Do not return it to a board or knife that held raw poultry.', 'Cook the rice with the tested amount of broth and fat or garlic, using the recipe’s saucepan or rice-cooker ratio rather than guessing from ordinary steamed rice.', 'Prepare the taojiew-ginger-chilli dip and light broth as specified, then serve the chicken, rice, cucumber, sauce and soup hot with each component kept distinct.'],
    boundary: 'Chicken size, poaching temperature, rice absorption and sauce salinity vary. The UK Food Standards Agency says poultry should be steaming hot and cooked through, with no pink meat and clear juices, or cooked using a safe time-and-temperature combination. Use a tested recipe for exact quantities, temperatures, cooling, storage and reheating; this editorial owner deliberately omits Recipe schema.',
  },
  affiliates: [
    { href: '/go/simple-thai-food-cookbook/', title: 'Simple Thai Food', text: 'A tested Thai cookbook can supply exact chicken, rice and sauce quantities that this traveller guide should not invent. Compare the current edition, format, seller and delivery details.' },
    { href: '/go/zojirushi-six-cup-rice-cooker/', title: 'Six-cup rice cooker', text: 'Potentially useful for broth rice only when the real capacity and programme match your method. Check current model, local voltage, plug, warranty, bowl care and seller; OneLink does not guarantee a UK-compatible version.' },
  ],
  classHref: withSubId(KLOOK_GENERIC, 'en-khao-man-gai-thai-chicken-rice-cooking-class'),
  classCopy: 'A relevant Thai cooking class can show why poaching, rice absorption and a separate fermented-soybean sauce need different controls. Klook results are broad, so verify that Khao Man Gai is on the current menu and ask about raw-poultry handling rather than assuming every class teaches it.',
  classSignals: [
    { title: 'Chicken control', text: 'See how one tested method separates raw tools, cooks the bird and verifies doneness before slicing.' },
    { title: 'Broth rice', text: 'Learn how measured broth and fat change jasmine-rice texture without turning it into fried rice.' },
    { title: 'Thai sauce', text: 'Taste taojiew, ginger, chilli, soy and acidity separately and identify the soy and wheat boundary.' },
  ],
  faqs: [
    { question: 'What is Khao Man Gai in English?', answer: 'Khao Man Gai is usually described as Thai chicken rice or Thai-style Hainanese chicken rice. A familiar plate has fully cooked poached chicken, fragrant broth rice, cucumber, a light soup and a separate Thai ginger-chilli fermented-soybean sauce.' },
    { question: 'What does Khao Man Gai mean?', answer: 'Khao means rice, man refers to oily or fat-enriched richness, and gai means chicken. “Khao mun gai” is another common English transliteration. The practical menu meaning is chicken with fragrant, enriched rice rather than plain steamed rice.' },
    { question: 'What does Khao Man Gai taste like?', answer: 'The chicken and rice are mild, savoury and comforting. The Thai dipping sauce supplies the stronger fermented-soybean, ginger, chilli, sweet and acidic notes. Cucumber and clear broth make the overall plate feel lighter, but every vendor balances it differently.' },
    { question: 'Is Khao Man Gai the same as Hainanese chicken rice?', answer: 'It belongs to the same Hainanese chicken-rice family and shares poached chicken plus broth-and-fat cooked rice. Thailand developed its own familiar sauce and service pattern. Singaporean, Malaysian, Thai and family versions should not be treated as identical.' },
    { question: 'Is Khao Man Gai Thai or Singaporean?', answer: 'The dish family has roots in Hainan and travelled through Chinese migration across Southeast Asia. Khao Man Gai is the Thai adaptation; Singapore has its own prominent Hainanese chicken-rice traditions. It is more accurate to name the version than assign the whole family to one modern country.' },
    { question: 'What is Khao Man Gai sauce made of?', answer: 'A familiar Thai sauce uses fermented soybean paste called taojiew or taucheo with ginger and chilli, then may include soy sauce, vinegar, sugar, lime, garlic or coriander. Recipes vary by stall and household, and fermented paste can contain soy and wheat.' },
    { question: 'How do you eat Khao Man Gai?', answer: 'Add a little sauce to a bite of chicken and rice, use cucumber for crunch and sip the light broth between bites. There is no required sequence. Keeping the sauce separate lets you control salt and chilli more easily.' },
    { question: 'What is Khao Man Gai Tod?', answer: 'Khao Man Gai Tod is the crispy fried-chicken branch of the chicken-rice plate. Some vendors offer poached, fried or mixed chicken. Batter, wheat, egg, fryer sharing and sauce can change, and it is distinct from the regional Gai Tod Hat Yai owner.' },
    { question: 'Is Khao Man Gai spicy?', answer: 'The chicken and rice are usually mild; most chilli heat comes from the separate dipping sauce. Ask for sauce on the side and use a little first. That cannot make a premixed sauce chilli-free, so confirm ingredients when heat avoidance is important.' },
    { question: 'Is Hainanese chicken rice healthy?', answer: 'There is no universal healthy or unhealthy verdict. Portion, chicken skin, fat used in the rice, sauce sodium, soup, sides and individual needs all change the meal. A fixed calorie number would also vary by vendor; use your own dietary guidance and ask how the plate is prepared.' },
  ],
  related: [
    { title: 'Thai Fried Rice', description: 'Keep Khao Pad Gai and wok-fried chicken-rice intent with the dedicated Thai fried-rice owner.', href: '/food/thai-fried-rice/', image: '/images/redesign/thai-fried-rice-khao-pad-hero.webp' },
    { title: 'Gai Tod Hat Yai', description: 'Continue to Southern Thailand’s distinct fried-chicken tradition with crispy shallot and its own seasoning boundary.', href: '/food/gai-tod-hat-yai/', image: '/images/food/gai-tod-hat-yai.webp' },
    { title: 'Thai cuisine guide', description: 'Place Khao Man Gai inside a wider food route with regional dishes, ordering and dietary decisions.', href: '/travel-guides/thai-cuisine-food-guide/', image: '/images/redesign/thailand-food-hub-hero.webp' },
  ],
  sources: [
    { title: 'Chicken Rice Khao Man Gai Recipe', creator: 'Eating Thai Food', url: 'https://www.eatingthaifood.com/chicken-rice-khao-man-gai-recipe/', note: 'Complete DFS parse used for plate structure, mild base, broth rice, separate Thai sauce, cucumber and soup. Personal superlatives, fixed storage advice and one family recipe were excluded.' },
    { title: 'Classic Hainanese Chicken Rice (Khao Man Gai)', creator: 'Hot Thai Kitchen', url: 'https://hot-thai-kitchen.com/hainanese-chicken-rice/', note: 'Complete DFS parse used for the wider Hainanese family, Thai sauce distinction, poached chicken, broth-and-fat rice and recurring accompaniments. Recipe quantities and household preferences were not universalised.' },
    { title: 'Thai Chicken & Rice “Khao Mun Gai”', creator: 'Marion’s Kitchen', url: 'https://www.marionskitchen.com/thai-chicken-rice/', note: 'Complete DFS parse used as an independent expression of stock-poached chicken, jasmine rice, Thai soybean-paste sauce and broth. Commercial copy and comments were excluded.' },
    { title: 'Khao Man Gai: Thai Chicken Rice', creator: 'Michelin Guide Thailand', url: 'https://guide.michelin.com/th/en/article/features/iconic-dishes-khao-man-gai-thai-chicken-rice', note: 'Current editorial source used for Hainan migration context, Thai sauce signals, optional extras and Khao Man Gai Tod. No ingredient was treated as mandatory.' },
    { title: 'Cooking your food', creator: 'UK Food Standards Agency', url: 'https://www.food.gov.uk/safety-hygiene/cooking-your-food', note: 'Current official control for poultry being steaming hot and cooked through, with no pink meat and clear juices, or using an appropriate time-and-temperature combination.' },
  ],
  methodDescription: 'Updated 28 July 2026 after two independent DataForSEO clusters with 237 raw keyword records and 61 competitor-domain records, ten current UK-English SERPs with 72 organic results, 47 People Also Ask appearances and 36 unique genuine questions, three complete DFS source parses, one current Michelin editorial capture, one official UK food-safety control, plus exact owner ranking and backlink checks. The route has UK head-term volume 590 / KD 0, zero ranking terms and no reportable backlink summary signal. Thai chicken fried rice remains with Khao Pad; Hat Yai fried chicken remains independent. Fixed prices, calories, universal health or halal labels, automatic gluten-free status, one sauce or soup formula, mandatory offal, unsafe chicken guidance and unsupported first-hand claims were excluded.',
};

export function KhaoManGaiGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
