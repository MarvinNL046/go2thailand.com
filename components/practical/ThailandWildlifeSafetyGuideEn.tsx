import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  Bug,
  CircleAlert,
  CircleHelp,
  Dog,
  ExternalLink,
  Footprints,
  HeartPulse,
  Hospital,
  MapPin,
  ShieldCheck,
  Shirt,
  Waves,
} from 'lucide-react';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';

const PAGE_URL = 'https://go2-thailand.com/travel-guides/dangerous-animals-thailand/';
const UPDATED_AT = '2026-07-27';

const navItems = [
  { href: '#reality' as const, label: 'Reality', icon: BadgeCheck },
  { href: '#situations' as const, label: 'Situations', icon: MapPin },
  { href: '#response' as const, label: 'What to do', icon: HeartPulse },
  { href: '#pack' as const, label: 'Pack', icon: ShieldCheck },
  { href: '#questions' as const, label: 'Questions', icon: CircleHelp },
];

const risks = [
  { title: 'Mosquito bites', cue: 'Common exposure', copy: 'Dengue and other mosquito-borne infections make bite prevention a routine travel task, not a jungle-only concern.', icon: Bug, accent: true },
  { title: 'Dogs and monkeys', cue: 'Avoid contact', copy: 'Bites and scratches require immediate wound washing and prompt medical assessment because rabies exposure cannot be judged from appearance.', icon: Dog },
  { title: 'Snakes', cue: 'Uncommon encounter', copy: 'Use a light after dark, wear closed footwear off maintained paths and never try to catch, identify or move a snake.', icon: Footprints },
  { title: 'Marine life', cue: 'Local conditions', copy: 'Respect beach flags, warning boards and local advice. Jellyfish and other marine hazards differ by coast, season and species.', icon: Waves },
];

const situations = [
  { title: 'City, temple or market', image: '/images/redesign/lopburi-monkey-reality.webp', imageAlt: 'Monkey keeping distance from visitors in Thailand', rule: 'Do not feed, touch or pose closely with monkeys, dogs or cats. Keep food and loose bags controlled.' },
  { title: 'Forest or national park', image: '/images/redesign/khao-sok-jungle-village.webp', imageAlt: 'Maintained path through tropical forest in Thailand', rule: 'Stay on the marked route, use a light after dark and look before placing hands or feet near vegetation.' },
  { title: 'Beach and sea', image: '/images/redesign/koh-samui-ang-thong.webp', imageAlt: 'Island water and beach conditions in the Gulf of Thailand', rule: 'Read the beach warning, ask about current jellyfish or sea conditions and follow lifeguard or operator instructions.' },
];

const faqs = [
  { question: 'What animals should I be aware of in Thailand?', answer: 'For a typical visitor, the practical list is mosquitoes, unfamiliar dogs and cats, monkeys at tourist sites, snakes around vegetation, and local marine hazards such as jellyfish. The useful response is not fear or species hunting: prevent bites, avoid feeding or touching animals, follow beach warnings and know how to reach medical care.' },
  { question: 'Are there dangerous animals in Thailand?', answer: 'Yes, but “present in Thailand” does not mean a traveller is likely to encounter one. Most wildlife avoids people. Everyday prevention—repellent with an evidence-backed active ingredient, closed footwear where appropriate, a light after dark and distance from animals—does more than dramatic animal rankings.' },
  { question: 'Is it safe to swim in the sea in Thailand?', answer: 'Swimming can be appropriate when the beach is open and local conditions are suitable. Check flags and warnings, ask about current jellyfish reports, avoid swimming alone or in rough conditions and follow lifeguard advice. Leave the water and seek help after a significant sting, breathing difficulty, collapse or severe symptoms.' },
  { question: 'How likely am I to see a snake in Thailand?', answer: 'There is no honest tourist-wide probability. Location, season, vegetation, time of day and behaviour all change the chance. Reduce it by using maintained paths, lighting your route after dark, wearing suitable footwear and never reaching blindly into foliage or stored materials.' },
  { question: 'Are mosquitoes in Phuket dangerous?', answer: 'Mosquito-borne illness, including dengue, is a recognised travel-health concern in Thailand, including popular visitor areas. Use a repellent with an active ingredient recommended by CDC, cover exposed skin when practical and follow product instructions. Fever or concerning symptoms during or after travel need medical advice.' },
  { question: 'How to avoid stray dogs in Thailand?', answer: 'Give unfamiliar dogs space, do not run toward or provoke them, avoid walking through a group guarding territory and ask local staff for another route. Any bite or scratch should be washed thoroughly with soap and water and assessed promptly by a medical professional.' },
];

