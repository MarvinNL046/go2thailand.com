import { Bus, CheckCircle2, Clock3, Compass, Hotel, MapPin, Salad, ShieldCheck, ShoppingBag, Sparkles, TicketCheck, Utensils, Users } from 'lucide-react';
import { KLOOK_GENERIC, TRIP_GENERIC, withSubId } from '../../lib/affiliates';
import { PatongExperienceTemplate, type PatongExperienceData } from './PatongExperienceTemplate';

const HERO = '/images/redesign/patong-restaurants-hero-v2.webp';

export default function PatongRestaurantsEn({ stayHref }: { stayHref?: string }) {
  const foodExperiences = withSubId(KLOOK_GENERIC, 'patong-restaurants-owner-en-food');
  const stays = withSubId(stayHref || TRIP_GENERIC, 'patong-restaurants-owner-en-stays');
  const data: PatongExperienceData = {
    pageUrl: 'https://go2-thailand.com/phuket/patong/restaurants/', updatedAt: '2026-07-27', breadcrumbLabel: 'Restaurants',
    title: 'Patong Restaurants: Where to Eat Without a Static Top 10',
    description: 'Choose where to eat in Patong by zone, occasion and live checks. Compare Thai food, seafood, street food, family and dietary needs without stale rankings.',
    heroImage: HERO, heroAlt: 'Open-front Patong restaurant with Thai wok cooking and travellers sharing dinner at blue hour',
    heroEyebrow: 'Patong food, chosen with context', heroTitle: <>Eat well in Patong.<br /><span className="text-saffron-dark">Choose the meal, not a stale ranking.</span></>,
    heroSubtitle: 'Zone, occasion and current evidence beat a permanent top ten.',
    heroDescription: 'Patong has breadth, but search results mix current restaurants, resort dining, beach views and recycled lists. This guide helps you choose a useful zone and verify the live menu, recent feedback, dietary fit and total before sitting down.',
    primaryAction: { label: 'Choose your food zone', href: '#zones' }, affiliateAction: { label: 'Check current food experiences', href: foodExperiences },
    navItems: [
      { href: '#decide', label: 'How to choose', icon: Compass }, { href: '#zones', label: 'Food zones', icon: MapPin },
      { href: '#choose', label: 'By occasion', icon: Utensils }, { href: '#rhythm', label: 'Meal rhythm', icon: Clock3 },
      { href: '#practical', label: 'Food checks', icon: ShieldCheck }, { href: '#book', label: 'Live options', icon: TicketCheck },
    ],
    introEyebrow: 'First decide', introTitle: <>What kind of meal<br />are you actually choosing?</>,
    introDescription: '“Best restaurant” is not one intent. A quick Thai lunch, family dinner, seafood order and special-occasion view need different evidence and locations.',
    introCards: [
      { eyebrow: 'Everyday choice', title: 'Thai & southern food', copy: 'Prioritise a current menu, visible demand and a location you will realistically revisit.', icon: Utensils },
      { eyebrow: 'Higher-risk order', title: 'Seafood by weight or market price', copy: 'Confirm species, weight, preparation charge and total before the kitchen starts.', icon: ShoppingBag },
      { eyebrow: 'Needs-led', title: 'Family or dietary fit', copy: 'Check seating, spice, allergens, cross-contact and whether staff can explain the dish.', icon: Users },
      { eyebrow: 'Different product', title: 'Views and occasions', copy: 'A sunset table can be worth paying for, but compare reservation, weather and total—not just photos.', icon: Sparkles, tone: 'dark' },
    ],
    editorialRule: 'The page keeps the ranking URL and commercial restaurant intent, but no venue is declared permanently “best”. Current evidence decides the shortlist.',
    zonesEyebrow: 'Eat by geography', zonesTitle: <>Three Patong food zones.<br />Three different trade-offs.</>,
    zonesDescription: 'A restaurant name without location context is weak advice. Choose whether convenience, sea-facing atmosphere or a quieter edge matters, then verify the live venue.',
    zones: [
      { title: 'Central Patong & market belt', eyebrow: 'Maximum variety', copy: 'Useful for Thai food, food courts, street-food browsing and groups that want alternatives close together.', check: 'Compare recent reviews, hygiene cues, payment, seating and the real walking route after dark.', image: HERO, imageAlt: 'Open Patong restaurant and busy central street' },
      { title: 'Beach Road & seafront', eyebrow: 'View and convenience premium', copy: 'Good when sea-facing atmosphere or a sunset meal is part of the value proposition.', check: 'Reserve the exact table if the view matters and compare total, weather exposure and music noise.', image: '/images/redesign/patong-area-hero-v2.webp', imageAlt: 'Patong Beach and seafront dining zone' },
      { title: 'North, south & hillside edges', eyebrow: 'Destination dining', copy: 'Can suit quieter meals or views, while making transport and the return journey part of the booking.', check: 'Verify the map pin, access, dress expectations, cancellation and ride home before committing.', image: '/images/redesign/phuket-stay-patong.webp', imageAlt: 'Patong hillside and resort-edge setting' },
    ],
    choiceEyebrow: 'Match the meal', choiceTitle: <>Choose by occasion.<br />Then shortlist live venues.</>,
    choiceDescription: 'These are decision frames, not restaurant awards. They remain useful even when a venue closes, changes chef or updates its menu.',
    choices: [
      { title: 'Quick Thai lunch', copy: 'Look for a short current menu, clear dish descriptions and a turnover pattern that fits fresh preparation.', check: 'spice level, protein, portion and current price', icon: Utensils },
      { title: 'Seafood dinner', copy: 'Separate display appeal from value. Market pricing and preparation can make the final bill hard to predict.', check: 'weight, preparation, sides, taxes and service', icon: ShoppingBag },
      { title: 'Family or group meal', copy: 'Prioritise seating, noise, shared dishes, dietary clarity and an easy route back over a fashionable label.', check: 'reservation, highchair/access needs and bill splitting', icon: Users },
      { title: 'Vegetarian or allergy-led meal', copy: 'A “vegetarian” label does not automatically cover fish sauce, stock, egg or cross-contact.', check: 'ingredients and kitchen handling directly with staff', icon: Salad },
    ],
    rhythmEyebrow: 'Use the day', rhythmTitle: <>Patong eats differently<br />before and after dark.</>,
    rhythmDescription: 'A useful shortlist accounts for heat, sunset reservations, market crowds and the way nightlife changes central streets.',
    rhythmRows: [
      { period: 'Breakfast', feel: 'Hotel and cafe convenience often matters more than crossing Patong for a famous pin.', plan: 'Check opening and dietary needs near your real morning route.', cue: 'Keep it local', highlight: true },
      { period: 'Lunch', feel: 'Good for Thai dishes, food courts and a shaded break away from the beach.', plan: 'Use current menus and visible demand; avoid turning popularity into a quality guarantee.', cue: 'Food first' },
      { period: 'Sunset dinner', feel: 'Views, reservations and weather exposure become part of the product.', plan: 'Confirm table position, cancellation, total and a weather fallback.', cue: 'Book the detail' },
      { period: 'Late evening', feel: 'Central choice remains broad, while noise, alcohol and transport can change the experience.', plan: 'Choose a clear meeting point and verify kitchen closing separately from venue closing.', cue: 'Plan the return', highlight: true },
    ],
    featureEyebrow: 'How to vet a restaurant', featureTitle: <>Recent evidence.<br />Clear menu. Honest total.</>,
    featureDescription: 'A restaurant guide cannot freeze live businesses. Use these checks to turn an editorial shortlist into a current decision.',
    featureCards: [
      { title: 'Read recent patterns', copy: 'Look across several recent reviews for repeated comments on food, service, hygiene and noise—not one score.', icon: CheckCircle2 },
      { title: 'Verify the exact menu', copy: 'Check current dishes, ingredients, portion format and dietary handling directly with the venue.', icon: Utensils },
      { title: 'Confirm the total', copy: 'Ask about market pricing, weight, service, taxes, minimum spend and payment before ordering.', icon: ShieldCheck },
    ],
    practicalEyebrow: 'Food safety & comfort', practicalTitle: <>Make appetite<br />the only surprise.</>,
    practicalDescription: 'Most good decisions are ordinary: clean handling, clear ingredients, a manageable bill and a safe journey back.',
    practicalCards: [
      { title: 'Street-food judgement', copy: 'Prefer food cooked thoroughly and served hot; be cautious with items left warm, raw or exposed.', icon: ShieldCheck },
      { title: 'Allergens & dietary needs', copy: 'Translate critical allergies, ask about fish sauce/stock and accept that cross-contact may be hard to control.', icon: Salad },
      { title: 'Transport after dinner', copy: 'Save the exact venue pin and use licensed transport when the route, weather or alcohol makes walking unsuitable.', icon: Bus },
    ],
    bookingTitle: <>Book only what<br />benefits from booking.</>,
    bookingDescription: 'Reserve a live food experience or stay zone when its current inclusions are clear. Ordinary restaurant discovery can remain editorial and self-directed.',
    bookingCards: [
      { title: 'Patong food experiences', copy: 'Check operator, tastings, dietary handling, meeting point, duration and cancellation.', href: foodExperiences, label: 'Check current food options', icon: TicketCheck, affiliate: true },
      { title: 'Stay near your food zone', copy: 'Compare exact pin, breakfast, recent noise feedback, cancellation and total for your dates.', href: stays, label: 'Check current hotel prices', icon: Hotel, affiliate: true },
      { title: 'Patong nightlife guide', copy: 'Keep late-evening venues, Bangla Road context and responsible return planning on the sibling owner.', href: '/phuket/patong/nightlife/', label: 'Plan Patong after dark', icon: Sparkles },
    ],
    faqs: [
      { question: 'What are the best restaurants in Patong?', answer: 'There is no permanent winner. Choose by meal type and zone, then compare current menu, several recent reviews, dietary fit, reservation terms and total.' },
      { question: 'Where do locals eat in Patong?', answer: '“Where locals eat” is often used as marketing shorthand. Look beyond the seafront and tourist lists, but judge every current venue on menu, demand, hygiene and convenience rather than who appears to dine there.' },
      { question: 'Where should I eat Thai food in Patong?', answer: 'Start with the central and market belt for breadth, then shortlist current venues with clear Thai or southern dishes. Verify spice, protein, fish sauce/stock and price before ordering.' },
      { question: 'Are Patong beach restaurants expensive?', answer: 'Sea-facing position and sunset demand can add a premium, but totals vary. Compare the live menu, table position, service/tax and transport rather than using an old average.' },
      { question: 'Is street food safe in Patong?', answer: 'No stall is risk-free. Prefer food cooked thoroughly and served hot, visible turnover and clean handling; use official travel-health advice for food and water precautions.' },
      { question: 'Where can families eat in Patong?', answer: 'Choose by seating, noise, shared-dish flexibility, allergy communication and an easy route home. A fashionable nightlife-zone venue may be less useful than a quieter current option.' },
      { question: 'Can vegetarians eat well in Patong?', answer: 'Yes, but confirm fish sauce, shrimp paste, stock, egg and cross-contact instead of relying on a vegetarian label alone.' },
      { question: 'How much does a meal cost in Patong?', answer: 'There is no durable single figure across street food, Thai restaurants, seafood by weight and resort dining. Open the current menu and confirm all charges before ordering.' },
    ],
    faqDescription: 'Questions come from eight live English restaurant SERPs captured on 27 July 2026. No price, rating or restaurant ranking was invented or frozen.',
    related: [
      { title: 'Patong area guide', description: 'Choose the right Patong micro-location before planning meals.', href: '/phuket/patong/', image: '/images/redesign/patong-area-hero-v2.webp', imageAlt: 'Patong Beach and urban district' },
      { title: 'Patong nightlife', description: 'Plan Bangla Road context, quieter evening choices and a responsible return.', href: '/phuket/patong/nightlife/', image: '/images/redesign/patong-nightlife-hero-v2.webp', imageAlt: 'Patong nightlife street at blue hour' },
      { title: 'Patong hotels', description: 'Compare exact zones, recent noise feedback and current hotel terms.', href: '/phuket/patong/hotels/', image: '/images/redesign/phuket-hotels-hero.webp', imageAlt: 'Phuket hotel zones' },
    ],
    sources: [
      { title: 'Phuket destination', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Destinations/Provinces/phuket/350', note: 'Official destination context.' },
      { title: 'Food and water precautions', creator: 'US Centers for Disease Control and Prevention', url: 'https://wwwnc.cdc.gov/travel/page/food-water-safety', note: 'Official travel-health food guidance.' },
      { title: 'Routes and live tracking', creator: 'Phuket Smart Bus', url: 'https://phuketsmartbus.com/', note: 'Current operator transport information.' },
      { title: 'Thailand safety and security', creator: 'UK FCDO', url: 'https://www.gov.uk/foreign-travel-advice/thailand/safety-and-security', note: 'Current personal, drink and transport-safety context.' },
    ],
    methodTitle: 'A current-decision guide, not an eternal best list.',
    methodDescription: 'Updated 27 July 2026 after owner ranking/backlink checks, 93 keyword records, 50 competitor domains, eight live English SERPs with 44 PAA questions and two competitor parses (25,180 and 9,124 markdown characters). The existing position-50 ranking for “best restaurants patong thailand” remains on the same URL. Legacy restaurant ratings, fixed prices, named venue superlatives, menu guarantees, opening hours and transport fares were removed.',
  };
  return <PatongExperienceTemplate data={data} />;
}
