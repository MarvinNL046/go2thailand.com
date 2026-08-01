import { ChefHat, Leaf, MapPin, ShoppingBasket, Sparkles, Sun, UtensilsCrossed } from 'lucide-react';
import { KLOOK_GENERIC, withSubId } from '../../lib/affiliates';
import { DishEditorialTemplate, type DishEditorialData } from './DishEditorialTemplate';

const data: DishEditorialData = {
  title: 'Mango Sticky Rice in Thailand: Ingredients, Season & How to Eat It',
  description: 'Understand Thai mango sticky rice before ordering it: ingredients, glutinous rice, taste, mango season, vegan and gluten checks, eating and cooking sequence, plus genuine UK search questions.',
  canonical: 'https://go2-thailand.com/food/mango-sticky-rice/',
  updatedAt: '28 July 2026',
  name: 'Mango Sticky Rice',
  thaiName: 'ข้าวเหนียวมะม่วง',
  heroImage: '/images/redesign/mango-sticky-rice-dish-hero.webp',
  heroAlt: 'Golden ripe mango with coconut-dressed Thai glutinous rice and crisp mung beans on a canal-house veranda',
  heroEyebrow: 'Summer fruit, sweet-salty balance',
  lead: 'Mango sticky rice pairs ripe mango with steamed Thai glutinous rice dressed in sweetened coconut milk, then adds a salted coconut sauce and sometimes a crisp topping. The plate looks simple; rice type, mango ripeness, salt and timing decide whether the parts feel balanced.',
  quickFacts: [
    { label: 'Thai name', value: 'Khao niao mamuang', icon: UtensilsCrossed },
    { label: 'Typical profile', value: 'Fruity · creamy · sweet · salty', icon: Sparkles },
    { label: 'Peak fruit context', value: 'Late March to July', icon: Sun },
    { label: 'Where', value: 'Markets, dessert shops and restaurants', icon: MapPin },
  ],
  navItems: [
    { href: '#taste', label: 'Taste', icon: Sparkles },
    { href: '#ingredients', label: 'Ingredients', icon: ShoppingBasket },
    { href: '#choose', label: 'Choose', icon: UtensilsCrossed },
    { href: '#order', label: 'Eat', icon: MapPin },
    { href: '#cook', label: 'Cook', icon: ChefHat },
    { href: '#questions', label: 'Questions', icon: Leaf },
  ],
  taste: {
    intro: 'Ripe mango brings floral fruit and acidity; coconut-dressed rice supplies chew and richness. A salted coconut sauce should sharpen the contrast rather than turn the plate into one flat layer of sweetness.',
    texture: 'The rice should be tender and distinctly chewy, not ordinary steamed rice or a loose pudding. Mango stays soft and juicy; crisp mung beans or sesame may add a small crackle.',
    finish: 'Coconut and mango linger, while salt keeps the final bite lively. Mango variety, ripeness and the amount of sauce can move the balance considerably.',
    scores: [{ label: 'Fruity', value: 5 }, { label: 'Creamy', value: 4 }, { label: 'Sweet', value: 4 }, { label: 'Salty', value: 2 }],
  },
  ingredients: [
    { name: 'Thai glutinous rice', role: 'Long-grain sticky or sweet rice is steamed for a dense chew; it is not jasmine, basmati or ordinary long-grain rice.' },
    { name: 'Ripe mango', role: 'Sweet Thai varieties are familiar, but ripeness and seasonal supply matter more than a guaranteed cultivar name.' },
    { name: 'Coconut milk', role: 'Dresses the hot rice and usually forms the finishing sauce; brands and coconut concentration behave differently.' },
    { name: 'Sugar', role: 'Dissolves into the coconut dressing. Amount and type vary; sweetness should not erase the fruit or salt.' },
    { name: 'Salt', role: 'A small but structural counterweight in both the rice dressing and the coconut finish.' },
    { name: 'Rice flour or starch', role: 'May thicken a finishing sauce; the exact thickener is a useful gluten and ingredient check.' },
    { name: 'Split mung beans', role: 'A familiar crisp topping after toasting or frying, but not every vendor uses it.' },
    { name: 'Sesame or another topping', role: 'Possible texture and allergen variation; inspect the finished plate rather than assuming one standard garnish.' },
  ],
  allergenCopy: 'Rice itself is naturally gluten-free, but a finished plate can include a thickener, topping or cross-contact that matters for coeliac disease. Coconut, sesame, mung bean, peanut cross-contact and any dairy substitution may also matter. Ask the vendor about the complete plate and shared tools.',
  vegetarianCopy: 'A classic rice–mango–coconut version can be plant-based, but the name is not a certification. Confirm whether condensed milk, dairy cream, butter, another topping or shared preparation appears before calling a vendor plate vegan or dairy-free.',
  formats: [
    { title: 'Market portion', bestFor: 'Seeing mango cut and a compact portion assembled in front of you.', tradeOff: 'Ask when the rice was dressed, what tops it and whether the sauce or tools cross other desserts.' },
    { title: 'Dessert specialist', bestFor: 'Comparing mango ripeness, rice texture and coconut balance where turnover is focused on sweets.', tradeOff: 'Fame, queue length and a higher price do not prove today’s mango or dietary controls.' },
    { title: 'Home or class', bestFor: 'Learning why soaking, steaming, hot-rice absorption and salted sauce are separate decisions.', tradeOff: 'Use a tested recipe and the correct rice; ordinary rice or an undocumented cooker mode changes the result.' },
  ],
  orderSteps: [
    { title: 'Read the fruit and rice', text: 'Look for ripe, fragrant mango and glossy grains that still hold shape. Ask whether the portion is freshly assembled if texture matters.' },
    { title: 'State the boundary', text: 'For vegan, dairy-free, sesame or coeliac needs, ask about coconut sauce, condensed milk, thickener, topping and shared utensils.' },
    { title: 'Build one complete bite', text: 'Taste mango, coconut rice and a little salted sauce together. Warm, room-temperature or cool service can all occur; judge the balance before adding more sauce.' },
  ],
  cooking: {
    title: 'Soak. Steam. Dress. Rest. Slice.',
    intro: 'The defining move is dressing freshly steamed glutinous rice while it can absorb sweetened coconut milk. Salted coconut sauce, ripe mango and crisp topping are prepared separately, then brought together only when the rice has rested and the fruit is ready.',
    steps: ['Buy Thai long-grain glutinous rice rather than jasmine or basmati.', 'Rinse and soak it for the duration specified by a tested recipe.', 'Drain and steam the rice so the grains cook with vapour rather than boiling like ordinary rice.', 'Dissolve sugar and salt in coconut milk, then fold it into hot rice.', 'Rest the dressed rice while making the salted sauce and crisp topping.', 'Slice ripe mango and assemble shortly before serving so fruit and topping keep their texture.'],
    boundary: 'Rice age, soaking time, steamer, coconut brand, mango ripeness and room temperature all change the result. Follow a tested recipe for exact quantities, heat and storage. This page protects the preparation logic and existing recipe-search intent without inventing untested measurements.',
  },
  affiliates: [
    { href: '/go/simple-thai-food-cookbook/', title: 'Simple Thai Food', text: 'A broad Thai cooking reference can explain rice, coconut desserts and balance beyond one isolated recipe. Compare the current edition, seller, format and delivery details.' },
    { href: '/go/zojirushi-six-cup-rice-cooker/', title: 'Six-cup rice cooker', text: 'Only consider a cooker if its current manual supports the glutinous-rice or steaming method you intend to use. Check capacity, voltage, plug, warranty and local compatibility before buying.' },
  ],
  classHref: withSubId(KLOOK_GENERIC, 'en-mango-sticky-rice-dish-cooking-class'),
  classCopy: 'A suitable class can show rice selection, steaming, coconut absorption and mango ripeness in context. Klook results are broad: confirm that mango sticky rice is on the current menu, whether each guest prepares it and how dietary requests are handled.',
  classSignals: [
    { title: 'Rice identity', text: 'Separate Thai glutinous rice from jasmine, basmati and ordinary rice.' },
    { title: 'Absorption', text: 'See why hot steamed rice and coconut dressing meet before the fruit is cut.' },
    { title: 'Final balance', text: 'Use salted sauce, ripe mango and crisp topping as distinct controls.' },
  ],
  faqs: [
    { question: 'What is mango sticky rice made of?', answer: 'A familiar Thai version uses steamed long-grain glutinous rice dressed with sweetened coconut milk and salt, ripe mango, salted coconut sauce and sometimes crisp split mung beans or sesame. Vendor toppings, thickeners and sweetness vary.' },
    { question: 'What is mango sticky rice called in Thailand?', answer: 'The Thai name is ข้าวเหนียวมะม่วง, commonly transliterated as khao niao mamuang or khao niew mamuang. Showing the written Thai name can be clearer than relying on one English spelling.' },
    { question: 'What does mango sticky rice taste like?', answer: 'It combines floral ripe mango, sweet-salty coconut, creamy richness and chewy rice. The best balance is not simply “very sweet”: fruit acidity and salt should remain noticeable, while toppings can add a light crunch.' },
    { question: 'Which rice is used for mango sticky rice?', answer: 'Thai white long-grain glutinous rice, also sold as sticky rice or sweet rice, is the usual choice. It is soaked and steamed. Jasmine, basmati and ordinary long-grain rice do not create the same dense chew or absorption.' },
    { question: 'Is Thai sticky rice the same as jasmine rice?', answer: 'No. Both are rice, but glutinous rice has a different starch structure and cooks into a dense, sticky texture. Jasmine rice stays fluffier and separate. “Glutinous” describes the texture; it is not the same word as gluten.' },
    { question: 'Is mango sticky rice usually vegan?', answer: 'The classic combination of rice, mango, coconut milk, sugar and salt can be vegan, but a vendor may use condensed milk, dairy cream, butter or another topping. Ask about the actual sauce, garnish and shared preparation.' },
    { question: 'Is sticky rice gluten-free?', answer: 'Rice is naturally gluten-free, despite the name glutinous rice. For coeliac disease, confirm any sauce thickener, toppings, product labels and cross-contact. A naturally gluten-free ingredient does not guarantee a finished vendor plate.' },
    { question: 'Does mango sticky rice contain dairy?', answer: 'Traditional-looking coconut versions need not contain dairy, but condensed milk, dairy cream or butter may appear in modern or vendor-specific versions. Ask rather than treating white sauce as proof either way.' },
    { question: 'Do you eat mango sticky rice cold or warm?', answer: 'Service varies. The rice may be warm or at room temperature after resting, while mango is often cooler. Eat the components together and avoid leaving a coconut-and-rice dessert unrefrigerated beyond safe handling guidance.' },
    { question: 'What month is mango season in Thailand?', answer: 'Thailand Foundation describes the broad mango season as late March to July, with mango sticky rice especially associated with the peak and Thai summer. It is sold year-round, but cultivar, ripeness and supply vary by place and year.' },
  ],
  related: [
    { title: 'Thai food guide', description: 'Place coconut desserts beside curries, soups, noodles and regional ordering decisions.', href: '/food/', image: '/images/redesign/thailand-food-hub-hero.webp' },
    { title: 'Bangkok street food', description: 'Choose markets and neighbourhoods by timing, route and fit rather than one permanent “best” list.', href: '/blog/best-street-food-markets-bangkok/', image: '/images/redesign/bangkok-street-food-hero.webp' },
    { title: 'Vegetarian Thailand', description: 'Check visible ingredients, sauces, toppings and shared preparation without assumptions.', href: '/travel-guides/vegetarian-vegan-thailand/', image: '/images/redesign/vegetarian-thailand-hero.webp' },
  ],
  sources: [
    { title: 'Thai Mango Sticky Rice Recipe', creator: 'Hot Thai Kitchen', url: 'https://hot-thai-kitchen.com/mango-sticky-rice/', note: 'Full DFS parse used for rice identity, coconut dressing, salted sauce, topping and tested preparation sequence.' },
    { title: 'Insight Thainess: Mango with Sticky Rice', creator: 'Tourism Authority of Thailand', url: 'https://www.tatnews.org/2018/03/insight-thainess-episode-1-mango-with-sticky-rice/', note: 'Full primary-source parse used for Thai household, orchard and summer context.' },
    { title: 'A Beginner’s Guide to Seasonal Thai Fruits', creator: 'Thailand Foundation', url: 'https://thailandfoundation.or.th/the-beginners-guide-to-seasonal-thai-fruits/', note: 'Full DFS parse used for late-March-to-July mango season and year-round-versus-peak distinction.' },
    { title: 'Gluten Free Options: What Grains Can You Safely Eat?', creator: 'Coeliac UK', url: 'https://www.coeliac.org.uk/grains/', note: 'Full expert-source parse used for rice as naturally gluten-free and cross-contamination boundaries.' },
  ],
  methodDescription: 'Updated 28 July 2026 after a 37-record DataForSEO cluster with 50 competitor domains, ten current UK-English SERPs with 68 organic results, 56 People Also Ask records and 50 unique genuine questions, four usable full source parses, plus exact ranking and backlink checks for both candidate owners. Five ranking variants are preserved on the canonical dish route. The overlapping English seasonal blog returned no ranking or reportable backlink signal and consolidates into this owner; Dutch remains independent. Near-me delivery, London, celebrity, fixed-price, fixed-calorie, universal-health, exact-invention, one-best-shop, guaranteed-vegan, guaranteed-gluten-free and unsupported first-hand claims were excluded.',
};

export function MangoStickyRiceGuideEn() {
  return <DishEditorialTemplate data={data} />;
}
