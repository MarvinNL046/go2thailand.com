import type { DestinationGuideData } from "../types";

export const banKrutDestinationGuideEn: DestinationGuideData = {
  citySlug: "ban-krut",
  cityName: "Ban Krut",
  locale: "en",
  pageTitle: "Ban Krut Thailand: beach, train & things to do (2026)",
  pageDescription:
    "Plan Ban Krut, Thailand: compare its beach areas, arrange the train transfer, visit Wat Thang Sai and decide whether this quiet Gulf stop suits you.",
  pageUrl: "https://go2-thailand.com/city/ban-krut/",
  dateModified: "2026-07-26",
  coordinates: { latitude: 11.3494, longitude: 99.5646 },
  touristType: [
    "Quiet beach travellers",
    "Rail itineraries",
    "Cyclists",
    "Slow travel",
  ],
  stayGuideHref: null,
  foodGuideHref: null,
  hero: {
    image: "/images/redesign/ban-krut-destination-hero.webp",
    imageAlt:
      "Long palm-lined Ban Krut beach on the Gulf of Thailand with local fishing boats",
    eyebrow: "A small Gulf town that gives you time back",
    title: "Ban Krut",
    accent: "Thailand",
    subtitle: "Choose your stretch of coast. Leave the rush on the train.",
    description:
      "Ban Krut is a quiet coastal town in Prachuap Khiri Khan with its own railway station, a long beach and the green Khao Thong Chai headland. Come for two to four nights of cycling, beach time, a respectful temple visit and Gulf seafood—not for an endless attraction checklist. Your choice between the central beach and quieter north matters more than a small difference in hotel rating.",
    imageClassName: "object-cover object-[62%_center] lg:object-center",
    stats: [
      { label: "Good first stay", value: "2–4 nights", icon: "calendar" },
      { label: "Logical arrival", value: "Train + transfer", icon: "car" },
      { label: "Best travel style", value: "Beach & cycling", icon: "waves" },
    ],
  },
  quickAnswer: {
    eyebrow: "Choose honestly first",
    title: "Ban Krut is worth it when quiet is the point",
    paragraphs: [
      "Ban Krut sits on the Gulf of Thailand in Bang Saphan district, Prachuap Khiri Khan province. It is smaller and quieter than Hua Hin, with fewer international services, organised activities and nightlife. In return, you get a long coast, a compact local centre and a station on Thailand's Southern Line. Treat it as an overnight stop in a southbound itinerary rather than a rushed beach day from Bangkok.",
      "The coast is not one uniform hotel zone. Central and southern Ban Krut Beach are more practical for the village, simple restaurants and the station transfer. Khao Thong Chai and Wat Thang Sai form the recognisable headland. North of it, Thang Sai Beach is generally quieter and more resort-led, but has fewer services within walking distance. If you travel without a scooter or car, choose the practical location before the prettiest room photo.",
      "Two nights allow an arrival evening, one full beach-and-temple day and an unhurried departure. Three or four suit cycling, weather flexibility or a separate coastal day towards Bang Saphan. Never assume the sea will be flat or crystal clear: wind, rain and Gulf conditions vary. Ban Krut works best for travellers who see silence and a simple daily rhythm as benefits; Hua Hin is the easier choice for nightlife, broad dining choice and frequent services.",
    ],
    verdicts: [
      {
        label: "Is Ban Krut worth visiting?",
        value: "Yes, for real quiet",
        description:
          "The long beach, cycling and small scale are the experience. Choose another base if you need a long highlights list.",
        icon: "sparkles",
      },
      {
        label: "How many nights?",
        value: "2–4 nights",
        description:
          "Two is a useful minimum; three or four leave space for weather, cycling and a separate coast day.",
        icon: "calendar",
      },
      {
        label: "Where should you stay?",
        value: "Central or north",
        description:
          "Central is easier without transport. Thang Sai is quieter but requires more planning for food and movement.",
        icon: "hotel",
      },
      {
        label: "Main planning mistake",
        value: "Station ≠ beach",
        description:
          "The train reaches Ban Krut, not your beachfront room. Confirm the final transfer before departure.",
        icon: "map",
      },
    ],
  },
  zones: [
    {
      slug: "central-ban-krut-beach",
      name: "Central Ban Krut Beach",
      kicker: "The most practical first base",
      image: "/images/redesign/ban-krut-coast-zones.webp",
      imageAlt: "Coastal road, beaches and Khao Thong Chai around Ban Krut",
      summary:
        "The central and southern beach area is the logical choice for rail travellers who do not want every meal to start with a ride. You are closer to the village, local food and roads towards the station. The atmosphere remains low-rise, but central does not mean every service sits on one boulevard. Check the real walking route from your accommodation to both beach and food.",
      bestFor:
        "First visits, rail travellers, short stays and travellers who do not want to rent a scooter every day.",
      tradeoff:
        "Thai weekends and holidays can feel livelier. The emptiest-looking beach is not automatically the easiest place to stay.",
    },
    {
      slug: "khao-thong-chai-wat-thang-sai",
      name: "Khao Thong Chai & Wat Thang Sai",
      kicker: "The green divide on the coast",
      image: "/images/redesign/ban-krut-wat-thang-sai.webp",
      imageAlt:
        "Wat Thang Sai and Phra Mahathat Chedi Phakdee Prakat on the coastal hill",
      summary:
        "Khao Thong Chai separates the two coastal rhythms and gives Ban Krut its clearest landmark. Wat Thang Sai and Phra Mahathat Chedi Phakdee Prakat stand on the hill. Treat the complex as an active religious place, not a viewpoint prop: cover shoulders and knees, speak quietly and follow local signs. Heat, slope and current access determine how much time you need.",
      bestFor:
        "Temple architecture, coastal views and an early or late cycle or walk when conditions suit.",
      tradeoff:
        "The climb and terrain are not easy for everyone. Never force access when an area is closed or in religious use.",
    },
    {
      slug: "thang-sai-beach-north",
      name: "Thang Sai Beach",
      kicker: "A quieter resort strip north of the hill",
      image: "/images/redesign/ban-krut-coast-zones.webp",
      imageAlt: "Khao Thong Chai between the long beaches around Ban Krut",
      summary:
        "North of Khao Thong Chai the coast feels more spread out, with greener, stand-alone stays. That can be ideal for reading, quiet mornings and swimming when local conditions allow. The trade-off is less choice outside your door. Ask about breakfast, restaurant days, bicycles, transfer and evening transport before booking.",
      bestFor:
        "Couples, longer quiet stays, beach time and travellers happy to organise meals and transport in advance.",
      tradeoff:
        "Isolation is both the quality and the limitation. One closed restaurant or heavy shower matters more here than in the central area.",
    },
    {
      slug: "bang-saphan-south-coast",
      name: "Bang Saphan & the south coast",
      kicker: "A separate day—not just more Ban Krut",
      image: "/images/redesign/ban-krut-route-banner.webp",
      imageAlt:
        "Editorial coastal route from Ban Krut towards northern and southern beach choices",
      summary:
        "The wider Bang Saphan district includes more coastline, communities and bays, but they are not all part of Ban Krut village. Make this a deliberate day route when you have transport and current weather and road conditions cooperate. Set a turning point and return before dark rather than turning the whole district into one unrealistic attraction list.",
      bestFor:
        "A third or fourth day, travellers with a car or driver, and visitors comparing different Gulf coast settings.",
      tradeoff:
        "Distances and limited local connections make improvisation harder. A Koh Talu boat trip is a separate weather- and operator-dependent product.",
    },
  ],
  highlights: [
    {
      eyebrow: "Read the coast first",
      title: "Choose central convenience or Thang Sai quiet",
      image: "/images/redesign/ban-krut-coast-zones.webp",
      imageAlt: "Green Khao Thong Chai headland separating the Ban Krut coast",
      description:
        "Ban Krut has no universal best hotel area. Central Ban Krut Beach makes food and daily needs easier; Thang Sai north of the headland offers more separation and a resort-like rhythm. That decision affects your transport and evening options more than a small room-price difference.",
      decision:
        "Without a scooter or car, book a stay that clearly confirms transfers and meals. With your own transport, the quieter north becomes easier.",
      href: "/city/ban-krut/attractions/",
    },
    {
      eyebrow: "One meaningful culture stop",
      title: "Visit Wat Thang Sai as a temple, not a photo set",
      image: "/images/redesign/ban-krut-wat-thang-sai.webp",
      imageAlt: "Wat Thang Sai temple complex on the Ban Krut coastal hill",
      description:
        "The temple and chedi on Khao Thong Chai connect religious meaning with the coastal landscape. Dress appropriately, silence devices, follow signs and give ceremonial spaces room when they are in use. The view complements the visit; it is not the temple's purpose.",
      decision:
        "Go early or later in the day, carry water and accept that access or religious activity may alter your plan.",
      href: "/city/ban-krut/attractions/",
    },
    {
      eyebrow: "Plan less, experience more",
      title: "A bicycle, a beach day and a good table are enough",
      image: "/images/redesign/ban-krut-seafood.webp",
      imageAlt:
        "Local fishers and a shared table of grilled fish, squid, crab and southern curry",
      description:
        "Ban Krut's value is not measured in tickets. Cycle a manageable part of the coast, rest through the hottest hours and share fish, squid or curry in the evening. Ask what is fresh and how it is cooked instead of chasing one permanently ‘best’ restaurant.",
      decision:
        "Fix essential transfers, but keep sea, heat and rain in charge of the rest of the day.",
      href: "/city/ban-krut/food/",
    },
  ],
  featureBanner: {
    image: "/images/redesign/ban-krut-route-banner.webp",
    imageAlt:
      "Route from Ban Krut station and village to the beach, headland and quieter north coast",
    eyebrow: "One station, two coastal rhythms",
    title: "Let Khao Thong Chai split your route",
    description:
      "Arrive by rail, organise the last transfer and use the central beach as the practical anchor. Then choose north for Thang Sai and more quiet, or south for a separate Bang Saphan coast day. The dotted route is editorial—not a scale map—so verify real roads and distances.",
  },
  food: {
    image: "/images/redesign/ban-krut-seafood.webp",
    imageAlt:
      "Shared Ban Krut table with grilled Gulf fish, squid, crab, curry and rice",
    eyebrow: "Eat with the coast",
    title: "Fresh Gulf seafood beats a frozen restaurant list",
    description:
      "Availability changes with season, weather and the day. Ask what is fresh, how it is prepared and whether a portion is meant to share. For allergies, fish sauce, shrimp paste, peanuts and a shared wok or grill need explicit discussion; show a translated allergy card offline and never treat ‘not spicy’ as ‘allergen-free’.",
    dishes: [
      {
        name: "Grilled fish & nam jim",
        description:
          "Ask which whole fish is available and confirm size or weight before cooking. The spicy-sour dip may contain fish sauce; request it separately when needed.",
      },
      {
        name: "Squid, crab & shellfish",
        description:
          "Ask for the current price and preparation. Cross-contact is possible on shared grills, in frying oil and in sauces; serious shellfish allergies require a safer alternative.",
      },
      {
        name: "Southern curry & market snacks",
        description:
          "Southern curries can be intense and often contain shrimp paste or fish. Start with a small portion, rice and vegetables; market opening follows local rhythms rather than old online schedules.",
      },
    ],
  },
  itinerary: {
    eyebrow: "Three days without checklist pressure",
    title: "Give Ban Krut both quiet and direction",
    description:
      "Use the central beach as the first anchor, then make a clear north-or-south choice. With two nights, follow arrival and day one; a third or fourth night creates weather room.",
    days: [
      {
        day: "Arrival",
        title: "Station to beach—then stop planning",
        description:
          "Verify the current train and Bangkok departure station with SRT, and confirm who collects you in Ban Krut. Check in, read the sea conditions, walk a quiet section of beach and eat locally. The arrival day does not need a temple, market and sunset chase.",
        href: "/transport/",
      },
      {
        day: "Day 1",
        title: "Cycle the coast and give Wat Thang Sai time",
        description:
          "Start early with a safe cycle or beach walk, then visit Khao Thong Chai when access, clothing and heat allow. Rest at midday, choose a beach section based on local conditions and end with seafood or curry.",
        href: "/city/ban-krut/attractions/",
      },
      {
        day: "Day 2",
        title: "Stay quietly north or take one southern coast day",
        description:
          "Choose rather than cram. Stay around Thang Sai for a low-movement beach day, or use pre-arranged transport for one Bang Saphan coast loop. Do not automatically add a boat trip when sea conditions or operator checks are unclear.",
        href: "/city/ban-krut/attractions/",
      },
    ],
  },
  planning: {
    weather: {
      title: "Plan around the Gulf, not one Thailand calendar",
      summary:
        "Ban Krut is warm year-round, but rain, wind and sea state do not follow a universal Thailand pattern. The Gulf can be wetter later in the year, while individual days still vary.",
      best: "Use the driest-looking period as a starting point, then check TMD forecasts and warnings close to travel.",
      tradeoff:
        "A dry forecast does not guarantee calm sea. Keep one weather-flexible day and follow local flags and operator decisions.",
      href: "/city/ban-krut/weather/",
      image: "/images/redesign/ban-krut-coast-zones.webp",
      imageAlt: "Changing light and coastal conditions along Ban Krut Beach",
    },
    transport: {
      title: "The train is useful; the last mile is the real decision",
      summary:
        "Ban Krut station sits on the Southern Line, but rail times, train numbers and Bangkok departure stations can change. Check SRT or D-Ticket for your date and arrange the final ride to your accommodation before travelling.",
      facts: [
        "Rail is the characterful choice for a southbound itinerary.",
        "The station and beach are not the same place.",
        "Ask the hotel to confirm pickup, cost and contact method.",
        "A private road transfer gives more timing control but is a longer drive.",
      ],
      image: "/images/redesign/ban-krut-route-banner.webp",
      imageAlt:
        "Editorial arrival route from Ban Krut railway station towards the Gulf coast",
    },
  },
  practicalTips: [
    {
      icon: "car",
      title: "Confirm the last mile",
      description:
        "Save the accommodation contact offline and confirm pickup point, time and current cost before your train leaves.",
    },
    {
      icon: "sun",
      title: "Move outside peak heat",
      description:
        "Cycle or visit the hill early or later; use midday for shade, lunch and a slower beach stretch.",
    },
    {
      icon: "waves",
      title: "Read the sea locally",
      description:
        "Weather icons cannot replace flags, currents, local advice or an operator's go/no-go decision.",
    },
    {
      icon: "food",
      title: "Ask before ordering",
      description:
        "Confirm seafood price, portion, preparation and allergens before the kitchen starts cooking.",
    },
  ],
  faqs: [
    {
      question: "What to do in Ban Krut, Thailand?",
      answer:
        "Walk or cycle a manageable part of Ban Krut Beach, visit Wat Thang Sai and Phra Mahathat Chedi Phakdee Prakat respectfully on Khao Thong Chai, and eat Gulf seafood or southern Thai curry. With an extra day, choose quieter Thang Sai Beach or a separate route towards Bang Saphan. Ban Krut is strong because of its pace and landscape, not a long attraction list.",
    },
    {
      question: "Where is Ban Krut, Thailand?",
      answer:
        "Ban Krut is on the Gulf of Thailand in Bang Saphan district, Prachuap Khiri Khan province, south of Hua Hin. It has a station on Thailand's Southern Line. The journey from Bangkok takes several hours, and the station is not automatically beside your accommodation.",
    },
    {
      question: "How far is ban krut from Hua Hin?",
      answer:
        "Ban Krut is well south of Hua Hin and should be treated as a separate overnight destination, not a nearby suburb. Exact road and rail timings vary by service and departure point, so check your date rather than relying on one fixed duration.",
    },
    {
      question: "How do I get from Bangkok to Ban Krut?",
      answer:
        "The train is the most distinctive option: verify your service and Bangkok departure station through State Railway of Thailand or D-Ticket, then arrange a station-to-hotel transfer. Driving or a private transfer offers more control but still takes several hours.",
    },
    {
      question: "What is the closest airport to Ban Krut?",
      answer:
        "Chumphon and Hua Hin are the nearest regional airport options on a map, but limited schedules may make them impractical. Many international visitors arrive through Bangkok and continue by train or road. Compare the complete door-to-door route, not airport distance alone.",
    },
    {
      question: "What is the weather like in Ban Krut in December?",
      answer:
        "December can still be influenced by the Gulf's later wet-season pattern, so rain, wind and rougher sea remain possible even when other Thai regions are described as dry. Check TMD close to departure and keep boat or beach plans flexible.",
    },
  ],
  relatedGuides: [
    {
      title: "Things to do in Ban Krut",
      description:
        "Compare the beach, Wat Thang Sai, cycling and a separate Bang Saphan coast day.",
      href: "/city/ban-krut/attractions/",
      image: "/images/redesign/ban-krut-wat-thang-sai.webp",
      imageAlt: "Wat Thang Sai on the Ban Krut coastal hill",
    },
    {
      title: "Thailand transport guide",
      description:
        "Choose between train, road and onward connections for a realistic southbound route.",
      href: "/transport/",
      image: "/images/redesign/transport-thailand-hero.webp",
      imageAlt: "Transport choices across Thailand",
    },
    {
      title: "Hua Hin",
      description:
        "Compare Ban Krut's quiet coast with a larger beach city offering more services and nightlife.",
      href: "/city/hua-hin/",
      image: "/images/cities/generated/hua-hin.webp",
      imageAlt: "Coast and city life in Hua Hin",
    },
  ],
  sources: [
    {
      title: "Prachuap Khiri Khan",
      creator: "Tourism Authority of Thailand",
      url: "https://www.tourismthailand.org/Destinations/Provinces/Prachuap-Khiri-Khan/231",
      note: "Official province and Gulf-coast context.",
    },
    {
      title: "Phra Mahathat Chedi Phakdee Prakat",
      creator: "Tourism Authority of Thailand / Thailand Travel",
      url: "https://www.thailandtravel.or.jp/phra_mahathat_chedi_pakdee_prakat/",
      note: "Official context for the chedi, Wat Thang Sai and Khao Thong Chai.",
    },
    {
      title: "Southern Line timetable",
      creator: "State Railway of Thailand",
      url: "https://ttsview.railway.co.th/SRT_Schedule2022.php?line=4&ln=en&trip=2",
      note: "Official railway and station context; this guide does not freeze times.",
    },
    {
      title: "D-Ticket",
      creator: "State Railway of Thailand",
      url: "https://www.dticket.railway.co.th/DTicketPublicWeb/home/Home",
      note: "Official channel for checking a specific train, date and departure station.",
    },
    {
      title: "Thai Meteorological Department",
      creator: "TMD",
      url: "https://www.tmd.go.th/en",
      note: "Official forecasts and warnings for heat, rain and sea conditions.",
    },
  ],
};
