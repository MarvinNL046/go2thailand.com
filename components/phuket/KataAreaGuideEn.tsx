import {
  AlertTriangle,
  Bus,
  CalendarDays,
  CheckCircle2,
  Compass,
  Footprints,
  Hotel,
  MapPin,
  MoonStar,
  ShieldCheck,
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

const PAGE_URL = 'https://go2-thailand.com/phuket/kata/';
const HERO = '/images/redesign/kata-area-hero-v2.webp';
const UPDATED_AT = '2026-07-27';

interface Props {
  hotelHref?: string;
  activityHref?: string;
  surfingHref?: string;
}

export default function KataAreaGuideEn({ hotelHref, activityHref, surfingHref }: Props) {
  const currentHotels = withSubId(hotelHref || TRIP_GENERIC, 'kata-owner-en-hotels');
  const currentActivities = withSubId(activityHref || KLOOK_GENERIC, 'kata-owner-en-activities');
  const currentSurfing = withSubId(surfingHref || activityHref || KLOOK_GENERIC, 'kata-owner-en-surfing');

  const data: PhuketAreaGuideData = {
    pageUrl: PAGE_URL,
    updatedAt: UPDATED_AT,
    title: 'Kata Beach Phuket: Is Kata the Right Area for You?',
    description: 'Decide whether Kata Beach fits your Phuket trip. Compare Kata’s zones, family and surf fit, Kata vs Karon or Patong, seasons, safety and current stays.',
    area: 'Kata',
    heroImage: HERO,
    heroAlt: 'Compact Kata Beach bay at golden hour with green headlands, families and surfers',
    heroEyebrow: 'Phuket’s compact beach-and-village base',
    heroTitle: <>Kata Beach.<br /><span className="text-saffron-dark">Small bay, flexible days.</span></>,
    heroSubtitle: 'Beach rhythm with more life close at hand.',
    heroDescription: 'Kata brings a curved west-coast beach, a compact visitor centre and seasonal surf context into one base. It often works for families and first-time Phuket stays—but the beach access route and exact micro-zone still decide the experience.',
    heroPrimary: { label: 'See who Kata fits', href: '#fit' },
    heroAffiliate: { label: 'Check current hotels', href: currentHotels },
    navItems: [
      { href: '#fit', label: 'Who it fits', icon: Compass },
      { href: '#zones', label: 'Zones', icon: MapPin },
      { href: '#beach', label: 'Beach & surf', icon: Waves },
      { href: '#season', label: 'When to go', icon: CalendarDays },
      { href: '#plan', label: 'Plan Kata', icon: TicketCheck },
      { href: '#safety', label: 'Safety', icon: ShieldCheck },
    ],
    verdictTitle: <>Compact in feel.<br />Not identical door to door.</>,
    verdictDescription: 'Kata is a strong all-rounder when beach time, restaurants and an easy evening rhythm matter together. Its apparent compactness can hide long walls, indirect beach entrances and hillside properties, so judge the real route from your room to the sand.',
    fitCards: [
      { eyebrow: 'Strong fit', title: 'Families wanting balance', copy: 'A useful mix of beach, pools, casual food and manageable evenings—once you verify crossings, room setup and the current sea.', icon: Users },
      { eyebrow: 'Strong fit', title: 'Beach plus seasonal surf', copy: 'Kata has an established surf context in rougher west-coast periods. Conditions and lesson suitability still need a day-specific operator check.', icon: Waves },
      { eyebrow: 'Strong fit', title: 'First Phuket base', copy: 'Good when you want a recognisable beach town with enough services, without making Patong nightlife the centre of the trip.', icon: CheckCircle2 },
      { eyebrow: 'Look elsewhere', title: 'Seclusion or big nightlife', copy: 'Kata is popular and visitor-oriented. Choose a quieter coast for retreat time or Patong for concentrated late-night options.', icon: MoonStar, tone: 'dark' },
    ],
    editorialRule: 'Treat “Kata” as a cluster of different walking experiences. Before booking, trace the entrance-to-beach route and the evening route you will use most.',
    zones: [
      { title: 'North Kata', eyebrow: 'Karon-facing and route-sensitive', copy: 'This side can connect well to the wider Kata–Karon plan, but beach access and walking convenience vary around large properties and roads.', check: 'Map the actual public beach entrance rather than measuring a straight line from the hotel pin.', image: '/images/redesign/phuket-stay-kata-karon.webp', imageAlt: 'Kata and Karon coastline with tropical headlands' },
      { title: 'Central Kata', eyebrow: 'The convenience-first choice', copy: 'Best suited to travellers who want restaurants, shops and evening services close to their daily route.', check: 'Compare access against room noise, traffic and the steepness of any side street.', image: '/images/cities/phuket/attractions/Kata Beach.webp', imageAlt: 'Curved Kata Beach bay on Phuket' },
      { title: 'South Kata & Kata Noi edge', eyebrow: 'Quieter edges, stronger hills', copy: 'The southern side can feel more scenic and resort-led, with access toward Kata Noi. Hills and indirect routes become a bigger part of the decision.', check: 'Confirm shuttle details, gradients and pickup points if anyone in your group has limited mobility.', image: HERO, imageAlt: 'Kata Beach framed by a green southern headland' },
    ],
    dayParts: [
      { time: 'Early morning', title: 'Start with the water check', copy: 'Read the flags and local conditions before deciding between swimming, walking, a lesson or a pool morning.', icon: Sunrise },
      { time: 'Midday', title: 'Keep the radius compact', copy: 'Use shade, lunch and a pool break rather than stacking exposed beach time with a long uphill return.', icon: Sun },
      { time: 'Late afternoon', title: 'Beach or supervised surf', copy: 'Return when the heat eases. If surfing, match the lesson and equipment to current conditions and your real ability.', icon: Waves },
      { time: 'Evening', title: 'Dinner without a nightlife mission', copy: 'Kata’s value is an easy restaurant-and-bar rhythm. Go to Patong only when a bigger night is worth the extra journey.', icon: MoonStar },
    ],
    beachTitle: 'Swimming beach and surf setting—never on autopilot.',
    beachDescription: 'Kata’s conditions change through the year and from day to day. Calmer-looking periods can suit swimming, while rougher west-coast patterns support its surf identity but also raise current and wave risk. Flags, lifeguards and a qualified operator outrank a monthly label.',
    beachChecks: [
      { title: 'Swim by the flags', copy: 'Do not use other swimmers as proof of safety. Follow local signs and stay out when a red flag is displayed.', icon: AlertTriangle },
      { title: 'Surf at your level', copy: 'Ask a current operator about conditions, lesson area, instructor supervision, equipment and cancellation policy.', icon: Waves },
      { title: 'Reassess for children', copy: 'Family fit does not guarantee child-friendly water every day. Depth, shore break and currents still require active supervision.', icon: Users },
    ],
    seasonTitle: <>Plan for beach or surf.<br />Then check the day.</>,
    seasonDescription: 'Broad Phuket seasonality can help choose the style of trip, not guarantee a specific activity. Use TMD forecasts, marine warnings, beach flags and qualified local judgement close to the date.',
    seasonRows: [
      { period: 'Dec–Feb', conditions: 'Often a stronger broad window for drier weather and calmer west-coast beach planning.', planning: 'Popular dates can book early. Compare live terms and still check the sea each morning.', cue: 'Beach-led window', highlight: true },
      { period: 'Mar–Apr', conditions: 'Heat and humidity can become the main constraint even when beach plans remain possible.', planning: 'Start earlier, use shade and keep the hotel-to-beach route realistic for your group.', cue: 'Plan for heat' },
      { period: 'May–Oct', conditions: 'South-west monsoon patterns can bring rain, wind, swell and a more visible surf season.', planning: 'Surf only within your ability and operator guidance; red flags can also make entering the water unsafe.', cue: 'Surf context, flexible plan', highlight: true },
      { period: 'Nov', conditions: 'A transition can mix improving stretches with unsettled weather and changing sea state.', planning: 'Use the current outlook instead of assuming the whole month behaves one way.', cue: 'Check the week' },
    ],
    spokes: [
      { title: 'Kata hotels', copy: 'Compare stays by actual beach route, micro-zone, room type and live cancellation terms.', href: '/phuket/kata/hotels/', image: '/images/redesign/phuket-hotels-hero.webp', imageAlt: 'Phuket resort coast and hotel zone', label: 'Open hotel guide' },
      { title: 'Surfing in Kata', copy: 'Use the dedicated guide for seasonal context, lesson checks and safety-first planning.', href: '/phuket/kata/surfing/', image: '/images/cities/phuket/attractions/Kata Beach.webp', imageAlt: 'Kata Beach and its west-coast water conditions', label: 'Open surf guide' },
      { title: 'Current Phuket activities', copy: 'Compare live operator, pickup, physical-demand and weather terms before booking.', href: currentActivities, image: '/images/redesign/phuket-attractions-hero.webp', imageAlt: 'Phuket coastal activities and viewpoints', label: 'Check current options', affiliate: true },
      { title: 'Current surf options', copy: 'See whether suitable lessons or experiences are available for your dates and ability.', href: currentSurfing, image: HERO, imageAlt: 'Surfers walking beside compact Kata Beach', label: 'Check current surf options', affiliate: true },
    ],
    comparisonCards: [
      { area: 'Karon', fit: 'Longer, more open and more spread out; a stronger comparison for resort space and quieter rhythm.', href: '/phuket/karon/', image: '/images/redesign/karon-area-hero-v2.webp', imageAlt: 'Wide Karon Beach at golden hour' },
      { area: 'Patong', fit: 'Stronger for nightlife, shopping and maximum concentration of visitor services.', href: '/phuket/patong/', image: '/images/redesign/phuket-stay-patong.webp', imageAlt: 'Patong beachfront and compact visitor district' },
      { area: 'Kamala', fit: 'A calmer west-coast alternative with a different balance of village and resort atmosphere.', href: '/phuket/kamala/', image: '/images/redesign/phuket-stay-kamala.webp', imageAlt: 'Kamala Beach and green west-coast hills' },
    ],
    safetyCards: [
      { title: 'Sea & surf', copy: 'Follow lifeguards, flags and qualified instruction. Rough water can be attractive to experienced surfers and unsafe for swimmers at the same time.', icon: Waves },
      { title: 'Hills & roads', copy: 'Inspect the real walking route and crossings. Only ride with the correct licence, helmet and insurance cover.', icon: Bus },
      { title: 'Sun & heat', copy: 'Use shade, hydration and a slower midday plan. Cloud cover does not remove UV or heat exposure.', icon: Umbrella },
    ],
    bookingCards: [
      { title: 'Kata hotels', copy: 'Compare the exact entrance, recent room feedback, cancellation terms and total for your dates.', href: currentHotels, label: 'Check current hotel prices', icon: Hotel, affiliate: true },
      { title: 'Kata & Phuket activities', copy: 'Verify pickup zone, operator, inclusions, physical demand and weather policy before payment.', href: currentActivities, label: 'Check current activities', icon: TicketCheck, affiliate: true },
      { title: 'Airport & west-coast bus', copy: 'Check current stops, timetable, luggage guidance and payment details with Phuket Smart Bus.', href: 'https://phuketsmartbus.com/', label: 'Open current bus information', icon: Bus },
    ],
    faqs: [
      { question: 'Is Kata Beach worth visiting?', answer: 'Kata is worth considering when you want a compact Phuket beach base with restaurants, family-oriented resort choice and seasonal surf context. It is popular and visitor-oriented, so compare another area if the trip depends on seclusion or a local-only atmosphere.' },
      { question: 'Which is better, Kata Beach or Karon Beach?', answer: 'Kata feels more compact and has a stronger seasonal surf identity. Karon offers a longer, more open and spread-out beach base. Neither is universally better: compare your hotel’s real beach route, walking tolerance, evening style and transport plan.' },
      { question: 'Why is Kata Beach so popular?', answer: 'Kata combines an attractive west-coast bay, a practical visitor centre, resort choice and access to food and activities in a relatively compact area. Popularity also means it may feel busy, particularly on high-demand dates.' },
      { question: 'Is Kata Beach safe for swimming?', answer: 'Swimming safety changes with wind, swell and currents. Follow lifeguards, signs and flags on the day, and never enter under a red flag. Rougher monsoon conditions can make swimming unsafe even when the beach remains open for other uses.' },
      { question: 'Is Kata Beach good for families?', answer: 'Kata can be a strong family base because beach, pools, food and daily services can fit into a compact routine. Verify the room setup, current sea, child supervision, road crossings and the actual walking route before deciding.' },
      { question: 'Is Kata Beach too touristy?', answer: 'Kata is firmly a visitor-oriented beach town. That brings convenience and choice, but it may feel too developed for travellers seeking seclusion. Choose it when that infrastructure solves your trip rather than expecting an undiscovered bay.' },
      { question: 'Is it better to stay in Kata or Patong?', answer: 'Kata generally fits beach-led days, lower-key evenings and family or couple trips. Patong fits concentrated nightlife, shopping and maximum tour infrastructure. The better base depends on your evening priorities and how much cross-island travel you plan.' },
      { question: 'Does Kata have nightlife?', answer: 'Kata has restaurants and relaxed bars, but not Patong’s scale or late-night concentration. It suits travellers who want an easy evening near the beach rather than nightlife as the primary itinerary.' },
      { question: 'What is there to do at Kata Beach?', answer: 'Use the beach when flags allow, explore the area’s food and viewpoints, consider a suitable supervised surf lesson in current conditions, and add selected Phuket day trips. Verify operators, pickup and weather policies close to the date.' },
    ],
    faqDescription: 'These are genuine questions captured from ten live English Kata SERPs on 27 July 2026. Answers avoid stale prices, fixed journey times and unsafe monthly guarantees.',
    related: [
      { title: 'Phuket destination guide', description: 'Build the island route before choosing one beach base.', href: '/city/phuket/', image: '/images/redesign/phuket-destination-hero-v2.webp', imageAlt: 'Phuket coast and tropical bay' },
      { title: 'Where to stay in Phuket', description: 'Compare Kata with the island’s other hotel zones and travel patterns.', href: '/where-to-stay/phuket/', image: '/images/redesign/phuket-hotels-hero.webp', imageAlt: 'Phuket resort coast and accommodation zones' },
      { title: 'Phuket attractions', description: 'Separate island-wide sights from activities that are genuinely close to Kata.', href: '/city/phuket/attractions/', image: '/images/redesign/phuket-attractions-hero.webp', imageAlt: 'Phuket attractions, coast and viewpoints' },
    ],
    sources: [
      { title: 'Phuket destination', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Destinations/Provinces/phuket/350', note: 'Official Phuket destination context and guidance to follow beach warning flags.' },
      { title: 'Phuket current and seven-day forecast', creator: 'Thai Meteorological Department', url: 'https://www.tmd.go.th/weather/province/phuket', note: 'Primary source for current Phuket weather and official outlooks.' },
      { title: 'Routes, timetable and live tracking', creator: 'Phuket Smart Bus', url: 'https://phuketsmartbus.com/', note: 'Operator source for current west-coast stops, timetable and passenger information.' },
      { title: 'Thailand safety and security', creator: 'UK Foreign, Commonwealth & Development Office', url: 'https://www.gov.uk/foreign-travel-advice/thailand/safety-and-security', note: 'Current official guidance on beach flags, currents, roads, hired motorcycles and personal safety.' },
    ],
    methodDescription: 'Updated 27 July 2026 after DataForSEO owner ranking and backlink checks, 527 keyword records across two Kata clusters, 100 competitor-domain records, ten live English SERPs with 56 captured People Also Ask questions, and three competitor content parses. Hotel detail stays with /phuket/kata/hotels/, surf depth with /phuket/kata/surfing/ and island-wide attractions with /city/phuket/attractions/. Legacy fixed prices, percentages, journey times, wave guarantees and universal family or safety claims were removed.',
  };

  return <PhuketAreaGuideTemplate data={data} />;
}
