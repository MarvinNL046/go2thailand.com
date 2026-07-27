import {
  BedDouble, CalendarRange, CheckCircle2, CloudSun, Compass, Footprints,
  Hotel, Luggage, MapPinned, Palmtree, Plane, Route, Ship, Sparkles,
  TicketCheck, Waves,
} from 'lucide-react';
import { KLOOK_GENERIC, TRIP_GENERIC, TWELVEGO_GENERIC, withSubId } from '../../lib/affiliates';
import { EditorialItineraryTemplate, type EditorialItineraryData } from './EditorialItineraryTemplate';

const HERO = '/images/redesign/seven-day-phuket-phi-phi-krabi-hero-v2.webp';

export function SevenDayIslandHoppingItineraryEn() {
  const tickets = withSubId(TWELVEGO_GENERIC, 'en-seven-day-island-itinerary-tickets');
  const hotels = withSubId(TRIP_GENERIC, 'en-seven-day-island-itinerary-hotels');
  const activities = withSubId(KLOOK_GENERIC, 'en-seven-day-island-itinerary-activities');
  const data: EditorialItineraryData = {
    pageUrl: 'https://go2-thailand.com/itineraries/7-days-island-hopping/',
    updatedAt: '2026-07-27',
    title: '7-Day Phuket, Phi Phi & Krabi Island-Hopping Itinerary',
    description: 'Follow a realistic seven-day Phuket, Koh Phi Phi and Krabi route with three bases, two hotel moves, a flexible sea day and current ticket checks.',
    heroImage: HERO,
    heroAlt: 'Traveller with compact luggage looking toward Andaman limestone islands from a passenger ferry',
    breadcrumbs: [{ label: 'Thailand', href: '/' }, { label: 'Itineraries', href: '/itineraries/' }, { label: '7-day island hopping' }],
    heroEyebrow: '7 days · Phuket → Phi Phi → Krabi',
    heroTitle: <>Seven days.<br /><span className="text-saffron-dark">Three bases. Two moves.</span></>,
    heroSubtitle: 'An island-hopping week that still contains island days.',
    heroDescription: 'Use Phuket as the arrival base, give Koh Phi Phi an overnight stay instead of a rushed day trip, then finish around Ao Nang or Krabi with one weather-flexible day and protected departure margin.',
    ticketHref: tickets,
    navItems: [
      { href: '#route', label: 'Route', icon: Route },
      { href: '#days', label: 'Seven days', icon: CalendarRange },
      { href: '#flex', label: 'Flex day', icon: CloudSun },
      { href: '#handoffs', label: 'Transfers', icon: Ship },
      { href: '#prepare', label: 'Prepare', icon: CheckCircle2 },
      { href: '#book', label: 'Live booking', icon: TicketCheck },
    ],
    bases: [
      { order: '01', title: 'Phuket', nights: 'Arrival base · days 1–2', role: 'Absorb the flight, choose one Phuket zone and use the second day for either town-and-food or one intentional coast activity.', href: '/city/phuket/', icon: Plane },
      { order: '02', title: 'Koh Phi Phi', nights: 'Island base · days 3–4', role: 'Move once, stay overnight and see the island outside the compressed rhythm of a Phuket day tour.', href: '/islands/koh-phi-phi/', icon: Waves },
      { order: '03', title: 'Krabi / Ao Nang', nights: 'Exit base · days 5–7', role: 'Finish with Railay access, one sea-or-land flex day and a cleaner connection to the final airport or onward route.', href: '/city/krabi/', icon: MapPinned },
    ],
    days: [
      { day: '1', base: 'Phuket', title: 'Land and lower the tempo', theme: 'Arrival day', morning: 'Arrive on the schedule you actually have; do not pre-fill a delayed flight day.', main: 'Transfer to one chosen Phuket base, check in and solve essentials near the hotel.', evening: 'A local meal and early night close the day better than a cross-island attraction sprint.', decision: 'Choose Kata/Karon for beach rhythm, Old Town for streets and food, or another zone only after checking the transfer reality.', icon: Plane },
      { day: '2', base: 'Phuket', title: 'Give Phuket one clear job', theme: 'Land-led or coast-led', morning: 'Start in the chosen zone without a second hotel move.', main: 'Pick one theme: Old Town and food, a beach-and-viewpoint day, or one current organised experience.', evening: 'Prepare the Phi Phi bag and confirm tomorrow’s exact pier and pickup.', decision: 'Do not stack a full Phi Phi day trip here; the route gives Phi Phi two actual days next.', icon: Compass },
      { day: '3', base: 'Phuket → Koh Phi Phi', title: 'Make the first island move', theme: 'Transfer day', morning: 'Leave hotel margin for the correct Phuket pier or collection point.', main: 'Take the currently operating ferry or speedboat product and check in to the selected Phi Phi zone.', evening: 'Use the late day for orientation, a viewpoint only if conditions and energy suit, and an easy dinner.', decision: 'Read whether the ticket includes hotel pickup, which pier it uses and the luggage conditions.', icon: Ship, tone: 'dark' },
      { day: '4', base: 'Koh Phi Phi', title: 'Keep one full island day', theme: 'No checkout', morning: 'Use the calmer part of the day for a current local boat plan, walk or beach choice.', main: 'Select one marine or island circuit after checking park status, sea conditions and inclusions.', evening: 'Return with enough time to eat, repack and verify the next Krabi-side transfer.', decision: 'A full day is valuable because the island is more than one bay and one photograph.', icon: Palmtree },
      { day: '5', base: 'Koh Phi Phi → Krabi', title: 'Move once, then stop moving', theme: 'Second transfer', morning: 'Check out and reach the named Phi Phi departure point with margin.', main: 'Travel to the exact Krabi-side pier, then transfer to Ao Nang, Krabi Town or another deliberately selected base.', evening: 'Use sunset or dinner nearby; avoid booking another boat immediately after the crossing.', decision: 'Ao Nang is the practical Railay/boat base; Krabi Town offers a different food-and-town role. Choose before booking the room.', icon: Luggage, tone: 'dark' },
      { day: '6', base: 'Krabi', title: 'Let conditions choose the day', theme: 'Protected flex day', morning: 'Read the current forecast, marine conditions and your own energy before committing.', main: 'Use the sea version for a suitable boat or Railay plan; use the land version for town, food, hot-spring-area or other currently accessible inland choices.', evening: 'Return to the same hotel and organise the final departure.', decision: 'The route remains successful when a rough-sea day becomes a good land day.', icon: CloudSun },
      { day: '7', base: 'Krabi', title: 'Exit without gambling the trip', theme: 'Departure day', morning: 'Keep the plan proportional to the actual flight, bus or onward connection.', main: 'Use luggage storage and a nearby meal or walk only when the transfer margin is protected.', evening: 'Continue from Krabi Airport, bus terminal or the route printed on the next live ticket.', decision: 'Do not place a weather-sensitive island return in front of an important same-day departure.', icon: TicketCheck },
    ],
    flexCards: [
      { eyebrow: 'Sea version', title: 'One current marine plan', copy: 'Choose Railay, an island circuit or another operating product only after checking the exact pier, operator, park status, inclusions and sea conditions.', rule: 'One boat objective—not a checklist of every Krabi island.', icon: Waves },
      { eyebrow: 'Land version', title: 'Krabi beyond the boats', copy: 'Use Krabi Town, a food route, a suitable nature site or a slower beach-zone day when the sea is poor or the group needs recovery.', rule: 'A fallback is part of the itinerary, not evidence that the week failed.', icon: Footprints },
      { eyebrow: 'Recovery version', title: 'Protect the final day', copy: 'Laundry, a long lunch, massage or an easy local walk can be the right choice after two transfers and several active days.', rule: 'Energy is a route constraint just like weather and ferry inventory.', icon: Sparkles, tone: 'dark' },
    ],
    handoffs: [
      { label: 'Phuket → Phi Phi', title: 'Right Phuket pier', copy: 'Match hotel pickup, pier, check-in and operator. “Phuket” is not one terminal and a separate transfer may be unprotected.', icon: MapPinned },
      { label: 'Phi Phi arrival', title: 'Walk or longtail reality', copy: 'Koh Phi Phi has no normal car transfer network. Confirm how luggage reaches the chosen accommodation and whether the property arranges collection.', icon: Luggage },
      { label: 'Phi Phi → Krabi', title: 'Right Krabi-side arrival', copy: 'The arrival pier and hotel zone determine the final road or boat transfer. Ao Nang, Railay and Krabi Town are different endings.', icon: Ship },
    ],
    practicalCards: [
      { title: 'Choose the route first', copy: 'The strategic island-hopping owner compares Gulf and Andaman chains, pace and cross-coast trade-offs.', href: '/blog/thailand-island-hopping-guide/', label: 'Open the route planner', icon: Route },
      { title: 'Check Krabi weather', copy: 'Use the dedicated owner to compare current conditions and understand what a flexible day needs.', href: '/weather/krabi/', label: 'Open Krabi weather', icon: CloudSun },
      { title: 'Pack for ferry handoffs', copy: 'Use the central packing owner for luggage, drybag and clothing decisions rather than repeating a random shopping list here.', href: '/travel-gear/', label: 'Open Thailand travel gear', icon: BedDouble },
    ],
    bookingCards: [
      { title: 'Two inter-base transfers', copy: 'Compare current Phuket–Phi Phi and Phi Phi–Krabi products, piers, luggage and cancellation conditions.', href: tickets, label: 'Check current tickets on 12Go', icon: Ship, affiliate: true },
      { title: 'Three accommodation bases', copy: 'Compare the exact zone, transfer, check-in and current total in Phuket, Phi Phi and Krabi.', href: hotels, label: 'Check current hotel prices', icon: Hotel, affiliate: true },
      { title: 'Optional activities', copy: 'Only after transfers and rooms are stable, compare current tours for the one or two days that genuinely need them.', href: activities, label: 'Check current activities on Klook', icon: Sparkles, affiliate: true },
    ],
    faqs: [
      { question: 'Can you do Phuket and Krabi in seven days?', answer: 'Yes, when the route is disciplined. This version uses Phuket, Koh Phi Phi and the Krabi side as three bases with two hotel moves. It avoids adding another coast or distant island chain to the same week.' },
      { question: 'How many days should I spend in Phuket and Krabi?', answer: 'Within one week, two days in Phuket, two around Koh Phi Phi and the remaining days on the Krabi side create a workable shape. Adjust for flight times, weather and whether Phi Phi is an overnight base or a day trip.' },
      { question: 'Should I visit Phuket or Krabi first?', answer: 'Start where the international or domestic arrival creates the cleaner chain. Phuket-first works well when flying into Phuket and continuing via Phi Phi to Krabi; reverse the route when the live transport and outbound flight favour Krabi first.' },
      { question: 'Can I include Koh Phi Phi between Phuket and Krabi?', answer: 'Yes. Koh Phi Phi sits naturally between the two gateways when current ferry services align. An overnight stay reduces day-trip compression, but requires checking both ferry legs, luggage and accommodation access.' },
      { question: 'Is seven days enough for Thailand island hopping?', answer: 'Seven days is enough for one compact coast cluster, not for every famous Thai island. Limit the route to two or three bases and protect full days from repeated checkout and pier transfers.' },
      { question: 'How do I travel from Phuket to Phi Phi and Krabi?', answer: 'Use currently operating ferry or speedboat products from the exact Phuket pier to Phi Phi, then from Phi Phi to the relevant Krabi-side pier. Compare joint pickup options and separate hotel transfers before paying.' },
      { question: 'Do I need to book every boat tour before the trip?', answer: 'No. Secure route-critical transfers first. Keep the optional day-six marine plan flexible until current weather, operator, park status and cancellation terms are clear.' },
      { question: 'Where should I stay in Krabi for this itinerary?', answer: 'Ao Nang is the practical first look for Railay and boat access; Krabi Town suits a more local food-and-town finish; Railay is a boat-access stay with different luggage logistics. Choose the zone before comparing hotels.' },
      { question: 'How much does a seven-day Phuket and Krabi trip cost?', answer: 'There is no durable fixed total. Price the live flights, two inter-base transfers, three accommodation bases, selected activities, meals and final airport transfers, then add disruption margin. Compare all-in totals and cancellation conditions.' },
      { question: 'What if the sea is rough during the itinerary?', answer: 'Use day six as a land or recovery day and follow operator or authority decisions. Do not pressure a provider to sail, and do not protect a non-refundable optional tour at the expense of an important departure.' },
    ],
    related: [
      { title: 'Thailand island-hopping planner', description: 'Compare Gulf and Andaman route shapes before committing to this western coast week.', href: '/blog/thailand-island-hopping-guide/', image: '/images/redesign/thailand-island-hopping-hero-v2.webp', imageAlt: 'Travellers approaching a Thai island pier by ferry' },
      { title: 'Phuket destination guide', description: 'Choose the right arrival zone and give the first two days one clear job.', href: '/city/phuket/', image: '/images/redesign/phuket-destination-hero-v2.webp', imageAlt: 'Phuket coast and longtail boat' },
      { title: 'Krabi destination guide', description: 'Choose Ao Nang, Railay or town as the final base by route role.', href: '/city/krabi/', image: '/images/redesign/krabi-destination-hero.webp', imageAlt: 'Krabi limestone coast' },
    ],
    sources: [
      { title: 'Beaches and island activities', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Activities/Beaches', note: 'Primary destination and activity context.' },
      { title: 'National park information', creator: 'Department of National Parks, Wildlife and Plant Conservation', url: 'https://portal.dnp.go.th/', note: 'Primary access and park-status context; check the specific site.' },
      { title: 'Live Thailand transport inventory', creator: '12Go', url: 'https://12go.asia/en', note: 'Commercial live inventory for route comparison; each operator’s terms remain authoritative.' },
    ],
    methodDescription: 'Updated 27 July 2026 after separate ranking and backlink checks, 47 relevant DFS keyword records, 50 competitor-domain records and ten live UK-English SERPs with 81 organic results and 46 genuine PAA questions. The 35-record broader itinerary cluster is used only where it supports this seven-day owner. The legacy page’s fixed trip budgets, hotel prices, meal prices, taxi fares, tour prices, transfer durations, restaurant prescriptions, weather guarantee and autogenerated budget FAQ were removed from rendered and serialized owner data.',
  };
  return <EditorialItineraryTemplate data={data} />;
}
