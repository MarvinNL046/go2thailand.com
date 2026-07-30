import type { PracticalDecisionData } from '../../../components/practical/PracticalDecisionGuideTemplate';

export const scamsSafetyNl: PracticalDecisionData = {
  slug: 'scams-safety',
  updatedAt: '2026-07-31',
  seo: {
    title: 'Oplichting in Thailand herkennen: scams & stappenplan',
    description: 'Herken veelvoorkomende scams in Thailand, stap veilig uit en weet wat je na betaling of verlies direct moet vastleggen en melden.',
    image: '/images/redesign/thailand-safety-hero.webp',
  },
  hero: {
    eyebrow: 'Herken druk vóór je beslist',
    title: 'Oplichting in Thailand.',
    accent: 'Pauzeer. Controleer. Kies zelf.',
    description: 'Het verhaal verandert, het patroon vaak niet. Deze gids helpt je om omleiding, tijdsdruk en betaaldruk te herkennen zonder iedere Thai of verkoper te wantrouwen.',
    imageAlt: 'Reiziger die op een rustige plek in Thailand route- en contactgegevens controleert',
    primary: 'Herken de patronen',
  },
  intro: {
    eyebrow: 'Geen zwarte lijst, wel een beslisfilter',
    title: 'Drie signalen die samen tellen.',
    description: 'Eén signaal bewijst niets. Word je tegelijk gehaast, weggeleid van een officiële route én naar een specifieke betaling gestuurd, neem dan afstand en verifieer zelf.',
    cards: [
      { label: 'Tempo', title: 'Je moet nú kiezen', text: 'Een aanbod verdwijnt zogenaamd direct, een loket sluit of hulp kan alleen op dit moment.' },
      { label: 'Omleiding', title: 'Jouw route is “dicht”', text: 'Iemand stuurt je zonder onafhankelijke controle naar een andere winkel, steiger, chauffeur of attractie.' },
      { label: 'Controle', title: 'Betalen buiten het kanaal', text: 'De prijs, borg of betaalwijze verandert en een schriftelijke bevestiging of officiële checkout ontbreekt.' },
    ],
  },
  patterns: [
    { title: 'De omgeleide route', signal: 'Dicht · andere ingang · speciale stop', text: 'Een behulpzame onbekende zegt dat je bestemming dicht is en biedt meteen vervoer of een alternatief aan.', response: 'Bedank, loop door en controleer opening en ingang via de officiële website, balie of kaartvermelding.', image: '/images/redesign/thailand-safety-transport.webp', imageAlt: 'Vervoerskeuze in Thailand die een reiziger zelfstandig controleert' },
    { title: 'Schade en borgdruk', signal: 'Foto ontbreekt · cashborg · haast', text: 'Bij huur of vervoer ontstaat discussie over schade, identiteitspapieren of een bedrag dat niet in de afspraak stond.', response: 'Fotografeer vóór gebruik, lees de voorwaarden, laat je paspoort niet als borg achter en beëindig de keuze als de afspraak verandert.' },
    { title: 'De off-platform betaling', signal: 'Privélink · overschrijving · geen ticket', text: 'Een tour, ticket of kamer wordt buiten het oorspronkelijke platform goedkoper aangeboden, maar bescherming en boekingsbewijs verdwijnen.', response: 'Betaal via het officiële kanaal en controleer aanbieder, annuleringsvoorwaarden en totaalbedrag vóór bevestigen.' },
    { title: 'Afleiding rond geld', signal: 'Open rekening · hulp bij ATM · wisseltruc', text: 'Iemand neemt je kaart, telefoon, bankbiljetten of open rekening uit het zicht terwijl jij wordt afgeleid.', response: 'Houd betaalmiddel en scherm zelf in beeld, tel rustig na en breek af als iemand jouw pincode of kaart wil overnemen.', image: '/images/redesign/thailand-safety-emergency-kit.webp', imageAlt: 'Telefoon en documenten voor een noodroute tijdens een Thailandreis' },
  ],
  steps: [
    { title: 'Maak afstand', text: 'Stop de interactie en ga naar een drukke, verlichte of officieel bemande plek. Discussie winnen is minder belangrijk dan controle terugkrijgen.' },
    { title: 'Bewaar bewijs', text: 'Noteer tijd, locatie, naam, kenteken en betaalreferentie. Bewaar chats, tickets, foto’s en screenshots; wijzig originele bestanden niet.' },
    { title: 'Beperk verlies', text: 'Blokkeer kaart of account via je eigen bankapp of officiële contactkanaal. Neem bij een platformboeking ook rechtstreeks contact op met het platform.' },
    { title: 'Meld gericht', text: 'Tourist Police is bereikbaar via 1155. Bij direct gevaar bel je de Thaise politie via 191. Volg voor consulaire hulp het actuele reisadvies van NederlandWereldwijd.' },
  ],
  checklist: [
    { title: 'Offline nummers', text: 'Bewaar 1155, 191, je bank, verzekeraar en het noodnummer van je accommodatie.' },
    { title: 'Eigen route', text: 'Sla officiële ingang, openingstijd en terugroute op vóór je vertrekt.' },
    { title: 'Betaalbuffer', text: 'Verdeel betaalmiddelen en neem een tweede kaart mee; bewaar die apart.' },
    { title: 'Boekingsbewijs', text: 'Download voorwaarden, voucher en adres zodat een verdwenen verbinding je bewijs niet wegneemt.' },
  ],
  faqs: [
    { question: 'Hoe veilig is Thailand op dit moment?', answer: 'Dat verschilt per regio en moment. Controleer vlak vóór vertrek en onderweg het actuele reisadvies van NederlandWereldwijd. Deze pagina gaat specifiek over scam-patronen; voor de bredere veiligheidsafweging gebruik je onze gids “Is Thailand veilig?”.' },
    { question: 'Wat te doen als je in Thailand bent opgelicht?', answer: 'Ga eerst naar een veilige plek, bewaar bewijs en blokkeer betrokken betaalmiddelen. Neem contact op met bank of boekingsplatform en meld het passend bij Tourist Police 1155 of politie 191. Vraag je verzekeraar welk rapport voor een claim nodig is.' },
    { question: 'Wat zijn de meest voorkomende oplichtingen?', answer: 'Veel verhalen draaien om dezelfde mechanismen: een bestemming zou dicht zijn, je wordt naar een specifieke winkel of rit geleid, afspraken over borg of schade veranderen, of betaling verhuist buiten een officieel kanaal. Herken het mechanisme, niet alleen de naam van de scam.' },
    { question: 'Wat is het grootste probleem in Thailand op dit moment?', answer: 'Daar bestaat geen betrouwbare enkelvoudige conclusie voor: verkeersrisico, regionale reisadviezen, gezondheid en kleine criminaliteit zijn verschillende onderwerpen. Raadpleeg actuele officiële bronnen en laat een brede vraag niet door één incident of virale video beantwoorden.' },
  ],
  related: [
    { title: 'Is Thailand veilig?', description: 'Maak de bredere afweging per regio, vervoer, avond en noodsituatie.', href: '/is-thailand-safe/', image: '/images/redesign/thailand-safety-hero.webp', imageAlt: 'Veilig reizen door Thailand' },
    { title: 'Vervoer in Thailand', description: 'Vergelijk trein, bus, boot en transfer zonder een onnodige omleiding.', href: '/transport/', image: '/images/redesign/transport-thailand-hero.webp', imageAlt: 'Vervoer en routeplanning in Thailand' },
    { title: 'Thaise etiquette', description: 'Onderscheid culturele context van verkooppraat of sociale druk.', href: '/practical-info/etiquette-culture/', image: '/images/redesign/thailand-etiquette-everyday.webp', imageAlt: 'Dagelijkse etiquette in Thailand' },
  ],
  sourceDescription: 'De SERP-vragen zijn op 31 juli 2026 zichtbaar gecontroleerd in Google Nederland. Operationele nummers en reisadviezen moet je altijd opnieuw bij de officiële bron controleren; bedragen en een tijdloze lijst met “bekende scams” zijn bewust vermeden.',
  sources: [
    { title: 'Reisadvies Thailand', creator: 'NederlandWereldwijd', url: 'https://www.nederlandwereldwijd.nl/reisadvies/thailand', note: 'Actuele regionale veiligheidsinformatie en consulaire handelingsroute.' },
    { title: 'Tourist Police Thailand', creator: 'Tourist Police Bureau', url: 'https://www.touristpolice.go.th/', note: 'Officieel informatie- en contactkanaal voor toeristen; controleer hier actuele dienstverlening.' },
    { title: 'Common scams to avoid', creator: 'U.S. Embassy Bangkok', url: 'https://th.usembassy.gov/common-scams-to-avoid/', note: 'Aanvullende patroonvoorbeelden; operationele stappen zijn tegen Thaise en Nederlandse officiële bronnen afgewogen.' },
  ],
};
