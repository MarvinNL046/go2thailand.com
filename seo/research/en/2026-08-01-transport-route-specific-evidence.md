# English transport routes: route-specific evidence matrix

Checked: 2026-08-01
Scope: 69 popular transport route owners in `data/transport-routes.json`.

## Evidence keys

- **TAT** — Tourism Authority of Thailand transport FAQ: https://www.tourismthailand.org/Faqs/3. General planning context only.
- **TCL** — The Transport Company: https://transport.co.th/home/en/home-en/?lang=en. Current intercity-bus operator/checking channel; never proof that every generated city pair is direct.
- **SRT** — State Railway of Thailand and D-Ticket: https://www.railway.co.th/ and https://www.dticket.railway.co.th/. The authoritative train, station and inventory recheck.
- **DOA/AOT** — Department of Airports and Airports of Thailand: https://www.airports.go.th/ and https://www.airportthai.co.th/. Airport identity only; airport existence never proves a direct flight.
- **DLT** — Department of Land Transport: https://www.dlt.go.th/en/. Authority context for legal road transport; the named provider and vehicle still require a live check.
- **MD** — Marine Department: https://www.md.go.th/. Maritime-authority and notice context; not proof of a particular sailing.
- **Lomprayah** — current operator timetable: https://www.lomprayah.com/time-table?lang=en. Relevant to eligible Koh Samui combined/ferry legs only; users must check their exact dated itinerary.

Current web search also located the official Transport Company English site, the SRT site/D-Ticket government guidance, and Lomprayah's 2026 timetable. No source was used to infer a direct service, universal frequency, fixed fare or blanket cancellation policy.

## Route decisions by evidence signature

Each slug below is accepted as a **planning owner**, not as a certified timetable. Its rendered page names only candidate modes and requires an exact operator/stops/total check.

### TAT + TCL + SRT + DLT (8)

ayutthaya-to-bangkok, ayutthaya-to-chiang-mai, ayutthaya-to-hua-hin, bangkok-to-ayutthaya, bangkok-to-hua-hin, chiang-mai-to-ayutthaya, hua-hin-to-ayutthaya, hua-hin-to-bangkok

### TAT + TCL + DLT (27)

ayutthaya-to-kanchanaburi, ayutthaya-to-pattaya, ayutthaya-to-phuket, bangkok-to-kanchanaburi, bangkok-to-pai, bangkok-to-pattaya, chiang-mai-to-chiang-rai, chiang-mai-to-kanchanaburi, chiang-mai-to-pai, chiang-rai-to-pai, hua-hin-to-kanchanaburi, hua-hin-to-pattaya, kanchanaburi-to-ayutthaya, kanchanaburi-to-bangkok, kanchanaburi-to-chiang-mai, kanchanaburi-to-hua-hin, kanchanaburi-to-pattaya, kanchanaburi-to-phuket, pai-to-bangkok, pai-to-chiang-mai, pai-to-chiang-rai, pattaya-to-ayutthaya, pattaya-to-bangkok, pattaya-to-hua-hin, pattaya-to-kanchanaburi, phuket-to-ayutthaya, phuket-to-kanchanaburi

### TAT + TCL + SRT + DOA/AOT + DLT (4)

bangkok-to-chiang-mai, chiang-mai-to-bangkok, chiang-mai-to-hua-hin, hua-hin-to-chiang-mai

### TAT + TCL + SRT + DOA/AOT (1)

bangkok-to-chiang-rai

### TAT + TCL + DOA/AOT + DLT (17)

bangkok-to-krabi, bangkok-to-phuket, chiang-mai-to-koh-samui, chiang-mai-to-pattaya, chiang-rai-to-bangkok, chiang-rai-to-chiang-mai, hua-hin-to-krabi, hua-hin-to-phuket, koh-samui-to-bangkok, koh-samui-to-chiang-mai, krabi-to-bangkok, krabi-to-hua-hin, krabi-to-pattaya, pattaya-to-chiang-mai, pattaya-to-krabi, phuket-to-bangkok, phuket-to-hua-hin

### TAT + DOA/AOT (5)

chiang-mai-to-krabi, chiang-rai-to-phuket, krabi-to-chiang-mai, phuket-to-chiang-mai, phuket-to-chiang-rai

### TAT + TCL + DOA/AOT + DLT + MD + Lomprayah (4)

koh-samui-to-krabi, koh-samui-to-phuket, krabi-to-koh-samui, phuket-to-koh-samui

### TAT + TCL + DLT + MD (2)

krabi-to-phuket, phuket-to-krabi

### Dedicated canonical owner (1)

`bangkok-to-koh-samui` permanently redirects to `/blog/bangkok-to-koh-samui-guide/`; it is accepted as a consolidation decision and must not render a competing route page.

Totals: 68 shared-template planning owners + 1 permanent consolidation = **69/69 resolved, 0 remaining**.
