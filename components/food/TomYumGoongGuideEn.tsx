import { ChefHat, Flame, Leaf, MapPin, ShoppingBasket, Sparkles, Soup } from 'lucide-react';
import { KLOOK_GENERIC, withSubId } from '../../lib/affiliates';
import { DishEditorialTemplate, type DishEditorialData } from './DishEditorialTemplate';

const data: DishEditorialData = {
  title: 'Tom Yum Goong: Taste, Ingredients & How to Order It',
  description: 'Understand Tom Yum Goong in Thailand: clear versus creamy broth, herbs, heat, allergens, ordering choices, home-cooking sequence and genuine UK search questions.',
  canonical: 'https://go2-thailand.com/food/tom-yum-goong/',
  updatedAt: '28 July 2026',
  name: 'Tom Yum Goong',
  thaiName: 'ต้มยำกุ้ง',
  heroImage: '/images/redesign/tom-yum-goong-hero.webp',
  heroAlt: 'Steaming Tom Yum Goong with prawns, lemongrass, mushrooms, chilli and makrut lime leaves beside Bangkok river lights',
  heroEyebrow: 'Thailand’s hot-and-sour soup',
  lead: 'Tom Yum Goong is a Thai hot-and-sour prawn soup perfumed with lemongrass, galangal and makrut lime leaves. Clear and creamy versions are both established choices; chilli, stock, fish sauce, shellfish and dairy or evaporated milk can change the practical answer for each diner.',
  quickFacts: [
    { label: 'Dish', value: 'Hot-and-sour prawn soup', icon: Soup },
    { label: 'Typical profile', value: 'Sour · aromatic · savoury', icon: Sparkles },
    { label: 'Heat', value: 'Often hot; kitchen dependent', icon: Flame },
    { label: 'Recognition', value: 'UNESCO-listed living heritage', icon: MapPin },
  ],
  navItems: [
    { href: '#taste', label: 'Taste', icon: Sparkles },
    { href: '#ingredients', label: 'Ingredients', icon: ShoppingBasket },
    { href: '#choose', label: 'Versions', icon: Soup },
    { href: '#order', label: 'Order', icon: MapPin },
    { href: '#cook', label: 'Cook', icon: ChefHat },
    { href: '#questions', label: 'Questions', icon: Leaf },
  ],
  taste: {
    intro: 'The first signal is usually bright sourness, followed by chilli heat, salty-savoury broth and the aroma of fresh herbs. A creamy nam khon version rounds those edges; a clear nam sai version leaves them more exposed.',
    texture: 'Broth, tender prawns and mushrooms are common. Lemongrass, galangal and lime leaves perfume the soup but fibrous pieces are not necessarily intended to be eaten.',
    finish: 'Lime and fresh herbs can feel vivid and clean in a clear broth; creamy versions carry a richer, softer finish without becoming the same dish as Tom Kha.',
    scores: [{ label: 'Sour', value: 5 }, { label: 'Aromatic', value: 5 }, { label: 'Hot', value: 4 }, { label: 'Sweet', value: 1 }],
  },
  ingredients: [
    { name: 'Prawns', role: 'Goong means prawn; size, shell and whether the heads enrich the broth vary by kitchen.' },
    { name: 'Lemongrass', role: 'A bruised aromatic stalk that gives citrus fragrance rather than lime-like acidity.' },
    { name: 'Galangal', role: 'A firm rhizome with a piney, peppery aroma; it is not interchangeable with ginger.' },
    { name: 'Makrut lime leaves', role: 'Torn leaves add a distinctive perfume; wording on English menus varies.' },
    { name: 'Chilli', role: 'Fresh or roasted chilli can provide substantial heat, including inside a prepared paste.' },
    { name: 'Mushrooms', role: 'A common absorbent contrast, with type and quantity changing by recipe.' },
    { name: 'Fish sauce and stock', role: 'Frequent savoury foundations that matter for fish, shellfish and vegetarian boundaries.' },
    { name: 'Lime and creamy additions', role: 'Lime commonly finishes the soup; nam khon may use evaporated milk or another creamy element.' },
  ],
  allergenCopy: 'Shellfish and fish are central concerns, and milk may matter in a creamy nam khon version. Stock, chilli paste, seasoning and shared ladles can add further allergens. Ask about the exact broth and paste before ordering.',
  vegetarianCopy: 'Tom Yum Het names a mushroom version, but that does not prove vegetarian stock or seasoning. Ask explicitly about fish sauce, shrimp paste, stock and shared preparation; “no prawns” is not the same as vegan.',
  formats: [
    { title: 'Nam sai · clear', bestFor: 'A direct view of the sour, herbal and chilli balance in a lighter-looking broth.', tradeOff: 'Clear does not mean mild, low-sodium, allergen-free or free from fish-based seasoning.' },
    { title: 'Nam khon · creamy', bestFor: 'A rounder, richer texture that softens but does not erase the hot-and-sour profile.', tradeOff: 'Ask what creates the creaminess; milk or a prepared chilli paste may affect dietary choices.' },
    { title: 'Another protein', bestFor: 'Exploring the wider Tom Yum soup family with chicken, fish, mushrooms or mixed seafood.', tradeOff: 'Changing the named protein does not automatically change the stock, fish sauce or shared utensils.' },
  ],
  orderSteps: [
    { title: 'Choose the broth', text: 'Ask whether the available soup is nam sai (clear) or nam khon (creamy); do not assume one from the English menu photo.' },
    { title: 'Confirm the base', text: 'Name medical allergens and ask about prawns, stock, fish sauce, chilli paste and milk before the bowl is assembled.' },
    { title: 'Set a realistic heat', text: 'Ask whether chilli can be adjusted in this batch. A prepared broth or paste may already contain heat, so “not spicy” is never a guarantee.' },
  ],
  cooking: {
    title: 'Infuse. Simmer. Season. Brighten.',
    intro: 'Tom Yum depends on when ingredients enter the broth. Aromatics need time to perfume the liquid, prawns need controlled cooking, and fresh lime is normally treated as a finishing sour note rather than boiled until dull.',
    steps: ['Bruise and prepare lemongrass, galangal, shallot and lime leaves.', 'Infuse the broth before adding ingredients that cook quickly.', 'Add mushrooms and the chosen protein in an order that supports safe, even cooking.', 'Build savoury depth with the recipe’s specified stock and seasoning.', 'Add the creamy component only when making the chosen nam khon style.', 'Balance lime and chilli at the finish, then taste before serving.'],
    boundary: 'Prawn size, stock strength, chilli paste, pan geometry and serving style vary. Follow a tested recipe for exact quantities, allergen controls and safe cooking temperatures; this page explains the travel and ordering decisions.',
  },
  affiliates: [{
    href: '/go/simple-thai-food-cookbook/',
    title: 'Simple Thai Food',
    text: 'A broad Thai cooking reference is more useful here than a novelty soup gadget. Compare the current edition, format, seller and delivery terms in your local Amazon store.',
  }],
  classHref: withSubId(KLOOK_GENERIC, 'en-tom-yum-goong-dish-cooking-class'),
  classCopy: 'A suitable class can demonstrate aromatic preparation, clear versus creamy broth and last-minute seasoning. The linked Klook results are broad: confirm that Tom Yum is on the current menu and ask which version you will prepare.',
  classSignals: [
    { title: 'Aromatic sequence', text: 'See how lemongrass, galangal and lime leaves perfume broth without becoming garnish.' },
    { title: 'Broth choice', text: 'Compare nam sai and nam khon without confusing creamy Tom Yum with Tom Kha.' },
    { title: 'Final balance', text: 'Learn when lime, chilli and savoury seasoning enter, and what can be adjusted.' },
  ],
  faqs: [
    { question: 'What is Tom Yum soup made of?', answer: 'Common foundations include lemongrass, galangal, makrut lime leaves, shallot, chilli, mushrooms, lime and savoury seasoning. Tom Yum Goong adds prawns. Stock, fish sauce, chilli paste and a creamy addition vary by version.' },
    { question: 'What does Tom Yum taste like?', answer: 'It is usually distinctly sour, aromatic, savoury and hot. Clear broth exposes those signals; a creamy version rounds them. Sweetness may support the balance but should not define every bowl.' },
    { question: 'Is Tom Yum very spicy?', answer: 'It often has noticeable chilli heat, but the level varies. Some kitchens can adjust a fresh batch, while prepared broth or paste may already be hot. Ask before ordering and do not treat “mai phet” as a medical guarantee.' },
    { question: 'What is the difference between clear and creamy Tom Yum?', answer: 'Nam sai is the clear style. Nam khon adds richness, commonly through evaporated milk or another creamy component plus chilli paste. Both remain hot-and-sour Tom Yum; the ingredient boundary depends on the kitchen.' },
    { question: 'What is the difference between Tom Yum and Tom Kha?', answer: 'Tom Yum centres a bright hot-and-sour herbal broth, in clear or creamy forms. Tom Kha is a different soup family built around galangal and a coconut-rich broth. Protein and local recipes vary in both.' },
    { question: 'What does “goong” mean in Tom Yum Goong?', answer: 'Goong means prawn or shrimp. Tom Yum describes the hot-and-sour soup family; the final word often identifies the protein, such as gai for chicken.' },
    { question: 'Can you eat the lemongrass and galangal in Tom Yum?', answer: 'They are often left in the bowl to perfume the broth but can remain fibrous and firm. It is normal to eat around large aromatic pieces rather than forcing yourself to chew them.' },
    { question: 'Is Tom Yum healthy?', answer: 'The dish name alone cannot answer that. Broth, portion, sodium, sugar, creaminess, seafood and accompanying rice vary. Consider the actual bowl and your dietary needs instead of relying on a universal health label.' },
    { question: 'Is Tom Yum Goong recognised by UNESCO?', answer: 'Yes. UNESCO inscribed Tomyum Kung in 2024 on the Representative List of the Intangible Cultural Heritage of Humanity. That recognition concerns living knowledge and practice, not a single certified restaurant recipe.' },
    { question: 'How should I order Tom Yum in Thailand?', answer: 'Choose the protein and clear or creamy style, then discuss chilli and any medical allergens. Ask about stock, fish sauce, paste and milk when relevant, and order rice separately if you want it alongside the shared soup.' },
  ],
  related: [
    { title: 'Tom Yum versus Tom Kha', description: 'Compare the two soup families without reducing the choice to “spicy versus mild”.', href: '/blog/tom-yum-vs-tom-kha-understanding-thailands-iconic-soups/', image: '/images/blog/tom-yum-vs-tom-kha-understanding-thailands-iconic-soups.webp' },
    { title: 'Thai food guide', description: 'Place soups beside regional dishes, curries, salads and ordering decisions.', href: '/food/', image: '/images/redesign/thailand-food-hub-hero.webp' },
    { title: 'Vegetarian Thailand', description: 'Check stock, fish sauce, paste and shared preparation rather than trusting one menu label.', href: '/travel-guides/vegetarian-vegan-thailand/', image: '/images/redesign/vegetarian-thailand-hero.webp' },
  ],
  sources: [
    { title: 'Tomyum Kung — Representative List', creator: 'UNESCO Intangible Cultural Heritage', url: 'https://ich.unesco.org/en/RL/tomyum-kung-01879', note: 'Primary record for the 2024 inscription and living-heritage description.' },
    { title: 'Tom Yum Goong', creator: 'Hot Thai Kitchen', url: 'https://hot-thai-kitchen.com/tom-yum-goong/', note: 'Full DFS parse used for clear-broth technique, ingredients and terminology.' },
    { title: 'Creamy Tom Yum', creator: 'Hot Thai Kitchen', url: 'https://hot-thai-kitchen.com/creamy-tom-yum/', note: 'Full DFS parse used for the nam sai versus nam khon decision boundary.' },
    { title: 'Understanding Tom Yum Gung and Tom Kha Gai', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Articles/i-understand-tom-yum-gung-and-tom-kha-gai', note: 'Primary tourism source retained for the distinct soup-family comparison; no unsupported detail was inferred from a failed parse.' },
  ],
  methodDescription: 'Updated 28 July 2026 after a 97-record DataForSEO cluster, ten current UK-English SERPs, exact ranking and backlink checks for both broad candidate owners, two usable full technique parses and primary UNESCO verification. The food owner already ranks for six Tom Yum Goong variants, while the overlapping legacy guide returned no ranking or reportable backlink signal; its useful intent is consolidated here. The separate Tom Yum-versus-Tom Kha route remains because it serves a narrower comparison decision. Movie, supermarket, restaurant-near-me, fixed price, fixed nutrition, universal heat, medicinal and unsupported first-hand claims were excluded.',
};

export function TomYumGoongGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
