import { AlertTriangle, Bus, CalendarDays, CheckCircle2, Compass, Footprints, Hotel, MapPin, MoonStar, ShieldCheck, ShoppingBag, Sun, Sunrise, Sunset, TicketCheck, Umbrella, Users, Waves } from 'lucide-react';
import { KLOOK_GENERIC, TRIP_GENERIC, withSubId } from '../../lib/affiliates';
import { PhuketAreaGuideTemplate, type PhuketAreaGuideData } from './PhuketAreaGuideTemplate';

const HERO = '/images/redesign/bang-tao-area-hero-v2.webp';

export default function BangTaoAreaGuideEn({ hotelHref, activityHref }: { hotelHref?: string; activityHref?: string }) {
  const hotels = withSubId(hotelHref || TRIP_GENERIC, 'bang-tao-owner-en-hotels');
  const activities = withSubId(activityHref || KLOOK_GENERIC, 'bang-tao-owner-en-activities');
  const data: PhuketAreaGuideData = {
    pageUrl: 'https://go2-thailand.com/phuket/bang-tao/', updatedAt: '2026-07-27', area: 'Bang Tao',
    title: 'Bang Tao Beach Phuket: Is Bang Tao Right for You?',
    description: 'Decide whether Bang Tao Beach fits your Phuket trip. Compare Laguna, Boat Avenue and beach zones, family fit, seasons, safety and current stays.',
    heroImage: HERO, heroAlt: 'Long Bang Tao Beach at golden hour with resort greenery and a family walking by the sea',
    heroEyebrow: 'Phuket’s spacious resort-and-lifestyle coast',
    heroTitle: <>Bang Tao Beach.<br /><span className="text-saffron-dark">Space, polish, a longer radius.</span></>,
    heroSubtitle: 'Choose the right cluster—not only the right resort.',
    heroDescription: 'Bang Tao combines a long west-coast beach, the landscaped Laguna area and the inland dining-and-shopping orbit around Boat Avenue. That range is the appeal, but it also makes transport and micro-location unusually important.',
    heroPrimary: { label: 'See if Bang Tao fits', href: '#fit' }, heroAffiliate: { label: 'Check current hotels', href: hotels },
    navItems: [
      { href: '#fit', label: 'Who it fits', icon: Compass }, { href: '#zones', label: 'Zones', icon: MapPin },
      { href: '#beach', label: 'Beach', icon: Waves }, { href: '#season', label: 'When to go', icon: CalendarDays },
      { href: '#plan', label: 'Plan Bang Tao', icon: TicketCheck }, { href: '#safety', label: 'Safety', icon: ShieldCheck },
    ],
    verdictTitle: <>Resort ease.<br />Area-wide distances.</>,
    verdictDescription: 'Bang Tao is a strong fit for resort-led families, couples and travellers who value polished dining and a spacious coast. It is less convincing when compact walkability, low prices or nightlife at the doorstep define the trip.',
    fitCards: [
      { eyebrow: 'Strong fit', title: 'Resort-led families', copy: 'A pool, beach and on-site facilities can simplify the week—after verifying room setup, crossings and daily sea conditions.', icon: Users },
      { eyebrow: 'Strong fit', title: 'Couples mixing beach and dining', copy: 'Useful when relaxed resort time and a broader restaurant scene matter more than a dense old-town atmosphere.', icon: Sunset },
      { eyebrow: 'Conditional fit', title: 'Car-free travellers', copy: 'One chosen cluster can work well. Moving between the beach, Laguna and inland venues still needs a realistic route.', icon: Footprints },
      { eyebrow: 'Look elsewhere', title: 'Compact budget or nightlife trip', copy: 'Patong provides denser nightlife and services; Kata offers a smaller-feeling beach-town radius.', icon: MoonStar, tone: 'dark' },
    ],
    editorialRule: 'Do not book “Bang Tao” as one walkable neighbourhood. Pin the hotel, preferred beach section and evening cluster, then price and time the links between them.',
    zones: [
      { title: 'South Bang Tao', eyebrow: 'More local and beach-club energy', copy: 'A more mixed edge where beach venues, smaller stays and local streets can sit closer together than inside Laguna.', check: 'Check current venue access and room noise; beach businesses and road patterns change.', image: '/images/redesign/phuket-stay-bang-tao.webp', imageAlt: 'Bang Tao resort and beachfront atmosphere' },
      { title: 'Laguna & Boat Avenue orbit', eyebrow: 'Polished and convenience-led', copy: 'The clearest fit for travellers who value resort infrastructure and a broad dining-and-shopping ecosystem.', check: 'Confirm whether resort transport serves your dates and hours; Boat Avenue is inland, not a beachfront promenade.', image: HERO, imageAlt: 'Landscaped Bang Tao resort coast and long beach' },
      { title: 'North Bang Tao & Layan side', eyebrow: 'More space, fewer spontaneous errands', copy: 'A quieter resort-led choice when seclusion and property time matter more than walking to a large restaurant cluster.', check: 'Map every recurring journey and verify pickup availability before choosing a remote-looking pin.', image: '/images/redesign/phuket-destination-hero-v2.webp', imageAlt: 'Quiet northern Phuket coast with tropical greenery' },
    ],
    dayParts: [
      { time: 'Early morning', title: 'Use the long shoreline', copy: 'Walk your own section and read the flags before choosing a swimming or activity plan.', icon: Sunrise },
      { time: 'Midday', title: 'Let the resort reduce friction', copy: 'Pool, shade and lunch nearby are more valuable here than repeatedly crossing the wider district in the heat.', icon: Sun },
      { time: 'Late afternoon', title: 'Return to the west coast', copy: 'Use sunset as the anchor, then move only to the evening cluster you planned in advance.', icon: Sunset },
      { time: 'Evening', title: 'Dining over club-hopping', copy: 'Bang Tao has polished restaurants and beach venues, but it is not Patong’s concentrated late-night district.', icon: MoonStar },
    ],
    beachTitle: 'A long beach with changing local conditions.',
    beachDescription: 'Different stretches can feel materially different, and no season guarantees safe swimming. Wind, swell and rip currents change the water; follow lifeguards, signs and flags at the exact beach section you use.',
    beachChecks: [
      { title: 'Check your section', copy: 'Conditions and access can differ along a long bay. Reassess after moving to another stretch.', icon: Waves },
      { title: 'Red means stop', copy: 'Do not enter under a red flag, regardless of the sky, itinerary or what other swimmers do.', icon: AlertTriangle },
      { title: 'Verify every operator', copy: 'Check briefing, equipment, insurance position, inclusions and weather cancellation terms.', icon: ShieldCheck },
    ],
    seasonTitle: <>Choose the trip window.<br />Check the actual coast.</>,
    seasonDescription: 'West-coast seasonality helps shape a broad plan. The current TMD outlook, marine warnings and local flags decide individual swimming and boat days.',
    seasonRows: [
      { period: 'Dec–Feb', conditions: 'Often a stronger broad window for drier weather and calmer beach planning.', planning: 'Popular resort dates can carry high demand. Compare live terms and daily sea conditions.', cue: 'Popular window', highlight: true },
      { period: 'Mar–Apr', conditions: 'Heat and humidity can become the main constraint for long walks and exposed afternoons.', planning: 'Start earlier and value shade, pools and a short hotel-to-beach route.', cue: 'Plan for heat' },
      { period: 'May–Oct', conditions: 'South-west monsoon patterns can bring showers, wind, swell and stronger current risk.', planning: 'Keep land-based alternatives and treat red flags as a firm stop.', cue: 'Flexible coast plan', highlight: true },
      { period: 'Nov', conditions: 'A transition can combine improving runs with unsettled periods.', planning: 'Use the current forecast rather than promising one behaviour for the entire month.', cue: 'Check the week' },
    ],
    spokes: [
      { title: 'Bang Tao hotels', copy: 'Compare properties by micro-zone, beach route, room type and live terms.', href: '/phuket/bang-tao/hotels/', image: '/images/redesign/phuket-hotels-hero.webp', imageAlt: 'Phuket resort coast and accommodation zones', label: 'Open hotel guide' },
      { title: 'Phuket attractions', copy: 'Plan island-wide sights separately from the beach owner.', href: '/city/phuket/attractions/', image: '/images/redesign/phuket-attractions-hero.webp', imageAlt: 'Phuket coast, viewpoints and attractions', label: 'Explore attractions' },
      { title: 'Current activities', copy: 'Compare pickup, operator, physical demand and weather terms for your dates.', href: activities, image: '/images/redesign/phuket-destination-hero-v2.webp', imageAlt: 'Phuket tropical coast and day-trip scenery', label: 'Check current options', affiliate: true },
      { title: 'Where to stay in Phuket', copy: 'Compare Bang Tao’s footprint with the island’s other practical bases.', href: '/where-to-stay/phuket/', image: '/images/redesign/phuket-stay-kata-karon.webp', imageAlt: 'Phuket west-coast hotel areas', label: 'Compare all areas' },
    ],
    comparisonCards: [
      { area: 'Patong', fit: 'Stronger for nightlife, shopping and dense visitor infrastructure.', href: '/phuket/patong/', image: '/images/redesign/phuket-stay-patong.webp', imageAlt: 'Patong beachfront district' },
      { area: 'Kata', fit: 'More compact-feeling and more closely associated with seasonal surf.', href: '/phuket/kata/', image: '/images/redesign/kata-area-hero-v2.webp', imageAlt: 'Compact Kata Beach bay' },
      { area: 'Kamala', fit: 'A calmer village-and-resort bay with a smaller overall footprint.', href: '/phuket/kamala/', image: '/images/redesign/kamala-area-hero-v2.webp', imageAlt: 'Relaxed Kamala Beach at golden hour' },
    ],
    safetyCards: [
      { title: 'Sea conditions', copy: 'Follow flags and lifeguards at your exact beach section; rough water can make swimming unsafe.', icon: Waves },
      { title: 'Roads & distance', copy: 'Use licensed transport and only ride with the correct licence, helmet and insurance cover.', icon: Bus },
      { title: 'Heat & exposure', copy: 'Shade, water and a compact midday route matter on a long, spread-out coast.', icon: Umbrella },
    ],
    bookingCards: [
      { title: 'Bang Tao hotels', copy: 'Compare the exact pin, recent room feedback, cancellation terms and total for your dates.', href: hotels, label: 'Check current hotel prices', icon: Hotel, affiliate: true },
      { title: 'Phuket activities', copy: 'Verify pickup zone, operator, inclusions, physical demands and weather policy.', href: activities, label: 'Check current activities', icon: TicketCheck, affiliate: true },
      { title: 'West-coast bus', copy: 'Check current stops, timetable, luggage and payment details with the operator.', href: 'https://phuketsmartbus.com/', label: 'Open current bus information', icon: Bus },
    ],
    faqs: [
      { question: 'Is Bang Tao worth visiting?', answer: 'Bang Tao is worth considering for a spacious beach, resort-led stay and polished dining ecosystem. It is less suitable when compact walkability, low-cost variety or nightlife at the doorstep matters most.' },
      { question: 'What is Bang Tao in Phuket like?', answer: 'It is a spread-out northwest-coast area combining a long beach, mixed southern streets, the Laguna resort zone, inland dining around Boat Avenue and quieter northern stretches. The exact micro-zone changes the stay.' },
      { question: 'Is Bang Tao better than Patong?', answer: 'Bang Tao generally fits resort time, space and quieter evenings; Patong fits nightlife, shopping and dense services. Neither is universally better.' },
      { question: 'What is the difference between Bang Tao and Kata Beach?', answer: 'Bang Tao is more spread out and resort-and-lifestyle oriented. Kata feels more compact and has a stronger seasonal surf identity. Compare transport radius and evening style.' },
      { question: 'Is Bang Tao Beach a party beach?', answer: 'Bang Tao has beach venues, restaurants and bars, but it is not Phuket’s main concentrated party district. Check current venue programming rather than assuming a nightly scene.' },
      { question: 'Is Bang Tao Beach good for families?', answer: 'It can be a strong family base with the right resort and zone. Verify room setup, pool supervision, crossings, transport and daily swimming conditions.' },
      { question: 'Can you swim at Bang Tao Beach?', answer: 'Only when current conditions and flags allow. Wind, swell and rip currents change; stay out under a red flag and recheck after moving to another section.' },
      { question: 'Is there anything to do in Bang Tao?', answer: 'The area suits beach, resort, dining and selected activities more than a dense sightseeing checklist. Use verified current operators for wider Phuket days and confirm pickup.' },
    ],
    faqDescription: 'These are genuine questions captured from ten live English Bang Tao SERPs on 27 July 2026. Answers avoid stale prices, fixed journey times and safety guarantees.',
    related: [
      { title: 'Phuket destination guide', description: 'Build the island route before choosing one coast.', href: '/city/phuket/', image: '/images/redesign/phuket-destination-hero-v2.webp', imageAlt: 'Phuket coast and tropical bay' },
      { title: 'Where to stay in Phuket', description: 'Compare every major accommodation zone.', href: '/where-to-stay/phuket/', image: '/images/redesign/phuket-hotels-hero.webp', imageAlt: 'Phuket resort coast and hotel zones' },
      { title: 'Phuket attractions', description: 'Plan island-wide sights without overloading the area owner.', href: '/city/phuket/attractions/', image: '/images/redesign/phuket-attractions-hero.webp', imageAlt: 'Phuket attractions and viewpoints' },
    ],
    sources: [
      { title: 'Phuket destination', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Destinations/Provinces/phuket/350', note: 'Official destination context and beach-flag guidance.' },
      { title: 'Phuket current and seven-day forecast', creator: 'Thai Meteorological Department', url: 'https://www.tmd.go.th/weather/province/phuket', note: 'Primary current weather source.' },
      { title: 'Routes, timetable and live tracking', creator: 'Phuket Smart Bus', url: 'https://phuketsmartbus.com/', note: 'Current operator transport information.' },
      { title: 'Thailand safety and security', creator: 'UK Foreign, Commonwealth & Development Office', url: 'https://www.gov.uk/foreign-travel-advice/thailand/safety-and-security', note: 'Current beach, road and personal-safety guidance.' },
    ],
    methodDescription: 'Updated 27 July 2026 after two owner ranking keywords, backlink checks, 254 keyword records, 100 competitor-domain records, ten live English SERPs with 49 PAA questions and three full competitor parses. Hotel depth stays with /phuket/bang-tao/hotels/. Legacy fixed prices, dimensions, journey times, resort counts, venue counts, shuttle promises and swimming guarantees were removed.',
  };
  return <PhuketAreaGuideTemplate data={data} />;
}
