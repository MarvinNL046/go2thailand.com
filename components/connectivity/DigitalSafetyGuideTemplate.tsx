import Link from 'next/link';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav, type PageSectionNavItem } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';

interface DecisionCard {
  eyebrow: string;
  title: string;
  verdict: string;
  copy: string;
  icon: LucideIcon;
  tone: 'light' | 'tonal' | 'dark';
}

export interface DigitalSafetyGuideData {
  locale: 'en' | 'nl';
  pageUrl: string;
  updatedAt: string;
  title: string;
  description: string;
  heroImage: string;
  heroAlt: string;
  breadcrumbs: Array<{ label: string; href?: string }>;
  heroEyebrow: string;
  heroTitle: ReactNode;
  heroSubtitle: string;
  heroDescription: string;
  vpnHref: string;
  navItems: PageSectionNavItem[];
  decisions: DecisionCard[];
  protects: Array<{ title: string; copy: string; icon: LucideIcon }>;
  limits: Array<{ title: string; copy: string; icon: LucideIcon }>;
  contexts: Array<{ network: string; firstMove: string; vpnRole: string; watch: string; icon: LucideIcon }>;
  selectionCriteria: Array<{ title: string; copy: string; proof: string; icon: LucideIcon }>;
  setupSteps: Array<{ step: string; title: string; copy: string; icon: LucideIcon }>;
  layers: Array<{ number: string; title: string; copy: string; href?: string; icon: LucideIcon }>;
  nextSteps: Array<{ title: string; copy: string; href: string; label: string; icon: LucideIcon; affiliate?: boolean }>;
  faqs: Array<{ question: string; answer: string }>;
  related: Array<{ title: string; description: string; href: string; image: string; imageAlt: string }>;
  sources: Array<{ title: string; creator: string; url: string; note: string }>;
  methodDescription: string;
}

function schemas(data: DigitalSafetyGuideData) {
  return [
    { '@context': 'https://schema.org', '@type': 'Article', headline: data.title, description: data.description, url: data.pageUrl, image: `https://go2-thailand.com${data.heroImage}`, inLanguage: data.locale === 'nl' ? 'nl-NL' : 'en-GB', dateModified: data.updatedAt, author: { '@type': 'Organization', name: 'Go2Thailand' }, publisher: { '@type': 'Organization', name: 'Go2Thailand' } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: data.breadcrumbs.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.label, item: item.href ? `https://go2-thailand.com${item.href}` : data.pageUrl })) },
    { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Thailand VPN connection decisions', numberOfItems: data.decisions.length, itemListElement: data.decisions.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.title, description: item.copy })) },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: data.faqs.map(({ question, answer }) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) },
  ];
}

