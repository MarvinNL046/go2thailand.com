import { AlertTriangle, Bus, CalendarDays, CheckCircle2, Compass, Footprints, Hotel, MapPin, MoonStar, ShieldCheck, Sun, Sunrise, Sunset, TicketCheck, Umbrella, Users, Waves } from 'lucide-react';
import { KLOOK_GENERIC, TRIP_GENERIC, withSubId } from '../../lib/affiliates';
import { PhuketAreaGuideTemplate, type PhuketAreaGuideData } from './PhuketAreaGuideTemplate';

const HERO = '/images/redesign/nai-harn-area-hero-v2.webp';

export default function NaiHarnAreaGuideEn({ hotelHref, activityHref }: { hotelHref?: string; activityHref?: string }) {
  const hotels = withSubId(hotelHref || TRIP_GENERIC, 'nai-harn-owner-en-hotels');
  const activities = withSubId(activityHref || KLOOK_GENERIC, 'nai-harn-owner-en-activities');
  const data: PhuketAreaGuideData = {
    pageUrl: 'https://go2-thailand.com/phuket/nai-harn/', updatedAt: '2026-07-27', area: 'Nai Harn',
    title: 'Nai Harn Beach Phuket: Is Nai Harn Right for You?',
    description: 'Decide whether Nai Harn Beach fits your Phuket trip. Compare beach, lake and hillside zones, Nai Harn vs Rawai or Kata, seasons, safety and current stays.',
    heroImage: HERO, heroAlt: 'Sheltered Nai Harn Beach with green headland, distant sailing boats and families at golden hour',
    heroEyebrow: 'Phuket’s quieter southern beach base',
    heroTitle: <>Nai Harn Beach.<br /><span className="text-saffron-dark">South-coast days, slower pace.</span></>,
    heroSubtitle: 'Choose it for the bay—not for island-wide convenience.',
    heroDescription: 'Nai Harn combines a sheltered-looking beach, green surroundings and a quieter southern rhythm. It works best when beach, walking and local food carry the stay; frequent trips north make its location the main trade-off.',
    heroPrimary: { label: 'See if Nai Harn fits', href: '#fit' }, heroAffiliate: { label: 'Check current hotels', href: hotels },
    navItems: [
      { href: '#fit', label: 'Who it fits', icon: Compass }, { href: '#zones', label: 'Zones', icon: MapPin },
      { href: '#beach', label: 'Beach', icon: Waves }, { href: '#season', label: 'When to go', icon: CalendarDays },
      { href: '#plan', label: 'Plan Nai Harn', icon: TicketCheck }, { href: '#safety', label: 'Safety', icon: ShieldCheck },
    ],
    verdictTitle: <>Beautiful southern base.<br />Longer island connections.</>,
    verdictDescription: 'Nai Harn is a strong fit for couples, repeat visitors and families wanting a slower beach routine. It is weaker for nightlife, shopping or itineraries that repeatedly cross to central and northern Phuket.',
    fitCards: [
      { eyebrow: 'Strong fit', title: 'Slow-paced couples', copy: 'Beach, walks and relaxed dinners can fill the day without needing a dense visitor district.', icon: Sunset },
      { eyebrow: 'Strong fit', title: 'Repeat Phuket visitors', copy: 'Useful when you already understand the island and deliberately want a southern base.', icon: CheckCircle2 },
      { eyebrow: 'Conditional fit', title: 'Families', copy: 'It can work with the right room, pool and transport plan; daily sea conditions still decide swimming.', icon: Users },
      { eyebrow: 'Look elsewhere', title: 'Nightlife or island-hopping logistics', copy: 'Patong offers nightlife density; Kata or Karon can reduce some west-coast travel friction.', icon: MoonStar, tone: 'dark' },
    ],
    editorialRule: 'Stay in Nai Harn because southern Phuket is the itinerary. Do not select it as a generic base for daily journeys across the entire island.',
    zones: [
      { title: 'Beach & lake edge', eyebrow: 'The easiest outdoor rhythm', copy: 'Best when morning walks, the bay and a short return to the room define the stay.', check: 'Trace the actual entrance and crossing; nearby accommodation does not always mean direct beach access.', image: HERO, imageAlt: 'Nai Harn bay and green southern headland' },
      { title: 'Village-side Nai Harn', eyebrow: 'Food and daily services first', copy: 'A practical choice for travellers who value local routines over waking directly beside the sand.', check: 'Map the heat, gradient and after-dark route to the beach rather than relying on a straight-line distance.', image: '/images/redesign/phuket-stay-kata-karon.webp', imageAlt: 'Low-rise southern Phuket neighbourhood near the coast' },
      { title: 'Hills & Rawai-facing side', eyebrow: 'Views, villas and more transport', copy: 'Can suit longer stays or groups with a vehicle plan, while reducing spontaneous beach access.', check: 'Verify pickup, slope and whether the property functions more like Rawai than Nai Harn.', image: '/images/redesign/phuket-destination-hero-v2.webp', imageAlt: 'Elevated green southern Phuket coast' },
    ],
    dayParts: [
      { time: 'Early morning', title: 'Walk before the heat', copy: 'Use the bay and green surroundings, then read the flags before planning a swim.', icon: Sunrise },
      { time: 'Midday', title: 'Keep the radius local', copy: 'Shade, pool and lunch nearby are better than building every day around a cross-island transfer.', icon: Sun },
      { time: 'Late afternoon', title: 'Beach or southern viewpoint', copy: 'Choose one realistic sunset plan and account for roads, parking and the return journey.', icon: Sunset },
      { time: 'Evening', title: 'Food over nightlife', copy: 'Expect relaxed restaurants and local routines. Plan transport in advance for a bigger night elsewhere.', icon: MoonStar },
    ],
    beachTitle: 'Sheltered in shape—not guaranteed calm.',
    beachDescription: 'Nai Harn’s green headlands can make the bay look protected, but wind, swell and rip currents still change swimming safety. Follow lifeguards, signs and flags on the day and never replace them with a monthly rule.',
    beachChecks: [
      { title: 'Read every flag', copy: 'Stay out under a red flag, even when the beach remains busy or the sky appears clear.', icon: AlertTriangle },
      { title: 'Separate lake and sea', copy: 'The lake is part of the local landscape, not an automatic supervised swimming alternative. Follow current signs and permitted uses.', icon: Waves },
      { title: 'Verify boat plans', copy: 'Check departure point, operator, equipment, insurance position and weather cancellation terms.', icon: ShieldCheck },
    ],
    seasonTitle: <>Plan the south.<br />Check the actual week.</>,
    seasonDescription: 'Broad west-coast seasons shape trip style. Current TMD forecasts, marine warnings and local flags decide the individual beach and boat day.',
    seasonRows: [
      { period: 'Dec–Feb', conditions: 'Often a stronger broad window for drier weather and calmer beach planning.', planning: 'Demand can be high. Compare live hotel terms and continue checking the water daily.', cue: 'Popular window', highlight: true },
      { period: 'Mar–Apr', conditions: 'Heat and humidity can make hills and exposed midday routes harder.', planning: 'Start early and prioritise shade, hydration and a short return to the room.', cue: 'Plan for heat' },
      { period: 'May–Oct', conditions: 'South-west monsoon patterns can bring rain, swell and stronger current risk.', planning: 'Keep land alternatives and treat red flags as a firm stop.', cue: 'Flexible coast plan', highlight: true },
      { period: 'Nov', conditions: 'A transition can mix improving periods with unsettled water and weather.', planning: 'Use the current outlook rather than treating the month as uniformly dry.', cue: 'Check the week' },
    ],
    spokes: [
      { title: 'Nai Harn hotels', copy: 'Compare stays by beach route, hillside access, room type and live terms.', href: '/phuket/nai-harn/hotels/', image: '/images/redesign/phuket-hotels-hero.webp', imageAlt: 'Phuket resort and accommodation coast', label: 'Open hotel guide' },
      { title: 'Rawai next door', copy: 'Compare a lived-in waterfront and boat-launch base with Nai Harn’s swimming-beach rhythm.', href: '/phuket/rawai/', image: '/images/redesign/phuket-destination-hero-v2.webp', imageAlt: 'Southern Phuket waterfront and green coast', label: 'Open Rawai guide' },
      { title: 'Current activities', copy: 'Compare pickup, operator, inclusions and weather terms for your dates.', href: activities, image: '/images/redesign/phuket-attractions-hero.webp', imageAlt: 'Phuket coastal activities and viewpoints', label: 'Check current options', affiliate: true },
      { title: 'Phuket attractions', copy: 'Plan island-wide sights without turning Nai Harn into a generic Phuket guide.', href: '/city/phuket/attractions/', image: '/images/redesign/phuket-stay-kamala.webp', imageAlt: 'Phuket coast and attractions', label: 'Explore attractions' },
    ],
    comparisonCards: [
      { area: 'Rawai', fit: 'Stronger for waterfront dining, local routines and boat connections; not the same swimming-beach proposition.', href: '/phuket/rawai/', image: '/images/redesign/phuket-destination-hero-v2.webp', imageAlt: 'Southern Phuket coast' },
      { area: 'Kata', fit: 'More compact visitor infrastructure, busier evenings and seasonal surf context.', href: '/phuket/kata/', image: '/images/redesign/kata-area-hero-v2.webp', imageAlt: 'Compact Kata Beach bay' },
      { area: 'Karon', fit: 'A longer and more spread-out west-coast beach base with broader resort choice.', href: '/phuket/karon/', image: '/images/redesign/karon-area-hero-v2.webp', imageAlt: 'Wide Karon Beach' },
    ],
    safetyCards: [
      { title: 'Sea conditions', copy: 'Follow flags and lifeguards; rough water and currents can make swimming unsafe.', icon: Waves },
      { title: 'Roads & viewpoints', copy: 'Pre-plan the return after sunset and only ride with correct licence, helmet and insurance.', icon: Bus },
      { title: 'Heat & hills', copy: 'Use shade, water and a realistic walking radius for children and older travellers.', icon: Umbrella },
    ],
    bookingCards: [
      { title: 'Nai Harn hotels', copy: 'Compare exact pin, beach route, recent room feedback, cancellation and total for your dates.', href: hotels, label: 'Check current hotel prices', icon: Hotel, affiliate: true },
      { title: 'South Phuket activities', copy: 'Verify departure, pickup, operator, inclusions and weather policy.', href: activities, label: 'Check current activities', icon: TicketCheck, affiliate: true },
      { title: 'Island transport', copy: 'Compare current licensed transfer and public-transport options for your actual route.', href: 'https://phuketsmartbus.com/', label: 'Open current bus information', icon: Bus },
    ],
    faqs: [
      { question: 'Is Nai Harn Beach worth visiting?', answer: 'Nai Harn is worth considering for a quieter southern beach day or slower stay. It is less suitable when nightlife, shopping or repeated trips across Phuket dominate the itinerary.' },
      { question: 'What makes Nai Harn Beach special?', answer: 'Its appeal is the combination of a green bay, quieter southern setting and outdoor routine around beach and lake. That atmosphere matters more than a long attraction checklist.' },
      { question: 'Can you swim at Nai Harn Beach?', answer: 'Only when current conditions and local flags allow. Wind, swell and currents change; stay out under a red flag and follow lifeguards.' },
      { question: 'Is Nai Harn Beach good for families?', answer: 'It can be with the right room, pool, beach route and transport plan. Family-friendly does not guarantee child-safe water, so reassess conditions daily.' },
      { question: 'Is Nai Harn quiet?', answer: 'Nai Harn generally has a slower evening rhythm than Patong and Kata, but noise varies by property, road and date. Check recent room-specific feedback.' },
      { question: 'Is Nai Harn the same as Rawai?', answer: 'No. Nai Harn is centred on a swimming-beach and green bay; Rawai is a lived-in waterfront and boat-departure area. Their edges can blur in accommodation listings.' },
      { question: 'Nai Harn or Kata: which is better?', answer: 'Nai Harn fits quieter southern days; Kata fits a more compact visitor centre and broader evening choice. Choose around daily rhythm and transport rather than a universal ranking.' },
      { question: 'Is there much to do in Nai Harn?', answer: 'The area is strongest for beach, walking, local food and selected southern viewpoints. Use verified operators for broader activities and confirm the real departure or pickup point.' },
    ],
    faqDescription: 'These are genuine questions captured from ten live English Nai Harn SERPs on 27 July 2026. The Rawai comparison returned no PAA block; none was invented.',
    related: [
      { title: 'Phuket destination guide', description: 'Build the island route before choosing the far south.', href: '/city/phuket/', image: '/images/redesign/phuket-destination-hero-v2.webp', imageAlt: 'Phuket coast' },
      { title: 'Where to stay in Phuket', description: 'Compare Nai Harn with the island’s major hotel zones.', href: '/where-to-stay/phuket/', image: '/images/redesign/phuket-hotels-hero.webp', imageAlt: 'Phuket accommodation zones' },
      { title: 'Phuket attractions', description: 'Plan island-wide sights separately from the area owner.', href: '/city/phuket/attractions/', image: '/images/redesign/phuket-attractions-hero.webp', imageAlt: 'Phuket attractions and viewpoints' },
    ],
    sources: [
      { title: 'Nai Harn Beach', creator: 'Phuket Provincial Government', url: 'https://www.phuket.go.th/eng/Beaches-Nai%20Harn%20Beach.php', note: 'Official local beach context.' },
      { title: 'Phuket destination', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Destinations/Provinces/phuket/350', note: 'Official destination and beach-flag guidance.' },
      { title: 'Phuket current and seven-day forecast', creator: 'Thai Meteorological Department', url: 'https://www.tmd.go.th/weather/province/phuket', note: 'Primary current weather source.' },
      { title: 'Thailand safety and security', creator: 'UK Foreign, Commonwealth & Development Office', url: 'https://www.gov.uk/foreign-travel-advice/thailand/safety-and-security', note: 'Current beach and road-safety guidance.' },
    ],
    methodDescription: 'Updated 27 July 2026 after owner ranking/backlink checks, 169 keyword records, 100 competitor-domain records, ten live English SERPs with 50 PAA questions and three parses including Phuket provincial government. Hotel depth stays with /phuket/nai-harn/hotels/. Legacy fixed distances, times, Blue Flag claims, activity bans, drowning counts, hotel facilities, prices and seasonal swimming guarantees were removed.',
  };
  return <PhuketAreaGuideTemplate data={data} />;
}
