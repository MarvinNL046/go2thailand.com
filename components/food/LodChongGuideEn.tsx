import {
  ChefHat,
  Leaf,
  MapPin,
  Snowflake,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { KLOOK_GENERIC, withSubId } from "../../lib/affiliates";
import {
  DishEditorialTemplate,
  type DishEditorialData,
} from "./DishEditorialTemplate";

const data: DishEditorialData = {
  title: "Lod Chong: Thai Pandan Jelly in Coconut Milk",
  description:
    "Understand Thai Lod Chong before ordering: pandan jelly strands, coconut milk, palm-sugar syrup, ice, texture, toppings, dietary checks and Lod Chong Singapore.",
  canonical: "https://go2-thailand.com/food/lod-chong/",
  updatedAt: "28 July 2026",
  name: "Lod Chong",
  thaiName: "ลอดช่อง · Lot Chong",
  heroImage:
    "/images/redesign/lod-chong-thai-pandan-jelly-coconut-ice-hero.webp",
  heroAlt:
    "Short curved green pandan jelly strands in coconut milk with palm-sugar syrup and crushed ice",
  heroEyebrow: "Thai chilled dessert · pressed jelly · coconut and ice",
  lead: "Thai Lod Chong is a chilled dessert of short, softly pressed flour-jelly strands served with coconut milk or cream, sugar syrup and crushed ice. Pandan often gives the strands their green colour and grassy-vanilla aroma, but starch, colour, sweetness and toppings change by maker. Do not confuse every bowl with Lod Chong Singapore: that Bangkok-named branch uses a notably chewier tapioca-noodle format.",
  quickFacts: [
    { label: "Category", value: "Chilled Thai dessert", icon: Snowflake },
    {
      label: "Identity",
      value: "Pressed flour jelly · coconut",
      icon: UtensilsCrossed,
    },
    { label: "Aroma", value: "Often pandan · batch varies", icon: Leaf },
    { label: "Service", value: "Bowl or cup · crushed ice", icon: Sparkles },
  ],
  navItems: [
    { href: "#taste", label: "Taste", icon: Sparkles },
    { href: "#ingredients", label: "Signals", icon: Leaf },
    { href: "#choose", label: "Choose", icon: Snowflake },
    { href: "#order", label: "Order", icon: MapPin },
    { href: "#cook", label: "Method", icon: ChefHat },
    { href: "#questions", label: "Questions", icon: UtensilsCrossed },
  ],
  taste: {
    intro:
      "The classic pleasure is contrast: cool, yielding jelly against rich coconut and a syrup that can be smoky, caramel-like or simply sweet. Pandan adds a green, vanilla-like aroma rather than a sharp fruit flavour, while a little salt can make the coconut taste fuller.",
    texture:
      "Traditional Thai strands are short, soft and slippery rather than al dente. Flour blends and pressing technique change their bounce. Melting crushed ice thins the coconut and syrup as the bowl sits.",
    finish:
      "Coconut richness and syrup linger, followed by pandan perfume. Sweetness often changes from the first spoon to the last because the ice melts; separate syrup gives you more control.",
    scores: [
      { label: "Coconut richness", value: 4 },
      { label: "Pandan aroma", value: 4 },
      { label: "Sweetness", value: 4 },
      { label: "Icy refreshment", value: 5 },
    ],
  },
  ingredients: [
    {
      name: "Pressed flour jelly",
      role: "Cooked batter is pushed through a perforated tool into water to form short strands. Their length, thickness, softness and shape vary by flour blend and maker.",
    },
    {
      name: "Pandan",
      role: "Fresh pandan water or extract can perfume and colour the jelly. Green does not prove fresh pandan: colouring may supplement or replace it, and some versions use another colour.",
    },
    {
      name: "Rice · tapioca · mung bean",
      role: "Documented Thai formulas use rice flour with tapioca starch or mung-bean flour. Lod Chong Singapore shifts toward a chewier tapioca-starch noodle. No single flour is guaranteed.",
    },
    {
      name: "Coconut milk or cream",
      role: "Coconut provides the pale rich liquid around the jelly. Concentration, sweetness and whether it is cooked with salt or pandan change by recipe and vendor.",
    },
    {
      name: "Palm or sugar syrup",
      role: "Palm sugar can add amber caramel depth, while white or other sugar may make a cleaner syrup. Syrup may arrive mixed in or separately for sweetness control.",
    },
    {
      name: "Salt",
      role: "A small savoury edge is common in coconut desserts and sharpens the sweet-coconut contrast. Quantity is a maker decision, not a fixed flavour score.",
    },
    {
      name: "Crushed ice",
      role: "Ice chills and gradually dilutes the bowl. Confirm drinking-water and ice confidence when it matters; the dessert name alone cannot verify the source.",
    },
    {
      name: "Optional toppings",
      role: "Jackfruit, sweet corn, fruit, beans, konjac jelly or other add-ins may join. Phetchaburi's named Namtan Khon format brings a thicker palm-sugar element, not a universal topping.",
    },
  ],
  allergenCopy:
    "Coconut is the obvious ingredient but is not one of the UK regulated 14 allergens; individual sensitivity still matters. Flour blends, pandan extract, colouring, syrup, toppings and packaged coconut products can add wheat, soy, sulphites, milk, egg, nuts or other ingredients. Shared presses, bowls, scoops and topping stations add cross-contact. Ask about the full current batch.",
  vegetarianCopy:
    "A basic flour-jelly, pandan, coconut, sugar and ice version can be vegetarian and vegan, but the name does not guarantee it. Check dairy in coconut blends or toppings, egg, gelatine, condensed milk, colouring carriers and shared utensils. Halal diners should verify extracts, flavourings, gelatine, processing aids and preparation rather than relying on the green colour.",
  formats: [
    {
      title: "Classic Thai iced bowl",
      bestFor:
        "Trying short soft green jelly with coconut liquid, syrup and crushed ice in the clearest traveller-facing format.",
      tradeOff:
        "Confirm flour blend, pandan or colouring, sweetness, toppings, dietary details and whether syrup can be adjusted.",
    },
    {
      title: "Phetchaburi Namtan Khon",
      bestFor:
        "Exploring a documented Phetchaburi expression with pandanus cendol and a thicker palm-sugar-fudge element.",
      tradeOff:
        "Treat it as a named regional version, not proof that every Lod Chong bowl contains thick palm-sugar fudge.",
    },
    {
      title: "Lod Chong Singapore",
      bestFor:
        "Comparing a Bangkok-named drink-dessert with long or cut chewy tapioca noodles, pandan coconut liquid and optional jackfruit.",
      tradeOff:
        "The name refers to a distinct format and is associated with the former Singapore Theatre; it is not simply the classic Thai jelly bowl or proof of Singaporean origin.",
    },
  ],
  orderSteps: [
    {
      title: "Identify the version",
      text: "Ask whether it is classic Thai Lod Chong, Lod Chong Namtan Khon or Lod Chong Singapore. Look for short pressed jelly versus chewier tapioca noodles rather than relying on one English label.",
    },
    {
      title: "Check the whole bowl",
      text: "Ask about the flour blend, pandan or colouring, coconut product, syrup and every topping. State wheat, milk, egg, gelatine, soy, nut, vegan or halal boundaries before serving.",
    },
    {
      title: "Set sweet and cold",
      text: "Choose a small bowl or cup, request syrup separately when available, and confirm the ice and included toppings. Check the actual current price before adding extras.",
    },
  ],
  cooking: {
    title: "Cook the batter. Press the strands. Chill the bowl safely.",
    intro:
      "Lod Chong texture depends on a specific flour ratio, batter stage and pressing method. Choose one complete tested recipe and follow it from start to finish rather than combining the flour blend from one source with the timing or water treatment from another.",
    steps: [
      "Choose one complete tested Thai Lod Chong method and inspect its flour or starch blend, pandan or colouring, water treatment, coconut component, syrup, salt, ice and toppings.",
      "Use potable water, clean ice and clean equipment. Prepare any recipe-specific limewater or pandan liquid exactly as the complete tested method directs; do not improvise processing aids.",
      "Cook and stir the measured batter to the method's intended stage. Starch choice and hydration determine whether the strands hold, soften or become overly elastic.",
      "Press the hot batter through the specified clean tool into the method's prepared water so the short strands set. Protect hands from hot batter and steam.",
      "Prepare the coconut component and syrup according to that same method, then drain or hold the jelly exactly as directed. Keep dietary batches and utensils separate where required.",
      "Assemble with clean crushed ice shortly before serving. Follow current local guidance for cooling, refrigeration, storage and discarding time-sensitive coconut mixtures.",
    ],
    boundary:
      "Flour brand, starch ratio, pandan liquid, batter temperature, press-hole size, water treatment and room heat change texture and safety. Use one complete tested method and current product and food-safety guidance. This traveller owner publishes no universal quantities, timing, shelf life or Recipe schema.",
  },
  affiliates: [
    {
      href: "/go/simple-thai-food-cookbook/",
      title: "Simple Thai Food",
      text: "A tested Thai cookbook can place coconut desserts, pandan and flour technique in context. Check whether Lod Chong or a comparable pressed-jelly dessert appears in the current contents, then compare edition, seller, current price and delivery.",
    },
  ],
  classHref: withSubId(KLOOK_GENERIC, "en-lod-chong-thai-dessert-class-tour"),
  classCopy:
    "A Thai dessert class or market food tour may demonstrate pandan, coconut and pressed-jelly texture, but Klook menus change. Confirm the current option explicitly includes Lod Chong or a comparable flour-jelly dessert, then check hands-on work, dietary support, language, transport and cancellation terms.",
  classSignals: [
    {
      title: "Read the flour blend",
      text: "Compare soft rice-led strands with tapioca or mung-bean additions instead of assuming every green jelly has one formula.",
    },
    {
      title: "Control the press",
      text: "See how batter stage and perforation size create short strands without treating one exact length as the only valid form.",
    },
    {
      title: "Balance the bowl",
      text: "Taste coconut, salt, syrup and melting ice separately before choosing sweetness and toppings for the final serving.",
    },
  ],
  faqs: [
    {
      question: "What is Lod Chong?",
      answer:
        "Thai Lod Chong is a chilled dessert of short pressed flour-jelly strands served with coconut milk or cream, sugar syrup and crushed ice. Pandan commonly perfumes and colours the jelly, while flour blends, toppings and sweetness vary.",
    },
    {
      question: "What is Lod Chong in English?",
      answer:
        "There is no single perfect English name. 'Thai pandan jelly in coconut milk' describes the common bowl; 'cendol' places it in a wider Southeast Asian family. Keep the Thai name when ordering because versions differ.",
    },
    {
      question: "What does Lod Chong taste like?",
      answer:
        "Expect rich coconut, a sweet palm-sugar or sugar syrup, a little salt and a soft green aroma often supplied by pandan. The short jelly is mild; melting ice gradually lightens the sweetness and coconut richness.",
    },
    {
      question: "Is Lod Chong made with pandan?",
      answer:
        "Pandan water or extract is common and gives a grassy, vanilla-like aroma and green colour. Some makers use added colouring or another flavouring, so green alone does not prove fresh pandan or one ingredient list.",
    },
    {
      question: "What are Lod Chong noodles made from?",
      answer:
        "Documented Thai formulas use rice flour combined with tapioca starch or mung-bean flour and pandan liquid. Lod Chong Singapore commonly uses a chewier tapioca-starch noodle. Ask the maker when a flour matters.",
    },
    {
      question: "Is Lod Chong a drink or a dessert?",
      answer:
        "It can be served in a bowl to eat with a spoon or in a cup with enough coconut liquid and ice to feel drink-like. Service format does not determine the flour, sweetness or toppings.",
    },
    {
      question: "Is Lod Chong vegan?",
      answer:
        "A basic pandan-flour jelly with coconut, sugar and ice can be vegan, but it is not automatic. Check condensed milk, dairy, egg, gelatine, colouring carriers, toppings and shared utensils with the current vendor.",
    },
    {
      question: "Is Lod Chong gluten-free?",
      answer:
        "Rice, tapioca and mung-bean starches do not inherently require wheat, but the actual flour blend, extracts, toppings, packaged ingredients and shared press can introduce wheat or cross-contact. Verify the whole batch.",
    },
    {
      question:
        "What is the difference between Lod Chong and Lod Chong Singapore?",
      answer:
        "Classic Thai Lod Chong usually means short soft pressed flour jelly with coconut, syrup and ice. Lod Chong Singapore is a Bangkok-named branch with a distinctly chewier tapioca-noodle texture. Its name is associated with the former Singapore Theatre, not proof that it came from Singapore.",
    },
    {
      question: "Is Lod Chong the same as cendol?",
      answer:
        "Lod Chong belongs to the wider Southeast Asian cendol family of green jelly, coconut and sweetener, but country and regional versions differ in flour, jelly shape, syrup, toppings and names. Use cendol as context, not a guarantee of one bowl.",
    },
  ],
  related: [
    {
      title: "Bua Loy",
      description:
        "Compare short pressed jelly with a separate warm-or-hot coconut dessert built around round rice-flour balls.",
      href: "/food/bua-loy/",
      image: "/images/redesign/bua-loy-thai-coconut-rice-balls-hero.webp",
    },
    {
      title: "Mango Sticky Rice",
      description:
        "Move from an icy coconut bowl to sticky rice, ripe mango and a different coconut-sauce structure.",
      href: "/food/mango-sticky-rice/",
      image: "/images/redesign/mango-sticky-rice-dish-hero.webp",
    },
    {
      title: "Thai food guide",
      description:
        "Place Lod Chong among Thailand's dishes, desserts, regional flavours and practical ordering choices.",
      href: "/food/",
      image: "/images/redesign/thailand-food-hub-hero.webp",
    },
  ],
  sources: [
    {
      title: "Phetchaburi honoured as a Creative City of Gastronomy",
      creator: "Tourism Authority of Thailand, TAT Newsroom",
      url: "https://www.tatnews.org/2021/11/phetchaburi-honoured-with-unesco-creative-city-of-gastronomy-status/",
      note: "Current primary capture used for Phetchaburi's named Lod Chong Namtan Khon format with pandanus cendol and palm-sugar fudge. It was not generalised to every Lod Chong bowl.",
    },
    {
      title: "Thai Lod Chong Dessert",
      creator: "Hungry in Thailand",
      url: "https://hungryinthailand.com/lod-chong-dessert-cendol-recipe/",
      note: "Complete competitor DFS parse used for rice-and-tapioca jelly, pandan liquid, pressing, salted coconut milk, syrup, crushed ice and optional toppings. Exact quantities, timings, storage, personal and guarantee claims were excluded.",
    },
    {
      title: "Lod Chong Thai",
      creator: "ImportFood",
      url: "https://importfood.com/recipes/recipe/1250-lod-chong-thai-recipe",
      note: "Complete specialist DFS parse used for rice-and-mung-bean-flour variation, pandan water, pressing, palm-sugar and coconut-cream sauce and crushed-ice service. Exact quantities, timing, sales and superlative claims were excluded.",
    },
    {
      title: "Lod Chong Singapore",
      creator: "Hot Thai Kitchen",
      url: "https://hot-thai-kitchen.com/lod-chong-singapore/",
      note: "Complete specialist DFS parse used to separate the chewy tapioca-noodle Bangkok format, pandan coconut liquid and optional jackfruit from classic Thai Lod Chong. Exact recipe, storage, automatic-dietary and inventor claims were excluded.",
    },
    {
      title: "Lod Chong Singapore: a Thai dessert with a surprising backstory",
      creator: "Nation Thailand",
      url: "https://www.nationthailand.com/life/food/40056313",
      note: "Complete current capture used to triangulate rice-flour classic versus tapioca Singapore branch and the Singapore Theatre naming account. Exact date, inventor, popularity and promotional claims were excluded.",
    },
    {
      title: "Allergen Guidance for Food Businesses",
      creator: "UK Food Standards Agency",
      url: "https://www.food.gov.uk/business-guidance/allergen-guidance-for-food-businesses",
      note: "Current primary guidance used for ingredient, declared-allergen and cross-contact boundaries.",
    },
  ],
  methodDescription:
    "Updated 28 July 2026 after two independent DataForSEO clusters with 37 raw keyword records and 50 competitor domains, ten current UK-English SERP sets with 68 organic result appearances, 52 People Also Ask appearances and 31 case-normalised unique questions, four complete specialist or competitor DFS parses, current Tourism Authority of Thailand primary context, current FSA guidance, plus exact owner ranking and backlink checks. 'Lod chong' has UK volume 90 and KD 0; the route has zero current ranking terms but one backlink from one referring domain and historical GSC impressions and a click, so its exact canonical was retained. Lod Chong Singapore as a primary owner, generic cendol, dawet, bánh lọt, origin disputes, Bua Loy, Ruam Mit, Tub Tim Krob, Kluai Buat Chi, recipe-only, press retail, near-me, delivery, cakes, packaged drinks, calories, nutrition and health remain independent. Fixed-price, calorie, health, permanent-stall, universal-availability, fixed-sweetness, compulsory-ingredient, colour, texture, translation, origin, inventor, date, royal-history, wedding-symbolism, regional, automatic-dietary, water-or-ice-safety, guaranteed-cross-contact, exact-time, storage, first-hand, authenticity and superlative claims were excluded; Recipe schema is deliberately absent.",
};

export function LodChongGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
