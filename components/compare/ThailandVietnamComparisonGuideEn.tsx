import {
  BadgeCheck,
  CalendarDays,
  Camera,
  Compass,
  CreditCard,
  ExternalLink,
  Landmark,
  Luggage,
  Map,
  Plane,
  Scale,
  Smartphone,
  Soup,
  TicketCheck,
  Train,
  Users,
  Waves,
} from 'lucide-react';
import { KLOOK_GENERIC, TRIP_GENERIC, TWELVEGO_GENERIC, withSubId } from '../../lib/affiliates';
import { CountryComparisonGuideTemplate, type CountryComparisonGuideData } from './CountryComparisonGuideTemplate';

const PAGE_URL = 'https://go2-thailand.com/blog/thailand-vs-vietnam-which-country-visit-2026/';
const UPDATED_AT = '2026-07-27';

const data: CountryComparisonGuideData = {
  pageUrl: PAGE_URL,
  updatedAt: UPDATED_AT,
  title: 'Thailand vs Vietnam: Which Country Fits Your Trip?',
  description: 'Compare Thailand and Vietnam by routes, beaches, regional weather, food, families, cost and first-trip fit—then check current options.',
  heroImage: '/images/redesign/thailand-vietnam-comparison-hero-v2.webp',
  heroAlt: 'A Thai long-tail boat and Wat Arun blending into Vietnam limestone karsts, rice terraces and a traditional junk boat',
  heroEyebrow: 'Two countries · two very different routes',
  heroTitle: <>Thailand <span className="text-saffron-dark">or</span><br />Vietnam?</>,
  heroSubtitle: 'Choose between an easy variety loop and a long, layered journey.',
  heroDescription: 'Thailand makes a city, north and island combination relatively easy to shape. Vietnam rewards a deliberate north–central–south route through distinct climates, cities and landscapes. The better country is the one whose geography fits your available days.',
  navItems: [
    { href: '#verdict', label: 'Verdict', icon: BadgeCheck },
    { href: '#compare', label: 'Compare', icon: Scale },
    { href: '#timing', label: 'When to go', icon: CalendarDays },
    { href: '#traveller', label: 'Travel style', icon: Users },
    { href: '#book', label: 'Current options', icon: TicketCheck },
  ],
  countryA: 'Thailand',
  countryB: 'Vietnam',
  verdictTitle: <>Easy variety or<br />linear depth?</>,
  verdictDescription: 'Thailand is the stronger default for a first trip mixing major city, temples and island time. Vietnam is stronger when food, history and a north-to-south overland story matter more than a classic island finish.',
  verdictCards: [
    { label: 'First multi-stop Asia trip', winner: 'Thailand', icon: Compass },
    { label: 'Long overland journey', winner: 'Vietnam', icon: Train },
    { label: 'Island and beach variety', winner: 'Thailand', icon: Waves },
    { label: 'History and route narrative', winner: 'Vietnam', icon: Landmark },
  ],
  editorialRule: 'Choose Thailand when you want a lower-friction mix of Bangkok, one northern or heritage stop and one coast. Choose Vietnam when you want the route itself to tell the story—from Hanoi and northern landscapes through central heritage to the south. Do not squeeze either country into a highlights race.',
  comparisonRows: [
    { factor: 'Route shape', a: 'Often a hub-and-spoke or triangle: Bangkok, north or heritage, then one Gulf or Andaman coast.', b: 'Often a linear north–central–south journey with long distances and several logical stopovers.', cue: 'Match route to trip length' },
    { factor: 'Beaches and islands', a: 'A wider first-trip choice of islands, limestone bays and resort coasts across two sea systems.', b: 'Useful coast and island options, but many classic routes balance beach time with cities, caves, bays and heritage.', cue: 'Thailand for island focus' },
    { factor: 'Cities', a: 'Bangkok offers a major urban anchor; Chiang Mai and regional centres create a softer second rhythm.', b: 'Hanoi and Ho Chi Minh City feel markedly different, with central cities and heritage towns between them.', cue: 'Vietnam for urban contrast' },
    { factor: 'Food', a: 'Strong regional identities, dense markets and a broad street-food culture built around sweet, sour, salty and spicy balance.', b: 'Regional noodle, rice, herb, broth, bánh mì and seafood traditions change materially from north to south.', cue: 'Both reward food-led travel' },
    { factor: 'Overland transport', a: 'Trains and buses connect major mainland stops; flights and ferries efficiently add islands.', b: 'The north–south railway, buses and domestic flights support a linear journey, but distances are substantial.', cue: 'Count nights and door-to-door time' },
    { factor: 'Culture and history', a: 'Living Buddhist practice, royal and regional history, temples and distinct local identities.', b: 'Layered dynastic, colonial and modern history, alongside diverse regional and ethnic cultures.', cue: 'Choose the story you want' },
    { factor: 'Weather complexity', a: 'North, central plains, Andaman and Gulf routes do not share one perfect month.', b: 'North, central and south can have different temperature, rain and storm patterns in the same month.', cue: 'Vietnam needs regional sequencing' },
    { factor: 'Family logistics', a: 'A compact Bangkok-plus-beach plan offers many backups and fewer long linear transfers.', b: 'Excellent with children when the route is slowed down; rapid north-to-south touring adds fatigue.', cue: 'Fewer bases win' },
  ],
  timingTitle: <>There is no single<br />shared best month.</>,
  timingDescription: 'Vietnam stretches far north to south; Thailand splits across several regions and two coast systems. These bands help select a route, but official local forecasts and marine or storm warnings must decide the final week.',
  timingRows: [
    { period: 'Dec–Feb', a: 'Often useful for Bangkok, the north and many Andaman plans; Gulf conditions can follow a different cycle.', b: 'South Vietnam is often drier, while the north may be cool or misty and central conditions remain route-specific.', cue: 'Strong, not universal', highlight: true },
    { period: 'Mar–May', a: 'Heat builds before and during regional rain transitions.', b: 'Often one of the easier broad windows to connect several regions, though heat increases.', cue: 'Plan around heat' },
    { period: 'Jun–Aug', a: 'Andaman rain and sea conditions need flexibility; some Gulf plans differ.', b: 'The north and south can be hot and wet; parts of the central coast may follow a different pattern.', cue: 'Choose regions carefully' },
    { period: 'Sep–Nov', a: 'Several regions transition, while Gulf rain can become more relevant later in the period.', b: 'Storm and heavy-rain exposure can affect central routes while northern conditions may improve.', cue: 'Protect the itinerary', highlight: true },
  ],
  profiles: [
    { eyebrow: 'First Southeast Asia trip', title: 'Lean Thailand', copy: 'A Bangkok, northern-or-heritage and single-coast route offers strong contrast without requiring a full north-to-south operation.', icon: Luggage },
    { eyebrow: 'Overland and history trip', title: 'Lean Vietnam', copy: 'Give Hanoi, one northern landscape, a central stop and the south enough nights to feel connected rather than collected.', icon: Train },
    { eyebrow: 'Family holiday', title: 'Choose the slower route', copy: 'Thailand often makes the simpler city-plus-beach plan. Vietnam can be excellent when you reduce the number of long transfers and select family-suitable operators.', icon: Users },
    { eyebrow: 'Food-first traveller', title: 'Choose by regional appetite', copy: 'Thailand offers deep regional contrast and market density; Vietnam rewards a north-to-south progression through broths, herbs, rice, noodles and coastal food.', icon: Soup },
  ],
  routeTitle: 'Combine only when each country still gets a real route.',
  routeCopy: 'A Bangkok–Hanoi or Bangkok–Ho Chi Minh City flight can connect both countries, but airport time and entry formalities consume a travel day. For shorter holidays, one coherent country usually beats two compressed highlight lists. On a longer journey, choose one compact route in each and add a buffer around the flight.',
  routeHref: withSubId(TRIP_GENERIC, 'compare-en-thailand-vietnam-flights'),
  routeCta: 'Check current flight options',
  bookingCards: [
    { title: 'Flights to Thailand', copy: 'Compare current schedules, arrival airports, baggage and change terms for the route you plan to operate.', href: withSubId(TRIP_GENERIC, 'compare-en-thailand-flights-vietnam-owner'), icon: Plane },
    { title: 'Flights to Vietnam', copy: 'Compare Hanoi, Da Nang and Ho Chi Minh City arrivals against the direction and first stop of your route.', href: withSubId(TRIP_GENERIC, 'compare-en-vietnam-flights'), icon: ExternalLink },
    { title: 'Thailand experiences', copy: 'Open current options after selecting a city and coast; verify operator, inclusions, physical demands and weather policy.', href: withSubId(KLOOK_GENERIC, 'compare-en-thailand-experiences-vietnam-owner'), icon: Camera },
    { title: 'Trains, buses and transfers', copy: 'Compare current route options where covered, then verify operator, station, berth or seat and cancellation conditions.', href: withSubId(TWELVEGO_GENERIC, 'compare-en-thailand-vietnam-transport'), icon: Train },
  ],
  amazonProducts: [
    { title: 'MOMAX travel adapter', copy: 'Useful across a multi-stop route; verify plug type, voltage support and device wattage before departure.', slug: 'momax-travel-adapter', icon: CreditCard },
    { title: 'Anker PowerCore 10K', copy: 'Backup power for maps and digital tickets. Check current airline rules and carry it in cabin baggage.', slug: 'anker-powercore-10k', icon: Smartphone },
    { title: 'Venture Pal daypack', copy: 'A packable bag for water and a light layer. Test its capacity and comfort before a long rail or city day.', slug: 'venture-pal-packable-backpack', icon: Luggage },
  ],
  faqDescription: 'These are genuine English People Also Ask questions from the researched travel SERPs. Misleading sports, politics and “no travel list” queries were excluded.',
  faqs: [
    { question: 'Which is nicer, Thailand or Vietnam?', answer: 'Thailand often feels nicer when you want an easy mix of a major city, temples and a well-developed island stay. Vietnam often feels nicer when the journey itself—Hanoi, northern landscapes, central heritage and the south—is the attraction. “Nicer” is route fit, not a permanent country score.' },
    { question: 'Are things cheaper in Thailand or Vietnam?', answer: 'Vietnam can be cheaper for some local meals, rooms and overland transport, but that does not guarantee a cheaper trip. Route length, domestic flights, cruises, hotel standard and number of transfers can reverse the result. Compare current door-to-door totals for equivalent itineraries.' },
    { question: 'Should you go to Thailand or Vietnam first?', answer: 'Thailand is usually the lower-friction first choice for travellers who want Bangkok plus one northern or beach region. Vietnam is a strong first choice when you are comfortable planning a linear route and want food, cities, history and landscapes to drive the trip. Your month and available days should override a generic order.' },
    { question: 'What is safer, Thailand or Vietnam?', answer: 'A country-wide winner would be misleading. Risks vary by road use, activity, neighbourhood, weather and current regional advice in both countries. Check official travel advice for your nationality, use insured reputable operators, follow local warnings and confirm that your insurance covers every planned activity.' },
    { question: 'Is Vietnam or Thailand better for kids?', answer: 'Thailand often makes a simpler first family route because Bangkok can pair with one beach base and many weather backups. Vietnam is rewarding for families who slow down, use suitable transport and avoid turning a north-to-south route into frequent one-night stops. The hotel and transfer plan matter more than the country label.' },
    { question: 'What is the difference between Vietnamese and Thai food?', answer: 'Both cuisines are regionally diverse, so one flavour rule is too simple. Thai dishes often build bold sweet, sour, salty, spicy and aromatic contrasts; Vietnamese cooking frequently foregrounds broths, fresh herbs, rice, noodles, pickles and regional sauces. Explore several regions before declaring a winner.' },
    { question: 'Which is prettier, Thailand or Vietnam?', answer: 'Thailand offers tropical islands, limestone coasts, northern mountains and temple-rich cities. Vietnam offers karst bays, rice terraces, caves, long coastlines and strong north-to-south landscape change. Choose the exact scenery and route density you want rather than asking one country to win every landscape.' },
  ],
  related: [
    { title: 'Thailand travel guide', description: 'Build a practical Thailand route around season, pace and entry preparation.', href: '/thailand-travel-guide/', image: '/images/redesign/thailand-route-hero.webp', imageAlt: 'A route through Thailand from city to coast' },
    { title: 'Thailand itineraries', description: 'Compare coherent Thailand routes by duration before adding another country.', href: '/itineraries/', image: '/images/redesign/krabi-destination-hero.webp', imageAlt: 'Thailand limestone coast on an itinerary' },
    { title: 'Thailand island guide', description: 'Choose a Gulf or Andaman island by weather, transport and travel rhythm.', href: '/islands/', image: '/images/blog/phuket-vs-koh-samui-for-tourists.webp', imageAlt: 'Tropical Thai island coast' },
  ],
  sources: [
    { title: 'Weather in Thailand', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Plan-Your-Trip/Weather', note: 'Official broad Thailand climate context; province and coast-specific forecasts still decide the route.' },
    { title: 'Weather and climate in Vietnam', creator: 'Vietnam National Authority of Tourism', url: 'https://vietnam.travel/things-to-do/weather-and-climate-vietnam', note: 'Official regional weather guidance supporting separate northern, central and southern planning.' },
    { title: 'Places to go', creator: 'Vietnam National Authority of Tourism', url: 'https://vietnam.travel/place-to-go', note: 'Official destination structure for northern, central and southern Vietnam.' },
    { title: 'Vietnam highlights route', creator: 'Vietnam National Authority of Tourism', url: 'https://vietnam.travel/plan-your-trip/recommended-trip/vietnam-highlights', note: 'Official example showing the distance and sequencing of a multi-region Vietnam route.' },
    { title: 'Thailand travel advice', creator: 'UK Foreign, Commonwealth & Development Office', url: 'https://www.gov.uk/foreign-travel-advice/thailand', note: 'Current regional advice; travellers should use the official source for their own nationality.' },
    { title: 'Vietnam travel advice', creator: 'UK Foreign, Commonwealth & Development Office', url: 'https://www.gov.uk/foreign-travel-advice/vietnam', note: 'Current entry, safety and regional advice; not used to construct a simplistic country safety ranking.' },
  ],
  methodDescription: 'Updated 27 July 2026 after DataForSEO analysis of 200 and 202 related English keyword records, 50 competitor domains, 10 live travel SERPs with genuine People Also Ask questions, owner ranking and backlink checks, plus three competitor content parses. Football, economy, cost-of-living and misleading “no travel list” intent were excluded. The legacy page had no returned ranking keywords or backlinks and contained unsupported first-hand claims, stale prices, incorrect entry details and country-wide safety and weather simplifications.',
};

export default function ThailandVietnamComparisonGuideEn() {
  return <CountryComparisonGuideTemplate data={data} />;
}
