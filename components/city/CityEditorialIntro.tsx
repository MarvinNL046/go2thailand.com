import Image from 'next/image';
import { StoryDottedRoute } from '../visuals/StoryDottedRoute';

interface CityEditorialIntroProps {
  cityName: string;
  citySlug: string;
  editorial: string;
  imageSrc: string;
  isNl: boolean;
}

export function CityEditorialIntro({ cityName, citySlug, editorial, imageSrc, isNl }: CityEditorialIntroProps) {
  const isKrabi = citySlug === 'krabi';
  const isBangkok = citySlug === 'bangkok' && !isNl;
  const isChiangMai = citySlug === 'chiang-mai' && !isNl;
  const title = isKrabi
    ? (isNl ? 'Krabi in het kort' : 'Krabi at a glance')
    : isBangkok
      ? 'Bangkok at a glance'
    : isChiangMai
      ? 'Chiang Mai at a glance'
      : (isNl ? `${cityName} op z’n mooist` : `${cityName} at its finest`);
  const paragraphs = isKrabi
    ? isNl
      ? [
          'Krabi is een provincie aan de Andamanse kust van Zuid-Thailand. De naam wordt ook gebruikt voor Krabi Town, de provinciehoofdstad. De meeste strandreizigers slapen niet in de stad, maar in Ao Nang, Railay of aan de rustigere kust bij Klong Muang en Tubkaek.',
          'Ao Nang is voor een eerste bezoek de praktischste uitvalsbasis: boten naar Railay en de eilanden vertrekken dichtbij en je hebt veel keuze uit restaurants en hotels. Railay past beter bij een bijzonder strandverblijf, terwijl Krabi Town aantrekkelijk is voor markten en een lokalere sfeer. Vier dagen is voor de meeste reizigers een goede balans tussen zee, vasteland en rust.',
        ]
      : [
          'Krabi is a province on southern Thailand’s Andaman coast, and Krabi Town is its provincial capital. Most beach travellers stay outside the town in Ao Nang, Railay or along the quieter Klong Muang and Tubkaak coast.',
          'Ao Nang is usually the easiest first base because boats, transfers, restaurants and hotels are close at hand. Railay suits a scenery-led beach stay, while Krabi Town is stronger for markets and a more local evening. Four days gives most first-time visitors a useful balance of coast, mainland and breathing room.',
        ]
    : isBangkok
      ? [
          'Bangkok is Thailand’s capital and its largest urban region, but the visitor experience is split across distinct clusters. Rattanakosin and Thonburi hold the royal and temple core; the Chao Phraya links heritage districts; Chinatown is a food and trade city of its own; Siam, Sukhumvit, Silom and Sathorn follow different rail and evening rhythms.',
          'For a first visit, choose one well-connected base and build days by neighbourhood rather than by a citywide attraction list. Three full days can combine old Bangkok and the river, Chinatown and local food, then the modern city with green space. A fourth or fifth day adds depth rather than urgency.',
        ]
    : isChiangMai
      ? [
          'Chiang Mai is Northern Thailand’s cultural hub, built around a moat-ringed historic core but extending west toward Nimman and Doi Suthep and east toward the Ping River. The Old City is strongest for temple walks; Nimman adds cafes and modern design; the riverside gives the trip a slower hotel and dining rhythm.',
          'For a first visit, three full days can combine the Old City, a mountain-side route and one deeper experience such as a cooking class or carefully researched sanctuary. Add time for craft culture or nature, and treat live air quality as a planning input rather than a footnote.',
        ]
      : [editorial].filter(Boolean);

  return (
    <section id="over-bestemming" className="section-divider-bottom scroll-mt-24 bg-[#fcfaf6]">
      <div className="container-custom grid items-center gap-8 py-12 lg:grid-cols-[0.72fr_1.55fr] lg:gap-14 lg:py-16">
        <div className="relative self-stretch lg:flex lg:flex-col lg:justify-center">
          <p className="eyebrow">{isKrabi ? (isNl ? 'Eerst even oriënteren' : 'Start with the essentials') : isBangkok ? 'Start with the city structure' : isChiangMai ? 'Start with the city and mountain' : (isNl ? 'Ontdek de bestemming' : 'Discover the destination')}</p>
          <h2 className="font-display text-[3.1rem] font-semibold leading-[0.9] tracking-[-0.035em] text-jade sm:text-[3.7rem]">{title}</h2>
          <div className="mt-6 max-w-[31rem] space-y-4 text-sm leading-7 text-charcoal/62">
            {paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <StoryDottedRoute className="mt-1 ml-auto hidden h-[112px] w-[145px] opacity-85 sm:block lg:mr-3" />
        </div>

        <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-jade/10 bg-jade/5 shadow-[0_8px_28px_rgba(18,63,54,0.06)] lg:aspect-[16/8.8]">
          <Image src={imageSrc} alt={isNl ? `${cityName} vanuit de lucht` : `${cityName} city overview`} fill sizes="(min-width: 1024px) 65vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-jade/10 via-transparent to-white/5" />
        </div>
      </div>
    </section>
  );
}
