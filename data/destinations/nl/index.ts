import type { DestinationGuideData } from '../types';
import { bangkokDestinationGuide } from './bangkok';
import { chiangMaiDestinationGuide } from './chiang-mai';
import { phuketDestinationGuide } from './phuket';
import { kohSamuiDestinationGuide } from './koh-samui';
import { khaoSokDestinationGuide } from './khao-sok';
import { ayutthayaDestinationGuide } from './ayutthaya';
import { chiangRaiDestinationGuide } from './chiang-rai';
import { paiDestinationGuide } from './pai';
import { pattayaDestinationGuide } from './pattaya';
import { huaHinDestinationGuide } from './hua-hin';
import { chumphonDestinationGuide } from './chumphon';

export const destinationIndexNl = {
  seo: {
    title: 'Bestemmingen Thailand: kies de plek die bij je reis past',
    description: 'Vergelijk de mooiste bestemmingen van Thailand op reisstijl, regio en praktische trade-offs. Van Bangkok en Chiang Mai tot Krabi, Phuket en de eilanden.',
  },
  hero: {
    eyebrow: 'Niet meer plekken, maar betere keuzes',
    title: 'Thailand.',
    accent: 'Waar begin je?',
    intro: 'Thailand verandert per regio, tempo en seizoen. Deze gids helpt je eerst kiezen wat voor reis je wilt maken en daarna pas welke plaatsen daarbij passen.',
  },
  featured: [
    { slug: 'bangkok', name: 'Bangkok', kicker: 'Stad & eten', image: '/images/redesign/destination-bangkok.webp', alt: 'Tempels en skyline van Bangkok', summary: 'Een gelaagde hoofdstad voor tempels, streetfood, markten en hedendaags stadsleven.', bestFor: 'Een eerste of laatste reisblok met veel contrast.', tradeoff: 'Hitte, verkeer en schaal vragen om buurten per dag.' },
    { slug: 'chiang-mai', name: 'Chiang Mai', kicker: 'Cultuur & bergen', image: '/images/redesign/destination-chiang-mai.webp', alt: 'Tempel in Chiang Mai', summary: 'Tempels, markten, koffie en toegang tot de groene bergen van Noord-Thailand.', bestFor: 'Rustiger stadstempo en dagtochten naar natuur.', tradeoff: 'Controleer luchtkwaliteit tijdens het brandseizoen.' },
    { slug: 'krabi', name: 'Krabi', kicker: 'Karst & eilanden', image: '/images/redesign/krabi-destination-hero.webp', alt: 'Longtailboot tussen de kalksteenrotsen van Krabi', summary: 'Kalksteenkliffen, Railay, eilandroutes en een praktische kustbasis rond Ao Nang.', bestFor: 'Een eerste Andaman-reis met natuur en boten.', tradeoff: 'Veel bekende plekken vragen dezelfde soort bootdag.' },
    { slug: 'phuket', name: 'Phuket', kicker: 'Strand & keuze', image: '/images/redesign/phuket-destination-hero-v2.webp', alt: 'Phuket Old Town en de kust', summary: 'Een groot eiland met verschillende kustzones, Old Town, veel hotels en sterke dagtrips.', bestFor: 'Reizigers die gemak met veel variatie willen.', tradeoff: 'Verkeer en afstanden maken de gebiedskeuze belangrijk.' },
    { slug: 'koh-samui', name: 'Koh Samui', kicker: 'Resort & eilandritme', image: '/images/redesign/destination-koh-samui.webp', alt: 'Tropische kust van Koh Samui', summary: 'Een toegankelijke Golf-eilandbasis met stranden, resorts en uitstappen naar Ang Thong.', bestFor: 'Comfort, stellen en langere eilandverblijven.', tradeoff: 'Vluchten en populaire kustzones kunnen duurder zijn.' },
    { slug: 'ayutthaya', name: 'Ayutthaya', kicker: 'Geschiedenis', image: '/images/redesign/experience-ayutthaya.webp', alt: 'Historische tempels van Ayutthaya', summary: 'Tempelruïnes en koninklijke geschiedenis op korte reisafstand van Bangkok.', bestFor: 'Een cultuurdag of rustige overnachting.', tradeoff: 'De warmte en afstanden maken een realistische route nodig.' },
    { slug: 'kanchanaburi', name: 'Kanchanaburi', kicker: 'Rivier & natuur', image: '/images/cities/generated/kanchanaburi.webp', alt: 'Rivierlandschap bij Kanchanaburi', summary: 'Riviergeschiedenis, nationale parken en een andere kant van Centraal-Thailand.', bestFor: 'Natuur en geschiedenis buiten de hoofdstad.', tradeoff: 'Bezienswaardigheden liggen verspreid over de provincie.' },
    { slug: 'sukhothai', name: 'Sukhothai', kicker: 'Tempels & stilte', image: '/images/cities/generated/sukhothai.webp', alt: 'Historisch park van Sukhothai', summary: 'Een overzichtelijk historisch park dat zich goed per fiets en in rustig tempo laat ontdekken.', bestFor: 'Erfgoed zonder de drukte van een grote stad.', tradeoff: 'De ligging vraagt een bewuste tussenstop in je route.' },
    { slug: 'pai', name: 'Pai', kicker: 'Bergen & langzaam reizen', image: '/images/cities/generated/pai.webp', alt: 'Groen berglandschap rond Pai', summary: 'Een kleine noordelijke basis voor uitzichtpunten, warmwaterbronnen en ontspannen dagen.', bestFor: 'Langzaam reizen en berglandschap.', tradeoff: 'De bochtige weg vanuit Chiang Mai is niet voor iedereen prettig.' },
    { slug: 'koh-lanta', name: 'Koh Lanta', kicker: 'Rustig eiland', image: '/images/islands/koh-lanta.webp', alt: 'Strand en groene kust van Koh Lanta', summary: 'Een langgerekt eiland met rustigere stranden, dorpen en ruimte voor een langer verblijf.', bestFor: 'Gezinnen, stellen en reizigers die minder drukte zoeken.', tradeoff: 'Buiten het droge seizoen zijn bootroutes en kleinere eilanden beperkter.' },
    { slug: 'khao-sok', name: 'Khao Sok', kicker: 'Jungle & kalksteen', image: '/images/redesign/khao-sok-destination-hero.webp', alt: 'Longtailboot op Cheow Lan Lake tussen kalksteenbergen', summary: 'Tropisch regenwoud, rivieractiviteiten en Cheow Lan Lake als natuurblok tussen beide Thaise kusten.', bestFor: 'Jungle, bootdagen en een bijzondere overnachting op het water.', tradeoff: 'Khlong Sok en de meerpier liggen ver uit elkaar; de routevolgorde bepaalt hoeveel je rijdt.' },
  ],
  styles: [
    { id: 'eerste-keer', title: 'Eerste keer Thailand', description: 'Combineer een stad, een cultureel noorden en één kustbasis. Dat geeft contrast zonder iedere twee dagen te verhuizen.', links: ['Bangkok', 'Chiang Mai', 'Krabi of Phuket'] },
    { id: 'strand', title: 'Strand & eilanden', description: 'Kies eerst tussen Andamanse Zee en Golf van Thailand, daarna pas het eiland of kustgebied dat bij je seizoen past.', links: ['Krabi', 'Phuket', 'Koh Samui', 'Koh Lanta'] },
    { id: 'cultuur', title: 'Cultuur & geschiedenis', description: 'Tempelsteden en oude hoofdsteden werken beter als volwaardige reisblokken dan als een eindeloze rij dagtrips.', links: ['Bangkok', 'Ayutthaya', 'Sukhothai', 'Chiang Mai'] },
    { id: 'rust', title: 'Rustiger reizen', description: 'Kies minder bases, langere verblijven en plekken waar het landschap of lokale ritme belangrijker is dan een checklist.', links: ['Koh Lanta', 'Pai', 'Kanchanaburi'] },
  ],
  regions: [
    { key: 'Northern', label: 'Noord', title: 'Bergen, tempels en markten', description: 'Chiang Mai, Chiang Rai en Pai combineren cultuur met een koeler, groener landschap.' },
    { key: 'Central', label: 'Centraal', title: 'Hoofdstad en oude koninkrijken', description: 'Bangkok, Ayutthaya en Kanchanaburi vormen een logisch blok voor stad, geschiedenis en rivierlandschap.' },
    { key: 'Isaan', label: 'Isaan', title: 'Lokaler en minder bereisd', description: 'Het noordoosten beloont reizigers die eten, Mekongsteden en Khmer-erfgoed boven bekende strandroutes kiezen.' },
    { key: 'Southern', label: 'Zuid', title: 'Twee zeeën, veel reisstijlen', description: 'De Andamanse kust en de Golf hebben elk een ander seizoen, landschap en eilandritme.' },
  ],
  faqs: [
    { question: 'Wat zijn de mooiste plekken van Thailand?', answer: 'Voor een eerste reis geven Bangkok, Chiang Mai en één kustbasis de sterkste afwisseling. Kies Krabi of Phuket voor de Andamanse kust, Koh Samui voor de Golf en voeg Ayutthaya of Sukhothai toe wanneer geschiedenis centraal staat.' },
    { question: 'Welke bestemmingen zijn geschikt voor een eerste Thailand-reis?', answer: 'Bangkok, Chiang Mai en Krabi of Phuket zijn praktisch en gevarieerd. Beperk je tot drie of vier bases, zodat vervoer niet het grootste deel van de reis wordt.' },
    { question: 'Is het noorden of zuiden van Thailand mooier?', answer: 'Het noorden is sterker voor bergen, tempels en steden; het zuiden voor stranden, eilanden en zee. De beste keuze hangt vooral af van seizoen en reisstijl.' },
    { question: 'Hoeveel bestemmingen kun je combineren in drie weken?', answer: 'Drie tot vijf bases is voor de meeste reizigers ruim genoeg. Kies één duidelijke lijn en reken ook aankomst-, rust- en vervoersdagen mee.' },
    { question: 'Welke Thaise eilanden zijn rustig?', answer: 'Koh Lanta en rustigere delen van Koh Samui of Phuket bieden meer ruimte dan de bekendste uitgaanszones. Rust hangt ook af van de exacte kustplaats en het seizoen.' },
    { question: 'Wat is de beste reistijd voor Thailand?', answer: 'Thailand heeft geen universeel beste maand. Noord, Andamanse kust en Golf van Thailand kennen verschillende regen- en zeepatronen. Bekijk daarom de weerpagina van je gekozen bestemming.' },
  ],
  relatedGuides: [
    { title: 'Eerste keer Thailand', description: 'Bouw een haalbare eerste route zonder te veel bases.', href: '/thailand-for-first-timers/', image: '/images/redesign/first-time-thailand-hero.webp' },
    { title: 'Uitjes in Thailand', description: 'Vergelijk activiteiten nadat je bestemming vaststaat.', href: '/activities/', image: '/images/redesign/thailand-excursions-hero.webp' },
    { title: 'Vervoer in Thailand', description: 'Kies trein, bus, boot of vlucht per traject.', href: '/transport/', image: '/images/redesign/transport-thailand-hero.webp' },
  ],
  sources: [
    { title: 'Destinations in Thailand', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Destinations', note: 'Officiële bestemmings- en regiocontext.' },
    { title: 'Reisadvies Thailand', creator: 'NederlandWereldwijd', url: 'https://www.nederlandwereldwijd.nl/reisadvies/thailand', note: 'Actuele regionale veiligheidscontext.' },
    { title: 'Thailand climate information', creator: 'Thai Meteorological Department', url: 'https://www.tmd.go.th/en', note: 'Officiële weer- en seizoensinformatie voor routekeuzes.' },
  ],
};

const guides: Record<string, DestinationGuideData> = {
  bangkok: bangkokDestinationGuide,
  'chiang-mai': chiangMaiDestinationGuide,
  phuket: phuketDestinationGuide,
  'koh-samui': kohSamuiDestinationGuide,
  'khao-sok': khaoSokDestinationGuide,
  ayutthaya: ayutthayaDestinationGuide,
  'chiang-rai': chiangRaiDestinationGuide,
  pai: paiDestinationGuide,
  pattaya: pattayaDestinationGuide,
  'hua-hin': huaHinDestinationGuide,
  chumphon: chumphonDestinationGuide,
};

export function getNlDestinationGuide(citySlug: string) {
  return guides[citySlug];
}

export { ayutthayaDestinationGuide, bangkokDestinationGuide, chiangMaiDestinationGuide, chiangRaiDestinationGuide, chumphonDestinationGuide, huaHinDestinationGuide, paiDestinationGuide, pattayaDestinationGuide, phuketDestinationGuide, kohSamuiDestinationGuide, khaoSokDestinationGuide };
