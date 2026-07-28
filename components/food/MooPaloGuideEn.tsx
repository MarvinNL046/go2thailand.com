import {
  ChefHat,
  Drumstick,
  Egg,
  MapPin,
  Soup,
  Sparkles,
  Wheat,
} from "lucide-react";
import { KLOOK_GENERIC, withSubId } from "../../lib/affiliates";
import {
  DishEditorialTemplate,
  type DishEditorialData,
} from "./DishEditorialTemplate";

const data: DishEditorialData = {
  title: "Moo Palo: Thai Five-Spice Pork & Egg Stew Guide",
  description:
    "Understand Moo Palo before ordering: five-spice pork and eggs, Kai Palo and rice-plate names, sweet-salty taste, ingredients, allergens and dietary checks.",
  canonical: "https://go2-thailand.com/food/moo-palo/",
  updatedAt: "28 July 2026",
  name: "Moo Palo",
  thaiName: "หมูพะโล้ · Thai five-spice pork and egg stew",
  heroImage: "/images/redesign/moo-palo-five-spice-pork-eggs-hero.webp",
  heroAlt:
    "Thai Moo Palo with braised pork belly, brown-stained boiled eggs, tofu puffs, star anise, cinnamon and jasmine rice",
  heroEyebrow: "Thai-Chinese braise · pork, egg and warm spice",
  lead: "Moo Palo is a Thai-Chinese braise of pork and eggs in a dark, aromatic sweet-salty broth. Soy sauces, caramelised sugar and warm spices build colour and depth; coriander root, garlic and white pepper can sharpen the base. Kai Palo emphasises the eggs, while Khao Moo Palo describes the rice-service context—useful menu clues, not three unrelated dishes.",
  quickFacts: [
    { label: "Identity", value: "Five-spice pork and egg stew", icon: Soup },
    { label: "Names", value: "Moo · pork, Kai · egg", icon: Egg },
    { label: "Taste", value: "Sweet-salty · warm spice", icon: Sparkles },
    { label: "Check", value: "Egg · soy · wheat · mollusc", icon: Wheat },
  ],
  navItems: [
    { href: "#taste", label: "Taste", icon: Sparkles },
    { href: "#ingredients", label: "Signals", icon: Drumstick },
    { href: "#choose", label: "Choose", icon: Egg },
    { href: "#order", label: "Order", icon: MapPin },
    { href: "#cook", label: "Cook", icon: ChefHat },
    { href: "#questions", label: "Questions", icon: Soup },
  ],
  taste: {
    intro:
      "A familiar bowl is savoury and gently sweet rather than chilli-led. Soy, caramelised sugar and stock form the dark base; star anise, cinnamon and other warm spices perfume it without turning it into dessert. Pork fat rounds the broth, while white pepper and coriander root can keep the finish lively.",
    texture:
      "Slow-braised pork should be tender, with belly offering soft fat and meat layers and shoulder a leaner bite. Boiled eggs become firm and absorb the seasoned broth at the surface; tofu puffs drink in liquid and release it when bitten.",
    finish:
      "Warm spice and dark soy linger after the pork richness fades. Egg yolk softens the salty-sweet broth, while jasmine rice resets the palate. The result can be rich without needing chilli heat.",
    scores: [
      { label: "Sweet-salty balance", value: 4 },
      { label: "Warm spice", value: 4 },
      { label: "Soy depth", value: 5 },
      { label: "Pork richness", value: 5 },
    ],
  },
  ingredients: [
    {
      name: "Pork belly · pork shoulder",
      role: "Pork belly is a strong signal and supplies richness; shoulder is a documented leaner branch. Cut, skin, fat level and exact meat choice vary by kitchen.",
    },
    {
      name: "Hard-boiled eggs",
      role: "Eggs absorb colour and savoury-sweet flavour from the braise. Kai Palo puts them at the centre of the menu name, while Moo Palo foregrounds pork.",
    },
    {
      name: "Tofu puffs",
      role: "Fried tofu puffs can soak up broth through their airy centres. They add soy and shared-fryer questions and do not make an otherwise pork-based stew vegetarian.",
    },
    {
      name: "Soy sauce family",
      role: "Light, dark or black soy sauces can divide seasoning from colour. Golden Mountain-style seasoning or other sauces may join, creating soy and possible wheat boundaries.",
    },
    {
      name: "Palm sugar · caramel",
      role: "Sugar can be caramelised to build dark bittersweet depth before stock enters. Brown or other sugar substitutions exist; sweetness is not fixed across cooks.",
    },
    {
      name: "Star anise · cinnamon · five spice",
      role: "Warm spices give the braise its palo identity. Whole spices, coriander seed, Sichuan pepper or a prepared powder can vary, so one photographed star anise is not the full ingredient list.",
    },
    {
      name: "Coriander root · garlic · white pepper",
      role: "A pounded aromatic base can add earthy freshness and pepper warmth beneath the sweet soy broth. Stems may replace roots and exact paste formulas differ.",
    },
    {
      name: "Stock · rice service",
      role: "Pork or chicken stock can extend the braising liquid, while jasmine rice commonly carries the finished stew. Khao Moo Palo describes that rice-plate context; ask what sides and broth are included.",
    },
  ],
  allergenCopy:
    "Egg and soy are prominent. Regular soy and seasoning sauces can contain wheat; oyster sauce adds mollusc; tofu puffs may use a shared fryer; stock, spice blends and serving spoons can introduce other allergens or cross-contact. Dark colour and rice service do not prove gluten-free status. Ask about every sauce, stock, tofu and shared utensil.",
  vegetarianCopy:
    "Moo Palo is not vegetarian, vegan or halal by default: moo means pork, and the stew can contain pork belly, pork stock, egg, oyster sauce and tofu fried in shared oil. A separate plant-based five-spice braise would be an adaptation. Verify its stock, sauces, tofu, sweetener and tools rather than ordering the standard bowl without meat.",
  formats: [
    {
      title: "Moo Palo · pork-forward",
      bestFor:
        "Tender pork in a dark sweet-salty five-spice broth, commonly with eggs and sometimes tofu puffs, served as a shared stew or with rice.",
      tradeOff:
        "Confirm belly versus shoulder, skin and fat level, eggs, tofu, oyster sauce and stock; a dark broth does not reveal its complete sauce system.",
    },
    {
      title: "Kai Palo · egg-forward",
      bestFor:
        "The same practical stew family when the menu foregrounds brown-stained boiled eggs, often alongside pork and tofu puffs.",
      tradeOff:
        "Kai means egg, not vegetarian. Ask whether pork, animal stock, oyster sauce and soy-based wheat are still in the pot.",
    },
    {
      title: "Khao Moo Palo · rice plate",
      bestFor:
        "A composed meal where jasmine rice carries pork, egg and enough aromatic broth, with portion and sides visible before ordering.",
      tradeOff:
        "Ask what the current plate includes and check the posted price. Rice service changes the format, not the stew’s allergen or dietary boundaries.",
    },
  ],
  orderSteps: [
    {
      title: "Name the stew",
      text: "Ask for Moo Palo, Kai Palo or Khao Moo Palo and point to the dark five-spice pork-and-egg braise. Confirm it is not Moo Hong or Khao Kha Moo.",
    },
    {
      title: "Choose pork, egg and tofu",
      text: "Ask which pork cut is available and whether egg or tofu puffs are included. State egg, soy, wheat, mollusc or halal boundaries before the ladle reaches the shared pot.",
    },
    {
      title: "Choose rice and broth",
      text: "Confirm shared bowl versus rice plate, portion, sides and current price. Request more or less braising liquid only after checking what the service style allows.",
    },
  ],
  cooking: {
    title: "Build aroma. Control caramel. Braise gently.",
    intro:
      "The useful method separates the aromatic paste, sugar colour, sauce system, safe pork braise and egg finish. Choose one complete tested Moo or Kai Palo formula rather than combining spice lists, pressure-cooker timings and stovetop liquid ratios from different recipes.",
    steps: [
      "Choose one complete tested method and confirm pork cut, eggs, tofu, stock, soy sauces, oyster or seasoning sauce, sugar, whole spices, aromatic paste and rice service.",
      "Prepare coriander root or stems, garlic and white pepper through that method. Keep egg, soy, wheat, mollusc and other restricted tools separated and labelled.",
      "Toast or bag the chosen spices only as directed. If the method caramelises sugar, control colour carefully and add liquid through its safety sequence to avoid burns and bitter scorching.",
      "Combine stock, sauces, aromatics and pork, then braise through the complete method and current food-safety guidance. Cut and appliance change the endpoint.",
      "Cook and peel eggs safely, then add them at the method’s chosen stage so they gain flavour without assuming one mandatory texture. Add tofu puffs separately if used.",
      "Taste, remove whole spices as directed and serve with rice. Follow current guidance for hot holding, cooling, storage and reheating instead of relying on one traditional habit.",
    ],
    boundary:
      "Pork cut, piece size, egg preference, sauce salinity, sugar colour, pot type, pressure cooking and batch volume all change timing and liquid. Use one complete tested method plus current safety guidance. This traveller owner publishes no universal time, temperature, storage period or Recipe schema.",
  },
  affiliates: [
    {
      href: "/go/simple-thai-food-cookbook/",
      title: "Simple Thai Food",
      text: "A tested Thai cookbook can supply complete braising, spice and sauce ratios that this traveller guide should not invent. Check whether Moo Palo or Kai Palo appears in the current contents, then compare edition, format, seller, price and delivery.",
    },
    {
      href: "/go/zojirushi-six-cup-rice-cooker/",
      title: "Zojirushi rice cooker",
      text: "A rice cooker can handle the jasmine-rice side while the stew occupies the hob. Compare the current capacity, voltage, functions, seller, price and delivery; it is a convenience, not a requirement for Moo Palo.",
    },
  ],
  classHref: withSubId(KLOOK_GENERIC, "en-moo-palo-thai-cooking-class"),
  classCopy:
    "A Thai cooking class or food tour may cover five-spice braising, caramel and Thai-Chinese food, but Klook inventory and menus change. Confirm the current class or stops explicitly include Moo Palo, Kai Palo or a relevant soy braise, then check hands-on work, pork, egg, allergens, language, transport and cancellation terms.",
  classSignals: [
    {
      title: "Name and context",
      text: "Learn how moo, kai, khao and palo change the menu reading without treating each phrase as an unrelated recipe.",
    },
    {
      title: "Caramel and sauce",
      text: "See how controlled sugar colour, soy sauces, stock and warm spices build depth without one fixed sweetness.",
    },
    {
      title: "Braise and finish",
      text: "Compare pork cuts, egg timing and tofu absorption while keeping whole spices and rice service in balance.",
    },
  ],
  faqs: [
    {
      question: "What is Moo Palo?",
      answer:
        "Moo Palo is a Thai-Chinese five-spice braise built around pork and commonly boiled eggs in a dark sweet-salty soy-based broth. Pork belly, tofu puffs, palm sugar, warm spices and coriander-root aromatics are familiar signals, but recipes vary.",
    },
    {
      question: "What does Moo Palo mean?",
      answer:
        "Moo means pork. Palo refers to the aromatic five-spice-style braising family. Kai means egg, so Kai Palo foregrounds eggs; Khao Moo Palo indicates the pork braise served with rice.",
    },
    {
      question: "What are the ingredients in Moo Palo?",
      answer:
        "Common signals include pork belly or shoulder, boiled eggs, tofu puffs, soy sauces, palm sugar or caramel, stock, star anise, cinnamon, five-spice aromatics, coriander root, garlic and white pepper. Oyster or seasoning sauce can also appear.",
    },
    {
      question: "What does Moo Palo taste like?",
      answer:
        "Expect a rich sweet-salty soy broth, warm star-anise and cinnamon-like aroma, tender pork and savoury egg. White pepper and coriander root can add lift, but chilli heat is not the defining signal.",
    },
    {
      question: "Is Moo Palo spicy?",
      answer:
        "It is often mild in chilli terms, though white pepper and warm spices provide aromatic warmth. Individual kitchens can add chilli or stronger pepper, so ask rather than relying on one universal mild rating.",
    },
    {
      question: "What is the difference between Kai Palo and Moo Palo?",
      answer:
        "They belong to the same practical five-spice stew family. Kai Palo puts eggs in the name, while Moo Palo puts pork in the name; many bowls contain both, often with tofu puffs. Menu usage and proportions vary.",
    },
    {
      question: "What is Khao Moo Palo?",
      answer:
        "It is the Moo Palo pork braise served with rice. The rice-plate format can change portion and sides, but it does not remove egg, soy, wheat, oyster sauce, pork-stock or cross-contact concerns.",
    },
    {
      question: "How is Moo Palo different from Moo Hong?",
      answer:
        "Moo Palo centres a Thai-Chinese five-spice soy broth with eggs as a familiar partner. Moo Hong is a separate Phuket/Peranakan braised-pork owner with its own pepper, garlic, soy and spice balance; egg is not its defining signal.",
    },
    {
      question: "Is Moo Palo gluten-free?",
      answer:
        "Not automatically. Regular soy sauce, seasoning sauce, oyster sauce, spice blends, tofu puffs and shared utensils can contain wheat or introduce cross-contact. Verify every sauce and the shared pot.",
    },
    {
      question: "Can Moo Palo be vegetarian, vegan or halal?",
      answer:
        "The standard dish is not: moo means pork, and egg, pork stock and oyster sauce may also be present. A separate plant-based five-spice braise is an adaptation. Halal diners need verified meat, stock, sauces and separate preparation.",
    },
  ],
  related: [
    {
      title: "Moo Hong",
      description:
        "Compare the egg-and-five-spice Palo owner with Phuket’s distinct Peranakan pepper-garlic pork braise.",
      href: "/food/moo-hong/",
      image: "/images/redesign/moo-hong-phuket-braised-pork-hero.webp",
    },
    {
      title: "Gaeng Hang Lay",
      description:
        "Continue to a Northern pork curry whose ginger, tamarind and spice structure belongs to a different regional owner.",
      href: "/food/gaeng-hang-lay/",
      image: "/images/redesign/gaeng-hang-lay-braised-pork-hero.webp",
    },
    {
      title: "Thai food guide",
      description:
        "Place Thai-Chinese braises beside curries, soups, noodles, salads and regional ordering decisions.",
      href: "/food/",
      image: "/images/redesign/thailand-food-hub-hero.webp",
    },
  ],
  sources: [
    {
      title: "Culture Compass: Thai Cuisine Explained Part II",
      creator: "Royal Thai Embassy, Tel Aviv",
      url: "https://tteo.thaiembassy.org/th/content/culture-compass-thai-cuisine-explained-part-ii?menu=61712bcfd4efcd33ab7bd432",
      note: "Current primary capture used for Moo Palo as five-spice pork belly and eggs and its Chinese-import-refined-in-Thailand framing. Exact migration chronology, icon, popularity and one-formula implications were excluded.",
    },
    {
      title: "Thai Five-Spice Egg & Pork Belly Stew — Kai Palo",
      creator: "Hot Thai Kitchen",
      url: "https://hot-thai-kitchen.com/kai-palo/",
      note: "Complete specialist DFS parse used for Kai/Moo naming, pork, eggs, tofu, soy sauce family, palm sugar, stock, spices and aromatic signals. Quantities, timings, storage, personal, childhood, favourite, cafeteria and popularity claims were excluded.",
    },
    {
      title: "Moo Palo — Thai Pork Belly Stew with Eggs",
      creator: "Kikkoman Corporation",
      url: "https://www.kikkoman.com/en/cookbook/recipe/00055399.html",
      note: "Complete DFS parse used as an independent formula check for pork belly, egg, soy, palm sugar, coriander root, garlic, white pepper, cinnamon, star anise and five-spice. Brand necessity, quantities, timing and nutrition were excluded.",
    },
    {
      title: "Allergen guidance for food businesses",
      creator: "UK Food Standards Agency",
      url: "https://www.food.gov.uk/business-guidance/allergen-guidance-for-food-businesses",
      note: "Current primary guidance used for egg, soy, wheat, mollusc and cross-contact boundaries rather than automatic dietary claims.",
    },
    {
      title: "Cooking your food",
      creator: "UK Food Standards Agency",
      url: "https://www.food.gov.uk/safety-hygiene/cooking-your-food",
      note: "Current primary guidance used for safe pork and egg handling, hot holding, cooling and reheating boundaries without inventing one formula.",
    },
  ],
  methodDescription:
    "Updated 28 July 2026 after two independent DataForSEO clusters with 14 raw keyword records and no returned competitor-domain table, ten current UK-English SERP sets with 71 organic result appearances, 49 People Also Ask appearances and 25 case-normalised unique questions, one current Royal Thai Embassy primary capture, two complete specialist DFS parses, one zero-markdown competitor capture, current FSA guidance, plus exact owner ranking and backlink checks. “Moo Palo” has UK volume 40; Kai Palo comparison, rice service, recipe and local commercial variants show volume 10 where returned. The owner has zero ranking terms and no reportable backlink summary signal. Moo Hong, Khao Kha Moo, Moo Daeng, Moo Ping, Moo Yang, other Asian soy braises, recipes, slow cookers, restaurants, calories, nutrition and health remain independent. Fixed-price, calorie, health, permanent-restaurant, universal-availability, universal-mildness, compulsory-ingredient, exact-time, shelf-life, automatic-dietary, guaranteed-cross-contact, inventor, migration-chronology, first-hand, best, favourite, child-only, cafeteria-only, national-dish and most-popular claims were excluded; Recipe schema is deliberately absent.",
};

export function MooPaloGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