const sources = [
  { title: 'Thailand Traveler View', creator: 'US Centers for Disease Control and Prevention', url: 'https://wwwnc.cdc.gov/travel/destinations/traveler/none/thailand', note: 'Country-specific guidance for mosquito prevention, rabies, animal contact and access to care.' },
  { title: 'Snakebite envenoming: questions and answers', creator: 'World Health Organization', url: 'https://www.who.int/news-room/questions-and-answers/item/snakebite-envenoming', note: 'Primary guidance for prevention, immobilisation, urgent transport and first-aid actions to avoid.' },
  { title: 'Rabies post-exposure prophylaxis guidance', creator: 'US Centers for Disease Control and Prevention', url: 'https://www.cdc.gov/rabies/hcp/clinical-care/post-exposure-prophylaxis.html', note: 'Primary clinical source for immediate wound cleansing and prompt post-exposure assessment.' },
  { title: 'Poisonings, envenomations and toxic exposures during travel', creator: 'CDC Yellow Book', url: 'https://www.cdc.gov/yellow-book/hcp/environmental-hazards-risks/poisonings-envenomations-and-toxic-exposures-during-travel.html', note: 'Clinical travel source for marine-sting context; local instructions still take priority because species matter.' },
];

function schemas() {
  return [
    { '@context':'https://schema.org','@type':'Article',headline:'Dangerous animals in Thailand: realistic risks and what to do',description:'A calm, evidence-led guide to mosquitoes, animal bites, snakes and marine hazards in Thailand.',url:PAGE_URL,image:'https://go2-thailand.com/images/redesign/thailand-wildlife-safety-hero-v2.webp',inLanguage:'en-GB',dateModified:UPDATED_AT,author:{'@type':'Organization',name:'Go2Thailand'},publisher:{'@type':'Organization',name:'Go2Thailand'} },
    { '@context':'https://schema.org','@type':'FAQPage',mainEntity:faqs.map(item=>({'@type':'Question',name:item.question,acceptedAnswer:{'@type':'Answer',text:item.answer}})) },
    { '@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:'https://go2-thailand.com/'},{'@type':'ListItem',position:2,name:'Travel guides',item:'https://go2-thailand.com/travel-guides/'},{'@type':'ListItem',position:3,name:'Dangerous animals in Thailand',item:PAGE_URL}] },
  ];
}

export default function ThailandWildlifeSafetyGuideEn() {
  return <>
    <SEOHead title="Dangerous animals in Thailand: risks and safety" description="Understand the realistic animal risks in Thailand, how to prevent bites and stings, and what to do after contact—using CDC and WHO guidance." ogImage="https://go2-thailand.com/images/redesign/thailand-wildlife-safety-hero-v2.webp">{schemas().map((schema,index)=><script key={index} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>)}</SEOHead>
    <div className="bg-canvas text-charcoal" data-premium-template="wildlife-safety">
      <EditorialHero image="/images/redesign/thailand-wildlife-safety-hero-v2.webp" imageAlt="Traveller following a forest boardwalk while a small snake remains at a safe distance" breadcrumbs={[{label:'Thailand',href:'/'},{label:'Travel guides',href:'/travel-guides/'},{label:'Wildlife safety'}]} eyebrow="Realistic risk · calm response" title={<>Dangerous animals{' '}<br /><span className="text-saffron-dark">in Thailand</span></>} subtitle="Know what deserves attention—and what does not deserve panic." description="Most wildlife encounters are avoidable. The useful priorities are mosquito protection, distance from unfamiliar animals, sensible footwear and light, local sea warnings, and prompt care after any bite or scratch." actions={[{label:'See the real risks',href:'#reality',kind:'primary'},{label:'What to do after contact',href:'#response',kind:'secondary'}]} minHeightClassName="min-h-[720px] lg:min-h-[690px]" titleClassName="max-w-[760px] text-[3.9rem] leading-[.86] sm:text-[5.2rem] lg:text-[6.2rem]" contentClassName="max-w-[720px]" imageClassName="object-cover object-[58%_center]" gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,.04)_0%,rgba(252,250,246,.80)_62%,rgba(252,250,246,.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,.98)_0%,rgba(252,250,246,.86)_40%,rgba(252,250,246,.10)_68%,rgba(8,47,41,.03)_100%)]"/>
      <PageSectionNav items={navItems}/>

      <section id="reality" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"><div className="container-custom grid gap-11 lg:grid-cols-[.7fr_1.3fr]"><SectionHeading eyebrow="Start with probability" title={<>The everyday risk<br />is not the biggest animal.</>} description="A dramatic species list is easy to remember and poor at guiding behaviour. Focus on exposures you can actually prevent."/><div className="grid gap-4 sm:grid-cols-2">{risks.map(({title,cue,copy,icon:Icon,accent})=><article key={title} className={`rounded-2xl border p-6 ${accent?'border-jade bg-jade text-white shadow-editorial-lift':'border-jade/10 bg-white shadow-editorial-card'}`}><Icon size={24} className={accent?'text-saffron':'text-jade'}/><p className={`mt-5 text-[9px] font-extrabold uppercase tracking-[.13em] ${accent?'text-saffron':'text-saffron-dark'}`}>{cue}</p><h2 className={`mt-2 font-display text-[1.8rem] font-semibold ${accent?'text-white':'text-jade'}`}>{title}</h2><p className={`mt-4 text-xs leading-6 ${accent?'text-white/68':'text-charcoal/62'}`}>{copy}</p></article>)}</div></div></section>

      <section id="situations" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20"><div className="container-custom"><SectionHeading eyebrow="Read the setting" title="Three places, three simple rules" description="Your behaviour changes with the setting. The goal is distance and awareness, not trying to identify every species."/><div className="mt-9 grid gap-5 lg:grid-cols-3">{situations.map(item=><article key={item.title} className="overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card"><div className="relative h-60"><Image src={item.image} alt={item.imageAlt} fill sizes="(max-width:1024px) 100vw,33vw" className="object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-jade/82 via-transparent to-transparent"/><h3 className="absolute bottom-5 left-6 font-display text-[1.9rem] font-semibold text-white">{item.title}</h3></div><p className="p-6 text-sm leading-7 text-charcoal/65">{item.rule}</p></article>)}</div></div></section>

      <section id="response" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"><div className="container-custom"><div className="overflow-hidden rounded-[28px] bg-jade text-white shadow-editorial-lift"><div className="grid lg:grid-cols-[.78fr_1.22fr]"><div className="p-8 sm:p-11"><p className="eyebrow !text-saffron">After a bite, scratch or suspected envenoming</p><h2 className="font-display text-[3.2rem] font-semibold leading-[.9]">Act early.<br />Do less yourself.</h2><p className="mt-5 text-sm leading-7 text-white/68">This is general travel information, not a diagnosis. Severe symptoms, breathing trouble, collapse or suspected snakebite require emergency help.</p></div><div className="grid gap-3 bg-white/[.055] p-7 sm:grid-cols-2 sm:p-10">{[
        ['Animal bite or scratch','Wash thoroughly with soap and running water, then seek prompt medical assessment for rabies and wound care.',Dog],['Suspected snakebite','Move away, keep the person still, remove tight items and arrange urgent transport. Do not cut, suck or use a narrow tourniquet.',Footprints],['Marine sting','Leave the water, alert a lifeguard or local responder and follow species-appropriate local first aid. Severe symptoms need urgent care.',Waves],['Fever after bites','Seek medical advice and mention your Thailand travel and timing; do not diagnose dengue or another infection from symptoms alone.',Hospital],
      ].map(([title,copy,Icon])=>{const I=Icon as typeof Dog;return <article key={String(title)} className="rounded-2xl border border-white/13 bg-white/[.07] p-5"><I size={21} className="text-saffron"/><h3 className="mt-4 text-sm font-extrabold">{String(title)}</h3><p className="mt-2 text-[10px] leading-5 text-white/58">{String(copy)}</p></article>})}</div></div></div><aside className="mt-6 flex items-start gap-4 rounded-2xl border border-saffron/25 bg-[#fff7eb] p-6 text-jade"><CircleAlert className="mt-1 shrink-0 text-saffron-dark"/><p className="text-xs leading-6"><strong>Do not wait for an online species ID before seeking care.</strong> A distant photo may help professionals, but never approach, catch or kill an animal to obtain one.</p></aside></div></section>

      <section id="pack" className="section-divider-bottom scroll-mt-24 bg-mist py-14 lg:py-20"><div className="container-custom grid gap-10 lg:grid-cols-[.7fr_1.3fr]"><SectionHeading eyebrow="Practical, not tactical" title="Pack for prevention" description="These are ordinary travel items, not protective equipment or medical treatment. Choose suitability and current product details yourself."/><div className="grid gap-4 sm:grid-cols-3">{[
        ['Quick-dry long-sleeve layer','Useful when you want to cover skin in high-exposure settings; it does not replace an effective repellent.','hovsiyla-quick-dry-shirt',Shirt],['Water shoes','A barrier for some rocky or hot surfaces; never a licence to step on coral or ignore beach warnings.','simari-water-shoes',Waves],['Packable daypack','Keeps water, a light layer and locally chosen repellent together on an outdoor day.','venture-pal-packable-backpack',ShieldCheck],
      ].map(([title,copy,slug,Icon])=>{const I=Icon as typeof Shirt;return <article key={String(title)} className="flex min-h-[270px] flex-col rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><I className="text-jade"/><h3 className="mt-6 font-display text-[1.6rem] font-semibold text-jade">{String(title)}</h3><p className="mt-4 flex-1 text-xs leading-6 text-charcoal/62">{String(copy)}</p><a href={`/go/${slug}/`} target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-6 inline-flex items-center gap-2 text-[10px] font-extrabold text-saffron-dark">Check current price at Amazon <ExternalLink size={12}/></a></article>})}<AffiliateDisclosure className="sm:col-span-3">Amazon affiliate links through our central /go/ router. As an Amazon Associate we earn from qualifying purchases at no extra cost to you. OneLink may route you to a local store; product, seller, fit, delivery and availability vary. These products do not prevent or treat disease.</AffiliateDisclosure></div></div></section>

      <FaqSplitSection eyebrow="Real search questions" title="Dangerous animals in Thailand FAQs" description="These questions were returned verbatim in UK Google People Also Ask results captured through DataForSEO on 27 July 2026. Irrelevant mortality questions were deliberately excluded." items={faqs}/>
      <RelatedGuidesSection title="Prepare the rest of your health plan" guides={[{title:'Vaccinations and travel health',description:'Build your pre-travel health checklist with official-source context.',href:'/travel-guides/vaccinations-travel-health-thailand/',image:'/images/redesign/thailand-vaccinations-hero.webp',imageAlt:'Travel health preparation for Thailand'},{title:'Health and hospitals',description:'Understand where to seek care and what information to keep available.',href:'/travel-guides/health-hospitals-thailand/',image:'/images/redesign/thailand-vaccinations-kit.webp',imageAlt:'Practical health kit for Thailand'},{title:'National parks',description:'Plan wildlife encounters around marked routes, park guidance and realistic access.',href:'/travel-guides/national-parks-thailand/',image:'/images/redesign/khao-sok-jungle-village.webp',imageAlt:'Tropical national park in Thailand'}]}/>
      <SourceMethodSection title="How this safety guide was made" description="The English owner, six preserved ranking keywords, backlink footprint, 22-keyword DFS cluster, competitor field and exact People Also Ask set were captured on 27 July 2026. Health and first-aid guidance is limited to primary CDC and WHO sources. This page cannot assess an individual exposure or replace medical care." sources={sources}/>
    </div>
  </>;
}
