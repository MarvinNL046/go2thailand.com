import {
  ChefHat,
  Flame,
  MapPin,
  Soup,
  Sparkles,
  UtensilsCrossed,
  Wheat,
} from "lucide-react";
import { KLOOK_GENERIC, withSubId } from "../../lib/affiliates";
import {
  DishEditorialTemplate,
  type DishEditorialData,
} from "./DishEditorialTemplate";

const data: DishEditorialData = {
  title: "Sukhothai Noodles: Taste, Ingredients & How to Order",
  description:
    "Understand Sukhothai noodles before ordering: sweet-sour flavour, thin rice noodles, pork, long beans, peanuts, soup or dry choices, heat and dietary checks.",
  canonical: "https://go2-thailand.com/food/sukhothai-noodles/",
  updatedAt: "28 July 2026",
  name: "Sukhothai Noodles",
  thaiName: "ก๋วยเตี๋ยวสุโขทัย · the regional sweet-sour noodle bowl",
  heroImage: "/images/redesign/sukhothai-noodles-regional-bowl-hero.webp",
  heroAlt:
    "Sukhothai noodle bowl with thin rice noodles, red pork, minced pork, sliced long beans, peanuts, lime and fried garlic",
  heroEyebrow: "Sukhothai food · soup or dry, tuned at the bowl",
  lead: "Sukhothai noodles are a regional Thai noodle style built around a bright sweet-sour-savoury-spicy balance. Small rice noodles, thinly cut long beans, pork, roasted peanuts, lime, fried garlic and herbs are strong signals, but shops vary the noodles, broth and toppings. The first useful choice is nam or haeng: soup or dry.",
  quickFacts: [
    { label: "Identity", value: "Sukhothai regional noodles", icon: MapPin },
    {
      label: "Balance",
      value: "Sweet · sour · savoury · spicy",
      icon: Sparkles,
    },
    { label: "Service", value: "Soup or dry", icon: Soup },
    { label: "Check", value: "Peanut · fish · soy · wheat", icon: Wheat },
  ],
  navItems: [
    { href: "#taste", label: "Taste", icon: Sparkles },
    { href: "#ingredients", label: "Signals", icon: UtensilsCrossed },
    { href: "#choose", label: "Choose", icon: Soup },
    { href: "#order", label: "Order", icon: MapPin },
    { href: "#cook", label: "Cook", icon: ChefHat },
    { href: "#questions", label: "Questions", icon: Flame },
  ],
  taste: {
    intro:
      "A familiar bowl moves between savoury stock or seasoning, lime-led acidity, measured sweetness and roasted chilli. Peanuts and fried garlic deepen the aroma while herbs keep the finish fresh. It belongs to the wider tom-yum-seasoned noodle world, but its Sukhothai combination deserves its own owner.",
    texture:
      "Small rice noodles should stay springy rather than collapse into the liquid. Long beans retain a crisp-green bite; peanuts, fried garlic, pork rind or fried wonton can add crunch against tender sliced and minced pork.",
    finish:
      "Lime and chilli can remain bright after the savoury pork and fish-sauce notes fade. A dry bowl often tastes more concentrated because its seasonings coat the noodles instead of dispersing through broth.",
    scores: [
      { label: "Savoury depth", value: 4 },
      { label: "Sweet-sour lift", value: 4 },
      { label: "Chilli heat", value: 3 },
      { label: "Crunch & chew", value: 4 },
    ],
  },
  ingredients: [
    {
      name: "Small rice noodles · sen lek",
      role: "DASTA documents small rice noodles as the usual carrier. Some shops offer another rice noodle or house-made egg noodle, so choose by the actual menu rather than treating one strand as mandatory.",
    },
    {
      name: "Soup broth · dry seasoning",
      role: "Nam adds soup around the noodles; haeng coats them more directly. Pork stock is familiar, while dry bowls can use palm sugar, fish sauce, lime and aromatics without a full ladle of broth.",
    },
    {
      name: "Sliced and minced pork",
      role: "Grilled or red pork and cooked minced pork are strong documented signals. Pork rind, meatballs or other cuts vary, and a chicken or tofu adaptation is not proof of a traditional meat-free base.",
    },
    {
      name: "Thinly sliced long beans",
      role: "Long beans give the regional bowl a recognisable green crunch. They may be blanched with the noodles or added in another shop sequence; their presence does not prove the rest of the formula.",
    },
    {
      name: "Roasted peanuts",
      role: "Crushed peanuts add roasted aroma, richness and texture. They are a major allergen signal, and removing the visible topping does not remove shared scoops, prep surfaces or stock risks.",
    },
    {
      name: "Lime",
      role: "Fresh lime brings the sour edge that cuts through pork and sweetness. Vinegar or tamarind may appear in wider formulas, so ask what supplies acidity if ingredients matter.",
    },
    {
      name: "Fish sauce · sugar · chilli",
      role: "These tune savoury salt, sweetness and heat. Amounts are cook- and diner-dependent; soy-containing sauce or premixed seasoning may add another allergen boundary.",
    },
    {
      name: "Garlic · herbs · crisp toppings",
      role: "Fried garlic, coriander and spring onion add aroma. Dried cabbage, pork rind or fried wonton can appear, especially around dry service, bringing extra wheat, soy, egg or shared-fryer checks.",
    },
  ],
  allergenCopy:
    "Peanuts are a prominent signal, while fish sauce, soy-containing seasoning, wheat or egg noodles, fried wontons and shared stock, blanching water, scoops and condiment jars can add further allergens or cross-contact. Rice noodles alone do not make the finished bowl gluten-free. Show a translated allergy card and ask before noodles and toppings enter the shared station.",
  vegetarianCopy:
    "Sukhothai noodles are not vegetarian, vegan or halal by default. Pork meat, pork broth, pork rind and fish sauce are familiar; a tofu label may still sit on animal stock or seasoning. Confirm broth, sauce, noodles, fried toppings and every condiment, and ask whether separate utensils and cooking water are available.",
  formats: [
    {
      title: "Nam · soup bowl",
      bestFor:
        "A lighter, aromatic bowl where broth carries minced pork, garlic and herbs around the noodles while lime and chilli remain adjustable.",
      tradeOff:
        "Confirm the stock and seasoning. Clear-looking broth can still contain pork, fish sauce, soy, sugar and allergens from the shared noodle station.",
    },
    {
      title: "Haeng · dry bowl",
      bestFor:
        "A more concentrated coating of sweet, sour, savoury and chilli seasoning with strong noodle chew and crisp topping contrast.",
      tradeOff:
        "Dry does not mean sauce-free, mild, vegetarian or allergen-safe. Check palm sugar, fish sauce, peanut, pork, wonton and added spoonfuls.",
    },
    {
      title: "Verified custom bowl",
      bestFor:
        "A deliberately checked noodle, broth or dry base, protein, peanut decision and heat level assembled only after restrictions are understood.",
      tradeOff:
        "A substitution changes the bowl and may not be possible at a fast shared station. If staff cannot verify the base and tools, choose another dish.",
    },
  ],
  orderSteps: [
    {
      title: "Choose nam or haeng",
      text: "Ask for soup or dry before the station starts. If you want both for comparison, order two small bowls rather than expecting one universal “correct” service.",
    },
    {
      title: "Choose noodles and pork",
      text: "Confirm the available noodle and whether the bowl includes sliced pork, minced pork, rind, meatballs or another protein. State vegetarian, halal or allergen boundaries before blanching.",
    },
    {
      title: "Set peanut and heat",
      text: "Discuss peanuts and chilli before assembly, then taste before adding table condiments. “Mai phet” cannot remove chilli or allergen ingredients already mixed into a base.",
    },
  ],
  cooking: {
    title: "Build the components. Assemble one bowl at a time.",
    intro:
      "The useful technique is separation: prepare one complete tested broth or dry-seasoning system, cook the protein safely, blanch noodles and beans to their own cues, then finish each bowl while texture is alive. Do not merge quantities from unrelated tom-yum or boat-noodle recipes.",
    steps: [
      "Choose one complete tested Sukhothai noodle method. Confirm its noodle, broth or dry base, pork, long beans, peanut, lime, fish sauce, sugar, chilli, aromatics and optional crisp toppings.",
      "Prepare stock and proteins through that method and current food-safety guidance. Keep raw meat, ready-to-eat herbs, peanuts and restricted equipment separated.",
      "Portion roasted peanuts, lime, cooked pork, fried garlic, herbs and any dry-bowl toppings before the noodles enter hot water. Label allergen-controlled portions clearly.",
      "Blanch the selected noodles and long beans to the complete method or product directions, using separate water and baskets where cross-contact controls require it.",
      "For nam, combine the seasoned soup with noodles and cooked toppings. For haeng, coat the drained noodles with the tested dry seasoning so they do not clump.",
      "Serve promptly with optional chilli and condiments separate. Follow current guidance for hot holding, cooling, storage and reheating instead of treating one bowl as a universal rule.",
    ],
    boundary:
      "Noodle thickness, fresh versus dried noodles, stock strength, meat cut, bowl size and soup-versus-dry service all change timing and texture. Use one complete tested method and current safety guidance. This traveller owner publishes no universal time, temperature, storage period or Recipe schema.",
  },
  affiliates: [
    {
      href: "/go/simple-thai-food-cookbook/",
      title: "Simple Thai Food",
      text: "A tested Thai cookbook can supply complete noodle, broth and seasoning ratios that this traveller guide should not invent. Check whether Sukhothai noodles or a comparable regional noodle method appears in the current contents, then compare edition, format, seller, price and delivery.",
    },
  ],
  classHref: withSubId(KLOOK_GENERIC, "en-sukhothai-noodles-food-class"),
  classCopy:
    "A Thai cooking class or regional food tour may explain noodle blanching, bowl seasoning and condiments, but Klook inventory and menus change. Confirm the current class or stops explicitly include Sukhothai noodles or a relevant noodle module, then check hands-on cooking, allergens, language, transport and cancellation terms.",
  classSignals: [
    {
      title: "Soup versus dry",
      text: "See how the same noodle family changes when seasoning is dispersed in broth or concentrated around drained noodles.",
    },
    {
      title: "Texture control",
      text: "Learn to time noodles and long beans separately while keeping peanuts and fried toppings crisp until assembly.",
    },
    {
      title: "Bowl balance",
      text: "Taste how lime, fish sauce, sweetness and roasted chilli are adjusted without assuming one fixed formula.",
    },
  ],
  faqs: [
    {
      question: "What are Sukhothai noodles?",
      answer:
        "They are a regional Thai noodle style associated with Sukhothai. A familiar bowl combines small rice noodles, pork, thinly sliced long beans, peanuts, lime, fried garlic, herbs and sweet-sour-savoury-spicy seasoning, served with soup or dry.",
    },
    {
      question: "What kind of noodles are used for Sukhothai noodles?",
      answer:
        "Small rice noodles, often described as sen lek, are a strong documented choice. Shops can offer other rice noodles or house-made egg noodles, so ask what the current bowl uses when wheat or egg matters.",
    },
    {
      question: "What ingredients are in Sukhothai noodles?",
      answer:
        "Common signals include rice noodles, pork broth or dry seasoning, sliced and minced pork, long beans, peanuts, lime, fish sauce, sugar, chilli, fried garlic, coriander and spring onion. Pork rind, dried cabbage, fried wonton and noodle choices vary.",
    },
    {
      question: "What do Sukhothai noodles taste like?",
      answer:
        "Expect a layered savoury, sweet, sour and spicy balance with roasted peanut and garlic aroma. Lime keeps the bowl bright, while pork and stock add depth. A dry bowl can taste more concentrated than a soup version.",
    },
    {
      question: "Are Sukhothai noodles spicy?",
      answer:
        "Chilli is part of many familiar versions, but intensity varies by cook and table seasoning. Ask for less chilli before assembly and taste before adding flakes or chilli vinegar; a premixed base may already contain heat.",
    },
    {
      question: "Are Sukhothai noodles served dry or as soup?",
      answer:
        "Both are documented. Nam means soup and haeng means dry. The dry branch uses little or no serving broth and lets seasonings coat the noodles more directly; neither format is universally better or safer for a dietary restriction.",
    },
    {
      question: "How are Sukhothai noodles different from Tom Yum noodles?",
      answer:
        "Sukhothai noodles can use tom-yum-style sweet-sour-spicy bowl seasoning, but they are a regional owner with recognisable long-bean, peanut, lime and pork signals plus soup and dry branches. Tom Yum Noodles is the broader family and varies independently.",
    },
    {
      question: "How are Sukhothai noodles different from Boat Noodles?",
      answer:
        "Boat Noodles are a separate Central Thai bowl known for a darker, concentrated broth and a nam-tok branch that can use blood. Sukhothai noodles foreground lime, peanut, long beans and sweet-sour seasoning. Shops vary, so colour alone is not enough.",
    },
    {
      question: "Are Sukhothai noodles gluten-free?",
      answer:
        "Not automatically. Rice noodles do not contain wheat by name, but egg noodles, soy-containing sauces, fried wontons, shared blanching water, baskets and condiment scoops can introduce wheat or cross-contact. Verify the complete station.",
    },
    {
      question: "Can Sukhothai noodles be vegetarian or vegan?",
      answer:
        "Only through a verified adaptation. Familiar bowls can contain pork, pork stock, pork rind and fish sauce. Confirm the broth or dry base, seasoning, noodles, protein, peanuts, crisp toppings and shared tools before ordering.",
    },
  ],
  related: [
    {
      title: "Food in Sukhothai",
      description:
        "Place the noodle bowl inside a wider province food route of markets, old recipes, rice-flour dishes, fish and traditional sweets.",
      href: "/city/sukhothai/food/",
      image: "/images/redesign/sukhothai-noodles.webp",
    },
    {
      title: "Boat Noodles",
      description:
        "Compare Sukhothai brightness with the darker, concentrated bowl associated with Ayutthaya and Bangkok canal culture.",
      href: "/food/boat-noodles/",
      image: "/images/redesign/boat-noodles-canal-bowl-hero.webp",
    },
    {
      title: "Tom Yum Noodles",
      description:
        "Continue into the broader sweet-sour-spicy noodle family without collapsing its many bases into the Sukhothai owner.",
      href: "/food/tom-yum-noodles/",
      image: "/images/redesign/tom-yum-noodles-thai-street-food-hero.webp",
    },
  ],
  sources: [
    {
      title: "Ten Traditional Dishes from Sukhothai and Kamphaeng Phet",
      creator: "Designated Areas for Sustainable Tourism Administration",
      url: "https://www.dasta.or.th/en/article/294",
      note: "Complete DFS parse used for small rice noodles, long beans, pork, peanuts, fish sauce, lime, aromatics, four-part flavour balance and separate soup/dry construction. The unique-only long-bean superlative and universal formula were excluded.",
    },
    {
      title: "Explore Thai Taste: Thai Foodie Map 2.0",
      creator: "Tourism Authority of Thailand",
      url: "https://www.tourismthailand.org/Articles/explore-thai-taste-thai-foodie-map-2-0-en",
      note: "Complete DFS parse used for current Sukhothai food context and one documented shop variation with house-made noodles, red pork, pork rind, roasted chilli, peanuts and sweet-sour broth. Stored hours and best-shop implications were excluded.",
    },
    {
      title: "Sukhothai Noodle Soup",
      creator: "Thai Foodie",
      url: "https://thai-foodie.com/thaifood/sukhothai-noodle-soup-recipe-%E0%B9%80%E0%B8%81%E0%B8%B5%E0%B9%8B%E0%B8%A2%E0%B8%A7%E0%B9%80%E0%B8%95%E0%B8%B5%E0%B9%8B%E0%B8%A2%E0%B8%A7%E0%B8%AA%E0%B8%B8%E0%B9%82%E0%B8%82%E0%B8%97%E0%B8%B1%E0%B8%A2/",
      note: "Complete specialist DFS parse used to distinguish familiar thin-rice-noodle and pork signals from a documented chicken home adaptation. Quantities, timings, health, gluten-free and first-hand claims were excluded.",
    },
    {
      title: "Allergen guidance for food businesses",
      creator: "UK Food Standards Agency",
      url: "https://www.food.gov.uk/business-guidance/allergen-guidance-for-food-businesses",
      note: "Current primary guidance used for peanut, fish, soy, wheat, egg and cross-contact boundaries rather than automatic dietary claims.",
    },
    {
      title: "Cooking your food",
      creator: "UK Food Standards Agency",
      url: "https://www.food.gov.uk/safety-hygiene/cooking-your-food",
      note: "Current primary guidance used for safe meat cooking, separation, hot holding, cooling and reheating boundaries without inventing one universal recipe.",
    },
  ],
  methodDescription:
    "Updated 28 July 2026 after two independent DataForSEO clusters with 64 raw keyword records and 50 competitor domains, ten current UK-English SERPs with 77 organic result appearances, 50 People Also Ask appearances and 22 case-normalised unique questions, one complete DASTA primary parse, one complete TAT primary parse, one complete specialist DFS parse, current FSA guidance, plus exact owner ranking and backlink checks. “Sukhothai noodles” has UK volume 50 and KD 0; “dry Sukhothai noodles” has volume 10. The exact route ranks at position 54 for “sen su kho thai” with volume 70 and has no reportable backlink summary signal. Boat Noodles, generic Tom Yum Noodles, Khao Soi, Pad Thai, Sukhothai sauce, recipes, restaurants, instant noodles, calories, nutrition and health remain independent. Fixed-price, calorie, health, permanent-shop, stored-hours, universal-availability, mandatory-noodle, meat, broth, topping, heat, sweetness, format-preference, automatic dietary, guaranteed-cross-contact, inventor, settled-origin, unique-only, first-hand, best, most-popular and national-dish claims were excluded; Recipe schema is deliberately absent.",
};

export function SukhothaiNoodlesGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
