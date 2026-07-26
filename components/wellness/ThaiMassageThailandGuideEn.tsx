import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  BadgeCheck,
  Check,
  CircleAlert,
  CircleHelp,
  Clock3,
  Droplets,
  ExternalLink,
  Footprints,
  Hand,
  HeartHandshake,
  Leaf,
  MapPin,
  MessageCircle,
  ScanLine,
  ShieldCheck,
  Shirt,
  Sparkles,
  ThermometerSun,
  WalletCards,
} from 'lucide-react';
import { KLOOK_GENERIC, withPlacementSubId } from '../../lib/affiliates';
import { useSubId } from '../../lib/useSubId';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav, type PageSectionNavItem } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';

const PAGE_URL = 'https://go2-thailand.com/blog/thai-massage-guide-types-prices/';
const HERO_IMAGE = '/images/redesign/thai-massage-hero.webp';
const PAGE_TITLE = 'Thai massage in Thailand: types, price, etiquette and safety';
const PAGE_DESCRIPTION = 'Choose a Thai massage with confidence. Compare traditional, oil, foot and herbal compress sessions, what to wear, current price checks, consent, etiquette and safety.';

const navItems: PageSectionNavItem[] = [
  { href: '#choose', label: 'Choose', icon: BadgeCheck },
  { href: '#types', label: 'Types', icon: Hand },
  { href: '#price', label: 'Price', icon: WalletCards },
  { href: '#before', label: 'Before', icon: Shirt },
  { href: '#consent', label: 'Consent', icon: HeartHandshake },
  { href: '#safety', label: 'Safety', icon: ShieldCheck },
  { href: '#questions', label: 'Questions', icon: CircleHelp },
];

const massageChoices: Array<{
  icon: LucideIcon;
  title: string;
  cue: string;
  description: string;
  expect: string;
  chooseWhen: string;
}> = [
  {
    icon: Shirt,
    title: 'Traditional Thai',
    cue: 'Clothed · no oil',
    description: 'You usually lie on a mat in loose clothing. The practitioner may use hands, thumbs and body weight, then guide limbs into supported positions or stretches.',
    expect: 'More active than a quiet oil massage. Pressure and movement should remain adjustable throughout the session.',
    chooseWhen: 'You want to stay clothed and are curious about pressure combined with movement.',
  },
  {
    icon: Droplets,
    title: 'Thai oil massage',
    cue: 'Draping · gliding work',
    description: 'Oil is applied to selected areas of skin while the rest of the body should remain appropriately covered. Style, pressure and products differ by spa and menu.',
    expect: 'Usually less clothing and less pronounced stretching, but “oil” does not guarantee light pressure.',
    chooseWhen: 'Relaxation is the priority and you agree the draping and products before starting.',
  },
  {
    icon: Footprints,
    title: 'Foot massage',
    cue: 'Local · seated or reclined',
    description: 'The session focuses on feet and lower legs. Ask whether it includes firm pressure, a wooden tool, balm or a short shoulder sequence near the end.',
    expect: 'Less whole-body movement, yet pressure can still feel intense on sensitive feet or a recent blister.',
    chooseWhen: 'You want a contained first session or have limited time and no reason to avoid foot work.',
  },
  {
    icon: Leaf,
    title: 'Herbal compress',
    cue: 'Heat · often an add-on',
    description: 'Steamed herb bundles may be pressed or rolled over parts of the body. Ingredients, temperature and combination with massage differ by provider.',
    expect: 'Heat should stay comfortable. Ask for a temperature test and identify relevant skin or sensation issues.',
    chooseWhen: 'You enjoy warmth and have confirmed exactly what the advertised package includes.',
  },
];

