import { Bus, Clock3, Compass, Eye, GlassWater, Hotel, MapPin, MoonStar, Music, ShieldCheck, Sparkles, TicketCheck, Users } from 'lucide-react';
import { KLOOK_GENERIC, TRIP_GENERIC, withSubId } from '../../lib/affiliates';
import { PatongExperienceTemplate, type PatongExperienceData } from './PatongExperienceTemplate';

const HERO = '/images/redesign/patong-nightlife-hero-v2.webp';

export default function PatongNightlifeEn({ stayHref }: { stayHref?: string }) {
  const nightOptions = withSubId(KLOOK_GENERIC, 'patong-nightlife-owner-en-options');
  const stays = withSubId(stayHref || TRIP_GENERIC, 'patong-nightlife-owner-en-stays');
  const data: PatongExperienceData = {
    pageUrl: 'https://go2-thailand.com/phuket/patong/nightlife/', updatedAt: '2026-07-27', breadcrumbLabel: 'Nightlife',
    title: 'Patong Nightlife Guide: Bangla Road & Quieter Nights',
    description: 'Plan Patong nightlife responsibly. Understand Bangla Road, live music, clubs, shows, quieter alternatives, bills, drink safety and transport home.',
    heroImage: HERO, heroAlt: 'Adult travellers, live music bars and licensed pickup traffic on a colourful Patong nightlife street',
    heroEyebrow: 'Patong after dark, without the hype', heroTitle: <>Patong nightlife.<br /><span className="text-saffron-light">Choose the night before it chooses you.</span></>,
    heroSubtitle: 'Bangla Road is one product—not the whole evening.',
    heroDescription: 'Patong can mean sunset drinks, live music, clubs, ticketed shows or a deliberately quiet dinner. This guide explains the zones and safety decisions without publishing adult-service prices, stale club rankings or promises about closing times.',
    primaryAction: { label: 'Choose your kind of night', href: '#choose' }, affiliateAction: { label: 'Check current evening options', href: nightOptions },
    navItems: [
      { href: '#decide', label: 'Night fit', icon: Compass }, { href: '#zones', label: 'Night zones', icon: MapPin },
      { href: '#choose', label: 'Choose a night', icon: MoonStar }, { href: '#rhythm', label: 'Evening rhythm', icon: Clock3 },
      { href: '#practical', label: 'Safety', icon: ShieldCheck }, { href: '#book', label: 'Live options', icon: TicketCheck },
    ],
    introEyebrow: 'First decide', introTitle: <>How much intensity<br />do you actually want?</>,
    introDescription: 'Patong’s strongest advantage is concentration. Its main risk is drifting into a louder, later or more expensive night than you intended.',
    introCards: [
      { eyebrow: 'High intensity', title: 'Bangla Road & clubs', copy: 'Choose it knowingly for dense adult nightlife, promoters, loud music and constant commercial attention.', icon: Music },
      { eyebrow: 'Medium intensity', title: 'Live music & social bars', copy: 'Look for a current venue with clear pricing, visible atmosphere and an easy exit.', icon: GlassWater },
      { eyebrow: 'Planned product', title: 'Shows & ticketed nights', copy: 'Compare official operator, venue, seating, inclusions, transport and cancellation before payment.', icon: TicketCheck },
      { eyebrow: 'Valid alternative', title: 'Dinner, sunset or an early night', copy: 'You do not need Bangla Road to have a Patong evening—or to justify staying in Patong.', icon: MoonStar, tone: 'dark' },
    ],
    editorialRule: 'This is an adult nightlife decision guide. It does not facilitate sexual services, publish adult-service prices or treat exploitative behaviour as an attraction.',
    zonesEyebrow: 'Nightlife by geography', zonesTitle: <>The core is concentrated.<br />Your night does not have to be.</>,
    zonesDescription: 'Choose the zone before the venue. This prevents a casual live-music plan becoming an accidental late-night club circuit.',
    zones: [
      { title: 'Bangla Road core', eyebrow: 'Maximum intensity', copy: 'A dense adult nightlife street with bars, clubs, promoters and sensory overload. Walk through only if that environment fits.', check: 'Agree a meeting point, keep an exit route and confirm every charge before accepting drinks or seating.', image: HERO, imageAlt: 'Busy but responsible Patong nightlife street near the central core' },
      { title: 'Beach Road & sunset belt', eyebrow: 'Earlier and more open-air', copy: 'Useful for sunset, dinner and a less enclosed start before deciding whether to continue later.', check: 'Verify the current venue, weather exposure, music level and safe route onward.', image: '/images/redesign/patong-area-hero-v2.webp', imageAlt: 'Patong Beach and seafront at evening' },
      { title: 'Outside the core', eyebrow: 'Quieter or purpose-led', copy: 'Live music, hotel bars, restaurants and ticketed entertainment can create a night without a Bangla circuit.', check: 'Check the exact pin, last entry, dress rule, return transport and recent operating information.', image: '/images/redesign/phuket-stay-patong.webp', imageAlt: 'Patong accommodation and quieter evening zone' },
    ],
    choiceEyebrow: 'Choose the product', choiceTitle: <>One evening.<br />Four very different intentions.</>,
    choiceDescription: 'Do not compare venues until you know whether the group wants conversation, music, dancing or a ticketed show.',
    choices: [
      { title: 'Live music and conversation', copy: 'Choose a venue where you can see the atmosphere, price structure and exit before ordering.', check: 'current programme, volume, seating and bill format', icon: Music },
      { title: 'Clubbing and dancing', copy: 'Use current official venue information; line-up, entry, dress and closing conditions change.', check: 'age/ID, official ticket, entry terms and transport home', icon: Sparkles },
      { title: 'Ticketed show or sport', copy: 'Treat the operator, date, seating and transfers as bookable inventory rather than permanent facts.', check: 'venue, start time, inclusions, pickup and cancellation', icon: TicketCheck },
      { title: 'Couples or quiet groups', copy: 'Use sunset, dinner, a hotel bar or live music outside the core instead of forcing Bangla into the plan.', check: 'noise, walking route and a shared leaving time', icon: Users },
    ],
    rhythmEyebrow: 'Control the arc', rhythmTitle: <>Start with a plan.<br />Leave with the same group.</>,
    rhythmDescription: 'Exact opening, crowd and closing patterns vary. The durable advice is to set intensity, budget and return transport before alcohol and noise make decisions harder.',
    rhythmRows: [
      { period: 'Sunset', feel: 'Beach Road, dinner and open-air venues can offer a softer start.', plan: 'Confirm weather, table, route and whether the group wants to continue later.', cue: 'Set the tone', highlight: true },
      { period: 'Early evening', feel: 'The central district becomes more active while movement and conversation may still be easier.', plan: 'Walk the environment once before entering; identify a meeting and exit point.', cue: 'Observe first' },
      { period: 'Later night', feel: 'Noise, crowds, promoters and club-focused energy can increase.', plan: 'Watch drinks, confirm bills and leave any situation that feels coercive or unclear.', cue: 'Stay together' },
      { period: 'Going home', feel: 'Fatigue, alcohol and demand can complicate road decisions and pickup.', plan: 'Use a licensed booked ride, verify vehicle/driver and never ride a scooter after drinking.', cue: 'Pre-book logic', highlight: true },
    ],
    featureEyebrow: 'Bangla Road reality', featureTitle: <>Adult entertainment.<br />Not a licence to ignore consent.</>,
    featureDescription: 'The area is commercial, filmed heavily and discussed through stereotypes. Responsible visitors keep boundaries clear, avoid exploitative transactions and treat workers and other guests as people—not content.',
    featureCards: [
      { title: 'No filming without consent', copy: 'Do not photograph or record workers, performers or guests without clear permission.', icon: Eye },
      { title: 'No procurement guide', copy: 'This page does not explain how to buy sexual services or quote prices. Laws, consent and exploitation risks matter.', icon: ShieldCheck },
      { title: 'Leave pressure behind', copy: 'Walk away from unclear bills, coercive sales, unwanted contact or a venue that will not explain terms.', icon: Users },
    ],
    practicalEyebrow: 'Reduce controllable risk', practicalTitle: <>Protect your drink,<br />bill and route home.</>,
    practicalDescription: 'Practical safety beats venue mythology. Stay with trusted people and use current official advice.',
    practicalCards: [
      { title: 'Drink safety', copy: 'Buy sealed or directly served drinks, keep them in sight and seek help immediately if anyone feels unexpectedly unwell.', icon: GlassWater },
      { title: 'Bills & promoters', copy: 'Confirm menu, cover, minimum spend, service and every invited drink before ordering; keep a record of the bill.', icon: ShieldCheck },
      { title: 'Transport home', copy: 'Save your hotel pin, use licensed transport, verify vehicle/driver and never combine alcohol with riding.', icon: Bus },
    ],
    bookingTitle: <>Book verified inventory.<br />Do not book a stereotype.</>,
    bookingDescription: 'Shows, sport and guided evenings can be compared as live inventory. Bars and clubs still require current official checks on the night itself.',
    bookingCards: [
      { title: 'Evening shows & activities', copy: 'Compare operator, exact venue, seating, inclusions, pickup and cancellation.', href: nightOptions, label: 'Check current evening options', icon: TicketCheck, affiliate: true },
      { title: 'Stay near—or away from—the core', copy: 'Compare exact pin, recent noise feedback, cancellation and total for your dates.', href: stays, label: 'Check current hotel prices', icon: Hotel, affiliate: true },
      { title: 'Patong restaurant guide', copy: 'Plan dinner separately with current menu, dietary and total-price checks.', href: '/phuket/patong/restaurants/', label: 'Choose where to eat', icon: GlassWater },
    ],
    faqs: [
      { question: 'Is Patong nightlife good?', answer: 'It is a strong fit for travellers who want concentrated adult nightlife, live music or clubs. It is a weak fit when quiet evenings, low commercial pressure or early sleep matter.' },
      { question: 'What is Bangla Road famous for?', answer: 'Bangla Road is Patong’s concentrated adult nightlife core, known for bars, clubs, live entertainment and promoters. It is one part of Patong, not the whole destination.' },
      { question: 'Is Patong nightlife safe?', answer: 'No nightlife district is universally safe. Reduce risk by staying with trusted people, protecting drinks, confirming bills, avoiding illegal drugs and using licensed transport.' },
      { question: 'What can couples do in Patong at night?', answer: 'Couples can choose sunset, dinner, live music, a ticketed show or an early walk without making Bangla Road the centre of the evening.' },
      { question: 'Can you enjoy Patong nightlife without Bangla Road?', answer: 'Yes. Beach Road, restaurants, hotel bars, live music and current ticketed entertainment offer alternatives. Verify the exact venue and route home.' },
      { question: 'What time do bars close in Patong?', answer: 'Closing and enforcement can change by licence, venue and current rules. Check the venue’s official current information and never plan transport around a generic closing time.' },
      { question: 'Is there a red-light district in Patong?', answer: 'Bangla Road includes adult-oriented nightlife. This guide does not facilitate sexual services; visitors should follow Thai law, respect consent and avoid exploitative or coercive situations.' },
      { question: 'What should I avoid in Patong at night?', answer: 'Avoid illegal drugs, unattended drinks, unclear bills, unlicensed transport, riding after alcohol, filming people without consent and any interaction that feels coercive.' },
    ],
    faqDescription: 'Questions come from eight live English nightlife SERPs captured on 27 July 2026. Adult-service prices, club rankings, exact closing times and crowd claims were excluded.',
    related: [
      { title: 'Patong area guide', description: 'Decide whether the nightlife core should be near—or far from—your hotel.', href: '/phuket/patong/', image: '/images/redesign/patong-area-hero-v2.webp', imageAlt: 'Patong Beach and urban district' },
      { title: 'Patong restaurants', description: 'Choose dinner by zone, occasion and current evidence.', href: '/phuket/patong/restaurants/', image: '/images/redesign/patong-restaurants-hero-v2.webp', imageAlt: 'Thai restaurant in Patong at blue hour' },
      { title: 'Patong hotels', description: 'Compare exact zones and recent noise feedback before booking.', href: '/phuket/patong/hotels/', image: '/images/redesign/phuket-hotels-hero.webp', imageAlt: 'Phuket hotel zones' },
    ],
    sources: [
      { title: 'Phuket destination', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Destinations/Provinces/phuket/350', note: 'Official destination context.' },
      { title: 'Thailand safety and security', creator: 'UK FCDO', url: 'https://www.gov.uk/foreign-travel-advice/thailand/safety-and-security', note: 'Current drink, personal and transport-safety guidance.' },
      { title: 'Thailand local laws and customs', creator: 'UK FCDO', url: 'https://www.gov.uk/foreign-travel-advice/thailand/local-laws-and-customs', note: 'Current legal and behavioural context.' },
      { title: 'Routes and live tracking', creator: 'Phuket Smart Bus', url: 'https://phuketsmartbus.com/', note: 'Current operator transport information.' },
    ],
    methodTitle: 'Responsible nightlife guidance, not voyeurism.',
    methodDescription: 'Updated 27 July 2026 after owner ranking/backlink checks, 95 keyword records, 50 competitor domains, eight live English SERPs with 45 PAA questions and two competitor parses (4,934 and 25,256 markdown characters). Bangla Road terms were mapped into the nightlife owner without publishing sexual-service procurement, fixed drink/transport prices, crowd counts, stale club rankings, exact closing hours or venue schedules.',
  };
  return <PatongExperienceTemplate data={data} />;
}
