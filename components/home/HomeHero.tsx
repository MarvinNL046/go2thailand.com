import { FormEvent, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowRight, BookOpenCheck, MapPin, Search, ShieldCheck } from 'lucide-react';
import { TRIP_GENERIC } from '../../lib/affiliates';
import { destinationOptions, DestinationOption } from '../../lib/destination-search';

export function HomeHero() {
  const router = useRouter();
  const isNl = router.locale === 'nl';
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const matches = useMemo(() => {
    const value = query.trim().toLocaleLowerCase();
    if (!value) return destinationOptions.slice(0, 6);
    return destinationOptions.filter((option) =>
      option.name.toLocaleLowerCase().includes(value) || option.keywords.some((keyword) => keyword.includes(value)),
    ).slice(0, 6);
  }, [query]);

  function selectDestination(option: DestinationOption) {
    setQuery(option.name);
    setIsOpen(false);
    void router.push(option.href);
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const exact = destinationOptions.find((option) => option.name.toLocaleLowerCase() === query.trim().toLocaleLowerCase());
    const destination = exact || matches[0];
    if (destination) selectDestination(destination);
    else setIsOpen(true);
  }

  return (
    <>
      <section className="relative min-h-[760px] overflow-hidden bg-ivory sm:min-h-[780px] lg:min-h-[690px]">
        <Image
          src="/images/redesign/homepage-hero.webp"
          alt={isNl ? 'Long-tail boot bij de kalkstenen kliffen van Krabi' : 'Long-tail boat beside the limestone cliffs of Krabi'}
          fill
          priority
          className="object-cover object-[68%_center] sm:object-[62%_center]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ivory/95 via-ivory/65 to-transparent sm:via-ivory/45 lg:w-[62%]" />

        <div className="container-custom relative pt-24 sm:pt-28 lg:pt-[118px]">
          <div className="max-w-[720px]">
            <h1 className="font-display text-[4.15rem] font-medium leading-[0.88] tracking-[-0.035em] text-jade sm:text-[5rem] lg:text-[5.35rem]">
              Thailand.<br />
              {isNl ? 'Voel het verschil.' : 'Feel the difference.'}
            </h1>
            <p className="mt-6 max-w-[500px] text-base leading-[1.65] text-charcoal/80 sm:text-[1.05rem]">
              {isNl
                ? 'Ontdek bijzondere plekken, onvergetelijke uitjes en hotels die bij jouw reis passen.'
                : 'Discover remarkable places, unforgettable experiences and hotels that fit your journey.'}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/city/" className="btn-jade btn-jade-pattern group px-7">
                <span className="relative z-10">{isNl ? 'Ontdek Thailand' : 'Discover Thailand'}</span>
                <ArrowRight
                  aria-hidden="true"
                  className="relative z-10 ml-1 text-saffron transition-transform duration-300 group-hover:translate-x-1"
                  size={17}
                  strokeWidth={1.9}
                />
              </Link>
              <a
                href={TRIP_GENERIC}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="btn-cream group border-saffron/55 px-7 text-saffron-dark hover:border-saffron"
              >
                {isNl ? 'Vind een hotel' : 'Find a hotel'}
                <ArrowRight
                  aria-hidden="true"
                  className="ml-1 text-saffron transition-transform duration-300 group-hover:translate-x-1"
                  size={17}
                  strokeWidth={1.9}
                />
              </a>
            </div>
          </div>
        </div>

        <div className="container-custom absolute inset-x-0 bottom-5 z-20 hidden lg:block">
          <form
            onSubmit={submitSearch}
            onFocus={() => setIsOpen(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsOpen(false);
            }}
            className="relative mx-auto flex max-w-[1120px] flex-col gap-2 rounded-[1.1rem] bg-white p-2.5 shadow-[0_20px_55px_rgba(18,63,54,0.18)] sm:flex-row sm:items-center"
          >
            <label className="flex min-h-[64px] flex-1 items-center gap-4 rounded-xl px-4 sm:px-5">
              <MapPin className="shrink-0 text-jade" size={22} strokeWidth={1.6} />
              <span className="flex-1">
                <span className="block text-xs font-semibold text-jade">{isNl ? 'Waar wil je heen?' : 'Where do you want to go?'}</span>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={() => setIsOpen(true)}
                  role="combobox"
                  aria-expanded={isOpen}
                  aria-controls="hero-destination-list"
                  aria-autocomplete="list"
                  autoComplete="off"
                  placeholder={isNl ? 'Zoek een bestemming' : 'Search a destination'}
                  className="mt-1 w-full bg-transparent text-sm text-charcoal outline-none placeholder:text-charcoal/40"
                />
              </span>
            </label>

            <button type="submit" className="inline-flex min-h-[58px] items-center justify-center gap-2 rounded-xl bg-saffron px-9 text-sm font-semibold text-white transition hover:bg-saffron-dark sm:min-w-[154px]">
              <Search size={17} /> {isNl ? 'Zoeken' : 'Search'}
            </button>

            {isOpen && (
              <div id="hero-destination-list" role="listbox" className="absolute inset-x-2 bottom-[calc(100%+10px)] max-h-72 overflow-y-auto rounded-2xl border border-jade/10 bg-white p-2 shadow-2xl sm:left-2 sm:right-[172px]">
                {matches.length > 0 ? matches.map((option) => (
                  <button
                    key={option.href}
                    type="button"
                    role="option"
                    aria-selected={query === option.name}
                    onClick={() => selectDestination(option)}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm text-jade transition hover:bg-ivory"
                  >
                    <span className="flex items-center gap-3"><MapPin size={16} className="text-saffron" />{option.name}</span>
                    <ArrowRight size={15} />
                  </button>
                )) : (
                  <p className="px-4 py-3 text-sm text-charcoal/55">{isNl ? 'Geen bestemming gevonden' : 'No destination found'}</p>
                )}
              </div>
            )}
          </form>
        </div>
      </section>

      <section className="section-divider-bottom bg-[#fcfaf6] py-5 lg:py-[18px]">
        <div className="container-custom flex flex-col items-center justify-center gap-4 text-xs sm:flex-row sm:gap-6">
          <span className="flex items-center justify-center gap-3 text-charcoal/65">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-saffron/30 bg-white text-saffron"><BookOpenCheck size={18} strokeWidth={1.7} /></span>
            <span><strong className="font-bold text-jade">{isNl ? 'Zelfstandig samengesteld' : 'Independently curated'}</strong><br />{isNl ? 'praktische Thailand-reisgidsen' : 'practical Thailand travel guides'}</span>
          </span>
          <span className="hidden h-7 w-px bg-jade/15 sm:block" />
          <span className="flex items-center gap-3 text-charcoal/65">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-saffron/30 bg-white text-jade"><ShieldCheck size={18} strokeWidth={1.7} /></span>
            <span><strong className="font-bold text-jade">{isNl ? 'Duidelijke partnerlinks' : 'Transparent partner links'}</strong><br />{isNl ? 'geen extra kosten voor jou' : 'at no extra cost to you'}</span>
          </span>
        </div>
      </section>
    </>
  );
}
