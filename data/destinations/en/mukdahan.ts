import type { DestinationGuideData } from "../types";

export const mukdahanDestinationGuideEn: DestinationGuideData = {
  citySlug: "mukdahan",
  cityName: "Mukdahan",
  locale: "en",
  pageTitle: "Mukdahan Thailand Guide: Things to Do & Mekong Route",
  pageDescription:
    "Plan Mukdahan in northeast Thailand: Mekong riverfront, Indochina Market, Phu Manorom, Phu Pha Thoep, transport, food and Laos border context.",
  pageUrl: "https://go2-thailand.com/city/mukdahan/",
  dateModified: "2026-07-27",
  coordinates: { latitude: 16.5453, longitude: 104.7235 },
  touristType: ["Mekong travellers", "Slow travellers", "Culture travellers", "Isaan road trips"],
  stayGuideHref: "/best-hotels/mukdahan/",
  foodGuideHref: "/city/mukdahan/food/",
  hero: {
    image: "/images/redesign/mukdahan-hero.webp",
    imageAlt: "Mukdahan riverfront and the broad Mekong in warm morning light",
    eyebrow: "A border city without the rush",
    title: "Mukdahan",
    accent: "Thailand",
    subtitle: "Where the Mekong becomes both view and route.",
    description:
      "Mukdahan sits in Isaan on the Mekong opposite Savannakhet in Laos. Its appeal is not a dense checklist: it is a river city of markets, breakfast, regional history and late light, with Ho Kaeo and Phu Manorom outside the compact riverside strip. Give the city two nights; add a third when Phu Pha Thoep becomes a real nature day rather than another rushed pin.",
    imageClassName: "object-cover object-[58%_center] lg:object-center",
    stats: [
      { label: "Good first stay", value: "2–3 nights", icon: "calendar" },
      { label: "Best first base", value: "By the Mekong", icon: "hotel" },
      { label: "Strongest pairing", value: "River & Isaan", icon: "waves" },
    ],
  },
  quickAnswer: {
    eyebrow: "City, province and Laos are three decisions",
    title: "Mukdahan is worth visiting when the Mekong is the journey, not a transfer",
    paragraphs: [
      "Mukdahan names both a province and its capital in northeast Thailand. The walkable experience concentrates around the Mekong promenade, Indochina Market and nearby commercial streets. Ho Kaeo stands inland, Phu Manorom rises outside the central walk, and Phu Pha Thoep National Park is a separate provincial trip. Treating all four as one compact centre creates an itinerary made mostly of transport.",
      "The city works in a deliberately slow rhythm. Start with rice-noodle soup or a Vietnamese-influenced breakfast, use the cooler morning for the river and market, and reserve late afternoon for Phu Manorom or a second promenade walk. Ho Kaeo adds the geography that a map alone misses. The bridge to Savannakhet explains Mukdahan's international role, but it is border infrastructure rather than a casual pedestrian attraction.",
      "Two nights cover an arrival evening, one complete city day and a final morning. Three nights create space for Phu Pha Thoep, local communities or a second unhurried city day. Mukdahan is a weaker fit for travellers wanting beaches, resort nightlife or a full menu of organised day tours. Its reward is ordinary Mekong life—food, trade, temples and cross-border history—without a performance schedule.",
    ],
    verdicts: [
      { label: "Worth visiting?", value: "Yes, for slow travel", description: "Strong for river light, local food, markets and a wider Isaan route.", icon: "sparkles" },
      { label: "How long?", value: "2–3 nights", description: "Two for the city; three with a genuine provincial nature day.", icon: "calendar" },
      { label: "Best first base", value: "Riverfront", description: "Practical for walking, breakfast, market browsing and sunset.", icon: "map" },
      { label: "Biggest route mistake", value: "Adding Laos casually", description: "Savannakhet requires a separate border and document plan.", icon: "compass" },
    ],
  },
  zones: [
    {
      slug: "mekong-indochina-market",
      name: "Mekong & Indochina Market",
      kicker: "The logical first city zone",
      image: "/images/redesign/mukdahan-indochina-market.webp",
      imageAlt: "Textiles and local stalls at Indochina Market beside the Mekong in Mukdahan",
      summary:
        "This river zone joins the promenade, small shops, snacks, textiles and goods moving through the wider border region. Walk it once without purchase pressure, notice how the market reflects Mukdahan's trading role, then return when the evening light reaches Savannakhet. It is a working regional market, not a curated lifestyle attraction, and the mix changes with day and time.",
      bestFor:
        "First-time visitors, easy river walks, local browsing, morning and evening light, and a hotel base with fewer transport changes.",
      tradeoff:
        "Not every item is made locally and not every food, plant or animal product can cross customs or fly home. Ask where and how something was made, compare materials, negotiate politely and check import rules before buying anything regulated or perishable.",
    },
    {
      slug: "ho-kaeo-city-context",
      name: "Ho Kaeo & city context",
      kicker: "A viewpoint that makes the map useful",
      image: "/images/redesign/mukdahan-ho-kaeo.webp",
      imageAlt: "White Ho Kaeo observation tower above the low cityscape of Mukdahan",
      summary:
        "Ho Kaeo is Mukdahan's recognisable observation tower. Exhibits introduce the province and its communities, while the upper view places the city, Mekong, bridge corridor and flat hinterland in one frame. That orientation is more useful than treating the tower as a single photograph. Pair it with a city transport loop rather than interrupting a riverside walk.",
      bestFor:
        "First-day orientation, regional history, city photography and travellers planning beyond the municipal centre.",
      tradeoff:
        "The tower is not on the compact market strip. Recheck current opening, exhibition access and payment locally, then arrange both the outward and return ride. Haze or heavy rain can shorten the view even when the museum layer remains worthwhile.",
    },
    {
      slug: "phu-manorom",
      name: "Phu Manorom",
      kicker: "A living hill temple above the border plain",
      image: "/images/redesign/mukdahan-phu-manorom.webp",
      imageAlt: "Large white Buddha and blue-green naga at Phu Manorom above Mukdahan",
      summary:
        "Wat Roi Phra Phutthabat Phu Manorom occupies a wooded hill outside the central walk. A large white Buddha, blue-green naga and replica Buddha footprint share the site with wide views across Mukdahan, the Mekong and Savannakhet. It is an active religious place before it is a viewpoint, so allow worshippers and ceremonies space instead of moving through it as a photo set.",
      bestFor:
        "Temple architecture, panoramic context, quiet late afternoons and visitors comfortable with respectful religious-site etiquette.",
      tradeoff:
        "Slope, steps, heat and local transport determine the real visit time. Cover shoulders and knees, speak softly and follow local shoe and photography rules. Confirm access and a return ride on the day; a sunset drop-off is not a transport plan by itself.",
    },
    {
      slug: "phu-pha-thoep",
      name: "Phu Pha Thoep",
      kicker: "A province nature day, not a city stop",
      image: "/images/redesign/mukdahan-phu-pha-thoep.webp",
      imageAlt: "Layered sandstone formations and dry forest in Phu Pha Thoep National Park",
      summary:
        "Phu Pha Thoep National Park is associated with eroded sandstone shelves and mushroom-like rock forms in dry dipterocarp forest. The open, rocky landscape is a deliberate contrast to the riverfront and changes visibly with season. Treat it as one outdoor block with water, sun protection, proper shoes and current information about access and marked routes.",
      bestFor:
        "Geology, short nature walks, dry Isaan landscapes and a third travel day beyond the city.",
      tradeoff:
        "Map distance does not describe heat, storm risk or trail condition. Check current park notices and the provincial forecast, start early and turn back when grip, marking or weather is uncertain. Do not stack it with several outer temples merely because pins look close at small scale.",
    },
  ],
  highlights: [
    {
      title: "Read the bridge as infrastructure, not a viewpoint attraction",
      eyebrow: "Mukdahan and Savannakhet connect, but remain separate travel blocks",
      image: "/images/redesign/mukdahan-friendship-bridge.webp",
      imageAlt: "Second Thai-Lao Friendship Bridge crossing the Mekong from Mukdahan to Savannakhet",
      description:
        "The Second Thai–Lao Friendship Bridge carries the road connection between Mukdahan and Savannakhet and anchors a wider Thailand–Laos–Vietnam corridor. It sits outside the compact river zone. You may see it in the landscape, but its practical value is transport and border processing—not a spontaneous walk from the promenade.",
      decision:
        "Plan Savannakhet as an international journey. Recheck passport validity, visa or exemption, official checkpoint status, permitted bridge transport and insurance shortly before travel. An old ferry, visa-run or bus report is not evidence for your departure day.",
      href: "/transport/",
    },
    {
      title: "Eat a table that does not stop at one modern border",
      eyebrow: "Isaan, Lao and Vietnamese influences in the morning bowl",
      image: "/images/redesign/mukdahan-food.webp",
      imageAlt: "Rice-noodle soup with herbs and chilli at a local Mukdahan breakfast shop",
      description:
        "Mukdahan's food joins spicy Isaan dishes, Lao-related flavours and Vietnamese breakfast traditions. Khao piak sen or kuai chap yuan makes a gentle start; later meals can bring larb, sticky rice, grilled meat, vegetables and seasonal produce to one shared table. The interesting story is migration and trade, not deciding which nation owns a recipe.",
      decision:
        "Go early, share small dishes and ask directly about stock, pork, fish or oyster sauce, peanuts and fermented ingredients when diet or allergy matters. A clear soup or vegetable garnish is not automatically vegetarian.",
      href: "/city/mukdahan/food/",
    },
    {
      title: "Choose textiles by maker and method, not pattern alone",
      eyebrow: "Mudmee silk and communities beyond the market strip",
      image: "/images/redesign/mukdahan-indochina-market.webp",
      imageAlt: "Woven textiles displayed among everyday market trade in Mukdahan",
      description:
        "Official province material links Mukdahan with Mudmee silk and several ethnic communities. The market mixes local, regional and imported goods, so ask who made a textile, what fibre it uses and whether the pattern has local meaning. That turns a souvenir into a conversation about labour and craft rather than a decorative label.",
      decision:
        "Treat a label as a starting point, not proof. Prefer one well-made piece to a bag of anonymous products and ask before photographing a seller or maker. A community visit needs local context and arranged transport rather than an unannounced arrival.",
      href: "/city/mukdahan/attractions/",
    },
  ],
  featureBanner: {
    image: "/images/redesign/mukdahan-river-route.webp",
    imageAlt: "Traveller cycling beside the Mukdahan Mekong promenade at sunset",
    eyebrow: "The river is your first route",
    title: "Complete one Mukdahan day before adding the province or Laos.",
    description:
      "Breakfast, market, Ho Kaeo, Phu Manorom and evening river light form one city story. Phu Pha Thoep and Savannakhet become stronger as separate decisions with their own transport and preparation.",
  },
  food: {
    image: "/images/redesign/mukdahan-food.webp",
    imageAlt: "Khao piak sen with rice noodles, herbs, lime and chilli in Mukdahan",
    eyebrow: "Breakfast at a three-culture crossroads",
    title: "Begin gently with rice noodles; build the Isaan heat later.",
    description:
      "Food is one of Mukdahan's clearest routes into life along the middle Mekong. Start with hot rice noodles and coffee, see what the produce market genuinely has that day, then share stronger Isaan flavours in the evening. Avoid relying on one old 'best restaurant' list: family businesses, market days and opening patterns change. Save several options in the same zone and choose by ingredients, freshness and local use.",
    dishes: [
      { name: "Khao piak sen / kuai chap yuan", description: "Thick or broad rice noodles arrive in a clear broth, often with pork or chicken, herbs, fried garlic and sometimes Vietnamese sausage. Names and preparation vary by family. Ask about stock and toppings when avoiding pork, gluten or animal products." },
      { name: "Larb, sticky rice & vegetables", description: "Larb mixes chopped meat or fish with lime, chilli, herbs and toasted rice. Eat it with sticky rice and raw vegetables, set the heat level and request fully cooked meat. Fermented fish and stock can be present without being visible on the plate." },
      { name: "Mekong fish & seasonal produce", description: "Freshwater dishes belong to the river story, but species, source and availability vary. Choose a busy kitchen, ask what is fresh and avoid protected or vaguely identified wildlife. Sweet tamarind and other provincial produce are seasonal rather than guaranteed." },
    ],
  },
  itinerary: {
    eyebrow: "One compact river day, two deliberate extensions",
    title: "A Mukdahan itinerary that respects real distances",
    description:
      "The riverfront can be read on foot; Ho Kaeo and Phu Manorom need local transport. Phu Pha Thoep and Savannakhet replace a normal city day instead of sitting on top of one.",
    days: [
      { day: "Arrival", title: "Check in by the river and confirm the moving parts", description: "Choose a base around the Mekong or central market zone. Take a short orientation walk, see which market is genuinely active and confirm breakfast, opening and transport for Ho Kaeo or Phu Manorom.", href: "/best-hotels/mukdahan/" },
      { day: "Day 1", title: "Breakfast, Indochina Market, Ho Kaeo and Phu Manorom", description: "Start early with khao piak, follow the market and promenade, then visit Ho Kaeo if current access fits. Rest through the hottest block and use arranged transport for Phu Manorom before returning to the river.", href: "/city/mukdahan/attractions/" },
      { day: "Day 2", title: "Choose Phu Pha Thoep or a second slow city day", description: "Travel early to the national park only when weather, access and return transport align. Otherwise deepen the food, textile and riverside story without extra kilometres. Both are better than forcing park, temple and border into one day.", href: "/city/mukdahan/" },
      { day: "Next route", title: "Continue to Nakhon Phanom or plan Laos separately", description: "Route 212 follows the Thai Mekong towards Nakhon Phanom. Savannakhet requires its own border, document and onward-transport checks; do not add it casually to a hotel checkout morning.", href: "/city/nakhon-phanom/" },
    ],
  },
  planning: {
    weather: {
      title: "Cooler months help, but the Mekong remains tropical",
      summary:
        "November through February is usually the easiest period for walking, temples and nature blocks because heat and rain are often lower. March and April can be intensely hot. Rainy season makes forest and river greener, but also increases heavy showers, storms, slippery rock and disruption on outdoor routes.",
      best: "Often most comfortable: Nov–Feb",
      tradeoff:
        "A climate average cannot predict your park day. Check the current provincial forecast and Thai Meteorological Department warnings, start outdoor activity early and switch to breakfast, market, Ho Kaeo or a quiet city block in heat or storms. Do not walk exposed wet rock when grip or marking is uncertain.",
      href: "/weather/",
      image: "/images/redesign/mukdahan-hero.webp",
      imageAlt: "The Mekong at Mukdahan in calm dry-season morning light",
    },
    transport: {
      title: "Mukdahan is a road hub, not a passenger airport or rail city",
      summary:
        "Mukdahan has no operating commercial passenger airport and no passenger railway station. Long-distance buses and road transfers form the core network. Flying means landing elsewhere in Isaan and continuing by road; the best airport depends on live flights, transfer availability and the route before or after Mukdahan.",
      facts: [
        "Compare door-to-door time instead of headline flight distance. Check the current Department of Airports list and airline schedule, then arrange the road transfer to Mukdahan before booking.",
        "For Ho Kaeo, Phu Manorom and Phu Pha Thoep, agree the exact pin, total price, waiting time and return ride. App transport can thin out beyond the centre or later in the evening.",
        "For Savannakhet, recheck checkpoint status, passport, visa or exemption, permitted bridge transport and insurance with official Thai and Lao sources. Old ferry and visa-run posts are not border instructions.",
      ],
      image: "/images/redesign/mukdahan-friendship-bridge.webp",
      imageAlt: "Second Thai-Lao Friendship Bridge carrying road traffic between Mukdahan and Savannakhet",
    },
  },
  practicalTips: [
    { icon: "map", title: "Read the four zones first", description: "Riverfront, Ho Kaeo, Phu Manorom and Phu Pha Thoep are not one walk. Check the exact pin and actual drive time before fixing a driver or day plan." },
    { icon: "waves", title: "Use the cooler river light", description: "Walk early and late, and reserve the hottest block for food, rest or an indoor stop. Keep away from slippery edges and closed areas during high water or storms." },
    { icon: "food", title: "Ask about the stock", description: "Clear soup and vegetables can still contain pork, fish, oyster sauce or peanuts. State diet and allergy before ordering and keep critical phrases available in Thai." },
    { icon: "car", title: "Make Laos a border day", description: "Seeing the bridge is not permission to cross it. Recheck documents, checkpoint status, transport and cover with official sources shortly before departure." },
  ],
  faqs: [
    { question: "Is Mukdahan worth visiting?", answer: "Yes, if you value a quiet Mekong city, local food, markets and a less-visited Isaan route. It is less suitable for beach resorts, large nightlife or a dense programme of organised tours. Two nights let the city work at its natural pace." },
    { question: "What is Mukdahan known for?", answer: "Mukdahan is known for its Mekong setting opposite Savannakhet, Indochina Market, Ho Kaeo tower, Phu Manorom, Phu Pha Thoep's sandstone landscape, Mudmee silk and a population shaped by several regional communities." },
    { question: "What are popular dishes from Mukdahan?", answer: "Look for khao piak sen or kuai chap yuan rice-noodle soup, larb with sticky rice, grilled dishes, seasonal produce and Vietnamese-influenced breakfast. Names and ingredients vary, so ask about stock, pork, fish sauce, fermented fish and peanuts when diet or allergy matters." },
    { question: "What is the weather like in Mukdahan?", answer: "Mukdahan is tropical: the cooler, drier months are generally most comfortable; March and April can be very hot; rainy season brings heavy showers, storms and greener landscapes. Check the live provincial forecast rather than using a monthly average as a guarantee." },
    { question: "Is Mukdahan safe for tourists?", answer: "Many visitors experience Mukdahan as a calm city, but normal precautions still apply around traffic, heat, valuables and late transport. Use current travel advice. A Laos crossing adds separate passport, immigration, insurance and checkpoint requirements." },
    { question: "What to do in Mukdahan?", answer: "Walk the Mekong promenade and Indochina Market, use Ho Kaeo to understand the city, eat an early local breakfast and visit Phu Manorom with arranged transport. Add Phu Pha Thoep as a separate nature day rather than squeezing it into the city loop." },
    { question: "What is the best time to visit Mukdahan?", answer: "November through February is usually the most comfortable period for walking and outdoor stops. March and April are hotter, while rainy season can bring storms and slippery rock. Check the Thai Meteorological Department for your actual travel week." },
    { question: "Does Mukdahan have an airport?", answer: "Mukdahan does not currently have an operating commercial passenger airport. Fly to another Isaan airport and continue by road, or use a long-distance bus. Search engines may display proposed or misleading airport entries, so confirm live airports and flights with official operators." },
    { question: "Are there any national parks near Mukdahan?", answer: "Yes. Phu Pha Thoep National Park is the most practical nature addition from the city and is known for weathered sandstone formations and dry forest. Treat it as an outdoor day and verify current access, routes and weather before leaving." },
    { question: "How many Thai Laos Friendship Bridges are there?", answer: "Five numbered Thai–Lao Friendship road bridges are officially open as of July 2026. Mukdahan connects to Savannakhet via the second. New bridge, rail and checkpoint projects continue to develop, so confirm the exact crossing and current immigration procedure before travel." },
  ],
  relatedGuides: [
    { title: "Things to do in Mukdahan", description: "Compare the riverfront, Ho Kaeo, Phu Manorom and Phu Pha Thoep by distance and travel time.", href: "/city/mukdahan/attractions/", image: "/images/redesign/mukdahan-phu-manorom.webp", imageAlt: "Phu Manorom as a major outer stop from Mukdahan" },
    { title: "Where to stay in Mukdahan", description: "Choose a riverfront base or a more practical city zone around your arrival and onward route.", href: "/best-hotels/mukdahan/", image: "/images/redesign/mukdahan-hero.webp", imageAlt: "Mukdahan Mekong riverfront as a hotel area" },
    { title: "Continue along the Mekong to Nakhon Phanom", description: "Follow Route 212 to another Thai river city with promenade, heritage and Vietnamese-influenced breakfast.", href: "/city/nakhon-phanom/", image: "/images/redesign/nakhon-phanom-hero.webp", imageAlt: "Nakhon Phanom as the next Thai Mekong city" },
  ],
  sources: [
    { title: "Mukdahan", creator: "Tourism Authority of Thailand", url: "https://www.tourismthailand.org/Destinations/Provinces/Mukdahan/578", note: "Official province context for the Mekong, communities, Mudmee silk, Ho Kaeo, Phu Pha Thoep and the relationship with Savannakhet." },
    { title: "Indochina Market", creator: "Tourism Authority of Thailand", url: "https://www.tourismthailand.org/Attraction/indochina-market", note: "Official market and river-zone reference; stall mix and activity still require a local check." },
    { title: "Spiritual places to visit for blessing", creator: "Tourism Authority of Thailand", url: "https://www.tourismthailand.org/Articles/spiritural-places-to-visit-for-blessing-in-2025", note: "Official context for Phu Manorom, the footprint replica, white Buddha, naga and panorama; opening remains a current-check item." },
    { title: "Department of Airports flight information", creator: "Department of Airports Thailand", url: "https://tfic.airports.go.th/lcd/", note: "Current official airport list; Mukdahan is not shown as an operating Department of Airports passenger airport." },
    { title: "State Railway of Thailand", creator: "State Railway of Thailand", url: "https://www.railway.co.th/", note: "Current railway network and service reference; Mukdahan has no passenger station." },
    { title: "Mukdahan weather", creator: "Thai Meteorological Department", url: "https://tmd.go.th/en/weather/province/mookdahan", note: "Current provincial forecast and warnings for heat, rain and storms." },
    { title: "Laos international checkpoints", creator: "Department of Immigration of Lao PDR", url: "https://www.immigration.gov.la/en/checkpoint", note: "Primary checkpoint and document context; travellers must recheck the exact crossing and procedure." },
    { title: "Border Trade Capacity Development at the Second Thai–Lao Friendship Bridge", creator: "Thailand International Cooperation Agency", url: "https://tica-thaigov.mfa.go.th/en/content/border-trade-capacity-development-at-the-second-th?menu=5f4773b8afb16d3b3410ace7&page=5d7da97015e39c3fbc00b624", note: "June 2026 official evidence for the active Mukdahan–Savannakhet checkpoint and its transport role." },
    { title: "Official Opening of the Fifth Thai-Lao Friendship Bridge", creator: "Thailand Public Relations Department", url: "https://thailand.prd.go.th/en/content/category/detail/id/48/iid/459114", note: "Primary current evidence that the fifth numbered road bridge opened in December 2025." },
    { title: "The Complete Travel Guide to Mukdahan, Isan", creator: "Adventures of Jellie", url: "https://www.adventuresofjellie.com/thailand/mukdahan-guide", note: "English competitor depth and heading reference; time-sensitive prices, transport and opening details were not treated as current facts." },
    { title: "Is Mukdahan Worth Visiting?", creator: "Thailand Starts Here", url: "https://thailandstartshere.com/2025/10/15/is-mukdahan-worth-visiting/", note: "English intent and itinerary competitor reference; the owner adds clearer city-versus-province and border decision support." },
  ],
};
