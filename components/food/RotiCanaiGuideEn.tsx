import {
  ChefHat,
  CircleDot,
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
  title: "Roti Canai in Thailand: Curry Flatbread Guide",
  description:
    "Understand Roti Canai in Southern Thailand: its flaky griddled bread, curry and dhal choices, Roti Prata relationship, taste, ordering, halal and vegan checks.",
  canonical: "https://go2-thailand.com/food/roti-canai/",
  updatedAt: "28 July 2026",
  name: "Roti Canai",
  thaiName: "โรตีกะหรี่ · Southern Thai curry roti",
  heroImage: "/images/redesign/roti-canai-southern-thai-curry-hero.webp",
  heroAlt:
    "Flaky folded Roti Canai with bowls of lentil dhal and Southern curry in a Thai-Muslim breakfast setting",
  heroEyebrow: "Southern breakfast · stretch, fold and griddle",
  lead: "Roti Canai in Southern Thailand is a stretched, folded and griddled flatbread served with dhal or curry in a food culture shaped by Indian-Muslim, Malay and Thai connections. Its useful signals are crisp flaky edges, a soft layered centre and a separately chosen curry. It is not automatically the banana-and-condensed-milk street dessert, and it is not the filled bread called Mataba or Murtabak.",
  quickFacts: [
    {
      label: "Identity",
      value: "Layered griddled flatbread",
      icon: UtensilsCrossed,
    },
    { label: "Method", value: "Rest · stretch · fold", icon: ChefHat },
    { label: "Service", value: "Dhal · curry on the side", icon: CircleDot },
    {
      label: "Check",
      value: "Wheat · egg · dairy · curry",
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
      "Fresh Roti Canai is gently salty and rich from the griddle fat, with toasted wheat notes and a curry-controlled finish. Dhal can make the set earthy and mellow; fish, chicken, bean or massaman curry changes sweetness, acidity, heat and savoury depth.",
    texture:
      "The outside should show browned crisp patches and distinct folded layers while the centre stays soft, elastic and slightly chewy. Stretching thin and folding with fat creates that contrast; it is not the puffed crumb of naan or the dry thin structure of chapati.",
    finish:
      "Torn pieces absorb curry quickly while their outer edges retain some crispness. Eat in small portions and add curry gradually if you want to preserve the layering or control heat.",
    scores: [
      { label: "Crisp edges", value: 4 },
      { label: "Flaky layers", value: 5 },
      { label: "Soft chew", value: 4 },
      { label: "Curry heat", value: 3 },
    ],
  },
  ingredients: [
    {
      name: "Wheat flour",
      role: "Plain or higher-gluten wheat flour builds an extensible dough and means traditional Roti Canai is not gluten-free. Flour type changes chew, stretch and browning.",
    },
    {
      name: "Water · salt",
      role: "Water hydrates and salt seasons and strengthens the dough. Exact hydration and salt balance belong to one tested method rather than a universal formula.",
    },
    {
      name: "Egg branch",
      role: "Institutional Roti Prata records include egg in standard dough, while recipes and vendors vary. A plain order does not prove the dough is egg-free.",
    },
    {
      name: "Ghee · margarine · oil",
      role: "Fat coats, rests, stretches and griddles the dough into layers. Ghee contains dairy; margarine and oil need their own ingredient, halal and shared-griddle checks.",
    },
    {
      name: "Milk · condensed milk",
      role: "Milk or condensed milk can enter dough or sweet service variants. It may be invisible, so dairy and vegan checks must happen before the bread reaches the griddle.",
    },
    {
      name: "Rest · stretch",
      role: "Rested dough is oiled, stretched or flipped very thin and folded. Regional techniques vary; a quick roll-and-fry shortcut may produce a different texture.",
    },
    {
      name: "Fold · griddle",
      role: "Folding traps thin layers before the bread browns on a greased flat surface. Shared fat, spatulas and fillings affect allergen, meat and halal boundaries.",
    },
    {
      name: "Dhal · curry service",
      role: "Lentil dhal, bean curry, chicken curry, fish curry, massaman or another curry may accompany the bread. The ladle and curry base are separate ingredient systems.",
    },
  ],
  allergenCopy:
    "Roti Canai contains wheat and therefore gluten. Dough or griddle fat may contain egg, milk, ghee, margarine or soy; curry can add fish, crustacean, milk, nuts, soy or wheat, and shared tools can add cross-contact. Ask about dough, resting fat, griddle, fillings, curry base and ladle separately.",
  vegetarianCopy:
    "Plain Roti Canai is not automatically vegetarian or vegan: egg, ghee, milk, condensed milk or animal-derived griddle fat may be used, and curry can contain meat, fish, shrimp paste or stock. A halal-labelled venue is a useful signal but not a substitute for current certification, ingredient and shared-equipment checks. Choose a specifically verified dough, griddle fat and dhal or plant curry.",
  formats: [
    {
      title: "Plain roti with dhal",
      bestFor:
        "Keeping the bread's crisp-soft texture central while using a lentil or bean curry for an earthy, spoonable dip.",
      tradeOff:
        "Confirm egg, dairy, ghee, margarine, soy, stock, shared griddle and whether the dhal contains animal seasoning or shared ladles.",
    },
    {
      title: "Plain roti with meat or fish curry",
      bestFor:
        "A fuller Southern breakfast set where chicken, fish, massaman or another current curry supplies most of the spice and savoury depth.",
      tradeOff:
        "Check meat or fish species, bones, shellfish seasoning, dairy, nuts, halal status, heat, freshness and whether the curry is included or ordered separately.",
    },
    {
      title: "Verified plant-led set",
      bestFor:
        "A dough made without egg, dairy, ghee or animal fat, griddled separately and paired with a fully checked lentil, bean or vegetable curry.",
      tradeOff:
        "Plain appearance is not evidence. Confirm dough, fat, griddle, spatula, curry paste, stock and ladle before ordering.",
    },
  ],
  orderSteps: [
    {
      title: "Name the savoury set",
      text: "Ask for plain Roti Canai or roti with curry and point to the folded bread plus side bowl. Confirm it is not sweet banana roti, Roti Sai Mai or filled Mataba/Murtabak.",
    },
    {
      title: "Audit dough and griddle",
      text: "Ask about wheat, egg, milk, condensed milk, ghee, margarine, oil, soy and shared fillings. For halal or vegan needs, check both ingredients and current preparation.",
    },
    {
      title: "Choose the curry",
      text: "Ask what dhal, bean, chicken, fish, massaman or other curry is available now. Confirm meat, fish, shellfish, dairy, nuts, heat and whether a shared ladle is used.",
    },
  ],
  cooking: {
    title: "Mix. Rest. Stretch thin. Fold into layers.",
    intro:
      "The texture depends on dough development, rest, controlled fat, thin stretching, folding and griddle heat. Use one complete tested method; combining flour ratios and timings from several recipes removes the controls that make the dough workable.",
    steps: [
      "Choose one complete tested Roti Canai or closely related Roti Prata method. Confirm flour, water, salt, optional egg or milk, fat, rest schedule, shaping, griddle endpoint and service before starting.",
      "Mix and knead as directed, then portion and coat the dough with the specified fat. Label any egg, dairy, soy or substitute ingredients and keep them away from allergen-safe work areas.",
      "Rest for the complete method's stated conditions. Room temperature, dough size, flour strength and fat change extensibility, so do not replace the rest with one universal clock time.",
      "Oil the clean work surface and stretch, flip or roll the dough through the tested sequence until thin enough for that method. Stop before tearing rather than forcing a showy flip.",
      "Fold or coil as directed to create layers, then cook on the prepared griddle until the method's endpoint. Keep raw egg or meat-filled variants and their spatulas away from plain bread and ready-to-eat sides.",
      "Serve promptly with a separately prepared, safely held curry or dhal. Follow current guidance for leftovers rather than assuming the bread and curry share one storage rule.",
    ],
    boundary:
      "Flour strength, hydration, egg, milk, fat, rest, room temperature, stretch, fold, bread thickness and griddle heat all alter timing. Use one complete tested method plus current food-safety guidance. This traveller owner deliberately gives no universal time, temperature, storage period or Recipe schema.",
  },
  affiliates: [
    {
      href: "/go/simple-thai-food-cookbook/",
      title: "Simple Thai Food",
      text: "A tested Thai cookbook can place curry service, dough-adjacent techniques and Southern food in context without this traveller guide inventing quantities. Check whether roti or a suitable curry is in the current contents, then compare edition, format, seller, price and delivery.",
    },
  ],
  classHref: withSubId(KLOOK_GENERIC, "en-roti-canai-southern-thai-food-class"),
  classCopy:
    "A Southern Thai cooking class or food tour may show curry pastes, Muslim-influenced breakfasts or griddle breads, but Klook results are broad and menus change. Confirm the current class or stops explicitly include savoury roti with curry, then check hands-on dough work, dietary needs, language, transport and cancellation terms.",
  classSignals: [
    {
      title: "Dough structure",
      text: "See how resting and thin stretching support layers without treating a theatrical flip as the only authentic technique.",
    },
    {
      title: "Griddle control",
      text: "Watch the fold, fat and browning that create crisp edges and a soft centre rather than a dry flat disc.",
    },
    {
      title: "Curry pairing",
      text: "Learn why dhal, bean, fish, chicken or massaman curry changes the whole order and its allergen or halal boundary.",
    },
  ],
  faqs: [
    {
      question: "What is Roti Canai?",
      answer:
        "Roti Canai is a stretched, folded and griddled flatbread associated especially with Malaysia and related Indian-Muslim food traditions across the Malay Peninsula. In Southern Thailand it is commonly eaten with dhal or curry, particularly in a breakfast context.",
    },
    {
      question: "Can you get Roti Canai in Thailand?",
      answer:
        "Yes. Curry with roti is part of Southern Thailand's Muslim-influenced food culture. Names and service vary, so ask for plain savoury roti with curry rather than assuming every Thai roti stall sells the same set.",
    },
    {
      question: "What does Roti Canai taste like?",
      answer:
        "The bread is gently salty, toasted and rich from its griddle fat, with crisp flaky edges and a soft chewy centre. Dhal or curry supplies most of the spice, acidity, sweetness and savoury depth.",
    },
    {
      question: "What ingredients are in Roti Canai?",
      answer:
        "Wheat flour, water, salt and fat form the base. Egg, ghee, margarine, oil, milk, condensed milk or sugar appear in documented regional formulas. Curry or dhal is a separate ingredient system and also needs checking.",
    },
    {
      question: "Is Roti Canai the same as Roti Prata?",
      answer:
        "They are closely related regional flatbread traditions: Roti Canai is the familiar Malaysian name and Roti Prata the Singaporean name. Their migration history and stretch-fold-griddle method overlap, but dough, fat, fillings and service are not universally identical.",
    },
    {
      question: "How is Roti Canai different from Murtabak or Mataba?",
      answer:
        "Plain Roti Canai is folded layered bread served with curry or dhal. Murtabak or Mataba encloses a savoury filling such as egg, onion and meat before cooking. Vendors may share dough and griddles, but the ordering intent and allergen profile differ.",
    },
    {
      question: "Is Thai sweet roti the same as Roti Canai?",
      answer:
        "Not automatically. Thai street roti may be filled or topped with banana, condensed milk, sugar or chocolate and ordered as a sweet snack. This owner focuses on the savoury Southern curry set.",
    },
    {
      question: "Is Roti Canai vegan?",
      answer:
        "Not automatically. Dough or griddle fat may contain egg, ghee, milk, condensed milk, margarine or other animal-derived ingredients, while curry can contain meat, fish, shrimp paste or stock. Verify every component and shared surface.",
    },
    {
      question: "Is Roti Canai halal?",
      answer:
        "It may be sold in Muslim-run or halal-certified settings, but the word Roti Canai alone is not certification. Check current venue certification, fat, fillings, curry meat and stock, alcohol-containing ingredients and shared equipment.",
    },
    {
      question: "Is Roti Canai gluten-free?",
      answer:
        "No traditional wheat-flour Roti Canai is gluten-free. A different gluten-free flatbread would need a verified recipe plus separate flour, surface, rolling tools, griddle, fat and serving utensils.",
    },
  ],
  related: [
    {
      title: "Hat Yai food guide",
      description:
        "Build a Southern food route around morning markets, Thai-Muslim breakfasts, fried chicken and curries.",
      href: "/city/hat-yai/food/",
      image: "/images/redesign/hat-yai-food.webp",
    },
    {
      title: "Trang food guide",
      description:
        "Explore Trang's breakfast culture, station-area food and Malay-influenced Southern flavours.",
      href: "/city/trang/food/",
      image: "/images/redesign/trang-breakfast.webp",
    },
    {
      title: "Roti Sai Mai guide",
      description:
        "Compare this savoury layered curry bread with Ayutthaya's thin wrapper and spun-sugar sweet.",
      href: "/food/roti-sai-mai/",
      image:
        "/images/redesign/roti-sai-mai-ayutthaya-cotton-candy-roti-hero.webp",
    },
  ],
  sources: [
    {
      title: "9 Must-try Southern Thai Dishes",
      creator: "MICHELIN Guide Thailand",
      url: "https://guide.michelin.com/th/en/article/travel/9-must-try-southern-thai-dishes-recommended-by-michelin-restaurant-chefs",
      note: "Current capture used for Southern Muslim breakfast context and roti service with bean, massaman and other curries. Rankings and permanent restaurant claims were excluded.",
    },
    {
      title: "Kuala Lumpur Destination Guide – Eating Out",
      creator: "Tourism Malaysia",
      url: "https://ebrochures.malaysia.travel/en/kuala-lumpur/45-49-eating-out/",
      note: "Complete DFS parse used for light crisp wheat flatbread, pounding, stretching, tossing, griddling and dhal or chicken-curry service.",
    },
    {
      title: "20 Awesome and True Malaysian Breakfast",
      creator: "Tourism Malaysia",
      url: "https://www.malaysia.travel/explore/20-awesome-and-true-malaysian-breakfast",
      note: "Complete DFS parse used independently for Indian influence, dhal or fish-curry service and Mamak-stall breakfast context.",
    },
    {
      title: "Roti Prata",
      creator: "National Heritage Board Singapore",
      url: "https://www.roots.gov.sg/ich-landing/ich/roti-prata",
      note: "Current institutional capture used for migration and regional naming, variable ingredients, dough rest, coil, thin stretch, fold, griddle and crisp-outside/soft-inside texture.",
    },
    {
      title: "Beginner's Guide to Indian Breads",
      creator: "MICHELIN Guide Singapore",
      url: "https://guide.michelin.com/sg/en/article/dining-out/guide-to-indian-breads-2019",
      note: "Current capture used narrowly for parotta, prata and canai relationship and dhal, stuffed and sweet service branches.",
    },
    {
      title: "Allergen guidance for food businesses",
      creator: "UK Food Standards Agency",
      url: "https://www.food.gov.uk/business-guidance/allergen-guidance-for-food-businesses",
      note: "Current primary guidance used for wheat, egg, dairy, soy, fish, crustacean and shared-preparation boundaries.",
    },
  ],
  methodDescription:
    "Updated 28 July 2026 after two independent DataForSEO clusters with three raw keyword records and no competitor-domain table, ten current UK-English SERPs with 70 organic result appearances, 56 People Also Ask appearances and 46 case-normalised unique questions, two complete Tourism Malaysia DFS parses, current Michelin Thailand, Roots Singapore and Michelin Singapore captures, current FSA guidance, plus exact owner ranking and backlink checks. Roti Canai Thailand has UK volume 10 with no returned KD; the owner has zero ranking terms and no reportable backlink signal. Sweet Thai dessert roti, Roti Mataba, Murtabak, Roti Sai Mai, chapati, naan, paratha, parotta, generic curry, Malaysian food, recipe, restaurant, calorie and health intent remain independent. Fixed-price, calorie, health, permanent-stall, universal-availability, breakfast-only, curry, fat, egg, milk, rest, time, temperature, shelf-life, automatic dietary or halal, single-inventor, one-country, etymology, one-formula, first-hand, best-world, most-popular and national-dish claims were excluded; Recipe schema is deliberately absent.",
};

export function RotiCanaiGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
