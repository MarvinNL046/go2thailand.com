import {
  AlertTriangle,
  BedDouble,
  Bus,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Compass,
  Footprints,
  Hotel,
  MapPin,
  MoonStar,
  ShieldCheck,
  ShoppingBag,
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

const PAGE_URL = 'https://go2-thailand.com/phuket/karon/';
const HERO = '/images/redesign/karon-area-hero-v2.webp';
const UPDATED_AT = '2026-07-27';

interface Props {
  hotelHref?: string;
  activityHref?: string;
}

export default function KaronAreaGuideEn({ hotelHref, activityHref }: Props) {
  const currentHotels = withSubId(hotelHref || TRIP_GENERIC, 'karon-owner-en-hotels');
  const currentActivities = withSubId(activityHref || KLOOK_GENERIC, 'karon-owner-en-activities');

  const data: PhuketAreaGuideData = {
    pageUrl: PAGE_URL,
    updatedAt: UPDATED_AT,
    title: 'Karon Beach Phuket: Is Karon the Right Area for You?',
    description: 'Decide whether Karon Beach fits your Phuket trip. Compare its zones, beach rhythm, seasons, family fit, Karon vs Kata and Patong, and current stays.',
    area: 'Karon',
    heroImage: HERO,
    heroAlt: 'Karon Beach at golden hour with an open shoreline, green headland and relaxed travellers',
    heroEyebrow: 'Phuket’s spacious west-coast base',
    heroTitle: <>Karon Beach.<br /><span className="text-saffron-dark">Room to slow down.</span></>,
    heroSubtitle: 'A long beach base with choices at both ends.',
    heroDescription: 'Karon offers more breathing room than Patong and a more spread-out layout than Kata. That makes the exact part of Karon—not just the area name—the key booking decision.',
    heroPrimary: { label: 'See if Karon fits', href: '#fit' },
    heroAffiliate: { label: 'Check current hotels', href: currentHotels },
    navItems: [
      { href: '#fit', label: 'Who it fits', icon: Compass },
      { href: '#zones', label: 'Zones', icon: MapPin },
      { href: '#beach', label: 'Beach', icon: Waves },
      { href: '#season', label: 'When to go', icon: CalendarDays },
      { href: '#plan', label: 'Plan Karon', icon: TicketCheck },
      { href: '#safety', label: 'Safety', icon: ShieldCheck },
    ],
    verdictTitle: <>Space first.<br />Micro-location matters.</>,
    verdictDescription: 'Karon is a strong match for a beach-led stay with restaurants and resorts nearby, without Patong’s intensity. Its length is also the catch: the hotel pin and real walking route determine whether your days feel easy or transport-heavy.',
    fitCards: [
      { eyebrow: 'Strong fit', title: 'Beach-led couples', copy: 'Good when sunset, resort time and relaxed dinners matter more than a dense nightlife district.', icon: Sunset },
      { eyebrow: 'Strong fit', title: 'Families wanting space', copy: 'The broad beach and resort choice can work well, provided the pool, room setup, road crossings and current sea conditions suit your family.', icon: Users },
      { eyebrow: 'Conditional fit', title: 'Car-free travellers', copy: 'Choose the right cluster and many daily needs can be walkable. Crossing the full area or touring Phuket still needs a transport plan.', icon: Footprints },
      { eyebrow: 'Look elsewhere', title: 'Nightlife at your door', copy: 'Patong is the clearer choice for concentrated late-night venues. Kata may fit better when you want a smaller, more compact evening centre.', icon: MoonStar, tone: 'dark' },
    ],
    editorialRule: 'Book the part of Karon that matches your daily routine. A beautiful resort at the wrong end can create a transport problem every time you leave it.',
    zones: [
      { title: 'North Karon', eyebrow: 'Resort-led and more separated', copy: 'Useful for travellers who expect the property and beach to carry much of the stay. Restaurant choice and the walking environment vary by the exact pin.', check: 'Map the hotel entrance, nearest safe crossing and the places you will actually use after dark.', image: HERO, imageAlt: 'Open Karon Beach and resort greenery at golden hour' },
      { title: 'Karon centre & circle', eyebrow: 'Daily convenience close together', copy: 'A practical choice when you want restaurants, shops and local services near the beach without using a vehicle for every small errand.', check: 'Check room orientation and recent noise feedback; being central trades some quiet for access.', image: '/images/cities/phuket/attractions/Karon Beach.webp', imageAlt: 'Wide sandy shoreline at Karon Beach in Phuket' },
      { title: 'South Karon', eyebrow: 'The Kata-facing compromise', copy: 'This end can suit travellers who want Karon’s open beach while keeping Kata’s dining and evening atmosphere within their wider route.', check: 'Do not assume the Karon–Kata connection is effortless in every heat, weather or mobility scenario; inspect the actual route.', image: '/images/redesign/phuket-stay-kata-karon.webp', imageAlt: 'Karon and Kata coastline with green Phuket headlands' },
    ],
    dayParts: [
      { time: 'Early morning', title: 'Walk the open shoreline', copy: 'Use the cooler hours to understand the beach, your preferred section and the day’s flags before settling into a plan.', icon: Sunrise },
      { time: 'Midday', title: 'Let shade shape the day', copy: 'A pool, lunch or indoor pause can be more comfortable than treating an exposed beach as an all-day activity.', icon: Sun },
      { time: 'Sunset', title: 'The west coast earns its place', copy: 'Return to the beach, then keep dinner close to your chosen cluster rather than crossing Karon without a reason.', icon: Sunset },
      { time: 'Evening', title: 'Low-key rather than silent', copy: 'Expect restaurants and relaxed bars, with the atmosphere changing by micro-zone. Go to Patong only when a bigger nightlife night is the point.', icon: MoonStar },
    ],
    beachTitle: 'A generous beach—with a live safety decision.',
    beachDescription: 'Karon’s broad shoreline is its main advantage, but no month guarantees safe swimming. Wind, swell and rip currents can change the water quickly, particularly during wetter monsoon patterns. Follow lifeguards, local signs and red flags on the day.',
    beachChecks: [
      { title: 'Flags over forecasts', copy: 'A pleasant-looking sky does not overrule a red flag. If swimming is restricted, use the pool or choose a land-based plan.', icon: AlertTriangle },
      { title: 'Recheck with children', copy: 'Family-friendly describes area fit, not guaranteed water safety. Reassess depth, waves and supervision every visit.', icon: Users },
      { title: 'Verify water activities', copy: 'Check the operator, equipment, insurance position, briefing and weather cancellation policy before paying.', icon: ShieldCheck },
    ],
    seasonTitle: <>Choose a broad window.<br />Check the actual week.</>,
    seasonDescription: 'Phuket’s west coast has recognisable seasonal patterns, but short-range weather, marine conditions and local flags make the final decision. Keep at least one flexible day in a beach-heavy itinerary.',
    seasonRows: [
      { period: 'Dec–Feb', conditions: 'Often one of the stronger broad windows for drier weather and calmer west-coast planning.', planning: 'Demand can be higher. Compare live hotel terms and keep checking sea conditions.', cue: 'Popular window', highlight: true },
      { period: 'Mar–Apr', conditions: 'Hotter conditions can make exposed beach time and walking more tiring.', planning: 'Start earlier, protect shade and hydration time, and avoid overloading the afternoon.', cue: 'Plan for heat' },
      { period: 'May–Oct', conditions: 'South-west monsoon patterns can bring showers, wind, swell and stronger current risk.', planning: 'Build a land-and-indoor fallback and treat red flags as a firm stop.', cue: 'Stay flexible', highlight: true },
      { period: 'Nov', conditions: 'A transition period can include both improving runs and unsettled days.', planning: 'Judge the dates through the current TMD outlook rather than a fixed monthly promise.', cue: 'Check the week' },
    ],
    spokes: [
      { title: 'Karon hotels', copy: 'Compare stays by exact micro-location, recent room feedback and live cancellation terms.', href: '/phuket/karon/hotels/', image: '/images/redesign/phuket-hotels-hero.webp', imageAlt: 'Phuket resort and hotel zone by the coast', label: 'Open hotel guide' },
      { title: 'Phuket attractions', copy: 'Separate island-wide sights from places that are genuinely practical from Karon.', href: '/city/phuket/attractions/', image: '/images/redesign/phuket-attractions-hero.webp', imageAlt: 'Phuket viewpoints, coast and attractions', label: 'Explore attractions' },
      { title: 'Current activities', copy: 'Compare live pickup zones, operator terms, inclusions and weather policies before booking.', href: currentActivities, image: '/images/redesign/phuket-destination-hero-v2.webp', imageAlt: 'Phuket tropical coast and day-trip scenery', label: 'Check current activities', affiliate: true },
      { title: 'Where to stay in Phuket', copy: 'Compare Karon with the island’s other bases before committing to one coast.', href: '/where-to-stay/phuket/', image: '/images/redesign/phuket-stay-bang-tao.webp', imageAlt: 'Phuket beachfront resort area', label: 'Compare all areas' },
    ],
    comparisonCards: [
      { area: 'Kata', fit: 'More compact and often the first comparison for families, dining access and surfing context.', href: '/phuket/kata/', image: '/images/redesign/phuket-stay-kata-karon.webp', imageAlt: 'Kata and Karon coastline in Phuket' },
      { area: 'Patong', fit: 'Stronger for concentrated nightlife, shopping and maximum visitor infrastructure.', href: '/phuket/patong/', image: '/images/redesign/phuket-stay-patong.webp', imageAlt: 'Patong beachfront and compact visitor district' },
      { area: 'Kamala', fit: 'A calmer, smaller-feeling west-coast base with a different balance of village and resort life.', href: '/phuket/kamala/', image: '/images/redesign/phuket-stay-kamala.webp', imageAlt: 'Kamala Beach and green west-coast hills' },
    ],
    safetyCards: [
      { title: 'Sea conditions', copy: 'Follow lifeguards, warning signs and flags. Rough water and rip currents can make swimming unsafe even on a warm day.', icon: Waves },
      { title: 'Roads & crossings', copy: 'Judge the real hotel-to-beach route. Use licensed transport and only ride a scooter with the correct licence, helmet and insurance.', icon: Bus },
      { title: 'Heat & exposure', copy: 'Use shade, water and slower midday pacing. Children and older travellers may need a shorter walking radius than the map suggests.', icon: Umbrella },
    ],
    bookingCards: [
      { title: 'Karon hotels', copy: 'Compare the exact pin, room type, recent feedback, cancellation terms and total for your dates.', href: currentHotels, label: 'Check current hotel prices', icon: Hotel, affiliate: true },
      { title: 'Phuket activities', copy: 'Verify pickup, operator, inclusions, physical demands and weather policy before payment.', href: currentActivities, label: 'Check current options', icon: TicketCheck, affiliate: true },
      { title: 'Airport & coast bus', copy: 'Check current stops, timetable, luggage information and payment details with the operator.', href: 'https://phuketsmartbus.com/', label: 'Open Smart Bus information', icon: Bus },
    ],
    faqs: [
      { question: 'Is Karon Beach a good area to stay?', answer: 'Karon is a strong choice when you want an open beach, resort choice and relaxed evenings without Patong’s intensity. It is spread out, so choose the hotel’s exact micro-location around the places you expect to use rather than relying on the Karon label alone.' },
      { question: 'Is Karon or Patong better?', answer: 'Neither is universally better. Karon generally fits a beach-led, lower-key stay; Patong fits nightlife, shopping and maximum concentration of services. Compare the actual hotel street, your evening priorities and how often you plan to cross Phuket.' },
      { question: 'Which is better, Karon Beach or Kata Beach?', answer: 'Karon offers a longer, more open and spread-out beach base. Kata is smaller and can feel more compact, with a stronger surfing context. Families and couples can enjoy either; the better choice depends on hotel position, walking tolerance and preferred evening atmosphere.' },
      { question: 'Is there much to do in Karon?', answer: 'Karon works best as a beach and resort base with restaurants, local services and access to wider Phuket activities. Travellers seeking a dense list of attractions at the doorstep may prefer a busier base or plan selected day trips with verified pickup.' },
      { question: 'Is Karon Beach family-friendly?', answer: 'The spacious beach and resort choice can make Karon a good family base, but family-friendly does not mean the sea is always safe. Check current flags, road crossings, room configuration, pool supervision and the real walking route before booking.' },
      { question: 'Can you walk from Karon to Kata Beach?', answer: 'The areas meet along Phuket’s west coast, but whether the walk is sensible depends on your starting point, heat, rain, hills, traffic and mobility. Inspect the exact route and use current local transport when the connection does not suit your group.' },
      { question: 'Does Karon have nightlife?', answer: 'Karon has restaurants and low-key evening venues, but it is not Phuket’s main concentrated nightlife base. Choose Patong when late-night variety at the doorstep is central to the trip.' },
      { question: 'Is Karon Beach safe for swimming?', answer: 'Swimming safety changes with daily wind, swell and currents. Follow lifeguards, signs and beach flags; do not enter the water under a red flag. During rougher monsoon conditions, keep a pool or land-based alternative ready.' },
    ],
    faqDescription: 'These questions were captured from live English People Also Ask results on 27 July 2026. Answers separate area fit from day-specific safety and avoid stale transport, hotel and activity prices.',
    related: [
      { title: 'Phuket destination guide', description: 'Build the island route before choosing one coastal base.', href: '/city/phuket/', image: '/images/redesign/phuket-destination-hero-v2.webp', imageAlt: 'Phuket coast and tropical bay' },
      { title: 'Where to stay in Phuket', description: 'Compare the island’s main hotel zones by traveller fit and route.', href: '/where-to-stay/phuket/', image: '/images/redesign/phuket-hotels-hero.webp', imageAlt: 'Phuket resort coast and hotel zones' },
      { title: 'Phuket attractions', description: 'Plan island-wide sights without forcing every stop into Karon.', href: '/city/phuket/attractions/', image: '/images/redesign/phuket-attractions-hero.webp', imageAlt: 'Phuket attractions, coast and viewpoints' },
    ],
    sources: [
      { title: 'Phuket destination', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Destinations/Provinces/phuket/350', note: 'Official Phuket context and guidance to follow beach warning flags.' },
      { title: 'Phuket current and seven-day forecast', creator: 'Thai Meteorological Department', url: 'https://www.tmd.go.th/weather/province/phuket', note: 'Primary source for current Phuket weather and official outlooks.' },
      { title: 'Routes, timetable and live tracking', creator: 'Phuket Smart Bus', url: 'https://phuketsmartbus.com/', note: 'Operator source for current stops, timetable and passenger information.' },
      { title: 'Thailand safety and security', creator: 'UK Foreign, Commonwealth & Development Office', url: 'https://www.gov.uk/foreign-travel-advice/thailand/safety-and-security', note: 'Current official guidance on beach flags, currents, roads, hired motorcycles and personal safety.' },
    ],
    methodDescription: 'Updated 27 July 2026 after DataForSEO ranking and backlink checks, 547 keyword records across two Karon clusters, 100 competitor-domain records, ten live English SERPs with 53 captured People Also Ask questions, and three competitor content parses. The area owner keeps hotel detail with /phuket/karon/hotels/ and island-wide attractions with /city/phuket/attractions/. Legacy fixed prices, times, discounts, hotel-facility assumptions and universal safety claims were removed.',
  };

  return <PhuketAreaGuideTemplate data={data} />;
}
