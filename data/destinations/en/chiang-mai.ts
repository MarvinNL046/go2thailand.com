import type { DestinationGuideData } from "../types";

export const chiangMaiDestinationGuideEn: DestinationGuideData = {
  citySlug: "chiang-mai", cityName: "Chiang Mai", locale: "en",
  pageTitle: "Chiang Mai Thailand: areas & first-trip guide 2026",
  pageDescription: "Plan Chiang Mai by area and rhythm. Compare Old City, Nimman, Riverside and Santitham with a realistic 4-day city-and-mountain route.",
  pageUrl: "https://go2-thailand.com/city/chiang-mai/", dateModified: "2026-07-27",
  coordinates: { latitude: 18.7883, longitude: 98.9853 },
  touristType: ["Culture travellers", "Food travellers", "Slow travel", "Mountain day trips"],
  stayGuideHref: "/where-to-stay/chiang-mai/", foodGuideHref: "/city/chiang-mai/food/",
  hero: {
    image: "/images/cities/chiang-mai/redesign/chiang-mai-destination-hero.webp",
    imageAlt: "Chiang Mai temple roofs, old walls and Doi Suthep mountain in morning light",
    eyebrow: "A northern city with a mountain horizon", title: "Chiang Mai", accent: "Thailand",
    subtitle: "Lanna heritage, khao soi and a city that rewards one deeper day.",
    description: "Chiang Mai becomes easy when the moat, west-side neighbourhoods, river and mountain are treated as separate layers. Pick a base, keep temple walks compact and reserve one full day for the experience that brought you north.",
    imageClassName: "object-cover object-[62%_center] lg:object-center",
    stats: [
      { label: "Strong first base", value: "Old City", icon: "hotel" },
      { label: "Useful first stay", value: "3–4 full days", icon: "calendar" },
      { label: "Daily decision", value: "Check the air", icon: "sun" },
    ],
  },
  quickAnswer: {
    eyebrow: "Choose city rhythm before attractions", title: "Chiang Mai is compact in the centre, broad in experience",
    paragraphs: [
      "Chiang Mai is worth visiting for the combination of active temples, Northern food, craft culture and mountain access. It is calmer than Bangkok but not a tiny town: the Old City, Nimman, Santitham, river and outer valleys solve different trips.",
      "Three days are enough for the old centre, a mountain or west-side route and one deeper experience. Four days are better when a cooking class, craft workshop, ethical wildlife experience or national-park day is central to the trip.",
      "Current air quality belongs in the plan, especially during the season when haze can affect Northern Thailand. Check live conditions and forecasts instead of assuming one calendar date guarantees clear mountain views.",
    ],
    verdicts: [
      { label: "Is Chiang Mai worth it?", value: "Yes, from 3 days", description: "Best when city culture and one deeper northern experience share the trip.", icon: "sparkles" },
      { label: "Is 3 days enough?", value: "Yes, selectively", description: "Old City, one mountain block and one experience fit without racing.", icon: "calendar" },
      { label: "Old City or Nimman?", value: "Tradition or modern", description: "Choose Old City for heritage; Nimman for cafés, design and west-side access.", icon: "hotel" },
      { label: "Main live check", value: "Air quality", description: "Use current readings before committing to exposed mountain days.", icon: "sun" },
    ],
  },
  zones: [
    { slug: "old-city", name: "Old City", kicker: "Heritage inside the moat", image: "/images/cities/chiangmai/attractions/Chiang Mai Old City.webp", imageAlt: "Temple and old-city street within Chiang Mai moat", summary: "The walkable centre groups Wat Phra Singh, Wat Chedi Luang, cafés and gates into a strong first layer. Staying here reduces friction for early temple walks and evening wandering.", bestFor: "First visits, temples, atmosphere and travellers who want to walk between stops.", tradeoff: "Traffic still crosses the grid, and rooms near nightlife or Sunday market streets can be noisy." },
    { slug: "nimman", name: "Nimman & Huay Kaew", kicker: "Contemporary west side", image: "/images/cities/chiang-mai/redesign/chiang-mai-stay-nimman.webp", imageAlt: "Contemporary Chiang Mai neighbourhood near Nimman", summary: "Nimman places cafés, restaurants, galleries and malls near the road toward Doi Suthep. It suits a modern city break but does not replace the old centre's temple context.", bestFor: "Cafés, design, nightlife and repeat visitors who know their priorities.", tradeoff: "Aircraft and road noise vary by block; check the exact building and walking route." },
    { slug: "santitham", name: "Santitham", kicker: "Local everyday base", image: "/images/cities/chiang-mai/redesign/chiang-mai-stay-santitham.webp", imageAlt: "Low-rise streets and local food in Santitham Chiang Mai", summary: "Between the old centre and Nimman, Santitham offers local food and longer-stay texture without being a curated attraction district.", bestFor: "Food-led stays, slower travel and travellers comfortable arranging short local rides.", tradeoff: "Fewer headline sights are immediately outside the door; pavement and crossings vary." },
    { slug: "riverside", name: "Riverside & Wat Ket", kicker: "Quiet heritage and evening dining", image: "/images/cities/chiang-mai/redesign/chiang-mai-stay-riverside.webp", imageAlt: "Ping River and leafy riverside stay in Chiang Mai", summary: "The Ping River, Wat Ket and old trading streets create a softer base east of the centre, with markets and evening dining nearby.", bestFor: "Couples, boutique stays, repeat visits and a quieter evening rhythm.", tradeoff: "You will use local transport more often for the western city and mountain corridor." },
  ],
  highlights: [
    { eyebrow: "Living heritage", title: "Walk a small temple story, not every wat", image: "/images/cities/chiangmai/attractions/Wat Chedi Luang.webp", imageAlt: "Wat Chedi Luang in Chiang Mai Old City", description: "Wat Chedi Luang and Wat Phra Singh anchor a compact Old City walk. Active worship, monastery life and dress etiquette matter more than collecting entrances.", decision: "Start early, choose two major temples and leave space for a market or quiet lane.", href: "/city/chiang-mai/attractions/" },
    { eyebrow: "City to mountain", title: "Pair Doi Suthep with one west-side stop", image: "/images/cities/chiangmai/attractions/Doi Suthep Temple chiang mai.webp", imageAlt: "Wat Phra That Doi Suthep above Chiang Mai", description: "The mountain is a distinct half-day layer. Combine it with Wat Pha Lat or one west-side stop rather than returning across the city repeatedly.", decision: "Check current visibility, road conditions and temple information before committing.", href: "/city/chiang-mai/attractions/doi-suthep/" },
    { eyebrow: "One deeper day", title: "Choose craft, cooking, nature or welfare-led wildlife", image: "/images/cities/chiang-mai/redesign/chiang-mai-attraction-creative-courtyard.webp", imageAlt: "Hands learning a Chiang Mai craft in a leafy courtyard", description: "A full-day experience gives Chiang Mai depth. Compare group size, transfers, welfare standards, physical demands and cancellation terms rather than a highlights count.", decision: "Pick one experience that matches your values and energy; do not stack two distant day trips.", href: "/blog/12-best-day-trips-from-chiang-mai-temples-waterfalls-mountains/" },
  ],
  featureBanner: { image: "/images/cities/chiang-mai/redesign/chiang-mai-zones-banner.webp", imageAlt: "Chiang Mai old city route rising toward the forested mountain", eyebrow: "Keep the geography visible", title: "The moat, west side and mountain form one route—not three taxi detours.", description: "Build the city days east to west, then give the mountain or outer valley its own block. The result is calmer and leaves room for food, craft and weather changes." },
  food: {
    image: "/images/cities/chiang-mai/redesign/chiang-mai-food-khao-soi.webp", imageAlt: "Khao soi and Northern Thai dishes in Chiang Mai", eyebrow: "Northern table", title: "Khao soi is the doorway, not the whole kitchen",
    description: "Use markets and specialist shops to compare Northern flavours without turning every meal into a ranking. Ask about stock, pork, fish sauce, peanuts and shared oil when dietary needs matter.",
    dishes: [
      { name: "Khao soi", description: "Curry noodle soup with soft and crisp noodles. Chicken and beef versions are common; broth and condiments vary by shop." },
      { name: "Sai ua", description: "Herb-rich Northern sausage, often served in slices with vegetables and sticky rice. Confirm spice and pork if relevant." },
      { name: "Nam prik ong", description: "A tomato-and-minced-pork chilli dip served with vegetables; a useful shared contrast to richer noodle dishes." },
    ],
  },
  itinerary: {
    eyebrow: "Four days, one northern arc", title: "Chiang Mai without temple or transfer fatigue", description: "Keep the first two days compact, then choose one deeper experience. Move mountain plans when current air or weather makes another day stronger.",
    days: [
      { day: "Day 1", title: "Old City orientation", description: "Walk two major temples, a gate and shaded lanes; finish at a market that operates on the current day rather than forcing a stored calendar.", href: "/city/chiang-mai/attractions/" },
      { day: "Day 2", title: "Mountain & west side", description: "Visit Doi Suthep and optionally Wat Pha Lat, then return through Nimman or Huay Kaew instead of crossing the city twice.", href: "/city/chiang-mai/attractions/doi-suthep/" },
      { day: "Day 3", title: "One deeper experience", description: "Choose a cooking class, craft workshop, ethical sanctuary or nature day and verify transfers, group size and conditions live.", href: "/blog/thai-cooking-classes-chiang-mai/" },
      { day: "Day 4", title: "River, market & unplanned space", description: "Use Wat Ket, Warorot and the river for a slower city layer, or keep the day as weather buffer before onward travel.", href: "/city/chiang-mai/food/" },
    ],
  },
  planning: {
    weather: { title: "Season matters, live air matters more", summary: "The generally cooler months are popular for outdoor days. The hot season and periods of regional haze can change visibility and comfort; wetter months bring greener landscapes and showers.", best: "Common first-trip window: roughly November–February", tradeoff: "No month guarantees clear air. Check live AQI, the forecast and official warnings, and be willing to move a mountain day.", href: "/city/chiang-mai/best-time-to-visit/", image: "/images/cities/chiang-mai/redesign/chiang-mai-weather-hero.webp", imageAlt: "Chiang Mai temple and mountain under changing seasonal sky" },
    transport: { title: "Walk clusters; arrange the gaps", summary: "Old City suits walking, while red trucks, taxis, app-based rides and private drivers connect west-side and outer routes. A scooter is not a universal requirement.", facts: ["Confirm a shared-ride route and price before departure.", "Use a qualified driver for mountain or multi-stop days when you do not ride confidently.", "Never treat a short rental lesson as road experience; helmets and licensing still matter.", "Verify live bus, rail and flight details for onward connections."], image: "/images/cities/chiang-mai/redesign/chiang-mai-route-planning.webp", imageAlt: "Traveller planning a Chiang Mai city and mountain route" },
  },
  practicalTips: [
    { icon: "sun", title: "Check AQI before the mountain", description: "Use a live source on the day and swap indoor or city plans when conditions are poor." },
    { icon: "compass", title: "Temples are active places", description: "Cover shoulders and knees, lower your voice and follow local signs around worship and photography." },
    { icon: "map", title: "Market calendars change", description: "Confirm current trading days before making a weekend street the centre of your itinerary." },
    { icon: "sparkles", title: "Audit animal experiences", description: "Avoid riding, performances and forced contact; examine welfare policy and independent evidence before booking." },
  ],
  faqs: [
    { question: "What is Chiang Mai best known for?", answer: "Chiang Mai is known for Lanna culture, active temples, Northern Thai food, craft traditions and access to mountain landscapes. Its value comes from combining the compact old centre with one deeper experience rather than treating it as a temple checklist." },
    { question: "Is Chiang Mai really worth visiting?", answer: "Yes for travellers interested in culture, food, craft, slower city days and northern nature. Three or four days create a good first balance; check current air quality if mountain views and long outdoor days are central." },
    { question: "How many days do you need in Chiang Mai?", answer: "Three full days cover Old City, a mountain block and one deeper experience. Four or five days suit cooking, craft, nature or a slower base without stacking distant day trips." },
    { question: "Is 3 days in Chiang Mai enough?", answer: "Yes, with one clear priority beyond the city. Spend one day in Old City, one on the mountain/west side and one on cooking, craft, nature or a carefully assessed wildlife experience." },
    { question: "Where is the best neighbourhood to stay in Chiang Mai?", answer: "Old City is the simplest first cultural base; Nimman suits modern cafés and west-side access; Santitham suits local food and longer stays; riverside suits a quieter boutique rhythm. Choose the area that removes your most frequent journey." },
    { question: "What is the difference between Nimman and Old Town Chiang Mai?", answer: "Old City centres temples, walls and walkable heritage. Nimman is a contemporary dining, café and design district near the mountain road. Neither is universally better, and the exact block affects noise and walking comfort." },
    { question: "Which month is best to go to Chiang Mai?", answer: "Many visitors prefer the generally cooler stretch from November to February. Current air quality, rain, heat and crowd levels can still change the experience, so use live conditions rather than a guaranteed best-month claim." },
    { question: "When should I not go to Chiang Mai?", answer: "There is no single forbidden month, but travellers sensitive to smoke should examine current and historical air-quality patterns carefully before late-dry-season travel. If live AQI is poor, reduce exposure and follow health guidance." },
    { question: "Is Chiang Mai a walkable city?", answer: "The Old City and individual neighbourhoods are walkable; the full city and mountain sights are not one continuous walking zone. Combine compact walks with local transport." },
    { question: "Is Grab available in Chiang Mai?", answer: "App-based rides operate in Chiang Mai, but availability, pickup points and prices change. Keep a local transport or pre-arranged driver alternative for early, late or outer-route journeys." },
  ],
  relatedGuides: [
    { title: "Things to do in Chiang Mai", description: "Build compact temple, mountain and deeper-experience days.", href: "/city/chiang-mai/attractions/", image: "/images/cities/chiang-mai/redesign/chiang-mai-attractions-hero.webp", imageAlt: "Chiang Mai temple route" },
    { title: "Where to stay in Chiang Mai", description: "Compare Old City, Nimman, Santitham and riverside by trip task.", href: "/where-to-stay/chiang-mai/", image: "/images/cities/chiang-mai/redesign/chiang-mai-stay-nimman.webp", imageAlt: "Chiang Mai neighbourhood stay" },
    { title: "Eat in Chiang Mai", description: "Start with khao soi, then explore Northern dishes and markets.", href: "/city/chiang-mai/food/", image: "/images/cities/chiang-mai/redesign/chiang-mai-food-khao-soi.webp", imageAlt: "Khao soi in Chiang Mai" },
    { title: "Chiang Mai or Chiang Rai?", description: "Compare city scale, art, food, pace and a realistic northern night split.", href: "/blog/chiang-rai-vs-chiang-mai-for-tourists/", image: "/images/redesign/chiang-mai-chiang-rai-comparison-hero.webp", imageAlt: "Chiang Mai and Chiang Rai side-by-side comparison" },
  ],
  sources: [
    { title: "Chiang Mai", creator: "Tourism Authority of Thailand", url: "https://www.tourismthailand.org/Destinations/Provinces/chiang-mai/101", note: "Official destination context for culture, heritage and province geography." },
    { title: "Air4Thai", creator: "Pollution Control Department Thailand", url: "http://air4thai.pcd.go.th/", note: "Primary source for current air-quality readings; conditions change by hour and station." },
    { title: "Thailand weather", creator: "Thai Meteorological Department", url: "https://www.tmd.go.th/en", note: "Primary source for current weather and warnings." },
    { title: "State Railway of Thailand", creator: "State Railway of Thailand", url: "https://www.railway.co.th/", note: "Primary source for current rail information; no timetable is frozen here." },
  ],
};
