import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight, CalendarDays, CheckCircle2, ClipboardCheck, CloudRain,
  Compass, ExternalLink, Eye, GraduationCap, Hotel, LifeBuoy, MapPin,
  ShieldCheck, Sun, Users, Waves, Wind,
} from 'lucide-react';
import SEOHead from '../SEOHead';
import { AffiliateDisclosure } from '../design/AffiliateDisclosure';
import { EditorialHero } from '../design/EditorialHero';
import { FaqSplitSection } from '../design/FaqSplitSection';
import { PageSectionNav, type PageSectionNavItem } from '../design/PageSectionNav';
import { RelatedGuidesSection } from '../design/RelatedGuidesSection';
import { SectionHeading } from '../design/SectionHeading';
import { SourceMethodSection } from '../design/SourceMethodSection';

const HERO = '/images/redesign/kata-surfing-hero-v2.webp';
const PAGE_URL = 'https://go2-thailand.com/phuket/kata/surfing/';

interface KataSurfingGuideEnProps {
  lessonHref: string;
  alternativeLessonHref: string;
  hotelHref: string;
}

const navItems: PageSectionNavItem[] = [
  { href: '#fit', label: 'Your level', icon: Compass },
  { href: '#conditions', label: 'Conditions', icon: Wind },
  { href: '#lessons', label: 'Lessons', icon: GraduationCap },
  { href: '#safety', label: 'Safety', icon: LifeBuoy },
  { href: '#plan', label: 'Plan it', icon: ClipboardCheck },
  { href: '#questions', label: 'Questions', icon: CheckCircle2 },
];

const fitCards = [
  { eyebrow: 'Best first move', title: 'First-time surfer', copy: 'Start with an instructor and a beginner board. Let the school choose the safe teaching area for that session instead of choosing a spot from an old guide.', icon: GraduationCap },
  { eyebrow: 'Conditions decide', title: 'Improving beginner', copy: 'Ask where the lesson will run, how the group is split by ability and whether conditions still suit your paddle and board control.', icon: Waves },
  { eyebrow: 'Bring judgement', title: 'Independent surfer', copy: 'Check the current forecast, flags, local advice, crowd and entry before paddling out. A familiar-looking beach can behave differently by hour.', icon: Wind },
  { eyebrow: 'Still a good beach day', title: 'Observer or family', copy: 'Use a lesson provider with a clear meeting point and supervision policy. Keep swimming and surf zones separate and follow lifeguard instructions.', icon: Eye, dark: true },
];

const conditionRows = [
  { period: 'Dec–Apr', pattern: 'The drier travel window is often associated with calmer Andaman conditions.', meaning: 'Do not book a trip on the assumption that ocean surf will be available. Check the actual lesson listing and forecast.', cue: 'Beach trip first' },
  { period: 'May–Jun', pattern: 'Monsoon patterns can begin to produce surfable days alongside rain and rapidly changing sea conditions.', meaning: 'A lesson may become possible, but suitability still depends on the day, your level and the operator’s call.', cue: 'Start flexible', highlight: true },
  { period: 'Jul–Sep', pattern: 'This is commonly treated as Phuket’s core surf period, with more active sea conditions.', meaning: 'More wave potential also means more reason to respect flags, currents and instructor judgement.', cue: 'Surf window, not promise', highlight: true },
  { period: 'Oct–Nov', pattern: 'Transition conditions can vary as the monsoon pattern changes.', meaning: 'Keep a land or pool alternative and confirm the lesson close to the date.', cue: 'Recheck the week' },
];

