# NL editorial planning, food en hotels — batch 12

Peildatum: 1 augustus 2026
Methode: actuele openbare webcontrole en primaire bronnen waar veranderlijke feiten bepalend zijn. Geen DataForSEO-call uitgevoerd, geen zoekvolume overgenomen en geen PAA-vraag als “echt” gelabeld.

## Lifecycle en intent-splits

| Route | Beslissing | Zelfstandige intent / reden |
|---|---|---|
| `/nl/blog/snorkelen-thailand-beste-eilanden-heldere-zicht/` | `archived`, `noindex,follow` | Dubbele brede snorkelintentie; consolideren naar `/nl/travel-guides/diving-snorkeling-thailand/`. |
| `/nl/blog/beste-streetfood-bangkok-wijken-plekken-proeven/` | `ready`, index | Wijk- en eetvormkeuze voor streetfood; de city-foodowner blijft breed eten-in-Bangkok bezitten en marktartikelen blijven venue-specifiek. |
| `/nl/blog/koh-samui-voor-nederlanders-vluchten-via-bangkok-transfers-beste-wijken/` | `ready`, index | Nederland-specifieke reisketen plus kustkeuze; destination, weather en hotelowners blijven hun eigen beslissingen bezitten. |
| `/nl/blog/phuket-weer/` | `archived`, `noindex,follow` | Exacte duplicatie van de geaccepteerde `/nl/city/phuket/weather/` owner. |
| `/nl/blog/bangkok-travel-tips-reddit/` | `ready`, index | Eerste-aankomst- en eerste-dagenplan dat communityvragen verifieert; brede Bangkok- en algemene Thailand-first-timeowners blijven gescheiden. |
| `/nl/blog/anantara-siam-bangkok-50-million-renovation-garden-suites-2026/` | `ready`, index | Hotel-specifieke renovatiestatus en pre-bookingcheck; veranderlijke oplevering expliciet begrensd. |
| `/nl/blog/andaz-one-bangkok-luxury-hotel-lumphini-guide-2026/` | `ready`, index | Hotel-detail en locatie-fit voor een geopend hotel; de Bangkok-hotelowner blijft de brede vergelijking bezitten. |

## Keyword owners voor centrale integratie

- `streetfood Bangkok wijken` → `/nl/blog/beste-streetfood-bangkok-wijken-plekken-proeven/`
- `Koh Samui vanuit Nederland` → `/nl/blog/koh-samui-voor-nederlanders-vluchten-via-bangkok-transfers-beste-wijken/`
- `Bangkok tips eerste keer` → `/nl/blog/bangkok-travel-tips-reddit/`
- `Anantara Siam Bangkok renovatie 2026` → `/nl/blog/anantara-siam-bangkok-50-million-renovation-garden-suites-2026/`
- `Andaz One Bangkok` → `/nl/blog/andaz-one-bangkok-luxury-hotel-lumphini-guide-2026/`

De twee archived routes krijgen geen nieuw indexeerbaar keyword-eigenaarschap.

## Gecontroleerde bronnen en conclusies

### Bangkok streetfood

- Tourism Authority of Thailand, Bangkok destination: `https://www.tourismthailand.org/Destinations/Provinces/bangkok/219`
- Tourism Authority of Thailand, Chinatown-route: `https://www.tourismthailand.org/Articles/the-adventure-through-bangkok-s-chinatown`
- World Health Organization, Five keys to safer food: `https://www.who.int/activities/promoting-safe-food-handling/five-key-to-safer-food`

De officiële context ondersteunt Yaowarat als foodgebied en de WHO-bron ondersteunt de voedselveiligheidsgrenzen. Oude openingstijden, vaste prijzen, kraamranglijsten en absolute veiligheidsclaims zijn bewust niet herhaald.

### Koh Samui

- Tourism Authority of Thailand, Ko Samui: `https://www.tourismthailand.org/Destinations/Provinces/Ko-Samui/360`
- NederlandWereldwijd, reisadvies Thailand: `https://www.nederlandwereldwijd.nl/reisadvies/thailand`

De route is herschreven als ketenbeslissing. Geen vaste vaartijd, vluchtfrequentie, prijs, laatste ferry of weersbelofte. De live vervoerderinformatie blijft bepalend.

### Bangkok first-time

- Tourism Authority of Thailand, Bangkok: `https://www.tourismthailand.org/Destinations/Provinces/bangkok/219`
- BTS Skytrain: `https://www.bts.co.th/eng/`
- MRT Bangkok: `https://metro.bemplc.co.th/`
- NederlandWereldwijd, reisadvies Thailand: `https://www.nederlandwereldwijd.nl/reisadvies/thailand`

Reddit wordt alleen als vraag- en frictiesignaal gebruikt. Communityconsensus, vaste ritprijzen en onbewezen scam- of veiligheidslabels zijn verwijderd.

### Anantara Siam Bangkok

- Minor Hotels, oorspronkelijke transformatieaankondiging: `https://media.minorhotels.com/en-GLO/251962-the-evolution-of-an-icon-anantara-siam-bangkok-begins-a-new-era-with-a-landmark-transformation/`
- Minor Hotels, 2026 additions: `https://media.minorhotels.com/en-GLO/257719-new-and-renewed-upcoming-additions-to-the-world-of-minor-hotels-in-2026/`

De primaire bronnen bevestigen de gefaseerde transformatie, zes Garden Suites en de aangekondigde faciliteiten. De publicaties gebruiken verschillende planningsformuleringen; daarom is voltooiing geen garantie en vraagt de owner om bevestiging voor de exacte verblijfsdata.

### Andaz One Bangkok

- Hyatt hotelpagina: `https://www.hyatt.com/andaz/en-US/bkkaz-andaz-one-bangkok`
- Hyatt kamerpagina: `https://www.hyatt.com/andaz/en-US/bkkaz-andaz-one-bangkok/rooms`
- Hyatt Newsroom, opening: `https://newsroom.hyatt.com/Andaz-One-Bangkok-Opens-Its-Door-In-Thailand`

Hyatt bevestigt de opening op 19 december 2025, 244 kamers en suites, ligging bij Lumphini/One Bangkok en hotelvoorzieningen. Oude vaste vanafprijzen en de suggestie dat ieder kamertype parkzicht heeft zijn verwijderd.

## Affiliatebeleid

- Streetfood: één Klook-uitgang pas na de onafhankelijke eetvorm- en veiligheidskeuze.
- Koh Samui: één 12Go-uitgang pas na de reisketencheck.
- Anantara en Andaz: elk één Trip.com-uitgang met live-totaalprijsbeleid.
- Bangkok first-time en beide archived routes: geen affiliate nodig.
- Geen Amazon-productblok: geen fysiek product lost de primaire wijk-, route-, lifecycle- of hotelkeuze van deze batch op.

Alle commerciële uitgangen gebruiken de bestaande typed affiliate-renderer en vereisen `noopener noreferrer nofollow sponsored` in de uiteindelijke anchor.
