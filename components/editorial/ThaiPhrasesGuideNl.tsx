import Link from 'next/link';
import {
  ArrowRight, BookOpenText, Check, CircleHelp, ExternalLink, Headphones,
  HeartHandshake, Languages, MapPin, MessageCircle, PhoneCall, ShieldCheck,
  ShoppingBasket, Smartphone, Sparkles, UtensilsCrossed, Volume2,
} from 'lucide-react';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';
import type { AmazonAffiliateSlug } from '../../lib/amazon-affiliates';

const PAGE_URL = 'https://go2-thailand.com/nl/travel-guides/thai-phrases-language/';
const HERO = '/images/redesign/thai-phrases-language-hero-v2.webp';
const AMAZON_PHRASEBOOK: AmazonAffiliateSlug = 'lonely-planet-thai-phrasebook';

const situations = [
  { id: 'begroeten', eyebrow: 'Eerste contact', title: 'Begroeten', icon: HeartHandshake, tone: 'dark', phrases: [
    { thai: 'สวัสดี', roman: 'sawatdi', meaning: 'Hallo / goedendag', note: 'Voeg je beleefdheidspartikel toe wanneer dat voor jou passend voelt.' },
    { thai: 'ขอบคุณ', roman: 'khop khun', meaning: 'Dank je wel', note: 'Een knik en rustige toon zijn belangrijker dan luid of perfect spreken.' },
    { thai: 'ขอโทษ', roman: 'kho thot', meaning: 'Sorry / pardon', note: 'Handig om aandacht te vragen of een klein misverstand te herstellen.' },
  ]},
  { id: 'eten', eyebrow: 'Aan tafel', title: 'Bestellen', icon: UtensilsCrossed, tone: 'light', phrases: [
    { thai: 'เอาอันนี้', roman: 'ao an ni', meaning: 'Deze graag', note: 'Wijs tegelijk het juiste gerecht aan; laat tekst of foto bevestigen.' },
    { thai: 'ไม่เผ็ด', roman: 'mai phet', meaning: 'Niet pittig', note: 'Dit vermindert misverstanden, maar iedere keuken interpreteert pittigheid anders.' },
    { thai: 'อร่อย', roman: 'aroi', meaning: 'Lekker', note: 'Een korte, positieve reactie die je vaak aan tafel zult horen.' },
  ]},
  { id: 'route', eyebrow: 'Onderweg', title: 'Route & prijs', icon: MapPin, tone: 'tonal', phrases: [
    { thai: 'อยู่ที่ไหน', roman: 'yu thi nai', meaning: 'Waar is …?', note: 'Zet de plek in Thai-schrift op je telefoon en laat die zien.' },
    { thai: 'ห้องน้ำอยู่ที่ไหน', roman: 'hong nam yu thi nai', meaning: 'Waar is het toilet?', note: 'Laat de Thaise tekst zien als de uitspraak niet direct wordt begrepen.' },
    { thai: 'เท่าไหร่', roman: 'thao rai', meaning: 'Hoeveel kost het?', note: 'Laat het bedrag op een rekenmachine typen; dat voorkomt cijferverwarring.' },
  ]},
  { id: 'hulp', eyebrow: 'Wanneer het stokt', title: 'Begrijpen & hulp', icon: CircleHelp, tone: 'light', phrases: [
    { thai: 'ไม่เข้าใจ', roman: 'mai khao jai', meaning: 'Ik begrijp het niet', note: 'Stop rustig en wissel naar tekst, kaart, foto of vertaalhulp.' },
    { thai: 'พูดช้าๆ หน่อย', roman: 'phut cha cha noi', meaning: 'Spreek alstublieft langzaam', note: 'Vraag om één korte zin tegelijk in plaats van dezelfde lange uitleg.' },
    { thai: 'ช่วยด้วย', roman: 'chuai duai', meaning: 'Help!', note: 'Voor een directe noodsituatie; bel daarnaast het passende noodnummer.' },
  ]},
];

