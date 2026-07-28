import {
  ChefHat,
  CircleDot,
  Leaf,
  MapPin,
  Palette,
  ShoppingBasket,
  Sparkles,
} from "lucide-react";
import { KLOOK_GENERIC, withSubId } from "../../lib/affiliates";
import {
  DishEditorialTemplate,
  type DishEditorialData,
} from "./DishEditorialTemplate";

const data: DishEditorialData = {
  title: "Bua Loy: Thai Coconut Rice Balls Guide",
  description:
    "Understand Bua Loy or Bua Loi: chewy glutinous rice balls, sweet coconut milk, natural colours, Khai Wan egg choices, taste, ordering and dietary checks.",
  canonical: "https://go2-thailand.com/food/bua-loy/",
  updatedAt: "28 July 2026",
  name: "Bua Loy",
  thaiName: "บัวลอย · colourful rice dumplings in coconut milk",
  heroImage: "/images/redesign/bua-loy-thai-coconut-rice-balls-hero.webp",
  heroAlt:
    "Thai Bua Loy with small green pandan, orange pumpkin, purple taro and pale glutinous rice balls in coconut milk",
  heroEyebrow: "Thai dessert · colour, chew and coconut",
  lead: "Bua Loy is a Thai dessert of small chewy glutinous-rice-flour dumplings in a sweet coconut-milk base balanced with a little salt. Green, orange and purple can signal pandan, pumpkin, taro or sweet potato—but colour alone is not an ingredient label. Bua Loy Sam Si is the multicolour branch; Bua Loy Khai Wan or Khai Khem adds an egg choice that changes the order and dietary boundary.",
  quickFacts: [
    { label: "Identity", value: "Small glutinous-rice balls", icon: CircleDot },
    { label: "Base", value: "Sweet-salty coconut milk", icon: Sparkles },
    { label: "Colour", value: "Pandan · pumpkin · taro", icon: Palette },
    {
      label: "Check",
      value: "Egg · dairy · sesame · flour",
      icon: ShoppingBasket,
    },
  ],
  navItems: [
    { href: "#taste", label: "Taste", icon: Sparkles },
    { href: "#ingredients", label: "Signals", icon: ShoppingBasket },
    { href: "#choose", label: "Choose", icon: Palette },
    { href: "#order", label: "Order", icon: MapPin },
    { href: "#cook", label: "Cook", icon: ChefHat },
    { href: "#questions", label: "Questions", icon: Leaf },
  ],
  taste: {
    intro:
      "The coconut base is creamy and fragrant, with sweetness sharpened by a restrained salty edge. Pandan can add a leafy vanilla-like aroma, while pumpkin, taro and sweet potato bring gentle earthy sweetness rather than loud fruit flavour.",
    texture:
      "The dumplings should be soft, cohesive and pleasantly chewy rather than chalky, grainy or boba-like. Their small size creates many quick bites through the coconut milk; added egg, ice cream, sesame or coconut pieces alter the contrast.",
    finish:
      "Coconut richness lingers, pandan can remain aromatic and the rice chew fades gradually. A sweet or salted egg makes the finish richer and more savoury; toasted sesame adds a nutty crisp note.",
    scores: [
      { label: "Coconut richness", value: 5 },
      { label: "Sweet-salty balance", value: 4 },
      { label: "Chewy texture", value: 5 },
      { label: "Plant aroma", value: 3 },
    ],
  },
  ingredients: [
    {
      name: "Glutinous rice flour",
      role: "This sticky-rice flour supplies the characteristic chew. It is not ordinary rice flour and it contains no wheat by name, but blends and shared preparation still require checking.",
    },
    {
      name: "Supporting starch · water",
      role: "Tapioca or ordinary rice flour may support texture in some formulas, while water or coconut milk hydrates the dough. The flour blend changes bounce and tenderness.",
    },
    {
      name: "Pumpkin · kabocha",
      role: "Mashed orange squash can colour and soften an orange or yellow dough. Artificial colour is another possibility, so appearance alone does not verify pumpkin.",
    },
    {
      name: "Taro · purple sweet potato",
      role: "Taro or purple sweet potato can create pale lavender to deep violet dumplings. Check the actual ingredient and handling rather than equating every purple ball with taro.",
    },
    {
      name: "Pandan · food colour",
      role: "Pandan juice or extract can colour and perfume green dough or coconut milk. Vendors may use food colouring instead, and pandan is not mandatory in every bowl.",
    },
    {
      name: "Coconut milk",
      role: "Coconut milk forms the creamy serving base. Dairy milk, cream, ice cream or condensed milk may still appear in modern toppings or formulas.",
    },
    {
      name: "Sugar · salt",
      role: "Palm, coconut or white sugar can sweeten the base while salt sharpens the coconut. No one sugar or sweetness level is universal.",
    },
    {
      name: "Egg · topping branch",
      role: "Khai Wan can add a sweet egg, while Khai Khem names a salted-egg branch. Sesame, coconut, ice cream, sarim or other toppings create further allergen and identity checks.",
    },
  ],
  allergenCopy:
    "Glutinous rice and coconut do not prove the whole bowl allergen-free. Flour blends, egg, dairy milk, cream or ice cream, sesame, soy-based substitutions, toppings and shared shaping, boiling or serving tools can add declared allergens or cross-contact. Ask about dumpling dough, colours, coconut base, egg and every topping.",
  vegetarianCopy:
    "A plain coconut-and-rice Bua Loy may be plant-led, but it is not automatically vegetarian or vegan. Khai Wan and Khai Khem contain egg; dairy may enter milk, cream, condensed milk or ice cream; shared utensils also matter. Request a bowl made with a verified flour blend, coconut base, colours and toppings and no egg or dairy.",
  formats: [
    {
      title: "Bua Loy Sam Si",
      bestFor:
        "A multicolour bowl where pumpkin or kabocha, pandan, taro or sweet potato can give the small dumplings distinct natural colour and gentle flavour.",
      tradeOff:
        "Ask whether colours are natural or artificial and check flour blend, coconut base, sesame, dairy toppings and shared tools.",
    },
    {
      title: "Khai Wan or Khai Khem",
      bestFor:
        "Adding a sweet egg or salted-egg branch for richer texture and a stronger sweet-savoury contrast.",
      tradeOff:
        "Confirm which egg style is meant, how it is cooked, and whether dairy, sesame, ice cream, sarim or other toppings are also included.",
    },
    {
      title: "Verified plant-led bowl",
      bestFor:
        "Small rice dumplings and coconut milk made without egg, dairy, honey or animal-derived toppings using separately checked tools.",
      tradeOff:
        "Do not infer vegan status from coconut milk or bright colours. Check the full flour, colour, sweetener, topping and shared-ladle system.",
    },
  ],
  orderSteps: [
    {
      title: "Confirm the dessert",
      text: "Ask for Bua Loy or Bua Loi and point to the small chewy rice dumplings in coconut milk. Confirm it is not boba, filled Tang Yuan, mochi or Lod Chong noodles.",
    },
    {
      title: "Read the colours",
      text: "Ask whether green is pandan, orange is pumpkin, purple is taro or sweet potato, or whether food colour is used. Check the flour blend and any sesame or coconut topping.",
    },
    {
      title: "Choose the egg branch",
      text: "Order plain, Khai Wan or Khai Khem deliberately. Confirm sweet versus salted egg, dairy or ice cream, serving temperature and shared utensils before the bowl is assembled.",
    },
  ],
  cooking: {
    title: "Colour dough. Shape small. Boil separately.",
    intro:
      "The useful technique is a controlled glutinous-rice dough matched to each moist colour ingredient, followed by even shaping, boiling and a separately balanced coconut base. Use one complete tested formula rather than combining flour ratios from unrelated rice-ball desserts.",
    steps: [
      "Choose one complete tested Bua Loy method. Confirm glutinous rice flour, supporting starch, each natural colour or extract, hydration, sugar, salt, coconut base, egg branch, toppings and storage guidance.",
      "Cook and cool pumpkin, taro or sweet potato as the method directs, or prepare pandan liquid. Keep each colour batch labelled and adjust only through that method's stated flour or liquid controls.",
      "Knead each dough to the tested texture, then shape consistently small pieces on a clean surface. Keep wheat, egg, dairy, sesame and other allergen tools away from restricted batches.",
      "Boil through the complete method's sequence and check its stated doneness cues. Floating can be one cue, but ball size, flour blend and filling or egg additions change what a safe endpoint requires.",
      "Prepare coconut milk, sweetener, salt and pandan separately without scorching or uncontrolled splitting, following the tested method rather than one universal boil time.",
      "Combine and serve at the method's intended temperature with separately handled egg or toppings. Follow current guidance for cooling, storage and reheating instead of treating coconut milk and dumplings as shelf-stable.",
    ],
    boundary:
      "Flour blend, vegetable moisture, ball size, filling, batch size, coconut concentration and egg branch all alter timing and texture. Use one complete tested method plus current food-safety guidance. This traveller owner deliberately gives no universal time, temperature, storage period or Recipe schema.",
  },
  affiliates: [
    {
      href: "/go/simple-thai-food-cookbook/",
      title: "Simple Thai Food",
      text: "A tested Thai cookbook can supply exact flour, colour, coconut and egg controls that this traveller guide should not invent. Check whether Bua Loy or a comparable Thai dessert is in the current contents, then compare edition, format, seller, price and delivery.",
    },
  ],
  classHref: withSubId(KLOOK_GENERIC, "en-bua-loy-thai-dessert-class"),
  classCopy:
    "A Thai dessert workshop or food tour may cover rice-flour dough, natural colours and coconut bases, but Klook results are broad and menus change. Confirm the current class or stops explicitly include Bua Loy, then check hands-on shaping, egg, allergens, language, transport and cancellation terms.",
  classSignals: [
    {
      title: "Flour recognition",
      text: "Learn why glutinous rice flour provides chew and why ordinary rice flour, tapioca and wheat are different ingredient checks.",
    },
    {
      title: "Natural colours",
      text: "See how pumpkin, taro, sweet potato or pandan change hydration as well as appearance.",
    },
    {
      title: "Coconut balance",
      text: "Taste how sugar, salt, pandan and optional egg shape one bowl without assuming a universal sweetness.",
    },
  ],
  faqs: [
    {
      question: "What is Bua Loy?",
      answer:
        "Bua Loy is a Thai dessert of small chewy glutinous-rice-flour dumplings served in sweet coconut milk balanced with salt. Pumpkin, pandan, taro or sweet potato can create different colours and gentle flavours.",
    },
    {
      question: "What does Bua Loy mean?",
      answer:
        "The name is commonly translated as floating lotus, referring to the small round dumplings floating in their serving liquid. Romanisations include Bua Loy, Bua Loi and Bualoi.",
    },
    {
      question: "What is Bua Loy made of?",
      answer:
        "Glutinous rice flour forms the dumplings, sometimes supported by tapioca or rice flour. Coconut milk, sugar and salt form the base; pandan, pumpkin, taro, sweet potato, egg, sesame or dairy toppings vary.",
    },
    {
      question: "What does Bua Loy taste like?",
      answer:
        "It is coconut-rich, sweet with a light salty balance and pleasantly chewy. Pandan adds fragrance, pumpkin or sweet potato gentle sweetness, taro earthiness and optional egg a richer savoury note.",
    },
    {
      question: "What do the colours in Bua Loy mean?",
      answer:
        "Green may come from pandan, orange or yellow from pumpkin, and purple from taro or purple sweet potato. Artificial colour is also possible, so ask rather than treating colour as proof.",
    },
    {
      question: "What is Bua Loy Khai Wan?",
      answer:
        "It is a Bua Loy branch served with a sweet-cooked egg. Bua Loy Khai Khem uses salted egg. Neither egg belongs to every bowl, and both change vegetarian, vegan and egg-allergen decisions.",
    },
    {
      question: "Is Bua Loy gluten-free?",
      answer:
        "Not automatically. Glutinous rice itself does not mean wheat gluten, but flour blends, toppings, shared shaping surfaces, boiling water and utensils can add wheat or cross-contact. Verify the complete bowl.",
    },
    {
      question: "Is Bua Loy vegan?",
      answer:
        "A carefully made plain coconut-and-rice version can be plant-led, but egg, dairy, condensed milk, ice cream, honey or shared tools may be involved. Ask about the dough, base, colours and toppings.",
    },
    {
      question: "Is Bua Loy served hot or cold?",
      answer:
        "Warm service is familiar, but room-temperature or chilled presentations and ice-cream additions also occur. Ask how the current bowl is served instead of treating one temperature as universal.",
    },
    {
      question: "How is Bua Loy different from Tang Yuan?",
      answer:
        "Both can use glutinous rice flour and a round shape. Bua Loy is a Thai dessert commonly built from small coloured, usually unfilled dumplings in coconut milk; Chinese Tang Yuan often centres syrup or soup and may contain fillings. Variations overlap, but the cultural and ordering owners remain distinct.",
    },
  ],
  related: [
    {
      title: "Mango Sticky Rice",
      description:
        "Compare Bua Loy's small boiled dumplings with steamed sticky rice, ripe mango and a separate coconut dressing.",
      href: "/food/mango-sticky-rice/",
      image: "/images/redesign/mango-sticky-rice-dish-hero.webp",
    },
    {
      title: "Roti Sai Mai",
      description:
        "Continue through Thai dessert craft with Ayutthaya's thin roti wrapper and hand-pulled sugar threads.",
      href: "/food/roti-sai-mai/",
      image:
        "/images/redesign/roti-sai-mai-ayutthaya-cotton-candy-roti-hero.webp",
    },
    {
      title: "Thai food guide",
      description:
        "Place Bua Loy inside a wider meal of regional dishes, markets, ordering choices and dessert owners.",
      href: "/food/",
      image: "/images/redesign/thailand-food-hub-hero.webp",
    },
  ],
  sources: [
    {
      title: "Bua Loy Sam Si",
      creator: "Thailand Foundation and Ministry of Foreign Affairs",
      url: "https://thailandfoundation.or.th/bua-loy-sam-si/",
      note: "Current primary page used for three-colour rice dumplings in coconut milk and Central Thai cultural classification. Video quantities and fixed timings were excluded.",
    },
    {
      title: "5 of the Best Restaurants in Nan",
      creator: "Tourism Authority of Thailand",
      url: "https://www.tourismthailand.org/Articles/https-www-tourismthailand-org-articles-5-of-the-best-restaurants-in-nan",
      note: "Complete DFS parse used narrowly for Bua Loi Kai Wan, soft sticky rice-flour balls and sweet coconut cream. Restaurant details and promotion were excluded.",
    },
    {
      title: "Khlong San Market",
      creator: "Tourism Authority of Thailand",
      url: "https://www.tourismthailand.org/Articles/get-a-glimpse-of-bangkok-s-local-shopping-at-khlong-san-market",
      note: "Complete DFS parse used for the documented Bua Loy Khai Khem salted-egg branch. Market permanence, prices and route claims were excluded.",
    },
    {
      title: "Bua Loy Recipe",
      creator: "Hungry in Thailand",
      url: "https://hungryinthailand.com/bua-loy-dessert/",
      note: "Complete DFS specialist parse used for glutinous rice flour, coconut milk, taro, pumpkin, pandan, sweet-potato and egg branches. Quantities, fixed timings, first-hand and best claims were excluded.",
    },
    {
      title: "Allergen guidance for food businesses",
      creator: "UK Food Standards Agency",
      url: "https://www.food.gov.uk/business-guidance/allergen-guidance-for-food-businesses",
      note: "Current primary guidance used for egg, milk, sesame, soy, gluten and cross-contact boundaries rather than automatic dietary claims.",
    },
  ],
  methodDescription:
    "Updated 28 July 2026 after two independent DataForSEO clusters with 43 raw keyword records and 15 competitor domains, ten current UK-English SERPs with 70 organic result appearances, 55 People Also Ask appearances and 35 case-normalised unique questions, one primary Thailand Foundation capture, two complete TAT DFS parses, one complete specialist DFS parse, current FSA guidance, plus exact owner ranking and backlink checks. Bua Loy has UK volume 170 and KD 0; the owner has zero ranking terms and no reportable backlink signal. Tang Yuan, Bua Loy Nam Khing, Khanom Tom, Lod Chong, Mango Sticky Rice, Kluai Buat Chi, boba, tapioca, mochi, generic rice balls, recipe, restaurant, calorie, nutrition and health intent remain independent. Exclusive-Southern, fixed-price, calorie, health, permanent-stall, universal-availability, sweetness, colour-count, size, temperature, time, shelf-life, automatic dietary, compulsory-colour, palm-sugar, egg, inventor, ancient-unchanged, one-formula, first-hand, best, royal-favourite, most-popular and national-dessert claims were excluded; Recipe schema is deliberately absent.",
};

export function BuaLoyGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
