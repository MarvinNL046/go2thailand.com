import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  ArrowRight,
  Building2,
  Camera,
  Clock,
  Compass,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import { cityAffiliates, KLOOK_GENERIC, TRIP_GENERIC, withPlacementSubId } from '../../lib/affiliates';
import { useSubId } from '../../lib/useSubId';
import { DottedRoute } from '../visuals/DottedRoute';
import { StoryDottedRoute } from '../visuals/StoryDottedRoute';
import { ThailandMapGraphic } from '../visuals/ThailandMapGraphic';
import { HomeHero } from './HomeHero';

type LocalizedCopy = { nl: string; en: string };

const destinations = [
  { name: 'Bangkok', copy: { nl: 'Stad die nooit slaapt', en: 'The city that never sleeps' }, image: '/images/redesign/destination-bangkok.webp', href: '/city/bangkok/' },
  { name: 'Chiang Mai', copy: { nl: 'Cultuur en natuur', en: 'Culture and nature' }, image: '/images/redesign/destination-chiang-mai.webp', href: '/city/chiang-mai/' },
  { name: 'Krabi', copy: { nl: 'Zon, zee & kalkstenen kliffen', en: 'Sea, sun & limestone cliffs' }, image: '/images/redesign/destination-krabi.webp', href: '/city/krabi/' },
  { name: 'Koh Samui', copy: { nl: 'Tropisch genieten', en: 'A tropical escape' }, image: '/images/redesign/destination-koh-samui.webp', href: '/city/koh-samui/' },
];

const experiences = [
  { title: { nl: 'Ayutthaya dagtour vanuit Bangkok', en: 'Ayutthaya day trip from Bangkok' }, image: '/images/redesign/experience-ayutthaya.webp', duration: { nl: '9 uur', en: '9 hours' }, href: cityAffiliates.ayutthaya?.klook || KLOOK_GENERIC, placement: 'ayutthaya-day-trip' },
  { title: { nl: 'Snorkelen bij de Similan Islands', en: 'Snorkel the Similan Islands' }, image: '/images/redesign/experience-snorkelling.webp', duration: { nl: '10 uur', en: '10 hours' }, href: cityAffiliates.phuket?.klook || KLOOK_GENERIC, placement: 'similan-snorkelling' },
  { title: { nl: 'Thaise kookcursus in Chiang Mai', en: 'Thai cooking class in Chiang Mai' }, image: '/images/redesign/experience-cooking.webp', duration: { nl: '4 uur', en: '4 hours' }, href: cityAffiliates['chiang-mai']?.klook || KLOOK_GENERIC, placement: 'chiang-mai-cooking-class' },
  { title: { nl: 'Ethische olifantenopvang', en: 'Ethical elephant sanctuary' }, image: '/images/redesign/experience-elephants.webp', duration: { nl: '5 uur', en: '5 hours' }, href: cityAffiliates['chiang-mai']?.klook || KLOOK_GENERIC, placement: 'ethical-elephant-sanctuary' },
];

const hotels = [
  { name: { nl: 'Eilandhideaways', en: 'Island hideaways' }, location: 'Koh Samui', image: '/images/redesign/stay-island-hideaway.webp' },
  { name: { nl: 'Rooftop hotels', en: 'Rooftop hotels' }, location: 'Bangkok', image: '/images/redesign/stay-bangkok-rooftop.webp' },
  { name: { nl: 'Barefoot beach resorts', en: 'Barefoot beach resorts' }, location: 'Krabi & Phi Phi', image: '/images/redesign/stay-beach-retreat.webp' },
];

