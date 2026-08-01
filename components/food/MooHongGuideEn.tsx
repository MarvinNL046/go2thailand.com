import { ChefHat, Flame, Leaf, MapPin, ShoppingBasket, Sparkles, UtensilsCrossed } from 'lucide-react';
import { KLOOK_GENERIC, withSubId } from '../../lib/affiliates';
import { DishEditorialTemplate, type DishEditorialData } from './DishEditorialTemplate';

const data: DishEditorialData = {
  title: 'Moo Hong Phuket: Braised Pork Belly & How to Order It',
  description: 'Understand Phuket Moo Hong: pork belly, dark soy braise, taste, ingredients, Moo Palo differences, gluten and halal checks, ordering and safe cooking.',
  canonical: 'https://go2-thailand.com/food/moo-hong/',
  updatedAt: '28 July 2026',
  name: 'Moo Hong',
  thaiName: 'หมูฮ้อง · Phuket braised pork',
  heroImage: '/images/redesign/moo-hong-phuket-braised-pork-hero.webp',
  heroAlt: 'Fully cooked Phuket Moo Hong pork belly cubes in a glossy dark soy glaze with jasmine rice in a Peranakan dining room',
  heroEyebrow: 'Phuket · Hokkien-Chinese heritage · slow braise',
  lead: 'Moo Hong is Phuket’s dark, glossy pork-belly braise: soy, palm sugar, garlic and black pepper turn rich meat into a salty-sweet shared dish made for rice. It is usually gently peppery rather than chilli-hot. Ask which soy sauces and stock enter the pot, because a simple-looking bowl is neither gluten-free nor halal by default.',
  quickFacts: [
    { label: 'Place', value: 'Phuket · Thai-Chinese heritage', icon: MapPin },
    { label: 'Protein', value: 'Pork belly · sometimes meatier pork', icon: ShoppingBasket },
    { label: 'Profile', value: 'Savoury · sweet · black pepper', icon: Sparkles },
    { label: 'Heat', value: 'Usually gentle · not chilli-led', icon: Flame },
  ],
  navItems: [
    { href: '#taste', label: 'Taste', icon: Sparkles },
    { href: '#ingredients', label: 'Ingredients', icon: ShoppingBasket },
    { href: '#choose', label: 'Choose', icon: UtensilsCrossed },
    { href: '#order', label: 'Order', icon: MapPin },
    { href: '#cook', label: 'Braise', icon: ChefHat },
    { href: '#questions', label: 'Questions', icon: Leaf },
  ],
  taste: {
    intro: 'Dark soy and reduced braising liquid bring salt and umami; palm sugar rounds the edges; garlic, coriander root or stems and black pepper add warmth. The result should taste layered and pork-rich, not like syrup and not automatically like five-spice stew.',
    texture: 'Pork belly gives three textures in one cube: yielding meat, rendered fat and soft skin where used. The sauce should cling and pool enough for rice without becoming a thin soup. A meatier shoulder blend changes that balance.',
    finish: 'Black pepper and dark soy linger after the initial richness. Cinnamon or star anise may add perfume in one pot and be absent in another, so a strong five-spice finish is a version rather than a definition.',
    scores: [{ label: 'Savoury', value: 5 }, { label: 'Sweet', value: 3 }, { label: 'Peppery', value: 3 }, { label: 'Rich', value: 5 }],
  },
  ingredients: [
    { name: 'Pork belly', role: 'The defining protein and texture: meat, rendered fat and often skin in large braised pieces. Shoulder may lighten an adaptation but does not make the classic dish pork-free.' },
    { name: 'Soy sauce', role: 'Regular or light soy brings seasoning and umami. It contains soy and commonly wheat; exact brands and fermentation differ.' },
    { name: 'Dark or black soy', role: 'Builds the mahogany colour and deep sauce. Saltiness and sweetness vary by Thai, Chinese and commercial product.' },
    { name: 'Palm sugar', role: 'Balances soy and helps the reduced sauce glaze the pork. Brown sugar may appear in an adaptation; quantity and sweetness are not universal.' },
    { name: 'Garlic', role: 'Pounded or cooked into the aromatic base rather than functioning as a raw garnish.' },
    { name: 'Black pepper', role: 'A familiar Southern-Thai signal that gives warm pepper fragrance without making the dish chilli-hot.' },
    { name: 'Coriander root · stems', role: 'Can join garlic and pepper in a Thai aromatic paste. Root availability and the exact paste vary between cooks.' },
    { name: 'Stock · whole spices', role: 'Pork or chicken stock, oyster-style seasoning, cinnamon and star anise can occur. Each adds dietary boundaries and none is mandatory in every pot.' },
  ],
  allergenCopy: 'Soy is direct; many soy sauces contain wheat, and oyster sauce or stock may add shellfish, fish, soy or more wheat. Plain pork and jasmine rice do not certify the finished plate as gluten-free. Ask about every sauce, stock, seasoning, shared pot, ladle and side when an allergy or coeliac disease matters.',
  vegetarianCopy: 'Classic Moo Hong is pork belly and is neither vegetarian nor halal. Removing visible meat cannot remove pork fat, stock or sauce from the pot. A chicken or plant-based “hong” braise can be a separate adaptation, but its protein, sauces and handling need their own verification and it should not be sold as classic pork Moo Hong.',
  formats: [
    { title: 'Classic pork belly', bestFor: 'Experiencing the Phuket signature through large, rich pieces with meat, rendered fat, soft skin and dark sauce for rice.', tradeOff: 'Confirm portion size and visible fat, then ask about soy, stock, oyster sauce and whole spices. Pork means the dish is not halal.' },
    { title: 'Meatier pork blend', bestFor: 'Keeping the soy-pepper braise while choosing a kitchen that combines belly with shoulder or another pork cut.', tradeOff: 'It remains pork, may be less silky and is not a standard promise. Verify the actual cut rather than assuming “lean” from appearance.' },
    { title: 'Rice or mantou service', bestFor: 'Using jasmine rice to absorb sauce or trying a documented Peranakan-style mantou pairing when currently offered.', tradeOff: 'Mantou commonly contains wheat; rice can share sauce or utensils containing gluten. The side does not change the pork base.' },
  ],
  orderSteps: [
    { title: 'Choose cut and scale', text: 'Ask for Moo Hong or show หมูฮ้อง, then check whether it is a small rice plate or a richer shared bowl. Look for fully cooked, hot pork with sauce that is glossy rather than dried out.' },
    { title: 'Map the dark sauce', text: 'Ask which light, dark or black soy, stock and oyster-style sauce are used, plus cinnamon or star anise if those flavours matter. State soy, wheat, shellfish or fish restrictions clearly.' },
    { title: 'Balance the richness', text: 'Choose rice or mantou and add a fresh vegetable or sharper dish to the meal. Moo Hong is pork and not halal; a separate pork-free dish needs clean ingredients and handling.' },
  ],
  cooking: {
    title: 'Season. Pound. Sear. Braise. Reduce. Rest.',
    intro: 'The method is controlled reduction, not simply boiling pork until soft. A tested recipe defines the pork cut, soy products, sugar, liquid and pot. The editorial sequence below protects the logic and safety boundary without pretending that one cook time or spice list fits every version.',
    steps: ['Choose one complete tested Moo Hong recipe and map pork, every soy sauce, sugar, aromatic, stock and optional whole spice before beginning.', 'Keep raw pork and its marinade away from ready-to-eat food, wash hands and clean boards, knives and surfaces after contact.', 'Pound black pepper, garlic and coriander root or stems only if the tested method calls for that paste; sauté without burning the aromatics.', 'Brown or season the pork as directed, add measured stock and sauce, then maintain the specified gentle braise so thick pieces cook completely and evenly.', 'Turn the pieces as required and reduce the liquid only after the pork is safely cooked and tender; watch the dark sauce beneath the fat so sugar and soy do not scorch.', 'Serve steaming hot. Chill leftovers promptly, refrigerate within current guidance and reheat only as advised until steaming hot throughout.'],
    boundary: 'Fork tenderness and dark colour do not prove safe cooking. UK Food Standards Agency guidance says pork can contain bacteria throughout and needs complete cooking; use a clean thermometer and the validated time-temperature combination in current guidance or a tested recipe. This owner deliberately omits Recipe schema.',
  },
  affiliates: [
    { href: '/go/simple-thai-food-cookbook/', title: 'Simple Thai Food', text: 'A tested Thai cookbook can supply exact pork, sauce, braising and storage controls that this traveller guide should not invent. Check the current contents, edition, format, seller and delivery.' },
    { href: '/go/thai-granite-mortar-eight-inch/', title: 'Eight-inch granite mortar', text: 'Relevant when a tested recipe calls for pounding black pepper, garlic and coriander root or stems. Compare usable capacity, weight and worktop protection; a smaller mortar may suit the batch better.' },
  ],
  classHref: withSubId(KLOOK_GENERIC, 'en-moo-hong-phuket-food-walk'),
  classCopy: 'A suitable Phuket Old Town food walk or cooking experience can put Moo Hong beside the island’s other Hokkien-Chinese dishes and show how a shared braise is served. Klook results are broad, so confirm Moo Hong is explicitly included and check pork, soy, gluten, class language, Old Town stops and cancellation terms.',
  classSignals: [
    { title: 'Phuket identity', text: 'Separate the local dark pork-belly braise from generic pork dishes that only share “moo” in the name.' },
    { title: 'Sauce map', text: 'Identify light, dark or black soy, stock, sugar and optional whole spices before the pot hides them.' },
    { title: 'Shared-table role', text: 'See why rice, vegetables and sharper dishes balance a rich bowl better than treating it as an isolated snack.' },
  ],
  faqs: [
    { question: 'What is a Moo Hong?', answer: 'Moo Hong is a Phuket speciality of pork belly slowly braised in a dark soy-led sauce with sugar, garlic and black pepper. Coriander root or stems, stock and whole spices can vary. It is commonly shared with jasmine rice.' },
    { question: 'What is Moo Hong in English?', answer: 'A useful English description is “Phuket-style soy-braised pork belly”. “Moo” means pork; the full local name points to a braised pork tradition rather than grilled moo ping or red moo dang.' },
    { question: 'What is Moo Hong pork?', answer: 'It is usually pork belly cut into substantial pieces so meat, fat and skin become tender together. Some cooks blend in pork shoulder for a meatier result, but classic Moo Hong remains a pork dish.' },
    { question: 'Where does Moo Hong come from?', answer: 'Moo Hong is strongly associated with Phuket’s Thai-Chinese and Peranakan food culture. The Tourism Authority describes it as a typical Peranakan island dish; Phuket Rajabhat University records it as a speciality passed through Thai-Chinese descendants.' },
    { question: 'Is Moo Hong spicy?', answer: 'It is usually gently peppery rather than chilli-hot. Black pepper is a familiar aromatic, while cinnamon or star anise may appear in some pots. A spicy side dish or condiment does not make chilli part of every Moo Hong recipe.' },
    { question: 'How to make Moo Hong?', answer: 'A tested method seasons pork belly, builds a garlic-pepper-coriander aromatic base, braises the pork gently in measured soy sauce, sugar and liquid, then reduces the sauce. Exact cuts, brands, quantities, heat and time must come from one complete tested recipe.' },
    { question: 'Why boil pork belly before braising?', answer: 'Some methods blanch pork to clean the surface or manage flavour and fat; others marinate and braise it without blanching. It is a recipe choice, not a defining Moo Hong rule or a substitute for complete cooking and clean raw-pork handling.' },
    { question: 'What is Kai Palo in English?', answer: 'Kai Palo is commonly described as eggs in a Chinese-style five-spice soy stew, often with pork and tofu. Moo Hong is a separate Phuket pork-belly braise; eggs, tofu and a fixed five-spice profile should not be imported into every Moo Hong pot.' },
    { question: 'Do Thai sauces have gluten?', answer: 'Some do. Coeliac UK specifically warns about soy sauce, and Moo Hong may also use oyster sauce, stock or shared utensils. Only a complete product-label and kitchen check can establish whether one serving is gluten-free.' },
    { question: 'Can Muslims eat Thai food?', answer: 'Many Thai dishes can be halal when ingredients and handling are verified, but classic Moo Hong cannot: it is pork belly. Choose a clearly halal-certified or trusted pork-free dish and confirm sauces, stock, alcohol and cross-contact separately.' },
  ],
  related: [
    { title: 'Phuket travel guide', description: 'Choose the right coast and protect time for Old Town’s specific food culture.', href: '/city/phuket/', image: '/images/redesign/phuket-destination-hero-v2.webp' },
    { title: 'Mee Hokkien', description: 'Compare Phuket’s moist yellow wok noodles with this slow, dark shared braise.', href: '/food/mee-hokkien/', image: '/images/redesign/mee-hokkien-phuket-wok-hero.webp' },
    { title: 'Oh Aew', description: 'Finish the rich pork and rice with Phuket’s chilled fig-jelly dessert.', href: '/food/oh-aew/', image: '/images/redesign/oh-aew-phuket-jelly-ice-hero.webp' },
  ],
  sources: [
    { title: 'ASEAN Peranakan Heritage Trail', creator: 'Tourism Authority of Thailand', url: 'https://tourismproduct.tourismthailand.org/wp-content/uploads/2023/01/ASEAN-HT_1_Peranakan_Online_Spread144.pdf', note: 'Current official source used for Moo Hong as a typical Phuket Peranakan dish with fatty pork, sugar, soy sauce and garlic.' },
    { title: 'PKRU x MAIMORN develops package of Moo Hong Phuket', creator: 'Phuket Rajabhat University', url: 'https://www.pkru.ac.th/en/special-feature/5243-phuket-cuisine-pork-belly-stew-jan-2023-1', note: 'Complete primary local parse used for the Thai-Chinese inheritance, diced pork belly, Chinese spices and black soy sauce. One commercial production method was not universalised.' },
    { title: 'Southern Thai Soy-Braised Pork Belly', creator: 'Hot Thai Kitchen', url: 'https://hot-thai-kitchen.com/moo-hong/', note: 'Complete DFS parse used for one tested pork, soy, palm sugar, garlic, black pepper, coriander and stock expression, including optional whole-spice variation. Quantities remain with the source recipe.' },
    { title: 'Peranakan Fine Dining at Blue Elephant Phuket', creator: 'Phuket E-Magazine', url: 'https://www.phuketemagazine.com/phuket-vegetarian-festival-2025/peranakan-fine-dining-blue-elephant-phuket/?lang=en', note: 'Complete independent parse used for one soy-and-palm-sugar pork belly and mantou service. Venue promotion and wine claims were excluded.' },
    { title: 'Cooking your food', creator: 'UK Food Standards Agency', url: 'https://www.food.gov.uk/safety-hygiene/cooking-your-food?ContensisTextOnly=true', note: 'Current official source for complete pork cooking, thermometer-based time-temperature controls, hygiene, chilling and reheating.' },
    { title: 'Safe gluten-free takeaway options', creator: 'Coeliac UK', url: 'https://www.coeliac.org.uk/living-with-coeliac-disease/food-and-drink/eating-out-and-travel/16528-2/', note: 'Complete expert parse used for soy-sauce and shared-pan gluten boundaries.' },
  ],
  methodDescription: 'Updated 28 July 2026 after two independent DataForSEO clusters with two raw keyword records, ten current UK-English SERPs with 76 organic results, 55 People Also Ask appearances and 38 unique questions, five usable complete DFS source parses, current Tourism Authority and UNESCO captures, plus exact owner ranking and backlink checks. The measurable UK phrase has volume 10; the owner has zero ranking terms and no reportable backlink summary signal. Moo Palo, Khao Kha Moo, Moo Ping, Moo Dang, Hong Bak, permanent restaurant, fixed-price, calorie, health, automatic dietary, universal cooking-time and one-spice-list intent were excluded.',
};

export function MooHongGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
