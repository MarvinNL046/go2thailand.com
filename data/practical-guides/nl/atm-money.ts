import type { PracticalDecisionData } from '../../../components/practical/PracticalDecisionGuideTemplate';

export const atmMoneyNl: PracticalDecisionData = {
  slug: 'atm-money', updatedAt: '2026-07-31',
  seo: { title: 'Pinnen in Thailand: ATM, cash, kaart & wisselen', description: 'Kies bewust tussen pinnen, cash, kaart en geld wisselen in Thailand. Herken DCC, controleer kosten en bouw een betaalbuffer.', image: '/images/redesign/thailand-money-atm-hero-nl.webp' },
  hero: { eyebrow: 'Betaal zonder automatische piloot', title: 'Pinnen in Thailand.', accent: 'Kies vóór je bevestigt.', description: 'De beste keuze is niet één bank of kaart voor iedereen. Vergelijk het bedrag in baht, de getoonde kosten en de wisselkoerskeuze op het scherm — en houd altijd een tweede betaalroute achter de hand.', imageAlt: 'ATM, Thaise bankbiljetten, betaalkaart en portemonnee bij een bank in Bangkok', primary: 'Bekijk het betaalplan' },
  intro: { eyebrow: 'Cash én kaart', title: 'Vergelijk het totaalscherm.', description: 'ATM-kosten, je eigen banktarief en valutaconversie zijn verschillende lagen. Kijk naar het eindbedrag en accepteer niet gedachteloos een conversie naar euro.', cards: [
    { label: 'ATM', title: 'Lees vóór akkoord', text: 'Controleer de kostenmelding, opnamebedrag en valuta op ieder scherm. Limieten en kosten kunnen per automaat en kaart verschillen.' },
    { label: 'Valuta', title: 'Kies doorgaans THB', text: 'Biedt een ATM of terminal een bedrag in euro aan, dan is dat vaak Dynamic Currency Conversion. Vergelijk en laat conversie meestal aan je kaartuitgever.' },
    { label: 'Buffer', title: 'Spreid je middelen', text: 'Neem bruikbare cash en twee betaalmiddelen mee. Bewaar de reserve niet in dezelfde portemonnee.' },
  ]},
  patterns: [
    { title: 'ATM bij een banklocatie', signal: 'Verlicht · bemand · bon mogelijk', text: 'Een automaat bij een open bankfiliaal of drukke officiële locatie maakt hulp bij een ingeslikte kaart of storing praktischer.', response: 'Controleer automaat, scherm en kaartgleuf, scherm je pincode af en annuleer bij afwijkend gedrag.' },
    { title: 'Conversie naar euro', signal: 'Guaranteed rate · home currency · EUR', text: 'De automaat of terminal biedt zelf een wisselkoers aan. Dat heet DCC en kan een extra marge bevatten.', response: 'Kies de lokale valuta THB en decline conversion wanneer je kaartuitgever de conversie moet doen; lees de formulering zorgvuldig.' },
    { title: 'Cash voor kleine momenten', signal: 'Markt · lokaal vervoer · kleine zaak', text: 'Kaartacceptatie is niet overal vanzelfsprekend en een storing kan je enige betaalroute blokkeren.', response: 'Houd een beperkte dagvoorraad cash apart en vul die gecontroleerd aan; draag niet je volledige reisbudget bij je.' },
    { title: 'Wisselkantoor vergelijken', signal: 'Koersbord · licentie · ontvangstbewijs', text: 'De zichtbare koers kan per valuta en coupure verschillen. Een spectaculaire headline zegt zonder voorwaarden weinig.', response: 'Vergelijk het netto bedrag in baht, controleer biljetten aan de balie en bewaar het bewijs.', image: '/images/redesign/thailand-budget-leaks.webp', imageAlt: 'Reisbudget en betaalkeuzes voor Thailand' },
  ],
  steps: [
    { title: 'Informeer je bank', text: 'Controleer vóór vertrek kaartdekking, regio-instelling, eigen opnamekosten en noodnummer. Zet meldingen voor transacties aan.' },
    { title: 'Kies het kanaal', text: 'Gebruik een betrouwbare ATM of betaalterminal, houd kaart en scherm in zicht en laat onbekenden niet “helpen” met je pincode.' },
    { title: 'Lees het scherm', text: 'Controleer bedrag, lokale kosten en valuta. Weiger ongewenste conversie en stop wanneer de formulering of totaalprijs onduidelijk is.' },
    { title: 'Bewaar je buffer', text: 'Controleer de transactie in je bankapp, berg cash uit het zicht op en houd een tweede kaart plus noodcash apart.' },
  ],
  checklist: [
    { title: 'Twee betaalmiddelen', text: 'Bij voorkeur van verschillende netwerken of rekeningen en fysiek apart bewaard.' },
    { title: 'Bankvoorwaarden', text: 'Download actuele buitenlandse tarieven, limieten en blokkade-instructies.' },
    { title: 'Kleine cashbuffer', text: 'Voor aankomst, vervoer of een zaak waar kaartbetaling niet lukt.' },
    { title: 'Transactiemeldingen', text: 'Activeer pushmeldingen en bewaar het officiële noodnummer van je kaartuitgever.' },
  ],
  faqs: [
    { question: 'Waar kan je het beste pinnen in Thailand?', answer: 'Kies bij voorkeur een goed verlichte ATM bij een officiële banklocatie of drukke, bemande plek. De “beste bank” verschilt per kaart, actueel tarief en opnamebehoefte; vergelijk daarom altijd het scherm en je eigen bankvoorwaarden.' },
    { question: 'Is het handig om cash mee te nemen naar Thailand?', answer: 'Ja, een beperkte cashbuffer is praktisch voor kleine zaken, markten en storingen. Neem niet je hele reisbudget contant mee, verdeel geld en combineer cash met minstens twee betaalroutes.' },
    { question: 'Hoe betaal je het beste in Thailand?', answer: 'Gebruik een mix: kaart waar de terminal betrouwbaar is, cash voor kleine of cash-only momenten en een reservekaart apart. Kies bij kaartbetaling doorgaans THB en controleer het totaal vóór je bevestigt.' },
    { question: 'Wat is beter, geld wisselen of pinnen?', answer: 'Dat hangt af van ATM-kosten, je kaarttarief, de actuele wisselkoers en het bedrag. Vergelijk het netto bedrag in baht in plaats van één losse fee. Voor veel reizigers werkt een combinatie beter dan één methode.' },
  ],
  related: [
    { title: 'Thailand budget', description: 'Bepaal je dagbudget en verdeel vaste en flexibele reiskosten.', href: '/thailand-index/budget/', image: '/images/redesign/thailand-budget-hero.webp', imageAlt: 'Budget plannen voor Thailand' },
    { title: '7-Eleven in Thailand', description: 'Praktische winkelmomenten, betaalkeuzes en wat je er wel of niet regelt.', href: '/travel-guides/7-eleven-thailand/', image: '/images/redesign/first-time-thailand-packing.webp', imageAlt: 'Praktische aankopen tijdens een Thailandreis' },
    { title: 'Paklijst Thailand', description: 'Kies een veilige portemonnee, reisadapter en compacte betaalback-up.', href: '/travel-gear/', image: '/images/redesign/travel-gear-hero.webp', imageAlt: 'Thailand paklijst en reisuitrusting' },
  ],
  sourceDescription: 'De vier zoekvragen zijn op 31 juli 2026 zichtbaar gecontroleerd in Google Nederland. Omdat ATM-fees, kaartvoorwaarden en wisselkoersen wijzigen, toont deze owner een beslismethode in plaats van vaste bedragen of een tijdloze “beste bank”.',
  sources: [
    { title: 'Exchange rates', creator: 'Bank of Thailand', url: 'https://www.bot.or.th/en/statistics/exchange-rate.html', note: 'Officiële referentie voor actuele wisselkoersinformatie; de koers van jouw bank of kaart kan afwijken.' },
    { title: 'Dynamic Currency Conversion explained', creator: 'Visa', url: 'https://www.visa.co.uk/support/consumer/travel-support/exchange-rate-calculator.html', note: 'Uitleg en hulpmiddel rond kaartconversie; controleer daarnaast altijd je eigen kaartvoorwaarden.' },
    { title: 'Reisadvies Thailand', creator: 'NederlandWereldwijd', url: 'https://www.nederlandwereldwijd.nl/reisadvies/thailand', note: 'Actuele praktische en veiligheidscontext voor reizen en betalingen.' },
  ],
};
