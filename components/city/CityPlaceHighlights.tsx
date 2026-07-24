import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CityPlaceHighlightsProps {
  isNl: boolean;
}

const places = [
  {
    title: 'Railay Beach',
    href: '/city/krabi/attractions/railay-beach/',
    image: '/images/cities/krabi/attractions/railayBeach.webp',
    description: {
      nl: 'Iconische kalkstenen kliffen, wit zand en kristalhelder water. Alleen bereikbaar per boot vanuit Ao Nang.',
      en: 'Iconic limestone cliffs, white sand and crystal-clear water. Accessible only by boat from Ao Nang.',
    },
  },
  {
    title: 'Ao Nang',
    href: '/city/krabi/attractions/ao-nang-beach/',
    image: '/images/cities/krabi/attractions/ao nang beach.webp',
    description: {
      nl: 'Een levendige strandplaats met veel restaurants en de praktischste eerste uitvalsbasis voor boottochten.',
      en: 'A lively beach town with a restaurant-lined boulevard and the perfect base for boat trips.',
    },
  },
  {
    title: 'Koh Lanta',
    href: '/islands/koh-lanta/',
    image: '/images/islands/koh-lanta.webp',
    description: {
      nl: 'Rustige stranden, een ontspannen sfeer en mooie zonsondergangen aan de zuidelijke kust van de provincie Krabi.',
      en: 'Quiet beaches, a laid-back atmosphere and beautiful sunsets along Krabi’s southern coast.',
    },
  },
] as const;

export function CityPlaceHighlights({ isNl }: CityPlaceHighlightsProps) {
  return (
    <section id="stranden" className="section-divider-bottom scroll-mt-24 bg-[#fcfaf6] py-12 lg:py-14">
      <div className="container-custom">
        <div className="mb-6 flex items-end justify-between gap-5">
          <div>
            <p className="eyebrow">{isNl ? 'Van kust tot eiland' : 'From coast to island'}</p>
            <h3 className="font-display text-[2.8rem] font-semibold leading-none tracking-[-0.035em] text-jade sm:text-[3.25rem]">
              {isNl ? 'Drie plekken voor een eerste reis' : 'Three places for a first trip'}
            </h3>
          </div>
          <Link href="/city/krabi/attractions/" className="hidden items-center gap-2 text-xs font-bold text-jade transition hover:text-saffron-dark sm:flex">
            {isNl ? 'Alle bezienswaardigheden in Krabi' : 'All attractions in Krabi'} <ArrowRight size={15} />
          </Link>
        </div>

        <div className="scrollbar-hide flex snap-x gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible">
          {places.map(place => (
            <Link
              key={place.title}
              href={place.href}
              className="group min-w-[84vw] snap-start overflow-hidden rounded-xl border border-jade/10 bg-white shadow-[0_5px_18px_rgba(18,63,54,0.045)] transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:min-w-0"
            >
              <div className="relative aspect-[16/9.2] overflow-hidden bg-jade/5">
                <Image
                  src={place.image}
                  alt={isNl ? `${place.title} in Krabi, Thailand` : `${place.title} in Krabi, Thailand`}
                  fill
                  sizes="(min-width: 640px) 33vw, 84vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-jade/15 via-transparent to-white/5" />
              </div>

              <div className="flex min-h-[10.5rem] flex-col p-4 sm:p-5">
                <h4 className="font-display text-[1.65rem] font-semibold leading-none tracking-[-0.02em] text-jade">{place.title}</h4>
                <p className="mt-3 text-xs leading-5 text-charcoal/58">{isNl ? place.description.nl : place.description.en}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-5 text-xs font-bold text-jade transition group-hover:text-saffron-dark">
                  {isNl ? 'Lees meer' : 'Read more'}
                  <span className="grid h-7 w-7 place-items-center rounded-lg border border-jade/10 transition group-hover:border-saffron/50">
                    <ArrowRight size={13} />
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <Link href="/city/krabi/attractions/" className="mt-5 flex items-center justify-end gap-2 text-xs font-bold text-jade sm:hidden">
          {isNl ? 'Alle bezienswaardigheden in Krabi' : 'All attractions in Krabi'} <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
