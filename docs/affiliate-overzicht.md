# Affiliate Links & Widgets Overzicht

Laatst bijgewerkt: 2026-02-21

---

## White Label Web (Flights & Hotels Search Engine)

- **White Label ID:** 12956
- **Subdomain:** `search.go2-thailand.com`
- **CNAME Target:** `whitelabel.travelpayouts.com`
- **Widget script:** `https://tpembd.com/wl_web/main.js?wl_id=12956`
- **resultsURL:** `https://search.go2-thailand.com`
- **Component:** `components/WhiteLabelSearch.tsx`
- **Gebruikt op:** Homepage (index.tsx)

### DNS Setup (Vercel)
CNAME record nodig: `search.go2-thailand.com` → `whitelabel.travelpayouts.com`

### Bekend probleem: Tailwind v4 + TPWL widget
Het Travelpayouts search widget injecteert CSS zonder `@layer`. In Tailwind v4 hebben
alle utility classes een lagere cascade-prioriteit dan unlayered CSS, waardoor het widget
de Tailwind styling kan breken. **Dit project draait op Tailwind v3 — geen probleem.**
Bij een upgrade naar v4: wrap Tailwind imports in `@layer` of isoleer het widget in een iframe.

---

## Affiliate Partners & Links

### Travelpayouts Network (marker: 602467, trs: 421888)

#### Booking.com
- **Generic:** `https://booking.tpo.lv/2PT1kR82`
- **Deals:** `https://booking.tpo.lv/pDNjHJA1`
- **Flights:** `https://booking.tpo.lv/LUkugxWF`
- **Car Rental:** `https://booking.tpo.lv/Nmm5XgwI`

#### Trip.com
- **Generic:** `https://trip.tpo.lv/TmObooZ5`
- **Hotel & Flight Bundles:** `https://trip.tpo.lv/L83mcBdE`
- **Hotel & Flight Bundles (alt):** `https://trip.tpo.lv/iP1HSint`
- **Airport Transfers:** `https://trip.tpo.lv/hY8hOUey`
- **Treinen (Thailand):** `https://trip.tpo.lv/gNIdNBmi`
- **Car Rental:** `https://trip.tpo.lv/zGKhdcce`
- **Car Rental (alt):** `https://trip.tpo.lv/fzIWyBhW`

#### Klook
- **Generic:** `https://klook.tpo.lv/7Dt6WApj`

#### GetYourGuide
- **Generic:** `https://getyourguide.tpo.lv/GuAFfGGK`
- **Alt:** `https://getyourguide.tpo.lv/6HngJ5FC`

#### 12Go Asia
- **Generic:** `https://12go.tpo.lv/tNA80urD`

#### Viator
- **Generic:** `https://viator.tpo.lv/TUcQTS5u`

#### Saily (eSIM)
- **Generic:** `https://saily.tpo.lv/rf9lidnE`
- **Alt:** `https://saily.tpo.lv/jneIEAt7`

#### NordVPN
- **NordVPN:** `https://nordvpn.tpo.lv/ekHF1i55`
- **NordPass:** `https://nordvpn.tpo.lv/tp12zNjC`

### Amazon Associates (tag: go2thailand-20)
- 13 productlinks in `pages/travel-gear/index.tsx`
- Format: `https://www.amazon.com/dp/[ASIN]?tag=go2thailand-20`

### SafetyWing (Travel Insurance)
- **URL:** `https://safetywing.com/?referenceID=go2thailand`
- **Locatie:** `pages/travel-insurance/index.tsx`

---

## Widgets (Travelpayouts Embeds via tpembd.com)

Alle widgets gebruiken base parameters: `trs=421888&shmarker=602467`

### Booking.com Hotels Search
- **Promo:** 2693 | **Campaign:** 84
- **Gebruikt op:** Blog posts
- **Script:** `https://tpembd.com/content?trs=421888&shmarker=602467&locale=en&sustainable=false&deals=false&border_radius=5&plain=true&powered_by=true&promo_id=2693&campaign_id=84`

### Trip.com Hotel Search
- **Promo:** 4038 | **Campaign:** 121
- **Gebruikt op:** 20+ pagina's (hotels, compare, islands, weather, city)
- **Script:** `https://tpembd.com/content?trs=421888&shmarker=602467&lang=www&layout=S10391&powered_by=true&campaign_id=121&promo_id=4038`

### Trip.com Flights Search
- **Promo:** 4132 | **Campaign:** 121
- **Gebruikt op:** Blog posts
- **Script:** `https://tpembd.com/content?trs=421888&shmarker=602467&locale=en&curr=USD&powered_by=true&border_radius=0&plain=true&color_button=%232681ff&color_button_text=%23ffffff&color_border=%232681ff&promo_id=4132&campaign_id=121`

