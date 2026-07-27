import type { DestinationGuideData } from "../types";

export const sukhothaiDestinationGuideEn: DestinationGuideData = {
  citySlug: "sukhothai",
  cityName: "Sukhothai",
  locale: "en",
  pageTitle: "Sukhothai Thailand: temples, route & travel guide 2026",
  pageDescription:
    "Plan Sukhothai by park zone: choose Old or New Sukhothai, cycle a realistic temple route and compare Si Satchanalai, Ayutthaya and transport.",
  pageUrl: "https://go2-thailand.com/city/sukhothai/",
  dateModified: "2026-07-27",
  coordinates: { latitude: 17.0078, longitude: 99.8237 },
  touristType: ["Cultural travellers", "Slow travellers", "Cyclists", "Bangkok–Chiang Mai routes"],
  stayGuideHref: "/best-hotels/sukhothai/",
  foodGuideHref: "/city/sukhothai/food/",
  hero: {
    image: "/images/redesign/sukhothai-destination-hero.webp",
    imageAlt: "Wat Mahathat ruins reflected in a pond at Sukhothai Historical Park",
    eyebrow: "One former capital, three loops, a slower rhythm",
    title: "Sukhothai",
    accent: "Thailand",
    subtitle: "A temple city that becomes clearer when you stop treating it as one hot afternoon.",
    description:
      "Old Sukhothai, New Sukhothai, the outer temple zones and Si Satchanalai solve different travel problems. Two nights protect one full park day; a third creates room for Wat Si Chum, the western ruins or a separate heritage extension.",
    imageClassName: "object-cover object-[64%_center] lg:object-center",
    stats: [
      { label: "Useful first stay", value: "2–3 nights", icon: "calendar" },
      { label: "Easiest park base", value: "Old Sukhothai", icon: "hotel" },
      { label: "Rail gateway", value: "Phitsanulok", icon: "car" },
    ],
  },
  quickAnswer: {
    eyebrow: "First decide: stopover or heritage chapter",
    title: "Sukhothai is worth visiting when you give it at least two nights",
    paragraphs: [
      "The central zone of Sukhothai Historical Park is compact enough for an unhurried bicycle loop. Wat Mahathat, ponds, moats, walls and smaller monuments make sense together. Wat Si Chum sits in the northern zone; the western and other outer temples add distance, exposed roads and a different heat calculation.",
      "Old Sukhothai is the practical base when the historical park is the reason for the trip. New Sukhothai, farther east on the Yom River, offers more local town life, transport and food but adds a transfer to every park visit. The cheapest room is not necessarily the cheapest or calmest base once those journeys are included.",
      "Two nights create one complete park day between arrival and departure. A third lets you divide the northern and western zones or devote a proper day to Si Satchanalai. Ayutthaya is generally easier as a short Bangkok extension; Sukhothai fits more naturally into a route through lower northern Thailand.",
    ],
    verdicts: [
      { label: "Is Sukhothai worth it?", value: "Yes, from 2 nights", description: "Strong for heritage, cycling and a slower stop between Bangkok and northern Thailand.", icon: "sparkles" },
      { label: "Time in the main park", value: "One full day", description: "Central zone plus Wat Si Chum without forcing the hottest hours.", icon: "calendar" },
      { label: "Ayutthaya or Sukhothai?", value: "Let the route decide", description: "Ayutthaya is easier; Sukhothai is roomier and better placed on a northbound journey.", icon: "compass" },
      { label: "Main planning error", value: "Old is not New", description: "The two bases are separate and create very different mornings, evenings and transfers.", icon: "map" },
    ],
  },
  zones: [
    {
      slug: "old-sukhothai-central-zone",
      name: "Old Sukhothai & central zone",
      kicker: "Best first base and clearest opening loop",
      image: "/images/redesign/sukhothai-destination-hero.webp",
      imageAlt: "Central monuments and water at Sukhothai Historical Park in soft morning light",
      summary:
        "The central zone gives the clearest introduction to Wat Mahathat, the historic water system, city walls and the visual language of Sukhothai architecture. Staying near Old Town makes an early start, midday break and return for softer light possible without crossing between towns twice.",
      bestFor: "First visits, two-night stays, cycling, families who need breaks and travellers choosing the park over nightlife.",
      tradeoff:
        "Food and evening choice are narrower than in New Sukhothai. Check the actual map pin: a hotel labelled simply ‘Sukhothai’ is not automatically near the historical park entrance.",
    },
    {
      slug: "north-west-outer-zones",
      name: "North, west & outer temples",
      kicker: "Wat Si Chum and longer distances",
      image: "/images/redesign/sukhothai-wat-si-chum.webp",
      imageAlt: "Phra Achana Buddha framed by the mondop opening at Wat Si Chum",
      summary:
        "Wat Si Chum and its monumental Phra Achana anchor the northern zone. The northern, western and other outer ruins do not form one compact loop. Choose an extra zone for its history, light and fit with your energy instead of treating every separate entrance as compulsory.",
      bestFor: "Respectful photography, art history, a second half day and visitors wanting more context than Wat Mahathat alone.",
      tradeoff:
        "Distance, traffic sections, exposed roads and separate access make an all-zones bicycle day harder. A tuk-tuk, driver or guide can be the more sensible option outside the centre.",
    },
    {
      slug: "new-sukhothai",
      name: "New Sukhothai",
      kicker: "Town life, markets and onward transport",
      image: "/images/redesign/sukhothai-noodles.webp",
      imageAlt: "Bowl of Sukhothai noodles with lime, peanuts and sliced green beans",
      summary:
        "New Sukhothai is the modern town on the Yom River, with the bus terminal, markets and a broader local food scene. It works as a budget or onward-travel base, but it is less convenient for dawn, midday breaks and the final light inside the historical park.",
      bestFor: "Budget travellers, local dinners, bus connections and visitors who want a working town beside the monuments.",
      tradeoff:
        "Every park day needs road transport. Confirm the current final return before eating late in Old Town or waiting for sunset near the ruins.",
    },
    {
      slug: "si-satchanalai",
      name: "Si Satchanalai",
      kicker: "A second historic city, not an extra zone",
      image: "/images/redesign/sukhothai-si-satchanalai.webp",
      imageAlt: "Laterite ruins and a bicycle path among trees in Si Satchanalai Historical Park",
      summary:
        "UNESCO describes Si Satchanalai as the spiritual centre and an important ceramic-export centre of the same historic kingdom. Its wooded ruins and quieter scale feel different from Sukhothai, but the journey makes it a separate day or overnight rather than a quick add-on.",
      bestFor: "A third night, repeat visitors, ceramics and heritage, road trips and travellers who value space over a full checklist.",
      tradeoff:
        "Build a real out-and-back plan. Do not combine Si Satchanalai, every Sukhothai zone and Kamphaeng Phet merely because all three share one World Heritage inscription.",
    },
  ],
  highlights: [
    {
      eyebrow: "Read the city before collecting temples",
      title: "Start with Wat Mahathat, water and the central plan",
      image: "/images/redesign/sukhothai-destination-hero.webp",
      imageAlt: "Wat Mahathat and historic water features in central Sukhothai",
      description:
        "Begin with the visitor context or museum, then cycle the central loop. Wat Mahathat, ponds, canals, walls and causeways show why UNESCO recognises a planned historic landscape and water-management system, not just a cluster of photogenic ruins.",
      decision:
        "Leave time to dismount and read. A good guide or audio explanation creates more value than a route built only around saved photo pins.",
      href: "/city/sukhothai/attractions/",
    },
    {
      eyebrow: "Scale needs stillness",
      title: "Give Wat Si Chum its own northern loop",
      image: "/images/redesign/sukhothai-wat-si-chum.webp",
      imageAlt: "Monumental Phra Achana visible through the narrow opening of Wat Si Chum",
      description:
        "The enormous seated Phra Achana changes as the mondop opening frames it on approach. The architectural effect and continuing religious meaning disappear when Wat Si Chum becomes one rushed pin among twenty.",
      decision:
        "Cover shoulders and knees, speak quietly, never climb on monuments and avoid poses that turn a revered Buddha image into a prop.",
      href: "/city/sukhothai/attractions/",
    },
    {
      eyebrow: "One inscription, another city",
      title: "Add Si Satchanalai only when it gives the journey room",
      image: "/images/redesign/sukhothai-si-satchanalai.webp",
      imageAlt: "Green cycling route through the ruins of Si Satchanalai",
      description:
        "Si Satchanalai belongs to the same World Heritage property but tells a more wooded story shaped by monasteries and ceramic production. Its distance is the reason to slow down, not a challenge to overcome with an overloaded day.",
      decision:
        "Use a complete extra day or a separate overnight. Save Kamphaeng Phet for another route when combining all three mainly creates road hours.",
      href: "/city/sukhothai/attractions/",
    },
  ],
  featureBanner: {
    image: "/images/redesign/sukhothai-cycling-central.webp",
    imageAlt: "Bicycle on a quiet route past ponds and temples in Sukhothai Historical Park",
    eyebrow: "Cycle for meaning, not numbers",
    title: "One historical park. Three useful loops. No temple race.",
    description:
      "Use the central zone as the first readable route, add Wat Si Chum as a northern loop and choose western ruins only when heat, time and transport agree. Cycling should remain part of the experience, not a contest with the map.",
  },
  food: {
    image: "/images/redesign/sukhothai-noodles.webp",
    imageAlt: "Sukhothai rice noodles with pork, sliced beans, peanuts and lime",
    eyebrow: "A destination you can taste",
    title: "Begin with the noodles, then let the market set the menu.",
    description:
      "Kuay tiao Sukhothai is the clearest local starting point: thin rice noodles, pork, peanuts, sliced green beans, lime and a sweet-sour-spicy balance. Khao poep adds a second regional story around Si Satchanalai. Ingredients and heat vary by cook, so the dish name is never a complete allergy answer.",
    dishes: [
      { name: "Kuay tiao Sukhothai", description: "Order it with broth or dry and notice the lime, peanut, bean and chilli balance. Ask explicitly about peanuts, fish sauce, stock and shared preparation when an allergy or diet matters." },
      { name: "Khao poep", description: "A steamed rice sheet wrapped around vegetables, sometimes called Phra Ruang noodles. It belongs naturally in a Si Satchanalai food and craft day rather than a generic top-ten list." },
      { name: "New Town market rhythm", description: "Try small portions, fruit and stalls with visible turnover. Treat online opening times as changeable and ask locally what is active that evening." },
    ],
  },
  itinerary: {
    eyebrow: "Two nights minimum; a third creates range",
    title: "Sukhothai without temple fatigue",
    description:
      "Two nights protect one full historical-park day. Add a third for north and west or Si Satchanalai, not to make the same central loop denser.",
    days: [
      { day: "Arrival", title: "Choose the base before choosing dinner", description: "Check in near Old Town when the park is the priority; choose New Town for markets, buses and town life. Arrange the next morning's bicycle or driver before the evening ends.", href: "/best-hotels/sukhothai/" },
      { day: "Day 1", title: "Central zone in two calm rhythms", description: "Start early around Wat Mahathat and the water system, pause during peak heat and return for softer light. Protect time for interpretation rather than photographing every monument.", href: "/city/sukhothai/attractions/" },
      { day: "Day 2", title: "Wat Si Chum plus one outer decision", description: "Build a northern loop around Wat Si Chum, then choose either the western zone or New Town. A third gate adds no value when attention and energy have already gone.", href: "/city/sukhothai/attractions/" },
      { day: "Extra day", title: "Si Satchanalai as a complete story", description: "Plan road transport, explore the historical park slowly and connect the ruins with the ceramics story. Stay nearby if the same-day return makes the route too compressed.", href: "/city/sukhothai/attractions/" },
    ],
  },
  planning: {
    weather: {
      title: "Cooler mornings matter more than finding a perfect month",
      summary:
        "November to February usually creates the easiest outdoor rhythm. The exposed zones become demanding in the hot season; greener wet-season landscapes can come with short heavy rain and slippery surfaces. Shade differs by route, so plan around time of day as well as temperature.",
      best: "Easiest cycling rhythm: roughly November–February",
      tradeoff:
        "Dry does not mean cool, and wet season does not make every park day impossible. Check the Thai Meteorological Department, local warnings and the hourly forecast close to travel.",
      href: "/city/sukhothai/best-time-to-visit/",
      image: "/images/redesign/sukhothai-cycling-central.webp",
      imageAlt: "Shaded bicycle route beside water in Sukhothai Historical Park",
    },
    transport: {
      title: "Sukhothai has an airport, but no railway station",
      summary:
        "Intercity buses and vans reach Sukhothai; flights use Bangkok Airways' Sukhothai Airport near Sawankhalok. Rail travellers normally connect by road from Phitsanulok. Timetables, operating routes, terminals and final transfers can change, so verify each live leg with the operator.",
      facts: [
        "Sukhothai Airport is not beside the historical park. Confirm the airline, baggage, arrival transfer and final hotel before treating a short flight as a short door-to-door journey.",
        "A rail itinerary via Phitsanulok has two distinct legs. Protect connection time and do not rely on one old blog schedule for the final bus or van.",
        "For Bangkok–Sukhothai–Chiang Mai, a continuous land route can be more logical than returning through Bangkok by air. Compare total journey time, not only time inside the vehicle.",
      ],
      image: "/images/redesign/sukhothai-si-satchanalai.webp",
      imageAlt: "Long route through the green heritage landscape of Sukhothai Province",
    },
  },
  practicalTips: [
    { icon: "map", title: "Zones are real distances", description: "Do not flatten central, north and west into one map pin. Choose each half day around heat, light and a safe return." },
    { icon: "compass", title: "Cycle with a plan B", description: "Check brakes, tyres, lights and lock. Switch to a tuk-tuk or driver when heat, traffic, children or mobility make outer-zone cycling unwise." },
    { icon: "sun", title: "The break belongs in the route", description: "Carry water, sun protection and breathable clothing. Use lunch, a museum or the hotel for the most exposed hours." },
    { icon: "sparkles", title: "Heritage remains sacred", description: "Cover shoulders and knees, never climb or touch images and follow signs and local instructions over a photograph." },
  ],
  faqs: [
    { question: "Is Sukhothai, Thailand worth visiting?", answer: "Yes, especially for World Heritage, cycling and a slower northbound route. Give it at least two nights so one full park day sits between arrival and departure. Add a third for the outer zones or Si Satchanalai." },
    { question: "Why was Sukhothai abandoned?", answer: "The old capital did not disappear in one simple event. Its political importance declined as Ayutthaya expanded, and settlement and administration shifted over time. The monumental core survived as a revered historic landscape; modern New Sukhothai developed separately to the east." },
    { question: "How far is Bangkok from Sukhothai?", answer: "Sukhothai is roughly 430 kilometres north of Bangkok by road, but the useful comparison is total journey time. Check the current bus, a flight plus airport transfer, or a train to Phitsanulok plus road connection for your exact date and hotel." },
    { question: "How many days do you need in Sukhothai?", answer: "Spend at least two nights for one complete park day. Three nights are better when you want to divide the northern and western zones or visit Si Satchanalai as a separate day. Trying all zones during one arrival or departure day usually creates heat and transfer pressure." },
    { question: "What is the best time to visit Sukhothai?", answer: "The cooler, relatively drier period from roughly November to February usually makes cycling and exposed ruins easier. Heat, rain and air quality vary by day and year, so check the Thai Meteorological Department and local warnings shortly before travel." },
    { question: "How do you get around Sukhothai historical park?", answer: "A bicycle is useful in the compact central zone when the weather, bicycle and current park rules fit. The north and west add distance and exposed road sections. A tuk-tuk, driver or guide is often calmer for outer zones, children or limited mobility." },
    { question: "What makes Sukhothai historically significant?", answer: "UNESCO recognises Sukhothai and its associated towns for the early development of Siamese architecture, art, writing, administration and sophisticated water management. The value lies in the planned landscape and connected historic cities, not only individual temple ruins." },
    { question: "Which is older, Ayutthaya or Sukhothai?", answer: "Sukhothai predates Ayutthaya as a major Siamese capital. For a present-day trip, Ayutthaya is easier from Bangkok, while Sukhothai offers a more spacious cycling landscape on a route toward northern Thailand. Historical age alone does not decide which fits your itinerary." },
    { question: "Where to sleep in Sukhothai?", answer: "Sleep near Old Sukhothai when early park access, cycling and a midday break are priorities. Choose New Sukhothai for the bus terminal, markets and a broader local food scene. Confirm the exact map pin before booking because a Sukhothai address does not guarantee park proximity." },
    { question: "How do I get from Sukhothai to Sukhothai Historical Park?", answer: "First check whether ‘Sukhothai’ means New Town, Old Town or the airport. From New Sukhothai you need current road transport to the park; from an Old Town hotel it may be walkable or cyclable. Confirm the live return option before waiting until closing time." },
  ],
  relatedGuides: [
    { title: "Things to do in Sukhothai", description: "Compare temple zones, museum context, cycling loops and extensions by meaning and distance.", href: "/city/sukhothai/attractions/", image: "/images/redesign/sukhothai-wat-si-chum.webp", imageAlt: "Wat Si Chum as the northern anchor of Sukhothai" },
    { title: "Food in Sukhothai", description: "Start with Sukhothai noodles, follow the market and place Si Satchanalai dishes in their own route.", href: "/city/sukhothai/food/", image: "/images/redesign/sukhothai-noodles.webp", imageAlt: "Local Sukhothai noodles with lime and peanuts" },
    { title: "Where to stay in Sukhothai", description: "Choose Old Town or New Town around your real park, market and transport rhythm.", href: "/best-hotels/sukhothai/", image: "/images/redesign/sukhothai-destination-hero.webp", imageAlt: "Historical park base near Old Sukhothai" },
  ],
  sources: [
    { title: "Historic Town of Sukhothai and Associated Historic Towns", creator: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/574/", note: "Primary heritage context for the three historic towns, Sukhothai style, water management, ceramics and protection." },
    { title: "Sukhothai", creator: "Tourism Authority of Thailand", url: "https://www.tourismthailand.org/Destinations/Provinces/Sukhothai/114", note: "Official province context for the historical park, Wat Si Chum, Wat Mahathat, Si Satchanalai and crafts." },
    { title: "Sukhothai Airport", creator: "Bangkok Airways", url: "https://www.bangkokair.com/sukhothai-airport", note: "Primary source for the airport's operator and Sawankhalok location; live flights still require an airline search." },
    { title: "Weather forecasts and warnings", creator: "Thai Meteorological Department", url: "https://www.tmd.go.th/en", note: "Primary source for current forecast, rain, heat and official weather warnings." },
    { title: "Thailand travel advice", creator: "UK Foreign, Commonwealth & Development Office", url: "https://www.gov.uk/foreign-travel-advice/thailand", note: "Current safety, entry and local-law context for UK readers; check again close to travel." },
  ],
};
