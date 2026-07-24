import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Building2, MapPin } from 'lucide-react';

interface CityHotelHighlightsProps {
  affiliateHref: string;
  isNl: boolean;
}

const hotels = [
  {
    name: 'Centara Grand Beach Resort & Villas Krabi',
    area: 'Pai Plong Beach',
    image: '/images/redesign/krabi-hotel-cliff-resort.webp',
  },
  {
    name: 'Dusit Thani Krabi Beach Resort',
    area: 'Klong Muang',
    image: '/images/redesign/krabi-hotel-beach-resort.webp',
  },
  {
    name: 'Anana Ecological Resort Krabi',
    area: 'Ao Nang',
    image: '/images/redesign/krabi-hotel-eco-resort.webp',
  },
] as const;

const stayAreas = [
  { name: 'Ao Nang', nl: 'Handig voor een eerste bezoek, restaurants en boottochten.', en: 'Convenient for a first visit, restaurants and boat trips.' },
  { name: 'Railay', nl: 'Voor een bijzonder strandverblijf en minder dagelijks vervoer.', en: 'For a special beach stay with less daily transport.' },
  { name: 'Krabi Town', nl: 'Voor markten, lokaal eten en een praktische tussenstop.', en: 'For markets, local food and a practical stopover.' },
  { name: 'Klong Muang & Tubkaek', nl: 'Rustiger, ruimer en vooral geschikt voor een resortverblijf.', en: 'Quieter, more spacious and best suited to a resort stay.' },
] as const;

export function CityHotelHighlights({ affiliateHref, isNl }: CityHotelHighlightsProps) {
  return (
    <section id="hotels" className="section-divider-bottom scroll-mt-24 bg-[#fcfaf6] py-12 lg:py-14">
      <div className="container-custom">
        <div className="mb-6 flex items-end justify-between gap-5">
          <div>
            <p className="eyebrow">{isNl ? 'Kies eerst je uitvalsbasis' : 'Choose your base first'}</p>
            <h2 className="font-display text-[2.8rem] font-semibold leading-none tracking-[-0.035em] text-jade sm:text-[3.25rem]">
              {isNl ? 'Waar verblijf je in Krabi?' : 'Where to stay in Krabi'}
            </h2>
          </div>
          <Link href="/best-hotels/krabi/" className="hidden items-center gap-2 text-xs font-bold text-jade transition hover:text-saffron-dark sm:flex">
            {isNl ? 'Lees onze hotel- en gebiedengids' : 'Read our hotel and area guide'} <ArrowRight size={15} />
          </Link>
        </div>

        <p className="max-w-3xl text-sm leading-7 text-charcoal/65">
          {isNl
            ? 'De beste verblijfplaats hangt vooral af van het soort reis dat je wilt. Ao Nang is de eenvoudigste keuze voor de meeste eerste bezoekers; Railay, Krabi Town en de rustigere noordwestkust hebben ieder een duidelijk ander karakter.'
            : 'The best place to stay depends mainly on the type of trip you want. Ao Nang is the easiest choice for most first-time visitors, while Railay, Krabi Town and the quieter northwest coast each have a distinct character.'}
        </p>

        <div className="my-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stayAreas.map(area => (
            <div key={area.name} className="rounded-xl border border-jade/10 bg-white px-4 py-4 shadow-[0_4px_14px_rgba(18,63,54,0.035)]">
              <h3 className="font-display text-xl font-semibold text-jade">{area.name}</h3>
              <p className="mt-2 text-[11px] leading-5 text-charcoal/58">{isNl ? area.nl : area.en}</p>
            </div>
          ))}
        </div>

        <h3 className="mb-4 font-display text-[1.8rem] font-semibold leading-none tracking-[-0.02em] text-jade">
          {isNl ? 'Drie hotels om te vergelijken' : 'Three hotels to compare'}
        </h3>

        <div className="scrollbar-hide flex snap-x gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible">
          {hotels.map(hotel => (
            <a
              key={hotel.name}
              href={affiliateHref}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="group min-w-[84vw] snap-start overflow-hidden rounded-xl border border-jade/10 bg-white shadow-[0_5px_18px_rgba(18,63,54,0.045)] transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:min-w-0"
            >
              <div className="relative aspect-[16/8.8] overflow-hidden bg-jade/5">
                <Image
                  src={hotel.image}
                  alt={isNl ? `Sfeerbeeld van een luxe resort in Krabi bij ${hotel.area}` : `Editorial image of a luxury Krabi resort near ${hotel.area}`}
                  fill
                  sizes="(min-width: 640px) 33vw, 84vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-jade/18 via-transparent to-black/5" />
                <span className="absolute left-3 top-3 rounded-md border border-white/35 bg-white/90 px-2.5 py-1 text-[9px] font-extrabold tracking-[-0.01em] text-[#2875bd] shadow-sm backdrop-blur-sm">
                  Trip.com
                </span>
              </div>

              <div className="p-4 sm:p-5">
                <h3 className="min-h-[2.5rem] text-sm font-extrabold leading-5 text-jade">{hotel.name}</h3>
                <div className="mt-2 flex items-center gap-1 text-[10px] text-charcoal/50">
                  <MapPin size={12} className="text-jade/65" /> {hotel.area}
                </div>
                <div className="mt-4 flex items-end justify-between border-t border-jade/8 pt-3">
                  <span className="text-[10px] font-semibold text-charcoal/55">{isNl ? 'Bekijk actuele kamers en prijzen' : 'View current rooms and prices'}</span>
                  <span className="grid h-8 w-8 place-items-center rounded-lg border border-jade/10 text-jade transition group-hover:border-saffron/50 group-hover:text-saffron-dark"><ArrowRight size={14} /></span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-end gap-x-5 gap-y-3 text-xs font-bold">
          <Link href="/best-hotels/krabi/" className="inline-flex items-center gap-2 text-jade transition hover:text-saffron-dark">
            {isNl ? 'Waar verblijven in Krabi?' : 'Where to stay in Krabi'} <ArrowRight size={14} />
          </Link>
          <a href={affiliateHref} target="_blank" rel="noopener noreferrer sponsored" className="inline-flex items-center gap-2 text-jade transition hover:text-saffron-dark">
            <Building2 size={15} /> {isNl ? 'Hotels bekijken via Trip.com' : 'View hotels on Trip.com'} <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
