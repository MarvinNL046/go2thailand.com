import { FormEvent, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ArrowRight, Clock3, Instagram, Mail } from 'lucide-react';
import { useToast } from './Toast';

const columns = [
  {
    nl: 'Ontdek', en: 'Discover', links: [
      ['/city/', 'Bestemmingen', 'Destinations'], ['/activities/', 'Uitjes', 'Experiences'], ['/travel-guides/', 'Reisgids', 'Travel guide'], ['/blog/', 'Inspiratie', 'Inspiration'],
    ],
  },
  {
    nl: 'Praktisch', en: 'Practical', links: [
      ['/about/', 'Over ons', 'About us'], ['/contact/', 'Contact', 'Contact'], ['/affiliate-disclosure/', 'Affiliate partners', 'Affiliate partners'], ['/privacy/', 'Privacy & cookies', 'Privacy & cookies'],
    ],
  },
  {
    nl: 'Klantenservice', en: 'Customer service', links: [
      ['/contact/', 'Contact & hulp', 'Contact & help'], ['/terms/', 'Voorwaarden', 'Terms'], ['/cookie-policy/', 'Cookievoorkeuren', 'Cookie preferences'], ['/editorial-policy/', 'Redactioneel beleid', 'Editorial policy'],
    ],
  },
];

export default function Footer() {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function subscribe(event: FormEvent) {
    event.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    try {
      const response = await fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, site: 'go2thailand', locale: locale || 'en' }) });
      if (!response.ok) throw new Error('Subscribe failed');
      setEmail('');
      toast.success(isNl ? 'Welkom! Controleer je inbox.' : 'Welcome! Check your inbox.');
    } catch {
      toast.error(isNl ? 'Aanmelden lukt nu niet. Probeer het later opnieuw.' : 'Could not subscribe. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <footer>
      <section className="bg-[#fcfaf6] pt-8">
        <div className="container-custom">
          <div className="newsletter-botanical-background relative z-10 overflow-hidden rounded-t-xl border border-b-0 border-jade/10 bg-white px-6 py-6 sm:px-10 lg:py-5">
            <div className="relative z-10 grid items-center gap-5 sm:px-10 lg:grid-cols-[0.9fr_1.15fr] lg:gap-12 lg:px-24">
              <div>
                <h2 className="font-display text-[2rem] font-semibold leading-none text-jade sm:text-[2.2rem]">Thailand in je inbox</h2>
                <p className="mt-2 max-w-md text-xs leading-relaxed text-charcoal/55">{isNl ? 'Ontvang reisinspiratie, exclusieve tips en de beste deals direct in je mailbox.' : 'Get travel inspiration, exclusive tips and the best deals in your inbox.'}</p>
              </div>
              <form onSubmit={subscribe} className="flex flex-col gap-2.5 sm:flex-row">
                <label className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-jade/35" size={16} />
                  <span className="sr-only">E-mail</span>
                  <input type="email" required value={email} onChange={event => setEmail(event.target.value)} placeholder={isNl ? 'Jouw e-mailadres' : 'Your email address'} className="h-12 w-full rounded-lg border border-jade/15 bg-[#fcfaf6] pl-11 pr-4 text-sm outline-none transition placeholder:text-charcoal/40 focus:border-saffron" />
                </label>
                <button disabled={loading} className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-jade px-7 text-sm font-bold text-white transition hover:bg-jade-light disabled:opacity-60">{loading ? '...' : isNl ? 'Aanmelden' : 'Subscribe'} <ArrowRight size={15} /></button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="footer-contour-pattern bg-jade-dark text-white">
        <div className="container-custom grid grid-cols-2 gap-x-7 gap-y-10 py-10 md:grid-cols-3 lg:grid-cols-[1.45fr_0.8fr_0.8fr_0.95fr_1.1fr] lg:gap-8 lg:py-11">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="inline-flex transition-transform hover:scale-[1.02]" aria-label="Go2 Thailand home">
              <Image src="/images/brand/go2thailand-logo-2026.png" alt="Go2 Thailand" width={138} height={92} className="h-[82px] w-[123px] object-contain brightness-0 invert opacity-90" />
            </Link>
            <p className="mt-3 max-w-[15rem] text-xs leading-relaxed text-white/55">{isNl ? 'Jouw inspiratie voor een onvergetelijke reis door Thailand.' : 'Your inspiration for an unforgettable journey through Thailand.'}</p>
            <div className="mt-5 flex items-center gap-3">
              <a href="https://www.instagram.com/go2thailand" aria-label="Go2 Thailand op Instagram" className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/65 transition hover:border-saffron-light hover:text-saffron-light"><Instagram size={14} /></a>
              <span className="text-[10px] uppercase tracking-[0.13em] text-white/35">{isNl ? 'Volg onze reis' : 'Follow our journey'}</span>
            </div>
          </div>
          {columns.map(column => <div key={column.en}><h3 className="text-[10px] font-bold uppercase tracking-[0.16em] text-saffron-light">{isNl ? column.nl : column.en}</h3><ul className="mt-4 space-y-2">{column.links.map(([href, nl, en]) => <li key={href}><Link href={href} className="text-xs text-white/60 transition hover:text-white">{isNl ? nl : en}</Link></li>)}</ul></div>)}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.16em] text-saffron-light">{isNl ? 'Hulp nodig?' : 'Need help?'}</h3>
            <p className="mt-4 text-xs leading-relaxed text-white/55">{isNl ? 'We staan voor je klaar.' : 'We are here to help.'}</p>
            <a href="mailto:hello@go2-thailand.com" className="mt-3 inline-flex items-center gap-2 whitespace-nowrap text-[11px] text-white/75 transition hover:text-saffron-light"><Mail className="shrink-0" size={13} /> hello@go2-thailand.com</a>
            <p className="mt-2 flex items-center gap-2 text-[11px] text-white/45"><Clock3 size={13} /> {isNl ? 'Online bereikbaar' : 'Available online'}</p>
          </div>
        </div>
        <div className="container-custom flex flex-col gap-3 border-t border-white/10 py-5 text-[10px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Go2 Thailand — {isNl ? 'Alle rechten voorbehouden' : 'All rights reserved'}</span>
          <nav aria-label={isNl ? 'Juridische informatie' : 'Legal information'} className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link href="/privacy/" className="transition hover:text-white/70">Privacy</Link>
            <Link href="/cookie-policy/" className="transition hover:text-white/70">Cookies</Link>
            <Link href="/terms/" className="transition hover:text-white/70">{isNl ? 'Voorwaarden' : 'Terms'}</Link>
          </nav>
        </div>
      </section>
    </footer>
  );
}
