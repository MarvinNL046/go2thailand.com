import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { withSubId, KLOOK_GENERIC } from '../../lib/affiliates';
import { useSubId } from '../../lib/useSubId';

interface PartnerEntry { partnerUrl: string; label?: string }
interface Partners {
  klook_pillar: PartnerEntry;
  gyg_pillar: PartnerEntry;
  viator_pillar: PartnerEntry;
  tiqets_pillar: PartnerEntry;
  klook_big_buddha: PartnerEntry;
  gyg_big_buddha: PartnerEntry;
  viator_big_buddha: PartnerEntry;
  klook_elephant: PartnerEntry;
  gyg_elephant: PartnerEntry;
  viator_elephant: PartnerEntry;
  klook_cooking: PartnerEntry;
  gyg_cooking: PartnerEntry;
  viator_cooking: PartnerEntry;
  klook_snorkeling: PartnerEntry;
  gyg_snorkeling: PartnerEntry;
  viator_snorkeling: PartnerEntry;
  klook_old_town: PartnerEntry;
  gyg_old_town: PartnerEntry;
  viator_old_town: PartnerEntry;
}

interface Props { partners: Partners; lastUpdated: string }

export default function PhuketToursPillarPage({ partners, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const subId = useSubId();
  const placement = (p: string) => `${subId}-pseo-phuket-tours-pillar-${p}`;

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Phuket tours' : 'Phuket Tours', href: '/phuket-tours/' },
  ];

  // Title <60, keyword front + modifier
  const seoTitle = isNl
    ? 'Phuket Tours (2026): 9 Beste Dagtochten Vergeleken'         // 49
    : 'Phuket Tours 2026: 9 Best Day Trips + Honest Picks';        // 49

  // Meta desc <155, question hook
  const seoDescription = isNl
    ? 'Welke Phuket tours zijn écht het geld waard? Vergelijk Phi Phi, Big Buddha, James Bond Bay, snorkel, olifant + cooking class — Klook vs GYG vs Viator.'
    : 'Which Phuket tours are actually worth the money? Compare Phi Phi, Big Buddha, James Bond Bay, snorkeling, elephants & cooking — Klook vs GYG vs Viator.';

  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/phuket-tours/`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({
      '@type': 'ListItem', position: i + 1, name: b.name,
      item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}`,
    })),
  };

  const faqEn = [
    { q: 'Which Phuket tour should I book first?',
      a: "If it's your first trip and you only book one thing: a full-day Phi Phi Islands tour (Maya Bay, Pileh Lagoon, Bamboo Island) at $80–150 per person via Klook or GetYourGuide. It hits the most-photographed spots, lunch and snorkel gear are included, and hotel transfer is standard. Book 3–7 days ahead in high season (Nov–Apr)." },
    { q: 'How much do Phuket tours cost in 2026?',
      a: 'Shared day trips: Phi Phi $80–150 pp, James Bond Bay $50–110 pp, Coral/Racha snorkel $60–110 pp, Big Buddha + temple half-day $25–60 pp, ethical elephant sanctuary $80–120 pp, cooking class $40–80 pp, Old Town walking tour $20–40 pp. Private tours run 4–8× higher and are worth it for groups of 6+.' },
    { q: 'Klook, GetYourGuide or Viator — which platform is cheapest?',
      a: "Often the same operators across all three. Klook tends to win on Asian-market pricing (10–25% cheaper for Phi Phi, James Bond, snorkel trips). GetYourGuide has stronger English-speaking guides and easier cancellations. Viator carries more luxury and small-group options. Practical move: check Klook first for the price, GetYourGuide for review depth, Viator for premium variants." },
    { q: 'Are ethical elephant sanctuaries near Phuket actually ethical?',
      a: 'A handful are legitimate — the rest are repackaged trekking camps. Look for: no riding, no shows, no chained elephants, small groups of elephants (under 12), feeding + observing only. Phuket Elephant Sanctuary (Paklok) and Elephant Jungle Sanctuary are the most-vetted choices. Cross-reference with our Thailand-wide elephant sanctuaries guide before booking.' },
    { q: 'Best season for Phuket tours?',
      a: 'November to April is the dry season — calm seas, all islands accessible (including Similan Nov–May only), low rain. May to October is south-west monsoon: west-coast island trips often cancel, but Phang Nga Bay, Old Town, cooking, and Big Buddha tours run year-round. Worst weather: late September. Best value: late November and April (full weather minus holiday surcharges).' },
    { q: 'Do Phuket tour prices include marine park fees?',
      a: 'Klook and GetYourGuide shared day trips bundle the $30 pp Phi Phi National Park entry into the price. Private boat charters and many Viator tours do NOT — confirm at booking. Other parks (Similan $20 pp/day, James Bond Bay $10 pp) follow the same rule: shared = bundled, private = extra.' },
    { q: 'How far in advance should I book Phuket tours?',
      a: 'High season (Nov–Apr): 5–10 days ahead for popular trips (Phi Phi, James Bond, Similan), longer for Maya Bay slot-restricted boats. Christmas / Chinese New Year: 3–4 weeks. Low season (May–Oct): 1–3 days is usually fine, and many operators offer 20–35% discounts. Cooking classes and Old Town walks rarely sell out — book day-before.' },
  ];

  const faqNl = [
    { q: 'Welke Phuket tour boek ik als eerste?',
      a: "Eerste reis en je boekt maar één ding: een full-day Phi Phi Islands tour (Maya Bay, Pileh Lagoon, Bamboo Island) voor $80–150 pp via Klook of GetYourGuide. Je raakt de meest gefotografeerde plekken, lunch + snorkelgear inbegrepen, hoteltransfer standaard. Boek 3–7 dagen vooruit in hoogseizoen (nov–apr)." },
    { q: 'Wat kosten Phuket tours in 2026?',
      a: 'Gedeelde dagtochten: Phi Phi $80–150 pp, James Bond Bay $50–110 pp, Coral/Racha snorkel $60–110 pp, Big Buddha + tempel halve dag $25–60 pp, ethisch olifantenopvang $80–120 pp, kookcursus $40–80 pp, Old Town wandeltour $20–40 pp. Privé-tours zijn 4–8× duurder, maar lonen voor groepen ≥6.' },
    { q: 'Klook, GetYourGuide of Viator — wat is het goedkoopst?',
      a: "Vaak dezelfde operators op alle drie. Klook wint meestal op Aziatische marktprijzen (10–25% goedkoper voor Phi Phi, James Bond, snorkeltrips). GetYourGuide heeft sterkere Engelstalige gidsen + makkelijker annuleren. Viator heeft meer luxe en kleine-groep opties. Praktisch: check Klook eerst voor prijs, GetYourGuide voor reviews, Viator voor premium." },
    { q: 'Zijn de olifantenopvang-centra bij Phuket echt ethisch?',
      a: 'Een handvol is legit — de rest is omgedoopte trekking-camps. Let op: geen rijden, geen shows, geen geketende olifanten, kleine kuddes (<12), alleen voeren + observeren. Phuket Elephant Sanctuary (Paklok) en Elephant Jungle Sanctuary zijn de best-gevalideerde keuzes. Cross-check met onze Thailand-brede olifantengids vóór je boekt.' },
    { q: 'Beste seizoen voor Phuket tours?',
      a: 'November tot april: droog seizoen, rustige zee, alle eilanden toegankelijk (Similan alleen nov–mei), weinig regen. Mei–okt: zuidwestmoesson, westkust-trips vallen vaak uit, maar Phang Nga Bay, Old Town, kookcursus en Big Buddha-tours draaien jaarrond. Slechtst: eind september. Beste value: laat-november en april (vol seizoens-weer zonder vakantietoeslag).' },
    { q: 'Zijn marine park-fees inbegrepen in Phuket tour-prijzen?',
      a: "Klook en GetYourGuide gedeelde dagtochten verwerken de $30 pp Phi Phi National Park-fee in de prijs. Privé-charters en veel Viator-tours NIET — vraag bij boeking. Andere parken (Similan $20 pp/dag, James Bond Bay $10 pp) volgen dezelfde regel: gedeeld = inbegrepen, privé = apart." },
    { q: 'Hoe ver vooruit boek ik Phuket tours?',
      a: 'Hoogseizoen (nov–apr): 5–10 dagen vooruit voor populaire trips (Phi Phi, James Bond, Similan), langer voor Maya Bay-slot-boten. Kerst / Chinees Nieuwjaar: 3–4 weken. Laagseizoen (mei–okt): 1–3 dagen vaak voldoende, veel operators 20–35% korting. Kookcursussen en Old Town-walks raken zelden vol — daag-vooruit boeken werkt.' },
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
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/75">{isNl ? 'Phuket dagtochten vergelijking' : 'Phuket day-tour comparison'}</p>
            {/* H1 differs from title — uses the buyer-question framing + secondary keyword "day trips" */}
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">
              {isNl
                ? 'Beste Phuket tours: 9 dagtochten + waar je goedkoopst boekt'
                : 'The Best Phuket Tours: 9 Day Trips + Where to Book Cheapest'}
            </h1>
            <p className="mt-4 text-lg lg:text-xl max-w-3xl opacity-95">
              {isNl
                ? "Phuket biedt 200+ tours via Klook, GetYourGuide en Viator — van $25 Big Buddha-trips tot $1.500 privé-jachten naar Phi Phi. Hier vind je welke 9 écht je dag waard zijn, wat ze kosten in 2026, en op welk platform je tot 25% bespaart op identieke trips."
                : "Phuket lists 200+ tours across Klook, GetYourGuide and Viator — from $25 Big Buddha runs to $1,500 private yachts to Phi Phi. Here's which 9 are actually worth a day, what they cost in 2026, and which platform saves you up to 25% on the same trip."}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={withSubId(partners.klook_pillar.partnerUrl, placement('hero-klook'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">
                {isNl ? 'Bekijk alle Phuket tours op Klook' : 'See all Phuket tours on Klook'} →
              </a>
              <a href={withSubId(partners.gyg_pillar.partnerUrl, placement('hero-gyg'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-[#1B9E3E] text-white px-6 py-3 text-base font-semibold hover:bg-[#157a30]">
                {isNl ? 'GetYourGuide Phuket' : 'GetYourGuide Phuket'} →
              </a>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs opacity-90">
              <span>✔ 9 {isNl ? 'tours vergeleken' : 'tours compared'}</span>
              <span>✔ {isNl ? 'Klook vs GYG vs Viator prijscheck' : 'Klook vs GYG vs Viator price check'}</span>
              <span>✔ {isNl ? 'Bijgewerkt' : 'Updated'} {new Date(lastUpdated).toLocaleDateString(isNl ? 'nl-NL' : 'en', { year: 'numeric', month: 'long' })}</span>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Comparison table — 9 tours */}
          <section id="comparison">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">{isNl ? 'Snelle vergelijking: 9 Phuket tours' : 'Quick comparison: 9 Phuket tours'}</h2>
            <p className="text-gray-600 mb-6">{isNl ? 'Klik om live prijzen + beschikbaarheid te zien (we verdienen een kleine commissie zonder dat het jou iets extra kost).' : 'Click to see live pricing + availability (we earn a small commission at no extra cost to you).'}</p>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Tour' : 'Tour'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Duur' : 'Duration'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Prijs p.p.' : 'Price pp'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Beste voor' : 'Best for'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Boek' : 'Book'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3"><a href={withSubId(partners.klook_pillar.partnerUrl, placement('table-phi-phi'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="font-semibold text-thailand-blue hover:text-thailand-red hover:underline">{isNl ? 'Phi Phi Eilanden dagtocht' : 'Phi Phi Islands day trip'}</a></td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? '7–9 uur' : '7–9 hours'}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">$80–150</td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'Iconische foto-stops' : 'Iconic photo stops'}</td>
                    <td className="px-4 py-3"><a href={withSubId(partners.klook_pillar.partnerUrl, placement('table-phi-phi-cta'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'See deals →'}</a></td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3"><Link href="/phuket-tours/big-buddha/" className="font-semibold text-thailand-blue hover:text-thailand-red hover:underline">{isNl ? 'Big Buddha + Wat Chalong' : 'Big Buddha + Wat Chalong'}</Link></td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? '4–5 uur' : '4–5 hours'}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">$25–60</td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'Cultuur + uitzichtpunten' : 'Culture + viewpoints'}</td>
                    <td className="px-4 py-3"><a href={withSubId(partners.klook_big_buddha.partnerUrl, placement('table-bigbuddha-cta'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'See deals →'}</a></td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-900">{isNl ? 'James Bond Bay (Phang Nga)' : 'James Bond Bay (Phang Nga)'}</td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? '8 uur' : '8 hours'}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">$50–110</td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'Karst + kayak' : 'Karst + kayak'}</td>
                    <td className="px-4 py-3"><a href={withSubId(partners.gyg_pillar.partnerUrl, placement('table-jamesbond-cta'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'See deals →'}</a></td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3"><Link href="/phuket-tours/snorkeling/" className="font-semibold text-thailand-blue hover:text-thailand-red hover:underline">{isNl ? 'Snorkel-dagtocht (Coral/Racha)' : 'Snorkel day trip (Coral/Racha)'}</Link></td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? '6–8 uur' : '6–8 hours'}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">$60–110</td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'Helder water, weinig drukte' : 'Clear water, less crowded'}</td>
                    <td className="px-4 py-3"><a href={withSubId(partners.klook_snorkeling.partnerUrl, placement('table-snorkel-cta'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'See deals →'}</a></td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3"><Link href="/phuket-tours/elephant-sanctuary/" className="font-semibold text-thailand-blue hover:text-thailand-red hover:underline">{isNl ? 'Olifantenopvang (ethisch)' : 'Ethical elephant sanctuary'}</Link></td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? '4–6 uur' : '4–6 hours'}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">$80–120</td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'Diervriendelijk, families' : 'Animal-welfare, families'}</td>
                    <td className="px-4 py-3"><a href={withSubId(partners.klook_elephant.partnerUrl, placement('table-elephant-cta'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'See deals →'}</a></td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3"><Link href="/phuket-tours/cooking-class/" className="font-semibold text-thailand-blue hover:text-thailand-red hover:underline">{isNl ? 'Thaise kookcursus' : 'Thai cooking class'}</Link></td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? '3–4 uur' : '3–4 hours'}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">$40–80</td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'Indoor activiteit, regenproof' : 'Indoor, rain-proof'}</td>
                    <td className="px-4 py-3"><a href={withSubId(partners.klook_cooking.partnerUrl, placement('table-cooking-cta'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'See deals →'}</a></td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3"><Link href="/phuket-tours/old-town/" className="font-semibold text-thailand-blue hover:text-thailand-red hover:underline">{isNl ? 'Old Town wandeltour' : 'Old Town walking tour'}</Link></td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? '2–3 uur' : '2–3 hours'}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">$20–40</td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'Sino-Portuguese cultuur' : 'Sino-Portuguese culture'}</td>
                    <td className="px-4 py-3"><a href={withSubId(partners.klook_old_town.partnerUrl, placement('table-oldtown-cta'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'See deals →'}</a></td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-900">{isNl ? 'Similan duik-liveaboard' : 'Similan dive liveaboard'}</td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? '3–4 dagen' : '3–4 days'}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">$750–1,800</td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'Walvishaaien (jan–apr)' : 'Whale sharks (Jan–Apr)'}</td>
                    <td className="px-4 py-3"><a href={withSubId(partners.viator_pillar.partnerUrl, placement('table-similan-cta'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'See deals →'}</a></td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-900">{isNl ? 'Privé yacht naar Phi Phi' : 'Private yacht to Phi Phi'}</td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? '8–10 uur' : '8–10 hours'}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">$500–1,500</td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'Groepen 6–8, families' : 'Groups 6–8, families'}</td>
                    <td className="px-4 py-3"><Link href="/yacht-charter-phuket/phi-phi/" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Vergelijk →' : 'Compare →'}</Link></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-500">{isNl ? 'Prijzen zijn 2026 hoogseizoen-tarieven (nov–apr). Mei–okt vaak 20–35% lager. Marine park-fees inbegrepen op Klook/GYG-trips, apart op privé-charters.' : 'Prices are 2026 high-season rates (Nov–Apr). May–Oct often 20–35% lower. Marine park fees bundled on Klook/GYG trips, extra on private charters.'}</p>
          </section>

          {/* Top pick callout */}
          <section className="rounded-2xl bg-thailand-red/5 border-2 border-thailand-red p-6">
            <span className="inline-block rounded-full bg-thailand-red text-white text-xs font-bold uppercase tracking-wide px-3 py-1 mb-3">⭐ {isNl ? 'Beste keuze voor de meesten' : 'Top pick for most'}</span>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Phi Phi Eilanden via Klook of GetYourGuide' : 'Phi Phi Islands via Klook or GetYourGuide'}</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              {isNl
                ? "Voor 80% van de bezoekers is dit de tour-bezorger: Maya Bay, Pileh Lagoon, Bamboo Island, lunch + snorkel + transfer voor $80–150 pp. Klook en GetYourGuide gebruiken dezelfde operators — boek waar de reviews 4,5+ sterren hebben en de annuleringsvoorwaarden het soepelst zijn (meestal Klook voor prijs, GYG voor flex)."
                : "For 80% of visitors this is the trip: Maya Bay, Pileh Lagoon, Bamboo Island, lunch + snorkel + transfer for $80–150 pp. Klook and GetYourGuide list the same operators — book where reviews show 4.5+ stars and the cancellation policy is loosest (usually Klook on price, GYG on flexibility)."}
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={withSubId(partners.klook_pillar.partnerUrl, placement('toppick-klook'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">
                {isNl ? 'Phi Phi op Klook' : 'Phi Phi on Klook'} →
              </a>
              <a href={withSubId(partners.gyg_pillar.partnerUrl, placement('toppick-gyg'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-[#1B9E3E] text-white px-5 py-2 text-sm font-semibold hover:bg-[#157a30]">
                {isNl ? 'Phi Phi op GetYourGuide' : 'Phi Phi on GetYourGuide'} →
              </a>
              <a href={withSubId(partners.viator_pillar.partnerUrl, placement('toppick-viator'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">
                {isNl ? 'Premium opties op Viator' : 'Premium options on Viator'} →
              </a>
            </div>
          </section>

          {/* Detailed sections */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Wat krijg je per tour-type?' : 'What you actually get per tour type'}</h2>
            <div className="space-y-5">
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">{isNl ? 'Phi Phi Islands ($80–150 pp)' : 'Phi Phi Islands ($80–150 pp)'}</h3>
                <p className="text-gray-700 leading-relaxed mb-3">{isNl ? 'Standaard-route: Maya Bay (limit 380 bezoekers/dag), Pileh Lagoon, Monkey Beach, Viking Cave, Bamboo Island. Speedboot 35 min vanuit Chalong, catamaran 70 min. Lunch in een rustige baai, 2–3 snorkel-stops, hoteltransfer, marine park-fee inbegrepen. Vertrek 07:30–08:00 om Maya Bay leeg te zien.' : 'Standard route: Maya Bay (380-visitor daily cap), Pileh Lagoon, Monkey Beach, Viking Cave, Bamboo Island. Speedboat 35 min from Chalong, catamaran 70 min. Lunch in a quiet bay, 2–3 snorkel stops, hotel transfer, marine park fee bundled. Depart 07:30–08:00 to catch Maya Bay empty.'}</p>
                <a href={withSubId(partners.klook_pillar.partnerUrl, placement('detail-phi-phi'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center text-sm font-semibold text-thailand-red hover:underline">{isNl ? 'Bekijk Phi Phi-trips →' : 'See Phi Phi trips →'}</a>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">{isNl ? 'Big Buddha + Wat Chalong + Karon Viewpoint ($25–60 pp)' : 'Big Buddha + Wat Chalong + Karon Viewpoint ($25–60 pp)'}</h3>
                <p className="text-gray-700 leading-relaxed mb-3">{isNl ? 'Halve dag (4–5 uur), gids met airconditioned minibus. Stops: 45m wit-marmeren Big Buddha (uitzicht over heel zuid-Phuket), Wat Chalong (grootste tempel van het eiland), Karon/Promthep Cape viewpoint, vaak ook Mai Khao Beach of een lokale markt. Modest dress vereist (bedekte schouders + knieën). Idle voor regendag of een culture-break tussen strand-dagen.' : 'Half-day (4–5 hours), guide + air-conditioned minibus. Stops: 45m white-marble Big Buddha (sweeping views of southern Phuket), Wat Chalong (biggest temple on the island), Karon/Promthep Cape viewpoint, often Mai Khao Beach or a local market. Modest dress required (covered shoulders + knees). Ideal for a rain day or a culture break between beach days.'}</p>
                <Link href="/phuket-tours/big-buddha/" className="inline-flex items-center text-sm font-semibold text-thailand-red hover:underline">{isNl ? 'Big Buddha tour-gids →' : 'Big Buddha tour guide →'}</Link>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">{isNl ? 'James Bond Bay + Phang Nga ($50–110 pp)' : 'James Bond Bay + Phang Nga ($50–110 pp)'}</h3>
                <p className="text-gray-700 leading-relaxed mb-3">{isNl ? 'Full-day (8 uur). Stops: Khao Phing Kan (James Bond rots), Koh Panyee (drijvend moslim-vissersdorp), zee-grotten in Phang Nga met kayak (in canoe of zelf peddelen), lunch in Koh Panyee. Speedboot of "long-tail" houten boot — speedboot 25–30% duurder maar half-uur sneller en minder hobbel. Verminderd druk versus Phi Phi.' : 'Full-day (8 hours). Stops: Khao Phing Kan (James Bond rock), Koh Panyee (floating Muslim fishing village), Phang Nga sea caves by kayak (in-canoe or self-paddle), lunch on Koh Panyee. Speedboat or longtail wooden boat — speedboat 25–30% pricier but half-hour faster and less bumpy. Considerably less crowded than Phi Phi.'}</p>
                <a href={withSubId(partners.gyg_pillar.partnerUrl, placement('detail-james-bond'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center text-sm font-semibold text-thailand-red hover:underline">{isNl ? 'James Bond Bay-trips bekijken →' : 'See James Bond Bay trips →'}</a>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">{isNl ? 'Snorkel-trips: Coral, Racha, Phi Phi ($60–110 pp)' : 'Snorkel trips: Coral, Racha, Phi Phi ($60–110 pp)'}</h3>
                <p className="text-gray-700 leading-relaxed mb-3">{isNl ? 'Coral Island: 25 min vanaf Chalong, helder water, weinig drukte, goed voor families. Racha Yai/Noi: 45 min vanaf Chalong, beste zicht (12–15m), zachte koraal-tuinen. Phi Phi snorkel-stops: combineerbaar met de Phi Phi-trip. Snorkelgear, drijfvest, lunch + drinks meestal inbegrepen. Beste maanden voor zicht: nov, feb, maart.' : 'Coral Island: 25 min from Chalong, clear water, less crowded, family-friendly. Racha Yai/Noi: 45 min from Chalong, best visibility (12–15m), soft coral gardens. Phi Phi snorkel stops: bundle with the Phi Phi trip. Snorkel gear, life jacket, lunch + drinks usually included. Best visibility months: November, February, March.'}</p>
                <Link href="/phuket-tours/snorkeling/" className="inline-flex items-center text-sm font-semibold text-thailand-red hover:underline">{isNl ? 'Snorkel-tours guide →' : 'Snorkeling tour guide →'}</Link>
              </div>
            </div>
          </section>

          {/* Buyer's guide */}
          <section className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Boekingstips' : 'Booking tips'}</h2>
            <ul className="space-y-3 text-gray-800">
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Vergelijk Klook én GetYourGuide' : 'Compare Klook AND GetYourGuide'}</strong>{isNl ? ': zelfde operator, soms 10–25% prijsverschil. Check beide vóór je boekt — duurt 2 minuten, scheelt $20–40 per tour.' : ': same operator, sometimes 10–25% price gap. Check both before booking — 2 minutes saves $20–40 per tour.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Vermijd 1-dag-multi-stop combos' : 'Avoid 1-day multi-stop combos'}</strong>{isNl ? ': "Phi Phi + James Bond Bay in 1 dag" = 90% bus, 10% strand. Boek aparte dagen.' : ': "Phi Phi + James Bond in 1 day" = 90% transit, 10% beach. Book separate days.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Bewaar grote eilanden voor begin van je trip' : 'Save big islands for the start of your trip'}</strong>{isNl ? ': als de zee ruwer wordt of er regen komt, kun je nog naar binnen-tours uitwijken (Big Buddha, Old Town, kookcursus).' : ': if the sea turns or rain hits, you can shift to indoor tours (Big Buddha, Old Town, cooking).'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Marine park-fees check' : 'Verify marine park fees'}</strong>{isNl ? ': Klook/GYG inbegrepen, privé-yacht charter NIET. $30 pp Phi Phi, $20 pp Similan, $10 pp James Bond. Voor groep van 6: $60–180 verschil.' : ': Klook/GYG bundled, private yacht charter NOT. $30 pp Phi Phi, $20 pp Similan, $10 pp James Bond. For group of 6: $60–180 difference.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Ethische olifantenopvang vereist research' : 'Ethical elephants need vetting'}</strong>{isNl ? ': geen rijden, geen shows, kleine kuddes. Cross-check elke "sanctuary" met onze Thailand-brede gids.' : ': no riding, no shows, small herds. Cross-check every "sanctuary" with our Thailand-wide guide.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Zonsondergang: Promthep Cape vs catamaran' : 'Sunsets: Promthep Cape vs catamaran'}</strong>{isNl ? '. Cape = gratis maar druk. Catamaran sunset cruise $40–80 pp = drinks + open zee + privacy.' : '. Cape = free but crowded. Catamaran sunset cruise $40–80 pp = drinks + open water + privacy.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Reisverzekering check' : 'Check travel insurance'}</strong>{isNl ? ': watersport + speedboat-hops kunnen onder "high-risk" vallen. Lees je polis vóór de trip.' : ': watersports + speedboat hops can fall under "high-risk" exclusions. Read your policy before the trip.'}</span></li>
            </ul>
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

          {/* Spoke list */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Diepere gidsen per Phuket-tour' : 'Deep-dive guides per Phuket tour'}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <Link href="/phuket-tours/big-buddha/" className="block rounded-2xl bg-white p-4 shadow-sm border border-gray-200 hover:border-thailand-blue transition-colors">
                <p className="font-heading font-bold text-gray-900">{isNl ? 'Big Buddha + Wat Chalong tour' : 'Big Buddha + Wat Chalong tour'}</p>
                <p className="text-sm text-gray-600 mt-1">{isNl ? 'Halve dag, $25–60 pp, openingstijden, dresscode' : 'Half-day, $25–60 pp, opening hours, dress code'}</p>
                <p className="text-xs text-thailand-blue mt-2 font-semibold">{isNl ? 'Bekijk gids' : 'See guide'} →</p>
              </Link>
              <Link href="/phuket-tours/elephant-sanctuary/" className="block rounded-2xl bg-white p-4 shadow-sm border border-gray-200 hover:border-thailand-blue transition-colors">
                <p className="font-heading font-bold text-gray-900">{isNl ? 'Phuket olifantenopvang' : 'Phuket elephant sanctuaries'}</p>
                <p className="text-sm text-gray-600 mt-1">{isNl ? 'Welke écht ethisch zijn, $80–120 pp' : 'Which are actually ethical, $80–120 pp'}</p>
                <p className="text-xs text-thailand-blue mt-2 font-semibold">{isNl ? 'Bekijk gids' : 'See guide'} →</p>
              </Link>
              <Link href="/phuket-tours/cooking-class/" className="block rounded-2xl bg-white p-4 shadow-sm border border-gray-200 hover:border-thailand-blue transition-colors">
                <p className="font-heading font-bold text-gray-900">{isNl ? 'Phuket kookcursus' : 'Phuket cooking class'}</p>
                <p className="text-sm text-gray-600 mt-1">{isNl ? '3–4 uur, markt + cooking, $40–80 pp' : '3–4 hours, market + cook, $40–80 pp'}</p>
                <p className="text-xs text-thailand-blue mt-2 font-semibold">{isNl ? 'Bekijk gids' : 'See guide'} →</p>
              </Link>
              <Link href="/phuket-tours/snorkeling/" className="block rounded-2xl bg-white p-4 shadow-sm border border-gray-200 hover:border-thailand-blue transition-colors">
                <p className="font-heading font-bold text-gray-900">{isNl ? 'Phuket snorkel-dagtochten' : 'Phuket snorkeling day trips'}</p>
                <p className="text-sm text-gray-600 mt-1">{isNl ? 'Coral / Racha / Phi Phi vergeleken' : 'Coral / Racha / Phi Phi compared'}</p>
                <p className="text-xs text-thailand-blue mt-2 font-semibold">{isNl ? 'Bekijk gids' : 'See guide'} →</p>
              </Link>
              <Link href="/phuket-tours/old-town/" className="block rounded-2xl bg-white p-4 shadow-sm border border-gray-200 hover:border-thailand-blue transition-colors">
                <p className="font-heading font-bold text-gray-900">{isNl ? 'Old Town wandeltour' : 'Old Town walking tour'}</p>
                <p className="text-sm text-gray-600 mt-1">{isNl ? 'Sino-Portuguese cultuur, $20–40 pp' : 'Sino-Portuguese culture, $20–40 pp'}</p>
                <p className="text-xs text-thailand-blue mt-2 font-semibold">{isNl ? 'Bekijk gids' : 'See guide'} →</p>
              </Link>
              <Link href="/yacht-charter-phuket/" className="block rounded-2xl bg-white p-4 shadow-sm border border-gray-200 hover:border-thailand-blue transition-colors">
                <p className="font-heading font-bold text-gray-900">{isNl ? 'Privé yacht charter' : 'Private yacht charter'}</p>
                <p className="text-sm text-gray-600 mt-1">{isNl ? 'Voor groepen ≥6: vaak goedkoper dan gedeeld' : 'For groups ≥6: often cheaper than shared'}</p>
                <p className="text-xs text-thailand-blue mt-2 font-semibold">{isNl ? 'Bekijk gids' : 'See guide'} →</p>
              </Link>
            </div>
          </section>

          {/* Cluster mesh — cross-cluster */}
          <section className="rounded-2xl bg-thailand-blue/10 p-6">
            <h2 className="font-heading text-xl font-bold text-gray-900">{isNl ? 'Plan de rest van je Phuket-trip' : 'Plan the rest of your Phuket trip'}</h2>
            <p className="mt-2 text-gray-700">{isNl ? 'Tours geboekt — werk de rest af:' : 'Tours sorted — wrap up the rest:'}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/best-hotels/phuket/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">{isNl ? '🏨 Beste hotels in Phuket' : '🏨 Best hotels in Phuket'}</Link>
              <Link href="/flights-to-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '✈️ Vluchten naar Phuket' : '✈️ Flights to Phuket'}</Link>
              <Link href="/yacht-charter-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '⛵ Privé jacht-charter' : '⛵ Private yacht charter'}</Link>
              <Link href="/car-rental-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🚗 Auto huren' : '🚗 Rent a car'}</Link>
              <Link href="/where-to-stay/phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🗺️ Waar overnachten' : '🗺️ Where to stay'}</Link>
              <Link href="/city/phuket/" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">{isNl ? '📖 Phuket reisgids' : '📖 Phuket travel guide'}</Link>
              <a href={withSubId(KLOOK_GENERIC, placement('mesh-klook'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">{isNl ? '🎟️ Andere Phuket activiteiten' : '🎟️ Other Phuket activities'}</a>
            </div>
          </section>

          {/* Methodology */}
          <section className="rounded-2xl bg-gray-50 border border-gray-200 p-6 text-sm text-gray-700">
            <h2 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Hoe we vergeleken' : 'How we compared'}</h2>
            <p>{isNl ? 'Tarieven en route-info geverifieerd in mei 2026 op Klook, GetYourGuide, Viator en Tiqets voor early-juni 2026 boekingen vanuit Phuket. Operator-reviews gevalideerd via Tripadvisor (>200 reviews, 4.5+ rating). We verdienen commissie op boekingen via genoemde platforms — dit verandert niets aan de prijs of welke operators we noemen.' : "Rates and route info verified May 2026 on Klook, GetYourGuide, Viator and Tiqets for early-June 2026 bookings from Phuket. Operator reviews validated via Tripadvisor (>200 reviews, 4.5+ rating). We earn a commission on bookings via the listed platforms — this never changes the price you pay or which operators we cover."}</p>
          </section>
        </main>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const file = path.join(process.cwd(), 'data', 'pseo', 'tours', 'phuket-partners.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  return { props: { partners: data.partners, lastUpdated: data.lastUpdated }, revalidate: 604800 };
};