export function DigitalSafetyGuideTemplate({ data }: { data: DigitalSafetyGuideData }) {
  const nl = data.locale === 'nl';
  const ui = nl ? {
    template: 'digital-safety-guide-nl', heroPrimary: 'Bekijk wanneer een VPN helpt', heroSecondary: 'Bekijk het actuele NordVPN-aanbod', disclosure: 'De NordVPN-link is gesponsord. Wij kunnen zonder extra kosten voor jou commissie ontvangen. Controleer vóór aankoop het actuele abonnement, de verlenging, ondersteunde apparaten en restitutievoorwaarden.', nav: 'Op deze Thailand VPN-gids',
    decisionEyebrow: 'Begin bij de verbinding', decisionTitle: <>Heb je in Thailand<br />een VPN nodig?</>, decisionCopy: 'Niet bij iedere tik. Een VPN is vooral nuttig op gedeelde of onduidelijke wifi, voor een werkgeversvereiste of wanneer je bewust een andere netwerklocatie nodig hebt. Het is geen vergunning, antivirus of onzichtbaarheidsmantel.',
    protectEyebrow: 'Wat de tunnel kan beschermen', protectTitle: <>Eén verbinding.<br />Tussen twee eindpunten.</>, limitEyebrow: 'Wat hij niet kan beloven', limitTitle: <>Privacy is geen<br />anonimiteit.</>,
    networksEyebrow: 'Digitale veiligheid van deur tot deur', networksTitle: <>Koppel het middel<br />aan het netwerk.</>, networksCopy: 'Een eerlijk universeel label als ‘wifi met hoog risico’ bestaat niet. Kijk naar waarneembare signalen: wie beheert het netwerk, klopt de netwerknaam, wat wil je doen en is je apparaat bijgewerkt.', table: ['Verbinding', 'Eerste stap', 'Rol van VPN', 'Let op'],
    lawEyebrow: 'Software versus gedrag', lawTitle: <>Een VPN herschrijft<br />de Thaise wet niet.</>, lawLead: 'De officiële Thaise bronnen over computerwetgeving die voor deze gids zijn gecontroleerd, regelen computergerelateerd gedrag en content; een reiziger krijgt geen algemene toestemming of immuniteit doordat verkeer via een VPN loopt.', lawCopy: 'Daarom gebruiken we geen absoluut legaliteitslabel. VPN-software wordt breed aangeboden en gebruikt, maar de onderliggende handeling, content, platformvoorwaarden en eventuele werkregels blijven gelden. Dit is praktische reisinformatie, geen juridisch advies. Controleer actuele officiële informatie bij gevoelig gebruik.', lawLink: 'Lees de context over Thaise regels en etiquette',
    chooseEyebrow: 'Kies op bewijs', chooseTitle: <>Zes controles vóór<br />je een abonnement neemt.</>, chooseCopy: '‘Snelste’ en ‘beste’ veranderen per netwerk, server, apparaat en testmethode. Vergelijk wat je voor jouw reis kunt verifiëren in plaats van een gesponsorde ranglijst als blijvend feit te zien.', verify: 'Controleer:',
    setupEyebrow: 'Instellen vóór vertrek', setupTitle: <>De verbindingsroutine<br />in zes stappen.</>, setupCopy: 'Installeer, update en test thuis. Verbind in Thailand eerst met het juiste netwerk, rond een eventuele inlogpagina af en activeer daarna de VPN vóór gevoelig werk.',
    layersEyebrow: 'Drie losse lagen', layersTitle: <>Verbinding.<br />Tunnel. Account.</>, layersCopy: 'Een eSIM brengt het apparaat online. Een VPN kan netwerkverkeer tunnelen. Accountbeveiliging blijft afhangen van updates, unieke wachtwoorden en multifactorauthenticatie. Het ene vervangt het andere niet.', specialist: 'Open de specialistische gids',
    nextEyebrow: 'Actuele vervolgstappen', nextTitle: <>Kies de laag die je<br />werkelijk nodig hebt.</>, nextCopy: 'Controleer actuele voorwaarden in plaats van op een oude maandprijs te vertrouwen. De gesponsorde optie is duidelijk gemarkeerd; de redactionele criteria hierboven gelden voor iedere aanbieder.', affiliateDisclosure: 'Gesponsorde VPN- en eSIM-links tonen actuele commerciële aanbiedingen. Go2Thailand bepaalt het abonnement, de verlenging, dekking, serverbeschikbaarheid, apparaatondersteuning, prijs en restitutievoorwaarden niet.',
    faqEyebrow: 'Echte zoekvragen', faqTitle: 'Vragen over VPN in Thailand', faqCopy: 'Gebaseerd op actuele Nederlandse zoekresultaten en beantwoord zonder anonimiteit, universele toegang, vaste snelheid of immuniteit voor Thaise wetgeving en servicevoorwaarden te beloven.', relatedEyebrow: 'Verder plannen', relatedTitle: 'Maak je verbindingspakket compleet', relatedLabel: 'Open de gids', sourceEyebrow: 'Bronnen & methode', sourceTitle: 'Beveiligingsclaims hebben grenzen nodig',
  } : {
    template: 'digital-safety-guide-en', heroPrimary: 'See when a VPN helps', heroSecondary: 'Check the current NordVPN plan', disclosure: 'The NordVPN link is sponsored. We may earn a commission at no extra cost to you. Check the current plan, renewal terms, supported devices and refund conditions before buying.', nav: 'On this Thailand VPN guide',
    decisionEyebrow: 'Start with the connection', decisionTitle: <>Do you need<br />a VPN in Thailand?</>, decisionCopy: 'Not for every tap. A VPN is most useful on shared or untrusted Wi-Fi, for a company requirement, or when you deliberately need a different network location. It is not a licence, antivirus product or invisibility cloak.',
    protectEyebrow: 'What the tunnel can protect', protectTitle: <>One connection.<br />Between two endpoints.</>, limitEyebrow: 'What it cannot promise', limitTitle: <>Privacy is not<br />anonymity.</>,
    networksEyebrow: 'Door-to-door digital safety', networksTitle: <>Match the tool<br />to the network.</>, networksCopy: 'There is no honest universal “high-risk café” label. Use observable signals: who operates the network, whether it is the correct network, what you plan to do and whether your device is updated.', table: ['Connection', 'First move', 'VPN role', 'Watch'],
    lawEyebrow: 'Software versus behaviour', lawTitle: <>A VPN does not<br />rewrite Thai law.</>, lawLead: 'The official Thai computer-law sources checked for this guide regulate computer-related conduct and content; they do not give a traveller blanket permission or immunity because traffic uses a VPN.', lawCopy: 'We therefore avoid an absolute legality badge. VPN software is widely offered and commonly used, but the underlying action, content, platform terms and any work-policy rules still apply. This is practical travel information, not legal advice. Check current official guidance if your use case is sensitive.', lawLink: 'Read the Thailand law-and-etiquette context',
    chooseEyebrow: 'Choose by evidence', chooseTitle: <>Six checks before<br />you subscribe.</>, chooseCopy: '“Fastest” and “best” change by network, server, device and test method. Compare capabilities you can verify for your own trip instead of treating a sponsored ranking as a permanent fact.', verify: 'Verify:',
    setupEyebrow: 'Set up before departure', setupTitle: <>The six-step<br />connection habit.</>, setupCopy: 'Install, update and test at home. In Thailand, join the correct network, clear any captive portal, then establish the VPN before sensitive work.',
    layersEyebrow: 'Three separate layers', layersTitle: <>Connection.<br />Tunnel. Account.</>, layersCopy: 'An eSIM gets the device online. A VPN can tunnel network traffic. Account security still depends on updates, unique credentials and multi-factor authentication. Buying one does not replace the others.', specialist: 'Open the specialist guide',
    nextEyebrow: 'Current next steps', nextTitle: <>Choose the layer<br />you actually need.</>, nextCopy: 'Check live terms rather than relying on an old monthly price. The sponsored option is clearly labelled; the editorial criteria above apply to any provider.', affiliateDisclosure: 'Sponsored VPN and eSIM links show current commercial offers. Go2Thailand does not set the plan, renewal, coverage, server availability, device support, price or refund conditions.',
    faqEyebrow: 'Genuine search questions', faqTitle: 'Thailand VPN questions', faqCopy: 'Captured from ten live UK-English SERPs and answered without promising anonymity, universal access, fixed speed or immunity from Thai law and service terms.', relatedEyebrow: 'Continue planning', relatedTitle: 'Complete the connection stack', relatedLabel: 'Open the guide', sourceEyebrow: 'Sources & method', sourceTitle: 'Security claims need boundaries',
  };
  return (
    <div className="bg-canvas" data-premium-template={ui.template}>
      <SEOHead title={data.title} description={data.description} ogImage={`https://go2-thailand.com${data.heroImage}`}>
        {schemas(data).map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      </SEOHead>

      <EditorialHero
        image={data.heroImage}
        imageAlt={data.heroAlt}
        breadcrumbs={data.breadcrumbs}
        eyebrow={data.heroEyebrow}
        title={data.heroTitle}
        subtitle={data.heroSubtitle}
        description={data.heroDescription}
        actions={[
          { label: ui.heroPrimary, href: '#decision', kind: 'primary' },
          { label: ui.heroSecondary, href: data.vpnHref, kind: 'secondary', newTab: true, affiliate: true },
        ]}
        disclosure={ui.disclosure}
        minHeightClassName="min-h-[760px] lg:min-h-[700px]"
        contentClassName="max-w-[760px]"
        titleClassName="max-w-[820px] text-[3.65rem] leading-[.86] sm:text-[4.9rem] lg:text-[5.7rem]"
        imageClassName="object-cover object-[68%_center] lg:object-center"
        gradientClassName="bg-[linear-gradient(180deg,rgba(7,43,35,.22)_0%,rgba(7,43,35,.78)_35%,rgba(7,43,35,.8)_78%,rgba(252,250,246,.94)_91%,rgba(252,250,246,.98)_100%)] lg:bg-[linear-gradient(90deg,rgba(7,43,35,.98)_0%,rgba(7,43,35,.92)_40%,rgba(7,43,35,.26)_67%,rgba(7,43,35,.04)_100%)]"
        contentTone="light"
      />
      <PageSectionNav label={ui.nav} items={data.navItems} />

      <section id="decision" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><SectionHeading eyebrow={ui.decisionEyebrow} title={ui.decisionTitle} /><p className="max-w-[760px] text-sm font-medium leading-7 text-charcoal/64">{ui.decisionCopy}</p></div>
          <div className="mt-10 grid gap-px overflow-hidden rounded-[26px] border border-jade/10 bg-jade/10 md:grid-cols-2 lg:grid-cols-4">
            {data.decisions.map(({ eyebrow, title, verdict, copy, icon: Icon, tone }) => {
              const dark = tone === 'dark';
              return <article key={title} className={`flex min-h-[320px] flex-col p-7 ${dark ? 'bg-jade text-white' : tone === 'tonal' ? 'bg-tonal text-jade' : 'bg-white text-jade'}`}><div className="flex items-center justify-between"><Icon size={24} className={dark ? 'text-saffron-light' : 'text-jade'} /><span className={`rounded-full px-3 py-1 text-[8px] font-extrabold uppercase tracking-[.12em] ${dark ? 'bg-white/10 text-saffron-light' : 'bg-saffron/10 text-saffron-dark'}`}>{verdict}</span></div><p className={`mt-8 text-[9px] font-extrabold uppercase tracking-[.14em] ${dark ? 'text-white/42' : 'text-jade/42'}`}>{eyebrow}</p><h2 className="mt-2 font-display text-[1.8rem] font-semibold leading-none">{title}</h2><p className={`mt-5 text-xs font-medium leading-6 ${dark ? 'text-white/64' : 'text-charcoal/62'}`}>{copy}</p></article>;
            })}
          </div>
        </div>
      </section>

      <section id="scope" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
        <div className="container-custom grid gap-8 lg:grid-cols-2">
          <article className="rounded-[26px] border border-jade/10 bg-white p-7 shadow-editorial-card lg:p-9">
            <p className="eyebrow">{ui.protectEyebrow}</p>
            <h2 className="font-display text-[2.7rem] font-semibold leading-[.92] text-jade">{ui.protectTitle}</h2>
            <div className="mt-8 space-y-5">{data.protects.map(({ title, copy, icon: Icon }) => <div key={title} className="grid grid-cols-[44px_1fr] gap-4 border-t border-jade/10 pt-5"><span className="grid h-10 w-10 place-items-center rounded-xl bg-mist text-jade"><Icon size={20} /></span><div><h3 className="font-display text-xl font-semibold text-jade">{title}</h3><p className="mt-1 text-xs font-medium leading-6 text-charcoal/62">{copy}</p></div></div>)}</div>
          </article>
          <article className="relative overflow-hidden rounded-[26px] bg-jade p-7 text-white shadow-editorial-card lg:p-9">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />
            <p className="eyebrow !text-saffron-light">{ui.limitEyebrow}</p>
            <h2 className="font-display text-[2.7rem] font-semibold leading-[.92]">{ui.limitTitle}</h2>
            <div className="mt-8 space-y-5">{data.limits.map(({ title, copy, icon: Icon }) => <div key={title} className="grid grid-cols-[44px_1fr] gap-4 border-t border-white/12 pt-5"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white/[.07] text-saffron-light"><Icon size={20} /></span><div><h3 className="font-display text-xl font-semibold">{title}</h3><p className="mt-1 text-xs font-medium leading-6 text-white/62">{copy}</p></div></div>)}</div>
          </article>
        </div>
      </section>

      <section id="networks" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><SectionHeading eyebrow={ui.networksEyebrow} title={ui.networksTitle} /><p className="max-w-[760px] text-sm font-medium leading-7 text-charcoal/64">{ui.networksCopy}</p></div>
          <div className="mt-10 overflow-x-auto rounded-2xl border border-jade/10 bg-white shadow-editorial-card"><table className="w-full min-w-[900px] border-collapse text-left"><thead className="bg-jade text-[9px] font-extrabold uppercase tracking-[.14em] text-saffron-light"><tr>{ui.table.map((label) => <th key={label} className="p-5">{label}</th>)}</tr></thead><tbody>{data.contexts.map(({ network, firstMove, vpnRole, watch, icon: Icon }) => <tr key={network} className="border-t border-jade/10 align-top"><th scope="row" className="p-5"><span className="flex items-center gap-3 font-display text-[1.3rem] font-semibold text-jade"><Icon size={20} />{network}</span></th><td className="p-5 text-xs font-medium leading-6 text-charcoal/62">{firstMove}</td><td className="p-5 text-xs font-extrabold leading-6 text-jade">{vpnRole}</td><td className="p-5 text-xs font-medium leading-6 text-charcoal/62">{watch}</td></tr>)}</tbody></table></div>
        </div>
      </section>

      <section id="law" className="section-divider-bottom scroll-mt-24 bg-jade py-14 text-white lg:py-20">
        <div className="container-custom grid gap-10 lg:grid-cols-[.68fr_1.32fr] lg:items-center">
          <div><p className="eyebrow !text-saffron-light">{ui.lawEyebrow}</p><h2 className="font-display text-[3.2rem] font-semibold leading-[.9]">{ui.lawTitle}</h2></div>
          <div className="rounded-[24px] border border-white/14 bg-white/[.06] p-7 lg:p-9"><p className="font-display text-[1.75rem] font-semibold leading-tight">{ui.lawLead}</p><p className="mt-5 text-sm font-medium leading-7 text-white/64">{ui.lawCopy}</p><Link href="/practical-info/etiquette-culture/" className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-saffron-light">{ui.lawLink} <ArrowRight size={13} /></Link></div>
        </div>
      </section>

      <section id="choose" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
        <div className="container-custom"><div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><SectionHeading eyebrow={ui.chooseEyebrow} title={ui.chooseTitle} /><p className="max-w-[760px] text-sm font-medium leading-7 text-charcoal/64">{ui.chooseCopy}</p></div><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{data.selectionCriteria.map(({ title, copy, proof, icon: Icon }) => <article key={title} className="flex min-h-[280px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><Icon size={24} className="text-jade" /><h3 className="mt-6 font-display text-[1.55rem] font-semibold text-jade">{title}</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/62">{copy}</p><p className="mt-auto border-t border-jade/10 pt-5 text-[10px] font-extrabold leading-5 text-saffron-dark">{ui.verify} {proof}</p></article>)}</div></div>
      </section>

      <section id="setup" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
        <div className="container-custom grid gap-10 lg:grid-cols-[.64fr_1.36fr]">
          <div><SectionHeading eyebrow={ui.setupEyebrow} title={ui.setupTitle} description={ui.setupCopy} /><svg aria-hidden="true" viewBox="0 0 360 110" className="mt-8 hidden h-24 w-full max-w-sm text-saffron lg:block"><path d="M8 72 C70 18 94 101 160 54 S267 21 350 70" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 8" strokeLinecap="round" /><circle cx="8" cy="72" r="5" fill="currentColor" /><circle cx="160" cy="54" r="4" fill="currentColor" /><circle cx="350" cy="70" r="5" fill="currentColor" /></svg></div>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-jade/10 bg-jade/10 sm:grid-cols-2 lg:grid-cols-3">{data.setupSteps.map(({ step, title, copy, icon: Icon }, index) => <article key={step} className={`min-h-[245px] p-6 ${index === 4 ? 'bg-jade text-white' : index % 2 ? 'bg-tonal text-jade' : 'bg-white text-jade'}`}><div className="flex items-center justify-between"><Icon size={22} className={index === 4 ? 'text-saffron-light' : 'text-jade'} /><span className={`font-display text-3xl font-semibold ${index === 4 ? 'text-white/20' : 'text-jade/16'}`}>{step}</span></div><h3 className="mt-6 font-display text-[1.45rem] font-semibold">{title}</h3><p className={`mt-3 text-[11px] font-medium leading-6 ${index === 4 ? 'text-white/62' : 'text-charcoal/62'}`}>{copy}</p></article>)}</div>
        </div>
      </section>

      <section id="layers" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
        <div className="container-custom"><div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><SectionHeading eyebrow={ui.layersEyebrow} title={ui.layersTitle} /><p className="max-w-[760px] text-sm font-medium leading-7 text-charcoal/64">{ui.layersCopy}</p></div><div className="mt-10 grid gap-5 lg:grid-cols-3">{data.layers.map(({ number, title, copy, href, icon: Icon }) => <article key={number} className="rounded-[22px] border border-jade/10 bg-white p-7 shadow-editorial-card"><div className="flex items-center justify-between"><Icon size={25} className="text-jade" /><span className="font-display text-[2.2rem] font-semibold text-jade/16">{number}</span></div><h3 className="mt-7 font-display text-[1.8rem] font-semibold text-jade">{title}</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/62">{copy}</p>{href && <Link href={href} className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-jade">{ui.specialist} <ArrowRight size={13} /></Link>}</article>)}</div></div>
      </section>

      <section id="next" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
        <div className="container-custom"><div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><SectionHeading eyebrow={ui.nextEyebrow} title={ui.nextTitle} /><p className="max-w-[760px] text-sm font-medium leading-7 text-charcoal/64">{ui.nextCopy}</p></div><div className="mt-10 grid gap-4 md:grid-cols-3">{data.nextSteps.map(({ title, copy, href, label, icon: Icon, affiliate }) => <article key={title} className="flex min-h-[285px] flex-col rounded-2xl border border-jade/10 bg-white p-7 shadow-editorial-card"><Icon size={25} className="text-jade" /><h3 className="mt-6 font-display text-[1.7rem] font-semibold text-jade">{title}</h3><p className="mt-4 flex-1 text-xs font-medium leading-6 text-charcoal/62">{copy}</p>{affiliate ? <a href={href} target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-saffron-dark">{label} <ExternalLink size={13} /></a> : <Link href={href} className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-jade">{label} <ArrowRight size={13} /></Link>}</article>)}</div><AffiliateDisclosure className="mt-4">{ui.affiliateDisclosure}</AffiliateDisclosure></div>
      </section>

      <FaqSplitSection id="questions" eyebrow={ui.faqEyebrow} title={ui.faqTitle} description={ui.faqCopy} items={data.faqs} />
      <RelatedGuidesSection eyebrow={ui.relatedEyebrow} title={ui.relatedTitle} readLabel={ui.relatedLabel} guides={data.related} />
      <SourceMethodSection eyebrow={ui.sourceEyebrow} title={ui.sourceTitle} description={data.methodDescription} sources={data.sources} />
    </div>
  );
}
