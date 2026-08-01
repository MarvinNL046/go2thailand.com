import {
  ChefHat,
  Leaf,
  MapPin,
  PackageCheck,
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
  title: "Khao Kan Jin: Northern Thai Blood Rice Guide",
  description:
    "Understand Khao Kan Jin, Khao Kan Chin or Khao Ngiao: its Tai Yai roots, rice, pig's blood, optional pork, banana-leaf parcel, taste, ordering and dietary checks.",
  canonical: "https://go2-thailand.com/food/khao-kan-jin/",
  updatedAt: "28 July 2026",
  name: "Khao Kan Jin",
  thaiName: "ข้าวกั้นจิ๊น · Khao Kan Chin · Khao Ngiao",
  heroImage: "/images/redesign/khao-kan-jin-northern-thai-blood-rice-hero.webp",
  heroAlt:
    "Opened Northern Thai Khao Kan Jin banana-leaf parcel with reddish-brown steamed rice, fried garlic, chilli, cucumber and coriander",
  heroEyebrow: "Tai Yai food · kneaded, wrapped and steamed",
  lead: "Khao Kan Jin is a savoury Northern Thai rice parcel with Tai Yai or Shan roots. Cooked rice is kneaded with pig's blood, seasoning and garlic oil, enclosed in banana leaf and steamed; minced pork appears in documented versions but not every one. Khao Kan Chin, Khao Ngiao and Chin Som Ngiao are useful names for the same owner—not separate dishes.",
  quickFacts: [
    { label: "Identity", value: "Rice · pig's blood", icon: UtensilsCrossed },
    { label: "Method", value: "Knead · wrap · steam", icon: ChefHat },
    { label: "Origin", value: "Tai Yai · Northern Thai", icon: MapPin },
    { label: "Check", value: "Blood · pork · seasoning", icon: ShoppingBasket },
  ],
  navItems: [
    { href: "#taste", label: "Taste", icon: Sparkles },
    { href: "#ingredients", label: "Signals", icon: ShoppingBasket },
    { href: "#choose", label: "Choose", icon: PackageCheck },
    { href: "#order", label: "Order", icon: MapPin },
    { href: "#cook", label: "Cook", icon: ChefHat },
    { href: "#questions", label: "Questions", icon: Leaf },
  ],
  taste: {
    intro:
      "The steamed rice is savoury, gently salty and rounded by garlic oil. Pig's blood colours and seasons the grains; it need not create one universal metallic flavour. A small amount of sugar appears in documented formulas, but the parcel belongs to a savoury meal rather than a dessert course.",
    texture:
      "The leaf-wrapped rice sets into a soft, cohesive parcel while retaining visible grains. Minced pork can add a tender, crumbly bite. Fried garlic, shallot and chilli provide the crisp contrast that the steamed centre does not.",
    finish:
      "Garlic oil gives richness, cucumber and sprouts can refresh the finish, and fried chilli moves the heat from mild to sharp one bite at a time. Banana leaf contributes aroma and shape; it does not mean the parcel contains sweet banana.",
    scores: [
      { label: "Savoury depth", value: 4 },
      { label: "Garlic richness", value: 4 },
      { label: "Soft rice", value: 5 },
      { label: "Optional chilli", value: 2 },
    ],
  },
  ingredients: [
    {
      name: "Cooked rice",
      role: "Warm cooked rice is mixed rather than served beside a sauce. Published descriptions do not justify calling every version sticky rice, so confirm the actual grain instead of assuming.",
    },
    {
      name: "Pig's blood",
      role: "Blood is worked through the rice before steaming, producing its reddish-brown colour and savoury identity. It remains present even when no meat pieces are visible.",
    },
    {
      name: "Optional minced pork",
      role: "Chiang Mai University's recorded formula includes minced pork while noting that some recipes omit it. No visible mince therefore does not make the parcel vegetarian or halal.",
    },
    {
      name: "Garlic · garlic oil",
      role: "Oil left from frying garlic may enrich the rice, while crisp garlic returns as garnish. Ask about the frying oil and shared equipment when those details matter.",
    },
    {
      name: "Salt · restrained sugar",
      role: "Salt and a little sugar can round the mixture. Balance changes by cook; the dish should not be merged with a sweet coconut-and-banana parcel.",
    },
    {
      name: "Lemongrass handling",
      role: "One documented method rubs or squeezes lemongrass leaves with the blood before mixing. It is an aroma-control variation, not proof that every parcel contains chopped lemongrass.",
    },
    {
      name: "Banana-leaf parcel",
      role: "Several leaf layers hold the rice while it steams and make the portion portable. Leaf wrapping alone does not identify the filling, sweetness or dietary status.",
    },
    {
      name: "Crisp and fresh sides",
      role: "Fried garlic, fried chilli, shallot or onion, cucumber, coriander and sprouts are documented companions. Garnish changes heat, crunch, allium exposure and shared-oil checks.",
    },
  ],
  allergenCopy:
    "The core published ingredients are not a complete allergen guarantee. Seasoning, stock, bottled sauce or shared prep can introduce soy, wheat, fish or other declared allergens, while fried garnish may use shared oil. Ask the vendor to check the rice mixture, seasoning, oil, garnish and steamer handling—not only the visible parcel.",
  vegetarianCopy:
    "Traditional Khao Kan Jin contains pig's blood and may also contain minced pork, so it is not vegetarian, vegan or automatically halal. A plant-led rice parcel wrapped in banana leaf can be a separate adaptation, but removing visible mince does not turn traditional Khao Kan Jin into one. Confirm blood, meat, stock, seasoning and shared equipment before ordering.",
  formats: [
    {
      title: "Blood rice with minced pork",
      bestFor:
        "The fuller documented expression: cooked rice kneaded with pig's blood, minced pork, salt, gentle sweetness and garlic oil before wrapping and steaming.",
      tradeOff:
        "Confirm the pork, blood, seasoning, cooking and garnish. Colour does not show whether the minced meat has reached a safe endpoint.",
    },
    {
      title: "Blood rice without visible mince",
      bestFor:
        "A leaner documented branch in which the rice-and-blood identity remains central even when minced pork is omitted or not apparent in the bite.",
      tradeOff:
        "Still not vegetarian, vegan or automatically halal. Ask directly about blood, stock, garlic oil, sauces and shared preparation.",
    },
    {
      title: "Separate plant-led parcel",
      bestFor:
        "A clearly labelled banana-leaf rice adaptation created without blood, pork, animal stock or animal-derived seasoning and prepared separately.",
      tradeOff:
        "It should not be represented as traditional Khao Kan Jin merely because its shape and wrapping look similar. Verify every ingredient and surface.",
    },
  ],
  orderSteps: [
    {
      title: "Name the parcel",
      text: "Ask for Khao Kan Jin, Khao Kan Chin, Khao Ngiao or Chin Som Ngiao and point to the savoury steamed rice parcel. Confirm it is not Nam Ngiao noodle soup or sweet Khao Tom Mat.",
    },
    {
      title: "Confirm blood and pork",
      text: "Ask whether pig's blood and minced pork are mixed through the rice, then check stock, seasoning, garlic oil, shared utensils and steamer contact for dietary or allergen needs.",
    },
    {
      title: "Choose the finish",
      text: "Add fried garlic, shallot, cucumber and herbs to taste. Keep fried chilli separate at first: the parcel can be gentle while the garnish is much hotter.",
    },
  ],
  cooking: {
    title: "Cook rice. Mix safely. Wrap and steam.",
    intro:
      "This is a raw-animal-ingredient rice mixture before steaming, not a finished bowl of rice folded into leaves for decoration. Use one complete tested method and separate the raw mixture from cooked rice, fresh garnish and serving tools.",
    steps: [
      "Choose one complete tested Khao Kan Jin method. Confirm its rice, blood, optional pork, seasoning, garlic oil, leaf preparation, parcel size, steaming endpoint and garnish before starting.",
      "Prepare and cook the specified rice as directed. Clean and prepare banana leaves through the chosen method, keeping the wrapping surface away from raw meat and blood containers.",
      "Handle pig's blood and any raw minced pork with dedicated hands, utensils and containers. Do not let them contact cucumber, coriander, sprouts, fried garnish or ready-to-eat rice.",
      "Mix the warm rice with the specified blood, pork branch, seasoning and oil only in the tested proportions. Colour or apparent dryness is not a safety test.",
      "Portion and close the banana-leaf parcels as the method directs, then steam until that complete method's safe endpoint is met throughout each parcel.",
      "Open with care around hot steam and serve using clean utensils. Add separately prepared garnish and follow current guidance for cooling, storage and reheating leftovers.",
    ],
    boundary:
      "Rice type, parcel thickness, blood treatment, pork content, leaf layers, steamer load and starting temperature all change the process. Use one complete tested method plus current food-safety guidance. This traveller owner deliberately gives no universal time, temperature, storage period or Recipe schema.",
  },
  affiliates: [
    {
      href: "/go/simple-thai-food-cookbook/",
      title: "Simple Thai Food",
      text: "A tested Thai cookbook can place Northern rice parcels and food handling in context and supply exact quantities that this traveller guide should not invent. Check whether Khao Kan Jin is in the current contents, then compare edition, format, seller, price and delivery.",
    },
    {
      href: "/go/zojirushi-six-cup-rice-cooker/",
      title: "Six-cup rice cooker",
      text: "Potentially useful when a complete method starts with accurately cooked rice. Check real capacity, local voltage, plug, warranty, bowl care and seller; OneLink does not guarantee that the current model suits the UK or your recipe.",
    },
  ],
  classHref: withSubId(
    KLOOK_GENERIC,
    "en-khao-kan-jin-northern-thai-rice-food-tour",
  ),
  classCopy:
    "A relevant Chiang Mai, Chiang Rai or Mae Hong Son food tour can introduce Tai Yai and Lanna market dishes, but Klook results are broad and menus change. Confirm the current stops explicitly include Khao Kan Jin, Khao Kan Chin or Khao Ngiao, then check blood, pork, allergens, language, transport and cancellation terms.",
  classSignals: [
    {
      title: "Name recognition",
      text: "Learn why several romanisations point to one parcel and why Nam Ngiao remains a separate noodle soup.",
    },
    {
      title: "Parcel method",
      text: "See how rice is mixed, leaf is prepared and garnish is kept crisp rather than assuming every banana-leaf parcel is sweet.",
    },
    {
      title: "Dietary questions",
      text: "Practise asking about pig's blood, minced pork, seasoning and shared preparation before the order is placed.",
    },
  ],
  faqs: [
    {
      question: "What is Khao Kan Jin?",
      answer:
        "Khao Kan Jin is a Northern Thai savoury rice parcel with Tai Yai or Shan roots. Cooked rice is mixed with pig's blood, seasoning and garlic oil, sometimes with minced pork, wrapped in banana leaf and steamed.",
    },
    {
      question: "Are Khao Kan Jin, Khao Kan Chin and Khao Ngiao the same dish?",
      answer:
        "They are commonly used names or romanisations for the same dish. Chiang Mai University also records Chin Som Ngio. Spelling varies because Northern and Thai words are being written in Latin letters.",
    },
    {
      question: "What does the name Khao Kan Chin mean?",
      answer:
        "Michelin explains that kan in the Northern dialect refers to kneading or mixing—the action used to work cooked rice together with pig's blood. Name translations vary, so the preparation is more reliable than a literal English label.",
    },
    {
      question: "Does Khao Kan Jin contain blood?",
      answer:
        "Yes. Pig's blood mixed through the rice is central to traditional Khao Kan Jin. It may not be visible as a separate piece, so a parcel without obvious meat is still not vegetarian or vegan.",
    },
    {
      question: "Does Khao Kan Jin always contain minced pork?",
      answer:
        "No. Chiang Mai University's record includes minced pork but explicitly notes that some recipes omit it. Pig's blood remains the defining animal ingredient, and stock or seasoning still needs checking.",
    },
    {
      question: "What does Khao Kan Jin taste like?",
      answer:
        "Expect soft savoury rice, gentle salt and garlic-oil richness, with sweetness kept restrained. Fried garlic and shallot add crunch; cucumber or sprouts add freshness; fried chilli controls much of the heat.",
    },
    {
      question: "Is Khao Kan Jin spicy?",
      answer:
        "The steamed parcel can be mild, while fried chilli served beside or over it can be much hotter. Ask for chilli separately and taste the rice before adding it.",
    },
    {
      question: "Is Khao Kan Jin gluten-free?",
      answer:
        "Not automatically. Rice itself may not contain gluten, but sauces, stock, seasoning, fried garnish and shared preparation can add wheat or cross-contact. Verify the complete mixture and service.",
    },
    {
      question: "Is Khao Kan Jin vegetarian, vegan or halal?",
      answer:
        "Traditional Khao Kan Jin is not vegetarian or vegan because it contains pig's blood and may contain pork. It is not automatically halal. A separate plant-led parcel needs its own ingredient and preparation check and is an adaptation, not the traditional dish.",
    },
    {
      question: "How is Khao Kan Jin different from Khao Tom Mat?",
      answer:
        "Khao Kan Jin is a savoury Northern rice parcel mixed with pig's blood and sometimes pork. Khao Tom Mat is a separate sweet glutinous-rice parcel commonly associated with banana and coconut. Both use banana leaf, but their fillings and eating occasions differ.",
    },
  ],
  related: [
    {
      title: "Nam Ngiao guide",
      description:
        "Separate the similarly named Northern tomato-and-meat noodle soup from this steamed rice parcel.",
      href: "/food/nam-ngiao/",
      image: "/images/redesign/nam-ngiao-northern-thai-noodles-hero.webp",
    },
    {
      title: "Mae Hong Son food guide",
      description:
        "Follow the Tai Yai food context into markets, regional plates and a quieter Northern travel base.",
      href: "/city/mae-hong-son/food/",
      image: "/images/redesign/mae-hong-son-tai-yai-food.webp",
    },
    {
      title: "Chiang Rai food guide",
      description:
        "Plan a Northern table around morning markets, rice parcels, chilli dips, noodles and local coffee.",
      href: "/city/chiang-rai/food/",
      image: "/images/redesign/chiang-rai-food-coffee.webp",
    },
  ],
  sources: [
    {
      title: "Khao kanchin – Lanna Food",
      creator: "Chiang Mai University Library",
      url: "https://lannainfo.library.cmu.ac.th/en_lannafood/detail_lannafood.php?id_food=178",
      note: "Current institutional capture used for Tai Yai identity, alternate names, optional minced pork, rice, pig's blood, garlic oil, banana-leaf parcel, steaming and service. Fixed quantities and timings were excluded.",
    },
    {
      title: "The Taste of Chiang Rai Province",
      creator: "MICHELIN Guide",
      url: "https://guide.michelin.com/th/en/article/features/gastronomy-journey-the-series-of-thailand-ep-2-the-taste-of-chiang-rai-province",
      note: "Current capture used for Khao Ngiao and Khao Kan Chin naming, Tai Yai-to-Lanna context, the Northern kan meaning, rice-and-blood mixing, lemongrass handling, banana-leaf steaming and garnish. Rankings were excluded.",
    },
    {
      title: "Khao kan jin",
      creator: "Austin Bush",
      url: "https://www.austinbushphotography.com/blog/blog/khao-kan-jin.html",
      note: "Complete DFS specialist parse used independently for Shan and Northern context, rice-and-blood identity, banana-leaf steaming, garlic oil, fried garlic and chilli, coriander and sprouts. First-person taste and old stall details were excluded.",
    },
    {
      title: "Allergen guidance for food businesses",
      creator: "UK Food Standards Agency",
      url: "https://www.food.gov.uk/business-guidance/allergen-guidance-for-food-businesses",
      note: "Current primary guidance used for ingredient disclosure and shared-preparation boundaries rather than automatic dietary claims.",
    },
    {
      title: "Cooking your food",
      creator: "UK Food Standards Agency",
      url: "https://www.food.gov.uk/safety-hygiene/cooking-your-food",
      note: "Current primary guidance used for raw minced-pork separation and safe cooking without inventing one universal time, temperature or storage period.",
    },
  ],
  methodDescription:
    "Updated 28 July 2026 after two independent DataForSEO clusters with two raw keyword records and no competitor-domain table, ten current UK-English SERPs with 84 organic result appearances, 55 People Also Ask appearances and 53 case-normalised unique questions, one complete specialist DFS parse, current CMU and Michelin captures, current FSA guidance, plus exact owner ranking and backlink checks. Exact Khao Kan Jin and Northern Thai blood rice heads had no measurable UK volume or KD; the owner has zero ranking terms and no reportable backlink signal. Khao Kan Jin, Khao Kan Chin, Khao Ngiao and Chin Som Ngiao are consolidated into this canonical owner; Nam Ngiao, Khao Tom Mat, Khao Soi, Khao Jee, Khao Niao, global blood dishes, recipe-only, restaurant, calorie, nutrition and health intent remain independent. Fixed-price, calorie, health, iron, permanent-stall, universal-availability, heat, sweetness, portion, time, temperature, shelf-life, automatic dietary or halal, compulsory mince, lemongrass or garnish, first-hand, best, national-dish, inventor and one-formula claims were excluded; Recipe schema is deliberately absent.",
};

export function KhaoKanJinGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
