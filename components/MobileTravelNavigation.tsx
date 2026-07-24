import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Compass, MapPin, Menu, Search, X } from 'lucide-react';
import { destinationOptions, DestinationOption } from '../lib/destination-search';
import LanguageSwitcher from './LanguageSwitcher';

const quickLinks = [
  { href: '/city/', nl: 'Bestemmingen', en: 'Destinations', icon: MapPin },
  { href: '/activities/', nl: 'Uitjes', en: 'Experiences', icon: Compass },
];

const menuLinks = [
  { href: '/city/', nl: 'Bestemmingen', en: 'Destinations' },
  { href: '/activities/', nl: 'Uitjes', en: 'Experiences' },
  { href: '/best-hotels/phuket/', nl: 'Hotels', en: 'Hotels' },
  { href: '/travel-guides/', nl: 'Reisgids', en: 'Travel guide' },
  { href: '/itineraries/', nl: 'Reisroutes', en: 'Itineraries' },
];

export default function MobileTravelNavigation() {
  const router = useRouter();
  const isNl = router.locale === 'nl';
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);

  const matches = useMemo(() => {
    const value = query.trim().toLocaleLowerCase();
    if (!value) return destinationOptions.slice(0, 6);
    return destinationOptions.filter(option =>
      option.name.toLocaleLowerCase().includes(value) || option.keywords.some(keyword => keyword.includes(value)),
    ).slice(0, 6);
  }, [query]);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [router.asPath]);

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    let ticking = false;
    const updateNavigation = () => {
      const currentY = window.scrollY;
      if (currentY < 80) setNavVisible(true);
      else if (Math.abs(currentY - lastScrollY.current) > 10) setNavVisible(currentY < lastScrollY.current);
      lastScrollY.current = currentY;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNavigation);
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function selectDestination(option: DestinationOption) {
    setQuery(option.name);
    setSearchOpen(false);
    void router.push(option.href);
  }

  return (
    <div className="lg:hidden">
      <div className="fixed inset-x-0 top-0 z-50 border-b border-jade/10 bg-ivory/95 px-4 py-3 shadow-sm backdrop-blur-xl">
        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className="mx-auto flex h-[58px] w-full max-w-lg items-center rounded-2xl border border-jade/15 bg-white px-4 text-left shadow-[0_8px_25px_rgba(18,63,54,0.10)]"
          aria-label={isNl ? 'Bestemming zoeken' : 'Search destinations'}
        >
          <Search className="shrink-0 text-jade" size={20} strokeWidth={2} />
          <span className="ml-3 flex-1">
            <span className="block text-sm font-bold text-jade">{isNl ? 'Waar wil je heen?' : 'Where do you want to go?'}</span>
            <span className="block text-xs text-charcoal/50">{isNl ? 'Zoek een bestemming in Thailand' : 'Search a destination in Thailand'}</span>
          </span>
          <span className="grid h-8 w-8 place-items-center rounded-xl border border-saffron/45 text-saffron"><ArrowRight size={15} /></span>
        </button>
      </div>
      <div aria-hidden="true" className="h-[82px]" />

      <nav
        data-slot="footer-quick-navigation"
        aria-label={isNl ? 'Snelle navigatie' : 'Quick navigation'}
        className={`fixed inset-x-0 bottom-0 z-[60] grid grid-cols-4 border-t border-jade/10 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_rgba(18,63,54,0.10)] backdrop-blur-xl transition-transform duration-300 ${navVisible || menuOpen || searchOpen ? 'translate-y-0' : 'translate-y-[calc(100%+1rem)]'}`}
      >
        <button type="button" onClick={() => setSearchOpen(true)} className="flex min-h-[68px] flex-col items-center justify-center gap-1 text-saffron-dark">
          <Search size={21} strokeWidth={2.1} />
          <span className="text-[11px] font-bold">{isNl ? 'Zoeken' : 'Search'}</span>
        </button>
        {quickLinks.map(item => {
          const active = router.pathname.startsWith(item.href.replace(/\/$/, ''));
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className={`flex min-h-[68px] flex-col items-center justify-center gap-1 ${active ? 'text-saffron-dark' : 'text-jade/65'}`}>
              <Icon size={21} strokeWidth={2} />
              <span className="text-[11px] font-semibold">{isNl ? item.nl : item.en}</span>
            </Link>
          );
        })}
        <button type="button" onClick={() => setMenuOpen(true)} className={`flex min-h-[68px] flex-col items-center justify-center gap-1 ${menuOpen ? 'text-saffron-dark' : 'text-jade/65'}`}>
          <Menu size={22} strokeWidth={2.1} />
          <span className="text-[11px] font-semibold">Menu</span>
        </button>
      </nav>

      {searchOpen && (
        <div role="dialog" aria-modal="true" aria-label={isNl ? 'Bestemming zoeken' : 'Search destinations'} className="fixed inset-0 z-[80] overflow-y-auto bg-ivory">
          <div className="mx-auto min-h-full max-w-lg px-5 pb-28 pt-5">
            <div className="flex items-center justify-between">
              <Link href="/" aria-label="Go2 Thailand home">
                <Image src="/images/brand/go2thailand-logo-2026.png" alt="Go2 Thailand" width={84} height={56} className="h-14 w-[84px] object-contain" />
              </Link>
              <button type="button" onClick={() => setSearchOpen(false)} className="grid h-11 w-11 place-items-center rounded-xl border border-jade/15 bg-white text-jade" aria-label={isNl ? 'Zoeken sluiten' : 'Close search'}><X size={22} /></button>
            </div>
            <div className="mt-10">
              <p className="eyebrow">{isNl ? 'Vind jouw plek' : 'Find your place'}</p>
              <h2 className="font-display text-4xl leading-none text-jade">{isNl ? 'Waar wil je heen?' : 'Where do you want to go?'}</h2>
              <label className="mt-7 flex h-16 items-center gap-3 rounded-2xl border border-jade/15 bg-white px-4 shadow-sm">
                <MapPin className="text-saffron" size={21} />
                <input autoFocus value={query} onChange={event => setQuery(event.target.value)} placeholder={isNl ? 'Bijv. Krabi of Chiang Mai' : 'E.g. Krabi or Chiang Mai'} className="w-full bg-transparent text-base text-jade outline-none placeholder:text-charcoal/35" />
              </label>
              <div className="mt-5 overflow-hidden rounded-2xl border border-jade/10 bg-white">
                {matches.length ? matches.map(option => (
                  <button key={option.href} type="button" onClick={() => selectDestination(option)} className="flex w-full items-center justify-between border-b border-jade/10 px-5 py-4 text-left text-sm font-semibold text-jade last:border-0 hover:bg-ivory">
                    <span className="flex items-center gap-3"><MapPin className="text-saffron" size={17} />{option.name}</span>
                    <ArrowRight size={16} className="text-saffron" />
                  </button>
                )) : <p className="px-5 py-5 text-sm text-charcoal/55">{isNl ? 'Geen bestemming gevonden.' : 'No destination found.'}</p>}
              </div>
            </div>
          </div>
        </div>
      )}

      {menuOpen && (
        <div className="fixed inset-0 z-[75] bg-jade/35 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="ml-auto flex h-full w-[88%] max-w-sm flex-col bg-ivory p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <Image src="/images/brand/go2thailand-logo-2026.png" alt="Go2 Thailand" width={84} height={56} className="h-14 w-[84px] object-contain" />
              <button type="button" onClick={() => setMenuOpen(false)} className="grid h-11 w-11 place-items-center rounded-xl border border-jade/15 bg-white text-jade" aria-label={isNl ? 'Menu sluiten' : 'Close menu'}><X size={22} /></button>
            </div>
            <div className="mt-8 flex-1">
              {menuLinks.map(link => <Link key={link.href} href={link.href} className="flex items-center justify-between border-b border-jade/10 py-4 font-display text-2xl text-jade">{isNl ? link.nl : link.en}<ArrowRight size={17} className="text-saffron" /></Link>)}
            </div>
            <div className="flex items-center justify-between border-t border-jade/10 pt-5">
              <span className="text-xs font-bold uppercase tracking-widest text-charcoal/45">{isNl ? 'Taal' : 'Language'}</span>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