const faqs = [
  { question: 'Can you go surfing in Phuket?', answer: 'Yes. Phuket has a seasonal surf scene, particularly during the Andaman monsoon period. Whether a session runs on a specific day depends on current waves, weather, flags and operator judgement.' },
  { question: 'Which beach is best for surfing in Phuket?', answer: 'Kata Beach is the most practical first comparison for many visitors because surf schools, lessons and rentals operate around the bay in season. “Best” still depends on ability and the conditions that day.' },
  { question: 'Is Kata Beach good for beginner surfers?', answer: 'It can be on suitable days with an instructor, appropriate equipment and a beginner teaching area. Beginner-friendly does not mean safe in every condition, so follow flags and local professional advice.' },
  { question: 'When is the surf season in Phuket?', answer: 'Surf-focused sources commonly associate Phuket’s surf with the southwest-monsoon months, broadly from May into October. Treat this as a planning band, not a wave or lesson guarantee.' },
  { question: 'Can I learn surfing in Phuket?', answer: 'Yes. Kata-based operators advertise private and group beginner lessons and board rental. Compare the current lesson format, instructor-to-student setup, equipment, insurance and cancellation terms before booking.' },
  { question: 'Is Kata Beach safe for surfing?', answer: 'No beach is automatically safe. Conditions, currents, ability, equipment and supervision matter. Do not enter on a red flag; ask lifeguards or a qualified local instructor when you are unsure.' },
  { question: 'Can I rent a surfboard at Kata Beach?', answer: 'Seasonal surf operators advertise board rental, but stock, opening, identification requirements and suitability change. Confirm the board type, leash, damage terms and return time directly.' },
  { question: 'Can non-surfers enjoy Kata Beach during surf season?', answer: 'Yes, but swimmers should stay clear of active surf areas and follow flags and lifeguard directions. Build in cafés, viewpoints, pools or land activities when the sea is unsuitable.' },
];

const relatedGuides = [
  { title: 'Kata area guide', description: 'Decide whether Kata fits your wider Phuket stay beyond the surf lesson.', href: '/phuket/kata/', image: '/images/redesign/kata-area-hero-v2.webp', imageAlt: 'Kata Beach and its green headland' },
  { title: 'Kata Noi guide', description: 'Compare the smaller neighbouring bay and its more contained stay pattern.', href: '/phuket/kata/kata-noi/', image: '/images/redesign/kata-noi-area-hero-v2.webp', imageAlt: 'Kata Noi Beach in Phuket' },
  { title: 'Kata hotels', description: 'Move from area choice to a date-specific accommodation shortlist.', href: '/phuket/kata/hotels/', image: '/images/redesign/phuket-hotels-hero.webp', imageAlt: 'Phuket resort and hotel setting' },
];

const sources = [
  { title: 'Phuket current and seven-day forecast', creator: 'Thai Meteorological Department', url: 'https://www.tmd.go.th/weather/province/phuket', note: 'Primary current weather context.' },
  { title: 'Phuket destination', creator: 'Tourism Authority of Thailand', url: 'https://www.tourismthailand.org/Destinations/Provinces/phuket/350', note: 'Official destination context.' },
  { title: 'Thailand safety and security', creator: 'UK Foreign, Commonwealth & Development Office', url: 'https://www.gov.uk/foreign-travel-advice/thailand/safety-and-security', note: 'Current beach and marine-safety guidance.' },
  { title: 'Kata lessons and rentals', creator: 'Kata Surf Limited', url: 'https://www.katasurflimited.com/', note: 'Direct operator evidence that beginner lessons and rental are offered; current terms require confirmation.' },
  { title: 'A surfer’s guide to Phuket', creator: 'Time Out Phuket', url: 'https://www.timeout.com/phuket/travel/a-surfers-guide-to-phuket', note: 'Recent surf-scene and beach-comparison context, checked against primary safety sources.' },
];

const schemas = [
  {
    '@context': 'https://schema.org', '@type': 'Article', headline: 'Surfing at Kata Beach: Lessons, Season & Safety',
    description: 'Plan surfing at Kata Beach by ability, season and live conditions. Compare lessons, equipment, safety checks, current providers and where to stay.',
    url: PAGE_URL, image: `https://go2-thailand.com${HERO}`, inLanguage: 'en-GB', dateModified: '2026-07-27',
    author: { '@type': 'Organization', name: 'Go2Thailand' }, publisher: { '@type': 'Organization', name: 'Go2Thailand' },
  },
  {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/' },
      { '@type': 'ListItem', position: 2, name: 'Phuket', item: 'https://go2-thailand.com/city/phuket/' },
      { '@type': 'ListItem', position: 3, name: 'Kata Beach', item: 'https://go2-thailand.com/phuket/kata/' },
      { '@type': 'ListItem', position: 4, name: 'Surfing', item: PAGE_URL },
    ],
  },
  { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(({ question, answer }) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) },
];

