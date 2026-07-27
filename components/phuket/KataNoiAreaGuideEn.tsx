import {
  Bus, CalendarDays, CheckCircle2, Compass, Footprints, Hotel, MapPin,
  MoonStar, ShieldCheck, Sparkles, Sun, Sunrise, Sunset, TicketCheck,
  Umbrella, Users, Waves,
} from 'lucide-react';
import { KLOOK_GENERIC, TRIP_GENERIC, withSubId } from '../../lib/affiliates';
import { PhuketAreaGuideTemplate, type PhuketAreaGuideData } from './PhuketAreaGuideTemplate';

const HERO = '/images/redesign/kata-noi-area-hero-v2.webp';

export default function KataNoiAreaGuideEn({ hotelHref, activityHref }: { hotelHref?: string; activityHref?: string }) {
  const hotels = withSubId(hotelHref || TRIP_GENERIC, 'kata-noi-owner-en-hotels');
  const activities = withSubId(activityHref || KLOOK_GENERIC, 'kata-noi-owner-en-activities');

  const data: PhuketAreaGuideData = {
    pageUrl: 'https://go2-thailand.com/phuket/kata/kata-noi/', updatedAt: '2026-07-27', area: 'Kata Noi',
    title: 'Kata Noi Beach Phuket: Is It Right for Your Stay?',
    description: 'Decide whether Kata Noi Beach fits your Phuket trip. Compare bay zones, Kata access, swimming conditions, family fit, limited local choice and current hotels.',
    heroImage: HERO, heroAlt: 'Compact crescent of Kata Noi Beach with green headlands and low-rise resort edge in morning light',
    heroEyebrow: 'Kata’s smaller southern bay',
    heroTitle: <>Kata Noi.<br /><span className="text-saffron-dark">A compact beach, with compact choices.</span></>,
    heroSubtitle: 'Choose the bay—then accept the trade-off.',
    heroDescription: 'Kata Noi offers a more contained beach routine than main Kata, but fewer independent choices and a stronger dependence on your exact property. It works when quiet beach time matters more than a broad village on the doorstep.',
    heroPrimary: { label: 'See if Kata Noi fits', href: '#fit' }, heroAffiliate: { label: 'Check current hotels', href: hotels },
    navItems: [
      { href: '#fit', label: 'Who it fits', icon: Compass }, { href: '#zones', label: 'Bay zones', icon: MapPin },
      { href: '#beach', label: 'Beach reality', icon: Waves }, { href: '#season', label: 'When to go', icon: CalendarDays },
      { href: '#plan', label: 'Plan the stay', icon: TicketCheck }, { href: '#safety', label: 'Safety', icon: ShieldCheck },
    ],
    verdictTitle: <>A quieter beach routine.<br />Not a full village substitute.</>,
    verdictDescription: 'Kata Noi is strongest for travellers happy to centre the stay on beach and property. Main Kata is stronger when restaurant breadth, surf-school choice, shops and a larger evening circuit matter every day.',
    fitCards: [
      { eyebrow: 'Strong fit', title: 'Beach-centred couples', copy: 'Useful when a contained bay, slower evenings and the exact property experience are the point of the trip.', icon: Sparkles },
      { eyebrow: 'Strong fit', title: 'Low-key resort families', copy: 'Can work with the right room, pool and facilities, after checking current family terms and safe beach conditions.', icon: Users },
      { eyebrow: 'Conditional fit', title: 'Repeat Phuket visitors', copy: 'A good reset for travellers who already know the island and do not need a broad first-time base.', icon: CheckCircle2 },
      { eyebrow: 'Look elsewhere', title: 'Variety-first travellers', copy: 'Choose main Kata when independent restaurants, shops, surf schools and evening choice should be walkable.', icon: MoonStar, tone: 'dark' },
    ],
    editorialRule: 'Book Kata Noi for the contained bay experience—not because an old article promises a fixed crowd level, hotel count, room price or permanently calm sea.',
    zones: [
      { title: 'Northern approach', eyebrow: 'Closer to the Kata connection', copy: 'Can be useful when moving between both bays matters more than staying fully inside the resort rhythm.', check: 'Map the real road, slope, pavement and after-dark walk from the exact property pin.', image: '/images/redesign/kata-area-hero-v2.webp', imageAlt: 'Kata Bay near the approach to Kata Noi' },
      { title: 'Central bay edge', eyebrow: 'Beach routine first', copy: 'Best when direct-looking beach access and property facilities will carry most of the day.', check: 'Verify that the room category—not just the resort—has the access, outlook and inclusions shown.', image: HERO, imageAlt: 'Central crescent and resort edge at Kata Noi Beach' },
      { title: 'Southern & hillside edge', eyebrow: 'Views with more logistics', copy: 'Elevated or edge properties may trade flatter access for outlook, privacy or a different arrival pattern.', check: 'Check stairs, road crossings, shuttle dependence and the real route to public beach access.', image: '/images/redesign/phuket-stay-kata-karon.webp', imageAlt: 'Hillside and tropical accommodation around southern Phuket' },
    ],
    dayParts: [
      { time: 'Early morning', title: 'Read the bay before settling', copy: 'Check flags, waves, access points and how the beach is actually being used that day.', icon: Sunrise },
      { time: 'Midday', title: 'Let shade and property matter', copy: 'A smaller local choice makes pool, room, food access and shade more important than the area label.', icon: Sun },
      { time: 'Late afternoon', title: 'Compare sea and road plans', copy: 'Use the beach only when conditions allow; otherwise move to a pool, viewpoint or verified inland option.', icon: Sunset },
      { time: 'Evening', title: 'Quiet or connect to main Kata', copy: 'Stay local for a contained night or plan the real return route when seeking more choice in main Kata.', icon: MoonStar },
    ],
    beachTitle: 'A beautiful bay is not a swimming guarantee.',
    beachDescription: 'Kata Noi’s headland setting can look sheltered in photographs, but wave, current and surf conditions change. Swimming suitability is decided by the conditions, local flags and lifeguards on the day—not by season copy or a hotel description.',
    beachChecks: [
      { title: 'Read flags and lifeguards', copy: 'Do not enter on a red flag. Ask locally when conditions or supervised areas are unclear.', icon: ShieldCheck },
      { title: 'Separate swimming from surf', copy: 'Periods attractive to experienced surfers can be unsuitable for casual swimmers or beginners.', icon: Waves },
      { title: 'Supervise children closely', copy: 'A compact beach and gentle-looking edge do not remove shorebreak, current or changing depth.', icon: Users },
    ],
    seasonTitle: <>Choose a planning band.<br />Judge the actual sea.</>,
    seasonDescription: 'Broad Andaman patterns help with expectations, but they cannot promise a calm week, a surf session or safe swimming on a specific day.',
    seasonRows: [
      { period: 'Dec–Feb', conditions: 'Often a stronger broad window for drier weather and beach-oriented plans.', planning: 'Demand can rise; compare current room terms and still check daily flags.', cue: 'Popular window', highlight: true },
      { period: 'Mar–Apr', conditions: 'Hotter conditions can make the road connection and exposed beach tiring.', planning: 'Prioritise shade, hydration and shorter walking periods.', cue: 'Plan for heat' },
      { period: 'May–Oct', conditions: 'Monsoon patterns can bring rain, larger waves, currents and changing beach conditions.', planning: 'Keep pool and land alternatives; never treat surf as proof that swimming is safe.', cue: 'Flexible beach plan', highlight: true },
      { period: 'Nov', conditions: 'A transition can include improving periods and unsettled days.', planning: 'Use current TMD forecasts and local beach information rather than a fixed promise.', cue: 'Check the week' },
    ],
    spokes: [
      { title: 'Main Kata area guide', copy: 'Compare Kata Noi’s contained bay with the broader village, beach and evening choice next door.', href: '/phuket/kata/', image: '/images/redesign/kata-area-hero-v2.webp', imageAlt: 'Main Kata Beach bay', label: 'Compare main Kata' },
      { title: 'Kata hotel guide', copy: 'Move into the accommodation shortlist after deciding which side of the Kata area fits.', href: '/phuket/kata/hotels/', image: '/images/redesign/phuket-hotels-hero.webp', imageAlt: 'Phuket hotel and resort zones', label: 'Open hotel guide' },
      { title: 'Kata surfing guide', copy: 'Keep board level, season, lessons and safety on the specialist surf owner.', href: '/phuket/kata/surfing/', image: '/images/redesign/kata-area-hero-v2.webp', imageAlt: 'Seasonal water activity at Kata Beach', label: 'Plan surfing' },
      { title: 'Current Phuket activities', copy: 'Compare operator, pickup, inclusions, weather policy and cancellation on live inventory.', href: activities, image: '/images/redesign/phuket-attractions-hero.webp', imageAlt: 'Phuket coastal activities and viewpoints', label: 'Check current options', affiliate: true },
    ],
    comparisonCards: [
      { area: 'Main Kata', fit: 'More independent choice, surf-school access and a broader visitor village.', href: '/phuket/kata/', image: '/images/redesign/kata-area-hero-v2.webp', imageAlt: 'Main Kata Beach' },
      { area: 'Nai Harn', fit: 'A quieter south-Phuket alternative with a different bay, green setting and local rhythm.', href: '/phuket/nai-harn/', image: '/images/redesign/nai-harn-area-hero-v2.webp', imageAlt: 'Nai Harn Beach' },
      { area: 'Karon', fit: 'A longer conventional resort beach with broader space and different evening logistics.', href: '/phuket/karon/', image: '/images/redesign/karon-area-hero-v2.webp', imageAlt: 'Karon Beach' },
    ],
    safetyCards: [
      { title: 'Sea conditions', copy: 'Follow flags and lifeguards, supervise children and stay out when conditions are unsafe.', icon: Waves },
      { title: 'Hills & roads', copy: 'Check slopes and walking routes before booking; use licensed transport and proper road-safety precautions.', icon: Footprints },
      { title: 'Sun & heat', copy: 'Use shade, hydration and sun protection even when cloud or breeze makes exposure feel mild.', icon: Umbrella },
    ],
    bookingCards: [
      { title: 'Kata Noi hotels', copy: 'Compare exact pin, room category, access, recent feedback, cancellation and total for your dates.', href: hotels, label: 'Check current hotel prices', icon: Hotel, affiliate: true },
      { title: 'Phuket activities', copy: 'Verify pickup zone, operator, inclusions, weather terms and return plan before payment.', href: activities, label: 'Check current activities', icon: TicketCheck, affiliate: true },
      { title: 'Current transport', copy: 'Check the operator’s live route and stop information, then map the final connection to Kata Noi.', href: 'https://phuketsmartbus.com/', label: 'Open current bus information', icon: Bus },
    ],
    faqs: [
      { question: 'Is Kata Noi Beach worth visiting?', answer: 'Yes when a compact, beach-centred visit or stay suits you. It is less suitable when the trip depends on a broad choice of independent restaurants, shopping or nightlife.' },
      { question: 'What is the difference between Kata Beach and Kata Noi Beach?', answer: 'Kata Noi is the smaller southern bay with a more contained accommodation-and-beach routine. Main Kata has a broader visitor village, more independent choice and easier access to surf schools.' },
      { question: 'Can you walk from Kata to Kata Noi?', answer: 'A road connection exists, but the real experience depends on your start point, slope, pavement, heat and traffic. Map the exact route rather than relying on an old fixed walking time.' },
      { question: 'Can you swim at Kata Noi Beach?', answer: 'Only when current conditions, flags and lifeguard guidance allow. Seasonal patterns cannot guarantee safe swimming on a particular day.' },
      { question: 'Is Kata Noi Beach good for families?', answer: 'It can be for families choosing a suitable room, pool and facilities, with close child supervision at the sea. Families wanting lots of walkable independent choice may prefer main Kata.' },
      { question: 'Where should I stay at Kata Noi Beach?', answer: 'Choose by exact map pin, room category, slope and actual route to public beach access. Do not infer access or outlook from the resort name alone.' },
      { question: 'Does Kata Noi Beach have restaurants?', answer: 'There are dining options in and around the area, but the choice is more limited than main Kata and businesses change. Check current maps, menus, dietary information and opening before relying on one place.' },
      { question: 'Can you surf at Kata Noi Beach?', answer: 'Surf can occur when swell and conditions align, but it is not a guaranteed or beginner-suitable session. Check local flags and current professional guidance; use main Kata for a broader lesson/school search.' },
    ],
    faqDescription: 'These are genuine questions captured from ten live English Kata Noi SERPs on 27 July 2026. Fixed fares, walking times, resort prices and swimming guarantees were excluded.',
    related: [
      { title: 'Kata area guide', description: 'Compare the broader Kata village and beach before choosing the smaller bay.', href: '/phuket/kata/', image: '/images/redesign/kata-area-hero-v2.webp', imageAlt: 'Kata Beach bay' },
      { title: 'Where to stay in Phuket', description: 'Compare Kata Noi with the island’s main accommodation zones.', href: '/where-to-stay/phuket/', image: '/images/redesign/phuket-hotels-hero.webp', imageAlt: 'Phuket accommodation zones' },
      { title: 'Phuket destination guide', description: 'Build the island route around realistic coast and city movement.', href: '/city/phuket/', image: '/images/redesign/phuket-destination-hero-v2.webp', imageAlt: 'Phuket coast and destination context' },
    ],
    sources: [
      { title: 'Phuket destination', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Destinations/Provinces/phuket/350', note: 'Official destination and beach context.' },
      { title: 'Phuket current and seven-day forecast', creator: 'Thai Meteorological Department', url: 'https://www.tmd.go.th/weather/province/phuket', note: 'Primary current weather source.' },
      { title: 'Routes, timetable and live tracking', creator: 'Phuket Smart Bus', url: 'https://phuketsmartbus.com/', note: 'Current operator transport information.' },
      { title: 'Thailand safety and security', creator: 'UK Foreign, Commonwealth & Development Office', url: 'https://www.gov.uk/foreign-travel-advice/thailand/safety-and-security', note: 'Current beach, marine and road-safety guidance.' },
    ],
    methodDescription: 'Updated 27 July 2026 after owner ranking and backlink checks, 69 keyword records, 50 competitor-domain records, ten live English SERPs with 57 PAA questions and three competitor parses. One parse was partial at 660 characters; the others returned 13,892 and 11,926. Legacy beach length, hotel and restaurant counts, resort facility claims, fixed walking and taxi times, room prices, surf guarantees, crowd claims and swimming promises were removed.',
  };

  return <PhuketAreaGuideTemplate data={data} />;
}
