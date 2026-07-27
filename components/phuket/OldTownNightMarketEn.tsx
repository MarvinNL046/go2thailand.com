import { Bus, Camera, Clock3, CloudRain, Map, MapPin, ShieldCheck, ShoppingBag, Sparkles, TicketCheck, Utensils, Users } from 'lucide-react';
import { KLOOK_GENERIC, withSubId } from '../../lib/affiliates';
import { OldTownSpokeTemplate, type OldTownSpokeData } from './OldTownSpokeTemplate';

const HERO = '/images/redesign/phuket-old-town-market-hero-v2.webp';

export default function OldTownNightMarketEn({ activityHref }: { activityHref?: string }) {
  const activities = withSubId(activityHref || KLOOK_GENERIC, 'phuket-old-town-market-en-activities');
  const data: OldTownSpokeData = {
    pageUrl: 'https://go2-thailand.com/phuket/old-town/night-market/', updatedAt: '2026-07-27',
    title: 'Phuket Old Town Night Market: Sunday Walking Street',
    description: 'Plan Phuket Old Town Sunday Walking Street: where it is, when to verify the current schedule, crowd rhythm, food choices, rain plan and transport.',
    breadcrumbLabel: 'Sunday Walking Street', heroImage: HERO,
    heroAlt: 'Food stalls, local families and illuminated shophouses at Phuket Old Town Sunday Walking Street',
    heroEyebrow: 'The market that changes Thalang Road',
    heroTitle: <>Sunday Walking Street.<br /><span className="text-saffron-light">Arrive with a plan, then browse.</span></>,
    heroSubtitle: 'One evening format. Several very different rhythms.',
    heroDescription: 'The market belongs on its own page because it changes street access, crowds, food choices and the route home. Confirm the current Sunday schedule first; then use this guide to choose your arrival window and avoid treating every stall as a fixed listing.',
    primaryAction: { label: 'Plan the evening', href: '#route' }, affiliateAction: { label: 'Check current food tours', href: activities },
    navItems: [
      { href: '#overview', label: 'Quick decision', icon: Sparkles }, { href: '#route', label: 'Market plan', icon: Map },
      { href: '#focus', label: 'What to try', icon: Utensils }, { href: '#timing', label: 'Crowd rhythm', icon: Clock3 },
      { href: '#practical', label: 'Practical', icon: ShieldCheck }, { href: '#book', label: 'Live options', icon: TicketCheck },
    ],
    introEyebrow: 'First verify', introTitle: <>Sunday is the intent.<br />The live schedule decides.</>,
    introDescription: 'Searchers often want an exact opening hour. Treat commonly published times as a planning clue, then confirm current organiser or local information before travelling across Phuket.',
    overviewCards: [
      { eyebrow: 'Identity', title: 'Old Town Sunday market', copy: 'This is the Walking Street format on the heritage streets—not a generic name for every Phuket weekend market.', icon: MapPin },
      { eyebrow: 'Best for', title: 'Food, crafts and street atmosphere', copy: 'Choose it when browsing is the evening; do not squeeze it into a timed museum route.', icon: ShoppingBag },
      { eyebrow: 'Trade-off', title: 'Crowds change the street', copy: 'Later and busier periods can feel more atmospheric but less comfortable for photos, strollers and quick movement.', icon: Users },
      { eyebrow: 'Must plan', title: 'The return journey', copy: 'Road access and pickup points can shift during closures. Decide how you leave before the crowd peaks.', icon: Bus, tone: 'dark' },
    ],
    editorialRule: 'This page owns Sunday Walking Street timing, food browsing and logistics. The general owner and walking-route spoke keep their own distinct informational jobs.',
    routeEyebrow: 'Five-part market plan', routeTitle: <>Do the practical work<br />before the first stall.</>,
    routeDescription: 'A market is live inventory. Vendors, prices, weather, access and exact operating details can change, so the sequence emphasises verification and decision points rather than a permanent stall map.',
    routeSteps: [
      { marker: '01', title: 'Confirm it is operating', copy: 'Check current local or organiser information for the Sunday you plan to visit, especially around severe weather or events.', note: 'Do this before crossing the island.' },
      { marker: '02', title: 'Set arrival and exit points', copy: 'Choose a drop-off outside likely closures and save a return pickup point that remains reachable.', note: 'Do not assume the same curb works later.' },
      { marker: '03', title: 'Walk once before buying', copy: 'Scan the market, crowd flow and food preparation before committing at the first stall.', note: 'Keep the centre lane and shop entrances clear.' },
      { marker: '04', title: 'Choose food deliberately', copy: 'Ask about ingredients, allergens, current price and portion before ordering; use visible turnover as one practical cue.', note: 'Carry small payment options but protect valuables.' },
      { marker: '05', title: 'Leave before fatigue decides', copy: 'Use your planned pickup or onward route while the group still has energy and connectivity.', note: 'Recheck the live ride or bus option.' },
    ],
    focusEyebrow: 'Food without fake certainty', focusTitle: <>Try Phuket flavours.<br />Skip the static price list.</>,
    focusDescription: 'The useful advice is what to recognise and what to ask—not a promise that one vendor, portion or price will still exist on your date.',
    focusCards: [
      { title: 'A-pong', copy: 'A thin Phuket-style coconut pancake. Check ingredients and current preparation if allergies matter.', icon: Sparkles },
      { title: 'Hokkien noodles', copy: 'A useful gateway to Phuket’s Hokkien food history; recipes, proteins and portions vary by cook.', icon: Utensils },
      { title: 'Oh tao and local snacks', copy: 'Browse regional savoury dishes and sweets, asking about shellfish, pork, egg and current price before ordering.', icon: ShoppingBag },
    ],
    timingEyebrow: 'Crowd rhythm', timingTitle: <>Earlier is clearer.<br />Later is more intense.</>,
    timingDescription: 'Exact stall setup and crowd levels vary. Choose the experience you want instead of presenting one “best” hour as universal.',
    timingRows: [
      { period: 'Before leaving', feel: 'The market may be affected by weather, events or operating changes.', plan: 'Confirm the current Sunday schedule and save a transport fallback.', cue: 'Verify first', highlight: true },
      { period: 'Early market', feel: 'Often easier for street context, family pacing and seeing food before queues build.', plan: 'Do an orientation loop and decide what deserves a return visit.', cue: 'See first' },
      { period: 'Busier evening', feel: 'More atmosphere and activity, with tighter movement and longer waits possible.', plan: 'Protect valuables, keep the group together and avoid blocking stalls.', cue: 'Crowd plan' },
      { period: 'Rainy evening', feel: 'Outdoor activity, comfort and stall mix may change quickly.', plan: 'Use rain protection and be willing to switch to an indoor Old Town evening.', cue: 'Flexible exit', highlight: true },
    ],
    highlightEyebrow: 'Three decisions', highlightTitle: <>Market, food stop<br />or guided context?</>,
    highlightDescription: 'All three can be good. They are not interchangeable, and paying for a tour only makes sense when its current inclusions add value.',
    highlights: [
      { title: 'Browse independently', copy: 'Best when you want freedom to compare stalls, pause for photos and leave on your own timing.', image: HERO, imageAlt: 'Phuket Old Town Sunday market at blue hour', label: 'Use the five-step plan' },
      { title: 'Pair with Old Town', copy: 'Use the walking-route guide earlier, then consciously switch from heritage loop to market mode.', image: '/images/redesign/phuket-old-town-walk-hero-v2.webp', imageAlt: 'Self-guided walk through Phuket Old Town', label: 'Keep the intents separate' },
      { title: 'Book guided food context', copy: 'Check language, tastings, dietary handling, group size, meeting point and cancellation.', image: '/images/blog/night-markets-food-lovers-bangkok-chiang-mai-phuket.webp', imageAlt: 'Thai night-market food stalls', label: 'Compare live inclusions' },
    ],
    practicalEyebrow: 'Street-market reality', practicalTitle: <>Plan for people,<br />rain and road closures.</>,
    practicalDescription: 'The market is not inherently difficult, but small logistical misses become annoying when a whole street is busy.',
    practicalCards: [
      { title: 'Crowds & belongings', copy: 'Keep valuables secure, agree a meeting point and avoid stopping suddenly in the main flow.', icon: Users },
      { title: 'Rain & heat', copy: 'Use the current forecast, carry compact protection and accept that outdoor activity can change.', icon: CloudRain },
      { title: 'Food & allergies', copy: 'Ask directly about ingredients and cross-contact; a busy stall cannot guarantee every dietary need.', icon: ShieldCheck },
    ],
    bookingTitle: <>Pay for context,<br />not a vague “market tour”.</>,
    bookingDescription: 'Before booking, compare the exact market, current operating day, guide language, tastings, dietary handling, meeting point and cancellation policy.',
    bookingCards: [
      { title: 'Current food tours', copy: 'Verify that Sunday Walking Street is actually included and check every tasting and meeting detail.', href: activities, label: 'Check current tour options', icon: TicketCheck, affiliate: true },
      { title: 'Old Town walking route', copy: 'Plan the heritage streets separately before switching into market mode.', href: '/phuket/old-town/things-to-do/', label: 'Open the walking route', icon: Camera },
      { title: 'Phuket Old Town owner', copy: 'Return to the main district guide for stay fit, street zones and island comparisons.', href: '/phuket/old-town/', label: 'Open the area guide', icon: Map },
    ],
    faqs: [
      { question: 'What day is the Phuket Old Town night market?', answer: 'It is known as Sunday Walking Street and is associated with Sunday operation. Confirm the current schedule through up-to-date local or organiser information before travelling.' },
      { question: 'What time does Phuket Sunday Walking Street open?', answer: 'Many listings describe a late-afternoon-to-evening market, but exact setup and closing times can change. Verify current information for your date rather than relying on a permanent hour here.' },
      { question: 'Where is Phuket Old Town Sunday Walking Street?', answer: 'It is centred on the Thalang Road heritage area in Phuket Old Town. Road access and pickup points can change during market operation, so map an arrival point outside closures.' },
      { question: 'Is Phuket Old Town worth visiting at night?', answer: 'Yes when food, illuminated shophouses and evening street life interest you. Sunday market night is busier and structurally different from an ordinary Old Town evening.' },
      { question: 'Is Phuket Old Town night market worth it?', answer: 'It is a strong fit for travellers who enjoy live food and craft browsing in a heritage street. It is a weaker fit for anyone who dislikes crowds or needs a rigid, fast itinerary.' },
      { question: 'What should I eat at Phuket Old Town night market?', answer: 'Look for Phuket-linked foods such as a-pong, Hokkien-style noodles and regional savoury snacks. Vendor mix changes; ask about ingredients, allergens, portion and current price.' },
      { question: 'Is Phuket Sunday Walking Street family-friendly?', answer: 'It can be, particularly earlier in the market rhythm, but crowd density, heat, noise and uneven movement may be tiring. Agree a meeting point and choose an easy exit plan.' },
      { question: 'Is this the same as Phuket Weekend Market?', answer: 'Do not assume so. Phuket uses several overlapping market names. This page covers the Old Town Sunday Walking Street format; verify the map and operating day before choosing transport.' },
    ],
    faqDescription: 'These questions are taken from live English SERP/PAA research on 27 July 2026. The existing ranking URL is preserved, while exact times, prices, stall counts and transport fares are not frozen into the copy.',
    related: [
      { title: 'Phuket Old Town guide', description: 'Understand the district before choosing one evening format.', href: '/phuket/old-town/', image: '/images/redesign/phuket-old-town-hero-v2.webp', imageAlt: 'Phuket Old Town heritage shophouses' },
      { title: 'Old Town walking route', description: 'Build the daytime street sequence separately from the market.', href: '/phuket/old-town/things-to-do/', image: '/images/redesign/phuket-old-town-walk-hero-v2.webp', imageAlt: 'Traveller walking through Phuket Old Town' },
      { title: 'Phuket attractions', description: 'Compare island-wide activities without expanding this market owner.', href: '/city/phuket/attractions/', image: '/images/redesign/phuket-attractions-hero.webp', imageAlt: 'Phuket attractions and viewpoints' },
    ],
    sources: [
      { title: 'Phuket destination', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Destinations/Provinces/phuket/350', note: 'Official destination context.' },
      { title: 'Phuket weather', creator: 'Thai Meteorological Department', url: 'https://www.tmd.go.th/weather/province/phuket', note: 'Current weather and forecast.' },
      { title: 'Phuket Smart Bus', creator: 'Phuket Smart Bus', url: 'https://phuketsmartbus.com/', note: 'Current operator route and timetable information.' },
      { title: 'Thailand safety and security', creator: 'UK FCDO', url: 'https://www.gov.uk/foreign-travel-advice/thailand/safety-and-security', note: 'Current personal, road and transport guidance.' },
    ],
    methodDescription: 'Built around the existing ranking owner after DFS found five relevant terms at positions 60–69. Research included the 23-record market cluster, 41 competitor domains, dedicated live SERPs/PAA and a full market-guide parse. The URL and navigational/transactional intent are preserved. Fixed stall counts, prices, fares, discount claims, exact crowd promises and unsafe scooter advice were removed.',
  };
  return <OldTownSpokeTemplate data={data} />;
}
