'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, ReactNode } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import AnnouncementBar from './AnnouncementBar';
import { useTranslation } from '../hooks/useTranslation';

type NavLink = { href: string; label: string | null; tKey?: string };
type NavDivider = { divider: true };
type NavSectionHeader = { sectionHeader: string | null; tKey?: string };
type NavItem = NavLink | NavDivider | NavSectionHeader;

type NavGroup = {
  tKey: string;
  items: NavItem[];
  wide?: boolean;
};

type NavEntry = { type: 'link'; href: string; tKey: string } | { type: 'dropdown'; tKey: string; items: NavItem[]; wide?: boolean };

const ChevronDown = () => (
  <svg className="w-4 h-4 transform transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
  </svg>
);

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation('common');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const closeMobile = () => setIsMobileMenuOpen(false);

  // Resolve label: use tKey for translation, or fallback to static label
  const label = (item: { label?: string | null; tKey?: string }): string => {
    if (item.tKey) return t(item.tKey);
    return item.label || '';
  };

  // ── Navigation structure (single source of truth) ──
  const nav: NavEntry[] = [
    { type: 'link', href: '/', tKey: 'nav.home' },
    {
      type: 'dropdown', tKey: 'nav.destinations', items: [
        { href: '/city/', label: null, tKey: 'nav.allCities' },
        { href: '/islands/', label: null, tKey: 'nav.allIslands' },
        { divider: true },
        { sectionHeader: null, tKey: 'nav.regions' },
        { href: '/region/northern/', label: null, tKey: 'nav.northernThailand' },
        { href: '/region/central/', label: null, tKey: 'nav.centralThailand' },
        { href: '/region/southern/', label: null, tKey: 'nav.southernThailand' },
        { href: '/region/isaan/', label: null, tKey: 'nav.isaanNortheast' },
      ],
    },
    {
      type: 'dropdown', tKey: 'nav.foodDrinks', items: [
        { href: '/food/', label: null, tKey: 'nav.thaiFood' },
        { href: '/drinks/', label: null, tKey: 'nav.thaiDrinks' },
        { divider: true },
        { href: '/food/category/main-dish/', label: null, tKey: 'nav.mainDishes' },
        { href: '/food/category/soup/', label: null, tKey: 'nav.soupsCurries' },
        { href: '/drinks/category/alcohol/', label: null, tKey: 'nav.thaiBeerSpirits' },
        { href: '/drinks/category/tea/', label: null, tKey: 'nav.thaiTeasCoffee' },
      ],
    },
    {
      type: 'dropdown', tKey: 'nav.travelNeeds', items: [
        { href: '/esim/', label: null, tKey: 'nav.esim' },
        { href: '/travel-insurance-thailand/', label: null, tKey: 'nav.insurance' },
        { href: '/travel-gear/', label: null, tKey: 'nav.gear' },
        { divider: true },
        { href: '/best-cooking-classes-in-thailand/', label: null, tKey: 'nav.cookingClasses' },
        { href: '/best-muay-thai-in-thailand/', label: null, tKey: 'nav.muayThai' },
        { href: '/best-elephant-sanctuaries-in-thailand/', label: null, tKey: 'nav.elephantSanctuaries' },
        { href: '/best-diving-snorkeling-in-thailand/', label: null, tKey: 'nav.divingSnorkeling' },
        { href: '/travel-security/', label: null, tKey: 'nav.vpnSecurity' },
      ],
    },
    {
      type: 'dropdown', tKey: 'nav.visaInfo', items: [
        { href: '/visa/', label: null, tKey: 'nav.visaGuide' },
        { href: '/practical-info/', label: null, tKey: 'nav.practicalInfo' },
        { divider: true },
        { href: '/visa/visa-free-entry/', label: null, tKey: 'nav.visaFreeEntry' },
        { href: '/practical-info/scams-safety/', label: null, tKey: 'nav.scamsSafety' },
        { href: '/practical-info/atm-money/', label: null, tKey: 'nav.moneyGuide' },
        { href: '/blog/', label: null, tKey: 'nav.blog' },
        { href: '/expat/', label: null, tKey: 'nav.expatGuide' },
      ],
    },
    {
      type: 'dropdown', tKey: 'nav.planTrip', items: [
        { href: '/itineraries/', label: null, tKey: 'nav.itineraries' },
        { href: '/weather/', label: null, tKey: 'nav.weather' },
        { href: '/transport/', label: null, tKey: 'nav.transport' },
        { divider: true },
        { href: '/social/', label: null, tKey: 'nav.social' },
      ],
    },
    {
      type: 'dropdown', tKey: 'nav.top10', wide: true, items: [
        { sectionHeader: null, tKey: 'nav.byCategory' },
        { href: '/top-10/restaurants/', label: null, tKey: 'nav.restaurantGuides' },
        { href: '/top-10/hotels/', label: null, tKey: 'nav.hotelGuides' },
        { href: '/top-10/attractions/', label: null, tKey: 'nav.attractionGuides' },
        { divider: true },
        { sectionHeader: null, tKey: 'nav.popularCities' },
        { href: '/city/bangkok/top-10-restaurants/', label: null, tKey: 'nav.bangkokTop10' },
        { href: '/city/phuket/top-10-hotels/', label: null, tKey: 'nav.phuketTop10' },
        { href: '/city/chiang-mai/top-10-attractions/', label: null, tKey: 'nav.chiangMaiTop10' },
      ],
    },
  ];

  // ── Shared rendering for nav items ──
  const renderItems = (items: NavItem[], mode: 'desktop' | 'mobile') => {
    const linkClass = mode === 'desktop'
      ? 'flex items-center px-5 py-3 text-sm text-gray-700 hover:bg-surface-cream hover:text-thailand-red transition-colors duration-200'
      : 'text-gray-600 hover:text-thailand-red block px-4 py-3 rounded-xl text-sm transition-colors duration-200 hover:bg-surface-cream ml-4';

    return items.map((item, i) => {
      if ('divider' in item) {
        return <div key={`d-${i}`} className={mode === 'desktop' ? 'border-t border-gray-100 my-2 mx-4' : 'border-t border-gray-50 my-1 mx-4'} />;
      }
      if ('sectionHeader' in item) {
        return (
          <div key={`sh-${i}`} className="px-5 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            {label(item)}
          </div>
        );
      }
      return (
        <Link
          key={item.href}
          href={item.href}
          className={linkClass}
          {...(mode === 'mobile' ? { onClick: closeMobile } : {})}
        >
          {label(item)}
        </Link>
      );
    });
  };

  // ── CSS classes ──
  const underline = <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-thailand-red transition-all duration-300 group-hover:w-full" />;

  return (
    <>
      <AnnouncementBar />
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white/0'}`}>
        <nav className="container-custom">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center group">
                <div className="h-24 w-24 relative transform transition-transform group-hover:scale-105">
                  <Image
                    src="/images/go2thailand-logo-original.webp"
                    alt="Go2Thailand - Your Ultimate Thailand Travel Guide"
                    height={96}
                    width={96}
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center justify-center flex-1">
              <div className="flex items-center space-x-1">
                {nav.map((entry) => {
                  if (entry.type === 'link') {
                    return (
                      <Link key={entry.href} href={entry.href} className="text-gray-700 hover:text-thailand-red font-heading text-sm font-medium px-3 py-2 transition-colors duration-200 relative group">
                        {t(entry.tKey)}
                        {underline}
                      </Link>
                    );
                  }
                  return (
                    <div key={entry.tKey} className="relative group">
                      <button className="text-gray-700 hover:text-thailand-red font-heading text-sm font-medium px-3 py-2 transition-colors duration-200 relative group flex items-center gap-1">
                        <span>{t(entry.tKey)}</span>
                        <ChevronDown />
                        {underline}
                      </button>
                      <div className={`absolute left-0 mt-2 ${entry.wide ? 'w-72' : 'w-60'} bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50`}>
                        <div className="py-3">
                          {renderItems(entry.items, 'desktop')}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA + Language (right) */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              <Link href="/city/" className="btn-primary text-sm font-semibold px-6 py-2.5 rounded-xl">
                {t('nav.exploreNow')}
              </Link>
              <LanguageSwitcher />
            </div>

            {/* Mobile hamburger */}
            <div className="lg:hidden flex items-center gap-3">
              <LanguageSwitcher />
              <button
                type="button"
                className="inline-flex items-center justify-center p-2.5 rounded-xl text-gray-700 hover:text-thailand-red hover:bg-surface-cream transition-colors duration-200"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <span className="sr-only">{t('nav.openMainMenu')}</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 z-[60] bg-white overflow-y-auto transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        id="mobile-menu"
      >
        <div className="flex items-center justify-between px-4 h-20 border-b border-gray-100">
          <Link href="/" className="flex items-center" onClick={closeMobile}>
            <div className="h-16 w-16 relative">
              <Image src="/images/go2thailand-logo-original.webp" alt="Go2Thailand" height={64} width={64} className="object-contain" />
            </div>
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center p-2.5 rounded-xl text-gray-700 hover:text-thailand-red hover:bg-surface-cream transition-colors duration-200"
            onClick={closeMobile}
          >
            <span className="sr-only">{t('nav.closeMenu')}</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-4 py-6 space-y-1">
          {nav.map((entry) => {
            if (entry.type === 'link') {
              return (
                <Link
                  key={entry.href}
                  href={entry.href}
                  className="text-gray-800 hover:text-thailand-red block px-4 py-3 rounded-xl text-base font-medium transition-colors duration-200 hover:bg-surface-cream"
                  onClick={closeMobile}
                >
                  {t(entry.tKey)}
                </Link>
              );
            }
            return (
              <div key={entry.tKey} className="border-t border-gray-100 pt-3 mt-3">
                <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {t(entry.tKey)}
                </div>
                {renderItems(entry.items, 'mobile')}
              </div>
            );
          })}

          {/* Mobile CTA */}
          <div className="pt-6 mt-4 border-t border-gray-100">
            <Link
              href="/city/"
              className="btn-primary block text-center px-6 py-3.5 rounded-xl text-base font-semibold"
              onClick={closeMobile}
            >
              {t('nav.exploreThailandNow')}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
