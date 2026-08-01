import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Banknote, HeartPulse, Luggage, MessageCircleHeart, ShieldCheck } from 'lucide-react';
import SEOHead from '../SEOHead';
import { EditorialHero } from '../design/EditorialHero';
import { PageSectionNav } from '../design/PageSectionNav';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';

const guides = [
  { title: 'Scams & veiligheid', description: 'Herken druk, omleiding en betaaltrucs en bewaar een korte noodroute.', href: '/practical-info/scams-safety/', image: '/images/redesign/thailand-safety-hero.webp', icon: ShieldCheck, label: 'Ter plekke' },
  { title: 'Pinnen & betalen', description: 'Vergelijk ATM, cash, kaart, DCC en wisselen zonder verouderde vaste bedragen.', href: '/practical-info/atm-money/', image: '/images/redesign/thailand-money-atm-hero-nl.webp', icon: Banknote, label: 'Betaalplan' },
  { title: 'Paklijst Thailand', description: 'Pak op reisstijl, seizoen en activiteit — met minder spullen en een betere back-up.', href: '/travel-gear/', image: '/images/redesign/travel-gear-hero.webp', icon: Luggage, label: 'Voor vertrek' },
  { title: 'Gezondheid & vaccinaties', description: 'Maak met officiële gezondheidsbronnen en persoonlijk advies je voorbereiding compleet.', href: '/practical-info/health-vaccinations/', image: '/images/redesign/thailand-vaccinations-hero.webp', icon: HeartPulse, label: 'Gezondheid' },
  { title: 'Thaise etiquette', description: 'Lees situaties in context: begroeten, tempels, tafel, kleding en actuele regels.', href: '/practical-info/etiquette-culture/', image: '/images/redesign/thailand-etiquette-hero.webp', icon: MessageCircleHeart, label: 'Respectvol reizen' },
];

const schemas = [
  { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Thailand reis voorbereiden: praktische informatie', description: 'Praktische voorbereiding voor Thailand: veiligheid, geld, paklijst, gezondheid en etiquette.', url: 'https://go2-thailand.com/nl/practical-info/', inLanguage: 'nl-NL', mainEntity: { '@type': 'ItemList', itemListElement: guides.map((guide, index) => ({ '@type': 'ListItem', position: index + 1, name: guide.title, url: `https://go2-thailand.com/nl${guide.href}` })) } },
  { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/nl/' }, { '@type': 'ListItem', position: 2, name: 'Praktische informatie', item: 'https://go2-thailand.com/nl/practical-info/' }] },
];

export default function PracticalInfoHubGuide() {
  return <>
    <SEOHead title="Thailand reis voorbereiden: praktische informatie" description="Bereid je Thailandreis voor met gidsen over veiligheid, pinnen en betalen, paklijst, vaccinaties en Thaise etiquette.">
      {schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
    </SEOHead>
    <div data-premium-template="practical-info-hub" className="overflow-hidden bg-canvas text-charcoal">
      <EditorialHero image="/images/redesign/thailand-practical-hub-hero-nl.webp" imageAlt="Reisvoorbereiding voor Thailand met kaart, telefoon, kleding, water en EHBO-set" breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Praktische informatie' }]} eyebrow="Eerst regelen, daarna loslaten" title={<>Thailand reis<br /><span className="text-saffron-dark">voorbereiden.</span></>} description="Geen eindeloze checklist, maar vijf beslissingen die onderweg verschil maken. Begin bij jouw grootste onzekerheid en open daarna alleen de specialistische gids die je nodig hebt." actions={[{ label: 'Kies je startpunt', href: '#gidsen', kind: 'primary' }, { label: 'Bouw je reisplan', href: '#route', kind: 'secondary' }]} imageClassName="object-cover object-[64%_center] lg:object-center" />
      <PageSectionNav items={[{ href: '#gidsen', label: 'Gidsen', icon: Luggage }, { href: '#route', label: 'Voorbereiden', icon: ShieldCheck }, { href: '#bronnen', label: 'Bronnen', icon: MessageCircleHeart }]} />

      <section id="gidsen" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24"><div className="container-custom"><SectionHeading eyebrow="Vijf duidelijke owners" title="Open alleen wat je nu moet beslissen." description="Elke kaart heeft een eigen taak. Zo hoef je niet door herhaalde veiligheidstips, oude prijsregels of algemene paklijsten te zoeken." /><div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{guides.map((guide, index) => { const Icon = guide.icon; return <Link key={guide.href} href={guide.href} className={`group overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card ${index < 2 ? 'lg:col-span-1' : ''}`}><div className="relative h-48 overflow-hidden"><Image src={guide.image} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.035]" /><div className="absolute inset-0 bg-gradient-to-t from-jade/65 to-transparent" /><span className="absolute bottom-4 left-4 rounded-full bg-ivory/90 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-jade">{guide.label}</span></div><div className="p-6"><Icon size={20} className="text-saffron-dark" /><h2 className="mt-4 font-display text-[2rem] font-semibold leading-none text-jade">{guide.title}</h2><p className="mt-4 text-xs font-medium leading-6 text-charcoal/62">{guide.description}</p><span className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-jade">Open de gids <ArrowRight size={14} className="text-saffron-dark transition group-hover:translate-x-1" /></span></div></Link>; })}</div></div></section>

      <section id="route" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24"><div className="container-custom grid gap-12 lg:grid-cols-[0.72fr_1.28fr]"><SectionHeading eyebrow="Van boeking naar vertrek" title="Drie controlemomenten zijn genoeg." description="Regels, tarieven en reisadviezen veranderen. Plan daarom niet alleen wat je controleert, maar ook wanneer je het opnieuw controleert." /><div className="grid gap-4 sm:grid-cols-3">{[
        ['01', 'Bij het boeken', 'Controleer paspoort, visumroute, verzekering en hoe je de eerste dag betaalt en reist.'],
        ['02', 'Een paar weken vooraf', 'Bespreek gezondheid persoonlijk, rond paklijst af en download boekingen en noodcontacten.'],
        ['03', 'Vlak voor vertrek', 'Hercontroleer reisadvies, operationele tijden, bankinstellingen en je route vanaf de luchthaven.'],
      ].map(([number, title, text]) => <article key={number} className="rounded-2xl border border-jade/10 bg-white p-6"><span className="font-display text-3xl text-saffron-dark">{number}</span><h2 className="mt-6 font-display text-2xl font-semibold text-jade">{title}</h2><p className="mt-4 text-xs font-medium leading-6 text-charcoal/62">{text}</p></article>)}</div></div></section>

      <div id="bronnen" className="scroll-mt-24"><SourceMethodSection title="Actueel vóór volledig" description="Deze hub is de navigatie-owner voor praktische voorbereiding. Medische, financiële en veiligheidsdetails staan bewust bij de specialistische pagina en worden niet hier herhaald. Controleer veranderlijke informatie altijd nogmaals bij de primaire bron." sources={[
        { title: 'Reisadvies Thailand', creator: 'NederlandWereldwijd', url: 'https://www.nederlandwereldwijd.nl/reisadvies/thailand', note: 'Actuele regionale veiligheids- en consulaire informatie.' },
        { title: 'Thailand travel information', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/', note: 'Officiële bestemmings- en operationele reisinformatie.' },
        { title: 'Reisvaccinaties en persoonlijk advies', creator: 'GGD Reisvaccinaties', url: 'https://www.ggdreisvaccinaties.nl/', note: 'Persoonlijke gezondheidsvoorbereiding; geen generieke webpagina vervangt medisch advies.' },
      ]} /></div>
    </div>
  </>;
}
