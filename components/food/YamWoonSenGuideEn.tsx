import { ChefHat, Flame, Leaf, MapPin, ShoppingBasket, Sparkles, UtensilsCrossed } from 'lucide-react';
import { KLOOK_GENERIC, withSubId } from '../../lib/affiliates';
import { DishEditorialTemplate, type DishEditorialData } from './DishEditorialTemplate';

const data: DishEditorialData = {
  title: 'Yam Woon Sen: Thai Glass Noodle Salad',
  description: 'Understand Yam Woon Sen: mung-bean glass noodles, pork, prawns, lime dressing, chilli, allergens, dietary checks, ordering and how it differs from Pad Woon Sen.',
  canonical: 'https://go2-thailand.com/food/yam-woon-sen/',
  updatedAt: '28 July 2026',
  name: 'Yam Woon Sen',
  thaiName: 'ยำวุ้นเส้น · Thai glass noodle salad',
  heroImage: '/images/redesign/yam-woon-sen-thai-glass-noodle-salad-hero.webp',
  heroAlt: 'Thai Yam Woon Sen salad with translucent glass noodles, fully cooked prawns and minced pork, tomato, onion, celery, coriander, lime and chilli',
  heroEyebrow: 'Bangkok table · bright lime · translucent noodles',
  lead: 'Yam Woon Sen is Thailand’s bright glass-noodle salad: springy translucent noodles catch a lime, fish-sauce, sugar and chilli dressing, while fresh vegetables keep each forkful crisp. Minced pork and prawns are a familiar pairing, not a compulsory formula. The actual noodles, proteins, garnish and chilli level matter more than the English label “salad”.',
  quickFacts: [
    { label: 'Name', value: 'Yam / yum = mixed salad · woon sen = glass noodles', icon: Sparkles },
    { label: 'Noodles', value: 'Usually thin mung-bean threads · inspect the packet', icon: ShoppingBasket },
    { label: 'Service', value: 'Freshly mixed · warm, room temperature or cooled', icon: UtensilsCrossed },
    { label: 'Heat', value: 'Chilli varies · ask before the dressing is mixed', icon: Flame },
  ],
  navItems: [
    { href: '#taste', label: 'Taste', icon: Sparkles },
    { href: '#ingredients', label: 'Signals', icon: ShoppingBasket },
    { href: '#choose', label: 'Choose', icon: UtensilsCrossed },
    { href: '#order', label: 'Order', icon: MapPin },
    { href: '#cook', label: 'Prepare', icon: ChefHat },
    { href: '#questions', label: 'Questions', icon: Leaf },
  ],
  taste: {
    intro: 'Lime provides the first bright edge, fish sauce and cooked proteins add savoury depth, and a little sugar rounds the dressing rather than turning it into syrup. Fresh chilli can move the bowl from lively to fiercely hot, so “medium” is never a fixed standard.',
    texture: 'Correctly prepared glass noodles are clear, flexible and lightly springy rather than mushy. Prawns bring a firm bite, minced pork adds small savoury crumbles, and tomato, onion, celery and herbs keep the salad juicy and crisp.',
    finish: 'The noodles continue absorbing dressing after mixing. A good bowl therefore feels fresh and glossy, with lime and herbs lingering after the savoury core—not dry, clumped or swimming in liquid.',
    scores: [{ label: 'Bright', value: 5 }, { label: 'Tangy', value: 5 }, { label: 'Savoury', value: 4 }, { label: 'Chilli heat', value: 4 }],
  },
  ingredients: [
    { name: 'Woon sen noodles', role: 'Thin glass noodles commonly made from mung-bean starch. “Bean thread” and “bean vermicelli” are useful labels; blended starches exist, so the ingredient packet controls texture and gluten checks.' },
    { name: 'Fresh lime', role: 'Supplies the clean sour backbone. Bottled acid or other citrus can appear, but lime is the defining fresh signal in the researched classic expression.' },
    { name: 'Fish sauce · sugar', role: 'Build the salty, umami and rounded side of a Thai yam dressing. Brand, sweetness and substitutes vary; fish sauce prevents automatic vegetarian or vegan status.' },
    { name: 'Fresh chilli · garlic', role: 'Bring heat and aromatic bite. Chilli quantity can often be changed before mixing, but a shared mortar, dressing or spoon can carry residue.' },
    { name: 'Minced pork', role: 'A familiar savoury protein cooked into small crumbles. Chicken or turkey can replace it; pork means a standard bowl is not halal and requires separate handling checks.' },
    { name: 'Prawns · dried shrimp', role: 'Fresh cooked prawns are common and dried shrimp may add extra umami. Both are crustaceans; omission must cover dressing, garnish, stock and shared utensils.' },
    { name: 'Vegetables · herbs', role: 'Tomato, onion or shallot, Chinese celery and coriander are familiar. Mint, spring onion, mushrooms or other vegetables can appear without changing every bowl into a new dish.' },
    { name: 'Peanuts · optional garnish', role: 'Roasted peanuts add crunch in some versions but are not universal. Ask before plating and check shared containers, oils and utensils rather than relying on visible garnish alone.' },
  ],
  allergenCopy: 'Crustaceans and fish are common through prawns, dried shrimp and fish sauce. Peanuts may be added at the end; soy, wheat/gluten, sesame, molluscs and packaged stock or seasoning can appear by variation. Transparent noodles are not proof of a gluten-free dish: inspect the noodle ingredients, dressing and shared preparation. State serious allergies before the salad is mixed.',
  vegetarianCopy: 'The familiar pork, prawn and fish-sauce bowl is neither vegetarian nor vegan. A plant-based version needs all three replaced plus separate dressing and utensils. Removing pork does not automatically make the salad halal: verify prawns, fish sauce, stock, seasoning, alcohol-containing additions and cross-contact according to your own standard; use a certified or sufficiently transparent vendor when certainty matters.',
  formats: [
    { title: 'Classic pork and prawn bowl', bestFor: 'Trying the familiar contrast of savoury minced pork, firm prawns, translucent noodles and bright vegetables.', tradeOff: 'Contains pork, crustacean and usually fish sauce; dried shrimp and peanuts may be less obvious. Ask about heat before the dressing is mixed.' },
    { title: 'One-protein or seafood version', bestFor: 'Choosing a vendor-confirmed bowl with pork, chicken, prawns, squid or mixed seafood rather than assuming every protein is included.', tradeOff: 'Changing visible protein does not reset the dressing, stock, garnish or shared-prep allergen status. Mollusc and crustacean risks differ.' },
    { title: 'Separately verified plant-based bowl', bestFor: 'A kitchen willing to use plant protein, vegetarian seasoning and clean utensils from the start.', tradeOff: 'Ask specifically about fish sauce, dried shrimp, stock, peanuts, soy, gluten and the shared mortar. “No meat” alone is insufficient.' },
  ],
  orderSteps: [
    { title: 'Name the salad and the protein', text: 'Ask for Yam or Yum Woon Sen / ยำวุ้นเส้น, then confirm which noodles and which proteins are in today’s bowl. This prevents confusion with Pad Woon Sen, the stir-fried dish.' },
    { title: 'Map the whole dressing', text: 'Check fish sauce, dried shrimp, stock or seasoning, peanuts, soy and the noodle packet. State crustacean, fish, peanut, gluten, soy, vegetarian, vegan or halal needs before one shared dressing is added.' },
    { title: 'Set heat and service', text: 'Request the chilli level while the dressing is still separate and ask whether the salad is freshly mixed. Taste first; add chilli gradually and eat while the noodles still hold their texture.' },
  ],
  cooking: {
    title: 'Soak. Cook. Drain. Dress. Serve.',
    intro: 'Glass noodles and small proteins move quickly, but timing is not universal. A complete tested method must follow the chosen noodle packet, protein size and dressing formula. This traveller owner explains the control points without inventing one recipe.',
    steps: ['Choose one complete tested Yam Woon Sen method and check the glass-noodle ingredient list. Soak or prepare the noodles only as that method and packet direct; different starch blends behave differently.', 'Wash vegetables and herbs with clean tools before raw pork or prawns enter the workspace. Mix lime, fish sauce, sugar, chilli and aromatics according to the tested method, keeping allergen substitutions explicit.', 'Cook the noodles to flexible, springy tenderness, drain thoroughly and cut only if the method directs. Do not confuse rice vermicelli or Korean sweet-potato noodles with the Thai mung-bean signal.', 'Cook prawns and minced pork thoroughly using the complete method and current official guidance. Prawns should be opaque and the pork must have no raw centre; use clean utensils for the finished proteins.', 'Combine vegetables, drained noodles and cooked proteins, then add dressing close to service. Toss evenly without crushing tomato or turning the noodles into a dense clump.', 'Serve promptly with clean spoon and fork. Keep ready-to-eat herbs away from raw-protein tools, avoid prolonged warm holding and refrigerate leftovers promptly rather than relying on a universal shelf life.'],
    boundary: 'This is not a safety shortcut or a fixed recipe. Noodle composition, prawn size, minced-meat handling and dressing ingredients vary. Fully cooked protein can still carry crustacean, fish, pork or shared-prep restrictions, and a transparent noodle can still contain or contact gluten. Recipe schema is deliberately omitted.',
  },
  affiliates: [
    { href: '/go/simple-thai-food-cookbook/', title: 'Simple Thai Food', text: 'A tested Thai cookbook can supply exact noodle, protein, dressing and food-safety controls that this traveller guide should not invent. Check the current edition, contents, format, seller, price and delivery before buying.' },
  ],
  classHref: withSubId(KLOOK_GENERIC, 'en-yam-woon-sen-bangkok-market-cooking-experience'),
  classCopy: 'A suitable Bangkok market walk or Thai cooking experience can show how a yam dressing balances lime, fish sauce, sugar and chilli around glass noodles. Klook results are broad: confirm Yam Woon Sen is explicitly included in the current menu and check protein, allergens, dietary handling, language, group size and cancellation terms before booking.',
  classSignals: [
    { title: 'Noodle identity', text: 'Compare mung-bean glass noodles with rice vermicelli and sweet-potato glass noodles instead of treating every clear noodle as interchangeable.' },
    { title: 'Dressing balance', text: 'See how sour, salty, sweet and hot elements are adjusted before the noodles absorb the dressing.' },
    { title: 'Clean sequence', text: 'Keep raw pork and prawns separate from herbs, then combine fully cooked proteins with vegetables only at final service.' },
  ],
  faqs: [
    { question: 'What does Yam Woon Sen mean?', answer: 'Yam, also written yum, refers to a Thai mixed salad with a bright seasoned dressing. Woon sen means glass noodles. The name describes the salad system and its noodle base; it does not guarantee one protein, chilli level or exact ingredient list.' },
    { question: 'What is woon sen made of?', answer: 'Thai woon sen is commonly a thin clear noodle made from mung-bean starch and may be labelled bean thread or bean vermicelli. Some products blend mung bean with other starches. Korean glass noodles are commonly sweet-potato based and behave differently, so inspect the packet.' },
    { question: 'What is in Yam Woon Sen?', answer: 'A familiar version combines glass noodles, a lime–fish-sauce–sugar–chilli dressing, tomato, onion, celery, herbs, minced pork and prawns. Dried shrimp or peanuts may appear, while chicken, squid, mushrooms, tofu and other vegetables are credible variations. Verify the actual bowl.' },
    { question: 'What does Yam Woon Sen taste like?', answer: 'It is usually bright and tangy from lime, savoury from fish sauce and protein, lightly sweet and variably hot from fresh chilli. The noodles are mild and absorb the dressing; vegetables and herbs keep the finish fresh. Balance and heat vary by cook.' },
    { question: 'What is the sauce for Yam Woon Sen?', answer: 'The researched classic pattern uses fresh lime juice, fish sauce, sugar, chilli and often garlic or coriander stems. Recipes and vendors change the proportions or add stock and seasoning. Ask about fish, crustacean, soy, wheat and packaged ingredients rather than assuming every clear dressing is identical.' },
    { question: 'What is the difference between Pad Woon Sen and Yam Woon Sen?', answer: 'Yam Woon Sen is a bright mixed salad in which cooked glass noodles and proteins are tossed with lime-led dressing and fresh vegetables. Pad Woon Sen is a wok stir-fry, usually with egg, vegetables, meat and a soy-led sauce. They share a noodle, not the same cooking method or allergen map.' },
    { question: 'Are woon sen noodles gluten-free?', answer: 'Pure mung-bean-starch noodles can be gluten-free, but some packets blend other starches and the finished salad can include soy sauce, stock, seasoning or cross-contact. A transparent appearance proves nothing. Check the packet, every dressing ingredient and the preparation area for coeliac-level needs.' },
    { question: 'Is Yam Woon Sen vegetarian?', answer: 'Not by default. The familiar bowl uses minced pork, prawns, fish sauce and sometimes dried shrimp. A vegetarian or vegan version requires plant protein, non-fish seasoning and separate preparation; peanuts, soy and gluten may still need checking.' },
    { question: 'Is Yam Woon Sen served hot or cold?', answer: 'There is no single compulsory temperature. It can arrive slightly warm from freshly cooked noodles and protein, at room temperature or cooled. Fresh mixing matters more: the noodles continue taking up dressing, so long holding can make the salad dry or clumped.' },
    { question: 'What should you eat with Yam Woon Sen?', answer: 'It can work as a light plate or as the bright counterpoint in a shared Thai meal with rice and richer grilled or curry dishes. Add companion dishes according to appetite and dietary needs; do not assume rice or another dish is automatically included in the order.' },
  ],
  related: [
    { title: 'Bangkok travel guide', description: 'Place the salad inside a market, neighbourhood and transport plan instead of chasing one permanent stall.', href: '/city/bangkok/', image: '/images/redesign/bangkok-food-yaowarat.webp' },
    { title: 'Som Tam', description: 'Compare another bright Thai salad whose papaya, pounding, chilli and regional seasoning create a different texture and allergen map.', href: '/food/som-tam/', image: '/images/redesign/som-tam-dish-hero.webp' },
    { title: 'Larb', description: 'Understand how minced meat, herbs and toasted rice define the Isaan and Lao salad system rather than a glass-noodle yam.', href: '/food/larb/', image: '/images/redesign/larb-isaan-table-hero.webp' },
  ],
  sources: [
    { title: 'Thai Glass Noodle Salad – Yum Woon Sen', creator: 'Hot Thai Kitchen · Pailin Chongchitnant', url: 'https://hot-thai-kitchen.com/glass-noodle-salad-v2/', note: 'Complete current Thai specialist parse used for mung-bean noodles, yam dressing, common pork/prawn structure, vegetables, optional dried shrimp and peanuts, immediate service and separation from Korean sweet-potato glass noodles. Exact quantities, health language and universal dietary claims were excluded.' },
    { title: 'Rongros – Bangkok', creator: 'MICHELIN Guide', url: 'https://guide.michelin.com/jp/en/bangkok-region/bangkok/restaurant/rongros', note: 'Current restaurant context supporting a tangy Thai glass-noodle salad in Bangkok. DFS returned zero page markdown, so no ingredient, price, permanence or dietary claim is derived from it.' },
    { title: 'Cooking your food', creator: 'UK Food Standards Agency', url: 'https://www.food.gov.uk/safety-hygiene/cooking-your-food?ContensisTextOnly=true', note: 'Current primary source used for thorough cooking and temperature-control boundaries alongside a complete tested noodle-salad method.' },
    { title: 'Allergen guidance for food businesses', creator: 'UK Food Standards Agency', url: 'https://www.food.gov.uk/business-guidance/allergen-guidance-for-food-businesses', note: 'Current primary guidance used for crustacean, fish, peanut, soy, wheat and cross-contact checks rather than automatic safety.' },
    { title: 'Safe gluten-free takeaway options', creator: 'Coeliac UK', url: 'https://www.coeliac.org.uk/living-with-coeliac-disease/food-and-drink/eating-out-and-travel/16528-2/', note: 'Expert source used for packet, commercial-sauce and shared-preparation checks rather than assuming clear noodles make the whole dish gluten-free.' },
  ],
  methodDescription: 'Updated 28 July 2026 after two independent DataForSEO clusters with 29 raw keyword records and 50 competitor domains, ten current UK-English SERPs with 67 organic results, 57 People Also Ask appearances and 32 case-normalised unique questions, one complete 17,111-character Thai specialist DFS source parse, one current zero-markdown Michelin context capture, current primary FSA cooking and allergen guidance, Coeliac UK guidance, plus exact owner ranking and backlink checks. The broader UK-English cluster returned volume 170 and difficulty 8 for “thai glass noodle salad”; the exact owner has zero ranking terms and no reportable backlink summary signal. Pad Woon Sen, Laab Woon Sen, generic Asian glass-noodle salads, recipe-only, health, calorie, fixed-price, automatic dietary, permanent restaurant, universal heat, serving-temperature, storage and one-formula claims were excluded.',
};

export function YamWoonSenGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
