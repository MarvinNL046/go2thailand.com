import { useState } from 'react';
import Link from 'next/link';
import AnnouncementBar from './AnnouncementBar';
import { useTranslation } from '../hooks/useTranslation';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation('common');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'loading') return;
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <footer className="bg-surface-dark text-white">
        {/* Main Footer Content */}
        <div className="container-custom py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

            {/* Brand Column */}
            <div className="lg:col-span-3">
              <Link href="/" className="inline-block mb-4">
                <span className="font-heading text-2xl font-bold text-white">
                  Go2<span className="text-thailand-red">Thailand</span>
                </span>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {t('footer.aboutText')}
              </p>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <svg className="w-4 h-4 text-thailand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@go2-thailand.com</span>
              </div>
              {/* Social Icons */}
              <div className="flex gap-3 mt-6">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-gray-400 hover:bg-thailand-red hover:text-white transition-all duration-200">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-gray-400 hover:bg-thailand-red hover:text-white transition-all duration-200">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm2 12a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8a2 2 0 012 2v8zm-6-7a3 3 0 100 6 3 3 0 000-6zm4.5-.5a1 1 0 100-2 1 1 0 000 2z"/></svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-gray-400 hover:bg-thailand-red hover:text-white transition-all duration-200">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-gray-400 hover:bg-thailand-red hover:text-white transition-all duration-200">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="lg:col-span-2">
              <h3 className="font-heading text-sm font-semibold text-white tracking-wider uppercase mb-5">
                {t('footer.quickLinks')}
              </h3>
              <ul className="space-y-3">
                <li><Link href="/city/" className="text-gray-400 hover:text-thailand-red text-sm transition-colors">{t('footer.allCities')}</Link></li>
                <li><Link href="/islands/" className="text-gray-400 hover:text-thailand-red text-sm transition-colors">{t('nav.islands')}</Link></li>
                <li><Link href="/region/northern/" className="text-gray-400 hover:text-thailand-red text-sm transition-colors">{t('nav.northernThailand')}</Link></li>
                <li><Link href="/region/central/" className="text-gray-400 hover:text-thailand-red text-sm transition-colors">{t('nav.centralThailand')}</Link></li>
                <li><Link href="/region/southern/" className="text-gray-400 hover:text-thailand-red text-sm transition-colors">{t('nav.southernThailand')}</Link></li>
                <li><Link href="/region/isaan/" className="text-gray-400 hover:text-thailand-red text-sm transition-colors">{t('nav.isaanNortheast')}</Link></li>
                <li><Link href="/transport/" className="text-gray-400 hover:text-thailand-red text-sm transition-colors">{t('nav.transport')}</Link></li>
                <li><Link href="/blog/" className="text-gray-400 hover:text-thailand-red text-sm transition-colors">{t('nav.blog')}</Link></li>
              </ul>
            </div>

            {/* Popular Cities & Top 10 Column */}
            <div className="lg:col-span-2">
              <h3 className="font-heading text-sm font-semibold text-white tracking-wider uppercase mb-5">
                {t('footer.popularCities')}
              </h3>
              <ul className="space-y-3">
                <li><Link href="/city/bangkok/" className="text-gray-400 hover:text-thailand-red text-sm transition-colors">{t('footer.bangkok')}</Link></li>
                <li><Link href="/city/chiang-mai/" className="text-gray-400 hover:text-thailand-red text-sm transition-colors">{t('footer.chiangMai')}</Link></li>
                <li><Link href="/city/phuket/" className="text-gray-400 hover:text-thailand-red text-sm transition-colors">{t('footer.phuket')}</Link></li>
                <li><Link href="/city/pattaya/" className="text-gray-400 hover:text-thailand-red text-sm transition-colors">{t('footer.pattaya')}</Link></li>
              </ul>
              <h3 className="font-heading text-sm font-semibold text-white tracking-wider uppercase mb-4 mt-8">
                {t('footer.top10Guides')}
              </h3>
              <ul className="space-y-3">
                <li><Link href="/top-10/restaurants/" className="text-gray-400 hover:text-thailand-red text-sm transition-colors">{t('nav.restaurantGuides')}</Link></li>
                <li><Link href="/top-10/hotels/" className="text-gray-400 hover:text-thailand-red text-sm transition-colors">{t('nav.hotelGuides')}</Link></li>
                <li><Link href="/top-10/attractions/" className="text-gray-400 hover:text-thailand-red text-sm transition-colors">{t('nav.attractionGuides')}</Link></li>
              </ul>
            </div>

            {/* Travel Resources Column */}
            <div className="lg:col-span-2">
              <h3 className="font-heading text-sm font-semibold text-white tracking-wider uppercase mb-5">
                {t('footer.travelResources')}
              </h3>
              <ul className="space-y-3">
                <li><Link href="/esim/" className="text-gray-400 hover:text-thailand-red text-sm transition-colors">{t('nav.esim')}</Link></li>
                <li><Link href="/travel-insurance/" className="text-gray-400 hover:text-thailand-red text-sm transition-colors">{t('nav.insurance')}</Link></li>
                <li><Link href="/travel-gear/" className="text-gray-400 hover:text-thailand-red text-sm transition-colors">{t('nav.gear')}</Link></li>
                <li><Link href="/weather/" className="text-gray-400 hover:text-thailand-red text-sm transition-colors">{t('nav.weather')}</Link></li>
                <li><Link href="/visa/" className="text-gray-400 hover:text-thailand-red text-sm transition-colors">{t('nav.visaGuide')}</Link></li>
                <li><Link href="/food/" className="text-gray-400 hover:text-thailand-red text-sm transition-colors">{t('footer.thaiFoodGuide')}</Link></li>
                <li><Link href="/travel-security/" className="text-gray-400 hover:text-thailand-red text-sm transition-colors">{t('nav.vpnSecurity')}</Link></li>
                <li>
                  <a href="https://search.go2-thailand.com" className="text-gray-400 hover:text-thailand-red text-sm transition-colors">
                    {t('nav.searchFlightsHotels')}
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter Column */}
            <div className="lg:col-span-3">
              <h3 className="font-heading text-sm font-semibold text-white tracking-wider uppercase mb-5">
                Newsletter
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Get the latest Thailand travel tips and guides delivered to your inbox.
              </p>
              {status === 'success' ? (
                <p className="text-green-400 text-sm flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  You&apos;re subscribed! Check your inbox.
                </p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
                    placeholder="Your email"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-thailand-red transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-4 py-2.5 bg-thailand-red text-white rounded-xl text-sm font-medium hover:bg-thailand-red-600 transition-colors flex items-center gap-1 disabled:opacity-50"
                  >
                    {status === 'loading' ? '...' : 'Subscribe'}
                    {status !== 'loading' && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    )}
                  </button>
                </form>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-xs mt-2">Something went wrong. Please try again.</p>
              )}

              {/* Transport Routes */}
              <h3 className="font-heading text-sm font-semibold text-white tracking-wider uppercase mb-4 mt-8">
                {t('footer.transportRoutes')}
              </h3>
              <ul className="space-y-3">
                <li><Link href="/transport/bangkok-to-chiang-mai/" className="text-gray-400 hover:text-thailand-red text-sm transition-colors">{t('footer.bangkokToChiangMai')}</Link></li>
                <li><Link href="/transport/bangkok-to-phuket/" className="text-gray-400 hover:text-thailand-red text-sm transition-colors">{t('footer.bangkokToPhuket')}</Link></li>
                <li><Link href="/transport/bangkok-to-krabi/" className="text-gray-400 hover:text-thailand-red text-sm transition-colors">{t('footer.bangkokToKrabi')}</Link></li>
              </ul>
            </div>

          </div>
        </div>

        {/* Large Decorative Brand Text */}
        <div className="overflow-hidden border-t border-white/5">
          <div className="container-custom py-6">
            <p className="font-heading text-6xl lg:text-8xl font-bold text-white/[0.03] select-none whitespace-nowrap tracking-wider">
              Go2Thailand
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="container-custom py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">
                © {currentYear} Go2Thailand.com. {t('footer.rights')}.
              </p>
              <div className="flex items-center gap-6 text-sm">
                <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors">
                  {t('footer.privacy')}
                </Link>
                <Link href="/terms" className="text-gray-500 hover:text-white transition-colors">
                  {t('footer.terms')}
                </Link>
              </div>
            </div>
            <p className="text-gray-600 text-xs mt-3 text-center md:text-left">
              {t('footer.travelDisclaimer')}
            </p>
          </div>
        </div>
      </footer>
      <AnnouncementBar />
    </>
  );
};

export default Footer;
