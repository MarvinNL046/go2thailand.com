import {
  ChefHat,
  Fish,
  Flame,
  Leaf,
  MapPin,
  Soup,
  Sparkles,
} from "lucide-react";
import { KLOOK_GENERIC, withSubId } from "../../lib/affiliates";
import {
  DishEditorialTemplate,
  type DishEditorialData,
} from "./DishEditorialTemplate";

const data: DishEditorialData = {
  title: "Gaeng Tai Pla: Southern Thai Fermented Fish Curry",
  description:
    "Understand Gaeng Tai Pla before ordering: fermented fish seasoning, Southern curry heat, ingredients, vegetables, allergens, taste and rice service.",
  canonical: "https://go2-thailand.com/food/gaeng-tai-pla/",
  updatedAt: "28 July 2026",
  name: "Gaeng Tai Pla",
  thaiName: "แกงไตปลา · Kaeng Tai Pla",
  heroImage:
    "/images/redesign/gaeng-tai-pla-southern-fermented-fish-curry-hero.webp",
  heroAlt:
    "Dark Southern Thai Gaeng Tai Pla curry with cooked fish, bamboo shoot, Thai aubergine, beans, jasmine rice and fresh vegetables",
  heroEyebrow: "Southern Thai curry · fermented fish depth · serious heat",
  lead: "Gaeng Tai Pla is a dark, fiercely seasoned Southern Thai curry or soup whose defining base is tai pla, a salty fermented fish-entrail seasoning. Dried chilli and an aromatic paste meet cooked fish and a changing set of vegetables; plain rice and fresh greens temper the intensity. The seasoning is integrated into the broth—not a bowl of visible organs—but fish and possible shrimp paste make the allergen check non-negotiable.",
  quickFacts: [
    { label: "Region", value: "Southern Thailand", icon: MapPin },
    {
      label: "Identity",
      value: "Tai pla · fermented fish seasoning",
      icon: Fish,
    },
    { label: "Format", value: "Dark curry or soup · vegetables", icon: Soup },
    { label: "Heat", value: "Usually high · batch varies", icon: Flame },
  ],
  navItems: [
    { href: "#taste", label: "Taste", icon: Sparkles },
    { href: "#ingredients", label: "Signals", icon: Fish },
    { href: "#choose", label: "Choose", icon: Soup },
    { href: "#order", label: "Order", icon: MapPin },
    { href: "#cook", label: "Method", icon: ChefHat },
    { href: "#questions", label: "Questions", icon: Leaf },
  ],
  taste: {
    intro:
      "Tai pla supplies concentrated fermented-fish salinity and depth. Dried chilli, black pepper and fresh aromatics make the curry forceful, while turmeric and makrut lime can add earthy-citrus lift. Sweetness and sourness are supporting decisions rather than the creamy balance associated with many coconut curries.",
    texture:
      "The broth can be pourable or reduced and cling to the vegetables. Cooked or dried fish may appear as flakes or chunks; bamboo shoot, Thai aubergine and beans create bite. Thickness alone does not identify one authentic formula.",
    finish:
      "Chilli heat and pepper can remain after the fermented depth, with lemongrass, garlic and makrut aroma returning between bites. Jasmine rice and fresh vegetables calm the palate without changing what is inside the shared curry pot.",
    scores: [
      { label: "Chilli heat", value: 5 },
      { label: "Fermented-fish depth", value: 5 },
      { label: "Aromatic spice", value: 5 },
      { label: "Vegetable contrast", value: 4 },
    ],
  },
  ingredients: [
    {
      name: "Tai pla sauce",
      role: "The defining salty fermented-fish-entrail seasoning. Commercial products and local preparations vary in fish source, salt, strength, solids and processing; it is part of the liquid base rather than proof of visible organ pieces.",
    },
    {
      name: "Cooked or dried fish",
      role: "Fish flesh can reinforce the broth and make the bowl substantial. Species, fresh-versus-dried form and amount vary, so confirm bones, texture and fish type when it matters.",
    },
    {
      name: "Dried chilli",
      role: "A heavy dried-chilli paste is a recurring Southern signal and can make the prepared batch genuinely hot. Chilli type and quantity change by cook; colour is not a reliable heat scale.",
    },
    {
      name: "Lemongrass · garlic · galangal",
      role: "Pounded aromatics sharpen the fermented base. Shallot and galangal appear in some documented structures while other formulas use a narrower paste.",
    },
    {
      name: "Turmeric · pepper · makrut lime",
      role: "Turmeric, black pepper, makrut-lime peel or leaf and other spices can add earth, warmth and citrus perfume. No single pictured leaf proves the complete paste.",
    },
    {
      name: "Shrimp paste branch",
      role: "Some curry pastes add kapi for more fermented seafood depth. That creates a crustacean boundary on top of the unavoidable fish in tai pla.",
    },
    {
      name: "Bamboo shoot · aubergine · beans",
      role: "Bamboo shoot, Thai aubergine and long or green beans are documented companions. Pumpkin, winter melon, baby corn, carrot or seasonal greens may replace or join them.",
    },
    {
      name: "Rice · fresh vegetables",
      role: "Plain jasmine rice and crisp raw vegetables can pace the salty heat. Service with noodles or a wider sharing set may appear, but the current venue—not the dish name—defines the plate.",
    },
  ],
  allergenCopy:
    "Fish is intrinsic because tai pla is a fermented fish seasoning and fish flesh may also be present. Shrimp paste adds crustacean; packaged tai pla, curry paste or seasoning can introduce soy or wheat; shared pots, ladles and preparation surfaces add cross-contact. Ask about the tai pla product, paste, fish, stock and every sauce—not only visible chunks.",
  vegetarianCopy:
    "Gaeng Tai Pla is not vegetarian or vegan: removing fish pieces does not remove the fermented fish base, and shrimp paste may be in the curry paste. A plant-based Southern curry without tai pla is a different adaptation. Halal diners should verify the fish source, fermentation product, shrimp paste, packaged sauces and shared kitchen rather than relying on the absence of meat.",
  formats: [
    {
      title: "Fish-and-vegetable curry bowl",
      bestFor:
        "Trying tai pla depth with cooked fish, a visible vegetable mix and enough broth to spoon over rice.",
      tradeOff:
        "Confirm fish form, bones, shrimp paste, heat and vegetable mix. Dark broth does not reveal soy, wheat or packaged seasoning.",
    },
    {
      title: "Rice plate with fresh greens",
      bestFor:
        "Using plain jasmine rice and cucumber, cabbage or beans to pace a small curry portion.",
      tradeOff:
        "Fresh sides cool the bite but do not make the curry mild or allergen-free. Check whether rice and vegetables are included and the current price.",
    },
    {
      title: "Small shared tasting",
      bestFor:
        "Comparing this broth-based Southern curry with drier or sour regional dishes without committing to a large hot portion.",
      tradeOff:
        "Shared ladles and plates increase cross-contact. Ask for a genuinely small serving; a prepared pot may not be adjustable to “not spicy”.",
    },
  ],
  orderSteps: [
    {
      title: "Name tai pla clearly",
      text: "Ask for Gaeng Tai Pla, Kaeng Tai Pla or แกงไตปลา and confirm the dark Southern fermented-fish curry. Do not confuse it with dry Khua Kling or sour Gaeng Som Pla.",
    },
    {
      title: "Check heat, fish and paste",
      text: "Ask how hot today’s pot is, which fish form is used, whether shrimp paste or packaged seasoning is present and whether bones remain. State fish, crustacean, soy, wheat or halal boundaries first.",
    },
    {
      title: "Choose rice and portion",
      text: "Start with a small portion, plain rice and fresh vegetables. Confirm what is included and check the current price before adding more curry or a wider shared set.",
    },
  ],
  cooking: {
    title: "Use prepared tai pla. Build the paste. Layer the bowl.",
    intro:
      "Tai pla is a specialised fermented seafood product, not a casual home-fermentation project. Choose one complete tested method using a reputable prepared product and follow its label, rather than combining an improvised fermentation with unrelated curry ratios.",
    steps: [
      "Select one complete tested formula and inspect the tai pla, fish, curry-paste ingredients, shrimp paste, vegetables, stock or water, seasoning and rice service before cooking.",
      "Keep fish and crustacean tools away from restricted food. Do not improvise fish-entrail fermentation; use a reputable prepared tai pla product and follow its storage and preparation directions.",
      "Pound or prepare the measured dried chilli, lemongrass, garlic, turmeric, pepper, makrut and any recipe-specific aromatics or shrimp paste to the method’s intended texture.",
      "Prepare the tai pla liquid exactly as the complete method directs. A documented method boils and strains it before returning the liquid to the pan, but product instructions and tested formulas take priority.",
      "Build the broth with the curry paste, then add vegetables in an order that respects their cooking needs. Add the chosen fish through the method’s safe cooking sequence without relying on colour alone.",
      "Adjust only within the tested formula and serve with rice and washed fresh vegetables. Follow current product and local food-safety guidance for hot holding, cooling, storage and reheating.",
    ],
    boundary:
      "Tai pla concentration, fish form, paste heat, vegetable size, pot volume and product processing change salinity, timing and safety. Use one complete tested method, the product label and current guidance. This traveller owner publishes no fermentation method, universal quantity, cooking time, storage period or Recipe schema.",
  },
  affiliates: [
    {
      href: "/go/simple-thai-food-cookbook/",
      title: "Simple Thai Food",
      text: "A tested Thai cookbook can place Southern curry technique, pastes and seafood handling in context. Check whether Gaeng Tai Pla or a relevant Southern curry appears in the current contents, then compare edition, seller, price and delivery.",
    },
    {
      href: "/go/thai-granite-mortar-eight-inch/",
      title: "Eight-inch granite mortar",
      text: "A stable mortar can grind dried chilli, fibrous aromatics and spices when a complete tested method calls for it. Compare current capacity, weight, care, seafood-allergen cleaning, worktop protection, seller, price and delivery.",
    },
  ],
  classHref: withSubId(
    KLOOK_GENERIC,
    "en-gaeng-tai-pla-southern-thai-cooking-class",
  ),
  classCopy:
    "A Southern Thai cooking class or food tour may explain tai pla, curry-paste heat and regional vegetables, but Klook menus change. Confirm the current option explicitly includes Gaeng Tai Pla or a comparable fermented-fish curry, then check hands-on work, fish and crustacean handling, heat, language, transport and cancellation terms.",
  classSignals: [
    {
      title: "Understand tai pla",
      text: "See how specialised fermented fish seasoning enters a broth without reducing the finished dish to visible “fish organs”.",
    },
    {
      title: "Read the paste",
      text: "Identify dried chilli, lemongrass, turmeric, pepper, makrut and possible shrimp paste before deciding whether the current batch fits.",
    },
    {
      title: "Balance the plate",
      text: "Use rice and fresh vegetables to pace the curry while keeping fish, crustacean and shared-pot checks intact.",
    },
  ],
  faqs: [
    {
      question: "What is Gaeng Tai Pla?",
      answer:
        "Gaeng Tai Pla is a Southern Thai curry or soup seasoned with tai pla, a salty fermented fish-entrail sauce. It commonly combines a hot aromatic curry paste with fish and vegetables and is served with plain rice and fresh vegetables.",
    },
    {
      question: "What is tai pla sauce?",
      answer:
        "Tai pla is a concentrated fermented fish seasoning associated with Southern Thai cooking. English sources variously describe fermented fish entrails or bladder sauce. Commercial products differ, so check the label, fish source, solids, salt and processing.",
    },
    {
      question: "Does Gaeng Tai Pla contain visible fish organs?",
      answer:
        "Not necessarily. Tai pla is normally used as a fermented seasoning in the liquid base; a documented method boils and strains it. The finished bowl may show fish flesh and vegetables instead. Preparation varies by kitchen and product.",
    },
    {
      question: "What does Gaeng Tai Pla taste like?",
      answer:
        "Expect intense fermented-fish savouriness, salt, strong dried-chilli and pepper heat, plus lemongrass, turmeric and makrut-like aroma. Vegetables can add bitterness, sweetness or crunch. Exact balance varies.",
    },
    {
      question: "Is Gaeng Tai Pla very spicy?",
      answer:
        "It is often among the hotter Southern curries, but no universal rating applies. The curry is usually made as a shared pot, so ask about the current batch and begin with a small portion rather than assuming “mai pet” can remake it.",
    },
    {
      question: "What are the ingredients in Gaeng Tai Pla?",
      answer:
        "Recurring signals include tai pla, fish, dried chilli, lemongrass, garlic, turmeric, pepper and makrut lime. Shrimp paste, galangal or shallot can join. Bamboo shoot, Thai aubergine, beans and other vegetables vary.",
    },
    {
      question: "Does Gaeng Tai Pla contain coconut milk?",
      answer:
        "Many documented versions build a dark water-based broth rather than a creamy coconut curry, but the name alone does not prove one formula. Ask the kitchen if coconut or another ingredient matters to you.",
    },
    {
      question: "How do you eat Gaeng Tai Pla?",
      answer:
        "Spoon a modest amount over plain jasmine rice and alternate with fresh vegetables. Some venues may offer different service formats. Because the curry is salty and hot, start small and check what the current portion includes.",
    },
    {
      question: "Is Gaeng Tai Pla gluten-free or halal?",
      answer:
        "Neither is automatic. Tai pla and basic fresh ingredients may contain no wheat, but packaged curry paste, sauces and shared pots can introduce it. Halal diners need verified fish, shrimp paste, fermentation products, sauces and preparation.",
    },
    {
      question: "How is Gaeng Tai Pla different from Khua Kling?",
      answer:
        "Gaeng Tai Pla is a broth-based fish-and-vegetable curry defined by fermented tai pla seasoning. Khua Kling is a dry Southern curry in which minced meat is stir-fried with paste until little free liquid remains. They should not share one owner.",
    },
  ],
  related: [
    {
      title: "Tom Som Pla",
      description:
        "Compare fermented tai pla depth with a separate Southern sour-fish-soup owner.",
      href: "/food/tom-som-pla/",
      image: "/images/redesign/tom-som-pla-thai-sour-fish-soup-hero.webp",
    },
    {
      title: "Khao Yam",
      description:
        "Move to a Southern herb-and-rice salad whose budu and component choices form a different eating system.",
      href: "/food/khao-yam/",
      image: "/images/redesign/khao-yam-southern-thai-rice-salad-hero.webp",
    },
    {
      title: "Southern Thailand",
      description:
        "Place the curry beside coastal cities, islands and the wider Southern food landscape.",
      href: "/region/southern/",
      image: "/images/regions/southern-thailand.webp",
    },
  ],
  sources: [
    {
      title: "Southern Thai Cuisine",
      creator: "Thailand Foundation",
      url: "https://thailandfoundation.or.th/?p=527684",
      note: "Current primary capture used for Southern regional context, intense aroma and chilli, vegetable accompaniment, rice and Gaeng Tai Pla as fish-gut soup. Universal heat and compulsory-service implications were excluded.",
    },
    {
      title: "Gaeng Tai Pla",
      creator: "ImportFood",
      url: "https://importfood.com/recipes/recipe/1288-gaeng-tai-pla",
      note: "Complete specialist DFS parse used for prepared tai pla, straining, dried fish, curry-paste and vegetable signals and rice service. Exact quantities, timings, origin, authenticity, product and superlative claims were excluded.",
    },
    {
      title: "Gaeng Tai Pla",
      creator: "Thai SELECT, Ministry of Commerce Thailand",
      url: "https://www.thaiselect.com/thai-cuisine/recipes/detail/3",
      note: "Current authoritative SERP capture used for owner and recipe intent. DFS returned zero body markdown, so no additional formula or claim was extracted.",
    },
    {
      title: "Thais Disappointed as Kaeng Tai Pla Voted “Worst Food”",
      creator: "Nation Thailand",
      url: "https://www.nationthailand.com/life/food/40036968",
      note: "Complete current capture used to contextualise the viral ranking as subjective and to triangulate fermented fish, hot paste, fish and vegetables. Ranking, must-try and popularity claims were excluded.",
    },
    {
      title: "Allergen Guidance for Food Businesses",
      creator: "UK Food Standards Agency",
      url: "https://www.food.gov.uk/business-guidance/allergen-guidance-for-food-businesses",
      note: "Current primary guidance used for fish, crustacean, soy, wheat and cross-contact boundaries.",
    },
    {
      title: "Cooking Your Food",
      creator: "UK Food Standards Agency",
      url: "https://www.food.gov.uk/safety-hygiene/cooking-your-food",
      note: "Current primary guidance used for safe fish cooking, hot holding, cooling and reheating boundaries without inventing one recipe.",
    },
  ],
  methodDescription:
    "Updated 28 July 2026 after two independent DataForSEO clusters with 27 raw keyword records and no returned competitor-domain table, ten current UK-English SERP sets with 71 organic result appearances, 44 People Also Ask appearances and 27 case-normalised unique questions, one complete specialist DFS parse, one zero-markdown Thai SELECT authority capture, current Thailand Foundation primary context, one complete Nation Thailand capture, supporting Southern travel context, current FSA guidance, plus exact owner ranking and backlink checks. “Gaeng tai pla” has UK volume 70 and KD 0; the route has zero ranking terms but one backlink from one referring domain, so its exact canonical was retained. Khua Kling, Gaeng Som Pla, Tom Som Pla, Pla Tom Kamin, Nam Budu, Pla Ra, generic fermented fish, retail tai pla, recipes, instant products, restaurants, rankings, calories, nutrition and health remain independent. Fixed-price, calorie, health, permanent-restaurant, universal-availability, universal-heat, compulsory-ingredient, exact-organ, fish-species, fermentation, origin, time, storage, automatic-dietary, guaranteed-cross-contact, first-hand, authenticity and superlative claims were excluded; Recipe schema is deliberately absent.",
};

export function GaengTaiPlaGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