const faqs = [
  { question: 'Wat zijn handige Thaise woorden voor vakantie?', answer: 'Begin met sawatdi (hallo), khop khun (bedankt), kho thot (sorry), thao rai (hoeveel), hong nam (toilet), mai khao jai (ik begrijp het niet) en chuai duai (help). Leer liever acht woorden met context, Thai-schrift en audio dan vijftig fonetische vormen zonder luistervoorbeeld.' },
  { question: 'Hoe zeg je hallo in het Thais?', answer: 'สวัสดี wordt meestal geromaniseerd als sawatdi of sawasdee. Voeg desgewenst het beleefdheidspartikel toe dat bij jou past: vaak ครับ (khrap) of ค่ะ (kha) in een mededeling. Romanisering geeft de vijf tonen niet volledig weer; luister vóór je nazegt.' },
  { question: 'Wat betekent kha of khrap in het Thais?', answer: 'Het zijn beleefdheidspartikels die de spreker aan het einde van een zin gebruikt. In conventioneel gebruik zeggen vrouwen vaak kha en mannen vaak khrap. Kies een vorm die bij je identiteit en comfort past; in een urgente situatie zijn duidelijkheid, locatie en hulp belangrijker dan het perfecte partikel.' },
  { question: 'Wat betekent chok dee?', answer: 'โชคดี (chok di) betekent ongeveer “veel geluk” of “succes”. De precieze uitspraak hoor je beter via een betrouwbare audio-uitspraak dan via Nederlandse letters alleen.' },
  { question: 'Hoe zeg je goede reis in het Thais?', answer: 'เดินทางปลอดภัย (doen thang plotphai) betekent letterlijk ongeveer “reis veilig”. Voor een reiziger is het nuttiger om de Thaise tekst te herkennen en een audiofragment te beluisteren dan een fonetische spelling als garantie te gebruiken.' },
  { question: 'Heeft de Thaise taal vijf tonen?', answer: 'Ja: midden, laag, dalend, hoog en stijgend. De toon kan betekenis onderscheiden. De officiële Thaise romanisering is een transcriptiesysteem en noteert niet automatisch alle informatie die een Nederlandstalige nodig heeft voor uitspraak. Gebruik daarom audio en context.' },
  { question: 'Moet ik Thai kunnen spreken om door Thailand te reizen?', answer: 'Nee. In toeristische situaties kun je vaak terecht met Engels, Thai-schrift op je telefoon, kaarten, foto’s en een vertaalapp. Een paar goed voorbereide zinnen verminderen frictie, maar je hoeft geen gesprek te forceren wanneer aanwijzen duidelijker is.' },
  { question: 'Kan ik Google Translate offline voor Thai gebruiken?', answer: 'Functies, talen en downloadformaten kunnen per appversie veranderen. Controleer vóór vertrek in je eigen app of Thai offline beschikbaar is, download het pakket en test tekst, camera en audio zonder netwerk. Zie een machinevertaling bij allergieën, zorg en juridische zaken niet als enige controle.' },
  { question: 'Wat zeg ik bij een medisch noodgeval?', answer: 'Bel 1669 voor medische spoed en geef eerst je locatie door. Tourist Police is bereikbaar via 1155. Bewaar je hotelnaam, adres en medische informatie ook in Thai-schrift. Een ingestudeerde zin vervangt het noodnummer of professionele medische hulp niet.' },
  { question: 'Is een fysiek Thais reisphrasebook nog nuttig?', answer: 'Dat kan als offline reserve, vooral wanneer batterij, data of vertaalapp uitvalt. Controleer vóór aankoop editie, formaat, Thai-schrift, romanisering, audio-ondersteuning en of medische en voedingszinnen bruikbaar zijn. De Amazonlink op deze pagina toont een actuele productpagina; prijs, verkoper, levering en beschikbaarheid kunnen per land verschillen.' },
];