const faqs = [
  {
    question: 'What does a traditional Thai massage include?',
    answer: 'A traditional Thai massage usually takes place on a mat while you wear loose clothing. The practitioner may apply rhythmic pressure with hands, thumbs, elbows, knees or feet and guide you through supported movements or stretches. There is no single universal sequence, so ask which areas and techniques the booked session includes and keep communicating about pressure.',
  },
  {
    question: 'What should I expect during my first Thai massage?',
    answer: 'Expect a short discussion about the chosen style, pressure and relevant health information, followed by changing into loose clothing for traditional Thai or agreeing professional draping for oil massage. The practitioner should explain unexpected techniques, check pressure and respond when you ask for lighter work, no stretching or a complete stop.',
  },
  {
    question: 'What kind of Thai massage is best?',
    answer: 'There is no best type for everyone. Choose traditional Thai when you want to stay clothed and are comfortable with movement, oil when gliding work and relaxation appeal, foot massage for a shorter local session, or herbal compress only when comfortable heat and known products suit you. Medical conditions require individual professional advice rather than a web recommendation.',
  },
  {
    question: 'Do you keep your clothes on for a Thai massage?',
    answer: 'For traditional Thai massage, usually yes: the provider often supplies a loose top and trousers, or you wear clean flexible clothing. Oil massage generally involves uncovering only the area being worked on while the rest remains draped. Ask about the process before the session; you may keep clothing on or decline a treatment that does not feel appropriate.',
  },
  {
    question: 'Is Thai massage done without oil?',
    answer: 'Traditional Thai massage is commonly performed without oil over loose clothing. However, menus in Thailand also use names such as Thai oil, aromatic oil, balm or herbal compress. Do not rely on the word “Thai” alone: confirm the product, clothing, draping, movement and pressure attached to the exact booking.',
  },
  {
    question: 'Do you wear clothes for Thai oil massage?',
    answer: 'Oil needs access to selected skin, so you normally remove only what the agreed treatment requires and remain covered elsewhere with a towel or sheet. You decide what you are comfortable removing. A professional provider should explain draping before the session and respect requests for more coverage, a different area or stopping.',
  },
  {
    question: 'How safe is Thai massage?',
    answer: 'NCCIH says the risk of harmful effects from massage appears low, but rare serious effects such as blood clot, nerve injury or fracture have been reported, sometimes with vigorous work or people at higher risk. Suitability depends on your health and the technique. Ask a health professional when unsure and never postpone medical evaluation for massage.',
  },
  {
    question: 'Why are Thai massages so intense?',
    answer: 'Traditional Thai sessions can combine sustained pressure, practitioner body weight and supported movement, which may feel more active than a gentle oil massage. Intensity is not proof of effectiveness. Sharp, radiating or increasing pain, numbness, dizziness or distress are reasons to ask for immediate adjustment or stop the session.',
  },
  {
    question: 'How much does it cost for a Thai massage?',
    answer: 'There is no dependable national price: city, venue, duration, style and service level differ. As a dated official example, Wat Pho’s page showed Thai massage at 340 THB for 30 minutes, 520 THB for 60 minutes and 1,040 THB for 120 minutes on 26 July 2026. Treat that as one venue example and check the current menu and extras yourself.',
  },
  {
    question: 'How much should I tip for a Thai massage?',
    answer: 'Tipping is a voluntary sign of appreciation rather than a universal fixed charge. Pay the agreed bill first and tip only if you want to. Venue type, service charge and local guidance can differ, so an exact amount copied from another traveller should not override the menu, the setting and your own experience.',
  },
  {
    question: 'Is it normal to get hard during a Thai massage?',
    answer: 'An involuntary physical response can happen and does not communicate consent or an invitation. Remain respectful; a professional practitioner should remain professional. If either person feels uncomfortable, pause or end the session. A regular massage is not sexual service, and boundaries apply to both client and practitioner.',
  },
  {
    question: 'Who should avoid Thai massage?',
    answer: 'A general guide cannot decide personal suitability. Speak with a clinician who knows your circumstances if you are pregnant, take blood thinners, have a clotting disorder, severe osteoporosis, recent surgery or fracture, acute injury, fever, infection, open wound or unexplained neurological symptoms. Share relevant advice with the provider before booking.',
  },
  {
    question: 'What not to do after a Thai massage?',
    answer: 'There is no universal medical aftercare list for every healthy person. Stand up slowly, hydrate normally and notice how you feel before driving, entering heavy heat or starting intense activity. Persistent or severe pain, weakness, numbness, breathing difficulty, chest pain or other alarming symptoms need appropriate medical assessment rather than another massage.',
  },
];

const sources = [
  {
    title: 'Nuad Thai, traditional Thai massage',
    creator: 'UNESCO Intangible Cultural Heritage',
    url: 'https://ich.unesco.org/en/RL/nuad-thai-traditional-thai-massage-01384',
    note: 'Primary source for Nuad Thai’s 2019 inscription and its cultural context. Traditional concepts are not presented as validated modern anatomy.',
  },
  {
    title: 'Visit plan — Thai massage service and rates',
    creator: 'Wat Pho',
    url: 'https://watpho.com/index.php/en/contact/plan',
    note: 'Official, dated venue example for service duration and price. It is not treated as a Thailand-wide average.',
  },
  {
    title: 'Registration as a service provider in a health establishment',
    creator: 'Government of Thailand',
    url: 'https://www.thailand.go.th/issue-focus-detail/001_07_005-2-2?hl=en',
    note: 'Official context for provider registration, recognised training and the health-establishment framework.',
  },
  {
    title: 'Location, safety and service standards for health establishments',
    creator: 'Government of Thailand',
    url: 'https://www.thailand.go.th/issue-focus-detail/001_07_010-2?hl=en',
    note: 'Primary source for operational, hygiene, facility and safety standards applying to massage and spa establishments.',
  },
  {
    title: 'Massage Therapy: What You Need To Know',
    creator: 'NCCIH',
    url: 'https://www.nccih.nih.gov/health/massage-therapy-what-you-need-to-know',
    note: 'Primary health source for risk context, rare serious effects and the instruction not to delay medical care.',
  },
];

