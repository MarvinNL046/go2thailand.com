import {
  ChefHat,
  Fish,
  Flame,
  MapPin,
  Shell,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { KLOOK_GENERIC, withSubId } from "../../lib/affiliates";
import {
  DishEditorialTemplate,
  type DishEditorialData,
} from "./DishEditorialTemplate";

const data: DishEditorialData = {
  title: "Nam Prik Kapi: Thai Shrimp Paste Chilli Dip",
  description:
    "Understand Nam Prik Kapi before ordering: fermented shrimp paste, salty-sour heat, ingredients, allergens, sides and how to eat this Thai chilli dip.",
  canonical: "https://go2-thailand.com/food/nam-prik-kapi/",
  updatedAt: "28 July 2026",
  name: "Nam Prik Kapi",
  thaiName: "น้ำพริกกะปิ · Nam Prik Gapi · Nam Phrik Kapi",
  heroImage: "/images/redesign/nam-prik-kapi-shrimp-paste-dip-hero.webp",
  heroAlt:
    "Thai Nam Prik Kapi shrimp paste chilli dip with vegetables, fried short mackerel, cha-om omelette and rice",
  heroEyebrow: "Thai chilli dip · fermented shrimp paste · shared table",
  lead: "Nam Prik Kapi is an intensely seasoned Thai dip built around kapi—salted, fermented shrimp paste—pounded with chilli, garlic, lime and a little sweetness. A small spoonful can season rice, raw or cooked vegetables, fish and omelette. It is savoury, sour and hot rather than a stand-alone bowl, and its crustacean base remains the first ordering check.",
  quickFacts: [
    { label: "Identity", value: "Fermented shrimp-paste dip", icon: Shell },
    {
      label: "Balance",
      value: "Salty · sour · hot · lightly sweet",
      icon: Sparkles,
    },
    { label: "Service", value: "Rice · vegetables · fish · egg", icon: Fish },
    { label: "Heat", value: "Variable · often assertive", icon: Flame },
  ],
  navItems: [
    { href: "#taste", label: "Taste", icon: Sparkles },
    { href: "#ingredients", label: "Signals", icon: Shell },
    { href: "#choose", label: "Choose", icon: UtensilsCrossed },
    { href: "#order", label: "Order", icon: MapPin },
    { href: "#cook", label: "Method", icon: ChefHat },
    { href: "#questions", label: "Questions", icon: Fish },
  ],
  taste: {
    intro:
      "Kapi supplies concentrated fermented seafood umami and salt. Fresh lime cuts through it, chilli brings immediate heat, garlic adds bite and palm sugar can round the edges. The useful balance is powerful but not fixed because shrimp pastes differ in salinity and aroma.",
    texture:
      "The dip is commonly loose enough to spoon yet still coarse from pounded chilli, garlic and optional pea aubergine. It is not curry, chilli jam or a smooth bottled seafood sauce; a little is meant to carry a larger bite of rice or vegetables.",
    finish:
      "Lime and chilli arrive quickly, then fermented shrimp depth lingers. Plain rice, cucumber, cabbage or aubergine reset the palate; mackerel and cha-om omelette make the wider plate richer and introduce separate allergens.",
    scores: [
      { label: "Fermented umami", value: 5 },
      { label: "Salty-sour balance", value: 5 },
      { label: "Chilli heat", value: 4 },
      { label: "Sweetness", value: 2 },
    ],
  },
  ingredients: [
    {
      name: "Kapi · fermented shrimp paste",
      role: "The defining base, usually made from small shrimp or krill fermented with salt. Product strength, species, saltiness and processing vary; crustacean is unavoidable in standard Nam Prik Kapi.",
    },
    {
      name: "Bird’s-eye chilli",
      role: "Fresh small chillies add fragrance and heat. Type, colour, seeds and quantity change the intensity, so one red or green appearance is not a reliable heat scale.",
    },
    {
      name: "Garlic",
      role: "Pounded garlic sharpens the fermented base and helps form the rough paste. Some documented versions also include shallot, but it is not compulsory.",
    },
    {
      name: "Fresh lime",
      role: "Lime juice loosens the dip and provides the sour counterweight. Calamansi or different lime levels appear in regional expressions; acidity is adjusted to the actual kapi.",
    },
    {
      name: "Palm sugar",
      role: "A restrained amount can soften salt, sourness and chilli without turning the dip into Nam Prik Pao. Other sweeteners and sweetness levels vary.",
    },
    {
      name: "Fish sauce · water",
      role: "Fish sauce can deepen or correct seasoning, while water can loosen an intense batch. Neither is universal; both change fish, salt and dilution decisions.",
    },
    {
      name: "Pea aubergine · regional additions",
      role: "Lightly bruised pea aubergine can add green colour and a crisp-bitter pop. Shallot, coriander root and Southern nam-chub variations demonstrate range, not one national formula.",
    },
    {
      name: "Rice · vegetables · fish · omelette",
      role: "Rice, cucumber, cabbage, beans, aubergines, short mackerel and cha-om omelette are familiar partners. Every side adds its own frying, fish, egg and cross-contact checks.",
    },
  ],
  allergenCopy:
    "Standard Nam Prik Kapi contains crustacean because kapi is fermented shrimp paste. Fish sauce and mackerel add fish; omelette and egg-coated vegetables add egg; packaged seasoning can add soy or wheat; shared mortars, fryers and serving spoons create cross-contact. Ask about the dip and every side separately.",
  vegetarianCopy:
    "Ordinary Nam Prik Kapi is neither vegetarian nor vegan because kapi is its defining shrimp-paste ingredient. Removing visible fish or choosing vegetables does not change that. A plant-based fermented dip can imitate the format, but it is a deliberate adaptation requiring verified seasoning and separate tools. Halal diners should verify the kapi, sauces, fish, egg, frying oil and shared preparation.",
  formats: [
    {
      title: "Classic kapi dip",
      bestFor:
        "Tasting the fermented-shrimp, lime, garlic and chilli balance in a small condiment bowl with rice.",
      tradeOff:
        "It is crustacean-based and often already fixed in heat. Confirm fish sauce, pea aubergine, sweetness and current portion before ordering.",
    },
    {
      title: "Vegetable-and-rice set",
      bestFor:
        "Using cucumber, cabbage, beans, aubergine and rice to pace an assertive dip.",
      tradeOff:
        "A vegetable platter is not vegetarian when the dip contains kapi. Check blanching water, shared spoons and any egg-coated vegetables.",
    },
    {
      title: "Fish-and-omelette plate",
      bestFor:
        "A fuller meal with fried or grilled short mackerel and cha-om or plain omelette alongside vegetables and rice.",
      tradeOff:
        "This adds fish, egg, fryer and halal questions. Check the current sides, portion and price rather than assuming a fixed set.",
    },
  ],
  orderSteps: [
    {
      title: "Name the kapi dip",
      text: "Ask for Nam Prik Kapi, Nam Prik Gapi or น้ำพริกกะปิ and point to the shrimp-paste condiment. Confirm it is not dried-shrimp Nam Prik Goong Siap or sweet Nam Prik Pao.",
    },
    {
      title: "Check heat and hidden seasoning",
      text: "Ask how hot the prepared batch is and whether it contains fish sauce, packaged seasoning, soy or wheat. State crustacean, fish, egg or halal boundaries before shared tools touch the plate.",
    },
    {
      title: "Build the plate",
      text: "Choose rice and vegetables first, then add mackerel, omelette or fried aubergine only if wanted. Confirm what is included and check the current price before ordering.",
    },
  ],
  cooking: {
    title: "Prepare the kapi. Pound aromatics. Balance by taste.",
    intro:
      "A complete tested method should control the shrimp-paste product, optional roasting, chilli, lime, sugar, texture and service as one system. Do not combine one source’s ratios with another source’s fermentation or storage assumptions.",
    steps: [
      "Choose one complete tested method and inspect the kapi label, chilli, garlic, lime, sweetener, optional shallot or pea aubergine, fish sauce and planned sides.",
      "Separate crustacean, fish, egg, soy and wheat tools. If the method roasts wrapped kapi, follow its ventilation and heat sequence rather than treating roasting as universally required.",
      "Pound garlic and chilli to the specified roughness, adding shallot only when the chosen method uses it.",
      "Work in the measured kapi and palm sugar until no concentrated clumps remain. Lightly bruise pea aubergine rather than pulverising it when included.",
      "Add lime and the method’s fish sauce or water gradually, tasting within safe ingredient handling. Balance against the actual kapi instead of chasing one fixed salty-sour-hot ratio.",
      "Serve a small bowl with prepared rice and vegetables, keeping fish and egg sides separate where needed. Follow current local storage guidance rather than one universal shelf-life claim.",
    ],
    boundary:
      "Kapi salinity, shrimp or krill source, chilli, lime, sweetener, optional roasting, mortar size and dilution all change the result. Use a tested complete method and product guidance. This traveller owner publishes no universal quantity, timing, raw-consumption advice, storage period or Recipe schema.",
  },
  affiliates: [
    {
      href: "/go/simple-thai-food-cookbook/",
      title: "Simple Thai Food",
      text: "A tested Thai cookbook can supply complete kapi, chilli, lime and food-handling instructions. Check the current contents for Nam Prik Kapi, then compare edition, format, seller, price and delivery.",
    },
    {
      href: "/go/thai-granite-mortar-eight-inch/",
      title: "Eight-inch granite mortar",
      text: "A mortar can create the rough integrated texture when the batch fits its usable bowl. Compare current size, weight, care, crustacean-allergen cleaning, worktop protection, seller, price and delivery.",
    },
  ],
  classHref: withSubId(KLOOK_GENERIC, "en-nam-prik-kapi-thai-cooking-class"),
  classCopy:
    "A Thai cooking class or food tour may explain kapi selection, mortar balance and the vegetable-fish plate, but Klook inventory changes. Confirm the current class or stops explicitly include Nam Prik Kapi or a shrimp-paste dip, then check crustacean handling, hands-on work, language, transport and cancellation terms.",
  classSignals: [
    {
      title: "Identify kapi",
      text: "Distinguish fermented shrimp-paste depth from dried-shrimp pieces, fish sauce and sweet roasted chilli jam.",
    },
    {
      title: "Balance the mortar",
      text: "See how chilli, garlic, lime and sugar respond to the saltiness of the actual kapi rather than one universal ratio.",
    },
    {
      title: "Build the plate",
      text: "Match a small dip portion with rice and vegetables, then add verified fish or egg sides separately.",
    },
  ],
  faqs: [
    {
      question: "What is Nam Prik Kapi?",
      answer:
        "Nam Prik Kapi is a Thai chilli dip whose defining ingredient is kapi, a salty fermented shrimp paste. Chilli, garlic, lime and some sweetness create a strong condiment eaten in small amounts with rice, vegetables and optional fish or egg dishes.",
    },
    {
      question: "What does kapi mean in Thai food?",
      answer:
        "Kapi is fermented shrimp paste, generally made from small shrimp or krill mixed with salt and fermented. Product strength and salinity vary. Nam Prik Gapi and Nam Phrik Kapi are spelling variants of the dish name.",
    },
    {
      question: "What does Nam Prik Kapi taste like?",
      answer:
        "It is intensely savoury and fermented, salty, sour from lime, hot from fresh chilli and often lightly sweet. The actual balance changes with the kapi and the cook.",
    },
    {
      question: "Is Nam Prik Kapi spicy?",
      answer:
        "It is often assertive, but chilli type and quantity vary. A prepared communal batch usually cannot be made mild after pounding, so ask and taste only a small amount first.",
    },
    {
      question: "What are the ingredients in Nam Prik Kapi?",
      answer:
        "A recurring core is kapi, fresh chilli, garlic, lime and palm sugar. Fish sauce, water, shallot, coriander root and pea aubergine appear in some expressions. Ask for the actual ingredient and sauce list.",
    },
    {
      question: "How do you eat Nam Prik Kapi?",
      answer:
        "Use a small spoonful with rice or dip raw, blanched or fried vegetables into it. Short mackerel, cha-om omelette and egg-fried aubergine are familiar partners, not guaranteed parts of every set.",
    },
    {
      question: "Is Nam Prik Kapi vegetarian or vegan?",
      answer:
        "No. Standard Nam Prik Kapi contains fermented shrimp paste. A shrimp-paste-free fermented dip is an adaptation and needs verified seasonings and separate equipment.",
    },
    {
      question: "Is Nam Prik Kapi gluten-free?",
      answer:
        "Not automatically. The core may contain no wheat, but soy sauce, packaged seasoning and shared equipment can introduce it. Verify the kapi label, every sauce and cross-contact.",
    },
    {
      question:
        "What is the difference between Nam Prik Kapi and Nam Prik Goong Siap?",
      answer:
        "Nam Prik Kapi is defined by fermented shrimp paste blended into the dip. Nam Prik Goong Siap is a Southern owner built around smoked or dried shrimp pieces. Both contain crustacean, but their texture and shrimp treatment differ.",
    },
    {
      question: "Is Nam Prik Kapi only a Southern Thai dish?",
      answer:
        "No. It is eaten beyond the South. Southern cooks also make shrimp-paste relishes called nam chub, but regional versions and names vary and should not all be treated as one fixed formula.",
    },
  ],
  related: [
    {
      title: "Nam Prik Goong Siap",
      description:
        "Compare fermented kapi with the Southern dip built around smoked or dried shrimp pieces.",
      href: "/food/nam-prik-goong-siap/",
      image:
        "/images/redesign/nam-prik-goong-siap-southern-dip-hero.webp",
    },
    {
      title: "Nam Prik Noom",
      description:
        "Move north to the roasted green-chilli dip whose core and dietary boundaries are different.",
      href: "/food/nam-prik-noom/",
      image:
        "/images/redesign/nam-prik-noom-roasted-green-chilli-dip-hero.webp",
    },
    {
      title: "Thai food guide",
      description:
        "Place chilli dips beside curries, noodles, salads and regional ordering decisions.",
      href: "/food/",
      image: "/images/redesign/thailand-food-hub-hero.webp",
    },
  ],
  sources: [
    {
      title: "Thai Shrimp Paste Dip — Nam Prik Gapi",
      creator: "Hot Thai Kitchen",
      url: "https://hot-thai-kitchen.com/shrimp-paste-dip/",
      note: "Complete specialist DFS parse used for kapi identity, balance, ingredient branches and vegetable, mackerel and omelette service. Personal, storage, substitute and superlative claims were excluded.",
    },
    {
      title: "Thai Nam Prik Kapi",
      creator: "Eating Thai Food",
      url: "https://www.eatingthaifood.com/thai-nam-prik-kapi-recipe/",
      note: "Complete DFS parse used independently for fermented shrimp paste, aromatics, optional roasting and pea aubergine, balance and service. Exact quantities, timings, personal and popularity claims were excluded.",
    },
    {
      title: "How To Make: Nam Phrik Kapi",
      creator: "Austin Bush",
      url: "https://www.austinbushphotography.com/blog/blog/how-to-make-nam-phrik-kapi.html",
      note: "Complete specialist DFS parse used for salted fermented shrimp, rough texture, four-way taste balance and vegetable or egg service. Always-served and most-well-known claims were excluded.",
    },
    {
      title: "Nam Chub — Thai Shrimp Paste Relish",
      creator: "Great British Chefs with Luke Farrell",
      url: "https://www.greatbritishchefs.com/recipes/southern-shrimp-paste-chilli-paste-recipe",
      note: "Complete DFS parse used for a Southern nam-chub branch with rice, herbs and vegetables. Restaurant, quality and universal Southern-table claims were excluded.",
    },
    {
      title: "Allergen Guidance for Food Businesses",
      creator: "UK Food Standards Agency",
      url: "https://www.food.gov.uk/business-guidance/allergen-guidance-for-food-businesses",
      note: "Current primary guidance used for crustacean, fish, egg, soy, wheat and cross-contact boundaries.",
    },
  ],
  methodDescription:
    "Updated 28 July 2026 after two independent DataForSEO clusters with 24 raw keyword records and no returned competitor-domain table, ten current UK-English SERP sets with 71 organic result appearances, 57 People Also Ask appearances and 35 case-normalised unique questions, four complete specialist or competitor DFS parses, current Thai-government context, current FSA guidance, plus exact owner ranking and backlink checks. “Nam prik kapi” has UK volume 30 and KD 40; the route has zero ranking terms and no reportable backlink-summary signal. Nam Prik Goong Siap, Nam Prik Noom, Nam Prik Ong, Nam Prik Pao, Prik Nam Pla, Nam Jim Seafood, Khao Kluk Kapi, generic shrimp paste, recipes, retailers, restaurants, calories, nutrition, health, storage and substitute-only intent remain independent. Fixed-price, calorie, health, permanent-restaurant, universal-availability, fixed-heat, compulsory-addition, exact-species, exact-fermentation, exact-time, storage, automatic-dietary, guaranteed-cross-contact, universal-raw-safety, inventor, settled-region, first-hand, authentic-only and superlative claims were excluded; Recipe schema is deliberately absent.",
};

export function NamPrikKapiGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
