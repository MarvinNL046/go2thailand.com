import { AlertTriangle, Bus, CalendarDays, CheckCircle2, Compass, Footprints, Hotel, MapPin, MoonStar, ShieldCheck, Sun, Sunrise, Sunset, TicketCheck, Umbrella, Users, Waves } from 'lucide-react';
import { KLOOK_GENERIC, TRIP_GENERIC, withSubId } from '../../lib/affiliates';
import { PhuketAreaGuideTemplate, type PhuketAreaGuideData } from './PhuketAreaGuideTemplate';

const HERO = '/images/redesign/surin-area-hero-v2.webp';

export default function SurinAreaGuideEn({ hotelHref, activityHref }: { hotelHref?: string; activityHref?: string }) {
  const hotels = withSubId(hotelHref || TRIP_GENERIC, 'surin-owner-en-hotels');
  const activities = withSubId(activityHref || KLOOK_GENERIC, 'surin-owner-en-activities');
  const data: PhuketAreaGuideData = {
    pageUrl: 'https://go2-thailand.com/phuket/surin/', updatedAt: '2026-07-27', area: 'Surin',
    title: 'Surin Beach Phuket: Is Surin the Right Area for You?',
    description: 'Decide whether Surin Beach fits your Phuket trip. Compare its compact zones, couple and family fit, Surin vs Bang Tao or Kamala, seasons and current stays.',
    heroImage: HERO, heroAlt: 'Compact Surin Beach bay at golden hour with green headland and relaxed travellers',
    heroEyebrow: 'Phuket’s compact, refined west-coast bay',
    heroTitle: <>Surin Beach.<br /><span className="text-saffron-dark">Small bay, considered choice.</span></>,
    heroSubtitle: 'A beautiful beach base with less around the corner.',
    heroDescription: 'Surin pairs a compact bay and green headlands with a polished accommodation scene. It can suit couples and short beach-led stays, but limited area-wide variety makes the exact hotel and transport plan more important.',
    heroPrimary: { label: 'See if Surin fits', href: '#fit' }, heroAffiliate: { label: 'Check current hotels', href: hotels },
    navItems: [
      { href: '#fit', label: 'Who it fits', icon: Compass }, { href: '#zones', label: 'Zones', icon: MapPin },
      { href: '#beach', label: 'Beach', icon: Waves }, { href: '#season', label: 'When to go', icon: CalendarDays },
      { href: '#plan', label: 'Plan Surin', icon: TicketCheck }, { href: '#safety', label: 'Safety', icon: ShieldCheck },
    ],
    verdictTitle: <>Beach quality first.<br />Variety comes second.</>,
    verdictDescription: 'Surin is strongest when the bay, resort and quiet evening are the trip—not merely the base for constant island crossings. It is a weaker choice for broad budget inventory, dense nightlife or many family activities on foot.',
    fitCards: [
      { eyebrow: 'Strong fit', title: 'Couples wanting a composed stay', copy: 'A compact bay and resort-led rhythm can work well when calm evenings are an advantage rather than a gap.', icon: Sunset },
      { eyebrow: 'Strong fit', title: 'Short beach-focused break', copy: 'Useful when a few excellent beach days matter more than a long list of nearby attractions.', icon: Waves },
      { eyebrow: 'Conditional fit', title: 'Families', copy: 'It can work with the right room and pool, but compare Kamala and Bang Tao for a broader family ecosystem.', icon: Users },
      { eyebrow: 'Look elsewhere', title: 'Budget or nightlife-led trip', copy: 'Surin’s compact premium positioning provides less range than Patong, Kata or the wider Bang Tao district.', icon: MoonStar, tone: 'dark' },
    ],
    editorialRule: 'Choose Surin because the bay and property carry the stay. If you expect daily variety beyond them, map transport before paying a premium for the postcode.',
    zones: [
      { title: 'Beachfront approach', eyebrow: 'The bay as the daily anchor', copy: 'Best when easy beach access is the main reason to stay and the property covers your midday needs.', check: 'Trace the actual entrance and road crossing; a nearby pin does not prove direct sand access.', image: HERO, imageAlt: 'Surin Beach and its compact green bay' },
      { title: 'Village-side streets', eyebrow: 'More daily services, less seclusion', copy: 'A practical compromise for food and errands, with atmosphere varying by the exact road and room orientation.', check: 'Read recent room-specific noise and walking-route feedback rather than relying on area averages.', image: '/images/redesign/phuket-stay-kamala.webp', imageAlt: 'Low-rise west-coast Phuket neighbourhood and beach context' },
      { title: 'Hills and neighbouring edges', eyebrow: 'Views with more transport', copy: 'Elevated or boundary properties can feel private but may not behave like a walkable Surin beach stay.', check: 'Verify slope, shuttle, pickup point and whether branding matches the property’s actual bay.', image: '/images/redesign/phuket-destination-hero-v2.webp', imageAlt: 'Green elevated Phuket coast' },
    ],
    dayParts: [
      { time: 'Early morning', title: 'Read the compact bay', copy: 'Walk the shoreline and check flags before choosing a swimming plan.', icon: Sunrise },
      { time: 'Midday', title: 'Stay close to shade', copy: 'Pool, lunch and a short return route matter more than crossing Phuket in the heat.', icon: Sun },
      { time: 'Late afternoon', title: 'Let the beach lead', copy: 'Return as the heat eases, then keep dinner within the route you verified.', icon: Sunset },
      { time: 'Evening', title: 'Quiet is the product', copy: 'Expect dining and drinks rather than a broad nightlife circuit; plan transport for a bigger night elsewhere.', icon: MoonStar },
    ],
    beachTitle: 'Compact and attractive—never automatically safe.',
    beachDescription: 'Surin’s enclosed appearance does not guarantee calm water. Wind, swell, shore break and currents change through the year and by day. Follow lifeguards, signs and flags at the beach, not a fixed seasonal slogan.',
    beachChecks: [
      { title: 'Flags decide', copy: 'Do not enter under a red flag, regardless of the sky or what other visitors do.', icon: AlertTriangle },
      { title: 'Watch the shore break', copy: 'Reassess waves, entry and exit with children or less confident swimmers.', icon: Waves },
      { title: 'Verify activities', copy: 'Check operator, briefing, equipment, insurance position and weather cancellation terms.', icon: ShieldCheck },
    ],
    seasonTitle: <>Choose a broad window.<br />Check the actual bay.</>,
    seasonDescription: 'Phuket’s west-coast patterns shape the trip, while the TMD outlook and local flags determine each beach day.',
    seasonRows: [
      { period: 'Dec–Feb', conditions: 'Often a stronger broad window for drier weather and calmer beach planning.', planning: 'High demand can narrow choice. Compare live room terms and daily sea conditions.', cue: 'Popular window', highlight: true },
      { period: 'Mar–Apr', conditions: 'Heat and humidity can make exposed beach time and hills more tiring.', planning: 'Start earlier and prioritise shade, pool access and a short walking route.', cue: 'Plan for heat' },
      { period: 'May–Oct', conditions: 'South-west monsoon patterns can bring rain, swell and stronger current risk.', planning: 'Keep land alternatives and treat red flags as a firm stop.', cue: 'Flexible coast plan', highlight: true },
      { period: 'Nov', conditions: 'A transition can contain both improving runs and unsettled days.', planning: 'Use the current outlook rather than promising one behaviour for the month.', cue: 'Check the week' },
    ],
    spokes: [
      { title: 'Where to stay in Phuket', copy: 'Compare Surin’s compact premium fit with every major island base.', href: '/where-to-stay/phuket/', image: '/images/redesign/phuket-hotels-hero.webp', imageAlt: 'Phuket resort coast and hotel zones', label: 'Compare all areas' },
      { title: 'Bang Tao next door', copy: 'Compare Surin with a longer, more spread-out resort and dining district.', href: '/phuket/bang-tao/', image: '/images/redesign/bang-tao-area-hero-v2.webp', imageAlt: 'Long Bang Tao Beach at golden hour', label: 'Open Bang Tao guide' },
      { title: 'Current activities', copy: 'Compare pickup, operator, inclusions and weather terms for your dates.', href: activities, image: '/images/redesign/phuket-attractions-hero.webp', imageAlt: 'Phuket coast, viewpoints and activities', label: 'Check current options', affiliate: true },
      { title: 'Phuket attractions', copy: 'Plan island-wide sights separately from the Surin owner.', href: '/city/phuket/attractions/', image: '/images/redesign/phuket-destination-hero-v2.webp', imageAlt: 'Phuket tropical coast and attractions', label: 'Explore attractions' },
    ],
    comparisonCards: [
      { area: 'Bang Tao', fit: 'Longer, more spread out and stronger for resort, dining and lifestyle variety.', href: '/phuket/bang-tao/', image: '/images/redesign/bang-tao-area-hero-v2.webp', imageAlt: 'Bang Tao resort beach' },
      { area: 'Kamala', fit: 'More village-and-family oriented with a calmer overall rhythm.', href: '/phuket/kamala/', image: '/images/redesign/kamala-area-hero-v2.webp', imageAlt: 'Relaxed Kamala Beach' },
      { area: 'Kata', fit: 'More compact visitor infrastructure and a stronger seasonal surf identity.', href: '/phuket/kata/', image: '/images/redesign/kata-area-hero-v2.webp', imageAlt: 'Compact Kata Beach bay' },
    ],
    safetyCards: [
      { title: 'Sea conditions', copy: 'Follow flags and lifeguards; rough water and shore break can make swimming unsafe.', icon: Waves },
      { title: 'Hills & roads', copy: 'Inspect the real route and only ride with the correct licence, helmet and insurance.', icon: Bus },
      { title: 'Heat & exposure', copy: 'Use shade, water and a shorter midday radius, especially with children or older travellers.', icon: Umbrella },
    ],
    bookingCards: [
      { title: 'Surin hotels', copy: 'Compare exact pin, access route, recent room feedback, cancellation and total for your dates.', href: hotels, label: 'Check current hotel prices', icon: Hotel, affiliate: true },
      { title: 'Phuket activities', copy: 'Verify pickup, operator, inclusions, physical demands and weather policy.', href: activities, label: 'Check current activities', icon: TicketCheck, affiliate: true },
      { title: 'West-coast bus', copy: 'Check current stops, timetable, luggage and payment details with the operator.', href: 'https://phuketsmartbus.com/', label: 'Open current bus information', icon: Bus },
    ],
    faqs: [
      { question: 'Is Surin Beach worth visiting?', answer: 'Surin is worth considering for a compact attractive bay and a quieter, resort-led stay. It is less suitable when budget range, nightlife or a large walkable activity list matter most.' },
      { question: 'What is Surin Beach like?', answer: 'Surin is a relatively compact west-coast bay with green headlands and a polished accommodation context. The beach is the main attraction; wider dining and activity variety may require transport.' },
      { question: 'Is Surin Beach good for swimming?', answer: 'Only when current conditions and flags allow. Wind, swell, shore break and currents change; stay out under a red flag and supervise children actively.' },
      { question: 'Which is better, Kamala or Surin Beach?', answer: 'Kamala generally provides a broader village-and-family rhythm. Surin is more compact and beach/resort led. Compare property access, evening needs and transport.' },
      { question: 'What is the difference between Surin and Bang Tao?', answer: 'Surin is smaller and more compact. Bang Tao is longer, more spread out and supports a wider resort, dining and shopping ecosystem.' },
      { question: 'Is Surin Beach good for families?', answer: 'It can work with the right room, pool and route, but Kamala and Bang Tao are useful comparisons for broader family infrastructure. Daily swimming safety still depends on flags.' },
      { question: 'Are there shops near Surin Beach?', answer: 'Some services are available around the area, but inventory changes and Surin is not a major shopping district. Verify the current walking route to the exact services your group needs.' },
      { question: 'What activities can you do at Surin Beach?', answer: 'Use the beach when conditions allow, enjoy a resort-led day and add selected Phuket activities with verified pickup and weather terms. Do not assume every listed island activity operates in Surin itself.' },
    ],
    faqDescription: 'These are genuine questions captured from ten live English Surin SERPs on 27 July 2026. The Kamala comparison returned no PAA block; no questions were invented.',
    related: [
      { title: 'Phuket destination guide', description: 'Build the island route before choosing one coast.', href: '/city/phuket/', image: '/images/redesign/phuket-destination-hero-v2.webp', imageAlt: 'Phuket coast and tropical bay' },
      { title: 'Where to stay in Phuket', description: 'Compare the island’s major hotel zones.', href: '/where-to-stay/phuket/', image: '/images/redesign/phuket-hotels-hero.webp', imageAlt: 'Phuket resort coast' },
      { title: 'Phuket attractions', description: 'Plan island-wide sights separately from the beach owner.', href: '/city/phuket/attractions/', image: '/images/redesign/phuket-attractions-hero.webp', imageAlt: 'Phuket attractions and viewpoints' },
    ],
    sources: [
      { title: 'Phuket destination', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Destinations/Provinces/phuket/350', note: 'Official destination context and beach-flag guidance.' },
      { title: 'Phuket current and seven-day forecast', creator: 'Thai Meteorological Department', url: 'https://www.tmd.go.th/weather/province/phuket', note: 'Primary current weather source.' },
      { title: 'Routes, timetable and live tracking', creator: 'Phuket Smart Bus', url: 'https://phuketsmartbus.com/', note: 'Current operator transport information.' },
      { title: 'Thailand safety and security', creator: 'UK Foreign, Commonwealth & Development Office', url: 'https://www.gov.uk/foreign-travel-advice/thailand/safety-and-security', note: 'Current beach, road and personal-safety guidance.' },
    ],
    methodDescription: 'Updated 27 July 2026 after one owner ranking keyword, backlink checks, 317 keyword records, 100 competitor-domain records, ten live English SERPs with 47 PAA questions and three competitor parses. Legacy fixed prices, dimensions, travel times, hotel claims, vendor history, family rankings and swimming guarantees were removed.',
  };
  return <PhuketAreaGuideTemplate data={data} />;
}