const articles = [
  { category: { nl: 'Begin hier', en: 'Start here' }, title: { nl: 'Complete Thailand-reisgids', en: 'Thailand travel guide for first-timers' }, copy: { nl: 'Maak eerst de juiste keuzes voor route, seizoen, budget en praktische voorbereiding.', en: 'Make the key route, season, budget and practical decisions before you book.' }, image: '/images/blog/phuket-vs-koh-samui-for-tourists.webp', href: '/thailand-travel-guide/' },
  { category: { nl: 'Tips', en: 'Tips' }, title: { nl: 'Beste reistijd voor Thailand', en: 'The best time to visit Thailand' }, copy: { nl: 'Per regio en seizoen: zo haal je het meeste uit je reis.', en: 'Plan by region and season to make the most of your trip.' }, image: '/images/blog/night-markets-food-lovers-bangkok-chiang-mai-phuket.webp', href: '/weather/' },
  { category: { nl: 'Stedentrip', en: 'City trip' }, title: { nl: '48 uur in Bangkok', en: '48 hours in Bangkok' }, copy: { nl: 'Sla de highlights niet over tijdens een kort verblijf in de hoofdstad.', en: 'Make the most of a short stay in Thailand\'s capital.' }, image: '/images/blog/bangkok-best-city-asia-2026-destinasian-award.webp', href: '/city/bangkok/' },
  { category: { nl: 'Overnachten', en: 'Stay' }, title: { nl: 'De beste hotels aan het strand', en: 'The best beachfront hotels' }, copy: { nl: 'Onze favoriete strandhotels voor ieder budget en elke reisstijl.', en: 'Our favourite beachfront stays for every budget and travel style.' }, image: '/images/blog/new-luxury-resorts-thailand-2026-marriott-hilton-mercure.webp', href: '/top-10/hotels/' },
];

function DestinationCard({ item }: { item: typeof destinations[number] }) {
  const { locale } = useRouter();
  const lang = locale === 'nl' ? 'nl' : 'en';
  return (
    <Link href={item.href} className="group relative min-h-[345px] min-w-[78vw] snap-start overflow-hidden rounded-[0.9rem] bg-jade text-white sm:min-w-0">
      <Image src={item.image} alt={item.name} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 768px) 90vw, 25vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-jade/95 via-jade/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
        <div><h3 className="font-display text-[1.7rem] leading-none">{item.name}</h3><p className="mt-1.5 text-[11px] leading-snug text-white/80">{item.copy[lang]}</p></div>
        <ArrowRight className="mb-0.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" size={17} />
      </div>
    </Link>
  );
}

function ExperienceCard({ item }: { item: typeof experiences[number] }) {
  const { locale } = useRouter();
  const lang = locale === 'nl' ? 'nl' : 'en';
  const subId = useSubId();
  return (
    <a href={withPlacementSubId(item.href, subId, item.placement)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="group min-w-[82vw] snap-start overflow-hidden rounded-xl border border-jade/10 bg-white shadow-[0_4px_16px_rgba(18,63,54,0.04)] transition hover:-translate-y-1 hover:shadow-xl sm:min-w-0">
      <div className="relative aspect-[3/2] overflow-hidden"><Image src={item.image} alt={item.title[lang]} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 768px) 82vw, 25vw" /></div>
      <div className="p-4">
        <h3 className="min-h-[2.5rem] text-sm font-bold leading-snug text-jade">{item.title[lang]}</h3>
        <div className="mt-2.5 flex items-center gap-3 text-[11px] text-charcoal/50">
          <span className="flex items-center gap-1"><Clock size={13} strokeWidth={1.7} />{item.duration[lang]}</span>
          <span className="flex items-center gap-1"><ShieldCheck size={13} strokeWidth={1.7} />{lang === 'nl' ? 'Via Klook' : 'Via Klook'}</span>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3"><span className="text-xs font-bold text-jade">{lang === 'nl' ? 'Bekijk beschikbaarheid op Klook' : 'Check availability on Klook'}</span><ArrowRight className="shrink-0 text-saffron transition-transform duration-300 group-hover:translate-x-1" size={17} /></div>
      </div>
    </a>
  );
}

