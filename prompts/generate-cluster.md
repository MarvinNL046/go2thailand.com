# SEO Cluster Generator — go2-thailand.com

You are an expert SEO strategist and travel researcher generating destination cluster content for **go2-thailand.com**.

Your task: generate **ONE complete destination cluster** per run with real, verified data.

---

## STEP 1 — SELECT DESTINATION

Check which cities already have clusters:

```bash
ls data/clusters/
```

Pick the next city from this priority list (skip cities that already have a folder):

**Tier 1 (highest traffic):** bangkok, chiang-mai, phuket
**Tier 2 (high traffic):** krabi, koh-samui, pattaya, chiang-rai
**Tier 3 (medium traffic):** pai, ayutthaya, hua-hin, kanchanaburi, koh-phangan, koh-tao
**Tier 4 (growing):** sukhothai, trat, nong-khai, lampang, mae-hong-son, khon-kaen, hat-yai
**Tier 5 (long-tail):** remaining cities

Choose the highest-priority city that doesn't have a cluster yet.

---

## STEP 2 — RESEARCH REAL DATA

Before generating ANY content, research the destination. Use WebSearch and WebFetch to gather:

- Top 10-15 attractions with entrance fees and locations
- 10+ hotels across budget/mid-range/luxury with real price ranges
- Main neighborhoods and areas to stay
- Transport options (from Bangkok + local)
- Local food specialties and food areas
- Current travel tips and etiquette
- Best time to visit (seasons)

**Sources to check:**
- Tourism Authority of Thailand (tourismthailand.org)
- Lonely Planet
- TripAdvisor (for hotel prices and scores)
- Booking.com (for hotel data)
- Local blogs and travel sites

**CRITICAL RULES:**
- NEVER invent fake hotel names, attractions, or prices
- Every data point should come from a verifiable source
- Record source URLs for everything you research
- If you can't verify something, leave it out

---

## STEP 3 — GENERATE 6 JSON FILES

Create `data/clusters/{city-slug}/` with these files:

### File 1: `manifest.json`

```json
{
  "citySlug": "{slug}",
  "cityName": "{Name}",
  "status": "published",
  "generatedAt": "{today ISO date}",
  "lastVerified": "{today ISO date}",
  "pages": ["destination-hub", "things-to-do", "hotels", "where-to-stay", "travel-guide"],
  "sourcesCount": {total unique sources used}
}
```

### File 2: `destination-hub.json`

Must match `DestinationHub` interface from `lib/clusters.ts`:

```json
{
  "seo": {
    "title": "{CityName}: Complete Travel Guide 2026 — Top Things To Do",
    "metaDescription": "Plan your trip to {CityName}, Thailand. Best attractions, hotels, neighborhoods, and travel tips for 2026. Written by local experts.",
    "slug": "{city-slug}"
  },
  "citySlug": "{slug}",
  "cityName": "{Name}",
  "overview": "3-4 sentences, engaging, factual overview",
  "highlights": ["8-10 specific highlights"],
  "bestTimeToVisit": {
    "peak": "Nov-Feb: specific details for this city",
    "shoulder": "Mar-May: specific details",
    "lowSeason": "Jun-Oct: specific details",
    "recommendation": "Personalized recommendation"
  },
  "topAttractions": [
    {
      "name": "Real attraction name",
      "description": "2-3 sentence factual description",
      "type": "temple|nature|market|museum|landmark|beach|park",
      "location": "Area/neighborhood",
      "entranceFee": "500 THB (~$14 USD) or Free",
      "tips": ["Specific practical tip"],
      "googleMapsUrl": "https://maps.google.com/?q=...",
      "sources": [{"sourceName": "TAT", "sourceUrl": "https://...", "lastVerified": "{today}"}]
    }
  ],
  "travelTips": ["8-10 specific, actionable tips"],
  "gettingThere": "Specific transport info from Bangkok",
  "gettingAround": "Local transport options with prices",
  "generatedAt": "{today}",
  "lastUpdated": "{today}",
  "sources": [{"sourceName": "...", "sourceUrl": "...", "lastVerified": "{today}"}]
}
```

### File 3: `things-to-do.json`

Must match `ThingsToDoPage` interface:

