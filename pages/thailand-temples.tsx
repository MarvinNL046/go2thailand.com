import { GetStaticProps } from 'next';
import SEOHead from '../components/SEOHead';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import TripcomWidget from '../components/TripcomWidget';

// ─────────────────────────────────────────────────────────────────────────────
// TYPE DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

interface TempleData {
  rank: number;
  name: string;
  city: string;
  city_slug: string;
  entry_fee: string | null;
  opening_hours: string | null;
  description: string;
  key_facts: string[];
  type: string;
  google_maps_query: string;
}

interface PageData {
  title: string;
  meta_description: string;
  intro: string;
  items: TempleData[];
  tips: string[];
  generated_at: string;
}

interface ThailandTemplesProps {
  data: PageData;
}

type CityFilter = 'all' | 'bangkok' | 'chiang-mai' | 'chiang-rai' | 'ayutthaya' | 'other';

// ─────────────────────────────────────────────────────────────────────────────
// EDITORIAL TEMPLE PROFILES (source-backed, verified facts)
// Each entry is independently researched and cited.
// ─────────────────────────────────────────────────────────────────────────────

interface TempleProfile {
  slug: string;
  officialNameThai: string;
  officialNameEnglish: string;
  city: string;
  citySlug: string;
  region: string;
  founded: string;
  architecturalStyle: string;
  entryFee: string;
  openingHours: string;
  headline: string;
  historicalBackground: string;
  whatToSee: string[];
  practicalInfo: {
    gettingThere: string;
    dresscode: string;
    timeNeeded: string;
  };
  keyFacts: string[];
  unescoStatus: string | null;
  sourcesNote: string;
  googleMapsQuery: string;
}

