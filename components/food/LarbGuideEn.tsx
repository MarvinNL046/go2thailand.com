import { ChefHat, Flame, Leaf, MapPin, ShoppingBasket, Sparkles, UtensilsCrossed } from 'lucide-react';
import { KLOOK_GENERIC, withSubId } from '../../lib/affiliates';
import { DishEditorialTemplate, type DishEditorialData } from './DishEditorialTemplate';

const data: DishEditorialData = {
  title: 'Larb in Thailand: Ingredients, Taste & How to Order',
  description: 'Understand Thai larb before ordering: ingredients, taste, larb moo and gai, larb versus laab and nam tok, cooked versions, heat, gluten and dietary checks.',
  canonical: 'https://go2-thailand.com/food/larb/',
  updatedAt: '28 July 2026',
  name: 'Larb',
  thaiName: 'ลาบ',
  heroImage: '/images/redesign/larb-isaan-table-hero.webp',
  heroAlt: 'Fully cooked Isan larb moo with toasted rice powder, mint and shallot beside sticky rice, cabbage and long beans',
  heroEyebrow: 'Isan herbs · toasted rice · chosen heat',
  lead: 'Larb — also written laab or laap — is a family of minced-protein salads shared across Isan and Laos. A familiar cooked Thai plate is bright with lime, fish sauce, toasted rice powder, dried chilli, shallot and herbs, but protein, heat, seasoning and preparation change from one kitchen to another.',
  quickFacts: [
    { label: 'Dish family', value: 'Minced protein · herbs · seasoning', icon: UtensilsCrossed },
    { label: 'Signature', value: 'Toasted rice powder · khao khua', icon: Sparkles },
    { label: 'Heat', value: 'Often hot; request before mixing', icon: Flame },
    { label: 'Context', value: 'Isan tables · markets · restaurants', icon: MapPin },
  ],
  navItems: [
    { href: '#taste', label: 'Taste', icon: Sparkles },
    { href: '#ingredients', label: 'Ingredients', icon: ShoppingBasket },
    { href: '#choose', label: 'Styles', icon: UtensilsCrossed },
    { href: '#order', label: 'Order', icon: MapPin },
    { href: '#cook', label: 'Cook', icon: ChefHat },
    { href: '#questions', label: 'Questions', icon: Leaf },
  ],
  taste: {
    intro: 'Lime can make the first bite vivid and sour; fish sauce supplies savoury depth, dried chilli brings a warm-to-forceful burn and fresh herbs lift the finish. Toasted rice powder adds aroma and a fine sandy crunch rather than making the dish taste like boiled rice.',
    texture: 'Cooked mince stays loose and juicy, while shallot, mint and spring onion add crisp and leafy contrast. Coarse khao khua gives a toasted graininess that helps larb feel distinct from an ordinary minced-meat salad.',
    finish: 'Fresh lime and herbs fade into dried-chilli warmth, fish-sauce salinity and toasted rice. A sweeter, wetter or more bitter finish signals a different cook or regional style rather than a failed universal formula.',
    scores: [{ label: 'Sour', value: 5 }, { label: 'Herbal', value: 4 }, { label: 'Toasted', value: 3 }, { label: 'Hot', value: 4 }],
  },
  ingredients: [
    { name: 'Minced protein', role: 'Pork is larb moo and chicken is larb gai; beef, duck, fish and other versions also exist. Protein does not reveal whether a version is cooked.' },
    { name: 'Khao khua', role: 'Toasted ground rice gives aroma and a fine textured bite. Grind and quantity vary, and a premixed product still needs a label check.' },
    { name: 'Lime', role: 'Commonly supplies the sharp sour line. Its strength and juice yield change, so a tested recipe adjusts by tasting rather than colour.' },
    { name: 'Fish sauce', role: 'A familiar salty-savoury seasoning and an essential fish-allergen and vegetarian check. Some kitchens may use another fermented seasoning.' },
    { name: 'Dried chilli', role: 'Often toasted or ground before mixing. Heat varies by chilli, batch and spoonful; removing visible flakes cannot reverse a premix.' },
    { name: 'Shallot', role: 'Thin slices add sweet-sharp crunch. Onion and spring onion may join or substitute depending on kitchen and availability.' },
    { name: 'Mint and herbs', role: 'Mint, coriander, sawtooth coriander or spring onion can lift the plate, but no single herb list defines every regional larb.' },
    { name: 'Sticky-rice table', role: 'Sticky rice, cabbage, long beans and other raw vegetables commonly accompany larb. They are serving signals, not mandatory ingredients.' },
  ],
  allergenCopy: 'Fish is the first common check because fish sauce is familiar, but soy or seasoning sauce, stock, premixes and shared tools can add soy, wheat or other allergens. Pure rice powder is made from rice; that does not make the finished larb automatically gluten-free. For coeliac disease or a serious allergy, verify every current ingredient and cross-contact control.',
  vegetarianCopy: 'Mushroom, tofu and plant mince can support a larb-style dish, but the name does not make it vegetarian or vegan. Confirm a plant-based protein, no fish sauce or meat stock, suitable seasoning and acceptable shared preparation before ordering.',
  formats: [
    { title: 'Isan larb', bestFor: 'The familiar lime-, herb- and toasted-rice-led profile with a chosen minced protein and sticky rice alongside.', tradeOff: 'Cooked versions are widely familiar, but raw or blood-containing variants exist; ask clearly when preparation matters.' },
    { title: 'Northern laab kua', bestFor: 'A cooked, often darker and dry-spiced Northern expression with a different aromatic system.', tradeOff: 'It is not simply a spelling variant of the same plate. Use the dedicated Northern guide before comparing ingredients.' },
    { title: 'Nam tok', bestFor: 'Similar sour-hot toasted-rice seasoning around sliced grilled meat rather than mince.', tradeOff: 'Shared seasonings do not make nam tok and larb interchangeable; cut, cooking and texture remain different.' },
  ],
  orderSteps: [
    { title: 'Choose the protein', text: 'Larb moo is pork and larb gai is chicken; beef, duck, fish or a plant adaptation may be available. Ask what the kitchen actually uses rather than treating the English menu name as complete.' },
    { title: 'Request cooked and set heat', text: 'If you do not want a raw preparation, request fully cooked meat before the order is mixed. Agree the chilli level at the same time; “not spicy” is a request, not a zero-chilli guarantee.' },
    { title: 'Check hidden seasoning', text: 'Ask about fish sauce, stock, soy or wheat-containing seasoning and shared tools. Then choose sticky rice and vegetables to build the wider Isan table.' },
  ],
  cooking: {
    title: 'Toast. Cook. Season. Fold.',
    intro: 'A useful sequence keeps the rice aromatic, the mince safely cooked and the herbs fresh. Toasted rice is ground separately; the protein is cooked according to a tested recipe; lime, fish sauce and chilli are balanced; delicate herbs are folded through near the end.',
    steps: ['Choose a tested larb recipe and identify every protein, seasoning, allergy and storage requirement before cooking.', 'Toast the specified rice evenly until fragrant, let it cool and grind it to the recipe’s texture.', 'Prepare shallot, chilli and herbs separately so raw ingredients never share contaminated tools or surfaces.', 'Cook minced protein thoroughly using the tested recipe’s safe time-and-temperature guidance.', 'Balance lime, fish sauce and chilli in the stated sequence, accounting for the liquid already released by the protein.', 'Fold through toasted rice powder and fresh herbs, then serve with prepared sticky rice and vegetables.'],
    boundary: 'Minced meat requires particular food-safety attention. WHO advises separating raw and cooked foods and cooking thoroughly; use a tested recipe for exact temperatures, cooling, storage and reheating. Raw larb and related dishes are not made safe by freshness alone. This editorial guide deliberately does not publish Recipe schema.',
  },
  affiliates: [
    { href: '/go/simple-thai-food-cookbook/', title: 'Simple Thai Food', text: 'A broad Thai cooking reference can place Isan salads, toasted rice and seasoning balance in context. Compare the current edition, format, seller and delivery details.' },
    { href: '/go/thai-granite-mortar-eight-inch/', title: 'Eight-inch granite mortar', text: 'A stable mortar can grind cooled toasted rice and dried chilli, but a smaller spice grinder may suit some kitchens better. Check current weight, usable interior, care and worktop protection.' },
  ],
  classHref: withSubId(KLOOK_GENERIC, 'en-larb-thailand-cooking-class'),
  classCopy: 'A suitable Thai or Isan cooking class can show toasted-rice texture, off-heat seasoning and the difference between a cooked larb and related salads. Klook results are broad: confirm larb is on the current menu and discuss allergens and meat handling before booking.',
  classSignals: [
    { title: 'Rice texture', text: 'Compare properly toasted khao khua with raw rice powder or an over-fine, dusty grind.' },
    { title: 'Safe sequence', text: 'See how raw and cooked tools are separated and when lime, seasoning and herbs enter.' },
    { title: 'Regional boundary', text: 'Ask whether the class teaches Isan larb, Northern laab kua or another local version.' },
  ],
  faqs: [
    { question: 'What is a larb made of?', answer: 'A familiar Isan larb combines minced pork, chicken or another protein with lime, fish sauce, toasted rice powder, dried chilli, shallot and fresh herbs. Recipes vary, and the visible ingredient list does not reveal every sauce, stock or preparation choice.' },
    { question: 'What does larb mean in Thai?', answer: 'Larb is the common English rendering of the Thai dish name ลาบ. It identifies a family of seasoned minced-protein salads; simple English folk translations such as “luck” do not explain what will arrive on the plate.' },
    { question: 'How are you supposed to eat larb?', answer: 'Larb is commonly shared with sticky rice and raw vegetables such as cabbage or long beans, often beside grilled food or som tam. Take a small portion with rice or vegetables and build the meal at your own pace; no single utensil rule applies to every setting.' },
    { question: 'Is there a difference between laab and larb?', answer: 'Usually larb, laab and laap are competing Latin spellings of ลาบ, so spelling alone may not signal a different dish. A named regional form such as Northern laab kua is materially different and deserves its own ingredient and preparation check.' },
    { question: 'Is Larb Moo raw?', answer: 'Larb moo means pork larb, not automatically raw pork. Cooked versions are familiar, but raw and blood-containing variants exist. If preparation is unclear, ask for fully cooked minced meat and do not treat freshness as a safety guarantee.' },
    { question: 'What is the difference between laab and Nam Tok?', answer: 'Both can use lime, fish sauce, chilli, herbs and toasted rice powder. Larb is usually built around minced or finely chopped protein, while nam tok commonly uses slices of grilled meat, creating a different cooking method and texture.' },
    { question: 'What are the different types of larb Thai?', answer: 'Common choices include pork larb moo, chicken larb gai, beef, duck or fish versions, plus regional and technique differences. Northern laab kua is typically cooked and dry-spiced; raw variants and meat-free adaptations also exist. The exact name and kitchen matter.' },
    { question: 'How is larb traditionally served?', answer: 'In an Isan meal it is commonly served at the centre of a shared table with sticky rice, cabbage, long beans, herbs and other dishes such as grilled chicken or som tam. Accompaniments and presentation differ by home, market and restaurant.' },
    { question: 'Is Thai larb gluten-free?', answer: 'Not automatically. Rice, lime, herbs and plain fish sauce may fit some gluten-free diets, but seasoning sauce, soy sauce, stock, premixes and cross-contact can introduce wheat. Coeliac diners need a current ingredient and preparation check.' },
    { question: 'How do you say larb in Thai?', answer: 'The Thai spelling is ลาบ. English menus write larb, laab or laap; “laap” is a useful rough cue for the long vowel, while the final consonant is light. Pointing to the Thai script is more reliable than forcing one English spelling.' },
  ],
  related: [
    { title: 'Northern Laab Kua', description: 'See why the cooked dry-spiced Northern form is more than a spelling change.', href: '/food/laab-kua/', image: '/images/food/laab-kua.webp' },
    { title: 'Som Tam guide', description: 'Build the Isan table with a separately chosen pounded-salad version and heat level.', href: '/food/som-tam/', image: '/images/redesign/som-tam-dish-hero.webp' },
    { title: 'Explore Isan', description: 'Place larb beside the Northeast’s Mekong landscapes, cities and sticky-rice food culture.', href: '/region/isaan/', image: '/images/regions/isaan-thailand.webp' },
  ],
  sources: [
    { title: 'Northeast Thai Cuisine', creator: 'Thailand Foundation', url: 'https://thailandfoundation.or.th/isan-cuisine-opening/', note: 'Full institutional parse used for Isan and Lao-PDR context, sticky rice and larb as a meat salad flavoured with toasted rice powder.' },
    { title: 'Authentic Thai Laab (Larb) Recipe with Pork', creator: 'Hot Thai Kitchen', url: 'https://hot-thai-kitchen.com/laab-moo/', note: 'Full DFS parse used for spelling, familiar ingredients, accompaniments, toasted-rice texture and a tested cooked-pork technique; not treated as the only formula.' },
    { title: 'Public health advice on food safety', creator: 'World Health Organization', url: 'https://www.who.int/europe/news-room/fact-sheets/item/public-health-advice-on-food-safety-during-summer', note: 'Full primary-source parse used for raw-versus-cooked separation, thorough cooking and special attention to minced meat.' },
    { title: 'Northern Thai Cuisine', creator: 'Thailand Foundation', url: 'https://thailandfoundation.or.th/northern-thai-cuisine-opening/', note: 'Full institutional parse used to preserve the separate Northern culinary context and dedicated Laab Kua owner.' },
  ],
  methodDescription: 'Updated 28 July 2026 after a 216-record DataForSEO cluster with 50 competitor domains, ten current UK-English SERPs with 76 organic results, 53 People Also Ask appearances and 41 unique genuine questions, four full source parses, plus exact ranking and backlink checks for Larb and Northern Laab Kua. Neither route returned ranking terms or reportable backlink summary signal, so both useful owners remain: this route owns broad Isan larb and spelling intent, while `/food/laab-kua/` keeps the Northern cooked-spiced variant. Fixed prices, calories, health labels, raw-meat reassurance, automatic gluten-free or vegetarian claims, one-authentic-form language and unsupported first-hand claims were excluded.',
};

export function LarbGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
