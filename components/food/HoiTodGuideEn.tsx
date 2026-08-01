import { ChefHat, Flame, Leaf, MapPin, ShoppingBasket, Sparkles, UtensilsCrossed } from 'lucide-react';
import { KLOOK_GENERIC, withSubId } from '../../lib/affiliates';
import { DishEditorialTemplate, type DishEditorialData } from './DishEditorialTemplate';

const data: DishEditorialData = {
  title: 'Hoi Tod: Thailand’s Crispy Mussel or Oyster Omelette',
  description: 'Understand Hoi Tod: crispy shellfish batter, mussel versus oyster, egg, sprouts, texture choices, allergens, halal checks and how to order it.',
  canonical: 'https://go2-thailand.com/food/hoy-tod/',
  updatedAt: '28 July 2026',
  name: 'Hoi Tod',
  thaiName: 'หอยทอด · crispy fried-shellfish omelette',
  heroImage: '/images/redesign/hoi-tod-crispy-mussel-omelette-hero.webp',
  heroAlt: 'Crispy Thai Hoi Tod with cooked mussels, lacy batter, egg, bean sprouts, Chinese chives and chilli sauce',
  heroEyebrow: 'Thai street food · crisp shellfish batter · hot griddle',
  lead: 'Hoi Tod is a hot-griddle shellfish dish in which starch batter, egg and cooked mussels or oysters break into crisp, lacy pieces over bean sprouts and chives. It is not simply a Western omelette: the batter controls the crunch, the shellfish controls the name and a separate chilli sauce controls much of the heat. Ask for the shellfish and texture you actually want.',
  quickFacts: [
    { label: 'Where', value: 'Bangkok · Ayutthaya · street-food counters', icon: MapPin },
    { label: 'Identity', value: 'Mussel or oyster · starch batter · egg', icon: ShoppingBasket },
    { label: 'Texture', value: 'Crisp edges · tender centre · fresh sprouts', icon: UtensilsCrossed },
    { label: 'Heat', value: 'Usually mild · sauce adds chilli', icon: Flame },
  ],
  navItems: [
    { href: '#taste', label: 'Taste', icon: Sparkles },
    { href: '#ingredients', label: 'Signals', icon: ShoppingBasket },
    { href: '#choose', label: 'Choose', icon: UtensilsCrossed },
    { href: '#order', label: 'Order', icon: MapPin },
    { href: '#cook', label: 'Griddle', icon: ChefHat },
    { href: '#questions', label: 'Questions', icon: Leaf },
  ],
  taste: {
    intro: 'The first impression is fried, savoury and gently briny rather than chilli-hot. Mussels feel firmer and fuller; oysters can be softer and more mineral. Egg rounds the shellfish while chives and sprouts keep the plate from becoming only oil and starch.',
    texture: 'A well-ordered crisp version has shattering, lacy batter around tender egg and cooked shellfish, with juicy sprouts underneath. The centre may retain some chew. A deliberately soft and sticky oyster style is closer to Or Suan and should be ordered by name.',
    finish: 'Sweet-tangy chilli sauce, white pepper or another table seasoning can sharpen the finish. Crispness drops quickly as steam and sauce reach the fried batter, so eat it fresh and add sauce a little at a time.',
    scores: [{ label: 'Crisp', value: 5 }, { label: 'Savoury', value: 4 }, { label: 'Briny', value: 4 }, { label: 'Hot', value: 2 }],
  },
  ingredients: [
    { name: 'Mussels · hoi malaeng phu', role: 'A common Hoi Tod shellfish with a firmer bite. Mussels are molluscs and remain an allergen after cooking.' },
    { name: 'Oysters · hoi nang rom', role: 'An established, softer and more mineral alternative. Oyster Hoi Tod is still distinct from a deliberately gooey Or Suan order.' },
    { name: 'Starch batter', role: 'Rice, tapioca, corn, wheat or commercial frying flour can create the lacy structure. Appearance cannot reveal whether wheat/gluten is present.' },
    { name: 'Egg', role: 'Binds crisp batter and shellfish into tender pieces. It is a direct allergen and must be cooked through under the selected tested method.' },
    { name: 'Bean sprouts', role: 'Usually wilted on the griddle or placed beneath the omelette for cool crunch. Raw and cooked sprouts require clean handling.' },
    { name: 'Chinese chives', role: 'Add an onion-garlic freshness through the rich fried base. Spring onion or other greens may appear, so the garnish is not a fixed identity test.' },
    { name: 'Seasoning · frying fat', role: 'Soy, oyster or fish sauce, stock powder, lard or vegetable oil can change wheat, soy, fish, pork and halal status. Ask about both batter and griddle.' },
    { name: 'Chilli sauce', role: 'Often supplies most of the sweetness, acidity and heat. Commercial sauce may add wheat, soy or other ingredients and should stay separate until checked.' },
  ],
  allergenCopy: 'Mussels and oysters are molluscs; egg is direct. Batter, soy/oyster/fish sauce, seasoning powder and chilli sauce can add wheat/gluten, soy, fish, crustacean, sesame or other allergens. The same griddle, spatulas, oil and sauce bottles may serve Pad Thai and multiple seafood dishes. Ask about the complete station, not only the visible shellfish.',
  vegetarianCopy: 'Hoi Tod is neither vegetarian nor vegan: shellfish defines the dish and egg is structural. Removing visible mussels does not remove shellfish juices, sauce or griddle contact. A shellfish-free, egg-free crisp pancake needs its own batter, name and clean equipment. Shellfish also does not automatically make one version halal.',
  formats: [
    { title: 'Crisp mussel Hoi Tod', bestFor: 'The most recognisable contrast of firm mussels, shattered batter, egg and crunchy sprouts.', tradeOff: 'Confirm mollusc, egg, batter flour, sauce and frying fat. Ask for “crispy” before the batch reaches the griddle and eat it immediately.' },
    { title: 'Crisp oyster Hoi Tod', bestFor: 'A softer, more mineral shellfish bite inside the same crisp fried architecture.', tradeOff: 'Oysters are still molluscs and can release more moisture. Clarify that you want Hoi Tod rather than soft Or Suan.' },
    { title: 'Soft oyster Or Suan', bestFor: 'A deliberately tender, sticky or custardy oyster-and-starch texture ordered as its own dish.', tradeOff: 'This is not failed Hoi Tod and not a gluten or low-oil shortcut. Ingredient, shellfish, egg, sauce and griddle checks restart.' },
  ],
  orderSteps: [
    { title: 'Name shellfish and texture', text: 'Ask for Hoi Tod / หอยทอด, then specify mussel or oyster and crisp or softer. Do not rely on an English “oyster omelette” label when the stall sells several shellfish styles.' },
    { title: 'Map batter, sauce and fat', text: 'Ask which flour or premix enters the batter, whether egg is included, what sauces season it and whether the griddle uses lard or shared oil. State mollusc, egg, gluten, soy, fish and halal needs before cooking.' },
    { title: 'Choose a fresh griddle batch', text: 'Watch for batter and shellfish cooked to order on a hot clean surface, with protected sprouts and separate utensils. Eat while crisp, add chilli sauce gradually and do not keep shellfish leftovers warm in a travel bag.' },
  ],
  cooking: {
    title: 'Drain. Mix. Heat. Set. Break. Serve.',
    intro: 'Hoi Tod needs enough heat and surface area for a thin batter to crisp without leaving shellfish or egg undercooked. A complete tested recipe must define shellfish preparation, batter composition, griddle temperature and safe endpoint. This traveller guide protects the sequence rather than inventing universal minutes.',
    steps: ['Choose one complete tested Hoi Tod recipe and identify the mussel or oyster, batter flours, egg, seasonings, sprouts, sauce and frying fat before preparation.', 'Buy shellfish from a regulated cold source, follow current cleaning instructions, remove shell fragments and drain or dry it only as the tested method directs.', 'Mix the specified thin batter without substituting wheat, tapioca, rice or commercial flour silently; keep it and raw egg away from ready-to-eat sprouts and sauce.', 'Heat a sufficiently large seasoned griddle or pan, add the measured fat and spread the batter thinly so steam can escape and lacy edges can form.', 'Add shellfish and egg in the tested sequence, break or turn the pancake as directed and cook both shellfish and egg to the recipe’s safe endpoint rather than judging crisp colour alone.', 'Wilt sprouts separately or on a clean area, plate immediately with chives and keep sauce on the side. Chill perishable leftovers promptly under current official and recipe guidance.'],
    boundary: 'Crispness is a texture goal, not a safety test. Mollusc and egg allergens remain after frying, shared oil and griddles can cross-contact, and a hot exterior does not prove the centre or shellfish is safely cooked. This owner deliberately omits Recipe schema.',
  },
  affiliates: [
    { href: '/go/simple-thai-food-cookbook/', title: 'Simple Thai Food', text: 'A tested Thai cookbook can supply exact batter, shellfish, griddle and cooking controls that this traveller guide should not invent. Check the current contents, edition, format, seller and delivery.' },
  ],
  classHref: withSubId(KLOOK_GENERIC, 'en-hoi-tod-bangkok-street-food-tour'),
  classCopy: 'A suitable Bangkok Chinatown or Ayutthaya food experience can reveal the difference between crisp Hoi Tod, soft Or Suan and nearby Pad Thai griddles. Klook results are broad: confirm Hoi Tod is explicitly on the current itinerary and check shellfish, egg, gluten, halal handling, language and cancellation terms before booking.',
  classSignals: [
    { title: 'Shellfish naming', text: 'Learn whether the order uses mussels or oysters instead of accepting one translated menu name for both.' },
    { title: 'Griddle mechanics', text: 'See how batter thickness, heat, space and timing create lacy edges without leaving egg or shellfish undercooked.' },
    { title: 'Texture vocabulary', text: 'Order crisp Hoi Tod or soft Or Suan deliberately and keep Phuket Oh Tao’s taro-led local construction separate.' },
  ],
  faqs: [
    { question: 'What exactly is hoy tod?', answer: 'Hoi Tod—also written Hoy Tod or Hoi Thot—is a Thai fried-shellfish street-food dish. A starch batter, egg and cooked mussels or oysters are crisped on a hot griddle and commonly served with bean sprouts, Chinese chives and chilli sauce.' },
    { question: 'What is Hoi Tod made of?', answer: 'The core signals are mussels or oysters, a thin starch or flour batter, egg, sprouts and chives. Seasoning sauce, commercial flour, frying fat and dipping sauce vary. Therefore one plate may add wheat, soy, fish, pork fat or other ingredients.' },
    { question: 'What kind of seafood is in Hoi Tod?', answer: 'Mussels are common in Thai Hoi Tod, while oyster versions are also established. Both are molluscs. Ask which shellfish is in the current batch because an English menu may translate both styles as oyster omelette.' },
    { question: 'What does Hoi Tod taste like?', answer: 'Expect a fried, savoury and gently briny base with crisp batter, tender egg and juicy shellfish. Sprouts and chives add freshness; sweet-tangy chilli sauce adds much of the heat. Mussel and oyster versions have different firmness and mineral intensity.' },
    { question: 'Is Hoi Tod a street food?', answer: 'Yes. It is strongly associated with hot-griddle stalls and casual specialist counters, including Bangkok and Ayutthaya. A street-food identity does not guarantee one recipe, price, opening time or hygiene standard, so choose a fresh, busy and well-handled batch.' },
    { question: 'What are some variations of hoy tod?', answer: 'The clearest choices are crisp mussel Hoi Tod and crisp oyster Hoi Tod. Or Suan is a softer, stickier oyster style. Phuket Oh Tao has a separate local construction commonly associated with small oysters and taro. These names should not be flattened into one texture.' },
    { question: 'What other Thai dishes are similar to hoy tod?', answer: 'Or Suan is the closest softer shellfish-and-starch relative. Phuket Oh Tao belongs to a distinct local Hokkien-Phuket tradition. Pad Thai often shares the same type of griddle stall but is a noodle dish, while khai jiao is an egg omelette without Hoi Tod’s shellfish-batter identity.' },
    { question: 'Is there a vegan version of Hoi Tod?', answer: 'Classic Hoi Tod cannot be vegan because shellfish defines “hoi” and egg shapes the dish. A vendor may offer a vegan crisp mushroom or vegetable pancake, but it needs a separate name, egg-free batter, vegan sauces and clean griddle rather than merely removing visible shellfish.' },
    { question: 'Is Hoi Tod gluten-free?', answer: 'Not automatically. Rice or tapioca starch may appear, but wheat flour and commercial frying mix are also documented, while soy sauce, oyster sauce, chilli sauce and a shared griddle can add gluten or cross-contact. Verify the batter packet, sauces and equipment.' },
    { question: 'Why can soy sauce be a problem for coeliacs?', answer: 'Many conventional soy sauces are brewed with wheat, although certified gluten-free alternatives exist. Hoi Tod can also receive wheat from batter premix and other sauces. A rice-looking starch base is therefore not enough; labels and the shared griddle must be checked.' },
  ],
  related: [
    { title: 'Bangkok travel guide', description: 'Place a Chinatown griddle stop inside a realistic first-time Bangkok plan.', href: '/city/bangkok/', image: '/images/redesign/bangkok-destination-hero.webp' },
    { title: 'Ayutthaya travel guide', description: 'Balance temple circuits with boat noodles, river prawns and a crisp Hoi Tod stop.', href: '/city/ayutthaya/', image: '/images/redesign/ayutthaya-destination-hero.webp' },
    { title: 'Phuket travel guide', description: 'Understand why local Oh Tao belongs to Phuket’s Hokkien food story rather than generic Hoi Tod.', href: '/city/phuket/', image: '/images/redesign/phuket-destination-hero-v2.webp' },
  ],
  sources: [
    { title: 'Oyster omelette', creator: 'South China Morning Post Cooking', url: 'https://www.scmp.com/cooking/recipe/oyster-omelette/article/3136122', note: 'Complete current specialist parse used for the broader oyster-omelette technique, Thai mussel usage, oyster variation, starch/flour batter and hot-pan context. Exact recipe quantities were excluded.' },
    { title: 'Easy Thai Fried Mussels — Hoi Tod', creator: 'Hungry in Thailand', url: 'https://hungryinthailand.com/fried-mussels-recipe-hoi-tod/', note: 'Complete current Thai specialist parse used for one crisp mussel, egg, starch-batter and bean-sprout expression. Health, exact quantity and universal cooking claims were excluded.' },
    { title: 'Hoi Tod Singha Buri', creator: 'Michelin Guide', url: 'https://guide.michelin.com/gb/en/phra-nakhon-si-syutthaya-region/phra-nakhon-si-ayutthaya/restaurant/hoi-tod-singha-buri', note: 'Current independent context used only for crispy mussel omelette and bean-sprout service in Ayutthaya. DFS returned zero markdown, and the venue was not turned into a permanent recommendation.' },
    { title: 'Allergen guidance for food businesses', creator: 'UK Food Standards Agency', url: 'https://www.food.gov.uk/business-guidance/allergen-guidance-for-food-businesses', note: 'Current primary guidance used for mollusc, egg, soy, wheat and cross-contact boundaries rather than automatic safety.' },
    { title: 'Safe gluten-free takeaway options', creator: 'Coeliac UK', url: 'https://www.coeliac.org.uk/living-with-coeliac-disease/food-and-drink/eating-out-and-travel/16528-2/', note: 'Expert source used for soy-sauce, batter and shared-equipment checks rather than assuming starch batter is gluten-free.' },
  ],
  methodDescription: 'Updated 28 July 2026 after two independent DataForSEO clusters with thirteen raw keyword records, ten current UK-English SERPs with 71 organic results, 54 People Also Ask appearances and 30 unique questions, two complete DFS source parses, one current zero-markdown Michelin context capture, current UK allergen guidance, plus exact owner ranking and backlink checks. DFS returned UK volume 20 for the exact head term and several volume-10 variants but no difficulty or competitor-domain table; the owner has zero ranking terms and no reportable backlink summary signal. Soft Or Suan, Phuket Oh Tao, Pad Thai, plain Thai omelette, generic East Asian oyster omelettes, recipe-only, health, fixed-price, calorie, automatic dietary, permanent restaurant, universal heat, crispness and storage claims were excluded.',
};

export function HoiTodGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
