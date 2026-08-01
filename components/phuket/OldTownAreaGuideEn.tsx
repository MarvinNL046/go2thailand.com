import {
  BookOpen, Building2, Bus, CalendarDays, Camera, CheckCircle2, Clock3,
  Coffee, Compass, Footprints, Hotel, Map, MapPin, MoonStar, Palette,
  ShieldCheck, ShoppingBag, Sun, Sunrise, Sunset, TicketCheck, Utensils,
} from 'lucide-react';
import { KLOOK_GENERIC, TRIP_GENERIC, withSubId } from '../../lib/affiliates';
import { PhuketAreaGuideTemplate, type PhuketAreaGuideData } from './PhuketAreaGuideTemplate';

const HERO = '/images/redesign/phuket-old-town-hero-v2.webp';

export default function OldTownAreaGuideEn({ activityHref }: { activityHref?: string }) {
  const hotels = withSubId(TRIP_GENERIC, 'phuket-old-town-owner-en-hotels');
  const activities = withSubId(activityHref || KLOOK_GENERIC, 'phuket-old-town-owner-en-activities');

  const data: PhuketAreaGuideData = {
    pageUrl: 'https://go2-thailand.com/phuket/old-town/',
    updatedAt: '2026-07-27',
    area: 'Phuket Old Town',
    title: 'Phuket Old Town Guide: Streets, Food & Where to Stay',
    description: 'Plan Phuket Old Town by street and time of day. Compare its heritage core, food, Sunday market, walking route, transport and current places to stay.',
    heroImage: HERO,
    heroAlt: 'Pastel shophouses and everyday street life in Phuket Old Town after a tropical shower',
    heroEyebrow: 'Phuket beyond the beach',
    heroTitle: <>Phuket Old Town.<br /><span className="text-saffron-dark">Read the streets, not a checklist.</span></>,
    heroSubtitle: 'A compact heritage district with a living food culture.',
    heroDescription: 'Come for the shophouse streets; stay long enough to notice shrines, family businesses, local dishes and the changing rhythm after dark. This owner helps you decide when to go, where to walk and whether the district works as a base.',
    heroPrimary: { label: 'Plan your visit', href: '#fit' },
    heroAffiliate: { label: 'Check current walking tours', href: activities },
    navItems: [
      { href: '#fit', label: 'Is it for you?', icon: Compass },
      { href: '#zones', label: 'Street zones', icon: MapPin },
      { href: '#beach', label: 'Heritage', icon: Building2 },
      { href: '#season', label: 'When to go', icon: CalendarDays },
      { href: '#plan', label: 'Plan by task', icon: Map },
      { href: '#safety', label: 'Street sense', icon: ShieldCheck },
    ],
    verdictTitle: <>Worth a half-day.<br />Better when you slow down.</>,
    verdictDescription: 'Old Town is the strongest Phuket counterpoint to a beach itinerary: walkable at district scale, food-led and visually distinctive. It is not a beach base and its most famous streets can feel busier on market evenings.',
    fitCards: [
      { eyebrow: 'Strong fit', title: 'Architecture & street detail', copy: 'Choose it when shophouse facades, shrines, museums and slow street observation matter more than sand.', icon: Building2 },
      { eyebrow: 'Strong fit', title: 'Food-led exploring', copy: 'Use the district to understand Phuket flavours through current restaurants, markets and specialist food tours.', icon: Utensils },
      { eyebrow: 'Conditional fit', title: 'A practical city base', copy: 'A stay can suit urban access and evening food, but not travellers expecting a beach outside the hotel.', icon: Hotel },
      { eyebrow: 'Look elsewhere', title: 'Resort-at-the-door days', copy: 'Choose a west-coast area when pool, beach and resort facilities are the centre of every day.', icon: Sun, tone: 'dark' },
    ],
    editorialRule: 'Use this page to choose and understand the district. The activities spoke owns the detailed walking route; the night-market spoke owns live Sunday planning.',
    zones: [
      { title: 'Thalang & Soi Romanee', eyebrow: 'The recognisable core', copy: 'The most photographed stretch, with arcaded shophouses, small businesses and easy access to the Sunday market route.', check: 'Walk it outside peak photo traffic too; doorways and arcades remain working entrances, not sets.', image: HERO, imageAlt: 'Arcaded heritage shophouses in Phuket Old Town' },
      { title: 'Dibuk & Krabi roads', eyebrow: 'Museums and mansions', copy: 'A useful extension for heritage buildings, quieter blocks and a broader view beyond one pastel lane.', check: 'Verify museum hours and admission on the official venue page before building a timed itinerary.', image: '/images/cities/phuket/phuket-old-town.webp', imageAlt: 'Historic buildings and street scene in Old Phuket Town' },
      { title: 'Phang Nga & east edge', eyebrow: 'Food, murals and transitions', copy: 'Good for linking street art, local stops and the modern city around the protected-looking core.', check: 'Traffic returns quickly beyond pedestrian-friendly pockets; map crossings and pickup points.', image: '/images/blog/old-town-phuket-walking-guide-street-art-cafes-2026.webp', imageAlt: 'Street art and cafe details around Phuket Old Town' },
    ],
    dayParts: [
      { time: 'Early morning', title: 'Facades before the heat', copy: 'Start with the street fabric while shutters open and the district shifts into its normal working day.', icon: Sunrise },
      { time: 'Late morning', title: 'Museum or guided context', copy: 'Use one well-chosen cultural stop or a current walking tour instead of rushing every pin.', icon: BookOpen },
      { time: 'Afternoon', title: 'Food, shade and side streets', copy: 'Let lunch and covered arcades shape the route; heat and showers can make a rigid checklist unpleasant.', icon: Coffee },
      { time: 'Evening', title: 'Choose ordinary or market rhythm', copy: 'A regular evening and Sunday Walking Street are different experiences. Pick the one you actually want.', icon: MoonStar },
    ],
    beachTitle: 'A living district—not a pastel backdrop.',
    beachDescription: 'The architecture is part of an active city shaped by migration, commerce, faith and family life. Good travel behaviour means reading context, keeping entrances clear and treating worship and residential spaces differently from public murals.',
    beachChecks: [
      { title: 'Look beyond one label', copy: '“Sino-Portuguese” is useful shorthand, but Phuket heritage reflects several communities and trading histories.', icon: Building2 },
      { title: 'Photograph with care', copy: 'Ask before photographing people or private interiors, and never block shopfronts or shrine access.', icon: Camera },
      { title: 'Spend locally and verify', copy: 'Choose current local businesses without turning editorial recommendations into permanent “best” claims.', icon: ShoppingBag },
    ],
    seasonTitle: <>Plan for heat, rain<br />and the day of the week.</>,
    seasonDescription: 'Old Town can be visited year-round, but exposed walking, tropical showers and the Sunday market rhythm change how a route feels.',
    seasonRows: [
      { period: 'Mon–Sat', conditions: 'A regular working-city rhythm without Sunday Walking Street occupying Thalang Road.', planning: 'Best when architecture, museums, food and ordinary street life are the priority.', cue: 'Normal city day', highlight: true },
      { period: 'Sunday', conditions: 'Thalang Road may shift into the Walking Street market format later in the day.', planning: 'Verify the organiser’s current schedule and expect a different crowd and transport pattern.', cue: 'Market intent' },
      { period: 'Drier months', conditions: 'Often easier for a longer outdoor walk, while heat and strong sun still matter.', planning: 'Start earlier, carry water and keep shaded indoor alternatives.', cue: 'Walk earlier' },
      { period: 'Wetter months', conditions: 'Showers can interrupt walking and alter outdoor market activity.', planning: 'Use a flexible loop with cafes, museums and covered arcades; check the current forecast.', cue: 'Flexible route', highlight: true },
    ],
    spokes: [
      { title: 'Things to do & walking route', copy: 'Follow a deliberate sequence of streets, heritage stops and realistic pauses.', href: '/phuket/old-town/things-to-do/', image: '/images/blog/old-town-phuket-walking-guide-street-art-cafes-2026.webp', imageAlt: 'Phuket Old Town street art and walking route', label: 'Open the route' },
      { title: 'Sunday Walking Street', copy: 'Plan the live market separately: current schedule, crowd timing, food and transport.', href: '/phuket/old-town/night-market/', image: '/images/blog/night-markets-food-lovers-bangkok-chiang-mai-phuket.webp', imageAlt: 'Evening food stalls at a Thai night market', label: 'Open market guide' },
      { title: 'Current Old Town tours', copy: 'Compare current operator, duration, meeting point, inclusions and cancellation terms.', href: activities, image: HERO, imageAlt: 'Guided walking environment in Phuket Old Town', label: 'Check live options', affiliate: true },
      { title: 'Where to stay in Phuket', copy: 'Compare an urban Old Town base with Phuket’s beach zones before booking.', href: '/where-to-stay/phuket/', image: '/images/redesign/phuket-hotels-hero.webp', imageAlt: 'Phuket accommodation zones', label: 'Compare areas' },
    ],
    comparisonCards: [
      { area: 'Patong', fit: 'Choose for concentrated nightlife, a busy resort strip and beach access rather than heritage streets.', href: '/phuket/patong/', image: '/images/redesign/patong-area-hero-v2.webp', imageAlt: 'Patong Beach and urban resort district' },
      { area: 'Kata', fit: 'Choose for a compact west-coast beach stay with visitor infrastructure and seasonal surf context.', href: '/phuket/kata/', image: '/images/redesign/kata-area-hero-v2.webp', imageAlt: 'Kata Beach bay' },
      { area: 'Rawai', fit: 'Choose for a lived-in southern waterfront, boat plans and a slower residential routine.', href: '/phuket/rawai/', image: '/images/redesign/rawai-area-hero-v2.webp', imageAlt: 'Rawai waterfront in southern Phuket' },
    ],
    safetyCards: [
      { title: 'Traffic & pavements', copy: 'Pedestrian comfort varies by block. Use crossings carefully and pre-plan pickup points away from closures.', icon: Footprints },
      { title: 'Heat & rain', copy: 'Carry water and sun/rain protection; use current TMD forecasts rather than monthly guarantees.', icon: Sun },
      { title: 'Temples, shrines & people', copy: 'Dress and behave respectfully, ask before portraits and follow on-site photography rules.', icon: ShieldCheck },
    ],
    bookingCards: [
      { title: 'Old Town stays', copy: 'Check the exact pin, nighttime noise, room access, parking, cancellation and total for your dates.', href: hotels, label: 'Check current hotel prices', icon: Hotel, affiliate: true },
      { title: 'Walking & food tours', copy: 'Verify meeting point, route, guide language, food inclusions and cancellation before payment.', href: activities, label: 'Check current tour options', icon: TicketCheck, affiliate: true },
      { title: 'Island transport', copy: 'Use current operator information and map the last connection or pickup after your visit.', href: 'https://phuketsmartbus.com/', label: 'Open current bus information', icon: Bus },
    ],
    faqs: [
      { question: 'Is Phuket Old Town worth visiting?', answer: 'Yes when you want architecture, food and cultural context beyond Phuket’s beaches. A half-day is enough for a focused first visit; stay longer when museums, food or the Sunday market are central.' },
      { question: 'What day should I go to Phuket Old Town?', answer: 'Choose a regular weekday or Saturday for ordinary street life and easier architectural exploring. Choose Sunday when the Walking Street market is the purpose, after confirming its current schedule.' },
      { question: 'How long does it take to walk around Phuket Old Town?', answer: 'The core is compact, but a meaningful visit is not a race. Allow a half-day for streets, a cultural stop and food; use the activities spoke for a sequenced route.' },
      { question: 'Is Phuket Old Town walkable?', answer: 'The heritage core is walkable at district scale, although pavement quality, traffic and heat vary by street. Plan crossings, shade and a pickup point.' },
      { question: 'What is the most beautiful street in Phuket Old Town?', answer: 'Thalang Road and Soi Romanee are the best-known visual core, but Dibuk, Krabi and Phang Nga roads add mansions, museums and street context that prevent a one-lane visit.' },
      { question: 'Where should I stay in Phuket Old Town?', answer: 'Choose an exact map pin near the streets and evening places you will use. Compare recent noise, access and parking feedback, and remember Old Town is an urban—not beach—base.' },
      { question: 'Is Phuket Old Town worth visiting at night?', answer: 'It can be, especially for dinner or the Sunday market, but a normal evening and market evening feel different. Check current venue hours and plan transport back.' },
      { question: 'Is Phuket Old Town the same as Phuket Town?', answer: 'Phuket Old Town is the historic district within the wider modern Phuket Town/Phuket City area. Search and accommodation labels may use the names loosely, so verify the map.' },
    ],
    faqDescription: 'These questions come from ten live English SERPs captured on 27 July 2026. Exact fares, fixed venue hours and unsupported “best” claims were intentionally excluded.',
    related: [
      { title: 'Phuket destination guide', description: 'Build the island route around coast, city and realistic travel time.', href: '/city/phuket/', image: '/images/redesign/phuket-destination-hero-v2.webp', imageAlt: 'Phuket coast and city context' },
      { title: 'Phuket attractions', description: 'Compare island-wide sights without crowding the Old Town owner.', href: '/city/phuket/attractions/', image: '/images/redesign/phuket-attractions-hero.webp', imageAlt: 'Phuket attractions and viewpoints' },
      { title: 'Where to stay in Phuket', description: 'Decide whether an urban or beach-zone base fits the trip.', href: '/where-to-stay/phuket/', image: '/images/redesign/phuket-hotels-hero.webp', imageAlt: 'Phuket accommodation zones' },
    ],
    sources: [
      { title: 'Phuket destination', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Destinations/Provinces/phuket/350', note: 'Official destination context.' },
      { title: 'Phuket current and seven-day forecast', creator: 'Thai Meteorological Department', url: 'https://www.tmd.go.th/weather/province/phuket', note: 'Primary current weather source.' },
      { title: 'Routes, timetable and live tracking', creator: 'Phuket Smart Bus', url: 'https://phuketsmartbus.com/', note: 'Current operator transport information.' },
      { title: 'Thailand safety and security', creator: 'UK Foreign, Commonwealth & Development Office', url: 'https://www.gov.uk/foreign-travel-advice/thailand/safety-and-security', note: 'Current road, transport and personal-safety guidance.' },
    ],
    methodDescription: 'Updated 27 July 2026 after ranking and backlink checks for all three cluster owners, 256 keyword records, 141 competitor-domain records, ten live English SERPs with 56 PAA questions and three full competitor parses. The night-market spoke already ranks for five relevant terms. Legacy fixed fares, venue and market guarantees, static prices, unsafe scooter advice, cultural simplifications and permanent “best” claims were removed.',
    sectionCopy: {
      zonesEyebrow: 'Three street lenses',
      zonesTitle: <>Walk beyond<br />one pastel lane.</>,
      zonesDescription: 'The heritage core is compact, but each street group carries a different mix of commerce, architecture, traffic and cultural stops. Use the route spoke for the turn-by-turn sequence.',
      rhythmEyebrow: 'One district, four moments',
      rhythmTitle: <>Old Town changes<br />as shutters open.</>,
      rhythmDescription: 'Early streets, midday museums, shaded food stops and a market evening are different products. Plan the time of day before collecting pins.',
      featureEyebrow: 'Heritage reality',
      seasonEyebrow: 'Timing the streets',
      seasonNote: 'These are planning patterns, not opening-hour guarantees. Check current venue, market, weather and transport information for the day you visit.',
      comparisonEyebrow: 'Choose the trip, then the base',
      comparisonTitle: <>Old Town is city life.<br />Compare the coast.</>,
      comparisonDescription: 'A beautiful heritage visit does not automatically make the district the right overnight base. Compare what you need before breakfast, after dinner and on beach days.',
      safetyEyebrow: 'Street sense & respect',
      safetyTitle: <>Slow down where<br />the city gets awkward.</>,
      safetyDescription: 'The controllable risks are ordinary ones: traffic, heat, rain, private space and transport after your last stop.',
      bookingEyebrow: 'Check the live details',
      bookingTitle: <>Book the route,<br />not the postcard.</>,
      bookingDescription: 'For tours, stays and transport, verify the current map pin, inclusions, access, cancellation and total. Editorial context stays separate from live provider inventory.',
      methodTitle: 'A living-city guide, not a pastel checklist.',
    },
  };

  return <PhuketAreaGuideTemplate data={data} />;
}
