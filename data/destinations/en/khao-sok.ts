import type { DestinationGuideData } from "../types";

export const khaoSokDestinationGuideEn: DestinationGuideData = {
  citySlug: "khao-sok",
  cityName: "Khao Sok",
  locale: "en",
  pageTitle: "Khao Sok Thailand: park, lake & 3-day guide 2026",
  pageDescription:
    "Plan Khao Sok National Park without confusing village and lake: compare bases, Cheow Lan trips, wildlife walks, transport, weather and a realistic 3-day route.",
  pageUrl: "https://go2-thailand.com/city/khao-sok/",
  dateModified: "2026-07-27",
  coordinates: { latitude: 8.9109, longitude: 98.5312 },
  touristType: ["Nature travellers", "Couples", "Families", "Southern Thailand routes"],
  stayGuideHref: "/top-10/hotels/",
  foodGuideHref: "/city/khao-sok/food/",
  hero: {
    image: "/images/redesign/khao-sok-destination-hero.webp",
    imageAlt: "Longtail boat beneath rainforest-covered limestone cliffs in Khao Sok",
    eyebrow: "Rainforest village, limestone lake, two different bases",
    title: "Khao Sok",
    accent: "Thailand",
    subtitle: "The trip works when you stop treating the national park as one map pin.",
    description:
      "Khlong Sok village gives you trailheads, river trips and jungle nights; Cheow Lan Lake is a separate road-and-boat chapter. Three nights let both breathe. Two can work when transfers, pier and tour are arranged before arrival.",
    imageClassName: "object-cover object-[58%_center] lg:object-center",
    stats: [
      { label: "Useful first stay", value: "3 nights", icon: "calendar" },
      { label: "Two distinct bases", value: "Village + lake", icon: "map" },
      { label: "Closest route logic", value: "Surat / Krabi", icon: "car" },
    ],
  },
  quickAnswer: {
    eyebrow: "First answer: is Khao Sok worth it?",
    title: "Yes—when rainforest and lake each get their own time",
    paragraphs: [
      "Khao Sok is one of southern Thailand’s strongest nature stops because a single stay can connect dense rainforest, karst scenery, river valleys and the reservoir landscape of Cheow Lan Lake. It is not a wildlife park with guaranteed sightings, and it is not one compact attraction you can understand between two vans.",
      "The village and national-park headquarters sit west of the lake pier. A floating-bungalow night usually involves a separate transfer, boat and organised programme. Staying only by the village is simpler and more flexible; staying on the lake buys dawn and evening atmosphere but reduces independence and room choice.",
      "Three nights are the calm first-trip answer: village arrival, one forest or river day, then a lake day or overnight. With two nights, choose either a village-led visit plus lake day trip or a pre-arranged village-to-floating-stay sequence. Do not build a same-day island–lake–night-train chain without generous margins.",
    ],
    verdicts: [
      { label: "Is Khao Sok worth visiting?", value: "Yes, for 2–3 nights", description: "Best for travellers who value landscape, guided nature and quiet over beach nightlife.", icon: "sparkles" },
      { label: "How many days?", value: "3 nights is easier", description: "Enough room for village, forest and lake without turning every transfer into a deadline.", icon: "calendar" },
      { label: "Can you go without a tour?", value: "Partly", description: "Village life is independent; protected trails, caves and lake access may require guides, boats or permits.", icon: "compass" },
      { label: "Main planning error", value: "Village ≠ lake", description: "The pier, park village and floating stays are separate parts of the journey.", icon: "map" },
    ],
  },
  zones: [
    {
      slug: "khlong-sok-village",
      name: "Khlong Sok village",
      kicker: "Flexible base for forest, river and arrival day",
      image: "/images/redesign/khao-sok-jungle-village.webp",
      imageAlt: "Small jungle road and rainforest lodges near Khlong Sok village",
      summary:
        "The village near national-park headquarters is the practical first base. Restaurants, small shops, local operators and a range of jungle lodges make it easier to arrive, compare the next day’s conditions and adapt. Short walks and some river activities begin nearby, while deeper protected routes depend on current park rules and guides.",
      bestFor: "First visits, independent travellers, families, flexible weather plans and anyone arriving late in the day.",
      tradeoff:
        "You do not wake on Cheow Lan Lake. A hotel sold as ‘Khao Sok’ can be well outside the walkable village, so verify the actual map pin and pickup arrangement.",
    },
    {
      slug: "cheow-lan-lake",
      name: "Cheow Lan Lake",
      kicker: "Boat journey, limestone scale and early quiet",
      image: "/images/redesign/khao-sok-floating-bungalows.webp",
      imageAlt: "Floating bungalows and limestone peaks on Cheow Lan Lake",
      summary:
        "Cheow Lan is the reservoir experience seen in Khao Sok’s best-known images. Boat routes cross broad water between limestone towers and may include viewpoints, caves or guided forest sections. Exact programmes change with operator, water, weather and park instructions; compare the full itinerary rather than the bungalow photograph alone.",
      bestFor: "Landscape, couples, photographers and travellers happy with an organised overnight or full-day boat programme.",
      tradeoff:
        "Rooms can be basic, electricity and signal limited, and transfers tightly timed. Swimming, caves and hikes depend on current safety guidance—not a generic online promise.",
    },
    {
      slug: "forest-river",
      name: "Forest & river days",
      kicker: "The living park beyond the reservoir",
      image: "/images/redesign/khao-sok-night-walk.webp",
      imageAlt: "Guide and travellers walking through the humid rainforest of Khao Sok",
      summary:
        "A guided forest walk, night walk or gentle river activity reveals a different Khao Sok from the lake. The value is in tracks, plants, insects, amphibians and forest structure—not a checklist of large mammals. Choose difficulty, duration and guide ratio around the least experienced person in your group.",
      bestFor: "Natural history, active travellers, older children and visitors willing to move slowly and listen.",
      tradeoff:
        "Rain, leeches, heat and trail conditions are part of a rainforest. Ask what is included, what can be cancelled and which footwear the guide recommends that day.",
    },
    {
      slug: "onward-route",
      name: "Surat Thani, Krabi or Khao Lak route",
      kicker: "Choose the exit before the excursion",
      image: "/images/redesign/khao-sok-attractions-hero.webp",
      imageAlt: "Karst landscape on the road through southern Thailand near Khao Sok",
      summary:
        "Khao Sok connects naturally with Surat Thani transport, the Andaman coast and Khao Lak. Krabi and Phuket are possible, but neither is ‘next door’ once pickup, road time, pier logistics and island transfers are counted. Fix the final departure point before choosing a lake overnight.",
      bestFor: "Multi-stop southern routes and travellers comparing a coast–jungle–island sequence.",
      tradeoff:
        "Shared vans can involve collection windows and transfers. Protect a separate buffer before a flight, ferry or sleeper train.",
    },
  ],
  highlights: [
    {
      eyebrow: "The lake is a journey, not a room type",
      title: "Compare Cheow Lan programmes line by line",
      image: "/images/redesign/khao-sok-floating-bungalows.webp",
      imageAlt: "Boat approaching floating accommodation on Cheow Lan Lake",
      description:
        "Look beyond ‘floating bungalow’. Compare pier transfer, park fees, meals, drinking water, room facilities, guide language, cave or trail plan, luggage rules and the cancellation process. A cheaper package can become the expensive one when transfers or mandatory fees are missing.",
      decision: "Choose the operator and safety plan first; choose the room photograph second.",
      href: "/city/khao-sok/attractions/",
    },
    {
      eyebrow: "Wildlife without a guarantee",
      title: "Let a guide make small forest life visible",
      image: "/images/redesign/khao-sok-night-walk.webp",
      imageAlt: "Guided night walk under broad rainforest leaves in Khao Sok",
      description:
        "Khao Sok supports rich biodiversity, including species that most visitors will never see. Responsible guides read calls, tracks and micro-habitats without baiting or chasing animals. Claims of guaranteed wild tigers, elephants or bears are a reason to ask harder questions, not to book faster.",
      decision: "Measure a good walk by learning and habitat care, not by the size of the animal in a sales image.",
      href: "/city/khao-sok/attractions/",
    },
    {
      eyebrow: "Independence has a boundary",
      title: "Explore the village freely; respect protected-route rules",
      image: "/images/redesign/khao-sok-jungle-village.webp",
      imageAlt: "Quiet Khlong Sok village at the edge of tropical forest",
      description:
        "You can arrange accommodation, meals and village time independently. Specific park trails, caves and reservoir activities may require registration, local guides, boats or closure compliance. Conditions can change quickly after rain, so yesterday’s blog route is not permission for today.",
      decision: "Check the park office or your licensed operator on the day and turn back when staff close a route.",
      href: "/city/khao-sok/attractions/",
    },
  ],
  featureBanner: {
    image: "/images/redesign/khao-sok-attractions-hero.webp",
    imageAlt: "Rainforest river and towering limestone landscape in Khao Sok",
    eyebrow: "Two bases, one coherent route",
    title: "Village first. Lake second. Coast after the buffer.",
    description:
      "This sequence keeps the flexible part of Khao Sok at the start, protects the fixed boat programme and avoids betting a flight or ferry on a long shared transfer.",
  },
  food: {
    image: "/images/redesign/khao-sok-southern-table.webp",
    imageAlt: "Southern Thai curries, vegetables and rice served family-style near Khao Sok",
    eyebrow: "Eat for the rainforest climate",
    title: "Southern flavour, simple logistics, clear allergy questions",
    description:
      "Khao Sok is a small destination rather than a city-sized food scene. Use the village for freshly cooked southern Thai meals and choose lake packages only after checking exactly which meals and dietary alternatives are included. Spice, fish sauce, shrimp paste, coconut milk and shared woks need explicit questions.",
    dishes: [
      { name: "Gaeng som", description: "A sharp southern sour curry, often with fish or seafood. Ask about shrimp paste, fish stock and chilli level; ‘vegetable’ describes the visible pieces, not necessarily the base." },
      { name: "Stir-fried local greens", description: "A useful balance to richer curries. Oyster sauce, fish sauce and a shared wok are common, so request the complete preparation when vegan or allergic." },
      { name: "Lake-stay meals", description: "Usually part of a package and shaped by supply logistics. Confirm meals, drinking water, snacks and dietary needs in writing before the boat leaves the pier." },
    ],
  },
  itinerary: {
    eyebrow: "Three nights, no transfer race",
    title: "A first Khao Sok route that leaves room for weather",
    description: "Start flexible in the village, place the fixed lake programme in the middle and keep onward travel separate from the final boat arrival.",
    days: [
      { day: "Arrival", title: "Settle in Khlong Sok", description: "Confirm tomorrow’s guide, current route conditions, pickup and what to carry. Use the remaining light for the village or a short, authorised activity rather than forcing a full excursion after a long van ride.", href: "/top-10/hotels/" },
      { day: "Day 1", title: "Forest or river at the right intensity", description: "Choose a guided walk, night walk or river activity around weather and ability. Keep the afternoon flexible and repack a small dry bag for the lake.", href: "/city/khao-sok/attractions/" },
      { day: "Day 2", title: "Cheow Lan Lake with the full logistics checked", description: "Transfer to the correct pier, register, join the boat route and follow guide instructions around swimming, caves and trails. Stay overnight only when the facilities and programme match your needs.", href: "/city/khao-sok/attractions/" },
      { day: "Day 3", title: "Return with an onward buffer", description: "Treat the boat, pier and road transfer as separate legs. Stay another village night or build generous margin before Surat Thani, Krabi, Khao Lak, Phuket or an island connection.", href: "/city/surat-thani/" },
    ],
  },
  planning: {
    weather: {
      title: "Rain is normal; closures are the real decision point",
      summary: "Khao Sok is a humid rainforest with rain possible in every season. Drier months can make some activities easier, while greener wet periods bring fuller water and fewer visitors. Localised storms and catchment rain can affect caves, trails, rivers and boats even when the village looks calm.",
      best: "Choose the activity from the current forecast and park advice—not a fixed ‘perfect month’.",
      tradeoff: "A rainy day is not automatically lost; an official closure is not negotiable. Keep one flexible village activity and appropriate rain protection.",
      href: "/city/khao-sok/best-time-to-visit/",
      image: "/images/redesign/khao-sok-night-walk.webp",
      imageAlt: "Wet green rainforest foliage in Khao Sok after rain",
    },
    transport: {
      title: "Compare door-to-door time, not map distance",
      summary: "Shared vans connect Khao Sok with Surat Thani, Krabi, Khao Lak and other southern hubs. Cheow Lan departures use a pier away from Khlong Sok village. Routes, pickup points and island connections change, so verify each live leg with the operator.",
      facts: [
        "Ask whether a ticket ends at your hotel, the village stop, a bus terminal or the lake pier; all can be marketed as Khao Sok transport.",
        "For Krabi or Phuket, count pickup windows and any transfer—not just drive time shown on a map.",
        "Never put a tight flight, ferry or sleeper-train departure immediately after a shared lake transfer.",
        "Keep cash and documents dry, but never display large amounts at trailheads or shared stops.",
      ],
      image: "/images/redesign/khao-sok-attractions-hero.webp",
      imageAlt: "Road and karst route connecting Khao Sok with southern Thailand",
    },
  },
  practicalTips: [
    { icon: "map", title: "Confirm the exact base", description: "Village, lake pier and floating stay are different locations. Save every pickup pin offline." },
    { icon: "waves", title: "Use a small dry bag", description: "Protect phone, medicine and documents; leave large luggage where your operator explicitly agrees." },
    { icon: "compass", title: "Never chase wildlife", description: "No feeding, baiting, playback or off-trail pursuit. Follow the guide and keep distance." },
    { icon: "sun", title: "Dress for humidity", description: "Quick-dry layers, grip, water and insect protection matter more than a perfect jungle outfit." },
  ],
  faqs: [
    { question: "Is Khao Sok National Park worth visiting?", answer: "Yes, especially for rainforest, limestone scenery and Cheow Lan Lake. It adds a very different chapter to a southern beach route. Give it two nights at minimum and preferably three so village, forest and lake do not become one transfer-heavy day." },
    { question: "How many days are enough for Khao Sok?", answer: "Three nights is the easiest first visit: arrive in the village, spend a day on a forest or river activity and use the next day for Cheow Lan Lake. Two nights can work when the lake programme and every transfer are booked in advance." },
    { question: "Can you visit Khao Sok without a tour?", answer: "You can book accommodation, eat and explore Khlong Sok village independently. Certain protected trails, caves and lake routes require a guide, boat, registration or permit. Check the park office or a licensed local operator on the day." },
    { question: "Is Khao Sok closer to Krabi or Phuket?", answer: "Khao Sok connects reasonably with both, but the practical answer depends on your exact hotel, pickup and whether you start from an island. Krabi often fits a coast–jungle route cleanly; compare current door-to-door transfers rather than straight-line distance." },
    { question: "Can you see tigers in Khao Sok?", answer: "Wild tigers may exist in the broader forest landscape, but an ordinary visitor should not expect to see one. Avoid any operator promising a guaranteed large-wildlife sighting. A responsible nature walk focuses on habitat, signs and the many smaller species guides can find safely." },
    { question: "Is it safe to swim in Cheow Lan Lake?", answer: "Swimming may be allowed in designated conditions, but water depth, boats, weather and local instructions matter. Wear the provided flotation device, stay within the guide’s area and never assume permission from an old travel post." },
    { question: "What is the best time to visit Khao Sok?", answer: "There is no completely dry rainforest season. Relatively drier periods can simplify trails and boat days; wetter months bring lush scenery and a higher chance of disrupted caves, rivers or routes. Check official weather and park advice close to travel." },
    { question: "Do I need malaria tablets for Khao Sok?", answer: "That is an individual medical decision, not a destination-page rule. Consult a qualified travel-health professional using your full route, season, trip length and health history. Use mosquito precautions regardless of medication advice." },
  ],
  relatedGuides: [
    { title: "Things to do in Khao Sok", description: "Compare lake, forest, river and wildlife activities by logistics and conditions.", href: "/city/khao-sok/attractions/", image: "/images/redesign/khao-sok-attractions-hero.webp", imageAlt: "Boat journey through Khao Sok karst scenery" },
    { title: "Compare Thailand hotels", description: "Use current availability while the dedicated English Khao Sok stay owner is being rebuilt.", href: "/top-10/hotels/", image: "/images/redesign/khao-sok-stay-treehouse.webp", imageAlt: "Jungle accommodation near Khao Sok village" },
    { title: "Surat Thani route guide", description: "Connect the park with its nearest major rail, bus and airport gateway.", href: "/city/surat-thani/", image: "/images/redesign/khao-sok-jungle-village.webp", imageAlt: "Village road and rainforest edge in Khao Sok" },
  ],
  sources: [
    { title: "Khao Sok National Park", creator: "Tourism Authority of Thailand", url: "https://www.tourismthailand.org/Attraction/khao-sok-national-park", note: "Official destination context; current access, fees and closures must still be checked with park staff." },
    { title: "10 things to do in Surat Thani", creator: "Tourism Authority of Thailand", url: "https://www.tourismthailand.org/Articles/10-things-to-do-in-suratthani", note: "Official regional context for Khao Sok and the park headquarters." },
    { title: "Khao Sok National Park guide", creator: "Thai National Parks", url: "https://www.thainationalparks.com/khao-sok-national-park", note: "Detailed geography and wildlife context; no dynamic price or opening claim is copied." },
    { title: "Thailand travel advice", creator: "UK Foreign, Commonwealth & Development Office", url: "https://www.gov.uk/foreign-travel-advice/thailand", note: "Current national safety and health advice; travellers should consult live updates." },
    { title: "Thailand weather", creator: "Thai Meteorological Department", url: "https://www.tmd.go.th/en", note: "Primary source for current forecasts and warnings before forest, river and boat activities." },
  ],
};
