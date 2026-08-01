import type { DestinationGuideData } from "../types";

export const nakhonPhanomDestinationGuideEn: DestinationGuideData = {
  citySlug: "nakhon-phanom",
  cityName: "Nakhon Phanom",
  locale: "en",
  pageTitle: "Nakhon Phanom Thailand Guide: Mekong Route & Sights",
  pageDescription:
    "Plan Nakhon Phanom around its Mekong riverfront, Vietnamese heritage, local breakfast and Wat Phra That Phanom, with a realistic 2–3-night route.",
  pageUrl: "https://go2-thailand.com/city/nakhon-phanom/",
  dateModified: "2026-07-27",
  coordinates: { latitude: 17.4108, longitude: 104.7786 },
  touristType: ["Mekong travellers", "Culture travellers", "Food lovers", "Slow city breaks"],
  stayGuideHref: "/best-hotels/nakhon-phanom/",
  foodGuideHref: "/city/nakhon-phanom/food/",
  hero: {
    image: "/images/redesign/nakhon-phanom-hero.webp",
    imageAlt: "Nakhon Phanom Mekong promenade, golden naga and Lao mountains at sunrise",
    eyebrow: "A Mekong city with a cross-border story",
    title: "Nakhon Phanom",
    accent: "Thailand",
    subtitle: "A river city whose view is shaped by the other bank.",
    description:
      "Nakhon Phanom sits on the west bank of the Mekong in Isaan, directly opposite the limestone mountains around Thakhek in Laos. The Thai city is flat and unhurried: cycle the promenade, read its Vietnamese and Catholic heritage, start early with pak mor, and treat Wat Phra That Phanom as a separate excursion. Two nights give the city room; three suit the temple route or a confirmed festival day.",
    imageClassName: "object-cover object-[62%_center] lg:object-center",
    stats: [
      { label: "Good first stay", value: "2–3 nights", icon: "calendar" },
      { label: "Best first base", value: "By the Mekong", icon: "hotel" },
      { label: "Strongest pairing", value: "River & heritage", icon: "waves" },
    ],
  },
  quickAnswer: {
    eyebrow: "Separate city, province and Laos",
    title: "Nakhon Phanom is worth visiting when rhythm matters more than a checklist",
    paragraphs: [
      "Nakhon Phanom is both a province and its capital in northeast Thailand. Daily life in the city is framed by the broad Mekong, Lao mountain silhouettes, low historic buildings, active temples and a promenade made for walking and cycling. The name is commonly translated as 'city of mountains', yet the dramatic peaks seen from town rise on the Lao side. That contrast is the appeal: a cross-border view from a compact, flat Thai city.",
      "Begin near the Vietnamese Memorial Clock Tower, Wat Okat Si Bua Ban and Wat Mahathat. Then move deliberately towards Saint Anna Nong Saeng and Ban Na Chok for the Vietnamese and Catholic layer that also appears at breakfast. Wat Phra That Phanom is not in the city centre; it stands farther south in That Phanom District. Give this living sacred place its own half or full day rather than treating it as another pin in a riverside walk.",
      "Two nights fit an arrival evening, one complete city day and a slow departure morning. Choose three when you want Ban Na Chok, Wat Phra That Phanom or a seasonal festival without haste. There are fewer ready-made tours and less international nightlife than in Thailand's major hubs. In return, Nakhon Phanom offers a strong morning rhythm, unusually pleasant public space and food shaped by Lao, Isaan and Vietnamese communities.",
    ],
    verdicts: [
      { label: "Worth visiting?", value: "Yes, for slow travel", description: "Strong for Mekong light, cycling, living heritage and local breakfast.", icon: "sparkles" },
      { label: "How long?", value: "2–3 nights", description: "Two for the city; three with That Phanom or a festival plan.", icon: "calendar" },
      { label: "Best first base", value: "Riverfront & clock tower", description: "Useful for sunset, old streets, temples and food.", icon: "map" },
      { label: "Biggest mistake", value: "Calling it all one place", description: "City, province, That Phanom and border crossing need different travel time.", icon: "compass" },
    ],
  },
  zones: [
    {
      slug: "riverfront-clock-tower",
      name: "Riverfront & clock tower",
      kicker: "The logical first city base",
      image: "/images/redesign/nakhon-phanom-clock-tower.webp",
      imageAlt: "Vietnamese Memorial Clock Tower and old shophouses in Nakhon Phanom",
      summary:
        "The Vietnamese Memorial Clock Tower, low shophouses, Walking Street area and Mekong promenade form the easiest orientation. Go early for local morning life and return near sunset when the mountains across the river become more defined. The promenade is long enough for a real walk or cycle, but the richer experience combines the view with architecture, coffee and small temple stops.",
      bestFor: "First visitors, sunset, cycling, food, compact evening walks and a hotel with few transport changes.",
      tradeoff:
        "Walking Street, markets, cruises and events do not necessarily run every day or at one year-round time. Verify the current evening, start point and return plan instead of copying an old blog schedule.",
    },
    {
      slug: "temples-saint-anna",
      name: "Wat Mahathat & Saint Anna",
      kicker: "Buddhist and Catholic heritage along one river",
      image: "/images/redesign/nakhon-phanom-saint-anna.webp",
      imageAlt: "Saint Anna Nong Saeng Catholic Church beside the Mekong in Nakhon Phanom",
      summary:
        "Wat Mahathat and Wat Okat Si Bua Ban show how active Buddhist places remain part of everyday city life. Saint Anna Nong Saeng adds a Catholic and Vietnamese migration layer. Together they explain why Nakhon Phanom feels culturally different from a generic provincial capital, but they are spread along more riverfront than a single photo map suggests.",
      bestFor: "Religious architecture, local history, respectful photography and multiple faith traditions in context.",
      tradeoff:
        "These are active places of worship. Dress appropriately, give services and offerings priority, and never assume interior access or photography. Cycling is pleasant in cooler weather; local transport is wiser in heat or heavy rain.",
    },
    {
      slug: "ban-na-chok-vietnamese-heritage",
      name: "Ban Na Chok & Vietnamese heritage",
      kicker: "An outer stop that explains the city",
      image: "/images/redesign/nakhon-phanom-ho-chi-minh-house.webp",
      imageAlt: "Wooden house and fruit trees at Ho Chi Minh's House in Ban Na Chok",
      summary:
        "Ho Chi Minh's House in Ban Na Chok lies outside the compact river core and preserves material memory of his time in Thailand and the region's Vietnamese community. Read the simple house, garden and objects as part of migration and anti-colonial Asian history, not as an isolated celebrity museum. The same community story is visible in the city's architecture and Vietnamese-Thai breakfast dishes.",
      bestFor: "Twentieth-century history, Vietnamese diaspora, small-scale heritage and context over spectacle.",
      tradeoff:
        "Arrange the outward and return ride and check current access. Several memorial presentations exist in the wider area, so verify the exact map pin rather than assuming every 'Ho Chi Minh site' is the same place.",
    },
    {
      slug: "wat-phra-that-phanom",
      name: "Wat Phra That Phanom",
      kicker: "A separate temple journey south of the city",
      image: "/images/redesign/nakhon-phanom-phra-that-phanom.webp",
      imageAlt: "White and gold stupa of Wat Phra That Phanom with worshippers",
      summary:
        "Phra That Phanom is one of the middle Mekong region's most important living relic stupas. Archaeology points to an early phase around the seventh or eighth century, while religious tradition describes a much older origin. Its current form reflects centuries of restoration, devotion and regional cooperation, including reconstruction after the 1975 collapse.",
      bestFor: "Buddhist heritage, architecture, regional history and travellers making time for a living sacred place.",
      tradeoff:
        "The temple stands in That Phanom District, not on the city boulevard. It remains on UNESCO's Tentative List and is not an inscribed World Heritage Site. Recheck ceremonies, modest-dress expectations, transport and current UNESCO status.",
    },
  ],
  highlights: [
    {
      title: "Read the mountains across the river as part of the city",
      eyebrow: "A flat Thai bank with a Lao backdrop",
      image: "/images/redesign/nakhon-phanom-hero.webp",
      imageAlt: "Wide Mekong and the limestone mountains of Laos seen from Nakhon Phanom",
      description:
        "The most recognisable mountain shapes rise around Thakhek in Laos, while Nakhon Phanom city itself sits flat on the western Mekong bank. The promenade therefore works as public space and an everyday border landscape. Cycle slowly, notice temples and older buildings on the Thai side, and watch light, cloud and river level reshape the Lao silhouette.",
      decision:
        "Keep one sunrise or sunset free of another attraction. Crossing to Laos is a separate international decision requiring current immigration, transport and insurance checks, not a spontaneous extension of the promenade.",
      href: "/city/nakhon-phanom/attractions/",
    },
    {
      title: "Use breakfast to enter the Vietnamese heritage story",
      eyebrow: "Pak mor, khai kratha and more than 'Isaan food'",
      image: "/images/redesign/nakhon-phanom-food.webp",
      imageAlt: "Khai kratha, pak mor, fresh herbs and coffee for breakfast in Nakhon Phanom",
      description:
        "Nakhon Phanom combines Isaan and Lao flavours with dishes that Vietnamese communities made local. Pak mor—filled steamed rice sheets—and khai kratha—eggs cooked in a small pan with meat—fit an early route. The useful question is not which modern border owns a dish, but how recipes and eating habits changed along the Mekong.",
      decision:
        "Go early, order small and share. Ask specifically about pork, fish, fermented sauce, peanuts and stock when diet or allergy matters; a vegetable garnish does not make a dish vegetarian.",
      href: "/city/nakhon-phanom/food/",
    },
    {
      title: "Plan Lai Ruea Fai only around a confirmed programme",
      eyebrow: "Illuminated boats at the end of Buddhist Lent",
      image: "/images/redesign/nakhon-phanom-lai-ruea-fai.webp",
      imageAlt: "Illuminated festival boat during Lai Ruea Fai on the Mekong in Nakhon Phanom",
      description:
        "The illuminated boat procession is one of Nakhon Phanom's defining cultural events. Communities create large light boats with religious and regional motifs while ceremonies, markets and activities fill the river city near the end of Buddhist Lent. It is not an everyday evening attraction, and dates, route and duration vary by year.",
      decision:
        "Book only after official dates are published, expect crowds and road closures, and choose a hotel within walking distance of the confirmed river section. Religious observance and local access take priority over a photograph.",
      href: "/travel-guides/festivals-events-thailand/",
    },
  ],
  featureBanner: {
    image: "/images/redesign/nakhon-phanom-route-banner.webp",
    imageAlt: "Traveller cycling along Nakhon Phanom's Mekong promenade at sunset",
    eyebrow: "The river is the route",
    title: "Build one complete Mekong day before adding the province.",
    description:
      "Riverfront, temples, church, clock tower and breakfast form one coherent city story. Ban Na Chok and That Phanom become stronger as deliberate outer stops with their own transport and time block.",
  },
  food: {
    image: "/images/redesign/nakhon-phanom-food.webp",
    imageAlt: "Vietnamese-Thai breakfast with pak mor, khai kratha, fresh herbs and coffee",
    eyebrow: "Morning carries the migration story",
    title: "Begin with rice sheets, eggs and fresh herbs beside the Mekong.",
    description:
      "Local food is a major reason not to reduce Nakhon Phanom to a border stop. Vietnamese, Lao and Isaan influences sit together: soft rice sheets and herbs, eggs and sausage in a small pan, spicy larb and sticky rice. Many strong places specialise in breakfast or lunch. A late start can miss both dishes and the city's most characteristic rhythm.",
    dishes: [
      { name: "Pak mor / bánh cuốn style", description: "Thin steamed rice sheets wrap a savoury filling and arrive with fried garlic, herbs and sauce. Spelling, filling and presentation vary. Ask about pork, dried shrimp, fish or oyster sauce and peanuts rather than ordering by appearance." },
      { name: "Khai kratha", description: "Eggs cook in a small metal pan with toppings such as minced meat and Vietnamese sausage. It is warm, quick and well suited to an early start. Treat meats, sauces and shared preparation as separate dietary checks." },
      { name: "Larb ped & sticky rice", description: "Duck larb combines chopped meat with toasted rice, lime, chilli and herbs. Heat and offal vary by kitchen. Ask for fully cooked meat, adjust chilli and share it with sticky rice and vegetables." },
    ],
  },
  itinerary: {
    eyebrow: "One compact city, two deliberate outer choices",
    title: "A Nakhon Phanom itinerary that reads the map honestly",
    description:
      "The promenade and historic city fit one full day. Ban Na Chok and Wat Phra That Phanom require road transport. A major festival replaces a normal itinerary rather than sitting on top of it.",
    days: [
      { day: "Arrival", title: "Check in beside the river and read the light", description: "Choose a base near the riverfront or clock tower. Take a short Mekong orientation walk, verify which market or Walking Street is actually active, and confirm breakfast, access and transport for the next day.", href: "/best-hotels/nakhon-phanom/" },
      { day: "Day 1", title: "Clock tower, temples, church and Vietnamese breakfast", description: "Start with pak mor or khai kratha, then cycle or walk through the historic river zone and visit Wat Okat or Wat Mahathat. Give Saint Anna its own route block and return to the promenade before sunset.", href: "/city/nakhon-phanom/attractions/" },
      { day: "Day 2", title: "Choose Ban Na Chok or Wat Phra That Phanom", description: "Choose Ban Na Chok for twentieth-century history or That Phanom for a major religious and architectural visit. Combine them only with arranged transport, confirmed access and enough time outside the vehicle.", href: "/transport/" },
      { day: "Extra day", title: "Deepen the city or continue on Route 212", description: "Use the extra day for food, photography and slow river time, or continue deliberately south towards Mukdahan. Crossing to Laos requires a separate border and document check.", href: "/city/mukdahan/" },
    ],
  },
  planning: {
    weather: {
      title: "A cooler riverfront does not remove heat or rain",
      summary:
        "November through February usually brings the easiest combination of lower humidity, less rain and comfortable morning and evening blocks. March and April can be very hot. Rainy season adds storms and higher river levels but also fuller green landscapes and a more dramatic Mekong.",
      best: "Often most comfortable: Nov–Feb",
      tradeoff:
        "A climate table cannot predict a festival evening, cycle ride or road condition. Check the live provincial forecast and TMD warnings, change outdoor trips during storms and keep temples, cafes, museums and food stops as real weather alternatives.",
      href: "/weather/",
      image: "/images/redesign/nakhon-phanom-hero.webp",
      imageAlt: "The Mekong at Nakhon Phanom in calm morning light beneath clouds over Laos",
    },
    transport: {
      title: "The airport is direct; temple and border routes are not",
      summary:
        "Nakhon Phanom Airport handles domestic passenger flights and can be the quickest arrival from Bangkok when the live schedule fits. No passenger train reaches the city. Long-distance buses and Route 212 connect other Mekong and Isaan cities. Walk or cycle much of the core, but plan every outer stop with a return journey.",
      facts: [
        "Check current flights with the Department of Airports and airline. Compare Bangkok departure airport, luggage, waiting time and hotel transfer—not flight time alone.",
        "For Wat Phra That Phanom, Ban Na Chok and outer districts, agree the exact pin, total price, waiting time and return ride. App transport is not equally available at every outer stop.",
        "The Third Thai–Lao Friendship Bridge supports international travel, but entry rules, visas, bridge transport and insurance can change. Recheck official Thai and Lao sources instead of relying on old ferry or visa-on-arrival reports.",
      ],
      image: "/images/redesign/nakhon-phanom-route-banner.webp",
      imageAlt: "Mekong cycle route with the mountains of Laos across the river",
    },
  },
  practicalTips: [
    { icon: "map", title: "Check city or district", description: "Wat Phra That Phanom is not downtown and Ban Na Chok is not a promenade stop. Check district, map pin and real road time before combining hotel, driver and itinerary." },
    { icon: "waves", title: "Let the Mekong set the pace", description: "Plan good light early or late and use the hottest block for food or indoor context. Stay away from slippery edges and closed areas during high water or storms." },
    { icon: "food", title: "Eat before lunch", description: "Many characteristic breakfasts and family businesses work early. Save several options, verify current opening and order by ingredients rather than an old ranked list." },
    { icon: "car", title: "Make Laos a separate travel day", description: "A river view is not a border formality. Check passport, visa, insurance, bridge transport and opening with official sources before building a crossing." },
  ],
  faqs: [
    { question: "What is Nakhon Phanom?", answer: "Nakhon Phanom is a city and province in Isaan, northeast Thailand. The capital lies on the west bank of the Mekong opposite Thakhek in Laos. It is known for its long river promenade, Buddhist and Vietnamese heritage, local breakfast and access to Wat Phra That Phanom." },
    { question: "Is Nakhon Phanom in Isan?", answer: "Yes. Nakhon Phanom lies on Isaan's eastern edge where the Mekong forms the border with Laos. Lao, Vietnamese and several local community influences appear in language, ritual, architecture and food." },
    { question: "How do you get to Nakhon Phanom?", answer: "Fly domestically to Nakhon Phanom Airport, take a long-distance bus or drive along the Isaan road network. There is no passenger train to the city. Compare live schedules by total door-to-door time and arrange the last transfer to the riverfront." },
    { question: "Does Nakhon Phanom have an airport?", answer: "Yes. Nakhon Phanom Airport is an operating domestic passenger airport. Routes and frequencies change, so confirm current departures with the Department of Airports and the airline and arrange the airport-to-hotel transfer separately." },
    { question: "Was Nakhon Phanom airport in the Vietnam War?", answer: "The present airport area is associated with the former Royal Thai Air Force base used by United States forces during the Vietnam War era. That history should be separated from today's civilian passenger service and researched through specialist military-history sources when detail matters." },
    { question: "What language do they speak in Nakhon?", answer: "Thai is the official and most practical language. Isaan and Lao-related varieties are also heard, and some families preserve other local or Vietnamese linguistic heritage. English is not universal, so keep Thai addresses and an offline translation tool." },
    { question: "What to do in Nakhon Phanom?", answer: "Walk or cycle the Mekong promenade, explore the clock-tower district, visit active Buddhist temples and Saint Anna church, eat a Vietnamese-influenced breakfast, and choose Ban Na Chok or Wat Phra That Phanom as a separate outer trip. Allow two to three nights." },
    { question: "What is the best time to visit Nakhon Phanom?", answer: "November through February is usually most comfortable for walking, cycling and temples. March and April are hotter, while rainy season brings storms and higher river levels. Check the Thai Meteorological Department for your actual travel week." },
    { question: "What is the local food like in Nakhon Phanom?", answer: "Local food combines Isaan and Lao flavours with Vietnamese-Thai dishes such as pak mor and khai kratha. Start early, then add larb, sticky rice and fresh herbs. Ask about stock, fish sauce, fermented fish, peanuts, pork and shared preparation when diet or allergy matters." },
    { question: "What makes Wat Phra That Phanom unique?", answer: "It is a major living relic stupa revered across the middle Mekong region. Archaeology, religious tradition, centuries of restoration and reconstruction after its 1975 collapse all shape the site. It is on UNESCO's Tentative List, not the inscribed World Heritage List." },
  ],
  relatedGuides: [
    { title: "Things to do in Nakhon Phanom", description: "Compare riverfront, temples, Vietnamese heritage and That Phanom by time and distance.", href: "/city/nakhon-phanom/attractions/", image: "/images/redesign/nakhon-phanom-phra-that-phanom.webp", imageAlt: "Wat Phra That Phanom as a major excursion from Nakhon Phanom" },
    { title: "Where to stay in Nakhon Phanom", description: "Choose direct river views, the clock-tower area or a more practical city base.", href: "/best-hotels/nakhon-phanom/", image: "/images/redesign/nakhon-phanom-clock-tower.webp", imageAlt: "Historic river quarter of Nakhon Phanom as a stay zone" },
    { title: "Continue along the Mekong to Mukdahan", description: "Follow Route 212 to another Isaan river city with its own markets and border context.", href: "/city/mukdahan/", image: "/images/cities/generated/mukdahan.webp", imageAlt: "Mukdahan as a possible next Mekong city" },
  ],
  sources: [
    { title: "Nakhon Phanom", creator: "Tourism Authority of Thailand", url: "https://www.tourismthailand.org/Destinations/Provinces/Nakhon-Phanom/579", note: "Official province context for the Mekong setting, mountains across the river, cultural diversity and food." },
    { title: "Ho Chi Minh's House (Ban Na Chok)", creator: "Tourism Authority of Thailand", url: "https://www.tourismthailand.org/Attraction/ho-chi-minh-s-house-ban-na-chok", note: "Official attraction context for the house, garden and historic objects; access should be checked locally." },
    { title: "Phra That Phanom, its related historic buildings and associated landscape", creator: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/tentativelists/6183/", note: "Current Tentative List status, archaeological phases, collapse, reconstruction and living regional veneration." },
    { title: "Nakhon Phanom Illuminated Boat Procession", creator: "Tourism Authority of Thailand", url: "https://www.tourismthailand.org/Events-and-Festivals/nakhon-phanom-illuminated-boat-procession", note: "Official event context; dates and programme must be checked again for the actual travel year." },
    { title: "Nakhon Phanom Airport", creator: "Department of Airports Thailand", url: "https://tfic.airports.go.th/lcd/?p=TUW", note: "Official operating airport and live flight-information source." },
    { title: "Nakhon Phanom", creator: "Thaizer", url: "https://www.thaizer.com/nakhon-phanom/", note: "Competitor city-depth and route reference; time-sensitive logistics were not copied as current facts." },
    { title: "Nakhon Phanom travel guide", creator: "Rough Guides", url: "https://www.roughguides.com/thailand/northeast-isaan/nakhon-phanom/", note: "Competitor border, festival and city-context reference; older service details remain subject to official verification." },
    { title: "Nakhon Phanom weather", creator: "Thai Meteorological Department", url: "https://tmd.go.th/en/weather/province/nakhon-phanom", note: "Current provincial forecast and warnings for heat, rain and storms." },
  ],
};
