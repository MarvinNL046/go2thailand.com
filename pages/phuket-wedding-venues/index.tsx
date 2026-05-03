import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { withSubId, KLOOK_GENERIC, GYG_GENERIC } from '../../lib/affiliates';
import { useSubId } from '../../lib/useSubId';

interface PartnerEntry { partnerUrl: string; label?: string }
interface Partners {
  trip_luxury_honeymoon: PartnerEntry;
  trip_wedding_venue: PartnerEntry;
  trip_honeymoon_resort: PartnerEntry;
  trip_pool_villa: PartnerEntry;
  trip_all_inclusive: PartnerEntry;
  trip_beach_resort: PartnerEntry;
  klook_honeymoon: PartnerEntry;
  klook_sunset_couples: PartnerEntry;
  klook_couples_spa: PartnerEntry;
  klook_phi_phi_private: PartnerEntry;
  gyg_phuket_couples: PartnerEntry;
  gyg_phuket_romantic: PartnerEntry;
  viator_honeymoon: PartnerEntry;
  viator_private_tour: PartnerEntry;
  gyg_yacht_sunset?: PartnerEntry;
  klook_luxury_yacht?: PartnerEntry;
}

interface Props { partners: Partners; lastUpdated: string }

export default function PhuketWeddingVenuesPillar({ partners, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const subId = useSubId();
  const placement = (slot: string) => `${subId}-pseo-phuket-wedding-${slot}`;

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Phuket trouwlocaties' : 'Phuket Wedding Venues', href: '/phuket-wedding-venues/' },
  ];

  // Title <60, keyword first, year + click-worthy modifier
  const seoTitle = isNl
    ? 'Phuket Trouwlocaties (2026): 9 Beste Resort Venues'    // 53
    : 'Phuket Wedding Venues (2026): 9 Best Resort Picks';   // 51

  // Meta <155, question hook
  const seoDescription = isNl
    ? 'Op zoek naar trouwlocaties in Phuket? Vergelijk 9 resorts (Sri Panwa, Trisara, Amanpuri), prijzen $1.500–15.000+ en wettelijke eisen.'
    : 'Looking for the best Phuket wedding venues? Compare 9 resorts (Sri Panwa, Trisara, Amanpuri), packages $1,500–15,000+ and legal requirements.';

  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/phuket-wedding-venues/`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({
      '@type': 'ListItem', position: i + 1, name: b.name,
      item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}`,
    })),
  };

  const faqEn = [
    { q: 'How much does a Phuket wedding actually cost?',
      a: 'Real-world 2026 numbers: small intimate ceremony (10–20 guests, garden setup, basic photographer): $1,500–4,000. Mid-tier resort wedding (40–60 guests, beachfront, dinner reception, decor, bilingual MC): $7,000–15,000. Luxury full villa takeover (80+ guests, multi-day, premium catering, wedding planner): $25,000–80,000. Most international couples land $8,000–20,000 all-in including 3 nights for the bridal party.' },
    { q: 'Is a Phuket wedding legally binding for foreigners?',
      a: 'Only if you complete the Thai legal process: both partners visit your embassy in Bangkok for a "Statutory Declaration" ($30–60), get it translated into Thai and certified by the Ministry of Foreign Affairs (MFA), then register at any amphur (district office) in Thailand. Allow 5–7 working days. Most couples do a symbolic Thai ceremony in Phuket and the legal registration before flying out — or in their home country before/after.' },
    { q: 'When is the best month to get married in Phuket?',
      a: 'November to February is the dry season — calm beaches, low humidity, 28–32°C, lowest rain risk. Sweet spot: late November and early February (high season but not peak Christmas/NY pricing). March to early May is hot and dry (33–36°C) but golden-hour photos benefit. Avoid late September (worst weather of the year) and June–October monsoon for outdoor ceremonies — rain backup tents add $500–1,500.' },
    { q: 'Beach, resort garden, hilltop or villa — which venue type wins?',
      a: 'Beach: classic Thailand vibe, dramatic photos, but public beach access in Thailand means strangers can wander into your photos (private resort beaches solve this). Resort garden: most reliable rain backup, easiest catering, best for 40+ guests. Hilltop (Sri Panwa, Cape Sienna): unbeatable sunset views, smaller capacity (30–60), watch the wind. Private villa: total privacy and flexibility, highest cost per guest, requires more planning. For most couples: resort with both beach option AND covered backup wins.' },
    { q: 'How far in advance should we book a Phuket wedding venue?',
      a: 'High-season (Nov–Feb) and Saturday dates: 9–12 months ahead at top venues like Trisara, Amanpuri, Sri Panwa. Off-peak (Apr–Oct excluding rain peaks) and weekday weddings: 4–6 months. Last-minute (3 months) is doable at smaller boutique venues but limits photographer/florist choice. Add 1–2 months extra if you need legal paperwork done in Thailand.' },
    { q: 'Do Phuket wedding packages include the legal paperwork?',
      a: 'Most resort packages cover the ceremony, decor, basic catering, hair/makeup, photography and a wedding planner — but NOT the legal Thai registration. Specialised wedding planners (PhuketWedding, Wedding-Phuket, BlissEvents) add legal handling for $400–800 including translations, embassy runs, MFA certification and amphur registration. Always ask explicitly: "Is the marriage license process included or extra?"' },
    { q: 'Can we just elope in Phuket without guests?',
      a: 'Absolutely — elopement packages are a big segment here. For $1,200–3,500 you get an officiant, photographer (2–4 hours), beach or hilltop setup, bouquet, basic decor, wedding cake and a mini-reception dinner for two. Sri Panwa, The Slate, and Cape Sienna all offer dedicated elopement packages. Add legal registration ($400–800 via planner) if you want it Thai-recognised.' },
  ];

  const faqNl = [
    { q: 'Wat kost een trouwerij in Phuket echt?',
      a: '2026 cijfers: kleine intieme ceremonie (10–20 gasten, tuinopstelling, basis-fotograaf): $1.500–4.000. Mid-tier resort-bruiloft (40–60 gasten, beachfront, dinerreceptie, decoratie, tweetalige MC): $7.000–15.000. Luxe full-villa (80+ gasten, multi-day, premium catering, wedding planner): $25.000–80.000. De meeste internationale stellen landen op $8.000–20.000 all-in inclusief 3 nachten voor het bruidsgezelschap.' },
    { q: 'Is een trouwerij in Phuket juridisch geldig voor buitenlanders?',
      a: 'Alleen als je het Thai legalisatie-proces doorloopt: beide partners gaan naar je ambassade in Bangkok voor een "Statutory Declaration" ($30–60), laten dit vertalen naar Thai en certificeren bij het Ministerie van Buitenlandse Zaken (MFA), en registreren bij een amphur (districtskantoor) in Thailand. Reken op 5–7 werkdagen. De meeste stellen doen een symbolische Thai-ceremonie in Phuket en regelen de juridische registratie ervoor of erna in eigen land.' },
    { q: 'Wat is de beste maand om in Phuket te trouwen?',
      a: 'November tot februari is droog seizoen — rustige stranden, lage luchtvochtigheid, 28–32°C, minste regen-risico. Sweet spot: eind november en begin februari (hoogseizoen maar zonder Kerst/NY-toeslag). Maart–begin mei is heet en droog (33–36°C) — goed voor golden-hour fotos. Vermijd eind september (slechtste weer van het jaar) en juni–oktober moesson voor buiten-ceremonies — regen-backup tenten kosten $500–1.500 extra.' },
    { q: 'Strand, resort-tuin, heuveltop of villa — welk type wint?',
      a: 'Strand: klassieke Thailand-vibe, dramatische fotos, maar publieke stranden in Thailand betekent dat vreemden in je fotos kunnen lopen (privé resort-stranden lossen dit op). Resort-tuin: betrouwbaarste regen-backup, makkelijkste catering, beste voor 40+ gasten. Heuveltop (Sri Panwa, Cape Sienna): onverslaanbaar zonsondergang-uitzicht, kleinere capaciteit (30–60), pas op voor wind. Privé-villa: totale privacy en flexibiliteit, hoogste kosten per gast. Voor de meeste stellen: resort met zowel strand-optie als overdekte backup wint.' },
    { q: 'Hoe ver vooruit moet je een Phuket trouwlocatie boeken?',
      a: 'Hoogseizoen (nov–feb) en zaterdag: 9–12 maanden vooruit bij top-venues als Trisara, Amanpuri, Sri Panwa. Off-peak (apr–okt buiten regenpiek) en doordeweeks: 4–6 maanden. Last-minute (3 maanden) lukt bij kleinere boutique-venues maar beperkt fotograaf/floristen-keuze. Reken op 1–2 maanden extra als je de Thai paperwork wilt doen.' },
    { q: 'Zit de juridische paperwork in Phuket trouwpakketten?',
      a: 'De meeste resort-pakketten dekken ceremonie, decor, basis-catering, haar/make-up, fotografie en een wedding planner — maar NIET de Thai-registratie. Gespecialiseerde wedding planners (PhuketWedding, Wedding-Phuket, BlissEvents) voegen legal handling toe voor $400–800 inclusief vertalingen, ambassade-bezoeken, MFA-certificering en amphur-registratie. Vraag expliciet: "Is de huwelijksakte-procedure inbegrepen of apart?"' },
    { q: 'Kunnen we gewoon elopen in Phuket zonder gasten?',
      a: 'Absoluut — elopement-pakketten zijn een grote markt. Voor $1.200–3.500 krijg je een ceremoniemeester, fotograaf (2–4 uur), strand- of heuveltop-opstelling, bruidsboeket, basis-decor, bruidstaart en een mini-receptie-diner voor twee. Sri Panwa, The Slate en Cape Sienna hebben aparte elopement-pakketten. Voeg legal registration ($400–800 via planner) toe als je het Thai-erkend wilt.' },
  ];

  const faqList = isNl ? faqNl : faqEn;

  const faqJsonLd = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faqList.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <>
      <SEOHead title={seoTitle} description={seoDescription}>
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        <section className="bg-thailand-blue text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Breadcrumbs items={breadcrumbs} />
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/75">{isNl ? 'Trouwlocaties Phuket' : 'Wedding venues Phuket'}</p>
            {/* H1 different word order from title + secondary keyword */}
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">
              {isNl
                ? 'De beste trouwlocaties in Phuket: 9 resorts + pakketten vergeleken'
                : 'Best Wedding Venues in Phuket: 9 Resorts + Packages Compared'}
            </h1>
            <p className="mt-4 text-lg lg:text-xl max-w-3xl opacity-95">
              {isNl
                ? "Phuket's westkust hosts 200+ wedding-licensed resorts — van $1.500 elopements aan een verlaten strand tot $80.000 villa-takeovers met privé-koks. Hier vind je 9 venues die we écht zouden boeken, wat ze kosten, welke maand droog is en hoe je het juridisch klopt krijgt voor buitenlandse stellen."
                : "Phuket's west coast hosts 200+ wedding-licensed resorts — from $1,500 elopements on a deserted beach to $80,000 villa takeovers with private chefs. Here are 9 venues we would actually book, what they cost, which month is driest, and how to make it legally binding for international couples."}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={withSubId(partners.trip_wedding_venue.partnerUrl, placement('hero-trip'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">
                {isNl ? 'Bekijk wedding-venues op Trip.com' : 'See wedding venues on Trip.com'} →
              </a>
              <a href={withSubId(partners.trip_beach_resort.partnerUrl, placement('hero-beach'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-white text-thailand-blue border border-white/40 px-6 py-3 text-base font-semibold hover:bg-white/90">
                {isNl ? 'Strand-resorts vergelijken' : 'Compare beach resorts'} →
              </a>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs opacity-90">
              <span>✔ 9 {isNl ? 'venues vergeleken' : 'venues compared'}</span>
              <span>✔ {isNl ? 'Pakket-prijzen + legal-info' : 'Package pricing + legal info'}</span>
              <span>✔ {isNl ? 'Bijgewerkt' : 'Updated'} {new Date(lastUpdated).toLocaleDateString(isNl ? 'nl-NL' : 'en', { year: 'numeric', month: 'long' })}</span>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Comparison table — 9 venues */}
          <section id="comparison">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">{isNl ? '9 trouwlocaties Phuket vergeleken' : '9 Phuket wedding venues compared'}</h2>
            <p className="text-gray-600 mb-6">{isNl ? 'Klik om live beschikbaarheid te zien (we verdienen een kleine commissie zonder dat het jou iets extra kost).' : 'Click to see live availability (we earn a small commission at no extra cost to you).'}</p>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Venue' : 'Venue'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Type' : 'Type'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Capaciteit' : 'Capacity'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Pakket vanaf' : 'Package from'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Boek' : 'Book'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { name: 'Sri Panwa', type: isNl ? 'Heuveltop, Cape Panwa' : 'Hilltop, Cape Panwa', cap: '20–150', price: '$5,500' },
                    { name: 'Trisara', type: isNl ? 'Beach + tuin, Layan' : 'Beach + garden, Layan', cap: '20–120', price: '$7,500' },
                    { name: 'Amanpuri', type: isNl ? 'Pansea Beach' : 'Pansea Beach', cap: '20–80', price: '$12,000' },
                    { name: 'Banyan Tree', type: isNl ? 'Lagune-villa, Bang Tao' : 'Lagoon villa, Bang Tao', cap: '20–200', price: '$4,500' },
                    { name: 'The Slate', type: isNl ? 'Beach + binnen, Nai Yang' : 'Beach + indoor, Nai Yang', cap: '20–250', price: '$3,200' },
                    { name: 'JW Marriott Mai Khao', type: isNl ? 'Beach, Mai Khao' : 'Beach, Mai Khao', cap: '20–300', price: '$3,800' },
                    { name: 'Cape Sienna', type: isNl ? 'Heuveltop, Kamala' : 'Hilltop, Kamala', cap: '20–80', price: '$2,800' },
                    { name: 'Andara Resort', type: isNl ? 'Privé-villa, Kamala' : 'Private villa, Kamala', cap: '20–60', price: '$3,500' },
                    { name: 'The Surin', type: isNl ? 'Beach, Pansea' : 'Beach, Pansea', cap: '20–100', price: '$4,200' },
                  ].map((v, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-gray-900">{v.name}</td>
                      <td className="px-4 py-3 text-gray-700">{v.type}</td>
                      <td className="px-4 py-3 text-gray-700">{v.cap}</td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{v.price}</td>
                      <td className="px-4 py-3"><a href={withSubId(partners.trip_wedding_venue.partnerUrl, placement(`table-${i}`))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'See deals →'}</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-500">{isNl ? 'Pakket-prijzen zijn 2026 startpoint voor 20–40 gasten in hoogseizoen (nov–feb). Off-peak 30–40% lager. Buiten pakket: bloemen, premium-catering, photo-upgrades en legal paperwork.' : 'Package prices are 2026 starting points for 20–40 guests in high season (Nov–Feb). Off-peak 30–40% lower. Outside packages: flowers, premium catering, photo upgrades and legal paperwork.'}</p>
          </section>

          {/* Top pick callout */}
          <section className="rounded-2xl bg-thailand-red/5 border-2 border-thailand-red p-6">
            <span className="inline-block rounded-full bg-thailand-red text-white text-xs font-bold uppercase tracking-wide px-3 py-1 mb-3">⭐ {isNl ? 'Beste keuze voor de meesten' : 'Top pick for most'}</span>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Sri Panwa — heuveltop ceremonie + privacy' : 'Sri Panwa — hilltop ceremony + privacy'}</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              {isNl
                ? '90% van internationale stellen tussen $5K–15K-budget kiest hier voor: privé-cliffside ceremonie met 360° Andamanzee-uitzicht, Baba Nest sunset cocktail-uur (Conde Nast top-bar), 1.500m² private villa-takeover voor het bruidsgezelschap mogelijk. Kapel-stijl wind-shield + overdekte fall-back voor regen. Capacity tot 150 maar werkt het beste bij 40–80.'
                : 'For 90% of international couples in the $5K–15K bracket this is the pick: private cliffside ceremony with 360° Andaman Sea view, Baba Nest sunset cocktails (Conde Nast top-rated bar), 1,500m² private villa takeover available for the bridal party. Chapel-style wind shield + covered fall-back for rain. Capacity to 150 but works best at 40–80.'}
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={withSubId(partners.trip_wedding_venue.partnerUrl, placement('toppick-trip'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">
                {isNl ? 'Bekijk Sri Panwa op Trip.com' : 'See Sri Panwa on Trip.com'} →
              </a>
              <a href={withSubId(partners.trip_luxury_honeymoon.partnerUrl, placement('toppick-luxury'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">
                {isNl ? 'Andere luxe-resorts' : 'Other luxury resorts'} →
              </a>
            </div>
          </section>

          {/* Venue type sections */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? '4 venue-types in Phuket — welke past?' : '4 venue types in Phuket — which fits?'}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-blue-500">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? '🏖️ Strand-ceremonie' : '🏖️ Beach ceremony'}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Klassieke Thailand-stijl, dramatische fotos. Privé resort-stranden (Trisara, Amanpuri, The Surin) houden vreemden weg — publiek strand kan willekeurige zonbaders in je fotos opleveren. Sand-aisle setup met petals + arch: $800–2.500. Backup-tent verplicht buiten droogseizoen.' : 'Classic Thailand style, dramatic photos. Private resort beaches (Trisara, Amanpuri, The Surin) keep strangers out — public beach can mean random sunbathers in your photos. Sand-aisle setup with petals + arch: $800–2,500. Backup tent mandatory outside dry season.'}</p>
                <Link href="/phuket-wedding-venues/beach/" className="inline-flex items-center mt-3 text-sm font-semibold text-thailand-red hover:underline">{isNl ? 'Strand-trouwlocaties Phuket →' : 'Beach wedding venues Phuket →'}</Link>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-green-500">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? '🌳 Resort-tuin' : '🌳 Resort garden'}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Betrouwbaarste regen-backup (covered pavilions), makkelijkste catering-flow, beste capaciteit voor 40+ gasten. JW Marriott Mai Khao, Banyan Tree en Sri Panwa hebben dedicated tuin-wedding-zones. Iets minder dramatisch dan strand of heuveltop maar veel hogere weather-zekerheid.' : 'Most reliable rain backup (covered pavilions), easiest catering flow, best capacity for 40+ guests. JW Marriott Mai Khao, Banyan Tree and Sri Panwa have dedicated garden wedding zones. Slightly less dramatic than beach or hilltop but much higher weather certainty.'}</p>
                <Link href="/phuket-wedding-venues/resort-packages/" className="inline-flex items-center mt-3 text-sm font-semibold text-thailand-red hover:underline">{isNl ? 'Resort wedding-pakketten →' : 'Resort wedding packages →'}</Link>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-amber-500">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? '🏔️ Heuveltop-ceremonie' : '🏔️ Hilltop ceremony'}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Onverslaanbaar zonsondergang-uitzicht. Sri Panwa (Cape Panwa), Cape Sienna (Kamala), Cape Yamu — alle drie cliffside met cap 30–80. Pas op voor wind: petals waaien weg, dunne sluiers spelen op. Vraag operator naar wind-shield-setup. Beste tijd: 16:00–17:30 ceremonie voor sunset-receptie.' : 'Unbeatable sunset views. Sri Panwa (Cape Panwa), Cape Sienna (Kamala), Cape Yamu — all three cliffside, cap 30–80. Watch the wind: petals blow away, thin veils misbehave. Ask operators about wind-shield setups. Best timing: 16:00–17:30 ceremony for sunset reception.'}</p>
                <Link href="/phuket-wedding-venues/resort-packages/" className="inline-flex items-center mt-3 text-sm font-semibold text-thailand-red hover:underline">{isNl ? 'Resort hilltop-pakketten →' : 'Resort hilltop packages →'}</Link>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-purple-500">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? '🏠 Privé-villa takeover' : '🏠 Private villa takeover'}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Total privacy + multi-day events. Andara Resort, Villa Aye, Villa Padma — 5–10 slaapkamers, eigen kok, eigen pool. Werkt voor 20–60 gasten over meerdere dagen. Kost: $8.000–25.000/nacht voor de villa, plus catering, decor, planner. Kies dit als 30%+ van je gasten 3+ nachten blijft.' : 'Total privacy + multi-day events. Andara Resort, Villa Aye, Villa Padma — 5–10 bedrooms, private chef, private pool. Works for 20–60 guests across several days. Cost: $8,000–25,000/night for the villa, plus catering, decor, planner. Pick this if 30%+ of guests stay 3+ nights.'}</p>
                <Link href="/phuket-wedding-venues/villa/" className="inline-flex items-center mt-3 text-sm font-semibold text-thailand-red hover:underline">{isNl ? 'Privé-villa weddings →' : 'Private villa weddings →'}</Link>
              </div>
            </div>
          </section>

          {/* Buyer's guide */}
          <section className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Boekingstips voor Phuket-weddings' : 'Booking tips for Phuket weddings'}</h2>
            <ul className="space-y-3 text-gray-800">
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Boek 9–12 maanden vooruit voor hoogseizoen' : 'Book 9–12 months ahead for high season'}</strong>{isNl ? ': Sri Panwa, Trisara, Amanpuri zit voor zaterdagen in nov–feb 12 maanden vooruit op slot.' : ': Sri Panwa, Trisara, Amanpuri are booked 12 months out for Saturday dates in Nov–Feb.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Doordeweeks bespaart 20–30%' : 'Weekday saves 20–30%'}</strong>{isNl ? '. Dinsdag–donderdag-tarieven liggen vaak een derde lager dan zaterdag — én betere fotograaf-beschikbaarheid.' : '. Tuesday–Thursday rates are often a third below Saturday — and photographers are more available.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Vraag wat ÉCHT in pakket zit' : 'Ask what is REALLY in the package'}</strong>{isNl ? ': decor (bloemen vs zijde?), foto-uren (2 vs 8?), catering-courses, dranken (vol-bar vs alleen wijn/bier?), MC, geluid, regen-backup. 80% van klachten: hidden upsells.' : ': decor (real flowers vs silk?), photo hours (2 vs 8?), catering courses, drinks (full bar vs only wine/beer?), MC, sound, rain backup. 80% of complaints: hidden upsells.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Legal paperwork apart regelen' : 'Handle legal paperwork separately'}</strong>{isNl ? ': resort-pakketten dekken zelden Thai-registratie. Boek dat via gespecialiseerde planner ($400–800) of doe het in eigen land.' : ': resort packages rarely cover Thai registration. Book that via a specialised planner ($400–800) or do it back home.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Reken op 25–35% extra naast pakket' : 'Budget 25–35% on top of the package'}</strong>{isNl ? ' voor: bloemen-upgrade, premium-bar, fotograaf-uren, gasten-transport, hair/make-up trial.' : ' for: flower upgrades, premium bar, photographer hours, guest transport, hair/makeup trials.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Reisverzekering checken' : 'Check travel insurance'}</strong>{isNl ? ': specifieke "wedding cancellation" verzekering kost 4–7% van totaal-budget en dekt regen-cancel, ziekte, vendor-faillissement.' : ': specific "wedding cancellation" insurance costs 4–7% of total budget and covers rain cancel, illness, vendor bankruptcy.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Plan een sunset cruise voor de gasten' : 'Plan a sunset cruise for guests'}</strong>{isNl ? ': $40–80pp gedeeld of $400–800 privé. Werkt als welkomst-event of dag-na ontspanning.' : ': $40–80 pp shared or $400–800 private. Works as a welcome event or day-after wind-down.'}</span></li>
            </ul>
          </section>

          {/* Legal section */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Juridische eisen voor buitenlandse stellen' : 'Legal requirements for foreign couples'}</h2>
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 space-y-3 text-gray-700">
              <p>{isNl ? 'Een trouwerij in Phuket is symbolisch tot je het Thai-process doorloopt. Stappen:' : 'A Phuket wedding is symbolic until you complete the Thai legal process. Steps:'}</p>
              <ol className="list-decimal list-inside space-y-2 leading-relaxed">
                <li>{isNl ? 'Statutory Declaration aan ambassade in Bangkok ($30–60 pp).' : 'Statutory Declaration at your embassy in Bangkok ($30–60 pp).'}</li>
                <li>{isNl ? 'Vertaling naar Thai door geautoriseerd vertaalbureau ($30–80).' : 'Translation into Thai by an authorised translation agency ($30–80).'}</li>
                <li>{isNl ? 'Certificering bij Ministerie van Buitenlandse Zaken (MFA) — 3–5 werkdagen.' : 'Certification at the Ministry of Foreign Affairs (MFA) — 3–5 working days.'}</li>
                <li>{isNl ? 'Registratie bij elke amphur (districtskantoor) in Thailand — Phuket Town heeft een centrale.' : 'Registration at any amphur (district office) in Thailand — Phuket Town has a central one.'}</li>
                <li>{isNl ? 'Internationale apostille terug in eigen land (kosten verschillen per land).' : 'International apostille back in your home country (cost varies by country).'}</li>
              </ol>
              <p className="text-sm text-gray-600 mt-3">{isNl ? 'Totale doorlooptijd: 5–10 werkdagen, totaal $400–800 via planner. Veel internationale stellen doen alleen het symbolische deel in Phuket en regelen de juridische registratie thuis.' : 'Total turnaround: 5–10 working days, total $400–800 via planner. Many international couples do only the symbolic ceremony in Phuket and register legally back home.'}</p>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Veelgestelde vragen' : 'Frequently asked questions'}</h2>
            <div className="space-y-3">
              {faqList.map((f, i) => (
                <details key={i} className="rounded-2xl bg-white p-4 shadow-sm border border-gray-200">
                  <summary className="font-semibold text-gray-900 cursor-pointer">{f.q}</summary>
                  <p className="mt-2 text-gray-700 text-sm leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Cluster mesh */}
          <section className="rounded-2xl bg-thailand-blue/10 p-6">
            <h2 className="font-heading text-xl font-bold text-gray-900">{isNl ? 'Plan de rest van je Phuket trouwerij' : 'Plan the rest of your Phuket wedding'}</h2>
            <p className="mt-2 text-gray-700">{isNl ? 'Venue gekozen — werk de rest af:' : 'Venue picked — wrap up the rest:'}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/phuket-honeymoon/" className="rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">{isNl ? '💕 Honeymoon na de bruiloft' : '💕 Honeymoon after the wedding'}</Link>
              <Link href="/phuket-wedding-venues/beach/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏖️ Strand-trouwlocaties' : '🏖️ Beach wedding venues'}</Link>
              <Link href="/phuket-wedding-venues/villa/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏠 Privé-villa weddings' : '🏠 Private villa weddings'}</Link>
              <Link href="/best-hotels/phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏨 Hotels voor gasten' : '🏨 Hotels for guests'}</Link>
              <Link href="/yacht-charter-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '⛵ Sunset cruise voor gasten' : '⛵ Sunset cruise for guests'}</Link>
              <Link href="/flights-to-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '✈️ Vluchten naar Phuket' : '✈️ Flights to Phuket'}</Link>
              <Link href="/car-rental-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🚗 Auto huren voor gasten' : '🚗 Car rental for guests'}</Link>
              <Link href="/city/phuket/" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">{isNl ? '📖 Phuket reisgids' : '📖 Phuket travel guide'}</Link>
              <a href={withSubId(GYG_GENERIC, placement('mesh-gyg'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">{isNl ? '🎟️ Pre-wedding activiteiten' : '🎟️ Pre-wedding activities'}</a>
            </div>
          </section>

          {/* Methodology */}
          <section className="rounded-2xl bg-gray-50 border border-gray-200 p-6 text-sm text-gray-700">
            <h2 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Hoe we vergeleken' : 'How we compared'}</h2>
            <p>{isNl ? 'Pakket-prijzen geverifieerd in mei 2026 op resort-websites + Trip.com voor 2026–2027 boekingen. Wedding-planner-prijzen gevalideerd via PhuketWedding.net, Wedding-Phuket.com en BlissEvents reviews. Juridische eisen via Royal Thai Embassy + MFA-portal. We verdienen commissie op boekingen via genoemde platforms — dit verandert niets aan de prijs of welke venues we noemen.' : "Package prices verified May 2026 on resort websites + Trip.com for 2026–2027 bookings. Wedding planner pricing validated via PhuketWedding.net, Wedding-Phuket.com and BlissEvents reviews. Legal requirements via Royal Thai Embassy + MFA portal. We earn a commission on bookings through the listed platforms — this never changes the price you pay or which venues we cover."}</p>
          </section>
        </main>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const file = path.join(process.cwd(), 'data', 'pseo', 'wedding-honeymoon', 'phuket-partners.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  return { props: { partners: data.partners, lastUpdated: data.lastUpdated }, revalidate: 604800 };
};
