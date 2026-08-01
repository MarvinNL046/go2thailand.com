import { ChefHat, Flame, Leaf, MapPin, ShoppingBasket, Sparkles, UtensilsCrossed } from 'lucide-react';
import { KLOOK_GENERIC, withSubId } from '../../lib/affiliates';
import { DishEditorialTemplate, type DishEditorialData } from './DishEditorialTemplate';

const data: DishEditorialData = {
  title: 'Som Tam in Thailand: Taste, Variations & How to Order',
  description: 'Understand Som Tam before ordering it in Thailand: taste, ingredients, Thai and pla-ra variations, heat, allergens, mortar technique and genuine UK search questions.',
  canonical: 'https://go2-thailand.com/food/som-tam/',
  updatedAt: '28 July 2026',
  name: 'Som Tam',
  thaiName: 'ส้มตำ',
  heroImage: '/images/redesign/som-tam-dish-hero.webp',
  heroAlt: 'Fresh Som Tam with green papaya, tomato, long beans, lime and peanuts beside a wooden mortar at an Isan market counter',
  heroEyebrow: 'Pounded fresh, chosen by version',
  lead: 'Som Tam is a family of pounded salads rather than one fixed papaya recipe. Green papaya is familiar, but chilli, lime, fish sauce, dried shrimp, peanuts, fermented fish, crab, noodles and other produce can change the flavour and dietary boundary completely.',
  quickFacts: [
    { label: 'Dish family', value: 'Pounded sour-spicy salads', icon: UtensilsCrossed },
    { label: 'Typical profile', value: 'Sour · hot · savoury · sweet', icon: Sparkles },
    { label: 'Heat', value: 'Chosen by chilli count and base', icon: Flame },
    { label: 'Context', value: 'Isan tables, markets and restaurants', icon: MapPin },
  ],
  navItems: [
    { href: '#taste', label: 'Taste', icon: Sparkles },
    { href: '#ingredients', label: 'Ingredients', icon: ShoppingBasket },
    { href: '#choose', label: 'Versions', icon: UtensilsCrossed },
    { href: '#order', label: 'Order', icon: MapPin },
    { href: '#cook', label: 'Pound', icon: ChefHat },
    { href: '#questions', label: 'Questions', icon: Leaf },
  ],
  taste: {
    intro: 'A freshly made version can move quickly from lime-bright and crunchy to intensely hot, salty, sweet or fermented. The named variation and the person holding the pestle matter more than a generic menu description.',
    texture: 'Crisp shreds, bruised long beans and juicy tomato are common. Pounding force can leave the papaya snappy or soften it enough to absorb more dressing.',
    finish: 'Som Tam Thai often finishes nutty and sweet-sour; pla-ra and crab versions can leave a deeper fermented or briny savoury note.',
    scores: [{ label: 'Sour', value: 5 }, { label: 'Hot', value: 4 }, { label: 'Savoury', value: 4 }, { label: 'Sweet', value: 3 }],
  },
  ingredients: [
    { name: 'Green papaya', role: 'The familiar crisp base, but not a requirement for every member of the Som Tam family.' },
    { name: 'Chilli and garlic', role: 'Pounded early; chilli count and prepared seasoning can make heat difficult to reverse.' },
    { name: 'Lime', role: 'A common source of bright acidity, sometimes joined or replaced by another sour fruit.' },
    { name: 'Fish sauce', role: 'A frequent salty-savoury seasoning that prevents a vegetable-looking plate from being vegetarian.' },
    { name: 'Palm sugar', role: 'Commonly rounds the dressing, especially in Som Tam Thai; the balance differs by vendor.' },
    { name: 'Tomato and long beans', role: 'Juice and crunch that are bruised rather than blended into a smooth dressing.' },
    { name: 'Peanuts and dried shrimp', role: 'Typical Som Tam Thai signals and important nut and shellfish checks.' },
    { name: 'Pla ra or crab', role: 'Fermented fish or salted/pickled crab define several bolder versions and change the allergen boundary.' },
  ],
  allergenCopy: 'Peanut, fish and shellfish are common concerns. Ask about fish sauce, dried shrimp, pla ra, crab and the shared mortar; removing a visible topping does not remove dressing ingredients or cross-contact.',
  vegetarianCopy: 'Green papaya, tomato and beans do not make the dressing vegetarian. Ask for no fish sauce, dried shrimp, fermented fish or crab, and confirm what replaces their savoury role before pounding starts.',
  formats: [
    { title: 'Som Tam Thai', bestFor: 'A bright sweet-sour entry point with green papaya, peanuts and often dried shrimp.', tradeOff: 'It may still contain fish sauce, shellfish and substantial chilli; “Thai style” is not a dietary guarantee.' },
    { title: 'Tam pla ra · Lao style', bestFor: 'A deeper fermented, salty and often more forceful Isan-facing profile.', tradeOff: 'Pla ra is fermented fish seasoning; ask about crab, chilli and preparation if allergens or heat matter.' },
    { title: 'Another fruit or noodle', bestFor: 'Seeing why Som Tam is a technique family: cucumber, corn, fruit or rice noodles can replace or join papaya.', tradeOff: 'A changed base does not automatically change the dressing, fish sauce, pla ra, peanuts or shared mortar.' },
  ],
  orderSteps: [
    { title: 'Name the version', text: 'Choose Som Tam Thai, a pla-ra or crab version, or another base. Do not rely on the English phrase “papaya salad” to identify the dressing.' },
    { title: 'Set chilli and boundaries', text: 'State the chilli level and medical allergens before pounding. Ask about fish sauce, dried shrimp, fermented fish, crab and peanuts.' },
    { title: 'Build the Isan table', text: 'Consider sticky rice and grilled food alongside the salad. Share carefully: a mild companion does not reduce chilli already in the mortar.' },
  ],
  cooking: {
    title: 'Pound. Bruise. Dress. Fold.',
    intro: 'The mortar is not a blender. Aromatics are crushed, firm vegetables are bruised and the shredded base is folded through dressing so it absorbs flavour without losing every bit of crunch.',
    steps: ['Prepare the shredded base and all dietary-safe ingredients before touching the mortar.', 'Pound garlic and the chosen chilli amount according to a tested recipe.', 'Bruise beans and tomato enough to release flavour without making a purée.', 'Dissolve and balance the specified sour, salty, savoury and sweet dressing.', 'Fold the papaya or chosen produce through with controlled pestle pressure.', 'Taste, adjust within the agreed boundary and serve promptly for texture.'],
    boundary: 'Papaya moisture, chilli strength, fish sauce, pla ra and lime vary. Use a tested recipe for quantities and food-safety controls; fermented fish, crab and shared equipment deserve specific handling rather than improvised reassurance.',
  },
  affiliates: [
    { href: '/go/simple-thai-food-cookbook/', title: 'Simple Thai Food', text: 'A broader Thai cooking reference gives the dish family and its techniques context. Compare the current edition, seller, format and delivery details.' },
    { href: '/go/thai-granite-mortar-eight-inch/', title: 'Eight-inch granite mortar', text: 'A stable mortar is useful for pounding and folding, but material, weight, interior size and worktop protection matter. Check the current specification before buying.' },
  ],
  classHref: withSubId(KLOOK_GENERIC, 'en-som-tam-dish-cooking-class'),
  classCopy: 'A suitable class can show pestle pressure, dressing balance and ingredient substitutions in context. Klook results are broad: confirm that Som Tam is on the current menu and whether each guest works with their own mortar.',
  classSignals: [
    { title: 'Pestle pressure', text: 'Learn the difference between crushing aromatics, bruising vegetables and folding papaya.' },
    { title: 'Version signals', text: 'Identify Som Tam Thai, pla-ra, crab and alternative-base variations before tasting.' },
    { title: 'Dietary boundary', text: 'See when fish sauce, dried shrimp, fermented fish, crab and peanuts enter the mortar.' },
  ],
  faqs: [
    { question: 'What is Som Tam made of?', answer: 'A familiar Som Tam Thai combines shredded green papaya, chilli, garlic, lime, tomato, long beans, fish sauce, palm sugar, peanuts and often dried shrimp. Other versions use fermented fish, crab, noodles or different fruit and vegetables.' },
    { question: 'What does Som Tam taste like?', answer: 'It is commonly sour, spicy, savoury and sweet with a crisp, juicy texture. Som Tam Thai often tastes nuttier and sweeter, while pla-ra or crab versions can be saltier, more fermented or briny.' },
    { question: 'Is Som Tam very spicy?', answer: 'It often is, because chilli is pounded into the dressing. A vendor may adjust a fresh batch, but prepared seasoning and shared mortar residue can remain. Agree the chilli amount before preparation.' },
    { question: 'What does Som Tam mean?', answer: 'The name refers to pounding or crushing a sour ingredient. That helps explain why Som Tam is a broad preparation family rather than a literal synonym for one green-papaya recipe.' },
    { question: 'What is the difference between Thai and Lao-style Som Tam?', answer: 'Som Tam Thai commonly uses a sweeter lime-led balance with peanuts and dried shrimp. Lao or pla-ra styles commonly use fermented fish seasoning and a saltier, deeper profile. Recipes vary across Thailand and Laos, so the labels are useful guides rather than borders for authenticity.' },
    { question: 'What are common Som Tam variations?', answer: 'Common names include Som Tam Thai, tam pla ra or tam Lao, tam pu with crab, tam pu pla ra, tam sua with rice noodles, corn salad and cucumber or fruit versions. The dressing and allergens change with the name.' },
    { question: 'What do you eat with Som Tam?', answer: 'It is often part of a shared Isan meal with sticky rice, grilled chicken, larb or other grilled dishes. There is no required set; use rice and companion dishes to build contrast rather than as a promise that the salad will feel mild.' },
    { question: 'Is Som Tam vegetarian or vegan?', answer: 'Not by default. Fish sauce, dried shrimp, pla ra and crab may appear even when the visible base is fruit or vegetables. Request a version made without those ingredients and discuss the shared mortar.' },
    { question: 'Is Som Tam healthy?', answer: 'The name alone cannot determine that. Dressing, sodium, sugar, chilli, portion, peanuts and animal ingredients vary. Judge the actual version against your needs instead of applying a universal health or weight-loss label.' },
    { question: 'Can Som Tam be made in advance?', answer: 'The shredded base can be prepared according to a tested recipe, but once pounded with dressing it softens and releases liquid. Fresh assembly usually protects texture; food-safety and storage depend on the exact ingredients.' },
  ],
  related: [
    { title: 'Explore Isan', description: 'Place Som Tam beside the region’s cities, Mekong landscapes and shared-table food culture.', href: '/region/isaan/', image: '/images/regions/isaan-thailand.webp' },
    { title: 'Thai food guide', description: 'Compare salads with curries, soups, noodles and regional ordering choices.', href: '/food/', image: '/images/redesign/thailand-food-hub-hero.webp' },
    { title: 'Vegetarian Thailand', description: 'Separate visible produce from fish sauce, stock, paste and shared-equipment questions.', href: '/travel-guides/vegetarian-vegan-thailand/', image: '/images/redesign/vegetarian-thailand-hero.webp' },
  ],
  sources: [
    { title: 'Authentic Thai Papaya Salad', creator: 'Hot Thai Kitchen', url: 'https://hot-thai-kitchen.com/papaya-salad-v3/', note: 'Full DFS parse used for Som Tam Thai ingredients, terminology and mortar technique.' },
    { title: 'Decoding Som Tam', creator: 'Michelin Guide', url: 'https://guide.michelin.com/sg/en/article/features/decoding-the-delicious-som-tam-sg', note: 'Current search capture used for the dish-family and regional-variation framework; DFS returned no full markdown.' },
    { title: 'Som Tum like a Michelin restaurant', creator: 'Michelin Guide', url: 'https://guide.michelin.com/tw/en/article/dining-in/how-to-make-som-tum-thai-papaya-salad-like-a-michelin-restaurant', note: 'Current search capture used for Som Tam Thai signals; DFS returned no full markdown.' },
    { title: 'Five signature dishes of Buriram', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Articles/https-www-tourismthailand-org-articles-enjoy5signaturedishesofburiram', note: 'Full primary-source parse used for Isan context and the existence of multiple Som Tam forms.' },
  ],
  methodDescription: 'Updated 28 July 2026 after a 63-record DataForSEO cluster, ten current UK-English SERPs with 71 organic results, 56 PAA records and 44 unique genuine questions, exact ranking and backlink checks for both broad candidate owners, two usable full source parses and two current Michelin search captures. Neither candidate returned ranking or reportable backlink signal, so the broad food route becomes canonical and the overlapping variations blog consolidates into it. Celebrity salad, supermarket, delivery, fixed price, calorie, daily-use, weight-loss, one-authentic-version, Thai-versus-Lao value judgement and unsupported first-hand claims were excluded.',
};

export function SomTamGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
