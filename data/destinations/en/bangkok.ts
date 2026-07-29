import type { DestinationGuideData } from "../types";

export const bangkokDestinationGuideEn: DestinationGuideData = {
  citySlug: "bangkok",
  cityName: "Bangkok",
  locale: "en",
  pageTitle: "Bangkok Thailand: first-trip guide & areas 2026",
  pageDescription:
    "Plan Bangkok by neighbourhood, not by a giant checklist. Compare Old Town, riverside, Siam, Silom and Sukhumvit with a practical 4-day route.",
  pageUrl: "https://go2-thailand.com/city/bangkok/",
  dateModified: "2026-07-27",
  coordinates: { latitude: 13.7563, longitude: 100.5018 },
  touristType: ["First-time visitors", "City breaks", "Food travellers", "Culture travellers"],
  stayGuideHref: "/where-to-stay/bangkok/",
  foodGuideHref: "/city/bangkok/food/",
  hero: {
    image: "/images/redesign/bangkok-destination-hero.webp",
    imageAlt: "Chao Phraya River, Thai temple roofs and Bangkok skyline in soft morning light",
    eyebrow: "One capital, several city worlds",
    title: "Bangkok",
    accent: "Thailand",
    subtitle: "Temples, street food and skyline—once you read the city by district.",
    description:
      "Bangkok is not one compact centre. Its royal quarter, river, trading neighbourhoods and modern rail corridors each need a different rhythm. Choose your base first, cluster each day second and let distance stop stealing the trip.",
    imageClassName: "object-cover object-[70%_center] lg:object-center",
    stats: [
      { label: "Strong first base", value: "Silom / Sathorn", icon: "hotel" },
      { label: "Useful first stay", value: "3–4 full days", icon: "calendar" },
      { label: "Planning backbone", value: "Rail + river", icon: "ship" },
    ],
  },
  quickAnswer: {
    eyebrow: "First orient the map",
    title: "Bangkok works in chapters, not in one heroic day",
    paragraphs: [
      "Bangkok is worth visiting when you allow its contrasts to remain visible. The royal island, Chinatown, the Chao Phraya, Siam and Sukhumvit are not interchangeable pins; they are different urban systems connected by rail, river and road.",
      "Three days cover one historical day, one food-and-river day and one modern-city layer. Four days are better for a first trip because weather, heat and weekend-only choices stop competing. Five days are not too long when Bangkok is a destination rather than an airport stop.",
      "The most valuable decision is where each morning begins. A hotel near the rail line, pier or walkable district you will genuinely use can save more time than choosing a room that appears geographically central on a flat map.",
    ],
    verdicts: [
      { label: "Is Bangkok worth it?", value: "Yes—slow the map", description: "Pair one classic day with neighbourhood food and ordinary city life.", icon: "sparkles" },
      { label: "Is 3 days enough?", value: "Yes, with clusters", description: "Keep Old Town, river/Chinatown and the modern corridors separate.", icon: "calendar" },
      { label: "Best first base", value: "Connection first", description: "Silom/Sathorn often balances BTS, MRT, river and evening options.", icon: "hotel" },
      { label: "Biggest time saver", value: "Rail + river", description: "Use each transport system where it is strongest instead of defaulting to road traffic.", icon: "map" },
    ],
  },
  zones: [
    {
      slug: "old-town-riverside",
      name: "Old Town & riverside",
      kicker: "Royal and river Bangkok",
      image: "/images/cities/bangkok/attractions/grand palace/Chakri Maha Prasat, Grand Palace, bangkok thailand.webp",
      imageAlt: "Chakri Maha Prasat inside Bangkok Grand Palace",
      summary:
        "Rattanakosin holds the Grand Palace, Wat Pho and the ferry connection to Wat Arun. The wider riverside adds piers, historic hotels and sunset views. It gives a first visit its historical frame but is not served by BTS at every stop.",
      bestFor: "Temples, history, river atmosphere and travellers who prefer an early cultural start.",
      tradeoff: "Evening variety and rail access depend heavily on the exact street or pier; do not label the entire river one neighbourhood.",
    },
    {
      slug: "chinatown-charoen-krung",
      name: "Chinatown & Charoen Krung",
      kicker: "Food, trade and old shophouses",
      image: "/images/redesign/bangkok-food-yaowarat.webp",
      imageAlt: "Street-food dishes on a table in Bangkok Chinatown",
      summary:
        "Yaowarat, Talat Noi and the old trading corridor shift character through the day. Walk heritage streets before the hottest hours, pause, then return to a compact evening food route rather than chasing famous stalls across the city.",
      bestFor: "Food travellers, photography, urban history and active evenings.",
      tradeoff: "Heat, traffic and narrow pavements reward a short route; the loudest road is not the whole district.",
    },
    {
      slug: "siam",
      name: "Siam & Ratchaprasong",
      kicker: "Central rail and weather buffer",
      image: "/images/cities/bangkok/downtown-bangkok.webp",
      imageAlt: "Modern central Bangkok around Siam",
      summary:
        "Siam is the BTS interchange for shopping, art and indoor breaks. It is useful for short stays and families, and it makes a rain or heat buffer easy without abandoning the day.",
      bestFor: "First-time visitors who prioritise rail, shopping, family convenience or a short stopover.",
      tradeoff: "It feels commercial and busy; Old Town and the river still require a deliberate westward journey.",
    },
    {
      slug: "silom-sathorn",
      name: "Silom & Sathorn",
      kicker: "The all-round first base",
      image: "/images/cities/bangkok/business-district-bangkok.webp",
      imageAlt: "Bangkok skyline around Silom and Sathorn",
      summary:
        "BTS, MRT, the Saphan Taksin river connection, hotels, parks and dinner options sit within one practical corridor. It is less theatrical than a palace view but often reduces daily friction.",
      bestFor: "Couples, mixed itineraries, business-plus-leisure and travellers who value transport choice.",
      tradeoff: "Some business streets feel quiet outside working hours, so choose the micro-location rather than the district name alone.",
    },
    {
      slug: "sukhumvit",
      name: "Lower Sukhumvit",
      kicker: "Hotels, restaurants and nightlife",
      image: "/images/redesign/stay-bangkok-rooftop.webp",
      imageAlt: "Bangkok skyline and rooftop hotel pool along Sukhumvit",
      summary:
        "Lower Sukhumvit offers enormous hotel and restaurant choice along the BTS. It can be highly convenient, but each soi has its own walking distance, nightlife level and street character.",
      bestFor: "Restaurant choice, modern nightlife, frequent BTS use and travellers with a specific hotel in mind.",
      tradeoff: "Sukhumvit is a long corridor, not one compact neighbourhood. A bargain far from a station can cost time every day.",
    },
  ],
  highlights: [
    {
      eyebrow: "Heritage cluster",
      title: "Read palace, temples and river as one story",
      image: "/images/cities/bangkok/attractions/wat arun/watarun.webp",
      imageAlt: "Wat Arun beside the Chao Phraya River in Bangkok",
      description:
        "Grand Palace, Wat Pho, the ferry and Wat Arun form a coherent early-start route. Dress rules, heat and interpretation deserve time; this is not the day to add three distant malls.",
      decision: "Start early, confirm official opening information and build a shaded lunch into the cluster.",
      href: "/city/bangkok/attractions/",
    },
    {
      eyebrow: "Food & streets",
      title: "Let Chinatown change from daylight to dinner",
      image: "/images/blog/24-hours-talad-noi-bangkok-hidden-gem.webp",
      imageAlt: "Historic street and shophouses in Talat Noi, Bangkok",
      description:
        "Talat Noi and Charoen Krung reveal the trading city before Yaowarat becomes an evening food corridor. One linked district shows more than a taxi tour of disconnected viral stalls.",
      decision: "Share dishes, ask about allergens and keep the evening route small enough to walk without rushing.",
      href: "/city/bangkok/food/",
    },
    {
      eyebrow: "Contemporary capital",
      title: "Choose one modern rhythm: art, park, market or skyline",
      image: "/images/blog/chatuchak-market-bangkok-guide.webp",
      imageAlt: "Colourful aisle at Chatuchak Weekend Market in Bangkok",
      description:
        "Bangkok's current life is as important as its monumental past. Match the calendar and weather to Chatuchak, a green-space circuit, a museum, a design district or a skyline evening.",
      decision: "Use Chatuchak only when its current trading days fit; otherwise choose a modern layer that works now.",
      href: "/blog/chatuchak-market-bangkok-guide/",
    },
  ],
  featureBanner: {
    image: "/images/redesign/bangkok-zones-banner.webp",
    imageAlt: "Bangkok river and skyline connecting historic and modern districts at sunset",
    eyebrow: "Build a city backbone",
    title: "Your hotel map decides how much Bangkok you actually experience.",
    description:
      "Choose river, BTS or MRT as the daily backbone before comparing rooms. A cheap rate loses its advantage when every morning begins with a long road transfer.",
  },
  food: {
    image: "/images/redesign/bangkok-food-yaowarat.webp",
    imageAlt: "Noodle soup, grilled seafood and crisp oyster omelette in Bangkok",
    eyebrow: "Eat by neighbourhood",
    title: "Bangkok is a food system, not one best restaurant",
    description:
      "Morning markets, specialist lunch shops, food courts and hot evening streets run on different clocks. Choose one area, share several small dishes and ask what is in the stock, sauce and cooking oil when dietary needs matter.",
    dishes: [
      { name: "Kuay jab", description: "Rolled rice noodles in peppery broth, strongly associated with Bangkok's Thai-Chinese food culture. Broth and toppings vary, so confirm pork and offal if relevant." },
      { name: "Hoy tod", description: "A crisp oyster or mussel omelette from a hot griddle. Share one while it is fresh and confirm shellfish handling if allergies matter." },
      { name: "Khao man gai", description: "Poached chicken, fragrant rice, broth and ginger sauce show how a Bangkok specialist can refine one deceptively simple dish." },
    ],
  },
  itinerary: {
    eyebrow: "Four days, four city logics",
    title: "A first Bangkok route without crossing the map all day",
    description:
      "Move the order around rain and weekends, but keep the clusters intact. River belongs with Old Town, Chinatown with Charoen Krung and the modern corridors with rail.",
    days: [
      { day: "Day 1", title: "Rattanakosin & the river", description: "Begin early at the Grand Palace and Wat Pho, cross to Wat Arun and finish with an unhurried river ride or dinner near your chosen pier.", href: "/city/bangkok/attractions/" },
      { day: "Day 2", title: "Talat Noi, Charoen Krung & Yaowarat", description: "Walk old trading streets before a long pause, then let the evening move naturally toward a compact Chinatown tasting route.", href: "/city/bangkok/food/" },
      { day: "Day 3", title: "Siam, Silom & a green reset", description: "Combine art or shopping around Siam with Lumpini or Benjakitti, then end in Silom, Sathorn or by the river. Rail keeps the shape realistic.", href: "/city/bangkok/attractions/lumpini-park/" },
      { day: "Day 4", title: "Weekend market or one deeper neighbourhood", description: "Choose Chatuchak when the current calendar fits. Otherwise use the day for Bang Kachao, a museum, a slower local district or the modern layer you skipped.", href: "/blog/chatuchak-market-bangkok-guide/" },
    ],
  },
  planning: {
    weather: {
      title: "Plan Bangkok around heat, rain and air quality",
      summary:
        "Bangkok is warm and humid throughout the year. Roughly November to February is often easier for long outdoor blocks; hotter months demand earlier starts, while wetter months reward flexible indoor alternatives.",
      best: "Easiest general window: November–February",
      tradeoff:
        "A drier month is not automatically cool, quiet or pollution-free. Check the current forecast and air quality, then move temple walks or parks rather than forcing a stored plan.",
      href: "/city/bangkok/weather/",
      image: "/images/cities/bangkok/redesign/bangkok-weather-hero.webp",
      imageAlt: "Bangkok skyline under tropical weather",
    },
    transport: {
      title: "Use rail, river, road and walking as a toolkit",
      summary:
        "BTS is strongest along modern corridors, MRT connects more of the old and new city, boats serve the Chao Phraya and road transport fills the gaps. No single mode solves Bangkok; the route should change mode only when geography justifies it.",
      facts: [
        "Choose accommodation within a realistic walk of the station or pier you will genuinely use.",
        "Cluster Old Town by half or full day because BTS does not stop beside every temple.",
        "Use metered or app-based road transport where practical and verify the vehicle and route before departure.",
        "Allow extra margin for airport and onward connections rather than storing an ideal traffic time.",
      ],
      image: "/images/redesign/bangkok-route-planning.webp",
      imageAlt: "Travellers planning Bangkok between train and riverboat",
    },
  },
  practicalTips: [
    { icon: "map", title: "Distance is not travel time", description: "A few kilometres can be slow in traffic. Plan by district, station and pier instead of drawing the shortest line on the map." },
    { icon: "sun", title: "Move the day around the heat", description: "Use mornings for exposed temples and markets, midday for a museum or long lunch and evenings for food or skyline views." },
    { icon: "compass", title: "Carry temple-ready clothing", description: "Rules vary by site. Bring a light shoulder-and-knee covering and check current official entry information before leaving." },
    { icon: "sparkles", title: "Stay alert, not alarmed", description: "Protect valuables, reject unexpected 'closed attraction' detours and use a direct trusted ride at night when the street feels wrong." },
  ],
  faqs: [
    { question: "What is Bangkok Thailand best known for?", answer: "Bangkok is known for its royal and Buddhist heritage, the Chao Phraya River, Thai-Chinese trading districts, street food and a modern metropolis built around rail, malls, parks and nightlife. A first trip works best when it includes at least one historical, one neighbourhood-food and one contemporary-city layer." },
    { question: "What are the must-dos in Bangkok?", answer: "Build one early Old Town and river day around the Grand Palace, Wat Pho and Wat Arun; spend one evening in a focused food district such as Chinatown; then add a modern park, market, museum or skyline experience. This structure is more useful than a universal top-ten list." },
    { question: "Is 3 days in Bangkok enough?", answer: "Yes, if you cluster carefully: Old Town and river, Chinatown and Charoen Krung, then Siam/Silom or another modern corridor. Four days add a valuable buffer for weather, a weekend market or a slower neighbourhood." },
    { question: "Is 5 days too long in Bangkok?", answer: "No. Five days suit travellers who enjoy food, cities, art and local neighbourhoods, or who want a recovery day after a long flight. It may feel long only when every day repeats temples, malls or cross-city transfers." },
    { question: "What is the best area to stay in Bangkok for tourists?", answer: "There is no universal best area. Silom/Sathorn is a strong all-round base; Siam prioritises central rail and shopping; Old Town or riverside suits heritage; lower Sukhumvit suits hotel choice, dining and nightlife. Choose the connection and evening rhythm that match your itinerary." },
    { question: "Is Siam or Sukhumvit better?", answer: "Siam is more compact for central BTS connections, shopping and family-friendly indoor options. Lower Sukhumvit offers broader hotel, restaurant and nightlife choice. Check the exact walking distance to a station because both labels cover different micro-locations." },
    { question: "Is Bangkok Old Town a good place to stay?", answer: "Yes for temples, river access and historic atmosphere, especially with early starts. It is less convenient when most evenings and appointments are along the BTS corridors. Check the nearest MRT stop or pier rather than assuming all Old Town hotels share the same access." },
    { question: "Can I use Grab in Bangkok?", answer: "App-based rides operate in Bangkok, but availability, pickup points, traffic and pricing change. Verify the driver and vehicle in the app, choose a safe pickup location and keep rail or river transport as the better option when congestion is heavy." },
    { question: "Is Bangkok a walkable city?", answer: "Bangkok is walkable within selected neighbourhoods, not as one continuous centre. Heat, crossings, pavement quality and long distances make a rail-or-river transfer between compact walking clusters more realistic." },
    { question: "Which is the best month to go to Bangkok?", answer: "Many first-time visitors find the generally cooler, drier stretch from November to February easier for outdoor days. There is no guaranteed best month: current heat, rain, air quality, crowds and your priorities matter more than a label." },
  ],
  relatedGuides: [
    { title: "Things to do in Bangkok", description: "Build temple, river, market and neighbourhood days without crossing the city at random.", href: "/city/bangkok/attractions/", image: "/images/cities/bangkok/attractions/grand palace/Chakri Maha Prasat, Grand Palace, bangkok thailand.webp", imageAlt: "Grand Palace in Bangkok" },
    { title: "Where to stay in Bangkok", description: "Compare areas by transport, evening rhythm and the trip you actually want.", href: "/where-to-stay/bangkok/", image: "/images/redesign/stay-bangkok-rooftop.webp", imageAlt: "Bangkok hotel pool and skyline" },
    { title: "Bangkok street food", description: "Explore dishes and food districts, then choose a practical tasting route.", href: "/city/bangkok/food/", image: "/images/redesign/bangkok-food-yaowarat.webp", imageAlt: "Bangkok street-food dishes" },
  ],
  sources: [
    { title: "Bangkok", creator: "Tourism Authority of Thailand", url: "https://www.tourismthailand.org/Destinations/Provinces/bangkok/219", note: "Official destination context for heritage, markets, museums, parks and the modern city." },
    { title: "MRT system map", creator: "Bangkok Expressway and Metro", url: "https://metro.bemplc.co.th/MRT-System-Map?lang=en", note: "Primary source for the current MRT network; routes and fares can change." },
    { title: "Practical information", creator: "The Grand Palace — Bureau of the Royal Household", url: "https://www.royalgrandpalace.th/en/visit/practical-information", note: "Primary source for current entry, dress and visitor rules." },
    { title: "Thailand weather", creator: "Thai Meteorological Department", url: "https://www.tmd.go.th/en", note: "Primary source for current heat, rain and weather warnings." },
  ],
};
