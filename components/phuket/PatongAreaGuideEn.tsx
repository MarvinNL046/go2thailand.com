import {
  AlertTriangle,
  BedDouble,
  Building2,
  Bus,
  CalendarDays,
  Camera,
  CheckCircle2,
  Clock3,
  Compass,
  Footprints,
  GlassWater,
  Hotel,
  MapPin,
  MoonStar,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Sun,
  Sunrise,
  Sunset,
  TicketCheck,
  Umbrella,
  Users,
  Waves,
} from 'lucide-react';
import { KLOOK_GENERIC, TRIP_GENERIC, withSubId } from '../../lib/affiliates';
import { PhuketAreaGuideTemplate, type PhuketAreaGuideData } from './PhuketAreaGuideTemplate';

const PAGE_URL = 'https://go2-thailand.com/phuket/patong/';
const HERO = '/images/redesign/patong-area-hero-v2.webp';
const UPDATED_AT = '2026-07-27';

export default function PatongAreaGuideEn({ hotelHref }: { hotelHref?: string }) {
  const data: PhuketAreaGuideData = {
    pageUrl: PAGE_URL,
    updatedAt: UPDATED_AT,
    title: 'Patong Beach Phuket: Is This the Right Area for You?',
    description: 'Decide whether Patong Beach suits your Phuket trip. Compare zones, beach rhythm, seasons, safety, hotels and current activities without stale prices.',
    area: 'Patong',
    heroImage: HERO,
    heroAlt: 'Patong Bay and its compact beachfront town glowing at blue hour on Phuket’s west coast',
    heroEyebrow: 'Phuket’s high-convenience west-coast base',
    heroTitle: <>Patong.<br /><span className="text-saffron-dark">Beach town at full volume.</span></>,
    heroSubtitle: 'Choose it for access and energy—not for solitude.',
    heroDescription: 'Patong combines a broad urban beach, Phuket’s densest visitor infrastructure and its best-known nightlife district. That mix can make a short, active stay effortless or the wrong base for a quiet island holiday.',
    heroPrimary: { label: 'See who Patong fits', href: '#fit' },
    heroAffiliate: { label: 'Check current hotels', href: withSubId(hotelHref || TRIP_GENERIC, 'patong-owner-en-hero-hotels') },
    navItems: [
      { href: '#fit', label: 'Who it fits', icon: Compass },
      { href: '#zones', label: 'Zones', icon: MapPin },
      { href: '#beach', label: 'Beach', icon: Waves },
      { href: '#season', label: 'When to go', icon: CalendarDays },
      { href: '#plan', label: 'Plan Patong', icon: TicketCheck },
      { href: '#safety', label: 'Safety', icon: ShieldCheck },
    ],
    verdictTitle: <>Convenience first.<br />Calm second.</>,
    verdictDescription: 'Patong is the clearest fit when you want a walkable concentration of hotels, food, shopping, tours and nightlife. It is a weaker fit when the beach atmosphere and quiet evenings are the main purpose of the trip.',
    fitCards: [
      { eyebrow: 'Strong fit', title: 'Short, active first stay', copy: 'Useful when you want many services close together, plan several excursions and prefer choice over seclusion.', icon: CheckCircle2 },
      { eyebrow: 'Strong fit', title: 'Nightlife-led trip', copy: 'Central Patong keeps Phuket’s best-known nightlife within walking distance, but the exact hotel street still matters for sleep.', icon: MoonStar },
      { eyebrow: 'Conditional fit', title: 'Families needing convenience', copy: 'It can work with the right property and micro-location. Compare the walking route, evening environment, pool and room setup—not the Patong label alone.', icon: Users },
      { eyebrow: 'Look elsewhere', title: 'Quiet beach retreat', copy: 'Kata, Karon, Kamala, Bang Tao or a more secluded coast usually fits better when low-key evenings and resort time are the priority.', icon: Umbrella, tone: 'dark' },
    ],
    editorialRule: 'Stay in Patong because its concentration solves a logistics problem. Do not choose it simply because it is Phuket’s most familiar name.',
    zones: [
      { title: 'North Patong', eyebrow: 'Beach access with a softer edge', copy: 'Often a useful compromise for travellers who want the Patong ecosystem but do not need to be beside its most concentrated evening streets.', check: 'Trace the real walking route to the beach and centre; a short map distance can still involve a busy road or steep side street.', image: '/images/redesign/phuket-stay-patong.webp', imageAlt: 'North Patong beachfront and resort context' },
      { title: 'Central Patong', eyebrow: 'Maximum access, maximum stimulus', copy: 'Best for walking to major shopping, food and nightlife. The trade-off can be traffic, late movement and a streetscape that stays busy after the beach day ends.', check: 'Read recent room-specific noise comments and map the hotel entrance—not only the property pin—to the places you will use.', image: '/images/cities/phuket/attractions/Patong Beach in september.webp', imageAlt: 'Busy central Patong Beach and the urban shoreline' },
      { title: 'South & hillside', eyebrow: 'More separation, more transport', copy: 'Some properties gain views or a calmer feel by sitting away from the centre. That can also create hills, road crossings or repeated ride-hailing costs.', check: 'Confirm gradient, shuttle frequency and where a vehicle can actually collect you. “Patong” does not guarantee a walkable centre.', image: '/images/redesign/patong-area-hero-v2.webp', imageAlt: 'Patong Bay viewed from the green hillside at blue hour' },
    ],
    dayParts: [
      { time: 'Early morning', title: 'The beach is the headline', copy: 'Use the cooler, quieter part of the day for a walk or swim when local flags and sea conditions allow.', icon: Sunrise },
      { time: 'Midday', title: 'Heat changes the route', copy: 'Build in shade, a pool, lunch or an indoor stop instead of treating the whole bay as an all-day beach plan.', icon: Sun },
      { time: 'Sunset', title: 'The promenade fills', copy: 'A good moment for the bay, dinner and people-watching. Allow extra time for traffic and meeting points.', icon: Sunset },
      { time: 'After dark', title: 'Central Patong becomes adult-oriented', copy: 'Nightlife is concentrated rather than unavoidable. Families and early sleepers should judge the precise street and walking route.', icon: MoonStar },
    ],
    beachTitle: 'An urban beach, not an empty-island fantasy.',
    beachDescription: 'Patong Beach delivers easy access, services and activity beside a dense town. It can be enjoyable, but calm water, space and noise vary by weather, season and location along the bay. Follow lifeguards, warning signs and red flags rather than a monthly slogan.',
    beachChecks: [
      { title: 'Read the flags', copy: 'The Tourism Authority of Thailand and FCDO both emphasise warning flags and strong currents. A red flag overrides the itinerary.', icon: AlertTriangle },
      { title: 'Choose your stretch', copy: 'Walk the bay before committing to a sunbed or activity. Boat movement, access and crowd density can differ along the beachfront.', icon: Footprints },
      { title: 'Verify the operator', copy: 'For any water activity, check the operator, insurance position, safety briefing, equipment and weather cancellation terms.', icon: ShieldCheck },
    ],
    seasonTitle: <>Plan the coast,<br />then check the week.</>,
    seasonDescription: 'Patong sits on Phuket’s Andaman-facing west coast. Broad seasonal bands help with trip design, but daily rain, wind, swell and red flags decide whether a specific beach or boat plan is sensible.',
    seasonRows: [
      { period: 'Dec–Feb', conditions: 'Often a stronger broad window for drier conditions and calmer west-coast plans.', planning: 'Demand can be high. Compare current hotel terms and avoid assuming every sea day will be identical.', cue: 'Popular window', highlight: true },
      { period: 'Mar–Apr', conditions: 'Heat and humidity build while many west-coast days may still support beach plans.', planning: 'Schedule exposed walking earlier, protect rest time and check heat as well as rainfall.', cue: 'Plan around heat' },
      { period: 'May–Oct', conditions: 'South-west monsoon patterns can bring showers, wind, swell and stronger rip-current risk.', planning: 'Keep indoor and land-based alternatives. Follow local forecasts, marine warnings and beach flags.', cue: 'Flexible coast plan', highlight: true },
      { period: 'Nov', conditions: 'A transition month that can contain both improving stretches and unsettled periods.', planning: 'Treat it as date-specific rather than declaring the whole month dry or wet.', cue: 'Check the week' },
    ],
    spokes: [
      { title: 'Where to stay', copy: 'Compare Patong hotels by micro-location, room type and actual live terms.', href: '/phuket/patong/hotels/', image: '/images/redesign/phuket-stay-patong.webp', imageAlt: 'Patong hotel and pool close to the coast', label: 'Open hotel guide' },
      { title: 'Food & markets', copy: 'Choose restaurants and market stops without freezing menus or prices into the area owner.', href: '/phuket/patong/restaurants/', image: '/images/redesign/phuket-food-kopitiam.webp', imageAlt: 'Phuket food and market dishes', label: 'Open food guide' },
      { title: 'Nightlife', copy: 'Understand Bangla Road and evening fit, then use current venue information and official safety advice.', href: '/phuket/patong/nightlife/', image: '/images/redesign/bangkok-zones-banner.webp', imageAlt: 'Warm evening lights in a busy Thai entertainment district', label: 'Open nightlife guide' },
      { title: 'Live activities', copy: 'Compare current Phuket experiences by operator, pickup, physical demand, inclusions and cancellation terms.', href: withSubId(KLOOK_GENERIC, 'patong-owner-en-activities-card'), image: '/images/redesign/phuket-attractions-hero.webp', imageAlt: 'Phuket viewpoints, coast and day-trip scenery', label: 'Check current options', affiliate: true },
    ],
    comparisonCards: [
      { area: 'Kata', fit: 'More beach-oriented and often a stronger first comparison for families and surfers.', href: '/phuket/kata/', image: '/images/redesign/phuket-stay-kata-karon.webp', imageAlt: 'Kata and Karon coastline in Phuket' },
      { area: 'Karon', fit: 'A longer, more spread-out base between Patong energy and Kata’s smaller centre.', href: '/phuket/karon/', image: '/images/cities/phuket/attractions/Karon Beach.webp', imageAlt: 'Wide Karon Beach on Phuket' },
      { area: 'Kamala', fit: 'A calmer west-coast rhythm for travellers who still want reasonable access to Patong.', href: '/phuket/kamala/', image: '/images/redesign/phuket-stay-kamala.webp', imageAlt: 'Kamala Beach and green west-coast hills' },
    ],
    safetyCards: [
      { title: 'Beach & water', copy: 'Follow lifeguards, signs and flags. Strong currents and rougher monsoon conditions can make a familiar beach unsafe for swimming.', icon: Waves },
      { title: 'Roads & scooters', copy: 'Walking, buses, licensed transfers or ride-hailing can be better defaults. Only ride with the correct licence, helmet and insurance cover.', icon: Bus },
      { title: 'Night out', copy: 'Keep drinks attended, pre-plan transport, protect valuables and avoid isolated routes alone late at night. Use current official travel advice.', icon: GlassWater },
    ],
    bookingCards: [
      { title: 'Patong hotels', copy: 'Compare the exact map pin, recent room-specific feedback, cancellation terms and total for your dates.', href: withSubId(hotelHref || TRIP_GENERIC, 'patong-owner-en-booking-hotels'), label: 'Check current hotels', icon: Hotel, affiliate: true },
      { title: 'Phuket activities', copy: 'Verify pickup zone, operator, inclusions, physical demands and weather policy before payment.', href: withSubId(KLOOK_GENERIC, 'patong-owner-en-booking-activities'), label: 'Check current activities', icon: Camera, affiliate: true },
      { title: 'Airport & island transport', copy: 'Compare current schedules and door-to-door options, then confirm the stop, baggage and connection buffer.', href: 'https://phuketsmartbus.com/', label: 'Open current bus information', icon: Bus },
    ],
    faqs: [
      { question: 'Is Patong a nice area in Phuket?', answer: 'Patong is a useful area when convenience, restaurant choice, shopping, excursions and nightlife matter more than quiet. It is less suitable when the holiday depends on a low-key beach atmosphere. The exact street matters: north, central and hillside locations can feel materially different.' },
      { question: 'What is Patong known for?', answer: 'Patong is known for its broad urban beach, dense hotel and visitor infrastructure, shopping and the Bangla Road nightlife district. Treat nightlife as one concentrated part of the area rather than the only reason to visit.' },
      { question: 'Is Patong a good place to stay in Phuket?', answer: 'Yes for a short, active or nightlife-led stay and for travellers who value a large choice of services. Compare another beach area if you want quiet evenings, a resort-led holiday or a beach that feels removed from the town.' },
      { question: 'Is it better to stay in Kata or Patong?', answer: 'Patong is stronger for nightlife, shopping, tour choice and maximum convenience. Kata is usually the stronger comparison when beach atmosphere, surfing context and a smaller evening centre matter more. Compare the exact hotel location and your planned cross-island journeys.' },
      { question: 'Is Patong Beach ok for families?', answer: 'It can be, especially at a well-chosen resort or a location away from the most adult-oriented evening streets. Families should map the walking route after dark, check room noise and pool facilities, and compare Kata, Karon or Kamala before deciding.' },
      { question: 'Is it safe to walk in Patong at night?', answer: 'No destination can be guaranteed safe. Busy central streets may feel straightforward, but official advice still recommends protecting belongings, avoiding isolated areas alone, keeping drinks attended and pre-arranging licensed transport. Use current advice for your nationality and judge the exact route.' },
      { question: 'What should I do in Patong?', answer: 'Use the beach when local conditions allow, explore the bay at different times of day, choose food or market stops, and add nightlife only if it fits your trip. Patong is also a practical pickup base for current Phuket experiences, but verify where each activity actually operates.' },
    ],
    faqDescription: 'These are genuine People Also Ask questions captured in the 27 July 2026 English Patong SERPs. Explicit sex-tourism queries were excluded because they do not match the editorial travel owner, and static taxi, bar and hotel prices were not repeated as current.',
    related: [
      { title: 'Phuket destination guide', description: 'Build the island route before choosing one west-coast base.', href: '/city/phuket/', image: '/images/redesign/phuket-destination-hero-v2.webp', imageAlt: 'Phuket coast and tropical bay' },
      { title: 'Where to stay in Phuket', description: 'Compare the island’s main hotel zones by traveller fit and route.', href: '/where-to-stay/phuket/', image: '/images/redesign/phuket-hotels-hero.webp', imageAlt: 'Phuket resort coast and hotel zones' },
      { title: 'Phuket attractions', description: 'Separate island-wide sights from activities that are actually inside Patong.', href: '/city/phuket/attractions/', image: '/images/redesign/phuket-attractions-hero.webp', imageAlt: 'Phuket attractions, coast and viewpoints' },
    ],
    sources: [
      { title: 'Phuket destination', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Destinations/Provinces/phuket/350', note: 'Official province context identifying Patong among Phuket’s major west-coast beaches and reminding visitors to follow red flags.' },
      { title: 'Phuket current and seven-day forecast', creator: 'Thai Meteorological Department', url: 'https://www.tmd.go.th/weather/province/phuket', note: 'Primary source for current Phuket weather, seven-day outlook and official updates.' },
      { title: 'Routes, timetable and live tracking', creator: 'Phuket Smart Bus', url: 'https://phuketsmartbus.com/', note: 'Operator source for current Phuket bus routes, stops, timetable, tracking and payment information.' },
      { title: 'Thailand safety and security', creator: 'UK Foreign, Commonwealth & Development Office', url: 'https://www.gov.uk/foreign-travel-advice/thailand/safety-and-security', note: 'Current official guidance on beach flags, currents, nightlife, drinks, belongings, road travel and hired motorcycles.' },
    ],
    methodDescription: 'Updated 27 July 2026 after DataForSEO owner ranking and backlink checks, 559 keyword records across two clusters, 100 competitor-domain records, ten live English SERPs with 55 captured People Also Ask questions, and three competitor content parses. Hotel, nightlife and restaurant detail stays with their existing spokes. Google Maps, generic hotel inventory, weather-tool, explicit sex-tourism and unrelated island intent were excluded. The legacy owner had no returned ranking keywords or backlinks and contained unsupported fixed prices, schedules, superlatives and safety claims.',
  };

  return <PhuketAreaGuideTemplate data={data} />;
}
