import { ChefHat, Leaf, MapPin, ShoppingBasket, Sparkles, Soup, UtensilsCrossed } from 'lucide-react';
import { KLOOK_GENERIC, withSubId } from '../../lib/affiliates';
import { DishEditorialTemplate, type DishEditorialData } from './DishEditorialTemplate';

const data: DishEditorialData = {
  title: 'Tom Yum Noodles: Taste, Ingredients & How to Order',
  description: 'Understand Thai Tom Yum Noodles: noodle choices, soup or dry service, taste, toppings, allergens, dietary checks, instant packets and how to order.',
  canonical: 'https://go2-thailand.com/food/tom-yum-noodles/',
  updatedAt: '28 July 2026',
  name: 'Tom Yum Noodles',
  thaiName: 'ก๋วยเตี๋ยวต้มยำ · Guay Tiew Tom Yum',
  heroImage: '/images/redesign/tom-yum-noodles-thai-street-food-hero.webp',
  heroAlt: 'Thai Tom Yum Noodles with small rice noodles, fully cooked minced pork and meatballs, peanuts, roasted chilli, bean sprouts, herbs and lime in a noodle-shop bowl',
  heroEyebrow: 'Noodle-stall seasoning · soup or dry · choose your noodle',
  lead: 'In a Thai noodle shop, “tom yum” can describe how a bowl is seasoned—not simply the famous lemongrass soup. Lime, roasted chilli, peanuts and savoury seasoning turn a selected noodle, broth and toppings into a bright hot–sour bowl. Choose the noodle, then decide soup or dry and the protein. Tom Yum Goong and packaged Mama or Koka noodles remain useful but different owners.',
  quickFacts: [
    { label: 'Identity', value: 'Thai noodle-stall bowl · seasoned per order', icon: Soup },
    { label: 'Decision', value: 'With broth or dry/soupless', icon: UtensilsCrossed },
    { label: 'Balance', value: 'Sour · hot · salty · sweet', icon: Sparkles },
    { label: 'Check', value: 'Peanut · fish · soy · wheat · stock', icon: ShoppingBasket },
  ],
  navItems: [
    { href: '#taste', label: 'Taste', icon: Sparkles },
    { href: '#ingredients', label: 'Signals', icon: ShoppingBasket },
    { href: '#choose', label: 'Choose', icon: Soup },
    { href: '#order', label: 'Order', icon: MapPin },
    { href: '#cook', label: 'Cook', icon: ChefHat },
    { href: '#questions', label: 'Questions', icon: Leaf },
  ],
  taste: {
    intro: 'A familiar bowl is assertively sour and chilli-hot, backed by salty-savoury broth or sauce and enough sugar to round the edges. Roasted chilli can add smoke; peanuts, fried garlic and protein add depth. The useful signature is four-way balance, not one compulsory broth colour or heat level.',
    texture: 'Noodle texture follows your choice: sen lek is fine and springy, sen yai broad and soft, sen mee delicate, woon sen slippery and bamee firmer with egg-wheat bite. Minced pork, meatballs, sprouts, peanuts and fried garlic add soft, bouncy, crisp and crunchy contrasts.',
    finish: 'Fresh lime gives a clean, mouth-watering finish while chilli heat can build. A dry bowl tastes more concentrated because the seasoning coats the noodles; broth spreads the same balance into a lighter, spoonable format.',
    scores: [{ label: 'Sour', value: 5 }, { label: 'Chilli heat', value: 4 }, { label: 'Salty-savoury', value: 4 }, { label: 'Sweet balance', value: 3 }],
  },
  ingredients: [
    { name: 'Noodle choice', role: 'Small rice noodles are familiar, but sen mee, sen yai, glass noodles, wheat-and-egg bamee or instant Mama noodles may be offered. Texture and allergen checks change with the choice.' },
    { name: 'Base broth · dry sauce', role: 'Soup versions start with the shop’s clear or seasoned stock; dry versions use a smaller quantity of cooking liquid and seasoning. Pork, chicken, seafood, soy and stock powder can be hidden.' },
    { name: 'Fresh lime', role: 'Lime juice supplies the direct sour edge associated with noodle-stall tom-yum seasoning. Bottled souring agents or other acids can appear, so taste and ingredients remain vendor-specific.' },
    { name: 'Roasted chilli', role: 'Roasted chilli flakes or chilli oil add heat, colour and a faint smoky note. The cook can often adjust them per bowl, but a premixed base may already contain chilli.' },
    { name: 'Ground peanuts', role: 'Coarsely ground roasted peanuts add body and crunch and are a common signal of the style. Peanut is a direct allergen and can remain in scoops, condiment jars and prep areas.' },
    { name: 'Pork · balls · seafood', role: 'Ground pork, sliced pork, pork balls and fish balls are familiar; chicken, prawns or mixed seafood also appear. Each changes meat, crustacean, mollusc, fish and halal checks.' },
    { name: 'Fish · soy seasoning', role: 'Fish sauce, soy sauce, sugar, bouillon and garlic oil can tune the four-way balance. Wheat/gluten, soy, fish, crustacean and additive information cannot be read from broth colour.' },
    { name: 'Sprouts · herbs · garlic', role: 'Bean sprouts, spring onion, coriander and fried garlic lift the finished bowl. Fresh garnishes need clean handling; fried garlic oil and shared toppings can introduce further allergens.' },
  ],
  allergenCopy: 'Peanut is a prominent direct check. Fish sauce, dried shrimp or seafood can add fish or crustacean; soy sauce can add soy and wheat; bamee commonly contains wheat and egg. Meatballs, fish balls, bouillon, chilli paste, garlic oil and shared noodle strainers may add further exposure. Rice noodles alone do not make the complete bowl gluten-free. Ask about stock, seasoning, noodle packet, toppings and shared equipment.',
  vegetarianCopy: 'Tom Yum Noodles are not vegetarian or vegan by default. A bowl without visible meat can still use pork or chicken stock, fish sauce, dried shrimp, fish balls or meat seasoning. A suitable version needs verified plant-based broth and seasoning, the intended noodle, separate toppings and clean tools. Halal status depends on stock, pork handling, processed balls, sauces and shared pots—not on the word “seafood” or the absence of visible pork alone.',
  formats: [
    { title: 'With soup · nam', bestFor: 'A spoonable bowl where the hot–sour seasoning opens through the shop’s broth and the selected noodles stay loose.', tradeOff: 'Ask which stock is used and whether lime, chilli, sugar, peanut, pork and fish sauce are added per bowl. “Clear” does not mean allergen-free or vegetarian.' },
    { title: 'Dry · haeng', bestFor: 'A more concentrated, warm tossed-noodle experience with the same toppings and no full bowl of broth.', tradeOff: '“Dry” means soupless, not unseasoned. Fish sauce, soy, stock liquid, garlic oil, chilli and peanuts can still be integral; request broth on the side only if offered.' },
    { title: 'Packaged instant', bestFor: 'A convenient pantry or travel product when the current packet’s language, ingredients and preparation suit you.', tradeOff: 'Mama, Koka, Nissin and other products are separate formulations. Read the exact local label for wheat, seafood, milk, soy, peanut, heat, portion and cooking instructions; do not transfer fresh-bowl claims to a packet.' },
  ],
  orderSteps: [
    { title: 'Choose the noodle', text: 'Pick sen lek, sen mee, sen yai, woon sen, bamee or an available Mama option by texture. When wheat, egg or cross-contact matters, verify the packet and shared strainer rather than judging by colour.' },
    { title: 'Choose soup, dry and protein', text: 'Ask for nam (with broth) or haeng (dry/soupless), then select pork, balls, chicken, seafood or a genuinely verified meat-free setup. Confirm the base stock before relying on visible toppings.' },
    { title: 'Set heat and verify the bowl', text: 'Request less chilli if needed, but recognise that a premix may limit adjustment. Check lime, peanut, fish sauce, soy, dried shrimp, bouillon and shared tools, then taste before adding table chilli, vinegar, sugar or fish sauce.' },
  ],
  cooking: {
    title: 'Build the base. Season each bowl. Serve at once.',
    intro: 'Fresh Guay Tiew Tom Yum works as a component system: safe stock and proteins, correctly prepared noodles, one balanced seasoning mixture per serving and clean garnishes meet only at service. Soup and dry versions share signals but need different liquid control.',
    steps: ['Choose one complete tested Tom Yum Noodle method and decide noodle, stock, protein, soup or dry format, toppings and every dietary substitution before shopping.', 'Prepare stock and raw protein with separate tools and follow the tested method’s time-and-temperature guidance. Keep raw meat and seafood away from herbs, sprouts, condiments and serving bowls.', 'Roast or prepare peanuts, chilli, garlic oil and other toppings as directed. Label allergens and prevent shared spoons or grinders from carrying peanut, fish, crustacean, soy or wheat into a separate batch.', 'Soak, boil or blanch the selected noodle according to its own tested instructions. Different rice, glass, egg and instant noodles do not share one reliable cooking time.', 'Mix lime, chilli, savoury seasoning and sweetness per bowl using the tested method. Add the specified hot stock for nam, or only the directed cooking liquid and oil for haeng; do not guess a shelf-stable sauce formula.', 'Add fully cooked protein and clean garnishes, serve piping hot or immediately for a dry bowl, and follow the complete recipe or packet for cooling, storage and reheating. Discard questionable food rather than relying on smell alone.'],
    boundary: 'This traveller owner explains the preparation logic but deliberately omits invented quantities, safe temperatures and storage times. Stock volume, meat or seafood, noodle type, packet formula and service style all alter the method. Follow one complete tested recipe, current local food-safety guidance and the exact instant-packet label; Recipe schema is absent.',
  },
  affiliates: [
    { href: '/go/simple-thai-food-cookbook/', title: 'Simple Thai Food', text: 'A tested Thai cookbook can explain stock, noodle and seasoning technique beyond this traveller guide. Check whether Tom Yum Noodles are in the current contents, then compare edition, format, seller, price and delivery.' },
    { href: '/go/thai-granite-mortar-eight-inch/', title: 'Eight-inch granite mortar', text: 'Useful when a complete method asks you to crush roasted chilli, garlic or peanuts. Check the usable interior, weight, worktop protection and allergen cleaning; a small grinder may suit your batch better.' },
  ],
  classHref: withSubId(KLOOK_GENERIC, 'en-tom-yum-noodles-thai-noodle-cooking-class'),
  classCopy: 'A suitable Thai cooking class can reveal the difference between a noodle-shop tom-yum seasoning and classic herb-led Tom Yum Goong, while teaching noodle timing and per-bowl balance. Klook results are broad: confirm that Guay Tiew Tom Yum—not only soup or an instant-noodle dish—is on the current menu and check language, participation, dietary handling and cancellation terms.',
  classSignals: [
    { title: 'Seasoning mode', text: 'See how lime, roasted chilli, peanut and savoury seasoning change an ordinary noodle base without automatically adding classic tom-yum herbs.' },
    { title: 'Noodle timing', text: 'Compare the soak or blanch required by the actual rice, glass, egg or instant noodle instead of treating every strand alike.' },
    { title: 'Soup versus dry', text: 'Learn how the same family becomes a broth bowl or a concentrated tossed serving through liquid and assembly control.' },
  ],
  faqs: [
    { question: 'What are Tom Yum Noodles?', answer: 'In a Thai noodle-shop context, Tom Yum Noodles are a selected noodle, broth or dry sauce and toppings seasoned toward a sour, spicy, salty and lightly sweet balance. Lime, roasted chilli and peanuts are familiar signals. Pork, balls, fish sauce, garlic and garnishes vary by shop.' },
    { question: 'What is in Tom Yum Noodles?', answer: 'A common bowl may include rice noodles, stock, lime juice, roasted chilli, sugar, fish sauce, peanuts, garlic oil, ground pork, meatballs or fish balls, bean sprouts and herbs. These are signals rather than a compulsory formula; ask the vendor about the actual broth, seasoning and toppings.' },
    { question: 'What do Tom Yum Noodles taste like?', answer: 'Expect a direct hot–sour balance with salty-savoury depth and enough sweetness to round the edges. Roasted chilli can taste smoky, peanuts nutty and fried garlic aromatic. A dry bowl is usually more concentrated, while broth spreads the flavour through each spoonful.' },
    { question: 'Are Tom Yum Noodles spicy?', answer: 'They are commonly chilli-hot, but heat varies by shop and can often be adjusted when the bowl is seasoned to order. Ask for less chilli before cooking and taste before adding table condiments. A premixed broth, paste or instant packet may be less flexible.' },
    { question: 'What is the difference between Tom Yum Noodles and Tom Yum soup?', answer: 'Tom Yum Noodles are a noodle-shop family in which tom yum can describe the sour-spicy seasoning added to a noodle base, with or without broth. Classic Tom Yum—especially Tom Yum Goong—is a soup owner commonly organised around aromatic herbs such as lemongrass, galangal and lime leaves, often with prawns. They overlap in flavour language but are not interchangeable dishes.' },
    { question: 'Are Tom Yum Noodles served as soup or dry?', answer: 'Both. Order nam for a bowl with broth or haeng for dry/soupless noodles tossed with concentrated seasoning and toppings. The dry version can still contain stock liquid, fish sauce, soy, oil, chilli and peanut; “dry” does not mean plain or allergen-free.' },
    { question: 'What noodles are used in Tom Yum Noodles?', answer: 'Small rice noodles such as sen lek are familiar, but shops may offer fine sen mee, broad sen yai, glass noodles, wheat-and-egg bamee or instant Mama noodles. Choose by texture and verify ingredients and shared strainers when wheat, egg or cross-contact matters.' },
    { question: 'Are Tom Yum Noodles gluten-free?', answer: 'Not automatically. Even with rice or glass noodles, soy sauce, bouillon, meatballs, fish balls, chilli paste and shared strainers may introduce wheat or cross-contact. Bamee and most familiar instant noodles usually contain wheat. Verify the complete bowl and preparation area.' },
    { question: 'Are Tom Yum Noodles vegetarian or vegan?', answer: 'Not by default. Pork or chicken stock, fish sauce, dried shrimp, minced pork and processed balls can remain hidden even when visible meat is removed. A suitable version needs verified plant-based broth, seasoning and toppings plus clean utensils; vegan diners should also check the noodle and processing aids.' },
    { question: 'Are Mama or Koka Tom Yum Noodles the same dish?', answer: 'They are packaged instant interpretations of tom-yum flavour, not a universal definition of the fresh Thai noodle-shop bowl. Ingredients, allergens, nutrition, heat and preparation vary by brand, recipe and country, so read the exact packet and follow its current instructions.' },
  ],
  related: [
    { title: 'Tom Yum Goong', description: 'Compare the separate prawn-soup owner, its aromatic herb structure and clear-versus-creamy decisions.', href: '/food/tom-yum-goong/', image: '/images/redesign/tom-yum-goong-hero.webp' },
    { title: 'Boat Noodles', description: 'Move to a darker Central Thai noodle family built around pork or beef, spice and optional blood.', href: '/food/boat-noodles/', image: '/images/redesign/boat-noodles-canal-bowl-hero.webp' },
    { title: 'Bangkok food guide', description: 'Put noodle shops, markets and focused street-food experiences into a realistic city route.', href: '/city/bangkok/food/', image: '/images/redesign/bangkok-food-yaowarat.webp' },
  ],
  sources: [
    { title: 'Soupless Tom Yum Noodles: Best Kept Secret of Thai Food', creator: 'Hot Thai Kitchen', url: 'https://hot-thai-kitchen.com/soupless-tom-yum-noodles/', note: 'Complete DFS parse used for the noodle-stall seasoning distinction, soup-or-dry choice, small rice noodles, lime, roasted chilli, peanut, proteins, toppings and per-bowl assembly. Recipe quantities and storage claims were excluded.' },
    { title: '10 Thai Noodle Soups Thai People Cannot Live Without', creator: 'Hot Thai Kitchen', url: 'https://hot-thai-kitchen.com/top-5-noodle-soups-in-thailand-pt-1/', note: 'Complete DFS parse used for Thai noodle-shop culture, noodle-ordering choices and the boundary between a clear noodle base, tom-yum seasoning and other noodle families.' },
    { title: 'Tom Yum Noodle Soup Recipe (Guay Tiew Tom Yum)', creator: 'Hungry in Thailand', url: 'https://hungryinthailand.com/tom-yum-noodle-soup/', note: 'Complete DFS parse used as an independent Thai-specialist expression of pork-bone broth, lime, chilli, fish sauce, peanuts, optional balls and the explicit absence of compulsory lemongrass and galangal.' },
    { title: 'Local food', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Experiences/Details/local-food/31', note: 'Complete official Thai-tourism parse used only for present-day local-food and street-stall context and its specific recognition of Tom Yam Noodles. Broad promotional wording was excluded.' },
    { title: 'Shrimp Noodles Ao Kae', creator: 'MICHELIN Guide', url: 'https://guide.michelin.com/en/phuket-region/phuket/restaurant/shrimp-noodles-ao-kae', note: 'Current live listing used narrowly as real Thai evidence for tom-yum noodles offered wet or dry. DFS returned zero markdown; price, permanent availability and subjective rankings were excluded.' },
    { title: 'Allergen guidance for food businesses', creator: 'UK Food Standards Agency', url: 'https://www.food.gov.uk/business-guidance/allergen-guidance-for-food-businesses', note: 'Current primary guidance used for peanut, fish, crustacean, soy, wheat, egg and cross-contact boundaries rather than automatic dietary claims.' },
  ],
  methodDescription: 'Updated 28 July 2026 after two independent DataForSEO clusters with 208 and 54 raw keyword records and 50 competitor domains, ten current UK-English SERPs with 68 organic results, 57 People Also Ask appearances and 45 case-normalised unique questions, four complete DFS source parses, two current zero-markdown Michelin restaurant captures, current primary FSA allergen and cooking guidance, plus exact owner ranking and backlink checks. DFS returned UK volume 1,000 and KD 0 for both the exact head term and Tom Yum chicken noodles; several soup-form variants returned volume 590 and KD 0. The owner has zero ranking terms and no reportable backlink summary signal. Classic Tom Yum Goong, Boat Noodles, other regional noodle families, packaged Mama/Koka/Nissin products, recipe-only, retailer, calorie and health intent remain independent. Fixed-price, universal heat, compulsory herb, automatic dietary, permanent-restaurant, shelf-life and one-formula claims were excluded; Recipe schema is deliberately absent.',
};

export function TomYumNoodlesGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
