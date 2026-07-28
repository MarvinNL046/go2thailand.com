import {
  ChefHat,
  Flame,
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
  title: "Nam Prik Noom: Northern Thai Green Chilli Dip",
  description:
    "Understand Nam Prik Noom before ordering: roasted green chillies, smoky taste, heat, ingredients, dietary checks, Lanna sides and how to eat it.",
  canonical: "https://go2-thailand.com/food/nam-prik-noom/",
  updatedAt: "28 July 2026",
  name: "Nam Prik Noom",
  thaiName: "น้ำพริกหนุ่ม · Nam Phrik Noom · Nam Prik Num",
  heroImage:
    "/images/redesign/nam-prik-noom-roasted-green-chilli-dip-hero.webp",
  heroAlt:
    "Coarse roasted Northern Thai Nam Prik Noom with sticky rice, vegetables, pork crackling and sliced Sai Ua",
  heroEyebrow: "Northern Thai dip · roasted green chilli · Lanna table",
  lead: "Nam Prik Noom is Northern Thailand’s hand-pounded dip of roasted young green chillies, shallots and garlic. Char brings smoke, the softened vegetables give a coarse, yielding texture, and fish sauce or another seasoning can add savoury depth. Sticky rice, vegetables and pork crackling are familiar partners—but neither the heat nor the hidden seasoning is fixed, so the smartest order starts with two quick checks.",
  quickFacts: [
    { label: "Region", value: "Northern Thailand · Lanna", icon: MapPin },
    {
      label: "Core",
      value: "Roasted green chilli · shallot · garlic",
      icon: ShoppingBasket,
    },
    {
      label: "Texture",
      value: "Coarse · soft · hand-pounded",
      icon: UtensilsCrossed,
    },
    { label: "Heat", value: "Variable · ask before ordering", icon: Flame },
  ],
  navItems: [
    { href: "#taste", label: "Taste", icon: Sparkles },
    { href: "#ingredients", label: "Signals", icon: ShoppingBasket },
    { href: "#choose", label: "Choose", icon: UtensilsCrossed },
    { href: "#order", label: "Order", icon: MapPin },
    { href: "#cook", label: "Method", icon: ChefHat },
    { href: "#questions", label: "Questions", icon: Leaf },
  ],
  taste: {
    intro:
      "The defining flavour comes from green chillies, shallots and garlic softened over heat until their edges char. That roasting changes fresh vegetal sharpness into smoke and gentle sweetness. Fish sauce can deepen the savoury side; salt, soy, lime, sugar or herbs appear in other documented expressions.",
    texture:
      "A recognisable Nam Prik Noom is soft enough to scoop but still visibly coarse, with strands and pieces of roasted chilli rather than a glossy purée. Some cooks pound it finer, yet it should not be assumed to be guacamole, pesto, curry or a bottled green sauce.",
    finish:
      "Green-chilli warmth lingers after the roasted aromatics, while sticky rice and vegetables soften the next bite. Pork crackling or Sai Ua can add crunch and richness, but the dip itself may already contain fish or another hidden savoury seasoning.",
    scores: [
      { label: "Smoky char", value: 5 },
      { label: "Green-chilli heat", value: 4 },
      { label: "Savoury depth", value: 4 },
      { label: "Coarse-soft texture", value: 5 },
    ],
  },
  ingredients: [
    {
      name: "Young green chillies · prik noom",
      role: "Long green chillies supply colour, flavour and heat. Prik noom is the name cue, but pepper variety, ripeness, seeds and substitutions change the result considerably.",
    },
    {
      name: "Roasted shallots",
      role: "Shallots soften and sweeten through roasting, rounding the chilli without turning the dip into a sweet relish. Onion substitutions exist but are not the defining signal.",
    },
    {
      name: "Roasted garlic",
      role: "Garlic becomes mellow and aromatic before pounding. Char level and clove size vary; blackened skin is normally removed through the chosen complete method.",
    },
    {
      name: "Fire · grill · broiler",
      role: "Direct heat blisters and softens the vegetables and creates the smoky identity. Charcoal, grill pan, dry pan or broiler can produce different aromas and moisture levels.",
    },
    {
      name: "Mortar texture",
      role: "Pounding combines the softened vegetables while keeping a rustic texture. A processor can make a useful adaptation, but a completely smooth green sauce misses an important eating cue.",
    },
    {
      name: "Fish sauce · salt · soy branch",
      role: "Fish sauce is common in documented versions, while salt or soy sauce can season others. This creates fish, soy, wheat, vegetarian and vegan questions that colour alone cannot answer.",
    },
    {
      name: "Lime · sugar · herbs",
      role: "Lime juice, palm sugar and coriander appear in some recipes, while simpler expressions omit them. Treat acidity, sweetness and garnish as kitchen choices rather than compulsory ingredients.",
    },
    {
      name: "Sticky rice · vegetables · crackling",
      role: "Glutinous rice, cabbage, cucumber, long beans, boiled vegetables, pork crackling and Sai Ua can build a Northern sharing set. They are service options, not proof of what is inside the dip.",
    },
  ],
  allergenCopy:
    "Fish sauce is a recurring hidden allergen. Some kitchens may use shrimp paste, soy sauce, packaged seasoning or a shared mortar, introducing fish, crustacean, soy, wheat and cross-contact concerns. Pork crackling, sausage and shared serving spoons create separate checks. Ask for the actual seasoning and preparation setup rather than judging the plain green appearance.",
  vegetarianCopy:
    "Nam Prik Noom is not automatically vegetarian or vegan. A salt-seasoned version can be plant-based, but fish sauce, shrimp paste, pork sides or shared equipment may still be involved; soy sauce can add soy and wheat. Request a deliberately fish-free and crustacean-free batch, verify its seasoning and utensils, and order vegetable or sticky-rice sides separately. Halal diners should also verify every sauce and meat accompaniment.",
  formats: [
    {
      title: "Classic roasted dip",
      bestFor:
        "Trying the coarse green-chilli, shallot and garlic identity with sticky rice or a small plate of vegetables.",
      tradeOff:
        "Ask whether fish sauce, shrimp paste, soy or another prepared seasoning is already pounded in; a finished batch usually cannot be separated afterwards.",
    },
    {
      title: "Verified meat-free batch",
      bestFor:
        "Keeping the roasted vegetables and mortar texture while using salt or a verified plant-based seasoning in separate equipment.",
      tradeOff:
        "Vegetable sides do not prove the dip is vegetarian. Confirm fish, crustacean, soy, wheat, stock and shared-mortar handling explicitly.",
    },
    {
      title: "Khan-toke sharing set",
      bestFor:
        "Exploring the dip beside sticky rice, boiled vegetables, pork crackling, Sai Ua and other Northern dishes in a wider Lanna meal.",
      tradeOff:
        "Each bowl and side has its own allergen and dietary boundary. Check the current set, portion, performance or transport details and price before booking or ordering.",
    },
  ],
  orderSteps: [
    {
      title: "Name the green roasted dip",
      text: "Ask for Nam Prik Noom, Nam Phrik Noom or น้ำพริกหนุ่ม and point to the coarse green dip. Confirm it is not red pork-and-tomato Nam Prik Ong or sweet roasted Nam Prik Pao.",
    },
    {
      title: "Check seasoning and heat",
      text: "Ask whether the prepared batch contains fish sauce, shrimp paste, soy, wheat or other packaged seasoning, then ask how hot this batch is. Removing visible seeds after pounding will not remove hidden seasoning.",
    },
    {
      title: "Choose dippers or a set",
      text: "Start with vegetables or sticky rice, or request a small Northern sharing set. Add pork crackling or Sai Ua only when wanted, and check the actual portion and current price before confirming.",
    },
  ],
  cooking: {
    title: "Roast deeply. Cool safely. Peel. Pound coarsely.",
    intro:
      "The useful method protects the dish’s roasted identity and rough texture. Choose one complete tested formula rather than mixing one writer’s pepper substitutions, another writer’s seasoning ratios and a third writer’s storage advice.",
    steps: [
      "Choose one complete tested recipe and identify its green chilli, shallot, garlic, seasoning, acidity, sweetness, garnish and serving system before shopping.",
      "Wash and prepare the vegetables as that method directs. Separate fish, crustacean, soy, wheat and other restricted ingredients and tools before roasting starts.",
      "Roast the chillies, shallots and garlic through the method’s chosen grill, pan, charcoal or broiler sequence until softened with controlled char. Heat source and vegetable size change the endpoint.",
      "Cool the roasted vegetables enough to handle through the complete method, then remove the specified skins, stems, seeds or pith. Use gloves when the chilli requires them and avoid touching eyes or face.",
      "Pound garlic and shallot with the softened chilli in the prescribed order until combined but still coarse. Keep allergen-free batches in separately cleaned equipment.",
      "Season gradually with the method’s fish sauce, salt, soy, lime, sugar or herbs, then serve with the selected rice and vegetables. Follow current local food-hygiene guidance for storage rather than one universal shelf-life claim.",
    ],
    boundary:
      "Pepper variety, seed and pith removal, vegetable size, heat source, char level, mortar size and seasoning all change flavour, heat and timing. Use one complete tested method and current safety guidance. This traveller owner deliberately publishes no universal quantities, timing, storage period or Recipe schema.",
  },
  affiliates: [
    {
      href: "/go/simple-thai-food-cookbook/",
      title: "Simple Thai Food",
      text: "A tested Thai cookbook can provide complete pepper, roasting, seasoning and storage instructions that this traveller guide should not invent. Check whether Nam Prik Noom is in the current contents, then compare edition, format, seller, price and delivery.",
    },
    {
      href: "/go/thai-granite-mortar-eight-inch/",
      title: "Eight-inch granite mortar",
      text: "A stable mortar can preserve the rough hand-pounded texture when the batch fits its usable bowl. Compare current dimensions, weight, care, worktop protection, allergen cleaning, seller, price and delivery; it is useful, not compulsory.",
    },
  ],
  classHref: withSubId(
    KLOOK_GENERIC,
    "en-nam-prik-noom-northern-thai-cooking-class",
  ),
  classCopy:
    "A Northern Thai cooking class, market visit or khan-toke experience may show roasting, mortar texture and Lanna service, but Klook inventory and menus change. Confirm the current option explicitly includes Nam Prik Noom or a comparable roasted dip, then check hands-on work, fish and crustacean allergens, substitutions, language, transport and cancellation terms.",
  classSignals: [
    {
      title: "Roast and recognise",
      text: "See how green chillies, shallots and garlic soften and char without confusing the result with raw salsa or a smooth bottled sauce.",
    },
    {
      title: "Pound for texture",
      text: "Compare hand-pounded roughness with processed texture and learn when the dip is cohesive without becoming a purée.",
    },
    {
      title: "Build the Northern set",
      text: "Match the current dip with sticky rice, vegetables and verified sides while keeping each allergen and dietary decision separate.",
    },
  ],
  faqs: [
    {
      question: "What is Nam Prik Noom?",
      answer:
        "Nam Prik Noom is a Northern Thai dip made around roasted young green chillies, shallots and garlic, pounded into a coarse soft relish. Fish sauce is common, while salt, soy, lime, sugar or herbs vary by kitchen.",
    },
    {
      question: "What is Nam Prik Noom in English?",
      answer:
        "It is usually described as Northern Thai roasted green-chilli dip. Nam Prik Num and Nam Phrik Noom are common romanised spellings of the same dish name; น้ำพริกหนุ่ม is useful when ordering.",
    },
    {
      question: "What does Nam Prik Noom taste like?",
      answer:
        "Expect smoky roasted green chilli, mellow shallot and garlic, savoury seasoning and variable heat. Some versions add lime, sugar or herbs, so sourness and sweetness are not fixed.",
    },
    {
      question: "Is Nam Prik Noom spicy?",
      answer:
        "It can be gentle, medium or hot depending on the chilli variety, ripeness, seeds, pith and recipe. The dip is usually prepared in advance, so ask about the current batch and begin with a small taste.",
    },
    {
      question: "What are the ingredients in Nam Prik Noom?",
      answer:
        "The recurring core is roasted green chilli, shallot and garlic. Fish sauce or salt seasons documented versions; soy, shrimp paste, lime, sugar, coriander and additional vegetables can appear, so request the actual ingredient list.",
    },
    {
      question: "How do you eat Nam Prik Noom?",
      answer:
        "Scoop it with sticky rice or dip fresh or boiled vegetables into it. Pork crackling and Sai Ua are familiar Northern partners, and the dip may form part of a shared khan-toke set. Sides vary by venue.",
    },
    {
      question: "Is Nam Prik Noom vegetarian or vegan?",
      answer:
        "Not automatically. Fish sauce or shrimp paste may be hidden in the dip and pork sides may share the platter. A verified plant-based batch needs suitable seasoning and separate preparation; soy sauce may still introduce soy or wheat.",
    },
    {
      question: "Is Nam Prik Noom gluten-free?",
      answer:
        "It may be when seasoned only with naturally gluten-free ingredients, but soy sauce, packaged seasoning and shared equipment can introduce wheat. Verify the complete batch and cross-contact rather than relying on its green appearance.",
    },
    {
      question:
        "What is the difference between Nam Prik Noom and Nam Prik Ong?",
      answer:
        "Nam Prik Noom is green and built around roasted chillies, shallots and garlic. Nam Prik Ong is a cooked red dip with tomato and minced pork. Both belong to Northern Thai food, but their bases and dietary checks are distinct.",
    },
    {
      question: "How is Nam Prik Noom different from other Thai dips?",
      answer:
        "Its roasted young-green-chilli identity separates it from tomato-and-pork Nam Prik Ong, shrimp-paste-led Nam Prik Kapi, sweet-savoury Nam Prik Pao and liquid Prik Nam Pla. Nam prik is a family, not one interchangeable sauce.",
    },
  ],
  related: [
    {
      title: "Nam Prik Ong",
      description:
        "Compare the roasted green dip with Northern Thailand’s distinct cooked pork-and-tomato chilli relish.",
      href: "/food/nam-prik-ong/",
      image: "/images/redesign/nam-prik-ong-lanna-dip-hero.webp",
    },
    {
      title: "Sai Ua",
      description:
        "Understand the fragrant Northern sausage that can join the dip, vegetables and sticky rice on a Lanna table.",
      href: "/food/sai-ua/",
      image: "/images/redesign/sai-ua-northern-sausage-hero.webp",
    },
    {
      title: "Chiang Mai guide",
      description:
        "Plan markets, neighbourhoods and Northern food context around a Chiang Mai stay without relying on one permanent vendor.",
      href: "/city/chiang-mai/",
      image: "/images/redesign/destination-chiang-mai.webp",
    },
  ],
  sources: [
    {
      title: "Northern Thai Cuisine",
      creator: "Thailand Foundation",
      url: "https://thailandfoundation.or.th/northern-thai-cuisine-opening/",
      note: "Current primary capture used for Northern cuisine context, sticky rice and Nam Phrik Noom as a roasted chilli paste. Broad regional flavour and fame claims were not converted into universal dish rules.",
    },
    {
      title: "Khan Toke: a Versatile Container of Northern Thai Tradition",
      creator: "Thailand Foundation",
      url: "https://thailandfoundation.or.th/th/khan-toke-a-versatile-container-of-the-northern-thai-tradition/",
      note: "Current primary capture used for green-chilli dip, pork crackling, vegetables, Sai Ua, glutinous-rice and soft-texture service context. Must-do, popularity and compulsory-side implications were excluded.",
    },
    {
      title: "Roasted Green Pepper Dip — Nam Prik Noom",
      creator: "Hot Thai Kitchen",
      url: "https://hot-thai-kitchen.com/bonus-nam-prik-noom/",
      note: "Complete specialist DFS parse used for roasted green chilli, shallot, garlic, fish-sauce or salt/soy branch, coarse pounding and familiar sides. Exact quantities, timings, personal and automatic gluten-free claims were excluded.",
    },
    {
      title: "Nam Prik Noom — Northern Thai Green Chilli Dip",
      creator: "Hungry in Thailand",
      url: "https://hungryinthailand.com/nam-prik-noom/",
      note: "Complete specialist DFS parse used independently for roasted vegetables, rough texture, salt branch, optional seasoning and service choices. Exact timing, storage, personal, fixed-heat and authenticity claims were excluded.",
    },
    {
      title: "Nam Phrig Noom — Northern Thai Pounded Roasted Chilli Dip",
      creator: "Serious Eats",
      url: "https://www.seriouseats.com/nam-phrig-noom-northern-thai-pounded-roasted-chili-dip-recipe",
      note: "Current first-place competitor capture used only for roasted-chilli-dip intent and ingredient-snippet triangulation because DFS returned zero body markdown. No formula was reproduced.",
    },
    {
      title: "Allergen Guidance for Food Businesses",
      creator: "UK Food Standards Agency",
      url: "https://www.food.gov.uk/business-guidance/allergen-guidance-for-food-businesses",
      note: "Current primary guidance used for fish, crustacean, soy, wheat and cross-contact boundaries instead of automatic dietary claims.",
    },
  ],
  methodDescription:
    "Updated 28 July 2026 after two independent DataForSEO clusters with 29 raw keyword records and 47 competitor domains, ten current UK-English SERP sets with 74 organic result appearances, 48 People Also Ask appearances and 25 case-normalised unique questions, four complete competitor or specialist DFS parses, two zero-markdown current competitor captures, two current Thailand Foundation primary captures, current FSA guidance, plus exact owner ranking and backlink checks. ‘Nam prik noom’ has UK volume 50 and KD 0; the route has zero ranking terms and no reportable backlink-summary signal. Nam Prik Ong, Nam Prik Pao, Nam Prik Kapi, Prik Nam Pla, generic salsa, bottled paste, recipes, retailers, restaurants, noodles, calories, nutrition and health remain independent. Fixed-price, calorie, health, permanent-restaurant, universal-availability, fixed-heat, compulsory-seasoning, exact-pepper, exact-time, shelf-life, automatic-dietary, guaranteed-cross-contact, inventor, settled-origin, first-hand, authentic-only, best, favourite, hidden-gem, must-eat, national-dish and most-popular claims were excluded; Recipe schema is deliberately absent.",
};

export function NamPrikNoomGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
