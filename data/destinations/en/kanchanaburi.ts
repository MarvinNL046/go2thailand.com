import type { DestinationGuideData } from "../types";

export const kanchanaburiDestinationGuideEn: DestinationGuideData = {
  citySlug: "kanchanaburi",
  cityName: "Kanchanaburi",
  locale: "en",
  pageTitle: "Kanchanaburi Thailand: River Kwai & 3-day guide 2026",
  pageDescription:
    "Plan Kanchanaburi by geography: understand the River Kwai history, give Erawan a separate day and compare town, railway, Sai Yok and far-west routes.",
  pageUrl: "https://go2-thailand.com/city/kanchanaburi/",
  dateModified: "2026-07-27",
  coordinates: { latitude: 14.0228, longitude: 99.5328 },
  touristType: ["History travellers", "Nature travellers", "Rail travellers", "Bangkok extensions"],
  stayGuideHref: "/where-to-stay/kanchanaburi/",
  foodGuideHref: "/city/kanchanaburi/food/",
  hero: {
    image: "/images/redesign/kanchanaburi-destination-hero.webp",
    imageAlt: "Steel bridge over the River Khwae at sunrise in Kanchanaburi",
    eyebrow: "River, remembrance and a province larger than one day trip",
    title: "Kanchanaburi",
    accent: "Thailand",
    subtitle: "Begin with historical context. Give waterfalls and the western railway their own time.",
    description:
      "Kanchanaburi connects the bridge, museums and cemeteries with Erawan, the railway toward Nam Tok and remote river landscapes. Three nights make the first journey coherent; a Bangkok day trip forces remembrance, transport and sightseeing into one narrow window.",
    imageClassName: "object-cover object-[66%_center] lg:object-center",
    stats: [
      { label: "Useful first stay", value: "3 nights", icon: "calendar" },
      { label: "First base", value: "Kanchanaburi town", icon: "hotel" },
      { label: "Separate nature day", value: "Erawan", icon: "waves" },
    ],
  },
  quickAnswer: {
    eyebrow: "First decide: province or day trip",
    title: "Kanchanaburi is worth visiting when history is not rushed",
    paragraphs: [
      "Kanchanaburi is known internationally for the Thailand–Burma Railway and the bridge over the River Khwae. The history involves forced labour, prisoners of war, immense suffering and deaths across a much larger wartime railway system. A museum and cemetery provide essential context before a train ride or bridge photograph.",
      "The destination is also geographic: town remembrance sites, the western railway corridor, Erawan National Park and the far-west province are different travel blocks. Erawan is not a short stop beside the bridge; Sangkhla Buri is not a casual extra after the waterfall.",
      "Three nights give most first visitors the right balance: a town history day, one full Erawan day and one railway or upriver chapter. A day trip from Bangkok is possible, but should focus on a respectful town sequence or one managed excursion—not museum, bridge, train and seven waterfall tiers in one race.",
    ],
    verdicts: [
      { label: "Is Kanchanaburi worth it?", value: "Yes, from 2–3 nights", description: "Strong for remembrance, river landscape and a nature extension from Bangkok.", icon: "sparkles" },
      { label: "Day trip?", value: "Possible, but narrow", description: "Choose history in town or one organised nature day; do not promise both depth and distance.", icon: "calendar" },
      { label: "Best first base", value: "Kanchanaburi town", description: "Easiest for museums, cemetery, bridge, food and onward rail or road planning.", icon: "hotel" },
      { label: "Main planning error", value: "Flattening the province", description: "Erawan, Sai Yok and Sangkhla Buri are separate road and time decisions.", icon: "map" },
    ],
  },
  zones: [
    {
      slug: "town-remembrance",
      name: "Town remembrance route",
      kicker: "Museum, cemetery and bridge in context",
      image: "/images/redesign/kanchanaburi-history-route-v2.webp",
      imageAlt: "Respectful visual route from railway museum and cemetery toward the River Khwae bridge",
      summary:
        "Begin with a credible museum and the Kanchanaburi War Cemetery before approaching the bridge. That order replaces film shorthand with names, labour conditions and the wider railway system. Keep voices low in memorial spaces and never turn graves or remembrance into a playful photo set.",
      bestFor: "Every first visit, history travellers and a focused Bangkok day trip.",
      tradeoff: "The bridge alone does not explain the history. Opening times and commemorations can change, so verify current access.",
    },
    {
      slug: "western-railway",
      name: "Western railway corridor",
      kicker: "Wang Pho, Nam Tok and landscape with context",
      image: "/images/redesign/kanchanaburi-wampo-railway.webp",
      imageAlt: "Train following the cliffside railway at Wang Pho in Kanchanaburi Province",
      summary:
        "The current rail journey toward Nam Tok passes sections of the wartime route and the cliffside Wang Pho viaduct. It can be moving and visually striking, but a timetable is not interpretation. Decide where to board, where to leave and how to return before treating the train as a spontaneous loop.",
      bestFor: "Rail enthusiasts, history travellers and a complete second day with road-return planning.",
      tradeoff: "Services and carriage comfort vary. Do not hang from doors, block passengers or lean into exposed edges for photographs.",
    },
    {
      slug: "erawan",
      name: "Erawan National Park",
      kicker: "A full nature day, not a bridge add-on",
      image: "/images/redesign/kanchanaburi-erawan-waterfall.webp",
      imageAlt: "Turquoise forest pools at Erawan Waterfall",
      summary:
        "Erawan’s tiered waterfall rewards an early start, footwear with grip and enough time to turn around safely. Water levels, swimming zones, trail access and wildlife rules change with weather and park management. Check the park’s current notice rather than assuming every tier is open.",
      bestFor: "A separate day, walkers, families who can adapt the route and travellers staying at least two nights.",
      tradeoff: "Heat, slippery surfaces and distance make ‘all tiers plus train plus bridge’ poor first-trip planning.",
    },
    {
      slug: "sai-yok-sangkhla",
      name: "Sai Yok & far-west province",
      kicker: "Upriver stays and a separate journey",
      image: "/images/redesign/kanchanaburi-mon-bridge.webp",
      imageAlt: "Wooden Mon Bridge and misty hills at Sangkhla Buri",
      summary:
        "Sai Yok offers river lodges and railway landscapes farther west; Sangkhla Buri sits much deeper in the province with the Mon Bridge and borderland communities. These areas should be treated as additional nights, not as remote attractions attached to a town hotel.",
      bestFor: "Four- to six-day routes, quieter river stays and travellers prepared for longer road stages.",
      tradeoff: "Distance, road conditions and limited transport make the far west unsuitable for a compressed Bangkok return day.",
    },
  ],
  highlights: [
    {
      eyebrow: "Context before the photograph",
      title: "Begin with people, not the bridge silhouette",
      image: "/images/redesign/kanchanaburi-history-route-v2.webp",
      imageAlt: "Quiet remembrance route through Kanchanaburi’s railway history",
      description:
        "A museum and cemetery establish who built the railway, under what conditions and at what human cost. Only then does the bridge become part of a wider system rather than a film location. Use precise, respectful language and give memorial spaces time.",
      decision: "Place museum and cemetery before bridge and train; leave entertainment framing outside the remembrance route.",
      href: "/city/kanchanaburi/attractions/",
    },
    {
      eyebrow: "Waterfall day",
      title: "Let Erawan decide the day’s intensity",
      image: "/images/redesign/kanchanaburi-erawan-waterfall.webp",
      imageAlt: "Forest path and turquoise water at Erawan National Park",
      description:
        "Start early, check the live park notice and choose the turn-around point around heat, trail grip and the least mobile traveller. Swimming is only one part of the forest experience and never a reason to ignore closures or wildlife instructions.",
      decision: "Keep Erawan separate from the western railway unless a current organised route clearly makes the handover safe and realistic.",
      href: "/city/kanchanaburi/attractions/",
    },
    {
      eyebrow: "The province continues west",
      title: "Sleep upriver when the landscape is the reason",
      image: "/images/redesign/kanchanaburi-upriver-stay-v2.webp",
      imageAlt: "Quiet river lodge between forested hills in western Kanchanaburi",
      description:
        "An upriver night changes the trip from repeated day transfers into a slower landscape chapter. Compare the actual road or boat access, meal plan, electricity, signal and return transport rather than booking from a floating-room image alone.",
      decision: "Split town and river bases only when the extra transfer buys a full experience, not merely a different bed.",
      href: "/where-to-stay/kanchanaburi/",
    },
  ],
  featureBanner: {
    image: "/images/redesign/kanchanaburi-history-route-v2.webp",
    imageAlt: "Dotted respectful route from museum and cemetery to bridge and western railway",
    eyebrow: "Four stops, one ethical sequence",
    title: "Museum. Cemetery. Bridge. Railway landscape.",
    description: "This order adds human context before scenery and keeps the railway story connected without pretending every site is entertainment.",
  },
  food: {
    image: "/images/redesign/kanchanaburi-riverside-food.webp",
    imageAlt: "Thai dishes and river fish served at a Kanchanaburi riverside table",
    eyebrow: "A slower river evening",
    title: "Use dinner to stop moving west for a moment",
    description:
      "Kanchanaburi town has enough local food and riverside choice to reward an overnight. Look for regional curries, river fish and market dishes without assuming one restaurant or market schedule is permanent. Ask clearly about fish sauce, shrimp paste, shellfish, peanuts and shared fryers.",
    dishes: [
      { name: "River fish", description: "Species, size and price vary. Confirm the fish, weight, cooking method and total price before ordering; ask about bones and shared sauces." },
      { name: "Jungle-style curry", description: "A hot, aromatic curry that may be made without coconut milk but commonly uses fish sauce or shrimp paste. Ask about the complete paste and stock." },
      { name: "Market dinner", description: "Choose a market that is actually operating that evening, sample small portions and keep a seated fallback when weather or schedule changes." },
    ],
  },
  itinerary: {
    eyebrow: "Three nights, three distinct chapters",
    title: "Kanchanaburi without making remembrance compete with swimming",
    description: "Keep the town history, Erawan and railway or upriver landscape as separate blocks. Add the far west only with more nights.",
    days: [
      { day: "Arrival", title: "Town base and river orientation", description: "Check in near the part of town that serves tomorrow’s route, confirm current rail or park information and use the evening for a calm river walk and dinner—not a rushed memorial visit.", href: "/where-to-stay/kanchanaburi/" },
      { day: "Day 1", title: "Museum, cemetery, bridge", description: "Begin with interpretation, continue quietly through the cemetery and approach the bridge with that context. Add only a short second museum or old-town stop if attention remains.", href: "/city/kanchanaburi/attractions/" },
      { day: "Day 2", title: "Erawan as a complete day", description: "Leave early, follow current park rules and choose a safe turn-around. Return with enough daylight and do not attach a late train segment merely to maximise the checklist.", href: "/city/kanchanaburi/" },
      { day: "Day 3", title: "Western railway or upriver stay", description: "Ride a planned section toward Nam Tok with a confirmed return, or move to a river lodge for another night. Sangkhla Buri needs additional days beyond this first route.", href: "/city/kanchanaburi/attractions/" },
    ],
  },
  planning: {
    weather: {
      title: "Water level, heat and trail conditions shape the nature day",
      summary: "The cooler, relatively drier period generally makes town walks and railway travel easier. Erawan can look different by season, and heavy rain may affect trails, swimming or roads. Current park notices matter more than a waterfall photograph from another month.",
      best: "For balance, favour cooler mornings and verify Erawan conditions close to travel.",
      tradeoff: "Lower water can reduce the visual effect; high water can close or make sections unsafe. Neither is solved by a fixed annual promise.",
      href: "/city/kanchanaburi/",
      image: "/images/redesign/kanchanaburi-erawan-waterfall.webp",
      imageAlt: "Seasonal water and forest trail at Erawan Waterfall",
    },
    transport: {
      title: "Plan by corridor, not by province name",
      summary: "Bangkok road and rail services reach Kanchanaburi town; local rail continues west on a current timetable. Erawan, Sai Yok and Sangkhla Buri need separate road or organised transport decisions. Compare the full out-and-back route, not only the outward ticket.",
      facts: [
        "Bangkok departure points and rail schedules can change; verify the operator and station for the exact date.",
        "The bridge area, central bus points and your hotel may not be walkable with luggage in midday heat.",
        "For Erawan, confirm the final return as carefully as the outward service.",
        "A car is useful only with correct licence, insurance and confident left-side driving; remote road hours remain real.",
      ],
      image: "/images/redesign/kanchanaburi-wampo-railway.webp",
      imageAlt: "Railway corridor through western Kanchanaburi",
    },
  },
  practicalTips: [
    { icon: "sparkles", title: "Use precise history", description: "Avoid film shorthand and playful framing in museums, cemeteries and places connected to forced labour and death." },
    { icon: "waves", title: "Check Erawan live", description: "Park access, swimming, tiers and trail conditions can change with weather and management." },
    { icon: "map", title: "Save the return route", description: "Keep stations, park stop, hotel and driver contact offline before travelling west." },
    { icon: "car", title: "Do not flatten distance", description: "Town, Erawan, Sai Yok and Sangkhla Buri are separate itinerary decisions." },
  ],
  faqs: [
    { question: "Is Kanchanaburi worth visiting?", answer: "Yes. Kanchanaburi combines important Second World War history with river and forest landscapes. Spend at least two nights and preferably three so museum, cemetery and bridge context do not compete with Erawan or a western railway day." },
    { question: "How many days do you need in Kanchanaburi?", answer: "Three nights is a strong first plan: one town-history day, one Erawan day and one western railway or upriver chapter. Two nights works with a single excursion. Sangkhla Buri or a deep far-west route needs additional days." },
    { question: "Can you do a day trip to Kanchanaburi from Bangkok?", answer: "Yes, but keep it focused. A context-first town route or one managed Erawan excursion can work. Combining long Bangkok transfers, museums, cemetery, bridge, train and waterfall in one day sacrifices depth and margin." },
    { question: "Why is Kanchanaburi famous?", answer: "It is widely known for the Thailand–Burma Railway, the bridge over the River Khwae and the wartime suffering connected to construction. The province is also known for Erawan National Park, western railway landscapes and remote river country." },
    { question: "Is the Death Railway worth it?", answer: "A planned rail section can add landscape and spatial understanding after museum context. It should not be treated as a thrill ride detached from forced labour and loss. Verify the current timetable, boarding point and return route." },
    { question: "Is Erawan Falls worth visiting?", answer: "Yes when you enjoy forest walks and can give the park most of a day. Water level and access vary. Start early, wear suitable footwear and follow current park instructions around swimming, wildlife and any closed sections." },
    { question: "How long do you need at Erawan Falls?", answer: "Allow most of a day including travel from town. The correct trail duration depends on heat, fitness, water and current access. Choose a safe turn-around rather than treating the highest tier as compulsory." },
    { question: "Do you need a car in Kanchanaburi?", answer: "Not for a focused town stay. Train, local rides and organised excursions can cover the main first-trip route. A car adds flexibility farther west, but only with the correct licence, insurance and confident driving." },
    { question: "Where is the best place to stay in Kanchanaburi?", answer: "Stay in Kanchanaburi town for museums, cemetery, bridge, food and easier transport. Choose an upriver lodge when nature and quiet justify the extra transfer. Sangkhla Buri is a separate destination, not a town-hotel area." },
    { question: "How do I get from Bangkok to Kanchanaburi?", answer: "Current options include rail, bus or van, private transfer and organised tour. Compare the Bangkok departure point, arrival point, total time and your hotel transfer. Verify live schedules rather than relying on an old fare or timetable." },
  ],
  relatedGuides: [
    { title: "Things to do in Kanchanaburi", description: "Separate remembrance, railway, waterfall and far-west routes by meaning and distance.", href: "/city/kanchanaburi/attractions/", image: "/images/redesign/kanchanaburi-history-route-v2.webp", imageAlt: "Kanchanaburi remembrance route" },
    { title: "Where to stay in Kanchanaburi", description: "Choose town, bridge area or upriver base around the next day’s real route.", href: "/where-to-stay/kanchanaburi/", image: "/images/redesign/kanchanaburi-upriver-stay-v2.webp", imageAlt: "Quiet upriver lodge in Kanchanaburi" },
    { title: "Best time for Kanchanaburi", description: "Compare heat, water level, trail conditions and railway comfort.", href: "/city/kanchanaburi/", image: "/images/redesign/kanchanaburi-erawan-waterfall.webp", imageAlt: "Erawan Waterfall conditions" },
  ],
  sources: [
    { title: "Kanchanaburi destination", creator: "Tourism Authority of Thailand", url: "https://www.tourismthailand.org/Destinations/Provinces/Kanchanaburi/109", note: "Official province context for major historical and natural areas." },
    { title: "Commonwealth war cemeteries in Kanchanaburi", creator: "Commonwealth War Graves Commission", url: "https://www.cwgc.org/visit-us/find-cemeteries-memorials/cemetery-details/2017100/kanchanaburi-war-cemetery/", note: "Primary remembrance context for the cemetery and those commemorated." },
    { title: "State Railway of Thailand", creator: "State Railway of Thailand", url: "https://www.railway.co.th/", note: "Primary source for current western-line services; no timetable is frozen into copy." },
    { title: "Department of National Parks", creator: "DNP Thailand", url: "https://www.dnp.go.th/", note: "Primary authority for current Erawan access and park notices." },
    { title: "Thailand weather", creator: "Thai Meteorological Department", url: "https://www.tmd.go.th/en", note: "Primary source for current weather and warnings." },
  ],
};
