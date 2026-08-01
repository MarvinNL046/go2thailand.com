import type { DestinationGuideData } from "../types";

export const chumphonDestinationGuideEn: DestinationGuideData = {
  citySlug: "chumphon",
  cityName: "Chumphon",
  locale: "en",
  pageTitle: "Chumphon Thailand: beaches, town & Koh Tao route 2026",
  pageDescription:
    "Plan Chumphon as more than a ferry stop. Compare town, Thung Wua Laen and Sairee, choose a marine-park day or Koh Tao handover and avoid pier mistakes.",
  pageUrl: "https://go2-thailand.com/city/chumphon/",
  dateModified: "2026-07-27",
  coordinates: { latitude: 10.493, longitude: 99.18 },
  touristType: ["Island connections", "Quiet beaches", "Marine trips", "Southern food"],
  stayGuideHref: "/where-to-stay/chumphon/",
  foodGuideHref: "/city/chumphon/food/",
  hero: {
    image: "/images/redesign/chumphon-destination-hero.webp",
    imageAlt: "Quiet Chumphon coast with fishing boats, islands and soft morning light",
    eyebrow: "The mainland before the island",
    title: "Chumphon",
    accent: "Thailand",
    subtitle: "A working southern coast, calm beaches and a ferry handover that deserves planning.",
    description:
      "Chumphon is not one pier with a city name attached. Town, Thung Wua Laen, Sairee, Pak Nam, airport and railway station are separate points. Choose whether you are staying on the mainland, taking a returning marine trip or starting a Koh Tao stay before selecting a hotel.",
    imageClassName: "object-cover object-[62%_center] lg:object-center",
    stats: [
      { label: "Useful mainland stay", value: "2–3 nights", icon: "calendar" },
      { label: "Easiest logistics", value: "Chumphon town", icon: "hotel" },
      { label: "Critical handover", value: "Confirm the pier", icon: "ship" },
    ],
  },
  quickAnswer: {
    eyebrow: "First choose the trip shape",
    title: "Chumphon is worth staying for—when the mainland has a role",
    paragraphs: [
      "Chumphon is known as a gateway to Koh Tao, but that description hides its long mainland coast, local night-market life, seafood and access to Mu Ko Chumphon National Park. It suits travellers who prefer quieter southern beaches or want a calm buffer before an island crossing.",
      "One night works as a careful transport handover. Two or three nights allow town food, a mainland beach and either a marine-park excursion or a slower coast day. A returning marine trip and a one-way Koh Tao ferry are different journeys; confirm which one you are booking.",
      "The best area depends on the first and last movement. Town is practical for rail, food and mixed transfers. Thung Wua Laen prioritises beach time north of town. Sairee and Pak Nam suit southern coast or pier logistics, but only when the exact operator and departure point match.",
    ],
    verdicts: [
      { label: "Is Chumphon worth it?", value: "Yes, for 2+ nights", description: "Give the mainland food, coast and one deliberate sea or beach day.", icon: "sparkles" },
      { label: "Only transferring?", value: "Stay 1 careful night", description: "Choose the base from arrival time and confirmed pier transfer—not a generic city label.", icon: "ship" },
      { label: "Best beach base", value: "Thung Wua Laen", description: "A quieter beach rhythm, with extra planning needed for town and pier journeys.", icon: "waves" },
      { label: "Main safety check", value: "Sea + operator", description: "Reconfirm weather, sailing, pickup and the exact pier shortly before travel.", icon: "compass" },
    ],
  },
  zones: [
    {
      slug: "chumphon-town",
      name: "Chumphon town",
      kicker: "Rail, food and flexible handovers",
      image: "/images/redesign/chumphon-city-night-market.webp",
      imageAlt: "Evening food stalls and local street life in Chumphon town",
      summary:
        "Town is the most adaptable base for railway arrivals, night-market food and onward transport. It gives a late arrival somewhere useful to land without pretending the beach or pier is outside every hotel.",
      bestFor: "One-night transfers, food-led stays, rail travellers and uncertain weather.",
      tradeoff: "This is not the beach base. Include the road transfer when planning swimming, marine trips or a ferry departure.",
    },
    {
      slug: "thung-wua-laen",
      name: "Thung Wua Laen",
      kicker: "Mainland beach stay",
      image: "/images/redesign/chumphon-destination-hero.webp",
      imageAlt: "Open sand and calm-looking morning coast at Thung Wua Laen near Chumphon",
      summary:
        "The long beach north of town is Chumphon's clearest mainland-holiday base. It works for slow mornings and beach-focused accommodation, subject to live sea and weather conditions.",
      bestFor: "Two- or three-night stays, couples, quiet beach time and travellers not leaving at dawn.",
      tradeoff: "Town, airport and piers require arranged transport; never assume a hotel transfer is included.",
    },
    {
      slug: "sairee-pak-nam",
      name: "Sairee & Pak Nam",
      kicker: "Southern coast and pier geography",
      image: "/images/redesign/chumphon-marine-route.webp",
      imageAlt: "Fishing coast, pier route and small islands south of Chumphon",
      summary:
        "The southern coast carries memorial, fishing-community and marine-route context. It can simplify selected departures, but pier names and operators remain specific rather than interchangeable.",
      bestFor: "Confirmed early departures, southern coast drives and travellers using a private transfer.",
      tradeoff: "A location near one pier may be wrong for another. Verify the ticket, pickup and departure point directly.",
    },
    {
      slug: "mu-ko-chumphon",
      name: "Mu Ko Chumphon",
      kicker: "A returning marine day",
      image: "/images/redesign/chumphon-marine-route.webp",
      imageAlt: "Boat route through islands of Mu Ko Chumphon National Park",
      summary:
        "A marine-park day can include island scenery, snorkelling and a return to the mainland. It is not the same product as travelling onward to Koh Tao, and conditions, access and inclusions need a live check.",
      bestFor: "Travellers staying on the mainland who want one organised sea day.",
      tradeoff: "Sea state, visibility, park access and operator standards change; no date guarantees a snorkelling day.",
    },
  ],
  highlights: [
    {
      eyebrow: "Town evening",
      title: "Let the night market make the transfer night useful",
      image: "/images/redesign/chumphon-city-night-market.webp",
      imageAlt: "Chumphon night market with food stalls and local diners",
      description:
        "A town overnight can carry its own value through southern curries, seafood and ordinary street life. It also keeps rail and early transfer choices more flexible than a distant resort.",
      decision: "Choose a market that is operating now, ask about ingredients and keep the evening light before an early connection.",
      href: "/city/chumphon/food/",
    },
    {
      eyebrow: "Mainland coast",
      title: "Use Thung Wua Laen as a stay, not a rushed photo stop",
      image: "/images/redesign/chumphon-destination-hero.webp",
      imageAlt: "Quiet mainland beach north of Chumphon town",
      description:
        "The beach makes sense when accommodation, daylight and transport support a slower day. Driving out between a late train and early ferry removes the calm that makes it attractive.",
      decision: "Stay near the coast for two nights, or keep a one-night handover in town instead.",
      href: "/city/chumphon/attractions/",
    },
    {
      eyebrow: "Sea decision",
      title: "Separate marine park from Koh Tao",
      image: "/images/redesign/chumphon-marine-route.webp",
      imageAlt: "Dotted boat route separating Chumphon marine islands from an onward ferry",
      description:
        "One journey returns to Chumphon after a marine day; the other moves your luggage and holiday to Koh Tao. Pickup, pier, baggage and cancellation rules can therefore differ substantially.",
      decision: "Read the current operator details and confirm the exact journey in writing before the travel day.",
      href: "/islands/koh-tao/",
    },
  ],
  featureBanner: {
    image: "/images/redesign/chumphon-marine-route.webp",
    imageAlt: "Chumphon coast with a route toward marine islands and a separate onward waypoint",
    eyebrow: "Two boats, two different trips",
    title: "A marine-park day returns. A Koh Tao ferry changes your base.",
    description:
      "Confirm operator, pier, pickup, luggage and onward arrival rather than booking from the city name alone. The correct handover is more important than an old timetable.",
  },
  food: {
    image: "/images/redesign/chumphon-night-market-food.webp",
    imageAlt: "Southern curry, grilled seafood and local fruit at a Chumphon night market",
    eyebrow: "Southern coast on the plate",
    title: "Make the mainland night taste like a destination",
    description:
      "Chumphon's market food rewards a shared meal before or after the sea. Southern curries can be intense, seafood pricing varies and sauces may contain fish or shrimp; ask before ordering when allergies or dietary rules matter.",
    dishes: [
      { name: "Southern curry", description: "Herbal, spicy curries vary by stall and may use fish, pork, shrimp paste or coconut. Point, ask and start with a smaller portion." },
      { name: "Grilled seafood", description: "Confirm species, portion, preparation and total price before grilling. Current catch matters more than a permanent must-order list." },
      { name: "Local fruit", description: "Season changes the best choice. Buy a small fresh portion and ask the vendor what is ready now rather than expecting year-round orchard availability." },
    ],
  },
  itinerary: {
    eyebrow: "Three days on the mainland",
    title: "Chumphon without turning every hour into a transfer",
    description:
      "Use town for arrival, give one coast a full day and let the final day be either a returning marine excursion or a carefully managed island handover.",
    days: [
      { day: "Day 1", title: "Town arrival & market", description: "Settle near the station or your confirmed pickup corridor, walk the town centre and use one current market for an early southern dinner.", href: "/city/chumphon/food/" },
      { day: "Day 2", title: "Thung Wua Laen or southern coast", description: "Choose one mainland coast from your hotel base and current sea conditions. Do not spend the day crossing town between beaches.", href: "/city/chumphon/attractions/" },
      { day: "Day 3", title: "Marine day or Koh Tao handover", description: "Return to the same mainland bed after a park trip, or move to Koh Tao with luggage and confirmed pier logistics—never assume those bookings are equivalent.", href: "/islands/koh-tao/" },
    ],
  },
  planning: {
    weather: {
      title: "Sea conditions outrank a monthly label",
      summary:
        "Chumphon's coast and marine access vary with monsoon patterns, wind and local weather. A generally favourable period can still contain rough crossings, while a wetter month can contain calm windows.",
      best: "Plan from current marine and weather information",
      tradeoff:
        "Do not treat average rainfall as a sailing guarantee. Reconfirm the operator, official warnings and local sea conditions shortly before departure.",
      href: "/city/chumphon/",
      image: "/images/redesign/chumphon-destination-hero.webp",
      imageAlt: "Changing coastal weather over Chumphon beach",
    },
    transport: {
      title: "Treat airport, station, town and pier as four points",
      summary:
        "Chumphon receives flights, trains and road services, but each arrival still needs a final handover. A through-ticket can simplify the chain only when the operator, pickup, baggage and connection are explicit.",
      facts: [
        "Confirm the exact pier name and operator; 'Chumphon pier' is not precise enough.",
        "Verify whether an airport, station or hotel pickup is included and where staff will meet you.",
        "Keep connection margin for delays and do not combine separate tickets around an ideal timetable.",
        "Check current cancellation and weather policy for any sea journey.",
      ],
      image: "/images/redesign/chumphon-marine-route.webp",
      imageAlt: "Transfer route between Chumphon town, airport, station and coast",
    },
  },
  practicalTips: [
    { icon: "ship", title: "Confirm the exact pier", description: "Match the ticket, operator, pickup and map pin directly; a city-name ticket is not enough." },
    { icon: "waves", title: "Read current sea conditions", description: "Swimming, snorkelling and sailing suitability can change within the same month." },
    { icon: "map", title: "Choose the base first", description: "Town, Thung Wua Laen and Sairee solve different mornings; a cheap room can create an expensive transfer." },
    { icon: "compass", title: "Separate return from onward", description: "A marine excursion returns to the mainland; a ferry moves you and your luggage to another stay." },
  ],
  faqs: [
    { question: "What is Chumphon Thailand known for?", answer: "Chumphon is known as a mainland gateway to Koh Tao, but also for a long Gulf coast, quieter beaches, seafood, local town markets and Mu Ko Chumphon National Park. Its value increases when town, beach and pier are treated as separate places." },
    { question: "Is it worth going to Chumphon?", answer: "Yes for travellers who enjoy quieter coasts, southern food or a calm transition before an island. Stay two or three nights for mainland value; use one night when the trip is strictly a carefully planned handover." },
    { question: "How many days should I spend in Chumphon?", answer: "Two full days or three nights allow town food, one mainland beach and either a marine day or slower coast route. One night is enough only when arrival and confirmed onward transfer align safely." },
    { question: "Is there much to do in Chumphon?", answer: "There is enough for a compact mainland stay: town markets, Thung Wua Laen, southern coastal viewpoints and organised marine trips. The destination is about coast rhythm rather than a dense urban attraction list." },
    { question: "Does Chumphon have a beach?", answer: "Yes. Thung Wua Laen is the best-known mainland beach base, with other coastal areas south of town. Swimming quality and beach conditions depend on current weather, wind and the exact location." },
    { question: "Which area should I stay in Chumphon?", answer: "Choose town for rail, food and flexible transfers; Thung Wua Laen for a genuine beach stay; Sairee or Pak Nam only when the southern coast or a confirmed pier connection shapes the trip." },
    { question: "Is there a train from Bangkok to Chumphon?", answer: "Rail services connect Bangkok and Chumphon, but times, stations and service patterns change. Confirm the current State Railway information and arrange the final hotel or pier transfer separately." },
    { question: "How do I get from Chumphon Airport to the pier?", answer: "The answer depends on the ferry operator and exact pier. Use a current through-transfer or pre-arranged vehicle, confirm the meeting point and baggage terms and leave delay margin." },
    { question: "How do you get from Chumphon to Koh Tao?", answer: "Current ferry and combined-transfer products link Chumphon with Koh Tao. Verify operator, pier, pickup, baggage, weather policy and island arrival; do not rely on an old sailing time." },
    { question: "What is the best time to visit Chumphon?", answer: "There is no guaranteed best month for every beach or sea trip. Use seasonal patterns for the first shortlist, then confirm current forecasts, marine warnings and operator status close to departure." },
  ],
  relatedGuides: [
    { title: "Things to do in Chumphon", description: "Compare town, mainland beaches and returning marine trips.", href: "/city/chumphon/attractions/", image: "/images/redesign/chumphon-destination-hero.webp", imageAlt: "Chumphon mainland coast" },
    { title: "Eat in Chumphon", description: "Use markets, seafood and southern dishes to make the mainland night count.", href: "/city/chumphon/food/", image: "/images/redesign/chumphon-night-market-food.webp", imageAlt: "Chumphon night-market food" },
    { title: "Where to stay in Chumphon", description: "Choose town, Thung Wua Laen or the southern coast from the next connection.", href: "/where-to-stay/chumphon/", image: "/images/redesign/chumphon-city-night-market.webp", imageAlt: "Chumphon town at night" },
  ],
  sources: [
    { title: "Chumphon", creator: "Tourism Authority of Thailand", url: "https://www.tourismthailand.org/Destinations/Provinces/chumphon/350", note: "Official context for the mainland coast, marine park, food and gateway role." },
    { title: "Mu Ko Chumphon National Park", creator: "Department of National Parks", url: "https://www.dnp.go.th/", note: "Primary authority for current national-park notices and access." },
    { title: "State Railway of Thailand", creator: "State Railway of Thailand", url: "https://www.railway.co.th/", note: "Primary source for current rail information; no timetable is frozen here." },
    { title: "Thailand weather", creator: "Thai Meteorological Department", url: "https://www.tmd.go.th/en", note: "Primary source for current coastal weather and warnings." },
  ],
};
