import Image from 'next/image';
import { ArrowRight, Waves } from 'lucide-react';

interface CityAdventureBannerProps {
  affiliateHref: string;
  isNl: boolean;
}

const BANNER_IMAGE = '/images/cities/krabi/attractions/phi-phi-aerial.webp';

export function CityAdventureBanner({ affiliateHref, isNl }: CityAdventureBannerProps) {
  return (
    <section className="section-divider-bottom bg-[#fcfaf6] py-10 lg:py-12">
      <div className="container-custom">
        <div className="group relative min-h-[19rem] overflow-hidden rounded-xl border border-jade/10 bg-jade shadow-[0_10px_32px_rgba(18,63,54,0.12)] sm:min-h-[17rem] lg:min-h-[19.5rem]">
          <Image
            src={BANNER_IMAGE}
            alt={isNl ? 'Turquoise baaien en kalkstenen kliffen bij de Phi Phi-eilanden in Krabi' : 'Turquoise bays and limestone cliffs near the Phi Phi Islands in Krabi'}
            fill
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="object-cover object-[64%_center] transition duration-[1200ms] group-hover:scale-[1.025] sm:object-center"
          />

          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,48,40,0.94)_0%,rgba(8,48,40,0.78)_42%,rgba(8,48,40,0.28)_78%,rgba(8,48,40,0.12)_100%)] sm:bg-[linear-gradient(90deg,rgba(8,48,40,0.94)_0%,rgba(8,48,40,0.66)_31%,rgba(8,48,40,0.08)_61%,rgba(8,48,40,0)_78%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-jade/15 via-transparent to-black/5" />

          <div className="relative z-10 flex min-h-[19rem] max-w-[35rem] flex-col justify-center px-7 py-9 text-white sm:min-h-[17rem] sm:px-10 lg:min-h-[19.5rem] lg:px-14">
            <span className="mb-4 grid h-9 w-9 place-items-center rounded-lg border border-white/30 bg-white/10 backdrop-blur-sm">
              <Waves size={18} />
            </span>
            <h2 className="max-w-[31rem] font-display text-[2.7rem] font-semibold leading-[0.88] tracking-[-0.035em] sm:text-[3.2rem] lg:text-[3.65rem]">
              {isNl ? 'Van kliffen naar verborgen lagunes' : 'From cliffs to hidden lagoons'}
            </h2>
            <p className="mt-4 max-w-[27rem] text-sm leading-6 text-white/78">
              {isNl
                ? 'Laat je meevoeren naar eilanden en baaien die je niet snel vergeet.'
                : 'Let the sea carry you to islands and bays you will not soon forget.'}
            </p>
            <a
              href={affiliateHref}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="mt-6 inline-flex w-fit items-center gap-3 rounded-lg border border-saffron-light/35 bg-saffron px-5 py-3 text-xs font-extrabold text-white shadow-[0_8px_24px_rgba(242,145,30,0.22)] transition hover:-translate-y-0.5 hover:bg-saffron-dark"
            >
              {isNl ? 'Ontdek de eilanden' : 'Discover the islands'}
              <span className="grid h-6 w-6 place-items-center rounded-md border border-white/30 bg-white/10">
                <ArrowRight size={13} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