export default function RedesignHome() {
  const { locale } = useRouter();
  const lang: keyof LocalizedCopy = locale === 'nl' ? 'nl' : 'en';
  const subId = useSubId();
  const c = (nl: string, en: string) => (lang === 'nl' ? nl : en);

  return (
    <div className="bg-ivory text-charcoal">
      <HomeHero />

      <section className="destination-story-section py-14 lg:py-[72px]">
        <div className="container-custom relative">
          <div className="grid gap-9 lg:grid-cols-[270px_minmax(0,1fr)] lg:items-end lg:gap-6">
            <div className="relative z-10">
              <p className="eyebrow">{c('Vind jouw plek', 'Find your place')}</p>
              <h2 className="font-display text-[3rem] font-semibold leading-[0.9] tracking-[-0.025em] text-jade lg:text-[2.9rem]">
                {lang === 'nl' ? <>Eén land.<br /><span className="whitespace-nowrap">Eindeloos veel</span><br />verhalen.</> : <>One country.<br />Endless<br />stories.</>}
              </h2>
              <p className="mt-5 max-w-[235px] text-sm leading-relaxed text-charcoal/65">{c('Van bruisende steden en eeuwenoude tradities tot parelwitte stranden en verborgen jungles.', 'From vibrant cities and ancient traditions to white beaches and hidden jungles.')}</p>
              <Link href="/city/" className="mt-6 inline-flex items-center gap-3 text-sm font-bold text-jade transition hover:text-saffron-dark">{c('Laat je inspireren', 'Get inspired')} <ArrowRight size={16} /></Link>
              <StoryDottedRoute className="pointer-events-none absolute -bottom-11 right-0 hidden w-[155px] lg:block" />
            </div>
            <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
              {destinations.map(item => <DestinationCard item={item} key={item.name} />)}
            </div>
          </div>
        </div>
      </section>

      <section className="section-divider-top bg-[#fcfaf6] py-12 lg:py-14">
        <div className="container-custom">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="font-display text-[2.5rem] font-semibold leading-none tracking-[-0.02em] text-jade lg:text-[2.75rem]">{c('Dit wil je meemaken', 'Experiences worth travelling for')}</h2>
            <span className="hidden items-center gap-2 text-xs font-medium text-charcoal/55 sm:flex"><ShieldCheck className="text-jade" size={18} strokeWidth={1.6} />{c('Boek veilig via Klook', 'Book safely via Klook')}</span>
          </div>
          <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
            {experiences.map(item => <ExperienceCard item={item} key={item.title.nl} />)}
          </div>
          <p className="mt-5 max-w-4xl text-[11px] leading-5 text-charcoal/50">
            {lang === 'nl' ? <>
              Kies eerst je plek in onze <Link href="/city/" className="font-bold text-jade underline decoration-saffron/45 underline-offset-4">bestemmingengids</Link> en plaats het uitje daarna in een logische <Link href="/itineraries/" className="font-bold text-jade underline decoration-saffron/45 underline-offset-4">Thailand-reisroute</Link>. De uitjes hierboven bevatten affiliatelinks; bij een boeking kunnen wij een commissie ontvangen zonder extra kosten voor jou.
            </> : <>
              Choose your place in our <Link href="/city/" className="font-bold text-jade underline decoration-saffron/45 underline-offset-4">destination guide</Link>, then fit the experience into a logical <Link href="/itineraries/" className="font-bold text-jade underline decoration-saffron/45 underline-offset-4">Thailand itinerary</Link>. The experiences above contain affiliate links; we may earn a commission at no extra cost to you.
            </>}
          </p>
        </div>
      </section>

      <section className="bg-[#fcfaf6] pb-10 pt-1">
        <div className="container-custom">
          <div className="relative min-h-[420px] overflow-hidden rounded-xl text-white lg:min-h-[260px]">
            <Image src="/images/redesign/midpage-jungle.webp" alt={c('Reiziger ontdekt een verborgen waterval in Thailand', 'Traveller discovering a hidden waterfall in Thailand')} fill className="object-cover object-[67%_center] lg:object-center" sizes="(max-width: 1280px) 100vw, 1216px" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#07372f]/95 via-[#07372f]/72 to-[#07372f]/5 lg:via-[#07372f]/52 lg:to-transparent" />
            <div className="relative flex min-h-[420px] max-w-[470px] flex-col justify-center px-7 py-10 lg:min-h-[260px] lg:px-10 lg:py-8">
              <h2 className="font-display text-[3rem] font-semibold leading-[0.86] tracking-[-0.025em] lg:text-[3.4rem]">{c('Verder dan de bekende route', 'Go beyond the familiar route')}</h2>
              <p className="mt-4 max-w-[350px] text-sm leading-relaxed text-white/80">{c('Ontdek verborgen plekken, authentieke dorpen en natuur die je raakt.', 'Discover hidden places, authentic villages and nature that stays with you.')}</p>
              <Link href="/travel-guides/" className="mt-5 inline-flex w-fit items-center gap-3 rounded-lg border border-white/65 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white hover:text-jade">{c('Bekijk verborgen parels', 'Discover hidden gems')} <ArrowRight size={15} /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fcfaf6] py-12 lg:py-14">
        <div className="container-custom">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="font-display text-[2.5rem] font-semibold leading-none tracking-[-0.02em] text-jade lg:text-[2.75rem]">{c('Slapen op bijzondere plekken', 'Stay somewhere special')}</h2>
            <span className="hidden items-center gap-2 text-xs font-medium text-charcoal/55 sm:flex"><Building2 className="text-jade" size={18} strokeWidth={1.5} />{c('Hotels via Trip.com', 'Hotels via Trip.com')}</span>
          </div>
          <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
            {hotels.map(hotel => (
              <a key={hotel.name.en} href={withPlacementSubId(TRIP_GENERIC, subId, `hotels-${hotel.location.toLowerCase().replace(/[^a-z]+/g, '-')}`)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="group min-w-[88vw] snap-start overflow-hidden rounded-xl border border-jade/10 bg-white shadow-[0_4px_16px_rgba(18,63,54,0.04)] transition hover:-translate-y-1 hover:shadow-xl sm:min-w-0">
                <div className="relative aspect-[8/3] overflow-hidden"><Image src={hotel.image} alt={hotel.name[lang]} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 640px) 88vw, (max-width: 1024px) 50vw, 33vw" /></div>
                <div className="flex items-start justify-between gap-4 p-4">
                  <div className="min-w-0">
                    <h3 className="truncate font-display text-xl font-semibold leading-none text-jade">{hotel.name[lang]}</h3>
                    <p className="mt-2 flex items-center gap-1 text-[11px] text-charcoal/50"><MapPin size={12} strokeWidth={1.7} />{hotel.location}</p>
                    <p className="mt-1 text-[10px] text-charcoal/50">{c('Hotels vergelijken via Trip.com', 'Compare hotels on Trip.com')}</p>
                  </div>
                  <span className="inline-flex max-w-[116px] shrink-0 items-center gap-1.5 text-right text-[11px] font-bold leading-snug text-jade">
                    {c('Bekijk actuele prijs', 'Check current price')} <ArrowRight className="shrink-0 text-saffron transition-transform duration-300 group-hover:translate-x-1" size={15} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fcfaf6] pb-10"><div className="container-custom"><div className="grid overflow-hidden rounded-xl border border-saffron/25 bg-white/75 md:grid-cols-3">{[
        [MapPin, c('Kies je plek','Choose your place'), c('Vind de bestemming die bij jouw reistijd en wensen past.','Find the destination that fits your timing and wishes.')],
        [Camera, c('Vind je ervaring','Find your experience'), c('Ontdek activiteiten en tours die je reis onvergetelijk maken.','Discover activities and tours that make your trip unforgettable.')],
        [ShieldCheck, c('Boek met vertrouwen','Book with confidence'), c('Veilig boeken via betrouwbare partners met duidelijke voorwaarden.','Book safely through trusted partners with clear terms.')],
      ].map(([Icon,title,copy], i) => { const StepIcon = Icon as typeof Compass; return <div key={String(title)} className="flex items-center gap-4 border-b border-jade/10 px-5 py-5 last:border-0 md:border-b-0 md:border-r md:last:border-r-0"><div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-saffron/30 bg-[#fcfaf6] text-jade"><StepIcon size={21} strokeWidth={1.7} /></div><div><div className="flex items-center gap-2"><span className="grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-jade text-[10px] font-bold text-white">{i+1}</span><h3 className="font-display text-xl font-semibold leading-none text-jade">{String(title)}</h3></div><p className="mt-2 max-w-[275px] text-[11px] leading-relaxed text-charcoal/50">{String(copy)}</p></div></div>; })}</div></div></section>

      <section className="bg-[#fcfaf6] pb-12">
        <div className="container-custom">
          <div className="relative grid min-h-[560px] overflow-hidden rounded-[1.25rem] bg-[#073a31] px-6 py-8 text-white sm:px-10 lg:min-h-[300px] lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-14 lg:py-9">
            <div className="relative z-10 max-w-[590px]">
              <p className="eyebrow text-saffron-light">{c('Jouw route door Thailand', 'Your route through Thailand')}</p>
              <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.025em] sm:text-[3.3rem]">{c('Nog niet zeker waar je heen wilt?', 'Not sure where to go yet?')}</h2>
              <p className="mt-4 max-w-[520px] text-sm leading-relaxed text-white/70">{c('Ontdek onze zorgvuldig samengestelde reisroutes en vind een route die past bij jouw wensen, reistijd en interesses.', 'Explore our carefully curated itineraries and find a route that fits your wishes, timing and interests.')}</p>
              <Link href="/itineraries/" className="group mt-5 inline-flex items-center gap-3 rounded-xl bg-saffron px-5 py-3 text-sm font-bold text-white transition hover:bg-saffron-dark">{c('Bekijk onze reisroutes', 'Explore our itineraries')} <ArrowRight className="transition-transform group-hover:translate-x-1" size={16} /></Link>
            </div>
            <div className="relative mt-5 min-h-[210px] lg:mt-0 lg:min-h-[230px]">
              <ThailandMapGraphic label={c('Geografische kaart van Thailand', 'Geographic map of Thailand')} className="absolute bottom-[-35px] left-1/2 h-[300px] w-auto -translate-x-1/2 opacity-[0.34] lg:bottom-[-25px] lg:left-auto lg:right-20 lg:h-[300px] lg:translate-x-0" />
              <DottedRoute light className="absolute bottom-2 left-1/2 w-[min(112%,390px)] -translate-x-1/2 lg:bottom-3 lg:left-auto lg:right-0 lg:w-[min(100%,460px)] lg:translate-x-0" />
            </div>
            <div className="pointer-events-none absolute inset-0 opacity-[0.065]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '22px 22px' }} />
          </div>
        </div>
      </section>

      <section className="bg-[#fcfaf6] py-12 lg:py-14">
        <div className="container-custom">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="font-display text-[2rem] font-semibold leading-none tracking-[-0.015em] text-jade lg:text-[2.2rem]">{c('Reisinspiratie & gidsen', 'Travel inspiration & guides')}</h2>
            <Link href="/blog/" className="hidden items-center gap-3 text-xs font-bold text-jade transition hover:text-saffron-dark sm:flex">{c('Naar alle artikelen','All articles')} <ArrowRight size={15} /></Link>
          </div>
          <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
            {articles.map(article => (
              <Link key={article.href} href={article.href} className="group min-w-[82vw] snap-start overflow-hidden rounded-xl border border-jade/10 bg-white shadow-[0_4px_16px_rgba(18,63,54,0.04)] transition hover:-translate-y-1 hover:shadow-xl sm:min-w-0">
                <div className="relative aspect-[12/5] overflow-hidden">
                  <Image src={article.image} alt={article.title[lang]} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 640px) 82vw, (max-width: 1024px) 50vw, 25vw" />
                  <span className="absolute left-3 top-3 rounded-md bg-jade/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm">{article.category[lang]}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-display text-xl font-semibold leading-tight text-jade">{article.title[lang]}</h3>
                  <p className="mt-1.5 min-h-[2.5rem] text-[11px] leading-relaxed text-charcoal/50">{article.copy[lang]}</p>
                  <span className="mt-3 inline-flex items-center gap-2 text-[11px] font-bold text-jade">{c('Lees meer','Read more')} <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={14} /></span>
                </div>
              </Link>
            ))}
          </div>
          <Link href="/blog/" className="mt-6 inline-flex items-center gap-3 text-xs font-bold text-jade sm:hidden">{c('Naar alle artikelen','All articles')} <ArrowRight size={15} /></Link>
        </div>
      </section>
    </div>
  );
}
