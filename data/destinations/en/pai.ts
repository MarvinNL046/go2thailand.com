import type { DestinationGuideData } from "../types";

export const paiDestinationGuideEn: DestinationGuideData = {
  citySlug: "pai",
  cityName: "Pai",
  locale: "en",
  pageTitle: "Pai Thailand: 3-day route without a scooter 2026",
  pageDescription:
    "Plan Pai by valley zone: compare town and countryside stays, travel from Chiang Mai, build a 3-day route and explore safely with or without a scooter.",
  pageUrl: "https://go2-thailand.com/city/pai/",
  dateModified: "2026-07-27",
  coordinates: { latitude: 19.3582, longitude: 98.4404 },
  touristType: ["Slow travellers", "Couples", "Backpackers", "Mountain routes"],
  stayGuideHref: "/where-to-stay/pai/",
  foodGuideHref: "/city/pai/food/",
  hero: {
    image: "/images/redesign/pai-destination-hero.webp",
    imageAlt: "Pai valley at sunrise with rice fields, low mist and mountain ridges",
    eyebrow: "A small northern town inside a broad mountain valley",
    title: "Pai",
    accent: "Thailand",
    subtitle: "Come for three nights—not for a scooter checklist between two vans.",
    description:
      "Pai sits in Mae Hong Son Province, northwest of Chiang Mai. Town is compact; waterfalls, canyon, hot springs and villages are spread across winding roads. The trip works when arrival gets its own day and every valley route has a safe return.",
    imageClassName: "object-cover object-[58%_center] lg:object-center",
    stats: [
      { label: "Useful first stay", value: "3 nights", icon: "calendar" },
      { label: "Walkable core", value: "Pai town", icon: "map" },
      { label: "No-scooter option", value: "Driver / shared tour", icon: "car" },
    ],
  },
  quickAnswer: {
    eyebrow: "First answer: where and why Pai",
    title: "Pai is worth visiting when the valley gets more time than the road",
    paragraphs: [
      "Pai is a small town in northern Thailand’s Mae Hong Son Province, reached from Chiang Mai by a winding mountain road. It is famous for its relaxed centre, evening Walking Street, cafés and a valley dotted with viewpoints, hot springs, waterfalls and villages. Tourism is visible; that does not make the landscape or local communities less real.",
      "Three nights are a strong first visit. Day one absorbs the mountain transfer and town; day two covers one southern route such as canyon and hot-spring country; day three uses a northern or western route. A day trip from Chiang Mai spends too much time on curves and too little time in Pai.",
      "You can enjoy Pai without a scooter. Stay in town, walk the evening layer, pre-book a local driver or shared day route and choose accommodation with a confirmed transfer. Riding only makes sense with the correct licence, insurance, helmet and real experience; the Chiang Mai–Pai road is not a beginner lesson.",
    ],
    verdicts: [
      { label: "Is Pai worth visiting?", value: "Yes, for 3 nights", description: "Best for valley scenery, slow mornings and travellers comfortable with a tourist town.", icon: "sparkles" },
      { label: "Pai or Chiang Mai?", value: "Different chapters", description: "Chiang Mai offers city depth; Pai offers a smaller valley rhythm and longer road access.", icon: "compass" },
      { label: "Without a scooter?", value: "Absolutely possible", description: "Use a walkable base, driver or shared route and organise each return before departure.", icon: "car" },
      { label: "Main safety error", value: "Learning to ride here", description: "A rental shop handover does not create licence, experience or insurance cover.", icon: "map" },
    ],
  },
  zones: [
    {
      slug: "pai-town",
      name: "Pai town & Walking Street",
      kicker: "The walkable, practical first base",
      image: "/images/redesign/pai-food-walking-street.webp",
      imageAlt: "Pai Walking Street food stalls in warm evening light",
      summary:
        "The centre gives you restaurants, cafés, small shops, evening food and the easiest transport handovers. It is the strongest no-scooter base and the safest place to leave arrival day unplanned. Choose a side street or river edge when quiet sleep matters more than stepping directly into the night market.",
      bestFor: "First visits, no-scooter trips, short stays, solo travellers and anyone arriving late.",
      tradeoff: "The centre is the most visibly touristic part of Pai and can be noisy. Check the exact room location, not only the hotel name.",
    },
    {
      slug: "south-valley",
      name: "South valley & Pai Canyon",
      kicker: "Views, hot springs and exposed ridges",
      image: "/images/redesign/pai-canyon-route.webp",
      imageAlt: "Narrow orange ridge and layered valley view at Pai Canyon",
      summary:
        "Pai Canyon and several popular stops lie south of town on the Chiang Mai road. The canyon has exposed, eroded ridges rather than a protected viewing deck everywhere. Keep to a safe viewpoint, turn around before footing or crowds feel wrong and never make sunset worth a dark return on an unfamiliar vehicle.",
      bestFor: "A half or full day with arranged transport, dry footing and travellers comfortable around exposed terrain.",
      tradeoff: "Popular sunset timing concentrates people on narrow paths. Heat, rain and low light can change the same viewpoint quickly.",
    },
    {
      slug: "north-west-valley",
      name: "North & west valley",
      kicker: "Waterfalls, villages and longer return logic",
      image: "/images/redesign/pai-valley-riverside-v2.webp",
      imageAlt: "Green Pai valley and quiet riverside landscape beneath mountains",
      summary:
        "Waterfalls, rural roads and cultural stops north or west of town form a separate route. Water level, swimming and access vary by season. Visit villages as living communities, ask before photographing people and spend with local businesses without treating homes as a set.",
      bestFor: "A third day, private driver, small shared tour and travellers wanting a calmer valley layer.",
      tradeoff: "Pins are spread out and return options can be thin. Confirm the driver, meeting point and final ride before leaving town.",
    },
    {
      slug: "riverside-countryside",
      name: "Riverside & countryside stays",
      kicker: "Quiet only when transport is solved",
      image: "/images/redesign/pai-valley-riverside-v2.webp",
      imageAlt: "Low-key riverside accommodation in the Pai valley",
      summary:
        "A valley or riverside stay buys quieter mornings and space, but may turn every meal and evening into a ride. Compare actual road quality, lighting, shuttle, breakfast and the final return from Walking Street before choosing a beautiful remote pin.",
      bestFor: "Couples, longer stays, private transport and travellers prioritising quiet over nightlife.",
      tradeoff: "A cheap remote room can become expensive or restrictive once multiple daily rides are included.",
    },
  ],
  highlights: [
    {
      eyebrow: "Arrival is a real day",
      title: "Let the Chiang Mai road end before the sightseeing begins",
      image: "/images/redesign/pai-destination-hero.webp",
      imageAlt: "Mountain road opening into the Pai valley",
      description:
        "The drive or van journey is curve-heavy and can cause motion sickness. Arrive, check in, hydrate and use town on foot. A canyon sunset immediately after the transfer only adds another road, exposed terrain and a dark return.",
      decision: "Treat Walking Street and an early night as a complete arrival plan, not as wasted time.",
      href: "/where-to-stay/pai/",
    },
    {
      eyebrow: "No-scooter Pai",
      title: "Build one booked valley loop at a time",
      image: "/images/redesign/pai-valley-riverside-v2.webp",
      imageAlt: "Driver-friendly valley route through fields around Pai",
      description:
        "Stay within the walkable centre, then use a local driver or a small shared route for one geographic loop. Agree stops, waiting time, total price and return. This is not a reduced Pai experience; it is a better option than riding beyond licence or skill.",
      decision: "Choose south or north-west for the day instead of paying a driver to cross the valley repeatedly.",
      href: "/city/pai/attractions/",
    },
    {
      eyebrow: "Canyon with limits",
      title: "Keep the view; skip the exposed-ridge performance",
      image: "/images/redesign/pai-canyon-route.webp",
      imageAlt: "Safe broad viewpoint before narrow exposed paths at Pai Canyon",
      description:
        "A good visit does not require walking every narrow ridge. Use the first safe viewpoints, keep children close, avoid wet or crumbling edges and leave before darkness removes depth perception. Drones and commercial activity depend on current rules.",
      decision: "If crowds, wind, rain or footwear make the ridge uncomfortable, turn around without negotiating with the photograph.",
      href: "/city/pai/attractions/",
    },
  ],
  featureBanner: {
    image: "/images/redesign/pai-canyon-route.webp",
    imageAlt: "Dotted route from Pai town through the southern valley to a safe canyon viewpoint",
    eyebrow: "One valley, three useful rhythms",
    title: "Town tonight. South tomorrow. North-west after that.",
    description: "Grouping Pai by direction makes a driver affordable, a scooter unnecessary and the return safer before the mountain valley turns dark.",
  },
  food: {
    image: "/images/redesign/pai-food-walking-street.webp",
    imageAlt: "Small plates and northern Thai food at Pai Walking Street",
    eyebrow: "An evening made for small portions",
    title: "Use Walking Street as dinner—without confusing variety with local depth",
    description:
      "Pai’s evening market mixes northern Thai snacks with food shaped by an international visitor scene. Sample small portions, then seek one proper northern meal. Ask about fish sauce, shrimp paste, pork stock, peanuts, dairy and shared cooking surfaces instead of trusting a broad vegan or gluten-free label.",
    dishes: [
      { name: "Khao soi", description: "Northern curry noodles often contain chicken or beef, coconut milk and a curry base that may use shrimp paste or fish sauce. Ask about broth and toppings." },
      { name: "Sai ua", description: "Herb-rich northern sausage with pork and spices. Check chilli level and shared grill surfaces when allergies matter." },
      { name: "Walking Street tastings", description: "Buy one or two small items at a time and favour visible turnover. International choice is part of modern Pai, but not every stall represents local cuisine." },
    ],
  },
  itinerary: {
    eyebrow: "Three nights, no valley race",
    title: "Pai with a no-scooter route built in",
    description: "Arrival absorbs the mountain road. The next two days use separate geographic loops and confirmed returns.",
    days: [
      { day: "Arrival", title: "Check in and keep the evening walkable", description: "Use town, riverside and Walking Street after the curve-heavy transfer. Confirm tomorrow’s driver or shared route before bed and avoid adding an unfamiliar ride after dark.", href: "/where-to-stay/pai/" },
      { day: "Day 1", title: "South valley at a safe pace", description: "Choose a hot spring or landscape stop, allow a long lunch and visit Pai Canyon only while footing, weather and light are good. Return before darkness.", href: "/city/pai/attractions/" },
      { day: "Day 2", title: "North or west valley", description: "Pick one waterfall and one community or countryside stop around current access. Ask permission before photographing and keep swimming dependent on local conditions.", href: "/city/pai/attractions/" },
      { day: "Departure", title: "Protect the Chiang Mai connection", description: "Use the morning in town, eat lightly if motion sickness is likely and leave margin before a flight or train. The van arrival time is not a guaranteed airport handover.", href: "/transport/" },
    ],
  },
  planning: {
    weather: {
      title: "Cool mornings, smoke risk and wet-road decisions",
      summary: "Cooler months are popular for valley mornings; nights can feel cold in exposed or simple accommodation. Late dry-season smoke can reduce visibility and affect health. Rain makes roads, canyon ridges and waterfall access more demanding.",
      best: "Choose from current visibility, road and air-quality conditions—not an annual sunset promise.",
      tradeoff: "A famous viewpoint has little value in severe haze, and a dry town street does not guarantee safe waterfall or canyon footing.",
      href: "/city/pai/best-time-to-visit/",
      image: "/images/redesign/pai-destination-hero.webp",
      imageAlt: "Pai valley under changing mist and seasonal visibility",
    },
    transport: {
      title: "Pai without a scooter is a complete plan",
      summary: "Shared vans, buses or private transfers link Chiang Mai and Pai on a winding road. In town, walking covers the central layer; a driver or shared tour covers grouped valley routes. A motorcycle requires the correct licence, explicit insurance and experience.",
      facts: [
        "A day trip from Chiang Mai repeats the curve-heavy road and leaves little useful Pai time.",
        "Motion sickness can affect any vehicle; choose a seat, meal and medication only from appropriate personal or medical advice.",
        "Do not learn scooter control on Pai’s roads, and never assume a rental desk has validated your legal or insurance status.",
        "For a driver, agree the exact loop, waiting time, final price and town return before leaving.",
      ],
      image: "/images/redesign/pai-canyon-route.webp",
      imageAlt: "Road route through the southern Pai valley",
    },
  },
  practicalTips: [
    { icon: "car", title: "Do not learn to ride here", description: "Use a driver or shared route when licence, insurance or experience is uncertain." },
    { icon: "map", title: "Group by valley side", description: "Town, south and north-west are three useful rhythms that reduce repeated roads." },
    { icon: "sun", title: "Leave the canyon before dark", description: "Exposed ridges, crowds and poor depth perception make the last light a weak safety bargain." },
    { icon: "sparkles", title: "Treat villages as homes", description: "Ask before photographing people or property and spend with transparent local businesses." },
  ],
  faqs: [
    { question: "Is Pai worth visiting, Thailand?", answer: "Yes if you enjoy a small tourist town, mountain scenery, slow mornings and spread-out valley trips. Spend around three nights. Pai is less suitable when you dislike winding transfers, visible tourism or the need to arrange transport beyond town." },
    { question: "Why is Pai so famous?", answer: "Pai combines a compact evening town with a broad northern valley of viewpoints, hot springs, waterfalls and villages. Its long-standing backpacker and café scene made it internationally visible, while the winding Chiang Mai road adds to its distinct identity." },
    { question: "Is Pai or Chiang Mai better?", answer: "Chiang Mai offers much greater cultural, food and city depth; Pai offers a smaller valley rhythm and countryside routes. They work well together. Choose Chiang Mai for a short first northern stay and add Pai when three extra nights and the road fit." },
    { question: "How long should you stay in Pai?", answer: "Three nights is a balanced first visit: arrival and town, one southern-valley day and one north or west route. Two nights works with one excursion; a day trip from Chiang Mai spends too much time travelling." },
    { question: "Is Pai full of tourists?", answer: "Tourism is prominent in the centre, especially around Walking Street and popular viewpoints. Quieter streets and countryside stays exist, but remoteness changes transport. Visit respectfully rather than expecting an untouched village built around visitors." },
    { question: "Can you get around Pai without a scooter?", answer: "Yes. Stay in the walkable centre, use a local driver or shared day tour for one grouped valley route and confirm the return before leaving. A no-scooter plan is safer and often more relaxing than riding without the right licence or skill." },
    { question: "Is the road from Chiang Mai to Pai safe?", answer: "It is a paved but winding mountain road where weather, traffic, driver behaviour and motion sickness matter. No road is universally safe. Use a reputable current operator, wear a seat belt where provided and avoid self-riding without mountain experience and legal cover." },
    { question: "How do I get from Chiang Mai to Pai?", answer: "Current choices typically include shared van or bus and private transfer. Service points and times change. Compare the exact Chiang Mai departure, Pai drop-off, luggage and cancellation rules, and protect margin before onward flights or trains." },
    { question: "Can I do a day trip to Pai from Chiang Mai?", answer: "Technically yes, but it is rarely a good first plan because the same winding road consumes much of the day. Stay at least two nights; three lets arrival remain calm and supports two coherent valley routes." },
    { question: "Where is the best place to stay in Pai?", answer: "Choose central Pai for walking, food and no-scooter convenience. Choose riverside or countryside for quieter mornings only when shuttle, road lighting and evening return are solved. Verify the exact map pin before booking." },
  ],
  relatedGuides: [
    { title: "Things to do in Pai", description: "Compare town, south and north-west routes without a scooter-first checklist.", href: "/city/pai/attractions/", image: "/images/redesign/pai-canyon-route.webp", imageAlt: "Pai Canyon and southern valley route" },
    { title: "Where to stay in Pai", description: "Choose town, riverside or valley around noise and actual transport.", href: "/where-to-stay/pai/", image: "/images/redesign/pai-valley-riverside-v2.webp", imageAlt: "Quiet valley stay near Pai" },
    { title: "Best time for Pai", description: "Compare cool mornings, rain, visibility and air-quality risk.", href: "/city/pai/best-time-to-visit/", image: "/images/redesign/pai-destination-hero.webp", imageAlt: "Seasonal visibility in Pai valley" },
  ],
  sources: [
    { title: "Mae Hong Son destination", creator: "Tourism Authority of Thailand", url: "https://www.tourismthailand.org/Destinations/Provinces/Mae-Hong-Son/106", note: "Official province context for Pai and Mae Hong Son landscapes." },
    { title: "Thailand road safety", creator: "World Health Organization", url: "https://www.who.int/thailand/health-topics/road-safety", note: "Primary safety context supporting conservative self-drive advice." },
    { title: "Air quality Thailand", creator: "Pollution Control Department", url: "https://air4thai.pcd.go.th/", note: "Primary source for current particulate and smoke conditions." },
    { title: "Thailand weather", creator: "Thai Meteorological Department", url: "https://www.tmd.go.th/en", note: "Primary source for current valley and road forecasts." },
  ],
};
