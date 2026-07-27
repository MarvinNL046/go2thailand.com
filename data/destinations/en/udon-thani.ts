import type { DestinationGuideData } from "../types";

export const udonThaniDestinationGuideEn: DestinationGuideData = {
  citySlug: "udon-thani",
  cityName: "Udon Thani",
  locale: "en",
  pageTitle: "Udon Thani Thailand Guide: City, UNESCO & Lotus Lake",
  pageDescription:
    "Plan Udon Thani city, Ban Chiang, Red Lotus Sea and Phu Phrabat with an honest 3-night route, transport, season, food and UNESCO context.",
  pageUrl: "https://go2-thailand.com/city/udon-thani/",
  dateModified: "2026-07-27",
  coordinates: { latitude: 17.4138, longitude: 102.7872 },
  touristType: ["Isaan travellers", "Culture travellers", "Rail travellers", "Archaeology travellers"],
  stayGuideHref: "/best-hotels/udon-thani/",
  foodGuideHref: "/city/udon-thani/food/",
  hero: {
    image: "/images/redesign/udon-thani-destination-hero.webp",
    imageAlt: "Local boat among pink-red water lilies on Nong Han Kumphawapi near Udon Thani at dawn",
    eyebrow: "Isaan city, lotus mornings and two separate UNESCO stories",
    title: "Udon Thani",
    accent: "Thailand beyond the gateway",
    subtitle: "The city is not a waiting room for Laos. The province is not one easy day trip.",
    description:
      "Udon Thani is a practical northern-Isaan city with airport, railway, markets, park life and a strong food culture. Beyond it, Ban Chiang, Red Lotus Sea and Phu Phrabat sit in different directions and answer different interests. Three nights give the city one proper day and one provincial route; add a fourth before combining archaeology, lotus season and the far north-west.",
    imageClassName: "object-cover object-[62%_center] lg:object-center",
    stats: [
      { label: "Strong first stay", value: "3 nights", icon: "calendar" },
      { label: "World Heritage", value: "2 distinct sites", icon: "sparkles" },
      { label: "Arrival", value: "Flight or train", icon: "map" },
    ],
  },
  quickAnswer: {
    eyebrow: "Choose the city, then one direction",
    title: "Udon Thani is worth visiting when Isaan life matters as much as a headline sight",
    paragraphs: [
      "Udon city gives a first visit real structure. Nong Prajak Park, the city museum, Wat Phothisomphon, the station district and active food streets can fill a measured day without turning it into a temple checklist. The combination of Isaan staples and Vietnamese-influenced breakfast culture is part of the destination, not merely something to eat between transfers.",
      "The province needs a map before an itinerary. Ban Chiang lies east and explains a long prehistoric sequence through settlement, farming, ceramics and metal technology. Red Lotus Sea lies south-east at Nong Han Kumphawapi and is an early-morning nature decision with a changing bloom. Phu Phrabat lies far to the north-west and joins sandstone shelters, rock art and the Dvaravati-period Sīma stone tradition. These are separate travel blocks.",
      "Three nights are a robust first plan: arrive and settle, spend one full day in the city, then choose one outer route. Add a fourth night for a second direction or a calm continuation to Nong Khai. A driver who can physically connect several pins does not make the result a good heritage day. Protect interpretation time, daylight and the return journey.",
    ],
    verdicts: [
      { label: "Worth visiting?", value: "Yes, for local Isaan", description: "City rhythm, food, archaeology and seasonal landscapes form a stronger story than a transit stop.", icon: "sparkles" },
      { label: "How many nights?", value: "3 as a base", description: "Use one day for the city and one for a deliberate provincial direction; add time before adding another.", icon: "calendar" },
      { label: "Best first base", value: "Centre or Nong Prajak", description: "Choose by evening food, station access and the return from your outer route, not only room price.", icon: "hotel" },
      { label: "Main route mistake", value: "Joining every pin", description: "Ban Chiang, Kumphawapi and Phu Phrabat do not form one compact attraction loop.", icon: "compass" },
    ],
  },
  zones: [
    {
      slug: "city-nong-prajak",
      name: "Udon city & Nong Prajak",
      kicker: "The useful base is also a real destination",
      image: "/images/redesign/udon-thani-nong-prajak.webp",
      imageAlt: "Residents walking and cycling beside Nong Prajak Park in Udon Thani during soft evening light",
      summary:
        "Use Nong Prajak for the city's cooler morning and evening rhythm, then connect the Udon Thani Museum, Wat Phothisomphon and whichever market or station-area food street is genuinely active. This is where provincial history, daily exercise, students, commuters and family food businesses share the same city. Do not reduce it to the hotel night before Nong Khai.",
      bestFor:
        "A first day, train travellers, evening food, manageable local movement and a comfortable base before a confirmed outer route.",
      tradeoff:
        "The centre is not uniformly walkable in heat or traffic. Short local transport can be more realistic between zones; confirm the destination and fare or meter before leaving.",
    },
    {
      slug: "ban-chiang",
      name: "Ban Chiang",
      kicker: "Prehistory deserves its own eastern day",
      image: "/images/redesign/udon-thani-ban-chiang.webp",
      imageAlt: "Protected archaeological context and red-painted pottery associated with Ban Chiang",
      summary:
        "Ban Chiang Archaeological Site matters for its long settlement sequence, not only the photogenic red spiral pottery. UNESCO identifies evidence of settled agrarian life, ceramics and metal technology within a major prehistoric site. Give the museum and protected archaeological context enough time to explain how habitation, burial and production changed rather than treating a replica as the whole story.",
      bestFor:
        "Archaeology, World Heritage, careful museum visits and travellers who want one content-rich day east of the city.",
      tradeoff:
        "It is outside central Udon. Confirm current opening, accessible areas and return transport, and never buy an object presented as an excavated original or antiquity of uncertain provenance.",
    },
    {
      slug: "red-lotus-sea",
      name: "Red Lotus Sea & Kumphawapi",
      kicker: "A dawn route with a natural season",
      image: "/images/redesign/udon-thani-destination-hero.webp",
      imageAlt: "Pink-red water lilies opening around a small boat on Nong Han Kumphawapi",
      summary:
        "Talay Bua Daeng spreads across Nong Han Kumphawapi south-east of the city. TAT commonly presents the cool months, especially roughly December to February, as the viewing period, but bloom, water, wind and boat operation vary. Leave early for cooler air and flowers that are more likely to be open, and ask locally shortly before travel rather than trusting an old photograph or festival date.",
      bestFor:
        "Seasonal nature, dawn light, a quiet boat experience and travellers willing to organise a very early departure.",
      tradeoff:
        "There is no evergreen bloom guarantee. Confirm the current jetty, boat arrangement, weather and properly fitting life jacket before building the whole stay around it.",
    },
    {
      slug: "phu-phrabat",
      name: "Phu Phrabat & the north-west",
      kicker: "Rock landscape and the Sīma stone tradition",
      image: "/images/redesign/udon-thani-phu-phrabat.webp",
      imageAlt: "Sandstone shelters, forest path and historic Sīma stones at Phu Phrabat Historical Park",
      summary:
        "Phu Phrabat was inscribed on the World Heritage List in 2024 for its exceptional testimony to the Dvaravati-period Sīma stone tradition. The landscape also contains sandstone shelters and prehistoric rock paintings. Read those layers separately: natural erosion shaped the shelters, earlier communities left rock art, and later Buddhist use transformed parts of the plateau into sacred space.",
      bestFor:
        "Landscape, archaeology, Buddhist history, walking and a complete provincial day with deliberate road transport.",
      tradeoff:
        "Distance, heat, rain and trail conditions make this a planned day, not a spontaneous city stop. Verify current access and final entry and keep the return inside comfortable daylight.",
    },
  ],
  highlights: [
    {
      eyebrow: "Morning park, museum, food evening",
      title: "Use Nong Prajak to set the city's pace",
      image: "/images/redesign/udon-thani-nong-prajak.webp",
      imageAlt: "Nong Prajak lake, promenade and everyday city life in Udon Thani",
      description:
        "Begin among local walkers, move into museum or temple context after breakfast and pause during the hottest part of the day. In the evening, let the route end where you actually want to eat. That simple order turns a regional transport hub into a coherent city day without pretending every road is pleasant on foot.",
      decision:
        "Choose a hotel by the evening finish and next departure. Nong Prajak is calmer; the centre and station can be more convenient for food and rail but differ street by street.",
      href: "/city/udon-thani/attractions/",
    },
    {
      eyebrow: "Settlement, farming and technology",
      title: "Read Ban Chiang beyond the spiral pot",
      image: "/images/redesign/udon-thani-ban-chiang.webp",
      imageAlt: "Ban Chiang excavation interpretation and characteristic painted ceramic forms",
      description:
        "The recognisable pottery is an entrance, not the conclusion. Ban Chiang's value lies in the archaeological sequence and what habitation, burials, farming, ceramics and metallurgy reveal about changing communities. Use the museum to understand evidence and uncertainty instead of repeating one over-simple Bronze Age label.",
      decision:
        "Check which museum and site areas are open. Leave artefacts and protected layers untouched and reject any sale framed as an excavated original.",
      href: "/city/udon-thani/attractions/",
    },
    {
      eyebrow: "Nature controls the photograph",
      title: "Let the current lotus bloom decide",
      image: "/images/redesign/udon-thani-destination-hero.webp",
      imageAlt: "Water lilies in low morning light on Red Lotus Sea near Udon Thani",
      description:
        "Water lilies respond to season, time and conditions. An early start usually provides cooler air and a better chance of open flowers, but no web calendar can promise the view on a particular morning. Treat the lake as a current natural event rather than a mandatory year-round attraction.",
      decision:
        "Ask a current local source about bloom and boating, then confirm departure, jetty, boat size and life jackets before leaving Udon city.",
      href: "/city/udon-thani/best-time-to-visit/",
    },
  ],
  featureBanner: {
    image: "/images/redesign/udon-thani-phu-phrabat.webp",
    imageAlt: "Forest route through the sandstone and sacred-boundary landscape of Phu Phrabat",
    eyebrow: "Two World Heritage sites, two timelines",
    title: "Do not compress Ban Chiang and Phu Phrabat into one heritage label.",
    description:
      "Ban Chiang explains prehistoric settlement and technology. Phu Phrabat preserves rock art, sandstone shelters and the Dvaravati-period Sīma tradition. They lie in different directions and need different interpretation. Choose depth over a two-badge windscreen day.",
  },
  food: {
    image: "/images/redesign/udon-thani-food-breakfast.webp",
    imageAlt: "Khao piak sen, khai kata, naem nueng and Isaan dishes on an Udon Thani breakfast table",
    eyebrow: "Isaan at the table, Vietnamese influence at breakfast",
    title: "Udon's food story begins before the day trip.",
    description:
      "Udon Thani brings Isaan dishes together with a visible Vietnamese-influenced breakfast culture. Start with noodle soup, an egg pan or naem nueng and share som tam, larb and sticky rice later. Do not label every dish uniquely Udon: the local value is in the combination, family businesses and everyday morning rhythm. Ask directly about fish sauce, fermented fish, shrimp, peanuts, soy, gluten, egg and shared utensils when allergies matter.",
    dishes: [
      { name: "Khao piak sen", description: "A comforting rice-noodle soup often eaten in the morning. Ask what is in the broth and toppings; a pale soup is not automatically vegetarian or free from fish sauce, soy or gluten cross-contact." },
      { name: "Khai kata & naem nueng", description: "Khai kata arrives in a small metal egg pan with savoury toppings. Naem nueng combines meat, herbs, vegetables, rice paper and sauce. Check peanuts, soy, gluten and raw-produce handling." },
      { name: "Larb, som tam & sticky rice", description: "Order Isaan dishes to share and agree the heat level. Ask whether larb is cooked and whether som tam contains fish sauce, fermented fish, dried shrimp, crab or peanuts." },
    ],
  },
  itinerary: {
    eyebrow: "One city and one direction per day",
    title: "A first Udon route should protect daylight and interpretation",
    description:
      "Give the city its own day, choose the outer route by interest and season, and keep a Nong Khai continuation separate from a long excursion. Four honest blocks reveal more than three distant pins joined by a driver.",
    days: [
      { day: "Arrival", title: "Choose a base for the evening and next departure", description: "Check in around the centre, station or Nong Prajak according to the food and transport you will actually use. Walk one short local loop and confirm the next day's driver or connection before dinner.", href: "/best-hotels/udon-thani/" },
      { day: "Day 1", title: "Nong Prajak, museum and an Udon food evening", description: "Start by the lake, connect museum and Wat Phothisomphon in the cooler hours and rest at midday. Finish at an active market or a family restaurant serving Isaan and Vietnamese-influenced favourites.", href: "/city/udon-thani/attractions/" },
      { day: "Day 2", title: "Choose Ban Chiang or a confirmed lotus morning", description: "Choose Ban Chiang for archaeology and museum depth. Choose Kumphawapi only when current bloom, boating and a dawn departure align. Do not force both together because they share a province list.", href: "/city/udon-thani/attractions/" },
      { day: "Extra day", title: "Give Phu Phrabat the day or continue to Nong Khai", description: "Use a full north-western day for the World Heritage landscape with verified access and return, or continue calmly to Nong Khai. A Laos crossing needs its own current document, checkpoint and insurance plan.", href: "/city/nong-khai/" },
    ],
  },
  planning: {
    weather: {
      title: "Cooler months help; lotus conditions are narrower",
      summary:
        "The cooler, relatively drier period is usually easiest for city walking, exposed heritage sites and long road days. The Red Lotus Sea is commonly visited within that broader cool season, especially in the early morning, but has a changing natural bloom. Hot season makes plateau and city exposure harder. Rain brings greener fields and forest but can affect boats, roads and trails.",
      best:
        "Use roughly November to February for the simplest outdoor rhythm, then verify Red Lotus Sea by current local bloom and weather rather than month alone.",
      tradeoff:
        "Cool-season popularity can make the lake busier, while dry days can still be hot and dusty. Keep a city, museum or food alternative for any failed nature morning.",
      href: "/city/udon-thani/best-time-to-visit/",
      image: "/images/redesign/udon-thani-destination-hero.webp",
      imageAlt: "Water lilies in cool dawn light at Nong Han Kumphawapi",
    },
    transport: {
      title: "Arrival is easy; provincial movement is the real transport decision",
      summary:
        "Udon Thani Airport is an operating passenger airport and the city sits on the north-eastern railway towards Nong Khai. Those arrivals do not automatically solve Ban Chiang, Kumphawapi or Phu Phrabat. Each outer route needs a suitable driver, hire car or tour with a confirmed wait and return.",
      facts: [
        "Compare flight, train and bus by door-to-door time, Bangkok terminal, luggage and hotel transfer. Use the Department of Airports, airline and State Railway of Thailand for the live service on your date.",
        "Local songthaews and tuk-tuks help within parts of the city but are not guaranteed excursion services. Agree the exact stops, waiting time, total price and final return before leaving town.",
        "If self-driving, Thailand drives on the left. Verify licence, insurance, rental terms, route coverage and weather, and avoid an unfamiliar rural return after dark.",
        "Keep a buffer before a flight, train or border connection. A distant heritage day and a fixed same-evening departure are poor partners.",
      ],
      image: "/images/redesign/udon-thani-nong-prajak.webp",
      imageAlt: "Udon Thani city movement and road planning beside Nong Prajak",
    },
  },
  practicalTips: [
    { icon: "map", title: "Map the directions first", description: "Place Ban Chiang, Kumphawapi and Phu Phrabat separately. Count the outward drive, visit and return; the province name is not a compact transport network." },
    { icon: "waves", title: "Use a fitting life jacket", description: "Confirm local boating and weather and wear a properly fitting jacket. Protect skin and equipment from water and sun even when the dawn air begins cool." },
    { icon: "sparkles", title: "Leave heritage in place", description: "Do not touch excavation layers, rock paintings or Sīma stones. Follow current paths and photo rules and never buy an item marketed as an excavated original." },
    { icon: "car", title: "Road safety is the main daily control", description: "Traffic, heat, unfamiliar rural roads and late returns usually matter more than dramatic destination claims. Follow current official travel advice and local instructions." },
  ],
  faqs: [
    { question: "Is it worth going to Udon Thani?", answer: "Yes, when you want local Isaan city life, food and meaningful archaeology rather than a classic beach stop. Allow at least two nights for the city. Three nights add one credible outer route; four make a second direction or a calm continuation to Nong Khai more realistic." },
    { question: "Is there anything to do in Udon Thani?", answer: "Spend a city day around Nong Prajak, the museum, Wat Phothisomphon, markets and local food. Outside town, choose Ban Chiang for archaeology, Red Lotus Sea during a suitable bloom or Phu Phrabat for sandstone, rock art and the Sīma stone landscape. They are not one compact day loop." },
    { question: "What is Udon Thani best known for?", answer: "Udon Thani is known as a major northern-Isaan transport and commercial city and as the base for Ban Chiang Archaeological Site, Phu Phrabat and seasonal Red Lotus Sea. Its food culture also combines Isaan staples with a visible Vietnamese-influenced breakfast tradition." },
    { question: "Is Udon Thani safe for tourists?", answer: "Many visits are trouble-free, but no city is risk-free. Traffic, heat, theft, isolated road returns and boat or rental-vehicle conditions deserve practical attention. Follow current UK travel advice, Thai instructions and insurer terms; no guide can guarantee personal safety." },
    { question: "What is the best time to visit Udon Thani?", answer: "Roughly November to February usually offers the easiest conditions for city walks and outdoor heritage. The Red Lotus Sea has a narrower and variable natural bloom within the cool season and is best checked locally shortly before travel. Hot and rainy periods require stronger heat or storm alternatives." },
    { question: "Which part of Thailand is Udon Thani?", answer: "Udon Thani is in upper north-eastern Thailand, the region commonly called Isaan. The city lies south of Nong Khai and the Laos border and is connected to Bangkok and Nong Khai by the north-eastern railway and road network." },
    { question: "Does Udon Thani have an international airport?", answer: "Udon Thani has an operating passenger airport, but for practical UK trip planning treat it as a domestic gateway unless the official airport board and an airline show an international route on your date. Most international itineraries connect through Bangkok; names and old route pages do not prove a usable current service." },
    { question: "How far is Udon from Bangkok?", answer: "Udon Thani is roughly 560 kilometres from Bangkok by road, depending on the route. Flights, trains and buses produce very different door-to-door journeys. Compare the live terminal, departure, luggage and final hotel transfer instead of using road distance as the travel time." },
    { question: "What is Ban Chiang known for?", answer: "Ban Chiang is known for a major prehistoric archaeological sequence with evidence of settled farming communities, ceramics and metal technology. The red-painted pottery is visually famous, but UNESCO significance rests on the broader settlement, production and burial record." },
    { question: "Where is the Red Lotus Lake in Thailand?", answer: "The Red Lotus Sea is on Nong Han Kumphawapi in Udon Thani Province, south-east of Udon city. It is a natural, early-morning boat experience with variable bloom and weather. Confirm the current jetty, flowers and boat operation locally before leaving the city." },
  ],
  relatedGuides: [
    { title: "Things to do in Udon Thani", description: "Compare the city, Ban Chiang, Red Lotus Sea and Phu Phrabat by meaning, season and distance.", href: "/city/udon-thani/attractions/", image: "/images/redesign/udon-thani-ban-chiang.webp", imageAlt: "Archaeological interpretation at Ban Chiang in Udon Thani" },
    { title: "Where to stay in Udon Thani", description: "Choose the centre, station or Nong Prajak according to evening food and your next connection.", href: "/best-hotels/udon-thani/", image: "/images/redesign/udon-thani-nong-prajak.webp", imageAlt: "Nong Prajak as a calm Udon Thani stay area" },
    { title: "Continue to Nong Khai", description: "Follow the railway north for a separate Mekong and border-planning chapter.", href: "/city/nong-khai/", image: "/images/redesign/udon-thani-phu-phrabat.webp", imageAlt: "Northern Isaan landscape as context for continuing beyond Udon Thani" },
  ],
  sources: [
    { title: "Udon Thani", creator: "Tourism Authority of Thailand", url: "https://www.tourismthailand.org/Destinations/Provinces/Udon-Thani/588", note: "Official province context for the city, Ban Chiang, Phu Phrabat and Nong Han Kumphawapi; current operation still needs a live check." },
    { title: "10 Things to do in Udon Thani", creator: "Tourism Authority of Thailand", url: "https://www.tourismthailand.org/Articles/10-things-to-do-in-udon-thani", note: "Official attraction and Red Lotus Sea season context; no old event date or bloom is treated as guaranteed." },
    { title: "Ban Chiang Archaeological Site", creator: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/575/", note: "Primary World Heritage context for the prehistoric settlement sequence, agriculture, ceramics and metal technology." },
    { title: "Phu Phrabat, a testimony to the Sīma stone tradition of the Dvaravati period", creator: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/1507", note: "Primary context for the 2024 inscription, rock landscape, paintings and in-situ Dvaravati-period Sīma stones." },
    { title: "Udon Thani Airport", creator: "Department of Airports Thailand", url: "https://tfic.airports.go.th/lcd/?p=TUD", note: "Official operating-airport and live flight-information source; no fixed route or international service is promised." },
    { title: "State Railway of Thailand timetable", creator: "State Railway of Thailand", url: "https://www.railway.co.th/SRTTimetable/StationList", note: "Current official rail-planning source; the guide does not preserve a departure time or fare." },
    { title: "Udon Thani weather", creator: "Thai Meteorological Department", url: "https://www.tmd.go.th/en/weather/province/udon-thani", note: "Live provincial conditions, forecast and warnings for weather-sensitive lake and heritage days." },
    { title: "Thailand travel advice", creator: "UK Foreign, Commonwealth & Development Office", url: "https://www.gov.uk/foreign-travel-advice/thailand", note: "Current UK safety, insurance, transport-disruption and entry-planning context." },
    { title: "Things to do in Udon Thani", creator: "Thailand Starts Here", url: "https://thailandstartshere.com/2025/08/11/things-to-do-in-udon-thani/", note: "English competitor intent and itinerary reference; logistics and safety claims were independently checked." },
    { title: "Udon Thani: a complete travel guide", creator: "Adventures of Jellie", url: "https://www.adventuresofjellie.com/thailand/udon-thani-guide", note: "Long-form competitor reference for city, food and outer-route breadth; old prices and schedules were not reused." },
    { title: "A guide to visiting the Red Lotus Lake", creator: "Adventures of Jellie", url: "https://www.adventuresofjellie.com/thailand/red-lotus-lake-isan", note: "Competitor route and visitor-question reference; current bloom, jetty and boat operation remain local-check items." },
  ],
};
