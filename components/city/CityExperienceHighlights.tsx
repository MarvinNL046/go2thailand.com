import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock3, ShieldCheck } from 'lucide-react';

interface CityExperienceHighlightsProps {
  affiliateHref: string;
  isNl: boolean;
}

const experiences = [
  {
    title: { nl: 'Phi Phi-eilandentour', en: 'Phi Phi island tour' },
    image: '/images/cities/krabi/attractions/nui-beach-drone.webp',
    duration: { nl: 'hele dag', en: 'full day' },
  },
  {
    title: { nl: 'Kajakken bij Ao Thalane', en: 'Kayaking at Ao Thalane' },
    image: '/images/blog/best-kayaking-paddleboarding-spots-thailand-2026.webp',
    duration: { nl: 'halve dag', en: 'half day' },
  },
  {
    title: { nl: 'Klimmen bij Railay', en: 'Railay climbing experience' },
    image: '/images/blog/rock-climbing-in-railay-thailands-most-dramatic-setting.webp',
    duration: { nl: 'halve dag', en: 'half day' },
  },
  {
    title: { nl: 'Emerald Pool en warmwaterbronnen', en: 'Emerald Pool & Hot Springs' },
    image: '/images/cities/krabi/attractions/emerald pool.webp',
    duration: { nl: 'hele dag', en: 'full day' },
  },
] as const;

export function CityExperienceHighlights({ affiliateHref, isNl }: CityExperienceHighlightsProps) {
  return (
    <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-14">
      <div className="container-custom">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">{isNl ? 'Strand, eilanden en vasteland' : 'Beaches, islands and mainland'}</p>
            <h2 className="font-display text-[2.8rem] font-semibold leading-none tracking-[-0.035em] text-jade sm:text-[3.25rem]">{isNl ? 'Wat te doen in Krabi: de mooiste bezienswaardigheden' : 'The best things to do in Krabi'}</h2>
          </div>
          <Link href="/city/krabi/attractions/" className="hidden items-center gap-2 text-xs font-bold text-jade transition hover:text-saffron-dark sm:flex">
            {isNl ? 'Alle bezienswaardigheden in Krabi' : 'All attractions in Krabi'} <ArrowRight size={15} />
          </Link>
        </div>

        <p className="mb-7 max-w-3xl text-sm leading-7 text-charcoal/65">
          {isNl
            ? 'Combineer tijdens een eerste bezoek één stranddag bij Railay, één bootdag naar de eilanden en één ervaring op het vasteland. Zo zie je de kalksteenlandschappen waarvoor Krabi bekendstaat, zonder dat iedere dag op een vergelijkbare eilandtour gaat lijken.'
            : 'For a first visit, combine one beach day at Railay, one island day and one mainland experience. This gives you Krabi’s signature limestone scenery without making every day feel like the same boat tour.'}
        </p>

        <div className="scrollbar-hide flex snap-x gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
          {experiences.map(experience => (
            <a key={experience.title.en} href={affiliateHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="group min-w-[79vw] snap-start overflow-hidden rounded-xl border border-jade/10 bg-white shadow-[0_4px_16px_rgba(18,63,54,0.04)] transition hover:-translate-y-1 hover:shadow-xl sm:min-w-0">
              <div className="relative aspect-[4/2.65] overflow-hidden bg-jade/5">
                <Image src={experience.image} alt={isNl ? experience.title.nl : experience.title.en} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 79vw" className="object-cover transition duration-500 group-hover:scale-[1.035]" />
              </div>
              <div className="p-4">
                <h3 className="min-h-[2.5rem] text-sm font-bold leading-5 text-jade">{isNl ? experience.title.nl : experience.title.en}</h3>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-charcoal/48">
                  <span className="inline-flex items-center gap-1"><Clock3 size={12} />{isNl ? experience.duration.nl : experience.duration.en}</span>
                </div>
                <div className="mt-4 flex items-end justify-between border-t border-jade/8 pt-3">
                  <span className="text-[10px] font-semibold text-charcoal/55">{isNl ? 'Bekijk actuele opties via Klook' : 'View current options on Klook'}</span>
                  <span className="grid h-8 w-8 place-items-center rounded-lg border border-jade/10 text-jade transition group-hover:border-saffron group-hover:text-saffron-dark"><ArrowRight size={15} /></span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-end gap-x-5 gap-y-3 text-xs font-bold">
          <Link href="/city/krabi/attractions/" className="inline-flex items-center gap-2 text-jade transition hover:text-saffron-dark">
            {isNl ? 'Alle bezienswaardigheden in Krabi' : 'All attractions in Krabi'} <ArrowRight size={14} />
          </Link>
          <a href={affiliateHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center gap-2 text-jade transition hover:text-saffron-dark">
            <ShieldCheck size={15} /> {isNl ? 'Uitjes bekijken via Klook' : 'View experiences on Klook'} <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
