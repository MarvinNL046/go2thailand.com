import type { DestinationGuideData } from "../types";

export const lampangDestinationGuideEn: DestinationGuideData = {
  citySlug: "lampang",
  cityName: "Lampang",
  locale: "en",
  pageTitle: "Lampang Thailand Guide: Old City, Temples & Route",
  pageDescription:
    "Plan Lampang city, Kad Kong Ta, Ko Kha and one province day with an honest 2-night route, train advice, local food and elephant-welfare checks.",
  pageUrl: "https://go2-thailand.com/city/lampang/",
  dateModified: "2026-07-27",
  coordinates: { latitude: 18.2888, longitude: 99.4909 },
  touristType: ["Northern Thailand travellers", "Culture travellers", "Rail travellers", "Slow travellers"],
  stayGuideHref: "/best-hotels/lampang/",
  foodGuideHref: "/city/lampang/food/",
  hero: {
    image: "/images/redesign/lampang-destination-hero.webp",
    imageAlt: "Historic riverside buildings and the white Ratsadaphisek Bridge beside the Wang River in Lampang",
    eyebrow: "Old trading city, Northern Line stop and a province that needs choices",
    title: "Lampang",
    accent: "Thailand at river pace",
    subtitle: "Come for timber, tracks and ceramics—not a quieter copy of Chiang Mai.",
    description:
      "Lampang rewards at least two nights. Walk the Wang River and Kad Kong Ta, read the teak and temple layers around Tha Ma O, then choose Ko Kha or one farther province day. The white mountain pagodas, Chae Son and the elephant centre are not city sights, and treating them as one checklist turns a thoughtful stop into a long windscreen day.",
    imageClassName: "object-cover object-[66%_center] lg:object-center",
    stats: [
      { label: "Strong first stay", value: "2–3 nights", icon: "calendar" },
      { label: "Best city base", value: "Wang River", icon: "hotel" },
      { label: "Natural arrival", value: "Northern Line", icon: "car" },
    ],
  },
  quickAnswer: {
    eyebrow: "Choose the city before the province",
    title: "Lampang is worth visiting when the journey itself matters",
    paragraphs: [
      "Lampang is not one enclosed old town. Its strongest city story runs along the Wang River, Kad Kong Ta and the older trading neighbourhoods around Tha Ma O. Chinese, Burmese, Shan, Lanna and European influences appear in shopfronts, timber houses, temples and bridges rather than one monumental square. That makes the city best for travellers willing to walk slowly and connect details.",
      "Two nights create a useful stop between Bangkok and Chiang Mai: an arrival evening near the river and one full city day. A third night gives Wat Phra That Lampang Luang in Ko Kha the time it deserves. The white pagodas at Wat Chaloem Phra Kiat in Chae Hom and the hot springs and forest of Chae Son sit farther out and in different directions. Choose one only when road time, weather and the return are clear.",
      "Lampang suits rail travellers, architecture readers, market eaters and people who prefer a lived northern city to a crowded attraction circuit. It is less convincing as a rushed Chiang Mai day trip or an excuse for direct-contact elephant tourism. Its value increases when the river, craft and province are allowed to remain separate chapters.",
    ],
    verdicts: [
      { label: "Worth visiting?", value: "Yes, for slow travel", description: "Rail, river architecture, markets, temples and ceramics form a distinct northern stop.", icon: "sparkles" },
      { label: "How many nights?", value: "2, or 3 with Ko Kha", description: "Two nights protect one full city day; a third makes a temple or craft extension comfortable.", icon: "calendar" },
      { label: "Where to stay?", value: "River or centre", description: "A Wang River or central base keeps the evening loop and local transport manageable.", icon: "hotel" },
      { label: "Main planning error", value: "Province equals district", description: "Ko Kha, Chae Hom and Chae Son are separate journeys, not stops on one city walk.", icon: "map" },
    ],
  },
  zones: [
    {
      slug: "wang-river-kad-kong-ta",
      name: "Wang River & Kad Kong Ta",
      kicker: "The clearest first evening",
      image: "/images/redesign/lampang-kad-kong-ta.webp",
      imageAlt: "Timber trading houses and small food stalls in Kad Kong Ta at dusk",
      summary:
        "Kad Kong Ta grew as a riverside trading district and still shows mixed architectural influences in old shopfronts, the bridge approach and side streets. Walk in daylight for the buildings, cross the Ratsadaphisek Bridge and return later when a market is confirmed. The district remains worthwhile without stalls; market night is one layer of its story, not the whole reason to visit.",
      bestFor:
        "A first visit, rail travellers, street architecture, local dinner and anyone wanting a compact block without a driver.",
      tradeoff:
        "The walking street is not an everyday guarantee. Confirm the current day and road closure, and keep a river walk or morning market as the weekday alternative.",
    },
    {
      slug: "tha-ma-o-old-city",
      name: "Tha Ma O & the old city layers",
      kicker: "Teak houses, temples and trading histories",
      image: "/images/redesign/lampang-destination-hero.webp",
      imageAlt: "Historic riverside architecture and temple roofs in Lampang old city",
      summary:
        "Around Tha Ma O, timber houses and temples extend the river's commercial story. Ban Sao Nak, Wat Phra Kaew Don Tao and Wat Pong Sanuk can form a calm half day when access allows. Read rooflines, timber joints and active religious space rather than treating every compound as an interchangeable photo stop. Walking or cycling works within a compact block; use local transport for the longer jumps.",
      bestFor:
        "Architecture, cultural history, cycling and visitors who want relationships between places rather than a top-ten sprint.",
      tradeoff:
        "The sightseeing tram is often mentioned online, but service and departure can change. Build a complete day that still works by foot, bicycle or local vehicle.",
    },
    {
      slug: "ko-kha-lampang-luang",
      name: "Ko Kha & Lampang Luang",
      kicker: "A living Lanna complex as its own half day",
      image: "/images/redesign/lampang-luang-temple.webp",
      imageAlt: "Dark teak colonnade and golden chedi at Wat Phra That Lampang Luang",
      summary:
        "Wat Phra That Lampang Luang is one of the province's most significant Lanna temple complexes, with timber viharns, a walled plan and an active religious role. It lies in Ko Kha rather than central Lampang. Give the whole complex time, dress for worship and combine it with at most one confirmed craft or local stop on the return.",
      bestFor:
        "Lanna architecture, religious art, a third travel day and visitors arranging a driver or suitable local transport.",
      tradeoff:
        "This is a sacred place, not an open-air museum. Access and photography rules take priority over a saved image or an online checklist.",
    },
    {
      slug: "choose-one-province-day",
      name: "Chae Hom or Chae Son",
      kicker: "One distant direction, never two",
      image: "/images/redesign/lampang-mountain-pagodas.webp",
      imageAlt: "White mountain pagodas rising above green ridges near Wat Chaloem Phra Kiat in Chae Hom",
      summary:
        "Choose Chae Hom for the mountain route and white pagodas at Wat Chaloem Phra Kiat, or Chae Son for hot-spring, forest and waterfall context. They create different days and require road transport beyond the city. Confirm the final transfer or climb, current park or temple access, weather and return before leaving Lampang.",
      bestFor:
        "A third or fourth night, road trips, mountain landscapes and travellers prepared to devote a full day outside the city.",
      tradeoff:
        "A drone photograph does not show the road, heat, steps, local transfer or closure. Keep an indoor city alternative and do not bolt both directions onto one itinerary.",
    },
  ],
  highlights: [
    {
      eyebrow: "Trade before tourism",
      title: "Read Kad Kong Ta as a riverside district first",
      image: "/images/redesign/lampang-kad-kong-ta.webp",
      imageAlt: "Old Kad Kong Ta façades and small evening stalls near the Wang River",
      description:
        "The street matters before the weekend market opens. Its riverside position, mixed shopfronts and bridge connection explain how Lampang worked as a northern trading city. Walk once in daylight, pause during peak heat and return for food only when the current market is actually running.",
      decision:
        "Treat the market as a bonus on top of a good district route. That protects the visit from an outdated opening time and gives the architecture room to register.",
      href: "/city/lampang/attractions/",
    },
    {
      eyebrow: "Look at the whole complex",
      title: "Give Wat Phra That Lampang Luang a quiet Ko Kha block",
      image: "/images/redesign/lampang-luang-temple.webp",
      imageAlt: "Historic Lanna timber architecture inside Wat Phra That Lampang Luang",
      description:
        "The complex brings timber construction, sacred space and a fortified plan together. Move beyond the golden chedi: notice gates, roof layers, columns and how local worshippers use the site. A slower visit is more revealing than stacking several distant temples into the same half day.",
      decision:
        "Cover shoulders and knees, remove shoes where indicated and follow local access and photography rules even when an old guide suggests otherwise.",
      href: "/city/lampang/attractions/",
    },
    {
      eyebrow: "Craft belongs at the table",
      title: "Let the rooster bowl open Lampang's ceramics story",
      image: "/images/redesign/lampang-food-ceramics.webp",
      imageAlt: "Northern Thai dishes served in hand-painted Lampang rooster ceramics",
      description:
        "Lampang's clay, kilns and workshops made ceramics part of the province's identity. The rooster bowl is the recognisable souvenir, but the more useful questions concern form, glaze, handwork, firing and provenance. A functional object with a clear maker says more than a shelf of anonymous decoration.",
      decision:
        "Ask where a piece was made, inspect glaze and packing and choose one item you will use. Avoid turning every bowl or dish into a claim of unique Lampang origin.",
      href: "/city/lampang/attractions/",
    },
  ],
  featureBanner: {
    image: "/images/redesign/lampang-mountain-pagodas.webp",
    imageAlt: "Remote white pagodas on the mountain ridges of Chae Hom in Lampang Province",
    eyebrow: "The photograph is not the route",
    title: "White pagodas above the clouds. Plan the road, climb and return first.",
    description:
      "Wat Chaloem Phra Kiat is in Chae Hom, not above Lampang city. Confirm road transport, the local mountain transfer, current access, fitness and weather. Do not automatically combine it with Chae Son, an elephant venue and a full old-city day.",
  },
  food: {
    image: "/images/redesign/lampang-food-ceramics.webp",
    imageAlt: "Khanom chin nam ngiao and Northern Thai dishes presented in Lampang ceramics",
    eyebrow: "Taste the market, read the bowl",
    title: "In Lampang, food and ceramics share the same table.",
    description:
      "Use Kad Kong Ta and local markets to try northern dishes in context rather than searching for one generic pad-thai ranking. TAT highlights khanom chin nam ngiao, miang kham, khai pam and fresh thong muan among local-market foods. These belong to wider northern and Thai food traditions; the Lampang layer comes from where you eat, the makers you meet and the province's ceramic tableware.",
    dishes: [
      { name: "Khanom chin nam ngiao", description: "Rice noodles with a tomato-rich northern broth. Ask about pork, blood cubes, fish sauce and shared preparation when diet or allergy matters." },
      { name: "Khai pam & miang kham", description: "Seasoned egg cooked in banana leaf and leaf-wrapped bites built from herbs and condiments. Check peanuts, dried shrimp and fish sauce with the individual seller." },
      { name: "Thong muan sod", description: "A soft fresh coconut wafer suited to a small market snack. Buy from a busy stall for turnover, not because an unsupported sign calls it authentic." },
    ],
  },
  itinerary: {
    eyebrow: "Two nights for the city, a third for Ko Kha",
    title: "Lampang without the province-mileage trap",
    description:
      "Use arrival and evening for the river district, one full day for Kad Kong Ta and Tha Ma O and then add one clear outer choice. A fourth day only helps when Chae Hom or Chae Son genuinely shapes the wider route.",
    days: [
      { day: "Arrival", title: "Station, river base and a daylight bridge loop", description: "Check in near the Wang River or centre, confirm the current market and walk the bridge and façades before dinner. Arrange bicycle, local transport or a driver for the next day without filling the whole evening after the journey.", href: "/best-hotels/lampang/" },
      { day: "Day 1", title: "Kad Kong Ta and Tha Ma O in two rhythms", description: "Read riverside architecture in the cooler morning, rest around peak heat and continue through one compact temple-and-timber block. Return to the market only if it is operating; otherwise choose local food without chasing a closed street.", href: "/city/lampang/attractions/" },
      { day: "Day 2", title: "Ko Kha as a Lanna half day", description: "Travel early to Wat Phra That Lampang Luang, give the full complex time and add at most one logical ceramic or village stop on the return. Keep the afternoon flexible for heat, worship activity or a slower journey.", href: "/city/lampang/attractions/" },
      { day: "Extra day", title: "Choose Chae Hom or Chae Son", description: "Commit to one provincial direction with live weather, access and transport checks. Do not use the extra day to force mountain pagodas, hot springs, elephant contact and the city market into one circuit.", href: "/city/lampang/attractions/" },
    ],
  },
  planning: {
    weather: {
      title: "Cooler mornings help, but air quality can overrule the calendar",
      summary:
        "The cooler, relatively drier months usually make city walking and temple days easier. Hot months amplify exposed streets, mountain steps and waiting for transport. Northern Thailand can also experience smoke and fine-particle pollution in the late dry period, with large differences by year and day.",
      best:
        "November to February often gives the easiest outdoor rhythm, but the current forecast and air-quality reading matter more than a seasonal promise.",
      tradeoff:
        "Check TMD, official warnings and a current AQI source shortly before travel. Reduce cycling or mountain activity during severe heat, smoke, lightning or local restrictions.",
      href: "/city/lampang/",
      image: "/images/redesign/lampang-mountain-pagodas.webp",
      imageAlt: "Mountain ridges and light haze around the pagodas of Chae Hom",
    },
    transport: {
      title: "The city is a genuine rail stop; the province still needs roads",
      summary:
        "Nakhon Lampang sits on the Northern Line, making it a natural stop between Bangkok and Chiang Mai. Lampang also has an operating airport and intercity buses, but routes and frequencies change. Ko Kha, Chae Hom and Chae Son require another transport decision after arrival.",
      facts: [
        "Use State Railway of Thailand for the current train, date and Bangkok station. Compare arrival time, sleep, luggage and hotel check-in rather than only the advertised journey duration.",
        "For a Chiang Mai connection, compare the current train or bus with a private transfer by total door-to-door time. Do not preserve an old fare or timetable in the plan.",
        "Lampang Airport is listed by the Department of Airports, but an airport's existence does not guarantee a useful flight on your date. Confirm airline, route, baggage and final transfer directly.",
        "A scooter is not an automatic province solution. Licence, insurance, mountain roads, rain, heat and fatigue matter; a confirmed driver can make a distant day safer and calmer.",
      ],
      image: "/images/redesign/lampang-destination-hero.webp",
      imageAlt: "Wang River and historic city route in Lampang",
    },
  },
  practicalTips: [
    { icon: "map", title: "Measure every district separately", description: "Save Ko Kha, Chae Hom and Chae Son as individual pins and compare the return. A list labelled Lampang does not mean the sight sits near your hotel." },
    { icon: "car", title: "A carriage is optional", description: "Choose only in mild conditions with visible welfare: no overload, poor-fitting equipment, wounds or exhausted behaviour. Walking, bicycle and motorised local transport are valid alternatives." },
    { icon: "compass", title: "Elephants: observation only", description: "Avoid riding, bathing, shows, tricks and direct feeding or touching. A conservation label is not independent proof; favour venues that let elephants choose distance and natural behaviour." },
    { icon: "sparkles", title: "Temples remain in use", description: "Cover shoulders and knees, remove shoes where indicated, avoid interrupting worship and follow current photography and access rules." },
  ],
  faqs: [
    { question: "Is Lampang worth visiting?", answer: "Yes, especially for rail travel, riverside architecture, markets, Lanna temples, ceramics and a slower northern-city rhythm. Two nights allow one full city day; add a third for Wat Phra That Lampang Luang or another deliberate province choice." },
    { question: "How long to spend in Lampang?", answer: "Spend at least two nights for an arrival evening and one full city day. Three nights suit Kad Kong Ta, Tha Ma O and Ko Kha without rushing. Add a fourth only when Chae Hom or Chae Son is important enough for a separate full-day road journey." },
    { question: "What to do in Lampang city?", answer: "Walk the Wang River and Ratsadaphisek Bridge, explore Kad Kong Ta in daylight and visit a compact Tha Ma O route of timber houses and active temples. Eat at a current market or local restaurant and add ceramics. Keep Ko Kha and the mountain or park routes outside the city block." },
    { question: "What is Lampang known for?", answer: "Lampang is known for its Wang River trading districts, horse-carriage image, Lanna and Burmese-influenced architecture, Northern Line railway connection, ceramics and rooster bowls. The province also includes Wat Phra That Lampang Luang, Chae Son and the white mountain pagodas in Chae Hom." },
    { question: "What kind of food is Lampang famous for?", answer: "Lampang shares northern foods such as khanom chin nam ngiao and market snacks including khai pam, miang kham and thong muan sod. Its ceramics and rooster bowls are a distinctive serving and craft story, not proof that every dish is exclusive to the province." },
    { question: "Does Lampang have an airport?", answer: "Yes. Lampang Airport is listed by Thailand's Department of Airports and has handled commercial passengers. Routes and frequency can change, so verify the current flight with the airport board and airline before building the trip around it." },
    { question: "How do I get to Lampang?", answer: "Lampang is on the Northern Line and can also be reached by intercity bus, a currently operating flight or road transfer. From Chiang Mai, compare the current train, bus and transfer by total door-to-door time. Use the official operator for the date rather than an old fare or schedule." },
    { question: "What is the best time to visit Lampang?", answer: "The cooler, relatively drier period from roughly November to February is often easiest for walking and temples. Conditions vary, and late-dry-season smoke can matter. Check TMD weather, current air quality and local warnings before cycling or a mountain day." },
    { question: "Is Lampang, Thailand safe?", answer: "No destination guide can guarantee current safety. Many visits are trouble-free, but traffic, heat, smoke, theft and a distant return still need normal precautions. Check current UK travel advice, Thai instructions, weather warnings, transport and insurance for the exact route." },
    { question: "How can you tell if an elephant sanctuary is ethical?", answer: "Look for observation at a respectful distance, elephants choosing where to move and no riding, bathing, tricks, shows, forced posing or direct-contact feeding. Ask about ownership, mahout practices and veterinary care, but remember that a sanctuary or conservation name alone is not independent evidence." },
  ],
  relatedGuides: [
    { title: "Things to do in Lampang", description: "Compare the river city, Ko Kha and distant province days by meaning and real travel time.", href: "/city/lampang/attractions/", image: "/images/redesign/lampang-luang-temple.webp", imageAlt: "Lanna architecture at Wat Phra That Lampang Luang" },
    { title: "Food in Lampang", description: "Plan northern dishes, market snacks and the ceramics story without generic restaurant rankings.", href: "/city/lampang/food/", image: "/images/redesign/lampang-food-ceramics.webp", imageAlt: "Northern food served in Lampang ceramics" },
    { title: "Where to stay in Lampang", description: "Choose a river, centre or station-side base around your evening and onward transport.", href: "/best-hotels/lampang/", image: "/images/redesign/lampang-destination-hero.webp", imageAlt: "Historic Wang River base in Lampang" },
  ],
  sources: [
    { title: "Lampang", creator: "Tourism Authority of Thailand", url: "https://www.tourismthailand.org/Destinations/Provinces/Lampang/104", note: "Official province context for Wang River, Kad Kong Ta, ceramics, temples, Chae Son and the spread of outer districts." },
    { title: "10 Things to do in Lampang", creator: "Tourism Authority of Thailand", url: "https://www.tourismthailand.org/Articles/10-things-to-do-in-lampang", note: "Primary attraction and market-food context; current opening and access are checked separately." },
    { title: "Kat Kong Ta", creator: "Tourism Authority of Thailand", url: "https://www.tourismthailand.org/Attraction/kat-kong-ta", note: "Official district and market reference; the live market day remains a local confirmation." },
    { title: "Lampang Airport", creator: "Department of Airports Thailand", url: "https://tfic.airports.go.th/lcd/", note: "Official airport listing and flight-information source; no evergreen route or frequency is promised." },
    { title: "State Railway of Thailand timetable", creator: "State Railway of Thailand", url: "https://www.railway.co.th/SRTTimetable/StationList", note: "Current official Northern Line planning source; the guide does not preserve a fare or departure time." },
    { title: "Elephant-friendly tourist guide", creator: "World Animal Protection", url: "https://www.worldanimalprotection.org/elephant-friendly-tourist-guide", note: "Current welfare criteria supporting observation-only choices and avoidance of riding, bathing, shows and direct contact." },
    { title: "Lampang weather", creator: "Thai Meteorological Department", url: "https://www.tmd.go.th/en/weather/province/lampang", note: "Live provincial weather, forecasts and warnings for heat-, smoke- and storm-sensitive routes." },
    { title: "Thailand travel advice", creator: "UK Foreign, Commonwealth & Development Office", url: "https://www.gov.uk/foreign-travel-advice/thailand", note: "Current UK safety, insurance, entry and transport-disruption context." },
    { title: "Is Lampang Worth Visiting?", creator: "Thailand Starts Here", url: "https://thailandstartshere.com/2022/01/25/is-lampang-worth-visiting/", note: "Substantial English competitor reference for destination and itinerary intent; current logistics were independently checked." },
    { title: "Reasons to visit Lampang", creator: "Very Hungry Nomads", url: "https://www.veryhungrynomads.com/reasons-to-visit-lampang-in-thailand/", note: "English competitor view of food, city and day-trip breadth; prices, opening and subjective claims were not reused as current facts." },
  ],
};
