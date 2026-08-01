import { ChefHat, Flame, Leaf, MapPin, ShoppingBasket, Sparkles, UtensilsCrossed } from 'lucide-react';
import { KLOOK_GENERIC, withSubId } from '../../lib/affiliates';
import { DishEditorialTemplate, type DishEditorialData } from './DishEditorialTemplate';

const data: DishEditorialData = {
  title: 'Pla Pao: Thai Salt-Crusted Grilled Fish',
  description: 'Understand Pla Pao: whole fish, salt crust, charcoal, herbs, dipping sauces, fish species, bones, allergens, halal checks and how to eat it.',
  canonical: 'https://go2-thailand.com/food/pla-pao/',
  updatedAt: '28 July 2026',
  name: 'Pla Pao',
  thaiName: 'ปลาเผา · salt-crusted whole grilled fish',
  heroImage: '/images/redesign/pla-pao-salt-crusted-grilled-fish-hero.webp',
  heroAlt: 'Thai Pla Pao whole salt-crusted grilled fish with opaque flaky flesh, lemongrass, lettuce, herbs, rice noodles and two sauces',
  heroEyebrow: 'Isaan table · salt shell · charcoal-grilled whole fish',
  lead: 'Pla Pao is a whole fish protected by a coarse salt shell, stuffed with aromatics and cooked slowly over charcoal until the flesh is opaque, moist and flaky. The crust and scaled skin are lifted away; the flesh is shared with rice or a miang-style field of lettuce, herbs, noodles and dipping sauces. The fish is mild—the sauce is where chilli, lime and hidden ingredients often live.',
  quickFacts: [
    { label: 'Roots', value: 'Isaan and river tables · sold nationwide', icon: MapPin },
    { label: 'Fish', value: 'Tilapia · red tilapia · snakehead · varies', icon: ShoppingBasket },
    { label: 'Service', value: 'Whole fish · shared flesh · rice or wraps', icon: UtensilsCrossed },
    { label: 'Heat', value: 'Mild fish · hot sauce optional', icon: Flame },
  ],
  navItems: [
    { href: '#taste', label: 'Taste', icon: Sparkles },
    { href: '#ingredients', label: 'Signals', icon: ShoppingBasket },
    { href: '#choose', label: 'Choose', icon: UtensilsCrossed },
    { href: '#order', label: 'Share', icon: MapPin },
    { href: '#cook', label: 'Grill', icon: ChefHat },
    { href: '#questions', label: 'Questions', icon: Leaf },
  ],
  taste: {
    intro: 'Inside the cracked salt shell, the fish is mild, gently smoky and perfumed by lemongrass and lime leaf. The crust seasons and protects rather than turning every bite into salt. Fish species, size, charcoal and cooking control still move the flavour considerably.',
    texture: 'Correctly cooked flesh separates into moist opaque flakes beneath skin and scales that have taken the direct heat. Lettuce, cucumber and herbs add crunch; rice noodles or rice make the fish substantial. Fine bones remain a practical part of eating a whole fish.',
    finish: 'Green seafood sauce can be sharp with lime, garlic and chilli; nam jim jaew can feel darker, roasted and savoury. Use each sparingly at first—the sauces can dominate the delicate flesh and may carry more allergens than the fish itself.',
    scores: [{ label: 'Smoky', value: 4 }, { label: 'Aromatic', value: 4 }, { label: 'Juicy', value: 5 }, { label: 'Sauce heat', value: 4 }],
  },
  ingredients: [
    { name: 'Whole fish', role: 'Tilapia, red tilapia and snakehead are documented choices; other firm fish appear. Species, size, bones, farming and availability vary. Fish is a direct allergen.' },
    { name: 'Coarse salt shell', role: 'Forms a protective jacket over scaled skin and supports moist flesh. The shell is lifted away rather than eaten by the spoonful.' },
    { name: 'Scales · skin', role: 'Often remain as a barrier under the salt in tested methods. Service removes crust and skin to expose flesh; kitchen preparation varies by species and recipe.' },
    { name: 'Lemongrass', role: 'Stuffed into the cavity in familiar versions so steam carries citrus aroma through the fish. It is aromatic structure, not proof of doneness.' },
    { name: 'Makrut lime leaf', role: 'A familiar companion aromatic in some methods. Leaves and stuffing are not automatically edible garnishes and proportions vary.' },
    { name: 'Charcoal heat', role: 'Builds smoke and cooks a thick whole fish gradually. Flame, distance and fish size matter; browned salt alone is not a safe endpoint.' },
    { name: 'Dipping sauces', role: 'Green seafood sauce or nam jim jaew can bring chilli, lime, fish sauce, roasted rice or tamarind. Soy, wheat, peanut and packaged seasoning require checking.' },
    { name: 'Miang sides', role: 'Lettuce, herbs, cucumber, rice noodles or rice turn the fish into shared wraps. Every tray component and serving spoon has its own allergen and hygiene status.' },
  ],
  allergenCopy: 'Fish is intrinsic. A flour-bound salt coat, fish/soy sauce, stock powder, roasted-rice mix, chilli sauce, noodles and shared grill can add wheat/gluten, soy, peanut, crustacean, sesame or other allergens. Ask whether the salt mixture includes flour and inspect both dipping sauces; removing the crust does not erase ingredients or shared handling.',
  vegetarianCopy: 'Pla Pao is fish and therefore neither vegetarian nor vegan. It may suit a pescatarian only after the coating, sauces, sides and shared grill are checked. Fish may fit many halal diets, but flour mix, packaged seasoning, sauces, alcohol-containing additions and contact with pork or other grill foods vary; use a certified or sufficiently transparent vendor.',
  formats: [
    { title: 'Shared whole Pla Pao', bestFor: 'Two or more diners who want mild charcoal fish with rice, vegetables and sauces passed separately.', tradeOff: 'Confirm fish species and size, coating flour, sauce ingredients and grill contact. One person should portion carefully around the spine and fine bones.' },
    { title: 'Miang Pla Pao set', bestFor: 'Wrapping fish flakes with lettuce, herbs, cucumber, rice noodles and a small spoon of sauce.', tradeOff: 'The larger tray creates more allergen and hygiene points. Check noodles, sauces, peanuts, shared spoons and raw vegetables independently.' },
    { title: 'Mild-sauce plate', bestFor: 'Enjoying aromatic flesh with sauce omitted or served separately when chilli is the main concern.', tradeOff: 'Mild does not mean allergen-free. Fish remains, and the salt coat, grill, noodles and alternative seasoning still require checks.' },
  ],
  orderSteps: [
    { title: 'Choose the actual fish', text: 'Ask for Pla Pao / ปลาเผา and identify tilapia, red tilapia, snakehead or another fish plus its approximate size. Confirm whether it is one whole fish for sharing and whether a miang set is included.' },
    { title: 'Map crust, sauce and grill', text: 'Ask whether flour binds the salt, what enters each sauce, whether peanuts or soy appear and what else shares the grill. State fish, gluten, soy, peanut and halal needs before the fish is coated or plated.' },
    { title: 'Open and portion safely', text: 'Lift salt and skin away, take opaque flakes from the upper side and watch for fine bones. Expose the spine before serving the second side, use clean shared utensils and keep chilli sauce away from diners who declined it.' },
  ],
  cooking: {
    title: 'Source. Stuff. Seal. Grill. Check. Share.',
    intro: 'A whole fish is thicker and less forgiving than a fillet. A complete tested Pla Pao method must define fish preparation, whether scales stay on, salt binder, charcoal control and the safe thick-part endpoint. This traveller guide protects those decisions without inventing a universal time.',
    steps: ['Choose one complete tested Pla Pao recipe and a regulated whole fish of the specified species and size; keep it cold and follow current cleaning and evisceration guidance.', 'Prepare lemongrass and any lime leaves with clean tools, then stuff the cavity exactly as the method directs without blocking heat or leaving packaging or non-food ties inside.', 'Mix coarse salt with only the specified binder. If flour is used, label the gluten exposure; coat the protective scaled skin evenly without packing loose salt into edible flesh.', 'Set charcoal for controlled indirect or moderate heat, position the fish as specified and turn only when the shell is stable enough for the tested method.', 'Check the thickest flesh under the crust using the complete recipe and current official guidance: it should be opaque, separate easily with a fork and show no translucent raw centre. Crust colour alone is insufficient.', 'Rest only as directed, crack and lift the salt shell and skin, then serve with clean utensils. Protect ready-to-eat herbs and sauces from raw-fish tools and refrigerate leftovers promptly.'],
    boundary: 'Salt is not a substitute for safe sourcing, cold storage or thorough cooking. A whole fish can cook unevenly, contains bones and remains a fish allergen after grilling. Sauce and shared-grill risks persist after the shell is removed. This owner deliberately omits Recipe schema.',
  },
  affiliates: [
    { href: '/go/simple-thai-food-cookbook/', title: 'Simple Thai Food', text: 'A tested Thai cookbook can supply exact whole-fish, coating, charcoal, sauce and cooking controls that this traveller guide should not invent. Check the current contents, edition, format, seller and delivery.' },
  ],
  classHref: withSubId(KLOOK_GENERIC, 'en-pla-pao-isaan-market-food-experience'),
  classCopy: 'A suitable Isaan, Bangkok-market or Thai grilling experience can show how Pla Pao’s salt shell, herb stuffing and miang set work as one shared table. Klook results are broad: confirm Pla Pao is explicitly on the current menu and check fish species, bones, gluten, peanut, soy, halal handling, language and cancellation terms before booking.',
  classSignals: [
    { title: 'Fish and salt shell', text: 'See why species, scales, fish size and a bound coarse-salt layer matter instead of treating any grilled fillet as Pla Pao.' },
    { title: 'Whole-fish doneness', text: 'Learn how the thickest section is checked after controlled charcoal cooking; browned salt and smoke are not enough.' },
    { title: 'Miang architecture', text: 'Build balanced lettuce wraps with herbs, noodles and sauce while keeping bones and allergen utensils under control.' },
  ],
  faqs: [
    { question: 'What fish is Pla Pao?', answer: 'Pla Pao means grilled fish rather than one species. Tilapia, red tilapia and snakehead are documented Thai choices; other firm whole fish appear by region and vendor. Ask which fish is on the grill, especially when bones, farming, sustainability or flavour matter.' },
    { question: 'What does cooking fish in a salt crust do?', answer: 'The coarse shell protects the scaled skin from direct heat, helps retain moisture and seasons the fish while it grills. Some methods use flour or another binder. The crust is a cooking jacket, not a pile of salt to eat, and it does not prove the centre is done.' },
    { question: 'How are you supposed to eat a whole fish?', answer: 'Lift away salt and skin, then take flakes from the top side with a spoon and fork while watching for fine bones. Once that side is clear, expose or lift the spine and take flesh from the second side. Give children carefully checked boneless portions.' },
    { question: 'How do you eat Pla Pao?', answer: 'Share the opaque flaky flesh with sticky or jasmine rice, or wrap it in lettuce with herbs, cucumber, rice noodles and a little dipping sauce. Keep one clean serving spoon at the fish and add hot sauce gradually rather than pouring it over the entire fish.' },
    { question: 'What exactly is Miang Pla Pao?', answer: 'Miang Pla Pao is a serving set built around the same salt-grilled whole fish. Lettuce or herbs become wrappers and the tray may add rice noodles, cucumber, herbs and several sauces. It is a service format, not a different method of cooking the fish.' },
    { question: 'How do you wrap Miang Pla Pao?', answer: 'Start with a clean lettuce or herb leaf, add a checked fish flake with no bones, a small amount of noodle or vegetable and one spoon-tip of sauce. Fold it into a bite-sized parcel. Do not return a used spoon to shared sauce or mix allergen utensils.' },
    { question: 'What does Miang Pla Pao taste like?', answer: 'The fish is mild, smoky, moist and aromatic from lemongrass. Lettuce, cucumber and herbs add freshness, while green seafood sauce brings lime, garlic and chilli and jaew adds a darker roasted-savoury note. The chosen sauce changes the strongest flavour.' },
    { question: 'Is Pla Pao spicy?', answer: 'The salt-grilled fish itself is normally mild. Green seafood sauce or nam jim jaew can be very hot, and chilli may also enter seasoning or sides. Ask for sauce separately and taste a tiny amount; mild fish does not guarantee mild condiments.' },
    { question: 'Is Pla Pao gluten-free?', answer: 'Not automatically. Fish, salt and herbs do not require gluten, but documented salt coatings can use wheat flour, while soy sauce, seasoning, rice-noodle handling and a shared grill can add gluten or cross-contact. Verify the binder, sauces and equipment.' },
    { question: 'What is the difference between Pla Pao and Pla Ra?', answer: 'Pla Pao is whole grilled or roasted fish. Pla Ra is a fermented fish seasoning used in dishes such as some som tam styles. Their names share “pla” for fish, but the preparation, flavour, storage, allergens and search intent are different.' },
  ],
  related: [
    { title: 'Nong Khai travel guide', description: 'Place whole grilled fish inside a Mekong-side Isaan table with som tam, larb and sticky rice.', href: '/city/nong-khai/', image: '/images/redesign/nong-khai-hero.webp' },
    { title: 'Som Tam', description: 'Pair mild smoky fish with the sour, crunchy and chilli-led salad that often shares an Isaan meal.', href: '/food/som-tam/', image: '/images/redesign/som-tam-dish-hero.webp' },
    { title: 'Larb', description: 'Understand another shared Isaan dish before building a balanced table instead of ordering isolated plates.', href: '/food/larb/', image: '/images/redesign/larb-isaan-table-hero.webp' },
  ],
  sources: [
    { title: 'Pla Pao — Thai Grilled Fish', creator: 'Hungry in Thailand', url: 'https://hungryinthailand.com/pla-pao/', note: 'Complete current Thai specialist parse used for salt-grilled whole fish, lemongrass, one flour-bound coating and a peanut/tamarind/fish-sauce dip. Health, price and exact recipe claims were excluded.' },
    { title: 'Authentic Thai Grilled Fish Recipe — Pla Pao', creator: 'Eating Thai Food · Mark Wiens', url: 'https://www.eatingthaifood.com/thai-grilled-fish-recipe-pla-pao/', note: 'Complete current specialist parse used for red tilapia and snakehead choices, salt crust, herb stuffing, charcoal and garlic-chilli seafood sauce. Subjective preference and exact quantities were excluded.' },
    { title: 'Cooking your food', creator: 'UK Food Standards Agency', url: 'https://www.food.gov.uk/safety-hygiene/cooking-your-food?ContensisTextOnly=true', note: 'Current primary source used for thorough fish cooking, opaque flesh and fork separation alongside a complete tested whole-fish method.' },
    { title: 'Allergen guidance for food businesses', creator: 'UK Food Standards Agency', url: 'https://www.food.gov.uk/business-guidance/allergen-guidance-for-food-businesses', note: 'Current primary guidance used for fish, wheat, soy, peanut and cross-contact boundaries rather than automatic safety.' },
    { title: 'Safe gluten-free takeaway options', creator: 'Coeliac UK', url: 'https://www.coeliac.org.uk/living-with-coeliac-disease/food-and-drink/eating-out-and-travel/16528-2/', note: 'Expert source used for coating, commercial-sauce and shared-grill checks rather than assuming salt-crusted fish is gluten-free.' },
  ],
  methodDescription: 'Updated 28 July 2026 after two independent DataForSEO clusters with five raw keyword records, ten current UK-English SERPs with 70 organic results, 52 People Also Ask appearances and 24 unique questions, three complete DFS source parses including a current primary FSA cooking capture, current allergen guidance, plus exact owner ranking and backlink checks. DFS returned UK volume 40 for the exact head term and volume 10 for two relevant variants but no difficulty or competitor-domain table; the owner has zero ranking terms and no reportable backlink summary signal. Fermented Pla Ra, prawn-based Pla Goong Pao, generic grilled fish, generic salt-baked fish, recipe-only, health, fixed-price, calorie, automatic dietary, permanent restaurant, universal saltiness, heat, cooking, storage and fish-species claims were excluded.',
};

export function PlaPaoGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
