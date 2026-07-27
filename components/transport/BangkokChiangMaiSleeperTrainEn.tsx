import {
  Armchair, BedDouble, CheckCircle2, Clock3, Hotel, Luggage,
  MapPinned, MoonStar, Route, ShieldCheck, TicketCheck, TrainFront,
} from 'lucide-react';
import { cityAffiliates, TRIP_GENERIC, TWELVEGO_GENERIC, withSubId } from '../../lib/affiliates';
import { TransportJourneyTemplate, type TransportJourneyData } from './TransportJourneyTemplate';

const HERO = '/images/redesign/bangkok-chiang-mai-sleeper-train-hero-v2.webp';
const SRT_BOOKING = 'https://www.dticket.railway.co.th/DTicketPublicWeb/home/Home';
const SRT_NORTHERN_LINE = 'https://www.railway.co.th/Service/PopularTrainDetail?value1=0049613716F4864B9ED01F76DB7038410200000088240187C7EC4164CFE789F65D271A0AB35492358609C3B884B1F384F4917C09&value2=0049613716F4864B9ED01F76DB70384102000000D589DFFE0806EDB8643C21A9668382498A897973FE72EE990BEC36E1DF7A631E';

export function BangkokChiangMaiSleeperTrainEn() {
  const tickets = withSubId(cityAffiliates['chiang-mai']?.twelveGo || TWELVEGO_GENERIC, 'en-bangkok-chiang-mai-sleeper-owner');
  const hotels = withSubId(cityAffiliates['chiang-mai']?.trip || TRIP_GENERIC, 'en-bangkok-chiang-mai-sleeper-hotels');
  const data: TransportJourneyData = {
    pageUrl: 'https://go2-thailand.com/blog/bangkok-chiang-mai-sleeper-train-guide-2026/',
    updatedAt: '2026-07-27',
    title: 'Bangkok to Chiang Mai Sleeper Train: Berths & Booking',
    description: 'Plan the Bangkok to Chiang Mai sleeper train by berth, station, luggage and arrival. Compare first and second class, then check current SRT or 12Go tickets.',
    heroImage: HERO,
    heroAlt: 'Traveller placing an overnight bag beside a lower berth in a Thai sleeper train carriage',
    breadcrumbs: [{ label: 'Thailand', href: '/' }, { label: 'Transport', href: '/transport/' }, { label: 'Bangkok to Chiang Mai sleeper train' }],
    heroEyebrow: 'Bangkok → Northern Thailand',
    heroTitle: <>Bangkok to Chiang Mai.<br /><span className="text-saffron-dark">Sleep through the distance.</span></>,
    heroSubtitle: 'Choose the berth before you choose the headline fare.',
    heroDescription: 'The night train can replace a travel day and a hotel night, but the experience changes by carriage, berth and exact service. This guide separates the decisions you can make now from details you must verify live.',
    heroPrimary: { label: 'Choose your berth', href: '#options' },
    heroAffiliate: { label: 'Check current train tickets', href: tickets },
    navItems: [
      { href: '#decide', label: 'Quick choice', icon: Route },
      { href: '#options', label: 'Berth options', icon: BedDouble },
      { href: '#compare', label: 'Compare', icon: CheckCircle2 },
      { href: '#connections', label: 'Travel night', icon: MoonStar },
      { href: '#resilience', label: 'Pack & protect', icon: ShieldCheck },
      { href: '#book', label: 'Live tickets', icon: TicketCheck },
    ],
    verdictTitle: <>A memorable night.<br />Not one standard bed.</>,
    verdictDescription: 'Start with privacy, mobility and sleep sensitivity. A lower berth, upper berth and private cabin solve different problems, while a seated service is a different travel product entirely.',
    quickCards: [
      { eyebrow: 'Privacy first', title: 'First-class cabin', copy: 'A stronger first look for couples, light sleepers or travellers who value a closable compartment. Confirm whether the exact service offers it.', icon: BedDouble },
      { eyebrow: 'Most practical berth', title: 'Second-class lower', copy: 'Typically easier to access and roomier than an upper berth. It is a useful first choice when mobility or window position matters.', icon: MoonStar },
      { eyebrow: 'Compact choice', title: 'Second-class upper', copy: 'Can suit confident sleepers travelling light, but access and perceived space deserve more weight than a small price difference.', icon: Luggage },
      { eyebrow: 'Not a sleeper berth', title: 'Seat or daytime train', copy: 'Useful only when the live timetable or berth inventory does not fit. Compare it as a separate comfort and time decision.', icon: Armchair, tone: 'dark' },
    ],
    editorialRule: 'timetables, train composition, berth inventory and fares are live variables. We explain the choice, then send readers to the current operator or ticket inventory.',
    optionsTitle: <>Pick the space<br />you can actually sleep in.</>,
    optionsDescription: 'The official SRT Northern Line page currently identifies Special Express 9/10 and shows both first- and second-class interiors. That does not mean every date or alternative service has identical stock—confirm the exact train before payment.',
    options: [
      { title: 'First-class cabin', eyebrow: 'Private compartment', chain: 'Station → private two-berth cabin → Chiang Mai', bestFor: 'Couples, privacy, valuable sleep or travellers who prefer a door between them and the aisle.', tradeoff: 'Limited inventory; solo use, cabin sharing and facilities depend on the exact product sold.', check: 'Train number, cabin occupancy, berth allocation, wash facilities, refund terms and whether both berths are included.', icon: BedDouble },
      { title: 'Second-class lower berth', eyebrow: 'Open sleeper carriage', chain: 'Seat by day → made-up lower bunk → morning arrival', bestFor: 'Easier access, more headroom and travellers who want a berth without booking a private cabin.', tradeoff: 'Open carriage with curtain privacy; aisle movement and carriage light can still affect sleep.', check: 'Air-conditioning, lower-berth assignment, coach position, bedding and the exact departure station.', icon: MoonStar },
      { title: 'Second-class upper berth', eyebrow: 'Open sleeper carriage', chain: 'Upper bunk → curtain privacy → shared carriage', bestFor: 'Travellers packing lightly who are comfortable climbing and prioritise securing a sleeper place.', tradeoff: 'Less convenient access and a more enclosed sleeping position than the lower berth.', check: 'Upper-berth assignment, ladder access, luggage storage and whether the space suits your mobility.', icon: Luggage },
      { title: 'Seat or daytime service', eyebrow: 'Alternative, not equivalent', chain: 'Reserved seat → full rail journey → Chiang Mai', bestFor: 'Dates when sleeper inventory does not fit, or travellers who actively want daylight views.', tradeoff: 'It does not provide a horizontal berth or replace a normal night of sleep.', check: 'Service type, seat class, air-conditioning, food availability, live duration and Chiang Mai arrival time.', icon: Armchair },
    ],
    matrixTitle: <>Match the berth<br />to the sleeper.</>,
    matrixDescription: 'There is no universal “best class”. The right choice depends on privacy, access, luggage, noise sensitivity and who is travelling together.',
    matrixRows: [
      { situation: 'Couple wanting privacy', firstLook: 'First-class cabin', why: 'A private compartment can make the overnight leg feel calmer and more self-contained.', risk: 'Confirm cabin occupancy and whether the selected ticket covers the intended berths.', highlight: true },
      { situation: 'Solo traveller, practical comfort', firstLook: 'Second-class lower', why: 'Easier access and a less enclosed berth can matter more than a nominal class label.', risk: 'Curtains provide visual privacy, not sound isolation.' },
      { situation: 'Travelling light on a budget', firstLook: 'Second-class upper', why: 'It still provides a sleeper berth when the access and space trade-off suit you.', risk: 'Do not choose it purely on price if climbing or confined space is a concern.' },
      { situation: 'Family or limited mobility', firstLook: 'Lower berths / cabin', why: 'Reducing climbing and keeping the group allocation clear can simplify the night.', risk: 'Book only after checking the exact berth map and carriage accessibility.', highlight: true },
      { situation: 'Sleeper sold out', firstLook: 'Re-plan, then compare', why: 'A seat, bus or flight may fit the date better than forcing the wrong overnight product.', risk: 'Compare door-to-door arrival and the following day, not only transport time.' },
    ],
    connectionTitle: <>Four moments shape<br />the whole night.</>,
    connectionDescription: 'This is a direct rail corridor, but the journey still has important handoffs: reaching the right Bangkok terminal, boarding the assigned coach, managing the night and arriving ready for Chiang Mai.',
    connectionSteps: [
      { label: 'Before booking', title: 'Search the exact date', copy: 'Use the official SRT D-Ticket channel or current commercial inventory. Read the train number, class, berth and conditions before comparing totals.', icon: TicketCheck },
      { label: 'Bangkok', title: 'Use the named station', copy: 'Long-distance Northern Line services are associated with Krung Thep Aphiwat, but your ticket is authoritative. Do not automatically travel to Hua Lamphong.', icon: MapPinned },
      { label: 'On board', title: 'Keep the night kit accessible', copy: 'Separate documents, medicine, water, earplugs, an eye mask, charging and one warm layer from luggage you do not want to reorganise in the aisle.', icon: Luggage },
      { label: 'Chiang Mai', title: 'Plan the first transfer', copy: 'Know how you will leave the station and whether your accommodation can store luggage before check-in. Avoid a fragile onward commitment immediately after arrival.', icon: Hotel },
    ],
    resilienceTitle: <>Pack for a carriage.<br />Not a hotel room.</>,
    resilienceDescription: 'A small accessible sleep kit improves the experience more than overpacking. Keep valuables controlled and leave flexibility around the live operating day.',
    resilienceCards: [
      { title: 'Confirm, then reconfirm', copy: 'Check the ticket, departure station and live train status before leaving Bangkok. Screenshots of old timetables are not operating guarantees.', icon: Clock3 },
      { title: 'Protect valuables', copy: 'Keep passport, wallet, phone and medicine with you in a compact secure bag without blocking the aisle or another passenger’s space.', icon: ShieldCheck },
      { title: 'Manage comfort', copy: 'Bring layers, earplugs, eye mask, water and offline arrival details. Treat sleep quality as personal rather than promised by the class name.', icon: MoonStar },
    ],
    bookingTitle: <>Check the real train.<br />Then check the real berth.</>,
    bookingDescription: 'Search live inventory for your date. Compare the exact class and berth, the total shown at checkout, identity requirements, change or refund rules and the named Bangkok station.',
    bookingCards: [
      { title: 'Compare current train tickets', copy: 'Use live commercial inventory to compare available trains and berth products. Open every fare and operator condition before payment.', href: tickets, label: 'Check current tickets on 12Go', icon: TicketCheck, affiliate: true },
      { title: 'Book with State Railway of Thailand', copy: 'Use the official D-Ticket channel for current SRT availability, passenger details and ticket conditions.', href: SRT_BOOKING, label: 'Open official SRT D-Ticket', icon: TrainFront },
      { title: 'Arrange Chiang Mai accommodation', copy: 'Compare current room totals, location, check-in and luggage-storage terms for the morning you arrive.', href: hotels, label: 'Check current hotel prices', icon: Hotel, affiliate: true },
    ],
    faqs: [
      { question: 'Is there a sleeper train from Bangkok to Chiang Mai?', answer: 'Yes. State Railway of Thailand publishes overnight services on the Northern Line, including sleeper accommodation on specified trains. Search your exact date because service, rolling stock and availability can change.' },
      { question: 'Is the Bangkok to Chiang Mai sleeper train worth it?', answer: 'It can be worth it when the overnight rail experience, central station journey and saving daytime matter to you. It is less suitable when you need guaranteed sleep, maximum privacy or a tightly protected onward connection.' },
      { question: 'Which sleeper train is best from Bangkok to Chiang Mai?', answer: 'The best service depends on its live departure and arrival, rolling stock and remaining berth inventory. SRT currently presents Special Express 9/10 as a key sleeper service, but verify the exact train sold for your date.' },
      { question: 'Should I choose first or second class on the Chiang Mai night train?', answer: 'Choose first class for a private-compartment first look; choose second class when a curtained berth in an open carriage suits you. Compare the exact cabin or berth allocation rather than relying on the class name alone.' },
      { question: 'Is a lower berth better than an upper berth?', answer: 'A lower berth is generally easier to access and often feels roomier. An upper berth can still work well for a mobile traveller packing lightly. Availability and your own mobility matter more than a universal ranking.' },
      { question: 'Where does the sleeper train to Chiang Mai leave from in Bangkok?', answer: 'Current long-distance Northern Line services use Krung Thep Aphiwat Central Terminal. The station printed on your live ticket is authoritative, so check it before travelling rather than assuming Hua Lamphong.' },
      { question: 'How do I book the Bangkok to Chiang Mai sleeper train?', answer: 'Search the official SRT D-Ticket site or a current ticket comparison provider, enter the passenger details exactly as required, select the actual train, class and berth, then retain the valid ticket format and conditions.' },
      { question: 'How far ahead should I book a sleeper berth?', answer: 'There is no honest fixed window for every date. Demand varies around weekends, holidays and peak travel periods. Search as soon as your dates are firm and use live inventory rather than an old universal booking rule.' },
      { question: 'What luggage can I take on the sleeper train?', answer: 'SRT publishes passenger-luggage rules by class and item size. Check the current official rule for your ticket and keep baggage stowed without obstructing the aisle, berth access or other passengers.' },
      { question: 'Can I sleep well on the Bangkok to Chiang Mai night train?', answer: 'Some travellers sleep well; others notice movement, lights, announcements, temperature or aisle activity. A suitable berth, eye mask, earplugs and a warm layer help, but no class can promise hotel-quality sleep.' },
    ],
    faqDescription: 'These questions come from ten live UK English SERPs researched on 27 July 2026. Answers deliberately avoid turning volatile fares, times and booking windows into permanent promises.',
    related: [
      { title: 'Bangkok to Chiang Mai: every transport option', description: 'Compare the sleeper train with flights, buses and the complete door-to-door corridor.', href: '/transport/bangkok-to-chiang-mai/', image: '/images/blog/bangkok-chiang-mai-sleeper-train-guide-2026.webp', imageAlt: 'Transport journey between Bangkok and Chiang Mai' },
      { title: 'Chiang Mai destination guide', description: 'Choose neighbourhoods, temples, food and trip rhythm after solving the journey north.', href: '/city/chiang-mai/', image: '/images/redesign/destination-chiang-mai.webp', imageAlt: 'Historic temple and mountain landscape in Chiang Mai' },
      { title: 'Where to stay in Chiang Mai', description: 'Compare the Old City, Nimman and other bases before looking at individual rooms.', href: '/best-hotels/chiang-mai/', image: '/images/cities/chiang-mai/redesign/chiang-mai-hotels-hero.webp', imageAlt: 'Hotel and city landscape in Chiang Mai' },
    ],
    sources: [
      { title: 'Northern Line: Special Express 9/10', creator: 'State Railway of Thailand', url: SRT_NORTHERN_LINE, note: 'Primary route, class, coach and official live-check context.' },
      { title: 'D-Ticket', creator: 'State Railway of Thailand', url: SRT_BOOKING, note: 'Official availability and booking channel.' },
      { title: 'Krung Thep Aphiwat Central Terminal', creator: 'State Railway of Thailand', url: 'https://www.railway.co.th/More/Knowledge_Detail?value1=0049613716F4864B9ED01F76DB70384102000000D783FC310E775F0D1EBC12B036EF1C93AE7192566518FE60E5749B28F1E5CF37&value2=0049613716F4864B9ED01F76DB70384102000000269FB8018BAC2833402E81707D45CC84C7D759BF0B49C9AAE12F50A3F0BA0338&value3=0049613716F4864B9ED01F76DB70384102000000999A836093CAB18E6C4C1273DFE87AB9A40A5C4387507DB35306CC25674701FA', note: 'Primary Bangkok terminal information.' },
    ],
    methodDescription: 'Updated 27 July 2026 after independent ranking and backlink checks for the blog and corridor URLs, 138 DFS keyword records, 94 competitor-domain records and ten live English SERPs with 79 organic results and 37 genuine PAA questions. Primary SRT route, terminal, ticket and luggage information was checked separately. Fixed fares, schedules, booking windows, guaranteed arrival language and universal “best” claims from the legacy article were removed.',
  };
  return <TransportJourneyTemplate data={data} />;
}