### Viator Popular Tours
- **Promo:** 5850 | **Campaign:** 47
- **Gebruikt op:** Blog posts
- **Script:** `https://tpembd.com/content?currency=usd&trs=421888&shmarker=602467&powered_by=true&locale=en&lowest_price=&highest_price=&min_lines=5&color_button=%23346A6C&promo_id=5850&campaign_id=47`

### GetYourGuide Tours
- **Promo:** 4039 | **Campaign:** 108
- **Gebruikt op:** Activities pagina
- **Script:** `https://tpembd.com/content?trs=421888&shmarker=602467&place=Thailand&items=3&locale=en&powered_by=true&campaign_id=108&promo_id=4039`

### Klook Activities
- **Promo:** 4497 | **Campaign:** 137
- **Gebruikt op:** Activities pagina
- **Script:** `https://tpembd.com/content?currency=USD&trs=421888&shmarker=602467&locale=en&category=4&amount=3&powered_by=true&campaign_id=137&promo_id=4497`

### 12Go Transport Search
- **Promo:** 1506 | **Campaign:** 44
- **Gebruikt op:** Transport pagina
- **Script:** `https://tpembd.com/content?trs=421888&shmarker=602467&locale=en&from=Bangkok&to=Phuket&from_en=Bangkok&to_en=Phuket&powered_by=true&color=black&border=1&campaign_id=44&promo_id=1506`

### 12Go City Widget
- **Promo:** 8995 | **Campaign:** 44
- **Gebruikt op:** City pagina's
- **Script:** `https://tpembd.com/content?currency=USD&trs=421888&shmarker=602467&powered_by=true&dafault_width=true&locale=en&header_color=%234b4b4b&text_color=%234b4b4b&background_color=%23ffffff&price_color=%234db84d&promo_id=8995&campaign_id=44`

---

## Componenten

| Component | Bestand | Doel |
|-----------|---------|------|
| **AffiliateWidget** | `components/AffiliateWidget.tsx` | Generieke widget renderer |
| **TripcomWidget** | `components/TripcomWidget.tsx` | Trip.com hotel search widget |
| **affiliate-injector** | `lib/pipeline/affiliate-injector.ts` | Auto-injectie van links in blog posts (21 keyword regels) |

---

## Pagina's met Affiliate Content

1. `pages/index.tsx` — Homepage (Trip.com, Booking.com, Klook, GetYourGuide, 12Go)
2. `pages/blog/[slug].tsx` — Blog posts (alle widgets + inline links)
3. `pages/activities/index.tsx` — Activities (Klook, GetYourGuide widgets)
4. `pages/travel-gear/index.tsx` — Travel gear (13 Amazon links)
5. `pages/travel-insurance/index.tsx` — Insurance (SafetyWing + Trip.com)
6. `pages/best-beaches-in-thailand.tsx` — Beaches (Travelpayouts links)
7. `pages/visa/[slug].tsx` — Visa pagina's (Booking, Trip.com, Saily, 12Go, Klook, GetYourGuide)
8. `pages/region/[slug].tsx` — Regio pagina's (Trip.com, Booking, 12Go)
9. `pages/transport/[route].tsx` — Transport routes (12Go widget + link)
10. `pages/compare/[slug].tsx` — Vergelijkingspagina's (alle partners)
11. `pages/weather/index.tsx` — Weer (Trip.com)
12. `pages/best-cooking-classes-in-thailand.tsx` — Kooklessen (Klook, GetYourGuide)
13. `pages/best-diving-snorkeling-in-thailand.tsx` — Duiken (Klook, GetYourGuide)
14. `pages/islands/[slug].tsx` — Eilanden (12Go widget, Booking, Trip.com)
15. `pages/city/[slug]/index.tsx` — Steden (12Go city widget)
16. `pages/top-10/hotels.tsx` — Hotel top 10 (Trip.com widget)
17. `pages/top-10/restaurants.tsx` — Restaurant top 10 (Trip.com widget)
18. `pages/blog/tag/[tag].tsx` — Blog tags (Booking, Trip.com)

---

## Totalen

- **10 affiliate partners:** Booking.com, Trip.com, Klook, GetYourGuide, 12Go, Viator, Saily, NordVPN/NordPass, SafetyWing, Amazon
- **25+ Travelpayouts links** + 13 Amazon links
- **8 embed widgets**
- **41 blog posts** met affiliate content
- **18+ pagina's** met widgets/links
- **Referentiebestand:** `content/affiliate-reference.txt`
