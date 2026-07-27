import { Anchor, Bus, CalendarDays, CheckCircle2, Compass, Footprints, Hotel, MapPin, MoonStar, ShieldCheck, ShoppingBag, Sun, Sunrise, Sunset, TicketCheck, Umbrella, Users, Waves } from 'lucide-react';
import { KLOOK_GENERIC, TRIP_GENERIC, withSubId } from '../../lib/affiliates';
import { PhuketAreaGuideTemplate, type PhuketAreaGuideData } from './PhuketAreaGuideTemplate';

const HERO = '/images/redesign/rawai-area-hero-v2.webp';

export default function RawaiAreaGuideEn({ hotelHref, activityHref }: { hotelHref?: string; activityHref?: string }) {
  const hotels = withSubId(hotelHref || TRIP_GENERIC, 'rawai-owner-en-hotels');
  const activities = withSubId(activityHref || KLOOK_GENERIC, 'rawai-owner-en-activities');
  const data: PhuketAreaGuideData = {
    pageUrl: 'https://go2-thailand.com/phuket/rawai/', updatedAt: '2026-07-27', area: 'Rawai',
    title: 'Rawai Phuket: Is Rawai the Right Area for You?',
    description: 'Decide whether Rawai fits your Phuket trip. Compare waterfront, residential and Nai Harn-facing zones, boat logistics, food, family fit and current stays.',
    heroImage: HERO, heroAlt: 'Rawai waterfront with longtail boats, a modest pier and local restaurants at golden hour',
    heroEyebrow: 'Phuket’s lived-in southern waterfront',
    heroTitle: <>Rawai.<br /><span className="text-saffron-dark">Waterfront life, not a swim-beach stay.</span></>,
    heroSubtitle: 'Choose it for food, boats and a southern routine.',
    heroDescription: 'Rawai is a working waterfront, residential area and departure point rather than Phuket’s classic sand-and-swim proposition. It suits slower southern stays when you understand that Nai Harn—not Rawai waterfront—is the nearby swimming-beach comparison.',
    heroPrimary: { label: 'See if Rawai fits', href: '#fit' }, heroAffiliate: { label: 'Check current hotels', href: hotels },
    navItems: [
      { href: '#fit', label: 'Who it fits', icon: Compass }, { href: '#zones', label: 'Zones', icon: MapPin },
      { href: '#beach', label: 'Waterfront', icon: Anchor }, { href: '#season', label: 'When to go', icon: CalendarDays },
      { href: '#plan', label: 'Plan Rawai', icon: TicketCheck }, { href: '#safety', label: 'Safety', icon: ShieldCheck },
    ],
    verdictTitle: <>A southern base.<br />Not a resort-beach substitute.</>,
    verdictDescription: 'Rawai is a strong fit for longer stays, seafood-led evenings, boat-day planning and travellers comfortable using transport. It is a weak fit when stepping from the hotel onto a convenient swimming beach is the holiday’s central promise.',
    fitCards: [
      { eyebrow: 'Strong fit', title: 'Longer and slower stays', copy: 'Useful when groceries, cafés, restaurants and a lived-in daily rhythm matter more than a resort strip.', icon: CheckCircle2 },
      { eyebrow: 'Strong fit', title: 'Food and boat-led trips', copy: 'The waterfront can anchor seafood and current island departures after checking operator and weather terms.', icon: Anchor },
      { eyebrow: 'Conditional fit', title: 'Families with transport', copy: 'It can work with a pool, suitable room and planned journeys to swimming beaches; it is not automatically beach-at-the-door.', icon: Users },
      { eyebrow: 'Look elsewhere', title: 'Classic beach or nightlife holiday', copy: 'Choose Nai Harn for a nearby swimming-beach base or Patong for concentrated nightlife.', icon: MoonStar, tone: 'dark' },
    ],
    editorialRule: 'Book Rawai because you want the southern waterfront lifestyle. If “beach” means daily sand-and-swim access, compare Nai Harn before committing.',
    zones: [
      { title: 'Rawai waterfront & pier', eyebrow: 'Boats, seafood and movement', copy: 'Best when the working shore and evening food scene are features, not compromises.', check: 'Verify boat departure, tide, weather, return point and operator; the waterfront is not a standard swimming beach.', image: HERO, imageAlt: 'Rawai waterfront, longtail boats and pier' },
      { title: 'Inland residential Rawai', eyebrow: 'Daily-life convenience', copy: 'Can suit longer stays and villas with more space, while making a vehicle or ride plan part of the routine.', check: 'Map groceries, evening walking, drainage and pickup access around the exact property.', image: '/images/redesign/phuket-stay-bang-tao.webp', imageAlt: 'Tropical low-rise Phuket residential setting' },
      { title: 'Nai Harn-facing edge', eyebrow: 'Rawai address, beach-oriented plan', copy: 'Some listings bridge both areas and can make the nearby swimming beach more practical than the Rawai shore.', check: 'Judge the real route and slope; an accommodation label may blur Rawai and Nai Harn.', image: '/images/redesign/nai-harn-area-hero-v2.webp', imageAlt: 'Nai Harn swimming beach near Rawai' },
    ],
    dayParts: [
      { time: 'Early morning', title: 'See the working shore', copy: 'Walk the waterfront while boats, tide and local routines reveal how the area actually functions.', icon: Sunrise },
      { time: 'Midday', title: 'Choose pool, café or beach transfer', copy: 'Do not force Rawai shore into a swimming plan; move deliberately to a suitable beach when conditions allow.', icon: Sun },
      { time: 'Late afternoon', title: 'Return for food and boats', copy: 'Use the waterfront atmosphere, then confirm prices and preparation terms before ordering seafood.', icon: Sunset },
      { time: 'Evening', title: 'Local rhythm over club circuit', copy: 'Rawai offers restaurants and bars without Patong’s concentration; pre-plan late transport.', icon: MoonStar },
    ],
    beachTitle: 'A working waterfront, not a default swimming beach.',
    beachDescription: 'Rawai’s shallow, boat-used shoreline serves a different role from Nai Harn or Kata. Tides, moorings, vessel movement and seabed conditions make casual swimming a poor default. Use a recognised swimming beach and follow its local flags and lifeguards.',
    beachChecks: [
      { title: 'Separate shore from swim beach', copy: 'Do not assume “Rawai Beach” in a listing means a conventional swimming beach.', icon: Waves },
      { title: 'Check the tide and departure', copy: 'Boat access and meeting points can change with tide, weather and operator instructions.', icon: Anchor },
      { title: 'Verify the operator', copy: 'Confirm vessel, lifejackets, insurance position, inclusions, return plan and cancellation terms.', icon: ShieldCheck },
    ],
    seasonTitle: <>Plan boats and roads.<br />Check the actual day.</>,
    seasonDescription: 'Rawai can function year-round as a residential and food base, but rain, wind and marine conditions still control boat departures and swimming elsewhere.',
    seasonRows: [
      { period: 'Dec–Feb', conditions: 'Often a stronger broad window for drier weather and marine planning.', planning: 'Demand can rise. Compare current terms and verify every departure close to the date.', cue: 'Popular window', highlight: true },
      { period: 'Mar–Apr', conditions: 'Heat and humidity can make exposed waterfront and road journeys tiring.', planning: 'Start earlier, protect shade and keep midday routes short.', cue: 'Plan for heat' },
      { period: 'May–Oct', conditions: 'Monsoon patterns can bring rain, wind and changing marine conditions.', planning: 'Keep land alternatives and accept weather cancellations or route changes.', cue: 'Flexible boat plan', highlight: true },
      { period: 'Nov', conditions: 'A transition can include improving periods and unsettled marine days.', planning: 'Use current TMD and operator updates rather than a fixed monthly promise.', cue: 'Check the week' },
    ],
    spokes: [
      { title: 'Nai Harn next door', copy: 'Compare Rawai’s working waterfront with a quieter swimming-beach base.', href: '/phuket/nai-harn/', image: '/images/redesign/nai-harn-area-hero-v2.webp', imageAlt: 'Sheltered Nai Harn Beach', label: 'Open Nai Harn guide' },
      { title: 'Where to stay in Phuket', copy: 'Compare Rawai with every major accommodation zone before choosing the far south.', href: '/where-to-stay/phuket/', image: '/images/redesign/phuket-hotels-hero.webp', imageAlt: 'Phuket hotel and resort zones', label: 'Compare all areas' },
      { title: 'Current activities', copy: 'Compare real departure, operator, vessel, inclusions and weather terms.', href: activities, image: '/images/redesign/phuket-attractions-hero.webp', imageAlt: 'Phuket coastal activities and viewpoints', label: 'Check current options', affiliate: true },
      { title: 'Phuket attractions', copy: 'Plan island-wide sights without folding them into the Rawai owner.', href: '/city/phuket/attractions/', image: '/images/redesign/phuket-destination-hero-v2.webp', imageAlt: 'Phuket coast and attractions', label: 'Explore attractions' },
    ],
    comparisonCards: [
      { area: 'Nai Harn', fit: 'The nearby choice when a quieter swimming-beach routine is the priority.', href: '/phuket/nai-harn/', image: '/images/redesign/nai-harn-area-hero-v2.webp', imageAlt: 'Nai Harn Beach' },
      { area: 'Kata', fit: 'More compact visitor infrastructure, sand-and-swim focus and seasonal surf context.', href: '/phuket/kata/', image: '/images/redesign/kata-area-hero-v2.webp', imageAlt: 'Kata Beach bay' },
      { area: 'Karon', fit: 'A longer west-coast resort beach with broader conventional beach-holiday fit.', href: '/phuket/karon/', image: '/images/redesign/karon-area-hero-v2.webp', imageAlt: 'Wide Karon Beach' },
    ],
    safetyCards: [
      { title: 'Boats & water', copy: 'Use verified operators, wear provided safety equipment and follow marine/weather instructions.', icon: Anchor },
      { title: 'Roads & scooters', copy: 'Only ride with correct licence, helmet and insurance; pre-plan transport after dinner or sunset.', icon: Bus },
      { title: 'Markets & culture', copy: 'Ask before photographing people, avoid exoticising community life and confirm prices before purchase.', icon: ShieldCheck },
    ],
    bookingCards: [
      { title: 'Rawai hotels', copy: 'Compare exact pin, pool, walking route, recent feedback, cancellation and total for your dates.', href: hotels, label: 'Check current hotel prices', icon: Hotel, affiliate: true },
      { title: 'South Phuket activities', copy: 'Verify departure point, operator, vessel, inclusions and weather policy.', href: activities, label: 'Check current activities', icon: TicketCheck, affiliate: true },
      { title: 'Island transport', copy: 'Compare current licensed transfer and public-transport options for the actual route.', href: 'https://phuketsmartbus.com/', label: 'Open current bus information', icon: Bus },
    ],
    faqs: [
      { question: 'What is Rawai like in Phuket?', answer: 'Rawai is a lived-in southern district with a working waterfront, restaurants, residences and boat activity. It feels different from Phuket’s conventional west-coast resort beaches.' },
      { question: 'Is Rawai worth visiting?', answer: 'Rawai is worth considering for waterfront food, local routines and verified boat plans. It is not the strongest choice when the trip depends on a classic swimming beach at the door.' },
      { question: 'Is Rawai a good place to stay?', answer: 'Yes for longer, slower or food-and-boat-led southern stays with a transport plan. Compare Nai Harn when easy swimming-beach access matters more.' },
      { question: 'Is Rawai Beach safe for swimming?', answer: 'Rawai waterfront is not a sensible default swimming beach because it is shallow and actively used by boats. Use a recognised swimming beach and follow its flags and lifeguards.' },
      { question: 'What is the difference between Rawai and Nai Harn?', answer: 'Rawai is a working waterfront and residential/boat base. Nai Harn is centred on a sheltered-looking swimming beach and green bay. Accommodation labels can blur their boundary.' },
      { question: 'Is Rawai good for families?', answer: 'It can be with a suitable pool, room and transport plan, particularly for longer stays. Families expecting direct sand-and-swim access should compare Nai Harn, Kata or Karon.' },
      { question: 'Does Rawai have nightlife?', answer: 'Rawai has restaurants and bars but not Patong’s concentrated late-night district. Check current venues and plan transport home.' },
      { question: 'Is Rawai Seafood Market worth visiting?', answer: 'It can be an enjoyable food stop when you confirm current seafood price, preparation charge and total before ordering. Supply and prices change, so static menu claims are unreliable.' },
    ],
    faqDescription: 'These are genuine questions captured from ten live English Rawai SERPs on 27 July 2026. Static seafood prices, taxi fares and cultural population claims were excluded.',
    related: [
      { title: 'Phuket destination guide', description: 'Build the island route before choosing the far south.', href: '/city/phuket/', image: '/images/redesign/phuket-destination-hero-v2.webp', imageAlt: 'Phuket coast' },
      { title: 'Where to stay in Phuket', description: 'Compare Rawai with the island’s main hotel zones.', href: '/where-to-stay/phuket/', image: '/images/redesign/phuket-hotels-hero.webp', imageAlt: 'Phuket accommodation zones' },
      { title: 'Phuket attractions', description: 'Plan island-wide sights separately from the area owner.', href: '/city/phuket/attractions/', image: '/images/redesign/phuket-attractions-hero.webp', imageAlt: 'Phuket attractions' },
    ],
    sources: [
      { title: 'Phuket destination', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Destinations/Provinces/phuket/350', note: 'Official destination and beach-flag context.' },
      { title: 'Phuket current and seven-day forecast', creator: 'Thai Meteorological Department', url: 'https://www.tmd.go.th/weather/province/phuket', note: 'Primary current weather source.' },
      { title: 'Routes, timetable and live tracking', creator: 'Phuket Smart Bus', url: 'https://phuketsmartbus.com/', note: 'Current operator transport information.' },
      { title: 'Thailand safety and security', creator: 'UK Foreign, Commonwealth & Development Office', url: 'https://www.gov.uk/foreign-travel-advice/thailand/safety-and-security', note: 'Current marine, beach and road-safety guidance.' },
    ],
    methodDescription: 'Updated 27 July 2026 after owner ranking/backlink checks, 320 keyword records, 100 competitor-domain records, ten live English SERPs with 59 PAA questions and three competitor parses. Legacy fixed fares, travel times, prices, market fees, ethnic population/origin claims, expat superlatives, hotel prices and transport advice were removed.',
  };
  return <PhuketAreaGuideTemplate data={data} />;
}
