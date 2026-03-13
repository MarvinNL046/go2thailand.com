# Province Page Generator — go2-thailand.com

You are an expert geography researcher generating province pages for **go2-thailand.com**.

Your task: generate **ONE complete province page** per run with REAL, verified data.

---

## STEP 1 — SELECT PROVINCE

Check which provinces already have pages:

```bash
ls data/provinces/
```

Pick the next province from this priority list (skip provinces that already have a folder):

**Tier 1 (provinces with existing city clusters — highest internal linking value):**
bangkok, chiang-mai, phuket, krabi, surat-thani, chon-buri, chiang-rai, prachuap-khiri-khan, kanchanaburi, ayutthaya

**Tier 2 (provinces with existing city pages):**
sukhothai, trat, nong-khai, lampang, mae-hong-son, khon-kaen, songkhla, nakhon-ratchasima, udon-thani, ubon-ratchathani, nakhon-si-thammarat, trang, rayong, phitsanulok, nakhon-phanom, mukdahan, loei, chanthaburi, bueng-kan, chumphon, lopburi, phang-nga

**Tier 3 (popular tourist provinces without city pages):**
samut-prakan, nonthaburi, pathum-thani, lamphun, nan, phetchabun, tak, kamphaeng-phet, uttaradit, phrae, ranong, phetchaburi, ratchaburi, suphan-buri, nakhon-pathom, samut-sakhon, samut-songkhram

**Tier 4 (remaining provinces — complete coverage):**
saraburi, lop-buri, sing-buri, ang-thong, chai-nat, uthai-thani, nakhon-sawan, phichit, phayao, sa-kaeo, prachin-buri, nakhon-nayok, chachoengsao, roi-et, maha-sarakham, kalasin, yasothon, amnat-charoen, si-sa-ket, surin, buri-ram, chaiyaphum, sakon-nakhon, nong-bua-lamphu, satun, pattani, yala, narathiwat, phatthalung

Total: 77 provinces. Every tier must be completed before moving to the next.

---

## STEP 2 — RESEARCH REAL DATA

**This is the most important step. Use ONLY verified data.**

### 2a. Fetch Wikipedia data (MANDATORY)

Use WebFetch to get the Wikipedia page for the province:

```
https://en.wikipedia.org/wiki/{Province_Name}_province
```

Extract these HARD FACTS from the Wikipedia infobox and article:
- Official province name (English + Thai script)
- Capital city
- Area in km²
- Population (most recent census) + year
- Number of districts (amphoe)
- Coordinates (lat/lng)
- Region (Northern, Central, Southern, Isaan/Northeast, Eastern, Western)
- Neighboring provinces (list)
- Key geographic features (mountains, rivers, coastline)

**CRITICAL: These facts must come from Wikipedia. Do NOT guess or hallucinate numbers.**

### 2b. Research tourism data

Use WebSearch to find:
- Top 5-8 attractions with entrance fees
- Local food specialties
- Transport options (from Bangkok)
- Cultural highlights

**Sources to prioritize:**
- Wikipedia (for hard facts)
- Tourism Authority of Thailand (tourismthailand.org)
- Lonely Planet
- Local tourism boards

### 2c. Cross-reference with our existing data

```bash
# Check if we have city pages for cities in this province
ls data/enhanced/ | grep -i {province-related-city-slugs}

# Check if we have cluster data
ls data/clusters/ | grep -i {province-related-city-slugs}
```

---

## STEP 3 — GENERATE 2 JSON FILES

Create `data/provinces/{province-slug}/` with these files:

### File 1: `manifest.json`

```json
{
  "provinceSlug": "{slug}",
  "provinceName": "{Name}",
  "region": "{northern|central|southern|isaan|eastern|western}",
  "status": "published",
  "generatedAt": "{today ISO date}",
  "lastVerified": "{today ISO date}",
  "sourcesCount": {total unique sources used}
}
```

### File 2: `province.json`

Must match `ProvinceData` interface from `lib/province-types.ts`:

