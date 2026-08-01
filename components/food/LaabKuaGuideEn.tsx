import { ChefHat, Flame, Leaf, MapPin, ShoppingBasket, Sparkles, UtensilsCrossed } from 'lucide-react';
import { KLOOK_GENERIC, withSubId } from '../../lib/affiliates';
import { DishEditorialTemplate, type DishEditorialData } from './DishEditorialTemplate';

const data: DishEditorialData = {
  title: 'Laab Kua: Northern Thai Spiced Larb & How to Order',
  description: 'Understand Northern Thai Laab Kua: its prik-laab spices, makhwaen, cooked preparation, taste, heat, Laab Kua versus Isan larb and dietary checks.',
  canonical: 'https://go2-thailand.com/food/laab-kua/',
  updatedAt: '28 July 2026',
  name: 'Laab Kua',
  thaiName: 'ลาบคั่ว',
  heroImage: '/images/redesign/laab-kua-lanna-table-hero.webp',
  heroAlt: 'Fully cooked dark Northern Thai Laab Kua with roasted spices, fried shallot and herbs beside sticky rice and vegetables on a Lanna textile',
  heroEyebrow: 'Lanna spice · makhwaen · cooked in the pan',
  lead: 'Laab Kua — also written Laab Khua or Larb Kua — is the cooked, spice-led Northern Thai relative of better-known Isan larb. Its centre is prik laab: an aromatic roasted blend that can include makhwaen, dried chilli and warm spices. It is darker and more savoury than the lime-and-toasted-rice plate many travellers expect.',
  quickFacts: [
    { label: 'Region', value: 'Northern Thailand · Lanna', icon: MapPin },
    { label: 'Signature', value: 'Prik laab roasted-spice blend', icon: Sparkles },
    { label: 'Aromatic cue', value: 'Makhwaen · warm spice · herbs', icon: Flame },
    { label: 'Preparation', value: 'Kua · cooked while stirred in a pan', icon: UtensilsCrossed },
  ],
  navItems: [
    { href: '#taste', label: 'Taste', icon: Sparkles },
    { href: '#ingredients', label: 'Spices', icon: ShoppingBasket },
    { href: '#choose', label: 'Boundary', icon: UtensilsCrossed },
    { href: '#order', label: 'Order', icon: MapPin },
    { href: '#cook', label: 'Cook', icon: ChefHat },
    { href: '#questions', label: 'Questions', icon: Leaf },
  ],
  taste: {
    intro: 'Northern Laab Kua is led by roasted aroma rather than a sharp lime dressing. Warm spice, dried chilli, garlic and shallot create depth; makhwaen can add a citrusy, lightly tingling lift; fresh herbs keep the cooked mince from feeling heavy.',
    texture: 'The mince is fully cooked and broken into small, spice-coated pieces. Fried garlic or shallot can add crisp edges, while herbs, raw vegetables and dense sticky rice provide contrast around the darker centre.',
    finish: 'Roasted prik laab and savoury meat linger first, followed by chilli warmth and aromatic spice. Makhwaen may leave a gentle tingle, but its presence and strength depend on the regional or house blend.',
    scores: [{ label: 'Roasted', value: 5 }, { label: 'Aromatic', value: 5 }, { label: 'Savoury', value: 4 }, { label: 'Hot', value: 3 }],
  },
  ingredients: [
    { name: 'Minced protein', role: 'Pork and beef are familiar, while chicken and other proteins occur. The name does not reveal fat level, offal, blood or whether a kitchen uses a premix.' },
    { name: 'Prik laab', role: 'The Northern spice system, not one fixed packet. Blends can combine many roasted whole and ground spices in materially different proportions.' },
    { name: 'Makhwaen', role: 'A Northern prickly-ash spice with aromatic, citrusy and tingling qualities. Sichuan pepper may substitute overseas but is not the same ingredient.' },
    { name: 'Dried chilli', role: 'Roasted or ground chilli can sit inside the spice blend or be adjusted separately. A premixed prik laab can limit heat changes at ordering time.' },
    { name: 'Warm spices', role: 'Documented blends can use coriander, cumin, pepper, long pepper, cloves, star anise, cinnamon, nutmeg or cardamom. No one list is universal.' },
    { name: 'Aromatic base', role: 'Garlic, shallot, lemongrass, galangal and fried alliums may build fragrance and texture. Their sequence belongs to the tested recipe.' },
    { name: 'Fish sauce · stock', role: 'Fish sauce is common in tested versions; stock, salt, soy or another seasoning may appear. These are hidden dietary and allergen checks.' },
    { name: 'Herbs and table', role: 'Mint, spring onion, coriander or local herbs can finish the plate. Sticky rice, vegetables and pork rind are familiar accompaniments, not requirements.' },
  ],
  allergenCopy: 'Fish is a common concern because fish sauce appears in tested versions. Soy, wheat, stock, commercial prik-laab mixes and shared pans or grinders can add other allergens. Do not infer gluten-free status from the absence of toasted rice or lime; verify the current spice blend, seasoning and cross-contact.',
  vegetarianCopy: 'A plant-mince, tofu or mushroom adaptation is possible, but Laab Kua is meat-led by default and may use fish sauce, stock, liver or another animal ingredient. Confirm the protein, complete prik-laab seasoning and shared preparation rather than requesting “no meat” alone.',
  formats: [
    { title: 'Laab Kua · cooked', bestFor: 'The Northern roasted-spice experience while choosing a fully cooked minced protein.', tradeOff: 'Ask about optional offal or blood, heat and seasoning. “Kua” identifies cooking but not one universal pan method or spice formula.' },
    { title: 'Northern laab dib', bestFor: 'Understanding why the word “cooked” matters when reading a local Northern menu.', tradeOff: 'This is a raw form, outside this owner’s recommended preparation. Freshness alone does not remove minced-meat risk.' },
    { title: 'Isan larb', bestFor: 'A brighter lime-, herb- and toasted-rice-led dish family found across Thailand.', tradeOff: 'Larb, laab and laap can be spelling variants, but regional naming changes the actual plate. Use the broad Larb guide for this intent.' },
  ],
  orderSteps: [
    { title: 'Name the Northern form', text: 'Ask for Laab Kua or show ลาบคั่ว. “Laab” alone can describe a different Northern or Isan preparation, depending on restaurant and province.' },
    { title: 'Confirm the cooked protein', text: 'Choose the available pork, beef, chicken or other version and confirm it is fully cooked. Ask directly whether liver, other offal or blood is part of the house recipe.' },
    { title: 'Check spice and seasoning', text: 'Ask how hot the prik laab is and whether fish sauce, stock, soy, wheat or a commercial premix is used. Add sticky rice and vegetables only after those boundaries are clear.' },
  ],
  cooking: {
    title: 'Roast. Cool. Grind. Cook. Finish.',
    intro: 'The defining work happens before the mince reaches the plate. A tested recipe roasts selected spices without scorching, cools and grinds them, prepares a separate aromatic base, combines seasoning safely and cooks the minced protein completely before fresh herbs and crisp alliums finish the dish.',
    steps: ['Select one tested Northern Laab Kua recipe and map every whole spice, ground spice, protein, optional offal, seasoning and allergy boundary.', 'Roast only the specified spices at the stated heat, moving them constantly and cooling them before grinding.', 'Grind the prik laab to the recipe’s texture; keep chilli separate only when the tested method instructs it.', 'Prepare raw protein with dedicated tools and surfaces, preventing contact with herbs, vegetables, cooked food and serving utensils.', 'Cook the aromatic base and minced mixture in the tested sequence until the meat is thoroughly cooked and no unsafe clumps remain.', 'Taste within the recipe boundary, then finish with herbs and optional fried garlic or shallot and serve with prepared sticky rice and vegetables.'],
    boundary: 'Northern recipes vary greatly in spice blend, moisture, fat, offal and pan method. WHO advises separating raw and cooked food and cooking minced meat thoroughly; use a tested recipe for exact quantities, safe temperatures, cooling, storage and reheating. This editorial page deliberately does not publish Recipe schema.',
  },
  affiliates: [
    { href: '/go/simple-thai-food-cookbook/', title: 'Simple Thai Food', text: 'A broad Thai cooking reference can place Northern spice systems and regional larb differences in context. Compare the current edition, format, seller and delivery details.' },
    { href: '/go/thai-granite-mortar-eight-inch/', title: 'Eight-inch granite mortar', text: 'A stable mortar can grind cooled roasted spices, but batch size, weight, usable interior and worktop protection matter. Compare it with a spice grinder for your actual method.' },
  ],
  classHref: withSubId(KLOOK_GENERIC, 'en-laab-kua-northern-thai-cooking-class'),
  classCopy: 'A suitable Northern Thai class can make the invisible work visible: roasting a prik-laab blend, separating raw and cooked tools and recognising a Laab Kua rather than an Isan larb. Klook results are broad, so confirm the current menu and handling before booking.',
  classSignals: [
    { title: 'Spice roast', text: 'Learn which spices enter one local prik laab and how aroma changes before burning.' },
    { title: 'Makhwaen cue', text: 'Distinguish the Northern prickly-ash aroma from a convenient Sichuan-pepper substitute.' },
    { title: 'Cooked boundary', text: 'Confirm the protein, optional offal and the raw-to-cooked separation before tasting.' },
  ],
  faqs: [
    { question: 'What are the spices in Northern laab?', answer: 'Northern prik-laab blends vary. Documented versions may combine dried chilli, coriander seed, cumin, pepper, long pepper, makhwaen, cloves, star anise, cinnamon, nutmeg, cardamom and other aromatics. Treat the kitchen’s blend as the answer, not one universal list.' },
    { question: 'Is there a difference between laab and larb?', answer: 'Laab, larb and laap are often English spellings of the same Thai word. The added regional or preparation name matters more: Laab Kua is a cooked Northern spice-led form, while familiar Isan larb is commonly lime-, herb- and toasted-rice-led.' },
    { question: 'What is laab seasoning made of?', answer: 'For Laab Kua, seasoning centres on a roasted Northern prik-laab blend plus chilli and savoury seasoning such as fish sauce or salt. Makhwaen is characteristic in many blends, but spice counts and proportions vary by province, family and packet.' },
    { question: 'What is laab made of?', answer: 'The wider family uses minced or finely chopped protein and seasoning. Laab Kua commonly combines cooked minced pork or beef with prik laab, dried chilli, aromatics and herbs; chicken, optional liver, other offal or blood and meat-free adaptations also occur.' },
    { question: 'What is a famous northern Thai dish?', answer: 'Khao Soi is internationally familiar, while Laab Kua, Sai Oua, Gaeng Hung Lay and Northern chilli dips show very different Lanna techniques. Laab Kua is especially useful for understanding the North’s roasted-spice system rather than coconut or lime-led flavour.' },
    { question: 'What are the different types of laab?', answer: 'Names can identify protein, province, region or cooking method. Broad examples include Isan larb, Northern laab dib served raw and Northern Laab Kua cooked in a pan, plus pork, beef, chicken, duck and fish versions. Ask for the complete name and preparation.' },
    { question: 'Is Thai laab spicy?', answer: 'It can be. Laab Kua uses dried chilli inside or beside its prik-laab blend, while makhwaen can add tingle without the same chilli burn. A kitchen may adjust extra chilli, but a premixed spice blend limits how far heat can be removed.' },
    { question: 'How is Laab served?', answer: 'Laab Kua is commonly served with sticky rice, fresh herbs and vegetables; fried garlic, shallot or pork rind may join the plate. It can be shared as part of a Northern meal, but accompaniments and occasion vary.' },
    { question: 'Is laab eaten hot or cold?', answer: 'Laab Kua is a cooked dish and may arrive warm or at room temperature depending on service. That is different from Northern raw laab. Serving temperature alone cannot prove safe handling or identify every recipe.' },
    { question: 'What does laab taste like?', answer: 'Laab Kua is savoury, roasted and aromatic, often with dried-chilli warmth and a tingle from makhwaen. It usually lacks the sharp lime-and-toasted-rice centre associated with familiar Isan larb, although house recipes remain variable.' },
  ],
  related: [
    { title: 'Isan Larb guide', description: 'Compare the broad lime-, herb- and toasted-rice family with this Northern cooked form.', href: '/food/larb/', image: '/images/redesign/larb-isaan-table-hero.webp' },
    { title: 'Chiang Mai guide', description: 'Plan a Northern base for markets, cooking classes and Lanna food context.', href: '/city/chiang-mai/', image: '/images/redesign/destination-chiang-mai.webp' },
    { title: 'Khao Soi guide', description: 'Move from roasted-spice mince to Chiang Mai’s layered curry-noodle tradition.', href: '/blog/khao-soi-chiang-mai-guide/', image: '/images/redesign/khao-soi-chiang-mai-hero.webp' },
  ],
  sources: [
    { title: 'Northern Laab Kua: The Other Laab You Didn’t Know About', creator: 'Hot Thai Kitchen', url: 'https://hot-thai-kitchen.com/laab-kua/', note: 'Complete DFS parse used for naming, prik-laab variability, makhwaen substitution boundary, proteins, cooked-versus-raw distinction, tested technique and accompaniments.' },
    { title: 'Laab / Luu', creator: 'Northern Thai Information Center, Chiang Mai University Library', url: 'https://lannainfo.library.cmu.ac.th/lannafood/food-type/11', note: 'Current primary Thai-language source capture used for the definition of Laab Kua as seasoned laab subsequently cooked by kua; DFS returned no markdown, so no unsupported translation detail was added.' },
    { title: 'How A Thai Chef Makes Northern-Style Laab & Sticky Rice', creator: 'Epicurious with Chef Hong Thaimee', url: 'https://www.epicurious.com/video/watch/passport-kitchen-how-a-thai-chef-makes-northern-style-laab-and-sticky-rice', note: 'Complete DFS transcript parse used for one chef’s Lanna context, prik-laab spice examples and contrast with Isan toasted-rice larb.' },
    { title: 'How to Make Phayao Northern Laab', creator: 'KHUA Phayao', url: 'https://khualab.com/en/articles/how-to-make-phayao-northern-larb', note: 'Complete commercial-source parse used for one Phayao expression, makhwaen and roasted-spice focus; product and authenticity marketing claims were excluded.' },
  ],
  methodDescription: 'Updated 28 July 2026 after three independent DataForSEO clusters with four total keyword records, ten current UK-English SERPs with 67 organic results, 55 People Also Ask appearances and 32 unique genuine questions, three complete DFS source parses, one current primary Chiang Mai University capture, plus exact ranking and backlink checks. The route has UK volume 10, zero ranking terms and no reportable backlink summary signal, but remains separate because search and culinary sources consistently distinguish cooked Northern spice-led Laab Kua from broad Isan Larb. Fixed prices, calories, health labels, raw-meat reassurance, automatic dietary claims, one golden spice list, universal dry-frying and unsupported first-hand claims were excluded.',
};

export function LaabKuaGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
