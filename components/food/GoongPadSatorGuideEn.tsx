import {
  ChefHat,
  Fish,
  Flame,
  Leaf,
  MapPin,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { KLOOK_GENERIC, withSubId } from "../../lib/affiliates";
import {
  DishEditorialTemplate,
  type DishEditorialData,
} from "./DishEditorialTemplate";

const data: DishEditorialData = {
  title: "Goong Pad Sator: Thai Prawns with Stink Beans",
  description:
    "Understand Goong Pad Sator before ordering: Southern Thai prawns, sataw or stink beans, curry paste, flavour, heat, allergens and rice service.",
  canonical: "https://go2-thailand.com/food/goong-pad-sator/",
  updatedAt: "28 July 2026",
  name: "Goong Pad Sator",
  thaiName: "กุ้งผัดสะตอ · Goong Pad Sataw",
  heroImage:
    "/images/redesign/goong-pad-sator-southern-stink-bean-prawn-stir-fry-hero.webp",
  heroAlt:
    "Cooked prawns and broad green sataw beans in a glossy Southern Thai curry-paste stir-fry with jasmine rice",
  heroEyebrow: "Southern Thai wok · prawns · unmistakable sataw",
  lead: "Goong Pad Sator is a Southern Thai stir-fry that puts cooked prawns beside broad green sataw beans—also called stink beans, bitter beans or petai—in a powerful chilli-and-garlic seasoning. Shrimp paste, fish sauce, oyster sauce or curry paste may deepen the wok, so its aroma is only the first clue: ask about the full sauce when shellfish, fish, soy, wheat or halal boundaries matter.",
  quickFacts: [
    { label: "Region", value: "Southern Thailand", icon: MapPin },
    { label: "Identity", value: "Prawns · sataw beans", icon: Fish },
    {
      label: "Format",
      value: "Fast wok stir-fry · rice",
      icon: UtensilsCrossed,
    },
    { label: "Heat", value: "Often hot · batch varies", icon: Flame },
  ],
  navItems: [
    { href: "#taste", label: "Taste", icon: Sparkles },
    { href: "#ingredients", label: "Signals", icon: Leaf },
    { href: "#choose", label: "Choose", icon: Fish },
    { href: "#order", label: "Order", icon: MapPin },
    { href: "#cook", label: "Method", icon: ChefHat },
    { href: "#questions", label: "Questions", icon: UtensilsCrossed },
  ],
  taste: {
    intro:
      "Sataw is the dish's defining signal: green and firm-tender, with a pungent sulphurous aroma and a bitter, nutty edge. Sweet prawns and salty fermented seasoning pull in the other direction, while chilli, garlic and curry paste can make the finished wok aromatic and assertive rather than simply hot.",
    texture:
      "Cooked prawns should be firm and juicy; halved or whole sataw beans keep a distinct bite. The seasoning usually clings as a glossy coating rather than forming a bowl of broth, although sauce quantity varies by cook.",
    finish:
      "The bean aroma can linger after chilli and fermented seafood depth. Sugar or a sour accent may round the edges, while plain jasmine rice spreads the sauce and gives each bite more room.",
    scores: [
      { label: "Bean pungency", value: 5 },
      { label: "Chilli heat", value: 4 },
      { label: "Fermented depth", value: 4 },
      { label: "Sweet-salty balance", value: 3 },
    ],
  },
  ingredients: [
    {
      name: "Cooked prawns",
      role: "Goong makes this the prawn-led branch of the wider Pad Sator family. Size, shell, tail and quantity vary; confirm whether the kitchen also adds pork or another protein.",
    },
    {
      name: "Sataw · petai beans",
      role: "Broad green beans with a powerful aroma and bitter-nutty bite. They may be whole, halved or lightly sliced; their strength changes with maturity and preparation.",
    },
    {
      name: "Curry-paste branch",
      role: "Some documented versions use a Southern or red curry paste for chilli and aromatic depth. A paste can hide shrimp paste, fish, soy, wheat or packaged seasoning.",
    },
    {
      name: "Garlic · fresh chilli",
      role: "Garlic and chilli are recurring wok signals. Chilli type and amount change quickly between kitchens, so visible red pieces are not a dependable heat scale.",
    },
    {
      name: "Shrimp paste",
      role: "Kapi can reinforce the prawns with concentrated fermented crustacean savouriness. It may be pounded into a paste or sauce and remain invisible in the finished plate.",
    },
    {
      name: "Fish · oyster sauce",
      role: "Fish sauce may supply salt and oyster sauce can add body and sweetness. Oyster is a mollusc; commercial sauces may also contain soy or wheat, so check the actual bottles.",
    },
    {
      name: "Sugar · citrus notes",
      role: "Sugar can soften bitter beans and chilli. Makrut lime or another sour-citrus accent appears in some structures, but neither is guaranteed by the dish name.",
    },
    {
      name: "Jasmine rice",
      role: "Plain rice is the practical counterpoint to the pungent, concentrated wok sauce. Confirm whether it is included, its portion and the current total price.",
    },
  ],
  allergenCopy:
    "Prawns and possible shrimp paste make crustacean a central boundary. Oyster sauce adds mollusc; fish sauce or curry paste may add fish; soy and wheat can enter through oyster sauce, soy sauce, stock, paste or seasoning. Shared woks, spatulas and sauce stations add cross-contact. Ask about every protein, paste and bottle—not only the visible prawns.",
  vegetarianCopy:
    "Goong Pad Sator is not vegetarian or vegan because goong means prawns, and shrimp paste, fish sauce or oyster sauce may remain even if the visible seafood is removed. A plant-based sataw stir-fry must be deliberately remade with verified sauces and separate preparation. Halal diners should also check for a pork or mixed-protein branch, sauce certification and the shared wok.",
  formats: [
    {
      title: "Prawn-led Goong Pad Sator",
      bestFor:
        "Trying the named dish with cooked prawns, clear sataw bite and enough glossy seasoning to mix through rice.",
      tradeOff:
        "Confirm shrimp paste, fish sauce, oyster sauce, curry paste, heat and whether shells or tails remain.",
    },
    {
      title: "Mixed prawn and pork",
      bestFor:
        "Understanding the broader Pad Sator family when a kitchen combines shrimp with sliced or minced pork.",
      tradeOff:
        "The menu name may abbreviate the protein list. This branch is not suitable when pork or halal handling is a boundary.",
    },
    {
      title: "Small rice-led tasting",
      bestFor:
        "Testing sataw's strong aroma and bitterness without making a pungent stir-fry the whole meal.",
      tradeOff:
        "Ask for a small serving and plain rice, then check the current portion, included sides and price before ordering.",
    },
  ],
  orderSteps: [
    {
      title: "Name bean and protein",
      text: "Ask for Goong Pad Sator, Goong Pad Sataw or กุ้งผัดสะตอ and confirm prawns plus sataw. Check whether pork or another protein joins the wok.",
    },
    {
      title: "Check paste and sauces",
      text: "Ask about shrimp paste, curry paste, fish sauce, oyster sauce, soy and stock. State crustacean, mollusc, fish, soy, wheat, pork or halal boundaries before the wok starts.",
    },
    {
      title: "Choose heat and rice",
      text: "Ask how hot the current version is, choose plain rice and confirm what the portion includes. Check the actual current price instead of relying on an old menu photo.",
    },
  ],
  cooking: {
    title: "Prep first. Build the paste. Cook the prawns through.",
    intro:
      "A fast wok leaves little time to find missing ingredients or correct an allergen mistake. Use one complete tested recipe and its quantities; prepare beans, sauce and prawns before heating the pan, and follow current seafood guidance rather than judging doneness by colour alone.",
    steps: [
      "Choose one complete tested Goong Pad Sator method and inspect its prawns, sataw, paste, sauces, aromatics, sugar, oil and rice before cooking.",
      "Keep raw prawns and their tools away from ready-to-eat food. Verify shrimp paste, fish sauce, oyster sauce, soy, wheat and any stock or packaged curry paste.",
      "Prepare the sataw as the tested method directs. Pound or mix garlic, chilli and any recipe-specific curry paste or shrimp paste before the wok becomes hot.",
      "Build the aromatic sauce in the sequence specified by the complete recipe, controlling heat so the garlic and paste cook without scorching.",
      "Add prawns and beans in the tested order and cook the seafood thoroughly. Follow current guidance or the product directions; colour alone is not a safety test.",
      "Finish only within the tested formula, serve promptly with rice, and follow current local guidance for hot holding, cooling, storage and reheating.",
    ],
    boundary:
      "Prawn size, thawing state, wok load, burner power, bean maturity and sauce concentration change timing and texture. Use one complete tested method and current food-safety guidance. This traveller owner publishes no universal quantities, cooking time, storage period or Recipe schema.",
  },
  affiliates: [
    {
      href: "/go/simple-thai-food-cookbook/",
      title: "Simple Thai Food",
      text: "A tested Thai cookbook can explain curry-paste balance, wok sequencing and ingredient substitutions in context. Check whether Pad Sator or a relevant Southern stir-fry appears in the current contents, then compare edition, seller, price and delivery.",
    },
    {
      href: "/go/thai-granite-mortar-eight-inch/",
      title: "Eight-inch granite mortar",
      text: "A stable mortar can grind garlic, chilli and fibrous aromatics when the chosen complete recipe calls for a fresh paste. Compare capacity, weight, care, seafood-allergen cleaning, seller, current price and delivery.",
    },
  ],
  classHref: withSubId(
    KLOOK_GENERIC,
    "en-goong-pad-sator-southern-cooking-class",
  ),
  classCopy:
    "A Southern Thai cooking class or food tour can make sataw, curry paste and wok heat easier to understand, but Klook menus change. Confirm the current option explicitly includes Pad Sator or another sataw dish, then check hands-on work, seafood handling, dietary support, language, transport and cancellation terms.",
  classSignals: [
    {
      title: "Recognise sataw",
      text: "See the broad petai bean before it is stir-fried and learn how maturity and preparation influence aroma, bitterness and bite.",
    },
    {
      title: "Read the hidden sauce",
      text: "Separate visible prawns from shrimp paste, fish sauce, oyster sauce and packaged curry paste when checking allergens.",
    },
    {
      title: "Control the wok",
      text: "Watch how mise en place, burner heat and prawn size affect sauce cling, bean texture and seafood doneness.",
    },
  ],
  faqs: [
    {
      question: "What is Goong Pad Sator?",
      answer:
        "Goong Pad Sator is a Southern Thai stir-fry of prawns and sataw, the pungent green bean also called stink bean, bitter bean or petai. Garlic, chilli, curry paste, shrimp paste and sauces vary by kitchen, and it is commonly eaten with rice.",
    },
    {
      question: "Are Goong Pad Sator and Goong Pad Sataw the same dish?",
      answer:
        "They are common English transliterations for the same prawn-and-sataw stir-fry. You may also see Pad Sator Goong or Phat Sato. Transliteration does not guarantee one sauce, heat level or protein mix.",
    },
    {
      question: "What are sataw or stink beans?",
      answer:
        "Sataw are broad green beans known across Southeast Asia as petai, stink beans or bitter beans. They have a firm-tender bite, a strong sulphurous aroma and a bitter, nutty or green flavour that can linger.",
    },
    {
      question: "What does Goong Pad Sator taste like?",
      answer:
        "Expect sweet prawns, pungent bitter-nutty sataw, garlic and chilli, with salty fermented depth from possible shrimp paste or fish sauce. Sugar, curry paste, oyster sauce and citrus notes can change the balance.",
    },
    {
      question: "Is Goong Pad Sator spicy?",
      answer:
        "It is often hot because fresh chilli or curry paste is common, but there is no universal rating. Ask how spicy the current kitchen makes it and whether the sauce is prepared in advance before requesting a change.",
    },
    {
      question: "Does Goong Pad Sator contain shrimp paste?",
      answer:
        "It can. Several documented versions include shrimp paste directly or inside curry paste, but it is not visible and not guaranteed in every version. The prawns themselves mean crustacean is present regardless.",
    },
    {
      question: "What ingredients are in Goong Pad Sator?",
      answer:
        "Prawns and sataw define the named dish. Recurring supporting signals include garlic, chilli, shrimp paste or curry paste, fish sauce, oyster sauce and sugar. Makrut lime, pork or other seasoning may appear.",
    },
    {
      question: "Can Goong Pad Sator contain pork?",
      answer:
        "Yes. The wider Pad Sator family may use pork, prawns or both, and a short menu label may not list every protein. Confirm the actual wok when pork avoidance or halal handling matters.",
    },
    {
      question: "Is Goong Pad Sator gluten-free or halal?",
      answer:
        "Neither is automatic. Oyster or soy sauce, stock and curry paste may contain wheat or soy. Halal diners also need to verify pork, seafood products, sauces, certification and shared-wok preparation with the venue.",
    },
    {
      question: "How do you eat Goong Pad Sator?",
      answer:
        "Eat a modest spoonful with plain jasmine rice so the concentrated sauce and pungent beans are spread across each bite. Check whether rice is included, whether prawn shells remain and the current total price.",
    },
  ],
  related: [
    {
      title: "Goong Pad Makham",
      description:
        "Compare sataw's pungent Southern profile with a separate sweet-sour tamarind prawn stir-fry.",
      href: "/food/goong-pad-makham/",
      image: "/images/redesign/goong-pad-makham-thai-tamarind-prawns-hero.webp",
    },
    {
      title: "Nam Prik Kapi",
      description:
        "Follow shrimp paste into a different dip-and-vegetable eating system with its own owner and checks.",
      href: "/food/nam-prik-kapi/",
      image: "/images/redesign/nam-prik-kapi-shrimp-paste-dip-hero.webp",
    },
    {
      title: "Southern Thailand",
      description:
        "Place sataw beside the coastal cities, islands and wider flavour language of Thailand's South.",
      href: "/region/southern/",
      image: "/images/regions/southern-thailand.webp",
    },
  ],
  sources: [
    {
      title: "Much-loved dishes from different regions of Thailand",
      creator: "Tourism Authority of Thailand, TAT Newsroom",
      url: "https://www.tatnews.org/2020/01/much-loved-must-eat-dishes-from-different-regions-of-thailand/",
      note: "Current primary capture used for Phat Sato's Southern regional context, powerful aroma, curry paste, garlic, chilli and pork-or-shrimp branches. Nutrition, popularity and must-eat language was excluded.",
    },
    {
      title: "Goong Pad Sator recipe",
      creator: "Great British Chefs",
      url: "https://www.greatbritishchefs.com/recipes/goong-pad-sator-recipe",
      note: "Complete competitor DFS parse used for the prawn-led sataw, chilli, garlic, shrimp-paste, fish-sauce, balanced-flavour and rice signals. Exact quantities, timings and superlatives were excluded.",
    },
    {
      title: "Thai stink beans with shrimp",
      creator: "Eating Thai Food",
      url: "https://www.eatingthaifood.com/thai-stink-beans-recipe/",
      note: "Complete specialist DFS parse used for sataw and petai naming, Southern context, prawns, curry paste, shrimp paste, oyster sauce, sugar and rice. Personal, health, authenticity and timing claims were excluded.",
    },
    {
      title: "Thai stir-fried stink beans",
      creator: "Cooking With Nart",
      url: "https://www.cookingwithnart.com/thai-stir-fried-stink-beans/",
      note: "Complete specialist DFS parse used for shrimp, pork and mixed branches plus curry-paste, shrimp-paste, fish-sauce, sugar, chilli and makrut variation. Exact formula and subjective claims were excluded.",
    },
    {
      title: "Allergen Guidance for Food Businesses",
      creator: "UK Food Standards Agency",
      url: "https://www.food.gov.uk/business-guidance/allergen-guidance-for-food-businesses",
      note: "Current primary guidance used for crustacean, mollusc, fish, soy, wheat and cross-contact boundaries.",
    },
    {
      title: "Cooking Your Food",
      creator: "UK Food Standards Agency",
      url: "https://www.food.gov.uk/safety-hygiene/cooking-your-food",
      note: "Current primary guidance used for safe seafood cooking, hot holding, cooling and reheating boundaries without inventing one recipe.",
    },
  ],
  methodDescription:
    "Updated 28 July 2026 after two independent DataForSEO clusters with two raw keyword records and no returned competitor-domain table, ten current UK-English SERP sets with 70 organic result appearances, 59 People Also Ask appearances and 34 case-normalised unique questions, three complete specialist or competitor DFS parses, one zero-markdown Michelin authority capture, current Tourism Authority of Thailand primary context, current FSA guidance, plus exact owner ranking and backlink checks. Exact seeds returned no measurable UK volume or KD; the route has zero ranking terms and no backlink summary signal. Generic sataw or petai, pork-only Mu Pad Sataw, Malaysian or Indonesian petai sambal, Goong Pad Makham, Pad Nam Prik Pao, generic prawn stir-fries, Khua Kling, recipes, restaurants, near-me, delivery, retail, calories, nutrition and health remain independent. Fixed-price, calorie, health, permanent-restaurant, universal-availability, fixed-heat, compulsory-ingredient, exact-formula, origin, time, storage, automatic-dietary, guaranteed-cross-contact, first-hand, authenticity and superlative claims were excluded; Recipe schema is deliberately absent.",
};

export function GoongPadSatorGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