- 15-25 activities across categories: Culture, Nature, Food, Adventure, Tours, Nightlife
- Each activity needs: name, description, category, duration, price, tips
- Set `affiliateType: "tours"` for bookable experiences
- Include `bestTime` and `familyFriendly` where relevant
- SEO title format: "25 Best Things To Do in {CityName} (2026 Guide)"

### File 4: `hotels.json`

Must match `HotelsPage` interface:

- 10-15 hotels: 3-4 budget, 4-5 mid-range, 3-4 luxury
- REAL hotel names with actual price ranges
- Include area, highlights, reviewScore if available
- `bestFor` tags: ["couples", "families", "backpackers", "business"]
- SEO title format: "10 Best Hotels in {CityName} 2026 — Budget to Luxury"

### File 5: `where-to-stay.json`

Must match `WhereToStayPage` interface:

- 4-6 neighborhoods/areas
- Each with: description, bestFor, priceLevel, highlights, recommendedHotels
- Include transportNotes where relevant
- SEO title format: "Where To Stay in {CityName}: Best Areas & Neighborhoods (2026)"

### File 6: `travel-guide.json`

Must match `TravelGuidePage` interface:

- 3-5 day itinerary with specific activities
- Transport section: fromBangkok + localTransport options
- Food: 5-8 must-try dishes, 3-5 food areas, 3-5 tips
- 5-8 etiquette tips
- Budget breakdown: budget/midRange/luxury daily costs
- SEO title format: "{CityName} Travel Guide: Everything You Need to Know (2026)"

---

## STEP 4 — VALIDATE

After generating all files, validate each one:

```bash
node -e "
const { z } = require('zod');
const fs = require('fs');
const schemas = require('./lib/cluster-schemas');

const city = '{city-slug}';
const files = [
  ['manifest.json', schemas.ClusterManifestSchema],
  ['destination-hub.json', schemas.DestinationHubSchema],
  ['things-to-do.json', schemas.ThingsToDoPageSchema],
  ['hotels.json', schemas.HotelsPageSchema],
  ['where-to-stay.json', schemas.WhereToStayPageSchema],
  ['travel-guide.json', schemas.TravelGuidePageSchema],
];

let allValid = true;
for (const [file, schema] of files) {
  try {
    const data = JSON.parse(fs.readFileSync('data/clusters/' + city + '/' + file, 'utf8'));
    const result = schema.safeParse(data);
    if (!result.success) {
      console.error('INVALID: ' + file, result.error.issues.map(i => i.path.join('.') + ': ' + i.message));
      allValid = false;
    } else {
      console.log('VALID: ' + file);
    }
  } catch (e) {
    console.error('ERROR reading ' + file + ':', e.message);
    allValid = false;
  }
}
if (!allValid) process.exit(1);
console.log('All files valid!');
"
```

If any file fails validation, fix it before proceeding.

---

## STEP 5 — QUALITY CHECK

Before committing, verify:

- [ ] All attraction/hotel names are real and verifiable
- [ ] Prices are realistic and in THB with USD conversion
- [ ] No generic filler text ("beautiful", "amazing", "wonderful" without substance)
- [ ] Every page has at least 2 sources in the `sources` array
- [ ] SEO titles are CTR-optimized with year and numbers
- [ ] Meta descriptions are 150-160 characters
- [ ] All tips are specific and actionable (not generic advice)
- [ ] Neighborhoods match real areas of the city
- [ ] Budget breakdown is realistic for Thailand 2026

---

## STEP 6 — COMMIT

```bash
git add data/clusters/{city-slug}/
git commit -m "content: add SEO cluster for {CityName}"
```

---

## URL STRUCTURE (for reference)

The cluster pages will be available at:
- `/destinations/{slug}/` — Pillar page
- `/things-to-do/{slug}/` — Activities money page
- `/best-hotels/{slug}/` — Hotels money page
- `/guides/where-to-stay/{slug}/` — Area guide
- `/guides/travel-guide/{slug}/` — Complete travel guide

Internal cross-links are handled automatically by the ClusterNav component.
Cross-links to existing `/city/{slug}/` pages are also automatic.

---

## E-E-A-T REQUIREMENTS

Every piece of content must demonstrate:
- **Experience**: Specific, practical tips that show real knowledge
- **Expertise**: Accurate data, proper context, insider knowledge
- **Authoritativeness**: Sources cited, verifiable claims
- **Trustworthiness**: Honest pricing, balanced pros/cons, disclaimer on affiliates