function createSchemas() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${PAGE_URL}#article`,
      headline: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      image: `https://go2-thailand.com${HERO_IMAGE}`,
      datePublished: '2026-03-21',
      dateModified: '2026-07-26',
      inLanguage: 'en',
      mainEntityOfPage: PAGE_URL,
      author: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
      publisher: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com/' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/' },
        { '@type': 'ListItem', position: 2, name: 'Travel guides', item: 'https://go2-thailand.com/travel-guides/' },
        { '@type': 'ListItem', position: 3, name: 'Thai massage', item: PAGE_URL },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Four common massage choices in Thailand',
      itemListElement: massageChoices.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.title, description: item.description })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How to choose a professional Thai massage',
      description: 'A practical check before booking a massage session in Thailand.',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Choose the format', text: 'Decide whether you want to stay clothed and how you feel about oil, stretching and heat.' },
        { '@type': 'HowToStep', position: 2, name: 'Check the provider', text: 'Review registration signals, training, the menu, hygiene and the intake process.' },
        { '@type': 'HowToStep', position: 3, name: 'Agree boundaries', text: 'Share relevant health information and agree pressure, draping and areas to avoid.' },
        { '@type': 'HowToStep', position: 4, name: 'Keep communicating', text: 'Ask for an adjustment or stop immediately when something does not feel right.' },
      ],
    },
  ];
}

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="font-extrabold text-jade underline decoration-saffron/55 underline-offset-4 transition hover:text-saffron-dark">{children}</Link>;
}

