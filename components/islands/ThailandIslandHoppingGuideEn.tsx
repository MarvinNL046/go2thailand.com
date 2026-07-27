import {
  Backpack, BedDouble, CalendarRange, CheckCircle2, CloudSun, Compass,
  Hotel, Luggage, MapPinned, Route, Ship, ShoppingBag, TicketCheck,
  TimerReset, Umbrella, Waves,
} from 'lucide-react';
import { TRIP_GENERIC, TWELVEGO_GENERIC, withSubId } from '../../lib/affiliates';
import { IslandHoppingPlannerTemplate, type IslandHoppingPlannerData } from './IslandHoppingPlannerTemplate';

const HERO = '/images/redesign/thailand-island-hopping-hero-v2.webp';

export function ThailandIslandHoppingGuideEn() {
  const tickets = withSubId(TWELVEGO_GENERIC, 'en-thailand-island-hopping-owner-tickets');
  const hotels = withSubId(TRIP_GENERIC, 'en-thailand-island-hopping-owner-hotels');
  const data: IslandHoppingPlannerData = {
    pageUrl: 'https://go2-thailand.com/blog/thailand-island-hopping-guide/',
    updatedAt: '2026-07-27',
    title: 'Thailand Island Hopping: Routes, Coasts & Trip Planner',
    description: 'Plan a Thailand island-hopping route by coast, pace and ferry handoffs. Compare Gulf and Andaman chains, then check current tickets and island stays.',
    heroImage: HERO,
    heroAlt: 'Two travellers with compact backpacks approaching a Thai island pier on a passenger ferry',
    breadcrumbs: [{ label: 'Thailand', href: '/' }, { label: 'Islands', href: '/islands/' }, { label: 'Island hopping planner' }],
    heroEyebrow: 'One country · two island seas',
    heroTitle: <>Thailand island hopping.<br /><span className="text-saffron-dark">Pick one sea first.</span></>,
    heroSubtitle: 'The best route is usually shorter than your first draft.',
    heroDescription: 'Choose the coast, cap the number of hotel changes and map every pier transfer before buying. This planner turns “all the islands” into a route that still leaves time to be on them.',
    ticketHref: tickets,
    navItems: [
      { href: '#decide', label: 'Quick rule', icon: Compass },
      { href: '#coasts', label: 'Two coasts', icon: Waves },
      { href: '#pace', label: 'Trip pace', icon: CalendarRange },
      { href: '#compare', label: 'Compare', icon: CheckCircle2 },
      { href: '#handoffs', label: 'Boat days', icon: Ship },
      { href: '#pack', label: 'Pack light', icon: Backpack },
      { href: '#book', label: 'Live booking', icon: TicketCheck },
    ],
    decisionTitle: <>Count travel days.<br />Not island names.</>,
    decisionDescription: 'A “short ferry” still includes checkout, hotel-to-pier transport, check-in, waiting, sailing and a new arrival transfer. Protect full island days by limiting moves.',
    decisionCards: [
      { number: '01', title: 'One week', copy: 'Choose one compact cluster and usually no more than two sleeping bases. Use day trips for variety without another luggage move.', icon: TimerReset },
      { number: '02', title: 'Ten to fourteen days', copy: 'Build one coast around two or three complementary islands. Keep a buffer near the final mainland or flight connection.', icon: Route },
      { number: '03', title: 'Three weeks or more', copy: 'A cross-coast plan becomes possible, but the overland transfer deserves its own role rather than being hidden between two ferries.', icon: MapPinned },
    ],
    regions: [
      {
        eyebrow: 'Gulf of Thailand', title: 'Samui · Phangan · Tao',
        description: 'A clear three-island chain with different strengths: Samui for the broadest arrival and stay inventory, Phangan for coves and social energy, and Tao for a compact dive-led stay.',
        gateway: 'Samui, Surat Thani or Chumphon—depending on the live chain',
        stops: [{ label: 'Koh Samui', href: '/city/koh-samui/' }, { label: 'Koh Phangan', href: '/islands/koh-phangan/' }, { label: 'Koh Tao', href: '/islands/koh-tao/' }],
        strongFor: 'A legible island sequence, diving, a mix of resort choice and smaller-island rhythm.',
        watch: 'Different mainland gateways, named piers and changing marine conditions. Do not assume every ferry calls at every island.',
        icon: Ship, tone: 'dark',
      },
      {
        eyebrow: 'Andaman Sea', title: 'Phuket · Phi Phi · Lanta',
        description: 'A limestone-and-beach route with Phuket and Krabi as major gateways. Phi Phi creates the dramatic centre; Lanta adds a slower base instead of another rapid day-trip stop.',
        gateway: 'Phuket or Krabi, with the exact pier on the ticket',
        stops: [{ label: 'Phuket', href: '/city/phuket/' }, { label: 'Koh Phi Phi', href: '/islands/koh-phi-phi/' }, { label: 'Koh Lanta', href: '/islands/koh-lanta/' }],
        strongFor: 'Limestone scenery, mixed gateways and a route that can combine one busy hub with a slower island.',
        watch: 'Some sea links are seasonal or weather-sensitive. Phuket, Krabi town, Ao Nang and their piers are not interchangeable.',
        icon: Waves, tone: 'light',
      },
    ],
    pacePlans: [
      { eyebrow: '7 nights', title: 'One compact cluster', islands: '1–2 sleeping bases', copy: 'Use one gateway and avoid changing hotels every other day. Add one boat excursion only if the conditions and recovery time suit the trip.', route: 'gateway → island base → optional second base → gateway', icon: Compass },
      { eyebrow: '10–14 nights', title: 'One coast, real contrast', islands: '2–3 sleeping bases', copy: 'Pair islands with different jobs—arrival convenience, social or activity-led stay, then a slower beach finish. Leave room for a delayed or cancelled sea leg.', route: 'gateway → active island → slower island → protected exit', icon: Route },
      { eyebrow: '21+ nights', title: 'Two clusters, one reset', islands: '3–5 sleeping bases', copy: 'If both seas matter, insert an explicit mainland or flight transfer and a reset night. Never sell yourself a fictional same-network ferry across southern Thailand.', route: 'coast A → mainland transfer → reset → coast B', icon: MapPinned },
    ],
    matrixRows: [
      { question: 'Simplest first trip?', gulf: 'Samui can provide a broad arrival and accommodation base before shorter island decisions.', andaman: 'Phuket or Krabi can anchor an island chain with extensive onward inventory.', rule: 'Choose the gateway that removes the most fragile handoff on your date.' },
      { question: 'Diving-led trip?', gulf: 'Koh Tao is the obvious research anchor; check current operators and sea conditions.', andaman: 'Several islands and marine areas can fit, but access and opening conditions vary.', rule: 'Select the dive base first; build the holiday around it, not vice versa.' },
      { question: 'Quiet finish?', gulf: 'Use a quieter Samui or Phangan zone rather than assuming the whole island has one mood.', andaman: 'Koh Lanta can provide a slower final base than a rapid hub-to-hub route.', rule: 'Choose a neighbourhood and beach zone, not only an island name.' },
      { question: 'Wet or unstable forecast?', gulf: 'Conditions can differ from the Andaman side and still change locally.', andaman: 'Open-sea and seasonal services require a live check.', rule: 'Weather chooses the boat day. Keep a land-based fallback and avoid hard same-day connections.' },
      { question: 'Both coasts?', gulf: 'Exit through the correct mainland gateway before crossing south.', andaman: 'Treat the arrival gateway as a new route start.', rule: 'Budget an overland or flight transfer plus recovery margin—there is no single ferry network between seas.' },
    ],
    handoffs: [
      { step: '01 · Before payment', title: 'Name every pier', copy: 'The island name is not enough. Record the exact departure pier, check-in location, arrival pier and transport between each hotel and terminal.', icon: MapPinned },
      { step: '02 · Ticket structure', title: 'Know what is protected', copy: 'A joint product may coordinate road and sea legs; separate tickets may leave each operator responsible only for its own segment.', icon: TicketCheck },
      { step: '03 · Boat day', title: 'Keep essentials accessible', copy: 'Documents, medicine, phone, charging and one dry layer belong in a compact bag you control—not at the bottom of transferred luggage.', icon: Luggage },
      { step: '04 · Final exit', title: 'Protect the flight or train', copy: 'Avoid an optimistic ferry-to-flight connection. Weather, boarding, baggage and road transfer all sit between the island and departure gate.', icon: CloudSun },
    ],
    gear: [
      { title: 'Waterproof drybag', copy: 'Separates phone, documents and one dry layer from spray or wet luggage during boat and pier transfers.', amazonSlug: 'earth-pak-dry-bag', icon: ShoppingBag },
      { title: 'Packable daypack', copy: 'Keeps the boat-day kit together while the main bag stays closed. Check capacity and fit before travelling.', amazonSlug: 'venture-pal-packable-backpack', icon: Backpack },
      { title: 'Quick-dry towel', copy: 'Useful when accommodation or a day boat does not provide one; choose a size you will actually carry.', amazonSlug: 'rainleaf-travel-towel', icon: Umbrella },
    ],
    bookingCards: [
      { title: 'Ferries and joint tickets', copy: 'Compare current operators, piers, transfer combinations, luggage and cancellation conditions for each date.', href: tickets, label: 'Check current tickets on 12Go', icon: Ship, affiliate: true },
      { title: 'Island accommodation', copy: 'Compare the exact beach zone, check-in, transfer options and current total before choosing a room.', href: hotels, label: 'Check current hotel prices', icon: Hotel, affiliate: true },
      { title: 'Browse every island owner', copy: 'Use the island catalogue to compare atmosphere and trip role before adding another stop.', href: '/islands/', label: 'Open the island overview', icon: BedDouble },
    ],
    faqs: [
      { question: 'What is the best island-hopping route in Thailand?', answer: 'For a first shortlist, compare the Gulf chain of Koh Samui, Koh Phangan and Koh Tao with the Andaman chain around Phuket or Krabi, Koh Phi Phi and Koh Lanta. The best route is the one that fits your dates, live sea conditions, preferred activities and acceptable number of transfers.' },
      { question: 'How do you island hop in Thailand?', answer: 'Choose one coast and gateway, then connect islands with currently operating ferries or speedboats. Map hotel-to-pier transport, check-in, luggage and arrival transfer for every leg; a combined road-and-ferry ticket may simplify some mainland connections.' },
      { question: 'How many days do you need for Thailand island hopping?', answer: 'A week is best kept to one compact cluster and one or two sleeping bases. Ten to fourteen days can support two or three complementary islands on one coast. Combining both coasts is more realistic with about three weeks and a deliberate transfer day.' },
      { question: 'How much does island hopping in Thailand cost?', answer: 'There is no stable daily figure: ferry, room and transfer totals vary by coast, date, operator, island and booking terms. Build the budget from live all-in transport, accommodation, activities and final-island transfers, then add disruption margin.' },
      { question: 'When is the best time for island hopping in Thailand?', answer: 'The Gulf and Andaman sides follow different weather patterns, and individual boat services can be seasonal. Compare the current forecast, marine notices, park access and live ferry inventory for your coast instead of applying one month range to every Thai island.' },
      { question: 'Can you island hop from Phuket?', answer: 'Yes. Phuket is a major Andaman gateway with live boat products to islands including Koh Phi Phi and connections that can form part of a wider Krabi or Koh Lanta route. Confirm the exact Phuket pier and whether each onward service operates on your date.' },
      { question: 'Is the Gulf or Andaman side better?', answer: 'Neither is universally better. The Gulf can suit a Samui–Phangan–Tao chain; the Andaman can suit a Phuket-or-Krabi–Phi Phi–Lanta chain. Weather, route purpose, gateway flights and desired island character decide the better fit.' },
      { question: 'Can I combine Gulf and Andaman islands?', answer: 'Yes, but not as one continuous ferry chain. You must return to a mainland gateway and cross southern Thailand by road, rail or air before starting the second coast. Give that transfer explicit time and buffer.' },
      { question: 'Should I book Thailand ferries in advance?', answer: 'Search once dates are firm, especially around busy periods or when a specific connection matters. There is no universal booking window. Use live inventory and recheck the operating pier, check-in and conditions shortly before travel.' },
      { question: 'Is island hopping in Thailand safe?', answer: 'No boat journey is risk-free. Use licensed operating services, follow crew instructions, wear the provided life jacket, protect medicines and documents, and do not pressure an operator to sail in unsuitable conditions. Keep travel insurance appropriate to planned water activities.' },
    ],
    related: [
      { title: 'Thailand islands overview', description: 'Compare individual islands by character before adding them to the chain.', href: '/islands/', image: '/images/islands/koh-lanta.webp', imageAlt: 'Tropical coast on Koh Lanta' },
      { title: 'Phuket or Koh Samui?', description: 'Use the two major gateways as a direct island-and-coast decision.', href: '/blog/phuket-vs-koh-samui-for-tourists/', image: '/images/redesign/phuket-koh-samui-comparison-hero-v2.webp', imageAlt: 'Thai island coast comparison' },
      { title: 'Bangkok to Koh Samui', description: 'Solve the flight, train, bus and ferry chain into the Gulf.', href: '/blog/bangkok-to-koh-samui-guide/', image: '/images/redesign/bangkok-koh-samui-route-hero-v2.webp', imageAlt: 'Passenger ferry approaching Koh Samui' },
    ],
    sources: [
      { title: 'Beaches and island activities', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Activities/Beaches', note: 'Primary destination and activity context.' },
      { title: 'National park information', creator: 'Department of National Parks, Wildlife and Plant Conservation', url: 'https://portal.dnp.go.th/', note: 'Primary park and access context; verify the specific park before travel.' },
      { title: 'Marine and coastal information', creator: 'Department of Marine and Coastal Resources', url: 'https://www.dmcr.go.th/', note: 'Primary marine and coastal authority context.' },
      { title: 'Live Thailand transport inventory', creator: '12Go', url: 'https://12go.asia/en', note: 'Commercial inventory used only for live route comparison; operator terms remain authoritative.' },
    ],
    methodDescription: 'Updated 27 July 2026 after ranking and backlink checks for the blog owner, seven-day itinerary and islands hub; 169 DFS keyword records, 100 competitor-domain records and ten live UK-English SERPs with 84 organic results and 34 genuine PAA questions. The old article’s island count, fixed fares, daily budgets, universal month ranges, fixed durations, advance-booking window and guaranteed route language were removed. `/islands/` retains catalogue intent and its 20 ranking keywords; this URL owns strategic route-planning intent; the seven-day itinerary remains one concrete schedule.',
  };
  return <IslandHoppingPlannerTemplate data={data} />;
}
