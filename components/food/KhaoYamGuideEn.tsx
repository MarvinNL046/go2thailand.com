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
  title: "Khao Yam: Southern Thai Rice Salad Guide",
  description:
    "Understand Khao Yam: Southern Thai herb rice salad, budu dressing, taste, ingredients, allergens, ordering, regional variations and safe preparation.",
  canonical: "https://go2-thailand.com/food/khao-yam/",
  updatedAt: "28 July 2026",
  name: "Khao Yam",
  thaiName: "ข้าวยำ · Southern Thai rice salad",
  heroImage: "/images/redesign/khao-yam-southern-thai-rice-salad-hero.webp",
  heroAlt:
    "Southern Thai Khao Yam with blue butterfly-pea rice, finely cut herbs, vegetables, pomelo, toasted coconut and budu dressing",
  heroEyebrow: "Southern Thai food · herbs, rice and budu",
  lead: "Khao Yam is a Southern Thai composed rice salad built for mixing: cooked rice, finely cut herbs, vegetables and fruit sit beside toasted coconut and crisp or seafood accents, then a sweet-salty-sour dressing brings the bowl together. Blue rice is familiar but optional, and fermented-fish budu is common rather than universal—so the useful question is what this cook has put into every component.",
  quickFacts: [
    {
      label: "Identity",
      value: "Rice · herbs · dressing",
      icon: UtensilsCrossed,
    },
    { label: "Texture", value: "Fresh · crisp · chewy", icon: Sparkles },
    { label: "Southern signal", value: "Budu often, not always", icon: MapPin },
    { label: "Check", value: "Fish · shrimp · sauces", icon: ShoppingBasket },
  ],
  navItems: [
    { href: "#taste", label: "Taste", icon: Sparkles },
    { href: "#ingredients", label: "Signals", icon: ShoppingBasket },
    { href: "#choose", label: "Choose", icon: UtensilsCrossed },
    { href: "#order", label: "Order", icon: MapPin },
    { href: "#cook", label: "Prepare", icon: ChefHat },
    { href: "#questions", label: "Questions", icon: Leaf },
  ],
  taste: {
    intro:
      "A well-balanced Khao Yam moves between fragrant green herbs, juicy or tart fruit, sweet-salty dressing and toasted savoury accents. Budu can add deep fermented-fish character without making every bowl taste identical. Chilli is adjustable, while the produce and sauce decide whether the finish leans brighter, sweeter or more savoury.",
    texture:
      "The pleasure comes from contrast after mixing: separate rice grains, feathery herbs, juicy fruit, crisp vegetables and brittle coconut or puffed rice. Dried seafood, egg or fried fish can add chew and crunch, but none is compulsory.",
    finish:
      "Makrut lime leaf and lemongrass can leave a citrus-herbal lift. Sour mango or pomelo sharpens it; coconut and sugar round it; budu, dried fish or shrimp lengthen the savoury finish. A regional coconut-based sauce changes that final impression.",
    scores: [
      { label: "Herb freshness", value: 5 },
      { label: "Sweet-salty", value: 4 },
      { label: "Sour fruit", value: 4 },
      { label: "Chilli heat", value: 2 },
    ],
  },
  ingredients: [
    {
      name: "Rice · natural colour",
      role: "White, brown, riceberry, black or naturally coloured rice can anchor the plate. Butterfly-pea blue is striking but not an authenticity requirement; rice handling still needs checking.",
    },
    {
      name: "Finely cut herbs",
      role: "Lemongrass, makrut lime leaf and local leaves can create the fragrant green layer. The exact combination, cut and availability change by region, season and cook.",
    },
    {
      name: "Vegetable crunch",
      role: "Cucumber, cabbage, long bean, sprouts and other local vegetables are examples rather than a mandatory list. Shared knives and pre-mixed garnish matter for dietary control.",
    },
    {
      name: "Fruit and acidity",
      role: "Sour green mango, pomelo and lime can add tartness and juice. Ripeness and region move the balance; fruit is part of the composition, not proof of a sweet salad.",
    },
    {
      name: "Toasted coconut",
      role: "Coconut commonly brings fragrance, richness and brittle texture. It may sit in the garnish or sauce, but is not universal and should be checked for coconut-free requirements.",
    },
    {
      name: "Budu · sauce branch",
      role: "Nam budu is a Southern Thai fermented-fish product often cooked into a sweet-salty dressing. Fish sauce, shrimp paste or a regional aromatic coconut curry may appear instead.",
    },
    {
      name: "Seafood · protein",
      role: "Ground dried fish, dried shrimp, crispy fish or egg can be mixed in or served alongside. Their absence on top does not prove the dressing or shared utensils are seafood-free.",
    },
    {
      name: "Chilli · crisp finish",
      role: "Fresh or dried chilli, puffed rice, peanuts, sesame, crispy shallot and other toppings vary. Choose heat and crunch only after checking the current garnish and cross-contact.",
    },
  ],
  allergenCopy:
    "Budu and fish sauce contain fish; dried shrimp, shrimp paste or shared seafood tools add crustacean risk. Coconut, soy, wheat/gluten, peanut, sesame and egg may appear in sauce, toppings or packaged seasoning. A rice-and-vegetable appearance does not prove gluten-free status—verify sauce labels, fried garnish and shared utensils.",
  vegetarianCopy:
    "Traditional-looking Khao Yam is not automatically vegetarian or vegan because fish can be hidden in budu, fish sauce, dried-fish powder or dressing, and shrimp may appear as paste or garnish. Ask for a separately made plant-led sauce and clean utensils. Halal status also requires current ingredient, supplier and preparation checks rather than an assumption based on Southern Thai or Malay influence.",
  formats: [
    {
      title: "Classic budu bowl",
      bestFor:
        "Experiencing the recognisable Southern balance of rice, herbs, vegetables, fruit, toasted coconut and fermented-fish dressing.",
      tradeOff:
        "Ask whether the sauce contains fish, shrimp paste, coconut, soy or wheat, which seafood toppings are included and how much chilli is already mixed in.",
    },
    {
      title: "Regional sauce variation",
      bestFor:
        "Seeing how a named local or family version changes the plate through rice colour, produce, dried seafood or an aromatic coconut-based sauce.",
      tradeOff:
        "Treat variation as information, not a fault. Confirm the sauce rather than assuming every dark dressing is budu or every pale sauce is vegetarian.",
    },
    {
      title: "Verified plant-led bowl",
      bestFor:
        "Keeping the rice-herb-fruit mixing experience while replacing fish-based dressing and seafood accents through a clearly described adaptation.",
      tradeOff:
        "Request a separately made sauce, check soy and wheat, and confirm utensils, frying oil and garnish are not shared when cross-contact matters.",
    },
  ],
  orderSteps: [
    {
      title: "Identify the dressing",
      text: "Ask for Khao Yam / ข้าวยำ, then check whether today’s sauce is nam budu, fish sauce, shrimp paste, a coconut-based regional sauce or a specifically plant-led alternative.",
    },
    {
      title: "Choose the additions",
      text: "Confirm dried fish, dried shrimp, egg, crispy fish, chilli, peanut, sesame and fried garnish before they are scattered over the plate. Blue rice, pomelo and mango are options rather than requirements.",
    },
    {
      title: "Dress, taste and mix",
      text: "Add a little dressing first, fold the separate ingredients through the rice and taste before adding more sauce or chilli. Mixing gradually preserves texture and avoids overwhelming the herbs and fruit.",
    },
  ],
  cooking: {
    title: "Cook the rice. Prepare separately. Mix at the table.",
    intro:
      "Khao Yam rewards organisation more than one rigid ingredient list. Start with a complete tested method, make the dressing and fresh components as separate controlled systems, and manage cooked rice safely before the final mix.",
    steps: [
      "Choose one complete tested Khao Yam method and decide the rice, natural colour, dressing, herbs, vegetables, fruit, coconut, seafood or plant-led protein, chilli and crisp garnish before shopping.",
      "Prepare budu or the selected dressing by the complete method. Check every bottled sauce, paste, stock and seasoning for fish, crustacean, soy, wheat, coconut and other allergens before substitutions.",
      "Cook rice with clean equipment and follow current rice-safety guidance. Cool it promptly if it will not be eaten hot, refrigerate as directed and avoid repeated cooling and reheating.",
      "Wash produce and prepare fine herbs, vegetables and fruit with clean boards, knives and containers. Keep ready-to-eat components away from raw seafood and allergen-contaminated tools.",
      "Toast coconut and prepare dried seafood, egg or crisp garnish by the tested method. Keep each component separate so diners can make informed choices and textures stay distinct.",
      "Assemble only when serving: surround the rice with the prepared components, add dressing gradually and mix thoroughly. Follow the tested method and current guidance for leftovers.",
    ],
    boundary:
      "Rice variety, cooling method, dressing composition, seafood and local produce change the safety and timing decisions. Use one complete tested method plus current food-safety guidance. This editorial owner deliberately gives no universal quantity, cooking time, storage period or Recipe schema.",
  },
  affiliates: [
    {
      href: "/go/simple-thai-food-cookbook/",
      title: "Simple Thai Food",
      text: "A tested Thai cookbook can supply complete sauce, rice and component quantities that this traveller guide should not invent. Check whether Khao Yam or a comparable composed Thai salad is included, then compare edition, format, seller, price and delivery.",
    },
    {
      href: "/go/zojirushi-six-cup-rice-cooker/",
      title: "Six-cup rice cooker",
      text: "Relevant only if its real capacity and programmes fit the tested rice method. Check current model, voltage, plug, local warranty, bowl care and seller; OneLink does not guarantee a UK-compatible version.",
    },
  ],
  classHref: withSubId(
    KLOOK_GENERIC,
    "en-khao-yam-southern-thai-rice-salad-class",
  ),
  classCopy:
    "A relevant Southern Thai cooking class or food tour can show how the herbs are cut, how budu is balanced and why the components stay separate until eating. Klook results are broad: confirm the current menu or stops include Khao Yam and check participation, sauce ingredients, allergens, language, transport and cancellation terms.",
  classSignals: [
    {
      title: "Herb preparation",
      text: "See how a cook selects and finely cuts fragrant leaves, lemongrass, vegetables and fruit without turning them into one generic salad mix.",
    },
    {
      title: "Dressing boundary",
      text: "Compare a documented budu dressing with the cook’s regional sauce, then identify fish, shrimp, coconut, soy, wheat and sweetness before tasting.",
    },
    {
      title: "Mixing rhythm",
      text: "Learn how rice colour, produce, coconut, seafood accents, crisp garnish and gradual dressing create contrast rather than a uniform bowl.",
    },
  ],
  faqs: [
    {
      question: "What is Khao Yam?",
      answer:
        "Khao Yam is a Southern Thai composed rice salad. Cooked rice is served with finely cut herbs, vegetables and fruit, often toasted coconut and seafood accents, then mixed with a sweet-salty-sour dressing commonly based on fermented-fish budu.",
    },
    {
      question: "What does Khao Yam mean?",
      answer:
        "Khao means rice and yam describes a Thai mixing or salad method, so the name is commonly understood as mixed rice or rice salad. English spellings include Khao Yum, Kao Yam and Kao Yum.",
    },
    {
      question: "What does Khao Yam taste like?",
      answer:
        "It is fresh, herbaceous, sweet-salty and tangy, with toasted and savoury depth from coconut, budu or dried seafood. Sour fruit and chilli vary, so one bowl can be bright and mild while another is more fermented or hot.",
    },
    {
      question: "What ingredients are in Khao Yam?",
      answer:
        "Rice, finely cut herbs, vegetables, fruit, toasted coconut and dressing form the core pattern. Lemongrass, makrut lime leaf, cucumber, beans, sprouts, sour mango, pomelo, budu, dried fish, dried shrimp, egg, puffed rice and chilli are documented possibilities, not one compulsory list.",
    },
    {
      question: "Why is some Khao Yam rice blue?",
      answer:
        "Butterfly-pea flowers can colour rice naturally blue and create a striking presentation. Blue is optional: white, brown, black, riceberry and other naturally coloured rice also appear in documented Khao Yam.",
    },
    {
      question: "Is Khao Yam spicy?",
      answer:
        "Not necessarily. The herb and dressing balance matters more than chilli, which can be mild, served separately or already included. Ask whether chilli is in the dressing or garnish.",
    },
    {
      question: "Is Khao Yam vegetarian or vegan?",
      answer:
        "Not automatically. Budu, fish sauce, shrimp paste, dried shrimp and ground dried fish may be hidden in dressing or topping. A plant-led version needs a clearly separate sauce plus checks on seasoning, garnish and shared utensils.",
    },
    {
      question: "Is Khao Yam gluten-free?",
      answer:
        "The rice and fresh produce may be naturally free from gluten, but the complete dish is not automatically gluten-free. Soy sauce, packaged seasoning, stock, fried toppings and shared preparation can introduce wheat or cross-contact.",
    },
    {
      question: "What is the difference between Khao Yam and Nasi Kerabu?",
      answer:
        "Both are coloured-rice traditions with herbs and strong regional ties across Southern Thailand and the Malay world. Khao Yam is the Thai rice-salad owner commonly mixed with a budu-style dressing; Nasi Kerabu has its own Malay accompaniments and identity. Their stories overlap but the names are not synonyms.",
    },
    {
      question: "How do you eat Khao Yam?",
      answer:
        "Drizzle on a little dressing, fold the herbs, vegetables, fruit, coconut and toppings through the rice, taste, then add more dressing or chilli if needed. Mixing just before eating keeps the fresh and crisp textures distinct.",
    },
  ],
  related: [
    {
      title: "Khao Mok Gai",
      description:
        "Continue through Southern Thai rice traditions with aromatic chicken biryani, green sauce and its own halal checks.",
      href: "/food/khao-mok-gai/",
      image: "/images/redesign/khao-mok-gai-thai-chicken-biryani-hero.webp",
    },
    {
      title: "Phuket food guide",
      description:
        "Explore the island’s Southern, Peranakan and seafood traditions with useful ordering boundaries.",
      href: "/city/phuket/food/",
      image: "/images/redesign/phuket-food-kopitiam.webp",
    },
    {
      title: "Hat Yai guide",
      description:
        "Build a Southern city route around markets, Thai-Malay food, transport and practical planning.",
      href: "/city/hat-yai/",
      image: "/images/redesign/hat-yai-destination-hero.webp",
    },
  ],
  sources: [
    {
      title: "Thai Rainbow Rice Salad (Khao Yum)",
      creator: "Hot Thai Kitchen",
      url: "https://hot-thai-kitchen.com/kao-yum/",
      note: "Complete DFS parse used for spelling variants, optional rice colour, variable produce, toasted coconut, pomelo, dried shrimp, budu-style dressing, mixing and optional chilli. Quantities and fixed storage claims were excluded.",
    },
    {
      title: "Iconic Dishes: What Is Khao Yam?",
      creator: "MICHELIN Guide",
      url: "https://guide.michelin.com/th/en/article/features/iconic-dishes-what-is-khao-yam",
      note: "Current live capture used for rice and natural-colour variation, produce flexibility, nam budu, dried seafood, sides, a Nakhon Si Thammarat sauce variation and unresolved origin theories.",
    },
    {
      title: "Anatomy of a Dish #1: Khao Yam",
      creator: "MICHELIN Guide",
      url: "https://guide.michelin.com/th/en/article/features/anatomy-of-a-dish-1-khao-yam",
      note: "Current live capture used narrowly for Southern Thai identity, rice-herb-vegetable-seafood composition and Malay culinary ties without assigning a settled inventor.",
    },
    {
      title: "Budu",
      creator: "Japan International Research Center for Agricultural Sciences",
      url: "https://www.jircas.go.jp/en/database/thaivege/041",
      note: "Complete DFS database capture plus current result used narrowly for budu as a Southern Thai fermented-fish product and its use with Khao Yam.",
    },
    {
      title: "Culture, Ways of Life and Wisdom – Part 2",
      creator: "Thailand Ministry of Foreign Affairs",
      url: "https://www.mfa.go.th/en/page/culture-ways-of-life-and-wisdom-part-2",
      note: "Current official capture used for the mixed-rice format, produce, coconut, dried-seafood and budu signals, rice colours and breakfast or lunch context. Medical claims were excluded.",
    },
    {
      title: "Allergen guidance for food businesses",
      creator: "UK Food Standards Agency",
      url: "https://www.food.gov.uk/business-guidance/allergen-guidance-for-food-businesses",
      note: "Current primary guidance used for fish, crustacean, coconut, soy, wheat, egg and cross-contact boundaries rather than automatic dietary claims.",
    },
    {
      title: "Home food fact checker",
      creator: "UK Food Standards Agency",
      url: "https://www.food.gov.uk/safety-hygiene/home-food-fact-checker",
      note: "Current primary guidance used for cooked-rice cooling, refrigeration and reheating boundaries without inventing one universal storage period.",
    },
  ],
  methodDescription:
    "Updated 28 July 2026 after two independent DataForSEO clusters with 58 raw keyword records and 50 competitor domains, ten current UK-English SERPs with 72 organic result appearances, 57 People Also Ask appearances and 38 case-normalised unique questions, two complete DFS source parses, current Michelin and Thai-government captures, current primary FSA guidance, plus exact owner ranking and backlink checks. “Khao Yam” returned UK volume 30; “Thai rice salad” returned volume 70 / KD 0 and “Southern Thai rice salad” volume 10. The owner has zero ranking terms and no reportable backlink summary signal. Nasi Kerabu, Nam Khao, Yam Naem Khao Tod, Khao Kluk Kapi, generic noodle salad, crispy rice, fried rice, health-bowl, retailer, calorie, detox, recipe-only and standalone budu intent remain independent. Fixed-price, calorie, health, automatic dietary or halal, permanent-restaurant, universal-heat or shelf-life, compulsory blue-rice, budu, seafood, fruit, coconut or vegetable-list, settled-origin, royal-inventor and one-formula claims were excluded; Recipe schema is deliberately absent.",
};

export function KhaoYamGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
