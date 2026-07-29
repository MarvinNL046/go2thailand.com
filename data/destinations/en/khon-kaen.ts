import type { DestinationGuideData } from "../types";

export const khonKaenDestinationGuideEn: DestinationGuideData = {
  citySlug: "khon-kaen",
  cityName: "Khon Kaen",
  locale: "en",
  pageTitle: "Khon Kaen Thailand Guide: City, Food & Province Route",
  pageDescription:
    "Plan Khon Kaen city, Bueng Kaen Nakhon, Sri Chan, Phu Wiang and a silk route with an honest 2-night stay, food, transport and season advice.",
  pageUrl: "https://go2-thailand.com/city/khon-kaen/",
  dateModified: "2026-07-27",
  coordinates: { latitude: 16.4322, longitude: 102.8236 },
  touristType: ["Food travellers", "Isaan travellers", "Culture travellers", "Slow travellers"],
  stayGuideHref: "/best-hotels/khon-kaen/",
  foodGuideHref: "/city/khon-kaen/food/",
  hero: {
    image: "/images/redesign/khon-kaen-destination-hero.webp",
    imageAlt: "Bueng Kaen Nakhon at sunset with Wat Nong Wang and local walkers in Khon Kaen",
    eyebrow: "Modern Isaan city, lake evenings and one deliberate province route",
    title: "Khon Kaen",
    accent: "Thailand lived, not listed",
    subtitle: "Stay for the food and city rhythm. Add the province only when you choose a direction.",
    description:
      "Khon Kaen is a regional centre of education, business, transport and contemporary Isaan culture. Bueng Kaen Nakhon, Wat Nong Wang, Sri Chan and the university districts form a coherent city stay; Phu Wiang's fossil landscape and Chonnabot's silk story sit well beyond it in different directions. Two nights suit the city. Add a third only for one properly planned outer chapter.",
    imageClassName: "object-cover object-[64%_center] lg:object-center",
    stats: [
      { label: "Strong first stay", value: "2 nights", icon: "calendar" },
      { label: "Best city rhythm", value: "Lake & centre", icon: "hotel" },
      { label: "Reason to remember it", value: "Isaan food", icon: "food" },
    ],
  },
  quickAnswer: {
    eyebrow: "City first, province second",
    title: "Khon Kaen is worth visiting when everyday Isaan is the attraction",
    paragraphs: [
      "Khon Kaen works because it is a lived city rather than a polished heritage set. Families and runners circle Bueng Kaen Nakhon, Wat Nong Wang shapes the skyline, Sri Chan carries an older commercial layer and university districts add students, design and new food businesses. A visitor can understand modern north-eastern Thailand here without demanding one world-famous monument.",
      "Use two nights for a first stay: arrive, walk the lake and eat well, then give the next day to Wat Nong Wang, Sri Chan, the centre and one university or creative anchor. With a third night choose one provincial direction. Phu Wiang lies west for geology, fossil research and museum interpretation. Chonnabot and the silk-and-village route lie south. They do not make one efficient loop merely because both belong to Khon Kaen Province.",
      "The city best suits travellers who value food, contemporary Thai urban life and a less staged atmosphere. It is not a substitute for a compact historical park, beach or international nightlife capital. It is a strong Isaan route owner: connected enough to reach easily, manageable enough for a short stop and varied enough that transport does not need to become the whole story.",
    ],
    verdicts: [
      { label: "Worth visiting?", value: "Yes, for city & food", description: "Lake life, markets, design, temple architecture and a serious Isaan table reward a slower city stop.", icon: "sparkles" },
      { label: "How many nights?", value: "2, or 3 with a day trip", description: "Two nights create one full city day. Add one for Phu Wiang or the southern silk route.", icon: "calendar" },
      { label: "Where to stay?", value: "Centre or lake", description: "The centre helps arrival and food; Bueng Kaen Nakhon gives a calmer morning and evening rhythm.", icon: "hotel" },
      { label: "Main planning error", value: "Mixing city and province", description: "Phu Wiang and Chonnabot are not short urban stops and do not sit on the same route.", icon: "map" },
    ],
  },
  zones: [
    {
      slug: "bueng-kaen-nakhon",
      name: "Bueng Kaen Nakhon & Wat Nong Wang",
      kicker: "The clearest first encounter",
      image: "/images/redesign/khon-kaen-destination-hero.webp",
      imageAlt: "Lake promenade at Bueng Kaen Nakhon with illuminated Wat Nong Wang",
      summary:
        "The lake shows Khon Kaen at human scale. Walk in the later afternoon among families and exercise groups, then visit Wat Nong Wang as a place of worship and architecture rather than only a viewpoint. Its multi-tiered Phra Mahathat Kaen Nakhon defines the city silhouette. Dress respectfully, keep voices low and accept that access to upper levels or parts of the complex can change.",
      bestFor:
        "A first evening, local atmosphere, gentle walking, temple architecture and travellers avoiding a taxi-heavy attraction list.",
      tradeoff:
        "The promenade is more comfortable outside peak heat. This is an everyday city landscape, not a resort park; traffic, events and maintenance can alter the route.",
    },
    {
      slug: "sri-chan-centre",
      name: "Sri Chan, markets & centre",
      kicker: "Old trade inside a changing regional city",
      image: "/images/redesign/khon-kaen-creative-district.webp",
      imageAlt: "Traditional shopfronts, students and creative street details in central Khon Kaen",
      summary:
        "Sri Chan is an old commercial district being re-read through heritage and creative-city work. Pair one compact street block with a market, small shops and a Thai-Chinese breakfast. Do not expect a sealed old town. Its interest lies in older façades, current traffic, family businesses and new uses sharing the same streets. Look closely without blocking a doorway or pavement for photographs.",
      bestFor:
        "Street life, architecture, markets, breakfast and travellers who prefer reading a city to collecting headline attractions.",
      tradeoff:
        "Heat, crossings and uneven walking conditions make the map look simpler than the experience. Keep the route compact and use transport for the jump to the university side.",
    },
    {
      slug: "kangsadan-university",
      name: "Kangsadan & university districts",
      kicker: "Students, design and contemporary Isaan",
      image: "/images/redesign/khon-kaen-creative-district.webp",
      imageAlt: "Students moving through a Khon Kaen creative district with older commercial buildings",
      summary:
        "Around Khon Kaen University and Kangsadan, the city becomes younger: coffee, student food, design work and TCDC-linked creative activity sit beside education and everyday housing. The Creative Economy Agency treats walkability and access as real development questions, so this is not one seamless pedestrian attraction. Choose a specific exhibition, district project, café or meal and let the surroundings supply the texture.",
      bestFor:
        "Contemporary culture, design, inexpensive student food, coffee and an afternoon that moves beyond temples.",
      tradeoff:
        "University facilities, exhibitions and independent businesses follow their own calendars. Confirm the actual venue and use local transport when heat or traffic makes the link unpleasant.",
    },
    {
      slug: "choose-the-province",
      name: "Phu Wiang or silk & village culture",
      kicker: "Two directions, not one rushed circuit",
      image: "/images/redesign/khon-kaen-route-banner.webp",
      imageAlt: "Editorial route from Khon Kaen city towards Phu Wiang fossils in the west and silk villages in the south",
      summary:
        "Choose west for Phu Wiang, where fossil research, the dinosaur museum and geological landscape belong to one science-led day. Choose south when Chonnabot mudmee silk and village or temple culture better match your interests. Both need transport beyond the city. Treat road time, current museum access and confirmed stops as a live itinerary rather than an evergreen checklist.",
      bestFor:
        "A third day, families interested in science, textile travellers and visitors with a driver, hire car or suitable tour.",
      tradeoff:
        "Phu Wiang and Chonnabot are not neighbours. Choose one direction, confirm the return and keep an indoor alternative for severe heat or heavy rain. Animal shows are not recommended as responsible itinerary anchors.",
    },
  ],
  highlights: [
    {
      eyebrow: "Begin where the city breathes",
      title: "Read Khon Kaen around Bueng Kaen Nakhon first",
      image: "/images/redesign/khon-kaen-destination-hero.webp",
      imageAlt: "Walkers beside Bueng Kaen Nakhon with Wat Nong Wang in evening light",
      description:
        "Lake, promenade and Wat Nong Wang are not three disconnected pins. Together they form one logical opening block of daily life, religious architecture and skyline. Begin later in the afternoon, visit the temple respectfully and eat nearby or in the centre after dark.",
      decision:
        "Allow two or three hours around evening and protect the next morning for breakfast and central streets. That avoids both peak heat and a forced checklist.",
      href: "/city/khon-kaen/attractions/",
    },
    {
      eyebrow: "Look beyond the landmark temple",
      title: "Sri Chan and Kangsadan show a city changing",
      image: "/images/redesign/khon-kaen-creative-district.webp",
      imageAlt: "Historic shopfronts and contemporary student life in Khon Kaen",
      description:
        "Khon Kaen is a university and creative-economy city as well as a provincial capital. Sri Chan holds an older trade story; Kangsadan, university life and TCDC-linked work show how younger residents and businesses reinterpret Isaan. The contrast is more useful than treating either district as a fixed attraction.",
      decision:
        "Choose one anchor in each area—market, heritage building, exhibition or meal—and connect the districts by transport instead of one long hot walk.",
      href: "/city/khon-kaen/attractions/",
    },
    {
      eyebrow: "Make one province choice",
      title: "Give Phu Wiang more than a dinosaur photograph",
      image: "/images/redesign/khon-kaen-phu-wiang.webp",
      imageAlt: "Family receiving fossil and dinosaur interpretation inside the Phu Wiang museum",
      description:
        "Phu Wiang's value sits in the relationship between fossils, research, museum education and the landscape where discoveries were made. A credible visit therefore moves beyond a dinosaur statue. Read the exhibits, ask which park or excavation elements are accessible and give children time to understand rather than rush them between displays.",
      decision:
        "Add Phu Wiang only with a third night or a generous departure day, and verify museum and park access before fixing transport.",
      href: "/city/khon-kaen/attractions/",
    },
  ],
  featureBanner: {
    image: "/images/redesign/khon-kaen-route-banner.webp",
    imageAlt: "Khon Kaen city route branching west to fossils and south to silk and village culture",
    eyebrow: "The best extra day begins by removing something",
    title: "Choose fossils or silk—not both.",
    description:
      "The province is much larger than the city. Travel west for Phu Wiang and geology, or south for Chonnabot, mudmee silk and village culture. One direction with real time on location adds more than a windscreen day trying to join two themes.",
  },
  food: {
    image: "/images/redesign/khon-kaen-food.webp",
    imageAlt: "Isaan table with som tam, larb, grilled chicken, sticky rice, herbs and breakfast soup",
    eyebrow: "Food is not a supporting activity here",
    title: "The Isaan table is Khon Kaen's strongest memory.",
    description:
      "Build a food day in layers rather than chasing one famous restaurant: Thai-Chinese breakfast in the centre, an uncomplicated Isaan lunch and a shared evening table. The city also has chefs who reinterpret regional ingredients. Ask explicitly about pla ra, fish sauce, shrimp, peanuts, raw herbs and shared preparation when allergies matter; 'not spicy' does not answer any of those questions.",
    dishes: [
      { name: "Som tam, sticky rice & kai yang", description: "The classic combination balances sour and hot papaya salad, grilled chicken and sticky rice. Ask which som tam is being made: Isaan versions may contain fermented fish, crab or substantial chilli. Start milder and adjust." },
      { name: "Larb, nam tok & herbs", description: "Seasoned meat with lime, toasted rice and herbs belongs on a shared table. Ask whether meat is fully cooked and omit raw vegetables or herbs when their handling does not feel right." },
      { name: "Thai-Chinese breakfast & new Isaan cooking", description: "Rice porridge, eggs and fried dough sit beside chefs using regional produce in newer ways. Try both layers. A design-led restaurant does not replace a market bowl, and one market breakfast does not tell the whole contemporary city story." },
    ],
  },
  itinerary: {
    eyebrow: "Two nights, one complete city day",
    title: "A Khon Kaen route can have shape without haste",
    description:
      "Put food and neighbourhoods before isolated attractions. With a third night add one province direction; without that margin, let the city remain the main story.",
    days: [
      { day: "Arrival", title: "Check in, walk the lake and share an Isaan table", description: "Choose the centre or Bueng Kaen Nakhon according to the evening you want. Walk near the lake, visit Wat Nong Wang when access and dress are suitable, then share som tam, kai yang, larb and sticky rice. Keep the first evening local after the journey.", href: "/best-hotels/khon-kaen/" },
      { day: "Day 1", title: "Central breakfast, Sri Chan and a younger finish", description: "Begin with rice soup or another Thai-Chinese breakfast, then explore one market and a compact Sri Chan block. Rest during peak heat. Continue by local transport to Kangsadan, TCDC or a confirmed creative anchor and finish with student food or contemporary Isaan cooking.", href: "/city/khon-kaen/food/" },
      { day: "Day 2", title: "Continue or choose one province chapter", description: "Move on when Khon Kaen is your urban Isaan stop. With a third night, choose Phu Wiang for fossils and geology or Chonnabot and the southern route for silk and village context. Confirm return transport and access and allow heat or rain to reshape the plan.", href: "/city/khon-kaen/attractions/" },
    ],
  },
  planning: {
    weather: {
      title: "Plan by heat and storm risk, not a month label alone",
      summary:
        "Khon Kaen has a tropical savanna climate with relatively drier, hotter and wetter periods. For a city stay, the hour can matter more than the monthly average: market and walking early, indoor time or rest around midday and the lake later. Wet-season downpours can be intense; hot-season exposure can make short urban links more tiring than expected.",
      best:
        "The cooler, relatively drier months are usually easiest for longer city and province days, but every outdoor route still needs a current forecast.",
      tradeoff:
        "A climate average is not a personal forecast. Use TMD before departure, carry water, protect shade breaks and postpone a province route during severe heat, lightning or local warnings.",
      href: "/city/khon-kaen/",
      image: "/images/redesign/khon-kaen-destination-hero.webp",
      imageAlt: "Cool evening light and local walkers beside Bueng Kaen Nakhon",
    },
    transport: {
      title: "Station, airport and province each require a different plan",
      summary:
        "Khon Kaen sits on the north-eastern railway and has an operating passenger airport, intercity buses and app-based local transport where available. The city is easier than Bangkok but not uniformly pleasant on foot. Phu Wiang or Chonnabot needs a separate day-trip solution. Compare the whole door-to-door route rather than the headline ticket price.",
      facts: [
        "Use State Railway of Thailand for the current train, date and Bangkok departure station. An old timetable, fare or Hua Lamphong reference is not a booking plan.",
        "For flights and buses, confirm the literal terminal, arrival time, baggage and final transfer. Airport, railway station and bus facilities are not interchangeable city pins.",
        "Arrange both outward and return travel for province days. With a driver or hire car, confirm licence, insurance, route, waiting time, included stops and final hotel before departure.",
        "Keep a buffer before a flight or train. A long Phu Wiang day followed by a fixed same-evening connection removes the flexibility the route needs.",
      ],
      image: "/images/redesign/khon-kaen-route-banner.webp",
      imageAlt: "Route image separating Khon Kaen city from western fossil and southern silk journeys",
    },
  },
  practicalTips: [
    { icon: "map", title: "Separate city and province pins", description: "Save Bueng Kaen Nakhon, Sri Chan, Kangsadan, Phu Wiang and Chonnabot individually. Searching only the province name hides the real travel time." },
    { icon: "food", title: "Translate the allergy before eating", description: "Name pla ra, fish sauce, peanuts, shellfish and shared preparation explicitly. Keep the Thai wording offline rather than relying on one dish label." },
    { icon: "sun", title: "Build around the hottest hours", description: "Use morning for markets, midday for an indoor stop or rest and evening for lake and food. That simple rhythm improves a short visit." },
    { icon: "compass", title: "Check live conditions by route", description: "Use current FCDO advice, TMD warnings, local closures and insurer terms for the exact journey. A broad city label cannot guarantee a future situation." },
  ],
  faqs: [
    { question: "What is Khon Kaen famous for in Thailand?", answer: "Khon Kaen is known as a major economic, education and transport centre of Isaan, with Khon Kaen University, Wat Nong Wang, provincial mudmee silk and the fossil and dinosaur context of Phu Wiang. Keep city and province distinct: not every famous place is a short ride from the centre." },
    { question: "Is Khon Kaen safe right now?", answer: "No guide can guarantee current safety. Many visits are trouble-free, but traffic, heat, theft and unfamiliar rural returns still require normal precautions. Check live UK travel advice, Thai instructions, weather warnings and insurance immediately before the exact route." },
    { question: "Is Khon Kaen worth visiting?", answer: "Yes, when you value a lived Isaan city, excellent regional food, lake evenings and contemporary culture. Two nights create one full city day; add a third for either Phu Wiang or the southern silk route. It is less suitable when beaches or a compact monumental old town are the main goal." },
    { question: "What is there to do in Khon Kaen?", answer: "Combine Bueng Kaen Nakhon with Wat Nong Wang, explore a compact Sri Chan and market route and choose a current university or creative-district anchor. Eat across breakfast, classic Isaan and newer regional cooking. With another day, choose Phu Wiang or Chonnabot rather than forcing both." },
    { question: "How do I get around in Khon Kaen?", answer: "Use short walks within one area and local taxis, ride-hailing where available, tuk-tuks or agreed transport between districts. Confirm the destination and fare or meter. Phu Wiang and Chonnabot need a planned driver, hire car or suitable tour with a return arrangement." },
    { question: "Is there a dinosaur museum in Thailand?", answer: "Yes. The Department of Mineral Resources operates the Fossil Research Center and Dinosaur Museum at Phu Wiang in Khon Kaen Province. It belongs to a wider fossil and geological landscape outside the city. Verify current museum and park access before arranging the journey." },
    { question: "Does Khon Kaen have an airport?", answer: "Yes. Khon Kaen Airport is an operating passenger airport. Routes and frequencies change, so use the Department of Airports live board and airline for your date and arrange the airport-to-hotel transfer separately." },
    { question: "Is Khon Kaen a big city?", answer: "Khon Kaen is a major regional city with university, hospitals, business districts, transport and dispersed neighbourhoods. It is more manageable than Bangkok but not one compact walking centre. Plan the lake, centre and university areas as separate local blocks." },
    { question: "What is Khon Kaen famous for food?", answer: "Khon Kaen is strong in Isaan staples such as som tam, larb, nam tok, kai yang and sticky rice, alongside Thai-Chinese breakfast and newer regional restaurants. Ask about fermented fish, fish sauce, shrimp, peanuts, raw ingredients and shared preparation when allergies matter." },
    { question: "Which part of Thailand is Khon Kaen?", answer: "Khon Kaen is in north-eastern Thailand, the region commonly called Isaan. The city is a major central-Isaan transport and education hub on the railway and road corridor between Bangkok and the upper north-east." },
  ],
  relatedGuides: [
    { title: "Things to do in Khon Kaen", description: "Compare lake, temple, creative districts and province days without confusing city and province.", href: "/city/khon-kaen/attractions/", image: "/images/redesign/khon-kaen-creative-district.webp", imageAlt: "Creative city district in Khon Kaen" },
    { title: "Food in Khon Kaen", description: "Build an Isaan food route through breakfast, markets, classics and newer regional cooking.", href: "/city/khon-kaen/food/", image: "/images/redesign/khon-kaen-food.webp", imageAlt: "Shared Isaan table in Khon Kaen" },
    { title: "Where to stay in Khon Kaen", description: "Choose the practical centre, evening rhythm near the lake or a university-side base.", href: "/best-hotels/khon-kaen/", image: "/images/redesign/khon-kaen-destination-hero.webp", imageAlt: "Evening at Bueng Kaen Nakhon in Khon Kaen" },
  ],
  sources: [
    { title: "Khon Kaen", creator: "Tourism Authority of Thailand", url: "https://www.tourismthailand.org/Destinations/Provinces/Khon-Kaen/575", note: "Official province context for Khon Kaen as a regional centre, mudmee silk and route themes." },
    { title: "Khon Kaen Creative District", creator: "Creative Economy Agency", url: "https://www.cea.or.th/en/creative-district-masterplan/KhonKaen", note: "Primary context for Sri Chan, creative-city development, residents, entrepreneurs and access work." },
    { title: "Phu Wiang Fossil Research Center and Dinosaur Museum", creator: "Department of Mineral Resources", url: "https://www.dmr.go.th/wp-content/uploads/2023/02/02-DMR-Geological-Museum-Learning-Center.pdf", note: "Official museum and fossil-research context; live opening and park access still require direct confirmation." },
    { title: "Khon Kaen Airport", creator: "Department of Airports Thailand", url: "https://tfic.airports.go.th/lcd/?p=TUK", note: "Official operating-airport and live flight-information source; no fixed route or schedule is promised." },
    { title: "State Railway of Thailand timetable", creator: "State Railway of Thailand", url: "https://www.railway.co.th/SRTTimetable/StationList", note: "Current official rail-planning source; the guide does not preserve a fare or departure time." },
    { title: "Khon Kaen weather", creator: "Thai Meteorological Department", url: "https://www.tmd.go.th/en/weather/province/khon-kaen", note: "Live provincial conditions, forecast and warnings for heat- and storm-sensitive routes." },
    { title: "Thailand travel advice", creator: "UK Foreign, Commonwealth & Development Office", url: "https://www.gov.uk/foreign-travel-advice/thailand", note: "Current UK safety, insurance, entry and transport-disruption context." },
    { title: "Khon Kaen travel guide", creator: "Travelfish", url: "https://www.travelfish.org/location/thailand/northeast_thailand/khon_kaen/khon_kaen", note: "Substantial English competitor reference for city depth and transport; old prices and schedules were not reused." },
    { title: "Khon Kaen", creator: "Rough Guides", url: "https://www.roughguides.com/thailand/northeast-isaan/khon-kaen/", note: "English competitor context for broad destination intent; current logistics were independently checked." },
    { title: "Khon Kaen for Digital Nomads", creator: "Slowmadding", url: "https://slowmadding.com/articles/khon-kaen-for-digital-nomads", note: "Competitor view of university, liveability and contemporary city intent; subjective lifestyle claims were not treated as facts." },
  ],
};
