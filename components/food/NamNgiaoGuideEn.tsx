import {
  ChefHat,
  Leaf,
  MapPin,
  ShoppingBasket,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { KLOOK_GENERIC, withSubId } from "../../lib/affiliates";
import {
  DishEditorialTemplate,
  type DishEditorialData,
} from "./DishEditorialTemplate";

const data: DishEditorialData = {
  title: "Nam Ngiao: Northern Thai Tomato Noodle Guide",
  description:
    "Understand Nam Ngiao: Northern Thai tomato-rich rice noodles, taste, blood and dok ngiao options, allergens, ordering, Khao Soi differences and safe cooking.",
  canonical: "https://go2-thailand.com/food/nam-ngiao/",
  updatedAt: "28 July 2026",
  name: "Nam Ngiao",
  thaiName: "น้ำเงี้ยว · Northern Thai tomato noodle broth",
  heroImage: "/images/redesign/nam-ngiao-northern-thai-noodles-hero.webp",
  heroAlt:
    "Northern Thai Nam Ngiao with round rice noodles, tomato-rich pork broth, dok ngiao, blood tofu and fresh accompaniments",
  heroEyebrow: "Northern Thai noodles · tomato, chilli and fermented depth",
  lead: "Nam Ngiao is the tomato-rich Northern Thai sauce or curry-like broth most often ladled over khanom jeen rice noodles. Pork, dried chilli and fermented soybean bring savoury depth; fresh vegetables, lime, pickles, fried garlic and pork rind create contrast. Cooked blood and dried dok ngiao cotton-tree flower core are familiar signals, but neither belongs in every bowl—so name the noodle service and ask what is in today’s broth.",
  quickFacts: [
    {
      label: "Identity",
      value: "Tomato broth · rice noodles",
      icon: UtensilsCrossed,
    },
    {
      label: "Region",
      value: "Northern Thailand · Tai Yai ties",
      icon: MapPin,
    },
    { label: "Texture", value: "Silky · tender · crisp sides", icon: Sparkles },
    {
      label: "Check",
      value: "Pork · blood · soy · shrimp",
      icon: ShoppingBasket,
    },
  ],
  navItems: [
    { href: "#taste", label: "Taste", icon: Sparkles },
    { href: "#ingredients", label: "Signals", icon: ShoppingBasket },
    { href: "#choose", label: "Choose", icon: UtensilsCrossed },
    { href: "#order", label: "Order", icon: MapPin },
    { href: "#cook", label: "Cook", icon: ChefHat },
    { href: "#questions", label: "Questions", icon: Leaf },
  ],
  taste: {
    intro:
      "Nam Ngiao should read as savoury and tomato-tangy before it reads as simply hot. Dried chilli and curry-paste aromatics bring warmth, while fermented soybean, shrimp paste, fish sauce or stock can deepen umami. The noodles soften the seasoning; lime, pickled greens and raw vegetables sharpen it again at the table.",
    texture:
      "Round khanom jeen noodles are soft and lightly chewy beneath a loose broth with tender meat and tomato. Cooked blood cubes, pork rib and fibrous dok ngiao alter the bite when included. Bean sprouts, cabbage, fried garlic and pork rind add fresh or crisp contrast.",
    finish:
      "Tomato acidity and lime can linger after the richer pork and fermented notes. Chilli level, paste, stock and toppings vary by cook. Unlike Khao Soi, coconut cream and a crisp noodle nest are not the defining structure.",
    scores: [
      { label: "Savoury umami", value: 5 },
      { label: "Tomato tang", value: 4 },
      { label: "Aromatic chilli", value: 4 },
      { label: "Chilli heat", value: 3 },
    ],
  },
  ingredients: [
    {
      name: "Rice-noodle service",
      role: "Round khanom jeen rice noodles are the familiar base. Chiang Rai also documents flat fresh rice noodles as guay tiew nam ngiao, so shape changes the service without changing the sauce owner.",
    },
    {
      name: "Tomato-rich broth",
      role: "Tomatoes provide colour, gentle acidity and body in a lighter broth rather than a coconut-creamy curry. Tomato type, ripeness, stock and sweetness vary.",
    },
    {
      name: "Pork · beef branch",
      role: "Pork rib and minced pork are common, while Tourism Thailand documents a current Chiang Rai choice of pork or beef. Stock, fat, offal and shared utensils still need a direct check.",
    },
    {
      name: "Blood · optional",
      role: "Cooked pork or chicken blood cubes and liquid blood are documented ways to add body and texture. A specialist version treats blood as optional, so ask rather than inferring it from the red broth.",
    },
    {
      name: "Dried chilli · aromatics",
      role: "Dried chilli, shallot, garlic, lemongrass, galangal, coriander stem, onion or turmeric appear across versions. The exact paste and heat are cook-specific.",
    },
    {
      name: "Fermented soybean",
      role: "Northern tua nao or another fermented-soybean product supplies savoury depth. Tao jiew, miso and bottled substitutes can introduce soy, wheat and different salt levels.",
    },
    {
      name: "Dok ngiao",
      role: "The dried inner flower core of the red cotton tree is iconic and textural, but one Northern-born specialist deliberately omits it. Presence is a variation, not an authenticity test.",
    },
    {
      name: "Fresh · sour · crisp sides",
      role: "Bean sprouts, cabbage, pickled mustard greens, herbs, lime, fried garlic, chilli flakes and pork or buffalo rind may complete the bowl. Toppings and shared tools change allergens and heat.",
    },
  ],
  allergenCopy:
    "Fermented soybean adds soy and may add wheat; shrimp paste adds crustacean and fish sauce adds fish. Stock, curry paste, fried garlic, pickles, chilli condiment and shared noodle water can add further allergens or cross-contact. Rice noodles do not make the complete bowl automatically gluten-free—check every seasoning, paste, stock, garnish and utensil.",
  vegetarianCopy:
    "Classic Nam Ngiao is not vegetarian or vegan when it uses pork or beef, meat stock, blood, shrimp paste or fish sauce. A meatless red noodle soup is an adaptation and needs a separately identified broth and paste. The dish is not automatically halal: verify meat source, blood, stock, shrimp/fish seasoning, alcohol-containing products and shared preparation with current accountable evidence.",
  formats: [
    {
      title: "Khanom jeen bowl",
      bestFor:
        "The classic contrast between round soft rice noodles, loose tomato-rich broth and a personalised set of vegetables, lime, pickles and crisp sides.",
      tradeOff:
        "Confirm pork or beef, stock, blood, shrimp paste, fish sauce, fermented-soybean product, noodle ingredients and which toppings are already included.",
    },
    {
      title: "Chiang Rai flat noodles",
      bestFor:
        "Trying the documented guay tiew nam ngiao service, where the same named sauce family meets flatter fresh rice noodles and a different bite.",
      tradeOff:
        "Use the full name so you receive the intended noodle. Fresh-noodle ingredients, shared water, meat choice and garnish can differ from the khanom jeen counter.",
    },
    {
      title: "Toppings on your terms",
      bestFor:
        "Controlling sourness, crunch and chilli by keeping lime, vegetables, pickles, fried garlic, chilli flakes and pork rind beside the bowl.",
      tradeOff:
        "Ask before blood, dok ngiao, pork rind or chilli is added. Shared garnish spoons and frying oil still matter for allergens, dietary rules and halal handling.",
    },
  ],
  orderSteps: [
    {
      title: "Name noodle and sauce",
      text: "Ask for khanom jeen nam ngiao / ขนมจีนน้ำเงี้ยว, or guay tiew nam ngiao when you intentionally want the Chiang Rai flat-noodle variation. Do not order only “khanom jeen” because many different sauces share those noodles.",
    },
    {
      title: "Audit the broth",
      text: "Confirm pork or beef, stock, blood, shrimp paste, fish sauce, fermented soybean, wheat-containing seasoning and chilli. Ask whether dok ngiao is present if its fibrous texture matters to you.",
    },
    {
      title: "Build the finish",
      text: "Add lime, vegetables, pickles, fried garlic, rind and chilli gradually. Taste broth and noodles together first: rice noodles soften salt and heat, while sour and crisp sides change the final balance.",
    },
  ],
  cooking: {
    title: "Build the broth. Control the meat. Finish noodles separately.",
    intro:
      "A reliable Nam Ngiao method treats paste, stock, meat and noodles as separate safety decisions. Use one complete tested formula, keep raw meat away from ready-to-eat toppings and do not copy isolated times from an editorial guide.",
    steps: [
      "Choose one complete tested Nam Ngiao method. Decide noodle type, meat, stock, blood option, tomato, curry paste, fermented soybean, dok ngiao and every topping before substitutions.",
      "Check paste, stock, soybean seasoning, shrimp paste, fish sauce, pickles and fried garnish for allergens and halal boundaries. Soak or prepare dok ngiao only as the tested method directs.",
      "Keep raw pork, beef, blood and their utensils separate from cooked noodles, lime, herbs, vegetables, pickles and serving bowls. Wash hands and sanitise boards, knives and work surfaces.",
      "Cook paste and meat by the complete method, then build the tomato broth. Maintain the tested sequence so minced meat breaks up safely and bone-in meat or blood reaches a safe endpoint.",
      "Prepare rice noodles separately according to the selected product or tested fresh-noodle method. Prevent overcooking, drain with clean tools and do not use contaminated water for garnish.",
      "Ladle hot broth over the noodles and serve toppings separately. Follow current food-safety guidance and the complete method for cooling, storage and reheating leftovers.",
    ],
    boundary:
      "Meat cut, bone, blood product, stock, batch size, noodle type and cooling method change the endpoint. Use one complete tested method plus current food-safety guidance. This owner deliberately gives no universal cook time, temperature, storage period or Recipe schema.",
  },
  affiliates: [
    {
      href: "/go/simple-thai-food-cookbook/",
      title: "Simple Thai Food",
      text: "A tested Thai cookbook can supply complete paste, broth, meat and noodle quantities that this traveller owner should not invent. Check whether Nam Ngiao or a comparable Northern noodle method is in the current contents, then compare edition, format, seller, price and delivery.",
    },
    {
      href: "/go/thai-granite-mortar-eight-inch/",
      title: "Eight-inch granite mortar",
      text: "Useful only when a complete method asks you to pound dried chilli and aromatics into paste. Check usable interior, weight, worktop protection and cleaning for shrimp, soy and raw-meat cross-contact; a processor may suit the tested method better.",
    },
  ],
  classHref: withSubId(
    KLOOK_GENERIC,
    "en-nam-ngiao-northern-thai-noodle-class",
  ),
  classCopy:
    "A relevant Chiang Mai or Chiang Rai cooking class or food tour can show how Nam Ngiao paste, tomato broth, noodle choice and side dishes fit together. Klook results are broad: confirm the current menu or stops include Nam Ngiao and check meat, blood, allergens, hands-on participation, language, transport and cancellation terms.",
  classSignals: [
    {
      title: "Paste architecture",
      text: "See which dried chillies, aromatics, fermented soybean and optional shrimp or fish seasoning one cook uses rather than assuming one universal paste.",
    },
    {
      title: "Broth and noodle",
      text: "Separate the tomato broth from its khanom jeen or Chiang Rai flat-noodle service and understand why coconut-rich Khao Soi is a different owner.",
    },
    {
      title: "Northern table",
      text: "Learn how lime, vegetables, pickles, fried garlic, rind and chilli let the diner control freshness, sourness, crunch and heat.",
    },
  ],
  faqs: [
    {
      question: "What is Nam Ngiao?",
      answer:
        "Nam Ngiao is a Northern Thai tomato-rich sauce or curry-like broth commonly made with pork, dried chilli and fermented soybean. It is usually ladled over khanom jeen rice noodles and served with fresh, sour and crisp accompaniments.",
    },
    {
      question: "What is Khanom Jeen Nam Ngiao?",
      answer:
        "Khanom jeen names the round rice noodles and Nam Ngiao names the Northern tomato-rich broth or sauce served over them. The full name separates this bowl from khanom jeen with Nam Ya, green curry or another regional sauce.",
    },
    {
      question: "Where does Nam Ngiao come from?",
      answer:
        "Current Thai sources identify it with Northern Thailand and particularly Tai Yai or Shan food traditions. Regional exchange is clearer than one settled inventor or a simple claim of exclusive ownership, so the page does not assign a single origin story.",
    },
    {
      question: "What does Nam Ngiao taste like?",
      answer:
        "Expect savoury fermented depth, tomato tang, dried-chilli warmth and a lighter broth than coconut-rich Northern curry noodles. Pork or beef, stock, paste, blood, lime, pickles and toppings can move richness, salt, sourness and heat.",
    },
    {
      question: "What meat is typically in Nam Ngiao?",
      answer:
        "Pork rib and minced pork are common, while Tourism Thailand documents both pork and beef Nam Ngiao in Chiang Rai. Meat cut, stock, offal and blood vary, so ask the vendor rather than treating pork as the only possible answer.",
    },
    {
      question: "Does Nam Ngiao contain blood?",
      answer:
        "Sometimes, not always. Cooked pork or chicken blood cubes and liquid blood are documented additions, but a specialist recipe explicitly treats blood as optional. Confirm the current broth because colour alone cannot answer.",
    },
    {
      question: "Is Nam Ngiao spicy?",
      answer:
        "It commonly contains dried chilli and can be warm or hot, but the chilli type, quantity and table condiment vary. Rice noodles soften the broth’s intensity; ask about paste and added chilli, then season gradually.",
    },
    {
      question: "Is Nam Ngiao gluten-free?",
      answer:
        "Not automatically. Rice noodles may be gluten-free, but fermented soybean products, soy seasoning, stock, curry paste, fried toppings and shared noodle water can introduce wheat or cross-contact. Check the complete bowl.",
    },
    {
      question: "What is the difference between Nam Ngiao and Khao Soi?",
      answer:
        "Nam Ngiao is a tomato-rich Northern sauce commonly served with rice noodles and fermented-soybean depth. Khao Soi has a distinct curry-noodle architecture commonly involving coconut-rich broth, wheat-and-egg noodles and crisp noodles. They are separate Northern dishes.",
    },
    {
      question: "How do you eat Nam Ngiao?",
      answer:
        "Ladle the hot broth over rice noodles, taste them together, then add small amounts of lime, vegetables, pickles, fried garlic, rind and chilli. Ask about meat, blood, dok ngiao and hidden seasonings before garnish is mixed in.",
    },
  ],
  related: [
    {
      title: "Khao Soi guide",
      description:
        "Compare Northern Thailand’s coconut-rich curry noodle system with Nam Ngiao’s tomato and rice-noodle structure.",
      href: "/blog/khao-soi-chiang-mai-guide/",
      image: "/images/redesign/khao-soi-chiang-mai-hero.webp",
    },
    {
      title: "Chiang Rai food guide",
      description:
        "Plan a Northern food route around markets, Nam Ngiao, Khao Soi, coffee and useful vendor checks.",
      href: "/city/chiang-rai/food/",
      image: "/images/redesign/chiang-rai-food-coffee.webp",
    },
    {
      title: "Chiang Mai food guide",
      description:
        "Go beyond one famous bowl with Nam Ngiao, Sai Ua, chilli dips, markets and cooking experiences.",
      href: "/city/chiang-mai/food/",
      image: "/images/cities/chiang-mai/redesign/chiang-mai-food-khao-soi.webp",
    },
  ],
  sources: [
    {
      title: "Thai Pork & Tomato Noodles – Kanom Jeen Nam Ngiew",
      creator: "Hot Thai Kitchen",
      url: "https://hot-thai-kitchen.com/nam-ngiew/",
      note: "Complete DFS parse used for the sauce/noodle distinction, Chiang Rai flat-noodle variation, pork and tomato structure, optional blood, fermented soybean, dok ngiao and toppings. Quantities, fixed timings, storage and health claims were excluded.",
    },
    {
      title: "Khanom Chin: Thailand’s Hidden Noodle Gem",
      creator: "Thailand Foundation",
      url: "https://thailandfoundation.or.th/khanom-chin-thailands-hidden-noodle-gem/",
      note: "Complete DFS parse used for the khanom chin system, Northern pork-and-tomato identity, Tai Yai context, dok ngiao, fermented soybean, dried chilli, blood, herbs and pork-rind service. Superlatives were excluded.",
    },
    {
      title: "Getting to Know Chiang Rai",
      creator: "Tourism Authority of Thailand",
      url: "https://www.tourismthailand.org/Articles/https-www-tourismthailand-org-articles-getting-to-know-chiang-rai",
      note: "Complete DFS parse used for Northern and Chiang Rai context, recipe variability, paste signals, pork or beef choice, bean sprouts, herbs and rind accompaniments. Venue permanence, hours and superlatives were excluded.",
    },
    {
      title: "Featured food of each region",
      creator: "Thailand.go.th",
      url: "https://thailand.go.th/issue-focus-detail/009-013",
      note: "Complete DFS parse used narrowly to corroborate Nam Ngiao with rice noodles as a Northern Thai food listed separately from Khao Soi.",
    },
    {
      title: "Allergen guidance for food businesses",
      creator: "UK Food Standards Agency",
      url: "https://www.food.gov.uk/business-guidance/allergen-guidance-for-food-businesses",
      note: "Current primary guidance used for soy, wheat, crustacean, fish and cross-contact boundaries rather than automatic gluten-free claims.",
    },
    {
      title: "Cooking your food",
      creator: "UK Food Standards Agency",
      url: "https://www.food.gov.uk/safety-hygiene/cooking-your-food",
      note: "Current primary guidance used for meat, broth, utensil separation and safe cooking without inventing one universal time, temperature or shelf life.",
    },
  ],
  methodDescription:
    "Updated 28 July 2026 after two independent DataForSEO clusters with four raw keyword records and no competitor-domain table, ten current UK-English SERPs with 79 organic result appearances, 56 People Also Ask appearances and 39 case-normalised unique questions, four complete DFS source parses, current FSA guidance, plus exact owner ranking and backlink checks. “Kanom jeen nam ngiao” and “khanom chin nam ngiao” returned UK volume 10 each with no KD; exact Nam Ngiao heads had no measurable volume or KD. The owner has zero ranking terms and no reportable backlink summary signal. Khao Soi, Khanom Jeen Nam Ya, Boat Noodles, Tom Yum noodles, generic pork-noodle or tomato soup, generic khanom jeen, recipe-only, restaurant, instant-paste, retailer, calorie and health intent remain independent. Fixed price, calories, health, automatic dietary or halal status, permanent restaurant, universal heat/time/temperature/shelf-life, compulsory blood, pork, dok ngiao, shrimp paste, fish sauce, soybean form, tomato, chilli, topping or noodle shape, settled inventor, pure Lanna-versus-Shan ownership, hidden-gem, best and one-formula claims were excluded; Recipe schema is deliberately absent.",
};

export function NamNgiaoGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