const sources = [
  { title: 'Romanisering van Thai naar Romeinse letters', creator: 'Office of the Royal Society of Thailand', url: 'https://legacy.orst.go.th/?knowledges=%E0%B8%A0%E0%B8%B2%E0%B8%A9%E0%B8%B2%E0%B8%84%E0%B8%B2%E0%B8%A3%E0%B8%B2%E0%B9%82%E0%B8%AD%E0%B9%80%E0%B8%81%E0%B8%B0-%E0%B9%91%E0%B9%90-%E0%B8%81%E0%B8%B1%E0%B8%99%E0%B8%A2%E0%B8%B2%E0%B8%A2%E0%B8%99', note: 'Primaire taalinstantie voor de officiële transcriptieprincipes en de grenzen van Romeinse letters.' },
  { title: 'Tourist Police Thailand', creator: 'Tourist Police Bureau', url: 'https://www.touristpolice.go.th/en/about-us', note: 'Officiële bevestiging van hotline 1155.' },
  { title: 'Emergency Medical Services 1669', creator: 'National Institute for Emergency Medicine', url: 'https://www.niems.go.th/1/SubWebsite/?id=1096', note: 'Officiële bron voor medisch noodnummer 1669.' },
];

function schemas() {
  return [
    { '@context': 'https://schema.org', '@type': 'Article', headline: 'Thaise woorden en zinnen voor je reis', description: 'Leer praktische Thaise zinnen met Thai-schrift, uitspraakgrenzen, beleefdheid, situatiescripts en noodcommunicatie.', url: PAGE_URL, image: `https://go2-thailand.com${HERO}`, inLanguage: 'nl-NL', dateModified: '2026-07-31', author: { '@type': 'Organization', name: 'Go2Thailand' }, publisher: { '@type': 'Organization', name: 'Go2Thailand' } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/nl/' }, { '@type': 'ListItem', position: 2, name: 'Reisgidsen', item: 'https://go2-thailand.com/nl/travel-guides/' }, { '@type': 'ListItem', position: 3, name: 'Thaise zinnen', item: PAGE_URL }] },
    { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Essentiële Thaise zinnen voor reizigers', numberOfItems: situations.flatMap(item => item.phrases).length, itemListElement: situations.flatMap(item => item.phrases).map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.thai, description: `${item.meaning} — ${item.roman}` })) },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) },
  ];
}

export default function ThaiPhrasesGuideNl() {
  return (
    <div className="bg-canvas" data-premium-template="thai-phrases-guide-nl">
      <SEOHead title="Thaise woorden en zinnen: praktische taalgids voor je reis" description="Leer praktische Thaise woorden en zinnen met Thai-schrift, uitspraakgrenzen, beleefdheid, situatiescripts en noodcommunicatie voor Thailand." ogImage={`https://go2-thailand.com${HERO}`}>
        {schemas().map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      </SEOHead>

      <EditorialHero
        image={HERO}
        imageAlt="Reiziger luistert met een telefoon in de hand naar een Thaise marktverkoper"
        breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Reisgidsen', href: '/travel-guides/' }, { label: 'Thaise zinnen' }]}
        eyebrow="Thai voor onderweg · luisteren vóór nazeggen"
        title={<>Niet perfect spreken.<br /><span className="text-saffron-light">Wel beter begrepen.</span></>}
        subtitle="Twaalf korte zinnen. Vier echte reissituaties. Eén rustige terugvalroutine."
        description="Gebruik Thai-schrift om te laten zien wat je bedoelt, romanisering alleen als geheugensteun en audio om de toon te horen. Duidelijkheid wint het van een lange fonetische woordenlijst."
        actions={[{ label: 'Open de zinnenkaart', href: '#zinnen', kind: 'primary' }, { label: 'Leer de drie lagen', href: '#uitspraak', kind: 'secondary' }]}
        minHeightClassName="min-h-[770px] lg:min-h-[700px]"
        contentClassName="max-w-[800px]"
        titleClassName="max-w-[900px] text-[3.5rem] leading-[.88] sm:text-[4.8rem] lg:text-[5.55rem]"
        imageClassName="object-cover object-[58%_center] lg:object-center"
        gradientClassName="bg-[linear-gradient(180deg,rgba(7,43,35,.28)_0%,rgba(7,43,35,.82)_39%,rgba(7,43,35,.86)_78%,rgba(252,250,246,.96)_93%,rgba(252,250,246,1)_100%)] lg:bg-[linear-gradient(90deg,rgba(7,43,35,.99)_0%,rgba(7,43,35,.93)_39%,rgba(7,43,35,.30)_64%,rgba(7,43,35,.03)_100%)]"
        contentTone="light"
      />
      <PageSectionNav label="Op deze Thaise taalgids" items={[{ href: '#zinnen', label: 'Zinnenkaart', icon: MessageCircle }, { href: '#uitspraak', label: 'Uitspraak', icon: Headphones }, { href: '#beleefd', label: 'Beleefdheid', icon: HeartHandshake }, { href: '#terugval', label: 'Terugvalroute', icon: Smartphone }, { href: '#nood', label: 'Noodkaart', icon: ShieldCheck }, { href: '#vragen', label: 'Vragen', icon: CircleHelp }]} />

      <section id="zinnen" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><SectionHeading eyebrow="Begin met de taak" title={<>Vier deuren.<br />Twaalf zinnen.</>} /><p className="max-w-[760px] text-sm font-medium leading-7 text-charcoal/64">De schrijfwijze hieronder is een geheugensteun, geen uitspraakgarantie. Tik een kaart open in je hoofd: laat het Thai-schrift zien, luister naar betrouwbare audio en wijs aan wat je bedoelt.</p></div>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {situations.map(({ id, eyebrow, title, icon: Icon, tone, phrases }) => <article key={id} className={`overflow-hidden rounded-[26px] border border-jade/10 shadow-editorial-card ${tone === 'dark' ? 'bg-jade text-white' : tone === 'tonal' ? 'bg-tonal text-jade' : 'bg-white text-jade'}`}>
              <div className="flex items-center justify-between p-7 pb-5"><div><p className={`text-[9px] font-extrabold uppercase tracking-[.15em] ${tone === 'dark' ? 'text-saffron-light' : 'text-saffron-dark'}`}>{eyebrow}</p><h2 className="mt-2 font-display text-[2.2rem] font-semibold leading-none">{title}</h2></div><span className={`grid h-12 w-12 place-items-center rounded-full ${tone === 'dark' ? 'bg-white/10 text-saffron-light' : 'bg-mist text-jade'}`}><Icon size={23} /></span></div>
              <div className={`divide-y ${tone === 'dark' ? 'divide-white/12' : 'divide-jade/10'}`}>{phrases.map(({ thai, roman, meaning, note }) => <div key={thai} className="grid gap-4 p-7 sm:grid-cols-[.8fr_1.2fr]"><div><p lang="th" className="text-3xl font-semibold leading-none">{thai}</p><p className={`mt-3 text-[10px] font-extrabold uppercase tracking-[.13em] ${tone === 'dark' ? 'text-saffron-light' : 'text-saffron-dark'}`}>{roman}</p></div><div><h3 className="font-display text-xl font-semibold">{meaning}</h3><p className={`mt-2 text-xs font-medium leading-6 ${tone === 'dark' ? 'text-white/62' : 'text-charcoal/62'}`}>{note}</p></div></div>)}</div>
            </article>)}
          </div>
        </div>
      </section>

      <section id="uitspraak" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
        <div className="container-custom grid gap-8 lg:grid-cols-[.72fr_1.28fr]">
          <div><SectionHeading eyebrow="Romanisering heeft grenzen" title={<>Lees drie lagen.<br />Vertrouw niet op één.</>} description="Thai-schrift bevestigt het woord. Romanisering helpt je het terug te vinden. Alleen luisteren laat je ritme, klinkerlengte en toon benaderen." /><svg aria-hidden="true" viewBox="0 0 360 110" className="mt-8 hidden h-24 w-full max-w-sm text-saffron lg:block"><path d="M8 72 C70 18 94 101 160 54 S267 21 350 70" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 8" strokeLinecap="round" /><circle cx="8" cy="72" r="5" fill="currentColor" /><circle cx="160" cy="54" r="4" fill="currentColor" /><circle cx="350" cy="70" r="5" fill="currentColor" /></svg></div>
          <div className="grid gap-px overflow-hidden rounded-[24px] border border-jade/10 bg-jade/10 sm:grid-cols-3">
            {[{ n: '01', title: 'Laat Thai zien', copy: 'Bewaar de volledige zin in Thai-schrift. De ander hoeft je Nederlandse klankcode dan niet te raden.', icon: Languages }, { n: '02', title: 'Gebruik romanisering', copy: 'Zie sawatdi of khop khun als geheugensteun. Verschillende bronnen kunnen dezelfde klank anders schrijven.', icon: BookOpenText }, { n: '03', title: 'Luister en herhaal', copy: 'Speel betrouwbare audio af, luister eerst naar de hele zin en herhaal rustig zonder harder te gaan praten.', icon: Volume2 }].map(({ n, title, copy, icon: Icon }, index) => <article key={n} className={`min-h-[300px] p-7 ${index === 1 ? 'bg-jade text-white' : 'bg-white text-jade'}`}><div className="flex items-center justify-between"><Icon size={25} className={index === 1 ? 'text-saffron-light' : 'text-jade'} /><span className={`font-display text-4xl font-semibold ${index === 1 ? 'text-white/18' : 'text-jade/14'}`}>{n}</span></div><h2 className="mt-8 font-display text-[1.7rem] font-semibold leading-none">{title}</h2><p className={`mt-4 text-xs font-medium leading-6 ${index === 1 ? 'text-white/62' : 'text-charcoal/62'}`}>{copy}</p></article>)}
          </div>
        </div>
        <div className="container-custom mt-10"><div className="rounded-[24px] border border-jade/10 bg-white p-7 shadow-editorial-card lg:p-9"><div className="grid gap-8 lg:grid-cols-[.55fr_1.45fr]"><div><p className="eyebrow">De vijf tonen</p><h2 className="font-display text-[2.65rem] font-semibold leading-[.92] text-jade">Midden. Laag.<br />Dalend. Hoog. Stijgend.</h2></div><div><p className="text-sm font-medium leading-7 text-charcoal/64">Een andere toon kan een andere betekenis geven. De officiële Thaise transcriptie naar Romeinse letters is nuttig voor consistente spelling, maar vormt geen volledige Nederlandse uitspraakcode. Vermijd daarom grappige “het klinkt als…”-ezelsbruggen bij woorden die je niet hebt beluisterd.</p><div className="mt-6 flex flex-wrap gap-2">{['midden — vlak', 'laag — lager', 'dalend — hoog naar laag', 'hoog — hoger', 'stijgend — laag naar hoog'].map(item => <span key={item} className="rounded-full border border-jade/10 bg-tonal px-4 py-2 text-[10px] font-extrabold text-jade">{item}</span>)}</div></div></div></div></div>
      </section>

      <section id="beleefd" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
        <div className="container-custom grid gap-8 lg:grid-cols-2">
          <article className="rounded-[26px] bg-jade p-8 text-white shadow-editorial-card lg:p-10"><p className="eyebrow !text-saffron-light">Aan het einde van de zin</p><h2 className="font-display text-[3rem] font-semibold leading-[.9]">Khrap. Kha.<br />En jouw keuze.</h2><p className="mt-6 text-sm font-medium leading-7 text-white/66">In conventioneel gebruik zeggen mannen vaak <span lang="th">ครับ</span> (khrap) en vrouwen in een mededeling vaak <span lang="th">ค่ะ</span> (kha). Het partikel hoort bij de spreker, niet bij degene tegen wie je praat.</p><p className="mt-4 text-sm font-medium leading-7 text-white/66">Kies een vorm die bij je identiteit en comfort past. Ben je onzeker, houd de zin kort en vriendelijk of vraag een Thaise docent welke vorm in jouw situatie natuurlijk voelt.</p></article>
          <article className="rounded-[26px] border border-jade/10 bg-white p-8 shadow-editorial-card lg:p-10"><p className="eyebrow">Duidelijker dan perfectionisme</p><h2 className="font-display text-[3rem] font-semibold leading-[.9] text-jade">Rustig spreken.<br />Niet luider spreken.</h2><div className="mt-8 space-y-4">{['Zeg één korte zin en wacht op reactie.', 'Laat dezelfde zin in Thai-schrift zien.', 'Wijs plek, gerecht, bedrag of kaart aan.', 'Bevestig het resultaat in plaats van de zin eindeloos te herhalen.'].map(item => <div key={item} className="flex gap-3 border-t border-jade/10 pt-4"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-mist text-jade"><Check size={13} /></span><p className="text-xs font-bold leading-6 text-charcoal/64">{item}</p></div>)}</div></article>
        </div>
      </section>

      <section id="terugval" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
        <div className="container-custom"><div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><SectionHeading eyebrow="Als de zin niet landt" title={<>Niet herhalen.<br />Schakel een laag.</>} /><p className="max-w-[760px] text-sm font-medium leading-7 text-charcoal/64">Een misverstand is geen examenfout. Ga van spreken naar tonen, van tonen naar aanwijzen en pas daarna naar een vertaalhulpmiddel of iemand die kan helpen.</p></div>
          <div className="relative mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4"><svg aria-hidden="true" className="pointer-events-none absolute left-[8%] right-[8%] top-10 hidden h-10 w-[84%] text-saffron lg:block" viewBox="0 0 1000 80" preserveAspectRatio="none"><path d="M10 40 C160 5 230 75 380 40 S600 5 720 40 S880 75 990 40" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="4 10" strokeLinecap="round" /></svg>{[{ n: '1', title: 'Spreek', copy: 'Eén korte zin, normale stem.', icon: MessageCircle }, { n: '2', title: 'Toon', copy: 'Open Thai-schrift of adres.', icon: Smartphone }, { n: '3', title: 'Wijs', copy: 'Kaart, foto, gerecht of bedrag.', icon: MapPin }, { n: '4', title: 'Vraag hulp', copy: 'Personeel, host of officiële dienst.', icon: Sparkles }].map(({ n, title, copy, icon: Icon }) => <article key={n} className="relative min-h-[210px] rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="relative z-10 grid h-12 w-12 place-items-center rounded-full bg-jade text-sm font-extrabold text-saffron-light">{n}</span><Icon size={22} className="mt-7 text-jade" /><h2 className="mt-4 font-display text-[1.55rem] font-semibold text-jade">{title}</h2><p className="mt-2 text-xs font-medium leading-6 text-charcoal/62">{copy}</p></article>)}</div>
        </div>
      </section>

      <section id="nood" className="section-divider-bottom scroll-mt-24 bg-jade py-14 text-white lg:py-20">
        <div className="container-custom grid gap-10 lg:grid-cols-[.62fr_1.38fr] lg:items-center"><div><p className="eyebrow !text-saffron-light">Bewaar vóór vertrek</p><h2 className="font-display text-[3.2rem] font-semibold leading-[.9]">Een noodkaart<br />werkt zonder accent.</h2><p className="mt-5 max-w-md text-sm font-medium leading-7 text-white/62">Zet hotelnaam, adres, verzekeraar, noodcontact en relevante medische informatie in een offline notitie. Deel eerst je locatie.</p></div><div className="grid gap-4 sm:grid-cols-2"><a href="tel:1155" className="rounded-[22px] border border-white/14 bg-white/[.06] p-7 transition hover:bg-white/[.1]"><Languages className="text-saffron-light" /><p className="mt-6 text-[9px] font-extrabold uppercase tracking-[.14em] text-white/48">Tourist Police</p><strong className="mt-2 block font-display text-5xl">1155</strong><span className="mt-4 block text-xs font-bold text-white/62">Open het officiële nummer in je telefoon</span></a><a href="tel:1669" className="rounded-[22px] border border-white/14 bg-white/[.06] p-7 transition hover:bg-white/[.1]"><PhoneCall className="text-saffron-light" /><p className="mt-6 text-[9px] font-extrabold uppercase tracking-[.14em] text-white/48">Medische spoed</p><strong className="mt-2 block font-display text-5xl">1669</strong><span className="mt-4 block text-xs font-bold text-white/62">Geef eerst je locatie en situatie</span></a><div className="sm:col-span-2 rounded-[22px] bg-white p-7 text-jade"><p lang="th" className="text-3xl font-semibold">ช่วยด้วย · ต้องการหมอ</p><p className="mt-3 text-xs font-extrabold uppercase tracking-[.12em] text-saffron-dark">Help · ik heb een dokter nodig</p><p className="mt-4 text-xs font-medium leading-6 text-charcoal/62">Laat de Thai-tekst zien en bel de passende hulpdienst. Gebruik een fonetische noodzin nooit als vervanging voor locatie, telefoonnummer of professionele hulp.</p></div></div></div>
      </section>

      <section className="section-divider-bottom py-14 lg:py-20">
        <div className="container-custom grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-center"><div><SectionHeading eyebrow="Gratis kaart eerst" title={<>Bewaar deze pagina.<br />Koop alleen wat toevoegt.</>} description="Een fysiek phrasebook kan een offline reserve zijn als batterij, data of app uitvalt. Controleer editie, Thai-schrift, romanisering, situaties en eventueel audio voordat je kiest." /><div className="mt-7 flex flex-wrap gap-3"><Link href="#zinnen" className="btn-jade btn-jade-pattern">Open de gratis zinnenkaart <ArrowRight size={14} className="text-saffron" /></Link><a href={`/go/${AMAZON_PHRASEBOOK}/`} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-outline-jade">Bekijk actuele prijs bij Amazon <ExternalLink size={14} className="text-saffron-dark" /></a></div><AffiliateDisclosure className="mt-4">Amazon-affiliatelink. We kunnen zonder extra kosten voor jou commissie ontvangen. OneLink kan geschikte bezoekers naar een lokale Amazonwinkel sturen; editie, verkoper, taal, prijs, voorraad en levering verschillen per land.</AffiliateDisclosure></div><article className="rounded-[26px] border border-jade/10 bg-tonal p-8"><BookOpenText size={30} className="text-jade" /><h2 className="mt-6 font-display text-[2rem] font-semibold leading-none text-jade">Controleer vóór aankoop</h2><div className="mt-6 space-y-3">{['Thai-schrift naast iedere zin', 'Uitleg van tonen en uitspraak', 'Eten, route, zorg en noodgevallen', 'Een editie en formaat die je echt meeneemt'].map(item => <p key={item} className="flex gap-3 text-xs font-bold leading-6 text-charcoal/64"><Check size={15} className="mt-1 shrink-0 text-saffron-dark" />{item}</p>)}</div></article></div>
      </section>

      <FaqSplitSection id="vragen" eyebrow="Echte zoekvragen" title="Vragen over Thai voor reizigers" description="Actuele Nederlandse PAA’s, beantwoord zonder fonetische perfectie, appfuncties of begrip te garanderen." items={faqs} />
      <RelatedGuidesSection eyebrow="Verder voorbereiden" title="Gebruik taal in de juiste context" readLabel="Open de gids" guides={[{ title: 'Thaise etiquette', description: 'Koppel woorden aan rustige, respectvolle sociale keuzes.', href: '/practical-info/etiquette-culture/', image: '/images/redesign/thailand-etiquette-hero.webp', imageAlt: 'Respectvolle begroeting in Thailand' }, { title: 'Thaise keuken', description: 'Kies gerechten en begrijp de grenzen van bestelzinnen en allergenen.', href: '/food/', image: '/images/blog/what-is-thai-food-cuisine-guide.webp', imageAlt: 'Thaise gerechten op tafel' }, { title: 'Buiten de bekende route', description: 'Bereid kaarten, adressen en communicatie voor op minder toeristische plekken.', href: '/travel-guides/hidden-gems-off-beaten-path-thailand/', image: '/images/blog/15-hidden-gems-thailand-tourists-miss.webp', imageAlt: 'Rustige plek buiten de bekende route in Thailand' }]} />
      <SourceMethodSection eyebrow="Bronnen & methode" title="Taalhulp zonder schijnzekerheid" description="Bijgewerkt op 31 juli 2026 met zichtbare Nederlandse Google-resultaten, echte People Also Ask-vragen, concurrentpatronen en primaire bronnen van de Thaise Royal Society, Tourist Police en het National Institute for Emergency Medicine. De legacycopy met kapotte encoding, vaste appclaims, onderhandelingspercentages, prijsbeloften en absolute hulpdienstclaims is verwijderd. Romanisering blijft bewust een geheugensteun; Thai-schrift, audio, context en een terugvalactie dragen de praktische taak." sources={sources} />
    </div>
  );
}
