import {
  BedDouble, CalendarDays, CheckCircle2, Clock3, Compass, Footprints,
  Hotel, Luggage, MapPinned, Plane, Route, Ship, Sparkles, TicketCheck,
  TrainFront, UsersRound, Waves,
} from 'lucide-react';
import { KLOOK_GENERIC, TRIP_GENERIC, TWELVEGO_GENERIC, withSubId } from '../../lib/affiliates';
import { TripLengthPlannerTemplate, type TripLengthPlannerData } from './TripLengthPlannerTemplate';

const HERO = '/images/redesign/how-long-thailand-trip-planner-hero-v2.webp';

export function HowLongThailandGuideEn() {
  const transport = withSubId(TWELVEGO_GENERIC, 'en-how-long-thailand-owner-transport');
  const hotels = withSubId(TRIP_GENERIC, 'en-how-long-thailand-owner-hotels');
  const activities = withSubId(KLOOK_GENERIC, 'en-how-long-thailand-owner-activities');

  const data: TripLengthPlannerData = {
    pageUrl: 'https://go2-thailand.com/blog/how-long-spend-thailand/',
    updatedAt: '2026-07-27',
    title: 'How Many Days in Thailand? Choose Your Ideal Trip Length',
    description: 'Choose how many days to spend in Thailand by nights, hotel moves and travel style. Compare 5, 7, 10, 14 and 21-day route shapes without rushing.',
    heroImage: HERO,
    heroAlt: 'Traveller planning a Thailand route beside a river ferry at sunrise',
    breadcrumbs: [{ label: 'Thailand', href: '/' }, { label: 'Travel planning', href: '/travel-guides/' }, { label: 'How many days?' }],
    heroEyebrow: 'Trip length planner · first visit',
    heroTitle: <>How many days<br />in Thailand?</>,
    heroSubtitle: 'Count hotel moves before destinations.',
    heroDescription: 'Ten to fourteen days suits many first trips. Seven days can be excellent too—when you choose Bangkok plus one region instead of racing north and south.',
    transportHref: transport,
    navItems: [
      { href: '#answer', label: 'Quick answer', icon: CheckCircle2 },
      { href: '#lengths', label: '5–21 days', icon: CalendarDays },
      { href: '#routes', label: 'Route shapes', icon: Route },
      { href: '#moves', label: 'Move cost', icon: Clock3 },
      { href: '#style', label: 'Travel style', icon: UsersRound },
      { href: '#book', label: 'Live prices', icon: TicketCheck },
      { href: '#questions', label: 'Questions', icon: Compass },
    ],
    lengthOptions: [
      { nights: '4–5 nights', label: 'One strong base', bases: '1', moves: '0–1', verdict: 'Focused', copy: 'Stay in Bangkok or one beach gateway and use a day trip for contrast. Do not add both the north and south.', bestFor: 'a short regional break or stopover', href: '/city/bangkok/', icon: MapPinned },
      { nights: '7 nights', label: 'One clear branch', bases: '1–2', moves: '1', verdict: 'Works well', copy: 'Pair Bangkok with either Chiang Mai or one southern base. A third region usually turns the week into transit.', bestFor: 'city + culture or city + beach', href: '/blog/thailand-7-days-itineraries/', icon: Plane },
      { nights: '10 nights', label: 'The compact classic', bases: '2–3', moves: '2', verdict: 'Sweet spot', copy: 'Combine Bangkok, one northern base and one southern base if connections are clean. Protect the final departure.', bestFor: 'first-timers wanting north and south', href: '/blog/thailand-10-day-itinerary/', icon: Sparkles, featured: true },
      { nights: '14 nights', label: 'Room to breathe', bases: '3–4', moves: '2–3', verdict: 'Best balance', copy: 'Keep the classic three-region shape, then add rest, a slower island or a deliberate overland experience.', bestFor: 'variety without daily packing', href: '/blog/thailand-itinerary-2-weeks/', icon: BedDouble },
      { nights: '21+ nights', label: 'Travel deeper', bases: '4–6', moves: '3–5', verdict: 'Slow travel', copy: 'Add Isaan, the far north or a second coastal cluster. Longer does not require changing hotels more often.', bestFor: 'regional depth and slower transport', href: '/blog/ultimate-thailand-itinerary-2026/', icon: TrainFront },
    ],
    routeShapes: [
      { eyebrow: 'Seven nights', title: 'Bangkok + one region', route: ['Bangkok', 'North or coast'], copy: 'Choose culture and food around Chiang Mai, or choose one southern gateway for beach time. Keep the branch singular.', keep: 'At least one unstructured half-day.', cut: 'The third flight or overnight base.', href: '/blog/thailand-7-days-itineraries/', icon: Compass },
      { eyebrow: 'Ten nights', title: 'The first-trip triangle', route: ['Bangkok', 'Chiang Mai', 'One coast'], copy: 'This is the shortest trip length where the classic north-and-south triangle can feel coherent—provided arrival and onward connections fit.', keep: 'A protected final night near departure.', cut: 'A second island hotel move.', href: '/blog/thailand-10-day-itinerary/', icon: Route },
      { eyebrow: 'Fourteen nights', title: 'Classic route + pause', route: ['Bangkok', 'North', 'Coast', 'Buffer'], copy: 'Use the extra nights to deepen a region or recover, not automatically to add another province and another checkout.', keep: 'A slow base, rest day or weather buffer.', cut: 'Any stop included only for one photo.', href: '/blog/thailand-itinerary-2-weeks/', icon: Waves },
    ],
    moveCosts: [
      { number: '01', title: 'Pack and check out', copy: 'Breakfast, luggage and checkout narrow the useful morning before the vehicle even arrives.', icon: Luggage },
      { number: '02', title: 'Reach the terminal', copy: 'Bangkok airports, rail stations and island piers can sit far from the neighbourhood where you slept.', icon: MapPinned },
      { number: '03', title: 'Wait and board', copy: 'Check-in, security, boarding and contingency belong in the route—even when the advertised ride is short.', icon: Clock3 },
      { number: '04', title: 'Travel', copy: 'Flight, rail, road and ferry durations vary by service. Compare the complete live itinerary rather than one headline segment.', icon: Ship },
      { number: '05', title: 'Transfer and check in', copy: 'The arrival station or pier is rarely the hotel door. Late check-in can consume the best part of the destination day.', icon: Hotel },
      { number: '06', title: 'Recover', copy: 'Heat, jet lag, sea motion and early starts can make an ambitious evening plan unrealistic. Leave usable energy in the schedule.', icon: Footprints },
    ],
    travelStyles: [
      { title: 'First visit', nights: '10–14 nights', copy: 'Use Bangkok, one northern or cultural base and one coast as the core. Choose a fourth base only when it adds a different experience.', rule: 'three distinct jobs, not four similar stops', icon: Compass },
      { title: 'Families', nights: '10–14+ nights', copy: 'Reduce early departures and one-night stays. A pool, playground or quiet afternoon can be part of the itinerary rather than lost time.', rule: 'add recovery before adding distance', icon: UsersRound },
      { title: 'Beach-first', nights: '7–14 nights', copy: 'Choose one coast and one gateway. Use day boats selectively; moving hotels between nearby islands still creates luggage and pier work.', rule: 'one coast per short trip', icon: Waves },
      { title: 'Slow travel', nights: '21+ nights', copy: 'Stay longer in neighbourhoods and include rail or road when the journey itself matters. Depth comes from fewer repeated check-ins.', rule: 'measure nights per base, not province count', icon: TrainFront },
    ],
    bookingCards: [
      { title: 'Intercity transport', copy: 'Compare current flight alternatives, trains, buses, ferries, joint tickets, baggage and complete door-to-door logic.', href: transport, label: 'Check current transport on 12Go', icon: TrainFront, affiliate: true },
      { title: 'Accommodation by base', copy: 'Search the exact neighbourhood or beach zone, then compare the current total, cancellation terms and transfer location.', href: hotels, label: 'Check current hotel prices', icon: Hotel, affiliate: true },
      { title: 'Activities after the route', copy: 'Add tours only after travel days and rest space are visible. Check the meeting point, duration and current cancellation terms.', href: activities, label: 'Check current activities on Klook', icon: TicketCheck, affiliate: true },
    ],
    faqs: [
      { question: 'How many days for Thailand is enough?', answer: 'Seven days is enough for Bangkok plus one region. Ten days can fit Bangkok, one northern base and one southern base if the connections are clean. Fourteen days gives most first-time visitors a better balance of variety, rest and disruption margin.' },
      { question: 'Is seven days long enough in Thailand?', answer: 'Yes, if the route stays focused. Choose Bangkok plus Chiang Mai, or Bangkok plus one southern base. Trying to include Bangkok, the north and multiple islands in one week usually creates more transit than destination time.' },
      { question: 'Is ten days enough in Thailand?', answer: 'Ten days is enough for a compact first-trip triangle: Bangkok, Chiang Mai or another northern base, and one coast. Keep the southern stay to one hotel base and protect the final connection rather than adding another island checkout.' },
      { question: 'Is two weeks in Thailand too long?', answer: 'No. Two weeks lets you use the same broad route as a ten-day trip with slower mornings, a rest day, a deeper regional stay or a weather buffer. It becomes rushed only when every spare night is converted into another destination.' },
      { question: 'What is the minimum time worth going to Thailand?', answer: 'For a long-haul first visit, a focused week is a practical lower bound for many travellers, but even four or five nights can work as a Bangkok stopover or single-base break. Judge the trip after subtracting arrival, departure and recovery time.' },
      { question: 'How long should you spend in each place in Thailand?', answer: 'Give major bases enough nights to produce at least two genuinely usable days. Bangkok and Chiang Mai often justify several nights; an island or beach zone needs extra margin when a ferry, weather or onward flight is involved. The role of the base matters more than a universal number.' },
      { question: 'How many days should I split between Bangkok and Chiang Mai?', answer: 'Within a one-week city-and-culture trip, a roughly balanced split can work after accounting for the transfer. With ten days or more, add time according to interests: Bangkok for neighbourhoods, food and day trips; Chiang Mai for temples, markets, cooking, nature and a slower rhythm.' },
      { question: 'What is the best month to visit Thailand?', answer: 'There is no single best month for every Thai region or island coast. Weather patterns differ between the north, Andaman side and Gulf. Use the dedicated month-by-month weather guide and check current local forecasts before fixing transport.' },
      { question: 'How much money do I need per day in Thailand?', answer: 'A reliable figure depends on date, destination, room standard, transport, activities and exchange rate. Build the total from live accommodation and transport first, then add food, activities, local travel, insurance and a contingency rather than relying on one permanent daily number.' },
      { question: 'Does trip length determine how long I may stay visa-free?', answer: 'No. An ideal itinerary and legal permission to stay are separate questions. Entry conditions depend on nationality, travel document, purpose and current Thai rules. Check the visa owner and official Thai sources before travel.' },
    ],
    related: [
      { title: 'Seven-day Thailand routes', description: 'Choose one focused branch and see concrete week-long route options.', href: '/blog/thailand-7-days-itineraries/', image: '/images/redesign/seven-day-phuket-phi-phi-krabi-hero-v2.webp', imageAlt: 'Traveller on a Thailand island ferry' },
      { title: 'Ten-day Thailand itinerary', description: 'Turn the compact classic into a practical day-by-day first trip.', href: '/blog/thailand-10-day-itinerary/', image: '/images/blog/thailand-10-day-itinerary.webp', imageAlt: 'Thailand temple and landscape' },
      { title: 'Two-week Thailand itinerary', description: 'Add breathing room to Bangkok, the north and one southern coast.', href: '/blog/thailand-itinerary-2-weeks/', image: '/images/blog/thailand-itinerary-2-weeks.webp', imageAlt: 'Thailand coast on a two-week route' },
    ],
    sources: [
      { title: 'Official destination information', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/', note: 'Primary destination context; live opening and operating details still require checking.' },
      { title: 'Weather information and warnings', creator: 'Thai Meteorological Department', url: 'https://www.tmd.go.th/en/', note: 'Primary national weather context; local forecasts are checked close to travel.' },
      { title: 'Thailand travel advice', creator: 'UK Foreign, Commonwealth & Development Office', url: 'https://www.gov.uk/foreign-travel-advice/thailand', note: 'Current entry, safety and health-adjacent travel advice for UK readers.' },
      { title: 'Immigration information', creator: 'Thailand Immigration Bureau', url: 'https://www.immigration.go.th/', note: 'Primary immigration authority; nationality-specific entry entitlement is not inferred from trip length.' },
    ],
    methodDescription: 'Updated 27 July 2026 after a separate ranking and backlink check, four DataForSEO keyword clusters with 37 relevant records and 50 competitor-domain records, ten live UK-English SERPs, genuine People Also Ask questions and three full competitor parses. GA4 had identified this owner as a low-engagement route. The rebuild removes broken encoding, fixed daily budgets, fixed domestic fares, outdated visa shortcuts and the unsupported claim that one duration is universally ideal. This URL owns trip-length choice; the seven-, ten- and fourteen-day pages retain their concrete schedules. Amazon products were assessed but not forced because no physical item helps the reader decide trip duration.'
  };

  return <TripLengthPlannerTemplate data={data} />;
}
