import { BookOpen, Bus, Camera, Clock3, Coffee, Footprints, Map, Palette, ShieldCheck, Sun, TicketCheck, Utensils } from 'lucide-react';
import { KLOOK_GENERIC, withSubId } from '../../lib/affiliates';
import { OldTownSpokeTemplate, type OldTownSpokeData } from './OldTownSpokeTemplate';

const HERO = '/images/redesign/phuket-old-town-walk-hero-v2.webp';

export default function OldTownThingsToDoEn({ activityHref }: { activityHref?: string }) {
  const activities = withSubId(activityHref || KLOOK_GENERIC, 'phuket-old-town-things-en-activities');
  const data: OldTownSpokeData = {
    pageUrl: 'https://go2-thailand.com/phuket/old-town/things-to-do/', updatedAt: '2026-07-27',
    title: 'Things to Do in Phuket Old Town: A Smart Walking Route',
    description: 'Walk Phuket Old Town in a useful order. Follow heritage streets, museums, murals, food stops and practical heat, traffic and Sunday-market planning.',
    breadcrumbLabel: 'Things to do', heroImage: HERO,
    heroAlt: 'Traveller reading a paper map beside a mural and heritage shophouses in Phuket Old Town',
    heroEyebrow: 'A route, not a pin dump',
    heroTitle: <>Walk Old Town.<br /><span className="text-saffron-dark">Let the streets explain Phuket.</span></>,
    heroSubtitle: 'Architecture first. Food and context in between.',
    heroDescription: 'The best Old Town visit is a short, coherent loop—not a race between “top ten” pins. This route separates the visual core, cultural stops and food breaks while leaving Sunday market logistics to their own guide.',
    primaryAction: { label: 'Start the route', href: '#route' }, affiliateAction: { label: 'Check current guided walks', href: activities },
    navItems: [
      { href: '#overview', label: 'Route fit', icon: Map }, { href: '#route', label: 'Five steps', icon: Footprints },
      { href: '#focus', label: 'What to notice', icon: Camera }, { href: '#timing', label: 'Best rhythm', icon: Clock3 },
      { href: '#practical', label: 'Practical', icon: ShieldCheck }, { href: '#book', label: 'Live options', icon: TicketCheck },
    ],
    introEyebrow: 'Before you start', introTitle: <>Build one loop.<br />Keep room to look.</>,
    introDescription: 'A focused first visit can fit into a half-day, but distance is not the constraint: heat, traffic, opening hours and how long you spend eating or reading displays are.',
    overviewCards: [
      { eyebrow: 'Core purpose', title: 'Read the shophouse streets', copy: 'Use Thalang, Soi Romanee and adjacent roads as connected urban history—not separate photo props.', icon: Palette },
      { eyebrow: 'One anchor', title: 'Choose one cultural stop', copy: 'Pick a museum, historic house or shrine that is currently open instead of collecting every facade.', icon: BookOpen },
      { eyebrow: 'Essential pause', title: 'Plan food and shade', copy: 'A shaded local stop makes the route better and prevents the hottest hours becoming a forced march.', icon: Coffee },
      { eyebrow: 'Separate intent', title: 'Sunday market has its own plan', copy: 'Use the night-market spoke for current schedule, crowds, food browsing and return transport.', icon: Clock3, tone: 'dark' },
    ],
    editorialRule: 'This page owns the walking sequence and activity choices. It links to the market guide instead of duplicating market hours, food lists or ranking terms.',
    routeEyebrow: 'Self-guided sequence', routeTitle: <>Five moves through<br />the heritage core.</>,
    routeDescription: 'The order is deliberately flexible. Reverse it when weather, closures or your arrival point make that more sensible, and verify every staffed venue before walking toward it.',
    routeSteps: [
      { marker: '01', title: 'Orient on Thalang Road', copy: 'Start with the arcaded shophouse rhythm and note which entrances are shops, homes, cafes or shrines.', note: 'Keep doorways and covered walkways clear.' },
      { marker: '02', title: 'Turn through Soi Romanee', copy: 'Use the short lane for facade detail, then move beyond its best-known photo angle.', note: 'Ask before portraits or private-interior photos.' },
      { marker: '03', title: 'Extend to Dibuk and Krabi', copy: 'Add quieter streets and one current heritage venue for historical context.', note: 'Check the official venue page for opening and admission.' },
      { marker: '04', title: 'Loop via Phang Nga Road', copy: 'Look for murals, active businesses and the transition from postcard core to everyday city.', note: 'Traffic and pavement comfort change quickly.' },
      { marker: '05', title: 'Finish with food, not another pin', copy: 'Choose a current local stop and compare ingredients, dietary needs and total before ordering.', note: 'No restaurant is treated as a permanent “best”.' },
    ],
    focusEyebrow: 'Information gain', focusTitle: <>Notice the city<br />behind the colour.</>,
    focusDescription: 'The useful layer is not a longer attraction list. It is learning how architecture, worship, commerce and food share the same blocks—and changing your behaviour accordingly.',
    focusCards: [
      { title: 'Arcades & thresholds', copy: 'Look at shade, entrances and the transition between public walkway and private property.', icon: Footprints },
      { title: 'Shrines & worship', copy: 'Slow down, dress respectfully and follow on-site photography rules rather than assuming access.', icon: ShieldCheck },
      { title: 'Murals & context', copy: 'Street art is one layer of the district, not proof that every adjacent wall or doorway is a photo set.', icon: Camera },
    ],
    timingEyebrow: 'Use the day well', timingTitle: <>Route by energy,<br />not stopwatch.</>, timingDescription: 'Choose a rhythm that matches the weather and your reason for visiting. A Sunday late-afternoon route behaves differently from a weekday morning.',
    timingRows: [
      { period: 'Morning', feel: 'Usually easier for facade viewing before the strongest heat and later visitor flow.', plan: 'Walk the visual core first, then use one cultural stop when it opens.', cue: 'Architecture first', highlight: true },
      { period: 'Midday', feel: 'Heat and showers can make exposed walking less comfortable.', plan: 'Use food, shade or a verified indoor venue rather than forcing the entire loop.', cue: 'Pause well' },
      { period: 'Afternoon', feel: 'Businesses and cafes create more street activity; light and traffic vary by block.', plan: 'Keep the route shorter and confirm your final pickup point.', cue: 'Flexible finish' },
      { period: 'Sunday evening', feel: 'The market can transform the Thalang Road experience and pedestrian flow.', plan: 'Switch to the specialist market guide and verify its current operating information.', cue: 'Different intent', highlight: true },
    ],
    highlightEyebrow: 'Choose three layers', highlightTitle: <>Architecture, context<br />and a good pause.</>,
    highlightDescription: 'A strong route includes all three. Adding more pins usually creates less understanding, not more.',
    highlights: [
      { title: 'The street fabric', copy: 'Arcades, facades, shutters and active ground floors make the district coherent.', image: HERO, imageAlt: 'Heritage street and mural on the Old Town walking route', label: 'Observe the whole block' },
      { title: 'One cultural interior', copy: 'Choose a currently open museum, historic house or faith site and follow its visitor rules.', image: '/images/cities/phuket/attractions/Phuket Old Town2.webp', imageAlt: 'Historic architecture in Phuket Old Town', label: 'Verify before visiting' },
      { title: 'Food with context', copy: 'Use current menus and dietary checks; avoid turning one visit into an eternal price or “best” claim.', image: '/images/blog/old-town-phuket-walking-guide-street-art-cafes-2026.webp', imageAlt: 'Cafe and street details in Phuket Old Town', label: 'Leave room for lunch' },
    ],
    practicalEyebrow: 'Make the loop work', practicalTitle: <>Small frictions<br />shape the whole walk.</>,
    practicalDescription: 'Old Town is compact, but pedestrian comfort is uneven. Plan the boring details so the cultural part gets your attention.',
    practicalCards: [
      { title: 'Heat & showers', copy: 'Carry water and sun/rain protection. Use the current TMD forecast and keep an indoor fallback.', icon: Sun },
      { title: 'Roads & pickups', copy: 'Use crossings carefully and set a pickup point that remains accessible during closures.', icon: Bus },
      { title: 'Respect & access', copy: 'Ask before photographing people or interiors and never block working doorways.', icon: ShieldCheck },
    ],
    bookingTitle: <>Choose guidance<br />only where it adds context.</>,
    bookingDescription: 'A self-guided loop is viable. A paid guide earns its place when language, architectural context, food inclusions or access are clear and current.',
    bookingCards: [
      { title: 'Guided Old Town walks', copy: 'Check operator, route, duration, language, meeting point, inclusions and cancellation.', href: activities, label: 'Check current walking tours', icon: TicketCheck, affiliate: true },
      { title: 'Sunday market guide', copy: 'Use the dedicated spoke when stalls and the evening street format are the purpose.', href: '/phuket/old-town/night-market/', label: 'Plan Sunday Walking Street', icon: Utensils },
      { title: 'Old Town owner', copy: 'Return to the area decision guide for street zones, stay fit and comparisons with beach bases.', href: '/phuket/old-town/', label: 'Open the full area guide', icon: Map },
    ],
    faqs: [
      { question: 'What are the best things to do in Phuket Old Town?', answer: 'Walk Thalang Road and Soi Romanee, extend through Dibuk, Krabi and Phang Nga roads, choose one currently open cultural stop and leave time for food. Sunday Walking Street is a separate evening plan.' },
      { question: 'Is Phuket Old Town walkable?', answer: 'Yes at district scale, although pavement quality, traffic, heat and rain vary. Use crossings carefully and set a realistic pickup point.' },
      { question: 'How long should I spend in Phuket Old Town?', answer: 'A half-day suits a focused first loop with one cultural stop and food. Stay longer only when museums, a guided tour or the Sunday market are part of the purpose.' },
      { question: 'Can I walk Phuket Old Town without a guide?', answer: 'Yes. This sequence works self-guided. Book a guide when verified language, historical context, food inclusions or access add value for you.' },
      { question: 'What should I not miss in Phuket Old Town?', answer: 'Do not miss the relationship between Thalang Road, Soi Romanee and the quieter adjacent roads. One thoughtful cultural stop is more useful than photographing only the pastel lane.' },
      { question: 'Is there anything to do in Phuket Old Town at night?', answer: 'There are restaurants and evening venues, while Sunday Walking Street creates a separate market experience. Check current opening and transport information rather than relying on a static nightlife list.' },
      { question: 'Where should a Phuket Old Town walk start?', answer: 'Thalang Road is a practical orientation point, but start near your real arrival point and reverse the loop when weather, closures or a verified venue booking make that easier.' },
    ],
    faqDescription: 'Questions reflect live English SERP and PAA research from 27 July 2026. Exact fares, museum hours and restaurant rankings were excluded because they change.',
    related: [
      { title: 'Phuket Old Town guide', description: 'Decide when to visit, where to stay and how the district fits the island trip.', href: '/phuket/old-town/', image: '/images/redesign/phuket-old-town-hero-v2.webp', imageAlt: 'Phuket Old Town shophouses at late afternoon' },
      { title: 'Sunday Walking Street', description: 'Switch to the dedicated live-market planning guide.', href: '/phuket/old-town/night-market/', image: '/images/redesign/phuket-old-town-market-hero-v2.webp', imageAlt: 'Sunday Walking Street market in Phuket Old Town' },
      { title: 'Phuket attractions', description: 'Compare island-wide sights without expanding this walking route.', href: '/city/phuket/attractions/', image: '/images/redesign/phuket-attractions-hero.webp', imageAlt: 'Phuket attractions and viewpoints' },
    ],
    sources: [
      { title: 'Phuket destination', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Destinations/Provinces/phuket/350', note: 'Official destination context.' },
      { title: 'Phuket weather', creator: 'Thai Meteorological Department', url: 'https://www.tmd.go.th/weather/province/phuket', note: 'Current weather and forecast.' },
      { title: 'Phuket Smart Bus', creator: 'Phuket Smart Bus', url: 'https://phuketsmartbus.com/', note: 'Current operator routes and timetable.' },
      { title: 'Thailand safety and security', creator: 'UK FCDO', url: 'https://www.gov.uk/foreign-travel-advice/thailand/safety-and-security', note: 'Current road and personal-safety guidance.' },
    ],
    methodDescription: 'Built from the 25-record activities cluster, owner-cluster overlap analysis, ten Old Town SERPs with genuine PAA questions and full competitor parses. The page owns route sequence and activity choice only; market detail stays on its existing ranking URL. Static prices, exact travel times, venue guarantees, unsafe scooter advice and permanent restaurant claims were removed.',
  };
  return <OldTownSpokeTemplate data={data} />;
}
