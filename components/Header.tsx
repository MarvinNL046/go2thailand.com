import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import AnnouncementBar from './AnnouncementBar';
import LanguageSwitcher from './LanguageSwitcher';
import MobileTravelNavigation from './MobileTravelNavigation';

const links = [
  { href: '/city/', nl: 'Bestemmingen', en: 'Destinations' },
  { href: '/activities/', nl: 'Uitjes', en: 'Experiences' },
  { href: '/best-hotels/phuket/', nl: 'Hotels', en: 'Hotels' },
  { href: '/travel-guides/', nl: 'Reisgids', en: 'Travel guide' },
];

export default function Header() {
  const router = useRouter();
  const isNl = router.locale === 'nl';
  const isHome = router.pathname === '/';
  const isRedesignedKrabiPage = isNl && router.query.slug === 'krabi' && [
    '/city/[slug]',
    '/city/[slug]/attractions',
    '/city/[slug]/weather',
    '/best-hotels/[slug]',
  ].includes(router.pathname);
  const hasOverlayHeader = isHome || isRedesignedKrabiPage;

  return (
    <>
      <div className="hidden lg:block"><AnnouncementBar /></div>
      <header className={`hidden lg:block ${hasOverlayHeader ? 'absolute inset-x-0 top-[30px] z-50 border-b border-white/45 bg-white/45 backdrop-blur-md' : 'sticky top-0 z-50 border-b border-jade/10 bg-ivory/95 backdrop-blur-xl'}`}>
        <nav className="container-custom flex h-[76px] items-center justify-between">
          <Link href="/" className="flex shrink-0 items-center transition-transform hover:scale-[1.02]" aria-label="Go2 Thailand home">
            <Image src="/images/brand/go2thailand-logo-2026.png" alt="Go2 Thailand" width={108} height={72} className="h-[64px] w-[96px] object-contain" />
          </Link>

          <div className="flex items-center gap-8">
            {links.map(link => {
              const active = router.pathname.startsWith(link.href.replace(/\/$/, ''));
              return <Link key={link.href} href={link.href} className={`relative py-2 text-sm font-bold transition hover:text-saffron-dark ${active ? 'text-jade' : 'text-jade/90'}`}>{isNl ? link.nl : link.en}{active && <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-saffron" />}</Link>;
            })}
          </div>

          <div className="flex items-center gap-3">
            <div className={hasOverlayHeader ? 'rounded-lg border border-white/70 bg-white/90 shadow-[0_4px_16px_rgba(6,54,47,0.12)] backdrop-blur-md' : ''}>
              <LanguageSwitcher />
            </div>
            <Link href="/itineraries/" className="rounded-full bg-saffron px-5 py-3 text-sm font-semibold text-jade transition hover:bg-saffron-dark hover:text-white">
              {isNl ? 'Plan je reis' : 'Plan your trip'}
            </Link>
          </div>
        </nav>
      </header>
      <MobileTravelNavigation />
    </>
  );
}