const templeProfiles: TempleProfile[] = [
  // ───────────────────────────────────────────────────────────────────────────
  // 1. WAT PHRA KAEW — Temple of the Emerald Buddha, Bangkok
  // Source: Wikipedia / Smarthistory / Britannica / World History Encyclopedia
  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'wat-phra-kaew',
    officialNameThai: 'วัดพระศรีรัตนศาสดาราม',
    officialNameEnglish: 'Wat Phra Si Rattana Satsadaram',
    city: 'Bangkok',
    citySlug: 'bangkok',
    region: 'Central Thailand',
    founded: '1782–1784 CE, consecrated 27 March 1784',
    architecturalStyle: 'Rattanakosin (early Bangkok period), with Khmer prang influences',
    entryFee: '500 THB (combined Grand Palace ticket)',
    openingHours: '8:30am–3:30pm daily (last entry 3:00pm)',
    headline:
      'Thailand\'s most sacred Buddhist temple — home to the revered Phra Phuttha Maha Mani Rattana Patimakon, the Emerald Buddha.',
    historicalBackground: `Construction of Wat Phra Kaew began in 1782 under Rama I, the founder of the Chakri dynasty, who established Bangkok as the new capital of Siam. The temple was consecrated in 1784 and the Emerald Buddha was ceremonially installed in the ubosot (ordination hall) in early 1784. The complex sits entirely within the Grand Palace precinct, covering approximately 95 rai (about 15 hectares) on Ko Ratanakosin island in the Chao Phraya River.

The Emerald Buddha — known in Thai as Phra Phuttha Maha Mani Rattana Patimakon — is carved from a single piece of green stone, now confirmed to be jasper rather than emerald or jade. It stands approximately 66 centimetres (26 inches) tall in a meditative seated posture. Its precise origin is disputed; a 15th-century chronicle places its discovery in Chiang Rai in 1434 CE, after which it passed through Lampang, Chiang Mai, Luang Prabang, and Vientiane before Rama I brought it to Bangkok. Three times each year, the reigning monarch personally changes the Buddha's gold seasonal costume in a royal ceremony — for summer, rainy season, and cool season — a tradition unbroken since the 18th century.

Every successive Chakri king has added buildings, murals, and restorations to the complex as acts of religious merit. The outer walls of the cloister are lined with 178 panels of mural paintings depicting the entire Ramakien epic (the Thai adaptation of the Hindu Ramayana), painted during the reign of Rama I and extensively restored under Rama III and later monarchs.`,
    whatToSee: [
      'The Emerald Buddha in the ubosot — photography is not permitted inside the ordination hall',
      'The gilded Phra Si Rattana Chedi, built by Rama IV to enshrine a Buddha relic from Sri Lanka',
      'The Angkor Wat model — a 1:25 scale replica of the Cambodian temple complex, commissioned by Rama IV',
      'Mural paintings in the cloister gallery depicting the 178-panel Ramakien epic',
      'Phra Mondop (library), decorated with gold and coloured glass tiles, housing sacred Buddhist manuscripts',
      'The Wihan Yod, a pavilion with spires inlaid with porcelain mosaic fragments'
    ],
    practicalInfo: {
      gettingThere:
        'MRT Sanam Chai Station (Blue Line) is approximately 300m away. Alternatively, take Chao Phraya Express Boat to Tha Chang Pier (N9). Taxi from Siam: approx. 80–120 THB.',
      dresscode:
        'Strict: shoulders and knees must be fully covered. No sleeveless shirts, shorts, short skirts, or see-through clothing. Sarongs and trousers available for loan at the entrance. Shoes removed inside all buildings.',
      timeNeeded: 'Minimum 2 hours; 3+ hours if also visiting the Grand Palace and adjacent museums.'
    },
    keyFacts: [
      'Most sacred temple in Thailand — the national palladium',
      'Founded 1782 by Rama I, Chakri dynasty',
      'Emerald Buddha carved from green jasper, 66cm tall',
      'King personally changes Buddha\'s gold costume three times per year',
      '178 Ramakien mural panels line the cloister walls',
      'No monks reside here — it is a royal chapel, not a monastery'
    ],
    unescoStatus: null,
    sourcesNote:
      'Facts verified against Wikipedia (Wat Phra Kaew), Smarthistory, Britannica, and World History Encyclopedia.',
    googleMapsQuery: 'Wat Phra Kaew Temple of the Emerald Buddha Bangkok Thailand'
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 2. WAT PHO — Temple of the Reclining Buddha, Bangkok
  // Source: Wikipedia / History Hit / Fine Arts Department Thailand
  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'wat-pho',
    officialNameThai: 'วัดพระเชตุพนวิมลมังคลาราม',
    officialNameEnglish: 'Wat Phra Chetuphon Vimolmangklavas Ratchaworamahawihan',
    city: 'Bangkok',
    citySlug: 'bangkok',
    region: 'Central Thailand',
    founded: '16th century (pre-Bangkok era); extensively rebuilt 1788 CE by Rama I; expanded 1832–1848 by Rama III',
    architecturalStyle: 'Rattanakosin; late Ayutthaya origins',
    entryFee: '300 THB',
    openingHours: '8:00am–6:30pm daily',
    headline:
      'Bangkok\'s oldest and largest temple complex — home to a 46-metre reclining Buddha, over 1,000 Buddha images, and Thailand\'s most famous traditional massage school.',
    historicalBackground: `Wat Pho predates Bangkok itself. The original temple on this site, known as Wat Phodharam, was established during the Ayutthaya period — likely the 16th century. When King Rama I founded Bangkok in 1782 and constructed the Grand Palace immediately to the north, he ordered the comprehensive reconstruction and expansion of Wat Phodharam between 1788 and 1801. The completed complex was renamed Wat Phra Chetuphon in honour of the Jetavana monastery of ancient India, and designated as the first-grade royal temple of the first class — the highest temple ranking in Thailand.

The temple's most celebrated feature, the Chapel of the Reclining Buddha (Phra Phuttha Saiyat), was built during the major expansion commissioned by Rama III between 1832 and 1848. The Reclining Buddha depicts the moment of the Buddha's parinirvana (final passing into nirvana), measuring 46 metres (151 feet) in length and 15 metres (49 feet) in height. The figure is constructed over a brick core, finished in gold leaf, with the soles of the feet inlaid with 108 auspicious symbols in mother-of-pearl.

Wat Pho's scholarly reputation is equally significant. Rama III had encyclopaedic inscriptions carved onto stone tablets and mounted throughout the temple grounds, covering topics including history, literature, warfare, astrology, and traditional medicine — effectively making the temple Thailand's first public university. The tradition of teaching traditional Thai massage (nuad phaen boran) has been practised at Wat Pho continuously; the temple's medical inscriptions and human body diagrams related to pressure points are now inscribed in UNESCO's Memory of the World Register (2008).`,
    whatToSee: [
      'The Chapel of the Reclining Buddha — the 46m gold-leaf figure with mother-of-pearl inlaid feet',
      '108 bronze alms bowls lining the wall; placing a coin in each brings good fortune according to tradition',
      'Four large chedis (stupas) representing the first four Chakri kings, encrusted with glazed ceramic tiles',
      'The ubosot (ordination hall) housing the primary Buddha image, Phra Buddha Deva Patimakorn',
      'Stone inscriptions and diagrams cataloguing traditional medicine and massage pressure points',
      'The on-site Wat Pho Traditional Medical and Massage School, offering massages from 460 THB'
    ],
    practicalInfo: {
      gettingThere:
        'MRT Sanam Chai Station (Blue Line) exit 1, approximately 5 minutes\' walk. Chao Phraya Express Boat to Tha Tien Pier (N8). Easily combined with Wat Phra Kaew and Wat Arun.',
      dresscode:
        'Shoulders and knees must be covered. Loanable wraps available at the temple entrance. Shoes removed in all buildings.',
      timeNeeded:
        '1.5–2 hours for the main sights; budget extra time for a traditional Thai massage on-site.'
    },
    keyFacts: [
      'Oldest and largest temple complex in Bangkok',
      'Reclining Buddha: 46m long, 15m high, finished in gold leaf',
      '1,000+ Buddha images — largest collection of any Thai temple',
      'UNESCO Memory of the World (2008) for traditional medicine inscriptions',
      'Traditional Thai massage school has operated here for centuries',
      'Royal temple first class — highest designation in Thailand'
    ],
    unescoStatus: 'UNESCO Memory of the World Register (2008) — inscriptions on traditional Thai medicine',
    sourcesNote:
      'Facts verified against Wikipedia (Wat Pho), History Hit, and UNESCO Memory of the World database.',
    googleMapsQuery: 'Wat Pho Reclining Buddha Bangkok Thailand'
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 3. WAT ARUN — Temple of Dawn, Bangkok
  // Source: Wikipedia / wat-arun.com / Atlas Obscura
  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'wat-arun',
    officialNameThai: 'วัดอรุณราชวรารามราชวรมหาวิหาร',
    officialNameEnglish: 'Wat Arunratchawararam Ratchaworamahawihan',
    city: 'Bangkok',
    citySlug: 'bangkok',
    region: 'Central Thailand',
    founded: 'Ayutthaya period (pre-17th century); central prang completed 1851 CE under Rama III/IV',
    architecturalStyle: 'Khmer-influenced Thai prang; Rattanakosin period decoration',
    entryFee: '200 THB',
    openingHours: '8:00am–5:30pm daily',
    headline:
      'Bangkok\'s most dramatic skyline silhouette — an 82-metre riverside prang encrusted with over one million fragments of Chinese porcelain.',
    historicalBackground: `Wat Arun's origins extend at least to the Ayutthaya period, when it was known as Wat Makok (Temple of the Olive Trees). The temple gained national significance in 1768 when King Taksin, having fought his way out of the Burmese-occupied Ayutthaya, arrived at this spot on the western bank of the Chao Phraya at dawn and reportedly saw it as a divine sign. Taksin established Thonburi as his new capital with Wat Arun as the royal chapel, and crucially housed the Emerald Buddha here until it was transferred across the river to the newly built Wat Phra Kaew in 1784.

The temple's defining structure, the central prang (tower), was begun under Rama II (r. 1809–1824), who envisioned raising it to 70 metres. The project continued under Rama III and was completed under Rama IV (King Mongkut) in 1851, reaching approximately 82 metres — the tallest prang in Bangkok. The surface is decorated with fragments of Chinese porcelain and Benjarong ware, a technique reportedly developed partly from the smashed crockery of Chinese trading ships. The resulting mosaic of flower petals, leaves, and geometric patterns glitters in changing light throughout the day.

The central prang represents Mount Meru, the cosmic mountain at the centre of the Hindu-Buddhist universe. Four smaller prangs at the corners are dedicated to Phra Phai, the god of wind. A major restoration project was completed in 2017, during which lime plaster surfaces were re-finished and thousands of broken ceramic tiles replaced.`,
    whatToSee: [
      'The 82-metre central prang — climb the steep steps for panoramic views of the Chao Phraya and Grand Palace',
      'Chinese porcelain mosaic surface: over one million ceramic fragments embedded in plaster',
      'Four corner prangs dedicated to Phra Phai (god of wind), each with guardian demon statues',
      'Ubosot housing the principal Buddha image, consecrated under Rama II',
      'Cross-river view at dusk — the illuminated prang reflected in the Chao Phraya is one of Bangkok\'s most iconic sights',
      'Riverside terrace looking towards Wat Pho and the Grand Palace on the opposite bank'
    ],
    practicalInfo: {
      gettingThere:
        'Cross the Chao Phraya by ferry from Tha Tien Pier (N8) — a 4 THB, 3-minute crossing runs every 10–15 minutes. BTS to Saphan Taksin, then Chao Phraya Express to Tha Tien. Taxi from central Bangkok: 100–200 THB.',
      dresscode:
        'Long trousers required — shorts not permitted even if knee-length. No sleeveless shirts. Sarongs available for rent near the entrance. Hats not permitted inside temple buildings.',
      timeNeeded: '1–2 hours. Best visited in early morning or late afternoon for photography.'
    },
    keyFacts: [
      'Named after Aruna, the Hindu god of dawn',
      '82m central prang — tallest in Bangkok, completed 1851',
      'Housed the Emerald Buddha 1768–1784 under King Taksin',
      'Over one million Chinese porcelain fragments cover the prang surfaces',
      'Prang symbolises Mount Meru of Hindu-Buddhist cosmology',
      'Major restoration completed 2017 (lime plaster and ceramics)'
    ],
    unescoStatus: null,
    sourcesNote:
      'Facts verified against Wikipedia (Wat Arun), wat-arun.com, and Atlas Obscura.',
    googleMapsQuery: 'Wat Arun Temple of Dawn Bangkok Thailand'
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 4. WAT PHRA THAT DOI SUTHEP — Chiang Mai
  // Source: Wikipedia / chiangmai-alacarte.com / sacred-destinations.com
  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'wat-phra-that-doi-suthep',
    officialNameThai: 'วัดพระธาตุดอยสุเทพราชวรวิหาร',
    officialNameEnglish: 'Wat Phra That Doi Suthep Ratchaworawihan',
    city: 'Chiang Mai',
    citySlug: 'chiang-mai',
    region: 'Northern Thailand',
    founded: '1383 CE, during the reign of King Kue Na of the Lanna Kingdom',
    architecturalStyle: 'Lanna Buddhist architecture; gilded chedi (stupa)',
    entryFee: '50 THB (plus songthaew: approx. 60 THB per person from Chiang Mai)',
    openingHours: '6:00am–8:00pm daily',
    headline:
      'Northern Thailand\'s most revered temple, perched at 1,073 metres on Doi Suthep mountain — founded in 1383 CE to enshrine a relic of the Buddha.',
    historicalBackground: `Wat Phra That Doi Suthep was established in 1383 CE by King Kue Na (r. 1367–1388) of the Lanna Kingdom. The founding legend, still widely recounted in northern Thailand, describes how a Buddhist monk named Sumana arrived in Chiang Mai carrying a piece of bone believed to be a relic of the historical Buddha. The relic reportedly glowed and multiplied itself. One piece was enshrined at Wat Suan Dok in the city; the other was placed on the back of a sacred white elephant and released into the forest. The elephant climbed Doi Suthep mountain and died at the summit — an event interpreted by King Kue Na as a divine sign. A temple was built at that spot to house the relic, with an octagonal base chedi constructed over it.

The temple stands at an elevation of approximately 1,073 metres above sea level, commanding views over Chiang Mai and the surrounding valley. The gilded chedi at the heart of the complex is 22 metres high and is considered one of the most sacred in all of Thailand. A key moment in the temple's accessibility came in 1935 when the Venerable Khruba Si Wichai, a revered northern monk, inspired hundreds of villagers to construct the 11.5 km road to the summit using only voluntary labour — a project that took less than six months. Visitors still ascend the final 309 steps via a naga-flanked (serpent-balustrade) staircase built in the 1920s. Doi Suthep mountain became a national park in 1981.`,
    whatToSee: [
      'The gilded 22-metre chedi encasing the sacred Buddha relic — pilgrims walk clockwise around it three times',
      'Naga-flanked staircase of 309 steps leading up to the main terrace',
      'Bell tower and multiple royal Buddha images added by successive Lanna and Thai kings',
      'Panoramic terrace view over Chiang Mai city, best at dawn or dusk',
      'Viharns (sermon halls) housing important Buddha images including a revered bronze Buddha from the 15th century',
      'Monks chanting in the early morning (approximately 6:30–7:30am) — one of the most atmospheric experiences'
    ],
    practicalInfo: {
      gettingThere:
        'Hire a red songthaew (shared taxi truck) from the moat road near Chiang Mai University — approximately 60 THB per person up, 50 THB per person down. Private car or taxi: approximately 300–500 THB return. The road is 11.5 km from the university gate.',
      dresscode:
        'Shoulders and knees must be covered. Wraps and trousers available for free loan at the entrance. Remove shoes in all shrine areas.',
      timeNeeded: '1.5–2 hours at the temple; allow 30 minutes each way for the drive.'
    },
    keyFacts: [
      'Founded 1383 CE by King Kue Na of the Lanna Kingdom',
      'Elevation: 1,073 metres on Doi Suthep mountain',
      'Access road built by volunteer labour in 1935 led by Khruba Si Wichai',
      '309-step naga-flanked staircase from the base',
      '22-metre gilded chedi enshrines a Buddha relic',
      'Part of Doi Suthep–Pui National Park (designated 1981)'
    ],
    unescoStatus: null,
    sourcesNote:
      'Facts verified against Wikipedia (Wat Phra That Doi Suthep), chiangmai-alacarte.com, and sacred-destinations.com.',
    googleMapsQuery: 'Wat Phra That Doi Suthep Chiang Mai Thailand'
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 5. WAT RONG KHUN — White Temple, Chiang Rai
  // Source: Wikipedia / Chiang Rai Times / Remote Lands
  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'wat-rong-khun',
    officialNameThai: 'วัดร่องขุ่น',
    officialNameEnglish: 'Wat Rong Khun (White Temple)',
    city: 'Chiang Rai',
    citySlug: 'chiang-rai',
    region: 'Northern Thailand',
    founded: 'Original community temple 1964; current structure opened to the public 1997, ongoing construction',
    architecturalStyle: 'Contemporary Buddhist — designed by Chalermchai Kositpipat; white stucco with mirror-glass mosaic',
    entryFee: '100 THB',
    openingHours: '8:00am–5:30pm (Mon–Fri); 8:00am–5:30pm (Sat–Sun)',
    headline:
      'A living work of art by Thai master artist Chalermchai Kositpipat — the most visually striking contemporary Buddhist temple in Southeast Asia, entirely self-funded and still under construction.',
    historicalBackground: `The site of Wat Rong Khun has been a place of Buddhist worship since the founding of a small community temple in 1964. By the 1990s the original structure had fallen into severe disrepair and no public funds were available for renovation. In 1997, Chalermchai Kositpipat — a celebrated Thai visual artist born in Chiang Rai province in 1955, who studied at Silpakorn University in Bangkok — made the extraordinary decision to demolish the old temple and rebuild it entirely from his own funds as a personal act of religious merit. He has since spent over 40 million THB of his own money on the project and has stated his intention to work on it for the remainder of his life.

The design is unlike any other temple in Thailand. The ubosot (ordination hall) gleams brilliant white — chosen by Kositpipat to represent the purity of the Buddha's teachings — and is encrusted with hundreds of thousands of mirror-glass fragments that catch and fracture sunlight. The visitor crosses a bridge over a pool representing the cycle of rebirth, passing outstretched hands emerging from the ground (symbolising suffering and desire) before entering the hall. Interior murals, painted by Kositpipat himself, juxtapose traditional Buddhist iconography with contemporary pop culture imagery including comic-book superheroes and film characters — a deliberate commentary on modern materialism.

On 5 May 2014, a 6.3 magnitude earthquake struck Mae Lao district and damaged parts of the temple complex. Kositpipat announced a full restoration within two years and personally oversaw all repairs. When complete, the complex will include nine buildings, a gold-coloured toilet block (representing the earthly realm), a gold pavilion (representing wealth), and monks' quarters. The project's completion is expected decades hence.`,
    whatToSee: [
      'The white ubosot with mirror-glass mosaic surface — the iconic centrepiece of the complex',
      'The Bridge of the Cycle of Rebirth over a reflective pool, flanked by outstretched sculpted hands',
      'Interior murals by Kositpipat combining Buddhist imagery with pop-culture references',
      'The gold-coloured toilet and restroom building — deliberately contrasted with the white temple to symbolise worldly desire',
      'The Hell Garden (Sala Kaew Ku-inspired open area) with figurative sculptures',
      'The art gallery housing works by Kositpipat and information about the ongoing project'
    ],
    practicalInfo: {
      gettingThere:
        'Located 13 km south of Chiang Rai city on Highway 1, near Baan Pa Ngiu village. Minibus or songthaew from Chiang Rai bus station: approximately 30–40 THB. Tuk-tuk or taxi from Chiang Rai: 100–200 THB one way. Easily combined with Wat Phra Kaew (Blue Temple) and Doi Tung Palace.',
      dresscode:
        'Strict dress code enforced. Shoulders and knees must be fully covered; sarongs and trousers available for loan at the gate. No revealing clothing or bare midriffs. The artist himself occasionally refuses entry for dress code violations.',
      timeNeeded: '1–1.5 hours. Arrives early; queues form quickly from mid-morning.'
    },
    keyFacts: [
      'Designed and self-funded by artist Chalermchai Kositpipat (b. 1955, Chiang Rai)',
      'Opened to the public 1997; ongoing construction',
      'Artist has invested over 40 million THB of personal funds',
      'White colour symbolises purity of Buddha\'s teachings',
      'Interior murals blend traditional Buddhism with contemporary pop culture',
      'Partially damaged by 6.3 magnitude earthquake, 5 May 2014; fully restored'
    ],
    unescoStatus: null,
    sourcesNote:
      'Facts verified against Wikipedia (Wat Rong Khun), Chiang Rai Times, and Remote Lands.',
    googleMapsQuery: 'Wat Rong Khun White Temple Chiang Rai Thailand'
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 6. WAT CHEDI LUANG — Chiang Mai
  // Source: Wikipedia / chiangmai-alacarte.com / Thailandblog.nl
  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'wat-chedi-luang',
    officialNameThai: 'วัดเจดีย์หลวงวรวิหาร',
    officialNameEnglish: 'Wat Chedi Luang Worawihan',
    city: 'Chiang Mai',
    citySlug: 'chiang-mai',
    region: 'Northern Thailand',
    founded: '1391 CE, begun under King Saenmueangma of Lanna; expanded to full height under King Tilokaraj (c. 1441–1481)',
    architecturalStyle: 'Lanna Buddhist; large square-base chedi in the Lanna style',
    entryFee: '50 THB (donation)',
    openingHours: '6:00am–10:00pm daily',
    headline:
      'Chiang Mai\'s most commanding ruin — a 14th-century chedi that once stood 82 metres high until a catastrophic 1545 earthquake removed its upper 30 metres permanently.',
    historicalBackground: `Wat Chedi Luang sits at the heart of Chiang Mai's old city, within the square moat that has defined the city since its founding in 1296 CE. Construction of the great chedi (literally "great stupa") was ordered by King Saenmueangma around 1391 CE to inter the ashes of his father. The king died before the chedi was completed; construction continued under his widow and successors for decades.

The chedi reached its greatest extent under King Tilokaraj (r. 1441–1487) of the Lanna Kingdom, who expanded it to a height of approximately 82 metres with a base diameter of 54 metres — making it the largest structure in all of Lanna at that time. In 1468 CE, the Emerald Buddha (now housed at Wat Phra Kaew in Bangkok) was installed in a niche on the eastern face of the chedi, where it remained until 1475.

The pivotal event in the chedi's history came in 1545 CE, when a severe earthquake struck Chiang Mai and collapsed the upper 30 metres of the structure. No serious attempt at reconstruction was made; the ruined profile — a broad, truncated pyramid of ancient brick — has defined the skyline of Chiang Mai's old city ever since. Following a further period of abandonment after the Burmese conquest of Chiang Mai in 1558, the site gradually recovered religious life over subsequent centuries.

In the 1990s, a restoration project supported by UNESCO and the Japanese government stabilised the structure, rebuilt one elephant buttress on the northern face, and installed a wooden reproduction of the Emerald Buddha in the eastern niche. The restoration remains somewhat controversial among heritage specialists who question whether the recreation is historically accurate, but the structural stabilisation work is widely regarded as having saved what remained.`,
    whatToSee: [
      'The ruined chedi itself — 60 metres of the original 82-metre structure survives, its broken crown a powerful presence',
      'Stone elephant buttresses at each corner (originals largely destroyed; northern corner partially restored in the 1990s)',
      'A replica of the Emerald Buddha placed in the eastern niche — the position it occupied 1468–1475',
      'The adjacent Viharn Luang, an active temple hall with monks conducting daily rituals',
      '"Monk Chat" sessions — structured conversations with English-speaking monks available on-site most mornings',
      'City Pillar Shrine (Sao Inthakin) located within the temple compound — the spiritual foundation of Chiang Mai'
    ],
    practicalInfo: {
      gettingThere:
        'Located on Phra Pokklao Road in the centre of Chiang Mai\'s old city, easily walkable from Tha Phae Gate (approximately 500m). Tuk-tuk from the Night Bazaar: 40–80 THB.',
      dresscode:
        'Shoulders and knees must be covered; sarongs and trousers available at the entrance for loan. Shoes removed when entering any shrine hall.',
      timeNeeded: '45 minutes to 1 hour. Can be combined with the nearby Three Kings Monument and Wat Phra Singh.'
    },
    keyFacts: [
      'Founded 1391 CE under King Saenmueangma of Lanna',
      'Original height 82m with 54m base diameter — largest in Lanna',
      'Emerald Buddha housed here 1468–1475 CE',
      '1545 earthquake destroyed upper 30 metres — never rebuilt',
      'UNESCO/Japan-funded structural stabilisation completed 1990s',
      '"Monk Chat" programme runs daily on-site'
    ],
    unescoStatus: 'Restoration supported by UNESCO and Japanese government (1990s)',
    sourcesNote:
      'Facts verified against Wikipedia (Wat Chedi Luang), chiangmai-alacarte.com, and Thailandblog.nl.',
    googleMapsQuery: 'Wat Chedi Luang Chiang Mai Thailand'
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 7. WAT PHRA SI SANPHET — Ayutthaya Historical Park
  // Source: Wikipedia / UNESCO WHC list 576 / ayutthaya-history.com
  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'wat-phra-si-sanphet',
    officialNameThai: 'วัดพระศรีสรรเพชญ์',
    officialNameEnglish: 'Wat Phra Si Sanphet',
    city: 'Ayutthaya',
    citySlug: 'ayutthaya',
    region: 'Central Thailand',
    founded:
      '1448 CE, when King Borommatrailokkanat converted the old royal palace grounds to a sacred site; two chedis added 1492 CE by Ramathibodi II',
    architecturalStyle: 'Ayutthaya royal temple style; three large bell-shaped chedis in Sri Lankan tradition',
    entryFee: '50 THB (Ayutthaya Historical Park; combined passes available)',
    openingHours: '7:30am–5:30pm daily',
    headline:
      'The royal temple of the Ayutthaya Kingdom — a site reserved exclusively for the royal family for over three centuries, destroyed by Burmese forces in 1767 and now part of a UNESCO World Heritage Site.',
    historicalBackground: `Wat Phra Si Sanphet occupies a site with even deeper royal roots than the temple itself. In 1350 CE King Ramathibodi I, founder of the Ayutthaya Kingdom, ordered the construction of a royal palace on this ground, completed in 1351. In 1448, King Borommatrailokkanat moved the royal residence north and consecrated the former palace grounds as a sacred temple — the royal chapel of the Ayutthaya court, used exclusively by members of the royal family. No monks resided permanently on the premises; it functioned solely as a ceremonial and merit-making space for the king.

In 1492, King Ramathibodi II made the most significant additions to the complex: two large bell-shaped chedis in the Sri Lankan (Sinhalese) style to enshrine the ashes of his father and elder brother. He also commissioned the Phra Si Sanphetdayan, a massive bronze Buddha image standing 16 metres high and covered with 343 kilograms of gold. A third matching chedi was later added.

The defining catastrophe of Wat Phra Si Sanphet — and of Ayutthaya itself — came on 7 April 1767, when Burmese forces of the Konbaung dynasty sacked and burned the city after a 14-month siege. The Burmese set fire to the temple, melted the gold from the great Buddha image (destroying it in the process), and left the royal temple in ruins. Only the three chedis survived intact. The Fine Arts Department of Thailand conducted a restoration programme in 1956, stabilising the three chedis and clearing the site. UNESCO designated the Historic City of Ayutthaya as a World Heritage Site on 13 December 1991, listing Wat Phra Si Sanphet among the significant monuments.`,
    whatToSee: [
      'Three restored chedis in a row — the defining image of Ayutthaya and among the most photographed ruins in Thailand',
      'The broad royal terrace platform on which the chedis stand, giving a sense of the original temple scale',
      'Brick foundations of the main viharn (worship hall) and other temple buildings destroyed in 1767',
      'The adjacent Viharn Phra Mongkhon Bophit — an active temple housing a 17-metre bronze Buddha image',
      'Views across the entire Ayutthaya Historical Park from the elevated temple grounds',
      'Morning light on the chedis (before 9am) is considered the best time for photography'
    ],
    practicalInfo: {
      gettingThere:
        'Ayutthaya is 80 km north of Bangkok. Train from Hua Lamphong or Bang Sue station: approximately 1.5 hours, from 20 THB. Minivan from Mo Chit: approximately 70 THB. Within Ayutthaya, hire a tuk-tuk for temple-hopping (approx. 200–400 THB for a half-day circuit), or rent a bicycle (30–80 THB/day).',
      dresscode:
        'Shoulders and knees covered recommended; required if entering any active shrine areas. The ruins themselves are open-air and dress code is less strictly enforced at the archaeological site.',
      timeNeeded:
        '30–45 minutes for Wat Phra Si Sanphet alone. Most visitors combine it with Viharn Phra Mongkhon Bophit next door and plan a half-day for the full Historical Park.'
    },
    keyFacts: [
      'Royal chapel of Ayutthaya — reserved exclusively for the royal family',
      'Founded on royal palace grounds, consecrated 1448 CE by King Borommatrailokkanat',
      '16-metre bronze Buddha covered in 343 kg of gold (destroyed by Burmese in 1767)',
      'Burmese sack of Ayutthaya: 7 April 1767',
      'Three surviving chedis restored by Fine Arts Department in 1956',
      'Part of UNESCO World Heritage Site: Historic City of Ayutthaya (inscribed 1991)'
    ],
    unescoStatus: 'UNESCO World Heritage Site — Historic City of Ayutthaya (inscribed 13 December 1991)',
    sourcesNote:
      'Facts verified against Wikipedia (Wat Phra Si Sanphet), UNESCO WHC list 576, and ayutthaya-history.com.',
    googleMapsQuery: 'Wat Phra Si Sanphet Ayutthaya Thailand'
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 8. WAT MAHATHAT — Ayutthaya (Buddha head in tree roots)
  // Source: Wikipedia / Atlas Obscura / Culture Trip / thaizer.com
  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'wat-mahathat-ayutthaya',
    officialNameThai: 'วัดมหาธาตุ',
    officialNameEnglish: 'Wat Mahathat (Ayutthaya)',
    city: 'Ayutthaya',
    citySlug: 'ayutthaya',
    region: 'Central Thailand',
    founded:
      'c. 1374 CE during the reign of King Borommaracha I; expanded by King Ramesuan (r. 1388–1395)',
    architecturalStyle:
      'Ayutthaya period; Khmer-influenced central prang; later additions in Sri Lankan style',
    entryFee: '50 THB',
    openingHours: '7:30am–5:30pm daily',
    headline:
      'Ayutthaya\'s most celebrated ruin — home to the famous sandstone Buddha head entwined in the roots of a bodhi tree, a haunting image that has become one of the most recognisable in all of Thailand.',
    historicalBackground: `Wat Mahathat ("Temple of the Great Relic") was one of the most important temples in the Ayutthaya Kingdom, believed to have been founded around 1374 CE during the reign of King Borommaracha I and subsequently expanded by King Ramesuan. As a "Mahathat" temple — a designation given to temples enshrining an important relic of the Buddha — it occupied a ceremonially prominent position within the city and its central Khmer-style prang was one of the most imposing structures in Ayutthaya.

Ayutthaya, founded in 1350, grew to become one of the largest cities in the world, with an estimated population of one million people at its height in the 17th century. When the Burmese Konbaung army captured and burned the city in 1767, they systematically decapitated and defaced Buddha images throughout the temple complex, including those at Wat Mahathat, in a deliberate act designed to destroy the spiritual and cultural prestige of the Siamese enemy.

The famous sandstone Buddha head now embedded in tree roots is believed to have been among the statues decapitated in that destruction. How exactly the head came to be entwined in the roots of a fig tree (Ficus species, often identified as bodhi tree) remains genuinely unknown. The most widely accepted explanation is that the head lay on the ground for decades as the temple was abandoned and overgrown, and the tree simply grew around it. Another documented account suggests that restoration workers in the late 1960s moved the head during clearance work, and the tree's aerial roots gradually engulfed it over subsequent decades. The Buddha head has been in its current position, confirmed by documentary evidence, for at least 50 years. In March 2026, a replica installation in Cambodia reignited international discussion about the image's cultural uniqueness.`,
    whatToSee: [
      'The sandstone Buddha head in tree roots — the single most photographed object in the Ayutthaya Historical Park',
      'The ruined central prang (approximately 44m remains), stripped of its outer stucco after the 1767 destruction',
      'Brick ruins of the main viharn, ordination hall, and surrounding courtyard — all extensive',
      'Multiple headless and damaged Buddha images throughout the site, some partially buried',
      'Galleries of laterite columns that once supported covered walkways',
      'Mound of the central crypt, reportedly containing a gold casket discovered during archaeological excavations'
    ],
    practicalInfo: {
      gettingThere:
        'Centrally located on Chikun Road in the Ayutthaya Historical Park, within easy bicycle or tuk-tuk distance of Wat Phra Si Sanphet. From Bangkok: train or minivan to Ayutthaya (approx. 1.5 hours), then tuk-tuk or bicycle.',
      dresscode:
        'Shoes should be removed when entering any active shrine area. The archaeological ruins are open-air; standard temple dress codes apply for active areas.',
      timeNeeded:
        '45 minutes to 1 hour. Most visitors combine with Wat Phra Si Sanphet and Viharn Phra Mongkhon Bophit nearby.'
    },
    keyFacts: [
      'Founded c. 1374 CE by King Borommaracha I of Ayutthaya',
      'Mahathat designation = temple enshrining a major Buddha relic',
      'Destroyed by Burmese forces, 7 April 1767',
      'Famous sandstone Buddha head embedded in fig tree roots — in situ at least 50 years',
      'Part of UNESCO World Heritage Site: Historic City of Ayutthaya (inscribed 1991)',
      'Visitors must sit or kneel when photographing the Buddha head (signs posted)'
    ],
    unescoStatus: 'UNESCO World Heritage Site — Historic City of Ayutthaya (inscribed 13 December 1991)',
    sourcesNote:
      'Facts verified against Wikipedia (Wat Mahathat, Ayutthaya), Atlas Obscura, and Culture Trip.',
    googleMapsQuery: 'Wat Mahathat Ayutthaya Thailand Buddha head tree roots'
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 9. WAT PHRA THAT PHANOM — Nakhon Phanom, Isan
  // Source: Wikipedia / UNESCO Tentative List / thaiimpact.com
  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'wat-phra-that-phanom',
    officialNameThai: 'วัดพระธาตุพนมวรมหาวิหาร',
    officialNameEnglish: 'Wat Phra That Phanom Woramahawihan',
    city: 'That Phanom',
    citySlug: 'nakhon-phanom',
    region: 'Northeast Thailand (Isan)',
    founded:
      'Archaeological evidence dates the earliest structure to the 7th–8th century CE; traditional legend places its founding at 525 BCE',
    architecturalStyle:
      'Lao-style Buddhist stupa (that); rebuilt and modified across multiple centuries; current form dates to the 1975 reconstruction',
    entryFee: 'Free (donations accepted)',
    openingHours: '6:00am–8:00pm daily',
    headline:
      'The most sacred Buddhist site in Isan and one of the most venerated stupas in mainland Southeast Asia — a royal first-class temple believed to enshrine the breastbones of the historical Buddha.',
    historicalBackground: `Wat Phra That Phanom stands on the west bank of the Mekong River in That Phanom district, Nakhon Phanom province, directly facing Laos. It is the most revered Buddhist site in northeastern Thailand (Isan) and draws pilgrims from both Thailand and Laos throughout the year, with the annual That Phanom Festival — held over nine days in January/February — attracting hundreds of thousands of devotees.

The sacred object at the centre of the temple is the Phra That Phanom stupa, believed to contain Phra Uranghathat — the breastbones of the historical Buddha. According to local chronicles, the relics were brought from India and placed in a clay stupa by the monk Mahakasyapa and 500 arhats approximately 8 days after the Buddha's death, on the site then known as Phu Kampra. Archaeological excavations have confirmed structural evidence dating to the 7th–8th century CE, making this one of the most ancient active religious sites in Thailand.

Over subsequent centuries, the stupa was modified and heightened by successive rulers of the various Lao, Lanna, and Thai kingdoms that controlled the region. In 1942, the temple was formally designated a royal first-class temple of the first order by King Ananda Mahidol. The stupa's sacred water is used in the coronation ceremonies of Thai monarchs — a tradition reportedly extending back to King Rama VI.

The defining event of modern times came in August 1975, when the ancient brick base of the stupa — weakened by centuries of rainy-season flooding — collapsed after a week of continuous heavy rain, bringing down the entire upper structure. Excavation of the debris uncovered a bronze casket, inside which was found a multi-layered gold container holding relics identified as the sacred breastbones. The stupa was rebuilt in its current Lao-influenced form between 1977 and 1979, reaching 53 metres in height with a golden umbrella (chattra) weighing 110 kg at the apex. The stupa was added to UNESCO's Tentative World Heritage List in 2020 as "Phra That Phanom and its related historic buildings and associated landscape."`,
    whatToSee: [
      'The 53-metre gilded Phra That Phanom stupa — circumambulate clockwise three times as a merit-making practice',
      'The golden chattra (ceremonial umbrella) at the apex, weighing 110 kg',
      'Sacred pond water used in Thai royal coronation ceremonies (adjacent to the temple)',
      'The Wihan (worship hall) housing important Lao-style Buddha images',
      'Pilgrims from both Thailand and Laos crossing the Mekong for festivals — the atmosphere during the annual fair is extraordinary',
      'The Mekong River view at the eastern boundary of the temple grounds'
    ],
    practicalInfo: {
      gettingThere:
        'That Phanom is 52 km south of Nakhon Phanom city. From Nakhon Phanom: shared songthaew or bus (30–50 THB, approx. 1 hour). From Bangkok, fly to Nakhon Phanom Airport or take a bus/train to Udon Thani and connect. Nakhon Phanom has a small domestic airport served by Nok Air.',
      dresscode:
        'Respectful dress required — shoulders and knees covered. This is a deeply active pilgrimage site and dress code is taken seriously by local worshippers.',
      timeNeeded:
        '45 minutes to 1 hour at the temple itself. The That Phanom town and Mekong river walk are worth an additional hour.'
    },
    keyFacts: [
      'Most sacred Buddhist site in Isan (northeastern Thailand)',
      'Archaeological evidence: 7th–8th century CE; legendary founding 525 BCE',
      'Royal first-class temple, first order — designated 1942',
      'Stupa collapsed in August 1975 after heavy rains; rebuilt 1977–1979',
      'Sacred relics (breastbones of the Buddha) reportedly recovered from collapsed stupa in a gold casket',
      'UNESCO Tentative World Heritage List since 2020'
    ],
    unescoStatus:
      'UNESCO Tentative World Heritage List (2020) — "Phra That Phanom and its related historic buildings and associated landscape"',
    sourcesNote:
      'Facts verified against Wikipedia (Wat Phra That Phanom), UNESCO Tentative List entry 6183, and thaiimpact.com.',
    googleMapsQuery: 'Wat Phra That Phanom Nakhon Phanom Thailand'
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 10. WAT THAM SUEA — Tiger Cave Temple, Krabi
  // Source: Wikipedia / Sofitel Krabi / deartravallure.com
  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'wat-tham-suea',
    officialNameThai: 'วัดถ้ำเสือ',
    officialNameEnglish: 'Wat Tham Suea (Tiger Cave Temple)',
    city: 'Krabi',
    citySlug: 'krabi',
    region: 'Southern Thailand',
    founded:
      '1975 CE, established by Vipassana meditation monk Ajahn Jumnean Seelasettho',
    architecturalStyle:
      'Forest monastery (arannavasi tradition); cave shrines, open-air meditation platforms, and a hilltop summit shrine',
    entryFee: 'Free (donations encouraged)',
    openingHours: '8:00am–5:00pm daily (summit); cave complex open earlier',
    headline:
      'Southern Thailand\'s most physically demanding temple — a forest monastery established in 1975 in a cave where tigers once roamed, now famous for a 1,237-step staircase leading to a golden summit Buddha with panoramic views over Krabi.',
    historicalBackground: `Wat Tham Suea was established in 1975 by Ajahn Jumnean Seelasettho, a highly respected Vipassana meditation teacher, who came to meditate in a large limestone cave north-northeast of Krabi town and found it a place of profound stillness. The cave — now known as the main meditation cave — takes its name from the tiger paw prints discovered on the cave floor, as well as a ceiling formation said to resemble the shape of a tiger's paw. Historically, tigers were known to inhabit the limestone karst forests of southern Thailand; the last confirmed wild tiger sightings in Krabi province date to the late 20th century.

Today Wat Tham Suea is a functioning forest monastery with resident monks living in kutis (meditation huts) built into the limestone outcroppings of the surrounding forest. The temple complex occupies several cave systems and a broad forested valley, with an emphasis on meditation practice rather than visual spectacle.

The feature that draws most visitors is the 1,237-step staircase rising 600 metres to the summit of the karst hill. (Recent improvements to the path have brought the step count closer to 1,260, though the older figure is still widely cited.) At the top, a large golden Buddha statue stands on a platform with 360-degree views over the Krabi River, mangrove flats, Krabi town, and on clear days, the Andaman Sea islands. The climb takes most visitors 30–45 minutes and is steep throughout — the upper section involves near-vertical concrete steps with chain handrails. The summit area also includes a large bronze statue of the revered Buddhist monk Luang Pu Supha.`,
    whatToSee: [
      'The main cave shrine with tiger paw print impressions and ceiling stalactites',
      'The 1,237-step staircase to the summit — a genuine physical challenge but rewarding',
      'Summit golden Buddha statue with 360-degree views over Krabi and the Andaman coast',
      'Resident monkeys on the staircase — hold bags firmly; they are adept thieves',
      'Forest monastery grounds with monks\' kuti huts built into limestone cliffs',
      'A large reclined Buddha image and smaller shrines in caves at the base of the hill'
    ],
    practicalInfo: {
      gettingThere:
        'Located approximately 8 km north-northeast of Krabi town. Tuk-tuk or taxi from Krabi: 80–150 THB each way. Motorbike taxi available from the town pier area. Songthaew from the main Krabi market: approximately 20–30 THB.',
      dresscode:
        'Shoulders and knees must be covered. Sturdy shoes are essential for the steep staircase — flip-flops are not advised. Bring water; there are no vendors at the summit.',
      timeNeeded:
        '2–3 hours total: allow 30–45 minutes up, 20–30 minutes at the top, and 30 minutes down. The cave complex and forest grounds take an additional 30–45 minutes.'
    },
    keyFacts: [
      'Founded 1975 by Vipassana monk Ajahn Jumnean Seelasettho',
      'Named after tiger paw prints found in the cave floor',
      '1,237 steps (recently extended to approx. 1,260) to the 600m summit',
      'Functioning forest monastery with resident monks',
      'Large golden Buddha at the summit with panoramic Andaman views',
      'Free admission; donations support the monastery community'
    ],
    unescoStatus: null,
    sourcesNote:
      'Facts verified against Wikipedia (Tiger Cave Temple), Sofitel Krabi destination guide, and deartravallure.com.',
    googleMapsQuery: 'Wat Tham Suea Tiger Cave Temple Krabi Thailand'
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// FAQ DATA — verified practical information
// ─────────────────────────────────────────────────────────────────────────────

const faqItems = [
  {
    question: 'What should I wear when visiting temples in Thailand?',
    answer:
      'All Thai temples require shoulders and knees to be fully covered. Long trousers or a skirt below the knee, and a shirt with sleeves (not sleeveless), are the minimum standard. Avoid see-through fabrics. Most major tourist temples provide sarongs or trousers for loan or rental at the entrance — but supply can run out during busy periods, so it is more reliable to dress appropriately before arriving. Shoes must be removed before entering any temple building; look for the pile of footwear at the door. At Wat Arun in Bangkok, long trousers are specifically required — not just knee-length shorts.'
  },
  {
    question: 'Which Thailand temples charge an entry fee?',
    answer:
      'Entry fees vary widely. The Grand Palace and Wat Phra Kaew charge 500 THB (one ticket covers both). Wat Pho charges 300 THB. Wat Arun charges 200 THB. The temples of the Ayutthaya Historical Park (Wat Phra Si Sanphet, Wat Mahathat, and others) charge 50 THB each or are available on a multi-site pass. Many temples in Chiang Mai — including Wat Chedi Luang — ask for a 50 THB donation. Wat Phra That Doi Suthep charges 50 THB. Wat Rong Khun (White Temple) charges 100 THB. The Tiger Cave Temple (Wat Tham Suea) in Krabi and Wat Phra That Phanom are free, with donation boxes available.'
  },
  {
    question: 'What is the best time of day to visit Thai temples?',
    answer:
      'Early morning — before 9am — is consistently the best time across all types of temples. Temperatures are cooler, crowds are smaller, and at active monasteries you may witness morning chanting and the monks\' alms-giving ritual. For the Ayutthaya ruins, morning light is excellent for photography. For Wat Arun in Bangkok, the temple looks spectacular at sunrise from the opposite bank, though the 200 THB entry and climb are best done from 8am. Late afternoon (after 3:30pm) is also good for softer light, particularly at the Chao Phraya riverside temples. Avoid midday at outdoor sites like Ayutthaya — temperatures regularly exceed 38°C from March to May.'
  },
  {
    question: 'Which temples in Thailand are UNESCO World Heritage Sites?',
    answer:
      'The Historic City of Ayutthaya was inscribed as a UNESCO World Heritage Site on 13 December 1991 (WHC reference 576). This designation covers all temples within the Ayutthaya Historical Park, including Wat Phra Si Sanphet and Wat Mahathat. Wat Phra That Phanom in Nakhon Phanom is on UNESCO\'s Tentative World Heritage List, submitted by Thailand in 2020. Wat Pho in Bangkok holds a different UNESCO distinction — its inscriptions on traditional Thai medicine and massage are listed in the UNESCO Memory of the World Register (2008). Wat Phra Kaew and the Grand Palace are considered for future World Heritage listing but have not yet been inscribed.'
  },
  {
    question: 'How do I get from Bangkok to the Ayutthaya temples?',
    answer:
      'Ayutthaya is 80 km north of Bangkok and one of the easiest day trips in Thailand. The fastest option is the State Railway of Thailand commuter train from Bang Sue Grand Station (formerly Hua Lamphong): approximately 1.5 hours, with trains every 30–60 minutes, from around 20 THB. Air-conditioned minivans depart from Bangkok\'s Mo Chit Terminal (Chatuchak area) for approximately 70 THB and take about 1.5 hours. Within Ayutthaya, the most efficient way to see multiple temples is by bicycle (rented from guesthouses for 30–80 THB per day) or tuk-tuk (negotiate a half-day rate of 200–400 THB). Most major temples are clustered on the island and within 2–3 km of each other.'
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// PRACTICAL ETIQUETTE TIPS
// ─────────────────────────────────────────────────────────────────────────────

const etiquetteTips = [
  'Cover shoulders and knees before arrival — sarong loans are available at major temples, but supply is finite during peak hours.',
  'Remove shoes before entering any building. Place them neatly to the side; avoid stepping over them.',
  'Walk clockwise around chedis and stupas — this is the traditional circumambulation direction in Theravada Buddhist practice.',
  'Women may not touch or hand objects directly to monks. If offering something, place it on a cloth or surface in front of the monk.',
  'Sit with feet pointing away from Buddha images and the altar — pointing feet toward sacred objects is considered deeply disrespectful.',
  'Keep voices low inside halls and meditation spaces. This applies even when the hall appears empty.',
  'Do not turn your back to a Buddha image for photographs — face the image and step backward if repositioning.',
  'At active pilgrimage sites like Wat Phra That Phanom or Doi Suthep, be aware that you are in a space that is religiously significant, not merely a visitor attraction.',
  'Buddha images — including those sold in markets — should not be purchased as souvenirs for decorative use. Thailand enforces export restrictions on Buddha images; purchasing from legitimate dealers requires documentation.',
  'Respectful behaviour includes observing what local worshippers do. If they remove their shoes 20 metres from the entrance rather than at the door, follow their lead.'
];

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function ThailandTemples({ data }: ThailandTemplesProps) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const [activeFilter, setActiveFilter] = useState<CityFilter>('all');

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Thailand Tempels' : 'Thailand Temples', href: '/thailand-temples/' }
  ];

  const filterLabels: Record<CityFilter, string> = {
    all: isNl ? 'Alle Tempels' : 'All Temples',
    bangkok: 'Bangkok',
    'chiang-mai': 'Chiang Mai',
    'chiang-rai': 'Chiang Rai',
    ayutthaya: 'Ayutthaya',
    other: isNl ? 'Andere Regio\'s' : 'Other Regions'
  };

  const bangkokSlugs = ['wat-phra-kaew', 'wat-pho', 'wat-arun'];
  const chiangMaiSlugs = ['wat-phra-that-doi-suthep', 'wat-chedi-luang'];
  const chiangRaiSlugs = ['wat-rong-khun'];
  const ayutthayaSlugs = ['wat-phra-si-sanphet', 'wat-mahathat-ayutthaya'];
  const otherSlugs = ['wat-phra-that-phanom', 'wat-tham-suea'];

  const filterProfiles = (profiles: TempleProfile[]): TempleProfile[] => {
    if (activeFilter === 'all') return profiles;
    if (activeFilter === 'bangkok') return profiles.filter(p => bangkokSlugs.includes(p.slug));
    if (activeFilter === 'chiang-mai') return profiles.filter(p => chiangMaiSlugs.includes(p.slug));
    if (activeFilter === 'chiang-rai') return profiles.filter(p => chiangRaiSlugs.includes(p.slug));
    if (activeFilter === 'ayutthaya') return profiles.filter(p => ayutthayaSlugs.includes(p.slug));
    if (activeFilter === 'other') return profiles.filter(p => otherSlugs.includes(p.slug));
    return profiles;
  };

  const filteredProfiles = filterProfiles(templeProfiles);

  // Schema data uses both editorial profiles and data from JSON (for any additional temples)
  const uniqueCities = Array.from(new Set(templeProfiles.map(p => p.city)));

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Thailand Temples — 10 Most Important Sacred Sites',
    numberOfItems: templeProfiles.length,
    itemListElement: templeProfiles.map((profile, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: profile.officialNameEnglish,
      url: `https://go2-thailand.com/thailand-temples/#${profile.slug}`
    }))
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://go2-thailand.com${item.href}`
    }))
  };

  const combinedSchema = [itemListSchema, faqSchema, breadcrumbSchema];

  return (
    <>
      <SEOHead
        title="Thailand Temples — 10 Sacred Sites with Verified History (2026 Guide)"
        description="Source-backed guide to Thailand's 10 most important temples: Wat Phra Kaew, Wat Pho, Wat Arun, Doi Suthep, White Temple, and more. Official names, real founding dates, architectural details, and practical visitor information."
      >
        <meta
          name="keywords"
          content="Thailand temples, Wat Phra Kaew, Wat Pho, Wat Arun, Doi Suthep, White Temple Chiang Rai, Ayutthaya temples, UNESCO Thailand, Thai temple etiquette, Buddhist temples Thailand"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">

        {/* ─── Hero ─── */}
        <section className="bg-surface-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center">
              <p className="font-script text-thailand-gold text-lg mb-2">
                {isNl ? 'Heilige Plaatsen van Thailand' : 'Sacred Sites of Thailand'}
              </p>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
                {isNl ? 'Thailand Tempels' : 'Thailand Temples'}
              </h1>
              <p className="text-xl lg:text-2xl mb-6 max-w-3xl mx-auto opacity-90">
                {isNl
                  ? '10 belangrijkste boeddhistische tempels — met geverifieerde historische data, architecturale context en praktische bezoekersinformatie'
                  : '10 most important Buddhist temples — with verified historical dates, architectural context, and practical visitor information'}
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm font-medium opacity-80">
                <span className="bg-white/20 px-4 py-2 rounded-full">
                  {isNl ? `${templeProfiles.length} tempels behandeld` : `${templeProfiles.length} temples covered`}
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full">
                  {isNl ? `${uniqueCities.length} regio's` : `${uniqueCities.length} regions`}
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full">
                  {isNl ? '2 UNESCO Werelderfgoedsites' : '2 UNESCO World Heritage Sites'}
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full">
                  {isNl ? 'Bijgewerkt maart 2026' : 'Updated March 2026'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Breadcrumbs ─── */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        </section>

        {/* ─── Editorial Introduction ─── */}
        <section className="bg-white py-10 border-b">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-5">
              Thailand has approximately 40,000 Buddhist temples (wat), ranging from village shrines to national monuments that define the country&#39;s cultural identity. This guide covers the ten temples that carry the most historical, architectural, and religious significance — verified against academic and official sources including UNESCO, Wikipedia (with cross-checked citations), and specialist heritage databases.
            </p>
            <p className="text-gray-700 leading-relaxed mb-5">
              The temples span fourteen centuries of history: from the 7th–8th century foundations of Wat Phra That Phanom in Isan to the deliberately contemporary White Temple in Chiang Rai, still under construction by its artist-creator. Two sites — Wat Phra Si Sanphet and Wat Mahathat in Ayutthaya — are part of a UNESCO World Heritage Site inscribed in 1991. A third, Wat Phra That Phanom, is on UNESCO&#39;s Tentative List.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Each entry includes the official Thai and English name, verified founding date, architectural style, what specifically to look for during a visit, practical visitor information, and a note on the sources used to verify the facts presented.
            </p>
          </div>
        </section>

        {/* ─── Filter Buttons ─── */}
        <section className="bg-white border-b sticky top-0 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
              {(Object.keys(filterLabels) as CityFilter[]).map(category => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    activeFilter === category
                      ? 'bg-thailand-blue text-white'
                      : 'bg-surface-cream text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filterLabels[category]}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Temple Profiles ─── */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredProfiles.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <p className="text-xl">{isNl ? 'Geen tempels gevonden voor dit filter.' : 'No temples found for this filter.'}</p>
              </div>
            ) : (
              <div className="space-y-16">
                {filteredProfiles.map((profile, index) => (
                  <div key={profile.slug} id={profile.slug}>
                    <article className="bg-white rounded-2xl shadow-md overflow-hidden">

                      {/* ── Temple Header ── */}
                      <div className="bg-surface-dark text-white px-6 py-5">
                        <div className="flex items-start gap-4">
                          <div className="bg-thailand-gold text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg flex-shrink-0 mt-0.5">
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-thailand-gold font-medium mb-1 opacity-90">
                              {profile.officialNameThai}
                            </p>
                            <h2 className="text-xl md:text-2xl font-bold font-heading leading-tight">
                              {profile.officialNameEnglish}
                            </h2>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-sm opacity-80">
                              <Link
                                href={`/city/${profile.citySlug}/`}
                                className="hover:text-thailand-gold transition-colors"
                              >
                                {profile.city}
                              </Link>
                              <span>&#183;</span>
                              <span>{profile.region}</span>
                              <span>&#183;</span>
                              <span>{profile.architecturalStyle}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6">

                        {/* ── Headline ── */}
                        <p className="text-base font-semibold text-gray-800 mb-5 leading-relaxed border-l-4 border-thailand-gold pl-4">
                          {profile.headline}
                        </p>

                        {/* ── Quick Facts Bar ── */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                          <div className="bg-surface-cream rounded-lg p-3">
                            <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">{isNl ? 'Gesticht' : 'Founded'}</p>
                            <p className="text-sm text-gray-800 font-semibold leading-tight">{profile.founded}</p>
                          </div>
                          <div className="bg-surface-cream rounded-lg p-3">
                            <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">{isNl ? 'Entree' : 'Entry Fee'}</p>
                            <p className="text-sm text-gray-800 font-semibold">{profile.entryFee}</p>
                          </div>
                          <div className="bg-surface-cream rounded-lg p-3">
                            <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">{isNl ? 'Openingstijden' : 'Opening Hours'}</p>
                            <p className="text-sm text-gray-800 font-semibold">{profile.openingHours}</p>
                          </div>
                          <div className="bg-surface-cream rounded-lg p-3">
                            <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">{isNl ? 'Tijd Nodig' : 'Time Needed'}</p>
                            <p className="text-sm text-gray-800 font-semibold">{profile.practicalInfo.timeNeeded}</p>
                          </div>
                        </div>

                        {/* ── UNESCO badge ── */}
                        {profile.unescoStatus && (
                          <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mb-6">
                            <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <p className="text-sm text-blue-800 font-medium">{profile.unescoStatus}</p>
                          </div>
                        )}

                        {/* ── Historical Background ── */}
                        <h3 className="text-lg font-bold font-heading text-gray-900 mb-3">{isNl ? 'Historische Achtergrond' : 'Historical Background'}</h3>
                        <div className="text-gray-700 leading-relaxed mb-6 space-y-3">
                          {profile.historicalBackground.split('\n\n').map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                          ))}
                        </div>

                        {/* ── What to See ── */}
                        <h3 className="text-lg font-bold font-heading text-gray-900 mb-3">{isNl ? 'Wat te Zien' : 'What to See'}</h3>
                        <ul className="space-y-2 mb-6">
                          {profile.whatToSee.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-700 text-sm leading-relaxed">
                              <span className="text-thailand-gold font-bold flex-shrink-0 mt-0.5">&#8250;</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                        {/* ── Key Facts Tags ── */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {profile.keyFacts.map(fact => (
                            <span
                              key={fact}
                              className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                            >
                              {fact}
                            </span>
                          ))}
                        </div>

                        {/* ── Practical Information ── */}
                        <div className="bg-surface-cream rounded-xl p-5 mb-5">
                          <h3 className="text-base font-bold font-heading text-gray-900 mb-3">{isNl ? 'Praktische Informatie' : 'Practical Information'}</h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{isNl ? 'Hoe er te komen' : 'Getting There'}</p>
                              <p className="text-sm text-gray-700 leading-relaxed">{profile.practicalInfo.gettingThere}</p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{isNl ? 'Kledingvoorschrift' : 'Dress Code'}</p>
                              <p className="text-sm text-gray-700 leading-relaxed">{profile.practicalInfo.dresscode}</p>
                            </div>
                          </div>
                        </div>

                        {/* ── Source Attribution ── */}
                        <p className="text-xs text-gray-400 italic border-t border-gray-100 pt-3">
                          {profile.sourcesNote}
                        </p>

                        {/* ── Google Maps Link ── */}
                        <div className="mt-4">
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(profile.googleMapsQuery)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-thailand-blue hover:underline font-medium"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            {isNl ? 'Bekijk op Google Maps' : 'View on Google Maps'}
                          </a>
                        </div>
                      </div>
                    </article>

                    {/* Mid-list hotel widget after temple 5 */}
                    {index === 4 && (
                      <div className="my-8">
                        <TripcomWidget
                          city="Thailand"
                          type="searchbox"
                          customTitle="Find Hotels Near Thailand&#39;s Best Temples"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ─── Temple Etiquette ─── */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label text-center">{isNl ? 'Goed om te Weten' : 'Good to Know'}</p>
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4 text-center">
              {isNl ? 'Tempeletiquette in Thailand' : 'Temple Etiquette in Thailand'}
            </h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              {isNl
                ? 'Thaise boeddhistische tempels zijn actieve gebedsplaatsen, geen musea. Deze gewoonten weerspiegelen hoe lokale bezoekers zich gedragen — volg ze en je bent overal welkom.'
                : 'Thai Buddhist temples are active places of worship, not museums. These practices reflect how local visitors behave — observe them and you will be welcomed wherever you go.'}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {etiquetteTips.map((tip, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-surface-cream rounded-xl p-4"
                >
                  <span className="text-thailand-gold font-bold text-lg flex-shrink-0 mt-0.5">
                    {i + 1}.
                  </span>
                  <p className="text-gray-700 text-sm leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Regional Temple Context ─── */}
        <section className="py-12 bg-surface-cream">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label text-center">{isNl ? 'Regionale Context' : 'Regional Context'}</p>
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6 text-center">
              {isNl ? 'Thailand\'s Tempelregio\'s' : 'Thailand\u0027s Temple Regions'}
            </h2>
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">Bangkok — The Rattanakosin Core</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Bangkok&#39;s most historically significant temples cluster on Ko Ratanakosin, the original island settled by Rama I in 1782. Wat Phra Kaew, Wat Pho, and Wat Arun — all within 1.5 km of each other — represent the foundational sacred architecture of the Chakri dynasty. The Grand Palace area is the most visited tourist zone in Thailand; arrive before 8:30am to experience it without crowds.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">Chiang Mai — Capital of the Lanna Kingdom</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Chiang Mai was founded in 1296 CE as the capital of the Lanna Kingdom and served that role for nearly 300 years before Burmese conquest in 1558. The city&#39;s old town (within the square moat) still contains over 30 temples, the most architecturally important of which is Wat Chedi Luang. Doi Suthep, visible above the city, has been its defining sacred mountain since 1383 CE. Lanna Buddhist architecture is distinct from Bangkok&#39;s Rattanakosin style — characterised by low, wide wooden viharns with multi-tiered roofs.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">Ayutthaya — The Destroyed Royal Capital</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Ayutthaya was the capital of the Kingdom of Siam from 1350 to 1767 CE — a period of 417 years. At its height in the 17th century, it was one of the largest cities in the world and a major international trading port. The Burmese destruction of April 1767 was total and deliberate; the city was never reoccupied as a capital. The ruins that remain are managed as the Ayutthaya Historical Park, designated a UNESCO World Heritage Site in 1991. The distinctive prang towers (Khmer-influenced) and the scattered headless Buddha images are the defining visual legacy of this era.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">Isan and the South — Beyond the Tourist Trail</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Northeastern Thailand (Isan) and the south hold temples of profound importance that receive far fewer foreign visitors. Wat Phra That Phanom in Nakhon Phanom — on the Mekong River near the Lao border — is arguably the most spiritually significant Buddhist site in all of Isan, with structural evidence dating to the 7th century CE. The Tiger Cave Temple in Krabi represents the forest monastery (arannavasi) tradition of southern Thai Buddhism, emphasising meditation practice in natural settings rather than architectural spectacle.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQ Section ─── */}
        <section className="py-12 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label text-center">FAQ</p>
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
              {isNl ? 'Veelgestelde Vragen' : 'Frequently Asked Questions'}
            </h2>
            <div className="space-y-4">
              {faqItems.map((item, i) => (
                <details
                  key={i}
                  className="mb-4 bg-surface-cream rounded-xl shadow-sm group"
                >
                  <summary className="p-5 font-semibold cursor-pointer hover:bg-gray-100 rounded-xl list-none flex items-center justify-between transition-colors">
                    <span className="text-gray-900">{item.question}</span>
                    <svg
                      className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0 ml-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-gray-700 leading-relaxed text-sm">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Hotel Search CTA ─── */}
        <section className="bg-surface-dark py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white mb-8">
              <p className="font-script text-thailand-gold text-lg mb-2">
                {isNl ? 'Plan Je Bezoek' : 'Plan Your Visit'}
              </p>
              <h2 className="text-3xl font-bold font-heading mb-3">
                {isNl ? 'Vind Hotels bij Thailand\'s Tempels' : 'Find Hotels Near Thailand\u0027s Temples'}
              </h2>
              <p className="text-lg opacity-90">
                {isNl ? 'Dicht bij de tempelwijken verblijven maakt vroege ochtendbezoeken veel makkelijker' : 'Staying close to the temple districts makes early-morning visits far easier'}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-start max-w-4xl mx-auto">
              <TripcomWidget
                city="Bangkok"
                type="searchbox"
                customTitle="Hotels Near Bangkok Temples (Ko Ratanakosin)"
              />
              <TripcomWidget
                city="Chiang Mai"
                type="searchbox"
                customTitle="Hotels in Chiang Mai Old City"
              />
            </div>
            <p className="text-white/50 text-xs text-center mt-6">
              Hotel search powered by Trip.com.
            </p>
          </div>
        </section>

        {/* ─── Related Pages ─── */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label text-center">{isNl ? 'Meer Gidsen' : 'More Guides'}</p>
            <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6 text-center">
              {isNl ? 'Gerelateerde Pagina\'s' : 'Related Pages'}
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link
                href="/city/bangkok/"
                className="group block bg-white rounded-2xl p-6 border-0 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="text-3xl mb-3">&#127751;</div>
                <h3 className="text-lg font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors mb-2">
                  {isNl ? 'Bangkok Stadsgids' : 'Bangkok City Guide'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {isNl ? 'Complete gids voor Bangkok inclusief Wat Phra Kaew, Wat Pho, Wat Arun en het omliggende Rattanakosin-district.' : 'Complete guide to Bangkok including Wat Phra Kaew, Wat Pho, Wat Arun, and the surrounding Rattanakosin district.'}
                </p>
                <span className="inline-block mt-3 text-thailand-blue text-sm font-medium group-hover:underline">
                  {isNl ? 'Ontdek Bangkok' : 'Explore Bangkok'} &#8594;
                </span>
              </Link>

              <Link
                href="/city/chiang-mai/"
                className="group block bg-white rounded-2xl p-6 border-0 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="text-3xl mb-3">&#9968;</div>
                <h3 className="text-lg font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors mb-2">
                  {isNl ? 'Chiang Mai Stadsgids' : 'Chiang Mai City Guide'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {isNl ? 'De oude Lanna-hoofdstad — met Doi Suthep, Wat Chedi Luang en meer dan 30 tempels binnen de oude stadsgracht.' : 'The ancient Lanna capital \u2014 home to Doi Suthep, Wat Chedi Luang, and over 30 temples within the old city moat.'}
                </p>
                <span className="inline-block mt-3 text-thailand-blue text-sm font-medium group-hover:underline">
                  {isNl ? 'Ontdek Chiang Mai' : 'Explore Chiang Mai'} &#8594;
                </span>
              </Link>

              <Link
                href="/thailand-travel-guide/"
                className="group block bg-white rounded-2xl p-6 border-0 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="text-3xl mb-3">&#127988;</div>
                <h3 className="text-lg font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors mb-2">
                  {isNl ? 'Thailand Reisgids' : 'Thailand Travel Guide'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {isNl ? 'Alles wat je nodig hebt voor je reis — visa, vervoer, kosten, seizoenen en wat te verwachten.' : 'Everything you need before your trip \u2014 visas, transport, costs, seasons, and what to expect.'}
                </p>
                <span className="inline-block mt-3 text-thailand-blue text-sm font-medium group-hover:underline">
                  {isNl ? 'Lees de gids' : 'Read the guide'} &#8594;
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA FETCHING — data prop still available for any future dynamic extensions
// ─────────────────────────────────────────────────────────────────────────────

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const fs = require('fs');
  const path = require('path');
  const lang = locale || 'en';

  // Try locale-specific file first, fall back to English
  const localePath = path.join(process.cwd(), 'data', `temples.${lang}.json`);
  const defaultPath = path.join(process.cwd(), 'data', 'temples.json');
  const dataPath = lang !== 'en' && fs.existsSync(localePath) ? localePath : defaultPath;

  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  return {
    props: { data },
    revalidate: 604800
  };
};