export function KataSurfingGuideEn({ lessonHref, alternativeLessonHref, hotelHref }: KataSurfingGuideEnProps) {
  return (
    <div className="bg-canvas" data-premium-template="kata-surfing-en">
      <SEOHead title="Surfing at Kata Beach: Lessons, Season & Safety" description="Plan surfing at Kata Beach by ability, season and live conditions. Compare lessons, equipment, safety checks, current providers and where to stay." ogImage={`https://go2-thailand.com${HERO}`}>
        {schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      </SEOHead>

      <EditorialHero
        image={HERO}
        imageAlt="Beginner surfer receiving instruction in small waves at a tropical Phuket beach"
        breadcrumbs={[{ label: 'Thailand', href: '/' }, { label: 'Phuket', href: '/city/phuket/' }, { label: 'Kata Beach', href: '/phuket/kata/' }, { label: 'Surfing' }]}
        eyebrow="Phuket surfing, planned by conditions"
        title={<>Kata surfing.<br /><span className="text-saffron-dark">Let the sea choose the session.</span></>}
        subtitle="A beginner-friendly plan is still a live decision."
        description="Kata is Phuket’s most useful place to compare seasonal surf lessons, but a month on the calendar cannot promise waves—or safety. Start with your ability, check the real conditions, then choose a lesson, rental or beach alternative."
        actions={[{ label: 'Find your surf plan', href: '#fit', kind: 'primary' }, { label: 'Check current lessons', href: lessonHref, kind: 'secondary', newTab: true, affiliate: true }]}
        disclosure="The lesson link is sponsored. We may earn a commission at no extra cost to you. Check the live provider, meeting point, inclusions, weather policy, total and cancellation terms."
        minHeightClassName="min-h-[760px] lg:min-h-[700px]"
        contentClassName="max-w-[720px]"
        titleClassName="max-w-[760px] text-[3.85rem] leading-[0.86] sm:text-[5rem] lg:text-[5.7rem]"
        imageClassName="object-cover object-[64%_center] lg:object-center"
      />
      <PageSectionNav label="On this Kata surfing guide" items={navItems} />

      <section id="fit" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
        <div className="container-custom grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <SectionHeading eyebrow="Choose by ability" title={<>Your level changes<br />the right answer.</>} description="Kata can suit a first lesson and an independent session—but those are not the same decision. Be honest about paddling, board control and confidence in moving water." />
            <svg aria-hidden="true" viewBox="0 0 360 120" className="mt-8 hidden h-28 w-full max-w-sm text-saffron lg:block"><path d="M8 84 C70 118 96 26 154 65 S254 104 342 22" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 8" strokeLinecap="round" /><circle cx="8" cy="84" r="5" fill="currentColor" /><circle cx="154" cy="65" r="4" fill="currentColor" /><path d="M342 12c-8 0-14 6-14 14 0 11 14 24 14 24s14-13 14-24c0-8-6-14-14-14Zm0 19a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z" fill="currentColor" /></svg>
          </div>
          <div>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-jade/10 bg-jade/10 sm:grid-cols-2">
              {fitCards.map(({ eyebrow, title, copy, icon: Icon, dark }, index) => <article key={title} className={`min-h-[245px] p-7 ${dark ? 'bg-jade text-white' : index % 2 ? 'bg-tonal' : 'bg-white'}`}><Icon size={25} className={dark ? 'text-saffron-light' : 'text-jade'} /><p className={`mt-6 text-[9px] font-extrabold uppercase tracking-[.15em] ${dark ? 'text-saffron-light' : 'text-saffron-dark'}`}>{eyebrow}</p><h2 className={`mt-2 font-display text-[1.65rem] font-semibold leading-none ${dark ? 'text-white' : 'text-jade'}`}>{title}</h2><p className={`mt-4 text-xs font-medium leading-6 ${dark ? 'text-white/66' : 'text-charcoal/64'}`}>{copy}</p></article>)}
            </div>
            <p className="mt-5 rounded-xl border border-saffron/25 bg-saffron-pale px-5 py-4 text-xs font-extrabold leading-6 text-jade">Editorial rule: no fixed wave height, school count, rental price or “safe spot” survives the live-condition check.</p>
          </div>
        </div>
      </section>

      <section id="conditions" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><SectionHeading eyebrow="Season is context" title={<>Plan a window.<br />Check the day.</>} /><p className="max-w-[760px] text-sm font-medium leading-7 text-charcoal/64">Phuket’s southwest-monsoon pattern helps explain why surf interest rises in the wetter months. It cannot tell you whether your morning is suitable for a first lesson, an independent paddle-out or swimming.</p></div>
          <div className="mt-10 overflow-hidden rounded-2xl border border-jade/10 bg-jade/10">
            <div className="hidden grid-cols-[.55fr_1.15fr_1.35fr_.75fr] bg-jade px-6 py-4 text-[9px] font-extrabold uppercase tracking-[.14em] text-white md:grid"><span>Planning band</span><span>Broad pattern</span><span>What it means</span><span>Cue</span></div>
            {conditionRows.map((row) => <article key={row.period} className={`grid gap-3 border-b border-jade/10 p-6 last:border-0 md:grid-cols-[.55fr_1.15fr_1.35fr_.75fr] ${row.highlight ? 'bg-saffron-pale' : 'bg-white'}`}><h3 className="font-display text-[1.35rem] font-semibold text-jade">{row.period}</h3><p className="text-xs font-medium leading-5 text-charcoal/64">{row.pattern}</p><p className="text-xs font-medium leading-5 text-charcoal/64">{row.meaning}</p><p className="text-[10px] font-extrabold uppercase tracking-[.1em] text-saffron-dark">{row.cue}</p></article>)}
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {[{ icon: CloudRain, title: 'Forecast', copy: 'Use the current TMD forecast for weather context, then ask the operator about the actual teaching conditions.' }, { icon: Waves, title: 'Beach flags', copy: 'A red flag overrides the itinerary. Do not enter because a booking, rental or calendar says “surf season”.' }, { icon: Users, title: 'Local judgement', copy: 'Lifeguards and qualified instructors can interpret the beach in front of you; an evergreen article cannot.' }].map(({ icon: Icon, title, copy }) => <article key={title} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><Icon size={24} className="text-jade" /><h3 className="mt-5 font-display text-[1.55rem] font-semibold text-jade">{title}</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/64">{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section id="lessons" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
        <div className="container-custom grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
          <SectionHeading eyebrow="Compare the lesson, not the headline price" title={<>Seven checks before<br />you book.</>} description="Kata operators advertise lessons and rental, but formats and conditions vary. Use the live listing and direct operator confirmation for the details that affect your session." />
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ['Level & swim confidence', 'Tell the provider your real surf experience and water confidence; ask how abilities are separated.'],
              ['Instructor setup', 'Check private versus group format, group size and how much in-water supervision is included.'],
              ['Equipment', 'Confirm board type, leash, rash guard or other included kit and whether sizing is chosen for you.'],
              ['Meeting point', 'Verify the exact beach location, arrival time and whether transport is included or separate.'],
              ['Weather policy', 'Ask who cancels for unsafe conditions and whether the remedy is reschedule, credit or refund.'],
              ['Insurance & exclusions', 'Read activity cover, medical or age restrictions and what the provider requires from participants.'],
              ['Rental terms', 'For independent rental, confirm identification, damage terms, return time and whether the board suits the conditions.'],
            ].map(([title, copy], index) => <article key={title} className={`rounded-2xl border p-6 ${index === 0 ? 'border-saffron/25 bg-saffron-pale' : 'border-jade/10 bg-white shadow-editorial-card'}`}><p className="text-[9px] font-extrabold uppercase tracking-[.15em] text-saffron-dark">Check {String(index + 1).padStart(2, '0')}</p><h3 className="mt-3 font-display text-[1.5rem] font-semibold text-jade">{title}</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/64">{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section id="safety" className="section-divider-bottom scroll-mt-24 bg-jade py-14 text-white lg:py-20">
        <div className="container-custom grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
          <div><p className="eyebrow !text-saffron-light">Surf and swimming are different plans</p><h2 className="font-display text-[3.2rem] font-semibold leading-[.9] tracking-[-.035em]">A surfable sea<br />is not a safe swimming sea.</h2><p className="mt-6 text-sm font-medium leading-7 text-white/66">Monsoon conditions can create waves and stronger currents. Keep novice surfers with a suitable instructor, swimmers outside active surf areas and children under close supervision.</p></div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[{ icon: ShieldCheck, title: 'Read the flags', copy: 'Never enter on a red flag. Follow lifeguards and local instructions even when others are in the water.' }, { icon: LifeBuoy, title: 'Stay within ability', copy: 'A lesson, foam board or sandy beach does not remove current, collision or fatigue risk.' }, { icon: Sun, title: 'Protect energy', copy: 'Use hydration and sun protection; stop when tired rather than turning a holiday session into an endurance test.' }].map(({ icon: Icon, title, copy }) => <article key={title} className="rounded-2xl border border-white/13 bg-white/[.065] p-6"><Icon size={25} className="text-saffron-light" /><h3 className="mt-6 font-display text-[1.55rem] font-semibold">{title}</h3><p className="mt-4 text-xs font-medium leading-6 text-white/64">{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section id="plan" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><SectionHeading eyebrow="Build a weather-proof day" title={<>Plan A: surf.<br />Plan B: still Phuket.</>} /><p className="text-sm font-medium leading-7 text-charcoal/64">Book only after reading the live terms, keep enough flexibility for a weather change and do not force the sea to fit a prepaid itinerary.</p></div>
          <div className="mt-10 grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
            <article className="overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card"><div className="relative h-72"><Image src={HERO} alt="Surf instructor helping a beginner at the shoreline" fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover object-[67%_center]" /><div className="absolute inset-0 bg-gradient-to-t from-jade/80 via-transparent to-transparent" /><h3 className="absolute bottom-6 left-6 max-w-sm font-display text-[2.2rem] font-semibold leading-none text-white">Condition is the first booking filter.</h3></div><div className="grid gap-4 p-6 sm:grid-cols-3">{['Confirm the operator', 'Recheck the weather', 'Accept the safe call'].map((step, index) => <div key={step}><p className="text-[9px] font-extrabold uppercase tracking-[.15em] text-saffron-dark">Step {index + 1}</p><p className="mt-2 text-xs font-extrabold text-jade">{step}</p></div>)}</div></article>
            <div className="grid gap-4">
              <a href={lessonHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="group flex flex-col rounded-2xl bg-jade p-7 text-white"><GraduationCap className="text-saffron-light" /><h3 className="mt-6 font-display text-[1.7rem] font-semibold">Klook surf options</h3><p className="mt-3 text-xs font-medium leading-6 text-white/64">Check the current lesson, date, meeting point, inclusions, operator and cancellation terms.</p><span className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-saffron-light">Check current price and availability <ExternalLink size={13} /></span></a>
              <a href={alternativeLessonHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="group flex flex-col rounded-2xl border border-jade/10 bg-tonal p-7"><Waves className="text-jade" /><h3 className="mt-6 font-display text-[1.7rem] font-semibold text-jade">Compare another provider</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/64">Use a second live listing to compare format and terms—not to chase an old headline price.</p><span className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-saffron-dark">Compare current options <ExternalLink size={13} /></span></a>
              <a href={hotelHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="group flex flex-col rounded-2xl border border-jade/10 bg-white p-7 shadow-editorial-card"><Hotel className="text-jade" /><h3 className="mt-6 font-display text-[1.7rem] font-semibold text-jade">Stay near Kata</h3><p className="mt-3 text-xs font-medium leading-6 text-charcoal/64">Compare the exact map pin, access, room terms and total for your dates.</p><span className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-saffron-dark">Check current hotel prices <ExternalLink size={13} /></span></a>
            </div>
          </div>
          <AffiliateDisclosure className="mt-4">Provider links are sponsored. We may earn a commission without increasing your price. We do not set availability, price, conditions or cancellation policy.</AffiliateDisclosure>
        </div>
      </section>

      <FaqSplitSection id="questions" eyebrow="Genuine search questions" title="Kata Beach surfing questions" description="These questions were captured from ten live English SERPs. Answers separate broad seasonal context from the live decision at the beach." items={faqs} />
      <RelatedGuidesSection eyebrow="Continue planning" title="Build the rest of your Kata stay" readLabel="Open the guide" guides={relatedGuides} />
      <SourceMethodSection eyebrow="Sources & method" title="Researched for the decision—not the promise" description="Updated 27 July 2026 after owner ranking and backlink checks, 28 keyword records and 78 competitor-domain records across two DFS clusters, ten live English SERPs with 77 organic results and 52 genuine PAA questions, plus three competitor parses. One source blocked parsing and returned no text. Legacy fixed prices, school counts, wave heights, opening dates, lesson outcomes, travel times and beach-safety guarantees were removed." sources={sources} />
    </div>
  );
}
