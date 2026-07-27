import { ChefHat, Flame, Leaf, MapPin, ShoppingBasket, Sparkles, UtensilsCrossed } from 'lucide-react';
import { KLOOK_GENERIC, withSubId } from '../../lib/affiliates';
import { DishEditorialTemplate, type DishEditorialData } from './DishEditorialTemplate';

const data: DishEditorialData = {
  title: 'What Is Pad Thai? Ingredients, Taste & How to Order It',
  description: 'Understand Pad Thai before you order it in Thailand: taste, ingredients, allergens, street versus restaurant versions, home-cooking sequence and genuine UK search questions.',
  canonical: 'https://go2-thailand.com/food/pad-thai/',
  updatedAt: '28 July 2026',
  name: 'Pad Thai',
  thaiName: 'ผัดไทย',
  heroImage: '/images/redesign/pad-thai-dish-hero.webp',
  heroAlt: 'Fresh Pad Thai with prawns, tofu, bean sprouts, lime, peanuts and chilli served separately on a warm Bangkok food counter',
  heroEyebrow: 'Taste Thailand with context',
  lead: 'Pad Thai is a stir-fried rice-noodle dish built around a sweet, sour and savoury balance. Tamarind, egg, tofu, sprouts and chives are common; protein, dried shrimp, fish sauce, peanuts and chilli vary, so the name alone never answers every dietary question.',
  quickFacts: [
    { label: 'Dish', value: 'Stir-fried rice noodles', icon: UtensilsCrossed },
    { label: 'Typical profile', value: 'Sweet · sour · savoury', icon: Sparkles },
    { label: 'Heat', value: 'Often mild; chilli may be separate', icon: Flame },
    { label: 'Context', value: 'Street stalls and restaurants', icon: MapPin },
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
    intro: 'A balanced plate is tangy from tamarind, savoury from its seasoning and gently sweet rather than syrupy. Lime, chilli and peanuts at the table let the final bite move in different directions.',
    texture: 'Tender but distinct rice noodles, crisp sprouts or chives, soft egg and tofu, plus optional crunch from peanuts.',
    finish: 'Tamarind brightness and savoury depth first; lime and dried chilli can sharpen the finish after tasting.',
    scores: [{ label: 'Tangy', value: 4 }, { label: 'Savoury', value: 4 }, { label: 'Sweet', value: 3 }, { label: 'Hot', value: 1 }],
  },
  ingredients: [
    { name: 'Rice noodles', role: 'Thin or medium flat rice noodles carry the sauce; exact width and hydration differ.' },
    { name: 'Tamarind', role: 'A common sour backbone, balanced with a salty seasoning and sweetness.' },
    { name: 'Egg and tofu', role: 'Common structure and protein, but neither makes the dish automatically vegetarian.' },
    { name: 'Sprouts and chives', role: 'Fresh contrast that may be cooked briefly or served at the side.' },
    { name: 'Fish sauce', role: 'A frequent savoury component that may sit inside a premixed sauce.' },
    { name: 'Shrimp', role: 'Fresh or dried shrimp can appear even when another protein is chosen.' },
    { name: 'Peanuts', role: 'Often served crushed at the side or on top; cross-contact can remain after removal.' },
    { name: 'Lime and chilli', role: 'Usually finishing controls rather than proof that the base is mild.' },
  ],
  allergenCopy: 'Peanut, egg, fish, shellfish and soy may be relevant. Ask about the premixed sauce, dried shrimp, toppings and shared wok or utensils; removing visible peanuts does not remove cross-contact.',
  vegetarianCopy: 'Tofu is not enough evidence. Fish sauce, dried shrimp, egg and a shared wok may still matter. Explain the exact boundary before cooking starts.',
  formats: [
    { title: 'Street stall', bestFor: 'Watching a made-to-order wok sequence and tasting a compact, direct version.', tradeOff: 'Ask before the sauce enters the wok; space and allergen controls vary by vendor.' },
    { title: 'Restaurant', bestFor: 'More time to discuss ingredients, share dishes and choose a comfortable setting.', tradeOff: 'A higher price or polished plate does not prove a better balance or a fixed recipe.' },
    { title: 'Home kitchen', bestFor: 'Learning how noodle hydration, sauce and heat interact.', tradeOff: 'A domestic hob changes batch size and evaporation; avoid copying fixed restaurant timing blindly.' },
  ],
  orderSteps: [
    { title: 'Choose the version', text: 'Confirm protein and whether egg, tofu, dried shrimp or fresh shrimp are part of that kitchen’s default.' },
    { title: 'State the boundary', text: 'Discuss chilli, fish sauce, peanuts and medical allergens before the premixed sauce or toppings are added.' },
    { title: 'Taste, then adjust', text: 'Try the first bite before adding lime, chilli, peanuts or sugar. Those table condiments change the cook’s starting balance.' },
  ],
  cooking: {
    title: 'Hydrate. Sauce. Wok. Finish.',
    intro: 'The useful lesson is sequence, not a fantasy universal recipe. Prepare the noodles and garnishes first, balance a tamarind-led sauce separately, then cook a small batch quickly enough to coat rather than boil the noodles.',
    steps: ['Soak the rice noodles until flexible but not fully soft.', 'Prepare tamarind-led sauce and taste its sweet-sour-savoury balance.', 'Cook tofu, protein and egg before the final noodle toss as the recipe requires.', 'Add noodles and sauce in a manageable batch; use liquid only as needed.', 'Fold in sprouts and chives late enough to keep contrast.', 'Serve lime, peanuts and chilli separately so each eater can decide.'],
    boundary: 'Ingredient strengths, noodle brands, pan size and hob output vary. Use a tested recipe for exact quantities and safe cooking temperatures; this travel guide explains the decision structure rather than inventing one universal formula.',
  },
  affiliate: {
    href: '/go/simple-thai-food-cookbook/',
    title: 'Simple Thai Food',
    text: 'A broader Thai cooking reference is more useful than a random single-use gadget. Compare the current edition, format, seller and delivery details in your local Amazon store.',
  },
  classHref: withSubId(KLOOK_GENERIC, 'en-pad-thai-dish-cooking-class'),
  classCopy: 'A suitable class can show noodle hydration, tamarind balance and wok sequencing in context. The linked Klook results are broad: verify that Pad Thai is actually on the current menu rather than assuming it from the class title.',
  faqs: [
    { question: 'What does Pad Thai consist of?', answer: 'Common versions combine rice noodles, tamarind-led sauce, egg, tofu, sprouts and chives. Fish sauce, dried or fresh shrimp, another protein, peanuts, lime and chilli may also appear. The exact house version matters.' },
    { question: 'What does Pad Thai taste like?', answer: 'It is usually sweet, sour and savoury, often with tamarind brightness and a roasted or wok-cooked depth. Lime, chilli and peanuts at the table can change the final profile.' },
    { question: 'Is Pad Thai usually spicy?', answer: 'It is often milder than many curries or salads, and chilli may be served separately, but a premixed sauce can already contain heat. Ask the vendor instead of treating the dish name as a guarantee.' },
    { question: 'What kind of noodles are in Pad Thai?', answer: 'Flat rice noodles are standard, often in a thin or medium width. Brand, width and soaking method affect texture, so home recipes should specify the noodle rather than rely on timing alone.' },
    { question: 'What are the ingredients in Pad Thai?', answer: 'Rice noodles and a tamarind-led sauce are central clues; egg, tofu, sprouts, chives, fish sauce, shrimp and peanuts are common. Variations exist, and hidden sauce ingredients matter for diets and allergies.' },
    { question: 'Is Pad Thai a street food?', answer: 'Yes, it is widely associated with made-to-order street stalls, but it also appears in restaurants, food courts, markets and home kitchens. Setting alone does not determine quality.' },
    { question: 'Is Pad Thai actually popular in Thailand?', answer: 'It is a familiar and widely available dish, especially at specialist stalls and tourist-facing menus, but Thai everyday food is far broader. Do not treat one internationally famous dish as the whole cuisine.' },
    { question: 'Is Pad Thai actually traditional?', answer: 'Its modern national prominence developed in the twentieth century, while its ingredients and stir-frying reflect longer regional exchanges. It is Thai, but the simple “ancient unchanged recipe” story is misleading.' },
    { question: 'How do you say Pad Thai in Thailand?', answer: 'The Thai name is ผัดไทย. Showing the written name or a menu photo is often clearer than depending on an English pronunciation.' },
    { question: 'Is Pad Thai healthy or unhealthy?', answer: 'That cannot be answered from the name alone. Portion size, oil, sugar, protein, vegetables, sodium and toppings vary by kitchen. Choose the portion and ingredients that fit your needs rather than relying on a universal health label.' },
  ],
  related: [
    { title: 'Thai food guide', description: 'Compare regional cuisines, dish types and ordering decisions across Thailand.', href: '/food/', image: '/images/redesign/thailand-food-hub-hero.webp' },
    { title: 'Bangkok street food', description: 'Use neighbourhood, timing and food-safety cues to plan a better eating route.', href: '/blog/bangkok-street-food-beginners/', image: '/images/food/street-food.webp' },
    { title: 'Vegetarian Thailand', description: 'Separate visible vegetables from sauce, stock and shared-preparation questions.', href: '/travel-guides/vegetarian-vegan-thailand/', image: '/images/redesign/vegetarian-thailand-hero.webp' },
  ],
  sources: [
    { title: 'Pad Thai cooking and ingredient technique', creator: 'Hot Thai Kitchen', url: 'https://hot-thai-kitchen.com/best-pad-thai/', note: 'Full competitor parse used for noodle, sauce and wok-sequence coverage.' },
    { title: 'Pad Thai recipe and common ingredients', creator: 'RecipeTin Eats', url: 'https://www.recipetineats.com/chicken-pad-thai/', note: 'Full competitor parse used to map UK-English recipe expectations and omissions.' },
    { title: 'The surprising history of Pad Thai', creator: 'Smithsonian Magazine', url: 'https://www.smithsonianmag.com/travel/the-surprising-history-of-pad-thai-180984625/', note: 'Historical reporting used to avoid the simplistic ancient-national-dish story.' },
    { title: 'Pad Thai cooking story', creator: 'Tourism Authority of Thailand Newsroom', url: 'https://www.tatnews.org/2016/02/tat-launches-latest-viral-sensation-illustrating-thailand-through-pad-thai-cooking/', note: 'Primary tourism source for Thailand-facing ingredient and cultural context.' },
  ],
  methodDescription: 'Updated 28 July 2026 after three DataForSEO clusters with 435 raw records, ten current UK-English SERPs with 76 organic results, 58 People Also Ask records and 43 unique genuine questions, three usable full competitor parses, one primary TAT source, plus exact ranking and backlink checks for both candidate owners. Neither URL returned rankings or a reportable backlink summary signal, so the thin dish route is retained as the broad canonical owner and the overlapping legacy blog is consolidated. Restaurant-near-me, celebrity, Wagamama, supermarket and unsupported universal price, nutrition, time, authenticity and first-hand claims were excluded.',
};

export function PadThaiGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
