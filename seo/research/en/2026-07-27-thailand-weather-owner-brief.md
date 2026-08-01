# Thailand weather owner — English DFS brief

**Owner:** `https://go2-thailand.com/weather/`  
**Market:** United Kingdom / English  
**Research date:** 27 July 2026

## Evidence captured

- Six DataForSEO keyword clusters: 1,053 raw records and 929 unique keyword strings before relevance filtering.
- Ten live UK-English SERPs: 85 organic results and 57 PAA records, producing 39 unique questions before intent filtering.
- Exact URL ranking and backlink checks for `/weather/` and `/blog/best-time-to-visit-thailand/`: neither URL returned ranking keywords or reportable backlink equity.
- Full DFS parses: G Adventures (about 1,798 captured words) and Selective Asia (about 1,105 captured words). TUI blocked the content parser and contributes SERP-format evidence only.
- Primary evidence: Thai Meteorological Department climate charts, monthly summaries and 1991–2020 normals; Tourism Authority of Thailand climate overview. Live forecasts remain a separate, date-sensitive task.

## Measured opportunity

The strongest clean UK terms in the selected dataset are:

| Query | UK volume | KD | Intended owner |
|---|---:|---:|---|
| `best time to visit thailand` | 14,800 | 0 | `/blog/best-time-to-visit-thailand/` |
| `thailand weather` | 12,100 | 22 | `/weather/` |
| `weather in thailand` | 6,600 | 15 | `/weather/` |
| `thailand rainy season` | 4,400 | 15 | `/weather/` |
| `rainy season in thailand` | 4,400 | 12 | `/weather/` |
| `thailand monsoon season` | 4,400 | 2 | `/weather/` |
| `monsoon season in thailand` | 4,400 | 4 | `/weather/` |
| `thailand weather by month` | 1,600 | 1 | `/weather/` |
| `thailand climate by month` | 1,600 | 1 | `/weather/` |

Month-modified weather terms return 4,400–6,600 monthly volume for several months. They belong to the existing `/thailand-in/[month]/` detail family; the hub should provide a complete month directory and comparison, not create twelve competing answers inside the main narrative.

## Cannibalisation contract

- `/weather/` owns climate orientation: regional differences, month comparison, rainy/monsoon season, coast selection and the hand-off from climate normal to live forecast.
- `/blog/best-time-to-visit-thailand/` owns trip-timing choice: best/worst trade-offs by traveller goal, crowds, events, price pressure and route style.
- `/thailand-in/[month]/` owns a specific calendar month.
- `/city/[city]/weather/` owns destination-level weather and operational planning.

The hub may answer “best month” briefly because it appears across weather PAA, but it must frame the answer as route-dependent and link to the dedicated timing owner.

## Dominant SERP format

The head query mixes live forecast products (Met Office, BBC, AccuWeather) with climate planners (Tourism Thailand, Selective Asia). The hub cannot credibly replace a live forecast. Its information gain is an explicit two-mode interface:

1. **Planning months ahead:** compare TMD climate normals by region and month.
2. **Travelling soon:** leave the site for the local TMD forecast and warnings.

Competitor climate pages consistently use a month-by-month sequence and a broad three-season explanation. Their main weakness is treating Thailand as one weather zone or burying the Andaman/Gulf split.

## Page structure

1. Direct-answer editorial hero with a visible climate-versus-forecast distinction.
2. Three quick planning windows, qualified by region.
3. Interactive twelve-month, five-region TMD-normal comparison.
4. Strong visual Andaman-versus-Gulf coast switch.
5. Three-season explanation with northern air-quality guardrail.
6. Complete month-owner directory and local weather-guide links.
7. “Plan for recovery” packing and itinerary resilience section.
8. Contextual current-option CTAs only after the reader chooses region/month.
9. Exact useful PAA accordion and sources/method.

## PAA selection

Use verbatim useful questions such as:

- What is the best month to go to Thailand?
- What are the rainy months in Thailand?
- What is the wettest month in Thailand?
- Is Thailand too rainy in July?
- Is it rainy season in Phuket?
- Should I go to Koh Samui in December?
- What is the hottest month in Thailand?
- What's the coldest month in Thailand?
- Which months to avoid in Thailand?
- Is the weather bad in Thailand right now?

Exclude irrelevant leakage about trip length, living costs, underwear and hotel pricing.

## Accuracy and commercial rules

- Never promise a dry day, calm sea, open park, ferry operation or safe boat crossing from a climate normal.
- Avoid one nationwide “wettest month” answer without regional qualification.
- Explain that a rain day is not the same as an all-day washout.
- Link to TMD for current forecasts and warnings.
- Trip.com and Klook may appear only as disclosed current-option checks after the weather decision.
- Up to three Amazon OneLink products are acceptable here because a light rain layer, dry bag and quick-dry layer solve a visible packing task. Use “check current options”, never static prices or performance claims.

## Definition of done

- Premium shared weather design, not the legacy card page.
- One H1, one document `<main>`, self-canonical, valid EN/NL/x-default hreflang and visible matching schemas.
- All twelve month routes and the major local weather owners receive natural links.
- Desktop and 390 px mobile QA: no overflow, readable tables/cards, working month state, loaded images and accessible controls.
- TypeScript, ESLint and focused site audit pass.
