import {
  BedDouble, Bus, CheckCircle2, Clock3, Hotel, Luggage,
  MapPinned, Plane, Route, ShieldCheck, Ship, TicketCheck, TrainFront,
} from 'lucide-react';
import { cityAffiliates, TRIP_GENERIC, TWELVEGO_GENERIC, withSubId } from '../../lib/affiliates';
import { TransportJourneyTemplate, type TransportJourneyData } from './TransportJourneyTemplate';

const HERO = '/images/redesign/bangkok-koh-samui-route-hero-v2.webp';

export function BangkokKohSamuiJourneyEn() {
  const transport = withSubId(cityAffiliates['koh-samui']?.twelveGo || TWELVEGO_GENERIC, 'en-bangkok-samui-owner-transport');
  const hotels = withSubId(cityAffiliates['koh-samui']?.trip || TRIP_GENERIC, 'en-bangkok-samui-owner-hotels');
  const data: TransportJourneyData = {
    pageUrl: 'https://go2-thailand.com/blog/bangkok-to-koh-samui-guide/', updatedAt: '2026-07-27',
    title: 'Bangkok to Koh Samui: Flight, Train or Bus + Ferry?',
    description: 'Compare Bangkok to Koh Samui by direct flight, mainland flight, sleeper train or bus plus ferry. Choose by total journey, connections, luggage and live tickets.',
    heroImage: HERO, heroAlt: 'Traveller with luggage approaching Koh Samui on a working passenger ferry',
    breadcrumbs: [{ label: 'Thailand', href: '/' }, { label: 'Transport', href: '/transport/' }, { label: 'Bangkok to Koh Samui' }],
    heroEyebrow: 'Bangkok → Gulf of Thailand',
    heroTitle: <>Bangkok to Koh Samui.<br /><span className="text-saffron-dark">Choose the whole chain.</span></>,
    heroSubtitle: 'The quickest vehicle is not always the quickest door-to-door day.',
    heroDescription: 'A direct flight removes the mainland ferry connection. Every other route combines at least two transport stages. Compare the handoffs, luggage and arrival—not just the first ticket or headline fare.',
    heroPrimary: { label: 'Compare four routes', href: '#options' }, heroAffiliate: { label: 'Check current tickets', href: transport },
    navItems: [
      { href: '#decide', label: 'Quick choice', icon: Route }, { href: '#options', label: 'Four routes', icon: Ship },
      { href: '#compare', label: 'Compare', icon: CheckCircle2 }, { href: '#connections', label: 'Connections', icon: MapPinned },
      { href: '#resilience', label: 'Protect the trip', icon: ShieldCheck }, { href: '#book', label: 'Live tickets', icon: TicketCheck },
    ],
    verdictTitle: <>One island arrival.<br />Four very different travel days.</>,
    verdictDescription: 'Start with the number of handoffs you accept. Then compare the real departure airport or station, the mainland transfer, the ferry pier and your final hotel transfer on Samui.',
    quickCards: [
      { eyebrow: 'Fewest handoffs', title: 'Direct flight', copy: 'Strong when protecting holiday time, travelling with children or connecting from an international arrival matters more than chasing the lowest-looking fare.', icon: Plane },
      { eyebrow: 'Hybrid route', title: 'Mainland flight + ferry', copy: 'Can widen flight choice, but adds airport-to-pier transfer, ferry timing and another luggage handoff.', icon: Ship },
      { eyebrow: 'Overnight experience', title: 'Train + transfer + ferry', copy: 'Fits travellers who value the sleeper journey and can manage a multi-stage arrival without a fragile same-day commitment.', icon: TrainFront },
      { eyebrow: 'Budget-first shortlist', title: 'Bus + ferry', copy: 'Joint tickets can simplify the chain, but seat comfort, pickup point, operator and total journey need a live check.', icon: Bus, tone: 'dark' },
    ],
    editorialRule: 'compare current total prices and operator terms; never publish one fixed fare, duration or “cheapest” winner as if it applies to every date.',
    optionsTitle: <>Compare the chain.<br />Not one vehicle.</>,
    optionsDescription: 'Koh Samui is an island. Except for a direct arrival at Samui Airport, the route ends with a sea crossing. A combined ticket can reduce coordination, but you still need to understand who operates each stage.',
    options: [
      { title: 'Direct flight to Samui', eyebrow: 'Minimum chain', chain: 'Bangkok airport → Samui Airport → hotel', bestFor: 'Short trips, families, limited mobility or a valuable first island day.', tradeoff: 'The live fare can be higher and airport choice matters when connecting in Bangkok.', check: 'Airport code, baggage through-check, connection protection, arrival time and Samui hotel transfer.', icon: Plane },
      { title: 'Fly to Surat Thani + ferry', eyebrow: 'Air + land + sea', chain: 'Bangkok airport → Surat Thani Airport → pier → Samui', bestFor: 'Travellers willing to trade extra handoffs for a wider live fare comparison.', tradeoff: 'Separate tickets can leave the onward leg unprotected when a flight changes.', check: 'BKK versus DMK, included transfer, named pier, ferry operator, buffer and final Samui arrival point.', icon: Ship },
      { title: 'Sleeper train + ferry', eyebrow: 'Rail + land + sea', chain: 'Bangkok station → Surat Thani station → pier → Samui', bestFor: 'A deliberate overnight journey where the train is part of the experience.', tradeoff: 'No train reaches Koh Samui; station-to-pier and ferry remain essential stages.', check: 'Krung Thep Aphiwat departure, berth type, official train status, transfer pickup and ferry connection.', icon: TrainFront },
      { title: 'Bus + ferry', eyebrow: 'Road + sea', chain: 'Bangkok pickup → mainland pier → Samui', bestFor: 'Budget-led travellers comfortable with a long seated journey and a live joint-ticket comparison.', tradeoff: 'Pickup points, bus class, transfer responsibility and ferry arrival vary by operator.', check: 'Exact boarding point, operator of both stages, luggage, rest stops, pier and cancellation policy.', icon: Bus },
    ],
    matrixTitle: <>Match the route<br />to the traveller.</>,
    matrixDescription: 'The useful answer changes with trip length, children, luggage, sleep preference and what happens after arrival.',
    matrixRows: [
      { situation: 'Three- or four-night island stay', firstLook: 'Direct flight', why: 'Protecting an island day can outweigh a lower headline fare.', risk: 'Check the complete Bangkok connection and the transfer from Samui Airport.', highlight: true },
      { situation: 'Budget with flexible time', firstLook: 'Joint bus + ferry', why: 'One sold chain can be easier to coordinate than separate road and ferry tickets.', risk: 'Read the real seat, pickup, operator, luggage and disruption terms.' },
      { situation: 'Sleeper-train experience', firstLook: 'Train + ferry', why: 'The overnight rail leg becomes part of the trip rather than lost daytime.', risk: 'Do not mistake Surat Thani station for the pier or assume an unprotected connection.' },
      { situation: 'Family or heavy luggage', firstLook: 'Direct flight first', why: 'Fewer transfers usually reduce lifting, waiting and coordination.', risk: 'Compare total family baggage and hotel-transfer terms, not ticket price alone.', highlight: true },
      { situation: 'International arrival in Bangkok', firstLook: 'Protected connection', why: 'A single through itinerary may handle disruption better than self-transfer tickets.', risk: 'Airport changes, immigration, baggage collection and minimum connection rules.' },
    ],
    connectionTitle: <>Four handoffs<br />worth protecting.</>,
    connectionDescription: 'The journey fails at the joins. Map each one before buying, especially when flights, rail, road transfer and ferry are sold separately.',
    connectionSteps: [
      { label: 'Bangkok', title: 'Right airport or station', copy: 'Confirm BKK, DMK or Krung Thep Aphiwat and the real transfer from your hotel or inbound flight.', icon: MapPinned },
      { label: 'Mainland', title: 'Station or airport to pier', copy: 'Surat Thani Airport, station, town and Donsak-area piers are different places. Check who carries you between them.', icon: Bus },
      { label: 'Sea', title: 'Named ferry and pier', copy: 'Verify operator, check-in point, luggage, weather policy and the actual Samui arrival pier.', icon: Ship },
      { label: 'Island', title: 'Pier or airport to hotel', copy: 'Your final transfer depends on the arrival point and hotel zone. Arrange it before a late or tired arrival.', icon: Hotel },
    ],
    resilienceTitle: <>A cheaper chain is expensive<br />when one link breaks.</>,
    resilienceDescription: 'Self-transfer routes can still work well, but only when the buffer, ticket responsibility and fallback are explicit.',
    resilienceCards: [
      { title: 'Leave real buffer', copy: 'Do not use a universal minimum. Add time for the specific airport, baggage, station transfer, traffic, check-in and weather exposure.', icon: Clock3 },
      { title: 'Know who protects you', copy: 'A joint booking may coordinate stages; separate tickets may leave each provider responsible only for its own segment.', icon: ShieldCheck },
      { title: 'Keep essentials with you', copy: 'Carry medicine, documents, charging, water and one useful layer where they remain accessible across every handoff.', icon: Luggage },
    ],
    bookingTitle: <>Check today’s route.<br />Then read every segment.</>,
    bookingDescription: 'Use live inventory to compare the exact date. Open the itinerary details before payment and confirm whether the product is one protected chain or several separate bookings.',
    bookingCards: [
      { title: 'Flights, trains, buses & ferries', copy: 'Compare current operators, departure points, combinations, total and cancellation terms for your date.', href: transport, label: 'Check current tickets on 12Go', icon: TicketCheck, affiliate: true },
      { title: 'Direct Bangkok–Samui flights', copy: 'Check the operating airline’s own live flight search, airport, baggage and ticket conditions.', href: 'https://www.bangkokair.com/eng/flightdeals/view/samui', label: 'Open Bangkok Airways', icon: Plane },
      { title: 'Koh Samui hotels', copy: 'Compare the exact beach zone, arrival transfer, room terms and total for your dates.', href: hotels, label: 'Check current hotel prices', icon: BedDouble, affiliate: true },
    ],
    faqs: [
      { question: 'How do I go from Bangkok to Koh Samui?', answer: 'The main choices are a direct flight to Samui Airport, a flight to mainland Surat Thani followed by transfer and ferry, an overnight train followed by transfer and ferry, or a bus-and-ferry combination. Compare the complete chain for your date.' },
      { question: 'Can you fly direct from Bangkok to Koh Samui?', answer: 'Yes. Bangkok Airways publishes a Bangkok Suvarnabhumi–Samui route. Check its live search for the operating date, flight, baggage and fare conditions.' },
      { question: 'Is it better to fly or take the ferry from Bangkok to Koh Samui?', answer: 'A direct flight removes the mainland ferry stage and is usually the simplest chain. Ferry-based routes can suit budget or overnight-travel preferences, but add road or rail connections and more handoffs.' },
      { question: 'Is there a direct train from Bangkok to Koh Samui?', answer: 'No. Koh Samui has no railway. The rail option runs from Bangkok to Surat Thani station, followed by land transfer to a mainland pier and a ferry to the island.' },
      { question: 'What is the cheapest way to get from Bangkok to Koh Samui?', answer: 'There is no permanent cheapest winner. Bus-and-ferry products are often budget-oriented, while promotions can change the comparison. Check the live all-in total, baggage, transfers and arrival transport for your date.' },
      { question: 'How long does it take to get from Bangkok to Koh Samui?', answer: 'It depends on the whole chain. A direct flight has fewer stages; mainland-flight, train and bus routes add transfers, check-in and ferry time. Use the live itinerary rather than adding optimistic vehicle times.' },
      { question: 'How do you get from Bangkok to Koh Samui by ferry?', answer: 'Bangkok is not a Koh Samui ferry pier. You first travel south by bus, train or flight, transfer to a mainland pier, then take a ferry to a named Samui pier.' },
      { question: 'Why can flights from Bangkok to Koh Samui look expensive?', answer: 'Samui Airport is operated within the Bangkok Airways group and the direct route has a different competitive and operating context from mainland-airport routes. Compare the live direct fare with the complete mainland transfer-and-ferry total.' },
      { question: 'Should I book one combined ticket or separate tickets?', answer: 'A combined product can reduce coordination when it clearly covers the transfer and ferry. Separate tickets can add flexibility but may leave missed connections unprotected. Read who operates and protects each segment.' },
      { question: 'Which Bangkok airport do I use for Koh Samui?', answer: 'Direct Bangkok Airways services are published from Suvarnabhumi (BKK). Mainland flights can appear from BKK or Don Mueang (DMK). Never assume “Bangkok” means the same airport throughout a self-transfer itinerary.' },
    ],
    faqDescription: 'These are genuine questions captured from ten live UK English SERPs on 27 July 2026. Answers avoid repeating volatile prices and timetables as permanent facts.',
    related: [
      { title: 'Koh Samui destination guide', description: 'Choose the coast, trip rhythm and island priorities after solving the journey.', href: '/city/koh-samui/', image: '/images/redesign/koh-samui-destination-hero.webp', imageAlt: 'Koh Samui coast and tropical landscape' },
      { title: 'Where to stay on Koh Samui', description: 'Compare beach zones before comparing individual rooms.', href: '/best-hotels/koh-samui/', image: '/images/redesign/koh-samui-hotels-hero.webp', imageAlt: 'Koh Samui resort coast' },
      { title: 'Thailand transport hub', description: 'Compare other route owners and build the wider itinerary.', href: '/transport/', image: '/images/blog/bangkok-chiang-mai-sleeper-train-guide-2026.webp', imageAlt: 'Train journey through Thailand' },
    ],
    sources: [
      { title: 'Bangkok–Samui flight search', creator: 'Bangkok Airways', url: 'https://www.bangkokair.com/eng/flightdeals/view/samui', note: 'Primary route and live airline conditions.' },
      { title: 'Airport check-in information', creator: 'Bangkok Airways', url: 'https://www.bangkokair.com/eng/airport-check-in', note: 'Primary airport and current check-in context.' },
      { title: 'D-Ticket', creator: 'State Railway of Thailand', url: 'https://www.dticket.railway.co.th/DTicketPublicWeb/home/Home', note: 'Official train search and booking channel.' },
      { title: 'Bangkok to Koh Samui live comparison', creator: '12Go', url: 'https://12go.asia/en/travel/bangkok/koh-samui', note: 'Current multimodal commercial inventory; verify each operator.' },
      { title: 'How to go to Koh Samui from Bangkok', creator: 'Pelago', url: 'https://www.pelago.com/en-GB/articles/how-to-go-to-koh-samui-from-bangkok/', note: 'Competitor route structure, checked against primary sources.' },
    ],
    methodDescription: 'Updated 27 July 2026 after independent ranking and backlink checks for both competing URLs, 272 DFS keyword records, 100 competitor-domain records, ten live English SERPs with 87 organic results and 53 genuine PAA questions, four DFS content parses and current primary-source verification. Two competitor parses returned no text. The old page’s fixed 2026 fares, times, operator monopoly claim, schedules, booking windows, taxi zones and “safe” guarantees were removed. The GA4 owner URL is retained; the duplicate unranked English transport URL is consolidated into it.',
  };
  return <TransportJourneyTemplate data={data} />;
}
