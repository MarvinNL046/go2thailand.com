import { AlertTriangle, Bus, CalendarDays, CheckCircle2, Compass, Footprints, Hotel, MapPin, MoonStar, ShieldCheck, Sun, Sunrise, Sunset, TicketCheck, Umbrella, Users, Waves } from 'lucide-react';
import { KLOOK_GENERIC, TRIP_GENERIC, withSubId } from '../../lib/affiliates';
import { PhuketAreaGuideTemplate, type PhuketAreaGuideData } from './PhuketAreaGuideTemplate';

const HERO = '/images/redesign/kamala-area-hero-v2.webp';

export default function KamalaAreaGuideEn({ hotelHref, activityHref }: { hotelHref?: string; activityHref?: string }) {
  const hotels = withSubId(hotelHref || TRIP_GENERIC, 'kamala-owner-en-hotels');
  const activities = withSubId(activityHref || KLOOK_GENERIC, 'kamala-owner-en-activities');
  const data: PhuketAreaGuideData = {
    pageUrl: 'https://go2-thailand.com/phuket/kamala/', updatedAt: '2026-07-27', area: 'Kamala',
    title: 'Kamala Beach Phuket: Is Kamala the Right Area for You?',
    description: 'Decide whether Kamala Beach fits your Phuket trip. Compare village and resort zones, family fit, Kamala vs Patong or Kata, seasons, safety and current stays.',
    heroImage: HERO, heroAlt: 'Kamala Beach at golden hour with a calm bay, green headland, local boats and relaxed travellers',
    heroEyebrow: 'Phuket’s calmer village-and-resort bay',
    heroTitle: <>Kamala Beach.<br /><span className="text-saffron-dark">A softer west-coast rhythm.</span></>,
    heroSubtitle: 'Close enough to explore. Calm enough to stay put.',
    heroDescription: 'Kamala sits between local village life, family-oriented resorts and a relaxed beach routine. It is quieter than Patong, but the bay’s north, centre and south edges create genuinely different stays.',
    heroPrimary: { label: 'See if Kamala fits', href: '#fit' }, heroAffiliate: { label: 'Check current hotels', href: hotels },
    navItems: [
      { href: '#fit', label: 'Who it fits', icon: Compass }, { href: '#zones', label: 'Zones', icon: MapPin },
      { href: '#beach', label: 'Beach', icon: Waves }, { href: '#season', label: 'When to go', icon: CalendarDays },
      { href: '#plan', label: 'Plan Kamala', icon: TicketCheck }, { href: '#safety', label: 'Safety', icon: ShieldCheck },
    ],
    verdictTitle: <>Lower-key Phuket.<br />Still choose the right edge.</>,
    verdictDescription: 'Kamala is a strong fit for families, couples and slower trips that want a usable beach and relaxed evenings. It is a weaker fit for dense nightlife or travellers who expect every resort to sit inside the village’s walking radius.',
    fitCards: [
      { eyebrow: 'Strong fit', title: 'Families wanting a calmer base', copy: 'A practical beach-and-pool routine can work well after checking room setup, crossings and daily sea conditions.', icon: Users },
      { eyebrow: 'Strong fit', title: 'Couples slowing the pace', copy: 'Sunset, resort time and easy dinners can carry the trip without a packed attraction list.', icon: Sunset },
      { eyebrow: 'Conditional fit', title: 'Car-free stays', copy: 'Central Kamala can be convenient; hillside and outer-bay properties may make shuttles or rides part of every day.', icon: Footprints },
      { eyebrow: 'Look elsewhere', title: 'Nightlife-first trip', copy: 'Patong is the clearer base when late-night choice and major shopping are central rather than occasional.', icon: MoonStar, tone: 'dark' },
    ],
    editorialRule: 'Choose Kamala for its pace, then verify whether the hotel is connected to the village and beach—or intentionally separate from them.',
    zones: [
      { title: 'North Kamala', eyebrow: 'Resort-led and more separated', copy: 'Useful when the property is part of the destination and you do not need the village at the door.', check: 'Confirm gradients, shuttle hours, pickup points and the actual public-beach route.', image: HERO, imageAlt: 'Kamala’s green northern headland and relaxed shoreline' },
      { title: 'Central village & beachfront', eyebrow: 'The easiest everyday rhythm', copy: 'A stronger choice for walking to food, services and the beach while keeping evenings low-key.', check: 'Map the entrance and recent noise context rather than judging only the distance to the sand.', image: '/images/redesign/phuket-stay-kamala.webp', imageAlt: 'Kamala beachfront and low-rise village context' },
      { title: 'South Kamala & hills', eyebrow: 'Views with a transport trade-off', copy: 'Some stays gain privacy or elevation but become less spontaneous for beach visits and village dinners.', check: 'Treat a resort shuttle as a schedule, not as permanent door-to-door freedom.', image: '/images/redesign/phuket-destination-hero-v2.webp', imageAlt: 'Green Phuket coast and elevated resort landscape' },
    ],
    dayParts: [
      { time: 'Early morning', title: 'Read the bay first', copy: 'Check flags and walk the beach while temperatures and foot traffic are lower.', icon: Sunrise },
      { time: 'Midday', title: 'Let the resort earn its place', copy: 'Use shade, lunch and a pool instead of stretching an exposed beach session through the hottest hours.', icon: Sun },
      { time: 'Sunset', title: 'Kamala’s natural headline', copy: 'Return to the west-facing shore, then keep dinner within the cluster you deliberately chose.', icon: Sunset },
      { time: 'Evening', title: 'Relaxed rather than empty', copy: 'Expect restaurants and modest bars, not Patong’s scale. Plan transport before a bigger night elsewhere.', icon: MoonStar },
    ],
    beachTitle: 'A calm-looking bay is not a safety promise.',
    beachDescription: 'Kamala can look sheltered, but swimming safety still changes with wind, swell and currents. Follow lifeguards, signs and flags on the day. During rougher monsoon patterns, keep a pool or land-based alternative ready.',
    beachChecks: [
      { title: 'Flags decide', copy: 'Do not enter under a red flag, even when other people are in the water or the sky appears clear.', icon: AlertTriangle },
      { title: 'Supervise actively', copy: 'Family-friendly describes the area, not guaranteed child-safe water. Recheck waves and depth every visit.', icon: Users },
      { title: 'Verify operators', copy: 'For any boat or water activity, check the briefing, equipment, insurance position and weather terms.', icon: ShieldCheck },
    ],
    seasonTitle: <>Pick the travel style.<br />Check the real forecast.</>,
    seasonDescription: 'Broad west-coast seasons help shape a trip, but short-range TMD forecasts and local sea conditions decide individual beach and boat days.',
    seasonRows: [
      { period: 'Dec–Feb', conditions: 'Often a stronger broad window for drier weather and calmer beach planning.', planning: 'Demand may be higher. Compare live room terms and keep checking daily flags.', cue: 'Popular window', highlight: true },
      { period: 'Mar–Apr', conditions: 'Hotter conditions can make exposed walking and midday beach time more tiring.', planning: 'Start earlier and value shade, pool access and a compact walking radius.', cue: 'Plan for heat' },
      { period: 'May–Oct', conditions: 'South-west monsoon patterns can bring showers, swell and stronger current risk.', planning: 'Keep flexible land-based days and treat red flags as a firm stop.', cue: 'Flexible coast plan', highlight: true },
      { period: 'Nov', conditions: 'A transition can combine improving stretches with unsettled periods.', planning: 'Judge your dates through the current outlook rather than a fixed monthly claim.', cue: 'Check the week' },
    ],
    spokes: [
      { title: 'Kamala hotels', copy: 'Compare micro-location, beach route, room type and current cancellation terms.', href: '/phuket/kamala/hotels/', image: '/images/redesign/phuket-hotels-hero.webp', imageAlt: 'Phuket resort coast and hotel zones', label: 'Open hotel guide' },
      { title: 'Phuket attractions', copy: 'Build island-wide days without pretending every attraction sits inside Kamala.', href: '/city/phuket/attractions/', image: '/images/redesign/phuket-attractions-hero.webp', imageAlt: 'Phuket coast, viewpoints and attractions', label: 'Explore attractions' },
      { title: 'Current activities', copy: 'Compare operator, pickup, physical demand and weather terms for your dates.', href: activities, image: '/images/redesign/phuket-destination-hero-v2.webp', imageAlt: 'Phuket tropical coast and day-trip scenery', label: 'Check current options', affiliate: true },
      { title: 'Where to stay in Phuket', copy: 'Compare Kamala’s quiet rhythm with the island’s other practical bases.', href: '/where-to-stay/phuket/', image: '/images/redesign/phuket-stay-bang-tao.webp', imageAlt: 'Phuket resort and beach area', label: 'Compare all areas' },
    ],
    comparisonCards: [
      { area: 'Patong', fit: 'Stronger for nightlife, shopping and maximum visitor infrastructure.', href: '/phuket/patong/', image: '/images/redesign/phuket-stay-patong.webp', imageAlt: 'Patong beachfront and visitor district' },
      { area: 'Kata', fit: 'More compact-feeling, busier and more closely associated with seasonal surf.', href: '/phuket/kata/', image: '/images/redesign/kata-area-hero-v2.webp', imageAlt: 'Compact Kata Beach bay with surfers' },
      { area: 'Karon', fit: 'Longer and more spread out, with a broader resort-and-beach footprint.', href: '/phuket/karon/', image: '/images/redesign/karon-area-hero-v2.webp', imageAlt: 'Wide Karon Beach at golden hour' },
    ],
    safetyCards: [
      { title: 'Sea conditions', copy: 'Follow local flags and lifeguards; rough water and currents can make swimming unsafe.', icon: Waves },
      { title: 'Hills & roads', copy: 'Inspect real walking routes and use licensed transport. Ride only with correct licence, helmet and cover.', icon: Bus },
      { title: 'Local respect', copy: 'Kamala combines visitor resorts and lived-in community space. Dress and behave respectfully away from the beach.', icon: ShieldCheck },
    ],
    bookingCards: [
      { title: 'Kamala hotels', copy: 'Compare the exact pin, recent room feedback, cancellation terms and total for your dates.', href: hotels, label: 'Check current hotel prices', icon: Hotel, affiliate: true },
      { title: 'Phuket activities', copy: 'Verify pickup, operator, inclusions, physical demands and weather policy before payment.', href: activities, label: 'Check current activities', icon: TicketCheck, affiliate: true },
      { title: 'West-coast bus', copy: 'Check current stops, timetable, luggage and payment information with the operator.', href: 'https://phuketsmartbus.com/', label: 'Open current bus information', icon: Bus },
    ],
    faqs: [
      { question: 'Is Kamala Beach worth it?', answer: 'Kamala is worth considering when a relaxed beach-and-resort base matters more than nightlife or major shopping. It can feel too quiet for a packed entertainment trip, and outer-bay hotels need a transport check.' },
      { question: 'Is Kamala a good area to stay in Phuket?', answer: 'Yes for many families, couples and slower trips. Central Kamala supports an easier walking rhythm; hillside or resort-led edges can trade convenience for views or separation.' },
      { question: 'Is Kamala Beach better than Patong?', answer: 'Kamala generally fits calm evenings and resort time; Patong fits nightlife, shopping and concentrated services. Neither is universally better—choose around the trip’s dominant daily need.' },
      { question: 'Which is better, Kamala Beach or Kata Beach?', answer: 'Kamala is often quieter and more village-and-resort oriented. Kata feels more compact, visitor-focused and linked to seasonal surf. Compare hotel access, evening atmosphere and planned island journeys.' },
      { question: 'Is there much to do in Kamala Beach?', answer: 'Kamala works best when the beach, pool, food and slower rhythm are features rather than gaps. For a long attraction list, plan selected Phuket day trips and verify pickup zones.' },
      { question: 'Does Kamala Beach have nightlife?', answer: 'Kamala has restaurants and low-key bars, but not Patong’s late-night concentration. Pre-plan transport when a bigger night elsewhere is part of the itinerary.' },
      { question: 'Is Kamala Beach family-friendly?', answer: 'It can be, with suitable resorts and a calmer pace. Check the exact room, pool supervision, road crossings, walking route and daily swimming conditions instead of treating the label as a guarantee.' },
      { question: 'Can you swim at Kamala Beach?', answer: 'Only when current conditions and local flags allow. Wind, swell and rip currents change; stay out under a red flag and use a pool or land plan when the water is unsafe.' },
    ],
    faqDescription: 'These are genuine questions captured from ten live English Kamala SERPs on 27 July 2026. Answers avoid stale prices, fixed journey times and universal safety claims.',
    related: [
      { title: 'Phuket destination guide', description: 'Build the island route before choosing one coast.', href: '/city/phuket/', image: '/images/redesign/phuket-destination-hero-v2.webp', imageAlt: 'Phuket coast and tropical bay' },
      { title: 'Where to stay in Phuket', description: 'Compare Kamala with every major hotel zone.', href: '/where-to-stay/phuket/', image: '/images/redesign/phuket-hotels-hero.webp', imageAlt: 'Phuket resort coast and accommodation zones' },
      { title: 'Phuket attractions', description: 'Plan island-wide sights separately from the Kamala owner.', href: '/city/phuket/attractions/', image: '/images/redesign/phuket-attractions-hero.webp', imageAlt: 'Phuket attractions and viewpoints' },
    ],
    sources: [
      { title: 'Phuket destination', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Destinations/Provinces/phuket/350', note: 'Official Phuket context and beach-flag guidance.' },
      { title: 'Phuket current and seven-day forecast', creator: 'Thai Meteorological Department', url: 'https://www.tmd.go.th/weather/province/phuket', note: 'Primary current weather and outlook source.' },
      { title: 'Routes, timetable and live tracking', creator: 'Phuket Smart Bus', url: 'https://phuketsmartbus.com/', note: 'Current operator information for west-coast transport.' },
      { title: 'Thailand safety and security', creator: 'UK Foreign, Commonwealth & Development Office', url: 'https://www.gov.uk/foreign-travel-advice/thailand/safety-and-security', note: 'Current beach, road and personal-safety guidance.' },
    ],
    methodDescription: 'Updated 27 July 2026 after DataForSEO owner checks, 321 cluster records and ten live English SERPs with 57 captured People Also Ask questions. DFS returned no usable competitor-domain set or keyword metrics for these Kamala clusters; this limitation is preserved rather than filled. One full competitor parse, one partial parse and four blocked/empty parses were retained. Legacy fixed prices, distances, percentages, hotel claims, religious generalisations and safety guarantees were removed.',
  };
  return <PhuketAreaGuideTemplate data={data} />;
}