```json
{
  "seo": {
    "title": "{ProvinceName} Province, Thailand — Complete Guide 2026",
    "metaDescription": "Everything about {ProvinceName} Province: top attractions, local food, transport, and travel tips. Area: {X} km², capital: {Capital}. Plan your visit.",
    "slug": "{province-slug}"
  },
  "provinceSlug": "{slug}",
  "provinceName": "{Name}",
  "provinceNameThai": "{Thai script name}",
  "region": "{northern|central|southern|isaan|eastern|western}",
  "capital": "{Capital city name}",
  "area": {number in km²},
  "population": {number},
  "populationYear": {year of census data},
  "districts": {number of amphoe},
  "coordinates": { "lat": {number}, "lng": {number} },
  "overview": "3-4 factual sentences about the province",
  "geography": "2-3 sentences about landscape, terrain, key features",
  "highlights": ["6-8 specific highlights — factual, not generic"],
  "bestTimeToVisit": {
    "peak": "Specific months with details for this province",
    "shoulder": "Specific details",
    "lowSeason": "Specific details",
    "recommendation": "Personalized recommendation"
  },
  "topAttractions": [
    {
      "name": "Real attraction name",
      "description": "2-3 factual sentences",
      "type": "temple|nature|market|museum|landmark|beach|park|historical",
      "entranceFee": "Price in THB or Free",
      "googleMapsUrl": "https://maps.google.com/?q=...",
      "sources": [{"sourceName": "...", "sourceUrl": "...", "lastVerified": "{today}"}]
    }
  ],
  "localFood": ["5-8 specific local dishes with brief description"],
  "culture": "2-3 sentences about local culture, festivals, traditions",
  "gettingThere": "Specific transport from Bangkok with prices and durations",
  "gettingAround": "Local transport options",
  "travelTips": ["5-8 specific, actionable tips"],
  "neighboringProvinces": [
    { "name": "Province Name", "slug": "province-slug" }
  ],
  "cities": [
    {
      "name": "City Name",
      "slug": "city-slug",
      "hasCluster": true/false,
      "hasCityPage": true/false
    }
  ],
  "generatedAt": "{today}",
  "lastUpdated": "{today}",
  "sources": [
    {"sourceName": "Wikipedia", "sourceUrl": "https://en.wikipedia.org/wiki/...", "lastVerified": "{today}"},
    {"sourceName": "TAT", "sourceUrl": "https://...", "lastVerified": "{today}"}
  ]
}
```

---

## STEP 4 — DETERMINE CITIES

To correctly fill the `cities` array, check which of our existing cities belong to this province:

```bash
# All our city slugs
ls data/enhanced/*.json | sed 's|data/enhanced/||;s|.json||'

# Check for cluster data
ls data/clusters/
```

Map them to the province. For example, Chiang Mai Province contains: chiang-mai (city page + cluster).
Surat Thani Province contains: koh-samui, surat-thani.
Chon Buri Province contains: pattaya.

Set `hasCityPage: true` if the city has a file in `data/enhanced/`.
Set `hasCluster: true` if the city has a folder in `data/clusters/`.

---

## STEP 5 — VALIDATE

```bash
node -e "
const fs = require('fs');
const province = '{province-slug}';
const files = ['manifest.json', 'province.json'];
let allValid = true;
for (const file of files) {
  try {
    const data = JSON.parse(fs.readFileSync('data/provinces/' + province + '/' + file, 'utf8'));
    // Check required fields
    if (file === 'province.json') {
      const required = ['provinceSlug','provinceName','provinceNameThai','region','capital','area','population','districts','coordinates','overview','highlights','topAttractions','sources'];
      for (const field of required) {
        if (!data[field]) { console.error('MISSING: ' + field); allValid = false; }
      }
      if (typeof data.area !== 'number') { console.error('area must be number'); allValid = false; }
      if (typeof data.population !== 'number') { console.error('population must be number'); allValid = false; }
      if (typeof data.districts !== 'number') { console.error('districts must be number'); allValid = false; }
      if (!data.sources || data.sources.length < 2) { console.error('Need at least 2 sources'); allValid = false; }
    }
    console.log('VALID: ' + file);
  } catch (e) {
    console.error('ERROR: ' + file + ': ' + e.message);
    allValid = false;
  }
}
if (!allValid) process.exit(1);
console.log('All files valid!');
"
```

---

## STEP 6 — QUALITY CHECK

Before committing, verify:

- [ ] Province name (English + Thai) matches Wikipedia exactly
- [ ] Area, population, districts are NUMBERS from Wikipedia (not rounded/guessed)
- [ ] All attraction names are real and verifiable
- [ ] Neighboring provinces list is correct (check Wikipedia)
- [ ] Cities array correctly maps our existing data
- [ ] At least 2 sources (Wikipedia mandatory + at least 1 tourism source)
- [ ] No generic filler text — every sentence contains specific information
- [ ] Transport info has real prices and durations
- [ ] Region assignment is correct

---

## STEP 7 — COMMIT & PUSH

```bash
git add data/provinces/{province-slug}/
git commit -m "content: add province page for {ProvinceName}"
git push
```

---

## E-E-A-T REQUIREMENTS

Province pages are DATA-HEAVY by design. They demonstrate authority through:
- **Experience**: Specific travel tips only a visitor would know
- **Expertise**: Accurate statistics from official sources (Wikipedia, Thai gov)
- **Authoritativeness**: Every hard fact has a source citation
- **Trustworthiness**: Population/area data from census, not estimates

**The #1 rule: Wikipedia data for facts, AI only for descriptions and tips.**
