import { ChefHat, Leaf, MapPin, ShoppingBasket, Snowflake, Sparkles, UtensilsCrossed } from 'lucide-react';
import { KLOOK_GENERIC, withSubId } from '../../lib/affiliates';
import { DishEditorialTemplate, type DishEditorialData } from './DishEditorialTemplate';

const data: DishEditorialData = {
  title: 'Oh Aew Phuket: Jelly, Shaved Ice & How to Order It',
  description: 'Understand Phuket Oh Aew: fig-seed jelly, shaved ice, syrup, toppings, taste, aiyu and grass-jelly differences, dietary checks and how to order it.',
  canonical: 'https://go2-thailand.com/food/oh-aew/',
  updatedAt: '28 July 2026',
  name: 'Oh Aew',
  thaiName: 'โอ้เอ๋ว · O-Aew',
  heroImage: '/images/redesign/oh-aew-phuket-jelly-ice-hero.webp',
  heroAlt: 'Translucent Phuket Oh Aew jelly over fine shaved ice with red syrup, red beans, grass jelly and watermelon',
  heroEyebrow: 'Phuket Old Town · fig-seed jelly · shaved ice',
  lead: 'Oh Aew is Phuket’s local jelly-and-shaved-ice dessert: translucent fig-seed jelly, fine ice and syrup, with red beans, black grass jelly or fruit chosen separately. It belongs to a wider fig-jelly family, but Phuket’s bowl has its own identity. Point to the pale jelly first, then choose toppings and sweetness instead of assuming every colourful bowl is the same.',
  quickFacts: [
    { label: 'Place', value: 'Phuket · Hokkien-Chinese heritage', icon: MapPin },
    { label: 'Core', value: 'Translucent jelly · shaved ice · syrup', icon: Snowflake },
    { label: 'Texture', value: 'Soft · slippery · finely icy', icon: Sparkles },
    { label: 'Choice', value: 'Red bean · grass jelly · fruit', icon: ShoppingBasket },
  ],
  navItems: [
    { href: '#taste', label: 'Taste', icon: Sparkles },
    { href: '#ingredients', label: 'Signals', icon: ShoppingBasket },
    { href: '#choose', label: 'Choose', icon: UtensilsCrossed },
    { href: '#order', label: 'Order', icon: MapPin },
    { href: '#cook', label: 'Method', icon: ChefHat },
    { href: '#questions', label: 'Questions', icon: Leaf },
  ],
  taste: {
    intro: 'The jelly itself is delicate rather than strongly flavoured. Cold ice, syrup and toppings do most of the expressive work: sweetness from syrup, earthiness from red beans, firmer contrast from grass jelly and freshness from fruit.',
    texture: 'Expect soft, slippery translucent jelly against fine, fast-melting ice. Red beans add tenderness, black grass jelly is usually firmer and fruit brings juiciness. A bowl can become watery as it sits, so eat it while the contrast is clear.',
    finish: 'A classic bowl finishes cool, lightly sweet and clean rather than creamy. Condensed milk, flavoured powders, honey or modern syrups can make another shop’s version richer or much sweeter.',
    scores: [{ label: 'Cooling', value: 5 }, { label: 'Soft', value: 4 }, { label: 'Sweet', value: 3 }, { label: 'Rich', value: 1 }],
  },
  ingredients: [
    { name: 'Oh Aew jelly', role: 'The pale translucent centre of the bowl. Official Thai tourism material links it to seeds from a fruit in the fig family; shop formulas and setting methods vary.' },
    { name: 'Shaved ice', role: 'Fine ice chills and dilutes the syrup as it melts. Water source, protected storage, scoop hygiene and turnover matter more than how photogenic the ice looks.' },
    { name: 'Coloured syrup', role: 'A red or other coloured syrup supplies much of the sweetness. Colour, flavouring, sweetener and additives are vendor-level checks.' },
    { name: 'Red beans', role: 'A documented topping that adds soft, earthy contrast. In the local colour shorthand, red can refer to the beans rather than the syrup.' },
    { name: 'Black grass jelly', role: 'A separate darker plant-based jelly that can share the bowl. It is not Oh Aew and needs its own ingredient and cross-contact check.' },
    { name: 'Watermelon or fruit', role: 'Watermelon and other fruit can add fresh sweetness and texture. Availability and cutting hygiene vary by shop and season.' },
    { name: 'Modern toppings', role: 'Honey, condensed milk, flavoured powders or café-style extras can change dairy, vegan, allergen and sweetness boundaries.' },
    { name: 'Setting system', role: 'Fig-seed pectin can form a gel through water extraction and mineral-ion interactions. A shop may use its own seed material, binder or preparation process.' },
  ],
  allergenCopy: 'Nothing about a clear jelly bowl certifies it as gluten-free, halal or allergen-free. Packaged syrup, flavour powders, condensed milk, toppings, setting agents and shared scoops can introduce milk, gluten, soy, nuts, sesame, animal-derived additives or cross-contact. Ask about the complete bowl when a medical or religious restriction matters.',
  vegetarianCopy: 'The core jelly, ice and syrup may look plant-based, but the name is not a vegan certificate. Honey, condensed milk, dairy powder, colourings, packaged toppings, setting agents and shared utensils can change suitability. Confirm each chosen component rather than asking only whether “Oh Aew” is vegan.',
  formats: [
    { title: 'White and red', bestFor: 'Meeting the translucent Oh Aew jelly with shaved ice, syrup and red beans in a restrained local-style combination.', tradeOff: 'White and red is a documented ordering shorthand, not a universal menu code. Point to the jelly and beans and choose syrup sweetness.' },
    { title: 'White, black and red', bestFor: 'Adding firmer black grass jelly and red beans so three textures sit against the melting ice.', tradeOff: 'Grass jelly is a separate product. Check its ingredients and remember that extra toppings can hide the core Oh Aew texture.' },
    { title: 'Fruit or café variation', bestFor: 'Pairing the pale jelly with watermelon, lemon, lychee or another current shop topping.', tradeOff: 'Modern versions may add honey, condensed milk or powders. Verify the actual topping, dairy and sweetness instead of assuming “fruit” means simpler.' },
  ],
  orderSteps: [
    { title: 'Identify the pale jelly', text: 'Ask for Oh Aew or show โอ้เอ๋ว, then point to the translucent jelly. Do not let black grass jelly or generic shaved ice silently replace the local ingredient you came to try.' },
    { title: 'Choose colour and sweetness', text: 'Select red beans, black grass jelly or fruit, then ask for less syrup if preferred. Treat white-black-red as a useful clue, not a rule every stall must follow.' },
    { title: 'Check the full bowl', text: 'Ask about milk, honey, powders, setting agents and shared utensils when relevant. Choose a clean, high-turnover stall with protected ice and cold toppings, then eat before the ice fully melts.' },
  ],
  cooking: {
    title: 'Extract. Set. Chill. Shave. Assemble.',
    intro: 'Fig-seed jelly is a specialised pectin system, not a packet-gelatine shortcut. Research on related aiyu jelly shows that washing the seeds releases low-methoxyl pectin that can form a network in water. A tested Oh Aew method still needs to specify the actual seed material, water and setting conditions rather than borrowing an aiyu formula blindly.',
    steps: ['Choose a complete, tested Oh Aew or clearly labelled fig-seed-jelly method and verify the botanical ingredient rather than substituting an anonymous jelly powder.', 'Use potable water, clean cloth or equipment and the exact seed-to-water process specified by that method; do not infer quantities from this traveller guide.', 'Let the extracted pectin set under the tested conditions without disturbing the gel, then refrigerate and protect it from cross-contamination.', 'Prepare syrup and every topping separately, documenting dairy, honey, gluten and allergen boundaries before they reach the serving station.', 'Make shaved ice only from potable water with a clean, food-safe machine or tool; keep the ice protected and do not refreeze melted dessert ice.', 'Cut the chilled jelly with clean utensils, assemble immediately and follow current local time-and-temperature guidance for leftovers.'],
    boundary: 'The published science explains a related aiyu gel mechanism; it does not prove one universal Phuket recipe. Water chemistry, seed source, extraction, temperature and additives can change setting. Use a tested food method and current hygiene guidance. This owner deliberately omits Recipe schema.',
  },
  affiliates: [
    { href: '/go/simple-thai-food-cookbook/', title: 'Simple Thai Food', text: 'A broader Thai food reference can help place desserts and regional cooking in context. Check the current table of contents, edition, format, seller and delivery details; Oh Aew is not guaranteed to be included.' },
  ],
  classHref: withSubId(KLOOK_GENERIC, 'en-oh-aew-phuket-food-walk'),
  classCopy: 'A suitable Phuket Old Town food walk can connect Oh Aew with the island’s Hokkien-Chinese food culture and let you compare toppings in context. Klook results are broad, so confirm that Oh Aew is an explicit current stop and check group size, dietary handling, language, meeting point and cancellation terms.',
  classSignals: [
    { title: 'The real jelly', text: 'Identify translucent Oh Aew before black grass jelly, syrup and café toppings take over the bowl.' },
    { title: 'Local shorthand', text: 'Use white, black and red as a starting point, then point and confirm what this vendor means.' },
    { title: 'Old Town context', text: 'Connect the dessert to Phuket’s wider Hokkien-Chinese food story instead of treating it as generic shaved ice.' },
  ],
  faqs: [
    { question: 'What is Oh Aew?', answer: 'Oh Aew, also written O-Aew, is a Phuket dessert built around pale translucent fig-seed jelly, shaved ice and syrup. Red beans, black grass jelly, watermelon or modern toppings may be added separately.' },
    { question: 'What is O-Aew dessert?', answer: 'O-Aew is another English spelling of Oh Aew. It refers to Phuket’s local jelly-and-ice dessert, not one fixed topping list or a generic name for every Thai shaved-ice bowl.' },
    { question: 'What is the jelly dessert in Phuket?', answer: 'Oh Aew is the distinctive Phuket answer: a soft translucent jelly served over or with shaved ice and syrup. The Tourism Authority of Thailand connects its jelly to seeds from a fruit in the fig family.' },
    { question: 'What is Thai shaved ice called?', answer: 'Thailand has several shaved-ice desserts, so there is no single name for every bowl. In Phuket, Oh Aew names the local fig-seed-jelly dessert; nam khaeng sai is a broader Thai shaved-ice category with many possible toppings.' },
    { question: 'What is Oh Aew made from?', answer: 'The stable bowl has Oh Aew jelly, shaved ice and syrup. Official Thai material describes the jelly as coming from fig-family fruit seeds. Shops may add red beans, grass jelly, fruit, milk, honey or powders, and their setting formula can vary.' },
    { question: 'What does Oh Aew taste like?', answer: 'The translucent jelly is delicate and lightly flavoured. Syrup supplies sweetness, ice keeps it clean and cold, and toppings add most of the contrast: earthy beans, firmer grass jelly, juicy fruit or richer dairy-style extras.' },
    { question: 'How is fig-seed jelly made?', answer: 'In the related aiyu system, washing fig seeds in water releases low-methoxyl pectin that forms a gel through mineral-ion crosslinks. Phuket Oh Aew methods can use their own seed material and process, so that science explains the mechanism without supplying one universal recipe.' },
    { question: 'Is Oh Aew the same as aiyu jelly?', answer: 'They are related fig-seed-jelly traditions, but “the same” is too strong. Taiwanese aiyu has a documented botanical and gel system; Phuket Oh Aew has its own local name, service style and vendor formulas. Compare them without importing one exact recipe into the other.' },
    { question: 'Is Oh Aew the same as grass jelly?', answer: 'No. Oh Aew is the pale translucent jelly at the centre of the Phuket dessert. Grass jelly is a separate dark jelly that may be added as a topping, which is why both can appear in one bowl.' },
    { question: 'Is Oh Aew vegan or gluten-free?', answer: 'It may be possible to order a plant-based and naturally gluten-free-looking version, but the name is not a vegan, halal or gluten-free certification. Check syrup, honey, condensed milk, powders, setting agents, packaged toppings, shared scoops and preparation surfaces for the actual bowl.' },
  ],
  related: [
    { title: 'Phuket travel guide', description: 'Choose the right coast and reserve realistic time for the island’s Old Town food culture.', href: '/city/phuket/', image: '/images/redesign/phuket-destination-hero-v2.webp' },
    { title: 'Phuket Old Town', description: 'Walk the shophouses, markets and heritage streets that give Oh Aew its local setting.', href: '/phuket/old-town/things-to-do/', image: '/images/redesign/phuket-old-town-walk-hero-v2.webp' },
    { title: 'Mee Hokkien', description: 'Try Phuket’s moist yellow wok noodles before finishing with this chilled local dessert.', href: '/food/mee-hokkien/', image: '/images/redesign/mee-hokkien-phuket-wok-hero.webp' },
  ],
  sources: [
    { title: 'Phuket food guide', creator: 'Tourism Authority of Thailand', url: 'https://api.tourismthailand.org/upload/live/content_article_file/128-28112.pdf', note: 'Current official source used for the Hokkien-Chinese Phuket identity, fig-family seed jelly and red-bean, fruit and red-syrup service.' },
    { title: 'Chill Out with O-Aew', creator: 'Phuket E-Magazine', url: 'https://www.phuketemagazine.com/phuket-vegetarian-festival-2024/o-aew-phuket/?lang=en', note: 'Complete DFS parse used for jelly, shaved ice, syrup, rectangular service, red beans, black jelly, watermelon, colour shorthand and topping variation. Prices, rankings and medical claims were excluded.' },
    { title: 'Rheo-chemistry of gelation in aiyu (fig) jelly', creator: 'Wang et al. · Food Hydrocolloids', url: 'https://www.sciencedirect.com/science/article/pii/S0268005X21004173', note: 'Complete DFS parse used for the related fig-seed extraction, low-methoxyl pectin and divalent-ion gel mechanism. It is not treated as proof of an identical Phuket formula.' },
    { title: 'Aiyu Jelly: A Unique Treat', creator: 'Taiwan Ministry of Agriculture', url: 'https://www.moa.gov.tw/redirect_files.php?file_name=h18wwVIWSWd2pnHeSeAOkWGEqualMl70OqwWqt7N01cVsjKWZ1WGSlas&id=51476', note: 'Primary comparison source used only to explain how aiyu seed washing relates to, but does not replace, the Phuket Oh Aew identity.' },
    { title: 'Phuket — Creative City of Gastronomy', creator: 'UNESCO Creative Cities Network', url: 'https://www.unesco.org/en/creative-cities/phuket?hub=80094', note: 'Primary civic context for Phuket gastronomy as intergenerational heritage; it is not used to prove a specific Oh Aew formula.' },
  ],
  methodDescription: 'Updated 28 July 2026 after two independent DataForSEO clusters with two raw keyword records, ten current UK-English SERPs with 78 organic results, 47 People Also Ask appearances and 43 unique questions, two complete DFS source parses, current Tourism Authority, Taiwan Ministry of Agriculture and UNESCO captures, plus exact owner ranking and backlink checks. DFS returned no measurable volume, difficulty or competitor-domain table; the owner has zero ranking terms and no reportable backlink summary signal. Celebrity, generic jelly, medical, fixed-price, calorie, health, automatic dietary, permanent restaurant, exact-origin and one-formula claims were excluded.',
};

export function OhAewGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
