import { ChefHat, Leaf, MapPin, ShoppingBasket, Sparkles, UtensilsCrossed } from 'lucide-react';
import { KLOOK_GENERIC, withSubId } from '../../lib/affiliates';
import { DishEditorialTemplate, type DishEditorialData } from './DishEditorialTemplate';

const data: DishEditorialData = {
  title: 'Thai Boat Noodles: Ingredients, Blood & How to Order',
  description: 'Understand Thai Boat Noodles: canal history, dark broth, pork or beef, blood, noodle choices, heat, allergens, taste and how to order Guay Tiew Ruea.',
  canonical: 'https://go2-thailand.com/food/boat-noodles/',
  updatedAt: '28 July 2026',
  name: 'Boat Noodles',
  thaiName: 'ก๋วยเตี๋ยวเรือ · Guay Tiew Ruea',
  heroImage: '/images/redesign/boat-noodles-canal-bowl-hero.webp',
  heroAlt: 'Small Thai Boat Noodle bowl with dark broth, fully cooked sliced meat, rice noodles, meatball, greens and separate chilli condiments beside a Bangkok canal',
  heroEyebrow: 'Canal bowl · dark aromatic broth · choose your noodle',
  lead: 'Boat Noodles are Central Thailand’s compact, intensely seasoned noodle bowls. Dark broth, aromatic spice, rice noodles, pork or beef, greens and table condiments create the familiar shape. Some versions are enriched with blood and called Guay Tiew Nam Tok; others are not. The useful move is to choose the meat and noodle first, then ask what is actually in the broth.',
  quickFacts: [
    { label: 'Thai name', value: 'Guay Tiew Ruea · ก๋วยเตี๋ยวเรือ', icon: Sparkles },
    { label: 'Roots', value: 'Central Thailand · canal service', icon: MapPin },
    { label: 'Choose', value: 'Pork or beef · several noodles', icon: UtensilsCrossed },
    { label: 'Ask', value: 'Blood · offal · soy · fish sauce', icon: ShoppingBasket },
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
    intro: 'The defining impression is concentration: savoury stock, dark soy colour, warm spice and sweet-sour seasoning in a small bowl. Chilli flakes and chilli vinegar can move the final bite sharply, while herbs and sprouts keep the broth from feeling one-dimensional.',
    texture: 'Rice noodles are springy or soft according to type and blanching. Sliced meat, meatballs, greens and sprouts give several textures; blood, when used, can add body to the broth without appearing as a separate red ingredient.',
    finish: 'Cinnamon, star anise, coriander, galangal, garlic or fermented soybean may linger behind the meat and soy. The exact spice bag, sweetness, acidity and chilli are house decisions rather than one national formula.',
    scores: [{ label: 'Savoury', value: 5 }, { label: 'Aromatic', value: 4 }, { label: 'Sweet-sour', value: 3 }, { label: 'Hot', value: 3 }],
  },
  ingredients: [
    { name: 'Dark broth', role: 'A concentrated pork, beef or mixed stock can be seasoned with dark soy, regular soy, fish sauce, fermented soybean, sugar and vinegar. Colour alone does not reveal blood.' },
    { name: 'Pork or beef', role: 'Both families occur. Sliced meat, bone meat and meatballs may share a bowl; liver or other offal is optional and should be requested or declined explicitly.' },
    { name: 'Blood · optional', role: 'A documented traditional enricher in many nam-tok broths, but not guaranteed. Blood-free versions exist, and safe sourcing or handling cannot be judged from appearance.' },
    { name: 'Noodle choice', role: 'Sen lek rice noodles are familiar; sen mee, sen yai, bamee egg noodles, glass noodles or instant noodles may be available. Each changes texture and allergen checks.' },
    { name: 'Warm spices', role: 'Cinnamon, star anise, coriander seed, white pepper, galangal, garlic, pandan or another aromatic may enter a house broth. One long ingredient list is not universal.' },
    { name: 'Soy and fish sauce', role: 'Soy sauces and taojiew create soy and possible wheat boundaries; fish sauce creates a fish and vegetarian boundary even when no seafood is visible.' },
    { name: 'Greens and sprouts', role: 'Morning glory or water spinach and bean sprouts are recurring signals. Thai basil, coriander, spring onion or another green can finish the bowl.' },
    { name: 'Table condiments', role: 'Chilli flakes, chilli vinegar, sugar, fish sauce, fried garlic or pork rind let diners alter the bowl. Shared spoons and hidden ingredients still matter.' },
  ],
  allergenCopy: 'Soy, wheat and fish are the main hidden checks. Bamee usually involves wheat and egg; meatballs, seasoning sauce, fermented soybean paste, stock powders and shared noodle strainers can add further exposure. A rice-noodle choice does not make the broth gluten-free, and removing visible meat does not remove animal stock or blood.',
  vegetarianCopy: 'Classic Boat Noodles are meat-stock dishes and may include pork, beef, fish sauce, meatballs, liver or blood. A genuinely vegetarian or vegan bowl needs a separate stock, sauces, toppings and preparation path. Ask for a purpose-built version rather than requesting only “no meat”.',
  formats: [
    { title: 'Pork bowl', bestFor: 'A pork-stock or pork-topped route with sliced meat, meatballs and the noodle you choose.', tradeOff: 'Ask whether blood, liver, pork rind, fish sauce, soy or wheat-containing seasoning is used. Pork makes it unsuitable for halal diners unless a verified separate version exists.' },
    { title: 'Beef bowl', bestFor: 'A beef-led dark broth with sliced beef or meatballs and aromatic spice.', tradeOff: 'Beef does not guarantee pork-free stock, blood-free broth or halal sourcing. Confirm the whole pot and toppings, not only the visible meat.' },
    { title: 'Blood-free bowl', bestFor: 'Keeping the canal-bowl, noodle and aromatic-broth experience while declining blood where the vendor can do so.', tradeOff: 'Some broth may already be prepared as nam tok. “Mai tok” can be useful, but only the vendor can confirm whether a separate blood-free stock exists.' },
  ],
  orderSteps: [
    { title: 'Choose pork or beef', text: 'Start with the available meat family and ask whether the stock matches it. Then confirm sliced meat, meatballs, liver, other offal and pork rind rather than accepting a mixed bowl by accident.' },
    { title: 'Choose the noodle', text: 'Ask for sen lek, sen mee, sen yai, bamee or another visible option. When wheat or egg matters, verify the noodle packet and shared strainer instead of assuming every white noodle is rice.' },
    { title: 'Ask about nam tok, then season', text: 'Confirm whether the broth contains blood and whether a separate version exists. Check soy, wheat, fish sauce, stock and halal needs before adding chilli flakes, chilli vinegar or other table condiments.' },
  ],
  cooking: {
    title: 'Build the stock. Infuse. Blanch separately. Assemble hot.',
    intro: 'Boat Noodles are a component system rather than a thirty-minute shortcut. A tested recipe develops and strains the stock, controls a spice infusion, cooks meat safely, prepares the selected noodle by type and assembles each bowl immediately. Blood handling is a specialist food-safety task, not an improvisation for a travel guide.',
    steps: ['Choose one complete tested Boat Noodle recipe and decide pork or beef, noodle type, stock, seasonings, optional blood, toppings and every dietary substitution before shopping.', 'Prepare stock and raw meat with dedicated tools, keeping them away from herbs, sprouts, condiments, bowls and cooked components.', 'Toast or infuse only the recipe’s measured spices, then strain or remove them at the specified stage so bitterness and loose fragments do not take over the broth.', 'Cook all meat and meatballs thoroughly using the tested time-and-temperature instructions. Do not use colour, broth darkness or a brief dunk as the only safety check.', 'Prepare the selected noodle according to its own package or tested-recipe method and blanch greens separately, preventing raw-meat tools or liquids from reaching the strainer.', 'Keep the finished broth piping hot, assemble one bowl at a time and add cooked meat, greens, herbs and separate condiments. Use a regulated source and specialist tested method if the selected recipe includes blood.'],
    boundary: 'This owner does not provide raw-blood sourcing, handling or substitution instructions. Meat, stock volume, noodle hydration and optional blood materially change safe timing. Follow a complete tested recipe and current local food-safety guidance for exact quantities, temperatures, cooling, storage and reheating; Recipe schema is deliberately absent.',
  },
  affiliates: [
    { href: '/go/simple-thai-food-cookbook/', title: 'Simple Thai Food', text: 'A tested Thai cookbook can supply a complete stock, noodle and seasoning method that this traveller guide should not invent. Compare the current edition, format, seller and delivery details.' },
    { href: '/go/thai-granite-mortar-eight-inch/', title: 'Eight-inch granite mortar', text: 'Useful only when a tested method asks you to crack whole spices or make a condiment. Check usable interior, batch size, weight and worktop protection; a spice grinder may fit your method better.' },
  ],
  classHref: withSubId(KLOOK_GENERIC, 'en-boat-noodles-guay-tiew-ruea-cooking-class'),
  classCopy: 'A suitable Thai cooking class can show the hidden work in stock, spice infusion, noodle blanching and bowl assembly. Klook results are broad, so confirm Boat Noodles are on the current menu and ask directly about blood, raw-meat handling, allergens and language before booking.',
  classSignals: [
    { title: 'Broth architecture', text: 'See how one tested stock separates bone, aromatics, soy seasoning, spice and final adjustment.' },
    { title: 'Noodle timing', text: 'Compare sen lek with other noodles and learn why each type needs its own soak or blanch.' },
    { title: 'Safety boundary', text: 'Confirm meat doneness, raw-to-ready separation and whether blood is excluded or handled under a tested method.' },
  ],
  faqs: [
    { question: 'Why is it called Boat Noodles?', answer: 'The Thai name Guay Tiew Ruea translates as boat noodles. Current Thai official context says the dish was originally served from boats travelling Bangkok’s canals. Small bowls are commonly linked to that service style, although modern restaurants can choose different portions.' },
    { question: 'What exactly are Boat Noodles?', answer: 'Boat Noodles are a Central Thai noodle-soup family with a dark, intensely seasoned aromatic broth, pork or beef, a selected noodle, greens and condiments. Blood is a traditional option in many nam-tok broths but is not guaranteed in every current bowl.' },
    { question: 'What are Boat Noodles made of?', answer: 'A familiar bowl can combine pork or beef stock, soy sauces, fermented soybean, fish sauce, sugar, vinegar, warm spices, rice noodles, sliced meat, meatballs, morning glory, sprouts and herbs. Blood, liver, pork rind and each spice are variable rather than compulsory.' },
    { question: 'What does Thai Boat Noodle taste like?', answer: 'Expect a deep savoury broth with warm aromatic spice, soy richness and a sweet-sour edge. Chilli flakes and chilli vinegar can make it much hotter or sharper. Meat, blood, stock reduction and the house condiment balance change the result.' },
    { question: 'Is there blood in Boat Noodles?', answer: 'Sometimes. Blood is a documented traditional thickener and enricher in many Guay Tiew Nam Tok broths, while blood-free versions also exist. Ask whether it is already in the pot and whether a genuinely separate broth is available; appearance is not reliable proof.' },
    { question: 'Is Boat Noodle pork or beef?', answer: 'It can be pork or beef, and some menus offer both families. The visible meat does not always reveal the stock, blood or meatball ingredients, so name your preference and ask whether the complete pot matches it.' },
    { question: 'Which noodle is best for Boat Noodles?', answer: 'There is no universal best. Sen lek, a small rice noodle, is a familiar choice; sen mee is finer, sen yai wider, bamee is an egg-and-wheat noodle and glass noodles are lighter. Pick the texture you enjoy and verify wheat, egg and shared-strainer contact when needed.' },
    { question: 'Are Boat Noodles vegetarian?', answer: 'Standard Boat Noodles are not vegetarian because the broth is meat-led and may include fish sauce, meatballs, liver or blood. A vegetarian or vegan adaptation must replace the whole stock, seasoning and toppings and needs separate preparation.' },
    { question: 'Are Boat Noodles eaten as a snack or a meal?', answer: 'The historically familiar small bowl can function as a snack or be ordered in multiples as a meal. Modern portions vary, so no fixed bowl count applies. Start with the serving offered and order more only if you want it.' },
    { question: 'What is the difference between Boat Noodles and pho?', answer: 'Both sit within Southeast Asia’s diverse rice-noodle-soup traditions, but Boat Noodles commonly use a darker Thai soy-, spice- and condiment-led broth with pork or beef and possible blood. Vietnamese pho has its own regional broths, noodles, herbs and service traditions. Neither can be reduced to one recipe or ranked as better.' },
  ],
  related: [
    { title: 'Sukhothai Noodles', description: 'Continue to a separate regional noodle owner with its own sweet-sour, topping and service pattern.', href: '/food/sukhothai-noodles/', image: '/images/food/sukhothai-noodles.webp' },
    { title: 'Tom Yum Noodles', description: 'Compare Boat Noodles with a Thai noodle family organised around tom-yum sour-hot seasoning.', href: '/food/tom-yum-noodles/', image: '/images/food/tom-yum-noodles.webp' },
    { title: 'Thai cuisine guide', description: 'Place Guay Tiew Ruea inside a wider food route with regional dishes, ordering and dietary decisions.', href: '/travel-guides/thai-cuisine-food-guide/', image: '/images/redesign/thailand-food-hub-hero.webp' },
  ],
  sources: [
    { title: 'Authentic Thai Boat Noodles Recipe', creator: 'Hot Thai Kitchen', url: 'https://hot-thai-kitchen.com/boat-noodles/', note: 'Complete DFS parse used for naming, small-bowl context, broth and noodle signals, pork/beef choices, optional blood boundary, greens, condiments and one tested sequence. Storage and recipe-specific claims were excluded.' },
    { title: 'The sinking history of Thai Boat Noodles', creator: 'SBS Food with chef David Thompson', url: 'https://www.sbs.com.au/food/article/the-sinking-history-of-thai-boat-noodles/8l34vxq2r', note: 'Complete DFS parse used for canal context, small portions, aromatic broth, blood history and a documented blood-free chef variation. Fixed price and restaurant claims were excluded.' },
    { title: 'Thai Boat Noodles at Doy Kuay Teow Reua', creator: 'Eating Thai Food', url: 'https://www.eatingthaifood.com/restaurants/thai-boat-noodles-doy-kuay-teow-reua/', note: 'Complete DFS parse used as one Bangkok ordering and small-bowl expression. Review opinions, prices and permanent availability were excluded.' },
    { title: 'Thailand Food Guide 2024', creator: 'Ministry of Foreign Affairs, Thailand', url: 'https://image.mfa.go.th/mfa/0/KqcTSahPWh/%E0%B8%AB%E0%B8%99%E0%B8%B1%E0%B8%87%E0%B8%AA%E0%B8%B7%E0%B8%AD%E0%B8%AD%E0%B8%B4%E0%B9%80%E0%B8%A5%E0%B9%87%E0%B8%81%E0%B9%82%E0%B8%97%E0%B8%A3%E0%B8%99%E0%B8%B4%E0%B8%81%E0%B8%AA%E0%B9%8C/Food_Guide_2024/FoodGuide_Eng_20240820.pdf', note: 'Current official-context source confirming original service from boats traversing Bangkok’s canals and the familiar small bowl; restaurant advertising elsewhere in the guide was not reused.' },
  ],
  methodDescription: 'Updated 28 July 2026 after two independent DataForSEO clusters with 211 raw keyword records and 50 competitor-domain records, ten current UK-English SERPs with 72 organic results, 55 People Also Ask appearances and 41 unique genuine questions, three complete DFS source parses, one current Thailand MFA official-context capture, one zero-markdown competitor capture, plus exact owner ranking and backlink checks. The route has UK head-term volume 1,300 / KD 4, zero ranking terms and no reportable backlink summary signal. Branded instant-noodle, London restaurant, near-me and unrelated nam-tok intent were excluded. Fixed prices, bowl counts, calories, health verdicts, universal blood content, casual blood-safety claims, automatic dietary status, permanent restaurant rankings and unsupported first-hand claims were also excluded.',
};

export function BoatNoodlesGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