export function ThaiMassageThailandGuideEn() {
  const subId = useSubId();
  const wellnessHref = withPlacementSubId(KLOOK_GENERIC, subId, 'thai-massage-en-related-wellness');
  const schemas = createSchemas();

  return (
    <>
      <SEOHead title={PAGE_TITLE} description={PAGE_DESCRIPTION} ogImage={`https://go2-thailand.com${HERO_IMAGE}`}>
        <meta name="keywords" content="thai massage thailand, traditional thai massage, types of thai massage, thai massage price thailand, what to wear thai massage, thai massage etiquette" />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content="2026-03-21" />
        <meta property="article:modified_time" content="2026-07-26" />
        {schemas.map((schema, index) => <script key={`${schema['@type']}-${index}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      </SEOHead>

      <div className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          image={HERO_IMAGE}
          imageAlt="Professional Thai massage practitioner preparing a calm treatment room"
          breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Travel guides', href: '/travel-guides/' }, { label: 'Thai massage' }]}
          breadcrumbAriaLabel="Breadcrumb"
          eyebrow="Choose with comfort and boundaries"
          title={<>Thai massage.<br />Your pace.</>}
          subtitle={<>Relaxation starts before the first touch.</>}
          description={<>Traditional, oil, foot or herbal heat? Compare what actually happens, what you wear, how much one official venue charges and which questions protect your comfort — without miracle claims or awkward surprises.</>}
          actions={[
            { label: 'Find your format', href: '#choose', kind: 'primary' },
            { label: 'Run the safety check', href: '#safety', kind: 'secondary' },
          ]}
          minHeightClassName="min-h-[810px] lg:min-h-[700px]"
          contentClassName="max-w-[690px]"
          titleClassName="max-w-[650px] text-[3.75rem] leading-[0.84] sm:text-[4.8rem] lg:text-[5.15rem]"
          subtitleClassName="max-w-[600px] text-[1.6rem] leading-[0.98] text-saffron-dark sm:text-[1.95rem]"
          imageClassName="object-cover object-[66%_center] lg:object-center"
          gradientClassName="bg-[linear-gradient(180deg,rgba(252,250,246,0.04)_0%,rgba(252,250,246,0.73)_46%,rgba(252,250,246,0.99)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.99)_0%,rgba(252,250,246,0.92)_39%,rgba(252,250,246,0.18)_68%,rgba(18,63,54,0.08)_100%)]"
          sideCard={(
            <aside className="absolute bottom-8 right-[max(2rem,calc((100vw-1240px)/2))] z-10 hidden w-[340px] overflow-hidden rounded-2xl border border-white/60 bg-white/[0.92] shadow-editorial-lift backdrop-blur-xl xl:block">
              <div className="flex items-center justify-between border-b border-jade/10 px-5 py-4"><p className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-saffron-dark">Before choosing a time slot</p><MessageCircle size={18} className="text-jade" /></div>
              <dl className="grid grid-cols-[92px_1fr] gap-x-4 gap-y-3 p-5 text-[11px]">
                <dt className="text-charcoal/46">Clothing</dt><dd className="font-extrabold text-jade">Clothed or draped?</dd>
                <dt className="text-charcoal/46">Technique</dt><dd className="font-extrabold text-jade">Pressure, stretch, oil, heat?</dd>
                <dt className="text-charcoal/46">Boundaries</dt><dd className="font-extrabold text-jade">What do you not want?</dd>
                <dt className="text-charcoal/46">Health</dt><dd className="font-extrabold text-jade">Should you ask first?</dd>
              </dl>
              <p className="border-t border-jade/10 px-5 py-4 text-[10px] font-medium leading-4 text-charcoal/62">A higher price does not prove suitability. A clear intake and respect for your answer reveal more.</p>
            </aside>
          )}
        />

        <PageSectionNav label="On this page" items={navItems} />

        <section id="choose" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-end">
              <SectionHeading eyebrow="Choose in sixty seconds" title={<>Not “the best”.<br />Your best starting point.</>} description={<>Start with the experience you want, not a viral salon or a recovery promise. <InlineLink href="/city/bangkok/">Bangkok</InlineLink> offers enormous choice, and <InlineLink href="/city/chiang-mai/">Chiang Mai</InlineLink> does too. The same decision model works in both.</>} />
              <p className="max-w-3xl text-sm font-medium leading-7 text-charcoal/66">A menu label is not a strict protocol. Ask how much stretching is involved, which body areas are included, what you wear, what product touches the skin and how firm the first pressure will be. That compares real delivery rather than four attractive names.</p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {massageChoices.map(({ icon: Icon, title, cue, description, expect, chooseWhen }, index) => (
                <article key={title} className={`flex min-h-[450px] flex-col rounded-2xl border p-6 ${index === 0 ? 'border-saffron/40 bg-[#fff4df] shadow-editorial-card' : 'border-jade/10 bg-white'}`}>
                  <div className="flex items-start justify-between gap-4"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-saffron/25 bg-canvas text-jade"><Icon size={22} strokeWidth={1.45} /></span><span className="max-w-[132px] text-right text-[9px] font-extrabold uppercase leading-4 tracking-[0.12em] text-saffron-dark">{cue}</span></div>
                  <h2 className="mt-6 font-display text-[1.7rem] font-semibold leading-none text-jade">{title}</h2>
                  <p className="mt-4 text-xs font-medium leading-6 text-charcoal/66">{description}</p>
                  <div className="mt-5 border-t border-jade/10 pt-4"><p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-jade/48">Expect</p><p className="mt-2 text-[11px] font-medium leading-5 text-charcoal/64">{expect}</p></div>
                  <p className="mt-auto pt-5 text-[11px] font-extrabold leading-5 text-jade"><Check size={14} className="mr-2 inline text-saffron" />{chooseWhen}</p>
                </article>
              ))}
            </div>
            <div className="mt-6 grid gap-5 rounded-2xl border border-jade/10 bg-white p-6 sm:p-7 lg:grid-cols-[0.34fr_0.66fr] lg:items-center">
              <div><p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">Relaxation or treatment?</p><h2 className="mt-2 font-display text-[1.75rem] font-semibold leading-tight text-jade">Keep those goals separate.</h2></div>
              <p className="text-xs font-medium leading-6 text-charcoal/66">A massage can be a wellness choice because quiet time, attentive service or the setting appeals to you. That is different from treating a health condition. Words such as therapeutic, detox or energy recovery do not diagnose you or prove an outcome. Ask for suitable medical advice when the goal is clinical, then tell the provider which movements and pressure fit that advice.</p>
            </div>
          </div>
        </section>

        <section id="types" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[1.03fr_0.97fr] lg:items-center">
            <div className="relative min-h-[500px] overflow-hidden rounded-[28px] shadow-editorial-lift sm:min-h-[620px]">
              <Image src="/images/redesign/thai-massage-choices.webp" alt="Loose massage clothing, massage oil, foot bath and Thai herbal compresses" fill sizes="(max-width: 1024px) 100vw, 52vw" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-jade/92 via-jade/52 to-transparent p-7 pt-32 text-white"><p className="eyebrow !text-saffron-light">Read the menu as an ingredient list</p><h2 className="max-w-xl font-display text-[3rem] font-semibold leading-[0.9] tracking-[-0.04em]">Clothing, product, movement and heat shape the experience.</h2></div>
            </div>
            <div>
              <SectionHeading eyebrow="The four axes" title="A name tells only half the story" description="Two venues can deliver different sessions under the same menu label. Ask about four concrete axes before booking." />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  [Shirt, 'Clothing', 'Traditional Thai is generally fully clothed. For oil, you decide what to remove and appropriate professional draping should be standard.'],
                  [Droplets, 'Product', 'Ask which oil, balm or herbs are used when you have allergies, fragrance sensitivity or a skin concern.'],
                  [Hand, 'Pressure & movement', '“Medium” is subjective. State what to avoid and give direct feedback from the first technique onward.'],
                  [ThermometerSun, 'Heat', 'A compress or heated towel should be tested first, especially with reduced sensation or vulnerable skin.'],
                ].map(([Icon, title, text]) => {
                  const CardIcon = Icon as LucideIcon;
                  return <article key={String(title)} className="rounded-2xl border border-jade/10 bg-white p-5"><CardIcon size={20} strokeWidth={1.45} className="text-saffron-dark" /><h3 className="mt-4 font-display text-[1.45rem] font-semibold text-jade">{String(title)}</h3><p className="mt-2 text-xs font-medium leading-6 text-charcoal/66">{String(text)}</p></article>;
                })}
              </div>
              <div className="mt-6 rounded-2xl border border-saffron/25 bg-[#fff4df] p-6"><p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">The most useful booking sentence</p><p className="mt-3 font-display text-[1.65rem] font-semibold leading-tight text-jade">“Please explain what I wear, how much stretching you use and how I can stop.”</p><p className="mt-3 text-xs font-medium leading-6 text-charcoal/64">A reliable explanation is more valuable than a long list of claimed benefits.</p></div>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-16 lg:py-20">
          <div className="container-custom">
            <div className="overflow-hidden rounded-[30px] bg-jade text-white shadow-editorial-lift">
              <div className="grid lg:grid-cols-[0.7fr_1.3fr]">
                <div className="p-8 sm:p-10 lg:p-12"><p className="eyebrow !text-saffron-light">Heritage, not a miracle cure</p><h2 className="font-display text-[3.25rem] font-semibold leading-[0.88] tracking-[-0.04em]">Nuad Thai is living Thai knowledge.</h2><p className="mt-6 text-sm font-medium leading-7 text-white/70">UNESCO inscribed Nuad Thai as intangible cultural heritage in 2019. That recognises cultural practice, transmission and social meaning — it does not validate every health claim printed on a spa menu.</p></div>
                <div className="grid gap-px bg-white/10 sm:grid-cols-3">
                  {[
                    ['01', 'Tradition', 'The tradition describes sen lines. Present them as part of its cultural system, not established modern anatomy.'],
                    ['02', 'Training', 'Knowledge is passed through families, schools, institutions and professional practice. Ask about training relevant to the session.'],
                    ['03', 'Boundaries', 'Cultural heritage does not make a vigorous technique suitable for every body. Health and consent still lead.'],
                  ].map(([number, title, text]) => <article key={number} className="flex min-h-[330px] flex-col bg-jade p-7 sm:py-10"><p className="font-display text-4xl font-semibold text-saffron-light">{number}</p><h3 className="mt-6 font-display text-[1.7rem] font-semibold leading-none">{title}</h3><p className="mt-4 text-xs font-medium leading-6 text-white/64">{text}</p><Sparkles size={18} className="mt-auto text-saffron-light" /></article>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="price" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <SectionHeading eyebrow="Price without false certainty" title="Compare one concrete session, not a made-up Thailand average" description={<>A street salon, temple school, hotel spa and wellness resort do not sell the same product. Location and luxury affect price but do not determine medical suitability. A Bangkok session can also fit beside our <InlineLink href="/blog/wat-pho-bangkok-reclining-buddha/">practical Wat Pho guide</InlineLink>.</>} />
            <div>
              <div className="overflow-hidden rounded-[28px] border border-jade/10 bg-white shadow-editorial-card">
                <div className="grid md:grid-cols-[0.42fr_0.58fr]">
                  <div className="bg-jade p-7 text-white sm:p-9"><p className="eyebrow !text-saffron-light">Official venue example</p><h3 className="font-display text-[2.65rem] font-semibold leading-[0.9]">Wat Pho on 26 July 2026</h3><p className="mt-5 text-xs font-medium leading-6 text-white/64">The official visit page displayed the same three durations for Thai massage and foot massage. Recheck the source on your travel day.</p><a href="https://watpho.com/index.php/en/contact/plan" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-white">Check the current official price <ExternalLink size={14} className="text-saffron-light" /></a></div>
                  <div className="grid divide-y divide-jade/10 p-7 sm:p-9">
                    {[['30 minutes', '340 THB'], ['60 minutes', '520 THB'], ['120 minutes', '1,040 THB']].map(([duration, price]) => <div key={duration} className="flex items-center justify-between gap-4 py-5 first:pt-0 last:pb-0"><span className="text-sm font-extrabold text-jade">{duration}</span><span className="font-display text-[1.8rem] font-semibold text-saffron-dark">{price}</span></div>)}
                  </div>
                </div>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {[['Before booking', 'Format, duration, clothing'], ['Before starting', 'Products and any extras'], ['Before paying', 'Final total and payment method']].map(([title, text], index) => <article key={title} className="rounded-2xl border border-jade/10 bg-white p-5"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#fff0d5] text-xs font-extrabold text-saffron-dark">0{index + 1}</span><h3 className="mt-4 text-sm font-extrabold text-jade">{title}</h3><p className="mt-2 text-xs font-medium leading-5 text-charcoal/62">{text}</p></article>)}
              </div>
              <p className="mt-5 text-[11px] font-medium leading-5 text-charcoal/56">Wat Pho is a transparent price anchor, not a health recommendation or national ceiling. Menus, promotions, currency value and availability can change.</p>
            </div>
          </div>
        </section>

        <section id="before" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.66fr_1.34fr] lg:items-end"><SectionHeading eyebrow="From door to mat" title="The session starts with three checks" description="A good experience does not require silent endurance. Share relevant information, ask what will happen and keep the same authority during the session." /><p className="max-w-3xl text-sm font-medium leading-7 text-charcoal/66">Arrive on time, avoid a very heavy meal immediately beforehand and store jewellery securely. More importantly, mention sensitivities, recent procedures and movements you do not want. A short intake is the moment the practitioner should adapt the plan.</p></div>
            <div className="relative mt-10">
              <div className="pointer-events-none absolute left-[7%] right-[7%] top-9 hidden border-t-2 border-dashed border-saffron/55 lg:block" />
              <div className="relative grid gap-5 lg:grid-cols-3">
                {[
                  [MessageCircle, 'Before', 'Name relevant health information, desired pressure and body areas that should not be treated.', 'Ask: what will you do?'],
                  [Hand, 'During', 'Check the first pressure and movement. Say “lighter”, “no stretching here” or “stop”.', 'Pain is not a performance test'],
                  [Clock3, 'After', 'Stand slowly and notice how you feel before entering traffic, heat or intense activity.', 'Serious symptoms = help'],
                ].map(([Icon, title, text, cue], index) => {
                  const CardIcon = Icon as LucideIcon;
                  return <article key={String(title)} className="relative min-h-[300px] rounded-2xl border border-jade/10 bg-white p-7 shadow-editorial-card"><span className="relative z-10 grid h-[72px] w-[72px] place-items-center rounded-full border border-saffron/35 bg-canvas text-jade"><CardIcon size={28} strokeWidth={1.35} /></span><p className="mt-6 text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">Step 0{index + 1}</p><h3 className="mt-2 font-display text-[1.8rem] font-semibold leading-none text-jade">{String(title)}</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/66">{String(text)}</p><p className="mt-5 border-t border-jade/10 pt-4 text-[10px] font-extrabold text-jade">{String(cue)}</p></article>;
                })}
              </div>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                [MapPin, 'First session', 'Choose a clearly described shorter session with a visible menu and genuine intake. Learn before choosing the strongest option.', 'Room to learn'],
                [Clock3, 'After arrival', 'Fatigue, heat and limited hydration influence how you feel. Eat lightly, drink normally and avoid a rushed appointment.', 'Not a jet-lag cure'],
                [Footprints, 'After a long walk', 'A foot massage sounds logical, but sensitive feet or a fresh blister should be explained before any pressure.', 'Local work is still pressure'],
                [ShieldCheck, 'Before an active day', 'Leave time before climbing, diving, a long drive or training and assess your own movement afterwards.', 'Margin in the schedule'],
              ].map(([Icon, title, text, cue]) => {
                const CardIcon = Icon as LucideIcon;
                return <article key={String(title)} className="flex min-h-[315px] flex-col rounded-2xl border border-jade/10 bg-tonal p-6"><span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-jade"><CardIcon size={20} strokeWidth={1.45} /></span><h3 className="mt-6 font-display text-[1.6rem] font-semibold leading-none text-jade">{String(title)}</h3><p className="mt-4 text-xs font-medium leading-6 text-charcoal/66">{String(text)}</p><p className="mt-auto border-t border-jade/10 pt-5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-saffron-dark">{String(cue)}</p></article>;
              })}
            </div>
          </div>
        </section>

        <section id="consent" className="section-divider-bottom scroll-mt-24 bg-tonal py-16 lg:py-24">
          <div className="container-custom grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="relative min-h-[480px] overflow-hidden rounded-[28px] shadow-editorial-lift sm:min-h-[610px]">
              <Image src="/images/redesign/thai-massage-consent.webp" alt="Traveller and Thai massage practitioner discussing pressure and preferences before the session" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-jade/90 via-jade/48 to-transparent p-7 pt-28 text-white"><p className="eyebrow !text-saffron-light">No language test required</p><h2 className="font-display text-[2.85rem] font-semibold leading-[0.9]">Three short phrases give enough direction.</h2></div>
            </div>
            <div>
              <SectionHeading eyebrow="Keep the plan flexible" title="Consent stays active for the whole session" description="An earlier yes does not automatically cover greater pressure, a new body area, additional stretching or reduced draping. Client and practitioner may pause or stop at any time." />
              <div className="mt-8 space-y-4">
                {[
                  ['“Light pressure, please.”', 'Start lighter. You can always ask whether a little more feels appropriate.'],
                  ['“No stretching here.”', 'Point to the area and do not resolve uncertainty with additional pressure.'],
                  ['“Stop, please.”', 'You do not owe a complete sentence or explanation. Stop means stop immediately.'],
                ].map(([phrase, meaning], index) => <article key={phrase} className="grid grid-cols-[46px_1fr] gap-4 rounded-2xl border border-jade/10 bg-white p-5"><span className="grid h-11 w-11 place-items-center rounded-full bg-jade font-display text-lg font-semibold text-saffron-light">{index + 1}</span><div><h3 className="text-sm font-extrabold text-jade">{phrase}</h3><p className="mt-2 text-xs font-medium leading-5 text-charcoal/64">{meaning}</p></div></article>)}
              </div>
              <p className="mt-6 rounded-2xl border border-saffron/25 bg-[#fff4df] p-5 text-xs font-medium leading-6 text-charcoal/70"><strong className="text-jade">Professional boundary:</strong> a regular massage is not sexual service. An involuntary bodily response changes nothing about consent, behaviour or either person’s right to end the session.</p>
            </div>
          </div>
        </section>

        <section id="safety" className="section-divider-bottom scroll-mt-24 py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.64fr_1.36fr] lg:items-start">
              <SectionHeading eyebrow="Health before wellness" title="When to ask first — and when to stop" description={<>Massage is not a replacement for diagnosis or treatment. Our <InlineLink href="/blog/best-wellness-retreats-thailand-2026/">Thailand wellness-retreat guide</InlineLink> helps compare a single appointment with a longer wellness stay, but personal medical assessment remains separate.</>} />
              <div className="grid gap-5 md:grid-cols-2">
                <article className="rounded-[24px] border border-jade/10 bg-white p-7 shadow-editorial-card">
                  <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#eef2ed] text-jade"><MessageCircle size={21} /></span><h3 className="font-display text-[1.75rem] font-semibold text-jade">Discuss before booking</h3></div>
                  <ul className="mt-6 space-y-3 text-xs font-medium leading-5 text-charcoal/68">{['Pregnancy or recent childbirth', 'Blood thinners or a clotting disorder', 'Recent operation, fracture or acute injury', 'Severe osteoporosis or fragile bones', 'Fever, infection, skin problem or open wound', 'Unexplained pain, weakness or numbness'].map((item) => <li key={item} className="flex gap-3"><CircleAlert size={16} className="mt-0.5 shrink-0 text-saffron-dark" />{item}</li>)}</ul>
                  <p className="mt-6 border-t border-jade/10 pt-5 text-[11px] font-medium leading-5 text-charcoal/58">This list is not complete. Ask a health professional who knows your circumstances and share relevant guidance with the practitioner.</p>
                </article>
                <article className="rounded-[24px] bg-jade p-7 text-white shadow-editorial-lift">
                  <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-saffron-light"><ShieldCheck size={21} /></span><h3 className="font-display text-[1.75rem] font-semibold">Stop during the session</h3></div>
                  <ul className="mt-6 space-y-3 text-xs font-medium leading-5 text-white/72">{['Sharp or radiating pain', 'New tingling or numbness', 'Dizziness or nausea', 'Breathing difficulty or chest pain', 'A technique or touch you did not agree to', 'A practitioner who ignores pressure or stop requests'].map((item) => <li key={item} className="flex gap-3"><Check size={16} className="mt-0.5 shrink-0 text-saffron-light" />{item}</li>)}</ul>
                  <p className="mt-6 border-t border-white/12 pt-5 text-[11px] font-medium leading-5 text-white/62">Seek appropriate medical help for serious or persistent symptoms. Do not wait for another massage to assess a warning sign.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom bg-tonal py-16 lg:py-24">
          <div className="container-custom">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading eyebrow="Choose the professional, not the décor" title="Six signals before you walk in" description={<>A marble lobby does not prove competence, and a simple room is not automatically unprofessional. Thailand links health establishments and service providers to formal requirements. Combine those checks with normal travel awareness and our <InlineLink href="/practical-info/etiquette-culture/">Thailand etiquette guide</InlineLink>.</>} />
              <a href="https://www.thailand.go.th/issue-focus-detail/001_07_010-2?hl=en" target="_blank" rel="noopener noreferrer" className="btn-cream shrink-0 px-6 text-saffron-dark">Read the official standards <ExternalLink size={15} /></a>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {[
                [BadgeCheck, 'Licence context visible', 'Look for establishment information that matches the business name and location; do not treat a sticker alone as proof.'],
                [ScanLine, 'Provider training explainable', 'Ask which training applies to your chosen format and whether the practitioner is registered where required.'],
                [WalletCards, 'Menu before the session', 'Format, duration, price and possible extras are clear before you change clothes or begin.'],
                [MessageCircle, 'A real intake', 'The practitioner asks about preferences, relevant conditions and boundaries, then responds meaningfully.'],
                [Sparkles, 'Clean working method', 'Linen, clothing, surfaces and products look cared for; hands and equipment are used appropriately.'],
                [HeartHandshake, 'Boundaries without debate', 'A request for lighter pressure, more coverage or stopping is followed immediately and professionally.'],
              ].map(([Icon, title, text]) => {
                const CardIcon = Icon as LucideIcon;
                return <article key={String(title)} className="rounded-2xl border border-jade/10 bg-white p-6"><span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/25 bg-canvas text-jade"><CardIcon size={20} strokeWidth={1.45} /></span><h3 className="mt-5 font-display text-[1.55rem] font-semibold text-jade">{String(title)}</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/64">{String(text)}</p></article>;
              })}
            </div>
          </div>
        </section>

        <section className="section-divider-bottom py-16 lg:py-20">
          <div className="container-custom">
            <div className="overflow-hidden rounded-[28px] border border-jade/10 bg-white shadow-editorial-card">
              <div className="grid lg:grid-cols-[0.7fr_1.3fr]">
                <div className="bg-[#fff4df] p-8 sm:p-10"><p className="eyebrow">Small etiquette, meaningful difference</p><h2 className="font-display text-[3rem] font-semibold leading-[0.9] tracking-[-0.04em] text-jade">Calm, clean and clear.</h2><p className="mt-5 text-sm font-medium leading-7 text-charcoal/66">Shower when practical, arrive a few minutes early and silence your phone. Treat the practitioner as a professional; photography, touch and jokes require the same boundaries as in any other service setting.</p></div>
                <div className="grid sm:grid-cols-2">
                  {[
                    ['Clothing', 'Wear or accept clean loose clothing for traditional Thai. For oil, you decide what is removed and ask for appropriate draping.'],
                    ['Communication', 'State what you do not want before starting and do not wait until discomfort becomes unbearable. Short and direct is polite enough.'],
                    ['Tipping', 'A tip is voluntary. Do not let a fixed internet amount become more important than the actual bill, service charge and your choice.'],
                    ['Privacy', 'Do not take photographs or video without explicit permission, and never publish identifiable clients or staff casually.'],
                  ].map(([title, text], index) => <article key={title} className={`min-h-[230px] border-jade/10 p-7 ${index % 2 === 0 ? 'sm:border-r' : ''} ${index < 2 ? 'border-b' : ''}`}><p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">0{index + 1}</p><h3 className="mt-4 font-display text-[1.65rem] font-semibold text-jade">{title}</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/64">{text}</p></article>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider-bottom bg-tonal py-14 lg:py-20">
          <div className="container-custom">
            <div className="rounded-[28px] bg-jade p-8 text-white shadow-editorial-lift sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-12">
              <div className="max-w-3xl"><p className="eyebrow !text-saffron-light">Want to compare before booking?</p><h2 className="font-display text-[2.8rem] font-semibold leading-[0.92] tracking-[-0.035em]">Compare wellness experiences, then check the provider yourself.</h2><p className="mt-4 text-sm font-medium leading-7 text-white/68">Klook can help compare location, duration, inclusions, conditions and recent traveller reviews. A listing is not a medical recommendation and does not replace the registration, intake and safety checks above.</p></div>
              <a href={wellnessHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-cream mt-7 shrink-0 px-7 text-saffron-dark lg:mt-0">Check current massage price at Klook <ExternalLink size={15} /></a>
            </div>
            <AffiliateDisclosure className="mt-3">Affiliate disclosure: Go2Thailand may earn commission after a booking at no extra cost to you. Check the provider, current service, price, cancellation terms and personal suitability before booking; availability and inclusions can change.</AffiliateDisclosure>
          </div>
        </section>

        <FaqSplitSection id="questions" eyebrow="Real English search questions" title="Frequently asked questions about Thai massage" description="Each question was captured verbatim in the English SERP research. Answers help with format, communication and risk boundaries but do not replace personal medical advice." items={faqs} />

        <RelatedGuidesSection
          eyebrow="Build a calmer travel day"
          title="Plan useful context around the session"
          guides={[
            { title: 'Wat Pho in Bangkok', description: 'Plan the temple visit and understand the current massage-school context behind the official price example.', href: '/blog/wat-pho-bangkok-reclining-buddha/', image: '/images/blog/wat-pho-bangkok-reclining-buddha.webp', imageAlt: 'Wat Pho temple complex in Bangkok' },
            { title: 'Wellness retreats in Thailand', description: 'Compare a single massage with a longer wellness stay without treating either as medical care.', href: '/blog/best-wellness-retreats-thailand-2026/', image: '/images/blog/best-wellness-retreats-thailand-2026.webp', imageAlt: 'Quiet wellness retreat in Thailand' },
            { title: 'Plan Bangkok calmly', description: 'Build transport, neighbourhoods and rest into the day without unnecessary cross-city travel.', href: '/city/bangkok/', image: '/images/redesign/destination-bangkok.webp', imageAlt: 'Bangkok skyline and river' },
          ]}
          readLabel="Read the guide"
        />

        <SourceMethodSection
          eyebrow="Sources & editorial method"
          title="Sources that keep heritage, price and safety separate"
          description="Independent English DataForSEO keyword, ranking, backlink, SERP, competitor and exact-PAA research set the task. Primary institutions support changing or health-adjacent claims. Prices are dated; traditional concepts remain cultural descriptions rather than proven treatment mechanisms. Last substantive review: 26 July 2026."
          sources={sources}
        />
      </div>
    </>
  );
}

