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
  title: "Tam Khanun: Northern Thai Jackfruit Salad Guide",
  description:
    "Understand Tam Khanun: Northern Thai pounded young-jackfruit salad, taste, ingredients, pork and seafood checks, ordering, Som Tam differences and safe cooking.",
  canonical: "https://go2-thailand.com/food/tam-khanun/",
  updatedAt: "28 July 2026",
  name: "Tam Khanun",
  thaiName: "ตำขนุน · Northern Thai pounded young-jackfruit salad",
  heroImage: "/images/redesign/tam-khanun-northern-thai-jackfruit-hero.webp",
  heroAlt:
    "Northern Thai Tam Khanun with coarse pounded young jackfruit, chilli paste, pork, tomato, makrut lime leaf and fried garlic",
  heroEyebrow: "Lanna food · tender, pounded and stir-fried",
  lead: "Tam Khanun is a cooked Northern Thai salad, not raw fruit and not a Western pulled-jackfruit substitute. Unripe jackfruit is made tender, pounded with a dried-chilli aromatic paste and briefly stir-fried. Pork, shrimp paste, fermented fish, fish sauce, tomato and crisp garnish vary—so the useful order starts with the paste and protein rather than the visible jackfruit.",
  quickFacts: [
    {
      label: "Identity",
      value: "Young jackfruit · pounded",
      icon: UtensilsCrossed,
    },
    { label: "Method", value: "Tenderise · pound · stir-fry", icon: ChefHat },
    {
      label: "Texture",
      value: "Coarse · fibrous · crisp finish",
      icon: Sparkles,
    },
    {
      label: "Check",
      value: "Pork · shrimp · fish · soy",
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
      "Tam Khanun is savoury, aromatic and earthy, with dried-chilli warmth and a salty fermented backbone. Young jackfruit is mild enough to absorb the paste rather than tasting like ripe tropical fruit. Tomato can add gentle acidity; makrut lime leaf, garlic, coriander and spring onion lift the richer pork or seafood-seasoning notes.",
    texture:
      "Tender jackfruit is pounded into coarse fibres with some seed and core pieces still intact. Minced pork makes one version crumbly; pork belly or rind adds richer crisp contrast. It should not need to resemble a smooth purée or raw shredded papaya.",
    finish:
      "Fried garlic, dried chilli and makrut lime leaf can leave a toasted, citrus-aromatic finish. Shrimp paste, fermented fish or fish sauce extends savoury depth. Heat and salt depend on the paste and table garnish, not one universal formula.",
    scores: [
      { label: "Savoury-salty", value: 5 },
      { label: "Aromatic herbs", value: 4 },
      { label: "Earthy jackfruit", value: 4 },
      { label: "Chilli heat", value: 3 },
    ],
  },
  ingredients: [
    {
      name: "Unripe jackfruit",
      role: "Pale young fruit is cooked until tender before pounding. Ripe yellow or orange jackfruit is sweet and fragrant and belongs to a different eating context.",
    },
    {
      name: "Dried-chilli paste",
      role: "Dried chilli gives warmth and colour. Paste strength, chilli type, salt and frying change by cook, so the dish is not universally very hot.",
    },
    {
      name: "Garlic · shallot",
      role: "Garlic and shallot build the aromatic paste or stir-fry. Fried garlic can return as garnish; bottled or premade paste may add oil, salt or hidden allergens.",
    },
    {
      name: "Galangal · lemongrass",
      role: "CMU documents galangal and lemongrass in one Lanna paste, while another published version uses ginger. These aromatics are variation signals, not a mandatory checklist.",
    },
    {
      name: "Pork branch",
      role: "Minced pork, pork belly, pork fat and pork rind appear across versions. Pork is familiar but its cut, amount and presence vary; stock and shared equipment also matter.",
    },
    {
      name: "Shrimp · fermented fish",
      role: "Shrimp paste, boiled fermented fish or fish sauce can supply savoury depth. They create crustacean, fish, vegetarian, vegan and halal boundaries even when no seafood is visible.",
    },
    {
      name: "Tomato · makrut leaf",
      role: "Tomato can add moisture and acidity, while makrut lime leaf brings citrus aroma. Both are documented, neither is the sole proof that the plate is authentic.",
    },
    {
      name: "Crisp herb finish",
      role: "Fried garlic, fried dried chilli, pork crackling, coriander, spring onion or peanuts may finish the plate. Garnish changes heat, texture and allergen checks.",
    },
  ],
  allergenCopy:
    "Shrimp paste contains crustacean; fermented fish and fish sauce contain fish. Fermented soybean or soy seasoning may add soy and wheat, while peanuts and shared wok or fryer handling can add further risk. Premade paste, garnish and canned young jackfruit brine need their own labels. Verify the full preparation rather than judging the visible plant base.",
  vegetarianCopy:
    "Tam Khanun is not automatically vegetarian or vegan: minced pork or pork belly may be mixed through it, and shrimp paste, fermented fish or fish sauce can hide in the paste. Ask for a separately made plant-led paste, pan, oil and garnish. It is not automatically halal because meat source, pork, seafood seasoning and shared equipment require current checks.",
  formats: [
    {
      title: "Minced-pork Lanna plate",
      bestFor:
        "A coarse, savoury version close to the institutional Chiang Mai record: tender jackfruit, chilli paste, minced pork, tomato, makrut leaf and fried aromatics.",
      tradeOff:
        "Confirm shrimp paste, fermented fish, fish sauce, soy, pork stock, chilli level and whether garnish or wok is shared.",
    },
    {
      title: "Pork-belly variation",
      bestFor:
        "A richer contrast of pounded jackfruit, pork belly or crisp pork fat, aromatic paste, makrut leaf and fresh herbs beside sticky rice.",
      tradeOff:
        "Ask which pork cut and crisp garnish are included, how oily the plate is and whether peanuts or other allergens enter the finish.",
    },
    {
      title: "Verified plant-led adaptation",
      bestFor:
        "Keeping the tenderise-pound-stir-fry method while replacing pork, shrimp paste, fermented fish and fish sauce through an explicitly described recipe.",
      tradeOff:
        "Check the complete paste, seasoning, stock, wok, oil and garnish. Jackfruit alone does not prove the adaptation is vegetarian, vegan or gluten-free.",
    },
  ],
  orderSteps: [
    {
      title: "Confirm young jackfruit",
      text: "Ask for Tam Khanun / ตำขนุน or Tam Banun. Confirm it is the cooked pounded young-jackfruit dish—not ripe fruit, Kaeng Khanun curry or a generic vegan pulled-jackfruit plate.",
    },
    {
      title: "Audit paste and protein",
      text: "Ask about minced pork, pork belly, rind, stock, shrimp paste, fermented fish, fish sauce, soy, wheat and peanuts. Request a separate plant-led version before cooking when needed.",
    },
    {
      title: "Set heat and finish",
      text: "Choose dried chilli and crisp garnish carefully, then eat small spoonfuls with sticky rice and vegetables. Taste before adding more chilli because paste and fried garnish both carry heat.",
    },
  ],
  cooking: {
    title: "Tenderise. Pound coarse. Stir-fry safely.",
    intro:
      "The identity comes from a sequence, not from shredding canned jackfruit into sauce. Use one complete tested method, control latex or brine and texture, then keep raw meat away from the cooked jackfruit and ready-to-eat garnish.",
    steps: [
      "Choose one complete tested Tam Khanun method. Decide fresh or canned unripe jackfruit, paste, pork or plant-led protein, tomato, makrut leaf, seasoning, garnish and every allergen substitution.",
      "Prepare fresh young jackfruit safely according to the method, accounting for latex, skin, core and seeds, or drain the specified canned product. Do not substitute ripe sweet fruit.",
      "Tenderise the jackfruit fully, drain it and pound it with the tested paste to a coarse fibrous texture. Keep clean jackfruit tools separate from raw meat and seafood-seasoning containers.",
      "Prepare raw pork with dedicated hands, board and utensils. Cook paste and meat through the tested sequence, preventing raw-meat contact with herbs, sticky rice and serving plates.",
      "Add the pounded jackfruit and documented finishing ingredients, then stir-fry until the complete method’s safe endpoint. Colour and dryness alone do not prove pork is safely cooked.",
      "Finish with clean makrut leaf, herbs or crisp garnish and serve as directed. Follow the complete method and current guidance for cooling, storage and reheating leftovers.",
    ],
    boundary:
      "Fresh or canned fruit, piece size, initial tenderness, pork cut, batch size and wok heat change timing. Use one complete tested method plus current food-safety guidance. This owner deliberately gives no universal time, temperature, storage period or Recipe schema.",
  },
  affiliates: [
    {
      href: "/go/simple-thai-food-cookbook/",
      title: "Simple Thai Food",
      text: "A tested Thai cookbook can supply complete paste, jackfruit, meat and stir-fry quantities that this traveller owner should not invent. Check whether Tam Khanun or a comparable Northern pounded salad is included, then compare edition, format, seller, price and delivery.",
    },
    {
      href: "/go/thai-granite-mortar-eight-inch/",
      title: "Eight-inch granite mortar",
      text: "Potentially useful for pounding a chilli-aromatic paste and coarse tender jackfruit. Check usable interior, weight, worktop protection and cleaning for shrimp, fish, soy and raw-pork cross-contact; a food processor may suit the tested method better.",
    },
  ],
  classHref: withSubId(
    KLOOK_GENERIC,
    "en-tam-khanun-northern-thai-jackfruit-class",
  ),
  classCopy:
    "A relevant Chiang Mai cooking class or Northern food tour can show the difference between tenderising, pounding and stir-frying young jackfruit. Klook results are broad: confirm the current menu or stops include Tam Khanun and check pork, seafood seasoning, allergens, hands-on participation, language, transport and cancellation terms.",
  classSignals: [
    {
      title: "Fruit maturity",
      text: "Learn why pale unripe jackfruit works here and why ripe sweet fruit or a generic meat substitute changes the dish.",
    },
    {
      title: "Pounding texture",
      text: "See how a cook makes paste and keeps tender jackfruit coarse enough to retain fibres, seed pieces and texture.",
    },
    {
      title: "Lanna finish",
      text: "Understand how pork, tomato, makrut leaf, sticky rice, vegetables and crisp garnish complete one documented Northern version.",
    },
  ],
  faqs: [
    {
      question: "What is Tam Khanun?",
      answer:
        "Tam Khanun is a Northern Thai cooked salad of tender unripe jackfruit pounded with a dried-chilli aromatic paste and briefly stir-fried. Pork, tomato, makrut lime leaf, seafood seasoning and crisp garnish vary.",
    },
    {
      question: "What does Tam Khanun mean?",
      answer:
        "Tam refers to pounding or mixing with a mortar, while khanun means jackfruit. Northern spellings and names include Tam Kanun, Tam Banun and Tum Kanun.",
    },
    {
      question: "What does Tam Khanun taste like?",
      answer:
        "It is savoury, salty, aromatic and earthy, with variable dried-chilli heat. Young jackfruit absorbs the paste rather than tasting sweet; tomato, makrut leaf, pork and fermented seafood seasoning change brightness and depth.",
    },
    {
      question: "What ingredients are in Tam Khanun?",
      answer:
        "Unripe jackfruit and a chilli-aromatic paste define the method. Garlic, shallot, galangal or ginger, lemongrass, pork, shrimp paste, fermented fish, fish sauce, tomato, makrut leaf, fried garlic, dried chilli and herbs are documented possibilities, not one mandatory list.",
    },
    {
      question: "Is Tam Khanun spicy?",
      answer:
        "It often contains dried chilli and may be moderately or very hot, but paste and garnish vary. Ask how much chilli is pounded into the dish and whether fried dried chillies are added on top.",
    },
    {
      question: "Is Tam Khanun vegetarian or vegan?",
      answer:
        "Not automatically. Pork may be mixed through the jackfruit and shrimp paste, fermented fish or fish sauce may be hidden in the paste. A plant-led version needs a separately described paste, seasoning, pan, oil and garnish.",
    },
    {
      question: "Is Tam Khanun gluten-free?",
      answer:
        "Not automatically. The jackfruit may be naturally gluten-free, but soy or fermented seasoning, premade paste, stock, fried garnish and shared preparation can add wheat or cross-contact. Verify the complete dish.",
    },
    {
      question: "What is the difference between Tam Khanun and Som Tam?",
      answer:
        "Tam Khanun uses cooked tender young jackfruit, is pounded with paste and then stir-fried. Som Tam usually keeps raw green papaya crisp and uses a wetter lime, fish-sauce and sugar dressing. They share a pounding idea, not one recipe.",
    },
    {
      question: "What is the difference between Tam Khanun and Kaeng Khanun?",
      answer:
        "Tam Khanun is a pounded and stir-fried young-jackfruit salad. Kaeng Khanun is a separate liquid curry or stew commonly built with young jackfruit and other ingredients. Northern sources list both independently.",
    },
    {
      question: "How do you eat Tam Khanun?",
      answer:
        "Eat small spoonfuls with sticky rice and any vegetables served beside it. Add fried garlic or chilli gradually, and ask about pork, seafood seasoning, peanuts and shared preparation before eating.",
    },
  ],
  related: [
    {
      title: "Som Tam guide",
      description:
        "Compare the crisp raw-papaya pounding system with Tam Khanun’s cooked, coarse and stir-fried method.",
      href: "/food/som-tam/",
      image: "/images/redesign/som-tam-dish-hero.webp",
    },
    {
      title: "Nam Prik Ong",
      description:
        "Continue through Lanna tomato, chilli and pork flavours with a dip-and-vegetable eating system.",
      href: "/food/nam-prik-ong/",
      image: "/images/redesign/nam-prik-ong-lanna-dip-hero.webp",
    },
    {
      title: "Chiang Mai food guide",
      description:
        "Build a Northern table around markets, Khao Soi, pounded salads, chilli dips and cooking experiences.",
      href: "/city/chiang-mai/food/",
      image: "/images/cities/chiang-mai/redesign/chiang-mai-food-khao-soi.webp",
    },
  ],
  sources: [
    {
      title: "Tam khanun – Lanna Food",
      creator: "Chiang Mai University Library",
      url: "https://lannainfo.library.cmu.ac.th/en_lannafood/detail_lannafood.php?id_food=109",
      note: "Current institutional capture used for Tam Khanun/Tam Banun naming, boiled young jackfruit, pounding and stir-fry sequence, minced pork, tomato, makrut leaf, paste, shrimp paste, fermented fish, fried garlic and herbs. Quantities and fixed timings were excluded.",
    },
    {
      title: "Thai Pounded Jackfruit Salad (Tam Khanun)",
      creator: "Saveur",
      url: "https://www.saveur.com/thai-pounded-jackfruit-salad-recipe/",
      note: "Complete DFS parse used independently for unripe jackfruit, coarse texture, pork-belly expression, aromatic paste, shrimp paste, fish sauce, makrut leaf, varied garnish and sticky-rice service. Quantities and fixed timings were excluded.",
    },
    {
      title: "11 Must-Try Northern Thai Dishes in Chiang Mai",
      creator: "MICHELIN Guide",
      url: "https://guide.michelin.com/th/en/article/dining-out/11-must-try-northern-thai-dishes-in-chiang-mai",
      note: "Current live capture used narrowly to corroborate longstanding Northern identity and separate Tam Khanun and Kaeng Khanun owners. Restaurants and rankings were excluded.",
    },
    {
      title: "Jackfruit",
      creator: "Thailand Department of Agricultural Extension",
      url: "https://www.doae.go.th/en/jackfruit-2/",
      note: "Complete DFS parse used narrowly for ripe yellow or orange sweet-fragrant jackfruit identity, which this unripe-jackfruit owner must not be confused with. Nutrition and storage claims were excluded.",
    },
    {
      title: "Allergen guidance for food businesses",
      creator: "UK Food Standards Agency",
      url: "https://www.food.gov.uk/business-guidance/allergen-guidance-for-food-businesses",
      note: "Current primary guidance used for crustacean, fish, soy, wheat, peanut and cross-contact boundaries rather than automatic dietary claims.",
    },
    {
      title: "Cooking your food",
      creator: "UK Food Standards Agency",
      url: "https://www.food.gov.uk/safety-hygiene/cooking-your-food",
      note: "Current primary guidance used for raw-pork separation and safe cooking without inventing one universal time, temperature or shelf life.",
    },
  ],
  methodDescription:
    "Updated 28 July 2026 after two independent DataForSEO clusters with two raw keyword records and no competitor-domain table, ten current UK-English SERPs with 83 organic result appearances, 44 People Also Ask appearances and 39 case-normalised unique questions, one complete DFS specialist parse, current CMU and Michelin captures, one complete Thai agricultural source parse, current FSA guidance, plus exact owner ranking and backlink checks. Exact Tam Khanun and Northern Thai jackfruit salad heads had no measurable UK volume or KD; the owner has zero ranking terms and no reportable backlink signal. Som Tam, Tam Mak Hoong, Kaeng Khanun, ripe jackfruit, Thai desserts, pulled jackfruit, vegan meat substitute, retailer, recipe, restaurant, calorie and health intent remain independent. Fixed-price, calorie, health, automatic dietary or halal, permanent-restaurant, universal-heat/time/temperature/shelf-life, compulsory pork, seafood seasoning, soy, peanut, tomato, makrut leaf, chilli, garnish or paste, canned-equals-fresh, meat-taste, most-common, best, inventor and one-formula claims were excluded; Recipe schema is deliberately absent.",
};

export function TamKhanunGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
