import { ChefHat, Flame, Leaf, MapPin, ShoppingBasket, Sparkles, UtensilsCrossed } from 'lucide-react';
import { KLOOK_GENERIC, withSubId } from '../../lib/affiliates';
import { DishEditorialTemplate, type DishEditorialData } from './DishEditorialTemplate';

const data: DishEditorialData = {
  title: 'Roti Sai Mai: Ayutthaya’s Cotton-Candy Roti',
  description: 'Understand Roti Sai Mai: Ayutthaya heritage, thin wheat roti, pulled sugar threads, pandan and sesame variations, allergens, dietary checks and how to eat it.',
  canonical: 'https://go2-thailand.com/food/roti-sai-mai/',
  updatedAt: '28 July 2026',
  name: 'Roti Sai Mai',
  thaiName: 'โรตีสายไหม · Ayutthaya spun-sugar roti',
  heroImage: '/images/redesign/roti-sai-mai-ayutthaya-cotton-candy-roti-hero.webp',
  heroAlt: 'Ayutthaya Roti Sai Mai with thin plain and pandan roti sheets, long caramel, pink and green spun-sugar threads and one rolled bite',
  heroEyebrow: 'Ayutthaya heritage · silk sugar · paper-thin roti',
  lead: 'Roti Sai Mai is Ayutthaya’s signature wrap-it-yourself sweet: place a small bundle of long pulled-sugar threads on a supple, paper-thin roti, roll and bite. The lightly salty wrapper reins in the melting sweetness. Its Muslim-community heritage belongs to the city’s cultural story, while plain, pandan, sesame, milk and grain variations keep the actual ingredient check vendor-specific.',
  quickFacts: [
    { label: 'Place', value: 'Ayutthaya · Muslim-community heritage', icon: MapPin },
    { label: 'Wrapper', value: 'Thin wheat roti · plain or pandan common', icon: ShoppingBasket },
    { label: 'Filling', value: 'Long hand-pulled sugar threads · not a cloud', icon: Sparkles },
    { label: 'Heat', value: 'No chilli · sweetness and aroma vary', icon: Flame },
  ],
  navItems: [
    { href: '#taste', label: 'Taste', icon: Sparkles },
    { href: '#ingredients', label: 'Signals', icon: ShoppingBasket },
    { href: '#choose', label: 'Choose', icon: UtensilsCrossed },
    { href: '#order', label: 'Buy', icon: MapPin },
    { href: '#cook', label: 'Craft', icon: ChefHat },
    { href: '#questions', label: 'Questions', icon: Leaf },
  ],
  taste: {
    intro: 'The floss is intensely sweet but airy, often with a warm caramel aroma. A faintly salty, wheat-savoury wrapper stops the bite feeling like plain sugar. Pandan, sesame, milk, coconut or grain additions can move the aroma without changing the wrap-and-floss identity.',
    texture: 'The roti should be thin, soft and lightly chewy rather than crisp or oily. Properly separated sugar threads feel silky and melt quickly on the tongue. Too much filling makes the roll difficult; humidity can soften and clump the floss while exposed sheets dry.',
    finish: 'A small roll gives the best contrast: tender wrapper first, then dissolving sugar. Plain roti leaves a clean caramel finish; pandan can add a gentle green fragrance and sesame a nutty edge.',
    scores: [{ label: 'Sweet', value: 5 }, { label: 'Lightly salty', value: 2 }, { label: 'Soft-chewy', value: 4 }, { label: 'Melt-away', value: 5 }],
  },
  ingredients: [
    { name: 'Wheat roti sheet', role: 'The documented wrapper uses wheat flour with water, salt and oil, sometimes alongside tapioca flour. It is naturally thin and supple but not gluten-free.' },
    { name: 'Pulled sugar threads', role: 'Cooked sugar is stretched repeatedly into long fine filaments. Flour and oil can enter production; this is a hand-pulled silk structure rather than aerated fairground cotton candy.' },
    { name: 'Pandan', role: 'Can tint and perfume the roti pale green. Colour alone does not prove real pandan or identify dairy, gluten, sesame or food-colour ingredients.' },
    { name: 'Sesame · grains', role: 'Some vendors top or blend sesame and grains into the wrapper. Sesame is a direct allergen and can remain on shared pans, trays and dough tools.' },
    { name: 'Milk · coconut milk', role: 'Documented vendor variations can enrich dough or flavour. Milk is an allergen; coconut is different and does not by itself prove vegan or dairy-free handling.' },
    { name: 'Oil · hot pan', role: 'Oil supports both dough and sugar craft in documented methods. Type, reuse and shared equipment vary; a soft wrapper should not be assumed allergen-free because it looks plain.' },
    { name: 'Hand-pulled technique', role: 'The cooled sugar mass is stretched into increasingly fine strands through skill, strength and repetition. It is craft evidence—not an invitation to handle dangerously hot syrup without a complete tested method.' },
    { name: 'Separate packing', role: 'Roti and floss have different moisture needs. Good turnover and protected components matter; add the floss only when eating so the threads stay separate and the sheet stays flexible.' },
  ],
  allergenCopy: 'Wheat/gluten is intrinsic to the documented roti. Milk and sesame can be direct additions; soy, peanut, tree nuts, egg and other allergens may enter through vendor variations, oil, toppings or shared pans and trays. Tapioca in the dough does not cancel wheat. Ask for the wrapper and floss ingredients plus shared-equipment handling before buying.',
  vegetarianCopy: 'Many familiar Roti Sai Mai versions may fit a vegetarian diet after the fat, milk, egg, colour and shared equipment are checked. Vegan status is not automatic: ask about dairy, egg, honey and processing aids in both components. The sweet’s Muslim-community heritage is culturally important but does not certify every vendor as halal; look for current certification or sufficient ingredient and handling evidence.',
  formats: [
    { title: 'Classic plain roti', bestFor: 'Tasting the defining lightly salty white wrapper against caramel-aromatic spun sugar with the fewest added flavour cues.', tradeOff: 'Still contains documented wheat and may share milk, sesame, soy, peanut or egg equipment. Check oil, dough and floss rather than assuming “plain” means allergen-free.' },
    { title: 'Pandan or sesame variation', bestFor: 'Adding gentle pandan fragrance or a sesame-grain edge while keeping the same roll-and-floss ritual.', tradeOff: 'Green colour can come from different ingredients; sesame is an allergen and milk or coconut may enter the dough. Confirm the exact batch.' },
    { title: 'Separately verified dietary set', bestFor: 'A vendor able to explain flour, fat, milk, egg, sesame, colour and halal handling before packaging.', tradeOff: 'A wheat-free or vegan-safe version requires more than picking a different floss colour. Dedicated dough and clean equipment may not exist at a street stall.' },
  ],
  orderSteps: [
    { title: 'Check active, fresh components', text: 'Ask for Roti Sai Mai / โรตีสายไหม and look for soft flexible sheets plus dry, separated sugar threads. Choose plain or pandan deliberately and confirm whether sesame or grains are present.' },
    { title: 'Map wrapper, floss and handling', text: 'Ask about wheat, tapioca, milk or coconut milk, egg, sesame, oil, colours and shared pans/trays. For halal needs, check current certification or actual ingredient and preparation evidence rather than relying only on heritage.' },
    { title: 'Portion, roll and protect', text: 'Place a small tuft of floss on one sheet, fold the sides or roll, and eat in a few bites. Keep unused components closed and follow the vendor’s storage advice; humidity and time quickly change the texture.' },
  ],
  cooking: {
    title: 'Spread thin. Cook sugar. Pull safely. Keep dry.',
    intro: 'Roti Sai Mai is specialist craft with two separate processes. A complete tested method must define dough hydration, pan control, sugar stage, cooling and safe pulling. Travellers can understand the technique without improvising molten-sugar work.',
    steps: ['Choose one complete tested Roti Sai Mai method from a qualified source. Map wheat, tapioca, milk, coconut, sesame, oils and colours before mixing, and keep allergen batches and tools clearly separated.', 'Develop the wrapper dough exactly as directed, then spread an extremely thin film on a controlled hot pan. Lift each soft sheet cleanly and stack only as the tested method permits so steam does not make it wet.', 'Cook the sugar mixture to the specified stage using proper equipment, ventilation and burn protection. Hot sugar causes severe burns and must never be touched or guessed by colour alone.', 'Cool the sugar mass exactly to the safe working state in the complete method. Stretch and fold with trained technique until many fine, long threads form; discard contaminated or incorrectly crystallised batches.', 'Keep finished floss dry and separated from warm or damp roti. Protect both from dust, bare-hand contamination and unlabelled colours or toppings during packing.', 'At service, place a small floss bundle on one roti and roll immediately. Follow the maker’s current storage instructions and favour active turnover; this owner deliberately publishes no universal shelf life.'],
    boundary: 'This section is cultural and safety context, not a standalone home recipe. Molten sugar can cause serious burns, and a correct pulling stage depends on a complete tested method and skill. Wheat, milk and sesame remain allergens after cooking; Muslim heritage does not replace present-day halal verification. Recipe schema is deliberately omitted.',
  },
  affiliates: [
    { href: '/go/simple-thai-food-cookbook/', title: 'Simple Thai Food', text: 'A well-edited Thai cookbook can provide broader dessert and ingredient context, but do not assume this exact specialist sweet is included. Check the current contents, edition, format, seller, price and delivery before buying.' },
  ],
  classHref: withSubId(KLOOK_GENERIC, 'en-roti-sai-mai-ayutthaya-food-day-trip'),
  classCopy: 'A suitable Ayutthaya day trip or food experience can connect temple history with the city’s Muslim-community dessert tradition. Klook results are broad: confirm a Roti Sai Mai stop is explicitly included in the current itinerary and check pickup, guide language, accessibility, food inclusion, dietary handling and cancellation terms before booking.',
  classSignals: [
    { title: 'Ayutthaya context', text: 'Connect the dessert to the old capital’s Muslim community and multicultural trade history without turning one origin account into uncontested fact.' },
    { title: 'Two crafts', text: 'See the difference between a paper-thin soft wrapper and long pulled-sugar filaments rather than calling both “cotton candy”.' },
    { title: 'Fresh assembly', text: 'Learn why vendors protect the components separately and why a small roll preserves the sweet–salty and soft–melt contrast.' },
  ],
  faqs: [
    { question: 'What is Roti Sai Mai made of?', answer: 'It has two parts: a paper-thin roti commonly made with wheat flour, water, salt and oil, sometimes tapioca flour; and long pulled-sugar threads made from a cooked sugar mixture that can also use flour and oil. Pandan, milk, coconut milk, sesame, grains and colours vary by vendor.' },
    { question: 'What is Roti Sai Mai in English?', answer: 'It is often described as Ayutthaya cotton-candy roti or candy-floss roti. That translation helps, but the filling is characteristically stretched into long silk-like sugar threads rather than spun into one fluffy fairground cloud.' },
    { question: 'How do you eat Roti Sai Mai?', answer: 'Take one thin roti, place a small bundle of sugar threads near the centre, fold the sides or roll it into a slim parcel and eat it straight away. Overfilling makes the sheet split and upsets the lightly salty wrapper–sweet floss balance.' },
    { question: 'What does Roti Sai Mai taste like?', answer: 'The floss is intensely sweet, airy and often caramel-aromatic; the wrapper is soft, lightly chewy and faintly salty. Plain sheets keep the contrast clean, while pandan, sesame, milk, coconut or grains can add fragrance and richness.' },
    { question: 'What is the history of Roti Sai Mai?', answer: 'Official Thai tourism sources describe Islamic influence and recipes passed through Ayutthaya’s Muslim community. Michelin reports an assumed Indian-subcontinent connection and a local popularisation account involving Bang Pia. These source-attributed strands are more responsible than claiming one uncontested inventor.' },
    { question: 'What food is Ayutthaya known for?', answer: 'Roti Sai Mai is one of Ayutthaya’s signature edible souvenirs, alongside well-known boat-noodle and river-fish or prawn traditions. It is widely associated with the city’s roads and markets, but individual vendors, hours and availability can change.' },
    { question: 'Is Roti Sai Mai vegetarian?', answer: 'Many versions may be vegetarian after the oil, milk, egg, colour and shared equipment are confirmed. Do not infer the answer from plain appearance. Sesame, wheat and milk remain relevant allergens even when no meat ingredient is used.' },
    { question: 'Is Roti Sai Mai vegan?', answer: 'Not automatically. The simplest wheat, water, oil, salt and sugar expression can be plant-based, but vendors may use milk, egg, honey, different fats or processing aids. Ask about both wrapper and floss plus the shared pan and trays.' },
    { question: 'Is Roti Sai Mai gluten-free?', answer: 'No standard Roti Sai Mai should be treated as gluten-free because the documented wrapper contains wheat flour. Tapioca may be present too, but it does not remove wheat. A safe alternative would need verified gluten-free ingredients and dedicated preparation.' },
    { question: 'How long can I keep Roti Sai Mai?', answer: 'There is no reliable universal shelf life across wrappers, floss, humidity and packaging. Follow the maker’s dated instructions, keep the two components protected as sold and eat them promptly for best texture. Discard anything damp, contaminated, mouldy or otherwise questionable.' },
  ],
  related: [
    { title: 'Ayutthaya travel guide', description: 'Build temples, transport, river context and a responsible Roti Sai Mai stop into one useful old-capital day.', href: '/city/ayutthaya/', image: '/images/redesign/ayutthaya-destination-hero.webp' },
    { title: 'Ayutthaya attractions', description: 'Choose a realistic heritage circuit before adding markets and food stops around the historical island.', href: '/city/ayutthaya/attractions/', image: '/images/redesign/experience-ayutthaya.webp' },
    { title: 'Mango Sticky Rice', description: 'Compare another famous Thai sweet whose rice, coconut, mango and allergen map are completely different.', href: '/food/mango-sticky-rice/', image: '/images/redesign/mango-sticky-rice-dish-hero.webp' },
  ],
  sources: [
    { title: 'Roti Sai Mai: The Sweet Treat of Ayutthaya', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Articles/roti-sai-mai-sweet-treat-of-ayutthaya', note: 'Complete official Thai-tourism parse used for Ayutthaya context, Islamic influence, intergenerational Muslim-community tradition, paper-thin lightly salty roti, spun sugar, plain/pandan wrappers and optional sesame. Vendor superlatives were excluded.' },
    { title: 'Roti Sai Mai Street in Ayutthaya', creator: 'Thailand.go.th', url: 'https://thailand.go.th/visit-thailand-detail/----46', note: 'Complete current Thai-government parse used for local identity, Muslim-community heritage, delicate dough, spun-sugar sweetness and broad street clusters. Promotional absolutes were excluded.' },
    { title: 'What is Ayutthaya’s Roti Sai Mai?', creator: 'MICHELIN Guide Thailand', url: 'https://guide.michelin.com/th/en/article/features/what-is-ayutthaya-s-roti-sai-mai-and-where-to-find-them', note: 'Current live feature used for wrapper and floss technique, wheat/tapioca/oil/salt, optional milk/coconut/sesame/grains, texture and a clearly attributed origin account. DFS returned zero markdown; exact vendor rankings and permanent availability were excluded.' },
    { title: 'A guide to Ayutthaya', creator: 'MICHELIN Guide Thailand', url: 'https://guide.michelin.com/th/en/article/travel/a-guide-to-ayutthaya-michelin-guide', note: 'Current city context used only for linking the signature sweet to an Ayutthaya heritage and market itinerary, not for a permanent vendor guarantee.' },
    { title: 'Allergen guidance for food businesses', creator: 'UK Food Standards Agency', url: 'https://www.food.gov.uk/business-guidance/allergen-guidance-for-food-businesses', note: 'Current primary guidance used for wheat/gluten, milk, sesame and cross-contact boundaries rather than automatic vegetarian, vegan or allergen-safe status.' },
  ],
  methodDescription: 'Updated 28 July 2026 after two independent DataForSEO clusters with 25 raw keyword records and 35 competitor domains, ten current UK-English SERPs with 83 organic results, 56 People Also Ask appearances and 30 case-normalised unique questions, two complete official Thai-source DFS parses, one current zero-markdown Michelin feature capture, current primary FSA allergen guidance, plus exact owner ranking and backlink checks. DFS returned UK volume 110 and KD 0 for the exact head term plus volume 10 for multiple Ayutthaya, ingredient and purchase variants; the owner has zero ranking terms and no reportable backlink summary signal. Generic Thai/Indian roti, ordinary cotton candy, recipe-only, health, calorie, celebrity, fixed-price, automatic dietary, permanent-vendor, universal shelf-life and uncontested single-inventor claims were excluded.',
};

export function RotiSaiMaiGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
