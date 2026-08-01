import {
  ChefHat,
  Flame,
  Leaf,
  MapPin,
  Shell,
  Soup,
  Sparkles,
} from "lucide-react";
import { KLOOK_GENERIC, withSubId } from "../../lib/affiliates";
import {
  DishEditorialTemplate,
  type DishEditorialData,
} from "./DishEditorialTemplate";

const data: DishEditorialData = {
  title: "Kaeng Liang: Thai Peppery Vegetable Soup Guide",
  description:
    "Understand Kaeng Liang or Gaeng Liang: its peppery herbal taste, shrimp and vegetable signals, curry-versus-soup identity, ordering and dietary checks.",
  canonical: "https://go2-thailand.com/food/kaeng-liang/",
  updatedAt: "28 July 2026",
  name: "Kaeng Liang",
  thaiName: "แกงเลียง · peppery Thai vegetable gaeng",
  heroImage: "/images/redesign/kaeng-liang-peppery-vegetable-soup-hero.webp",
  heroAlt:
    "Clear Thai Kaeng Liang broth with shrimp, kabocha, angled gourd, mushrooms, baby corn and lemon basil",
  heroEyebrow: "Pepper, herbs and vegetables · not coconut curry",
  lead: "Kaeng Liang, also written Gaeng Liang, is a light brothy Thai gaeng whose warmth can come from pepper as much as chilli. A pounded shallot, pepper, fingerroot and shrimp-rich base meets flexible vegetables such as kabocha, gourd and mushrooms, then fragrant lemon basil. It may read as soup in English, but the paste-led base explains the Thai gaeng identity.",
  quickFacts: [
    { label: "Identity", value: "Brothy paste-led gaeng", icon: Soup },
    { label: "Heat", value: "Pepper first · chilli varies", icon: Flame },
    { label: "Aroma", value: "Fingerroot · lemon basil", icon: Leaf },
    { label: "Check", value: "Shrimp · fish · soy · wheat", icon: Shell },
  ],
  navItems: [
    { href: "#taste", label: "Taste", icon: Sparkles },
    { href: "#ingredients", label: "Signals", icon: Leaf },
    { href: "#choose", label: "Choose", icon: Soup },
    { href: "#order", label: "Order", icon: MapPin },
    { href: "#cook", label: "Cook", icon: ChefHat },
    { href: "#questions", label: "Questions", icon: Flame },
  ],
  taste: {
    intro:
      "The bowl is clear and light in body but not quiet in aroma. Pepper gives a dry, warming prickle; fingerroot and lemon basil make it distinctly herbal; shrimp paste or dried shrimp can add fermented marine depth. Sweet squash rounds the edges without turning the broth into a sweet curry.",
    texture:
      "Vegetables should keep their own identities: tender-rich pumpkin, juicy gourd, springy mushrooms and delicate leaves. Whole shrimp add firmness, while a well-ground paste disperses flavour without leaving a gritty mouthful.",
    finish:
      "Pepper and fingerroot can linger after the light broth fades. Lemon basil lifts the final aroma; shrimp paste or dried shrimp leaves a savoury, slightly funky note. A plant-led adaptation moves the umami toward fermented soybean or mushrooms.",
    scores: [
      { label: "Pepper warmth", value: 4 },
      { label: "Herbal lift", value: 5 },
      { label: "Savoury umami", value: 4 },
      { label: "Vegetable sweetness", value: 3 },
    ],
  },
  ingredients: [
    {
      name: "Shallot-led paste",
      role: "A pounded or blended paste distributes aromatics through the clear broth. Garlic may appear in some branches, but one universal paste is not part of this owner.",
    },
    {
      name: "White or black pepper",
      role: "Pepper supplies the signature dry warmth. Chilli can join it, yet a bowl can be notably peppery without behaving like a red-chilli curry.",
    },
    {
      name: "Fingerroot · krachai",
      role: "Fingerroot brings an earthy, resinous-citrus aroma that separates Kaeng Liang from many clearer vegetable soups. Ask about the actual paste when substitutions matter.",
    },
    {
      name: "Shrimp · dried shrimp",
      role: "Whole shrimp and dried shrimp can add texture and marine depth. Neither belongs to every deliberate adaptation, but both create a major crustacean boundary.",
    },
    {
      name: "Shrimp paste · seasoning",
      role: "Shrimp paste gives fermented umami and aroma. Plant-led versions may use fermented soybean, soy sauce or mushroom seasoning, which changes both identity and allergens.",
    },
    {
      name: "Kabocha · winter squash",
      role: "A sweet, creamy squash can give richness without coconut milk. Pumpkin type, amount and exact vegetable mix vary with the cook and season.",
    },
    {
      name: "Gourd · mushrooms · flexible vegetables",
      role: "Angled gourd or another light squash and Asian mushrooms are familiar roles. Baby corn, courgette and greens can join; appearance never proves the base or dietary status.",
    },
    {
      name: "Lemon basil · branch-specific herbs",
      role: "Maeng lak gives a citrusy herbal finish to a familiar mixed-vegetable bowl. A named Gaeng Liang Ga Prau branch uses holy basil with fish and banana blossom, so basil names are not interchangeable.",
    },
  ],
  allergenCopy:
    "Shrimp, dried shrimp and shrimp paste make crustaceans the clearest common concern. Fish sauce or fish branches, soy-based vegan seasoning, wheat in sauces, and shared mortars, ladles, stockpots and chopping boards add further risks. Removing visible shrimp does not remove a paste or broth allergen. Ask about the paste, stock, seasoning and shared tools.",
  vegetarianCopy:
    "Kaeng Liang is not vegetarian, vegan or halal by default. A vegetable-heavy bowl may still contain shrimp paste, dried shrimp, whole shrimp, fish sauce or fish stock. A deliberately remade version can use fermented soybean, soy sauce, mushrooms and separate tools, but confirm every substitution instead of inferring from the vegetables.",
  formats: [
    {
      title: "Shrimp and vegetable bowl",
      bestFor:
        "The familiar contrast of peppery paste, marine umami, sweet squash, lighter gourd, mushrooms and aromatic lemon basil.",
      tradeOff:
        "Check whole shrimp, dried shrimp, shrimp paste, fish sauce and stock separately; one visible ingredient never describes the complete base.",
    },
    {
      title: "Verified plant-led adaptation",
      bestFor:
        "A purpose-built version using fermented soybean or another declared plant seasoning, varied vegetables and separately checked tools.",
      tradeOff:
        "Soy and wheat may replace shellfish as allergen concerns, and a restaurant vegetable label does not prove a remade paste or stock.",
    },
    {
      title: "Named fish or herb branch",
      bestFor:
        "Exploring related Kaeng Liang Ga Prau or Ka Prao forms with grilled fish, banana blossom and holy basil.",
      tradeOff:
        "Confirm the exact Thai name, fish, paste and basil. A related branch should not be presented as the mandatory mixed-vegetable formula.",
    },
  ],
  orderSteps: [
    {
      title: "Confirm Kaeng Liang",
      text: "Ask for Kaeng or Gaeng Liang and point to the clear peppery vegetable gaeng. Confirm it is not coconut curry, Tom Yum, Gaeng Som, Gaeng Om or Tom Kha.",
    },
    {
      title: "Ask what builds the base",
      text: "Check shrimp paste, dried shrimp, fish sauce, stock and whole shrimp before ordering. For a plant-led request, verify the replacement paste and shared mortar rather than asking only to remove shrimp.",
    },
    {
      title: "Read vegetables and heat",
      text: "Ask which squash, gourd, mushrooms and basil are in the current pot, then distinguish pepper warmth from added chilli. A premade paste may limit heat changes.",
    },
  ],
  cooking: {
    title: "Pound the base. Stage the vegetables. Finish with leaves.",
    intro:
      "The useful method protects contrast: build one tested aromatic paste, disperse it in the broth, add slow-cooking vegetables before delicate ones, cook seafood safely, and add fragrant leaves at the method’s intended endpoint. Do not merge ratios from unrelated clear soups or curries.",
    steps: [
      "Choose one complete tested Kaeng Liang method. Confirm its pepper, shallot, fingerroot, shrimp or plant seasoning, broth, vegetables, herbs and optional chilli.",
      "Pound or blend the paste through that method. Keep crustacean, fish, soy and wheat equipment separated and labelled where restrictions require it.",
      "Bring the tested broth and paste together, then add firm squash or other slow-cooking vegetables in the method’s sequence rather than dropping every vegetable in at once.",
      "Add lighter gourd, mushrooms, corn or greens according to their texture needs. Use the tested doneness cues so the bowl remains varied rather than uniformly soft.",
      "Cook whole shrimp, fish or another protein through current safety guidance. Do not use colour alone to determine a safe endpoint.",
      "Finish with lemon basil or the named branch’s herb at the intended point, then serve promptly. Follow current guidance for hot holding, cooling, storage and reheating.",
    ],
    boundary:
      "Paste strength, vegetable size, seafood, batch volume and plant-led substitutions all change timing and salt balance. Use one complete tested method plus current food-safety guidance. This traveller owner publishes no universal quantity, time, temperature, storage period or Recipe schema.",
  },
  affiliates: [
    {
      href: "/go/simple-thai-food-cookbook/",
      title: "Simple Thai Food",
      text: "A tested Thai cookbook can supply complete paste, broth and vegetable sequencing that this traveller guide should not invent. Check whether Kaeng Liang appears in the current contents, then compare edition, format, seller, price and delivery.",
    },
    {
      href: "/go/thai-granite-mortar-eight-inch/",
      title: "Thai granite mortar",
      text: "A heavy mortar can help build a cohesive pepper, shallot and fingerroot paste. Check the current dimensions, weight, seller, price and delivery before buying; use separate equipment when allergen control matters.",
    },
  ],
  classHref: withSubId(KLOOK_GENERIC, "en-kaeng-liang-thai-cooking-class"),
  classCopy:
    "A Thai cooking class or food tour may cover pounded curry bases, vegetables and herbal soups, but Klook inventory and menus change. Confirm the current class or stops explicitly include Kaeng Liang or a relevant paste-led vegetable gaeng, then check hands-on pounding, seafood, allergens, language, transport and cancellation terms.",
  classSignals: [
    {
      title: "Paste recognition",
      text: "Learn how pepper, shallot, fingerroot and fermented seasoning create depth without a coconut-heavy curry base.",
    },
    {
      title: "Vegetable staging",
      text: "See why pumpkin, gourd, mushrooms, corn and leafy herbs enter at different points rather than one fixed moment.",
    },
    {
      title: "Herb finish",
      text: "Compare lemon basil with branch-specific herbs and understand why one English word for basil is not precise enough.",
    },
  ],
  faqs: [
    {
      question: "What is Kaeng Liang?",
      answer:
        "Kaeng Liang, also written Gaeng Liang, is a Thai peppery mixed-vegetable gaeng with a light broth. Familiar versions use an aromatic paste, shrimp or shrimp-rich seasoning, squash, gourd, mushrooms and lemon basil, but formulas vary.",
    },
    {
      question: "Is Kaeng Liang a curry or a soup?",
      answer:
        "Both descriptions can help. Its clear, light liquid reads as soup in English, while Thai culinary usage calls it gaeng because a pounded herb-and-spice paste flavours the brothy dish. Coconut thickness is not required for that identity.",
    },
    {
      question: "What does Kaeng Liang taste like?",
      answer:
        "Expect dry pepper warmth, herbal fingerroot and lemon-basil aroma, savoury fermented depth and gentle sweetness from squash. Shrimp paste or dried shrimp can add a distinctly marine, slightly funky finish.",
    },
    {
      question: "Is Kaeng Liang spicy?",
      answer:
        "It is commonly peppery, and some formulas add chilli. That makes the warmth different from a red-chilli-dominant curry. Ask whether chilli is already in the paste and distinguish pepper intensity from chilli heat.",
    },
    {
      question: "What vegetables are used in Kaeng Liang?",
      answer:
        "Kabocha or another winter squash, angled gourd or a lighter summer squash, mushrooms, baby corn and greens are useful signals. The vegetable set is flexible, seasonal and cook-dependent rather than one fixed list.",
    },
    {
      question: "Does Kaeng Liang contain shrimp?",
      answer:
        "Many familiar versions contain whole shrimp, dried shrimp, shrimp paste or more than one of these. A fish branch or deliberately plant-led adaptation also exists. Ask about the paste, stock and seasoning even when no shrimp is visible.",
    },
    {
      question: "Is Kaeng Liang vegetarian or vegan?",
      answer:
        "Not by default. Vegetable-heavy restaurant bowls can still contain shrimp paste, dried shrimp, fish sauce or animal stock. A verified adaptation can use fermented soybean or mushroom seasoning, but soy, wheat and shared tools then need checking.",
    },
    {
      question: "Does Kaeng Liang contain coconut milk?",
      answer:
        "A familiar Kaeng Liang is a clear, light gaeng and does not need coconut milk for its identity. Modern or individual recipes can vary, so ask the current kitchen if coconut or another creamy ingredient matters.",
    },
    {
      question: "How is Kaeng Liang different from Tom Yum?",
      answer:
        "Kaeng Liang centres pepper, fingerroot, a pounded paste, mixed vegetables and often shrimp-rich fermented depth. Tom Yum centres a hot-sour aromatic broth associated with lemongrass, makrut lime and lime acidity. Neither has one universal formula.",
    },
    {
      question: "What is Kaeng Liang Ga Prau?",
      answer:
        "It is a related named branch documented with a pepper-and-shrimp-paste base, grilled fish, banana blossom and holy basil. It shows that Kaeng Liang has genuine branches; it should not replace the main mixed-vegetable description.",
    },
  ],
  related: [
    {
      title: "Tom Yum Goong",
      description:
        "Compare Kaeng Liang’s pepper, fingerroot and vegetables with a brighter lemongrass-lime hot-and-sour shrimp soup.",
      href: "/food/tom-yum-goong/",
      image: "/images/redesign/tom-yum-goong-hero.webp",
    },
    {
      title: "Tom Som Pla",
      description:
        "Continue into a clear sour fish-soup owner and learn where curry-paste-led Gaeng Som remains a separate boundary.",
      href: "/food/tom-som-pla/",
      image: "/images/redesign/tom-som-pla-thai-sour-fish-soup-hero.webp",
    },
    {
      title: "Thai food guide",
      description:
        "Place brothy gaeng, soups, curries, salads and regional dishes inside one practical ordering map.",
      href: "/food/",
      image: "/images/redesign/thailand-food-hub-hero.webp",
    },
  ],
  sources: [
    {
      title: "Thai Peppery Shrimp & Veggie Soup — Gaeng Liang",
      creator: "Hot Thai Kitchen",
      url: "https://hot-thai-kitchen.com/kaeng-liang/",
      note: "Complete specialist DFS parse used for curry-versus-soup identity, pepper, dried shrimp, shrimp paste, fingerroot and flexible squash-and-mushroom roles. Quantities, timings, health, storage, lactation, postpartum and first-hand claims were excluded.",
    },
    {
      title: "Vegan Gaeng Liang",
      creator: "Messy Vegan Cook",
      url: "https://messyvegancook.com/thai-vegan-kaeng-liang-recipe/",
      note: "Complete specialist DFS parse used for lemon basil, peppercorn, chilli, fingerroot, gourd, flexible vegetables and a deliberately remade plant-led branch. Quantities, timings, retailer and personal claims were excluded.",
    },
    {
      title: "Gaeng Liang Ga Prau",
      creator: "Ahaan Thai Food Encyclopedia",
      url: "https://en.ahaan-thai.de/encyclopedia/g/gaeng-liang-ga-prau/",
      note: "Complete short DFS parse used only for the named grilled-fish, banana-blossom and holy-basil branch and its pepper-shrimp-paste base.",
    },
    {
      title: "Allergen guidance for food businesses",
      creator: "UK Food Standards Agency",
      url: "https://www.food.gov.uk/business-guidance/allergen-guidance-for-food-businesses",
      note: "Current primary guidance used for crustacean, fish, soy, wheat and cross-contact boundaries rather than automatic dietary claims.",
    },
    {
      title: "Cooking your food",
      creator: "UK Food Standards Agency",
      url: "https://www.food.gov.uk/safety-hygiene/cooking-your-food",
      note: "Current primary guidance used for safe seafood cooking, separation, hot holding, cooling and reheating boundaries without inventing one formula.",
    },
  ],
  methodDescription:
    "Updated 28 July 2026 after two independent DataForSEO clusters with two raw keyword records and no returned competitor-domain table, ten current UK-English SERPs with 74 organic result appearances, 51 People Also Ask appearances and 42 case-normalised unique questions, three complete specialist DFS parses, current FSA guidance, plus exact owner ranking and backlink checks. Neither exact seed returned measurable UK volume or KD; the owner has zero ranking terms and no reportable backlink summary signal. Tom Yum, Gaeng Som, Gaeng Om, Tom Kha, generic vegetable soup, postpartum, lactation, health, nutrition, calories, supplements, recipes and restaurants remain independent. Fixed-price, calorie, health, lactation, postpartum, medicinal, permanent-restaurant, universal-availability, fixed-heat, compulsory-ingredient, fixed-region, oldest-curry, national-dish, inventor, automatic-dietary, guaranteed-cross-contact, first-hand, best and most-popular claims were excluded; Recipe schema is deliberately absent.",
};

export function KaengLiangGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
